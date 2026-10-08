# Annex — Governed state change, re-entry, retention, and bounded delegation

**Status:** Normative development annex adopted by R15 for the v0.79 development line.

## 1. Universal state-change receipting

A committed governed state change MUST be durably bound to a governed record satisfying the **State-Change Receipt role**.

The State-Change Receipt is a semantic role. A Source Record ingestion receipt, Control Receipt, Decision Record, Authorized Use Record, disposition record, configuration record, or other governed artifact MAY satisfy the role when it records the required actor, authority, policy, operation, before/after state binding, outcome, and durability evidence. A dedicated receipt object is required only when no existing artifact can satisfy the role.

A state change MUST NOT be represented as committed when required receipt binding fails. The implementation MUST fail closed or verifiably roll back or compensate before reporting commit success. The conformance manifest MUST declare the binding mechanism used, such as an atomic transaction, journaled/two-phase filesystem protocol, or deterministic compensation mechanism.

The record satisfying this role MUST identify the actor class and, where consulted, the deterministic predicate identity/version and whether a non-deterministic checker increased restrictiveness.

<!-- R26-A12 (accepted 2026-10-07; v0.83 development line) -->
A record satisfying the State-Change Receipt role MUST carry, under its own field names:

- its identity and version;
- the actor, as an actor reference with actor class;
- the authority basis reference, when the change requires authority;
- the governing policy identity, version and digest, when policy took part;
- the deterministic predicate identity and version, when consulted, and whether a non-deterministic checker increased restrictiveness;
- the operation, naming the kind of governed change;
- a digest-bound reference to the governed state before the change, absent for creation;
- a digest-bound reference to the governed state after the change, or a tombstone reference for deletion or erasure;
- the outcome: `committed`, `rolled-back`, `compensated`, or `refused`;
- the binding mechanism declared in the conformance manifest and the transaction, journal, or compensation identifier that applied; and
- the captured commit or refusal time.

## 2. Standard-owned vocabulary and deployment-owned policy

GKOS defines universal interoperability semantics and owns already-adopted GKOS/GKX exchange vocabulary. Where correct behavior depends on law, contract, domain, deployment risk, or local policy, the deployment supplies an explicit, versioned policy, predicate, or threshold.

A deployment-supplied policy or predicate required by GKOS MUST have explicit identity and version and MUST NOT be silently substituted by model inference, undeclared defaults, or implementation-private behavior.

Deployment policy does not silently redefine standard-owned vocabulary. Existing GKX sensitivity labels remain standard-owned; deployments define classification criteria and handling policy behind them.

## 3. Retention and disposition

Before deletion or disposition of an archived governed artifact is committed, the implementation MUST consult the applicable deployment-declared hold predicate.

The deletion/disposition record satisfying the State-Change Receipt role MUST bind the hold-predicate identity/version and result.

An unavailable or indeterminate mandatory hold evaluation, or a detected hold/erasure conflict, MUST fail closed and be routed for authorized human disposition. GKOS does not itself decide the applicable legal obligation.

<!-- R26-A15 (accepted 2026-10-07; v0.83 development line) -->
A hold-predicate evaluation returns exactly one of `no-hold`, `hold`, `unavailable`, or `indeterminate`. Deletion or disposition commits solely on `no-hold`.

<!-- R26-A15 (accepted 2026-10-07; v0.83 development line); gate code GKOS-GATE-L4-009 per owner answer 2026-10-07, R26 section 7.2 -->
On `hold`, the deletion or disposition MUST NOT commit, and a record satisfying the Refusal Receipt role cites GKOS-RETENTION-001 with GKOS-GATE-L4-009 (disposition refused: active hold). When a governed erasure obligation also applies, the conflict fails closed with GKOS-GATE-L4-002 and is routed for authorized human disposition. `unavailable` and `indeterminate` fail closed with GKOS-GATE-L4-001 and are routed the same way.

<!-- R26-A15 (accepted 2026-10-07; v0.83 development line) -->
The deletion or disposition record binds the predicate identity, version and digest, the result, and the captured evaluation time.

