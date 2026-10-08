# R26-A15 fixtures — Hold-predicate results

Development fixtures for R26-A15 (accepted 2026-10-07) on the v0.83 development line.
They are non-qualifying and support no conformance claim.

- **Requirements:** GKOS-RETENTION-001 and GKOS-RETENTION-003 (gate codes
  GKOS-GATE-L4-001 and GKOS-GATE-L4-002; the GKOS-RETENTION-001 code is
  allocated under R26-A10 Option A).
- **Normative text:**
  [Governed state change annex §3](../../../../standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md#3-retention-and-disposition)
  (R26-A15, accepted 2026-10-07).
- **File:** `cases.json`. Each record uses the portable gate fixture interface,
  kind `hold`, with the R26-A15 result vocabulary (`no-hold`, `hold`,
  `unavailable`, `indeterminate`) and the bound predicate identity, version,
  digest and evaluation time.

## Cases and expected results

| Case | Result | Erasure obligation | Expected |
| --- | --- | --- | --- |
| R26-A15-01 | `no-hold` | no | Commits |
| R26-A15-02 | `hold` | no | Does not commit; refusal cites GKOS-RETENTION-001 with GKOS-GATE-L4-009 |
| R26-A15-03 | `hold` | yes | GKOS-GATE-L4-002, routed for human disposition |
| R26-A15-04 | `unavailable` | no | GKOS-GATE-L4-001, routed for human disposition |
| R26-A15-05 | `indeterminate` | no | GKOS-GATE-L4-001, routed for human disposition |
| R26-A15-06 | `no-hold` | yes | Commits; no conflict |
| R26-A15-07 | `clear` (legacy) | no | Commits; `clear` maps to `no-hold` |

**Reason.** R26-A15 fixes the result vocabulary and states the behavior for a
plain `hold`, which the current text leaves open. Case 07 records the
compatibility mapping R26-A15 states.

**Pending code (superseded).** This paragraph records the state before the
owner answer of 2026-10-07 (second round); see the last section. Case 02 had
`gate_code: null` with `gate_code_pending`.
R26-A10 allocated GKOS-GATE-L4-006 for "deletion or disposition committed
without the hold predicate, or without its bound result". A correct refusal on
`hold` is not that condition, so whether the refusal carries L4-006 is an open
owner question. The case and its manifest row keep the code pending.

## Runner status

The runner evaluates kind `hold` with the vocabulary `clear`, `unavailable`,
`indeterminate` and a separate `hold_required` boolean. Before the change every
case returns GKOS-GATE-L4-001 by shape rejection: 2 of 7 match (04, 05) and
5 fail. A scratch prototype of the runner change (packet R4, outside the
repository; runner changes belong to packet R3) gives 7 of 7, with case 02
returning a placeholder until R3 allocates the code, and leaves the Track-A
twins unchanged.

## Reference runner after integration

Integration branch `work/v083-r26-implementation` (worker I2). Before is the
runner on `main` `8c20b05`; after is the integrated runner. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

The `hold` kind (packet R4's patch) accepts `no-hold`, `hold`, `unavailable`,
`indeterminate` and legacy `clear`. A plain `hold` refuses with the marker
`PENDING-OWNER-DECISION:GKOS-RETENTION-001`, which is not a registered code;
the catalog row records the refusal and leaves the code pending.

- Before: 2 of 7 (04, 05), by shape rejection.
- After: 7 of 7, case 02 refusing with the pending marker. Track-A twins
  unchanged.

## Owner answer: GKOS-GATE-L4-009 (worker I4)

The owner answered the A15-02 question on 2026-10-07 (R26 §7.2): a refusal on
`hold` carries a new, separate L4 code meaning "disposition refused: active
hold". GKOS-GATE-L4-009, the next free L4 number after L4-008, is allocated in
the [Diagnostic-code registry](../../../../standard/annexes/Diagnostic_Code_Registry.md)
and `requirements/DIAGNOSTIC_CODES.json`, mapped to GKOS-RETENTION-001. It is
distinct from GKOS-GATE-L4-006 (commit without the hold predicate or its bound
result). The annex §3 paragraph cites it under an R26-A15 marker.

- Case 02 now expects GKOS-GATE-L4-009 (`gate_code_basis` names the owner
  answer). Its catalog row is EXECUTED.
- `twins.json` holds the executable baseline/mutation twin
  `R26-A15-HOLD-TWIN` (`no-hold` stays open; `hold` closes L4-009), which
  `registry-lint.mjs --require-mutation-coverage` executes.
- Before (runner at `main` `8c20b05`): case 02 fails (shape rejection,
  GKOS-GATE-L4-001); the twin fails. Before (runner at `f0f189a`): case 02
  refuses with the unregistered pending marker (fails); the twin fails.
- After: 8 of 8. Track-A hold twins unchanged.
