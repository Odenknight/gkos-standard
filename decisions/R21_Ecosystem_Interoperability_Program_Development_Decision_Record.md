# R21 — Ecosystem interoperability program

**Date:** 2026-09-02

**Status:** Accepted development decision; informative ecosystem-program authority

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor

**Standard boundary:** Separate from the normative v0.81 release gate; no
protocol, product, implementation, or pilot named here becomes a GKOS
requirement or qualifying dependency

**Input baseline:** `gkos-standard` `main` at
`1f5768fe6b8f847c17030127a3a00e78edf5cd80`

## 1. Decision

R21 establishes a public ecosystem-interoperability program for GKOS. It adopts
the owner dispositions ECO81-Q07 through ECO81-Q21 and ECO81-Q25, including the
following addenda:

- public second-implementation work uses generic language and names no private
  repository or internal product;
- the project is awaiting a publicly reviewable second implementation; and
- drafting begins immediately for the current reviewed versions of MCP, A2A,
  and the OWASP Agent Control Standard, together with agent-governance
  mappings, evidence-package interoperability, multi-jurisdiction guidance,
  pilots, external standards engagement, and the remaining program items.

R21 authorizes informative drafts, mappings, schemas, fixtures, work packets,
and non-production pilots. It does not amend GKOS, qualify an implementation,
or grant runtime authority.

## 2. Current reviewed external baselines

The following are reviewed inputs as of 2026-09-02. They are volatile external
coordinates and must be rechecked before publication or implementation claims.

| External work | Current reviewed coordinate | Source and standing | GKOS use |
| --- | --- | --- | --- |
| Model Context Protocol | Specification `2026-07-28` | Current published MCP specification generation; stateless request model and version carried per request | Candidate agent-to-tool, resource, prompt, and context transport binding |
| Agent2Agent Protocol | Protocol `v1.0.1` | Latest tagged A2A protocol release observed on 2026-09-02; v1.0 is the stable protocol generation | Candidate independent-agent discovery, task, message, artifact, and delegation binding |
| OWASP Agent Control Standard | `v0.1.1` | Current repository version observed on 2026-09-02; public-preview specification, not a mature GKOS dependency | Candidate runtime observation, control-hook, trace, and agent-BOM crosswalk |

Primary references:

- <https://modelcontextprotocol.io/specification/2026-07-28>
- <https://blog.modelcontextprotocol.io/posts/2026-07-28/>
- <https://github.com/a2aproject/A2A/releases/tag/v1.0.1>
- <https://a2a-protocol.org/latest/>
- <https://github.com/GenAI-Security-Project/agent-control-standard>
- <https://genai.owasp.org/resource/agent-control-standard-acs/>

A protocol version, SDK release, service implementation, and product feature are
distinct coordinates. Each binding or pilot must identify the exact one used.

## 3. Program principles

1. **Protocol neutrality.** GKOS requirements remain transport- and vendor-
   neutral. Bindings map external protocol events and artifacts to GKOS
   responsibilities without redefining either side.
2. **No authority inheritance.** Authentication, a valid token, an Agent Card,
   a session, a task assignment, a middleware allow result, or a signed message
   does not automatically create GKOS authority.
3. **Exact versioning.** Every mapping, schema, fixture, or pilot binds to the
   exact external protocol/specification version and exact GKOS release.
4. **Mandatory gates remain deterministic.** Model confidence, ranking, or an
   external framework's advisory judgment cannot replace an applicable
   mandatory GKOS gate.
5. **Action is separately governed.** Read, retrieval, discovery, and proposal
   surfaces may be tested without consequence authority. Consequential action
   requires the exact L5–L7 records and a separately activated executor.
6. **External works remain external.** A crosswalk or adapter establishes no
   endorsement, partnership, conformity, equivalence, certification, or
   procurement recommendation.
7. **Public evidence only for public claims.** No private repository, internal
   product, undisclosed implementation, or private test environment may be
   named as the public second implementation or used as public independent-
   implementation evidence.
8. **Freshness is governed.** The source register records review dates and
   change detection. A stale mapping must be marked stale or withdrawn rather
   than silently carried forward.

## 4. Workstream E1 — external-source and review-disposition control

Create and maintain:

- a primary-source register containing external work, exact version, document
  or release URL, source owner, access date, last verification date, mapping
  scope, and limitations;
- a review-disposition register binding every critique or model review to the
  exact source revision and Standard baseline reviewed;
- explicit dispositions: accepted, accepted with narrowing, rejected,
  superseded, unresolved, or withdrawn; and
- a change-monitoring rule requiring re-review when an external protocol or
  referenced standard publishes a new version.

Withdrawn or incorrect reviews remain historical evidence. They must not be
silently deleted or presented as controlling current guidance.

## 5. Workstream E2 — MCP binding program

### 5.1 Initial target

Draft `GKOS-MCP-BINDING-0.1` against MCP `2026-07-28`. Separately document the
migration from the Engine's existing `2025-11-25` integration behavior.

### 5.2 Required mapping subjects

