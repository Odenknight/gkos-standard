# External source register

- **Register ID:** GKOS-ESR-001
- **Revision:** 0.1
- **Reviewed through:** 2026-09-02
- **Standing:** informative R21 control record

This register records the external versions and primary sources used by current
GKOS ecosystem drafts. It is not an endorsement or conformity statement. A
newer external version does not silently update a GKOS mapping: the mapping must
be reviewed, versioned, and dispositioned.

## Status vocabulary

- `current-reviewed`: latest controlling version found at the review date.
- `supported-predecessor`: older version still relevant to an implementation or
  migration path.
- `public-preview`: published for review but not treated as a stable dependency.
- `informative-framework`: external guidance used only as a comparison or
  operationalization input.
- `recheck-required`: source could not be sufficiently verified or has changed
  since the cited mapping.

## Protocol and runtime-control sources

| Source ID | External work | Reviewed coordinate | Status | Primary reference | Accessed | Mapping boundary |
| --- | --- | --- | --- | --- | --- | --- |
| ESR-MCP-20260728 | Model Context Protocol specification | `2026-07-28` | current-reviewed | <https://modelcontextprotocol.io/specification/2026-07-28> | 2026-09-02 | Agent-to-tool/resource/context transport candidate; does not create a GKOS Context Manifest, Decision Record, grant, or Authorized Use Record by itself |
| ESR-MCP-20251125 | Model Context Protocol specification | `2025-11-25` | supported-predecessor | <https://modelcontextprotocol.io/specification/2025-11-25> | 2026-09-02 | Existing implementation compatibility coordinate; migration to the current version must preserve exact behavior and evidence |
| ESR-MCP-REL-20260728 | MCP release description | `2026-07-28` | current-reviewed | <https://blog.modelcontextprotocol.io/posts/2026-07-28/> | 2026-09-02 | Records the stateless request model, request-carried version and client metadata, discovery, and extension changes; blog prose does not replace the specification |
| ESR-A2A-101 | Agent2Agent Protocol | `v1.0.1` | current-reviewed | <https://github.com/a2aproject/A2A/releases/tag/v1.0.1> | 2026-09-02 | Agent discovery, communication, task, message, and artifact transport candidate; does not create GKOS authority or epistemic acceptance |
| ESR-A2A-100 | Agent2Agent Protocol | `v1.0.0` | supported-predecessor | <https://a2a-protocol.org/latest/blog/2026/03/12/a2a-protocol-ships-v10-production-ready-standard-for-agent-to-agent-communication/> | 2026-09-02 | Stable v1.0 semantic generation; use with the exact patch release and binding identified by a pilot |
| ESR-ACS-011 | OWASP Agent Control Standard | `v0.1.1` | public-preview | <https://github.com/GenAI-Security-Project/agent-control-standard> | 2026-09-02 | Runtime observation, control-hook, trace, and agent-BOM comparison target; not a normative GKOS dependency |
| ESR-ACS-ANN-20260901 | OWASP GenAI Security Project ACS announcement | 2026-09-01 announcement | informative-framework | <https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/> | 2026-09-02 | Establishes current project and donation context; does not define ACS conformance |

## Agent-governance and public-sector sources

| Source ID | External work | Reviewed coordinate | Status | Primary reference | Accessed | Mapping boundary |
| --- | --- | --- | --- | --- | --- | --- |
| ESR-NIST-AGENT-2026 | NIST AI Agent Standards Initiative | current page as of 2026-09-02 | informative-framework | <https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative> | 2026-09-02 | Standards, identity, protocol, and security-evaluation priorities; no NIST adoption or endorsement of GKOS |
| ESR-NCCOE-AGENT-ID-2026 | NCCoE Software and AI Agent Identity and Authorization | current concept-project page as of 2026-09-02 | informative-framework | <https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization> | 2026-09-02 | Identity, authorization, delegation, logging, provenance, and prompt-injection implementation questions; not a GKOS mapping or approval |
| ESR-NIST-AIRMF | NIST AI Risk Management Framework | current page as of 2026-09-02 | informative-framework | <https://www.nist.gov/itl/ai-risk-management-framework> | 2026-09-02 | Voluntary risk-management context; GKOS evidence does not establish AI RMF conformity |
| ESR-NIST-AI300-1-IPD | NIST AI 300-1 initial public draft | July 2026 initial public draft | informative-framework | <https://doi.org/10.6028/NIST.AI.300-1.ipd> | 2026-09-02 | Public-facing dataset and model documentation quality lens; scope is not equivalent to whole-system GKOS governance |
| ESR-IMDA-AGENTIC-2026 | Singapore IMDA Model AI Governance Framework for Agentic AI | 2026 framework announcement and materials | informative-framework | <https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai> | 2026-09-02 | Human accountability and agentic-governance comparison; does not create GKOS authority or legal standing |

## Provenance, identity, policy, and packaging sources

These stable or slow-changing sources must still be pinned to exact editions in
a specific binding or pilot.

| Source ID | External work | Reviewed coordinate | Status | Primary reference | Accessed | Mapping boundary |
| --- | --- | --- | --- | --- | --- | --- |
| ESR-W3C-PROV-O | W3C PROV-O | W3C Recommendation 2013-04-30 | informative-framework | <https://www.w3.org/TR/prov-o/> | 2026-09-02 | Provenance vocabulary and interchange; a PROV assertion is not automatically a GKOS disposition or authority grant |
| ESR-OPENLINEAGE | OpenLineage | current specification documentation as of 2026-09-02 | informative-framework | <https://openlineage.io/docs/> | 2026-09-02 | Job/run/dataset lineage input; does not establish epistemic acceptance or semantic supersession |
| ESR-SPIFFE | SPIFFE | current specification set as of 2026-09-02 | informative-framework | <https://github.com/spiffe/spiffe> | 2026-09-02 | Workload identity input; authenticated identity is not a complete GKOS grant |
| ESR-SIGSTORE | Sigstore | current documentation as of 2026-09-02 | informative-framework | <https://docs.sigstore.dev/> | 2026-09-02 | Integrity and provenance mechanism; signature does not prove truth, review, authority, or GKOS conformance |
| ESR-OCI-DIST | OCI Distribution Specification | exact edition to be selected during evidence-package drafting | recheck-required | <https://github.com/opencontainers/distribution-spec> | 2026-09-02 | Candidate carrier for evidence packages; no carrier is yet mandated by GKOS |

## Maintenance rule

Before publishing or claiming a protocol binding, the responsible editor must:

1. re-open the primary source;
2. confirm the exact version or publication date;
3. record whether the mapping changed;
4. update or supersede the applicable binding;
5. preserve the previous register entry; and
6. disclose any source that could not be independently retrieved or verified.

SDK versions, service versions, protocol specifications, and vendor product
features must be recorded as separate coordinates.
