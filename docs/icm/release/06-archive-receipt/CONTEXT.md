# 06-archive-receipt — verify the archive, then prepare the DOI receipt change

## Goal

Verify the Zenodo version record created from the owner's GitHub Release (metadata, archive bytes against the tag tree), and only then prepare the follow-up change that records the version DOI and publication receipt. Done means `archive-check.json` shows each check with its result, and, if all pass, a receipt branch exists for the owner's merge decision. Until then, no file may cite a version DOI.

## Governing instructions

- `decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md` — G82-12: verify title, creator, version, date, license routing, files and commit before recording the version DOI; never reuse an earlier DOI.
- `ZENODO.md` — archival policy and version-specific citation guidance.
- `docs/releases/GKOS_2026-09-22_v0.82_PUBLICATION_RECORD.md` — "Archive binding": ZIP digest and Zenodo MD5, ZIP comment equals the approved commit, every tagged file present and byte-identical after removing the archive root.
- `CITATION.cff` — the concept DOI is not a version DOI.
- `conformance/CLAIMS_POLICY.md` — a DOI or archive does not establish conformance or certification.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Owner actions | `<run>/output/<task-id>/<attempt>/owner-actions.json` from `05-owner-actions` | Tag, commit, Release | Digest in its HANDOFF.json |
| Receipt precedent | `docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.md` | Layout | Packet `base_commit` |
| Receipt precedent | `docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.json` | Fields | Packet `base_commit` |
| Current citation text | `README.md` | "Publication, citation, and licensing" section | Packet `base_commit` |
| Concept record | Zenodo concept DOI 10.5281/zenodo.22269293 | Versions list | Observed time |

## Dependencies

- `05-owner-actions` accepted with the GitHub Release step `VERIFIED`.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`, including the downloaded archive.
- After every archive check passes: branch `docs/v<version>-live-doi-receipt` (precedent #38, #59) with a new publication record pair under `docs/releases/` and the citation lines in `README.md`, `ZENODO.md`, `CITATION.cff` and `CHANGELOG.md` (single release worker as integrator). Never edit the tagged release package.

## Procedure

1. Find the new version record from the concept record through the Zenodo REST API or record page; record the URL used and the time. Commands are proposed; confirm the current Zenodo API form before relying on it.
2. Check metadata: title, creator `Marshall, Shaun Allan`, version, publication date, license `cc-by-4.0`, related identifier `isNewVersionOf` the previous version DOI, concept DOI 10.5281/zenodo.22269293.
3. Download the archived ZIP into `output_ref`; compute SHA-256 and MD5; compare MD5 with Zenodo's listed checksum.
4. Check the ZIP comment equals the tag's target commit (`unzip -z <zip>`).
5. Compare contents with the tag tree: list `git ls-tree -r --name-only v<version>`; for each path compare `git cat-file blob v<version>:<path> | sha256sum` with the extracted file after removing the archive root folder. Report missing, extra and differing files; all three lists must be empty.
6. If any check fails or the record is not yet public, stop and report; do not cite a DOI anywhere.
7. If all pass, prepare the receipt on the branch with `git commit -s`: new `docs/releases/GKOS_<date>_v<version>_PUBLICATION_RECORD.md` and `.json`, updated citation lines, and a `CHANGELOG.md` line under `## Unreleased`. Run the `edit/04-check` command set on it.
8. Write `archive-check.json`, then `HANDOFF.json` last. Pushing and opening the PR need the packet and an owner instruction.

## Verification

Objective:

- `archive-check.json` lists metadata fields with expected and observed values, ZIP SHA-256 and MD5, ZIP comment, and the three file-comparison lists.
- The receipt branch's `04-check` results are attached.

Interpretation:

- Does the receipt claim anything beyond archival of the tagged bytes?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Archive check | `<run>/output/<task-id>/<attempt>/archive-check.json` | Per-check expected, observed, result |
| Receipt candidate | Branch `docs/v<version>-live-doi-receipt` | Commit and tree in the handoff |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- Record not found or still processing (v0.82.1 was "Received" at receipt time) → `BLOCKED`; record what was observed and when; retry is a new attempt.
- Metadata mismatch → report to the owner; Zenodo corrections are owner actions.
- File comparison differs → `FAIL`; no DOI is cited; report the exact paths.
