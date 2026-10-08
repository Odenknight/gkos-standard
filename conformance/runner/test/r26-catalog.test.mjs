// R26 (proposed; v0.83 development line): execute the development fixture catalog
// fixtures/development/r26/fixtures.manifest.json through the reference runner. Rows the runner
// does not model stay NOT_MODELED; this test checks they are labelled so and never counted.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evaluateGate } from "../gate-evaluator.mjs";
import { evaluateAuthorityChain } from "../authority-window.mjs";
import { sameActor } from "../actor-identity.mjs";
import {
  verifyArtifactBytes, verifyCanonicalBytes, verifyDigestBinding, canonicalEncode, canonicalHash, duplicateArtifactPairs,
  captureSelection, validateRequiredClosure, assembleContext,
} from "../canonical.mjs";
import { evaluateEffectContainment } from "../effect-containment.mjs";
import { evaluateRoleProjection, patchProjection, patchSource } from "../role-projection.mjs";
import { evaluateClosureRule } from "../closure-rule.mjs";
import { evaluateOperationKind } from "../operation-kind.mjs";
import { checkStateChangeReceiptRole } from "../state-change-receipt-role.mjs";
import { evaluateTrackATwins } from "../track-a-evidence.mjs";
import { loadSchemaRegistry } from "../schema-registry.mjs";

