import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import astroExpressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import { defineConfig, fontProviders } from 'astro/config';
import { execSync } from 'node:child_process';
import siteConfig from './src/data/site';

// Map of repo-relative file path -> ISO date of its last commit, built once
// per build from a single `git log` walk. Used to emit real <lastmod> values
// in the sitemap (mtime is useless in CI - every file gets the clone time).
function buildGitLastModMap() {
  const map = new Map();
  try {
    const out = execSync('git log --format=COMMIT:%cI --name-only', {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
    let date = null;
    for (const line of out.split('\n')) {
      if (line.startsWith('COMMIT:')) date = line.slice('COMMIT:'.length).trim();
      else if (line && date && !map.has(line)) map.set(line, date);
    }
  } catch {
    // Not a git checkout (e.g. tarball build) - sitemap simply omits lastmod.
  }
  return map;
}
const gitLastMod = buildGitLastModMap();

// Resolve a route path to the source file that renders it and return the
// last-commit date, or undefined when no candidate is tracked in git.
function lastModFor(path) {
  const candidates = [];
  if (path === '/' || path === '') {
    candidates.push('src/pages/index.astro');
  } else if (path === '/docs/') {
    candidates.push('src/content/docs/index.mdx');
  } else if (path.startsWith('/docs/')) {
    const slug = path.slice('/docs/'.length).replace(/\/$/, '');
    candidates.push(`src/content/docs/${slug}.mdx`, `src/content/docs/${slug}/index.mdx`);
  }
  for (const file of candidates) {
    const date = gitLastMod.get(file);
    if (date) return date;
  }
  return undefined;
}

export default defineConfig({
  site: siteConfig.url,
  // No /docs/* redirects - /docs/ is now a real overview hub (cards
  // for every section), and each section index renders cards for its
  // own child pages. Astro handles trailing-slash normalization itself.
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [
    icon(),
    // Full EC config lives in ec.config.mjs - required to keep the <Code>
    // component working (function-valued options aren't JSON-serializable
    // when inlined here).
    astroExpressiveCode(),
    mdx(),
    sitemap({
      // Per-page priority + changefreq, signalling to crawlers which
      // surfaces matter most. <lastmod> comes from each source file's
      // last git commit (see buildGitLastModMap above) - the one field
      // Google actually reads; priority/changefreq are hints at best.
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname;

        const lastmod = lastModFor(path);
        if (lastmod) item.lastmod = lastmod;

        // Homepage gets max priority + weekly cadence (release chip,
        // star counts, etc. tend to refresh).
        if (path === '/' || path === '') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        }
        // Top-of-funnel install / quick-start pages - high priority,
        // moderate change cadence.
        else if (
          path.startsWith('/docs/getting-started/') ||
          path === '/docs/getting-started/'
        ) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        }
        // Module + building-block deep-dives - main long-tail surfaces.
        else if (
          path.startsWith('/docs/modules/') ||
          path.startsWith('/docs/building-blocks/') ||
          path.startsWith('/docs/architecture/')
        ) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Guides and recipes - high-quality content, refreshed over time.
        else if (path.startsWith('/docs/guides/')) {
          item.priority = 0.75;
          item.changefreq = 'monthly';
        }
        // Comparison pages - high-converting + rank for "X alternative" queries.
        else if (path.startsWith('/docs/compare/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Cross-cutting, security, deployment - important reference.
        else if (
          path.startsWith('/docs/cross-cutting-concerns/') ||
          path.startsWith('/docs/security/') ||
          path.startsWith('/docs/deployment/') ||
          path.startsWith('/docs/frontend/') ||
          path.startsWith('/docs/testing/') ||
          path.startsWith('/docs/cli/')
        ) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        // Changelog gets weekly cadence - search engines love freshness.
        else if (path.startsWith('/docs/changelog/')) {
          item.priority = 0.5;
          item.changefreq = 'weekly';
        }
        // Contributing / meta pages - lower priority.
        else if (path.startsWith('/docs/contributing/')) {
          item.priority = 0.4;
          item.changefreq = 'yearly';
        }
        // Anything else under /docs/ - sensible default.
        else if (path.startsWith('/docs/')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: { target: 'es2022' },
    server: { watch: { ignored: ['**/.wrangler/**'] } },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Outfit',
      cssVariable: '--font-outfit',
      weights: ['400', '500', '600', '700', '800'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Figtree',
      cssVariable: '--font-figtree',
      weights: ['400', '500', '600', '700', '800'],
      subsets: ['latin'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: ['400', '500', '700'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
    },
  ],
});
