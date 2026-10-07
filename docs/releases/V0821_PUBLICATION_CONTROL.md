# v0.82.1 publication control and owner authorization

## Scope and disposition

The owner instructed the release executor to complete public v0.82.1, authorizing
release preparation, commits, pushes, pull requests, merges after required
checks, locally signed tag creation and public GitHub publication. The owner
subsequently explicitly authorized a narrowly scoped tag-creation ruleset change
for v0.82.1 while preserving update/deletion protections. Authorization was
observed in this execution session on 2026-09-25 UTC; this is an observation date,
not an invented original-message timestamp or an exact-SHA approval.

This is a documentation patch: publication status, existing claims controls and
release administration only. It changes no technical requirements, schemas,
runner behavior, qualification or GKX 2.0. Preserve all 62 permanent allocations,
28 gate codes, titles, identifiers, historical packages and signatures. R23
remains prospective. Claims do not automatically carry forward.

The authorization is prospective and conditioned on successful validation. The
executor binds it to the final tested commit in the signed tag annotation and
external publication receipt. This is owner-authorized AI-assisted editorial
self-review, not independent review, consensus ratification, or a new owner
attestation made after the SHA exists. R24's separate `APPROVE v0.82 PUBLICATION`
ceremony governed v0.82; it is not fabricated or reused as approval of v0.82.1.
This record applies the R24 publication controls to this patch, with the owner's
current explicit publication authorization supplying its disposition.

## Date and coordinates

September 24, 2026 was the requested edition date. R24's actual-publication-date
rule controls publication coordinates. Use America/New_York, the zone recorded
for the preceding v0.82 publication, consistently. Preparation after midnight
UTC on September 25 still occurs on September 24 in that zone. Thus the prepared
coordinate is GKOS-2026-09-24 v0.82.1, conditional on actual publication on that
local date. If publication crosses local midnight, update all current edition
coordinates and inventories and rerun candidate checks before tagging. Never
backdate commits, approvals, signatures, tags, releases or archive metadata.
Record GitHub's exact UTC `published_at`, the local date and timezone afterward.

## Required release controls

1. Assemble package, notes, manifest, source and package checksums. Keep prepared
   status until publication is verified. Citation date is conditional metadata.
2. Use a normal PR; pass `lint`, `links`, `validate`, `checksums`,
   `blocking dependency audit / Node 24`, and all four blocking Ubuntu/Windows
   Node 22/24 lanes. Run strict mutation coverage and the patch release validator.
3. Merge only after required PR checks pass. Rerun all mandatory push checks on
   the exact main commit to be tagged. Do not substitute an earlier commit's CI.
4. Create a signed annotated v0.82.1 tag with the configured owner signing key.
   Include exact commit, this authorization basis, package hashes and successful
   check names/URLs/commit in the annotation. Preserve the signature and history.
5. Verify local signature, expected owner key, exact target, GitHub verified
   signature and tagger, main ancestry and the dedicated post-tag workflow.
6. Publish the public GitHub Release as developmental, non-consensus and
   non-qualifying. Public visibility is not standards maturity. Attach release
   package assets and verify their downloaded checksums.
7. Verify the configured Zenodo release webhook's resulting record, version,
   title, creator, date, license routing, archive bytes and exact commit before
   citing a new version DOI. Never reuse the v0.82 DOI for this patch.
8. Record the verified publication and archive in a follow-up PR. Preserve the
   immutable tagged package and its original conditional wording.

Keep update/deletion prohibitions active for v0.82.1 before granting a temporary
owner-only creation route; restore the general creation prohibition immediately
after the signed tag is pushed. No existing tag may be moved or deleted.

## Historical technical coordinates and limitations

Machine-readable requirement and fixture companions retain their unchanged
v0.82 (or earlier) technical-baseline coordinates. These are explicit historical
pins, not v0.82.1 qualification claims or superseded candidate coordinates. See
[V082 coordinate inventory](V082_COORDINATE_CONSOLIDATION.md); its entries remain
unchanged, including the v0.82 profile map and Track-A catalog. All schemas,
fixtures, requirements, runner code and normative annexes must match v0.82.

No separately operated replication or independent assessment is asserted.
Existing fixture coverage does not qualify any profile. The current owner has
a material project interest; owner publication is disclosed as developmental.
Before tagging, rollback is a PR revert. After tagging, corrections use a later
record or release; historical release artifacts remain immutable.
