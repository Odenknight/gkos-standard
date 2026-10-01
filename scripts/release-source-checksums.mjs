// Source and package digest inventory for a dated release directory.
// Usage: node scripts/release-source-checksums.mjs --generate|--check releases/YYYY-MM-DD-vX.YY
// With --check, a local signed tag for the version is preferred as the source of truth.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const [mode, dir] = process.argv.slice(2);
assert.ok(['--generate', '--check'].includes(mode));
const match = /^releases\/\d{4}-\d{2}-\d{2}-(v0\.\d+(?:\.\d+)?)$/.exec(dir ?? '');
assert.ok(match, 'expected releases/YYYY-MM-DD-v0.NN');
const tag = match[1];
let publishedRef;
if (mode === '--check') {
  try {
    publishedRef = execFileSync('git', ['rev-parse', '--verify', `refs/tags/${tag}^{}`], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch { /* Before publication, verify the prepared checkout. */ }
}
if (publishedRef && process.env.EXPECTED_TAG_TARGET) assert.equal(publishedRef, process.env.EXPECTED_TAG_TARGET);
const tracked = execFileSync('git', publishedRef ? ['ls-tree', '-r', '--name-only', '-z', publishedRef] : ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const files = [...new Set(tracked)].filter(p => !p.startsWith(`${dir}/`)).sort();
for (const p of ['README.md', 'CHANGELOG.md', 'CITATION.cff', '.zenodo.json', 'GOVERNANCE.md',
  'standard/00_GKOS_Master_Standard.md', 'requirements/REGISTRY.md',
  'requirements/PROFILE_APPLICABILITY.json', 'requirements/DIAGNOSTIC_CODES.json',
  'conformance/runner/package-lock.json']) {
  assert.ok(files.includes(p), `missing required source: ${p}`);
}
// Hash git blob content so CRLF working trees on Windows match LF checkouts.
const blob = path => publishedRef
  ? execFileSync('git', ['show', `${publishedRef}:${path}`], { maxBuffer: 64 * 1024 * 1024 })
  : execFileSync('git', ['cat-file', 'blob', `:${path}`], { maxBuffer: 64 * 1024 * 1024 });
const sha = buf => createHash('sha256').update(buf).digest('hex');
const inventory = files.map(p => `${sha(blob(p))}  ../../${p}\n`).join('');
if (mode === '--check') {
  assert.equal(readFileSync(`${dir}/SOURCE_SHA256SUMS.txt`, 'utf8'), inventory, 'source inventory is incomplete, changed, or contains unexpected paths');
  console.log(`Source integrity PASS: ${files.length} exact tracked artifacts (${publishedRef ?? 'prepared index'})`);
} else {
  writeFileSync(`${dir}/SOURCE_SHA256SUMS.txt`, inventory);
  const packageFiles = readdirSync(dir).filter(p => p !== 'SHA256SUMS.txt').sort();
  writeFileSync(`${dir}/SHA256SUMS.txt`, packageFiles.map(p => `${sha(readFileSync(`${dir}/${p}`))}  ${p}\n`).join(''));
  console.log(`Generated digests for ${files.length} source artifacts and ${packageFiles.length} package files`);
}
