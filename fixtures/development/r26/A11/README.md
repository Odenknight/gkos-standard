# R26-A11 — Actor identity and sameness

Development fixtures for the v0.83 development line. R26 is proposed, not
accepted. These fixtures are non-qualifying and support no conformance claim.

Tests the actor-sameness rule proposed for annex §1.1: same `actor_id` and same or both-absent `identity_provider`; policy declarations may merge actors; a class-only value does not identify an actor.

**Requirement IDs:** `GKOS-REVIEW-003`, `GKOS-AUTHUSE-004`.

**Evaluation:** Semantic. The runner's `review-independence` kind compares two opaque strings. The before results map `actor_id` (or the class-only value) to those strings and differ from the expected result in R26-A11-01..04. The integrated runner evaluates actor references as gate kind `role-separation`; see the last section. Schema support for actor references in proposals, decisions and assessments is R26-S06.

## Cases

| Case | Title | Expected | Reason |
| --- | --- | --- | --- |
| R26-A11-01 | Same actor_id, different identity providers (distinct) | admit; distinct actors | Equal actor_id with different identity_provider values denotes different actors. |
| R26-A11-02 | Same actor_id, one identity provider absent (distinct) | admit; distinct actors | identity_provider values must be equal or both absent; one absent means different actors. |
| R26-A11-03 | Alias policy merges two references; one proposes and the other reviews | refuse, `GKOS-GATE-L5-005`; same actor: true | A versioned policy declaration merges the two references, so proposer and reviewer are the same actor. |
| R26-A11-04 | Class-only proposer value human | refuse, `GKOS-GATE-L5-005`; same actor: undetermined | A class-only value does not identify an actor, so distinctness cannot be determined and the check fails closed. |
| R26-A11-05 | Control: same actor_id and same identity provider (same) | refuse, `GKOS-GATE-L5-005`; same actor: true | Equal actor_id and equal identity_provider denote the same actor. |
| R26-A11-06 | Control: same actor_id, both identity providers absent (same) | refuse, `GKOS-GATE-L5-005`; same actor: true | Equal actor_id with both identity_provider values absent denotes the same actor. |

Each case also lists its requirement IDs in `cases.json`.

## Reference runner after integration

Integration branch `work/v083-r26-implementation` (worker I2). Before is the
runner on `main` `8c20b05`; after is the integrated runner. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

`conformance/runner/actor-identity.mjs` applies the R26-A11 sameness rule:
equal `actor_id` and equal or both-absent `identity_provider`, merged
(transitively) by `same_actor_declarations` in a policy with a component
identity and version. A class-only value, or a declaration that cannot be
read, is undetermined and refuses with GKOS-GATE-L5-005.

- Before (`review-independence` over `actor_id`): 2 of 6; cases 01 to 04
  differ.
- After: 6 of 6.
