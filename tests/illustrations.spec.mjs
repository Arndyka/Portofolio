import { test, expect } from '@playwright/test';

const illustrations=[['stunting','.chart-line','d'],['iot-curtain','.curtain-left','transform'],['antenna','.rf-main-lobe','d'],['pam','.risk-ring','stroke-dasharray'],['practicum','.lab-wave','d'],['retail','.app-bar','height'],['spendly','.app-progress','width'],['date-planner','.planner-selection','transform']];
for(const [slug,selector,attribute] of illustrations) test(`${slug} illustration moves and respects pause and reduced motion`,async({page})=>{
 await page.goto('/Portofolio/projects/'+slug+'/');
 const figure=page.locator('.case-figure');await figure.scrollIntoViewIfNeeded();
 const moving=figure.locator(selector);expect(await moving.count()).toBeGreaterThan(0);
 const snapshot=()=>moving.evaluateAll((nodes,attribute)=>nodes.map(node=>node.getAttribute(attribute)).join('|'),attribute);
 const initial=await snapshot();
 await expect.poll(snapshot).not.toBe(initial);
 await page.getByRole('button',{name:'Jeda animasi',exact:true}).click();
 await expect(page.getByRole('button',{name:'Putar animasi',exact:true})).toHaveAttribute('aria-pressed','true');
 const paused=await snapshot();
 await page.waitForTimeout(150);
 expect(await snapshot()).toBe(paused);
 await page.getByRole('button',{name:'Putar animasi',exact:true}).click();
 await expect.poll(snapshot).not.toBe(paused);
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.getByRole('button',{name:'Gerakan dikurangi sesuai pengaturan perangkat'})).toBeDisabled();
 const reduced=await snapshot();
 await page.waitForTimeout(150);
 expect(await snapshot()).toBe(reduced);
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
