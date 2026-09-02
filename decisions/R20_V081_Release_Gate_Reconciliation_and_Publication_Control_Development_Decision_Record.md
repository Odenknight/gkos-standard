# R20 — v0.81 release-gate reconciliation and publication control

**Date:** 2026-09-02

**Status:** Accepted development decision; v0.81 preparation and publication-control authority

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor

**Publication target:** A separately approved GKOS v0.81 developmental publication using its actual publication date

**Input baseline:** `gkos-standard` `main` at
`1f5768fe6b8f847c17030127a3a00e78edf5cd80`

## 1. Decision and purpose

R20 reconciles the v0.81 publication authority after R19 changed the candidate
that had previously been evaluated under R18. It adopts the ECO81-Q01 through
ECO81-Q26 owner dispositions recorded on 2026-09-02, including the Q20 and Q25
addenda.

R20 does not publish v0.81. It defines the exact conditions that must be met
before a final v0.81 publication decision may be made.

## 2. Release claim class

GKOS v0.81, if approved for publication, will be an owner-authorized,
developmental, non-consensus, non-qualifying Standard publication.

The release must state all of the following:

- `qualifying_profiles` remains derived from complete passing catalogs and is
  not asserted manually;
- no GKOS Core, GKOS Advanced, Context-Only Extension, GCP, or
  Viewer/Projection conformance is claimed unless the final exact-bound
  evidence independently establishes it;
- no implementation is certified, accredited, independently verified, or
  regulator-approved merely because the Standard is published;
- implementation divergences are preserved and disclosed rather than removed,
  relabeled, or converted into Standard failures without a controlling
  decision; and
- the release date is the actual publication date, not the former R18 planning
  date of 2026-08-29.

## 3. Publication authority reconciliation

R18-131 remains historical evidence of the earlier one-release automatic
publication design. For a v0.81 candidate containing R19 or any later change,
R20 supersedes automatic publication to the extent of conflict.

The final v0.81 release requires an explicit owner publication approval after:

1. one exact release-candidate commit is frozen;
2. every mandatory release gate has been executed against that exact commit;
3. the complete evidence and limitation packet is presented;
4. no required result is failed, held, blocked, waived, unexplained, skipped,
   unsupported without a capable passing lane, or unevaluated; and
5. the proposed tag target and release artifacts are verified.

No Review Agent, CI service, repository workflow, timeout, quorum, or delegated
executor may substitute for the final owner publication decision.

## 4. Controlling v0.81 gate register

### G81-01 — Release claim

The release is developmental, non-consensus, and non-qualifying unless a
complete exact-bound catalog independently produces a narrower claim.

### G81-02 — Governing authority reconciliation

R17, R18, R19, R20, the Development Decision Register, and the release text
must be mutually consistent. R20 controls the final v0.81 publication route.

### G81-03 — Release identity and date

The release identity must use the actual publication date. Earlier proposed
v0.81 dates remain historical planning evidence and must not be presented as
published coordinates.

### G81-04 — Candidate assembly and freeze

Before the final release candidate is created:

- stale PR #29 must remain closed as superseded;
- PR #30 must be corrected, reviewed, dispositioned, and merged;
- the current roadmap, release-gate record, and ecosystem-program separation
  must be present on `main`;
- release-toolchain security findings must be remediated or fail the gate; and
- required branch and release-tag controls must be active.

A new `release/v0.81-rc1` branch may then be created from the exact current
`main`. Later changes create a new candidate identity and invalidate prior
final evidence.

### G81-05 — Public-documentation quality

Current public documentation must distinguish:

1. **Standard requires**;
2. **architecture recommends**;
3. **implementation example**; and
4. **not in the Standard**.

Informative guidance must identify its Standard baseline, review standing,
limitations, and external-source review date. Repository checks are not
independent validation.

### G81-06 — Registry, applicability, schema, and diagnostic consistency

All active requirement allocations, profile applicability, diagnostic codes,
schemas, and release text must be internally consistent at the frozen
candidate. Development overlays selected for publication must be consolidated
without rewriting the v0.80 release package.

### G81-07 — Stable-gate mutation coverage

Every registered mandatory gate in the candidate must have Standard-owned,
portable positive/negative or baseline/mutation evidence. Strict mutation
coverage must pass at the exact candidate. Mechanism-level mutation coverage
must not be represented as cumulative profile qualification.

### G81-08 — Graph-evaluation integrity

