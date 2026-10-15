// One lightweight clock for visible illustrations. SVG remains useful without JS.
export function initializeIllustrations(motion) {
  const scenes = [...document.querySelectorAll('[data-animated-art]')].map(svg => {
    const kind = svg.dataset.animatedArt;
    const find = selector => svg.querySelector(selector);
    if (kind === 'data') {
      const line = find('.chart-line'), area = find('.chart-area');
      const dots = [...svg.querySelectorAll('.chart-dot')];
      const x = [50,130,210,290,370,450,550];
      const base = [219,188,200,139,157,105,82], amplitude = [11,25,20,32,26,22,13];
      return { svg, draw(time) {
        const y = base.map((value,i) => value + amplitude[i] * Math.sin(time * 1.2) * Math.cos(i * .7 + time * .4));
        const path = x.map((value,i) => `${i ? 'L' : 'M'}${value} ${y[i].toFixed(2)}`).join('');
        line.setAttribute('d',path); area.setAttribute('d',path+'V245H50Z');
        dots.forEach((dot,i) => dot.setAttribute('cy',y[i].toFixed(2)));
      }};
    }
    if (kind === 'iot') {
      const left=find('.curtain-left'), right=find('.curtain-right');
      return { svg, draw(time) {
        // Hold briefly at each end, then ease the pleated panels open or closed.
        const progress=Math.max(0,Math.min(1,(Math.sin(time * .8) + 1) * .7 - .2));
        const width=(.28 + .72 * (progress * progress * (3 - 2 * progress))).toFixed(4);
        left.setAttribute('transform',`translate(65 0) scale(${width} 1)`);
        right.setAttribute('transform',`translate(275 0) scale(${width} 1)`);
      }};
    }
    if (kind === 'antenna') {
      const pattern=find('.antenna-pattern');
      return { svg, draw(time) {
        pattern.setAttribute('transform',`rotate(${(time * 13).toFixed(3)}) scale(${(.95 + .07 * Math.sin(time * 1.4)).toFixed(4)})`);
      }};
    }
    if (kind === 'lab') {
      const wave=find('.lab-wave');
      return { svg, draw(time) {
        const points=Array.from({length:109},(_,i) => {
          const x=i * 215 / 108;
          const y=79 - 32 * Math.sin(x * Math.PI * 2 / 70 + time * 2.2);
          return `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
        });
        wave.setAttribute('d',points.join(''));
      }};
    }
    return null;
  }).filter(Boolean);
  if (!scenes.length) return;
  const active=new Set();
  const printing=matchMedia('print');
  let frame=0, lastTime=0;
  scenes.forEach(scene => { scene.time=0; });
  function tick(time) {
    frame=0;
    if (motion.paused || printing.matches || !active.size) return;
    if (!lastTime) lastTime=time;
    if (time-lastTime >= 32) {
      const elapsed=Math.min(time-lastTime,100)/1000; lastTime=time;
      active.forEach(scene => { scene.time+=elapsed; scene.draw(scene.time); });
    }
    frame=requestAnimationFrame(tick);
  }
  function sync() {
    if (frame) cancelAnimationFrame(frame);
    frame=0; lastTime=0;
    if (!motion.paused && !printing.matches && active.size) frame=requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window) {
    const byElement=new Map(scenes.map(scene => [scene.svg,scene]));
    const observer=new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const scene=byElement.get(entry.target);
        if(entry.isIntersecting) active.add(scene); else active.delete(scene);
      });
      sync();
    });
    scenes.forEach(scene => observer.observe(scene.svg));
  } else scenes.forEach(scene => active.add(scene));
  motion.subscribe(sync);
  printing.addEventListener('change',sync);
  sync();
}
