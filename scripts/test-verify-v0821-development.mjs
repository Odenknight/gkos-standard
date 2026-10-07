// Scripted positive and negative checks for scripts/verify-v0821-release.mjs.
// Usage: node scripts/test-verify-v0821-development.mjs [--commit REV] [--baseline REV] [--workdir DIR] [--keep]
// Runs every case in a temporary clone of the committed candidate; it never
// edits the checkout it starts from and makes no commits. Network is disabled
// for the validator, so --post-tag cases stop at the first GitHub request.
// --baseline names the validator before R25 (default: the R25 input baseline);
// strict, post-tag and proposed-state development outcomes must match it.
import { execFileSync, spawnSync } from 'node:child_process';
import { appendFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const opt = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : fallback;
};
const git = (cwd, args, env) => execFileSync('git', args, {
  cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, env: { ...process.env, ...env },
}).trim();
const source = process.cwd();
const commit = git(source, ['rev-parse', '--verify', `${opt('--commit', 'HEAD')}^{commit}`]);
const baseline = git(source, ['rev-parse', '--verify', `${opt('--baseline', '797174485e86cbc250f52ac897d86b226c160622')}^{commit}`]);
const root = mkdtempSync(join(resolve(opt('--workdir', tmpdir())), 'gkos-validator-'));
const repo = join(root, 'repo');
const validator = 'scripts/verify-v0821-release.mjs';
const r25 = 'decisions/R25_V083_Development_Line_Development_Decision_Record.md';
const immutable = ['requirements', 'schemas', 'fixtures', 'conformance/runner', 'standard/annexes'];

git(root, ['clone', '-q', '--no-hardlinks', '--no-checkout', source, repo]);
const candidateJs = join(root, 'candidate-verify.mjs');
const baselineJs = join(root, 'baseline-verify.mjs');
writeFileSync(candidateJs, git(source, ['show', `${commit}:${validator}`]) + '\n');
writeFileSync(baselineJs, git(source, ['show', `${baseline}:${validator}`]) + '\n');
const offline = join(root, 'offline.mjs');
writeFileSync(offline, "globalThis.fetch = async () => { throw new Error('network disabled by test harness'); };\n");
const tagRef = git(repo, ['rev-parse', 'refs/tags/v0.82.1']);
const published = git(repo, ['rev-parse', 'refs/tags/v0.82.1^{}']);

const file = p => join(repo, p);
const reset = (rev = commit) => {
  git(repo, ['update-ref', 'refs/tags/v0.82.1', tagRef]);
  git(repo, ['checkout', '-q', '-f', '--detach', rev]);
  git(repo, ['clean', '-fdq']);
};
const append = p => appendFileSync(file(p), '\nTest-only change.\n');
const untracked = p => { mkdirSync(dirname(file(p)), { recursive: true }); writeFileSync(file(p), 'untracked\n'); };
const setStatus = text => {
  const s = readFileSync(file(r25), 'utf8');
  if (!/^Status: Proposed$/m.test(s)) throw new Error('R25 has no proposed status line to replace');
  writeFileSync(file(r25), s.replace(/^Status: Proposed$/m, text));
};
const accept = () => setStatus('Status: Accepted');
const lockOtherField = () => {
  const p = file('conformance/runner/package-lock.json');
  const lock = JSON.parse(readFileSync(p, 'utf8'));
  const key = Object.keys(lock.packages).find(k => k.startsWith('node_modules/') && k !== 'node_modules/fast-uri');
  lock.packages[key].integrity = 'sha512-test-only-change';
  writeFileSync(p, JSON.stringify(lock, null, 2) + '\n');
};
const dropAllocation = () => {
  const p = file('requirements/REGISTRY.md');
  const [head, tail] = readFileSync(p, 'utf8').split('## Active allocations');
  writeFileSync(p, `${head}## Active allocations${tail.replace(/^\| `GKOS-[A-Z]+-[0-9]{3}` .*\n/m, '')}`);
};
const firstCandidateFile = () => git(repo, ['ls-files', 'release-candidates']).split('\n')[0];
// Point refs/tags/v0.82.1 at a tree whose schemas/README.md differs.
const moveTag = () => {
  const env = { GIT_INDEX_FILE: join(root, 'tag.index') };
  git(repo, ['read-tree', published], env);
  const blob = execFileSync('git', ['hash-object', '-w', '--stdin'], {
    cwd: repo, input: git(repo, ['show', `${published}:schemas/README.md`]) + '\nmoved\n', encoding: 'utf8',
  }).trim();
  git(repo, ['update-index', '--cacheinfo', `100644,${blob},schemas/README.md`], env);
  git(repo, ['update-ref', 'refs/tags/v0.82.1', git(repo, ['write-tree'], env)]);
  unlinkSync(env.GIT_INDEX_FILE);
};

