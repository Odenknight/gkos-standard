# 02-sources — resolve and hash every source the answer depends on

## Goal

For each subject in `scope.json`, resolve the registry row, controlling decision record, fixture catalog entries, schema, adapter map entry, divergence and ambiguity entries, and record each consumed file with its SHA-256 and the sections used. Done means `inputs.json` lists every source as available, missing or external, and lineage edges (supersession, replacement, retargeting) are recorded without choosing a winner.

## Governing instructions

- `requirements/REGISTRY.md` — replacement mappings and the append-only ledger define requirement lineage.
- `decisions/GKOS_Decision_Register.md` — decision standing (accepted, informative, prospective, proposed, owner clarification).
- `fixtures/README.md` — catalog 0.2.0 declares `qualifying_profiles: []` and `complete_requirements: {}`; post-v0.80 catalogs `fixtures/gcp6/` and `fixtures/gcp7/` declare no qualifying profile; provisional suites alter nothing.
- `conformance/README.md` — implementation observations stay in non-normative adapter maps; the historical divergence register describes the July 22, 2026 Engine 1.0.5 baseline only.
- `docs/ecosystem/AMBIGUITY_REGISTER.md` — open `EAR-*` items and their dispositions.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Predecessor | `<run>/output/<task-id>/<attempt>/scope.json` | Full | Digest in its HANDOFF.json |
| Adapter map | `conformance/adapters/gkos-engine.requirements.json` | Entries for the subject IDs | Packet `base_commit` |
| Divergences | `fixtures/archive/DIVERGENCES.md` | Entries cited by `open_question_ref` | Packet `base_commit` |
| Schemas | `schemas/` | Schema files named by fixture entries | Packet `base_commit` |
| Gate registry | `standard/annexes/Diagnostic_Code_Registry.md` | Gate codes cited by Track A entries | Packet `base_commit` |
| Release manifest | `releases/2026-09-24-v0.82.1/RELEASE_MANIFEST.yml` | Decision classes, provisional material, active catalog | Packet `base_commit` |
| Coordinate pins | `docs/releases/V082_COORDINATE_CONSOLIDATION.md` | Historical machine-readable pins | Packet `base_commit` |

## Dependencies

- `01-scope` accepted.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`. No source changes.

## Procedure

1. Verify the `scope.json` digest against its accepted handoff.
2. For each subject, find every file that cites it: `git grep -n "<id>"`. Record path, line and the role of the file (registry, decision, fixture entry, corpus file, schema, adapter map, divergence, ambiguity, release manifest, documentation).
3. Hash each consumed file from Git blob content, not the working file: `git cat-file blob <base_commit>:<path> | sha256sum`. Record bytes from `git cat-file -s <base_commit>:<path>`.
4. Record lineage edges: replacement mappings (for example `GKOS-DELEGATION-004` → `GKOS-REVIEW-001..003`), decision retargeting (R23 prospective under R24 Option A), divergence references (`open_question_ref`). Keep both ends of every edge; mark unresolved conflicts.
5. Record fields that are masked or templated rather than evidence bytes, such as the starter catalog's `mask_rules` (`assessment.calculatedAt`, `assessment.assessmentId`, `*.generated_at`, `*.sourcePath`).
6. Mark external evidence (an implementation build, a Zenodo record, another repository) as `external`, with locator availability, byte availability and verification state recorded separately.
7. Write `inputs.json` and `missing.md`, then `HANDOFF.json` last.

## Verification

Objective:

- Each `inputs.json` digest recomputes to the same value from `git cat-file blob <base_commit>:<path>`.
- Each subject in `scope.json` appears in at least one `inputs.json` entry or in `missing.md`.

Interpretation:

- Was any superseded record used as current because a stale link pointed to it?
- Are masked fields excluded from anything presented as evidence?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Inputs | `<run>/output/<task-id>/<attempt>/inputs.json` | `inputs[]`: `path`, `commit`, `sha256`, `bytes`, `sections`, `role`, `disposition` (`available`, `missing`, `external`); `lineage_edges[]`; `masked_fields[]` |
| Missing list | `<run>/output/<task-id>/<attempt>/missing.md` | Exact missing references and why they matter |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- A required source is missing → keep going; list it; the dependent dimension becomes `UNKNOWN`.
- A source changed since `01-scope` (different `base_commit` tip) → stop; report `stale`.
