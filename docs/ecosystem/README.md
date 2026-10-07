# GKOS ecosystem interoperability workspace

**Status:** informative development workspace under R21; no document in this
directory is normative, qualifying, certified, or an implementation authority
unless a later controlling decision states otherwise.

This directory separates protocol and deployment guidance from the normative
GKOS Standard. It exists to make GKOS usable in current and future AI systems
without turning a fast-changing external protocol or vendor implementation into
a permanent GKOS dependency.

Each draft names the GKOS baseline it was written against, v0.80 or v0.81.
Read it against that baseline. The current edition is GKOS-2026-09-24 v0.82.1;
its normative population is unchanged from v0.81. v0.81 added captured-time
authority validity, GCP-5 review lifecycle and protected-disclosure
requirements; see the [changelog](../../CHANGELOG.md).

## Governance middleware proposals

The [requirement-level NIST crosswalk candidate](../GKOS_ISO42001_NIST_AIRMF_CROSSWALK.md) is separate from the high-level proposals below. PR #42 merged it after [its bounded review gate](../reviews/PR42_XW002_BOUNDED_DIFFERENT_MODEL_REVIEW_PACKET.md): the [October 1 different-model review](../reviews/PR42_XW002_FABLE_REVIEW_20261001.md) returned `PASS_WITH_CORRECTIONS`, the owner accepted its MAJOR findings on 2026-10-07 (see the [correction disposition](../reviews/PR42_XW002_CORRECTION_DISPOSITION_20261001.md)), and the [corrected-head verification](../reviews/PR42_XW002_FABLE_CORRECTED_HEAD_VERIFICATION_20261007.md) returned `PASS`. These reviews are bounded and not organizationally independent. The mappings remain proposed and informative, and the ISO Annex A portion is verification-held. The [corrective author assessment](../reviews/PR42_XW002_CORRECTIVE_DRAFTING_ASSESSMENT_2026-09-06.md) is preserved as preparation for that review.

- [Full stack walkthrough and enforcement contract](../implementation/GKOS_END_TO_END_WORKFLOW.md)
- [ISO AI management add-in](GKOS_ISO_AI_MANAGEMENT_ADDIN_0.1_DRAFT.md)
- [EU AI Act add-in](GKOS_EU_AI_ACT_ADDIN_0.1_DRAFT.md)
- [NIST AI governance add-in](GKOS_NIST_AI_GOVERNANCE_ADDIN_0.1_DRAFT.md)
- [Bounded middleware pilot proposal](GKOS_MIDDLEWARE_PILOT_0.1_DRAFT.md)

These 2026-09-06 documentation drafts have not received an external standards-body review or a separate independent implementation assessment. The earlier bounded PR #30 review does not establish review of these new add-ins or completion of the whole SOL review packet.

## Control records

- [`EXTERNAL_SOURCE_REGISTER.md`](EXTERNAL_SOURCE_REGISTER.md) records current
  external versions and primary references.
- [`REVIEW_DISPOSITION_REGISTER.md`](REVIEW_DISPOSITION_REGISTER.md) records
  critiques, corrections, withdrawals, and owner dispositions.
- [`AMBIGUITY_REGISTER.md`](AMBIGUITY_REGISTER.md) records unresolved
  interoperability questions using identifiers that cannot be confused with
  permanent GKOS requirements or diagnostics.
- [`SOL_REVIEW_WORK_PACKET.md`](SOL_REVIEW_WORK_PACKET.md) defines the bounded
  different-model-family review requested for the initial R21 drafts. Its
  standing remains `PREPARED-NOT-EXECUTED` until an actual reviewer record,
  findings, evidence, and owner disposition exist.

## Protocol bindings

- [`bindings/BINDING_TEMPLATE.md`](bindings/BINDING_TEMPLATE.md) provides the
  common protocol and implementation-binding structure.
- [`bindings/GKOS-MCP-BINDING-0.1-draft.md`](bindings/GKOS-MCP-BINDING-0.1-draft.md)
  targets MCP `2026-07-28` and preserves an explicit `2025-11-25` migration
  lane.
- [`bindings/GKOS-A2A-BINDING-0.1-draft.md`](bindings/GKOS-A2A-BINDING-0.1-draft.md)
  targets A2A `v1.0.1`.
- [`bindings/GKOS-ACS-CROSSWALK-0.1-draft.md`](bindings/GKOS-ACS-CROSSWALK-0.1-draft.md)
  targets the ACS `v0.1.1` public preview.

Bindings are versioned mappings, not GCP profiles. They identify where an
external protocol may carry or trigger GKOS-governed evidence and where an
adapter must add controls or records that the protocol does not supply.

<!-- GRAPHIC-NEEDED: GN-036 Protocol bindings: where MCP, A2A and ACS can carry GKOS evidence, and where an adapter must add controls or records -->

## Deployment and assessment drafts

- [`AGENT_GOVERNANCE_INTEROPERABILITY_DRAFT.md`](AGENT_GOVERNANCE_INTEROPERABILITY_DRAFT.md)
- [`MULTI_JURISDICTION_DEPLOYMENT_GUIDANCE_DRAFT.md`](MULTI_JURISDICTION_DEPLOYMENT_GUIDANCE_DRAFT.md)
- [`GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md`](GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md)
- [`COMMERCIAL_ENTERPRISE_PARTICIPATION_GUIDANCE.md`](COMMERCIAL_ENTERPRISE_PARTICIPATION_GUIDANCE.md)

The evidence-package draft uses the active conformance manifest as its semantic
root and defines only an informative carrier/inventory profile. Its provisional
schema and fixtures are under `../../schemas/provisional/evidence/` and
`../../fixtures/provisional/evidence/`.

## Pilots and external participation

- [`PILOT_PROGRAM_DRAFT.md`](PILOT_PROGRAM_DRAFT.md) sequences Viewer,
  Context-Only, MCP, A2A, ACS, evidence-package, multi-jurisdiction, and later
  separately authorized synthetic-effect pilots.
- [`PUBLIC_SECOND_IMPLEMENTATION_CALL.md`](PUBLIC_SECOND_IMPLEMENTATION_CALL.md)
  states the evidence and independence dimensions expected from a public
  candidate.
- [`EXTERNAL_STANDARDS_ENGAGEMENT_DRAFT.md`](EXTERNAL_STANDARDS_ENGAGEMENT_DRAFT.md)
  defines an evidence-first, claim-limited process for standards and protocol
  engagement.

## Public second implementation

Current standing: **awaiting a public second implementation**.

No private repository or unpublished implementation is named or implied as the
second implementation. A future candidate must publish enough source,
dependency, provenance, fixture, ownership, operational, and assessment evidence
for its independence and results to be evaluated.

## Authority boundary

This workspace authorizes no protocol adoption, production connection,
credential, governed writer, consequential effect, profile claim, certification,
endorsement, tag, release, or publication. Each draft requires its own exact-
bound review and disposition before it can be described as reviewed public
guidance.
