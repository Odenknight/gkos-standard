#!/usr/bin/env python3
"""Build gkos-cia-triad-alignment.svg (editable, text labels) and a 2x PNG."""
import html, cairosvg
from pathlib import Path

W = 1600
FONT = "Arial, Helvetica, sans-serif"
INK, MUTED, RULE = "#1F2A37", "#536780", "#D5DCE5"

ROWS = [
    dict(letter="C", name="Confidentiality", color="#235FA5", fill="#E7F0FA", edge="#A8C4E6",
         fips="Preserve authorized restrictions on access and disclosure.",
         verdict="Direct normative controls",
         gkos=[
             ("Authorization before any protected disclosure — including logs, metrics,", "errors and diagnostics; denied data must not influence outputs", "GKOS-DISCLOSURE-001"),
             ("Missing sensitivity fails closed; restrictions raise at once, lower only", "with authenticated authority; audit inherits sensitivity", "Security annex"),
             ("Authority scoped by purpose, tenant, audience and sensitivity;", "delegation can only narrow; effect scope has a sensitivity ceiling", "GKOS-EFFECT-001..003"),
             ("Context Manifests bind purpose, recipient and restrictions;", "Viewers show restrictions without gaining authority", "GKOS-CONTEXT-001/004 · PROFILE-007"),
         ],
         where="L1 sensitivity evidence · L4 control and Refusal Receipts · L6 Selection Envelope and Context Manifest · L7 Authority Receipt and Authorized Use Record",
         impl=["Enforcement at the real operation, not observation-only",
               "Encryption at rest and in transit; key, credential and revocation management",
               "Leak tests across every surface: logs, errors, metrics, outputs",
               "Timing side-channel bounds (informative only in v0.81)"]),
    dict(letter="I", name="Integrity", color="#36803B", fill="#EAF5EF", edge="#A6CBB5",
         fips="Guard against improper modification or destruction; includes authenticity and non-repudiation.",
         verdict="Strongest alignment",
         gkos=[
             ("Every committed state change is bound to a State-Change Receipt or it", "fails closed / rolls back / compensates before commit success", "GKOS-RECEIPT-001..003"),
             ("Deterministic GKX-CBOR-1 encoding and SHA-256 hashing; stable identity;", "lineage keeps every branch, no tiebreak picks a winner", "GKOS-CANON · IDENTITY · LINEAGE"),
             ("Append-only Decision Records; distinct proposer / reviewer / authorizer /", "executor; no self-approval; bounded different-model agent review", "GKOS-REVIEW-001..004 · AUTHUSE-004"),
             ("Manifest hash equal at authorization and action time; authority valid", "at captured action time; explicit policy identity; re-entry restarts at L1 (REENTRY)", "AUTHUSE-001..003/007 · POLICY-001"),
         ],
         where="L1–L7 end to end · Source Record · Knowledge Object · lineage · Control Receipt · Decision Record · Selection Envelope · Context Manifest · Authorized Use Record · Refusal Receipt",
         impl=["Tamper-resistant record storage and protected trust anchors",
               "Signing, attestation and trusted time",
               "Tamper, stale-context and expired-authority tests → recorded refusal or rollback",
               "Source-quality evaluation — evidence integrity is not factual truth"]),
    dict(letter="A", name="Availability", color="#794DA5", fill="#F0EEF8", edge="#C4BADA",
         fips="Ensure timely and reliable access to and use of information.",
         verdict="Partial: governance, not uptime",
         gkos=[
             ("Required gate closures leave receipts; escalation where applicable, so", "an authorized refusal is distinguishable from an outage", "GKOS-AUTHUSE-005"),
             ("Authorized Use Records bind outcome plus correction, compensation,", "rollback or escalation route", "GKOS-AUTHUSE-006"),
             ("Disposition consults a hold predicate first; legal hold overrides deletion;", "governed erasure keeps a tombstone and decision evidence", "GKOS-RETENTION-001..003"),
             ("Review queues need capacity, TTL, aging, workload, sampling and emergency", "procedures; overdue review halts delegated changes; replayable manifests", "GKOS-DELEGATION-006 · CONTEXT-003"),
         ],
         where="L2 stable identity · L4 fail-closed gates · L5 queue governance · L6 replayable manifests · L7 recovery routes — processing may be asynchronous and distributed",
         impl=["Backups, restore testing, redundancy and failover",
               "Measured service and recovery objectives; load and capacity tests",
               "Incident response that never bypasses a governance gate to speed recovery",
               "Plan for governed refusal as a normal service state — GKOS has no uptime artifact"]),
]

