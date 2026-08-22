# GCP-6 replay mechanism evidence v0.1

This directory preserves the first reference execution of the v0.80 Layer-6
phase split. It is self-attested mechanism evidence, not cumulative GCP-6,
GKOS Core, Context-Only Extension, or Advanced conformance.

Run from `conformance/runner`:

```sh
npm ci
npm run gcp6:replay
```

The automated test runs the compiler twice in distinct clean processes and
requires exact equality of the canonical Context Manifest bytes, artifact hash,
and declared human-rendering round trip. CI repeats the suite on Node 22 and 24.

Preserved result:

- Selection-envelope SHA-256:
  `a1ee26b8b6077655154a3fdf73bbd93122033a22b09bc6a47b25bbb3564200eb`
- Context-manifest SHA-256:
  `03d9507b12bb07d3d0224359881c0f6b6f7c2eb79346e31ca25925365dc2667b`
- Evidence status: `mechanism_demonstrated`
- Qualifying profiles: none

The preserved files were produced on Node 24.19.0. The second-runtime result is
pending CI execution on Node 22; a difference is a canonicalization defect or
declared portability limitation and must not be normalized after the fact.
