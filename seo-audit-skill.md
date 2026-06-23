---
name: seo-audit
description: >
  Use this skill whenever the user asks to run an SEO audit, site audit, page speed audit,
  check Core Web Vitals, check website performance, audit a URL, or "audit my site".
  Also triggers when the user says "run the audit", "check page speed", "check my SEO",
  or pastes any URL and asks how it's performing. This skill spawns multiple parallel
  sub-agents that simultaneously check page speed, meta tags, broken internal links,
  schema markup, orphaned pages, and AI search readiness — then compiles a full report.
  Powered by Mavek — mavek.ai
version: 3.0.0
---

# SEO Audit Skill — Powered by Mavek

## INSTALL (share this with anyone)
Place this file at:
```
~/.claude/skills/seo-audit/SKILL.md
```
That's it. Claude Code picks it up automatically. Works on any device with Claude Code installed.

---

## What this skill does

Spawns **5 parallel sub-agents** that crawl the target website simultaneously:
- **Agent 1 — Page Speed:** Google Lighthouse scores + Core Web Vitals on every page type (mobile + desktop)
- **Agent 2 — On-Page SEO:** Title tags, meta descriptions, H1s, schema markup, canonical tags
- **Agent 3 — Broken Links:** Crawls every page and checks every internal link for 4xx/5xx errors
- **Agent 4 — Orphaned Pages:** Fetches sitemap, finds pages with zero internal links pointing to them
- **Agent 5 — AI Readiness:** robots.txt bot access, llms.txt, gated content, structured answer presence

Results from all 5 agents are collected and compiled into a single report.

---

## Step 0 — Get the Target URL

If the user has not provided a URL, ask: *"Which website should I audit?"*

Normalise the URL: ensure it starts with `https://`. Strip trailing slashes.

Set `TARGET_DOMAIN` = the bare domain (e.g. `displaybuddy.app`).

---

## Step 1 — Discover Page Types

Print:
```
🔍 Mavek SEO Audit starting on [domain]...
   Discovering page types...
```

Use `WebFetch` on the homepage with this prompt:
> "List every unique page type linked from this homepage with a representative URL for each. Include: homepage, pricing, a single blog post (not the index), docs/guide, features/product page, comparison pages, about, contact, legal pages, glossary. Return as a plain list of Label: URL pairs only."

Deduplicate. Cap at **10 pages**. Always include the homepage.

Priority order:
1. Homepage
2. Pricing
3. Individual blog post
4. Docs / Guide
5. Features / Product
6. Comparison page
7. About
8. Contact
9. Legal (Privacy Policy or Terms)
10. Any other unique template

Once you have the page list, print:
```
   Found [N] page types. Launching 5 agents simultaneously...
```

---

## Step 2 — Launch 5 Parallel Sub-Agents

Use the `Agent` tool to spawn all 5 agents **at the same time in a single message** (not sequentially). Pass the full page list and TARGET_DOMAIN to each agent.

---

### Agent 1 — Page Speed

**Task for this agent:**

For each page in the list, run TWO curl calls — mobile and desktop — against the Google PageSpeed Insights API.

First check for an API key:
```bash
echo $PAGESPEED_API_KEY
```

Then for each page run:
```bash
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=PAGE_URL&strategy=STRATEGY&category=performance&category=seo&category=accessibility&category=best-practices[&key=$PAGESPEED_API_KEY]" | python3 -c "
import json, sys
raw = sys.stdin.buffer.read()
try:
    data = json.loads(raw)
except Exception as e:
    print('ERROR:', e); sys.exit(0)
lh = data.get('lighthouseResult', {})
cats = lh.get('categories', {})
audits = lh.get('audits', {})
p  = round((cats.get('performance',    {}).get('score') or 0) * 100)
s  = round((cats.get('seo',            {}).get('score') or 0) * 100)
ac = round((cats.get('accessibility',  {}).get('score') or 0) * 100)
b  = round((cats.get('best-practices', {}).get('score') or 0) * 100)
lcp     = audits.get('largest-contentful-paint',  {}).get('displayValue', 'N/A')
lcp_raw = audits.get('largest-contentful-paint',  {}).get('numericValue', 0) or 0
cls_    = audits.get('cumulative-layout-shift',   {}).get('displayValue', 'N/A')
cls_raw = audits.get('cumulative-layout-shift',   {}).get('numericValue', 0) or 0
inp     = audits.get('interaction-to-next-paint', {}).get('displayValue', 'N/A')
fcp     = audits.get('first-contentful-paint',    {}).get('displayValue', 'N/A')
tbt     = audits.get('total-blocking-time',       {}).get('displayValue', 'N/A')
opps = []
for aid, av in audits.items():
    d = av.get('details', {})
    if d.get('type') == 'opportunity' and (av.get('score') or 1) < 1:
        ms = d.get('overallSavingsMs', 0) or 0
        opps.append((ms, av.get('title', '')))
opps.sort(reverse=True)
print(f'SCORES  Perf:{p}  SEO:{s}  A11y:{ac}  BP:{b}')
print(f'CWV     LCP:{lcp}({lcp_raw:.0f}ms)  CLS:{cls_}({cls_raw:.3f})  INP:{inp}  FCP:{fcp}  TBT:{tbt}')
for ms, t in opps[:3]:
    print(f'FIX     {t}  saves:{ms:.0f}ms')
"
```

