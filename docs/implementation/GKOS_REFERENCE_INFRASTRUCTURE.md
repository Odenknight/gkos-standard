# GKOS Reference Infrastructure Architecture

<!-- markdownlint-disable MD013 -->

- **Document ID:** GKOS-INFRA-001
- **Revision:** r4 review candidate
- **Date:** 2026-09-02
- **Status:** informative implementation guidance; repository checks required; bounded different-model-family review pending; no independent validation, conformance, endorsement, certification, procurement recommendation, or production authority claimed
- **Published Standard baseline:** GKOS-2026-08-20 v0.80
- **Development controls:** R20 and R21 on `main`
- **Machine exchange contract:** GKX 2.0
- **Canonical artifact profile:** GKX-CBOR-1 where required by the applicable artifact contract
- **Reference implementation release coordinate:** GKOS Engine tag `v2.1.2` at `7bf14b481e78c5ae9d1e14661602be4f24559d0e`; later Engine development heads are distinct coordinates
- **Public second implementation:** awaiting a public second implementation

This guide is a review candidate for explaining how existing systems can participate in a GKOS deployment without turning a vendor, protocol, framework, or reference implementation into the Standard.

## 1. Reading rule

Every statement in this guide belongs to one of four classes.

### Standard requires

A requirement that comes from the controlling GKOS release, its normative annexes, schemas, applicability rules, or adopted development decisions when discussing the v0.81 line.

### Architecture recommends

A deployment pattern intended to make the Standard implementable and testable. It is not automatically normative.

### Implementation example

A product, protocol, library, or system that may supply part of the needed mechanism. A named example is not an endorsement or conformance claim.

### Not in the Standard

An experimental, future, protocol-specific, vendor-specific, legal, operational, or deployment choice that GKOS does not currently mandate.

## 2. Governing determinations

1. **GKOS defines governed seams; implementations fill them.** A vendor, model, database, identity provider, policy engine, graph, workflow, or agent runtime does not amend the Standard.
2. **Adapters target requirements, schemas, layer contracts, and fixtures.** They must not rely on undocumented reference-implementation behavior as if it were normative.
3. **Read and proposal adapters are distinct from governed writers.** A writer may exist, but it must be separately authorized and satisfy the applicable Decision, State-Change, authorization, refusal, and re-entry contracts.
4. **Applicable mandatory control failures fail closed.** Optional or unsupported behavior must be explicit; it must not silently become PASS.
5. **State change requires durable evidence.** The applicable record must identify actor, relevant decision or authority, outcome, and recovery or re-entry path where required.
6. **External trust systems provide assertions and enforcement, not automatic GKOS standing.** Authentication, signatures, workflow state, graph edges, and transparency logs do not by themselves create truth, a Decision Record, or an Authorized Use Record.
7. **Non-determinism remains explicit.** Retrieval, ranking, model filtering, and model-based review may contribute captured evidence but cannot silently replace deterministic mandatory controls.
8. **Protocol integration is versioned and informative.** MCP, A2A, ACS, or another protocol may carry or trigger governed operations but does not itself create GKOS authority.
9. **Product categories overlap.** Managed/commercial, enterprise/self-managed, and open-source/open-standard are acquisition and deployment modes, not exclusive technical tiers.
10. **Public implementation evidence must actually be public.** Private repositories and unpublished implementations do not count as a public second implementation.

## 3. Three-plane architecture

GKOS can be understood as three logical planes.

### Work plane

Sources, data stores, retrieval, models, agent runtimes, workflows, tools, business applications, and external systems perform useful work.

### GKOS governance plane

Source identity, lineage, deterministic control results, review disposition, context assembly, grants, delegation, refusals, authorized use, state change, and re-entry are recorded and checked.

### Trust and enforcement plane

Identity, credentials, policy evaluation, privileged access, cryptographic integrity, isolation, monitoring, retention enforcement, and organizational authority supply inputs and enforcement mechanisms.

These planes are logical responsibilities rather than required network tiers. One application may implement all three; a large organization may distribute them across many services.

## 4. Layer-by-layer implementation mapping

### L1 — Original Sources

**Standard requires:** preserve the received or observed revision with required provenance, custody, sensitivity, retention, fingerprint, and acquisition evidence.

**Architecture recommends:** separate original preservation from extraction or transformation. Preserve original bytes or an equivalent authoritative representation before derived processing.

**Implementation examples:** WORM or object-lock storage, records-management systems, source-system exports, content-addressed stores, Git for suitable text/code evidence, BagIt-style packaging, archival systems.

Extraction tools such as Apache Tika, Docling, or Unstructured may create useful derived records but do not by themselves prove that the original source was preserved.

A content hash may identify a revision or byte sequence. It must not be silently substituted for the stable governed identity of the object across revisions.

### L2 — Structure and Identity

**Standard requires:** stable governed identity, version, type, schema identity, and representation rules.

**Architecture recommends:** publish collision, migration, versioning, unknown-field, and identifier-resolution behavior.

