# Workflow: graphics (consistency and GRAPHIC-NEEDED earmarks)

Status: **proposed** (worker-claude-A for Fable-FAC, 2026-10-07). Grants no authority.

Use this workflow to keep the repository's figures consistent and to track figures that are still missing. It covers `graphics/**`, `illustrated/**`, images referenced from Markdown anywhere, Mermaid blocks inside Markdown, the graphics register at `graphics/REGISTER.md`, and the earmark comments that mark where a figure is needed.

Graphics are informative. No figure amends the master Standard or a decision record, and the controlling text wins when a figure and the text differ (see `graphics/README.md`).

Do not use it for text-only changes (use [edit](../edit/README.md)) or for guide chapters (use [guide](../guide/README.md)).

## Stages

| Stage | Job | Main output |
| --- | --- | --- |
| `01-audit` | Inventory figures, sources, labels and references; find stale labels and missing figures | `audit.json`, proposed register rows |
| `02-produce` | Update editable sources, re-render rasters with recorded commands, update the register, insert earmarks in files the packet owns | Commit, render log |
| `03-check` | Register coverage, earmark format, render reproducibility, lint, links, map drift | `results.json` |
| `04-review` | Independent review of labels against controlling text, historical figures untouched, alt text, style | `REVIEW.md` with a verdict |

`dependencies.json` is linear. Skips follow the router's "Skips and late entry" rule. A register-only correction (a wrong path or status in the register) may record `02-produce` as limited to the register and `04-review` as `NOT_APPLICABLE`, with the reason in the packet.

## Earmarks

An earmark marks where a figure would go. Use exactly:

```text
<!-- GRAPHIC-NEEDED: GN-<NNN> <one-line description> -->
```

- `GN-<NNN>` is a three-digit number assigned in the register's "Graphics needed" section. Numbers are never reused; a delivered or withdrawn earmark keeps its row with a closing status.
- Place the comment on its own line where the figure would appear.
- A worker whose packet does not own the target file proposes the earmark in `rows.md` (file, anchor line, description). The register owner assigns the number; the integrator inserts the comment.
- `scripts/icm-map.mjs` lists every earmark and every malformed one in `docs/icm/map/REPO-MAP.md`.

## Register statuses

| Status | Meaning |
| --- | --- |
| `current` | Labels match the current edition and controlling text; raster matches source |
| `historical` | Kept as evidence of an earlier edition; never relabelled |
| `stale-needs-render` | Source updated; raster not yet re-rendered from it |
| `needs-redesign` | Content or style no longer fits; a redesign is proposed |

## Rules

- Historical figures keep their historical labels. Move or mark them; do not relabel them.
- Change a raster only by re-rendering it from its source with a recorded command and tool version. Never hand-edit a binary.
- If no renderer is available, update the source, mark the raster `stale-needs-render` and say so in the handoff.
- Current-state labels use "developmental specification (public working draft)" and the current edition from `CITATION.cff`.
- Each figure referenced from Markdown has alt text that says what it shows.

## Small example

Task: the control-plane diagram shows an older edition label.

1. `01-audit`: `graphics/diagrams/gkos-control-plane.mmd` holds the label; the PNG and SVG are its renders; the figure is referenced from the README.
2. `02-produce`: change the label in the `.mmd`; re-render with the pinned Mermaid CLI command from `graphics/diagrams/README.md`; update the register row.
3. `03-check`: re-render again and compare hashes; register coverage; map `--check`.
4. `04-review`: a reviewer compares the new label with the master Standard and the release manifest.
