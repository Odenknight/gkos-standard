# Governed Knowledge Operations Standard

**Identifier:** GKOS-2026-07-17 v0.75  
**Status:** Public pre-standard and implementation draft  
**Normative terms:** MUST, MUST NOT, SHOULD, SHOULD NOT, MAY

## 1. Purpose

GKOS defines a domain-neutral governance model for preserving evidence, structuring identity, recording semantic assertions and lineage, enforcing deterministic controls, governing review, compiling reproducible context, and authorizing consequential use.

## 2. Core thesis

Knowledge becomes trustworthy through accumulated, governed operations over preserved evidence, explicit assertions, recorded decisions, and reproducible context.

GKOS does not declare absolute truth. It distinguishes evidence, assertions, proposals, validation results, decisions, accepted knowledge, projections, and authorized uses.

## 3. Architecture

GKOS defines governance. OKF+ defines technical objects and protocols. Kosmos-Oden is one implementation.

## 4. Authority

Authority comes only from authenticated authority receipts and explicit governance grants. Agents possess no inherent authority. Confidence, prompts, role names, graph position, retrieval rank, or model identity do not create authority.

Deterministic policy MAY automatically approve an operation only when explicitly authorized, bounded, reproducible, and recorded. No actor may approve, review, validate the authority of, or certify its own work.

Authority precedence is: Constitution; safety and law; security; authority receipts; accepted governance; deterministic policy; human assertions; agent proposals; similarity and retrieval.

## 5. Epistemic model

Retained source revisions are immutable except through governed deletion, redaction, tombstoning, or crypto-shredding required by law, policy, retention, privacy, or legal hold. Sources are evidence, not guaranteed truth.

Human assertions carry provenance and only their author’s authority. Agent outputs remain proposals or projections until governed promotion. Contradictions remain visible. Supersession, contradiction, correction, and deletion are distinct operations. Confidence alone cannot promote epistemic state.

## 6. Seven layer contracts

1. **Original Sources** produce a Source Record with revision identity, fingerprint, provenance, media type, custody, retention and sensitivity defaults, locators, and ingestion receipt.
2. **Structure and Identity** produce a Structured Knowledge Object with stable UID, type, schema version, canonical representation, metadata, and locators. Filenames are not identity.
3. **Relationships and Lineage** produce typed assertion and lineage records with direction, provenance, evidence anchors, temporal validity, epistemic state, actor, scope, and version. Similarity is non-authoritative unless governed.
4. **Validation and Control** produce deterministic diagnostics and control receipts. Failed mandatory controls block promotion.
5. **Review and Workflow** produce an append-only Decision Record.
6. **Context Presentation** produces a reproducible, purpose-bound Context Manifest containing accepted assertions, evidence anchors, contradictions, warnings, restrictions, omissions, versions, recipient, and expiry.
7. **Authorized Use** produces an Authorized Use Record linking action, context, authority, actor, dependencies, outcome, and compensation route.

Layers are cumulative responsibilities, not a mandatory synchronous pipeline. Upper-layer results re-entering the corpus begin a new lifecycle at Layer 1. Incomplete objects MUST declare missing contracts and MUST NOT claim unsupported conformance.

## 7. Specialized Agents

A Specialized Agent is a governed computational actor with declared competency, owner, layer scope, permitted inputs and writes, prohibited operations, evidence duties, model/prompt/tool/policy versions, risk limits, delegation, evaluation, suspension, and revocation terms.

Specialization grants capability, not authority. Common roles include preservation, structural extraction, relationship and lineage, domain analysis, security/privacy, validation, review assistance, governance coordination, context compilation, operational action, audit/compensation, projection/indexing, and orchestration.

A Governance Coordinator consolidates proposals, verifies receipts, enforces deterministic policy, detects conflicts, routes review, and requests governed commits. It is not sovereign authority.

Security specialists MAY impose temporary fail-closed restrictions but MUST NOT lower sensitivity or widen access. Operational agents MAY act only from an authorized purpose-bound Context Manifest and valid authority receipt.

## 8. Conformance

Profiles are GCP-1 through GCP-7 and are cumulative. A Viewer/Projection Profile provides read-only display with visible provenance, epistemic labels, incompleteness, and defect-badge-or-refuse behavior.

A claim requires a machine-readable manifest, human-readable report, standard and test-suite versions, evidence, limitations, and exceptions. Self-attestation and independent verification MUST be distinguished. v0.75 test requirements are provisional while executable GKOS-TS and OKP-CH semantic-invariant suites are incomplete.

## 9. Security, privacy, and retention

Missing or ambiguous sensitivity fails closed to a restricted deployment default. Audit and provenance data inherit or exceed referenced sensitivity. Agent interfaces are local-only by default and require authenticated identity, scoped authorization, purpose declaration, sensitivity filtering, resource limits, audit receipts, and separately authorized writes.

Authorized erasure MAY remove payload bytes while preserving a minimal non-sensitive tombstone, decision record, and integrity evidence. Legal holds override routine deletion.

Deployments MUST govern queue capacity, proposal TTL, backlog alerts, per-agent limits, reviewer workload, retrospective sampling, and emergency quarantine.

## 10. Publication and maturity

The canonical v0.75 repository is `Odenknight/gkos-standard`. Documentation and original graphics use CC BY 4.0; software-oriented materials use Apache-2.0. Trademark and certification rights are separate.

GKOS v0.75 is a public pre-standard suitable for review, prototyping, fixture development, and independent implementation. It is not an accredited standard, certification regime, or assurance of legal or regulatory compliance.
