# GKOS and AI Governance Frameworks: A Claim-Limited Crosswalk

<!-- markdownlint-disable MD013 -->

- **Document:** GKOS-XW-002 v0.2-draft
- **Supersedes:** GKOS-XW-002 v0.1-draft (File Library drafting material, 2026-09-03; never committed to the repository; pinned to v0.80 plus R19)
- **GKOS baseline:** GKOS-2026-09-03 v0.81; tag `v0.81`; owner-approved publication commit `8f2a158c6d4b8cabd907d98765766d281aec1247` (see `docs/implementation/V081_PUBLICATION_BINDING.md`); published 2026-09-03
- **Requirement registry:** `requirements/REGISTRY.md` (62 permanent allocations)
- **External baselines:** `ESR-ISO-42001` (verification held, see §3); `ESR-NIST-AIRMF` (amended 2026-09-03, see §4.1) in `docs/ecosystem/EXTERNAL_SOURCE_REGISTER.md`
- **Status:** informative R21 ecosystem document. Mappings are proposed evidentiary correspondences for readers already operating an ISO/IEC 42001 AIMS or a NIST AI RMF program. Nothing here is a conformance, alignment, certification, endorsement, or regulatory claim. Not part of the normative Standard.
- **Machine-readable mirror:** `docs/ecosystem/EXTERNAL_CROSSWALK.json`, generated with this document from the reviewed row source `scripts/xw002/rows.py`; integrity binding and regeneration command in §8
- **Related:** GKOS-XW-001 (`docs/GKOS_PROVENANCE_LANDSCAPE_CROSSWALK.md`)

## 1. Short answer

ISO/IEC 42001:2023 is an AI management-system standard. NIST AI RMF 1.0 is a voluntary organizational AI risk-management framework. Both operate at a broader organizational level than GKOS's artifact and state-change contracts. Neither defines the GKOS-specific machine-checkable contract for what a governed artifact is, what a GKOS gate is, or what evidence a GKOS conformance claim must carry.

GKOS is complementary: a layered, requirement-ID-addressable, gate-coded contract for individual governed artifacts and state changes. It defines no organizational management system, risk taxonomy, competence model, impact-assessment method, or continual-improvement cycle.

For NIST AI RMF, a GKOS artifact can be *evidence an organization may present* toward an outcome; it cannot satisfy, discharge, or complete a subcategory. For ISO/IEC 42001 Annex A, the mapping and relationship-class scheme remain verification-held under §3; this draft makes no discharge claim.

## 2. Scope comparison

| External baseline | Primary scope | Where GKOS artifacts are plausibly relevant evidence | What remains entirely the organization's responsibility |
| --- | --- | --- | --- |
| ISO/IEC 42001:2023 | AI management system: policy, roles, resources, impact assessment, lifecycle, data, third parties, incidents | Potential evidence areas only; Annex A row-level mapping is verification-held under §3 | Policy authorship, competence and awareness, management review, certification scope, risk-appetite statements, and any other AIMS requirement not supplied by GKOS |
| NIST AI 100-1 (AI RMF 1.0) | Voluntary outcomes under GOVERN, MAP, MEASURE, MANAGE across the AI lifecycle | Accountability and transparency documentation; role differentiation; bounded authority; delegation suspension/expiry; purpose-bound context; recovery and override routes | Risk tolerance, impact and societal assessment, stakeholder engagement, workforce practices, measurement efficacy, third-party programs |

Neither external baseline is a GKOS technical schema, conformance-profile system, or gate registry. GKOS is not an AIMS and does not replace an organization's ISO/IEC 42001 certification scope or its AI RMF profile.

## 3. ISO/IEC 42001:2023 Annex A — VERIFICATION HELD

This section is intentionally not populated in v0.2-draft.

The v0.1-draft and the prior `EXTERNAL_CROSSWALK.json` (mapping_version 0.1.0-draft) carried Annex A control identifiers and titles that had not been verified against the licensed ISO/IEC 42001:2023 text. Publishing an unverified control list, or one derived from a secondary crosswalk or a pre-publication draft, would let an unlicensed or superseded source silently become the authority.

