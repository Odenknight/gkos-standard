# 04-review — independent review of the graphics candidate

## Goal

A reviewer who did not produce the candidate compares each changed figure and register row with the controlling text and with the graphics rules, and returns a verdict with numbered findings. Done means `REVIEW.md` is bound to the candidate commit and gives one verdict: `PASS`, `PASS_WITH_CORRECTIONS`, `HOLD` or `REFUSE`. The review is advisory.

## Governing instructions

- `GOVERNANCE.md` — non-self-certification.
- `decisions/R18_Track_A_GCP45_and_Authorized_Independent_Review_Development_Decision_Record.md` — section 3: different model family, sealed packet, after deterministic checks. Practice here, not a conformance claim.
- `docs/icm/graphics/README.md` — rules for historical figures, rasters, labels and alt text.
- `graphics/README.md` — figures are informative; controlling text wins.
- `conformance/CLAIMS_POLICY.md` — claim limits for labels and captions.

## Inputs

| Source | Exact reference | Scope | Revision/digest |
| --- | --- | --- | --- |
| Sealed packet | Task packet `tasks/<task-id>.json` naming the candidate commit | Full | SHA-256 in `RUN.json` |
| Audit | `<run>/output/<task-id>/<attempt>/audit.json` from `01-audit` | Selected figures | Digest in its HANDOFF.json |
| Check results | `<run>/output/<task-id>/<attempt>/results.json` from `03-check` | Full | Digest in its HANDOFF.json |
| Candidate | `git diff <base_commit>..<candidate-commit>` | Full diff, with rendered images opened | Candidate commit |
| Controlling text | `standard/00_GKOS_Master_Standard.md`, `CITATION.cff` | Terms, layer names, edition | Candidate commit |

## Dependencies

- `03-check` accepted for the same candidate commit. With a deterministic `FAIL` the reviewer may review but cannot return `PASS`.

## Allowed writes

- `output_ref`: `<run>/output/<task-id>/<attempt>/`.
- No source changes.

## Procedure

1. Confirm you are not an author in the range and, for an agent author, that your model family differs. Record identity, runtime and model family.
2. Confirm the candidate commit and tree match the `02-produce` handoff.
3. Open each changed figure (source and render). Compare every label with the controlling text and the current edition.
4. Confirm no historical figure was relabelled and nothing under `archive/`, `releases/` or `release-candidates/` changed.
5. Check each register row against the files, and each earmark against its register row and anchor.
6. Check alt text and captions for accuracy and for claims.
7. Note style inconsistencies (palette, fonts, layer names) as `MINOR` unless they change meaning.
8. Number findings `<run-id>-REV-NNN` with severity and `path:line` or figure path; write `REVIEW.md`, then `HANDOFF.json` last.

## Verification

Objective:

- `REVIEW.md` names the candidate commit, its tree, the packet SHA-256 and the reviewer identity.
- Every finding cites a path that exists at the candidate commit.

Interpretation:

- Does the verdict follow from the findings?
- Could a reader take any figure as a claim of conformance, certification or adoption?

## Outputs

| Artifact | Location | Format |
| --- | --- | --- |
| Review | `<run>/output/<task-id>/<attempt>/REVIEW.md` | Kit `REVIEW.md` template; verdict; findings table |
| Handoff | `<run>/output/<task-id>/<attempt>/HANDOFF.json` | Kit template |

## Failure behavior

- Reviewer is an author, or shares the author's model family → `BLOCKED`; reassign.
- Candidate differs from the packet → stop; report `stale`.
- An image cannot be opened → a finding; the review continues for the rest.
