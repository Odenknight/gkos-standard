import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import {
  attest,
  gate,
  pilot,
  aggregate,
  compareRerun,
  runSuite,
  verifyRecord,
  definitionReference,
  registry,
  ROOT,
  scientificComparison,
} from "../computation-attestation.mjs";
import {
  rawDigest,
  jsonBytes,
  createFixtureExecutor,
} from "../attestation-fixture-executor.mjs";
import {
  canonicalEncode,
  canonicalHash,
  verifyArtifactBytes,
} from "../canonical.mjs";
const clone = structuredClone;
const refreshed = (p) => ({ ...p, candidate: attest(p) });
const changedRequest = (p, fn) => {
  const request = JSON.parse(p.requestBytes);
  fn(request);
  p.requestBytes = jsonBytes(request);
  return p;
};
const mutateEvidence = (p, fn) => {
  const source = p.readExecution(JSON.parse(p.requestBytes).run_id);
  fn(source);
  p.readExecution = () => source;
  return p;
};
const failedCheck = (record, name) =>
  record.checks.some((c) => c.check === name && c.outcome === "FAIL");

// Metaschema checking is provided by Ajv addSchema; getSchema compiles every profile.
test("CAP schemas compile; generated definition and all verdicts validate", () => {
  const reg = registry();
  for (const pair of reg.supported.filter((p) =>
    p.artifact_type.startsWith("provisional-computation"),
  ))
    assert.equal(typeof reg.ajv.getSchema(pair.schema_id), "function");
  const p = pilot();
  verifyRecord(p.definition);
  verifyRecord(p.candidate);
  for (const readExecution of [
    () => null,
    () => {
      throw Error("offline");
    },
    () => ({ receiptBytes: Buffer.from("{"), blobs: {} }),
  ])
    verifyRecord(attest({ ...p, readExecution }));
  assert.equal(gate(p).outcome, "allowed");
  assert.equal(gate(p).displayed_value.value_minor, 12000);
});

test("CAP replay is byte and hash identical; canonical verifier round-trips all fields", () => {
  const p = pilot(),
    first = p.candidate,
    second = attest(p);
  assert.deepEqual(canonicalEncode(first), canonicalEncode(second));
  assert.equal(canonicalHash(first), canonicalHash(second));
  assert.deepEqual(
    verifyArtifactBytes(canonicalEncode(first), registry()).value,
    first,
  );
  const ordered = Object.fromEntries(Object.entries(first).reverse());
  assert.deepEqual(canonicalEncode(first), canonicalEncode(ordered));
  assert.deepEqual(first, p.candidate);
});

