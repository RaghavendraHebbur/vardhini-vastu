# vardhinivastu.in — Agent Briefing & vv2 Design System

## Who You Are Working For
**Vardhini Vastu** — Scientific Vastu consultancy run by Raghavendra Hebbur, Bangalore.
- Website: https://vardhinivastu.in
- WordPress site hosted on Hostinger
- Phone: +919739105574
- Display email: Info@vardhinivastu.in (NEVER use vardhinivastu@gmail.com or vastu@vardhinivastu.in)

---

## Your Primary Mission Right Now

**Implement the vv2 design system on every page that does not yet have it.**

Pages already done in vv2: Home (1052), About (1054), Services (1056), Fees (1057), Contact (1055).

Pages that need vv2 (your job):
- **Service pages**: 1058 commercial-vastu, 1059 industrial-vastu-bangalore, 1060 online-vastu-consultation, 1061 pre-purchase-vastu, 1062 lecher-antenna-geopathic-stress, 1063 testimonials, 1064 credentials
- **Landing pages**: 1245 vastu-for-home, 1315 in (India), 1316 best-vastu-consultant-bangalore, 1317 best-vastu-consultant-india
- **150+ location pages**: all `vastu-consultant-*` slugs (IDs 1065–1215)

---

## How to Push Content to WordPress

Use the MCP ability `novamira/execute-php` (MCP server: `novamira-vardhinivastu-in`):

```php
// Update page content
$result = wp_update_post([
    'ID' => PAGE_ID,
    'post_content' => '<!-- wp:html -->' . $html . '<!-- /wp:html -->',
]);
// Always purge cache after updates
if(class_exists('LiteSpeed\Purge')){ LiteSpeed\Purge::purge_all(); }
echo $result ? 'OK:'.$result : 'FAIL';
```

**Sandbox path** (write PHP files here, then copy to mu-plugins):
`/home/u305824533/domains/vardhinivastu.in/public_html/wp-content/novamira-sandbox/`

**mu-plugins path**:
`/home/u305824533/domains/vardhinivastu.in/public_html/wp-content/mu-plugins/`

---

## vv2 Design System — Complete Reference

### Design Philosophy
Linear/Stripe/Notion aesthetic. Clean, premium, trust-building. Every page must feel like a top-tier SaaS product page — not a traditional Vastu website.

### CSS Variables
```css
:root {
  --vv-bg:#fafaf9;   /* page background - warm off-white */
  --vv-sf:#fff;      /* surface / card background */
  --vv-bd:#e7e5e0;   /* border color */
  --vv-tx:#0c0a09;   /* primary text - near black */
  --vv-tx2:#57534e;  /* secondary text - warm grey */
  --vv-tx3:#a8a29e;  /* muted text */
  --vv-or:#ea580c;   /* orange accent (CTAs, highlights) */
  --vv-orl:#fff7ed;  /* orange light bg */
  --vv-orm:#fed7aa;  /* orange medium (borders) */
  --vv-r:14px;       /* border radius */
  --vv-sh:0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.04);
  --vv-shl:0 4px 24px rgba(0,0,0,.08),0 12px 48px rgba(0,0,0,.05);
}
```

