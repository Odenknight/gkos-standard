# GKOS v0.82 release candidate 1

This directory is the staging package for **GKOS v0.82-rc1**, an informative
edition proposed under R24.

It is separate from the immutable dated `releases/` directories. The dated
v0.82 directory does not exist yet: R24 assigns the actual publication date
only after the final exact-bound evidence is presented and the owner
explicitly approves publication.

## Binding

- Version: `0.82`
- Candidate: `rc1`
- Release class: informative edition; normative population unchanged
- Published release remains: `GKOS-2026-09-03 v0.81`
- GKX: `2.0`
- Canonical artifact profile: `GKX-CBOR-1`
- Final candidate commit: bound by the Git commit that executes this package
  and preserved in CI and results evidence; it is not self-referenced inside a
  file that would change that commit hash.
- Profile qualification: none
- Public second implementation: awaiting
- Controlling decision: R24 (proposed; acceptance pending)
- Tag: not created
- Publication: not authorized

## Package contents

- `RELEASE_MANIFEST.yml` — machine-readable candidate standing and coordinates.
- `RELEASE_NOTES.md` — bounded change and claim summary.
- `EVIDENCE_INDEX.md` — evidence required for the frozen candidate.
- `PUBLICATION_CHECKLIST.md` — post-evidence finalization path.
- `SHA256SUMS.txt` — digests for the package files other than the checksum
  file itself.

The repository validator is `scripts/check-v082-release-candidate.sh`.
