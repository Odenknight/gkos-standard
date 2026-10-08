# R26-A10 fixtures — gate codes under GKOS-PROFILE-005 (Option A)

<!-- R26-A10 (accepted 2026-10-07; v0.83 development line) -->

**Status:** development fixtures for R26 (accepted in part 2026-10-07), owner answer Q4
Option A. They grant no profile claim and are not part of the active
qualifying catalog.

**File:** `cases.json`. Each case is a portable baseline/mutation twin in the
format of `fixtures/track-a/cases.json`, run by the reference evaluator
(`conformance/runner/gate-evaluator.mjs`). The baseline must stay open; the
mutation must close the expected registered code. The cases test the
evaluator predicates only. They do not test receipts, protected state or a
real implementation's detection of the condition.

## Expected results and reasons

One violation fixture per affected requirement, as R26-A10 lists them.

| Case | Requirement | Expected | Mutation |
| --- | --- | --- | --- |
| R26-A10-REENTRY-002 | GKOS-REENTRY-002 | GKOS-GATE-L1-002 | The re-entered source inherits authorized-use standing. |
| R26-A10-REENTRY-003 | GKOS-REENTRY-003 | GKOS-GATE-L1-003 | Re-entry destroys the predecessor. |
| R26-A10-IDENTITY-003 | GKOS-IDENTITY-003 | GKOS-GATE-L2-001 | A migration replaces a legacy UUIDv4 identity with a UUIDv7. |
| R26-A10-LINEAGE-003 | GKOS-LINEAGE-003 | GKOS-GATE-L3-002 | A lineage successor is selected by timestamp. |
| R26-A10-POLICY-001 | GKOS-POLICY-001 | GKOS-GATE-L4-005 | An implementation default replaces the declared predicate. |
| R26-A10-RETENTION-001 | GKOS-RETENTION-001 | GKOS-GATE-L4-006 | Disposition is committed without consulting the hold predicate. |
| R26-A10-RETENTION-002 | GKOS-RETENTION-002 | GKOS-GATE-L4-006 | Disposition is committed without binding the hold result. |
| R26-A10-DELEGATION-001 | GKOS-DELEGATION-001 | GKOS-GATE-L4-007 | The delegation outlives its source authority. |
| R26-A10-DELEGATION-005 | GKOS-DELEGATION-005 | GKOS-GATE-L4-008 | The delegation confers general write authority. |
| R26-A10-CONTEXT-002 | GKOS-CONTEXT-002 | GKOS-GATE-L6-010 | Deterministic assembly makes a model call. |
| R26-A10-AUTHUSE-001 | GKOS-AUTHUSE-001 | GKOS-GATE-L7-008 | The Authorized Use Record omits the manifest canonical hash. |

GKOS-GATE-L1-001 (in-place merge into the predecessor) and GKOS-GATE-L1-003
(other mutation or destruction of the predecessor) overlap. Under R26-A09 the
in-place merge keeps L1-001, the more specific code.

## Before and after the reference change

Before (base `e1aa08a`): no code was registered and the evaluator rejected
every twin with "invalid or unknown gate fixture kind". All eleven cases
failed.

After: every baseline returns no gate and every mutation returns the expected
code. All eleven cases pass. Missing or mistyped evidence closes the same
code. Executed by `conformance/runner/test/r26-development.test.mjs`, and by
`registry-lint.mjs` once the coordinator's catalog
`fixtures/development/r26/fixtures.manifest.json` binds the cases with
`"file": "development/r26/A10/cases.json"`.
