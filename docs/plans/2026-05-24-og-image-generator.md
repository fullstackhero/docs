# OG Image Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate per-page 1200×675 Open Graph / Twitter share images for every docs page (and the marketing landing + 404), replacing the square-logo fallback.

**Architecture:** A Playwright renderer adapted from `codewithmukesh/blog`. A pure HTML-builder module (`template.mjs`) produces FSH-green cards in three data-driven variants (home / section overview / standard doc); a generator (`generate.mjs`) walks the docs content collection, picks a variant per page from frontmatter + file structure, and screenshots to `public/og/docs/<slug>.jpg`. Two bespoke disk templates cover the landing + 404. The existing SEO plumbing is wired to derive each page's `og:image` from its slug.

**Tech Stack:** Node 24 ESM, Playwright (Chromium), gray-matter, Node built-in `node:test`. No new runtime deps in the Astro app.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `scripts/og/templates/_og.css` | Single source of OG card styles (FSH-green port of the blog's v2 CSS). Linked by disk templates; inlined by `template.mjs`. |
| `scripts/og/template.mjs` | Pure HTML builder: `renderDocsTemplate()` + helpers (`escapeHtml`, `truncate`, `pickTitleSize`). No I/O. |
| `scripts/og/template.test.mjs` | `node:test` unit tests for the builder. |
| `scripts/og/generate.mjs` | Orchestrator: walk docs MDX, pick variant, render via Playwright; also render disk site templates. |
| `scripts/og/templates/landing.html` | Bespoke marketing-landing card. |
| `scripts/og/templates/404.html` | Bespoke 404 card. |
| `scripts/og/templates/docs/` | Empty dir (escape hatch for future per-slug overrides). |
| `package.json` | Add `playwright` + `gray-matter` devDeps; add `og` script. |
| `src/pages/docs/[...slug].astro` | Derive default `og:image` from slug. |
| `src/pages/index.astro` | Point at `/og/landing.jpg`. |
| `src/pages/404.astro` | Point at `/og/404.jpg`. |
| `public/og/**` | Generated, committed JPEGs. |

---

### Task 1: Dependencies and npm script

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add devDependencies and the `og` script**

In `package.json`, add to `"scripts"`:

```json
    "og": "node scripts/og/generate.mjs",
```

Add to `"devDependencies"` (keep alphabetical if the existing block is sorted):

```json
    "gray-matter": "^4.0.3",
    "playwright": "^1.59.1",
```

- [ ] **Step 2: Install**

Run: `npm install`
Expected: completes; `node_modules/playwright` and `node_modules/gray-matter` exist.

- [ ] **Step 3: Provision Chromium for Playwright**

Run: `npx playwright install chromium`
Expected: "chromium ... downloaded" (or "is already installed").

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add playwright + gray-matter for OG image generation"
```

---

### Task 2: Shared OG card stylesheet

**Files:**
- Create: `scripts/og/templates/_og.css`

- [ ] **Step 1: Create the stylesheet**

This is the FSH-green port of the blog's `_v2-shared.css`. Accent is driven by the
`--accent` custom property set per-card on `.canvas` (defaults to brand green).

```css
/* OG card styles for fullstackhero docs.
   FSH-green port of codewithmukesh/blog scripts/og/templates/_v2-shared.css.
   Per-card accent is set via the --accent custom property on .canvas. */

:root {
  --background: #0d0e11;
  --surface: #17181c;
  --foreground: #ede8df;
  --muted: #b3aca0;
  --border: #2c2d35;
  --primary: #15803d;
  --primary-soft: #16a34a;
  --font-display: 'Outfit', system-ui, -apple-system, Segoe UI, sans-serif;
  --font-body: 'Figtree', system-ui, -apple-system, Segoe UI, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  width: 1200px;
  height: 675px;
  overflow: hidden;
  font-family: var(--font-body);
  background: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.canvas {
  --accent: var(--primary-soft);
  position: relative;
  width: 1200px;
  height: 675px;
  overflow: hidden;
  background: var(--background);
}

.bg-mesh {
  position: absolute; inset: 0;
  background:
    radial-gradient(42% 58% at 80% 48%, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%),
    radial-gradient(60% 60% at 10% 92%, rgba(22, 163, 74, 0.06), transparent 70%);
}
.bg-grid {
  position: absolute; inset: 0;
  background-image: radial-gradient(circle at 1px 1px, rgba(237, 232, 223, 0.07) 1px, transparent 0);
  background-size: 28px 28px;
  -webkit-mask-image: radial-gradient(90% 85% at 50% 50%, black, transparent);
          mask-image: radial-gradient(90% 85% at 50% 50%, black, transparent);
}

.frame {
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 460px;
}

.copy {
  padding: 56px 44px 56px 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 600;
}
.eyebrow .dot {
  width: 8px; height: 8px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent);
}
.eyebrow .label { color: var(--foreground); }
.eyebrow .badge {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--accent);
  padding: 4px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent) 32%, transparent);
}

