# P1.1 — Valid dossier and revision flow

**Standing:** Implemented example specification; fork-owned, informative,
non-normative, and non-qualifying. Acceptance is not yet established; see the
execution findings below. Requirements below apply only to this example.

**Date:** 2026-09-07  
**Parent:** [P1 proposal](../P1_PROPOSAL.md)  
**Shared status:** [PHASES.md](../PHASES.md)

## 1. Outcome and scope

Produce a small runnable example that identifies a fictional AI system and its
documentation, resolves supporting references through actual GKOS-Engine
functions, and shows a second dossier revision superseding the first without
rewriting it. A reviewer can inspect the current revision and explicitly
inspect its predecessor, with the system version, document revision, and
evidence identities visible in each result.

P1.1 establishes the valid baseline for
[P1.2 failure detection and retrieval](02-failure-detection-and-retrieval.md)
and [P1.3 package verification](03-review-package-and-verification.md).
It does not complete P1 or demonstrate its intentional dossier failures yet.
The parent proposal supplies the legal support mapping; this specification
adds no article-level coverage or compliance claim.

The implementation is a local example and acceptance test using existing
public Engine functions. It needs no running AI model, external account,
service, database, UI, or new general-purpose conformance protocol.

## 2. Decisions for the initial implementation

| Area | Decision |
| --- | --- |
| Subject | `Example AI`, a fictional document-classification application, with system ID `example-ai` and build/version `demo-build-1` |
| Documentation | One logical dossier, ID `example-ai-dossier`, with revisions `1` and `2`; both describe the same system build |
| Fixture source | One Standard-owned directory: `fixtures/provisional/eu-ai-evidence/p1/` |
| Record format | UTF-8 Markdown with flat GKX `2.0` frontmatter, matching the active Standard schema and existing positive fixtures |
| Engine path | Public `buildGraph` export from a freshly built `dist/gkos-engine.mjs`; inspect its node projections, UID index, relationships, and lineage |
| Execution | An explicitly invoked `node:test` example in the Standard repository, importing a small Engine-owned observer |
| Expected outcomes | Declared by the Standard fixture and checked by the Standard example; never supplied as Engine observations |
| Access boundary | Local operator reading only the declared, public fictional records; no authentication or authorisation enforcement claim |
| Outputs | Machine-readable observations and results, plus a short Markdown walkthrough report; not a review package yet |

**Owner constraint: evaluate the existing GKOS logic without modifying it.**
Add the example fixtures, observer, and test files in the locations below.
Do not edit or patch the Engine's existing source, replace its functions at
runtime, or change the Standard's existing schemas, evaluators, default
catalog, profiles, or tests to accommodate this demonstration. Existing build
commands may generate the Engine bundle from unchanged source; do not edit
that generated bundle. Use the current dependencies and lockfiles.

The example is a bounded consumer of existing public functions, not a second
conformance runner. Its helper code may prepare inputs, select inspection
results, compare observations, and write reports, with that work attributed
to the example. It must not implement missing Engine behavior and present it
as observed Engine capability. Any defect or unsupported capability is a
finding; remediation is separate work requiring an explicit owner request.

## 3. Fixture and identity contract

### 3.1 Authored records

The fixture directory contains exactly these five source records, alongside
`manifest.json`. All example prose must be visibly fictional. The evaluation
summary and review note are test data, not results of actual AI evaluation or
independent review.

| File | Alias | Record UID | Content and role |
| --- | --- | --- | --- |
| `system.md` | S | `550e8400-e29b-41d4-a716-446655440101` | System name, purpose, fictional owner `Example Provider`, system ID, and build/version |
| `dossier-r1.md` | D1 | `550e8400-e29b-41d4-a716-446655440102` | Initial description, limitations, system reference, and evaluation reference |
| `dossier-r2.md` | D2 | `550e8400-e29b-41d4-a716-446655440103` | Clarifies one documented limitation and adds the review-note reference; explicitly states that the system build is unchanged |
| `evaluation-summary.md` | E | `550e8400-e29b-41d4-a716-446655440104` | Short fictional evaluation summary for the same system build |
| `review-note.md` | R | `550e8400-e29b-41d4-a716-446655440105` | Fictional note explaining the documentation clarification introduced in D2 |

