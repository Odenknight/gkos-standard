# Annex — Diagnostic-code registry

**Status:** Normative development annex adopted by R16 and extended by R18 for
the GKOS v0.81 development line. R26 (proposed) extends it on the v0.83
development line.

<!-- R26-A10 (proposed; v0.83 development line) -->
**Registry version:** 1.2.0-development

## 1. Rules

A registered gate code identifies why a normative gate closed. Codes are
stable, never reused, and retired rather than deleted. Each code maps to at
least one permanent requirement ID.

Registered codes do not replace permanent requirements. An implementation MAY
emit additional GKX diagnostics, but its conformance adapter must map the
observed result to the registered code and requirement without changing the
normative meaning.

A required refusal or freeze without its registered code is not a passing gate
result.

<!-- R26-A09 (proposed; v0.83 development line) -->
When one detected condition matches more than one registered code, the
implementation MUST emit the code whose condition names the defect most
specifically. GKOS-GATE-L6-001 applies to an encoding defect that no other
L6 code names. A duplicate or out-of-order map key is GKOS-GATE-L6-002 even
when it is detected by re-encoding comparison.

<!-- R26-A09 (proposed; v0.83 development line) -->
When an evaluation detects several independent conditions, the record
satisfying the Refusal Receipt role MUST report at least one detected code
and SHOULD report every detected code. A fixture MAY list several
acceptable codes.

<!-- R26-A10 (proposed; v0.83 development line) -->
Each listed requirement receives one registered gate code at the layer
where its violation is detected. The conditions are: rewriting a
historical note identity (L2); selecting a lineage successor by timestamp,
UUID, lexical order or tiebreak (L3); substituting an undeclared policy or
predicate (L4); deletion or disposition committed without the hold
predicate, or without its bound result (L4); re-entered source inheriting
predecessor standing (L1); re-entry mutating or destroying the predecessor
(L1); delegation broader or longer-lived than its source (L4); delegation
used as general write authority (L4); live retrieval, model call,
navigation, randomness, wall-clock read or mutable lookup during
deterministic assembly (L6); Authorized Use Record missing the manifest
binding (L7).

<!-- R26-A10 (proposed; v0.83 development line) -->
The listed requirements are GKOS-IDENTITY-003, GKOS-LINEAGE-003,
GKOS-POLICY-001, GKOS-RETENTION-001, GKOS-RETENTION-002, GKOS-REENTRY-002,
GKOS-REENTRY-003, GKOS-DELEGATION-001, GKOS-DELEGATION-005,
GKOS-CONTEXT-002 and GKOS-AUTHUSE-001. Section 2 gives the allocated codes.

## 2. Active codes

<!-- R26-A10 (proposed; v0.83 development line) -->
Rows GKOS-GATE-L1-002, L1-003, L2-001, L3-002, L4-005 through L4-008, L6-010
and L7-008 are allocated under R26-A10 Option A. They take the next free
number in each layer.

<!-- R26-A15 (proposed; v0.83 development line); owner answer 2026-10-07, R26 section 7.2 -->
Row GKOS-GATE-L4-009 is allocated for R26-A15 under the owner answer of
2026-10-07 (second round). It takes the next free L4 number. It identifies a
refusal: the hold predicate returned `hold`, so the deletion or disposition
did not commit. It is distinct from GKOS-GATE-L4-006, which identifies a
deletion or disposition committed without the hold predicate or without its
bound result.

