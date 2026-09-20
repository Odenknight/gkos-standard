# GKOS and the CIA Triad: An Informative Alignment

<!-- markdownlint-disable MD013 -->

**Document:** CIA triad alignment, informative revision 1 (no crosswalk identifier allocated)  
**Applies to:** GKOS-2026-09-03 v0.81 (signed tag `v0.81`, commit `8f2a158c6d4b8cabd907d98765766d281aec1247`). Requirement references are pinned to the published v0.81 source below. Later development on `main` does not change that publication coordinate.  
**Status:** informative. This document does not amend the master standard, allocate requirements, or establish any conformance, certification, security, or fitness claim. Authoritative text and the permanent requirement registry control where they differ.  
**External baseline:** NIST FIPS 199 §3, which restates the three security objectives of 44 U.S.C. §3542.  
**Overview graphic:** [CIA objectives and GKOS functions](../graphics/diagrams/gkos-cia-overview.svg)  
**Companion graphic:** [`graphics/diagrams/gkos-cia-triad-alignment.svg`](../graphics/diagrams/gkos-cia-triad-alignment.svg)

## 1. Short answer

The CIA triad names three security *objectives*. GKOS is a *governance* standard: it says what evidence, authority, context, and records must exist before knowledge is accepted or acted on, and it requires applicable mandatory checks to fail closed when required evidence is missing or indeterminate. The two fit together this way:

- **Integrity** is where GKOS is strongest. Its contracts preserve evidence, identity, lineage, decisions, exact context, and action records across the knowledge lifecycle.
- **Confidentiality** is a direct normative concern in v0.81. `GKOS-DISCLOSURE-001` makes authorization a precondition of protected disclosure on every output surface, including logs, metrics, and error messages, and the security annex sets fail-closed handling rules for sensitivity.
- **Availability** is supported, not delivered. GKOS records how a governed system refuses, rolls back, escalates, and recovers, and it requires review queues to be managed. It does not define uptime, redundancy, or backup obligations.

GKOS therefore supplies governance evidence *for* security outcomes. Whether the outcome is achieved is shown by the deployed controls and operational tests that an implementer adds around GKOS.

## 2. The three objectives, as FIPS 199 defines them

| Objective | FIPS 199 §3 definition (paraphrased) | Loss means |
| --- | --- | --- |
| Confidentiality | Preserve authorized restrictions on access and disclosure, including protection of personal privacy and proprietary information | Unauthorized disclosure |
| Integrity | Guard against improper modification or destruction, including information non-repudiation and authenticity | Unauthorized modification or destruction |
| Availability | Ensure timely and reliable access to and use of information | Disruption of access or use |

FIPS 199 places authenticity and non-repudiation inside integrity. In this informative mapping, actor-separation and receipt rules support integrity. They do not by themselves establish authenticity or non-repudiation.

## 3. Alignment table

The middle column lists what the v0.81 normative surface actually requires, with permanent requirement IDs from [`requirements/REGISTRY.md`](../requirements/REGISTRY.md) where one exists and annex citations where the rule is annex-only. The right column lists what GKOS deliberately leaves to the deployment.

