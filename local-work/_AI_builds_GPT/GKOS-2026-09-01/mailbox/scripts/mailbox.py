#!/usr/bin/env python3
"""GKOS mailbox helper. Standard library only.

  python mailbox.py new --from lead-correspondence --to owner --type decision-request --subject "OD-01 ..." [--re MSG-0003] [--needs-owner] [--deadline 2026-09-14] [--submission S-01] [--paper P-01]
  python mailbox.py list [party]            show open messages (all inboxes, or one party)
  python mailbox.py archive MSG-0007 [--status done|blocked|superseded]
  python mailbox.py board                   rewrite BOARD.md from current inboxes and registers
  python mailbox.py parties                 list known addresses

Messages are Markdown files with YAML-style frontmatter. Only simple `key: value` lines are read.
"""
import argparse
import datetime as dt
import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COUNTER = os.path.join(ROOT, "shared", ".counter")
TYPES = {"task", "report", "question", "decision-request", "decision", "review", "note"}
TERMINAL = {"done", "blocked", "superseded"}


def parties():
    out = ["owner"]
    agents = os.path.join(ROOT, "agents")
    if os.path.isdir(agents):
        out += sorted(d for d in os.listdir(agents) if os.path.isdir(os.path.join(agents, d)))
    return out


def inbox_of(party):
    if party == "owner":
        return os.path.join(ROOT, "owner", "inbox")
    return os.path.join(ROOT, "agents", party, "inbox")


def next_id():
    n = 0
    if os.path.exists(COUNTER):
        with open(COUNTER, encoding="utf-8") as f:
            n = int(f.read().strip() or 0)
    n += 1
    with open(COUNTER, "w", encoding="utf-8") as f:
        f.write(str(n))
    return f"MSG-{n:04d}"


def slugify(s):
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-").lower()
    return s[:48] or "msg"


def read_front(path):
    meta = {}
    with open(path, encoding="utf-8") as f:
        lines = f.read().splitlines()
    if not lines or lines[0].strip() != "---":
        return meta
    for line in lines[1:]:
        if line.strip() == "---":
            break
        m = re.match(r"^([A-Za-z_]+):\s*(.*)$", line)
        if m:
            meta[m.group(1)] = m.group(2).strip()
    return meta


def write_front(path, meta):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    parts = text.split("---", 2)
    if len(parts) < 3:
        return
    front_lines = []
    for line in parts[1].splitlines():
        m = re.match(r"^([A-Za-z_]+):", line)
        if m and m.group(1) in meta:
            front_lines.append(f"{m.group(1)}: {meta[m.group(1)]}")
        elif line.strip():
            front_lines.append(line)
    with open(path, "w", encoding="utf-8") as f:
        f.write("---\n" + "\n".join(front_lines) + "\n---" + parts[2])


def all_messages():
    found = []
    for p in parties():
        box = inbox_of(p)
        if not os.path.isdir(box):
            continue
        for name in sorted(os.listdir(box)):
            if name.endswith(".md"):
                path = os.path.join(box, name)
                meta = read_front(path)
                meta["_path"] = path
                meta["_inbox"] = p
                found.append(meta)
    return found


def cmd_new(a):
    if a.type not in TYPES:
        sys.exit(f"type must be one of {sorted(TYPES)}")
    known = parties()
    for who in (a.frm, a.to):
        if who not in known:
            sys.exit(f"unknown party {who!r}; known: {known}")
    mid = next_id()
    now = dt.datetime.now()
    fname = f"{now:%Y%m%d-%H%M}_{mid}_{a.frm}_to_{a.to}_{slugify(a.subject)}.md"
    dest = os.path.join(inbox_of(a.to), fname)
    needs_owner = "true" if (a.needs_owner or a.to == "owner" and a.type in {"decision-request", "question"}) else "false"
    body = f"""---
id: {mid}
from: {a.frm}
to: {a.to}
date: {now:%Y-%m-%dT%H:%M}
type: {a.type}
subject: {a.subject}
status: open
needs_owner: {needs_owner}
re: {a.re or ''}
refs: []
deadline: {a.deadline or ''}
submission: {a.submission or ''}
paper: {a.paper or ''}
---

## Body

{a.body or '<write the message here. Cite the tool run or document opened for every fact.>'}

## Evidence

- <path or URL, what it shows, executed|proposed>

## Done / Needs owner input / Next

- Done:
- Needs owner input:
- Next:
"""
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "w", encoding="utf-8") as f:
        f.write(body)
    print(dest)


