# 01-scope — freeze one question and its canonical subjects

## Goal

Freeze one answerable question, its question class, the canonical subject IDs, the catalog or edition it is asked against, and the checks it will need. Done means `scope.json` names exactly one question and every subject resolves to a stable ID at the packet's `base_commit`.

## Governing instructions

- `GOVERNANCE.md` — no self-certification; developmental decisions are not consensus or certification.
- `conformance/CLAIMS_POLICY.md` — passing available tests establishes only the tested mechanisms; an empty findings list is not complete coverage.
- `conformance/README.md` — current qualification boundary: catalog 0.2.0 declares no complete qualifying profile; PASS, FAIL, PARTIAL and UNEVALUATED are distinct.
- `requirements/REGISTRY.md` — authoritative for permanent `GKOS-<AREA>-NNN` IDs.
- `docs/ecosystem/AMBIGUITY_REGISTER.md` — `EAR-*` IDs are issues, not requirements.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Assignment | Task packet `tasks/<task-id>.json` | Question text, exclusions | SHA-256 in `RUN.json` |
| Requirement IDs | `requirements/REGISTRY.md` | Rows for the subject IDs | Packet `base_commit` |
| Profile map | `requirements/PROFILE_APPLICABILITY.md` | Rows for the subject profile | Packet `base_commit` |
| Starter catalog | `fixtures/fixtures.manifest.json` | `catalog_version`, `qualifying_profiles`, fixture entries | Packet `base_commit` |
| Track A catalog | `fixtures/track-a/fixtures.manifest.json` | Same fields | Packet `base_commit` |
| Provisional suites | `fixtures/provisional/` | Folder listing only | Packet `base_commit` |
| Current edition | `CITATION.cff` | `version`, `date-released` | Packet `base_commit` |

## Dependencies

- None. Entry stage. The packet must be published and the assignment current.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`. No source changes.

## Procedure

1. Record `git rev-parse HEAD` and `git status --porcelain`; stop if HEAD is not `base_commit`.
2. Restate the question in one sentence that can be answered yes, no, or with a bounded list.
3. Choose one question class and record it:
   - permanently allocated requirement (`requirements/REGISTRY.md`);
   - provisional prose requirement (`conformance/provisional-requirements/`);
   - executable fixture catalog (starter 0.2.0, Track A, `gcp6`, `gcp7`);
   - provisional or draft suite (`fixtures/provisional/science/` SRTP-DRAFT-0.1, `l3-interoperability`, `retrieval` RRET-01, `evidence`), which creates no conformance obligation;
   - decision lineage (decision register and records);
   - claim readiness (claims policy and publication records).
4. Resolve every subject to a stable ID with `git grep -n "<id>"`: requirement IDs, `GCP-<N>`, fixture IDs, R-numbers, `EAR-*`. Record aliases found and leave unresolved ones listed as unresolved.
5. Name the catalog version and edition the answer is bound to. Never substitute another catalog or edition.
6. List the checks `03-checks` will need and any expected `BLOCKED` (for example, a full adapter run needs a candidate implementation build).
7. Write `scope.json`, then `HANDOFF.json` last.

## Verification

Objective:

- Each subject ID is found by `git grep -n` at `base_commit`.
- `scope.json` parses and has exactly one `question`.

Interpretation:

- Is the question bounded enough that a "yes" cannot be read as a profile or publication claim?
- Is the class right (for example, an SRTP draft question is not a GKOS conformance question)?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Scope | `<run>/output/<task-id>/<attempt>/scope.json` | JSON: `question`, `question_class`, `subjects[]` (`id`, `kind`, `aliases[]`), `catalog`, `edition`, `required_checks[]`, `expected_blocked[]`, `exclusions[]`, `base_commit` |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- The question asks for a qualification, certification or "is it conformant" verdict → rewrite it as a bounded mechanism question and record the rewrite; if the requester insists, `BLOCKED` with a pointer to `conformance/CLAIMS_POLICY.md`.
- A subject cannot be resolved → `uncertain`; list candidates; do not choose one.
