import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { evaluateGraphExpectation } from "../graph-evaluator.mjs";

const root = resolve("..", "..");
const readFixture = (path) => readFileSync(resolve(root, "fixtures", path), "utf8");
const uid = (item) => item.projection.identity.uid;
const binding = (primary, pair) => ({
  primary: { uid: uid(primary), projected_uid: uid(primary), basename: primary.path.split("/").at(-1).replace(/\.md$/u, "") },
  pair: { uid: uid(pair), projected_uid: uid(pair), basename: pair.path.split("/").at(-1).replace(/\.md$/u, "") },
});

test("informative gkos-engine adapter emits the bounded graph observation contract", async () => {
  process.env.GKOS_ENGINE_DIST = pathToFileURL(resolve("test/fixtures/fake-engine-core.mjs")).href;
  const adapter = await import(`../adapters/gkos-engine.mjs?test=${Date.now()}`);

  const contradictionPaths = ["corpus/gcp3-c01-claim.md", "corpus/gcp3-c02-counter.md"];
  const contradictionItems = contradictionPaths.map((path) => {
    const content = readFixture(path);
    return { content, path, projection: adapter.project(content, path) };
  });
  const contradiction = evaluateGraphExpectation(
    { typed_edge: "contradicts", resolves: true },
    adapter.projectGraph({ primary: contradictionItems[0], pair: contradictionItems[1] }),
    binding(contradictionItems[0], contradictionItems[1]),
  );
  assert.equal(contradiction.pass, true);

  const lineagePaths = ["corpus/gcp3-l01-superseded.md", "corpus/gcp3-l02-successor.md"];
  const lineageItems = lineagePaths.map((path) => {
    const content = readFixture(path);
    return { content, path, projection: adapter.project(content, path) };
  });
  const lineage = evaluateGraphExpectation({
    supersession_chain: [
      "6f7a8b9c-0d1e-4f2a-8b3c-4d5e6f7a8b9c",
      "8b9c0d1e-2f3a-4b4c-8d5e-6f7a8b9c0d1e",
    ],
    uid_first_resolution: true,
  }, adapter.projectGraph({ primary: lineageItems[0], pair: lineageItems[1] }), binding(lineageItems[0], lineageItems[1]));
  assert.equal(lineage.pass, true);
});
