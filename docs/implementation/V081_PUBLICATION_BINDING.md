# v0.81 publication binding

R20 requires an exact tested target, verified artifacts, and a separate owner
publication decision. Preparation and the separate final publication decision
were authorized on 2026-09-03. The owner approved exact commit
`8f2a158c6d4b8cabd907d98765766d281aec1247` after reviewing the sealed evidence.
The signed tag, post-tag checks, GitHub Release and Zenodo archive are verified
in the [publication receipt](../releases/GKOS_2026-09-03_v0.81_PUBLICATION_RECORD.md).

A commit cannot practically contain its own literal Git SHA. The final
manifest therefore declares `tag-target-binding: signed-owner-attestation`.
The signed annotated tag contains the exact target and owner disposition,
manifest and checksum-inventory hashes, evidence-packet digest, and successful
mandatory checks at that target. The tag object is outside the commit it
identifies. A subsequent external receipt records the tag object's SHA,
post-tag verification, GitHub Release, archive hashes, and DOI when available.

## Publication-ready content and live status

The dated edition, citation, and registry identify the released content.
The manifest's `publication-status-source` identifies the verified signed tag
and GitHub Release as the live-status source. Both now exist following owner
approval, with actual publication at 2026-09-03T05:31:52Z, September 3 in
America/New_York. The dated package preserves its original conditional wording
and hashes; this subsequent receipt records fulfillment of those conditions.

Historical RC package checksums remain mandatory after publication preparation.
Its old unpublished-state checks run only while the active edition is v0.80.
The final v0.81 validator instead checks the dated content and populations.
Earlier published release packages and the original RC package remain intact.

## Signed annotation format

After final approval, the `v0.81` tag message contains exactly one JSON object
between `GKOS_RELEASE_ATTESTATION_BEGIN` and `GKOS_RELEASE_ATTESTATION_END`.
The object uses schema `gkos-publication-attestation/v1` and records:

- repository, tag, exact commit, and publication date;
- owner `Odenknight`, disposition `APPROVE v0.81 PUBLICATION`, and approval time;
- `release_manifest_sha256`, `release_checksums_sha256`, and
  `evidence_packet_sha256`;
- one successful exact-commit entry for every mandatory check, with its name,
  conclusion, commit, and GitHub Actions run URL.

The post-tag workflow verifies GitHub signature status and owner tagger identity,
the resolved commit and membership in main history, the signed attestation,
the package/source digests, and the release validator. The tag does not itself
create a GitHub Release or establish a DOI. The release executor preserves the
actual owner approval and evidence packet; generating JSON is not approval.

Publication is a developmental, non-consensus, non-qualifying pre-standard for
AI governance, accountability, and auditability. Intended benefits do not
establish independently measured effectiveness or a certification program.
