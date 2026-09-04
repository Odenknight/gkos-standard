# EU AI Act Article 9 test infrastructure — proposal

**Status:** Non-normative implementation proposal; no conformance claim

**Scope:** Infrastructure needed to execute future Article 9 fixtures through
the existing GKOS conformance runner. The Article 9 findings remain in
[`EU_AI_ACT_ARTICLE_9_GKOS_FINDINGS.md`](EU_AI_ACT_ARTICLE_9_GKOS_FINDINGS.md)
and are not repeated or amended here.

## Decision

Reuse the existing conformance runner and Node test framework. Do not create a
second Article 9 runner and do not add an Article 9 decision engine to
GKOS-Engine.

The implementation order should be:

1. establish a generic multi-record case-observation contract;
2. teach the existing runner to evaluate that contract through a
   Standard-owned evaluator;
3. prove the plumbing with a tiny infrastructure probe and fake adapters;
4. add the first narrow Article 9 case for Article 9(8); and
5. expand the case model only when an additional Article 9 requirement needs
   it.

This avoids designing a large fictional dossier around infrastructure that has
not yet been demonstrated. It also avoids designing an overly generic
infrastructure layer without any executable consumer.

## Existing components to retain

| Component | Existing role | Article 9 use |
| --- | --- | --- |
| `node:test` | Unit and integration test framework | Continue to run all runner, evaluator, mutation, and adapter tests |
| AJV | JSON Schema validation | Validate case observations and later Article 9 record schemas |
| `conformance/runner/run.mjs` | Executes Standard fixtures against an implementation adapter | Extend in place; it remains the only conformance runner |
| Fixture manifests | Declare inputs, requirements, and expected observations | Add a separate provisional Article 9 catalog |
| Standard-owned evaluators | Decide graph and gate outcomes | Add a case evaluator; the adapter must never decide PASS |
| Engine adapter | Converts Engine behavior into neutral observations | Add an optional multi-record case observation capability |
| Conformance claim | Binds versions, evidence, results, and limitations | Include the selected catalog, case evaluator, and case evidence hashes |

The current document projection, graph evaluation, and default fixture catalog
must continue to behave exactly as they do now.

## Compatibility is a release gate

Article 9 support must be additive and opt-in. A change is not acceptable if
it makes an existing adapter, fixture catalog, command, claim consumer, or
supported runtime adopt the new case protocol merely to preserve its current
behavior.

Compatibility applies at these boundaries:

| Boundary | Required guarantee |
| --- | --- |
| Runner command line | Existing `--adapter`, `--out`, and `--attested-by` commands retain their meanings and defaults |
| Default execution | Omitting all new options runs the current catalog through the current projection and graph paths |
| Fixture catalogs | Existing manifests remain valid without new fields or migrations |
| Adapter contract | Existing adapters implementing `project` and optional `projectGraph` remain valid for existing catalogs |
| Evaluation semantics | Existing schema, projection, graph, divergence, failure, and `UNEVALUATED` outcomes do not change |
| Claim format | Existing required fields and meanings remain stable; Article 9 metadata is additive and optional |
| Qualification | Existing requirement and profile calculations cannot consume provisional Article 9 results |
| Engine API | Article 9 infrastructure does not remove, rename, or change existing public Engine exports |
| Runtime matrix | Existing supported Node and operating-system conformance lanes continue to pass |

The initial implementation should avoid refactoring existing evaluator paths.
New catalog selection and case evaluation should be introduced as isolated
branches with explicit tests. Shared abstractions may be considered only after
both paths work and their compatibility can be demonstrated.

## Proposed runner extension

### Selectable fixture catalog

Add a `--catalog` option to the existing runner. Its default remains the
current `fixtures/fixtures.manifest.json`, preserving existing commands and
results. The future Article 9 suite uses a separate provisional catalog and
cannot silently become part of a qualifying GKOS profile.

Catalog selection must not infer Article 9 behavior from filenames or record
content. The selected catalog explicitly declares the provisional suite and
the expectations it needs. Existing catalogs never invoke the new case path.

The selected catalog path, bytes, digest, version, and declared status must be
included in the generated evidence.

### Optional case observation

Add an optional adapter capability, provisionally named `projectCase`:

```text
projectCase({ caseManifest, records, events }) -> case observation
```

The observation should be implementation-neutral. At minimum it needs to
identify:

- the observation contract and version;
- the case and every source record observed;
- record identities, versions, digests, types, and states;
- relationships among records;
- ordered lifecycle events;
- decisions, authorities, policies, evidence references, and outcomes; and
- Engine diagnostics or refusals.

These are observation fields, not Article 9 conclusions. The adapter cannot
return `article9_compliant`, fixture PASS, or an equivalent self-assessment.
`projectCase` remains optional and must not be called unless the selected
fixture declares a case expectation.

### Standard-owned case evaluator

Add a case evaluator beside the existing graph and gate evaluators. It receives
the catalog expectation, the neutral observation, and identities parsed by the
Standard runner.

It must:

- verify that observed identities and digests correspond to the supplied case;
- evaluate only expectations declared by the Standard fixture;
- reject malformed, contradictory, fabricated, or out-of-scope observations;
- return executed checks and explanatory details;
- return `UNEVALUATED` when the adapter omits a required observation; and
- never infer substantive safety, legal compliance, mitigation effectiveness,
  or acceptable residual risk.

