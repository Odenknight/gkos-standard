# Rendered GKOS diagrams

These informative graphics explain GKOS architecture, an accountable decision,
and adoption choices. The r3 canonical-architecture file set is a v0.82
development candidate under Proposed R22; the existing control-plane and layer
responsibility diagrams remain narrower detail views. Styling follows the blue
and multicolor palette of the existing illustrated figures.

| Diagram | Vector graphic | Downloadable image | Editable source |
| --- | --- | --- | --- |
| Canonical architecture orientation — r3 v0.82 candidate | [SVG](gkos-canonical-architecture.svg) | [PNG](gkos-canonical-architecture.png) | [Mermaid](gkos-canonical-architecture.mmd) · [labels](gkos-canonical-architecture.labels.txt) |
| GKOS within an existing stack | [SVG](gkos-control-plane.svg) | [PNG](gkos-control-plane.png) | [Mermaid](gkos-control-plane.mmd) |
| Seven cumulative responsibilities | [SVG](gkos-layer-responsibilities.svg) | [PNG](gkos-layer-responsibilities.png) | [Mermaid](gkos-layer-responsibilities.mmd) |
| A refund decision you can audit | [SVG](gkos-accountable-refund.svg) | [PNG](gkos-accountable-refund.png) | [Editable SVG](gkos-accountable-refund.svg) |
| Choose an adoption starting point | [SVG](gkos-adoption-paths.svg) | [PNG](gkos-adoption-paths.png) | [Editable SVG](gkos-adoption-paths.svg) |

### Canonical architecture orientation — r3 v0.82 development candidate

- **Files:** `gkos-canonical-architecture.svg` (reference rendering), `.png` (2× export), `.mmd` (Mermaid source), and `.labels.txt` (checked parity register).
- **Standing:** informative v0.82 development candidate under Proposed R22; no normative, conformance, binding, implementation, or runtime authority.
- **Baseline:** `gkos-standard` `main` `33ac87893ad8581950772d685b6b48673019fe7b`; published v0.81 tag target `8f2a158c6d4b8cabd907d98765766d281aec1247`; inspected `GKOS-Engine` development head `8207958047b3361ae21ac07c5a2abbd26a42a684`.
- **Reads top to bottom:** Standard → GKX interoperability seam → plural implementation examples/evidence targets → conditional retrieval-to-context candidate → governed action boundary → versioned external bindings and governed actor classes.
- **Layer boundary:** L4 controls, applicable L5 disposition, L6 context, and L7 authority/effect admission remain distinct.
- **Receipt boundary:** receipt roles are cross-layer. The diagram does not mandate one receipt ledger or one storage engine.
- **Authority boundary:** a human or agent actor gains no authority from class, callability, authentication, retrieval rank, or product placement. R18's bounded independent Review Agent is narrower than general autonomous authority and retains mandatory human escalation conditions.
- **Implementation evidence:** the same-author implementation slot is a candidate with public evidence pending; the public independent slot is an evidence target. Neither is a current interoperability or profile claim.
- **Founder overlay:** named products are implementation examples only and are not mandatory architecture, endorsed dependencies, or conformance evidence.
- **Detail views retained:** `gkos-control-plane.*` and `gkos-layer-responsibilities.*` remain narrower detail diagrams unless a specific conflict is recorded.
- **Legend:** solid arrows = represented control/data path; dashed arrows = governed records, receipts, or informative binding; dashed grey boxes = informative external bindings; dashed blue box = open public implementation slot; shaded region = founder implementation examples.
- **Change control:** substantive changes advance the revision. Historical revisions are preserved under `archive/graphics/gkos-canonical-architecture/`. The `.mmd`, `.svg`, `.png`, and label register must remain content-equivalent. Authoritative text and permanent requirements control if the figure differs.

The public README also restores the existing
[knowledge-flow](../../illustrated/figures/fig4-knowledge-flow.png) and
[seven-layer](../../illustrated/figures/fig1-seven-layers.png) graphics.

## Rebuild

All SVG files use text labels and embedded accessibility descriptions. PNG
exports use twice the layout resolution for reuse in documents and presentations.
No renderer is required to display the checked-in graphics.

### Mermaid architecture diagrams

Rendered with `@mermaid-js/mermaid-cli` version `11.17.0`.

From the repository root, with the pinned Mermaid CLI installed in a separate
tooling environment, render each `.mmd` using:

```sh
mmdc -i graphics/diagrams/gkos-canonical-architecture.mmd \
  -o graphics/diagrams/gkos-canonical-architecture.svg \
  -c graphics/diagrams/mermaid-config.json -b white -w 1800
mmdc -i graphics/diagrams/gkos-canonical-architecture.mmd \
  -o graphics/diagrams/gkos-canonical-architecture.png \
  -c graphics/diagrams/mermaid-config.json -b white -w 1800 -s 2
mmdc -i graphics/diagrams/gkos-control-plane.mmd \
  -o graphics/diagrams/gkos-control-plane.svg \
  -c graphics/diagrams/mermaid-config.json -b white -w 1400
mmdc -i graphics/diagrams/gkos-control-plane.mmd \
  -o graphics/diagrams/gkos-control-plane.png \
  -c graphics/diagrams/mermaid-config.json -b white -w 1400 -s 2
```

Repeat the detail-view commands with `gkos-layer-responsibilities` as the input/output stem. An existing
Chrome installation may be selected through the CLI's `--puppeteerConfigFile`
option. The renderer is documentation tooling, outside the conformance runner's
dependency graph.

### SVG explainers

The refund and adoption graphics are authored directly as editable SVG. Their
PNG exports use `sharp` version `0.35.4`, installed in a separate tooling
environment. From the repository root, the equivalent export is:

```js
import sharp from 'sharp';

for (const stem of ['gkos-accountable-refund', 'gkos-adoption-paths']) {
  await sharp(`graphics/diagrams/${stem}.svg`)
    .resize({ width: 2560 })
    .png()
    .toFile(`graphics/diagrams/${stem}.png`);
}
```

## Scope and provenance

The control-plane source comes from the README and technical orientation at
GKOS v0.80 and remains in the v0.81 technical orientation. The layer-grouping
source comes from the technical orientation at v0.81. Both sources are kept
alongside the rendered outputs for review and future editing.

The refund illustration follows the [README example](../../README.md#a-simple-example)
and the [authority and receipt requirements](../../standard/annexes/Authority_and_Refusal_Receipt_Fields.md).
The adoption graphic summarizes the [conformance profiles](../../standard/annexes/Conformance_Profiles.md),
including the independent Viewer/Projection Profile and the limits of the
Context-Only Extension. These explainers do not replace the exact requirements.

These are post-publication documentation graphics. The live v0.81 edition,
its signed tag, frozen release package, and Zenodo archive are not altered. The
r3 canonical architecture is a v0.82 development candidate under Proposed R22;
its presence creates no profile qualification, binding activation,
interoperability result, or implementation certification. The master standard,
permanent requirements, and accepted development decisions control. Graphics
are licensed under CC BY 4.0; see [LICENSE.md](../../LICENSE.md).
