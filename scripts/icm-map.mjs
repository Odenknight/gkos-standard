#!/usr/bin/env node
// ICM organization map for gkos-standard.
//
// Classifies every tracked (and untracked, not ignored) file: area, standing,
// frozen flag, current-edition references, stale-edition candidates,
// "pre-standard" occurrences, GRAPHIC-NEEDED earmarks and last commit date.
//
//   node scripts/icm-map.mjs           write docs/icm/map/repo-map.json and REPO-MAP.md
//   node scripts/icm-map.mjs --check   exit 1 if those files are out of date
//
// Dependency-free (Node standard library and git). Read-only except for the two
// output files. The rules below are informative tooling; they grant no
// authority and do not decide a document's standing. Where no rule resolves a
// file, it is reported as "unclassified".

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SELF = 'scripts/icm-map.mjs';
const MAP_DIR = 'docs/icm/map';
const OUT_JSON = `${MAP_DIR}/repo-map.json`;
const OUT_MD = `${MAP_DIR}/REPO-MAP.md`;
const AREAS_DIR = `${MAP_DIR}/areas`;
const NOT_SCANNED = new Set([SELF, OUT_JSON, OUT_MD]);

const STANDINGS = ['normative', 'informative', 'proposed', 'decision', 'historical',
  'release', 'generated', 'process', 'asset', 'unclassified'];
const FROZEN = ['requirements/', 'schemas/', 'fixtures/', 'conformance/runner/', 'standard/annexes/'];
const BINARY_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.pdf', '.cbor', '.ico', '.zip']);
const ASSET_EXT = new Set([...BINARY_EXT, '.svg', '.mmd']);

// ---------- git and file helpers ----------

function git(args) {
  return execFileSync('git', ['-c', 'core.quotepath=false', ...args], {
    cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024,
  });
}

function listFiles() {
  const out = git(['ls-files', '-z', '--cached', '--others', '--exclude-standard']);
  const set = new Set(out.split('\0').filter(Boolean));
  set.add(OUT_JSON);
  set.add(OUT_MD);
  return [...set].filter((f) => f === OUT_JSON || f === OUT_MD || existsSync(path.join(ROOT, f))).sort();
}

function lastCommitDates() {
  const dates = new Map();
  let out = '';
  try {
    out = git(['log', '--format=@@%cs', '--name-only', '--no-renames']);
  } catch {
    return dates;
  }
  let current = null;
  for (const line of out.split('\n')) {
    if (line.startsWith('@@')) current = line.slice(2);
    else if (line && current && !dates.has(line)) dates.set(line, current);
  }
  return dates;
}

function readText(rel) {
  if (BINARY_EXT.has(path.extname(rel).toLowerCase())) return null;
  const p = path.join(ROOT, rel);
  if (!existsSync(p)) return null;
  const buf = readFileSync(p);
  if (buf.subarray(0, 8000).includes(0)) return null;
  return buf.toString('utf8').replace(/\r\n/g, '\n');
}

function currentEdition() {
  const cff = readText('CITATION.cff') || '';
  const version = (cff.match(/^version:\s*"?([^"\s]+)"?/m) || [])[1] || null;
  const date = (cff.match(/^date-released:\s*"?(\d{4}-\d{2}-\d{2})"?/m) || [])[1] || null;
  return { version, date, coordinate: version && date ? `GKOS-${date} v${version}` : null };
}

function normativeAnnexes(edition) {
  // Normative annexes named by the release manifest of the current edition
  // (the manifest whose version equals CITATION.cff's version). Older
  // manifests also say current-release: true; they describe their own time.
  const set = new Set();
  let dirs = [];
  try { dirs = readdirSync(path.join(ROOT, 'releases')); } catch { return set; }
  for (const d of dirs.sort()) {
    const m = readText(`releases/${d}/RELEASE_MANIFEST.yml`);
    if (!m || !edition.version) continue;
    const v = (m.match(/^version:\s*"?([^"\s]+)"?/m) || [])[1];
    if (v !== edition.version) continue;
    const block = m.match(/^normative-annexes:\n((?:\s+-\s+.+\n?)+)/m);
    if (block) for (const l of block[1].split('\n')) {
      const x = l.replace(/^\s+-\s+/, '').trim();
      if (x) set.add(x);
    }
  }
  return set;
}

