# PR #42 GKOS-XW-002 bounded different-model-family review packet

- **Packet ID:** GKOS-PR42-XW2-REVIEW-001
- **Status:** prepared for execution; no review result claimed
- **Prepared:** 2026-09-04
- **Target:** exact PR #42 head at review execution time
- **Base:** `main` at the PR merge base
- **Authority:** R21 informative ecosystem review control; bounded-review precedent in `docs/ecosystem/REVIEW_DISPOSITION_REGISTER.md`
- **Drafting/adjudication path:** GPT-5.6 Sol plus owner-supplied draft materials; the reviewer must be from a different model family and must not have authored this candidate

## Purpose

This packet defines the sealed inputs, falsification questions, finding format, and completion condition for a bounded review of the proposed `GKOS-XW-002 v0.2-draft` NIST AI RMF 1.0 crosswalk. It does not perform the review and does not establish organizationally independent conformance verification, certification, alignment, or regulator standing.

The review is intentionally limited to the informative crosswalk and its public claim boundary. ISO/IEC 42001 Annex A remains verification-held unless the owner separately establishes legitimate access to and review of the final licensed ISO/IEC 42001:2023 text.

## Reviewer identity requirements

Record before substantive review:

- provider;
- model family;
- exact model/version identifier where available;
- reviewer instance or session identifier where available;
- operator/orchestration identity;
- review start and completion times;
- exact PR #42 head SHA and tree;
- exact base SHA;
- tools and external-source access available;
- unavailable sources or limitations;
- statement establishing why the reviewer is from a different model family than the drafting/adjudication path;
- statement establishing that the reviewer did not author the reviewed candidate.

Different model family alone does not establish organizational independence or conformance-assessor independence.

## Sealed PR-head inputs

Review the exact PR-head versions of:

- `docs/GKOS_ISO42001_NIST_AIRMF_CROSSWALK.md`;
- `docs/ecosystem/EXTERNAL_CROSSWALK.json`;
- `docs/ecosystem/EXTERNAL_SOURCE_REGISTER.md`;
- `scripts/xw002/rows.py`;
- `scripts/xw002/gen.py`;
- `README.md`;
- `.lycheeignore`;
- `.github/workflows/xw002-consistency.yml`;
- this review packet.

Also inspect the controlling repository sources:

- `docs/implementation/V081_PUBLICATION_BINDING.md`;
- `requirements/REGISTRY.md` in full;
- `decisions/R21_Ecosystem_Interoperability_Program_Development_Decision_Record.md`;
- `docs/ecosystem/REVIEW_DISPOSITION_REGISTER.md`;
- `docs/GKOS_PROVENANCE_LANDSCAPE_CROSSWALK.md` for adjacent crosswalk posture;
- the current README claim and maturity boundaries.

External source required for the NIST review:

- NIST AI 100-1, *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, January 2023, DOI `10.6028/NIST.AI.100-1`, especially Core Tables 1–4.

Do not derive ISO/IEC 42001 Annex A identifiers, titles, or mappings from secondary sources. For this PR, verify only that the ISO mapping is held and no Annex A rows are emitted.

## Required review questions

The reviewer must attempt to falsify the candidate and answer all questions below.

1. Is the GKOS baseline pinned to the published v0.81 source coordinate rather than current `main`?
2. Does `ESR-NIST-AIRMF` accurately identify NIST AI 100-1, its date/DOI, reviewed Core scope, voluntary/outcome-framework status, and re-review trigger without claiming NIST adoption of GKOS?
3. Does the crosswalk correctly avoid the NIST relationship verbs `satisfies`, `discharges`, `completes`, `conforms`, and `aligns` as adequacy claims?
4. Are the relationship classes — Direct evidence candidate, Contributes, Deployment-declared, No direct mapping, Superseded — defined narrowly enough that an artifact mapping cannot be mistaken for organizational AI RMF implementation?
5. Does every one of the 62 permanent registry allocations appear exactly once in the NIST table/JSON, with no Engine diagnostic code substituted for a Standard requirement ID?
6. For **each mapped row**, does the exact GKOS requirement text have a defensible nexus to every cited AI RMF subcategory? Identify any row that relies only on family resemblance or analogy.
7. For every `Direct evidence candidate` row, is the artifact direct evidence of the cited outcome rather than merely useful implementation detail? Downgrade where necessary.
8. For every `Deployment-declared` row, does GKOS actually mandate the record/hook while leaving substantive policy, legal basis, threshold, or risk tolerance to the adopting organization?
9. Are all `No direct mapping` rows defensible, and are there any additional technical-only requirements that should be downgraded rather than mapped for coverage density?
10. Is MANAGE 2.4 correctly absent from current mappings unless a requirement actually concerns AI-system supersession, disengagement, or deactivation due to performance/outcome inconsistency?
11. Is MANAGE 4.3 correctly absent because none of the 62 current requirements is itself an incident/error communication record?
12. Is MEASURE 1.3 correctly absent from general conformance or proposal-review rows unless the requirement itself establishes regular AI-system assessment?
13. Are GOVERN 2.1 and GOVERN 3.2 used only where the requirement genuinely documents roles/responsibilities or human-AI role differentiation?
14. Are MEASURE 2.7 mappings limited to security/resilience or integrity evidence rather than generic canonicalization?
15. Are MEASURE 2.8 mappings genuinely about transparency/accountability risk evidence rather than a catch-all for technical traceability?
16. Are MEASURE 2.9 mappings limited to explanation/interpretation-relevant presentation rather than generic human-readable serialization?
17. Are MAP 1.1 mappings tied to intended purpose/context and not merely artifact scope? Is MAP 1.6 correctly excluded from context capture alone?
18. Does §4.3 clearly identify material RMF outcomes GKOS does not substantively implement, without falsely claiming GKOS cannot record related deployment evidence?
19. Does the anti-bloat sentence and §4.4 control rule prevent automatic family-wide assignments and discourage inventing GKOS requirements for mapping coverage?
20. Does the machine-readable mirror match the reviewed row source and prose table, and does `python scripts/xw002/gen.py --check` pass?
21. Does the JSON emit the ISO baseline as `verification-held` with no ISO mapping rows?
22. Does the README link preserve the existing NIST/ISO non-endorsement disclaimer without converting the crosswalk into a README alignment claim?
23. Does the ISO hold language avoid reproducing unverified or licensed Annex A content and require legitimate final-text review before release?
24. Is any sentence likely to be quoted out of context as NIST/ISO endorsement, GKOS certification, regulatory compliance, or proof that an organization has implemented AI RMF 1.0?

