import test from 'node:test';
import assert from 'node:assert/strict';
import { requiredChecks, verifyAttestation, attestationFromTag } from '../../../scripts/verify-v081-attestation.mjs';

const expected = { commit: 'a'.repeat(40), date: '2026-09-03', manifestHash: 'b'.repeat(64), checksumsHash: 'c'.repeat(64) };
const valid = () => ({
  schema: 'gkos-publication-attestation/v1', repository: 'Odenknight/gkos-standard',
  tag: 'v0.81', owner: 'Odenknight', disposition: 'APPROVE v0.81 PUBLICATION',
  commit: expected.commit, publication_date: expected.date,
  release_manifest_sha256: expected.manifestHash, release_checksums_sha256: expected.checksumsHash,
  evidence_packet_sha256: 'd'.repeat(64), approved_at: '2026-09-03T00:00:00Z',
  checks: requiredChecks.map(name => ({ name, commit: expected.commit, conclusion: 'success', url: 'https://github.com/Odenknight/gkos-standard/actions/runs/123' })),
});
test('release approval binds all mandatory evidence and package hashes', () => {
  assert.equal(verifyAttestation(valid(), expected).commit, expected.commit);
  for (const mutate of [
    a => { a.commit = 'e'.repeat(40); },
    a => { a.publication_date = '2026-09-04'; },
    a => { a.release_manifest_sha256 = 'e'.repeat(64); },
    a => { a.release_checksums_sha256 = 'e'.repeat(64); },
    a => { a.disposition = 'PREPARE'; },
    a => { a.owner = 'another-account'; },
    a => { a.checks.pop(); },
    a => { a.checks.push(a.checks[0]); },
    a => { a.checks[0].commit = 'e'.repeat(40); },
    a => { a.checks[0].conclusion = 'skipped'; },
    a => { a.checks[0].url = 'https://example.com'; },
  ]) {
    const a = valid(); mutate(a);
    assert.throws(() => verifyAttestation(a, expected));
  }
});
test('release tag requires verified owner identity and one signed attestation', () => {
  const a = valid();
  const tag = { tag: 'v0.81', object: { type: 'commit' }, verification: { verified: true },
    tagger: { email: '40664141+Odenknight@users.noreply.github.com' },
    message: `GKOS_RELEASE_ATTESTATION_BEGIN\n${JSON.stringify(a)}\nGKOS_RELEASE_ATTESTATION_END` };
  assert.deepEqual(attestationFromTag(tag), a);
  assert.throws(() => attestationFromTag({ ...tag, verification: { verified: false } }));
  assert.throws(() => attestationFromTag({ ...tag, tagger: { email: 'other@example.com' } }));
  assert.throws(() => attestationFromTag({ ...tag, message: tag.message + '\n' + tag.message }));
});
