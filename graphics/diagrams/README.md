# Rendered GKOS diagrams

These informative graphics explain GKOS architecture, an accountable decision
and adoption choices. The architecture diagrams preserve the labels, connections
and layer groupings previously embedded as Mermaid code in the README files.
Styling follows the blue and multicolor palette of the existing illustrated
figures.

| Diagram | Vector graphic | Downloadable image | Editable source |
| --- | --- | --- | --- |
| GKOS within an existing stack | [SVG](gkos-control-plane.svg) | [PNG](gkos-control-plane.png) | [Mermaid](gkos-control-plane.mmd) |
| Seven cumulative responsibilities | [SVG](gkos-layer-responsibilities.svg) | [PNG](gkos-layer-responsibilities.png) | [Mermaid](gkos-layer-responsibilities.mmd) |
| A refund decision you can audit | [SVG](gkos-accountable-refund.svg) | [PNG](gkos-accountable-refund.png) | [Editable SVG](gkos-accountable-refund.svg) |
| Choose an adoption starting point | [SVG](gkos-adoption-paths.svg) | [PNG](gkos-adoption-paths.png) | [Editable SVG](gkos-adoption-paths.svg) |

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
mmdc -i graphics/diagrams/gkos-control-plane.mmd \
  -o graphics/diagrams/gkos-control-plane.svg \
  -c graphics/diagrams/mermaid-config.json -b white -w 1400
mmdc -i graphics/diagrams/gkos-control-plane.mmd \
  -o graphics/diagrams/gkos-control-plane.png \
  -c graphics/diagrams/mermaid-config.json -b white -w 1400 -s 2
```

Repeat with `gkos-layer-responsibilities` as the input/output stem. An existing
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

These are post-publication documentation graphics for the live v0.81 edition.
They do not alter its signed tag, frozen release package or Zenodo archive.
The graphics are informative and establish no profile qualification or
implementation certification. The master standard and accepted development
decisions control. Graphics are licensed under CC BY 4.0; see
[LICENSE.md](../../LICENSE.md).
