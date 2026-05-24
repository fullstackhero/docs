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
      html = { content: renderDocsTemplate({ variant, eyebrow: 'Documentation', title: 'fullstackhero', description: data.description, logoSrc }) };
    } else if (variant === 'overview') {
      // Section index pages are titled "Overview"; use the section label as the
      // headline so the card reads "Architecture", not "Overview".
      html = { content: renderDocsTemplate({ variant, eyebrow: 'Section Overview', title: label ?? data.title, description: data.description, count: counts.get(sectionDir) ?? 0, logoSrc }) };
    } else {
      const pt = PAGE_TYPE[data.pageType] ?? PAGE_TYPE.guide;
      html = { content: renderDocsTemplate({ variant, eyebrow: label ?? 'fullstackhero', title: data.title, description: data.description, badge: pt.badge, accent: pt.accent, logoSrc }) };
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
