# R26-S05 fixtures — canonical Decision Record

Development fixtures for R26-S05 (proposed; v0.83 development line; owner
answer Q6) against `schemas/decision-record.canonical-1.0.0.schema.json`
(`artifact_type` `decision-record`, `schema_version` `1.0.0`). They are
non-qualifying. Cases: [`cases.json`](cases.json).

| Case | Requirement IDs | Expected result | Reason |
| --- | --- | --- | --- |
| `R26-S05-P01` | GKOS-REVIEW-002, GKOS-REVIEW-004, GKOS-CONTEXT-005 | valid | Bound to the proposal, the exact evidence reviewed and the Context Manifest. |
| `R26-S05-P02` | GKOS-REVIEW-004 | valid | `escalated` disposition. |
| `R26-S05-P03` | GKOS-REVIEW-002, GKOS-REVIEW-004 | valid | First record of a writer stream: `predecessor_ref` null, `sequence` 0. |
| `R26-S05-N01` | GKOS-REVIEW-002 | invalid | No `proposal_ref`. |
| `R26-S05-N02` | GKOS-REVIEW-002 | invalid | No `evidence_refs`. |
| `R26-S05-N03` | GKOS-REVIEW-003, GKOS-AUTHUSE-004 | invalid | Class-only `deciding_actor` (`human`). |
| `R26-S05-N04` | GKOS-CANON-004 | invalid | Offset timestamp. |
| `R26-S05-N05` | GKOS-CANON-004 | invalid | Timestamp without six fractional digits. |
| `R26-S05-N06` | GKOS-CANON-007 | invalid | Additional property (closed properties). |
| `R26-S05-N07` | GKOS-REVIEW-004 | invalid | No per-writer `sequence`. |
| `R26-S05-N08` | GKOS-CANON-001 | invalid | Another artifact type. |
| `R26-S05-N09` | GKOS-CONTEXT-005 | invalid | `context_used` true without a manifest reference. |
| `R26-S05-N10` | GKOS-REVIEW-004 | invalid | Unregistered disposition. |
| `R26-S05-C01` | GKOS-REVIEW-004 | valid against `decision-record.schema.json` | Legacy sidecars stay valid. |

## Results

Evaluated with Ajv 2020 (`strict: false`), loading every `schemas/*.json` as
`conformance/runner/run.mjs` does. Before (base `e1aa08a`), the canonical
schema is absent, so 13 cases cannot be evaluated; the positive cases are also
invalid under the legacy schema, and C01 passes. After the change, all 14
cases meet their expectation.
