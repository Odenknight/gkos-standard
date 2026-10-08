/* Warp Field Notebook — charts, explorers, HTMX 4 wiring. No build step, no framework. */
(function () {
  'use strict';

  /* ---------- Data transcribed from the repository reports (see fragments for citations) ---------- */
  const DATA = {
    // Ford–Roman quantum-inequality check, QI-A1 (PhaseA_B8B3_EC_QI report §4). Geometric units.
    qi: [
      { tau: 0.03, sampled: -9.94e-5, bound: -11727, status: 'PASS' },
      { tau: 0.1, sampled: -9.88e-5, bound: -94.99, status: 'PASS' },
      { tau: 0.3, sampled: -9.73e-5, bound: -1.173, status: 'PASS' },
      { tau: 1.0, sampled: -9.20e-5, bound: -9.50e-3, status: 'PASS' },
      { tau: 3, sampled: null, bound: null, status: 'OUT_OF_DOMAIN' },
      { tau: 10, sampled: -4.8e-5, bound: -9.5e-7, status: 'OUT_OF_DOMAIN' },
      { tau: 30, sampled: null, bound: null, status: 'OUT_OF_DOMAIN' }
    ],
    // Net momentum vs enclosing radius, A-B8+A-B3 (PhaseA_B8B3_EC_QI report §2).
    momentum: [
      { r: 0.5, p: 4.0e-5 }, { r: 1, p: 1.2e-3 }, { r: 2, p: 6.7e-2 },
      { r: 4, p: 3.6e-4 }, { r: 8, p: 1.6e-10 }, { r: 16, p: 1.06e-15 }
    ],
    // Driven-response sweep, S2-09 (resonance discrimination controls). Ω in units where ω1 = 1.018709.
    driven: [
      [0.611, 3.74e-4], [0.747, 5.47e-4], [0.883, 1.16e-3], [0.951, 2.76e-3], [0.9848, 1.778e-2],
      [1.0187, 4.15e-3], [1.0527, 4.16e-3], [1.0866, 2.59e-3], [1.1206, 2.70e-3], [1.1885, 1.75e-3],
      [1.290, 9.12e-4], [1.426, 5.40e-4], [1.630, 2.99e-4]
    ],
    // Quasinormal modes l=0, B1 (PhaseB_B1_B4_Floquet report).
    qnm: [
      [1.019, 0.0047], [1.049, 0.0043], [1.105, 0.0115], [1.133, 0.0181],
      [1.189, 0.0178], [1.275, 0.0385], [1.285, 0.0273], [1.394, 0.0369]
    ],
    // Arnold-tongue scan, B4: leading Floquet exponent μ_max. Rows = modulation amplitude, cols = Ω/ω1.
    floquet: {
      omega: [0.8, 0.9, 1.0, 1.2, 1.5, 2.0, 2.2],
      amp: [0.05, 0.14, 0.23, 0.32, 0.41, 0.50],
      mu: [
        [-0.0042618, -0.0042626, -0.0042636, -0.0042659, -0.0042684, -0.0042704, -0.0042709],
        [-0.0042405, -0.0042422, -0.0042447, -0.0042507, -0.0042565, -0.0042611, -0.0042627],
        [-0.0042208, -0.0042230, -0.0042268, -0.0042357, -0.0042434, -0.0042492, -0.0042519],
        [-0.0042030, -0.0042049, -0.0042097, -0.0042210, -0.0042290, -0.0042349, -0.0042385],
        [-0.0041869, -0.0041881, -0.0041936, -0.0042066, -0.0042134, -0.0042180, -0.0042226],
        [-0.0041727, -0.0041725, -0.0041784, -0.0041925, -0.0041965, -0.0041986, -0.0042042]
      ]
    },
    // Phase C: Hamiltonian-constraint norm L2_Ham vs time, R2b Option 2 (KO σ = 0.45), plus N256 academic leg.
    ham: {
      t: [12, 13, 14, 15, 16],
      N192: [0.0174523, 0.0116658, 0.0078400693, 0.0058566032, 0.0049505664],
      N224: [0.0210822, 0.0147759, 0.0114891885, 0.0316363943, 0.1169443805],
      N256: [null, null, 0.081846322, 0.0867015708, 0.0289202222]
    },
    // Phase C: N192 timestep sweep at KO σ = 0.30 (stability addendum): L2_Ham vs t.
    cfl: {
      t: [4, 8, 10, 11, 11.4583, 11.5833, 11.8333, 12.5],
      'CFL 0.25 (attempt 3)': [3.666e-3, 1.638e-2, 2.412e-2, 4.676e-2, 7.449e-2, 8.642e-2, 1.158e-1, null],
      'CFL 0.125 (corrected)': [5.092e-3, 2.945e-2, 1.418e-1, 1.250e-1, 1.420e-1, 1.660e-1, 2.870e16, null],
      'CFL 0.0625 (corrected)': [6.144e-3, 4.576e-2, 8.751e-2, 1.457e-1, 3.389, null, 7.844e-1, 9.482]
    },
    // Phase C: last finite time before NaN, by configuration.
    lastFinite: [
      { cfg: 'N192 · σ 0.30 · CFL 0.25', t: 15.29, done: false },
      { cfg: 'N192 · σ 0.30 · CFL 0.125', t: 11.83, done: false },
      { cfg: 'N192 · σ 0.30 · CFL 0.0625', t: 12.54, done: false },
      { cfg: 'N192 · σ 0.45 · CFL 0.25', t: 16.0, done: true },
      { cfg: 'N224 · σ 0.45 · CFL 0.25', t: 16.0, done: true, grow: true },
      { cfg: 'N224 · σ 0.45 · CFL 0.125', t: 12.82, done: false },
      { cfg: 'N224 · σ 0.973 · CFL 0.25', t: 16.0, done: true },
      { cfg: 'N256 · σ 0.45 · CFL 0.25', t: 16.0, done: true }
    ],
    // Phase C: endpoint L2_Ham at t = 16 by resolution and dissipation.
    endpoint: [
      { N: 192, sigma: 0.45, v: 4.95e-3 }, { N: 216, sigma: 0.9726, v: 5.97e-3 },
      { N: 224, sigma: 0.45, v: 1.169e-1 }, { N: 224, sigma: 0.9726, v: 6.32e-3 },
      { N: 232, sigma: 0.9726, v: 6.67e-3 }, { N: 256, sigma: 0.45, v: 2.89e-2 }
    ]
  };
  window.WARP_DATA = DATA;

  /* ---------- small helpers ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const fmt = (v, d = 3) => {
    if (v === null || v === undefined || Number.isNaN(v)) return '—';
    const a = Math.abs(v);
    if (a !== 0 && (a < 1e-3 || a >= 1e5)) return v.toExponential(d - 1).replace('e', ' × 10^');
    return Number(v.toFixed(d)).toString();
  };
  const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  let tip = null;
  function showTip(evt, html) {
    if (!tip) { tip = document.createElement('div'); tip.className = 'tip'; document.body.appendChild(tip); }
    tip.innerHTML = html; tip.hidden = false;
    const x = Math.min(evt.clientX + 14, window.innerWidth - 280);
    tip.style.left = x + 'px'; tip.style.top = (evt.clientY + 14) + 'px';
  }
  function hideTip() { if (tip) tip.hidden = true; }

  /* Generic scale */
  function scale(domain, range, log) {
    const [d0, d1] = domain, [r0, r1] = range;
    if (log) { const l0 = Math.log10(d0), l1 = Math.log10(d1); return v => r0 + (Math.log10(v) - l0) / (l1 - l0) * (r1 - r0); }
    return v => r0 + (v - d0) / (d1 - d0) * (r1 - r0);
  }
  function niceTicks(d0, d1, n = 5) {
    const span = d1 - d0, step0 = Math.pow(10, Math.floor(Math.log10(span / n)));
    const err = span / n / step0; const step = err >= 7.5 ? 10 * step0 : err >= 3 ? 5 * step0 : err >= 1.5 ? 2 * step0 : step0;
    const out = []; for (let v = Math.ceil(d0 / step) * step; v <= d1 + 1e-9; v += step) out.push(Number(v.toFixed(10)));
    return out;
  }
  function logTicks(d0, d1) { const out = []; for (let e = Math.floor(Math.log10(d0)); e <= Math.ceil(Math.log10(d1)); e++) { const v = Math.pow(10, e); if (v >= d0 * 0.999 && v <= d1 * 1.001) out.push(v); } return out; }
  const expLabel = v => { const e = Math.round(Math.log10(v)); return (e === 0) ? '1' : `10^${e}`; };

  /* Frame: axes, grid, labels. Returns {svg, g, x, y, W, H, m} */
  function frame(container, opts) {
    const W = opts.W || 720, H = opts.H || 300, m = Object.assign({ t: 20, r: 20, b: 44, l: 64 }, opts.m || {});
    container.querySelectorAll('svg').forEach(s => s.remove());
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': opts.aria || '' }, container);
    const x = scale(opts.xd, [m.l, W - m.r], opts.xlog), y = scale(opts.yd, [H - m.b, m.t], opts.ylog);
    const grid = el('g', { class: 'grid' }, svg), axis = el('g', { class: 'axis' }, svg);
    const yt = opts.ylog ? logTicks(opts.yd[0], opts.yd[1]) : niceTicks(opts.yd[0], opts.yd[1], opts.yn || 5);
    const xt = opts.xt || (opts.xlog ? logTicks(opts.xd[0], opts.xd[1]) : niceTicks(opts.xd[0], opts.xd[1], opts.xn || 6));
    yt.forEach(v => { el('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v) }, grid); const t = el('text', { x: m.l - 8, y: y(v) + 3.5, 'text-anchor': 'end', class: 'tick' }, svg); t.textContent = opts.ylog ? expLabel(v) : fmt(v, 3); });
    xt.forEach(v => { const t = el('text', { x: x(v), y: H - m.b + 16, 'text-anchor': 'middle', class: 'tick' }, svg); t.textContent = opts.xfmt ? opts.xfmt(v) : (opts.xlog ? expLabel(v) : fmt(v, 3)); el('line', { x1: x(v), x2: x(v), y1: H - m.b, y2: H - m.b + 4 }, axis); });
    el('line', { x1: m.l, x2: W - m.r, y1: H - m.b, y2: H - m.b }, axis);
    if (opts.xl) { const t = el('text', { x: (m.l + W - m.r) / 2, y: H - 8, 'text-anchor': 'middle', class: 'lbl' }, svg); t.textContent = opts.xl; }
    if (opts.yl) { const t = el('text', { x: 14, y: (m.t + H - m.b) / 2, 'text-anchor': 'middle', class: 'lbl', transform: `rotate(-90 14 ${(m.t + H - m.b) / 2})` }, svg); t.textContent = opts.yl; }
    return { svg, x, y, W, H, m };
  }
  function pathFrom(pts, x, y) { let d = ''; pts.forEach((p, i) => { d += (i ? 'L' : 'M') + x(p[0]).toFixed(1) + ',' + y(p[1]).toFixed(1); }); return d; }

  /* ---------- chart renderers, keyed by data-chart ---------- */
  const charts = {};

  charts.qi = (c) => {
    const rows = DATA.qi.filter(r => r.sampled !== null);
    const f = frame(c, { W: 720, H: 300, xd: [0.02, 40], xlog: true, yd: [1e-7, 1e5], ylog: true, xl: 'sampling time τ₀ (geometric units)', yl: '|negative energy| (log)', aria: 'Quantum inequality bound versus sampled energy density' });
    const rc = 2.27;
    el('rect', { x: f.x(rc), y: f.m.t, width: f.x(40) - f.x(rc), height: f.H - f.m.t - f.m.b, fill: cssVar('--block-soft'), opacity: 0.7 }, f.svg);
    const lbl = el('text', { x: f.x(rc) + 6, y: f.m.t + 14, class: 'lbl' }, f.svg); lbl.textContent = 'OUT OF DOMAIN: τ₀ longer than the curvature scale r_c = 2.27';
    const inDomain = rows.filter(r => r.status === 'PASS');
    el('path', { d: pathFrom(inDomain.map(r => [r.tau, Math.abs(r.bound)]), f.x, f.y), fill: 'none', stroke: cssVar('--s2'), 'stroke-width': 2 }, f.svg);
    el('path', { d: pathFrom(inDomain.map(r => [r.tau, Math.abs(r.sampled)]), f.x, f.y), fill: 'none', stroke: cssVar('--s1'), 'stroke-width': 2 }, f.svg);
    rows.forEach(r => {
      const dead = r.status !== 'PASS';
      [['bound', r.bound, '--s2'], ['sampled', r.sampled, '--s1']].forEach(([k, v, col]) => {
        const p = el('circle', { cx: f.x(r.tau), cy: f.y(Math.abs(v)), r: 5, fill: cssVar(col), stroke: cssVar('--paper-2'), 'stroke-width': 2, opacity: dead ? 0.45 : 1 }, f.svg);
        p.addEventListener('pointermove', e => showTip(e, `<b>τ₀ = ${r.tau}</b><br>${k}: <span class="num">${fmt(v, 3)}</span><br>${dead ? 'not scored (out of domain)' : 'scored: PASS'}`));
        p.addEventListener('pointerleave', hideTip);
      });
    });
    const t1 = el('text', { x: f.x(1.0) + 8, y: f.y(9.5e-3) + 4, class: 'lbl' }, f.svg); t1.textContent = 'allowed limit';
    const t2 = el('text', { x: f.x(1.0) + 8, y: f.y(9.2e-5) + 4, class: 'lbl' }, f.svg); t2.textContent = 'what the wall actually has';
  };

  charts.momentum = (c) => {
    const f = frame(c, { W: 720, H: 280, xd: [0.4, 20], xlog: true, yd: [1e-16, 1], ylog: true, xl: 'radius of the enclosing sphere (bubble radius R = 2)', yl: 'net momentum inside (log)', aria: 'Net momentum versus radius' });
    el('path', { d: pathFrom(DATA.momentum.map(r => [r.r, r.p]), f.x, f.y), fill: 'none', stroke: cssVar('--s1'), 'stroke-width': 2 }, f.svg);
    DATA.momentum.forEach(r => { const p = el('circle', { cx: f.x(r.r), cy: f.y(r.p), r: 5, fill: cssVar('--s1'), stroke: cssVar('--paper-2'), 'stroke-width': 2 }, f.svg); p.addEventListener('pointermove', e => showTip(e, `<b>r = ${r.r}</b><br>net momentum <span class="num">${fmt(r.p, 3)}</span>`)); p.addEventListener('pointerleave', hideTip); });
    const t = el('text', { x: f.x(2), y: f.y(6.7e-2) - 10, 'text-anchor': 'middle', class: 'lbl' }, f.svg); t.textContent = 'peaks at the wall, then falls to nothing';
  };

  charts.driven = (c) => {
    const w1 = 1.018709;
    const f = frame(c, { W: 720, H: 300, xd: [0.55, 1.7], yd: [1e-4, 3e-2], ylog: true, xl: 'push frequency Ω (natural frequency ω₁ = 1.0187)', yl: 'steady response (log)', aria: 'Driven response amplitude versus forcing frequency' });
    el('line', { x1: f.x(w1), x2: f.x(w1), y1: f.m.t, y2: f.H - f.m.b, stroke: cssVar('--time'), 'stroke-dasharray': '4 4' }, f.svg);
    const lt = el('text', { x: f.x(w1) + 6, y: f.m.t + 12, class: 'lbl' }, f.svg); lt.textContent = 'ω₁ from the eigen-solve';
    el('path', { d: pathFrom(DATA.driven, f.x, f.y), fill: 'none', stroke: cssVar('--s1'), 'stroke-width': 2 }, f.svg);
    DATA.driven.forEach(([o, r]) => { const p = el('circle', { cx: f.x(o), cy: f.y(r), r: 5, fill: cssVar('--s1'), stroke: cssVar('--paper-2'), 'stroke-width': 2 }, f.svg); p.addEventListener('pointermove', e => showTip(e, `<b>Ω = ${o}</b><br>response <span class="num">${fmt(r, 3)}</span><br>${Math.abs(o - 0.9848) < 1e-3 ? 'the peak: 4× its neighbours' : ''}`)); p.addEventListener('pointerleave', hideTip); });
  };

  charts.qnm = (c) => {
    const f = frame(c, { W: 720, H: 240, xd: [0.98, 1.45], yd: [0, 0.045], xl: 'ring frequency ω (units where the field mass is 1)', yl: 'decay rate Γ', aria: 'Quasinormal mode frequencies and decay rates', yn: 4 });
    DATA.qnm.forEach(([w, g], i) => {
      el('line', { x1: f.x(w), x2: f.x(w), y1: f.y(0), y2: f.y(g), stroke: cssVar('--s1'), 'stroke-width': 3, 'stroke-linecap': 'round' }, f.svg);
      const p = el('circle', { cx: f.x(w), cy: f.y(g), r: 6, fill: cssVar('--s1'), stroke: cssVar('--paper-2'), 'stroke-width': 2 }, f.svg);
      p.addEventListener('pointermove', e => showTip(e, `<b>mode ${i + 1}</b><br>ω = <span class="num">${w}</span>, Γ = <span class="num">${g}</span><br>Q ≈ ${Math.round(w / (2 * g))}`)); p.addEventListener('pointerleave', hideTip);
    });
  };

  charts.floquet = (c) => {
    const d = DATA.floquet, W = 720, H = 300, m = { t: 26, r: 120, b: 44, l: 64 };
    c.querySelectorAll('svg').forEach(s => s.remove());
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Floquet exponent map: every cell negative' }, c);
    const cw = (W - m.l - m.r) / d.omega.length, ch = (H - m.t - m.b) / d.amp.length;
    const all = d.mu.flat(), lo = Math.min(...all), hi = Math.max(...all);
    const ramp = ['#cde2fb', '#9ec5f4', '#6da7ec', '#3987e5', '#256abf', '#184f95', '#0d366b'];
    d.mu.forEach((row, i) => row.forEach((v, j) => {
      const k = Math.round((v - lo) / (hi - lo) * (ramp.length - 1));
      const r = el('rect', { x: m.l + j * cw + 1, y: m.t + i * ch + 1, width: cw - 2, height: ch - 2, rx: 3, fill: ramp[ramp.length - 1 - k] }, svg);
      r.addEventListener('pointermove', e => showTip(e, `<b>Ω = ${d.omega[j]} ω₁, amplitude ${d.amp[i]}</b><br>μ_max = <span class="num">${v.toFixed(7)}</span><br>negative → the ripple dies out each cycle`));
      r.addEventListener('pointerleave', hideTip);
    }));
    d.omega.forEach((o, j) => { const t = el('text', { x: m.l + j * cw + cw / 2, y: H - m.b + 16, 'text-anchor': 'middle', class: 'tick' }, svg); t.textContent = o; });
    d.amp.forEach((a, i) => { const t = el('text', { x: m.l - 8, y: m.t + i * ch + ch / 2 + 4, 'text-anchor': 'end', class: 'tick' }, svg); t.textContent = a; });
    const xl = el('text', { x: m.l + (W - m.l - m.r) / 2, y: H - 8, 'text-anchor': 'middle', class: 'lbl' }, svg); xl.textContent = 'shaking frequency Ω, in multiples of ω₁';
    const yl = el('text', { x: 14, y: (m.t + H - m.b) / 2, 'text-anchor': 'middle', class: 'lbl', transform: `rotate(-90 14 ${(m.t + H - m.b) / 2})` }, svg); yl.textContent = 'shaking amplitude';
    // legend ramp
    const lx = W - m.r + 24, ly = m.t, lh = (H - m.t - m.b);
    ramp.forEach((col, i) => el('rect', { x: lx, y: ly + i * lh / ramp.length, width: 14, height: lh / ramp.length, fill: col }, svg));
    const l1 = el('text', { x: lx + 20, y: ly + 10, class: 'tick' }, svg); l1.textContent = hi.toFixed(5);
    const l2 = el('text', { x: lx + 20, y: ly + lh, class: 'tick' }, svg); l2.textContent = lo.toFixed(5);
    const l3 = el('text', { x: lx, y: ly - 8, class: 'lbl' }, svg); l3.textContent = 'μ_max (all < 0)';
  };

  charts.ham = (c) => {
    const d = DATA.ham;
    const f = frame(c, { W: 720, H: 300, xd: [12, 16], yd: [3e-3, 3e-1], ylog: true, xl: 'simulation time (turn-off centred at t = 12, run ends at 16)', yl: 'constraint error L2_Ham (log)', aria: 'Constraint error after turn-off for three grid resolutions', xt: [12, 13, 14, 15, 16] });
    const series = [['N192', '--s1', 'coarse grid, 192³'], ['N224', '--s2', 'medium grid, 224³'], ['N256', '--s3', 'fine grid, 256³ (non-gate)']];
    series.forEach(([k, col, name]) => {
      const pts = d.t.map((t, i) => [t, d[k][i]]).filter(p => p[1] !== null);
      el('path', { d: pathFrom(pts, f.x, f.y), fill: 'none', stroke: cssVar(col), 'stroke-width': 2 }, f.svg);
      pts.forEach(([t, v]) => { const p = el('circle', { cx: f.x(t), cy: f.y(v), r: 5, fill: cssVar(col), stroke: cssVar('--paper-2'), 'stroke-width': 2 }, f.svg); p.addEventListener('pointermove', e => showTip(e, `<b>${name}</b><br>t = ${t}: L2_Ham <span class="num">${fmt(v, 3)}</span>`)); p.addEventListener('pointerleave', hideTip); });
      const last = pts[pts.length - 1]; const t = el('text', { x: f.x(last[0]) - 8, y: f.y(last[1]) - 9, 'text-anchor': 'end', class: 'lbl', style: `fill:${cssVar(col)}` }, f.svg); t.textContent = k;
    });
  };

  charts.cfl = (c) => {
    const d = DATA.cfl, keys = Object.keys(d).filter(k => k !== 't');
    const f = frame(c, { W: 720, H: 300, xd: [4, 13], yd: [1e-3, 1e2], ylog: true, xl: 'simulation time (turn-off starts around t = 9, centred at 12)', yl: 'constraint error L2_Ham (log, clipped at 100)', aria: 'Smaller timesteps fail earlier', xt: [4, 6, 8, 10, 12] });
    el('rect', { x: f.x(9), y: f.m.t, width: f.x(13) - f.x(9), height: f.H - f.m.t - f.m.b, fill: cssVar('--time-soft'), opacity: 0.6 }, f.svg);
    const lt = el('text', { x: f.x(9) + 6, y: f.m.t + 12, class: 'lbl' }, f.svg); lt.textContent = 'turn-off window';
    const cols = ['--s1', '--s2', '--s3'];
    keys.forEach((k, ki) => {
      const pts = d.t.map((t, i) => [t, d[k][i]]).filter(p => p[1] !== null).map(p => [p[0], Math.min(p[1], 1e2)]);
      el('path', { d: pathFrom(pts, f.x, f.y), fill: 'none', stroke: cssVar(cols[ki]), 'stroke-width': 2 }, f.svg);
      pts.forEach(([t, v], i) => { const raw = d[k][d.t.indexOf(t)]; const p = el('circle', { cx: f.x(t), cy: f.y(v), r: 5, fill: cssVar(cols[ki]), stroke: cssVar('--paper-2'), 'stroke-width': 2 }, f.svg); p.addEventListener('pointermove', e => showTip(e, `<b>${k}</b><br>t = ${t}: L2_Ham <span class="num">${fmt(raw, 3)}</span>${raw > 1 ? '<br>blow-up' : ''}`)); p.addEventListener('pointerleave', hideTip); });
    });
  };

  charts.lastFinite = (c) => {
    const rows = DATA.lastFinite, W = 720, rh = 26, m = { t: 10, r: 30, b: 34, l: 210 }, H = m.t + m.b + rows.length * rh;
    c.querySelectorAll('svg').forEach(s => s.remove());
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'How far each run got before failing' }, c);
    const x = scale([0, 16], [m.l, W - m.r]);
    [0, 4, 8, 12, 16].forEach(v => { el('line', { x1: x(v), x2: x(v), y1: m.t, y2: H - m.b, stroke: cssVar('--grid') }, svg); const t = el('text', { x: x(v), y: H - m.b + 16, 'text-anchor': 'middle', class: 'tick' }, svg); t.textContent = v; });
    const tl = el('text', { x: x(12), y: m.t - 1, 'text-anchor': 'middle', class: 'lbl' }, svg); tl.textContent = 'turn-off';
    el('line', { x1: x(12), x2: x(12), y1: m.t, y2: H - m.b, stroke: cssVar('--time'), 'stroke-dasharray': '3 3' }, svg);
    rows.forEach((r, i) => {
      const y = m.t + i * rh;
      const col = r.done ? (r.grow ? '--warn' : '--pass') : '--fail';
      const bar = el('rect', { x: x(0), y: y + 5, width: x(r.t) - x(0), height: rh - 10, rx: 3, fill: cssVar(col) }, svg);
      const lab = el('text', { x: m.l - 8, y: y + rh / 2 + 4, 'text-anchor': 'end', class: 'tick' }, svg); lab.textContent = r.cfg;
      const v = el('text', { x: x(r.t) + (r.done ? -6 : 6), y: y + rh / 2 + 4, 'text-anchor': r.done ? 'end' : 'start', class: 'tick', style: r.done ? 'fill:#fff' : '' }, svg); v.textContent = r.done ? (r.grow ? 'finished, but error growing' : 'finished') : `NaN at t = ${r.t}`;
      bar.addEventListener('pointermove', e => showTip(e, `<b>${r.cfg}</b><br>${r.done ? 'ran to the end (t = 16)' : 'numbers became NaN at t = ' + r.t}${r.grow ? '<br>constraint error still rising at the end (FAIL on late slope)' : ''}`)); bar.addEventListener('pointerleave', hideTip);
    });
    const xl = el('text', { x: (m.l + W - m.r) / 2, y: H - 6, 'text-anchor': 'middle', class: 'lbl' }, svg); xl.textContent = 'simulation time reached';
  };

  charts.endpoint = (c) => {
    const rows = DATA.endpoint, W = 720, H = 260, m = { t: 20, r: 20, b: 44, l: 64 };
    c.querySelectorAll('svg').forEach(s => s.remove());
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'End-of-run constraint error by resolution and dissipation' }, c);
    const y = scale([1e-3, 3e-1], [H - m.b, m.t], true), bw = (W - m.l - m.r) / rows.length;
    logTicks(1e-3, 3e-1).forEach(v => { el('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), stroke: cssVar('--grid') }, svg); const t = el('text', { x: m.l - 8, y: y(v) + 3.5, 'text-anchor': 'end', class: 'tick' }, svg); t.textContent = expLabel(v); });
    rows.forEach((r, i) => {
      const x0 = m.l + i * bw + bw * 0.2, w = bw * 0.6, hi = r.sigma > 0.5;
      const bar = el('rect', { x: x0, y: y(r.v), width: w, height: (H - m.b) - y(r.v), rx: 3, fill: hi ? cssVar('--s3') : cssVar('--s1') }, svg);
      const t = el('text', { x: x0 + w / 2, y: H - m.b + 16, 'text-anchor': 'middle', class: 'tick' }, svg); t.textContent = `N${r.N}`;
      const s = el('text', { x: x0 + w / 2, y: H - m.b + 29, 'text-anchor': 'middle', class: 'lbl' }, svg); s.textContent = `σ ${r.sigma}`;
      bar.addEventListener('pointermove', e => showTip(e, `<b>N = ${r.N}, KO σ = ${r.sigma}</b><br>L2_Ham at t = 16: <span class="num">${fmt(r.v, 3)}</span>`)); bar.addEventListener('pointerleave', hideTip);
    });
    const yl = el('text', { x: 14, y: (m.t + H - m.b) / 2, 'text-anchor': 'middle', class: 'lbl', transform: `rotate(-90 14 ${(m.t + H - m.b) / 2})` }, svg); yl.textContent = 'L2_Ham at t = 16 (log)';
  };

  /* ---------- Explorer 1: waveform shape → energy penalty ⟨m²⟩/⟨m⟩² ---------- */
  const WAVES = {
    continuous: { name: 'Continuous (always on)', f: (u) => 1 },
    sin2: { name: 'sin² ramps (smooth on/off)', f: (u, p) => { const tau = p.ramp; if (u < tau) return Math.pow(Math.sin(Math.PI * u / (2 * tau)), 2); if (u > 1 - tau) return Math.pow(Math.sin(Math.PI * (1 - u) / (2 * tau)), 2); return 1; } },
    tanh: { name: 'tanh pulse', f: (u, p) => { const w = Math.max(p.ramp, 0.005) / 3; return 0.5 * (Math.tanh((u - p.ramp) / w) - Math.tanh((u - 1 + p.ramp) / w)); } },
    gate: { name: 'Rectangular pulses (duty cycle)', f: (u, p) => { const n = 4, ph = (u * n) % 1; return ph < p.duty ? 1 : 0; } },
    sinusoid: { name: 'Pure sinusoid (0 to 1)', f: (u) => 0.5 * (1 - Math.cos(2 * Math.PI * 4 * u)) },
    square: { name: 'Truncated-Fourier square wave', f: (u) => { let s = 0; for (let k = 1; k <= 9; k += 2) s += Math.sin(2 * Math.PI * 4 * k * u) / k; return Math.max(0, Math.min(1, 0.5 + (2 / Math.PI) * s)); } }
  };
  function waveformExplorer(root) {
    if (root.warpRender) { root.warpRender(); return; }
    const sel = root.querySelector('#wf-shape'), duty = root.querySelector('#wf-duty'), ramp = root.querySelector('#wf-ramp');
    const dutyOut = root.querySelector('#wf-duty-out'), rampOut = root.querySelector('#wf-ramp-out');
    const plot = root.querySelector('[data-plot="waveform"]');
    const outPen = root.querySelector('#wf-penalty'), outM = root.querySelector('#wf-mean'), outM2 = root.querySelector('#wf-mean2'), outV = root.querySelector('#wf-verdict');
    function render() {
      const key = sel.value, p = { duty: +duty.value, ramp: +ramp.value };
      dutyOut.value = Math.round(p.duty * 100) + '%'; rampOut.value = Math.round(p.ramp * 100) + '% of the trip';
      duty.closest('label').hidden = key !== 'gate'; ramp.closest('label').hidden = !(key === 'sin2' || key === 'tanh');
      const N = 800, pts = [], pts2 = []; let sm = 0, sm2 = 0;
      for (let i = 0; i <= N; i++) { const u = i / N; const mv = Math.max(0, WAVES[key].f(u, p)); pts.push([u, mv]); pts2.push([u, mv * mv]); if (i < N) { sm += mv; sm2 += mv * mv; } }
      const mean = sm / N, mean2 = sm2 / N, pen = mean > 1e-9 ? mean2 / (mean * mean) : NaN;
      const f = frame(plot, { W: 720, H: 230, xd: [0, 1], yd: [0, 1.05], xl: 'fraction of the trip (time)', yl: 'drive level m(t)', xn: 5, yn: 3, aria: 'Waveform and its square' });
      el('path', { d: pathFrom(pts2, f.x, f.y) + `L${f.x(1)},${f.y(0)}L${f.x(0)},${f.y(0)}Z`, fill: cssVar('--time'), opacity: 0.18 }, f.svg);
      el('path', { d: pathFrom(pts2, f.x, f.y), fill: 'none', stroke: cssVar('--time'), 'stroke-width': 2 }, f.svg);
      el('path', { d: pathFrom(pts, f.x, f.y), fill: 'none', stroke: cssVar('--s1'), 'stroke-width': 2 }, f.svg);
      outM.textContent = fmt(mean, 3); outM2.textContent = fmt(mean2, 3); outPen.textContent = Number.isNaN(pen) ? '—' : pen.toFixed(3);
      outPen.className = 'v ' + (pen <= 1.0005 ? 'good' : 'bad');
      outV.textContent = Number.isNaN(pen) ? 'Drive never on.' : pen <= 1.0005 ? 'No penalty. This is the floor: nothing beats continuous.' : `${((pen - 1) * 100).toFixed(1)}% more wall energy, on average, than continuous for the same trip.`;
    }
    root.warpRender = render;
    [sel, duty, ramp].forEach(i => i.addEventListener('input', render));
    render();
  }

  /* ---------- Explorer 2: ramp time τ → peak stress ∝ 1/τ, integrated cost constant ---------- */
  function rampExplorer(root) {
    if (root.warpRender) { root.warpRender(); return; }
    const sl = root.querySelector('#rp-tau'), out = root.querySelector('#rp-tau-out'), plot = root.querySelector('[data-plot="ramp"]');
    const peak = root.querySelector('#rp-peak'), integ = root.querySelector('#rp-integral');
    function render() {
      const tau = +sl.value; out.value = tau.toFixed(3) + ' of the trip';
      const N = 800, pts = [], dpts = []; let maxd = 0, sumd = 0;
      for (let i = 0; i <= N; i++) { const u = i / N; let mv, d;
        if (u < tau) { mv = Math.pow(Math.sin(Math.PI * u / (2 * tau)), 2); d = (Math.PI / (2 * tau)) * Math.sin(Math.PI * u / tau); }
        else if (u > 1 - tau) { const v = 1 - u; mv = Math.pow(Math.sin(Math.PI * v / (2 * tau)), 2); d = -(Math.PI / (2 * tau)) * Math.sin(Math.PI * v / tau); }
        else { mv = 1; d = 0; }
        pts.push([u, mv]); dpts.push([u, Math.abs(d)]); maxd = Math.max(maxd, Math.abs(d)); if (i < N) sumd += Math.abs(d) / N; }
      const f = frame(plot, { W: 720, H: 230, xd: [0, 1], yd: [0, 1.05], xl: 'fraction of the trip (time)', yl: 'drive level m(t)', xn: 5, yn: 3, aria: 'Ramp shape and its rate of change' });
      const dscale = 1 / (Math.PI / (2 * 0.02)); // normalise |dm/dt| so the fastest slider value fits the frame
      el('path', { d: pathFrom(dpts.map(p => [p[0], Math.min(1.05, p[1] * dscale)]), f.x, f.y), fill: 'none', stroke: cssVar('--time'), 'stroke-width': 2 }, f.svg);
      el('path', { d: pathFrom(pts, f.x, f.y), fill: 'none', stroke: cssVar('--s1'), 'stroke-width': 2 }, f.svg);
      peak.textContent = (maxd / (Math.PI / 2)).toFixed(2) + '×'; integ.textContent = sumd.toFixed(3);
    }
    root.warpRender = render;
    sl.addEventListener('input', render); render();
  }

  /* ---------- init after any swap ---------- */
  function initWithin(scope) {
    scope.querySelectorAll('[data-chart]').forEach(c => { const k = c.getAttribute('data-chart'); if (charts[k]) { try { charts[k](c); } catch (e) { console.error('chart', k, e); } } });
    scope.querySelectorAll('[data-explorer="waveform"]').forEach(waveformExplorer);
    scope.querySelectorAll('[data-explorer="ramp"]').forEach(rampExplorer);
  }
  function setCurrent(name) {
    document.querySelectorAll('.chapter').forEach(b => b.setAttribute('aria-current', b.dataset.chapter === name ? 'true' : 'false'));
    const main = document.getElementById('chapter'); if (main) main.dataset.current = name;
  }

  document.addEventListener('htmx:after:swap', (e) => {
    // HTMX 4 dispatches on the source element; the swap target lives in detail.ctx.target.
    const ctx = (e.detail && e.detail.ctx) || {};
    const source = ctx.sourceElement || e.target;
    let target = ctx.target || null;
    if (!target && source && source.getAttribute && source.getAttribute('hx-target')) target = document.querySelector(source.getAttribute('hx-target'));
    if (!target) target = document.getElementById('chapter');
    if (target && target.id === 'chapter') {
      const src = source && source.dataset ? source.dataset.chapter : null;
      const fromHash = target.querySelector('[data-chapter-id]'); const name = src || (fromHash && fromHash.dataset.chapterId);
      if (name) { setCurrent(name); if (location.hash !== '#' + name) history.pushState(null, '', '#' + name); }
      if (window.scrollY > 260 && !(source && source.hasAttribute && source.hasAttribute('data-noscroll'))) { const top = target.getBoundingClientRect().top + window.scrollY - 12; window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }
    }
    initWithin(target || document);
    document.documentElement.dispatchEvent(new CustomEvent('warp:rendered'));
  });
  document.addEventListener('htmx:response:error', (e) => {
    const main = document.getElementById('chapter'); if (!main) return;
    main.innerHTML = '<div class="fallback"><b>This chapter could not be loaded.</b> The page fetches its chapters as HTML fragments, so it needs to be served over HTTP (for example <code>python3 -m http.server</code> in <code>docs/explainer</code>) or opened from the published artifact link, rather than double-clicked as a local file.</div>';
  });
  document.addEventListener('htmx:error', (e) => { console.warn('htmx error', e.detail); });

  // theme awareness: re-render charts when the theme changes so colours follow the tokens
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener && mq.addEventListener('change', () => initWithin(document));
  new MutationObserver(() => initWithin(document)).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Boot: pick chapter from hash (default: start). The rail button carries the hx-get; click it.
  window.addEventListener('DOMContentLoaded', () => {
    const want = (location.hash || '#start').slice(1);
    const btn = document.querySelector(`.chapter[data-chapter="${CSS.escape(want)}"]`) || document.querySelector('.chapter[data-chapter="start"]');
    if (btn) { setCurrent(btn.dataset.chapter); if (window.htmx) { btn.setAttribute('data-noscroll', ''); btn.click(); setTimeout(() => btn.removeAttribute('data-noscroll'), 0); } }
    initWithin(document);
  });
  window.addEventListener('hashchange', () => { const want = location.hash.slice(1); if (document.getElementById(want) && want !== 'chapter') return; const btn = document.querySelector(`.chapter[data-chapter="${CSS.escape(want)}"]`) || document.querySelector('.chapter[data-chapter="start"]'); if (btn && document.getElementById('chapter').dataset.current !== btn.dataset.chapter) btn.click(); });
})();