const attacks = [
  [
    "altered method executes a real filter",
    "method_match",
    () => pilot({ methodFile: "altered-method.json" }),
  ],
  [
    "changed input snapshot",
    "input_binding",
    () =>
      pilot({
        inputBytes: jsonBytes([
          { item: "synthetic-001", kind: "consultation", amount_minor: 12000 },
        ]),
      }),
  ],
  [
    "changed parameters",
    "input_binding",
    () => pilot({ parameterBytes: jsonBytes({ maximum_rows: 99 }) }),
  ],
  [
    "parameter exceeds approved bound",
    "parameter_bounds",
    () => pilot({ parameterBytes: jsonBytes({ maximum_rows: 101 }) }),
  ],
  [
    "unknown parameter",
    "parameter_bounds",
    () =>
      pilot({ parameterBytes: jsonBytes({ maximum_rows: 100, extra: true }) }),
  ],
  [
    "displayed number changed",
    "result_fidelity",
    () => ({
      ...pilot(),
      presentationBytes: jsonBytes({
        name: "total",
        value_minor: 12500,
        units: "USD-cent",
      }),
    }),
  ],
  [
    "displayed units changed",
    "result_fidelity",
    () => ({
      ...pilot(),
      presentationBytes: jsonBytes({
        name: "total",
        value_minor: 12000,
        units: "USD",
      }),
    }),
  ],
  [
    "displayed type changed",
    "result_fidelity",
    () => ({
      ...pilot(),
      presentationBytes: jsonBytes({
        name: "total",
        value_minor: "12000",
        units: "USD-cent",
      }),
    }),
  ],
  [
    "authoritative bytes corrupted",
    "evidence_integrity",
    () =>
      mutateEvidence(pilot(), (s) => {
        s.blobs.result = jsonBytes({
          name: "total",
          value_minor: 12500,
          units: "USD-cent",
        });
      }),
  ],
  [
    "environment substituted",
    "environment_match",
    () =>
      mutateEvidence(pilot(), (s) => {
        s.blobs.environment = jsonBytes({ interpreter: "other" });
      }),
  ],
  [
    "executor identity spoofed",
    "executor_identity",
    () =>
      mutateEvidence(pilot(), (s) => {
        const r = JSON.parse(s.receiptBytes);
        r.executor_id = "untrusted";
        s.receiptBytes = jsonBytes(r);
      }),
  ],
  [
    "cross-run receipt replay",
    "execution_binding",
    () =>
      mutateEvidence(pilot(), (s) => {
        const r = JSON.parse(s.receiptBytes);
        r.run_id = "another-run";
        s.receiptBytes = jsonBytes(r);
      }),
  ],
  [
    "failed execution status",
    "execution_binding",
    () =>
      mutateEvidence(pilot(), (s) => {
        const r = JSON.parse(s.receiptBytes);
        r.state = "failed";
        s.receiptBytes = jsonBytes(r);
      }),
  ],
  [
    "request changes definition reference",
    "execution_binding",
    () =>
      changedRequest(pilot(), (r) => {
        r.definition_ref.artifact_version = "unapproved";
      }),
  ],
];
for (const [name, check, build] of attacks)
  test(`CAP refuses ${name}`, () => {
    const p = refreshed(build());
    assert.equal(p.candidate.verdict, "FAIL");
    assert.ok(failedCheck(p.candidate, check));
    const result = gate(p);
    assert.equal(result.outcome, "refused");
    assert.equal(result.displayed_value, null);
  });

test("CAP missing evidence is distinct from mismatch and blocks required use", () => {
  const unavailable = refreshed({ ...pilot(), readExecution: () => null });
  assert.equal(unavailable.candidate.verdict, "UNEVALUATED");
  assert.equal(gate(unavailable).outcome, "refused");
  const partial = refreshed(
    mutateEvidence(pilot(), (s) => {
      delete s.blobs.bills;
    }),
  );
  assert.equal(partial.candidate.verdict, "PARTIAL");
  assert.equal(gate(partial).outcome, "refused");
  const malformed = refreshed(
    mutateEvidence(pilot(), (s) => {
      s.receiptBytes = Buffer.from("{");
    }),
  );
  assert.equal(malformed.candidate.verdict, "FAIL");
});

test("CAP rejects empty, duplicate, reordered, omitted checks and false PASS", () => {
  const p = pilot();
  for (const change of [
    (r) => {
      delete r.checks;
    },
    (r) => {
      r.checks = [];
    },
    (r) => {
      r.checks[0].outcome = "FAIL";
    },
    (r) => {
      r.checks[0] = clone(r.checks[1]);
    },
  ]) {
    const r = clone(p.candidate);
    change(r);
    assert.throws(() => verifyRecord(r));
    assert.equal(gate({ ...p, candidate: r }).outcome, "refused");
  }
  const duplicate = clone(p.candidate);
  duplicate.checks[0] = { ...duplicate.checks[1], reason: "different text" };
  assert.throws(() => aggregate(duplicate.checks));
  assert.equal(gate({ ...p, candidate: duplicate }).outcome, "refused");
  const reordered = clone(p.candidate);
  reordered.checks.reverse();
  assert.equal(gate({ ...p, candidate: reordered }).outcome, "refused");
  const notPass = clone(p.candidate);
  notPass.verdict = "UNEVALUATED";
  assert.throws(() => verifyRecord(notPass));
});

