# Annex — Canonical serialization

**Status:** Normative development annex adopted by R16 for
GKOS-2026-08-20 v0.80

**Depends on:** R16 required-profile ratification

**Supersedes:** the deferred “GKX serialization questions” open item recorded
in v0.79

## 1. Purpose and scope

Conformance binds to the **canonical form** of an artifact, not to any stored or
transmitted representation. This annex defines that canonical form so that
reproducibility under GCP-6 and hash-bound authorization under GCP-7 are
testable.

This annex is normative. Where it conflicts with an illustrative realization,
this annex governs.

In scope are:

- the byte-level canonical encoding;
- canonical validation and refusal behavior;
- artifact-hash construction; and
- the human-auditable verifier obligation.

Out of scope are:

- storage, indexing, and transport;
- whether a selection was epistemically correct or optimal; and
- global ordering across independent writer streams unless a separately
  declared ordering authority exists.

## 2. Canonical encoding profile

The canonical form of a GKOS artifact is CBOR encoded under the **core
deterministic encoding requirements of RFC 8949 §4.2.1** with the additional
GKX constraints in this annex.

A canonical encoding MUST use:

- definite-length encoding for every map, array, text string, and byte string;
- shortest-form integer and head encoding;
- preferred, shortest floating-point serialization that exactly preserves the
  schema-declared floating value;
- bytewise lexicographic ordering of canonical encoded map keys under §4; and
- only data types and values permitted by the applicable schema.

The older length-first map-key ordering described in RFC 8949 §4.2.3 MUST NOT
be used.

The canonical CBOR payload bytes are the only bytes used to establish the
canonical artifact hash. Other representations do not establish the canonical
identity or hash of the governed artifact. Layer-1 source fingerprints,
signatures, authority receipts, and transport attestations retain their
separate governed roles.

## 3. Canonical payload identity

Every canonical payload MUST contain:

- canonical_profile: GKX-CBOR-1;
- artifact_type;
- schema_version; and
- all fields required by the applicable artifact schema.

Where policy, compilation, or selection participates in the artifact, the
payload MUST also contain the applicable digest-bound references:

- policy_ref: identity, version, digest algorithm, and digest;
- compiler_ref: identity, version, digest algorithm, and digest; and
- selection_set_ref: identity, version, digest algorithm, and digest.

A friendly version label without an immutable digest does not satisfy a
digest-bound reference.

## 4. Map key ordering, duplicates, arrays, and sets

Map keys MUST be sorted by the bytewise lexicographic order of their canonical
CBOR encodings, as specified by RFC 8949 §4.2.1. Keys MUST be text strings
unless a governing schema explicitly declares otherwise.

Duplicate keys are prohibited. A decoder used for canonical verification MUST
detect duplicates before a generic map interface can discard or overwrite
them. An artifact containing duplicate keys is invalid and MUST be refused
with a registered diagnostic code.

Arrays preserve their schema-declared order. Where an artifact contains a
logical set, the governing schema MUST declare a total order over its members,
and the encoder MUST apply that order before encoding. Insertion order,
hash-map iteration order, storage order, and database return order MUST NOT
influence canonical output.

Absent, null, and empty are distinct states. An encoder MUST NOT substitute one
for another or omit a present empty value.

## 5. Numbers

Integers MUST use shortest-form encoding. A value whose schema type is integer
MUST be encoded as an integer.

A schema-declared floating-point value remains a float even when its
mathematical value is integral. Floating-point values MUST use the shortest
binary16, binary32, or binary64 form that round-trips the value exactly.

Negative zero, NaN, positive infinity, and negative infinity are prohibited.
An artifact containing any prohibited numeric value is invalid and MUST be
refused.

Captured retrieval scores and other measurements are evidence of what a
non-deterministic component produced. Their schema-declared numeric type MUST
NOT be silently changed merely to make the encoding shorter.

Structural fields—including identifiers, counts, versions, sequence numbers,
and durations—SHOULD use integers or strings rather than floating-point values.
A future major release MAY tighten this guidance into a requirement.

