# Classifier draft fixture standing

These are provisional, non-qualifying schema fixtures. Synthetic references and
digests do not resolve to real grants, source evidence or qualified models.
`schema-cases.json` records portable positive and negative wire-shape cases;
`classifier-draft-schema.test.mjs` executes only those schema expectations.

The schema intentionally validates envelope shape, not reference resolution,
calendar validity, scope, rule matching, label membership in a referenced task,
probability normalization, authority, model correctness or effect admission.
Optional probabilities use integer millionths; normalized distributions and
conversion/calibration bindings need semantic validation in the next tranche.

## Mandatory semantic fixture backlog

All cases below are **UNEVALUATED**. Expected outcomes are specifications, not
observed test results. Local names are not registered diagnostic codes.

| Case | Input variation | Expected behavior | Candidate |
| --- | --- | --- | --- |
| authorized-routine | Complete qualified independent review and current grant | Permit bounded disposition; separately admit effect | CAD-05, CAD-07 |
| captured-policy-replay | Same captured inputs, matrix and fixed time/IDs in TS/Rust | Equal canonical disposition/diagnostics | CAD-04, CAD-11 |
| endpoint-bands | Below, exactly at, above each boundary | Exactly one match or HOLD | CAD-04 |
| rule-conflict | Two matching rules; or no match | HOLD, never highest-score fallback | CAD-04 |
| malformed-semantics | Unknown task label, invalid calendar, nonnormalized probability | Non-acceptance with reason | CAD-02, CAD-04 |
| expired-revoked-grant | Authority invalid at decision or effect time | Refuse affected use | CAD-05, CAD-07 |
| unqualified-config | Correct schema but missing/expired qualification | HOLD or refuse; no automatic acceptance | CAD-10 |
| same-family-review | Proposer/executor and reviewer not independent | Mandatory human escalation | CAD-05 |
| self-policy-edit | Service tries to approve its own grant or matrix | Refuse | CAD-03 |
| injection-and-truncation | Note asks for public label; required evidence omitted | Treat instruction as data; non-acceptance if evidence incomplete | CAD-01, CAD-04 |
| low-risk-disclosure | Low sensitivity score with existing restrictions | Preserve restrictions; no disclosure authority | CAD-06 |
| claimed-supersession | Model proposes a supersedes edge | No effective semantic supersession | CAD-06 |
| current-reuse | Unchanged complete dependencies and compatible review | Applicability receipt; no new model call | CAD-08 |
| irrelevant-change | Change outside demonstrated dependency closure | Retain eligible evaluation | CAD-08 |
| contradiction-change | New relevant contradiction or changed acceptance criterion | Invalidate affected use | CAD-08 |
| cross-tenant-cache | Matching bytes, different tenant/purpose/audience | Deny unauthorized cache disclosure/reuse | CAD-01, CAD-08 |
| new-requester | Same evidence, different proposer | Recheck independence; reuse only if applicable | CAD-08 |
| model-outage | Worker times out; no eligible reusable result | Hold affected dependent operation, no global default freeze | CAD-09 |
| concurrent-edit | Target or policy/grant changes before commit | No stale overwrite/effect | CAD-07 |
| duplicate-effect | Repeat same request; reuse key for different effect | Return prior outcome; refuse conflicting key | CAD-07 |
| receipt-crash | Crash between intent, write and durable receipt | Reconcile, no duplicate or false success | CAD-07 |
| forged-score | Authenticated worker fabricates high confidence | Signature alone cannot prove accuracy; budget/suspension bounds apply | CAD-02, CAD-10 |
| budget-exhaustion | Individually eligible batch exceeds aggregate limit | Refuse additional effects | CAD-07, CAD-10 |
| feedback-reentry | Accepted output enters a training dataset | New attributable L1 snapshot without inherited standing | CAD-11 |

Live held-out model qualification, backend stability, request isolation and
compromised-worker exercises require their own measured evidence. Engine parity
cannot be inferred from this JavaScript schema test.
