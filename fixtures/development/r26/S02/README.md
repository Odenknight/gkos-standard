# R26-S02 — Refusal Receipt 1.1.0 schema

Development fixtures for the v0.83 development line, accepted under R26
(accepted in part 2026-10-07). These fixtures are non-qualifying and support no conformance claim.

Tests the structural rules of `schemas/refusal-receipt-1.1.0.schema.json` that R26-A05 does not already cover. Under R26-A10 Option A, `gate_code` stays required.

**Requirement IDs:** `GKOS-AUTHUSE-005`, `GKOS-PROFILE-005`.

**Evaluation:** Schema, with the runner's Ajv 2020 configuration. `input_refs` items use the shared R26-S03 definition `gkx-common.defs.json#/$defs/artifactReferenceAnyDigest`, which accepts either digest form.

## Cases

| Case | Title | Expected | Reason |
| --- | --- | --- | --- |
| R26-S02-01 | Refusal Receipt 1.0.0 stays valid under its own schema | `valid` against `refusal-receipt.schema.json` | Version 1.0.0 receipts remain valid historical evidence, including this one without an escalation route. |
| R26-S02-02 | Refusal Receipt 1.0.0 is not accepted as 1.1.0 | `invalid` against `refusal-receipt-1.1.0.schema.json` | Different schema_version; singular requirement_id; free-text refusal_effect; no operation_kind. |
| R26-S02-03 | 1.1.0 receipt using singular requirement_id | `invalid` against `refusal-receipt-1.1.0.schema.json` | requirement_ids replaces requirement_id. |
| R26-S02-04 | Empty requirement_ids | `invalid` against `refusal-receipt-1.1.0.schema.json` | One or more requirement IDs. |
| R26-S02-05 | Duplicate requirement_ids member | `invalid` against `refusal-receipt-1.1.0.schema.json` | requirement_ids is a set. |
| R26-S02-06 | Missing refusal_effect | `invalid` against `refusal-receipt-1.1.0.schema.json` | refusal_effect is required. |
| R26-S02-07 | Missing operation_kind | `invalid` against `refusal-receipt-1.1.0.schema.json` | operation_kind is required. |
| R26-S02-08 | Consequential-action refusal with both scope and defect | `invalid` against `refusal-receipt-1.1.0.schema.json` | Exactly one of requested_effect_scope and requested_effect_scope_defect. |
| R26-S02-09 | Other refusal with a defect | `invalid` against `refusal-receipt-1.1.0.schema.json` | An other refusal forbids the defect. |
| R26-S02-10 | L4-001 refusal without escalation route | `invalid` against `refusal-receipt-1.1.0.schema.json` | Escalation route required for L4-001. |
| R26-S02-11 | L4-002 refusal without escalation route | `invalid` against `refusal-receipt-1.1.0.schema.json` | Escalation route required for L4-002. |
| R26-S02-12 | L5-005 refusal without escalation route | `invalid` against `refusal-receipt-1.1.0.schema.json` | Escalation route required for L5-005. |
| R26-S02-13 | L7-003 refusal declaring kind other | `invalid` against `refusal-receipt-1.1.0.schema.json` | L7-002 and L7-003 require consequential-action. |
| R26-S02-14 | Input reference with a received-bytes digest | `valid` against `refusal-receipt-1.1.0.schema.json` | input_refs may use received-bytes digests (R26-S02, R26-A06). |
| R26-S02-15 | Received-bytes digest labelled GKX-CBOR-1 | `invalid` against `refusal-receipt-1.1.0.schema.json` | A digest is one form or the other; a received-bytes digest is not labelled GKX-CBOR-1. |

Each case also lists its requirement IDs in `cases.json`.
