# GKOS ecosystem binding template

- **Document ID:** `GKOS-<EXTERNAL>-BINDING-<VERSION>`
- **Status:** informative draft under R21 unless a later controlling decision
  states otherwise
- **Date:** `YYYY-MM-DD`
- **GKOS baseline:** exact dated release and repository commit
- **GKX baseline:** exact namespace and canonical profile where applicable
- **External target:** exact protocol, specification, framework, SDK, service,
  or product version
- **Source register entry:** exact source-register identifiers
- **Assessment standing:** self-reviewed, externally reviewed, or independently
  verified, with the applicable basis and limitations

This template is informative. Completing it does not create a GCP profile,
conformance result, endorsement, procurement recommendation, or runtime
authority.

## 1. Purpose and use case

State:

- the interoperability problem;
- the bounded use case;
- what the binding carries or observes;
- what the binding does not provide;
- intended users and environments; and
- whether any consequential effect is in scope.

## 2. Statement classes

Every normative-sounding statement must be classifiable as one of:

### Standard requires

Cite the exact GKOS requirement, annex, decision, schema, or profile text.

### Binding recommends

Identify the mapping or control recommended by this document.

### Implementation example

Pin the exact implementation, SDK, service, product, configuration, and commit
or artifact digest.

### Not in the Standard

Identify external constructs and implementation choices that GKOS does not
mandate.

## 3. Exact coordinates

Record separately:

- GKOS release and source commit;
- GKX version and canonical profile;
- external specification version;
- protocol and transport version;
- SDK/client/server/gateway versions;
- implementation commit or artifact digest;
- schema and policy versions;
- fixture and runner versions;
- environment and dependency closure; and
- source review and access dates.

Matching version numbers do not imply compatibility.

## 4. External object and event inventory

List each external object, identity, event, status, command, message, artifact,
control result, and extension relied upon. For each item state:

- identity and version;
- authoritative source;
- content or event semantics;
- mutability and lifecycle;
- sensitivity and retention handling;
- trust and verification mechanism;
- whether it can trigger or represent a state change; and
- whether it is evidence, assertion, control input, decision input, context,
  authority input, action, or outcome.

## 5. GKOS mapping table

| External element | GKOS layer/artifact contribution | Required adapter behavior | What the element does not prove |
| --- | --- | --- | --- |
| `example` | `L1 Source Record` | Preserve exact revision and provenance | Truth, acceptance, or authority |

A mapping may be one-to-many or many-to-one. Do not force a false one-to-one
correspondence.

## 6. Actor and authority model

Identify separately:

- originating human or organization;
- client/requesting actor;
- service or remote actor;
- accountable owner and operator;
- delegator and delegate;
- proposer;
- reviewer/decider;
- authorizer;
- executor;
- observer/auditor; and
- affected recipient or subject.

Explain how identity is authenticated, how organizational authority is
established, how delegation is attenuated, and how action-time authorization is
verified. Authentication, capability discovery, policy allow, review, and
consequential authority are distinct facts.

## 7. Capability classes

Classify each surface as applicable:

- observe;
- retrieve;
- propose;
- governed write;
- consequential effect; or
- administration/control configuration.

Unknown or dynamically changed capabilities inherit the most restrictive
applicable treatment until positively classified by a deterministic, versioned
rule.

## 8. Processing sequence

Document the actual sequence for:

1. receive and preserve input;
2. resolve identities and versions;
3. apply deterministic controls;
4. capture non-deterministic selection or routing;
5. assemble context;
6. obtain review where required;
7. perform action-time authorization;
8. execute or refuse;
9. bind receipt and outcome; and
10. re-enter later outcomes as new evidence.

Equivalent architectures are permitted when the resulting records and
boundaries are equivalent for the claimed scope.

## 9. Failure, refusal, and recovery

Distinguish:

- denied before execution;
- validation failure;
- unavailable or indeterminate control;
- partial success;
- failure after partial effect;
- timeout;
- cancellation;
- duplicate or replay;
- unknown outcome;
- rollback;
- compensation;
- supersession; and
- successful completion.

Define the refusal, escalation, rollback, compensation, appeal, and recovery
records required for each relevant state.

## 10. Security and privacy model

At minimum consider:

- identity spoofing;
- confused deputy;
- prompt/context/tool poisoning;
- protocol downgrade;
- capability or registry substitution;
- hidden subdelegation;
- stale policy, context, or authority;
- cross-tenant or cross-purpose disclosure;
- log, count, error, metadata, timing, and telemetry leakage;
- duplicate or replayed effect;
- incomplete instrumentation;
- compromised policy or guardian component;
- secret and credential handling;
- supply-chain and dependency drift; and
- unverified outcome claims.

## 11. Jurisdiction and retention

State the asserted applicable policies, locations, transfers, retention, hold,
erasure, deletion, disclosure, and conflict behavior. Do not claim that GKOS
selects the governing law. Unresolved mandatory conflict follows the applicable
fail-closed and human-disposition path.

## 12. Fixture catalog

Provide positive, negative, boundary, mutation, downgrade, bypass, disclosure,
refusal, and recovery cases. Fixture identifiers must not resemble permanent
GKOS requirement or diagnostic codes unless formally allocated.

For every fixture record:

- exact inputs;
- preconditions;
- expected control and outcome;
- expected records/receipts;
- prohibited false-PASS behavior;
- implementation and environment coordinates; and
- actual result and raw evidence.

## 13. Evidence package

Bind the assessment to:

- this binding version;
- exact source and external coordinates;
- implementation and dependencies;
- policies and schemas;
- fixtures and runner;
- raw outputs;
- environment;
- limitations and exceptions;
- assessment identity and method; and
- evidence locators and digests.

Use the informative GKOS Conformance Evidence Package draft where suitable,
without presenting package validity as conformance.

## 14. Compatibility and migration

Describe:

- predecessor and successor versions;
- supported compatibility modes;
- upgrade and downgrade behavior;
- changed identities or semantics;
- state and receipt migration;
- invalidated evidence;
- deprecation and removal;
- rollback; and
- version-negotiation refusal.

Prior records retain the semantics and coordinates that controlled them.

## 15. Open ambiguities

Reference the ecosystem ambiguity register. State whether each ambiguity:

- blocks the binding;
- blocks only a capability class;
- requires a fail-closed outcome;
- remains an accepted limitation; or
- requires a later Standard decision.

## 16. Review and disposition

Record:

- reviewers and model families where applicable;
- exact input commit and packet digest;
- findings;
- accepted, narrowed, rejected, unresolved, and superseded claims;
- replacement text;
- rerun evidence; and
- owner disposition.

A different model family does not, by itself, establish organizational or
operational independence.

## 17. Claim and authority boundary

Conclude with explicit statements covering:

- normative standing;
- conformance standing;
- external-protocol/framework standing;
- assessment independence;
- certification and endorsement;
- production data and credentials;
- governed-write and effect activation; and
- publication or release authority.
