# Classifier-assisted disposition and assessment reuse — candidate contract

Status: **proposed normative text, inactive and non-qualifying**. Draft 0.1,
2026-09-21. Local CAD labels below are drafting references, not permanent GKOS
requirement or diagnostic codes. Controlling proposal:
[development decision draft](../../decisions/proposals/Classifier_Assisted_Disposition_and_Reuse.md).

## 1. Scope and roles

This optional capability covers bounded classification, assessment reuse and
selected routine dispositions over identified records. It preserves the
separation between evidence, judgment, authority and effect. A qualified service
may implement an authorized review role without being a conversational agent.

| Role | Responsibility | Authority boundary |
| --- | --- | --- |
| Authorizer | Approves matrix and bounded grant | Must hold authority over the specified consequence. |
| Proposer/evaluator | Supplies typed classifications and evidence | Cannot approve its own semantic proposal. |
| Independent reviewer/decider | Issues permitted per-record disposition | R18 independence, sealed packet, lease and escalation apply. |
| Deterministic gate | Validates captured evaluation and recomputes rules | Cannot prove a score is honest or its conclusion correct. |
| Executor | Applies admitted field operations | Separate current authority, target binding and durable receipt. |

One process may implement multiple technical responsibilities only where the
required actor separation remains enforceable. Different names or adapters do
not establish model-family independence. If the independent reviewer itself
creates a new semantic proposal, that new proposal cannot become self-approved.
A valid prior independent review may satisfy a new workflow only after the
applicability checks in §5.

## 2. Proposed requirements

### CAD-01 — Declaration and authorized processing

An implementation advertising this capability SHALL identify the service,
accountable owner, decision classes, supported tasks and languages, input limits,
processing boundary, model/configuration identity, evidence requirements,
qualification criteria, prohibited operations, and suspension/revocation route.
It SHALL authorize disclosure before delivering input to the worker. Note text
SHALL be treated as evidence, never as policy, credentials or instructions.

### CAD-02 — Distinct record roles and attribution

The implementation SHALL preserve distinct evaluation, matrix evaluation,
disposition, applicability and effect roles. Records MAY satisfy multiple roles
only when all applicable bindings are retained. An evaluation SHALL bind the
request, source identity/revision, exact input, relevant metadata, evidence,
task/options, evaluator configuration, status and output. Decisions SHALL bind
actual proposer, evaluator, reviewer/decider, authorizer and executor identities
as applicable. A signature establishes only its declared key/message binding;
it SHALL NOT be represented as proof of honest inference or substantive truth.

### CAD-03 — Versioned conditional matrix

An approved matrix SHALL bind identity, revision and digest; authorized issuer
and approval; tenant/purpose/lane; task and option schema; allowed field/effect
classes; evidence prerequisites; qualified configurations; applicable gates;
validity interval and revocation source; budgets; reuse policy; and default
non-accepting behavior. The service SHALL NOT authorize changes to its own
matrix, grant, gate logic, qualification criteria or reviewer assignment.

Thresholds SHALL be workload-qualified. Scores SHALL declare their semantics;
raw logits or softmax maxima SHALL NOT be labeled calibrated correctness
probabilities without qualification evidence. A model without suitable scores
MAY use an explicitly qualified label-based rule. No fabricated score is needed.

### CAD-04 — Deterministic policy evaluation

The gate SHALL recompute outcomes from captured evaluation and exact policy,
with explicit time inputs. The initial draft permits a unique-match hit policy:
zero or multiple matches produce HOLD. Intervals SHALL specify inclusive and
exclusive endpoints. Invalid, nonfinite or out-of-schema outputs, missing
required evidence, incomplete/truncated inputs and unresolved conflicts SHALL
produce non-acceptance. No confidence threshold overrides a mandatory gate.

Numeric interpretation and canonicalization SHALL be versioned. The draft wire
schema uses integer millionths for optional calibrated probability bands to
avoid cross-language floating-point boundary ambiguity. Qualification SHALL
bind the conversion procedure. This is an extension encoding, not a universal
model-output format or accuracy guarantee.

