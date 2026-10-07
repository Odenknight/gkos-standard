# Middleware pilot proposal

**Standing:** proposed, informative, not executed. Owners, participants and execution scope remain to be selected.

## Reuse evidence, preserve separate judgments

The integration opportunity is evidence reuse. A policy, a control result or a context record may be relevant to more than one review, but relevance is not equivalence. The ISO, EU and NIST add-ins should each define their own applicability and interpretation. Keep one stable evidence identity and create separate mappings and review conclusions.

### What an industry buyer could evaluate

- Audit preparation: can a reviewer resolve the chain faster, with fewer unsupported assumptions?
- Agent operations: are denied, stale, cross-tenant and uncertain actions visible at the relevant boundary?
- Supplier exchange: can a second authorized tool interpret the same record and show the same gaps?
- Portability: can an adapter or storage component be changed while preserving required semantics?

Package integrity is a property of the files and their references. Evidence sufficiency is a review judgment. A conformance determination has its own complete requirement population and fixture gates. The product and report should label these separately. [R05](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Conformance_Profiles.md), [R16](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md)

## A bounded industry pilot plan

| Stage | Work and deliverable | Exit decision |
| --- | --- | --- |
| Week 1: choose and scope | Pick one synthetic use case, one process owner, one evidence owner and one reviewer. Record exact versions, protected effect, legal/management questions and exclusions. | Approve the test corpus and success measures before implementation. |
| Week 2: evidence-only integration | Connect preserved inputs, proposal, controls, context and read-only review output. Demonstrate visible omissions. | The review view reconstructs a sample without inventing missing facts. |
| Weeks 3-4: bounded effect simulation | Add exclusive enforcement, authority/context checks, synthetic effect, durable receipt and reconciliation. Run negative and crash-boundary cases. | No observed unauthorized or duplicate effect in the declared corpus; all failures retained. |
| Week 5: independent inspection | A separately operated reader or adapter inspects the same public/synthetic evidence. Record shared dependencies and disagreements. | Report what is independently reproduced and what still depends on the first implementation. |
| Week 6: comparison and owner review | Compare current logs with the GKOS evidence path; publish raw trial data, costs, limitations and dispositions in the proposed review package. | Decide whether to expand, correct, repeat or stop. No automatic production promotion. |

### Candidate industries and first workflows

- IT operations: simulated configuration change; primary question is delegated authority and recovery.
- Manufacturing: maintenance recommendation and synthetic work order; primary question is decision reconstruction.
- Customer service: synthetic refund approval; primary question is policy/context consistency and duplicate-effect prevention.
- Employment decision support: synthetic oversight evidence only; add qualified domain and privacy review before any real deployment.

### Budget inputs to collect

Measure adapter engineering effort, operation volume, bytes stored, retention period, policy latency, review time, storage/access costs and reconciliation workload. Estimate annual value as measured review time saved times loaded reviewer cost, minus integration and operating costs. Do not monetize presumed avoided regulatory penalties or claim savings before measurement.

The six-week plan assumes a small staffed team and accessible synthetic systems. The repository's existing R21 pilot sequence provides the predecessor design; this proposal packages a selected slice for industry review. [R17](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/PILOT_PROGRAM_DRAFT.md)

## Agree on success before running the pilot

| Measure | Definition / proposed target | Report limitation |
| --- | --- | --- |
| Reconstruction completeness | Every required field/reference in the declared sample resolves or is explicitly marked missing, protected or unevaluated. No silent gaps. | A complete sample does not establish complete system coverage. |
| Mandatory failure behavior | Zero unauthorized effects observed across all declared expired, revoked, widened-scope, stale-context and bypass cases. | A zero count in finite tests is not a proof of security. |
| Context reproduction | 100% byte/hash equality for eligible deterministic replay cases using captured inputs and pinned compiler/policy. | Replaying assembly does not reproduce retrieval or prove source truth. |
| Effect/receipt reconciliation | All injected crash/timeout cases resolve to a known outcome or an explicit unresolved state; no blind duplicate invocation. | Target-side idempotency and query support must be documented. |
| Protected evidence | Every planted access/tenant violation is denied or routed as policy requires, with safe evidence of the result. | Hashes, metadata and reviewer exports may still be sensitive. |
| Reviewer effort | Use at least 30 synthetic cases, the same questions and a counterbalanced order. Report median/p95 time and error rate; a 25% median reduction is a proposed target. | This is an initial usability target, not statistical proof or an achieved ROI claim. |
| Interoperability | Two tools agree on artifact identity, visible defects and missing-evidence status for the shared test corpus. | Shared libraries or operators limit independence. Disclose them. |
| Operating burden | Record p50/p95 added latency, storage bytes/operation and manual interventions; owners set the budget before testing. | No universal acceptable latency or retention interval is assumed. |

### Stop and report

Stop the affected simulation on an unauthorized effect, leakage, silent evidence loss or false complete/pass report. Preserve the failure, its circumstances and corrective action. A failed pilot remains useful evidence if reported accurately. Do not convert missed cases into PASS. [R05](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/standard/annexes/Conformance_Profiles.md), [R17](https://github.com/Odenknight/gkos-standard/blob/44f425861412532b2b55323966b3b9917c4c109c/docs/ecosystem/PILOT_PROGRAM_DRAFT.md)
