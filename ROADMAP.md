# GKOS roadmap

- **Release coordinate:** GKOS-2026-09-03 v0.81
- **Publication standing:** pending the owner-approved verified signed tag and
  GitHub Release; v0.80 remains published until that event
- **Publication binding:** [exact commit and approval](docs/implementation/V081_PUBLICATION_BINDING.md)
- **Current profile standing:** no qualifying profile
- **Machine exchange contract:** GKX 2.0
- **Current governance:** owner-authorized v0.x development; not consensus
- **Controlling development decisions:** R17–R21 when their exact records are
  merged on `main`

This roadmap separates three horizons:

1. publish an honest, exact-bound, non-qualifying v0.81 release;
2. make GKOS useful across the current agent and infrastructure ecosystem
   without turning external protocols into permanent dependencies; and
3. establish the implementation, evidence, governance, and maintenance basis
   required before v1.0.

The prior pre-GKX roadmap remains preserved under `archive/` as historical
planning evidence.

## Horizon 1 — GKOS v0.81

### Release standing

The intended v0.81 release is developmental, owner-authorized, non-consensus,
and non-qualifying. `qualifying_profiles` remains derived from complete passing
catalogs and is not manually asserted.

### Pre-candidate gates

- keep superseded PR #29 closed;
- correct, review, disposition, and merge PR #30;
- merge the R20 release-gate and R21 ecosystem-separation decisions through the
  normal repository process;
- patch high and critical release-toolchain dependency findings and rerun
  dependent tests;
- establish required branch and release-tag controls;
- make release validation version-aware rather than v0.80-hard-coded; and
- ensure public documentation uses no private implementation as public
  independent-implementation evidence.

Only after these predecessor gates pass may `release/v0.81-rc1` be created from
the exact current `main`.

### Frozen-candidate gates

At one exact release-candidate commit:

- reconcile R17, R18, R19, R20, requirements, applicability, diagnostics,
  schemas, fixtures, and release text;
- preserve blocking Ubuntu and Windows lanes on Node 22 and Node 24;
- preserve the Standard-owned graph evaluator and adversarial false-PASS
  protections;
- preserve complete stable-gate mutation coverage for the candidate;
- execute dependency, secret, link, documentation, conformance, release,
  checksum, and tag-preflight checks;
- record exact source, implementation, policy, dependency, toolchain,
  environment, fixture, result, and artifact identities;
- disclose real implementation divergences without turning them into a false
  Standard qualification result;
- assemble the human and machine evidence package; and
- permit no unexplained mandatory FAIL, HOLD, BLOCKED, waiver, skip,
  unsupported capability without a capable PASS, or UNEVALUATED result.

Final publication requires a separate explicit owner approval bound to the
exact candidate and evidence. CI does not publish automatically.

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

- a v0.81 tag or release;
- a qualifying profile;
- production deployment or credentials;
- writer or consequential-effect activation;
- a Rust or implementation cutover;
- automatic adoption of an external protocol version;
- endorsement of a product or framework;
- disclosure of private repository identities as public evidence; or
- use of “GKOS certified” before a governed certification scheme exists.