LAYERS = ["L1 Sources", "L2 Identity", "L3 Lineage", "L4 Control", "L5 Review", "L6 Context", "L7 Use"]
# which objectives concentrate at each layer (C,I,A) — I runs end to end
LAYER_MARKS = {0: "CI", 1: "IA", 2: "I", 3: "CIA", 4: "IA", 5: "CIA", 6: "CIA"}

out = []
def t(x, y, s, size=15, fill=INK, weight="normal", anchor="start", family=FONT, italic=False, mono=False):
    fam = "'DejaVu Sans Mono', Menlo, Consolas, monospace" if mono else family
    style = f"font-family:{fam};font-size:{size}px;font-weight:{weight};fill:{fill};" + ("font-style:italic;" if italic else "")
    out.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" style="{style}">{html.escape(s)}</text>')
def rect(x, y, w, h, fill, stroke="none", r=10, sw=1.5):
    out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>')

M = 48
y = 0
# header
t(M, 48, "SECURITY OBJECTIVES × GOVERNANCE EVIDENCE", 13, MUTED, "bold")
t(M, 90, "The CIA Triad and GKOS v0.81", 34, INK, "bold")
t(M, 120, "How the governed evidence GKOS requires supports confidentiality, integrity and availability — and what a deployment still has to add", 16, MUTED)
t(W - M, 90, "Informative · not a conformance or security claim", 13, MUTED, "normal", "end")

# column headers
y = 160
COL1, COL2, COL3 = M, 372, 1178
CW1, CW2, CW3 = 300, 780, W - M - 1178
t(COL1, y, "OBJECTIVE (FIPS 199 §3)", 12, MUTED, "bold")
t(COL2, y, "WHAT GKOS REQUIRES OR RECORDS", 12, MUTED, "bold")
t(COL2 + CW2 - 8, y, "REQUIREMENT / SOURCE", 12, MUTED, "bold", "end")
t(COL3, y, "IMPLEMENTATION MUST ADD", 12, MUTED, "bold")
y += 14

ROW_H = 238
for r in ROWS:
    top = y
    rect(M, top, W - 2 * M, ROW_H, "#FFFFFF", RULE, 12)
    # objective panel
    rect(M, top, CW1, ROW_H, r["fill"], "none", 12)
    out.append(f'<rect x="{M}" y="{top}" width="8" height="{ROW_H}" rx="4" fill="{r["color"]}"/>')
    t(M + 26, top + 44, r["letter"], 30, r["color"], "bold")
    t(M + 62, top + 44, r["name"], 24, INK, "bold")
    # fips wrap (manual)
    words, lines, cur = r["fips"].split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 > 34:
            lines.append(cur); cur = w
        else:
            cur = (cur + " " + w).strip()
    lines.append(cur)
    yy = top + 76
    for ln in lines:
        t(M + 26, yy, ln, 15, "#3B4A5C"); yy += 21
    # verdict pill
    pw = 7.6 * len(r["verdict"]) + 24
    rect(M + 26, top + ROW_H - 50, pw, 28, r["color"], "none", 14)
    t(M + 26 + pw / 2, top + ROW_H - 31, r["verdict"], 13, "#FFFFFF", "bold", "middle")
    # GKOS column
    yy = top + 30
    for l1, l2, rid in r["gkos"]:
        out.append(f'<circle cx="{COL2 + 5}" cy="{yy - 5}" r="3.5" fill="{r["color"]}"/>')
        t(COL2 + 16, yy, l1, 14.5, INK)
        t(COL2 + 16, yy + 19, l2, 14.5, INK)
        t(COL2 + CW2 - 8, yy + 19, rid, 12, r["color"], "bold", "end", mono=True)
        yy += 44
    # where strip
    out.append(f'<line x1="{COL2}" y1="{top + 202}" x2="{COL2 + CW2 - 8}" y2="{top + 202}" stroke="{RULE}"/>')
    t(COL2, top + 222, "Where: " + r["where"], 12, MUTED, italic=True)
    # implementation column
    out.append(f'<line x1="{COL3 - 20}" y1="{top + 16}" x2="{COL3 - 20}" y2="{top + ROW_H - 16}" stroke="{RULE}"/>')
    yy = top + 36
    for s in r["impl"]:
        # wrap at ~44 chars
        words, lines, cur = s.split(), [], ""
        for w in words:
            if len(cur) + len(w) + 1 > 46:
                lines.append(cur); cur = w
            else:
                cur = (cur + " " + w).strip()
        lines.append(cur)
        out.append(f'<rect x="{COL3}" y="{yy - 11}" width="9" height="9" rx="2" fill="none" stroke="{r["color"]}" stroke-width="1.6"/>')
        for i, ln in enumerate(lines):
            t(COL3 + 18, yy + i * 18, ln, 13.5, INK)
        yy += 18 * len(lines) + 12
    y += ROW_H + 16