## Mandatory row-review output

The reviewer must produce a 62-row disposition table with one row per `requirements/REGISTRY.md` allocation:

`GKOS ID | Candidate mapping | Reviewer disposition | Evidence / AI RMF subcategory checked | Finding ID if changed`

Reviewer disposition vocabulary:

- `ACCEPT` — candidate class and subcategory set are defensible as written;
- `DOWNGRADE` — reduce class strength or remove one or more subcategories;
- `REMAP` — different subcategory or class is better supported;
- `NO_DIRECT_MAPPING` — no defensible RMF outcome nexus;
- `SUPERSEDED_CONFIRMED` — current registry supersession treatment is correct;
- `HOLD` — external text or controlling GKOS evidence is insufficient.

The reviewer must not increase mapping strength merely because a higher-coverage crosswalk is desirable.

## Required adversarial checks

Attempt to identify at least:

- a technical GKOS rule incorrectly mapped to an organizational outcome;
- a `Direct evidence candidate` that is only partial support;
- a `Contributes` row that should be No direct mapping;
- a role-separation row that does not truly satisfy the human-AI role-differentiation nexus;
- a refusal row incorrectly characterized as AI-system deactivation;
- a receipt row incorrectly characterized as incident communication;
- a canonicalization row incorrectly characterized as security evaluation;
- an explanation mapping that is only serialization/readability;
- an RMF subcategory omitted from a row where the nexus is materially stronger than the current mapping;
- a sentence that can be misread as NIST/ISO endorsement, conformity, alignment, certification, or compliance;
- any ISO Annex A content that escaped the verification hold;
- any drift among prose table, `rows.py`, JSON mirror, or stated distribution/digests.

## Finding format

Use IDs `PR42-XW2-REV-F-001` upward. These are review identifiers, not GKOS requirement or diagnostic IDs.

For each finding record:

- severity: `BLOCKING`, `MAJOR`, `MINOR`, or `OBSERVATION`;
- affected file/section and requirement row where applicable;
- exact claim or short excerpt;
- controlling GKOS requirement and external NIST subcategory checked;
- explanation;
- proposed replacement text/mapping or disposition.

## Required verdict

Return exactly one:

- `PASS` — no blocking or major correction required;
- `PASS_WITH_CORRECTIONS` — candidate may proceed only after listed corrections and verification;
- `HOLD` — unresolved evidence or authority prevents approval;
- `REFUSE` — material claim-boundary or integrity defect requires reconstruction.

## Owner disposition requirement

Every `BLOCKING` or `MAJOR` finding must receive an explicit owner disposition:

- `ACCEPT`;
- `ACCEPT_WITH_MODIFICATION`;
- `REJECT_WITH_EVIDENCE`;
- `DEFER`.

A deferred blocking finding prevents merge.

Any accepted correction changes the PR head. The corrected head must rerun `python scripts/xw002/gen.py --check`, the hosted CI checks, and a bounded corrected-head verification sufficient to confirm the accepted changes without silently carrying an old review verdict forward.

## Prohibited conclusions

The reviewer must not claim that this bounded review establishes:

- independent GKOS conformance verification;
- profile qualification;
- ISO/IEC 42001 or NIST AI RMF conformity/alignment;
- certification or accreditation;
- NIST, NCCoE, ISO, or regulator approval;
- legal or regulatory compliance;
- production deployment or action authority.

## Completion condition

The review gate is complete only when reviewer identity, exact input SHA/tree, all 62 row dispositions, findings, verdict, source-access limitations, owner dispositions, correction verification, final reviewed head, and deterministic/hosted check results are preserved in the repository or PR record.
