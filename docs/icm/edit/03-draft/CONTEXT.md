# 03-draft — make the change on one branch inside the declared scope

## Goal

Produce one commit (or a short series) on the packet's branch that makes the scoped change additively, changes only `write_scope` paths, preserves every stable ID and all history, and labels agent-authored assessments as proposed. Done means the candidate commit exists, `git diff --name-only <base_commit>..HEAD` is a subset of `write_scope`, and shared-file changes are proposed as rows for the integrator.

## Governing instructions

- `CONTRIBUTING.md` — every commit intended for merge carries a DCO 1.1 sign-off (`git commit -s`); documentation is CC BY 4.0, software-oriented material Apache-2.0; a proposal author may not describe its own work as approved or certified.
- `LICENSE.md` — licence routing by material type; this repository uses no per-file SPDX headers.
- `GOVERNANCE.md` — a Development Decision Record must disclose evidence and review considered, change class, decision and limitations, material conflicts, release or rollback route, and whether review was advisory, independent or self-attested.
- `conformance/CLAIMS_POLICY.md` — bounded, exact claims only; "GKOS certified" is reserved; no unqualified "GKOS-compliant" or "GKOS-conformant".
- `requirements/REGISTRY.md` — append-only rules (header paragraph and ledger).
- `.gitattributes` — LF line endings in blobs and working tree; checksum manifests depend on it.
- `.markdownlint.jsonc` — lint rules every new or changed Markdown file must pass.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Assignment | Task packet `tasks/<task-id>.json` | `write_scope`, `branch`, `base_commit` | SHA-256 in `RUN.json` |
| Predecessor | `<run>/output/<task-id>/<attempt>/scope.json` | Full file | Digest in its HANDOFF.json |
| Predecessor | `<run>/output/<task-id>/<attempt>/lineage.md` | Full file; absent when the packet records `02-lineage` as `NOT_APPLICABLE` | Digest in its HANDOFF.json |
| Decision template by precedent | `decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md` | Header fields and section layout | Packet `base_commit` |
| Clarification template by precedent | `docs/decisions/2026-09-24-specification-status-and-claims.md` | Status, disposition, classification, rollback lines | Packet `base_commit` |
| Targets | `<target-path>` per the scope file | Declared lines or sections | Packet `base_commit` |

## Dependencies

- `02-lineage` accepted, or recorded `NOT_APPLICABLE` in the packet with its reason under the router's "Skips and late entry" rule and the conditions in the workflow `README.md` (non-normative editorial fix only).

## Allowed writes

- Source: only the packet's `write_scope` paths, only on the packet's `branch`, created from `base_commit`.
- Shared files (`CHANGELOG.md`, `decisions/GKOS_Decision_Register.md`, `requirements/REGISTRY.md`, `README.md`, `TECHNICAL_README.md`, `ROADMAP.md`, `CITATION.cff`, `.zenodo.json`, register files under `docs/ecosystem/`, release validators, workflows, fixture manifests): only when the packet names this worker as integrator. Otherwise propose rows in `rows.md`.
- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- Never: `releases/`, `release-candidates/`, publication records under `docs/releases/`, any archive folder, another agent's branch.

## Procedure

1. Confirm the assignment generation and accepted dependencies. Create the branch: `git switch -c <branch> <base_commit>`.
2. Edit only `write_scope` paths. Per record type:
   - Requirement registry: never edit an ID or its original requirement text, and never delete a row. A new allocation, if the owner has allocated it, goes under "Accepted unpublished allocations" with a dated row in "Append-only status and replacement ledger". A status or replacement-mapping cell changes only together with a new dated ledger row that cites the owner source (precedent: the 2026-09-03 ledger row recording status cells updated on 2026-09-22).
   - Decision record: a new proposal is a new file under `decisions/` using the next unused R-number (R25 at the base commit; `git grep -n -I -w "R25" <base_commit>` exits 1, as `01-intake` checks). Name it by the convention for new records, `R<N>_<Title>_Development_Decision_Record.md`, from the start, so acceptance needs no rename (PR #53 had to rename R23's record). Status line reads "Proposed"; no acceptance date; include the `GOVERNANCE.md` disclosure list. The register row goes under "Proposed decisions" (integrator).
   - Owner clarification: new file `docs/decisions/<yyyy-mm-dd>-<slug>.md`, status "proposed" until the owner confirms.
   - Superseding an accepted record: add a successor record that names its predecessor; leave the predecessor's text unchanged.
   - `CHANGELOG.md`: one proposed line under `## Unreleased`, in `rows.md` unless you are the integrator.
3. Write in plain sentences. Label agent assessments "proposed". Do not use *first, only, novel, certified, recognized, admissible* or *approved* as claims about the work.
4. Do not name any new file or folder starting with `draft`: the release validation job rejects paths matching `/draft`.
5. Keep LF line endings. On Windows do not write files with PowerShell `Set-Content` or `Out-File`; check with `git ls-files --eol <path>` (expect `i/lf`).
6. Commit with sign-off: `git commit -s`. The coordinator states which identity signs off; never sign off in another person's name.
7. Record the candidate: `git rev-parse HEAD`, `git rev-parse HEAD^{tree}`, `git status --porcelain`.
8. Export the patch: `git format-patch <base_commit>..HEAD --stdout > <run>/output/<task-id>/<attempt>/change.patch`.
9. Write `rows.md` (proposed shared-file rows), then `HANDOFF.json` last. Push only if the packet and an owner instruction both authorize it.

## Verification

Objective:

- `git diff --name-only <base_commit>..HEAD` lists only `write_scope` paths.
- `git diff --check <base_commit>..HEAD` exits 0 (no whitespace errors), except a line ending in exactly two spaces used as a Markdown hard line break where the neighbouring lines of the same block already use that convention (for example `NOTICE.md` lines 3-4). List each such exception in the handoff.
- For `requirements/REGISTRY.md`: the ID and original-requirement-text cells of every existing row are identical to `git show <base_commit>:requirements/REGISTRY.md`, no row is removed, and every changed status or mapping cell has a matching new ledger row.
- `git log --format=%B <base_commit>..HEAD` shows a `Signed-off-by:` trailer on every commit.

Interpretation:

- Does any changed sentence claim more than the cited decision or evidence supports?
- Is superseded text still reachable from its successor?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Candidate | Packet `branch` | Commit(s); handoff records `commit`, `tree_sha`, `dirty` |
| Patch | `<run>/output/<task-id>/<attempt>/change.patch` | `git format-patch` output |
| Proposed shared rows | `<run>/output/<task-id>/<attempt>/rows.md` | Exact lines for `CHANGELOG.md`, register files, indexes, with target section |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- A needed change falls outside `write_scope` → stop that change; request a scope revision; finish the in-scope part if it stands alone.
- The base commit is no longer the tip of `main` → continue on the packet's base; report the drift; the coordinator decides on a rebase as a new attempt.
- A shared file needs a change and you are not the integrator → propose the row; do not edit the file.
