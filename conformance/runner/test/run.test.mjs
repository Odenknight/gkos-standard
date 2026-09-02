import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";

const runner = resolve("run.mjs");
const adapter = resolve("test/fixtures/fake-adapter.mjs");
const noGraphAdapter = resolve("test/fixtures/no-graph-adapter.mjs");
const adversarialGraphAdapter = resolve("test/fixtures/adversarial-graph-adapter.mjs");

const execute = (selectedAdapter, env = {}) => {
  const out = join(mkdtempSync(join(tmpdir(), "gkos-runner-")), "claim.json");
  let status = 0;
  try {
    execFileSync(process.execPath, [runner, "--adapter", selectedAdapter, "--out", out], {
      stdio: "pipe",
      env: { ...process.env, ...env },
    });
  } catch (error) {
    status = error.status;
  }
  return { status, claim: JSON.parse(readFileSync(out, "utf8")) };
};

test("Standard-owned graph evaluation executes GCP3-C01 and GCP3-L01 without creating a profile claim", () => {
  const { status, claim } = execute(adapter);
  assert.equal(status, 0);
  assert.equal(claim.evidence_status, "mechanism_demonstrated");
  assert.deepEqual(claim.requirements_verified, []);
  assert.deepEqual(claim.profiles_claimed, []);
  assert.deepEqual(claim.tier_claims, []);
  assert.equal(claim.applicability.mapping_version, "1.1.0-development");
  assert.equal(claim.fixtures.passed, 8);
  assert.equal(claim.fixtures.unevaluated, 0);
  assert.equal(claim.fixtures.fully_evaluated, 8);
  assert.equal(claim.fixtures.results.find((r) => r.fixture_id === "GCP1-N03").divergence_ref, undefined);
  assert.equal(claim.fixtures.results.find((r) => r.fixture_id === "GCP3-C01").outcome, "pass");
  assert.equal(claim.fixtures.results.find((r) => r.fixture_id === "GCP3-L01").outcome, "pass");
  assert.equal(claim.environment.node, process.version);
  assert.equal(claim.environment.platform, process.platform);
  assert.ok(claim.evidence.some((item) => item.locator === "conformance/runner/graph-evaluator.mjs"));
});

for (const attack of [
  ["fabricated-identities", "GCP3-C01", /primary_uid does not match/u],
  ["bogus-uid-ref", "GCP3-L01", /target_ref to equal target_uid exactly/u],
  ["bogus-basename-ref", "GCP3-C01", /actual paired fixture basename and UID/u],
]) {
  const [mode, fixtureId, detail] = attack;
  test(`adversarial graph observation '${mode}' cannot manufacture a PASS`, () => {
    const { status, claim } = execute(adversarialGraphAdapter, { GKOS_ADVERSARIAL_GRAPH_MODE: mode });
    assert.equal(status, 1);
    const result = claim.fixtures.results.find((item) => item.fixture_id === fixtureId);
    assert.equal(result.outcome, "fail");
    assert.match(result.detail, detail);
    assert.deepEqual(claim.requirements_verified, []);
    assert.deepEqual(claim.profiles_claimed, []);
    assert.deepEqual(claim.tier_claims, []);
  });
}

test("an adapter without graph observations remains non-qualifying and UNEVALUATED", () => {
  const { status, claim } = execute(noGraphAdapter);
  assert.equal(status, 1, "UNEVALUATED expectations must produce a non-qualifying exit status");
  assert.equal(claim.fixtures.unevaluated, 2);
  assert.equal(claim.fixtures.results.find((r) => r.fixture_id === "GCP3-C01").outcome, "unevaluated");
  assert.equal(claim.fixtures.results.find((r) => r.fixture_id === "GCP3-L01").outcome, "unevaluated");
  assert.ok(claim.limitations.some((item) => item.includes("projection.graph_expect")));
});
