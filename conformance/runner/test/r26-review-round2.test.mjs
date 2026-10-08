// R26 (accepted in part 2026-10-07; v0.83 development line): focused checks for the second-round advisory review
// findings r26-REV-005 (residual), r26-REV-010, r26-REV-011 and r26-REV-012, beyond the catalog rows.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { assembleContext, canonicalHash, captureSelection } from "../canonical.mjs";
import { loadSchemaRegistry } from "../schema-registry.mjs";
import { evaluateEffectContainment } from "../effect-containment.mjs";
import { evaluateRoleProjection, patchProjection, patchSource } from "../role-projection.mjs";
import { evaluateClosureRule } from "../closure-rule.mjs";

const read = (path) => JSON.parse(readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8"));
const registry = loadSchemaRegistry();
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
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

test("r26-REV-005: R26 assembly verifies GKX-CBOR-1 content as a canonical artifact", () => {
  const fixture = read("fixtures/development/r26/A06/a06-p-r26-assembly-004.json");
  const resolved = Object.fromEntries(Object.entries(fixture.resolved_content_base64).map(([key, value]) => [key, Buffer.from(value, "base64")]));
  const assemble = (envelope, content, extra = {}) => codeOf(() => assembleContext(captureSelection(envelope), { ...fixture.assembly_inputs, resolved_content: content, ...extra }));
  assert.equal(assemble(fixture.selection_envelope, resolved, { schema_registry: registry }), null);
  // Without a schema registry the R26 path refuses rather than fall back to a structural check.
  assert.equal(assemble(fixture.selection_envelope, resolved), "GKOS-GATE-L6-007");
  assert.equal(assemble(fixture.selection_envelope, resolved, { schema_registry: {} }), "GKOS-GATE-L6-007");
  // Reviewer mutations: raw "ab" and "1" are canonical CBOR scalars, not artifacts.
  const member = fixture.selection_envelope.members[0];
  for (const raw of ["ab", "1"]) {
    const bytes = Buffer.from(raw, "utf8");
    const ref = { ...member.object_ref, digest: { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", value: sha256(bytes) } };
    const envelope = { ...fixture.selection_envelope, members: [{ ...member, object_ref: ref }] };
    assert.equal(assemble(envelope, { ...resolved, [ref.digest.value]: bytes }, { schema_registry: registry }), "GKOS-GATE-L6-007", raw);
    // The legacy (1.0.0) path is unchanged: it never reads a registry.
    const legacy = { ...envelope, schema_version: "1.0.0", closure_inputs: [] };
    assert.equal(assemble(legacy, { [ref.digest.value]: raw }), null, `${raw} legacy`);
  }
});

test("r26-REV-010: value tables translate enumerated values only", () => {
  const a13 = (name) => read(`fixtures/development/r26/A13/${name}`);
  const base = a13("projection.decision-record-to-refusal-receipt.json");
  const evaluate = (patches, sourcePatch) => {
    const projection = patchProjection(base, patches);
    return evaluateRoleProjection({
      source: patchSource(a13("source.decision-record.json"), sourcePatch),
      projection,
      sourceValidator: registry.ajv.getSchema(projection.source_schema),
      roleValidator: registry.ajv.getSchema(projection.role_schema),
    });
  };
  // The declared enumerated translation (disposition -> result) stays valid.
  assert.equal(evaluate([]).satisfies_role, true);
  const swap = (role, source, table) => [{ op: "remove-mapping", role_element: role }, { op: "add-mapping", mapping: { role_element: role, source_field: source, operation: "value-table", value_table: table } }];
  // A table key outside the source enumeration is a declaration defect too.
  const extraKey = evaluate(swap("result", "disposition", { rejected: "refused", maybe: "refused" }));
  assert.equal(extraKey.failure, "projection-declaration");
  // Without a source schema a value table cannot be checked: it fails closed.
  const projection = patchProjection(base, []);
  const noSource = evaluateRoleProjection({
    source: a13("source.decision-record.json"), projection,
    sourceValidator: Object.assign(() => true, { schema: undefined }),
    roleValidator: registry.ajv.getSchema(projection.role_schema),
  });
  assert.equal(noSource.failure, "projection-declaration");
});

test("r26-REV-011: required_dimensions declarations fail closed unless every entry is a supported dimension", () => {
  const a = read("fixtures/development/r26/A02/cases.json").cases.find((c) => c.case_id === "R26-A02-01");
  const run = (declared) => evaluateEffectContainment({ requested: a.requested, authorizing: a.authorizing, policy: { ...a.policy, required_dimensions: declared } });
  assert.equal(run([]).gate_code, null);
  assert.equal(run(["environment"]).gate_code, null);
  for (const declared of [["custom-required"], null, "environment", [7], [""], {}, ["environment", "colour"]]) {
    const result = run(declared);
    assert.equal(result.gate_code, "GKOS-GATE-L7-003", JSON.stringify(declared));
    assert.ok(result.findings.some((f) => f.result === "unknown"), JSON.stringify(declared));
  }
});

test("r26-REV-012: snapshot contents must be evaluable; explicit empty is separate", () => {
  const base = read("fixtures/development/r26/A16/a16-p-held-items-empty-007.json");
  const envelope = read(base.selection_envelope);
  const snapshot = read(base.eligible_snapshot);
  const rules = base.closure_rules.map(read);
  // Rebind the envelope and manifest to a snapshot variant, so only held_items differs.
  const evaluate = (held) => {
    const variant = { ...snapshot };
    if (held === undefined) delete variant.held_items;
    else variant.held_items = held;
    const env = { ...envelope, eligible_snapshot_ref: { ...envelope.eligible_snapshot_ref, digest: { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", value: canonicalHash(variant) } } };
    const manifest = { ...base.context_manifest, selection_set_ref: { ...base.context_manifest.selection_set_ref, digest: { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", value: canonicalHash(env) } } };
    return codeOf(() => evaluateClosureRule({ manifest, selectionEnvelope: env, eligibleSnapshot: variant, rules }));
  };
  assert.equal(evaluate([]), null);
  const item = { kind: "warning", object_ref: { artifact_id: "fixture:w", artifact_version: "1.0.0", digest: { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", value: "2".repeat(64) } } };
  // Rule A does not require warnings: a well-formed warning leaves the required set empty.
  assert.equal(evaluate([item]), null);
  assert.equal(evaluate([{ ...item, object_ref: { ...item.object_ref, digest: { algorithm: "sha-256", basis: "received-bytes", value: "2".repeat(64) } } }]), null);
  for (const held of [undefined, null, {}, "x", [null], [{ kind: "warning" }], [{ ...item, kind: 7 }],
    [{ ...item, object_ref: { ...item.object_ref, digest: { algorithm: "sha-256", value: "2".repeat(64) } } }],
    // r26-REV-013: exactly one basis; the other basis field must be absent.
    [{ ...item, object_ref: { ...item.object_ref, digest: { ...item.object_ref.digest, basis: "unsupported" } } }],
    [{ ...item, object_ref: { ...item.object_ref, digest: { algorithm: "sha-256", canonical_profile: "unsupported", basis: "received-bytes", value: "2".repeat(64) } } }],
    [{ ...item, object_ref: { ...item.object_ref, digest: { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", basis: "received-bytes", value: "2".repeat(64) } } }]]) {
    assert.equal(evaluate(held), "GKOS-GATE-L6-009", JSON.stringify(held));
  }
});
