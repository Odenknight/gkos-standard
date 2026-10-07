# Area tracker: `decisions/`

Informative tracker, hand-written. Status: **proposed**. Prepared 2026-10-07 by worker-claude-A (run `edit-20261007-v083-consolidation`, task A) at base commit `7971744`. Per-file standing and counts: [REPO-MAP.md](../REPO-MAP.md). How to keep this file: [map README](../README.md#area-trackers-and-the-edit-ledger).

## Purpose

Development decision records (R-series), the decision register, open questions and the ratification questionnaire.

## Current and historical items

### Current items

- [decisions/GKOS_Decision_Register.md](../../../../decisions/GKOS_Decision_Register.md): live index of proposed, clarifying and accepted decisions (integrator-only).
- Accepted records R9 to R24 are kept as written. Only an additive, dated status note is allowed, and only when a packet says so.
- R21 and R22 are informative decisions; R23 is prospective.
- [decisions/OPEN_QUESTIONS.md](../../../../decisions/OPEN_QUESTIONS.md): open questions.

### Historical items

- `R13_Conformance_Honesty_and_Alignment_Proposal.md`: superseded by the accepted R13 record.
- `ratification-questionnaires/`: questionnaire for the first public release package.
- Every accepted record keeps its original wording, including its maturity terms (D2).

## Major and minor items

| Item | Weight | Standing | Status |
| --- | --- | --- | --- |
| `GKOS_Decision_Register.md` | major | decision | current; integrator-only |
| Accepted R-records | major | decision | immutable |
| R25 v0.83 development line | major | decision | planned; proposed |
| R26 specification detail amendments | major | decision | planned; proposed |
| `OPEN_QUESTIONS.md` | minor | decision | current |
| R13 proposal; ratification questionnaire | minor | historical | historical |

## Governing workflow

New records and register rows: [edit](../../edit/README.md) (`01-intake` with `create` targets). Acceptance is the owner's act; only the owner writes "Accepted". Which decision is current: [conformance-review](../../conformance-review/README.md).

## Edit ledger

Append-only. `planned` until merged.

| Date | Item | Change | PR | Run |
| --- | --- | --- | --- | --- |
| 2026-10-07 | `decisions/R25_V083_Development_Line_Development_Decision_Record.md` | planned: new record, `Status: Proposed`, with the GOVERNANCE disclosure list | - | edit-20261007-v083-consolidation (E) |
| 2026-10-07 | `decisions/GKOS_Decision_Register.md` "Proposed decisions" | planned: rows for R25 and R26 (E is the register integrator) | - | edit-20261007-v083-consolidation (E) |
| 2026-10-07 | `decisions/R26_Specification_Detail_Amendments_Development_Decision_Record.md` | planned: new record, `Status: Proposed` | - | edit-20261007-v083-consolidation (F) |
