# PR #42 GKOS-XW-002 bounded corrected-head verification — 2026-10-07

Task `PR42-XW002-FABLE-20261001` (bounded verification requested by Astra-Oden on 2026-10-01). This record verifies that the corrections at the exact head implement the dispositions of the [October 1 Fable review](PR42_XW002_FABLE_REVIEW_20261001.md). It does not repeat the full 62-row review, and it adopts no mapping.

**Verdict: `PASS`.** All prepared corrections F-001 through F-016 are present at the corrected head, match their recorded disposition, and agree with the NIST AI 100-1 source text. No new finding. The owner accepted the three MAJOR findings on 2026-10-07 (see the [correction disposition](PR42_XW002_CORRECTION_DISPOSITION_20261001.md)).

## Coordinates

| Field | Value |
| --- | --- |
| Reviewer | Fable-FAC (Claude Opus 5.5, Claude Code desktop on the FAC workstation) |
| Start / end | 2026-10-07T14:17:16Z / 2026-10-07T14:24:00Z |
| Verified head | `0a09875904249633c5ae60fa38893386ad176cbb`, tree `6d0733d56a5d6cbfc7206b2aeb82fea46d20dfcd` |
| Previous reviewed head | `37cab1fcb3b3902d9efa4abe737bdf452a624b9d` |
| Base | `main` `b308ff7137bdbb109c31f0ace7e6c49b8988e0d5` |
| External source | NIST AI 100-1 PDF retrieved 2026-10-07 from `nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf`, SHA-256 `7576edb531d9848825814ee88e28b1795d3a84b435b4b797d3670eafdc4a89f1`. This is byte-identical to the copy used on October 1. Core Tables 1–4 (PDF pages 27–38) were extracted with `pdftotext -layout`. |
| Non-authorship | Fable-FAC authored and committed none of the corrections (`37cab1f..0a09875`, by Astra-Oden as executor). It authored the October 1 review whose findings are being verified. |
| Independence limit | Same owner and agent fleet. This is a bounded different-model verification, not an organizationally independent assessment. |

## Checks performed

| Check | Result |
| --- | --- |
| `python -m unittest discover -s scripts/xw002 -p "test_*.py"` | 12 tests, OK |
| `python scripts/xw002/gen.py --check` | PASS; prose and JSON are generated from `scripts/xw002/rows.py` |
| Row population (`rows.ROWS`) | 62 rows, unique IDs; DEC 5 / CON 24 / DD 3 / NDM 29 / SUP 1 |
| Stated distribution in the crosswalk and the request | Matches the row population |
| `git diff --stat 37cab1f..0a09875` | 7 files: crosswalk prose, generated JSON, generator note, disposition record, the two preserved review copies, `rows.py`. No requirement, allocation, profile, gate code, ISO Annex A mapping or runner change. |
| Removed claims (`grep`) | "honest disclosure of what was not measured" and "MANAGE 3 (beyond bounded delegation)" are absent from prose, JSON and generator |

## Corrections against the source

The source column quotes or closely paraphrases NIST AI 100-1 Core Tables at the hash above.

| Finding | Row or passage at `0a09875` | Source text | Result |
| --- | --- | --- | --- |
| F-001 | DELEGATION-001, AUTHUSE-004, REVIEW-003: DEC / GOVERN 3.2 only | GOVERN 2.1: organization-wide roles, responsibilities and lines of communication for AI risk. GOVERN 3.2: policies and procedures that differentiate roles for human-AI configurations and oversight | Verified |
| F-002 | RECEIPT-003: CON / MEASURE 2.8. AUTHUSE-002: CON / MEASURE 2.7. CONTEXT-002/003: NDM | MEASURE 2.5: the deployed AI system is demonstrated valid and reliable, with generalization limits documented | Verified |
| F-003 | CANON-007: NDM | — | Verified |
| F-004 | §4.3 MEASURE 2.8 evidence-supply caveat | MEASURE 2.8: transparency and accountability risks identified in MAP are examined and documented | Verified (present since `37cab1f`) |
| F-007 | PROFILE-005: CON / MEASURE 2.1; MEASURE 2.5 named only as not demonstrated | MEASURE 2.1: test sets, metrics and tool details used during TEVV are documented | Verified |
| F-008 | CONTEXT-001: CON / MEASURE 2.8; MAP 1.1 named only as not documented | MAP 1.1: intended purposes, context and prospective deployment settings of the AI system are understood and documented | Verified |
| F-009 | DELEGATION-003: CON / GOVERN 3.2, conditional on the checker being an AI component | GOVERN 3.2 as above | Verified; the condition is narrower than proposed, which is acceptable |
| F-010 | POLICY-001: DD / GOVERN 1.4; GOVERN 1.2 not retained | GOVERN 1.4: risk-management process and outcomes established through transparent policies, procedures and controls based on organizational risk priorities | Verified |
| F-011 | §4.3 first paragraph no longer claims disclosure of what was not measured | MEASURE 1.1 is not mapped by any row | Verified |
| F-012 | §4.4 security row: "A hash construction or access-control rule alone, without refusal or evaluation evidence linked to an identified risk, is insufficient." | — | Verified (wording as recommended) |
| F-013 | Unmapped list reads "MANAGE 3" in prose and JSON | MANAGE 3: third-party resource risks | Verified |
| F-014 | MAP 3.5 not added to REVIEW-001/-003 | MAP 3.5: processes for human oversight are defined, assessed and documented | Accepted reasoning; optional item |
| F-015, F-016 | REENTRY-004 retained; October 1 check preserved | — | Verified |
| F-005, F-006 | Drafting-model uncertainty preserved; main integration | — | Unchanged since `37cab1f` |

Residual references to removed subcategories are either explanatory negations (MAP 1.1 in PROFILE-003, EFFECT-001 and CONTEXT-001) or conditional guidance (GOVERN 2.1 in the §4.4 role row, "only where documented responsibilities have a defensible organizational risk-management nexus"). No row maps them.

## Limits

- The JSON `disposition` field still reads "PROPOSED — owner/reviewer disposition required; no row adopted by appearance". Accepting findings does not adopt the crosswalk. Adoption happens by owner merge, and the field may be updated then.
- Hosted CI on the exact head is recorded in the PR, not re-run here. This verification adds no conformance, alignment, certification, endorsement or regulatory claim.
