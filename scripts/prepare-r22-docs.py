from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SHORT_CAPTION = """**GKOS canonical architecture (informative, r3, v0.82 development candidate).** The Standard defines GKX data contracts; implementations consume them and exchange governed records rather than internals. When retrieval is used, retrieval produces an exact candidate set, governance evaluates eligibility separately, and L6 captures selection and deterministically assembles context. Proposed or consequential operations cross the governed boundary, which preserves L4 controls, applicable L5 disposition, L6 context, and L7 authority/effect admission. External MCP/A2A/ACS bindings are informative and versioned: callable is not authorized. Receipts are cross-layer; the shaded founder overlay is an implementation example, not part of the Standard."""

LONG_SECTION = """### Canonical architecture orientation — r3 v0.82 development candidate

- **Files:** `gkos-canonical-architecture.svg` (reference rendering), `.png` (2× export), `.mmd` (Mermaid source), and `.labels.txt` (checked parity register).
- **Standing:** informative v0.82 development candidate under Proposed R22; no normative, conformance, binding, implementation, or runtime authority.
- **Baseline:** `gkos-standard` `main` `33ac87893ad8581950772d685b6b48673019fe7b`; published v0.81 tag target `8f2a158c6d4b8cabd907d98765766d281aec1247`; inspected `GKOS-Engine` development head `8207958047b3361ae21ac07c5a2abbd26a42a684`.
- **Reads top to bottom:** Standard → GKX interoperability seam → plural implementation examples/evidence targets → conditional retrieval-to-context candidate → governed action boundary → versioned external bindings and governed actor classes.
- **Layer boundary:** L4 controls, applicable L5 disposition, L6 context, and L7 authority/effect admission remain distinct.
- **Receipt boundary:** receipt roles are cross-layer. The diagram does not mandate one receipt ledger or one storage engine.
- **Authority boundary:** a human or agent actor gains no authority from class, callability, authentication, retrieval rank, or product placement. R18's bounded independent Review Agent is narrower than general autonomous authority and retains mandatory human escalation conditions.
- **Implementation evidence:** the same-author implementation slot is a candidate with public evidence pending; the public independent slot is an evidence target. Neither is a current interoperability or profile claim.
- **Founder overlay:** named products are implementation examples only and are not mandatory architecture, endorsed dependencies, or conformance evidence.
- **Detail views retained:** `gkos-control-plane.*` and `gkos-layer-responsibilities.*` remain narrower detail diagrams unless a specific conflict is recorded.
- **Legend:** solid arrows = represented control/data path; dashed arrows = governed records, receipts, or implementation attachment; dashed grey boxes = informative external bindings; dashed blue box = open public implementation slot; shaded region = founder implementation examples.
- **Change control:** substantive changes advance the revision. Historical revisions are preserved under `archive/graphics/gkos-canonical-architecture/`. The `.mmd`, `.svg`, `.png`, and label register must remain content-equivalent. Authoritative text and permanent requirements control if the figure differs.
"""


