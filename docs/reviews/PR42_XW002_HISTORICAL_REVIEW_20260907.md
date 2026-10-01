---
created_at: 2026-09-07T15:29:11.239Z
updated_at: 2026-09-08T06:23:28.089Z
---
# PR #42 GKOS-XW-002 bounded different-model-family review — result

- **Packet:** GKOS-PR42-XW2-REVIEW-001
- **Review date:** 2026-09-07
- **Reviewed head:** `f1b7c5510f788e4db2799c050e75a022edd0bacc` (tree `5b833fe71c967576ce3ee885f0a28acc8bde0331`)
- **Base (merge-base with `main`):** `765c081523ec24fae0b462b1c221ea2033c52970`
- **Candidate:** GKOS-XW-002 v0.2.1-draft

## Reviewer identity

- Provider: Anthropic. Model family: Claude. Model: Claude Fable 5.1 (served in the claude.ai mobile app; session identifier not exposed).
- Operator: Shaun "Oden" Marshall (owner), interactive session.
- Different-model-family statement: the drafting/adjudication path recorded in the packet and the corrective assessment is OpenAI (GPT-5.6 Sol; Codex editor). The reviewer is a Claude model. It did not author any file in this PR.
- Independence caveat: different model family only. This is not organizationally independent conformance assessment and establishes none of the conclusions prohibited by the packet.
- Tools: shallow git fetch of PR head, tag `v0.81`, and commit `8f2a158…`; Python 3 execution of `gen.py --check` and the unittest suite; file inspection.
- Source-access limitations: GitHub REST API was rate-limited; PR title/description/comments were not read. NIST AI 100-1 was not fetched in this session — subcategory wording was checked from the reviewer's knowledge of the January 2023 Core, not a live copy. ISO/IEC 42001 text not accessed (correctly not required).

## Mechanical checks (all verified by execution)

| Check | Result |
| --- | --- |
| `python scripts/xw002/gen.py --check` | PASS |
| `python -m unittest discover -s scripts/xw002 -p "test_*.py"` | 12 tests, OK |
| Pin: tag `v0.81` resolves to `8f2a158c…` | confirmed |
| `requirements-v081.md` sha256 == `requirements/REGISTRY.md` @ `8f2a158` == @ PR head == JSON `requirement_registry_sha256` | all `c0d8b5fa…` — match |
| 62 registry IDs, 62 rows, 62 unique, symmetric difference empty | confirmed |
| Stated distribution 5/26/3/27/1 vs `rows.py` | match |
| JSON `external_baselines.iso_42001.status` | `verification-held`, no rows |
| Prohibited adequacy verbs (satisfies/discharges/completes/conforms/aligns) | appear only in negations and §7 prohibitions |
| Engine diagnostic codes in table | none found |
| README / ecosystem README / NIST add-in edits | disclaimer preserved; crosswalk marked candidate, review gate named |
| CI workflow | runs both checks on PR and push to the relevant paths |

## Findings

**PR42-XW2-REV-F-001 — MAJOR — GOVERN 2.1 retained inconsistently with the crosswalk's own rule.**
Rows: `GKOS-DELEGATION-001`, `GKOS-AUTHUSE-004`, `GKOS-REVIEW-003` (all Direct evidence candidate, GOVERN 2.1 + GOVERN 3.2).
GOVERN 2.1 concerns roles, responsibilities and lines of communication for mapping, measuring and managing AI risk at the organizational level. These three requirements differentiate per-action actor roles (propose / review / authorize / execute) and bound delegation — that is exactly GOVERN 3.2 (human-AI configuration and oversight roles). The candidate itself removed GOVERN 2.1 from `RECEIPT-002` and `DELEGATION-005` on the reasoning that actor attribution "does not document organizational roles and communication lines"; the same reasoning applies here. §4.4 also restricts GOVERN 2.1 to a "defensible organizational risk-management nexus", which a role-separation rule inside one transaction does not supply.
Disposition: DOWNGRADE — remove GOVERN 2.1 from all three rows; retain DEC / GOVERN 3.2. This leaves GOVERN 2.1 with zero rows, which is a positive result under §4.3.

**PR42-XW2-REV-F-002 — MAJOR — MEASURE 2.5 used as a catch-all for GKOS component determinism / fail-closed plumbing.**
Rows: `GKOS-RECEIPT-003`, `GKOS-AUTHUSE-002`, `GKOS-CONTEXT-002`, `GKOS-CONTEXT-003`.
MEASURE 2.5 asks that *the AI system to be deployed* is demonstrated valid and reliable and its generalization limits documented. Receipt-binding rollback, manifest-hash mismatch refusal, closed-input assembly and byte-identical manifests are properties of the governance layer's plumbing, not of the AI system's outputs. §4.4 states that identity, lineage and representation mechanics get no direct mapping unless a requirement-level nexus exists. `CONTEXT-003`'s two-word note ("Replay determinism") also does not meet the row-note standard applied everywhere else. `PROFILE-005` (executable violation evidence) is the one row where a TEVV-like nexus is defensible and should be retained; `PROFILE-004` → MEASURE 2.1 is fine.
Disposition: `RECEIPT-003` DOWNGRADE to CON / MEASURE 2.8 only; `AUTHUSE-002` DOWNGRADE to CON / MEASURE 2.7 only (integrity/tamper evidence nexus holds); `CONTEXT-002` and `CONTEXT-003` → NO_DIRECT_MAPPING.

