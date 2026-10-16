const smooth = value => value * value * (3 - 2 * value);

// One fixed beam direction; strength changes its length and angular width.
// This is a conceptual portfolio illustration, not a measured antenna pattern.
export function radiationFrame(time) {
  const strength = (1 - Math.cos(time * Math.PI / 6)) / 2;
  const spread = .65 - .4 * strength;
  const amplitude = 82 + 48 * strength;
  return Array.from({length:241}, (_,index) => {
    const angle = -Math.PI + index * Math.PI / 120;
    const radius = 6 + amplitude * Math.exp(-.5 * (angle / spread) ** 2);
    return `${index ? 'L' : 'M'}${(Math.sin(angle) * radius).toFixed(2)} ${(-Math.cos(angle) * radius).toFixed(2)}`;
  }).join('') + 'Z';
}

// Only one observation changes at a time; other observations keep their values.
export function chartFrame(time) {
  const snapshots = [
    [219,188,200,139,157,105,82],
    [204,165,182,156,136,119,98],
    [222,185,164,128,158,98,116],
    [211,176,197,148,142,112,88],
  ];
  const step = Math.floor(time / 3.2), active = step % 7;
  const cycle = Math.floor(step / 7) % snapshots.length;
  const from = snapshots[cycle], to = snapshots[(cycle + 1) % snapshots.length];
  const progress = smooth(Math.min(1, (time % 3.2) / 2.4));
  return from.map((value, index) => index < active ? to[index] : index === active ? value + (to[index] - value) * progress : value);
}

// Illustrative values only: total is the rounded mean of the four visible scores.
export function monitoringFrame(time) {
  const snapshots = [[72,56,80,48],[38,46,52,32],[81,73,89,65],[50,40,66,44]];
  const step = Math.floor(time / 5), from = snapshots[step % snapshots.length];
  const to = snapshots[(step + 1) % snapshots.length];
  const progress = smooth(Math.min(1, (time % 5) / 3.5));
  const components = from.map((value,index) => Math.round(value + (to[index] - value) * progress));
  return {components, total:Math.round(components.reduce((sum,value) => sum + value,0) / components.length)};
}

// Sequential illustrative retail updates, anchored to the same baseline.
export function retailFrame(time) {
  const snapshots = [
    [70,108,95,140,165,185],
    [95,82,120,166,138,172],
    [62,118,87,130,178,150],
  ];
  const step = Math.floor(time / 3.2), active = step % 6;
  const cycle = Math.floor(step / 6) % snapshots.length;
  const from = snapshots[cycle], to = snapshots[(cycle + 1) % snapshots.length];
  const progress = smooth(Math.min(1, (time % 3.2) / 2.4));
  return from.map((value,index) => index < active ? to[index] : index === active ? value + (to[index] - value) * progress : value);
}

// A fixed demo limit keeps the displayed amount and progress meaningful.
export function budgetFrame(time) {
  const snapshots = [3200000,2400000,3600000,2800000];
  const step = Math.floor(time / 5);
  const from = snapshots[step % snapshots.length], to = snapshots[(step + 1) % snapshots.length];
  const progress = smooth(Math.min(1, (time % 5) / 3.5));
  const remaining = Math.round((from + (to - from) * progress) / 10000) * 10000;
  return {remaining, limit:4000000};
}

// Hold on a date before easing the selection and its check to the next cell.
export function plannerFrame(time) {
  const cells = [[2,1],[3,1],[3,0],[1,0],[1,2],[2,2]];
  const step = Math.floor(time / 4);
  const from = cells[step % cells.length], to = cells[(step + 1) % cells.length];
  const progress = smooth(Math.max(0, Math.min(1, (time % 4 - 1.8) / 1.2)));
  return {
    x:119 + 73 * (from[0] + (to[0] - from[0]) * progress),
    y:132 + 45 * (from[1] + (to[1] - from[1]) * progress),
    checkOpacity:1 - .8 * Math.sin(progress * Math.PI),
  };
}
