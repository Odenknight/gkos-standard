# Healthcare implementation guidance

Informative candidate guidance, September 15, 2026. Baseline: GKOS v0.81.
Not an adopted healthcare profile, clinical recommendation or legal opinion.

A clinical-data platform such as Medplum can hold FHIR resources; a GKOS
implementation can bind evidence, proposals, review and authority. Neither
establishes clinical safety, legal compliance, ONC certification or FDA
authorization. Product-specific determinations remain with competent authorities.

## Bounded implementation plan

1. Define intended use, jurisdiction, users and each module's effect scope.
2. Obtain clinical, privacy, security and regulatory review before production.
3. Freeze FHIR/implementation-guide versions, platform, policies, models,
   prompts, retrieval configuration and deployed artifact digests.
4. Reference exact clinical resource versions from governance records. Keep
   generated assertions distinct from accepted clinical records.
5. Enforce patient/tenant boundaries, purpose, disclosure authority and required
   clinical review. Resource names or a stored Consent object do not enforce policy.
6. Test wrong-patient input, stale/retracted sources, prompt injection, refusal,
   break-glass, revocation, recovery and model changes using synthetic data first.
7. Map each proposed control to applicable GKOS requirements and separately
   verified legal/program requirements. Record gaps and residual risk.

A policy-authorized routine operation is different from an agent granting itself
authority. Qualified clinical signatures and consequential actions retain their
applicable professional and legal boundaries. Preserve sources subject to lawful
retention and governed erasure, not an unconditional never-delete promise.

## External-source verification gate

Use exact dated primary sources for the product's HIPAA, 42 CFR Part 2, state-law,
information-blocking, ONC and FDA determinations where applicable. This guide
does not assert that every current rule or deadline has been checked.
Track rule changes separately from GKOS releases.

- [HHS certification limitations](https://www.hhs.gov/hipaa/for-professionals/faq/2003/are-we-required-to-certify-our-organizations-compliance-with-the-standards/index.html)
- [ONC certification bodies](https://healthit.gov/certification-health-it/certification-process/onc-authorized-certification-bodies-onc-acbs/)
- [FDA recognized standards](https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfstandards/search.cfm)
- [GKOS requirements](../../requirements/REGISTRY.md)

These are review starting points, not a completed regulatory crosswalk.
No real patient data or production deployment is authorized by this document.