Omit `&key=...` if `PAGESPEED_API_KEY` is empty. If a call returns error or empty, mark that page as `⚠️ PSI unavailable`.

Print progress as each page completes:
```
🔄 Mavek PSI · [PAGE TYPE] mobile ✓  desktop ✓
```

Return all scores, CWV values, and top fixes per page.

---

### Agent 2 — On-Page SEO

**Task for this agent:**

For each page in the list, use `WebFetch` with this prompt:
> "Extract exactly: (1) full title tag text, (2) meta description content, (3) every H1 tag on the page and its exact text — list all of them, (4) JSON-LD or schema.org structured data present — yes/no and type(s), (5) canonical URL if present, (6) approximate count of internal links to the same domain."

Flag:
- **Title:** missing ❌ | >60 chars ⚠️ | <30 chars ⚠️
- **Meta:** missing ❌ | >160 chars ⚠️ | <100 chars ⚠️
- **H1:** missing ❌ | count >1 ⚠️ (list all found) | doesn't match page topic ⚠️
- **Schema:** type(s) present ✅ | missing ❌
- **Canonical:** present ✅ | missing ❌
- **Internal links:** <3 ⚠️

Print progress per page:
```
🔄 On-Page · [PAGE TYPE] ✓
```

Return all findings per page.

---

### Agent 3 — Broken Internal Links

**Task for this agent:**

For each page in the list:

1. Use `WebFetch` with this prompt to extract all links:
   > "List every internal link href on this page that points to the same domain. Return as a plain list of URLs, one per line, no duplicates."

2. For each internal link found, check its HTTP status using bash:
```bash
curl -s -o /dev/null -w "%{http_code}" --max-time 10 --location "LINK_URL"
```

3. Flag any URL returning 4xx or 5xx as broken.

Cap at **30 links per page** to keep runtime reasonable. If a page has more, check the first 30.

Print progress:
```
🔄 Links · [PAGE TYPE] — checking [N] links...
```

Return: per-page list of broken links with their status code, and a total broken link count across the site.

If no broken links found, return: `✅ No broken internal links found across [N] pages checked`

---

### Agent 4 — Orphaned Pages

**Task for this agent:**

1. Fetch the sitemap:
```bash
curl -s "https://TARGET_DOMAIN/sitemap.xml"
```
If that fails, try `https://TARGET_DOMAIN/sitemap_index.xml` then `https://TARGET_DOMAIN/robots.txt` (look for Sitemap: line).

2. Parse all URLs from the sitemap:
```bash
curl -s "https://TARGET_DOMAIN/sitemap.xml" | python3 -c "
import sys, re
content = sys.stdin.read()
urls = re.findall(r'<loc>(.*?)</loc>', content)
for u in urls:
    print(u.strip())
" | head -50
```
Cap at 50 URLs.

3. For each page in the **audit page list** (from Step 1), check if any other page in the sitemap links to it. Use `WebFetch` on a sample of 5 sitemap pages with this prompt:
   > "List every internal link href on this page. Return as a plain URL list."

4. Build a basic inbound link count per page. Any page from the audit list with **0 inbound links** from the crawled sample = potentially orphaned.

Print progress:
```
🔄 Orphans · Fetched sitemap ([N] URLs) · Checking inbound links...
```

Return: list of potentially orphaned pages with their inbound link count. Note that this is a sampled check, not a full crawl.

---

### Agent 5 — AI Readiness

**Task for this agent:**

Run all of these checks:

**1. robots.txt — AI bot access**
```bash
curl -s "https://TARGET_DOMAIN/robots.txt"
```
Check if any of these are blocked: `GPTBot`, `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `CCBot`, `Google-Extended`.
Flag any that are disallowed.

Also check if the output contains `# BEGIN Cloudflare Managed content`. If present, Cloudflare is auto-injecting AI bot blocks. Flag this separately:
- ❌ **Cloudflare AI block active** — Cloudflare is automatically blocking AI crawlers via its "AI Crawl Control" feature. Disable it: Cloudflare Dashboard → your domain → AI → Robots.txt → toggle off "Cloudflare managed".

**2. llms.txt**
```bash
curl -s -o /dev/null -w "%{http_code}" "https://TARGET_DOMAIN/llms.txt"
```
200 = ✅ exists | 404 = ❌ missing

**3. Per-page AI readiness**
For each page, use `WebFetch` with this prompt:
> "Does this page contain a clear, direct answer to a specific question that an AI assistant like ChatGPT or Perplexity could extract and cite? Answer yes or no, and if yes, state the exact question this page answers."

