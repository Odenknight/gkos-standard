# Area tracker: `scripts/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

Release checks, checksum tools, attestation verification, the crosswalk generator and the map generator.

## Current and historical items

### Current items

- `check-current-release.sh` and `verify-v0821-release.mjs`: current release and development guard.
- `release-source-checksums.mjs`: source checksum tool.
- `xw002/`: crosswalk generator (`gen.py`, `rows.py`, `test_gen.py`) and its registry snapshot `requirements-v081.md`.
- `icm-map.mjs`: organization map generator (this run).

### Historical items

- Edition-specific checks for earlier editions: `check-v081-published-release.sh`, `check-v081-release-candidate.sh`, `check-v082-release-candidate.sh`, `check-v0821-release.sh`, `v081-source-checksums.mjs`, `verify-v081-attestation.mjs`. CI still runs some of them.
- `xw002/requirements-v081.md` is a pinned registry snapshot.

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| `verify-v0821-release.mjs`, `check-current-release.sh` | major | process | current; changes need the release workflow |
| `xw002/` generator | major | process | current |
| `icm-map.mjs` | minor | process | planned |
| Edition-specific checks | minor | process | kept for earlier editions |

## Governing workflow

Validator changes: [release](../../release/README.md) or [edit](../../edit/README.md) with an owner decision. Generator changes: [edit](../../edit/README.md).

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | `scripts/icm-map.mjs` | planned: new dependency-free map generator with `--check` | - | edit-20261007-v083-consolidation (A) |
| 2026-10-07 | `scripts/verify-v0821-release.mjs` | planned: `--development` mode gated on R25 acceptance; reject untracked files under frozen paths (REV-012) | - | edit-20261007-v083-consolidation (E) |
| 2026-10-07 | Tests for the development guard | planned: negative-check list or tests under `scripts/` | - | edit-20261007-v083-consolidation (E) |
