# 03-package — prepare the dated release package and citation bump

## Goal

On one branch, prepare everything the owner's publication decision needs in a single PR: the dated `releases/<date>-v<version>/` package, `CITATION.cff` and `.zenodo.json` bumps, the README and master Standard coordinates, the `CHANGELOG.md` heading, release validators and a post-tag verification workflow. Done means the package commit exists, `node scripts/release-source-checksums.mjs --check releases/<date>-v<version>` passes on it, and nothing in it says the edition is published.

## Governing instructions

- `decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md` — G82-03 actual publication date; G82-09 package completeness; G82-10 repository release controls.
- `docs/releases/V0821_PUBLICATION_CONTROL.md` — America/New_York date convention; if publication crosses local midnight, update every coordinate and inventory and rerun checks; never backdate.
- `scripts/check-current-release.sh` — the exact strings and files the published-release validator requires.
- `scripts/release-source-checksums.mjs` — source inventory over Git index blobs; package checksums over the package files; accepts only `releases/YYYY-MM-DD-v0.NN` or `v0.NN.N`.
- `ZENODO.md` — archival and citation policy; never reuse a previous version DOI.
- `CONTRIBUTING.md` — DCO sign-off.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Gate | `<run>/output/<task-id>/<attempt>/gate.md` | Full | Digest in its HANDOFF.json |
| Candidate | `<run>/output/<task-id>/<attempt>/candidate.json` from `02-candidate`, or its `NOT_APPLICABLE` handoff | Full | Digest in its HANDOFF.json |
| Package precedent | `releases/2026-09-24-v0.82.1/` | All files | Packet `base_commit` |
| Verifier precedent | `scripts/verify-v0821-release.mjs` | Content and `--post-tag` checks | Packet `base_commit` |
| Post-tag precedent | `.github/workflows/v0821-post-tag-verification.yml` | Full | Packet `base_commit` |
| Citation | `CITATION.cff` | Full | Packet `base_commit` |
| Archive metadata | `.zenodo.json` | Full | Packet `base_commit` |

## Dependencies

- `02-candidate` accepted (or accepted as `NOT_APPLICABLE`).
- An owner scope disposition naming the edition (recorded in `gate.md`). This is not publication approval.

## Allowed writes

- Branch `release/v<version>-publication` from the accepted candidate or `base_commit`.
- New folder `releases/<date>-v<version>/`; new `scripts/check-v<version>-release.sh`, `scripts/verify-v<version>-release.mjs` and `.github/workflows/v<version>-post-tag-verification.yml` (version without dots in file names, as in `v0821`).
- Shared files (single release worker is integrator): `CITATION.cff`, `.zenodo.json`, `README.md` coordinate lines, `standard/00_GKOS_Master_Standard.md` status notice, `CHANGELOG.md`, `scripts/check-current-release.sh`.
- Never: earlier `releases/` folders, `release-candidates/`, publication records of earlier editions.

## Procedure

1. Confirm the proposed publication date in America/New_York with the coordinator. Use it consistently as `<date>`.
2. `git switch -c release/v<version>-publication <start-commit>`.
3. Update coordinates: `CITATION.cff` (`version`, `date-released`, `message`), `.zenodo.json` (`version`, `publication_date`, title, description, `isNewVersionOf` the previous version DOI), the README line matching `**Release coordinate:** GKOS-<date> v<version>`, the master Standard status notice, and move `## Unreleased` lines under a new `## GKOS-<date> v<version>` heading in `CHANGELOG.md`.
4. Write the package files modeled on `releases/2026-09-24-v0.82.1/`: `README.md`, `RELEASE_NOTES.md`, `RELEASE_MANIFEST.yml` (with `date-standing: proposed-until-verified-publication`, `current-release: true`, the requirement and gate counts, `profile-qualification: none`, `qualifying-profiles: []`), `EVIDENCE_INDEX.md`.
5. Write the version verifier and post-tag workflow modeled on the v0.82.1 pair, and route `scripts/check-current-release.sh` to the new check for this version.
6. Check line endings: `git add -A` then `git ls-files --eol releases/<date>-v<version>` shows `i/lf w/lf`.
7. Generate inventories last, after every other file is final and staged: `node scripts/release-source-checksums.mjs --generate releases/<date>-v<version>`, then `git add releases/<date>-v<version>`.
8. Commit with `git commit -s`. Verify: `node scripts/release-source-checksums.mjs --check releases/<date>-v<version>` and `bash scripts/check-current-release.sh`.
9. Any later change to any tracked file invalidates the source inventory: regenerate from step 7 and recommit.
10. Write `package-record.json` (commit, tree, package digests) and `PR-BODY.md` (repository PR template), then `HANDOFF.json` last. Opening the PR is an owner or coordinator decision.

## Verification

Objective:

- `node scripts/release-source-checksums.mjs --check releases/<date>-v<version>` prints "Source integrity PASS".
- `bash scripts/check-current-release.sh` exits 0 on the package commit with tags fetched.
- `git diff --name-only <start-commit>..HEAD -- releases release-candidates` lists only the new folder.

Interpretation:

- Does any file state publication, a DOI or a live status before the owner acts?
- Are counts in the manifest the counts the registry actually has?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Package candidate | Branch `release/v<version>-publication` | Commit and tree in the handoff |
| Package record | `<run>/output/<task-id>/<attempt>/package-record.json` | `commit`, `tree`, `files[]` with SHA-256 |
| PR body | `<run>/output/<task-id>/<attempt>/PR-BODY.md` | Repository PR template, filled |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- Publication date moves → update every coordinate, regenerate inventories, rerun checks; record the old commit as superseded.
- Inventory check fails → never hand-edit `SOURCE_SHA256SUMS.txt` or `SHA256SUMS.txt`; find the changed file and regenerate.
- The verifier needs a gate the owner has not decided → `BLOCKED` naming the decision.
