import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const corpusPath = resolve("../../fixtures/provisional/retrieval/rret-01-corpus.json");
const schemaPath = resolve("../../schemas/provisional/retrieval/rret-01-corpus.schema.json");
const corpus = JSON.parse(readFileSync(corpusPath, "utf8"));
const schema = JSON.parse(readFileSync(schemaPath, "utf8"));
const sha256 = (value) => createHash("sha256").update(value, "utf8").digest("hex");
const byId = (id) => corpus.cases.find((item) => item.fixture_id === id);

test("RRET-01 corpus validates and remains provisional/non-qualifying", () => {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  assert.equal(validate(corpus), true, JSON.stringify(validate.errors));
  assert.equal(corpus.status, "provisional-non-normative");
  assert.deepEqual(corpus.qualifying_profiles, []);
  assert.equal(corpus.cases.length, 10);
  assert.deepEqual(
    corpus.cases.map((item) => item.fixture_id),
    Array.from({ length: 10 }, (_, index) => `RRET-01-N${String(index + 1).padStart(2, "0")}`)
  );
});

test("RRET-01 evidence and RR digests are reproducible and attributable", () => {
  for (const fixture of corpus.cases) {
    for (const evidence of fixture.evidence_objects) {
      assert.equal(evidence.source_content_sha256, sha256(evidence.content), `${fixture.fixture_id}/${evidence.id} source digest`);
      assert.equal(evidence.rr.rr_content_sha256, sha256(evidence.rr.text), `${fixture.fixture_id}/${evidence.id} RR digest`);
      const generator = corpus.rr_generators[evidence.rr.generator_ref];
      assert.ok(generator, `${fixture.fixture_id}/${evidence.id} generator exists`);
      assert.equal(generator.regenerable, true);
      assert.match(generator.prompt_sha256, /^[a-f0-9]{64}$/);
    }
  }
});

test("RRET-01 raw retrieval rows contain no governance fields and preserve declared ranking", () => {
  const allowedKeys = ["evidence_id", "rank", "rr_id", "score"].sort();
  for (const fixture of corpus.cases) {
    const evidenceIds = new Set(fixture.evidence_objects.map((item) => item.id));
    const rrIds = new Set(fixture.evidence_objects.map((item) => item.rr.rr_id));
    fixture.raw_retrieval.forEach((row, index) => {
      assert.deepEqual(Object.keys(row).sort(), allowedKeys, `${fixture.fixture_id} retrieval row boundary`);
      assert.equal(row.rank, index + 1, `${fixture.fixture_id} contiguous rank`);
      assert.ok(evidenceIds.has(row.evidence_id), `${fixture.fixture_id} evidence ref`);
      assert.ok(rrIds.has(row.rr_id), `${fixture.fixture_id} RR ref`);
    });
    assert.equal(fixture.raw_retrieval[0].evidence_id, fixture.expected.raw_top_evidence_id);
  }
});

test("RRET-01 answer composition can only cite evidence objects, never RRs", () => {
  for (const fixture of corpus.cases) {
    const evidenceIds = new Set(fixture.evidence_objects.map((item) => item.id));
    const rrIds = new Set(fixture.evidence_objects.map((item) => item.rr.rr_id));
    for (const answerId of fixture.expected.answer_evidence_ids) {
      assert.ok(evidenceIds.has(answerId), `${fixture.fixture_id} answer cites evidence`);
      assert.equal(rrIds.has(answerId), false, `${fixture.fixture_id} answer must not cite RR`);
    }
    if (fixture.expected.answer_evidence_ids.length > 0) {
      assert.equal(fixture.expected.answer_content_source, "EVIDENCE_OBJECT");
    } else {
      assert.equal(fixture.expected.answer_content_source, "NONE");
    }
  }
});

test("RRET-01-N01 proves governance can correct a wrong operative retrieval winner", () => {
  const fixture = byId("RRET-01-N01");
  assert.equal(fixture.raw_retrieval[0].evidence_id, "db02");
  assert.equal(fixture.evidence_objects.find((item) => item.id === "db02").governance.disposition, "SUPERSEDED");
  assert.deepEqual(fixture.expected.answer_evidence_ids, ["db01"]);
});

test("RRET-01-N05 keeps SOURCE_SCOPED superseded material tagged and non-operative", () => {
  const fixture = byId("RRET-01-N05");
  assert.equal(fixture.query.effective_intent, "SOURCE_SCOPED");
  assert.equal(fixture.expected.action, "RETURN_TAGGED_NON_OPERATIVE");
  assert.equal(fixture.expected.required_structured_annotations.disposition, "SUPERSEDED");
  assert.equal(fixture.expected.final_effect, "DENY_WITHOUT_SEPARATE_AUTHORIZATION");
  assert.deepEqual(fixture.expected.required_receipts, ["SUPERSEDED_SOURCE_USE_AUTHORIZATION"]);
});

test("RRET-01-N06 exposes eligible-candidate recall failure before governance", () => {
  const fixture = byId("RRET-01-N06");
  const currentRank = fixture.raw_retrieval.find((item) => item.evidence_id === "key-current").rank;
  assert.ok(currentRank > fixture.query.initial_candidate_window);
  assert.deepEqual(fixture.expected.eligible_candidate_recall, { at_5: false, at_10: true });
  assert.equal(fixture.expected.action, "EXPAND_RETRIEVAL_THEN_ANSWER");
});

test("RRET-01-N07 defaults omitted caller intent to CURRENT_STATE", () => {
  const fixture = byId("RRET-01-N07");
  assert.equal(fixture.query.declared_intent, null);
  assert.equal(fixture.query.effective_intent, "CURRENT_STATE");
  assert.equal(fixture.raw_retrieval[0].evidence_id, "endpoint-historical");
  assert.deepEqual(fixture.expected.answer_evidence_ids, ["endpoint-current"]);
});

test("RRET-01-N08 forbids fallback when no eligible candidate exists", () => {
  const fixture = byId("RRET-01-N08");
  assert.deepEqual(fixture.expected.eligible_evidence_ids, []);
  assert.deepEqual(fixture.expected.answer_evidence_ids, []);
  assert.equal(fixture.expected.action, "ABSTAIN_OR_EXPAND");
  assert.equal(fixture.expected.final_effect, "DENY");
});

test("RRET-01-N09 keeps Human Operator authority outside the agent caller envelope", () => {
  const fixture = byId("RRET-01-N09");
  assert.equal(fixture.query.caller.actor_class, "AGENT");
  assert.equal(fixture.evidence_objects.find((item) => item.id === "writer-enable-decision").governance.authorization, "HUMAN_OPERATOR_ONLY");
  assert.equal(fixture.expected.action, "ESCALATE_HUMAN_TO_DO");
  assert.deepEqual(fixture.expected.required_receipts, ["HUMAN_OPERATOR_AUTHORIZATION"]);
  assert.deepEqual(fixture.expected.answer_evidence_ids, []);
});

test("RRET-01-N10 preserves a semantic tie so governance, not ranking, selects current evidence", () => {
  const fixture = byId("RRET-01-N10");
  assert.equal(fixture.raw_retrieval[0].score, fixture.raw_retrieval[1].score);
  assert.equal(fixture.evidence_objects[0].content, fixture.evidence_objects[1].content);
  assert.equal(fixture.raw_retrieval[0].evidence_id, "window-old");
  assert.deepEqual(fixture.expected.answer_evidence_ids, ["window-current"]);
});
