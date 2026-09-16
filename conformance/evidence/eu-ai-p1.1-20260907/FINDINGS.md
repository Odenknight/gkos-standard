# P1.1 execution findings

**Result: implemented and executed; acceptance not established.** Two separate
Node 24.19.0 processes produced the same 10 passing assertions and one failing
assertion (P11-08). Both exited with code 1. No fixture expectations were
relaxed and no original GKOS source or tests were modified.

This is a Codex-assisted self-evaluation for mariusTalpos. It has not received
independent human review or an independent rerun. P1.2 and P1.3 are not
implemented, and no full P1, conformance-profile, or legal-compliance result
is claimed.

## What the run established

For the fixed five-record fictional example, the Engine exposed the expected
record identities, resolved the declared semantic references, and represented
the one-sided supersession between dossier revisions. The example code used
those observations to distinguish current and historical revisions. The host
kept the original file bytes unchanged. Those contributions are separately
attributed in the assertion records.

Four deliberate alterations or omissions of captured observations were also
rejected by the assertion evaluator. These check the test harness; they do not
count as the dossier fault demonstrations planned for P1.2.

## Why P11-08 failed

| Finding | Evidence and interpretation | Disposition |
| --- | --- | --- |
| UID references have inconsistent graph representations | The Engine returns the required resolved semantic edges, but also retains unresolved property edges to the same UID strings. Snapshot A has two unresolved nodes; B has three. | Retained as an Engine-output finding for this input format. The original graph code was not patched. |
| Fixture provenance is undeclared | Every record lacks `provenance.source_refs`, producing `GKX-PROVENANCE-001`. | Retained as a fixture-design gap, not labelled an Engine defect. No fabricated provenance or warning exemption was added. |

P11-08's expected value remains an empty issue list for both snapshots. The
actual warnings and unresolved counts are included in the saved result. A
future fixture revision or a proposed Engine repair is separate work; neither
has been used to turn this evaluation into a pass.

## Compatibility and verification

| Check | Observed result |
| --- | --- |
| Standard existing tests and registry lint | 113 tests passed; registry lint passed |
| Engine build and typecheck | Passed |
| Focused Engine lineage, projection, public API, and new observer tests | 38 passed under Node 24.19.0 |
| New harness tests | 4 passed, including a missing-observer process that exited unsuccessfully and retained evidence |
| Full Engine suite | 928 passed, 2 failed, 6 skipped, out of 936 |
| Repeated P1.1 processes | Identical expected/observed assertion values and statuses; 10/11 passed in each |
| Saved report evidence | 21 assertion evidence locations per run resolved; recorded observation/specification hashes verified |
| Original source preservation | All 498 originally tracked Engine files unchanged. In the Standard's 341 originally tracked files, only the authorised phase tracker changed from the captured pre-implementation state. |

The full Engine suite's failures are disclosed rather than waived:

- Its existing change-allowlist test rejects the added
  `examples/eu-ai-evidence/p1-observer.mjs` path. This is an interaction between
  the requested additive example and an existing fixed-path gate; the gate was
  not edited or bypassed.
- Its existing retrieval replay test returned `gkx retrieval eval: operational
  failure` with exit code 3. The same operational failure appeared when that
  test was filtered and rerun. The filtered attempt also triggered the suite's
  all-rows-consumed teardown check because other cases were not selected; it
  is not represented as a complete suite run. The retrieval failure's cause
  has not been established by this P1.1 work.

Initial environment checks found missing locked dependencies and an older
Node 22 runtime requiring a SQLite flag. Existing lockfiles were used to
restore dependencies; final P1.1 and full Engine evidence used the available
supported Node 24.19.0 runtime. No package definition or lockfile was changed.

## Evidence and reproduction

- [Latest assertion report](run-02/report.md), [machine results](run-02/results.json),
  [raw observations](run-02/observations.json), and [actual process exit](run-02/process.json).
- [First separate process](run-01/report.md) and [its machine results](run-01/results.json).
- [Verification record](verification.json), including command records, raw log
  bindings, and source-preservation checks.
- [Full Engine log](verification/engine-tests-node24.txt),
  [Standard log](verification/standard-tests-final.txt), and
  [focused Engine log](verification/engine-focused-node24.txt).
- [Implementation specification and working command](../../../docs/eu-ai-evidence/specs/01-valid-dossier-and-revisions.md).

The machine results identify both base commits, dirty-worktree status, hashes
of the actual sources and new example files, the built Engine bundle,
lockfiles, fixture, tool versions, and execution configuration. Each run also
captures its specification bytes; later documentation links do not rewrite
that captured basis. Code and evidence additions are local and uncommitted.

Hash agreement establishes consistency with captured bytes. It does not
establish independent authenticity, historical time, or external endorsement.
