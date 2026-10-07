# Area tracker: repository root and `LICENSES/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

The entry point. Orientation documents, project policy, licensing, edition metadata (`CITATION.cff`, `.zenodo.json`) and repository configuration (dotfiles). `LICENSES/` is tracked here.

## Current and historical items

### Current items

- Orientation (informative): [README.md](../../../../README.md) ("Current standing" holds the edition coordinate line that release checks read), [TECHNICAL_README.md](../../../../TECHNICAL_README.md), [ROADMAP.md](../../../../ROADMAP.md), [ZENODO.md](../../../../ZENODO.md).
- Project policy (process): [GOVERNANCE.md](../../../../GOVERNANCE.md), [CONTRIBUTING.md](../../../../CONTRIBUTING.md), [SECURITY.md](../../../../SECURITY.md), [CODE_OF_CONDUCT.md](../../../../CODE_OF_CONDUCT.md), [VERSIONING.md](../../../../VERSIONING.md), [NOTICE.md](../../../../NOTICE.md), [TRADEMARKS.md](../../../../TRADEMARKS.md), [THIRD-PARTY-NOTICES.md](../../../../THIRD-PARTY-NOTICES.md), [ACKNOWLEDGMENTS.md](../../../../ACKNOWLEDGMENTS.md), [LICENSE.md](../../../../LICENSE.md), [LICENSES/](../../../../LICENSES/DOCUMENTATION-LICENSE.md).
- [CHANGELOG.md](../../../../CHANGELOG.md): only `## Unreleased` is current and editable.
- Edition metadata: `CITATION.cff` and `.zenodo.json` (integrator-only; read by `scripts/check-current-release.sh` and `scripts/verify-v0821-release.mjs`).
- Configuration: `.gitattributes` (LF everywhere), `.gitignore`, `.lycheeignore`, `.markdownlint.jsonc`.

### Historical items

- [COMPAT.md](../../../../COMPAT.md): dated compatibility snapshot; it says it is not current.
- Released sections of `CHANGELOG.md` (every `## GKOS-...` heading) are kept as written.
- History passages in `README.md` and past milestones in `ROADMAP.md`.

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| `README.md` current standing and edition line | major | informative | current; read by release checks |
| `GOVERNANCE.md` authority and amendment path | major | process | current; changes need the owner |
| `CITATION.cff`, `.zenodo.json` | major | process | current; integrator-only |
| `CHANGELOG.md` `## Unreleased` | major | process | current; integrator-only |
| `CONTRIBUTING.md`, `SECURITY.md` | major | process | current |
| `TECHNICAL_README.md`, `ROADMAP.md` | minor | informative | current |
| `NOTICE.md`, `TRADEMARKS.md`, `ACKNOWLEDGMENTS.md`, licences | minor | process | current |
| `COMPAT.md` | minor | historical | historical snapshot |

Notes:

- Map findings at base: retired maturity wording at `NOTICE.md:13`, `ROADMAP.md:34` and `.zenodo.json:22`. The `.zenodo.json` keyword stays until the next archive deposit.

## Governing workflow

Text changes: [edit](../../edit/README.md). Changes to the edition coordinate in `README.md`, `CITATION.cff`, `.zenodo.json` or the `CHANGELOG.md` heading: [release](../../release/README.md), because the release checks read them. `README.md`, `CHANGELOG.md`, `CITATION.cff` and `.zenodo.json` are integrator-only in a parallel run.

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | `README.md` and the other root documents in packet C1 | planned: D2 nomenclature (full sentence once in README "Current standing" and once in `NOTICE.md`), current-edition consistency, tone | - | edit-20261007-v083-consolidation (C1) |
| 2026-10-07 | `GOVERNANCE.md` | planned: maturity and nomenclature sentences only; authority, amendment path and roles unchanged | - | edit-20261007-v083-consolidation (C1) |
| 2026-10-07 | `CHANGELOG.md` `## Unreleased` | planned: one bullet summarizing C1 (C1 is the CHANGELOG integrator) | - | edit-20261007-v083-consolidation (C1) |
| 2026-10-07 | `.zenodo.json` keyword | planned: no change; keyword kept until the next deposit (recorded in C1 rows) | - | edit-20261007-v083-consolidation (C1) |
| 2026-10-07 | `README.md` link to the beginner's guide | planned: link line proposed by B in rows; applied by the README integrator | - | edit-20261007-v083-consolidation (B) |
