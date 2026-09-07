import { mkdirSync, readdirSync, realpathSync, existsSync } from 'node:fs';
import { resolve, relative, sep, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  loadFixture, snapshotRecords, sourceBindings, rereadBindings, FIXTURE_ROOT,
} from './p1-fixture.mjs';
import {
  evaluateBaseline, assertion, MissingObservation, inspect, comparableObservation, evaluatorChallenges,
} from './p1-evaluate.mjs';
import { captureCoordinates, writeEvidence, LIMITATIONS } from './p1-report.mjs';

function prepareOutput(outDir) {
  if (!outDir || !isAbsolute(outDir)) throw new Error('GKOS_P1_OUT must name an absolute fresh output directory');
  const out = resolve(outDir), fixture = realpathSync(FIXTURE_ROOT);
  // Check before creating anything; resolve the nearest existing ancestor too.
  let ancestor = out;
  while (!existsSync(ancestor)) ancestor = resolve(ancestor, '..');
  const resolvedOut = resolve(realpathSync(ancestor), relative(ancestor, out));
  const rel = relative(fixture, resolvedOut);
  if (!rel || (rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel))) throw new Error('Output cannot be inside the fixture directory');
  if (existsSync(out) && readdirSync(out).length) throw new Error('Output directory is not empty; select a fresh directory');
  mkdirSync(out, { recursive: true });
  return out;
}

function observedInspection(observation, request) {
  try { return inspect(observation, request); }
  catch (error) { return { unavailable: true, error: error.message }; }
}

