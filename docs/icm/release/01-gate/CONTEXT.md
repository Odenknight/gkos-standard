# 01-gate — confirm the owner's release gate for this edition

## Goal

Establish whether an accepted owner record controls this edition: an accepted R-series release-gate decision (R20 for v0.81, R24 for v0.82) or an owner control record (`docs/releases/V0821_PUBLICATION_CONTROL.md` for v0.82.1). Done means `gate.md` names the controlling record, the edition's release class, the gate list with the evidence each gate needs, and whether the planned changes fit that class; or the stage is `BLOCKED` with the owner decision that is missing.

## Governing instructions

- `GOVERNANCE.md` — the Founder and Initial Editor adopts development decisions; releases are developmental and non-consensus.
- `decisions/R20_V081_Release_Gate_Reconciliation_and_Publication_Control_Development_Decision_Record.md` — gate register pattern G81-01..16; CI success alone cannot merge, tag, publish, qualify or certify.
- `decisions/R24_V082_Informative_Release_Gate_and_Publication_Control_Development_Decision_Record.md` — gates G82-01..12, including one frozen candidate (G82-04), unchanged normative population for an informative edition (G82-05), the nine blocking checks (G82-07), the separate explicit owner publication disposition (G82-11) and archival verification (G82-12).
- `docs/releases/V0821_PUBLICATION_CONTROL.md` — documentation-patch controls, date convention, ruleset handling.
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
3. List what changed since the previous tag: `git diff --stat v0.82.1..<base_commit>` and, separately, `git diff --name-only v0.82..<base_commit> -- requirements schemas fixtures conformance/runner standard/annexes`.
4. Classify the edition: documentation patch, informative edition, or normative edition. A non-empty technical diff or any new allocation makes it normative and needs a gate that says so.
5. Copy the controlling record's gate list into `gate.md`; for each gate, name the evidence and the stage that produces it.
6. If no controlling record exists or the change set does not fit its class, stop `BLOCKED` and write the owner options (for example: accept a new R-decision; narrow the edition; defer), with a recommendation.
7. Write `gate.md`, then `HANDOFF.json` last.

## Verification

Objective:

- The controlling record's path exists and its status line is quoted with `path:line`.
- The technical diff command output is saved to the log.

Interpretation:

- Does the release class match the actual change set?
- Is any gate satisfied only by a statement rather than evidence?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Gate map | `<run>/output/<task-id>/<attempt>/gate.md` | Controlling record, class, gate table (gate ID, evidence, producing stage, status) |
| Owner options | `<run>/output/<task-id>/<attempt>/owner-options.md` | Only when blocked: options with a recommendation |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- No accepted controlling record → `BLOCKED`; owner decision required. Nothing downstream may start.
- Technical changes present for a documentation-patch or informative class → `BLOCKED`; present the options.
- Tags unavailable → `BLOCKED` with the fetch error.