## 6. Timestamps and ordering

Canonical timestamps MUST use this exact uppercase UTC form:

    YYYY-MM-DDTHH:MM:SS.ffffffZ

They MUST:

- be valid RFC 3339 date-time values;
- use the Z designator; numeric offsets are prohibited;
- contain exactly six zero-padded fractional digits; and
- reject the leap-second value :60.

If a received source expresses a different offset, precision, or leap-second
value, the source representation remains preserved as Layer-1 evidence. A
derived canonical timestamp MUST record its transformation lineage.

Wall-clock reads are prohibited during deterministic assembly. Every time value
MUST arrive as a captured input.

### 6.1 Ordering

Timestamps MUST NOT establish authoritative event order.

Within a declared writer stream, authoritative order requires:

1. a monotonic per-writer sequence number; and
2. predecessor linkage through the applicable hash chain or governed receipt
   chain.

These mechanisms establish only a partial order across multiple writer
streams. A claimed global order across agents, nodes, or writers requires a
declared sequencer, ledger, consensus mechanism, or governed merge/adjudication
record. Unknown or incomparable order MUST remain explicit.

## 7. Text and source preservation

CBOR text strings MUST be valid UTF-8 and MUST already be normalized to Unicode
Normalization Form C under **Unicode 17.0.0** before canonical encoding.

A canonicalizer MUST refuse a non-NFC canonical text value rather than silently
rewriting it. Normalization MAY occur only as an explicit, separately recorded
transformation that preserves the received source bytes and their fingerprint
as Layer-1 evidence.

Binary or text source content whose exact received bytes matter MUST be
preserved as a byte string, external digest-bound source, or Layer-1 source
reference. Canonical text normalization MUST NOT overwrite original evidence.

## 8. Artifact hash construction

The artifact hash is SHA-256 over the canonical CBOR payload bytes.

The external digest representation MUST identify:

- algorithm: sha-256;
- canonical profile: GKX-CBOR-1; and
- the lowercase hexadecimal digest.

The canonical payload includes the artifact type, schema version, canonical
profile, and every applicable policy, compiler, and selection-set reference.
This provides domain separation within the hashed content.

The hashed payload MUST exclude:

- the artifact’s own hash;
- signatures over the artifact hash;
- transport envelopes and metadata;
- storage paths, database row identifiers, and index state; and
- write-time metadata not itself part of the governed artifact.

A policy, compiler, schema, or canonical-profile change produces a distinct
artifact and hash. An earlier artifact remains valid historical evidence but
MAY become ineligible for a later action under the applicable policy. No change
silently invalidates or rewrites the historical artifact.

## 9. Human auditability and verifier obligation

A claimant that emits or consumes canonical artifacts for GCP-6 or GCP-7 MUST
provide a verifier, either with the implementation or in its immutable
conformance evidence package.

The verifier accepts canonical bytes and emits:

1. the artifact hash under §8; and
2. a human-readable rendering of every decoded field.

A conforming rendering MUST provide:

- **Completeness:** every field in the canonical bytes appears.
- **Non-addition:** no field or value is presented as decoded content unless it
  derives from the canonical bytes.
- **Order fidelity:** map fields appear in canonical order.
- **Hash display:** the artifact hash appears with the rendering.
- **Round trip:** the declared parser for that rendering can reconstruct
  canonical bytes with the displayed hash.

The implementation MUST declare the rendering format and version and MUST
provide either a verifier that accepts its own rendering or a paired parser
that demonstrates the round trip. CBOR diagnostic notation is the recommended
default.

Readability is a view, never a second canonical authority. An implementation
MUST NOT hash, sign, or bind authorization to the rendering in place of the
canonical payload.

A rendering round-trip fixture is required for a qualifying GCP-6 claim.

## 10. Layer-6 phase split

Layer 6 separates non-deterministic selection from deterministic assembly.

### 10.1 Captured selection envelope

