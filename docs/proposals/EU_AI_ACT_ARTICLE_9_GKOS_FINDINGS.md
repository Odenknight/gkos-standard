# EU AI Act Article 9 — GKOS findings

- **Status:** working target and test-design notes
- **Scope:** Article 9 only; proposed compliance-support tests, not a legal
  conformance claim
- **Source reviewed:** [Regulation (EU) 2024/1689, consolidated at
  2026-07-27](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng)

## What Article 9 is asking for

Article 9 applies to high-risk AI systems. It requires the provider to operate
a risk-management system that is:

- established, implemented, documented, and maintained;
- continuous and iterative across the AI system's lifecycle;
- regularly reviewed and updated;
- informed by intended use, reasonably foreseeable misuse, and post-market
  information;
- able to identify, estimate, evaluate, and mitigate risks to health, safety,
  and fundamental rights;
- able to judge residual risk for each hazard and for the system as a whole;
- tested during development and before market placement or use against metrics
  and probabilistic thresholds defined in advance; and
- attentive to possible harm to children and other vulnerable groups.

Article 9 does not prescribe a single risk taxonomy, scoring formula,
acceptable-risk threshold, test method, or approval authority. Those choices
must be appropriate to the system and its intended purpose.

## Where GKOS could help

GKOS is well suited to preserving the **chain of reasoning and authority**
around risk management:

1. **Evidence intake:** preserve incidents, evaluations, user reports, test
   results, system revisions, and post-market observations as versioned source
   records.
2. **Risk identity:** give each hazard, affected group, scenario, mitigation,
   test, and residual-risk decision a stable identity and version.
3. **Traceability:** connect risks to evidence, intended uses, foreseeable
   misuse, controls, tests, contradictions, decisions, and outcomes.
4. **Deterministic controls:** verify that required evidence exists, that
   metrics and thresholds were approved before a test, and that mandatory
   review or mitigation gates were not bypassed.
5. **Risk decisions:** record who judged an individual and overall residual
   risk acceptable, under which policy and authority, using which evidence.
6. **Review context:** preserve the exact evidence and unresolved warnings
   presented to the reviewer rather than merely recording the final decision.
7. **Lifecycle feedback:** re-enter incidents and post-market observations as
   new evidence without rewriting the original risk assessment.
8. **Corrective action:** bind an authorised mitigation or suspension action to
   the triggering risk evidence, its scope, outcome, and recovery path.

This is a strong conceptual fit with the seven GKOS layers. However, the
current Standard does not appear to define an Article 9 risk register, hazard
model, risk-assessment lifecycle, or residual-risk acceptance contract.

## Paragraph-by-paragraph challenge

