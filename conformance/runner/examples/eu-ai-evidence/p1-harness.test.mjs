import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { assertion, MissingObservation, inspect } from './p1-evaluate.mjs';
import { containedPath, FIXTURE_ROOT } from './p1-fixture.mjs';

test('missing observations and executed mismatches have distinct non-success outcomes', () => {
  const missing = assertion('guard', 'missing', 'harness', true, () => { throw new MissingObservation('not emitted'); }, [], 'no claim');
  const wrong = assertion('guard', 'wrong', 'harness', true, () => false, [], 'no claim');
  assert.equal(missing.status, 'UNEVALUATED');
  assert.equal(wrong.status, 'FAIL');
  assert.equal(missing.permitted_claim.includes('did not establish'), true);
});

test('selection cannot pick a winner from zero or multiple current candidates', () => {
  const request = { mode: 'current', dossier_id: 'd', system_id: 's', system_version: 'v' };
  const node = id => ({ id, kind: 'file', gkx: { supersededByIds: [], projection: {
    authored: { uid: id }, rawFrontmatter: { x_eu_ai_demo: { ...request, record_role: 'dossier' } },
  } } });
  assert.throws(() => inspect({ graph: { nodes: [] } }, request), /observed 0/);
  assert.throws(() => inspect({ graph: { nodes: [node('one'), node('two')] } }, request), /observed 2/);
});

test('fixture path containment rejects traversal and absolute references', () => {
  for (const path of ['../system.md', '/system.md', 'C:/system.md', 'a\\system.md']) {
    assert.throws(() => containedPath(FIXTURE_ROOT, path), /Invalid fixture path/);
  }
});

test('a missing observer produces retained non-success evidence and a real non-zero process exit', () => {
  const root = mkdtempSync(resolve(tmpdir(), 'gkos-p1-harness-'));
  const out = resolve(root, 'missing-observer');
  const entry = fileURLToPath(new URL('./p1-valid-dossier.test.mjs', import.meta.url));
  const childEnv = { ...process.env };
  // A fresh test process must not inherit Node's internal child-test marker.
  delete childEnv.NODE_TEST_CONTEXT;
  const child = spawnSync(process.execPath, ['--test', entry], {
    encoding: 'utf8', timeout: 120000,
    env: { ...childEnv, GKOS_P1_OUT: out, GKOS_P1_ENGINE_OBSERVER: resolve(root, 'absent-observer.mjs') },
  });
  assert.ifError(child.error);
  assert.equal(child.status, 1, child.stdout + child.stderr);
  const result = JSON.parse(readFileSync(resolve(out, 'results.json'), 'utf8'));
  assert.notEqual(result.status, 'PASS');
  assert.equal(result.checks.find(c => c.id === 'P11-02').status, 'UNEVALUATED');
  assert.equal(JSON.parse(readFileSync(resolve(out, 'process.json'), 'utf8')).actual_process_exit_code, 1);
  assert.equal(existsSync(resolve(out, 'observations.json')), true);
  // Reusing a populated output directory must not overwrite previous evidence.
  const before = readFileSync(resolve(out, 'results.json'));
  const retry = spawnSync(process.execPath, ['--test', entry], {
    encoding: 'utf8', timeout: 120000, env: { ...childEnv, GKOS_P1_OUT: out },
  });
  assert.notEqual(retry.status, 0);
  assert.deepEqual(readFileSync(resolve(out, 'results.json')), before);
});
