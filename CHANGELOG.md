# Changelog

## Unreleased

- R26 implementation of the accepted items (v0.83 development line; R26
  accepted in part 2026-10-07, R26 §7.3). Annex text, marked
  `<!-- R26-Axx (accepted 2026-10-07; ...) -->`: Authority and Refusal
  Receipt Fields annex gains role projections, actor identity, typed Refusal
  Receipt content, effect-scope containment and authority interval sources
  (A02, A03, A05, A11, A13); Canonical Serialization annex gains the
  schema-to-CBOR mapping, declared artifact identities, received-bytes digests
  and digest-bound closure rules (A06-A08, A16); governed state change annex
  gains the State-Change Receipt role elements, review deadlines and
  hold-predicate results (A12, A14, A15). R26-A01 (Definitions annex), A04
  (revocation status at action time), A17 (GKOS-IDENTITY-001 interpretation
  row) and A18 (standing of two annexes) stay proposed and are not included;
  the accepted A05 and A14 text cites Definitions D-1 and D-2 as drafted.
- R26-A09 and A10 Option A (accepted 2026-10-07): the Diagnostic Code Registry
  adds the most-specific-code rule and ten gate codes (L1-002, L1-003, L2-001,
  L3-002, L4-005 to L4-008, L6-010, L7-008), registry version
  `1.2.0-development`, mirrored in `requirements/DIAGNOSTIC_CODES.json`. Under
  R26-A15 and the owner answer of R26 §7.2 it also adds GKOS-GATE-L4-009
  (disposition refused: active hold), so `main` carries 39 gate codes. The
  v0.82.1 validator asserts the published 62 requirements and 28 gate codes
  against the published tag.
- R26 schemas (accepted 2026-10-07; R26-S01 to S07): new versions
  `authority-receipt-1.1.0`, `authorized-use-record-1.1.0`,
  `refusal-receipt-1.1.0`, `decision-record.canonical-1.0.0`,
  `proposal-envelope.r26`, `assessment.r26`, `conformance-manifest.r26`,
  `selection-set-1.1.0` and `context-manifest-1.1.0`, and received-bytes
  digest definitions in `gkx-common.defs.json`. Earlier schema versions are
  unchanged and stay valid.
- R26 development fixtures and reference runner for the accepted items (v0.83
  development line): 233 non-qualifying cases under `fixtures/development/r26/`
  with the catalog `fixtures.manifest.json`, executed by `npm test`. The
  runner gains authority-chain intervals, actor-reference sameness,
  schema-driven artifact verification with declared artifact identities and
  schema-declared set order, received-bytes digest checks through the typed
  verifier, an R26 (1.1.0) context-assembly path that verifies every
  `GKX-CBOR-1` reference as a canonical artifact through the schema registry
  and refuses raw content so labelled, the most-specific L6-002 code, the ten
  new gate predicates, review-deadline and hold-result evaluation (the
  plain-hold refusal carries GKOS-GATE-L4-009), a State-Change Receipt role
  check, effect-scope containment (A02), operation-kind applicability (A05),
  role-projection construction (A13) and closure-rule evaluation (A16).
  Existing catalogs, Track-A twins and the GCP-6 replay output are unchanged;
  1.0.0 selection envelopes keep the published assembly path. Fixtures for
  R26-A01, A04, A17 and A18 are not included.
- R26 advisory review corrections (accepted items): the v0.82.1 validator's
  append-only check on the open v0.83 line compares the original requirement
  text and each published gate row, not only identifiers, and rejects
  duplicate requirement IDs and gate codes before that comparison
  (r26-REV-002); findings r26-REV-003 to r26-REV-009 are corrected in the
  runner and annex text; R26 assembly verifies artifact identity through the
  schema registry (r26-REV-005); role projection value tables translate
  enumerated values only (r26-REV-010); unsupported or malformed
  policy-required dimensions fail closed with GKOS-GATE-L7-003 (r26-REV-011);
  closure evaluation refuses absent, null or malformed snapshot contents, and
  held-item digests that name more than one basis, with GKOS-GATE-L6-009
  (r26-REV-012, r26-REV-013).
- Accept R26 by item (2026-10-07; R26 §7.3): R26-A02, A03, A05–A16 and
  R26-S01–S07 are accepted on the v0.83 development line; R26-A01, A04, A17
  and A18 stay proposed until GKOS-Engine reference evidence exists. Record
  the owner's second-round answers (R26 §7.2), including GKOS-GATE-L4-009
  for the R26-A15 refusal on an active hold. Decision records only; the
  accepted items' implementation reaches `main` by a separate pull request.
  The published v0.82.1 edition is unchanged.
