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
- `content/projects.mjs`: eight bilingual case studies, roles, deliverables and limitations.
- `scripts/build.mjs`: page templates, metadata, sitemap and 404 pages.
- `scripts/art.mjs`: original SVG project illustrations with sample/conceptual data.
- `public/styles.css`: responsive visual system and print styles.
- `public/app.js`: progressive enhancements for filters, mobile navigation and printing.
- `public/assets/`: supplied portrait, locally hosted fonts with their licenses, favicon and social image.

Every localized content field has `id` and `en` values. After edits, run `npm run build` and `npm test` before pushing. Build output in `dist/` is ignored by Git and generated in CI. `BASE_PATH` can override the default `/Portofolio/` for other hosting setups; the canonical origin is configured in the builder.

## Verification

```sh
npx playwright install chromium
npm test
```

On Windows, tests use installed Microsoft Edge. CI uses Playwright Chromium. Tests cover both locales, project detail navigation, filtering, mobile navigation, keyboard use, reduced motion, no-JavaScript content, local links, error recovery, print visibility, responsive layouts and automated WCAG accessibility checks.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`. It installs development test tools, generates the static site, runs browser tests, then uploads **only `dist/`** and deploys to GitHub Pages. Repository **Settings → Pages → Source** must be **GitHub Actions**.

## Content boundaries

Descriptions are curated from the owner's supplied professional materials and project documentation. Project graphics are original illustrative diagrams, not internal screenshots or measured outcomes. Workplace data, credentials, source documents, identity documents and personal addresses are not included. Group projects identify the owner's role. Kopra is described as knowledge preparation, not a deployed assistant. Azure AI-900 preparation is course completion, not Microsoft certification. The profile page can be printed or saved as PDF without distributing the original private CV files.

Personal portrait and portfolio content remain the owner's materials. Manrope and Instrument Serif use the SIL Open Font License; license files are included beside the fonts.
