# Rendered GKOS diagrams

These informative graphics explain GKOS architecture, an accountable decision,
adoption choices, the evidence-to-action workflow and the CIA triad alignment.
The r3 canonical architecture was accepted under R22 on 2026-09-04 and carried
into the published v0.82 edition under R24. The control-plane and layer
responsibility diagrams remain narrower detail views. Styling follows the blue
and multicolor palette of the illustrated figures.

The [graphics register](../REGISTER.md) records the status, edition label and
style family of each file. The current edition is GKOS-2026-09-24 v0.82.1.

| Diagram | Vector graphic | Downloadable image | Editable source |
| --- | --- | --- | --- |
| Canonical architecture orientation — r3 (R22) | [SVG](gkos-canonical-architecture.svg) | [PNG](gkos-canonical-architecture.png) | [Mermaid](gkos-canonical-architecture.mmd) · [labels](gkos-canonical-architecture.labels.txt) |
| GKOS within an existing stack | [SVG](gkos-control-plane.svg) | [PNG](gkos-control-plane.png) | [Mermaid](gkos-control-plane.mmd) |
| Seven cumulative responsibilities | [SVG](gkos-layer-responsibilities.svg) | [PNG](gkos-layer-responsibilities.png) | [Mermaid](gkos-layer-responsibilities.mmd) |
| A refund decision you can audit | [SVG](gkos-accountable-refund.svg) | [PNG](gkos-accountable-refund.png) | [Editable SVG](gkos-accountable-refund.svg) |
| Choose an adoption starting point | [SVG](gkos-adoption-paths.svg) | [PNG](gkos-adoption-paths.png) | [Editable SVG](gkos-adoption-paths.svg) |
| CIA triad overview — informative, pinned to the v0.81 basis | [SVG](gkos-cia-overview.svg) | [PNG](gkos-cia-overview.png) | [Python](gkos-cia-overview.build.py) · [alignment](../../docs/GKOS_CIA_TRIAD_ALIGNMENT.md) |
| CIA triad detailed alignment — informative, pinned to the v0.81 basis | [SVG](gkos-cia-triad-alignment.svg) | [PNG](gkos-cia-triad-alignment.png) | [Python](gkos-cia-triad-alignment.build.py) · [alignment](../../docs/GKOS_CIA_TRIAD_ALIGNMENT.md) |

## Canonical architecture orientation — r3

- **Files:** `gkos-canonical-architecture.svg` (reference rendering), `.png` (2× export), `.mmd` (Mermaid source), and `.labels.txt` (checked parity register).
- **Standing:** informative architecture orientation, accepted under R22 on 2026-09-04 and carried into the v0.82 edition under R24; no normative, conformance, binding, implementation, or runtime authority.
- **Label currency:** the figure still reads "r3 · v0.82 development candidate" and "v0.81 published 2026-09-03". Those labels were correct at review. A refresh to the current edition is a substantive change under R22 §6, so it needs an r4 review and preservation of r3 in the archive first. See register entry GR-01.
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

The exact r3 review rendering on GitHub Actions used the commands below with the
same repository Mermaid configuration. The temporary Puppeteer configuration
contained only browser-launch arguments
`["--no-sandbox", "--disable-setuid-sandbox"]`; it changed no diagram source,
Mermaid configuration, or output content semantics.

```sh
mmdc -i graphics/diagrams/gkos-canonical-architecture.mmd \
  -o graphics/diagrams/gkos-canonical-architecture.svg \
  -c graphics/diagrams/mermaid-config.json \
  -p /tmp/r22-puppeteer.json -b white -w 1800
mmdc -i graphics/diagrams/gkos-canonical-architecture.mmd \
  -o graphics/diagrams/gkos-canonical-architecture.png \
  -c graphics/diagrams/mermaid-config.json \
  -p /tmp/r22-puppeteer.json -b white -w 1800 -s 2
```

For ordinary local rebuilds, an existing Chrome installation may be selected
through Mermaid CLI's `--puppeteerConfigFile` option as needed. The renderer is
documentation tooling outside the conformance runner's dependency graph.

The existing detail diagrams use the same pinned Mermaid version. Their
portable commands remain:

```sh
mmdc -i graphics/diagrams/gkos-control-plane.mmd \
  -o graphics/diagrams/gkos-control-plane.svg \
  -c graphics/diagrams/mermaid-config.json -b white -w 1400
mmdc -i graphics/diagrams/gkos-control-plane.mmd \
  -o graphics/diagrams/gkos-control-plane.png \
  -c graphics/diagrams/mermaid-config.json -b white -w 1400 -s 2
```

Repeat the detail-view commands with `gkos-layer-responsibilities` as the
input/output stem.

### SVG explainers

The refund, adoption, middleware and review-view graphics are authored
directly as editable SVG. Their PNG exports use `sharp` version `0.35.4`,
installed in a separate tooling environment. Each PNG is twice the SVG width.
From the repository root, the equivalent export is:

```js
import sharp from 'sharp';

const widths = {
  'gkos-accountable-refund': 2560,
  'gkos-adoption-paths': 2560,
  'middleware-placement': 2400,
  'evidence-review-views': 2400,
};
for (const [stem, width] of Object.entries(widths)) {
  await sharp(`graphics/diagrams/${stem}.svg`)
    .resize({ width })
    .png()
    .toFile(`graphics/diagrams/${stem}.png`);
}
```

On 2026-10-07 this export reproduced the four committed PNGs byte for byte on
Windows with Node.js 24.18.0. The adoption graphic was then rendered again
after its note changed from "v0.81" to "GKOS v0.82.1". The
[register render log](../REGISTER.md#render-log) records the commands.

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

These are documentation graphics. Changing a graphic does not alter any
published edition, signed tag, release package, or Zenodo archive. The r3
canonical architecture is informative under R22;
its presence creates no profile qualification, binding activation,
interoperability result, or implementation certification. The master standard,
permanent requirements, and accepted development decisions control. Graphics
are licensed under CC BY 4.0; see [LICENSE.md](../../LICENSE.md).

## Evidence-to-action workflow and middleware views

- [User-supplied workflow illustration](gkos-evidence-to-authorized-action.jpg), supplied for inclusion on 2026-09-06 and preserved unchanged. Its footer reads "Illustrative GKOS v0.81 workflow"; the workflow still matches v0.82.1, and only the owner can supply a revised image (register entry GR-08). Its [accessible full stack explanation](../../docs/implementation/GKOS_END_TO_END_WORKFLOW.md) describes the colors, branches, all seven responsibilities and return to evidence.
- [Middleware placement SVG](middleware-placement.svg) / [PNG](middleware-placement.png): request, policy, protected enforcement and evidence-storage boundaries.
- [Separate review views SVG](evidence-review-views.svg) / [PNG](evidence-review-views.png): evidence reuse across ISO, EU and NIST with distinct criteria and judgments.

The two middleware diagrams are editable SVG sources developed for the owner review packet on 2026-09-05; PNG exports use sharp 0.35.4 at 2400 pixels wide. Original illustrated figures remain available. All diagrams are informative; the current layer contract table controls terminology where an earlier illustration abbreviates it.

## CIA triad graphics

Rebuild with Python 3 and CairoSVG installed:

```sh
python graphics/diagrams/gkos-cia-overview.build.py
python graphics/diagrams/gkos-cia-triad-alignment.build.py
```

Both scripts write SVG and 2× PNG beside their source. These graphics are informative and allocate no requirements or crosswalk identifiers. Their "v0.81" labels pin the requirement basis on purpose; that basis is unchanged in v0.82 and v0.82.1.
