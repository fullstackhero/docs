# GEO + SEO Audit: fullstackhero.net

**Audit date:** 2026-06-22
**URL:** https://fullstackhero.net
**Type:** Open-source developer tool (free .NET 10 starter kit) + documentation site
**Pages analyzed:** 92 MDX content pages + landing + SEO infrastructure (source-level audit, not crawl)
**Goal:** Rank #1 on Google **and** be the most-cited AI answer for ".NET starter kit", ".NET boilerplate", ".NET template", ".NET SaaS boilerplate", "multitenant .NET template".

---

## Executive Summary

**Overall GEO Score: 71/100 (Fair → Good boundary)**

fullstackhero has one of the **best-engineered SEO foundations of any developer-tool docs site** - JSON-LD `@graph`, per-page `TechArticle` + `BreadcrumbList`, generated OG cards, a prioritized sitemap, an AI-crawler-friendly `robots.txt`, a hand-written `llms.txt`, universal `lastUpdated`, and hand-tuned `seo:` blocks on ~85 pages. The *technical* score is excellent. The reason it isn't already #1 everywhere is **not on-page quality - it's three structural gaps:**

1. **It owns "starter kit" intent but loses "boilerplate" and "template" intent entirely.** ABP / ASP.NET Boilerplate owns "boilerplate"; Jason Taylor & Ardalis own "clean architecture template"; BlazorPlate owns "multitenant template". fullstackhero ranks #1 for ".NET starter kit" but is **absent for ".NET boilerplate", "ASP.NET Core boilerplate", and - most damningly - ".NET 10 boilerplate"** despite being *the* .NET 10 product.
2. **It is absent from every high-trust citation source AI engines actually pull from** - `quozd/awesome-dotnet` (~20k★, canonical), editorial "Top N" listicles, and organic Reddit threads. AI engines name Jason Taylor → Ardalis → ABP by reflex because those are the sources in their index. fullstackhero only surfaces when the query already contains "SaaS", "multitenant", or "modular monolith".
3. **A star-authority gap** (6.6k vs 14k–20k incumbents) that AI engines use as a lazy proxy for "best" - amplified by #2.

**The good news:** every one of these is fixable, and the on-page machinery to exploit fixes is already built. The single highest-leverage moves are *off-page* (get into awesome-dotnet + listicles) and *content* (claim "boilerplate"/"template" keywords + definitional pages nobody owns). The on-page refinements (FAQ/HowTo schema, question-shaped headings, stat consistency) compound the GEO win.

### Score breakdown

| Category | Score | Weight | Weighted | One-line verdict |
|---|---|---|---|---|
| AI Citability | 72/100 | 25% | 18.0 | Great definition paragraphs; headings & FAQ schema underused |
| Brand Authority | 58/100 | 20% | 11.6 | Real entity, but missing from the lists AI engines cite |
| Content E-E-A-T | 74/100 | 20% | 14.8 | Deep, honest, fresh - but author identity is invisible on-page |
| Technical GEO | 88/100 | 15% | 13.2 | Best-in-class; tiny gaps (og:type, dead keywords field) |
| Schema / Structured Data | 70/100 | 10% | 7.0 | Strong base; FAQPage/HowTo/Person opportunities unused |
| Platform Optimization | 55/100 | 10% | 5.5 | GitHub strong; awesome-lists / Reddit / YouTube absent |
| **Overall** | | | **71/100** | Excellent foundation, under-leveraged distribution |

---

## SERP Reality Check (where you stand today)

| Head term | Who owns page 1 | fullstackhero |
|---|---|---|
| **.NET starter kit** | **fullstackhero #1**, starterindex, kriasoft (stale) | ✅ **#1** |
| **best .NET starter kit** | **fullstackhero #1** | ✅ **#1** |
| **.NET 9 starter kit** | **fullstackhero** (repo + mirrors) | ✅ owns it |
| **.NET boilerplate** | aspnetboilerplate.com #1, ABP repo, themeselection | ⚠️ #5 on the **legacy `dotnet-webapi-boilerplate` URL** |
| **ASP.NET Core boilerplate** | ABP fortress (top 5) | ❌ absent |
| **ASP.NET Core starter kit** | kriasoft (stale), aspnetrun, fragmented | ❌ absent - **weak incumbents = opportunity** |
| **.NET 10 boilerplate** | lkurzyniec/netcore-boilerplate #1, ABP, blazorplate | ❌ **absent despite being THE .NET 10 product** |
| **.NET SaaS boilerplate** | listicles (faciletechnolab "Top 10", starterindex) | ❌ absent from listicles |
| **multitenant .NET template** | **blazorplate.net #1** (dedicated landing page) | ⚠️ #3, only via a GitHub *discussion thread* |

