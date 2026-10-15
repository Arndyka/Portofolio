// Canvas enhancement; the generated SVG remains the no-JS/network-error fallback.
export async function initializeGlobe(canvas, motion) {
  if (!canvas) return;
  const context = canvas.getContext('2d');
  if (!context) return;
  let points;
  try {
    const response = await fetch(canvas.dataset.points);
    if (!response.ok) return;
    points = await response.json();
    if (!Array.isArray(points) || points.length < 50) return;
  } catch { return; }
  const vectors = points.map(([longitude, latitude]) => ({
    longitude, cosine: Math.cos(latitude), sine: Math.sin(latitude),
  }));
  const stage = canvas.closest('.globe-stage');
  const visual = canvas.closest('.globe-visual');
  let rotation = -1.8, frame = 0, lastTime = 0, visible = false;
  function draw() {
    const size = canvas.width, center = size / 2, radius = size * .375;
    context.clearRect(0, 0, size, size);
    const glow = context.createRadialGradient(center, center, radius * .8, center, center, radius * 1.28);
    glow.addColorStop(0, 'rgba(57,204,179,0)');
    glow.addColorStop(.64, 'rgba(57,204,179,.2)');
    glow.addColorStop(1, 'rgba(57,204,179,0)');
    context.fillStyle = glow;
    context.fillRect(0, 0, size, size);
    const sphere = context.createRadialGradient(center - radius * .3, center - radius * .4, 0, center, center, radius);
    sphere.addColorStop(0, '#194b55');
    sphere.addColorStop(.7, '#102c3b');
    sphere.addColorStop(1, '#0b2331');
    context.beginPath(); context.arc(center, center, radius, 0, Math.PI * 2);
    context.fillStyle = sphere; context.fill();
    context.strokeStyle = 'rgba(126,234,209,.35)'; context.lineWidth = size / 600; context.stroke();
    // Land dots derived from public-domain Natural Earth land geometry.
    for (const point of vectors) {
      const angle = point.longitude + rotation;
      const z = point.cosine * Math.cos(angle);
      if (z < 0) continue;
      const x = center + point.cosine * Math.sin(angle) * radius;
      const y = center - point.sine * radius;
      const dot = (1 + z * .85) * size / 600;
      context.beginPath(); context.arc(x, y, dot, 0, Math.PI * 2);
      context.fillStyle = `rgba(157,239,219,${.22 + z * .73})`; context.fill();
    }
    stage.classList.add('canvas-ready');
  }
  function tick(time) {
    frame = 0;
    if (!visible || motion.paused) return;
    if (time - lastTime >= 32) {
      rotation += Math.min(time - (lastTime || time), 60) * .00008;
      lastTime = time;
      draw();
      const bounds = stage.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - bounds.top) / (innerHeight + bounds.height)));
      visual.style.transform = `translateY(${(progress - .5) * -18}px) scale(${1 + progress * .06})`;
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0; lastTime = 0;
    if (visible && !motion.paused) frame = requestAnimationFrame(tick);
    else { visual.style.transform = ''; draw(); }
  }
  function resize() {
    const size = Math.round(Math.min(canvas.clientWidth || 500, 600) * Math.min(devicePixelRatio || 1, 1.5));
    canvas.width = size; canvas.height = size; draw();
  }
  new ResizeObserver(resize).observe(canvas);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }).observe(stage);
  } else { visible = true; }
  motion.subscribe(sync);
  resize(); sync();
}
