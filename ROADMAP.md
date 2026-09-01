# GKOS roadmap

The current published release is GKOS-2026-08-20 v0.80. Development toward a
possible v0.81 continues on review branches; no development branch becomes a
release or conformance result without the applicable exact-bound gates and
separate publication authority. The prior roadmap is preserved in `archive/`
as historical planning evidence.

## R19 adoption coordinate

- **Branch:** `codex/adopt-q-intent-r19-20260901`
- **Exact SHA:** `04a164792c0957f5ce8acc9ba6853597ec0660dd`
- **Hosted repository workflows:** 5 of 5 passed at the exact SHA on
  2026-09-01
- **Standing at the stated SHA:** hosted-qualified review candidate; unmerged,
  untagged, unreleased, and unpublished
- **Scope:** supplies and adopts the previously undefined eighth
  documentation-intent position as an unpublished development amendment

Hosted workflow success establishes that the branch passed its repository
checks at the stated SHA. A successor documentation commit must run its own
hosted checks. Neither result makes the branch GKOS v0.81, publishes R19, or
establishes a qualifying GCP profile.

## Qualification boundary

The starter conformance runner currently reports six fixtures as `PASS` and
two graph fixtures as `UNEVALUATED`. It exits non-zero, emits no profile claim,
and remains a deliberately incomplete evidence foundation. Those outcomes
must not be collapsed into an all-pass or conformance statement.

R19 changed the exact candidate after the earlier R18 evidence coordinate.
Under R18-131, a v0.81 publication candidate containing R19 requires a complete
final rerun bound to the accepted exact source and evidence coordinates, plus
separate publication authority.

## Next release work

1. Review and merge R19 only through the repository's normal protected-branch
   process.
2. Freeze the resulting v0.81 candidate SHA and bind all release inputs,
   dependencies, tools, environments, fixtures, and evidence to it.
3. Execute the complete mandatory conformance, mutation, release-validation,
   checksum, link, and documentation gates. Any mandatory `FAIL`, `HOLD`,
   `BLOCKED`, or `UNEVALUATED` prevents publication.
4. Resolve or implement the remaining graph expectations and catalog coverage
   needed for any claimed profile; do not infer qualification from the starter
   runner.
5. Obtain separate publication authority before creating a tag, GitHub
   release, package, DOI binding, or public v0.81 claim.

## Longer-term work

Continue developing and validating the GKX 2.0 contract, complete conformance
fixtures, independent implementations, and the v1.0 governance gates. The
v1.0 path still requires multi-stakeholder governance, independent
implementation evidence, appeals and succession mechanisms, and signed
archival publication.
