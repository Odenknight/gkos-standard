# 06-archive-receipt — verify the archive, then prepare the DOI receipt change

## Goal

Verify the Zenodo version record created from the GitHub Release (metadata, archive bytes against the tag tree), and only then prepare the follow-up change that records the version DOI: a new publication record pair when the version has none, or a dated archive-verification supplement when a publication record already exists (v0.82.1). Done means `archive-check.json` shows each check with its result, and, if all pass, a receipt branch exists for the owner's merge decision. Until then, no file may cite a version DOI. No existing publication record is renamed, rewritten or regenerated.

## Governing instructions

- `decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md` — G82-12: verify title, creator, version, date, license routing, files and commit before recording the version DOI; never reuse an earlier DOI.
- `docs/releases/V0821_PUBLICATION_CONTROL.md` — controls 7–8: verify the Zenodo record before citing a new version DOI; record the verified archive in a follow-up PR; preserve the immutable tagged package and its original conditional wording.
- `ZENODO.md` — archival policy and version-specific citation guidance.
- `docs/releases/GKOS_2026-09-22_v0.82_PUBLICATION_RECORD.md` — "Archive binding": ZIP digest and Zenodo MD5, ZIP comment equals the approved commit, every tagged file present and byte-identical after removing the archive root.
- `docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.md` — "Archive verification": Zenodo showed v0.82.1 as "Received"; the archive is not yet verified and no v0.82.1 DOI is claimed. This record already exists and is not rewritten.
- `CITATION.cff` — the concept DOI is not a version DOI.
- `conformance/CLAIMS_POLICY.md` — a DOI or archive does not establish conformance or certification.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Owner actions | `<run>/output/<task-id>/<attempt>/owner-actions.json` from `05-owner-actions`, or on late entry the verified prior evidence the packet names | Tag, commit, Release | Digest in its HANDOFF.json, or path and blob SHA-256 at `base_commit` |
| Existing receipt (v0.82.1) | `docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.md` | Full; must stay byte-identical | Blob SHA-256 at packet `base_commit` |
| Existing receipt (v0.82.1) | `docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.json` | Fields; must stay byte-identical | Blob SHA-256 at packet `base_commit` |
| First-receipt precedent | `docs/releases/GKOS_2026-09-22_v0.82_PUBLICATION_RECORD.json` | `zenodo` block layout | Packet `base_commit` |
| Current citation text | `README.md` | "Publication, citation, and licensing" section | Packet `base_commit` |
| Concept record | Zenodo concept DOI 10.5281/zenodo.22269293 | Versions list | Observed time |

## Dependencies

