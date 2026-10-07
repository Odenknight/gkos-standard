# 02-produce — update sources, re-render, update the register

## Goal

Make the figures named in the audit consistent: change editable sources whose current-state labels are stale, re-render rasters from those sources with recorded commands, write or update the graphics register, and insert earmarks in files the packet owns. Done means one or a few signed-off commits exist, `render-log.md` records every render command with tool versions and output hashes, and every changed figure has a register row with its new status.

## Governing instructions

- `docs/icm/graphics/README.md` — earmark form, register statuses, never hand-edit a binary, historical figures keep their labels.
- `graphics/diagrams/README.md` — pinned Mermaid CLI version and render commands; `graphics/diagrams/mermaid-config.json`.
- `graphics/README.md` — graphics are informative.
- `conformance/CLAIMS_POLICY.md` — no figure may show a claim the text may not make.
- `CONTRIBUTING.md` — CC BY 4.0 for original graphics; DCO sign-off.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Audit | `<run>/output/<task-id>/<attempt>/audit.json` from `01-audit` | Figures and needs the packet selects | Digest in its HANDOFF.json |
| Register rows | `<run>/output/<task-id>/<attempt>/register-rows.md` from `01-audit` | Full | Digest in its HANDOFF.json |
| Sources | `graphics/diagrams/` (Mermaid, Python build and SVG sources) | Selected figures | Packet `base_commit` |
| Register | `<graphics/REGISTER.md>` | Full; created by this stage if absent | Packet `base_commit` |
| Edition | `CITATION.cff` | `version`, `date-released` | Packet `base_commit` |

## Dependencies

- `01-audit` accepted for this packet.

## Allowed writes

- `graphics/**` and `illustrated/**`, as the packet's `write_scope` allows.
- Earmark comments only in files the packet's `write_scope` includes. Earmarks for other files go to `rows.md`.
- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- Never files under `archive/`, `releases/` or `release-candidates/`.

## Procedure

1. Confirm HEAD is `base_commit` on the packet's branch and the tree is clean.
2. For each selected figure with an editable source, change only the stale current-state labels or the agreed style values.
3. Re-render each changed source with the command from `graphics/diagrams/README.md` (Mermaid) or `python <figure>.build.py` (Python builds). Record argv, tool versions (`mmdc --version`, `python --version`, `node --version`) and the SHA-256 of each output in `render-log.md`.
4. If a renderer is unavailable, keep the source change, leave the raster untouched and set the register status to `stale-needs-render`.
5. Write or update `<graphics/REGISTER.md>`: one row per figure (id, path, source, used in, edition label, status) and a "Graphics needed" section with `GN-<NNN>` rows (id, file, anchor, description, status).
6. Insert `<!-- GRAPHIC-NEEDED: GN-<NNN> <one-line description> -->` on its own line at each anchor inside the packet's write scope.
7. Regenerate the map: `node scripts/icm-map.mjs`, if the packet's write scope includes `docs/icm/map/`; otherwise propose the regeneration in `rows.md`.
8. Commit with DCO sign-off. Write `change.patch`, `render-log.md` and `rows.md`, then `HANDOFF.json` last.

## Verification

Objective:

- Every changed raster has a `render-log.md` entry whose output hash equals `sha256sum` of the committed file.
- `git diff --check` reports nothing; `git ls-files --eol graphics illustrated` shows LF for text files.
- `git diff --name-only <base_commit>..HEAD` lists nothing under `archive/`, `releases/` or `release-candidates/`.

Interpretation:

- Did any historical figure lose its historical label?
- Does each new label say what the controlling text says, no more?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Commit | Packet branch | Signed-off commit(s) |
| Register | `<graphics/REGISTER.md>` | Markdown tables: figures; graphics needed |
| Render log | `<run>/output/<task-id>/<attempt>/render-log.md` | argv, tool versions, output SHA-256 per render |
| Proposed rows | `<run>/output/<task-id>/<attempt>/rows.md` | Earmarks for files outside the write scope; ledger rows for `docs/icm/map/areas/graphics.md` and `docs/icm/map/areas/illustrated.md` |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- A render produces different output on re-run (non-deterministic renderer) → record both hashes; mark the figure `stale-needs-render`; report it.
- A raster needs a change and has no source → `needs-redesign` in the register; no binary edit.
- An earmark target lies outside the write scope → `rows.md`, not an edit.