| Article 9 area | Possible GKOS contribution | Red-team challenge |
| --- | --- | --- |
| 9(1): establish and maintain the system | Versioned policies, records, ownership, and review history | A complete set of records does not prove that risk management is operating in practice. GKOS must not confuse documentation with implementation. |
| 9(2)(a): known and foreseeable risks | Preserve evidence and link each identified risk to intended purpose and affected rights | GKOS cannot prove that all reasonably foreseeable risks were found. A provider could create a tidy but deliberately narrow risk inventory. |
| 9(2)(b): estimate and evaluate risks and misuse | Bind methods, assumptions, severity, likelihood, uncertainty, and reviewer decisions | The Standard currently has no common risk vocabulary. Scores from different methods may look comparable when they are not. |
| 9(2)(c): use post-market information | Re-enter incidents and monitoring results as new evidence and trigger reassessment | GKOS needs an external Article 72 monitoring feed. It cannot detect events it never receives, and stale monitoring could still appear procedurally valid. |
| 9(2)(d): targeted measures | Trace each control to the risk and evidence that motivated it | Merely linking a mitigation to a risk does not show that the mitigation is effective. Effectiveness needs independent test evidence. |
| 9(3): risks reasonably addressable through design or information | Record the scope decision and its rationale | This provision could be abused to classify difficult risks as “not reasonably addressable.” GKOS can expose that decision but cannot settle the legal or technical judgment. |
| 9(4): interaction among requirements | Represent conflicts, dependencies, and trade-offs between controls | A graph can show interactions but cannot determine the legally appropriate balance. Optimising one metric may quietly worsen another risk. |
| 9(5): acceptable individual and overall residual risk | Bind acceptance to exact hazards, evidence, policy, authority, and time | “Acceptable” is a substantive judgment. GKOS must not generate or approve the threshold itself, and a provider should not be able to hide severe minority harms inside an acceptable aggregate score. |
| 9(5): risk-control hierarchy | Record design elimination, mitigation, information, and training in order | Documentation or warnings must not become a shortcut around technically feasible design changes. The evidence should show why a stronger control was not feasible. |
| 9(5): deployer knowledge and context | Bind the assessment to expected competence, training, and deployment context | Generic assumptions about a “trained user” can conceal foreseeable misuse. A changed deployment context should invalidate or reopen the assessment. |
| 9(6)–(8): testing | Bind test plan, system version, dataset/environment, metrics, thresholds, results, and responsible actors | Providers can game metrics, choose easy test populations, move thresholds after seeing results, or test a build different from the released system. GKOS must make those substitutions detectable. |
| 9(7): real-world testing | Preserve approval, consent, scope, safeguards, observations, and withdrawal records where applicable | Article 60 imposes additional conditions. Article 9 evidence alone must not imply that real-world testing was lawful. |
| 9(9): children and vulnerable groups | Require an explicit applicability decision and group-specific risk evidence | A checkbox is inadequate. Group definitions, intersectional harms, missing data, and privacy constraints can all make a nominal assessment misleading. |
| 9(10): integration with other risk systems | Reference external risk records and preserve mappings and ownership | Integration can cause gaps, duplicated evidence, or conflicting statuses. GKOS needs to show which system is authoritative for each responsibility. |

## Candidate GKOS targets from Article 9

These are the parts worth targeting. They are candidate Standard requirements;
they have not yet been assigned permanent GKOS requirement identifiers.

1. **Risk record:** stable identity, version, hazard, harm domain, affected
   persons, intended-use and misuse scenarios, evidence, uncertainty, and
   status.
2. **Risk-to-control trace:** every mitigation identifies the risk it addresses
   and the evidence used to assess its effectiveness.
3. **Lifecycle state:** open, mitigated, accepted, rejected, superseded, and
   reopened states remain append-only and attributable.
4. **Review triggers:** new incidents, system changes, policy changes,
   monitoring findings, and expired evidence can require reassessment.
5. **Residual-risk decision:** separate per-hazard and overall judgments bound
   to an authorised human decision, policy, evidence set, and time.
6. **Predeclared testing:** metrics and probabilistic thresholds are versioned
   and approved before results are observed.
7. **Release binding:** test evidence is tied to the exact system version and
   intended deployment being assessed.
8. **Post-market feedback:** operational evidence returns to the risk process
   without erasing prior assessments.
9. **Deployment context:** expected user competence, training, environment, and
   foreseeable misuse are explicit inputs rather than assumptions hidden in
   prose.
10. **Vulnerable-group consideration:** the record shows which groups were
    considered, what evidence was used, what was unknown, and who accepted any
    remaining risk.

## Testing model: the Standard defines, the Engine demonstrates

Article 9 should not be implemented as special EU AI Act logic inside the
Engine. The responsibilities should be divided as follows:

| Component | Article 9 responsibility | What its tests establish |
| --- | --- | --- |
| **GKOS Standard** | Defines the required records, relationships, lifecycle rules, gate outcomes, evidence expectations, and claim boundary | The Article 9 support contract covers every targeted paragraph and fails closed when required evidence is absent |
| **Conformance runner** | Owns the fixtures and evaluates adapter-neutral observations | The same Article 9 contract can be applied consistently to any conforming implementation |
| **GKOS Engine adapter** | Presents the Engine's records and outcomes in the observation format required by the runner | The Engine can execute the Standard-defined contract without bypassing, weakening, or redefining it |
| **Provider or qualified assessor** | Supplies domain evidence and judges completeness, effectiveness, and acceptability | The substantive risk case is adequate for the particular AI system and deployment |

