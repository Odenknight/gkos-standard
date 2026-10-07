# Graphics register

**Status:** informative inventory, prepared 2026-10-07 for the v0.83
development line. Status values are proposed assessments.
**Current edition:** GKOS-2026-09-24 v0.82.1 (documentation patch; technical
baseline v0.82; normative population unchanged from v0.81).

This register lists every image and diagram in the repository. It records the
source of each graphic, where it is used, the edition label it shows, and its
status. It also lists explanations that need a new graphic (`GN-NNN`).

Graphics are informative. The master standard, permanent requirements and
accepted development decisions control where a graphic differs.

## Status values

| Status | Meaning |
| --- | --- |
| `current` | Labels and content fit the current edition. Use as is. |
| `historical` | Belongs to an earlier edition. Keep its original labels. Do not present it as current. |
| `stale-needs-render` | Source is updated; the raster still shows old content and needs a render. |
| `needs-redesign` | Content, labels or layout need a new revision, a new source or a governed review. |

The **Reuse** column says whether a graphic is fit for new current-facing use,
such as the beginner's guide.

## Inventory

### Current diagrams — `graphics/diagrams/`

| ID | Graphic | Files and source | Used in | Edition label shown | Style family | Status | Reuse |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GR-01 | Canonical architecture orientation, r3 | `gkos-canonical-architecture.svg` (reference rendering), `.png`, `.mmd` (Mermaid source), `.labels.txt` (label register) | `TECHNICAL_README.md`; R22 record; `archive/graphics/gkos-canonical-architecture/README.md` | "r3 · v0.82 development candidate"; "v0.81 published 2026-09-03" | S4 | `needs-redesign` | Yes, with caveat |
| GR-02 | GKOS within an existing stack | `gkos-control-plane.svg`, `.png`, `.mmd` | `README.md`; `TECHNICAL_README.md` | None | S3 | `current` | Yes |
| GR-03 | Seven cumulative responsibilities | `gkos-layer-responsibilities.svg`, `.png`, `.mmd` | `TECHNICAL_README.md` | None | S3 | `current` | Yes |
| GR-04 | A refund decision you can audit | `gkos-accountable-refund.svg` (editable source), `.png` | `README.md` | None | S5 | `current` | Yes |
| GR-05 | Choose an adoption starting point | `gkos-adoption-paths.svg` (editable source), `.png` | `README.md` | "GKOS v0.82.1 currently qualifies no implementation profile" (updated 2026-10-07 from "v0.81") | S5 | `current` | Yes |
| GR-06 | CIA triad overview | `gkos-cia-overview.svg`, `.png`, `gkos-cia-overview.build.py` | `README.md`; `docs/GKOS_CIA_TRIAD_ALIGNMENT.md` | "Informative mapping · GKOS v0.81" | S5 | `current` (pinned basis) | Yes |
| GR-07 | CIA triad detailed alignment | `gkos-cia-triad-alignment.svg`, `.png`, `gkos-cia-triad-alignment.build.py` | `docs/GKOS_CIA_TRIAD_ALIGNMENT.md` | "The CIA Triad and GKOS v0.81"; footer pins the v0.81 tag and commit | S5 | `current` (pinned basis) | Yes |
| GR-08 | From evidence to authorized action | `gkos-evidence-to-authorized-action.jpg` (owner-supplied raster; no source) | `README.md`; `docs/implementation/GKOS_END_TO_END_WORKFLOW.md` | "Illustrative GKOS v0.81 workflow" | S6 | `needs-redesign` | Yes, with caveat |
| GR-09 | Where governance middleware belongs | `middleware-placement.svg` (editable source), `.png` | `docs/implementation/GKOS_END_TO_END_WORKFLOW.md` | None | S5 | `current` | Yes |
| GR-10 | One evidence chain, separate reviews | `evidence-review-views.svg` (editable source), `.png` | `docs/implementation/GKOS_END_TO_END_WORKFLOW.md` | None | S5 | `current` | Yes |

### Illustrated figures — `illustrated/figures/`

All six are raster only. Matplotlib 3.10.8 wrote them for the v0.76
Illustrated Edition. Their build scripts are not in the repository.

