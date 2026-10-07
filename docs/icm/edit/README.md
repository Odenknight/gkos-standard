# Workflow: edit

Status: **proposed** (Fable-FAC, 2026-10-07). Grants no authority.

Use this workflow to change governed documents in this repository: informative documentation, development decision records (R-series), owner clarifications under `docs/decisions/`, the requirement registry, review and disposition records, and `CHANGELOG.md`. It adapts the KnightsAI GKOS editing method (`_Agents/_work/ICM/_core/GKOS-EDITING.md`) to the records and validators that exist here.

Do not use it for release packages (use [release](../release/README.md)) or for read-only evidence questions (use [conformance-review](../conformance-review/README.md)).

## Stages

| Stage | Job | Main output |
| --- | --- | --- |
| `01-intake` | Name the exact records, IDs, change class and the rule that permits the edit | `scope.json` |
| `02-lineage` | Resolve current versus superseded records, controlling decisions, covering files and validator impact | `lineage.md` |
| `03-draft` | Make the change on one branch, additively, inside the declared write scope | Commit, `change.patch`, proposed shared-file rows |
| `04-check` | Run the repository's validators and the claim-discipline check on the exact commit | `results.json` |
| `05-review` | Independent advisory review of the exact commit against lineage and evidence | `REVIEW.md` with a verdict |
| `06-handoff` | Package the candidate for the Founder and Initial Editor's decision | Owner summary and a filled PR template |

`dependencies.json` is linear and lists every stage. Skips and late entries follow the router's "Skips and late entry" rule; the edges stay as they are and are satisfied by evidence or a `NOT_APPLICABLE` record named in the packet.

- **Non-normative editorial fix** (a typo, stale coordinate or broken link in an informative document): the packet may route it `01-intake → 03-draft → 04-check → 06-handoff` and records `02-lineage` and `05-review` as `NOT_APPLICABLE` with the reason. `lineage.md` and `REVIEW.md` then become optional inputs for `03-draft` and `06-handoff`. `02-lineage` may be `NOT_APPLICABLE` only when `01-intake` shows that every target is informative, lies outside the five frozen directories, is not read by `scripts/check-current-release.sh` or `scripts/verify-v0821-release.mjs`, and is not a historical record or a deliberate historical pin. Otherwise both stages run.
- **Review of another author's draft or PR head** (router entry at `05-review`): the packet names verified prior evidence for `01-intake` through `04-check`: the exact head commit, its hosted required-check results, and the records the sealed packet lists in place of `scope.json` and `lineage.md`.

## How it maps to existing repository processes

| Repository process | Source | Where it appears here |
| --- | --- | --- |
| v0.x amendment path steps 1–3 (proposal, evidence, change class) | `GOVERNANCE.md` | `01-intake` |
| Step 4 (advisory or external review) | `GOVERNANCE.md`; review packets under `docs/reviews/` | `05-review` |
| Step 5 (Development Decision Record) | `GOVERNANCE.md`; `decisions/` | Drafted in `03-draft` as a proposal; acceptance is the owner's |
| Step 6 (pull request and validation) | `.github/PULL_REQUEST_TEMPLATE.md`; required checks | `04-check`, `06-handoff` |
| Step 7 (merge, changelog, release administration) | `GOVERNANCE.md` | Owner action after `06-handoff`; changelog rows applied by the integrator |
| Change classes | `CONTRIBUTING.md` | Recorded in `scope.json` |
| Document standing (normative, informative, proposed, historical) | `docs/CORPUS-STATUS.md` | `01-intake`, `02-lineage` |

## Record-specific rules

- `requirements/REGISTRY.md` is append-only. New allocations and status changes come only from an owner allocation or decision. Original requirement text is never edited; changes are new ledger rows.
- New decision records are drafted as proposals and listed under "Proposed decisions" in `decisions/GKOS_Decision_Register.md` by the integrator. Only the owner writes an acceptance date or "Accepted" status.
- `CHANGELOG.md` changes go under `## Unreleased` only.
- `releases/`, `release-candidates/`, `docs/releases/` publication records and the archive folders are never edited by this workflow.
- While `CITATION.cff` names version `0.82.1`, the release validation job fails on any change under `requirements/`, `schemas/`, `fixtures/`, `conformance/runner/` or `standard/annexes/` (see `scripts/verify-v0821-release.mjs`). Such an edit needs an owner decision on the release line and a validator change before it can pass CI.

## Small example

Task: `NOTICE.md` names release GKOS-2026-08-05 v0.77 while `CITATION.cff` names 0.82.1.

1. `01-intake`: target `NOTICE.md` lines 4 and 11; class Editorial; governing rule `docs/CORPUS-STATUS.md` maintenance rule plus the owner instruction recorded in the packet. The packet records `02-lineage` and `05-review` as `NOT_APPLICABLE` only if the owner confirms the attribution line is not a deliberate historical pin; otherwise both run.
2. `03-draft`: branch `docs/notice-edition-coordinate-<yyyymmdd>`, one commit with DCO sign-off, proposed `CHANGELOG.md` line in the handoff.
3. `04-check`: markdown lint and the release-validation commands on the exact commit.
4. `06-handoff`: summary, PR template fields, check counts. The owner decides whether a PR is opened and merged.
