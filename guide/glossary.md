# Glossary

> **Informative.** This beginner's guide page explains GKOS in plain language. It creates no requirement and changes no rule. Where it differs from the [authoritative sources](README.md#authoritative-sources), those sources control. Edition described: GKOS-2026-09-24 v0.82.1.

Plain definitions of the terms used in this guide. Each entry links to the file that controls the term. If a definition here differs from its source, the source is right.

[A](#a) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [I](#i) · [L](#l) · [N](#n) · [P](#p) · [R](#r) · [S](#s) · [U](#u) · [V](#v)

## A

### Assertion

A claim by a person, model, tool or agent about what some evidence means. It is recorded separately from the evidence and points to it. Layer 3.
**Source:** [layer interface contracts](../standard/annexes/Layer_Interface_Contracts.md).

### Authority

Permission to decide or act, within stated limits of action, scope, purpose and time. It is granted and recorded, and checked again at the moment of action. Capability, confidence and authentication do not create it.
**Source:** [authority and refusal receipt fields](../standard/annexes/Authority_and_Refusal_Receipt_Fields.md); `GKOS-AUTHUSE-003` in the [registry](../requirements/REGISTRY.md).

### Authority Receipt

A record of a grant or delegation: who granted what to whom, for which actions and scope, and until when.
**Source:** [authority and refusal receipt fields](../standard/annexes/Authority_and_Refusal_Receipt_Fields.md#2-authority-receipt).

### Authorized Use Record

The Layer 7 record of a consequential action. It binds the exact context, the authority, the distinct actors, the effect scope, the outcome and a recovery route.
**Source:** [authority and refusal receipt fields](../standard/annexes/Authority_and_Refusal_Receipt_Fields.md#3-authorized-use-record); [schema](../schemas/authorized-use-record.schema.json).

### Authorship origin

The GKX 2.0 field `authorship_origin`. It labels where content came from: `authored`, `derived`, `proposed` or `approved`. The label is not a decision. See [chapter 3](03-core-ideas.md#authorship-origin).
**Source:** [shared schema definitions](../schemas/gkx-common.defs.json) (`origin`).

## C

### Canonical serialization (GKX-CBOR-1)

The one exact byte encoding used to fingerprint a governed record. Two systems that encode the same record get the same bytes and the same SHA-256 hash.
**Source:** [canonical serialization annex](../standard/annexes/Canonical_Serialization.md).

### Consequential action

In plain terms, an action with effect beyond reading or display, such as a payment or a change to another system. It needs Layer 7 authorization. The GCP-6 Context-Only Extension may not perform or authorize one. The current repository uses the term without one current definition. The archived v0.76 edition listed four kinds: external disclosure, a sensitivity change, promotion to accepted, and deletion or governed erasure. Treat that list as history.
**Source:** [conformance profiles annex](../standard/annexes/Conformance_Profiles.md); `GKOS-PROFILE-003` in the [registry](../requirements/REGISTRY.md); [archived v0.76 edition](../archive/illustrated/GKOS-v0.76-Illustrated-Edition.md) (historical).

### Context Manifest

The Layer 6 record of exactly what was presented, to whom, for what purpose, with which warnings, contradictions, restrictions and omissions. It has a fingerprint so later records can bind to it.
**Source:** `GKOS-CONTEXT-003` and `GKOS-CONTEXT-004` in the [registry](../requirements/REGISTRY.md); [schema](../schemas/context-manifest.schema.json).

### Contradiction

A recorded conflict between claims. GKOS keeps it visible rather than resolving it silently.
**Source:** `GKOS-CONTEXT-004` and `GKOS-PROFILE-007` in the [registry](../requirements/REGISTRY.md).

### Control Receipt

A record that a deterministic check ran, with its inputs and result. Layer 4.
**Source:** [layer interface contracts](../standard/annexes/Layer_Interface_Contracts.md).

### Custody

Who has held a source since it arrived. Part of provenance.
**Source:** [layer interface contracts](../standard/annexes/Layer_Interface_Contracts.md) (Layer 1).

## D

### Decision Record

The Layer 5 record of an authorized outcome, such as accepted, rejected, deferred, withdrawn, expired or superseded. It is append-only and bound to the exact proposal and evidence reviewed.
**Source:** `GKOS-REVIEW-002` and `GKOS-REVIEW-004` in the [registry](../requirements/REGISTRY.md); [schema](../schemas/decision-record.schema.json).

### Delegation

Passing part of an authority on to another actor. A delegated grant can only narrow. It cannot be wider or last longer than its source.
**Source:** [authority and refusal receipt fields](../standard/annexes/Authority_and_Refusal_Receipt_Fields.md#2-authority-receipt); `GKOS-DELEGATION-001` in the [registry](../requirements/REGISTRY.md).

### Deterministic

Giving the same result every time for the same input. GKOS mandatory checks must be deterministic.
**Source:** [layer interface contracts](../standard/annexes/Layer_Interface_Contracts.md) (Layer 4).

### Developer Certificate of Origin (DCO)

A sign-off line on each commit, added with `git commit -s`. It certifies that you may submit the work under the applicable license.
**Source:** [CONTRIBUTING.md](../CONTRIBUTING.md#licensing-and-dco).

### Development Decision Record

A numbered record (R9, R10 and so on) of a v0.x change adopted by the Founder and Initial Editor. It states the evidence, the decision, its limits and its non-consensus status.
**Source:** [GOVERNANCE.md](../GOVERNANCE.md#v0x-amendment-path); [decision register](../decisions/GKOS_Decision_Register.md).

### Developmental specification (public working draft)

The current maturity of GKOS. GKOS is a developmental specification (public working draft). It began as a single-author pre-standard concept; the goal is to advance it to a pre-standard through an open, multi-stakeholder committee process.
**Source:** [README](../README.md#maturity-and-governance-boundary); [claims policy](../conformance/CLAIMS_POLICY.md).

## E

### Effect scope

The typed limits of an action: which resources, which environment, which audience, what sensitivity, what time, how reversible, and how many items at most.
**Source:** `GKOS-EFFECT-001` in the [registry](../requirements/REGISTRY.md); `effectScope` in the [shared schema definitions](../schemas/gkx-common.defs.json).

### Epistemic state

How much standing a claim has, such as `hypothesis`, `contested` or `accepted`. GKX 2.0 defines twelve values. Promotion to `accepted` needs a Decision Record.
**Source:** `epistemicState` in the [shared schema definitions](../schemas/gkx-common.defs.json); fixture `GCP3-L02` in the [fixture catalog](../fixtures/fixtures.manifest.json).

### Evidence

What actually arrived or was observed, preserved as received. Evidence is not truth, and it grants no authority.
**Source:** [end-to-end workflow](../docs/implementation/GKOS_END_TO_END_WORKFLOW.md#how-data-moves-through-the-whole-stack).

## F

### Fail closed

When a required check cannot pass or cannot be evaluated, block rather than allow. For example, a missing sensitivity label is treated as restrictive.
**Source:** [security, privacy and retention annex](../standard/annexes/Security_Privacy_Retention.md); `GKOS-AUTHUSE-003` in the [registry](../requirements/REGISTRY.md).

### Fixture

A small test file with an expected result. The conformance runner checks implementations against fixtures.
**Source:** [fixtures README](../fixtures/README.md).

### Founder and Initial Editor

The role that makes v0.x development decisions. Shaun "Oden" Marshall holds it during the v0.x phase.
**Source:** [GOVERNANCE.md](../GOVERNANCE.md#development-phase-authority).

## G

### Gate code

A registered code, such as `GKOS-GATE-L7-002`, that says why a mandatory gate closed. There are 28 active codes.
**Source:** [diagnostic-code registry](../standard/annexes/Diagnostic_Code_Registry.md).

### GCP-1 to GCP-7

The seven cumulative conformance profiles, one per layer responsibility. Each one includes every lower one.
**Source:** [conformance profiles annex](../standard/annexes/Conformance_Profiles.md).

### GCP-6 Context-Only Extension

GKOS Core plus read-only Layer 6 context. It grants no authority for consequential action.
**Source:** `GKOS-PROFILE-003` in the [registry](../requirements/REGISTRY.md).

### GKOS

Governed Knowledge Operations Specification. Published editions keep their recorded title, Governed Knowledge Operations Standard.
**Source:** [README](../README.md#specification-status-and-published-titles).

### GKOS Core and GKOS Advanced

The two named tiers. Core requires GCP-1 to GCP-5. Advanced requires GCP-1 to GCP-7. No implementation currently qualifies for either.
**Source:** `GKOS-PROFILE-001` and `GKOS-PROFILE-002` in the [registry](../requirements/REGISTRY.md).

### GKX 2.0

The machine exchange contract: field names, record shapes and namespaces that software uses to exchange GKOS records.
**Source:** [NAMING.md](../docs/NAMING.md); [schemas](../schemas/README.md).

## I

### Informative

Explains or guides, but creates no requirement. This guide is informative.
**Source:** [corpus status index](../docs/CORPUS-STATUS.md#reading-and-maintenance-rules).

## L

### Layer

One of seven cumulative responsibilities, L1 to L7. A layer is a responsibility, not a product or a pipeline step.
**Source:** [layer interface contracts](../standard/annexes/Layer_Interface_Contracts.md).

### Lineage

The recorded history of how objects and claims derive from, depend on or replace each other.
**Source:** `GKOS-LINEAGE-001` to `GKOS-LINEAGE-003` in the [registry](../requirements/REGISTRY.md).

## N

### Normative

Contains rules that carry force. Words such as MUST mark them.
**Source:** [master standard](../standard/00_GKOS_Master_Standard.md#normative-surface).

### Normative population

The set of permanent requirements and gate codes in force for an edition. For v0.82.1 it is unchanged from v0.81: 62 permanent requirements and 28 gate codes.
**Source:** [README](../README.md#current-standing).

## P

### Pre-standard

Historical term. Earlier editions described GKOS as a public pre-standard. Today it describes the goal: to advance GKOS to a pre-standard through an open, multi-stakeholder committee process.
**Source:** [archived v0.76 edition](../archive/illustrated/GKOS-v0.76-Illustrated-Edition.md) (historical); [GOVERNANCE.md](../GOVERNANCE.md#v10-governance-gate).

### Profile

A named set of responsibilities that a claim can be tested against. See GCP-1 to GCP-7, GKOS Core and Advanced, and Viewer/Projection Profile.
**Source:** [conformance profiles annex](../standard/annexes/Conformance_Profiles.md).

### Projection

A derived view of governed records, such as a dashboard or rendering. It must not become a parallel authority or hide loss.
**Source:** [technical orientation](../TECHNICAL_README.md#core-records-and-receipts).

### Provenance

Where something came from, how it was acquired, and who has held it.
**Source:** [layer interface contracts](../standard/annexes/Layer_Interface_Contracts.md) (Layer 1).

## R

### Re-entry

An outcome or reused material coming back in as a new Layer 1 source. It inherits no earlier standing, decisions, epistemic state or authority.
**Source:** `GKOS-REENTRY-001` and `GKOS-REENTRY-002` in the [registry](../requirements/REGISTRY.md).

### Receipt

A role, not one format. Any record carrying the required fields can serve as a receipt for an operation.
**Source:** [technical orientation](../TECHNICAL_README.md#core-records-and-receipts).

### Refusal Receipt

The record left when a mandatory gate closes. It carries the gate code, the requirement, the inputs, the time, the actor context and the policy.
**Source:** `GKOS-AUTHUSE-005` in the [registry](../requirements/REGISTRY.md); [schema](../schemas/refusal-receipt.schema.json).

### Requirement ID

A permanent identifier for one rule, such as `GKOS-REVIEW-002`. IDs are never deleted, renumbered or reused.
**Source:** [requirement registry](../requirements/REGISTRY.md).

## S

### Selection Envelope

The Layer 6 record of what retrieval actually selected, and why, before context is assembled. In schemas it appears as `selection-set`.
**Source:** `GKOS-CONTEXT-001` in the [registry](../requirements/REGISTRY.md); [technical orientation](../TECHNICAL_README.md#end-to-end-integration).

### Self-attested and independently verified

Self-attested means the claimant checked its own work. Independently verified means an organizationally and operationally independent reviewer did. Every claim must say which.
**Source:** [GOVERNANCE.md](../GOVERNANCE.md#non-self-certification); [claims policy](../conformance/CLAIMS_POLICY.md#permitted-scope-of-claims).

### Sensitivity

How carefully something must be protected. GKX 2.0 labels: `public`, `internal`, `restricted`, `confidential`, `regulated`, `phi`, `secret`. Missing sensitivity fails closed.
**Source:** `sensitivity` in the [shared schema definitions](../schemas/gkx-common.defs.json); [security, privacy and retention annex](../standard/annexes/Security_Privacy_Retention.md).

### Source Record

The Layer 1 record of what was received or observed, with revision, provenance, custody, sensitivity and retention evidence.
**Source:** [layer interface contracts](../standard/annexes/Layer_Interface_Contracts.md).

### Structured Knowledge Object

The Layer 2 record that gives a governed object a stable identity, type, schema and version. A file name is not its identity.
**Source:** [layer interface contracts](../standard/annexes/Layer_Interface_Contracts.md).

### Supersession

One record formally replacing another. The old record stays, marked superseded. Software must not infer supersession; an authorized person or a valid bounded delegation declares it.
**Source:** `GKOS-REENTRY-004` in the [registry](../requirements/REGISTRY.md); [governed state change annex](../standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md#5-explicit-semantic-supersession).

## U

### UID

A record's stable unique ID. New GKX 2.0 IDs use lowercase UUIDv7. Existing valid UUIDv4 IDs stay valid. ID order confers no priority.
**Source:** `GKOS-IDENTITY-001` to `GKOS-IDENTITY-004` in the [registry](../requirements/REGISTRY.md).

## V

### Viewer/Projection Profile

A profile for read-only displays. A viewer must show provenance, epistemic state, incompleteness, contradictions, warnings, restrictions and limits, and gains no authority.
**Source:** `GKOS-PROFILE-007` in the [registry](../requirements/REGISTRY.md); [conformance profiles annex](../standard/annexes/Conformance_Profiles.md).

---

[Guide index](README.md) · Previous: [8. Getting involved](08-getting-involved.md)
