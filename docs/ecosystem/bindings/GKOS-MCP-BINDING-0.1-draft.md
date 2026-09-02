# GKOS–MCP Binding 0.1

- **Document ID:** GKOS-MCP-BINDING-0.1
- **Status:** informative draft under R21; not a GCP profile, protocol
  extension, conformance claim, or runtime authorization
- **Date:** 2026-09-02
- **GKOS baseline:** GKOS-2026-08-20 v0.80 and merged development decisions
  through R20/R21 when those decisions reach `main`
- **Primary MCP target:** Model Context Protocol `2026-07-28`
- **Migration input:** MCP `2025-11-25`
- **External-source register:** `../EXTERNAL_SOURCE_REGISTER.md`

## 1. Purpose

This draft maps MCP requests, tools, resources, prompts, sampling, elicitation,
tasks, and extensions to GKOS evidence, context, review, and authorized-use
responsibilities.

It does not redefine MCP and does not make MCP a GKOS dependency. An MCP client,
server, gateway, SDK, or tool may participate in a GKOS deployment only through
a separately versioned adapter whose actual behavior is tested.

## 2. Four statement classes

### Standard requires

The applicable GKOS release determines the required evidence, identity,
lineage, deterministic controls, review, context, authority, outcome, and
receipt behavior.

### Binding recommends

This draft recommends one interoperable way to map MCP observations and actions
to those requirements.

### Implementation example

A named SDK, server, or Engine behavior is an implementation fact and must be
pinned to its exact version or commit.

### Not in the Standard

MCP method names, HTTP headers, `_meta` keys, server discovery, task extensions,
and transport lifecycle are external protocol constructs. They are not GKOS
requirements unless a later decision expressly adopts a mapping obligation.

## 3. MCP version boundary

### 3.1 Target era: `2026-07-28`

The target MCP generation is stateless:

- no `initialize`/`initialized` handshake is required;
- no `Mcp-Session-Id` is required by the protocol lifecycle;
- every request carries its protocol version;
- client identity and capability information is request metadata;
- `server/discover` may advertise server capabilities but is not required
  before every request;
- HTTP method and tool routing metadata may appear in protocol headers; and
- Tasks and other capabilities may be delivered through versioned extensions.

A GKOS adapter must record the actual request and metadata received. It must not
reconstruct a fictional session merely because an earlier implementation used
one.

### 3.2 Supported predecessor: `2025-11-25`

The predecessor generation uses the handshake-era lifecycle. An existing
implementation may continue to support it, but it must:

- identify `2025-11-25` as the actual protocol version;
- preserve initialize/session evidence where applicable;
- publish a version-negotiation and downgrade policy;
- refuse unsupported or ambiguous versions deterministically; and
- never represent predecessor behavior as `2026-07-28` conformance.

### 3.3 SDK and service versions

The protocol version, SDK version, client version, server version, gateway
version, and tool implementation version are independent coordinates. A claim
or evidence package must record each coordinate actually used.

## 4. Capability classes

Every exposed MCP operation should be declared in one of the following binding
classes. These classes are informative and do not amend the MCP specification.

| Class | Meaning | Maximum default authority |
| --- | --- | --- |
| `OBSERVE` | Read protocol, capability, health, or audit metadata | No governed mutation or consequential effect |
| `RETRIEVE` | Read resources, search, lineage, or context candidates | No governed acceptance or external effect |
| `PROPOSE` | Produce a candidate, plan, draft, assessment, or review aid | Proposal only; no self-approval or materialization |
| `GOVERNED_WRITE` | Commit governed knowledge or configuration state | Requires applicable L4/L5 decision and State-Change Receipt path |
| `EFFECT` | Change an external operational system or create a consequential outcome | Requires full action-time L4–L7 admission and outcome evidence |
| `ADMIN` | Change identities, grants, policies, credentials, tool registry, or control configuration | Separate administrative authority; never inferred from ordinary tool access |

Unknown, undeclared, or dynamically changed tools must not inherit a permissive
class.

## 5. Minimum binding identity

A binding implementation should identify:

- binding ID and version;
- GKOS release and GKX version;
- MCP protocol version;
- SDK, client, server, gateway, and tool versions;
- endpoint and transport class without exposing protected secrets;
- actor, owner, operator, and accountable organization references;
- credential and workload-identity mechanism;
- tool/resource/prompt/extension registry digest;
- policy and gate-set identities and digests;
- supported capability classes;
- disabled and unsupported surfaces;
- log, retention, sensitivity, and jurisdiction policies; and
- implementation commit or artifact digest.

A URL, process ID, session ID, token subject, or tool name is not automatically
the stable governed actor or artifact identity.

## 6. MCP-to-GKOS mapping

