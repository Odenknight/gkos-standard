"""Static pages with HTMX navigation; every reading level also works offline."""
from html import escape as e
import json, re
from hybrid import NOTES
from agenda import GROUPS, TOPICS, GROUP_INTRO
GUIDE='resources/resource-guide.pdf'
SBIR='resources/sbir-discussion.pdf'
AGENDA='https://www.widener.edu/sites/default/files/2026-09/Widener-NSF-NIC-Agenda-2026.pdf'
DEPTHS=('surface','mid','deep','notes')

def filename(slug,depth):
    if slug=='message': return {'surface':'index.html','mid':'mid.html','deep':'deep.html','notes':'notes.html'}[depth]
    return slug+('' if depth=='surface' else '-'+depth)+'.html'

def navlink(slug,depth,label,classes='',current=False,anchor='reading'):
    f=filename(slug,depth)
    active=' aria-current="page"' if current else ''
    return f'<a class="{classes}" href="{f}" hx-get="{f}" hx-target="#workspace" hx-select="#workspace" hx-swap="outerHTML settle:0ms" hx-sync="body:replace" data-anchor="{anchor}"{active}>{label}</a>'

def clean(s):
    # The shared agenda frame replaces repeated proposal/question callouts.
    return re.sub(r'<p class="(?:ask|question|measure)"[^>]*>.*?</p>','',s,flags=re.S)

