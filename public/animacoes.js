'use strict';
/* V4 Adesivos — topo em tela cheia, carrossel "adesivo sendo aplicado" e animações do site. */
(() => {
  const root = document.documentElement;
  const motion = root.classList.contains('js-anima');
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const header = document.getElementById('siteHeader');
  const hero = document.getElementById('inicio');
  const stage = hero.querySelector('.hero-stage');
  const copy = hero.querySelector('.hero-copy');
  const squeegee = hero.querySelector('.hero-squeegee');

  /* ---------- Cabeçalho ---------- */
  const bar = document.createElement('span'); bar.className = 'scroll-bar'; header.append(bar);
  function headerState() {
    const onHero = scrollY < hero.offsetHeight - header.offsetHeight - 10;
    header.classList.toggle('on-hero', onHero);
    const max = document.documentElement.scrollHeight - innerHeight;
    header.style.setProperty('--prog', max > 0 ? (scrollY / max).toFixed(4) : 0);
  }
  headerState();

  /* ---------- Carrossel do topo ---------- */
  const slides = [
    ['utilitarios-com-bau-01', 'Imcopesc · Caminhão baú', 'Caminhão Imcopesc com baú azul adesivado pela V4 Adesivos', '50% 60%'],
    ['utilitarios-com-bau-03', 'Pneuzago · Caminhão baú', 'Caminhão baú Pneuzago com comunicação visual da V4 Adesivos', '50% 55%'],
    ['grupo-acontrans-fiorino-3', 'Grupo Acontrans · Envelopamento', 'Fiorino do Grupo Acontrans com envelopamento comercial da V4', '50% 55%'],
    ['sorri-sustentabilidade-lateral-2-van-12', 'Sorridents · Van comercial', 'Van Sorridents com identidade visual aplicada pela V4', '50% 55%'],
    ['unimed-lateral-2-ambulancia-04', 'Unimed · Ambulância', 'Ambulância Unimed caracterizada pela V4 Adesivos', '50% 55%'],
    ['utilitarios-com-bau-04', 'BM Móveis · Caminhão baú', 'Caminhão baú BM Móveis com comunicação visual da V4', '50% 55%'],
    ['xerife-lateral-2-kombi-01', 'RedeTV! · Kombi', 'Kombi do programa Jorge Wilson adesivada pela V4', '50% 55%']
  ].map(([file, name, alt, pos]) => ({ src: `images/portfolio/${file}.webp`, small: `images/portfolio/${file}-small.webp`, name, alt, pos }));
  const DUR = 6000;
  const nameEl = document.getElementById('heroSlideName');
  const idxEl = document.getElementById('heroSlideIndex');
  document.getElementById('heroSlideTotal').textContent = String(slides.length).padStart(2, '0');
  const progress = hero.querySelector('.hero-progress');
  const ambient = hero.querySelector('.hero-ambient');
  let current = 0, busy = false, timer = 0, slideStart = 0, remaining = DUR, paused = false;
  const first = stage.querySelector('.hero-slide');
  first.querySelector('img').style.objectPosition = slides[0].pos;
  const dots = slides.map((s, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.tabIndex = -1;
    b.setAttribute('aria-label', `Ver trabalho ${i + 1}: ${s.name}`);
    b.append(document.createElement('i'));
    b.addEventListener('click', () => go(i));
    progress.append(b); return b;
  });
  progress.removeAttribute('aria-hidden');
  function markDots() {
    dots.forEach((d, i) => { d.classList.toggle('done', i < current); d.classList.remove('run'); });
    void progress.offsetWidth;
    dots[current].style.setProperty('--dur', DUR + 'ms');
    if (motion) dots[current].classList.add('run'); else dots[current].classList.add('done');
  }
  function setCaption(i) {
    nameEl.classList.add('swap');
    setTimeout(() => { nameEl.textContent = slides[i].name; idxEl.textContent = String(i + 1).padStart(2, '0'); nameEl.classList.remove('swap'); }, 300);
  }
  function setAmbient(i) {
    const old = ambient.querySelector('img:not(.out)');
    const img = new Image(); img.alt = ''; img.src = slides[i].small; img.className = 'out';
    ambient.append(img);
    requestAnimationFrame(() => requestAnimationFrame(() => { img.classList.remove('out'); old && old.classList.add('out'); }));
    setTimeout(() => old && old.remove(), 1600);
  }
  const loaded = new Map();
  function load(i) {
    if (!loaded.has(i)) loaded.set(i, new Promise(res => { const im = new Image(); im.decoding = 'async'; im.onload = im.onerror = () => res(); im.src = slides[i].src; }));
    return loaded.get(i);
  }
  // geometria da linha diagonal (paralela ao corte do palco)
  function slope(h, w) { return innerWidth > 820 ? (w * .2) / h : .16; }
  function apply(fig, done) {
    const w = stage.clientWidth, h = stage.clientHeight, k = slope(h, w);
    const total = w + h * k + 120, d = 1150; let t0 = 0;
    const len = Math.hypot(h, h * k), ang = Math.atan(k);
    squeegee.style.height = len + 'px';
    squeegee.style.opacity = '1';
    function frame(now) {
      if (!t0) t0 = now;
      const t = clamp((now - t0) / d, 0, 1), e = easeInOut(t);
      const x = -60 + e * total;
      fig.style.clipPath = `polygon(0 0, ${x}px 0, ${x - h * k}px ${h}px, 0 ${h}px)`;
      squeegee.style.transform = `translate(${x}px,0) rotate(${ang}rad)`;
      if (t < 1) requestAnimationFrame(frame);
      else { fig.style.clipPath = ''; squeegee.style.opacity = '0'; done(); }
    }
    requestAnimationFrame(frame);
  }
  async function go(i) {
    if (busy || i === current) return;
    busy = true; clearTimeout(timer);
    await load(i);
    const fig = document.createElement('figure'); fig.className = 'hero-slide entering';
    const img = new Image(); img.src = slides[i].src; img.alt = slides[i].alt; img.width = 800; img.height = 508; img.style.objectPosition = slides[i].pos;
    fig.append(img); fig.style.clipPath = 'polygon(0 0,0 0,0 100%,0 100%)';
    stage.insertBefore(fig, squeegee);
    const prev = stage.querySelector('.hero-slide.is-active');
    requestAnimationFrame(() => fig.classList.add('is-active'));
    current = i; markDots(); setCaption(i); setAmbient(i);
    apply(fig, () => {
      prev && prev.remove(); fig.classList.remove('entering'); busy = false;
      load((i + 1) % slides.length); schedule(DUR);
    });
  }
  function schedule(ms) {
    clearTimeout(timer); remaining = ms; slideStart = performance.now();
    if (!paused) timer = setTimeout(() => go((current + 1) % slides.length), ms);
  }
  function setPaused(p) {
    if (p === paused) return; paused = p; hero.classList.toggle('paused', p);
    if (p) { clearTimeout(timer); remaining = Math.max(400, remaining - (performance.now() - slideStart)); }
    else if (!busy) schedule(remaining);
  }

  /* ---------- Linhas de velocidade ---------- */
  const canvas = hero.querySelector('.hero-speed');
  const ctx = canvas.getContext('2d');
  let cw = 0, ch = 0, dpr = 1, streaks = [], heroVisible = true, raf = 0, last = 0;
  function sizeCanvas() {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    cw = hero.clientWidth; ch = hero.clientHeight;
    canvas.width = cw * dpr; canvas.height = ch * dpr;
    const n = Math.round(clamp(cw / 34, 14, 46));
    streaks = Array.from({ length: n }, () => mk(true));
  }
  function mk(any) {
    const lime = Math.random() < .28;
    return { x: any ? Math.random() * cw * 1.4 : cw + Math.random() * cw * .4, y: ch * (.12 + Math.random() * .84), l: 60 + Math.random() * 260, v: .25 + Math.random() * .9, a: .05 + Math.random() * (lime ? .3 : .16), c: lime ? '209,237,156' : '255,255,255', w: Math.random() < .2 ? 2 : 1 };
  }
  function draw(now) {
    raf = 0; if (!heroVisible || document.hidden) return;
    const dt = Math.min(48, now - (last || now)); last = now;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, cw, ch);
    for (const s of streaks) {
      s.x -= s.v * dt * .55;
      if (s.x + s.l < -20) Object.assign(s, mk(false));
      const g = ctx.createLinearGradient(s.x, 0, s.x + s.l, 0);
      g.addColorStop(0, `rgba(${s.c},${s.a})`); g.addColorStop(1, `rgba(${s.c},0)`);
      ctx.strokeStyle = g; ctx.lineWidth = s.w; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.l, s.y); ctx.stroke();
    }
    raf = requestAnimationFrame(draw);
  }
  function startDraw() { if (motion && !raf) { last = 0; raf = requestAnimationFrame(draw); } }

  /* ---------- Fio de luz na borda do palco ---------- */
  const edge = document.createElement('span'); edge.className = 'hero-edge'; edge.setAttribute('aria-hidden', 'true');
  hero.insertBefore(edge, stage.nextSibling);
  function placeEdge() {
    if (innerWidth <= 820) return;
    const hr = hero.getBoundingClientRect(), r = stage.getBoundingClientRect();
    const top = r.top - hr.top, x1 = r.left - hr.left + r.width * .2, x0 = r.left - hr.left, h = r.height;
    edge.style.left = x1 + 'px'; edge.style.top = top + 'px';
    edge.style.height = Math.hypot(h, x1 - x0) + 'px';
    edge.style.transform = `rotate(${Math.atan((x1 - x0) / h)}rad)`;
  }

  /* ---------- Entrada ---------- */
  function heroIntro() {
    root.classList.add('header-in');
    hero.classList.add('hero-in');
    setTimeout(() => hero.classList.add('hero-done'), 2400);
    markDots(); load(1);
    if (motion) schedule(DUR + 1200);
  }
  sizeCanvas(); placeEdge(); startDraw();
  const heroImg = first.querySelector('img');
  const ready = heroImg.complete ? Promise.resolve() : new Promise(r => { heroImg.addEventListener('load', r, { once: true }); heroImg.addEventListener('error', r, { once: true }); });
  Promise.race([ready, new Promise(r => setTimeout(r, 1200))]).then(() => requestAnimationFrame(heroIntro));

  new IntersectionObserver(([e]) => {
    heroVisible = e.isIntersecting;
    if (heroVisible) startDraw();
    if (motion) setPaused(!heroVisible || document.hidden);
  }).observe(hero);
  document.addEventListener('visibilitychange', () => { if (motion) setPaused(!heroVisible || document.hidden); if (!document.hidden) startDraw(); });
  let rz = 0;
  addEventListener('resize', () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(() => { sizeCanvas(); placeEdge(); headerState(); }); });

  /* ---------- Rolagem: parallax do topo + faixa ---------- */
  const marquee = document.querySelector('.v4-marquee-track');
  if (marquee) { const items = [...marquee.children]; for (let k = 0; k < 3; k++) items.forEach(n => marquee.append(n.cloneNode(true))); }
  let mx = 0, lastY = scrollY, boost = 0, mLast = 0, mRaf = 0, marqueeVisible = false;
  function marqueeFrame(now) {
    mRaf = 0; if (!marqueeVisible) return;
    const dt = Math.min(48, now - (mLast || now)); mLast = now;
    boost *= .92;
    mx -= (0.05 + boost) * dt;
    const half = marquee.scrollWidth / 4;
    if (-mx > half) mx += half;
    marquee.style.transform = `translate3d(${mx}px,0,0)`;
    mRaf = requestAnimationFrame(marqueeFrame);
  }
  if (marquee && motion) new IntersectionObserver(([e]) => { marqueeVisible = e.isIntersecting; if (marqueeVisible && !mRaf) { mLast = 0; mRaf = requestAnimationFrame(marqueeFrame); } }).observe(marquee.parentElement);

  let ticking = false;
  function onScroll() {
    ticking = false; headerState();
    const y = scrollY, dy = y - lastY; lastY = y;
    boost = clamp(boost + Math.abs(dy) * .004, 0, .9);
    if (!motion || !hero.classList.contains('hero-done')) return;
    const p = clamp(y / hero.offsetHeight, 0, 1);
    copy.style.transform = p ? `translate3d(0,${-p * 90}px,0)` : '';
    copy.style.opacity = p ? String(clamp(1 - p * 1.5, 0, 1)) : '';
    stage.style.transform = p ? `translate3d(0,${p * 70}px,0) scale(${1 - p * .05})` : '';
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* ---------- Títulos linha a linha ---------- */
  document.querySelectorAll('.reveal h2').forEach(h2 => {
    const groups = [[]];
    [...h2.childNodes].forEach(n => { if (n.nodeName === 'BR') groups.push([]); else groups.at(-1).push(n); });
    h2.textContent = '';
    groups.forEach(g => { if (!g.length) return; const o = document.createElement('span'); o.className = 'ln'; const i = document.createElement('span'); g.forEach(n => i.append(n)); o.append(i); h2.append(o); });
  });

  if (!motion) return;

  /* ---------- Observador geral ---------- */
  const seen = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-visible'); seen.unobserve(e.target);
    e.target.querySelectorAll('[data-count]').forEach(countUp);
    if (e.target.matches('[data-count]')) countUp(e.target);
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.credentials,.about').forEach(el => seen.observe(el));

  /* ---------- Contadores ---------- */
  function prepCount(el) {
    const tn = [...el.childNodes].find(n => n.nodeType === 3 && /\d/.test(n.textContent));
    if (!tn) return;
    const m = tn.textContent.match(/(\d+)(?:,(\d+))?/); if (!m) return;
    el.dataset.count = m[0]; el._tn = tn; el._tpl = tn.textContent;
    tn.textContent = tn.textContent.replace(m[0], m[2] ? '0,' + '0'.repeat(m[2].length) : '0');
  }
  function countUp(el) {
    if (!el._tn || el._done) return; el._done = true;
    const raw = el.dataset.count, dec = (raw.split(',')[1] || '').length, target = parseFloat(raw.replace(',', '.'));
    const d = 1600; let t0 = 0;
    (function f(now) { if (!t0) t0 = now; const t = clamp((now - t0) / d, 0, 1), e = 1 - Math.pow(1 - t, 4);
      el._tn.textContent = el._tpl.replace(raw, (target * e).toFixed(dec).replace('.', ','));
      if (t < 1) requestAnimationFrame(f); })(performance.now());
  }
  document.querySelectorAll('.credentials-inner>div:first-child strong, .credentials-inner>a strong, .review-rating>strong').forEach(prepCount);
  const reviewBox = document.querySelector('.review-inner');
  if (reviewBox) new MutationObserver(() => { if (reviewBox.classList.contains('is-visible')) reviewBox.querySelectorAll('[data-count]').forEach(countUp); }).observe(reviewBox, { attributes: true, attributeFilter: ['class'] });

  /* ---------- Portfólio ---------- */
  const grid = document.querySelector('.gallery-grid');
  const cardIO = new IntersectionObserver(es => {
    let n = 0;
    es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left).forEach(e => {
      const c = e.target; cardIO.unobserve(c);
      const delay = (n++ * 90) + 'ms';
      c.style.transitionDelay = delay; c.style.animationDelay = delay;
      c.classList.add('g-in'); c.classList.remove('g-wait');
      const ph = c.querySelector('.gallery-photo');
      ph.addEventListener('animationend', ev => { if (ev.animationName === 'img-settle') { c.classList.remove('g-in'); c.style.transitionDelay = ''; } });
    });
  }, { threshold: .08 });
  function prepCards() {
    grid.querySelectorAll('.gallery-card:not([data-prep])').forEach(c => {
      c.dataset.prep = '1'; c.classList.add('g-wait');
      const ph = c.querySelector('.gallery-photo');
      const sh = document.createElement('span'); sh.className = 'shine'; ph.append(sh);
      if (fine) {
        ph.addEventListener('pointermove', ev => {
          const r = ph.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
          ph.style.transform = `perspective(900px) rotateX(${(.5 - y) * 6}deg) rotateY(${(x - .5) * 8}deg) translateY(-4px)`;
          ph.style.setProperty('--sx', x * 100 + '%'); ph.style.setProperty('--sy', y * 100 + '%');
        });
        ph.addEventListener('pointerleave', () => { ph.style.transform = ''; });
      }
      cardIO.observe(c);
    });
  }
  prepCards();
  new MutationObserver(prepCards).observe(grid, { childList: true });

  /* ---------- Soluções: troca de foto como adesivo aplicado ---------- */
  const svcImg = document.getElementById('serviceImage');
  const svcBox = svcImg && svcImg.closest('.service-photo');
  const svcInfo = document.querySelector('.service-info');
  if (svcImg) new MutationObserver(ms => {
    const m = ms.find(x => x.attributeName === 'src'); if (!m || !m.oldValue || m.oldValue === svcImg.getAttribute('src')) return;
    svcBox.querySelectorAll('.svc-old,.svc-line').forEach(n => n.remove());
    const old = new Image(); old.src = m.oldValue; old.className = 'svc-old'; old.alt = '';
    Object.assign(old.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: getComputedStyle(svcImg).objectFit, zIndex: '1', background: '#e3e9e4' });
    const line = document.createElement('span'); line.className = 'svc-line';
    Object.assign(line.style, { position: 'absolute', top: '0', bottom: '0', left: '0', width: '3px', zIndex: '2', background: 'var(--lime)', boxShadow: '0 0 16px 3px rgba(209,237,156,.7)' });
    svcBox.append(old, line);
    const opts = { duration: 900, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' };
    old.animate([{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 0 100%)' }], opts);
    line.animate([{ left: '0%' }, { left: '100%' }], opts).onfinish = () => { old.remove(); line.remove(); };
    svcImg.animate([{ transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 1200, easing: 'cubic-bezier(.22,1,.36,1)' });
    svcInfo.classList.add('swap'); requestAnimationFrame(() => requestAnimationFrame(() => svcInfo.classList.remove('swap')));
  }).observe(svcImg, { attributes: true, attributeOldValue: true, attributeFilter: ['src'] });

  /* ---------- Sobre ---------- */
  const aboutPhoto = document.querySelector('.about-photo');
  if (aboutPhoto) { const v = document.createElement('span'); v.className = 'veil'; aboutPhoto.append(v); }

  /* ---------- Botões magnéticos ---------- */
  if (fine) document.querySelectorAll('.hero-actions .button, .header-quote, .budget .form-submit, .reviews .button').forEach(b => {
    b.classList.add('mag');
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
})();
