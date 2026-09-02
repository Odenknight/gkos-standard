# GKOS–OWASP Agent Control Standard Crosswalk 0.1

- **Document ID:** GKOS-ACS-CROSSWALK-0.1
- **Status:** informative exploratory draft under R21; not an ACS profile, GKOS
  profile, endorsement, conformance claim, or runtime authorization
- **Date:** 2026-09-02
- **GKOS baseline:** GKOS-2026-08-20 v0.80 and applicable merged development
  decisions
- **ACS target:** OWASP Agent Control Standard `v0.1.1`
- **ACS maturity:** public preview
- **External-source register:** `../EXTERNAL_SOURCE_REGISTER.md`

## 1. Purpose

This crosswalk examines how Agent Control Standard observations, hooks, traces,
and Agent Bill of Materials information may contribute to a GKOS deployment.

ACS is a fast-moving external public-preview specification. This document does
not make ACS a GKOS dependency, does not assert equivalence, and does not claim
that an ACS implementation satisfies any GKOS requirement.

## 2. Four statement classes

### Standard requires

Applicable GKOS requirements control evidence, authority, context, validation,
review, action, and receipt behavior.

### Crosswalk recommends

This draft identifies candidate mappings and adverse cases for testing.

### Implementation example

An ACS guardian, agent instrumentation library, OpenTelemetry exporter, OCSF
mapping, or AgBOM producer is an implementation fact and must be pinned to its
exact version and configuration.

### Not in the Standard

Observed Agent, Guardian Agent, ACS hook names, OpenTelemetry, OCSF, AgBOM,
CycloneDX, SPDX, and SWID are external constructs. They do not become GKOS
artifacts merely because they are present in a trace.

## 3. ACS component model considered

The current ACS public-preview work describes three broad concerns:

1. **Instrument:** runtime hooks through which agent behavior may be observed,
   allowed, denied, or later modified as the specification develops;
2. **Trace:** events intended for observability and security-event pipelines,
   including OpenTelemetry and OCSF mappings; and
3. **Inspect:** dynamic Agent Bill of Materials information describing agents,
   models, tools, services, dependencies, and accessible data or capabilities.

These concerns are compatible with several GKOS layers, but they are not the
same model and must not be forced into a one-to-one equivalence.

## 4. High-level crosswalk

| ACS concern | Candidate GKOS contribution | Boundary |
| --- | --- | --- |
| Observed Agent identity | L2 actor reference and L3 ownership/dependency assertions | Self-declared identity must be verified through the deployment trust system |
| Guardian Agent identity | L2 control actor and L4/L7 policy-enforcement participant | Guardian status does not create authority to approve or rewrite governed state |
| Agent trigger or input hook | L1 input evidence and L4 pre-processing control | Hook observation does not prove that all inputs were observed |
| Message hook | L1 message evidence and L3 sender/recipient assertion | Message content is evidence, not truth or acceptance |
| Tool-call request hook | L4 control input and possible L7 effect-admission point | Allow/deny result is not automatically a GKOS Decision Record or grant |
| Knowledge-retrieval hook | L1 retrieval evidence and L6 Selection Envelope input | Retrieval output must be captured before deterministic context assembly |
| Memory-store hook | Potential governed mutation and State-Change Receipt input | Memory write may be derived state or governed state; the distinction must be declared |
| ACS allow result | L4 policy outcome evidence | May permit technical continuation only inside the separately established GKOS authority envelope |
| ACS deny result | L4 control evidence and possible Refusal Receipt input | Must preserve reason, policy version, affected operation, and outcome |
| ACS modify result, when available | Proposed transformed input/output and possible governed mutation | Original and modified values, authorizer, policy, and state-change evidence must remain distinct |
| Trace event | L1 event source and L3 temporal/causal assertion | Telemetry loss, sampling, redaction, and exporter failure must be declared |
| OpenTelemetry mapping | Transport and observability mechanism | Span or event identity is not automatically a stable GKOS object identity |
| OCSF mapping | Security-event interoperability mechanism | Security classification is not a substantive GKOS disposition |
| AgBOM | L2 inventory object and L3 dependency/capability assertions | Inventory accuracy, freshness, completeness, and signer trust require separate evidence |
| CycloneDX/SPDX/SWID output | External inventory serialization | Serialization validity does not prove runtime identity or complete agent composition |