export async function runP1({ observerPath, outDir }) {
  const out = prepareOutput(outDir);
  const fixture = loadFixture();
  const runs = [], errors = [];
  let coordinates;
  try { coordinates = captureCoordinates(observerPath, fixture); }
  catch (error) { errors.push({ stage: 'coordinates', message: error.message }); }
  let observer;
  try {
    if (!observerPath || !isAbsolute(observerPath)) throw new Error('GKOS_P1_ENGINE_OBSERVER must name an absolute observer module path');
    observer = (await import(pathToFileURL(observerPath).href)).observeDossierSnapshot;
    if (typeof observer !== 'function') throw new Error('Observer module must export observeDossierSnapshot');
  } catch (error) { errors.push({ stage: 'observer-loading', message: error.message }); }

  if (fixture.errors.length === 0 && observer) {
    for (let iteration = 0; iteration < 2; iteration++) {
      const run = {};
      for (const name of ['A', 'B']) {
        try {
          const records = snapshotRecords(fixture, name);
          const before = JSON.stringify(records);
          run[name] = await observer({ records, now: Date.parse(fixture.manifest.now) });
          if (JSON.stringify(records) !== before) throw new Error('Observer changed source input records');
        } catch (error) {
          errors.push({ stage: 'observation', iteration, snapshot: name, message: error.message });
          run[name] = null;
        }
      }
      runs.push(run);
    }
  }
  let afterBindings = null;
  try { afterBindings = rereadBindings(fixture); }
  catch (error) { errors.push({ stage: 'source-preservation', message: error.message }); }
  const checks = evaluateBaseline(fixture, runs[0], afterBindings);
  let challenges = null;
  try {
    if (runs[0]?.A?.graph && runs[0]?.B?.graph) challenges = evaluatorChallenges(fixture, runs[0], afterBindings);
  } catch (error) { errors.push({ stage: 'evaluator-challenges', message: error.message }); }
  checks.push(assertion('P11-09', 'Evaluator rejects missing or incorrect observations', 'Standard test harness',
    { challenge_count: 4, all_detected: true }, () => {
      if (!challenges) throw new MissingObservation('Evaluator challenges require captured Engine graphs');
      return { challenge_count: challenges.length, all_detected: challenges.every(c => c.detected) };
    }, ['observations.json#/evaluator_challenges'],
    'The evaluator rejected four deliberately absent or incorrect observations. These are harness checks, not P1.2 dossier-fault demonstrations.'));
  const repeatExpected = { observations_equal: true, outcomes_equal: true, all_required_observations_present: true };
  checks.push(assertion('P11-10', 'Repeated observations and substantive outcomes agree', 'Engine + host/example', repeatExpected, () => {
    if (!runs[0]?.A?.graph || !runs[0]?.B?.graph || !runs[1]?.A?.graph || !runs[1]?.B?.graph) throw new MissingObservation('Both complete repeated observations are required');
    const stable = run => Object.fromEntries(['A', 'B'].map(n => [n, comparableObservation(run[n])]));
    const comparableChecks = run => evaluateBaseline(fixture, run, afterBindings).map(c => ({ id: c.id, expected: c.expected, observed: c.observed, status: c.status }));
    return {
      observations_equal: JSON.stringify(stable(runs[0])) === JSON.stringify(stable(runs[1])),
      outcomes_equal: JSON.stringify(comparableChecks(runs[0])) === JSON.stringify(comparableChecks(runs[1])),
      all_required_observations_present: true,
    };
  }, ['observations.json#/runs'], 'Two executions over the same inputs agreed on all captured graph fields except named measured durations, and on substantive assertion outcomes.'));

  const enginePackage = coordinates?.engine?.files.find(f => f.path === 'package.json');
  const engineBundle = coordinates?.engine?.files.find(f => f.path === 'dist/gkos-engine.mjs');
  checks.push(assertion('P11-11', 'Evidence coordinates and claim boundaries are present', 'Host/example reporting',
    { standard_commit: true, engine_commit: true, engine_bundle: true, source_files_bound: true, fixture_bound: true,
      runtime: true, observer_identity: true, limitations: true, self_evaluation: true, execution_errors: [] },
    () => {
      if (!coordinates) throw new MissingObservation('Source coordinates');
      const allFiles = [...coordinates.standard.files, ...(coordinates.engine?.files ?? [])];
      return {
        standard_commit: /^[a-f0-9]{40}$/u.test(coordinates.standard.commit),
        engine_commit: /^[a-f0-9]{40}$/u.test(coordinates.engine?.commit ?? ''),
        engine_bundle: Boolean(engineBundle?.sha256 && enginePackage?.sha256),
        source_files_bound: allFiles.length > 0 && allFiles.every(f => Boolean(f.sha256)),
        fixture_bound: coordinates.fixture.manifest_sha256 === fixture.manifest_sha256,
        runtime: Boolean(coordinates.runtime.node && coordinates.runtime.npm && coordinates.runtime.os),
        observer_identity: ['A', 'B'].every(n => runs[0]?.[n]?.engine?.name === coordinates.engine?.package_identity?.name
          && runs[0]?.[n]?.engine?.version === coordinates.engine?.package_identity?.version && Boolean(runs[0]?.[n]?.engine?.version)),
        limitations: LIMITATIONS.length >= 5,
        self_evaluation: coordinates.authorship.independent_rerun === false && coordinates.authorship.review_status === 'not independently reviewed',
        execution_errors: errors,
      };
    }, ['results.json#/coordinates', 'results.json#/limitations', 'observations.json#/execution_errors'],
    'The report identifies its inputs, source/build coordinates, attribution and limitations; this does not independently verify those sources.'));
  const inspections = {
    A: observedInspection(runs[0]?.A, fixture.manifest.requests.A),
    B: observedInspection(runs[0]?.B, fixture.manifest.requests.B),
    C: observedInspection(runs[0]?.B, fixture.manifest.requests.C),
  };
  const scenario = (name, ids, description) => {
    const assertions = checks.filter(c => ids.includes(c.id));
    return { name, check_ids: ids, outcome: assertions.every(c => c.status === 'PASS')
      ? description : 'Expected valid behavior was not fully established; inspect failed or unevaluated assertions.' };
  };
  const payload = {
    observations: {
      fixture_validation: { errors: fixture.errors, manifest_sha256: fixture.manifest_sha256 },
      sources: fixture.records.map(r => ({ ...sourceBindings(fixture).find(b => b.uid === r.data.uid), content: r.content, parsed_frontmatter: r.data })),
      runs, inspections, post_run_bindings: afterBindings, evaluator_challenges: challenges, execution_errors: errors,
    },
    results: {
      format: 'eu-ai-p1.1-example-results/1', generated_at: new Date().toISOString(), scenario_time: fixture.manifest.now,
      status: checks.every(c => c.status === 'PASS') ? 'PASS' : checks.some(c => c.status === 'FAIL') ? 'FAIL' : 'UNEVALUATED',
      expected_process_exit_code: checks.every(c => c.status === 'PASS') ? 0 : 1,
      checks, coordinates: coordinates ?? null, limitations: LIMITATIONS,
      scenarios: [
        scenario('A — initial', ['P11-01', 'P11-02', 'P11-03', 'P11-08'], 'Valid initial dossier observed; example selected revision 1.'),
        scenario('B — revised', ['P11-01', 'P11-04', 'P11-05', 'P11-06', 'P11-08'], 'Valid revised dossier observed; example selected revision 2 and retained revision 1 as history.'),
        scenario('C — historical', ['P11-01', 'P11-07', 'P11-08'], 'Explicit historical lookup returned revision 1 and its original evidence references.'),
      ],
      volatile_comparison_exclusions: ['graph.stats.durationMs', 'graph.diagnostics.lastFullBuildMs', 'graph.diagnostics.lastIncrementalUpdateMs'],
    },
  };
  writeEvidence(out, payload);
  return { out, ...payload };
}
