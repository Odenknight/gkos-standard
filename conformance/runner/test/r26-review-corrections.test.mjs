// R26 (proposed; v0.83 development line): focused checks for the corrections to the advisory
// review findings r26-REV-003..007 and for the runner wave 2 modules, beyond the catalog rows.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { assembleContext, canonicalEncode, captureSelection, verifyArtifactBytes } from "../canonical.mjs";
import { loadSchemaRegistry } from "../schema-registry.mjs";
import { evaluateEffectContainment } from "../effect-containment.mjs";
import { evaluateOperationKind } from "../operation-kind.mjs";
import { evaluateGate } from "../gate-evaluator.mjs";
import { checkStateChangeReceiptRole } from "../state-change-receipt-role.mjs";

const read = (path) => JSON.parse(readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8"));
const registry = loadSchemaRegistry();
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

test("r26-REV-003: schema-declared sets are checked for canonical order; order-sensitive arrays are not", () => {
  const manifest = read("fixtures/development/r26/A16/a16-n-restriction-display-only-003.json").context_manifest;
  const verify = (value) => codeOf(() => verifyArtifactBytes(canonicalEncode(value), registry));
  assert.equal(verify({ ...manifest, restrictions: ["a", "b"] }), null);
  assert.equal(verify({ ...manifest, restrictions: ["b", "a"] }), "GKOS-GATE-L6-001");
  // Canonical CBOR order puts the shorter text first: "zz" (0x62...) before "aaa" (0x63...).
  assert.equal(verify({ ...manifest, restrictions: ["zz", "aaa"] }), null);
  assert.equal(verify({ ...manifest, restrictions: ["aaa", "zz"] }), "GKOS-GATE-L6-001");
  // members is order-sensitive: reversed presentation order stays valid.
  assert.equal(verify({ ...manifest, members: [...manifest.members].reverse() }), null);
});

test("r26-REV-005: the declared selection version selects the assembly path", () => {
  const fixture = read("fixtures/development/r26/A06/a06-n-r26-assembly-mislabel-005.json");
  const asText = Object.fromEntries(Object.entries(fixture.resolved_content_base64).map(([key, value]) => [key, Buffer.from(value, "base64").toString("latin1")]));
  const raw = Buffer.from(fixture.resolved_content_base64[fixture.selection_envelope.members[0].object_ref.digest.value], "base64").toString("utf8");
  const contradiction = fixture.selection_envelope.closure_inputs[0].object_ref.digest.value;
  const inputs = (content) => ({ ...fixture.assembly_inputs, resolved_content: content, schema_registry: registry });
  // R26 1.1.0: raw text labelled GKX-CBOR-1 is refused even when passed as text.
  assert.throws(() => assembleContext(captureSelection(fixture.selection_envelope), inputs(asText)), /GKOS-GATE-L6-007/);
  // Legacy 1.0.0: the published pre-R26 UTF-8 recompute still applies (GCP-6 replay compatibility).
  const legacy = { ...fixture.selection_envelope, schema_version: "1.0.0", closure_inputs: [] };
  const manifest = assembleContext(captureSelection(legacy), inputs({ [legacy.members[0].object_ref.digest.value]: raw, [contradiction]: "" }));
  assert.equal(manifest.schema_version, "1.0.0");
  assert.equal(registry.ajv.getSchema("context-manifest.schema.json")(manifest), true);
  // Any other declared version is outside the verifier's declared set.
  assert.throws(() => assembleContext({ ...legacy, schema_version: "9.9.9" }, inputs({})), /GKOS-GATE-L6-001/);
});

test("r26-REV-006: commit-time evidence is validated before the disposition shortcut", () => {
  const record = (commitTime, status) => ({
    kind: "deferred-review", delegation_ref: "delegation:x", review_deadline_seconds: 60, evaluation_time: "2026-10-01T00:00:00.000000Z",
    actions: [{ action_ref: "a", review_status: status, ...(commitTime === undefined ? {} : { commit_time: commitTime }) }],
  });
  for (const commitTime of [null, "invalid", undefined, "2026-10-01T00:00:00Z"]) {
    assert.equal(evaluateGate(record(commitTime, "dispositioned")), "GKOS-GATE-L5-001", String(commitTime));
  }
  assert.equal(evaluateGate(record("2026-09-01T00:00:00.000000Z", "dispositioned")), null);
});

test("r26-REV-007: the policy digest must be a digest in its declared representation", () => {
  const base = read("fixtures/development/r26/A12/cases.json").cases.find((c) => c.id === "R26-A12-01");
  const withDigest = (digest) => checkStateChangeReceiptRole({ ...base, record: { ...base.record, policy: { ...base.record.policy, digest } } });
  const value = "0".repeat(63) + "1";
  for (const ok of [{ algorithm: "sha-256", value }, { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", value }, { algorithm: "sha-256", basis: "received-bytes", value }]) {
    assert.equal(withDigest(ok).satisfies_role, true, JSON.stringify(ok));
  }
  for (const bad of [false, {}, "not-a-digest", [], null, { algorithm: "sha-1", value }, { algorithm: "sha-256", value: value.toUpperCase() + "A" },
    { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", basis: "received-bytes", value }, { algorithm: "sha-256", value, extra: 1 }]) {
    assert.deepEqual(withDigest(bad), { satisfies_role: false, missing_elements: ["policy_digest"] }, JSON.stringify(bad));
  }
});

test("R26-A02 containment: unknown dimensions, unbound policy inputs and combined findings", () => {
  const a = read("fixtures/development/r26/A02/cases.json").cases.find((c) => c.case_id === "R26-A02-01");
  const scope = a.requested;
  const auth = (s, extra = {}) => [{ source: "actor-standing", scope: s, ...extra }];
  // A dimension GKOS does not define is incomparable.
  assert.equal(evaluateEffectContainment({ requested: { ...scope, colour: "red" }, authorizing: auth(a.authorizing[0].scope), policy: a.policy }).gate_code, "GKOS-GATE-L7-003");
  // Policy inputs without a digest-bound policy reference cannot be used.
  assert.equal(evaluateEffectContainment({ requested: scope, authorizing: auth(a.authorizing[0].scope), policy: { required_dimensions: [] } }).gate_code, "GKOS-GATE-L7-003");
  // Both conditions are reported; the presence check comes first.
  const both = evaluateEffectContainment({ requested: { ...scope, environment: "staging", audience: ["x"] }, authorizing: auth(a.authorizing[0].scope), policy: a.policy });
  assert.deepEqual(both.gate_codes, ["GKOS-GATE-L7-003", "GKOS-GATE-L7-002"]);
  // An empty chain or a malformed value fails closed.
  assert.equal(evaluateEffectContainment({ requested: scope, authorizing: [], policy: a.policy }).gate_code, "GKOS-GATE-L7-003");
  assert.equal(evaluateEffectContainment({ requested: { ...scope, reversibility: "maybe" }, authorizing: auth(a.authorizing[0].scope), policy: a.policy }).gate_code, "GKOS-GATE-L7-003");
  // A receipt without permitted_action_classes does not permit an action_class.
  assert.equal(evaluateEffectContainment({ requested: scope, authorizing: [...auth(a.authorizing[0].scope), { source: "receipt:r", scope: a.authorizing[0].scope }], policy: a.policy, action_class: "record-export" }).gate_code, "GKOS-GATE-L7-002");
});

test("R26-A05 operation kind follows D-1 membership, including versioned policy extensions", () => {
  const receipt = (kind, gate = "GKOS-GATE-L5-005") => ({ operation_kind: kind, gate_code: gate });
  assert.equal(evaluateOperationKind({ evaluated_operation: { d1_class: "external-system-effect" }, receipt: receipt("consequential-action") }).correct, true);
  assert.equal(evaluateOperationKind({ evaluated_operation: { d1_class: null }, receipt: receipt("consequential-action") }).correct, false);
  const extension = { policy_id: "policy:d1-extension", policy_version: "1.0.0", added_classes: ["bulk-reindex"] };
  assert.equal(evaluateOperationKind({ evaluated_operation: { d1_class: "bulk-reindex" }, receipt: receipt("consequential-action"), policy_extension: extension }).correct, true);
  // An extension without identity and version is not applied (GKOS-POLICY-001).
  assert.equal(evaluateOperationKind({ evaluated_operation: { d1_class: "bulk-reindex" }, receipt: receipt("consequential-action"), policy_extension: { added_classes: ["bulk-reindex"] } }).expected_kind, null);
  // L7-002 and L7-003 arise only from effect-scope evaluation of a consequential action.
  assert.equal(evaluateOperationKind({ evaluated_operation: { d1_class: null }, receipt: receipt("other", "GKOS-GATE-L7-002") }).correct, false);
});
