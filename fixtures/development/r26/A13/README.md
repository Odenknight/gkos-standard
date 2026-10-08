# R26-A13 — Satisfying a role with an existing record

Development fixtures for the v0.83 development line. R26 is proposed, not
accepted. These fixtures are non-qualifying and support no conformance claim.

Tests the role-projection rule proposed for annex §1: a Decision Record satisfies the Refusal Receipt role through a declared projection that sets envelope constants and maps every other element from one source field by copy, wrap as a one-element set, or a declared value table.

**Requirement IDs:** `GKOS-AUTHUSE-005`, `GKOS-REVIEW-001`.

**Evaluation:** Role projection. `source.decision-record.json` is valid under the current open sidecar schema `schemas/decision-record.schema.json`, as R26-A13 drafts it. The canonical Decision Record of R26-S05 has closed properties and cannot carry the refusal fields, so it is not the source schema here. `projection.decision-record-to-refusal-receipt.json` is a fixture stand-in for the conformance-manifest `role_projections` declaration of R26-S04; it is to be re-expressed in that shape at integration. `expected.role-object.json` is the role object the positive case builds. Role-object validation uses the runner's Ajv 2020 configuration against `schemas/refusal-receipt-1.1.0.schema.json`. `conformance/runner/role-projection.mjs` (`evaluateRoleProjection`) checks the projection declaration, validates the source against its own schema, builds the role object from the envelope constants and the field mappings, and validates it against the role schema. The Option B branch of the `gate_code` case does not apply, because the owner chose R26-A10 Option A.

## Cases

| Case | Title | Expected | Reason |
| --- | --- | --- | --- |
| R26-A13-01 | Decision Record satisfies the Refusal Receipt role through the declared projection | satisfies the role | Every role element comes from one source field or an envelope constant; the role object validates against the R26-S02 schema; the source keeps its own artifact_type and hash. |
| R26-A13-02 | Projection omits the refusal_effect mapping | does not satisfy the role (role-schema) | R26-S02 always requires refusal_effect. |
| R26-A13-03 | Projection omits the gate_code mapping | does not satisfy the role (role-schema) | Under R26-A10 Option A (owner answer Q4) gate_code stays required, so the role object fails the role schema. The Option B branch of this case does not apply. |
| R26-A13-04 | Source disposition deferred, which the value table does not list | does not satisfy the role (value-table) | A source value missing from the table means the record does not satisfy the role. |
| R26-A13-05 | Source decided_at 2026-10-01T14:00:00Z (valid for the source, not canonical for the role) | does not satisfy the role (role-schema) | The projection copies the value unchanged and may not reformat it; the role's canonical timestamp rejects it. |
| R26-A13-06 | Projection sets gate_code by a constant | does not satisfy the role (projection-declaration) | Only canonical_profile, artifact_type and schema_version may be set by a constant. The role object would validate, so the defect is in the declaration. |
| R26-A13-07 | Projection reads artifact_type from the source record | does not satisfy the role (projection-declaration) | Envelope constants are never read from the source. The copied value decision-record also fails the role schema's constant. |

Each case also lists its requirement IDs in `cases.json`.

## Reference runner wave 2 and review corrections

Worker I3 on `work/v083-r26-implementation`. Before is the runner on `main`
`8c20b05`; after is the runner at the I3 head. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

- Before: NOT_MODELED (0 of 7; no projection builder).
- After: 7 of 7. 01 builds a role object equal to
  `expected.role-object.json`. 02, 03 and 05 fail the role schema; 04 fails
  on the value table; 06 and 07 fail the declaration check. The runner also
  reports that the role object of 06 would validate and that of 07 would not.

## Second-round review correction (r26-REV-010)

Worker I4 on `work/v083-r26-implementation`. The annex permits a value table
only to translate an enumerated value; a timestamp or identifier is not
reformatted. The declaration check now requires, for every `value-table`
mapping, that the source schema declares the source field enumerated (`enum`
or `const`), that the role schema declares the role element enumerated, and
that every table entry maps a declared source value to a declared role value.
A `$ref`, bare `type`, `pattern` or `format` does not make a field enumerated,
so timestamp, identifier and digest fields cannot take a value table. A value
table without a readable source schema fails closed.

| Case | Title | Expected | Reason |
| --- | --- | --- | --- |
| R26-A13-08 | Value table reformats `decided_at` into the canonical timestamp | projection-declaration | Reviewer mutation; without the rule the role object equals the positive expected role object. |
| R26-A13-09 | Value table rewrites the `decision_id` identifier | projection-declaration | Identifiers are not reformatted or replaced. |
| R26-A13-10 | Value table converts a `proposal_hash` digest into `receipt_id` | projection-declaration | Digests are not converted. |
| R26-A13-11 | Value table maps `rejected` to `denied` | projection-declaration | `denied` is not a declared value of the role element `result`. |

- Before (runner at `f0f189a`): 08, 09 and 10 satisfy the role; 11 fails the
  role schema, not the declaration (all fail). Before (`main` `8c20b05`):
  NOT_MODELED.
- After: 11 of 11. The declared `disposition` to `result` table of 01 stays
  valid.
