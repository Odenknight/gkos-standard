# Runner L6 fixtures — received-bytes digest basis

<!-- R26-A06 (accepted 2026-10-07; v0.83 development line) -->

**Status:** development fixtures for R26 (accepted in part 2026-10-07). They grant no profile
claim and are not part of the active qualifying catalog.

**Requirement ID:** GKOS-CANON-007.

**File:** `digest-basis.json`. Each case gives bytes in hex and a digest. The
reference check is `verifyDigestBinding` in
`conformance/runner/canonical.mjs`. It recomputes the digest over the bytes
its basis names, as R26-A06 requires, and refuses a mismatch with
GKOS-GATE-L6-007. Cases P01 and N01 reuse the bytes and digests of packet R2
fixtures R26-A06-P-MEMBER-001 and R26-A06-N-MISLABEL-002.

The duplicate and out-of-order map-key fix (GAP-010) has its fixtures under
`../A09/`.

## Expected results and reasons

| Case | Digest | Expected | Reason |
| --- | --- | --- | --- |
| R26-RL6-P01 | received-bytes over raw source bytes | accepted | The digest covers the exact bytes. |
| R26-RL6-N01 | the same value labelled GKX-CBOR-1 | GKOS-GATE-L6-007 | The bytes are not canonical CBOR, so the named basis cannot match. |
| R26-RL6-P02 | GKX-CBOR-1 over canonical bytes | accepted | The bytes verify as canonical CBOR and the hash matches. |
| R26-RL6-N02 | received-bytes, other bytes | GKOS-GATE-L6-007 | The hash does not match. |
| R26-RL6-N03 | names both bases | GKOS-GATE-L6-007 | The basis is ambiguous. |

## Before and after the reference change

Before (base `e1aa08a`): the runner had no basis-aware check. Context
assembly hashed resolved content as UTF-8 text whatever the label, so N01
was accepted.

After: `verifyDigestBinding` returns the expected result for all five cases.
Context assembly (`assembleContext`) applies it to every reference with a
`received-bytes` basis.

**Limitation:** context assembly still recomputes GKX-CBOR-1-labelled member
and closure references over UTF-8 text. The published GCP-6 replay fixture
(`fixtures/gcp6/replay-selection-envelope.json`) labels raw text digests that
way. Enforcing R26-A06 there would refuse that fixture, and migrating it is
outside this packet. Through context assembly, N01 is therefore still
accepted.
