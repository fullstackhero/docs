# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The documentation site for the FullStackHero .NET starter kit, served at `fullstackhero.net`.
It is **not** the starter kit itself — only its docs. Built with Astro 6, Tailwind 4, MDX, and
deployed as a Cloudflare Worker that wraps a static build.

## Commands

```bash
npm run dev        # astro dev on http://localhost:4321 (hot-reload of MDX)
npm run build      # astro build && pagefind --site dist  (produces dist/)
npm run preview    # serve dist/ locally
npm run check      # astro check — type + content-schema validation
```

- There is **no test suite**. `npm run check` is the closest thing to a CI gate — run it after
  touching `.astro`, `.ts`, layouts, or content schema.
- Search (Pagefind) only works after `npm run build`. In `dev`, the search modal reports
  "index not available" — this is expected, not a bug.

### Cloudflare / Worker (deploy-time)

```bash
npx wrangler deploy                       # deploy worker + dist assets
npx wrangler types                        # regenerates worker-configuration.d.ts (gitignored)
npx wrangler d1 execute fsh-docs-views --file ./migrations/0001_init.sql --remote
```

`.dev.vars` holds `DEDUPE_SALT` for local worker runs (gitignored). D1 (`DB`) and KV (`DEDUPE`)
binding IDs live in `wrangler.toml`.

## Architecture: the two-part build

This is the single most important thing to understand.

1. **Astro builds fully static** to `dist/`. There is no SSR adapter in `astro.config.mjs` —
   every page, including the `llms-full.txt` endpoint, is prerendered at build time.
2. **`src/worker.ts` is a standalone Cloudflare Worker** (not an Astro adapter). It serves
   `dist/` through the `ASSETS` binding and adds one dynamic surface: `/api/views/*`. Static
   assets win over the worker by path, so `/docs/**`, `/_astro/**`, etc. never invoke worker code.

Consequences:

- `src/worker.ts` is **excluded from `tsconfig.json`** and typed against `@cloudflare/workers-types`,
  not Astro types. `npm run check` does **not** validate it. Edit it carefully.
- The page-view counter (`/api/views`) writes to D1 (`views` table, see `migrations/0001_init.sql`)
  and dedups per IP+UA via KV with a 1h TTL. Slugs are whitelisted to `/docs/*` only.
- Anything dynamic must go through the worker; you cannot add an SSR Astro route and expect it
  to run — the build is static.

## Architecture: content → routes → sidebar

- **One content collection**, `docs`, defined in `src/content.config.ts`. A glob loader pulls
  every `**/*.mdx` under `src/content/docs/`. The Zod schema there is the source of truth for
  frontmatter (`title`, `description`, `sidebar.{label,order,hidden}`, `pageType`, `seo.*`).
- **Routing** is filesystem-driven through `src/pages/docs/[...slug].astro`:
  - `index.mdx` → `/docs/`
  - `<section>/index.mdx` → section overview at `/docs/<section>/`
  - `<section>/page.mdx` → `/docs/<section>/page/`
- **The sidebar is built in `src/helpers/sidebar.ts`**, iterating `src/content/docs/_sections.ts`.
  This array defines section **order and display labels**. A directory **not registered in
  `_sections.ts` will not appear in the sidebar** even though its pages are still routable.
  When you add a new top-level docs section, register it there.
- `sidebar.ts` normalizes `entry.id` defensively because the id shape differs between Astro 5
  and the Astro 6 glob loader (with/without `.mdx`, with/without `/index`). Preserve that logic.

## Architecture: layouts

```
BaseLayout.astro        <head>: SEO meta, OG/Twitter, JSON-LD graph, fonts, theme bootstrap, GA
├── DocsLayout.astro    Header + filesystem sidebar + ToC + sponsor card + mobile sheet + views beacon
└── MarketingLayout.astro   landing-page chrome
```

- All pages route through `BaseLayout`. It emits the site-wide JSON-LD `@graph`
  (Organization + WebSite + SoftwareApplication) and accepts `additionalSchemas` for per-page
  structured data.
- `[...slug].astro` composes per-page SEO + a `TechArticle` + `BreadcrumbList` JSON-LD and passes
  them down via `additionalSchemas`. Section overview pages intentionally use the section *label*
  as the final breadcrumb, not the page title.
- Google Analytics lives in `src/components/shell/Analytics.astro`, rendered once in
  `BaseLayout`'s `<head>`. It runs in dev too.

## MDX authoring

- Frontmatter shape is enforced by the schema in `src/content.config.ts` — `check` fails the build
  on violations. `sidebar.order` is ascending (lower = higher in the list); ties break alphabetically.
- **Only components registered in `src/components/mdx.ts` are usable inside MDX**: `Callout`,
  `CategoryIndex`, `CodeGroup`, `Screenshot`, `SectionIndex`. To expose a new one in MDX, add it there.
- The docs `<article>` carries `data-pagefind-body`, which scopes the search index to docs content only.

## SEO surface (this site invests heavily here — don't regress it)

- `astro.config.mjs` `sitemap.serialize()` assigns per-path `priority`/`changefreq` by URL prefix.
- `public/robots.txt` explicitly allow-lists AI + search crawlers (GPTBot, ClaudeBot, PerplexityBot, …).
- `public/llms.txt` is the hand-maintained summary; `src/pages/llms-full.txt.ts` generates
  `/llms-full.txt` by concatenating the full MDX corpus at build time.
- `public/` also holds `_headers`, `_redirects`, favicons, and OG image as static passthroughs.

## Styling

- Tailwind 4 via the Vite plugin (no `tailwind.config.js`). Tokens, prose, and code-block themes
  in `src/styles/*.css` are **forked verbatim from `codewithmukesh/blog`** — preserve the provenance
  comments when editing.
- Brand colors are split deliberately: primary is `#15803d` (green-700); the brighter brand green
  `#16a34a` lives in `--primary-soft` for accents/gradients. Don't collapse the two.
- Code-block rendering is Expressive Code. Its full config is in `ec.config.mjs` (function-valued
  options can't be inlined into `astro.config.mjs`); the theme is `houston.theme.json`.

## Client scripts & Astro view transitions

- Inline `<script is:inline>` (e.g. theme bootstrap, Analytics) is shipped verbatim — Astro does not
  bundle or typecheck it. Bundled client logic uses `<script>import '...'</script>`.
- The site uses view transitions, so interactive scripts must be **idempotent and re-bind on
  `astro:page-load` / `astro:after-swap`** (see `views-counter.ts`, the mobile sheet in
  `DocsLayout.astro`). Follow that pattern for any new client behavior or it breaks on navigation.

## Conventions

- Formatting is Prettier with `prettier-plugin-astro` + `prettier-plugin-tailwindcss` (Tailwind class
  sorting is automatic). No standalone config file — plugin defaults apply.
- TypeScript extends `astro/tsconfigs/strict`; React JSX is enabled for `.tsx` islands.
- `superpowers/` is gitignored and not part of the site.
