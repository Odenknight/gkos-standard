#!/usr/bin/env bash
set -euo pipefail
node scripts/verify-v0821-release.mjs
node conformance/runner/registry-lint.mjs --require-mutation-coverage
release_dir="releases/$(sed -n 's/^date-released: "\(.*\)"/\1/p' CITATION.cff)-v0.82.1"
(cd "$release_dir" && sha256sum -c SHA256SUMS.txt)
node scripts/release-source-checksums.mjs --check "$release_dir"
