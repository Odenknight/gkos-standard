# R26-A03 — Authority interval sources

Development fixtures for the v0.83 development line. R26 is proposed, not
accepted. These fixtures are non-qualifying and support no conformance claim.

Tests the interval rules proposed for annex §7.1: every receipt in the delegation chain must be valid at the evaluation time, the empty interval grants no authority, `issued_at` is not a validity bound, and the effect-scope window is a containment dimension.

**Requirement IDs:** `GKOS-AUTHUSE-003`, `GKOS-AUTHUSE-007`, `GKOS-DELEGATION-001`.

**Evaluation:** Semantic. At packet time the runner's `authority` kind accepted one window, so chain iteration (R26-A03-02..04) and the effect-scope window (R26-A03-07) were not modeled. The integrated runner evaluates each case as gate kind `authority-interval`; see the last section.

## Cases

| Case | Title | Expected | Reason |
| --- | --- | --- | --- |
| R26-A03-01 | Control: every link valid at evaluation time | admit | The evaluation time lies in the half-open interval of every receipt. |
| R26-A03-02 | Leaf valid, parent expired | refuse, `GKOS-GATE-L7-001` | The parent's valid_until is before the evaluation time; every link must be valid. |
| R26-A03-03 | Leaf valid, parent not yet valid | refuse, `GKOS-GATE-L7-001` | The parent's valid_from is after the evaluation time; every link must be valid. |
| R26-A03-04 | Parent valid_until equals evaluation time (half-open end) | refuse, `GKOS-GATE-L7-001` | Authority is expired exactly at valid_until (half-open interval), checked on each link. |
| R26-A03-05 | Empty interval: valid_from equals valid_until | refuse, `GKOS-GATE-L7-001` | A receipt whose valid_from is not earlier than its valid_until grants no authority. |
| R26-A03-06 | issued_at after evaluation time is not a validity bound | admit | issued_at records issuance; it is not a validity bound (R26-A03). Whether a receipt issued after the evaluation time is otherwise acceptable is outside R26-A03. |
| R26-A03-07 | Evaluation time inside every receipt interval but outside the authorizing effect-scope window | refuse, `GKOS-GATE-L7-002` | The effect applies from the evaluation time, which is before the authorizing scope's valid_from; the effect-scope window is a containment dimension under section 5.1. |

Each case also lists its requirement IDs in `cases.json`.

## Reference runner after integration

Integration branch `work/v083-r26-implementation` (worker I2). Before is the
runner on `main` `8c20b05`; after is the integrated runner. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

`evaluateAuthorityChain` checks the half-open interval of every receipt in
the chain (GKOS-GATE-L7-001). The effect-scope window is then checked as the
`valid_from`/`valid_until` containment row of section 5.1: a window stated by
one scope only is unknown (GKOS-GATE-L7-003), and a window not contained is
GKOS-GATE-L7-002.

- Before (leaf-only `authority` kind): 3 of 7 as expected; cases 02, 03, 04
  and 07 admit.
- After: 7 of 7.
