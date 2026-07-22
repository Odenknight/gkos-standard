# GKOS conformance

GKOS defines cumulative provisional profiles GCP-1 through GCP-7 plus a
Viewer/Projection Profile. A higher profile inherits all applicable lower
requirements.

Claims must include a machine-readable manifest
(`../schemas/conformance-manifest.schema.json`), human-readable report,
standard and test versions, evidence, limitations, and exceptions.
Self-attested and independently verified claims must be distinguished. A claim
citing a draft technical specification must disclose that status and identify
the last ratified baseline (v0.76 §4.1).

v0.76 provides provisional prose requirements (`provisional-requirements/`)
plus the first executable slice of the GKOS-TS suite: `runner/` is an
adapter-neutral runner that executes `../fixtures/fixtures.manifest.json`
against any implementation exposing the small adapter contract documented in
`runner/run.mjs`, and emits a schema-valid conformance claim. An informative
gkos-engine adapter is included. The executable suite remains incomplete:
catalog 0.1.0 covers GCP-1/GCP-3 classes only, and known standard/implementation
divergences are recorded in `../fixtures/DIVERGENCES.md` rather than hidden. Graph-level expectations (`graph_expect`) declared in the catalog are not yet evaluated by the starter runner; they bind future runner work.

```sh
cd conformance/runner && npm install
GKOS_ENGINE_DIST=/path/to/GKOS-Engine/dist/kosmos-core.mjs \
  node run.mjs --adapter ./adapters/gkos-engine.mjs --attested-by "Your Name"
```
