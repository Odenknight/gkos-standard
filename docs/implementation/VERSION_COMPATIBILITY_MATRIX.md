# GKOS/GKX implementation version compatibility matrix

**Status:** developmental orientation; informative, not normative

**Reviewed:** 2026-09-02

This matrix keeps Standard publications, machine namespaces, canonical
profiles, projection profiles, signed package releases, development heads,
product pins, protocol versions, and provisional application-profile
coordinates separate. Matching numbers never imply compatibility.

## Current Standard and reference-implementation coordinates

| Coordinate | Current reviewed value | Meaning | Compatibility rule |
| --- | --- | --- | --- |
| GKOS publication | `GKOS-2026-08-20 v0.80` | Current developmental Standard publication | A claim binds to the exact release; prior claims do not carry forward automatically |
| GKX namespace | `2.0` | Current machine exchange namespace | Current records use `gkx_version: "2.0"`; this is not an Engine package version |
| Canonical artifact profile | `GKX-CBOR-1` | Deterministic CBOR and SHA-256 identity for applicable canonical artifacts | Required by the v0.80 canonicalization annex where the artifact contract invokes it; JSON/YAML renderings are views |
| Standard assessment/SRTP projection coordinate | `gkx-2.0-validating-projection` | Standard schema value and provisional SRTP fixture coordinate | Retained exactly in the SRTP experiment; not inferred from an Engine API name |
| Engine validating projection profile | `gkx-2.3-validating-projection` | Separately versioned Engine implementation profile | Not the GKX namespace and not interchangeable with the SRTP coordinate |
| GKOS-Engine signed package release | `2.1.2` at `7bf14b481e78c5ae9d1e14661602be4f24559d0e` | Current reviewed signed reference-implementation tag target | Stable released baseline; later development commits do not inherit this release identity |
| GKOS-Engine development head reviewed | `8207958047b3361ae21ac07c5a2abbd26a42a684` | Development state eleven commits beyond the signed 2.1.2 tag at the review date | Must be identified as development and assessed separately; package metadata alone does not make it a new release |
| GKOS-Engine-Lite signed package release | `2.1.2` at `4027bfc4499ad0a2f3e753401f1320468e283823` | Signed Lite tag target | Projection/consumer baseline only; not an independent-implementation result |
| GKOS-Engine-Lite development head reviewed | `1e1f84c547f610ecae2eb459cba53d3f1d00889c` | Development state five commits beyond its signed 2.1.2 tag at the review date | Must remain separate from the tag, package release, and Full Engine pin |
| Adapter API symbol | `buildGkx23Projection` | Engine API symbol consumed by the informative Standard adapter | An API symbol is not a namespace, requirement, profile, or compatibility claim |

Exact implementation coordinates must be rechecked before publication or a
claim. This table records the 2026-09-02 review state; it is not a moving
“latest version” service.

## Provisional scientific trace coordinates

| Coordinate | Pinned value | Standing |
| --- | --- | --- |
| SRTP application profile | `SRTP-DRAFT-0.1` | Provisional, informative, and non-qualifying |
| SRTP fixture catalog | `SRTP-DRAFT-FIXTURES-0.1.1` | Provisional graph-evaluation suite; SHA-256 `ed9cc63b50ecf332b96c576af9139370a1c708b6145224d881cafefdde8aa651` |
| SRTP Engine package coordinate | `2.0.1` at `7c742436d50b34f6dda66976212a672fb51f7c21` | Exact historical experiment dependency; not the current signed Engine release |
| SRTP Standard publication coordinate | `GKOS-2026-08-05 v0.78` where declared by its provisional matrix | Exact experimental compatibility tuple; does not silently advance with the repository |

The machine-readable SRTP companion remains
[`../../conformance/provisional-requirements/version-compatibility.matrix.json`](../../conformance/provisional-requirements/version-compatibility.matrix.json).
It describes that provisional experiment, not a global latest-version registry.

## Current protocol-binding inputs

Protocol bindings are governed separately under R21 and remain informative.

| External coordinate | Reviewed value | Boundary |
| --- | --- | --- |
| Model Context Protocol | `2026-07-28` | Current R21 binding target; existing `2025-11-25` implementations require an explicit migration lane |
| Agent2Agent Protocol | `v1.0.1` | Current R21 agent-to-agent binding target; protocol, transport binding, SDK, Agent Card, and implementation versions remain separate |
| OWASP Agent Control Standard | `v0.1.1` | Public-preview R21 crosswalk target; not a normative GKOS dependency |

See [`../ecosystem/EXTERNAL_SOURCE_REGISTER.md`](../ecosystem/EXTERNAL_SOURCE_REGISTER.md)
for primary sources, access dates, and mapping limitations.

## Governing rules

1. Persisted identifiers retain their original bytes and provenance.
2. Migration creates a new record or evidence event rather than silently
   relabeling prior data.
3. A package version, tag target, development head, product pin, and protocol
   version are independent coordinates.
4. A signed tag provides integrity and origin evidence under its trust model;
   it does not prove conformance or substantive correctness.
5. Public claims use exact public evidence. The project is awaiting a public
   second implementation and names no private implementation as that candidate.
