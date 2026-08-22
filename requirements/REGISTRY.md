# GKOS requirement registry

**Authority:** owner-accepted permanent allocations, 2026-08-05, 2026-08-15,
and 2026-08-20

**Controlling decisions:** `decisions/R13_Conformance_Honesty_and_Alignment_Development_Decision_Record.md`; `decisions/R15_Governed_State_Change_Reentry_and_Bounded_Delegation_Development_Decision_Record.md`; `decisions/R16_Required_Conformance_Profiles_and_GCP67_Enablement_Development_Decision_Record.md`

**Current release baseline:** GKOS-2026-08-20 v0.80; R16 allocations are published under the owner-authorized, non-consensus v0.x development model.

This registry is authoritative for allocated GKOS requirement identifiers. It is append-only: an allocated ID is never deleted, renumbered, or reused. Later changes add dated status/source/replacement mappings; they do not rewrite an allocation's original text. `R13-102` is never allocated and cannot be reused.

## Active allocations

| ID | Original requirement text | Status | Source | Replacement mapping |
| --- | --- | --- | --- | --- |
| `GKOS-CONFORMANCE-001` | If a required fixture expectation is not executed, the fixture outcome MUST be `UNEVALUATED`, not PASS. | Active — GKOS v0.77 | R13-097 | None |
| `GKOS-CONFORMANCE-002` | A profile claim MAY appear only for a catalog-declared complete profile whose required fixtures all PASS. Failed, partial, skipped, divergent, or unevaluated required checks block that claim; a non-qualifying run exits non-zero. | Active — GKOS v0.77 | R13-097 | None |
| `GKOS-CONFORMANCE-003` | A fixture MUST cite GKOS requirement IDs. Implementation diagnostics, output observations, and tests belong in non-normative adapter maps and MUST NOT define the requirement. | Active — GKOS v0.77 | R13-098 | None |
| `GKOS-IDENTITY-001` | A newly authored GKX 2.3 note `uid` MUST be a lowercase RFC 9562 UUIDv7. | Active — GKOS v0.77 | R13-101; owner allocation | None |
| `GKOS-IDENTITY-002` | An existing valid lowercase UUIDv4 note `uid` remains valid and permanent legacy identity. | Active — GKOS v0.77 | R13-101; owner allocation | None |
| `GKOS-IDENTITY-003` | A migration MUST NOT rewrite or substitute a historical note identity merely to adopt UUIDv7. | Active — GKOS v0.77 | R13-101; owner allocation | None |
| `GKOS-IDENTITY-004` | UUID version, timestamp, and lexical ordering confer no authority, priority, or succession preference. | Active — GKOS v0.77 | R13-101; owner allocation | None |
| `GKOS-LINEAGE-001` | Lineage processing MUST preserve every valid direct successor as an explicit branch. | Active — GKOS v0.77 | R13-101; owner allocation | None |
| `GKOS-LINEAGE-002` | Only the earliest temporally valid direct-successor time MAY set a predecessor's derived `invalid_at`; this derivation does not select an authoritative successor. | Active — GKOS v0.77 | R13-101; owner allocation | None |
| `GKOS-LINEAGE-003` | No timestamp, UUID order, lexical order, or implementation tiebreak MAY select an authoritative lineage successor. | Active — GKOS v0.77 | R13-101; owner allocation | None |
| `GKOS-RECEIPT-001` | Every committed governed state change MUST be durably bound to a record satisfying the State-Change Receipt role. | Active — GKOS v0.79 | R15-104, R15-105 | None |
| `GKOS-RECEIPT-002` | The record satisfying the State-Change Receipt role MUST identify the actor class and, where consulted, the deciding deterministic predicate identity/version and whether a non-deterministic checker increased restrictiveness. | Active — GKOS v0.79 | R15-104 | None |
| `GKOS-RECEIPT-003` | If required receipt binding cannot be completed, the governed state change MUST fail closed or be verifiably rolled back/compensated before it is represented as committed; the conformance manifest MUST declare the binding mechanism. | Active — GKOS v0.79 | R15-105 | None |
| `GKOS-POLICY-001` | A deployment-supplied policy or predicate required by GKOS MUST have explicit identity and version and MUST NOT be silently substituted by model inference, undeclared defaults, or implementation-private behavior. | Active — GKOS v0.79 | R15-103 | None |
| `GKOS-RETENTION-001` | Before deletion or disposition of an archived governed artifact is committed, the implementation MUST consult the applicable deployment-declared hold predicate. | Active — GKOS v0.79 | R15-114 | None |
| `GKOS-RETENTION-002` | The deletion/disposition record satisfying the State-Change Receipt role MUST bind the hold-predicate identity/version and result. | Active — GKOS v0.79 | R15-114 | None |
| `GKOS-RETENTION-003` | An unavailable or indeterminate mandatory hold evaluation, or a detected hold/erasure conflict, MUST fail closed and be routed for authorized human disposition; GKOS does not itself decide the applicable legal obligation. | Active — GKOS v0.79 | R15-114 | None |
| `GKOS-REENTRY-001` | Reintroduced formerly managed material MUST enter as a new Layer-1 source and MUST NOT be merged in place into its predecessor. | Active — GKOS v0.79 | R15-106 | None |
| `GKOS-REENTRY-002` | A re-entered source MUST NOT inherit predecessor layer standing, decisions, epistemic state, authority, context authorization, or authorized-use standing. | Active — GKOS v0.79 | R15-106 | None |
| `GKOS-REENTRY-003` | Re-entry itself MUST NOT mutate or destroy the predecessor; subsequent retention, erasure, or disposition is a separately governed operation. | Active — GKOS v0.79 | R15-107 | None |
| `GKOS-REENTRY-004` | Semantic supersession on re-entry MUST be explicitly declared by an authorized human or valid bounded delegation and MUST NOT be inferred by software. | Active — GKOS v0.79 | R15-108 | None |
| `GKOS-DELEGATION-001` | A supersession delegation MUST be explicit, bounded, versioned, expiring, and no broader or longer-lived than its originating authority, and MUST bind to the applicable Specialized Agent Contract or equivalent governed actor contract. | Active — GKOS v0.79 | R15-110 | None |
| `GKOS-DELEGATION-002` | A delegated supersession operation MUST be positively classified as routine by a deterministic, human-governed, versioned predicate; major or indeterminate outcomes require prior human disposition. | Active — GKOS v0.79 | R15-110 | None |
| `GKOS-DELEGATION-003` | A non-deterministic checker MAY only increase restrictiveness and MUST NOT downgrade a deterministic major or indeterminate outcome. | Active — GKOS v0.79 | R15-110 | None |
| `GKOS-DELEGATION-004` | A delegated action MUST reference its grant and predicate in the record satisfying the State-Change Receipt role and MUST enter the required human-review lifecycle. | Active — GKOS v0.79 | R15-110 | None |
| `GKOS-DELEGATION-005` | Bounded supersession delegation MUST NOT confer or imply general governed write authority. | Active — GKOS v0.79 | R15-110 | None |
| `GKOS-DELEGATION-006` | When required review of actions under a delegation becomes overdue, that delegation MUST NOT authorize additional state changes until the overdue condition is dispositioned or a higher-precedence, bounded exception is explicitly authorized, time-limited, and durably receipted. | Active — GKOS v0.79 | R15-110 | None |
| `GKOS-PROFILE-001` | A GKOS Core claim MUST satisfy all applicable GCP-1 through GCP-5 requirements on the same exact release and fixture baseline. | Active — GKOS v0.80 | R16-117 | None |
| `GKOS-PROFILE-002` | A GKOS Advanced claim MUST satisfy all applicable GCP-1 through GCP-7 requirements on the same exact release and fixture baseline. | Active — GKOS v0.80 | R16-117, R16-118 | None |
| `GKOS-PROFILE-003` | A GCP-6 Context-Only Extension MUST satisfy GKOS Core, MUST remain read-only for the claimed use, and MUST NOT authorize or perform consequential action under that claim. | Active — GKOS v0.80 | R16-118 | None |
| `GKOS-PROFILE-004` | Every claim MUST bind the exact dated GKOS release, GKX version, profile, implementation version or immutable commit, fixture suite, evidence, exceptions, and assessment type. | Active — GKOS v0.80 | R16-125 | None |
| `GKOS-PROFILE-005` | Every applicable normative block, refusal, fail-closed, rollback-before-commit, or authority-freeze behavior MUST have executable violation evidence with the required registered gate code. | Active — GKOS v0.80 | R16-119..R16-121 | None |
| `GKOS-PROFILE-006` | An applicable required capability or mandatory gate MUST NOT be excluded while retaining the affected profile claim. | Active — GKOS v0.80 | R16-123 | None |
| `GKOS-PROFILE-007` | A Viewer/Projection claim is independent of pipeline tiers and MUST expose provenance, epistemic state, incompleteness, contradictions, warnings, restrictions, and claim limitations without silent authority gain. | Active — GKOS v0.80 | R16-124 | None |
| `GKOS-CANON-001` | A canonical GKOS artifact MUST use the GKX-CBOR-1 profile and RFC 8949 §4.2.1 core deterministic encoding; indefinite-length or otherwise non-deterministic encodings MUST be refused. | Active — GKOS v0.80 | R16-125; Canonical Serialization §§2–3 | None |
| `GKOS-CANON-002` | Canonical CBOR maps MUST use bytewise lexicographic ordering of canonical encoded keys and MUST reject duplicate keys before overwrite or loss. | Active — GKOS v0.80 | Canonical Serialization §4 | None |
| `GKOS-CANON-003` | Canonical numeric values MUST preserve the schema-declared integer or float type, use shortest exact encoding, and MUST reject negative zero, NaN, and infinity. | Active — GKOS v0.80 | Canonical Serialization §5 | None |
| `GKOS-CANON-004` | Canonical timestamps MUST use valid uppercase UTC RFC 3339 text with exactly six fractional digits and MUST NOT use timestamps alone as authoritative event order. | Active — GKOS v0.80 | Canonical Serialization §6 | None |
| `GKOS-CANON-005` | Canonical text MUST be valid UTF-8 and NFC under Unicode 17.0.0; non-NFC canonical text MUST be refused unless an explicit lineage-preserving transformation produced it. | Active — GKOS v0.80 | Canonical Serialization §7 | None |
| `GKOS-CANON-006` | Canonical encoding MUST preserve the distinction among absent, null, empty, ordered-array, and schema-declared-set states. | Active — GKOS v0.80 | Canonical Serialization §4 | None |
| `GKOS-CANON-007` | Canonical artifact hashing MUST use SHA-256 over canonical payload bytes containing artifact type, schema version, canonical profile, and every applicable digest-bound policy, compiler, and selection reference. | Active — GKOS v0.80 | Canonical Serialization §§3, 8 | None |
| `GKOS-CANON-008` | A GCP-6 or GCP-7 canonical-artifact claimant MUST provide a declared human rendering and parser/verifier whose round trip reproduces the canonical hash. | Active — GKOS v0.80 | Canonical Serialization §9 | None |
| `GKOS-CONTEXT-001` | Layer-6 selection output MUST be captured as a canonical, hashed selection envelope binding purpose, recipient, actors/tools, eligible snapshot, selected content hashes, scores/reasons, omissions, closure inputs, policy, and time as applicable. | Active — GKOS v0.80 | R16-118; Canonical Serialization §10.1 | None |
| `GKOS-CONTEXT-002` | Deterministic assembly MUST consume only captured digest-bound inputs and MUST NOT perform live retrieval, model calls, navigation, random generation, wall-clock reads, unordered iteration, or mutable external lookup. | Active — GKOS v0.80 | Canonical Serialization §10.2 | None |
| `GKOS-CONTEXT-003` | Identical canonical selection envelope, resolved content, schema, policy, compiler, and canonical-profile inputs MUST produce identical canonical Context Manifest bytes and hash. | Active — GKOS v0.80 | Canonical Serialization §10.2 | None |
| `GKOS-CONTEXT-004` | A Context Manifest MUST include every contradiction, warning, restriction, omission, and lineage-closure item required by the governing rule against the pinned eligible snapshot; required omission MUST fail closed. | Active — GKOS v0.80 | Canonical Serialization §10.2 | None |
| `GKOS-CONTEXT-005` | When a Context Manifest supports a Layer-5 disposition, the Decision Record MUST bind the manifest stable identity, version, and canonical artifact hash. | Active — GKOS v0.80 | R16 §3; Canonical Serialization §11 | None |
| `GKOS-AUTHUSE-001` | An Authorized Use Record MUST bind the Context Manifest stable identity, version, digest algorithm, and canonical artifact hash plus applicable digest-bound policy and compiler references. | Active — GKOS v0.80 | Canonical Serialization §11; Authority and Refusal Fields §3 | None |
| `GKOS-AUTHUSE-002` | The Context Manifest hash used at authorization MUST equal the manifest hash used at action time; mismatch or inability to evaluate MUST fail closed. | Active — GKOS v0.80 | Canonical Serialization §11; Authority and Refusal Fields §3 | None |
| `GKOS-AUTHUSE-003` | Consequential use MUST establish that the authority basis is valid at action time; absent, expired, not-yet-valid, revoked, or indeterminate authority MUST fail closed. | Active — GKOS v0.80 | Authority and Refusal Fields §§2–3 | None |
| `GKOS-AUTHUSE-004` | Authorized use MUST distinguish proposing, reviewing/deciding, authorizing, and executing actors and MUST preserve the bounded delegation chain without silently collapsing roles. | Active — GKOS v0.80 | R16 §6; Authority and Refusal Fields §3 | None |
| `GKOS-AUTHUSE-005` | A required gate closure MUST leave a record satisfying the Refusal Receipt role with gate, requirement, code, predicate, digest-bound inputs, captured time, actor context, result, and policy evidence. | Active — GKOS v0.80 | R16 §7; Authority and Refusal Fields §4 | None |
| `GKOS-AUTHUSE-006` | An Authorized Use Record MUST bind the outcome and an applicable correction, compensation, rollback, or escalation route. | Active — GKOS v0.80 | Canonical Serialization §11; Authority and Refusal Fields §3 | None |
| `GKOS-EFFECT-001` | Consequential action and authority scope MUST use the same typed effect-scope vocabulary for resources, effect class, environment, audience, sensitivity, time, reach, reversibility, and bounds as applicable. | Active — GKOS v0.80 | R16 §6; Authority and Refusal Fields §5 | None |
| `GKOS-EFFECT-002` | Requested effect scope MUST be contained within both actor standing and every applicable delegation scope. | Active — GKOS v0.80 | Authority and Refusal Fields §5 | None |
| `GKOS-EFFECT-003` | Unknown, indeterminate, or incomparable required effect-scope dimensions MUST fail closed. | Active — GKOS v0.80 | Authority and Refusal Fields §5 | None |