test("CAP caller cannot fabricate a receipt or rewrite a checked result", () => {
  const p = pilot();
  const fabricated = clone(p.candidate);
  fabricated.result_digest = rawDigest(Buffer.from("invented"));
  assert.equal(gate({ ...p, candidate: fabricated }).outcome, "refused");
  const forged = refreshed({
    ...p,
    presentationBytes: jsonBytes({
      name: "total",
      value_minor: 12500,
      units: "USD-cent",
    }),
  });
  for (const c of forged.candidate.checks) {
    c.outcome = "PASS";
    c.reason = "verified";
  }
  forged.candidate.verdict = "PASS";
  forged.candidate.reason_codes = [];
  assert.equal(gate(forged).outcome, "refused");
  const source = p.readExecution("aggregate-001");
  source.blobs.result.fill(0);
  assert.equal(attest(p).verdict, "PASS"); // isolated archive copy
});

for (const [name, change] of [
  [
    "expired method approval",
    (p) => {
      p.approval.valid_until = p.action.at;
    },
  ],
  [
    "revoked method approval",
    (p) => {
      p.approval.status = "superseded";
    },
  ],
  [
    "wrong method approval",
    (p) => {
      p.approval.definition_ref.digest.value = "0".repeat(64);
    },
  ],
  [
    "expired policy",
    (p) => {
      p.policy.valid_until = p.action.at;
    },
  ],
  [
    "revoked policy",
    (p) => {
      p.policy.status = "revoked";
    },
  ],
  [
    "different request authorization",
    (p) => {
      p.policy.request_digest = rawDigest(Buffer.from("other"));
    },
  ],
  [
    "wrong recipient",
    (p) => {
      p.action.recipient = "other";
    },
  ],
  [
    "wrong purpose",
    (p) => {
      p.action.purpose = "clinical-use";
    },
  ],
  [
    "malformed captured action time",
    (p) => {
      p.action.at = "2026-99-99T99:00:00.000000Z";
    },
  ],
])
  test(`CAP separates historical PASS from ${name}`, () => {
    const p = pilot(),
      before = clone(p.candidate);
    change(p);
    assert.equal(gate(p).outcome, "refused");
    assert.deepEqual(p.candidate, before);
    assert.equal(attest(p).verdict, "PASS");
  });

test("CAP required failures cannot be waived by adding an override field", () => {
  const p = pilot({ methodFile: "altered-method.json" });
  p.policy.human_override = true;
  assert.equal(gate(p).outcome, "refused");
});

test("CAP canonical metadata, timestamps, and digest basis are enforced", () => {
  const p = pilot();
  for (const change of [
    (r) => {
      delete r.canonical_profile;
    },
    (r) => {
      r.schema_version = "999";
    },
    (r) => {
      r.emitted_at = "2026-10-12T08:00:00Z";
    },
    (r) => {
      r.result_digest = {
        algorithm: "sha-256",
        canonical_profile: "GKX-CBOR-1",
        value: "0".repeat(64),
      };
    },
  ]) {
    const r = clone(p.candidate);
    change(r);
    assert.throws(() => verifyRecord(r));
  }
  const definition = clone(p.definition);
  definition.created_at = "2026-10-12T08:00:00Z";
  assert.throws(() => definitionReference(definition));
});