This preserves the Engine's ability to run standards other than GKOS. The
Standard owns the meaning of an Article 9 test; the Engine only demonstrates
that it can enforce and evidence that meaning.

## What must exist in the Standard

The first test suite should be a **Standard completeness suite**. It should
fail unless the proposed Article 9 profile contains all of the following:

1. A normative requirement mapped to every targeted part of Article 9.
2. Schemas for a risk-management plan, risk record, risk control, test plan,
   test result, residual-risk decision, review or change trigger, post-market
   input, deployment context, and vulnerable-group assessment.
3. Stable relationships among risks, evidence, controls, tests, system
   versions, decisions, authorities, and later monitoring observations.
4. Explicit lifecycle transitions, including reopening an assessment when
   relevant evidence or context changes.
5. A stable refusal, failure, or `UNEVALUATED` outcome for every missing or
   invalid mandatory condition.
6. At least one passing fixture and one mutation that removes or corrupts each
   mandatory condition. Boundary cases should be added wherever a threshold,
   expiry, version, or authority window is involved.
7. A declaration for each check stating whether it is mechanically decidable,
   evidence-presence only, or dependent on external expert judgment.
8. A completeness manifest that prevents an Article 9 support claim while any
   required paragraph, fixture, or evaluation remains missing.

A prose requirement without a schema and an executable negative fixture would
therefore not count as tested coverage.

## Article 9 test matrix

The following tests are deliberately split between facts GKOS can determine
and judgments it must leave visible for an assessor.

| Article 9 area | Standard-owned rule and fixture | Engine behavior to test | Judgment GKOS must not make |
| --- | --- | --- | --- |
| 9(1) | Required risk-management plan, owner, version, review state, and history | Omit or tamper with one item; the Engine must not produce a complete support result | Whether the documented system operates effectively in the organisation |
| 9(2)(a) | Each risk is linked to intended purpose, affected persons or rights, evidence, and a known or foreseeable scenario | Remove one required link; the risk assessment must remain incomplete | Whether the provider found every reasonably foreseeable risk |
| 9(2)(b) | Risk evaluation records method, severity, likelihood, uncertainty, misuse assumptions, and version | Substitute an unapproved method or omit foreseeable misuse; acceptance must be refused or unevaluated | Whether the estimates are scientifically correct |
| 9(2)(c) | Relevant post-market evidence creates a review trigger linked to the earlier assessment | Add a qualifying incident after acceptance; the Engine must reopen the affected assessment without rewriting history | Whether the monitoring feed itself is complete |
| 9(2)(d) | Every targeted measure links to a risk and effectiveness evidence | Supply a mitigation with no test evidence; residual-risk acceptance must not close | Whether the mitigation is genuinely effective |
| 9(3) | A scope decision records whether a risk is reasonably addressable and the evidence and authority for that decision | Mark a risk unaddressable without the required rationale or authority; the gate must close | Whether the legal and technical scope judgment is correct |
| 9(4) | Interacting controls and trade-offs are declared and unresolved conflicts remain visible | Hide or delete a known control conflict; replay or integrity checks must expose the change | Which balance among competing requirements is legally appropriate |
| 9(5) | Separate per-hazard and overall residual-risk decisions are bound to evidence, policy, time, and authority | Provide only an aggregate score, or let one severe subgroup risk be averaged away; approval must fail | Whether the chosen residual-risk level is acceptable |
| 9(5) | Control hierarchy records design reduction before mitigation, warnings, or training, with reasons for exceptions | Use warnings alone while the design-control decision is absent; the assessment must remain open | Whether a stronger design control was actually feasible |
| 9(5) | Deployment context records expected competence, training, environment, and foreseeable misuse | Change the deployment context after approval; affected risk decisions must reopen or expire | Whether the stated user assumptions are realistic |
| 9(6)–(8) | Test plan predates results and binds metrics, probabilistic thresholds, system version, data, environment, and intended purpose | Move a threshold after seeing results, swap the tested build, or omit a required metric; the result must be rejected | Whether the chosen tests and populations are sufficient |
| 9(7) | Real-world test evidence is separately identified and cannot imply Article 60 compliance by itself | Remove the required legal or safeguard references; the Article 9 record may remain evidence, but no real-world-testing claim may issue | Whether all Article 60 conditions were legally satisfied |
| 9(9) | Children and other vulnerable groups receive an explicit applicability assessment, evidence, unknowns, and group-specific results | Omit the assessment or use unexplained `not applicable`; return `UNEVALUATED`, not pass | Whether all relevant groups and intersectional harms were identified |
| 9(10) | External risk systems have explicit mappings, ownership, authority, and conflict handling | Break a mapping or provide contradictory statuses; the combined record must fail or remain unevaluated | Whether the external framework is itself adequate |

