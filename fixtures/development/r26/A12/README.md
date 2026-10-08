# R26-A12 fixtures — State-Change Receipt role elements

Development fixtures for proposed R26-A12 on the v0.83 development line.
They are non-qualifying and support no conformance claim.

- **Requirements:** GKOS-RECEIPT-001, GKOS-RECEIPT-002, GKOS-RECEIPT-003.
- **Normative text:**
  [Governed state change annex §1](../../../../standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md#1-universal-state-change-receipting)
  (R26-A12, proposed).
- **File:** `cases.json`. Each case gives a candidate record under its own
  field names, a `role_field_map` from the R26-A12 role elements to those
  fields, and the change context that makes conditional elements required
  (authority, policy, predicate, creation, deletion or erasure, and the binding
  mechanism the conformance manifest declares).

## Cases and expected results

| Case | Situation | Expected |
| --- | --- | --- |
| R26-A12-01 | Outcome `committed`, configuration change record | Satisfies the role |
| R26-A12-02 | Outcome `rolled-back` | Satisfies the role |
| R26-A12-03 | Outcome `compensated`, compensation identifier | Satisfies the role |
| R26-A12-04 | Outcome `refused` | Satisfies the role |
| R26-A12-05 | Creation, no prior state (ingestion receipt) | Satisfies the role; no before-state reference needed |
| R26-A12-06 | Erasure with a tombstone reference | Satisfies the role; the tombstone stands in for the after-state reference |
| R26-A12-07 | Update with no after-state binding | Does not satisfy the role; `after_state_ref` missing |
| R26-A12-08 | After-state reference without a digest | Does not satisfy the role; the reference is not digest-bound |

**Reason.** R26-A12 turns the role prose into an element checklist. Three
record styles with different field names show the role met "under its own
field names", with no dedicated receipt object where an existing record carries
every element. Cases 07 and 08 fail because the after-state reference must be
present and digest-bound.

**Reading noted for review.** R26-A12 requires an after-state reference for
every outcome except deletion or erasure. Cases 02 and 04 therefore bind the
after-state reference to the restored or unchanged state.

## Runner status

`NOT_MODELED` on the packet branch. The reference runner had no State-Change
Receipt role model; `evaluateGate` rejected the case as an unknown fixture kind. A role-element
checker is needed, as a new runner module or in GKOS-Engine. Packet R4 recorded
a scratch prototype outside the repository: before, 0 of 8 cases evaluable;
after, 8 of 8 as expected. The element-to-field map could later be carried by
`role_projections` in the conformance manifest (R26-S04).

## Reference runner after integration

Integration branch `work/v083-r26-implementation` (worker I2). Before is the
runner on `main` `8c20b05`; after is the integrated runner. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

`conformance/runner/state-change-receipt-role.mjs` (ported from packet R4)
checks each role element through the case's field map. It reports role
satisfaction, not a gate.

- Before: not modeled (0 of 8 evaluable).
- After: 8 of 8.

## Reference runner wave 2 and review corrections

Worker I3 on `work/v083-r26-implementation`. Before is the runner on `main`
`8c20b05`; after is the runner at the I3 head. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

Finding r26-REV-007. The role check now validates the policy digest's
representation: an object with algorithm `sha-256`, a lowercase hexadecimal
SHA-256 value, and at most one basis label (`canonical_profile` `GKX-CBOR-1`
or `basis` `received-bytes`). The same check applies to digest-bound state
references.

| Case | Policy digest | Expected |
| --- | --- | --- |
| R26-A12-09 | `false` | does not satisfy the role; `policy_digest` missing |
| R26-A12-10 | `{}` | does not satisfy the role; `policy_digest` missing |
| R26-A12-11 | `"not-a-digest"` | does not satisfy the role; `policy_digest` missing |
| R26-A12-12 | uppercase, short value | does not satisfy the role; `policy_digest` missing |

- Before (`main`): not modeled. At `192385b`: 09 to 12 satisfy the role.
- After: 12 of 12.