def patch_roadmap() -> None:
    path = ROOT / "ROADMAP.md"
    text = path.read_text(encoding="utf-8")
    old_header = """- **Release coordinate:** GKOS-2026-09-03 v0.81
- **Publication standing:** pending the owner-approved verified signed tag and
  GitHub Release; v0.80 remains published until that event
- **Publication binding:** [exact commit and approval](docs/implementation/V081_PUBLICATION_BINDING.md)
- **Current profile standing:** no qualifying profile
- **Machine exchange contract:** GKX 2.0
- **Current governance:** owner-authorized v0.x development; not consensus
- **Controlling development decisions:** R17–R21 when their exact records are
  merged on `main`
"""
    new_header = """- **Release coordinate:** GKOS-2026-09-03 v0.81
- **Publication standing:** published and immutable at signed tag `v0.81`
- **Published source target:** `8f2a158c6d4b8cabd907d98765766d281aec1247`
- **Publication binding:** [exact commit and approval](docs/implementation/V081_PUBLICATION_BINDING.md)
- **Development standing:** `main` is post-v0.81 development
- **Current profile standing:** no qualifying profile
- **Machine exchange contract:** GKX 2.0
- **Current governance:** owner-authorized v0.x development; not consensus
- **Accepted development decisions:** R17–R21
- **Proposed documentation decision:** R22 canonical informative architecture
- **Current development focus:** v0.82 interoperability, ambiguity resolution,
  retrieval/governance evidence, portable evidence packaging, and public
  implementation work under R21
"""
    if old_header not in text:
        raise SystemExit("ROADMAP header did not match reviewed base")
    text = text.replace(old_header, new_header, 1)
    text = text.replace(
        """This roadmap separates three horizons:

1. publish an honest, exact-bound, non-qualifying v0.81 release;
2. make GKOS useful across the current agent and infrastructure ecosystem
   without turning external protocols into permanent dependencies; and
3. establish the implementation, evidence, governance, and maintenance basis
   required before v1.0.
""",
        """This roadmap separates three horizons:

1. preserve the published, exact-bound, non-qualifying v0.81 release while
   keeping post-publication development distinct;
2. make GKOS useful across the current agent and infrastructure ecosystem
   without turning external protocols into permanent dependencies; and
3. establish the implementation, evidence, governance, and maintenance basis
   required before v1.0.
""",
        1,
    )
    h1 = """## Horizon 1 — published GKOS v0.81 baseline

GKOS-2026-09-03 v0.81 is published as a developmental, owner-authorized,
non-consensus, non-qualifying pre-standard. Its signed tag, dated release
package, publication evidence, and Zenodo archive are immutable historical
coordinates. `qualifying_profiles` remains empty; publication does not qualify
an implementation or create certification standing.

The publication work formerly listed here is complete. Current `main` may carry
post-v0.81 informative or provisional development, including R21 ecosystem work
and RRET-01, without changing what v0.81 means. A correction to the published
coordinate requires an erratum or later release; the v0.81 package is not
rewritten.

Post-publication documentation must continue to distinguish the signed release
identity, current development state, implementation coordinates, and future
conformance evidence.

"""
    text, count = re.subn(
        r"## Horizon 1 — GKOS v0\.81\n.*?(?=## Horizon 2 — ecosystem interoperability under R21)",
        h1,
        text,
        count=1,
        flags=re.S,
    )
    if count != 1:
        raise SystemExit("ROADMAP Horizon 1 replacement failed")
    text = text.replace(
        "- a v0.81 tag or release;",
        "- rewriting, retagging, or replacing the published v0.81 coordinate;",
        1,
    )
    path.write_text(text, encoding="utf-8")


