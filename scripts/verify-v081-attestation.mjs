import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const requiredChecks = [
  'blocking dependency audit / Node 24',
  'blocking ubuntu-latest / Node 22', 'blocking ubuntu-latest / Node 24',
  'blocking windows-latest / Node 22', 'blocking windows-latest / Node 24',
  'links', 'lint', 'validate', 'checksums',
];

export function verifyAttestation(a, expected) {
  assert.equal(a.schema, 'gkos-publication-attestation/v1');
  assert.equal(a.repository, 'Odenknight/gkos-standard');
  assert.equal(a.tag, 'v0.81');
  assert.equal(a.owner, 'Odenknight');
  assert.equal(a.disposition, 'APPROVE v0.81 PUBLICATION');
  assert.match(a.commit, /^[0-9a-f]{40}$/);
  assert.equal(a.commit, expected.commit, 'approval targets another commit');
  assert.equal(a.publication_date, expected.date, 'approval targets another date');
  assert.equal(a.release_manifest_sha256, expected.manifestHash, 'manifest changed');
  assert.equal(a.release_checksums_sha256, expected.checksumsHash, 'checksums changed');
  assert.match(a.evidence_packet_sha256, /^[0-9a-f]{64}$/);
  assert.ok(typeof a.approved_at === 'string' && /Z$/.test(a.approved_at));
  assert.ok(Number.isFinite(Date.parse(a.approved_at)) && Date.parse(a.approved_at) <= Date.now());
  assert.ok(Array.isArray(a.checks));
  for (const name of requiredChecks) {
    const matches = a.checks.filter(c => c.name === name);
    assert.equal(matches.length, 1, `missing/duplicate approval evidence for ${name}`);
    const c = matches[0];
    assert.equal(c.commit, a.commit, `stale evidence for ${name}`);
    assert.equal(c.conclusion, 'success', `non-passing evidence for ${name}`);
    assert.match(c.url, /^https:\/\/github\.com\/Odenknight\/gkos-standard\/actions\/runs\/[0-9]+(?:\/job\/[0-9]+)?$/);
  }
  return a;
}

export function attestationFromTag(tag) {
  assert.equal(tag.tag, 'v0.81');
  assert.equal(tag.object?.type, 'commit');
  assert.equal(tag.verification?.verified, true, 'tag signature is not verified');
  assert.equal(tag.tagger?.email, '40664141+Odenknight@users.noreply.github.com');
  const matches = [...tag.message.matchAll(/GKOS_RELEASE_ATTESTATION_BEGIN\n([\s\S]*?)\nGKOS_RELEASE_ATTESTATION_END/g)];
  assert.equal(matches.length, 1, 'expected exactly one signed owner attestation');
  return JSON.parse(matches[0][1]);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [tagJsonPath, commit, date, dir] = process.argv.slice(2);
  const tag = JSON.parse(readFileSync(tagJsonPath, 'utf8'));
  assert.equal(tag.object?.sha, commit, 'tag object targets another commit');
  const digest = file => createHash('sha256').update(readFileSync(file)).digest('hex');
  verifyAttestation(attestationFromTag(tag), {
    commit, date,
    manifestHash: digest(`${dir}/RELEASE_MANIFEST.yml`),
    checksumsHash: digest(`${dir}/SHA256SUMS.txt`),
  });
  console.log(`Verified signed owner approval for v0.81 at ${commit}`);
}
