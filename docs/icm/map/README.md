# Workflow: map (repository organization map)

Status: **proposed** (worker-claude-A for Fable-FAC, 2026-10-07). Informative. Grants no authority. The map reports what the repository says about each file; where the map and a document's own status line, `docs/CORPUS-STATUS.md`, a decision record or a release manifest disagree, those records control.

The map answers two questions for the Founder and Initial Editor (FAC) and for agents:

1. **Where does something live?** Every file, its area and its tracker.
2. **Is it current?** Each file's standing (current, proposed or historical), whether it sits on a frozen path, and where current-facing text still names an older edition or uses retired wording.

## What is here

| Path | Kind | Edited by |
| --- | --- | --- |
| [REPO-MAP.md](REPO-MAP.md) | Generated human table: counts by area, unclassified files, wording and edition candidates, earmarks, rule counts | `scripts/icm-map.mjs` only |
| [repo-map.json](repo-map.json) | Generated machine record: one entry per file | `scripts/icm-map.mjs` only |
| `areas/<area>.md` | Hand-written tracker per area: purpose, current and historical items, major and minor items, governing workflow, edit ledger | The worker whose packet names the area, or the integrator |
| [01-update/CONTEXT.md](01-update/CONTEXT.md) | Stage contract for refreshing the map and the ledgers | - |
| [dependencies.json](dependencies.json) | One-stage graph | - |

`docs/icm/map/` is laid out as a one-stage workflow because `icm_check.py layout` treats every folder under `docs/icm/` as a workflow. The stage is the routine "refresh the map after a change" job.

## How FAC and agents use the map

| Question | Look at |
| --- | --- |
| Which area holds X, and who edits it? | `REPO-MAP.md` "Areas", then the area tracker |
| Is file X current, proposed or historical? | `repo-map.json` entry for X (`standing`, `standing_rule`), then the file's own status line |
| May I edit file X in this packet? | `frozen` in `repo-map.json`; the area tracker's "Governing workflow"; the packet's `write_scope` |
| What changed in area X, and in which run? | The tracker's "Edit ledger" |
| Which current-facing files still name an older edition or use the retired maturity wording? | `REPO-MAP.md` "Stale-edition candidates" and "Retired maturity wording (current-facing)" |
| Where is a figure still missing? | `REPO-MAP.md` "GRAPHIC-NEEDED earmarks"; the register the [graphics workflow](../graphics/README.md) maintains |
| Which files does no rule classify? | `REPO-MAP.md` "Unclassified files" |

A packet cites the map by commit: "per `docs/icm/map/repo-map.json` at `<commit>`". The map is a finding aid. It does not prove standing, and a candidate line is not an error until a person reads it in context.

## Regenerate

From the repository root, with Node 22 or later and git on `PATH`:

```sh
node scripts/icm-map.mjs
```

The script lists tracked files plus untracked files that are not ignored, so new files appear before their first commit. Run it on a clean checkout for a record you will cite. On a share or another owner's checkout, git may refuse the repository as unsafe; set the override for that one command through the environment (for example `GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=safe.directory GIT_CONFIG_VALUE_0=<path>`) rather than in a global configuration.

## Check drift

```sh
node scripts/icm-map.mjs --check
```

Exit 0: both generated files match what the script would write now. Exit 1: at least one is out of date; the output names it. Exit 2: usage error. `last_commit` dates are not compared, because every commit changes them; regenerating refreshes them. A change to any classified file, any status line, any tracker file name or the script itself can make the map stale, so regenerate in the same commit as the change.

## Fields in `repo-map.json`

| Field | Meaning |
| --- | --- |
| `path` | Repository-relative path |
| `area`, `subarea` | Top folder (`root` for files at the root) and second-level folder |
| `tracker` | Tracker id; the file `areas/<tracker>.md` covers it. `LICENSES/` is covered by `root`, `.github/` by `github`, `docs/<sub>/` by `docs-<sub>` |
| `standing` | One of `normative`, `informative`, `proposed`, `decision`, `historical`, `release`, `generated`, `process`, `asset`, `unclassified` |
| `standing_rule` | The rule that decided the standing; `REPO-MAP.md` "Standing rules" gives each rule's basis |
| `frozen` | True under `requirements/`, `schemas/`, `fixtures/`, `conformance/runner/` or `standard/annexes/` |
| `last_commit` | Committer date of the last commit that touched the file, or null |
| `current_edition_refs` | Count of the current edition's version and date coordinate, read from `CITATION.cff` |
| `stale_edition_candidates` | `{line, token}` for other GKOS edition tokens (v0.75 and later, or a dated `GKOS-YYYY-MM-DD` coordinate) in files that are not historical, release, decision, generated or asset, outside historical sections |
| `pre_standard` | `{line, count, class, d2_wording}`; `class` is `historical` in historical, release and decision files and in historical sections, otherwise `current-facing`; `d2_wording` is true when the line carries the D2 sentence |
| `graphic_needed` | `{line, id, description}` for each exact earmark `<!-- GRAPHIC-NEEDED: GN-<NNN> <one-line description> -->` outside code |
| `malformed_earmarks` | Lines with an HTML comment naming GRAPHIC-NEEDED in any other form |

## Standing vocabulary

| Standing | Meaning in the map |
| --- | --- |
| `normative` | The normative surface: the master Standard, the requirement registry and its machine companions, the annexes the current release manifest lists as `normative-annexes` (plus an annex whose own status line says normative), and the active top-level schemas |
| `informative` | Current explanatory material that says it is informative, or sits in a folder whose README says so |
| `proposed` | Provisional, proposed or prepared-not-executed material; not adopted |
| `decision` | Development decision records, owner clarifications, directives and the claims policy |
| `historical` | Archive folders, dated review records, superseded records and documents that call themselves historical |
| `release` | Release packages, release candidates and records under `docs/releases/`; immutable |
| `generated` | Written by a named script; edit the source, then regenerate |
| `process` | Repository machinery and policy: CI, scripts, the conformance runner, executable fixture data, configuration, edition metadata, project policy files and this ICM layout |
| `asset` | Images, diagram sources and binary evidence |
| `unclassified` | No rule resolved it. The map does not guess; a person decides and the rule set or the document's status line is updated |

Section rule: inside a current file, a heading that begins "Historical" or "History", and every released section of `CHANGELOG.md`, is treated as historical for the wording and edition scans.

## Area trackers and the edit ledger

Every area has one tracker in `areas/`. A tracker is informative and hand-written. Each one has the same sections: Purpose, Current and historical items, Major and minor items, Governing workflow, Edit ledger.

The edit ledger is append-only. Add one row per change that lands or is planned: `Date | Item | Change | PR | Run`. Use `planned` in the Change text until the change is merged, and `-` for a PR that does not exist yet. Never rewrite an earlier row; add a new row that corrects it. A run's worker proposes ledger rows in its run output when its packet does not include `docs/icm/**`; the integrator applies them.

## Limits

- The rules are heuristics over paths, status lines and headings. They are listed with their basis in `REPO-MAP.md`. A wrong standing is fixed by correcting the document's status line or the rule, never by editing the generated files.
- Candidates are leads, not findings. "Normative population unchanged from v0.81" is a correct sentence that the edition scan still lists.
- The map does not read binary files and does not scan `scripts/icm-map.mjs` or its own outputs.
- The map is not a GKOS requirement, a conformance artifact or a publication record.
