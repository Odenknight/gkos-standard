# 05-owner-actions — verify each publication action, in order, without performing any

## Goal

After each publication action, verify it against the commit the edition's controlling record authorizes, and record what was observed and who acted. The owner, or an executor the owner authorized in the edition's control record, performs every step; the verifying agent only reads repository state and reports. Done means `owner-actions.json` names the controlling record and its authorization model, has one entry per step with `VERIFIED`, `NOT_YET` or `MISMATCH`, the actor and the evidence, and verification stopped at the first step that is not `VERIFIED`.

## Governing instructions

- `decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md` — G82-10 (pull requests, mandatory checks, the `v*` tag ruleset, no force update or deletion, verified signed annotated tag) and, for v0.82, G82-11 (separate explicit owner publication disposition after the frozen SHA and evidence are presented; no agent, CI service, workflow, timeout or delegated executor substitutes for it).
- `docs/releases/V0821_PUBLICATION_CONTROL.md` — for v0.82.1: the owner's authorization is prospective and conditioned on successful validation; the executor binds it to the final tested commit in the signed tag annotation and the publication receipt; it is not an exact-SHA approval, and R24's v0.82 ceremony is not reused ("Scope and disposition"). Controls 3–6: rerun mandatory push checks on the exact main commit; signed annotated tag with attestation; verify signature, owner key, target, tagger and post-tag workflow; publish the Release as developmental; restore the tag rule immediately after the push.
- `docs/releases/GKOS_2026-09-22_v0.82_PUBLICATION_RECORD.md` — "Identity and authority" (the exact-SHA owner disposition) and "Release controls" (the observed ruleset sequence for v0.82).
- `docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.md` — "Authorization and verification": the prospective authorization bound to the tested commit; no later exact-SHA owner approval.
- `scripts/verify-v0821-release.mjs` — the `--post-tag` assertions (tag object type, GitHub verification, tagger email, target, ancestry, attestation with `authorization.basis` `owner-session-publication-authorization` and `authorization.separate_exact_sha_approval` `false`, signing key fingerprint, check evidence).
- `GOVERNANCE.md` — publication is a development decision of the Founder and Initial Editor, never independent approval.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Gate map | `<run>/output/<task-id>/<attempt>/gate.md` from `01-gate` | Controlling record and authorization model | Digest in its HANDOFF.json |
| Evidence table | `<run>/output/<task-id>/<attempt>/evidence.md` from `04-verify`, or on late entry the verified prior evidence the packet names | Candidate SHA, tree, proposed tag | Digest in its HANDOFF.json, or path and blob SHA-256 at `base_commit` |
| Authorization | Reference recorded in the packet (`<authorization-ref>`): the owner disposition, or the control record and its scope quotes | Exact wording; the SHA it names, or the binding rule | As recorded |
| Exact-SHA precedent | `docs/releases/GKOS_2026-09-22_v0.82_PUBLICATION_RECORD.json` | `authorization` | Packet `base_commit` |
| Executor-bound precedent | `docs/releases/GKOS_2026-09-24_v0.82.1_PUBLICATION_RECORD.json` | `authorization`, `tag_signature`, `ruleset` | Packet `base_commit` |
| Post-tag precedent | `.github/workflows/v0821-post-tag-verification.yml` | Steps | Packet `base_commit` |

## Dependencies

