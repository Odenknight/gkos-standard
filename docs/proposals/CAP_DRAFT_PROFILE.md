# CAP-DRAFT-0.1: computation evidence application profile

Status: **proposed; provisional, informative, non-normative, non-qualifying**.
Date: 2026-10-12. Baseline: `446b2d4526c09150bed0d7d699b010850b2dd68d`
(v0.83 development line). No adoption or independent approval is asserted.

## Requested decision and scope

Review a bounded experiment and its evidence. Preserve the seven-layer architecture,
existing authority semantics, active schemas and conformance catalog. Promotion needs
a later recorded decision supported by implementation evidence.

GKOS already accommodates computational checking. The improvement is a common evidence
contract and testable relationship rules. Deployment-specific checks remain a valid
alternative; this profile is useful if independent systems can exchange and evaluate
the same evidence. Do not mandate attestation for every calculation or standardize
an execution service, programming language, professional rule or human review policy.

## Incorporation

| Role | Proposed evidence | Existing responsibility |
| --- | --- | --- |
| Definition | Versioned method/dependencies, parameter constraints, input requirements, output units/representation/rounding, required checks and applicability | L2 identity, L3 lineage, L5 approval |
| Execution | Unique run, executor, status, actual method/parameters/input/environment bindings, authoritative output and authenticated evidence source | L1 preservation, L3 relationships |
| Attestation | Bound definition/run/result/presentation, checker and dependency identities, coverage, outcomes and reasons | L4 Diagnostic/Control Receipt role |
| Use | Exact evidence in context; approval/policy; recipient/purpose/time; current authority/effect scope; refusal and recovery | Existing L5–L7 contracts |

The initial executable schemas implement an integer aggregate dialect. Generalizing
parameters/results is deferred until their canonical encoding and behavior have fixtures.
The namespaced GKX type uses the existing open `type` string; the definition composes
frontmatter using `allOf`. A record type is not a layer. Separate files are optional
when an existing artifact preserves all necessary role properties.

### Approval and version changes

Create an immutable definition first; review a proposal referencing it; bind that
proposal and definition as Decision Record evidence. Execution/use references definition
and approval. Do not create a circular digest: a definition must not contain the hash
of the decision that itself hashes that complete definition.

Actors can author and propose future method versions through existing governance.
An invocation cannot silently change its approved version. The original blanket ban
on actors ever editing methods was too broad. Method approval is distinct from both
per-run checking and current permission to use a result.

### Checks and aggregation

The executable dialect requires, in order: `executor_identity`, `execution_binding`,
`evidence_integrity`, `method_match`, `parameter_bounds`, `input_binding`,
`environment_match`, `result_fidelity`. Missing, duplicate, unknown or reordered
identities cannot support PASS. Hashes are recomputed over retrieved bytes. Input and
parameter bytes must match the captured request authorized by use policy.

Any FAIL yields FAIL. All required checks PASS yields PASS. All UNEVALUATED yields
UNEVALUATED. Otherwise an incomplete assessment is PARTIAL. Every non-pass has reasons.
Schema constraints establish local consistency; runtime establishes full coverage,
aggregation and cross-record bindings. Schema validity alone never grants use.
`executor_id` on the attestation names the expected executor; retrieved receipt bytes
identify the actual executor, including when that identity mismatches.

### Fidelity, reproducibility and eligibility

Result fidelity matches the reported value to its own authoritative execution under
approved rounding/formatting/conversion rules. The pilot uses exact safe integers in
USD cents with no rounding. Downstream renderers must preserve the binding; arbitrary
LLM prose, PDFs, browser rendering and real outbound actions are not tested here.

Rerun agreement is separate. Reuse SRTP `rerun-comparison`; do not duplicate it as a
loose fidelity tolerance. The scalar demo uses
`abs(a-b) <= absolute + relative * max(abs(a),abs(b))` with predetermined units/bounds.
Waveforms and stochastic simulations require their own approved protocols. Tolerances
cannot be loosened after a discrepancy or used to excuse misreported source values.

