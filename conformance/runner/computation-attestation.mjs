#!/usr/bin/env node
/** CAP-DRAFT-0.1: bounded, informative, non-qualifying reference fixture. */
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  openSync,
  fsyncSync,
  closeSync,
} from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import {
  canonicalEncode,
  canonicalHash,
  verifyArtifactBytes,
  supportedArtifactPairs,
} from "./canonical.mjs";
import { isCanonicalTimestamp } from "./canonical-time.mjs";
import { loadSchemaRegistry } from "./schema-registry.mjs";
import { schemaProgram as scienceSchemas } from "./srtp-graph.mjs";
import {
  createFixtureExecutor,
  rawDigest,
  jsonBytes,
} from "./attestation-fixture-executor.mjs";

export const ROOT = resolve(import.meta.dirname, "../..");
const FIXTURES = resolve(ROOT, "fixtures/provisional/attestation");
const SCHEMAS = resolve(ROOT, "schemas/provisional/attestation");
const CHECKS = [
  "executor_identity",
  "execution_binding",
  "evidence_integrity",
  "method_match",
  "parameter_bounds",
  "input_binding",
  "environment_match",
  "result_fidelity",
];
export const capturedAt = "2026-10-12T08:00:00.000000Z";
const canonicalDigest = (value) => ({
  algorithm: "sha-256",
  canonical_profile: "GKX-CBOR-1",
  value: canonicalHash(value),
});
const equal = isDeepStrictEqual;
export function registry() {
  const reg = loadSchemaRegistry(ROOT);
  const schemas = readdirSync(SCHEMAS)
    .filter((p) => p.endsWith(".json"))
    .map((p) => JSON.parse(readFileSync(resolve(SCHEMAS, p), "utf8")));
  for (const schema of schemas) reg.ajv.addSchema(schema, schema.$id);
  reg.supported.push(...supportedArtifactPairs(schemas));
  return reg;
}
const REG = registry();
export function verifyRecord(record) {
  return verifyArtifactBytes(canonicalEncode(record), REG).value;
}
export function definitionReference(definition) {
  verifyRecord(definition);
  return {
    artifact_id: definition.uid,
    artifact_version: definition.computation_version,
    digest: canonicalDigest(definition),
  };
}
const checkerRef = () => ({
  artifact_id: "cap-reference-checker",
  artifact_version: "0.1.0",
  digest: rawDigest(readFileSync(fileURLToPath(import.meta.url))),
});
const dependenciesDigest = () =>
  rawDigest(
    jsonBytes(
      [
        "canonical.mjs",
        "canonical-time.mjs",
        "schema-registry.mjs",
        "srtp-graph.mjs",
        "attestation-fixture-executor.mjs",
        "package-lock.json",
      ]
        .map((p) => ({
          path: p,
          digest: rawDigest(readFileSync(resolve(import.meta.dirname, p))),
        }))
        .concat(
          readdirSync(SCHEMAS)
            .filter((p) => p.endsWith(".json"))
            .sort()
            .map((p) => ({
              path: `schemas/provisional/attestation/${p}`,
              digest: rawDigest(readFileSync(resolve(SCHEMAS, p))),
            })),
          readdirSync(resolve(ROOT, "schemas"))
            .filter((p) => p.endsWith(".json"))
            .sort()
            .map((p) => ({
              path: `schemas/${p}`,
              digest: rawDigest(readFileSync(resolve(ROOT, "schemas", p))),
            })),
        ),
    ),
  );

export function aggregate(checks) {
  if (
    checks.length !== CHECKS.length ||
    !checks.every((c, i) => c.check === CHECKS[i])
  )
    throw new Error("Incomplete, duplicate, or reordered check coverage");
  if (
    checks.some(
      (c) => !["PASS", "FAIL", "PARTIAL", "UNEVALUATED"].includes(c.outcome),
    )
  )
    throw new Error("Unknown outcome");
  if (checks.some((c) => c.outcome === "FAIL")) return "FAIL";
  if (checks.every((c) => c.outcome === "PASS")) return "PASS";
  return checks.every((c) => c.outcome === "UNEVALUATED")
    ? "UNEVALUATED"
    : "PARTIAL";
}

