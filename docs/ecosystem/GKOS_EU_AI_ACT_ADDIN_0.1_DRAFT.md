# EU add-in: an operational evidence bridge

**Standing:** informative proposal 0.1, prepared 2026-09-05 and published as a documentation draft 2026-09-06. No external submission, framework endorsement or implemented pilot is asserted. Repository sources refer to the reviewed 44f4258 baseline.

GKOS-EU-ADDIN-0.1 | PROPOSED AI ACT IMPLEMENTATION CONTRIBUTION
>
> Proposal: help providers and deployers assemble evidence about how an AI-supported operation was controlled, reviewed and carried out, while preserving their distinct responsibilities.

Audience: EU-facing providers and deployers, enterprise compliance and engineering teams, and relevant European standardisation or supervised pilot participants. The proposal is an informative technical contribution, not a compliance determination or an assertion that GKOS is a harmonised standard.

## Version and timing matter

Use Regulation (EU) 2024/1689 as amended by Regulation (EU) 2026/1744, and the consolidated text dated 27 July 2026. The Commission confirms high-risk Annex III rules from 2 December 2027 and Annex I product-related rules from 2 August 2028. This is not a delay of every AI Act obligation. [E01](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng), [E02](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32026R1744), [E03](https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force)

Article 50 has its own scope and exceptions. The amended transition for certain systems already placed on the market before 2 August 2026 gives until 2 December 2026 for Article 50(2). A deployment needs a role- and obligation-specific applicability review. [E01](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng)

## Original proposed add-in text
>
> A portable operational evidence pattern may help providers and deployers connect system documentation and organizational instructions to observed AI use. A selected operation can retain references to source evidence, control results, the context presented, any required human disposition, valid authority and the action outcome or refusal. The pattern should identify the party responsible for each artifact and preserve access, retention and disclosure restrictions.
>
> An implementation of GKOS is a candidate mechanism for producing those links and making missing evidence explicit. A bounded pilot should test whether different authorized parties can reconstruct the same operation and identify failures without receiving unnecessary personal or confidential data. Legal classification, compliance assessment and accountability remain with the parties and authorities responsible for them.

## The proposed ask

Review one synthetic provider/deployer evidence exchange for usability, completeness and privacy. Offer field mappings and negative cases for a specific implementation question, rather than proposing GKOS as a substitute for the AI Act, a complete technical file or a conformity-assessment route. [R13](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/EXTERNAL_STANDARDS_ENGAGEMENT_DRAFT.md), [R16](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md), [R18](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/MULTI_JURISDICTION_DEPLOYMENT_GUIDANCE_DRAFT.md)

---

## Map evidence to a defined obligation

EU ADD-IN | CANDIDATE SUPPORT, WITH RESPONSIBILITY GAPS

Article references below identify topics in the amended AI Act. Applicability depends on the system, role and timing. The middle column is our proposed technical mapping; it is not official guidance. [E01](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng)

| AI Act topic | Proposed GKOS evidence support | Still required elsewhere |
| --- | --- | --- |
| Articles 9-10: risk / data | L1/L3 source and lineage references; L4 test evidence linked to an explicit risk or data decision. | Suitability of data, risk analysis, testing design and substantive assessment. |
| Article 11 / Annex IV: documentation | A versioned index resolving the exact system, policy, test and operation evidence used in a review. | Complete applicable technical documentation and its competent maintenance. |
| Article 12: logs | Stable operation IDs joining control, context and use/refusal records; visible missing-event states. | Evidence that relevant paths are logged, interpretable and protected. |
| Articles 14 / 26: oversight | Human actor and authority, information shown, disposition, override or stop, and resulting effect. | Competent, empowered human oversight in the actual workflow. |
| Article 17: quality management | Links from controlled policy and change records to operational evidence and corrective action. | The broader quality management system and its effectiveness. |
| Article 27: impact assessment | References to the applicable assessment, its owner, version, input evidence and later changes. | Applicability determination and substantive fundamental-rights analysis. |
| Article 50: transparency | Evidence that a required notice or marking step was invoked; verify presentation through the actual delivery channel. | Effective notices or marking and correct treatment of exceptions; a receipt alone cannot show what people saw. |
| Articles 72-73: monitoring / incidents | Incident timeline, context and outcome references; correction and escalation records. | Incident classification, monitoring and reporting by the responsible parties. |

Critical oversight distinction: where Article 26(2) applies, oversight is assigned to natural persons. GKOS's bounded independent-agent review cannot substitute for that legal role. An automated check can support the person and preserve evidence of the person's decision. [E01](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng), [R04](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/00_GKOS_Master_Standard.md)

Keep provider, deployer, importer and distributor roles separate in the applicability record. One organization may hold more than one role; a shared evidence ID does not transfer its obligations to a middleware vendor.

---

## A provider/deployer evidence exchange

EU ADD-IN | INDUSTRY PILOT AND PRIVACY DESIGN

## Illustrative use case: employment decision support

Use synthetic candidate records and a simulated employer workflow to test an AI-assisted shortlisting recommendation. An applicability reviewer must classify the actual intended use before any real deployment. The simulation measures evidence and human-oversight support; it does not demonstrate lawful recruitment or acceptable model bias.