const run = (js, args) => {
  const r = spawnSync(process.execPath, ['--import', pathToFileURL(offline).href, js, ...args], { cwd: repo, encoding: 'utf8' });
  const lines = (r.stderr ?? '').split(/\r?\n/);
  const start = lines.findIndex(l => /^[A-Za-z]*Error\b/.test(l));
  const end = start < 0 ? -1 : lines.findIndex((l, i) => i > start && /^\s+at /.test(l));
  const error = start < 0 ? '' : lines.slice(start, end < 0 ? undefined : end).join('\n').trim();
  return { code: r.status, stdout: r.stdout.trim(), error };
};

const headFrozen = git(source, ['diff', '--name-only', published, commit, '--', ...immutable])
  .split('\n').filter(p => p && p !== 'conformance/runner/package-lock.json').length > 0;
const frozenMsg = 'unreviewed development technical change';
const D = ['--development'];
// expect: 'PASS' or a list of acceptable failure-message substrings.
// compare: also run the baseline validator and require identical outcomes.
const cases = [
  ['P01 proposed: head as committed', [], D, headFrozen ? [frozenMsg] : 'PASS', true],
  ['P02 proposed: schema prose edit rejected', [() => append('schemas/README.md')], D, [frozenMsg], true],
  ['P03 proposed: runner code edit rejected', [() => append('conformance/runner/run.mjs')], D, [frozenMsg], true],
  ['P04 proposed: other lock field rejected', [lockOtherField], D, [headFrozen ? frozenMsg : 'unreviewed dependency change'], true],
  ['P05 proposed: releases/ edit rejected', [() => append('releases/2026-09-24-v0.82.1/README.md')], D, [frozenMsg, 'published package changed'], true],
  ['P06 proposed: release-candidates/ edit rejected', [() => append(firstCandidateFile())], D, [frozenMsg, 'published package changed'], true],
  ['P07 proposed: untracked file in schemas/ rejected (REV-012)', [() => untracked('schemas/extra.schema.json')], D, ['untracked file in protected path'], false],
  ['P08 proposed: untracked file in releases/ rejected (REV-012)', [() => untracked('releases/2026-09-24-v0.82.1/extra.txt')], D, ['untracked file in protected path'], false],
  ['P09 proposed: ignored node_modules file allowed', [() => untracked('conformance/runner/node_modules/x/index.js')], D, headFrozen ? [frozenMsg] : 'PASS', true],
  ['P10 proposed: development with post-tag rejected', [], ['--development', '--post-tag'], ['development is not publication validation'], true],
  ['P11 untracked R25 marked accepted does not open the line', [() => git(repo, ['rm', '-q', '--cached', r25]), accept, () => append('schemas/README.md')], D, [frozenMsg], false],
  ['P12 R25 with both status lines does not open the line', [() => setStatus('Status: Proposed\nStatus: Accepted'), () => append('schemas/README.md')], D, [frozenMsg], false],
  ['P13 inexact accepted line does not open the line', [() => setStatus('Status: Accepted 2026-10-08'), () => append('schemas/README.md')], D, [frozenMsg], false],
  ['P14 R25 removed does not open the line', [() => git(repo, ['rm', '-q', r25]), () => append('schemas/README.md')], D, [frozenMsg], false],
  ['A01 accepted: head as committed', [accept], D, 'PASS', false],
  ['A02 accepted: schema prose edit allowed', [accept, () => append('schemas/README.md')], D, 'PASS', false],
  ['A03 accepted: runner code edit allowed', [accept, () => append('conformance/runner/run.mjs')], D, 'PASS', false],
  ['A04 accepted: other lock field allowed', [accept, lockOtherField], D, 'PASS', false],
  ['A05 accepted: releases/ edit rejected', [accept, () => append('releases/2026-09-24-v0.82.1/README.md')], D, ['published package changed'], false],
  ['A06 accepted: older release package edit rejected', [accept, () => append('releases/2026-09-03-v0.81/README.md')], D, ['published package changed'], false],
  ['A07 accepted: release-candidates/ edit rejected', [accept, () => append(firstCandidateFile())], D, ['published package changed'], false],
  ['A08 accepted: untracked file in schemas/ rejected', [accept, () => untracked('schemas/extra.schema.json')], D, ['untracked file in protected path'], false],
  ['A09 accepted: untracked file in release-candidates/ rejected', [accept, () => untracked('release-candidates/extra.txt')], D, ['untracked file in protected path'], false],
  ['A10 accepted: development with post-tag rejected', [accept], ['--development', '--post-tag'], ['development is not publication validation'], false],
  ['A11 accepted: moved v0.82.1 tag sources rejected', [accept, moveTag], D, ['published technical baseline changed'], false],
  ['A12 accepted: active allocation count still enforced', [accept, dropAllocation], D, ['61 !== 62'], false],
  ['S01 strict: head as committed', [], [], ['technical baseline changed'], true],
  ['S02 strict: accepted R25 and schema edit still rejected', [accept, () => append('schemas/README.md')], [], ['technical baseline changed'], true],
  ['T01 post-tag: head as committed', [], ['--post-tag'], ['technical baseline changed'], true],
  ['T02 post-tag: accepted R25 and schema edit still rejected', [accept, () => append('schemas/README.md')], ['--post-tag'], ['technical baseline changed'], true],
];
const tagCases = [
  ['S03 strict at v0.82.1 tag passes', [], [], 'PASS'],
  ['S04 strict at tag: accepted R25 copy and schema edit rejected', [() => { untracked(r25); writeFileSync(file(r25), 'Status: Accepted\n'); }, () => append('schemas/README.md')], [], ['technical baseline changed']],
  ['S05 strict at tag: older release package edit rejected', [() => append('releases/2026-09-03-v0.81/README.md')], [], ['historical package changed']],
  ['S06 strict at tag: untracked schema file unchanged behaviour', [() => untracked('schemas/extra.schema.json')], [], 'PASS'],
  ['T03 post-tag at tag reaches signed-tag check (network disabled)', [], ['--post-tag'], ['network disabled by test harness']],
  ['T04 post-tag at tag: schema edit rejected', [() => append('schemas/README.md')], ['--post-tag'], ['technical baseline changed']],
].map(c => [...c, true, published]);

let failures = 0;
const results = [];
for (const [name, setup, args, expect, compare, rev] of [...cases, ...tagCases]) {
  reset(rev);
  for (const step of setup) step();
  const got = run(candidateJs, args);
  let ok = expect === 'PASS'
    ? got.code === 0
    : got.code !== 0 && expect.some(m => got.error.includes(m));
  let note = got.code === 0 ? 'exit 0' : `exit ${got.code}: ${got.error.split('\n')[0]}`;
  if (compare) {
    const old = run(baselineJs, args);
    const same = old.code === got.code && old.stdout === got.stdout && old.error === got.error;
    if (!same) { ok = false; note += ` | baseline differs: exit ${old.code}: ${old.error.split('\n')[0] || old.stdout}`; }
    else note += ' | baseline identical';
  }
  if (!ok) failures++;
  results.push({ name, ok, args, note });
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name} [${args.join(' ') || 'strict'}] ${note}`);
}
reset();
if (!process.argv.includes('--keep')) rmSync(root, { recursive: true, force: true });
console.log(`${results.length - failures}/${results.length} validator cases as expected; candidate ${commit}; baseline ${baseline}; head carries frozen-path changes: ${headFrozen}`);
process.exitCode = failures ? 1 : 0;
