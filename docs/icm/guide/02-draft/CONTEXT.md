# 02-draft — write the guide pages and refresh the mirror

## Goal

Write or change the guide pages named in `scope.json` on one branch, in plain language, with every factual statement linked to its source, and refresh the share mirror so it is byte-identical. Done means one or a few signed-off commits exist on the packet's branch, `change.patch` and `rows.md` are written, and the mirror matches the branch.

## Governing instructions

- `docs/icm/guide/README.md` — rules for guide text, the D2 wording, figure reuse, earmark proposals.
- `conformance/CLAIMS_POLICY.md` — claim limits.
- `CONTRIBUTING.md` — documentation licence and DCO sign-off.
- `.gitattributes` — LF line endings.
- `.markdownlint.jsonc` — Markdown style the CI enforces.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Scope | `<run>/output/<task-id>/<attempt>/scope.json` from `01-scope` | Full | Digest in its HANDOFF.json |
| Guide | `<guide/>` | Target pages | Packet `base_commit` |
| Sources | Each file the scope cites | Cited lines | Packet `base_commit` |
| Figures | `illustrated/figures/`, `graphics/diagrams/` | Figures named in scope | Packet `base_commit` |
| Mirror | `_Agents/_work/ICM/gkos-standard/guide/` on the share | Full | Current share state |

## Dependencies

- `01-scope` accepted for this packet, with no unresolved `BLOCKED` statement.

## Allowed writes

- `guide/**` in the worktree on the packet's branch.
- The share mirror `_Agents/_work/ICM/gkos-standard/guide/**`, copied from the branch, never edited separately.
- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- Not `README.md`: the link line from the README to the guide is proposed in `rows.md` for the README integrator.

## Procedure

1. Confirm HEAD is `base_commit` on the packet's branch and the tree is clean.
2. For each target, write the page. Open with the informative header line. Use the D2 wording for current maturity. Link each statement to the source and lines in `scope.json` with a relative link (from `guide/`, a root file is `../FILE.md`).
3. Reuse figures with relative links and alt text. Copy no images.
4. Add or update glossary entries for every new term; each entry links to its authoritative source.
5. For each explanation that lacks a figure, add a row to `rows.md`: file, anchor line, and a one-line description for `<!-- GRAPHIC-NEEDED: GN-<NNN> <one-line description> -->`. The graphics workflow assigns the number.
6. Write LF line endings with a tool that preserves them. Check `git ls-files --eol guide`.
7. Commit with DCO sign-off and the trailers the packet names. Save `git format-patch` output as `change.patch`.
8. Copy `guide/` byte for byte to the share mirror (for example `robocopy guide <share>/guide /MIR` or `rsync -a --delete guide/ <share>/guide/`).
9. Write `rows.md` (README link line, `docs/CORPUS-STATUS.md` row, earmark proposals, ledger rows for `docs/icm/map/areas/guide.md`), then `HANDOFF.json` last.

## Verification

Objective:

- `git diff --check <base_commit>..HEAD` reports nothing.
- `python <share>/_work/ICM/_core/tools/icm_check.py compare guide <share>/_work/ICM/gkos-standard/guide` exits 0.
- No path under `guide/` has a segment that starts with `draft`.

Interpretation:

- Would a capable non-specialist understand each page without the sources open?
- Does any sentence say more than its source?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Commit | Packet branch | Signed-off commit(s) |
| Patch | `<run>/output/<task-id>/<attempt>/change.patch` | `git format-patch` |
| Proposed rows | `<run>/output/<task-id>/<attempt>/rows.md` | README link line, corpus-status row, earmark proposals, ledger rows |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template; candidate commit, tree, dirty flag |

## Failure behavior

- A statement cannot be written without going beyond its source → leave it out; record it in the handoff limitations.
- The mirror cannot be written (share unavailable) → commit anyway; report the mirror as `NOT_RUN` with the access error.
- A needed change lies outside `guide/**` → propose it in `rows.md`; do not make it.
