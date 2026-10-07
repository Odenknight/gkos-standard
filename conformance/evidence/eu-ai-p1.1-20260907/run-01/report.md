# P1.1 valid dossier and revisions — execution report

**Assertion summary: FAIL.** 10/11 acceptance checks passed.

**Standing:** Self-evaluation using the unchanged Engine, not independent validation. P1.1 awaits owner review; P1 as a whole is not complete.

Generated: 2026-09-07T04:52:52.800Z. Scenario clock: 2026-09-03T12:00:00.000Z.

## Scenario outcomes

| Scenario | Observed outcome |
| --- | --- |
| A — initial | Expected valid behavior was not fully established; inspect failed or unevaluated assertions. |
| B — revised | Expected valid behavior was not fully established; inspect failed or unevaluated assertions. |
| C — historical | Expected valid behavior was not fully established; inspect failed or unevaluated assertions. |

## Assertion results

| Check | Component evaluated | Result | Evidence |
| --- | --- | --- | --- |
| P11-01: Fixed inventory, identity and schema validity | Standard-reference + host | PASS | [Record](results.json) / [observations](observations.json) |
| P11-02: Initial identities | Engine + Standard metadata comparison | PASS | [Record](results.json) / [observations](observations.json) |
| P11-03: Initial references and current inspection | Engine relationships + example selection | PASS | [Record](results.json) / [observations](observations.json) |
| P11-04: Addition preserves original records | Host preservation + Engine inventory | PASS | [Record](results.json) / [observations](observations.json) |
| P11-05: Revised references and canonical lineage | Engine | PASS | [Record](results.json) / [observations](observations.json) |
| P11-06: Revised current and historical state | Engine state + example selection | PASS | [Record](results.json) / [observations](observations.json) |
| P11-07: Explicit historical inspection preserves original references | Engine references + host historical inspection | PASS | [Record](results.json) / [observations](observations.json) |
| P11-08: No unexpected diagnostics | Engine | FAIL | [Record](results.json) / [observations](observations.json) |
| P11-09: Evaluator rejects missing or incorrect observations | Standard test harness | PASS | [Record](results.json) / [observations](observations.json) |
| P11-10: Repeated observations and substantive outcomes agree | Engine + host/example | PASS | [Record](results.json) / [observations](observations.json) |
| P11-11: Evidence coordinates and claim boundaries are present | Host/example reporting | PASS | [Record](results.json) / [observations](observations.json) |

### P11-01 — Fixed inventory, identity and schema validity

**PASS:** Observed values match the predeclared expectation.

Basis: specification acceptance check P11-01. Evaluated component: Standard-reference + host.

Expected:

```json
[]
```

Observed:

```json
[]
```

Evidence locations: `observations.json#/fixture_validation`, `observations.json#/sources`.

Permitted finding: The supplied five-record fixture matched its declared schema, metadata and raw-byte inventory.

### P11-02 — Initial identities

**PASS:** Observed values match the predeclared expectation.

Basis: specification acceptance check P11-02. Evaluated component: Engine + Standard metadata comparison.

Expected:

```json
[
  {
    "uid": "550e8400-e29b-41d4-a716-446655440101",
    "path": "system.md",
    "metadata": {
      "record_role": "system",
      "system_id": "example-ai",
      "system_version": "demo-build-1"
    }
  },
  {
    "uid": "550e8400-e29b-41d4-a716-446655440102",
    "path": "dossier-r1.md",
    "metadata": {
      "record_role": "dossier",
      "system_id": "example-ai",
      "system_version": "demo-build-1",
      "dossier_id": "example-ai-dossier",
      "document_revision": "1"
    }
  },
  {
    "uid": "550e8400-e29b-41d4-a716-446655440104",
    "path": "evaluation-summary.md",
    "metadata": {
      "record_role": "evaluation",
      "system_id": "example-ai",
      "system_version": "demo-build-1"
    }
  }
]
```

Observed:

