# GKOS master standard

GKOS governs evidence, authority, context, validation, review, and authorized
use. The current technical exchange contract remains GKX 2.0. Canonical
governed artifacts use the GKX-CBOR-1 profile adopted by R16.

GKOS-2026-08-20 v0.80 is an owner-authorized developmental publication, not a
consensus ratification, independent certification, accreditation, or
regulatory approval. Prior master texts and release packages remain immutable
historical evidence.

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
