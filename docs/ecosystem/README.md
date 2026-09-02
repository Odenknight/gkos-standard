# GKOS ecosystem interoperability workspace

**Status:** informative development workspace under R21; no document in this
directory is normative, qualifying, certified, or an implementation authority
unless a later controlling decision states otherwise.

This directory separates protocol and deployment guidance from the normative
GKOS Standard. It exists to make GKOS usable in current and future AI systems
without turning a fast-changing external protocol or vendor implementation into
a permanent GKOS dependency.

## Control records

- [`EXTERNAL_SOURCE_REGISTER.md`](EXTERNAL_SOURCE_REGISTER.md) records current
  external versions and primary references.
- [`REVIEW_DISPOSITION_REGISTER.md`](REVIEW_DISPOSITION_REGISTER.md) records
  critiques, corrections, withdrawals, and owner dispositions.
- [`AMBIGUITY_REGISTER.md`](AMBIGUITY_REGISTER.md) records unresolved
  interoperability questions using identifiers that cannot be confused with
  permanent GKOS requirements or diagnostics.
- [`SOL_REVIEW_WORK_PACKET.md`](SOL_REVIEW_WORK_PACKET.md) defines the bounded
  different-model-family review requested for the initial R21 drafts.

## Protocol bindings

- [`bindings/GKOS-MCP-BINDING-0.1-draft.md`](bindings/GKOS-MCP-BINDING-0.1-draft.md)
- [`bindings/GKOS-A2A-BINDING-0.1-draft.md`](bindings/GKOS-A2A-BINDING-0.1-draft.md)
- [`bindings/GKOS-ACS-CROSSWALK-0.1-draft.md`](bindings/GKOS-ACS-CROSSWALK-0.1-draft.md)

Bindings are versioned mappings, not GCP profiles. They identify where an
external protocol may carry or trigger GKOS-governed evidence and where an
adapter must add controls or records that the protocol does not supply.

## Deployment and assessment drafts

- [`AGENT_GOVERNANCE_INTEROPERABILITY_DRAFT.md`](AGENT_GOVERNANCE_INTEROPERABILITY_DRAFT.md)
- [`MULTI_JURISDICTION_DEPLOYMENT_GUIDANCE_DRAFT.md`](MULTI_JURISDICTION_DEPLOYMENT_GUIDANCE_DRAFT.md)
- [`GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md`](GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md)

## Public second implementation

Current standing: **awaiting a public second implementation**.

No private repository or unpublished implementation is named or implied as the
second implementation. A future candidate must publish enough source,
dependency, provenance, fixture, and evidence material for its independence and
results to be evaluated.
