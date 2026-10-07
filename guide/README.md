# GKOS beginner's guide

> **Informative.** This guide explains GKOS in plain language. It creates no requirement and changes no rule. Where it differs from the [authoritative sources](#authoritative-sources), those sources control. Edition described: GKOS-2026-09-24 v0.82.1.

GKOS is a developmental specification (public working draft). It began as a single-author pre-standard concept; the goal is to advance it to a pre-standard through an open, multi-stakeholder committee process.

This guide is for readers who are new to GKOS. You do not need a background in standards, security or AI. Each chapter is short. Each one links to the files in this repository that actually control the rules.

![Evidence moves through preservation, structure, lineage, validation, review, context, and authorized use](../illustrated/figures/fig4-knowledge-flow.png)

## Who this guide is for

- **Policy and governance staff** who need to know what GKOS asks for and what it does not promise.
- **Legal and compliance readers** who need to describe GKOS accurately in a contract, a plan or a review.
- **Operations staff** who run AI systems and want to know what records GKOS expects.
- **Developers new to GKOS** who want the ideas before they read schemas and annexes.

If you already implement GKOS, start with the [technical orientation](../TECHNICAL_README.md) instead.

## Chapters

| Chapter | What you will learn | Reading time |
| --- | --- | --- |
| [1. What GKOS is](01-what-gkos-is.md) | The short definition, its parts, and its current status | 5 minutes |
| [2. Why it exists](02-why-it-exists.md) | The problem with ordinary logs, and the six questions GKOS makes answerable | 5 minutes |
| [3. Core ideas](03-core-ideas.md) | Evidence, records, provenance, authorship origin, epistemic state, sensitivity and supersession | 10 minutes |
| [4. The seven responsibilities](04-the-seven-responsibilities.md) | The seven layers, one at a time, with the record each one produces | 10 minutes |
| [5. A first walkthrough](05-a-first-walkthrough.md) | One refund request, followed from start to finish, including a refusal | 10 minutes |
| [6. What GKOS is not](06-what-gkos-is-not.md) | Claim limits, maturity, profiles, and words to avoid | 8 minutes |
| [7. How the repository is organized](07-how-it-is-organized.md) | A folder tour, and how to tell current material from historical material | 8 minutes |
| [8. Getting involved](08-getting-involved.md) | Discussions, issues, pull requests, sign-off, review, and the committee goal | 6 minutes |
| [Glossary](glossary.md) | Plain definitions, each linked to its source | Look up as needed |

## How to read this guide

1. Read chapters 1 to 5 in order. Each chapter builds on the one before.
2. Read chapter 6 before you write or say anything public about GKOS. It lists the claims you must not make.
3. Use chapter 7 when you need to find a file.
4. Keep the [glossary](glossary.md) open. It defines the key terms in plain words.

Each page starts with an "Informative" line. That line means the page explains the rules but is not itself a rule.

## Authoritative sources

These files control. When this guide and one of them differ, the file below is right and this guide needs a correction.

- [Master standard](../standard/00_GKOS_Master_Standard.md): the controlling text and its normative annexes.
- [Requirement registry](../requirements/REGISTRY.md): every permanent requirement, by ID.
- [Layer interface contracts](../standard/annexes/Layer_Interface_Contracts.md): what each of the seven layers must produce.
- [Conformance-claims policy](../conformance/CLAIMS_POLICY.md): what may and may not be claimed.
- [Governance](../GOVERNANCE.md) and [contributing](../CONTRIBUTING.md): who decides, and how to propose changes.
- [Decision register](../decisions/GKOS_Decision_Register.md): accepted development decisions.
- [Shared schema definitions](../schemas/gkx-common.defs.json): the exact machine values, such as epistemic states and sensitivity labels.

## About this guide

- **Status:** informative, written for GKOS-2026-09-24 v0.82.1. It adds no requirement, profile or claim.
- **Figures:** reused from [`illustrated/figures/`](../illustrated/figures/) and [`graphics/diagrams/`](../graphics/diagrams/README.md). Some illustrated figures were drawn for the archived v0.76 edition. Captions say so where it matters.
- **Corrections:** open an issue or a pull request. See [chapter 8](08-getting-involved.md).
- **License:** documentation is CC BY 4.0. See [LICENSE.md](../LICENSE.md).