### CAD-05 — Eligibility, review and activation

Automatic disposition SHALL require a prospectively activated capability,
current bounded grant/lease, qualified decision class/configuration, satisfied
mandatory gates and applicable independent review. Model inference SHALL NOT
expand the deterministic outer eligibility boundary or downgrade a major or
indeterminate classification. All R18 mandatory escalation triggers remain.

The initial proposed scope permits qualified managed metadata and selected
routine acceptance/rejection decisions. It does not authorize sensitivity
reduction, effective semantic supersession, deletion or external disclosure.
A preset approval SHALL NOT substitute for per-record disposition. Missing or
unavailable human authority SHALL NOT be replaced by a timeout or another model.

### CAD-06 — Field ownership and graph semantics

An admitted patch SHALL identify classifier-managed fields and exact allowed
operations, preserve human-owned fields and preserve existing authoritative
standing. Claimed edges SHALL retain relation-specific semantics, provenance,
scope and identity under R23. Adding an edge SHALL NOT be assumed to tighten
restrictions; a proposed supersession edge SHALL NOT change effective lineage.
Low detection scores SHALL NOT relax sensitivity or authorize disclosure.

### CAD-07 — Admission, concurrency and durable effects

Every effect SHALL recheck current authority/revocation, scope, restrictions,
target revision, evidence/decision binding and remaining effect budget at the
admission boundary. Implementations SHALL enforce atomic compare-and-swap or an
equivalent race-safe commit protocol, including policy/grant changes relevant to
admission. Replayed evidence SHALL NOT replay a committed action implicitly.

Idempotency keys SHALL bind actor, request and exact admitted effect. Duplicate
identical requests return the recorded outcome; conflicting reuse of a key is
refused. Required receipt binding SHALL be durable before reporting success;
crash recovery SHALL reconcile state and journal without duplicating effects.
Field updates SHALL preserve unrelated frontmatter and enforce object/path
resolution controls. A hash check followed by an unprotected write is inadequate.

### CAD-08 — Applicability and selective invalidation

Reuse SHALL preserve the original record and append an attributable applicability
record identifying the consumer, purpose, dependencies, evaluation time,
freshness/compatibility policy, result and reason. Evaluation reuse, disposition
reuse and execution under a disposition SHALL remain distinct operations.
Tenant, purpose, audience and processing permissions SHALL be checked before
returning a cached result. A content digest alone is not a cache authority key.

Relevant evidence, question/options, policies, restrictions, contradiction
coverage, qualification and external-state changes SHALL invalidate affected
uses under the declared dependency contract. Unrelated changes alone SHALL NOT
force a new model evaluation. Dependency-scoped reuse requires demonstrated
coverage; otherwise bind the complete captured evidence package. Revocation
blocks future effects without deleting historical decisions.

A changed matrix MAY be replayed against a reusable evaluation where compatible;
it does not require rerunning inference automatically. A changed requesting
agent alone does not require new review, but independence SHALL be checked
relative to the new proposer/executor. Overdue delegated review blocks affected
state changes under the existing delegation contract.

### CAD-09 — Failure containment

Unsupported tasks, outage, timeout, abstention, unqualified configuration or
invalid evaluation SHALL NOT yield permissive defaults. The affected operation
and dependent effects SHALL hold or refuse as the applicable contract requires.
Unrelated authorized work MAY continue. A valid reusable result MAY be used only
after the full applicability check. HOLD, refusal, escalation and a successful
no-op SHALL remain distinguishable and receipted. Queue failure SHALL not be
reported as successful escalation; protected queued material remains restricted.

### CAD-10 — Qualification, monitoring and suspension

Qualification SHALL be specific to task, workload, consequence and exact
configuration, with held-out labels, difficult negatives, injection attempts,
truncation, out-of-domain input, abstention, request isolation, false acceptance,
missed restrictions and declared calibration/stability limits. Thresholds and
error budgets SHALL be approved by the competent deployment authority.

