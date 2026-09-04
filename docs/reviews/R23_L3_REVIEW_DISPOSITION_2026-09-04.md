# R23 different-model-family review disposition

**Date:** 2026-09-04

**Review:** `R23-REV-2026-09-04-CLAUDE-01`

**Reviewed head:** `792c6355fe8e78955ad829a3455be1e78c0b0a33`

**Reviewer verdict:** HOLD

**Owner disposition:** Accept `R23-REV-001` through `R23-REV-015` with the narrowing recorded below; adopt design rulings D1A, D2A, D3A.

**Standing:** Development correction authority for Proposed R23 only. This does not adopt R23, amend published v0.81, publish v0.82, qualify a profile, close `EAR-GRAPH-001..003`, declare interoperability or independence, activate MCP/A2A/ACS, release a product, authorize governed effects, or establish certification standing.

## Owner design rulings

### D1A — URI classification

`gkos_uid` is intrinsically identity-bearing. A URI is identity-bearing only when the applicable GKOS release or a declared extension contract identifies that URI form as a governed identifier. Otherwise the URI is a locator. Alias, path, basename, and ordinary wikilink forms are locators.

### D2A — relation properties

Portable semantic properties such as `directed`, `inverse_of`, `symmetric`, `antisymmetric`, `acyclic`, `branching_permitted`, and `target_resolution_required` belong to a relation-type registry/contract. Individual assertion records reference the relation type and do not independently redefine those properties.

### D3A — provisional core namespace

The R23 candidate reserves `gkos` for the provisional Standard-defined semantic core. This is a candidate namespace rule for R23 development and does not settle a future stable URI namespace strategy. Extensions use another declared namespace/contract and must not masquerade as core.

## Finding dispositions

| Finding | Reviewer severity | Owner disposition | Required correction |
| --- | --- | --- | --- |
| R23-REV-001 | BLOCKING | ACCEPT | Replace the case-name catalog with executable schema-valid portable fixtures carrying exact inputs, canonical expected meaning, expected class, mismatch classification, requirement references, standing, migration/adversarial coverage, and deterministic validation. |
| R23-REV-002 | MAJOR | ACCEPT_WITH_NARROWING | Reserve provisional `gkos` core namespace; enumerate a minimal candidate core; move semantic properties to a relation-type registry/contract under D2A; reject undeclared core-namespace relations. |
| R23-REV-003 | MAJOR | ACCEPT | State directly that core `gkos:supersedes` is directed and acyclic and that cycles are diagnosed without deleting evidence. |
| R23-REV-004 | MAJOR | ACCEPT | Bind any active-head policy to explicit policy identity/version and preserve the unconditional ban on timestamp, UUID, lexical, and path ordering as authority selectors. |
| R23-REV-005 | MAJOR | ACCEPT_WITH_NARROWING | Apply D1A; make resolution state per-reference and fail-safe; define ambiguous as unresolved-with-multiple-candidates; prohibit live retrieval during deterministic evaluation; make target-resolution requirements relation-type properties. |
| R23-REV-006 | MAJOR | ACCEPT_WITH_NARROWING | Distinguish asserted records from derived projections and namespace-qualify inverse relations. A transient/cache/index projection rebuild is not by itself a governed state change; commitment of derived material into governed state remains subject to applicable state-change and receipt requirements. |
| R23-REV-007 | MAJOR | ACCEPT_WITH_NARROWING | Define exact replay as same governed record identity plus identical canonical content. Same identifier with different canonical content is a collision and must not overwrite/merge; fail closed where resolution is required. Do not impose a new UUID shape beyond controlling identity requirements. |
| R23-REV-008 | MAJOR | ACCEPT | Make comparator fail closed for missing expected meaning, duplicate result IDs, and self-declared allowed variation; derive allowed variation from fixture authority only; use cause-neutral divergence classification until adjudicated. |
| R23-REV-009 | MINOR | ACCEPT | Carry contradiction, correction, supersession, rejection, withdrawal, deletion, and governed erasure explicitly in preservation and comparator principles. |
| R23-REV-010 | MINOR | ACCEPT | Reuse current GKX shared definitions where applicable; type actor/evidence references; constrain incompatible relation properties in the relation registry. |
| R23-REV-011 | MINOR | ACCEPT | Narrow migration rules: reconstruct only from retained evidence; otherwise mark incomplete; legacy unresolved state remains unresolved; preserve historical record identity; treat wikilinks as locators; document existing GKX mappings. |
| R23-REV-012 | MINOR | ACCEPT | Replace “committee recommendations” with advisory preparation-review wording; no consensus committee is implied. |
| R23-REV-013 | MINOR | ACCEPT | Harden comparator execution and tests; incomplete/divergent evidence is non-success for the provisional comparator. Generalize result-set handling where practical without making multi-implementation independence claims. |
| R23-REV-014 | EDITORIAL | ACCEPT | Make R23 property-vocabulary wording match the closed candidate relation registry. |
| R23-REV-015 | EDITORIAL | ACCEPT | Use a portable CLI path-to-file URL comparison and normalize the R23 Decision Register heading level. |

## Correction gate

Accepted corrections must be applied on the existing R23 preparation branch. After correction:

1. freeze one successor exact head;
2. run the provisional Layer-3 deterministic tests plus the full runner test/lint path;
3. require the normal hosted repository checks on that exact head;
4. preserve a corrected-head verification record mapping every accepted finding to changed files and tests;
5. keep `EAR-GRAPH-001..003` at DRAFTING until the separately required implementation evidence exists; and
6. return Proposed R23 for owner `ACCEPT / CORRECT / REJECT` only after no blocking or major review finding remains uncorrected.

The owner dispositions `1B, 2A, 3B, 4B, 5B, 6B` remain controlling and are not reopened by this review disposition.