**Implementation examples:** JSON Schema, LinkML, schema registries, metadata catalogs, MDM systems, persistent identifier schemes, internal identity registries.

GKOS does not mandate one identifier syntax.

### L3 — Relationships and Lineage

**Standard requires:** typed, sourced, temporal, scoped, and attributable relationship or assertion evidence where applicable.

**Architecture recommends:** represent contradiction, dependency, correction, withdrawal, and supersession as distinct semantics rather than generic graph edges.

**Implementation examples:** W3C PROV-O, OpenLineage, DataHub, Apache Atlas, graph databases, enterprise lineage systems, Graphiti, RDF stores.

A graph edge is not automatically a governed assertion, accepted interpretation, correction, or supersession decision.

Graph/projection behavior has historically been an interoperability area where implementation behavior can move ahead of clause-stable Standard semantics. Unresolved graph topics belong in the R21 ambiguity register; they must not be converted into invented permanent `GKOS-DRIFT-*` requirements.

### L4 — Validation and Control

**Standard requires:** deterministic diagnostics and control evidence for applicable mandatory gates.

**Architecture recommends:** identify policy version, input identity, decision result, stable diagnostic or gate code, and blocking behavior.

**Implementation examples:** GKOS Engine, OPA, Cedar, JSON Schema validators, pySHACL, Pandera, Great Expectations, dbt tests, Deequ, Cerbos.

A non-deterministic model judge or RAG evaluator may provide evidence or monitoring. It cannot silently satisfy a mandatory deterministic GKOS gate.

### L5 — Review and Workflow

**Standard requires:** an authorized append-only disposition bound to the exact proposal and reviewed evidence according to the controlling release.

**Architecture recommends:** preserve proposer, reviewer, authorizer, executor, conditions, expiry, supersession, appeal, escalation, and review-context bindings where applicable.

**Implementation examples:** ServiceNow, Jira, GitHub/GitLab review, Azure DevOps, Gerrit, Temporal, Camunda, Flowable, ADR tooling.

A ticket state or electronic signature is input evidence unless it independently satisfies the entire required record contract.

**Release distinction:** published v0.80 standing must not be rewritten by v0.81 development. The v0.81 line permits a bounded authorized independent Review Agent only under R18's different-model-family, sealed-evidence, deterministic-gate, non-self-review, and human-escalation conditions.

### L6 — Context Presentation

**Standard requires:** captured selection and deterministic purpose-bound assembly where the applicable contract requires it.

**Architecture recommends:** record exact selected inputs, omissions, contradictions, restrictions, policy versions, tool versions, recipient, purpose, expiry, and rendering behavior.

**Implementation examples:** search engines, vector stores, graph retrieval, enterprise search, CUE, Pydantic, retrieval frameworks, MCP transports, context gateways.

Retrieval may be non-deterministic. The operative selection must be captured before deterministic assembly when required. Replay of governed context does not imply bit-identical stochastic model output.

### L7 — Authorized Use

**Standard requires:** action-time binding of exact context, valid authority, actor roles, delegation, effect scope, outcome, refusal, and recovery or re-entry evidence as applicable.

**Architecture recommends:** separate authentication, policy evaluation, organizational delegation, execution, and audit into independently inspectable evidence.

**Implementation examples:** OIDC/OAuth systems, SPIFFE/SPIRE, Keycloak, Entra, Okta, PAM systems, OpenFGA, NGAC implementations, policy engines, Sigstore/Rekor, in-toto, append-only logs.

Authentication proves an identity claim under its trust model. It does not establish substantive GKOS authority for every action that identity can technically perform.

## 5. Agent-governance mapping

GKOS already contains agent-governance foundations through actor identity, role separation, Specialized Agent Framework material, delegation controls, context binding, refusal, action-time authority checks, and R18's bounded independent-review model.

| Agent concern | GKOS contribution |
| --- | --- |
| Agent identity and ownership | governed actor references, version/dependency records, responsible owner/operator |
| Capability versus authority | technical ability is recorded separately from valid grant and effect scope |
| Delegation | bounded, expiring, revocable delegation with no silent privilege amplification |
| Prompt/context provenance | Source Records, lineage, Selection Envelope, Context Manifest |
| Tool access | deterministic policy evidence plus L7 action-time authority where consequential |
| Multi-agent work | distinct proposer, reviewer, authorizer, executor, owner, operator, and participant roles |
| Review-agent use | R18 bounded different-model-family, sealed-evidence, non-self-review controls |
| Partial/failed effects | outcome, refusal, compensation, rollback, and re-entry evidence |

GKOS does not need an eighth layer for agents. Agent-specific guidance maps onto the existing cumulative responsibilities.

## 6. Protocol bindings under R21

R21 keeps protocol work outside the normative v0.81 dependency set.

### MCP

Current R21 reviewed input: **MCP `2026-07-28`**.

