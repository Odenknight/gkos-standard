# R26-S01 — Authority Receipt and Authorized Use Record 1.1.0

Development fixtures for the v0.83 development line. R26 is proposed, not
accepted. These fixtures are non-qualifying and support no conformance claim.

Tests `schemas/authority-receipt-1.1.0.schema.json` (adds `subject`, `tenant_scope`, `revocation.locator`) and `schemas/authorized-use-record-1.1.0.schema.json` (from the R17 candidate, with required `revocation_checks`). Earlier versions stay valid for historical artifacts.

**Requirement IDs:** `GKOS-AUTHUSE-001`, `GKOS-AUTHUSE-003`, `GKOS-AUTHUSE-007`.

**Evaluation:** Schema, with the runner's Ajv 2020 configuration.

## Cases

| Case | Title | Expected | Reason |
| --- | --- | --- | --- |
| R26-S01-01 | Authority Receipt 1.1.0 with subject, tenant_scope and revocation.locator | `valid` against `authority-receipt-1.1.0.schema.json` | All annex section 2 fields that S01 adds are present. |
| R26-S01-02 | Authority Receipt 1.1.0 without subject | `invalid` against `authority-receipt-1.1.0.schema.json` | Annex section 2 requires the subject; S01 adds it as required. |
| R26-S01-03 | Authority Receipt 1.1.0 without revocation.locator | `invalid` against `authority-receipt-1.1.0.schema.json` | Annex section 2 requires the revocation locator. |
| R26-S01-04 | Authority Receipt 1.0.0 stays valid under its own schema | `valid` against `authority-receipt.schema.json` | Earlier versions stay valid for historical artifacts (R26 section 5). |
| R26-S01-05 | Authority Receipt 1.0.0 is not silently accepted as 1.1.0 | `invalid` against `authority-receipt-1.1.0.schema.json` | Each (artifact_type, schema_version) pair identifies one schema. |
| R26-S01-06 | Authorized Use Record 1.1.0 binding one revocation check per chain receipt | `valid` against `authorized-use-record-1.1.0.schema.json` | R26-A04: the record binds the checks it relied on. |
| R26-S01-07 | Authorized Use Record 1.1.0 without revocation_checks | `invalid` against `authorized-use-record-1.1.0.schema.json` | S01 makes revocation_checks required. |
| R26-S01-08 | Authorized Use Record 1.1.0 with an empty revocation_checks set | `invalid` against `authorized-use-record-1.1.0.schema.json` | Every action has at least the authority-basis receipt to check (R26-A04). |
| R26-S01-09 | Revocation check with a status outside the receipt status vocabulary | `invalid` against `authorized-use-record-1.1.0.schema.json` | Status uses the Authority Receipt vocabulary: not-revoked, revoked, indeterminate. |
| R26-S01-10 | R17 candidate record stays valid under the R17 candidate schema | `valid` against `authorized-use-record.r17.schema.json` | Earlier versions stay valid for historical artifacts. |
| R26-S01-11 | R17 candidate record is not accepted as 1.1.0 | `invalid` against `authorized-use-record-1.1.0.schema.json` | schema_version 1.1.0-development is a different pair; the record also lacks revocation_checks. |

Each case also lists its requirement IDs in `cases.json`.