## Accepted unpublished allocations

| ID | Original requirement text | Status | Source | Replacement mapping |
| --- | --- | --- | --- | --- |
| `GKOS-AUTHUSE-007` | Authority validity evaluation MUST use a captured canonical action-evaluation time and the half-open interval `valid_from <= evaluation_time < valid_until`; evaluation before `valid_from`, at or after `valid_until`, or with missing, malformed, unavailable, or indeterminate required time evidence MUST fail closed with `GKOS-GATE-L7-001` and a record satisfying the Refusal Receipt role. | Accepted — unpublished development amendment | R17-126; owner approval 2026-08-21 | None |

## Append-only status and replacement ledger

| Date | Affected IDs | Event | Source | Replacement mapping |
| --- | --- | --- | --- | --- |
| 2026-08-05 | `GKOS-CONFORMANCE-001..003`, `GKOS-IDENTITY-001..004`, `GKOS-LINEAGE-001..003` | Initial permanent allocation; all ten IDs active in GKOS v0.77. | Owner acceptance; R13-097, R13-098, R13-101 | None |
| 2026-08-05 | All ten pre-R15 active IDs | Release status advanced from accepted unpublished target to authorized developmental publication. | Owner release authorization | None |
| 2026-08-15 | `GKOS-RECEIPT-001..003`, `GKOS-POLICY-001`, `GKOS-RETENTION-001..003`, `GKOS-REENTRY-001..004`, `GKOS-DELEGATION-001..006` | Seventeen permanent IDs allocated on the v0.79 development line. | R15-103..R15-116; owner Q&A disposition | None |
| 2026-08-16 | All seventeen R15 allocations | Release status advanced from accepted development target to authorized developmental publication in GKOS v0.79. | Owner publication instruction; R15 release route | None |
| 2026-08-20 | `GKOS-PROFILE-001..007`, `GKOS-CANON-001..008`, `GKOS-CONTEXT-001..005`, `GKOS-AUTHUSE-001..006`, `GKOS-EFFECT-001..003` | Twenty-nine permanent requirements allocated and published for required tiers, deterministic CBOR, context replay, authorized use, refusal, and effect scope in GKOS v0.80. | R16 and owner publication instruction | None |
| 2026-08-21 | `GKOS-AUTHUSE-007` | Permanent requirement allocated as an unpublished development amendment defining half-open authority validity intervals and captured action-evaluation time. | R17-126; owner approval | None |

