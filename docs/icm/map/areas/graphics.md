# Area tracker: `graphics/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

Informative figures: legacy orientation graphics, current diagrams with editable sources, social artwork. Graphics never amend controlling text.

## Current and historical items

### Current items

- [graphics/README.md](../../../../graphics/README.md): index and claim boundary.
- [diagrams/](../../../../graphics/diagrams/README.md): canonical architecture, control plane, layer responsibilities (Mermaid sources), CIA overview and alignment (Python builds), refund, adoption, middleware and evidence-review figures.
- `social/`: repository social card.
- Planned: `graphics/REGISTER.md` with every figure and a "Graphics needed" section.

### Historical items

- Legacy orientation graphics at the folder top level (implementation dashboard, provisional logo, OSI comparison, poster).
- Historical artwork under [archive/graphics/](../../../../archive/graphics/README.md) (archive tracker).

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| `diagrams/` sources and renders | major | asset | current |
| Graphics register | major | informative | planned |
| Legacy top-level graphics | minor | asset | review: current or historical |
| `social/` card | minor | asset | current |

## Governing workflow

[graphics](../../graphics/README.md). Text-only README changes may use [edit](../../edit/README.md).

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | Graphics inventory and register | planned: inventory every figure; write the register with statuses and "Graphics needed" rows | - | edit-20261007-v083-consolidation (D) |
| 2026-10-07 | Diagram sources with stale current labels | planned: update sources; re-render where the toolchain is available; otherwise mark `stale-needs-render` | - | edit-20261007-v083-consolidation (D) |
| 2026-10-07 | `graphics/README.md`, `graphics/diagrams/README.md` | planned: consistency update | - | edit-20261007-v083-consolidation (D) |
| 2026-10-07 | `graphics/REGISTER.md` "Graphics needed" | integrated on the integration branch, not merged: "Inserted" column updated: 30 items Yes, 6 items Yes with the annex anchor pending R25, GN-007 pending R25 (frozen) | pending | edit-20261007-v083-consolidation (I1) |
