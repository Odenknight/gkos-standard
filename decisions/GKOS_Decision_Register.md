# GKOS development decision register

This register indexes accepted v0.x development decisions and separately
identifies current proposals. These records document Founder/Initial Editor
dispositions and proposals during testing and refinement; they are not consensus
ratification, independent certification, accreditation, or regulator approval.

## Proposed decisions

### R22 — Canonical informative architecture orientation

- **Date:** 2026-09-03
- **Revision preparation:** 2026-09-04
- **Status:** Proposed development decision; no documentation authority until
  exact-head owner acceptance
- **Decision proposed:** Establish one content-verified r3 top-level informative
  architecture orientation for v0.82 development; preserve existing
  control-plane and layer-responsibility graphics as narrower detail views;
  correct stale post-publication roadmap/documentation state; keep retrieval
  guidance provisional; keep MCP/A2A/ACS informative and non-activating; and
  preserve plural implementation and authority boundaries without creating a
  profile, interoperability result, product standing, or runtime authority.
- **Record:**
  [R22_Canonical_Informative_Architecture_Development_Decision_Record.md](R22_Canonical_Informative_Architecture_Development_Decision_Record.md)

## Accepted decisions

## R21 — Ecosystem interoperability program

- **Date:** 2026-09-02
- **Status:** Accepted development decision; informative ecosystem-program
  authority
- **Decision:** Establish a public, protocol-neutral interoperability program
  covering current MCP, A2A, and OWASP Agent Control Standard versions; agent-
  governance mappings; multi-jurisdiction deployment guidance; a portable
  conformance evidence package; public pilots; external standards engagement;
  commercial and enterprise participation boundaries; and recruitment of a
  publicly reviewable second implementation. No private repository or
  unpublished implementation may be named or implied as public second-
  implementation evidence.
- **Record:**
  [R21_Ecosystem_Interoperability_Program_Development_Decision_Record.md](R21_Ecosystem_Interoperability_Program_Development_Decision_Record.md)

## R20 — v0.81 release-gate reconciliation and publication control

- **Date:** 2026-09-02
- **Status:** Accepted development decision; v0.81 preparation and publication-
  control authority
- **Decision:** Reconcile the v0.81 release route after R19 changed the candidate;
  classify v0.81 as a developmental, non-consensus, non-qualifying publication;
  require one exact frozen release candidate, complete final evidence rerun,
  corrected public documentation, dependency and repository-control closure,
  version-aware release validation, and explicit final owner publication
  approval. CI success alone cannot merge, tag, publish, qualify, or certify the
  release.
- **Record:**
  [R20_V081_Release_Gate_Reconciliation_and_Publication_Control_Development_Decision_Record.md](R20_V081_Release_Gate_Reconciliation_and_Publication_Control_Development_Decision_Record.md)

## R19 — Documentation-intent eighth invariant

- **Date:** 2026-09-01
- **Status:** Accepted development decision; unpublished amendment
- **Decision:** Supply and adopt the previously undefined eighth documentation-intent position as “Every committed governed state change is durably receipted,” with STD-079 r4 invariants 3–4 and the applicable receipt requirements as provenance; preserve the separate standing of the STD-079 and layer-blocking invariant sets; and adopt only the eight-position DOCSTD §4 intent-review table without claiming historical recovery, publication, conformance, or release qualification.
- **Record:** [R19_Documentation_Intent_Eighth_Invariant_Development_Decision_Record.md](R19_Documentation_Intent_Eighth_Invariant_Development_Decision_Record.md)

## R18 — Track A GCP-4/GCP-5 closure and authorized independent review

- **Date:** 2026-08-29
- **Status:** Accepted development decision; v0.81 preparation authority
- **Decision:** Reconstruct and replace the missing Track A authority; allocate atomic GCP-5 review requirements; require protected-disclosure control and portable mutation evidence; permit a separately authorized, different-model-family Review Agent to fulfill bounded Layer-5 review under deterministic gates and mandatory human escalation triggers; bind qualification to exact implementation and environment closure; and authorize automatic v0.81 Standard publication only after every exact-bound release gate passes.
- **Record:** [R18_Track_A_GCP45_and_Authorized_Independent_Review_Development_Decision_Record.md](R18_Track_A_GCP45_and_Authorized_Independent_Review_Development_Decision_Record.md)

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
