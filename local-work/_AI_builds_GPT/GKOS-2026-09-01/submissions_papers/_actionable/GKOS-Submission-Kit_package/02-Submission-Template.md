# [Destination publication] — technical comments

**Template: replace bracketed fields. Not ready to send.**

| Field | Value |
| --- | --- |
| Submission ID / revision | [local identifier] / [revision] |
| Author | Shaun “Oden” Marshall |
| Role | Founder and Initial Editor, GKOS |
| Affiliation | [accurate affiliation, or Independent contributor] |
| Public contact | [email approved for publication] |
| Prepared / submitted | [date] / Not submitted |
| Target | [full publication title, identifier, edition/date, docket if applicable] |
| Target source | [official URL and downloaded document SHA-256] |
| Request | [specific change or review requested] |
| Cited GKOS standard | [version; full commit; immutable URL; version DOI if verified] |
| Cited implementation | [name/version/commit, or Not applicable] |
| Capability status | [specified / implemented / tested in stated scope; evidence reference] |
| Rights and attribution | [actual applicable terms for this submission; separately identify licenses of cited materials] |
| Standing | Technical contribution for consideration. Does not claim recipient endorsement, adoption, certification, or priority adjudication. |

## Summary

[Problem the recipient is trying to solve, in ordinary language.]

[Two to four proposed improvements and why they are proportionate to this publication's scope.]

[One concrete result, or state that the example is illustrative and unexecuted.]

## Comment C-001 — [short title]

- Target location: [clause, printed page, PDF page, line range or prompt ID; identify edition].
- Scope fit: [why this falls within the call; otherwise label future work].
- Comment type: [technical / editorial / future work].
- Requested action: [add / replace / clarify / consider future work].
- Problem: [observable ambiguity or failure, not a product pitch].
- Existing provision considered: [precise reference; do not claim a gap without checking].
- Proposed text: [standalone wording in the target's vocabulary; distinguish shall/should/may].
- Rationale: [why this change addresses the problem].
- Implementation burden: [who supplies data; automation; storage/privacy costs; minimum useful subset].
- Verification: [input, expected observation, failure condition, and evidence retained].
- Example/result: [executed result with evidence ID, or explicitly illustrative].
- GKOS relationship: [existing clause / proposed extension / analogy only; exact source].
- Related work: [specific prior clauses and overlap; avoid unqualified novelty].
- Limitations: [what the proposed record does not prove].
- Source/evidence IDs: [links to supporting materials].

Repeat for each comment. Keep each recommendation separately dispositionable.

## Worked example — draft wording, not an established GKOS requirement

Title: Bind evidence references to the documentation revision assessed.

Potential location: AI 300-1 documentation freshness/interoperability guidance; verify exact lines and existing provisions before filing.

Proposed wording for consideration:

“Where documentation cites supporting evidence, the reference should identify the evidence revision used and a means of locating it. When an integrity digest is supplied, its algorithm and the representation to which it applies should be stated. Changes to the documentation should preserve a reference to the preceding revision where practicable.”

Rationale: A mutable link can point to different evidence after an assessment. Revision identification helps a later reader understand what was assessed.

Burden: A revision identifier and stable reference may suffice. Digests can be generated automatically when applicable. Avoid a universal digest requirement where the representation cannot be fixed.

Verification design, not executed: preserve example revision A; change source content to B; confirm that A's reference remains distinguishable from B. If a digest is present, verify it against the declared representation.

Limitation: Matching bytes do not establish truth, legal admissibility, permission to disclose, or approval of the documented model.

GKOS clause/DOI: unresolved; supply exact evidence or remove the GKOS-specific assertion. This example does not demonstrate originality or implementation.

## AI assistance and human responsibility

[Select only statements that are true.]

AI assistance used: [systems and tasks: research triage, drafting, editing, coding, etc.].
Human checks completed: [exact sources, proposed text, examples and test evidence reviewed by the author].
Checks still pending: [list; clear before representing the package as reviewed].
The author takes responsibility for the submitted technical positions. AI output is not presented as independent experimental evidence.

## Attribution request

Please retain the cited GKOS version and author reference where this contribution is discussed or incorporated, and consider acknowledging the contribution under your applicable publication policy. This request does not imply endorsement or a determination of originality.

## Supporting materials

| Artifact ID | Filename / immutable URL | Version | SHA-256 of exact file | Role and limits |
| --- | --- | --- | --- | --- |
| A-001 | [file] | [version] | [actual digest] | [submitted brief] |
| A-002 | [file or URL] | [version] | [digest if available] | [illustrative or executed evidence] |

Keep internal evidence, private contact information and full development history out of public attachments unless relevant and approved for disclosure.

## Internal disposition — remove from public copy if inappropriate

- [ ] Target instructions checked on [date].
- [ ] Scope and existing provisions checked.
- [ ] All capability claims have evidence or are labeled proposed.
- [ ] No unsupported firstness claim.
- [ ] Attribution and AI disclosure accurate.
- [ ] Outbound files fixed and hashed.
- [ ] Author approved this exact revision on [date].
- [ ] Submitted by [actor] via [route] at [timestamp].
- [ ] Native email / portal receipt retained.
- [ ] Acknowledgment recorded separately.
- [ ] Public posting and later disposition recorded separately.
