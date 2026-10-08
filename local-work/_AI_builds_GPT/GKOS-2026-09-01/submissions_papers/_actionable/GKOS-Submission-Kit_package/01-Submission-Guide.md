# GKOS submission and attribution kit

Prepared 2026-09-08. Version 1.0. Advisory workflow and reusable templates; not a GKOS amendment, external submission, release, or novelty determination. No external messages were sent. Repository heads, historical publication dates, existing DOI values, and current qualifications were not verified for this kit. Resolve these before making corresponding claims.

## What changes from the supplied sample

| Sample | Correction |
| --- | --- |
| All dates are hard deadlines | Record each notice's actual rule. AI 300-1 says later input may still be considered; target September 16 for the indicated revision. Other channels have different cutoffs or no stated deadline. |
| Earlier of tag date or repository capture equals first public date | A tag's embedded timestamp is not an independent publication timestamp. A repository landing-page capture does not prove the content of every file. Tie each claim to the exact preserved artifact. Say earliest verified public evidence located, with search limits. |
| Publish v0.81 or re-tag to get DOI | Check existing deposits first. Never move, delete, or recreate an existing tag to manufacture archival history. Use a genuine new release only when authorized, or archive the exact existing artifact manually with honest metadata. |
| DOI within minutes | Do not promise a processing time. Verify the published deposit, files, metadata and DOI resolution. A reserved DOI is not a published record. |
| Five differentiators are original | They are candidates. Compare normative behavior and earlier versions; retain overlaps and uncertainty. Do not introduce GCP or other terminology unless canonical text defines it. |
| Generic header/license everywhere | Separate submission identity, cited standard version, Engine version, and licenses by material. Apply destination contribution terms; do not invent a blanket license grant. |
| AI 300-1 instructions are on page one | They appear in Note to Reviewers on PDF page 7 (zero-based page 6). Use the specific doczd address. |
| Authority expiry is necessarily an AI 300-1 field gap | Its immediate scope is public dataset/model documentation. Demonstrate a need before adding authority fields; label system-level suggestions future work. |
| Two OECD entries and an account required | The public form is available; account requirements and category choices must follow the live form. Start with Engine, and submit a separate standard entry only if it is distinct and eligible. |
| OECD vets everything; expect weeks | Do not promise vetting or turnaround. The contribution page disclaims endorsement and vetting; catalogue wording is inconsistent across pages. |
| xml2rfc converts arbitrary Markdown | xml2rfc processes RFCXML. Markdown requires a compatible separate converter and syntax. Prefer an official RFCXML template for the first draft. |
| Six record types are a narrow IETF draft | That may still be too broad. Start with one exchange problem and the minimum records required. |
| Internet-Draft has no deadline | There is no deadline for this project, but IETF meeting submission blackouts apply. Recheck portal notices. |
| Email related authors to obtain a reference | Invite technical comparison; acknowledgment and citation are not guaranteed. Similarity does not establish copying. |
| CEN must circulate to WG4 | Ask the secretariat to confirm current responsible group, project stage and accepted route. A letter is not automatically a registered committee contribution. |
| Screenshot establishes delivery | Preserve native sent email with headers and exact attachments, or portal tracking receipt. Screenshot is supplemental. Delivery, acknowledgment, public posting and adoption differ. |
| FAC affiliation is convenient | Use only an accurate, relevant affiliation. Personal authorship and organizational sponsorship are separate. |

## Files and use

- `02-Submission-Template.md`: copy for each comment package; includes reusable header, comment, disclosure and evidence templates.
- `03-Contribution-Register.md`: five candidate rows plus detailed comparison and publication-evidence forms.
- `04-Channel-Playbooks.md`: route-specific actions, payloads, checks, and completion evidence.
- `submission.schema.json`: JSON Schema draft 2020-12 for an internal submission record. It is not an official NIST/OECD/IETF schema or GKOS normative record.
- `submission.example.json`: explicitly incomplete AI 300-1 preparation example. It passes structural validation but cannot pass the readiness check until its blockers are resolved.
- `validate_submission.py`: local schema, reference, artifact-digest and readiness checks. No network calls; no submission or publication effects.

