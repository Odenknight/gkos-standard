# R26-A05 — Refusal Receipt content

Development fixtures for the v0.83 development line, accepted under R26
(accepted in part 2026-10-07). These fixtures are non-qualifying and support no conformance claim.

Tests the Refusal Receipt content added to annex §4 through the Refusal Receipt 1.1.0 schema (R26-S02, R26-A10 Option A).

**Requirement IDs:** `GKOS-AUTHUSE-005`, `GKOS-PROFILE-005`.

**Evaluation:** Schema. Each case validates against `schemas/refusal-receipt-1.1.0.schema.json` with the runner's Ajv 2020 configuration. Schema validation checks the receipt against the operation kind it declares. Each case's `evaluated_operation` states the refused operation and its D-1 class (`null` for an operation in no consequential class). `conformance/runner/operation-kind.mjs` checks that the declared `operation_kind` is correct for that operation: `consequential-action` for a D-1 class or a class added by a versioned policy, `other` otherwise. Classifying a live action into a D-1 class is R26-A01 and stays NOT_MODELED. Whether the cited requirement IDs apply to the operation is not checked. The drafted gateless case (R26-A10 Option B) does not apply, because the owner chose Option A; R26-A05-13 checks that a receipt without `gate_code` is rejected.

## Cases

| Case | Title | Expected | Reason |
| --- | --- | --- | --- |
| R26-A05-01 | L7-001 refusal citing GKOS-AUTHUSE-003 and GKOS-AUTHUSE-007 | `valid` against `refusal-receipt-1.1.0.schema.json` | The registry maps L7-001 to both requirements; requirement_ids carries both. |
| R26-A05-02 | Refusal effect block (expired authority, export not admitted) | `valid` against `refusal-receipt-1.1.0.schema.json` | block is an R26-A05 effect value. |
| R26-A05-03 | Refusal effect refuse (artifact with a duplicate map key) | `valid` against `refusal-receipt-1.1.0.schema.json` | refuse is an R26-A05 effect value. |
| R26-A05-04 | Refusal effect rollback (manifest mismatch found before commit) | `valid` against `refusal-receipt-1.1.0.schema.json` | rollback is an R26-A05 effect value. |
| R26-A05-05 | Refusal effect compensate (receipt binding failed after the effect applied) | `valid` against `refusal-receipt-1.1.0.schema.json` | compensate is an R26-A05 effect value. |
| R26-A05-06 | Refusal effect freeze (overdue review freezes the delegation) | `valid` against `refusal-receipt-1.1.0.schema.json` | freeze is an R26-A05 effect value; the refused change is a tag edit, so the operation kind is other. |
| R26-A05-07 | Refusal effect outside the R26-A05 values | `invalid` against `refusal-receipt-1.1.0.schema.json` | refusal_effect is an enumeration, not free text. |
| R26-A05-08 | L4-003 refusal without an escalation route | `invalid` against `refusal-receipt-1.1.0.schema.json` | GKOS-DELEGATION-002 routes the case to an authorized human; the receipt is incomplete without the route. |
| R26-A05-09 | L4-003 refusal with an escalation route | `valid` against `refusal-receipt-1.1.0.schema.json` | Control for R26-A05-08. |
| R26-A05-10 | L7 action refusal: L7-002 for a disclosure outside the deployment boundary, with requested scope | `valid` against `refusal-receipt-1.1.0.schema.json` | Disclosure outside the boundary is D-1 consequential; the scope as presented is carried. |
| R26-A05-11 | Non-L7 action refusal: L5-005 for a promotion to accepted proposed and reviewed by the same actor, with requested scope | `valid` against `refusal-receipt-1.1.0.schema.json` | Promotion to accepted is D-1 consequential regardless of the gate layer; L5-005 also requires the escalation route. |
| R26-A05-12 | Same L5-005 promotion refusal without requested scope or defect | `invalid` against `refusal-receipt-1.1.0.schema.json` | A consequential-action refusal carries exactly one of requested_effect_scope and requested_effect_scope_defect. |
| R26-A05-13 | Gateless action refusal (R26-A10 Option B branch) is not admitted under Option A | `invalid` against `refusal-receipt-1.1.0.schema.json` | The owner chose R26-A10 Option A (R26 section 7.1, Q4), so gate_code stays required. The positive Option A counterpart needs the L7 code that packet R3 allocates for a missing manifest binding. |
| R26-A05-14 | L7 action with no presented scope: L7-003 with defect absent | `valid` against `refusal-receipt-1.1.0.schema.json` | The defect replaces the scope; the input binds the received bytes by a received-bytes digest (R26-A06). |
| R26-A05-15 | Non-action refusal: L6-002 duplicate map key, kind other, no requested scope | `valid` against `refusal-receipt-1.1.0.schema.json` | An other refusal carries neither the scope nor the defect. |
| R26-A05-16 | Same L6-002 refusal carrying a requested scope | `invalid` against `refusal-receipt-1.1.0.schema.json` | An other refusal forbids requested_effect_scope. |
| R26-A05-17 | L7-002 receipt declaring operation kind other | `invalid` against `refusal-receipt-1.1.0.schema.json` | L7-002 and L7-003 arise only from effect-scope evaluation, so the operation kind is consequential-action. |

Each case also lists its requirement IDs in `cases.json`.

## Reference runner wave 2 and review corrections

Worker I3 on `work/v083-r26-implementation`. Before is the runner on `main`
`8c20b05`; after is the runner at the I3 head. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

- Before: 0 of 17 (the 1.1.0 schema does not exist on `main`).
- After: 17 of 17, each through the schema check and the operation-kind
  check. R26-A05-17 is schema-invalid and also declares the wrong kind
  (`other` for a disclosure outside the deployment boundary); R26-A05-16
  declares the right kind but carries a requested scope the kind forbids.