Retention requirements are domain-neutral. Navigation archives are examples, not the normative scope.

## 4. Re-entry

Reintroduced formerly managed material MUST enter as a new Layer-1 source and MUST NOT be merged in place into its predecessor.

A re-entered source MUST NOT inherit predecessor layer standing, decisions, epistemic state, authority, context authorization, or authorized-use standing. It advances only through applicable layer contracts subsequently satisfied.

An application profile MAY require completion of identified layer contracts for a defined re-entry use case; that requirement does not make all seven GKOS layers a universal synchronous pipeline.

Re-entry itself MUST NOT mutate or destroy the predecessor. The predecessor remains a governed historical artifact and may later be retained, tombstoned, erased, transferred, or disposed only through separately authorized retention, hold, erasure, and disposition rules.

## 5. Explicit semantic supersession

Semantic supersession on re-entry MUST be explicitly declared by an authorized human or valid bounded delegation and MUST NOT be inferred by software.

Similarity, confidence, retrieval rank, timestamps, UUID ordering, lexical ordering, graph centrality, and implementation tiebreaks MUST NOT create semantic supersession authority.

This annex does not settle serialized GKX edge direction or inverse-relationship vocabulary.

## 6. Bounded supersession delegation

A supersession delegation MUST be explicit, bounded, versioned, expiring, and no broader or longer-lived than its originating authority. It MUST bind to the applicable Specialized Agent Contract or equivalent governed actor contract and preserve provenance.

A delegated supersession operation MUST be positively classified as `routine` by a deterministic, human-governed, versioned predicate. `major` and indeterminate outcomes require prior human disposition.

A non-deterministic checker MAY only increase restrictiveness and MUST NOT downgrade a deterministic `major` or indeterminate outcome.

A delegated action MUST reference its grant and predicate in the record satisfying the State-Change Receipt role and MUST enter the required human-review lifecycle.

Bounded supersession delegation MUST NOT confer or imply general governed write authority.

When required review of actions under a delegation becomes overdue, that delegation MUST NOT authorize additional state changes until the overdue condition is dispositioned or a higher-precedence, bounded exception is explicitly authorized, time-limited, and durably receipted.

<!-- R26-A14 (accepted 2026-10-07; v0.83 development line) -->
A delegation whose actions require review MUST declare a review deadline: a maximum interval between an action's captured commit time and its review disposition. The grant or the policy it binds carries the deadline.

<!-- R26-A14 (accepted 2026-10-07; v0.83 development line) -->
Review of an action is overdue when the captured evaluation time is at or after the action's commit time plus that interval and no review disposition is recorded. A missing deadline, or an unavailable or indeterminate commit time or review status, counts as overdue.

<!-- R26-A14 (accepted 2026-10-07; v0.83 development line) -->
While any review under the delegation is overdue, the delegation authorizes no further state change. A refused change emits GKOS-GATE-L5-001.

<!-- R26-A14 (accepted 2026-10-07; v0.83 development line) -->
A higher-precedence exception is an Authority Receipt from an authority of higher precedence than the delegation under Annex Definitions D-2. It MUST name the delegation and the overdue condition, carry a `valid_until`, and be bound in the State-Change Receipt role record of each change it permits.

## 7. Navigation standing

The canonical-five MOC convention (`index`, `_index`, `readme`, `moc`, `contents`) is an informative Navigation convention, not a universal GKOS filename rule. Noncanonical MOC-like names are flagged and may be promoted only through a governed configuration change.

NAV-001 remains informative and non-qualifying. NAV-002 is eligible for later drafting but is not created by this annex.

## 8. Conformance and fixture standing

Active core fixtures, provisional profile fixtures, and implementation-only tests MUST be reported separately. A combined headline count MUST NOT imply equal normative standing.

Existing provisional SRTP fixtures retain their identifiers and provisional status. Overlap with these requirements is recorded by traceability; provisional fixtures are not re-keyed or promoted in place.
