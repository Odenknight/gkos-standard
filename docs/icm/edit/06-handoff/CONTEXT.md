# 06-handoff — package the candidate for the owner's decision

## Goal

Give the Founder and Initial Editor one summary that is enough to decide: what changed, why, the lineage, check counts by result, review verdict and open findings, the exact commit, and a filled pull-request template. Done means `OWNER-SUMMARY.md` and `PR-BODY.md` exist and every listed action is marked as an owner decision.

## Governing instructions

- `GOVERNANCE.md` — v0.x amendment path step 7: merge, changelog and release administration follow PR validation; adoption is a disclosed development decision of the Founder and Initial Editor.
- `.github/PULL_REQUEST_TEMPLATE.md` — required proposal metadata and checklist, including DCO sign-off and "I am not self-approving or self-certifying this change".
- `CONTRIBUTING.md` — merged changes are development decisions, not consensus ratification or independent certification.
- `conformance/CLAIMS_POLICY.md` — the summary itself must not overclaim.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Assignment | Task packet `tasks/<task-id>.json` | Full | SHA-256 in `RUN.json` |
| Predecessors | HANDOFF.json of `01-intake` through `05-review` | Full | Digests in `RUN.json` accepted results |
| Review | `<run>/output/<task-id>/<attempt>/REVIEW.md` | Verdict and findings | Digest in its HANDOFF.json |
| Shared-file rows | `<run>/output/<task-id>/<attempt>/rows.md` | Proposed rows | Digest in its HANDOFF.json |

## Dependencies

- `05-review` accepted, or the packet records why review was skipped (non-normative typo fix only).

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- No source changes. Pushing the branch or opening a PR happens only when the packet and an owner instruction both authorize it.

## Procedure

1. Verify that every predecessor handoff names the same candidate commit, or record the successor commit chain after accepted corrections.
2. Summarize in plain sentences: targets, change class, permitting rule, lineage points, check counts (`PASS`, `FAIL`, `BLOCKED`, `NOT_RUN`, `NOT_APPLICABLE`), review verdict, open findings with proposed dispositions for the owner to choose from.
3. Fill `PR-BODY.md` from `.github/PULL_REQUEST_TEMPLATE.md`: decision or proposal ID, affected requirement, change class, compatibility, security/privacy, migration, fixtures, doc impact, rollback path, evidence. Leave checklist boxes the author cannot truthfully tick unticked.
4. List owner decisions separately: open a PR or not; merge after the nine required checks pass; dispositions of review findings; apply the proposed `CHANGELOG.md` and register rows (integrator after merge decision); any release consequence.
5. Write `HANDOFF.json` last with status `submitted`.

## Verification

Objective:

- The candidate commit in `OWNER-SUMMARY.md` matches `git rev-parse <branch>` and the latest accepted handoff.
- Check counts in the summary equal the counts in `results.json`.

Interpretation:

- Could the owner decide from this page without opening the run folder?
- Is anything an agent did described as approved, accepted or certified?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Owner summary | `<run>/output/<task-id>/<attempt>/OWNER-SUMMARY.md` | Markdown; sections Done / Needs owner decision / Evidence / Limitations |
| PR body | `<run>/output/<task-id>/<attempt>/PR-BODY.md` | Repository PR template, filled |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- Predecessor handoffs disagree on the candidate commit → `BLOCKED`; name the mismatch.
- Review verdict `HOLD` or `REFUSE` → still hand off; the summary leads with the blocking findings and recommends no merge.
- A required check is `NOT_RUN` locally → report it; state that the PR's required checks must pass before any merge decision.