Hold conditions for release of §3:

1. The owner has access to the final ISO/IEC 42001:2023 text and records that fact in `ESR-ISO-42001`.
2. Every Annex A identifier and title used is checked against that text on a recorded date.
3. The class scheme for ISO is decided separately. No ISO relationship class, including "Discharges", is adopted by this draft.
4. Controls with no GKOS mechanism are listed explicitly, not omitted.

Until then, the ISO portion of the JSON mirror is emitted as `"status": "verification-held"` with no rows.

## 4. NIST AI RMF 1.0

### 4.1 Baseline

External source: `ESR-NIST-AIRMF` — NIST AI 100-1, *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, January 2023, DOI 10.6028/NIST.AI.100-1, Core Tables 1–4 (GOVERN, MAP, MEASURE, MANAGE categories and subcategories). Subcategory identifiers and wording used here were checked against that publication on the ESR check date (2026-09-03). This section carries no independent external-version assertion; the ESR row is the controlled record.

Outside this baseline: the AI RMF Playbook, NIST AI 600-1 (Generative AI Profile), NIST agent-governance drafts, and any revised AI RMF. NIST states that AI RMF 1.0 is being revised; the ESR row carries a re-review trigger, and this section must be re-adjudicated against the revised Core when published.

### 4.2 Nature of the relationship

The AI RMF is a voluntary framework of organizational outcomes. It has no conformance model. A GKOS artifact is at most evidence an organization may present toward an outcome; it cannot satisfy, discharge, or complete a subcategory, because subcategories describe organizational practice, not artifacts.

Classes used in this section:

| Class | Meaning |
| --- | --- |
| Direct evidence candidate | A GKOS-mandated artifact can directly contribute documentary or technical evidence toward the RMF outcome. Sufficiency is always an organizational determination. |
| Contributes | Relevant but partial; substantial additional organizational evidence is required. |
| Deployment-declared | GKOS mandates the record or hook; the adopting organization supplies the policy, threshold, authority, risk tolerance, or legal basis the outcome asks about. |
| No direct mapping | No defensible correspondence exists. Recorded explicitly. |
| Superseded | Requirement superseded in the current development line; see replacement. |

"Discharges" is not used for NIST AI RMF and must not be inferred from any row.

### 4.3 Scope of coverage

GKOS addresses a narrow band of the Core: accountability and transparency documentation, role separation and human-AI role differentiation, human authority over consequential action, bounded delegation and authority suspension/expiry, recovery and override routes, honest disclosure of what was not measured, and protected disclosure.

GKOS does not substantively implement the organizational outcomes in GOVERN 3.1 or GOVERN 5 (workforce diversity and stakeholder engagement), MAP 5 (impacts to individuals, groups, communities, and society), MEASURE 2.6 (safety), MEASURE 2.11 (fairness and bias), MEASURE 2.12 (environmental impact), MEASURE 3 and MEASURE 4 (risk tracking and measurement efficacy), or MANAGE 3 (third-party risk beyond bounded delegation). A deployment may record policy, authority, evidence, and stakeholder-related artifacts inside GKOS; the organizational program those outcomes describe is not supplied by GKOS.

**No direct mapping is a positive crosswalk result and shall not be treated as a defect requiring a GKOS requirement to be invented.**

### 4.4 Mapping rules

These rules guided the adjudication in §5. They are guidance to the reviewer, not an algorithm.

**Control rule.** A mapping-rule example below does not authorize automatic assignment of that subcategory to every member of the named GKOS family. The requirement text and the external outcome must be adjudicated independently for every row.

