# Fixture and test inventory — GKOS-Engine and GKOS-Engine-Lite at current main

From: technical-fixtures. Date: 2026-09-08. Feeds S-03 (NIST AI 200-2) and paper P-01 section 3. Every count, SHA and timestamp below came from a tool run on 2026-09-08 or from a CI log opened with `gh` on 2026-09-08; the source is named next to each. Values I could not produce are written `not verified`.

## 0. Checkouts and environment

| Repo | Command | Result |
|---|---|---|
| GKOS-Engine | `git clone https://github.com/Odenknight/GKOS-Engine` (default branch `main`) | HEAD `650eab4a6752227cae336d7556a57826c22a0d5a`, "Merge pull request #45 from Odenknight/docs/current-capabilities-github-20260906", committed 2026-09-06 18:07:02 -0400; `package.json` version `2.2.0`; newest tags `v2.1.1`, `v2.1.2` |
| GKOS-Engine-Lite | `git clone https://github.com/Odenknight/GKOS-Engine-Lite` (default branch `main`) | HEAD `1e1f84c547f610ecae2eb459cba53d3f1d00889c`, "Merge pull request #24 from Odenknight/codex/reconcile-lite-exact-recovery-ci-20260901", committed 2026-09-02 00:23:42 -0400; `package.json` version `2.1.2`; newest tag `v2.1.2` |

Local environment: Windows 11 Pro 10.0.26200, Git Bash (MINGW64_NT-10.0-26200), `node v24.18.0`, `npm 10.9.4`, `cargo 1.98.1`, `gh` authenticated as `Odenknight`. Clones live in the session scratchpad, not in the working root.

Run-evidence sources used:

- Engine: GitHub Actions run `34063066179` (workflow `CI`, branch `main`, head `650eab4a…` = current HEAD, created 2026-09-06T22:07:04Z, conclusion `success`; `gh run list --repo Odenknight/GKOS-Engine --branch main`, `gh run view 34063066179`, and `gh run view --job 101566946199 --log` for job `build (24)`). Companion run `34063066239` (workflow "Historical and current runtime qualification", same head, success) was listed but its log was not opened.
- Lite: GitHub Actions run `33590643533` (workflow `CI`, branch `main`, head `1e1f84c5…` = current HEAD, created 2026-09-02T04:23:47Z, conclusion `success`; logs opened for jobs `Linux blocking / Node 24` (100123763569), `retrieval-rust-latest` (100123763660), `Windows desktop-native / Node 24` (100123763751)).
- Audit report `reports\GKOS-ENGINE-LITE-SUCCESSOR-AUDIT-20260901.md` (Lite at `938a3ebc…`, an ancestor of current main) and `reports\GKOS-FOUR-SUCCESSOR-CONSOLIDATED-AUDIT-20260901.md` (Engine at `476137ce…`, not current main). These are prior-state evidence, not current-main evidence, and are marked as such.
- Local runs: `npm ci && npm test` in each clone, 2026-09-08 (section 3). Raw logs: `FIXTURE-INVENTORY-2026-09-08_GKOS-Engine-test.log`, `FIXTURE-INVENTORY-2026-09-08_GKOS-Engine-Lite-test.log`.

## 1. GKOS-Engine (650eab4a6752227cae336d7556a57826c22a0d5a)

### 1.1 How tests are selected

`npm test` runs `scripts/run-current-tests.mjs`, which takes every `test/*.test.mjs` except `agent-identity-mcp-contract.test.mjs` (declared `HISTORICAL_TEST`, run at a fixed checkout in the separate "Historical and current runtime qualification" workflow) and except `service-vector-real.test.mjs` unless `GKOS_TEST_LOCAL_EMBEDDING_CONFIG` is set (printed as `qualification-exempt`). Three stability-priority files run first in their own groups; the rest run as one group. `npm run test:navigation` runs 13 named files separately in CI. Contract fixtures under `contracts/` are consumed by these tests; they are not runnable on their own.

### 1.2 Repo-assigned fixture IDs