The evaluator should initially support structural, relational, temporal,
authority, state-transition, and integrity predicates. Article-specific rules
belong in fixture expectations and later normative requirements, not in the
Engine adapter.

## Infrastructure test strategy

Before creating the Article 9 case model, use one tiny probe containing two
generic governed records, one relationship, one decision, and two ordered
events. The probe exists only to test the observation protocol.

The infrastructure is ready when the following tests pass:

1. The repository's complete pre-change runner test suite still passes.
2. The existing default command produces the same fixture outcomes,
   requirement results, profiles, exit status, and claim semantics without
   `--catalog`. Only already-declared volatile fields may differ.
3. A selected provisional catalog is loaded and exact-bound in the evidence
   report.
4. A valid fake-adapter observation satisfies the declared probe expectations.
5. An adapter without `projectCase` remains fully compatible with existing
   catalogs. When a selected case fixture requires it, that fixture produces
   `UNEVALUATED`, a non-zero exit, and no profile claim.
6. A malformed observation fails schema validation.
7. An adversarial adapter cannot fabricate record identities, relationships,
   event order, or evidence bindings to manufacture PASS.
8. A mutation removing one required relationship closes only the expected
   gate.
9. A mutation changing event order closes only the expected temporal gate.
10. Repeating the run produces the same substantive results and evidence
    bindings, excluding declared volatile fields.
11. A fully passing provisional case still produces no GKOS tier or Article 9
    legal-compliance claim.
12. Existing fake, Engine, graph-capable, and graph-incapable adapters require
    no edits merely because case support exists.
13. Existing fixture identifiers, registered requirements, mutation coverage,
    and expected fixture counts remain unchanged in the default suite.

These tests use `node:test`, fake adapters, AJV, and the existing conformance
claim machinery. No additional test framework is required.

## Separation from the future case model

This infrastructure proposal defines how a case is transported and evaluated;
it does not yet define the Article 9 risk vocabulary.

The later case-model proposal will decide the fields and relationships for:

- risk-management plans and risk records;
- controls and effectiveness evidence;
- test plans and results;
- per-risk and overall residual-risk decisions;
- review triggers and post-market observations;
- deployment contexts; and
- vulnerable-group assessments.

Those objects should be introduced incrementally. The first Article 9(8) case
needs only the minimum types required to bind a predeclared test plan, metrics,
thresholds, results, and an exact system version.

## Proposed implementation units

Names are provisional, but the intended boundaries are:

```text
schemas/provisional/case-observation.schema.json
conformance/runner/case-evaluator.mjs
conformance/runner/test/case-evaluator.test.mjs
conformance/runner/test/fixtures/fake-case-adapter.mjs
conformance/runner/test/fixtures/no-case-adapter.mjs
conformance/runner/test/fixtures/adversarial-case-adapter.mjs
fixtures/provisional/case-probe/
fixtures/provisional/article9/fixtures.manifest.json
```

The first six items establish and test reusable infrastructure. The Article 9
catalog is initially only a non-qualifying shell; substantive fixtures are
added after the case-model decision.

## Compatibility-first rollout

Implementation should proceed in independently reversible stages:

1. **Capture the baseline:** preserve the current runner command, exit status,
   fixture results, claim shape, adapter tests, and locked test-suite results.
2. **Add catalog selection:** introduce only the optional `--catalog` argument
   and prove that omitting it follows the existing path unchanged.
3. **Add the isolated evaluator:** test the case evaluator directly with
   in-memory observations before connecting it to the runner.
4. **Add optional dispatch:** invoke case evaluation only for an explicitly
   declared case expectation; verify that legacy fixtures never enter it.
5. **Add probe adapters:** test supported, missing, malformed, and adversarial
   observations without changing the production Engine adapter.
6. **Extend the Engine adapter:** add `projectCase` without changing `project`
   or `projectGraph`, then rerun all compatibility tests.
7. **Add the Article 9 catalog:** keep it provisional, separately selected,
   and non-qualifying.

Each stage must leave the repository test suite green before the next begins.
If compatibility requires changing existing behavior, that change must be
separated from this proposal and handled through the Standard's normal
versioning and governance process.

## Promotion boundary

Infrastructure completion demonstrates only that the existing runner can
evaluate trustworthy multi-record observations. It does not demonstrate
Article 9 coverage.

Article 9 coverage begins only when requirements, schemas, positive cases,
negative mutations, boundary cases, and completeness mappings have been added
for a stated Article 9 scope. Any such suite remains non-qualifying until its
coverage and claim language are separately approved.

## Open design questions

The implementation should resolve these through the infrastructure probe,
before the full case model is written:

1. Whether `projectCase` receives raw files, parsed Standard records, or both.
2. Whether lifecycle events are separate records or a typed subset of the
   generic record collection.
3. How much identity and digest verification belongs in common runner code
   versus the case evaluator.
4. Whether case expectations use a fixed predicate vocabulary or versioned
   evaluator modules named by the catalog.
5. How the claim schema should distinguish fixture PASS from externally
   assessed substantive adequacy.
