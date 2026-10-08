# GKOS Submission Kit
Prepared 2026-09-08. Author of record for all submissions: Shaun "Oden" Marshall.
Everything in [brackets] must be filled from verified sources before sending. Do not send with brackets present.

---

## Part A — Header block (paste at top of every submission)

```
Submitted by:      Shaun "Oden" Marshall
Role:              Founder and Initial Editor, Governed Knowledge Operations Standard (GKOS)
Affiliation:       [omit, or "Florida Armored Combat (project host; does not own GKOS)"]
Contact:           [public professional email]
Standard cited:    GKOS [exact version, e.g. v0.81]
  Repository:      https://github.com/Odenknight/gkos-standard
  Release tag:     [tag]        Commit: [full 40-char SHA]
  DOI:             [10.5281/zenodo.xxxxxxx]
  First public:    [date + how established: GitHub release publication / Wayback capture / Zenodo deposit]
  Licenses:        CC BY 4.0 (text, graphics); Apache-2.0 (schemas, fixtures, code)
Implementation:    GKOS-Engine [version]  https://github.com/Odenknight/GKOS-Engine
  Commit:          [SHA]    DOI: [if any]
Status disclaimer: GKOS is a public pre-standard. It is not an accredited standard, certification
                   scheme, or legal/regulatory compliance assurance. Conformance claims are provisional.
AI assistance:     See disclosure at end of this document.
```

Rules: standard version and Engine version are always stated separately. Never write "first", "certified", "recognized", "admissible", or "government approved".

---

## Part B — Contribution Register (schema + worked entry)

Maximum five entries. Findings of "overlap" or "not established" are valid and stay in the register.

```yaml
# contribution-register.yaml   version: 1   maintained_by: Shaun Marshall
register_version: 1
register_date: 2026-09-08
baseline:
  standard_version: ""          # e.g. v0.81
  standard_commit: ""           # full SHA
  standard_doi: ""
  earliest_public_evidence:
    date: ""                    # YYYY-MM-DD
    kind: ""                    # github_release | wayback_capture | zenodo_deposit | other
    url: ""
    note: ""                    # e.g. "tag date not used; release publication timestamp used"

entries:
  - id: CR-01
    title: ""                   # short noun phrase, e.g. "Refusal Receipt as first-class governed record"
    mechanism: ""               # what it does, one paragraph, no adjectives
    gkos_clause: ""             # e.g. "v0.75 §7.4 Layer 4 diagnostics and control receipts; §11 fail-closed"
    gkos_file_path: ""          # repo path
    engine_implementation: ""   # file path + commit, or "not implemented"
    fixture_evidence: ""        # fixture IDs, or "none"
    earliest_evidence:
      date: ""
      artifact: ""              # exact file/commit/URL
      digest_sha256: ""
    related_work:
      - name: ""                # e.g. draft-nelson-agent-delegation-receipts-10
        date: ""
        url: ""
        overlap: ""             # what they also do
        difference: ""          # what GKOS does that they do not, or "none established"
    finding: ""                 # one of: distinct | partial_overlap | overlap | not_established
    claimable_statement: ""     # the exact sentence you may use in submissions, or "do not claim"
    do_not_claim: ""            # explicit list of things you must not say about this entry
```

### Worked entry (fill remaining fields from repo before use)

