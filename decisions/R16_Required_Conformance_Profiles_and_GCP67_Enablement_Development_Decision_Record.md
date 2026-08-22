# R16 — Required conformance profiles and GCP-6/GCP-7 enablement

**Date:** 2026-08-20

**Status:** Accepted development decision; v0.x non-consensus authority

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor

**Publication target:** GKOS-2026-08-20 v0.80

**Base:** GKOS-2026-08-16 v0.79 plus the post-release public-orientation
commits through a2a2a6ca5c4dac32c6d9dc985ed7460f5f4350c6

## 1. Decision basis

The fixture-coverage and conformance-evidence tracks were blocked because no
required adoption tier, version carry-forward policy, gate-fixture rule, or
GCP-6/GCP-7 replay contract had been adopted.

The owner ratified nine profile decisions on 2026-08-21 and approved the
canonical-serialization clarifications as one breaking pre-v1.0 release. The
publication date and release identity are owner-selected as
GKOS-2026-08-20 v0.80.

This record accepts the policy decisions. Normative effect begins when the
implementing amendments are merged and published in v0.80. A commit records
and publishes the authority; it does not manufacture the authority.

## 2. Adopted rulings

### R16-117 — Core and Advanced tiers

The cumulative GCP-1 through GCP-7 profiles remain individually assessable.

- **GKOS Core** requires GCP-1 through GCP-5.
- **GKOS Advanced** requires GCP-1 through GCP-7.
- GCP-1 through GCP-4 results MAY be reported precisely but MUST NOT be
  represented as full GKOS Core conformance.
- A higher profile inherits every applicable lower-profile requirement.

This choice intentionally places authorized human or governed workflow
disposition inside the minimum general GKOS Core claim.

### R16-118 — GCP-6/GCP-7 binding and Context-Only Extension

An Advanced claim binds GCP-6 and GCP-7 together.

A named **GCP-6 Context-Only Extension** is permitted when:

1. the claimant satisfies GKOS Core on the same release and fixture baseline;
2. the declared scope is read-only context compilation, presentation,
   reproduction, audit, or handoff;
3. no consequential action is performed or authorized under the extension;
4. every manifest states that it is not an Authorized Use Record and grants no
   action authority; and
5. the claim identifies the extension, limitations, exact release, fixtures,
   and evidence.

If the context is used to govern a consequential action, GCP-7 becomes
applicable and the Context-Only Extension cannot support that use.

### R16-119 — Behavior-based fixture coverage

Profile completeness is defined by required behaviors, not a predetermined
case count. Every applicable required behavior must have executable evidence.
Case counts remain reportable but do not substitute for behavior coverage.

### R16-120 — Gate and refusal fixtures

Every normative condition that requires blocking, refusal, fail-closed
handling, rollback/compensation before commit, or authority freeze requires at
least one executable violation case.

Where practical, a gate fixture pair differs by one causally relevant
condition. Each violation case has only one conforming result: the required
block or freeze plus the registered gate code and Refusal Receipt role.

Epistemic quality comparisons remain outside conformance. GKOS tests whether a
declared gate operated, not whether an answer was the best possible answer.

### R16-121 — Diagnostic-code registry

GKOS establishes a versioned standard gate-code registry.

- Codes are stable, never reused, and retired rather than deleted.
- Every code maps to a permanent GKOS requirement ID.
- Codes are grouped by governing layer.
- Standard gate codes identify the normative reason for closure.
- Implementation-specific GKX diagnostics MAY provide more detail but MUST NOT
  define, replace, or weaken the governing requirement.

The registry begins in
standard/annexes/Diagnostic_Code_Registry.md.

### R16-122 — Assessment vocabulary

The canonical assessment vocabulary remains:

- self-attested; and
- independently verified.

Every claim identifies the assessment type. An independently verified claim
also identifies the assessor, scope, methods, independence basis, tested
version, fixtures, evidence, exceptions, and date.

The current GKOS ecosystem evidence remains self-attested unless an exact claim
states otherwise.

### R16-123 — Capability scope and non-excludable gates

A claimant MAY narrow its declared implementation or deployment scope and MAY
omit behavior expressly defined as optional or conditionally inapplicable.

An applicable required capability cannot be waived while retaining the profile
claim. A mandatory gate can never be excluded. Exclusions and inapplicability
determinations must be named, justified, and mapped to permanent requirement
IDs. Scope narrowing MUST NOT be used to evade behavior the implementation
performs or exposes.

### R16-124 — Viewer/Projection independence

The Viewer/Projection Profile is an independent claim, not a required pipeline
tier. A headless conforming system need not implement a display.

A Viewer/Projection claim proves that the projection exposes provenance,
epistemic state, incompleteness, contradictions, warnings, restrictions, and
claim limitations without concealment or silent authority gain.

### R16-125 — Exact release binding and post-v1.0 policy

Every claim binds to an exact dated GKOS release, GKX version, profile,
implementation version or immutable commit, fixture suite, evidence,
exceptions, and assessment type.