- `04-verify` accepted, or, on late entry, verified prior evidence named in the packet for `01-gate` through `04-verify` (router, "Skips and late entry").
- Each step below depends on the previous step being `VERIFIED`.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`, including downloaded release assets for hashing.
- No source changes, no pushes, no tags, no ruleset or release changes, no PR merges, no workflow dispatches.

## Procedure

All commands are read-only and were not executed by the author of this contract.

1. **Authorization model.** Take it from `gate.md` or the controlling record. If neither states one, stop `BLOCKED`.
   - `exact-sha-disposition` (v0.82, R24 G82-11): an explicit owner publication disposition, given after the frozen commit and its passing checks were presented, naming the exact SHA ("APPROVE v0.82 PUBLICATION at e2a3dd49…").
   - `prospective-executor-bound` (v0.82.1, `docs/releases/V0821_PUBLICATION_CONTROL.md`): the owner authorized an executor in advance for named actions (preparation, commits, pushes, pull requests, merges after required checks, signed tag creation and GitHub Release publication; then, separately, a narrowly scoped tag-creation ruleset change). The executor binds the authorization to the tested commit in the signed tag annotation. No separate exact-SHA approval exists; `scripts/verify-v0821-release.mjs` asserts `separate_exact_sha_approval` is `false`.
2. **Actor for every step.** Record who acted: `owner`, or `authorized-executor` with its identity as the evidence shows it (`mergedBy`, commit trailers, tagger) and the authority reference. If the control record does not name the executor, say so; do not infer an identity. v0.82.1 precedent: the control record says "the release executor" without a name; the squash commits of PR #62 and PR #64 carry `Co-authored-by: Codex <codex@local>`; the tag's tagger is Shaun Allan Marshall with the owner's signing key.
3. **Merge.** `gh pr view <pr> -R Odenknight/gkos-standard --json state,mergedAt,mergedBy,mergeCommit,headRefOid`. Tree equality: `git rev-parse <merge-commit>^{tree}` must equal `git rev-parse <pr-head>^{tree}`. Under `prospective-executor-bound`, the merge must follow passing required checks, as the authorization requires.
4. **Exact-commit push checks.** `gh api repos/Odenknight/gkos-standard/commits/<merge-commit>/check-runs?per_page=100` shows all nine required contexts `success` on `head_sha` = the merge commit.
5. **Publication authorization, per the model.**
   - `exact-sha-disposition`: record the owner's disposition reference and the SHA it names. A general "looks good", or an approval of another SHA, is `MISMATCH`. Never infer approval.
   - `prospective-executor-bound`: confirm the control record is in the tagged tree (`git cat-file -e <tag-target>:<control-record-path>`), quote the scope it grants, and check that every observed action falls inside that scope. The binding to the commit is checked in step 7 from the signed annotation. A claimed separate exact-SHA approval that the records do not contain is `MISMATCH`.
6. **Tag ruleset change.** `gh api repos/Odenknight/gkos-standard/rulesets` and `gh api repos/Odenknight/gkos-standard/rulesets/22155727 --jq '{enforcement, conditions, rules: [.rules[].type], bypass_actors}'`. Expect only the one tag excluded (v0.82 pattern) or a per-tag owner creation ruleset (v0.82.1 pattern, rulesets 23971029 and 23971030 at the base date). Update and deletion protection must stay active.
7. **Signed annotated tag.** `gh api repos/Odenknight/gkos-standard/git/ref/tags/v<version>` (object type `tag`), then `gh api repos/Odenknight/gkos-standard/git/tags/<tag-object-sha> --jq '{verified: .verification.verified, tagger: .tagger, target: .object.sha}'`. Expect verified `true`, tagger Shaun Allan Marshall with `40664141+Odenknight@users.noreply.github.com`, and target = the authorized commit: the SHA named in the disposition, or the tested commit bound in the annotation. Locally: `git fetch --tags origin && git rev-list -n1 v<version>` and `git merge-base --is-ancestor <merge-commit> origin/main`. Under `prospective-executor-bound`, read the annotation (`git for-each-ref --format='%(contents)' refs/tags/v<version>`) and check that its attestation names the same commit and the control record's authorization basis. For v0.82.1, run `node scripts/verify-v0821-release.mjs --post-tag` from a worktree at the tag; it asserts these fields.
8. **Ruleset restored.** Ruleset 22155727 shows `exclude: []`, include `refs/tags/v*`, rules `creation`, `update`, `deletion`, no bypass actors; any temporary creation route is removed.
9. **Post-tag verification.** The version's post-tag workflow and tag-push workflows succeeded: `gh api repos/Odenknight/gkos-standard/commits/<merge-commit>/check-runs?per_page=100`. If the workflow failed for an environment reason (v0.82: runner lacked `gh`), record the deviation exactly; do not relabel it as passed.
10. **GitHub Release.** `gh release view v<version> -R Odenknight/gkos-standard --json tagName,name,publishedAt,isDraft,isPrerelease,assets`. Download each asset into `output_ref` and compare SHA-256 with the package inventory. Record `publishedAt` in UTC and the America/New_York date.
11. Write `owner-actions.json`, then `HANDOFF.json` last.

## Verification

Objective:

- Every `VERIFIED` entry has the command, its raw output file, the compared values and the actor with its evidence.
- The tag target, merge commit and authorized commit (the disposition's SHA, or the commit bound in the signed annotation) are the same value.
- Under `prospective-executor-bound`, the annotation's attestation names that commit and the control record's authorization basis.

Interpretation:

- Is any step marked `VERIFIED` from a statement rather than observed repository state?
- Is any actor recorded as the owner, or as a named executor, without evidence?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Owner actions | `<run>/output/<task-id>/<attempt>/owner-actions.json` | `controlling_record`, `authorization_model` (`exact-sha-disposition` or `prospective-executor-bound`), `authorization_ref`; `steps[]`: `step`, `actor` (`owner` or `authorized-executor`), `actor_evidence`, `authority_ref`, `status` (`VERIFIED`, `NOT_YET`, `MISMATCH`), `evidence`, `observed_at` |
| Raw outputs | `<run>/output/<task-id>/<attempt>/raw/` | `gh` JSON and asset hashes |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- No authorization model can be taken from the controlling record → `BLOCKED`; owner decision required.
- A step is `NOT_YET` → stop; report the next action needed; do not prompt anyone to skip it.
- `MISMATCH` (tree differs, tag targets another commit, signature unverified, a disposition names another SHA, an annotation binds another commit, or an action falls outside the authorization's scope) → stop; report to the coordinator and owner; nothing downstream starts.
- A ruleset stays relaxed after the tag push → report it to the owner immediately as an open control gap.
