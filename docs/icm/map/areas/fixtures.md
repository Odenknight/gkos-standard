# Area tracker: `fixtures/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

Executable fixture catalogs and data. Frozen path. Fixtures cite requirement IDs; they create no requirement or profile.

## Current and historical items

### Current items

- [fixtures/README.md](../../../../fixtures/README.md): catalog overview (informative).
- `fixtures.manifest.json`, `corpus/`, `expected/`: catalog 0.2.0 starter slice.
- `track-a/`: the active fixture catalog named by the current release manifest.
- `gcp6/`, `gcp7/`: mechanism catalogs.
- `provisional/` (evidence, l3-interoperability, retrieval, science): proposed and non-qualifying.

### Historical items

- `archive/`: the catalog 0.1.0 divergence register, its README and a historical golden output.

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| `track-a/` active catalog | major | process | current; frozen |
| `fixtures.manifest.json`, `corpus/`, `expected/` | major | process | current; frozen |
| `README.md` | minor | informative | current-facing; frozen |
| `gcp6/`, `gcp7/` | minor | process | current; frozen |
| `provisional/` | minor | proposed | provisional; frozen |
| `archive/` | minor | historical | historical |

## Governing workflow

Questions: [conformance-review](../../conformance-review/README.md). Changes: [edit](../../edit/README.md); frozen path, so they merge only after R25 is accepted.

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | `fixtures/README.md:47` | planned: current-state prose on the stacked frozen-path branch | - | edit-20261007-v083-consolidation (E) |
