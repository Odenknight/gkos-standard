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

Implementation behavior is evidence, not authority for the Standard.

## 2. Existing controlling material

The current repository already establishes that Layer 3 uses assertion and
lineage records with typed relationships, provenance, scope, actor, and temporal
validity; governed identity is distinct from paths or projection-store IDs;
contradiction, correction, supersession, rejection, withdrawal, deletion, and
governed erasure are distinct; R15 preserves explicit supersession/history; and
R21 tracks `EAR-GRAPH-001..003` as open interoperability ambiguities.

## 3. Owner dispositions — 2026-09-04

The owner adopted the advisory preparation recommendations exactly as follows;
this wording does not imply a formal committee or consensus body.

| Question | Disposition | Controlling preparation rule |
| --- | --- | --- |
| Q1 Relationship vocabulary | **B** | Vocabulary is open; portable semantics exist only for a Standard-defined core or explicit namespaced extension contract. |
| Q2 Inverse representation | **A** | Store the canonical assertion once; a declared inverse is a deterministic projection unless separately evidenced. |
| Q3 Duplicate semantics | **B** | Assertions remain distinct when actor, evidence, scope, time, provenance, or identity differs; only exact replay by identity and canonical content may be idempotent. |
| Q4 Resolver ambiguity | **B** | Deterministic precedence applies only among unambiguous identity-bearing references; ambiguous locators remain unresolved and fail closed where required. |
| Q5 Cycles | **B** | Cycles are generally permitted; relation types whose semantics require acyclicity prohibit them, including the proposed core supersession relation. |
| Q6 Active heads | **B** | Governed branches are permitted; a single active head requires an exact relation/profile/policy rule and prohibited ordering keys never confer authority. |

The owner later accepted `R23-REV-001..015` with narrowing and adopted `D1A`,
`D2A`, `D3A`:

- **D1A:** `gkos_uid` is identity-bearing; URI is identity-bearing only under an
  applicable release/extension identity contract; otherwise URI is a locator.
- **D2A:** portable relation properties belong to a relation-type registry, not
  independently to each assertion record.
- **D3A:** `gkos` is reserved for the provisional R23 core namespace only; this
  does not settle a future stable URI namespace strategy.

## 4. Candidate semantics

### V82-L3-A — direction, vocabulary, and inverse semantics

The candidate must preserve one canonical asserted direction, support an open
namespaced extension vocabulary, reserve the provisional `gkos` core, keep
relation properties in a type-level registry, and ensure derived inverse
projections never gain independent evidentiary standing.

### V82-L3-B — identity, duplicates, cycles, branches, unresolved targets

The candidate must preserve assertion identity independent of SPO similarity,
diagnose record-ID collisions, preserve independent evidence, permit cycles only
where relation semantics allow them, prohibit supersession cycles, preserve
branches, and retain unresolved targets rather than silently dropping them.

### V82-L3-C — resolver fidelity

The candidate must distinguish identity-bearing forms from locators under D1A,
carry resolution state per reference, treat ambiguity as unresolved with
multiple candidates, preserve UID identity across rename/move, and prohibit live
external retrieval during deterministic evaluation merely to force resolution.

## 5. Cross-cutting semantics that must be tested

Tests must preserve actor/provenance, exact evidence anchors, epistemic state,
validity time, assertion identity, contradiction/correction/supersession and
other lifecycle distinctions, branch structure, source revision identity,
unknown extensions, resolution state, and projection rebuild equivalence.

## 6. Portable fixture tranche

The corrected tranche includes the original 18 families plus adversarial and
migration cases required by the different-model-family review:

1. canonical directed relation;
2. declared inverse round-trip;
3. unknown relation extension;
4. duplicate evidence from distinct actors;
5. exact record replay;
6. valid symmetric extension relation;
7. valid domain cycle;
8. prohibited supersession cycle;
9. branch-preserving lineage;
10. unresolved target;
11. ambiguous path collision;
12. rename/move with stable UID;
13. unavailable external URI;
14. contradictory assertions;
15. correction preserving history;
16. supersession historical query;
17. temporal validity overlap;
18. projection rebuild equivalence;
19. same record ID with differing canonical content;
20. reserved-core namespace squat;
21. missing per-reference resolution state;
22. legacy wikilink migration as unresolved locator; and
23. derived projection attempting to gain actor/evidence standing.

Every fixture declares exact input, declared schema validity, expected portable
meaning, expected success/diagnostic class, candidate standing, requirement
references, and whether mismatch is semantic divergence or fixture-authorized
representational variation.

## 7. Differential implementation method

V82-01 must not use GKOS-Engine or another implementation as the oracle.

```text
candidate semantics + fixture authority
          │
 implementations (two or more result sets)
          │
 neutral comparator
          │
          ▼
EQUIVALENT / ALLOWED_VARIATION /
IMPLEMENTATION_DIVERGENCE /
MEANING_DIVERGENCE_REVIEW_REQUIRED /
FIXTURE_OR_IMPLEMENTATION_REVIEW_REQUIRED /
INCOMPLETE_IMPLEMENTATION_EVIDENCE
```

Allowed variation comes only from the fixture. Missing portable meaning,
duplicate result IDs, and incomplete result sets fail closed. Cause is not
assigned to the specification merely because implementations disagree.

Until a public second implementation exists, same-author result sets may show
mechanism/interoperability testing but must not be labeled independent
interpretation evidence.

## 8. Successor deliverables

The preparation branch contains or must contain:

1. Proposed R23 decision text;
2. provisional record schema and relation-type registry;
3. portable executable fixtures;
4. neutral fail-closed comparator and tests;
5. migration notes;
6. `EAR-GRAPH-001..003` at DRAFTING, not CLOSED;
7. implementation-evidence template;
8. completed different-model-family advisory review;
9. owner review-disposition record; and
10. corrected-head verification evidence before owner R23 acceptance.

## 9. Exit gate

V82-01 is complete only when candidate semantics are versioned; deterministic
fixture/schema/comparator tests pass; all accepted review corrections are
verified on one exact head; no implementation is treated as normative authority;
and at least two implementation result sets exist before final interoperability
ambiguity closure. `EAR-GRAPH-001..003` close only with controlling decision,
migration consequences, fixtures, and exact implementation evidence coordinates.

## 10. Authority boundary

This packet does not amend published GKOS v0.81, adopt R23, publish v0.82,
qualify a profile, activate a protocol binding, declare interoperability or
independence, release a product, authorize a writer/effect surface, or establish
certification standing.
