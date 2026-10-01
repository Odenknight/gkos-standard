# Comparison with the supplied GKOS-XW-003 draft

Prepared by Astra-Oden on 2026-10-01. Compared the owner-pasted “GKOS and NIST SP 800-171 Rev. 2 / CMMC Level 2: A Claim-Limited Evidence Map” with PR #66 at 751b026d247e8fe35c86be03b85164dd120ffb5f. This comparison proposes corrections and editorial improvements; it does not adopt normative requirements or assess a deployment. The pasted draft was not attributed to an author by the owner.

## Opinion

Use the supplied draft’s concise executive explanation, mechanism/SSP examples and evidence checklist as the reader-facing narrative, with PR #66’s verified complete catalog, source digests, NOT_ASSESSED standing and automated representation checks as the maintained evidence inventory. Keep a single authoritative row source. The documents agree on the most important boundary: GKOS artifacts can support a subsystem’s evidence, but neither a GKOS record nor a profile claim establishes a CMMC finding.

## Comparison

| Area | Supplied draft | PR #66 | Recommendation |
| --- | --- | --- | --- |
| Reader explanation | One-page summary, assessment methods, SSP examples, glossary traps | Source/scope limits and implementation steps | Adopt those narrative sections after correction |
| Positive proposals | Wider AC/AU/CM plus IA/IR/CA/SC reuse candidates | Ten AC/AU/CM component-evidence candidates | Review each additional proposal against an exact objective and a real integration; do not infer coverage from storing generic evidence |
| Complete population | Detailed selective rows plus grouped NDM remainder | All 110 requirements and 320 objective identifiers in JSON/generated table | Retain the complete inventory |
| Source verification | ESR/objective identifiers explicitly held | Official PDFs fetched, catalog and digests pinned; semantic review author-only | Replace identifier holds only with recorded primary-source checks; retain separate semantic-review hold |
| Automated maintenance | JSON/CI generation proposed as premerge work | Generator/checker, eight boundary tests and CI implemented; all22 checks pass | Reuse the existing machinery |

## Corrections before combining

1. **Use Level 2 identifiers.** The supplied table uses Level 1 identifiers for 3.1.1, 3.1.2, 3.1.20, 3.1.22, 3.5.1 and 3.5.2. Those are legitimate Level 1/FAR references but are not the corresponding identifiers in the pinned Level 2 guide. Use AC.L2-3.1.1, AC.L2-3.1.2, AC.L2-3.1.20, AC.L2-3.1.22, IA.L2-3.5.1 and IA.L2-3.5.2; any Level 1 equivalence belongs in a separate field.
2. **Correct AU3.3.1 letters.** The guide has [b] required audit content defined, [c] records generated, and [d] generated records contain the defined content. The supplied table describes [d] as content definition, then assigns content selection to [b] entirely as deployment work. Distinguish the receipt schema’s proposed support for [b] from the contractor’s full required-field determination; [a] event selection and [e,f] retention remain external.
3. **Separate CUI assets from security protection assets.** The statement that either “inherits the full requirement set” is too broad. CUI assets are assessed against applicable Level 2 requirements; security protection assets are assessed against the requirements relevant to their security capabilities. An asset that also processes CUI must be scoped for that CUI function. Keep Security Protection Data and external-provider responsibilities explicit.
4. **Tailor assessment-method language.** The guide does not require every method for every objective. Records support Examine; the assessor selects methods and objects sufficient for the determination. The document should not state Interview and Test are invariably required for each row.
5. **Do not equate fail-closed with alerting.** Remove “stronger than alerting” from3.3.4. Blocking an effect and notifying responsible operators are different behaviors. A proposed SHOULD alert does not by itself implement the mandatory alert objective.
6. **Bound the additional proposals.** A possible IA3.5.1[b] mapping needs a unique deployed process/service identity tied to the user on whose behalf it acts, beyond a generic governed actor contract. This is identification, not authentication. IR3.6.x records can be inputs to actual incident handling, reporting and testing, but a recovery-route field is not an IR capability or incident record. SC3.13.4 needs tests of named shared resources/cache/tenant boundaries; generic disclosure refusal is insufficient.
7. **Qualify the identity gap accurately.** State-Change Receipt requires actor class, but the Authorized Use Record already names proposer/reviewer/authorizer/executor roles. The outstanding gap is trusted unique principal/process attribution and verification, not complete absence of actor fields. Use established identity mechanisms rather than assuming a new standard-wide token format or mandatory IdP technology.
8. **Replace the categorical SSP vocabulary ban with a no-substitution rule.** A contractor may describe a real deployed mechanism and cite the applicable technical baseline; an unqualified GKOS compliance/profile statement cannot replace evidence for a CMMC objective. Version1.0 or a second GKOS implementation does not confer CMMC standing. The supplied examples are useful when filled with true deployment facts.
9. **Protect operational evidence.** Replace “publish one real record” with “make a sanitized sample available and provide authorized controlled access to restricted evidence.” No real CUI, secrets or protected system diagrams should enter the public repository. The six negative gate examples match the registry, but also test direct/queued/retried paths and independently inspect the target to prove no refused effect occurred.
10. **Complete the primary-source policy citation.** The official resources page confirms the July13 PhaseII suspension and continuing PhaseI self-assessment. Search found references to the September3 Class Deviation2026-O0025 Rev3; the original memo could not be fetched in this session (web502, localTLS issuer failure). Treat its exact wording/application as unverified until the primary memo is retrieved. Do not transfer contractual conclusions from secondary summaries. Add DFARS7012 alongside the companion’s7021 as a distinct safeguarding/incident-reporting contract source.

## Build priorities

Prioritize trusted actor attribution, action-time authority/scope enforcement on the actual request path, durable/protected audit storage and retention, logging-failure notification, and tested authoritative clock synchronization. Retain live positive/negative records, independently verified no-effect results, and a reviewer-runnable replay. A hash-chained/signed ledger is a later design option; it neither supplies access control nor prevents truncation without protected custody and an appropriate anchor. Prefer reuse of the existing protected log service before inventing a ledger profile.

A reviewer with practical CMMC assessment experience would improve the semantic review. Different-model fleet review and the existing CI checks do not establish that experience or assess a contractor system. Keep all rows NOT_ASSESSED.

## Sources checked

- Published GKOS registry, Authority/Refusal annex, Security/Privacy/Retention annex and Diagnostic Code Registry at the companion’s pinned baseline; PR #66 source tree.
- Official CMMC Level2 Assessment Guide v2.13, pages8 (method tailoring),72 (AU3.3.1),112 (process identification),219 (shared resources): <https://dowcio.war.gov/Portals/0/Documents/CMMC/AssessmentGuideL2v2.pdf>
- Official Level2 Scoping Guide v2.13, pages4–6 (asset distinction): <https://dowcio.war.gov/Portals/0/Documents/CMMC/ScopingGuideL2v2.pdf>
- Current program notice: <https://dowcio.war.gov/CMMC/Resources-Documentation/>
- Contract source: <https://www.acquisition.gov/dfars/252.204-7012-safeguarding-covered-defense-information-and-cyber-incident-reporting.>

No repository rows were changed by this comparison. Original peer/owner draft records remain intact.
