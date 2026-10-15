import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const home='/Portofolio/';
test('home introduces the owner and real content without console errors',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(home);await expect(page.locator('h1')).toContainText('Teknologi');
 await expect(page.locator('.project-card')).toHaveCount(6);
 await expect(page.getByRole('link',{name:'Email Arnoldus'})).toHaveAttribute('href','mailto:arnolduzandy123@gmail.com');
 expect(errors).toEqual([]);
});
test('filters show matching projects and restore the whole collection',async({page})=>{
 await page.goto(home);await page.getByRole('button',{name:'AI & Banking',exact:true}).click();
 await expect(page.locator('.project-card:visible')).toHaveCount(1);
 await expect(page.getByRole('button',{name:'AI & Banking',exact:true})).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#project-count')).toContainText('1');
 await page.getByRole('button',{name:'Semua',exact:true}).click();
 await expect(page.locator('.project-card:visible')).toHaveCount(6);
});
test('each case study and locale counterpart is reachable',async({page})=>{
 await page.goto(home);
 const links=await page.locator('.project-card > a').evaluateAll(a=>a.map(x=>x.href));
 expect(links.length).toBe(6);
 for(const href of links){
  const res=await page.goto(href);expect(res.status()).toBe(200);
  await expect(page.locator('h1')).toBeVisible();
  await page.getByRole('link',{name:'English',exact:true}).click();
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  expect(page.url()).toContain('/en/projects/');
  await expect(page.getByRole('heading',{name:'The challenge',exact:true})).toBeVisible();
 }
});
test('English homepage and printable profile work',async({page})=>{
 await page.goto(home+'en/');await expect(page.locator('h1')).toContainText('Technology');
 await page.getByRole('link',{name:'View profile',exact:true}).click();
 await expect(page.locator('h1')).toContainText('Arnoldus');
 await expect(page.getByRole('button',{name:'Print / Save PDF'})).toBeVisible();
});
test('mobile navigation opens, selects a link and closes with Escape',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto(home);
 const menu=page.getByRole('button',{name:'Menu',exact:true});
 await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');
 await page.locator('#main-nav').getByRole('link',{name:'Pengalaman',exact:true}).click();
 await expect(menu).toHaveAttribute('aria-expanded','false');
 await menu.click();await page.keyboard.press('Escape');await expect(menu).toHaveAttribute('aria-expanded','false');
});
for(const width of [320,390,768,1440])test(`pages fit ${width}px viewport`,async({page})=>{
 await page.setViewportSize({width,height:900});
 for(const route of ['', 'en/','projects/pam/','en/projects/radar/','profile/']){
  await page.goto(home+route);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
});
test('semantic pages meet automated accessibility checks',async({page})=>{
 for(const route of ['', 'en/', 'projects/pam/','profile/']){
  await page.goto(home+route);
  // Reveal each section as a visitor scrolls, then audit settled text colors.
  for (const element of await page.locator('[data-reveal]').all()) await element.scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('[data-reveal]').evaluateAll(elements => elements.every(element => getComputedStyle(element).opacity === '1'))).toBe(true);
  await page.evaluate(() => document.fonts.ready);
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
 }
});
test('no JavaScript still exposes all work and usable navigation',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const page=await context.newPage();await page.goto('http://127.0.0.1:4185'+home);
 await expect(page.locator('.project-card')).toHaveCount(6);
 await expect(page.locator('#main-nav').getByRole('link',{name:'Proyek',exact:true})).toBeVisible();
 await page.locator('.project-card > a').first().click();await expect(page.locator('h1')).toBeVisible();await context.close();
});
test('every local link and image resolves',async({page,request})=>{
 for(const route of ['', 'en/', 'projects/pam/','profile/']){
  await page.goto(home+route);
  const urls=await page.locator('a[href],img[src],link[rel="stylesheet"],script[src]').evaluateAll(nodes=>nodes.map(n=>n.href||n.src).filter(x=>x&&x.startsWith(location.origin)));
  for(const url of new Set(urls)){const res=await request.get(url);expect(res.status(),url).toBe(200);}
 }
});
test('404 helps a visitor return home',async({page})=>{
 const res=await page.goto(home+'missing-page');expect(res.status()).toBe(404);
 await page.getByRole('link',{name:'English',exact:true}).click();
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.getByRole('link',{name:'Back to home',exact:true})).toBeVisible();
 await page.goto(home+'missing-page');
 await page.getByRole('link',{name:'Kembali ke beranda'}).click();await expect(page.locator('h1')).toContainText('Teknologi');
});
test('reduced motion and keyboard filter access remain usable',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(home);
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
 const filter=page.getByRole('button',{name:'Engineering',exact:true});await filter.focus();await page.keyboard.press('Enter');
 await expect(page.locator('.project-card:visible')).toHaveCount(3);await expect(filter).toBeFocused();
});
test('printing hides controls while retaining profile and contact information',async({page})=>{
 await page.goto(home+'profile/');await page.emulateMedia({media:'print'});
 await expect(page.locator('.site-header')).not.toBeVisible();await expect(page.locator('.print-button')).not.toBeVisible();
 await expect(page.locator('h1')).toContainText('Arnoldus');
 await expect(page.locator('.profile-heading').getByRole('link',{name:'arnolduzandy123@gmail.com'})).toBeVisible();
});
