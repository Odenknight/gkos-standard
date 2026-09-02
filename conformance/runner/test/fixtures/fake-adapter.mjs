export const implementation = {
  name: "runner-honesty-test-adapter",
  version: "0.0.0-test",
};

export function project(_content, path) {
  const diagnostics = [];
  if (path.includes("gcp1-n01")) {
    diagnostics.push(
      { code: "GKX-SCHEMA-004", severity: "error" },
      { code: "GKX-SCHEMA-004", severity: "error" },
      { code: "GKX-SCHEMA-004", severity: "error" },
    );
  }
  if (path.includes("gcp1-n02")) diagnostics.push({ code: "GKX-EPISTEMIC-002", severity: "error" });
  if (path.includes("gcp1-n03")) diagnostics.push({ code: "GKX-TEMPORAL-001", severity: "error" });
  if (path.includes("gcp1-b01")) diagnostics.push({ code: "GKX-SENSITIVITY-001", severity: "warning" });
  if (path.includes("gcp3-l02")) diagnostics.push({ code: "GKX-EPISTEMIC-004", severity: "warning" });
  return { diagnostics, effective: { sensitivity: "secret", epistemicState: "unknown" } };
}

const frontmatter = (raw) => {
  const match = /^---\n([\s\S]*?)\n---/u.exec(raw);
  return match ? YAML.parse(match[1]) : {};
};

const targetRef = (value) => {
  const raw = typeof value === "string" ? value.trim() : "";
  const wiki = /^\[\[([^\]\r\n]+)\]\]$/u.exec(raw);
  return (wiki?.[1] ?? raw).split("|")[0].split("#")[0].trim();
};

export function projectGraph({ primary, pair }) {
  if (!pair) throw new Error("paired fixture is required");
  const primaryData = frontmatter(primary.content);
  const pairData = frontmatter(pair.content);
  const primaryBase = basename(primary.path, extname(primary.path));
  const pairBase = basename(pair.path, extname(pair.path));
  const nodes = [
    { data: primaryData, path: primary.path, base: primaryBase, uid: primaryData.uid },
    { data: pairData, path: pair.path, base: pairBase, uid: pairData.uid },
  ];
  const edges = [];
  for (const source of nodes) for (const type of ["contradicts", "supersedes", "superseded_by"]) {
    for (const value of Array.isArray(source.data[type]) ? source.data[type] : []) {
      const ref = targetRef(value);
      const target = nodes.find((node) => node.uid === ref) ?? nodes.find((node) => node.base === ref);
      edges.push({
        source_uid: source.uid,
        type,
        target_ref: ref,
        target_uid: target?.uid ?? null,
        resolution: target ? (target.uid === ref ? "uid" : "basename") : "unresolved",
      });
    }
  }
  return {
    contract: "gkos.graph-observation/1",
    primary_uid: primaryData.uid,
    pair_uid: pairData.uid,
    edges,
  };
}
import { basename, extname } from "node:path";
import YAML from "yaml";
