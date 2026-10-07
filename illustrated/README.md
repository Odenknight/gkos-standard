# Illustrated figures

These figures are informative. They help readers picture GKOS. They do not
amend the master standard or an accepted development decision. The controlling
text wins where a figure differs.

The six figures were drawn for the v0.76 Illustrated Edition, now archived at
[`archive/illustrated/`](../archive/illustrated/GKOS-v0.76-Illustrated-Edition.md).
Each is a PNG raster written by Matplotlib 3.10.8. Their build scripts are not
in the repository, so the figures cannot be rendered again from source. Do not
hand-edit them. Redraw a figure as an editable SVG instead.

The [graphics register](../graphics/REGISTER.md) records each figure's status
and known defects.

## Figures

| Register ID | Figure | Status | Fit for current reuse | Notes |
| --- | --- | --- | --- | --- |
| GR-11 | [The GKOS seven-layer model](figures/fig1-seven-layers.png) | Current | Yes | Used by `README.md` and `TECHNICAL_README.md`. The L1 description runs past its card. |
| GR-12 | [The OSI analogy](figures/fig2-osi-analogy.png) | Historical (v0.76) | No | The footer overlaps the L1 boxes and names OKF+, the pre-GKX 2.0 name. |
| GR-13 | [Twelve-state epistemic vocabulary](figures/fig3-epistemic-states.png) | Historical (v0.76) | No | The title says "frozen in v0.76 §5.1". The arrows suggest one linear path. |
| GR-14 | [Simplified knowledge flow](figures/fig4-knowledge-flow.png) | Current | Yes | Used by `README.md`. Two labels run past their cards. |
| GR-15 | [Conformance profile ladder](figures/fig5-gcp-ladder.png) | Historical (v0.76) | No | The GCP-7 card is clipped. The figure predates the R16 Core and Advanced tiers. |
| GR-16 | [Authority precedence](figures/fig6-authority-precedence.png) | Historical (v0.76) | No | The caption overlaps level 9. Check it against the accepted R2 decisions before reuse. |

A historical figure keeps its original labels. A new guide or orientation page
should use only figures marked "Yes", or the current diagrams in
[`graphics/diagrams/`](../graphics/diagrams/README.md).

## House style for new figures

Draw new figures as editable SVG with text labels, a `<title>` and a `<desc>`.
Use Arial, Helvetica, sans-serif. Use the shared layer colors:

| Layer | Color |
| --- | --- |
| L1 Original Sources | `#794DA5` |
| L2 Structure and Identity | `#5968B4` |
| L3 Relationships and Lineage | `#237B9A` |
| L4 Validation and Control | `#177E7B` |
| L5 Review and Workflow | `#F2D766` with `#102044` text |
| L6 Context Presentation | `#36803B` |
| L7 Authorized Use | `#235FA5` |

Export the PNG with sharp at twice the SVG width. Record the command in the
[graphics register](../graphics/REGISTER.md#render-log).

## Planned figures

These figures are needed for beginner-level explanations. The register lists
where each one will be used.

<!-- GRAPHIC-NEEDED: GN-001 Specification maturity path: single-author pre-standard concept, developmental specification (public working draft, current), pre-standard through an open committee (goal), v1.0 gates -->

<!-- GRAPHIC-NEEDED: GN-002 Edition and publication flow: main, release candidate, signed tag, release package, GitHub Release, Zenodo DOI, publication record; v0.81 to v0.82.1 and the v0.83 line -->

<!-- GRAPHIC-NEEDED: GN-006 Layer-1 re-entry and explicit supersession: predecessor preserved, new L1 source with no inherited standing, supersession declared by an authorized human, never inferred -->

- **GN-001** Specification maturity path.
- **GN-002** Edition and publication flow.
- **GN-006** Layer-1 re-entry and explicit supersession.

## License

Figures are licensed under CC BY 4.0. See [LICENSE.md](../LICENSE.md).