.main {
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin-top: 30px;
}

.headline {
  font-family: var(--font-display);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.04em;
  color: var(--foreground);
}
.wordmark {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 92px;
  line-height: 0.94;
  letter-spacing: -0.05em;
  color: var(--foreground);
}
.wordmark .accent { color: var(--accent); }

.description {
  font-family: var(--font-body);
  font-size: 22px;
  line-height: 1.45;
  color: var(--muted);
  font-weight: 500;
  max-width: 90%;
}

.meta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.meta .pages {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--foreground);
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(23, 24, 28, 0.6);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--muted);
}
.brand img { width: 34px; height: 34px; border-radius: 8px; }
.brand .name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--foreground);
  letter-spacing: -0.01em;
}
.brand .name .accent { color: var(--accent); }
.brand .sep { width: 4px; height: 4px; border-radius: 999px; background: var(--border); }
.brand .url {
  font-size: 13px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.mark-col {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.mark-col::before {
  content: "";
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 420px; height: 420px;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 32%, transparent) 0%, color-mix(in srgb, var(--accent) 14%, transparent) 42%, transparent 70%);
  filter: blur(8px);
  z-index: 0;
}
.mark-col::after {
  content: "";
  position: absolute;
  top: 64px; bottom: 64px; left: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, var(--border) 25%, var(--border) 75%, transparent);
}
.mark-col img {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 280px; height: 280px;
  z-index: 1;
  filter: drop-shadow(0 24px 36px rgba(0, 0, 0, 0.5));
}

/* Centered (no right column) — used by 404 */
.frame.centered { grid-template-columns: 1fr; }
.frame.centered .copy { align-items: center; text-align: center; padding: 72px 80px; }
.frame.centered .eyebrow, .frame.centered .brand { justify-content: center; }
.frame.centered .description { max-width: 100%; }
```

- [ ] **Step 2: Commit**

```bash
git add scripts/og/templates/_og.css
git commit -m "Add OG card stylesheet (FSH-green)"
```

---

### Task 3: Pure HTML-builder module + tests

**Files:**
- Create: `scripts/og/template.mjs`
- Test: `scripts/og/template.test.mjs`

- [ ] **Step 1: Write the failing tests**

```js
// scripts/og/template.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  escapeHtml,
  truncate,
  pickTitleSize,
  renderDocsTemplate,
} from './template.mjs';

const LOGO = 'data:image/png;base64,AAAA';

test('escapeHtml escapes the five HTML-significant characters', () => {
  assert.equal(escapeHtml(`a & b < c > "d" 'e'`), 'a &amp; b &lt; c &gt; &quot;d&quot; &#39;e&#39;');
});

test('truncate leaves short strings untouched', () => {
  assert.equal(truncate('short', 20), 'short');
});

test('truncate clips long strings and appends an ellipsis', () => {
  const out = truncate('x'.repeat(50), 10);
  assert.equal(out.length, 10);
  assert.ok(out.endsWith('…'));
});

