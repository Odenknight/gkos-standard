# Proposed development decision: classifier-assisted disposition and reuse

Date: 2026-09-21. Status: **DRAFT — owner policy choices unresolved**.
Change class: proposed normative-compatible, optional capability addition.
Publication target: prospective development after v0.81; no release allocated.
Base reviewed: `2d62b1d3b6d19aeb45477045c1fb5e2be842e76b`.

The owner requested repository amendments implementing the classifier discussion
and Engine build plans. That authorizes preparing this candidate; it does not
supply answers to the policy questions below or establish runtime qualification.
No numbered development decision or permanent requirement is allocated here.

## Proposed decision

Define an optional Automated Decision Service contract for bounded model
classification, reusable evaluations, conditional matrices, per-object review,
and separately admitted metadata effects. A service can be a classifier without
a conversational agent wrapper. Its architecture does not confer authority.

Adopt the [candidate contract](../../docs/v082/CLASSIFIER_DISPOSITION_CONTRACT_DRAFT.md)
after resolving the choices below, reviewing exact wording, and completing the
[adoption work packet](../../docs/v082/CLASSIFIER_ADOPTION_WORK_PACKET.md).
Keep deterministic routine eligibility, R18 role independence, mandatory human
escalation, protected processing, append-only history, and action-time authority.

The Standard specifies interoperable contracts. A separate inference sidecar is
the recommended Engine architecture, not a universal deployment mandate.

## Owner questions and provisional drafting choices

These are recommendations, **not recorded owner answers**.

| Question | Draft recommendation | Alternative requiring explicit revision |
| --- | --- | --- |
| Q1: Which automatic results should the new capability cover? | Managed tags plus selected routine acceptance/rejection dispositions under qualified bounded grants. | Tags/routing only; or add effective semantic supersession to the first capability. |
| Q2: May one classifier propose and approve the same semantic change? | No. Preserve R18 independence and permit reuse of applicable independent review. | A narrowly defined low-impact metadata exception requires an explicit change to the no-self-approval contract and compatibility analysis. |
| Q3: What stops when an optional classifier is unavailable? | Hold the affected operation and its dependent effects. Unrelated authorized work continues. | Hold the entire note workflow regardless of dependency. |

Effective semantic supersession, restriction reduction, destructive operations,
and external disclosure are outside the proposed initial automatic scope. A
candidate relationship may be recorded as claimed without becoming effective
supersession. Existing independently authorized capabilities remain governed by
their existing contracts.

## Authority and attribution

Approval of this Standard amendment defines a capability; it does not activate
a deployment. Deployment activation separately names qualified implementations,
allowed fields, decision classes, actors, grants, leases, budgets and expiry.
Preset approval authorizes a policy. Each governed disposition still identifies
the actual decider, evidence and authority. Do not attribute model decisions as
personal review by the human policy author.

## Evidence and review

Reviewed sources: master Standard, R15 state-change annex, R18 §§2–4 and §7,
Specialized Agent Framework, GKX 2.0 schema and shared vocabulary, permanent
requirement registry, and current runner/CI layout. The user-supplied design,
sidecar assessment and Rust/TypeScript build plan are design inputs, not adopted
requirements. This review and accompanying tests are self-attested; no independent
review, live model qualification, Rust/TypeScript parity or fleet deployment is
claimed. The authoring assistant is also the test author, a disclosed limitation.

## Compatibility, privacy and rollback

GKX stays 2.0. Draft extension payloads are separately versioned and explicitly
negotiated; permissive frontmatter parsing does not imply capability support.
Published releases and active requirement/profile/diagnostic registries are not
modified by this candidate. Implementations not advertising the capability do
not acquire new classifier obligations merely by consuming GKX records.

Inputs, cached results, review queues, receipts, logs and metrics remain within
their authorized tenant/purpose/audience boundary. A cache hit never grants read
access. No model, vendor, GPU placement or numeric confidence threshold is made
normative. Model-generated outcomes used for training re-enter as attributable
L1 evidence without inherited standing.

Suspend grants and disable admitted writes on rollback; preserve evaluations,
decisions and receipts. Correct already committed metadata only through a new
admitted, receipted correction. Never erase the audit trail to undo a rollout.