Aliases are shorthand in this spec. Authored relationships use the full UIDs,
not filenames, titles, or aliases. Every revision has its own UID; D1 and D2
share a logical dossier ID but never share a record UID. Paths locate files
and Engine nodes; they do not replace record identity.

Each record includes `gkx_version: "2.0"`, its UID, a distinct title,
`type: semantic`, `created_at`, `updated_at`, `epistemic_state: reported`,
`sensitivity: public`, and `authorship_origin: authored`. Do not use `accepted`
or fabricate approval records to make the example appear stronger.

Use a fixture-local extension named `x_eu_ai_demo` containing `record_role`,
`system_id`, and `system_version` on every record. D1 and D2 additionally carry
`dossier_id` and a string `document_revision`. These fields are demonstration
metadata allowed by the existing schema, not new GKOS fields. The Standard
example checks their consistency; the Engine is not credited with enforcing
their application-specific meaning.

Use fixed UTC timestamps: S and E on `2026-09-01T09:00:00.000Z`, D1 on
`2026-09-01T10:00:00.000Z`, R on `2026-09-02T09:00:00.000Z`, and D2 on
`2026-09-02T10:00:00.000Z`. Set `updated_at` equal to `created_at` and include
the existing flat `timestamp` field with that same value. The Engine's graph
temporal path reads `timestamp`; explicit values avoid filesystem-time
fallbacks. These are scenario dates, not attested historical times.

### 3.2 References and revisions

Author flat UID-valued relationship lists as follows:

- D1 `documents` S and `cites` E.
- D2 `documents` S, `cites` E and R, and `supersedes` D1.
- E and R each `documents` S.

D1 contains no forward reference to D2 and is byte-for-byte unchanged when D2
is introduced. Supersession is derived from D2's declaration. D1's authored
epistemic state remains `reported`; derived historical status must not be
confused with changing that authored state to `superseded`.

### 3.3 Inventory and scenarios

`manifest.json` declares a fixture ID/version, all five records with their
path, UID, role, required status, and expected raw-byte SHA-256 digest. It
also declares expected metadata, directed relationships, snapshot membership,
and the inspection requests below. Each snapshot has an explicit required
record set; records outside it are not missing from that scenario.

| Scenario | Loaded record set | Request | Expected result |
| --- | --- | --- | --- |
| A — initial | S, D1, E | Current dossier for `example-ai` / `demo-build-1` | D1, citing E and documenting S |
| B — revised | S, D1, D2, E, R | Current dossier for the same system build | D2, citing E and R and documenting S; D1 visible as historical |
| C — historical inspection | Same snapshot as B | Exact UID D1 | D1 with its original bytes and E reference; clearly labelled historical, with D2 identified as its successor |

Freeze expected digests when authoring the fixture. Execution verifies against
those stored values and must not regenerate the expectations from whatever
files it receives. The manifest does not inventory or hash itself; its digest
is captured separately in the run coordinates. This establishes a baseline
binding for P1.2 without implementing package verification from P1.3.

Use LF line endings as required by the repository attributes. Hash the exact
bytes read before parsing or normalisation; do not substitute a hash of parsed
metadata, an Engine cache key, or a graph rendering.

## 4. Execution and observation contract

### 4.1 Standard-owned preparation

The example loads the declared fixture only, validates each record's
frontmatter against `schemas/gkx-frontmatter-2.0.schema.json`, and checks the
fixture-local metadata, UID uniqueness, reference expectations, and digests.
Reuse the runner's installed YAML/AJV dependencies and existing schemas; a
new generic manifest-schema framework is unnecessary for this small fixture.
Require unique, relative inventory paths contained within the fixture root;
do not load arbitrary files outside that root.

Build A and B from explicit membership lists over the same fixture source.
Do not delete, rewrite, or copy fixtures into the Engine repository to simulate
the update. Read-only use of the sibling checkout is sufficient.

### 4.2 Engine-owned observer

Add `examples/eu-ai-evidence/p1-observer.mjs` in GKOS-Engine. Its narrow exported
function, `observeDossierSnapshot({ records, now })`, receives only source
records and a fixed observation time. Each record supplies `relativePath` and
the exact decoded UTF-8 `content`, plus `createdTime` and `modifiedTime` in
milliseconds parsed by the host from that record's authored timestamps. These
explicit source times also keep node display dates independent of wall-clock
indexing time. The observer passes those records to the
public `buildGraph(records, [], now)` function and returns the resulting graph
with Engine identity. It performs no fixture expectation checks and returns
no PASS/FAIL decision.

