# GKOS and AI Governance Frameworks: A Claim-Limited Crosswalk

<!-- markdownlint-disable MD013 -->

- **Document:** GKOS-XW-002 v0.2.1-draft
- **Supersedes:** GKOS-XW-002 v0.1-draft (File Library drafting material, 2026-09-03; never committed to the repository; pinned to v0.80 plus R19)
- **GKOS baseline:** GKOS-2026-09-03 v0.81; tag `v0.81`; owner-approved publication commit `8f2a158c6d4b8cabd907d98765766d281aec1247` (see `docs/implementation/V081_PUBLICATION_BINDING.md`); published 2026-09-03
- **Requirement registry:** `requirements/REGISTRY.md` (62 permanent allocations)
- **External baselines:** `ESR-ISO-42001` (verification held, see §3); `ESR-NIST-AIRMF` (amended 2026-09-03, see §4.1) in `docs/ecosystem/EXTERNAL_SOURCE_REGISTER.md`
- **Status:** informative R21 ecosystem document. Mappings are proposed evidentiary correspondences for readers already operating an ISO/IEC 42001 AIMS or a NIST AI RMF program. Nothing here is a conformance, alignment, certification, endorsement, or regulatory claim. Not part of the normative Standard.
- **Machine-readable mirror:** `docs/ecosystem/EXTERNAL_CROSSWALK.json`, generated with this document from the proposed row source `scripts/xw002/rows.py`; integrity binding and regeneration command in §8
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

This section is intentionally not populated in v0.2.1-draft.

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
| Direct evidence candidate | A mandated artifact directly records a component of the cited outcome, such as a differentiated human-AI authority arrangement. It does not establish the complete outcome or organizational effectiveness. Each row is a proposed mapping pending review. |
| Contributes | Relevant but partial; substantial additional organizational evidence is required. |
| Deployment-declared | GKOS mandates the record or hook; the adopting organization supplies the policy, threshold, authority, risk tolerance, or legal basis the outcome asks about. |
| No direct mapping | No defensible requirement-level outcome mapping is asserted. Related implementation evidence may still be relevant in a separately justified deployment assessment. |
| Superseded | Requirement superseded in the pinned v0.81 baseline; see replacement. |

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
| GKOS fixture execution and claim coverage | Not inherently MEASURE 1.1: that outcome concerns AI-risk measurement selection and unmeasured risks identified through MAP. |
| Technical identity, lineage and representation | No direct mapping where the requirement supplies only mechanics. A potential downstream use does not create a requirement-level outcome nexus. |
| Context, decisions and use/refusal records | At most Contributes to MEASURE 2.8 when the deployment connects those records to examination of a specific transparency/accountability risk. Record existence alone is insufficient. |
| Human-AI roles and oversight | GOVERN 3.2 where the exact rule differentiates those roles; GOVERN 2.1 only where documented responsibilities have a defensible organizational risk-management nexus. |
| Test manifests and reliability mechanisms | MEASURE 2.1 or 2.5 only as partial evidence tied to an actual AI-system evaluation, its tools, deployment conditions and limitations. |
| Security/privacy mechanisms | MEASURE 2.7 or 2.10 only with a deployment risk linkage and actual evaluation evidence. A hash or access-control rule is insufficient. |
| Purpose/context and interpreted output | MAP 1.1 and MEASURE 2.9 remain partial contributions, not a full context analysis or model explanation/validation. |
| Fail-closed behavior and recovery | Do not infer MANAGE 1.3 from a denial alone. MANAGE 4.1 requires linkage to an implemented monitoring/recovery plan. MANAGE 2.4 and 4.3 remain absent from this candidate. |

## 5. NIST AI RMF 1.0 mapping table

> **PROPOSED — OWNER/REVIEWER DISPOSITION REQUIRED.** No row is adopted because it appears here. Each row was adjudicated individually against the requirement text in `requirements/REGISTRY.md` and the subcategory text in AI 100-1 Tables 1–4. Engine diagnostic codes do not appear (adapter-boundary rule).

