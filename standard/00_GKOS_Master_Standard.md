# GKOS master standard

Publication classification: **developmental specification; public working draft**.
The existing project name, acronym GKOS, titles and identifiers are retained.
This classification establishes no consensus or certification standing. See the
[conformance-claims policy](../conformance/CLAIMS_POLICY.md).

GKOS governs evidence, authority, context, validation, review, and authorized
use. The current technical exchange contract remains GKX 2.0. Canonical
governed artifacts use the GKX-CBOR-1 profile adopted by R16.

This prepared edition is GKOS-2026-09-24 v0.82.1, a documentation patch of the
developmental specification / public working draft (not yet published).
Publication is owner-authorized under the
[v0.82.1 publication control](../docs/releases/V0821_PUBLICATION_CONTROL.md),
subject to successful exact-candidate checks and verified signed publication.
The latest verified publication remains GKOS-2026-09-22 v0.82; its
[publication receipt](../docs/releases/GKOS_2026-09-22_v0.82_PUBLICATION_RECORD.md)
preserves its own DOI and evidence. No v0.82.1 DOI is asserted.
The normative population remains 62 permanent allocations and 28 mandatory
diagnostic gate codes. GKX 2.0 is unchanged. R22 is informative and R23 remains
prospective. No profile qualifies; no certification, accreditation or consensus
standing is claimed. Historical titles, identifiers and packages are preserved.
See the [v0.82.1 package](../releases/2026-09-24-v0.82.1/README.md).

R17 adds captured-time authority validity intervals; R18 consolidates GCP-4/5
review and protected-disclosure contracts; R19 prospectively adopts the eighth
documentation-intent invariant. R20 controlled v0.81 publication; R24 controls v0.82. See the
[v0.81 release package](../releases/2026-09-03-v0.81/README.md) and
[publication binding](../docs/implementation/V081_PUBLICATION_BINDING.md).

## Normative surface

The master standard, permanent requirement registry, profile applicability
mapping, and normative annexes form one controlled surface.

R15 governs State-Change Receipt roles, retention/disposition, Layer-1 re-entry,
explicit supersession, and bounded delegation:

- [Governed state change, re-entry, retention, and bounded delegation](annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md)

R16 governs required profile tiers, deterministic canonical serialization,
Context Manifest replay, authorized-use binding, refusal diagnostics, and typed
effect scope:

- [Canonical serialization](annexes/Canonical_Serialization.md)
- [Authority and refusal receipt fields](annexes/Authority_and_Refusal_Receipt_Fields.md)
- [Diagnostic-code registry](annexes/Diagnostic_Code_Registry.md)
- [Conformance profiles](annexes/Conformance_Profiles.md)
- [Layer interface contracts](annexes/Layer_Interface_Contracts.md)
- [Permanent requirement registry](../requirements/REGISTRY.md)
- [Requirement profile applicability](../requirements/PROFILE_APPLICABILITY.md)

The [R15 Decision Record](../decisions/R15_Governed_State_Change_Reentry_and_Bounded_Delegation_Development_Decision_Record.md)
and [R16 Decision Record](../decisions/R16_Required_Conformance_Profiles_and_GCP67_Enablement_Development_Decision_Record.md)
record the owner-authorized, non-consensus dispositions.

## Current claim boundary

GKOS Core requires GCP-1 through GCP-5. GKOS Advanced requires GCP-1 through
GCP-7. The named GCP-6 Context-Only Extension is read-only and grants no
consequential-action authority. Viewer/Projection remains independently
claimable.

The active fixture catalog declares no qualifying profile. Publication of
normative contracts and schemas does not establish implementation conformance.

NAV-001 remains informative and non-qualifying. NAV-002 remains eligible for
drafting but is not made qualifying by R16. SRTP remains provisional,
informative, and non-qualifying.
