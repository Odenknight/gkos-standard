# GKOS requirement profile applicability

**Status:** Normative companion mapping for R15 allocations on the v0.79 development line.  
**Authority:** R15.  
**Qualification boundary:** This mapping does not declare any GCP profile complete; the active fixture catalog remains the qualification authority.

| Requirement | GCP/profile applicability |
| --- | --- |
| `GKOS-RECEIPT-001..003` | Cross-cutting when an implementation commits governed state. Read-only implementations have no mutation obligation merely by reading/projecting. |
| `GKOS-POLICY-001` | GCP-4+ when a deployment policy/predicate participates in a GKOS control decision. |
| `GKOS-RETENTION-001..003` | GCP-4 for retention/disposition control; GCP-7 when deletion/disposition is consequentially executed. |
| `GKOS-REENTRY-001` | GCP-1. |
| `GKOS-REENTRY-002` | Cross-cutting standing invariant affecting any later profile that consumes re-entered material. |
| `GKOS-REENTRY-003` | GCP-1 plus applicable retention/disposition requirements. |
| `GKOS-REENTRY-004` | GCP-3; GCP-4 when bounded delegation is used. |
| `GKOS-DELEGATION-001..003` | GCP-4. |
| `GKOS-DELEGATION-004` | GCP-5. |
| `GKOS-DELEGATION-005` | GCP-4+. |
| `GKOS-DELEGATION-006` | GCP-5. |

## Interpretation rule

A higher GCP inherits applicable lower-profile requirements, but applicability remains conditional on implemented behavior. For example, a viewer that never commits governed state does not fail a mutation-receipt requirement merely because the requirement exists.

No profile claim is permitted unless the active catalog declares that profile complete and all of its required executable expectations pass under the conformance rules in `GKOS-CONFORMANCE-001..003`.