| MCP observation or operation | Primary GKOS contribution | Required boundary |
| --- | --- | --- |
| Request bytes and headers | L1 Source Record input | Preserve exact operative request or a policy-authorized canonical capture; record omitted protected fields explicitly |
| `_meta` client identity and capabilities | L2 actor/version assertion | Treat as an asserted identity input until verified by the deployment identity system |
| `server/discover` result | L1 source plus L2/L3 capability assertion | Discovery describes capabilities; it grants no authority to call them |
| Tool/resource/prompt registry | L2 stable tool/artifact references and L3 dependency records | Registry changes require their own version and state-change evidence |
| `resources/read` or equivalent | L1 retrieved source and L3 provenance | Returned content must retain source identity, revision, sensitivity, and access context |
| Tool search or selection | L6 Selection Envelope | Capture candidates, ranking inputs, filters, omissions, policy results, and final selection |
| Prompt retrieval or prompt template | L1/L2 source and structured object | A prompt is evidence or configuration, not authority |
| Sampling request or model response | L1 input/output plus L3 assertion | Model confidence and reasoning are non-authoritative assertions unless separately reviewed |
| Elicitation request/response | L1 human or external input and L5 workflow evidence where applicable | Consent, approval, and data-entry responses must not be conflated |
| Task extension lifecycle | L2 task identity, L3 lineage, L5 workflow, L7 outcome where applicable | Extension and task versions must be explicit; task creation alone grants no effect authority |
| `tools/call` classified `OBSERVE`, `RETRIEVE`, or `PROPOSE` | L4 control result plus output evidence | Cannot mutate governed state or external systems outside the declared class |
| `tools/call` classified `GOVERNED_WRITE` | L4 controls, L5 Decision Record, State-Change Receipt | Must bind exact proposal, decision, before/after state, actor, authority, and outcome |
| `tools/call` classified `EFFECT` | L6 Context Manifest and L7 Authorized Use Record or Refusal Receipt | Must re-evaluate authority and effect scope at action time |
| Tool error, timeout, cancellation, or refusal | L4 diagnostic, Refusal Receipt, or workflow outcome | Failure must remain distinct from success, partial success, unknown outcome, and retry |
| Tool output later reused | New L1 re-entry | It receives no inherited review, context, or authorized-use standing |

## 7. Request admission sequence

A conforming implementation is not required to use this exact process layout,
but the resulting records and boundaries must be equivalent for the claimed
scope.

### Step 1 — receive and capture

Capture:

- protocol version;
- method and operation name;
- request ID or correlation identity;
- client metadata;
- exact arguments or their authorized protected-field representation;
- transport and endpoint identity;
- received time; and
- authentication evidence reference.

### Step 2 — resolve governed identities

Resolve or refuse:

- actor identity;
- accountable owner;
- MCP client and server versions;
- tool/resource/prompt identity and version;
- capability class;
- policy and gate set;
- applicable grant; and
- jurisdiction, sensitivity, and retention handling.

### Step 3 — apply deterministic admission controls

Applicable controls should test at least:

- recognized protocol version;
- declared operation;
- argument schema;
- actor and credential validity;
- grant purpose, resource, operation, time, and effect scope;
- capability-class boundary;
- sensitivity and protected-disclosure rules;
- context freshness and binding;
- delegation attenuation;
- duplicate, retry, and replay policy; and
- required recovery route.

A model-based checker may increase restrictiveness or provide evidence but must
not turn a mandatory deterministic refusal into an allow result.

### Step 4 — capture selection before context assembly

For retrieval, routing, model, prompt, resource, or tool selection, capture the
complete operative selection output before deterministic Context Manifest
assembly. The capture should include:

- requested purpose and query;
- candidate identifiers and versions;
- filters and access decisions;
- ranking or routing outputs;
- contradictions detected;
- omitted or unavailable candidates;
- selected items;
- model/provider identity where consulted; and
- generation time and expiry.

### Step 5 — obtain review where required

A `PROPOSE` result does not approve itself. When policy requires L5 review, bind
an authorized Decision Record to the exact proposal, evidence, control results,
and Context Manifest used.

### Step 6 — action-time authorization

Before a `GOVERNED_WRITE`, `EFFECT`, or `ADMIN` operation commits:

- re-evaluate authority validity at the captured action time;
- verify the exact Context Manifest and action digest;
- verify that delegation and actor scopes contain the proposed effect;
- verify role separation and required review;
- verify the effect is inside the permitted dimensions;
- verify the recovery, rollback, compensation, or appeal route; and
- refuse if any mandatory input is unavailable or indeterminate.

### Step 7 — receipt and outcome

Record success, refusal, failure, partial completion, unknown outcome, rollback,
or compensation distinctly. Every committed governed state change must have a
durable receipt binding the before/after state and authority.

## 8. MCP `2026-07-28` metadata treatment

The following is binding guidance, not MCP normative text.

| Protocol element | GKOS treatment |
| --- | --- |
| `MCP-Protocol-Version` | Exact external protocol coordinate for the request; missing, unsupported, or ambiguous values follow the declared refusal policy |
| `Mcp-Method` | Routing assertion; compare to the JSON-RPC method and refuse inconsistency when relied upon |
| `Mcp-Name` | Tool or named-resource routing assertion; resolve to a stable governed registry identity and exact version |
| `_meta` client information | Attributable client assertion; bind to authenticated workload identity rather than treating self-description as proof |
| `server/discover` | Versioned capability evidence; record discovery revision and do not infer permission |
| Extensions | Record extension ID, version, schema, implementation, and whether it changes evidence, authority, or effect behavior |

