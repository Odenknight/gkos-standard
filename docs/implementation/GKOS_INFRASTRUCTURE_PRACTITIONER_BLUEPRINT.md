# Building on GKOS: a practitioner infrastructure blueprint

- **Document ID:** GKOS-INFRA-BLUEPRINT-001
- **Revision:** 3
- **Date:** 2026-09-02
- **Status:** reviewed public draft; repository checks pending on this exact
  branch; no independent validation or conformance claimed
- **Standard baseline:** `gkos-standard` `main` at
  `1f5768fe6b8f847c17030127a3a00e78edf5cd80`
- **Published baseline:** GKOS-2026-08-20 v0.80
- **Machine exchange contract:** GKX 2.0
- **Canonical profile:** GKX-CBOR-1 where required by the applicable artifact
  contract
- **Reference implementation:** signed GKOS Engine tag `v2.1.2` at
  `7bf14b481e78c5ae9d1e14661602be4f24559d0e`
- **External-source register:**
  [`../ecosystem/EXTERNAL_SOURCE_REGISTER.md`](../ecosystem/EXTERNAL_SOURCE_REGISTER.md)

Product names are illustrative mechanisms, not endorsements, procurement
recommendations, compatibility results, or conformance claims.

## 1. Read every statement by its class

### Standard requires

The applicable GKOS release defines required evidence, identity, lineage,
controls, review, context, authority, outcomes, and receipts.

### Architecture recommends

This guide recommends practical ways to satisfy those responsibilities.

### Implementation example

A named product, protocol, database, policy engine, or GKOS Engine behavior is
an implementation fact and must be pinned to an exact version and deployment.

### Not in the Standard

Vendor choices, topology, identifier syntax, storage layout, signature scheme,
protocol binding, and the examples below are not universal GKOS requirements.

## 2. What GKOS is

GKOS is a developmental public pre-standard for governing how evidence becomes
structured knowledge, how controls and review affect its standing, how context
is assembled, and how consequential action is authorized and recorded.

It is not:

- an agent runtime;
- a database or data lake;
- an identity provider;
- a policy engine;
- a workflow product;
- a universal legal rule;
- a certification program; or
- a replacement for professional judgment.

Your existing tools keep doing the work. GKOS defines the governed records and
boundaries that must survive between them.

## 3. Three design principles

### 3.1 Applicable mandatory failures fail closed

A mandatory failure, missing mandatory input, or indeterminate mandatory result
blocks, refuses, rolls back, compensates, or freezes as the Standard specifies.
Optional or unsupported behavior must be declared explicitly; it is not
silently treated as passing.

### 3.2 Every committed governed state change is receipted

A committed governed mutation must be durably bound to an applicable receipt
role. The receipt records actor, authority, policy, operation, before/after
state binding, outcome, and durability evidence.

### 3.3 Read, proposal, and write authority remain distinct

A validator or viewer normally reads and reports. A proposal adapter may create
a candidate. A governed writer is permissible only when separately authorized
and when its Decision, State-Change Receipt, re-entry, context, authority, and
effect obligations are satisfied.

## 4. Reference implementation note

GKOS Engine is one public reference implementation. Its signed `v2.1.2` release
implements deterministic GKX parsing, validation, projection, graphs,
source-content-read-only Navigation, retrieval, adapter surfaces, and selected
receipt/policy mechanisms.

Those are Engine properties, not Standard clauses. Conformance is evaluated
against requirements, schemas, layer contracts, and fixtures—not Engine
internals. Later Engine development commits are separate coordinates even when
the package file still reports `2.1.2`.

## 5. Three logical planes

| Plane | Role | GKOS relationship |
| --- | --- | --- |
| Work and data plane | Storage, extraction, retrieval, inference, agents, workflows, tools, external systems | Performs the operational work |
| GKOS governance plane | Evidence, identity, lineage, controls, decisions, context, authority, receipts | Defines the governed contracts and claim boundaries |
| Trust and enforcement plane | Workload identity, credentials, policy decisions, signing, logging, isolation | Supplies assertions and enforcement mechanisms consumed by the governance path |

These are logical responsibilities, not mandatory network tiers.

## 6. Choose the on-ramp by role

| Participant | Appropriate first target |
| --- | --- |
| Viewer, editor, audit, or dashboard vendor | Independent Viewer/Projection Profile |
| Organization governing records and decisions | GKOS Core, GCP-1 through GCP-5 |
| Retrieval or decision-support service that does not act | GCP-6 Context-Only Extension after Core |
| Agent or automation performing consequential actions | GKOS Advanced, GCP-1 through GCP-7 |
| Protocol, identity, policy, or infrastructure provider | A bounded implementation binding plus the applicable profile |

