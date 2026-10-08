from pathlib import Path
p=Path(r'C:\Users\FAC\Documents\_AI_builds_GPT\Presentations\nsf-convening')
s=(p/'build.py').read_text(encoding='utf-8-sig')
(p/'content.py').write_text(s.split('# ----------------------------------------------------------------------------\nCSS =')[0],encoding='utf-8')
css=s.split('CSS = r"""',1)[1].split('"""',1)[0]
(p/'dist/assets/style.css').write_text(css,encoding='utf-8')
