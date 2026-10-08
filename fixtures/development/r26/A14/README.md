# R26-A14 fixtures — Overdue review and exceptions

Development fixtures for R26-A14 (accepted 2026-10-07) on the v0.83 development line.
They are non-qualifying and support no conformance claim.

- **Requirement:** GKOS-DELEGATION-006 (gate code GKOS-GATE-L5-001).
- **Normative text:**
  [Governed state change annex §6](../../../../standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md#6-bounded-supersession-delegation)
  (R26-A14, accepted 2026-10-07).
- **Depends on:** R26-A01 Annex Definitions D-2 (precedence; R26-A01 stays
  proposed and its annex is not on `main`) and R26-S07
  `review_deadline_seconds` on the Authority Receipt. The fixtures carry the
  precedence relation and the deadline as fixture inputs.
- **File:** `cases.json`. Each record uses the portable gate fixture interface,
  kind `deferred-review`, with the inputs R26-A14 defines in place of the
  precomputed `overdue` boolean: `review_deadline_seconds`, per-action
  `commit_time` and `review_status`, `evaluation_time`, and an optional
  `exception`.

## Cases and expected results

Commit time `2026-10-01T00:00:00.000000Z` and a deadline of 86400 seconds put
the review due at `2026-10-02T00:00:00.000000Z`.

| Case | Situation | Expected |
| --- | --- | --- |
| R26-A14-01 | Evaluation one microsecond before the deadline | Change authorized |
| R26-A14-02 | Evaluation exactly at the deadline | GKOS-GATE-L5-001 |
| R26-A14-03 | No review deadline declared | GKOS-GATE-L5-001 |
| R26-A14-04 | Exception from an equal-precedence authority | GKOS-GATE-L5-001 |
| R26-A14-05 | Valid higher-precedence exception | Change authorized |
| R26-A14-06 | Commit time unavailable | GKOS-GATE-L5-001 |
| R26-A14-07 | Review status indeterminate | GKOS-GATE-L5-001 |
| R26-A14-08 | Past the deadline, review disposition recorded | Change authorized |
| R26-A14-09 | One of two reviews overdue | GKOS-GATE-L5-001 |
| R26-A14-10 | Exception without `valid_until` | GKOS-GATE-L5-001 |
| R26-A14-11 | Exception `valid_until` equal to the evaluation time | GKOS-GATE-L5-001 |
| R26-A14-12 | Exception not bound in the State-Change Receipt role record | GKOS-GATE-L5-001 |
| R26-A14-13 | Exception does not name the delegation | GKOS-GATE-L5-001 |

**Reason.** Cases 01 to 05 are the R26-A14 fixture list. Cases 06 to 13 each
test one sentence of the drafted text: unavailable or indeterminate inputs
count as overdue, "any review" freezes the delegation, and an exception must
name the delegation, carry `valid_until` and be bound in the receipt. Case 11
treats `valid_until` as exclusive, as the reference authority window does for
GKOS-AUTHUSE-007.

## Runner status

The runner evaluates kind `deferred-review` only from a precomputed `overdue`
boolean. Before the change every case returned GKOS-GATE-L5-001 because the
record shape is rejected: 10 of 13 match, all by shape rejection, and cases 01,
05 and 08 fail. A scratch prototype of the runner change (packet R4, outside
the repository; runner changes belong to packet R3) gives 13 of 13 and leaves
the Track-A twins unchanged.

## Reference runner after integration

Integration branch `work/v083-r26-implementation` (worker I2). Before is the
runner on `main` `8c20b05`; after is the integrated runner. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

`evaluateReviewDeadline` (packet R4's patch) computes overdue review from
`review_deadline_seconds`, commit times, review status and the evaluation time
at microsecond precision, and checks the higher-precedence exception. Records
with the legacy `overdue` boolean keep their result.

- Before: 10 of 13, all by shape rejection; 01, 05 and 08 fail.
- After: 13 of 13. Track-A twins unchanged.

## Reference runner wave 2 and review corrections

Worker I3 on `work/v083-r26-implementation`. Before is the runner on `main`
`8c20b05`; after is the runner at the I3 head. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

Finding r26-REV-006. `evaluateReviewDeadline` validates each action's commit
time before the disposition shortcut, so an unavailable or indeterminate
commit time counts as overdue even when a disposition is recorded.

| Case | Change from R26-A14-08 | Expected |
| --- | --- | --- |
| R26-A14-14 | `commit_time` `null` | refuse, GKOS-GATE-L5-001 |
| R26-A14-15 | `commit_time` `"invalid"` | refuse, GKOS-GATE-L5-001 |

- Before (`main`): 14 and 15 refuse by shape rejection only. At `192385b`:
  both admit.
- After: 15 of 15.
