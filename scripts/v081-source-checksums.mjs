import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const [mode, dir] = process.argv.slice(2);
assert.ok(['--generate', '--check'].includes(mode));
assert.match(dir, /^releases\/\d{4}-\d{2}-\d{2}-v0\.81$/);
let publishedRef;
if (mode === '--check') {
  try {
    publishedRef = execFileSync('git', ['rev-parse', '--verify', 'refs/tags/v0.81^{}'], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch { /* Before publication, verify the prepared checkout. */ }
}
if (publishedRef && process.env.EXPECTED_TAG_TARGET) assert.equal(publishedRef, process.env.EXPECTED_TAG_TARGET);
const tracked = execFileSync('git', publishedRef ? ['ls-tree', '-r', '--name-only', '-z', publishedRef] : ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const files = [...new Set(tracked)].filter(p => !p.startsWith(`${dir}/`)).sort();
for (const p of ['README.md', 'CHANGELOG.md', 'CITATION.cff', '.zenodo.json', 'GOVERNANCE.md',
  'standard/00_GKOS_Master_Standard.md', 'requirements/REGISTRY.md',
  'requirements/PROFILE_APPLICABILITY.json', 'requirements/DIAGNOSTIC_CODES.json',
  'conformance/runner/package-lock.json', 'scripts/check-v081-published-release.sh',
  'scripts/verify-v081-attestation.mjs', '.github/workflows/v081-post-tag-verification.yml']) {
  assert.ok(files.includes(p), `missing required source: ${p}`);
}
const hash = path => createHash('sha256').update(publishedRef
  ? execFileSync('git', ['show', `${publishedRef}:${path}`], { maxBuffer: 32 * 1024 * 1024 })
  : readFileSync(path)).digest('hex');
const inventory = files.map(p => `${hash(p)}  ../../${p}\n`).join('');
if (mode === '--check') {
  assert.equal(readFileSync(`${dir}/SOURCE_SHA256SUMS.txt`, 'utf8'), inventory, 'source inventory is incomplete, changed, or contains unexpected paths');
  console.log(`Source integrity PASS: ${files.length} exact tracked artifacts (${publishedRef ?? 'prepared checkout'})`);
} else {
  writeFileSync(`${dir}/SOURCE_SHA256SUMS.txt`, inventory);
  const packageFiles = readdirSync(dir).filter(p => p !== 'SHA256SUMS.txt').sort();
  const packageInventory = packageFiles.map(p => `${hash(`${dir}/${p}`)}  ${p}\n`).join('');
  writeFileSync(`${dir}/SHA256SUMS.txt`, packageInventory);
  console.log(`Generated digests for ${files.length} source artifacts and ${packageFiles.length} package files`);
}
