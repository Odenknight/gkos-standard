# GKOS Priority, Attribution, and Submission — Execution Guide
Version 1 — 2026-09-08. Owner: Shaun "Oden" Marshall. Companion to `GKOS-Submission-Kit-2026-09-08.md` (templates live there; this file is the order of work).

Guiding statement for everything below (from the fourth review, and correct):
> "This identified GKOS publication disclosed this specific mechanism by this independently supported date."
Never "we invented this first."

---

## Phase 0 — Set up the agents and your voice (Day 1, before anything else)

You will dictate notes and messaging by voice. Agents draft correspondence in your voice. You approve and send. Agents never send.

### 0.1 Build your voice corpus
1. Record 10–15 voice notes, 1–3 minutes each, on real topics: why GKOS exists, what a refusal receipt is, how you'd answer a skeptic, how you'd write to NIST, how you'd tell a collaborator no. Speak the way you actually talk.
2. Transcribe each (phone dictation, Whisper, or any transcription tool). Save raw transcripts, unedited, to `voice/transcripts/YYYY-MM-DD-topic.md`.
3. Pull 3–5 pieces of writing you've already sent and are happy with (emails, README paragraphs, GitHub comments). Save to `voice/samples/`.
4. Have an agent read all of it and produce `voice/STYLE.md` containing: sentence length habits; words and phrases you use; words you never use; how you open and close messages; how formal you are with strangers vs. collaborators; how you handle disagreement; five verbatim quotes that sound most like you. You review and correct STYLE.md by voice; the agent revises. Repeat until you'd say "yes, that's me."
5. Every time you dictate a new note, it goes into `voice/transcripts/`. STYLE.md is re-checked monthly.

### 0.2 Standing instructions to every agent (paste into each agent's system/project instructions)
```
You assist Shaun "Oden" Marshall on the GKOS project.
1. Drafting: Write all outward correspondence in Shaun's voice using voice/STYLE.md and the
   transcripts in voice/transcripts/. Match his tone, sentence length, and vocabulary. Plain
   language. No marketing adjectives. When Shaun dictates the substance of a message, preserve
   his words and ordering wherever they are usable; edit for clarity only.
2. Never send. Produce drafts for approval. Shaun sends.
3. Never fabricate. Any claim about repository state, versions, dates, test results, commits,
   DOIs, or external documents must come from a tool you actually ran or a document you actually
   opened, and you must say which. If a tool is unavailable, say so and stop. Prior incident:
   fabricated commit hashes and test counts. This project is about provenance; fabricated
   evidence is the worst possible failure.
4. Label everything "executed" or "proposed". Never present a proposed test as a result.
5. Prohibited words in any submission: first, only, novel, certified, recognized, admissible,
   approved, government-endorsed.
6. Every submission uses the header block and checklist in GKOS-Submission-Kit. Every sent item
   gets a row in the submission log before sending and a SHA-256 of each file.
7. Owner decisions (OD-series, anything about what to claim, what to file, what to pay for) are
   Shaun's. Provide options and a recommendation; do not decide.
8. Disclose AI assistance in every NIST submission using the Part F text in the Kit.
```

### 0.3 Working rhythm
- You dictate → agent transcribes into the day's note → agent turns items into tasks or drafts → you review by voice → agent revises → you send.
- One folder per submission (`submissions/S-xx/`). Nothing sent is ever edited afterward.

---

## Phase 1 — Reconcile existing evidence (Days 1–3; free)

The reviews found inconsistencies. Fix them before citing anything externally.