**PR42-XW2-REV-F-003 — MINOR — `GKOS-CANON-007` is the canonicalization-as-security row the packet asks the reviewer to find.**
The requirement specifies how a hash is constructed. §4.4 says "a hash … is insufficient" for MEASURE 2.7. Every other CANON row was placed at No direct mapping on that logic; keeping 007 as Contributes because the hash *could* support a security evaluation reintroduces the "potential downstream use" nexus the candidate rejects for IDENTITY and LINEAGE.
Disposition: NO_DIRECT_MAPPING. (Owner may reasonably ACCEPT_WITH_MODIFICATION and keep CON with the existing qualifier; the inconsistency, not the mapping, is the defect.)

**PR42-XW2-REV-F-004 — OBSERVATION — MEASURE 2.8 density.**
15 of 35 mapped rows cite MEASURE 2.8. Each note is individually honest ("can support … when linked to a MAP-identified risk; does not itself perform that examination"), so no row is wrong, but a reader will see 2.8 as GKOS's headline outcome. Consider a one-sentence statement in §4.3 that MEASURE 2.8 contributions are evidence-supply only and that no GKOS requirement performs the examination the subcategory describes.

**PR42-XW2-REV-F-005 — OBSERVATION — provenance of the corrective assessment.**
`PR42_XW002_CORRECTIVE_DRAFTING_ASSESSMENT_2026-09-06.md` records the editor as a GPT-based Codex assistant whose exact served model/version "was not exposed". The packet's identity requirements ask for the exact identifier where available; this is correctly disclosed as unavailable and should stay that way rather than being back-filled.

**PR42-XW2-REV-F-006 — OBSERVATION — `main` moved today.**
PR #48 (P1.1 fork publication coordinates) appears open against `main` and may touch README. Merge order between #42 and #48 should be decided so the README crosswalk paragraph is not lost in a resolution.

No BLOCKING findings. No ISO Annex A content escaped the hold. No sentence was found that reads as NIST/ISO endorsement, alignment, certification or compliance; §7 and the status line close that reading.

## Verdict

**PASS_WITH_CORRECTIONS.** F-001 and F-002 require owner disposition. Accepted corrections change `rows.py`; regenerate, re-run `gen.py --check` and the test suite, and re-verify the corrected head rather than carrying this verdict forward.

Owner dispositions (to be recorded): F-001 ____ F-002 ____ F-003 ____

## 62-row disposition table

`GKOS ID | Candidate mapping | Reviewer disposition | Evidence / AI RMF subcategory checked | Finding ID if changed`

