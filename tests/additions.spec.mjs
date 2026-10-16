import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('retail and personal apps join both locales with usable demo and source links',async({page})=>{
 for(const locale of ['', 'en/']){
  await page.goto('/Portofolio/'+locale);
  await expect(page.locator('.project-card')).toHaveCount(9);
  await page.getByRole('button',{name:/Personal Apps|Aplikasi Pribadi/}).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(2);
  for(const slug of ['retail','spendly','date-planner']){
   await page.goto('/Portofolio/'+locale+'projects/'+slug+'/');
   await expect(page.locator('h1')).toBeVisible();
   await expect(page.locator('.project-resources a')).toHaveCount(2);
   for(const a of await page.locator('.project-resources a').all())expect(await a.getAttribute('href')).toMatch(/^https:\/\/(github\.com\/Arndyka|arndyka\.github\.io\/)/);
  }
 }
});
for(const width of [390,1440])for(const slug of ['retail','spendly','date-planner'])test(`${slug} at ${width}px fits and meets accessibility checks`,async({page},info)=>{
 await page.setViewportSize({width,height:900});
 await page.goto('/Portofolio/projects/'+slug+'/');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();expect(audit.violations).toEqual([]);
 await page.screenshot({path:info.outputPath(`${slug}-${width}.png`),fullPage:true});
});
