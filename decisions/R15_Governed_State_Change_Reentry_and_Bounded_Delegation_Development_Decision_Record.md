# R15 — Governed state change, re-entry, and bounded delegation

**Date:** 2026-08-15  
**Status:** Accepted development decision; v0.x non-consensus authority  
**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor  
**Target:** GKOS v0.79 development line

## 1. Decision basis

This record disposes the owner Q&A conducted 2026-08-15 after review of the r3 standard and Engine directives, the v0.79 integration assessment, the Fable review, and repository reality at `dbbbccef6571137274e56c40f45a87dbdc6dc762`.

All eighteen owner questions were answered **Option A**. Advisory review is evidence, not independent approval, committee approval, certification, or consensus.

The repository baseline contains three distinct evidence populations that MUST remain separately described: eight active core fixtures, twenty-two provisional SRTP fixtures, and ten pre-R15 permanent requirement IDs. Provisional SRTP evidence is not silently promoted into active conformance authority.

## 2. Adopted rulings

### R15-103 — Standard vocabulary and deployment policy

GKOS owns already-adopted interoperability vocabulary. Deployments own jurisdictional or local classification criteria, predicates, thresholds, and handling policy. Deployment policy MUST NOT silently redefine standard-owned vocabulary.

### R15-104 — State-Change Receipt role

A **State-Change Receipt** is a semantic role, not necessarily a new duplicate object. An existing governed record MAY satisfy the role when it contains the required mutation, authority, actor, policy, before/after binding, and durability evidence. A dedicated receipt is required only when no existing governed artifact can satisfy the role.

### R15-105 — Durable mutation binding

A governed state change MUST NOT be represented as committed unless the resulting governed state is durably bound to the record satisfying the State-Change Receipt role. Binding failure MUST cause fail-closed non-commit or verified rollback/compensation. The conformance manifest MUST declare the binding mechanism.

### R15-106 — Re-entry standing

Reintroduced material enters as a new Layer-1 source. It inherits no predecessor layer standing, decision, epistemic state, authority, context authorization, or authorized-use standing. It advances only through subsequently satisfied applicable layer contracts. A profile MAY require identified contracts for a defined use case without making all seven layers a universal synchronous pipeline.

### R15-107 — Predecessor preservation

Re-entry itself MUST NOT mutate or destroy its predecessor. Later retention, tombstoning, erasure, transfer, or disposition is a separately authorized operation.

### R15-108 — Supersession semantics

Semantic supersession MUST be explicit. Software MUST NOT infer supersession from similarity, confidence, retrieval rank, timestamps, UUID order, lexical order, graph position, or implementation tiebreaks. This decision does **not** settle GKX serialized edge direction or inverse vocabulary.

### R15-109 — Navigation standing

NAV-001 remains informative and non-qualifying. Its canonical-five convention is Navigation/MOC-specific and is not a universal GKOS core filename rule. NAV-002 is eligible for drafting because its prior dependencies are cleared, but remains undrafted until explicitly ordered.

### R15-110 — Bounded supersession delegation

Supersession delegation MUST be explicit, bounded, versioned, expiring, provenance-preserving, no broader or longer-lived than originating authority, and bound to the applicable Specialized Agent Contract or equivalent governed actor contract. It does not confer general write authority.

A delegated supersession operation requires a positive `routine` result from a deterministic, human-governed, versioned predicate. `major` and indeterminate outcomes require prior human disposition. A non-deterministic checker MAY only increase restrictiveness and MUST NOT downgrade a deterministic `major` or indeterminate outcome.

Required deferred review is finite and monitored. When review becomes overdue, the affected delegation MUST NOT authorize additional state changes until disposition or a higher-precedence, bounded, time-limited, durably receipted exception.

### R15-111 — Fixture accounting and SRTP reconciliation

Fixture counts MUST be reported by suite and standing. Active core, provisional profile, and implementation-only fixtures MUST NOT be collapsed into a single conformance count.

The twenty-two existing SRTP fixtures remain provisional and keep their identities. Where they overlap new core requirements, the repository records traceability rather than re-keying or promoting them in place. Separate domain-neutral active fixtures are authored only against allocated GKOS requirement IDs.

### R15-112 — GCP applicability

New requirements attach per requirement, not by whole-family shorthand. Cross-cutting mutation requirements apply only when an implementation commits governed state. Read-only implementations do not acquire fictitious mutation obligations.

### R15-113 — Engine release split

GKOS-Engine 2.1.0 is authorized as a **source-content-read-only Navigation core**: deterministic discovery, candidate generation, audit, context packaging, re-entry planning, bounded delegation evaluation, and explicit append-only Governance Store interfaces. Source-content mutation, managed MOC replacement, archive deletion, locking, rollback execution, and general governed writing are deferred to a later Engine 2.2.0 write executor.

The undefined “Walk Test” is deferred and stripped until subject and pass criteria exist.

### R15-114 — Retention scope

Retention requirements are domain-neutral and apply to governed artifacts generally. Navigation archives are informative examples, not the normative scope.

### R15-115 — Zenodo archival direction

Zenodo is adopted as the v0.x archival mechanism. Archival closure occurs only after actual DOI issuance, verification, and binding to the exact release/tag/commit evidence. DOI status is not certification, consensus, conformance, or regulatory approval.

### R15-116 — Directive and merge process

STD-079 and ENG-210 are reissued as r4; r3 remains historical evidence. The v0.79 change is implemented on a branch, mechanically checked, reviewed as a pull request, and merged only when required checks are green. Normative change is not created by implementation behavior alone.

## 3. Permanent requirement allocations

R15 permanently allocates the requirement texts recorded in `requirements/REGISTRY.md` for:

- `GKOS-RECEIPT-001..003`
- `GKOS-POLICY-001`
- `GKOS-RETENTION-001..003`
- `GKOS-REENTRY-001..004`
- `GKOS-DELEGATION-001..006`

These identifiers are append-only and MUST NOT be reused if later retired or replaced.

## 4. Profile attachment

- `GKOS-RECEIPT-001..003`: cross-cutting where governed state is committed.
- `GKOS-POLICY-001`: GCP-4 and higher when a deployment predicate participates in control.
- `GKOS-RETENTION-001..003`: GCP-4 for disposition control; GCP-7 when consequential deletion/disposition is executed.
- `GKOS-REENTRY-001`: GCP-1.
- `GKOS-REENTRY-002`: cross-cutting standing invariant.
- `GKOS-REENTRY-003`: GCP-1 plus applicable retention/disposition requirements.
- `GKOS-REENTRY-004`: GCP-3; GCP-4 when delegated.
- `GKOS-DELEGATION-001..003`: GCP-4.
- `GKOS-DELEGATION-004`: GCP-5.
- `GKOS-DELEGATION-005`: GCP-4 and higher.
- `GKOS-DELEGATION-006`: GCP-5.

## 5. Non-decisions and preserved boundaries

R15 does not settle canonical GKX edge direction, inverse-relationship vocabulary, resolver precedence, or serialization determinism. It does not make NAV-001 normative, draft NAV-002, create a complete qualifying GCP profile, promote SRTP to normative standing, authorize general agent writing, or declare Engine behavior to be specification authority.

## 6. Future-risk controls

Future releases SHOULD automate consistency checks for requirement allocations, profile mappings, fixture standing/counts, release metadata, Zenodo/CITATION metadata, and standard-to-Engine traceability. Any operational shortcut that weakens authority, provenance, deterministic control, visible contradiction, fail-closed behavior, or conformance honesty requires a new normative decision rather than silent adaptation.
