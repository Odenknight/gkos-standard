# 02-candidate — assemble and freeze one release candidate

## Goal

Prepare one release-candidate package and its validator on `release/v<version>-rc<n>`, and freeze one exact commit. Done means the candidate commit exists, the RC package's `SHA256SUMS.txt` verifies, the validator passes locally, and any later change is recorded as a new candidate number. When the gate record does not require a separate candidate package, record `NOT_APPLICABLE` with the gate reference.

## Governing instructions

- `decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md` — G82-04: one exact frozen candidate; later changes create a new candidate identity and invalidate prior final evidence. G82-06: machine-readable coordinate consolidation.
- `release-candidates/v0.82-rc1/PUBLICATION_CHECKLIST.md` — precedent checklist; "No pre-approval commit may claim that v0.82 is published."
- `scripts/check-v082-release-candidate.sh` — precedent candidate validator.
- `.github/workflows/release-validation.yml` — earlier RC packages must keep verifying; candidate validators run only while `CITATION.cff` names the predecessor version.
- `.gitattributes` — LF blobs.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Gate | `<run>/output/<task-id>/<attempt>/gate.md` from `01-gate` | Full | Digest in its HANDOFF.json |
| RC precedent | `release-candidates/v0.82-rc1/` | All six files: README, release notes, manifest, evidence index, publication checklist, checksum list | Packet `base_commit` |
| Release routing | `scripts/check-current-release.sh` | Version routing at the top | Packet `base_commit` |
| Current verifier | `scripts/verify-v0821-release.mjs` | Historical-package assertion | Packet `base_commit` |

## Dependencies

- `01-gate` accepted, with a controlling record that calls for a candidate package.

## Allowed writes

- Branch `release/v<version>-rc<n>` from `base_commit`.
- New folder `release-candidates/v<version>-rc<n>/` and a new `scripts/check-v<version>-release-candidate.sh`.
- Shared files, integrator only (in a release run the single release worker is the integrator): `scripts/check-current-release.sh`, `.github/workflows/release-validation.yml`, machine-readable coordinate files named by the gate.
- Never: earlier `release-candidates/` folders, anything under `releases/`.

## Procedure

1. `git switch -c release/v<version>-rc<n> <base_commit>`.
2. Create the RC files following the v0.82-rc1 layout. Mark every status as prepared; no file may say the edition is published.
3. Write the candidate validator modeled on `scripts/check-v082-release-candidate.sh`, and route to it from `scripts/check-current-release.sh` and `.github/workflows/release-validation.yml` only while `CITATION.cff` names the predecessor version. Without this routing, `scripts/verify-v0821-release.mjs` fails on the new folder.
4. Stage the files, then compute package checksums from the staged blobs so line endings cannot differ:

   ```sh
   git add release-candidates/v<version>-rc<n>
   cd release-candidates/v<version>-rc<n>
   for f in $(git ls-files . | grep -v '^SHA256SUMS.txt$' | sort); do
     printf '%s  %s\n' "$(git cat-file blob ":release-candidates/v<version>-rc<n>/$f" | sha256sum | cut -d' ' -f1)" "$f"
   done > SHA256SUMS.txt
   sha256sum -c SHA256SUMS.txt
   ```

5. `git add` the checksum list (it lists every package file except itself, as in v0.82-rc1), commit with `git commit -s`, and record the frozen commit and tree.
6. Run the candidate validator and the `04-check` command set of the edit workflow on the frozen commit.
7. Write `candidate.json` (commit, tree, package digests), then `HANDOFF.json` last. Pushing the branch needs the packet and an owner instruction.

## Verification

Objective:

- `(cd release-candidates/v<version>-rc<n> && sha256sum -c SHA256SUMS.txt)` exits 0.
- Earlier RC packages still verify: `(cd release-candidates/v0.82-rc1 && sha256sum -c SHA256SUMS.txt)`.
- `git ls-files --eol release-candidates/v<version>-rc<n>` shows `i/lf` for every file.

Interpretation:

- Does any candidate text read as publication, qualification or approval?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Frozen candidate | Branch `release/v<version>-rc<n>` | Commit and tree in the handoff |
| Candidate record | `<run>/output/<task-id>/<attempt>/candidate.json` | `commit`, `tree`, `files[]` with SHA-256 |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- Any change after freezing → new candidate number `rc<n+1>`; prior evidence is marked superseded, not edited.
- Validator fails → `FAIL` recorded; fix on a new attempt; never weaken a check to pass.
- Gate record does not call for a candidate package → `NOT_APPLICABLE` with the reference; `03-package` may start.
