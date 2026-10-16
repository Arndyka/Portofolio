import {test,expect} from '@playwright/test';

for(const locale of ['', 'en/'])test(`${locale || 'id/'} project grid adapts from three to two to one readable columns`,async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/Portofolio/'+locale);
 for(const [width,columns] of [[1920,3],[1440,3],[1280,3],[1199,2],[960,2],[768,2],[700,1],[390,1],[320,1]]){
  await page.setViewportSize({width,height:900});
  const layout=await page.locator('.projects-grid').evaluate(grid=>{
   const cards=[...grid.children].map(card=>card.getBoundingClientRect());
   return {columns:cards.filter(card=>Math.abs(card.top-cards[0].top)<1).length,
    overflow:document.documentElement.scrollWidth>innerWidth+1,
    bodySizes:[...grid.querySelectorAll('.project-copy>p')].map(p=>parseFloat(getComputedStyle(p).fontSize)),
    clipped:[...grid.querySelectorAll('.project-copy,.project-copy h3,.card-tech')].some(el=>el.scrollWidth>el.clientWidth+1)};
  });
  expect(layout.columns,`${width}px`).toBe(columns);
  expect(layout.overflow,`${width}px page overflow`).toBe(false);
  expect(layout.clipped,`${width}px clipped card text`).toBe(false);
  expect(Math.min(...layout.bodySizes)).toBeGreaterThanOrEqual(16);
  if(columns===3){
   const positions=await page.locator('.project-card').evaluateAll(cards=>cards.slice(6).map(card=>({
    title:card.querySelector('h3').getBoundingClientRect().top,
    description:card.querySelector('.project-copy>p').getBoundingClientRect().top,
   })));
   for(const field of ['title','description'])expect(Math.max(...positions.map(p=>p[field]))-Math.min(...positions.map(p=>p[field])),`${width}px aligned ${field}`).toBeLessThan(1);
  }
 }
});

test('Spendly demo remaining budget agrees with its progress bar',async({page})=>{
 await page.goto('/Portofolio/projects/spendly/');
 const svg=page.locator('.art-spendly');await svg.scrollIntoViewIfNeeded();
 const amount=svg.locator('.budget-amount');
 await expect(amount).toHaveCount(1);
 const initial=await amount.textContent();
 await expect.poll(()=>amount.textContent()).not.toBe(initial);
 await page.getByRole('button',{name:'Jeda animasi',exact:true}).click();
 const budget=await svg.evaluate(el=>({
  remaining:Number(el.querySelector('.budget-amount').textContent.replace(/\D/g,'')),
  limit:Number(el.querySelector('.budget-limit').textContent.replace(/\D/g,'')),
  width:Number(el.querySelector('.app-progress').getAttribute('width')),
  track:Number(el.querySelector('.budget-track').getAttribute('width')),
 }));
 expect(budget.remaining).toBeGreaterThan(0);
 expect(budget.remaining).toBeLessThanOrEqual(budget.limit);
 expect(budget.width/budget.track).toBeCloseTo(budget.remaining/budget.limit,3);
});