| GKOS concern | Treatment |
| --- | --- |
| Canonical deterministic serialization (`CANON-*`) | MEASURE 2.8 — Contributes, where determinism serves inspectability. Pure representation rules with no outcome nexus → No direct mapping. MEASURE 2.1/2.5 only where implementation evidence ties canonicalization to an evaluation. |
| Hash / integrity binding | MEASURE 2.7 — Contributes, only where the artifact preserves or evaluates security/resilience evidence. |
| Fail-closed refusal | By reason: risk-response avoidance → MANAGE 1.3; post-deployment monitoring, override, or recovery → MANAGE 4.1; integrity or validity failure → MEASURE 2.5; otherwise → No direct mapping. MANAGE 2.4 applies only where an AI system is superseded, disengaged, or deactivated because its performance or outcomes are inconsistent with intended use; semantic supersession, transaction rollback, or authority expiry alone do not qualify. |
| Role separation (proposal ≠ approval; capability ≠ authority) | GOVERN 2.1 + GOVERN 3.2 where the requirement actually documents organizational or human-AI role differentiation. GOVERN 1.5 only where the requirement itself mandates periodic review. |
| Decision Records and receipts | MEASURE 2.8 — Direct evidence candidate where the record directly documents accountability or transparency evidence. MANAGE 4.3 only for incident, error, or recovery records — none of the 62 current requirements is one. |
| Conformance manifest | UNEVALUATED ≠ PASS disclosure → MEASURE 1.1. Risk/impact disclosure → GOVERN 4.2. Fixture or test manifest alone → not GOVERN 4.2. |
| Purpose-bound selection and context | MAP 1.1 — Direct evidence candidate where purpose and deployment context are actually captured. MAP 1.6 is not used merely because a system requirement exists. |
| Retention, holds, legal predicates | Deployment-declared → GOVERN 1.1 where the adopting organization supplies the applicable legal or regulatory basis. |

### 4.5 Non-claims

GKOS is not a NIST publication. This mapping claims no NIST, NCCoE, or U.S. Government review, endorsement, alignment, or consistency. Use of a GKOS-conformant implementation does not establish that an organization has adopted or implemented the AI RMF. Subcategory identifiers are cited so readers can verify against the primary source; NIST text is paraphrased, not reproduced.

## 5. NIST AI RMF 1.0 mapping table

> **PROPOSED — OWNER/REVIEWER DISPOSITION REQUIRED.** No row is adopted because it appears here. Each row was adjudicated individually against the requirement text in `requirements/REGISTRY.md` and the subcategory text in AI 100-1 Tables 1–4. Engine diagnostic codes do not appear (adapter-boundary rule).

