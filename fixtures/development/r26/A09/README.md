# R26-A09 fixtures — most specific gate code

<!-- R26-A09 (accepted 2026-10-07; v0.83 development line) -->

**Status:** development fixtures for R26 (accepted in part 2026-10-07). They grant no profile
claim and are not part of the active qualifying catalog.

**Requirement IDs:** GKOS-CANON-002 (and GKOS-CANON-001 for the controls).

**File:** `canonical-bytes.json`. Each case is a CBOR byte string in hex, run
through the reference canonical verifier
(`conformance/runner/canonical.mjs`, `verifyCanonicalBytes`).

## Expected results and reasons

| Case | Bytes | Expected | Reason |
| --- | --- | --- | --- |
| R26-A09-P01 | map `{a:1, b:2}`, keys sorted | accepted | Positive control. |
| R26-A09-N01 | duplicate key `a` | GKOS-GATE-L6-002 | A duplicate map key is L6-002, the most specific code. |
| R26-A09-N02 | keys `b`, `a` | GKOS-GATE-L6-002 | Out-of-order keys are L6-002 even when found by re-encoding comparison. |
| R26-A09-N03 | nested map with keys `z`, `a` | GKOS-GATE-L6-002 | The rule applies at any depth. |
| R26-A09-N04 | indefinite-length map with keys out of order | L6-001 or L6-002 | Two independent conditions; the fixture lists both acceptable codes. |
| R26-A09-C01 | indefinite-length array | GKOS-GATE-L6-001 | No other L6 code names this defect. |
| R26-A09-C02 | sorted map with a non-shortest integer head | GKOS-GATE-L6-001 | No other L6 code names this defect. |

## Before and after the reference change

The runner change is the L6 fix noted in GAP-010.

| Case | Before (base `e1aa08a`) | After |
| --- | --- | --- |
| R26-A09-P01 | accepted | accepted |
| R26-A09-N01 | GKOS-GATE-L6-001 (fail) | GKOS-GATE-L6-002 (pass) |
| R26-A09-N02 | GKOS-GATE-L6-001 (fail) | GKOS-GATE-L6-002 (pass) |
| R26-A09-N03 | GKOS-GATE-L6-001 (fail) | GKOS-GATE-L6-002 (pass) |
| R26-A09-N04 | GKOS-GATE-L6-001 (pass) | GKOS-GATE-L6-002 (pass) |
| R26-A09-C01 | GKOS-GATE-L6-001 (pass) | GKOS-GATE-L6-001 (pass) |
| R26-A09-C02 | GKOS-GATE-L6-001 (pass) | GKOS-GATE-L6-001 (pass) |

Executed by `conformance/runner/test/r26-development.test.mjs`.
