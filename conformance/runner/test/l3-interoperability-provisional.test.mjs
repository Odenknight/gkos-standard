import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { classifyCase, compareResults } from '../l3-interoperability-compare.mjs';

const fixturesUrl = new URL('../../../fixtures/provisional/l3-interoperability/cases.json', import.meta.url);
const fixtures = JSON.parse(await readFile(fixturesUrl, 'utf8'));

test('V82 Layer-3 provisional fixture set contains 18 unique cases', () => {
  assert.equal(fixtures.standing, 'provisional-non-normative-non-qualifying');
  assert.equal(fixtures.proposed_decision, 'R23');
  assert.equal(fixtures.cases.length, 18);
  assert.equal(new Set(fixtures.cases.map((row) => row.id)).size, 18);
  for (const row of fixtures.cases) {
    assert.match(row.id, /^L3I-\d{2}$/u);
    assert.equal(typeof row.family, 'string');
    assert.equal(typeof row.expect, 'string');
    assert.equal(typeof row.notes, 'string');
  }
});

test('neutral comparator does not silently choose an implementation as oracle', () => {
  const fixture = fixtures.cases[0];
  assert.equal(classifyCase(fixture, { outcome: fixture.expect }, { outcome: fixture.expect }), 'EQUIVALENT');
  assert.equal(classifyCase(fixture, { outcome: fixture.expect }, { outcome: 'wrong' }), 'IMPLEMENTATION_DIVERGENCE');
  assert.equal(classifyCase(fixture, { outcome: 'wrong' }, { outcome: 'wrong' }), 'FIXTURE_OR_SPEC_REVIEW_REQUIRED');
  assert.equal(classifyCase(fixture, { outcome: fixture.expect }, null), 'INCOMPLETE_IMPLEMENTATION_EVIDENCE');
});

test('portable-meaning disagreement remains visible even when both outcomes match', () => {
  const fixture = fixtures.cases[1];
  assert.equal(
    classifyCase(
      fixture,
      { outcome: fixture.expect, portable_meaning: 'canonical:A-to-B' },
      { outcome: fixture.expect, portable_meaning: 'canonical:B-to-A' },
    ),
    'SPEC_AMBIGUITY',
  );
});

test('comparison reports every fixture and preserves both implementation rows', () => {
  const results = fixtures.cases.map((row) => ({ id: row.id, outcome: row.expect }));
  const report = compareResults(fixtures, { results }, { results });
  assert.equal(report.length, 18);
  assert.ok(report.every((row) => row.classification === 'EQUIVALENT'));
  assert.ok(report.every((row) => row.implementation_a && row.implementation_b));
});
