from pathlib import Path
import csv, json, urllib.request
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter
P=Path(__file__).parent
SBA='https://www.sbir.gov/sites/default/files/SBA_FY22_SBIR_STTR_Annual_Report.pdf'
NSF='https://seedfund.nsf.gov/assets/files/press/overview.pdf'
rows=[['FY2022','SBIR','Phase I',62484586,245],['FY2022','SBIR','Phase II',133536202,114],['FY2022','STTR','Phase I',20291798,79],['FY2022','STTR','Phase II',7928046,7]]
with (P/'nsf-funding.csv').open('w',newline='') as f:
 w=csv.writer(f);w.writerow(['fiscal_year','program','phase','obligations_usd','new_awards']);w.writerows(rows)
with (P/'nsf-business-profile.csv').open('w',newline='') as f:
 w=csv.writer(f);w.writerow(['fiscal_year','population','metric','percent']);w.writerows([['FY2024','255 Phase I businesses',k,v] for k,v in [('Fewer than 10 employees',96),('Created in last 5 years',74),('New to NSF',62)]])
assert sum(r[3] for r in rows)==224240632
assert 202553284+28643860==231197144
notes='''# NSF small-business funding metrics
Retrieved 2026-09-24. All dollars are nominal U.S. dollars.

## FY2022 funding — SBA annual report, tables 2 and 8 (printed pages 10 and 21)
NSF total program obligations: SBIR $202,553,284; STTR $28,643,860; combined $231,197,144.
Phase I and II award obligations total $224,240,632. The remaining $6,956,512 consists of agency-provided technical/business assistance ($1,528,822) and SBIR administrative funding ($5,427,690). Award-embedded assistance is already included; do not add it again. Program obligations are commitments, not cash disbursements or only grants to companies.
SBIR new awards: Phase I 245, Phase II 114. STTR new awards: Phase I 79, Phase II 7. These are awards, not unique businesses. Award obligations may cover more than new awards, so dividing dollars by new awards would not give a reliable average new award.
Funding source: '''+SBA+'''
SBA report index (FY2022 is the newest annual report listed when retrieved): https://www.sbir.gov/impact/impact-reports

## FY2024 business profile — NSF overview, page 2
255 small businesses received Phase I awards. 96% had fewer than 10 employees; 74% were created in the last five years; 62% were new to NSF. Percentages overlap and are rounded; do not sum them or infer exact company counts. This is an awardee profile, not an acceptance rate, impact estimate, or trend against FY2022.
Profile source: '''+NSF+'''

## Reading the charts
SBIR: Small Business Innovation Research. STTR: Small Business Technology Transfer.
Funding and profile charts have different reporting years and denominators. No 2025 or 2026 actual funding total is asserted. No commercial return or causal impact is inferred. These programs are a subset of small-business funding, not all federal assistance.
Discussion prompts: Access — what support helps first-time applicants? Capacity — what infrastructure can very small teams share? Evidence — what milestones demonstrate progress toward technical and commercial goals?
'''
(P/'SOURCES.md').write_text(notes,encoding='utf-8')
for mode,bg,fg,muted,grid,blue,gold in [('light','#ffffff','#141820','#505b6b','#dde2e9','#225db1','#b78013'),('dark','#11151d','#f3f5f8','#bac4d2','#354052','#74a9ff','#e5ba57')]:
 plt.rcParams.update({'font.family':'DejaVu Sans','font.size':13,'text.color':fg,'axes.labelcolor':fg,'xtick.color':muted,'ytick.color':fg,'axes.edgecolor':grid,'svg.fonttype':'none','text.parse_math':False})
 fig,ax=plt.subplots(figsize=(12,6.6),facecolor=bg);ax.set_facecolor(bg)
 fig.text(.07,.93,'NSF small-business research funding',fontsize=24,weight='bold')
 fig.text(.07,.875,'FY2022 • Phase I and II award obligations • millions of dollars',fontsize=13,color=muted)
 vals=[[62.484586,133.536202],[20.291798,7.928046]]
 for y,(a,b) in enumerate(vals):
  ax.barh(y,a,color=blue,height=.48,label='Phase I' if y==0 else None)
  ax.barh(y,b,left=a,color=gold,height=.48,label='Phase II' if y==0 else None)
  ax.text(a+b+3,y,f'${a+b:.1f}M',va='center',weight='bold',fontsize=15)
 ax.set_yticks([0,1],['SBIR','STTR']);ax.invert_yaxis();ax.set_xlim(0,230);ax.set_ylim(1.6,-.7)
 ax.xaxis.set_major_formatter(FuncFormatter(lambda x,p:f'${x:.0f}M'));ax.set_xticks([0,50,100,150,200]);ax.grid(axis='x',color=grid);ax.set_axisbelow(True)
 for s in ax.spines.values():s.set_visible(False)
 ax.tick_params(length=0,pad=10);ax.legend(loc='lower right',frameon=False,labelcolor=fg)
 fig.text(.07,.20,'$224.2M in Phase I/II awards  |  $231.2M including program support',fontsize=14,weight='bold')
 fig.text(.07,.13,'SBIR: $62.5M Phase I + $133.5M Phase II. STTR: $20.3M Phase I + $7.9M Phase II.',fontsize=11,color=muted)
 fig.text(.07,.075,'Source: SBA FY2022 SBIR/STTR Annual Report, tables 2 and 8. Nominal dollars; obligations, not payouts.\nLatest annual report listed by SBA as of September 24, 2026. Full sources and exact values accompany this chart.',fontsize=10,color=muted)
 fig.subplots_adjust(left=.12,right=.96,top=.78,bottom=.32)
 for ext in ['png','svg']:fig.savefig(P/f'nsf-funding-{mode}.{ext}',dpi=180,facecolor=bg)
 plt.close(fig)
 fig,ax=plt.subplots(figsize=(12,6.6),facecolor=bg);ax.set_facecolor(bg)
 fig.text(.07,.93,'Small teams. Many first-time NSF recipients.',fontsize=24,weight='bold')
 fig.text(.07,.875,'FY2024 • Profile of 255 small businesses receiving NSF Phase I awards',fontsize=13,color=muted)
 labels=['Fewer than 10 employees','Created in the last 5 years','New to NSF'];values=[96,74,62]
 ax.barh(range(3),values,color=[blue,gold,blue],height=.5)
 for i,v in enumerate(values):ax.text(v+1.5,i,f'{v}%',va='center',weight='bold',fontsize=16)
 ax.set_yticks(range(3),labels);ax.invert_yaxis();ax.set_xlim(0,108);ax.set_xticks([0,25,50,75,100],['0%','25%','50%','75%','100%']);ax.grid(axis='x',color=grid);ax.set_axisbelow(True)
 for s in ax.spines.values():s.set_visible(False)
 ax.tick_params(length=0,pad=10)
 fig.text(.07,.15,'Discussion: What support helps small teams turn research into a working business?',fontsize=14,weight='bold')
 fig.text(.07,.075,'Source: NSF America’s Seed Fund overview, page 2, FY2024 awardee profile. Retrieved September 24, 2026.\nCategories overlap; percentages are rounded. These figures do not measure selection rates or business outcomes.',fontsize=10,color=muted)
 fig.subplots_adjust(left=.32,right=.94,top=.76,bottom=.29)
 for ext in ['png','svg']:fig.savefig(P/f'nsf-business-profile-{mode}.{ext}',dpi=180,facecolor=bg)
 plt.close(fig)