```json
[
  {
    "uid": "550e8400-e29b-41d4-a716-446655440101",
    "path": "system.md",
    "metadata": {
      "record_role": "system",
      "system_id": "example-ai",
      "system_version": "demo-build-1"
    }
  },
  {
    "uid": "550e8400-e29b-41d4-a716-446655440102",
    "path": "dossier-r1.md",
    "metadata": {
      "record_role": "dossier",
      "system_id": "example-ai",
      "system_version": "demo-build-1",
      "dossier_id": "example-ai-dossier",
      "document_revision": "1"
    }
  },
  {
    "uid": "550e8400-e29b-41d4-a716-446655440104",
    "path": "evaluation-summary.md",
    "metadata": {
      "record_role": "evaluation",
      "system_id": "example-ai",
      "system_version": "demo-build-1"
    }
  }
]
```

Evidence locations: `observations.json#/runs/0/A/graph/nodes`, `observations.json#/runs/0/A/graph/gkxUidIndex`.

Permitted finding: The Engine exposed the three initial record identities for the declared system build.

### P11-03 — Initial references and current inspection

**PASS:** Observed values match the predeclared expectation.

Basis: specification acceptance check P11-03. Evaluated component: Engine relationships + example selection.

Expected:

```json
{
  "missing_edges": [],
  "inspection": {
    "uid": "550e8400-e29b-41d4-a716-446655440102",
    "document_revision": "1",
    "status": "current",
    "head": false,
    "invalid_at": null,
    "successors": [],
    "predecessors": [],
    "documents": [
      "550e8400-e29b-41d4-a716-446655440101"
    ],
    "cites": [
      "550e8400-e29b-41d4-a716-446655440104"
    ],
    "epistemic_state": "reported"
  }
}
```

Observed:

```json
{
  "missing_edges": [],
  "inspection": {
    "uid": "550e8400-e29b-41d4-a716-446655440102",
    "document_revision": "1",
    "status": "current",
    "head": false,
    "invalid_at": null,
    "successors": [],
    "predecessors": [],
    "documents": [
      "550e8400-e29b-41d4-a716-446655440101"
    ],
    "cites": [
      "550e8400-e29b-41d4-a716-446655440104"
    ],
    "epistemic_state": "reported"
  }
}
```

Evidence locations: `observations.json#/runs/0/A/graph`, `observations.json#/inspections/A`.

Permitted finding: The initial references resolved and the example selected revision 1 using Engine observations.

### P11-04 — Addition preserves original records

**PASS:** Observed values match the predeclared expectation.

Basis: specification acceptance check P11-04. Evaluated component: Host preservation + Engine inventory.

Expected:

```json
{
  "identities": [
    {
      "uid": "550e8400-e29b-41d4-a716-446655440101",
      "path": "system.md",
      "metadata": {
        "record_role": "system",
        "system_id": "example-ai",
        "system_version": "demo-build-1"
      }
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440102",
      "path": "dossier-r1.md",
      "metadata": {
        "record_role": "dossier",
        "system_id": "example-ai",
        "system_version": "demo-build-1",
        "dossier_id": "example-ai-dossier",
        "document_revision": "1"
      }
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440103",
      "path": "dossier-r2.md",
      "metadata": {
        "record_role": "dossier",
        "system_id": "example-ai",
        "system_version": "demo-build-1",
        "dossier_id": "example-ai-dossier",
        "document_revision": "2"
      }
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440104",
      "path": "evaluation-summary.md",
      "metadata": {
        "record_role": "evaluation",
        "system_id": "example-ai",
        "system_version": "demo-build-1"
      }
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440105",
      "path": "review-note.md",
      "metadata": {
        "record_role": "review",
        "system_id": "example-ai",
        "system_version": "demo-build-1"
      }
    }
  ],
  "unchanged_bindings": [
    {
      "uid": "550e8400-e29b-41d4-a716-446655440101",
      "path": "system.md",
      "sha256": "40f976ce933fdca84911bd531a7e6648204ae5d0e0194a06c2061beedaf2cca8",
      "byte_count": 708
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440102",
      "path": "dossier-r1.md",
      "sha256": "e84e9e8631512a41bb51cfea58811f8aeab7d6775dc09e304509d89cb8b96521",
      "byte_count": 953
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440103",
      "path": "dossier-r2.md",
      "sha256": "c05c4c710f8144aca84fae7a0f20fb6343433643a57a3a7d5757f8e257be065d",
      "byte_count": 1059
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440104",
      "path": "evaluation-summary.md",
      "sha256": "af54bc982e119b9862d2e41866d9cb1d2c90cc00781e6bf0ea4dbeca6bf5fb4e",
      "byte_count": 797
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440105",
      "path": "review-note.md",
      "sha256": "dbf0e688bbe4151725a280ccf19901ba663f38754f275cd3567cfeb5ee8181e8",
      "byte_count": 813
    }
  ]
}
```

