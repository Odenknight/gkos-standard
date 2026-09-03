# v0.81 publication binding

R20 requires an exact tested target, verified artifacts, and a separate owner
publication decision. Preparation was authorized on 2026-09-03. Publication
approval remains a later decision bound to the final commit and evidence.

A commit cannot practically contain its own literal Git SHA. The final
manifest therefore declares `tag-target-binding: signed-owner-attestation`.
The signed annotated tag contains the exact target and owner disposition,
manifest and checksum-inventory hashes, evidence-packet digest, and successful
mandatory checks at that target. The tag object is outside the commit it
identifies. A subsequent external receipt records the tag object's SHA,
post-tag verification, GitHub Release, archive hashes, and DOI when available.

## Publication-ready content and live status

The prepared dated edition, citation, and registry identify the content to be
released. They do not independently assert that publication has occurred.
The manifest's `publication-status-source` identifies the verified signed tag
and GitHub Release as the live-status source. Until both exist following owner
approval, v0.80 remains the published release. A proposed date must be corrected
and the changed candidate rerun if it is no longer the actual publication date.

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
