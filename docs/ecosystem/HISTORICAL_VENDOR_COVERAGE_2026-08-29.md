# Historical product and vendor coverage snapshot

The matrix below measures documented component overlap, not product quality or
GKOS compliance.

- **D** — GKOS defines the layer contract; this is not an implementation claim.
- **S** — substantial reusable component overlap.
- **P** — partial or adjacent capability requiring a GKOS adapter and evidence.
- **—** — no material mapping identified in the reviewed public sources.

| Product or ecosystem | L1 | L2 | L3 | L4 | L5 | L6 | L7 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Google Cloud / OKF** | P | P | P | P | — | — | P |
| **Anthropic** | — | — | — | P | P | — | — |
| **MCP ecosystem** | — | — | — | — | — | P | P |
| **OpenAI** | — | — | — | P | P | P | — |
| **Microsoft** | P | — | S | P | — | — | P |
| **AWS** | — | — | — | S | — | — | P |
| **Databricks** | P | — | S | P | — | — | P |
| **Zep / Graphiti** | — | P | S | — | — | — | — |
| **LangChain ecosystem** | — | — | — | P | P | P | — |
| **GKOS standard contract** | D | D | D | D | D | D | D |

Why the conservative classifications matter:

- Google [Open Knowledge Format (OKF) v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
  adds valuable provenance, trust, lifecycle and attested-computation fields,
  but its concept identity remains path-based, ordinary links are not the full
  GKOS assertion contract, trust tiers are advisory, and runtime receipts are
  not stored in the bundle.
- [MCP 2026-07-28 authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)
  defines OAuth-based access to protected MCP resources. For HTTP deployments
  supporting authorization, it uses protected-resource metadata and resource
  indicators. It does not define GKOS epistemic state, Decision Records,
  Context Manifests, or Authorized Use Records.
- Cedar, OPA, IAM, Entra, OpenFGA and similar systems evaluate or enforce
  authorization. Their closest primary fit is L4 control and L7 enforcement
  support—not L5 human or organizational disposition by default.
- Evaluation and observability systems such as OpenAI Evals, LangSmith, MLflow,
  Ragas and OpenTelemetry can supply L4 evidence. A GKOS adapter must still
  bind the exact test/policy, inputs, version, result, diagnostic semantics and
  blocking rule.
- Catalog and lineage systems such as Microsoft Purview, Databricks Unity
  Catalog, OpenLineage and Graphiti can supply strong L1/L3 inputs or
  projections. They do not acquire GKOS promotion or decision authority by
  storing a graph or lineage event.

Representative primary references for the placements include
[Anthropic evaluation guidance](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)
and the [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk-python),
[OpenAI Evals](https://platform.openai.com/docs/guides/evals) and the
[OpenAI Agents SDK](https://openai.github.io/openai-agents-python/),
[Microsoft Purview lineage](https://learn.microsoft.com/en-us/purview/data-gov-classic-lineage-user-guide),
[Amazon Verified Permissions](https://docs.aws.amazon.com/verifiedpermissions/),
[Cedar](https://github.com/cedar-policy/cedar),
[Databricks Unity Catalog lineage](https://docs.databricks.com/aws/en/data-governance/unity-catalog/data-lineage),
[MLflow evaluation](https://mlflow.org/docs/latest/ml/evaluation/),
[Graphiti](https://github.com/getzep/graphiti),
[LangSmith evaluation](https://docs.langchain.com/langsmith/evaluation), and
[LangGraph](https://github.com/langchain-ai/langgraph). Products change more
quickly than GKOS releases; an implemented adapter must pin the exact external
version and re-evaluate its mapping.

The Google specification named **OKF** is separate from the historical
**OKF+** name used in this repository. R11 renamed the GKOS technical exchange
model from OKF+ to **GKX**, and R12 limits Google OKF interoperability to a
versioned subset. Implementations must not silently map one format into the
other because both use Markdown and YAML frontmatter.

## What changed in 2026

Two external developments sharpen the adapter boundary:

1. **OKF v0.2** made `sources`, `generated`, `verified`, `status`,
   `stale_after`, and Attested Computation contracts first-class. An executor
   returns a declared receipt shape and deterministic attester code checks it.
   The per-run receipt and verdict remain runtime artifacts rather than stored
   bundle records. In GKOS terms, those artifacts can become L4 evidence and
   L1 re-entry sources; they do not become an L7 authorization history unless
   an adapter binds them to exact context, authority, action and outcome.
2. **MCP 2026-07-28** strengthened HTTP authorization around OAuth 2.1 roles,
   protected-resource metadata and target-resource binding. The MCP roadmap's
   [Agent Identity Working Group](https://modelcontextprotocol.io/development/roadmap)
   is pursuing workload and user-delegated identity. Roadmap work is not a
   released identity or governance contract, and authentication of a caller
   does not establish knowledge-promotion or consequential-use authority.

This convergence supports a bounded GKOS position: provenance, attestation,
identity, policy and context transport are becoming more capable, while GKOS
specifies how their outputs participate in one inspectable lifecycle from
preserved evidence through governed action and Layer-1 re-entry. The reviewed
sources do not supply that complete seven-contract lifecycle as a single
governed contract family. This is not a claim that no other system addresses
similar concerns.

**Standing:** retained as a historical editorial snapshot dated 2026-08-29, not revalidated in the 2026-09-06 documentation update. Its broad S/P judgments lack per-cell evidence and a reproducible scoring rubric. Recheck product versions, primary sources and each claimed capability before selection or implementation. This is not a current vendor recommendation or qualification matrix.