The current bounded GKOS Engine MCP implementation remains a separate implementation fact on protocol `2025-11-25`; migration must be explicit rather than silently relabeled.

An MCP adapter should declare its exact protocol version, supported surfaces, transport assumptions, identity and authorization inputs, purpose and sensitivity boundaries, read/proposal/write/effect/admin classification, downgrade behavior, refusal mapping, and fixture evidence.

MCP transport does not itself create a Context Manifest or Authorized Use Record.

### A2A

Current R21 reviewed input: **A2A `v1.0.1`**.

An A2A binding should map agent identity, Agent Card information, tasks, messages, artifacts, status, cancellation, delegation, context, partial effects, refusal, and re-entry evidence.

Task assignment is not automatically authority to perform every consequential effect required by the task.

### OWASP Agent Control Standard

Current R21 reviewed input: **ACS `v0.1.1` public preview**.

ACS-style runtime hooks may contribute observation and control evidence. GKOS still needs exact authority, context, disposition, refusal, action, and outcome records where required.

An ACS hook firing successfully is not itself a GKOS conformance result.

## 7. Multi-jurisdiction deployment

GKOS does not decide which law controls a deployment.

**Architecture recommends** recording, where applicable, asserted jurisdiction or governing-policy references, source/subject/storage/processing/execution locations, transfer route, retention and hold policy references, erasure request state, conflicts between mandatory policies, authorized disposition, rationale, effective dates, and policy versions.

An unresolved mandatory hold/erasure or jurisdictional conflict should fail closed and route to qualified authorized disposition. GKOS should not invent a universal rule such as "the most restrictive jurisdiction always wins."

## 8. Evidence package

The active conformance manifest already defines the semantic root of an exact-bound claim. R21's informative GKOS Conformance Evidence Package work addresses portable packaging of that manifest and its supporting evidence.

A useful package may include the conformance manifest, human report, requirement/applicability/diagnostic/schema/fixture/policy coordinates, environment and dependency evidence, raw outputs, review findings with standing disclosed, receipts, security results, protected external references, limitations, exceptions, and optional attestations.

Package integrity is not the same as conformance assessment. A valid signature is not proof of substantive correctness or authority.

The evidence-package draft remains informative until multiple public tools or assessors can exchange and verify the same package and negative fixtures with comparable results.

## 9. Public second implementation

Current standing: **awaiting a public second implementation**.

A future candidate should be evaluated against public evidence for source availability, interpretation independence, implementation and dependency provenance, ownership and operational independence, fixture execution, raw outputs, exact Standard/GKX coordinates, and limitations.

No private repository or unpublished implementation is named or implied by this guide.

## 10. Commercial and enterprise use

GKOS may be implemented in commercial, enterprise, public-sector, research, or open-source environments.

Commercial offerings may provide implementation support, hosting, validation tooling, training, adapters, dashboards, or assessment services. They do not acquire authority to redefine the Standard.

The terms `independently verified`, `accredited`, and `GKOS certified` require separately governed evidence and institutions. The current v0.x project does not operate a certification program.

## 11. Deployment patterns

- **Sidecar/gateway:** governance surrounds an existing application or agent runtime.
- **Embedded runtime:** the application directly implements GKOS contracts.
- **Federated enterprise hub:** records, identity, policy, search, workflow, and execution systems contribute bounded evidence to a shared governance plane.
- **Viewer-first:** faithful read-only projection precedes governed writes or consequential agent actions.
- **Context-only:** Core plus GCP-6 provides purpose-bound context while deliberately withholding consequential effect authority.

## 12. What an implementation claim must publish

At minimum, identify the exact GKOS release and GKX version, claimed profile or bounded capability statement, implementation commit/artifact digest, external protocol versions, schemas, policies, canonicalization profile, adapters, fixture catalogs, runner versions, environment, dependency closure, executed outcomes, limitations, exceptions, and assessment scope.

A product version number, green CI job, signed artifact, or passing subset of fixtures is not by itself a complete GKOS claim.

## 13. NIST and external-framework relationship

GKOS may be useful as an operationalization layer for implementation questions raised by NIST/NCCoE and other public governance work around agent identity, least privilege, delegation, logging, provenance, prompt-injection containment, security evaluation, and human accountability.

This guide does not claim formal alignment, approval, endorsement, conformity, certification, or regulatory effect.

External-source versions and mappings are maintained in the R21 external-source register so that changing framework text does not silently become permanent GKOS language.

## 14. Claim boundary

This review candidate does not:

- create a new GKOS requirement or profile;
- qualify Core, Advanced, Context-Only, or Viewer/Projection;
- certify an implementation;
- authorize a writer or consequential effect;
- mandate MCP, A2A, ACS, a vendor, cloud, model, database, or identity product;
- establish legal, regulatory, scientific, safety, or security compliance;
- count private evidence as a public second implementation.

Its purpose is narrower: show how a current or future technology stack can implement GKOS responsibilities without collapsing evidence, interpretation, controls, review, context, authority, and action into one opaque system.
