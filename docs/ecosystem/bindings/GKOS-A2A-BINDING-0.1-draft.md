# GKOS–A2A Binding 0.1

- **Document ID:** GKOS-A2A-BINDING-0.1
- **Status:** informative draft under R21; not an A2A extension, GCP profile,
  conformance claim, endorsement, or runtime authorization
- **Date:** 2026-09-02
- **GKOS baseline:** GKOS-2026-08-20 v0.80 and applicable merged development
  decisions
- **Primary A2A target:** Agent2Agent Protocol `v1.0.1`
- **Stable semantic generation:** A2A `v1.0`
- **External-source register:** `../EXTERNAL_SOURCE_REGISTER.md`

## 1. Purpose

This draft maps A2A agent discovery, Agent Cards, messages, tasks, artifacts,
status events, streaming, polling, push notifications, authentication, and
version negotiation to GKOS evidence, identity, lineage, review, context,
authority, outcome, and receipt responsibilities.

A2A and MCP are complementary external protocols. A2A commonly connects
independent agents; MCP commonly connects an agent to tools and resources.
Neither protocol creates GKOS authority merely by transporting or
authenticating a request.

## 2. Four statement classes

### Standard requires

Applicable GKOS requirements control the evidence-to-action path.

### Binding recommends

This draft recommends mappings and fixture classes for A2A interoperability.

### Implementation example

A named A2A SDK, Agent Card implementation, transport, gateway, or storage
system is an implementation fact and must be pinned separately.

### Not in the Standard

Agent Card, Task, Message, Part, Artifact, status, polling, streaming, push
notification, transport binding, and A2A version-negotiation terms come from
A2A. They are not GKOS artifacts unless a separately versioned mapping says how
they satisfy a GKOS role.

## 3. Version and transport boundary

The target protocol release is A2A `v1.0.1`. A claim must record:

- protocol release;
- transport binding used, such as JSON+HTTP, JSON-RPC, or gRPC;
- SDK and implementation versions;
- Agent Card revision;
- compatibility modes, including any v0.3 behavior;
- endpoint and tenancy model;
- authentication and authorization mechanism; and
- exact extensions.

A2A protocol version, SDK release, Agent Card revision, and individual agent
implementation version are distinct coordinates.

## 4. Actor and role model

An A2A interaction may involve several distinct principals:

- initiating human or organization;
- client agent;
- client-agent owner or operator;
- remote agent;
- remote-agent owner or operator;
- delegator;
- task proposer;
- reviewer or decider;
- authorizer;
- executor;
- observer or auditor; and
- recipient of the final effect.

A deployment must not collapse these principals merely because one software
process performs several technical functions. Role combinations must be
explicit and must satisfy applicable non-self-approval and segregation rules.

## 5. Agent Card treatment

An Agent Card is capability and connection evidence. It does not by itself
prove competence, current authority, ownership, safety, or fitness for a
particular task.

A GKOS binding should preserve or reference:

- Agent Card bytes or canonical representation;
- card version and retrieval time;
- stable agent identity asserted by the card;
- endpoint and transport declarations;
- capabilities, skills, modalities, and extensions;
- authentication schemes;
- card signer or attester and verification result where used;
- accountable owner and operator assertions;
- sensitivity, retention, and jurisdiction classification;
- superseded card references; and
- the exact card digest used for discovery or delegation.

A signed Agent Card can provide integrity and origin evidence under its trust
model. It does not replace a GKOS authority grant or Decision Record.

## 6. A2A-to-GKOS mapping