Observed:

```json
{
  "identities": [
    {
      "uid": "550e8400-e29b-41d4-a716-446655440101",
      "path": "system.md",
      "metadata": {
        "record_role": "system",
        "system_id": "example-ai",
        "system_version": "demo-build-1"
      }
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440102",
      "path": "dossier-r1.md",
      "metadata": {
        "record_role": "dossier",
        "system_id": "example-ai",
        "system_version": "demo-build-1",
        "dossier_id": "example-ai-dossier",
        "document_revision": "1"
      }
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440103",
      "path": "dossier-r2.md",
      "metadata": {
        "record_role": "dossier",
        "system_id": "example-ai",
        "system_version": "demo-build-1",
        "dossier_id": "example-ai-dossier",
        "document_revision": "2"
      }
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440104",
      "path": "evaluation-summary.md",
      "metadata": {
        "record_role": "evaluation",
        "system_id": "example-ai",
        "system_version": "demo-build-1"
      }
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440105",
      "path": "review-note.md",
      "metadata": {
        "record_role": "review",
        "system_id": "example-ai",
        "system_version": "demo-build-1"
      }
    }
  ],
  "unchanged_bindings": [
    {
      "uid": "550e8400-e29b-41d4-a716-446655440101",
      "path": "system.md",
      "sha256": "40f976ce933fdca84911bd531a7e6648204ae5d0e0194a06c2061beedaf2cca8",
      "byte_count": 708
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440102",
      "path": "dossier-r1.md",
      "sha256": "e84e9e8631512a41bb51cfea58811f8aeab7d6775dc09e304509d89cb8b96521",
      "byte_count": 953
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440103",
      "path": "dossier-r2.md",
      "sha256": "c05c4c710f8144aca84fae7a0f20fb6343433643a57a3a7d5757f8e257be065d",
      "byte_count": 1059
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440104",
      "path": "evaluation-summary.md",
      "sha256": "af54bc982e119b9862d2e41866d9cb1d2c90cc00781e6bf0ea4dbeca6bf5fb4e",
      "byte_count": 797
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440105",
      "path": "review-note.md",
      "sha256": "dbf0e688bbe4151725a280ccf19901ba663f38754f275cd3567cfeb5ee8181e8",
      "byte_count": 813
    }
  ]
}
```

Evidence locations: `observations.json#/runs/0/B/graph/nodes`, `observations.json#/post_run_bindings`.

Permitted finding: The revised snapshot contained the expected additions and the host source files retained their captured bytes.

### P11-05 — Revised references and canonical lineage

**PASS:** Observed values match the predeclared expectation.

Basis: specification acceptance check P11-05. Evaluated component: Engine.

Expected:

```json
{
  "missing_edges": [],
  "lineage": [
    {
      "older": "550e8400-e29b-41d4-a716-446655440102",
      "newer": "550e8400-e29b-41d4-a716-446655440103"
    }
  ],
  "predecessors": [
    "550e8400-e29b-41d4-a716-446655440102"
  ],
  "successors": [
    "550e8400-e29b-41d4-a716-446655440103"
  ]
}
```

Observed:

```json
{
  "missing_edges": [],
  "lineage": [
    {
      "older": "550e8400-e29b-41d4-a716-446655440102",
      "newer": "550e8400-e29b-41d4-a716-446655440103"
    }
  ],
  "predecessors": [
    "550e8400-e29b-41d4-a716-446655440102"
  ],
  "successors": [
    "550e8400-e29b-41d4-a716-446655440103"
  ]
}
```

Evidence locations: `observations.json#/runs/0/B/graph/links`, `observations.json#/runs/0/B/graph/nodes`.

Permitted finding: The Engine exposed the declared references and reciprocal supersession for the tested revisions.

### P11-06 — Revised current and historical state

**PASS:** Observed values match the predeclared expectation.

Basis: specification acceptance check P11-06. Evaluated component: Engine state + example selection.

Expected:

```json
{
  "current": {
    "uid": "550e8400-e29b-41d4-a716-446655440103",
    "document_revision": "2",
    "status": "current",
    "head": true,
    "invalid_at": null,
    "successors": [],
    "predecessors": [
      "550e8400-e29b-41d4-a716-446655440102"
    ],
    "documents": [
      "550e8400-e29b-41d4-a716-446655440101"
    ],
    "cites": [
      "550e8400-e29b-41d4-a716-446655440104",
      "550e8400-e29b-41d4-a716-446655440105"
    ],
    "epistemic_state": "reported"
  },
  "historical": {
    "uid": "550e8400-e29b-41d4-a716-446655440102",
    "document_revision": "1",
    "status": "historical",
    "head": false,
    "invalid_at": "2026-09-02T10:00:00.000Z",
    "successors": [
      "550e8400-e29b-41d4-a716-446655440103"
    ],
    "predecessors": [],
    "documents": [
      "550e8400-e29b-41d4-a716-446655440101"
    ],
    "cites": [
      "550e8400-e29b-41d4-a716-446655440104"
    ],
    "epistemic_state": "reported"
  }
}
```

Observed:

```json
{
  "current": {
    "uid": "550e8400-e29b-41d4-a716-446655440103",
    "document_revision": "2",
    "status": "current",
    "head": true,
    "invalid_at": null,
    "successors": [],
    "predecessors": [
      "550e8400-e29b-41d4-a716-446655440102"
    ],
    "documents": [
      "550e8400-e29b-41d4-a716-446655440101"
    ],
    "cites": [
      "550e8400-e29b-41d4-a716-446655440104",
      "550e8400-e29b-41d4-a716-446655440105"
    ],
    "epistemic_state": "reported"
  },
  "historical": {
    "uid": "550e8400-e29b-41d4-a716-446655440102",
    "document_revision": "1",
    "status": "historical",
    "head": false,
    "invalid_at": "2026-09-02T10:00:00.000Z",
    "successors": [
      "550e8400-e29b-41d4-a716-446655440103"
    ],
    "predecessors": [],
    "documents": [
      "550e8400-e29b-41d4-a716-446655440101"
    ],
    "cites": [
      "550e8400-e29b-41d4-a716-446655440104"
    ],
    "epistemic_state": "reported"
  }
}
```

Evidence locations: `observations.json#/runs/0/B/graph/nodes`, `observations.json#/inspections`.

Permitted finding: The example distinguished revision 2 as current and revision 1 as historical using the observed lineage.

### P11-07 — Explicit historical inspection preserves original references

**PASS:** Observed values match the predeclared expectation.

Basis: specification acceptance check P11-07. Evaluated component: Engine references + host historical inspection.

Expected:

```json
{
  "inspection": {
    "uid": "550e8400-e29b-41d4-a716-446655440102",
    "document_revision": "1",
    "status": "historical",
    "head": false,
    "invalid_at": "2026-09-02T10:00:00.000Z",
    "successors": [
      "550e8400-e29b-41d4-a716-446655440103"
    ],
    "predecessors": [],
    "documents": [
      "550e8400-e29b-41d4-a716-446655440101"
    ],
    "cites": [
      "550e8400-e29b-41d4-a716-446655440104"
    ],
    "epistemic_state": "reported"
  },
  "original_sha256": "e84e9e8631512a41bb51cfea58811f8aeab7d6775dc09e304509d89cb8b96521"
}
```