```yaml
  - id: CR-01
    title: Refusal Receipt as a governed record
    mechanism: >
      When a control fails or eligibility is not met, the system emits a record identifying
      the requested operation, the policy version evaluated, the failing control, and a
      reason code, and this record is retained with the same sensitivity inheritance as
      an accepted-use record. Refusal is evidence, not absence of evidence.
    gkos_clause: "v0.75 §7.4 (diagnostics and control receipts), §11 (fail-closed sensitivity)"
    gkos_file_path: "[standard/...]"
    engine_implementation: "[src/... @ SHA]; NO_ELIGIBLE_RESULTS reason codes per external review, verify"
    fixture_evidence: "[fixture IDs or none]"
    earliest_evidence: { date: "", artifact: "", digest_sha256: "" }
    related_work:
      - name: draft-sharif-agent-audit-trail-00
        date: "2026-08 (approx; verify on Datatracker)"
        url: https://datatracker.ietf.org/doc/draft-sharif-agent-audit-trail/
        overlap: "hash-chained records; 'decision' action type; tombstone records"
        difference: "[does it record refusals with policy version and reason code? verify text]"
      - name: draft-nelson-agent-delegation-receipts-10
        date: "2026-06-13"
        url: https://datatracker.ietf.org/doc/draft-nelson-agent-delegation-receipts/
        overlap: "signed authorization objects, scope, time window, pre-execution anchoring"
        difference: "Nelson receipts authorize; they do not appear to record denials as receipts. Verify."
    finding: not_established        # until the two drafts are read clause-by-clause
    claimable_statement: >
      GKOS v0.75 specifies that failed controls produce retained diagnostic records
      (§7.4) that inherit the sensitivity of referenced material (§11).
    do_not_claim: "first; only; novel; no equivalent exists"
```

Candidate entries to evaluate (not pre-approved): CR-02 Layer-1 re-entry rule (§7.8); CR-03 purpose-bound reproducible Context Manifest (§7.6); CR-04 cumulative GCP conformance ladder with self-attested vs independent distinction (§10); CR-05 universal receipting invariant (OD-8). Delegation receipts and hash-chained logs are NOT candidates.

---

## Part C — Submission Log (one row per submission; never edit a row after sending)

```csv
sub_id,target,channel,docket_or_pub,deadline_utc,target_send_date,sent_datetime_utc,sent_to,subject_line,files_sent,sha256_of_each_file,ack_received_date,ack_evidence_path,public_url,disposition,notes
S-01,NIST AI 300-1 ipd,email,NIST AI 300-1 ipd,2026-09-16T23:59 (no tz stated),2026-09-14,,ai-standards+doczd@nist.gov,"Comments on NIST AI 300-1 ipd — Shaun Marshall — documentation traceability fields",,,,,,,
S-02,OECD.AI Catalogue,web form,n/a,none,2026-09-18,,https://oecd.ai/en/catalogue/tools/submit,n/a,,,,,,,"two entries: GKOS (standard) and GKOS-Engine (tool)"
S-03,NIST AI 200-2 ipd,email,NIST AI 200-2 ipd,2026-10-06,2026-10-02,,TEVV-Athlon@nist.gov,"NIST AI 200-2 — Comments — Shaun Marshall",,,,,,,"subject must contain 'NIST AI 200-2'"
S-04,NIST NVD RFI,regulations.gov,NIST-2026-0100 / FR 2026-16371,2026-10-13T23:59 ET,2026-10-09,,https://www.regulations.gov,n/a,,,,,,,"portal only; email does not count"
S-05,NIST SP 1353 ipd,email,SP 1353 ipd,2026-10-15T23:59 (tz unstated),2026-10-12,,csf@nist.gov,"Comments on NIST SP 1353 ipd — Shaun Marshall — evidence traceability in prompts",,,,,,,
S-06,IETF Internet-Draft,datatracker,draft-marshall-gkos-[scope]-00,none,after CR complete,,https://datatracker.ietf.org/submit,n/a,,,,,,,"read Note Well + BCP 78 first"
S-07,INCITS/AI inquiry,email,n/a,none,2026-09,,[from incits.org],,,,,,,,"ask: fee, category, guest, contribution procedure, work item"
S-08,CEN-CENELEC JTC 21,email,prEN 18229-1,none,2026-09,,[secretariat via jtc21.eu],,,,,,,,"ask which route exists for a non-EU individual; do not assume stage"
S-09,W3C,account/CG,n/a,none,2026-09,,https://www.w3.org/community/,,,,,,,,
```

Folder convention: `submissions/S-01_NIST-AI-300-1/` containing `sent/` (exact bytes), `ack/`, `public/`, `README.md` (the log row in prose). Compute SHA-256 of every sent file (`sha256sum file`) and record it before sending.

---

