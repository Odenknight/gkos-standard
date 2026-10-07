# E2 ecosystem assessment — September 12, 2026

**Standing: partially delivered, with substantial implemented mechanisms and
recorded execution evidence; shared coverage remains incomplete.**

E2 is the roadmap milestone for fixtures and reference adapters. Existing
Engine, Lite and Kosmos components provide reusable adapter surfaces and
test evidence. The next work is to map and extend those assets against the
E2 scenarios, rather than treat all adapters and fixtures as future work.

This is an informative assessment of public repository records, not a new
execution report or a decision closing E2. Product tests, profile qualification,
final-artifact qualification and implementation independence remain distinct.

## Review method

Executed on September 12, 2026: read public default-branch documentation and
the Standard fixture catalog through the GitHub connector; parse the catalog.
No runtime tests were rerun. Results below are reported by the cited records
and remain bound to their recorded revisions and environments. The source
inventory below identifies the Git blobs reviewed, not repository commits.

## Evidence credited

| Component | Contribution to E2 | Remaining boundary |
| --- | --- | --- |
| TypeScript Engine | Implemented dependency-injection and Graphiti adapters, deterministic admission-policy receipts, retrieval, credential-filtered MCP reads, and experimental managed-MOC recovery mechanisms. | Source 2.2.0 is distinct from a released final artifact; complete durability/performance, consumer and soak evidence remain open. |
| Kosmos-Oden | Modern MCP candidate with recorded authentication, discovery, listing, allowed and UID retrieval, restricted-note denial, protocol-error and caller-fairness tests. | Final-build Hermes acceptance and independent wire-conformance coverage remain pending in the candidate record. |
| Engine-Lite | Restricted CLI delegation, pinned Full-engine contracts and compatibility fixtures supply reusable integration and boundary evidence. | A shared Full-engine execution path is not an independent semantic implementation; Desktop and static distribution have separate qualification gates. |
| Standard | Runner/catalog, informative protocol fixture plans, and provisional evidence-package schema/fixtures provide shared infrastructure. | The starter catalog is not an inventory of all ecosystem tests and declares no qualifying profile. |

The [Engine release-status record](https://github.com/Odenknight/GKOS-Engine/blob/main/docs/RELEASE-STATUS.md)
reports passing CI, Linux/Windows runtime, retrieval-observation and native-audit
workflows at `dee4a53ab8eade0e49c726d34cdc86f46e05c253`.
Its [lifecycle packet](https://github.com/Odenknight/GKOS-Engine/blob/main/evidence/2026-09-06-moc-host-lifecycle-qualification.md)
also documents bounded missed-event, rename, shutdown and recovery tests.
Earlier gaps in that packet must be read with the newer release-status record:
durable no-change audit receipts are now implemented.

The [Kosmos candidate review](https://github.com/Odenknight/Kosmos-Oden/blob/main/docs/REVIEW-0.8.3.md)
reports 342 verification tests for the consolidated September 10 candidate.
September 12 startup and renderer successors have their own evidence.
The record preserves a browser timeout and successful targeted retry.
Neither old totals nor direct HTTP checks qualify a later build or actual
Hermes-client operation.

## Revised gap assessment

1. **Reference adapters: implemented in bounded surfaces.** Reuse existing
   Engine, Kosmos and Lite contracts where applicable.
2. **Positive, negative and boundary cases: partially demonstrated.** Recorded
   runs cover useful identity, disclosure, refusal and recovery behavior;
   they do not establish every E2 scenario or every GCP requirement.
3. **MCP: implemented and partially exercised.** Kosmos documents a modern
   implementation. Modern-only behavior and refusal of legacy clients are
   distinct from a supported predecessor compatibility lane. Read-tool tests
   do not close consequential-tool scenarios or the whole binding.
4. **A2A and ACS: fixture plans verified; executed binding coverage not
   verified in this review.** The opened public drafts describe proposed
   scenarios. This assessment does not infer absence of all relevant code.
5. **Portable evidence: partial foundation.** Receipts, digest verification
   and the provisional CEP format provide useful building blocks. An executed
   two-public-tool CEP exchange was not established by this review. Exchange
   remains a later pilot/adoption gate, not an additional E2-only requirement.
6. **Shared coverage: open.** Product tests need traceability to E2 fixture IDs
   and applicable permanent GKOS requirements. GCP-2/4/5 qualification remains
   separate from demonstrating individual mechanisms.

The [active starter catalog](../../fixtures/fixtures.manifest.json) parses as
catalog 0.2.0 with eight fixtures, a `GKOS-2026-08-20 v0.80` baseline,
empty `complete_requirements`, and empty `qualifying_profiles`.
These coordinates do not measure the total ecosystem test population.
A successor catalog needs an explicitly assessed baseline; changing the
historical version field cosmetically would not close coverage.

## Proposed next work

Build one coverage matrix with binding/requirement ID, fixture class,
implementing repository, exact source and artifact, command, environment,
raw result, public evidence locator and remaining gap. Start with existing
Engine and Kosmos tests. Preserve failed, skipped, unsupported and unevaluated
outcomes. Add tests for uncovered behavior.

Keep E3 pilots, E4 implementation independence, final-artifact/client checks
and cumulative GCP qualification separate. Different ownership is desirable,
not mandatory, under the
[September 12 clarification](../decisions/2026-09-12-implementation-independence.md).
Multiple interfaces to one Engine do not themselves prove implementation
independence.

## Reviewed public source inventory

Git blob SHAs below identify the file contents read on the assessment date.
Source URLs point to the current branches; later edits may change their content.

| Source | Reviewed Git blob SHA |
| --- | --- |
| [Engine README](https://github.com/Odenknight/GKOS-Engine/blob/main/README.md) | `81518e7c46640899bb7b99eb56a3a85d62ae611c` |
| [Engine release status](https://github.com/Odenknight/GKOS-Engine/blob/main/docs/RELEASE-STATUS.md) | `aef86e3f3111ff99700f0a17227112eb88241837` |
| [Engine lifecycle evidence](https://github.com/Odenknight/GKOS-Engine/blob/main/evidence/2026-09-06-moc-host-lifecycle-qualification.md) | `c64af7938e8f8597f2470101388470fd7eccac80` |
| [Kosmos candidate review](https://github.com/Odenknight/Kosmos-Oden/blob/main/docs/REVIEW-0.8.3.md) | `38e0af722097faa84e52fdbbfda21eb9c01e5fc5` |
| [Lite README](https://github.com/Odenknight/GKOS-Engine-Lite/blob/main/README.md) | `965806223aa169b15746c21b6844c1b58dc98bee` |
| [Starter catalog](../../fixtures/fixtures.manifest.json) | `a29e1afe7e0b0493bdf3e0beda57a8027ad1df7f` |
| [MCP binding](../ecosystem/bindings/GKOS-MCP-BINDING-0.1-draft.md) | `b3e6bb9aa9af3cca195f953e031dd3cf44cb70de` |
| [A2A binding](../ecosystem/bindings/GKOS-A2A-BINDING-0.1-draft.md) | `8714c882d65e42eb6b0ea13367464614fdb4e18c` |
| [ACS crosswalk](../ecosystem/bindings/GKOS-ACS-CROSSWALK-0.1-draft.md) | `7b9800b18ce053ba941efc479f014735d8dbbbe3` |
| [Evidence-package draft](../ecosystem/GKOS_CONFORMANCE_EVIDENCE_PACKAGE_0.1_DRAFT.md) | `be5f6b1aff217ed6345961150d8450666b3dd1f3` |

This assessment establishes no release, profile qualification, production
authority or independently verified implementation claim.