The binding draft should cover at least:

- protocol and implementation identity;
- request identity and `_meta` actor/client information;
- server discovery and capability representation;
- tools, resources, prompts, sampling, elicitation, tasks, extensions, and
  deprecation where used;
- input and output Source Records;
- tool/resource provenance and content fingerprints;
- Selection Envelope capture before deterministic Context Manifest assembly;
- purpose, recipient, sensitivity, restriction, and omission handling;
- policy and authority evaluation;
- Decision, Refusal, Context, State-Change, and Authorized Use records;
- read/proposal/effect surface classification;
- retry, duplicate, timeout, cancellation, and partial-result handling;
- protocol downgrade and unsupported-version refusal;
- transport, identity, credential, and log-redaction boundaries; and
- exact fixtures for bypass, confused-deputy, prompt-injection, stale context,
  expired authority, and unauthorized effect attempts.

### 5.3 Consequential-tool boundary

Read, retrieval, context, and proposal tools may be piloted under explicit
bounded contracts. A consequential MCP tool must remain default-off until a
separate effect binding supplies:

- a valid authority chain;
- exact action and effect-scope identity;
- a bound Context Manifest;
- deterministic mandatory gate results;
- an Authorized Use Record or Refusal Receipt;
- outcome and recovery evidence; and
- named operator activation authority.

A valid OAuth or other credential alone is insufficient.

## 6. Workstream E3 — A2A binding program

Draft `GKOS-A2A-BINDING-0.1` against A2A `v1.0.1`, while identifying the stable
v1.0 semantic generation and any compatibility behavior used by an SDK.

The draft should map at least:

- Agent Card identity, signer or attester, capabilities, endpoints, ownership,
  and version;
- client and remote agent identities;
- task identity, context identity, messages, parts, artifacts, status events,
  cancellation, streaming, polling, and push notifications;
- delegation and attenuation;
- proposer, reviewer, authorizer, executor, and observer role separation;
- incoming agent assertions and artifacts as attributable evidence rather than
  accepted truth;
- cross-agent context transfer, omissions, restrictions, and expiry;
- authority evaluation before consequential task execution;
- durable task and outcome evidence;
- refusal and escalation; and
- version negotiation and compatibility evidence.

A2A is complementary to MCP: MCP commonly connects an agent to tools and
resources, while A2A connects independent agents. Neither protocol replaces a
GKOS grant, Decision Record, Context Manifest, or Authorized Use Record.

## 7. Workstream E4 — OWASP Agent Control Standard crosswalk

Draft `GKOS-ACS-CROSSWALK-0.1` against ACS `v0.1.1` and clearly mark ACS as a
public-preview external specification.

The crosswalk should examine:

- observed-agent and guardian-agent identities;
- control hooks and their relationship to L4 deterministic controls;
- trace events as L1/L3 evidence inputs;
- pre-action enforcement and its relationship to L7 effect admission;
- allow, deny, and future modify semantics;
- OpenTelemetry and OCSF mappings;
- Agent Bill of Materials representations using CycloneDX, SPDX, or SWID where
  available;
- MCP and A2A instrumentation plans;
- policy, hook, and implementation versions;
- evidence loss, hook bypass, delayed control, partial instrumentation, and
  compromised-guardian failure classes; and
- receipt-generation requirements for consequential operations.

ACS hooks may supply observations and enforcement points. They do not by
themselves establish source truth, a GKOS disposition, or action authority.

## 8. Workstream E5 — agent-governance interoperability annex

Create an informative annex grounded in the existing Specialized Agent
Framework and R18. It should map GKOS responsibilities to current external
agent-governance work, including:

- NIST AI Agent Standards Initiative and NCCoE agent identity and authorization
  work;
- workload and agent identity systems;
- OAuth/OIDC and delegated authorization;
- MCP and A2A;
- ACS and OWASP agentic-security guidance;
- human accountability and graduated autonomy guidance;
- capability leases, expiry, suspension, and revocation;
- sealed evidence for independent review;
- deterministic escalation and effect containment; and
- multi-agent provenance and responsibility chains.

The annex must not create an eighth GKOS layer or claim that external
frameworks have adopted GKOS.

## 9. Workstream E6 — multi-jurisdiction deployment guidance

Create informative deployment guidance for operations that may be affected by
multiple legal, contractual, sector, or organizational policies.

The guidance should provide fields and procedures for:

- asserted jurisdiction and governing-policy references;
- source, data-subject, controller, processor, storage, processing, and
  recipient locations where applicable;
- transfer routes and restrictions;
- retention class, legal hold, deletion, erasure, and disposition predicates;
- policy identity, version, valid time, and authority;
- conflict detection and indeterminate status;
- authorized human disposition and rationale; and
- audit, appeal, correction, and re-entry.

GKOS does not decide which law or policy controls. An unresolved mandatory
hold, erasure, transfer, or retention conflict fails closed and routes for
qualified authorized disposition. “Most restrictive always wins” must not be
published as a universal legal rule.

## 10. Workstream E7 — GKOS Conformance Evidence Package 0.1

