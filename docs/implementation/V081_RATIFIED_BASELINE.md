# GKOS v0.81 historical R18 baseline

**Current authority:** R20 supersedes the conflicting automatic-publication
route below. These R18 coordinates are historical inputs, not the final v0.81
release identity or a consensus-ratification claim. R19 now denotes the adopted
eighth documentation-intent invariant; the earlier DDCV numbering expectation
is historical and does not allocate a decision number.

**Authority:** R18 and the owner dispositions recorded 2026-08-29

**Input coordinates:**

- Standard: `6a7ad71fc027894cd4e2bbb71c3bbadda06cd12f`
- TypeScript compatibility oracle: `GKOS-Engine`
  `0584a5d3e70384ef65e9069fbe1d6fd1d80cfc04`, package/tag 2.1.2
- Lite evidence coordinate: `GKOS-Engine-Lite`
  `4027bfc4499ad0a2f3e753401f1320468e283823`, package/tag 2.1.2
- Lite Full pin under differential review:
  `e7cc0dd478af3d0bda216c5258dec5f77932def7`

## Release gate

v0.81 is eligible only when all of the following are satisfied:

- R18 requirements and diagnostic mappings are internally consistent;
- GCP-4 and GCP-5 have complete Standard-owned requirement sets;
- all previously uncovered nineteen gate codes and all R18-added gate codes
  have executable portable mutation evidence;
- strict mutation lint passes;
- the R17 applicability and diagnostic overlays are consolidated into the
  v0.81 release-base files and parity checks pass;
- acceptance evidence passes in two independently provisioned environments;
- required-capability tests pass in a capable hosted lane;
- Full Engine release identity is internally consistent;
- the Lite pin/tag/main differential dossier is complete;
- the release closure binds exact source, dependency, toolchain, environment,
  fixture, result, and artifact digests; and
- no mandatory result is failed, skipped, unsupported without an alternate
  capable PASS, blocked, held, unevaluated, waived, or unexplained.

R18 originally contemplated automatic one-release publication. R20 supersedes
that route for a candidate containing R19 or later changes: final publication
requires an explicit owner decision after the exact candidate, full evidence,
limitations, artifacts, and proposed tag target have been presented.

## Scope boundaries

- DDCV remains provisional, informative, non-normative, non-qualifying, and
  non-gating. Its expected decision number is R19 after collision review.
- NAV-002 remains a draft, unratified, non-normative, non-qualifying, and
  outside Track A.
- TypeScript Full 2.1.2 remains the compatibility oracle.
- Engine 3.0 is reserved for a separately authorized Rust cutover.
- Lite is projection-only and must return a structured
  `requires_full_engine` result for authoritative/current-state requests.
- `qualifying_profiles` is derived from the passing catalog; it is never
  asserted manually.
- Engine/Lite release, deployment, conformance, and Rust cutover authority are
  outside this baseline.
- R18 permits bounded independent-agent Layer-5 review only. General 008
  bootstrap autonomy, protected writing, L7 effects, autonomous repair, and
  A2/A3 activation remain outside v0.81 and require a separate decision.
- Only the five Rust Uplift decisions recorded in OD-12 are ratified; the
  remainder of the r4 plan is advisory unless separately adopted.
- When the Primary Approver is unavailable or recused, major and indeterminate
  work remains on governed HOLD. No alternate or quorum is presently granted.
