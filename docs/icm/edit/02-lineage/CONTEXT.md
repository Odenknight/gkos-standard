# 02-lineage — resolve current records, controlling decisions and covering files

## Goal

For every target in `scope.json`, state which record is current, what it supersedes or is superseded by, which decision controls it, and every other file whose bytes, counts or claims cover it. Done means `lineage.md` answers those four questions per target and lists the validator impact, with unresolved conflicts marked `contested`.

## Governing instructions

- `requirements/REGISTRY.md` — append-only; an allocated ID is never deleted, renumbered or reused; status and replacement changes are ledger rows; `R13-102` is never allocated.
- `decisions/GKOS_Decision_Register.md` — the standing of each R-series record (accepted, informative, prospective, proposed) and owner clarifications without an R-number.
- `decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md` — section 3 Option A: R23 targets the next normative edition after v0.82; historical wording stays unaltered.
- `docs/CORPUS-STATUS.md` — preserve historical sources; publish successors rather than revise release evidence.
- `docs/ecosystem/REVIEW_DISPOSITION_REGISTER.md` — disposition vocabulary; agreement between drafts or models is not verification.
- `docs/ecosystem/AMBIGUITY_REGISTER.md` — `EAR-*` IDs are not requirements; an ambiguity is not a waiver.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Predecessor | `<run>/output/<task-id>/<attempt>/scope.json` from `01-intake` | Full file | SHA-256 in its HANDOFF.json |
| Release validator | `scripts/check-current-release.sh` | Files it greps and counts | Packet `base_commit` |
| Release validator | `scripts/verify-v0821-release.mjs` | Frozen paths and asserted counts | Packet `base_commit` |
| Release manifest | `releases/2026-09-24-v0.82.1/RELEASE_MANIFEST.yml` | Decision classes, counts | Packet `base_commit` |
| Coordinate pins | `docs/releases/V082_COORDINATE_CONSOLIDATION.md` | Historical machine-readable pins | Packet `base_commit` |
| Changelog | `CHANGELOG.md` | `## Unreleased` and entries naming the targets | Packet `base_commit` |

## Dependencies

- `01-intake` accepted, with a permitting rule recorded.

## Allowed writes

- `output_ref` from the packet: `<run>/output/<task-id>/<attempt>/`.
- No source changes in this stage.

## Procedure

1. Confirm the assignment generation and that `01-intake` is accepted; verify the `scope.json` digest.
2. Requirement targets: read the "Active allocations" row, every ledger row naming the ID, and the "Replacement mapping" column. Follow mappings to their end and report every hop. Example at the base commit: `GKOS-DELEGATION-004` is still a row in "Active allocations" with status "Superseded for the v0.81 development line" and maps to `GKOS-REVIEW-001..003` under R18-128; it is counted in the 62 permanent allocations.
3. Decision targets: read the register entry and the record's own status line. Accepted records are named `R<N>_<Title>_Development_Decision_Record.md`. `decisions/R13_Conformance_Honesty_and_Alignment_Proposal.md` is a preserved proposal beside its accepted record, not a second current record. PR #53 renamed R23's accepted record to drop a stale `_Proposal` filename; do not repeat that error.
4. Coverage: `git grep -n "<id-or-filename>"` across the tree. Record each index, README, register row, machine companion (`requirements/*.json`), fixture manifest, release manifest and changelog entry that names the target.
5. Validator impact: mark a target `frozen` if it is under `requirements/`, `schemas/`, `fixtures/`, `conformance/runner/` or `standard/annexes/` (asserted unchanged from tag `v0.82` while `CITATION.cff` is 0.82.1), and `counted` if it changes the 62-row "Active allocations" count or the 28 gate codes. Mark `grepped` if `scripts/check-current-release.sh` or `scripts/verify-v0821-release.mjs` reads it (README coordinate line, master Standard, `CHANGELOG.md` heading, `CITATION.cff`, `.zenodo.json`).
6. Conflicts: if two records both look current, keep both and mark the pair `contested`. A newer date alone does not resolve it.
7. If lineage shows another file must change, write a scope revision request; do not widen scope yourself.
8. Write `lineage.md`, then `HANDOFF.json` last.

## Verification

Objective:

- Each target in `scope.json` has a row in `lineage.md`.
- Each replacement mapping cited is quoted from `requirements/REGISTRY.md` with a line number at `base_commit`.
- Validator impact flags agree with a path test against the five frozen directories.

Interpretation:

- Is any record treated as current only because it was easier to find?
- Are all covering files (indexes, counts, citations) listed, so the draft cannot leave them stale?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Lineage | `<run>/output/<task-id>/<attempt>/lineage.md` | Table per target: current record, superseded records, controlling decision, covering files with `path:line`, validator impact (`frozen`, `counted`, `grepped`, `none`), conflicts |
| Scope revision request | `<run>/output/<task-id>/<attempt>/scope-revision.md` | Only when needed: paths to add and why |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- `scope.json` digest differs from the accepted handoff → stop; report `stale`.
- A target is `frozen` or `counted` and the packet has no owner decision covering the release-line consequence → `BLOCKED`; describe the decision needed (new edition, validator change, or no change).
- Unresolvable conflict → continue with other targets; mark the conflict `contested`; the stage may still be `submitted`.
