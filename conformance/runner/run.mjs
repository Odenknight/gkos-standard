#!/usr/bin/env node
/**
 * GKOS-TS starter runner.
 *
 * Usage: node run.mjs --adapter ./adapters/gkos-engine.mjs [--out claim.json]
 *
 * Loads fixtures.manifest.json, validates fixture frontmatter against the
 * schema program (ajv), runs each fixture through the adapter's projection,
 * evaluates diagnostic expectations, and emits a machine-readable conformance
 * claim conforming to schemas/conformance-manifest.schema.json.
 *
 * The adapter contract keeps the standard implementation-neutral:
 *   export const implementation = { name, version, repository? }
 *   export function project(content, path) -> {
 *     diagnostics: [{ code, severity, field? }],
 *     effective: { sensitivity, epistemicState }
 *   }
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname, resolve, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import YAML from "yaml";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");            // gkos-standard repo root
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const adapterPath = arg("--adapter");
if (!adapterPath) { console.error("Required: --adapter <path>"); process.exit(2); }
const outPath = arg("--out", "conformance-claim.json");
const attestedBy = arg("--attested-by", "unattested");

const adapter = await import(pathToFileURL(resolve(adapterPath)).href);
const manifest = JSON.parse(readFileSync(join(root, "fixtures", "fixtures.manifest.json"), "utf8"));

// --- schema registry ---
const ajv = new Ajv2020.default({ strict: false, allErrors: true });
const S = join(root, "schemas");
for (const dir of [S, join(S, "provisional")]) {
  for (const f of readdirSync(dir).filter(x => x.endsWith(".json"))) {
    const sch = JSON.parse(readFileSync(join(dir, f), "utf8"));
    ajv.addSchema(sch, sch.$id); ajv.addSchema(sch, basename(f)); ajv.addSchema(sch, "../" + basename(f));
  }
}

const frontmatter = raw => { const m = /^---\n([\s\S]*?)\n---/.exec(raw); return m ? YAML.parse(m[1]) : {}; };
const codeMatch = (want, got) => want.endsWith("*") ? got.startsWith(want.slice(0, -1)) : got === want;
const SENS_ORDER = ["public", "internal", "restricted", "confidential", "regulated", "phi", "secret"];

const results = []; let passed = 0, failed = 0, skipped = 0, divergent = 0;
for (const fx of manifest.fixtures) {
  const detail = [];
  let ok = true;
  const raw = readFileSync(join(root, "fixtures", fx.file), "utf8");

  // 1. schema expectation
  if (fx.schema) {
    const v = ajv.getSchema(fx.schema.against);
    const valid = v(frontmatter(raw));
    if (fx.schema.expect === "valid" && !valid) { ok = false; detail.push("schema: expected valid, got invalid: " + JSON.stringify(v.errors?.slice(0, 2))); }
    if (fx.schema.expect === "invalid" && valid) { ok = false; detail.push("schema: expected invalid, got valid"); }
  }

  // 2. projection expectation
  const proj = adapter.project(raw, fx.file);
  const codes = proj.diagnostics.map(d => d.code);
  for (const req of (fx.projection?.require_codes ?? [])) {
    const hits = codes.filter(c => codeMatch(req.code, c)).length;
    if (hits < (req.min_count ?? 1)) { ok = false; detail.push(`projection: required ${req.code} x${req.min_count ?? 1}, found ${hits}`); }
  }
  for (const bad of (fx.projection?.forbid_codes ?? [])) {
    if (codes.some(c => codeMatch(bad, c))) { ok = false; detail.push(`projection: forbidden ${bad} present`); }
  }
  for (const sev of (fx.projection?.forbid_severities ?? [])) {
    const offenders = proj.diagnostics.filter(d => d.severity === sev && !(fx.projection.allow_codes ?? []).includes(d.code));
    if (offenders.length) { ok = false; detail.push(`projection: forbidden severity ${sev}: ${offenders.map(d => d.code).join(",")}`); }
  }
  if (fx.projection?.effective_sensitivity === "restricted-or-stricter") {
    const idx = SENS_ORDER.indexOf(proj.effective?.sensitivity ?? "");
    if (idx < SENS_ORDER.indexOf("restricted")) { ok = false; detail.push(`projection: effective sensitivity '${proj.effective?.sensitivity}' is more open than 'restricted'`); }
  }

  // 3. outcome, honoring declared known divergences
  let outcome;
  if (ok) { outcome = "pass"; passed++; }
  else if (fx.known_divergence) { outcome = "known-divergence"; divergent++; }
  else { outcome = "fail"; failed++; }
  results.push({ fixture_id: fx.fixture_id, outcome, ...(fx.known_divergence ? { divergence_ref: fx.known_divergence } : {}), ...(detail.length ? { detail: detail.join("; ") } : {}) });
  console.log(`${outcome.toUpperCase().padEnd(17)} ${fx.fixture_id}${detail.length ? "  — " + detail.join("; ") : ""}`);
}

const claim = {
  claim_id: `claim-${new Date().toISOString().slice(0, 10)}-${adapter.implementation.name}`,
  implementation: adapter.implementation,
  standard: { gkos_release: manifest.gkos_release, technical_spec: "OKF+ 2.3 (draft)", technical_spec_status: "draft", last_ratified_baseline: "OKF+ 2.2" },
  profiles_claimed: [...new Set(manifest.fixtures.map(f => f.profile))],
  attestation: { mode: "self-attested", attested_by: attestedBy },
  fixtures: { catalog_version: manifest.catalog_version, executed: results.length, passed, failed, skipped, results },
  limitations: ["single-actor separation-of-duties waiver (disposition: self-accepted)", "catalog 0.1.0 covers GCP-1/GCP-3 classes only; see fixtures/README.md"],
  exceptions: results.filter(r => r.outcome === "known-divergence").map(r => `${r.fixture_id}: ${r.divergence_ref} (see fixtures/DIVERGENCES.md)`),
  generated_at: new Date().toISOString().replace(/(\.\d{3})\d*Z$/, "$1Z"),
};
const vClaim = ajv.getSchema("conformance-manifest.schema.json");
if (!vClaim(claim)) { console.error("Generated claim does not satisfy conformance-manifest.schema.json:", vClaim.errors); process.exit(3); }
writeFileSync(outPath, JSON.stringify(claim, null, 2));
console.log(`\nclaim written: ${outPath}  (passed=${passed} failed=${failed} known-divergences=${divergent})`);
process.exit(failed > 0 ? 1 : 0);
