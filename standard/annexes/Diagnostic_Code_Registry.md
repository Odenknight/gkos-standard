# Annex — Diagnostic-code registry

**Status:** Normative development annex adopted by R16 for
GKOS-2026-08-20 v0.80

**Registry version:** 1.0.0

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

## 2. Active codes

| Code | Layer | Condition | Requirement |
| --- | --- | --- | --- |
| GKOS-GATE-L1-001 | L1 | Re-entry attempted by in-place predecessor mutation | GKOS-REENTRY-001 |
| GKOS-GATE-L3-001 | L3 | Supersession inferred without authorized declaration | GKOS-REENTRY-004 |
| GKOS-GATE-L4-001 | L4 | Mandatory hold evaluation unavailable or indeterminate | GKOS-RETENTION-003 |
| GKOS-GATE-L4-002 | L4 | Hold and erasure/disposition requirements conflict | GKOS-RETENTION-003 |
| GKOS-GATE-L4-003 | L4 | Deterministic delegation predicate is major or indeterminate | GKOS-DELEGATION-002 |
| GKOS-GATE-L4-004 | L4 | Non-deterministic checker attempts to reduce restrictiveness | GKOS-DELEGATION-003 |
| GKOS-GATE-L5-001 | L5 | Required review is overdue and delegation is frozen | GKOS-DELEGATION-006 |
| GKOS-GATE-L5-002 | L5 | Decision Record does not bind the Context Manifest used for review | GKOS-CONTEXT-005 |
| GKOS-GATE-L6-001 | L6 | Non-deterministic or malformed CBOR encoding | GKOS-CANON-001 |
| GKOS-GATE-L6-002 | L6 | Duplicate or incorrectly ordered map key | GKOS-CANON-002 |
| GKOS-GATE-L6-003 | L6 | Prohibited numeric value or schema-type encoding | GKOS-CANON-003 |
| GKOS-GATE-L6-004 | L6 | Invalid canonical timestamp | GKOS-CANON-004 |
| GKOS-GATE-L6-005 | L6 | Invalid UTF-8 or non-NFC canonical text | GKOS-CANON-005 |
| GKOS-GATE-L6-006 | L6 | Absent, null, or empty values were conflated | GKOS-CANON-006 |
| GKOS-GATE-L6-007 | L6 | Digest-bound reference or artifact hash mismatch | GKOS-CANON-007 |
| GKOS-GATE-L6-008 | L6 | Human rendering fails completeness or round trip | GKOS-CANON-008 |
| GKOS-GATE-L6-009 | L6 | Required contradiction, warning, restriction, or lineage closure omitted | GKOS-CONTEXT-004 |
| GKOS-GATE-L7-001 | L7 | Authority basis absent, expired, not yet valid, revoked, or indeterminate | GKOS-AUTHUSE-003 |
| GKOS-GATE-L7-002 | L7 | Actor or delegation scope does not contain the requested effect | GKOS-EFFECT-002 |
| GKOS-GATE-L7-003 | L7 | Required effect-scope dimension is unknown, indeterminate, or incomparable | GKOS-EFFECT-003 |
| GKOS-GATE-L7-004 | L7 | Context Manifest is stale or does not match authorization | GKOS-AUTHUSE-002 |
| GKOS-GATE-L7-005 | L7 | Required receipt binding failed | GKOS-RECEIPT-003 |
| GKOS-GATE-L7-006 | L7 | Required recovery route absent | GKOS-AUTHUSE-006 |

## 3. Retirement ledger

No codes are retired in registry version 1.0.0. A future retirement entry must
record the date, decision, replacement code if any, and affected fixture
mapping. The retired code remains reserved permanently.
