# R23 corrected-head verification

**Date:** 2026-09-04

**Standing:** Verification evidence for Proposed R23 only. This record does not adopt R23, publish v0.82, qualify a profile, close `EAR-GRAPH-001..003`, establish independent interoperability, activate MCP/A2A/ACS, authorize governed effects, or establish certification standing.

**Original reviewed head:** `792c6355fe8e78955ad829a3455be1e78c0b0a33`

**Reviewer:** Anthropic Claude / `claude-fable-5-1` configured identifier

**Reviewer verdict:** `HOLD`

**Owner disposition:** accept `R23-REV-001..015` with recorded narrowing; `D1A`, `D2A`, `D3A`

**Corrected candidate head verified by hosted checks:** `c500251fdf8f99cdf7c2138da1e7b32ee37cfeeb`

## Finding-to-correction map

| Finding | Disposition | Correction evidence |
| --- | --- | --- |
| R23-REV-001 | ACCEPT | `fixtures/provisional/l3-interoperability/cases.json` now contains 23 executable fixture cases with exact inputs, declared schema validity, expected class, expected portable meaning, mismatch authority, requirement refs, and migration/adversarial cases; `l3-interoperability-provisional.test.mjs` validates their structure and schema behavior. |
| R23-REV-002 | ACCEPT_WITH_NARROWING | Proposed R23 reserves provisional `gkos`; `l3-relation-registry-0.1-proposed.json` enumerates the core; records reference relation types instead of redefining properties; record schema rejects unlisted `gkos` relation names. |
| R23-REV-003 | ACCEPT | R23-005 and the relation registry declare `gkos:supersedes` directed and acyclic; fixture L3I-08 exercises the prohibited-cycle expectation. |
| R23-REV-004 | ACCEPT | R23-006 preserves the unconditional prohibition on timestamp/UUID/lexical/path authority selection and requires exact policy identity/version plus recorded selecting inputs. |
| R23-REV-005 | ACCEPT_WITH_NARROWING | D1A is explicit in R23-004; reference resolution state is per-reference and required; ambiguous references require multiple candidate IDs; live external retrieval is prohibited during deterministic evaluation merely to force resolution. |
| R23-REV-006 | ACCEPT_WITH_NARROWING | Record schema distinguishes `asserted` and `derived_projection`; derived projections require source identity and cannot carry independent actor/evidence standing; R23 preserves receipt obligations when derived material is committed into governed state. |
| R23-REV-007 | ACCEPT_WITH_NARROWING | R23-003 defines exact replay as same identity plus identical canonical content and requires fail-closed collision handling; fixture L3I-19 covers same-ID/different-content collision. |
| R23-REV-008 | ACCEPT | Comparator rejects duplicate IDs, fails closed on missing portable meaning, derives allowed variation from fixture authority only, and uses cause-neutral meaning-divergence classification. |
| R23-REV-009 | ACCEPT | R23 cross-cutting and comparator text explicitly preserves contradiction, correction, supersession, rejection, withdrawal, deletion, and governed erasure. |
| R23-REV-010 | ACCEPT | Record schema reuses GKX shared actor, epistemic-state, and canonical-timestamp definitions; actor/evidence references are typed; relation properties moved to the candidate relation registry. |
| R23-REV-011 | ACCEPT | Migration notes prohibit invented facts, preserve record identity, default unevidenced legacy resolution to unresolved, classify wikilinks as locators, and preserve GKX actor/epistemic meanings. |
| R23-REV-012 | ACCEPT | Work packet now says advisory preparation recommendations and expressly disclaims a formal committee/consensus implication. |
| R23-REV-013 | ACCEPT | Comparator accepts two or more result sets, exits non-success for incomplete/divergent evidence, and tests cover missing meaning, self-reported variation, duplicate IDs, and N-result comparison. |
| R23-REV-014 | ACCEPT | R23 property-vocabulary wording is now closed and points to the candidate relation-type registry. |
| R23-REV-015 | ACCEPT | Comparator uses `pathToFileURL`; Decision Register heading hierarchy is normalized so proposal/accepted entries are children of their respective sections. |

## Deterministic verification at corrected candidate head

Hosted Conformance runner run `303` executed the repository's `npm test` path on the corrected candidate. The Node 24 Ubuntu job reported:

- `123` tests;
- `123` passed;
- `0` failed;
- registry lint `PASS`;
- R23-specific tests passed for executable fixture completeness, declared schema validity, candidate relation registry, missing portable meaning, cause-neutral meaning divergence, fixture-authorized variation, rejection of self-reported variation, duplicate result IDs, more-than-two result sets, and two-result deterministic compatibility.

The same conformance workflow also completed its blocking Ubuntu Node 22/24, Windows Node 22/24, dependency-audit, and informative Node 23 jobs successfully.

## Hosted checks at corrected candidate head

All normal hosted checks completed successfully at `c500251fdf8f99cdf7c2138da1e7b32ee37cfeeb`:

- Conformance runner — PASS, run `303`;
- Markdown lint — PASS, run `423`;
- Link check — PASS, run `423`;
- Release checksums — PASS, run `423`;
- Release validation — PASS, run `423`.

Release validation preserved the active/published-release boundaries; no v0.81 release package or tag was rewritten by this correction tranche.

## Residual standing

No accepted blocking or major reviewer finding remains unaddressed in the corrected candidate artifacts. This is not yet final interoperability closure: `EAR-GRAPH-001..003` remain `DRAFTING`, and at least two implementation result sets are still required before those ambiguities can be closed under the current R23 gate.

The commit adding this verification record becomes a successor exact head and must itself rerun the normal hosted checks before Proposed R23 is presented for owner `ACCEPT / CORRECT / REJECT`.
