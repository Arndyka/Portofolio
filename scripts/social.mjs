// Regenerate the share card after changing profile positioning or typography.
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { disciplineIcon } from './icons.mjs';

const font=(await readFile('public/assets/fonts/manrope.woff2')).toString('base64');
const browser=await chromium.launch({headless:true,...(process.platform==='win32'?{channel:'msedge'}:{})});
try {
 const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
 await page.setContent(`<style>
 @font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:400 800}
 *{box-sizing:border-box}body{margin:0;background:#0c2230;color:#f5f6f2;font-family:Manrope,Arial,sans-serif;padding:64px 76px}
 header{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #36505b;padding-bottom:28px}
 .brand{font-size:34px;font-weight:800;letter-spacing:-1.5px}.brand span{color:#9be5cf}.label{font-size:16px;letter-spacing:2px;color:#b2c9cf}
 h1{font-size:64px;font-weight:600;line-height:1.2;letter-spacing:-2.5px;margin:48px 0 22px;max-width:1000px}
 p{font-size:25px;color:#9be5cf;margin:0}.bottom{margin-top:60px;display:flex;justify-content:space-between;align-items:center;color:#b2c9cf;font-size:18px}
 .icons{display:flex;gap:20px;color:#9be5cf}.icons svg{width:28px;height:28px}
 </style><header><div class="brand">arnoldus<span>.</span></div><div class="label">PROFESSIONAL PORTFOLIO / 2026</div></header>
 <h1>Arnoldus Gratio<br>Darryl Andyka</h1><p>Engineering, AI & Banking Technology</p>
 <div class="bottom"><span>Research · Data Analysis · Application Development</span><div class="icons">${['engineering','data','ai','banking'].map(disciplineIcon).join('')}</div></div>`);
 await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:'public/assets/social.png'});
} finally {await browser.close();}