1. **Citation examples out of date.** `LICENSE.md` attribution example says v0.76; `NOTICE.md` says v0.77; current release is v0.81. Update both to a version-neutral pattern ("cite the specific release used; current: v0.81, DOI …") while leaving historical release folders untouched.
2. **Decision records vs. release.** R22 and R23 are dated Sept 4 and concern v0.82. They are not part of the v0.81 publication. Make sure nothing says otherwise.
3. **Signature type.** The v0.81 tag is SSH-signed, not GPG. Publish your SSH allowed-signers entry (e.g. `governance/allowed_signers`) with instructions so third parties can run `git tag -v` offline. Say "SSH-signed" everywhere, not "GPG."
4. **Earliest independently supported date.** For the standard: Zenodo deposit of v0.81, Sept 3, 2026 (per CITATION.cff — agent verifies by resolving DOI 10.5281/zenodo.22269294 and recording the deposit timestamp). For v0.75 / July 17: search web.archive.org for the earliest capture of the repo. If none exists, July 17 is "the document's stated date," nothing more. Record the result in the contribution register `baseline` block.
5. **Trademark status.** `TRADEMARKS.md` says "pending." Find out if any application was actually filed (USPTO TSDR search by owner name). If not, change the wording to "claimed; no application filed as of [date]." An inaccurate "pending" hurts you.
6. **Zenodo contents.** Download the v0.81 Zenodo archive, unzip, confirm the files supporting each contribution claim are inside, record SHA-256 of the archive. Zenodo metadata can be edited later; the deposited files cannot — note which is which.

---

## Phase 2 — Identity and independent archival (Week 1; free)

1. **ORCID.** Check orcid.org for an existing record under your name first. Register if none. Then: link ORCID to GitHub via GitHub profile settings (the authenticated link — do not just type it in git config; that embeds nothing); add `orcid:` to your author entry in CITATION.cff on all five repos; add it as creator metadata on both Zenodo records (edit metadata; this is allowed). Use the same name form everywhere: Shaun Allan Marshall, alias Oden.
2. **Software Heritage.** At archive.softwareheritage.org/save/, request archival of gkos-standard, GKOS-Engine, GKOS-Engine-Lite, Kosmos-Oden, Kosmos-Oden-Lite. Wait for the visit to complete (hours to days). Browse to the archived revision matching the v0.81 release commit `8f2a158c…`, record the `swh:1:rev:` and `swh:1:dir:` identifiers, and confirm the files behind each contribution claim are present. Add SWHIDs to CITATION.cff (`identifiers:` list, type `swh`) and to the contribution register.
3. **OpenTimestamps — manual first.** For v0.81: (a) download the exact release archive; (b) create `RELEASE-MANIFEST.txt` listing each file and its SHA-256; (c) `ots stamp RELEASE-MANIFEST.txt`; (d) keep files + manifest + `.ots` together in `releases/v0.81/`; (e) after ~24h, `ots upgrade` then `ots verify`. Only after this works once, consider automating; if you use a Marketplace action, pin it to a commit SHA and read its permissions. Remember what this proves: the manifest existed before block N. It does not prove authorship or public access, and it cannot backdate anything to July.
4. **AUTHORS.md** in each repo: "Authored and maintained by Shaun 'Oden' Marshall (ORCID …), 2026. Preferred citation: see CITATION.cff. Concept DOI …" Use accurate roles (author, editor, contributor).
5. **Branch protection.** Check current rulesets first (agents cannot see this; you must). Identify bots/automation that push. Then enable "Require signed commits" on `main` for each repo and test with one signed and one unsigned push. Document your key-revocation and account-recovery procedure in SECURITY.md.

---

## Phase 3 — Contribution register (Week 1–2; free; gates all claims)

Use Part B of the Kit. Maximum five entries. For each candidate, an agent reads — actually reads, with the URL open — draft-nelson-agent-delegation-receipts (rev 10, 2026-06-13) and draft-sharif-agent-audit-trail (-00), requirement by requirement, and fills `overlap` / `difference`. You rule on `finding` and `claimable_statement`.

Candidates: CR-01 refusal receipt as governed record; CR-02 Layer-1 re-entry rule; CR-03 purpose-bound reproducible Context Manifest; CR-04 cumulative GCP profiles with self-attested vs independent distinction; CR-05 universal receipting invariant.
Not candidates: delegation receipts, hash-chained logs, "evaluation ≠ approval" (XACML PDP/PEP), read-only-makes-grounding-safe.

