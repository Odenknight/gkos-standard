# R26-S04 fixtures — conformance manifest declarations

Development fixtures for R26-S04 (accepted 2026-10-07; v0.83 development line) against
`schemas/conformance-manifest.r26.schema.json`. They are non-qualifying.
Cases: [`cases.json`](cases.json).

| Case | Requirement IDs | Expected result | Reason |
| --- | --- | --- | --- |
| `R26-S04-P01` | GKOS-RECEIPT-003, GKOS-CANON-001, GKOS-CANON-008, GKOS-AUTHUSE-005 | valid | Declares receipt binding, canonical rendering, supported pairs and the R26-A13 Decision Record to Refusal Receipt projection. |
| `R26-S04-P02` | GKOS-CONFORMANCE-002 | valid | A manifest without the new declarations stays schema-valid. |
| `R26-S04-N01` | GKOS-RECEIPT-003 | invalid | Binding mechanism without its evidence locator. |
| `R26-S04-N02` | GKOS-CANON-008 | invalid | Verifier digest is not lowercase SHA-256 hex. |
| `R26-S04-N03` | GKOS-CANON-001 | invalid | Empty supported-pair set. |
| `R26-S04-N04` | GKOS-AUTHUSE-005 | invalid | R26-A13: `gate_code` set by a constant. |
| `R26-S04-N05` | GKOS-AUTHUSE-005 | invalid | R26-A13: `artifact_type` read from the source record. |
| `R26-S04-N06` | GKOS-AUTHUSE-005 | invalid | Value-table mapping without a value table. |
| `R26-S04-N07` | GKOS-AUTHUSE-005 | invalid | Projection without its digest. |

The schema enforces the R26-A13 constant and mapping rules for each mapping.
Three checks stay outside this schema: each role element is mapped at most
once, a `wrap-set` mapping targets a set element, and the role object validates
against the role schema. The role schema version `1.1.0` is the R26-S02
Refusal Receipt version (`schemas/refusal-receipt-1.1.0.schema.json`), and the
supported-pair set names (`refusal-receipt`, `1.1.0`) to match the declared
role projection.

## Results

Evaluated with Ajv 2020 (`strict: false`), loading every `schemas/*.json` as
`conformance/runner/run.mjs` does. Before (base `e1aa08a`), the target schema
is absent, so no case can be evaluated; P01 is also invalid under the closed
`conformance-manifest.schema.json`. After the change, all 9 cases meet their
expectation.