### Full CSS Block (paste at top of every page inside `<style>` tags)
```css
:root{--vv-bg:#fafaf9;--vv-sf:#fff;--vv-bd:#e7e5e0;--vv-tx:#0c0a09;--vv-tx2:#57534e;--vv-tx3:#a8a29e;--vv-or:#ea580c;--vv-orl:#fff7ed;--vv-orm:#fed7aa;--vv-r:14px;--vv-sh:0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.04);--vv-shl:0 4px 24px rgba(0,0,0,.08),0 12px 48px rgba(0,0,0,.05);}
.vv2{font-family:'Inter',system-ui,sans-serif;background:var(--vv-bg);color:var(--vv-tx);-webkit-font-smoothing:antialiased;margin-left:calc(-50vw + 50%);margin-right:calc(-50vw + 50%);width:100vw;box-sizing:border-box;}
.vv2 *{box-sizing:border-box;}
.vv2 a{text-decoration:none;color:inherit;}
.w{max-width:1080px;margin:0 auto;padding:0 32px;}
@media(max-width:640px){.w{padding:0 20px;}}
.sf{padding:80px 0;background:#fff;border-top:1px solid var(--vv-bd);}
.sw{padding:80px 0;background:var(--vv-orl);border-top:1px solid var(--vv-orm);}
.sd{padding:80px 0;background:#0c0a09;}
@media(max-width:640px){.sf,.sw,.sd{padding:56px 0;}}
.hero{padding:96px 32px 72px;max-width:1080px;margin:0 auto;}
@media(max-width:640px){.hero{padding:60px 20px 48px;}}
.badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--vv-bd);border-radius:100px;padding:6px 14px;font-size:.78rem;font-weight:600;color:var(--vv-tx2);margin-bottom:24px;}
.badge i{width:7px;height:7px;background:var(--vv-or);border-radius:50%;display:inline-block;font-style:normal;}
.hero h1{font-size:clamp(2.3rem,5vw,3.8rem);font-weight:800;line-height:1.1;letter-spacing:-.03em;color:var(--vv-tx);margin:0 0 22px;max-width:760px;}
.hero h1 em{font-style:normal;color:var(--vv-or);}
.sub{font-size:1.08rem;color:var(--vv-tx2);line-height:1.7;max-width:600px;margin:0 0 38px;}
.acts{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:52px;}
.bp{display:inline-flex;align-items:center;gap:8px;background:var(--vv-or);color:#fff;padding:13px 22px;border-radius:10px;font-size:.93rem;font-weight:600;transition:all .15s;}
.bp:hover{background:#c2410c;transform:translateY(-1px);box-shadow:0 8px 20px rgba(234,88,12,.25);color:#fff;}
.bs{display:inline-flex;align-items:center;gap:8px;background:#fff;color:var(--vv-tx);padding:13px 22px;border-radius:10px;font-size:.93rem;font-weight:600;border:1px solid var(--vv-bd);transition:all .15s;}
.bs:hover{border-color:#d6d3d1;transform:translateY(-1px);color:var(--vv-tx);}
.trust{background:#fff;border-top:1px solid var(--vv-bd);border-bottom:1px solid var(--vv-bd);padding:18px 0;}
.tr{display:flex;gap:36px;align-items:center;justify-content:center;flex-wrap:wrap;max-width:1080px;margin:0 auto;padding:0 32px;}
.ti{font-size:.78rem;color:var(--vv-tx3);font-weight:600;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;}
.td{width:4px;height:4px;background:var(--vv-bd);border-radius:50%;}
.eye{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--vv-or);margin:0 0 10px;}
.h2{font-size:clamp(1.75rem,3.8vw,2.5rem);font-weight:800;letter-spacing:-.03em;color:var(--vv-tx);margin:0 0 14px;line-height:1.15;}
.h2 em{font-style:normal;color:var(--vv-or);}
.h2w{color:#fff;}
.lead{font-size:.97rem;color:var(--vv-tx2);line-height:1.7;max-width:560px;margin:0 0 44px;}
.pg{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-bottom:32px;}
@media(max-width:640px){.pg{grid-template-columns:1fr;}}
.pi{background:#fff;border:1px solid var(--vv-bd);border-radius:var(--vv-r);padding:20px 22px;display:flex;justify-content:space-between;align-items:center;gap:16px;transition:transform .15s,box-shadow .15s;}
.pi:hover{transform:translateY(-2px);box-shadow:var(--vv-sh);}
.pi-name{font-size:.92rem;font-weight:600;color:var(--vv-tx);}
.pi-note{font-size:.78rem;color:var(--vv-tx3);margin-top:3px;}
.pi-price{font-size:1.05rem;font-weight:800;color:var(--vv-or);white-space:nowrap;text-align:right;}
.pi-highlight{background:var(--vv-orl);border-color:var(--vv-orm);}
.ig{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
@media(max-width:760px){.ig{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.ig{grid-template-columns:1fr;}}
.icard{background:#fff;border:1px solid var(--vv-bd);border-radius:var(--vv-r);padding:20px;}
.icard-ico{font-size:1.4rem;margin-bottom:10px;}
.icard h4{font-size:.88rem;font-weight:700;color:var(--vv-tx);margin:0 0 6px;}
.icard p{font-size:.81rem;color:var(--vv-tx2);margin:0;line-height:1.55;}
.faq{max-width:720px;margin:0 auto;}
.fqi{border-bottom:1px solid var(--vv-bd);padding:18px 0;}
.fqi:last-child{border-bottom:none;}
.fqq{font-size:.95rem;font-weight:700;color:var(--vv-tx);margin:0 0 8px;}
.fqa{font-size:.88rem;color:var(--vv-tx2);line-height:1.65;margin:0;}
.ctac{max-width:600px;margin:0 auto;text-align:center;padding:0 20px;}
.ctac h2{font-size:clamp(1.75rem,4vw,2.5rem);font-weight:800;color:#fff;letter-spacing:-.03em;margin:0 0 14px;}
.ctac p{font-size:1rem;color:#a8a29e;margin:0 0 32px;line-height:1.6;}
.ca{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.bwa{display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#fff;padding:13px 26px;border-radius:10px;font-size:.93rem;font-weight:600;}
.bwa:hover{background:#22c55e;color:#fff;}
.bgh{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);color:#fff;padding:13px 26px;border-radius:10px;font-size:.93rem;font-weight:600;border:1.5px solid rgba(255,255,255,.2);}
.bgh:hover{background:rgba(255,255,255,.18);color:#fff;}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin:48px 0 0;}
@media(max-width:760px){.stats{grid-template-columns:repeat(2,1fr);}}
.stat-n{font-size:2rem;font-weight:800;color:var(--vv-tx);letter-spacing:-.03em;}
.stat-l{font-size:.78rem;color:var(--vv-tx3);margin-top:4px;}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
@media(max-width:900px){.cards{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.cards{grid-template-columns:1fr;}}
.card{background:#fff;border:1px solid var(--vv-bd);border-radius:var(--vv-r);padding:28px;transition:transform .15s,box-shadow .15s;}
.card:hover{transform:translateY(-3px);box-shadow:var(--vv-shl);}
.card-ico{font-size:1.6rem;margin-bottom:14px;}
.card h3{font-size:1rem;font-weight:700;color:var(--vv-tx);margin:0 0 8px;}
.card p{font-size:.85rem;color:var(--vv-tx2);line-height:1.6;margin:0;}
.card-price{font-size:.88rem;font-weight:700;color:var(--vv-or);margin-top:14px;}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;}
@media(max-width:760px){.two-col{grid-template-columns:1fr;gap:40px;}}
.step-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:20px;}
.step-item{display:flex;gap:16px;align-items:flex-start;}
.step-num{width:32px;height:32px;background:var(--vv-orl);border:1.5px solid var(--vv-orm);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:800;color:var(--vv-or);flex-shrink:0;}
.step-body h4{font-size:.92rem;font-weight:700;color:var(--vv-tx);margin:0 0 4px;}
.step-body p{font-size:.83rem;color:var(--vv-tx2);margin:0;line-height:1.55;}
```