Viewer/Projection is the lowest-risk external interoperability target. Core is
the first complete general governance tier. Context-Only is for systems that
inform but do not act. Advanced is required for a full consequential-use claim.

## 7. Layer-by-layer implementation

### L1 — Original Sources

**Standard requires:** preserve the received revision and the applicable
provenance, custody, sensitivity, retention, fingerprint, and acquisition
evidence.

| Mode | Candidate mechanisms | Legitimate contribution |
| --- | --- | --- |
| Managed/commercial | Preservica, enterprise records platforms, immutable cloud object storage | Retention, legal hold, version preservation, custody and audit evidence |
| Enterprise/self-managed | WORM object storage, records repositories, source-system export and archive platforms | Preservation inside an existing records boundary |
| Open-source/open-standard | Archivematica, MinIO object lock, BagIt, content-addressed stores, Git for suitable text/code evidence | Source preservation and fixity; extraction tools remain separate |

**Architecture recommends:** store a content digest for each received revision.
A revision store may use that digest as a key.

**Not in the Standard:** the content digest is not automatically the stable
Layer-2 object identity. Docling, Tika, and similar extraction tools do not
prove original-byte preservation.

### L2 — Structure and Identity

**Standard requires:** stable governed identity, type, schema identity, version,
and representation. Filename and path are not identity.

| Mode | Candidate mechanisms | Legitimate contribution |
| --- | --- | --- |
| Managed/commercial | Reltio, Informatica MDM, enterprise data catalogs | Enterprise identifiers, ownership, classification, and schema metadata |
| Enterprise/self-managed | Confluent Schema Registry, Apicurio Registry, internal identity services | Versioned schemas, compatibility policy, and identifier resolution |
| Open-source/open-standard | JSON Schema, LinkML, ARK, RO-Crate, Frictionless Data | Portable types, persistent references, and declared packaging metadata |

Choose an identity scheme that survives revision and migration. Record
collision, alias, versioning, and resolution behavior. Content hash, database
row ID, protocol session ID, task ID, and trace ID remain distinct evidence
unless the deployment explicitly governs them as the stable object identity.

Navigation's canonical-five MOC convention remains informative and product-
scoped; it is not a universal filename rule for every connected store.

### L3 — Relationships and Lineage

**Standard requires:** typed, sourced, temporal, scoped, and attributable
assertions and lineage, with contradiction, correction, withdrawal, and
supersession kept distinct.

| Mode | Candidate mechanisms | Legitimate contribution |
| --- | --- | --- |
| Managed/commercial | Stardog, Ontotext GraphDB, Neo4j Enterprise, Amazon Neptune | Graph storage, named graphs, temporal modeling, and traversal |
| Enterprise/self-managed | DataHub, Apache Atlas, Microsoft Purview lineage, Jena/Fuseki | Technical/business lineage and provenance integration |
| Open-source/open-standard | W3C PROV-O, OpenLineage, Oxigraph, Graphiti, Neo4j Community | Interchange, event capture, graph projection, and temporal representation |

**Drift warning:** public implementations contain graph behavior beyond the
present complete clause-stable and fixture-covered Standard surface. Use the
existing graph-drift review and ecosystem ambiguity register. Do not cite
`GKOS-DRIFT-001`; it is not an allocated permanent requirement or diagnostic.

A graph edge is a record or projection, not authority. Model-extracted
relationships remain attributable assertions. Semantic supersession requires
an authorized human or valid bounded delegation and cannot be inferred from
similarity, confidence, timestamps, or graph centrality.

### L4 — Validation and Control

**Standard requires:** deterministic diagnostics and Control Receipts for the
applicable mandatory gates.

| Mode | Candidate mechanisms | Legitimate contribution |
| --- | --- | --- |
| Managed/commercial | Immuta, Privacera, managed data-quality and policy services | Policy administration, access restrictions, checks, and audit evidence |
| Enterprise/self-managed | OPA, Cedar, Cerbos, dbt tests, Deequ | Deterministic policy and data-quality evaluation |
| Open-source/open-standard | GKOS Engine, pySHACL, Pandera, JSON Schema validators | GKX/shape validation, diagnostics, and repeatable checks |