| GKOS ID | Class | AI RMF subcategory | Evidence artifact | Note |
| --- | --- | --- | --- | --- |
| `GKOS-CONFORMANCE-001` | Direct evidence candidate | MEASURE 1.1 | conformance result (UNEVALUATED outcome) | Documents what was not measured; MEASURE 1.1 asks for exactly this disclosure. |
| `GKOS-CONFORMANCE-002` | Contributes | MEASURE 1.1 | conformance-manifest; non-zero exit | Blocks over-claiming; sufficiency of the claim boundary is organizational. |
| `GKOS-CONFORMANCE-003` | No direct mapping | — | — | Fixture/adapter boundary rule does not require independent AI-system assessment; no direct RMF outcome nexus. |
| `GKOS-IDENTITY-001` | No direct mapping | — | — | Identifier format rule; no RMF outcome nexus. |
| `GKOS-IDENTITY-002` | No direct mapping | — | — | Legacy identifier validity; no RMF outcome nexus. |
| `GKOS-IDENTITY-003` | Contributes | MEASURE 2.8 | migration record preserving uid | Preserves traceability across migration. |
| `GKOS-IDENTITY-004` | No direct mapping | — | — | Anti-inference rule for identifier ordering; important GKOS authority semantics, but no direct AI RMF outcome nexus. |
| `GKOS-LINEAGE-001` | Contributes | MEASURE 2.8 | lineage graph with explicit branches | Branch preservation supports inspectability. |
| `GKOS-LINEAGE-002` | No direct mapping | — | — | Derivation rule for invalid_at; technical only. |
| `GKOS-LINEAGE-003` | Contributes | MEASURE 2.8 | — | No silent authoritative selection; accountability for succession remains human. |
| `GKOS-RECEIPT-001` | Direct evidence candidate | MEASURE 2.8 | State-Change Receipt | Universal receipting is the core accountability record. MANAGE 4.3 NOT assigned to routine receipts. |
| `GKOS-RECEIPT-002` | Direct evidence candidate | MEASURE 2.8, GOVERN 2.1 | State-Change Receipt (actor class, predicate id/version) | Actor class in record evidences documented roles. |
| `GKOS-RECEIPT-003` | Contributes | MEASURE 2.5, MEASURE 2.8 | rollback/compensation record; manifest binding-mechanism declaration | Receipt-binding failure handling supports reliable, accountable operation. Not MANAGE 2.4 or 4.1 by itself: transaction rollback is neither AI-system deactivation nor a post-deployment monitoring plan. |
| `GKOS-POLICY-001` | Deployment-declared | GOVERN 1.2, MEASURE 2.8 | policy/predicate identity and version | GKOS mandates explicit identity/version and blocks silent substitution; the organization supplies policy substance and determines whether trustworthiness is integrated. |
| `GKOS-RETENTION-001` | Deployment-declared | GOVERN 1.1 | hold-predicate consultation record | Legal/regulatory obligation is deployment-declared. |
| `GKOS-RETENTION-002` | Direct evidence candidate | MEASURE 2.8 | disposition receipt binding predicate id/version/result | Documents the basis of a disposition. |
| `GKOS-RETENTION-003` | Deployment-declared | GOVERN 1.1, MANAGE 1.3 | fail-closed record; human-disposition routing | Avoidance response to indeterminate legal predicate; GKOS does not decide the obligation. |
| `GKOS-REENTRY-001` | Contributes | MEASURE 2.8 | new Layer-1 Source Record | Provenance preserved as property of the artifact. |
| `GKOS-REENTRY-002` | Contributes | MEASURE 2.8 | re-entered source with fresh standing | No inherited authority or standing. |
| `GKOS-REENTRY-003` | Contributes | MEASURE 2.8 | predecessor unchanged | Non-destructive re-entry. |
| `GKOS-REENTRY-004` | Direct evidence candidate | GOVERN 3.2, MEASURE 2.8 | human/delegated supersession declaration | Explicit human or bounded-delegation supersession supports differentiated human-AI authority and accountability. Semantic knowledge supersession is not MANAGE 2.4 AI-system deactivation. |
| `GKOS-DELEGATION-001` | Direct evidence candidate | GOVERN 2.1, GOVERN 3.2 | delegation grant (bounded, versioned, expiring) | Documented, differentiated human-AI authority. |
| `GKOS-DELEGATION-002` | Direct evidence candidate | GOVERN 3.2, MANAGE 1.3 | routine/major classification by versioned predicate | Major/indeterminate → prior human disposition is a planned risk response. |
| `GKOS-DELEGATION-003` | No direct mapping | — | — | Raise-only nondeterministic checking is a GKOS control-integrity rule; no direct AI RMF outcome nexus. |
| `GKOS-DELEGATION-004` | Superseded | — | — | Superseded for v0.81 line; see GKOS-REVIEW-001..003. |
| `GKOS-DELEGATION-005` | Direct evidence candidate | GOVERN 3.2, GOVERN 2.1 | delegation scope | Capability ≠ authority; no general write authority implied. |
| `GKOS-DELEGATION-006` | Contributes | GOVERN 3.2, MANAGE 4.1 | delegation freeze on overdue review; exception receipt | Overdue-review freeze and bounded exception contribute to human-AI oversight and monitoring/override. Not MANAGE 2.4 absent AI-system performance/outcome inconsistency. |
| `GKOS-PROFILE-001` | Contributes | MEASURE 1.1 | conformance-manifest (Core) | Claim scope documented. |
| `GKOS-PROFILE-002` | Contributes | MEASURE 1.1 | conformance-manifest (Advanced) | Claim scope documented. |
| `GKOS-PROFILE-003` | Contributes | MAP 1.1 | conformance-manifest constraints (read-only) | Intended use bounded: no consequential action under the claim. |
| `GKOS-PROFILE-004` | Direct evidence candidate | MEASURE 2.8 | conformance-manifest (release, GKX, commit, fixtures, exceptions, assessment type) | Complete claim binding. GOVERN 4.2 NOT assigned: manifest documents conformance status, not risk/impact. |
| `GKOS-PROFILE-005` | Contributes | MEASURE 2.5 | gate-code violation fixtures | Executable negative evidence for fail-closed behavior supports reliability demonstration. |
| `GKOS-PROFILE-006` | Contributes | MEASURE 1.1 | conformance-manifest exceptions | No silent exclusion while retaining claim. |
| `GKOS-PROFILE-007` | Direct evidence candidate | MEASURE 2.8, MEASURE 2.9 | Viewer/Projection output | Exposes provenance, epistemic state, contradictions, limitations to the reader. |
| `GKOS-CANON-001` | Contributes | MEASURE 2.8 | GKX-CBOR-1 canonical artifacts | Determinism basis for inspectable artifacts. Not MEASURE 2.7. |
| `GKOS-CANON-002` | Contributes | MEASURE 2.8 | duplicate-key refusal | Prevents silent loss in the record. |
| `GKOS-CANON-003` | No direct mapping | — | — | Numeric representation rule; no RMF outcome nexus. |
| `GKOS-CANON-004` | No direct mapping | — | — | Timestamp syntax and anti-ordering rule are technical canonicalization semantics; no direct AI RMF outcome nexus. |
| `GKOS-CANON-005` | No direct mapping | — | — | Text normalization rule; no RMF outcome nexus. |
| `GKOS-CANON-006` | No direct mapping | — | — | Absent/null/empty distinction; representation only. |
| `GKOS-CANON-007` | Contributes | MEASURE 2.7, MEASURE 2.8 | SHA-256 canonical hash binding policy/compiler/selection refs | Only CANON row retaining 2.7: integrity binding is security/resilience evidence. |
| `GKOS-CANON-008` | Contributes | MEASURE 2.8 | declared human rendering + parser/verifier | Human-readable round trip supports inspectability/accountability of GKOS artifacts; it does not by itself explain or validate an AI model under MEASURE 2.9. |
| `GKOS-CONTEXT-001` | Direct evidence candidate | MAP 1.1, MEASURE 2.8 | selection envelope | Purpose, recipient, actors, omissions captured. MAP 1.6 removed (stakeholder requirements elicitation is not this). |
| `GKOS-CONTEXT-002` | Contributes | MEASURE 2.5, MEASURE 2.8 | context-manifest assembly log | Reproducible assembly; no live calls. |
| `GKOS-CONTEXT-003` | Contributes | MEASURE 2.5 | identical manifest bytes/hash | Replay determinism. |
| `GKOS-CONTEXT-004` | Direct evidence candidate | MEASURE 2.8, MEASURE 2.9 | context-manifest (contradictions, warnings, restrictions, omissions) | Required disclosure in the presented context. |
| `GKOS-CONTEXT-005` | Direct evidence candidate | MEASURE 2.8 | Decision Record binding manifest id/version/hash | Exact material reviewed is bound to the disposition. |
| `GKOS-AUTHUSE-001` | Direct evidence candidate | MEASURE 2.8 | Authorized Use Record | Use bound to exact context hash. |
| `GKOS-AUTHUSE-002` | Contributes | MEASURE 2.5, MEASURE 2.7 | refusal receipt on hash mismatch | Integrity failure fails closed; 2.7 retained because mismatch is tamper/integrity evidence. |
| `GKOS-AUTHUSE-003` | Direct evidence candidate | MEASURE 2.8 | authority-basis validity fields | Documents valid authority at action time and fail-closed treatment of invalid authority. Authority expiry/revocation alone is not MANAGE 2.4 AI-system deactivation. |
| `GKOS-AUTHUSE-004` | Direct evidence candidate | GOVERN 2.1, GOVERN 3.2 | actor-role fields; delegation chain | Proposing/reviewing/authorizing/executing distinct. GOVERN 1.5 NOT assigned. |
| `GKOS-AUTHUSE-005` | Direct evidence candidate | MEASURE 2.8 | Refusal Receipt | Gate closure documented with predicate and inputs. |
| `GKOS-AUTHUSE-006` | Direct evidence candidate | MANAGE 4.1, MEASURE 2.8 | Authorized Use Record outcome + correction/rollback/escalation route | Recovery and override route is the 4.1 nexus. |
| `GKOS-AUTHUSE-007` | Contributes | MEASURE 2.8 | GKOS-GATE-L7-001 refusal; captured evaluation time | Captured authority interval and refusal evidence contribute to accountability. Authority interval expiry alone is not MANAGE 2.4 AI-system deactivation. |
| `GKOS-EFFECT-001` | Contributes | MAP 1.1 | typed effect-scope vocabulary | Scope of intended effect made explicit. |
| `GKOS-EFFECT-002` | Direct evidence candidate | GOVERN 3.2, MANAGE 1.3 | scope-containment check | Effect must sit within human-granted standing and delegation. |
| `GKOS-EFFECT-003` | Contributes | MANAGE 1.3 | fail-closed on indeterminate scope | Avoidance response; not system deactivation. |
| `GKOS-REVIEW-001` | Direct evidence candidate | GOVERN 3.2, GOVERN 2.1 | review-lifecycle entry record | Authorized review precedes acceptance. |
| `GKOS-REVIEW-002` | Direct evidence candidate | MEASURE 2.8 | append-only Decision Record bound to exact evidence | Disposition traceable to evidence reviewed. |
| `GKOS-REVIEW-003` | Direct evidence candidate | GOVERN 2.1, GOVERN 3.2 | role separation; different-model-family agent reviewer; sealed packet; human escalation | No self-approval; differentiated human-AI roles and bounded human escalation. This is proposal review, not necessarily the regular AI-system assessment described by MEASURE 1.3. |
| `GKOS-REVIEW-004` | Direct evidence candidate | MEASURE 2.8 | append-only disposition history | No silent rewriting. MANAGE 4.3 NOT assigned to routine dispositions. |
| `GKOS-DISCLOSURE-001` | Contributes | MEASURE 2.10, MEASURE 2.7 | disclosure authorization; noninterference evidence | Privacy and security outcomes; legal basis for protection is deployment-declared. |

