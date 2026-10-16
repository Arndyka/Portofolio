import {retailFrame, budgetFrame, plannerFrame} from '../public/illustration-frames.js';

export function appArt(kind){
 const t=(x,y,s,size=16,cls='')=>`<text class="${cls}" x="${x}" y="${y}" fill="#b6dacc" font-family="monospace" font-size="${size}">${s}</text>`;
 if(kind==='retail')return `<rect x="52" y="43" width="496" height="244" rx="15" fill="#183640" stroke="#486c70"/>
  ${t(77,78,'RETAIL PERFORMANCE',18)}${t(77,110,'SYNTHETIC DATA / 2025',12)}
  <path d="M80 244H520M80 200H520M80 156H520" stroke="#32535b"/>
  ${retailFrame(0).map((h,i)=>`<rect class="app-bar" x="${93+i*68}" y="${(254-h).toFixed(2)}" width="37" height="${h.toFixed(2)}" rx="5" fill="${i===5?'#d8c58a':'#8ccab5'}"/>`).join('')}`;
 if(kind==='spendly'){
  const {remaining,limit}=budgetFrame(0), format=new Intl.NumberFormat('id-ID');
  return `<rect x="190" y="24" width="220" height="282" rx="25" fill="#183640" stroke="#7fa89d" stroke-width="2"/>
   <rect x="265" y="36" width="70" height="5" rx="3" fill="#6a9189"/>
   ${t(215,77,'SPENDLY',20)}${t(215,109,'DEMO / REMAINING',12)}${t(215,145,'Rp'+format.format(remaining),24,'budget-amount')}
   <rect class="budget-track" x="214" y="165" width="170" height="13" rx="6" fill="#34555c"/>
   <rect class="app-progress" x="214" y="165" width="${(170*remaining/limit).toFixed(2)}" height="13" rx="6" fill="#a1ddc2"/>
   ${t(215,197,'LIMIT Rp'+format.format(limit),12,'budget-limit')}
   ${[0,1,2].map(v=>`<circle cx="225" cy="${221+v*26}" r="6" fill="#c6b985"/><path d="M245 ${221+v*26}H375" stroke="#5c827f" stroke-width="5" stroke-linecap="round"/>`).join('')}`;
 }
 if(kind==='planner'){
  const {x,y}=plannerFrame(0);
  return `<rect x="93" y="57" width="414" height="224" rx="16" fill="#193641" stroke="#709a94"/>
   <path d="M93 112H507" stroke="#5b807f"/><path d="M180 43V74M420 43V74" stroke="#bddfd0" stroke-width="9" stroke-linecap="round"/>
   ${t(119,96,'PLAN / TOGETHER',20)}
   ${[0,1,2,3,4].map(c=>[0,1,2].map(r=>`<rect x="${119+c*73}" y="${132+r*45}" width="52" height="30" rx="6" fill="#294b54"/>`).join('')).join('')}
   <g class="planner-selection" transform="translate(${x.toFixed(2)} ${y.toFixed(2)})"><rect width="52" height="30" rx="6" fill="#a3d6c0"/><path class="planner-check" d="M12 14L20 22L35 7" stroke="#133b3c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>
   <circle class="app-indicator" cx="437" cy="237" r="9" fill="#d8c58a"/>`;
 }
 return '';
}