- Reconcile stale edition coordinates and publication-status wording with the
  published GKOS-2026-09-24 v0.82.1 edition in `NOTICE.md`, `LICENSE.md`,
  `SECURITY.md`, `ROADMAP.md`, `TECHNICAL_README.md`, `docs/CORPUS-STATUS.md`,
  a status note on the decision register's 2026-09-24 owner-clarification
  entry, the legal orientation, the version compatibility matrix and the two
  infrastructure guides, and add a completion note to the v0.82.1
  specification-status clarification. Editorial and clarification changes; no
  requirement, schema, fixture, runner, gate or profile change. The completion
  note and the decision-register status note are additive: the original text
  of those records is preserved, and released changelog sections are unchanged.
- Add a publication note below the GKOS-DOCSTD-001 status line: R19, which
  adopted its Section 4, was published with GKOS-2026-09-03 v0.81. The status
  line itself is unchanged.
- Apply the current nomenclature to the root documents and the master
  standard: GKOS is a developmental specification (public working draft); the
  full statement of its single-author pre-standard origin and committee goal
  appears in the README "Current standing" section and in `NOTICE.md`. Name
  the current edition GKOS-2026-09-24 v0.82.1 where text treated v0.81 as
  current, record the merged NIST crosswalk in `TECHNICAL_README.md`, and say
  "specification" for generic references in current prose. Editorial only;
  historical sections, published titles and identifiers, and requirement,
  schema, fixture, runner, gate and profile content are unchanged.
- Add an informative beginner's guide in `guide/`: an index, eight numbered
  chapters and a glossary, linked to the controlling files and reusing
  `illustrated/` and `graphics/diagrams/` figures. The README links to it. No
  requirement, schema, fixture, runner, gate or profile change.
- Align current-facing documents under `docs/` with the published
  GKOS-2026-09-24 v0.82.1 edition and the current nomenclature ("developmental
  specification (public working draft)"). Add current-edition notes where a
  page named only an older published baseline, record the completed PR #42
  review gate in the ecosystem index, add a documentation-area standing table
  to `docs/CORPUS-STATUS.md`, and add dated notes to NAV-002 and to the
  2026-09-24 owner clarification. Historical release, publication, review and
  archive records keep their original wording. Editorial and clarification
  changes only.
- Add a graphics register (`graphics/REGISTER.md`): every image and diagram
  with source, use, edition label, style family and status, plus 37
  graphics-needed items (GN-001 to GN-037). The adoption-paths graphic now
  names GKOS v0.82.1; its PNG was rendered again from the SVG with sharp
  0.35.4. New `illustrated/README.md` catalogs the illustrated figures and their
  fitness for reuse. Insert `GRAPHIC-NEEDED` earmarks at each anchor outside
  `standard/annexes/`; the annex earmarks wait for the v0.83 line under the
  proposed R25. Informative only.
- Add a proposed ICM organization map (`scripts/icm-map.mjs`, `docs/icm/map/`)
  with per-area trackers and edit ledgers, and proposed `guide` and `graphics`
  workflows with routes in `docs/icm/CONTEXT.md`. Informative; no normative
  change.
- Align the conformance README, claims policy and examples with the
  developmental specification (public working draft) wording and the current
  GKOS-2026-09-24 v0.82.1 edition, generalize the conformance carry-forward
  bullet to the current edition, and add a historical index for
  `governance/portfolio/`. Editorial; no requirement, schema, fixture, runner,
  gate, profile or claim-rule change.
- Accept R25 (2026-10-07): the v0.83 development line is open on `main`.
  Published GKOS-2026-09-24 v0.82.1 stays immutable at its signed tag;
  frozen technical paths may change for the next edition under the amendment
  path, and the development validator now permits them.
- Record the owner's 2026-10-07 answers to R26 questions Q1–Q6 (R26 §7.1).
  R26 stays proposed; its chosen items are built on the v0.83 line as an
  evidence package for acceptance.

## GKOS-2026-09-24 v0.82.1

**Standing:** live documentation patch, published at `2026-09-25T00:54:27Z`
(September 24 in America/New_York), with verified signed tag and all post-tag
checks passed. See the [publication receipt](docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.md).

- Classify GKOS as a developmental specification / public working draft;
  retain the existing project name, acronym and titles.
- Consolidate existing exact-bound conformance and non-certification controls
  in `conformance/CLAIMS_POLICY.md`, including SSP and contract guidance.
- Preserve technical contracts and historical releases; no profile qualifies.
- Reconcile the requested edition date with actual publication in America/New_York;
  preserve the exact UTC timestamp and immutable prepared package.

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