test('pickTitleSize shrinks as the title gets longer', () => {
  assert.ok(pickTitleSize('Short') > pickTitleSize('A considerably longer documentation page title here'));
});

test('renderDocsTemplate (doc) includes eyebrow, escaped title, description, badge', () => {
  const html = renderDocsTemplate({
    variant: 'doc',
    eyebrow: 'Architecture',
    title: 'CORS & Headers',
    description: 'How it works.',
    badge: 'REFERENCE',
    accent: '#3b82f6',
    logoSrc: LOGO,
  });
  assert.ok(html.includes('<!DOCTYPE html>'));
  assert.ok(html.includes('Architecture'));
  assert.ok(html.includes('CORS &amp; Headers'));
  assert.ok(html.includes('How it works.'));
  assert.ok(html.includes('REFERENCE'));
  assert.ok(html.includes('--accent:#3b82f6'));
  assert.ok(html.includes(LOGO));
});

test('renderDocsTemplate (home) renders the FullStackHero wordmark, no badge', () => {
  const html = renderDocsTemplate({
    variant: 'home',
    eyebrow: 'Documentation',
    title: 'FullStackHero',
    description: 'A .NET 10 starter kit.',
    logoSrc: LOGO,
  });
  assert.ok(html.includes('class="wordmark"'));
  assert.ok(html.includes('FullStackHero'));
  assert.ok(!html.includes('class="badge"'));
});