- `05-owner-actions` accepted with the GitHub Release step `VERIFIED`, or, on late entry, verified prior evidence named in the packet that records the tag target and the verified GitHub Release (v0.82.1: the publication record pair at `base_commit`, by blob SHA-256), with `01-gate` through `05-owner-actions` satisfied by that evidence (router, "Skips and late entry").

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`, including the downloaded archive.
- After every archive check passes, one receipt branch (single release worker as integrator):
  - No publication record for the version at `base_commit`: a new pair `docs/releases/GKOS_<date>_v<version>_PUBLICATION_RECORD.md` and `.json` on `docs/v<version>-live-doi-receipt` (precedent #38, #59).
  - A publication record pair already exists (v0.82.1, written by PR #64 with the archive pending): a new dated supplement pair `docs/releases/GKOS_<date>_v<version>_ARCHIVE_VERIFICATION_<yyyy-mm-dd>.md` and `.json`, on a branch such as `docs/v<version>-archive-verification-<yyyymmdd>` (proposed names). `<date>` is the edition date; `<yyyy-mm-dd>` is the verification date in America/New_York.
  - In both cases, the citation lines in `README.md`, `ZENODO.md`, `CITATION.cff` and `CHANGELOG.md`.
- Never: the tagged release package, or the bytes of an existing publication record.

## Procedure

1. Find the new version record from the concept record through the Zenodo REST API or record page; record the URL used and the time. Commands are proposed; confirm the current Zenodo API form before relying on it.
2. Check metadata: title, creator `Marshall, Shaun Allan`, version, publication date, license `cc-by-4.0`, related identifier `isNewVersionOf` the previous version DOI, concept DOI 10.5281/zenodo.22269293.
3. Download the archived ZIP into `output_ref`; compute SHA-256 and MD5; compare MD5 with Zenodo's listed checksum.
4. Check the ZIP comment equals the tag's target commit (`unzip -z <zip>`).
5. Compare contents with the tag tree: list `git ls-tree -r --name-only v<version>`; for each path compare `git cat-file blob v<version>:<path> | sha256sum` with the extracted file after removing the archive root folder. Report missing, extra and differing files; all three lists must be empty.
6. If any check fails or the record is not yet public, stop and report; do not cite a DOI anywhere.
7. If all pass, choose the receipt form: `git cat-file -e <base_commit>:docs/releases/GKOS_<date>_v<version>_PUBLICATION_RECORD.md`.
   - Exit non-zero (no record yet): create the publication record pair, modeled on the v0.82 pair.
   - Exit 0 (a record exists, as for v0.82.1): create the supplement pair named under "Allowed writes". It states the archive results, names the existing receipt pair by path and blob SHA-256 (`git cat-file blob <base_commit>:<path> | sha256sum`), links to it, and supersedes only that receipt's archive status. Confirm the new filenames are unused (`git cat-file -e <base_commit>:<new-path>` exits non-zero).
   - Precedent search at b308ff7: `docs/releases/` has no separately named supplement. Two owner-merged changes amended existing release records instead: PR #60 replaced one sentence of the v0.82 publication record and added a JSON field for a post-tag rerun, and PR #64 appended a "Completion receipt" section to `GKOS_2026-09-24_v0.82.1_PREPARATION.md`. This contract keeps existing receipts byte-identical. Whether the existing receipt should also gain a one-line pointer to the supplement is an owner decision; list it in the handoff and do not make the change unasked.
8. Update the citation lines, add a `CHANGELOG.md` line under `## Unreleased`, and commit with `git commit -s`. Run the `edit/04-check` command set on the receipt commit.
9. Write `archive-check.json`, then `HANDOFF.json` last. Pushing and opening the PR need the packet and an owner instruction.

## Verification

Objective:

- `archive-check.json` lists metadata fields with expected and observed values, ZIP SHA-256 and MD5, ZIP comment, and the three file-comparison lists.
- Each new record path did not exist at `base_commit`.
- Each existing publication record is unchanged: `git diff --exit-code <base_commit> -- docs/releases/GKOS_<date>_v<version>_PUBLICATION_RECORD.md docs/releases/GKOS_<date>_v<version>_PUBLICATION_RECORD.json` exits 0 when the supplement form is used.
- The receipt branch's `04-check` results are attached.

Interpretation:

- Does the receipt or supplement claim anything beyond archival of the tagged bytes?
- Can a reader reach the supplement from the current citation text and the existing receipt from the supplement?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Archive check | `<run>/output/<task-id>/<attempt>/archive-check.json` | Per-check expected, observed, result |
| Receipt candidate | Receipt branch from "Allowed writes" | Commit and tree in the handoff; form `publication-record` or `archive-verification-supplement` |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template; owner decisions listed, including any pointer from the existing receipt |

## Failure behavior

- Record not found or still processing (v0.82.1 was "Received" at receipt time) → `BLOCKED`; record what was observed and when; retry is a new attempt.
- Metadata mismatch → report to the owner; Zenodo corrections are owner actions.
- File comparison differs → `FAIL`; no DOI is cited; report the exact paths.
- An intended new record path already exists → stop; never overwrite; use the supplement form or report the collision.
