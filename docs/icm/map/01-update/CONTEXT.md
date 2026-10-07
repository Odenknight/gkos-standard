# 01-update — refresh the repository map and the area ledgers

## Goal

After a change lands on a branch, bring the organization map back in line with it: regenerate `docs/icm/map/repo-map.json` and `docs/icm/map/REPO-MAP.md`, add one edit-ledger row per changed item to the affected area trackers, and correct any tracker text the change made wrong. Done means `node scripts/icm-map.mjs --check` exits 0 on the candidate commit, every area touched by the change has a ledger row, and every unclassified file the change introduced is reported.

## Governing instructions

- `docs/icm/CONTEXT.md` — mandatory read order, invariants, run records stay outside the repository.
- `docs/icm/map/README.md` — field meanings, standing vocabulary, ledger rules (append-only; `planned` until merged).
- `docs/CORPUS-STATUS.md` — "Reading and maintenance rules": classify as normative, informative, proposed or historical; preserve historical sources.
- `conformance/CLAIMS_POLICY.md` — tracker text may not create a requirement, profile, certification or carried-forward claim.
- `CONTRIBUTING.md` — DCO sign-off on every commit intended for merge.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Assignment | Task packet `tasks/<task-id>.json` | Full packet; names the change being mapped | SHA-256 in `RUN.json` |
| Change | `git diff <base_commit>..<candidate-commit> --stat` | File list | Candidate commit |
| Generator | `scripts/icm-map.mjs` | Full | Candidate commit |
| Current map | `docs/icm/map/repo-map.json` | Entries for the changed files | Candidate commit |
| Trackers | `docs/icm/map/areas/` | Trackers of the changed areas | Candidate commit |
| Edition | `CITATION.cff` | `version`, `date-released` | Candidate commit |

## Dependencies

- None inside this workflow. It runs after a change from another workflow (edit, guide, graphics, release) has a candidate commit. The packet names that commit and the run that produced it.

## Allowed writes

- `docs/icm/map/repo-map.json` and `docs/icm/map/REPO-MAP.md`, only by running `node scripts/icm-map.mjs`.
- `docs/icm/map/areas/*.md`: append ledger rows; correct item lists and status text that the mapped change made wrong.
- A new tracker `docs/icm/map/areas/<area>.md` when the change creates a new top-level area or `docs/` subfolder.
- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- Not `scripts/icm-map.mjs` unless the packet names it; a rule change is its own reviewed change.

## Procedure

1. Record `git rev-parse HEAD`, `git status --porcelain` and `git branch --show-current`. Stop if HEAD is not the candidate commit or the packet's branch.
2. List the changed files: `git diff --name-status <base_commit>..HEAD`.
3. Regenerate: `node scripts/icm-map.mjs`. Read the diff of `docs/icm/map/REPO-MAP.md`. For each changed file, compare its new `standing` and `standing_rule` with the document's own status line.
4. For each area with changed files, add one row per item to that tracker's "Edit ledger": date (YYYY-MM-DD), item (path or record ID), change (one line; `planned` until merged), PR (`#NN` or `-`), run (run ID and task ID). Update "Current and historical items" and "Major and minor items" when the change moved an item between them.
5. If the change created a new area, write its tracker with the five standard sections, then regenerate again so `REPO-MAP.md` links it.
6. List every file that is `unclassified`, every new "Retired maturity wording" line and every new stale-edition candidate in `findings.md`. Do not edit those files here; route them to the edit workflow.
7. Run the checks in Verification. Commit with DCO sign-off. Write `HANDOFF.json` last.

## Verification

Objective:

- `node scripts/icm-map.mjs --check` exits 0 on the committed candidate.
- `python <share>/_work/ICM/_core/tools/icm_check.py layout docs/icm --repo .` exits 0.
- `npx --yes markdownlint-cli2@0.17.2` over the changed Markdown files exits 0.
- `git diff --check` reports nothing; `git ls-files --eol docs/icm/map` shows LF.

Interpretation:

- Does each ledger row describe the change accurately, without claims?
- Is any new standing plausible against the document's own status line? A mismatch is a finding, not something to fix by editing the generated files.

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Map | `docs/icm/map/repo-map.json`, `docs/icm/map/REPO-MAP.md` | Generated; committed with the change |
| Ledger rows | `docs/icm/map/areas/<area>.md` | Markdown table rows |
| Findings | `<run>/output/<task-id>/<attempt>/findings.md` | Unclassified files, retired-wording lines and edition candidates introduced by the change, each with `path:line` |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template; candidate commit, tree, dirty flag, checks with exit codes |

## Failure behavior

- `--check` still fails after regeneration → the generator is non-deterministic on this checkout; record the two differing outputs and report `BLOCKED`.
- git refuses the repository as unsafe → set the per-command environment override from the map README; never change global git configuration.
- A tracker needs a change outside ledger rows and item lists (purpose, governing workflow) → propose it in `findings.md`; the coordinator routes it.
- The change touched a frozen path, a release folder or an archive folder without an owner decision → report it; do not record it in a ledger as accepted.