### Google Font Link (add before the `<style>` block)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

---

## vv2 Page Structure — Standard Template

Every vv2 page follows this exact section sequence:

```
1. [HERO DARK]     → Dark bg #0c0a09, VIDS™ badge, H1 with <em> highlight, subtext, 2 CTAs, 4 stats
2. [TRUST STRIP]   → White bg, pipe-separated credentials (3,200+ consultations · 18+ years · etc.)
3. [SECTION .sf]   → White bg — main service/feature cards (3-column grid)
4. [SECTION .sw]   → Orange-tinted bg — VIDS™ methodology or differentiation
5. [SECTION .sf]   → White bg — process steps or pricing
6. [SECTION .sf]   → White bg — FAQ (5 Q&As with itemprop markup for schema auto-detection)
7. [DARK CTA]      → Dark bg, headline, WhatsApp + phone/email buttons
```

### Hero Section Pattern
```html
<div style="background:#0c0a09;padding:96px 0 72px;">
  <div class="hero" style="padding-top:0;padding-bottom:0;">
    <div class="badge"><i></i> VIDS™ Scientific Methodology</div>
    <h1>[Keyword-rich H1 with] <em>[Orange highlight word]</em></h1>
    <p class="sub">[Supporting text — 1-2 sentences, max 600px wide]</p>
    <div class="acts">
      <a href="https://wa.me/919739105574" class="bp">📱 WhatsApp Consultation</a>
      <a href="tel:+919739105574" class="bs" style="background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.15);color:#fff;">📞 Call +91 97391 05574</a>
    </div>
    <div class="stats">
      <div><div class="stat-n">3,200+</div><div class="stat-l">Consultations</div></div>
      <div><div class="stat-n">18+</div><div class="stat-l">Years Experience</div></div>
      <div><div class="stat-n">620+</div><div class="stat-l">Properties</div></div>
      <div><div class="stat-n">⭐ 5.0</div><div class="stat-l">Google Rating</div></div>
    </div>
  </div>
</div>
```

