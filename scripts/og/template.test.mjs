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
