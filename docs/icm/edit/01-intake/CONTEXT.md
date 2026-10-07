# 01-intake — name the records, the change class and the permitting rule

## Goal

Turn the request into an exact edit scope: every target record by path and stable ID, whether it is an existing record or a proposed new record, its standing, the change class, the rule or owner instruction that permits the edit, and what is excluded. Done means `scope.json` exists, every existing target and supporting reference resolves at the packet's `base_commit`, and every proposed new record has an existing parent folder, an unused path and identifier, and a recorded permitting source; or the stage reports `BLOCKED` with the missing authority named.

## Governing instructions

- `GOVERNANCE.md` — v0.x amendment path; a normative-compatible change requires a Development Decision Record; the editor's disclosure list; no self-certification.
- `CONTRIBUTING.md` — the six change classes (Editorial, Clarification, Normative compatible, Breaking, Constitutional, Security emergency); what a normative-compatible proposal must identify; CC BY 4.0 for documentation and Apache-2.0 for software-oriented material; DCO sign-off.
- `docs/CORPUS-STATUS.md` — classify each document as normative, informative, proposed or historical; preserve historical sources and publish successors.
- `conformance/CLAIMS_POLICY.md` — the edit may not create a requirement, profile, certification or carried-forward claim.
- `SECURITY.md` — security-sensitive content leaves this workflow and goes to private vulnerability reporting.
- `.github/PULL_REQUEST_TEMPLATE.md` — the proposal metadata the handoff will have to fill; collect it now.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Assignment | Task packet `tasks/<task-id>.json` | Full packet | SHA-256 in `RUN.json` |
| Current edition | `CITATION.cff` | `version`, `date-released` | Packet `base_commit` |
| Decision index | `decisions/GKOS_Decision_Register.md` | Sections naming the targets | Packet `base_commit` |
| Requirement index | `requirements/REGISTRY.md` | Rows for any cited `GKOS-<AREA>-NNN` ID | Packet `base_commit` |
| Release coverage | `releases/2026-09-24-v0.82.1/RELEASE_MANIFEST.yml` | `decisions`, `normative-annexes`, `provisional-material` lists | Packet `base_commit` |
| Targets | `<target-path>` for each `existing` target in the packet; `<parent-folder>` for each `create` target | Named sections or lines; folder listing | Packet `base_commit` |

## Dependencies

- None. This is the entry stage. The packet must be published and the assignment generation in `RUN.json` must be current.

## Allowed writes

- `output_ref` from the packet: `<run>/output/<task-id>/<attempt>/`.
- No source changes in this stage.

## Procedure

1. Record the checkout state (executed by the worker): `git rev-parse HEAD`, `git status --porcelain`, `git branch --show-current`. Stop if HEAD differs from `base_commit`.
2. Read the governing instructions in full, then the inputs.
3. Resolve each target to a path and stable ID: requirement IDs `GKOS-<AREA>-NNN`, decisions `R<N>`, ambiguity IDs `EAR-*`, fixture IDs, review IDs such as `R23-REV-001`. If the request names a topic, search for records with `git grep -n -I "<term>"` and list candidates; do not guess one. Mark each target `existing` (the edit changes a record present at the base commit) or `create` (the edit adds a record, such as a new R-series proposal, an owner clarification under `docs/decisions/` or a successor record).
4. Existing targets and supporting references (records cited as context, such as the decision a new proposal amends or supersedes): confirm each path exists at the base commit, `git cat-file -e <base_commit>:<path>`, and each cited ID has a hit, `git grep -n -I "<id>" <base_commit>`.
5. Proposed new records (`create`): confirm the parent folder exists (`git cat-file -e <base_commit>:<parent-folder>`), the new path does not (`git cat-file -e <base_commit>:<path>` exits non-zero), and the new identifier is unused (`git grep -n -I -w "<new-id>" <base_commit>` exits 1). Keep `-I`: without it, `git grep -n "R25" b308ff7` matches bytes inside two PNG files under `graphics/diagrams/`. The new path must not match the release-validation rejection `/(draft|pre-0\.75|v0\.[0-6])`. Record the permitting source for the creation.
6. Classify each target. Normative: `standard/00_GKOS_Master_Standard.md`, the annexes listed as `normative-annexes` in the current release manifest, `requirements/`. Decision: `decisions/`, `docs/decisions/`. Informative or proposed: as the document's own status line says. Historical: `archive/`, `docs/archive/`, `docs/implementation/archive/`, `fixtures/archive/`, `schemas/archive/`, `releases/`, `release-candidates/`, publication records under `docs/releases/`. A `create` target is `proposed` until the owner acts.
7. Assign one change class per target. Normative compatible or higher needs a Development Decision Record accepted by the owner, or the edit is limited to drafting that proposal.
8. Record the permitting rule: an owner instruction reference, an accepted R-decision, or a `CONTRIBUTING.md` route. If none exists, stop with `BLOCKED`.
9. List exclusions explicitly: historical targets, any path the packet does not name, and anything under `releases/` or `release-candidates/`.
10. Write `scope.json`, then `HANDOFF.json` last.

## Verification

Objective:

- Every `existing` target and every supporting reference passes `git cat-file -e <base_commit>:<path>` (exit 0), and every cited existing ID is found by `git grep -n -I "<id>" <base_commit>` (at least one hit).
- Every `create` target: its parent folder passes `git cat-file -e`, its own path fails it, its new identifier has no hit from `git grep -n -I -w "<new-id>" <base_commit>`, and its permitting source is recorded.
- `scope.json` parses as JSON and names `base_commit`, targets with their kind, change class, permitting rule and exclusions.

Interpretation (reviewer judgment):

- Is the change class right, or is a "clarification" actually changing normative meaning?
- Does the cited rule actually permit this edit by this actor?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Scope | `<run>/output/<task-id>/<attempt>/scope.json` | JSON: `base_commit`, `targets[]` (`path`, `kind` `existing` or `create`, `ids[]`, `standing`, `lines`; for `create` also `parent`, `new_id`, `id_check`), `supporting_refs[]`, `change_class`, `permitting_rule`, `exclusions[]`, `pr_template` (draft field values) |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template; status `submitted`, `blocked` or `uncertain` |

## Failure behavior

- No permitting rule or owner instruction → `BLOCKED`; name what decision is missing and who makes it (the Founder and Initial Editor).
- A target is historical or under `releases/` or `release-candidates/` → `BLOCKED` for that target; propose a successor record instead.
- An `existing` target or supporting reference is missing at the base commit → `BLOCKED` for that target; name the missing path or ID.
- A `create` target's path already exists or its identifier is already used → `uncertain`; report the collision; the coordinator chooses the path or identifier.
- The request touches security-sensitive detail → stop; tell the coordinator to route it through `SECURITY.md`; write nothing about the detail in run records.
- Topic resolves to several plausible records → `uncertain`; list them; do not pick one.
