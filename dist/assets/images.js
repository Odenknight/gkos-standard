(()=>{
 const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
 const save=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
 const slotKey=el=>'innovation-image:'+el.dataset.topic+':'+el.dataset.slot;
 function showSlot(el,prefs){
  const picker=el.querySelector('.image-picker');
  if(prefs.key&&[...picker.options].some(o=>o.value===prefs.key))picker.value=prefs.key;
  const source=[...el.querySelectorAll('template[data-figure]')].find(t=>t.dataset.figure===picker.value);
  const stage=el.querySelector('.image-stage');if(source)stage.replaceChildren(source.content.cloneNode(true));
  const visible=prefs.visible!==false;stage.hidden=!visible;
  const button=el.querySelector('.image-toggle');button.textContent=visible?'Hide image':'Show image';button.setAttribute('aria-expanded',String(visible));
 }
 function initialize(){document.querySelectorAll('.image-slot').forEach(el=>showSlot(el,read(slotKey(el),{})));updateGallery()}
 function updateGallery(){
  const topic=document.querySelector('#gallery-topic')?.value||'all';
  const only=document.querySelector('#favorites-only')?.checked;
  const favorites=read('innovation-image-favorites',[]);let count=0;
  document.querySelectorAll('.gallery-card').forEach(card=>{
   const favorite=favorites.includes(card.dataset.key);const button=card.querySelector('.favorite-figure');button.setAttribute('aria-pressed',String(favorite));button.textContent=favorite?'★ Favorite':'☆ Favorite';
   card.hidden=!(topic==='all'||card.dataset.topics.split(' ').includes(topic))||(only&&!favorite);if(!card.hidden)count++;
  });
  const label=document.querySelector('#gallery-count');if(label)label.textContent=count+' images';
  const empty=document.querySelector('#gallery-empty');if(empty)empty.hidden=count>0;
 }
 document.addEventListener('change',event=>{
  if(event.target.matches('.image-picker')){const el=event.target.closest('.image-slot');const prefs={key:event.target.value,visible:true};save(slotKey(el),prefs);showSlot(el,prefs)}
  if(event.target.matches('#gallery-topic,#favorites-only'))updateGallery();
 });
 document.addEventListener('click',event=>{
  const toggle=event.target.closest('.image-toggle');if(toggle){const el=toggle.closest('.image-slot');const prefs={key:el.querySelector('.image-picker').value,visible:el.querySelector('.image-stage').hidden};save(slotKey(el),prefs);showSlot(el,prefs)}
  const favorite=event.target.closest('.favorite-figure');if(favorite){let keys=read('innovation-image-favorites',[]);keys=keys.includes(favorite.dataset.key)?keys.filter(k=>k!==favorite.dataset.key):[...keys,favorite.dataset.key];save('innovation-image-favorites',keys);updateGallery()}
  const use=event.target.closest('.use-figure');if(use){save('innovation-image:'+use.dataset.topic+':'+use.dataset.slot,{key:use.dataset.figure,visible:true});location.href=use.dataset.topic==='message'?'index.html':use.dataset.topic+'.html'}
 });
 document.addEventListener('htmx:after:swap',initialize);initialize();
})();
