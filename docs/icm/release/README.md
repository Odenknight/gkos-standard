# Workflow: release

Status: **proposed** (Fable-FAC, 2026-10-07). Grants no authority.

Use this workflow to prepare a GKOS edition for the Founder and Initial Editor's publication decision and to verify what happened after each owner action. Every merge, approval, ruleset change, tag, GitHub Release, Zenodo deposit and publication statement in this workflow is an **owner action**. Agents prepare packages and evidence before those actions and verify results after them. Agents never perform them under this workflow. If the owner separately authorizes an executor for a specific action (as recorded for v0.82.1 in `docs/releases/V0821_PUBLICATION_CONTROL.md`), that is a new owner instruction recorded in its own control record; this workflow neither creates nor extends it.

## Stages

| Stage | Job | Who acts | Main output |
| --- | --- | --- | --- |
| `01-gate` | Confirm an accepted release-gate decision or owner control record for this edition | Agent verifies; owner decides | `gate.md` |
| `02-candidate` | Assemble and freeze one release-candidate package and its validator | Agent prepares on a `release/` branch | Frozen candidate commit, RC package |
| `03-package` | Prepare the dated release package and citation bump in one PR branch | Agent prepares | Package commit, checksums |
| `04-verify` | Rerun every required check on the exact candidate; build the owner evidence table | Agent verifies | `evidence.md` |
| `05-owner-actions` | Verify each owner action in order: merge, exact-SHA approval, ruleset change, signed tag, post-tag checks, GitHub Release | Owner acts; agent verifies | `owner-actions.json` |
| `06-archive-receipt` | Verify the Zenodo record and archive bytes; prepare the DOI receipt change | Agent verifies and prepares; owner merges | Receipt branch |

`02-candidate` may be `NOT_APPLICABLE` when the controlling gate record does not require a separate candidate package (v0.82.1 used its publication PR head as the candidate and has no `release-candidates/` folder).

## Precedents in this repository

| Edition | Gate | Candidate and package PRs | Receipt |
| --- | --- | --- | --- |
| v0.81 (2026-09-03) | R20 | #34 `release/v0.81-rc1`, #36 `release/v0.81-publication-20260903`, #37 | #38 `docs/v081-live-doi-receipt` |
| v0.82 (2026-09-22) | R24 | #58 `release/v0.82-rc1` | #59 `docs/v082-live-doi-receipt`, #60 |
| v0.82.1 (2026-09-24) | Owner clarification plus `V0821_PUBLICATION_CONTROL.md` | #61 `work/v0821-specification-claims`, #62 `release/v0.82.1-publication` | #64 `docs/v0821-publication-receipt` |

## Release hazards to read before starting

- Only one release run at a time. CI Linux jobs for same-repository branches run on one self-hosted runner; superseded runs queue behind each other.
- Release validators key on the version in `CITATION.cff`. Adding a new candidate folder or changing technical sources while it says 0.82.1 fails `validate` until the validator routing in `scripts/check-current-release.sh` is updated in the same PR.
- Checksums are over LF Git blobs. On Windows, never write packaged files with PowerShell `Set-Content`; generate inventories with `scripts/release-source-checksums.mjs`, which hashes blob content.
- Use the actual publication date in America/New_York. Never backdate commits, approvals, tags, releases or archive metadata.
- No pre-approval commit may say the edition is published.

## Current pending item at the base commit

`README.md` states that the v0.82.1 archive and version DOI are not yet verified. That is a `06-archive-receipt` task.
