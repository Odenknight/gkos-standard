import { readFileSync, realpathSync, lstatSync } from 'node:fs';
import { resolve, relative, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { isDeepStrictEqual } from 'node:util';
import Ajv2020 from 'ajv/dist/2020.js';
import YAML from 'yaml';

export const STANDARD_ROOT = fileURLToPath(new URL('../../../../', import.meta.url));
export const FIXTURE_ROOT = resolve(STANDARD_ROOT, 'fixtures/provisional/eu-ai-evidence/p1');
export const SPEC_PATH = resolve(STANDARD_ROOT, 'docs/eu-ai-evidence/specs/01-valid-dossier-and-revisions.md');
export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
export const sorted = values => [...values].sort();
export const equal = isDeepStrictEqual;

export function containedPath(root, path) {
  if (typeof path !== 'string' || !path || path.includes('\\') || path.includes(':')
      || path.split('/').some(p => !p || p === '.' || p === '..') || isAbsolute(path)) {
    throw new Error(`Invalid fixture path: ${path}`);
  }
  const candidate = resolve(root, path);
  const rel = relative(realpathSync(root), realpathSync(candidate));
  if (rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel) || lstatSync(candidate).isSymbolicLink()) {
    throw new Error(`Fixture path escapes its source root: ${path}`);
  }
  return candidate;
}

export function loadFixture(root = FIXTURE_ROOT) {
  const manifestBytes = readFileSync(resolve(root, 'manifest.json'));
  const manifest = JSON.parse(manifestBytes.toString('utf8'));
  const records = [], errors = [];
  if (manifest.fixture_version !== '1.0.0' || !Array.isArray(manifest.records)
      || manifest.records.length !== 5) throw new Error('Unsupported or incomplete P1 fixture manifest');
  const ajv = new Ajv2020({ strict: false, allErrors: true });
  for (const name of ['gkx-common.defs.json', 'gkx-frontmatter-2.0.schema.json']) {
    const schema = JSON.parse(readFileSync(resolve(STANDARD_ROOT, 'schemas', name), 'utf8'));
    ajv.addSchema(schema, name);
  }
  const validate = ajv.getSchema('gkx-frontmatter-2.0.schema.json');
  const seen = { path: new Set(), uid: new Set(), alias: new Set() };
  for (const expected of manifest.records) {
    for (const key of Object.keys(seen)) {
      if (!expected[key] || seen[key].has(expected[key])) errors.push(`${key} is missing or duplicated: ${expected[key]}`);
      seen[key].add(expected[key]);
    }
    try {
      const bytes = readFileSync(containedPath(root, expected.path));
      const content = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      const match = /^---\n([\s\S]*?)\n---(?:\n|$)/u.exec(content);
      if (!match) throw new Error('Expected LF-delimited Markdown frontmatter');
      const document = YAML.parseDocument(match[1]);
      if (document.errors.length) throw new Error(document.errors.map(e => e.message).join('; '));
      const data = document.toJS();
      const fileErrors = [];
      if (!validate(data)) fileErrors.push(...validate.errors.map(e => `schema ${e.instancePath}: ${e.message}`));
      if (sha256(bytes) !== expected.sha256) fileErrors.push('raw-byte SHA-256 differs from the frozen inventory');
      if (!/^[a-f0-9]{64}$/u.test(expected.sha256) || expected.required !== true) fileErrors.push('invalid required inventory entry');
      if (data.uid !== expected.uid || data.title !== expected.title) fileErrors.push('identity/title differs from expectation');
      if (!equal(data.x_eu_ai_demo, expected.metadata)) fileErrors.push('fixture-local metadata differs from expectation');
      if (data.timestamp !== expected.timestamp || data.created_at !== expected.timestamp
          || data.updated_at !== expected.timestamp) fileErrors.push('scenario timestamps differ from expectation');
      if (data.type !== 'semantic' || data.epistemic_state !== 'reported'
          || data.sensitivity !== 'public' || data.authorship_origin !== 'authored') fileErrors.push('unexpected authored baseline state');
      for (const type of ['documents', 'cites', 'supersedes', 'superseded_by']) {
        const targets = manifest.relationships.filter(e => e.source_uid === expected.uid && e.type === type).map(e => e.target_uid);
        if (!equal(sorted(data[type] ?? []), sorted(targets))) fileErrors.push(`authored ${type} differs from the fixed relationship expectation`);
      }
      errors.push(...fileErrors.map(e => `${expected.path}: ${e}`));
      records.push({
        expected, data, content, sha256: sha256(bytes), byte_count: bytes.length,
        source: { relativePath: expected.path, content, createdTime: Date.parse(data.created_at), modifiedTime: Date.parse(data.updated_at) },
      });
    } catch (error) { errors.push(`${expected.path}: ${error.message}`); }
  }
  for (const [name, members] of Object.entries(manifest.snapshots ?? {})) {
    if (!Array.isArray(members) || new Set(members).size !== members.length
        || members.some(a => !seen.alias.has(a))) errors.push(`Invalid snapshot membership: ${name}`);
  }
  if (!equal(manifest.snapshots, { A: ['S', 'D1', 'E'], B: ['S', 'D1', 'D2', 'E', 'R'] })) errors.push('P1 snapshot membership differs from the specification');
  if (!Number.isFinite(Date.parse(manifest.now))) errors.push('Invalid fixed scenario time');
  return { root, manifest, manifest_sha256: sha256(manifestBytes), records, errors };
}

export function snapshotRecords(fixture, name) {
  return fixture.manifest.snapshots[name].map(alias => {
    const record = fixture.records.find(r => r.expected.alias === alias);
    if (!record) throw new Error(`Unavailable fixture record ${alias}`);
    return { ...record.source };
  });
}

export function sourceBindings(fixture) {
  return fixture.records.map(r => ({ uid: r.data.uid, path: r.expected.path, sha256: r.sha256, byte_count: r.byte_count }));
}

export function rereadBindings(fixture) {
  return fixture.records.map(r => {
    const bytes = readFileSync(containedPath(fixture.root, r.expected.path));
    return { uid: r.data.uid, path: r.expected.path, sha256: sha256(bytes), byte_count: bytes.length };
  });
}
