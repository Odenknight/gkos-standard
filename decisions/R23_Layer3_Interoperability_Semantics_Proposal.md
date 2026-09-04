# R23 — Layer-3 interoperability semantics

**Date:** 2026-09-04

**Acceptance date:** 2026-09-04

**Status:** Accepted development decision; prospective v0.82 development authority

**Accepted exact review head:** `57ccca0025fc587bcaac0910af3c4b2205f7746e`

**Accepted-status head:** `60fa426fb29da5ebe19e4bfb407c1c1409b48411`

**Accepted-status checks:** Conformance runner 309 PASS; Markdown lint 429 PASS; Link check 429 PASS; Release checksums 429 PASS; Release validation 429 PASS.

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor

**Input baseline:** accepted R22 `main` at
`7d5147fd17f0d1eb42a92b1b4b63b24b812f9b2b`; owner V82-01 dispositions
`1B, 2A, 3B, 4B, 5B, 6B` recorded 2026-09-04.

**Review correction authority:** owner accepted `R23-REV-001..015` with narrowing and design rulings `D1A`, `D2A`, `D3A` on 2026-09-04. The completed different-model-family review remains advisory evidence and does not itself constitute independent verification.

**Published baseline:** GKOS-2026-09-03 v0.81 at signed tag target
`8f2a158c6d4b8cabd907d98765766d281aec1247`.

## 1. Purpose

R23 establishes prospective portable Layer-3 development semantics for relationship direction, inverse
projection, assertion identity, duplicate preservation, cycle constraints,
branching, unresolved references, and deterministic resolution. Final closure of
the specification ambiguities tracked as `EAR-GRAPH-001..003` remains gated by
the separately required implementation result sets and exact evidence
coordinates.

R23 does not use GKOS-Engine or any other implementation as the normative oracle.

## 2. Accepted dispositions

### R23-001 — Open relationship vocabulary with a portable semantic core

A Layer-3 implementation MAY transport implementation- or domain-specific
relationship names outside the Standard-defined semantic core. Such extensions
MUST remain distinguishable from core relations and MUST NOT be silently mapped
to a core relation whose semantics have not been established.

For this candidate, the token `gkos` is reserved for the provisional core
namespace. Producers MUST NOT emit a `gkos` relation name that is not listed in
the applicable candidate relation registry. This reservation is a v0.82/R23
candidate mechanism only and does not settle a future stable URI namespace
strategy.

Portable GKOS semantics apply only to relations whose meaning and properties are
defined by the applicable GKOS release/profile or by an explicit namespaced
extension contract included in the assessed scope.

### R23-002 — Canonical direction and inverse projection

A relationship record MUST preserve one canonical asserted direction. Where a
relation type declares an inverse, an implementation MAY derive the inverse for
traversal or projection without serializing a second asserted relationship.

A separately serialized inverse assertion is permitted only when it represents
separately attributable evidence or assertion provenance. A derived inverse
MUST be distinguishable as `derived_projection`, MUST identify its source
assertion, and MUST NOT acquire independent actor, evidence, authority, or
receipt standing merely because it is materialized in reverse direction.

A transient cache/index/projection rebuild is not by itself a governed state
change. If derived material is committed into governed state, the applicable
governed-state-change and receipt requirements continue to apply.

### R23-003 — Assertion identity, exact replay, and collision refusal

Assertion identity MUST NOT be collapsed solely because subject, predicate, and
object are equal. Assertions that differ materially in actor, evidence anchor,
scope, temporal validity, provenance, or governed identity remain distinct.

Exact replay means the same governed record identity with identical canonical
content. Exact replay MAY be processed idempotently. A record carrying an
existing `record_id` with different canonical content MUST NOT overwrite, merge,
or silently replace the earlier record; it MUST be diagnosed, and any operation
requiring an unambiguous resolved record MUST fail closed.

R23 does not impose a new UUID shape beyond controlling GKOS identity
requirements.

### R23-004 — Resolver fidelity and ambiguous-reference refusal

`gkos_uid` is intrinsically identity-bearing. A `uri` is identity-bearing only
when the applicable GKOS release or an explicit declared extension contract
identifies that URI form as a governed identifier; otherwise it is a locator.
`alias`, `path`, `basename`, and ordinary wikilink forms are locators.

A resolver MAY apply deterministic precedence among unambiguous
identity-bearing forms. It MUST NOT resolve an ambiguous locator by selecting
the first match when more than one governed target remains possible.

Resolution state is carried per reference. `ambiguous` means unresolved with two
or more candidate governed targets. Absence of evidenced resolution MUST NOT be
interpreted as resolved. When required resolution remains ambiguous or
indeterminate, the reference remains unresolved or the applicable operation
fails closed according to the controlling profile/policy.

A rename or move MUST NOT create a new target identity when the governed UID
remains unchanged. Deterministic evaluation MUST NOT perform live external
retrieval merely to convert an unresolved locator into a resolved identity.

### R23-005 — Relation-specific cycle constraints

