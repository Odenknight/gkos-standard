# GKOS development decision register

This register indexes adopted v0.x development decisions. These records document Founder/Initial Editor dispositions during testing and refinement; they are not consensus ratification, independent certification, accreditation, or regulator approval.

## R17 — Authority validity interval semantics

- **Date:** 2026-08-21
- **Status:** Accepted development decision; unpublished amendment
- **Decision:** Use the half-open authority interval `valid_from <= evaluation_time < valid_until`; bind evaluation to captured canonical time at the consequential-effect admission boundary; fail closed before validity, at or after expiry, or when required time evidence is missing or indeterminate; preserve protected state and emit a Refusal Receipt under the existing L7 authority gate.
- **Record:** [R17_Authority_Validity_Interval_Development_Decision_Record.md](R17_Authority_Validity_Interval_Development_Decision_Record.md)

## R16 — Required profiles and GCP-6/GCP-7 enablement

- **Date:** 2026-08-20
- **Status:** Accepted development decision; v0.x non-consensus authority
- **Decision:** Establish GKOS Core at GCP-1 through GCP-5 and GKOS Advanced at GCP-1 through GCP-7; bind GCP-6 and GCP-7 except for a named read-only Context-Only Extension; require behavior-based coverage and executable refusal evidence for every mandatory gate; establish stable gate codes; preserve exact-release and assessment-type claim binding; adopt deterministic GKX-CBOR-1 serialization, captured selection and deterministic assembly, Layer-5/6/7 manifest hash binding, distinct actor roles, typed effect scope, and the Refusal Receipt semantic role; publish all changes together as the breaking pre-v1.0 v0.80 release while keeping every profile non-qualifying until the active catalog is complete and passing.
- **Record:** [R16_Required_Conformance_Profiles_and_GCP67_Enablement_Development_Decision_Record.md](R16_Required_Conformance_Profiles_and_GCP67_Enablement_Development_Decision_Record.md)

## R15 — Governed state change, re-entry, and bounded delegation

- **Date:** 2026-08-15
- **Status:** Accepted development decision; v0.x non-consensus authority
- **Decision:** Adopt State-Change Receipt as a semantic role with durable mutation binding; preserve standard-owned vocabulary while making jurisdictional criteria deployment-bound; formalize Layer-1 re-entry without inherited standing; require explicit supersession; adopt bounded, attenuated supersession delegation with deterministic routine/major classification, one-way non-deterministic escalation, deferred review, and overdue-grant freeze; keep NAV-001 informative and NAV-002 unblocked-but-undrafted; separate active, provisional, and implementation fixture counts; adopt Zenodo for v0.x archival; authorize Engine 2.1 source-content-read-only Navigation before a later writer.
- **Record:** [R15_Governed_State_Change_Reentry_and_Bounded_Delegation_Development_Decision_Record.md](R15_Governed_State_Change_Reentry_and_Bounded_Delegation_Development_Decision_Record.md)

## R14 — GKX 2.0 breaking machine namespace

- **Date:** 2026-08-05
- **Status:** Accepted development decision
- **Decision:** Adopt the breaking GKX 2.0 machine namespace (`gkx_version`, `.gkx/`, `GKX-*`, `gkx`) and keep prior release directories as historical evidence rather than inputs to current conformance claims.
- **Record:** [R14_GKX_2_0_Breaking_Machine_Namespace_Development_Decision_Record.md](R14_GKX_2_0_Breaking_Machine_Namespace_Development_Decision_Record.md)

## R13 — Conformance honesty and alignment

- **Date:** 2026-08-05
- **Status:** Accepted development decision
- **Decision:** Require honest non-qualifying runner output; reserve `GKOS-<AREA>-<NNN>` for clause-stable requirements; keep implementation diagnostics behind adapter mappings; adopt controlled clause derivation; allocate UUID identity and branch-preserving lineage requirements without authoritative tiebreaks.
- **Record:** [R13_Conformance_Honesty_and_Alignment_Development_Decision_Record.md](R13_Conformance_Honesty_and_Alignment_Development_Decision_Record.md)