// ---------- area and tracker ----------

function areaOf(f) {
  const parts = f.split('/');
  if (parts.length === 1) return { area: 'root', subarea: '', tracker: 'root' };
  const top = parts[0];
  const sub = parts.length > 2 ? parts[1] : '';
  if (top === 'LICENSES') return { area: top, subarea: sub, tracker: 'root' };
  if (top === '.github') return { area: top, subarea: sub, tracker: 'github' };
  if (top === 'docs') return { area: top, subarea: sub, tracker: sub ? `docs-${sub}` : 'docs' };
  return { area: top, subarea: sub, tracker: top };
}

function trackerFolder(t) {
  if (t === 'root') return null;
  if (t === 'github') return '.github';
  if (t === 'docs') return 'docs';
  if (t.startsWith('docs-')) return `docs/${t.slice(5)}`;
  return t;
}

// ---------- status lines ----------

const KEYWORDS = [
  ['historical', /\b(historical|superseded|withdrawn)\b/i],
  ['proposed', /\b(proposed|proposal|provisional|prepared-not-executed)\b/i],
  ['informative', /\b(informative|non-normative|advisory|orientation|explanation|guidance)\b/i],
  ['decision', /\b(owner-approved|owner-authorized|accepted development(al)? decision|developmental adoption|accepted reconciliation record)\b/i],
];

