# V82-01 — Layer-3 interoperability and ambiguity-closure work packet

**Date:** 2026-09-04

**Status:** Preparation-only; informative work packet; no normative adoption

**Baseline:** `gkos-standard` `main` at
`7d5147fd17f0d1eb42a92b1b4b63b24b812f9b2b` after accepted R22 / PR #43

**Published baseline:** GKOS-2026-09-03 v0.81 at signed tag target
`8f2a158c6d4b8cabd907d98765766d281aec1247`

## 1. Purpose

This is the first substantive v0.82 work packet after R22. It prepares closure
of the open Layer-3 interoperability ambiguities already recorded under R21
without silently turning an implementation choice into Standard doctrine.

The controlling question is:

> Can two independently written implementations represent, exchange, validate,
> and compare the same Layer-3 relationships without silently changing their
> direction, identity, temporal meaning, contradiction state, or lineage?

This packet does not answer that question by declaration. It defines the exact
questions, evidence, fixtures, and owner decisions required before a normative
candidate is drafted.

## 2. Existing controlling material

The current repository already establishes the following boundaries:

- Layer 3 uses assertion and lineage records with typed relationships, field
  origin/provenance, scope, actor, and temporal validity.
- Contradiction, supersession, correction, withdrawal, rejection, deletion, and
  governed erasure are distinct operations and must not be silently collapsed.
- Epistemic state, review disposition, object class, and temporal validity are
  distinct dimensions.
- Stable governed identity is not equivalent to a path, filename, graph-node
  identifier, or projection-store identifier.
- R15 governs explicit supersession and preservation of history.
- R21 already records three open graph/interoperability ambiguities:
  `EAR-GRAPH-001`, `EAR-GRAPH-002`, and `EAR-GRAPH-003`.
- Implementation behavior is evidence, not authority for the Standard.

## 3. V82-01 ambiguity set

### V82-L3-A — Direction and inverse semantics

Source issue: `EAR-GRAPH-001`.

Questions requiring explicit disposition:

1. Which relationship types are intrinsically directed?
2. Which relationships, if any, have a declared inverse name?
3. Is an inverse serialized as a second record, derived as a projection, or
   both under declared rules?
4. Can a consuming implementation reverse an edge for local traversal while
   preserving the canonical direction?
5. How is an unknown or implementation-specific relation transported without
   pretending that another implementation understands its semantics?

Required evidence before closure:

- proposed relation vocabulary and extension rule;
- canonical direction rule;
- inverse/projection rule;
- positive and negative round-trip fixtures;
- at least two implementation results.

### V82-L3-B — Duplicate, cycle, branch, and unresolved-target semantics

Source issue: `EAR-GRAPH-002`.

Questions requiring explicit disposition:

1. What makes two assertion/relationship records identical versus merely
   semantically similar?
2. Which relation classes permit repeated equivalent assertions from distinct
   actors or evidence?
3. Which relation classes are acyclic, antisymmetric, symmetric, or otherwise
   constrained?
4. How are cycles represented when they are valid domain facts?
5. How are prohibited cycles diagnosed without deleting evidence?
6. How are unresolved targets represented so that a projection cannot silently
   drop the relationship?
7. How are lineage branches represented without forcing one active head unless
   controlling text explicitly requires one?

Required evidence before closure:

- identity/equality rule;
- relation-property vocabulary;
- cycle and branch fixtures;
- unresolved-target fixtures;
- deterministic diagnostic expectations;
- migration behavior for existing records.

### V82-L3-C — Resolver precedence and reference fidelity

Source issue: `EAR-GRAPH-003`.

Questions requiring explicit disposition:

1. What reference forms are allowed in portable Layer-3 interchange?
2. Which references are authoritative governed identities and which are only
   locators or aliases?
3. If multiple references are present, which one controls resolution?
4. Must ambiguity fail closed rather than choose a basename/path match?
5. How is a moved or renamed file prevented from creating a new governed
   relationship target?
6. How are external URI references handled when the target is unavailable?

Required evidence before closure:

- reference-type vocabulary;
- deterministic resolver precedence;
- collision fixtures;
- rename/move fixtures;
- missing-target behavior;
- compatibility analysis against current GKX 2.0 records.

## 4. Cross-cutting semantics that must be tested with all three ambiguities

The following may not be treated as secondary details because a graph adapter
can otherwise change meaning while remaining structurally valid:

- actor identity and provenance;
- exact evidence anchors;
- epistemic state;
- valid-from / valid-until semantics;
- assertion version;
- contradiction relationship;
- correction relationship;
- supersession relationship;
- branch-preserving lineage;
- source revision identity;
- unknown extension preservation;
- projection rebuild equivalence.

## 5. Required fixture families

The first V82-01 fixture tranche should be portable and implementation-neutral.
It should contain at minimum:

1. canonical directed relation;
2. declared inverse round-trip;
3. unknown relation extension round-trip;
4. duplicate evidence from distinct actors;
5. exact duplicate record replay;
6. valid symmetric relation case;
7. valid domain cycle case;
8. prohibited supersession cycle;
9. branch-preserving lineage case;
10. unresolved target retained as unresolved;
11. UID versus path collision;
12. rename/move with stable UID;
13. external URI unavailable;
14. contradictory assertions from distinct evidence;
15. correction without evidence deletion;
16. supersession with preserved historical query;
17. temporal validity overlap;
18. projection rebuild producing equivalent governed meaning.

Each fixture must declare:

- exact input;
- expected portable output;
- expected diagnostic or success condition;
- whether the rule is current v0.81 behavior, proposed v0.82 behavior, or an
  intentionally open alternative;
- whether failure blocks a future profile claim or is informative-only at the
  preparation stage.

## 6. Differential implementation method

V82-01 should not use GKOS-Engine output as the oracle for the Standard.
Instead:

```text
Standard candidate semantics + portable fixture
          │
     ┌────┴────┐
     │         │
Implementation A   Implementation B
     │         │
     └────┬────┘
          │
 semantic comparator
          │
          ▼
ENGINE_BUG / IMPLEMENTATION_B_BUG / SPEC_AMBIGUITY /
FIXTURE_BUG / ALLOWED_VARIATION
```

Until a public second implementation exists, the Standard repository may build
fixtures and a neutral comparator, but it must not label same-author results as
independent interpretation evidence.

## 7. Required owner decisions before normative drafting

No normative R23 candidate should be written until these policy choices are
explicitly dispositioned:

### Q1 — Relationship vocabulary model

A. Closed core vocabulary with separately namespaced extensions.

B. Open vocabulary where any URI/name is valid but portable semantics exist
only for the Standard-defined core.

**Committee recommendation: B.** This preserves domain neutrality while keeping
a small portable semantic core.

### Q2 — Inverse representation

A. Canonical relationship is stored once; inverse is a deterministic projection
unless an independently evidenced assertion actually exists in the inverse
semantic role.

B. Every relation with a declared inverse must serialize two records.

**Committee recommendation: A.** Duplicating inverse records creates avoidable
identity, receipt, and divergence problems.

### Q3 — Duplicate semantics

A. Deduplicate by subject/predicate/object tuple.

B. Assertion identity remains distinct when actor, evidence, scope, time, or
provenance differs; byte/exact replay may be idempotently collapsed by record
identity only.

**Committee recommendation: B.** A tuple alone cannot preserve evidentiary
independence.

### Q4 — Resolver ambiguity

A. Resolve by deterministic precedence and accept the first match.

B. Use deterministic precedence only among unambiguous identity-bearing forms;
ambiguous locator/alias matches fail closed and remain unresolved.

**Committee recommendation: B.** Silent basename/path resolution is incompatible
with stable governed identity.

### Q5 — Cycles

A. Globally prohibit relationship cycles.

B. Permit cycles unless a relation class is explicitly constrained; prohibit
and diagnose cycles for supersession or another relation whose controlling
semantics require acyclicity.

**Committee recommendation: B.** General graphs legitimately contain cycles;
cycle prohibition must be semantic, not structural.

### Q6 — Active-head semantics

A. Require one active head for every lineage.

B. Permit governed branches; require a single active head only where an exact
relation/profile/policy explicitly requires it.

**Committee recommendation: B.** This preserves competing or parallel governed
histories without inventing an authoritative tiebreak.

## 8. Planned deliverables after owner disposition

After Q1–Q6 are answered, prepare a successor branch containing:

1. a Proposed R23 Layer-3 interoperability decision record;
2. versioned Layer-3 semantic vocabulary/schema additions as provisional until
   adopted;
3. portable positive/negative/adversarial fixtures;
4. a neutral semantic comparator;
5. migration notes for existing GKX 2.0 representations;
6. updates to `EAR-GRAPH-001..003` showing DRAFTING rather than CLOSED until
   implementation evidence exists;
7. an implementation-evidence template for Engine and a public second
   implementation; and
8. a different-model-family review packet before any owner acceptance.

## 9. Exit gate

V82-01 is complete only when:

- the owner dispositions Q1–Q6;
- candidate semantics are addressable and versioned;
- positive, negative, boundary, and adversarial fixtures pass against the
  candidate rule set;
- no current implementation is treated as normative authority;
- at least two implementation result sets are available for final
  interoperability closure; and
- `EAR-GRAPH-001..003` are closed only with the controlling decision, migration
  consequences, fixtures, and exact evidence coordinates recorded.

## 10. Authority boundary

This work packet does not amend GKOS v0.81 or create v0.82 normative text. It
does not qualify a profile, activate a binding, declare an implementation
interoperable, release a product, authorize a writer/effect surface, or create
certification standing. It prepares the questions and evidence needed for a
later prospective owner decision.