/** readExecution is supplied by the trusted adapter, NEVER by an agent-submitted receipt. */
export function attest({
  definition,
  requestBytes,
  presentationBytes,
  readExecution,
}) {
  const definitionRef = definitionReference(definition);
  const request = JSON.parse(requestBytes);
  if (
    !isCanonicalTimestamp(request.evaluated_at) ||
    typeof request.run_id !== "string" ||
    !request.run_id
  )
    throw new Error("Invalid request identity/time");
  const checks = CHECKS.map((check) => ({
    check,
    outcome: "UNEVALUATED",
    reason: "evidence_unavailable",
  }));
  const set = (name, ok, reason) =>
    Object.assign(
      checks.find((c) => c.check === name),
      { outcome: ok ? "PASS" : "FAIL", reason: ok ? "verified" : reason },
    );
  let source;
  try {
    source = readExecution(request.run_id);
  } catch {
    /* unavailable stays UNEVALUATED */
  }
  let receipt;
  if (source) {
    try {
      receipt = JSON.parse(source.receiptBytes);
      set(
        "executor_identity",
        receipt.executor_id === definition.executor_id,
        "executor_mismatch",
      );
      set(
        "execution_binding",
        receipt.run_id === request.run_id &&
          receipt.state === "succeeded" &&
          equal(request.definition_ref, definitionRef),
        "run_or_definition_mismatch",
      );
      const names = ["method", "bills", "parameters", "environment", "result"];
      const complete = names.every((n) => Buffer.isBuffer(source.blobs?.[n]));
      if (complete) {
        const integrity = names.every((n) =>
          equal(rawDigest(source.blobs[n]), receipt.digests?.[n]),
        );
        set("evidence_integrity", integrity, "evidence_digest_mismatch");
        // Checks use the retrieved bytes directly, not the receipt's assertions.
        set(
          "method_match",
          equal(rawDigest(source.blobs.method), definition.method_ref.digest),
          "method_mismatch",
        );
        const parameters = JSON.parse(source.blobs.parameters);
        set(
          "parameter_bounds",
          REG.ajv.compile(definition.parameter_schema)(parameters),
          "parameter_out_of_bounds",
        );
        set(
          "input_binding",
          equal(rawDigest(source.blobs.bills), request.input_digest) &&
            equal(
              rawDigest(source.blobs.parameters),
              request.parameters_digest,
            ),
          "input_or_parameters_mismatch",
        );
        set(
          "environment_match",
          equal(
            rawDigest(source.blobs.environment),
            definition.environment_digest,
          ),
          "environment_mismatch",
        );
        const result = JSON.parse(source.blobs.result);
        const presented = JSON.parse(presentationBytes);
        const validValue = (r) =>
          r &&
          Object.keys(r).sort().join(",") === "name,units,value_minor" &&
          r.name === "total" &&
          r.units === definition.output.units &&
          Number.isSafeInteger(r.value_minor) &&
          !Object.is(r.value_minor, -0) &&
          r.value_minor >= 0;
        set(
          "result_fidelity",
          validValue(result) &&
            validValue(presented) &&
            equal(result, presented),
          "result_mismatch",
        );
      }
    } catch {
      // Malformed available evidence is a detected defect, not successful attestation.
      set("evidence_integrity", false, "malformed_execution_evidence");
    }
  }
  const verdict = aggregate(checks);
  const record = {
    canonical_profile: "GKX-CBOR-1",
    artifact_type: "provisional-computation-attestation",
    schema_version: "0.1.0",
    attestation_id: `cap:${request.run_id}`,
    definition_ref: definitionRef,
    request_digest: rawDigest(requestBytes),
    checker_ref: checkerRef(),
    checker_dependencies_digest: dependenciesDigest(),
    run_id: request.run_id,
    executor_id: definition.executor_id,
    presentation_digest: rawDigest(presentationBytes),
    checks,
    verdict,
    reason_codes: [
      ...new Set(
        checks.filter((c) => c.outcome !== "PASS").map((c) => c.reason),
      ),
    ],
    emitted_at: request.evaluated_at,
    origin: "derived",
    sensitivity: definition.sensitivity,
  };
  if (source?.receiptBytes)
    record.execution_receipt_digest = rawDigest(source.receiptBytes);
  if (source?.blobs?.result)
    record.result_digest = rawDigest(source.blobs.result);
  return verifyRecord(record);
}