**Takeaway:** You've won the "starter kit" cluster. The growth is in the **"boilerplate" + "template" + ".NET 10" + "SaaS" clusters you don't yet contest**, plus the **listicle/awesome-list citation tier** that feeds AI engines.

---

## Competitor Landscape

| Project | ~Stars | Docs site | License | `<title>` keyword target |
|---|---|---|---|---|
| jasontaylordev/CleanArchitecture | ~20.2k | Yes | MIT | "Clean Architecture Solution Template for ASP.NET Core" |
| ardalis/CleanArchitecture | ~18.3k | Yes | MIT | "proven Clean Architecture Template for ASP.NET Core 10" |
| abpframework/abp | ~14.3k | Yes (versioned) | LGPL + Pro $2,999–9,999/yr | "Modern ASP.NET Core Web Application Platform" |
| dotnet/eShop | ~10.6k | README only | MIT | "reference .NET eCommerce application" |
| **fullstackhero** | **~6.6k** | **Yes - deepest in the set** | **MIT** | "Free .NET 10 Starter Kit with React UI" |
| Blazorplate | closed | Marketing | $499–999 | "Multi-Tenant & SaaS Template for .NET" |
| Nano (aspnano) | closed | Docs + blog | Commercial | "ASP.NET Core API Boilerplate · Multi-Tenant SaaS" |

**Your two structural advantages** (use them relentlessly):
1. **The deepest docs portal of any competitor.** eShop, amantinband, SharpGrip have *no docs site at all*. ABP's docs are framework-locked. This is your moat for GEO - AI engines cite well-structured docs.
2. **The only OSS project with first-party "vs" comparison pages.** You already have `/compare/fsh-vs-abp`, `/fsh-vs-clean-architecture`, `/fsh-vs-blazorplate`. Competitors only self-promote; you publish neutral-framed comparisons AI engines love to quote.

**Timely wedges:**
- **ASP.NET Boilerplate official support ends May 2026.** "ASP.NET Boilerplate alternative (free/open-source)" is a rising query with no good OSS answer. You are the answer.
- **MIT vs ABP $3k–10k/yr** is a clean, quotable cost contrast nobody neutral owns.

---

## Category Deep Dives

### 1. AI Citability - 72/100

**Strong:** The Hero subtitle is a textbook citable definition paragraph ("fullstackhero is the free, MIT-licensed .NET 10 starter kit for teams shipping production SaaS…"). The `llms.txt` is genuinely excellent - self-contained, fact-dense, well-sectioned. Module/architecture pages are substantial (800–1,550 words).

