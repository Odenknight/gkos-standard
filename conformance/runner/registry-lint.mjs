#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { evaluateTrackATwins } from "./track-a-evidence.mjs";
import { duplicateArtifactPairs, supportedArtifactPairs } from "./canonical.mjs";

const root = resolve(import.meta.dirname, "..", "..");
const args = new Set(process.argv.slice(2));
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const registryText = readFileSync(resolve(root, "requirements/REGISTRY.md"), "utf8");
const diagnosticText = readFileSync(resolve(root, "standard/annexes/Diagnostic_Code_Registry.md"), "utf8");
const applicability = readJson("requirements/PROFILE_APPLICABILITY.json");
const diagnosticsBase = readJson("requirements/DIAGNOSTIC_CODES.json");
const diagnostics = diagnosticsBase;
const catalogs = [
  readJson("fixtures/fixtures.manifest.json"),
  readJson("fixtures/gcp6/fixtures.manifest.json"),
  readJson("fixtures/gcp7/fixtures.manifest.json"),
  readJson("fixtures/track-a/fixtures.manifest.json"),
];
// R26 development catalog (v0.83 development line). The coordinator creates it
// from the packets' proposed rows; until it exists, the R26 codes have no
// catalog-bound coverage and --require-mutation-coverage reports them.
const developmentCatalogPath = "fixtures/development/r26/fixtures.manifest.json";
// R26 development twin files: the R26-A10 allocations and the R26-A15 hold-refusal code
// (GKOS-GATE-L4-009, owner answer 2026-10-07).
const developmentTwinFiles = ["development/r26/A10/cases.json", "development/r26/A15/twins.json"];
const developmentCatalog = existsSync(resolve(root, developmentCatalogPath)) ? readJson(developmentCatalogPath) : null;
if (developmentCatalog) catalogs.push(developmentCatalog);
const fixtures = catalogs.flatMap((catalog) => catalog.fixtures);

const registeredRequirements = new Set(
  [...registryText.matchAll(/^\| `(GKOS-[A-Z]+-\d{3})` \|/gm)].map((match) => match[1]),
);
const registeredCodesInMarkdown = new Set(
  [...diagnosticText.matchAll(/^\| (GKOS-GATE-L[1-7]-\d{3}) \|/gm)].map((match) => match[1]),
);
const registeredCodesInJson = new Set(Object.keys(diagnostics.codes));
const errors = [];
const executedTwins = evaluateTrackATwins(catalogs[3], readJson("fixtures/track-a/cases.json"));
errors.push(...executedTwins.errors);
if (developmentCatalog) {
  for (const developmentTwinFile of developmentTwinFiles) {
    const twinCatalog = { fixtures: developmentCatalog.fixtures.filter((fixture) => fixture.file === developmentTwinFile) };
    const developmentTwins = evaluateTrackATwins(twinCatalog, readJson(`fixtures/${developmentTwinFile}`), developmentTwinFile);
    errors.push(...developmentTwins.errors);
    for (const [code, ids] of Object.entries(developmentTwins.coverage)) (executedTwins.coverage[code] ??= []).push(...ids);
  }
}
// R26-A08 (proposed; v0.83 development line): each (artifact_type, schema_version) pair
// identifies one schema; two schemas MUST NOT share a pair.
const schemaDocuments = readdirSync(resolve(root, "schemas")).filter((name) => name.endsWith(".json")).map((name) => readJson(`schemas/${name}`));
for (const { pair, schema_ids: ids } of duplicateArtifactPairs(supportedArtifactPairs(schemaDocuments))) {
  errors.push(`artifact identity ${pair} is declared by more than one schema: ${ids.join(", ")}`);
}
const warnings = [];
const mutationCoverage = new Map([...registeredCodesInJson].map((code) => [code, []]));