Two manifests assign IDs (`contracts/*/fixtures.manifest.json`). Both declare `"standing": "integration-only", "gkos_conformance": false`.

`ENGINE-NAV-CONTRACT-1.0.0` (`contracts/navigation/ENGINE-NAV-CONTRACT-1.0.0/fixtures.manifest.json`), each bound to a test file:

| ID | Test file | Checks (from ID; test-body reading not done for each) |
|---|---|---|
| nav-deterministic-candidate-run-metadata | test/navigation.test.mjs | deterministic candidate/run metadata |
| nav-run-value-adversarial-scan | test/navigation.test.mjs | adversarial scan values |
| nav-stable-id-rename-move | test/navigation.test.mjs | stable identity survives rename/move |
| nav-exact-content-move-observation | test/navigation.test.mjs | exact-content move observed, not inferred |
| nav-fail-closed-missing-sensitivity | test/navigation.test.mjs | missing sensitivity fails closed |
| nav-metadata-discoverability-denial | test/navigation.test.mjs | discoverability denial on metadata |
| nav-noncanonical-moc-flag | test/navigation.test.mjs | non-canonical MOC name flagged |
| nav-canonical-promoted-semantic-parity | test/navigation.test.mjs | canonical vs promoted names behave alike |
| nav-promotion-config-version-digest | test/navigation.test.mjs | promotion binds config version and digest |
| nav-promotion-state-change-receipt-role | test/navigation.test.mjs | promotion emits State-Change Receipt role |
| nav-archive-ignore-exactness | test/navigation.test.mjs | `_archive/moc-runs/**` ignored exactly |
| nav-reentry-merge-rejection | test/navigation.test.mjs | re-entry merge request rejected |
| nav-reentry-predecessor-mutation-rejection | test/navigation.test.mjs | predecessor mutation rejected |
| nav-reentry-standing-inheritance-rejection | test/navigation.test.mjs | standing inheritance rejected |
| nav-inferred-supersession-rejection | test/navigation.test.mjs | inferred supersession rejected |
| nav-delegation-wrong-scope-rejection | test/navigation.test.mjs | delegation with wrong scope rejected |
| nav-delegation-wrong-subject-rejection | test/navigation.test.mjs | wrong subject rejected |
| nav-delegation-expired-rejection | test/navigation.test.mjs | expired delegation rejected |
| nav-delegation-widened-child-rejection | test/navigation.test.mjs | child delegation wider than parent rejected |
| nav-delegation-nonlineage-operation-rejection | test/navigation.test.mjs | non-lineage operation rejected |
| nav-delegation-missing-predicate-rejection | test/navigation.test.mjs | missing predicate rejected |
| nav-delegation-incomplete-predicate-binding-rejection | test/navigation.test.mjs | incomplete predicate binding rejected |
| nav-checker-downgrade-structurally-unavailable | test/navigation-architecture.test.mjs | checker cannot be downgraded structurally |
| nav-deterministic-major-no-downgrade | test/navigation.test.mjs | deterministic major cannot downgrade |
| nav-deterministic-indeterminate-no-downgrade | test/navigation.test.mjs | indeterminate result cannot downgrade |
| nav-delegation-receipt-fields | test/navigation.test.mjs | delegation receipt carries required fields |
| nav-deferred-review-overdue-grant-freeze | test/navigation.test.mjs | overdue deferred review freezes grant |
| nav-deferred-review-exception-durable-precedence | test/navigation.test.mjs | durable exception precedence |
| nav-governance-operation-replay-idempotent | test/governance.test.mjs | governance operation replay is idempotent |
| nav-governance-receipt-unavailable | test/governance.test.mjs | behaviour when receipt store unavailable |
| nav-context-pack-kind-boundary | test/navigation.test.mjs | context pack kind boundary |
| nav-core-no-source-write-reachability | test/navigation-architecture.test.mjs | core cannot reach source writes |
| nav-capability-truthfulness | test/navigation.test.mjs | advertised capabilities match behaviour |

(33 entries total; `python -c "json.load(...)"` over the manifest.)

