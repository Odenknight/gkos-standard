# GKOS requirement registry

**Authority:** owner-accepted permanent allocations, 2026-08-05 and 2026-08-15  
**Controlling decisions:** `decisions/R13_Conformance_Honesty_and_Alignment_Development_Decision_Record.md`; `decisions/R15_Governed_State_Change_Reentry_and_Bounded_Delegation_Development_Decision_Record.md`  
**Current release baseline:** GKOS-2026-08-16 v0.79; R15 allocations are published under the owner-authorized, non-consensus v0.x development model.

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

## Append-only status and replacement ledger

| Date | Affected IDs | Event | Source | Replacement mapping |
| --- | --- | --- | --- | --- |
| 2026-08-05 | `GKOS-CONFORMANCE-001..003`, `GKOS-IDENTITY-001..004`, `GKOS-LINEAGE-001..003` | Initial permanent allocation; all ten IDs active in GKOS v0.77. | Owner acceptance; R13-097, R13-098, R13-101 | None |
| 2026-08-05 | All ten pre-R15 active IDs | Release status advanced from accepted unpublished target to authorized developmental publication. | Owner release authorization | None |
| 2026-08-15 | `GKOS-RECEIPT-001..003`, `GKOS-POLICY-001`, `GKOS-RETENTION-001..003`, `GKOS-REENTRY-001..004`, `GKOS-DELEGATION-001..006` | Seventeen permanent IDs allocated on the v0.79 development line. | R15-103..R15-116; owner Q&A disposition | None |
| 2026-08-16 | All seventeen R15 allocations | Release status advanced from accepted development target to authorized developmental publication in GKOS v0.79. | Owner publication instruction; R15 release route | None |

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

The registry still does not settle canonical edge direction, duplicate handling, cycle treatment, resolver precedence, derived `HEAD`, temporal fallback order, inverse-relationship vocabulary, or serialization determinism unless separately adopted. R15 standardizes explicit supersession authority semantics without settling those serialization questions.
