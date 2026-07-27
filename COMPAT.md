# GKOS ecosystem compatibility matrix

Ratified by operator: 2026-07-23 · seeded from the 2026-07-23 ecosystem survey.

One-page train status per [VERSIONING.md](VERSIONING.md). This file is a
factual snapshot, not a normative document — it does not amend
`standard/`, `releases/`, or `decisions/`.

| Repo | Shipped version | Engine relation | Last verified |
|---|---|---|---|
| GKOS-Engine | v1.1.0 (HEAD tagged) | is the anchor | 2026-07-23 |
| GKOS-Engine-Lite CLI | 1.1.0, pin `#v1.1.0` | verbatim adoption of engine v1.1.0; tag repair in progress → `v1.1.0` | 2026-07-23 |
| GKOS-Engine-Lite desktop | desktop-v0.2.0 | bundles the CLI/engine pin above; own packaging namespace | 2026-07-23 |
| Kosmos-Oden | 0.6.9 (source) | engine pin `#v1.0.7`; 0.7.0 release in progress → engine v1.1.0 | 2026-07-23 |
| Kosmos-Oden-Lite | 1.0.5 | vendored `src/core` ≈ engine v1.0.6/v1.0.7 parity (patches-only) | 2026-07-23 |
| Kosmos_Research_Suite | frontmatter-keymap v1.0.4 | re-pin to engine v1.1.0 in progress | 2026-07-23 |
| KRS-Lite | v0.3.1 | GKOS conformance claim: v0.76 GCP-3; v0.3.2 (fact→reported patch) in progress | 2026-07-23 |

## How to update this file

One row-edit per release: when a repository ships, update its row — shipped
version, engine relation, and last-verified date — in the same PR as the
release. Do not batch multiple repositories' updates into one edit unless
they released together. If a "→ in progress" note resolves, replace it with
the landed value and refresh the date.
