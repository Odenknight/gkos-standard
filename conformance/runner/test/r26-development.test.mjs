// R26 (proposed; v0.83 development line): A06 digest basis and A09 most-specific L6 code in the
// canonical verifier and A10 Option A gate codes in the portable evaluator.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { evaluateGate } from "../gate-evaluator.mjs";
import { assembleContext, verifyCanonicalBytes, verifyDigestBinding } from "../canonical.mjs";
import { evaluateTrackATwins } from "../track-a-evidence.mjs";

const read = (path) => JSON.parse(readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8"));
const codes = read("requirements/DIAGNOSTIC_CODES.json").codes;
const trackA = read("fixtures/track-a/cases.json").cases;
const a10 = read("fixtures/development/r26/A10/cases.json").cases;
const a15Twins = read("fixtures/development/r26/A15/twins.json").cases;
const a09 = read("fixtures/development/r26/A09/canonical-bytes.json").cases;
const digestCases = read("fixtures/development/r26/runner-L6/digest-basis.json").cases;
const twinFile ="development/r26/A10/cases.json";
const r26Codes = ["GKOS-GATE-L1-002", "GKOS-GATE-L1-003", "GKOS-GATE-L2-001", "GKOS-GATE-L3-002", "GKOS-GATE-L4-005",
  "GKOS-GATE-L4-006", "GKOS-GATE-L4-007", "GKOS-GATE-L4-008", "GKOS-GATE-L6-010", "GKOS-GATE-L7-008"];
const verify = (hex) => {
  try {
    verifyCanonicalBytes(Buffer.from(hex, "hex"));
    return null;
  } catch (error) {
    return error.message.split(" ")[0];
  }
};

test("R26-A10 allocates ten registered codes, each mapped to the listed requirements", () => {
  // 28 published codes, ten R26-A10 allocations and GKOS-GATE-L4-009 for R26-A15 (owner answer 2026-10-07).
  assert.equal(Object.keys(codes).length, 39);
  const mapped = new Map(r26Codes.map((code) => [code, codes[code]?.requirement_ids]));
  assert.deepEqual(Object.fromEntries(mapped), {
    "GKOS-GATE-L1-002": ["GKOS-REENTRY-002"],
    "GKOS-GATE-L1-003": ["GKOS-REENTRY-003"],
    "GKOS-GATE-L2-001": ["GKOS-IDENTITY-003"],
    "GKOS-GATE-L3-002": ["GKOS-LINEAGE-003"],
    "GKOS-GATE-L4-005": ["GKOS-POLICY-001"],
    "GKOS-GATE-L4-006": ["GKOS-RETENTION-001", "GKOS-RETENTION-002"],
    "GKOS-GATE-L4-007": ["GKOS-DELEGATION-001"],
    "GKOS-GATE-L4-008": ["GKOS-DELEGATION-005"],
    "GKOS-GATE-L6-010": ["GKOS-CONTEXT-002"],
    "GKOS-GATE-L7-008": ["GKOS-AUTHUSE-001"],
  });
  for (const code of r26Codes) assert.equal(codes[code].layer, code.slice(10, 12), code);
});

test("R26-A15 allocates GKOS-GATE-L4-009 for a refusal on an active hold, distinct from L4-006", () => {
  assert.deepEqual(codes["GKOS-GATE-L4-009"], { layer: "L4", requirement_ids: ["GKOS-RETENTION-001"], condition: "Deletion or disposition refused: active hold" });
  assert.equal(evaluateGate({ kind: "hold", evaluation: "hold", erasure_required: false }), "GKOS-GATE-L4-009");
  assert.equal(evaluateGate({ kind: "hold", evaluation: "hold", erasure_required: true }), "GKOS-GATE-L4-002");
  assert.equal(evaluateGate({ kind: "disposition-hold", committed: true, hold_predicate_consulted: false, hold_result_bound: false }), "GKOS-GATE-L4-006");
  // Track-A hold twins keep their published outcomes.
  for (const twin of trackA.filter((item) => item.baseline.kind === "hold")) {
    assert.equal(evaluateGate(twin.baseline), null, twin.id);
    assert.equal(evaluateGate(twin.mutation), twin.expected, twin.id);
  }
});

test("every registered gate code has an executable baseline/mutation twin", () => {
  const covered = new Set([...trackA, ...a10, ...a15Twins].map((twin) => twin.expected));
  assert.deepEqual(Object.keys(codes).filter((code) => !covered.has(code)), []);
  // One violation fixture per affected requirement (R26-A10 fixtures).
  assert.equal(a10.length, 11);
  for (const twin of a10) assert.deepEqual(twin.requirement_ids.filter((id) => !codes[twin.expected].requirement_ids.includes(id)), [], twin.id);
});

test("every R26-A10 baseline stays open and its mutation closes the expected code", async (t) => {
  for (const twin of a10) {
    await t.test(twin.id, () => {
      assert.equal(evaluateGate(twin.baseline), null);
      assert.equal(evaluateGate(twin.mutation), twin.expected);
    });
  }
});

test("R26-A10 twins bind to a catalog through the shared executable contract", () => {
  const catalog = { fixtures: a10.map((twin) => ({ fixture_id: twin.id, class: "mutation", file: twinFile, case_id: twin.id, gate_expectation: { expected_codes: [twin.expected] } })) };
  const result = evaluateTrackATwins(catalog, { cases: a10 }, twinFile);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(Object.keys(result.coverage).sort(), [...r26Codes].sort());
  // A binding that cites another file is not accepted as coverage.
  assert.ok(evaluateTrackATwins(catalog, { cases: a10 }).errors.length > 0);
});

test("R26-A10 missing and mistyped evidence always closes the expected code", async (t) => {
  for (const twin of a10) {
    await t.test(twin.id, () => {
      for (const [field, value] of Object.entries(twin.baseline)) {
        if (field === "kind") continue;
        const invalid = [undefined, null, {}, ...(Array.isArray(value) ? [[null], [""], "x"] : [[]]), ...(typeof value === "boolean" ? [0, 1, "false", "true"] : [false, 17, ""])];
        for (const replacement of invalid) {
          assert.equal(evaluateGate({ ...twin.baseline, [field]: replacement }), twin.expected, `${field}=${JSON.stringify(replacement)}`);
        }
      }
    });
  }
});

test("R26-A10 boundaries and vocabularies", () => {
  const bounds = a10.find((twin) => twin.expected === "GKOS-GATE-L4-007").baseline;
  assert.equal(evaluateGate({ ...bounds, delegation_valid_until: "2026-12-30T23:59:59.999999Z" }), null);
  assert.equal(evaluateGate({ ...bounds, delegation_valid_until: "2026-12-31T00:00:00.000001Z" }), "GKOS-GATE-L4-007");
  assert.equal(evaluateGate({ ...bounds, scope_contained: false }), "GKOS-GATE-L4-007");
  assert.equal(evaluateGate({ ...bounds, delegation_valid_until: "2026-12-31T00:00:00Z" }), "GKOS-GATE-L4-007");
  for (const basis of ["timestamp", "uuid-order", "lexical-order", "implementation-tiebreak", "invented"]) {
    assert.equal(evaluateGate({ kind: "lineage-selection", selection_basis: basis }), "GKOS-GATE-L3-002", basis);
  }
  assert.equal(evaluateGate({ kind: "lineage-selection", selection_basis: "authorized-declaration" }), null);
  for (const operation of ["live-retrieval", "model-call", "navigation", "random-generation", "wall-clock-read", "mutable-external-lookup"]) {
    assert.equal(evaluateGate({ kind: "deterministic-assembly", live_operations: [operation] }), "GKOS-GATE-L6-010", operation);
  }
  for (const field of ["manifest_id", "manifest_version", "digest_algorithm", "canonical_hash"]) {
    const fields = ["manifest_id", "manifest_version", "digest_algorithm", "canonical_hash"].filter((item) => item !== field);
    assert.equal(evaluateGate({ kind: "authorized-use-binding", bound_manifest_fields: fields }), "GKOS-GATE-L7-008", field);
  }
  assert.equal(evaluateGate({ kind: "disposition-hold", committed: false, hold_predicate_consulted: false, hold_result_bound: false }), null);
  assert.equal(evaluateGate({ kind: "policy-identity", declared_policy_id: "p", declared_policy_version: "1.0.0", applied_policy_id: "p", applied_policy_version: "1.0.1" }), "GKOS-GATE-L4-005");
  // In-place merge stays GKOS-GATE-L1-001; other predecessor mutation or destruction is L1-003.
  assert.equal(evaluateGate({ kind: "reentry", mutates_predecessor: true }), "GKOS-GATE-L1-001");
  assert.equal(evaluateGate({ kind: "reentry-preservation", predecessor_mutated: true, predecessor_destroyed: false }), "GKOS-GATE-L1-003");
});

test("R26-A06 digests are recomputed over the bytes their basis names", async (t) => {
  for (const fixture of digestCases) {
    await t.test(fixture.id, () => {
      let got = null;
      try {
        verifyDigestBinding(fixture.digest, Buffer.from(fixture.bytes_hex, "hex"));
      } catch (error) {
        got = error.message.split(" ")[0];
      }
      assert.equal(got, fixture.expected_codes[0] ?? null);
    });
  }
  const member = digestCases.find((fixture) => fixture.id === "R26-RL6-P01");
  const selection = (digest) => ({ selection_set_id: "fixture:s", selection_set_version: "1.0.0", purpose: "p", recipient: "r",
    members: [{ object_ref: { artifact_id: "fixture:m", artifact_version: "1.0.0", digest } }], closure_inputs: [], known_omissions: [] });
  const ref = (id, value) => ({ component_id: id, component_version: "1.0.0", digest: { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", value } });
  const inputs = (content) => ({ manifest_id: "fixture:m", manifest_version: "1.0.0", compiled_at: "2026-10-07T12:00:00.000000Z",
    policy_ref: ref("fixture:p", "d".repeat(64)), compiler_ref: ref("fixture:c", "e".repeat(64)), resolved_content: { [member.digest.value]: content } });
  const bytes = Buffer.from(member.bytes_hex, "hex");
  // Context assembly accepts a received-bytes member as exact bytes or as text.
  assert.equal(assembleContext(selection(member.digest), inputs(bytes)).members.length, 1);
  assert.equal(assembleContext(selection(member.digest), inputs(bytes.toString("utf8"))).members.length, 1);
  assert.throws(() => assembleContext(selection(member.digest), inputs(Buffer.concat([bytes, Buffer.from(" ")]))), /GKOS-GATE-L6-007/);
});

test("R26-A09 canonical verifier reports duplicate and out-of-order keys as GKOS-GATE-L6-002", async (t) => {
  for (const fixture of a09) {
    await t.test(fixture.id, () => {
      const got = verify(fixture.cbor_hex);
      if (fixture.expected_codes.length === 0) assert.equal(got, null);
      else assert.ok(fixture.expected_codes.includes(got), `${fixture.id}: ${got}`);
    });
  }
  assert.equal(verify("a2616202616101"), "GKOS-GATE-L6-002");
  assert.equal(verify("a2616101616102"), "GKOS-GATE-L6-002");
  // Integer keys, deeper nesting, arrays of maps and tagged maps.
  assert.equal(verify("a20201010102"), "GKOS-GATE-L6-002");
  assert.equal(verify("81a2616202616101"), "GKOS-GATE-L6-002");
  assert.equal(verify("a1616181a2616202616101"), "GKOS-GATE-L6-002");
  // Conditions no L6-002 condition names stay L6-001.
  for (const hex of ["9f01ff", "1801", "a161611801", "fb3ff0000000000000", "a2616101"]) assert.equal(verify(hex), "GKOS-GATE-L6-001", hex);
  // Sorted keys in a deterministic map still verify.
  assert.equal(verify("a3616101616202627a7a03"), null);
});
