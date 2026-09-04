# V82-01 Layer-3 migration notes

**Standing:** informative preparation guidance for Proposed R23; not normative.

These notes identify migration risks created by the Proposed R23 semantics. They
do not require a v0.81 implementation to change historical records.

## Required preservation rules

A migration must not invent missing actor, evidence, temporal, relation-property,
inverse, or authority facts. Where legacy data lacks information required by a
future contract, the migrated result must remain explicitly incomplete,
unresolved, or unsupported for the affected profile rather than fabricating a
value.

## Current-representation risks

1. **Tuple-based deduplication.** Any implementation that collapses assertions
   solely on subject/predicate/object must preserve or reconstruct separately
   identified assertions before claiming the future portable semantics.
2. **Materialized inverse edges.** Existing stores may contain both directions
   as separate rows. Migration must distinguish deterministic projection rows
   from independently evidenced inverse assertions.
3. **Path/basename references.** References resolved from locators must be
   rebound to stable governed identity only when an unambiguous identity mapping
   is evidenced. Ambiguous references remain unresolved.
4. **Global cycle rejection.** Implementations that reject all cycles must
   separate structural engine limits from relation-specific semantics; a global
   engine limitation cannot be relabeled a GKOS requirement.
5. **Single-head projection.** Implementations that expose only one lineage head
   must preserve all valid branches in governed state and identify any
   deployment policy that selects a head.
6. **Unknown relation names.** Extension relations must be preserved without
   silent coercion to a core relation.

## Migration evidence

An implementation migration report should bind the exact source and target
versions, migration tool identity, transformed record counts, unresolved or
unsupported counts, collision cases, diagnostics, rollback path, and before/after
digests where applicable.