/** Demo use gate: approval and policy are trusted, captured fixtures, not self-asserted authorization. */
export function gate({
  candidate,
  definition,
  requestBytes,
  presentationBytes,
  readExecution,
  approval,
  policy,
  action,
}) {
  const reasons = [];
  let evaluated;
  try {
    verifyRecord(candidate);
    if (aggregate(candidate.checks) !== candidate.verdict)
      reasons.push("inconsistent_verdict");
    evaluated = attest({
      definition,
      requestBytes,
      presentationBytes,
      readExecution,
    });
    if (!equal(candidate, evaluated))
      reasons.push("attestation_binding_mismatch");
    if (evaluated.verdict !== "PASS")
      reasons.push("required_attestation_not_pass");
  } catch {
    reasons.push("invalid_attestation");
  }
  if (
    !equal(approval.definition_ref, definitionReference(definition)) ||
    approval.status !== "accepted"
  )
    reasons.push("method_not_approved");
  if (
    !equal(policy.request_digest, rawDigest(requestBytes)) ||
    policy.status !== "active"
  )
    reasons.push("policy_or_request_mismatch");
  const timeValid = [
    action.at,
    approval.valid_from,
    approval.valid_until,
    policy.valid_from,
    policy.valid_until,
  ].every(isCanonicalTimestamp);
  if (
    !timeValid ||
    action.at < approval.valid_from ||
    action.at >= approval.valid_until ||
    action.at < policy.valid_from ||
    action.at >= policy.valid_until
  )
    reasons.push("use_outside_validity");
  if (evaluated && action.at < evaluated.emitted_at)
    reasons.push("attestation_after_use");
  if (
    action.purpose !== policy.purpose ||
    action.recipient !== policy.recipient
  )
    reasons.push("use_scope_mismatch");
  return {
    status: "provisional-draft-non-qualifying",
    profiles_claimed: [],
    outcome: reasons.length ? "refused" : "allowed",
    reason_codes: reasons,
    attestation_digest: rawDigest(jsonBytes(candidate)),
    approval_digest: rawDigest(jsonBytes(approval)),
    policy_digest: rawDigest(jsonBytes(policy)),
    presentation_digest: rawDigest(presentationBytes),
    action,
    displayed_value: reasons.length ? null : JSON.parse(presentationBytes),
  };
}

// Rerun comparison only; never called by result_fidelity or gate. Decimal strings avoid
// ambiguous canonical numeric types in a comparison protocol. Finite binary64 pilot only.
export function compareRerun({ baseline, rerun, absolute, relative, units }) {
  const decimal = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;
  if (
    !units ||
    [baseline, rerun].some((x) => typeof x !== "string" || !decimal.test(x)) ||
    (absolute === undefined && relative === undefined)
  )
    throw new Error("Invalid rerun protocol");
  for (const x of [absolute, relative].filter((x) => x !== undefined))
    if (typeof x !== "string" || !decimal.test(x))
      throw new Error("Invalid tolerance");
  const [a, b, abs, rel] = [
    baseline,
    rerun,
    absolute ?? "0",
    relative ?? "0",
  ].map(Number);
  if (
    ![a, b, abs, rel].every(Number.isFinite) ||
    abs < 0 ||
    rel < 0 ||
    [a, b, abs, rel].some((x) => Object.is(x, -0))
  )
    throw new Error("Invalid finite comparison");
  const difference = Math.abs(a - b),
    limit = abs + rel * Math.max(Math.abs(a), Math.abs(b));
  if (![difference, limit].every(Number.isFinite))
    throw new Error("Comparison overflow");
  return {
    evaluation: difference <= limit ? "PASS" : "FAIL",
    difference,
    limit,
    units,
  };
}

export function pilot({
  methodFile = "method.json",
  inputBytes,
  parameterBytes,
  runId = "aggregate-001",
} = {}) {
  const read = (name) => readFileSync(resolve(FIXTURES, name));
  const executor = createFixtureExecutor();
  const definition = {
    canonical_profile: "GKX-CBOR-1",
    artifact_type: "provisional-computation-definition",
    schema_version: "0.1.0",
    gkx_version: "2.0",
    uid: "019a0000-0000-7000-8000-000000000001",
    title: "Synthetic bill aggregate; not a legal entitlement calculation",
    type: "gkx:ComputationDefinition",
    created_at: capturedAt,
    epistemic_state: "modeled",
    sensitivity: "public",
    authorship_origin: "authored",
    computation_version: "0.1.0",
    method_ref: {
      artifact_id: "aggregate-method",
      artifact_version: "0.1.0",
      digest: rawDigest(read("method.json")),
    },
    executor_id: "fixture:aggregate-executor",
    environment_digest: rawDigest(read("environment.json")),
    parameter_schema: {
      type: "object",
      required: ["maximum_rows"],
      properties: {
        maximum_rows: { type: "integer", minimum: 1, maximum: 100 },
      },
      additionalProperties: false,
    },
    input_names: ["bills"],
    required_checks: CHECKS,
    output: {
      name: "total",
      representation: "integer-minor-units",
      units: "USD-cent",
      rounding: "none",
    },
  };
  const requestBytes = jsonBytes({
    run_id: runId,
    definition_ref: definitionReference(definition),
    input_digest: rawDigest(read("bills.json")),
    parameters_digest: rawDigest(read("parameters.json")),
    evaluated_at: capturedAt,
  });
  executor.execute({
    runId,
    methodBytes: read(methodFile),
    inputBytes: inputBytes ?? read("bills.json"),
    parameterBytes: parameterBytes ?? read("parameters.json"),
    environmentBytes: read("environment.json"),
  });
  const presentationBytes = jsonBytes({
    name: "total",
    value_minor: 12000,
    units: "USD-cent",
  });
  const approval = {
    definition_ref: definitionReference(definition),
    status: "accepted",
    valid_from: capturedAt,
    valid_until: "2027-01-01T00:00:00.000000Z",
  };
  const policy = {
    request_digest: rawDigest(requestBytes),
    status: "active",
    purpose: "synthetic-report",
    recipient: "fixture-reviewer",
    valid_from: capturedAt,
    valid_until: "2027-01-01T00:00:00.000000Z",
  };
  const action = {
    at: capturedAt,
    purpose: policy.purpose,
    recipient: policy.recipient,
  };
  const inputs = {
    definition,
    requestBytes,
    presentationBytes,
    readExecution: executor.readExecution,
    approval,
    policy,
    action,
  };
  return { ...inputs, candidate: attest(inputs) };
}