Retrieval, ranking, graph traversal, and model-assisted filtering MAY be
non-deterministic. Their complete operative output MUST be captured in a
canonical, hashed selection envelope containing, as applicable:

- selection-set identity and schema version;
- recipient and purpose;
- authorized scope;
- query or selection instruction;
- selecting actor, tool, model, and immutable versions or digests;
- eligible corpus, index, or graph-snapshot identity and digest;
- ordered selected object identities and resolved content hashes;
- captured scores and per-item inclusion reasons;
- known exclusions and omissions;
- contradiction, warning, restriction, and lineage-closure inputs;
- captured selection time; and
- governing selection-policy identity, version, and digest.

The selection envelope attests what was selected. It does not prove that the
same non-deterministic selection would recur.

### 10.2 Deterministic assembly

Deterministic assembly receives only captured, digest-bound inputs. It MUST NOT
perform live retrieval, model calls, graph navigation, random generation,
wall-clock reads, unordered iteration, or mutable external lookups.

The replay property is:

> Identical canonical selection envelope, resolved content bytes, schema
> version, policy identity and digest, compiler identity and digest, and
> canonical-profile version produce identical canonical bytes and an identical
> artifact hash.

Approximate-nearest-neighbor indexes and model outputs are outside the replay
boundary. They remain accountable through the captured selection envelope.

A negative-space fixture MUST evaluate omission against the pinned eligible
knowledge snapshot and the deterministic contradiction, warning, restriction,
or lineage-closure rule. “The system held the information” is not testable
without those bindings.

## 11. Layer-5 and Layer-7 binding

When a Context Manifest was presented for a governed Layer-5 disposition, the
Decision Record MUST bind both its stable identity/version and artifact hash.

An Authorized Use Record MUST bind:

- the Context Manifest stable identity/version and artifact hash;
- applicable policy and compiler digest-bound references;
- the proposing actor;
- the reviewing or deciding actor, where applicable;
- the authorizing actor;
- the executing actor or service;
- the delegation chain and bounded effect scope;
- the action, purpose, outcome, and receipt; and
- the correction, compensation, rollback, or escalation route.

A stable identity without a hash does not prove exact content. A hash without
stable identity and version does not preserve semantic lineage. Both are
required.

## 12. Required refusal diagnostics

Every canonicalization gate failure MUST fail closed and emit a registered
gate code mapped to its permanent requirement ID. The standard gate code does
not replace implementation-specific GKX diagnostics.

Registered refusal conditions include:

- indefinite-length or other non-deterministic CBOR encoding;
- non-shortest integer, head, or floating-point encoding;
- map-key ordering violation;
- duplicate map key;
- negative zero, NaN, or infinity;
- schema-declared integer encoded as a float;
- invalid canonical timestamp;
- invalid UTF-8 or non-NFC canonical text;
- absent, null, or empty conflation;
- policy, compiler, schema, or selection-reference mismatch;
- hash mismatch on replay; and
- rendering round-trip failure.

A Refusal Receipt is a semantic record role. An existing Control Receipt,
Decision Record, or attempted-use record MAY satisfy it when it carries all
required fields. A dedicated object is required only when no existing record
can satisfy the role.

## 13. Conformance

A qualifying GCP-6 claim requires:

- canonical replay from a frozen selection envelope;
- canonical-byte and hash equality;
- negative-space closure tests;
- human-rendering completeness and round trip; and
- all applicable required gate violations producing the registered refusal
  result.

A qualifying GCP-7 claim additionally requires:

- Context Manifest identity and hash binding;
- Decision Record binding where the manifest supported review;
- distinct actor-role and delegation evidence;
- typed effect-scope evaluation;
- stale-context refusal at action time; and
- action outcome and recovery-route evidence.

This annex adds and tightens mandatory gates. Claims against v0.79 and earlier
do not carry forward to v0.80. The active catalog continues to declare no
qualifying profile until every required behavior is implemented, executed, and
passing under the conformance rules.
