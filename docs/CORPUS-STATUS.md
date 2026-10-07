# Documentation corpus status

Informative editorial index. Assessed September 15, 2026 against main
`ce270ced38e8477689074026c6b3f77277ccffec`. Status wording and the area table
rechecked October 7, 2026 against main
`797174485e86cbc250f52ac897d86b226c160622`. No normative amendment.

Current status clarification: the published edition is
[GKOS-2026-09-24 v0.82.1](../README.md#current-standing), a documentation
patch whose technical baseline is unchanged from v0.82. Its normative
population is unchanged from v0.81: 62 permanent requirements and 28 gate
codes. GKOS is a developmental specification (public working draft). It began
as a single-author pre-standard concept; the goal is to advance it to a
pre-standard through an open, multi-stakeholder committee process. Its
existing name and titles remain unchanged. R22 is informative and R23 remains
prospective. No profile is qualified. See the
[claims policy](../conformance/CLAIMS_POLICY.md).
The master Standard, permanent registry and adopted decisions control;
guidance and implementation evidence do not create new requirements.

## Documentation areas

A document's own status line controls where it is more specific than this
table. Release records, publication records, accepted decision records,
released changelog sections and archives keep their original wording.

| Area | Standing |
| --- | --- |
| `standard/00_GKOS_Master_Standard.md` and the `normative-annexes` listed in the current release manifest | Normative |
| Other files under `standard/annexes/` | As the master Standard and the annex's own status line state |
| `requirements/` | Normative permanent registry and machine companions |
| `decisions/` | Development decision records; standing per the [decision register](../decisions/GKOS_Decision_Register.md) |
| `docs/decisions/` | Owner clarifications without an R-number |
| `docs/directives/` | Development directives under their controlling decision |
| `docs/*.md`, `docs/implementation/`, `docs/domains/` | Informative |
| `docs/ecosystem/` | Informative R21 drafts and control registers |
| `docs/v082/` | Informative preparation material for prospective R23 work |
| `docs/proposals/` | Proposed and non-normative, except where an adopted decision says otherwise |
| `docs/reviews/` | Dated review and disposition records; preserved as written |
| `docs/releases/` | Publication and release-control records; preserved as written |
| [`guide/`](../guide/README.md) | Informative (beginner) |
| `releases/`, `release-candidates/` | Immutable release packages; historical except for the current edition's package |
| `archive/`, `docs/archive/` and other `*/archive/` folders | Historical |

<!-- GRAPHIC-NEEDED: GN-027 Repository standing map: normative, decision, informative, proposed, dated records, historical, immutable -->

## July source-document dispositions

These titles identify owner-supplied review inputs, not newly authenticated
copies of release artifacts. The originals remain unchanged. This index
does not claim their bytes equal a tagged release; that requires comparison.

| Supplied title | Standing | Active successor |
| --- | --- | --- |
| Evolution from Curating to Governance Summary | Historical explanatory draft | [Architecture explanation](EVOLUTION-AND-OSI.md) |
| GKOS Comparison to OSI Model | Historical analogy; obsolete tier labels | [Architecture explanation](EVOLUTION-AND-OSI.md) |
| GKOS-2026-07-17-v0.75-Complete-Documentation | Historical compilation; preserve unchanged | [Published baseline](../README.md#current-standing) |
| GKOS_Pre-Standardization_Roadmap | Superseded planning input | [Current roadmap](../ROADMAP.md) |
| Roadmap_Basic | Redundant historical summary; not an active plan | [Current roadmap](../ROADMAP.md) |
| GKOS_Feasibility_Impact_Composite | Informative domain research, not adopted profiles | [Domain index](domains/README.md) |
| GKOS_EHR_Regulatory | Historical healthcare guidance; not assurance | [Healthcare guidance](domains/healthcare.md) |
| GKOS_Path_to_Regulatory_Body | Historical institutional strategy | [Standards engagement](STANDARDS-ENGAGEMENT.md) |

## Reading and maintenance rules

Classify active documentation as normative, informative, proposed, or historical.
Identify release/development baseline, sources, claim limitations and review date.
Use exact implementation coordinates for implementation claims. Record applicable
requirement IDs only after checking the [registry](../requirements/REGISTRY.md);
an unmapped domain idea is not a conformance requirement.

Recheck after a release, adopted decision, dependency change, legal-source update
or new qualification claim. Preserve historical sources; publish successors rather
than silently revising release evidence. No page-count target, certification
scheme, sector profile, entity formation or protocol activation is adopted here.