### Trust Strip Pattern
```html
<div class="trust">
  <div class="tr">
    <span class="ti">✓ Zero Demolition</span><span class="td"></span>
    <span class="ti">✓ VIDS™ Methodology</span><span class="td"></span>
    <span class="ti">✓ Lecher Antenna</span><span class="td"></span>
    <span class="ti">✓ Written Report</span><span class="td"></span>
    <span class="ti">✓ 18+ Years</span>
  </div>
</div>
```

### Card Pattern
```html
<div class="card">
  <div class="card-ico">🏢</div>
  <h3>Card Title</h3>
  <p>Card description — 2-3 lines max.</p>
  <div class="card-price">From ₹15,000</div>
</div>
```

### FAQ Section Pattern (must use itemprop for schema auto-detection)
```html
<section class="sf">
  <div class="w">
    <p class="eye">FAQ</p>
    <h2 class="h2">Common Questions About <em>[Topic]</em></h2>
    <div class="faq">
      <div class="fqi" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
        <p class="fqq" itemprop="name">Question text here?</p>
        <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
          <p class="fqa" itemprop="text">Answer text here.</p>
        </div>
      </div>
      <!-- repeat for 4 more questions -->
    </div>
  </div>
</section>
```

### Dark CTA Pattern
```html
<section class="sd">
  <div class="ctac">
    <h2 class="h2w">Ready to Transform Your Space?</h2>
    <p style="color:#a8a29e;font-size:1rem;margin:0 0 32px;">Book a consultation with Raghavendra Hebbur — India's leading scientific Vastu consultant.</p>
    <div class="ca">
      <a href="https://wa.me/919739105574" class="bwa">📱 WhatsApp Now</a>
      <a href="tel:+919739105574" class="bgh">📞 +91 97391 05574</a>
    </div>
  </div>
</section>
```

---

## Location Page Types & Content Rules

### Type 1: Bangalore Locality (e.g., Koramangala, HSR Layout, Whitefield)
- Hero: "Vastu Consultant in [Area], Bangalore"
- Services: Residential + Commercial focus
- Price cards: Apartment ₹15,000 · Villa ₹25,000 · Online ₹5,000
- 5 FAQ: local area + vastu combination questions
- Internal links to: /services, /vastu-consultation-fees, /vastu-consultant-bangalore

### Type 2: Industrial Area (e.g., Peenya, Bommasandra, Electronic City)
- Hero: "Industrial Vastu Consultant in [Area], Bangalore"
- Services: Factory, warehouse, manufacturing focus
- Price cards: Commercial ₹51,000+ · Online ₹5,000
- 5 FAQ: industrial vastu questions
- Internal links to: /industrial-vastu-bangalore, /vastu-consultation-fees

### Type 3: India City (e.g., Mumbai, Delhi, Chennai, Hyderabad)
- Hero: "Vastu Consultant in [City]"
- Services: Online + onsite on request
- Price cards: Online ₹5,000 · Onsite ₹30,000+travel
- 5 FAQ: city-specific + online vastu
- Internal links to: /online-vastu-consultation, /vastu-consultation-fees