No external submission cites a mechanism until its register entry has a `finding`.

---

## Phase 4 — NIST submissions (fixed deadlines; free)

All use the header block (Kit Part A), the AI disclosure (Part F), and the checklist (Part G). Draft in your voice from your dictated notes; agents format.

| # | Target | Send by | Deadline | To | Subject |
|---|---|---|---|---|---|
| S-01 | NIST AI 300-1 ipd (public-facing AI documentation) | **Sept 14** | Sept 16 | ai-standards+doczd@nist.gov | Comments on NIST AI 300-1 ipd — Shaun Marshall — documentation traceability fields |
| S-03 | NIST AI 200-2 ipd (TEVV-Athlon) | Oct 2 | Oct 6 | TEVV-Athlon@nist.gov | NIST AI 200-2 — Comments — Shaun Marshall |
| S-04 | NVD modernization RFI | Oct 9 | Oct 13, 11:59 pm ET | regulations.gov, docket NIST-2026-0100 (FR doc 2026-16371) | n/a (portal) |
| S-05 | NIST SP 1353 ipd (AI for CSF analysis) | Oct 12 | Oct 15, 11:59 pm | csf@nist.gov | Comments on NIST SP 1353 ipd — Shaun Marshall — evidence traceability in prompts |

### S-01 — NIST AI 300-1 (do this first)
1. Download the PDF (nvlpubs.nist.gov/nistpubs/ai/NIST.AI.300-1.ipd.pdf) and the optional comment template from the Zero Drafts project page. NIST strongly encourages the template; use it.
2. Scope check: the draft covers dataset and model documentation only. System-level and agent-authority material is out of scope. Keep it to one clearly labeled "future work" paragraph at the end.
3. Use the nine pre-drafted comments in Kit Part D (fields 1.5.2/1.6.2 digest method; 1.9/1.12 supersedes; 1.11 lineage; 4.7 custody steps; 7.3.1/8.2.1 independent review; change-log cross-reference; "documentation artifact" terminology; example annex; future work). Agent re-checks every field ID and line number against the downloaded PDF.
4. Add the burden statement (who supplies each field; machine-generated or not).
5. Attach the evidence annex (Kit Part E, ≤6 pages) with one worked example artifact and one failure example, each labeled executed or proposed.
6. Cite GKOS v0.81, Sept 3, 2026, DOI 10.5281/zenodo.22269294. Do not cite July 17 unless Phase 1 step 4 produced a capture.
7. Fill the log row, hash the files, send, screenshot, file in `submissions/S-01/`.
8. Ask for acknowledgment of receipt. If none in 3 business days and before the deadline, one short follow-up.
9. Note for later: NIST hands this draft to INCITS/AI → ISO/IEC JTC 1/SC 42. Your comment is your credential when you contact INCITS (Phase 5).

### S-03 — NIST AI 200-2
Define one assessment objective (e.g. "does a documentation-retrieval workflow preserve source correspondence and refuse ineligible evidence"); map it to the framework's stages; provide positive and negative fixtures; report only what you actually ran. Subject line must contain "NIST AI 200-2". PDF or Word, unlocked.

### S-04 — NVD RFI
Answer only the questions on interoperability, machine-consumable data, and provenance. One worked example of an advisory revision staying traceable. Submit through the regulations.gov portal (email does not count). Record the tracking number; later record the public comment URL.

### S-05 — NIST SP 1353
Comment only on the guide and its AI prompts. Propose exact prompt edits requiring source citation, explicit evidence gaps, and human disposition before an output is treated as an assessment. Table: prompt ID → issue → replacement text → rationale.

---

## Phase 5 — Other channels (parallel, free unless noted)