LLM graders, RAG evaluators, and model judges may produce evidence or monitoring
signals. They cannot silently satisfy or override an applicable mandatory
deterministic gate.

Record the exact policy, check, implementation, dependency, environment,
fixture, result, and stable diagnostic identity used.

### L5 — Review and Workflow

**Standard requires:** an authorized, append-only Decision Record bound to the
exact proposal and evidence reviewed. Where a Context Manifest supports the
review, bind its exact identity, version, and canonical artifact hash.

| Mode | Candidate mechanisms | Legitimate contribution |
| --- | --- | --- |
| Managed/commercial | ServiceNow, Appian, Pega, Nintex, electronic-signature services | Routing, identity evidence, delegation, and approval inputs |
| Enterprise/self-managed | GitHub/GitLab review, Azure DevOps, Jira, Gerrit | Assignment, protected changes, votes, comments, and branch gates |
| Open-source/open-standard | Temporal, Camunda, Flowable, Forgejo, ADR tooling | Durable workflows, human tasks, expiry, escalation, and decision documentation |

A ticket state, vote, or electronic signature is an input unless it satisfies
the exact Decision Record contract. The active schema prescribes required and
optional record fields; a deployment may map its workflow fields to them.

The v0.81 development line permits a bounded authorized independent Review
Agent only under R18's different-model-family, sealed-evidence, deterministic-
gate, non-self-review, separate-authority, and mandatory-human-escalation
controls. That does not establish independent conformance verification.

### L6 — Context Presentation

**Standard requires:** capture non-deterministic selection, then deterministically
assemble a purpose-bound, restriction-aware, replayable Context Manifest.

| Mode | Candidate mechanisms | Legitimate contribution |
| --- | --- | --- |
| Managed/commercial | Vespa, Azure AI Search, managed knowledge/retrieval platforms | Retrieval, ranking, tenancy, and context delivery |
| Enterprise/self-managed | Elastic, internal search/model gateways, managed vector or graph services | Hybrid retrieval, access filtering, model routing, and context transport |
| Open-source/open-standard | Haystack, LlamaIndex, LangChain, txtai, Qdrant, pgvector, Weaviate, CUE, Pydantic | Retrieval, ranking, pointer storage, schema-bound assembly, and rendering |

Similarity search and model routing are allowed as captured selection inputs.
Identical captured inputs and compiler coordinates must produce the same
canonical manifest where the applicable contract requires deterministic
assembly.

MCP `2026-07-28` is a current integration target under R21. It is not a GKOS
Context Manifest. Use the versioned MCP binding to capture request, tool,
resource, prompt, selection, context, and refusal evidence. Existing
`2025-11-25` implementations require an explicit migration lane.

### L7 — Authorized Use

**Standard requires:** an Authorized Use Record or Refusal Receipt binding the
exact context, valid action-time authority, distinct actor roles, delegation,
typed effect scope, outcome, and recovery route.

| Mode | Candidate mechanisms | Legitimate contribution |
| --- | --- | --- |
| Managed/commercial | CyberArk, BeyondTrust, Delinea, Teleport, StrongDM | Privileged-session control, credential brokering, and execution evidence |
| Enterprise/self-managed | Entra, Okta, Keycloak, SPIFFE/SPIRE, OAuth/OIDC, OpenFGA | Identity, grants, delegated access, and workload credentials |
| Open-source/open-standard | OPA, Cedar, Casbin, Sigstore/Rekor, in-toto, immudb, Trillian | Policy decisions, integrity, provenance, and append-only evidence |

Authentication is not authorization. A valid signature or transparency-log
entry proves only what its trust model supports. The action-time admission path
must verify purpose, actor, grant, Context Manifest, action, target, recipient,
effect scope, policy, and recovery.

A2A `v1.0.1` is a current agent-to-agent integration target. A task, Agent Card,
message, or artifact creates no authority by itself. ACS `v0.1.1` is a public-
preview runtime-control and observation target; its hooks and traces may
contribute control and outcome evidence but do not replace GKOS records.

### Viewer/Projection Profile

**Standard requires:** faithful read-only presentation of provenance, epistemic
state, incompleteness, contradictions, warnings, restrictions, and claim
limitations, without write, promotion, decision, or authorization authority.

| Mode | Candidate mechanisms | Legitimate contribution |
| --- | --- | --- |
| Managed/commercial | Power BI, Tableau, Retool, governance dashboards | Oversight and audit views |
| Enterprise/self-managed | Apache Superset, Metabase, internal portals | Controlled projections and drill-down |
| Open-source/open-standard | Quarto, Streamlit, Markdown or graph viewers, editor plugins | Public and specialist views over governed records |

