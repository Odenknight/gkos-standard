# GKOS requirement profile applicability

**Status:** Normative companion mapping for the GKOS v0.81 development line

**Authority:** R15 through R18

**Qualification boundary:** This mapping does not declare a GCP profile
complete. The active fixture catalog remains the qualification authority and
currently declares no qualifying profiles.

## 1. Required tiers

| Tier or claim | Required cumulative scope |
| --- | --- |
| GKOS Core | GCP-1 through GCP-5 |
| GKOS Advanced | GCP-1 through GCP-7 |
| GCP-6 Context-Only Extension | GKOS Core plus GCP-6; read-only and no consequential action under the claim |
| Viewer/Projection Profile | Independent read-only projection claim |

GCP-1 through GCP-4 MAY be assessed and reported individually. They do not
constitute full GKOS Core conformance.

## 2. Applicability

| Requirement | GCP/profile applicability |
| --- | --- |
| GKOS-CONFORMANCE-001..003 | Every claim and conformance run |
| GKOS-IDENTITY-001..004 | GCP-2+ when GKX governed identities are authored or consumed as specified |
| GKOS-LINEAGE-001..003 | GCP-3+ when lineage or supersession is represented |
| GKOS-RECEIPT-001..003 | Cross-cutting when governed state is committed; read-only use has no mutation obligation |
| GKOS-POLICY-001 | GCP-4+ when a deployment policy or predicate participates in control |
| GKOS-RETENTION-001..003 | GCP-4 for retention/disposition control; GCP-7 when deletion/disposition is executed |
| GKOS-REENTRY-001 | GCP-1 |
| GKOS-REENTRY-002 | Cross-cutting standing invariant affecting later consumption |
| GKOS-REENTRY-003 | GCP-1 plus applicable retention/disposition requirements |
| GKOS-REENTRY-004 | GCP-3; GCP-4 when bounded delegation is used |
| GKOS-DELEGATION-001..003 | GCP-4 when delegation is supported |
| GKOS-DELEGATION-004 | Historical human-only review wording superseded on the v0.81 development line by GKOS-REVIEW-001..003 |
| GKOS-DELEGATION-005 | GCP-4+ whenever bounded delegation is used |
| GKOS-DELEGATION-006 | GCP-5 whenever deferred review governs continued delegation |
| GKOS-PROFILE-001..006 | Every Core, Advanced, or Context-Only claim as applicable |
| GKOS-PROFILE-007 | Viewer/Projection Profile |
| GKOS-CANON-001..007 | GCP-6 and GCP-7 canonical artifacts; any lower-profile artifact claiming canonical GKX-CBOR-1 identity |
| GKOS-CANON-008 | GCP-6, GCP-7, and the Context-Only Extension |
| GKOS-CONTEXT-001..005 | GCP-6+ and the Context-Only Extension; GKOS-CONTEXT-005 applies when a manifest supports Layer-5 review |
| GKOS-AUTHUSE-001..007 | GCP-7 |
| GKOS-REVIEW-001..004 | GCP-5; the basic governed review lifecycle is mandatory for GKOS Core |
| GKOS-DISCLOSURE-001 | GCP-4+ and GCP-7 when protected information is processed or disclosed |
| GKOS-EFFECT-001..003 | GCP-7 and any lower-layer operation whose mandatory control depends on typed effect scope |

## 3. Interpretation rules

A higher GCP inherits every applicable lower-profile requirement.

Conditional applicability describes behavior genuinely absent from the
declared implementation and deployment scope. It does not permit a claimant to
exclude a required capability that it performs or exposes.

An applicable required capability cannot be waived while retaining the profile
claim. A mandatory block, refusal, fail-closed, rollback-before-commit, or
authority-freeze gate can never be excluded.

A Context-Only Extension grants no action authority. If its manifest governs a
consequential action, GCP-7 applies.

No profile claim is permitted unless the active catalog declares the profile
complete and every required executable expectation passes under
GKOS-CONFORMANCE-001..003 and GKOS-PROFILE-005.