const applicableRequirements = applicability.requirements;
for (const requirement of registeredRequirements) {
  if (!applicableRequirements[requirement]) errors.push(`applicability missing ${requirement}`);
}
for (const requirement of Object.keys(applicableRequirements)) {
  if (!registeredRequirements.has(requirement)) errors.push(`applicability references unregistered ${requirement}`);
}
for (const code of registeredCodesInMarkdown) {
  if (!registeredCodesInJson.has(code)) errors.push(`diagnostic JSON missing ${code}`);
}
for (const code of registeredCodesInJson) {
  if (!registeredCodesInMarkdown.has(code)) errors.push(`diagnostic JSON contains code absent from normative Markdown: ${code}`);
  for (const requirement of diagnostics.codes[code].requirement_ids) {
    if (!registeredRequirements.has(requirement)) errors.push(`${code} references unregistered ${requirement}`);
  }
}
for (const fixture of fixtures) {
  for (const requirement of fixture.requirement_ids ?? []) {
    if (!registeredRequirements.has(requirement)) errors.push(`${fixture.fixture_id} references unregistered ${requirement}`);
  }
  for (const code of fixture.gate_expectation?.expected_codes ?? []) {
    if (!registeredCodesInJson.has(code)) errors.push(`${fixture.fixture_id} expects unregistered ${code}`);
    else if (fixture.class === "negative" || fixture.class === "mutation") mutationCoverage.get(code).push(fixture.fixture_id);
  }
  for (const code of fixture.gate_expectation?.prohibited_codes ?? []) {
    if (!registeredCodesInJson.has(code)) errors.push(`${fixture.fixture_id} prohibits unregistered ${code}`);
  }
}
for (const catalog of catalogs) {
  for (const [requirement, fixtureIds] of Object.entries(catalog.complete_requirements ?? {})) {
    if (!registeredRequirements.has(requirement)) errors.push(`complete requirement set references unregistered ${requirement}`);
    if (!Array.isArray(fixtureIds) || fixtureIds.length === 0) errors.push(`complete requirement set for ${requirement} has no fixtures`);
    for (const fixtureId of fixtureIds ?? []) {
      const fixture = fixtures.find((item) => item.fixture_id === fixtureId);
      if (!fixture) errors.push(`complete requirement set for ${requirement} references missing fixture ${fixtureId}`);
      else if (!fixture.requirement_ids?.includes(requirement)) errors.push(`${fixtureId} does not cite complete requirement ${requirement}`);
    }
  }
}

const uncoveredCodes = [...mutationCoverage].filter(([, fixtures]) => fixtures.length === 0).map(([code]) => code);
if (uncoveredCodes.length) warnings.push(`${uncoveredCodes.length} registered gate codes lack mutation coverage`);
if (args.has("--require-mutation-coverage") && uncoveredCodes.length) {
  errors.push(`mutation coverage incomplete: ${uncoveredCodes.join(", ")}`);
}
const executableUncovered = [...registeredCodesInJson].filter(code => !executedTwins.coverage[code]?.length);
if (args.has("--require-mutation-coverage") && executableUncovered.length) errors.push(`executed predicate mutation coverage incomplete: ${executableUncovered.join(", ")}`);

const report = {
  result: errors.length ? "FAIL" : "PASS",
  registry_version: diagnostics.registry_version,
  applicability_mapping_version: applicability.mapping_version,
  applicability_overlay_version: "consolidated-into-base",
  requirement_count: registeredRequirements.size,
  gate_code_count: registeredCodesInJson.size,
  covered_gate_codes: Object.fromEntries([...mutationCoverage].filter(([, fixtures]) => fixtures.length)),
  uncovered_gate_codes: uncoveredCodes,
  executed_predicate_gate_codes: executedTwins.coverage,
  executable_uncovered_gate_codes: executableUncovered,
  development_catalog: developmentCatalog ? developmentCatalogPath : null,
  coverage_scope: "portable-predicate-twins-only; not cumulative profile qualification",
  errors,
  warnings,
};
const outIndex = process.argv.indexOf("--out");
if (outIndex >= 0 && process.argv[outIndex + 1]) writeFileSync(process.argv[outIndex + 1], `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
process.exit(errors.length ? 1 : 0);
