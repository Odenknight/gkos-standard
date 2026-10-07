# 01-scope — name the chapters, statements and sources

## Goal

Turn a guide request into an exact scope: the trigger, each chapter or glossary entry to create or change, each factual statement to add or change, and the repository file that supports each statement. Done means `scope.json` exists and every supporting file resolves at the packet's `base_commit`, or the stage reports `BLOCKED` naming the statement that has no source.

## Governing instructions

- `docs/icm/CONTEXT.md` — read order, invariants, run records outside the repository.
- `docs/icm/guide/README.md` — rules for guide text, the D2 wording, when the guide must change.
- `docs/CORPUS-STATUS.md` — "Reading and maintenance rules"; the guide is informative and cites the documents that control.
- `conformance/CLAIMS_POLICY.md` — what may and may not be claimed.
- `GOVERNANCE.md` — who decides; the guide describes the process and does not change it.
- `CONTRIBUTING.md` — CC BY 4.0 for documentation; DCO sign-off.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Assignment | Task packet `tasks/<task-id>.json` | Full packet | SHA-256 in `RUN.json` |
| Current edition | `CITATION.cff` | `version`, `date-released` | Packet `base_commit` |
| Current standing | `README.md` | "Current standing" section | Packet `base_commit` |
| Guide | `<guide/>` (`<guide/README.md>` and the chapters the packet names) | Named pages; absent when the packet creates the guide | Packet `base_commit` |
| Area tracker | `docs/icm/map/areas/guide.md` | Items and edit ledger | Packet `base_commit` |
| Map | `docs/icm/map/repo-map.json` | Entries under `guide/` and for each cited source | Packet `base_commit` |
| Figures | `illustrated/figures/`, `graphics/diagrams/README.md` | Available figures and their standing | Packet `base_commit` |

## Dependencies

- None. This is the entry stage. The packet must be published and its assignment generation in `RUN.json` current.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- No source changes in this stage.

## Procedure

1. Record `git rev-parse HEAD`, `git status --porcelain` and `git branch --show-current`. Stop if HEAD differs from `base_commit`.
2. Read the governing instructions, then the inputs.
3. List each target page: `existing` (present at base) or `create`. For `create`, confirm the parent folder exists or that the packet creates `guide/`, that the path is unused (`git cat-file -e <base_commit>:<path>` fails) and that no path segment starts with `draft`.
4. For each statement to add or change, record the source file and the line range that supports it: `git grep -n -I "<term>" <base_commit> -- <source>`. Prefer the controlling record (master Standard, registry, decision record, claims policy) over a summary.
5. Classify each source with `docs/icm/map/repo-map.json`. A historical or release source may support a history statement only, never a current-state statement.
6. List the figures to reuse and the explanations that lack a figure (earmark proposals for `02-draft`).
7. List exclusions: source documents to correct are routed to the edit workflow, not changed here.
8. Write `scope.json`, then `HANDOFF.json` last.

## Verification

Objective:

- Every `existing` target and every source passes `git cat-file -e <base_commit>:<path>`.
- Every cited line range exists at `base_commit`.
- `scope.json` parses as JSON and names `base_commit`, targets, statements with sources, figures and exclusions.

Interpretation:

- Does each source actually say what the statement will say?
- Is any current-state statement resting on a historical source?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Scope | `<run>/output/<task-id>/<attempt>/scope.json` | JSON: `base_commit`, `trigger`, `targets[]` (`path`, `kind` `existing` or `create`), `statements[]` (`target`, `text_intent`, `source`, `lines`, `source_standing`), `figures[]`, `earmark_proposals[]`, `exclusions[]` |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template; status `submitted`, `blocked` or `uncertain` |

## Failure behavior

- A statement has no supporting source → drop it from scope and record it; `BLOCKED` only if the packet requires it.
- A source contradicts another source → `uncertain`; list both with `path:line`; the coordinator routes the conflict to the edit workflow.
- The packet asks the guide to state a requirement, profile standing or claim not in a controlling record → `BLOCKED`; name the missing decision.
