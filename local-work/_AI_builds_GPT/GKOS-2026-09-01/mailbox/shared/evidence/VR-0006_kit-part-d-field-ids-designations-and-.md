---
id: VR-0006
from: evidence-verifier
date: 2026-09-08T14:40
claim: Kit Part D field IDs, designations, and clause references match the NIST AI 300-1 ipd PDF
result: verified
---

## Method

- Downloaded https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.300-1.ipd.pdf on 2026-09-08 (HTTP 200, 1,090,717 bytes, SHA-256 d38f4ce07d398a6c6762fee6472b3d741da45bd446ea5d163a66da73cae9777e). `pdftotext -layout` to NIST.AI.300-1.ipd.txt (2,166 lines). Grepped each field ID and clause.
- Opened the NIST publication page and the Zero Drafts project page (WebFetch and curl); grepped the HTML for template links.
- Raw output saved at: `../submissions/S-01_NIST-AI-300-1/drafts/source/` (PDF, extracted text, SHA256SUMS.txt, zero-drafts-page.html)

## Finding

Row by row (Kit Part D):
1. 1.5.2 Cryptographic Signature, Table A.2.1, Optional: confirmed; description 'Cryptographically signed manifest containing one or more cryptographic hashes for the dataset instances' confirmed. 1.6.2 Cryptographic Signature, Table A.3.1: confirmed, description 'Cryptographic signature or signatures of the serialized model'; designation column is garbled in text extraction (Optional appears adjacent) so confirm visually in the PDF before citing 'Optional' for the model field.
2. 1.9 Documentation Version Identifier, A.2.1, Required: confirmed. 1.12, A.3.1, Required: confirmed, including the 'shall provide an identifier uniquely associated with the present version' guidance.
3. 1.11 Lineage, A.3.1, Optional: confirmed; text 'prior models from which the model was derived (e.g., by fine-tuning or distillation) and what mechanisms were used'.
4. 4.7 Data Flows, A.2.1: field and chain-of-custody description confirmed. DIFFERS: designation reads Recommended in the extracted text, Kit says Optional. Correct the Kit row to Recommended after a visual check.
5. 7.3.1 Documentation Quality Control, A.2.1, Recommended: confirmed, guidance 'May include a record of when and by whom the accuracy of the documentation was reviewed'. 8.2.1, A.3.1, Recommended: confirmed (layout garbled; same guidance text present).
6. 6.6 Change Log, A.2.1, Optional: confirmed. 7.3 Change Log, A.3.1: field confirmed; designation not legible in extraction, check visually.
7. Clause 2 'NOTE FOR REVIEWERS' on the term 'documentation artifact': confirmed at PDF line 153.
8. Clause 5 note on examples: confirmed near PDF lines 1001-1005 ('Stakeholder input has indicated a desire for concrete examples ... inline ... or annex').
9. Clause 1 scope note: confirmed at PDF lines 119-122: 'does not address documenting entire AI systems ... left to future work'.
Rationale clauses: 4.2.1 is 'Artifact correctness' in the body (line 385) but the table of contents lists 4.2.1 as 'comprehensibility'; the draft's own TOC and body disagree. Cite by title and body line number, not number alone. 4.2.5 Freshness confirmed (line 420-424); the Kit's quoted phrase 'period of post-release information' was NOT found in the freshness clause and must be re-sourced or dropped. 4.3.4 Keep processes manageable (line 486) and 4.3.7 Distribute documentation work (line 522, 'should avoid assigning documentation responsibilities to a single person') confirmed. 3.3.1, 3.3.1.2, 3.4.1, 3.4.5 exist as titled.
Submission instructions (PDF line 105): email ai-standards+doczd@nist.gov; deadline 'input received by September 16, 2026' (no time or timezone stated); 'optional commenting template' is mentioned but NO template file or URL is linked from the PDF, the publication page, or the Zero Drafts project page. Marked-up documents, bulleted comments, and letters are explicitly accepted. NIST asks that AI-assistant use be disclosed.

## Allowed sentence

Use the Kit Part D table with row 4 corrected to Recommended and the freshness quotation removed. State the deadline as 'input received by September 16, 2026'. If no template is found by 2026-09-12, submit in the Kit's own table format; the PDF permits it.


## Erratum (2026-09-08, after review-rev1.md)

Item 4 above is WRONG. The reviewer rendered PDF page 37 visually: field 4.7 Data Flows is **Optional**, as the Kit said. The word "Recommended" in the text extraction belonged to field 4.6's column. Also: model 1.6.2 is Optional (page 44), model 7.3 is Optional (page 51). Item 8's "lines 1001-1005" were extracted-text line numbers, not printed lines; the Clause 5 note box follows printed line 618. Lesson: `pdftotext -layout` column bleed is not evidence of a designation; confirm designations visually or by agreement of `-table` and `-raw` modes.
