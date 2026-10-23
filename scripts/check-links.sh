#!/usr/bin/env bash
set -euo pipefail

# Run from one step using an absolute path. Some R720 runners lose
# GITHUB_PATH additions between the lychee action's composite steps.
lychee_dir="$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/gkos-lychee.XXXXXX")"
trap 'rm -rf "$lychee_dir"' EXIT
archive="$lychee_dir/lychee.tar.gz"
curl --fail --location --silent --show-error --retry 3 \
  https://github.com/lycheeverse/lychee/releases/download/lychee-v0.24.2/lychee-x86_64-unknown-linux-gnu.tar.gz \
  --output "$archive"
printf '%s  %s\n' 1f4e0ef7f6554a6ed33dd7ac144fb2e1bbed98598e7af973042fc5cd43951c9a "$archive" | sha256sum --check --strict
tar --no-same-owner -xzf "$archive" -C "$lychee_dir"
lychee_bin="$lychee_dir/lychee-x86_64-unknown-linux-gnu/lychee"
"$lychee_bin" --version
mkdir -p lychee
# Preserve existing exclusions. The two EC pages return 200 locally but 403
# from the R720 CI network (verified 2026-10-23); exempt only those exact URLs.
"$lychee_bin" --no-progress --verbose --format markdown --output lychee/out.md \
  --exclude-path archive \
  --exclude-path docs/archive \
  --exclude-path docs/implementation/archive \
  --exclude-path fixtures/archive \
  --exclude-path schemas/archive \
  --exclude 'https://www\.hhs\.gov/hipaa/for-professionals/faq/2003/are-we-required-to-certify-our-organizations-compliance-with-the-standards/index\.html' \
  --exclude 'https://ansi\.org/american-national-standards/ans-introduction/essential-requirements' \
  --exclude '^https://digital-strategy\.ec\.europa\.eu/en/news/ai-omnibus-enters-force$' \
  --exclude '^https://digital-strategy\.ec\.europa\.eu/en/faqs/understanding-standardisation-ai-act$' \
  '**/*.md'
if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
  cat lychee/out.md >> "$GITHUB_STEP_SUMMARY"
fi