# layer strip
top = y + 6
t(M, top + 14, "WHERE EACH OBJECTIVE CONCENTRATES ACROSS THE SEVEN LAYER CONTRACTS", 12, MUTED, "bold")
t(W - M, top + 14, "Layers are contracts, not one synchronous pipeline. Receipts are semantic roles — one record may satisfy several.", 12, MUTED, "normal", "end", italic=True)
sy = top + 28
cell_w = (W - 2 * M - 6 * 10) / 7
for i, name in enumerate(LAYERS):
    x = M + i * (cell_w + 10)
    rect(x, sy, cell_w, 64, "#F6F8FB", RULE, 8)
    t(x + 14, sy + 24, name, 14, INK, "bold")
    dx = x + 14
    for ch in "CIA":
        on = ch in LAYER_MARKS[i]
        col = {"C": ROWS[0]["color"], "I": ROWS[1]["color"], "A": ROWS[2]["color"]}[ch]
        out.append(f'<circle cx="{dx + 9}" cy="{sy + 46}" r="9" fill="{col if on else "#FFFFFF"}" stroke="{col if on else RULE}" stroke-width="1.5"/>')
        t(dx + 9, sy + 50, ch, 11, "#FFFFFF" if on else "#B7C0CC", "bold", "middle")
        dx += 26
y = sy + 64 + 26

# footer
t(M, y + 6, "Alignment: strongest in integrity · direct confidentiality controls · partial availability support", 17, INK, "bold")
t(M, y + 30, "Basis: NIST FIPS 199 §3 and the GKOS v0.81 normative surface (master standard, requirement registry, normative annexes; signed tag v0.81, commit 8f2a158). Requirement references are pinned to the published v0.81 baseline.", 12, MUTED)
t(M, y + 50, "GKOS governance records support security objectives; deployed controls and operational tests establish outcomes. GKOS does not guarantee truth, safety, security or fitness for purpose, and the active fixture catalog declares no qualifying profile.", 12, MUTED)
H = y + 74

desc = ("Three rows map the FIPS 199 security objectives to GKOS v0.81. Confidentiality: authorization precedes protected disclosure on every "
        "surface (GKOS-DISCLOSURE-001), sensitivity fails closed, authority and effect scope carry audience and sensitivity limits, and Context "
        "Manifests are restriction-aware; the implementation adds enforcement, encryption, key management and leak tests. Integrity, the strongest "
        "alignment: state-change receipts, deterministic canonical hashing, stable identity and lineage, append-only decisions with distinct actor roles, "
        "and exact manifest and authority binding at action time; the implementation adds tamper-resistant storage, signing, trusted time and tests. "
        "Availability, partial: recorded refusal distinct from outage, recovery routes on every authorized use, hold-aware retention, and queue "
        "governance; the implementation adds backups, redundancy, service objectives and incident response. A strip shows where each objective "
        "concentrates across layers L1 to L7. Informative; not a conformance or security claim.")
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="cia-title cia-desc">\n'
       f'  <title id="cia-title">The CIA Triad and GKOS v0.81</title>\n  <desc id="cia-desc">{html.escape(desc)}</desc>\n'
       f'  <rect width="{W}" height="{H}" fill="#FFFFFF"/>\n  ' + "\n  ".join(out) + "\n</svg>\n")
base = str(Path(__file__).resolve().with_suffix("").with_suffix(""))
import os; os.makedirs(os.path.dirname(base), exist_ok=True)
open(base + ".svg", "w").write(svg)
cairosvg.svg2png(bytestring=svg.encode(), write_to=base + ".png", scale=2)
print(H)
