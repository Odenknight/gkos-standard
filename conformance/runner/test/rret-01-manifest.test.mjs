import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const corpus = JSON.parse(readFileSync(resolve("../../fixtures/provisional/retrieval/rret-01-corpus.json"), "utf8"));
const manifest = JSON.parse(readFileSync(resolve("../../fixtures/provisional/retrieval/fixtures.manifest.json"), "utf8"));

test("RRET-01 manifest maps exactly one entry to every corpus case and remains non-qualifying", () => {
  assert.equal(manifest.status, "provisional-non-normative");
  assert.deepEqual(manifest.qualifying_profiles, []);
  assert.equal(manifest.fixtures.length, corpus.cases.length);
  assert.deepEqual(
    manifest.fixtures.map((item) => item.fixture_id),
    corpus.cases.map((item) => item.fixture_id)
  );
  for (const fixture of manifest.fixtures) {
    assert.equal(fixture.file, "rret-01-corpus.json");
    assert.ok(Array.isArray(fixture.proposal_handles));
    assert.ok(fixture.proposal_handles.length > 0);
  }
});