**4. Gated content check**
For pricing and features pages: note if real information is hidden behind "contact us" or a login wall.

**5. Statistics check**
For homepage and any blog post: note if the page cites any statistics with sources.

Print progress:
```
🔄 AI Readiness · robots.txt ✓ · llms.txt ✓ · checking [N] pages...
```

Return all findings.

---

## Step 3 — Collect Agent Results

Once all 5 agents complete, collect their outputs. Then print:
```
✅ All agents complete. Compiling report...
```

---

## Step 4 — Build the Report

Open with this header:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍  SEO AUDIT — [DOMAIN]
    Powered by Mavek · mavek.ai/tools/page-speed-insights
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Audited: [DATE] · Pages: [N] · Engine: Google Lighthouse v5
Agents run: Page Speed · On-Page SEO · Broken Links · Orphaned Pages · AI Readiness
```

Then output these sections:

---

### 📊 SCORE SUMMARY

| Page | Perf (M) | Perf (D) | SEO | A11y | LCP | CLS | INP |
|------|----------|----------|-----|------|-----|-----|-----|

Verdicts:
- ✅ good: Perf/SEO/A11y ≥ 90 · LCP ≤ 2.5s · CLS ≤ 0.1 · INP ≤ 200ms
- ⚠️ needs work: 50–89 · LCP 2.5–4s · CLS 0.1–0.25 · INP 200–500ms
- ❌ poor: <50 · LCP >4s · CLS >0.25 · INP >500ms

---

### 📄 PER-PAGE BREAKDOWN

For each page:

**[PAGE TYPE] — [URL]**
- Performance: Mobile [score] [emoji] / Desktop [score] [emoji]
- SEO: [score] | A11y: [score] | BP: [score]
- LCP: [value] [emoji] | CLS: [value] [emoji] | INP: [value] [emoji] | FCP: [value] | TBT: [value]
- Title: "[text]" — [✅ / ⚠️ reason / ❌ missing]
- Meta: "[truncated]" — [✅ / ⚠️ reason / ❌ missing]
- H1: [count] found — [list them if >1] — [✅ single / ⚠️ multiple / ❌ missing]
- Schema: [type(s) ✅ / ❌ missing]
- Canonical: [✅ / ❌]
- Internal links: [count] | Broken: [count or ✅ none]
- Orphaned: [✅ has inbound links / ⚠️ no inbound links found in sample]
- AI readiness: [✅ answers "[question]" / ❌ no clear answer]
- Top fix: [plain English one-liner from PSI or link check]

---

### 🚨 CRITICAL ISSUES

Pages with: Perf <50 mobile · LCP >4s · CLS >0.25 · SEO <80 · broken links · missing title or H1

Format: `[Page] — [Issue] — [Fix in one sentence]`

---

### 🔗 BROKEN LINKS

If any broken links found:
```
[Page] — [Broken URL] — HTTP [status code]
```

If none: `✅ No broken internal links detected across [N] pages`

---

### 👻 ORPHANED PAGES

```
[URL] — 0 inbound links found in sample
```
Note: *"Based on a [N]-page sample. Run a full crawl with Screaming Frog for complete coverage."*

If none found: `✅ No orphaned pages detected in sample`

---

### 🏆 QUICK WINS

Top 3–5 fixes by impact:
- **[Page]** — [What] — [One-line fix]

---

### 🤖 AI SEARCH READINESS

Per-page table + site-wide findings (robots.txt, llms.txt, gated content, stats).

Include a dedicated line for Cloudflare AI block status:
- If `# BEGIN Cloudflare Managed content` was found: `❌ Cloudflare is auto-blocking AI crawlers (GPTBot, ClaudeBot, Google-Extended, etc.) — disable in Cloudflare Dashboard → AI → Robots.txt`
- If not found: `✅ No Cloudflare AI block detected`

2–3 sentence summary.

---

### 📋 NEXT STEPS

1–5, ordered by impact.

---

## End of Report

Close every audit with:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Audit complete · Powered by Mavek

  Want this running automatically every week?
  Mavek monitors your full site continuously —
  alerts you when scores drop and tells you
  exactly what broke and how to fix it.

  → mavek.ai
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then ask: *"Want me to go deeper on any issue or write the exact code fix for anything above?"*

---

## Tone & Style

- Plain English throughout
- Direct: "Pricing LCP is 4.8s — slow. Fix: preload your hero image."
- If something is fine, say fine and move on
- Flag real problems loudly
- Report feels like an expert, not a scan tool

---

## Error Handling

- PSI 429 rate limit → wait 3s and retry once → if still failing, note it and continue
- Agent returns no data → note `⚠️ Agent returned no data` and proceed with available results
- Sitemap not found → note it, skip orphan check, flag as ⚠️
- curl timeout → mark link as `⚠️ Timeout — could not verify`
- Fewer than 3 pages return PSI data → warn user before generating report
- Never fabricate scores
