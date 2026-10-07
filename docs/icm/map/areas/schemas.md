# Area tracker: `schemas/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

JSON Schema 2020-12 models for exchange surfaces; under R16 they define the semantic data model. Frozen path.

## Current and historical items

### Current items

- [schemas/README.md](../../../../schemas/README.md): schema table with layer and status.
- Fifteen active top-level schemas, including the GKX 2.0 frontmatter schema and shared definitions.
- `authority-receipt.schema.json` and `authorized-use-record.r17.schema.json`: R17 material.
- `provisional/` (evidence, l3, retrieval, science): proposed and non-qualifying.

### Historical items

- `archive/`: three superseded schema candidates.

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| Active top-level schemas | major | normative | current; frozen |
| `README.md` status table | minor | informative | current-facing; frozen; R17 rows need edition wording |
| `provisional/` | minor | proposed | provisional; frozen |
| `archive/` | minor | historical | historical |

## Governing workflow

Changes: [edit](../../edit/README.md) with lineage and review; frozen path (R25). Evidence questions: [conformance-review](../../conformance-review/README.md).

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | `schemas/README.md:21-22` | planned: describe R17 material by its published edition, on the stacked frozen-path branch | - | edit-20261007-v083-consolidation (E) |
| 2026-10-07 | `schemas/authorized-use-record.r17.schema.json` description | planned: same, description text only | - | edit-20261007-v083-consolidation (E) |