| GKOS ID | Class | AI RMF subcategory | Evidence artifact | Note |
| --- | --- | --- | --- | --- |
| `GKOS-CONFORMANCE-001` | No direct mapping | — | — | UNEVALUATED records a missing GKOS fixture execution, not selection of AI-risk metrics or disclosure of unmeasured MAP risks. |
| `GKOS-CONFORMANCE-002` | No direct mapping | — | — | Eligibility of a GKOS profile claim does not select AI-risk measurement approaches or identify unmeasured AI risks. |
| `GKOS-CONFORMANCE-003` | No direct mapping | — | — | Fixture/adapter boundary rule does not require independent AI-system assessment; no direct RMF outcome nexus. |
| `GKOS-IDENTITY-001` | No direct mapping | — | — | Identifier format rule; no RMF outcome nexus. |
| `GKOS-IDENTITY-002` | No direct mapping | — | — | Legacy identifier validity; no RMF outcome nexus. |
| `GKOS-IDENTITY-003` | No direct mapping | — | — | Preserving a historical UID is an identity constraint, not an examination of transparency/accountability risks. |
| `GKOS-IDENTITY-004` | No direct mapping | — | — | Anti-inference rule for identifier ordering; important GKOS authority semantics, but no direct AI RMF outcome nexus. |
| `GKOS-LINEAGE-001` | No direct mapping | — | — | Preserving all successor branches is a graph rule; it does not mandate an AI-risk examination. |
| `GKOS-LINEAGE-002` | No direct mapping | — | — | Derivation rule for invalid_at; technical only. |
| `GKOS-LINEAGE-003` | No direct mapping | — | — | Rejecting automatic authoritative succession is a technical authority constraint, not an organizational accountability-risk assessment. |
| `GKOS-RECEIPT-001` | Contributes | MEASURE 2.8 | State-Change Receipt | Durable state-change evidence can support examination of accountability failures when linked to a MAP-identified risk; it does not itself perform that examination. |
| `GKOS-RECEIPT-002` | Contributes | MEASURE 2.8 | State-Change Receipt (actor class, predicate id/version) | Actor and predicate attribution can support examination of decision accountability. Actor class alone does not document organizational roles and communication lines under GOVERN 2.1. |
| `GKOS-RECEIPT-003` | Contributes | MEASURE 2.5, MEASURE 2.8 | rollback/compensation record; manifest binding-mechanism declaration | Tested receipt-loss and compensation behavior can support reliability and accountability-risk assessment for the deployed system; the binding rule alone is not a system-level demonstration. |
| `GKOS-POLICY-001` | Deployment-declared | GOVERN 1.2 | policy/predicate identity and version | GKOS requires identified, versioned policy inputs. The organization must supply trustworthiness policy substance and evidence that it is integrated into practice; policy identity alone is insufficient. |
| `GKOS-RETENTION-001` | Deployment-declared | GOVERN 1.1 | hold-predicate consultation record | Legal/regulatory obligation is deployment-declared. |
| `GKOS-RETENTION-002` | Contributes | MEASURE 2.8 | disposition receipt binding predicate id/version/result | The recorded hold predicate and result can support assessment of accountability for a disposition when linked to the relevant AI risk; no risk assessment is mandated by this row. |
| `GKOS-RETENTION-003` | Deployment-declared | GOVERN 1.1 | fail-closed record; human-disposition routing | The organization supplies the legal hold/erasure basis and human disposition. An indeterminate hold is not necessarily a MAP-prioritized AI risk response under MANAGE 1.3. |
| `GKOS-REENTRY-001` | No direct mapping | — | — | New-source re-entry is a provenance rule; the requirement does not examine a mapped AI risk. |
| `GKOS-REENTRY-002` | No direct mapping | — | — | Non-inheritance of prior standing is a GKOS semantic constraint, not an AI RMF risk-assessment record. |
| `GKOS-REENTRY-003` | No direct mapping | — | — | Non-destructive re-entry preserves history but does not mandate examination of AI-risk outcomes. |
| `GKOS-REENTRY-004` | Direct evidence candidate | GOVERN 3.2 | human/delegated supersession declaration | Explicit human or bounded delegated supersession supplies evidence of differentiated human-AI authority; broader oversight policy and operation remain to be demonstrated. |
| `GKOS-DELEGATION-001` | Direct evidence candidate | GOVERN 2.1, GOVERN 3.2 | delegation grant (bounded, versioned, expiring) | Documented, differentiated human-AI authority. |
| `GKOS-DELEGATION-002` | Direct evidence candidate | GOVERN 3.2 | routine/major classification by versioned predicate | Routine-only delegation and required prior human disposition for other outcomes directly evidence a human-AI oversight boundary. Major classification is not itself MAP-based risk prioritization under MANAGE 1.3. |
| `GKOS-DELEGATION-003` | No direct mapping | — | — | Raise-only nondeterministic checking is a GKOS control-integrity rule; no direct AI RMF outcome nexus. |
| `GKOS-DELEGATION-004` | Superseded | — | — | Superseded for v0.81 line; see GKOS-REVIEW-001..003. |
| `GKOS-DELEGATION-005` | Contributes | GOVERN 3.2 | delegation scope | Limiting supersession delegation to its stated scope contributes to human-AI authority boundaries; a prohibition alone is not documentation of organizational responsibility or communication lines. |
| `GKOS-DELEGATION-006` | Contributes | GOVERN 3.2, MANAGE 4.1 | delegation freeze on overdue review; exception receipt | Overdue-review freeze and bounded exception contribute to human-AI oversight and monitoring/override. Not MANAGE 2.4 absent AI-system performance/outcome inconsistency. |
| `GKOS-PROFILE-001` | No direct mapping | — | — | Core profile coverage is a GKOS requirement population, not a selection of AI-risk metrics. |
| `GKOS-PROFILE-002` | No direct mapping | — | — | Advanced profile coverage is a GKOS requirement population, not a selection of AI-risk metrics. |
| `GKOS-PROFILE-003` | No direct mapping | — | — | Read-only claim scope does not document the intended AI application and broader deployment context requested by MAP 1.1. |
| `GKOS-PROFILE-004` | Contributes | MEASURE 2.1 | conformance-manifest (release, GKX, commit, fixtures, exceptions, assessment type) | Exact fixture-suite, evidence, implementation and assessment references can support documentation of TEVV tools and test sets when the GKOS assessment is used within an AI-system evaluation; it is not a risk assessment by itself. |
| `GKOS-PROFILE-005` | Contributes | MEASURE 2.5 | gate-code violation fixtures | Executed violation fixtures can supply component reliability evidence when tied to deployment conditions; complete AI-system validity, reliability and generalization limits require additional evidence. |
| `GKOS-PROFILE-006` | No direct mapping | — | — | Prohibiting claim exclusions is conformance honesty, not disclosure of unmeasured AI risks under MEASURE 1.1. |
| `GKOS-PROFILE-007` | Contributes | MEASURE 2.8, MEASURE 2.9 | Viewer/Projection output | Visible provenance, limitations and contradictions can inform accountability-risk examination and interpretation of AI output in context. The viewer does not itself perform that examination or explain and validate a model. |
| `GKOS-CANON-001` | No direct mapping | — | — | A required encoding profile is a representation constraint; deterministic bytes alone do not examine accountability risks. |
| `GKOS-CANON-002` | No direct mapping | — | — | Duplicate-key rejection is a parser integrity constraint without a required AI-risk evaluation record. |
| `GKOS-CANON-003` | No direct mapping | — | — | Numeric representation rule; no RMF outcome nexus. |
| `GKOS-CANON-004` | No direct mapping | — | — | Timestamp syntax and anti-ordering rule are technical canonicalization semantics; no direct AI RMF outcome nexus. |
| `GKOS-CANON-005` | No direct mapping | — | — | Text normalization rule; no RMF outcome nexus. |
| `GKOS-CANON-006` | No direct mapping | — | — | Absent/null/empty distinction; representation only. |
| `GKOS-CANON-007` | Contributes | MEASURE 2.7 | SHA-256 canonical hash binding policy/compiler/selection refs | Digest-bound artifact integrity can support a documented security evaluation when its threat model and tamper tests are supplied. A SHA-256 value alone is not security or resilience evaluation. |
| `GKOS-CANON-008` | No direct mapping | — | — | A human rendering and hash-preserving parser prove a representation round trip, not examination of accountability risks or interpretation of AI output. |
| `GKOS-CONTEXT-001` | Contributes | MAP 1.1, MEASURE 2.8 | selection envelope | Captured purpose, recipient, selection and omissions can supply operational inputs to deployment-context and accountability-risk analysis. Broader intended use, impacted parties and substantive risk examination remain external. |
| `GKOS-CONTEXT-002` | Contributes | MEASURE 2.5 | context-manifest assembly log | Closed-input assembly can support component reliability testing in an AI-system evaluation. Test results, deployment relevance and system-level limitations remain necessary. |
| `GKOS-CONTEXT-003` | Contributes | MEASURE 2.5 | identical manifest bytes/hash | Replay determinism. |
| `GKOS-CONTEXT-004` | Contributes | MEASURE 2.8, MEASURE 2.9 | context-manifest (contradictions, warnings, restrictions, omissions) | Required warnings, contradictions and restrictions can inform accountability-risk examination and contextual interpretation of AI output; their inclusion alone does neither model validation nor risk assessment. |
| `GKOS-CONTEXT-005` | Contributes | MEASURE 2.8 | Decision Record binding manifest id/version/hash | Binding a disposition to the exact context can support investigation of accountability risks such as approval of changed evidence; the deployment must conduct and document that investigation. |
| `GKOS-AUTHUSE-001` | Contributes | MEASURE 2.8 | Authorized Use Record | Binding use to context and policy can support assessment of accountability for an AI-assisted operation, with an explicit risk question and analysis supplied by the deployment. |
| `GKOS-AUTHUSE-002` | Contributes | MEASURE 2.5, MEASURE 2.7 | refusal receipt on hash mismatch | Integrity failure fails closed; 2.7 retained because mismatch is tamper/integrity evidence. |
| `GKOS-AUTHUSE-003` | Contributes | MEASURE 2.8 | authority-basis validity fields | Action-time authority evidence can support assessment of unauthorized-action accountability risks; evaluating a grant is not itself an AI-risk examination or system deactivation. |
| `GKOS-AUTHUSE-004` | Direct evidence candidate | GOVERN 2.1, GOVERN 3.2 | actor-role fields; delegation chain | Proposing/reviewing/authorizing/executing distinct. GOVERN 1.5 NOT assigned. |
| `GKOS-AUTHUSE-005` | Contributes | MEASURE 2.8 | Refusal Receipt | A refusal receipt can support examination of whether an AI-assisted operation respected the declared boundary; the organization supplies the risk analysis and interpretation. |
| `GKOS-AUTHUSE-006` | Contributes | MANAGE 4.1, MEASURE 2.8 | Authorized Use Record outcome + correction/rollback/escalation route | Outcome and recovery-route evidence can contribute to an implemented post-deployment monitoring/recovery plan and accountability-risk examination. A route field alone establishes neither plan implementation nor risk analysis. |
| `GKOS-AUTHUSE-007` | Contributes | MEASURE 2.8 | GKOS-GATE-L7-001 refusal; captured evaluation time | Captured authority interval and refusal evidence contribute to accountability. Authority interval expiry alone is not MANAGE 2.4 AI-system deactivation. |
| `GKOS-EFFECT-001` | No direct mapping | — | — | Shared typed scope vocabulary is a machine contract, not the broader intended-use context under MAP 1.1. |
| `GKOS-EFFECT-002` | Contributes | GOVERN 3.2 | scope-containment check | Containment within valid grants contributes to the human-AI authority boundary. Scope containment alone does not develop and document responses to MAP-prioritized AI risks under MANAGE 1.3. |
| `GKOS-EFFECT-003` | No direct mapping | — | — | Failing closed on incomparable scope is a control rule; it does not itself prioritize AI risks or develop and document a response under MANAGE 1.3. |
| `GKOS-REVIEW-001` | Contributes | GOVERN 3.2 | review-lifecycle entry record | An authorized proposal-review lifecycle contributes to oversight arrangements when used for AI-system governance; lifecycle entry alone does not document organization-wide responsibilities or communication lines. |
| `GKOS-REVIEW-002` | Contributes | MEASURE 2.8 | append-only Decision Record bound to exact evidence | Evidence-bound dispositions can support examination of responsibility for reviewed AI-assisted decisions; a disposition is not itself a documented AI-risk examination. |
| `GKOS-REVIEW-003` | Direct evidence candidate | GOVERN 2.1, GOVERN 3.2 | role separation; different-model-family agent reviewer; sealed packet; human escalation | No self-approval; differentiated human-AI roles and bounded human escalation. This is proposal review, not necessarily the regular AI-system assessment described by MEASURE 1.3. |
| `GKOS-REVIEW-004` | Contributes | MEASURE 2.8 | append-only disposition history | Preserved disposition history can support examination of changes in approval/accountability. Routine history is not incident communication or a risk analysis by itself. |
| `GKOS-DISCLOSURE-001` | Contributes | MEASURE 2.10, MEASURE 2.7 | disclosure authorization; noninterference evidence | Disclosure controls and tested noninterference can contribute to privacy and security-risk evaluation when linked to identified risks; a control requirement alone does not examine or document those risks. |

