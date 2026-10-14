# CMMC Level 2: GKOS component-evidence crosswalk

<!-- markdownlint-disable MD013 -->

Version 0.1-draft, prepared October 1, 2026 by Astra-Oden. **Draft; author review only.**
This is a companion to [PR #42](https://github.com/Odenknight/gkos-standard/pull/42)'s NIST AI RMF crosswalk. It describes possible component evidence for CMMC objectives, not equivalent frameworks or a CMMC assessment. It allocates no GKOS requirement or profile. No contractor system, CUI enclave, service provider or implementation has been assessed by this document.

## 1. Baselines and current program context

| Source | Pinned scope | Access and limitation |
| --- | --- | --- |
| [CMMC Level 2 Assessment Guide](https://dowcio.war.gov/Portals/0/Documents/CMMC/AssessmentGuideL2v2.pdf) | Version 2.13, September 2024, DoD-CIO-00003; 110 requirements and 320 objective identifiers | Complete official PDF retrieved and objective catalog checked October 1; SHA-256 in JSON |
| [CMMC Level 2 Scoping Guide](https://dowcio.war.gov/Portals/0/Documents/CMMC/ScopingGuideL2v2.pdf) | Version 2.13, September 2024; system/asset and service-provider scope | Read October 1; deployments need their own scope decision |
| [NIST SP 800-171 Rev. 2](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-171r2.pdf) | February 2020, updates January 2021; requirement text | NIST withdrew it in favor of Rev. 3; retained here because this CMMC baseline references Rev. 2 |
| [NIST SP 800-171A](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-171A.pdf) | June 2018 assessment procedures referenced by the guide | Archived baseline; do not substitute Rev. 3 objective numbering |
| [32 CFR Part 170, 2025 annual edition](https://www.govinfo.gov/content/pkg/CFR-2025-title32-vol1/pdf/CFR-2025-title32-vol1-part170.pdf) | §§170.2, 170.14; reference and assessment context | Dated edition, not a claim of consolidated October 2026 law |
| [DFARS 252.204-7021](https://www.acquisition.gov/dfars/252.204-7021-contractor-compliance-cybersecurity-maturity-model-certification-level-requirements.) | November 2025 clause shown in the May 7, 2026 DFARS edition | Contract-specific obligations require checking the actual contract and applicable policy |
| [GKOS v0.82.1 registry](https://github.com/Odenknight/gkos-standard/blob/3a62e4a02d674a574d87e01c10dc88b7715de037/requirements/REGISTRY.md) | Published commit `3a62e4a02d674a574d87e01c10dc88b7715de037`; 62 permanent allocations, one superseded | Original requirement text is the baseline; current development is not silently substituted |

The [official program resources](https://dowcio.war.gov/CMMC/Resources-Documentation/) still link these Rev. 2 references and carry the July 13, 2026 notice suspending Phase II implementation while retaining Phase I self-assessment requirements. This draft makes no November rollout, contract eligibility or current certification-route assertion. Recheck program decisions, guide versions and the applicable contract before operational use.

Level 1 and Level 3 are outside this draft. Rev. 3 migration needs a separate version and objective review; neither new requirement numbers nor changed assessment methods carry over automatically.

## 2. Meaning of the relationships

- **Potential component evidence:** the exact GKOS requirement could supply a bounded record or control test relevant to the listed objectives, if a deployment integrates and executes it. This is a proposed correspondence. It is not a statement that the objective or whole requirement is implemented or MET.
- **No direct mapping asserted:** no positive requirement-level correspondence is proposed in this draft. The deployment still owns the CMMC requirement. Generic ability to store a policy, screenshot or security log does not create a mapping.

Every row is **NOT_ASSESSED**, including the ten potential-evidence rows. Objectives omitted from a candidate row remain deployment work. No mapping count is a CMMC score, coverage percentage, N/A finding or status. The guide requires sufficient evidence for every applicable objective; a partial candidate is not a requirement-level finding.

GKOS note UUIDs are artifact identifiers, not a user/device directory or authentication system. Actor-role fields do not authenticate an actor. A canonical hash does not enforce storage ACLs, assure an authoritative clock, prevent log deletion or establish FIPS-validated encryption. Different model families or a shared GitHub account do not prove separate individuals and privileges for CMMC separation of duties.

## 3. Proposed component evidence and remaining safeguards

The objective letters below come from the pinned CMMC guide, not invented GKOS controls. Full machine rows include all objective letters, evidence rationale and remaining work.

| Requirement and candidate objectives | Proposed GKOS evidence | What the deployment must supply and test |
| --- | --- | --- |
| AC.L2-3.1.2 [a,b] | Typed authorized effect scope, valid action-time grant, scope containment and refusal records | Authenticated user/account binding; complete allowed-function inventory; enforcement on every entry point, queue, retry and direct path |
| AC.L2-3.1.3 [d,e] | Protected-disclosure authorization and policy-bound audience/sensitivity decisions | Actual CUI classification, flow policy, source/destination inventory and every storage/network/output path; show approved flow and denied-flow non-disclosure |
| AC.L2-3.1.4 [a] | Sealed review packet and distinct proposal/review/authorization/execution roles | Individual duty assignments and separate privileges for [b,c]; model diversity alone is insufficient |
| AC.L2-3.1.5 [d] | A bounded grant and containment record for a deployment-identified security function | Privileged-account inventory, least-privilege policy and actual IAM/OS enforcement; scope containment alone does not prove minimum necessary privilege |
| AC.L2-3.1.7 [d] | Durable outcome/refusal receipts for declared privileged governed functions | Function and non-privileged-user inventories, privilege restrictions and denied bypass tests for [a,b,c]; complete privileged-event logging coverage |
| AU.L2-3.3.1 [b,c,d] | Receipt schema and durable success/refusal records with declared gate, policy, inputs, outcome and actor context | Security-event catalog, system-wide collection, required fields, retention duration, storage capacity, loss handling and retrieval; a hold predicate does not set a retention schedule |
| AU.L2-3.3.2 [a,b] | Recorded action context, differentiated actors and preserved delegation chain | Tamper-resistant binding from each executing actor to a uniquely authenticated system user; shared tokens and actor classes fail this attribution test |
| AU.L2-3.3.8 [a,b,c] | Protected disclosure, append-only review history and authorized governed disposition records | ACLs and tamper/deletion protection on the actual audit store; protect logging tools separately for [d,e,f]; a hash detects some mutation but cannot prevent it |
| CM.L2-3.4.3 [a,b,c,d] | Governed configuration-change proposal, review disposition and durable state-change receipt | Explicit integration with in-scope system changes and actual before/after configuration; security-impact analysis, inventory and approval process remain external |
| CM.L2-3.4.5 [e,f,g,h] | Versioned logical-access policy, review/approval and scope-enforced configuration-change action | Effective OS/IAM change restrictions and bypass tests; physical restrictions [a–d] and broader logical paths are outside these GKOS records |

No positive IA-family mapping is asserted: identification, authentication, MFA, replay-resistant login, account lifecycle and password protections require their own deployed IAM evidence. These are prerequisites for the proposed AC/AU evidence, not optional follow-ups.

No positive audit-event review, logging-failure alert, cross-log correlation, reduction/reporting, authoritative-time-source or audit-administrator-subset mapping is asserted for AU.L2-3.3.3–3.3.7 and 3.3.9. Proposal review is not audit-event review; refusal on missing receipts is not an alert service; canonical UTC text is not clock synchronization.

## 4. Complete requirement inventory

The table accounts for all 110 requirements across 14 families. Ten have proposed component evidence; 100 have no direct mapping asserted. The JSON records all 320 objective identifiers, including objectives outside candidate mappings. It does not assert 320 substantive mappings.

<!-- cmmc-table:start -->

| CMMC requirement | Candidate objectives | GKOS references | Relationship |
| --- | --- | --- | --- |
| `AC.L2-3.1.1` | — | — | No direct mapping asserted |
| `AC.L2-3.1.2` | [a], [b] | `GKOS-EFFECT-001`, `GKOS-EFFECT-002`, `GKOS-EFFECT-003`, `GKOS-AUTHUSE-003` | Potential component evidence |
| `AC.L2-3.1.3` | [d], [e] | `GKOS-DISCLOSURE-001`, `GKOS-POLICY-001`, `GKOS-EFFECT-001` | Potential component evidence |
| `AC.L2-3.1.4` | [a] | `GKOS-AUTHUSE-004`, `GKOS-REVIEW-003` | Potential component evidence |
| `AC.L2-3.1.5` | [d] | `GKOS-EFFECT-002`, `GKOS-DELEGATION-001`, `GKOS-AUTHUSE-003` | Potential component evidence |
| `AC.L2-3.1.6` | — | — | No direct mapping asserted |
| `AC.L2-3.1.7` | [d] | `GKOS-RECEIPT-001`, `GKOS-AUTHUSE-005`, `GKOS-AUTHUSE-006` | Potential component evidence |
| `AC.L2-3.1.8` | — | — | No direct mapping asserted |
| `AC.L2-3.1.9` | — | — | No direct mapping asserted |
| `AC.L2-3.1.10` | — | — | No direct mapping asserted |
| `AC.L2-3.1.11` | — | — | No direct mapping asserted |
| `AC.L2-3.1.12` | — | — | No direct mapping asserted |
| `AC.L2-3.1.13` | — | — | No direct mapping asserted |
| `AC.L2-3.1.14` | — | — | No direct mapping asserted |
| `AC.L2-3.1.15` | — | — | No direct mapping asserted |
| `AC.L2-3.1.16` | — | — | No direct mapping asserted |
| `AC.L2-3.1.17` | — | — | No direct mapping asserted |
| `AC.L2-3.1.18` | — | — | No direct mapping asserted |
| `AC.L2-3.1.19` | — | — | No direct mapping asserted |
| `AC.L2-3.1.20` | — | — | No direct mapping asserted |
| `AC.L2-3.1.21` | — | — | No direct mapping asserted |
| `AC.L2-3.1.22` | — | — | No direct mapping asserted |
| `AT.L2-3.2.1` | — | — | No direct mapping asserted |
| `AT.L2-3.2.2` | — | — | No direct mapping asserted |
| `AT.L2-3.2.3` | — | — | No direct mapping asserted |
| `AU.L2-3.3.1` | [b], [c], [d] | `GKOS-RECEIPT-001`, `GKOS-RECEIPT-002`, `GKOS-RECEIPT-003`, `GKOS-AUTHUSE-005`, `GKOS-AUTHUSE-006` | Potential component evidence |
| `AU.L2-3.3.2` | [a], [b] | `GKOS-AUTHUSE-004`, `GKOS-AUTHUSE-005`, `GKOS-RECEIPT-002` | Potential component evidence |
| `AU.L2-3.3.3` | — | — | No direct mapping asserted |
| `AU.L2-3.3.4` | — | — | No direct mapping asserted |
| `AU.L2-3.3.5` | — | — | No direct mapping asserted |
| `AU.L2-3.3.6` | — | — | No direct mapping asserted |
| `AU.L2-3.3.7` | — | — | No direct mapping asserted |
| `AU.L2-3.3.8` | [a], [b], [c] | `GKOS-DISCLOSURE-001`, `GKOS-REVIEW-004`, `GKOS-RETENTION-001`, `GKOS-RETENTION-003` | Potential component evidence |
| `AU.L2-3.3.9` | — | — | No direct mapping asserted |
| `CM.L2-3.4.1` | — | — | No direct mapping asserted |
| `CM.L2-3.4.2` | — | — | No direct mapping asserted |
| `CM.L2-3.4.3` | [a], [b], [c], [d] | `GKOS-REVIEW-001`, `GKOS-REVIEW-002`, `GKOS-REVIEW-004`, `GKOS-RECEIPT-001` | Potential component evidence |
| `CM.L2-3.4.4` | — | — | No direct mapping asserted |
| `CM.L2-3.4.5` | [e], [f], [g], [h] | `GKOS-POLICY-001`, `GKOS-AUTHUSE-003`, `GKOS-EFFECT-002`, `GKOS-REVIEW-002` | Potential component evidence |
| `CM.L2-3.4.6` | — | — | No direct mapping asserted |
| `CM.L2-3.4.7` | — | — | No direct mapping asserted |
| `CM.L2-3.4.8` | — | — | No direct mapping asserted |
| `CM.L2-3.4.9` | — | — | No direct mapping asserted |
| `IA.L2-3.5.1` | — | — | No direct mapping asserted |
| `IA.L2-3.5.2` | — | — | No direct mapping asserted |
| `IA.L2-3.5.3` | — | — | No direct mapping asserted |
| `IA.L2-3.5.4` | — | — | No direct mapping asserted |
| `IA.L2-3.5.5` | — | — | No direct mapping asserted |
| `IA.L2-3.5.6` | — | — | No direct mapping asserted |
| `IA.L2-3.5.7` | — | — | No direct mapping asserted |
| `IA.L2-3.5.8` | — | — | No direct mapping asserted |
| `IA.L2-3.5.9` | — | — | No direct mapping asserted |
| `IA.L2-3.5.10` | — | — | No direct mapping asserted |
| `IA.L2-3.5.11` | — | — | No direct mapping asserted |
| `IR.L2-3.6.1` | — | — | No direct mapping asserted |
| `IR.L2-3.6.2` | — | — | No direct mapping asserted |
| `IR.L2-3.6.3` | — | — | No direct mapping asserted |
| `MA.L2-3.7.1` | — | — | No direct mapping asserted |
| `MA.L2-3.7.2` | — | — | No direct mapping asserted |
| `MA.L2-3.7.3` | — | — | No direct mapping asserted |
| `MA.L2-3.7.4` | — | — | No direct mapping asserted |
| `MA.L2-3.7.5` | — | — | No direct mapping asserted |
| `MA.L2-3.7.6` | — | — | No direct mapping asserted |
| `MP.L2-3.8.1` | — | — | No direct mapping asserted |
| `MP.L2-3.8.2` | — | — | No direct mapping asserted |
| `MP.L2-3.8.3` | — | — | No direct mapping asserted |
| `MP.L2-3.8.4` | — | — | No direct mapping asserted |
| `MP.L2-3.8.5` | — | — | No direct mapping asserted |
| `MP.L2-3.8.6` | — | — | No direct mapping asserted |
| `MP.L2-3.8.7` | — | — | No direct mapping asserted |
| `MP.L2-3.8.8` | — | — | No direct mapping asserted |
| `MP.L2-3.8.9` | — | — | No direct mapping asserted |
| `PS.L2-3.9.1` | — | — | No direct mapping asserted |
| `PS.L2-3.9.2` | — | — | No direct mapping asserted |
| `PE.L2-3.10.1` | — | — | No direct mapping asserted |
| `PE.L2-3.10.2` | — | — | No direct mapping asserted |
| `PE.L2-3.10.3` | — | — | No direct mapping asserted |
| `PE.L2-3.10.4` | — | — | No direct mapping asserted |
| `PE.L2-3.10.5` | — | — | No direct mapping asserted |
| `PE.L2-3.10.6` | — | — | No direct mapping asserted |
| `RA.L2-3.11.1` | — | — | No direct mapping asserted |
| `RA.L2-3.11.2` | — | — | No direct mapping asserted |
| `RA.L2-3.11.3` | — | — | No direct mapping asserted |
| `CA.L2-3.12.1` | — | — | No direct mapping asserted |
| `CA.L2-3.12.2` | — | — | No direct mapping asserted |
| `CA.L2-3.12.3` | — | — | No direct mapping asserted |
| `CA.L2-3.12.4` | — | — | No direct mapping asserted |
| `SC.L2-3.13.1` | — | — | No direct mapping asserted |
| `SC.L2-3.13.2` | — | — | No direct mapping asserted |
| `SC.L2-3.13.3` | — | — | No direct mapping asserted |
| `SC.L2-3.13.4` | — | — | No direct mapping asserted |
| `SC.L2-3.13.5` | — | — | No direct mapping asserted |
| `SC.L2-3.13.6` | — | — | No direct mapping asserted |
| `SC.L2-3.13.7` | — | — | No direct mapping asserted |
| `SC.L2-3.13.8` | — | — | No direct mapping asserted |
| `SC.L2-3.13.9` | — | — | No direct mapping asserted |
| `SC.L2-3.13.10` | — | — | No direct mapping asserted |
| `SC.L2-3.13.11` | — | — | No direct mapping asserted |
| `SC.L2-3.13.12` | — | — | No direct mapping asserted |
| `SC.L2-3.13.13` | — | — | No direct mapping asserted |
| `SC.L2-3.13.14` | — | — | No direct mapping asserted |
| `SC.L2-3.13.15` | — | — | No direct mapping asserted |
| `SC.L2-3.13.16` | — | — | No direct mapping asserted |
| `SI.L2-3.14.1` | — | — | No direct mapping asserted |
| `SI.L2-3.14.2` | — | — | No direct mapping asserted |
| `SI.L2-3.14.3` | — | — | No direct mapping asserted |
| `SI.L2-3.14.4` | — | — | No direct mapping asserted |
| `SI.L2-3.14.5` | — | — | No direct mapping asserted |
| `SI.L2-3.14.6` | — | — | No direct mapping asserted |
| `SI.L2-3.14.7` | — | — | No direct mapping asserted |

<!-- cmmc-table:end -->

## 5. Observatory build and evidence work

Use the Aiello pilot's existing `gkos_demo_result_write` as the first bounded effect. This write is a synthetic integration target, not proof of a CMMC enclave or a privileged security function. The assessment reports that GKOS authority/context gate integration is still to be built.

1. Define the system boundary, data flows, CUI/FCI treatment, asset categories, IAM, audit collector/store and responsible operators. An external GKOS service may be a security protection asset or service dependency even if it never stores CUI; decide from the actual function and data.
2. Bind one authenticated principal to the action record and current grant. Separate proposer/reviewer/authorizer privileges where individual duty separation is required. Protect keys/tokens and avoid recording credentials in evidence.
3. Enforce context, purpose and effect scope inside the serialized mutation path. Exercise expiry, revocation, replay, wrong actor, queued work, direct API/file bypass and restart. Independently inspect target state to prove refused effects did not occur.
4. Export protected success/refusal evidence with tested durable commit behavior. Add audit collection and failure alerts, append-only storage controls, retrieval and the deployment's retention schedule. Verify IAM and log-store access controls through attempted unauthorized reads, changes and deletion.
5. Record actual versions, configuration, roles, tests, outcomes and evidence custody in the system's SSP/control implementation evidence. Use final approved policies and implementation records; retain draft plans as plans. Assess every applicable CMMC objective separately through the applicable assessment process.

Do not place real CUI, protected system diagrams, credential material or unredacted audit records in this public repository. Supply a sanitized synthetic bundle and a controlled route for any essential restricted assessment evidence.

## 6. Review and maintenance

The source catalog was extracted from the complete official guide. The ten positive proposals were checked by the author against their objective text and the pinned GKOS requirements. The other rows expressly refrain from asserting a positive mapping. This is author triage, not an independent or organizational assessment.

Before treating this as reviewed guidance, preserve an exact-head review with reviewer identity, primary-source access, all 110 dispositions, mapped-objective rationales, false-positive challenges, gaps, findings and verdict. Disposition material findings and verify the corrected head. Review must not promote this draft to a CMMC finding or claim Standard requirements were added.

The [JSON](CMMC_LEVEL2_CROSSWALK.json) is the row source. Run `python scripts/check-cmmc-crosswalk.py --write` after an intentional row edit, then run it without flags to detect drift and invalid identifiers. These deterministic checks verify population and representation, not mapping semantics or implementation effectiveness.

Changes are informative documentation only. No Standard requirement, fixture, runner dependency, normative annex, historical release or CMMC status is changed. The PR #42 review gate remains separate. Rollback is a revert of this companion documentation change.
