import YAML from "yaml";

export const ENGINE_VERSION = "0.0.0-test";

const frontmatter = (raw) => {
  const match = /^---\n([\s\S]*?)\n---/u.exec(raw);
  return match ? YAML.parse(match[1]) : {};
};

export function buildGkx23Projection(content) {
  const data = frontmatter(content);
  const relationships = {};
  for (const type of ["contradicts", "supersedes", "superseded_by"]) {
    if (Array.isArray(data[type])) relationships[type] = [...data[type]];
  }
  return {
    authored: { uid: data.uid },
    effective: { sensitivity: data.sensitivity ?? null, epistemicState: data.epistemic_state ?? null, relationships },
    diagnostics: [],
  };
}
