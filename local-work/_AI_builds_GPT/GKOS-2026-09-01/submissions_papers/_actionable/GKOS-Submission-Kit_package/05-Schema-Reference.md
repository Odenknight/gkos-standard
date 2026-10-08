# Schema reference and operating rules

This schema describes submission preparation, not GKOS runtime records. Version 1.0.

| Object | Purpose | Required discipline |
| --- | --- | --- |
| author | Name, role, affiliation and public contact | Null is allowed while drafting; no invented affiliation |
| target | Recipient, route, notice, verification date and deadline | Preserve unknown timezone; distinguish consideration date from hard cutoff |
| baselines | Separate standard and implementation versions | Full commit; exact artifact; version DOI separate from concept DOI; unresolved is explicit |
| sources | External references and what they support | Version and checked date; limits recorded |
| artifacts | Local files and exact byte identity | SHA-256, byte count, relative path under record directory; exclude manifest self-hash |
| evidence | Link external observations or results to a bounded claim | Event time separate from observation time; describe match basis and limits |
| claims | Up to five candidate/documented/narrowed/withdrawn statements | Documented does not mean novel; references checked by validator |
| comments | Independently actionable proposed changes | Problem, wording, rationale, burden, verification and limits |
| ai_assistance | Actual assistance and human review | Do not predeclare review completed |
| author_disposition | Author's record of decision on exact outbound artifacts | Bookkeeping only; not a signature or authority grant |
| events | Sent, acknowledged, posted, adopted, rejected, withdrawn | Each needs a retained artifact and timestamp; no outcome inferred automatically |
| open_items | Unresolved prerequisites | Must be empty for readiness |

## Example workflow

1. Copy submission.example.json per channel; assign stable local ID and revision.
2. Resolve the target route from the official notice. A source ID is not a recipient identity check.
3. Replace unresolved baseline fields with actual evidence; remove baselines not cited. DOI is optional where absent; do not create dummy values.
4. Add evidence and comment records; use null only where permitted. Narrative bracket placeholders are drafting aids and must be manually resolved.
5. Render the recipient-facing document from the Markdown template. Add its relative path, byte size and SHA-256 as an outbound artifact.
6. Record actual author review and decision, not a simulated one. Run structural validation and then --ready.
7. After actual sending, add transport evidence as a new artifact and a sent event. Keep original outbound bytes unchanged. Increment the record revision.
8. Add later outcome events with their own evidence. Rejection can follow acknowledgment; public posting can occur without an acknowledgment. Adoption needs explicit evidence, not an elapsed time or lack of objections.

## Dependencies and limits

Use Python 3.9+ and an isolated environment with requirements.txt installed. jsonschema format extras enable date, time and URI checks. The validator verifies local files and basic consistency; it does not fetch URLs or submit anything. A syntactically valid URI/DOI may not resolve. Recheck external instructions before sending even if an old verified_on date passes validation. Semantic placeholders, misleading prose, unauthentic evidence and questionable licenses require human review.

The example is intentionally not ready. No real DOI, release hash, owner approval or submitted event is fabricated. Tested in this preparation: structural example acceptance; incomplete readiness rejection; dangling-reference rejection; unsupported executed-result rejection; synthetic complete record acceptance; tampered artifact rejection. Synthetic testing did not create a real approval or submission.
