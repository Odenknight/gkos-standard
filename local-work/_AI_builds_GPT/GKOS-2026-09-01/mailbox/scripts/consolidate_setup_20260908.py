"""One-time, non-destructive consolidation; existing destinations are never overwritten."""
from pathlib import Path
import hashlib
import json
import os
import subprocess
import sys

root = Path(__file__).resolve().parents[2]
archive = root / 'mailbox/archive/2026-09/setup-consolidation'
receipt = root / 'mailbox/shared/evidence/MIGRATION-RECEIPT-2026-09-08.json'
if receipt.exists():
    raise SystemExit('Migration receipt already exists; inspect it instead of rerunning.')
mapping = {
 'mailbox/README.md': 'mailbox/archive/2026-09/setup-consolidation/PROTOCOL.md',
 'mailbox/WORK_QUEUE.md': 'mailbox/archive/2026-09/setup-consolidation/WORK_QUEUE.md',
 'mailbox/templates/MESSAGE.md': 'mailbox/archive/2026-09/setup-consolidation/MESSAGE.md',
 'mailbox/messages/20260908-coordinator-setup.md': 'mailbox/archive/2026-09/setup-consolidation/SETUP-HANDOFF.md',
 'evidence/SOURCE_REGISTER.md': 'mailbox/shared/evidence/INITIAL-SOURCE-REGISTER.md',
 'papers/RESEARCH_PLAN.md': 'papers/SHARED-RESEARCH-PLAN.md',
 'papers/CASE_STUDY_TEMPLATE.md': 'papers/CASE_STUDY_TEMPLATE.md',
 'notes/CAPTURE_TEMPLATE.md': 'papers/notes/CAPTURE_TEMPLATE.md',
 'submissions/TRACKER.md': 'mailbox/archive/2026-09/setup-consolidation/TRACKER.md',
 'START_HERE.md': 'mailbox/archive/2026-09/setup-consolidation/START_HERE.md',
}
for old, new in mapping.items():
    assert (root / 'submissions_papers' / old).is_file(), old
    assert not (root / new).exists(), new
records = []
for old, new in mapping.items():
    source = root / 'submissions_papers' / old
    dest = root / new
    data = source.read_bytes()
    updated = data
    if old == 'evidence/SOURCE_REGISTER.md':
        updated = data.decode('utf-8').replace('../_actionable/', '../../../submissions_papers/_actionable/').replace('../../output/', '../../../output/').encode('utf-8')
    if old == 'papers/RESEARCH_PLAN.md':
        updated = ('> Supplementary proposal migrated 2026-09-08. The canonical P-01/P-02/P-03 plan in README.md remains in effect; Paper A/B below are editorial options, not replacement assignments.\n\n' + data.decode('utf-8')).encode('utf-8')
    dest.parent.mkdir(parents=True, exist_ok=True)
    with dest.open('xb') as stream:
        stream.write(updated)
    assert dest.read_bytes() == updated
    canonical = dest if not str(dest).startswith(str(archive)) else root / 'mailbox/README.md'
    link = os.path.relpath(canonical, source.parent).replace('\\', '/')
    audit_link = os.path.relpath(root / 'mailbox/shared/evidence/MIGRATION-2026-09-08.md', source.parent).replace('\\', '/')
    source.write_text(f'# Consolidated into the project mailbox\n\nUse [the canonical document]({link}). This path is a compatibility pointer, not an active queue or protocol.\n\nSee [migration details]({audit_link}). Original content is preserved at `{new}`.\n', encoding='utf-8')
    records.append({'source': 'submissions_papers/' + old, 'destination': new, 'source_sha256': hashlib.sha256(data).hexdigest(), 'destination_sha256': hashlib.sha256(updated).hexdigest(), 'adjusted': data != updated})
receipt.write_text(json.dumps({'status': 'executed', 'files': records}, indent=2) + '\n', encoding='utf-8')
helper = root / 'mailbox/scripts/mailbox.py'
body = '''Read mailbox/shared/evidence/MIGRATION-2026-09-08.md and MIGRATION-RECEIPT-2026-09-08.json. Canonical protocol and board remain authoritative; duplicate setup files are archived with redirects. Unique source limitations, case/note templates and supplementary methods were migrated. Read papers/ORIGIN-TIMELINE-AND-BRIEF.md and its linked raw author account. Preserve H4R7W16 attribution; verify model IDs, OKF source and chronology before factual publication. This adds background for existing P-01/P-02/P-03, not replacement paper IDs.

## Done
Executed local consolidation; byte/hash checks recorded. Upstream GitHub and Reddit attribution sources opened; see VAULT-KOSMOS-ATTRIBUTION-2026-09-08.md.

## Needs owner input
No migration blocker. Later evidence work needs dated source artifacts and precise OKF/model references.

## Next
Reference the canonical changes in your next handoff; integrate the history as author recollection and keep performance claims tied to measured evidence.'''
for party in ['lead-correspondence', 'paper-editor', 'evidence-verifier']:
    out = subprocess.check_output([sys.executable, str(helper), 'new', '--from', 'lead-correspondence', '--to', party, '--type', 'report', '--subject', 'Mailbox consolidated and GKOS origin account captured', '--body', body], text=True).strip()
    path = Path(out)
    text = path.read_text(encoding='utf-8')
    text = text.split('\n## Evidence\n')[0] + '\n'
    path.write_text(text, encoding='utf-8')
    print(path)
subprocess.run([sys.executable, str(helper), 'board'], check=True)
print(f'Verified and consolidated {len(records)} files.')