Distribution (62 rows): Direct evidence candidate 23; Contributes 25; Deployment-declared 3; No direct mapping 10; Superseded 1.

## 6. Proposed interoperability work (carried from v0.1, unchanged in substance)

These remain proposals until versioned schemas, fixtures, and executable tests are published.

- **XW2-P1 — AIMS evidence export profile.** Held with §3.
- **XW2-P2 — RMF-function-tagged gate export.** Optional, non-normative `rmf_function` tag on gate codes in `standard/annexes/Diagnostic_Code_Registry.md`, advisory only; must not alter gate semantics or create a conformance obligation. Tag values are functions (GOVERN/MAP/MEASURE/MANAGE), never subcategory identifiers, so the tag cannot be read as a per-gate alignment claim.
- **XW2-P3 — GOVERN-function boundary statement.** Publish alongside `GOVERNANCE.md` that GKOS's own decision-register process is standard-development governance, not a template an organization may substitute for its own GOVERN function or AIMS governance body.
- **XW2-P4 — Control-to-requirement traceability matrix.** Held with §3.
- **XW2-P5 — GCP tier-to-RMF-function readiness statement.** Per conformance tier, identify which functions the tier may be able to supply evidence for. A Viewer/Projection claim cannot by itself establish MANAGE outcomes because it gains no write, promotion, decision, or authorization authority.