Run evidence for this suite: `test/navigation.test.mjs` (20 `test(` calls) and `test/navigation-architecture.test.mjs` (9) run under both `npm run test:navigation` (CI job `build (24)`: `tests 160, pass 160, fail 0`) and `npm test`. Status: **executed** (CI 2026-09-06; local 2026-09-08, section 3).

`ENGINE-NAV-EFFECTS-CONTRACT-1.0.0` (`contracts/navigation-effects/ENGINE-NAV-EFFECTS-CONTRACT-1.0.0/fixtures.manifest.json`), each a JSON fixture file with an expected outcome, consumed by `test/navigation-effects-contract.test.mjs` (8 tests) and related `navigation-effects-*.test.mjs` files:

| ID | Fixture file | Expected |
|---|---|---|
| effects-managed-moc-success | fixtures/success.json | planned |
| effects-byte-identical-no-op | fixtures/no-op.json | no-op |
| effects-precondition-stale | fixtures/stale.json | stale |
| effects-authority-denied | fixtures/denied.json | denied |
| effects-agent-cas-conflict | fixtures/conflict.json | conflict |
| effects-startup-recovery | fixtures/recovery.json | effect-present-verified |
| effects-malformed-generated-markers | fixtures/malformed-markers.json | review-required |
| effects-path-escape-denied | fixtures/path-escape.json | denied |
| effects-ambiguous-lineage-preserved | fixtures/ambiguous-lineage.json | review-required |

Status: **executed** (in `npm run test:navigation` and `npm test`, CI 2026-09-06; local 2026-09-08).

### 1.3 Contract fixture files without repo-assigned IDs

Named by contract path and version. "Consumed by" comes from `grep -rl <contract dir> test/`.

