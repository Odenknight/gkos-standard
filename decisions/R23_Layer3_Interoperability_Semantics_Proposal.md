# R23 — Layer-3 interoperability semantics

**Date:** 2026-09-04

**Status:** Proposed development decision; no normative authority

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor

**Input baseline:** accepted R22 `main` at
`7d5147fd17f0d1eb42a92b1b4b63b24b812f9b2b`; owner V82-01 dispositions
`1B, 2A, 3B, 4B, 5B, 6B` recorded 2026-09-04.

**Published baseline:** GKOS-2026-09-03 v0.81 at signed tag target
`8f2a158c6d4b8cabd907d98765766d281aec1247`.

## 1. Purpose

R23 proposes portable Layer-3 semantics for relationship direction, inverse
projection, assertion identity, duplicate preservation, cycle constraints,
branching, unresolved references, and deterministic resolution. It is intended
to close the specification ambiguities tracked as `EAR-GRAPH-001..003` only
after portable fixtures, review, migration analysis, and implementation evidence
support the text.

R23 does not use GKOS-Engine or any other implementation as the normative oracle.

## 2. Proposed dispositions

### R23-001 — Open relationship vocabulary with a portable semantic core

A Layer-3 implementation MAY transport implementation- or domain-specific
relationship names outside the Standard-defined semantic core. Such extensions
MUST remain distinguishable from core relations and MUST NOT be silently mapped
to a core relation whose semantics have not been established.

Portable GKOS conformance semantics apply only to relations whose meaning and
properties are defined by the applicable GKOS release/profile or by an explicit
namespaced extension contract included in the assessed scope.

### R23-002 — Canonical direction and inverse projection

A relationship record MUST preserve one canonical asserted direction. Where a
relation declares an inverse, an implementation MAY derive the inverse for
traversal or projection without serializing a second assertion record.

A separately serialized inverse assertion is permitted only when it represents
separately attributable evidence or assertion provenance. A derived inverse
MUST NOT acquire independent evidentiary standing merely because it is rendered
as an edge in the reverse direction.

### R23-003 — Assertion identity and duplicate preservation

Assertion identity MUST NOT be collapsed solely because subject, predicate, and
object are equal. Assertions that differ materially in actor, evidence anchor,
scope, temporal validity, provenance, or governed identity remain distinct.

Exact replay of an already-identified assertion MAY be processed idempotently by
record identity. Idempotent replay MUST NOT erase or merge a separately
identified assertion from another actor, evidence source, scope, or time.

### R23-004 — Resolver fidelity and ambiguous-reference refusal

Governed identity-bearing references take precedence over locators and aliases.
A resolver MAY apply deterministic precedence among unambiguous identity-bearing
forms. It MUST NOT resolve an ambiguous basename, path, alias, or other locator
by selecting the first match when more than one governed target remains
possible.

When required resolution remains ambiguous or indeterminate, the relationship
MUST remain unresolved or the applicable operation MUST fail closed according
to the controlling profile/policy. A rename or move MUST NOT create a new target
identity when the governed UID remains unchanged.

### R23-005 — Relation-specific cycle constraints

Layer-3 graphs MAY contain cycles unless the applicable relation class declares
an acyclic or otherwise cycle-restricting semantic property.

A prohibited cycle MUST be diagnosed without deleting the underlying evidence or
assertion history. Supersession relationships are subject to their controlling
lineage constraints and MUST NOT be made valid by graph-engine traversal or
projection behavior.

### R23-006 — Branch-preserving lineage and active-head limits

GKOS Layer 3 permits governed branches. No timestamp, UUID order, lexical order,
path order, or implementation-private tiebreak may select an authoritative head
where the controlling semantics do not do so.

A single active head MAY be required only by an exact relation contract,
conformance profile, or deployment policy that explicitly supplies that rule.
Absent such a rule, parallel valid successors remain explicit branches.

## 3. Cross-cutting preservation rules

The proposed semantics are interpreted together with existing GKOS requirements
for stable identity, provenance, temporal validity, epistemic state,
contradiction visibility, correction/supersession distinction, and preserved
history.

A conforming portable representation must preserve enough information to compare
meaning across implementations without requiring identical database layout,
edge storage, traversal strategy, index representation, or graph product.

## 4. Candidate relation-property vocabulary

R23 proposes that the semantic contract permit relation metadata to declare only
properties needed for portable interpretation, such as:

- `directed`;
- `inverse_of`;
- `symmetric`;
- `antisymmetric`;
- `acyclic`;
- `branching_permitted`;
- `target_resolution_required`.

This property vocabulary is itself provisional until schema and fixture review.
It does not require every relationship type to declare every property.

## 5. Comparator principle

The neutral comparator evaluates portable meaning rather than byte-identical
implementation output. It may normalize:

- deterministic inverse projections;
- ordering differences where ordering is not semantically significant; and
- implementation-specific projection metadata explicitly outside the portable
  contract.

It must not normalize away:

- distinct assertion identities;
- actor/evidence/provenance differences;
- contradiction, correction, or supersession distinctions;
- temporal differences;
- unresolved versus resolved target state;
- branch structure; or
- prohibited-cycle diagnostics.

## 6. Evidence gate before acceptance

R23 must remain Proposed until all of the following exist at one exact review
head:

1. versioned candidate semantics and schema/contract material;
2. the V82-01 portable fixture tranche, including negative and adversarial cases;
3. executable deterministic fixture validation and semantic comparison;
4. migration notes for current GKX 2.0 representations;
5. `EAR-GRAPH-001..003` marked DRAFTING, not CLOSED;
6. an implementation-evidence template;
7. a bounded different-model-family review packet and completed review;
8. owner disposition of all blocking findings; and
9. green exact-head repository checks.

Final ambiguity closure additionally requires at least two implementation result
sets. Same-author results may demonstrate mechanism or interoperability testing
but must not be mislabeled independent interpretation evidence.

## 7. Compatibility and migration boundary

R23 is prospective. It does not rewrite v0.81 or historical graph material.
Existing implementation records that cannot express the proposed semantics must
be migrated through explicit, lineage-preserving transformation or declared as
unsupported for the relevant future profile. No migration may invent actor,
evidence, temporal, inverse, or authority facts absent from the source record.

## 8. Authority boundary

This proposal does not amend GKOS, publish v0.82, qualify any profile, declare
GKOS-Engine or another implementation interoperable, activate a protocol
binding, release a product, authorize a governed writer/effect surface, or
establish certification standing.

## 9. Supersession

R23 supersedes no accepted decision while Proposed. If accepted prospectively,
it will close or narrow only the Layer-3 ambiguities and candidate semantics
explicitly named in its final acceptance record; historical evidence remains
preserved.