| Objective | What GKOS requires or records | Where it lives (layers · records) | What the implementation must add |
| --- | --- | --- | --- |
| **Confidentiality** | Authorization before any protected disclosure to another principal, audience, provider, process, log, event, metric, count, diagnostic, error, or output surface; denied information must not influence outputs outside the authorized boundary except by an explicitly authorized bounded disclosure such as a generic refusal (`GKOS-DISCLOSURE-001`). Missing sensitivity fails closed; restrictions may be raised at once but lowered only by authenticated authority; audit and provenance records inherit or exceed the sensitivity they reference; external dispatch needs explicit route authorization and purpose; agent writes need separate authorization from reads (Security annex). Authority carries purpose, tenant, audience, and sensitivity scope, and delegation can only narrow it (Authority annex §2; `GKOS-EFFECT-001..003`). Context Manifests are purpose-bound, restriction-aware, and bind recipient and applicable restrictions (`GKOS-CONTEXT-001`, `-004`); authority validity and expiry are evaluated separately (`GKOS-AUTHUSE-003`, `-007`). A Viewer must display restrictions without gaining authority (`GKOS-PROFILE-007`). | L1 sensitivity and custody evidence · L4 control and Refusal Receipts · L6 Selection Envelope and Context Manifest · L7 Authority Receipt and Authorized Use Record | Enforced access boundaries at the real operation, not observation-only; encryption at rest and in transit; key, credential, and revocation management; tests that a denied item leaks through no log, error, metric, or output; timing-side-channel bounds (informative only in v0.81). |
| **Integrity** | Every committed governed state change is durably bound to a State-Change Receipt, and a change that cannot be receipted fails closed or is verifiably rolled back or compensated before it is called committed (`GKOS-RECEIPT-001..003`). Canonical artifacts use deterministic GKX-CBOR-1 encoding and SHA-256 hashing over type, schema, profile, and digest-bound policy references, so identical captured selection, resolved content, schema, policy, compiler, and canonical-profile inputs produce identical Context Manifest bytes and hash (`GKOS-CANON-001..008`). Identity is stable and never conferred by filename, path, timestamp, or UUID order (`GKOS-IDENTITY-001..004`); lineage keeps every branch and no tiebreak picks a winner (`GKOS-LINEAGE-001..003`). Nondeterministic selection is captured, and assembly is deterministic and replayable (`GKOS-CONTEXT-001..003`). Decision Records are append-only and bound to the exact evidence reviewed (`GKOS-REVIEW-002`, `-004`). Proposing, reviewing, authorizing, and executing roles stay distinct, and no actor approves its own work; an agent reviewer needs a different model family, sealed evidence, deterministic gates, and human escalation (`GKOS-REVIEW-003`, `GKOS-AUTHUSE-004`). The Context Manifest hash at authorization must equal the hash at action time, and authority must be valid at the captured action time (`GKOS-AUTHUSE-001..003`, `-007`). Policies have explicit identity and version and cannot be silently substituted (`GKOS-POLICY-001`). Re-entered material starts over at L1 with no inherited standing, and supersession is declared, never inferred (`GKOS-REENTRY-001..004`). Every required gate closure leaves a Refusal Receipt (`GKOS-AUTHUSE-005`). | L1–L7 end to end · Source Record · Structured Knowledge Object · lineage records · Control Receipt · Decision Record · Selection Envelope · Context Manifest · Authorized Use Record · Refusal Receipt · State-Change Receipt role across all mutations | Tamper-resistant storage for records and trust anchors; signing, attestation, and trusted time; tests that alter evidence, break receipt binding, present stale or mismatched context, or use expired authority and confirm a recorded refusal or rollback; evaluation of source *quality*, because GKOS evidence integrity does not establish factual truth (Known Limitations annex). |
| **Availability** | A required gate closure must be recorded, with an escalation route where applicable, so an authorized refusal is distinguishable from an outage (`GKOS-AUTHUSE-005`). Every Authorized Use Record binds its outcome and a correction, compensation, rollback, or escalation route (`GKOS-AUTHUSE-006`). Deletion or disposition consults a declared hold predicate first, legal hold overrides routine deletion, and governed erasure may keep a minimal tombstone plus decision evidence (`GKOS-RETENTION-001..003`; Security annex). Review queues require capacity, TTL, aging, workload, sampling, and emergency procedures, and an overdue delegation review stops further delegated changes (`GKOS-DELEGATION-006`; Security annex). Stable identity and replayable Context Manifests let governed knowledge be re-served after restoration (`GKOS-IDENTITY-*`, `GKOS-CONTEXT-003`). Layer processing may be asynchronous, distributed, or re-entrant (Layer Interface Contracts annex). | L1 retention evidence · L2 stable identity · L4 fail-closed gates · L5 queue governance · L6 replayable manifests · L7 recovery routes | Backups, restore testing, redundancy, and failover; measured service and recovery objectives; load and capacity tests; incident response. GKOS has no uptime artifact and treats fail-closed as the correct answer to indeterminate evidence, so operations must plan for governed refusal as a normal service state. |

## 4. Cross-cutting GKOS concepts the triad view should not hide

**Seven layer contracts.** GKOS is organized as seven cumulative responsibilities: L1 Original Sources, L2 Structure and Identity, L3 Relationships and Lineage, L4 Validation and Control, L5 Review and Workflow, L6 Context Presentation, and L7 Authorized Use. The layers are contracts, not a mandatory synchronous pipeline. Confidentiality controls concentrate at L4, L6, and L7 but depend on sensitivity captured at L1; integrity runs through all seven; availability obligations sit mainly at L5 (queues) and L7 (recovery routes).

**Receipts are roles, not files.** A State-Change Receipt, Control Receipt, Authority Receipt, Authorized Use Record, or Refusal Receipt is a semantic role. One governed record may satisfy several roles as long as it keeps every required field and does not collapse actor, authority, decision, action, and outcome semantics. A graphic that shows one receipt box per layer is a simplification.

**Fail-closed is the default posture.** Missing sensitivity, indeterminate authority, unevaluable effect scope, unreceiptable state changes, and unavailable hold predicates all fail closed. This is what makes GKOS strong on confidentiality and integrity, and it is also why GKOS cannot promise availability: a correctly governed system will sometimes refuse.

**Actor separation and bounded agents.** Proposer, reviewer or decider, authorizer, and executor stay distinct. A Specialized Agent needs a stable identity, an accountable owner, declared scope, and a suspension route, and orchestrators may schedule and route work but gain no semantic authority. R18 permits an authorized independent Review Agent at L5 only under bounded, different-model-family, sealed-evidence conditions with mandatory human escalation. Neither a human-only reading nor general agent autonomy is supported.

