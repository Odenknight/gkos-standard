# Area tracker: `docs/icm/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

The ICM layout: router, workflows with stage contracts, and this organization map. Informative; grants no authority. Run records stay on the agent share.

## Current and historical items

### Current items

- [docs/icm/CONTEXT.md](../../../../docs/icm/CONTEXT.md): router.
- Workflows: [edit](../../edit/README.md), [conformance-review](../../conformance-review/README.md), [release](../../release/README.md), [guide](../../guide/README.md), [graphics](../../graphics/README.md), [map](../README.md).
- `map/`: generated `REPO-MAP.md` and `repo-map.json`; hand-written area trackers in `map/areas/`.

### Historical items

- None yet.

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| Router `CONTEXT.md` | major | process | proposed |
| edit, conformance-review, release workflows | major | process | proposed |
| guide, graphics, map workflows | major | process | planned; proposed |
| Area trackers | minor | process | planned; proposed |
| `REPO-MAP.md`, `repo-map.json` | minor | generated | regenerate with `node scripts/icm-map.mjs` |

Notes:

- `icm_check.py layout` treats every folder under `docs/icm/` as a workflow; `map/` therefore carries a one-stage contract.

## Governing workflow

Layout changes: [edit](../../edit/README.md), checked with `icm_check.py layout docs/icm --repo .` and compared with the share mirror. Map refresh: [map](../README.md) stage `01-update`.

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | `docs/icm/CONTEXT.md` | planned: routes for the map, the guide workflow and the graphics workflow | - | edit-20261007-v083-consolidation (A) |
| 2026-10-07 | `docs/icm/guide/` | planned: new workflow, four stage contracts | - | edit-20261007-v083-consolidation (A) |
| 2026-10-07 | `docs/icm/graphics/` | planned: new workflow, four stage contracts | - | edit-20261007-v083-consolidation (A) |
| 2026-10-07 | `docs/icm/map/` | planned: map README, `01-update` contract, generated map, area trackers | - | edit-20261007-v083-consolidation (A) |
