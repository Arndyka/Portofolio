export function initializeMotion() {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const buttons = [...document.querySelectorAll('.motion-toggle')];
  const listeners = new Set();
  let userPaused = false;
  try { userPaused = localStorage.getItem('portfolio-motion') === 'paused'; } catch {}
  const controller = {
    get paused() { return reduced.matches || userPaused || document.hidden; },
    subscribe(callback) { listeners.add(callback); return () => listeners.delete(callback); },
  };
  function update() {
    const paused = controller.paused;
    root.classList.toggle('motion-enabled', !paused);
    root.classList.toggle('motion-paused', paused);
    const id = root.lang === 'id';
    for (const button of buttons) {
      const label = reduced.matches
        ? (id ? 'Gerakan dikurangi sesuai pengaturan perangkat' : 'Motion reduced by device preference')
        : paused ? (id ? 'Putar animasi' : 'Play animations') : (id ? 'Jeda animasi' : 'Pause animations');
      button.disabled = reduced.matches;
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(paused));
      button.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
    }
    for (const listener of listeners) listener();
  }
  for (const button of buttons) button.addEventListener('click', () => {
    userPaused = !userPaused;
    try { localStorage.setItem('portfolio-motion', userPaused ? 'paused' : 'playing'); } catch {}
    update();
  });
  reduced.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  const reveals = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    }, { threshold: .05, rootMargin: '0px 0px -16px 0px' });
    reveals.forEach(element => revealObserver.observe(element));
    const surfaceObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('is-active', entry.isIntersecting));
    }, { threshold: 0 });
    document.querySelectorAll('[data-motion-surface]').forEach(element => surfaceObserver.observe(element));
  } else {
    reveals.forEach(element => element.classList.add('is-visible'));
    document.querySelectorAll('[data-motion-surface]').forEach(element => element.classList.add('is-active'));
  }
  document.addEventListener('focusin', event => {
    event.target.closest('[data-reveal]')?.classList.add('is-visible');
  });
  update();
  return controller;
}
