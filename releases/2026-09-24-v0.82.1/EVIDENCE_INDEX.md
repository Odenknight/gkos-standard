# v0.82.1 evidence index

The signed tag annotation binds the final tested commit to the owner's recorded
publication authorization, package hashes and successful mandatory check URLs.
A commit cannot contain its own hash; the annotation and subsequent external
receipt supply that binding. Do not treat v0.82 or PR #61 results as v0.82.1 CI.

Mandatory checks: `lint`, `links`, `validate`, `checksums`,
`blocking dependency audit / Node 24`, `blocking ubuntu-latest / Node 22`,
`blocking ubuntu-latest / Node 24`, `blocking windows-latest / Node 22`, and
`blocking windows-latest / Node 24`. They must pass on the exact tag target.
The release validator also runs strict mutation coverage, verifies 62 allocations
and 28 gates, empty qualifying profiles, preserved historical releases and an
unchanged technical baseline. Dedicated post-tag verification checks signature,
owner tagger, target, main ancestry, signed evidence and package integrity.

No independent review, separately operated replication, profile qualification,
certification or regulatory approval is claimed. Archive evidence is subsequent
to publication and must be verified before recording a new DOI.