Use `2026-09-03T12:00:00.000Z` as the fixed graph observation time in both
snapshots. Import the built public bundle, not private modules or a mock.
Retain the graph's raw diagnostics and projections. Missing projections or
UID mappings must not be replaced with values copied from the manifest.

The Standard example compares independently parsed identities with observed
`graph.gkxUidIndex` entries and each file node's
`gkx.projection.authored.uid`. It checks semantic relationships in the actual
graph and canonical lineage through `supersedesIds` / `supersededByIds`.
Required semantic edges are compared by source UID, relationship type, and
target UID. Derived inverse edges are allowed and distinguished from authored
edges; do not impose a total graph-edge count that includes unrelated folders
or projections.

For lineage, the authored direction is D2 `supersedes` D1. The Engine's rendered
`kind: lineage` edge points from older to newer, D1 to D2. Interpret that edge
according to its documented direction rather than reporting it as reversed
supersession.

### 4.3 Inspection selection

The example's inspection helper restricts candidates to the requested logical
dossier and exact system build, then uses the observed successor relationships
to find the sole candidate with no successor. It labels this as
**example selection using Engine lineage**, not an Engine authorisation or
document-release decision. The expected UID in the manifest is only an
assertion target and must not drive selection.

In A, D1 is the sole current candidate even though its Engine `head` flag is
false: that flag requires participation in a lineage. In B, D1 has D2 as a
successor and is not current; D2 is the sole current candidate and has
`head: true`. D1's `invalidAt` equals D2's declared timestamp, while D2's
`invalidAt` is null. C selects D1 by exact UID without relabelling it current
or adding R to its original evidence references.

No missing or multiple candidate set can yield a successful current selection,
and no timestamp-only fallback is allowed. The broader mutations proving these
failure behaviors belong to P1.2; P1.1 must not embed a shortcut that would
silently manufacture a winner.

## 5. Results and attribution

Produce `observations.json`, `results.json`, and `report.md` in a new,
explicitly selected output directory outside the fixture directory. Reject an
existing non-empty output directory to avoid mixing different runs. These are
run evidence, not the portable review package planned for P1.3.

`observations.json` preserves both raw Engine snapshot results. `results.json`
records each acceptance check's stable ID, expected and observed values,
status, and relevant observation locator. Use `PASS`, `FAIL`, and `UNEVALUATED`:
an executed mismatch fails; an unavailable required observation is unevaluated.
Both prevent overall success. Input errors and Engine exceptions must remain
visible with a non-zero process exit, never be converted into skipped passes.

Each assertion also records its requirement basis, evaluated component,
evaluator identity, explanation, and the narrow finding its result permits.
Scenario outcomes remain separate from assertion outcomes. Disclose agent
authorship/execution and lack of independent review or rerun. Preserve a copy
of this specification and raw observations with recorded SHA-256 bindings;
`process.json` records the actual test-process exit code. These additional
reporting details implement the owner's clarification; they do not change
the fixture expectations or acceptance criteria.

Capture the scenario selection, system/build and record identities, document
revision, resolved references, lineage state, raw-byte digests, and all
diagnostics. Retain informational compatibility messages. Any error/critical
diagnostic or unresolved/ambiguous required reference prevents the valid
baseline from passing. Unexpected warnings require explanation and an explicit
fixture expectation before they can be accepted; do not suppress them globally.

The readable report has three clearly attributed parts:

| Part | What it may establish |
| --- | --- |
| Standard-reference checks | Schema validity, declared fixture consistency, and evaluation of expected outcomes; no claim of an independent full GKOS implementation |
| Engine observations | Actual projections, UID resolution, semantic relationships, lineage, and temporal outputs from the named build |
| Host/example behavior | Local file reads, raw-byte SHA-256 checks, snapshot assembly, current/historical inspection selection, and report writing |

Record exact Standard and Engine commits, dirty-worktree state, fixture and
observer file digests, built Engine bundle digest, relevant schema/test-helper
digests, dependency-lock digests, Node/npm versions, OS, actual commands,
generation time, fixed scenario time, and process exit status. Dirty sources
must be identified by their actual content bindings; a commit alone is not
sufficient. Do not record credentials or unrelated environment variables.

