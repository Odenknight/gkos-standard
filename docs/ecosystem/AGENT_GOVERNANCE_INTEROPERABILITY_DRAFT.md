# Agent governance interoperability annex

- **Document ID:** GKOS-AGENT-INTEROP-0.1
- **Status:** informative draft under R21; not normative, qualifying,
  regulator-approved, or an external-framework mapping
- **Date:** 2026-09-02
- **GKOS baseline:** GKOS-2026-08-20 v0.80 and applicable merged development
  decisions
- **External-source register:** `EXTERNAL_SOURCE_REGISTER.md`

## 1. Purpose

This annex explains how existing GKOS responsibilities may support governance
of AI agents operating through current identity, tool, agent-to-agent, runtime-
control, and organizational-governance mechanisms.

GKOS does not replace an agent runtime, identity provider, authorization server,
policy engine, sandbox, observability platform, model-evaluation program, or
human accountability structure. It defines records and boundaries that help
those systems produce inspectable evidence from source through consequential
action.

No external body or project is represented as having adopted, approved, or
endorsed GKOS.

## 2. Current external context

### NIST AI Agent Standards Initiative

NIST's current initiative emphasizes industry-led standards, community-led open
protocols, agent authentication and identity infrastructure, and security
evaluations. GKOS may contribute implementation-level records and fixtures to
those questions, but it does not establish NIST alignment or conformity.

### NCCoE agent identity and authorization work

NCCoE is examining standards-based approaches for identifying, managing, and
authorizing software and AI-agent access and actions. The current project page
is in a reviewing-comments stage. GKOS can help separate identity evidence,
policy decisions, delegated authority, context, action, and outcome.

### IMDA Model AI Governance Framework for Agentic AI

IMDA's 2026 framework emphasizes up-front risk bounding, meaningful human
accountability, technical controls across the lifecycle, and end-user
responsibility. Its May 2026 update added multi-agent and third-party-agent
practices and case studies. GKOS can preserve how those organizational controls
were applied but does not replace them.

### MCP, A2A, and ACS

- MCP can carry tool, resource, prompt, context, sampling, elicitation, task,
  and extension interactions.
- A2A can carry independent-agent discovery, tasks, messages, artifacts, and
  status events.
- ACS can expose runtime control hooks, traces, and agent inventory evidence.

Each supplies mechanisms or observations. None creates GKOS authority by
itself.

## 3. Existing GKOS agent foundations

The existing Specialized Agent Framework requires an agent contract to identify
at least:

- stable identity and accountable owner;
- competency and dependency declarations;
- read, proposal, write, and prohibited scopes;
- evidence and citation expectations;
- risk and effect limits;
- delegation and subdelegation boundaries;
- validity, expiry, evaluation, suspension, and revocation; and
- applicable escalation and recovery.

R18 additionally permits a bounded independent Review Agent in the v0.81
development line only when its model family, authority, evidence packet,
deterministic gate path, non-self-review boundary, and human escalation route
are separately established.

This annex does not create general autonomous approval or effect authority.

## 4. Agent lifecycle model

A governed agent deployment should preserve the following lifecycle stages:

1. **Definition:** owner, purpose, capabilities, dependencies, prohibited
   operations, and risk classification are declared.
2. **Provisioning:** identity, credentials, policy, environment, tools, data,
   and model artifacts are provisioned through authorized state changes.
3. **Qualification:** deterministic and non-deterministic evaluations are
   executed, reported separately, and bounded to exact versions.
4. **Activation:** a named authority activates a specific agent configuration
   for a specific environment, purpose, and time window.
5. **Operation:** every relevant input, assertion, control result, decision,
   context, action, refusal, and outcome is recorded under the applicable GKOS
   layer contracts.
6. **Change:** model, prompt, tool, policy, identity, dependency, authority, or
   environment changes create new versions and may invalidate prior evidence.
7. **Suspension or revocation:** authority and credentials are disabled without
   erasing prior evidence.
8. **Retirement:** records, credentials, artifacts, holds, and residual effects
   are dispositioned through applicable policy.

## 5. Layer-by-layer agent mapping

### L1 — agent inputs and original evidence

Preserve or reference the exact operative revision of:

- human prompts and approvals;
- system/developer prompts and agent instructions where disclosure is
  authorized;
- retrieved documents and data;
- MCP resources and tool responses;
- A2A messages, Agent Cards, and artifacts;
- ACS events and inventories;
- model, tool, policy, and environment evidence;
- sensor or external-system feedback; and
- previous agent outcomes re-entered as new evidence.

Input preservation does not make the input true, safe, current, or authorized.

### L2 — agent and artifact identity

Assign stable governed references to:

- agents, owners, operators, and organizations;
- model and model configuration;
- prompt/instruction bundle;
- tool and resource registry;
- policy and gate set;
- capability lease and authority grant;
- task and workflow instance;
- context and evidence packet;
- execution environment; and
- produced artifacts and receipts.

