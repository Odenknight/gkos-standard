from pathlib import Path
root=Path(r'C:\Users\FAC\Documents\_AI_builds_GPT\Presentations\nsf-convening')
p=root/'build.py';s=p.read_text(encoding='utf-8-sig');s=s.replace("(OUT/'handout.html').write_text(handout,encoding='utf-8')",'''handout=handout.replace('<a href="handout.html">Print handout</a>','<button type="button" id="print-page">Print</button>')
    (OUT/'handout.html').write_text(handout,encoding='utf-8')''');p.write_text(s,encoding='utf-8')
p=root/'dist/assets/app.js';s=p.read_text(encoding='utf-8-sig').replace(" if(e.target.closest('#previous'))move(-1);"," if(e.target.closest('#print-page'))window.print();\n if(e.target.closest('#previous'))move(-1);");p.write_text(s,encoding='utf-8')
