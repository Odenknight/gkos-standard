/** Trusted in-process fixture executor. No network, arbitrary SQL, or user code execution. */
import { createHash } from "node:crypto";
export const rawDigest = (bytes) => ({
  algorithm: "sha-256",
  basis: "received-bytes",
  value: createHash("sha256").update(bytes).digest("hex"),
});
export const jsonBytes = (value) => Buffer.from(JSON.stringify(value));

export function createFixtureExecutor(
  executorId = "fixture:aggregate-executor",
) {
  const runs = new Map();
  return {
    execute({
      runId,
      methodBytes,
      inputBytes,
      parameterBytes,
      environmentBytes,
    }) {
      if (runs.has(runId)) throw new Error("Run identity reuse refused");
      const method = JSON.parse(methodBytes);
      const rows = JSON.parse(inputBytes);
      const parameters = JSON.parse(parameterBytes);
      if (
        method.operation !== "sum-minor-units" ||
        method.field !== "amount_minor"
      )
        throw new Error("Unsupported fixture method");
      if (
        !Array.isArray(rows) ||
        !Number.isSafeInteger(parameters.maximum_rows) ||
        parameters.maximum_rows < 1 ||
        rows.length > parameters.maximum_rows
      )
        throw new Error("Invalid row limit");
      let sum = 0n;
      for (const row of rows) {
        if (
          !Number.isSafeInteger(row.amount_minor) ||
          Object.is(row.amount_minor, -0) ||
          row.amount_minor < 0
        )
          throw new Error("Invalid minor units");
        if (
          method.exclude_kind !== undefined &&
          row.kind === method.exclude_kind
        )
          continue;
        sum += BigInt(row.amount_minor);
      }
      if (sum > BigInt(Number.MAX_SAFE_INTEGER))
        throw new Error("Unsafe aggregate");
      const resultBytes = jsonBytes({
        name: "total",
        value_minor: Number(sum),
        units: "USD-cent",
      });
      const blobs = Object.fromEntries(
        Object.entries({
          method: methodBytes,
          bills: inputBytes,
          parameters: parameterBytes,
          environment: environmentBytes,
          result: resultBytes,
        }).map(([k, v]) => [k, Buffer.from(v)]),
      );
      const receiptBytes = jsonBytes({
        run_id: runId,
        executor_id: executorId,
        state: "succeeded",
        digests: Object.fromEntries(
          Object.entries(blobs).map(([k, v]) => [k, rawDigest(v)]),
        ),
      });
      runs.set(runId, { receiptBytes, blobs });
      return rawDigest(receiptBytes);
    },
    // Copy on read prevents callers from rewriting the authoritative archive.
    readExecution(runId) {
      const run = runs.get(runId);
      return run
        ? {
            receiptBytes: Buffer.from(run.receiptBytes),
            blobs: Object.fromEntries(
              Object.entries(run.blobs).map(([k, v]) => [k, Buffer.from(v)]),
            ),
          }
        : null;
    },
  };
}