**Claim boundary.** GKOS Core is GCP-1 through GCP-5; GKOS Advanced adds GCP-6 and GCP-7; the GCP-6 Context-Only Extension is read-only; Viewer/Projection is independent and read-only. The active fixture catalog declares no qualifying profile, and no implementation can currently make a GCP-6 or GCP-7 claim through it. Nothing in this document changes that.

## 5. What GKOS does not claim

GKOS does not guarantee truth, safety, security, scientific validity, admissibility, authenticity, privilege, legal compliance, regulatory approval, or fitness for a professional purpose (Known Limitations annex). Layer-6 selection is attested, not reproduced: a conforming implementation must preserve what the captured envelope contained and demonstrate whether assembly replays, not that a retrieval system would choose the same material again. Hash-chain evidence orders events within one writer stream only. GKOS does not decide which legal hold applies; it requires the deployment to declare a predicate and fails closed when that predicate cannot be evaluated.

## 6. Recommended demonstrations

These are suggested tests for an implementer's evidence package. None has been run for this document.

1. **Disclosure.** Request a protected item without authority and confirm that the refusal, its logs, error text, metrics, and any downstream output reveal nothing about the denied content beyond the authorized generic refusal (`GKOS-DISCLOSURE-001`).
2. **Binding.** Alter a Context Manifest after authorization, or interrupt receipt binding mid-commit, and confirm a Refusal Receipt with the registered gate code or a verifiable rollback before any commit is reported (`GKOS-AUTHUSE-002`, `GKOS-RECEIPT-003`).
3. **Recovery.** Take a dependency offline, restore it, and confirm that authorized access resumes from retained records and replayed manifests without any governance gate being bypassed to speed recovery (`GKOS-CONTEXT-003`, `GKOS-AUTHUSE-006`).

## 7. Suggested public wording

> GKOS supports the CIA triad through authorized disclosure, traceable evidence and decisions, reproducible context, and recorded action or refusal. It provides governance contracts and evidence for security outcomes; implementations must demonstrate effective protection and operational resilience.

## 8. Sources

Repository links are pinned to the signed v0.81 tag commit.

1. [NIST FIPS 199, §3](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.199.pdf), Security Objectives.
2. [Permanent requirement registry](https://github.com/Odenknight/GKOS-standard/blob/8f2a158c6d4b8cabd907d98765766d281aec1247/requirements/REGISTRY.md) — every `GKOS-*` ID cited above.
3. [Security, privacy, and retention annex](https://github.com/Odenknight/GKOS-standard/blob/8f2a158c6d4b8cabd907d98765766d281aec1247/standard/annexes/Security_Privacy_Retention.md).
4. [Authority, authorized-use, and refusal receipt fields annex](https://github.com/Odenknight/GKOS-standard/blob/8f2a158c6d4b8cabd907d98765766d281aec1247/standard/annexes/Authority_and_Refusal_Receipt_Fields.md).
5. [Governed state change, re-entry, retention, and bounded delegation annex](https://github.com/Odenknight/GKOS-standard/blob/8f2a158c6d4b8cabd907d98765766d281aec1247/standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md).
6. [Layer interface contracts annex](https://github.com/Odenknight/GKOS-standard/blob/8f2a158c6d4b8cabd907d98765766d281aec1247/standard/annexes/Layer_Interface_Contracts.md) and [layer-to-artifact mapping annex](https://github.com/Odenknight/GKOS-standard/blob/8f2a158c6d4b8cabd907d98765766d281aec1247/standard/annexes/Layer_Artifact_Mapping.md).
7. [Conformance profiles annex](https://github.com/Odenknight/GKOS-standard/blob/8f2a158c6d4b8cabd907d98765766d281aec1247/standard/annexes/Conformance_Profiles.md) and [Specialized Agent Framework annex](https://github.com/Odenknight/GKOS-standard/blob/8f2a158c6d4b8cabd907d98765766d281aec1247/standard/annexes/Specialized_Agent_Framework.md).
8. [Known limitations and open issues annex](https://github.com/Odenknight/GKOS-standard/blob/8f2a158c6d4b8cabd907d98765766d281aec1247/standard/annexes/Known_Limitations_and_Open_Issues.md).
9. [R18 development decision record, §4 (protected disclosure)](https://github.com/Odenknight/GKOS-standard/blob/8f2a158c6d4b8cabd907d98765766d281aec1247/decisions/R18_Track_A_GCP45_and_Authorized_Independent_Review_Development_Decision_Record.md).
10. [Master standard](https://github.com/Odenknight/GKOS-standard/blob/8f2a158c6d4b8cabd907d98765766d281aec1247/standard/00_GKOS_Master_Standard.md), normative surface and claim boundary.
