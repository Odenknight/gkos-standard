# GKOS schemas

GKOS publishes JSON Schema 2020-12 models for human-readable and implementation
exchange surfaces. Under R16, schemas define the semantic data model that is
encoded as deterministic CBOR for canonical artifact identity. Stored JSON,
YAML, Markdown, or database rows are not canonical merely because they validate
against a schema.

| Schema | Layer | Status |
| --- | --- | --- |
| gkx-common.defs.json | shared | active shared definitions |
| gkx-frontmatter-2.0.schema.json | L2 | active GKX 2.0 frontmatter |
| assessment.schema.json | L4 | active development schema |
| diagnostics-sidecar.schema.json | L4 | active development schema with gate-code mapping |
| proposal-envelope.schema.json | L5 | active development schema |
| decision-record.schema.json | L5 | active; manifest reference required when context_used is true |
| selection-set.schema.json | L6 | active v0.80 selection-envelope schema |
| context-manifest.schema.json | L6 | active v0.80 deterministic-manifest schema |
| authorized-use-record.schema.json | L7 | active v0.80 authorized-use schema |
| refusal-receipt.schema.json | cross-layer | active v0.80 Refusal Receipt role schema |
| conformance-manifest.schema.json | claims | active development schema |
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