**Gaps:**
- **Heading shape is the #1 on-page miss.** Of **638 H2s, only 22% (138) are question- or keyword-shaped.** 50 pages have <25%. The dominant pattern is generic labels - *What it ships*, *How it's wired*, *Gotchas*, *Critical files*, *Related*. These are great for humans, **useless for featured-snippet / AI-Overview extraction**. Reshaping even 3–4 per money page into question form ("How does fullstackhero enforce tenant isolation?", "When should I use SSE instead of SignalR?") captures long-tail + AI-quote intent without restructuring content.
- **Conflicting statistics across surfaces erode trust.** Test count is quoted as **"~900"** (`llms.txt`), **"1,400+"** (Hero stat card), and **"1,800"** (landing FAQ). AI engines penalize internal contradiction. Pick one canonical number and propagate it everywhere (incl. `llms.txt`).
- **FAQPage schema exists on the landing page only.** Module, architecture, and security pages have implicit Q&A content but emit no `FAQPage`. This is the cheapest citability multiplier available.
- **Generic H1s on 17 section pages** ("Overview", "Introduction", "Documentation") - the SERP `<title>` is overridden and fine, but the *on-page H1* (which AI extracts as the page's topic anchor) is contentless. Make H1s topical ("Architecture overview", "Compare fullstackhero").

### 2. Brand Authority - 58/100

**Strong:** Legitimate, citable entity - 6.6k★, MIT, on NuGet, real maintainer (Mukesh Murugan / codewithmukesh.com), present in algorithmic directories (starterindex, opensourceboilerplates, buildkits).

**Gaps (this is the score holding you back most):**
- **Absent from `quozd/awesome-dotnet` (~20k★, canonical) and `thangchung/awesome-dotnet-core`.** AI engines treat these as ground truth. ABP is in them; you are not. **This is the single highest-leverage off-page fix.**
- **Absent from editorial "Top N" listicles** (boilerplatelist, faciletechnolab, themeselection) where AI Overviews pull the SaaS-boilerplate answer.
- **Reddit footprint is one 3-year-old self-announcement.** ChatGPT/Perplexity/Gemini weight Reddit heavily (note: Reddit is blocked to ClaudeBot, so Claude sees less of it).
- **No third-party "Top .NET starter kits" YouTube roundup exists** - an entirely open category.

### 3. Content E-E-A-T - 74/100

**Strong:** Deep, original, honest (the comparison pages explicitly invite correction). `lastUpdated` on **100% of pages** - a freshness signal almost no docs site achieves. Real, named maintainer.

**Gaps:**
- **Author identity is invisible on-page.** No `Person` schema, no author byline/bio on docs pages, no "About" page surfacing Mukesh's credentials (his blog has real authority - codewithmukesh.com). E-E-A-T's "Experience/Expertise" pillars are unsubstantiated to a crawler. Add `Person` (author) schema + a short author/maintainer block.
- **`/docs/ai-development/agents-md/` and `/skills-and-workflows/`** are the only two substantive pages with **no `seo:` block at all** - they inherit bare frontmatter with no keyword treatment.

### 4. Technical GEO - 88/100 (best-in-class)

**Strong:** Fully static SSG (no JS-render dependency - ideal for AI crawlers), canonical URLs, `robots.txt` explicitly allow-lists 20+ AI/search crawlers, `sitemap-index.xml` with per-path priority/changefreq, `llms.txt` + generated `llms-full.txt`, fast Cloudflare-Worker-served static assets, Lighthouse 100s (per recent commits).

**Gaps (minor):**
- **`og:type` is hardcoded `website`** in `BaseLayout` for *all* pages, including docs articles. Article pages should emit `og:type=article` (with `article:modified_time` from `lastUpdated`).
- **The `seo.keywords` frontmatter field is dead.** It's authored on ~85 pages but emitted *nowhere* (`content.config.ts` even comments "consumed by future per-page schema"). Either delete it or - better - pipe it into the `TechArticle` JSON-LD `keywords` property (AI engines parse it) and use it to auto-seed per-page FAQ topics.
- **Twitter card** has no `twitter:site`/`twitter:creator` handle.

### 5. Schema / Structured Data - 70/100

**Present:** `Organization`, `WebSite`, `SoftwareApplication` (with `offers: price 0` → "Free" rich-result label - excellent), per-page `TechArticle` + `BreadcrumbList`, `FAQPage` (landing only).

**Missing high-value opportunities:**
- **`HowTo` schema on the step-by-step guides** - `getting-started/install`, `quick-start`, `guides/add-a-feature`, `add-a-module`, `add-a-dashboard-page`, `operator-impersonation`. These are textbook `HowTo` candidates currently emitting only `TechArticle`. `HowTo` is a primary AI-Overview citation format.
- **`FAQPage` on docs pages** (see Citability).
- **`Person` (author/maintainer) schema** (see E-E-A-T).
- **`TechArticle.keywords`** not populated despite per-page keywords being authored.

### 6. Platform Optimization - 55/100

GitHub presence is strong (the entity exists and is starred), but the *off-GitHub* surfaces AI engines cite are empty: no awesome-list inclusion, near-zero organic Reddit, no YouTube roundup presence, no Wikipedia/entity-graph footprint. Covered in the action plan below.

---

## Content Gaps - keywords nobody owns (your fastest wins)

Verified as having **no authoritative owner** (top results are LinkedIn posts / scattered Medium):

| Target query | Current owner | Opportunity |
|---|---|---|
| "what is a .NET starter kit vs boilerplate" | a LinkedIn post | **Own the definition outright.** AI Overviews love clean definitional answers. |
| ".NET boilerplate vs framework" / "starter kit vs from scratch" | Medium opinion pieces | Definitional/decision page → funnels to product |
| "ASP.NET Boilerplate alternative (free, open-source)" | ABP's own docs | **Timely** - ABP support ends May 2026; no OSS answer exists |
| "ABP alternative open source" | ABP's own docs | MIT-vs-$3k/yr wedge |
| "how to build a multitenant SaaS in .NET 10" | fragmented (Medium, Syncfusion) | End-to-end tutorial, fully open |
| ".NET 10 boilerplate" (keyword) | lkurzyniec (stale) | You're the natural owner; you just don't rank |

---

## Prioritized Action Plan

Ordered by **leverage ÷ effort**. ⭐ = highest leverage.

### This week - Quick wins (on-page, all within this repo)

1. ⭐ **Fix the conflicting test/stat numbers** across `llms.txt`, Hero, FAQ, and any page that cites counts. Pick one canonical figure. *(trust + citability; ~30 min)*
2. ⭐ **Add `HowTo` JSON-LD** to the 6 step-by-step guides (`install`, `quick-start`, `add-a-feature`, `add-a-module`, `add-a-dashboard-page`, `operator-impersonation`). Derive steps from existing H2s. *(major AI-Overview format)*
3. ⭐ **Reshape headings to question form** on the top ~15 money pages (getting-started/*, compare/*, modules/identity·multitenancy, architecture/*). Target ≥40% question-shaped H2s. *(snippet + AI-quote capture)*
4. **Emit `seo.keywords` into `TechArticle.keywords`** in `[...slug].astro` (and reuse for FAQ seeding) - kills the dead field, feeds AI parsers.
5. **Fix `og:type`** → `article` for docs pages with `article:modified_time`; add `twitter:creator`.
6. **Trim the 18 over-long meta descriptions** (>170 chars; worst: webhooks 215, authorization 208, ci-cd 207) to ≤155 so they don't truncate in SERPs.
7. **Add `seo:` blocks** to `ai-development/agents-md` and `skills-and-workflows`.

### Weeks 2–3 - Claim the keywords you don't own

8. ⭐ **Create a dedicated "boilerplate/template" landing surface.** Add ".NET boilerplate" and ".NET template" to the landing `<title>`/H1 secondary copy and create a canonical page that ranks for **".NET 10 boilerplate"** and **"ASP.NET Core starter kit"** (weak incumbents). You own "starter kit" - extend the entity to "boilerplate/template".
9. ⭐ **Dedicated multitenant landing page** mirroring BlazorPlate's purpose-built page (you currently surface only via a GitHub discussion).
10. **Definitional page: "What is a .NET starter kit (vs boilerplate vs framework)?"** - the unowned, highly-citable definition. Add `FAQPage` schema.
11. **"ASP.NET Boilerplate / ABP alternative (free & open-source)"** comparison page - timely (support ends May 2026), high commercial intent.
12. **Add `FAQPage` schema** to module + architecture + security pages (reuse the landing's pattern; a reusable `<FaqBlock>` MDX component is the clean way).
13. **Expand `/compare/` overview** with a quotable head-to-head **table** (it currently defers tables to sub-pages) and add comparisons vs **eShop**, **Jason Taylor**, **Ardalis**, **Nano**.

### Weeks 3–4 - Off-page distribution (fixes Brand + Platform, the real ceiling)

14. ⭐ **PR into `quozd/awesome-dotnet` and `thangchung/awesome-dotnet-core`.** Single highest-value off-page action. Canonical, AI-cited, ABP is in, you're not.
15. ⭐ **Fix GitHub repo topic tags**: add `clean-architecture`, `clean-architecture-boilerplate`, `modular-monolith`, `multitenancy`, `dotnet-starter-kit`, `aspnetcore-boilerplate` → enters AI-cited topic-page aggregations.
16. **Get into editorial listicles** (boilerplatelist, faciletechnolab, themeselection) via outreach/contribution.
17. **Seed genuine Reddit presence** - participate in live r/dotnet "recommend a starter kit" threads (contribute, don't announce).
18. **Add `Person` (author) schema + a maintainer/author block** linking Mukesh's `sameAs` (codewithmukesh.com, GitHub, X) to anchor E-E-A-T.
19. **Publish/commission a "Top .NET starter kits 2026" piece** on codewithmukesh.com (you control it) and a YouTube walkthrough - open category, becomes a citation source.

### Ongoing - Measurement

- Track rankings for the 9 head terms in the SERP table monthly.
- Quarterly: prompt ChatGPT / Claude / Perplexity / Gemini with "best .NET starter kit / boilerplate" and log whether fullstackhero is named and what's cited.
- Keep `lastUpdated` honest (you already do this well) and keep `llms.txt` in sync with the canonical stats.

---

## Appendix: Systemic on-page findings (from the 92-page inventory)

- **`lastUpdated`:** 100% coverage ✅ (rare and excellent)
- **`seo:` blocks:** ~85/92 pages hand-tuned ✅; 3 pages missing (1 intentional root, 2 real content pages)
- **Titles:** 0 over 60 chars ✅; 17 generic *on-page H1s* (SERP titles fine via override)
- **Descriptions:** 50% outside the 110–160 sweet spot - 18 too long (truncation risk), 4 too short
- **Heading shape:** only 22% of H2s question/keyword-shaped ⚠️ (biggest on-page snippet opportunity)
- **Thin content:** 11 pages <150 words - mostly JSX-rendered index pages (expected), 4 borderline real-prose pages could use one orienting paragraph
- **Dead field:** `seo.keywords` authored on ~85 pages, emitted nowhere

**Bottom line:** The foundation is top 1% for a developer docs site. The path to #1-everywhere is **(a) claim the boilerplate/template/.NET-10 keyword clusters you currently cede, (b) get cited in the awesome-lists and listicles AI engines read, and (c) layer FAQ/HowTo schema + question-shaped headings on top.** Do those and the existing machinery turns this into the default answer.
