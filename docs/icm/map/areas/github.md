# Area tracker: `.github/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

CI workflows, issue templates and the pull-request template.

## Current and historical items

### Current items

- Workflows: markdown lint, link check, checksums, release validation, conformance runner, xw002 consistency, and post-tag verification for each published edition.
- Issue templates: ambiguity, implementation feedback, security report, specification defect, config.
- `PULL_REQUEST_TEMPLATE.md`: proposal metadata and checklist.

### Historical items

- Post-tag verification workflows for earlier editions stay in place as records of those checks.

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| Required check workflows | major | process | current; integrator-only |
| Pull-request template | major | process | current |
| Issue templates | minor | process | current |

Notes:

- Proposed, not done: a CI step `node scripts/icm-map.mjs --check` would keep the map current.

## Governing workflow

[edit](../../edit/README.md); workflow files are integrator-only in a parallel run. Ruleset changes are the owner's.

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | `.github/` | No change planned for this area in this run. CI step for the map is proposed only. | - | edit-20261007-v083-consolidation (A) |
