# GKOS for legal and non-technical professionals

<!-- markdownlint-disable MD013 -->

**Applies to:** GKOS-2026-08-20 v0.80

**Status:** Informative orientation; the normative standard and annexes govern

## The short version

GKOS is a chain-of-custody and authority model for knowledge. It separates the
original material, what someone says that material means, the controls applied,
the decision made, the context actually shown, and the action that followed.

That separation helps answer two questions after a consequential human or AI
action:

1. What exactly did the decision-maker or system rely on?
2. Who had authority to approve or perform the action?

Logs often mix those answers together. GKOS requires distinct records so the
history can be inspected without treating an inference as evidence or a
confidence score as authority.

## The seven layers in plain language

| Layer | Plain meaning | Legal or professional analogy | Main record |
| --- | --- | --- | --- |
| **1. Original Sources** | Keep what was received or observed without silently rewriting it. | Evidence preservation and chain of custody | Source Record |
| **2. Structure and Identity** | Give each governed item a durable identity and version. Moving or renaming it does not change what it is. | A stable Bates-style referent that survives reorganization | Structured Knowledge Object |
| **3. Relationships and Lineage** | Separate what a source says, what a person asserts, and what a system infers; record support, conflict, timing, scope, and origin. | An evidence map that distinguishes the exhibit from testimony or analysis | Assertion and lineage records |
| **4. Validation and Control** | Apply the same declared rule to the same inputs and obtain the same result. Required failures stop the process. | A reproducible control, not an after-the-fact explanation | Diagnostics and control receipts |
| **5. Review and Workflow** | Record the authorized disposition, conditions, actor, and time in append-only history. | The point at which a responsible actor accepts, rejects, limits, defers, or withdraws | Decision Record |
| **6. Context Presentation** | Freeze the exact purpose-bound material shown, including required warnings, contradictions, restrictions, and known omissions. | The decision packet of record | Selection Set and Context Manifest |
| **7. Authorized Use** | Bind the exact context to the authority, actors, permitted scope, action, outcome, and recovery route. | The authority and execution receipt | Authorized Use Record or Refusal Receipt |

The layers are cumulative responsibilities. GKOS Core means Layers 1 through
5. GKOS Advanced means Layers 1 through 7. A read-only GCP-6 Context-Only
Extension may add reproducible context to Core, but it grants no authority to
take a consequential action. A Viewer/Projection claim is separate and grants
no decision or action authority.

## What v0.80 adds

v0.80 makes the most legally relevant records testable at the byte level.
Layer-6 Context Manifests and Layer-7 Authorized Use Records use one canonical
CBOR representation and one SHA-256 hash. The readable copy is a view; the
canonical bytes remain the authority. A verifier must show every field and
prove that its declared parser can round-trip the view to the same hash.

Selection and assembly are separated. Search, ranking, and model filtering may
vary, so the system captures what they actually selected. Given that frozen
selection and the same schema, policy, compiler, and content, assembly must
reproduce the same Context Manifest bytes and hash.

Layer 7 then binds that manifest identity and hash to the proposal, review,
authorization, execution, delegated scope, action, result, and correction or
rollback route. If authority is missing, expired, revoked, indeterminate, or
too narrow, the action must be refused and the refusal must leave a receipt.

## Why attorneys and reviewers should care

The useful question is not only whether an AI answer was correct. It is whether
the organization can later demonstrate:

- which original material and versions were available;
- which assertions, contradictions, restrictions, and omissions were carried
  into the decision context;
- which deterministic controls ran and which gates blocked;
- which human, agent, service, or organization proposed, reviewed, authorized,
  and executed the action;
- what authority and bounded effect scope existed at action time; and
- what outcome occurred and how it can be corrected, compensated, rolled back,
  or escalated.

This is an accountability and discoverability surface. It does not decide
privilege, admissibility, retention law, professional responsibility, or the
substantive correctness of a decision. Those remain deployment- and
jurisdiction-specific obligations.

## What this release does not prove

GKOS v0.80 is a developmental public pre-standard. It is not accredited,
consensus-ratified, independently certified, legally recognized, or a legal
opinion. The active fixture catalog still declares no qualifying profile, and
publication of schemas is not proof that any implementation satisfies them.
No implementation can presently establish a qualifying GCP-6 or GCP-7 claim
through that catalog.

v0.80 also changes the claim baseline. A claim made against v0.79 does not
automatically carry forward and must be re-evaluated. Nothing is erased:
historical artifacts, tags, release packages, and claim evidence remain intact
as records of what existed and was evaluated at that time.

## Primary reading

- [Master standard](../standard/00_GKOS_Master_Standard.md)
- [Conformance profiles](../standard/annexes/Conformance_Profiles.md)
- [Layer interface contracts](../standard/annexes/Layer_Interface_Contracts.md)
- [Canonical serialization](../standard/annexes/Canonical_Serialization.md)
- [Authority and refusal receipt fields](../standard/annexes/Authority_and_Refusal_Receipt_Fields.md)
- [Known limitations](../standard/annexes/Known_Limitations_and_Open_Issues.md)
