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
const allocations = read('requirements/REGISTRY.md').split('## Active allocations')[1].split('## Accepted unpublished allocations')[0].match(/^\| `GKOS-[A-Z]+-[0-9]{3}` /gm) ?? [];
assert.equal(allocations.length, 62);
assert.equal((read('standard/annexes/Diagnostic_Code_Registry.md').match(/^\| GKOS-GATE-L[0-9]-[0-9]{3} \|/gm) ?? []).length, 28);
// All technical sources are byte-identical to the predecessor; documentation
// claims and release administration are deliberately outside this set.
const immutable = ['requirements', 'schemas', 'fixtures', 'conformance/runner', 'standard/annexes'];
assert.equal(git('diff', '--name-only', 'v0.82', '--', ...immutable), '', 'technical baseline changed');
const historical = git('diff', '--name-only', 'v0.82', '--', 'releases', 'release-candidates').split('\n').filter(p => p && !p.startsWith(`${dir}/`));
assert.deepEqual(historical, [], 'historical package changed');
for (const p of git('ls-files', 'fixtures').split('\n').filter(p => p.endsWith('manifest.json'))) {
  const catalog = JSON.parse(read(p));
  if ('qualifying_profiles' in catalog) assert.deepEqual(catalog.qualifying_profiles, [], `${p}: profile qualification`);
}
assert.match(read('docs/releases/V0821_PUBLICATION_CONTROL.md'), /R23\s+remains prospective/);
assert.ok(read('conformance/CLAIMS_POLICY.md').includes('does not automatically'));
console.log(`v0.82.1 content PASS: ${coordinate}; 62 requirements, 28 gates, unchanged technical sources and historical packages`);

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
