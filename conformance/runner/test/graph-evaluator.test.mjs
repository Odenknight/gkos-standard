import test from "node:test";
import assert from "node:assert/strict";
import { evaluateGraphExpectation } from "../graph-evaluator.mjs";

const predecessor = "6f7a8b9c-0d1e-4f2a-8b3c-4d5e6f7a8b9c";
const successor = "8b9c0d1e-2f3a-4b4c-8d5e-6f7a8b9c0d1e";
const observation = (edges) => ({
  contract: "gkos.graph-observation/1",
  primary_uid: predecessor,
  pair_uid: successor,
  edges,
});

test("requires an adapter observation instead of silently passing", () => {
  assert.deepEqual(evaluateGraphExpectation({ typed_edge: "contradicts", resolves: true }, undefined), {
    executed: false,
    pass: false,
    detail: "adapter did not emit a graph observation",
  });
});

test("checks typed contradiction resolution against the paired identity", () => {
  const result = evaluateGraphExpectation({ typed_edge: "contradicts", resolves: true }, observation([{
    source_uid: predecessor,
    type: "contradicts",
    target_ref: "counter-claim",
    target_uid: successor,
    resolution: "basename",
  }]));
  assert.equal(result.executed, true);
  assert.equal(result.pass, true);
});

test("fails a dangling contradiction and a non-UID lineage resolution", () => {
  const contradiction = evaluateGraphExpectation({ typed_edge: "contradicts", resolves: true }, observation([{
    source_uid: predecessor,
    type: "contradicts",
    target_ref: "missing",
    target_uid: null,
    resolution: "unresolved",
  }]));
  assert.equal(contradiction.pass, false);

  const lineage = evaluateGraphExpectation({
    supersession_chain: [predecessor, successor],
    uid_first_resolution: true,
  }, observation([{
    source_uid: predecessor,
    type: "superseded_by",
    target_ref: "successor-by-path",
    target_uid: successor,
    resolution: "basename",
  }]));
  assert.equal(lineage.pass, false);
  assert.match(lineage.detail, /not resolved by UID/u);
});

test("fails closed on unsupported expectation keys", () => {
  const result = evaluateGraphExpectation({ invented_rule: true }, observation([]));
  assert.equal(result.executed, true);
  assert.equal(result.pass, false);
  assert.match(result.detail, /unsupported graph expectation keys/u);
});
