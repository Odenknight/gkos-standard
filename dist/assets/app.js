(()=>{
'use strict';
const path=['message','pathway','assistance','modernization','outcomes','gkos','fac','engage'];
const labels={surface:'Quick read',mid:'More context',deep:'Technical detail'};
let active='message', pendingTopic='message';
const reader=()=>document.getElementById('reader');
const cards=()=>[...document.querySelectorAll('.card')];
const status=()=>document.getElementById('load-status');
const isPresent=()=>new URL(location.href).searchParams.get('view')==='present';
function topic(){const id=location.hash.slice(1);return document.getElementById(id)?.classList.contains('card')?id:active;}
function updateLinks(){
 document.querySelectorAll('.depth-link').forEach(a=>{const u=new URL(a.getAttribute('hx-get'),location.href);u.search=isPresent()?'?view=present':'';u.hash=active;a.href=u.href;a.setAttribute('hx-get',u.pathname.split('/').pop()+u.search+u.hash)});
 document.querySelectorAll('.side a.chapter').forEach(a=>{if(a.hash==='#'+active)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
}
function showTopic(focus=false){
 active=topic();const presenting=isPresent();document.body.classList.toggle('present',presenting);
 const t=document.getElementById('present-toggle');t.setAttribute('aria-pressed',String(presenting));t.textContent=presenting?'Reading view':'Speaking view';
 document.querySelector('.present-controls').hidden=!presenting;
 cards().forEach(c=>c.classList.toggle('current',c.id===active));
 const n=path.indexOf(active);document.getElementById('step-count').textContent=n<0?'Roundtable topic':`${n+1} of ${path.length}`;
 document.getElementById('previous').disabled=n===0;document.getElementById('next').disabled=n===path.length-1;
 updateLinks();
 if(focus){const c=document.getElementById(active);c.focus({preventScroll:true});c.scrollIntoView({block:'start',behavior:'instant'})}
}
function initialize(){
 document.querySelector('.topic-menu').open=matchMedia('(min-width:901px)').matches;
 document.querySelectorAll('.tablewrap').forEach(el=>{el.tabIndex=0;el.setAttribute('role','region');el.setAttribute('aria-label','Scrollable evidence table')});
 showTopic();

 if(location.protocol==='file:')document.querySelectorAll('.depth-link').forEach(a=>a.removeAttribute('hx-get'));
}
function move(delta){let n=path.indexOf(active);n=n<0?0:Math.max(0,Math.min(path.length-1,n+delta));location.hash=path[n];}
function theme(){const pref=document.documentElement.dataset.theme;return pref?pref==='dark':matchMedia('(prefers-color-scheme:dark)').matches}
function themeLabel(){const t=document.getElementById('theme-toggle');t.setAttribute('aria-pressed',String(theme()));t.textContent=theme()?'Light theme':'Dark theme'}
try{const t=localStorage.getItem('nic-theme');if(['light','dark'].includes(t))document.documentElement.dataset.theme=t}catch{}
themeLabel();initialize();
document.addEventListener('click',e=>{
 const depth=e.target.closest('.depth-link');if(depth){pendingTopic=active;status().textContent='';return}
 if(e.target.closest('#theme-toggle')){const t=theme()?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('nic-theme',t)}catch{}themeLabel()}
 if(e.target.closest('#present-toggle')){const u=new URL(location.href);if(isPresent())u.searchParams.delete('view');else u.searchParams.set('view','present');u.hash=active;history.pushState(null,'',u);showTopic(true)}
 if(e.target.closest('#print-page'))window.print();
 if(e.target.closest('#previous'))move(-1);
 if(e.target.closest('#next'))move(1);
 if(e.target.closest('.side a.chapter')){if(matchMedia('(max-width:900px)').matches)document.querySelector('.topic-menu').open=false;requestAnimationFrame(()=>showTopic(true))}
},true);
window.addEventListener('hashchange',()=>showTopic(true));
window.addEventListener('popstate',()=>{const file=location.pathname.split('/').pop()||'index.html';if(file!==reader().dataset.file && !document.body.classList.contains('handout')){location.reload();return}showTopic()});
document.addEventListener('keydown',e=>{if(!isPresent()||e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,select,summary'))return;if(e.key==='ArrowRight'){e.preventDefault();move(1)}if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}if(e.key==='Escape'){document.getElementById('present-toggle').click()}});
document.addEventListener('htmx:beforeRequest',e=>{if(!e.detail.elt.classList.contains('depth-link'))return;status().textContent='Loading '+e.detail.elt.textContent.trim()+'…';reader().setAttribute('aria-busy','true')});
document.addEventListener('htmx:afterSwap',e=>{if(e.detail.target.id!=='reader')return;reader().removeAttribute('aria-busy');const u=new URL(reader().dataset.file,location.href);if(isPresent())u.searchParams.set('view','present');u.hash=pendingTopic;history.pushState(null,'',u);active=pendingTopic;status().textContent='';initialize();showTopic(true);document.querySelector('.depth-link[aria-current=true]')?.focus({preventScroll:true});document.title='Access, Capacity, Learning — '+labels[reader().dataset.depth]});
function failed(e){if(!e.detail.elt?.classList.contains('depth-link'))return;reader().removeAttribute('aria-busy');status().textContent='The requested view could not load. Still showing '+labels[reader().dataset.depth]+'. Select a reading level to retry.';}
['htmx:responseError','htmx:sendError','htmx:timeout','htmx:swapError'].forEach(name=>document.addEventListener(name,failed));
if(window.htmx){htmx.config.timeout=10000;htmx.config.allowEval=false;htmx.config.allowScriptTags=false;htmx.config.historyCacheSize=0;}
})();


