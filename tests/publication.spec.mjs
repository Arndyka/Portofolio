import { test, expect } from '@playwright/test';
import { readdir, readFile } from 'node:fs/promises';

test('published pages contain only the approved nine projects and their current titles', async ({ page, request }) => {
 const root='/Portofolio/';
 for (const locale of ['', 'en/']) {
  await page.goto(root+locale);
  await expect(page.locator('.project-card')).toHaveCount(9);
  await expect(page.locator('.project-card h3').first()).toHaveText('AI-Powered Access/session Monitoring');
  await expect(page.locator('#project-count')).toContainText('9');
  for (const removed of ['rabid', 'kopra']) {
   expect((await request.get(root+locale+'projects/'+removed+'/')).status()).toBe(404);
  }
 }
 const files=await readdir('dist',{recursive:true});
 for (const file of files.filter(file=>/\.(html|xml|js|json|svg|txt)$/.test(file))) {
  expect(await readFile('dist/'+file,'utf8'),file).not.toMatch(/rabid|kopra|AI for PAM|meeting follow-up|tindak lanjut rapat/i);
 }
});
