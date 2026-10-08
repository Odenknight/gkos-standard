const { chromium } = require('C:/Users/FAC/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage(); const events=[];
 p.on('request',r=>{if(r.url().includes('fragments'))events.push(['request',r.url()])});
 p.on('requestfailed',r=>events.push(['failed',r.url(),r.failure()]));
 await p.goto('http://127.0.0.1:8767/');
 await p.evaluate(()=>{window.nicEvents=[];const old=EventTarget.prototype.dispatchEvent;EventTarget.prototype.dispatchEvent=function(e){if(e.type.startsWith('htmx'))window.nicEvents.push(e.type);return old.call(this,e)}});
 await p.locator('button[data-depth=deep]').click(); await p.waitForFunction(()=>document.querySelector('#modernization .body').textContent.length>1000);
 await p.route('**/fragments/**/mid.html',r=>r.abort()); await p.locator('button[data-depth=mid]').click();
 await p.waitForFunction(()=>window.nicEvents.some(t=>/error/i.test(t)),{timeout:4000}).catch(()=>{});
 console.log(JSON.stringify({requests:events.filter(e=>e[1].includes('modernization')),events:await p.evaluate(()=>[...new Set(window.nicEvents)]),error:await p.locator('.body.error').count(),depth:await p.locator('html').getAttribute('data-depth'),chars:(await p.locator('#modernization .body').innerText()).length},null,2));
 await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
