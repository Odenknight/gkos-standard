# GKOS v0.81 release candidate 1

This directory is the staging package for **GKOS v0.81-rc1**.

It is deliberately separate from the immutable dated `releases/` directories.
The final dated v0.81 publication directory does not exist yet because R20
requires the actual publication date to be assigned only after the final
exact-bound evidence is presented and the owner explicitly approves
publication.

## Binding

- Version: `0.81`
- Candidate: `rc1`
- Published release remains: `GKOS-2026-08-20 v0.80`
- GKX: `2.0`
- Canonical artifact profile: `GKX-CBOR-1`
- Candidate source baseline: `c9a37d7016efb67e79e454d05f8ba6a7561dd270`
- Final candidate commit: bound by the Git commit that executes this package
  and preserved in CI/results evidence; it is intentionally not self-referenced
  inside a file that would change that commit hash.
- Profile qualification: none
- Public second implementation: awaiting
- Tag: not created
- Publication: not authorized

## Package contents

- `RELEASE_MANIFEST.yml` — machine-readable candidate standing and coordinates.
- `RELEASE_NOTES.md` — bounded change and claim summary.
- `EVIDENCE_INDEX.md` — evidence requirements for the frozen candidate.
- `PUBLICATION_CHECKLIST.md` — post-evidence finalization path.
- `SHA256SUMS.txt` — digests for the candidate package files other than the
  checksum file itself.

The repository validator is `scripts/check-v081-release-candidate.sh`.
