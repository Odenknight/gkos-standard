# v0.81 publication evidence index

The immutable source inventory covers every tracked repository artifact outside
this package. The package inventory binds this manifest, release text, source
inventory, and evidence index. The exact commit and final evidence are external
to the commit so no file must contain its own commit SHA.

## Required final evidence

- Exact final main commit and tree, original RC identity, integration PRs, and
  clean local checkout identity.
- Mandatory Ubuntu/Windows Node 22/24 lanes, dependency audit on Node 24,
  release validation, package checksums, Markdown lint, and link checks at
  the final commit.
- Runner results, registry parity, 62 allocations, 28 gates, strict portable
  mutation coverage, and graph false-PASS protections.
- Separately operated local replication and limitations.
- Owner disposition after presentation of the exact evidence, date, and target.
- Signed tag object and target verification, authorized creation controls,
  and successful post-tag workflow.
- GitHub Release, archive digests, and verified Zenodo version/concept DOI.

Final results are preserved in the owner evidence packet and bound by its
SHA-256 in the signed tag annotation. This index does not invent future results.

## Historical correction

The original RC push link check failed on a connection to spiffe.io.
[Run 33712860101](https://github.com/Odenknight/gkos-standard/actions/runs/33712860101)
passed on attempt 2 without an exclusion or waiver. That rerun does not replace
the required final-commit checks.
