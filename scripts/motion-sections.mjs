import { readFileSync } from 'node:fs';
import { profile } from '../content/profile.mjs';
import { disciplineIcon } from './icons.mjs';
const pick=(l,id,en)=>l==='id'?id:en;
const points=JSON.parse(readFileSync(new URL('../public/assets/globe-points.json',import.meta.url),'utf8'));

export function heroSection(l,base){
 const root=base+(l==='en'?'en/':'');
 return `<section class="hero" data-motion-surface>
  <div class="hero-atmosphere" aria-hidden="true"><div class="light-beam beam-one"></div><div class="light-beam beam-two"></div><div class="hero-grid-lines"></div></div>
  <div class="container">
   <div class="hero-topline"><span>PORTFOLIO / 2026</span><span><i class="status-dot" aria-hidden="true"></i> BASED IN INDONESIA</span></div>
   <div class="hero-grid">
    <div class="hero-copy">
     <p class="eyebrow hero-eyebrow">${pick(l,'ARNOLDUS GRATIO DARRYL ANDYKA','ARNOLDUS GRATIO DARRYL ANDYKA')}</p>
     <h1><span class="hero-line">${pick(l,'Teknologi,','Technology,')}</span> <span class="hero-line">${pick(l,'data &','data &')}</span> <span class="hero-line"><em>${pick(l,'perbankan.','banking.')}</em></span></h1>
     <p class="hero-intro">${profile.intro[l]}</p>
     <div class="hero-actions"><a class="button primary" href="#work">${pick(l,'Lihat proyek','Explore work')} <span aria-hidden="true">↗</span></a><a class="text-link" href="${root}profile/">${pick(l,'Lihat profil','View profile')} <span aria-hidden="true">↗</span></a></div>
    </div>
    <div class="portrait-composition">
     <div class="portrait-orbit" aria-hidden="true"></div>
     <figure class="portrait-frame">
      <div class="portrait-photo"><img src="${base}assets/portrait.jpg" width="867" height="1280" alt="Arnoldus Gratio Darryl Andyka" fetchpriority="high"></div>
      <figcaption class="portrait-caption"><div><span class="eyebrow">ENGINEERING · AI · BANKING</span><p>Arnoldus Gratio<br>Darryl Andyka</p></div><span class="portrait-star" aria-hidden="true">✳</span></figcaption>
     </figure>
     <p class="portrait-note"><span aria-hidden="true">↳</span> ${pick(l,'Riset, analisis data, dan pengembangan aplikasi.','Research, data analysis, and application development.')}</p>
    </div>
   </div>
   <div class="hero-bottom"><span>${pick(l,'Teknik Telekomunikasi','Telecommunication Engineering')}</span><span>Telkom University</span><a href="#connections">${pick(l,'Lihat kompetensi','View expertise')} ↓</a></div>
  </div>
 </section>`;
}

