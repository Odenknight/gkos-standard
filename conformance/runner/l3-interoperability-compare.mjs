#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

export function classifyCase(fixture, a, b) {
  if (!a || !b) return 'INCOMPLETE_IMPLEMENTATION_EVIDENCE';

  const aExpected = a.outcome === fixture.expect;
  const bExpected = b.outcome === fixture.expect;

  if (aExpected && bExpected) {
    if (a.portable_meaning && b.portable_meaning && a.portable_meaning !== b.portable_meaning) {
      return 'SPEC_AMBIGUITY';
    }
    return 'EQUIVALENT';
  }

  if (aExpected !== bExpected) return 'IMPLEMENTATION_DIVERGENCE';

  if (a.outcome === b.outcome) {
    return a.outcome === 'ALLOWED_VARIATION' ? 'ALLOWED_VARIATION' : 'FIXTURE_OR_SPEC_REVIEW_REQUIRED';
  }

  return 'IMPLEMENTATION_DIVERGENCE';
}

export function compareResults(fixtures, aResults, bResults) {
  const a = new Map((aResults.results ?? []).map((row) => [row.id, row]));
  const b = new Map((bResults.results ?? []).map((row) => [row.id, row]));
  return fixtures.cases.map((fixture) => ({
    id: fixture.id,
    family: fixture.family,
    expected: fixture.expect,
    classification: classifyCase(fixture, a.get(fixture.id), b.get(fixture.id)),
    implementation_a: a.get(fixture.id) ?? null,
    implementation_b: b.get(fixture.id) ?? null,
  }));
}

async function main() {
  const [fixturePath, aPath, bPath] = process.argv.slice(2);
  if (!fixturePath || !aPath || !bPath) {
    console.error('usage: node l3-interoperability-compare.mjs <fixtures.json> <implementation-a.json> <implementation-b.json>');
    process.exitCode = 2;
    return;
  }
  const [fixtures, aResults, bResults] = await Promise.all(
    [fixturePath, aPath, bPath].map(async (path) => JSON.parse(await readFile(path, 'utf8'))),
  );
  const report = {
    fixture_set: fixtures.fixture_set,
    standing: 'informative-differential-report',
    results: compareResults(fixtures, aResults, bResults),
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
