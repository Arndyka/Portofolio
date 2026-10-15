# Verification record

Date: 15 October 2026 (Asia/Jakarta).

## Local checks

- `npm run build`: generated 20 localized content pages and 2 localized error pages.
- `npm test`: 15 Playwright checks passed, including automated axe WCAG A/AA checks on representative pages.
- Initial failures were reproduced and corrected: accessible filter label, timeline-number contrast, and missing English error page.
- Desktop/mobile screenshots visually inspected; the printable profile was rendered and inspected across all 3 pages.
- Tracked-file scan found no credential patterns and no source PDF, DOCX, spreadsheet, database, archive or video artifacts.

## Independent review

No Critical or Important findings. One minor encoding issue in English 404 copy was corrected before publication.

- All 22 pages fit 320, 390, 621, 768, 1024 and 1440 px widths.
- All 78 discovered local URLs resolved.
- All 10 filter interactions preserved focus and synchronized selected state, visible cards and count.
- All 20 content pages retained content and navigation without JavaScript.
- Reviewed internal-project descriptions distinguish preparation, team work, illustrative diagrams and limitations.
- Workflow action tags were checked in their official repositories; deployment uploads only `dist`.

Original professional facts were checked by the implementing agent against the supplied CV, portfolio, academic reports and project documentation. No unsupported business-impact metrics, production-adoption claims or certification claims were added. Review is not a comprehensive assistive-technology audit. Physical printer behavior can vary.

Deployment is independently recorded by the repository's **Test and deploy portfolio** Actions workflow and **github-pages** environment; its successful run and live URLs are the publication evidence.

## Published result

- Site: https://arndyka.github.io/Portofolio/
- Successful build and deploy: https://github.com/Arndyka/Portofolio/actions/runs/38704626422
- Deployed source: `a30393b31b3529d89750fd8d1b7bf9e0673da509`.
- GitHub Pages uses workflow deployment with HTTPS enforced.
- All 33 public files returned HTTP 200 and matched local build output (normalizing text line endings). This includes all 22 HTML pages, scripts, CSS, images, fonts, licenses, sitemap and robots file.
- The documentation-only verification commit does not change published website files.
