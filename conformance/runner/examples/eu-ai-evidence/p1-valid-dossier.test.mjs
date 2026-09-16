import assert from 'node:assert/strict';
import test from 'node:test';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runP1 } from './p1-run.mjs';

let completed;
process.on('exit', code => {
  if (completed) writeFileSync(resolve(completed.out, 'process.json'), JSON.stringify({
    actual_process_exit_code: code, expected_process_exit_code: completed.results.expected_process_exit_code,
    command: completed.results.coordinates?.invocation.command, ended_at: new Date().toISOString(),
  }, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' });
});

test('P1.1 valid dossier and revisions — explicit non-qualifying example', async t => {
  completed = await runP1({ observerPath: process.env.GKOS_P1_ENGINE_OBSERVER, outDir: process.env.GKOS_P1_OUT });
  for (const check of completed.results.checks) {
    await t.test(`${check.id}: ${check.title}`, () => {
      assert.equal(check.status, 'PASS', `${check.explanation}\nObserved: ${JSON.stringify(check.observed)}\nExpected: ${JSON.stringify(check.expected)}`);
    });
  }
});