## Part D — NIST AI 300-1 comment table (pre-drafted; verify clause/line numbers against the PDF you download)

If NIST's optional template has different columns, map these into it; keep the content.

| # | Location (clause / field ID / line) | Type | Problem | Proposed replacement or addition | Rationale (draft's own terms) | Supporting example / GKOS ref |
|---|---|---|---|---|---|---|
| 1 | Table A.2.1 field 1.5.2; Table A.3.1 field 1.6.2 "Cryptographic Signature" — Optional | Technical | Signature is listed but the object signed is unspecified. "One or more hashes for the dataset instances" gives no rule for which serialization is hashed, so two documenters can produce non-comparable signatures for the same bytes. | Add subfield **1.5.2.1 Digest Method** (Conditionally required if 1.5.2 populated): "Hash algorithm and the exact serialization or file set over which it was computed, sufficient for a third party to recompute it." Elevate 1.5.2 to Conditionally recommended when the dataset/model is externally accessible. | Correctness (4.2.1), Interoperability (4.2.6), Identifying Descriptors requirement to "determine whether a given dataset is the one described". | GKOS v0.75 §7.1 Source Record "content fingerprint"; §7.2 "filenames and paths are not identity". Example: `sha256 over canonical tar of listed files; manifest at [url]`. |
| 2 | Table A.2.1 field 1.9 / Table A.3.1 field 1.12 "Documentation Version Identifier" — Required | Technical | Field records a version of the artifact but not what changed or what it supersedes. Readers cannot tell whether a new artifact version corrects, extends, or withdraws a prior one. | Add subfield **1.9.1 Supersedes** (Conditionally required if a prior artifact version was published): "Identifier of the artifact version this one replaces, and a one-word relation: correction / extension / withdrawal." | Freshness (4.2.5) says readers "need clarity about what period of post-release information is included"; Maintainability (4.2.8). | GKOS v0.75 §6 distinguishes contradiction, supersession, correction, withdrawal as operations that "MUST NOT be silently conflated". |
| 3 | Table A.3.1 field 1.11 "Lineage" — Optional | Technical | Lineage names prior models but not their documentation artifacts, so the chain cannot be followed. | Amend description: "…prior models from which the model was derived, **including the Documentation Version Identifier (1.12) of each prior model's artifact where one exists**, and what mechanisms were used." | Reuse and integration (3.3.1), Suitability assessment (3.3.1.2). | GKOS v0.75 §7.3 lineage records carry "evidence anchors" and "version". |
| 4 | Table A.2.1 field 4.7 "Data Flows" (chain of custody) — Optional | Technical | Chain of custody is described as narrative. No requirement that each custody step be dated or attributed, so the field cannot support the Accountability outcome (3.4.1). | Add guidance: "Where populated, each custody step should identify the entity, the action (acquire/transform/store/transfer), and a date or date range." | Accountability (3.4.1): "more thoroughly documented are typically more traceable and attributable". | GKOS v0.75 §7.1 "acquisition or custody information"; §7.3 "Actor / Provenance / Temporal validity". |
| 5 | Table A.2.1 field 7.3.1; Table A.3.1 field 8.2.1 "Documentation Quality Control" — Recommended | Technical | Guidance says "may include a record of when and by whom the accuracy … was reviewed" but places no constraint on the reviewer. A documentarian reviewing their own artifact satisfies the text. | Add: "Where a review record is provided, it should indicate whether the reviewer was independent of the artifact's authors (field 1.3.2)." | Trust (3.4.5), Accountability (3.4.1); the draft's own 4.3.7 says to avoid single-person documentation. | GKOS v0.75 §5 "No actor may approve, review, validate … its own work." Propose as *should*, not *shall*, to respect 4.3.4 manageability. |
| 6 | Table A.2.1 field 6.6; Table A.3.1 field 7.3 "Change Log" — Optional | Editorial/Technical | Change Log and Documentation Version Identifier (comment 2) overlap without cross-reference. | Add cross-reference: "Entries should reference the Documentation Version Identifier (1.9 / 1.12) in effect when the change was recorded." | Maintainability (4.2.8), NIST's request on field distinctness (Annex A note). | — |
| 7 | Clause 2, "Documentation artifact" — terminology request | Terminology | NIST asks whether "artifact" is clearest. In provenance and records-management usage, "artifact" is the thing described *and* the description; ambiguity is real. | Retain "documentation artifact" but add Note 3 to entry: "A documentation artifact is itself a record with its own identity and version (see 1.9 / 1.12), distinct from the dataset or model it describes." Do not rename. | Comprehensibility (4.2.2); avoids churn. | GKOS treats records-about-things as governed objects with their own identity (§7.2). |
| 8 | Clause 5 note to reviewers — examples | Response to request | NIST asks whether to provide filled-in examples inline or in an annex. | Recommend one complete example artifact per template in a separate annex, each carrying a Documentation Version Identifier, a Supersedes value, and a recomputable digest — so the examples demonstrate comments 1–2 rather than describing them. Offer a populated example from GKOS-Engine's own release documentation. | Reviewer request; Interoperability (4.2.6). | Attach: [example artifact, ≤2 pages, JSON + prose]. |
| 9 | Clause 1 Scope note (systems excluded) | Future work — clearly separated | Not a request to change scope. | One paragraph: system-level documentation will need to record the authority under which a component acted and the context it was shown; GKOS v0.75 §7.6–7.7 offers one worked model NIST or SC 42 may wish to examine when system documentation is taken up. No proposed text. | NIST states system documentation is "left to future work". | GKOS v0.75 §7.6 Context Manifest, §7.7 Authorized Use Record. |