def patch_technical_readme() -> None:
    path = ROOT / "TECHNICAL_README.md"
    text = path.read_text(encoding="utf-8")
    marker = "## Layer contracts\n"
    if "## Proposed v0.82 canonical architecture orientation" not in text:
        insert = f"""## Proposed v0.82 canonical architecture orientation

![GKOS canonical architecture orientation: Standard to GKX seam, plural implementations, conditional retrieval/governance path, governed action boundary, external bindings, governed actors, cross-layer receipts, and separated founder implementation examples](graphics/diagrams/gkos-canonical-architecture.svg)

{SHORT_CAPTION}

[Download PNG](graphics/diagrams/gkos-canonical-architecture.png) · [Editable Mermaid source](graphics/diagrams/gkos-canonical-architecture.mmd) · [Checked label register](graphics/diagrams/gkos-canonical-architecture.labels.txt) · [Proposed R22 record](decisions/R22_Canonical_Informative_Architecture_Development_Decision_Record.md)

R22 is Proposed at this preparation head. The figure itself deliberately carries
no Proposed/Accepted adoption status so owner disposition can later be recorded
without changing the reviewed figure digests. Until R22 is accepted, the master
standard, permanent requirements, accepted decisions, and existing technical
orientation remain controlling.

"""
        if marker not in text:
            raise SystemExit("TECHNICAL_README layer marker missing")
        text = text.replace(marker, insert + marker, 1)
    detail_heading = "## Control-plane placement\n\n"
    if "narrower detail view" not in text:
        detail_note = (
            "This control-plane graphic remains a narrower detail view. It does not\n"
            "compete with the proposed r3 orientation merely because it focuses on\n"
            "placement within an existing stack.\n\n"
        )
        if detail_heading not in text:
            raise SystemExit("TECHNICAL_README control-plane heading missing")
        text = text.replace(detail_heading, detail_heading + detail_note, 1)
    old_current = """Current `main` remains GKOS v0.80. v0.81 preparation does not make any vendor,
retrieval algorithm, graph store, model, client or adapter normative. The
active fixture catalog must continue to declare no qualifying profile until
its exact-bound release and coverage gates are satisfied; fail-closed behavior
is normative, while ingestion and adapter guidance remains informative.
"""
    new_current = """GKOS-2026-09-03 v0.81 is published at its signed tag and immutable release
package. Current `main` is post-v0.81 development; later informative or
provisional work does not rewrite the published coordinate. R21 does not make
any vendor, retrieval algorithm, graph store, model, client, or adapter
normative, and RRET-01 remains provisional, non-normative, and non-qualifying.
No profile is currently qualified.
"""
    if old_current not in text:
        raise SystemExit("TECHNICAL_README stale main paragraph missing")
    text = text.replace(old_current, new_current, 1)
    old_claim = """## Claim boundary

GKOS v0.80 is a public pre-standard. Nothing in this document establishes
accreditation, certification, legal compliance, regulatory authorization,
scientific validity, product safety, or the future GKOS v1.0 gates."""
    new_claim = """## Claim boundary

GKOS-2026-09-03 v0.81 is a developmental public pre-standard. It is published,
owner-authorized, non-consensus, and non-qualifying. Nothing in this document
establishes accreditation, certification, legal compliance, regulatory
authorization, scientific validity, product safety, implementation conformance,
or the future GKOS v1.0 gates."""
    if old_claim not in text:
        raise SystemExit("TECHNICAL_README final claim boundary missing")
    text = text.replace(old_claim, new_claim, 1)
    path.write_text(text, encoding="utf-8")