## R12 — Ecosystem compatibility and provenance

- **Date:** 2026-08-03
- **Status:** Accepted development decision
- **Decision:** Preserve one deterministic semantics authority; define Engine-Lite equivalence and bounded drift; govern experimental field-test evidence; continue GKX 2.3 from the OKF+ 2.2/2.3 line; limit Google Cloud OKF interoperability to a versioned subset; correct unsupported independence/priority language.
- **Record:** [R12_Ecosystem_Compatibility_Development_Decision_Record.md](R12_Ecosystem_Compatibility_Development_Decision_Record.md)

## R11 — GKX naming transition

- **Date:** 2026-08-02
- **Status:** Accepted development decision
- **Decision:** Rename the technical exchange model from OKF+ to GKX while retaining compatibility aliases until separately removed.
- **Record:** [R11_GKX_Naming_Transition_Development_Decision_Record.md](R11_GKX_Naming_Transition_Development_Decision_Record.md)

## R10 — Schema slice, fixture catalog, and conformance runner

R10-084 through R10-089 publish the first schema slice, fixture catalog, divergence register, starter conformance runner/adapter, and current-state documentation corrections.

- **Record:** [R10_Schema_Fixture_Conformance_Dev_Decision_Record.md](R10_Schema_Fixture_Conformance_Dev_Decision_Record.md)

## R9 — v0.76 concept refinement and publication

R9-076 through R9-083 freeze the epistemic vocabulary, define key mechanical concepts, publish informative mappings and provisional receipt fields, separate version claims, define v0.x development-decision standing, and authorize v0.76.

- **Record:** [R9_V0.76_Development_Decision_Record.md](R9_V0.76_Development_Decision_Record.md)

## R8 — Publication administration

R8-069 through R8-075 establish the canonical repository, interim communications/security channels, copyright identity, provisional logo, dual-license routing, DCO requirement, and GitHub canonical-publication role.

## R7 — Security, publication, and maturity

R7-058 through R7-068 establish fail-closed sensitivity, governed erasure, sensitive provenance, secure agent interfaces, workload governance, dual licensing, canonical version-controlled publication, naming-risk disclosure, glossary freeze, limitations register, and public pre-standard maturity.

## R6 — Specialized Agents

R6-046 through R6-057 establish Specialized Agent contracts, layer placement, non-authoritative expertise, Governance Coordinator terminology, proposal-only extraction, restrictive security powers, neutral review assistance, context compilation, bounded operational authority, orchestration, and constrained subdelegation.

## R5 — Conformance and interoperability

R5-037 through R5-045 establish GCP-1 through GCP-7, cumulative conformance, Viewer/Projection requirements, evidence-backed claims, provisional test/protocol status, independent implementation as a v1.0 gate, normative event semantics where used, and authored/derived/proposed/governed-state separation.

## R4 — Layer contracts

R4-027 through R4-036 establish cumulative layer responsibilities, the seven governing artifacts, Layer-1 re-entry, and incomplete-object restrictions.

## R3 — Epistemic governance

R3-017 through R3-026 establish preserved source revisions subject to governed erasure, evidence-not-truth framing, provenance-bearing assertions, proposal status of agent output, visible contradiction, distinct supersession, rejection history, and governed epistemic promotion.

## R2 — Authority

R2-009 through R2-016 establish receipt-and-grant authority, no inherent agent authority, bounded deterministic automation, retained human authority where required, governed delegation, restrictive security powers, non-self-approval, and authority precedence.

## R1 — Identity and publication

R1-001 through R1-008 establish the canonical name, dated release identity, normative master-standard architecture, governance/technical/implementation separation, deprecated historical names, core trust thesis, domain neutrality, and normative-language convention.