Burden statement to include after the table (NIST 4.3.4 manageability): for each proposed field, state who supplies it (build pipeline / documentarian / reviewer) and whether it is machine-generated. Comments 1, 2, 6 are machine-generable at release time; 3, 4 are documentarian-supplied; 5 is a one-line attestation.

---

## Part E — Evidence Annex outline (attach as PDF, ≤ 6 pages)

1. Citation baseline — the header block, expanded with the earliest-public-evidence method.
2. Worked example — one dataset or model documentation artifact following the draft's Annex A profile, with the proposed subfields populated, digest recomputable from a public URL.
3. Failure example — the same artifact with a modified source byte: show the digest mismatch and the resulting refusal record. Label as *executed* or *proposed* in the heading. Never present a proposed test as a result.
4. Related work statement — two paragraphs naming draft-nelson-agent-delegation-receipts and draft-sharif-agent-audit-trail as overlapping work in progress; state what GKOS shares with them. No priority claims.
5. Test evidence — for each fixture referenced: fixture ID, commit, command, environment, result, date. Anything not run: "not executed".
6. Limitations — pre-standard status; single-maintainer; no second implementation; fixtures incomplete.

---

## Part F — AI-assistance disclosure (adapt truthfully; required by 300-1, good practice elsewhere)

> Portions of this submission were drafted with the assistance of large language model tools (Anthropic Claude; [others if used]). The author selected the comment subjects, verified each cited clause and field identifier against the published draft, verified repository commits and versions by direct inspection, and is solely responsible for the content. No test result reported here was generated by an AI tool; results marked "executed" were produced by running the cited commands. Results marked "proposed" have not been run.

---

## Part G — Pre-send checklist (all must be true)

- [ ] Header block has no brackets; standard and Engine versions stated separately
- [ ] Earliest-public date is backed by a URL, not by a tag or document date
- [ ] Every GKOS clause cited exists in the cited version (open the file and check)
- [ ] Every draft field ID and line number checked against the PDF actually downloaded
- [ ] No use of: first, only, novel, certified, recognized, admissible, approved
- [ ] Related-work section names Nelson and Sharif drafts
- [ ] Executed vs proposed tests labeled
- [ ] AI disclosure present and accurate
- [ ] Recipient address copied from the source document, not from memory
- [ ] Subject line matches log row; files hashed; log row filled except sent_datetime
- [ ] Send; then fill sent_datetime, screenshot to `ack/`, never edit the sent files
