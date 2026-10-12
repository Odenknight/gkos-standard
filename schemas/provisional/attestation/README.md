# Computation Attestation Profile — CAP-DRAFT-0.1

**Standing: proposed, provisional, informative, non-normative, non-qualifying.**
This is not an adopted decision, Engine feature, new layer, certification, or proof
that a scientific/professional conclusion is true.

## Plain-language rationale

GKOS already governs evidence, review, context and authorized use. This profile makes
those responsibilities concrete for important calculated figures: connect the approved
method, actual execution and inputs, authoritative result and permission to use it.

The synthetic aggregate produces 120.00 USD. Reporting 125.00 must fail even when the
right program ran. Silently filtering a bill must fail even when the filtered total
is arithmetically correct. Neither check decides which bills are legally recoverable.
Deployments select which uses require these checks; ordinary exploratory calculations
do not automatically need attestation.

## Scope and objects

The [cross-domain proposal](../../../docs/proposals/CAP_DRAFT_PROFILE.md) explains
incorporation and adoption. These two executable schemas intentionally implement one
bounded dialect: synthetic integer aggregation with `bills` input, `maximum_rows`
parameter and USD-cent output. They are not general SQL or domain calculators.
A separate scalar rerun fixture illustrates reproducibility. Richer dialects need
versioned schemas and tests before promotion.

- `attested-computation.draft.schema.json`: a computation **definition**, composed
  with GKX frontmatter. `gkx:ComputationDefinition` does not imply an attested run.
  Approval remains a separate Decision Record responsibility.
- `computation-attestation.draft.schema.json`: canonical per-run evidence, never an
  authority grant. It binds the raw execution receipt retrieved from a trusted source.
- Raw execution evidence need not become a third canonical record type or storage
  service. Existing artifacts may satisfy its role.

These revise the exploratory attachment shapes, which were never adopted repository
schemas. No automatic migration or compatibility with those shapes is claimed.

## Reproduce

```sh
cd conformance/runner
npm ci
npm run cap:draft -- --out /tmp/cap-draft-report.json
node --test test/computation-attestation.test.mjs
npm test
```

Use a platform-appropriate writable output path on Windows. Node 22/24 are repository
CI targets. The standalone command runs three cases: valid aggregate, changed method,
and scientific scalar rerun. Tests add adversarial mutations. All reports retain
`profiles_claimed: []`. The persisted refusal report is fixture evidence, not a complete
production Authorized Use Record or Refusal Receipt implementation.

See [testing parameters](TESTING.md), [five domain examples](DOMAINS.md), and
[local validation evidence](VALIDATION.md).

## Trust boundary and limits

`attestation-fixture-executor.mjs` interprets a small declarative method and preserves
its execution bytes in a closure-owned archive. Reads return copies. The attester
retrieves evidence through a trusted `readExecution` adapter; agent-submitted receipts
are not authoritative. This demonstrates an interface boundary, not network authentication.
A compromised trusted executor is outside this pilot's guarantees. Hashes and PASS
are not hardware attestation or cryptographic proof of computation.

A production adapter must authenticate evidence, establish the actual input snapshot,
resolve method/dependency/environment versions and prevent unauthorized replacement.
The demo gate receives trusted synthetic approval and policy snapshots. It recomputes
the attestation and checks request/purpose/recipient/time, but does not implement live
identity, delegation, revocation or crash-safe action transactions. No real legal,
clinical, aviation, scientific or finance deployment is represented by these fixtures.
