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
 *     identity: { uid },
 *     effective: { sensitivity, epistemicState }
 *   }
 *   export function projectGraph({ primary, pair }) -> {
 *     contract: "gkos.graph-observation/1", primary_uid, pair_uid,
 *     edges: [{ source_uid, type, target_ref, target_uid, resolution }]
 *   }
 * projectGraph is required only when a fixture declares graph_expect. The
 * Standard-owned evaluator decides PASS/FAIL; an absent observation is
 * UNEVALUATED and cannot become a profile claim.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname, resolve, basename, extname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import Ajv2020 from "ajv/dist/2020.js";
import YAML from "yaml";
import { evaluateGraphExpectation } from "./graph-evaluator.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");            // gkos-standard repo root
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const adapterPath = arg("--adapter");
if (!adapterPath) { console.error("Required: --adapter <path>"); process.exit(2); }
const outPath = arg("--out", "conformance-claim.json");
const attestedBy = arg("--attested-by", "unattested");
const assessmentDate = new Date().toISOString().slice(0, 10);

const adapter = await import(pathToFileURL(resolve(adapterPath)).href);
const manifestPath = join(root, "fixtures", "fixtures.manifest.json");
const manifestBytes = readFileSync(manifestPath);
const manifest = JSON.parse(manifestBytes.toString("utf8"));
const adapterBytes = readFileSync(resolve(adapterPath));
const graphEvaluatorPath = join(here, "graph-evaluator.mjs");
const graphEvaluatorBytes = readFileSync(graphEvaluatorPath);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const applicabilityBytes = readFileSync(join(root, "requirements", "PROFILE_APPLICABILITY.json"));
const applicability = JSON.parse(applicabilityBytes);
const evidenceVocabularyBytes = readFileSync(join(root, "requirements", "EVIDENCE_VOCABULARY.json"));
const evidenceVocabulary = JSON.parse(evidenceVocabularyBytes);

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

const results = [];
let passed = 0, failed = 0, skipped = 0, divergent = 0, unevaluated = 0;
for (const fx of manifest.fixtures) {
  const detail = [];
  let ok = true;
  const raw = readFileSync(join(root, "fixtures", fx.file), "utf8");
  const pairRaw = fx.pair ? readFileSync(join(root, "fixtures", fx.pair), "utf8") : null;
  const primaryData = frontmatter(raw);
  const pairData = pairRaw === null ? null : frontmatter(pairRaw);

  // 1. schema expectation
  if (fx.schema) {
    const v = ajv.getSchema(fx.schema.against);
    const valid = v(primaryData);
    if (fx.schema.expect === "valid" && !valid) { ok = false; detail.push("schema: expected valid, got invalid: " + JSON.stringify(v.errors?.slice(0, 2))); }
    if (fx.schema.expect === "invalid" && valid) { ok = false; detail.push("schema: expected invalid, got valid"); }
    if (pairRaw !== null) {
      const pairValid = v(pairData);
      if (fx.schema.expect === "valid" && !pairValid) { ok = false; detail.push("pair schema: expected valid, got invalid: " + JSON.stringify(v.errors?.slice(0, 2))); }
      if (fx.schema.expect === "invalid" && pairValid) { ok = false; detail.push("pair schema: expected invalid, got valid"); }
    }
  }

  // 2. projection expectation
  const proj = adapter.project(raw, fx.file);
  const pairProj = pairRaw === null ? null : adapter.project(pairRaw, fx.pair);
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

  // 3. Execute graph expectations through an adapter observation and the
  // Standard-owned evaluator. A partial projection is never a fixture PASS.
  const unexecuted = [];
  if (fx.projection?.graph_expect) {
    let graphResult;
    if (typeof adapter.projectGraph !== "function") {
      graphResult = evaluateGraphExpectation(fx.projection.graph_expect, undefined);
    } else {
      try {
        const observation = adapter.projectGraph({
          primary: { content: raw, path: fx.file, projection: proj },
          pair: pairRaw === null ? null : { content: pairRaw, path: fx.pair, projection: pairProj },
        });
        graphResult = evaluateGraphExpectation(fx.projection.graph_expect, observation, {
          primary: {
            uid: primaryData.uid,
            projected_uid: proj.identity?.uid,
            basename: basename(fx.file, extname(fx.file)),
          },
          pair: {
            uid: pairData?.uid,
            projected_uid: pairProj?.identity?.uid,
            basename: basename(fx.pair, extname(fx.pair)),
          },
        });
      } catch (error) {
        graphResult = { executed: true, pass: false, detail: `adapter graph observation failed: ${error.message}` };
      }
    }
    if (!graphResult.executed) unexecuted.push("projection.graph_expect");
    else if (!graphResult.pass) { ok = false; detail.push(`graph: ${graphResult.detail}`); }
    else detail.push(`graph: ${graphResult.detail}`);
  } else if (fx.pair) {
    unexecuted.push("pair");
  }
  if (unexecuted.length) {
    detail.push(`unevaluated expectations: ${unexecuted.join(", ")}`);
  }

  // 4. outcome, honoring declared known divergences only after every required
  // expectation has actually been evaluated.
  let outcome;
  if (unexecuted.length) { outcome = "unevaluated"; unevaluated++; }
  else if (ok) { outcome = "pass"; passed++; }
  else if (fx.known_divergence) { outcome = "known-divergence"; divergent++; }
  else { outcome = "fail"; failed++; }
  results.push({ fixture_id: fx.fixture_id, outcome, ...(outcome === "known-divergence" ? { divergence_ref: fx.known_divergence } : {}), ...(detail.length ? { detail: detail.join("; ") } : {}) });
  console.log(`${outcome.toUpperCase().padEnd(17)} ${fx.fixture_id}${detail.length ? "  — " + detail.join("; ") : ""}`);
}

