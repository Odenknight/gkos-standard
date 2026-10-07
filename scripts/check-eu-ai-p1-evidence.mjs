// Stored-byte consistency checks, not P1 acceptance or an Engine execution.
import assert from 'node:assert/strict';
import { readFileSync, existsSync, realpathSync } from 'node:fs';
import { resolve, relative, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const repo = realpathSync(process.argv[2] ?? fileURLToPath(new URL('../', import.meta.url)));
const evidence = 'conformance/evidence/eu-ai-p1.1-20260907';
const bytes = path => {
  const full = realpathSync(resolve(repo, path));
  const rel = relative(repo, full);
  assert.ok(rel && rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel), `path escapes repository: ${path}`);
  return readFileSync(full);
};
const json = path => JSON.parse(bytes(path));
const digest = path => createHash('sha256').update(bytes(path)).digest('hex');
const verification = json(`${evidence}/verification.json`);
for (const item of verification.evidence_files) {
  const path = `${evidence}/${item.path}`;
  assert.equal(digest(path), item.sha256, `evidence digest: ${path}`);
  assert.equal(bytes(path).length, item.byte_count, `evidence size: ${path}`);
}
const fixture = 'fixtures/provisional/eu-ai-evidence/p1';
for (const item of json(`${fixture}/manifest.json`).records) {
  assert.equal(digest(`${fixture}/${item.path}`), item.sha256, `fixture digest: ${item.path}`);
}
const rows = [];
let pointers = 0;
for (const run of ['run-01', 'run-02']) {
  const root = `${evidence}/${run}`;
  const result = json(`${root}/results.json`);
  for (const binding of Object.values(result.evidence_bindings)) {
    assert.equal(digest(`${root}/${binding.path}`), binding.sha256, `${run} binding`);
  }
  assert.equal(result.status, 'FAIL', `${run}: retain historical failure`);
  assert.equal(result.checks.filter(c => c.status === 'PASS').length, 10);
  assert.deepEqual(result.checks.filter(c => c.status !== 'PASS').map(c => [c.id, c.status]), [['P11-08', 'FAIL']]);
  assert.equal(json(`${root}/process.json`).actual_process_exit_code, 1);
  rows.push(result.checks.map(({ id, expected, observed, status }) => ({ id, expected, observed, status })));
  for (const check of result.checks) {
    for (const reference of check.evidence) {
      const [path, pointer] = reference.split('#');
      let value = json(`${root}/${path}`);
      for (const part of pointer.slice(1).split('/')) {
        value = value[part.replaceAll('~1', '/').replaceAll('~0', '~')];
        assert.notEqual(value, undefined, `missing evidence pointer: ${reference}`);
      }
      pointers++;
    }
  }
  // These immutable captures retain the original specification's link base.
  // CI checks live documents normally; only these two captures use this base.
  const captured = bytes(`${root}/specification.md`).toString('utf8');
  for (const [, href] of captured.matchAll(/\[[^\]]+\]\(([^)]+)\)/gu)) {
    if (/^[a-z][a-z0-9+.-]*:/iu.test(href) || href.startsWith('#')) continue;
    const target = resolve(repo, 'docs/eu-ai-evidence/specs', href.split('#')[0]);
    assert.ok(existsSync(target), `captured source-relative link: ${href}`);
    bytes(relative(repo, target));
  }
}
assert.deepEqual(rows[0], rows[1], 'cross-process assertions');
console.log(`${verification.evidence_files.length} evidence bindings, 5 fixture hashes, ${pointers} pointers and captured source-relative links verified; historical P11-08 remains FAIL.`);
