# 03-check — check the guide candidate

## Goal

Run the objective checks on the exact guide candidate commit and record each result with its command, exit code and tool version. Done means `results.json` has one entry per check below with `PASS`, `FAIL`, `BLOCKED`, `NOT_RUN` or `NOT_APPLICABLE` (with a reason).

## Governing instructions

- `.github/workflows/markdown-lint.yml` — markdownlint over `**/*.md` with `.markdownlint.jsonc`.
- `.github/workflows/link-check.yml` — relative and external links; archive folders excluded.
- `.github/workflows/release-validation.yml` — the draft-path rejection applies to new guide paths.
- `docs/icm/guide/README.md` — D2 wording and claim rules the wording check enforces.
- `conformance/CLAIMS_POLICY.md` — claim limits.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Predecessor | Candidate `commit` and `tree_sha` from the `02-draft` HANDOFF.json | Exact commit | Digest in that HANDOFF.json |
| Guide | `<guide/>` | All pages | Candidate commit |
| Map generator | `scripts/icm-map.mjs` | Full | Candidate commit |
| Lint config | `.markdownlint.jsonc` | Full | Candidate commit |
| Edition | `CITATION.cff` | `version`, `date-released` | Candidate commit |

## Dependencies

- `02-draft` accepted for this exact candidate commit.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- No source changes.

## Procedure

1. Confirm `git rev-parse HEAD` equals the candidate commit and the tree is clean.
2. Lint: `npx --yes markdownlint-cli2@0.17.2 "guide/**/*.md"`.
3. Links: run the link check the run brief names over the repository (relative files and anchors). If `lychee` is installed, also run it with the arguments in `link-check.yml`; otherwise record that part `NOT_RUN`.
4. Map: `node scripts/icm-map.mjs --check`. Then read `docs/icm/map/repo-map.json` for `guide/` entries: every `stale_edition_candidates` entry and every `pre_standard` entry with `class` `current-facing` and `d2_wording` false is a finding.
5. Headers: every page's first lines say informative and name the current edition from `CITATION.cff`.
6. Claim discipline: `git diff <base_commit>..HEAD -U0 -- guide | grep -niE '\b(first|only|novel|certified|recognized|admissible|approved|compliant|conformant|qualif)'`. Classify each hit as quoted text, a negation or a claim to rewrite.
7. Draft-path rule: `git ls-files guide | grep -E '/(draft|pre-0\.75|v0\.[0-6])'` must print nothing.
8. Mirror: `python <share>/_work/ICM/_core/tools/icm_check.py compare guide <share>/_work/ICM/gkos-standard/guide`.
9. Write `results.json` and logs, then `HANDOFF.json` last.

## Verification

Objective:

- Each check entry records argv, exit code, tool version and the candidate commit.
- `git status --porcelain` is empty after the run.

Interpretation:

- Is every claim-discipline hit classified correctly?
- Is a `NOT_RUN` covered by a required check on the pull request?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Results | `<run>/output/<task-id>/<attempt>/results.json` | `checks[]`: `id`, `argv`, `exit_code`, `result`, `reason`, `log`, `tool_versions`, `commit` |
| Findings | `<run>/output/<task-id>/<attempt>/findings.md` | Map, header and claim findings with `path:line` |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template; counts by result |

## Failure behavior

- A check fails → record `FAIL`, run the others, submit; the coordinator decides on a new `02-draft` attempt.
- A tool or the share is unavailable → `NOT_RUN` with the reason; never `PASS`.
- A check modifies tracked files → stop and report it.
