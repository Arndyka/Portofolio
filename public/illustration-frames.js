const smooth = value => value * value * (3 - 2 * value);

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