def patch_graphics_readme() -> None:
    path = ROOT / "graphics/diagrams/README.md"
    text = path.read_text(encoding="utf-8")
    text = text.replace(
        """These informative graphics explain GKOS architecture, an accountable decision
and adoption choices. The architecture diagrams preserve the labels, connections
and layer groupings previously embedded as Mermaid code in the README files.
Styling follows the blue and multicolor palette of the existing illustrated
figures.
""",
        """These informative graphics explain GKOS architecture, an accountable decision,
and adoption choices. The r3 canonical-architecture file set is a v0.82
development candidate under Proposed R22; the existing control-plane and layer
responsibility diagrams remain narrower detail views. Styling follows the blue
and multicolor palette of the existing illustrated figures.
""",
        1,
    )
    canonical_row = "| Canonical architecture orientation — r3 v0.82 candidate | [SVG](gkos-canonical-architecture.svg) | [PNG](gkos-canonical-architecture.png) | [Mermaid](gkos-canonical-architecture.mmd) · [labels](gkos-canonical-architecture.labels.txt) |\n"
    first_row = "| GKOS within an existing stack | [SVG](gkos-control-plane.svg) | [PNG](gkos-control-plane.png) | [Mermaid](gkos-control-plane.mmd) |\n"
    if canonical_row not in text:
        if first_row not in text:
            raise SystemExit("graphics README table row missing")
        text = text.replace(first_row, canonical_row + first_row, 1)
    if "### Canonical architecture orientation — r3 v0.82 development candidate" not in text:
        anchor = "The public README also restores the existing\n"
        if anchor not in text:
            raise SystemExit("graphics README insertion anchor missing")
        text = text.replace(anchor, LONG_SECTION + "\n" + anchor, 1)
    canonical_commands = """mmdc -i graphics/diagrams/gkos-canonical-architecture.mmd \\
  -o graphics/diagrams/gkos-canonical-architecture.svg \\
  -c graphics/diagrams/mermaid-config.json -b white -w 1800
mmdc -i graphics/diagrams/gkos-canonical-architecture.mmd \\
  -o graphics/diagrams/gkos-canonical-architecture.png \\
  -c graphics/diagrams/mermaid-config.json -b white -w 1800 -s 2
"""
    command_anchor = "mmdc -i graphics/diagrams/gkos-control-plane.mmd \\\n"
    if canonical_commands not in text:
        if command_anchor not in text:
            raise SystemExit("graphics README render command anchor missing")
        text = text.replace(command_anchor, canonical_commands + command_anchor, 1)
    text = text.replace(
        "Repeat with `gkos-layer-responsibilities` as the input/output stem.",
        "Repeat the detail-view commands with `gkos-layer-responsibilities` as the input/output stem.",
        1,
    )
    old_scope = """These are post-publication documentation graphics for the live v0.81 edition.
They do not alter its signed tag, frozen release package or Zenodo archive.
The graphics are informative and establish no profile qualification or
implementation certification. The master standard and accepted development
decisions control. Graphics are licensed under CC BY 4.0; see
[LICENSE.md](../../LICENSE.md)."""
    new_scope = """These are post-publication documentation graphics. The live v0.81 edition,
its signed tag, frozen release package, and Zenodo archive are not altered. The
r3 canonical architecture is a v0.82 development candidate under Proposed R22;
its presence creates no profile qualification, binding activation,
interoperability result, or implementation certification. The master standard,
permanent requirements, and accepted development decisions control. Graphics
are licensed under CC BY 4.0; see [LICENSE.md](../../LICENSE.md)."""
    if old_scope not in text:
        raise SystemExit("graphics README scope paragraph missing")
    text = text.replace(old_scope, new_scope, 1)
    path.write_text(text, encoding="utf-8")


def patch_decision_register() -> None:
    path = ROOT / "decisions/GKOS_Decision_Register.md"
    text = path.read_text(encoding="utf-8")
    old_intro = """This register indexes adopted v0.x development decisions. These records
document Founder/Initial Editor dispositions during testing and refinement;
they are not consensus ratification, independent certification, accreditation,
or regulator approval.

## R21 — Ecosystem interoperability program
"""
    new_intro = """This register indexes accepted v0.x development decisions and separately
identifies current proposals. These records document Founder/Initial Editor
dispositions and proposals during testing and refinement; they are not consensus
ratification, independent certification, accreditation, or regulator approval.

## Proposed decisions

### R22 — Canonical informative architecture orientation

- **Date:** 2026-09-03
- **Revision preparation:** 2026-09-04
- **Status:** Proposed development decision; no documentation authority until
  exact-head owner acceptance
- **Decision proposed:** Establish one content-verified r3 top-level informative
  architecture orientation for v0.82 development; preserve existing
  control-plane and layer-responsibility graphics as narrower detail views;
  correct stale post-publication roadmap/documentation state; keep retrieval
  guidance provisional; keep MCP/A2A/ACS informative and non-activating; and
  preserve plural implementation and authority boundaries without creating a
  profile, interoperability result, product standing, or runtime authority.
- **Record:**
  [R22_Canonical_Informative_Architecture_Development_Decision_Record.md](R22_Canonical_Informative_Architecture_Development_Decision_Record.md)

## Accepted decisions

## R21 — Ecosystem interoperability program
"""
    if old_intro not in text:
        raise SystemExit("decision register intro did not match reviewed base")
    path.write_text(text.replace(old_intro, new_intro, 1), encoding="utf-8")


patch_roadmap()
patch_technical_readme()
patch_graphics_readme()
patch_decision_register()
