# R26-A06 fixtures — received-bytes digests

**Status:** Development fixtures accepted under R26 (accepted in part 2026-10-07) for
the v0.83 development line. Non-qualifying. They support no conformance claim.

**Amendment:** Canonical Serialization annex §8, new paragraphs (R26-A06), with
the schema definitions of R26-S03.

| Fixture | Requirement IDs | Expected | Reason |
| --- | --- | --- | --- |
| `R26-A06-P-MEMBER-001` | GKOS-CANON-007, GKOS-CONTEXT-001 | accepted | A selection member references raw Layer-1 source bytes by a received-bytes digest; SHA-256 over the exact bytes (`resolved_bytes_base64`) matches. |
| `R26-A06-N-MISLABEL-002` | GKOS-CANON-007 | refused, GKOS-GATE-L6-007 | The same raw-bytes SHA-256 is labeled `GKX-CBOR-1`. That label names canonical CBOR payload bytes; the resolved bytes are not a canonical GKOS artifact, so recomputation over the named basis cannot match. |
| `R26-A06-P-REFUSAL-003` | GKOS-CANON-001, GKOS-AUTHUSE-005 | valid receipt; input digest recomputes | Malformed CBOR (an indefinite-length map) is refused with GKOS-GATE-L6-001 before canonical decoding. The receipt binds the refused input by a received-bytes digest. |

Fixture 003 carries a Refusal Receipt in the R26-S02 shape
(`schema_version` `1.1.0`). That schema version is written by packet R1, not by
this packet. Its `input_refs` items use the R26-S03 digest forms.

**Before and after.**

| Fixture | Before (base `e1aa08a`) | After (this branch) |
| --- | --- | --- |
| 001 | Schema: the reference is invalid under `artifactReference` (no received-bytes form). Runner `assembleContext`: accepted, because it hashes resolved content as UTF-8 text whatever the label says. | Schema: valid under `artifactReferenceAnyDigest`. Runner: `NOT_MODELED`. |
| 002 | Runner `assembleContext`: accepted (no basis check). Expected GKOS-GATE-L6-007; the fixture fails before. | Runner: `NOT_MODELED`. |
| 003 | Schema: the receipt is invalid under Refusal Receipt 1.0.0 at `/input_refs/0/digest`. Runner `verifyCanonicalBytes` refuses the input with GKOS-GATE-L6-001. | Each `input_refs` item is valid under `artifactReferenceAnyDigest`; the whole receipt validates against packet R1's uncommitted `refusal-receipt-1.1.0` schema (cross-check). |

`NOT_MODELED` on the packet branch: the reference runner did not recompute a
digest according to its basis. A runner change is proposed to packet R3: `assembleContext` should
recompute a `received-bytes` digest over the exact resolved bytes, and a
`GKX-CBOR-1` digest over bytes that pass the canonical verifier, failing with
GKOS-GATE-L6-007 otherwise. The packet's proposed-behaviour harness gives the
expected result for all three fixtures.

**Known consequence.** The positive GCP-6 replay fixture
`fixtures/gcp6/replay-selection-envelope.json` labels SHA-256 over UTF-8 text as
`GKX-CBOR-1`. Under R26-A06 that is a mislabeled digest. This packet does not
edit that fixture; see the packet handoff.

## Reference runner after integration

Integration branch `work/v083-r26-implementation` (worker I2). Before is the
runner on `main` `8c20b05`; after is the integrated runner. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

`verifyDigestBinding` (packet R3) recomputes each digest over the basis it
names. Fixture 003 also validates against `refusal-receipt-1.1.0`, whose
`input_refs` now use the shared `artifactReferenceAnyDigest` definition.

- Before (`assembleContext`, UTF-8 recompute): 001 accepted as expected; 002
  accepted (fails); 003 has no 1.1.0 schema (fails).
- After: 3 of 3 through `verifyDigestBinding`.

Fixture 002 is a partial result. `assembleContext` still recomputes
`GKX-CBOR-1`-labelled raw content over UTF-8 text, because the published GCP-6
replay fixture labels raw text that way and full basis checking would refuse it
with GKOS-GATE-L6-007. Migrating that fixture is an owner decision.

