# R22 — Canonical informative architecture orientation

**Date:** 2026-09-03

**Revision preparation date:** 2026-09-04

**Status:** Accepted development decision; informative documentation authority

**Deciding authority:** Shaun “Oden” Marshall, Founder and Initial Editor

**Acceptance review head:** `ee39f75212d78293a92f7724f769bc610cd66aa9`

**Acceptance date:** 2026-09-04

**Standard boundary:** Informative only. R22 establishes one current top-level
orientation within the documentation hierarchy. It does not amend the master
standard, requirement registry, schemas, diagnostic registry, applicability
mapping, conformance profiles, protocol standing, implementation standing, or
runtime authority.

**Input baseline:**

- `gkos-standard` `main` at
  `33ac87893ad8581950772d685b6b48673019fe7b` (2026-09-03,
  `test: add RRET-01 adversarial retrieval corpus (#41)`);
- published GKOS-2026-09-03 v0.81 tag target
  `8f2a158c6d4b8cabd907d98765766d281aec1247`; and
- `GKOS-Engine` `main` at
  `8207958047b3361ae21ac07c5a2abbd26a42a684` (2026-08-31).

## 1. Decision

Following final exact-head review of
`ee39f75212d78293a92f7724f769bc610cd66aa9`, R22 adopts
`graphics/diagrams/gkos-canonical-architecture.svg`, with its PNG export and
content-equivalent Mermaid source, as the canonical **informative architecture
orientation** for v0.82 development.

“Canonical” in this record means the current top-level orientation in the
repository documentation hierarchy. It does not make the figure normative or
convert a development candidate, implementation example, or external binding
into a GKOS requirement.

R22 implements the public-documentation classification required by R20 G81-05:

1. Standard requires;
2. architecture recommends;
3. implementation example; and
4. not in the Standard.

R22 does not claim that R20 G81-04 required one canonical diagram. G81-04
controlled v0.81 release-candidate assembly and freeze. Profile qualification
remains separately governed by G81-09, and no profile is currently qualified.

## 2. Positions grounded in current accepted text

The figure may present the following as established current positions.

1. **GKOS, GKX, and implementations are distinct.** GKOS defines governance
   responsibilities. GKX 2.0 is the machine exchange contract. Implementations
   choose their internals and do not define or amend the Standard.
2. **Implementations are plural.** GKOS-Engine is the current reference
   implementation example, not the only realization path and not a profile
   qualification.
3. **The current machine namespace is GKX 2.0.** Current identifiers include
   `gkx_version`, `.gkx/`, `GKX-*`, and `gkx`. Historical namespace material is
   documented through R14 and preserved history; it does not appear in the
   current architecture figure.
4. **Layer responsibilities remain distinct.** L4 evaluates deterministic
   controls; L5 records authorized disposition; L6 captures selection and
   assembles a Context Manifest; L7 binds consequential use to exact context,
   authority, actor roles, effect scope, outcome, and recovery or refusal.
5. **Receipts are cross-layer governed records.** Every committed governed
   state change is durably bound to the applicable State-Change Receipt role.
   Decisions, control outcomes, authorized uses, and refusals retain their own
   applicable record roles. GKOS does not require one universal receipt store.
6. **Bindings remain informative and versioned.** MCP, A2A, and ACS are external
   works under R21. Authentication, callability, task assignment, or a control
   hook does not itself grant GKOS authority.
7. **Capability does not create authority.** Agents and services act only under
   the applicable governed actor contract, grant, controls, review, context,
   and effect boundary.
8. **Bounded L5 agent review is narrower than general autonomous authority.**
   Under R18, L5 review may be performed by a human or a separately authorized
   independent Review Agent only when all R18 conditions are satisfied;
   mandatory escalation routes to an authorized human.
9. **Founder deployment choices are implementation examples.** Their placement
   grants no Standard, profile, interoperability, certification, or authority
   standing.

## 3. Provisional v0.82 development pattern

The retrieval-to-context lane is explicitly **provisional, non-normative, and
non-qualifying**. It is derived from RRET-01 and applies only when an
implementation uses retrieval for the represented operation.

The figure may show this candidate sequence:

```text
relevance retrieval
  → exact candidate set
  → separate governance-eligibility evaluation
  → eligible-candidate sufficiency handling
  → captured selection and deterministic L6 context assembly
```

The candidate pattern preserves the following RRET-01 obligations:

- retrieval may rank an ineligible object first;
- governance state is not smuggled into relevance scoring;
- the exact raw candidate set remains inspectable;
- governance evaluates eligibility separately and does not rewrite raw rank;
- when no eligible candidate is available, the implementation expands,
  abstains, or escalates instead of substituting an ineligible object; and
- answer or action justification cites the underlying evidence object, not a
  retrieval representation.

Appearance in the diagram is not normative adoption. Promotion requires the
applicable documentation-intent check, proposal, fixture evidence, review, and
prospective decision.

## 4. Implementation and evidence labels

### 4.1 GKOS-Engine

At the inspected Engine coordinate:

- `package.json` reports version `2.1.2`;
- the package declares no runtime `dependencies` entry;
- `./graphiti` is an exported adapter surface;
- `gkos-mcp-stdio` is an implementation binary; and
- current development-head limitations and divergences remain distinct from the
  signed package release and from Standard conformance.

The figure may label Engine as an implementation example and mechanism source.
It must not imply current profile qualification or that an implementation MCP
surface is the Standard's architectural spine or an activated R21 binding.

