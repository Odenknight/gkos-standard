import { equal, sorted, sourceBindings } from './p1-fixture.mjs';

export class MissingObservation extends Error {}
const required = (value, name) => {
  if (value === undefined || value === null) throw new MissingObservation(`Missing observation: ${name}`);
  return value;
};
const graphOf = observation => required(observation?.graph, 'Engine graph');
const fileNodes = observation => required(graphOf(observation).nodes, 'graph.nodes').filter(n => n.kind === 'file');
const nodeUid = node => required(node?.gkx?.projection?.authored?.uid, 'node authored UID');
const recordNode = (observation, uid) => {
  const graph = graphOf(observation);
  const id = required(graph.gkxUidIndex?.[uid], `UID mapping ${uid}`);
  const matches = fileNodes(observation).filter(n => n.id === id);
  if (matches.length !== 1 || nodeUid(matches[0]) !== uid) throw new Error(`Inconsistent observed identity for ${uid}`);
  return matches[0];
};
const nodeIdsToUids = (observation, ids) => sorted(required(ids, 'lineage node IDs').map(id => {
  const node = fileNodes(observation).find(n => n.id === id);
  return nodeUid(node);
}));

export function semanticEdges(observation) {
  const nodes = fileNodes(observation), edges = required(graphOf(observation).links, 'graph.links');
  return edges.filter(e => e.kind === 'semantic').map(e => ({
    source_uid: nodeUid(nodes.find(n => n.id === e.source)), type: e.label,
    target_uid: nodeUid(nodes.find(n => n.id === e.target)),
  }));
}

export function inspect(observation, request) {
  if (!['current', 'uid'].includes(request?.mode)) throw new Error('Unsupported inspection request mode');
  const candidates = fileNodes(observation).filter(node => {
    const meta = node.gkx?.projection?.rawFrontmatter?.x_eu_ai_demo;
    return meta?.record_role === 'dossier' && meta.system_id === request.system_id
      && meta.system_version === request.system_version && meta.dossier_id === request.dossier_id;
  });
  // Selection depends only on observed data and the request, never expected UIDs.
  const selected = request.mode === 'uid'
    ? candidates.filter(n => nodeUid(n) === request.uid)
    : candidates.filter(n => required(n.gkx?.supersededByIds, 'successors').length === 0);
  if (selected.length !== 1) throw new Error(`Inspection requires one unambiguous candidate; observed ${selected.length}`);
  const node = recordNode(observation, nodeUid(selected[0]));
  const edges = semanticEdges(observation).filter(e => e.source_uid === nodeUid(node));
  const successors = nodeIdsToUids(observation, node.gkx.supersededByIds);
  if (!Object.hasOwn(node.gkx, 'invalidAt')) throw new MissingObservation('Missing invalidAt');
  return {
    uid: nodeUid(node),
    document_revision: required(node.gkx.projection.rawFrontmatter.x_eu_ai_demo.document_revision, 'document revision'),
    status: successors.length ? 'historical' : 'current',
    head: required(node.gkx.head, 'head'), invalid_at: node.gkx.invalidAt,
    successors, predecessors: nodeIdsToUids(observation, node.gkx.supersedesIds),
    documents: sorted(edges.filter(e => e.type === 'documents').map(e => e.target_uid)),
    cites: sorted(edges.filter(e => e.type === 'cites').map(e => e.target_uid)),
    epistemic_state: required(node.gkx.projection.authored.epistemicState, 'authored epistemic state'),
  };
}

export function assertion(id, title, component, expected, observe, evidence, claim) {
  let observed = null, status, explanation;
  try {
    observed = observe();
    status = equal(observed, expected) ? 'PASS' : 'FAIL';
    explanation = status === 'PASS' ? 'Observed values match the predeclared expectation.' : 'Observed values differ from the predeclared expectation.';
  } catch (error) {
    status = error instanceof MissingObservation ? 'UNEVALUATED' : 'FAIL';
    explanation = error.message;
  }
  return {
    id, title, basis: 'specification.md#6-acceptance-checks', requirement_id: id, evaluated_component: component,
    evaluator: 'Standard-owned P1 example assertions (same-author evaluation)',
    expected, observed, status, explanation, evidence,
    permitted_claim: status === 'PASS' ? claim : 'This check did not establish the proposed capability.',
  };
}