test('renderDocsTemplate (overview) shows a pages badge only when count > 0', () => {
  const withCount = renderDocsTemplate({ variant: 'overview', eyebrow: 'Section Overview', title: 'Modules', description: 'Ten modules.', count: 10, logoSrc: LOGO });
  const zero = renderDocsTemplate({ variant: 'overview', eyebrow: 'Section Overview', title: 'CLI', description: 'The CLI.', count: 0, logoSrc: LOGO });
  assert.ok(withCount.includes('10 pages'));
  assert.ok(!zero.includes('class="pages"'));
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test scripts/og/template.test.mjs`
Expected: FAIL — cannot resolve `./template.mjs` (module not found).

- [ ] **Step 3: Implement the builder**

```js
// scripts/og/template.mjs
// Pure HTML builders for OG cards. No I/O — the caller injects the inlined
// CSS and the base64 logo. Three data-driven variants: home / overview / doc.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSS = readFileSync(path.join(__dirname, 'templates', '_og.css'), 'utf8');

const FONTS_HEAD = `
  <meta charset="UTF-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
  <style>${CSS}</style>`;

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function truncate(str = '', max = 150) {
  const s = String(str);
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}

export function pickTitleSize(title = '') {
  const len = title.length;
  if (len <= 20) return 76;
  if (len <= 34) return 64;
  if (len <= 50) return 54;
  if (len <= 70) return 44;
  return 38;
}

const BRAND = (accent) => `
  <div class="brand">
    <span class="name">FullStackHero</span>
    <span class="sep"></span>
    <span class="url">fullstackhero.net</span>
  </div>`;

function page(bodyInner, accent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>${FONTS_HEAD}</head>
<body>
  <div class="canvas" style="--accent:${accent}">
    <div class="bg-mesh"></div>
    <div class="bg-grid"></div>
    ${bodyInner}
  </div>
</body>
</html>`;
}

function markCol(logoSrc) {
  return `<div class="mark-col"><img src="${logoSrc}" alt="" /></div>`;
}

export function renderDocsTemplate({
  variant = 'doc',
  eyebrow = 'FullStackHero',
  title = '',
  description = '',
  badge = '',
  accent = 'var(--primary-soft)',
  count = 0,
  logoSrc = '',
}) {
  const eyebrowHtml = `<span class="eyebrow">
        <span class="dot"></span>
        <span class="label">${escapeHtml(eyebrow)}</span>
        ${badge ? `<span class="badge">${escapeHtml(badge)}</span>` : ''}
      </span>`;
  const descHtml = description
    ? `<p class="description">${escapeHtml(truncate(description, 150))}</p>`
    : '';

  let headline;
  let meta = '';
  if (variant === 'home') {
    headline = `<h1 class="wordmark">FullStackHero</h1>`;
  } else {
    headline = `<h1 class="headline" style="font-size:${pickTitleSize(title)}px">${escapeHtml(title)}</h1>`;
    if (variant === 'overview' && count > 0) {
      meta = `<div class="meta"><span class="pages">${count} pages</span></div>`;
    }
  }

  const inner = `<div class="frame">
      <div class="copy">
        <div>
          ${eyebrowHtml}
          <div class="main">
            ${headline}
            ${descHtml}
            ${meta}
          </div>
        </div>
        ${BRAND(accent)}
      </div>
      ${markCol(logoSrc)}
    </div>`;

  return page(inner, accent);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test scripts/og/template.test.mjs`
Expected: PASS — all 8 tests pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/og/template.mjs scripts/og/template.test.mjs
git commit -m "Add pure OG card HTML builder with tests"
```

---

### Task 4: Generator orchestrator

**Files:**
- Create: `scripts/og/generate.mjs`
- Create: `scripts/og/templates/docs/.gitkeep` (keep the override dir in git)

- [ ] **Step 1: Create the override-dir placeholder**

```bash
mkdir -p scripts/og/templates/docs
printf '' > scripts/og/templates/docs/.gitkeep
```

- [ ] **Step 2: Write the generator**

```js
// scripts/og/generate.mjs
/**
 * OG Image Generator (fullstackhero docs)
 * ───────────────────────────────────────
 * Renders 1200x675 @2x JPEG (q88) social cards for every docs page plus the
 * marketing landing + 404. Adapted from codewithmukesh/blog scripts/og.
 *
 *   • Docs pages  → public/og/docs/<slug>.jpg  (variant from file structure)
 *   • Site pages  → public/og/<name>.jpg       (bespoke templates/<name>.html)
 *   • A bespoke templates/docs/<slug>.html overrides the data-driven render.
 *
 * Usage:
 *   node scripts/og/generate.mjs                                   # everything
 *   node scripts/og/generate.mjs docs/architecture/vertical-slice  # one docs slug
 *   node scripts/og/generate.mjs landing                           # one site template
 */
import { chromium } from 'playwright';
import matter from 'gray-matter';
import { renderDocsTemplate } from './template.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', '..');
const docsDir = path.join(root, 'src', 'content', 'docs');
const templatesDir = path.join(__dirname, 'templates');
const overridesDir = path.join(templatesDir, 'docs');
const ogDir = path.join(root, 'public', 'og');

const WIDTH = 1200;
const HEIGHT = 675;
const DEVICE_SCALE = 2;

const PAGE_TYPE = {
  guide: { accent: '#16a34a', badge: 'GUIDE' },
  reference: { accent: '#3b82f6', badge: 'REFERENCE' },
  concept: { accent: '#8b5cf6', badge: 'CONCEPT' },
  recipe: { accent: '#e8a54b', badge: 'RECIPE' },
};

// Parse section dir → label from _sections.ts (avoids importing TS into node).
async function sectionLabels() {
  const src = await fs.readFile(path.join(docsDir, '_sections.ts'), 'utf8');
  const map = new Map();
  const re = /dir:\s*'([^']+)'\s*,\s*label:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src))) map.set(m[1], m[2]);
  return map;
}

// Recursively collect .mdx files under docsDir, returning ids (posix, no .mdx).
async function listDocIds(dir = docsDir, prefix = '') {
  const out = [];
  for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
    if (ent.isDirectory()) {
      out.push(...(await listDocIds(path.join(dir, ent.name), rel)));
    } else if (ent.name.endsWith('.mdx')) {
      out.push(rel.replace(/\.mdx$/, ''));
    }
  }
  return out;
}

