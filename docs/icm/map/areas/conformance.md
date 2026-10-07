# Area tracker: `conformance/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

Claims policy, conformance overview, provisional prose requirements, the adapter-neutral runner (frozen path), adapters and replay evidence.

## Current and historical items

### Current items

- [conformance/CLAIMS_POLICY.md](../../../../conformance/CLAIMS_POLICY.md): owner-authorized clarification of claim controls.
- [conformance/README.md](../../../../conformance/README.md): profiles, claim contents, runner overview.
- `runner/`: Node test runner and evaluators; frozen; blocking CI matrix on Linux and Windows with Node 22 and 24.
- `adapters/gkos-engine.requirements.json`: informative engine map.
- `evidence/gcp6-replay-v0.1/`: informative replay evidence (README, JSON, CBOR).

### Historical items

- The historical divergence register lives in [fixtures/archive/](../../../../fixtures/archive/DIVERGENCES.md) (fixtures tracker).

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| `CLAIMS_POLICY.md` | major | decision | current |
| `runner/` | major | process | current; frozen |
| `README.md` | major | informative | current |
| `provisional-requirements/` (GCP-1 to GCP-7, Viewer/Projection, version matrix) | minor | proposed | provisional; non-qualifying |
| `adapters/`, `evidence/` | minor | informative | current |

Notes:

- Coverage note for the coordinator: no packet in this run covers `conformance/README.md`, `CLAIMS_POLICY.md` or `provisional-requirements/` for the D2 and edition pass.

## Governing workflow

Questions about support, claims or profiles: [conformance-review](../../conformance-review/README.md). Text changes: [edit](../../edit/README.md). Runner changes are frozen-path changes and need the R25 line and the runner checks in `docs/icm/edit/04-check/CONTEXT.md`.

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | `conformance/` | No change planned for this area in this run. Read as input by F. | - | edit-20261007-v083-consolidation (F) |
