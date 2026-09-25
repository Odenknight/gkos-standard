# GKOS conformance-claims policy

Status: owner-authorized clarification of existing claims controls; prepared
for GKOS-2026-09-24 v0.82.1. The edition is not yet published.

## Authority and scope

This policy consolidates existing R16 exact-bound claims controls,
[GOVERNANCE](../GOVERNANCE.md) non-self-certification,
[conformance guidance](README.md), and the
[conformance profiles annex](../standard/annexes/Conformance_Profiles.md).
It creates no requirement ID, schema field, test, profile, or certification scheme.
Existing normative requirements prevail; a substantive change to them requires
its own development decision and release assessment.

GKOS is a developmental specification and public working draft. Its retained
name, Governed Knowledge Operations Standard, is a project identifier, not
an assertion of accredited or consensus standing. Consensus Specification is
not the current publication classification.

## Permitted scope of claims

A claim identifies the exact dated GKOS edition and GKX version; claimed
profile and applicable requirements; implementation version and immutable
commit or artifact digest; schemas, policies and applicable canonicalization;
fixture catalog and runner versions; environment and dependencies; assessment
scope, evidence and exceptions; and whether assessment is self-attested or
independently verified. Supply the existing machine-readable claim manifest
and human-readable report where required by the conformance rules.

Distinguish executed, passed, failed, skipped, unsupported and unevaluated
coverage. A partial result is not a complete profile pass. An empty findings
list is not evidence of complete coverage. Independent verification requires
actual organizational and operational independence under GOVERNANCE.

The current catalog qualifies no profile. Passing available tests establishes
only the tested mechanisms. It does not establish GKOS Core, Advanced,
Viewer/Projection or another complete profile qualification. Publication,
archival DOI, signature and successful CI do not establish implementation
conformance or certification.

Avoid unqualified “GKOS-compliant” or “GKOS-conformant” claims. Use an exact,
bounded assessment statement. “GKOS certified” remains reserved until a
governed certification scheme and competent independent process exist.
No claim under GKOS alone establishes legal compliance, procurement approval,
security accreditation, or endorsement by a government or standards body.

## SSP, procurement and contract use

In a System Security Plan (SSP), proposal or contract, describe the implemented
mechanisms and their actual evidence. Identify the exact referenced edition,
applicable requirements, deployment boundary and known gaps. Do not substitute
“GKOS-compliant” for a description of implemented controls or a separately
required security assessment. A GKOS reference does not discharge external
contractual, regulatory or security obligations.

Example structure, with placeholders to be completed from actual evidence:

> Implementation [version/digest] was assessed against [listed requirements]
> of GKOS [dated edition], using [catalog and runner versions] in [environment].
> Results and coverage: [report and evidence]. Exceptions: [list]. Assessment:
> [self-attested or independently verified, assessor and date]. This is a
> bounded mechanism assessment; no complete GKOS profile qualification or
> certification is claimed.

This example is documentation guidance, not approved contract language or a
legal opinion. Contract-specific representations require their own review.

## Change and historical evidence

Claims remain bound to their assessed version and deployment. Do not relabel
historical assessments as v0.82.1 results. This patch does not automatically
carry forward qualification or create new qualification. Preserve prior reports;
record changed scope, evidence and limitations explicitly in a new assessment.
Preserve historical release titles, tags, archives, citations and identifiers.
