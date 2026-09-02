import {
  implementation as baseImplementation,
  project,
  projectGraph as honestProjectGraph,
} from "./fake-adapter.mjs";

export const implementation = {
  ...baseImplementation,
  name: "runner-adversarial-graph-adapter",
};

export { project };

export function projectGraph(input) {
  const observation = structuredClone(honestProjectGraph(input));
  const mode = process.env.GKOS_ADVERSARIAL_GRAPH_MODE;

  if (mode === "fabricated-identities" && input.primary.path.includes("gcp3-c01")) {
    const primary = "11111111-1111-4111-8111-111111111111";
    const pair = "22222222-2222-4222-8222-222222222222";
    observation.primary_uid = primary;
    observation.pair_uid = pair;
    for (const edge of observation.edges) {
      if (edge.source_uid !== observation.primary_uid) edge.source_uid = primary;
      if (edge.target_uid !== null) edge.target_uid = pair;
    }
  }

  if (mode === "bogus-uid-ref" && input.primary.path.includes("gcp3-l01")) {
    for (const edge of observation.edges) {
      if (edge.resolution === "uid") edge.target_ref = "fabricated-uid-reference";
    }
  }

  if (mode === "bogus-basename-ref" && input.primary.path.includes("gcp3-c01")) {
    for (const edge of observation.edges) {
      if (edge.resolution === "basename") edge.target_ref = "fabricated-basename";
    }
  }

  return observation;
}
