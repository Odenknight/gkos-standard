# 05-review — independent advisory review of the exact candidate

## Goal

A reviewer who did not author the candidate reads the exact commit against its scope, lineage and check results and returns a verdict with numbered findings. Done means `REVIEW.md` is bound to the candidate commit and its packet digest and gives one verdict: `PASS`, `PASS_WITH_CORRECTIONS`, `HOLD` or `REFUSE`. The review is advisory development evidence; dispositions of its findings belong to the Founder and Initial Editor.

## Governing instructions

- `GOVERNANCE.md` — non-self-certification; claims of independent verification need organizational and operational independence from the proposer.
- `decisions/R18_Track_A_GCP45_and_Authorized_Independent_Review_Development_Decision_Record.md` — section 3 (R18-128): an agent reviewer uses a different model family from the proposing agent, receives a sealed evidence packet, runs after deterministic gates, and does not review its own work. This repository's own reviews follow that pattern; applying it here is practice, not a GKOS conformance claim.
- `docs/reviews/R23_L3_BOUNDED_DIFFERENT_MODEL_REVIEW_PACKET.md` — packet shape, sealed inputs, required verdict vocabulary.
- `docs/reviews/R23_L3_REVIEW_DISPOSITION_2026-09-04.md` — finding IDs, severities (`BLOCKING`, `MAJOR`, `MINOR`) and owner disposition vocabulary (`ACCEPT`, `ACCEPT_WITH_NARROWING`).
- `docs/ecosystem/REVIEW_DISPOSITION_REGISTER.md` — agreement between drafts or models is not verification; preserve superseded review claims.
- `conformance/CLAIMS_POLICY.md` — claim limits the reviewer enforces.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Sealed packet | Task packet `tasks/<task-id>.json` naming the candidate commit and the files below | Full packet | SHA-256 in `RUN.json` |
| Scope | `<run>/output/<task-id>/<attempt>/scope.json` from `01-intake` | Full; on router entry at this stage, the records the sealed packet names instead | Digest in its HANDOFF.json |
| Lineage | `<run>/output/<task-id>/<attempt>/lineage.md` from `02-lineage` | Full; absent when `02-lineage` is `NOT_APPLICABLE` or the sealed packet names other records | Digest in its HANDOFF.json |
| Check results | `<run>/output/<task-id>/<attempt>/results.json` from `04-check` | Full; on router entry at this stage, the hosted required-check results for the exact head | Digest in its HANDOFF.json, or the check-run URLs and head SHA |
| Candidate | `git diff <base_commit>..<candidate-commit>` | Full diff | Candidate commit |
| Reference text | `requirements/REGISTRY.md` and each decision named in the lineage file | Cited rows and sections | Packet `base_commit` |

## Dependencies

- `04-check` accepted for the same candidate commit, or, on router entry at this stage for another author's draft or PR head, verified prior evidence named in the packet for `01-intake` through `04-check` (the exact head commit and its hosted required-check results). If a deterministic check is `FAIL`, the reviewer may still review but cannot return `PASS`.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- No source changes. The reviewer does not push fixes to the author's branch.

## Procedure

1. Confirm you are not the author of any commit in the candidate range (`git log --format='%an %ae' <base_commit>..<candidate-commit>`) and, for an agent author, that your model family differs. Record your identity, runtime and model family.
2. Verify the packet digest and that the candidate commit and tree match the `03-draft` handoff: `git rev-parse <candidate-commit>^{tree}`.
3. Read the governing instructions, then the inputs. Read nothing from the author's working context beyond the sealed packet.
4. For each changed normative or decision sentence, check that the cited decision or evidence supports it. Check that IDs are unchanged, superseded text is still reachable, no sensitivity label moved down, and the GOVERNANCE disclosure list is present in any decision draft.
5. Check claim discipline against `conformance/CLAIMS_POLICY.md` and the claim hits from `04-check`.
6. Check that the PR template fields drafted in `scope.json` match what the diff does (change class, compatibility impact, fixtures, rollback).
7. Number findings `<run-id>-REV-NNN` with severity `BLOCKING`, `MAJOR` or `MINOR`, each with `path:line` at the candidate commit and a required correction.
8. Write `REVIEW.md` (kit template plus verdict), then `HANDOFF.json` last.

## Verification

Objective:

- `REVIEW.md` names the candidate commit, its tree, the packet SHA-256 and the reviewer identity.
- Every finding cites `path:line` that exists at the candidate commit.

Interpretation:

- Does the verdict follow from the findings (any `BLOCKING` → `HOLD` or `REFUSE`)?
- Did the review test the submitted commit and not an earlier branch head?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Review | `<run>/output/<task-id>/<attempt>/REVIEW.md` | Kit `REVIEW.md` template; verdict `PASS`, `PASS_WITH_CORRECTIONS`, `HOLD` or `REFUSE`; findings table |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- Reviewer is the author, or shares the author's model family for an agent-authored candidate → `BLOCKED`; the coordinator reassigns.
- Candidate commit differs from the one in the packet → stop; report `stale`.
- Evidence is missing for a claim → a finding, not a reason to stop.
- Accepted corrections create a new candidate; it needs a new `04-check` and a corrected-head verification, as in `docs/reviews/R23_L3_CORRECTED_HEAD_VERIFICATION_2026-09-04.md`.