| ID | Graphic | Files and source | Used in | Edition label shown | Style family | Status | Reuse |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GR-11 | The GKOS seven-layer model | `fig1-seven-layers.png` (raster only) | `README.md`; `TECHNICAL_README.md`; archived v0.76 Illustrated Edition | None | S1 | `current` | Yes |
| GR-12 | The OSI analogy | `fig2-osi-analogy.png` (raster only) | Archived v0.76 Illustrated Edition; `archive/graphics/README.md` | None; footer names OKF+ and the "GKOS Engine" | S1 | `historical` | No |
| GR-13 | Twelve-state epistemic vocabulary | `fig3-epistemic-states.png` (raster only) | Archived v0.76 Illustrated Edition | "frozen in v0.76 §5.1" | S1 | `historical` | No |
| GR-14 | Simplified knowledge flow | `fig4-knowledge-flow.png` (raster only) | `README.md`; archived v0.76 Illustrated Edition | None | S1 | `current` | Yes |
| GR-15 | Conformance profile ladder | `fig5-gcp-ladder.png` (raster only) | Archived v0.76 Illustrated Edition | None (v0.76 profile set) | S1 | `historical` | No |
| GR-16 | Authority precedence | `fig6-authority-precedence.png` (raster only) | Archived v0.76 Illustrated Edition | None (v0.76 precedence list) | S1 | `historical` | No |

### Legacy orientation graphics — `graphics/`

`archive/graphics/README.md` describes these files. They stay at this path
because published release checksums list them here.

| ID | Graphic | Files and source | Used in | Edition label shown | Style family | Status | Reuse |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GR-17 | Provisional logo | `GKOS_Logo_Provisional.svg` (SVG text) | `TRADEMARKS.md`; `archive/graphics/README.md` | None; text "GOVERNED KNOWLEDGE OPERATIONS STANDARD" | S8 | `current` | Yes, with caveat |
| GR-18 | OSI and GKOS comparison, v0.75 | `GKOS_OSI_Comparison.svg` (SVG text) | `archive/graphics/README.md` | None (v0.75 era) | S8 | `historical` | No |
| GR-19 | OSI analogy, 3D boxes | `GKOS_OSI_Comparison_3D_Corrected.png` (Matplotlib raster only) | `archive/graphics/README.md` | "GKOS-2026-07-20 v0.76" | S2 | `historical` | No |
| GR-20 | One-page poster | `GKOS_Poster_Corrected.png` (Matplotlib raster only) | `archive/graphics/README.md` | "Public Pre-Standard"; "Version 0.76"; "Current Release: GKOS-2026-07-20 v0.76" | S2 | `historical` | No |
| GR-21 | Implementation dashboard | `GKOS_Implementation_Dashboard_Corrected.png` (Matplotlib raster only) | `archive/graphics/README.md` | "GKOS-2026-07-20 v0.76"; "Kosmos-Oden v0.6.5 · GKOS Engine v1.0.5" | S2 | `historical` | No |

### Social preview — `graphics/social/`

| ID | Graphic | Files and source | Used in | Edition label shown | Style family | Status | Reuse |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GR-22 | Repository social card | `gkos-social-card.png` (raster; source `gkos_social_card.svg` is not in the repository) | `graphics/social/README.md`; candidate GitHub social preview | "Public pre-standard · v0.79" | S7 | `needs-redesign` | No |

### Archived sources and diagrams

| ID | Graphic | Files and source | Used in | Edition label shown | Style family | Status | Reuse |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GR-23 | Canonical architecture r1 | `archive/graphics/gkos-canonical-architecture/2026-09-03-r1/GKOS-Canonical-Architecture-v0.82-r1.mmd` (Mermaid source) | `archive/graphics/gkos-canonical-architecture/README.md` | "v0.82-r1" | S4 | `historical` | No |
| GR-24 | Standard, implementation and product feedback | Mermaid block, `archive/TECHNICAL_README_pre_gkx2.md` line 43 | Same file | None (pre-GKX 2.0) | Mermaid default | `historical` | No |
| GR-25 | GKOS below orchestration | Mermaid block, `archive/TECHNICAL_README_pre_gkx2.md` line 244 | Same file | None (pre-GKX 2.0) | Mermaid default | `historical` | No |

