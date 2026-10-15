# Verification record

Date: 15 October 2026 (Asia/Jakarta).

## Contributions, deliverables and skills developed

- Rechecked the owner's CV and portfolio for internship outputs, research/prototype contributions and practicum responsibilities. Rewrote summaries, all four experience entries, six project summaries/deliverables/learning sections, education and course completion in both languages.
- Experience now separates responsibilities, deliverables and skills developed. Team outcomes remain attributed to teams; no new award, production-adoption, accuracy, efficiency or learner-improvement metrics were introduced.
- All 30 browser tests passed. Visually inspected the updated summary, experience sections, mobile experience and case-study layout. Both localized printable profiles now span three readable pages; all six print pages were rendered and inspected.
- Independent read-only review found no issues and verified 84 localized experience/project content checks against generated pages, including individual/team attribution and outcome/learning fields.
- Published source `b343134bbf299ce7da753077a948048e98310164` via [successful build and deploy](https://github.com/Arndyka/Portofolio/actions/runs/38716116057). All 34 public files returned HTTP 200 and matched the local build.

## Professional copy and discipline icons

- Revised Indonesian and English positioning, headings, profile, project subtitles and technical reviews, contact copy, and error-page text to use direct professional language.
- Replaced the network slogan with “Integrasi Kompetensi” / “Integrated Expertise” and standardized its four discipline icons: engineering schematic, database, AI chip and financial institution.
- Refreshed the social-sharing card and its source generator. No changes to dates, qualifications, project ownership or measured results.
- All 30 browser tests passed. Inspected desktop and phone hero/network in both languages, the sharing card, and both pages of the printable Indonesian profile. `git diff --check` passed.
- Independent read-only review approved deployment without findings; checked both languages at six widths from 320–1440 px, all four discipline icons, old-slogan removal, and seven page/asset URLs.
- Published source `7efeeb9fe425ceba9f8d6658efcf201584b4306a` through [successful build and deploy](https://github.com/Arndyka/Portofolio/actions/runs/38714479494). All 34 public files returned HTTP 200 and matched the local build.

## Single RF main lobe

- Restored the circular RF grid with one fixed main-lobe direction and three nested contours. A slow 12-second cycle lengthens and narrows the lobe as it strengthens, then shortens and broadens it as it weakens.
- Uses the same shape function for static SVG fallback and live frames; existing pause, reduced-motion and offscreen controls apply.
- All 30 browser tests passed with the new lobe path replacing the dish animation target. Inspected weak/strong desktop frames and the mobile card; moved the diagram label clear of the mobile project index.
- Independent read-only review found no blocking issues. Published `5b59648a099ce2bd5d762cf24e64481996c0bbf4` via [successful build and deploy](https://github.com/Arndyka/Portofolio/actions/runs/38713455038); all 34 public files returned HTTP 200 and matched the local build.

## Calmer illustrations and coherent monitoring demo

- Replaced the rotating radiation plot with a parabolic dish that scans slowly and emits fading signal arcs.
- Chart observations update one at a time over 2.4 seconds, with a brief hold before the next observation. Other points remain fixed.
- Monitoring uses four visible component scores on a 0–100 scale. The total is their rounded arithmetic mean; the ring percentage and bar lengths use those same values. The graphic labels this as an illustrative demo calculation.
- Removed the independent security-ring CSS motion so it cannot disagree with the total score.
- All 30 tests passed, including sequential chart movement, score consistency, displayed bar/ring agreement, pause and reduced-motion behavior. Visually inspected the updated dish, chart and monitoring diagram.
- Independent read-only review found no blocking issues; checked continuity across 280 chart slot boundaries and score consistency across 100,000 monitoring samples.
- Published source `86c8f57ea322f967d2fac38b808b60dc27f1eb5d` via [successful build and deploy](https://github.com/Arndyka/Portofolio/actions/runs/38712476351). All 34 public files matched the local build and returned HTTP 200.

## Project illustration animation

- Stunting's illustrative chart line, filled area and markers move together. Curtain panels open and meet in the middle when closed. The instrument waveform flows within its display, and the teal antenna pattern rotates and changes scale around the fixed origin.
- SVG drawings remain available without JavaScript. One animation clock updates visible illustrations at approximately 30 fps, freezes for user pause, reduced-motion, hidden tabs and print, and suspends offscreen scenes.
- All 26 browser tests passed, including new checks of each illustration's changing geometry, paused/reduced-motion stability, and offscreen suspension/resumption.
- Inspected multiple animation phases, including curtains fully open and closed. Independent review found no blocking illustration defects; figure sizing was scoped to the outer SVG to preserve the waveform viewport.
- Motion preferences now use the change event's explicit state, and tests wait for the control to acknowledge changes before checking frozen frames. Fifteen repeated animation checks and the final full 26-test suite passed. Earlier intermittent dynamic-media test behavior was observed; its browser-level cause was not established.
- Published source `1365a6560794641f038f1cc16af8098b92cd6414` via [successful build and deploy](https://github.com/Arndyka/Portofolio/actions/runs/38711199076). All 33 public files returned HTTP 200 and matched the local build, including the new animation module.

## Public content and illustration correction

- Removed two withdrawn case studies from the current source and every generated locale, profile, next-project link and sitemap entry. Generalized the related experience description. Historical Git commits are not rewritten by this change.
- The remaining security project is titled **AI-Powered Access/session Monitoring**. Six projects are numbered consecutively and filter totals are generated from the content collection.
- Centered the illustrative score and caption on the gauge axis. Tilted the radar with a theta angle measured from vertical and a leftward flow arrow opposing the beam's horizontal direction. Connected the RF module's bottom edge to the instrument cable.
- All 21 Playwright checks passed, including a new publication check that scans generated text and verifies withdrawn routes return 404. Built 16 localized content pages and 2 error pages.
- Visually inspected all three diagrams at detail-page size and the renamed project on a phone viewport.
- Independent read-only review found no blocking defects. The final theta annotation was additionally placed inside its angle arc with a background outline for clear separation from moving rays.
- Deployed source: `65dd2b36f5256d4ab66e4d3132ac941ee15ec733`; [successful build and deployment](https://github.com/Arndyka/Portofolio/actions/runs/38709319568).
- Verified all 32 current public files match the local build and all four withdrawn localized URLs return HTTP 404. Historical Git commits and third-party caches are outside this current-site removal.

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