const qualifyingProfiles = new Set(manifest.qualifying_profiles ?? []);
const cumulativeProfiles = ["GCP-1", "GCP-2", "GCP-3", "GCP-4", "GCP-5", "GCP-6", "GCP-7"];
const targetLevel = (profile) => ({
  "GKOS-Core": 4,
  "GKOS-Advanced": 6,
  "GCP-6-Context-Only-Extension": 5,
}[profile] ?? cumulativeProfiles.indexOf(profile));
const ruleApplies = (rule, profile) => {
  const level = targetLevel(profile);
  if (rule.profiles.includes("all-claims") || rule.profiles.includes("all-runs") || rule.profiles.includes("cross-cutting")) return true;
  if (rule.profiles.includes(profile)) return true;
  return rule.profiles.some((token) => {
    const match = /^GCP-(\d)(\+)?$/.exec(token);
    if (!match || level < 0) return false;
    const requirementLevel = Number(match[1]) - 1;
    return match[2] ? level >= requirementLevel : level >= requirementLevel;
  });
};
const requiredForProfile = (profile) => Object.entries(applicability.requirements)
  .filter(([, rule]) => ruleApplies(rule, profile))
  .map(([requirement]) => requirement);
const passingRequirements = new Set(Object.entries(manifest.complete_requirements ?? {})
  .filter(([requirement, fixtureIds]) => fixtureIds.length > 0 && fixtureIds.every((fixtureId) => {
    const fixture = manifest.fixtures.find((item) => item.fixture_id === fixtureId);
    const result = results.find((item) => item.fixture_id === fixtureId);
    return fixture?.requirement_ids?.includes(requirement) && result?.outcome === "pass";
  }))
  .map(([requirement]) => requirement));
const profilesClaimed = [...qualifyingProfiles].filter((profile) => {
  const required = requiredForProfile(profile);
  return required.length > 0 && required.every((requirement) => passingRequirements.has(requirement));
});
const tierClaims = profilesClaimed.filter((profile) => ["GKOS-Core", "GKOS-Advanced", "GCP-6-Context-Only-Extension"].includes(profile));
const evidenceStatus = tierClaims.length
  ? "tier_claimable"
  : profilesClaimed.length
    ? "cumulative_profile_satisfied"
    : passingRequirements.size
      ? "requirement_verified"
      : passed > 0
        ? "mechanism_demonstrated"
        : "evidence_incomplete";
const unevaluatedDetails = results
  .filter((result) => result.outcome === "unevaluated")
  .map((result) => `${result.fixture_id}: ${result.detail}`);
const limitations = [
  "single-actor execution; no separation-of-duties requirement was evaluated",
  ...(qualifyingProfiles.size === 0 ? [`catalog ${manifest.catalog_version} is a starter slice and declares no complete qualifying profile`] : []),
  ...(unevaluatedDetails.length ? [`unevaluated expectations — ${unevaluatedDetails.join("; ")}`] : []),
];

const claim = {
  claim_id: `claim-${assessmentDate}-${adapter.implementation.name}`,
  implementation: adapter.implementation,
  standard: { gkos_release: manifest.gkos_release, technical_spec: "GKX 2.0", technical_spec_status: "developmental", last_ratified_baseline: "GKX 2.0" },
  evidence_status: evidenceStatus,
  requirements_verified: [...passingRequirements].sort(),
  profiles_claimed: profilesClaimed,
  tier_claims: tierClaims,
  applicability: {
    mapping_version: applicability.mapping_version,
    mapping_sha256: sha256(applicabilityBytes),
    evidence_vocabulary_version: evidenceVocabulary.vocabulary_version,
    evidence_vocabulary_sha256: sha256(evidenceVocabularyBytes),
  },
  attestation: { mode: "self-attested", attested_by: attestedBy, assessment_date: assessmentDate },
  fixtures: { catalog_version: manifest.catalog_version, executed: results.length, fully_evaluated: results.length - skipped - unevaluated, passed, failed, skipped, unevaluated, results },
  evidence: [
    { locator: "fixtures/fixtures.manifest.json", sha256: sha256(manifestBytes) },
    { locator: `adapter:${basename(adapterPath)}`, sha256: sha256(adapterBytes) },
    { locator: "conformance/runner/graph-evaluator.mjs", sha256: sha256(graphEvaluatorBytes) },
    ...[...new Set(manifest.fixtures.flatMap((fixture) => [fixture.file, fixture.pair].filter(Boolean)))].sort()
      .map((path) => ({ locator: `fixtures/${path}`, sha256: sha256(readFileSync(join(root, "fixtures", path))) })),
  ],
  environment: { node: process.version, platform: process.platform, arch: process.arch },
  limitations,
  exceptions: results.filter(r => r.outcome === "known-divergence").map(r => `${r.fixture_id}: ${r.divergence_ref} (see fixtures/DIVERGENCES.md)`),
  generated_at: new Date().toISOString().replace(/(\.\d{3})\d*Z$/, "$1Z"),
};
const vClaim = ajv.getSchema("conformance-manifest.schema.json");
if (!vClaim(claim)) { console.error("Generated claim does not satisfy conformance-manifest.schema.json:", vClaim.errors); process.exit(3); }
writeFileSync(outPath, JSON.stringify(claim, null, 2));
console.log(`\nclaim written: ${outPath}  (passed=${passed} failed=${failed} known-divergences=${divergent} unevaluated=${unevaluated})`);
process.exit(failed > 0 || unevaluated > 0 ? 1 : 0);
