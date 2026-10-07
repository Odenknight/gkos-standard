# 03-check — check the graphics candidate

## Goal

Run the objective checks on the exact graphics candidate commit: register coverage, earmark format and numbering, render reproducibility, Markdown lint, links and map drift. Done means `results.json` has one entry per check below with `PASS`, `FAIL`, `BLOCKED`, `NOT_RUN` or `NOT_APPLICABLE` (with a reason).

## Governing instructions

- `docs/icm/graphics/README.md` — earmark form, numbering, register statuses.
- `graphics/diagrams/README.md` — pinned render commands.
- `.github/workflows/markdown-lint.yml` — markdownlint with `.markdownlint.jsonc`.
- `.github/workflows/link-check.yml` — link check; archive folders excluded.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Predecessor | Candidate `commit` and `tree_sha` from the `02-produce` HANDOFF.json | Exact commit | Digest in that HANDOFF.json |
| Render log | `<run>/output/<task-id>/<attempt>/render-log.md` from `02-produce` | Full | Digest in its HANDOFF.json |
| Register | `<graphics/REGISTER.md>` | Full | Candidate commit |
| Map generator | `scripts/icm-map.mjs` | Full | Candidate commit |

## Dependencies

- `02-produce` accepted for this exact candidate commit.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- A disposable worktree outside the source checkout for re-rendering. No source changes.

## Procedure

1. Confirm `git rev-parse HEAD` equals the candidate commit and the tree is clean.
2. Register coverage: every file from `git ls-files graphics illustrated | grep -iE '\.(png|svg|jpe?g|gif|webp|mmd)$'` has exactly one register row, and every register path exists.
3. Earmarks: run `node scripts/icm-map.mjs` in the disposable worktree and read `docs/icm/map/repo-map.json` there. `malformed_earmarks` must be empty for every file. Every `graphic_needed` id must have a register row, and no id may appear twice.
4. Reproducibility: in the disposable worktree, re-run each command from `render-log.md` with the same tool versions and compare output SHA-256 with the committed file. Record `NOT_RUN` where the renderer is missing.
5. Lint: `npx --yes markdownlint-cli2@0.17.2` over changed Markdown files.
6. Links: the repository's relative-link check over tracked Markdown; `lychee` with the arguments in `link-check.yml` if installed.
7. Map drift: `node scripts/icm-map.mjs --check` in the candidate checkout. A failure is a finding unless the packet left map regeneration to the integrator.
8. Write `results.json` and logs, then `HANDOFF.json` last.

## Verification

Objective:

- Each check entry records argv, exit code, tool versions and the candidate commit.
- `git status --porcelain` in the candidate checkout is empty after the run.

Interpretation:

- Is a reproducibility mismatch a renderer difference (version, fonts) or a real source change?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Results | `<run>/output/<task-id>/<attempt>/results.json` | `checks[]`: `id`, `argv`, `exit_code`, `result`, `reason`, `log`, `tool_versions`, `commit` |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template; counts by result |

## Failure behavior

- A check fails → record `FAIL`, run the others, submit.
- A renderer is missing → `NOT_RUN` for reproducibility of that figure; the register must already say `stale-needs-render` if the raster was not re-rendered.
- A check modifies tracked files in the candidate checkout → stop and report it.
