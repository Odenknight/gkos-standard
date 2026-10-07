# v0.82 machine-readable coordinate consolidation (R24 G82-06)

**Date:** 2026-09-22

R24 G82-06 requires every current machine-readable companion that names a
release coordinate to use the v0.82 coordinate or be documented as a
historical pin. No companion may keep a superseded release-candidate
coordinate.

## Updated to `GKOS-2026-09-22 v0.82`

| File | Previous value | Role |
| --- | --- | --- |
| `requirements/PROFILE_APPLICABILITY.json` | `GKOS-2026-08-29 v0.81 release candidate` | Current machine-readable mirror of the profile applicability map |
| `fixtures/track-a/fixtures.manifest.json` | `GKOS-2026-08-29 v0.81 release candidate` | Active fixture catalog |

## Historical pins (unchanged)

These values record the release a file was created for. Their content is
unchanged since that release, and changing the value would falsify their
provenance. None is a release-candidate coordinate.

| File | Pinned value | Reason |
| --- | --- | --- |
| `requirements/EVIDENCE_VOCABULARY.json` | `GKOS-2026-08-20 v0.80` | Vocabulary 1.0.0 is unchanged since v0.80 |
| `fixtures/fixtures.manifest.json` | `GKOS-2026-08-20 v0.80` | Starter catalog 0.2.0, unchanged since v0.80 |
| `fixtures/gcp6/fixtures.manifest.json` | `GKOS-2026-08-20 v0.80` | GCP-6 catalog, unchanged since v0.80 |
| `fixtures/gcp7/fixtures.manifest.json` | `unpublished R17 development amendment over GKOS-2026-08-20 v0.80` | R17 overlay as allocated; R17 was published in v0.81 |
| `requirements/PROFILE_APPLICABILITY.R17.json` | `unpublished R17 development amendment over GKOS-2026-08-20 v0.80` | R17 overlay as allocated; R17 was published in v0.81 |
| `fixtures/provisional/evidence/*.json` | `GKOS-2026-08-20 v0.80` | Provisional example evidence packets created against v0.80 |
| `fixtures/provisional/l3-interoperability/cases.json` | `candidate_standing: proposed-v0.82` | Historical R23 identifier; R24 Option A retargets R23 to the next normative edition |

The `examples` value in `schemas/conformance-manifest.schema.json` is
illustrative and is not a coordinate.
