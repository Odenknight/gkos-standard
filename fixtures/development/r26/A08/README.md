# R26-A08 fixtures — unknown artifact identity

**Status:** Development fixtures proposed under R26 (Status: Proposed) for the
v0.83 development line. Non-qualifying. They support no conformance claim.

**Amendment:** Canonical Serialization annex §3 (R26-A08).

**Requirement ID:** GKOS-CANON-001 for every fixture.

Each file carries `cbor_hex`: complete payload bytes. The control is the same
payload as `R26-A07-P-CONTROL-001`.

| Fixture | Payload | Expected | Reason |
| --- | --- | --- | --- |
| `R26-A08-P-CONTROL-001` | (`selection-envelope`, `1.0.0`) | accepted | Supported pair, schema-valid. |
| `R26-A08-N-UNKVER-002` | `schema_version` `9.0.0` | refused, GKOS-GATE-L6-001 | Pair outside the supported set; no fallback to another version. |
| `R26-A08-N-NOTYPE-003` | `artifact_type` absent | refused, GKOS-GATE-L6-001 | No inference of the type from field names. |
| `R26-A08-N-CROSS-004` | selection-envelope fields declared as (`context-manifest`, `1.0.0`) | refused, GKOS-GATE-L6-001 | Supported pair, but the payload is invalid under that pair's schema; no re-dispatch by field names. |

**Supported set used for evaluation:** the pairs declared as constants by the
schemas in `schemas/` at this commit: `authority-receipt` 1.0.0,
`authorized-use-record` 1.0.0 and 1.1.0-development, `context-manifest` 1.0.0,
`refusal-receipt` 1.0.0, `selection-envelope` 1.0.0. No two schemas share a
pair (the second paragraph of R26-A08). R26-S04 (packet R5) adds the
conformance-manifest declaration of the supported set.

**Before (runner `verifyCanonicalBytes`, base `e1aa08a`).** All four fixtures
are accepted: the runner does not read `artifact_type` or `schema_version`.
Fixtures 002–004 fail before.

**After, on the packet branch.** `NOT_MODELED` in the runner. Runner change proposed:
the canonical verifier takes a declared supported set, refuses an absent,
non-text or unsupported identity with GKOS-GATE-L6-001, validates the decoded
value against the schema for that pair alone, and refuses a schema-invalid
payload with GKOS-GATE-L6-001. A registry-lint rule would check that no two
schemas share a pair. The packet's proposed-behaviour harness gives the
expected result for all four fixtures.

## Reference runner after integration

Integration branch `work/v083-r26-implementation` (worker I2). Before is the
runner on `main` `8c20b05`; after is the integrated runner. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

`verifyArtifactBytes` refuses an absent, non-text or unsupported identity
and a payload invalid under its pair's schema with GKOS-GATE-L6-001. The
declared set is every schema in `schemas/` that fixes both `artifact_type` and
`schema_version` (`supportedArtifactPairs`). `registry-lint.mjs` fails when two
schemas declare the same pair; none do.

- Before (`verifyCanonicalBytes`): 1 of 4 (001).
- After: 4 of 4.