function identities(fixture, observation) {
  return fileNodes(observation).map(n => {
    const uid = nodeUid(n);
    if (recordNode(observation, uid) !== n) throw new Error('Inconsistent UID index');
    return { uid, path: n.path, metadata: required(n.gkx.projection.rawFrontmatter.x_eu_ai_demo, 'fixture metadata') };
  }).sort((a, b) => a.uid.localeCompare(b.uid));
}
function expectedIdentities(fixture, name) {
  return fixture.manifest.snapshots[name].map(a => fixture.manifest.records.find(r => r.alias === a))
    .map(r => ({ uid: r.uid, path: r.path, metadata: r.metadata })).sort((a, b) => a.uid.localeCompare(b.uid));
}
function expectedSemantic(fixture, name) {
  const uids = new Set(expectedIdentities(fixture, name).map(r => r.uid));
  return fixture.manifest.relationships.filter(e => e.type !== 'supersedes' && uids.has(e.source_uid) && uids.has(e.target_uid));
}
function missingEdges(expected, observation) {
  const actual = semanticEdges(observation);
  return expected.filter(e => !actual.some(a => equal(a, e)));
}
function lineage(observation) {
  const nodes = fileNodes(observation);
  return required(graphOf(observation).links, 'links').filter(e => e.kind === 'lineage')
    .map(e => ({ older: nodeUid(nodes.find(n => n.id === e.source)), newer: nodeUid(nodes.find(n => n.id === e.target)) }));
}

export function diagnosticIssues(observation, manifest) {
  const issues = [];
  const graph = graphOf(observation), diagnostics = required(graph.diagnostics, 'graph diagnostics');
  for (const key of ['unresolvedLinks', 'ambiguousLinks', 'lineageCycles', 'residualCollisions']) {
    if (required(diagnostics[key], `diagnostics.${key}`) !== 0) issues.push({ field: key, observed: diagnostics[key] });
  }
  if (required(diagnostics.lineageWarnings, 'lineageWarnings').length) issues.push({ lineageWarnings: diagnostics.lineageWarnings });
  for (const n of fileNodes(observation)) {
    for (const d of required(n.gkx?.projection?.diagnostics, 'projection diagnostics')) {
      if (d.severity === 'info' && manifest.allowed_info_codes.includes(d.code)) continue;
      if (d.severity === 'warning' && manifest.allowed_warnings.some(w => w.uid === nodeUid(n) && w.code === d.code && w.field === d.field)) continue;
      issues.push({ uid: nodeUid(n), ...d });
    }
  }
  return issues;
}

