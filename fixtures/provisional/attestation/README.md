# CAP synthetic fixtures

All inputs are synthetic and public. No real bill, patient, aircraft or account is
included. These fixtures are provisional, informative and non-qualifying.

- `method.json` and `altered-method.json` are executable declarative methods for
  the bounded fixture interpreter. The second excludes therapy bills.
- `bills.json`, `parameters.json` and `environment.json` supply actual input bytes.
- `rerun.json` supplies a separate synthetic scientific scalar comparison protocol.
- `example.definition.json`, `example.pass.json` and `example.fail.json` are generated
  schema-valid records with real digests, not placeholder hashes.
- `example.execution-receipt.json` preserves the exact raw receipt bytes referenced
  by the positive example. Its raw-byte digest is distinct from a canonical digest.

The example tests compare checked-in records with fresh execution. When checker,
helper, schema or dependency files change, deliberately regenerate and review them:

```sh
cd conformance/runner
npm run cap:draft -- --write-examples --out /tmp/cap-draft-report.json
node --test test/computation-attestation.test.mjs
```

The failure example executes the altered method and emits a failed attestation.
The persisted demonstration report includes its refused use and suppressed output.
The trusted archive, approval and use policy are local test doubles, not a deployed
executor authentication or authorization service. See
[testing scope](../../../schemas/provisional/attestation/TESTING.md).