Protocol session, process, endpoint, token subject, task, or trace IDs may be
recorded, but are not automatically the stable governed identity.

### L3 — agent assertions, relationships, and lineage

Record separately:

- what each human, model, tool, or agent asserted;
- sources and evidence anchors;
- confidence, relevance, uncertainty, and limitations;
- contradictions and contested claims;
- task delegation and dependency relationships;
- model/tool/policy/environment dependencies;
- supersession and correction;
- causal and temporal relationships; and
- communication and responsibility chain.

An agent's claim that a task is complete or a source is authoritative remains an
assertion until the applicable controls and review establish the next standing.

### L4 — deterministic controls

Applicable agent controls may include:

- identity and credential verification;
- capability and tool registry validation;
- purpose and recipient checks;
- least-privilege and delegation attenuation;
- sensitivity and protected-disclosure rules;
- schema and argument validation;
- context freshness and hash binding;
- model/tool/policy version allowlists;
- environment and network boundaries;
- task and effect classification;
- rate, cost, resource, and time limits where governed by deployment policy;
- prompt-injection and confused-deputy containment;
- action idempotency and replay control; and
- recovery-route availability.

Mandatory failure or indeterminacy fails closed as required. A model-based risk
judge may increase restrictiveness or produce evidence but cannot silently
replace a deterministic mandatory gate.

### L5 — review and workflow

Use an authorized append-only disposition for proposals that require review.
Preserve:

- proposer and reviewer identities;
- human or authorized Review Agent class;
- exact proposal and evidence digest;
- deterministic findings;
- context identity/hash where used;
- decision type, conditions, rationale, expiry, and escalation;
- evaluated and effective decisions where distinct; and
- appeal, withdrawal, supersession, and correction.

No agent approves its own work, authority, assignment, policy, gate logic, or
autonomy envelope.

### L6 — purpose-bound context

Capture non-deterministic selection before deterministic assembly. Include:

- intended purpose and recipient;
- selected evidence and versions;
- selection/ranking/routing output;
- contradictions and unresolved claims;
- restrictions and warnings;
- omissions and unavailable sources;
- policy, model, tool, and environment versions;
- freshness and expiry;
- relevant prior decisions; and
- sensitivity and jurisdictional handling.

Later retrieval is new evidence and does not rewrite the original context.

### L7 — consequential action

Before action:

- identify the exact actor and executor;
- verify the valid authority and delegation chain;
- verify the exact action, target, recipient, and effect scope;
- bind the exact Context Manifest;
- re-run action-time deterministic controls;
- verify required review and role separation;
- verify recovery, rollback, compensation, or appeal route; and
- refuse if mandatory evidence is missing, stale, expired, conflicting, or
  indeterminate.

After action, record the actual outcome and any residual uncertainty. Technical
capability or a successful API call is not proof of authorization.

## 6. Identity and authorization separation

A governed deployment should keep these facts distinct:

| Fact | Typical mechanism | GKOS treatment |
| --- | --- | --- |
| Claimed identity | Agent Card, MCP metadata, token subject, workload metadata | L2 assertion requiring verification |
| Authenticated identity | OIDC, mTLS, SPIFFE, PKI, platform identity | Verified identity evidence; not complete authorization |
| Access policy result | OPA, Cedar, OpenFGA, IAM/PAM, gateway policy | L4 control input/result |
| Organizational authority | contract, role, delegation, policy, owner decision | Grant or Decision evidence |
| Purpose-bound authorization | exact grant plus context, target, time, action, effect scope | L7 action-time admission |
| Executed action | tool, API, workflow, transaction, publication | Outcome and State-Change/Authorized Use evidence |

A single token must not collapse all six concepts.

## 7. Capability leases and activation

An agent capability lease should be:

- explicit;
- bounded by purpose, resource, operation, recipient, environment, and effect;
- versioned;
- time-limited where appropriate;
- no broader than originating authority;
- revocable and suspendable;
- tied to exact agent, model, tool, policy, and environment identities;
- subject to mandatory escalation; and
- recorded in action receipts when relied upon.

Possessing code for a capability or discovering a tool does not activate it.

## 8. Multi-agent chains

For every multi-agent interaction, preserve:

- initiating principal;
- delegator and delegation basis;
- sender and receiver agent identities;
- task and purpose;
- Agent Card or capability evidence;
- messages and artifacts;
- context transferred and omitted;
- subdelegation;
- policy and control decisions;
- reviewer/authorizer/executor roles;
- final effect and recipient; and
- outcome and recovery.

Each agent's output remains attributable to that agent and does not inherit the
standing of the agent that requested it.

## 9. Meaningful human accountability

Human accountability is not satisfied merely by displaying a confirmation box.
A meaningful checkpoint should provide the authorized reviewer with:

