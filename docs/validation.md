# Validation

Verified on 2026-09-16.

- Clean `npm ci --ignore-scripts` succeeds; npm reports zero known vulnerabilities.
- ESLint and TypeScript checks pass.
- Static production builds pass at both `/` and `/academic`.
- All 114 root-path local links/assets/anchors and 104 project-path links/assets resolve.
- Desktop English/light and Chinese/dark layouts inspected in the browser.
- 390 px mobile home, navigation, publications and CV inspected; no horizontal overflow or broken images.
- Scholar profile matched against all 14 public publication entries; 6 selected records appear on the homepage.
- Topic filter: Translation gives 4 papers; title/shortname search ALPO gives 1; nonexistent query gives a resettable empty state.
- Year 2024 gives 2 papers; combining journal type gives 1.
- Research topic link opens the publications page with the Agents filter selected.
- BibTeX expansion and clipboard copy succeed.
- No browser console errors observed.

Public deployment has not been performed. GitHub Pages account/repository settings are outside the local build validation. The CV print stylesheet is supplied; PDF pagination may vary by browser print settings.

## Reference-style revision

The homepage now follows the supplied PRISM screenshot: white background, a left profile sidebar, right-hand biography and publication cards, serif headings, and restrained gold highlights. Light is the default; legacy theme preferences from the earlier design migrate to light. Desktop (1280 px), mobile (390 px), bilingual content, publication search and BibTeX expansion were checked after this revision. Build and lint checks pass.


## Publication figure revision

- All 14 PDF figures visually inspected after cropping; main figure source/page/number recorded in `paper-figures.json`.
- Production build (including type checks) and ESLint pass.
- Desktop homepage: 6 selected figures load, with venue ribbons; 0 CCF badges in English and 5 in Chinese.
- Full Chinese list: 14 figure cards and 9 CCF badges (5 A, 3 B, 1 C); preprints have no badge.
- At 390 px: figures stack above text, with no horizontal overflow; Chinese-to-English switch removes CCF.
- BibTeX opens on mobile without overflow; exported citation text excludes `preview` and `ccf` metadata.


## Five-detail refinement

- VAGEN Figure 1 and VL4Gaze Figure 2 visually inspected; VAGEN subfigure captions excluded.
- Chinese and English homepage checked for advisor links, simplified internship titles, and absence of the footer template credit.
- Timeline fine line and filled/hollow markers visually inspected.
- Production build, type checks and lint pass.


## 2026-09-30 update

- Production build, TypeScript/lint checks, and `git diff --check` pass.
- SWE-MILE Figure 1 crop visually checked against PDF page 3; exported image matches the source asset.
- Browser: SWE-MILE is first in the homepage and full list, its image loads, and the full list contains 15 papers.
- Chinese and English current internship text verified; English displays no CCF badges.
- Screenshot: `../homepage-update-2026-09-30.jpg`.

## News section (2026-10-03)

- Static production build, TypeScript, lint and `git diff --check` pass.
- Browser confirms section order: About, News, Selected Publications, Education & Experience.
- Seven reverse-chronological updates render in both languages with formatted dates, titles, venues and links; no raw Markdown delimiters remain.
- Desktop layout visually inspected with no horizontal overflow. Screenshot: `../news-update-2026-10-03.jpg`.
