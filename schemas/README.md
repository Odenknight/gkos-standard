# GKOS schemas

GKOS publishes JSON Schema 2020-12 models for human-readable and implementation
exchange surfaces. Under R16, schemas define the semantic data model that is
encoded as deterministic CBOR for canonical artifact identity. Stored JSON,
YAML, Markdown, or database rows are not canonical merely because they validate
against a schema.

| Schema | Layer | Status |
| --- | --- | --- |
| gkx-common.defs.json | shared | active shared definitions; R26-S03 received-bytes digest definitions (accepted 2026-10-07; v0.83 development line) |
| gkx-frontmatter-2.0.schema.json | L2 | active GKX 2.0 frontmatter |
| assessment.schema.json | L4 | active development schema |
| diagnostics-sidecar.schema.json | L4 | active development schema with gate-code mapping |
| proposal-envelope.schema.json | L5 | active development schema |
| decision-record.schema.json | L5 | active; manifest reference required when context_used is true |
| selection-set.schema.json | L6 | active v0.80 selection-envelope schema |
| context-manifest.schema.json | L6 | active v0.80 deterministic-manifest schema |
| authorized-use-record.schema.json | L7 | active v0.80 authorized-use schema |
| refusal-receipt.schema.json | cross-layer | active v0.80 Refusal Receipt role schema |
| authority-receipt.schema.json | L7 | R17 development schema, published with GKOS-2026-09-03 v0.81 |
| authorized-use-record.r17.schema.json | L7 | R17 development candidate, published with GKOS-2026-09-03 v0.81; does not replace v0.80 |
| authority-receipt-1.1.0.schema.json | L7 | R26-S01 and R26-S07 (accepted 2026-10-07); v0.83 development line; unpublished until a later authorized edition publishes it; does not replace 1.0.0 for historical receipts |
| authorized-use-record-1.1.0.schema.json | L7 | R26-S01 (accepted 2026-10-07); v0.83 development line; unpublished until a later authorized edition publishes it; current Authorized Use Record schema on that line, from the R17 candidate; does not invalidate v0.80 or R17 records |
| selection-set-1.1.0.schema.json | L6 | R26-S03 and R26-A06 selection envelope 1.1.0 (accepted 2026-10-07; v0.83 development line; unpublished): member, omission and closure references may use a received-bytes digest; 1.0.0 stays valid for historical and published envelopes |
| context-manifest-1.1.0.schema.json | L6 | R26-S03 and R26-A06 Context Manifest 1.1.0 (accepted 2026-10-07; v0.83 development line; unpublished): member and omission references may use a received-bytes digest; 1.0.0 stays valid for historical and published manifests |
| refusal-receipt-1.1.0.schema.json | cross-layer | R26-S02 (accepted 2026-10-07; R26-A10 Option A); v0.83 development line; unpublished until a later authorized edition publishes it; does not replace 1.0.0 for historical receipts |
| conformance-manifest.schema.json | claims | active development schema |
| decision-record.canonical-1.0.0.schema.json | L5 | R26-S05/S06 canonical Decision Record (accepted 2026-10-07; v0.83 development line); `decision-record.schema.json` stays valid for legacy sidecars |
| proposal-envelope.r26.schema.json | L5 | R26-S06 version with actor references (accepted 2026-10-07; v0.83 development line); does not replace `proposal-envelope.schema.json` |
| assessment.r26.schema.json | L4 | R26-S06 version with actor references (accepted 2026-10-07; v0.83 development line); does not replace `assessment.schema.json` |
| conformance-manifest.r26.schema.json | claims | R26-S04 version adding receipt binding, canonical rendering, supported artifact schemas and role projections (accepted 2026-10-07; v0.83 development line); superset of `conformance-manifest.schema.json` |
| provisional/science/*.draft.schema.json | cross-layer SRTP | provisional, informative, and non-qualifying |
| archive/*.draft.schema.json | historical | archived, non-current schema evidence |

## Canonicalization

Canonical artifacts use GKX-CBOR-1 under the normative
Canonical Serialization annex. Each canonical payload identifies its artifact
type, schema version, and canonical profile. Applicable policy, compiler, and
selection references are digest-bound.

JSON Schema validation alone cannot prove:

- deterministic CBOR encoding;
- duplicate-key detection before decoder loss;
- Unicode NFC conformance;
- shortest floating-point representation;
- artifact-hash correctness;
- human-rendering round trip;
- mandatory closure completeness; or
- authorization-time equality with the acted-on manifest.

Those behaviors require the executable fixtures and verifier evidence specified
by the standard.

## Claim boundary

The active fixture catalog declares no qualifying profile. Publication of these
schemas does not establish implementation conformance, interoperability
completion, independent verification, or v1.0 readiness.

R13 continues to separate authored GKX note identity from broader relationship
targets. New authored note UIDs use lowercase UUIDv7; valid lowercase UUIDv4
legacy identities remain permanent.

## Frontmatter lineage

The development frontmatter schema explicitly types the established optional
`supersedes` (predecessors) and `superseded_by` (successors) properties as arrays
of unique `relationshipTarget` strings. Omission and empty arrays are valid.
The shared target grammar permits UUIDs, namespaced identifiers and `[[...]]`
references; acceptance of a target string does not establish successful resolution.
Use stable note UIDs for rename-safe local note lineage, as in the GCP-3 fixtures.
`superseded_with` is not a defined synonym. Unknown extension properties remain
permitted, so a misspelled field is not automatically rejected by this base schema.

This closes a validation gap: these fields already occur in the guide, fixtures,
proposal vocabulary and Engine. They previously passed as untyped extra fields.
Present non-array values, malformed targets and exact duplicate entries now fail.
This is a validation-tightening change on the development branch, not a change
to the signed v0.82.1 release or historical schema snapshots. Consumers pinning
schema bytes or hashes must review and update their pins explicitly. No Engine
contract is updated automatically, and no new qualifying profile is created.

Graph checks, rather than this JSON Schema, evaluate self-links, cycles,
unresolved targets, equivalent references to the same target, reciprocal
consistency and branching lineage under the applicable requirements and scope.
Do not infer one authoritative successor from order, timestamps or similarity.
An authorized disposition or valid bounded delegation establishes supersession;
frontmatter and a projection-profile label alone do not prove authorization or
Engine compatibility. See `GKOS-LINEAGE-001` through `003` in the
[requirement registry](../requirements/REGISTRY.md),
[R13-101](../decisions/R13_Conformance_Honesty_and_Alignment_Development_Decision_Record.md),
and the [governed state change annex](../standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md).

Rollback is restoration of the preceding development schema and consumer pin;
it does not delete records, rewrite identities, or reverse authorized decisions.
The regression tests in `conformance/runner/test/frontmatter-lineage-schema.test.mjs`
exercise the structural boundary; existing graph fixtures cover lineage behavior.
