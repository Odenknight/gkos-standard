# R26-A07 fixtures — schema data model to CBOR

**Status:** Development fixtures accepted under R26 (accepted in part 2026-10-07) for
the v0.83 development line. Non-qualifying. They support no conformance claim.

**Amendment:** Canonical Serialization annex §2.1 (R26-A07).

Each file carries `cbor_hex`: complete payload bytes. The control payload is a
selection envelope valid under `schemas/selection-set.schema.json` 1.0.0, with
`score_type` `float` and `score` 0.75 encoded as binary16. Each other fixture
changes one value of the control.

| Fixture | Requirement IDs | Change from control | Expected |
| --- | --- | --- | --- |
| `R26-A07-P-CONTROL-001` | GKOS-CANON-001, GKOS-CANON-003, GKOS-CANON-004 | none | accepted |
| `R26-A07-N-TAG0-002` | GKOS-CANON-001 | `selected_at` wrapped in tag 0 | refused, GKOS-GATE-L6-001 |
| `R26-A07-N-BSTR-003` | GKOS-CANON-001 | `query_or_instruction` as a byte string | refused, GKOS-GATE-L6-001 |
| `R26-A07-N-UNDEF-004` | GKOS-CANON-001 | `query_or_instruction` as `undefined` (0xf7) | refused, GKOS-GATE-L6-001 |
| `R26-A07-N-INTFLOAT-005` | GKOS-CANON-003 | `score_type` `float`, `score` 1.0 encoded as integer 1 | refused, GKOS-GATE-L6-003 |
| `R26-A07-P-INTFLOAT-006` | GKOS-CANON-003 | `score_type` `float`, `score` 1.0 encoded as binary16 `f93c00` | accepted |
| `R26-A07-N-TSNAME-007` | GKOS-CANON-004 | `authorized_scope.valid_until` (a schema timestamp whose name does not end in `_at`) without six fractional digits | refused, GKOS-GATE-L6-004 |

Fixture 006 is the positive companion of 005: the declared type governs, so
the shortest exact float form is canonical even for an integral value.

**Before (runner `verifyCanonicalBytes`, base `e1aa08a`).**

| Fixture | Runner result | Matches expected |
| --- | --- | --- |
| 001 | accepted | yes |
| 002 | error without a gate code (`unsupported canonical value`) | no |
| 003 | error without a gate code (`unsupported canonical value`) | no |
| 004 | GKOS-GATE-L6-006 | no |
| 005 | accepted | no |
| 006 | GKOS-GATE-L6-001 (re-encoding turns 1.0 into integer 1) | no |
| 007 | GKOS-GATE-L6-004 | yes; the runner's field-name rule (`_at`, `_from`, `_until`) happens to cover `valid_until` |

**After, on the packet branch.** `NOT_MODELED` in the runner, which had no schema-driven typing and
did not reject tags, byte strings or `undefined` with a gate code. Runner
change proposed to packet R3: a decoder that keeps CBOR major types; refusal of
tags, byte strings and simple values other than 20–22 with GKOS-GATE-L6-001;
timestamp and numeric typing read from the schema selected by the payload's
(`artifact_type`, `schema_version`) pair, with `score_type` governing `score`.
The packet's proposed-behaviour harness gives the expected result for all seven
fixtures. Fixture 007 does not tell the field-name rule from the schema rule,
because no current schema declares a canonical timestamp whose name lacks one of
those suffixes.

## Reference runner after integration

Integration branch `work/v083-r26-implementation` (worker I2). Before is the
runner on `main` `8c20b05`; after is the integrated runner. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

`verifyArtifactBytes` in `conformance/runner/canonical.mjs` decodes with CBOR
major types kept, refuses tags, byte strings and simple values other than 20,
21 and 22 with GKOS-GATE-L6-001, and reads timestamp, integer and `score_type`
typing from the schema of the declared pair. `verifyCanonicalBytes` (the
schema-less check) also refuses those items with GKOS-GATE-L6-001; it keeps its
field-name timestamp rule for existing callers.

- Before (`verifyCanonicalBytes`): 2 of 7 (001, 007).
- After (`verifyArtifactBytes`): 7 of 7.

## Reference runner wave 2 and review corrections

Worker I3 on `work/v083-r26-implementation`. Before is the runner on `main`
`8c20b05`; after is the runner at the I3 head. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

Findings r26-REV-003 and r26-REV-004.

| Fixture | Requirement IDs | Change from control | Expected |
| --- | --- | --- | --- |
| `R26-A07-P-INTFLOAT-DIGEST-008` | GKOS-CANON-003, GKOS-CANON-007 | bytes of 006 with a `GKX-CBOR-1` digest over them | accepted through `verifyArtifactBytes` and `verifyDigestBinding`, with and without a schema registry |
| `R26-A07-N-INTFLOAT-DIGEST-009` | GKOS-CANON-003, GKOS-CANON-007 | bytes of 005 with a `GKX-CBOR-1` digest over them | refused, GKOS-GATE-L6-007 (checked with the schema registry) |
| `R26-A07-N-SETORDER-010` | GKOS-CANON-001, GKOS-CANON-006 | `authorized_scope.resources`, a schema-declared set, in reverse member order | refused, GKOS-GATE-L6-001 |
| `R26-A07-P-SETORDER-011` | GKOS-CANON-001, GKOS-CANON-006 | the set in canonical order, and two `members` in non-sorted presentation order | accepted |

`verifyArtifactBytes` now checks every array whose schema declares
`x-gkx-set-order` `canonical-cbor-bytewise`: members must be in the bytewise
order of their canonical CBOR encodings, without duplicates. A set out of
order is a non-canonical encoding, GKOS-GATE-L6-001; the map keys are in
order, so GKOS-GATE-L6-002 does not apply. Arrays without the declaration,
such as `members`, keep their encoded order. `verifyDigestBinding` checks the
`GKX-CBOR-1` basis with the typed verifier (`verifyTypedCanonicalBytes`, or
`verifyArtifactBytes` when a schema registry is passed), so an integral float
stays a float.

- Before (`main`): 3 of 11. At `192385b`: 008 refused and 010 accepted.
- After: 11 of 11.