- The provider supplies versioned model/system instructions and relevant test evidence through authorized references.
- The simulated employer captures its policy, input-selection context and the exact recommendation presented to a designated human reviewer.
- The reviewer sees limitations, has a usable reject/override path, and records a disposition. An agent-generated review is identified separately.
- A synthetic action records what was attempted and confirmed. A contested outcome becomes new evidence and a correction record.
- An export presents only the fields an authorized recipient may receive; omissions and unavailable evidence remain visible.

## Required negative cases

| Inject | Expected evidence / behavior |
| --- | --- |
| Human reviewer is replaced by an agent-only disposition | The configured human-oversight gate blocks the simulated decision effect. |
| Provider instructions change after employer review | Old context remains preserved; the changed instructions require re-evaluation under the declared policy. |
| The displayed explanation drops a restriction | The presentation check reports a mismatch; it must not report faithful oversight evidence. |
| Evidence request conflicts with access or retention policy | No automatic broad disclosure; record the conflict and route it to qualified disposition. |
| Outcome is challenged after completion | Retain original evidence and append the challenge, decision and corrective action. |

## Minimum disclosure design

Store protected payloads in an authorized repository where possible; export necessary metadata and controlled references. Apply retention and deletion rules to audit evidence too. A digest is not inherently anonymous, and access-denied evidence is not evidence independently inspected. Provide a safe, minimized tombstone where permitted and identify any limit on reconstruction. [R16](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md), [R18](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/MULTI_JURISDICTION_DEPLOYMENT_GUIDANCE_DRAFT.md), [R19](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Security_Privacy_Retention.md)

Pilot success means that the review chain and failure cases are observable in this simulation. It establishes no determination about recruitment law, data protection, discrimination, AI Act conformity or real-world model performance.

---

## European engagement and review gates

EU ADD-IN | STANDALONE SOURCE AND ACTION NOTE

## How to advance the proposal

- Choose a specific evidence/logging, oversight or documentation question and name the intended use and responsible operator role.
- Ask the appropriate national standardisation route or JTC 21 participation contact about the relevant work and current access process. No open consultation deadline is assumed here. [E05](https://jtc21.eu/get-involved/)
- For a sandbox or industry study, identify an eligible sponsor and the current participation rules before presenting it as a regulatory sandbox activity.
- Offer the proposed field mapping, synthetic records, failure cases and a measured pilot report. Preserve review responses and change the mapping when the controlling text changes.

Article 40 ties presumption of conformity to the relevant harmonised standards and Official Journal references within their coverage. This packet neither establishes that status for GKOS nor claims a complete survey of current harmonised standards. [E01](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng), [E04](https://digital-strategy.ec.europa.eu/en/faqs/understanding-standardisation-ai-act)

## Questions for the owner and domain reviewer

- Which industry use and provider/deployer role should the first EU pilot address?
- Who will own the applicability, privacy and human-oversight review?
- Can an authorized independent reviewer inspect a minimized evidence package and report missing material?

Suggested decision: approve further technical drafting and a synthetic evidence exchange first. External circulation remains a later action on a named, reviewed version. Status: DRAFTED; no submission, regulator approval or acceptance claimed. [R13](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/EXTERNAL_STANDARDS_ENGAGEMENT_DRAFT.md)

## Sources and scope

- [E01](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng) [EU AI Act, consolidated 27 July 2026](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng)
- [E02](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32026R1744) [Regulation (EU) 2026/1744 - AI Omnibus](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32026R1744)
- [E03](https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force) [Commission: AI Omnibus enters into force, 27 July 2026](https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force)
- [E04](https://digital-strategy.ec.europa.eu/en/faqs/understanding-standardisation-ai-act) [Commission: understanding AI Act standardisation](https://digital-strategy.ec.europa.eu/en/faqs/understanding-standardisation-ai-act)
- [E05](https://jtc21.eu/get-involved/) [CEN-CENELEC JTC 21 participation](https://jtc21.eu/get-involved/)
- [R06](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Authority_and_Refusal_Receipt_Fields.md) [Authority and refusal receipt fields](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Authority_and_Refusal_Receipt_Fields.md)
- [R16](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md) [Conformance Evidence Package 0.1 draft](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md)
- [R18](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/MULTI_JURISDICTION_DEPLOYMENT_GUIDANCE_DRAFT.md) [Multi-jurisdiction deployment draft](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/MULTI_JURISDICTION_DEPLOYMENT_GUIDANCE_DRAFT.md)
- [R19](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Security_Privacy_Retention.md) [Security, privacy and retention annex](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Security_Privacy_Retention.md)

Access date: 2026-09-05. The consolidated legal text controls the version-sensitive references. This is a targeted implementation proposal, not a complete legal analysis. Recheck the exact instrument, scope and applicable dates before relying on a deployment plan.

## Source recheck note

On 2026-09-06 the Commission announcement and amending regulation were reopened successfully. The consolidated text endpoint timed out twice; the detailed article mapping retains the 2026-09-05 review basis and requires a fresh applicability check before operational use.