## Reference runner wave 2 and review corrections

Worker I3 on `work/v083-r26-implementation`. Before is the runner on `main`
`8c20b05`; after is the runner at the I3 head. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

Finding r26-REV-005. Two new schema versions,
`schemas/selection-set-1.1.0.schema.json` and
`schemas/context-manifest-1.1.0.schema.json`, let member, omission and
closure references use either digest form. `assembleContext` selects its path
by the selection envelope's declared `schema_version`:

- `1.1.0`: every reference is recomputed by `verifyDigestBinding` over the
  bytes its basis names; raw content labelled `GKX-CBOR-1` is refused with
  GKOS-GATE-L6-007; the manifest is emitted as Context Manifest 1.1.0.
- `1.0.0` or none: the published path, unchanged. The GCP-6 replay fixture
  and `conformance/evidence/gcp6-replay-v0.1/context-manifest.cbor` stay
  byte-identical.
- any other version: GKOS-GATE-L6-001.

| Fixture | Requirement IDs | Expected | Reason |
| --- | --- | --- | --- |
| `R26-A06-P-ASSEMBLY-004` | GKOS-CANON-007, GKOS-CONTEXT-001, GKOS-CONTEXT-003 | accepted; manifest valid under 1.1.0 with a fixed canonical hash | A 1.1.0 envelope references raw source bytes by a received-bytes digest and a canonical artifact by a `GKX-CBOR-1` digest; both recompute. |
| `R26-A06-N-ASSEMBLY-005` | GKOS-CANON-007 | refused, GKOS-GATE-L6-007 | The same raw bytes labelled `GKX-CBOR-1` in a schema-valid 1.1.0 envelope; assembly refuses. |

- Before: 004 and 005 fail (no 1.1.0 schemas on `main`; the runner at
  `192385b` also lacks them).
- After: 10 of 10. `R26-A06-N-MISLABEL-002` is no longer partial: the R26
  assembly path refuses the same reference (fixture 005).

## Second-round review correction (r26-REV-005)

Worker I4 on `work/v083-r26-implementation`. On the R26 (1.1.0) path,
structural canonical CBOR is not enough: bytes such as raw UTF-8 `"ab"`
(CBOR text `"b"`) or `"1"` (CBOR integer -18) are canonical CBOR but carry no
artifact identity. `assembleContext` now takes the verifier's schema registry
as `inputs.schema_registry` and verifies every `GKX-CBOR-1` reference with
`verifyArtifactBytes`: a map whose `(artifact_type, schema_version)` is a
declared pair, valid under that schema, with the typed checks (set order,
timestamps, numeric types). Any failure is GKOS-GATE-L6-007. Without a
registry the R26 path refuses with GKOS-GATE-L6-007. The legacy (1.0.0) path,
the GCP-6 replay and its preserved evidence are unchanged.

Fixture 004's held contradiction is now a canonical Decision Record
(`decision-record` 1.0.0, R26-S05), so the schema-aware verifier can identify
it; its digests and manifest hash are regenerated.

| Fixture | Requirement IDs | Expected | Reason |
| --- | --- | --- | --- |
| `R26-A06-N-ASSEMBLY-006` | GKOS-CANON-007 | refused, GKOS-GATE-L6-007 | Reviewer mutation: raw `"ab"` labelled `GKX-CBOR-1`; canonical CBOR text, not an artifact. |
| `R26-A06-N-ASSEMBLY-007` | GKOS-CANON-007 | refused, GKOS-GATE-L6-007 | Reviewer mutation: raw `"1"` labelled `GKX-CBOR-1`; a CBOR integer, not an artifact. |
| `R26-A06-N-ASSEMBLY-008` | GKOS-CANON-007 | refused, GKOS-GATE-L6-007 | Reviewer mutation: the closure input resolves to the R26-A07-N-SETORDER-010 bytes; typed verification finds the schema-declared set out of order. |

- Before (runner at `f0f189a`): 006, 007 and 008 accepted (fail). Before
  (`main` `8c20b05`): fail (no 1.1.0 schemas).
- After: 13 of 13.