def render(content,out,labels,path):
    by={c['slug']:c for c in content}
    memberships={s:g for g,(_,_,slugs) in GROUPS.items() for s in slugs}
    allslugs=['message',*GROUPS,*[c['slug'] for c in content if c['slug']!='message']]
    def priorities(slug,depth):
        selected=slug if slug in ('evidence','engage') else memberships.get(slug,slug)
        modules=[('message','Start'),('access','Access'),('capacity','Capacity'),('learning','Learning'),('map','Convening map'),('evidence','Evidence'),('engage','Engage')]
        links=''.join(navlink(g,depth,f'<span class="module-number">{i:02}</span><span>{name}</span>','rail-link '+('priority '+g if g in ('access','capacity','learning') else ''),g==selected,'topics') for i,(g,name) in enumerate(modules))
        return '<aside class="module-rail"><p class="eyebrow">Discussion notebook</p><nav aria-label="Notebook modules">'+links+'</nav><p class="rail-note">Choose a topic.<br>Set your reading depth.<br>Bring an example to the table.</p></aside>'
    def topics(slug,depth):
        group=memberships.get(slug,slug)
        if group not in GROUPS:
            name='Three priorities';caption='Three changes in five years';slugs=['access','capacity','learning']
        else:
            name,caption,slugs=GROUPS[group]
        tiles=[]
        for i,t in enumerate(slugs):
            label=TOPICS[t][0] if t in TOPICS else GROUPS[t][0] if t in GROUPS else by[t]['title']
            tiles.append(navlink(t,depth,f'<span class="tile-number">{i+1:02}</span><strong>{e(label)}</strong><span class="tile-arrow" aria-hidden="true">→</span>','topic tile',t==slug))
        return f'<nav id="topics" class="topics topic-bar" aria-label="{name} topics"><div class="topic-bar-heading"><strong>{name}</strong><span>{caption}</span></div><div class="topic-tiles">{"".join(tiles)}</div></nav>'
    def levelnav(slug,depth):
        return '<nav class="depth" aria-label="Reading depth">'+''.join(navlink(slug,d,labels[d],'depth-link',d==depth) for d in DEPTHS)+'</nav>'
    def overview(slug,depth):
        if slug=='message':
            title='Help useful work reach its next step.'
            body='<p class="lead">Three priorities for the next five years: widen access, build capacity, and make learning easier to use.</p><p>These are proposals drawn from my work in independent research, open-source software, and community partnerships. Choose a priority above, then a topic to bring into the discussion.</p>'
            body+='<div class="opening"><h2>A point to bring to the room</h2><p>Support should connect people to a useful next step—and leave enough evidence to show what that support changed.</p></div>'
            if depth!='surface':
                body+='<h2>From discussion to a practical pilot</h2><p>The convening asks us to name barriers, understand their causes, identify an intervention and its partners, and define progress. The three priorities above follow that structure.</p><p>Access focuses on supported referrals. Capacity focuses on engineering and validation. Learning focuses on reusable evidence and better decisions about continued support.</p>'
            if depth=='deep': body+=by['message']['deep']
            body+=f'<p class="source-note">Agenda connection: <a href="{GUIDE}#page=12">reflection questions, pp. 12–15</a>; <a href="{AGENDA}#page=5">breakout prompts and tracks, pp. 5–6</a>.</p>'
            return title,body
        title,intro,pilot,step,metric=GROUP_INTRO[slug]
        body=f'<p class="lead">{intro}</p><div class="opening"><h2>A pilot to discuss: {pilot.lower()}</h2><p>{step}</p><p><strong>Progress:</strong> {metric}</p></div>'
        if depth!='surface':
            bridges={'access':'The resource guide asks who faces barriers because of networks, location, institutional size, or access to infrastructure. Community relationships also belong in the innovation ecosystem.', 'capacity':'The guide describes the gap between knowing something and being able to use it. Translation may need organizational capability, validation, market readiness, and sustained partnerships as well as funding.', 'learning':'The SBIR handout presents competing views on repeated support. A productive discussion needs evidence of capability and transition, opportunities for newcomers, and clear reasons to continue or stop.'}
            body+=f'<h2>Why this belongs on the agenda</h2><p>{bridges.get(slug, 'Connect each example to a discussion question and an actionable next step.')}</p>'
        if depth=='deep':
            body+='<h2>Define the pilot before judging it</h2><p>Agree on the intended user, the barrier, a named owner, the starting conditions, and the evidence needed to judge progress. Preserve limitations and reasons for changing direction. A proposed pilot is not a funded program or a completed evaluation.</p>'
        body+=f'<p class="source-note">Convening prompt: <a href="{GUIDE}#page=15">three changes over the next five years, p. 15</a>. Select a topic above for the specific example, proposal, and evidence.</p>'
        return title,body
    def topicbody(slug,depth):
        c=by[slug]
        if slug not in TOPICS:
            body=''.join(c[d] for d in DEPTHS[:DEPTHS.index(depth)+1])
            return c['title'],body
        label,question,step,people,metric,page,track,stage=TOPICS[slug]
        body=f'<p class="agenda-question">{question}</p><h2>My example</h2>'+c['surface']
        if slug=='outcomes':
            body+='<p>The Mojo result illustrates how to report a mixed technical outcome. It is not an SBIR award evaluation and does not establish a case for continued funding.</p>'
        body+=f'<div class="proposal"><h2>A practical next step</h2><p>{step}</p><p><strong>Progress would mean:</strong> {metric}</p></div>'
        if depth!='surface':
            body+=f'<h2>Who needs to be involved</h2><p>{people}</p><p><strong>Research stage:</strong> {stage}.</p>'
            mid=clean(c['mid'])
            if mid.strip(): body+='<h2>More context</h2>'+mid
            if slug=='outcomes':
                body+='<h2>The SBIR discussion: hold both questions open</h2><p>Cohen, Feldman, and Stern emphasize mission, capability, and stable support. Schönander asks how the wider ecosystem and opportunities for newcomers affect translation. Katz puts more weight on commercialization and graduation. The Murphy interview emphasizes results, learning, and transition.</p><p>Together, these perspectives invite a stronger review question: what did another award or attempt change? Documented learning can complement commercial or mission progress; it is not an automatic reason to keep funding the same work.</p>'
        if depth=='deep':
            body+='<h2>Evidence and technical detail</h2>'+clean(c['deep'])
            body+=f'<details class="agenda-detail"><summary>Map this proposal to the breakout discussion</summary><dl><dt>Challenge</dt><dd>{question}</dd><dt>Cause to investigate</dt><dd>Use the example to identify the missing handoff, capability, or evidence. Test that explanation with affected participants; do not assume it applies to every institution.</dd><dt>Intervention</dt><dd>{step}</dd><dt>Stakeholders</dt><dd>{people}</dd><dt>Measure</dt><dd>{metric}</dd></dl></details>'
        sources=f'<a href="{GUIDE}#page={page}">Resource Guide, p. {page}</a>'
        if slug=='outcomes': sources+=f'; <a href="{SBIR}#page=1">SBIR participant handout, pp. 1–3</a>'
        body+=f'<p class="source-note">Agenda connection: {sources}. Suggested breakout: Track {track}. Track placement and proposals are my contributions; the handouts provide the discussion context.</p>'
        return label,body
    def article(slug,depth):
        reading_depth='surface' if depth=='notes' else depth
        title,body=overview(slug,reading_depth) if slug=='message' or slug in GROUPS else topicbody(slug,reading_depth)
        if depth=='notes':
            note=NOTES.get(slug, GROUP_INTRO.get(slug, ('','Choose a topic and offer one practical next step.'))[1])
            boundary=''.join(re.findall(r'<p class="scope">.*?</p>',by.get(slug,{}).get('surface',''),flags=re.S))
            body='<p class="spoken">'+e(note)+'</p>'+boundary
        group=memberships.get(slug,slug)
        kicker=GROUPS[group][0] if group in GROUPS else 'The discussion' if slug=='message' else 'Supporting material'
        if slug in TOPICS:
            related=[t for t in GROUPS[memberships[slug]][2] if t!=slug][:2]
            body+='<nav class="related-topics" aria-label="Related topics"><strong>Continue exploring</strong>'+''.join(navlink(t,depth,e(TOPICS[t][0] if t in TOPICS else by[t]['title'])) for t in related)+'</nav>'
        return f'<article id="reading" tabindex="-1" aria-labelledby="topic-title"><header class="article-head"><p class="eyebrow">{kicker}</p><h1 id="topic-title">{e(title)}</h1>{levelnav(slug,depth)}</header><div class="prose">{body}</div></article>',title
    def document(workspace,title,handout=False):
        return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>{e(title)} · Innovation Convening</title><meta name="description" content="Shaun Oden Marshall’s discussion notebook: access, capacity, and learning."><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/palettes.css"><script src="assets/htmx.min.js" defer></script><script src="assets/app.js" defer></script></head><body{' class="handout"' if handout else ''}><a class="skip" href="#reading">Skip to reading</a><div class="shell"><header class="masthead"><a class="brand" href="index.html">Oden <span>/</span> Innovation notebook</a><div class="toolbar"><label class="palette-control">Colors <select id="palette-select"><option value="sage">Sage</option><option value="ocean">Ocean</option><option value="copper">Copper</option></select></label><button id="theme-toggle" aria-pressed="false" type="button">Dark theme</button><button id="present-toggle" aria-pressed="false" type="button">Focus view</button><a href="handout.html">Full handout</a></div></header><div class="intro"><p class="eyebrow">National Innovation Convening · September 23–24, 2026</p><p>Shaun “Oden” Marshall <span>Independent research · Open-source software · Community partnerships</span></p></div><p id="load-status" role="status" aria-live="polite"></p>{workspace}<footer><p>Participant proposals for the Widener-led, NSF-funded convening. Project examples include documented results, work in development, and proposed pilots.</p><nav aria-label="Supporting material"><a href="evidence.html">Repository evidence</a><a href="engage.html">Pilot proposals</a><a href="{AGENDA}">Agenda</a><a href="{GUIDE}">Resource Guide</a><a href="{SBIR}">SBIR handout</a></nav></footer></div></body></html>'''
    for slug in allslugs:
        for depth in DEPTHS:
            art,title=article(slug,depth)
            order=[s for _,_,s in path]
            index=order.index(slug) if slug in order else 0
            controls='<div class="focus-controls"><span>Speaking path</span>'+navlink(order[(index-1)%len(order)],depth,'← Previous','previous')+navlink(order[(index+1)%len(order)],depth,'Next →','next')+'<small>Arrow keys to move · Esc to leave</small></div>'
            workspace=f'<main id="workspace" data-topic="{slug}" data-depth="{depth}" data-file="{filename(slug,depth)}">{priorities(slug,depth)}<div class="hub-stage">{topics(slug,depth)}<div class="reading-column">{controls}{art}</div></div></main>'
            (out/filename(slug,depth)).write_text(document(workspace,title),encoding='utf-8')
    sections=[]
    for c in content:
        title,body=overview('message','deep') if c['slug']=='message' else topicbody(c['slug'],'deep')
        sections.append(f'<section class="print-topic" id="{c["slug"]}"><h2>{e(title)}</h2><div class="prose">{body}</div></section>')
    handout='<main id="reading"><h1>Access, Capacity, Learning</h1><p>Complete discussion notebook · <button id="print-page" type="button">Print this handout</button></p>'+''.join(sections)+'</main>'
    (out/'handout.html').write_text(document(handout,'Complete discussion notebook',True),encoding='utf-8')
    (out/'assets/topics.json').write_text(json.dumps({'topics':allslugs,'depths':list(DEPTHS),'path':[s for _,_,s in path],'pages':[filename(s,d) for s in allslugs for d in DEPTHS]},indent=2),encoding='utf-8')
    print(f'Built {len(allslugs)*len(DEPTHS)} standalone topic/depth pages and one complete handout.')
