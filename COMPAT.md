# GKOS ecosystem compatibility matrix

Ratified by operator: 2026-07-23 · refreshed 2026-07-27 against the current
ecosystem state.

One-page train status per [VERSIONING.md](VERSIONING.md). This file is a
factual snapshot, not a normative document — it does not amend
`standard/`, `releases/`, or `decisions/`.

| Repo | Shipped version | Engine relation | Last verified |
|---|---|---|---|
| GKOS-Engine | v1.1.3 (HEAD tagged) | is the anchor | 2026-07-27 |
| GKOS-Engine-Lite CLI | v1.1.3, pin `#v1.1.3` (SHA-resolved) | verbatim adoption of engine v1.1.3 | 2026-07-27 |
| GKOS-Engine-Lite desktop | desktop-v0.2.0 | bundles the CLI/engine pin above; own packaging namespace | 2026-07-27 |
| Kosmos-Oden | 0.7.0 | engine pin `#v1.1.2` (SHA-pinned) | 2026-07-27 |
| Kosmos-Oden-Lite | 1.0.6 | vendored `src/core` at engine v1.0.7 parity (drift-checked) | 2026-07-27 |
| Kosmos_Research_Suite | keymap authority v1.1.3 | keymap authority re-pinned to engine v1.1.3 | 2026-07-27 |
| KRS-Lite | v0.3.2 | GKOS conformance claim: v0.76 GCP-3 | 2026-07-27 |

## How to update this file

One row-edit per release: when a repository ships, update its row — shipped
version, engine relation, and last-verified date — in the same PR as the
release. Do not batch multiple repositories' updates into one edit unless
they released together. If a "→ in progress" note resolves, replace it with
the landed value and refresh the date.