### Type 4: International (e.g., Dubai, Singapore, USA, UK)
- Hero: "Vastu Consultant for [Country] — Online Scientific Vastu"
- Services: Online consultation only
- Price card: Online ₹5,000 (or USD equivalent)
- 5 FAQ: NRI vastu questions
- Internal links to: /online-vastu-consultation, /vastu-consultation-fees

---

## SEO Rules — Master Checklist (Google + Semrush + Ahrefs + Rank Math)

Every page generated must satisfy ALL of the following. This is the law — no exceptions.

---

### 🔴 TECHNICAL (Ahrefs Site Audit + Google Standards)

- [ ] **Zero 404 errors** — every URL must resolve
- [ ] **Zero redirect chains** — max 1 hop, direct to final URL
- [ ] **Canonical tag** — self-referencing `<link rel="canonical">`, no conflicts
- [ ] **robots.txt** — no accidental blocks on content pages
- [ ] **XML sitemap** — submitted to GSC, all live pages included
- [ ] **HTTPS on all pages** — no mixed content
- [ ] **Core Web Vitals** — LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] **Mobile rendering** — no horizontal scroll, tap targets ≥ 48px
- [ ] **No duplicate content** — canonical or noindex thin pages
- [ ] **Schema: valid, single source, no duplicate @types** — FAQPage guard is live in mu-plugin

---

### 🟡 ON-PAGE (Semrush On-Page Checker Standards)

- [ ] **Title**: 50–60 chars, primary keyword starts the title
  - Formula: `[Number] [Power Word] [Focus Keyword]: [Benefit]`
  - Example: `"7 Proven Vastu Remedies for Koramangala Homes: Restore Positive Energy"`
- [ ] **Meta description**: 150–160 chars, keyword + CTA + unique per page
  - Formula: Focus Keyword + question + solution
  - Example: `"Vastu consultant in Koramangala — worried about energy flow? Book a zero-demolition VIDS™ consultation from ₹15,000."`
- [ ] **H1**: Exact or close match to primary keyword, ONE per page
- [ ] **H2–H4**: Semantic keywords, logical hierarchy — at least one H2 must contain the exact focus keyword
- [ ] **URL**: Short, hyphenated, keyword-only, no stop words
- [ ] **Primary keyword in first 100 words** (within the first 2 sentences)
- [ ] **Keyword density**: 1–2% — natural, no stuffing (7–8 mentions per 1,500 words)
- [ ] **LSI / semantic keywords**: 8–12 related terms per page (e.g., "vastu shastra", "energy zones", "zero demolition", "Lecher antenna", "16-zone analysis")
- [ ] **Word count**: ≥ 1,500 words minimum; target 1,800–2,200 for competitive vastu topics
- [ ] **Internal links**: minimum 5 per page, varied anchor text
- [ ] **Outbound link**: 1–2 authoritative sources (Wikipedia Vastu Shastra, Govt of India cultural heritage, IIT research)
- [ ] **Images**: every image has descriptive alt text with focus keyword
- [ ] **Images compressed**: WebP format, under 100KB each

---

### 🟢 CONTENT / E-E-A-T (Google Helpful Content + Quality Rater Guidelines)

- [ ] **Experience signals**: First-person case studies or specific client outcomes (real, named if possible)
- [ ] **Expertise**: Credentials and certifications visible on or linked from the page
- [ ] **Authority**: Named author (Raghavendra Hebbur) with bio + photo on content pages
- [ ] **Trust**: Business address, phone (+91 97391 05574), Google review count (248 reviews, 5★) visible
- [ ] **FAQ section**: Minimum 5 questions targeting "People Also Ask" — must use `itemprop` markup
- [ ] **Content depth**: Covers topic better than top 3 ranking pages — no generic filler
- [ ] **Readability**: Short paragraphs (2–3 sentences max), subheadings every 200 words
- [ ] **No AI-fluff**: Specific numbers, named places, real client outcomes — zero generic padding
- [ ] **Updated date**: Visible on all content/blog pages