Engine projection and cache hashes retain their own names and semantics. They
are not the host's raw-byte SHA-256 evidence bindings. An Engine assessment
score or projection capability label is not a P1 acceptance or conformance
result.

## 6. Acceptance checks

| ID | Required observation |
| --- | --- |
| P11-01 | All five records validate against the named Standard schema; declared UIDs are distinct and raw-byte digests match the fixed inventory |
| P11-02 | A exposes exactly S, D1, and E as source file nodes, with their correct parsed and Engine-observed identities and matching system/build metadata |
| P11-03 | A resolves D1's `documents` and `cites` edges to S and E and selects D1 as current without requiring `head: true` |
| P11-04 | B adds only D2 and R; all three previously loaded files and their raw-byte digests remain unchanged |
| P11-05 | B resolves every declared semantic relationship and contains one canonical D1-to-D2 lineage link, with reciprocal node-level successor/predecessor observations |
| P11-06 | B selects D2 as current, reports D1 as historical, and exposes the expected `head` and `invalidAt` values without rewriting D1's authored state |
| P11-07 | C identifies D1 by UID with its original revision, bytes, and evidence reference; D2 remains visible as successor and is not substituted for the request |
| P11-08 | Neither snapshot has an error/critical diagnostic, ambiguous or unresolved required reference, duplicate UID, or unexpected warning; retained informational diagnostics are visible |
| P11-09 | Required observations are actually produced by the built Engine; absence, exception, or mismatch produces visible non-success and a non-zero test exit |
| P11-10 | A second run over identical inputs yields identical selections, identity/relationship sets, raw-byte bindings, and check outcomes after excluding only declared volatile fields |
| P11-11 | Outputs identify sources, runtime, commands, limitations, and component responsibility, and contain no claim that P1, an article, or a GKOS profile is complete |

P11-09 needs a small harness check that an absent observation or unavailable
observer cannot generate PASS. This tests the reliability of the demonstration
itself; it does not bring the P1.2 dossier-mutation suite into this milestone.
For P11-10, exclude generation timestamps, measured durations, and absolute
output locations from comparison. Do not exclude identities, digests,
relationship sets, diagnostics, or substantive results. Preserve raw outputs
even when a normalised comparison is used.

## 7. Implementation files and verification

The implementation adds the following surfaces; the Standard test's helpers
for fixture loading, evaluation, execution, and reporting live beside it.

| Repository | Planned path | Responsibility |
| --- | --- | --- |
| Standard | `fixtures/provisional/eu-ai-evidence/p1/` | Five records and the single authoritative `manifest.json` |
| Standard | `conformance/runner/examples/eu-ai-evidence/p1-valid-dossier.test.mjs` | Explicit `node:test` example, Standard expectations, result capture and readable output; small helpers may live beside it |
| Standard | `conformance/runner/examples/eu-ai-evidence/p1-harness.test.mjs` | Checks failure reporting, ambiguous selection refusal, safe fixture paths, and a real non-zero child-process exit with a missing observer |
| Engine | `examples/eu-ai-evidence/p1-observer.mjs` | Thin public-API observer without embedded expectations |
| Engine | `test/eu-ai-p1-observer.test.mjs` | Focused tests of the observer's actual graph output and input preservation, using small inline records rather than copied P1 fixtures |

Document the working invocation and walkthrough in this spec when implemented;
do not add another progress tracker. Existing `PHASES.md` links the spec and
eventual evidence.

### Working invocation

From the Standard repository root, after restoring the existing locked
dependencies and running the existing Engine build command:

```powershell
$env:GKOS_P1_ENGINE_OBSERVER = '<absolute path to GKOS-Engine/examples/eu-ai-evidence/p1-observer.mjs>'
$env:GKOS_P1_OUT = '<absolute path to a fresh output directory>'
node --test conformance/runner/examples/eu-ai-evidence/p1-valid-dossier.test.mjs
```

The test resolves the supplied module path as a file URL so Windows paths and
spaces work. Both variables are required for the explicit example run; a
missing observer is an error, not a switch to a fake or Standard-only run.
Fixture paths resolve from the Standard checkout, not the shell's current
directory. Existing dependency installation and Engine build instructions
remain prerequisites; use the existing supported Node range and lockfiles.