The Standard-owned graph evaluator, binding checks, and adversarial false-PASS
protections must pass. Real implementation divergences must remain visible.
They do not alone block this non-qualifying Standard publication unless the
release claims compatibility or conformance that depends on them.

### G81-09 — Profile qualification

Profile qualification is separate from Standard publication. Any claimed
profile requires complete applicable requirement coverage on one exact
Standard, fixture, implementation, dependency, and environment baseline.

### G81-10 — Environment reproducibility

Blocking hosted lanes must include Ubuntu and Windows on Node 22 and Node 24.
A clean separately operated replication should be included as corroborating
evidence. Informative lanes cannot replace a failed blocking lane.

### G81-11 — Dependency and supply-chain security

The release toolchain must have no unresolved high or critical dependency
finding. Lockfiles, dependency identities, audit output, remediation, and the
post-remediation test results must be preserved.

### G81-12 — Implementation-version identity

Signed release tags, later development heads, product pins, and compatibility
oracles are distinct coordinates. A development commit must not inherit a
release identity merely because a package file retains the same version.

### G81-13 — Repository release controls

The final release route must require pull-request-based changes, mandatory
checks, protected release/tag operations, no unauthorized force update or
deletion, and a verified signed annotated tag.

### G81-14 — Release-package completeness

The release validator must verify at least:

- actual release date and version;
- README, master Standard, changelog, citation, governance, decisions,
  requirements, mappings, schemas, fixtures, release notes, manifest, and
  checksums;
- exact requirement and diagnostic populations expected by the candidate;
- profile standing and `qualifying_profiles` derivation;
- release-artifact hashes and tag target; and
- preservation of earlier immutable release packages.

A job that checks only file existence or checksums of already existing release
directories does not satisfy this gate.

### G81-15 — Final exact-bound rerun and approval

After candidate freeze, every mandatory repository, conformance, mutation,
security, documentation, release, checksum, environment, and tag-preflight
check must be rerun. Final publication requires a separate explicit owner
approval bound to the exact candidate and evidence package.

### G81-16 — Ecosystem roadmap separation

MCP, A2A, ACS, Graphiti, model routing, agent runtimes, provider connectors,
and vendor products are not normative v0.81 dependencies. R21 governs the
parallel ecosystem-interoperability program and may produce informative
bindings, crosswalks, pilots, and evidence without changing v0.81 qualification.

## 5. PR #30 disposition

PR #30 remains the canonical public-reference-architecture candidate. Before
merge it must:

- replace “validated public draft” with a claim-safe reviewed-draft status;
- preserve the public/general-audience orientation while directing detailed
  technical material to implementation guidance;
- identify current reference-implementation and external-protocol coordinates
  by exact version and review date;
- add or reference a review-disposition record and external-source register;
- use no private repository as public evidence or as the named second-
  implementation candidate; and
- receive one separately authorized, different-model-family bounded review.

That review is advisory development evidence. It is not independent
conformance verification merely because a different model family performed it.

## 6. Second implementation

The project is awaiting a public second implementation. Public documentation
must use generic terms until a candidate is publicly reviewable and has
published sufficient source, dependency, provenance, fixture, and evidence
material to assess independence.

No private repository, internal product, or unpublished workspace may be named
as the second independent implementation or used as public conformance
evidence.

## 7. Commercial and assessment boundary

Commercial implementation support, hosted validation, training, and
self-assessment tooling are permitted. During v0.x:

- the project must not represent a self-assessment as independent verification;
- “GKOS certified” is reserved until a governed certification scheme and
  competent independent certification bodies exist; and
- product references remain illustrative and establish no endorsement,
  procurement recommendation, interoperability result, or conformance claim.

## 8. Authority and exclusions

R20 authorizes preparation, correction, review, candidate assembly, and final
preflight under the gates above. It does not itself authorize:

- merge of an unreviewed PR #30 head;
- creation of `release/v0.81-rc1` before its predecessor gates pass;
- the v0.81 tag or GitHub Release;
- DOI publication;
- a conformance or certification claim;
- an Engine, Lite, product, Rust, MCP, A2A, or ACS release;
- deployment, writer activation, L7 effect activation, or authority transfer;
  or
- disclosure of private repository identities or evidence.

## 9. Rollback and supersession

Before publication, a later owner decision may amend these gates prospectively.
After publication, the v0.81 release package and evidence remain immutable.
Corrections require an erratum or later release and must not rewrite the
published coordinate.