test("CAP standalone rerun tolerance passes within bounds, fails outside and at zero tolerance", () => {
  const x = {
    baseline: "-76.123456",
    rerun: "-76.123455",
    absolute: "0.000002",
    relative: "0",
    units: "Eh",
  };
  assert.equal(compareRerun(x).evaluation, "PASS");
  assert.equal(compareRerun({ ...x, absolute: "0" }).evaluation, "FAIL");
  assert.equal(compareRerun({ ...x, rerun: "-76.123" }).evaluation, "FAIL");
  assert.equal(
    compareRerun({
      ...x,
      baseline: "10",
      rerun: "10.1",
      absolute: "0",
      relative: "0.02",
    }).evaluation,
    "PASS",
  );
  assert.equal(
    compareRerun({ ...x, baseline: "0", rerun: "1", absolute: "1" }).evaluation,
    "PASS",
  );
  for (const bad of [
    { absolute: undefined, relative: undefined },
    { absolute: "-1" },
    { baseline: "NaN" },
    { rerun: "Infinity" },
    { baseline: "1e309" },
    { absolute: "Infinity" },
    { relative: {} },
    { baseline: "-0" },
    { baseline: "1e308", rerun: "-1e308" },
  ])
    assert.throws(() => compareRerun({ ...x, ...bad }));
  const p = pilot();
  p.presentationBytes = jsonBytes({
    name: "total",
    value_minor: 12001,
    units: "USD-cent",
  });
  p.policy.absolute_tolerance = 100;
  assert.equal(gate(refreshed(p)).outcome, "refused");
});

test("CAP executor rejects unsafe arithmetic and duplicate run identity", () => {
  const executor = createFixtureExecutor();
  const fixture = (n) =>
    readFileSync(resolve(ROOT, "fixtures/provisional/attestation", n));
  const input = {
    runId: "one",
    methodBytes: fixture("method.json"),
    inputBytes: fixture("bills.json"),
    parameterBytes: fixture("parameters.json"),
    environmentBytes: fixture("environment.json"),
  };
  executor.execute(input);
  assert.throws(() => executor.execute(input));
  for (const amounts of [[-1], [1.5], [Number.MAX_SAFE_INTEGER, 1]])
    assert.throws(() =>
      executor.execute({
        ...input,
        runId: `bad-${amounts}`,
        inputBytes: jsonBytes(
          amounts.map((amount_minor) => ({ amount_minor })),
        ),
      }),
    );
});

test("CAP writes inspectable refusal evidence; report never claims conformance", () => {
  const output = join(mkdtempSync(join(tmpdir(), "cap-")), "report.json");
  const report = runSuite(output);
  assert.equal(report.passed, true);
  assert.deepEqual(report.profiles_claimed, []);
  const saved = JSON.parse(readFileSync(output, "utf8"));
  assert.deepEqual(saved, report);
  assert.equal(saved.cases[1].use.outcome, "refused");
  assert.equal(saved.cases[1].use.displayed_value, null);
  assert.ok(saved.cases[1].use.attestation_digest);
  assert.deepEqual(saved.cases[1].use.profiles_claimed, []);
});

test("CAP scientific comparison reuses the existing provisional SRTP shape", () => {
  const result = scientificComparison();
  assert.equal(result.srtp_record.srtp_type, "srtp:RerunComparison");
  assert.equal(result.srtp_record.evaluation, result.comparison.evaluation);
  assert.equal(result.srtp_record.comparison_mode, "numerical-tolerance");
});

test("CAP attestation captured after action cannot authorize that action", () => {
  const p = changedRequest(pilot(), (r) => {
    r.evaluated_at = "2026-10-12T09:00:00.000000Z";
  });
  p.policy.request_digest = rawDigest(p.requestBytes);
  assert.ok(gate(refreshed(p)).reason_codes.includes("attestation_after_use"));
});

test("CAP checked-in examples match the executable pilot and actual source hashes", () => {
  const read = (name) =>
    JSON.parse(
      readFileSync(
        resolve(ROOT, "fixtures/provisional/attestation", name),
        "utf8",
      ),
    );
  const p = pilot(),
    bad = pilot({ methodFile: "altered-method.json" });
  assert.deepEqual(read("example.definition.json"), p.definition);
  assert.deepEqual(read("example.pass.json"), p.candidate);
  assert.deepEqual(read("example.fail.json"), bad.candidate);
  const raw = readFileSync(
    resolve(
      ROOT,
      "fixtures/provisional/attestation/example.execution-receipt.json",
    ),
  );
  assert.deepEqual(rawDigest(raw), p.candidate.execution_receipt_digest);
});
