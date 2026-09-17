from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse,unquote
import hashlib,json
root=Path(__file__).parent/'dist'
class Page(HTMLParser):
    def __init__(self):super().__init__();self.ids=[];self.refs=[];self.sections=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='section' and a.get('class')=='card':self.sections.append(a['id'])
        for key in ('href','src'):
            if key in a:self.refs.append(a[key])
for file in root.glob('*.html'):
    p=Page();p.feed(file.read_text(encoding='utf-8'));assert len(p.ids)==len(set(p.ids)),file
    assert len(p.sections)==16 and 'library' in p.sections and 'outcomes' in p.sections
    for ref in p.refs:
        u=urlparse(ref)
        if u.scheme or u.netloc:continue
        target=root/unquote(u.path) if u.path else file
        assert target.exists(),(file,ref)
        if u.fragment and target==file:assert u.fragment in p.ids,(file,ref)
assert 'htmx:error' not in (root/'assets/app.js').read_text(encoding='utf-8')
print('Static checks passed: all depth pages, 16 unique sections, separate outcomes, local assets and anchors.')
