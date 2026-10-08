# R26-S07 — Authority Receipt review deadline

Development fixtures for the v0.83 development line, accepted under R26
(accepted in part 2026-10-07). These fixtures are non-qualifying and support no conformance claim.

Tests the optional `review_deadline_seconds` field (integer, at least 1) in `schemas/authority-receipt-1.1.0.schema.json`.

**Requirement IDs:** `GKOS-DELEGATION-006`.

**Evaluation:** Schema, with the runner's Ajv 2020 configuration. The condition "required when the grant permits delegated actions that need review" is a semantic check: no receipt field declares that review is needed, and R26-A14 lets the bound policy carry the deadline instead.

## Cases

| Case | Title | Expected | Reason |
| --- | --- | --- | --- |
| R26-S07-01 | review_deadline_seconds set to 86400 | `valid` against `authority-receipt-1.1.0.schema.json` | Integer, at least 1. |
| R26-S07-02 | review_deadline_seconds set to 0 | `invalid` against `authority-receipt-1.1.0.schema.json` | Minimum is 1. |
| R26-S07-03 | review_deadline_seconds set to 1.5 | `invalid` against `authority-receipt-1.1.0.schema.json` | The field is an integer. |
| R26-S07-04 | review_deadline_seconds given as text | `invalid` against `authority-receipt-1.1.0.schema.json` | The field is an integer. |
| R26-S07-05 | Grant without review_deadline_seconds | `valid` against `authority-receipt-1.1.0.schema.json` | The field is optional in the schema. Whether a grant needs it depends on whether its delegated actions need review, and R26-A14 lets the bound policy carry the deadline instead; that is a semantic check (packet R4, R26-A14 fixtures). |

Each case also lists its requirement IDs in `cases.json`.
