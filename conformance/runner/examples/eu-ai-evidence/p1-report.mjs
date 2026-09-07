import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { platform, release, arch } from 'node:os';
import { fileURLToPath } from 'node:url';
import { sha256, STANDARD_ROOT, SPEC_PATH } from './p1-fixture.mjs';

export const LIMITATIONS = [
  'Self-evaluation authored and executed with Codex agent assistance; no independent human review or independent rerun has occurred.',
  'The five dossier records are fictional test inputs; their evaluation and review prose is not actual AI validation or independent review evidence.',
  'Only P1.1 valid dossier/revision behavior is evaluated. P1.2 fault/retrieval exercises and P1.3 package verification remain unimplemented.',
  'Standard checks and example selection are not Engine-enforced application policy. Host file access and hashes do not demonstrate Engine persistence, archival retention, or authenticity.',
  'A passing assertion supports only its stated scenario and component. No full P1 completion, legal compliance, certification, GKOS qualification, or independent validation is claimed.',
];

function git(root, ...args) {
  return execFileSync('git', ['-c', `safe.directory=${root}`, '-C', root, ...args], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }).trim();
}

function binding(root, path) {
  const bytes = readFileSync(resolve(root, path));
  return { path: path.replaceAll('\\', '/'), sha256: sha256(bytes), byte_count: bytes.length };
}

function repository(root, additional = []) {
  const tracked = git(root, 'ls-files', '-z').split('\0').filter(Boolean);
  const paths = [...new Set([...tracked, ...additional])].sort();
  return {
    root, commit: git(root, 'rev-parse', 'HEAD'), branch: git(root, 'branch', '--show-current'),
    worktree_status: git(root, 'status', '--porcelain=v1').split('\n').filter(Boolean),
    files: paths.map(path => existsSync(resolve(root, path)) && statSync(resolve(root, path)).isFile()
      ? binding(root, path) : { path, unavailable: true }),
  };
}

export function captureCoordinates(observerPath, fixture) {
  const observerRoot = observerPath ? resolve(dirname(observerPath), '../..') : null;
  let engine = null, engineError = null;
  try {
    if (!observerRoot) throw new Error('No observer path supplied');
    engine = repository(observerRoot, [
      relative(observerRoot, observerPath), 'test/eu-ai-p1-observer.test.mjs', 'dist/gkos-engine.mjs',
    ]);
    const pkg = JSON.parse(readFileSync(resolve(observerRoot, 'package.json'), 'utf8'));
    engine.package_identity = { name: pkg.name, version: pkg.version };
  } catch (error) { engineError = error.message; }
  const here = dirname(fileURLToPath(import.meta.url));
  const modules = ['p1-fixture.mjs', 'p1-evaluate.mjs', 'p1-report.mjs', 'p1-run.mjs', 'p1-valid-dossier.test.mjs', 'p1-harness.test.mjs'];
  const additional = [relative(STANDARD_ROOT, SPEC_PATH), relative(STANDARD_ROOT, resolve(fixture.root, 'manifest.json')),
    ...fixture.manifest.records.map(r => relative(STANDARD_ROOT, resolve(fixture.root, r.path))),
    ...modules.map(m => relative(STANDARD_ROOT, resolve(here, m)))];
  const standard = repository(STANDARD_ROOT, additional);
  return {
    standard, engine, engine_error: engineError,
    fixture: { id: fixture.manifest.fixture_id, version: fixture.manifest.fixture_version, manifest_sha256: fixture.manifest_sha256 },
    runtime: { node: process.version, npm: execFileSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['--version'], { encoding: 'utf8', shell: process.platform === 'win32' }).trim(),
      os: platform(), release: release(), architecture: arch(), executable: process.execPath,
      exec_argv: process.execArgv, node_options: process.env.NODE_OPTIONS ?? null },
    invocation: {
      cwd: process.cwd(), command: 'node --test conformance/runner/examples/eu-ai-evidence/p1-valid-dossier.test.mjs',
      test_process_argv: process.argv,
      configuration: { GKOS_P1_ENGINE_OBSERVER: observerPath ?? null, GKOS_P1_OUT: process.env.GKOS_P1_OUT ?? null },
    },
    authorship: { test_author: 'Codex agent acting for mariusTalpos', executor: 'Codex-assisted local execution or the operator invoking this command',
      review_status: 'not independently reviewed', independent_rerun: false },
  };
}