## 7. Claims that must not be made

Until the work in §6 is implemented and tested, and independently of it for items 3–6, the project must not claim:

1. ISO/IEC 42001 certification, conformance, or audit-readiness based on this crosswalk;
2. NIST AI RMF profile completion, maturity-tier attainment, or "alignment" based on this crosswalk;
3. that a passing GKOS conformance-runner gate satisfies an Annex A control or an RMF subcategory;
4. that GKOS's pre-v1.0, founder-decision governance process is equivalent to an organization's AIMS governance body or GOVERN function;
5. that this document has been reviewed by an ISO-accredited certification body or by NIST;
6. that GKOS is a substitute for, rather than a possible evidence source within, an organization's existing AIMS or AI RMF program.

## 8. Revision block

| Field | Value |
| --- | --- |
| mapping_version | 0.2.0-draft |
| gkos_release | GKOS-2026-09-03 v0.81 |
| gkos_tag | v0.81 |
| gkos_commit | `8f2a158c6d4b8cabd907d98765766d281aec1247` |
| nist_baseline | ESR-NIST-AIRMF (AI 100-1, January 2023, DOI 10.6028/NIST.AI.100-1, Core Tables 1–4), checked 2026-09-03 |
| external_baseline_status | AI RMF 1.0 current baseline; revised AI RMF in progress as checked 2026-09-03 — re-review on publication |
| iso_baseline | ESR-ISO-42001 — verification held |
| generated_json | `docs/ecosystem/EXTERNAL_CROSSWALK.json` |
| row_source | `scripts/xw002/rows.py` |
| generator | `scripts/xw002/gen.py` |
| prose_normalized_sha256 | `35c470bbca452d7880b1e11091a3fcf535d97b300940fafdbd982b08aba54465` |
| json_sha256 | `75fd58328143af7b1c6ac1b7386ddffbd88aa51007ce39135c17d80dc1d00971` |
| disposition | PROPOSED — owner/reviewer disposition required |

