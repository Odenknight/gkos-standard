#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { createHash } from "node:crypto";
import { captureSelection, validateRequiredClosure, assembleContext, canonicalEncode, renderDiagnosticJson, parseDiagnosticJson } from "./canonical.mjs";

const root = resolve(import.meta.dirname, "..", "..");
const outIndex = process.argv.indexOf("--out-dir");
if (outIndex < 0 || !process.argv[outIndex + 1]) throw new Error("required: --out-dir <directory>");
const outDir = resolve(process.argv[outIndex + 1]);
mkdirSync(outDir, { recursive: true });
const selection = captureSelection(JSON.parse(readFileSync(join(root, "fixtures/gcp6/replay-selection-envelope.json"), "utf8")));
const eligibleSnapshot = JSON.parse(readFileSync(join(root, "fixtures/gcp6/eligible-snapshot.json"), "utf8"));
validateRequiredClosure(selection, eligibleSnapshot);
const ref = (id, version, value) => ({ component_id: id, component_version: version, digest: { algorithm: "sha-256", canonical_profile: "GKX-CBOR-1", value } });
const manifest = assembleContext(selection, {
  manifest_id: "fixture:gcp6-replay-manifest",
  manifest_version: "1.0.0",
  compiled_at: "2026-08-21T20:01:00.000000Z",
  policy_ref: ref("fixture:gcp6-context-policy", "1.0.0", "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"),
  compiler_ref: ref("gkos-ts-reference-compiler", "0.1.0", "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"),
  resolved_content: {
    "e61d8ce8e0ddf82f7abed3f125081211b0fa7824dc027155aeed8b8aeedb82a3": "Claim A: the control passed.",
    "110f82ffa8d262d3565926dae5784eb4c04bffbf08f40fc438bcba1bcbc6839e": "Contradiction B: the control did not pass."
  }
});
const selectionBytes = canonicalEncode(selection);
const manifestBytes = canonicalEncode(manifest);
const rendering = renderDiagnosticJson(manifestBytes);
if (!parseDiagnosticJson(rendering).equals(manifestBytes)) throw new Error("GKOS-GATE-L6-008 round trip failed");
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
writeFileSync(join(outDir, "selection-envelope.cbor"), selectionBytes);
writeFileSync(join(outDir, "context-manifest.cbor"), manifestBytes);
writeFileSync(join(outDir, "context-manifest.rendering.json"), rendering);
writeFileSync(join(outDir, "result.json"), `${JSON.stringify({
  fixture_id: "GCP6-P-REPLAY-001",
  evidence_status: "mechanism_demonstrated",
  requirement_ids: ["GKOS-CANON-007", "GKOS-CANON-008", "GKOS-CONTEXT-001", "GKOS-CONTEXT-002", "GKOS-CONTEXT-003"],
  qualifying_profiles: [],
  tier_claims: [],
  core_tier_claimed: false,
  assessment_type: "self-attested",
  selection_sha256: hash(selectionBytes),
  canonical_sha256: hash(manifestBytes),
  canonical_byte_length: manifestBytes.length,
  limitations: ["Closed deterministic fixture corpus", "Mechanism evidence only; cumulative GCP-6 conformance is not established"]
}, null, 2)}\n`);