| A2A element | Primary GKOS contribution | Required boundary |
| --- | --- | --- |
| Agent Card | L1 source, L2 actor/capability object, L3 ownership and dependency assertions | Capability advertisement is not authority or competence proof |
| Card retrieval and verification | L1 acquisition evidence and L4 verification result | Verification failure or indeterminacy follows declared fail-closed policy when relied upon |
| Message | L1 received communication and L3 attributable assertion | Message content is evidence, not accepted truth |
| Message Part | L1/L2 typed content component | File, text, structured data, or reference retains provenance and sensitivity |
| Task creation/request | L2 task object and L3 requested relationship | Request alone is not a grant or authorized action |
| Task context ID | Correlation input | It is not automatically the stable GKOS identity of evidence, context, or authority |
| Task status event | L3 temporal assertion and workflow evidence | Status is not a GKOS Decision Record unless the exact contract is satisfied |
| Artifact | L1 output source and L2 structured object | Output receives no automatic acceptance or authorization standing |
| Streaming event | L1 event source and L3 sequence/lineage evidence | Order, duplication, loss, and replay handling must be explicit |
| Polling response | L1 observed state | Later retrieval is new evidence, not the original decision context |
| Push notification | L1 external event plus delivery evidence | Callback authentication and recipient authority must be evaluated separately |
| Cancellation | L5 workflow disposition and possible L7 recovery input | Cancellation does not prove that no effect already committed |
| Task completion | L3 outcome assertion and L7 outcome evidence where consequential | Completion status must be verified against actual artifacts/effects |
| Authentication metadata | L2 identity assertion and L4 control input | Authentication is not authorization |
| Version negotiation | L4 compatibility control and evidence | Downgrade and unsupported versions must not be silent |

## 7. Task classification

Before delegation or execution, an A2A task should be classified as one or more
of:

| Class | Description | Default GKOS effect boundary |
| --- | --- | --- |
| `INFORMATION_REQUEST` | Retrieve, summarize, compare, or explain | No consequential effect authority |
| `ANALYSIS_PROPOSAL` | Produce a finding, plan, recommendation, or draft | Proposal only |
| `REVIEW_PROPOSAL` | Provide review findings or a recommended disposition | No self-approval; R18 controls automated reviewer use in the v0.81 line |
| `GOVERNED_MUTATION` | Change governed knowledge, policy, configuration, or review state | Requires exact L4/L5 authorization and State-Change Receipt |
| `CONSEQUENTIAL_EFFECT` | Change an external system, entitlement, transaction, publication, or operational state | Requires action-time L4–L7 admission and outcome evidence |
| `ADMINISTRATIVE_CHANGE` | Change agents, cards, grants, credentials, registries, policies, or control configuration | Separate administrative authority |

Unknown or compound tasks inherit the most restrictive applicable treatment
until positively classified by a deterministic, versioned rule.

## 8. Delegation and attenuation

An A2A task assignment is not automatically a GKOS delegation.

Where delegation is relied upon, the binding should record:

- originating authority and accountable principal;
- delegator and delegate identities;
- exact task, purpose, resource, operation, recipient, and effect scope;
- valid-from and valid-until times;
- whether subdelegation is permitted;
- attenuation rules;
- policy and predicate versions;
- card and capability versions relied upon;
- revocation, suspension, and expiry state;
- mandatory review and escalation conditions; and
- the receipt binding the delegated action.

A delegated agent cannot expand its authority by changing task text, choosing a
more capable remote agent, or invoking a protocol extension.

## 9. Incoming evidence and assertions

Every remote message, artifact, status event, and card is external evidence.
The receiving system should preserve:

- sender and receiver assertions;
- transport and authentication evidence;
- exact content or policy-authorized protected representation;
- content type and schema;
- received time;
- task and context correlations;
- prior-message or artifact references;
- sensitivity and retention classification; and
- verification and parsing diagnostics.

A remote agent's “verified,” “approved,” “complete,” or “high confidence” label
remains an attributable assertion unless the receiving deployment recognizes
and verifies the exact authority behind it.

## 10. Context transfer

A2A may transport messages and artifacts, but a GKOS Context Manifest requires
more than transport. Before a context-dependent decision or effect, capture:

- purpose and recipient;
- exact card, task, messages, artifacts, and source references;
- selected and omitted evidence;
- contradictions and unresolved claims;
- restrictions, sensitivity, and jurisdictional handling;
- selection or routing outputs;
- policy and gate versions;
- expiry and freshness limits; and
- canonical identity/hash required by the applicable GKOS contract.

A later status poll or additional artifact is new evidence and does not
retroactively become part of the original context.

## 11. Review Agent boundary

For the v0.81 development line, an A2A-connected automated reviewer may produce
an L5 disposition only when R18's exact constraints are satisfied, including:

- different model family from the proposing or executing agent;
- separate bounded, versioned, expiring authority;
- sealed evidence packet;
- deterministic gates that cannot be overridden by the model;
- no self-review of work, authority, assignment, policy, gates, or autonomy
  envelope; and
