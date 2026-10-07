# 01-audit — inventory figures and find gaps

## Goal

Produce an exact inventory of every figure and every place a figure is needed: file, format, editable source, where it is referenced, edition or version labels shown, terminology shown, style family and proposed register status; plus every prose explanation in current-facing documents that a figure would clarify. Done means `audit.json` and `register-rows.md` exist and every image file and every Markdown image reference at `base_commit` appears in `audit.json` exactly once.

## Governing instructions

- `docs/icm/CONTEXT.md` — read order and invariants.
- `docs/icm/graphics/README.md` — earmark form, register statuses, rules for historical figures and rasters.
- `graphics/README.md` — graphics are informative; controlling text wins.
- `graphics/diagrams/README.md` — sources, pinned renderer versions and render commands.
- `archive/graphics/README.md` — historical artwork stays historical.
- `docs/CORPUS-STATUS.md` — standing rules for the documents that reference figures.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Assignment | Task packet `tasks/<task-id>.json` | Full packet | SHA-256 in `RUN.json` |
| Graphics | `graphics/`, `illustrated/figures/`, `archive/graphics/` | All files | Packet `base_commit` |
| Register | `<graphics/REGISTER.md>` | Full; absent before the first run | Packet `base_commit` |
| Map | `docs/icm/map/repo-map.json` | `asset` entries, `graphic_needed`, `malformed_earmarks`, standings of referencing files | Packet `base_commit` |
| Edition | `CITATION.cff` | `version`, `date-released` | Packet `base_commit` |
| Controlling text | `standard/00_GKOS_Master_Standard.md` | Terms and layer names that figures show | Packet `base_commit` |

## Dependencies

- None. This is the entry stage.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- No source changes in this stage.

## Procedure

1. Record `git rev-parse HEAD` and `git status --porcelain`. Stop if HEAD differs from `base_commit`.
2. List image files: `git ls-files | grep -iE '\.(png|svg|jpe?g|gif|webp|mmd)$'`.
3. List Markdown image references, `git grep -n -I -E '!\[|<img ' -- '*.md'`, and Mermaid blocks, `git grep -n -I -E '^.{3}mermaid$' -- '*.md'`.
4. For each figure, record the editable source (`.mmd`, `.build.py`, SVG text, or raster only) and the render command if `graphics/diagrams/README.md` gives one.
5. Read labels: for SVG and Mermaid sources, `git grep -n -I -E 'v0\.[0-9]+|GKOS-20[0-9]{2}-|pre-?standard' -- <source>`; for raster-only figures, inspect the image and record what it shows.
6. Mark each figure's proposed status. A figure in `archive/` or labelled for an earlier edition on purpose is `historical`.
7. Scan the current-facing documents the packet names for concepts explained only in prose that a figure would clarify (layers, record lifecycle, supersession, authority and refusal flow, conformance flow, release and publication flow). Record each as a proposed `GN-<NNN>` row with file, anchor line and description. Check existing earmarks in the map first; do not duplicate one.
8. Write `audit.json` and `register-rows.md`, then `HANDOFF.json` last.

## Verification

Objective:

- Every path from steps 2 and 3 appears once in `audit.json`.
- Every anchor line cited for a proposed earmark exists at `base_commit`.
- `audit.json` parses as JSON.

Interpretation:

- Is each "historical" status justified by an archive location or a deliberate historical label?
- Would each proposed figure explain something the prose leaves hard to follow?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Audit | `<run>/output/<task-id>/<attempt>/audit.json` | `figures[]`: `id`, `path`, `format`, `source`, `render_command`, `used_in[]`, `labels[]`, `terms[]`, `style`, `proposed_status`; `needed[]`: `file`, `line`, `description` |
| Register rows | `<run>/output/<task-id>/<attempt>/register-rows.md` | Rows for the register and its "Graphics needed" section |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- A raster has no source and shows a stale current label → record `needs-redesign`; do not edit the raster.
- A label conflicts with controlling text and it is unclear which is right → `uncertain`; cite both; route the text question to the edit workflow.
- An image cannot be read → record it with `labels: null` and the reason.
