# GKOS fixture catalog

Executable starting with catalog 0.1.0; current catalog 0.2.0 contains eight
fixtures across positive,
negative, boundary, contradiction, lineage, and promotion-gate classes for
GCP-1 and GCP-3, with schema expectations bound to `../schemas/` and projection
expectations observed through implementation diagnostic codes. Each fixture now
cites permanent GKOS requirement IDs from `../requirements/REGISTRY.md`; the
separate non-normative Engine map is
`../conformance/adapters/gkos-engine.requirements.json`. Those
observations do not make `GKX-*` diagnostics normative. Catalog 0.2.0's two
pair/graph expectations are executable through the Standard-owned evaluator.
The evaluator binds adapter observations to the parsed fixture UIDs, projected
UIDs, and actual paired basenames; adapter assertions cannot define successful
UID or basename resolution. Catalog 0.2.0 remains non-qualifying because it
declares no complete requirement or qualifying profile and the remaining graph
topics have not been allocated. `fixtures.manifest.json` is the
machine-readable catalog; `expected/` holds engine-generated golden outputs;
`DIVERGENCES.md` records where the reference implementation and the standard's
expectation disagreed at the recorded Engine v1.0.5 baseline (three historical
divergences —
recorded, not hidden).

The historical R10 decision record describes the catalog as containing nine
fixtures. The machine-readable manifest has contained eight fixture objects;
the decision record is preserved as written, while this current-facing count is
corrected from the catalog itself.

Catalog 0.2.0 explicitly declares `qualifying_profiles: []` and
`complete_requirements: {}`. An adapter that omits a declared graph observation
produces `UNEVALUATED`; a malformed, identity-unbound, or falsely resolved
observation produces `FAIL`. Both outcomes block profile claims and make the
starter runner exit non-zero. Passing the executable starter mechanisms still
creates no requirement, profile, or tier claim.

The active qualifying catalog still lacks complete sensitivity, delegation,
replay, rendering-round-trip, negative-space, refusal, effect-scope, erasure,
context-reproduction, and authorized-use coverage, plus GCP-4 through GCP-7
and Viewer/Projection completion. Separate post-v0.80 mechanism evidence does
not make those active-catalog deficits pass. Fixtures remain incomplete in v0.80; a
conformance claim must disclose which fixtures were executed, catalog and
implementation versions, outcomes, exceptions, known divergences, and whether
evaluation was self-attested or independent (`../schemas/conformance-manifest.schema.json`).

Post-v0.80 mechanism catalogs are preserved separately under `gcp6/` and
`gcp7/`. The GCP-7 catalog includes the accepted unpublished R17
authority-window boundary cases. These catalogs increase executable evidence
but declare no complete requirement or qualifying profile.

`provisional/science/` is a separate non-qualifying SRTP draft graph suite. Its
proposal handles are not permanent requirement IDs and do not alter this active
catalog.