## Cross-cutting Engine tests

In addition to the paragraph tests, every Article 9 fixture set should verify
these implementation properties:

- identical evidence, policy, and versions produce the same gate outcome;
- required evidence cannot be silently ignored by an adapter;
- changing a risk record, threshold, result, authority, or system version is
  detectable;
- later evidence appends a new state instead of rewriting the accepted state;
- stale or expired evidence cannot satisfy a current decision;
- the released system and assessed deployment are the ones named in the test
  evidence;
- missing observations return `UNEVALUATED` rather than pass; and
- the claim records the Standard, runner, fixture, adapter, Engine, and evidence
  versions used to produce it.

These should follow the repository's existing mutation pattern: a valid
baseline remains open or succeeds, then one controlled mutation closes the
expected gate. This makes each failure attributable to one Article 9
condition.

## Result vocabulary and claim boundary

There should be no single `ARTICLE_9_COMPLIANT=true` result. A useful result
separates four questions:

| Result field | Meaning |
| --- | --- |
| `standard_coverage` | Whether the Standard and fixture catalog cover every targeted Article 9 condition |
| `engine_execution` | Whether the implementation enforced those Standard-defined conditions for this evidence package |
| `evidence_status` | Whether required evidence was present, current, internally consistent, and correctly bound |
| `substantive_risk_adequacy` | An explicit external assessment or `UNEVALUATED`; never inferred merely from the first three fields |

The strongest automated outcome is therefore **Article 9 mechanism
demonstrated for the identified evidence and versions**. It is not a legal
finding that the provider complied with Article 9.

## Recommended first executable slice

Start with Article 9(8), because its core controls are comparatively precise
and mechanically testable:

1. approve a versioned test plan containing the intended purpose, metrics, and
   probabilistic thresholds;
2. bind it to an exact system version before test results exist;
3. record the data, environment, results, and responsible actors;
4. accept the valid baseline; and
5. run mutations for a post-hoc threshold change, a system-version mismatch,
   a missing metric, a missing threshold, and a result that predates plan
   approval.

That slice proves the Standard/runner/adapter division before the broader and
more judgment-dependent lifecycle tests are added.

## Preliminary finding

Article 9 is a promising GKOS target because its central problem is not merely
calculating a risk score. It is maintaining an inspectable lifecycle from risk
evidence through mitigation, testing, review, acceptance, monitoring, and
corrective action.

GKOS could provide that evidence and control backbone. It cannot determine
that a risk inventory is complete, that a mitigation is scientifically
effective, or that residual risk is legally or ethically acceptable. Those
must remain explicit external judgments backed by evidence and accountable
authority.

The strongest Article 9 claim GKOS could eventually support is therefore:

> GKOS makes the risk-management process traceable, versioned, reviewable, and
> resistant to silent bypass or retrospective rewriting.

It should not claim:

> GKOS proves that an AI system is safe or that its residual risk is
> acceptable.
