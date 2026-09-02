const OBSERVATION_CONTRACT = "gkos.graph-observation/1";

const isRecord = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const nonempty = (value) => typeof value === "string" && value.length > 0;

const validEdge = (edge) =>
  isRecord(edge) &&
  nonempty(edge.source_uid) &&
  nonempty(edge.type) &&
  nonempty(edge.target_ref) &&
  (edge.target_uid === null || nonempty(edge.target_uid)) &&
  ["uid", "basename", "unresolved"].includes(edge.resolution) &&
  (edge.resolution === "unresolved" ? edge.target_uid === null : nonempty(edge.target_uid));

const validIdentity = (identity) =>
  isRecord(identity) &&
  nonempty(identity.uid) &&
  nonempty(identity.projected_uid) &&
  nonempty(identity.basename);

const expectedTarget = (sourceUid, binding) => {
  if (sourceUid === binding.primary.uid) return binding.pair;
  if (sourceUid === binding.pair.uid) return binding.primary;
  return null;
};

/**
 * Evaluate an adapter-neutral graph observation against a Standard-owned
 * graph_expect object. Missing observations remain UNEVALUATED at the caller;
 * malformed or contradictory observations are executed failures.
 */
export function evaluateGraphExpectation(expectation, observation, binding) {
  if (observation === undefined) {
    return { executed: false, pass: false, detail: "adapter did not emit a graph observation" };
  }
  if (!isRecord(expectation) || !isRecord(observation)) {
    return { executed: true, pass: false, detail: "graph expectation and observation must be objects" };
  }

  if (
    !isRecord(binding) ||
    !validIdentity(binding.primary) ||
    !validIdentity(binding.pair) ||
    binding.primary.uid !== binding.primary.projected_uid ||
    binding.pair.uid !== binding.pair.projected_uid
  ) {
    return {
      executed: true,
      pass: false,
      detail: "invalid trusted fixture identity binding",
    };
  }

  const supported = new Set(["typed_edge", "resolves", "supersession_chain", "uid_first_resolution"]);
  const unsupported = Object.keys(expectation).filter((key) => !supported.has(key));
  if (unsupported.length) {
    return { executed: true, pass: false, detail: `unsupported graph expectation keys: ${unsupported.join(", ")}` };
  }
  if (
    observation.contract !== OBSERVATION_CONTRACT ||
    !nonempty(observation.primary_uid) ||
    !nonempty(observation.pair_uid) ||
    !Array.isArray(observation.edges) ||
    !observation.edges.every(validEdge)
  ) {
    return { executed: true, pass: false, detail: `invalid ${OBSERVATION_CONTRACT} observation` };
  }

  const failures = [];
  if (observation.primary_uid !== binding.primary.uid) {
    failures.push("observed primary_uid does not match the Standard-parsed primary fixture UID");
  }
  if (observation.pair_uid !== binding.pair.uid) {
    failures.push("observed pair_uid does not match the Standard-parsed paired fixture UID");
  }
  for (const edge of observation.edges) {
    const target = expectedTarget(edge.source_uid, binding);
    if (!target) {
      failures.push(`edge source_uid ${edge.source_uid} is not a bound fixture identity`);
      continue;
    }
    if (edge.resolution === "uid") {
      if (edge.target_ref !== edge.target_uid) {
        failures.push("UID resolution requires target_ref to equal target_uid exactly");
      }
      if (![binding.primary.uid, binding.pair.uid].includes(edge.target_uid)) {
        failures.push("UID resolution target_uid is not a bound fixture identity");
      }
    }
    if (edge.resolution === "basename" && (
      edge.target_ref !== target.basename || edge.target_uid !== target.uid
    )) {
      failures.push("basename resolution does not match the actual paired fixture basename and UID");
    }
  }
  if (expectation.resolves !== undefined && typeof expectation.resolves !== "boolean") {
    failures.push("resolves must be boolean");
  }
  if (expectation.uid_first_resolution !== undefined && typeof expectation.uid_first_resolution !== "boolean") {
    failures.push("uid_first_resolution must be boolean");
  }
  if (expectation.typed_edge !== undefined) {
    if (!nonempty(expectation.typed_edge)) failures.push("typed_edge must be a non-empty string");
    else {
      const candidates = observation.edges.filter(
        (edge) => edge.source_uid === observation.primary_uid && edge.type === expectation.typed_edge,
      );
      if (!candidates.length) failures.push(`missing primary ${expectation.typed_edge} edge`);
      if (expectation.resolves === true && !candidates.some(
        (edge) => edge.target_uid === observation.pair_uid && edge.resolution !== "unresolved",
      )) failures.push(`${expectation.typed_edge} edge did not resolve to the paired fixture`);
      if (expectation.resolves === false && candidates.some(
        (edge) => edge.target_uid !== null || edge.resolution !== "unresolved",
      )) failures.push(`${expectation.typed_edge} edge unexpectedly resolved`);
    }
  } else if (expectation.resolves !== undefined) {
    failures.push("resolves requires typed_edge");
  }

  if (expectation.supersession_chain !== undefined) {
    const chain = expectation.supersession_chain;
    if (!Array.isArray(chain) || chain.length !== 2 || !chain.every(nonempty)) {
      failures.push("supersession_chain must contain exactly two non-empty UIDs");
    } else {
      const [predecessor, successor] = chain;
      if (predecessor !== binding.primary.uid || successor !== binding.pair.uid) {
        failures.push("supersession_chain does not match the Standard-parsed fixture identities");
      }
      if (observation.primary_uid !== predecessor || observation.pair_uid !== successor) {
        failures.push("observed primary/pair identities do not match the supersession chain");
      }
      const chainEdges = observation.edges.filter((edge) =>
        edge.resolution !== "unresolved" && (
          (edge.type === "superseded_by" && edge.source_uid === predecessor && edge.target_uid === successor) ||
          (edge.type === "supersedes" && edge.source_uid === successor && edge.target_uid === predecessor)
        ));
      if (!chainEdges.length) failures.push("supersession chain was not observed");
      if (expectation.uid_first_resolution === true && !chainEdges.some((edge) => edge.resolution === "uid")) {
        failures.push("supersession chain was not resolved by UID");
      }
    }
  } else if (expectation.uid_first_resolution !== undefined) {
    failures.push("uid_first_resolution requires supersession_chain");
  }

  return {
    executed: true,
    pass: failures.length === 0,
    detail: failures.length ? failures.join("; ") : "graph expectation satisfied",
  };
}
