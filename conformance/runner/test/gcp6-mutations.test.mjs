import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  captureSelection,
  validateRequiredClosure,
  assembleContext,
  canonicalEncode,
  renderDiagnosticJson,
  parseDiagnosticJson,
} from "../canonical.mjs";

const root = resolve(import.meta.dirname, "..", "..", "..");
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const selection = () => captureSelection(readJson("fixtures/gcp6/replay-selection-envelope.json"));
const snapshot = () => readJson("fixtures/gcp6/eligible-snapshot.json");
const ref = (id, value) => ({ component_id: id, component_version: "1.0.0", digest: { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", value } });
const inputs = () => ({
  manifest_id: "fixture:gcp6-replay-manifest",
  manifest_version: "1.0.0",
  compiled_at: "2026-08-21T20:01:00.000000Z",
  policy_ref: ref("fixture:gcp6-context-policy", "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"),
  compiler_ref: ref("gkos-ts-reference-compiler", "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"),
  resolved_content: {
    "e61d8ce8e0ddf82f7abed3f125081211b0fa7824dc027155aeed8b8aeedb82a3": "Claim A: the control passed.",
    "110f82ffa8d262d3565926dae5784eb4c04bffbf08f40fc438bcba1bcbc6839e": "Contradiction B: the control did not pass."
  }
});

test("held contradiction omission refuses with GKOS-GATE-L6-009", () => {
  const mutated = selection();
  mutated.closure_inputs = [];
  assert.throws(() => validateRequiredClosure(mutated, snapshot()), /GKOS-GATE-L6-009/);
  assert.equal(validateRequiredClosure(selection(), snapshot()), true);
});

test("rendered-field mutation refuses with GKOS-GATE-L6-008", () => {
  const selected = selection();
  const bytes = canonicalEncode(assembleContext(selected, inputs()));
  const rendering = JSON.parse(renderDiagnosticJson(bytes));
  rendering.decoded.purpose = "Tampered purpose";
  assert.throws(() => parseDiagnosticJson(JSON.stringify(rendering)), /GKOS-GATE-L6-008/);
});

test("resolved-content mutation refuses with GKOS-GATE-L6-007", () => {
  const mutatedInputs = inputs();
  mutatedInputs.resolved_content.e61d8ce8e0ddf82f7abed3f125081211b0fa7824dc027155aeed8b8aeedb82a3 = "Tampered content";
  assert.throws(() => assembleContext(selection(), mutatedInputs), /GKOS-GATE-L6-007/);
});