const read = (path) => JSON.parse(readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8"));
const catalog = read("fixtures/development/r26/fixtures.manifest.json");
const registry = loadSchemaRegistry();
const ID_PREFIX = "https://github.com/Odenknight/gkos-standard/schemas/";
const fixtureFile = (row) => read(`fixtures/${row.file}`);
const caseOf = (row) => {
  const matches = fixtureFile(row).cases.filter((item) => (item.case_id ?? item.id) === row.case_id);
  assert.equal(matches.length, 1, `${row.fixture_id}: exactly one case ${row.case_id}`);
  return matches[0];
};
const codeOf = (fn) => {
  try {
    fn();
    return null;
  } catch (error) {
    const code = /^GKOS-GATE-L\d-\d{3}/.exec(error.message)?.[0];
    if (!code) throw error;
    return code;
  }
};
const assertCode = (row, actual) => {
  const expected = row.gate_expectation.expected_codes;
  if (expected.length === 0) assert.equal(actual, null, `${row.fixture_id} expected no gate`);
  else assert.ok(expected.includes(actual), `${row.fixture_id}: ${actual} not in ${expected.join(", ")}`);
};
const validator = (against) => {
  const validate = registry.ajv.getSchema(against.includes("#") ? `${ID_PREFIX}${against}` : against);
  assert.ok(validate, `schema ${against} is loaded`);
  return validate;
};

const evaluators = {
  gate: (row) => {
    const item = caseOf(row);
    const record = row.record === "case" ? item : item.record;
    // R26-A15-02: a plain hold refuses with GKOS-GATE-L4-009 (owner answer 2026-10-07).
    assertCode(row, evaluateGate(record));
  },
  "gate-twin": (row) => {
    const twin = caseOf(row);
    assert.equal(evaluateGate(twin.baseline), null);
    assertCode(row, evaluateGate(twin.mutation));
  },
  "canonical-bytes": (row) => assertCode(row, codeOf(() => verifyCanonicalBytes(Buffer.from(caseOf(row).cbor_hex, "hex")))),
  "artifact-bytes": (row) => assertCode(row, codeOf(() => verifyArtifactBytes(Buffer.from(fixtureFile(row).cbor_hex, "hex"), registry))),
  "digest-basis": (row) => {
    const source = row.case_id ? caseOf(row) : fixtureFile(row);
    const digest = source.digest ?? source.selection_member.object_ref.digest;
    const bytes = source.bytes_hex !== undefined ? Buffer.from(source.bytes_hex, "hex") : Buffer.from(source.resolved_bytes_base64, "base64");
    assertCode(row, codeOf(() => verifyDigestBinding(digest, bytes)));
  },
  "refusal-input-binding": (row) => {
    const fixture = fixtureFile(row);
    const refused = Buffer.from(fixture.refused_input_bytes_hex, "hex");
    assert.equal(codeOf(() => verifyCanonicalBytes(refused)), fixture.refused_input_expected_gate_code);
    const validate = validator("refusal-receipt-1.1.0.schema.json");
    assert.equal(validate(fixture.receipt), row.expected.result === "valid", JSON.stringify(validate.errors));
    for (const reference of fixture.receipt.input_refs) assert.equal(verifyDigestBinding(reference.digest, refused), true);
  },
  "role-check": (row) => assert.deepEqual(checkStateChangeReceiptRole(caseOf(row)), row.role_expectation),
  schema: (row) => {
    const instance = row.schema.instance === "artifact" ? caseOf(row).artifact ?? read(caseOf(row).artifact_file)
      : row.schema.instance === "instance" ? caseOf(row).instance
        : read(`fixtures/${row.schema.instance}`);
    const validate = validator(row.schema.against);
    assert.equal(validate(instance), row.schema.expect === "valid", `${row.fixture_id} ${JSON.stringify(validate.errors?.[0])}`);
  },
  "schema-definition": (row) => {
    const validate = validator(row.schema.against);
    assert.equal(validate(fixtureFile(row).instance), row.schema.expect === "valid", `${row.fixture_id} ${JSON.stringify(validate.errors?.[0])}`);
  },
  "role-object-schema": (row) => evaluators.schema(row),
  // r26-REV-004: the integral-float bytes are checked through both typed APIs.
  "artifact-digest": (row) => {
    const fixture = fixtureFile(row);
    const bytes = Buffer.from(fixture.cbor_hex, "hex");
    const viaRegistry = codeOf(() => verifyDigestBinding(fixture.digest, bytes, registry));
    assertCode(row, viaRegistry);
    if (viaRegistry === null) {
      assert.equal(codeOf(() => verifyArtifactBytes(bytes, registry)), null);
      assert.equal(codeOf(() => verifyDigestBinding(fixture.digest, bytes)), null);
    }
  },
  // r26-REV-005: the R26 (1.1.0) assembly path recomputes every digest over its named basis and
  // verifies GKX-CBOR-1 bytes as canonical artifacts through the schema registry (second round).
  "r26-assembly": (row) => {
    const fixture = fixtureFile(row);
    assert.equal(validator(fixture.selection_schema)(fixture.selection_envelope), true, `${row.fixture_id} envelope schema-valid`);
    const resolved = Object.fromEntries(Object.entries(fixture.resolved_content_base64).map(([key, value]) => [key, Buffer.from(value, "base64")]));
    let manifest = null;
    const actual = codeOf(() => {
      const selection = captureSelection(fixture.selection_envelope);
      validateRequiredClosure(selection, fixture.eligible_snapshot);
      manifest = assembleContext(selection, { ...fixture.assembly_inputs, resolved_content: resolved, schema_registry: registry });
    });
    assertCode(row, actual);
    if (actual === null) {
      assert.equal(validator(fixture.expected.manifest_schema)(manifest), true, JSON.stringify(validator(fixture.expected.manifest_schema).errors?.[0]));
      assert.equal(canonicalHash(manifest), fixture.expected.manifest_sha256);
      assert.equal(codeOf(() => verifyArtifactBytes(canonicalEncode(manifest), registry)), null);
    }
  },
  containment: (row) => assertCode(row, evaluateEffectContainment(caseOf(row)).gate_code),
  "role-projection": (row) => {
    const item = caseOf(row);
    const a13 = (name) => read(`fixtures/development/r26/A13/${name}`);
    const projection = patchProjection(a13(item.projection_file), item.projection_patch);
    const result = evaluateRoleProjection({
      source: patchSource(a13(item.source_file), item.source_patch),
      projection,
      sourceValidator: validator(projection.source_schema),
      roleValidator: validator(projection.role_schema),
    });
    const expected = row.projection_expectation;
    assert.equal(result.satisfies_role, expected.satisfies_role, `${row.fixture_id} ${result.errors.join("; ")}`);
    assert.equal(result.failure, expected.failure);
    if (Object.hasOwn(expected, "role_schema_valid")) assert.equal(result.role_schema_valid, expected.role_schema_valid);
    if (expected.satisfies_role) assert.deepEqual(result.role_object, a13(item.expected.role_object_file));
  },
  "closure-rule": (row) => {
    const fixture = fixtureFile(row);
    assertCode(row, codeOf(() => evaluateClosureRule({
      manifest: fixture.context_manifest,
      selectionEnvelope: read(fixture.selection_envelope),
      eligibleSnapshot: read(fixture.eligible_snapshot),
      rules: fixture.closure_rules.map(read),
    })));
  },
  "receipt-operation-kind": (row) => {
    evaluators.schema(row);
    const item = caseOf(row);
    const result = evaluateOperationKind({ evaluated_operation: item.evaluated_operation, receipt: item.artifact });
    assert.equal(result.expected_kind, row.operation_kind_expectation.expected_kind, row.fixture_id);
    assert.equal(result.correct, row.operation_kind_expectation.declared_kind_correct, `${row.fixture_id} ${result.reason}`);
  },
};

test("R26 development catalog is non-qualifying and binds every row to one fixture", () => {
  assert.deepEqual(catalog.qualifying_profiles, []);
  assert.deepEqual(catalog.complete_requirements, {});
  const ids = catalog.fixtures.map((row) => row.fixture_id);
  assert.equal(new Set(ids).size, ids.length);
  for (const row of catalog.fixtures) {
    assert.ok(row.file.startsWith("development/r26/"), row.fixture_id);
    if (row.case_id) caseOf(row);
    else assert.equal(fixtureFile(row).fixture_id, row.fixture_id);
    assert.ok(Object.hasOwn(evaluators, row.evaluation) || row.evaluation === "not-modeled", row.fixture_id);
  }
});

test("every executable R26 catalog row meets its expectation in the reference runner", async (t) => {
  for (const row of catalog.fixtures.filter((item) => item.evaluation !== "not-modeled")) {
    await t.test(row.fixture_id, () => evaluators[row.evaluation](row));
  }
});

test("NOT_MODELED rows are labelled, carry no test reference and are not executed", () => {
  for (const row of catalog.fixtures.filter((item) => item.evaluation === "not-modeled")) {
    assert.match(row.runner_status, /^NOT_MODELED/, row.fixture_id);
    assert.equal(row.test_ref, undefined, row.fixture_id);
  }
});

test("R26-A10 twins in the catalog satisfy the shared executable binding contract", () => {
  const file = "development/r26/A10/cases.json";
  const result = evaluateTrackATwins({ fixtures: catalog.fixtures.filter((row) => row.file === file) }, read(`fixtures/${file}`), file);
  assert.deepEqual(result.errors, []);
});

test("every schema compiles under Ajv 2020 and no two schemas share an artifact identity (R26-A08)", () => {
  for (const { name } of registry.schemas) assert.ok(registry.ajv.getSchema(name), name);
  assert.deepEqual(duplicateArtifactPairs(registry.supported), []);
  assert.deepEqual(duplicateArtifactPairs([
    { artifact_type: "x", schema_version: "1.0.0", schema_id: "a" },
    { artifact_type: "x", schema_version: "1.0.0", schema_id: "b" },
  ]), [{ pair: "x@1.0.0", schema_ids: ["a", "b"] }]);
});

test("R26-A03 chain and effect-window boundaries fail closed", () => {
  const link = { valid_from: "2026-10-01T10:00:00.000000Z", valid_until: "2026-10-01T20:00:00.000000Z" };
  const at = "2026-10-01T13:00:00.000000Z";
  assert.equal(evaluateAuthorityChain({ evaluation_time: at, chain: [] }).allowed, false);
  assert.equal(evaluateAuthorityChain({ evaluation_time: at, chain: [link, "receipt"] }).allowed, false);
  assert.equal(evaluateGate({ kind: "authority-interval", evaluation_time: at, chain: [link] }), null);
  const window = { valid_from: at, valid_until: "2026-10-01T14:00:00.000000Z" };
  // A window stated by one scope only is unknown: GKOS-GATE-L7-003.
  assert.equal(evaluateGate({ kind: "authority-interval", evaluation_time: at, chain: [link], requested_effect_window: window }), "GKOS-GATE-L7-003");
  assert.equal(evaluateGate({ kind: "authority-interval", evaluation_time: at, chain: [link], requested_effect_window: window, authorized_effect_window: window }), null);
  // The existing single-receipt authority gate is unchanged.
  assert.equal(evaluateGate({ kind: "authority", valid: true, ...link, evaluation_time: at }), null);
});

test("R26-A11 alias declarations merge transitively, need a versioned policy, and never separate", () => {
  const a = { actor_id: "a", actor_class: "human", identity_provider: "p" };
  const b = { actor_id: "b", actor_class: "human", identity_provider: "p" };
  const c = { actor_id: "c", actor_class: "human", identity_provider: "p" };
  const policy = (groups, version = "1.0.0") => ({ policy_ref: { component_id: "alias", component_version: version }, same_actor_declarations: groups });
  assert.equal(sameActor(a, c, policy([[a, b], [b, c]])), true);
  assert.equal(sameActor(a, c, policy([[a, b]])), false);
  assert.equal(sameActor(a, b, policy([[a, b]], "")), undefined);
  assert.equal(sameActor(a, { ...a }, policy([[a, b]])), true);
  assert.equal(evaluateGate({ kind: "role-separation", proposer: a, reviewer: { actor_class: "human" } }), "GKOS-GATE-L5-005");
});

test("R26-A07 typed verification keeps section 5 numeric and section 4 text rules", () => {
  const { supported, ajv } = registry;
  const verify = (hex) => codeOf(() => verifyArtifactBytes(Buffer.from(hex, "hex"), { ajv, supported }));
  assert.equal(verify("a16161f98000"), "GKOS-GATE-L6-003"); // {"a": -0.0}
  assert.equal(verify("a1616163eda080"), "GKOS-GATE-L6-005"); // lone surrogate in UTF-8
  assert.equal(verify("a1016161"), "GKOS-GATE-L6-001"); // integer map key
  assert.equal(verify(canonicalEncode({ a: 1 }).toString("hex")), "GKOS-GATE-L6-001"); // no artifact identity
  // Tag 0 over a timestamp text, through the schema-less verifier as well.
  assert.equal(codeOf(() => verifyCanonicalBytes(Buffer.from("a16161c074323032362d31302d30315431303a30303a30305a", "hex"))), "GKOS-GATE-L6-001");
});
