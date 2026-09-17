"""Two selectable images per topic and a complete, non-destructive image appendix."""
from pathlib import Path
from html import escape as e
import json,re
ROOT=Path(__file__).parent
LIB=json.loads((ROOT/'image-library.json').read_text(encoding='utf-8'))
META=json.loads((ROOT/'static/graphics/manifest.json').read_text(encoding='utf-8'))

def figure(key,prefix):
    s=(ROOT/'static/graphics'/f'{key}.inline.html').read_text(encoding='utf-8')
    # Display adopts the current palette; original standalone artwork stays unchanged.
    for color,replacement in [('#0e7c78','var(--accent)'),('#72dfc1','var(--blue)'),('#5b4b8a','var(--gold)')]:s=s.replace(color,replacement)
    ids=re.findall(r'\bid="([^"]+)"',s)
    for old in sorted(set(ids),key=len,reverse=True):
        new=prefix+'-'+old
        s=s.replace(f'id="{old}"',f'id="{new}"').replace(f'#{old})',f'#{new})').replace(f'href="#{old}"',f'href="#{new}"')
    def aria(m):return m.group(1)+'="'+' '.join(prefix+'-'+x if x in ids else x for x in m.group(2).split())+'"'
    s=re.sub(r'(aria-labelledby|aria-describedby)="([^"]+)"',aria,s)
    return s

def image_module(topic):
    keys=LIB['topics'].get(topic,[])
    if not keys:return ''
    defaults=LIB['defaults'][topic]
    slots=[]
    for slot in range(2):
        selected=defaults[slot]
        options=''.join(f'<option value="{k}"'+(' selected' if k==selected else '')+'>'+e(f'{i+1:02} · '+META[k]['alt_title'])+'</option>' for i,k in enumerate(keys))
        templates=''.join(f'<template data-figure="{k}">{figure(k,f"{topic}-{slot}-{k}")}</template>' for k in keys)
        slots.append(f'<section class="image-slot" data-topic="{topic}" data-slot="{slot}"><div class="image-controls"><label>Image {slot+1}<select class="image-picker" aria-label="Choose image {slot+1}">{options}</select></label><button class="image-toggle" type="button" aria-expanded="true">Hide image</button></div><div class="image-stage">{figure(selected,f"{topic}-{slot}-shown")}</div>{templates}</section>')
    return '<section class="image-module" aria-label="Visual examples"><h2>Two ways to see the idea</h2><p class="image-note">Choose the illustrations that help you. Hiding or swapping an image keeps every option in the <a href="images.html">image appendix</a>. Choices are saved on this browser.</p><div class="image-slots">'+''.join(slots)+'</div><p class="image-note">These are explanatory illustrations, not additional experimental evidence. Concept drawings do not establish product readiness or physical feasibility.</p></section>'

def appendix():
    topics=LIB['topics']
    filters=''.join(f'<option value="{t}">{e(t.replace("-"," ").title())}</option>' for t in topics)
    cards=[]
    for i,(key,meta) in enumerate(META.items(),1):
        uses=[t for t,keys in topics.items() if key in keys]
        buttons=''.join(f'<button type="button" class="use-figure" data-figure="{key}" data-topic="{t}" data-slot="{slot}">Use as image {slot+1} in {e(t)}</button>' for t in uses for slot in range(2))
        cards.append(f'<section class="gallery-card" data-key="{key}" data-topics="{" ".join(uses)}"><header><h2>A.{i:02} · {e(meta["alt_title"])}</h2><button class="favorite-figure" type="button" data-key="{key}" aria-pressed="false">☆ Favorite</button></header>{figure(key,"appendix-"+key)}<p class="image-note">Topics: {e(", ".join(uses))}</p><details><summary>Use this image in a topic</summary><div class="use-buttons">{buttons}</div></details><p><a href="graphics/{key}.svg">Open original SVG</a></p></section>')
    return f'<main id="reading" class="image-appendix"><h1>Image appendix</h1><p>All {len(META)} distinct graphics are retained here. Several serve more than one topic. Explore different explanations, mark favorites, or choose which two appear in a topic. Illustrations express concepts; they do not add experimental findings.</p><div class="gallery-controls"><label>Topic <select id="gallery-topic"><option value="all">All topics</option>{filters}</select></label><label><input type="checkbox" id="favorites-only"> Favorites only</label><span id="gallery-count" role="status"></span></div><p id="gallery-empty" hidden>No images match this view. Try another topic or turn off Favorites only.</p><div class="gallery-grid">{"".join(cards)}</div></main>'
