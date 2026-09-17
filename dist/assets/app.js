/* Native links remain the fallback; HTMX replaces one complete, consistent view. */
(()=>{
  const root=document.documentElement;
  if(window.htmx)htmx.config.history=false;
  const workspace=()=>document.querySelector('#workspace');
  const status=document.querySelector('#load-status');
  let pendingAnchor='reading';
  try{root.dataset.theme=localStorage.getItem('innovation-theme')||'light'}catch{}
  const themeButton=document.querySelector('#theme-toggle');
  function themeLabel(){const dark=root.dataset.theme==='dark';themeButton.textContent=dark?'Light theme':'Dark theme';themeButton.setAttribute('aria-pressed',String(dark))}
  themeLabel();
  themeButton.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('innovation-theme',root.dataset.theme)}catch{}themeLabel()});
  const focusButton=document.querySelector('#present-toggle');
  function setFocus(value){document.body.classList.toggle('focus',value);focusButton.setAttribute('aria-pressed',String(value));focusButton.textContent=value?'Leave focus view':'Focus view';try{sessionStorage.setItem('innovation-focus',String(value))}catch{}}
  try{setFocus(sessionStorage.getItem('innovation-focus')==='true')}catch{}
  focusButton.addEventListener('click',()=>setFocus(!document.body.classList.contains('focus')));
  document.querySelector('#print-page')?.addEventListener('click',()=>window.print());
  if(!workspace())return;
  // File URLs do not support AJAX. All destinations are complete HTML pages.
  if(location.protocol==='file:')document.querySelectorAll('[hx-get]').forEach(el=>el.removeAttribute('hx-get'));
  document.addEventListener('htmx:before:request',event=>{pendingAnchor=event.detail.ctx.sourceElement.dataset.anchor||'reading';status.textContent='Loading…'});
  document.addEventListener('htmx:after:swap',event=>{
    if(event.detail.ctx.target.id!=='workspace')return;
    const view=workspace();const url=new URL(view.dataset.file,location.href);url.hash=pendingAnchor;
    if(url.href!==location.href)history.pushState({},'',url);
    document.title=document.querySelector('#topic-title').textContent+' · Innovation Convening';
    status.textContent='';
    const target=document.getElementById(pendingAnchor)||document.querySelector('#reading');
    target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({block:'start'});
  });
  for(const name of ['response:error','error'])document.addEventListener('htmx:'+name,()=>{status.textContent='This view could not load. Your current topic and reading depth are unchanged. Please try again.'});
  document.addEventListener('htmx:before:swap',event=>{if(event.detail.ctx.response?.status>=400){event.preventDefault();event.detail.ctx.title=document.title;}});
  addEventListener('popstate',()=>location.reload());
  addEventListener('keydown',event=>{
    if(!document.body.classList.contains('focus')||event.ctrlKey||event.altKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName))return;
    if(event.key==='Escape')setFocus(false);
    if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();document.querySelector(event.key==='ArrowRight'?'.next':'.previous')?.click()}
  });
})();
