# R15 overlap traceability for provisional SRTP fixtures

**Status:** Informative traceability only. SRTP remains provisional, informative, non-normative, and non-qualifying.

R15 deliberately does not re-key or promote existing SRTP fixtures. Where an SRTP adversarial scenario exercises a mechanism now covered by a permanent core requirement, the relationship is evidence overlap only.

| SRTP fixture | R15/core overlap | Standing |
| --- | --- | --- |
| `srtp-n07-model-conflicts-deterministic` | `GKOS-DELEGATION-003` — non-deterministic checker may increase restriction only | SRTP provisional; retain identity; separate domain-neutral core fixture required for qualification |
| `srtp-n11-receipt-unavailable` | `GKOS-RECEIPT-003` — receipt-binding failure cannot become committed state | SRTP provisional; retain identity; separate core fixture required |
| SRTP re-entry positive/negative fixtures | `GKOS-REENTRY-001..004` as applicable | SRTP scientific-profile evidence; not automatically a core conformance fixture |

Additional overlaps MUST be added explicitly rather than inferred from similar names or outcomes.

Fixture accounting must continue to report active core, provisional SRTP, and implementation-only tests separately.