export function networkSection(l){
 const paths=['M190 84H310Q350 84 350 124V176H450','M190 280H310Q350 280 350 240V204H450','M810 84H690Q650 84 650 124V176H550','M810 280H690Q650 280 650 240V204H550'];
 const mobile=['M130 75V150Q130 190 170 190H240','M470 75V150Q470 190 430 190H360','M130 325V250Q130 210 170 210H240','M470 325V250Q470 210 430 210H360'];
 const lines=(arr,cls,box)=>`<svg class="circuit-lines ${cls}" viewBox="${box}" preserveAspectRatio="none" aria-hidden="true">${arr.map((d,i)=>`<path class="circuit-track" d="${d}"/><path class="circuit-pulse" d="${d}" pathLength="100" style="--delay:${i*-1.4}s"/>`).join('')}</svg>`;
 return `<section class="network-section" id="connections" data-motion-surface><div class="container">
  <div class="network-heading" data-reveal><p class="eyebrow">${pick(l,'BIDANG KOMPETENSI','AREAS OF EXPERTISE')}</p><h2>${pick(l,'Kompetensi lintas bidang','Multidisciplinary expertise')}</h2><p>${pick(l,'Rekayasa sistem, analisis data, dan pengembangan AI dalam konteks teknologi perbankan.','Systems engineering, data analysis, and AI development in the context of banking technology.')}</p></div>
  <div class="network-map" data-reveal>${lines(paths,'desktop-circuit','0 0 1000 360')}${lines(mobile,'mobile-circuit','0 0 600 400')}
   <div class="network-hub"><span class="hub-mark" aria-hidden="true">a<span>.</span></span><strong>${pick(l,'Integrasi Kompetensi','Integrated Expertise')}</strong></div>
   <ul class="network-nodes"><li class="network-node node-engineering"><span class="node-symbol" aria-hidden="true">${disciplineIcon('engineering')}</span><span>Engineering<small>${pick(l,'Desain sistem','System design')}</small></span></li><li class="network-node node-data"><span class="node-symbol" aria-hidden="true">${disciplineIcon('data')}</span><span>Data<small>${pick(l,'Analisis data','Data analysis')}</small></span></li><li class="network-node node-ai"><span class="node-symbol" aria-hidden="true">${disciplineIcon('ai')}</span><span>AI<small>${pick(l,'Pengembangan AI','AI development')}</small></span></li><li class="network-node node-banking"><span class="node-symbol" aria-hidden="true">${disciplineIcon('banking')}</span><span>Banking<small>${pick(l,'Teknologi perbankan','Banking technology')}</small></span></li></ul>
  </div>
 </div></section>`;
}

function staticGlobe(){
 const dots=points.map(([lon,lat])=>{
  const a=lon-1.8,z=Math.cos(lat)*Math.cos(a);
  if(z<0)return '';
  return `<circle cx="${(300+Math.cos(lat)*Math.sin(a)*225).toFixed(1)}" cy="${(300-Math.sin(lat)*225).toFixed(1)}" r="${(1+z*.8).toFixed(1)}" opacity="${(.25+z*.65).toFixed(2)}"/>`;
 }).join('');
 return `<svg class="globe-fallback" viewBox="0 0 600 600" aria-hidden="true"><defs><radialGradient id="globe-fill"><stop stop-color="#153f49"/><stop offset=".8" stop-color="#0d2735"/><stop offset="1" stop-color="#1f6264"/></radialGradient></defs><circle cx="300" cy="300" r="225" fill="url(#globe-fill)" stroke="#5fb5a7" stroke-opacity=".5"/><g fill="#a8eee0">${dots}</g></svg>`;
}

export function globeSection(l,base){
 return `<section class="globe-section" data-motion-surface><div class="container globe-grid">
  <div class="globe-copy" data-reveal><p class="eyebrow">${pick(l,'LATAR BELAKANG TEKNIS','TECHNICAL BACKGROUND')}</p><h2>${pick(l,'Telekomunikasi dan<br><em>teknologi digital.</em>','Telecommunications<br><em>and digital technology.</em>')}</h2><p>${pick(l,'Dalam capstone radar dan riset antena, saya berkontribusi pada analisis sinyal, visualisasi pengukuran, desain perangkat, serta evaluasi prototipe. Kegiatan tersebut mengembangkan kemampuan saya dalam integrasi sistem, interpretasi data, dan dokumentasi pengujian.','In the radar capstone and antenna research, I contributed to signal analysis, measurement visualizations, hardware design, and prototype evaluation. These activities developed my skills in systems integration, data interpretation, and test documentation.')}</p><a class="text-link" href="#experience">${pick(l,'Lihat pengalaman','View experience')} <span aria-hidden="true">↗</span></a></div>
  <div class="globe-stage"><div class="globe-halo" aria-hidden="true"></div><div class="globe-orbit" aria-hidden="true"></div><div class="globe-visual">${staticGlobe()}<canvas class="globe-canvas" data-points="${base}assets/globe-points.json" width="600" height="600" aria-hidden="true"></canvas></div><p class="globe-caption"><i class="status-dot" aria-hidden="true"></i>${pick(l,'Indonesia · Engineering, AI & Banking Technology','Indonesia · Engineering, AI & Banking Technology')}</p></div>
 </div></section>`;
}
