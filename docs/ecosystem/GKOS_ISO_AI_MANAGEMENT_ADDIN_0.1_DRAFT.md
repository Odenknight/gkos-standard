# ISO add-in: evidence for AI management

**Standing:** informative proposal 0.1, prepared 2026-09-05 and published as a documentation draft 2026-09-06. No external submission, framework endorsement or implemented pilot is asserted. Repository sources refer to the reviewed 44f4258 baseline.

GKOS-ISO-ADDIN-0.1 | PROPOSED INFORMATIVE CONTRIBUTION
>
> Proposal: a portable operational evidence pattern that organizations can connect to their AI management, risk-treatment and impact-assessment processes.

Target audience: AI management-system owners, internal auditors, implementers and experts participating in ISO/IEC JTC 1/SC 42 through the appropriate national process. This is a proposed implementation contribution; it is not a new ISO work item or a submission already accepted by a committee.

## External basis

ISO/IEC 42001:2023 addresses an organizational AI management system. ISO/IEC 23894:2023 provides AI risk-management guidance. ISO/IEC 42005:2025 addresses AI system impact assessment. The mapping here is at the public scope and purpose level. Licensed full texts were not reviewed, so no clause-by-clause conformity or completeness claim is made. [I01](https://www.iso.org/standard/42001), [I02](https://www.iso.org/standard/77304.html), [I03](https://www.iso.org/standard/42005)

## Original proposed add-in text
>
> Organizations may evaluate an implementation pattern that links AI-related policies, risk decisions and impact assessments to operational evidence. For a selected use case, the pattern records the evidence available, the proposal considered, the controls evaluated, the authorized disposition, the context used and the outcome or refusal. Each record retains its identity, version, responsible actor and relationship to the governing policy.
>
> GKOS provides a candidate vocabulary and artifact contract for that pattern. A bounded pilot can assess whether a reviewer can reconstruct a sampled decision, identify missing evidence and follow a corrective action across systems. The organization remains responsible for the adequacy of its management system, the quality of its risk and impact assessments, and its assessment and certification arrangements.

## Industry value hypothesis

A manufacturer using AI to recommend maintenance work could link the equipment evidence, approved operating constraints, maintenance decision and work-order result. An auditor could sample the chain without asking each system owner to reconstruct it separately. The pilot should measure the reconstruction time and completeness, including unresolved records; no saving is assumed in advance.

Baseline: published GKOS v0.81; reviewed main 44f425861412532b2b55323966b3b9917c4c109c. Existing record semantics are in [R04](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/00_GKOS_Master_Standard.md), [R05](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Conformance_Profiles.md), [R06](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Authority_and_Refusal_Receipt_Fields.md). The mapping and pilot below are new informative proposals.

---

## Map management purposes to evidence

ISO ADD-IN | PROPOSED MAPPING, NOT A CERTIFICATION CROSSWALK

| Purpose / source | Candidate GKOS contribution | Evidence beyond GKOS |
| --- | --- | --- |
| Management accountability - 42001 [I01](https://www.iso.org/standard/42001) | Link policy owner, delegated authority and disposition to the governed operation using L4/L5/L7 records. | Management commitment, competence, organizational scope and effective management processes. |
| AI risk management - 23894 [I02](https://www.iso.org/standard/77304.html) | Preserve risk assessment as evidence; link each selected control, its version and result to the relevant risk decision. | Risk identification quality, risk criteria, residual-risk acceptance and justified treatment choices. |
| Impact assessment - 42005 [I03](https://www.iso.org/standard/42005) | Version assessment inputs, affected-group evidence and decisions; link new operational outcomes to reassessment. | Meaningful stakeholder input and competent evaluation of impacts on people and society. |
| Operational traceability - proposed application | Use source, lineage, context and action records to trace a sampled recommendation and its authorized use. | Evidence that the collected records cover all relevant paths and that source statements are accurate. |
| Review and improvement - proposed application | Attach incident, refusal and corrective-action references; preserve supersession and a new evidence lifecycle. | An effective internal review, corrective-action process and assessment of whether changes worked. |

## Suggested evidence worksheet

- Management process reference and responsible owner.
- Exact policy, risk or impact-assessment record and revision.
- GKOS operation and artifact references; access authority for protected material.
- Reviewer question, sample definition, result and missing evidence.
- Corrective-action owner, due date and closure evidence.

Keep an ISO control/requirement identifier only after a qualified reviewer checks the licensed edition and applicability. Record mapping status as proposed, reviewed or superseded; retain disagreements. These worksheet fields are a proposed organizational view and do not change GKX.

## Boundary

A technically complete action record cannot establish that the organization selected suitable objectives, assessed social impacts well or operates an effective AI management system. GKOS evidence is an input to those judgments. Do not describe a product as ISO-certified because it emits GKOS records.

---

## ISO pilot and engagement route

ISO ADD-IN | OWNER REVIEW COPY

## Pilot: maintenance recommendation to work order

Use synthetic maintenance cases with a records owner, an operations approver and a reviewer. Phase 1 reconstructs recommendations without issuing work orders. A later isolated simulation tests creation and cancellation of synthetic work orders. Capture accepted, rejected and deferred cases, a stale policy and an unavailable source.

| Question | Predeclared measure |
| --- | --- |
| Can a reviewer reconstruct the decision? | Time to identify source version, policy, disposition, context and outcome; report median and p95 against the same cases using current logs. |
| Are gaps visible? | For every deliberately omitted artifact, the review view reports incomplete or unavailable rather than complete. |
| Does correction retain history? | Every corrected case preserves the original decision plus the correction rationale, actor and successor references. |
| Does portability help? | A second reader tool resolves the same authorized evidence and reports the same gaps. Tool agreement is not independent certification. |

## What to offer the receiving community

Offer the worksheet, a synthetic example, negative cases and the measured report as an implementation pattern. Ask whether the evidence is useful for one specified management process and what is missing. Engage through the appropriate national standards body; committee participation and any work-item proposal follow that body's process. [I04](https://www.iso.org/about/members)

Before external circulation: verify the intended committee/work item, complete the licensed-text mapping review, name the human editor and contributors, record conflicts of interest and preserve the owner-approved exact text. The current status is DRAFTED, with no external submission, acknowledgment or endorsement. [R13](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/EXTERNAL_STANDARDS_ENGAGEMENT_DRAFT.md)

## Sources and scope

- [I01](https://www.iso.org/standard/42001) [ISO/IEC 42001:2023 - AI management systems](https://www.iso.org/standard/42001)
- [I02](https://www.iso.org/standard/77304.html) [ISO/IEC 23894:2023 - AI risk management guidance](https://www.iso.org/standard/77304.html)
- [I03](https://www.iso.org/standard/42005) [ISO/IEC 42005:2025 - AI system impact assessment](https://www.iso.org/standard/42005)
- [I04](https://www.iso.org/about/members) [ISO national member participation](https://www.iso.org/about/members)
- [R04](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/00_GKOS_Master_Standard.md) [Master standard and controlling annexes](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/00_GKOS_Master_Standard.md)
- [R06](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Authority_and_Refusal_Receipt_Fields.md) [Authority and refusal receipt fields](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Authority_and_Refusal_Receipt_Fields.md)
- [R13](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/EXTERNAL_STANDARDS_ENGAGEMENT_DRAFT.md) [External standards engagement draft](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/EXTERNAL_STANDARDS_ENGAGEMENT_DRAFT.md)

Access date: 2026-09-05. ISO references support the limited descriptions of scope above. All GKOS mappings, sample fields and pilot thresholds are original proposals for review, not quoted ISO requirements.
