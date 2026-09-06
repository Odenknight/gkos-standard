# PR #42 corrective drafting assessment — 2026-09-06

**Standing:** author/editor assessment, not the required different-model-family review. No PASS verdict or independent verification is asserted.

**Editor:** OpenAI GPT-based Codex assistant in the owner-authorized editing session; exact served model/version was not exposed. The editor now authors these corrections and is ineligible to approve them as a separate reviewer.

**Input:** PR #42 head `90b4c184ff1ff3ae5ff1a6f73caa9a982924531d`; integration baseline main `671512b8e23b1df45375a3f3bf18d56357da04d8`. Published requirement baseline `8f2a158c6d4b8cabd907d98765766d281aec1247`.

**Source:** [NIST AI 100-1, January 2023](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf), Core Tables 1–4, reopened 2026-09-06. Printed pages 22–24 cover GOVERN, 26–27 MAP, 29–31 MEASURE and 32–33 MANAGE. Each row was compared with its exact published registry requirement; the pinned registry copy is in `scripts/xw002/requirements-v081.md`. ISO full text was not accessed or used.

## Corrective findings

- **XW2-EDIT-001 — MAJOR:** GKOS profile/fixture coverage was mapped to AI-risk metric selection (MEASURE 1.1) without the required scope nexus. Remove those mappings.
- **XW2-EDIT-002 — MAJOR:** Receipts, hashes and generic traceability were treated as direct evidence of risk examination. Distinguish useful partial evidence from an actual documented assessment; remove mechanics-only mappings and qualify retained contributions.
- **XW2-EDIT-003 — MAJOR:** Generic fail-closed behavior was equated with a planned response to prioritized AI risks. Remove MANAGE 1.3 where no such risk prioritization/response plan is mandated.
- **XW2-EDIT-004 — MAJOR:** The generator could silently overwrite duplicate IDs in JSON and did not enforce registry coverage or subcategory validity. Add pinned-population checks and adversarial tests.
- **XW2-EDIT-005 — MINOR:** Crosswalk and high-level NIST add-in standing needed separation; merge conflicts obscured current source-status notes. Preserve both and make the review hold explicit.

The user authorized corrective work and pushing changes. These draft findings and proposed row corrections still require the separate reviewer and explicit owner disposition specified in the sealed packet. They are not a fabricated completion of that gate.

## All 62 row proposals

Codes retain the candidate class vocabulary: DEC, CON, DD, NDM, SUP. RETAIN is an editorial recommendation, not external approval. For NDM rows the reason explains why an outcome assignment is not asserted; this does not forbid separately justified deployment evidence reuse.