function variantOf(id) {
  if (id === 'index') return 'home';
  if (id.endsWith('/index')) return 'overview';
  return 'doc';
}

// id → output slug (mirrors src/pages/docs/[...slug].astro)
function slugOf(id) {
  if (id === 'index') return 'index';
  return id.replace(/\/index$/, '');
}

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function buildDocsJobs(labels, logoSrc) {
  const ids = await listDocIds();
  // child-page counts per top-level section dir (excludes index pages)
  const counts = new Map();
  for (const id of ids) {
    if (variantOf(id) === 'doc') {
      const top = id.split('/')[0];
      counts.set(top, (counts.get(top) ?? 0) + 1);
    }
  }

  const jobs = [];
  for (const id of ids) {
    const slug = slugOf(id);
    const variant = variantOf(id);
    const data = matter(await fs.readFile(path.join(docsDir, `${id}.mdx`), 'utf8')).data;
    const sectionDir = slug.split('/')[0];
    const label = labels.get(sectionDir);
    const outPath = path.join(ogDir, 'docs', `${slug}.jpg`);
    const override = path.join(overridesDir, `${slug}.html`);

    let html;
    if (await fileExists(override)) {
      html = { goto: pathToFileURL(override).href };
    } else if (variant === 'home') {
      html = { content: renderDocsTemplate({ variant, eyebrow: 'Documentation', title: 'FullStackHero', description: data.description, logoSrc }) };
    } else if (variant === 'overview') {
      html = { content: renderDocsTemplate({ variant, eyebrow: 'Section Overview', title: data.title, description: data.description, count: counts.get(sectionDir) ?? 0, logoSrc }) };
    } else {
      const pt = PAGE_TYPE[data.pageType] ?? PAGE_TYPE.guide;
      html = { content: renderDocsTemplate({ variant, eyebrow: label ?? 'FullStackHero', title: data.title, description: data.description, badge: pt.badge, accent: pt.accent, logoSrc }) };
    }
    jobs.push({ name: `docs/${slug}`, outPath, ...html });
  }
  return jobs;
}

async function buildSiteJobs() {
  const jobs = [];
  for (const ent of await fs.readdir(templatesDir, { withFileTypes: true })) {
    if (ent.isFile() && ent.name.endsWith('.html')) {
      const name = ent.name.replace(/\.html$/, '');
      jobs.push({ name, outPath: path.join(ogDir, `${name}.jpg`), goto: pathToFileURL(path.join(templatesDir, ent.name)).href });
    }
  }
  return jobs;
}

async function render(browser, job) {
  await fs.mkdir(path.dirname(job.outPath), { recursive: true });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: DEVICE_SCALE,
  });
  const page = await context.newPage();
  if (job.goto) {
    await page.goto(job.goto, { waitUntil: 'networkidle' });
  } else {
    await page.setContent(job.content, { waitUntil: 'networkidle' });
  }
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: job.outPath,
    type: 'jpeg',
    quality: 88,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
  });
  const { size } = await fs.stat(job.outPath);
  await context.close();
  console.log(`✓ ${job.name} → ${path.relative(root, job.outPath)} (${Math.round(size / 1024)} KB)`);
}

