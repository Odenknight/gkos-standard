#!/usr/bin/env python3
"""Validate local preparation records. No network or submission effects."""
import argparse, hashlib, json, pathlib, sys
from datetime import datetime
try:
    from jsonschema import Draft202012Validator, FormatChecker
except ImportError:
    sys.exit('Requires Python package jsonschema. Install it in your chosen isolated environment.')

def validate(data, schema, base, ready=False):
    errors=[]
    Draft202012Validator.check_schema(schema)
    errors += [f'{"/".join(map(str,e.absolute_path)) or "/"}: {e.message}' for e in Draft202012Validator(schema,format_checker=FormatChecker()).iter_errors(data)]
    if errors: return errors
    indexes={}
    for collection in ['sources','artifacts','evidence','claims','comments','baselines']:
        ids=[x['id'] for x in data[collection]]
        if len(ids)!=len(set(ids)): errors.append(f'Duplicate IDs in {collection}')
        indexes[collection]={x['id']:x for x in data[collection]}
    def check(collection,value,where):
        if value is not None and value not in indexes[collection]: errors.append(f'{where}: unknown {collection} ID {value}')
    check('sources',data['target']['deadline']['source_id'],'deadline')
    for b in data['baselines']:
        check('artifacts',b['artifact_id'],b['id'])
        if b['status']=='verified' and (not b['version'] or not b['repository_url'] or not b['commit'] or not b['artifact_id']): errors.append(f'{b["id"]}: verified baseline needs version, repository, commit and artifact')
    for e in data['evidence']:
        check('sources',e['source_id'],e['id']);check('artifacts',e['artifact_id'],e['id'])
        if e['match_basis']=='exact_bytes' and e['artifact_id'] is None: errors.append(f'{e["id"]}: exact_bytes needs an artifact')
    for c in data['claims']:
        check('sources',c['gkos_source_id'],c['id'])
        for i in c['evidence_ids']:check('evidence',i,c['id'])
        for r in c['comparisons']:check('sources',r['source_id'],c['id'])
        if c['status'] in ['documented','narrowed'] and (not c['gkos_source_id'] or not c['gkos_location'] or not c['evidence_ids']): errors.append(f'{c["id"]}: documented/narrowed claim needs source, location and evidence')
    for c in data['comments']:
        for i in c['evidence_ids']:check('evidence',i,c['id'])
        for i in c['claim_ids']:check('claims',i,c['id'])
        if c['example_status']=='executed' and not any(indexes['evidence'].get(i,{}).get('kind')=='test_result' for i in c['evidence_ids']): errors.append(f'{c["id"]}: executed example needs test-result evidence')
    seen=set();previous=None
    for e in data['events']:
        check('artifacts',e['artifact_id'],'event')
        t=datetime.fromisoformat(e['at'].replace('Z','+00:00'))
        if previous and t<previous:errors.append('Events must be chronological')
        if e['kind']!='sent' and 'sent' not in seen:errors.append('External outcomes require an earlier sent event')
        seen.add(e['kind']);previous=t
    if data['state'] in ['sent','acknowledged','posted','adopted','rejected','withdrawn'] and data['state'] not in seen:errors.append('State requires matching retained event evidence')
    if data['state'] in ['draft','ready'] and data['events']:errors.append('Draft/ready state cannot include submission events')
    disposition=data['author_disposition']
    for i in disposition['outbound_artifact_ids']:check('artifacts',i,'disposition')
    if disposition['status']=='approved' and (not disposition['by'] or not disposition['at'] or not disposition['outbound_artifact_ids']):errors.append('Approval requires actor, timestamp and outbound artifact IDs')
    for a in data['artifacts']:
        path=(base/a['path']).resolve()
        if not path.is_relative_to(base.resolve()):errors.append(f'{a["id"]}: artifact path must stay inside record directory');continue
        if not path.is_file():errors.append(f'{a["id"]}: local file missing');continue
        raw=path.read_bytes()
        if len(raw)!=a['size_bytes'] or hashlib.sha256(raw).hexdigest()!=a['sha256']:errors.append(f'{a["id"]}: byte count or SHA-256 mismatch')
    if ready or data['state'] not in ['draft']:
        if any(b['status']=='unresolved' for b in data['baselines']):errors.append('Readiness: resolve or remove uncited baselines')
        if data['open_items']:errors.append('Readiness: unresolved open_items')
        if not data['author']['public_email']:errors.append('Readiness: supply public contact')
        if not data['target']['verified_on'] or data['target']['deadline']['rule']=='reconfirm':errors.append('Readiness: verify route and deadline instructions')
        if not data['ai_assistance']['review_completed'] or not data['ai_assistance']['human_checks']:errors.append('Readiness: completed human review required')
        if data['ai_assistance']['used'] and not data['ai_assistance']['tools_and_tasks']:errors.append('Readiness: identify AI assistance')
        outbound={a['id'] for a in data['artifacts'] if a['purpose']=='outbound'}
        if not outbound or outbound!=set(disposition['outbound_artifact_ids']) or disposition['status']!='approved':errors.append('Readiness: approve exact nonempty outbound artifact set')
        if data['target']['channel'] in ['nist_ai_300_1','nist_ai_200_2','nvd','nist_sp_1353'] and not data['comments']:errors.append('Readiness: comment channel requires comments')
    return errors

def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('record',type=pathlib.Path);p.add_argument('--ready',action='store_true');args=p.parse_args()
    schema=json.loads((pathlib.Path(__file__).parent/'submission.schema.json').read_text())
    data=json.loads(args.record.read_text());errors=validate(data,schema,args.record.resolve().parent,args.ready)
    if errors:
        print('\n'.join('ERROR: '+e for e in errors));return 1
    print('PASS: structure, references and available local artifact bytes'+('; readiness checks passed' if args.ready else '. Readiness not asserted for draft records.'));return 0
if __name__=='__main__':sys.exit(main())
