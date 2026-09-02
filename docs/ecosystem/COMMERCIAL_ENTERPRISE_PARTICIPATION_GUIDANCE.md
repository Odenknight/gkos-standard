# Commercial and enterprise participation guidance

- **Document ID:** GKOS-CEPG-001
- **Status:** informative R21 draft; not a certification, procurement policy,
  trademark license, endorsement, or legal opinion
- **Date:** 2026-09-02

## 1. Purpose

GKOS is intended to be usable in commercial, enterprise, public-sector,
research, and open-source systems without turning any vendor or deployment
model into the Standard.

Commercial participation can improve implementation quality, hosted tooling,
integration, training, evidence generation, and independent assessment. It must
not create privileged standards authority, hidden conformance paths, or
unsupported “GKOS certified” claims.

## 2. Permitted offering classes

Organizations may offer:

- implementation and architecture consulting;
- schema and adapter development;
- managed validation and evidence storage;
- hosted self-assessment tooling;
- workflow, identity, policy, retrieval, agent, and observability integration;
- training and implementation documentation;
- fixture execution and interoperability testing;
- evidence-package generation and verification;
- security and privacy review;
- independent assessment where actual independence and competence are
  established; and
- support for public pilots and second implementations.

The exact service, version, environment, limitations, and assessment standing
must be disclosed.

## 3. Prohibited or reserved claims

Until a governed certification scheme exists, the project does not authorize:

- “GKOS certified”;
- “official GKOS implementation”;
- “NIST-approved GKOS” or equivalent external endorsement language;
- “independently verified” for a self-assessment or same-control-path review;
- “fully compliant” without an exact identified Standard, profile, requirement
  set, fixture catalog, evidence package, and assessment scope;
- use of a successful product test as proof of a complete GCP profile;
- use of a signature or blockchain entry as proof of truth or authority; or
- implication that a paid relationship confers requirement, publication, or
  governance authority.

Trademark and naming rights remain governed separately from the open content
and software licenses.

## 4. Claim vocabulary

Recommended claim forms:

| Claim | Minimum evidence |
| --- | --- |
| “Supports GKX 2.0 records” | Exact supported schemas/fields, parser behavior, round-trip tests, and limitations |
| “Implements selected GKOS requirements” | Exact requirement IDs, Standard release, fixtures, implementation version, results, and exceptions |
| “GKOS Core claimable” | Complete applicable Core requirement coverage and passing exact-bound evidence |
| “Self-assessed against GKOS…” | Exact scope, assessor identity, methods, evidence, limitations, and explicit self-attested label |
| “Independently verified against GKOS…” | Separate competent assessor, independence basis, methods, tested version, and evidence package |
| “GKOS-compatible adapter” | Exact binding/adapter version, interoperability tests, and a statement that compatibility is not conformance |
| “Uses GKOS concepts” | No conformance implication; identify which concepts and modifications are used |

A product name or package version alone is never enough.

## 5. Enterprise procurement questions

A buyer evaluating a GKOS-related offering should ask:

1. Which exact GKOS release and GKX version are supported?
2. Which named profile or requirements are in scope?
3. Which requirements are unsupported, conditional, or unevaluated?
4. Which schemas, fixtures, policies, and adapters were used?
5. Is the assessment self-attested or independently verified?
6. Can raw evidence and an evidence package be reviewed?
7. How are identity, authority, review, context, action, and outcome kept
   distinct?
8. Which writes or effects are possible, and who activates them?
9. How are failures, partial results, retries, refusal, rollback, and recovery
   recorded?
10. How are protocol, model, tool, policy, and dependency versions pinned?
11. How are sensitive, regulated, privileged, and multi-jurisdiction records
    handled?
12. What happens when the Standard or an external protocol changes?
13. Can the implementation be tested without the vendor's private service?
14. Does the vendor depend on the public reference implementation, and how does
    that affect independence?
15. What public interoperability evidence exists?

## 6. Hosted validation boundary

A hosted validation service may:

- accept or retrieve authorized inputs;
- execute deterministic checks;
- generate diagnostics and evidence;
- return a conformance manifest and package; and
- provide dashboards and review workflows.

It must disclose:

- data and processing locations;
- retention and deletion policy;
- subprocessor and model/provider use;
- exact validation engine and rule versions;
- tenant isolation;
- credential handling;
- whether raw evidence leaves the customer's boundary;
- whether the service may write or act; and
- how customers can reproduce or independently verify the result.

A hosted service's internal success status is not a GKOS Decision Record or
profile claim unless the complete contract is satisfied.

## 7. Independent assessment boundary

An assessor should disclose:

- organizational and financial relationship to the claimant;
- implementation or consulting work previously performed;
- assessor competence and scope;
- tools and versions;
- selected fixtures and sampling;
- evidence accessed and unavailable;
- conflicts and safeguards;
- findings and limitations; and
- whether the result is verification, assurance, audit, certification, or
  another assessment type.

During v0.x, the GKOS project may review claims and evidence but must not present
its own developmental release decisions as independent certification.

## 8. Open-source and commercial coexistence

Open-source components can support commercial offerings, and commercial
services can contribute public fixtures, adapters, pilots, and implementation
reports. Neither licensing model determines conformance, independence, or
trustworthiness.

High-value contributions include:

- implementation-neutral fixtures;
- negative and adversarial cases;
- public protocol bindings;
- evidence-package tooling;
- accessibility and human-factor testing;
- reproducible deployment examples;
- security findings and remediations; and
- public second implementations.

## 9. Change and support policy

A commercial offering should publish:

- supported GKOS/GKX versions;
- external protocol versions;
- deprecation and migration policy;
- support window;
- breaking-change handling;
- fixture and evidence rerun policy;
- vulnerability response;
- rollback and data export; and
- treatment of historical receipts and claims after an upgrade.

A new product release does not silently upgrade prior evidence or conformance
claims.

## 10. Certification future boundary

A future “GKOS certified” program would require, at minimum:

- multi-stakeholder governance;
- published scheme ownership and maintenance;
- defined certification profiles and scopes;
- competent independent certification bodies or equivalent assessors;
- impartiality and conflict controls;
- surveillance, renewal, suspension, withdrawal, and appeals;
- public status and misuse handling;
- trademark and mark-use rules;
- evidence retention and confidentiality procedures; and
- separation between implementation support and certification decisions.

This work is a post-v1.0 governance candidate and is not created by R21.

## 11. Current standing

Commercial and enterprise participation is encouraged within these claim
boundaries. No vendor, service, or implementation is endorsed or certified by
this document.
