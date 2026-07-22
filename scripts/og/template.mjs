// scripts/og/template.mjs
// Pure HTML builders for OG cards. No I/O - the caller injects the inlined
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
    <span class="name">fullstackhero</span>
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
  eyebrow = 'fullstackhero',
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
    headline = `<h1 class="wordmark">fullstackhero</h1>`;
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
