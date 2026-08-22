import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, basename } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import { evaluateAuthorityWindow, createAuthorityRefusalReceipt } from "../authority-window.mjs";

const root = resolve(import.meta.dirname, "..", "..", "..");
const authority = JSON.parse(readFileSync(resolve(root, "fixtures/gcp7/authority-window.json"), "utf8"));
const sha256 = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const digest = (value) => ({ algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", value });
const artifactRef = (id, value) => ({ artifact_id: id, artifact_version: "1.0.0", digest: digest(value) });
const componentRef = (id, value) => ({ component_id: id, component_version: "1.0.0", digest: digest(value) });

test("authority window uses inclusive start and exclusive end", () => {
  const evaluate = (evaluation_time) => evaluateAuthorityWindow({
    valid_from: authority.valid_from,
    valid_until: authority.valid_until,
    evaluation_time,
  });
  assert.equal(evaluate("2026-09-01T11:59:59.999999Z").reason, "authority-not-yet-valid");
  assert.equal(evaluate("2026-09-01T12:00:00.000000Z").allowed, true);
  assert.equal(evaluate("2026-09-01T12:59:59.999999Z").allowed, true);
  assert.equal(evaluate("2026-09-01T13:00:00.000000Z").reason, "authority-expired");
  assert.equal(evaluate("2026-09-01T13:00:00.000001Z").reason, "authority-expired");
});

test("missing, malformed, and inverted time evidence fails closed", () => {
  assert.equal(evaluateAuthorityWindow({ valid_from: authority.valid_from, valid_until: authority.valid_until }).gate_code, "GKOS-GATE-L7-001");
  assert.equal(evaluateAuthorityWindow({ valid_from: "bad", valid_until: authority.valid_until, evaluation_time: authority.valid_from }).allowed, false);
  assert.equal(evaluateAuthorityWindow({ valid_from: authority.valid_until, valid_until: authority.valid_from, evaluation_time: authority.valid_from }).allowed, false);
});

test("exact-expiry refusal preserves protected state and emits a schema-valid receipt", () => {
  const protectedState = { target: "fixture:protected-target", value: "unchanged" };
  const before = sha256(protectedState);
  const result = evaluateAuthorityWindow({
    valid_from: authority.valid_from,
    valid_until: authority.valid_until,
    evaluation_time: authority.valid_until,
  });
  assert.equal(result.allowed, false);
  const receipt = createAuthorityRefusalReceipt({
    receipt_id: "fixture:authority-expiry-refusal",
    authority_ref: artifactRef("fixture:authority-window", "a".repeat(64)),
    predicate_ref: componentRef("gkos:authority-window-evaluator", "b".repeat(64)),
    policy_ref: authority.policy_ref,
    evaluated_at: authority.valid_until,
    actor_context: [authority.grantee],
    requested_effect_scope: authority.effect_scope,
    reason: result.reason,
  });
  assert.equal(sha256(protectedState), before);
  assert.equal(receipt.gate_code, "GKOS-GATE-L7-001");
  assert.equal(receipt.result, "refused");

  const ajv = new Ajv2020.default({ strict: false, allErrors: true, formats: { "date-time": true } });
  for (const file of readdirSync(resolve(root, "schemas")).filter((name) => name.endsWith(".json"))) {
    const schema = JSON.parse(readFileSync(resolve(root, "schemas", file), "utf8"));
    ajv.addSchema(schema, schema.$id);
    ajv.addSchema(schema, basename(file));
  }
  const validateAuthority = ajv.getSchema("authority-receipt.schema.json");
  const validateRefusal = ajv.getSchema("refusal-receipt.schema.json");
  const validateAuthorizedUseR17 = ajv.getSchema("authorized-use-record.r17.schema.json");
  const validateAuthorizedUseV080 = ajv.getSchema("authorized-use-record.schema.json");
  assert.equal(validateAuthority(authority), true, JSON.stringify(validateAuthority.errors));
  assert.equal(validateRefusal(receipt), true, JSON.stringify(validateRefusal.errors));

  const authorizedUse = {
    canonical_profile: "GKX-CBOR-1",
    artifact_type: "authorized-use-record",
    schema_version: "1.1.0-development",
    record_id: "fixture:authorized-use-r17",
    record_version: "1.0.0",
    action_class: "fixture-action",
    purpose: "authority-boundary-test",
    context_manifest_ref: artifactRef("fixture:context", "c".repeat(64)),
    policy_ref: authority.policy_ref,
    compiler_ref: componentRef("fixture:compiler", "d".repeat(64)),
    proposing_actor: authority.grantee,
    authorizing_actor: authority.grantor,
    executing_actor: authority.grantee,
    delegation_chain: [],
    requested_effect_scope: authority.effect_scope,
    authorized_effect_scope: authority.effect_scope,
    authority_basis_ref: artifactRef("fixture:authority-window", "a".repeat(64)),
    authority_evaluated_at: authority.valid_from,
    authority_validity_result: "valid",
    acted_at: authority.valid_from,
    outcome: "completed",
    recovery_route: { kind: "rollback", procedure_ref: "fixture:rollback" },
  };
  assert.equal(validateAuthorizedUseR17(authorizedUse), true, JSON.stringify(validateAuthorizedUseR17.errors));
  assert.equal(validateAuthorizedUseV080(authorizedUse), false, "v0.80 schema must not silently accept the R17 coordinate");
});