| GKOS ID | Previous candidate | Proposed correction | Draft assessment and source scope |
| --- | --- | --- | --- |
| `GKOS-CONFORMANCE-001` | DEC; MEASURE 1.1 | CORRECT: NDM; none | UNEVALUATED records a missing GKOS fixture execution, not selection of AI-risk metrics or disclosure of unmeasured MAP risks. |
| `GKOS-CONFORMANCE-002` | CON; MEASURE 1.1 | CORRECT: NDM; none | Eligibility of a GKOS profile claim does not select AI-risk measurement approaches or identify unmeasured AI risks. |
| `GKOS-CONFORMANCE-003` | NDM; none | RETAIN: NDM; none | Fixture/adapter boundary rule does not require independent AI-system assessment; no direct RMF outcome nexus. |
| `GKOS-IDENTITY-001` | NDM; none | RETAIN: NDM; none | Identifier format rule; no RMF outcome nexus. |
| `GKOS-IDENTITY-002` | NDM; none | RETAIN: NDM; none | Legacy identifier validity; no RMF outcome nexus. |
| `GKOS-IDENTITY-003` | CON; MEASURE 2.8 | CORRECT: NDM; none | Preserving a historical UID is an identity constraint, not an examination of transparency/accountability risks. |
| `GKOS-IDENTITY-004` | NDM; none | RETAIN: NDM; none | Anti-inference rule for identifier ordering; important GKOS authority semantics, but no direct AI RMF outcome nexus. |
| `GKOS-LINEAGE-001` | CON; MEASURE 2.8 | CORRECT: NDM; none | Preserving all successor branches is a graph rule; it does not mandate an AI-risk examination. |
| `GKOS-LINEAGE-002` | NDM; none | RETAIN: NDM; none | Derivation rule for invalid_at; technical only. |
| `GKOS-LINEAGE-003` | CON; MEASURE 2.8 | CORRECT: NDM; none | Rejecting automatic authoritative succession is a technical authority constraint, not an organizational accountability-risk assessment. |
| `GKOS-RECEIPT-001` | DEC; MEASURE 2.8 | CORRECT: CON; MEASURE 2.8 | Durable state-change evidence can support examination of accountability failures when linked to a MAP-identified risk; it does not itself perform that examination. |
| `GKOS-RECEIPT-002` | DEC; MEASURE 2.8, GOVERN 2.1 | CORRECT: CON; MEASURE 2.8 | Actor and predicate attribution can support examination of decision accountability. Actor class alone does not document organizational roles and communication lines under GOVERN 2.1. |
| `GKOS-RECEIPT-003` | CON; MEASURE 2.5, MEASURE 2.8 | CORRECT: CON; MEASURE 2.5, MEASURE 2.8 | Tested receipt-loss and compensation behavior can support reliability and accountability-risk assessment for the deployed system; the binding rule alone is not a system-level demonstration. |
| `GKOS-POLICY-001` | DD; GOVERN 1.2, MEASURE 2.8 | CORRECT: DD; GOVERN 1.2 | GKOS requires identified, versioned policy inputs. The organization must supply trustworthiness policy substance and evidence that it is integrated into practice; policy identity alone is insufficient. |
| `GKOS-RETENTION-001` | DD; GOVERN 1.1 | RETAIN: DD; GOVERN 1.1 | Legal/regulatory obligation is deployment-declared. |
| `GKOS-RETENTION-002` | DEC; MEASURE 2.8 | CORRECT: CON; MEASURE 2.8 | The recorded hold predicate and result can support assessment of accountability for a disposition when linked to the relevant AI risk; no risk assessment is mandated by this row. |
| `GKOS-RETENTION-003` | DD; GOVERN 1.1, MANAGE 1.3 | CORRECT: DD; GOVERN 1.1 | The organization supplies the legal hold/erasure basis and human disposition. An indeterminate hold is not necessarily a MAP-prioritized AI risk response under MANAGE 1.3. |
| `GKOS-REENTRY-001` | CON; MEASURE 2.8 | CORRECT: NDM; none | New-source re-entry is a provenance rule; the requirement does not examine a mapped AI risk. |
| `GKOS-REENTRY-002` | CON; MEASURE 2.8 | CORRECT: NDM; none | Non-inheritance of prior standing is a GKOS semantic constraint, not an AI RMF risk-assessment record. |
| `GKOS-REENTRY-003` | CON; MEASURE 2.8 | CORRECT: NDM; none | Non-destructive re-entry preserves history but does not mandate examination of AI-risk outcomes. |
| `GKOS-REENTRY-004` | DEC; GOVERN 3.2, MEASURE 2.8 | CORRECT: DEC; GOVERN 3.2 | Explicit human or bounded delegated supersession supplies evidence of differentiated human-AI authority; broader oversight policy and operation remain to be demonstrated. |
| `GKOS-DELEGATION-001` | DEC; GOVERN 2.1, GOVERN 3.2 | RETAIN: DEC; GOVERN 2.1, GOVERN 3.2 | Documented, differentiated human-AI authority. |
| `GKOS-DELEGATION-002` | DEC; GOVERN 3.2, MANAGE 1.3 | CORRECT: DEC; GOVERN 3.2 | Routine-only delegation and required prior human disposition for other outcomes directly evidence a human-AI oversight boundary. Major classification is not itself MAP-based risk prioritization under MANAGE 1.3. |
| `GKOS-DELEGATION-003` | NDM; none | RETAIN: NDM; none | Raise-only nondeterministic checking is a GKOS control-integrity rule; no direct AI RMF outcome nexus. |
| `GKOS-DELEGATION-004` | SUP; none | RETAIN: SUP; none | Superseded for v0.81 line; see GKOS-REVIEW-001..003. |
| `GKOS-DELEGATION-005` | DEC; GOVERN 3.2, GOVERN 2.1 | CORRECT: CON; GOVERN 3.2 | Limiting supersession delegation to its stated scope contributes to human-AI authority boundaries; a prohibition alone is not documentation of organizational responsibility or communication lines. |
| `GKOS-DELEGATION-006` | CON; GOVERN 3.2, MANAGE 4.1 | RETAIN: CON; GOVERN 3.2, MANAGE 4.1 | Overdue-review freeze and bounded exception contribute to human-AI oversight and monitoring/override. Not MANAGE 2.4 absent AI-system performance/outcome inconsistency. |
| `GKOS-PROFILE-001` | CON; MEASURE 1.1 | CORRECT: NDM; none | Core profile coverage is a GKOS requirement population, not a selection of AI-risk metrics. |
| `GKOS-PROFILE-002` | CON; MEASURE 1.1 | CORRECT: NDM; none | Advanced profile coverage is a GKOS requirement population, not a selection of AI-risk metrics. |
| `GKOS-PROFILE-003` | CON; MAP 1.1 | CORRECT: NDM; none | Read-only claim scope does not document the intended AI application and broader deployment context requested by MAP 1.1. |
| `GKOS-PROFILE-004` | DEC; MEASURE 2.8 | CORRECT: CON; MEASURE 2.1 | Exact fixture-suite, evidence, implementation and assessment references can support documentation of TEVV tools and test sets when the GKOS assessment is used within an AI-system evaluation; it is not a risk assessment by itself. |
| `GKOS-PROFILE-005` | CON; MEASURE 2.5 | CORRECT: CON; MEASURE 2.5 | Executed violation fixtures can supply component reliability evidence when tied to deployment conditions; complete AI-system validity, reliability and generalization limits require additional evidence. |
| `GKOS-PROFILE-006` | CON; MEASURE 1.1 | CORRECT: NDM; none | Prohibiting claim exclusions is conformance honesty, not disclosure of unmeasured AI risks under MEASURE 1.1. |
| `GKOS-PROFILE-007` | DEC; MEASURE 2.8, MEASURE 2.9 | CORRECT: CON; MEASURE 2.8, MEASURE 2.9 | Visible provenance, limitations and contradictions can inform accountability-risk examination and interpretation of AI output in context. The viewer does not itself perform that examination or explain and validate a model. |
| `GKOS-CANON-001` | CON; MEASURE 2.8 | CORRECT: NDM; none | A required encoding profile is a representation constraint; deterministic bytes alone do not examine accountability risks. |
| `GKOS-CANON-002` | CON; MEASURE 2.8 | CORRECT: NDM; none | Duplicate-key rejection is a parser integrity constraint without a required AI-risk evaluation record. |
| `GKOS-CANON-003` | NDM; none | RETAIN: NDM; none | Numeric representation rule; no RMF outcome nexus. |
| `GKOS-CANON-004` | NDM; none | RETAIN: NDM; none | Timestamp syntax and anti-ordering rule are technical canonicalization semantics; no direct AI RMF outcome nexus. |
| `GKOS-CANON-005` | NDM; none | RETAIN: NDM; none | Text normalization rule; no RMF outcome nexus. |
| `GKOS-CANON-006` | NDM; none | RETAIN: NDM; none | Absent/null/empty distinction; representation only. |
| `GKOS-CANON-007` | CON; MEASURE 2.7, MEASURE 2.8 | CORRECT: CON; MEASURE 2.7 | Digest-bound artifact integrity can support a documented security evaluation when its threat model and tamper tests are supplied. A SHA-256 value alone is not security or resilience evaluation. |
| `GKOS-CANON-008` | CON; MEASURE 2.8 | CORRECT: NDM; none | A human rendering and hash-preserving parser prove a representation round trip, not examination of accountability risks or interpretation of AI output. |
| `GKOS-CONTEXT-001` | DEC; MAP 1.1, MEASURE 2.8 | CORRECT: CON; MAP 1.1, MEASURE 2.8 | Captured purpose, recipient, selection and omissions can supply operational inputs to deployment-context and accountability-risk analysis. Broader intended use, impacted parties and substantive risk examination remain external. |
| `GKOS-CONTEXT-002` | CON; MEASURE 2.5, MEASURE 2.8 | CORRECT: CON; MEASURE 2.5 | Closed-input assembly can support component reliability testing in an AI-system evaluation. Test results, deployment relevance and system-level limitations remain necessary. |
| `GKOS-CONTEXT-003` | CON; MEASURE 2.5 | RETAIN: CON; MEASURE 2.5 | Replay determinism. |
| `GKOS-CONTEXT-004` | DEC; MEASURE 2.8, MEASURE 2.9 | CORRECT: CON; MEASURE 2.8, MEASURE 2.9 | Required warnings, contradictions and restrictions can inform accountability-risk examination and contextual interpretation of AI output; their inclusion alone does neither model validation nor risk assessment. |
| `GKOS-CONTEXT-005` | DEC; MEASURE 2.8 | CORRECT: CON; MEASURE 2.8 | Binding a disposition to the exact context can support investigation of accountability risks such as approval of changed evidence; the deployment must conduct and document that investigation. |
| `GKOS-AUTHUSE-001` | DEC; MEASURE 2.8 | CORRECT: CON; MEASURE 2.8 | Binding use to context and policy can support assessment of accountability for an AI-assisted operation, with an explicit risk question and analysis supplied by the deployment. |
| `GKOS-AUTHUSE-002` | CON; MEASURE 2.5, MEASURE 2.7 | RETAIN: CON; MEASURE 2.5, MEASURE 2.7 | Integrity failure fails closed; 2.7 retained because mismatch is tamper/integrity evidence. |
| `GKOS-AUTHUSE-003` | DEC; MEASURE 2.8 | CORRECT: CON; MEASURE 2.8 | Action-time authority evidence can support assessment of unauthorized-action accountability risks; evaluating a grant is not itself an AI-risk examination or system deactivation. |
| `GKOS-AUTHUSE-004` | DEC; GOVERN 2.1, GOVERN 3.2 | RETAIN: DEC; GOVERN 2.1, GOVERN 3.2 | Proposing/reviewing/authorizing/executing distinct. GOVERN 1.5 NOT assigned. |
| `GKOS-AUTHUSE-005` | DEC; MEASURE 2.8 | CORRECT: CON; MEASURE 2.8 | A refusal receipt can support examination of whether an AI-assisted operation respected the declared boundary; the organization supplies the risk analysis and interpretation. |
| `GKOS-AUTHUSE-006` | DEC; MANAGE 4.1, MEASURE 2.8 | CORRECT: CON; MANAGE 4.1, MEASURE 2.8 | Outcome and recovery-route evidence can contribute to an implemented post-deployment monitoring/recovery plan and accountability-risk examination. A route field alone establishes neither plan implementation nor risk analysis. |
| `GKOS-AUTHUSE-007` | CON; MEASURE 2.8 | RETAIN: CON; MEASURE 2.8 | Captured authority interval and refusal evidence contribute to accountability. Authority interval expiry alone is not MANAGE 2.4 AI-system deactivation. |
| `GKOS-EFFECT-001` | CON; MAP 1.1 | CORRECT: NDM; none | Shared typed scope vocabulary is a machine contract, not the broader intended-use context under MAP 1.1. |
| `GKOS-EFFECT-002` | DEC; GOVERN 3.2, MANAGE 1.3 | CORRECT: CON; GOVERN 3.2 | Containment within valid grants contributes to the human-AI authority boundary. Scope containment alone does not develop and document responses to MAP-prioritized AI risks under MANAGE 1.3. |
| `GKOS-EFFECT-003` | CON; MANAGE 1.3 | CORRECT: NDM; none | Failing closed on incomparable scope is a control rule; it does not itself prioritize AI risks or develop and document a response under MANAGE 1.3. |
| `GKOS-REVIEW-001` | DEC; GOVERN 3.2, GOVERN 2.1 | CORRECT: CON; GOVERN 3.2 | An authorized proposal-review lifecycle contributes to oversight arrangements when used for AI-system governance; lifecycle entry alone does not document organization-wide responsibilities or communication lines. |
| `GKOS-REVIEW-002` | DEC; MEASURE 2.8 | CORRECT: CON; MEASURE 2.8 | Evidence-bound dispositions can support examination of responsibility for reviewed AI-assisted decisions; a disposition is not itself a documented AI-risk examination. |
| `GKOS-REVIEW-003` | DEC; GOVERN 2.1, GOVERN 3.2 | RETAIN: DEC; GOVERN 2.1, GOVERN 3.2 | No self-approval; differentiated human-AI roles and bounded human escalation. This is proposal review, not necessarily the regular AI-system assessment described by MEASURE 1.3. |
| `GKOS-REVIEW-004` | DEC; MEASURE 2.8 | CORRECT: CON; MEASURE 2.8 | Preserved disposition history can support examination of changes in approval/accountability. Routine history is not incident communication or a risk analysis by itself. |
| `GKOS-DISCLOSURE-001` | CON; MEASURE 2.10, MEASURE 2.7 | CORRECT: CON; MEASURE 2.10, MEASURE 2.7 | Disclosure controls and tested noninterference can contribute to privacy and security-risk evaluation when linked to identified risks; a control requirement alone does not examine or document those risks. |
