# CAP-DRAFT-0.1 testing parameters

Informative, provisional and non-qualifying. These tests establish a bounded reference
fixture's behavior, not production Engine conformance.

## Reproduction

Baseline: `446b2d4526c09150bed0d7d699b010850b2dd68d`. Use the exact reviewed PR head,
lockfile and schemas. Record head SHA, Node/npm versions, OS and test output. Repository
CI targets Node 22/24 on Linux/Windows; local success does not establish remote results.

```sh
cd conformance/runner
npm ci
node --test test/computation-attestation.test.mjs
npm run cap:draft -- --out /tmp/cap-draft-report.json
npm test
```

Choose a writable platform-appropriate output path. The standalone report contains
three cases; automated tests exercise further mutations. Neither count represents
qualifying requirements. Existing CI discovers tests through its `npm test` glob.
All profile reports retain `profiles_claimed: []`.

## Fixed parameters

| Parameter | Value |
| --- | --- |
| Capture time | `2026-10-12T08:00:00.000000Z`; no wall-clock dependency |
| Method | Exact bytes of `fixtures/provisional/attestation/method.json` |
| Bills | Two synthetic public rows: 7,000 and 5,000 USD cents |
| Expected result | Integer 12,000 cents; no rounding |
| Parameters | Exactly `maximum_rows`, integer 1 through 100 inclusive |
| Integer limits | Nonnegative safe integers; aggregate above `Number.MAX_SAFE_INTEGER` refused |
| Mutated method | `exclude_kind: therapy`, actually returning 7,000 |
| Validity | Start inclusive at captured time; end exclusive at `2027-01-01T00:00:00.000000Z` |
| Scope | Purpose `synthetic-report`, recipient `fixture-reviewer` |
| Trust | In-process executor archive; copy-on-read retrieval |
| Rerun | Synthetic scalar pair, absolute bound 0.000002 Eh, relative bound zero |
| Randomness/network | None in execution; dependencies installed beforehand |
| Replay | Same evidence/definition/checker/dependencies produces identical canonical bytes/hash |

## Automated coverage and required outcomes

| Family | Perturbation | Required outcome |
| --- | --- | --- |
| Schema/canonical | Missing envelope, unknown version, noncanonical time, wrong digest basis | Refuse |
| Method | Execute altered filter | Method FAIL; suppress output |
| Input/request | Change bytes, parameters or definition binding | Binding FAIL |
| Parameters | Above maximum or extra key | Bounds/schema FAIL |
| Evidence | Corrupt bytes, spoof executor, replay another run, unsuccessful execution | Relevant check FAIL |
| Availability | Missing source, service exception, missing input bytes, malformed receipt | UNEVALUATED/PARTIAL/FAIL as appropriate; never PASS |
| Result | Changed amount, units or type | Fidelity FAIL |
| Verdict | Missing/duplicate/reordered checks, false PASS, fabricated result digest | Schema or semantic refusal |
| Authorization | Expiry, supersession/revocation, wrong request/purpose/recipient, malformed action time | Historical evidence preserved; current use refused |
| Override | Add an unrecognized override/tolerance | Required failures remain blocking |
| Rerun | In/out of bound, zero/relative tolerance, boundary equality | Expected deterministic result |
| Numbers | Missing/negative bounds, NaN/Infinity, negative zero, overflow, fractional money | Reject |
| Archive | Mutate returned copy; duplicate run identity | Archive unchanged; duplicate refused |
| Persistence | Write/read report with refusal bindings and suppressed value | Complete saved evidence; empty conformance claims |

Any false PASS, failed value released, missing refusal binding, nondeterministic replay
or existing-suite regression blocks the candidate. No performance threshold is imposed;
elapsed time is informative until a deployment defines an SLO.

## Required before real deployment — not established by this pilot

- Authenticate the executor; test forged/expired/revoked credentials and unauthorized
  output replacement. Never let an agent choose the trusted evidence endpoint.
- Bind actual SQL/templates and parameters, snapshot/isolation semantics, database
  schema/functions/dependencies. A query hash alone does not identify its input rows.
- Validate input collection, domain identity, completeness, units and applicability.
  A hash cannot prove the source observation is correct.
- Bind final rendered/exported values or commands; test alteration after checking and
  before release. This PR gates a structured value, not arbitrary generated prose.
- Integrate real Decision Records, context closure, actor/delegation/revocation,
  sensitivity handling and action-time authority. Test revocation between review/use.
- Kill/crash before and after action/receipt persistence; demonstrate refusal or defined
  rollback/compensation. Report-file fsync is not proof of a production transaction.
- Test evidence retention/access, missing evidence and later corrections without real
  sensitive data in fixtures.
- Run a shadow domain adapter and independent implementation/assessor exchange before
  promotion. Preserve SRTP's provisional status and exact compatibility coordinates.