---

### 🔵 LOCAL SEO (Google Business Profile + Ahrefs Local)

- [ ] **NAP consistent**: Exact same Name, Address, Phone on every page
  - Name: Vardhini Vastu
  - Phone: +91 97391 05574
  - Address: Bangalore, Karnataka, India
- [ ] **LocalBusiness schema on ALL pages** — handled by `vv-schema-elite.php` mu-plugin (already live)
- [ ] **City name in title, H1, first paragraph** on every location page
- [ ] **Google Maps embed** on contact + location pages
  - Embed URL: `https://maps.google.com/maps?q=Vardhini+Vastu+Bangalore&t=&z=14&ie=UTF8&iwloc=&output=embed`
- [ ] **Local testimonials with area names** — mention real Bangalore areas (Whitefield, Koramangala, HSR Layout, etc.)
- [ ] **Service area pages**: each neighbourhood gets its own optimised page (150+ location pages — in progress)
- [ ] **GBP categories match site services** — Scientific Vastu, Vastu Shastra, Energy Consultant

---

### 🟣 OPEN GRAPH / SOCIAL

- [ ] **og:title** — unique per page, matches SEO title
- [ ] **og:description** — unique per page, matches meta description
- [ ] **og:image** — 1200×630px, exists, loads fast (< 100KB)
- [ ] **twitter:card** — set to `summary_large_image`
- [ ] **og:url** — must match canonical URL exactly

Add Open Graph meta to the `<head>` of every page using this pattern:
```html
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="[PAGE TITLE]" />
<meta property="og:description" content="[META DESCRIPTION]" />
<meta property="og:url" content="https://vardhinivastu.in/[slug]/" />
<meta property="og:image" content="https://vardhinivastu.in/wp-content/uploads/vardhini-vastu-og.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[PAGE TITLE]" />
<meta name="twitter:description" content="[META DESCRIPTION]" />
<meta name="twitter:image" content="https://vardhinivastu.in/wp-content/uploads/vardhini-vastu-og.jpg" />
```

> **Note**: WordPress + Rank Math handles og: tags automatically for pages where Rank Math meta is set. Only add manually if Rank Math is not covering the page.

---

### Rank Math Score Gate
Every page must hit **90+ Rank Math score** before being considered complete:
1. Title formula: `[Number] [Power Word] [Focus Keyword]: [Benefit]`
2. Meta description: Focus Keyword + question + solution (150–160 chars)
3. Focus keyword in first 2 sentences
4. At least one H2 contains exact focus keyword
5. Keyword density 0.5–1%
6. Content ≥ 1,500 words
7. Image alt text contains focus keyword
8. Internal links to 2–3 related pages
9. External DoFollow to authoritative source

---

## AEO — Answer Engine Optimization (2026 Standards)

AEO = getting cited by ChatGPT, Perplexity, Google AI Mode, Copilot when users ask questions.

### Rules
- [ ] **Direct answer first**: First 40–60 words of every section must directly answer the section heading — no preamble
- [ ] **Inverted pyramid**: Most important answer first, supporting detail after — not a build-up
- [ ] **Question-based H2/H3**: Convert headings to questions that mirror how users actually ask (e.g., "What Does a Vastu Consultant Do?" not "Our Services")
- [ ] **FAQ minimum 5 Q&A**: Target Google's "People Also Ask" box — use exact question phrasing from PAA
- [ ] **Lists in 78% of answers**: Format answers as numbered or bulleted lists wherever possible — AI extracts lists most often
- [ ] **Passage length 100–300 words**: Optimal for AI citation (62% of cited content is 100–300 word passages); avoid very long unbroken paragraphs
- [ ] **Structured data**: FAQPage, Speakable, Author, LocalBusiness schema — all active (FAQPage auto-injected by mu-plugin)
- [ ] **Brand mentions off-site**: Build brand citations on Google Maps, Justdial, Sulekha, Indian real estate forums, NRI communities

---

## GEO — Generative Engine Optimization (2026 Standards)