- **OECD.AI catalogue (S-02, target Sept 18).** oecd.ai/en/catalogue/tools/submit. Two entries: GKOS-Engine (technical tool) referencing GKOS as the specification it implements; GKOS (guideline/standard). 80-word excerpt + detailed description, measured language, version, license, DOI, your name as creator. Listing is not endorsement — never say it is.
- **INCITS/AI inquiry (S-07, this month).** Email INCITS asking: participation categories and fees for an individual, guest/observer options, how to submit a contribution, and the work item that will receive NIST AI 300-1. Attach your S-01 comment as your credential. Decide on membership after you have the fee.
- **CEN-CENELEC JTC 21 (S-08, this month).** The prEN 18229-1 enquiry closed Aug 20, 2026. Email the JTC 21 secretariat: what route exists for a non-EU individual to contribute to the logging work; whether a national-body sponsor is required; current stage. Do not assume the next stage. No comment is prepared until a route is confirmed.
- **W3C (S-09).** Create an account; look for a provenance or agent-related Community Group; join and post the contribution register when complete. CG reports are not W3C Standards.
- **IETF Internet-Draft (S-06).** Only after Phase 3 shows a distinct contribution. Narrow scope (e.g. exchange of purpose-bound context and refusal evidence). Read Note Well and BCP 78 first. Name and cite Nelson and Sharif drafts as work in progress. Submit via datatracker; individual drafts need no WG approval.

---

## Phase 6 — Paid and legal steps (after Phases 1–3; get advice first)

1. **Trademark.** Fee is $350 per class per application (TEAS Plus no longer exists); word mark + logo = two applications ≈ $700 in one class. Before filing: confirm no existing application; run clearance; identify actual goods/services; gather genuine first-use evidence (a public release bearing the mark, not a commit date; do not use July 17 by default). Talk to a trademark attorney for one hour before spending anything.
2. **Defensive publication (Research Disclosure / IP.com).** Your GitHub and Zenodo publications are already prior art; the paid register improves examiner discoverability. If you do it, write the disclosure from the Engine's implementation (mechanism-level detail), not the standard's prose. Get current pricing and a short patent-counsel opinion first. "Never patent" is your current preference, not a rule — nonassertion pledges exist as a middle path.
3. **arXiv.** Two hurdles: (a) endorsement required for first-time cs.* submitters — ask a provenance contact (Groth, Missier, Moreau) or a co-author; (b) since Oct 31, 2025, arXiv CS rejects position/review papers that have not passed peer review. A conceptual-framework write-up will be treated as a position paper. To qualify as research it needs a stated problem, comparison to prior approaches, implemented mechanisms, and reproducible evaluation with failure cases. Plan this as a real paper, or route it to a workshop first.

---

## Phase 7 — Ongoing hygiene

- Every release: SSH-signed tag → Zenodo deposit → Software Heritage visit → OTS manifest → update CITATION.cff, AUTHORS.md, LICENSE/NOTICE examples → row in a release register with DOI, SWHID, OTS block.
- Every submission: log row, hashes, sent copy, acknowledgment, public URL, disposition.
- Every month: re-check STYLE.md against new transcripts; re-check the contribution register against new Internet-Drafts (search datatracker for "agent audit", "delegation receipt", "refusal").

---

## One-page order of work

Day 1: voice corpus + agent instructions (Phase 0); fix LICENSE/NOTICE/trademark wording; verify Zenodo deposit date (Phase 1).
Days 2–5: ORCID → Software Heritage requests → OTS manual pilot on v0.81 → AUTHORS.md → check branch rulesets (Phase 2). Start contribution register reads (Phase 3).
By Sept 14: send S-01 NIST AI 300-1.
By Sept 18: OECD.AI entries. Send INCITS and JTC 21 inquiries.
By Oct 2 / 9 / 12: S-03, S-04, S-05.
After register complete: Internet-Draft decision; trademark and defensive-publication consultations; arXiv endorsement outreach.

Stop rule for agents: if any step requires a fact about the repo, a date, or a result that cannot be produced from a tool actually run in that session, the agent writes "not verified" and moves on. No exceptions.
