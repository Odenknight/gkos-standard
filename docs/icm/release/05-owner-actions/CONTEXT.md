# 05-owner-actions — verify each owner action, in order, without performing any

## Goal

After the owner acts, verify each publication step against the approved commit and record what was observed. The owner performs every step; the agent only reads repository state and reports. Done means `owner-actions.json` has one entry per step with `VERIFIED`, `NOT_YET` or `MISMATCH` and the evidence, and verification stopped at the first step that is not `VERIFIED`.

## Governing instructions

- `decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md` — G82-10 (pull requests, mandatory checks, the `v*` tag ruleset, no force update or deletion, verified signed annotated tag) and G82-11 (separate explicit owner publication disposition; no agent, CI service, workflow, timeout or delegated executor substitutes for it).
- `docs/releases/V0821_PUBLICATION_CONTROL.md` — controls 3–6: rerun mandatory push checks on the exact main commit; signed annotated tag with attestation; verify signature, owner key, target, tagger and post-tag workflow; publish the Release as developmental; restore the tag rule immediately after the push.
- `docs/releases/GKOS_2026-09-22_v0.82_PUBLICATION_RECORD.md` — "Release controls": the observed ruleset sequence for v0.82.
- `scripts/verify-v0821-release.mjs` — the `--post-tag` assertions (tag object type, GitHub verification, tagger email, target, ancestry, attestation, signing key fingerprint, check evidence).
- `GOVERNANCE.md` — publication is a development decision of the Founder and Initial Editor, never independent approval.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Evidence table | `<run>/output/<task-id>/<attempt>/evidence.md` from `04-verify` | Approved candidate SHA, tree, proposed tag | Digest in its HANDOFF.json |
| Owner disposition | Reference recorded in the packet (`<owner-disposition-ref>`) | Exact wording and the SHA it names | As recorded |
| Post-tag precedent | `.github/workflows/v0821-post-tag-verification.yml` | Steps | Packet `base_commit` |

## Dependencies

- `04-verify` accepted.
- Each step below depends on the previous step being `VERIFIED`.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`, including downloaded release assets for hashing.
- No source changes, no pushes, no tags, no ruleset or release changes, no PR merges, no workflow dispatches.

## Procedure

All commands are read-only and were not executed by the author of this contract.

1. **Merge (owner).** `gh pr view <pr> -R Odenknight/gkos-standard --json state,mergedAt,mergedBy,mergeCommit,headRefOid`. Tree equality: `git rev-parse <merge-commit>^{tree}` must equal `git rev-parse <pr-head>^{tree}`.
2. **Exact-commit push checks.** `gh api repos/Odenknight/gkos-standard/commits/<merge-commit>/check-runs?per_page=100` shows all nine required contexts `success` on `head_sha` = the merge commit.
3. **Owner approval bound to the exact main SHA (owner).** Record the owner's disposition reference and the SHA it names (v0.82 used the explicit "APPROVE v0.82 PUBLICATION" disposition). A general "looks good" or an earlier approval of another SHA is `MISMATCH`. Never infer approval.
4. **Tag ruleset change (owner).** `gh api repos/Odenknight/gkos-standard/rulesets` and `gh api repos/Odenknight/gkos-standard/rulesets/22155727 --jq '{enforcement, conditions, rules: [.rules[].type], bypass_actors}'`. Expect only the one tag excluded (v0.82 pattern) or a per-tag owner creation ruleset (v0.82.1 pattern, rulesets 23971029 and 23971030 at the base date). Update and deletion protection must stay active.
5. **Signed annotated tag (owner).** `gh api repos/Odenknight/gkos-standard/git/ref/tags/v<version>` (object type `tag`), then `gh api repos/Odenknight/gkos-standard/git/tags/<tag-object-sha> --jq '{verified: .verification.verified, tagger: .tagger, target: .object.sha}'`. Expect verified `true`, tagger Shaun Allan Marshall with `40664141+Odenknight@users.noreply.github.com`, target = approved merge commit. Locally: `git fetch --tags origin && git rev-list -n1 v<version>` and `git merge-base --is-ancestor <merge-commit> origin/main`.
6. **Ruleset restored (owner).** Ruleset 22155727 shows `exclude: []`, include `refs/tags/v*`, rules `creation`, `update`, `deletion`, no bypass actors; any temporary creation route is removed.
7. **Post-tag verification.** The version's post-tag workflow and tag-push workflows succeeded: `gh api repos/Odenknight/gkos-standard/commits/<merge-commit>/check-runs?per_page=100`. If the workflow failed for an environment reason (v0.82: runner lacked `gh`), record the deviation exactly; do not relabel it as passed.
8. **GitHub Release (owner).** `gh release view v<version> -R Odenknight/gkos-standard --json tagName,name,publishedAt,isDraft,isPrerelease,assets`. Download each asset into `output_ref` and compare SHA-256 with the package inventory. Record `publishedAt` in UTC and the America/New_York date.
9. Write `owner-actions.json`, then `HANDOFF.json` last.

## Verification

Objective:

- Every `VERIFIED` entry has the command, its raw output file and the compared values.
- The tag target, merge commit and approved SHA are the same value.

Interpretation:

- Is any step marked `VERIFIED` from a statement rather than observed repository state?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Owner actions | `<run>/output/<task-id>/<attempt>/owner-actions.json` | `steps[]`: `step`, `actor` (`owner`), `status` (`VERIFIED`, `NOT_YET`, `MISMATCH`), `evidence`, `observed_at` |
| Raw outputs | `<run>/output/<task-id>/<attempt>/raw/` | `gh` JSON and asset hashes |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- A step is `NOT_YET` → stop; report the next owner action needed; do not prompt anyone to skip it.
- `MISMATCH` (tree differs, tag targets another commit, signature unverified, approval names another SHA) → stop; report to the coordinator and owner; nothing downstream starts.
- A ruleset stays relaxed after the tag push → report it to the owner immediately as an open control gap.
