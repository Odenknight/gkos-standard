# GKOS roadmap

- **Release coordinate:** GKOS-2026-09-03 v0.81
- **Publication standing:** published and immutable at signed tag `v0.81`
- **Published source target:** `8f2a158c6d4b8cabd907d98765766d281aec1247`
- **Publication binding:** [exact commit and approval](docs/implementation/V081_PUBLICATION_BINDING.md)
- **Development standing:** `main` is post-v0.81 development
- **Current profile standing:** no qualifying profile
- **Machine exchange contract:** GKX 2.0
- **Current governance:** owner-authorized v0.x development; not consensus
- **Accepted development decisions:** R17–R21
- **Proposed documentation decision:** R22 canonical informative architecture
- **Current development focus:** v0.82 interoperability, ambiguity resolution,
  retrieval/governance evidence, portable evidence packaging, and public
  implementation work under R21

This roadmap separates three horizons:

1. preserve the published, exact-bound, non-qualifying v0.81 release while
   keeping post-publication development distinct;
2. make GKOS useful across the current agent and infrastructure ecosystem
   without turning external protocols into permanent dependencies; and
3. establish the implementation, evidence, governance, and maintenance basis
   required before v1.0.

The prior pre-GKX roadmap remains preserved under `archive/` as historical
planning evidence.

## Horizon 1 — published GKOS v0.81 baseline

GKOS-2026-09-03 v0.81 is published as a developmental, owner-authorized,
non-consensus, non-qualifying pre-standard. Its signed tag, dated release
package, publication evidence, and Zenodo archive are immutable historical
coordinates. `qualifying_profiles` remains empty; publication does not qualify
an implementation or create certification standing.

The publication work formerly listed here is complete. Current `main` may carry
post-v0.81 informative or provisional development, including R21 ecosystem work
and RRET-01, without changing what v0.81 means. A correction to the published
coordinate requires an erratum or later release; the v0.81 package is not
rewritten.

Post-publication documentation must continue to distinguish the signed release
identity, current development state, implementation coordinates, and future
conformance evidence.

## Horizon 2 — ecosystem interoperability under R21

R21 is informative and non-normative. It develops versioned bindings, fixtures,
pilots, and guidance without adding MCP, A2A, ACS, a vendor, or an implementation
as a GKOS requirement.

### Current reviewed protocol inputs

- Model Context Protocol `2026-07-28`;
- Agent2Agent Protocol `v1.0.1`; and
- OWASP Agent Control Standard `v0.1.1` public preview.

Each coordinate must be rechecked before publication or implementation claims.
Protocol, SDK, service, gateway, and product versions remain separate.

### E0 — control artifacts

- external-source register;
- review-disposition register;
- non-normative ambiguity register;
- common implementation-binding template; and
- bounded different-model-family review packet.

### E1 — initial public drafts

- GKOS–MCP binding and `2025-11-25` to `2026-07-28` migration guidance;
- GKOS–A2A `v1.0.1` binding;
- GKOS–ACS `v0.1.1` crosswalk;
- agent-governance interoperability annex;
- multi-jurisdiction deployment guidance;
- GKOS Conformance Evidence Package 0.1; and
- corrected practitioner infrastructure blueprint.

### E2 — fixtures and reference adapters

Develop public positive, negative, boundary, mutation, downgrade, bypass,
disclosure, refusal, and effect-containment fixtures. Reference adapters remain
separately versioned from the Standard and grant no production authority.

### E3 — public pilots

Run low-risk pilots in this order:

1. Viewer/Projection interoperability;
2. GCP-6 Context-Only selection capture and replay;
3. MCP read and proposal surfaces;
4. A2A task, message, and artifact exchange without consequential effects;
5. ACS observation and control-event ingestion;
6. evidence-package exchange between distinct public tools; and
7. separately authorized synthetic, reversible L7 effect trials.

Every pilot publishes exact coordinates, expected and actual outcomes, failures,
unsupported behavior, burden, limitations, and corrective actions.

### E4 — public second implementation

Current standing: **awaiting a public second implementation**.

Publish the adapter contract, fixtures, ambiguity register, and evidence-package
profile openly. A candidate is not independent until its public source,
interpretation path, dependencies, ownership, operations, fixtures, and evidence
support that conclusion. No private repository or unpublished product is named
or implied.

### E5 — external standards engagement

Prepare claim-limited contributions for NIST/NCCoE, standards-development
organizations, provenance and records communities, MCP, A2A, OWASP, and other
relevant bodies. Offer schemas, fixtures, records, and implementation evidence
as optional operationalization inputs. Do not claim endorsement or ask another
body to adopt GKOS wholesale.

## Horizon 3 — v1.0 readiness

Before v1.0, GKOS must establish and publish at least:

- balanced multi-stakeholder governance;
- appointment, removal, voting, quorum, recusal, and anti-dominance rules;
- public-review periods by change class;
- appeals, complaints, interpretation, and maintenance procedures;
- conflict-of-interest and disclosure rules;
- release-signing and succession authority;
- complete conformance infrastructure for the intended profiles;
- at least one publicly demonstrated independent implementation beyond the
  reference implementation;
- interoperable evidence-package exchange;
- published pilot results, including failures and corrective actions;
- security, privacy, records, accessibility, human-factor, legal, scientific,
  and sector review appropriate to scope;
- archival publication and stable citation; and
- a separately governed certification/trademark policy before any “GKOS
  certified” claim is permitted.

## Standing exclusions

This roadmap does not authorize:

- rewriting, retagging, or replacing the published v0.81 coordinate;
- a qualifying profile;
- production deployment or credentials;
- writer or consequential-effect activation;
- a Rust or implementation cutover;
- automatic adoption of an external protocol version;
- endorsement of a product or framework;
- disclosure of private repository identities as public evidence; or
- use of “GKOS certified” before a governed certification scheme exists.