Draft an informative packaging profile using the existing conformance manifest
as the semantic root.

The profile should define:

- package version and media type;
- exact Standard, GKX, implementation, adapter, policy, fixture, and toolchain
  coordinates;
- inventory with canonical relative paths, media types, byte counts, and
  SHA-256 digests;
- conformance manifest;
- human-readable report;
- raw command output and machine reports;
- environment and dependency evidence;
- policy, schema, and fixture material needed for replay;
- limitations, exceptions, failures, and unevaluated results;
- optional signature or attestation envelopes without making one signature
  technology mandatory;
- deterministic package verification; and
- permitted carriers, initially directory tree, deterministic archive, or OCI-
  style artifact.

The package profile remains informative and non-qualifying until at least two
public implementations or assessors successfully exchange and verify it.

## 11. Workstream E8 — public second implementation

Publish the adapter contract, fixtures, ambiguity register, and evidence-
package profile openly. Invite a publicly reviewable second implementation.

A candidate must not be called independent until its public evidence supports
independence of at least:

- source and implementation lineage;
- deterministic interpretation path;
- code and dependency closure;
- fixture execution;
- ownership and operational control; and
- claim and assessment process.

Current standing: **awaiting a public second implementation**.

No private implementation is named or implied by this decision.

## 12. Workstream E9 — pilot and assessment program

Begin with low-risk, non-production pilots:

1. Viewer/Projection interoperability and defect visibility;
2. GCP-6 Context-Only retrieval with captured selection and replay;
3. MCP read/proposal binding;
4. A2A task and artifact exchange without consequential effects;
5. ACS observation/control-event ingestion;
6. evidence-package exchange between distinct tools; and
7. only after separate authority, synthetic reversible L7 effect trials.

Every pilot must publish exact coordinates, expected outcomes, actual outcomes,
failures, unsupported behavior, limitations, burden, and corrective actions.

## 13. Workstream E10 — commercial and enterprise participation

Commercial and enterprise offerings may provide implementation support,
managed adapters, hosted validation, training, workflow integration, evidence
storage, and self-assessment tooling.

Until a governed certification program exists:

- no offering may be described by this project as “GKOS certified”;
- self-assessment must not be labeled independent verification;
- products and vendors remain illustrative; and
- commercial participation does not confer standards authority or special
  control over requirements.

## 14. Workstream E11 — external standards engagement

Prepare claim-limited public contributions for relevant standards and
interoperability communities. Each submission should:

- address the receiving body's terminology and problem statement;
- offer GKOS records, fixtures, or mappings as optional implementation
  evidence;
- avoid asking the receiving body to adopt GKOS wholesale;
- state the exact GKOS maturity and governance boundary;
- preserve submitted text, responses, and disposition; and
- update the source register when the external work changes.

## 15. Drafting and review workflow

The initial R21 program draft begins immediately. A separate Sol review packet
must be prepared for a different-model-family subagent to examine:

- factual currency of all external protocol coordinates;
- mapping accuracy;
- overclaim and implementation-leakage risk;
- authority and fail-closed boundaries;
- missing fixtures and adverse cases;
- public/private evidence separation; and
- conflicts with current GKOS requirements and decisions.

No document may claim that the Sol review occurred until an actual reviewer
identity, model family, input packet digest, findings, and owner disposition are
preserved.

## 16. Deliverable sequence

### E0 — control artifacts

- external-source register;
- review-disposition register;
- ambiguity register with non-requirement identifiers;
- bindings directory and common binding template.

### E1 — initial public drafts

- MCP binding and migration note;
- A2A binding;
- ACS crosswalk;
- agent-governance interoperability annex;
- multi-jurisdiction guidance;
- conformance evidence package 0.1.

### E2 — fixtures and reference adapters

- protocol-neutral event and artifact fixtures;
- positive, negative, boundary, downgrade, bypass, and refusal cases;
- optional adapters that remain separately versioned from the Standard.

### E3 — public pilots

- Viewer, Context-Only, protocol, evidence-package, and synthetic effect pilots;
- published exact-bound reports.

### E4 — external implementation and standards engagement

- recruit and support a public second implementation;
- preserve independent findings;
- submit optional mappings and implementation evidence to relevant external
  communities.

## 17. Authority boundary

R21 authorizes drafting, review, fixture design, non-production pilots, public
calls for implementation, and external-engagement preparation. It does not
authorize:

- a normative GKOS amendment;
- a qualifying profile or conformance claim;
- endorsement of MCP, A2A, ACS, or any vendor;
- automatic adoption of future protocol versions;
- disclosure or naming of private repositories as public evidence;
- production credentials, production data, or consequential production
  effects;
- creation of a certification scheme;
- an Engine, SDK, adapter, or product release; or
- transfer of owner, reviewer, authorizer, or publication authority.

## 18. Supersession and maintenance

A later R21 revision or successor decision may change the program
prospectively. External version changes require a new reviewed source-register
entry and impact assessment. Published historical mappings remain preserved and
must be marked superseded rather than rewritten.