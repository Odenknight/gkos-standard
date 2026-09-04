import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import { classifyCase, compareMany, compareResults } from '../l3-interoperability-compare.mjs';

const fixturesUrl = new URL('../../../fixtures/provisional/l3-interoperability/cases.json', import.meta.url);
const schemaUrl = new URL('../../../schemas/provisional/l3/l3-interoperability-0.1-proposed.json', import.meta.url);
const commonUrl = new URL('../../../schemas/gkx-common.defs.json', import.meta.url);
const relationRegistryUrl = new URL('../../../schemas/provisional/l3/l3-relation-registry-0.1-proposed.json', import.meta.url);

const [fixtures, schema, common, relationRegistry] = await Promise.all(
  [fixturesUrl, schemaUrl, commonUrl, relationRegistryUrl].map(async (url) => JSON.parse(await readFile(url, 'utf8'))),
);

const ajv = new Ajv2020({ strict: false, allErrors: true, formats: { 'date-time': true } });
ajv.addSchema(common);
const validateRecord = ajv.compile(schema);

function expectedResultRows() {
  return fixtures.cases.map((fixture) => ({
    id: fixture.id,
    outcome: fixture.expected_class,
    portable_meaning: fixture.expected_portable_meaning,
  }));
}

test('V82 Layer-3 fixture tranche is executable and structurally complete', () => {
  assert.equal(fixtures.standing, 'provisional-non-normative-non-qualifying');
  assert.equal(fixtures.proposed_decision, 'R23');
  assert.ok(fixtures.cases.length >= 23);
  assert.equal(new Set(fixtures.cases.map((row) => row.id)).size, fixtures.cases.length);
  for (const row of fixtures.cases) {
    assert.match(row.id, /^L3I-\d{2}$/u);
    assert.equal(typeof row.family, 'string');
    assert.ok(['valid', 'invalid'].includes(row.input_validity));
    assert.ok(Array.isArray(row.input) && row.input.length > 0);
    assert.equal(typeof row.expected_class, 'string');
    assert.ok(row.expected_portable_meaning && typeof row.expected_portable_meaning === 'object');
    assert.ok(['SEMANTIC_DIVERGENCE', 'ALLOWED_VARIATION'].includes(row.mismatch_class));
    assert.ok(Array.isArray(row.requirement_refs) && row.requirement_refs.length > 0);
    assert.equal(row.candidate_standing, 'proposed-v0.82');
  }
});

test('every fixture input has the declared provisional schema validity', () => {
  for (const fixture of fixtures.cases) {
    const results = fixture.input.map((record) => validateRecord(record));
    if (fixture.input_validity === 'valid') {
      assert.ok(results.every(Boolean), `${fixture.id} expected schema-valid: ${JSON.stringify(validateRecord.errors)}`);
    } else {
      assert.ok(results.some((valid) => !valid), `${fixture.id} expected at least one schema-invalid record`);
    }
  }
});

test('candidate relation registry reserves gkos and makes supersedes directed and acyclic', () => {
  assert.equal(relationRegistry.reserved_core_namespace, 'gkos');
  const keys = new Set(relationRegistry.relations.map((row) => `${row.namespace}:${row.name}`));
  assert.deepEqual(keys, new Set(['gkos:contradicts', 'gkos:corrects', 'gkos:supersedes']));
  const supersedes = relationRegistry.relations.find((row) => row.namespace === 'gkos' && row.name === 'supersedes');
  assert.equal(supersedes.directed, true);
  assert.equal(supersedes.acyclic, true);
});

test('neutral comparator requires expected portable meaning on every side', () => {
  const fixture = fixtures.cases[0];
  const good = { outcome: fixture.expected_class, portable_meaning: fixture.expected_portable_meaning };
  assert.equal(classifyCase(fixture, [good, good]), 'EQUIVALENT');
  assert.equal(classifyCase(fixture, [good, { outcome: fixture.expected_class }]), 'INCOMPLETE_IMPLEMENTATION_EVIDENCE');
});

test('portable-meaning disagreement remains cause-neutral and visible', () => {
  const fixture = fixtures.cases[1];
  assert.equal(
    classifyCase(fixture, [
      { outcome: fixture.expected_class, portable_meaning: fixture.expected_portable_meaning },
      { outcome: fixture.expected_class, portable_meaning: { projection_of: 'different' } },
    ]),
    'MEANING_DIVERGENCE_REVIEW_REQUIRED',
  );
});

test('implementation self-report cannot create allowed variation', () => {
  const fixture = fixtures.cases.find((row) => row.mismatch_class === 'SEMANTIC_DIVERGENCE');
  assert.equal(
    classifyCase(fixture, [
      { outcome: 'ALLOWED_VARIATION', portable_meaning: fixture.expected_portable_meaning },
      { outcome: 'ALLOWED_VARIATION', portable_meaning: fixture.expected_portable_meaning },
    ]),
    'FIXTURE_OR_IMPLEMENTATION_REVIEW_REQUIRED',
  );
});

test('allowed variation is derived from fixture authority only', () => {
  const fixture = fixtures.cases.find((row) => row.mismatch_class === 'ALLOWED_VARIATION');
  const good = { outcome: fixture.expected_class, portable_meaning: fixture.expected_portable_meaning };
  assert.equal(classifyCase(fixture, [good, good]), 'ALLOWED_VARIATION');
});

test('duplicate implementation result ids are rejected', () => {
  const duplicate = { results: [
    { id: fixtures.cases[0].id, outcome: 'x' },
    { id: fixtures.cases[0].id, outcome: 'y' },
  ] };
  assert.throws(() => compareMany(fixtures, [duplicate, { results: [] }]), /duplicate implementation result id/u);
});

test('comparison supports more than two result sets without independence claims', () => {
  const rows = expectedResultRows();
  const report = compareMany(fixtures, [{ results: rows }, { results: rows }, { results: rows }]);
  assert.equal(report.length, fixtures.cases.length);
  assert.ok(report.every((row) => ['EQUIVALENT', 'ALLOWED_VARIATION'].includes(row.classification)));
  assert.ok(report.every((row) => row.implementations.length === 3));
});

test('two-result compatibility wrapper remains deterministic', () => {
  const rows = expectedResultRows();
  const report = compareResults(fixtures, { results: rows }, { results: rows });
  assert.equal(report.length, fixtures.cases.length);
  assert.ok(report.every((row) => ['EQUIVALENT', 'ALLOWED_VARIATION'].includes(row.classification)));
});
