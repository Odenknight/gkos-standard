# 8. Getting involved

> **Informative.** This beginner's guide page explains GKOS in plain language. It creates no requirement and changes no rule. Where it differs from the [authoritative sources](README.md#authoritative-sources), those sources control. Edition described: GKOS-2026-09-24 v0.82.1.

GKOS welcomes criticism, implementation reports, examples, test fixtures and proposed changes. Taking part does not give anyone authority to bind the specification. See [CONTRIBUTING.md](../CONTRIBUTING.md).

## Where to start

| You want to | Use | Example |
| --- | --- | --- |
| Ask a question or float an idea | GitHub Discussions | "Could a Context Manifest cover a batch of decisions?" |
| Report a clear problem | A GitHub issue | "Chapter 3 links to the wrong annex." |
| Offer exact replacement text or a file | A pull request | A corrected table, or a new negative fixture |
| Report a security problem | GitHub private vulnerability reporting | Never a public issue, discussion or pull request |

The security route is in [SECURITY.md](../SECURITY.md). Do not post exploit details, credentials or private data in public.

## What helps most

The [README](../README.md#contributing) lists high-value contributions:

- independent implementation reports;
- negative, boundary, mutation, downgrade, bypass and recovery fixtures;
- protocol and framework mappings with exact version evidence;
- public pilot results, including failures and implementation burden;
- security, privacy, legal, accessibility, records, scientific and human-factors review;
- clearer public examples and translations; and
- multi-stakeholder governance participation for the v1.0 path.

A **fixture** is a small test file with an expected result. A negative fixture is one that must fail. Negative fixtures are valuable because they show that a rule actually blocks what it should.

## Kinds of change

Every proposal is sorted into one of six classes. See [CONTRIBUTING.md](../CONTRIBUTING.md#change-classes).

| Class | Plain meaning | Example |
| --- | --- | --- |
| Editorial | Wording, typos, links | Fix a broken link |
| Clarification | Says an existing rule more clearly | Explain an ambiguous sentence |
| Normative compatible | Adds or changes a rule without breaking existing valid use | A new optional field with its rule |
| Breaking | Existing valid use stops being valid | A renamed machine namespace, as GKX 2.0 did under R14 |
| Constitutional | Changes how GKOS itself is governed | A change to the amendment path |
| Security emergency | Urgent fail-closed restriction | Temporarily block an unsafe pattern |

The repository names the six classes but does not define each one in a sentence. The plain meanings above are this guide's informal readings. GOVERNANCE.md does say that security emergencies may impose temporary fail-closed restrictions and need review afterwards.

A normative-compatible proposal must name the affected sections and decisions, evidence, exact wording, compatibility impact, security and privacy effects, fixture impact, and a rollback or supersession route.

## How a change is adopted today

During v0.x, the path has seven steps. See [GOVERNANCE.md](../GOVERNANCE.md#v0x-amendment-path).

1. A discussion, issue, critique, implementation finding or proposal.
2. Evidence-backed replacement text or a file.
3. Classification into one of the six classes.
4. Advisory or external review suited to the risk.
5. A Development Decision Record stating the editor's decision and its non-consensus status.
6. A pull request and validation.
7. Merge, changelog and release administration.

The Founder and Initial Editor makes the decision at step 5. That decision is a **development decision**. It is not consensus ratification, independent certification or an accredited standards decision.

## Review: three kinds

When a decision record describes review, it must say which kind it was. See [GOVERNANCE.md](../GOVERNANCE.md#development-phase-authority).

- **Advisory:** feedback that informs the editor.
- **Independent:** a reviewer that is organizationally and operationally independent of the proposer.
- **Self-attested:** the proposer's own check.

No one may describe their own work as independently verified or certified. See [non-self-certification](../GOVERNANCE.md#non-self-certification).

## Sign-off and licensing

Every commit meant for merge must carry a Developer Certificate of Origin 1.1 sign-off. Add it with:

```bash
git commit -s -m "Fix broken annex link in guide chapter 3"
```

The `-s` flag adds a line such as `Signed-off-by: Your Name <you@example.org>`. It certifies that you have the right to submit the work under the applicable license. No contributor license agreement is required. See [CONTRIBUTING.md](../CONTRIBUTING.md#licensing-and-dco).

- **Documentation and original graphics:** CC BY 4.0.
- **Schemas, fixtures, workflows, scripts and reference code:** Apache-2.0.

See [LICENSE.md](../LICENSE.md).

## Code of conduct

All participation follows the [code of conduct](../CODE_OF_CONDUCT.md).

## The committee goal

GKOS is a developmental specification (public working draft). It began as a single-author pre-standard concept; the goal is to advance it to a pre-standard through an open, multi-stakeholder committee process.

Before v1.0, [GOVERNANCE.md](../GOVERNANCE.md#v10-governance-gate) requires GKOS to establish and publish:

- rules for appointing and removing editors and committee members;
- balanced stakeholder representation;
- voting, quorum, abstention, recusal and safeguards against dominance;
- public-review periods for each change class;
- appeals and complaints procedures;
- interpretation and maintenance procedures;
- conflict-of-interest disclosures; and
- release-signing and succession authority.

Only decisions made under that future model may be called formal consensus ratifications. The [ROADMAP](../ROADMAP.md#horizon-3--v10-readiness) adds evidence needs, such as a publicly demonstrated independent implementation and published pilot results.

External reviewers are being assembled now. Their findings are preserved and answered. A complete committee is not required for a v0.x release. You can help by reviewing, testing, and taking part in the governance work for the v1.0 path.

<!-- GRAPHIC-NEEDED: GN-001 Specification maturity path: single-author pre-standard concept, developmental specification (public working draft, current), pre-standard through an open committee (goal), v1.0 gates -->

---

[Guide index](README.md) · Previous: [7. How the repository is organized](07-how-it-is-organized.md) · Next: [Glossary](glossary.md)
