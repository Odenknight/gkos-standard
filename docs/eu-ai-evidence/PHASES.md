# GKOS EU AI evidence demonstration — phases and status

**Owner:** mariusTalpos

**Last updated:** 2026-09-06

**Standing:** Fork-owned planning document; informative and non-normative. This is a phase plan and shared tracker, not the Phase 1 proposal or a compliance claim.

## Purpose

Demonstrate, in small visible steps, whether GKOS can perform useful documentation and logging functions that support selected EU AI Act requirements. Each demonstration must show both successful behavior and an intentional failure that the system detects.

The work has two audiences: the project owner, who wants to see whether GKOS works, and a future assessor, who needs to understand exactly what the evidence establishes. Report Standard-reference behavior, Engine behavior, and host/storage integration behavior separately.

## One tracker for both repositories

This file is the sole authoritative phase-status tracker. Both fork READMEs link here. Keep proposals, code, and tests in their appropriate repository and link their exact revisions here; do not duplicate this status table in the Engine repository.

| Repository | Working branch | Responsibility |
| --- | --- | --- |
| [mariusTalpos/gkos-standard](https://github.com/mariusTalpos/gkos-standard) | [planning/eu-ai-evidence](https://github.com/mariusTalpos/gkos-standard/tree/planning/eu-ai-evidence) | Shared plan/status, future support mappings, Standard-owned requirements and expected outcomes, reference evidence |
| [mariusTalpos/GKOS-Engine](https://github.com/mariusTalpos/GKOS-Engine) | [planning/eu-ai-evidence](https://github.com/mariusTalpos/GKOS-Engine/tree/planning/eu-ai-evidence) | Engine implementation, adapters, integration evidence, and implementation tests |

**Canonical online tracker:** [PHASES.md](https://github.com/mariusTalpos/gkos-standard/blob/planning/eu-ai-evidence/docs/eu-ai-evidence/PHASES.md).

The existing local checkouts remain sibling directories under `repos/gkos-standard` and `repos/GKOS-Engine`. In each, `origin` points to the owner's fork and `upstream` points to Odenknight's original repository. The planning branches preserve the local work that existed when this program began.

If the tracker later moves to another branch or path, update both README links in the same coordinated change. Until then, the link above remains authoritative.

## Current status

| ID | Phase | Status | Dependencies | Work and evidence links | Next action |
| --- | --- | --- | --- | --- | --- |
| P0 | Forks and shared plan | Complete | None | Forks and branches above; this document | Keep the tracker current as work is authorised |
| P1 | Documentation traceability and review package | Planned — proposal not started | P0 | No proposal, implementation, or demonstration evidence yet | Await the owner's instruction to draft the Phase 1 proposal |
| P2 | Automatic logging and persistence | Planned — not started | P1 reviewed; application/storage boundary selected | None yet | After P1, assess the integration gap and decide scope |
| P3 | Usable log instructions | Planned — not started | P2 working and reviewed | None yet | Verify instructions against the actual P2 integration |

Only repository setup and this phase plan were authorised in the setup task. Drafting the Phase 1 proposal is a separate next step. No phase implementation or new conformance profile is authorised by this document.

## Phase 1 — documentation traceability and review package

**Targets:** the documentation-management aspects of Article 11(1), record-keeping under Article 17(1)(k), and documentation retrieval/provision supporting Article 21(1).

**Visible demonstration:** create a small fictional AI system dossier with two revisions, supporting evidence, and an identifiable system version. Use actual GKOS functions to inspect its identity, lineage, references, and available evidence, then produce a review package.

| Exercise | What the owner should be able to observe |
| --- | --- |
| Read a valid dossier | Records and evidence identify the intended system and document versions |
| Add a superseding revision | The declared relationship is visible; an obsolete revision is not silently treated as current |
| Change referenced evidence | The previous binding no longer verifies against the changed bytes |
| Remove evidence or introduce a conflicting reference | The missing or ambiguous evidence is exposed instead of silently counted as complete |
| Retrieve the specified review material | The selected documents and evidence are accessible within the tested authorisation scope |
| Verify a captured package | Its recorded inventory and bindings match its contents; any reproduction claim is limited to the component actually tested |

**Completion evidence:** a runnable example, observed positive and negative outcomes, exact source/fixture/tool versions, and a short report separating what already works, what needs integration, and what was not demonstrated. Package completeness is measured against the declared example inventory, not against unknown real-world evidence.

**Boundary:** this phase does not establish the substantive sufficiency of an Annex IV technical dossier, a complete quality-management system, actual cooperation with a regulator, independent authenticity or historical time, long-term archival retention, or full compliance with any article. Existing files or version control supplied by the host must not be presented as Engine-created archival capability.

**Work split:** the Standard repository owns the mapping, intended outcomes, and shared report/index. The Engine repository owns any Engine-specific example or adapter needed to exercise existing capabilities. The later proposal will select exact artifacts and interfaces after checking reuse; this plan does not prescribe a new runner or a multi-record protocol.

## Phase 2 — automatic logging and persistence

**Target:** a bounded demonstration of the automatic event-recording and traceability capabilities relevant to Article 12(1)–(2).

**Visible demonstration:** run operations through one identified application integration. Compare the actual operations with the automatically captured events, interrupt recording, restart the application, and inspect the persisted records.

| Exercise | What the owner should be able to observe |
| --- | --- |
| Execute the declared operations | Relevant events are recorded automatically with sufficient operation/system identity |
| Compare an independently observed operation list with the log | Missing, duplicated, or contradictory records are detectable for the tested event set |
| Interrupt logging | The failure is exposed; the application behaves according to its declared failure policy |
| Restart the application/storage | Previously committed records remain retrievable and verifiable |

**Completion evidence:** declared event coverage, named application and storage boundaries, observed operation-to-log comparisons, failure/restart results, and explicit limitations.

**Known dependency:** the Engine's `InMemoryGovernanceStore` is a test adapter. Its tests do not establish production persistence. A real integration must be selected before estimating or claiming this phase complete.

**Boundary:** no whole-system event completeness, lifetime availability, or retention compliance is inferred from a small demonstration. Articles 18, 19, and 26(6) remain outside this phase. Any specialised biometric logging requirements need a separate applicability decision and test scope.

## Phase 3 — usable log instructions

**Target:** Article 13(3)(f), where relevant: documentation describing mechanisms for collecting, storing, and interpreting the logs.

**Visible demonstration:** a reviewer follows the instructions against the P2 application to collect, retrieve, and interpret its logs, including a known failure case.

| Exercise | What the owner should be able to observe |
| --- | --- |
| Follow the collection and retrieval steps | The steps work without undocumented setup or commands |
| Interpret representative events | Field meanings, system/version bindings, outcomes, and limitations agree with actual records |
| Follow failure/recovery guidance | Instructions describe the observed P2 behavior accurately |

**Completion evidence:** versioned instructions, a walkthrough record identifying who performed it, issues found and corrected, and bindings to the tested application/log format. Distinguish an agent-performed walkthrough from one completed by a representative human user.

**Boundary:** this does not establish all Article 13 instructions, transparency, or user comprehension obligations. Product-specific log instructions belong with the Engine/integration; reusable semantics belong with the Standard. This tracker links both.

## Coordination and status rules

1. Before starting work, read this tracker and the applicable repository instructions. Use the phase ID in branch, commit, or work-item descriptions where practical.
2. Keep one shared status here: **Planned**, **Proposal in progress**, **Ready for implementation**, **In progress**, **Blocked**, or **Complete**. P0 is setup; P1–P3 become Complete only after their agreed acceptance evidence is reviewed.
3. A proposal becoming available does not itself authorise implementation. Record the owner's scope decision before moving to Ready for implementation.
4. Link proposals, branches/PRs if created, exact Standard and Engine commits, test commands, result artifacts, and review dispositions in the evidence register below. Update it whenever either repository advances the phase.
5. A passing Standard-reference test does not count as an Engine test. A host-provided capability does not become an Engine capability by association.
6. Missing, failed, unsupported, skipped, or unevaluated mandatory checks remain visible and prevent completion of the agreed scope. Narrowing scope requires an explicit recorded decision; never silently remove a failing target.
7. Preserve the upstream baselines and keep planning work on the owner forks. Publishing this plan does not alter upstream standards, qualify a profile, or create legal recognition.

## Evidence register

| Phase | Proposal / scope decision | Standard commit and evidence | Engine commit and evidence | Review / limitations |
| --- | --- | --- | --- | --- |
| P0 | Owner requested both forks, a central phase document, and no Phase 1 proposal yet | Planning document and README pointer; source baseline below | README pointer; source baseline below | Setup only; no new runtime tests executed |
| P1 | Not started | None | None | No demonstration or compliance-support result yet |
| P2 | Not started | None | None | Production logging/storage boundary not selected |
| P3 | Not started | None | None | Depends on P2's actual log behavior |

## Starting coordinates and preserved work

- Standard local source baseline: [`359aeba60626b137e1fa8c77e48672d690a993c8`](https://github.com/mariusTalpos/gkos-standard/commit/359aeba60626b137e1fa8c77e48672d690a993c8), from local branch `feat/article-9-conformance-tests`.
- Engine local source baseline: [`8207958047b3361ae21ac07c5a2abbd26a42a684`](https://github.com/mariusTalpos/GKOS-Engine/commit/8207958047b3361ae21ac07c5a2abbd26a42a684), from local branch `feat/article-9-conformance-tests`.
- The earlier [Article 9 findings](../proposals/EU_AI_ACT_ARTICLE_9_GKOS_FINDINGS.md) and [Article 9 infrastructure proposal](../proposals/EU_AI_ACT_ARTICLE_9_TEST_INFRASTRUCTURE_PROPOSAL.md) are preserved as background. They are not the Phase 1 proposal and do not set the implementation scope of this program.
- The existing [conformance evidence-package draft](../ecosystem/GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md) is a reuse candidate, not a requirement to build the full package design.

## Legal and claim baseline

Mapping source: [Regulation (EU) 2024/1689, consolidated 27 July 2026](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng), as reviewed on 6 September 2026. Applicability depends on the system and operator; recheck the source when drafting a phase proposal.

The intended outcome is evidence that named GKOS mechanisms support selected statutory requirements for identified versions and scenarios. It is not a claim that the provider or AI system complies with an entire article, that GKOS is a harmonised standard, or that a regulator has endorsed the project.

## Decision log

| Date | Decision |
| --- | --- |
| 2026-09-06 | Use owner forks of the Standard and Engine; retain upstream references and existing local Article 9 work. |
| 2026-09-06 | Keep one central tracker in the Standard fork, discoverable from both READMEs. |
| 2026-09-06 | Group documentation targets into P1; follow with actual logging in P2 and log instructions in P3. |
| 2026-09-06 | Stop after setup and phase planning. Draft the Phase 1 proposal only on a later owner instruction. |
