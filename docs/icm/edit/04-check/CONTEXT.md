# 04-check — run the repository's validators on the exact candidate

## Goal

Run the checks this repository's CI enforces, plus the claim-discipline check, against the exact candidate commit from `03-draft`, and record each result with its command, exit code, tool version and commit. Done means `results.json` has one entry per required check with `PASS`, `FAIL`, `BLOCKED`, `NOT_RUN` or `NOT_APPLICABLE` (with a reason). Local results inform the coordinator; the required status checks on the pull request remain the repository's gate.

## Governing instructions

- `.github/workflows/markdown-lint.yml` — job `lint`: `DavidAnson/markdownlint-cli2-action@v19` over `**/*.md` with the repository's `.markdownlint.jsonc`.
- `.github/workflows/link-check.yml` — job `links`: `lycheeverse/lychee-action@v2` over `**/*.md`, archive folders excluded, plus `.lycheeignore`.
- `.github/workflows/checksum.yml` — job `checksums`: every checksum list under `releases/` and `release-candidates/` must verify.
- `.github/workflows/release-validation.yml` — job `validate`: required files, the draft-path rejection, `bash scripts/check-current-release.sh`, release-candidate integrity, v0.81 source integrity.
- `.github/workflows/conformance-runner.yml` — dependency audit and the blocking Ubuntu/Windows × Node 22/24 runner matrix; Node 23 is informative only.
- `conformance/CLAIMS_POLICY.md` — claim wording limits.
- `.gitattributes` — checksums are computed over LF blobs.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Predecessor | Candidate `commit` and `tree_sha` from the `03-draft` HANDOFF.json | Exact commit | Digest in that HANDOFF.json |
| Lint config | `.markdownlint.jsonc` | Full | Candidate commit |
| Link config | `.lycheeignore` | Full | Candidate commit |
| Runner scripts | `conformance/runner/package.json` | `scripts` | Candidate commit |
| Release check | `scripts/check-current-release.sh` | Full | Candidate commit |
| Release check | `scripts/check-v0821-release.sh` | Full | Candidate commit |

## Dependencies

- `03-draft` accepted for this exact candidate commit.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/` (results and logs).
- A disposable worktree outside the source checkout for running checks. `npm ci` writes `conformance/runner/node_modules/` there (ignored by `.gitignore`). No source changes.

## Procedure

Commands below are copied from the named files. They were not executed by the author of this contract; the worker executes them and records the outcome.

1. Prepare a worktree with tags. A shallow clone has no tags, and both `scripts/verify-v0821-release.mjs` (`git diff v0.82`) and `scripts/release-source-checksums.mjs --check` (prefers the local tag) need them:

   ```sh
   git fetch --tags --unshallow origin || git fetch --tags origin
   git worktree add <tmp-worktree> <candidate-commit>
   cd <tmp-worktree>
   ```

2. Markdown lint (CI: markdown-lint.yml). Local equivalent, proposed: `npx markdownlint-cli2 "**/*.md"`. Record the markdownlint-cli2 version; it may differ from the action's pinned version.
3. Link check (CI: link-check.yml). If `lychee` is installed locally, run it with the arguments in the workflow file; otherwise record `NOT_RUN` and rely on the PR's `links` check.
4. Release checksums (from checksum.yml):

   ```sh
   for f in releases/*/SHA256SUMS.txt release-candidates/*/SHA256SUMS.txt; do
     [ -f "$f" ] || continue
     (cd "$(dirname "$f")" && sha256sum -c SHA256SUMS.txt)
   done
   ```

5. Release validation (from release-validation.yml):

   ```sh
   test -f README.md && test -f LICENSE.md && test -f standard/00_GKOS_Master_Standard.md \
     && test -f decisions/GKOS_Decision_Register.md && test -f SECURITY.md
   if find . -type f | grep -E '/(draft|pre-0\.75|v0\.[0-6])' ; then exit 1; fi
   (cd conformance/runner && npm ci)
   bash scripts/check-current-release.sh
   (cd release-candidates/v0.81-rc1 && sha256sum -c SHA256SUMS.txt)
   (cd release-candidates/v0.82-rc1 && sha256sum -c SHA256SUMS.txt)
   node scripts/v081-source-checksums.mjs --check releases/2026-09-03-v0.81
   ```

6. Conformance runner (from conformance-runner.yml and `conformance/runner/package.json`): `cd conformance/runner && npm ci && npm audit --audit-level=high && npm test`. `npm test` runs `node --test "test/*.test.mjs"` and `npm run lint:registries`. Add `npm run lint:mutation-coverage` when the candidate touches `requirements/` or `fixtures/`.
7. Claim discipline: `git diff <base_commit>..<candidate-commit> -U0 | grep -niE '\b(first|only|novel|certified|recognized|admissible|approved|compliant|conformant|qualif)'`. Classify every hit as quoted text, an enum value, a negation, or a claim to rewrite.
8. Write `results.json` and logs, then `HANDOFF.json` last.

## Verification

Objective:

- Each check entry records argv, working directory, exit code, tool version (`node --version`, `npm --version`, markdownlint-cli2 version) and the candidate commit.
- `git -C <tmp-worktree> rev-parse HEAD` equals the candidate commit and `git status --porcelain` shows no tracked changes after the run.

Interpretation:

- Is every claim-discipline hit classified correctly?
- Does a local `NOT_RUN` leave a gap the PR's required checks will not cover?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Results | `<run>/output/<task-id>/<attempt>/results.json` | `checks[]`: `id`, `argv`, `cwd`, `exit_code`, `result` (`PASS`, `FAIL`, `BLOCKED`, `NOT_RUN`, `NOT_APPLICABLE`), `reason`, `log`, `tool_versions`, `commit` |
| Logs | `<run>/output/<task-id>/<attempt>/logs/` | Plain text per check |
| Claim hits | `<run>/output/<task-id>/<attempt>/claim-hits.md` | Each hit with classification |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template; counts by result |

## Failure behavior

- A check fails → record `FAIL`, keep running the others, submit; the coordinator decides on a new `03-draft` attempt.
- A tool is missing (lychee, network for `npm ci`) → `NOT_RUN` with the reason; never `PASS`.
- `scripts/check-current-release.sh` fails only because tags are missing → `BLOCKED` with the fetch error; do not edit the script.
- Running a check modifies tracked files → stop; discard the worktree; report it.
