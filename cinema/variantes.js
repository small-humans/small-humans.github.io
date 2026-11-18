// Sélecteur de variantes « ^ » (installé le 2026-11-18 avec l'accord de Simon, v0.137).
// But : comparer des concepts sur la VRAIE page, à l'URL unique, sur l'iPhone de Simon, sans paramètre d'URL.
// Actif partout sauf sur l'hôte public du site (github.io) : invisible en ligne, présent sur le serveur de test.
// Usage dans index.html (après ce script) :
//   Variantes.groupe('stat', 'Stats', [['1','Récent + décennies'],['2','Frise'],['3','Actuel']], '1');
//   CSS : html[data-v-stat="2"] .stats { ... }   JS : Variantes.valeur('stat') === '2'
// Le bandeau suit les <dialog> ouverts (fiche comprise) : il reste touchable partout.
(function () {
  const h = location.hostname;
  const local = !/github\.io$/.test(h);
  const G = {};
  const lire = () => { try { return JSON.parse(localStorage.getItem('variantes') || '{}'); } catch (e) { return {}; } };
  const ecrire = v => { try { localStorage.setItem('variantes', JSON.stringify(v)); } catch (e) { /* mémoire indisponible : choix non gardé */ } };
  const choix = lire();
  const api = {
    groupe(nom, libelle, options, defaut, appliquer) {
      G[nom] = { libelle, options, appliquer };
      const v = local && options.some(o => o[0] === choix[nom]) ? choix[nom] : defaut;
      api.mettre(nom, v, true);
      if (local) dessiner();
    },
    valeur: nom => document.documentElement.getAttribute('data-v-' + nom),
    mettre(nom, v, init) {
      document.documentElement.setAttribute('data-v-' + nom, v);
      if (!init) { choix[nom] = v; ecrire(choix); }
      if (G[nom] && G[nom].appliquer) G[nom].appliquer(v);
      if (!init) dessiner();
    }
  };
  window.Variantes = api;
  if (!local) return;

  const pan = document.createElement('div');
  pan.id = 'variantes-pan';
  pan.innerHTML = '<style>#variantes-pan{position:fixed;left:8px;bottom:calc(30px + env(safe-area-inset-bottom));z-index:2147483000;font:12px/1.2 system-ui,sans-serif;color:#fff;display:flex;flex-direction:column-reverse;gap:6px;max-width:calc(100vw - 16px)}#variantes-pan button{min-height:34px;padding:6px 9px;border:1px solid #ffffff55;border-radius:8px;background:#000c;color:#fff}#variantes-pan .vp-g{display:flex;flex-wrap:wrap;gap:4px;align-items:center}#variantes-pan .vp-on{border-color:#fff;font-weight:600}#variantes-pan.min .vp-opt{display:none}#variantes-pan .vp-ver{opacity:.6;padding:0 4px}</style>';
  let min = true;
  function dessiner() {
    [...pan.querySelectorAll('.vp-g')].forEach(n => n.remove());
    const barre = document.createElement('div'); barre.className = 'vp-g vp-barre';
    const tg = document.createElement('button'); tg.textContent = min ? '^' : '⌄'; tg.setAttribute('aria-label', 'Variantes');
    tg.onclick = () => { min = !min; pan.classList.toggle('min', min); tg.textContent = min ? '^' : '⌄'; };
    const ver = document.createElement('span'); ver.className = 'vp-ver'; const vv = typeof VERSION === 'string' ? VERSION : (document.documentElement.dataset.version || ''); ver.textContent = vv ? 'v' + vv.split(' ')[0] : '';
    barre.append(tg, ver); pan.append(barre);
    Object.entries(G).forEach(([nom, g]) => {
      const l = document.createElement('div'); l.className = 'vp-g vp-opt';
      const t = document.createElement('span'); t.textContent = g.libelle; l.append(t);
      g.options.forEach(([cle, lib], i) => {
        const b = document.createElement('button'); b.textContent = (i + 1) + ' ' + lib;
        if (api.valeur(nom) === cle) b.className = 'vp-on';
        b.onclick = () => api.mettre(nom, cle);
        l.append(b);
      });
      pan.append(l);
    });
    pan.classList.toggle('min', min);
  }
  // Suivre le <dialog> modal ouvert le plus récent (couche supérieure), sinon le body.
  const placer = () => { const d = [...document.querySelectorAll('dialog[open]')].pop(); const cible = d || document.body; if (pan.parentNode !== cible) cible.append(pan); };
  const go = () => { placer(); new MutationObserver(placer).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'], childList: true }); };
  if (document.body) go(); else addEventListener('DOMContentLoaded', go);
})();