def cmd_list(a):
    msgs = all_messages()
    if a.party:
        msgs = [m for m in msgs if m["_inbox"] == a.party]
    if not msgs:
        print("(no messages)")
        return
    for m in msgs:
        flag = " [OWNER]" if m.get("needs_owner") == "true" else ""
        print(f"{m.get('id','?'):9} {m.get('status','?'):11} {m.get('type','?'):16} {m['_inbox']:20} {m.get('subject','')}{flag}")


def cmd_archive(a):
    for m in all_messages():
        if m.get("id") == a.id:
            status = a.status or "done"
            if status not in TERMINAL:
                sys.exit(f"status must be one of {sorted(TERMINAL)}")
            write_front(m["_path"], {"status": status})
            month = dt.datetime.now().strftime("%Y-%m")
            dest_dir = os.path.join(ROOT, "archive", month)
            os.makedirs(dest_dir, exist_ok=True)
            dest = os.path.join(dest_dir, os.path.basename(m["_path"]))
            shutil.move(m["_path"], dest)
            print(f"{a.id} -> {status} -> {dest}")
            return
    sys.exit(f"{a.id} not found in any inbox")


def read_csv_rows(path):
    if not os.path.exists(path):
        return []
    import csv
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def cmd_board(a):
    msgs = all_messages()
    now = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
    lines = [f"# BOARD (generated {now} by scripts/mailbox.py board; do not hand-edit)", ""]

    owner = [m for m in msgs if m["_inbox"] == "owner"]
    lines += ["## Waiting on the owner", ""]
    if owner:
        lines += ["| id | type | subject | deadline | from |", "|---|---|---|---|---|"]
        for m in owner:
            lines.append(f"| {m.get('id')} | {m.get('type')} | {m.get('subject')} | {m.get('deadline','')} | {m.get('from')} |")
    else:
        lines.append("Nothing. The owner's inbox is empty.")
    lines.append("")

    lines += ["## Open by agent", ""]
    for p in parties():
        if p == "owner":
            continue
        mine = [m for m in msgs if m["_inbox"] == p]
        lines.append(f"### {p} ({len(mine)} open)")
        if mine:
            lines += ["", "| id | status | type | subject | deadline | from |", "|---|---|---|---|---|---|"]
            for m in mine:
                lines.append(f"| {m.get('id')} | {m.get('status')} | {m.get('type')} | {m.get('subject')} | {m.get('deadline','')} | {m.get('from')} |")
        lines.append("")

    log = read_csv_rows(os.path.join(ROOT, "shared", "registers", "submission-log.csv"))
    lines += ["## Submissions (from shared/registers/submission-log.csv)", ""]
    if log:
        lines += ["| id | target | send by | deadline | sent | ack | disposition |", "|---|---|---|---|---|---|---|"]
        for r in log:
            lines.append(f"| {r.get('sub_id','')} | {r.get('target','')} | {r.get('target_send_date','')} | {r.get('deadline_utc','')} | {r.get('sent_datetime_utc','') or '-'} | {r.get('ack_received_date','') or '-'} | {r.get('disposition','') or 'not sent'} |")
    lines.append("")

    dec_dir = os.path.join(ROOT, "shared", "decisions")
    decs = sorted(f for f in os.listdir(dec_dir) if f.endswith(".md")) if os.path.isdir(dec_dir) else []
    lines += ["## Owner decisions on file", ""]
    lines += [f"- {d}" for d in decs] or ["None filed yet."]
    lines.append("")

    with open(os.path.join(ROOT, "BOARD.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(os.path.join(ROOT, "BOARD.md"))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    n = sub.add_parser("new")
    n.add_argument("--from", dest="frm", required=True)
    n.add_argument("--to", required=True)
    n.add_argument("--type", required=True)
    n.add_argument("--subject", required=True)
    n.add_argument("--re", default="")
    n.add_argument("--deadline", default="")
    n.add_argument("--submission", default="")
    n.add_argument("--paper", default="")
    n.add_argument("--body", default="")
    n.add_argument("--needs-owner", action="store_true")
    n.set_defaults(fn=cmd_new)
    l = sub.add_parser("list")
    l.add_argument("party", nargs="?")
    l.set_defaults(fn=cmd_list)
    ar = sub.add_parser("archive")
    ar.add_argument("id")
    ar.add_argument("--status", default="done")
    ar.set_defaults(fn=cmd_archive)
    sub.add_parser("board").set_defaults(fn=cmd_board)
    sub.add_parser("parties").set_defaults(fn=lambda a: print("\n".join(parties())))
    a = ap.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