Observed:

```json
{
  "inspection": {
    "uid": "550e8400-e29b-41d4-a716-446655440102",
    "document_revision": "1",
    "status": "historical",
    "head": false,
    "invalid_at": "2026-09-02T10:00:00.000Z",
    "successors": [
      "550e8400-e29b-41d4-a716-446655440103"
    ],
    "predecessors": [],
    "documents": [
      "550e8400-e29b-41d4-a716-446655440101"
    ],
    "cites": [
      "550e8400-e29b-41d4-a716-446655440104"
    ],
    "epistemic_state": "reported"
  },
  "original_sha256": "e84e9e8631512a41bb51cfea58811f8aeab7d6775dc09e304509d89cb8b96521"
}
```

Evidence locations: `observations.json#/inspections/C`, `observations.json#/post_run_bindings`.

Permitted finding: The explicit historical inspection identified revision 1 and its original evidence references and host-retained bytes.

### P11-08 — No unexpected diagnostics

**FAIL:** Observed values differ from the predeclared expectation.

Basis: specification acceptance check P11-08. Evaluated component: Engine.

Expected:

```json
{
  "A": [],
  "B": []
}
```

Observed:

```json
{
  "A": [
    {
      "field": "unresolvedLinks",
      "observed": 2
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440102",
      "code": "GKX-PROVENANCE-001",
      "severity": "warning",
      "field": "provenance.source_refs",
      "message": "No source reference is declared.",
      "deterministic": true,
      "sourcePath": "dossier-r1.md"
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440104",
      "code": "GKX-PROVENANCE-001",
      "severity": "warning",
      "field": "provenance.source_refs",
      "message": "No source reference is declared.",
      "deterministic": true,
      "sourcePath": "evaluation-summary.md"
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440101",
      "code": "GKX-PROVENANCE-001",
      "severity": "warning",
      "field": "provenance.source_refs",
      "message": "No source reference is declared.",
      "deterministic": true,
      "sourcePath": "system.md"
    }
  ],
  "B": [
    {
      "field": "unresolvedLinks",
      "observed": 3
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440102",
      "code": "GKX-PROVENANCE-001",
      "severity": "warning",
      "field": "provenance.source_refs",
      "message": "No source reference is declared.",
      "deterministic": true,
      "sourcePath": "dossier-r1.md"
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440103",
      "code": "GKX-PROVENANCE-001",
      "severity": "warning",
      "field": "provenance.source_refs",
      "message": "No source reference is declared.",
      "deterministic": true,
      "sourcePath": "dossier-r2.md"
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440104",
      "code": "GKX-PROVENANCE-001",
      "severity": "warning",
      "field": "provenance.source_refs",
      "message": "No source reference is declared.",
      "deterministic": true,
      "sourcePath": "evaluation-summary.md"
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440105",
      "code": "GKX-PROVENANCE-001",
      "severity": "warning",
      "field": "provenance.source_refs",
      "message": "No source reference is declared.",
      "deterministic": true,
      "sourcePath": "review-note.md"
    },
    {
      "uid": "550e8400-e29b-41d4-a716-446655440101",
      "code": "GKX-PROVENANCE-001",
      "severity": "warning",
      "field": "provenance.source_refs",
      "message": "No source reference is declared.",
      "deterministic": true,
      "sourcePath": "system.md"
    }
  ]
}
```

Evidence locations: `observations.json#/runs/0/A/graph`, `observations.json#/runs/0/B/graph`.

Permitted finding: This check did not establish the proposed capability.

### P11-09 — Evaluator rejects missing or incorrect observations

**PASS:** Observed values match the predeclared expectation.

Basis: specification acceptance check P11-09. Evaluated component: Standard test harness.

Expected:

```json
{
  "challenge_count": 4,
  "all_detected": true
}
```

Observed:

```json
{
  "challenge_count": 4,
  "all_detected": true
}
```

