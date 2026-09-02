# GKOS-Engine implementation guide

**Status:** informative reference-implementation orientation; not a GKOS
requirement, compatibility guarantee, profile claim, or certification.

## Current signed release baseline

- **Package:** `gkos-engine` 2.1.2
- **Signed tag:** `v2.1.2`
- **Tag target:** `7bf14b481e78c5ae9d1e14661602be4f24559d0e`
- **GKX namespace:** 2.0
- **Engine validating projection:** `gkx-2.3-validating-projection`

Later Engine development commits are separate coordinates even when a package
file retains `2.1.2`. They must not inherit the signed release standing without
a distinct version, tag, and evidence.

GKOS-Engine implements deterministic GKX parsing, validation, assessment,
projection, graph, retrieval, source-content-read-only Navigation, and selected
adapter and receipt/policy mechanisms. These are implementation capabilities,
not Standard clauses. Conformance is assessed against the exact GKOS release,
requirements, schemas, fixtures, and evidence—not Engine internals or matching
version numbers.

Records use `gkx_version: "2.0"`; derived sidecars are under `.gkx/`;
implementation diagnostics use `GKX-*` codes; and the CLI command is `gkx`.

```sh
gkx validate ./corpus
gkx assess ./corpus
gkx graph ./corpus -o graph.json
gkx export graphiti ./corpus --episodes episodes.json
```

The signed 2.1.2 reference implementation includes read-only MCP integration
for the predecessor MCP `2025-11-25` protocol generation. That behavior is
migration evidence, not proof of the separate R21 MCP `2026-07-28` binding.

A read or proposal surface grants no governed write, review, or consequential-
effect authority. Any writer or effect executor requires a separately
versioned, tested, authorized, and activated path satisfying the applicable
GKOS layer contracts.
