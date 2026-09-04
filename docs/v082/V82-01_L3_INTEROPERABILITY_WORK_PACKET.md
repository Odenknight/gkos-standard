# V82-01 — Layer-3 interoperability and ambiguity-closure work packet

**Date:** 2026-09-04

**Status:** Owner-dispositioned preparation packet; normative adoption still pending

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

This packet does not answer that question by implementation precedent. It
records the owner policy dispositions that govern preparation of a Proposed R23
candidate, portable fixtures, and a neutral comparator.

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

## 3. Owner dispositions — 2026-09-04

The owner adopted the committee recommendations exactly as follows:

| Question | Disposition | Controlling preparation rule |
| --- | --- | --- |
| Q1 Relationship vocabulary | **B** | Vocabulary is open; any URI/name may be transported, but portable semantics exist only for the Standard-defined core. Unknown extensions must remain distinguishable from core semantics. |
| Q2 Inverse representation | **A** | Store the canonical relationship once. A declared inverse is a deterministic projection unless a separately evidenced assertion exists in the inverse semantic role. |
| Q3 Duplicate semantics | **B** | Assertions remain distinct when actor, evidence, scope, time, or provenance differs. Idempotent replay may collapse only by exact record identity. |
| Q4 Resolver ambiguity | **B** | Deterministic precedence applies only among unambiguous identity-bearing references. Ambiguous locator/alias matches remain unresolved and fail closed where resolution is required. |
| Q5 Cycles | **B** | Cycles are permitted generally. They are prohibited only for relation classes whose declared semantics require acyclicity, including supersession. |
| Q6 Active heads | **B** | Governed branches are permitted. A single active head is required only when an exact relation, profile, or deployment policy explicitly requires it. |

These dispositions authorize preparation of Proposed R23 and its evidence
artifacts. They do not themselves amend GKOS v0.81 or make the candidate
semantics normative.

## 4. V82-01 ambiguity set

### V82-L3-A — Direction and inverse semantics

Source issue: `EAR-GRAPH-001`.

The candidate must define:

1. a small Standard-defined relation-property core while permitting namespaced
   extension relations;
2. one canonical stored direction for each core relation;
3. deterministic inverse projection only where an inverse is declared;
4. preservation of canonical direction even when a consumer traverses the graph
   in reverse; and
5. transport of unknown relation names without pretending their semantics are
   understood.

### V82-L3-B — Duplicate, cycle, branch, and unresolved-target semantics

Source issue: `EAR-GRAPH-002`.

The candidate must define:

1. record identity independently from semantic similarity;
2. preservation of repeated assertions from distinct evidence, actors, scopes,
   or times;
3. relation properties such as symmetric, antisymmetric, or acyclic only when
   declared for that relation class;
4. valid cycles as representable domain facts;
5. prohibited-cycle diagnostics without deleting source evidence;
6. unresolved-target preservation rather than silent projection loss; and
7. branch-preserving lineage without an invented authoritative tiebreak.

### V82-L3-C — Resolver precedence and reference fidelity

Source issue: `EAR-GRAPH-003`.

The candidate must define:

1. portable identity-bearing reference forms separately from locators/aliases;
2. deterministic precedence among identity-bearing forms;
3. fail-closed unresolved behavior for ambiguous aliases/locators;
4. stable target identity across path rename/move; and
5. explicit unresolved state for unavailable external URI targets.

## 5. Cross-cutting semantics that must be tested

The following may not be treated as secondary details because an adapter can
otherwise change meaning while remaining structurally valid:

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
- unknown extension preservation; and
- projection rebuild equivalence.

## 6. Required fixture families

The first V82-01 fixture tranche is portable and implementation-neutral. It
contains at minimum:

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
17. temporal validity overlap; and
18. projection rebuild producing equivalent governed meaning.

Each fixture must declare exact input, expected portable meaning, expected
success/diagnostic class, candidate standing, and whether a mismatch is a
semantic divergence or an allowed representational variation.

## 7. Differential implementation method

V82-01 must not use GKOS-Engine output as the oracle for the Standard.

```text
candidate semantics + portable fixture
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
IMPLEMENTATION_DIVERGENCE / SPEC_AMBIGUITY /
FIXTURE_DEFECT / ALLOWED_VARIATION
```

Until a public second implementation exists, the repository may build fixtures
and the neutral comparator, and may record same-author implementation results as
implementation evidence. Those results must not be labeled independent
interpretation evidence.

## 8. Authorized successor deliverables

The owner dispositions authorize preparation of the following, each remaining
Proposed/provisional until separately accepted:

1. Proposed R23 Layer-3 interoperability decision record;
2. versioned candidate Layer-3 semantic vocabulary and resolver contract;
3. portable positive, negative, boundary, and adversarial fixtures;
4. neutral semantic comparator;
5. migration notes for current GKX 2.0 representations;
6. `EAR-GRAPH-001..003` updates from OPEN to DRAFTING, not CLOSED;
7. an implementation-evidence template for Engine and a future public second
   implementation; and
8. a different-model-family review packet before any R23 acceptance.

## 9. Exit gate

V82-01 is complete only when:

- candidate semantics are addressable and versioned;
- positive, negative, boundary, and adversarial fixtures pass against the
  candidate rule set;
- no current implementation is treated as normative authority;
- at least two implementation result sets are available for final
  interoperability closure; and
- `EAR-GRAPH-001..003` are closed only with the controlling decision, migration
  consequences, fixtures, and exact evidence coordinates recorded.

## 10. Authority boundary

This owner disposition does not amend GKOS v0.81 or create adopted v0.82
normative text. It does not qualify a profile, activate a binding, declare an
implementation interoperable, release a product, authorize a writer/effect
surface, or create certification standing. It authorizes preparation and review
of the Proposed R23 candidate and its portable evidence artifacts.
