---
id: VR-0005
from: evidence-verifier
date: 2026-09-08T14:40
claim: A USPTO trademark application for GKOS has been filed
result: not verified
---

## Method

- Read TRADEMARKS.md at main 765c0815: line 3 `Status: Applications and registrations are pending.`; line 5 `... subject to applicable law and pending filings.`
- Web search for a GKOS trademark application returned nothing specific. The USPTO TSDR owner-name search is an interactive application that could not be queried from this session.
- Raw output saved at: TRADEMARKS.md in clone; web search transcript in session only

## Finding

The repository asserts 'pending'. No filing was found, but the tool that would confirm or deny it (TSDR search by owner name) was not available here. The owner can settle this in two minutes at https://tsdr.uspto.gov by searching their own name; if no serial number exists, TRADEMARKS.md should say 'claimed; no application filed as of <date>' per Execution Guide Phase 1 step 5.

## Allowed sentence

Do not write 'pending' in any submission. Say nothing about trademark status externally until the owner reports the TSDR result.