trs=''.join(f'<tr><td>{r[1]}</td><td>{r[2]}</td><td>${r[3]:,}</td><td>{r[4]}</td></tr>' for r in rows)
html='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NSF funding metrics</title><style>:root{color-scheme:light dark}body{font:18px/1.6 system-ui;max-width:1100px;margin:auto;padding:24px}h1{line-height:1.2}img{width:100%;height:auto}a{color:light-dark(#225db1,#91bcff)}nav{display:flex;gap:20px;flex-wrap:wrap}table{border-collapse:collapse;width:100%;font-size:16px}th,td{text-align:left;padding:12px;border-bottom:1px solid #888}summary{cursor:pointer;font-weight:bold}section{margin:30px 0}button{padding:10px;font:inherit}</style><h1>NSF small-business funding</h1><p>Funding scale and the businesses it reaches. Each chart identifies its reporting year.</p><nav><a href="nsf-funding-light.svg" download>Funding SVG</a><a href="nsf-business-profile-light.svg" download>Business profile SVG</a><a href="nsf-funding.csv" download>Funding CSV</a><a href="nsf-business-profile.csv" download>Profile CSV</a><a href="SOURCES.md">Sources & methods</a></nav>'''
for stem,alt in [('nsf-funding','FY2022 NSF Phase I and II obligations: SBIR 196.0 million dollars; STTR 28.2 million dollars.'),('nsf-business-profile','FY2024 NSF Phase I businesses: 96 percent fewer than 10 employees, 74 percent created in the last five years, 62 percent new to NSF.')]:
 html+=f'<section><picture><source media="(prefers-color-scheme: dark)" srcset="{stem}-dark.svg"><img src="{stem}-light.svg" alt="{alt}"></picture></section>'
html+='<details><summary>Exact FY2022 funding and new awards</summary><table><thead><tr><th>Program</th><th>Phase</th><th>Obligations</th><th>New awards</th></tr></thead><tbody>'+trs+'</tbody></table><p>New awards are not unique companies. Obligations can include support for existing awards. Total program obligations include $6,956,512 in agency assistance and administrative funding beyond these Phase I/II amounts.</p></details>'
html+=f'<p>Sources: <a href="{SBA}">SBA FY2022 annual report, tables 2 and 8</a>; <a href="{NSF}">NSF FY2024 awardee profile, page 2</a>. Retrieved September 24, 2026.</p><p>The newest annual funding report listed by SBA is FY2022. The FY2024 profile describes a different population and is not a funding trend. Categories overlap. SBIR/STTR are only part of small-business funding.</p></html>'
(P/'index.html').write_text(html,encoding='utf-8')
print('Created four chart variants in PNG/SVG, two CSV datasets, source notes, and accessible HTML.')