No other image is referenced from Markdown. No current Markdown file outside
`archive/` contains a Mermaid block.

## Style families

| Family | Members | Fonts | Palette and form |
| --- | --- | --- | --- |
| S1 | GR-11 to GR-16 | DejaVu Sans (Matplotlib default) | White ground; rounded bars; layer colors L1 purple, L2 indigo, L3 steel blue, L4 teal, L5 gold, L6 green, L7 blue; navy titles |
| S2 | GR-19 to GR-21 | DejaVu Sans | GR-20 and GR-21 use a dark navy ground and a different layer order (L1 red to L7 purple). GR-19 uses a light ground and the S1 order. |
| S3 | GR-02, GR-03 | Arial, Helvetica, sans-serif | `mermaid-config.json`: navy `#102044`, blue `#235FA5`, pale blue fills; GR-03 uses the S1 layer colors (`#794DA5` to `#235FA5`) |
| S4 | GR-01, GR-23 | Arial through Mermaid | Own class colors fixed by R22: navy standard, teal seam, orange gate, brown records, purple humans, green actors, dashed grey bindings |
| S5 | GR-04 to GR-07, GR-09, GR-10 | Arial, Helvetica, sans-serif | White ground; light cards with colored accent bars; blue `#235FA5`, green `#36803B`, purple `#794DA5` |
| S6 | GR-08 | Raster lettering | Dark circuit-board ground with neon blue, yellow, red and green boxes |
| S7 | GR-22 | Raster lettering (Segoe-like) | Dark purple ground; lavender text; orbit motif |
| S8 | GR-17, GR-18 | Arial | Flat vector; navy and blue |

S1, S3 and S5 share one layer palette and one sans-serif family. That set is the
house style for new figures. S2, S6 and S7 are outliers. GR-08 stays as supplied
until the owner replaces it.

## Findings and dispositions

1. **GR-05 updated.** The note and the accessible description said "v0.81
   currently qualifies no implementation profile". They now say "GKOS v0.82.1".
   The PNG was rendered again from the SVG. See "Render log".
2. **GR-01 needs an r4 review.** The figure says "v0.82 development candidate"
   and "v0.81 published 2026-09-03". v0.82 and v0.82.1 are now published. R22
   §6 says any substantive change advances the revision and needs review. The
   r3 files must first be preserved under
   `archive/graphics/gkos-canonical-architecture/`. Both steps are outside
   packet D. Proposed r4 label text: title "GKOS Canonical Architecture —
   informative · r4"; standard node "normative source · v0.82.1 published
   2026-09-24 · owner-authorized · non-consensus · no qualifying profile".
   Re-render all four files together with `@mermaid-js/mermaid-cli` 11.17.0.
   The `TECHNICAL_README.md` caption that reads "v0.82 development candidate"
   matches the r3 figure and must change in the same r4 change.
3. **GR-06 and GR-07 stay as they are.** Their "v0.81" labels pin the
   requirement basis on purpose. `README.md` states that this alignment is
   unchanged by v0.82 and v0.82.1. The labels are not stale edition claims.
4. **GR-08 needs a new owner-supplied revision.** The label reads "Illustrative
   GKOS v0.81 workflow". The workflow still matches v0.82.1, because the
   normative population is unchanged. The file has no source and was preserved
   unchanged at the owner's request. Only the owner can replace it. Also align
   it with S5.
5. **GR-22 is not fit as the current social preview.** It shows "Public
   pre-standard · v0.79", and the current wording is "developmental
   specification". Its SVG source was never committed. Proposed redraw: commit
   an editable SVG that says "Developmental specification (public working
   draft)" with no edition number, and export a PNG with sharp.
