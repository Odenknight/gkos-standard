import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import YAML from 'yaml';

const root = resolve(import.meta.dirname, '../../..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const ajv = new Ajv2020.default({ strict: false, allErrors: true });
ajv.addSchema(JSON.parse(read('schemas/gkx-common.defs.json')));
const validate = ajv.compile(JSON.parse(read('schemas/gkx-frontmatter-2.0.schema.json')));
const note = {
  gkx_version: '2.0', uid: '0199ff00-0000-7000-8000-000000000001',
  title: 'Lineage boundary', type: 'note', created_at: '2026-10-20T08:00:00Z',
  epistemic_state: 'reported',
};
const target = '0199ff00-0000-7000-8000-000000000002';

test('frontmatter accepts omitted lineage, empty arrays and extension metadata', () => {
  for (const extra of [{}, { supersedes: [], superseded_by: [] }, { camp_extension: { value: 1 } }]) {
    assert.equal(validate({ ...note, ...extra }), true, JSON.stringify(validate.errors));
  }
});
for (const field of ['supersedes', 'superseded_by']) {
  test(`${field} accepts shared target grammar and rejects malformed collections`, () => {
    for (const values of [[target], ['record:predecessor'], ['[[Predecessor]]'], [target, 'record:other']]) {
      assert.equal(validate({ ...note, [field]: values }), true, JSON.stringify(validate.errors));
    }
    for (const values of [target, null, {}, [null], [23], [''], ['plain filename.md'], [target, target]]) {
      assert.equal(validate({ ...note, [field]: values }), false, JSON.stringify(values));
      assert.ok(validate.errors.some(error => error.instancePath.startsWith(`/${field}`)));
    }
  });
}
test('existing minimal and supersession corpus fixtures retain schema validity', () => {
  for (const name of ['gcp1-p01-agent-ready-minimal', 'gcp3-l01-superseded']) {
    const source = read(`fixtures/corpus/${name}.md`);
    const header = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1];
    assert.equal(validate(YAML.parse(header)), true, `${name}: ${JSON.stringify(validate.errors)}`);
  }
});
test('schema preserves identity compatibility and does not pretend to validate graph authority', () => {
  assert.equal(validate({ ...note, uid: '8b9c0d1e-2f3a-4b4c-8d5e-6f7a8b9c0d1e' }), true);
  assert.equal(validate({ ...note, gkx_version: '2.3' }), false);
  // These shapes require graph/authority evaluation beyond this structural validator.
  assert.equal(validate({ ...note, supersedes: [note.uid] }), true);
  assert.equal(validate({ ...note, superseded_by: [target] }), true);
});