Runtime/hardware/quantization changes SHALL follow explicit compatibility or
requalification rules. A single model's failure does not disqualify every model.
Scope and batch budgets, monitoring and suspension SHALL bound aggregate harm
from wrong or compromised evaluators. Schema validity and signatures SHALL NOT
be substituted for quality measurement.

### CAD-11 — Replay, feedback and claim boundaries

Deterministic record/policy replay SHALL use identical captured inputs and
controlled time/identity values. Fresh inference qualification SHALL report
variability separately; pinned weights do not promise universal byte identity.
Training exports SHALL enter as attributable authorized L1 snapshots with
provenance, sensitivity and contamination controls, without inherited standing.

A declaration SHALL distinguish active conformance fixtures, provisional
contract tests, model qualification, live deployment evidence and unexecuted
cases. Passing this draft's schema fixtures SHALL NOT establish a profile,
correct semantic judgment, valid authority or permission to mutate a note.

## 3. GKX extension and Engine integration

GKX remains 2.0. Use the separately negotiated draft contract
`org.oden.gkos.classifier.experimental.v1` as an extension envelope, not a new
native GKX object kind or a claimed GKX 2.3 migration. Native objects keep their
existing identities. Unknown capability or authority semantics fail closed for
the requested operation; generic readers may preserve opaque extension data.

The [draft schema](../../schemas/provisional/classifier/classifier-record.draft.schema.json)
provides initial preset and evaluation envelopes. Its references bind governed
policy/configuration artifacts; schema validation cannot resolve their validity.
Existing Decision Record and State-Change Receipt roles remain authoritative.
An optional namespaced note projection contains references and managed tags;
it must not create a competing authoritative disposition field.

For Engine builds, keep model inference in a companion worker. Both Rust and
TypeScript consume the same captured contract. Core validation, rule evaluation
and canonical replay are model-free; an outer adapter may call the worker.
The writer remains an independently admitted effect boundary. Keep existing
TypeScript `gkos.intelligence.v1` behavior unchanged; add versioned integration.

## 4. Normative dependencies and adoption edits

| Candidate | Existing controlling basis | Addition needed at adoption |
| --- | --- | --- |
| CAD-01, CAD-10 | Specialized Agent Framework; GKOS-DISCLOSURE-001 | Explicit classifier actor and decision-class qualification. |
| CAD-02, CAD-05 | GKOS-REVIEW-001..004; R18 §§3, 7 | Bounded general note-disposition capability and correct role bindings. |
| CAD-03, CAD-04 | GKOS-POLICY-001; R15 §2 | Portable matrix, score, conflict and abstention contracts. |
| CAD-05, CAD-09 | GKOS-DELEGATION-001..006; R18 §3 | Defined capability eligibility and dependency-scoped failures. |
| CAD-06 | R23 Layer-3 semantics; GKX 2.0 vocabulary | Managed-field ownership and explicit candidate/effective distinction. |
| CAD-07 | GKOS-RECEIPT-001..003; L7 and R17 | Safe patch, idempotency and current admission bindings. |
| CAD-08 | Exact-evidence review and authority validity | First-class applicability and selective invalidation. |
| CAD-11 | R15 re-entry; canonical serialization; conformance honesty | Separate model qualification and captured-policy replay. |

At adoption, allocate atomic permanent requirements, register distinct mandatory
failure codes, update profile applicability for exposed behavior, link the adopted
annex from the master and affected layer/agent annexes, and publish portable
positive and mutation fixtures. Do not rewrite original allocation text.

## 5. Reuse example

An unchanged experiment note and sealed evidence packet can reuse a qualified
review when its dependencies and current reviewer-independence requirements
still hold. A newly applicable contradictory result invalidates affected review.
A README edit outside demonstrated dependencies does not. Updating the note's
managed tag requires fresh effect admission and revision binding even if no
model call is needed. Experiment success is never inferred from a tag alone.
