# 03-checks — run existing validators read-only

## Goal

Execute the repository's existing deterministic checks that bear on the frozen question, in a disposable worktree at `base_commit`, and record each with argv, exit code, environment and output location. Done means `results.json` has one entry per required check from `scope.json`, each `PASS`, `FAIL`, `BLOCKED`, `NOT_RUN` or `NOT_APPLICABLE` with a reason, and the source checkout is unchanged.

## Governing instructions

- `conformance/README.md` — runner usage; an adapter that omits a declared graph observation reports `UNEVALUATED`, emits no profile claim and exits non-zero; the external-run pinning list.
- `.github/workflows/conformance-runner.yml` — CI commands: `npm ci`, `npm audit --audit-level=high`, `npm test`; blocking Ubuntu/Windows × Node 22/24; Node 23 informative only.
- `.github/workflows/release-validation.yml` — `bash scripts/check-current-release.sh` after `npm ci`.
- `.gitignore` — ignores the runner's default claim output and the SRTP draft report inside `conformance/runner/`; the GCP-6 replay output directory is not ignored, so it must be redirected.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Predecessor | `<run>/output/<task-id>/<attempt>/inputs.json` | Full | Digest in its HANDOFF.json |
| Runner scripts | `conformance/runner/package.json` | `scripts` block | Packet `base_commit` |
| Runner | `conformance/runner/run.mjs` | CLI flags `--adapter`, `--out`, `--attested-by` | Packet `base_commit` |
| Registry lint | `conformance/runner/registry-lint.mjs` | Flags | Packet `base_commit` |
| Lockfile | `conformance/runner/package-lock.json` | Full; must stay byte-identical | Packet `base_commit` |
| Release check | `scripts/check-current-release.sh` | Full | Packet `base_commit` |

## Dependencies

- `02-sources` accepted.

## Allowed writes

- A disposable worktree outside the source checkout, discarded after the run.
- `output_ref`: `<run>/output/<task-id>/<attempt>/` for `results.json`, logs and any runner output redirected there.
- No source changes; no commits.

## Procedure

Commands are copied from the files named. They were not executed by the author of this contract.

1. Create the worktree with tags (needed by the release check):

   ```sh
   git fetch --tags --unshallow origin || git fetch --tags origin
   git worktree add <tmp-worktree> <base_commit>
   cd <tmp-worktree>/conformance/runner
   ```

2. Install exactly (from conformance-runner.yml): `npm ci`.
3. Runner tests and registry lint (from `conformance/runner/package.json`): `npm test`.
4. Mutation coverage when gate codes or Track A are in scope (from `conformance/runner/package.json`): `npm run lint:mutation-coverage`.
5. SRTP draft suite only for that question class (from `conformance/runner/package.json`): `npm run srtp:draft`. Its report always has `profiles_claimed: []`.
6. Full adapter run only when the packet supplies a pinned implementation build (from `conformance/README.md`):

   ```sh
   GKOS_ENGINE_DIST=<pinned-engine-dist>/kosmos-core.mjs \
     node run.mjs --adapter ./adapters/gkos-engine.mjs --attested-by "<worker-id>" \
     --out <run>/output/<task-id>/<attempt>/conformance-claim.json
   ```

   Without a pinned build, record `BLOCKED`; do not fabricate an adapter or observation.
7. GCP-6 replay only in the disposable worktree, with output redirected (from `conformance/runner/package.json` script `gcp6:replay`): `node replay-fixture.mjs --out-dir <run>/output/<task-id>/<attempt>/gcp6-replay-evidence`.
8. Publication-status dimension (from release-validation.yml), from the worktree root: `bash scripts/check-current-release.sh`.
9. Confirm the worktree is clean: `git status --porcelain` shows no tracked changes and `git diff --exit-code conformance/runner/package-lock.json` exits 0.
10. Write `results.json`, then `HANDOFF.json` last; remove the worktree.

## Verification

Objective:

- `node --version` and `npm --version` recorded; the blocking CI matrix uses Node 22 and 24.
- Lockfile unchanged (`git diff --exit-code conformance/runner/package-lock.json` exits 0).
- `results.json` has an entry for each `required_checks` item in `scope.json`.

Interpretation:

- Does any check result depend on a masked field or an unpinned external build?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Results | `<run>/output/<task-id>/<attempt>/results.json` | `checks[]`: `id`, `subject`, `expected`, `argv`, `cwd`, `exit_code`, `result`, `reason`, `log`, `node_version`, `commit` |
| Logs and runner outputs | `<run>/output/<task-id>/<attempt>/logs/` | Plain text and JSON as emitted |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template; counts by result |

## Failure behavior

- `npm ci` cannot reach the registry → every dependent check `NOT_RUN` with the error; continue with checks that do not need it.
- Runner exits non-zero because a catalog is non-qualifying → record the actual exit code and per-fixture states; this is expected behavior, not a tool failure.
- A tracked file changes during the run → stop; discard the worktree; report which command wrote it.
