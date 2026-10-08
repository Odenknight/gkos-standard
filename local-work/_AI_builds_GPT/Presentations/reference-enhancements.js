/* Presentation controls; no changes to experimental evidence. */
(() => {
  'use strict';
  const theme = document.getElementById('theme-toggle');
  const media = matchMedia('(prefers-color-scheme: dark)');
  function isDark() { return document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : media.matches; }
  function labelTheme() { theme.setAttribute('aria-pressed', String(isDark())); }
  theme.addEventListener('click', () => {
    const value = isDark() ? 'light' : 'dark';
    document.documentElement.dataset.theme = value;
    try { localStorage.setItem('warp-theme', value); } catch { /* Storage may be disabled. */ }
    labelTheme();
  });
  media.addEventListener('change', labelTheme); labelTheme();
  document.getElementById('print-report').addEventListener('click', () => window.print());
  document.getElementById('export-data').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({note: 'Historical presentation transcriptions; not all plotted points independently verified. See verification chapter for scope. Missing values are null.', data: window.WARP_DATA}, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'warp-chart-transcriptions.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  function filter() {
    const list = document.getElementById('experiment-list'); if (!list) return;
    const query = document.getElementById('experiment-search').value.toLowerCase().trim();
    const group = document.getElementById('experiment-class').value;
    const sort = document.getElementById('experiment-sort').value;
    const cards = [...list.children];
    cards.sort((a,b) => sort === 'likelihood' ? Number(b.dataset.probability)-Number(a.dataset.probability) || Number(a.dataset.order)-Number(b.dataset.order) : Number(a.dataset.order)-Number(b.dataset.order));
    let count=0;
    cards.forEach(card => { card.hidden = !(group === 'all' || card.dataset.group === group) || !card.textContent.toLowerCase().includes(query); if (!card.hidden) count++; list.append(card); });
    document.getElementById('experiment-count').textContent = count ? `${count} of 25 experiments` : 'No matching experiments. Clear the search or change the evidence class.';
  }
  document.addEventListener('input', e => { if (e.target.id === 'experiment-search') filter(); });
  document.addEventListener('change', e => { if (['experiment-class','experiment-sort'].includes(e.target.id)) filter(); });
  document.addEventListener('warp:rendered', () => {
    document.querySelectorAll('.future').forEach((card,i) => { card.dataset.order = i+1; });
    filter();
    // Make existing pointer-only chart details available to keyboard users.
    document.querySelectorAll('[data-chart] circle, [data-chart="floquet"] rect').forEach(point => {
      point.setAttribute('tabindex','0');
      point.setAttribute('aria-label','Chart value; focus to show details');
      point.addEventListener('focus', () => {
        const box=point.getBoundingClientRect();
        point.dispatchEvent(new PointerEvent('pointermove',{clientX:box.x,clientY:box.y}));
        const tip=document.querySelector('.tip'); if(tip) { tip.id='chart-tooltip'; tip.setAttribute('role','status'); point.setAttribute('aria-describedby',tip.id); }
      });
      point.addEventListener('blur', () => point.dispatchEvent(new PointerEvent('pointerleave')));
    });
  });
  // HTMX 4 synchronizes requests across the chapter rail so rapid selection cannot show stale content.
  document.querySelectorAll('.chapter').forEach(button => button.setAttribute('hx-sync','closest nav:replace'));
  document.addEventListener('htmx:before:request', () => document.getElementById('chapter').setAttribute('aria-busy','true'));
  document.addEventListener('htmx:finally:request', () => document.getElementById('chapter').setAttribute('aria-busy','false'));
})();

