# Arnoldus — Portfolio

Bilingual personal portfolio for **Arnoldus Gratio Darryl Andyka**, connecting engineering, AI, data, and banking technology.

Live site: https://arndyka.github.io/Portofolio/

## Run locally

Requires Node.js 24 (22+ supported by the site builder).

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:4185/Portofolio/. On Windows PowerShell with scripts disabled, use `npm.cmd` instead of `npm`.

The production site has no runtime package dependencies, database, account system, tracking scripts, or external font requests. All text is statically rendered and remains readable without JavaScript.

## Edit content

- `content/profile.mjs`: biography, contact links, experience, education, skills, learning.
- `content/projects.mjs`: nine bilingual case studies, roles, deliverables and limitations.
- `content/personal-projects.mjs`: RetailLens, Spendly and collaborative Date Planner, including public demo/source links.
- `scripts/build.mjs`: page templates, metadata, sitemap and 404 pages.
- `scripts/art.mjs`: original SVG project illustrations with sample/conceptual data.
- `scripts/icons.mjs`: consistent line icons for engineering, data, AI and banking.
- `scripts/social.mjs`: regenerates the professional social-sharing card with `node scripts/social.mjs` (requires a locally available Playwright browser).
- `scripts/motion-sections.mjs`: hero, animated discipline network and static globe fallback.
- `public/styles.css`: responsive visual system and print styles.
- `public/app.js`: progressive enhancements for filters, mobile navigation and printing.
- `public/motion.js` and `public/globe.js`: scroll reveals, persistent pause control and rotating canvas globe.
- `public/illustrations.js`: sequential chart updates, opening curtains, flowing instrument waveform, a fixed single RF main lobe that narrows as it strengthens and broadens as it weakens, synchronized demo risk scores, retail bars, budget progress and calendar selection, using a shared clock for visible SVGs.
- `public/illustration-frames.js`: deterministic chart and monitoring frames. The demo total is the rounded mean of the four visible component scores; this is illustrative, not an actual scoring policy.
- `public/assets/`: supplied portrait, locally hosted fonts with their licenses, favicon and social image.

Every localized content field has `id` and `en` values. After edits, run `npm run build` and `npm test` before pushing. Build output in `dist/` is ignored by Git and generated in CI. `BASE_PATH` can override the default `/Portofolio/` for other hosting setups; the canonical origin is configured in the builder.

Experience entries distinguish `text` (contribution), `outcome` (completed deliverables) and `learning` (skills developed). Case-study summaries and deliverables identify individual contributions separately from team outcomes; learning statements describe skills practiced rather than unverified mastery or business impact. Keep this evidence-based structure when updating the content.

## Verification

```sh
npx playwright install chromium
npm test
```

On Windows, tests use installed Microsoft Edge. CI uses Playwright Chromium. Tests cover both locales, project detail navigation, filtering, mobile navigation, keyboard use, reduced motion, no-JavaScript content, local links, error recovery, print visibility, responsive layouts and automated WCAG accessibility checks.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. It installs development test tools, generates the static site, runs browser tests, then uploads **only `dist/`** and deploys to GitHub Pages. Repository **Settings → Pages → Source** must be **GitHub Actions**.

## Content boundaries

Descriptions are curated from the owner's supplied professional materials and project documentation. Project graphics are original illustrative diagrams, not internal screenshots or measured outcomes. Workplace data, credentials, source documents, identity documents and personal addresses are not included. Group projects identify the owner's role. Azure AI-900 preparation is course completion, not Microsoft certification. The profile page can be printed or saved as PDF without distributing the original private CV files.

Personal portrait and portfolio content remain the owner's materials. Manrope and Instrument Serif use the SIL Open Font License; license files are included beside the fonts.

## Visual design and motion

The navy/teal refresh uses the owner's attached color portrait (`portrait.jpg`), 16–18 px body text and labels of at least 14 px. Glowing paths, staged text entrances, a rotating dotted globe and scroll transitions adapt the movement of the supplied Pinterest reference to the portfolio's own content.

The header's pause button saves the visitor's preference. Device reduced-motion settings take priority. Continuous effects pause outside the viewport or while the page is hidden. Without JavaScript, every section remains visible and the globe has an SVG fallback. Tests check these behaviors as well as both locales and mobile layouts.

Project cards use three columns at viewport widths of 1200 CSS pixels and above, two from 701 to 1199, and one at 700 or below. Browser zoom naturally reduces the available CSS viewport width. Card body text remains at least 16 px. RetailLens updates one bar at a time; Spendly synchronizes its illustrative remaining amount with a fixed Rp4,000,000 demo limit; Date Planner moves its highlight and check together between calendar cells. These illustrations also follow the shared pause, reduced-motion, offscreen and print controls.

Globe land points are sampled from [Natural Earth 1:110m land geometry](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson), available in the [public domain](https://www.naturalearthdata.com/about/terms-of-use/). No third-party video or branding is distributed with this site.
