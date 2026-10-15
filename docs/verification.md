# Verification record

Date: 15 October 2026 (Asia/Jakarta).

## Animated visual refresh

- Retained navy/teal, enlarged body text to 16–18 px and UI labels to at least 14 px, and rebuilt responsive spacing and cards.
- Replaced the previous portrait with the owner's exact attached 867 × 1280 color JPEG; removed the unused previous image from published assets.
- Added staged hero text, light beams, circuit pulses, dotted land globe, scroll reveals, project diagram motion, floating navigation and contact glow.
- Persistent pause, device reduced-motion preference, offscreen suspension, hidden-tab suspension, keyboard access and static fallbacks are implemented.
- `npm.cmd run build`: 20 localized content pages and 2 localized error pages.
- `npm.cmd test`: all 20 browser tests passed. Checks include readable type, new portrait, changing/frozen/resumed globe frames, reduced-motion suppression, no-JavaScript fallback, navigation, links, four viewport widths and automated axe checks on settled visible content.
- Visually inspected desktop and phone hero, portrait, network, project cards, globe, case study and profile. Rendered and inspected both pages of the refreshed printable profile.
- `git diff --check` passed. The reference video and QA screenshots remain ignored local files.
- Independent read-only review of `91d04ee..14fa3638` found no defects and approved merge. Additional browser probes covered nine widths from 320–1440 px, sticky-header bounds, persisted pause with zero running animations, and no-JavaScript navigation at 320 px. Review used Edge; cross-engine behavior has not been independently checked.

### Refresh publication

- Successful build and deploy: https://github.com/Arndyka/Portofolio/actions/runs/38708174844
- Deployed source: `7b5e7400080807ed4c22208bf5249e16bd0de4eb`.
- All 36 public files returned HTTP 200 and matched the refreshed local build, normalizing text line endings. This includes the replacement portrait and all motion assets.
- Live site: https://arndyka.github.io/Portofolio/

The original release record below is retained for provenance.

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