function statusText(text) {
  if (!text) return null;
  const lines = text.split('\n').slice(0, 40);
  for (const l of lines) {
    const m = l.match(/^\s*(?:[-*>]\s*)*\**\s*(?:status|standing)\s*\**\s*[:.]\s*\**\s*(.+)$/i);
    if (m) return m[1];
  }
  // Otherwise: a line between the H1 and the first H2 that opens with a standing word.
  let seenH1 = false;
  for (const l of lines) {
    if (/^#\s/.test(l)) { seenH1 = true; continue; }
    if (!seenH1) continue;
    if (/^#{2,}\s/.test(l)) break;
    const s = l.replace(/^[>*\s]+/, '');
    if (/^(informative|historical|proposed|superseded)\b/i.test(s)) return s;
  }
  return null;
}

function firstClause(s) {
  // Only the first clause of a status line decides; later clauses often say
  // what the document is not, or mention historical names.
  return s ? s.split(/[;.](?:\s|$)|\s[—–]\s/)[0] : s;
}

function h1(text) {
  const m = text && text.match(/^#\s+(.+)$/m);
  return m ? m[1] : '';
}

function keywordStanding(s) {
  if (!s) return null;
  let best = null;
  for (const [standing, re] of KEYWORDS) {
    const m = s.match(re);
    if (m && (best === null || m.index < best.index)) best = { standing, index: m.index };
  }
  return best ? best.standing : null;
}

// ---------- standing rules (ordered; first match wins) ----------

const ROOT_INFORMATIVE = new Set(['README.md', 'TECHNICAL_README.md', 'ROADMAP.md', 'ZENODO.md']);
const ROOT_PROCESS = new Set(['GOVERNANCE.md', 'CONTRIBUTING.md', 'SECURITY.md', 'CODE_OF_CONDUCT.md',
  'LICENSE.md', 'NOTICE.md', 'TRADEMARKS.md', 'THIRD-PARTY-NOTICES.md', 'ACKNOWLEDGMENTS.md',
  'CHANGELOG.md', 'VERSIONING.md', 'CITATION.cff', '.zenodo.json']);
const GENERATED = new Map([
  [OUT_JSON, SELF],
  [OUT_MD, SELF],
  ['docs/GKOS_ISO42001_NIST_AIRMF_CROSSWALK.md', 'scripts/xw002/gen.py'],
  ['docs/ecosystem/EXTERNAL_CROSSWALK.json', 'scripts/xw002/gen.py'],
]);
const FOLDER_DEFAULT = new Map([
  ['docs/domains/', ['informative', 'docs/domains/README.md']],
  ['docs/ecosystem/', ['informative', 'docs/ecosystem/README.md']],
  ['docs/implementation/', ['informative', 'docs/implementation/README.md']],
]);

// Each rule: [id, source, fn(file, ctx) -> standing | null]
const RULES = [
  ['generated-output', 'named generator script', (f) => (GENERATED.has(f) ? 'generated' : null)],
  ['archive-folder', 'docs/CORPUS-STATUS.md (preserve historical sources)', (f) => (/(^|\/)archive\//.test(f) ? 'historical' : null)],
  ['release-package', 'releases/ and release-candidates/ are immutable', (f) => (/^(releases|release-candidates)\//.test(f) ? 'release' : null)],
  ['release-record', 'publication and release-control records under docs/releases/', (f) => (f.startsWith('docs/releases/') ? 'release' : null)],
  ['icm-layout', 'docs/icm/CONTEXT.md', (f) => (f.startsWith('docs/icm/') ? 'process' : null)],
  ['repo-machinery', 'CI, configuration and scripts', (f) => (f.startsWith('.github/') || f.startsWith('scripts/') || f.startsWith('conformance/runner/')
    || (!f.includes('/') && f.startsWith('.')) || /\.build\.py$/.test(f) || f === 'graphics/diagrams/mermaid-config.json' ? 'process' : null)],
  ['root-process', 'project policy, licensing and edition metadata', (f) => (ROOT_PROCESS.has(f) || f.startsWith('LICENSES/') ? 'process' : null)],
  ['root-informative', 'orientation documents', (f) => (ROOT_INFORMATIVE.has(f) ? 'informative' : null)],
  ['asset', 'images, diagram sources and binary evidence', (f) => (ASSET_EXT.has(path.extname(f).toLowerCase())
    || /^(graphics|illustrated)\//.test(f) && !f.endsWith('.md') ? 'asset' : null)],
  ['superseded-status', 'status line says superseded', (f, c) => (/\bsuperseded\b/i.test(c.status || '') && /^\**\s*superseded/i.test((c.status || '').trim()) ? 'historical' : null)],
  ['decision-folder', 'decisions/, docs/decisions/, docs/directives/', (f) => (/^(decisions|docs\/decisions|docs\/directives)\//.test(f) ? 'decision' : null)],
  ['normative-surface', 'standard/00_GKOS_Master_Standard.md "Normative surface"; current release manifest normative-annexes', (f, c) => (
    f === 'standard/00_GKOS_Master_Standard.md' || f.startsWith('requirements/') || c.annexes.has(f) ? 'normative' : null)],
  ['annex-status', 'annex status line', (f, c) => {
    if (!f.startsWith('standard/annexes/')) return null;
    if (/^normative\b/i.test((c.status || '').trim())) return 'normative';
    if (/\(informative\)/i.test(c.h1)) return 'informative';
    return keywordStanding(c.status) || 'unclassified';
  }],
  ['provisional-folder', 'schemas/README.md, fixtures/README.md, conformance/README.md (provisional, non-qualifying)', (f) => (
    /^(schemas\/provisional|fixtures\/provisional|conformance\/provisional-requirements)\//.test(f) ? 'proposed' : null)],
  ['active-schema', 'schemas/README.md (R16 semantic data model)', (f) => (/^schemas\/[^/]+\.json$/.test(f) ? 'normative' : null)],
  ['fixture-data', 'fixtures/README.md (executable test catalogs; non-qualifying)', (f) => (f.startsWith('fixtures/') && !/README\.md$/.test(f) ? 'process' : null)],
  ['claims-policy', 'conformance/CLAIMS_POLICY.md status line (owner-authorized clarification)', (f) => (f === 'conformance/CLAIMS_POLICY.md' ? 'decision' : null)],
  ['informative-folder', 'folder README declares informative', (f) => (
    /^(examples|conformance\/adapters|conformance\/evidence)\//.test(f) || /^(graphics|illustrated|fixtures|schemas|conformance)\/(.+\/)?README\.md$/.test(f)
      || f === 'conformance/README.md' ? 'informative' : null)],
  ['dated-review', 'dated review and disposition records are kept as written', (f) => (
    f.startsWith('docs/reviews/') && /(\d{4}-\d{2}-\d{2}|\d{8})/.test(path.basename(f)) ? 'historical' : null)],
  ['proposals-folder', 'docs/proposals/ holds proposals', (f) => (f.startsWith('docs/proposals/') ? 'proposed' : null)],
  ['historical-title', 'H1 names the document historical', (f, c) => (/\bhistorical\b/i.test(c.h1) ? 'historical' : null)],
  ['status-line', 'document status or standing line', (f, c) => keywordStanding(c.status)],
  ['folder-default', 'folder README declares informative', (f) => {
    for (const [prefix, [standing]] of FOLDER_DEFAULT) if (f.startsWith(prefix)) return standing;
    return null;
  }],
];

function classify(f, text, annexes) {
  const ctx = { status: firstClause(statusText(text)), h1: h1(text), annexes };
  for (const [id, , fn] of RULES) {
    const s = fn(f, ctx);
    if (s) return { standing: s, rule: id };
  }
  return { standing: 'unclassified', rule: 'none' };
}

// ---------- content scans ----------

const PRE_STANDARD = /\bpre-?standard\b/gi;
const D2_WORDING = /single-author pre-standard concept|advance it to a pre-standard/i;
const EARMARK = /<!--\s*GRAPHIC-NEEDED:\s*(GN-\d{3})\s+(.+?)\s*-->/;

function historicalLines(f, lines) {
  // Lines inside "Historical"/"History" sections, and released CHANGELOG sections.
  const out = new Set();
  let level = 0;
  let fence = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^\s*(```|~~~)/.test(l)) fence = !fence;
    const m = !fence && l.match(/^(#{1,6})\s+(.*)$/);
    if (m) {
      const lv = m[1].length;
      if (level && lv <= level) level = 0;
      const released = f === 'CHANGELOG.md' && lv === 2 && !/^unreleased\b/i.test(m[2]);
      if (!level && (released || /^(historical|history)\b/i.test(m[2]))) level = lv;
    }
    if (level) out.add(i + 1);
  }
  return out;
}

function scan(f, text, standing, edition) {
  const res = { current_edition_refs: 0, stale_edition_candidates: [], pre_standard: [], graphic_needed: [], malformed_earmarks: [] };
  if (text === null || NOT_SCANNED.has(f)) return res;
  const lines = text.split('\n');
  const histFile = ['historical', 'release', 'decision'].includes(standing);
  const staleEligible = !['historical', 'release', 'decision', 'generated', 'asset'].includes(standing);
  const hist = historicalLines(f, lines);
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const curVer = edition.version ? new RegExp(`(?<![\\d.])v?${esc(edition.version)}(?![\\d])`, 'g') : null;
  const curDate = edition.date ? new RegExp(`GKOS-${esc(edition.date)}`, 'g') : null;
  let fence = false;
  lines.forEach((line, idx) => {
    const n = idx + 1;
    if (curVer) res.current_edition_refs += (line.match(curVer) || []).length;
    if (curDate) res.current_edition_refs += (line.match(curDate) || []).length;
    if (staleEligible && !hist.has(n)) {
      // GKOS editions start at v0.75; lower v0.N tokens name other artifacts
      // (catalogs, engines, packages) and are not edition candidates.
      for (const m of line.matchAll(/(?<![\w.])v(0\.(\d+)(?:\.\d+)?)(?![\w])/g)) {
        if (Number(m[2]) >= 75 && m[1] !== edition.version) res.stale_edition_candidates.push({ line: n, token: m[0] });
      }
      for (const m of line.matchAll(/\bGKOS-(\d{4}-\d{2}-\d{2})\b/g)) {
        if (m[1] !== edition.date) res.stale_edition_candidates.push({ line: n, token: m[0] });
      }
    }
    const ps = (line.match(PRE_STANDARD) || []).length;
    if (ps) {
      res.pre_standard.push({
        line: n,
        count: ps,
        class: histFile || hist.has(n) ? 'historical' : 'current-facing',
        d2_wording: D2_WORDING.test(line),
      });
    }
    if (/^\s*(```|~~~)/.test(line)) fence = !fence;
    if (!fence) {
      const bare = line.replace(/`[^`]*`/g, '');
      if (bare.includes('GRAPHIC-NEEDED')) {
        const m = bare.match(EARMARK);
        if (m) res.graphic_needed.push({ line: n, id: m[1], description: m[2] });
        else if (bare.includes('<!--')) res.malformed_earmarks.push(n);
      }
    }
  });
  return res;
}

// ---------- build ----------

function build() {
  const edition = currentEdition();
  const annexes = normativeAnnexes(edition);
  const dates = lastCommitDates();
  const files = listFiles().map((f) => {
    const text = NOT_SCANNED.has(f) ? null : readText(f);
    const { area, subarea, tracker } = areaOf(f);
    const { standing, rule } = classify(f, text, annexes);
    return {
      path: f,
      area,
      subarea,
      tracker,
      standing,
      standing_rule: rule,
      frozen: FROZEN.some((p) => f.startsWith(p)),
      last_commit: dates.get(f) || null,
      ...scan(f, text, standing, edition),
    };
  });
  let trackerFiles = [];
  try { trackerFiles = readdirSync(path.join(ROOT, AREAS_DIR)).filter((n) => n.endsWith('.md')).map((n) => n.slice(0, -3)); } catch { /* none yet */ }
  const trackerIds = [...new Set([...files.map((x) => x.tracker), ...trackerFiles])].sort();
  const areas = trackerIds.map((t) => {
    const fs = files.filter((x) => x.tracker === t);
    const counts = Object.fromEntries(STANDINGS.map((s) => [s, fs.filter((x) => x.standing === s).length]));
    return {
      tracker: t,
      tracker_path: `${AREAS_DIR}/${t}.md`,
      tracker_exists: trackerFiles.includes(t),
      folder: trackerFolder(t),
      files: fs.length,
      standing: counts,
      frozen: fs.filter((x) => x.frozen).length,
      current_edition_refs: fs.reduce((a, x) => a + x.current_edition_refs, 0),
      stale_edition_candidates: fs.reduce((a, x) => a + x.stale_edition_candidates.length, 0),
      pre_standard_current_facing: fs.reduce((a, x) => a + x.pre_standard.filter((p) => p.class === 'current-facing' && !p.d2_wording).length, 0),
      graphic_needed: fs.reduce((a, x) => a + x.graphic_needed.length, 0),
    };
  });
  const ruleCounts = RULES.map(([id, source]) => ({ id, source, files: files.filter((x) => x.standing_rule === id).length }));
  ruleCounts.push({ id: 'none', source: 'no rule matched', files: files.filter((x) => x.standing_rule === 'none').length });
  return { edition, annexes: [...annexes].sort(), files, areas, ruleCounts };
}

function renderJson(m) {
  const head = {
    schema_version: 1,
    generator: SELF,
    note: 'Generated file; do not edit by hand. Regenerate with: node scripts/icm-map.mjs. Informative; grants no authority.',
    current_edition: m.edition,
    standings: STANDINGS,
    frozen_paths: FROZEN,
    normative_annexes_from_manifest: m.annexes,
    rules: m.ruleCounts,
    areas: m.areas,
  };
  const body = JSON.stringify(head, null, 2).replace(/\n}$/, '');
  const filesJson = m.files.map((x) => `    ${JSON.stringify(x)}`).join(',\n');
  return `${body},\n  "files": [\n${filesJson}\n  ]\n}\n`;
}

const cell = (s) => String(s).replace(/\|/g, '\\|');
const link = (f) => `[${cell(f)}](../../../${f.split('/').map(encodeURIComponent).join('/')})`;

function renderMd(m) {
  const L = [];
  const total = m.files.length;
  const sum = (k) => m.areas.reduce((a, x) => a + x[k], 0);
  L.push('# Repository map', '');
  L.push('Generated by `scripts/icm-map.mjs`. Do not edit by hand; run `node scripts/icm-map.mjs` and commit the result.');
  L.push('Informative tooling output: it grants no authority and does not decide standing. The [map README](README.md) explains the fields and rules.', '');
  L.push(`- Current edition (from \`CITATION.cff\`): ${m.edition.coordinate || 'not found'}`);
  L.push(`- Files mapped: ${total} (tracked plus untracked files that are not ignored)`);
  L.push(`- Frozen-path files: ${sum('frozen')}`);
  L.push(`- Stale-edition candidates (outside historical, release, decision, generated and asset files and outside historical sections): ${sum('stale_edition_candidates')}`);
  L.push(`- Current-facing "pre-standard" occurrences without the D2 wording: ${sum('pre_standard_current_facing')}`);
  L.push(`- GRAPHIC-NEEDED earmarks: ${sum('graphic_needed')}`, '');

  L.push('## Standing totals', '', '| Standing | Files |', '| --- | ---: |');
  for (const s of STANDINGS) L.push(`| ${s} | ${m.files.filter((x) => x.standing === s).length} |`);
  L.push('');

  L.push('## Areas', '');
  L.push('Counts per area tracker. Columns: N normative, I informative, P proposed, D decision, H historical, R release, G generated, Pr process, A asset, U unclassified, Fz frozen, Stale stale-edition candidates, PS current-facing "pre-standard", GN earmarks.', '');
  L.push('| Area | Folder | Files | N | I | P | D | H | R | G | Pr | A | U | Fz | Stale | PS | GN |');
  L.push('| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |');
  for (const a of m.areas) {
    const tr = a.tracker_exists ? `[${a.tracker}](areas/${a.tracker}.md)` : `${a.tracker} (no tracker)`;
    const folder = a.folder === null ? 'repository root, `LICENSES/`' : (a.files ? `[${a.folder}/](../../../${a.folder}/)` : `\`${a.folder}/\` (planned)`);
    const s = a.standing;
    L.push(`| ${tr} | ${folder} | ${a.files} | ${s.normative} | ${s.informative} | ${s.proposed} | ${s.decision} | ${s.historical} | ${s.release} | ${s.generated} | ${s.process} | ${s.asset} | ${s.unclassified} | ${a.frozen} | ${a.stale_edition_candidates} | ${a.pre_standard_current_facing} | ${a.graphic_needed} |`);
  }
  L.push('');
  const missing = m.areas.filter((a) => !a.tracker_exists);
  if (missing.length) {
    L.push('Areas without a tracker file:', '');
    for (const a of missing) L.push(`- \`${a.tracker_path}\``);
    L.push('');
  }

  L.push('## Unclassified files', '');
  const unc = m.files.filter((x) => x.standing === 'unclassified');
  if (!unc.length) L.push('None.');
  for (const x of unc) L.push(`- ${link(x.path)}`);
  L.push('');

  L.push('## Retired maturity wording (current-facing)', '');
  L.push('Lines that use "pre-standard" outside historical, release and decision files and outside historical sections. Lines that carry the D2 sentence (which keeps the term as history) are listed separately.', '');
  const ps = m.files.filter((x) => x.pre_standard.some((p) => p.class === 'current-facing'));
  if (!ps.length) L.push('None.');
  if (ps.length) {
    L.push('| File | Lines | D2 wording lines |', '| --- | --- | --- |');
    for (const x of ps) {
      const cf = x.pre_standard.filter((p) => p.class === 'current-facing');
      const plain = [...new Set(cf.filter((p) => !p.d2_wording).map((p) => p.line))].join(', ') || '-';
      const d2 = [...new Set(cf.filter((p) => p.d2_wording).map((p) => p.line))].join(', ') || '-';
      L.push(`| ${link(x.path)} | ${plain} | ${d2} |`);
    }
  }
  L.push('');

  L.push('## Stale-edition candidates', '');
  L.push(`Edition tokens other than the current edition (${m.edition.coordinate || 'unknown'}) in current-facing files. A candidate is not an error: a baseline statement such as "normative population unchanged from v0.81" is correct. Review each line in context.`, '');
  const st = m.files.filter((x) => x.stale_edition_candidates.length);
  if (!st.length) L.push('None.');
  if (st.length) {
    L.push('| File | Standing | Count | Lines (first 12) |', '| --- | --- | ---: | --- |');
    for (const x of st) {
      const ls = [...new Set(x.stale_edition_candidates.map((c) => c.line))];
      L.push(`| ${link(x.path)} | ${x.standing} | ${x.stale_edition_candidates.length} | ${ls.slice(0, 12).join(', ')}${ls.length > 12 ? ', ...' : ''} |`);
    }
  }
  L.push('');

  L.push('## GRAPHIC-NEEDED earmarks', '');
  const gn = m.files.flatMap((x) => x.graphic_needed.map((g) => ({ ...g, path: x.path })));
  if (!gn.length) L.push('None.');
  if (gn.length) {
    L.push('| ID | File | Line | Description |', '| --- | --- | ---: | --- |');
    for (const g of gn.sort((a, b) => a.id.localeCompare(b.id) || a.path.localeCompare(b.path))) L.push(`| ${g.id} | ${link(g.path)} | ${g.line} | ${cell(g.description)} |`);
  }
  const bad = m.files.filter((x) => x.malformed_earmarks.length);
  if (bad.length) {
    L.push('', 'Malformed earmarks (an HTML comment names GRAPHIC-NEEDED but does not match the exact form):', '');
    for (const x of bad) L.push(`- ${link(x.path)}: lines ${x.malformed_earmarks.join(', ')}`);
  }
  L.push('');

  L.push('## Standing rules', '');
  L.push('Rules apply in this order; the first match decides. `normative` is never inferred from a status line outside `standard/annexes/`.', '');
  L.push('| Rule | Basis | Files |', '| --- | --- | ---: |');
  for (const r of m.ruleCounts) L.push(`| \`${r.id}\` | ${cell(r.source)} | ${r.files} |`);
  L.push('');
  return L.join('\n');
}

// ---------- main ----------

function main(argv) {
  const args = argv.slice(2);
  if (args.some((a) => a !== '--check') || args.length > 1) {
    process.stderr.write('usage: node scripts/icm-map.mjs [--check]\n');
    return 2;
  }
  const m = build();
  const json = renderJson(m);
  const md = renderMd(m);
  if (args[0] === '--check') {
    const strip = (s) => {
      const o = JSON.parse(s);
      for (const f of o.files || []) delete f.last_commit;
      return JSON.stringify(o);
    };
    const problems = [];
    const oldJson = readText(OUT_JSON);
    const oldMd = readText(OUT_MD);
    try {
      if (oldJson === null || strip(oldJson) !== strip(json)) problems.push(OUT_JSON);
    } catch {
      problems.push(OUT_JSON);
    }
    if (oldMd !== md) problems.push(OUT_MD);
    if (problems.length) {
      process.stdout.write(`icm-map: out of date: ${problems.join(', ')}\nRun: node scripts/icm-map.mjs\n`);
      return 1;
    }
    process.stdout.write(`icm-map: up to date (${m.files.length} files; last_commit dates not compared)\n`);
    return 0;
  }
  writeFileSync(path.join(ROOT, OUT_JSON), json);
  writeFileSync(path.join(ROOT, OUT_MD), md);
  process.stdout.write(`icm-map: wrote ${OUT_JSON} and ${OUT_MD} (${m.files.length} files)\n`);
  return 0;
}

process.exitCode = main(process.argv);