Eligibility is evaluated at use time. Superseding a method or withdrawing permission
leaves historical execution evidence intact. This pilot refuses every non-PASS. A
future exception must name the incomplete checks allowed for a separately permitted
use; it cannot rewrite PARTIAL as PASS or override mandatory integrity requirements.

### Canonicalization

Canonical records carry the GKX-CBOR-1 envelope, canonical timestamps and explicit
numeric types. The pilot uses the existing encoder and typed verifier. Definition
references hash canonical artifacts; method/input/receipt/output references hash exact
received bytes. Raw JSON receipt digests are never labeled GKX-CBOR-1.

Arrays preserve declared order: evaluation sequence, input declarations and first-seen
reasons. They are not unordered sets. Future set fields must declare canonical ordering.
Unknown artifact/version pairs are refused. Checker evidence binds source plus a digest
inventory of helper sources, profile/root schemas and dependency lockfile. Installed
packages and executor/runtime integrity still require independent verification.

### Integration and remaining work

Context Manifest evidence members can bind results and attestations. L6 includes
required restrictions as governed members, not merely display labels. L7 evaluates the
exact context and current authority/policy. This experiment needs no new top-level L7
field. Report a concrete binding gap before proposing an active-schema amendment.

Production work still needed: authenticated executor adapters; precise database/input
snapshot semantics; dependency resolution; real authority/revocation; deployment-owned
sensitivity handling; final output binding; durable action/receipt transactions and
retention. Sensitivity labels alone define neither ordering nor local-only routing.
Preserve failures and corrections; reintroduced output enters L1 without inheriting
its predecessor's authorization or layer standing.

## Compatibility, security and adoption

This is additive, informative work. It registers no core requirements, gate codes,
authority types, active profiles or release version. `CAP-*` labels/reasons are local
fixture vocabulary. Existing data requires no migration. Exploratory attachments are
not an established compatibility API.

The benefit is rejection of unbound assertions and altered results within a declared
trust model. Wrong source data, professional assumptions and compromised executors
remain possible. All test data are synthetic/public. No external domain service is
queried or invoked by the fixture executor.

Stages: review and run fixtures; integrate a read-only shadow adapter; execute domain
negative cases; demonstrate exchange with another implementation/assessor; decide
whether to promote an exact version. Preserve provisional status until that decision.
Rollback removes/disables the optional profile while retaining historical evidence;
never reinterpret old records under changed rules without explicit versioning.

## Decision traceability

| Decision | Supporting source |
| --- | --- |
| Existing layers and receipt roles suffice | [Layer mapping](../../standard/annexes/Layer_Artifact_Mapping.md) |
| Type extension needs no base enum change | [GKX frontmatter](../../schemas/gkx-frontmatter-2.0.schema.json) |
| Separate, exact approval evidence | [Canonical Decision Record](../../schemas/decision-record.canonical-1.0.0.schema.json) |
| Canonical metadata, hashes, timestamps and numbers | [Canonical Serialization](../../standard/annexes/Canonical_Serialization.md), sections 2–8 and 11 |
| Evidence integration | [Context Manifest 1.1.0](../../schemas/context-manifest-1.1.0.schema.json) |
| Reuse scientific execution and comparisons | [Execution manifest](../../schemas/provisional/science/execution-manifest.draft.schema.json), [rerun comparison](../../schemas/provisional/science/rerun-comparison.draft.schema.json) |
| Policy ownership, re-entry and historical standing | [State-change/re-entry annex](../../standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md) |
| Promotion requires later evidence/decision | [Provisional policy](../../schemas/provisional/README.md) |

See [five-domain examples](../../schemas/provisional/attestation/DOMAINS.md) and
[test parameters](../../schemas/provisional/attestation/TESTING.md). These are proposals
and synthetic tests, not deployment-readiness or independent-review evidence.
