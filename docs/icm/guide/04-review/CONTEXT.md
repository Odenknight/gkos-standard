# 04-review — independent review of the guide candidate

## Goal

A reviewer who did not write the candidate reads each changed guide sentence against its source and against the guide's rules, and returns a verdict with numbered findings. Done means `REVIEW.md` is bound to the candidate commit and gives one verdict: `PASS`, `PASS_WITH_CORRECTIONS`, `HOLD` or `REFUSE`. The review is advisory; the Founder and Initial Editor disposes of findings.

## Governing instructions

- `GOVERNANCE.md` — non-self-certification; independence for review claims.
- `decisions/R18_Track_A_GCP45_and_Authorized_Independent_Review_Development_Decision_Record.md` — section 3: an agent reviewer uses a different model family from the proposing agent and reviews a sealed packet after the deterministic checks. Applying that pattern here is practice, not a GKOS conformance claim.
- `docs/icm/guide/README.md` — rules for guide text and the D2 wording.
- `conformance/CLAIMS_POLICY.md` — claim limits the reviewer enforces.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Sealed packet | Task packet `tasks/<task-id>.json` naming the candidate commit | Full | SHA-256 in `RUN.json` |
| Scope | `<run>/output/<task-id>/<attempt>/scope.json` from `01-scope` | Full | Digest in its HANDOFF.json |
| Check results | `<run>/output/<task-id>/<attempt>/results.json` from `03-check` | Full | Digest in its HANDOFF.json |
| Candidate | `git diff <base_commit>..<candidate-commit> -- guide` | Full diff | Candidate commit |
| Sources | Each file the scope cites | Cited lines | Packet `base_commit` |

## Dependencies

- `03-check` accepted for the same candidate commit. With a `FAIL` in a deterministic check the reviewer may review but cannot return `PASS`.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- No source changes.

## Procedure

1. Confirm you are not an author of any commit in the range (`git log --format='%an %ae' <base_commit>..<candidate-commit>`) and, for an agent author, that your model family differs. Record identity, runtime and model family.
2. Confirm the candidate commit and tree match the `02-draft` handoff.
3. For each changed sentence, open the linked source at the cited lines. Mark it supported, overstated or unsupported.
4. Check the D2 wording, the informative header, the claim limits and that no figure was copied into `guide/`.
5. Read each changed page once as the intended reader: is each term defined before use, and is each page usable without the sources open?
6. Number findings `<run-id>-REV-NNN` with severity `BLOCKING`, `MAJOR` or `MINOR`, each with `path:line` at the candidate commit and a required correction.
7. Write `REVIEW.md`, then `HANDOFF.json` last.

## Verification

Objective:

- `REVIEW.md` names the candidate commit, its tree, the packet SHA-256 and the reviewer identity.
- Every finding cites a `path:line` that exists at the candidate commit.

Interpretation:

- Does the verdict follow from the findings (any `BLOCKING` → `HOLD` or `REFUSE`)?
- Would an overstated sentence mislead a reader about maturity or claims?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Review | `<run>/output/<task-id>/<attempt>/REVIEW.md` | Kit `REVIEW.md` template; verdict; findings table |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- Reviewer is an author, or shares the author's model family → `BLOCKED`; the coordinator reassigns.
- Candidate differs from the packet → stop; report `stale`.
- Accepted corrections create a new candidate that needs a new `03-check` and a corrected-head check by the same reviewer or another independent one.
