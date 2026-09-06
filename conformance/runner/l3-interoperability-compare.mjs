#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function indexResults(resultSet) {
  const map = new Map();
  for (const row of resultSet.results ?? []) {
    if (!row?.id) throw new Error('implementation result row is missing id');
    if (map.has(row.id)) throw new Error(`duplicate implementation result id: ${row.id}`);
    map.set(row.id, row);
  }
  return map;
}

export function classifyCase(fixture, rows) {
  if (!Array.isArray(rows) || rows.length < 2 || rows.some((row) => !row)) {
    return 'INCOMPLETE_IMPLEMENTATION_EVIDENCE';
  }

  if (rows.some((row) => row.outcome !== fixture.expected_class)) {
    const distinctOutcomes = new Set(rows.map((row) => row.outcome));
    return distinctOutcomes.size > 1 ? 'IMPLEMENTATION_DIVERGENCE' : 'FIXTURE_OR_IMPLEMENTATION_REVIEW_REQUIRED';
  }

  if (fixture.expected_portable_meaning !== undefined) {
    if (rows.some((row) => row.portable_meaning === undefined)) {
      return 'INCOMPLETE_IMPLEMENTATION_EVIDENCE';
    }
    const meanings = new Set(rows.map((row) => stable(row.portable_meaning)));
    if (meanings.size > 1) return 'MEANING_DIVERGENCE_REVIEW_REQUIRED';
    if (!meanings.has(stable(fixture.expected_portable_meaning))) {
      return 'FIXTURE_OR_IMPLEMENTATION_REVIEW_REQUIRED';
    }
  }

  return fixture.mismatch_class === 'ALLOWED_VARIATION' ? 'ALLOWED_VARIATION' : 'EQUIVALENT';
}

export function compareMany(fixtures, resultSets) {
  if (!Array.isArray(resultSets) || resultSets.length < 2) {
    throw new Error('at least two implementation result sets are required');
  }
  const indexes = resultSets.map(indexResults);
  return fixtures.cases.map((fixture) => {
    const rows = indexes.map((index) => index.get(fixture.id) ?? null);
    return {
      id: fixture.id,
      family: fixture.family,
      expected: fixture.expected_class,
      mismatch_class: fixture.mismatch_class,
      classification: classifyCase(fixture, rows),
      implementations: rows,
    };
  });
}

export function compareResults(fixtures, aResults, bResults) {
  return compareMany(fixtures, [aResults, bResults]);
}

async function main() {
  const [fixturePath, ...resultPaths] = process.argv.slice(2);
  if (!fixturePath || resultPaths.length < 2) {
    console.error('usage: node l3-interoperability-compare.mjs <fixtures.json> <implementation-a.json> <implementation-b.json> [implementation-n.json ...]');
    process.exitCode = 2;
    return;
  }
  const fixtures = JSON.parse(await readFile(fixturePath, 'utf8'));
  const resultSets = await Promise.all(resultPaths.map(async (path) => JSON.parse(await readFile(path, 'utf8'))));
  let results;
  try {
    results = compareMany(fixtures, resultSets);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 2;
    return;
  }
  const report = {
    fixture_set: fixtures.fixture_set,
    standing: 'informative-differential-report',
    results,
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (results.some((row) => !['EQUIVALENT', 'ALLOWED_VARIATION'].includes(row.classification))) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
