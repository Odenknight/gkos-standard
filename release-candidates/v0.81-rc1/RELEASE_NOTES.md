# GKOS v0.81-rc1 release notes

**Standing:** unpublished release candidate; developmental, owner-authorized v0.x
pre-standard work; non-consensus; non-qualifying.

This candidate does not create a `v0.81` tag, publication, profile claim,
certification, protocol activation, production authority, or consequential
effect authority.

## Candidate scope

Relative to the published GKOS-2026-08-20 v0.80 baseline, v0.81-rc1 prepares
the following accepted development work for exact-bound release review:

- R17 authority-validity interval semantics and captured action-evaluation time;
- R18 GCP-4/GCP-5 lifecycle closure, bounded different-model-family review, and
  protected-disclosure controls;
- R19 adoption of the eighth documentation-intent invariant;
- R20 release-gate reconciliation and explicit post-evidence publication
  authority;
- 62 permanent requirement allocations in the candidate registry, of which 56
  were already published in v0.80 and 6 are accepted for the v0.81 line;
- 28 registered mandatory gate codes;
- Standard-owned executable gate mutation coverage for all 28 registered gate
  codes;
- Standard-owned GCP-3 graph-evaluation and adversarial false-PASS protections;
- public documentation and reference-infrastructure corrections reviewed under
  the bounded PR #30 different-model-family process.

## Qualification boundary

The candidate creates no qualifying profile. The active evidence remains
mechanism-level and exact-bound; it must not be represented as GKOS Core,
Advanced, Context-Only, Viewer/Projection qualification, certification, or
independent conformance verification.

Real implementation divergences remain visible and are not converted into
Standard PASS results or silently waived.

## Ecosystem separation

R21 is informative and non-activating. MCP, A2A, ACS, Graphiti, model routing,
agent runtimes, provider connectors, and vendor products are not normative
v0.81 dependencies. The public second implementation remains **awaiting**.

## Publication boundary

The final publication date is intentionally unset. R20 requires the actual
publication date and a separate explicit owner approval after the final
candidate evidence packet is presented. A signed annotated `v0.81` tag may be
created only after that approval and must resolve to the approved release
coordinate.