Protected credentials and secrets must not be copied into general evidence
packages. Evidence should retain the credential mechanism, subject/reference,
verification result, and protected locator or digest allowed by policy.

## 9. Migration matrix from `2025-11-25`

| Earlier behavior | `2026-07-28` consideration | Required GKOS migration evidence |
| --- | --- | --- |
| Initialize handshake | Stateless request lifecycle | Preserve old handshake/session evidence for predecessor runs; do not fabricate it for new runs |
| Session identifier | Per-request correlation and identity metadata | Define new durable request/task correlation rules; session IDs remain historical transport data, not object identity |
| Capability negotiation during initialization | Optional discovery and request-carried capabilities | Record the actual discovery or per-request capability assertion used |
| Long-lived server/client state assumptions | Requests may land on different server instances | Bind policy, registry, and artifact versions per request or through immutable references |
| Earlier version negotiation | Version carried on each request | Test downgrade, missing version, unsupported version, and mixed-header/body cases |
| Core/extension surface differences | Tasks and other features may be extensions | Record extension identity, schema, and lifecycle separately from the core protocol |

A migration must not silently reinterpret predecessor receipts under the newer
protocol model.

## 10. Security and governance threats

The binding should include negative fixtures for at least:

- prompt or resource injection attempting to select an unauthorized tool;
- confused deputy between an authenticated client and a higher-authority tool;
- client `_meta` identity inconsistent with workload identity;
- discovery response substituted after review;
- tool registry changed between context assembly and execution;
- protocol downgrade or mixed-version request;
- hidden tool or dynamic tool not present in the governed registry;
- credential leakage into evidence or logs;
- replayed, duplicated, or retried effect request;
- cancellation after an effect may already have committed;
- partial tool success represented as complete success;
- tool output reused without Layer-1 re-entry;
- expired or revoked authority;
- context hash mismatch;
- unsupported extension treated as supported;
- bypass of the policy or receipt path; and
- response filtering that leaks denied information through counts, errors,
  timing-sensitive detail, or derived metadata.

## 11. Initial fixture plan

| Fixture ID | Class | Expected result |
| --- | --- | --- |
| MCP-B01 | Supported `2026-07-28` read request | PASS with Source and Control evidence; no action authority |
| MCP-B02 | Supported predecessor `2025-11-25` request | PASS only in declared compatibility lane |
| MCP-N01 | Missing or unsupported protocol version | Deterministic refusal |
| MCP-N02 | Header/body method mismatch | Refusal or policy-defined failure; never silent routing |
| MCP-N03 | Client metadata conflicts with authenticated identity | Refusal and identity diagnostic |
| MCP-N04 | Undeclared dynamic tool | Refusal |
| MCP-N05 | Retrieval selection not captured | Context assembly blocked or non-qualifying |
| MCP-N06 | Effect tool without valid Context Manifest | Refusal Receipt |
| MCP-N07 | Expired grant at action time | Refusal Receipt; no effect |
| MCP-N08 | Registry changes after review | Stale-context refusal |
| MCP-N09 | Retry duplicates a committed effect | Idempotent return or refusal with original outcome reference |
| MCP-N10 | Tool returns partial success | Partial outcome preserved; no complete-success claim |
| MCP-N11 | Protected value reaches unauthorized log | Disclosure failure; affected output blocked |
| MCP-N12 | Tool output reused without re-entry | Promotion/use blocked |
| MCP-A01 | Adversarial discovery omits restricted tool while retaining derived count | Information-flow refusal |
| MCP-A02 | Model grader tries to override mandatory deny | Deny remains effective |

Fixture IDs are informative binding identifiers, not permanent GKOS diagnostic
codes.

## 12. Evidence package requirements

A binding assessment should include:

- exact binding, GKOS, GKX, MCP, SDK, client, server, gateway, and tool versions;
- source and registry digests;
- authority and policy identities;
- executed fixture inventory and raw outputs;
- environment and dependency evidence;
- supported, disabled, skipped, failed, and unevaluated surfaces;
- limitations and exceptions;
- evidence locators and digests; and
- self-attested or independently verified assessment status.

## 13. Initial implementation standing

A current public reference implementation may expose MCP behavior at
`2025-11-25`. That implementation is useful migration evidence but is not proof
of this `2026-07-28` binding. A separate implementation change, version,
fixture run, and evidence package are required.

## 14. Open questions

See `../AMBIGUITY_REGISTER.md`, especially:

- `EAR-MCP-001` version migration;
- `EAR-MCP-002` Tasks and GKOS task evidence; and
- `EAR-MCP-003` consequential-tool admission.

## 15. Claim boundary

This draft establishes no MCP conformance, GKOS conformance, compatibility,
security assurance, or authorization. It authorizes no production endpoint,
credential, tool, write, deployment, or consequential effect.
