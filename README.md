# Chaoqun Cui · Academic Homepage

A bilingual academic website following the original white, two-column PRISM reference layout, based on [PRISM](https://github.com/xyjoey/PRISM), customized from Chaoqun Cui's CV and Google Scholar profile. Includes research areas, 15 publications and preprints, education, professional experience, and a printable academic CV.

## Local development

Node.js 22 or later is required.

```sh
npm ci
npm run dev
```

Visit http://localhost:3000. For a production build:

```sh
npm run lint
npm run typecheck
npm run build
```

The static site is generated in `out/`. It needs no server, database, API key, or external font service. To preview the export, serve `out/` with a static HTTP server (for example `python3 -m http.server 3000 --directory out`). `next start` is not used with static export.

## GitHub Pages

1. Create a repository named **CcQunResearch.github.io** in the `CcQunResearch` account.
2. Upload the **contents of this PRISM directory** into the repository root, including `.github/workflows/deploy.yml`. Do not upload `node_modules/`, `.next/`, or the original private résumé.
3. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
4. Push to `main` or `master`, or manually run the deployment workflow in Actions.
5. After the workflow succeeds, visit **https://ccqunresearch.github.io/**.

This is the intended deployment URL, not a claim that this repository has already been created or the site published. The local template's `origin` still points at upstream PRISM; do not push there. Set the remote to your own repository before pushing.

The workflow also supports project repositories: GitHub supplies the correct base path automatically. For local project-path testing, set `NEXT_PUBLIC_BASE_PATH=/repository-name` before building.

## Update content

| Content | File |
| --- | --- |
| Name, links, navigation, language settings | `content/config.toml`, `content_zh/config.toml` |
| Biography | `content/bio.md`, `content_zh/bio.md` |
| Publications, English and Chinese descriptions | `content/publications.bib` |
| Education and work timeline | `content/profile.json` |
| Printable CV | `content/cv.md`, `content_zh/cv.md` |
| Portrait | `public/bio.jpg` |
| Research topic descriptions and homepage layout | `src/components/home/AcademicHome.tsx` |
| Appearance and mobile/print styles | `src/app/globals.css` |

BibTeX fields: `selected={true}` shows a paper on the homepage; `keywords` controls topic filters; `shortname` supplies an accessible short figure name; `pdf` links to the PDF; `preview={/papers/filename.webp}` shows a locally stored main figure; `ccf={A}` (or B/C) shows a CCF badge only in Chinese and only for a non-preprint; `description` and `description_zh` provide summaries. An author suffix `#` indicates equal contribution and is rendered as `*`; it is removed from exported citations. Use `@misc` for public preprints, and conference/journal types only for confirmed publications. Sources and editorial decisions are documented in `docs/content-sources.md`. Figure provenance (source PDF, page, figure number, crop coordinates) is recorded in `docs/paper-figures.json`. All 15 figures are stored in `public/papers/`; clicking a thumbnail opens the full-size figure. CCF ranks follow the 2026 seventh edition, including ICLR A.

The CV button offers a clean print layout; choose “Save as PDF” in the browser print dialog. English is the default, with a persistent Chinese toggle and light/dark theme.

## Attribution

Based on PRISM by Jiale Liu / xyjoey, distributed under the MIT License. The original license is retained in `LICENSE`.

## Dependency note

Next.js is pinned to the patched 15.x line. Its PostCSS dependency is overridden to 8.5.28 to resolve build-time advisories without a framework major-version migration. The unused template `svg2ico` dependency has been removed; `bibtex-parse-js` 0.0.23 avoids the unnecessary legacy test-runner dependency carried by 0.0.24.