**Binding normalization:** `prose_normalized_sha256` is calculated over the generated Markdown with the two digest-value cells normalized to fixed placeholder tokens before hashing. This avoids a circular self-hash while binding the JSON to the exact generated prose content.

**Regenerate/check:** `python scripts/xw002/gen.py` rewrites both representations; `python scripts/xw002/gen.py --check` exits non-zero if either committed representation differs from the generated result.

### Change log from v0.1-draft / JSON 0.1.0-draft

- Re-pinned from v0.80 + R19 / accepted-unpublished v0.81 allocations to published v0.81 commit `8f2a158c6d4b`.
- NIST mapping moved from function level to subcategory level with per-requirement adjudication.
- "Discharges" and "Supports" removed from the NIST side; replaced by Direct evidence candidate / Contributes / Deployment-declared / No direct mapping.
- MANAGE 2.4 has no current row assignment after checking its AI-system deactivation scope; semantic supersession, transaction rollback, and authority expiry are not treated as system deactivation by analogy.
- MANAGE 4.3 is not assigned to any current row because no current requirement is itself an incident/error communication record.
- MEASURE 1.3 is not assigned to current conformance/review rows because those requirements do not themselves require the regular AI-system assessments described by that outcome.
- GOVERN 3.2 is used only where the requirement actually differentiates human-AI or oversight roles.
- GOVERN 4.2 is not assigned to conformance-manifest rows because a conformance manifest is not inherently a risk/impact document.
- MAP 1.6 is not assigned to `CONTEXT-001`; capturing context is not the same as eliciting system requirements from relevant AI actors.
- Ten requirements are dispositioned No direct mapping.
- ISO/IEC 42001 section remains verification-held; no ISO rows are emitted.
- Added §4.3 anti-bloat sentence and §4.4 control rule against family-wide assignment.
- The machine-readable mirror and prose are generated from one reviewed row source with normalized prose and JSON digest binding.