6. **Illustrated figure defects.** These defects are in the rasters. No source
   exists, so nothing was edited.
   - GR-11: the L1 description runs past the right edge of its card.
   - GR-14: the labels "original bytes intact" and "stable UID + schema" run
     past their cards.
   - GR-12: the footer overlaps the L1 boxes. It also describes OKF+, the
     pre-GKX 2.0 name.
   - GR-13: the arrows suggest one linear path through all twelve states, and
     the long return arrow crosses the caption.
   - GR-15: the GCP-7 card is clipped on the right, and the Viewer box covers
     GCP-2 to GCP-4. The figure also predates the R16 Core and Advanced tiers.
   - GR-16: the caption overlaps level 9. The precedence order comes from
     the accepted R2 decisions (R2-009 to R2-016 in the Decision Register).
     Check the figure against them before any reuse.
   Redraw them as editable SVG in the S5 style before the beginner's guide
   reuses them. GR-11 and GR-14 can be reused now.
7. **Broken archived image links.** `archive/illustrated/GKOS-v0.76-Illustrated-Edition.md`
   links `figures/fig*.png`, which resolves to `archive/illustrated/figures/`.
   That folder does not exist; the figures are in `illustrated/figures/`. The
   archive is immutable. The link checker excludes `archive/`. This is
   recorded here and not fixed.
8. **Name on legacy artwork.** GR-17 and GR-20 to GR-22 say "Governed
   Knowledge Operations Standard". Published editions keep that title, and
   `README.md` now uses "Specification". The provisional logo is a trademark
   matter for the owner. It is not changed here.

## Render log

These commands were run on 2026-10-07 on Windows 11 with Node.js 24.18.0, from
a scratch tooling folder outside the repository.

```sh
npm install --no-save sharp@0.35.4
```

```js
// render.mjs
import sharp from 'sharp';
const [src, out, width] = process.argv.slice(2);
await sharp(src).resize({ width: Number(width) }).png().toFile(out);
```

1. **Toolchain check.** The unchanged SVGs of GR-04 and GR-05 were rendered at
   width 2560, and GR-09 and GR-10 at width 2400. Each output was
   byte-identical to the committed PNG. This confirms the recorded sharp
   toolchain.
2. **GR-05 render.** After the label update:

   ```sh
   node render.mjs graphics/diagrams/gkos-adoption-paths.svg \
     graphics/diagrams/gkos-adoption-paths.png 2560
   ```

   Output: 2560 × 1652 PNG. Checked visually for clipping and overlap.

Renderers not available locally:

- `@mermaid-js/mermaid-cli` 11.17.0 is not installed. `npx` would also fetch
  Puppeteer and its Chromium build. No `.mmd` source changed, so no Mermaid
  render was needed.
- CairoSVG is not installed for Python 3.14, and no Cairo library is present.
  GR-06 and GR-07 were not rebuilt. Their build scripts did not change.
- No Matplotlib build scripts exist for S1 or S2.

## Graphics needed

Each item names an explanation that is prose only and would be clearer with a
figure. An earmark is an HTML comment whose text starts with `GRAPHIC-NEEDED:`,
followed by the GN number and a one-line description. It sits at the line
where the figure would go.

Packet D inserted the earmarks in `illustrated/README.md`. The integrator
inserted the others on 2026-10-07, in the files that packets B, C1 and C2
edit. Files under `standard/annexes/` are frozen; their earmarks wait for the
v0.83 line under R25. Anchors name a heading. Line numbers, where given, are
at the proposing packet's candidate commit: B `fc91dd5`, C1 `452892e`,
C2 `e72ef98`.

Some items can be met by reusing an existing figure. The Notes column says so.

