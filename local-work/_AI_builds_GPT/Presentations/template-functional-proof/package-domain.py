"""Create hosting and editable-source archives without platform metadata."""
from pathlib import Path
import hashlib,zipfile
ROOT=Path(__file__).parent
DEST=ROOT.parent
files=sorted(p for p in (ROOT/'dist').rglob('*') if p.is_file())
hashes=''.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  site/'+p.relative_to(ROOT/'dist').as_posix()+'\n' for p in files)
with zipfile.ZipFile(DEST/'NSF-Convening-domain.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p in files:z.write(p,'site/'+p.relative_to(ROOT/'dist').as_posix())
    z.write(ROOT/'DEPLOY.md','DEPLOY.md')
    z.writestr('SHA256SUMS.txt',hashes)
source=['content.py','build.py','agenda.py','render.py','hybrid.py','fable-content.json','DEPLOY.md']
with zipfile.ZipFile(DEST/'NSF-Convening-source.zip','w',zipfile.ZIP_DEFLATED) as z:
    for name in source:z.write(ROOT/name,name)
    for p in files:
        rel=p.relative_to(ROOT/'dist')
        if rel.parts[0] in ('assets','resources'):z.write(p,'static/'+rel.as_posix())
    z.writestr('README.md','# Rebuild the notebook\n\nRun `python build.py` using Python 3.10 or later. No packages are needed. The generated website is `dist/`. Upload its contents to the domain folder described in DEPLOY.md.\n\nThe imported Fable contributions are in fable-content.json; hybrid.py merges them with the retained factual corrections in build.py and the agenda map in agenda.py. render.py generates full topic/depth pages and the complete handout. Assets and supplied PDFs are included. No credentials, private hosting configuration, or Git history are included.\n')
print('Created domain and editable-source ZIPs:',len(files),'site files.')