export function scientificComparison() {
  const source = JSON.parse(readFileSync(resolve(FIXTURES, "rerun.json")));
  const comparison = compareRerun(source);
  const record = {
    id: "019a0000-0000-7000-8000-000000000002",
    srtp_type: "srtp:RerunComparison",
    origin: "derived",
    sensitivity: "public",
    created_at: capturedAt,
    lineage: { branch_id: "cap-science-demo", predecessors: [] },
    baseline_run_id: "run:baseline",
    rerun_id: "run:rerun",
    comparison_mode: "numerical-tolerance",
    intended_equivalent_inputs: ["synthetic-scalar-protocol"],
    tolerance: {
      absolute: Number(source.absolute),
      relative: Number(source.relative),
      units: source.units,
    },
    evaluation: comparison.evaluation,
    difference_digest: `sha256:${rawDigest(jsonBytes(comparison)).value}`,
    profile_evaluated: "SRTP-DRAFT-0.1",
  };
  const validate = scienceSchemas().getSchema(
    "https://github.com/Odenknight/gkos-standard/schemas/provisional/science/rerun-comparison.draft.schema.json",
  );
  if (!validate(record)) throw new Error("Invalid SRTP comparison record");
  return { comparison, srtp_record: record };
}

export function runSuite(outPath) {
  const valid = pilot();
  const altered = pilot({ methodFile: "altered-method.json" });
  const report = {
    status: "provisional-draft-non-qualifying",
    profiles_claimed: [],
    source_base: "446b2d4526c09150bed0d7d699b010850b2dd68d",
    cases: [
      { id: "CAP-P01", attestation: valid.candidate, use: gate(valid) },
      { id: "CAP-N01", attestation: altered.candidate, use: gate(altered) },
      { id: "CAP-P02", ...scientificComparison() },
    ],
  };
  report.passed =
    report.cases[0].use.outcome === "allowed" &&
    report.cases[1].use.outcome === "refused" &&
    report.cases[1].attestation.checks.some(
      (c) => c.check === "method_match" && c.outcome === "FAIL",
    ) &&
    report.cases[2].comparison.evaluation === "PASS";
  if (outPath) {
    writeFileSync(outPath, JSON.stringify(report, null, 2) + "\n");
    const fd = openSync(outPath, "r+");
    try {
      fsyncSync(fd);
    } finally {
      closeSync(fd);
    }
  }
  return report;
}
export function writeExamples() {
  const good = pilot(),
    bad = pilot({ methodFile: "altered-method.json" });
  for (const [name, value] of Object.entries({
    "example.definition.json": good.definition,
    "example.pass.json": good.candidate,
    "example.fail.json": bad.candidate,
  }))
    writeFileSync(
      resolve(FIXTURES, name),
      JSON.stringify(value, null, 2) + "\n",
    );
  writeFileSync(
    resolve(FIXTURES, "example.execution-receipt.json"),
    good.readExecution("aggregate-001").receiptBytes,
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  if (process.argv.includes("--write-examples")) writeExamples();
  const index = process.argv.indexOf("--out");
  if (index !== -1 && !process.argv[index + 1])
    throw new Error("--out requires a file path");
  const report = runSuite(
    index === -1 ? undefined : resolve(process.argv[index + 1]),
  );
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.passed ? 0 : 1;
}