GEO = your pages are retrieved and cited by AI engines as authoritative sources.

### Rules
- [ ] **AI crawler access**: Ensure `robots.txt` does NOT block: `GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`, `Amazonbot`, `anthropic-ai`
- [ ] **Content freshness**: Add visible "Last Updated: [Month Year]" to all content pages — AI engines weight recency
- [ ] **Factual density**: Every 200-word block must contain ≥2 specific facts (numbers, years, locations, named tools, named certifications)
- [ ] **Entity density**: ≥15 named entities per page (people, places, tools, certifications, methods) — pages with 15+ entities have 4.8× higher AI citation probability
- [ ] **Source citations in content**: Link out to 1–2 authoritative sources per page (Wikipedia Vastu Shastra, academic research, government cultural heritage)
- [ ] **Original statistics**: Include Vardhini Vastu's own data (3,200+ consultations, 620+ properties, 18 years) — proprietary data gets cited more
- [ ] **Information gain**: Every page must say something the top 3 competitors don't — unique methodology (VIDS™), specific client outcomes, Lecher Antenna data
- [ ] **Semantic completeness**: Cover all subtopics of the main keyword (AI breaks queries into sub-topics; cover them all in H2/H3)
- [ ] **llms.txt file**: Create `/llms.txt` at domain root describing the site structure and key pages for AI crawlers (Note: Google doesn't require it, but ChatGPT/Perplexity/Claude use it)

---

## AIO — Google AI Overviews Optimization (2026 Standards)

AIO = appearing inside Google's AI-generated answer box (shown on ~50% of all searches, 2B users/month).

### Rules
- [ ] **Semantic completeness score**: Content must cover the topic deeply enough to score 8.5+/10 on semantic completeness — 4.2× more likely to be cited
- [ ] **Self-contained answer blocks**: Each H2 section must be understandable in isolation — AI extracts passages, not full pages
- [ ] **E-E-A-T mandatory**: 96% of AI Overview citations come from sources with strong E-E-A-T. Named author + credentials + experience signals are non-negotiable
- [ ] **Structured data**: FAQPage and Speakable schema are primary triggers for AI Overview inclusion
- [ ] **Crawlable & indexed**: Page must be indexed in Google Search — run URL Inspection in GSC regularly
- [ ] **People-first content**: Do not write for AI — write for humans, and AI will follow (Google's official guidance)
- [ ] **No duplicate AI content**: Do not simply recycle existing internet content — Google detects and deprioritises it
- [ ] **Google Business Profile**: Keep GBP updated — Google pulls local business data directly from GBP for AI Overviews in local queries
- [ ] **Track AI Overview appearance**: Use Semrush AI Toolkit or manual Google searches to check if pages appear in AI Overviews

---

## GRO — Generative Results Optimization (2026 Standards)

GRO = holistic strategy to maximise brand presence across all AI-generated results (Google AIO + ChatGPT + Perplexity + Copilot + Gemini).

### Rules
- [ ] **Mention Rate tracking**: Regularly query top 5 AI engines ("best vastu consultant bangalore", "vastu consultant online india") — track if Vardhini Vastu is named
- [ ] **Citation Rate tracking**: Check if AI answers link back to vardhinivastu.in — cited pages earn 35% more organic clicks
- [ ] **Brand consistency**: Exact same brand name, description, and key facts across the site, GBP, Wikipedia, Justdial, LinkedIn — AI builds its entity model from multiple sources
- [ ] **Topical authority**: Own a topic cluster, not just keywords — create content covering the full Vastu topic (residential, commercial, industrial, zones, remedies, methods) so AI treats you as THE authority
- [ ] **Consistent NAP everywhere**: Google reconciles NAP signals across directories when answering "vastu consultant near me"
- [ ] **Schema graph completeness**: Person + LocalBusiness + Service + FAQ + Breadcrumb all interlinked via @id references (handled by mu-plugin)
- [ ] **Content update cadence**: Refresh key pages every 3–6 months with new data, case studies, or stats to maintain freshness signals

---

## Robots.txt Requirements (AI Crawlers)

Current `robots.txt` must explicitly ALLOW these bots (or not block them):
```
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Applebot
Allow: /
```

---

## Writing Style Rules (AEO + GEO Combined)

Every paragraph written for vardhinivastu.in must follow:
1. **Open with the answer** — not context
2. **One idea per paragraph** — 2–3 sentences max
3. **Specific over vague** — "₹15,000 for a Bangalore apartment" not "affordable fees"
4. **Named entities** — "Raghavendra Hebbur", "VIDS™", "Lecher Antenna", "Koramangala", "HSR Layout"
5. **Active voice** — "Raghavendra visits your property" not "A site visit is conducted"
6. **Numbers anchor credibility** — use them in every section (3,200+, 18 years, 16 zones, 48 hours)

---

## Canonical Prices (never deviate)
- Online (anywhere): ₹5,000
- Bangalore Apartment/Row House: ₹15,000
- Bangalore Villa/Independent House: ₹25,000
- Outside Bangalore Apartment: ₹21,000 (+travel)
- Outside Bangalore Villa/House: ₹30,000 (+travel)
- Commercial/Industrial: ₹51,000+
- Pre-Purchase Plot Report: ₹5,000

---

## What Is VIDS™?
VIDS™ (Vastu Integral Diagnostic System) is Raghavendra Hebbur's proprietary methodology:
- **V** — Vastu Shastra (classical 16-zone analysis, compass-accurate)
- **I** — Instrumentation (Lecher Antenna, geopathic stress detector)
- **D** — Diagnosis (zone-by-zone energy mapping, blockage identification)
- **S** — Solutions (zero-demolition remedies: colour, furniture, yantras, crystals)

Always feature VIDS™ prominently. It is the key differentiator.

---

## What NOT to Do
- Never mention Astrology, Numerology, or Feng Shui as services offered
- Never use prices other than the canonical prices above
- Never use wrong email addresses (only Info@vardhinivastu.in for display)
- Never output lorem ipsum or placeholder text — all content must be real and specific
- Never skip the FAQ section — it powers FAQPage schema auto-detection
- Never forget the trust strip — it anchors credibility above the fold

---

## Skills to Use for This Project

From the ECC skill library now installed, the following are most relevant:

| Task | Skill |
|------|-------|
| Build service/landing pages | `/feature-dev` + inline execution |
| Batch location pages | `/prp-plan` → `/prp-implement` |
| SEO check each page | `/seo page https://vardhinivastu.in/[slug]/` |
| Schema validation | `/seo schema https://vardhinivastu.in/[slug]/` |
| Content quality check | `/seo content https://vardhinivastu.in/[slug]/` |
| Full site audit | `/seo audit https://vardhinivastu.in` |
| Review generated code | `/code-review` |
| Security check | `/security-scan` |

---

## WordPress Page IDs Quick Reference

| ID | Slug | Status |
|----|------|--------|
| 1052 | home | ✅ vv2 done |
| 1054 | about | ✅ vv2 done |
| 1055 | contact | ✅ vv2 done |
| 1056 | services | ✅ vv2 done |
| 1057 | vastu-consultation-fees | ✅ vv2 done |
| 1058 | commercial-vastu | ❌ needs vv2 |
| 1059 | industrial-vastu-bangalore | ❌ needs vv2 |
| 1060 | online-vastu-consultation | ❌ needs vv2 |
| 1061 | pre-purchase-vastu | ❌ needs vv2 |
| 1062 | lecher-antenna-geopathic-stress | ❌ needs vv2 |
| 1063 | testimonials | ❌ needs vv2 |
| 1064 | credentials | ❌ needs vv2 |
| 1245 | vastu-for-home | ❌ needs vv2 |
| 1315 | in (India) | ❌ needs vv2 |
| 1316 | best-vastu-consultant-bangalore | ❌ needs vv2 |
| 1317 | best-vastu-consultant-india | ❌ needs vv2 |
| 1065–1215 | vastu-consultant-* (150+ pages) | ❌ needs vv2 |

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
| ------ | ---------- |
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
