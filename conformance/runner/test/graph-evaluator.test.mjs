import test from "node:test";
import assert from "node:assert/strict";
import { evaluateGraphExpectation } from "../graph-evaluator.mjs";

const predecessor = "6f7a8b9c-0d1e-4f2a-8b3c-4d5e6f7a8b9c";
const successor = "8b9c0d1e-2f3a-4b4c-8d5e-6f7a8b9c0d1e";
const binding = {
  primary: { uid: predecessor, projected_uid: predecessor, basename: "gcp3-l01-superseded" },
  pair: { uid: successor, projected_uid: successor, basename: "gcp3-l02-successor" },
};
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
    target_ref: "gcp3-l02-successor",
    target_uid: successor,
    resolution: "basename",
  }]), binding);
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
  }]), binding);
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
  }]), binding);
  assert.equal(lineage.pass, false);
  assert.match(lineage.detail, /not resolved by UID/u);
});

test("fails closed on unsupported expectation keys", () => {
  const result = evaluateGraphExpectation({ invented_rule: true }, observation([]), binding);
  assert.equal(result.executed, true);
  assert.equal(result.pass, false);
  assert.match(result.detail, /unsupported graph expectation keys/u);
});

test("rejects adapter-fabricated primary and pair identities", () => {
  const fakePrimary = "11111111-1111-4111-8111-111111111111";
  const fakePair = "22222222-2222-4222-8222-222222222222";
  const result = evaluateGraphExpectation(
    { typed_edge: "contradicts", resolves: true },
    {
      contract: "gkos.graph-observation/1",
      primary_uid: fakePrimary,
      pair_uid: fakePair,
      edges: [{
        source_uid: fakePrimary,
        type: "contradicts",
        target_ref: fakePair,
        target_uid: fakePair,
        resolution: "uid",
      }],
    },
    binding,
  );
  assert.equal(result.pass, false);
  assert.match(result.detail, /primary_uid does not match/u);
  assert.match(result.detail, /pair_uid does not match/u);
});

test("rejects a fabricated UID target_ref even when target_uid names the pair", () => {
  const result = evaluateGraphExpectation(
    { typed_edge: "contradicts", resolves: true },
    observation([{
      source_uid: predecessor,
      type: "contradicts",
      target_ref: "not-the-target-uid",
      target_uid: successor,
      resolution: "uid",
    }]),
    binding,
  );
  assert.equal(result.pass, false);
  assert.match(result.detail, /target_ref to equal target_uid exactly/u);
});

test("rejects a fabricated basename target_ref even when target_uid names the pair", () => {
  const result = evaluateGraphExpectation(
    { typed_edge: "contradicts", resolves: true },
    observation([{
      source_uid: predecessor,
      type: "contradicts",
      target_ref: "invented-basename",
      target_uid: successor,
      resolution: "basename",
    }]),
    binding,
  );
  assert.equal(result.pass, false);
  assert.match(result.detail, /actual paired fixture basename and UID/u);
});

test("rejects projected identities that differ from Standard-parsed frontmatter", () => {
  const result = evaluateGraphExpectation(
    { typed_edge: "contradicts", resolves: true },
    observation([]),
    {
      ...binding,
      pair: { ...binding.pair, projected_uid: "33333333-3333-4333-8333-333333333333" },
    },
  );
  assert.equal(result.pass, false);
  assert.match(result.detail, /invalid trusted fixture identity binding/u);
});
