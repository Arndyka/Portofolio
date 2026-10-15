# Portfolio Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task by task.

**Goal:** Build and deploy a factual bilingual portfolio to Arndyka/Portofolio.

**Architecture:** Node generates static localized pages from curated data. CSS provides the visual system; a small browser script enhances navigation and project filtering.

**Tech Stack:** Node, semantic HTML, CSS, vanilla JavaScript, Playwright and axe for development checks, GitHub Pages.

**Spec:** docs/superpowers/specs/2026-10-15-portfolio-design.md

## Global Constraints
- Indonesian default with a complete English version.
- Configurable base path defaults to /Portofolio/.
- Publish only curated prose and the owner's portrait.
- Never inspect or use Beehoon, Tugas Kelompoknya Angel Alpro, or PENGELUARAN.
- Do not invent impact statistics, live production status, customers or awards.

## Review Focus
- Nested case-study assets and language links must resolve on GitHub Pages.
- Narrow screens and long Indonesian copy must not overflow.
- Filtering must keep focus, selected state and live count consistent.
- With JS unavailable, visitors must still reach all content.
- Internal work must not imply proven production results or expose sensitive source material.

## Task 1: Content and site
Files: content/profile.mjs, content/projects.mjs, scripts/build.mjs, public/styles.css, public/app.js, public/assets/portrait.png, scripts/serve.mjs, tests/site.spec.mjs, playwright.config.mjs, package.json.
Interfaces: content exports profile and projects with en/id fields; build writes dist using BASE_PATH, default /Portofolio/; server serves that prefix.
- [x] Write browser tests: homepage/profile, English route, filters, all project detail links, locale continuity, mobile menu/Escape, 320/390/1440 widths, no-JS content and axe.
- [x] Run a homepage test before implementation and observe the missing page fail.
- [x] Curate bilingual content; create build templates and visual assets; implement CSS and JS.
- [x] Run npm run build and npm test; inspect screenshots and repair concrete defects.
- [x] Commit verified implementation.

## Task 2: Publication
Files: .github/workflows/deploy.yml, README.md, docs/verification.md.
Interfaces: GitHub Actions builds and publishes dist; source and Pages use same commit.
- [x] Review entire change with a fresh reviewer; fix significant findings and run full checks.
- [x] Create minimal build-and-Pages workflow, document editing and content boundaries.
- [ ] Push approved source to main; enable Pages workflow via authenticated GitHub API.
- [ ] Verify successful Actions deployment and fetch live home, English, project and asset URLs.
