# Workflow: conformance-review

Status: **proposed** (Fable-FAC, 2026-10-07). Grants no authority. Read-only with respect to the repository.

Use this workflow to answer one bounded evidence question about this repository: what supports a requirement, what remains incomplete for a profile, whether a fixture run meets its catalog expectation, which decision is current for a topic, or what can be claimed publicly at the current edition. It never issues a profile-qualification, certification or publication verdict, and it never changes `requirements/REGISTRY.md`, a decision record, a fixture or a schema.

This workflow implements the conformance-review route of the KnightsAI runbook GKOS-ICM-BUILD-001 (2026-09-14). The runbook's stage names map as `01_scope` → `01-scope`, `02_sources` → `02-sources`, `03_checks` → `03-checks`, `04_interpretation` → `04-interpretation`, `05_handoff` → `05-handoff`; hyphens follow the KnightsAI ICM conventions. The runbook's `receipt.json` is the kit `HANDOFF.json` here. The runbook's proposed `workflows/` folder and helper script are not used; structure is checked with the share's `icm_check.py`.

## Stages

| Stage | Job | Main output |
| --- | --- | --- |
| `01-scope` | Freeze one question, its question class and canonical subject IDs | `scope.json` |
| `02-sources` | Resolve registry rows, controlling decisions, fixture entries, schemas and adapter maps | `inputs.json` with digests, missing-artifact list |
| `03-checks` | Run existing validators read-only in a disposable worktree | `results.json`, logs |
| `04-interpretation` | Answer the question against the evidence, keeping five status dimensions separate | `findings.md` with coverage and counterevidence |
| `05-handoff` | Package an auditable answer and eligible next actions | Owner-facing answer, HANDOFF.json |

## Five status dimensions

Report each separately. A missing source leaves its dimension `UNKNOWN`. No dimension promotes another.

| Dimension | Values | Source |
| --- | --- | --- |
| Fixture execution | `PASS`, `FAIL`, `KNOWN-DIVERGENCE`, `SKIP`, `UNEVALUATED` | Runner output for the named catalog |
| Schema validation | valid, invalid, `NOT_RUN` (name the schema) | `schemas/` |
| Registry integrity | `registry-lint.mjs` result | `conformance/runner/` |
| Profile qualification | Membership in `qualifying_profiles` (empty in every catalog at the base commit) | Fixture manifests |
| Publication status | Development decision, prospective, informative, or published edition | Decision register, `CITATION.cff`, publication records |

## Small example

Question: "Does fixture `GCP1-N01` demonstrate what the catalog declares for `GKOS-CONFORMANCE-003`?"

1. `01-scope`: class "permanently allocated requirement"; subject `GKOS-CONFORMANCE-003`, fixture `GCP1-N01` in catalog 0.2.0.
2. `02-sources`: registry row, R13 record, fixture entry and corpus file, `gkx-frontmatter-2.0.schema.json`, adapter map row, digests.
3. `03-checks`: `npm ci` and `npm test` in `conformance/runner` on a disposable worktree.
4. `04-interpretation`: fixture execution and schema dimensions reported; profile qualification stays empty; publication status is "published in v0.77, carried in 0.82.1".
5. `05-handoff`: answer bound to the base commit; no claim beyond "the fixture executed and produced its declared result".