- mandatory human escalation for the registered triggers.

A2A interoperability does not prove reviewer independence.

## 12. Consequential task admission

Before a remote agent performs a consequential effect, the relying deployment
must verify at action time:

- exact actor and remote-agent identity;
- current Agent Card and implementation version;
- valid authority and delegation;
- task and action digest;
- bound Context Manifest;
- mandatory deterministic controls;
- role separation and required Decision Record;
- typed effect scope and containment;
- recipient and purpose;
- recovery, rollback, compensation, or appeal route; and
- receipt durability.

An A2A “accepted” or “working” task status is not authority to execute.

## 13. Outcome and re-entry

Task outcomes must distinguish:

- succeeded;
- failed before effect;
- failed after partial effect;
- canceled before effect;
- cancellation requested after effect may have begun;
- unknown or indeterminate outcome;
- compensated or rolled back; and
- superseded result.

Every returned artifact or outcome later used as evidence re-enters at Layer 1
without inherited review, context, or authorized-use standing.

## 14. Security and governance threats

The binding should include negative fixtures for:

- malicious or stale Agent Card substitution;
- card signature valid but owner or authority unrecognized;
- task text attempting to expand delegated scope;
- remote agent claiming a higher role than granted;
- version downgrade or ambiguous compatibility mode;
- cross-tenant task or artifact disclosure;
- push-notification endpoint substitution;
- replayed message or duplicate task;
- artifact replacement after review;
- hidden subdelegation;
- cancellation represented as proof of no effect;
- stream loss or reordering causing false completion;
- remote status used as the sole outcome proof;
- context assembled from later evidence but represented as original;
- reviewer and proposer using the same model/operational path;
- protected information included in a card, message, artifact, trace, or error;
- remote agent or owner revocation not observed; and
- completed task output reused without Layer-1 re-entry.

## 15. Initial fixture plan

| Fixture ID | Class | Expected result |
| --- | --- | --- |
| A2A-B01 | Valid v1.0.1 information request | PASS as evidence exchange; no effect authority |
| A2A-B02 | Valid proposal task | PASS with proposal status and no materialization |
| A2A-N01 | Unsupported protocol or binding | Refusal |
| A2A-N02 | Stale Agent Card | Refusal or governed refresh before reliance |
| A2A-N03 | Card identity conflicts with authenticated endpoint | Refusal |
| A2A-N04 | Task expands beyond delegation | Refusal |
| A2A-N05 | Undeclared subdelegation | Refusal and escalation |
| A2A-N06 | Artifact changes after review | Stale-context refusal |
| A2A-N07 | Consequential task without Decision Record | Refusal |
| A2A-N08 | Consequential task without Context Manifest | Refusal |
| A2A-N09 | Expired authority at action time | Refusal; no effect |
| A2A-N10 | Cancellation after possible partial effect | Indeterminate/partial outcome; recovery required |
| A2A-N11 | Cross-tenant artifact leakage | Disclosure failure |
| A2A-N12 | Output reused without re-entry | Use blocked |
| A2A-A01 | Signed card advertises unauthorized capability | Signature accepted as integrity only; operation refused |
| A2A-A02 | Remote reviewer self-approves | Review failure and human escalation |

Fixture IDs are informative binding identifiers, not GKOS permanent diagnostic
codes.

## 16. Evidence package

An assessment should preserve:

- exact A2A protocol and transport binding;
- Agent Cards and digests;
- SDK/client/server/gateway versions;
- actor and owner identity evidence;
- tasks, messages, artifacts, and status-event samples;
- authority, delegation, policy, and gate identities;
- executed fixtures and raw outputs;
- environment and dependency evidence;
- limitations, failures, unsupported features, and unevaluated behavior; and
- assessment type.

## 17. Open questions

See `../AMBIGUITY_REGISTER.md`, including:

- `EAR-A2A-001` Agent Card identity;
- `EAR-A2A-002` task and delegation authority;
- `EAR-A2A-003` message and artifact re-entry; and
- `EAR-AGENT-002` multi-agent responsibility chains.

## 18. Claim boundary

This draft grants no production authority and establishes no A2A or GKOS
conformance, compatibility, security assurance, certification, or endorsement.