Claims against v0.79 and earlier do not carry forward to v0.80. Re-execution is
required because v0.80 adds and tightens mandatory gates.

Beginning with v1.0.0, the intended release policy is:

| Change | Permitted effect | Claim treatment |
| --- | --- | --- |
| Patch | Editorial clarification only; no requirement, behavior, or gate change | A later-release applicability statement MAY derive from the exact original claim and MUST preserve its source evidence |
| Minor | Optional capabilities only; no change to the claimed profile requirement set | Applicability MAY carry only at the unchanged claimed level and MUST be recorded as derived |
| Major | Adds, removes, or tightens applicable mandatory behavior or gates | No carry-forward; reassessment required |

The original claim is never silently relabeled or rewritten. All pre-v1.0
releases remain exact-bound with no automatic carry-forward guarantee.

## 3. Layer semantics and bindings

Layer 5 records authorized, append-only dispositions and their conditions,
standing, actor roles, separation of duties, expiry, and supersession.

Layer 6 captures the exact purpose-bound context presented for a governed
decision or governed use. Selection may originate non-deterministically but is
captured. Assembly is deterministic and replayable.

When a Context Manifest supports a Layer-5 disposition, its stable
identity/version and canonical artifact hash are bound by the Decision Record.

Layer 7 records the final authorization and consequential action. It binds the
manifest identity and hash, proposing actor, reviewer or decision-maker,
authorizing actor, executing actor or service, delegation chain, purpose,
effect scope, result, and recovery route.

An authorized-use result that returns to the corpus enters at Layer 1 without
inherited standing under R15.

## 4. Canonical serialization

R16 adopts the normative
standard/annexes/Canonical_Serialization.md for GKX-CBOR-1.

The profile uses RFC 8949 §4.2.1 core deterministic CBOR with additional GKX
rules for schema types, Unicode 17.0.0 NFC validation, fixed microsecond UTC
timestamps, SHA-256 artifact hashes, digest-bound policy/compiler references,
human-auditable verifier round trip, and deterministic assembly.

Canonicalization does not rewrite original Layer-1 evidence. Non-NFC canonical
text is refused unless an explicit transformation preserves the source and
lineage.

Hash-chain and per-writer sequence evidence establish per-stream order. Global
multi-writer order requires a separately declared sequencer, ledger,
consensus, or governed adjudication mechanism.

## 5. Selection and replay boundary

A selection envelope captures the complete operative output of retrieval,
ranking, traversal, or model filtering, including the eligible snapshot,
selected content hashes, scores, reasons, omissions, contradictions,
restrictions, lineage closure, actors/tools, purpose, recipient, policy, and
time.

Replay reruns deterministic assembly, not non-deterministic selection.

The required property is identical digest-bound assembly inputs producing
identical canonical bytes and artifact hash. Retrieval is attested rather than
reproduced. This limitation must remain explicit.

## 6. Actor and effect-scope separation

The following actor roles are distinct where applicable:

- proposer;
- reviewer or decision-maker;
- authorizer;
- executor or executing service; and
- every grantor/grantee in the delegation chain.

No role silently stands in for another.

“Effect scope” is the normative term. “Blast radius” is an explanatory alias.
Effect scope uses a typed comparison shared by action, standing, and delegation.
Unknown or incomparable required scope fails closed.

## 7. Refusal Receipt role

A Refusal Receipt is a semantic role, not necessarily a separate duplicate
object. An existing Control Receipt, Decision Record, or attempted-use record
may satisfy the role when it records the gate, requirement, registered code,
evaluated predicate, digest-bound inputs, captured time, actor context, and
result.

A dedicated object is required only when no existing governed record can
satisfy the role.

## 8. Conformance and fixture standing

GCP-6 requires canonical replay, negative-space closure, human rendering, and
round-trip evidence.

GCP-7 additionally requires exact manifest binding, distinct actors, valid
delegation and effect scope, stale-context refusal, outcome evidence, and a
recovery route.

All active profiles remain non-qualifying until the catalog declares the
applicable behavior set complete and every required executable expectation
passes. Publication of this decision and its schemas does not establish
implementation conformance.

## 9. Release boundary

R16 and the Layer-5/6/7, canonicalization, diagnostics, schema, and claim-policy
changes ship together in GKOS-2026-08-20 v0.80.

v0.80 is a breaking pre-v1.0 release. The immutable v0.79 release, tag, and
package remain historical evidence and are not rewritten.

NAV-001 remains informative and non-qualifying. NAV-002 remains eligible for
drafting against the Layer-6 phase split but is not made qualifying by R16.

Branch cleanup and other repository housekeeping are operational work and are
not normative content of R16.

## 10. Preserved claim boundary

This is an owner-authorized developmental v0.x decision. It is not consensus
ratification, independent certification, accreditation, regulatory approval,
legal advice, proof of implementation conformance, or evidence that the v1.0
gates have been met.
