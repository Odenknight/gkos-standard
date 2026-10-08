// Scripted positive and negative checks for scripts/verify-v0821-release.mjs.
// Usage: node scripts/test-verify-v0821-development.mjs [--commit REV] [--baseline REV] [--workdir DIR] [--keep]
// Runs every case in a temporary clone of the committed candidate; it never
// edits the checkout it starts from and makes no commits. Network is disabled
// for the validator, so --post-tag cases stop at the first GitHub request.
// --baseline names the validator before R25 (default: the R25 input baseline);
// strict, post-tag and proposed-state development outcomes must match it.
// R25 is accepted on main; proposed-state cases first set its status line back
// to 'Status: Proposed' in the temporary clone.
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
const priorTagRef = git(repo, ['rev-parse', 'refs/tags/v0.82']);
const published = git(repo, ['rev-parse', 'refs/tags/v0.82.1^{}']);

const file = p => join(repo, p);
const reset = (rev = commit) => {
  git(repo, ['update-ref', 'refs/tags/v0.82.1', tagRef]);
  git(repo, ['update-ref', 'refs/tags/v0.82', priorTagRef]);
  git(repo, ['checkout', '-q', '-f', '--detach', rev]);
  git(repo, ['clean', '-fdq']);
};
const append = p => appendFileSync(file(p), '\nTest-only change.\n');
const untracked = p => { mkdirSync(dirname(file(p)), { recursive: true }); writeFileSync(file(p), 'untracked\n'); };
const setStatus = text => {
  const s = readFileSync(file(r25), 'utf8');
  if (!/^Status: (Proposed|Accepted)$/m.test(s)) throw new Error('R25 has no status line to replace');
  writeFileSync(file(r25), s.replace(/^Status: (Proposed|Accepted)$/m, text));
};
const accept = () => setStatus('Status: Accepted');
const propose = () => setStatus('Status: Proposed');
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
const registryPath = 'requirements/REGISTRY.md';
const gatePath = 'standard/annexes/Diagnostic_Code_Registry.md';
const allocationsIn = text => text.split('## Active allocations')[1].split('## Accepted unpublished allocations')[0].match(/^\| `GKOS-[A-Z]+-[0-9]{3}` /gm) ?? [];
const gatesIn = text => text.match(/^\| GKOS-GATE-L[0-9]-[0-9]{3} \|/gm) ?? [];
const addGate = () => {
  const s = readFileSync(file(gatePath), 'utf8');
  const last = [...s.matchAll(/^\| GKOS-GATE-L[0-9]-[0-9]{3} \|.*$/gm)].at(-1);
  const at = last.index + last[0].length;
  writeFileSync(file(gatePath), `${s.slice(0, at)}\n| GKOS-GATE-L7-999 | L7 | Test-only appended code | GKOS-AUTHUSE-001 |${s.slice(at)}`);
};
const dropGate = () => {
  const s = readFileSync(file(gatePath), 'utf8');
  writeFileSync(file(gatePath), s.replace(/^\| GKOS-GATE-L1-001 \|.*\n/m, ''));
};
const addAllocation = () => {
  const s = readFileSync(file(registryPath), 'utf8');
  const at = s.indexOf('\n## Accepted unpublished allocations');
  writeFileSync(file(registryPath), `${s.slice(0, at).trimEnd()}\n| \`GKOS-TESTONLY-001\` | Test-only allocation. | Test | Test | None |\n${s.slice(at)}`);
};
// r26-REV-002 mutations: change content while keeping the identifier.
const editRow = (p, pattern, edit) => {
  const s = readFileSync(file(p), 'utf8');
  const row = pattern.exec(s);
  if (!row) throw new Error(`no row matching ${pattern} in ${p}`);
  const changed = edit(row[0]);
  if (changed === row[0]) throw new Error(`row edit made no change in ${p}`);
  writeFileSync(file(p), s.replace(row[0], changed));
};
const allocationRow = /^\| `GKOS-RETENTION-001` \|.*$/m;
const rewriteRequirementText = () => editRow(registryPath, allocationRow, row => row.replace('MUST consult', 'SHOULD consult'));
const updateStatusCell = () => editRow(registryPath, allocationRow, row => row.replace('| Active — GKOS v0.79 |', '| Active — GKOS v0.79; test-only dated status note |'));
const gateRow = /^\| GKOS-GATE-L4-001 \|.*$/m;
const rewriteGateCondition = () => editRow(gatePath, gateRow, row => row.replace('unavailable or indeterminate', 'unavailable'));
const remapGateRequirement = () => editRow(gatePath, gateRow, row => row.replace('| GKOS-RETENTION-003 |', '| GKOS-RETENTION-001 |'));
const relayerGate = () => editRow(gatePath, gateRow, row => row.replace('| L4 |', '| L5 |'));
// r26-REV-002 duplicate-row mutations: change the original row, then insert
// an unchanged copy of it directly after, so a last-wins map would see the
// original content.
const rewriteThenDuplicate = (p, pattern, edit) => {
  const s = readFileSync(file(p), 'utf8');
  const row = pattern.exec(s);
  if (!row) throw new Error(`no row matching ${pattern} in ${p}`);
  const changed = edit(row[0]);
  if (changed === row[0]) throw new Error(`row edit made no change in ${p}`);
  writeFileSync(file(p), s.replace(row[0], `${changed}\n${row[0]}`));
};
const duplicateRequirementRow = () => rewriteThenDuplicate(registryPath, allocationRow, row => row.replace('MUST consult', 'SHOULD consult'));
const duplicateGateRow = () => rewriteThenDuplicate(gatePath, gateRow, row => row.replace('unavailable or indeterminate', 'unavailable'));
const duplicateExactGateRow = () => {
  const s = readFileSync(file(gatePath), 'utf8');
  const row = gateRow.exec(s);
  writeFileSync(file(gatePath), s.replace(row[0], `${row[0]}\n${row[0]}`));
};
const firstCandidateFile = () => git(repo, ['ls-files', 'release-candidates']).split('\n')[0];
// Point refs/tags/v0.82.1 at a tree whose schemas/README.md differs.
// Point refs/tags/v0.82 and refs/tags/v0.82.1 at one tree whose published
// registry lacks an allocation, so the tag-side count is the first failure.
const moveBothTagsDroppingAllocation = () => {
  const env = { GIT_INDEX_FILE: join(root, 'tag.index') };
  git(repo, ['read-tree', published], env);
  const [head, tail] = git(repo, ['show', `${published}:${registryPath}`]).split('## Active allocations');
  const blob = execFileSync('git', ['hash-object', '-w', '--stdin'], {
    cwd: repo, input: `${head}## Active allocations${tail.replace(/^\| `GKOS-[A-Z]+-[0-9]{3}` .*\n/m, '')}\n`, encoding: 'utf8',
  }).trim();
  git(repo, ['update-index', '--cacheinfo', `100644,${blob},${registryPath}`], env);
  const tree = git(repo, ['write-tree'], env);
  git(repo, ['update-ref', 'refs/tags/v0.82.1', tree]);
  git(repo, ['update-ref', 'refs/tags/v0.82', tree]);
  unlinkSync(env.GIT_INDEX_FILE);
};
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
// Main may grow on the open v0.83 line. Where the committed head no longer
// carries the v0.82.1 counts, strict, post-tag and proposed-state runs stop at
// the unchanged checkout count assertion, exactly as the baseline validator does.
const headAllocations = allocationsIn(git(source, ['show', `${commit}:${registryPath}`])).length;
const headGates = gatesIn(git(source, ['show', `${commit}:${gatePath}`])).length;
const countMsg = headAllocations !== 62 ? `${headAllocations} !== 62` : headGates !== 28 ? `${headGates} !== 28` : null;
const first = (...msgs) => countMsg ? [countMsg] : msgs;
const firstOrPass = msg => countMsg ? [countMsg] : headFrozen ? [msg] : 'PASS';
const lostMsg = 'published allocation or gate code missing on main';
const D = ['--development'];
// expect: 'PASS' or a list of acceptable failure-message substrings.
// compare: also run the baseline validator and require identical outcomes.
const cases = [
  ['P01 proposed: head as committed', [propose], D, firstOrPass(frozenMsg), true],
  ['P02 proposed: schema prose edit rejected', [propose, () => append('schemas/README.md')], D, first(frozenMsg), true],
  ['P03 proposed: runner code edit rejected', [propose, () => append('conformance/runner/run.mjs')], D, first(frozenMsg), true],
  ['P04 proposed: other lock field rejected', [propose, lockOtherField], D, first(headFrozen ? frozenMsg : 'unreviewed dependency change'), true],
  ['P05 proposed: releases/ edit rejected', [propose, () => append('releases/2026-09-24-v0.82.1/README.md')], D, first(frozenMsg, 'published package changed'), true],
  ['P06 proposed: release-candidates/ edit rejected', [propose, () => append(firstCandidateFile())], D, first(frozenMsg, 'published package changed'), true],
  ['P07 proposed: untracked file in schemas/ rejected (REV-012)', [propose, () => untracked('schemas/extra.schema.json')], D, first('untracked file in protected path'), false],
  ['P08 proposed: untracked file in releases/ rejected (REV-012)', [propose, () => untracked('releases/2026-09-24-v0.82.1/extra.txt')], D, first('untracked file in protected path'), false],
  ['P09 proposed: ignored node_modules file allowed', [propose, () => untracked('conformance/runner/node_modules/x/index.js')], D, firstOrPass(frozenMsg), true],
  ['P10 proposed: development with post-tag rejected', [propose], ['--development', '--post-tag'], first('development is not publication validation'), true],
  ['P11 untracked R25 marked accepted does not open the line', [() => git(repo, ['rm', '-q', '--cached', r25]), accept, () => append('schemas/README.md')], D, first(frozenMsg), false],
  ['P12 R25 with both status lines does not open the line', [() => setStatus('Status: Proposed\nStatus: Accepted'), () => append('schemas/README.md')], D, first(frozenMsg), false],
  ['P13 inexact accepted line does not open the line', [() => setStatus('Status: Accepted 2026-10-08'), () => append('schemas/README.md')], D, first(frozenMsg), false],
  ['P14 R25 removed does not open the line', [() => git(repo, ['rm', '-q', r25]), () => append('schemas/README.md')], D, first(frozenMsg), false],
  ['P15 proposed: appended gate code still counted in the checkout', [propose, addGate], D, [`${headGates + 1} !== 28`], true],
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
  ['A12 accepted: dropped published allocation on main rejected', [accept, dropAllocation], D, [lostMsg], false],
  ['A13 accepted: main may gain a gate code', [accept, addGate], D, 'PASS', false],
  ['A14 accepted: main may gain a requirement allocation', [accept, addAllocation], D, 'PASS', false],
  ['A15 accepted: dropped published gate code on main rejected', [accept, dropGate], D, [lostMsg], false],
  ['A16 accepted: counts asserted against the v0.82.1 tag files', [accept, moveBothTagsDroppingAllocation], D, ['61 !== 62'], false],
  ['A17 accepted: published requirement text rewritten, ID kept, rejected (r26-REV-002)', [accept, rewriteRequirementText], D, ['published requirement text changed on main'], false],
  ['A18 accepted: published gate condition rewritten, code kept, rejected (r26-REV-002)', [accept, rewriteGateCondition], D, ['published gate definition changed on main'], false],
  ['A19 accepted: published gate requirement mapping changed, code kept, rejected (r26-REV-002)', [accept, remapGateRequirement], D, ['published gate definition changed on main'], false],
  ['A20 accepted: published gate layer changed, code kept, rejected (r26-REV-002)', [accept, relayerGate], D, ['published gate definition changed on main'], false],
  ['A21 accepted: dated status cell update with original text kept allowed', [accept, updateStatusCell], D, 'PASS', false],
  ['A22 accepted: rewritten requirement row followed by its unchanged duplicate rejected (r26-REV-002)', [accept, duplicateRequirementRow], D, ['duplicate requirement ID on main'], false],
  ['A23 accepted: rewritten gate row followed by its unchanged duplicate rejected (r26-REV-002)', [accept, duplicateGateRow], D, ['duplicate gate code on main'], false],
  ['A24 accepted: exact duplicate of a published gate row rejected (r26-REV-002)', [accept, duplicateExactGateRow], D, ['duplicate gate code on main'], false],
  ['P17 proposed: duplicate requirement row still counted in the checkout', [propose, duplicateRequirementRow], D, [`${headAllocations + 1} !== 62`], true],
  ['P16 proposed: requirement text rewrite still stops at the frozen-path check', [propose, rewriteRequirementText], D, first(frozenMsg), true],
  ['S01 strict: head as committed', [], [], first('technical baseline changed'), true],
  ['S02 strict: accepted R25 and schema edit still rejected', [accept, () => append('schemas/README.md')], [], first('technical baseline changed'), true],
  ['S07 strict: appended gate code counted in the checkout', [addGate], [], [`${headGates + 1} !== 28`], true],
  ['S09 strict: requirement text rewrite unchanged behaviour', [rewriteRequirementText], [], first('technical baseline changed'), true],
  ['S10 strict: gate condition rewrite unchanged behaviour', [rewriteGateCondition], [], first('technical baseline changed'), true],
  ['T07 post-tag: gate condition rewrite unchanged behaviour', [rewriteGateCondition], ['--post-tag'], first('technical baseline changed'), true],
  ['T01 post-tag: head as committed', [], ['--post-tag'], first('technical baseline changed'), true],
  ['T02 post-tag: accepted R25 and schema edit still rejected', [accept, () => append('schemas/README.md')], ['--post-tag'], first('technical baseline changed'), true],
  ['T05 post-tag: appended gate code counted in the checkout', [addGate], ['--post-tag'], [`${headGates + 1} !== 28`], true],
];
const tagCases = [
  ['S03 strict at v0.82.1 tag passes', [], [], 'PASS'],
  ['S04 strict at tag: accepted R25 copy and schema edit rejected', [() => { untracked(r25); writeFileSync(file(r25), 'Status: Accepted\n'); }, () => append('schemas/README.md')], [], ['technical baseline changed']],
  ['S05 strict at tag: older release package edit rejected', [() => append('releases/2026-09-03-v0.81/README.md')], [], ['historical package changed']],
  ['S06 strict at tag: untracked schema file unchanged behaviour', [() => untracked('schemas/extra.schema.json')], [], 'PASS'],
  ['S08 strict at tag: appended gate code rejected by count', [addGate], [], ['29 !== 28']],
  ['T03 post-tag at tag reaches signed-tag check (network disabled)', [], ['--post-tag'], ['network disabled by test harness']],
  ['T04 post-tag at tag: schema edit rejected', [() => append('schemas/README.md')], ['--post-tag'], ['technical baseline changed']],
  ['T06 post-tag at tag: appended gate code rejected by count', [addGate], ['--post-tag'], ['29 !== 28']],
  ['S11 strict at tag: requirement text rewrite rejected', [rewriteRequirementText], [], ['technical baseline changed']],
  ['S12 strict at tag: gate condition rewrite rejected', [rewriteGateCondition], [], ['technical baseline changed']],
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
console.log(`${results.length - failures}/${results.length} validator cases as expected; candidate ${commit}; baseline ${baseline}; head carries frozen-path changes: ${headFrozen}; head counts ${headAllocations} requirements, ${headGates} gates`);
process.exitCode = failures ? 1 : 0;
