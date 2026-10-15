const paths = {
  engineering: '<path d="M4 4h16v16H4zM4 10h6V4M10 20v-4h10M14 8h3M7 14v3"/><circle cx="14" cy="12" r="2"/>',
  data: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7"/>',
  ai: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 10h4v4h-4z"/>',
  banking: '<path d="m3 8 9-5 9 5H3ZM5 10v8M10 10v8M14 10v8M19 10v8M3 18h18M2 21h20"/>',
};

export function disciplineIcon(name) {
  return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
}
