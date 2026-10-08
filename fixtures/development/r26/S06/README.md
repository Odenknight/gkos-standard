# R26-S06 fixtures — actor references

Development fixtures for R26-S06 (proposed; v0.83 development line) against
`schemas/proposal-envelope.r26.schema.json` and
`schemas/assessment.r26.schema.json`. The Decision Record part of R26-S06 is
the canonical Decision Record's `deciding_actor`; see
[`../S05/`](../S05/README.md), case `R26-S05-N03`. They are non-qualifying.
Cases: [`cases.json`](cases.json).

| Case | Requirement IDs | Expected result | Reason |
| --- | --- | --- | --- |
| `R26-S06-P01` | GKOS-REVIEW-003, GKOS-AUTHUSE-004 | valid | `proposer` is an actor reference. |
| `R26-S06-N01` | GKOS-REVIEW-003, GKOS-AUTHUSE-004 | invalid | Class-only `proposer` (`human`). |
| `R26-S06-N02` | GKOS-REVIEW-003, GKOS-AUTHUSE-004 | invalid | Actor reference without `actor_id`. |
| `R26-S06-P02` | GKOS-REVIEW-003, GKOS-AUTHUSE-004 | valid | `assessor.id` is an actor reference. |
| `R26-S06-N03` | GKOS-REVIEW-003, GKOS-AUTHUSE-004 | invalid | `assessor.id` is a legacy actorIdentity string. |
| `R26-S06-C01`, `R26-S06-C02` | GKOS-REVIEW-003, GKOS-AUTHUSE-004 | valid against the legacy schemas | Legacy sidecars keep `actorIdentity`. |

## Results

Evaluated with Ajv 2020 (`strict: false`), loading every `schemas/*.json` as
`conformance/runner/run.mjs` does. Before (base `e1aa08a`), the new schemas are
absent; N01 and N03 are valid under the legacy schemas, which is the gap
R26-S06 closes. After the change, all 7 cases meet their expectation.