## Profile applicability for R15 allocations

| Requirement | Attachment |
| --- | --- |
| `GKOS-RECEIPT-001..003` | Cross-cutting where governed state is committed; no mutation obligation for a read-only implementation |
| `GKOS-POLICY-001` | GCP-4+ when a deployment policy/predicate participates in control |
| `GKOS-RETENTION-001..003` | GCP-4 for disposition control; GCP-7 when deletion/disposition is executed |
| `GKOS-REENTRY-001` | GCP-1 |
| `GKOS-REENTRY-002` | Cross-cutting standing invariant |
| `GKOS-REENTRY-003` | GCP-1 plus applicable retention/disposition requirements |
| `GKOS-REENTRY-004` | GCP-3; GCP-4 when delegated |
| `GKOS-DELEGATION-001..003` | GCP-4 |
| `GKOS-DELEGATION-004` | GCP-5 |
| `GKOS-DELEGATION-005` | GCP-4+ |
| `GKOS-DELEGATION-006` | GCP-5 |

## Allocation boundary

R16 settles canonical artifact serialization, duplicate map-key refusal, and
GCP-6/GCP-7 binding as stated in its annexes. The registry still does not
settle canonical graph-edge direction, cycle treatment, resolver precedence,
derived `HEAD`, temporal fallback order, or inverse-relationship vocabulary
unless separately adopted.
