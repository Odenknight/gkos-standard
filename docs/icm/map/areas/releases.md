# Area tracker: `releases/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

Immutable release packages: manifest, notes, evidence index, README and checksum lists per edition. CI verifies every checksum list.

## Current and historical items

### Current items

- `2026-09-24-v0.82.1/`: package of the current edition (its manifest names the normative annexes the map reads).

### Historical items

- Packages of every earlier edition, from the first public package onward. They keep their original words.

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| Current edition package | major | release | immutable |
| Earlier packages | minor | release | immutable |

## Governing workflow

[release](../../release/README.md) creates a new package; nothing edits an existing one.

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | `releases/` | No change planned for this area in this run. | - | edit-20261007-v083-consolidation |