| Fixture path | Consumed by | What it checks | Status |
|---|---|---|---|
| contracts/identity/GKOS-AGENT-IDENTITY-MCP-CONTRACT-1.0.0-draft.1/{canonical,error,mcp-conformance,migration,race,security}-fixture.json | test/agent-identity-mcp-contract.test.mjs (35 tests) | agent identity MCP contract draft.1: canonical bytes, error shapes, MCP conformance, migration, race, security | **executed in the historical lane only** — excluded from `npm test` as `HISTORICAL_TEST`; run by workflow "Historical and current runtime qualification" (run 34063066239, success, log not opened). Local: not run. |
| contracts/identity/GKOS-AGENT-IDENTITY-MCP-CONTRACT-1.0.0-draft.2/… (same six files) | test/agent-identity-mcp-contract-draft2.test.mjs (6) | draft.2 generator and manifest reproduce exact bytes | executed (CI + local) |
| contracts/ingest/gkos-ingest-validation-1.0.0-draft.1/{cli-conformance,conformance,storage-conformance}-fixture.json | test/ingest-validation.test.mjs (19), test/ingest-cli.test.mjs (14), test/ingest-storage.test.mjs (40) | fail-closed ingest validation; CLI argv/output freeze; storage authority lock | executed (CI + local) |
| contracts/retrieval/gkos-retrieval-1.0.0-draft.1/{canonical,conformance,gkos-toml-lexical}-fixture.json | test/retrieval-core.test.mjs (9), test/retrieval-store.test.mjs (34), test/retrieval-config.test.mjs (13) | Phase-1 retrieval contract shapes, SQLite FTS5 lexical generation, trusted config discovery | executed (CI + local) |
| contracts/retrieval/gkos-retrieval-1.0.0-draft.2/conformance-fixture.json | test/retrieval-provenance.test.mjs (18), test/retrieval-evaluation.test.mjs (21), test/ingest-storage.test.mjs; `NO_ELIGIBLE_RESULTS` at line 44 (see VR-0009) | as_of temporal matrix, coverage rules, stored provenance validity | executed (CI + local) |
| contracts/retrieval/gkos-retrieval-evaluation-1.0.0-draft.1/{conformance,metric-computation,scenario-conformance,tune-priority}-fixture.json, fixture-catalog.json, golden-fixture.toml | test/retrieval-evaluation.test.mjs (21), test/retrieval-evaluation-cli.test.mjs (23) | Phase-4 evaluation metrics, fixed provider digests, CLI freeze | executed (CI + local) |
| contracts/watcher/gkos-watcher-recovery-1.0.0-draft.1/watcher-{cli,conformance,recovery,storage}-fixture.json | test/watcher-recovery-contracts.test.mjs (17), watcher-*.test.mjs | Phase-5 watcher pack exactness, journal transitions, recovery | executed (CI + local) |
| contracts/admission-policy/1.0.0/{policy,decision-receipt}.schema.json | test/admission-policy.test.mjs (13) | admission decision receipts with `reasonCodes` | executed (CI + local) |
| test/fixtures/compatibility/full-v2.1.2/* | test/compatibility-baseline.test.mjs (4) | Phase 0 lock of public exports, capabilities, CLI help against v2.1.2 | executed (CI + local) |
| test/fixtures/retrieval-evaluation-cli-phase4.json, param-errors-before.json, types/retrieval-result-contract.ts, navigation-effects-crash-child.mjs, support/param-fixture.mjs | respective tests | CLI freeze, MCP param error shapes, crash-child harness | executed (CI + local) |
| src/science/fixtures.ts + test/science-standard-fixtures.test.mjs (1) | — | mirrors gkos-standard provisional SRTP fixture catalog when present | **skipped** in CI (`﹣ mirrors the exact provisional standard SRTP fixture catalog when available … # requires external gkos-standard fixture catalog SRTP-DRAFT-FIXTURES-0.1.1`) — this is the 1 skipped test in the CI count. Local: see section 3. |
| test/service-vector-real.test.mjs (1) | — | real ONNX embedding path | **never run in CI / not verified** — exempt unless `GKOS_TEST_LOCAL_EMBEDDING_CONFIG` is set; no run found. |
| services/gkos-intelligence/tests/test_contracts.py, test_settings.py | `npm run test:intelligence` (Python) | intelligence sidecar contract/settings | executed in CI step `test:intelligence` (step present in job log at line 1759; its count not isolated). Local: not run. |

### 1.4 Test files (one line each)

Count = number of top-level `test(`/`it(` calls found by grep; the runner's own count differs because of subtests. All are in `npm test` at HEAD (CI 2026-09-06 and local 2026-09-08) unless marked.

| File | Cases | Opening test title (what it checks) |
|---|---|---|
| admission-policy.test.mjs | 13 | admission policy and decision receipts |
| agent-identity-mcp-contract-draft2.test.mjs | 6 | Draft.2 generator and manifest have exact closed reproducible bytes |
| agent-identity-mcp-contract.test.mjs | 35 | generator check and exact manifest closure — HISTORICAL lane, not in npm test |
| candidate-ledger.test.mjs | 15 | parser receipts cover projectionless notes, structured locations, attachment non-applicability |
| compatibility-baseline.test.mjs | 4 | Phase 0 fixture locks public exports, Navigation capabilities, CLI behavior |
| desktop-agent.test.mjs | 34 | deployment helper has non-technical command help |
| determinism.test.mjs | 4 | codeUnitCompare is locale-independent |
| documentation-capabilities.test.mjs | 3 | capability guide names the exact executable MCP tool inventory |
| gkx-blocked-review.test.mjs | 3 | blocked-note excerpt is frontmatter-only and redacts likely credentials |
| gkx-cli.test.mjs | 7 | DEFAULT_IGNORED_DIRS includes .gkx |
| gkx-enrichment.test.mjs | 8 | evidence window excludes code/tables, bounded reproducible prose |
| gkx-exclusions.test.mjs | 2 | developer exclusion preset matches agent-control files |
| gkx-index-projection-options.test.mjs | 4 | defaultSensitivity=internal yields internal for unlabeled note |
| gkx-migration.test.mjs | 19 | new GKX identities use lowercase UUIDv7 |
| gkx-network.test.mjs | 2 | LAN model policy accepts private IPs, rejects DNS/public/bind-all |
| gkx23.test.mjs | 23 | namespaced identifiers are relationship targets, not authored UIDs |
| governance.test.mjs | 7 | State-Change Receipt is a role embedded in the governed record |
| graphiti.test.mjs | 8 | every episode carries stable UUID and assertion namespace |
| incremental.test.mjs | 15 | full load parses everything once |
| ingest-cli.test.mjs | 14 | Phase-3 argument normalization |
| ingest-storage.test.mjs | 40 | ingest storage authority and lock digests |
| ingest-validation.test.mjs | 19 | fail-closed ingest validation |
| ingestion.test.mjs | 1 | provider-neutral ingestion preserves source and conversion identity |
| intelligence.test.mjs | 7 | accepts a raise-only classification proposal |
| lineage.test.mjs | 11 | one-sided lineage handling |
| navigation-architecture.test.mjs | 9 | NavigationCore cannot reach filesystem mutation primitives |
| navigation-cli.test.mjs | 7 | nav analysis commands emit stdout and leave source bytes untouched |
| navigation-determinism.test.mjs | 1 | deterministic Navigation outputs byte-identical under reordered enumeration |
| navigation-effects-assistance.test.mjs | 16 | deterministic assistance stable under corpus reordering |
| navigation-effects-contract.test.mjs | 8 | Navigation Effects separately versioned, fail-closed capability discovery |
| navigation-effects-host.test.mjs | 11 | host creates, advances ownership, archives, restarts as no-op |
| navigation-effects-node.test.mjs | 32 | node executor: denied/stale/conflict/recovery receipts |
| navigation-effects-performance.test.mjs | (generated) | path/grant scale fixtures |
| navigation-effects-planner.test.mjs | 8 | region parser/renderer exact, reject malformed nesting |
| navigation-effects-reconciliation.test.mjs | 1 | importing Navigation/Effects creates no files or runtime authority |
| navigation.test.mjs | 20 | archive-ignore excludes exactly _archive/moc-runs/** |
| nomenclature.test.mjs | 1 | legacy nomenclature fixture fails unless allowlisted |
| parser.test.mjs | 12 | frontmatter parsing |
| public-api.test.mjs | 2 | canonical GKX API available from engine and subpaths |
| resolver.test.mjs | 8 | resolves by exact path |
| retrieval-authorized-view.test.mjs | 20 | Decision-A predecessor/successor boundaries bind scoped chunks and citations |
| retrieval-candidate-store.test.mjs | 7 | schema-3 candidate store binds rows, receipts, physical digest |
| retrieval-cli.test.mjs | 11 | gkx search indexes valid records, rejects malformed whole, preserves bytes |
| retrieval-config.test.mjs | 13 | trusted configuration discovery order |
| retrieval-core.test.mjs | 9 | Phase-1 retrieval contract coordinates |
| retrieval-evaluation-cli.test.mjs | 23 | Phase4 CLI fixture freezes argv, text, JSON, exits |
| retrieval-evaluation.test.mjs | 21 | lexical-scan capability reasons vs FTS5 differential |
| retrieval-manifest-upgrade.test.mjs | 4 | 2.2 reads 2.1.2 manifests without rewriting provenance |
| retrieval-observation-qualification.test.mjs | 12 | Phase 4 observation qualification |
| retrieval-provenance.test.mjs | 18 | draft.2 as_of matrix matches timestamp validator |
| retrieval-store.test.mjs | 34 | SQLite lexical generation FTS5 / compatibility scan |
| retrieval-temporal.test.mjs | 16 | Phase-2 lineage search; includes NO_ELIGIBLE_RESULTS asserts (lines 334, 415) |
| retrieval-windows-path-security.test.mjs | (platform-gated) | Windows path security; separate CI job `windows-retrieval-path-security` |
| runtime-qualification.test.mjs | 13 | versioned current inventory binds candidate and historical artifacts |
| science-core.test.mjs | 8 | experimental parser retains unknown fields without granting authority |
| science-standard-fixtures.test.mjs | 1 | mirrors gkos-standard SRTP fixture catalog — SKIPPED in CI |
| science-verification.test.mjs | 9 | event-chain verification recomputes canonical root/final digests |
| sea-target.test.mjs | 15 | SEA target arg parsing |
| service-authorized-view.test.mjs | 7 | service authorized view |
| service-content.test.mjs | 12 | capabilities explain bounded discovery |
| service-contracts.test.mjs | 5 | service contract integration-only, loopback-only |
| service-multiclient.test.mjs | 5 | same-token lanes and SSE slots |
| service-param-errors.test.mjs | 10 | field-level parameter error codes |
| service-reference-freshness.test.mjs | 5 | record consumers refuse stale references |
| service-retrieval.test.mjs | 6 | native RetrievalCoordinator ranking and byte citations; "preserve refusal" assertion at line 154 |
| service-runtime.test.mjs | 11 | REST routes one-view filtered; generic denials do not enumerate |
| service-scheduling.test.mjs | 6 | scheduler credential turns and leases |
| service-secret-canary.test.mjs | 1 | secret canary never enters any surface |
| service-stdio-package.test.mjs | 2 | npm CLI discovery outside npm lifecycle |
| service-stdio.test.mjs | 7 | endpoint/token handoff fails closed |
| service-vector-real.test.mjs | 1 | real ONNX model — EXEMPT, not run |
| settings-inventory.test.mjs | 6 | every schema TOML coordinate has one ownership entry |
| symlink-invocation.test.mjs | 1 | gkx through symlinked package dir |
| temporal.test.mjs | 6 | predecessor/successor temporal states |
| timestamps.test.mjs | 9 | portable timestamps canonical UTC Zulu |
| watcher-coordinator.test.mjs | 7 | coherent activation cross-seals |
| watcher-fast-path.test.mjs | 3 | unchanged secure scan avoids reparse |
| watcher-index-validation.test.mjs | 1 | watcher consumes Phase3 accepted/rejection outcome |
| watcher-journal-host.test.mjs | 15 | journal bootstrap and reopen |
| watcher-large-restart.test.mjs | 1 | restart reopens >1 MiB topology without changing authority |
| watcher-observation-qualification.test.mjs | 2 | watcher observation runner emits one sealed governed measurement |
| watcher-pointer-host.test.mjs | 12 | directory capabilities permit only sealed transitions |
| watcher-recovery-contracts.test.mjs | 17 | Phase5 watcher pack exact and generator-reproducible |
| watcher-service-cli.test.mjs | 17 | Windows scoped polling admits bounded leaf set |
| watcher-source-scan.test.mjs | 3 | watcher source scan |

### 1.5 CI counts at HEAD (executed, 2026-09-06, run 34063066179, job `build (24)`, ubuntu-latest, Node 24)

| Step | Result |
|---|---|
| `npm run test:navigation` | `tests 160, pass 160, fail 0, skipped 0` |
| `npm test` | `tests 1084, pass 1083, fail 0, cancelled 0, skipped 1, todo 0` (skipped = science-standard-fixtures SRTP mirror) |
| a later step (after `pack:check` group start; attribution not verified) | `tests 23, pass 23, fail 0` |
| Jobs `build (22)`, `build (26)`, `phase5-watcher-linux/windows (22,24,26)`, `windows-retrieval-path-security (22,24,26)`, `phase5-watcher-artifact-audit` | all `✓`; logs not opened; `phase4-retrieval-observation-manual` skipped by design (manual) |

The scheduled "Phase 4 Retrieval Observation" workflow on main failed on 2026-09-07 and 2026-09-08 (runs 34105302635, 34206749198, ~40 s each). Not investigated; noted so nobody reports main as all-green.

## 2. GKOS-Engine-Lite (1e1f84c547f610ecae2eb459cba53d3f1d00889c)

### 2.1 Test files and fixtures

No repo-assigned fixture IDs. `npm test` = `node --test "test/*.test.mjs"` at root; desktop has its own `npm test`; Rust crate tests run under `cargo test`.

| File | Cases | What it checks | Status |
|---|---|---|---|
| test/command-boundary.test.mjs | 4 | six delegated Lite command paths allowed; unsupported/future rejected; Phase-3 args byte-for-byte | executed (CI 2026-09-02; local 2026-09-08) |
| test/divergence-backport.test.mjs | 4 | DIV-001/002/003 fail-closed sensitivity and temporal diagnostics | executed |
| test/intelligence-client.test.mjs | 5 | sidecar loopback restriction, proposal validation, authoritative patch fails closed | executed |
| test/kosmos-projection-options.test.mjs | 2 | defaultSensitivity threading; unlabeled note fails closed to secret | executed |
| test/metadata-policy.test.mjs | 3 | Engine pin accepts exact reviewed commit/tag; rejects mutable branches and lock mismatches | executed |
| test/pass-through.test.mjs | 9 | okf-lite validate/assess/index/search byte-identical to pinned Engine CLI | executed |
| test/phase0-compatibility.test.mjs | 7 | Phase 0-3 fixtures (test/fixtures/compatibility/*) immutable; exact deltas | executed |
| test/phase3-cli-conformance.test.mjs | 3 | frozen Phase-3 argument/path matrices are exact Full/Lite differentials | executed |
| test/symlink-invocation.test.mjs | 1 | okf-lite through symlinked dir | executed |
| desktop/test/packaged-rest-runtime.test.mjs | 1 | quick-connect matches packaged v1.1.3 REST sidecar (routes 200/401/404/405) | executed in CI job `Windows desktop-native / Node 24`: `tests 17, pass 17, fail 0`; local: not run |
| desktop/test/phase0-compatibility.test.mjs | 2 | desktop Phase 0 package/status/settings stable | executed (CI, same job) |
| desktop/test/settings.test.mjs | 7 | seven-level sensitivity vocabulary order | executed (CI) |
| desktop/test/snippets.test.mjs | 7 | Agent API examples expose only implemented GET routes | executed (CI) |
| desktop/test/fixtures/phase0-desktop.json | — | desktop Phase 0 snapshot | consumed by the above |
| rust/crates/gkos-retrieval/tests/full_conformance.rs | 11 `#[test]` | imported Engine contract pack has pinned bytes; chunker, RRF, MMR, parent/lexical rules, dedup, globs, citations, canonical paths match Engine fixtures | executed in CI job `retrieval-rust-latest`: `159 passed` (unit) + `11 passed` (conformance) + `3 passed` (doc); also `retrieval-rust-msrv`, `retrieval-rust-windows-msvc` ✓ (logs not opened). Local: not run (`not verified`). |
| rust/crates/gkos-retrieval/src/*.rs unit tests | 159 `#[test]` across 19 files (grep count) | includes `confidence.rs` `no_hits_distinguish_no_eligibility_from_weak_match` (NO_ELIGIBLE_RESULTS) | executed (CI, as above) |
| rust/contracts/gkos-retrieval-1.0.0-draft.{1,2}/*, gkos-ingest-validation-1.0.0-draft.1/* | — | byte-pinned copies of Engine contract packs | consumed by full_conformance.rs |
| desktop/src-tauri Rust tests | 2 | native Tauri tests | executed (CI Windows desktop-native job: `2 passed`) |

Prior-state evidence (not current main): `reports\GKOS-ENGINE-LITE-SUCCESSOR-AUDIT-20260901.md` at `938a3ebc…`: root `npm test` 38/38; desktop `npm test` 17/17; `cargo test` 155 unit + 11 conformance; Rust 1.98.0, Windows.

### 2.2 CI counts at HEAD (executed, 2026-09-02, run 33590643533)

| Job | Result |
|---|---|
| Linux blocking / Node 24 (100123763569) | `tests 38, pass 38, fail 0` |
| Linux blocking / Node 22, Linux informative / Node 23 | ✓ (logs not opened) |
| retrieval-rust-latest (100123763660) | `159 passed`, `11 passed`, `3 passed` (doc tests), 0 failed |
| retrieval-rust-msrv, retrieval-rust-windows-msvc | ✓ (logs not opened) |
| Windows desktop-native / Node 24 (100123763751) | `tests 17, pass 17, fail 0`; Tauri `2 passed` |
| Windows desktop-native / Node 22, desktop | ✓ (logs not opened) |

## 3. Local runs on 2026-09-08 (executed)

Environment for both: Windows 11 Pro 10.0.26200, Git Bash MINGW64_NT-10.0-26200, `node v24.18.0`, `npm 10.9.4`. Command in each clone root: `npm ci && npm test`.

### 3.1 GKOS-Engine-Lite

- Started 2026-09-08T18:35:24Z. `npm ci`: "added 1 package, and audited 2 packages" (warning: integrity check skipped for the git dependency `ssh://git@github.com/Odenknight/GKOS-Engine.git`).
- `npm test`: `tests 38, pass 38, fail 0, cancelled 0, skipped 0, todo 0`, duration 18,379 ms, exit 0.
- Matches CI at the same HEAD (38/38). Log: `FIXTURE-INVENTORY-2026-09-08_GKOS-Engine-Lite-test.log`.

### 3.2 GKOS-Engine

- Started 2026-09-08T18:35:22Z. `npm ci`: 0 vulnerabilities; `pretest` built `dist/*`.
- `npm test` (finished about 2026-09-08T19:00Z, wall time roughly 25 minutes): `tests 1074, pass 1071, fail 2, cancelled 0, skipped 1, todo 0`, exit 1. Log: `FIXTURE-INVENTORY-2026-09-08_GKOS-Engine-test.log` (1,231 lines).
  - Skipped (1): `science-standard-fixtures.test.mjs` "mirrors the exact provisional standard SRTP fixture catalog when available" — same skip as CI (requires an external gkos-standard checkout beside the clone).
  - Failed (2), both in `test/runtime-qualification.test.mjs`: "versioned current inventory binds actual candidate and unchanged historical artifacts" (`AssertionError: reviewed source must retain canonical LF bytes`, line 27) and "an unlisted new source or edited reviewed bytes fails the current gate" (line 37, got `Unreviewed candidate change inventory` instead of `Unreviewed candidate bytes`).
  - Cause: my clone was checked out with the machine's global `core.autocrlf=true`, so the working tree had CRLF bytes (`file README.md` → "with CRLF line terminators"). The test asserts canonical LF bytes; the Engine's own CI sets Git configuration to override autocrlf before checkout (test "command-scope Git configuration overrides autocrlf before checkout" passes). This is an environment artifact of my checkout, not a change in the repository.
  - Confirmation (executed): `git config core.autocrlf false; git rm --cached -r .; git reset --hard HEAD` in the clone (working tree became LF, `git status` clean), then `node --test test/runtime-qualification.test.mjs` → `tests 13, pass 13, fail 0`, exit 0. Appended to the same log. The full suite was not rerun after renormalizing (time box); the other 1,071 passes were obtained on the CRLF tree.
  - Count difference vs CI (1074 local vs 1084 CI): 10 fewer tests locally. Platform-gated tests (for example `retrieval-windows-path-security.test.mjs`, which CI runs in a separate job, and Linux-only watcher lanes) are the likely cause; not verified test by test.

## 4. Summary for S-03 / P-01

- Engine at `650eab4a…`: 1084 tests executed in CI on 2026-09-06 (1083 pass, 1 skipped, 0 fail) plus 160 in the navigation gate; locally on Windows 2026-09-08: 1074 tests, 1071 pass, 2 fail (CRLF checkout artifact, 13/13 pass after renormalizing to LF), 1 skipped; 35 identity draft.1 tests run in the historical lane; 1 test never run in CI (`service-vector-real`). Two named fixture suites (`ENGINE-NAV-CONTRACT-1.0.0`, `ENGINE-NAV-EFFECTS-CONTRACT-1.0.0`) carry IDs and are executed; both are declared `gkos_conformance: false`. No Engine fixture is a gkos-standard conformance fixture.
- Lite at `1e1f84c5…`: 38 Node tests executed in CI and locally; 17 desktop tests and 173 Rust tests executed in CI, not locally.
- No fixture in either repo references `schemas/refusal-receipt.schema.json` from gkos-standard (see VR-0009).
