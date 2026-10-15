import { test, expect } from '@playwright/test';

const illustrations=[['stunting','.chart-line','d'],['iot-curtain','.curtain-left','transform'],['antenna','.dish-head','transform'],['pam','.risk-ring','stroke-dasharray'],['practicum','.lab-wave','d']];
for(const [slug,selector,attribute] of illustrations) test(`${slug} illustration moves and respects pause and reduced motion`,async({page})=>{
 await page.goto('/Portofolio/projects/'+slug+'/');
 const figure=page.locator('.case-figure');await figure.scrollIntoViewIfNeeded();
 const moving=figure.locator(selector);await expect(moving).toHaveCount(1);
 const initial=await moving.getAttribute(attribute);
 await expect.poll(()=>moving.getAttribute(attribute)).not.toBe(initial);
 await page.getByRole('button',{name:'Jeda animasi',exact:true}).click();
 await expect(page.getByRole('button',{name:'Putar animasi',exact:true})).toHaveAttribute('aria-pressed','true');
 const paused=await moving.getAttribute(attribute);
 await page.waitForTimeout(150);
 expect(await moving.getAttribute(attribute)).toBe(paused);
 await page.getByRole('button',{name:'Putar animasi',exact:true}).click();
 await expect.poll(()=>moving.getAttribute(attribute)).not.toBe(paused);
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.getByRole('button',{name:'Gerakan dikurangi sesuai pengaturan perangkat'})).toBeDisabled();
 const reduced=await moving.getAttribute(attribute);
 await page.waitForTimeout(150);
 expect(await moving.getAttribute(attribute)).toBe(reduced);
});

test('card illustrations stop updating offscreen and resume when visible',async({page})=>{
 await page.goto('/Portofolio/');
 const chart=page.locator('.art-data .chart-line');await chart.scrollIntoViewIfNeeded();
 const first=await chart.getAttribute('d');await expect.poll(()=>chart.getAttribute('d')).not.toBe(first);
 await page.locator('h1').scrollIntoViewIfNeeded();
 await expect(chart.locator('xpath=ancestor::article')).not.toHaveClass(/is-active/);
 await page.waitForTimeout(100);
 const hidden=await chart.getAttribute('d');await page.waitForTimeout(150);expect(await chart.getAttribute('d')).toBe(hidden);
 await chart.scrollIntoViewIfNeeded();await expect.poll(()=>chart.getAttribute('d')).not.toBe(hidden);
});
