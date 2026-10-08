# R26-A02 — Effect-scope containment

Development fixtures for the v0.83 development line, accepted under R26
(accepted in part 2026-10-07). These fixtures are non-qualifying and support no conformance claim.

Tests the containment evaluation added to the Authority and Refusal Receipt Fields annex §5.1: the presence check, the per-row containment table, chain-order evaluation and `action_class` membership. Owner answer Q2 confirmed the reversibility order, the reading of `layer_reach`, the deployment-declared sensitivity order and the presence rule.

**Requirement IDs:** `GKOS-EFFECT-001`, `GKOS-EFFECT-002`, `GKOS-EFFECT-003`.

**Evaluation:** Containment. `conformance/runner/effect-containment.mjs` (`evaluateEffectContainment`) takes the requested scope, the authorizing scopes in chain order and the digest-bound policy inputs (required dimensions, effect-class inclusions, resource-matching predicates, sensitivity order). It runs the presence check first, then the containment table, and reports GKOS-GATE-L7-003 for an unknown or incomparable dimension and GKOS-GATE-L7-002 for a comparable dimension that is not contained. The boolean gate kind `effect-containment` in `gate-evaluator.mjs` is unchanged.

## Cases

| Case | Title | Expected | Reason |
| --- | --- | --- | --- |
| R26-A02-01 | effect_class equal | admit | Table row `effect_class`. |
| R26-A02-02 | effect_class included by a declared policy inclusion | admit | Table row `effect_class`. |
| R26-A02-03 | effect_class different, no declared inclusion | refuse, `GKOS-GATE-L7-002` | Table row `effect_class`. |
| R26-A02-04 | resources: each member of R equals a member of A | admit | Table row `resources`. |
| R26-A02-05 | resources: member matched by a digest-bound policy predicate | admit | Table row `resources`. |
| R26-A02-06 | resources: R names a resource outside A | refuse, `GKOS-GATE-L7-002` | Table row `resources`. |
| R26-A02-07 | environment equal | admit | Table row `environment`. |
| R26-A02-08 | environment different | refuse, `GKOS-GATE-L7-002` | Table row `environment`. |
| R26-A02-09 | audience: R is a subset of A | admit | Table row `audience`. |
| R26-A02-10 | audience: R names a recipient outside A | refuse, `GKOS-GATE-L7-002` | Table row `audience`. |
| R26-A02-11 | sensitivity_ceiling below A under a declared order | admit | Table row `sensitivity_ceiling`. |
| R26-A02-12 | sensitivity_ceiling above A under a declared order | refuse, `GKOS-GATE-L7-002` | Table row `sensitivity_ceiling`. |
| R26-A02-13 | sensitivity_ceiling: different labels, no declared order | refuse, `GKOS-GATE-L7-003` | Table row `sensitivity_ceiling`. |
| R26-A02-14 | sensitivity_ceiling: equal labels, no declared order | admit | Table row `sensitivity_ceiling`. |
| R26-A02-15 | valid_from/valid_until: R window inside A window | admit | Table row `valid_from, valid_until`. |
| R26-A02-16 | valid_from/valid_until: R window ends after A window | refuse, `GKOS-GATE-L7-002` | Table row `valid_from, valid_until`. |
| R26-A02-17 | layer_reach: R at or below A | admit | Table row `layer_reach`. |
| R26-A02-18 | layer_reach: R above A | refuse, `GKOS-GATE-L7-002` | Table row `layer_reach`. |
| R26-A02-19 | reversibility: reversible within compensable | admit | Table row `reversibility`. |
| R26-A02-20 | reversibility: irreversible beyond compensable | refuse, `GKOS-GATE-L7-002` | Table row `reversibility`. |
| R26-A02-21 | maximum_affected_count: R at or below A | admit | Table row `maximum_affected_count`. |
| R26-A02-22 | maximum_affected_count: R above A | refuse, `GKOS-GATE-L7-002` | Table row `maximum_affected_count`. |
| R26-A02-23 | Presence: policy requires audience; A states it; R omits it | refuse, `GKOS-GATE-L7-003` | audience is applicable because the policy requires it; it is absent from R, so it is unknown. |
| R26-A02-24 | Presence: policy requires audience; R states it; A omits it | refuse, `GKOS-GATE-L7-003` | audience is applicable because the policy requires it; it is absent from A, so it is unknown. An absent dimension is never read as unlimited in A. |
| R26-A02-25 | Presence: policy requires audience; neither scope states it | refuse, `GKOS-GATE-L7-003` | audience is applicable because the policy requires it; absent from both scopes, so it is unknown. |
| R26-A02-26 | Presence: no policy requirement; A states maximum_affected_count; R omits it | refuse, `GKOS-GATE-L7-003` | maximum_affected_count is applicable because A states it; it is absent from R, so it is unknown, never read as not requested. |
| R26-A02-27 | Presence: no policy requirement; neither scope states audience; every other dimension contained | admit | audience is neither stated nor required, so it is not applicable and not evaluated. |
| R26-A02-28 | Delegation chain: derived grant widens its predecessor | refuse, `GKOS-GATE-L7-002` | R is contained in every scope, but the leaf grant names res:c, which its predecessor does not grant. Each derived grant's scope MUST be contained in its predecessor's scope. |
| R26-A02-29 | Authorized Use Record action_class outside the grant | refuse, `GKOS-GATE-L7-002` | record-delete is not a member of the leaf receipt's permitted_action_classes. |