Evidence locations: `observations.json#/evaluator_challenges`.

Permitted finding: The evaluator rejected four deliberately absent or incorrect observations. These are harness checks, not P1.2 dossier-fault demonstrations.

### P11-10 — Repeated observations and substantive outcomes agree

**PASS:** Observed values match the predeclared expectation.

Basis: specification acceptance check P11-10. Evaluated component: Engine + host/example.

Expected:

```json
{
  "observations_equal": true,
  "outcomes_equal": true,
  "all_required_observations_present": true
}
```

Observed:

```json
{
  "observations_equal": true,
  "outcomes_equal": true,
  "all_required_observations_present": true
}
```

Evidence locations: `observations.json#/runs`.

Permitted finding: Two executions over the same inputs agreed on all captured graph fields except named measured durations, and on substantive assertion outcomes.

### P11-11 — Evidence coordinates and claim boundaries are present

**PASS:** Observed values match the predeclared expectation.

Basis: specification acceptance check P11-11. Evaluated component: Host/example reporting.

Expected:

```json
{
  "standard_commit": true,
  "engine_commit": true,
  "engine_bundle": true,
  "source_files_bound": true,
  "fixture_bound": true,
  "runtime": true,
  "observer_identity": true,
  "limitations": true,
  "self_evaluation": true,
  "execution_errors": []
}
```

Observed:

```json
{
  "standard_commit": true,
  "engine_commit": true,
  "engine_bundle": true,
  "source_files_bound": true,
  "fixture_bound": true,
  "runtime": true,
  "observer_identity": true,
  "limitations": true,
  "self_evaluation": true,
  "execution_errors": []
}
```

Evidence locations: `results.json#/coordinates`, `results.json#/limitations`, `observations.json#/execution_errors`.

Permitted finding: The report identifies its inputs, source/build coordinates, attribution and limitations; this does not independently verify those sources.

## Responsibility and limits

### Standard-reference checks

The Standard example validates source metadata against the existing schema and compares Engine observations with the frozen fixture expectations. This is not an independent implementation of GKOS.

### Engine observations

The saved graphs retain actual UID mappings, relationships, lineage, state, and diagnostics returned by the public Engine buildGraph function. Engine assessment scores or capability labels in that raw output are not acceptance verdicts.

### Host and example behavior

File reads, raw-byte SHA-256, explicit snapshot assembly, current/historical selection, and report writing are supplied by the host/example. Original-record preservation means the host-provided fixture bytes were unchanged.

- Self-evaluation authored and executed with Codex agent assistance; no independent human review or independent rerun has occurred.
- The five dossier records are fictional test inputs; their evaluation and review prose is not actual AI validation or independent review evidence.
- Only P1.1 valid dossier/revision behavior is evaluated. P1.2 fault/retrieval exercises and P1.3 package verification remain unimplemented.
- Standard checks and example selection are not Engine-enforced application policy. Host file access and hashes do not demonstrate Engine persistence, archival retention, or authenticity.
- A passing assertion supports only its stated scenario and component. No full P1 completion, legal compliance, certification, GKOS qualification, or independent validation is claimed.

## Reproduction and source identity

Standard commit: 90d627d4581a95296132a665184838f9e7dbf2cf.

Engine commit: e5ea87bf5cf2c9a6300814f26d237249d6fb8693.

The machine report records dirty-worktree state, content bindings for the tracked sources and added test code, built Engine bundle, fixture, schemas, lockfiles, and runtime. A dirty commit is not represented as an exact source snapshot by commit alone.

Results SHA-256 (raw UTF-8 bytes): cc5d5e7c7a1c322d36414fadeff380ccdee496237e5ecc591e114a806dc585b6.

The observations and specification hashes are recorded in results.json. Matching hashes demonstrates consistency with these captured bytes; it does not prove authenticity or independent review.

The test process exit is recorded in process.json by the test entry point. Keep the external test-runner output alongside this directory for verification.

See the Working invocation section of the specification for the environment variables and command. Select a fresh output directory for each run.
