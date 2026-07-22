// Posts a view beacon for the current /docs/* page or the homepage and
// renders the returned count into [data-views-count]. The chip uses a data-state
// reveal so the count-up animation runs once when the network resolves.
// Idempotent against Astro's view-transitions lifecycle: also re-runs
// on `astro:page-load`.

interface ViewsResponse {
  views: number;
}

const RUN_FLAG = '__fshViewsBeaconBound';
const COUNT_DURATION_MS = 900;

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function formatCount(n: number): string {
  try {
    return new Intl.NumberFormat(undefined).format(n);
  } catch {
    return String(n);
  }
}

// easeOutCubic - fast at first, soft landing. Feels like the number is
// "settling in" rather than ticking up linearly.
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function animateCount(el: HTMLElement, to: number): void {
  if (reduceMotion || to <= 0) {
    el.textContent = formatCount(to);
    return;
  }
  const start = performance.now();
  const step = (now: number): void => {
    const t = Math.min(1, (now - start) / COUNT_DURATION_MS);
    const value = Math.round(to * easeOutCubic(t));
    el.textContent = formatCount(value);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

async function sendBeacon(): Promise<void> {
  const slug = location.pathname.replace(/\/+$/, '') || '/';
  if (slug !== '/' && !slug.startsWith('/docs')) return;

  const wrap = document.querySelector<HTMLElement>('[data-views-count-wrap]');
  const target = document.querySelector<HTMLElement>('[data-views-count]');
  if (!wrap || !target) return;

  try {
    const res = await fetch('/api/views', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug }),
      keepalive: true,
    });
    if (!res.ok) return;
    const data = (await res.json()) as ViewsResponse;
    if (typeof data.views !== 'number') return;

    // Reveal first so the CSS transition can play; then animate the digits
    // in parallel. Two-step is intentional: the chip glides in while the
    // number counts up - composed, not stacked.
    wrap.dataset.state = 'ready';
    // If a sibling opted in as a separator (the landing trust strip prefixes
    // the readout with a "·"), reveal it in lockstep so a slow/failed beacon
    // never leaves a dangling separator. No-op elsewhere (e.g. the docs chip
    // has no such sibling).
    const sep = wrap.previousElementSibling;
    if (sep instanceof HTMLElement && sep.hasAttribute('data-views-sep')) {
      sep.dataset.state = 'ready';
    }
    // Reserve exactly the final number's width before counting up, so the
    // digits grow in place (no per-frame reflow of the centred strip) without
    // over-reserving - a small count like "1" stays tight to the digit instead
    // of leaving a gap. No-op where the target isn't a sized box (the inline
    // docs chip span, where min-width doesn't apply).
    target.style.minWidth = `${formatCount(data.views).length}ch`;
    animateCount(target, data.views);
  } catch {
    // Network failure is silent - the chip stays in `pending` state and
    // never appears. (No flash, no broken layout.)
  }
}

function init(): void {
  // Defer past initial paint so the beacon never competes with content.
  if ('requestIdleCallback' in window) {
    (window as Window & {
      requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void;
    }).requestIdleCallback(() => sendBeacon(), { timeout: 2000 });
  } else {
    setTimeout(sendBeacon, 0);
  }
}

const w = window as Window & { [RUN_FLAG]?: boolean };
if (!w[RUN_FLAG]) {
  w[RUN_FLAG] = true;
  init();
  document.addEventListener('astro:page-load', init);
}