| GKOS ID | Candidate | Disposition | Checked | Finding |
| --- | --- | --- | --- | --- |
| `GKOS-CONFORMANCE-001` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-CONFORMANCE-002` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-CONFORMANCE-003` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-IDENTITY-001` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-IDENTITY-002` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-IDENTITY-003` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-IDENTITY-004` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-LINEAGE-001` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-LINEAGE-002` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-LINEAGE-003` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-RECEIPT-001` | CON; MEASURE 2.8 | ACCEPT | MEASURE 2.8 | — |
| `GKOS-RECEIPT-002` | CON; MEASURE 2.8 | ACCEPT | MEASURE 2.8 | — |
| `GKOS-RECEIPT-003` | CON; MEASURE 2.5, MEASURE 2.8 | DOWNGRADE | MEASURE 2.5 removed; keep CON MEASURE 2.8 | F-002 |
| `GKOS-POLICY-001` | DD; GOVERN 1.2 | ACCEPT | GOVERN 1.2 | — |
| `GKOS-RETENTION-001` | DD; GOVERN 1.1 | ACCEPT | GOVERN 1.1 | — |
| `GKOS-RETENTION-002` | CON; MEASURE 2.8 | ACCEPT | MEASURE 2.8 | — |
| `GKOS-RETENTION-003` | DD; GOVERN 1.1 | ACCEPT | GOVERN 1.1 | — |
| `GKOS-REENTRY-001` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-REENTRY-002` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-REENTRY-003` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-REENTRY-004` | DEC; GOVERN 3.2 | ACCEPT | GOVERN 3.2 | — |
| `GKOS-DELEGATION-001` | DEC; GOVERN 2.1, GOVERN 3.2 | DOWNGRADE | GOVERN 2.1 removed; keep DEC GOVERN 3.2 | F-001 |
| `GKOS-DELEGATION-002` | DEC; GOVERN 3.2 | ACCEPT | GOVERN 3.2 | — |
| `GKOS-DELEGATION-003` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-DELEGATION-004` | SUP; none | SUPERSEDED_CONFIRMED | none; NDM reason read against requirement text | — |
| `GKOS-DELEGATION-005` | CON; GOVERN 3.2 | ACCEPT | GOVERN 3.2 | — |
| `GKOS-DELEGATION-006` | CON; GOVERN 3.2, MANAGE 4.1 | ACCEPT | GOVERN 3.2, MANAGE 4.1 | — |
| `GKOS-PROFILE-001` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-PROFILE-002` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-PROFILE-003` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-PROFILE-004` | CON; MEASURE 2.1 | ACCEPT | MEASURE 2.1 | — |
| `GKOS-PROFILE-005` | CON; MEASURE 2.5 | ACCEPT | MEASURE 2.5 | — |
| `GKOS-PROFILE-006` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-PROFILE-007` | CON; MEASURE 2.8, MEASURE 2.9 | ACCEPT | MEASURE 2.8, MEASURE 2.9 | — |
| `GKOS-CANON-001` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-CANON-002` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-CANON-003` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-CANON-004` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-CANON-005` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-CANON-006` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-CANON-007` | CON; MEASURE 2.7 | NO_DIRECT_MAPPING | MEASURE 2.7 checked; hash construction rule, see §4.4 | F-003 |
| `GKOS-CANON-008` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-CONTEXT-001` | CON; MAP 1.1, MEASURE 2.8 | ACCEPT | MAP 1.1, MEASURE 2.8 | — |
| `GKOS-CONTEXT-002` | CON; MEASURE 2.5 | NO_DIRECT_MAPPING | MEASURE 2.5 checked; closed-input assembly is mechanics | F-002 |
| `GKOS-CONTEXT-003` | CON; MEASURE 2.5 | NO_DIRECT_MAPPING | MEASURE 2.5 checked; byte determinism is representation | F-002 |
| `GKOS-CONTEXT-004` | CON; MEASURE 2.8, MEASURE 2.9 | ACCEPT | MEASURE 2.8, MEASURE 2.9 | — |
| `GKOS-CONTEXT-005` | CON; MEASURE 2.8 | ACCEPT | MEASURE 2.8 | — |
| `GKOS-AUTHUSE-001` | CON; MEASURE 2.8 | ACCEPT | MEASURE 2.8 | — |
| `GKOS-AUTHUSE-002` | CON; MEASURE 2.5, MEASURE 2.7 | DOWNGRADE | MEASURE 2.5 removed; keep CON MEASURE 2.7 | F-002 |
| `GKOS-AUTHUSE-003` | CON; MEASURE 2.8 | ACCEPT | MEASURE 2.8 | — |
| `GKOS-AUTHUSE-004` | DEC; GOVERN 2.1, GOVERN 3.2 | DOWNGRADE | GOVERN 2.1 removed; keep DEC GOVERN 3.2 | F-001 |
| `GKOS-AUTHUSE-005` | CON; MEASURE 2.8 | ACCEPT | MEASURE 2.8 | — |
| `GKOS-AUTHUSE-006` | CON; MANAGE 4.1, MEASURE 2.8 | ACCEPT | MANAGE 4.1, MEASURE 2.8 | — |
| `GKOS-AUTHUSE-007` | CON; MEASURE 2.8 | ACCEPT | MEASURE 2.8 | — |
| `GKOS-EFFECT-001` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-EFFECT-002` | CON; GOVERN 3.2 | ACCEPT | GOVERN 3.2 | — |
| `GKOS-EFFECT-003` | NDM; none | ACCEPT | none; NDM reason read against requirement text | — |
| `GKOS-REVIEW-001` | CON; GOVERN 3.2 | ACCEPT | GOVERN 3.2 | — |
| `GKOS-REVIEW-002` | CON; MEASURE 2.8 | ACCEPT | MEASURE 2.8 | — |
| `GKOS-REVIEW-003` | DEC; GOVERN 2.1, GOVERN 3.2 | DOWNGRADE | GOVERN 2.1 removed; keep DEC GOVERN 3.2 | F-001 |
| `GKOS-REVIEW-004` | CON; MEASURE 2.8 | ACCEPT | MEASURE 2.8 | — |
| `GKOS-DISCLOSURE-001` | CON; MEASURE 2.10, MEASURE 2.7 | ACCEPT | MEASURE 2.10, MEASURE 2.7 | — |

Summary: ACCEPT 53, SUPERSEDED_CONFIRMED 1, DOWNGRADE 5, NO_DIRECT_MAPPING 3, REMAP 0, HOLD 0.
If all corrections are accepted the distribution becomes DEC 5 / CON 23 / DD 3 / NDM 30 / SUP 1.

## Prohibited-conclusion statement

This review does not establish independent GKOS conformance verification, profile qualification, ISO/IEC 42001 or NIST AI RMF conformity or alignment, certification, regulator approval, legal compliance, or any deployment authority.
