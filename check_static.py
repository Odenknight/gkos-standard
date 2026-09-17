from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse,unquote
import json
root=Path(__file__).parent/'dist'
class Page(HTMLParser):
    def __init__(self):super().__init__();self.ids=[];self.refs=[];self.articles=0;self.sections=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='article':self.articles+=1
        if tag=='section' and a.get('class')=='print-topic':self.sections+=1
        for key in ('href','src'):
            if key in a:self.refs.append(a[key])
pages={}
for file in root.glob('*.html'):
    p=Page();p.feed(file.read_text(encoding='utf-8'));pages[file.name]=p
    assert len(p.ids)==len(set(p.ids)),(file,'duplicate ids')
    assert p.articles==(0 if file.name=='handout.html' else 1),(file,p.articles)
for name,p in pages.items():
    for ref in p.refs:
        u=urlparse(ref)
        if u.scheme or u.netloc:continue
        target=root/unquote(u.path) if u.path else root/name
        assert target.exists(),(name,ref)
        if u.fragment and target.suffix=='.html':assert u.fragment in pages[target.name].ids,(name,ref)
assert len(pages)==101,len(pages)
assert pages['handout.html'].sections==21
print('Passed: 100 standalone views, 21-topic full handout, unique IDs, every local asset and cross-page anchor.')
