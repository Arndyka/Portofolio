import {test,expect} from '@playwright/test';
import {chartFrame,monitoringFrame} from '../public/illustration-frames.js';

test('chart observations update one at a time with bounded smooth movement',()=>{
 for(let time=0;time<100;time+=.1){
  const before=chartFrame(time),after=chartFrame(time+.03);
  expect(after.filter((value,index)=>Math.abs(value-before[index])>.00001).length).toBeLessThanOrEqual(1);
  for(const value of after)expect(value).toBeGreaterThanOrEqual(70);
  for(const value of after)expect(value).toBeLessThanOrEqual(235);
  expect(Math.max(...after.map((value,index)=>Math.abs(value-before[index])))).toBeLessThan(1);
 }
});

test('demo risk score is the mean of its four visible component values',()=>{
 const totals=[];
 for(let time=0;time<25;time+=.11){
  const {components,total}=monitoringFrame(time);totals.push(total);
  expect(total).toBe(Math.round(components.reduce((sum,value)=>sum+value,0)/4));
  for(const value of components){expect(value).toBeGreaterThanOrEqual(0);expect(value).toBeLessThanOrEqual(100);}
 }
 expect(Math.min(...totals)).toBeLessThan(50);expect(Math.max(...totals)).toBeGreaterThan(70);
});

test('rendered monitoring ring bars and values agree at a paused frame',async({page})=>{
 await page.goto('/Portofolio/projects/pam/');await page.locator('.case-figure').scrollIntoViewIfNeeded();
 await expect.poll(()=>page.locator('.risk-total').textContent()).not.toBe('64');
 await page.getByRole('button',{name:'Jeda animasi',exact:true}).click();
 await expect(page.getByRole('button',{name:'Putar animasi',exact:true})).toHaveAttribute('aria-pressed','true');
 const frame=await page.locator('.art-security').evaluate(svg=>({
  total:Number(svg.querySelector('.risk-total').textContent),
  ring:svg.querySelector('.risk-ring').getAttribute('stroke-dasharray').split(' ').map(Number),
  values:[...svg.querySelectorAll('.risk-value')].map(el=>Number(el.textContent)),
  widths:[...svg.querySelectorAll('.risk-bar')].map(el=>Number(el.getAttribute('width'))),
 }));
 expect(frame.total).toBe(Math.round(frame.values.reduce((sum,value)=>sum+value,0)/4));
 expect(frame.ring).toEqual([frame.total,100-frame.total]);
 frame.widths.forEach((width,index)=>expect(width/143*100).toBeCloseTo(frame.values[index],1));
});