## Common preparation: step by step

1. Name the author consistently: Shaun “Oden” Marshall, Founder and Initial Editor, GKOS. Supply a public contact address yourself. Record actual contributors and permitted affiliations.
2. Select the exact standard release and separately the Engine release, if cited. Resolve repository URL, full commit identifier, file path, clause, artifact digest and immutable link. Do not rely on main-branch links for evidence.
3. Search existing Zenodo records before creating another. Compare creator, version, DOI type and deposited files. Use a version DOI for a particular release; a concept DOI is useful for the project across versions but not enough to identify exact bytes.
4. If the artifact has no deposit, follow Zenodo's manual-upload workflow or enable GitHub integration for future genuine releases. Preserve the original bytes. Describe original stated release date separately from the later deposit date. Do not represent a deposit created today as independent proof of a historical date. See [Zenodo GitHub archiving](https://help.zenodo.org/docs/github/archive-software/github-upload/) and [manual upload](https://help.zenodo.org/docs/github/archive-software/manual-upload/).
5. For each contribution, examine exact clauses in earlier related work. Record differences in issuer, signed content, verification inputs, authority effects, expiry, refusal, replay, and conformance. If not examined, say not compared.
6. Fill the submission template. Keep a short recipient-facing brief, detailed comment rows, and only relevant evidence. The full internal register need not accompany every submission.
7. Disclose AI assistance accurately. Record tools/tasks and human checks. Leave review status incomplete until those checks have actually happened.
8. Freeze the intended outbound files. Compute SHA-256 over exact file bytes. The manifest does not include its own hash. Retain a new manifest revision if outbound files change.
9. Verify recipient and instructions again immediately before sending. Recheck scope, deadline/timezone, formats, portal terms and public-disclosure rules. Do not invent a timezone where none is stated.
10. Record your disposition of the exact package. Submit using the destination's required channel. This kit has not granted publication or sending authorization.
11. Save original transport evidence and then record acknowledgment and public posting separately. A sent email does not establish receipt. A tracking number does not establish adoption.
12. Follow up once if appropriate; don't resubmit an uncertain portal transaction until its status is checked. Preserve subsequent decisions and any acknowledged wording with exact references.

## Local validation

Requires Python 3 with `jsonschema` available. Run from the kit directory:

```bash
python3 validate_submission.py submission.example.json
python3 validate_submission.py submission.example.json --ready
```

The first command checks shape, identifiers, references, event order and any supplied artifact hashes. The second additionally requires route verification, cleared open items, completed human review, and hashed outbound artifacts. The supplied example intentionally fails `--ready`.

Use JSON null for unknown dates, contact fields and identifiers allowed to be unknown; explain unresolved items in `open_items`. Never insert a fabricated DOI or a zero-filled digest to pass a check. Dates use ISO 8601; evidence-event timestamps require an offset. Deadline date, time and timezone are separate to preserve uncertainty.

Validation cannot prove historical publication, ownership, truthful claims, legal effect, delivery, external acceptance, or technical qualification. Those require actual evidence and human judgment. The schema does not implement a cryptographic authority system.

## Your decisions versus delegable work

| You | Research/coding assistance |
| --- | --- |
| Confirm public identity, contact and affiliation | Locate archive records and compare exact versions |
| Choose which claims you stand behind | Build related-work comparison and flag unsupported claims |
| Confirm publication/contribution terms | Prepare scoped comments and source references |
| Complete human review and select exact outbound package | Validate JSON, references, hashes and document consistency |
| Send or expressly authorize a specific submission | Assemble payloads and retain evidence after authorized sending |
| Decide whether to join paid committees or file an IETF draft | Gather actual fees, scope, requirements and route options |

No claim of firstness is necessary for useful technical input. The strongest attribution request identifies the contribution, its source, and its author without treating acknowledgment as a condition that conflicts with submission terms.
