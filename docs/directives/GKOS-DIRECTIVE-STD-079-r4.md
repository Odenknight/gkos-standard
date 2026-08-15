# GKOS-DIRECTIVE-STD-079 r4

**Status:** Owner-approved development directive  
**Date:** 2026-08-15  
**Controlling decision:** R15  
**Supersedes for current development:** STD-079 r3; r3 remains historical evidence

## 0. Controlling invariants

1. Capability is not authority.
2. Confidence, similarity, retrieval rank, model agreement, timestamps, UUID order, lexical order, and graph position do not create authority.
3. Every committed governed state change is durably receipted through a governed record satisfying the State-Change Receipt role.
4. Receipt-binding failure fails closed or is verifiably rolled back/compensated.
5. Contradiction, correction, supersession, withdrawal, rejection, deletion, and erasure remain distinct.
6. Re-entry begins as a new Layer-1 source and inherits no prior standing.
7. Bounded delegation attenuates authority and cannot become general write authority.
8. Non-deterministic checking may only increase restrictiveness.
9. Standard fixtures, provisional profile fixtures, and implementation tests remain distinct evidence classes.
10. Implementation behavior proposes; it does not amend GKOS.

## 1. Universal versus deployment-bound semantics

GKOS owns universal interoperability semantics and already-adopted exchange vocabulary. Deployments own versioned jurisdictional/domain criteria, thresholds, hold predicates, classification rules, and handling policy. Deployment policy MUST NOT silently redefine standard-owned vocabulary.

## 2. State-change receipting

State-Change Receipt is a semantic role. Existing governed artifacts may satisfy it when they bind actor, authority, policy/predicate, operation, before/after state, outcome, and durability evidence. Duplicate receipt objects are not required when an existing artifact fully satisfies the role.

## 3. Retention

Before governed deletion/disposition, consult the applicable versioned hold predicate. Unavailable, indeterminate, or conflicting mandatory hold evaluation fails closed to authorized human disposition. GKOS records the decision path; it does not manufacture legal authority.

## 4. Re-entry and supersession

Reintroduced formerly managed material enters as a new Layer-1 source. It is not merged in place and inherits no prior layer, decision, epistemic, authority, context, or use standing. The predecessor is not mutated by re-entry; later disposition is separate.

Semantic supersession is explicit only. It requires an authorized human or valid bounded delegation and is never inferred by software. Serialized edge direction and inverse vocabulary remain separately unsettled.

## 5. Bounded delegation hierarchy

A supersession delegation is explicit, versioned, expiring, attenuated, provenance-preserving, and bound to a governed actor contract.

Mechanical decision order:

1. Validate grant, actor, scope, expiry, predecessor/successor binding, and applicable policy.
2. Deterministic human-governed predicate returns `routine`, `major`, or `indeterminate`.
3. Only `routine` is eligible for delegated execution.
4. A non-deterministic checker may escalate `routine` to a more restrictive outcome; it may never downgrade `major` or `indeterminate`.
5. Executed delegated action is durably receipted and enters required human review.
6. If required review becomes overdue, that grant freezes for new state changes until disposition or a higher-precedence bounded, time-limited, receipted exception.

## 6. Navigation

NAV-001 remains informative and non-qualifying. The canonical five MOC names are:

- `index`
- `_index`
- `readme`
- `moc`
- `contents`

They are a Navigation convention, not universal GKOS filenames. MOC-like noncanonical names are flagged and may be promoted only through governed configuration change.

NAV-002 is unblocked but not drafted by this directive.

## 7. Fixture standing

Report separately:

- active core conformance fixtures;
- provisional profile fixtures, including SRTP;
- implementation-only integration/contract tests.

Existing SRTP fixture identities remain provisional. Overlap is expressed through traceability, not silent re-keying or promotion.

## 8. Permanent requirements

R15 allocates the seventeen new permanent IDs in `requirements/REGISTRY.md`: RECEIPT 001–003, POLICY 001, RETENTION 001–003, REENTRY 001–004, and DELEGATION 001–006.

## 9. Deferred matters

This directive does not settle canonical GKX edge direction, inverse vocabulary, resolver precedence, serialization determinism, NAV-002 content, or a complete qualifying GCP profile.