Each case also lists its requirement IDs in `cases.json`.

## Reference runner wave 2 and review corrections

Worker I3 on `work/v083-r26-implementation`. Before is the runner on `main`
`8c20b05`; after is the runner at the I3 head. Catalog rows:
`fixtures/development/r26/fixtures.manifest.json`; executed by
`conformance/runner/test/r26-catalog.test.mjs`.

- Before: NOT_MODELED (0 of 29 evaluable). The base runner's
  `effect-containment` gate takes precomputed booleans, not scope records.
- After: 29 of 29.
- The runner evaluates `prefix` resource-matching semantics only. A matcher
  with other semantics, or one that is not digest-bound, leaves the resource
  incomparable (GKOS-GATE-L7-003). Policy inputs without a digest-bound
  `policy_ref` are not used and the evaluation fails closed.
- `layer_reach` is read as the highest layer an effect may change (owner
  answer Q2); the annex states that meaning under an R26-A02 marker.

## Second-round review correction (r26-REV-011)

Worker I4 on `work/v083-r26-implementation`. A dimension the governing policy
declares required is applicable (§5.1). The runner previously filtered the
declaration through the dimensions it knows, so an unknown required dimension
vanished and a malformed declaration was read as none. Now an unsupported
required dimension is unknown, and a declaration that is not a list of
dimension names is unknown: both fail closed with GKOS-GATE-L7-003.

| Case | Title | Expected | Reason |
| --- | --- | --- | --- |
| R26-A02-30 | Policy requires `custom-required` | refuse, `GKOS-GATE-L7-003` | Reviewer mutation. A required dimension GKOS does not define cannot be compared; it is unknown, never dropped. |
| R26-A02-31 | `required_dimensions` is `null` | refuse, `GKOS-GATE-L7-003` | A declaration that is not a list fails closed. |
| R26-A02-32 | `required_dimensions` is one string | refuse, `GKOS-GATE-L7-003` | A declaration that is not a list fails closed. |
| R26-A02-33 | `required_dimensions` holds a non-text entry | refuse, `GKOS-GATE-L7-003` | An entry that is not a dimension name fails closed. |
| R26-A02-34 | Policy requires `environment` and `colour` | refuse, `GKOS-GATE-L7-003` | Every supported dimension is contained, but the unsupported required one fails closed. |

- Before (runner at `f0f189a`): 30 to 34 admitted (fail). Before (`main`
  `8c20b05`): NOT_MODELED.
- After: 34 of 34.