- sufficient time and competence;
- exact decision scope;
- purpose-bound evidence and warnings;
- known contradictions and omissions;
- agent/model/tool identity and limitations;
- deterministic findings;
- reversible or irreversible effect description;
- ability to reject, defer, narrow, escalate, or withdraw; and
- a record of the final disposition.

Automation bias and rubber-stamp review should be evaluated as human-factor
risks in pilots.

## 10. Graduated autonomy

A deployment may define autonomy classes, but every class must state:

- what the agent may observe;
- what it may propose;
- what governed state it may write;
- what effects it may perform;
- required deterministic gates;
- human checkpoints;
- permitted delegation;
- maximum duration and resource bounds;
- suspension/revocation triggers; and
- evidence and review cadence.

Higher technical autonomy never eliminates the need for a valid authority
source and action-time effect boundary.

## 11. Protocol placement

| External mechanism | Primary use | GKOS boundary |
| --- | --- | --- |
| MCP `2026-07-28` | Agent-to-tool/resource/context integration | Transport and capability surface; binding must add GKOS records and effect admission |
| A2A `v1.0.1` | Independent-agent discovery and collaboration | Task/message/artifact exchange; delegation and authority remain separate |
| ACS `v0.1.1` | Runtime hooks, trace, and AgBOM | Observation/control mechanism; completeness and authority require GKOS evidence |
| OIDC/OAuth | Authentication and delegated access | Token claims and scopes are inputs, not complete GKOS authorization |
| SPIFFE/SPIRE | Workload identity | Authenticated workload reference, not substantive decision authority |
| OPA/Cedar/OpenFGA | Deterministic policy evaluation | L4 control or L7 policy input; decision record and context binding remain separate |
| OpenTelemetry/OCSF | Observability and security events | Event evidence; sampling and loss must be disclosed |
| Sigstore/in-toto | Integrity and provenance | Proof under a trust model; not truth, review, or authority by itself |

## 12. Threat and failure model

At minimum assess:

- prompt injection and indirect prompt injection;
- context poisoning and stale retrieval;
- malicious tool output;
- confused deputy;
- identity spoofing and credential replay;
- excessive or ambiguous delegation;
- hidden subagents or dynamic tools;
- same-model or same-path false independence;
- policy/gate mutation;
- registry change after review;
- cross-tenant or cross-purpose disclosure;
- partial effect, uncertain outcome, and failed rollback;
- monitoring gaps and dropped events;
- compromised guardian or policy service;
- model/tool/provider substitution;
- autonomy continuing after authority expiry;
- unavailable human escalation; and
- outcome reused without re-entry.

## 13. Initial agent-governance fixtures

| Fixture ID | Scenario | Expected result |
| --- | --- | --- |
| AG-B01 | Read-only agent with bounded identity and tools | Mechanism PASS; no effect authority |
| AG-B02 | Proposal agent produces cited recommendation | Proposal preserved; no self-approval |
| AG-N01 | Agent identity unavailable | Mandatory operation refused |
| AG-N02 | Tool not in governed registry | Refused |
| AG-N03 | Delegation broadens originating authority | Refused |
| AG-N04 | Same agent proposes and approves | Review failure |
| AG-N05 | Different label but same model/operational path | Independence unproven; escalation |
| AG-N06 | Context changed after approval | Stale-context refusal |
| AG-N07 | Authority expired before effect | Refusal; no effect |
| AG-N08 | Agent exceeds effect scope | Refusal/containment failure evidence |
| AG-N09 | Human review omits warnings or contradictions | Review/context failure |
| AG-N10 | Trace missing for committed effect | Receipt/evidence failure |
| AG-N11 | Outcome reintroduced with inherited acceptance | Re-entry failure |
| AG-A01 | Prompt injection requests privileged tool | Mandatory controls preserve refusal |
| AG-A02 | Remote agent claims approval authority in message | Assertion recorded; authority rejected |

Fixture IDs are informative and do not allocate GKOS diagnostic codes.

## 14. Pilot requirements

A public agent-governance pilot should disclose:

- use case and risk classification;
- exact GKOS and external protocol versions;
- agent, model, prompt, tool, policy, and environment coordinates;
- identities, roles, grants, and capability leases;
- enabled and disabled operations;
- fixture and scenario set;
- expected and observed outcomes;
- failures, unsupported features, and human-factor findings;
- evidence package and integrity verification; and
- no-production-effect boundary unless separately authorized.

## 15. External-framework claim boundary

A successful GKOS pilot does not prove compliance with NIST, IMDA, OWASP, or
any law. A successful external-framework assessment does not prove GKOS
conformance. Crosswalks identify possible evidence relationships only.

## 16. Open issues

See `AMBIGUITY_REGISTER.md`, including:

- agent reviewer independence;
- multi-agent responsibility chains;
- protocol version migration;
- runtime hook completeness;
- delegated task authority; and
- public second implementation.

## 17. Standing

This annex is an immediate R21 draft. It authorizes no production agent,
credential, connection, writer, effect, or autonomy activation.