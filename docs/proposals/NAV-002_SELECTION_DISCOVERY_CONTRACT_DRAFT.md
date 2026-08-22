# NAV-002 selection and discovery contract — draft

**Status:** Non-normative proposal; not qualifying

**Boundary:** Subordinate to the ratified Layer-6 phase split in R16 and the
canonical-serialization annex. This draft does not amend GKOS v0.80.

## Proposed contract

Navigation proposes candidates. Governed selection decides inclusion and
captures its operative output in the canonical selection envelope. Navigation
does not create semantic or action authority and cannot suppress a mandatory
contradiction, warning, restriction, omission, or lineage-closure item.

The navigation result supplied to selection should bind:

- the eligible corpus, graph, or index snapshot and digest;
- tenant, sensitivity, temporal, and version boundaries;
- traversal or query instruction;
- tool, model, index, and policy identities and immutable versions or digests;
- ordered candidates, scores, and inclusion or exclusion reasons; and
- incomplete, indeterminate, truncated, or heuristic status.

Heuristic retrieval may contribute candidates but cannot establish completeness
or authority. Its contribution must remain visible in the captured selection
envelope. An incomplete result cannot be represented as complete context.

## Promotion gates

Before normative promotion, this draft requires permanent requirement IDs,
positive and negative executable fixtures, compatibility review against
`GKOS-CONTEXT-001..004`, and governed disposition under the active amendment
procedure.
