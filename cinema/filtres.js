/* Filtres au pouce (v0.70) : icône dans la capsule en bas à droite ; toucher = feuille de filtres sur place ; appui-glissé = choix du type sur la courbe « R5d » ;
   double toucher = tout réinitialiser ; haut de page n°4 (titre dans la barre). Issu de essai_filtres.js (l'essai garde ses variantes de test). */
(() => {
  const root = document.documentElement;
  const css = `
html.nv #outils{display:none}
html.nv.fo #outils{display:grid;position:fixed;left:var(--marge);right:var(--marge);bottom:calc(84px + env(safe-area-inset-bottom));z-index:40;background:#0A1120;padding:12px;border:1px solid rgba(186,187,207,.22);border-radius:16px;box-shadow:0 18px 40px rgba(2,6,20,.8),0 2px 8px rgba(2,6,20,.6);gap:4px}
html.nv.fo #outils .puces[aria-label="Type"]{display:grid!important}
html.nv .ebas,html.nv.sc.up .ebas{display:none!important}
html.nv{--barre:44px}
html.nv .tete{display:block;padding:0}
html.nv h1{z-index:11;position:absolute;top:0;right:var(--marge);height:var(--barre);display:flex;align-items:center;font-size:22px;line-height:1;pointer-events:none}
html.nv .resume{font-size:13.5px;margin:0;line-height:1.4}
html.nv .onglets{margin-top:4px}
html.nv .version{display:none}
.essai-t{display:none;touch-action:none;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}
.essai-t svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round;pointer-events:none}
html.pld #essai-d,html.plg #essai-d{display:inline-flex}
.actions .capsule #essai-d{position:relative;color:var(--acier)}
.actions .capsule #essai-d::before{content:"";position:absolute;right:0;top:10px;bottom:10px;width:1px;background:rgba(255,255,255,.2)}
.essai-t.fa::after{content:"";position:absolute;right:7px;top:7px;width:9px;height:9px;border-radius:50%;background:var(--accent);box-shadow:0 0 9px 3px rgba(111,168,255,.6)}
html.fo .essai-t,.essai-t.prs{color:var(--actif)}
#essai-d.prs{background:var(--nuit2)!important}
@keyframes essai-pls{0%,100%{box-shadow:0 0 0 0 rgba(111,168,255,0)}40%{box-shadow:0 0 0 9px rgba(111,168,255,.35)}}
#essai-d.ind,#essai-f.ind{animation:essai-pls 1.1s ease-out 3;border-radius:50%}
#essai-rad{position:fixed;inset:0;z-index:60;pointer-events:none;opacity:0;transition:opacity .16s;-webkit-user-select:none;user-select:none}
#essai-rad.on{opacity:1;background:radial-gradient(circle at var(--cx) var(--cy),rgba(2,6,20,.8),rgba(2,6,20,.5) 55%,rgba(2,6,20,.25))}
#essai-rad.hint{opacity:1}
#essai-rad svg.sv{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
#essai-rad .it{position:absolute;color:var(--ink)}
#essai-rad .it svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
#essai-rad .it span{position:absolute;left:calc(50% + var(--dx,0px));top:calc(50% + var(--dy,0px));transform:translate(calc(-1 * var(--tx,50%)),calc(-1 * var(--ty,50%)));white-space:nowrap;font-size:15px;color:var(--ink);text-shadow:0 1px 8px #000,0 0 3px #000;transition:color .1s,font-size .12s}
#essai-rad .lab{display:none;position:absolute;transform:translate(-50%,-50%);font-size:14px;color:var(--ink);text-shadow:0 1px 8px #000;white-space:nowrap}
#essai-rad.hint .lab{display:block}
/* r1 : ronds espacés, le mot à l'extérieur de l'arc (loin du pouce) */
#essai-rad[data-r=r1] .it{width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;background:#0A1120;border:1px solid rgba(186,187,207,.4);display:grid;place-items:center;color:var(--repos);transform:scale(.3);opacity:0;transition:transform .2s cubic-bezier(.2,.9,.3,1.25),opacity .14s,background-color .12s,color .12s;box-shadow:0 8px 20px rgba(2,6,20,.7)}
#essai-rad.on[data-r=r1] .it,#essai-rad.hint[data-r=r1] .it{transform:scale(1);opacity:1;transition-delay:calc(var(--i)*30ms),calc(var(--i)*30ms),0s,0s}
#essai-rad[data-r=r1] .it.cur{border-color:var(--accent);color:var(--actif)}
#essai-rad.on[data-r=r1] .it.sel{transform:scale(1.25);background:var(--accent);color:var(--accent-ink);border-color:var(--accent);box-shadow:0 0 22px 4px rgba(111,168,255,.5);transition-delay:0s}
#essai-rad[data-r=r1] .it.sel span{color:var(--accent);font-weight:600;font-size:17px}
/* r2 : icônes nues, le mot à l'extérieur */
#essai-rad[data-r=r2] .it{width:56px;height:56px;margin:-28px 0 0 -28px;display:grid;place-items:center;opacity:0;transform:scale(.4);transition:transform .2s cubic-bezier(.2,.9,.3,1.25),opacity .14s,color .1s;filter:drop-shadow(0 2px 6px #000)}
#essai-rad[data-r=r2] .it svg{width:30px;height:30px;stroke-width:2}
#essai-rad.on[data-r=r2] .it,#essai-rad.hint[data-r=r2] .it{opacity:.9;transform:scale(1);transition-delay:calc(var(--i)*30ms),calc(var(--i)*30ms),0s}
#essai-rad.on[data-r=r2] .it.sel{opacity:1;color:var(--accent);transform:scale(1.5);filter:drop-shadow(0 0 10px rgba(111,168,255,.9)) drop-shadow(0 2px 6px #000);transition-delay:0s}
#essai-rad[data-r=r2] .it.sel span{color:var(--accent);font-weight:600;font-size:16px}
/* r3 : cadran retravaillé, grand arc en segments, icône + mot, segment visé allumé */
/* r4 : grandes bulles, le mot dedans */
#essai-rad[data-r=r4] .it{width:72px;height:72px;margin:-36px 0 0 -36px;border-radius:50%;background:#0A1120;border:1px solid rgba(186,187,207,.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:var(--repos);transform:scale(.3);opacity:0;transition:transform .2s cubic-bezier(.2,.9,.3,1.25),opacity .14s,background-color .12s,color .12s;box-shadow:0 8px 20px rgba(2,6,20,.7)}
#essai-rad[data-r=r4] .it span{position:static;transform:none;font-size:12.5px;color:inherit;text-shadow:none}
#essai-rad.on[data-r=r4] .it,#essai-rad.hint[data-r=r4] .it{transform:scale(1);opacity:1;transition-delay:calc(var(--i)*30ms),calc(var(--i)*30ms),0s,0s}
#essai-rad[data-r=r4] .it.cur{border-color:var(--accent);color:var(--actif)}
#essai-rad.on[data-r=r4] .it.sel{transform:scale(1.18);background:var(--accent);color:var(--accent-ink);border-color:var(--accent);box-shadow:0 0 22px 4px rgba(111,168,255,.5);transition-delay:0s}
/* famille r3 : l'arc lumineux (trait, bande, repère), un seul surlignage qui GLISSE d'un choix à l'autre ; choix serrés (20°) */
#essai-rad[class] .it3{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:var(--ink);opacity:0;transition:opacity .16s,color .1s,transform .14s}
#essai-rad.on .it3,#essai-rad.hint .it3{opacity:.78}
#essai-rad .it3 svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
#essai-rad .it3 span{font-size:13px;text-shadow:0 1px 8px #000,0 0 3px #000;white-space:nowrap}
#essai-rad .it3.sel{opacity:1;color:var(--accent);transform:scale(1.12)}
#essai-rad .it3.sel span{font-weight:600}
#essai-rad[data-r=r3a] .it3,#essai-rad[data-r=r3c] .it3{width:64px;height:52px;margin:-26px 0 0 -32px}
#essai-rad[data-r=r3c] .it3.sel span{text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:4px}
/* b : bande de verre, l'icône DANS la bande, le mot dehors */
#essai-rad[data-r=r3b] .it3{width:44px;height:44px;margin:-22px 0 0 -22px}
#essai-rad[data-r=r3b] .it3 span{position:absolute;left:calc(50% + var(--dx));top:calc(50% + var(--dy));transform:translate(calc(-1 * var(--tx)),calc(-1 * var(--ty)));font-size:13px}
#essai-rad[data-r=r3b] .it3.sel{color:var(--accent-ink);transform:none}
#essai-rad[data-r=r3b] .it3.sel span{color:var(--accent);font-size:15px}
/* d : compact, icônes seules, le mot seulement pour le choix visé */
#essai-rad[data-r=r3d] .it3{width:48px;height:48px;margin:-24px 0 0 -24px}
#essai-rad[data-r=r3d] .it3 span{position:absolute;left:calc(50% + var(--dx));top:calc(50% + var(--dy));transform:translate(calc(-1 * var(--tx)),calc(-1 * var(--ty)));opacity:0;transition:opacity .1s;font-size:15px}
#essai-rad[data-r=r3d] .it3.sel span{opacity:1}
#essai-rad .hg{opacity:0;transform-origin:var(--cx) var(--cy);transition:opacity .1s;will-change:transform}
#essai-rad .hg.on{opacity:1}
#essai-rad .hg path,#essai-rad .hg line{fill:none;stroke-linecap:round}
#essai-rad .hg .ha{stroke:rgba(111,168,255,.28)}
#essai-rad .hg .hc{stroke:var(--accent)}
#essai-rad .tr{fill:none;stroke-linecap:round}
#essai-rad .gd{stroke:rgba(234,242,255,.55);stroke-width:2;stroke-linecap:round}
#essai-rad .bd{fill:none;stroke-linecap:round;stroke:rgba(234,242,255,.1)}
#essai-rad .arc{fill:none;stroke:rgba(234,242,255,.4);stroke-width:2;stroke-linecap:round}
#essai-rad .nd{fill:rgba(234,242,255,.55);transition:fill .1s}
#essai-rad .nd.sel{fill:var(--accent)}
#essai-rad .cu{fill:var(--accent);filter:drop-shadow(0 0 8px rgba(111,168,255,.9))}
#essai-rad[data-r=r3] .it{width:64px;height:52px;margin:-26px 0 0 -32px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;color:var(--ink);opacity:0;transition:opacity .16s,color .1s,transform .14s;text-shadow:0 1px 8px #000}
#essai-rad[data-r=r3] .it span{position:static;transform:none;font-size:12.5px}
#essai-rad.on[data-r=r3] .it,#essai-rad.hint[data-r=r3] .it{opacity:.7}
#essai-rad[data-r=r3] .it.sel{opacity:1;color:var(--accent);transform:scale(1.25);font-weight:600}
/* famille r5 : UNE courbe d'horizon (grand rayon, comme la courbure d'une planète), fine ; le repère glisse dessus en continu ; mots à l'extérieur de la courbe ; transform/opacity seulement */
#essai-rad.on[data-r^=r5]{background:rgba(2,6,20,.84)}
#essai-rad[data-r^=r5] .hg{transform-origin:0 0}
#essai-rad[data-r^=r5] .it3{width:64px;height:46px;margin:-23px 0 0 -32px;color:#C9D8EE;gap:2px}
#essai-rad.on[data-r^=r5] .it3,#essai-rad.hint[data-r^=r5] .it3{opacity:.62}
#essai-rad[data-r^=r5] .it3 span{font-size:13px;letter-spacing:.02em}
#essai-rad[data-r^=r5] .it3.sel{opacity:1;color:#EAF2FF;transform:scale(1.1)}
#essai-rad[data-r^=r5] .it3.sel span{color:var(--accent)}
#essai-rad[data-r=r5a] .it3 svg,#essai-rad[data-r=r5c] .it3 span{display:none}
#essai-rad[data-r=r5c] .it3.sel span{display:block;position:absolute;bottom:100%;white-space:nowrap}
#essai-rad[data-r^=r5] .it3 svg{width:23px;height:23px}
/* r5d : ma version (icône 26, texte 15, plus lisible au repos, sélection plus nette) */
#essai-rad[data-r=r5d] .it3{width:68px;height:50px;margin:-25px 0 0 -34px;gap:3px}
#essai-rad[data-r=r5d] .it3 svg{width:26px;height:26px;stroke-width:1.6}
#essai-rad[data-r=r5d] .it3 span{font-size:15px}
#essai-rad.on[data-r=r5d] .it3,#essai-rad.hint[data-r=r5d] .it3{opacity:.72}
#essai-rad[data-r=r5d] .it3.sel{transform:scale(1.08)}
#essai-rad[data-r=r5d] .it3.sel span{font-weight:600}
@media (prefers-reduced-motion:reduce){#essai-d.ind,#essai-f.ind{animation:none}#essai-rad *{transition:none!important}}
#essai-off{position:fixed;inset:0;width:100%;height:100%;border:0;z-index:90;background:#05080F}
#essai-pan{position:fixed;left:8px;bottom:calc(10px + env(safe-area-inset-bottom));z-index:99;display:flex;flex-direction:column-reverse;gap:6px;align-items:flex-start;font:12px sans-serif;color:#fff;max-width:calc(100vw - 16px)}
#essai-pan .rg{display:flex;flex-wrap:wrap;gap:5px}
#essai-pan button{padding:7px 9px;border:1px solid #fff6;border-radius:8px;background:#000d;color:#fff;min-height:34px}
#essai-pan.min .rg{display:none}`;
  const st = document.createElement('style'); st.textContent = css; document.head.append(st);
  const g = k => { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } };
  const sv = (k, x) => { try { localStorage.setItem(k, x); } catch (e) {} };
  let pl = 'd', ret = 'r5d';   // choix figés par Simon (2026-11-17)
  const ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>';
  const mk = (id, extra) => { const b = document.createElement('button'); b.id = id; b.type = 'button'; b.className = 'essai-t ' + (extra || ''); b.innerHTML = ICON; b.setAttribute('aria-label', 'Filtres'); b.setAttribute('aria-haspopup', 'true'); b.title = 'Toucher : ouvrir. Double toucher : tout réinitialiser. Appui long puis glisser : choisir un type.'; return b; };
  const bd = mk('essai-d', 'btn'), be = mk('essai-e'), bf = mk('essai-f');
  const trig = () => ({ d: bd, g: bd, e: be, f: bf }[pl]);
  const P = '.puces[aria-label="Type"] .puce';
  const types = () => [...document.querySelectorAll(P)];
  const pan = document.createElement('div'); pan.id = 'essai-pan';
  const PL = [['off', 'Site officiel'], ['d', 'Nouveau (D)']];
  const RT = [['r3', 'R3 de base'], ['r5a', 'R5a limbe'], ['r5b', 'R5b planètes'], ['r5c', 'R5c astres'], ['r5d', 'R5d ma version'], ['r1', 'R1'], ['r2', 'R2'], ['r4', 'R4']];
  let off = null;
  const maj = () => {
    const nv = pl !== 'off';
    ['nv', 'pld', 'ple', 'plf', 'plg'].forEach(c => root.classList.remove(c));
    if (nv) root.classList.add('nv', 'pl' + pl);
    root.classList.remove('fo');
    if (!nv && !off) { off = document.createElement('iframe'); off.id = 'essai-off'; off.src = 'https://small-humans.github.io/cinema/'; off.title = 'Site officiel'; document.body.append(off); }
    if (nv && off) { off.remove(); off = null; }
    [...pan.querySelectorAll('button[data-pl]')].forEach(x => { x.style.opacity = x.dataset.pl === pl ? 1 : .55; x.style.borderColor = x.dataset.pl === pl ? '#fff' : '#fff6'; });
    [...pan.querySelectorAll('button[data-rt]')].forEach(x => { x.style.opacity = x.dataset.rt === ret ? 1 : .55; x.style.borderColor = x.dataset.rt === ret ? '#fff' : '#fff6'; x.style.display = nv ? '' : 'none'; });
    majMois();
  };
  const rowPl = document.createElement('div'); rowPl.className = 'rg'; const rowRt = document.createElement('div'); rowRt.className = 'rg';
  PL.forEach(([k, x]) => { const b = document.createElement('button'); b.textContent = x; b.dataset.pl = k; b.onclick = () => { pl = k; maj(); if (k !== 'off') { scrollTo(0, 0); sv('ind4', ''); setTimeout(hint, 300); } }; rowPl.append(b); });
  RT.forEach(([k, x]) => { const b = document.createElement('button'); b.textContent = x; b.dataset.rt = k; b.onclick = () => { ret = k; maj(); demo(); }; rowRt.append(b); });
  const ri = document.createElement('button'); ri.textContent = '↺ indice'; ri.onclick = () => { sv('ind4', ''); hint(); }; rowRt.append(ri);
  const tg = document.createElement('button'); tg.textContent = '^'; tg.setAttribute('aria-label', 'Afficher ou masquer le bandeau'); tg.style.minWidth = '40px'; tg.onclick = () => { pan.classList.toggle('min'); tg.textContent = pan.classList.contains('min') ? '⌄' : '^'; };
  pan.append(tg, rowRt, rowPl);

  const actif = () => { const o = document.querySelector('#outils'); const ty = [...o.querySelectorAll(P)].findIndex(b => b.getAttribute('aria-pressed') === 'true') > 0; const m = [...o.querySelectorAll('.menus select')].some(x => x.selectedIndex > 0 && x.id !== 'f-tri'); [bd, be, bf].forEach(b => b.classList.toggle('fa', ty || m)); };
  const haut = () => { const c = document.querySelector('#panneau'), on = document.querySelector('.onglets'); if (!c || !on) return; const y = c.getBoundingClientRect().top + scrollY - on.offsetHeight - (pl === 'f' ? 52 : 44); if (scrollY > y) scrollTo({ top: Math.max(0, y), behavior: 'instant' }); };
  const reset = () => {
    const o = document.querySelector('#outils'); const t0 = types()[0]; if (t0 && t0.getAttribute('aria-pressed') !== 'true') t0.click();
    o.querySelectorAll('.menus select').forEach(x => { if (x.id !== 'f-tri' && x.selectedIndex !== 0) { x.selectedIndex = 0; x.dispatchEvent(new Event('change', { bubbles: true })); } });
    root.classList.remove('fo'); setTimeout(() => { actif(); haut(); }, 150);
  };

  const mois = document.createElement('div'); mois.id = 'essai-m'; const mt = document.createElement('span'); mois.append(mt, bf);
  function majMois() {
    const on = document.querySelector('.onglets'); if (on) root.style.setProperty('--oh', on.offsetHeight + 'px');
    const lim = (on ? on.offsetHeight : 80) + 52; const ms = [...document.querySelectorAll('.mois')]; let c = ms[0];
    ms.forEach(m => { if (m.getBoundingClientRect().top <= lim) c = m; }); mt.textContent = c ? c.textContent.trim() : '';
  }

  /* menu radial : 0° = vers la gauche, 90° = vers le haut (ou le bas pour F) */
  const rad = document.createElement('div'); rad.id = 'essai-rad'; rad.setAttribute('aria-hidden', 'true');
  let items = [], secs = [], sel = -1, cx = 0, cy = 0, lab, tmr = 0, open = false, down = false, up = true, cur = null;
  const F3 = () => /^r[35][a-d]$/.test(ret), F5 = () => /^r5/.test(ret);
  const ang = (i, n) => F5() ? (ret === 'r5d' && n === 4 ? [22, 37.4, 57.6, 82][i] : 22 + i * (ret === 'r5d' ? 60 : 57) / Math.max(n - 1, 1)) : F3() ? (ret === 'r3d' ? 20 + i * 46 / Math.max(n - 1, 1) : 14 + i * 56 / Math.max(n - 1, 1)) : 6 + (n > 1 ? i * 78 / (n - 1) : 0);
  const pt = (r, th) => { const a = th * Math.PI / 180; return [cx - r * Math.cos(a), cy + (up ? -1 : 1) * r * Math.sin(a)]; };
  const NS = 'http://www.w3.org/2000/svg';
  let hl = null, tk = null, geo = null, hys = -1, cu = null;
  const mkp = (cls, d, w) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('class', cls); p.setAttribute('d', d); p.setAttribute('stroke-width', w); return p; };
  const build = () => {
    rad.textContent = ''; items = []; secs = []; sel = -1; hl = null; tk = null; geo = null; cu = null; rad.dataset.r = ret;
    rad.style.setProperty('--cx', cx + 'px'); rad.style.setProperty('--cy', cy + 'px');
    const ts = types(), n = ts.length || 1;
    if (F5()) {
      const sg = up ? 1 : -1, cc = [40, 300 * sg], u0 = t => { const q = pt(1, t); return [q[0] - cx, q[1] - cy]; }, uu = u0(42);
      const Rp = Math.hypot(150 * uu[0] - cc[0], 150 * uu[1] - cc[1]), c2 = cc[0] * cc[0] + cc[1] * cc[1];
      const posOn = t => { const u = u0(t), b2 = u[0] * cc[0] + u[1] * cc[1], s1 = b2 + Math.sqrt(b2 * b2 - c2 + Rp * Rp); return [cx + s1 * u[0], cy + s1 * u[1]]; };
      const nor = P => [(P[0] - cx - cc[0]) / Rp, (P[1] - cy - cc[1]) / Rp];
      geo = { place: t => { const P = posOn(t), q = nor(P); hl.style.transform = `translate(${P[0].toFixed(1)}px,${P[1].toFixed(1)}px) rotate(${(Math.atan2(q[1], q[0]) * 180 / Math.PI + 90).toFixed(1)}deg)`; } };
      const E = (t, a, c) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); if (c) e.className.baseVal = c; return e; };
      const A = posOn(-8), B = posOn(100), arc = `M${A} A${Rp} ${Rp} 0 0 ${up ? 1 : 0} ${B}`;
      const s2 = E('svg', {}, 'sv'), df = E('defs', {});
      const lg = E('linearGradient', { id: 'essai-g', gradientUnits: 'userSpaceOnUse', x1: A[0], y1: A[1], x2: B[0], y2: B[1] });
      [[0, 0], [.3, .8], [.7, .8], [1, 0]].forEach(([o, a2]) => lg.append(E('stop', { offset: o, 'stop-color': '#CFE0F8', 'stop-opacity': a2 })));
      const bl = E('radialGradient', { id: 'essai-sg' }); [[0, .7], [.45, .28], [1, 0]].forEach(([o, a2]) => bl.append(E('stop', { offset: o, 'stop-color': '#BCD3F5', 'stop-opacity': a2 })));
      df.append(lg, bl); s2.append(df);
      /* voile très léger côté planète, halo fin côté espace, filet */
      [[40, -20, .05], [8, 3, .08], [1.4, 0, 1]].forEach(([w, d, o]) => { const r = Rp + d, p1 = E('path', { d: arc.replace(/A\S+ \S+/, `A${r} ${r}`), fill: 'none', stroke: 'url(#essai-g)', 'stroke-width': w, 'stroke-linecap': 'round', opacity: o }); s2.append(p1); });
      ts.forEach((_, i) => { const P = posOn(ang(i, n)), q = nor(P); s2.append(E('line', { x1: P[0] - q[0] * 5, y1: P[1] - q[1] * 5, x2: P[0] + q[0] * 5, y2: P[1] + q[1] * 5, stroke: '#CFE0F8', 'stroke-width': 1.2, opacity: .5 })); });
      hl = E('g', {}, 'hg'); hl.append(E('circle', { cx: 0, cy: 0, r: 34, fill: 'url(#essai-sg)' }));
      s2.append(hl); rad.append(s2);
      const off = { r5a: 30, r5b: 40, r5c: 24, r5d: 42 }[ret];
      ts.forEach((o, i) => {
        const k = o.textContent.trim(), d = document.createElement('div'), t = ang(i, n); d.className = 'it3' + (o.getAttribute('aria-pressed') === 'true' ? ' cur' : ''); d.style.setProperty('--i', i);
        const P = posOn(t), q = nor(P); const of2 = off; d.style.left = (P[0] + q[0] * of2) + 'px'; d.style.top = (P[1] + q[1] * of2) + 'px';
        const sv2 = document.querySelector('.ebas [data-k="' + k + '"] svg'); if (sv2) d.append(sv2.cloneNode(true));
        const w = document.createElement('span'); w.textContent = k; d.append(w); items.push(d); rad.append(d);
      });
    } else if (F3()) {
      const RA = ret === 'r3d' ? 140 : 150, RI = { r3a: RA + 48, r3b: RA, r3c: RA + 50, r3d: RA + 40 }[ret], T0 = 0, T1 = 86;
      const sw = up ? 1 : 0, arc = (r, t1, t2) => `M${pt(r, t1)} A${r} ${r} 0 0 ${sw} ${pt(r, t2)}`;
      const s2 = document.createElementNS(NS, 'svg'); s2.setAttribute('class', 'sv');
      const A = pt(RA, T0), B = pt(RA, T1), df = document.createElementNS(NS, 'defs'), lg = document.createElementNS(NS, 'linearGradient');
      lg.setAttribute('id', 'essai-g'); lg.setAttribute('gradientUnits', 'userSpaceOnUse'); lg.setAttribute('x1', A[0]); lg.setAttribute('y1', A[1]); lg.setAttribute('x2', B[0]); lg.setAttribute('y2', B[1]);
      [[0, .0], [.22, .6], [.78, .6], [1, 0]].forEach(([o, a2]) => { const st2 = document.createElementNS(NS, 'stop'); st2.setAttribute('offset', o); st2.setAttribute('stop-color', '#EAF2FF'); st2.setAttribute('stop-opacity', a2); lg.append(st2); });
      df.append(lg); s2.append(df);
      const step = ang(1, n) - ang(0, n);
      if (ret === 'r3b') { s2.append(mkp('bd', arc(RA, T0, T1), 46)); const g0 = mkp('tr', arc(RA, T0, T1), 46); g0.setAttribute('stroke', 'url(#essai-g)'); g0.style.opacity = .18; s2.append(g0); }
      else { const tr = mkp('tr', arc(RA, T0, T1), ret === 'r3d' ? 2.5 : 3); tr.setAttribute('stroke', 'url(#essai-g)'); s2.append(tr); }
      /* graduations : un petit trait par choix */
      if (ret !== 'r3b') ts.forEach((_, i) => { const t = ang(i, n), p1 = pt(RA - 7, t), p2 = pt(RA + 7, t), l = document.createElementNS(NS, 'line'); l.setAttribute('class', 'gd'); l.setAttribute('x1', p1[0]); l.setAttribute('y1', p1[1]); l.setAttribute('x2', p2[0]); l.setAttribute('y2', p2[1]); s2.append(l); });
      /* surlignage : dessiné à 0° puis tourné autour du pouce (transform seulement) */
      hl = document.createElementNS(NS, 'g'); hl.setAttribute('class', 'hg');
      const hw = ret === 'r3b' ? 5 : step * .42;
      if (ret === 'r3c') { const l = document.createElementNS(NS, 'line'), p1 = pt(RA - 16, 0), p2 = pt(RA + 16, 0); l.setAttribute('class', 'hc'); l.setAttribute('x1', p1[0]); l.setAttribute('y1', p1[1]); l.setAttribute('x2', p2[0]); l.setAttribute('y2', p2[1]); l.setAttribute('stroke-width', 4); hl.append(l); }
      else if (ret === 'r3b') { hl.append(mkp('hc', arc(RA, -hw, hw), 44)); hl.firstChild.style.opacity = .92; }
      else { hl.append(mkp('ha', arc(RA, -hw, hw), 11)); hl.append(mkp('hc', arc(RA, -hw, hw), ret === 'r3d' ? 3.5 : 4.5)); }
      s2.append(hl); rad.append(s2);
      ts.forEach((o, i) => {
        const k = o.textContent.trim(), d = document.createElement('div'), t = ang(i, n), a = t * Math.PI / 180; d.className = 'it3' + (o.getAttribute('aria-pressed') === 'true' ? ' cur' : ''); d.style.setProperty('--i', i);
        const p = pt(RI, t); d.style.left = p[0] + 'px'; d.style.top = p[1] + 'px';
        const sg = document.querySelector('.ebas [data-k="' + k + '"] svg'); if (sg) d.append(sg.cloneNode(true));
        const w = document.createElement('span'); w.textContent = k;
        if (ret === 'r3b' || ret === 'r3d') { const D = ret === 'r3b' ? 36 : 32; w.style.setProperty('--dx', (-Math.cos(a) * D).toFixed(1) + 'px'); w.style.setProperty('--dy', (-Math.sin(a) * D * (up ? 1 : -1)).toFixed(1) + 'px'); w.style.setProperty('--tx', (50 + 50 * Math.cos(a)).toFixed(0) + '%'); w.style.setProperty('--ty', (50 + 50 * Math.sin(a)).toFixed(0) + '%'); }
        d.append(w); items.push(d); rad.append(d);
      });
    } else {
      const RR = { r1: 128, r2: 128, r4: 165, r3: 158 }[ret];
      if (ret === 'r3') {
        const RA = 112, s2 = document.createElementNS(NS, 'svg'); s2.setAttribute('class', 'sv'); const a0 = pt(RA, -6), b0 = pt(RA, 96);
        s2.append(mkp('arc', `M${a0} A${RA} ${RA} 0 0 ${up ? 1 : 0} ${b0}`, 2));
        ts.forEach((_, i) => { const q = pt(RA, ang(i, n)), c = document.createElementNS(NS, 'circle'); c.setAttribute('class', 'nd'); c.setAttribute('r', 5); c.setAttribute('cx', q[0]); c.setAttribute('cy', q[1]); s2.append(c); secs.push(c); });
        cu = document.createElementNS(NS, 'circle'); cu.setAttribute('class', 'cu'); cu.setAttribute('r', 8); cu.setAttribute('cx', a0[0]); cu.setAttribute('cy', a0[1]); s2.append(cu); rad.append(s2);
      }
      ts.forEach((o, i) => {
        const k = o.textContent.trim(), d = document.createElement('div'), t = ang(i, n), a = t * Math.PI / 180; d.className = 'it' + (o.getAttribute('aria-pressed') === 'true' ? ' cur' : ''); d.style.setProperty('--i', i);
        const p = pt(RR, t); d.style.left = p[0] + 'px'; d.style.top = p[1] + 'px';
        const sg = document.querySelector('.ebas [data-k="' + k + '"] svg'); if (sg) d.append(sg.cloneNode(true));
        const w = document.createElement('span'); w.textContent = k;
        const D = ret === 'r2' ? 36 : 40; w.style.setProperty('--dx', (-Math.cos(a) * D).toFixed(1) + 'px'); w.style.setProperty('--dy', (-Math.sin(a) * D * (up ? 1 : -1)).toFixed(1) + 'px');
        w.style.setProperty('--tx', (50 + 50 * Math.cos(a)).toFixed(0) + '%'); w.style.setProperty('--ty', (50 + 50 * Math.sin(a)).toFixed(0) + '%');
        d.append(w); items.push(d); rad.append(d);
      });
    }
    lab = document.createElement('div'); lab.className = 'lab'; lab.textContent = 'Appui long, glisse, relâche'; lab.style.left = Math.max(110, Math.min(innerWidth - 110, cx - 110)) + 'px'; lab.style.top = Math.max(40, cy - 250) + 'px'; rad.append(lab);
  };
  const pick = (px, py) => {
    const n = items.length; let k = -1;
    const dist = Math.hypot(px - cx, py - cy), t = Math.atan2(up ? cy - py : py - cy, cx - px) * 180 / Math.PI;
    if (dist > 28 && dist < 380 && t > -28 && t < 118) {
      let m = 1e9; items.forEach((_, i) => { const a = Math.abs(t - ang(i, n)); if (a < m) { m = a; k = i; } });
      if (sel >= 0 && k !== sel && Math.abs(t - ang(sel, n)) < Math.abs(t - ang(k, n)) + 4) k = sel; /* hystérésis : pas de va-et-vient à la frontière */
    }
    if (ret === 'r3' && cu) { const q = pt(112, Math.max(-6, Math.min(96, t))); cu.setAttribute('cx', q[0]); cu.setAttribute('cy', q[1]); }
    if (k !== sel) {
      secs.forEach((d, i) => d.classList.toggle('sel', i === k));
      items.forEach((d, i) => d.classList.toggle('sel', i === k)); sel = k;
      if (F3() && hl) hl.classList.toggle('on', k >= 0);
    }
    /* suivi continu : le repère suit le pouce (aimanté à moitié vers le choix visé), sans transition → fluide */
    if (F5() && geo && hl && k >= 0) { const a0 = ang(0, n) - 4, a1 = ang(n - 1, n) + 4, tc = Math.max(a0, Math.min(a1, t)); geo.place(tc + (ang(k, n) - tc) * .45); }
    else if (F3() && hl && k >= 0) { const a0 = ang(0, n) - 4, a1 = ang(n - 1, n) + 4, tc = Math.max(a0, Math.min(a1, t)), v = tc + (ang(k, n) - tc) * .45; hl.style.transform = `rotate(${(up ? 1 : -1) * v}deg)`; }
  };
  const fermer = () => { open = false; rad.classList.remove('on'); if (cur) cur.classList.remove('prs'); };
  const origine = (t, e) => {
    const r = t.getBoundingClientRect(); up = true;
    if (e) { cx = Math.min(e.clientX, innerWidth - 8); cy = Math.min(e.clientY, innerHeight - 8); } else { cx = r.left + r.width / 2; cy = r.top + r.height / 2; }
  };
  const demo = () => { if (pl === 'off') return; const t = trig(); if (!t || !t.offsetWidth || !types().length) return; origine(t); build(); rad.classList.add('hint');  clearTimeout(demo.t); demo.t = setTimeout(() => rad.classList.remove('hint'), 2600); };
  const hint = () => {
    if (g('ind4') || pl === 'off') return; const t = trig(); if (!t || !types().length) return;
    sv('ind4', '1'); origine(t); t.classList.add('ind'); build(); rad.classList.add('hint'); 
    setTimeout(() => { rad.classList.remove('hint'); t.classList.remove('ind'); }, 3600);
  };

  /* geste commun : toucher, double toucher, appui long + glisser, (E) glissé vers la gauche */
  let dernier = 0;
  const attach = el => {
    let x0 = 0, swiped = false;
    el.addEventListener('contextmenu', e => e.preventDefault());
    el.addEventListener('click', e => { if (e.detail === 0) root.classList.toggle('fo'); });
    el.addEventListener('pointerdown', e => {
      if (e.button > 0) return; down = true; open = false; swiped = false; x0 = e.clientX; cur = el; el.setPointerCapture(e.pointerId); origine(el, e); rad.classList.remove('hint');
      tmr = setTimeout(() => { if (!down || !types().length) return; open = true; root.classList.remove('fo'); build(); rad.classList.add('on'); el.classList.add('prs'); }, 230);
    });
    el.addEventListener('pointermove', e => {
      if (open) { pick(e.clientX, e.clientY); return; }
      if (down && pl === 'e' && !swiped && x0 - e.clientX > 36) { swiped = true; clearTimeout(tmr); root.classList.add('fo'); }
    });
    el.addEventListener('pointerup', () => {
      if (!down) return; down = false; clearTimeout(tmr);
      if (open) { const n = sel; fermer(); if (n >= 0) { types()[n].click(); setTimeout(() => { actif(); haut(); }, 140); } return; }
      if (swiped) return;
      const m = performance.now(); if (m - dernier < 340) { dernier = 0; reset(); } else { dernier = m; root.classList.toggle('fo'); }
    });
    el.addEventListener('pointercancel', () => { down = false; clearTimeout(tmr); fermer(); });
  };

  addEventListener('DOMContentLoaded', () => {
    document.body.append(rad, be);   // pas de bandeau de test
    const o = document.querySelector('#outils');
    document.querySelector('.actions .capsule').insertBefore(bd, document.querySelector('#b-ajout'));
    document.querySelector('main').insertBefore(mois, document.querySelector('#compte'));
    [bd, be, bf].forEach(attach);
    o.addEventListener('click', e => { if (e.target.closest('.puce')) setTimeout(() => { actif(); root.classList.remove('fo'); haut(); }, 120); });
    o.addEventListener('change', () => setTimeout(() => { actif(); haut(); }, 50));
    document.addEventListener('click', e => { if (root.classList.contains('fo') && !e.target.closest('#outils, .essai-t')) root.classList.remove('fo'); });
    let tick = 0; addEventListener('scroll', () => { if (!tick) tick = requestAnimationFrame(() => { tick = 0; if (pl === 'f') majMois(); }); }, { passive: true });
    addEventListener('resize', majMois);
    new MutationObserver(() => { if (pl === 'f') majMois(); }).observe(document.querySelector('#panneau'), { childList: true });
    new MutationObserver(actif).observe(o, { attributes: true, subtree: true, attributeFilter: ['aria-pressed'] });
    new MutationObserver(actif).observe(document.querySelector('#panneau'), { childList: true });   // « Effacer les filtres » (liste vide) remet aussi le point lumineux à zéro
    maj(); actif(); setTimeout(hint, 1600);
  });
})();
