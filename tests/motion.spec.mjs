import { test, expect } from '@playwright/test';
const home='/Portofolio/';

test('important text stays readable on desktop and a narrow phone',async({page})=>{
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:900});
  for(const route of ['', 'en/', 'projects/radar/']){
   await page.goto(home+route);
   const small=await page.locator('.eyebrow,.tags li,.card-tech,#project-count,.timeline-date,.filters button,#main-nav a,.language,.visual-note,.case-figure figcaption,.contact-links small').evaluateAll(nodes=>nodes.filter(n=>getComputedStyle(n).display!=='none'&&parseFloat(getComputedStyle(n).fontSize)<14).map(n=>({text:n.textContent.trim().slice(0,50),size:getComputedStyle(n).fontSize})));
   expect(small).toEqual([]);
   const body=await page.locator('.hero-intro,.project-copy>p,.experience-row p,.case-story section>p:not(.eyebrow),.contact-grid>div>p').evaluateAll(nodes=>nodes.filter(n=>parseFloat(getComputedStyle(n).fontSize)<16).map(n=>n.textContent.slice(0,60)));
   expect(body).toEqual([]);
  }
 }
});

test('attached color portrait replaces the previous photo on home and profile',async({page})=>{
 for(const route of ['', 'en/', 'profile/', 'en/profile/']){
  await page.goto(home+route);
  const photo=page.locator('img[alt="Arnoldus Gratio Darryl Andyka"]').first();
  await expect(photo).toBeVisible();
  await expect.poll(()=>photo.evaluate(img=>img.naturalWidth)).toBe(867);
  await expect(photo).toHaveCSS('filter','none');
 }
});

test('globe animates, pauses and resumes with the user control',async({page})=>{
 await page.goto(home);
 const canvas=page.locator('.globe-canvas');await canvas.scrollIntoViewIfNeeded();
 await expect.poll(()=>canvas.evaluate(el=>el.width)).toBeGreaterThan(300);
 await expect.poll(()=>canvas.evaluate(el=>el.getContext('2d').getImageData(el.width/2,el.height/2,1,1).data[3])).toBeGreaterThan(0);
 const first=await canvas.evaluate(el=>el.toDataURL());
 await expect.poll(()=>canvas.evaluate(el=>el.toDataURL())).not.toBe(first);
 await page.getByRole('button',{name:'Jeda animasi',exact:true}).click();
 await expect(page.locator('html')).toHaveClass(/motion-paused/);
 const paused=await canvas.evaluate(el=>el.toDataURL());
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))));
 expect(await canvas.evaluate(el=>el.toDataURL())).toBe(paused);
 await page.getByRole('button',{name:'Putar animasi',exact:true}).click();
 await canvas.scrollIntoViewIfNeeded();
 await expect.poll(()=>canvas.evaluate(el=>el.toDataURL())).not.toBe(paused);
});

test('reduced motion exposes content and suppresses movement automatically',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(home);
 await expect(page.locator('html')).toHaveClass(/motion-paused/);
 await expect(page.getByRole('button',{name:'Gerakan dikurangi sesuai pengaturan perangkat'})).toBeDisabled();
 for(const selector of ['.hero h1','.network-section','.globe-section','.project-card','.experience-row']){
  await expect(page.locator(selector).first()).toHaveCSS('opacity','1');
 }
 const active=await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);
 expect(active).toBe(0);
});

test('scroll transitions never hide keyboard targets or no-JS content',async({browser,page})=>{
 await page.goto(home);
 const target=page.locator('.project-card > a').last();await target.focus();
 await expect(target).toBeFocused();await expect(target.locator('..')).toHaveCSS('opacity','1');
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const fallback=await context.newPage();await fallback.goto('http://127.0.0.1:4185'+home);
 await expect(fallback.locator('.network-section')).toBeVisible();
 await expect(fallback.locator('.globe-fallback')).toBeVisible();
 await expect(fallback.locator('.project-card')).toHaveCount(6);
 await context.close();
});
