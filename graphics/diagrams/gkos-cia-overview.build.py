#!/usr/bin/env python3
"""Build an informative CIA/GKOS overview SVG and 2x PNG. Requires CairoSVG."""
from pathlib import Path
from html import escape
import cairosvg
W,H=1440,1000
out=[]
def text(x,y,t,size=22,color='#1F2A37',weight=400,anchor='start'):
    out.append(f'<text x="{x}" y="{y}" font-family="Arial, Helvetica, sans-serif" font-size="{size}" fill="{color}" font-weight="{weight}" text-anchor="{anchor}">{escape(t)}</text>')
def rect(x,y,w,h,fill,stroke='#D5DCE5'):
    out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{fill}" stroke="{stroke}"/>')
text(56,48,'SECURITY GOALS → GOVERNED KNOWLEDGE → ACCOUNTABLE USE',16,'#536780',700)
text(56,100,'The CIA triad, put into practice with GKOS',40,weight=700)
text(56,139,'Three objectives guide the controls. GKOS connects evidence, authority, decisions and outcomes.',22,'#536780')
out.append('<path d="M720 190 L260 408 L1180 408 Z" fill="#F4F7FB" stroke="#B5C4D5" stroke-width="3"/>')
rect(563,256,314,100,'#FFFFFF')
text(720,297,'GKOS',30,'#1F2A37',700,'middle');text(720,328,'Governance across all seven layers',17,'#536780',400,'middle')
for x,y,c,l in [(720,190,'#235FA5','C'),(260,408,'#36803B','I'),(1180,408,'#794DA5','A')]:
    out.append(f'<circle cx="{x}" cy="{y}" r="27" fill="{c}"/>');text(x,y+9,l,27,'#FFFFFF',700,'middle')
text(770,199,'Confidentiality',25,'#235FA5',700)
text(310,387,'Integrity',25,'#36803B',700)
text(1130,387,'Availability',25,'#794DA5',700,'end')
cols=[(56,'#235FA5','#E7F0FA','CONFIDENTIALITY','Who may receive it?',
       ['Protect against unauthorized','access and disclosure.'],['Authorize before disclosure.','Carry sensitivity and purpose limits.'],['Control / Refusal Receipts','Context and authority records'],['Access enforcement, encryption,','key management and leak tests.']),
      (505,'#36803B','#EAF5EF','INTEGRITY','What changed, and why?',
       ['Protect against improper change','or destruction of information.'],['Preserve evidence and lineage.','Bind decisions to exact context.'],['Source and Decision Records','Canonical hashes and change receipts'],['Protected storage and trust anchors,','tamper tests and source evaluation.']),
      (954,'#794DA5','#F1ECF8','AVAILABILITY','Can authorized work continue?',
       ['Support timely, reliable access','to information and its use.'],['Govern queues and record refusals.','Bind outcomes to recovery routes.'],['Use / Refusal Records','Replayable Context Manifests'],['Backups, redundancy, restore tests','and measured service objectives.'])]
for x,c,fill,title,q,goal,control,records,ops in cols:
    rect(x,465,430,417,fill)
    text(x+22,499,title,19,c,700);text(x+22,533,q,23,weight=700)
    for i,t in enumerate(goal):text(x+22,565+i*27,t,19)
    text(x+22,635,'GKOS FUNCTIONS',14,c,700)
    for i,t in enumerate(control):text(x+22,664+i*27,t,19)
    text(x+22,726,'EVIDENCE',14,c,700)
    for i,t in enumerate(records):text(x+22,754+i*27,t,18)
    text(x+22,807,'DEPLOYMENT ADDS',12,c,700)
    for i,t in enumerate(ops):text(x+22,831+i*25,t,17,'#536780')
text(56,925,'Governance records support security objectives. Deployments must enforce and test the outcomes.',23,weight=700)
text(56,960,'Informative mapping · GKOS v0.81 · NIST FIPS 199 §3 · No security or conformance guarantee',18,'#536780')
svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc"><title id="title">CIA triad and GKOS functions</title><desc id="desc">Confidentiality protects disclosure through authorization and sensitivity. Integrity preserves evidence and binds decisions to exact context. Availability supports authorized service through queue governance and recovery records. The lower lines of each card identify deployment controls still needed: encryption and access enforcement, protected records and tamper tests, backups and operational recovery. GKOS provides governance across all seven layers, not a guarantee of security or uptime.</desc><rect width="{W}" height="{H}" fill="white"/>'+''.join(out)+'</svg>\n'
base=Path(__file__).resolve().with_suffix('').with_suffix('')
base.with_suffix('.svg').write_text(svg)
cairosvg.svg2png(bytestring=svg.encode(),write_to=str(base.with_suffix('.png')),scale=2)
