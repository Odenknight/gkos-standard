# R24 — v0.82 informative release gate and publication control

**Date:** 2026-09-22

**Status:** Proposed development decision; not accepted

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor

**Owner scope disposition:** 2026-09-22 — publish current `main` as GKOS v0.82
with R22/R23 and ecosystem material kept informative or prospective; no new
requirements and no qualifying profile. This disposition selects the scope
only. It does not accept this record or approve publication.

**Publication target:** A separately approved GKOS v0.82 developmental
publication using its actual publication date

**Input baseline:** `gkos-standard` `main` after the post-v0.81 consistency
review (PR #57)

## 1. Decision and purpose

R20 governed only v0.81. `main` now carries post-v0.81 documentation,
accepted informative architecture (R22), accepted prospective Layer-3
semantics (R23), provisional fixtures (RRET-01, L3), CI routing and ecosystem
orientation that the Zenodo archive does not yet preserve.

R24, if accepted, defines the conditions for a v0.82 **informative edition**:
a citable, archived snapshot of that material without changing normative
requirement populations. R24 does not publish v0.82.

## 2. Release claim class

GKOS v0.82, if approved, will be an owner-authorized, developmental,
non-consensus, non-qualifying Standard publication. It must state that:

- the normative requirement population is unchanged from v0.81: 62 permanent
  allocations and 28 mandatory diagnostic gate codes;
- R22 is informative documentation authority only;
- R23 remains accepted **prospective** development semantics; its provisional
  L3 schemas, fixtures and comparator are published as provisional,
  non-normative material, and `EAR-GRAPH-001..003` remain DRAFTING;
- RRET-01 and other `provisional` fixtures create no conformance obligation;
- `qualifying_profiles` remains derived and empty; and
- the release date is the actual publication date.

## 3. Consequence for the v0.82 development label

Earlier documents describe R23 and V82-01 as “v0.82 development”. Publishing an
informative v0.82 before V82-01 closes means normative adoption of R23 moves to
a later edition. Before freeze, the candidate must either:

- **Option A** — retarget prospective R23/V82-01 wording to “the next
  normative edition after v0.82”, leaving historical records unaltered; or
- **Option B** — keep the “v0.82 development” wording and state in the release
  notes that R23 normative adoption is deferred beyond the v0.82 publication.

The owner selects A or B when accepting R24.

## 4. Controlling v0.82 gate register

### G82-01 — Release claim

The release is developmental, non-consensus and non-qualifying, and makes the
section 2 statements.

### G82-02 — Governing authority reconciliation

R17–R24, the Development Decision Register, CHANGELOG and release text are
mutually consistent. R24 controls the v0.82 publication route.

### G82-03 — Release identity and date

The release identity uses the actual publication date. Planning dates are not
published coordinates.

### G82-04 — Candidate assembly and freeze

One exact `release/v0.82-rc1` commit is frozen. Later changes create a new
candidate identity and invalidate prior final evidence.

### G82-05 — Unchanged normative population

Registry lint, strict mutation coverage and gate-code counts pass at the
frozen candidate with 62 requirements and 28 gate codes. Any change to the
normative population invalidates this informative release class.

### G82-06 — Machine-readable coordinate consolidation

`requirements/PROFILE_APPLICABILITY.json`, the requirement and evidence
vocabularies, and fixture manifests that name a release coordinate are
updated to the v0.82 coordinate, or explicitly documented as historical pins.
No “release candidate” coordinate from a superseded candidate may remain in a
current machine-readable companion.

### G82-07 — Blocking lanes and reproducibility

All mandatory checks pass on the exact candidate: `lint`, `links`, `validate`,
`checksums`, `blocking dependency audit / Node 24`, and blocking Ubuntu and
Windows lanes on Node 22 and Node 24. Informative lanes cannot replace a
failed blocking lane. A clean separately operated replication is
corroborating evidence; its absence is reported, not hidden.

### G82-08 — Dependency and supply-chain security

No unresolved high or critical release-toolchain dependency finding remains.

### G82-09 — Release-package completeness

The published-release validator verifies the date, version, README, master
Standard, CHANGELOG, `CITATION.cff`, `.zenodo.json`, decisions, requirements,
release notes, manifest, source and package checksums, requirement and gate
populations, profile standing, tag target, and preservation of every earlier
release package, including v0.81.

### G82-10 — Repository release controls

The release route uses pull requests, mandatory checks, the `v*` tag ruleset,
no force update or deletion, and a verified signed annotated `v0.82` tag.

### G82-11 — Final approval

After freeze and rerun, the owner receives the candidate SHA, evidence table,
limitations, proposed date and tag target. Publication requires a separate
explicit **APPROVE v0.82 PUBLICATION** disposition. No agent, CI service,
workflow, timeout or delegated executor may substitute for it.

### G82-12 — Archival verification

After the GitHub Release, the Zenodo record is verified for title, creator,
version, date, license routing, files and commit before its version DOI is
recorded in a follow-up change. The v0.81 DOI is never reused.

## 5. Authority and exclusions

R24, if accepted, authorizes candidate preparation, correction and preflight.
It does not itself authorize the `v0.82` tag, GitHub Release, DOI publication,
any conformance or certification claim, normative adoption of R23, protocol
activation, or any Engine or product release.

## 6. Rollback and supersession

Before publication, a later owner decision may amend these gates. After
publication, the v0.82 package and evidence are immutable; corrections require
an erratum or later release. The v0.81 release package remains unaltered.
