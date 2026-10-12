# Potential uses in five domains

Proposed applications only: no deployed capability, professional validation, legal or
medical advice, or regulatory compliance is claimed. Each domain owner approves its
methods, applicability, thresholds, evidence access and authority. The executable pilot
covers a synthetic aggregate; the remaining examples are future domain test designs.

| Domain | Potential real-world workflow | Evidence to bind | Adversarial test and response | What PASS does not establish |
| --- | --- | --- | --- | --- |
| Legal operations | Demand-letter attachment with itemized bills/payments and totals | Bill/payment snapshot, approved inclusion rules, method, units, rounding, release authority | Add an unapproved exclusion or change the displayed total. Refuse calculation-dependent release; preserve evidence. | Recoverability, coverage, privilege, entitlement or applicable law |
| Clinical operations | Protocol-derived calculation included in a reviewed clinical summary | Protocol/population, patient/source association, timestamped measurements, units, missing-value policy and exact inputs | Swap pounds/kilograms, use stale measurements or omit required input. Fail the applicable check and block the affected recommendation. | Patient/specimen correctness, clinical applicability, diagnosis or safe treatment |
| Scientific research: physics and chemistry | Simulation-derived quantity and reproducibility comparison in a lab report or paper | Code/build/dependencies, dataset/initial conditions, environment, parameters, outputs and separate comparison protocol | Physics: change grid/boundary conditions. Chemistry: substitute functional/basis/convergence setting. Refuse protocol-conformance claims; retain restricted evidence. | Physical validity, model adequacy, convergence/sampling adequacy or conclusion correctness |
| Aviation engineering and maintenance analysis | Component utilization or controlled maintenance-planning calculation for engineering review | Component identity/history, calculation revision, assumptions, permitted purpose, result and authority | Swap component histories, omit an event, or use a superseded procedure for a new decision. Block affected operational use. | Airworthiness, program suitability, dispatch permission or certification |
| Finance and organizational reporting | Internal expense/reconciliation report for a business or nonprofit | Ledger snapshot, period, currency/unit rules, approved exclusions, aggregation version and recipient/release authority | Exclude an expense category, change period, or alter the total after checking. Refuse affected release. | Source bookkeeping accuracy, valuation judgments, tax treatment or audit assurance |

## Concrete pilot paths

1. **Legal:** included public synthetic bills sum to 7,000 + 5,000 = 12,000 USD cents.
   The altered method excludes `therapy` and produces 7,000. Method identity fails
   whether the actor reports 7,000 or 12,000. No PIP fee schedule or legal rule is coded.
2. **Clinical:** begin with de-identified retrospective examples, not live dosing.
   A qualified owner supplies the equation, units, inclusion criteria and expected
   outputs. Add missing/stale/wrong-unit/wrong-patient cases; this proposal supplies
   no clinical thresholds.
3. **Science:** synthetic values -76.123456 and -76.123455 Eh illustrate an absolute
   comparison bound of 0.000002 Eh and relative bound zero. This is not a chemistry
   accuracy recommendation. A real chemistry pilot requires an approved protocol;
   a waveform pilot needs an approved alignment/norm comparator, not this scalar rule.
4. **Aviation:** begin offline with synthetic utilization histories and reviewer-only
   output. Test missing serial identities, duplicate events and out-of-order records.
   Computation evidence is not release authority.
5. **Finance:** begin with a synthetic monthly ledger, explicitly approved exclusions
   and reporting period. A period change requires new input/request bindings and
   applicable authorization; reusing an earlier attestation must fail.

For every domain, deterministic checks establish fidelity under a declared trust model;
existing GKOS review and authority determine permitted use. Do not extrapolate the
aggregate fixture's PASS to readiness in any of these five domains.