| Code | Layer | Condition | Requirement |
| --- | --- | --- | --- |
| GKOS-GATE-L1-001 | L1 | Re-entry attempted by in-place predecessor mutation | GKOS-REENTRY-001 |
| GKOS-GATE-L1-002 | L1 | Re-entered source inherits predecessor standing | GKOS-REENTRY-002 |
| GKOS-GATE-L1-003 | L1 | Re-entry mutates or destroys the predecessor | GKOS-REENTRY-003 |
| GKOS-GATE-L2-001 | L2 | Historical note identity rewritten | GKOS-IDENTITY-003 |
| GKOS-GATE-L3-001 | L3 | Supersession inferred without authorized declaration | GKOS-REENTRY-004 |
| GKOS-GATE-L3-002 | L3 | Lineage successor selected by timestamp, UUID, lexical order, or tiebreak | GKOS-LINEAGE-003 |
| GKOS-GATE-L4-001 | L4 | Mandatory hold evaluation unavailable or indeterminate | GKOS-RETENTION-003 |
| GKOS-GATE-L4-002 | L4 | Hold and erasure/disposition requirements conflict | GKOS-RETENTION-003 |
| GKOS-GATE-L4-003 | L4 | Deterministic delegation predicate is major or indeterminate | GKOS-DELEGATION-002 |
| GKOS-GATE-L4-004 | L4 | Non-deterministic checker attempts to reduce restrictiveness | GKOS-DELEGATION-003 |
| GKOS-GATE-L4-005 | L4 | Undeclared policy or predicate substituted | GKOS-POLICY-001 |
| GKOS-GATE-L4-006 | L4 | Deletion or disposition committed without the hold predicate, or without its bound result | GKOS-RETENTION-001; GKOS-RETENTION-002 |
| GKOS-GATE-L4-007 | L4 | Delegation broader or longer-lived than its source | GKOS-DELEGATION-001 |
| GKOS-GATE-L4-008 | L4 | Delegation used as general write authority | GKOS-DELEGATION-005 |
| GKOS-GATE-L4-009 | L4 | Deletion or disposition refused: active hold | GKOS-RETENTION-001 |
| GKOS-GATE-L5-001 | L5 | Required review is overdue and delegation is frozen | GKOS-DELEGATION-006 |
| GKOS-GATE-L5-002 | L5 | Decision Record does not bind the Context Manifest used for review | GKOS-CONTEXT-005 |
| GKOS-GATE-L5-003 | L5 | Governed proposal bypasses its required review lifecycle | GKOS-REVIEW-001 |
| GKOS-GATE-L5-004 | L5 | Decision Record is absent, mutable, unauthorized, or not bound to the reviewed evidence | GKOS-REVIEW-002 |
| GKOS-GATE-L5-005 | L5 | Review independence, role separation, agent constraints, or mandatory human escalation is violated | GKOS-REVIEW-003; GKOS-AUTHUSE-004 |
| GKOS-GATE-L5-006 | L5 | Review disposition history is deleted, rewritten, or made untraceable | GKOS-REVIEW-004 |
| GKOS-GATE-L6-001 | L6 | Non-deterministic or malformed CBOR encoding | GKOS-CANON-001 |
| GKOS-GATE-L6-002 | L6 | Duplicate or incorrectly ordered map key | GKOS-CANON-002 |
| GKOS-GATE-L6-003 | L6 | Prohibited numeric value or schema-type encoding | GKOS-CANON-003 |
| GKOS-GATE-L6-004 | L6 | Invalid canonical timestamp | GKOS-CANON-004 |
| GKOS-GATE-L6-005 | L6 | Invalid UTF-8 or non-NFC canonical text | GKOS-CANON-005 |
| GKOS-GATE-L6-006 | L6 | Absent, null, or empty values were conflated | GKOS-CANON-006 |
| GKOS-GATE-L6-007 | L6 | Digest-bound reference or artifact hash mismatch | GKOS-CANON-007 |
| GKOS-GATE-L6-008 | L6 | Human rendering fails completeness or round trip | GKOS-CANON-008 |
| GKOS-GATE-L6-009 | L6 | Required contradiction, warning, restriction, or lineage closure omitted | GKOS-CONTEXT-004 |
| GKOS-GATE-L6-010 | L6 | Live retrieval, model call, navigation, randomness, wall-clock read, or mutable lookup during deterministic assembly | GKOS-CONTEXT-002 |
| GKOS-GATE-L7-001 | L7 | Authority basis absent, expired, not yet valid, revoked, or indeterminate | GKOS-AUTHUSE-003; GKOS-AUTHUSE-007 |
| GKOS-GATE-L7-002 | L7 | Actor or delegation scope does not contain the requested effect | GKOS-EFFECT-002 |
| GKOS-GATE-L7-003 | L7 | Required effect-scope dimension is unknown, indeterminate, or incomparable | GKOS-EFFECT-003 |
| GKOS-GATE-L7-004 | L7 | Context Manifest is stale or does not match authorization | GKOS-AUTHUSE-002 |
| GKOS-GATE-L7-005 | L7 | Required receipt binding failed | GKOS-RECEIPT-003 |
| GKOS-GATE-L7-006 | L7 | Required recovery route absent | GKOS-AUTHUSE-006 |
| GKOS-GATE-L7-007 | L7 | Protected information is disclosed without sufficient authorization or influences an unauthorized surface | GKOS-DISCLOSURE-001 |
| GKOS-GATE-L7-008 | L7 | Authorized Use Record missing the manifest binding | GKOS-AUTHUSE-001 |

## 3. Retirement ledger

No codes are retired in registry version 1.0.0. A future retirement entry must
record the date, decision, replacement code if any, and affected fixture
mapping. The retired code remains reserved permanently.

## 4. R17 consolidation

R17 retains `GKOS-GATE-L7-001` and additionally maps its exact half-open
authority-window boundary to `GKOS-AUTHUSE-007`. The mapping is consolidated
in registry candidate `1.1.0-development` for v0.81. The historical overlay is
retained as provenance and is no longer an active merge input.
