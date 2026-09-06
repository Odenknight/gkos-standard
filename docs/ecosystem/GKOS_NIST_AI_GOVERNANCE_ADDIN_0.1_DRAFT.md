# NIST add-in: testable agent accountability

**Standing:** informative proposal 0.1, prepared 2026-09-05 and published as a documentation draft 2026-09-06. No external submission, framework endorsement or implemented pilot is asserted. Repository sources refer to the reviewed 44f4258 baseline.

GKOS-NIST-ADDIN-0.1 | PROPOSED TECHNICAL CONTRIBUTION
>
> Proposal: a reproducible evidence-and-failure-case package for studying how agent identity, delegated authority and context bind to consequential action.

## External basis

The AI RMF 1.0 is a voluntary risk-management framework. Its Core uses GOVERN, MAP, MEASURE and MANAGE; these functions are not a mandatory sequence. NIST AI 600-1 is the 2024 Generative AI Profile. The NIST AI Resource Center states that an AI RMF revision is in progress, so this proposal pins its mapping to 1.0. [N01](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10), [N02](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/), [N03](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)

The AI Agent Standards Initiative addresses standards, open protocols and research into agent security and identity. NCCoE's identity-and-authorization project is a particularly relevant technical audience. It currently reports Reviewing Comments and says the concept-paper comment period is closed. [N04](https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative), [N05](https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization), [N06](https://www.nccoe.nist.gov/sites/default/files/2026-02/accelerating-the-adoption-of-software-and-ai-agent-identity-and-authorization-concept-paper.pdf)

## Original proposed add-in text
>
> A useful agent-governance demonstration should show both why an operation was admitted and what happens when evidence or authority is insufficient. We propose a bounded test corpus that distinguishes the agent, the represented principal, the authority source, the exact context, the requested effect and the result. Positive cases are paired with expired-authority, widened-delegation, context-substitution, replay and uncertain-outcome cases.
>
> GKOS offers candidate record semantics and deterministic evidence contracts for this demonstration. Independent tools could inspect the same captured inputs and determine whether the declared control outcomes are supported. The contribution would report scope, unresolved risks, missing evidence and implementation differences alongside successful cases.

## Industry relevance

Start with a synthetic IT change assistant requesting a narrowly scoped configuration update. This gives enterprise security and operations teams a clear question: did the assistant act under the right principal and grant, on the reviewed change, within the permitted scope, and leave enough evidence to reconstruct or recover the outcome?

The proposed contribution is a mechanism study. It does not establish NIST adoption, an AI RMF certification, overall AI safety or a qualified GKOS profile. Baseline: GKOS v0.81 and reviewed main 44f425861412532b2b55323966b3b9917c4c109c. [R03](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/releases/GKOS_2026-09-03_v0.81_PUBLICATION_RECORD.md), [R04](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/00_GKOS_Master_Standard.md), [R05](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Conformance_Profiles.md), [R06](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Authority_and_Refusal_Receipt_Fields.md)

---

## Connect risk activities to operational evidence

NIST ADD-IN | ORIGINAL CANDIDATE MAPPING

| AI RMF function [N02](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) | Proposed GKOS support | Evidence GKOS cannot supply alone |
| --- | --- | --- |
| GOVERN | Bind policy owner, authority source, reviewer, executor and approved limits to records; retain correction and escalation history. | Organizational accountability, risk culture, competent oversight and justified risk tolerance. |
| MAP | Preserve intended use, affected actors, dependencies, source lineage, restrictions and the captured decision context. | A sound understanding of use context, potential harms and stakeholder impacts. |
| MEASURE | Record exact test method, inputs, version, results, uncertainty, coverage and evaluated or unevaluated states. | Valid measurement methods, representative evaluations and evidence of real-world performance. |
| MANAGE | Bind a risk response to an authorized disposition, enforced action/refusal, monitoring result and recovery path. | Appropriate prioritization and effective risk treatment throughout the lifecycle. |

## Relationship to the Generative AI Profile

Use AI 600-1 as a separate source for a use-case-specific risk review, then attach the resulting evaluation evidence to the operation. The proposal does not treat a complete receipt as proof that a generated claim is accurate, safe or non-discriminatory. Choose profile actions with a domain reviewer before assigning subcategory-level coverage. [N03](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)

