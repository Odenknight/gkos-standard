/**
 * Example adapter binding the runner to gkos-engine (informative — the
 * standard does not depend on this implementation). Set GKOS_ENGINE_DIST to
 * the built bundle, e.g.:
 *   GKOS_ENGINE_DIST=/path/to/GKOS-Engine/dist/kosmos-core.mjs \
 *   node run.mjs --adapter ./adapters/gkos-engine.mjs
 */
import { basename, extname } from "node:path";

const dist = process.env.GKOS_ENGINE_DIST;
if (!dist) throw new Error("Set GKOS_ENGINE_DIST to gkos-engine's dist/kosmos-core.mjs");
const core = await import(dist);
export const implementation = { name: "gkos-engine", version: core.ENGINE_VERSION, repository: "https://github.com/Odenknight/GKOS-Engine" };
export function project(content, path) {
  const p = core.buildGkx23Projection(content, path, "fixture:" + path, null);
  return {
    diagnostics: (p?.diagnostics ?? []).map(d => ({ code: d.code, severity: d.severity, field: d.field ?? null })),
    identity: { uid: p?.authored?.uid ?? null },
    effective: { sensitivity: p?.effective?.sensitivity ?? null, epistemicState: p?.effective?.epistemicState ?? null },
  };
}

const targetRef = (value) => {
  if (typeof value === "string") {
    const raw = value.trim();
    const wiki = /^\[\[([^\]\r\n]+)\]\]$/u.exec(raw);
    return (wiki?.[1] ?? raw).split("|")[0].split("#")[0].trim();
  }
  if (value && typeof value === "object") return targetRef(value.target ?? value.target_uid ?? value.uid);
  return "";
};

/**
 * Produce only the pair-bounded graph observation requested by the Standard
 * runner. Resolution is performed over the two projected fixture identities;
 * this does not claim that an entire implementation graph was qualified.
 */
export function projectGraph({ primary, pair }) {
  if (!pair) throw new Error("paired fixture is required");
  const nodes = [primary, pair].map((item) => ({
    projection: core.buildGkx23Projection(item.content, item.path, "fixture:" + item.path, null),
    base: basename(item.path, extname(item.path)),
  })).map((item) => ({ ...item, uid: item.projection?.authored?.uid }));
  const edges = [];
  for (const source of nodes) {
    const relationships = source.projection?.effective?.relationships ?? {};
    for (const type of ["contradicts", "supersedes", "superseded_by"]) {
      for (const value of Array.isArray(relationships[type]) ? relationships[type] : []) {
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
  }
  return {
    contract: "gkos.graph-observation/1",
    primary_uid: nodes[0].uid,
    pair_uid: nodes[1].uid,
    edges,
  };
}