A viewer is never a second canonical authority. It must show required defects
and limitations or refuse the view.

## 8. Integration patterns

### Pattern A — validator and evidence adapter

Use a validator in CI or beside the work plane. It reads exact inputs, emits
bounded diagnostics and evidence, and grants no review or effect authority.

```text
Sources → preservation/structure/lineage → validator and policy controls
                                             ├─ fail → diagnostic/refusal
                                             └─ pass → authorized review/context/action path
```

Do not claim that a validator implements all of L1–L4 merely because it parses
records. Publish the exact requirement and fixture slice actually tested.

### Pattern B — governed enterprise hub

Connect records, identity, lineage, policy, workflow, retrieval, IAM/PAM, and
observability systems through versioned adapters. GKOS artifacts and exact
claim evidence remain the common boundary; no product becomes the Standard.

### Pattern C — open-first stack

Use open-source storage, schemas, provenance, policy, workflow, retrieval,
identity, and evidence mechanisms. Preserve the same claim boundaries and
avoid assuming that open source implies independence or conformance.

### Pattern D — protocol gateway

Place MCP and A2A adapters at the work-plane boundary and ACS/runtime-control
adapters at relevant observation and enforcement points. Emit GKOS records
without treating protocol lifecycle as governance standing.

## 9. Critical design rules

1. **GKOS is storage-neutral.** Preserve or reference the evidence required by
   the claimed layer; do not create unnecessary duplicate stores.
2. **Higher layers do not silently rewrite lower layers.** New outcomes and
   corrections re-enter as new evidence.
3. **Confidence is not authority.** A model score is an assertion; review and
   action require separate authority.
4. **Context is exact-bound.** Later retrieval is new evidence.
5. **Non-determinism stays explicit.** Selection, routing, and model review do
   not replace mandatory deterministic controls.
6. **Authentication, policy allow, review, and action are separate facts.**
7. **Protocol versions are exact coordinates.** MCP, A2A, and ACS changes
   require binding review rather than silent adoption.
8. **Public claims use public evidence.** The project is awaiting a public
   second implementation; no private implementation is named or implied.

## 10. Conformance and risk

GKOS v0.80 is a developmental public pre-standard. No implementation is
certified. A serious claim identifies:

- exact Standard and GKX versions;
- claimed profile;
- implementation and commit/artifact digest;
- policies, schemas, adapter, compiler, and canonicalization profile;
- fixture catalog and runner;
- environment and dependency evidence;
- executed, passed, failed, skipped, unsupported, and unevaluated results;
- limitations and exceptions; and
- self-attested or independently verified assessment status.

The current active catalog declares no qualifying profile. Mechanism evidence,
mutation coverage, a signed commit, a successful workflow, or a product
installation does not establish a named profile.

The proposed GKOS Conformance Evidence Package 0.1 supplies an informative
carrier and inventory model around the existing conformance manifest. It is not
normative and remains subject to multi-implementation testing.

## 11. Not in the Standard

Do not cite the following as universal GKOS requirements:

- one identifier syntax;
- one database, graph, workflow, retrieval, IAM, or agent product;
- one signature or attestation scheme for every artifact;
- a universal retention interval or governing-law rule;
- “most restrictive jurisdiction always wins” as a legal rule;
- all adapters being permanently read-only;
- all optional features failing as mandatory gates;
- MCP, A2A, or ACS as required protocols;
- Engine implementation internals;
- a named private second implementation;
- a current certification scheme; or
- proof that a substantive decision is legally, scientifically, clinically, or
  ethically correct.

## 12. Next implementation steps

1. Pick one role-based on-ramp and one bounded use case.
2. Inventory exact sources, actors, tools, policies, decisions, and effects.
3. Define stable identities and preserve received revisions.
4. Map each product or protocol mechanism to the applicable GKOS artifact and
   explicitly state what it does not provide.
5. Implement mandatory deterministic controls and refusal behavior.
6. Preserve raw evidence and generate the conformance manifest.
7. Package evidence using the informative evidence-package draft.
8. Execute positive, negative, boundary, mutation, and adversarial fixtures.
9. Publish exact limitations and unsupported behavior.
10. Seek an independently operated public implementation or assessment path
    rather than claiming independence from internal duplication.
