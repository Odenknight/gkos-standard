// Patch-specific publication checks; no runner or technical semantics change.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
const read = p => readFileSync(p, 'utf8');
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();
const citation = read('CITATION.cff');
const date = /^date-released: "(\d{4}-\d{2}-\d{2})"$/m.exec(citation)?.[1];
assert.ok(date, 'citation date required');
assert.match(citation, /^version: "0\.82\.1"$/m);
const dir = `releases/${date}-v0.82.1`;
const coordinate = `GKOS-${date} v0.82.1`;
for (const p of ['README.md', 'CHANGELOG.md', 'standard/00_GKOS_Master_Standard.md', `${dir}/README.md`, `${dir}/RELEASE_NOTES.md`]) {
  assert.ok(read(p).includes(coordinate), `${p}: coordinate mismatch`);
}
const manifest = read(`${dir}/RELEASE_MANIFEST.yml`);
for (const field of [
  'version: "0.82.1"', `date: "${date}"`, 'tag: v0.82.1',
  'release-class: documentation-patch', 'profile-qualification: none',
  'qualifying-profiles: []', 'consensus-ratified: false',
  'independently-certified: false', 'machine-exchange-contract: GKX-2.0',
  'permanent-requirement-count: 62', 'diagnostic-gate-code-count: 28',
  'new-allocation-count: 0', 'claims-carry-forward: false',
  'publication-timezone: America/New_York',
  'release-authorization: owner-session-authorization-bound-to-tested-commit',
]) assert.ok(manifest.split('\n').includes(field), `missing manifest field: ${field}`);
const zenodo = JSON.parse(read('.zenodo.json'));
assert.equal(zenodo.version, '0.82.1');
assert.equal(zenodo.publication_date, date);
assert.equal(zenodo.creators[0].name, 'Marshall, Shaun Allan');
assert.equal(zenodo.license, 'cc-by-4.0');
assert.ok(zenodo.related_identifiers.some(x => x.identifier === '10.5281/zenodo.22905582' && x.relation === 'isNewVersionOf'));
const registryPath = 'requirements/REGISTRY.md';
const gatePath = 'standard/annexes/Diagnostic_Code_Registry.md';
const allocationsIn = text => text.split('## Active allocations')[1].split('## Accepted unpublished allocations')[0].match(/^\| `GKOS-[A-Z]+-[0-9]{3}` /gm) ?? [];
const gatesIn = text => text.match(/^\| GKOS-GATE-L[0-9]-[0-9]{3} \|/gm) ?? [];
// R25 opens the v0.83 development line only when its tracked record holds
// the owner-set marker line 'Status: Accepted' and no 'Status: Proposed'.
// Strict and post-tag runs never read it.
const r25 = 'decisions/R25_V083_Development_Line_Development_Decision_Record.md';
let developmentLine = false;
if (process.argv.includes('--development') && git('ls-files', '--', r25)) {
  const lines = read(r25).split(/\r?\n/);
  developmentLine = lines.includes('Status: Accepted') && !lines.includes('Status: Proposed');
}
if (!developmentLine) {
  // Strict, post-tag and proposed-state development runs assert the edition
  // counts in the checkout itself, exactly as before R26.
  assert.equal(allocationsIn(read(registryPath)).length, 62);
  assert.equal(gatesIn(read(gatePath)).length, 28);
}
// All technical sources are byte-identical to the predecessor; documentation
// claims and release administration are deliberately outside this set.
const immutable = ['requirements', 'schemas', 'fixtures', 'conformance/runner', 'standard/annexes'];
let developmentCounts = '';
if (process.argv.includes('--development')) {
  // The published v0.82.1 tag stays frozen at v0.82. Until R25 is accepted,
  // main permits only the reviewed fast-uri security pin. After acceptance,
  // main's technical sources may change for the next edition; published
  // packages may not.
  assert.ok(!process.argv.includes('--post-tag'), 'development is not publication validation');
  const published = git('rev-parse', '--verify', 'refs/tags/v0.82.1^{}');
  assert.equal(git('diff', '--name-only', 'v0.82', published, '--', ...immutable), '', 'published technical baseline changed');
  // Untracked, non-ignored files are invisible to git diff (REV-012).
  const untracked = git('ls-files', '--others', '--exclude-standard', '--', ...immutable, 'releases', 'release-candidates');
  assert.equal(untracked, '', 'untracked file in protected path');
  if (developmentLine) {
    // On the open v0.83 line the edition counts are asserted against the
    // published v0.82.1 tag, while main may grow. The registries are
    // append-only, so every published allocation and gate code must remain.
    const publishedAllocations = allocationsIn(git('show', `${published}:${registryPath}`));
    const publishedGates = gatesIn(git('show', `${published}:${gatePath}`));
    assert.equal(publishedAllocations.length, 62);
    assert.equal(publishedGates.length, 28);
    // Identifiers are unique (r26-REV-002). The comparisons below key rows by
    // identifier, so a duplicate row could mask a rewritten original; reject
    // duplicates first, on the tag and on main.
    const duplicates = rows => [...new Set(rows.filter((row, i) => rows.indexOf(row) !== i))];
    assert.deepEqual(duplicates(publishedAllocations), [], 'duplicate requirement ID in published registry');
    assert.deepEqual(duplicates(publishedGates), [], 'duplicate gate code in published registry');
    assert.deepEqual(duplicates(allocationsIn(read(registryPath))), [], 'duplicate requirement ID on main');
    assert.deepEqual(duplicates(gatesIn(read(gatePath))), [], 'duplicate gate code on main');
    const mainAllocations = new Set(allocationsIn(read(registryPath)));
    const mainGates = new Set(gatesIn(read(gatePath)));
    const lost = [...publishedAllocations.filter(row => !mainAllocations.has(row)), ...publishedGates.filter(row => !mainGates.has(row))];
    assert.deepEqual(lost, [], 'published allocation or gate code missing on main');
    // Append-only covers content, not only identifiers (r26-REV-002). Each published
    // allocation keeps its original requirement text; status, source and replacement
    // cells may gain dated updates. Each published gate row keeps its exact definition.
    const cells = row => row.split(/(?<!\\)\|/).slice(1, -1).map(cell => cell.trim());
    const originalTexts = text => new Map(text.split('## Active allocations')[1].split('## Accepted unpublished allocations')[0]
      .split('\n').filter(line => /^\| `GKOS-[A-Z]+-[0-9]{3}` \|/.test(line)).map(line => [cells(line)[0], cells(line)[1]]));
    const gateRows = text => new Map(text.split('\n').filter(line => /^\| GKOS-GATE-L[0-9]-[0-9]{3} \|/.test(line)).map(line => [cells(line)[0], cells(line).join(' | ')]));
    const mainTexts = originalTexts(read(registryPath));
    const rewritten = [...originalTexts(git('show', `${published}:${registryPath}`))].filter(([id, text]) => mainTexts.get(id) !== text).map(([id]) => id);
    assert.deepEqual(rewritten, [], 'published requirement text changed on main');
    const mainGateRows = gateRows(read(gatePath));
    const redefined = [...gateRows(git('show', `${published}:${gatePath}`))].filter(([code, row]) => mainGateRows.get(code) !== row).map(([code]) => code);
    assert.deepEqual(redefined, [], 'published gate definition changed on main');
    developmentCounts = `; main ${mainAllocations.size} requirements, ${mainGates.size} gates`;
  } else {
    const lockPath = 'conformance/runner/package-lock.json';
    const changed = git('diff', '--name-only', published, '--', ...immutable).split('\n').filter(Boolean);
    assert.ok(changed.every(p => p === lockPath), 'unreviewed development technical change');
    const expected = JSON.parse(git('show', `${published}:${lockPath}`));
    assert.equal(expected.packages['node_modules/fast-uri'].version, '3.1.6');
    Object.assign(expected.packages['node_modules/fast-uri'], {
      version: '3.1.8',
      resolved: 'https://registry.npmjs.org/fast-uri/-/fast-uri-3.1.8.tgz',
      integrity: 'sha512-GZMtZUTNRpOVIECoXwLNZS5xUGE+mVNbTB8h/7Rwh2TFWcBQiPzTgyZi05BF9UMZKkLJv8XBRJTlU7zg8+ZfMg==',
    });
    assert.deepEqual(JSON.parse(read(lockPath)), expected, 'unreviewed dependency change');
  }
  assert.equal(git('diff', '--name-only', published, '--', 'releases', 'release-candidates'), '', 'published package changed');
} else {
  assert.equal(git('diff', '--name-only', 'v0.82', '--', ...immutable), '', 'technical baseline changed');
}
const historical = git('diff', '--name-only', 'v0.82', '--', 'releases', 'release-candidates').split('\n').filter(p => p && !p.startsWith(`${dir}/`));
assert.deepEqual(historical, [], 'historical package changed');
for (const p of git('ls-files', 'fixtures').split('\n').filter(p => p.endsWith('manifest.json'))) {
  const catalog = JSON.parse(read(p));
  if ('qualifying_profiles' in catalog) assert.deepEqual(catalog.qualifying_profiles, [], `${p}: profile qualification`);
}
assert.match(read('docs/releases/V0821_PUBLICATION_CONTROL.md'), /R23\s+remains prospective/);
assert.ok(read('conformance/CLAIMS_POLICY.md').includes('does not automatically'));
console.log(`v0.82.1 content PASS: ${coordinate}; ${developmentLine ? 'v0.82.1 tag ' : ''}62 requirements, 28 gates${developmentCounts}, ${process.argv.includes('--development') ? (developmentLine ? 'published baseline preserved; R25 v0.83 development line open' : 'published baseline preserved; bounded development dependency maintenance') : 'unchanged technical sources'} and historical packages`);