## A narrow NCCoE contribution

The concept paper explores identifying agents and authorizing their access and actions using established identity approaches. The proposed GKOS contribution adds an inspectable association between that authority evidence, the action-time context and the effect record. It does not invent a replacement identity protocol. [N06](https://www.nccoe.nist.gov/sites/default/files/2026-02/accelerating-the-adoption-of-software-and-ai-agent-identity-and-authorization-concept-paper.pdf)

- Show a distinct agent identity and represented principal in the synthetic record.
- Demonstrate that delegation narrows action, resource, tenant and time scope.
- Test re-evaluation at the effect boundary when a grant expires or is revoked.
- Preserve refusal and reconciliation evidence for failures and uncertain outcomes.

Crosswalk depth: function-level mapping only. No exhaustive NIST subcategory coverage, official agentic RMF profile, NIST certification or NIST endorsement is claimed. The experiment must publish limitations and excluded paths.

---

## NIST pilot and participation route

NIST ADD-IN | STANDALONE SOURCE AND ACTION NOTE

## Pilot: a synthetic configuration-change agent

Create a disposable target with no production credentials. One principal delegates a narrow simulated change; the proposal and context are sealed before admission. Use two reader/verifier tools to inspect records. Independent organizational operation is a separate evidence dimension from running the same code in a second process.

| Test | Predeclared expected result |
| --- | --- |
| Grant valid at start and just before expiry | Evaluate the declared half-open validity interval using captured time. |
| Grant expired or revocation cannot be checked | No new synthetic effect when the applicable mandatory authority gate cannot pass. |
| Context replaced after review | Digest/binding mismatch blocks the effect and creates the applicable refusal evidence. |
| Duplicate request or uncertain target response | No blind repeated effect; reconcile the target outcome and retain retry history. |
| Source text asks for broader privileges | Treat it as untrusted input; it cannot widen the grant. |
| Direct tool call bypasses the adapter | The declared protected path must reject it; otherwise report the integration as observation-only or failed. |

## Engagement route

Do not file this as an on-time response to the closed NCCoE concept consultation. Use the project's current contact route to ask about future opportunities, or prepare a relevant AI RMF Playbook contribution through its published feedback process. Confirm the receiving work and instructions at the time of submission. [N05](https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization), [N07](https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook)

Offer one reproducible case, its negative twin and raw results before claiming broad benefit. The proposed tests have not been run in this packet. Exact-text owner approval and a factual/technical review should precede external submission. [R13](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/EXTERNAL_STANDARDS_ENGAGEMENT_DRAFT.md)

## Sources

- [N01](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) [NIST AI RMF 1.0, NIST AI 100-1, January 2023](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)
- [N02](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) [NIST AI RMF Core: GOVERN, MAP, MEASURE, MANAGE](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)
- [N03](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) [NIST AI 600-1, Generative AI Profile, July 2024](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [N04](https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative) [NIST AI Agent Standards Initiative](https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative)
- [N05](https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization) [NCCoE Software and AI Agent Identity and Authorization project](https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization)
- [N06](https://www.nccoe.nist.gov/sites/default/files/2026-02/accelerating-the-adoption-of-software-and-ai-agent-identity-and-authorization-concept-paper.pdf) [NCCoE identity and authorization concept paper, February 2026](https://www.nccoe.nist.gov/sites/default/files/2026-02/accelerating-the-adoption-of-software-and-ai-agent-identity-and-authorization-concept-paper.pdf)
- [N07](https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook) [NIST AI RMF Playbook and feedback route](https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook)
- [R06](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Authority_and_Refusal_Receipt_Fields.md) [Authority and refusal receipt fields](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Authority_and_Refusal_Receipt_Fields.md)
- [R13](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/EXTERNAL_STANDARDS_ENGAGEMENT_DRAFT.md) [External standards engagement draft](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/EXTERNAL_STANDARDS_ENGAGEMENT_DRAFT.md)

Access date: 2026-09-05. The unverified AI 300-1 draft reference in the repository is excluded from this proposal. The packet does not imply that any NIST call, pilot or collaboration has accepted GKOS.
