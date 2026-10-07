# 05-handoff — package an auditable answer

## Goal

Package the answer so the coordinator and the Founder and Initial Editor can audit it: question, answer, dimensions, check counts, digests of every input and output, limitations and eligible next actions. Done means `ANSWER.md` and `HANDOFF.json` exist, bound to `base_commit`, and every next action is labeled proposed.

## Governing instructions

- `conformance/CLAIMS_POLICY.md` — the answer must stay a bounded mechanism statement.
- `GOVERNANCE.md` — any follow-on change goes through the v0.x amendment path; this answer is not a development decision.
- `SECURITY.md` — a finding that reveals a vulnerability is reported privately, not in run records shared beyond the coordinator.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Findings | `<run>/output/<task-id>/<attempt>/findings.md` | Full | Digest in its HANDOFF.json |
| Predecessor handoffs | HANDOFF.json of `01-scope` to `04-interpretation` | Full | Digests in `RUN.json` |

## Dependencies

- `04-interpretation` accepted.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`. No source changes.

## Procedure

1. Verify predecessor digests and that all name the same `base_commit`.
2. Write `ANSWER.md`: the question; a one-paragraph answer; the dimension table; check counts by result; limitations; what the answer does not establish.
3. List eligible next actions as proposals, each routed: a documentation correction → `edit/01-intake`; a release consequence → `release/01-gate`; a missing fixture or requirement → owner decision under `GOVERNANCE.md`.
4. Record SHA-256 of every artifact produced in this run in `HANDOFF.json` (not the handoff's own hash).
5. Write `HANDOFF.json` last.

## Verification

Objective:

- Artifact digests in `HANDOFF.json` recompute.
- Check counts in `ANSWER.md` equal those in `results.json`.

Interpretation:

- Is every next action labeled proposed and routed to an owner where it needs one?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Answer | `<run>/output/<task-id>/<attempt>/ANSWER.md` | Markdown; Done / Needs owner decision / Next |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template with `artifacts[]` digests |

## Failure behavior

- Predecessors bound to different commits → `BLOCKED`; name them.
- Answer depends on an external artifact never verified → state it as a limitation; do not present it as evidence.
