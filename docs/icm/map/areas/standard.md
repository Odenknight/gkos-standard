# Area tracker: `standard/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

The master Standard and its annexes. `standard/annexes/` is a frozen path; the master Standard is not.

## Current and historical items

### Current items

- [standard/00_GKOS_Master_Standard.md](../../../../standard/00_GKOS_Master_Standard.md): normative; "Normative surface" lists the controlling annexes and the requirement registry.
- Normative annexes named by the current release manifest: Authority and refusal receipt fields, Canonical serialization, Conformance profiles, Diagnostic-code registry, Layer interface contracts. Governed state change (R15) says it is normative in its own status line.
- Informative annexes: Layer-to-artifact mapping, Provisional authority receipt fields.
- No status line, so the map leaves them unclassified: Known limitations and open issues, Security, privacy and retention, Specialized Agent Framework. The owner decides their standing.

### Historical items

- The pre-GKX 2.0 master Standard is in [archive/standard/](../../../../archive/standard/00_GKOS_Master_Standard_pre_gkx2.md) (archive tracker).

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| `standard/00_GKOS_Master_Standard.md` | major | normative | current; not frozen |
| Five manifest-listed annexes | major | normative | current; frozen |
| Governed state change annex (R15) | major | normative | current; frozen |
| Known limitations annex | minor | unclassified | current-facing; frozen; stale maturity line |
| Security, privacy and retention annex; Specialized Agent Framework annex | minor | unclassified | frozen |
| Layer-to-artifact mapping; Provisional authority receipt fields | minor | informative | frozen |

Notes:

- Map finding at base: `standard/annexes/Known_Limitations_and_Open_Issues.md:3` still describes the edition with the retired maturity term.

## Governing workflow

Master Standard prose: [edit](../../edit/README.md). Annexes: [edit](../../edit/README.md) with `02-lineage` and `05-review`; while `CITATION.cff` names 0.82.1 the release validator rejects frozen-path changes until the owner accepts the v0.83 development line (R25).

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | `standard/00_GKOS_Master_Standard.md` | planned: current-state nomenclature, edition and tone; no normative requirement text | - | edit-20261007-v083-consolidation (C1) |
| 2026-10-07 | `standard/annexes/Known_Limitations_and_Open_Issues.md:3` | planned: D2 nomenclature on the stacked frozen-path branch; merges only after R25 is accepted | - | edit-20261007-v083-consolidation (E) |
| 2026-10-07 | `standard/annexes/Authority_and_Refusal_Receipt_Fields.md:118` | planned: current-state prose on the stacked frozen-path branch; merges only after R25 is accepted | - | edit-20261007-v083-consolidation (E) |
| 2026-10-07 | Annex earmarks | planned: listed in the graphics register only; inserted by the coordinator at integration | - | edit-20261007-v083-consolidation (D) |
| 2026-10-07 | Annex gaps | planned: proposed wording in R26 and the gap register; no annex edit | - | edit-20261007-v083-consolidation (F) |