| ID | Figure needed | Insert at (file — anchor) | File owner | Proposed by | Inserted | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| GN-001 | Specification maturity path: single-author pre-standard concept (history), developmental specification (public working draft, current), pre-standard through an open multi-stakeholder committee (goal), v1.0 gates | `README.md` — "## Current standing", after the D2 paragraph (C1 line 45); `guide/08-getting-involved.md` — end of "## The committee goal"; `illustrated/README.md` — "## Planned figures" | C1; B; D | D, B, C1 | Yes | One figure serves all three places |
| GN-002 | Edition and publication flow: development on `main`, release candidate, signed tag, release package and checksums, GitHub Release, Zenodo DOI, publication record; coordinates v0.81, v0.82, v0.82.1 and the v0.83 line | `README.md` — after the first paragraph of "## Published release and current development"; `illustrated/README.md` — "## Planned figures" | C1; D | D | Yes | |
| GN-003 | Amendment and decision lifecycle: the seven-step v0.x amendment path, Development Decision Record states (proposed, accepted, superseded) and the Decision Register | `GOVERNANCE.md` — after the numbered list under "## v0.x amendment path" | C1 | D | Yes | |
| GN-004 | Normative surface map: master standard, permanent requirement registry, profile applicability, normative annexes, and the R15 and R16 records that govern them | `standard/00_GKOS_Master_Standard.md` — after the first paragraph of "## Normative surface" (C1 line 33) | C1 | D, C1 | Yes | |
| GN-005 | Governed state change and receipt binding: commit with a State-Change Receipt, or fail closed, roll back or compensate before reporting success | `docs/implementation/GKOS_INFRASTRUCTURE_PRACTITIONER_BLUEPRINT.md` — end of "### 3.2 Every committed governed state change is receipted"; `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md` — end of "## 1. Universal state-change receipting" | C2; E (frozen) | D | Yes; annex anchor pending R25 (frozen) | |
| GN-006 | Re-entry and explicit supersession: predecessor marked superseded and kept, successor enters as a new L1 source with no inherited standing, supersession declared by an authorized human or bounded delegation, never inferred, nothing rewritten | `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md` — end of "## 5. Explicit semantic supersession"; `guide/03-core-ideas.md` — end of the two-rules list in "## Supersession"; `illustrated/README.md` — "## Planned figures" | E (frozen); B; D | D, B | Yes; annex anchor pending R25 (frozen) | |
| GN-007 | Bounded supersession delegation path: grant no broader than its origin; deterministic routine, major or indeterminate result; a non-deterministic checker may only tighten; overdue review stops further changes | `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md` — end of "## 6. Bounded supersession delegation" | E (frozen) | D | Pending R25 (frozen) | |
| GN-008 | Retention and disposition: consult the hold predicate; an indeterminate result or a hold/erasure conflict fails closed and goes to human disposition; the receipt binds the predicate version | `standard/annexes/Governed_State_Change_Reentry_and_Bounded_Delegation.md` — end of "## 3. Retention and disposition"; `docs/ecosystem/MULTI_JURISDICTION_DEPLOYMENT_GUIDANCE_DRAFT.md` — "## 10. Hold and erasure conflict" | E (frozen); C2 | D | Yes; annex anchor pending R25 (frozen) | |
| GN-009 | Layer-6 phase split: captured Selection Envelope, deterministic assembly, identical inputs giving identical Context Manifest bytes and hash, hash check at action time | `TECHNICAL_README.md` — end of "## Governed retrieval and context"; `standard/annexes/Canonical_Serialization.md` — "## 10. Layer-6 phase split" | C1; E (frozen) | D | Yes; annex anchor pending R25 (frozen) | |
| GN-010 | Canonical serialization and artifact hash: governed artifact, GKX-CBOR-1 encoding rules, canonical payload with type, schema, profile and digest-bound references, SHA-256, and the verifier round trip from the human-auditable rendering | `TECHNICAL_README.md` — end of "## Canonical serialization"; `standard/annexes/Canonical_Serialization.md` — "## 8. Artifact hash construction" | C1; E (frozen) | D | Yes; annex anchor pending R25 (frozen) | |
| GN-011 | Conformance evaluation and claim flow: registry, profile applicability, fixtures, runner result states (including `UNEVALUATED`), and a claim that names release, GKX version, profile, suite, evidence, limitations and attestation type; unevaluated never becomes pass | `TECHNICAL_README.md` — after the claim list in "## Profiles and conformance"; `standard/annexes/Conformance_Profiles.md` — "## Claim evidence" | C1; E (frozen) | D | Yes; annex anchor pending R25 (frozen) | |
| GN-012 | Three logical planes: work and data plane, GKOS governance plane, trust and enforcement plane, and what passes between them | `docs/implementation/GKOS_INFRASTRUCTURE_PRACTITIONER_BLUEPRINT.md` — after the table in "## 5. Three logical planes"; `docs/implementation/GKOS_REFERENCE_INFRASTRUCTURE.md` — end of "## 3. Three-plane architecture" | C2 | D | Yes | |
| GN-013 | Bounded Review Agent under R18: different model family, sealed evidence, deterministic gates, no self-review, and mandatory escalation to an authorized human | `docs/implementation/GKOS_INFRASTRUCTURE_PRACTITIONER_BLUEPRINT.md` — "### L5 — Review and Workflow" | C2 | D | Yes | |
| GN-014 | Identity versus authorization: six distinct facts from claimed identity to executed action, each with its GKOS layer | `docs/ecosystem/AGENT_GOVERNANCE_INTEROPERABILITY_DRAFT.md` — after the table in "## 6. Identity and authorization separation" | C2 | D | Yes | |
| GN-015 | Agent lifecycle: definition, provisioning, qualification, activation, operation, change, suspension or revocation, retirement, with the evidence each stage keeps | `docs/ecosystem/AGENT_GOVERNANCE_INTEROPERABILITY_DRAFT.md` — after the list in "## 4. Agent lifecycle model" | C2 | D | Yes | |
| GN-016 | Multi-agent chain: initiating principal, delegation and subdelegation, per-agent attribution, context passed and omitted, final effect and recovery | `docs/ecosystem/AGENT_GOVERNANCE_INTEROPERABILITY_DRAFT.md` — after the list in "## 8. Multi-agent chains" | C2 | D | Yes | |
| GN-017 | Multi-jurisdiction evaluation sequence: the ten steps from exact operation to receipt, with the conflict and human-disposition branches | `docs/ecosystem/MULTI_JURISDICTION_DEPLOYMENT_GUIDANCE_DRAFT.md` — after the list in "## 9. Deterministic evaluation sequence" | C2 | D | Yes | |
| GN-018 | Conformance evidence package: manifest as semantic root, inventory, semantic roles, evidence locators and digests, claim binding, protected references, and the verification procedure | `docs/ecosystem/GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md` — "## 5. Candidate directory layout" (C2 line 96) and "## 15. Verification procedure" | C2 | D, C2 | Yes | One figure, two anchors |
| GN-019 | Pilot sequence P1 to P8 with graduation criteria and stop conditions | `docs/ecosystem/PILOT_PROGRAM_DRAFT.md` — "## 3. Pilot sequence" | C2 | D | Yes | |
| GN-020 | Version train: GKOS-Engine as the single GKX 2.0 version anchor and the dependent repositories that track it | `VERSIONING.md` — end of "## The model: one train, four cars" | C1 | D | Yes | |
| GN-021 | Three separate linked records about one refund: evidence, assertion and Decision Record | `guide/03-core-ideas.md` — end of the "## Records" table, before "A **receipt** is a role" | B | B | Yes | |
| GN-022 | A label versus a decision: `authorship_origin: approved` beside an actual Decision Record | `guide/03-core-ideas.md` — "Authorship origin", after the "**Controlled by:**" line | B | B | Yes | |
| GN-023 | Sensitivity labels: the seven labels, the fail-closed path for a missing label, and one-way elevation | `guide/03-core-ideas.md` — end of the four-rules list in "## Sensitivity" | B | B | Yes | |
| GN-024 | Delegation narrowing: a grant and a delegated grant drawn as nested scopes with expiry | `guide/03-core-ideas.md` — end of the bullet list in "## A note on authority" | B | B | Yes | Same idea appears in agent capability leases (`AGENT_GOVERNANCE_INTEROPERABILITY_DRAFT.md` §7) |
| GN-025 | Refusal path for the refund example: L7 check, gate code `GKOS-GATE-L7-002`, Refusal Receipt fields, re-entry | `guide/05-a-first-walkthrough.md` — end of "## Variation B: the action is refused" | B | B | Yes | Can extend the refusal branch of GR-04 |
| GN-026 | What GKOS records versus what still needs outside evidence or authority, in two columns | `guide/06-what-gkos-is-not.md` — end of "## What GKOS cannot establish by itself" | B | B | Yes | |
| GN-027 | Repository standing map: normative, decision, informative, proposed, dated records, historical, immutable | `guide/07-how-it-is-organized.md` — end of the "## Folder tour" table; `docs/CORPUS-STATUS.md` — "## Documentation areas" (C2 line 21) | B; C2 | B, C2 | Yes | One figure for both; coordinate with packet A's ICM map |
| GN-028 | Three horizons on one timeline: published baselines v0.81 to v0.82.1, R21 ecosystem stages E0 to E5, v1.0 readiness gates | `ROADMAP.md` — end of the three-horizon list (C1 line 26) | C1 | C1 | Yes | |
| GN-029 | Profile tiers: GCP-1 to GCP-5 Core, GCP-6 Context-Only Extension, GCP-1 to GCP-7 Advanced, independent Viewer/Projection | `TECHNICAL_README.md` — after the tier table in "## Profiles and conformance" (C1 line 291) | C1 | C1 | Yes | Can be met by reusing GR-05 |
| GN-030 | OSI analogy and its limits in current terms: reference model, GKX and bindings, implementation, conformance evidence; not a network stack or maturity ladder | `docs/EVOLUTION-AND-OSI.md` — "## OSI analogy and limits", after the table (C2 line 17) | C2 | C2 | Yes | Replaces GR-12 and GR-18 for current use; the old tier ladder must not return |
| GN-031 | Seven layers as a chain of custody, each with its main record, from Source Record to Authorized Use Record or Refusal Receipt | `docs/GKOS_LEGAL_AND_PROFESSIONAL_ORIENTATION.md` — "## The seven layers in plain language", before the table (C2 line 32) | C2 | C2 | Yes | Can be met by reusing GR-11 or GR-03 |
| GN-032 | Separate assurance routes: consensus specification, accreditation, product, personnel and management-system certification, legal opinion and regulatory authorization, each distinct from signed publication | `docs/STANDARDS-ENGAGEMENT.md` — "## Separate objectives", after the table (C2 line 15) | C2 | C2 | Yes | |
| GN-033 | Independent coordinate axes: GKOS publication, GKX namespace, canonical profile, projection profile, Engine package and development head | `docs/implementation/VERSION_COMPATIBILITY_MATRIX.md` — after the coordinate table (C2 line 14) | C2 | C2 | Yes | |
| GN-034 | Four statement classes: Standard requires, Architecture recommends, Implementation example, Not in the Standard | `docs/implementation/GKOS_INFRASTRUCTURE_PRACTITIONER_BLUEPRINT.md` — "## 1. Read every statement by its class" (C2 line 24) | C2 | C2 | Yes | The same classes open `GKOS_REFERENCE_INFRASTRUCTURE.md` §1 and the evidence-package draft §2; one figure serves all three |
| GN-035 | Domain pilot evidence loop: select registry IDs, freeze coordinates, declare positive, negative, boundary and replay cases, run, publish failures and limits | `docs/domains/README.md` — after the closing paragraph of the domain table (C2 line 15) | C2 | C2 | Yes | |
| GN-036 | Protocol bindings: where MCP, A2A and ACS can carry GKOS evidence, and where an adapter must add controls or records | `docs/ecosystem/README.md` — "## Protocol bindings" (C2 line 44) | C2 | C2 | Yes | GR-01 shows the bindings only at a high level |
| GN-037 | Layer-3 candidate semantics: relation direction and inverses, duplicate and cycle handling, resolver precedence | `docs/v082/V82-01_L3_INTEROPERABILITY_WORK_PACKET.md` — "## 4. Candidate semantics" (C2 line 65) | C2 | C2 | Yes | Label it prospective R23 material, not current-edition content |

Redraws of existing figures (GR-01, GR-08, GR-12, GR-13, GR-15, GR-16, GR-22)
are tracked in "Findings and dispositions". They do not take GN numbers.

## Maintenance

Add a row when a graphic is added, moved or archived. Change a status only with
a dated note in "Findings and dispositions". Record every render command in
"Render log". The next free number is GN-038.
