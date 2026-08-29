import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { evaluateGate } from "../gate-evaluator.mjs";

const root = resolve(import.meta.dirname, "..", "..", "..");
const suite = JSON.parse(readFileSync(resolve(root, "fixtures/track-a/cases.json"), "utf8"));

test("every Track A baseline remains open and its mutation closes the expected stable gate", async (t) => {
  assert.equal(suite.cases.length, 28);
  for (const fixture of suite.cases) {
    await t.test(fixture.id, () => {
      assert.equal(evaluateGate(fixture.baseline), null, `${fixture.id} baseline unexpectedly closed`);
      assert.equal(evaluateGate(fixture.mutation), fixture.expected, `${fixture.id} mutation emitted the wrong gate`);
    });
  }
});

