from pathlib import Path
p=Path(r'C:\Users\FAC\Documents\_AI_builds_GPT\Presentations\nsf-convening\build.py')
s=p.read_text(encoding='utf-8').replace('hx-swap="outerHTML"','hx-swap="outerHTML settle:0ms"')
p.write_text(s,encoding='utf-8')