Implement in this order: author and independently validate the fixed fixture;
add the Engine observer; connect the three inspection scenarios and assertions;
capture results and repeat the run. Keep source fixtures read-only throughout.

Before accepting implementation, run the new explicit example and observer
tests, the existing Engine lineage/projection/public-API tests, and the normal
Standard runner tests and registry lint. Run the Engine build/typecheck and
normal test suite as the final compatibility check. Preserve commands and
results; no default fixture count, qualification result, or existing command
behavior may change because P1.1 was added.
Compare both repositories with the recorded pre-implementation state and
verify that no existing runtime logic, schemas, evaluators, or tests were
modified. Preserve pre-existing changes and distinguish the new example files
and planning/evidence updates from them.

## 8. Completion and handoff

P1.1 is ready for review when all acceptance checks have passed against the
recorded source/build versions, the outputs can be inspected, and the working
invocation is documented. Owner review of those results completes this
milestone; the full P1 phase still awaits P1.2 and P1.3.

P1.2 should reuse these UIDs, baseline digests, observations, and selection
rules for its controlled failures and chosen authorisation boundary. P1.3
should reuse the declared inventory and captured results when specifying the
review package. Neither later milestone may silently redefine the valid
baseline to accommodate a failing case.

Deferred work includes protected-record retrieval, an authorisation service,
tampering and conflict demonstrations, review-package verification, automatic
logging, production storage, retention, signatures, and regulatory submission.
Rebuilding a graph from host-supplied snapshots does not demonstrate an Engine
write transaction, archival preservation, or live update service.

There are no unresolved product-scope questions in this specification. If the public
API cannot supply a required observation, record the exact gap
and keep that check unsuccessful. Do not repair the original logic during this
evaluation; describe a possible fix separately for the owner. The owner
requested implementation of P1.1 only on 2026-09-07; P1.2 and P1.3 remain
summary placeholders.

## 9. Source inspection baseline

This draft was grounded in Standard commit
`90d627d4581a95296132a665184838f9e7dbf2cf` and Engine commit
`e5ea87bf5cf2c9a6300814f26d237249d6fb8693`, alongside the local P1 planning
documents. No runtime demonstration was performed during specification work.

Key inspected sources were the Standard's
`schemas/gkx-frontmatter-2.0.schema.json`,
`fixtures/corpus/gcp1-p01-agent-ready-minimal.md`, and existing runner/adapter;
and the Engine's `src/index.ts`, `src/graph.ts`, `src/lineage.ts`,
`src/temporal.ts`, `src/gkx23.ts`, `src/paths.ts`, `src/types.ts`,
`test/lineage.test.mjs`, and `package.json`.

Compatibility details to preserve: GKX `2.0` records currently enter the Engine's
`gkx-2.3-validating-projection` in compatibility mode, with informational
`GKX-SCHEMA-002`; `buildGraph` uses its canonical lineage/temporal code; and
Engine content cache hashes are not raw-byte cryptographic digests. Recheck
these coordinates when implementation begins and record any relevant drift.

## 10. Execution findings and evidence

The initial executable run established 10 of 11 acceptance checks. P11-08
failed and remains a failure; neither the frozen fixture nor the warning
expectations were changed to obtain a passing result. The implementation of
the test setup is available, but P1.1 acceptance and full P1 completion must
not be claimed.

The observed issues have different meanings:

1. **Engine graph representation:** UID-valued `documents` and `cites`
   declarations resolve as semantic edges, while the graph also retains
   unresolved property edges to those same UID strings. The initial snapshot
   reports two unresolved nodes; the revised snapshot reports three. This is
   an observed inconsistency between graph representations for these inputs,
   not evidence that every relationship failed to resolve.
2. **Fixture provenance gap:** The authored fixture has no `provenance.source_refs`.
   The Engine emits `GKX-PROVENANCE-001` for each record. These warnings expose
   missing provenance declarations in our fixture and are not classified as
   an Engine defect. Any later fixture revision or explicitly justified
   warning expectation must be versioned and reviewed separately.

Both findings are preserved in the raw observations and assertion record.
Potential repairs to GKOS logic are outside the authorised evaluation scope.
The primary evidence directory is
`conformance/evidence/eu-ai-p1.1-20260907/`; the shared tracker links final
reports and compatibility results. The output is a local self-evaluation,
not independently reviewed evidence or a qualifying conformance package.