Layer-3 graphs MAY contain cycles unless the applicable relation type declares an
acyclic or otherwise cycle-restricting semantic property.

The provisional core relation `gkos:supersedes` is `directed: true` and
`acyclic: true`. A supersession cycle MUST be diagnosed as prohibited without
deleting the underlying evidence or assertion history.

Relation semantic properties are defined by a relation-type registry/contract,
not independently redefined by each assertion record. Conflicting properties for
the same relation identity are a contract defect, not a resolvable local choice.

### R23-006 — Branch-preserving lineage and active-head limits

GKOS Layer 3 permits governed branches. No timestamp, UUID order, lexical order,
path order, or implementation-private tiebreak may select an authoritative head.
This prohibition remains controlling even when a deployment policy requires a
single active head.

A single active head MAY be required only by an exact relation contract,
conformance profile, or deployment policy with explicit identity and version as
required by the controlling policy rules. The selecting rule and its evaluated
inputs MUST be recorded with the resulting projection or decision. Such a rule
MUST NOT use timestamp, UUID order, lexical order, or path order as authority or
succession preference. Absent a valid selecting rule, parallel valid successors
remain explicit branches.

## 3. Cross-cutting preservation rules

The accepted development semantics are interpreted together with existing GKOS requirements
for stable identity, provenance, temporal validity, epistemic state, preserved
history, and the distinct meanings of contradiction, correction, supersession,
rejection, withdrawal, deletion, and governed erasure.

A portable representation MUST preserve enough information to compare meaning
across implementations without requiring identical database layout, edge
storage, traversal strategy, index representation, or graph product.

## 4. Candidate relation-type registry

The candidate relation-type registry is
`schemas/provisional/l3/l3-relation-registry-0.1-proposed.json`.

The property vocabulary in this candidate is limited to:

- `directed`;
- `inverse_of`;
- `symmetric`;
- `antisymmetric`;
- `acyclic`;
- `branching_permitted`; and
- `target_resolution_required`.

Those properties belong to the relation type, not the individual assertion.
The initial provisional `gkos` core includes `contradicts`, `corrects`, and
`supersedes`. The registry remains provisional, non-normative, and non-qualifying
pending future Standard text and applicable implementation evidence.

## 5. Comparator principle

The neutral comparator evaluates portable meaning rather than byte-identical
implementation output. It may normalize only:

- deterministic derived projections whose derivation is declared by the
  relation contract;
- ordering differences where ordering is not semantically significant; and
- implementation-specific projection metadata explicitly outside the portable
  contract.

It MUST NOT normalize away:

- distinct assertion identities or record-identity collisions;
- actor/evidence/provenance differences;
- contradiction, correction, supersession, rejection, withdrawal, deletion, or
  governed-erasure distinctions;
- temporal differences;
- unresolved, ambiguous, and resolved target state;
- branch structure;
- prohibited-cycle diagnostics; or
- missing required portable meaning.

Allowed variation is declared by fixture authority, never by an implementation
under test. A meaning disagreement is cause-neutral until adjudicated; the
comparator MUST NOT label an implementation disagreement as a specification
ambiguity by assumption.

## 6. Acceptance evidence

R23 was accepted prospectively after the following existed at the exact accepted
review head:

1. versioned candidate semantics, record schema, and relation-type registry;
2. the V82-01 portable fixture tranche, including positive, negative, boundary,
   migration, and adversarial cases with exact input and expected portable
   meaning/classification;
3. executable deterministic schema validation, fixture validation, and semantic
   comparison with fail-closed comparator behavior;
4. migration notes for current GKX 2.0 representations;
5. `EAR-GRAPH-001..003` marked DRAFTING, not CLOSED;
6. an implementation-evidence template;
7. a bounded different-model-family review packet and completed review;
8. owner disposition of all blocking and major findings;
9. corrected-head verification mapping accepted findings to changes/tests; and
10. green exact-head repository checks.

Final ambiguity closure additionally requires at least two implementation result
sets. Same-author results may demonstrate mechanism or interoperability testing
but MUST NOT be mislabeled independent interpretation evidence.

## 7. Compatibility and migration boundary

R23 is prospective. It does not rewrite v0.81 or historical graph material.
Existing implementation records that cannot express the accepted development
semantics MUST be migrated through explicit, lineage-preserving transformation
or declared as unsupported for the relevant future profile. No migration may
invent actor, evidence, temporal, relation-property, inverse, resolution,
identity, or authority facts absent from retained source evidence.

## 8. Authority boundary

Acceptance of R23 does not amend the published GKOS v0.81 Standard, publish
v0.82, qualify any profile, close `EAR-GRAPH-001..003`, declare GKOS-Engine or
another implementation interoperable or independent, activate a protocol
binding, release a product, authorize a governed writer/effect surface, or
establish certification standing.

## 9. Supersession

R23 supersedes no accepted decision. Its prospective acceptance establishes only
the Layer-3 development semantics explicitly recorded here. Historical evidence
remains preserved, and final ambiguity closure remains separately gated by the
required implementation result sets and exact evidence coordinates.