async function main() {
  const args = process.argv.slice(2);
  const labels = await sectionLabels();
  const logoSrc = 'data:image/png;base64,' +
    (await fs.readFile(path.join(root, 'public', 'logo-fullstackhero.png'))).toString('base64');

  const allJobs = [...(await buildDocsJobs(labels, logoSrc)), ...(await buildSiteJobs())];
  const targets = args.length ? allJobs.filter((j) => args.includes(j.name)) : allJobs;

  for (const arg of args) {
    if (!allJobs.some((j) => j.name === arg)) {
      console.error(`✗ no target named "${arg}"`);
      process.exitCode = 1;
    }
  }

  const browser = await chromium.launch();
  try {
    for (const job of targets) await render(browser, job);
  } finally {
    await browser.close();
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
```

- [ ] **Step 3: Smoke-test one card of each docs variant**

Run: `node scripts/og/generate.mjs docs/index docs/architecture docs/architecture/vertical-slice`
Expected: three `✓` lines; files exist at `public/og/docs/index.jpg`, `public/og/docs/architecture.jpg`, `public/og/docs/architecture/vertical-slice.jpg`, each 100–400 KB.

- [ ] **Step 4: Visually inspect the three cards**

Open/Read each JPEG and confirm: home shows the "FullStackHero" wordmark; the section overview shows "Architecture" + "4 pages"; the doc shows the "Architecture" eyebrow + pageType badge + title + description + the FSH logo on the right with a green glow. Adjust `_og.css` / `template.mjs` if anything looks off, re-render, re-inspect.

- [ ] **Step 5: Commit (script only; images come in Task 7)**

```bash
git add scripts/og/generate.mjs scripts/og/templates/docs/.gitkeep
git commit -m "Add data-driven OG generator orchestrator"
```

---

### Task 5: Bespoke site templates (landing + 404)

**Files:**
- Create: `scripts/og/templates/landing.html`
- Create: `scripts/og/templates/404.html`

These are rendered from disk via `page.goto(file://…)`, so they link the real
`_og.css` and reference the logo by relative path
(`../../../public/logo-fullstackhero.png`: templates → og → scripts → repo root).

- [ ] **Step 1: Create `landing.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="_og.css">
</head>
<body>
  <div class="canvas">
    <div class="bg-mesh"></div>
    <div class="bg-grid"></div>
    <div class="frame">
      <div class="copy">
        <div>
          <span class="eyebrow">
            <span class="dot"></span>
            <span class="label">.NET 10 Starter Kit</span>
          </span>
          <div class="main">
            <h1 class="wordmark">FullStackHero</h1>
            <p class="description">Production-ready .NET 10 + React starter kit. Modular monolith, vertical slice, multitenant — ship features on day one.</p>
            <div class="meta"><span class="pages">MIT licensed · free forever</span></div>
          </div>
        </div>
        <div class="brand">
          <span class="name">FullStackHero</span>
          <span class="sep"></span>
          <span class="url">fullstackhero.net</span>
        </div>
      </div>
      <div class="mark-col"><img src="../../../public/logo-fullstackhero.png" alt="" /></div>
    </div>
  </div>
</body>
</html>
```

- [ ] **Step 2: Create `404.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="_og.css">
</head>
<body>
  <div class="canvas">
    <div class="bg-mesh"></div>
    <div class="bg-grid"></div>
    <div class="frame centered">
      <div class="copy">
        <span class="eyebrow">
          <span class="dot"></span>
          <span class="label">fullstackhero.net</span>
        </span>
        <div class="main">
          <h1 class="headline" style="font-size:120px">404</h1>
          <p class="description">This page took a wrong turn. Head back to the docs.</p>
        </div>
        <div class="brand">
          <span class="name">FullStackHero</span>
          <span class="sep"></span>
          <span class="url">fullstackhero.net</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

- [ ] **Step 3: Render and inspect both**

Run: `node scripts/og/generate.mjs landing 404`
Expected: two `✓` lines; `public/og/landing.jpg` and `public/og/404.jpg` exist. Read both; confirm the landing shows the wordmark + tagline + logo, and the 404 is a centered "404" card. Adjust + re-render if needed.

- [ ] **Step 4: Commit**

```bash
git add scripts/og/templates/landing.html scripts/og/templates/404.html
git commit -m "Add bespoke OG templates for landing + 404"
```

---

### Task 6: Wire generated images into page metadata

**Files:**
- Modify: `src/pages/docs/[...slug].astro:37`
- Modify: `src/pages/index.astro:15`
- Modify: `src/pages/404.astro:4`

- [ ] **Step 1: Derive the docs og:image from the slug**

In `src/pages/docs/[...slug].astro`, replace line 37:

```astro
const image = seo.ogImage;
```

with:

```astro
// Default the social card to the slug-derived generated image; seo.ogImage overrides.
const image = seo.ogImage ?? `/og/docs/${slugForCrumb || 'index'}.jpg`;
```

- [ ] **Step 2: Point the landing page at its card**

In `src/pages/index.astro`, change:

```astro
<MarketingLayout>
```

to:

```astro
<MarketingLayout image="/og/landing.jpg">
```

- [ ] **Step 3: Point the 404 page at its card**

In `src/pages/404.astro`, change:

```astro
<MarketingLayout title="Not found" description="The page you're looking for doesn't exist.">
```

to:

```astro
<MarketingLayout title="Not found" description="The page you're looking for doesn't exist." image="/og/404.jpg">
```

- [ ] **Step 4: Validate**

Run: `npm run check`
Expected: PASS (0 errors). `astro check` validates the `.astro` edits + content schema.

- [ ] **Step 5: Commit**

```bash
git add "src/pages/docs/[...slug].astro" src/pages/index.astro src/pages/404.astro
git commit -m "Wire slug-derived OG images into page metadata"
```

---

### Task 7: Generate all images, verify the build, commit

**Files:**
- Create: `public/og/**` (generated JPEGs)

- [ ] **Step 1: Generate every card**

Run: `npm run og`
Expected: ~88 `✓` lines (86 docs pages + landing + 404), no `✗`.

- [ ] **Step 2: Spot-check coverage**

Run: `node -e "const fs=require('fs');const n=require('child_process').execSync('git ls-files --others --exclude-standard public/og').toString().trim().split('\n').filter(Boolean).length; console.log('new og files:', n)"`
Expected: ~88 files. Confirm `public/og/docs/index.jpg`, `public/og/landing.jpg`, `public/og/404.jpg`, and a few nested ones (e.g. `public/og/docs/modules/billing.jpg`) all exist.

- [ ] **Step 3: Build and confirm images ship + are referenced**

Run: `npm run build`
Expected: build succeeds; `dist/og/docs/` is populated. Confirm a built page references its card:

Run: `node -e "const t=require('fs').readFileSync('dist/docs/architecture/vertical-slice/index.html','utf8');console.log(t.includes('/og/docs/architecture/vertical-slice.jpg') ? 'OG WIRED ✓' : 'MISSING ✗')"`
Expected: `OG WIRED ✓`

- [ ] **Step 4: Commit the generated images**

```bash
git add public/og
git commit -m "Generate OG images for all docs pages + landing + 404"
```

---

## Self-Review

**Spec coverage:**
- Hybrid model (data-driven + per-slug override) → Task 4 (`overridesDir` check). ✓
- FSH-green / no portrait → Task 2 CSS + Task 3 `mark-col`. ✓
- Four variants (home / overview / doc / site) → Task 3 + Task 4 `variantOf` + Task 5. ✓
- pageType accent + badge → Task 4 `PAGE_TYPE` map. ✓
- Auto-derive by slug + override → Task 6 Step 1. ✓
- Landing + 404 wiring → Task 6 Steps 2–3. ✓
- Commit generated JPEGs → Task 7 Step 4. ✓
- Slug mapping (root→index, section→dir, leaf→full) → Task 4 `slugOf`/`variantOf`, matches `[...slug].astro`. ✓
- package.json deps + script → Task 1. ✓
- Verification (render → check → build) → Tasks 4/5 inspect, Task 6 check, Task 7 build. ✓

**Placeholder scan:** No TBDs; every code step has complete code; every command has expected output. ✓

**Type/name consistency:** `renderDocsTemplate({ variant, eyebrow, title, description, badge, accent, count, logoSrc })` — same shape in tests (Task 3), builder (Task 3), and all call sites (Task 4). `slugOf`/`variantOf`/`listDocIds`/`sectionLabels`/`buildDocsJobs`/`buildSiteJobs`/`render` all defined and used in Task 4. `_og.css` created in Task 2, read by `template.mjs` (Task 3) and linked by site templates (Task 5). ✓
