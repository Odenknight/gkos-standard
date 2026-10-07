# 7. How the repository is organized

> **Informative.** This beginner's guide page explains GKOS in plain language. It creates no requirement and changes no rule. Where it differs from the [authoritative sources](README.md#authoritative-sources), those sources control. Edition described: GKOS-2026-09-24 v0.82.1.

The repository holds both current material and history. History is kept on purpose: it is evidence of how GKOS changed. This chapter shows you where things are and how to tell which is which.

## Four kinds of document

The [corpus status index](../docs/CORPUS-STATUS.md#reading-and-maintenance-rules) sorts active documents into four kinds. A fifth kind, immutable release material, sits beside them.

| Kind | What it means | Can it change? |
| --- | --- | --- |
| **Normative** | Contains the rules. Words such as MUST carry force. | Only through the governed change process |
| **Informative** | Explains or guides. Creates no requirement. This guide is informative. | Yes, through ordinary review |
| **Proposed** | Put forward for a decision, not yet accepted | Yes, until decided |
| **Historical** | Preserved as evidence of earlier thinking | No. Kept as written. |
| **Immutable release** | The exact published package of an edition | No. Corrections come in a later edition. |

## Top-level files

| File | What it is for |
| --- | --- |
| [README.md](../README.md) | The public front page and current standing |
| [TECHNICAL_README.md](../TECHNICAL_README.md) | The entry point for implementers |
| [GOVERNANCE.md](../GOVERNANCE.md) | Who decides, and the path to v1.0 governance |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | How to propose changes, change classes, sign-off |
| [SECURITY.md](../SECURITY.md) | How to report a vulnerability privately |
| [ROADMAP.md](../ROADMAP.md) | Current horizons and the v1.0 readiness list |
| [CHANGELOG.md](../CHANGELOG.md) | What changed. The `Unreleased` section is pending; released sections are historical. |
| [CITATION.cff](../CITATION.cff) and [ZENODO.md](../ZENODO.md) | How to cite an edition, and its archive DOI |
| [LICENSE.md](../LICENSE.md), [NOTICE.md](../NOTICE.md) | Licensing and attribution |

## Folder tour

| Folder | What it holds | Standing |
| --- | --- | --- |
| [`standard/`](../standard/00_GKOS_Master_Standard.md) | The master standard and its annexes | The master standard's [normative surface](../standard/00_GKOS_Master_Standard.md#normative-surface) and the decisions it names say which parts control. Check each annex there and in its status line; the folder alone does not make an annex normative. |
| [`requirements/`](../requirements/REGISTRY.md) | The permanent requirement registry and profile mapping | Normative; append-only |
| [`schemas/`](../schemas/README.md) | GKX 2.0 machine schemas | Current machine contracts; the `provisional/` subfolder is draft and non-normative |
| [`fixtures/`](../fixtures/README.md) | Test files with expected results | Current catalog is non-qualifying; `provisional/` is draft |
| [`conformance/`](../conformance/README.md) | The runner, adapters and the claims policy | Current tooling and policy |
| [`decisions/`](../decisions/GKOS_Decision_Register.md) | Development Decision Records, numbered from R9, and the register | Check each record's status line. Accepted records are kept as written; proposed records are not yet decided. |
| [`docs/implementation/`](../docs/implementation/README.md) | Workflow, reference infrastructure, practitioner blueprint | Informative |
| [`docs/ecosystem/`](../docs/ecosystem/README.md) | Protocol bindings, add-ins, pilots, registers | Informative development work under R21 |
| [`docs/domains/`](../docs/domains/README.md) | Sector guidance, such as healthcare or education | Informative candidate applications |
| [`docs/releases/`](../docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.md) | Publication records and receipts | Historical evidence once published |
| [`docs/reviews/`](../docs/reviews/) | Review reports and dispositions | Historical evidence of review |
| [`docs/decisions/`](../docs/decisions/2026-09-12-implementation-independence.md) | Owner clarifications without an R-number | Clarifying records |
| [`docs/icm/`](../docs/icm/CONTEXT.md) | A routing map for agents doing governed edits | Proposed; grants no authority |
| [`examples/`](../examples/README.md) | Small worked examples | Informative |
| [`graphics/`](../graphics/README.md) | Diagrams and their editable sources | Informative |
| [`illustrated/figures/`](../illustrated/figures/) | Figures from the illustrated edition, reused here | Informative |
| [`guide/`](README.md) | This beginner's guide | Informative |
| [`releases/`](../releases/2026-09-24-v0.82.1/README.md) | One dated folder per published edition | Immutable |
| [`release-candidates/`](../release-candidates/v0.82-rc1/README.md) | Staging packages used before publication | Historical once the edition is published |
| [`archive/`](../archive/README.md) and `*/archive/` folders | Earlier material, preserved verbatim | Historical; not current guidance |
| [`governance/portfolio/`](../governance/portfolio/PORTFOLIO-AUTHORITY-INDEX.md) | Portfolio authority and acceptance records | Check each file's status line |
| [`scripts/`](../scripts/check-current-release.sh) | Release and verification checks | Tooling |

<!-- GRAPHIC-NEEDED: GN-027 Repository standing map: normative, decision, informative, proposed, dated records, historical, immutable -->

## How to tell current from historical

Use these checks, in this order:

1. **Read the status line.** Most documents state near the top whether they are normative, informative, proposed or historical, and which edition they describe.
2. **Look at the path.** Anything under `archive/`, `releases/` or a `*/archive/` folder is historical or immutable.
3. **Check the edition.** The current published edition is GKOS-2026-09-24 v0.82.1. A page that describes v0.76 or "OKF+" describes the past. "OKF+" is historical terminology; the current exchange contract is GKX 2.0. See [NAMING.md](../docs/NAMING.md).
4. **Check the decision register.** If a rule changed, the [decision register](../decisions/GKOS_Decision_Register.md) names the decision that changed it.
5. **When in doubt, the controlling files win.** The master standard, the requirement registry and accepted decisions control. Guidance does not create requirements. See the [corpus status index](../docs/CORPUS-STATUS.md).

An example: the [v0.76 Illustrated Edition](../archive/illustrated/GKOS-v0.76-Illustrated-Edition.md) explains GKOS well, but it describes v0.76. Its status line uses the words of its time. Read it as history. This guide reuses some of its figures and says so in each caption.

## Why history is kept, not edited

GKOS asks systems never to rewrite history silently. The repository follows the same rule:

- A published edition is never changed. A correction comes in a later edition.
- An accepted decision record keeps its original text. Later notes are added, dated.
- Released changelog sections stay as written.
- The requirement registry is append-only. An ID is never deleted, renumbered or reused.

See the [requirement registry](../requirements/REGISTRY.md) and [CORPUS-STATUS](../docs/CORPUS-STATUS.md#reading-and-maintenance-rules).

## Reading paths by role

| If you are | Read next |
| --- | --- |
| A policy or governance reader | [GOVERNANCE.md](../GOVERNANCE.md), [claims policy](../conformance/CLAIMS_POLICY.md), [ROADMAP.md](../ROADMAP.md) |
| A legal or compliance reader | [Legal and professional orientation](../docs/GKOS_LEGAL_AND_PROFESSIONAL_ORIENTATION.md), [claims policy](../conformance/CLAIMS_POLICY.md) |
| A security reader | [CIA triad alignment](../docs/GKOS_CIA_TRIAD_ALIGNMENT.md), [security, privacy and retention annex](../standard/annexes/Security_Privacy_Retention.md) |
| An operations reader | [End-to-end workflow](../docs/implementation/GKOS_END_TO_END_WORKFLOW.md), [practitioner blueprint](../docs/implementation/GKOS_INFRASTRUCTURE_PRACTITIONER_BLUEPRINT.md) |
| A developer | [Technical orientation](../TECHNICAL_README.md), [schemas](../schemas/README.md), [conformance](../conformance/README.md), [fixtures](../fixtures/README.md) |

---

[Guide index](README.md) · Previous: [6. What GKOS is not](06-what-gkos-is-not.md) · Next: [8. Getting involved](08-getting-involved.md)
