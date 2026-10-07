# Area tracker: `requirements/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

The permanent requirement registry and its machine companions. Frozen path. The registry is append-only: IDs are never deleted, renumbered or reused.

## Current and historical items

### Current items

- [requirements/REGISTRY.md](../../../../requirements/REGISTRY.md): 62 permanent allocations; changes are new dated ledger rows, never edits of original text.
- [requirements/PROFILE_APPLICABILITY.md](../../../../requirements/PROFILE_APPLICABILITY.md) and `PROFILE_APPLICABILITY.json`: requirement-to-profile mapping.
- `DIAGNOSTIC_CODES.json` (28 gate codes) and `EVIDENCE_VOCABULARY.json`.
- `DIAGNOSTIC_CODES.R17.json` and `PROFILE_APPLICABILITY.R17.json`: R17 companions.

### Historical items

- Superseded allocations stay in the registry with their status rows; the registry itself is never moved to an archive.

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| `REGISTRY.md` allocations and ledger | major | normative | current; frozen; append-only |
| `PROFILE_APPLICABILITY.md` / `.json` | major | normative | current; frozen |
| `DIAGNOSTIC_CODES.json`, `EVIDENCE_VOCABULARY.json` | major | normative | current; frozen |
| R17 companion JSON files | minor | normative | current; frozen |
| Header and status prose in `REGISTRY.md` | minor | normative | current-facing; edition line stale |

Notes:

- Map finding at base: `requirements/PROFILE_APPLICABILITY.md:3` uses the retired maturity term.

## Governing workflow

Allocation or status changes: [edit](../../edit/README.md) with an owner allocation or decision. Evidence questions: [conformance-review](../../conformance-review/README.md). Frozen-path edits merge only after the owner accepts R25.

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | `requirements/PROFILE_APPLICABILITY.md:3` | planned: D2 nomenclature (prose only) on the stacked frozen-path branch | - | edit-20261007-v083-consolidation (E) |
| 2026-10-07 | `requirements/REGISTRY.md:8` | planned: header and status prose only; never IDs, rows or original requirement text | - | edit-20261007-v083-consolidation (E) |
| 2026-10-07 | Proposed normative additions | planned: drafted in R26 as proposals for the v0.83 line; no registry change | - | edit-20261007-v083-consolidation (F) |
