# 01-gate — confirm the owner's release gate for this edition

## Goal

Establish whether an accepted owner record controls this edition: an accepted R-series release-gate decision (R20 for v0.81, R24 for v0.82) or an owner control record (`docs/releases/V0821_PUBLICATION_CONTROL.md` for v0.82.1). Done means `gate.md` names the controlling record, the edition's release class, the authorization model the record requires, the gate list with the evidence each gate needs, and a classification of every technical-directory change showing whether the planned changes fit that class; or the stage is `BLOCKED` with the owner decision that is missing.

## Governing instructions

- `GOVERNANCE.md` — the Founder and Initial Editor adopts development decisions; releases are developmental and non-consensus.
- `decisions/R20_V081_Release_Gate_Reconciliation_and_Publication_Control_Development_Decision_Record.md` — gate register pattern G81-01..16; CI success alone cannot merge, tag, publish, qualify or certify.
- `decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md` — gates G82-01..12, including one frozen candidate (G82-04), unchanged normative population for an informative edition (G82-05: "Any change to the normative population invalidates this informative release class"), machine-readable coordinate consolidation (G82-06), the nine blocking checks (G82-07), the separate explicit owner publication disposition (G82-11) and archival verification (G82-12). Section 2 lets an informative edition carry provisional, non-normative schemas and fixtures.
- `docs/releases/V0821_PUBLICATION_CONTROL.md` — documentation-patch controls, prospective owner authorization bound by the executor to the tested commit, date convention, ruleset handling; all schemas, fixtures, requirements, runner code and normative annexes must match v0.82.
- `docs/releases/V082_COORDINATE_CONSOLIDATION.md` — the v0.82 coordinate updates and documented historical pins under G82-06.
- `docs/decisions/2026-09-24-specification-status-and-claims.md` — publication classification wording.
- `conformance/CLAIMS_POLICY.md` — publication, DOI, signature and CI do not establish conformance or certification.
- `VERSIONING.md` — section "GKOS standard claim versions": claims are exact-bound; the implementation train policy does not set the Standard's edition.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Assignment | Task packet `tasks/<task-id>.json` | Target version, owner instruction reference | SHA-256 in `RUN.json` |
| Current edition | `CITATION.cff` | `version`, `date-released` | Packet `base_commit` |
| Decision index | `decisions/GKOS_Decision_Register.md` | Proposed and accepted entries | Packet `base_commit` |
| Pending changes | `CHANGELOG.md` | `## Unreleased` | Packet `base_commit` |
| Allocations | `requirements/REGISTRY.md` | "Accepted unpublished allocations" | Packet `base_commit` |
| Last package | `releases/2026-09-24-v0.82.1/RELEASE_MANIFEST.yml` | Release class fields and counts | Packet `base_commit` |

## Dependencies

- None. Entry stage. A release run starts only on an owner instruction recorded in the packet.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`. No source changes. If a gate decision must be drafted, that is a separate `edit` run.

## Procedure

1. Record `git rev-parse HEAD` and `git status --porcelain`; fetch tags (`git fetch --tags origin`).
2. Find the controlling record: an R-series entry in the register whose decision covers this edition, or an owner control record under `docs/releases/`. Quote its status line and acceptance date.
3. List what changed since the previous edition's tag (`v0.82.1` at the base commit): `git diff --stat <previous-tag>..<base_commit>` and, separately, `git diff --name-status <previous-tag>..<base_commit> -- requirements schemas fixtures conformance/runner standard/annexes`.
4. Classify every path in the technical diff against the controlling gate. A non-empty diff is not by itself normative: for the informative v0.82 edition, `git diff --name-status v0.81 v0.82 -- requirements schemas fixtures conformance/runner standard/annexes` lists 16 paths and none is `normative-population`.
   - `normative-population`: adds, removes or renumbers a row in "Active allocations" of `requirements/REGISTRY.md`, adds an "Accepted unpublished allocations" entry, edits original requirement text, changes the 28 gate codes, or changes requirement text in an annex the current release manifest lists under `normative-annexes`.
   - `provisional-addition`: new provisional material and its tests or tools, which the gate or manifest lists as provisional and non-normative (R24 section 2). v0.82 added 11 such paths: RRET-01 and L3 material under `fixtures/provisional/` and `schemas/provisional/`, three runner tests and the L3 comparator.
   - `coordinate-maintenance`: release coordinates or publication-status text that leave IDs, original requirement text and counts unchanged (R24 G82-06). v0.82 modified 5 such paths: status cells and a dated ledger row in `requirements/REGISTRY.md`, `requirements/PROFILE_APPLICABILITY.json` and `.md`, `fixtures/track-a/fixtures.manifest.json`, and status text in `standard/annexes/Known_Limitations_and_Open_Issues.md`, which is not a listed normative annex.
   - `other`: anything else; mark it `contested` for the owner.
5. Classify the edition: documentation patch, informative edition, or normative edition. Any `normative-population` path or new allocation makes it a normative edition and needs a gate that says so. An informative edition may carry the `provisional-addition` and `coordinate-maintenance` paths its gate covers. The byte-for-byte freeze belongs to the v0.82.1 line only: while `CITATION.cff` names 0.82.1, `scripts/verify-v0821-release.mjs` fails on any change in the five directories from tag `v0.82`, so any technical path blocks a v0.82.1-line change. A new edition replaces that routing in `scripts/check-current-release.sh` in its own package branch (`03-package`), as its controlling record allows.
6. Record the authorization model the controlling record requires, for `05-owner-actions`: `exact-sha-disposition` (an explicit owner publication disposition given after the exact-commit evidence; v0.82 under R24 G82-11 named the SHA) or `prospective-executor-bound` (the owner authorized an executor in advance and the executor binds the authorization to the tested commit in the signed tag annotation; v0.82.1 under `docs/releases/V0821_PUBLICATION_CONTROL.md`). If the record states neither, stop `BLOCKED`.
7. Copy the controlling record's gate list into `gate.md`; for each gate, name the evidence and the stage that produces it.
8. If no controlling record exists or the change set does not fit its class, stop `BLOCKED` and write the owner options (for example: accept a new R-decision; narrow the edition; defer), with a recommendation.
9. Write `gate.md`, then `HANDOFF.json` last.

## Verification

Objective:

- The controlling record's path exists and its status line is quoted with `path:line`.
- The technical diff command output is saved to the log, and every path in it has exactly one classification in `gate.md`.

Interpretation:

- Does the release class match the actual change set?
- Is any `coordinate-maintenance` or `provisional-addition` label hiding a change to requirement text, counts or IDs?
- Is any gate satisfied only by a statement rather than evidence?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Gate map | `<run>/output/<task-id>/<attempt>/gate.md` | Controlling record, class, authorization model, technical-path classification table (path, status letter, class, reason), gate table (gate ID, evidence, producing stage, status) |
| Owner options | `<run>/output/<task-id>/<attempt>/owner-options.md` | Only when blocked: options with a recommendation |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- No accepted controlling record → `BLOCKED`; owner decision required. Nothing downstream may start.
- A `normative-population` path under a documentation-patch or informative class, any `other` path, or any technical path on the v0.82.1 line → `BLOCKED`; present the options. `provisional-addition` and `coordinate-maintenance` paths that the gate covers do not block an informative class.
- The controlling record states no authorization model → `BLOCKED`; owner decision required.
- Tags unavailable → `BLOCKED` with the fetch error.