export function evaluateBaseline(fixture, observations, afterBindings) {
  const { manifest: m } = fixture, A = observations?.A, B = observations?.B;
  const checks = [];
  const add = (...args) => checks.push(assertion(...args));
  add('P11-01', 'Fixed inventory, identity and schema validity', 'Standard-reference + host', [], () => fixture.errors,
    ['observations.json#/fixture_validation', 'observations.json#/sources'], 'The supplied five-record fixture matched its declared schema, metadata and raw-byte inventory.');
  add('P11-02', 'Initial identities', 'Engine + Standard metadata comparison', expectedIdentities(fixture, 'A'), () => identities(fixture, A),
    ['observations.json#/runs/0/A/graph/nodes', 'observations.json#/runs/0/A/graph/gkxUidIndex'], 'The Engine exposed the three initial record identities for the declared system build.');
  add('P11-03', 'Initial references and current inspection', 'Engine relationships + example selection',
    { missing_edges: [], inspection: m.expected_inspections.A }, () => ({ missing_edges: missingEdges(expectedSemantic(fixture, 'A'), A), inspection: inspect(A, m.requests.A) }),
    ['observations.json#/runs/0/A/graph', 'observations.json#/inspections/A'], 'The initial references resolved and the example selected revision 1 using Engine observations.');
  add('P11-04', 'Addition preserves original records', 'Host preservation + Engine inventory',
    { identities: expectedIdentities(fixture, 'B'), unchanged_bindings: sourceBindings(fixture) }, () => ({ identities: identities(fixture, B), unchanged_bindings: required(afterBindings, 'post-run file bindings') }),
    ['observations.json#/runs/0/B/graph/nodes', 'observations.json#/post_run_bindings'], 'The revised snapshot contained the expected additions and the host source files retained their captured bytes.');
  add('P11-05', 'Revised references and canonical lineage', 'Engine',
    { missing_edges: [], lineage: [{ older: m.expected_inspections.C.uid, newer: m.expected_inspections.B.uid }],
      predecessors: m.expected_inspections.B.predecessors, successors: m.expected_inspections.C.successors },
    () => ({ missing_edges: missingEdges(expectedSemantic(fixture, 'B'), B), lineage: lineage(B),
      predecessors: inspect(B, m.requests.B).predecessors, successors: inspect(B, m.requests.C).successors }),
    ['observations.json#/runs/0/B/graph/links', 'observations.json#/runs/0/B/graph/nodes'], 'The Engine exposed the declared references and reciprocal supersession for the tested revisions.');
  add('P11-06', 'Revised current and historical state', 'Engine state + example selection',
    { current: m.expected_inspections.B, historical: m.expected_inspections.C },
    () => ({ current: inspect(B, m.requests.B), historical: inspect(B, m.requests.C) }),
    ['observations.json#/runs/0/B/graph/nodes', 'observations.json#/inspections'], 'The example distinguished revision 2 as current and revision 1 as historical using the observed lineage.');
  const original = fixture.records.find(r => r.expected.alias === 'D1');
  add('P11-07', 'Explicit historical inspection preserves original references', 'Engine references + host historical inspection',
    { inspection: m.expected_inspections.C, original_sha256: original?.expected.sha256 },
    () => ({ inspection: inspect(B, m.requests.C), original_sha256: required(afterBindings?.find(r => r.uid === m.requests.C.uid)?.sha256, 'original bytes') }),
    ['observations.json#/inspections/C', 'observations.json#/post_run_bindings'], 'The explicit historical inspection identified revision 1 and its original evidence references and host-retained bytes.');
  add('P11-08', 'No unexpected diagnostics', 'Engine', { A: [], B: [] },
    () => ({ A: diagnosticIssues(A, m), B: diagnosticIssues(B, m) }),
    ['observations.json#/runs/0/A/graph', 'observations.json#/runs/0/B/graph'], 'The Engine emitted no unexpected diagnostics for these valid snapshots; retained compatibility information is disclosed.');
  return checks;
}

// Exclude only named measured-duration fields. Do not recursively drop arbitrary
// fields with similar names, identities, diagnostics, or Engine cache hashes.
export function comparableObservation(observation) {
  const value = structuredClone(observation);
  if (!value?.graph) return value;
  delete value.graph.stats?.durationMs;
  delete value.graph.diagnostics?.lastFullBuildMs;
  delete value.graph.diagnostics?.lastIncrementalUpdateMs;
  return value;
}

export function evaluatorChallenges(fixture, observations, afterBindings) {
  const cases = [];
  const challenge = (name, mutate, ids) => {
    const altered = structuredClone(observations);
    mutate(altered);
    const actual = evaluateBaseline(fixture, altered, afterBindings).filter(c => ids.includes(c.id));
    cases.push({ name, expected: 'All targeted assertions are non-PASS', check_ids: ids,
      observed: actual.map(c => ({ id: c.id, status: c.status, explanation: c.explanation })),
      detected: actual.length === ids.length && actual.every(c => c.status !== 'PASS') });
  };
  challenge('absent Engine observations', x => { delete x.A; delete x.B; }, ['P11-02', 'P11-03', 'P11-05', 'P11-06', 'P11-07', 'P11-08']);
  challenge('fabricated UID index', x => { x.A.graph.gkxUidIndex[fixture.manifest.expected_inspections.A.uid] = 'file:not-present.md'; }, ['P11-02', 'P11-03']);
  challenge('omitted required citation edge', x => {
    const id = x.A.graph.gkxUidIndex[fixture.manifest.expected_inspections.A.uid];
    x.A.graph.links = x.A.graph.links.filter(e => !(e.source === id && e.kind === 'semantic' && e.label === 'cites'));
  }, ['P11-03']);
  challenge('incorrect derived current flag', x => {
    const n = recordNode(x.B, fixture.manifest.expected_inspections.B.uid); n.gkx.head = false;
  }, ['P11-06']);
  return cases;
}