const textCell = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
const json = value => JSON.stringify(value, null, 2) + '\n';

export function writeEvidence(out, payload) {
  const observationBytes = json(payload.observations);
  writeFileSync(resolve(out, 'observations.json'), observationBytes, { encoding: 'utf8', flag: 'wx' });
  const specBytes = readFileSync(SPEC_PATH);
  writeFileSync(resolve(out, 'specification.md'), specBytes, { flag: 'wx' });
  payload.results.evidence_bindings = {
    observations: { path: 'observations.json', sha256: sha256(Buffer.from(observationBytes)) },
    specification: { path: 'specification.md', sha256: sha256(specBytes) },
  };
  const resultBytes = json(payload.results);
  writeFileSync(resolve(out, 'results.json'), resultBytes, { encoding: 'utf8', flag: 'wx' });
  const lines = [
    '# P1.1 valid dossier and revisions — execution report', '',
    `**Assertion summary: ${payload.results.status}.** ${payload.results.checks.filter(c => c.status === 'PASS').length}/${payload.results.checks.length} acceptance checks passed.`, '',
    '**Standing:** Self-evaluation using the unchanged Engine, not independent validation. P1.1 awaits owner review; P1 as a whole is not complete.', '',
    `Generated: ${payload.results.generated_at}. Scenario clock: ${payload.results.scenario_time}.`, '',
    '## Scenario outcomes', '',
    '| Scenario | Observed outcome |', '| --- | --- |',
    ...payload.results.scenarios.map(s => `| ${textCell(s.name)} | ${textCell(s.outcome)} |`), '',
    '## Assertion results', '',
    '| Check | Component evaluated | Result | Evidence |', '| --- | --- | --- | --- |',
    ...payload.results.checks.map(c => `| ${c.id}: ${textCell(c.title)} | ${textCell(c.evaluated_component)} | ${c.status} | [Record](results.json) / [observations](observations.json) |`), '',
  ];
  for (const c of payload.results.checks) {
    lines.push(`### ${c.id} — ${c.title}`, '', `**${c.status}:** ${c.explanation}`, '',
      `Basis: specification acceptance check ${c.id}. Evaluated component: ${c.evaluated_component}.`, '',
      'Expected:', '', '```json', JSON.stringify(c.expected, null, 2), '```', '',
      'Observed:', '', '```json', JSON.stringify(c.observed, null, 2), '```', '',
      `Evidence locations: ${c.evidence.map(e => '`' + e + '`').join(', ')}.`, '',
      `Permitted finding: ${c.permitted_claim}`, '');
  }
  lines.push('## Responsibility and limits', '',
    '### Standard-reference checks', '',
    'The Standard example validates source metadata against the existing schema and compares Engine observations with the frozen fixture expectations. This is not an independent implementation of GKOS.', '',
    '### Engine observations', '',
    'The saved graphs retain actual UID mappings, relationships, lineage, state, and diagnostics returned by the public Engine buildGraph function. Engine assessment scores or capability labels in that raw output are not acceptance verdicts.', '',
    '### Host and example behavior', '',
    'File reads, raw-byte SHA-256, explicit snapshot assembly, current/historical selection, and report writing are supplied by the host/example. Original-record preservation means the host-provided fixture bytes were unchanged.', '',
    ...LIMITATIONS.map(l => `- ${l}`), '',
    '## Reproduction and source identity', '',
    'Standard commit: ' + (payload.results.coordinates?.standard?.commit ?? 'unavailable') + '.', '',
    'Engine commit: ' + (payload.results.coordinates?.engine?.commit ?? 'unavailable') + '.', '',
    'The machine report records dirty-worktree state, content bindings for the tracked sources and added test code, built Engine bundle, fixture, schemas, lockfiles, and runtime. A dirty commit is not represented as an exact source snapshot by commit alone.', '',
    'Results SHA-256 (raw UTF-8 bytes): ' + sha256(Buffer.from(resultBytes)) + '.', '',
    'The observations and specification hashes are recorded in results.json. Matching hashes demonstrates consistency with these captured bytes; it does not prove authenticity or independent review.', '',
    'The test process exit is recorded in process.json by the test entry point. Keep the external test-runner output alongside this directory for verification.', '',
    'See the Working invocation section of the specification for the environment variables and command. Select a fresh output directory for each run.', '',
  );
  writeFileSync(resolve(out, 'report.md'), lines.join('\n'), { encoding: 'utf8', flag: 'wx' });
}
