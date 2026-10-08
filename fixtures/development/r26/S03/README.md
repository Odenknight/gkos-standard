# R26-S03 fixtures — received-bytes digest definitions

**Status:** Development fixtures proposed under R26 (Status: Proposed) for the
v0.83 development line. Non-qualifying. They support no conformance claim.

**Requirement IDs:** GKOS-CANON-007 (digest-bound references), through
R26-A06.

**Subject:** the definitions R26-S03 adds to `schemas/gkx-common.defs.json`:
`receivedBytesDigest`, `artifactDigest` (either digest form) and
`artifactReferenceAnyDigest` (an artifact reference whose `digest` is either
form). The existing `artifactReference` definition is unchanged, so schemas at
version 1.0.0 that use it do not widen. New schema versions reference
`artifactReferenceAnyDigest`.

Each file carries `schema_ref` (the definition under test), `instance`, and
`expected.result` (`valid` or `invalid`). Validate with Ajv 2020 as the runner
does (`strict: false`, `date-time` format enabled).

| Fixture | Definition | Expected | Reason |
| --- | --- | --- | --- |
| `R26-S03-P-RBD-001` | `receivedBytesDigest` | valid | Well-formed received-bytes digest. |
| `R26-S03-N-RBD-002` | `receivedBytesDigest` | invalid | Carries the `GKX-CBOR-1` label, which R26-A06 forbids on a received-bytes digest. |
| `R26-S03-N-RBD-003` | `receivedBytesDigest` | invalid | Uppercase hexadecimal value. |
| `R26-S03-N-RBD-004` | `artifactDigest` | invalid | Carries both the canonical label and the received-bytes basis; matches neither form. |
| `R26-S03-P-REF-005` | `artifactReferenceAnyDigest` | valid | Reference with a `GKX-CBOR-1` digest. |
| `R26-S03-P-REF-006` | `artifactReferenceAnyDigest` | valid | Reference with a received-bytes digest. |
| `R26-S03-N-REF-007` | `artifactReference` | invalid | Regression guard: the existing definition still rejects a received-bytes digest. |

**Before and after.** At base commit `e1aa08a` the three new definitions do not
exist, so fixtures 001–006 cannot be evaluated (`NOT_DEFINED`). On this branch
every fixture gives its expected result. Fixture 007 gives `invalid` before and
after, as intended.
