# Changelog

## Unreleased

- Record the live v0.82 publication, verified Zenodo DOI and publication
  receipt; repair post-tag verification so it does not depend on the `gh` CLI
  and can be re-run by manual dispatch.

## GKOS-2026-09-22 v0.82

**Standing:** live informative edition, published September 22, 2026 through
the R24 owner-approved signed tag and GitHub Release. Zenodo version DOI:
[10.5281/zenodo.22905582](https://doi.org/10.5281/zenodo.22905582). See the
[publication receipt](docs/releases/GKOS_2026-09-22_v0.82_PUBLICATION_RECORD.md). The normative
population is unchanged from v0.81 (62 permanent allocations, 28 mandatory
diagnostic gate codes). No profile qualification is created. None of these
changes alters the signed v0.81 release.

- Consolidate machine-readable release coordinates (R24 G82-06); see the
  [coordinate record](docs/releases/V082_COORDINATE_CONSOLIDATION.md).

### Publication records and citation

- Record the live v0.81 publication, verified Zenodo version and concept DOIs,
  and the publication receipt; update the master standard's status notice
  (#38). The master standard on `main` therefore differs from the tag.
- Reconcile post-publication wording across the decision register, registry,
  profile-applicability note, governance, implementation index, Zenodo policy,
  compatibility snapshot and legal orientation (consistency review,
  September 22, 2026).

### Decisions and prospective semantics

- Accept R24 v0.82 informative release gate (Option A: R23 targets the next
  normative edition after v0.82) and stage the unpublished
  `release-candidates/v0.82-rc1` package and validator. No tag, release or
  publication is authorized.
- Accept R22 canonical informative architecture r3 as documentation authority
  only (#43).
- Accept R23 prospective Layer-3 interoperability semantics for v0.82
  development, with provisional schemas, fixtures, comparator and V82-01 work
  packet (#44); rename the R23 record to drop its stale `_Proposal` filename
  (#53).
- Reconcile R22/R23 standing and adopt Selection Envelope terminology (#47).

### Evidence, fixtures and CI

- Add the provisional RRET-01 adversarial retrieval corpus and tests (#41).
- Route Linux CI jobs to the self-hosted R720 runner (#49).

### Orientation and graphics

- Restore README illustrations and render Mermaid diagrams as graphics (#39);
  add README attribution and two practical explainers (#40).
- Add the full-stack workflow walkthrough and ISO, EU and NIST middleware
  proposals; update the Known Limitations annex (#45); preserve the complete
  roadmap and technical orientation (#46).
- Assess current public ecosystem evidence for E2 (#51 and follow-up).
- Reconcile the historical corpus with current standing; add domain guides,
  corpus status, evolution and standards-engagement notes (#54).
- Add the CIA triad summary, full alignment and graphics (#55).

### Owner clarification — September 12, 2026

- Clarify that different ownership is desirable, not mandatory, for a public
  second implementation; different functioning products still need evidence
  of implementation independence. No candidate is qualified by this decision.
- Repair the conformance README's historical divergence reference without
  changing the archived discovery record or signed v0.81 release.
- Reaffirm that Viewer/Projection claims require a manifest, report, and
  evidence. See the [owner clarification](docs/decisions/2026-09-12-implementation-independence.md).

## GKOS-2026-09-03 v0.81

**Standing:** live developmental pre-standard, published September 3, 2026
through the R20 owner-approved signed tag and GitHub Release after passing
post-tag checks. Zenodo version DOI:
[10.5281/zenodo.22269294](https://doi.org/10.5281/zenodo.22269294).
No profile qualification is created. See the
[publication receipt](docs/releases/GKOS_2026-09-03_v0.81_PUBLICATION_RECORD.md).

- Consolidates R17 captured-time, half-open authority validity intervals.
- Consolidates R18 GCP-4/GCP-5 lifecycle, bounded independent-agent review, and
  protected-disclosure controls; six permanent allocations join the edition.
- Includes R19 prospective adoption of the eighth documentation-intent
  invariant, with the remainder of DOCSTD still proposed and non-normative.
- R19 publication requires a complete final rerun and separate publication
  authority under R20, which supersedes conflicting automatic-publication text.
- Preserves 62 permanent allocations, 28 mandatory diagnostic gates, graph
  integrity controls, and portable mutation coverage without a profile claim.
- Binds final release approval, exact commit, evidence, and hashes through a
  signed tag attestation; preserves the RC and earlier immutable releases.
- R21 ecosystem work remains informative and non-activating.

### Historical pre-publication development record

- R19 prospectively supplies and adopts “Every committed governed state change
  is durably receipted” as the previously undefined eighth
  documentation-intent position; it does not claim that this wording was
  historically enumerated by R4.
- R19 adopts only the eight-position intent-review table in DOCSTD §4. The
  remainder of DOCSTD stays proposed and non-normative.
- At adoption, R19 remained unpublished. It does not change any release or qualification
  status; under R18-131, including it in a v0.81 candidate requires a complete
  final rerun and separate publication authority.
- R17 accepts half-open authority validity intervals:
  `valid_from <= evaluation_time < valid_until`.
- `GKOS-AUTHUSE-007`, its applicability overlay, authority-receipt schema,
  Authorized Use Record development schema, and exact-boundary fixtures remain
  unpublished development work until a later release is separately authorized.
- v0.80, its tag, release package, schemas, applicability map, and diagnostic
  registry remain unchanged historical coordinates.

## GKOS-2026-08-20 v0.80

- **BREAKING:** R16 establishes GKOS Core as GCP-1 through GCP-5 and GKOS
  Advanced as GCP-1 through GCP-7, with a read-only GCP-6 Context-Only
  Extension and an independent Viewer/Projection Profile.
- **BREAKING:** deterministic `GKX-CBOR-1` canonical serialization, SHA-256
  artifact identity, fixed-microsecond UTC timestamps, NFC text, schema-typed
  numbers, and refusal diagnostics become normative.
- GCP-6 now captures non-deterministic selection separately from deterministic
  Context Manifest assembly; GCP-7 binds the exact manifest hash, authority,
  distinct actor roles, typed effect scope, outcome, and recovery route.
- Twenty-nine permanent requirements and initial active schemas are added for
  profiles, canonicalization, context, authorized use, refusal, and effect
  scope.
- Claims against v0.79 and earlier do not carry forward. Historical records and
  immutable release packages remain valid evidence and are not rewritten.
- The active fixture catalog remains non-qualifying; this release defines the
  required contracts but does not certify an implementation or establish
  accredited, consensus, legal, or regulatory standing.

## GKOS-2026-08-16 v0.79

- R15 adopts universal state-change receipting, domain-neutral retention and
  disposition controls, Layer-1 re-entry without inherited standing, explicit
  semantic supersession, and bounded supersession delegation.
- Seventeen permanent requirement IDs are published for receipt, policy,
  retention, re-entry, and delegation behavior, with per-requirement GCP
  applicability.
- Active core, provisional SRTP, and implementation-only fixture populations
  remain separately reported; no complete qualifying GCP profile is created.
- NAV-001 remains informative and non-qualifying, NAV-002 remains undrafted,
  and unresolved GKX serialization questions remain outside this release.
- Zenodo archival metadata and the release-to-DOI binding process are prepared;
  DOI issuance does not imply certification, consensus, or conformance.

## GKOS-2026-08-05 v0.78

- R14 adopts the GKX 2.0 machine namespace: `gkx_version`, `.gkx/`, `GKX-*`,
  and `gkx`.
- Active schemas, fixtures, adapters, and implementation guidance were migrated
  to the GKX 2.0 contract.
- Pre-GKX-2.0 changelog material is preserved in `archive/` as history.
