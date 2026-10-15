import { initializeMotion } from './motion.js';
import { initializeGlobe } from './globe.js';
import { initializeIllustrations } from './illustrations.js';
document.documentElement.classList.add('js');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
function closeMenu(){menu?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open');}
menu?.addEventListener('click',()=>{
 const open=menu.getAttribute('aria-expanded')!=='true';
 menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);
});
nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.addEventListener('click',e=>{if(!e.target.closest('.header-inner'))closeMenu();});
const filters=[...document.querySelectorAll('[data-filter]')];
const cards=[...document.querySelectorAll('.project-card')];
const count=document.querySelector('#project-count');
for(const button of filters)button.addEventListener('click',()=>{
 const category=button.dataset.filter;
 for(const filter of filters)filter.setAttribute('aria-pressed',String(filter===button));
 let shown=0;
 for(const card of cards){card.hidden=category!=='all'&&card.dataset.category!==category;if(!card.hidden){shown++;card.classList.add('is-visible');}}
 if(count)count.textContent=`${shown} ${count.dataset.label}`;
});
document.querySelector('.print-button')?.addEventListener('click',()=>window.print());
const motion = initializeMotion();
initializeGlobe(document.querySelector('.globe-canvas'), motion);
initializeIllustrations(motion);
const header = document.querySelector('.site-header');
function updateHeader(){header?.classList.toggle('is-scrolled',window.scrollY>64);}
addEventListener('scroll',updateHeader,{passive:true});
updateHeader();