## 5. Observed Agent and Guardian Agent roles

A GKOS-integrated deployment should identify separately:

- Observed Agent identity and version;
- accountable owner and operator;
- Guardian Agent identity and version;
- guardian owner and operator;
- instrumentation package and version;
- policy decision point and policy bundle;
- hook registry and enabled/disabled hook set;
- trace exporter and storage path;
- AgBOM producer and inventory time;
- protected data boundary; and
- reviewer, authorizer, executor, and auditor roles.

The guardian must not approve its own authority, assign itself broader scope, or
silently change the policy that governs its decisions.

## 6. Hook-to-layer considerations

### 6.1 Input and trigger hooks

Candidate GKOS records:

- Source Record for the received prompt, event, task, or environmental input;
- actor and transport assertions;
- sensitivity, retention, and jurisdiction classification;
- deterministic admission diagnostic; and
- refusal or quarantine outcome where required.

Negative cases include uninstrumented alternate input paths, hidden system
prompts, environment-variable input, delayed events, and parser disagreement.

### 6.2 Message hooks

Messages may be human-to-agent, agent-to-human, agent-to-agent, or internal.
The deployment should preserve sender, recipient, task/context references,
content type, received time, sensitivity, and the exact policy-authorized
content representation.

A message claiming “approved,” “verified,” or “authorized” remains an assertion
until the referenced authority is resolved and validated.

### 6.3 Tool-call hooks

A tool-call hook is a natural L4 control point and may become part of L7 action
admission. The integration should record:

- tool identity and version;
- proposed arguments and action digest;
- actor and delegator;
- purpose and recipient;
- relevant Context Manifest;
- policy and gate set;
- allow/deny/modify result;
- technical continuation or refusal;
- actual tool invocation and response; and
- final outcome and recovery evidence.

Technical allow is not enough for a consequential effect unless the complete
GKOS authority and review path also passes.

### 6.4 Knowledge-retrieval hooks

Capture the complete operative selection result, including candidate IDs,
filters, ranks, omissions, contradictions, and selected items. A trace event
recording only the final top result is insufficient when omitted candidates or
policy filters materially affected the context.

### 6.5 Memory-store hooks

The integration must classify the target as one of:

- ephemeral model/runtime state;
- rebuildable derived projection;
- user workspace data;
- governed knowledge state;
- authority/policy/configuration state; or
- external consequential system.

A governed-state commit requires the applicable decision and State-Change
Receipt path. A rebuildable cache write must not be represented as a governed
knowledge mutation.

## 7. Control outcome mapping

| ACS outcome | GKOS treatment |
| --- | --- |
| `allow` | Control result permitting technical continuation inside the existing authority envelope; not a grant or Decision Record |
| `deny` | Control result; generate or contribute to a Refusal Receipt when the operation cannot proceed |
| `modify` | Preserve original, proposed modification, policy/actor, modified value, and subsequent decision; never silently overwrite evidence |
| no result | Indeterminate control state; fail closed when the hook is mandatory |
| timeout | Indeterminate unless a separately adopted deterministic timeout policy produces a bounded refusal |
| exporter-only observation | Evidence after the fact; cannot substitute for a required preventive gate |

## 8. Trace and telemetry evidence

A trace integration should record:

- trace schema and version;
- instrumentation and exporter versions;
- hook and operation identity;
- trace/span/event IDs and parent relationships;
- event time and clock source;
- actor, task, tool, model, resource, and policy references;
- redaction and sampling configuration;
- dropped-event counters and exporter health;
- storage and retention policy;
- integrity mechanism where used; and
- known gaps.

A telemetry pipeline that samples, aggregates, or redacts events may still be
useful, but it cannot claim complete action evidence without demonstrating the
required coverage.

## 9. AgBOM considerations

An Agent Bill of Materials may contribute:

- models and model versions;
- prompts and configuration bundles;
- agent framework and runtime;
- tools and connectors;
- MCP/A2A endpoints and extensions;
- policy and guardrail components;
- memory, retrieval, and data systems;
- external services;
- packages and supply-chain components;
- owners and operators; and
- declared capabilities and accessible resources.

A GKOS binding should additionally preserve:

- inventory time and validity window;
- acquisition method;
- completeness statement;
- unknown/dynamic components;
- changes since the prior inventory;
- sensitivity and protected fields;
- attester or signer evidence where used; and
- the exact inventory digest relied upon for review or action.

Dynamic agent composition requires repeated inventory evidence. A static AgBOM
cannot prove that no tool, model, or dependency changed at runtime.

## 10. Failure and bypass model

The crosswalk should test at least:

- mandatory hook absent;
- hook registered but never invoked;
- agent uses an uninstrumented alternate transport;
- guardian unavailable;
- guardian policy stale, missing, or indeterminate;
- observed agent and guardian share unauthorized self-approval authority;
- tool invocation occurs before the control result;
- effect commits after deny;
- trace emitted only after irreversible action;
- trace exporter drops or reorders events;
- sampling omits the consequential event;
- redaction removes required evidence;
- AgBOM omits a dynamically loaded tool or model;
- compromised guardian returns allow;
- ACS result conflicts with a mandatory GKOS gate;
- modify result overwrites the original input;
- telemetry leaks protected content; and
- policy or hook configuration changes without a State-Change Receipt.

Where ACS and an applicable mandatory GKOS gate conflict, the more permissive
external result cannot override the GKOS refusal.

## 11. Initial fixture plan

| Fixture ID | Class | Expected result |
| --- | --- | --- |
| ACS-B01 | Observed read-only tool call with complete hooks | PASS as mechanism evidence only |
| ACS-B02 | Denied tool call | Denial and policy evidence preserved; no tool execution |
| ACS-N01 | Mandatory hook missing | Refusal or non-qualifying result |
| ACS-N02 | Guardian unavailable | Indeterminate; mandatory path fails closed |
| ACS-N03 | Tool executes before allow | Ordering failure |
| ACS-N04 | Tool executes after deny | Containment failure and incident evidence |
| ACS-N05 | Trace sampling drops consequential event | Completeness failure |
| ACS-N06 | AgBOM omits dynamically loaded capability | Inventory failure |
| ACS-N07 | Modify replaces original input without lineage | Source-preservation failure |
| ACS-N08 | ACS allow conflicts with mandatory GKOS deny | GKOS deny remains effective |
| ACS-N09 | Guardian changes its own policy | Role/authority failure |
| ACS-N10 | Protected payload appears in telemetry | Disclosure failure |
| ACS-A01 | Forged guardian identity | Identity failure and refusal |
| ACS-A02 | Complete-looking trace with a bypassed hook | False-completeness detection |

Fixture IDs are informative crosswalk identifiers and are not permanent GKOS
diagnostics.

## 12. Evidence package

A pilot should include:

- ACS version and source commit;
- agent, guardian, instrumentation, policy, exporter, and AgBOM versions;
- hook registry and enabled-hook digest;
- exact GKOS binding version;
- event schemas and mappings;
- raw trace and inventory samples with protected values handled by policy;
- executed fixture results;
- dropped-event and exporter-health evidence;
- environment and dependency closure;
- limitations and unsupported surfaces; and
- assessment type.

## 13. Maturity boundary

ACS `v0.1.1` is a public-preview external input. Planned reference
implementations, broader MCP/A2A instrumentation, and future deny/modify
capabilities must not be described as current behavior until their exact
published versions are reviewed.

## 14. Open questions

See `../AMBIGUITY_REGISTER.md`, especially:

- `EAR-ACS-001` hook completeness;
- `EAR-ACS-002` allow/deny/modify mapping; and
- `EAR-ACS-003` guardian compromise.

## 15. Claim boundary

This draft establishes no ACS or GKOS conformance, compatibility, completeness,
security assurance, certification, endorsement, or production authority.
