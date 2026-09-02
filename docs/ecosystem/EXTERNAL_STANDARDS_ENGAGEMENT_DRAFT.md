# External standards and interoperability engagement program

- **Document ID:** GKOS-EXT-ENGAGE-001
- **Status:** informative R21 draft; preparation only
- **Date:** 2026-09-02
- **Authority boundary:** this document authorizes no submission, representation,
  endorsement claim, partnership, normative change, or transfer of standards
  authority

## 1. Purpose

GKOS should be useful to current standards and interoperability communities by
contributing concrete records, schemas, fixtures, negative cases, and pilot
evidence—not by asking those communities to adopt GKOS wholesale.

External engagement should present GKOS as a candidate operationalization
layer for evidence-to-action governance while preserving the terminology,
scope, authority, and decision process of the receiving body.

## 2. Engagement principles

Every external submission should:

- identify the receiving body's exact document, version, question, and comment
  period;
- use the receiving body's terminology first;
- explain the implementation problem before introducing GKOS terms;
- offer narrow schemas, fields, fixtures, mappings, or examples;
- distinguish existing Standard requirements from R21 recommendations;
- disclose GKOS's developmental, owner-authorized, non-consensus maturity;
- state that no implementation is certified;
- avoid endorsement, conformity, equivalence, or regulatory claims;
- preserve the exact submitted text and attachments;
- record responses, disposition, and follow-up; and
- re-review the mapping when the external source changes.

## 3. Initial engagement lanes

### Lane E1 — NIST and NCCoE

Potential contribution subjects:

- agent and workload identity evidence;
- least privilege and bounded delegation;
- human-agent accountability;
- tamper-evident action records;
- data-flow provenance;
- prompt-injection and confused-deputy containment;
- exact context at decision/action time;
- refusal and recovery evidence;
- public-facing documentation quality; and
- test/evaluation fixtures for agentic systems.

The contribution should not say that GKOS is aligned with, implements, or is
endorsed by NIST unless NIST itself publishes that determination.

### Lane E2 — ISO/IEC and national standards participation

Potential contribution subjects:

- machine-readable operational evidence supporting management-system controls;
- identity, authority, review, context, and action record separation;
- interoperability and implementation-test artifacts;
- exact version and assessment binding;
- human oversight evidence; and
- maintenance, appeal, and correction records.

GKOS must not be represented as an ISO/IEC standard or as satisfying an ISO
certification requirement by itself.

### Lane E3 — MCP community

Potential contribution subjects:

- request identity and version evidence;
- tool/resource/prompt provenance;
- selection capture before context assembly;
- effect-class declarations;
- authorization and refusal receipts;
- protocol migration fixtures;
- stale registry/context and confused-deputy cases; and
- non-consequential versus consequential tool boundaries.

GKOS should offer an implementation binding and fixture corpus, not redefine
MCP core semantics.

### Lane E4 — A2A community

Potential contribution subjects:

- Agent Card provenance and identity;
- task versus delegation distinction;
- multi-agent responsibility chains;
- messages/artifacts as attributable evidence;
- cancellation and uncertain outcomes;
- output re-entry; and
- protocol/SDK/implementation version separation.

### Lane E5 — OWASP GenAI Security Project

Potential contribution subjects:

- ACS hook and trace evidence mapping;
- control outcome versus authority separation;
- missing-hook and bypass fixtures;
- guardian compromise and liveness;
- AgBOM freshness/completeness;
- protected telemetry; and
- action-time receipts.

ACS remains a public-preview external work until its project publishes a later
maturity state.

### Lane E6 — provenance, records, and supply-chain communities

Potential targets include W3C PROV, OpenLineage, records-management,
CycloneDX/SPDX/SWID, Sigstore, in-toto, SLSA, and OCI communities.

The contribution should show where their artifacts provide evidence or
transport and where GKOS adds epistemic standing, review, purpose-bound context,
authority, refusal, or consequence records.

## 4. Submission package

Every proposed submission should include:

- submission ID and version;
- receiving body and exact target document;
- question or clause addressed;
- public GKOS baseline and source commit;
- problem statement in receiving-body language;
- concise proposed text or implementation insert;
- technical annex with mapping and fixtures;
- claim and non-endorsement boundary;
- author and conflict disclosures;
- review record;
- approval authority;
- submission date and channel; and
- response/disposition record.

## 5. Review gates

Before submission:

1. verify the external source is current;
2. confirm comment deadlines and submission instructions;
3. conduct factual and claim-boundary review;
4. verify no private repository, secret, protected data, or unpublished evidence
   is disclosed;
5. confirm citations and links;
6. obtain explicit owner approval for the exact submitted text; and
7. preserve a digest-bound copy.

A draft or comment opportunity does not authorize automatic submission.

## 6. Evidence-first contribution pattern

Preferred contribution sequence:

1. identify one external implementation question;
2. provide one minimal record or field mapping;
3. supply one positive and one negative fixture;
4. show one pilot result, including any failure;
5. state limitations and alternatives; and
6. invite independent reproduction or criticism.

This is stronger than a broad claim that GKOS “solves” an entire framework.

## 7. Public communication boundary

After submission, public communications may state:

- what was submitted;
- where and when it was submitted;
- the exact public text;
- whether the receiving body acknowledged it; and
- any published response.

They must not imply acceptance, adoption, influence, partnership, endorsement,
or pending approval without direct evidence from the receiving body.

## 8. Engagement register

A later machine-readable register should record:

- engagement ID;
- external source IDs;
- submission and artifact digests;
- status: drafted, approved, submitted, acknowledged, under review, accepted in
  part, rejected, withdrawn, superseded, or no response;
- published responses;
- resulting GKOS change proposals; and
- next review date.

## 9. Current standing

This document prepares the engagement program only. No submission is authorized
or claimed by this draft.
