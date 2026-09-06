# V82-01 Layer-3 migration notes

**Standing:** informative preparation guidance for Proposed R23; not normative.

These notes identify migration risks created by the Proposed R23 semantics. They
do not require a v0.81 implementation to change historical records.

## Required preservation rules

A migration MUST NOT invent missing actor, evidence, temporal, relation-property,
inverse, resolution, identity, or authority facts. Reconstruction is permitted
only from retained source evidence. Where legacy data lacks information required
by a future contract, the migrated result remains explicitly incomplete,
unresolved, or unsupported for the affected profile rather than fabricating a
value.

A migration MUST preserve historical governed record identity. It MUST NOT
rewrite or substitute an identity merely to satisfy a new storage or projection
layout. If a deterministic new transport identifier is needed, the migration
must preserve the old identity as provenance rather than treating the new value
as historical fact.

Legacy references with no evidenced resolution migrate as `unresolved`; absence
of a historical resolution field is never treated as evidence of resolution.

## Current-representation risks

1. **Tuple-based deduplication.** Any implementation that collapses assertions
   solely on subject/predicate/object must preserve separately identified
   assertions. Reconstruction is allowed only when retained source evidence
   proves the separate identity/actor/evidence facts; otherwise the migration
   records the loss as incomplete rather than synthesizing assertions.
2. **Materialized inverse edges.** Existing stores may contain both directions
   as separate rows. Migration must distinguish deterministic projection rows
   from independently evidenced inverse assertions. If that distinction cannot
   be established, the row remains unsupported for portable inverse semantics.
3. **Path, basename, alias, and wikilink references.** References such as
   `[[legacy-note]]` are locators, not governed identity. They may be rebound to
   stable governed identity only when an unambiguous identity mapping is
   evidenced. Ambiguous or unevidenced references remain unresolved.
4. **URI references.** Under D1A, a URI is identity-bearing only when the
   applicable release or declared extension contract says that URI form is a
   governed identifier. Otherwise it is a locator and follows the same
   fail-safe resolution rules as other locators.
5. **Global cycle rejection.** Implementations that reject all cycles must
   separate structural engine limits from relation-specific semantics; a global
   engine limitation cannot be relabeled a GKOS requirement. The Proposed R23
   core `gkos:supersedes` relation is specifically directed and acyclic.
6. **Single-head projection.** Implementations that expose only one lineage head
   must preserve all valid branches in governed state. Any selecting policy must
   carry explicit policy identity/version and may not use timestamp, UUID,
   lexical, or path ordering as authority or succession preference.
7. **Unknown relation names.** Extension relations must be preserved without
   silent coercion to the provisional `gkos` core. An unrecognized `gkos`
   relation name is a contract defect rather than an extension.
8. **GKX 2.0 shared shapes.** Migrations should preserve the existing
   `epistemicState` vocabulary and `actorIdentity`/`actorReference` meaning from
   `schemas/gkx-common.defs.json`; the provisional R23 record schema reuses the
   shared epistemic and actor-reference definitions rather than loosening them.
9. **Resolution-state placement.** The corrected candidate carries resolution
   state per reference. A mixed record may therefore contain one resolved
   reference and one unresolved or ambiguous reference without collapsing them
   into one record-level state.

## Migration evidence

An implementation migration report should bind the exact source and target
versions, migration tool identity, transformed record counts, unresolved or
unsupported counts, identity-collision cases, diagnostics, rollback path, and
before/after digests where applicable. It should separately count records whose
portable semantics could not be established without inventing facts.