Distribution (62 rows): Direct evidence candidate 5; Contributes 26; Deployment-declared 3; No direct mapping 27; Superseded 1.

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
| mapping_version | 0.2.1-draft |
| gkos_release | GKOS-2026-09-03 v0.81 |
| gkos_tag | v0.81 |
| gkos_commit | `8f2a158c6d4b8cabd907d98765766d281aec1247` |
| nist_baseline | ESR-NIST-AIRMF (AI 100-1, January 2023, DOI 10.6028/NIST.AI.100-1, Core Tables 1–4), checked 2026-09-03 |
| external_baseline_status | AI RMF 1.0 current baseline; revised AI RMF in progress as checked 2026-09-03 — re-review on publication |
| iso_baseline | ESR-ISO-42001 — verification held |
| generated_json | `docs/ecosystem/EXTERNAL_CROSSWALK.json` |
| row_source | `scripts/xw002/rows.py` |
| generator | `scripts/xw002/gen.py` |
| prose_normalized_sha256 | `67a98c69f5d255cb044ef8158a612ae97d21792c6ba6602da00bce322909b67c` |
| json_sha256 | `a3e724d32c9dd19d42e4bb0aa9b14851a855366b3d3cc0fc59641f0c7a8ffa4e` |
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
- The original v0.2-draft had ten No direct mapping rows; the current distribution is generated in §5.
- ISO/IEC 42001 section remains verification-held; no ISO rows are emitted.
- Added §4.3 anti-bloat sentence and §4.4 control rule against family-wide assignment.
- The machine-readable mirror and prose are generated from one reviewed row source with normalized prose and JSON digest binding.

### Corrective draft — 2026-09-06

The v0.2.1-draft narrows unsupported risk-measurement and direct-evidence claims and adds fail-closed validation of the pinned requirement population and mapping vocabulary. See the [62-row drafting assessment](reviews/PR42_XW002_CORRECTIVE_DRAFTING_ASSESSMENT_2026-09-06.md). These are proposed corrections under the owner instruction to fix the crosswalk, not a completed different-model-family review or a final owner disposition of reviewer findings. The [required review packet](reviews/PR42_XW002_BOUNDED_DIFFERENT_MODEL_REVIEW_PACKET.md) still controls merge.

The NIST Core PDF was reopened on 2026-09-06 for this corrective drafting pass. Earlier source-check dates remain historical; no newer NIST edition is inferred. The public [NIST add-in](ecosystem/GKOS_NIST_AI_GOVERNANCE_ADDIN_0.1_DRAFT.md) is a separate high-level proposal, not evidence that these 62 mappings have passed review. ISO Annex A remains held.
