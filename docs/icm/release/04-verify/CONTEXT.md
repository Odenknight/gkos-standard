# 04-verify — exact-candidate evidence for the owner

## Goal

Rerun every required check on the exact package commit and collect the hosted check results for that commit, then give the owner one evidence table: candidate SHA and tree, each check with result and link, limitations, proposed date and proposed tag target. Done means `evidence.md` binds every row to the same commit and lists the owner decisions that remain.

## Governing instructions

- `decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md` — G82-07: the nine blocking checks must pass on the exact candidate; informative lanes cannot replace a failed blocking lane; absence of a separate replication is reported. G82-11: the owner receives SHA, evidence table, limitations, proposed date and tag target.
- `docs/releases/V0821_PUBLICATION_CONTROL.md` — required release controls 1–3; do not substitute an earlier commit's CI.
- `.github/workflows/release-validation.yml`, `.github/workflows/conformance-runner.yml`, `.github/workflows/markdown-lint.yml`, `.github/workflows/link-check.yml`, `.github/workflows/checksum.yml` — the commands behind the required checks.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Package | `<run>/output/<task-id>/<attempt>/package-record.json` from `03-package` | Commit and tree | Digest in its HANDOFF.json |
| Gate map | `<run>/output/<task-id>/<attempt>/gate.md` | Gate list | Digest in its HANDOFF.json |
| Prior evidence table | `releases/2026-09-24-v0.82.1/EVIDENCE_INDEX.md` | Layout precedent | Packet `base_commit` |
| Publication precedent | `docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.md` | Check table layout | Packet `base_commit` |

## Dependencies

- `03-package` accepted for this exact commit.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`. A disposable worktree for local reruns. No source changes.

## Procedure

1. Fresh worktree with tags at the package commit (as in `edit/04-check`).
2. Local reruns, each recorded with argv and exit code: the `edit/04-check` command set; `node conformance/runner/registry-lint.mjs --require-mutation-coverage`; `cd conformance/runner && npm audit --audit-level=high`; `node scripts/release-source-checksums.mjs --check releases/<date>-v<version>`.
3. Read the required check names from the main-branch ruleset (read-only): `gh api repos/Odenknight/gkos-standard/rulesets/22155498 --jq '.rules[] | select(.type=="required_status_checks") | .parameters.required_status_checks[].context'`. At the base commit these are `lint`, `links`, `validate`, `checksums`, `blocking dependency audit / Node 24` and the four `blocking <os> / Node <22|24>` lanes.
4. Collect hosted results for the exact commit (run from a workstation; the self-hosted runner has no `gh` or `jq`): `gh api repos/Odenknight/gkos-standard/commits/<sha>/check-runs?per_page=100 --jq '.check_runs[] | [.name,.conclusion,.head_sha,.html_url] | @tsv'`.
5. Build `evidence.md`: one row per required check (result, URL, head SHA), local reruns, limitations (no independent replication unless one exists), proposed date, proposed tag `v<version>` and target SHA. End with the owner decisions: merge method, the publication authorization the controlling record requires (its authorization model in `gate.md`), ruleset handling, signing.
6. Write `HANDOFF.json` last.

## Verification

Objective:

- Every hosted check row's `head_sha` equals the package commit.
- All nine required contexts are present with conclusion `success`, or the gap is listed.

Interpretation:

- Is any row borrowed from another commit or an informative lane?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Evidence table | `<run>/output/<task-id>/<attempt>/evidence.md` | Owner-facing table plus limitations and decisions |
| Raw check data | `<run>/output/<task-id>/<attempt>/check-runs.json` | `gh api` output |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- A required check failed or is missing → report it; recommend no publication decision until it passes on a new commit.
- Hosted checks still queued (single runner) → wait or report `BLOCKED`; never cite a superseded commit's results.
