# OG Image Generator - Design

**Date:** 2026-05-24
**Status:** Approved, ready for implementation plan

## Goal

Generate per-page Open Graph / Twitter share images (1200×675) for the FullStackHero
documentation site, replacing the current fallback to the 512² square logo
(`/logo-fullstackhero.png`). Adapt the Playwright-based renderer from
`codewithmukesh/blog` (`scripts/og/generate.mjs`), but reshape it from the blog's
**one-bespoke-HTML-per-page** model into a **data-driven generator** that produces a card
for every one of the ~86 docs pages from frontmatter, plus the marketing landing and 404.

## Why the blog's approach can't be copied verbatim

The blog hand-crafts one HTML template per article. With 86 docs pages that doesn't scale.
This repo, however, already has the SEO plumbing the generator can plug into:

- `seo.ogImage` per-page frontmatter (`src/content.config.ts`).
- A site fallback `ogImage: '/logo-fullstackhero.png'` (`src/data/site.ts`).
- `BaseLayout.astro` absolutizes `image ?? siteConfig.ogImage` into `og:image` / `twitter:image`.
- `src/pages/docs/[...slug].astro` reads `seo.ogImage` and passes it down.
- `MarketingLayout.astro` already forwards an `image` prop to `BaseLayout`.

The site also shares the blog's exact fonts (Outfit / Figtree / JetBrains Mono) and dark
background (`#0d0e11`), so the blog's CSS ports over directly - only the accent color changes
from purple to FSH green (`--primary: #15803d`, `--primary-soft: #16a34a`).

## Decisions (from brainstorming)

- **Hybrid template model:** a data-driven default template per page, with an optional bespoke
  per-page HTML override as an escape hatch for hero pages.
- **FSH green, no portrait:** adapt the blog's v2 layout; right column shows the FSH triangle
  mark instead of a face portrait.
- **Auto-derive by slug + override:** images are wired by slug convention; `seo.ogImage` still wins.
- **Four template variants** (see below).
- **pageType drives accent + badge only** within the standard doc template (not separate layouts).
- **Commit the generated JPEGs** under `public/og/` so deploys ship them without running
  Playwright in CI (the build just copies `public/`).

## Template variants

The generator selects a variant automatically:

| Variant        | Applies to                                   | Look                                                                                  |
| -------------- | -------------------------------------------- | ------------------------------------------------------------------------------------- |
| `home`         | `/docs/` (root `index.mdx`)                  | Hero: large "FullStackHero" wordmark + tagline + prominent FSH logo                   |
| `overview`     | every `<section>/index.mdx`                  | Section name as headline + "Section Overview" eyebrow + "N pages" badge + description |
| `doc`          | leaf docs pages (~60)                        | Section eyebrow + pageType badge & accent + title + description + FSH mark             |
| site templates | `/` (landing) and `404`                      | Bespoke HTML files (blog-style): marketing card / centered 404 card                   |

**pageType accent + badge** (within the `doc` variant):

| pageType    | Accent           | Badge       |
| ----------- | ---------------- | ----------- |
| `guide`     | green (primary)  | GUIDE       |
| `reference` | blue             | REFERENCE   |
| `concept`   | violet           | CONCEPT     |
| `recipe`    | amber            | RECIPE      |

## Architecture

### Components

1. **`scripts/og/template.mjs`** - pure rendering module.
   - Exports `renderDocsTemplate({ variant, eyebrow, title, description, badge, accent })`
     returning a full HTML document string.
   - Holds the shared CSS (FSH-green port of the blog's `_v2-shared.css`).
   - Inlines the FSH logo as a base64 data URI so Playwright `setContent` needs no file paths.
   - Title auto-sizes by length tier; description truncates to ~150 chars.
   - No I/O, no Playwright - independently testable by inspecting returned HTML.

2. **`scripts/og/templates/landing.html`, `scripts/og/templates/404.html`** - bespoke site cards
   (self-contained HTML referencing the shared styles), rendered to `public/og/<name>.jpg`.

3. **`scripts/og/templates/docs/<slug>.html`** - optional per-page override. If a file exists for
   a slug, the generator renders it instead of the data-driven `doc` template. Directory starts empty.

4. **`scripts/og/generate.mjs`** - orchestrator (adapted from the blog).
   - Globs `src/content/docs/**/*.mdx`, parses frontmatter with `gray-matter`.
   - Determines the slug and variant per page (see slug mapping).
   - Resolves section label from `src/content/docs/_sections.ts` for the eyebrow.
   - For each page: if a bespoke override HTML exists, render it; else build HTML via
     `renderDocsTemplate` and render via `page.setContent`.
   - Also renders the named site templates (`landing`, `404`).
   - Screenshots at 1200×675, deviceScaleFactor 2, JPEG quality 88 (identical to the blog).
   - Waits for `networkidle` + `document.fonts.ready` before screenshotting.

### Slug → output mapping (mirrors `[...slug].astro`)

The docs slug is `entry.id` minus `.mdx`, with `/index` stripped and root `index` → empty.
Output path is `public/og/docs/<slug>.jpg`, with the root using `index`:

- root `index.mdx` → `public/og/docs/index.jpg` (variant `home`)
- `architecture/index.mdx` → `public/og/docs/architecture.jpg` (variant `overview`)
- `architecture/vertical-slice.mdx` → `public/og/docs/architecture/vertical-slice.jpg` (variant `doc`)

Variant selection:
- normalized id `=== 'index'` → `home`
- normalized id ends with `/index` → `overview`
- otherwise → `doc`

Eyebrow text: section label from `_sections.ts` (e.g. "Architecture"); root/sectionless → "FullStackHero".

### CLI

```
node scripts/og/generate.mjs                                   # render everything
node scripts/og/generate.mjs docs/architecture/vertical-slice  # one docs page (by slug)
node scripts/og/generate.mjs landing                           # one named site template
```

`npm run og` maps to the no-arg form.

## Wiring

- **`src/pages/docs/[...slug].astro`** - change `const image = seo.ogImage;` to
  `const image = seo.ogImage ?? `/og/docs/${slugForCrumb || 'index'}.jpg`;`
- **`src/pages/index.astro`** - `<MarketingLayout image="/og/landing.jpg">`
- **`src/pages/404.astro`** - add `image="/og/404.jpg"` to its `<MarketingLayout>`.

`BaseLayout` already turns these relative paths into absolute `og:image` / `twitter:image` URLs.
`seo.ogImage` frontmatter continues to override per page.

## package.json

- devDependencies: `playwright`, `gray-matter`.
- script: `"og": "node scripts/og/generate.mjs"`.
- Chromium provisioned once via `npx playwright install chromium`.

## Output & version control

- Generated JPEGs live under `public/og/` (`public/og/docs/*.jpg`, `public/og/landing.jpg`,
  `public/og/404.jpg`) and are committed. `npm run build` copies `public/` into `dist/`.

## Verification

1. Render one page of each variant (`home`, `overview`, `doc`, plus `landing`/`404`); inspect inline.
2. Iterate on the templates until the cards look right.
3. Render all pages.
4. `npm run check` - type + content-schema validation passes.
5. `npm run build` - confirms images are emitted into `dist/og/**` and pages reference the right paths.

## Out of scope

- Running Playwright during CI/build (images are committed instead).
- Per-page bespoke overrides beyond the empty `templates/docs/` escape hatch.
- OG images for any future non-docs routes not listed above.