### 4.2 Additional same-author implementation candidate

The figure uses generic language only:

> Additional implementation candidate (same-author) — public evidence pending.

Until public source, implementation lineage, dependency closure, fixture
results, operating control, limitations, and review evidence are available, the
box must not assert current interoperability, non-descendance, independence, or
public second-implementation standing. Interoperability is an evidence target.

### 4.3 Public independent-implementation slot

The open slot represents the R21 call for a publicly reviewable implementation
whose evidence supports independence of source and implementation lineage,
deterministic interpretation, dependencies, ownership and operational control,
fixture execution, and claim/assessment process.

“Different author” alone is not sufficient.

## 5. Documentation dispositions

1. **Canonical orientation.** The r3 SVG is the top-level informative
   architecture orientation; its PNG and Mermaid source must remain
   content-equivalent.
2. **Existing detail views.** `gkos-control-plane.*` and
   `gkos-layer-responsibilities.*` remain current detail views unless a specific
   conflict is documented. They are cross-referenced from the canonical
   orientation. A detail view is not competing guidance merely because it has a
   narrower scope.
3. **Historical revisions.** The repository preserves the available r1 editable
   source under `archive/graphics/gkos-canonical-architecture/`. Digests and
   provenance for the externally supplied r1/r2 renderings are recorded in the
   archive index when the binaries are not checked into this branch. Missing
   editable source is recorded rather than reconstructed.
4. **ROADMAP correction.** The roadmap states that v0.81 is published and
   immutable at its signed tag and release package. Phase-0 publication work is
   complete; current `main` is development.
5. **Decision Register.** The preparation head indexed R22 as **Proposed**.
   Owner acceptance is recorded prospectively by this status-only acceptance
   update and the corresponding Decision Register update; the reviewed figure,
   its captions, and its digests are unchanged.
6. **Technical orientation.** At the reviewed preparation head,
   `TECHNICAL_README.md` identified the r3 figure as the proposed top-level
   v0.82 architecture orientation and retained the existing figures as linked
   detail views. R22 acceptance changes documentation standing only; it does not
   alter the reviewed figure or its digests.
7. **Release immutability.** Nothing in the R22 PR rewrites the signed v0.81
   release package, tag, publication record, or Zenodo archive.
8. **Founder overlay.** Named founder products may appear only in a region
   labelled `implementation examples — not part of the Standard`. Detailed
   capability claims belong in exact-version deployment documentation unless
   independently verified for the figure.

## 6. Content and rendering controls

- The SVG is the reference rendering.
- The Mermaid source must contain the same substantive labels, relationships,
  standings, limitations, and legend as the SVG.
- The PNG must be rendered from the same controlled Mermaid source without
  content changes.
- `graphics/diagrams/gkos-canonical-architecture.labels.txt` is the checked
  label register. Every non-comment entry is verified against normalized text
  from both the Mermaid and SVG.
- The current figure must contain no historical machine-namespace identifiers;
  historical readers are directed to R14 and archived material instead.
- The SVG must contain a title and description, no scripts, no `foreignObject`,
  no remote fonts/images/stylesheets or other external resources, and no stale
  provenance manifest inherited from an edited source.
- Render-tool versions and commands are recorded in
  `graphics/diagrams/README.md`.
- Any substantive change advances the revision and requires review of the
  affected claims.

## 7. Acceptance gate and disposition

The exact reviewed head
`ee39f75212d78293a92f7724f769bc610cd66aa9` demonstrated the acceptance gate:

1. the r3 `.mmd`, `.svg`, `.png`, and checked label register are present and
   content-equivalent;
2. every blocking finding in the R22 advancement assessment is corrected;
3. the figure contains no adoption-status text; standing is carried only in
   repository documentation and the Decision Register;
4. `ROADMAP.md`, `TECHNICAL_README.md`,
   `graphics/diagrams/README.md`, and the Proposed Decision Register entry are
   coherent for the preparation head;
5. the existing detail diagrams are classified and cross-referenced rather than
   retired without a specific conflict;
6. Markdown, link, SVG safety/accessibility, namespace, claim-discipline,
   current-release, and preserved-release checksum checks passed at the exact
   head;
7. the renderer is the repository-recorded `@mermaid-js/mermaid-cli` `11.17.0`
   and the exact render commands are recorded;
8. the PNG was visually reviewed for clipping, overlap, unreadable labels, and
   ambiguous relationships; and
9. the exact-head evidence confirmed the v0.81 tag, GitHub Release, release
   package, and Zenodo publication were not modified.

The owner accepted R22 r3 on 2026-09-04 at that exact reviewed head. This
status-only acceptance update records the disposition and does not alter the
reviewed diagram, captions, or digests. Any substantive post-review change
creates a new review identity.

## 8. Authority boundary

R22 is informative. Where the figure and the master standard, permanent
requirement registry, or an accepted development decision differ, the
controlling text wins.

R22 does not:

- amend a normative requirement;
- qualify a profile;
- establish implementation conformance or interoperability;
- activate MCP, A2A, ACS, or another binding;
- release an Engine, Lite, SDK, adapter, or product;
- authorize deployment, credentials, governed writes, or consequential effects;
- establish certification, accreditation, endorsement, or regulator approval;
  or
- transfer owner, reviewer, authorizer, publication, or standards authority.

## 9. Supersession

R22 supersedes no accepted decision. It supersedes only prior architecture
orientation revisions as **current informative orientation**; their historical
evidence remains preserved. A later accepted decision may replace R22
prospectively.