if (process.argv.includes('--post-tag')) {
  const repo = 'Odenknight/gkos-standard';
  const api = async p => {
    const headers = { accept: 'application/vnd.github+json' };
    if (process.env.GH_TOKEN) headers.authorization = `Bearer ${process.env.GH_TOKEN}`;
    const response = await fetch(`https://api.github.com/repos/${repo}/${p}`, { headers });
    assert.ok(response.ok, `${p}: HTTP ${response.status}`);
    return response.json();
  };
  const ref = await api('git/ref/tags/v0.82.1');
  assert.equal(ref.object.type, 'tag');
  const tag = await api(`git/tags/${ref.object.sha}`);
  assert.equal(tag.verification?.verified, true, 'GitHub signature unverified');
  assert.equal(tag.object.type, 'commit');
  assert.equal(tag.tagger.email, '40664141+Odenknight@users.noreply.github.com');
  const commit = git('rev-parse', 'HEAD');
  assert.equal(tag.object.sha, commit);
  assert.equal(git('rev-list', '-n1', 'v0.82.1'), commit);
  git('merge-base', '--is-ancestor', commit, 'origin/main');
  const annotation = git('for-each-ref', '--format=%(contents)', 'refs/tags/v0.82.1');
  const payload = /GKOS_RELEASE_ATTESTATION_BEGIN\s*([\s\S]+?)\s*GKOS_RELEASE_ATTESTATION_END/.exec(annotation);
  assert.ok(payload, 'signed attestation missing');
  const a = JSON.parse(payload[1]);
  assert.equal(a.schema, 'gkos-publication-attestation/v0821');
  assert.equal(a.repository, repo); assert.equal(a.tag, 'v0.82.1');
  assert.equal(a.commit, commit); assert.equal(a.coordinate, coordinate);
  assert.equal(a.authorization.owner, 'Odenknight');
  assert.equal(a.authorization.basis, 'owner-session-publication-authorization');
  assert.equal(a.authorization.separate_exact_sha_approval, false);
  assert.equal(a.signing_key_fingerprint, 'SHA256:dwwxvq69ZWPDlS6bzlvZ0uXo76ZKTRqvMSmDGhABhfM');
  for (const name of ['RELEASE_MANIFEST.yml', 'SHA256SUMS.txt', 'SOURCE_SHA256SUMS.txt']) {
    assert.equal(a.package_hashes[name], createHash('sha256').update(readFileSync(`${dir}/${name}`)).digest('hex'));
  }
  const checks = (await api(`commits/${commit}/check-runs?per_page=100`)).check_runs;
  for (const name of ['lint', 'links', 'validate', 'checksums', 'blocking dependency audit / Node 24', 'blocking ubuntu-latest / Node 22', 'blocking ubuntu-latest / Node 24', 'blocking windows-latest / Node 22', 'blocking windows-latest / Node 24']) {
    const evidence = a.checks.find(c => c.name === name);
    assert.ok(evidence, `missing signed check: ${name}`);
    assert.equal(evidence.commit, commit); assert.equal(evidence.conclusion, 'success');
    assert.ok(checks.some(c => c.name === name && c.conclusion === 'success' && c.html_url === evidence.url && c.head_sha === commit), `unverified signed CI evidence: ${name}`);
  }
  console.log(`Signed tag, owner, exact target, package hashes and all nine checks PASS: ${commit}`);
}
