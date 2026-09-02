# GKOS conformance

GKOS defines cumulative GCP-1 through GCP-7 responsibilities plus an
independent Viewer/Projection Profile. GKOS Core requires GCP-1 through GCP-5;
GKOS Advanced requires GCP-1 through GCP-7. A named GCP-6 Context-Only
Extension is read-only and grants no consequential-action authority. A higher
profile inherits all applicable lower requirements.

Claims must include a machine-readable manifest
(`../schemas/conformance-manifest.schema.json`), human-readable report,
standard and test versions, evidence, limitations, and exceptions.
Self-attested and independently verified claims must be distinguished. Every
claim is exact-bound to its dated standard release, GKX version, implementation,
fixture suite, evidence, exceptions, and assessment type under R16.

The repository retains provisional prose requirements
(`provisional-requirements/`) plus the first executable slice of the GKOS-TS
suite. `runner/` is an
adapter-neutral runner that executes `../fixtures/fixtures.manifest.json`
against any implementation exposing the small adapter contract documented in
`runner/run.mjs`, and emits a schema-valid conformance claim. An informative
gkos-engine adapter is included. The executable suite remains incomplete:
catalog 0.2.0 covers GCP-1/GCP-3 classes only, and known standard/implementation
divergences are recorded in `../fixtures/DIVERGENCES.md` rather than hidden.
Graph-level expectations (`graph_expect`) declared in the catalog are evaluated
by a deterministic Standard-owned evaluator over an adapter-neutral graph
observation. An adapter that omits that observation still reports the affected
fixtures as `UNEVALUATED`, emits no profile claim, and exits non-zero; malformed
or contradictory observations fail. Executing the starter slice demonstrates
the mechanism only: catalog 0.2.0 still declares no complete qualifying profile.

The repository-owned conformance workflow runs the locked runner suite as a
blocking matrix on Linux and Windows with Node 22 and Node 24. Node 23 is a
separate informative compatibility lane and cannot substitute for any blocking
matrix cell.

The permanent requirement allocations are published in
[`../requirements/REGISTRY.md`](../requirements/REGISTRY.md). Fixtures cite
those GKOS IDs, while implementation observations remain in non-normative
adapter maps such as
[`adapters/gkos-engine.requirements.json`](adapters/gkos-engine.requirements.json).
v0.80 adds R16 behavior requirements and initial Layer-6/Layer-7 schemas, but
the missing fixtures remain missing and no qualifying profile is created.

## Executable v0.80 evidence foundation

The runner now includes a reference Layer-6 phase split, canonical CBOR
verifier, declared diagnostic-JSON rendering/parser, clean-process replay test,
machine-readable applicability and evidence vocabularies, and registry lint.
The preserved replay result is in
[`evidence/gcp6-replay-v0.1/`](evidence/gcp6-replay-v0.1/). It reports
`mechanism_demonstrated` with no qualifying profiles or tier claim.

Registry integrity is a required runner test. Mutation coverage remains a
reported deficit until active negative fixtures exist for every registered
gate; `npm run lint:mutation-coverage` is the eventual strict claim gate.

## Provisional SRTP graph runner

`runner/srtp-graph.mjs` evaluates the separate `SRTP-DRAFT-0.1` graph fixtures
under `../fixtures/provisional/science/`. It materializes fixture overlays,
validates the provisional scientific trace schemas, tests version coordinates,
and executes cross-record checks. Its report always contains
`profiles_claimed: []`; even an all-PASS run is draft-suite evidence, not a
GKOS conformance or scientific-validity claim.

```sh
cd conformance/runner
npm run srtp:draft
```

## Current qualification boundary

- Fixture catalog 0.2.0 declares no complete qualifying profile. A run therefore
  emits an empty `profiles_claimed` array even when every executable slice passes.
- The declared GCP3-C01 and GCP3-L01 graph expectations are executable, but the
  starter catalog remains incomplete and cannot support external GCP-3 qualification.
- PASS, FAIL, PARTIAL, and UNEVALUATED are distinct report states; PARTIAL and
  UNEVALUATED are not profile passes. The starter runner currently emits
  per-fixture PASS, FAIL, KNOWN-DIVERGENCE, SKIP, or UNEVALUATED.
- No current implementation has satisfied the v1.0 second-independent-implementation gate.
- Engine-Lite cannot satisfy that gate because using the pinned Engine's deterministic execution path is its compatibility contract.
- A v0.79 or earlier claim does not carry forward to v0.80; reassessment is
  required against the exact v0.80 requirement and fixture baseline.

A future external run must pin the required GCP target, standard and fixture
commits, runner/adapter rule, candidate source, dependency lock, environment,
commands, and raw outputs before execution. See
[TECHNICAL_README.md](../TECHNICAL_README.md) and the
[2026-08-04 critique remediation](../docs/reviews/2026-08-04_CRITIQUE_ASSESSMENT_AND_REMEDIATION.md).

```sh
cd conformance/runner && npm install
GKOS_ENGINE_DIST=/path/to/GKOS-Engine/dist/kosmos-core.mjs \
  node run.mjs --adapter ./adapters/gkos-engine.mjs --attested-by "Your Name"
```
