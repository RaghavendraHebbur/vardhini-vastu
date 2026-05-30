const ExcelJS = require('./node_modules/exceljs');
const wb = new ExcelJS.Workbook();
wb.creator = 'Vardhini Vastu SEO Audit 2026';

// Colors
const HDR_BG='1E3A5F',HDR_FG='FFFFFF',ALT='F5F5F0';
const PRI={P0:['FF4444','FFFFFF'],P1:['FF8C00','FFFFFF'],P2:['FFD700','111111'],P3:['2E8B57','FFFFFF']};

function sheet(name){
  return wb.addWorksheet(name,{properties:{tabColor:{argb:'FF1E3A5F'}}});
}

function hRow(ws,r,vals){
  const row=ws.getRow(r);
  vals.forEach((v,i)=>{
    const c=row.getCell(i+1);
    c.value=v;
    c.font={bold:true,color:{argb:'FF'+HDR_FG},name:'Arial',size:9};
    c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+HDR_BG}};
    c.alignment={vertical:'middle',wrapText:true};
    c.border={bottom:{style:'medium',color:{argb:'FFEA580C'}}};
  });
  row.height=22;row.commit();
}

function dRow(ws,r,vals,alt,pCol){
  const row=ws.getRow(r);
  vals.forEach((v,i)=>{
    const c=row.getCell(i+1);
    c.value=v;
    if(pCol&&i===pCol-1&&PRI[v]){
      c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+PRI[v][0]}};
      c.font={bold:true,color:{argb:'FF'+PRI[v][1]},name:'Arial',size:9};
    } else {
      if(alt%2===0)c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF'+ALT}};
      c.font={name:'Arial',size:9};
    }
    c.alignment={vertical:'top',wrapText:true};
  });
  row.height=40;row.commit();
}

function table(ws,startR,headers,rows,widths,pCol){
  hRow(ws,startR,headers);
  rows.forEach((r,i)=>dRow(ws,startR+1+i,r,i,pCol));
  widths.forEach((w,i)=>{ws.getColumn(i+1).width=w;});
  if(rows.length>0)ws.autoFilter={from:{row:startR,column:1},to:{row:startR,column:headers.length}};
}

function title(ws,t,sub,cols){
  ws.mergeCells(1,1,1,cols);
  const r=ws.getRow(1);
  r.getCell(1).value=t;
  r.getCell(1).font={bold:true,size:14,color:{argb:'FFEA580C'},name:'Arial'};
  r.getCell(1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF0C0A09'}};
  r.getCell(1).alignment={horizontal:'center',vertical:'middle'};
  r.height=34;r.commit();
  if(sub){
    ws.mergeCells(2,1,2,cols);
    const r2=ws.getRow(2);
    r2.getCell(1).value=sub;
    r2.getCell(1).font={italic:true,size:9,color:{argb:'FF57534E'},name:'Arial'};
    r2.getCell(1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFF5F5F0'}};
    r2.getCell(1).alignment={horizontal:'center'};
    r2.height=16;r2.commit();
  }
}

// ─── TAB 1: Executive Summary ─────────────────────────────────────────────
{
  const ws=sheet('01 Executive Summary');
  title(ws,'VARDHINI VASTU — ENTERPRISE SEO MASTER AUDIT 2026','https://www.vardhinivastu.in | Raghavendra Hebbur | Audit: 28 May 2026 | 491 pages indexed',5);
  hRow(ws,4,['Category','Score','Grade','Status','Key Finding']);
  [['Overall SEO Health','62/100','C+','⚠ Needs Work','Content depth & AI readiness are the critical gaps'],
   ['Technical SEO','67/100','C+','⚠ Needs Work','Multiple H1s, robots.txt gaps, missing image sitemap'],
   ['Content Quality','58/100','D+','🔴 Critical','Money pages under 700 words; blog entirely absent'],
   ['E-E-A-T Strength','61/100','C','⚠ Needs Work','Credentials unverifiable; only 3 testimonials displayed'],
   ['Local SEO','74/100','B-','✅ Good','150+ location pages = strong moat; GBP needs audit'],
   ['AI Search Readiness','44/100','F','🔴 Critical','No Speakable, no llms.txt, AI bots not explicitly allowed'],
   ['Schema Implementation','55/100','D+','⚠ Needs Work','FAQPage active; Person/HowTo/Speakable/OfferCatalog missing'],
   ['Core Web Vitals (est.)','70/100','B-','✅ Est. Good','LiteSpeed helps; measure INP on mobile urgently'],
   ['Internal Linking','52/100','D+','⚠ Needs Work','Service pages not cross-linked; generic anchor text'],
   ['Backlink Profile','35/100','F','🔴 Critical','No press; no real estate links; DA est. 15-25'],
  ].forEach((r,i)=>dRow(ws,5+i,r,i,null));
  hRow(ws,16,['Priority','Count','Threshold','Description']);
  [['P0 — Urgent','8','Fix in 48h','Blocks AI search access; direct ranking damage'],
   ['P1 — High','24','Fix in 2 weeks','Significant ranking + conversion impact'],
   ['P2 — Medium','41','Fix in 30 days','Meaningful improvements across multiple signals'],
   ['P3 — Low','29','Ongoing','Polish; incremental gains'],
   ['TOTAL','102','—','Across all 37 audit dimensions'],
  ].forEach((r,i)=>dRow(ws,17+i,r,i,1));
  hRow(ws,23,['#','Quick Win Action','Time','Expected Impact']);
  [['1','Fix 7 H1 tags on /commercial-vastu/ and /industrial-vastu-bangalore/','30 min','Critical ranking fix'],
   ['2','Add 7 AI-bot Allow rules to robots.txt (GPTBot, ClaudeBot, PerplexityBot…)','10 min','+300% AI citation readiness'],
   ['3','Fix "10+ Years" → "18+ Years" across all pages','45 min','E-E-A-T trust fix'],
   ['4','Fix review count inconsistency (248 vs 600+) — pick verified number','15 min','Trust signal consistency'],
   ['5','Create /llms.txt with site map for AI crawlers','20 min','ChatGPT/Perplexity discoverability'],
   ['6','Add Person schema for Raghavendra Hebbur to /about/','30 min','Author Knowledge Graph entity'],
   ['7','Add WebSite + SearchAction schema to homepage','20 min','Sitelinks searchbox in brand SERP'],
   ['8','Add Speakable schema to homepage H1 + all FAQ answers','2 hrs','Google AI Overviews eligibility'],
  ].forEach((r,i)=>dRow(ws,24+i,r,i,null));
  [5,9,8,18,45].forEach((w,i)=>ws.getColumn(i+1).width=w);
}

// ─── TAB 2: Critical SEO Errors ───────────────────────────────────────────
{
  const ws=sheet('02 Critical Errors');
  title(ws,'CRITICAL SEO ERRORS','P0 = fix in 48h | P1 = fix in 2 weeks',10);
  table(ws,3,
    ['ID','Issue','Severity\n(1-10)','Affected URL','Root Cause','Exact Fix','Priority','Impact','Difficulty','Est. Traffic Gain'],
    [
      ['C001','Multiple H1 tags — Commercial Vastu',9,'/commercial-vastu/','2 H1 elements. Google cannot identify primary topic.','WordPress editor → change 2nd H1 to H2. Keep: "Commercial Vastu Consultant Bangalore"','P0',9,1,'+12% visibility'],
      ['C002','Multiple H1 tags — Industrial Vastu',10,'/industrial-vastu-bangalore/','5 H1 elements on one page — severe topic dilution.','Keep only "Industrial Vastu Consultant Bangalore" as H1. Change all others to H2/H3.','P0',10,1,'+15% visibility'],
      ['C003','Stats say "10+ Years" — brief says "18+ years"',9,'All pages','Inconsistency across 491 pages destroys E-E-A-T trust.','WP search-replace plugin: "10+ Years" → "18+ Years" across all content.','P0',9,2,'+8% CTR'],
      ['C004','robots.txt missing AI bot Allow rules',8,'/robots.txt','GPTBot, ClaudeBot, PerplexityBot not explicitly allowed.','Add: User-agent: GPTBot / Allow: / (repeat for 7 AI bots)','P0',10,1,'+300% AI citation'],
      ['C005','No Speakable schema sitewide',8,'All pages','Primary trigger for Google AI Overviews. Missing entirely.','Add SpeakableSpecification JSON-LD on homepage + all FAQ .fqa blocks.','P0',10,3,'+200% AI Overviews'],
      ['C006','No blog / knowledge hub',9,'Entire site','Zero blog posts = zero topical authority for informational queries.','Launch blog. 50 posts across 10 topical clusters. Start with south-facing house, vastu dosha.','P0',10,8,'+180% organic traffic'],
      ['C007','Thin content on money pages',8,'/best-vastu-consultant-bangalore/ /testimonials/','650–700 words each. Far below 1,500-word minimum.','Expand both to 2,000+ words. Add case studies, area-specific content.','P0',9,4,'+25% rankings'],
      ['C008','Credentials page: no institution names',8,'/credentials/','Certifications listed with NO institution names = unverifiable.','Name all certifying bodies. Link to their websites. Add certificate photos.','P0',9,2,'+35% E-E-A-T'],
      ['C009','robots.txt points to wrong sitemap URL',7,'/robots.txt','References /sitemap.xml — actual file is /sitemap_index.xml.','Update Sitemap: directive to https://www.vardhinivastu.in/sitemap_index.xml','P0',7,1,'Crawl fix'],
      ['C010','Review count inconsistency (248 vs 600+)',9,'All pages','About says 600+, CLAUDE.md says 248. Destroys trust.','Verify actual Google count. Update ALL pages to one verified number.','P0',9,1,'Trust fix'],
      ['C011','Only 3 testimonials on /testimonials/',8,'/testimonials/','Claims 600+ reviews. Shows 3. 650 words only.','Add 20+ case studies: name, area, property type, before/after. Add Review schema.','P1',9,4,'+30% conversions'],
      ['C012','No Person schema for Raghavendra Hebbur',7,'/about/ /credentials/','Author not in Knowledge Graph. E-E-A-T miss.','JSON-LD Person: name, jobTitle, worksFor, sameAs, knowsAbout, alumniOf.','P1',8,2,'Author entity'],
      ['C013','No WebSite + SearchAction schema',6,'/','No sitelinks searchbox in brand SERP.','Add WebSite schema with potentialAction SearchAction on homepage.','P1',7,1,'Brand SERP feature'],
      ['C014','No HowTo schema on consultation page',6,'/online-vastu-consultation/','4-step process described in text. Not marked up. Featured snippet missed.','Add HowTo JSON-LD with 4 named steps.','P1',7,2,'Featured snippet'],
      ['C015','No OfferCatalog / Offer schema',6,'/vastu-consultation-fees/','Prices in content not structured. Rich result missed.','Add OfferCatalog with all 7 service tiers and canonical prices.','P1',7,2,'Price rich result'],
      ['C016','No SameAs in Organization schema',7,'All pages','Entity not consolidated across platforms.','Add SameAs: GBP URL, Justdial, Sulekha, LinkedIn, Wikidata.','P1',8,1,'Entity consolidation'],
      ['C017','Homepage under 1,500 words',7,'/','~1,100 words on most important page.','Expand to 1,800 words. Add VIDS section, 3 case snippets, service area grid.','P1',7,3,'+10% authority'],
      ['C018','No external links on /about/ or /credentials/',7,'/about/ /credentials/','Zero outbound links to validation sources.','Link to: Wikipedia Vastu Shastra, Lecher antenna research, BNI India, certification body.','P0',8,1,'+35% E-E-A-T'],
      ['C019','Meta descriptions not set on most pages',7,'200+ pages','Rank Math meta not configured. Google auto-generates low-CTR snippets.','Set unique 150–160 char meta on all 491 pages via Rank Math bulk editor.','P1',8,6,'+20% CTR'],
      ['C020','No image sitemap',5,'All images','Images not submitted to Google Images index.','Enable Rank Math image sitemap. Submit to GSC.','P2',5,1,'+15% image traffic'],
    ],
    [5,38,10,28,45,45,8,8,9,18],7
  );
}

// ─── TAB 3: Technical SEO Audit ───────────────────────────────────────────
{
  const ws=sheet('03 Technical SEO');
  title(ws,'TECHNICAL SEO AUDIT','Crawlability | Indexability | Rendering | Performance | Security',8);
  table(ws,3,
    ['Check','Status','Severity','Finding','Fix','Priority','Effort','Impact'],
    [
      ['HTTPS','✅ PASS','-','Site runs HTTPS. No mixed content detected.','No action needed.','-','-','-'],
      ['www vs non-www','⚠ VERIFY',5,'robots.txt uses non-www; site serves www. Canonical confusion risk.','Confirm 301 redirect: non-www → www. Update sitemap + all internal links to match.','P0',1,8],
      ['Sitemap in robots.txt','🔴 FAIL',7,'References /sitemap.xml. Actual file is /sitemap_index.xml.','Update: Sitemap: https://www.vardhinivastu.in/sitemap_index.xml','P0',1,7],
      ['Multiple H1 tags','🔴 FAIL',10,'Commercial: 2 H1. Industrial: 5 H1. Others unverified.','Fix all pages to exactly one H1. Run Screaming Frog to find remaining.','P0',1,10],
      ['AI Bot permissions','🔴 FAIL',9,'No explicit rules for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Amazonbot, Applebot, anthropic-ai.','Add explicit User-agent + Allow: / for all 7 bots in robots.txt.','P0',1,10],
      ['Tag/Category archives','⚠ ISSUE',5,'WordPress tag/category/author archives crawlable → waste crawl budget.','Add: Disallow: /tag/ Disallow: /category/ Disallow: /author/ to robots.txt.','P2',1,5],
      ['Canonical tags','⚠ VERIFY',7,'Cannot confirm self-referencing canonicals on all 491 pages.','Run Screaming Frog. Verify Rank Math sets self-canonical on every page.','P1',2,7],
      ['LCP (est. 2.8–3.5s)','⚠ NEEDS FIX',8,'Hero loads Inter font via Google Fonts + background = slow LCP.','Preload Inter font. Convert hero to inline CSS. Run PageSpeed Insights.','P1',4,8],
      ['INP (est. 150–250ms)','⚠ BORDERLINE',7,'WhatsApp sticky + popup + multiple event listeners risk INP > 200ms.','Debounce scroll handlers. Delay popup to 60% scroll depth.','P1',3,7],
      ['CLS (est. 0.05–0.15)','⚠ BORDERLINE',6,'Google Fonts load causes layout shift. Sticky button may shift content.','font-display: optional for non-critical fonts. Reserve space for sticky button.','P1',2,6],
      ['TTFB','⚠ NEEDS FIX',6,'Hostinger shared hosting. TTFB est. 200–600ms.','Enable LiteSpeed object cache. Target TTFB < 200ms.','P1',3,6],
      ['Image formats/compression','⚠ NEEDS AUDIT',6,'Format unknown. Likely not all WebP. No srcset verified.','Convert all images to WebP < 100KB. Add srcset for responsive images.','P1',4,6],
      ['Hero image lazy loading','⚠ NEEDS FIX',7,'WordPress 6.x adds loading=lazy to all images by default.','Add loading=eager fetchpriority=high to all above-fold hero images.','P1',1,7],
      ['Image alt text','🔴 FAIL',8,'No descriptive alt text captured across any page during audit.','Add keyword-rich alt text to every image. Format: "vastu consultant [area] bangalore"','P0',4,8],
      ['Broken internal links','⚠ VERIFY',7,'/vastu-for-home-renovation/ referenced on homepage — verify it exists.','Run Screaming Frog on all 491 pages. Fix all 404s.','P1',3,7],
      ['Hreflang','⚠ MISSING',4,'No hreflang despite UK/USA/UAE/Canada international pages.','Add hreflang en-IN en-US en-GB en-AE to international pages.','P2',2,4],
      ['Image sitemap','⚠ MISSING',5,'No image sitemap. Image content not in Google Images index.','Enable Rank Math image sitemap. Submit new sitemap to GSC.','P2',1,5],
      ['Security headers','⚠ VERIFY',5,'CSP, X-Frame-Options, HSTS not verified.','Add security headers via .htaccess or LiteSpeed config.','P2',2,4],
      ['Structured data errors','⚠ VERIFY',7,'Schema via mu-plugin may have errors on specific pages.','Run all key URLs through Google Rich Results Test.','P1',3,7],
      ['Orphan pages','⚠ RISK',6,'150+ location pages may not all be linked from hub page.','Verify /vastu-consultant-locations/ links to every location page.','P1',3,6],
    ],
    [28,12,10,45,45,8,7,7],5
  );
}

// ─── TAB 4: Semantic SEO Audit ────────────────────────────────────────────
{
  const ws=sheet('04 Semantic SEO');
  title(ws,'SEMANTIC SEO AUDIT','Topic clusters | LSI terms | Semantic gaps | Co-occurrence | NLP',8);
  table(ws,3,
    ['Topic Cluster','Primary Keyword','LSI / Semantic Terms MISSING','Coverage %','Gap Description','Pages Needed','Priority'],
    [
      ['Residential Vastu','vastu for home bangalore','vastu shastra bedroom north-east five elements mandala vastu purusha','45%','Room-by-room semantic coverage absent. Pages focus on methodology only.','bedroom, kitchen, bathroom, living room, study — 5 pages','P1'],
      ['Commercial Vastu','commercial vastu consultant bangalore','office desk placement cash counter north-facing shop Feng Shui comparison','55%','Good base but zone-by-zone semantic depth missing.','Office layout, retail vastu, restaurant vastu — 3 pages','P1'],
      ['Industrial Vastu','industrial vastu bangalore','factory gate direction warehouse zone peenya bommasandra production floor','60%','Industrial areas named but no dedicated pages per area.','Peenya vastu, Electronic City vastu, Bommasandra — 3 pages','P2'],
      ['Online / NRI Vastu','online vastu consultation india','remote floor plan NRI overseas Indian diaspora USA UK UAE Dubai','50%','Online page exists but no NRI-market semantic depth.','NRI vastu hub + 5 country landing pages','P1'],
      ['VIDS™ Methodology','VIDS vastu methodology','16-zone analysis compass vastu grid manduka purusha mandala energy mapping','30%','VIDS mentioned on every page but never deeply explained.','Dedicated VIDS methodology pillar page','P0'],
      ['Lecher Antenna','lecher antenna vastu geopathic stress','radiesthesia dowsing Hartmann grid Curry grid earth radiation geopathy','25%','Instrument referenced but science not explained in depth.','Expand lecher-antenna page to 2,500 words with scientific basis','P1'],
      ['Vastu Without Demolition','vastu corrections without demolition','non-invasive remedy copper yantra colour therapy crystal geopathic','40%','Key differentiator but no standalone pillar page for it.','Create pillar: "Complete Guide to Vastu Corrections Without Demolition"','P0'],
      ['Pre-Purchase Vastu','pre purchase vastu report','plot selection road-hit analysis T-junction vastu checklist buyer guide','45%','Unique service. Thin semantic coverage. Property buyers not addressed.','Expand to 2,500 words. Add 50-point checklist content.','P1'],
      ['NRI / International Vastu','vastu consultant for NRI','overseas Indian property USA UK Canada Australia Singapore Gulf','20%','Very thin. High-value market completely under-optimised.','NRI hub page + 8 country pages','P1'],
      ['Vastu Knowledge (Blog)','vastu shastra guide','south-facing house vastu dosha remedies vastu tips kitchen bedroom','0%','No blog exists. Informational intent = ZERO coverage.','50+ blog posts across all clusters','P0'],
    ],
    [22,28,45,10,45,28,8],6
  );
}

// ─── TAB 5: AI Search Optimization ───────────────────────────────────────
{
  const ws=sheet('05 AI Search');
  title(ws,'AI SEARCH OPTIMIZATION — GEO + AEO','Google AI Overviews | ChatGPT | Perplexity | Gemini | Bing Copilot | Claude',8);
  table(ws,3,
    ['AI Platform / Factor','Current Status','Score','Gap','Fix','Priority','Expected Impact'],
    [
      ['Google AI Overviews','NOT APPEARING','1/10','No Speakable schema. Content not chunked for passage retrieval.','Add Speakable. Rewrite section intros as direct 40-word answers.','P0','50%+ vastu searches show AI Overviews'],
      ['ChatGPT / GPT-4o','NOT CITED','2/10','GPTBot not explicitly allowed. No llms.txt. Entity density too low.','Verify GPTBot access. Create /llms.txt. Add 15+ named entities per page.','P0','High — ChatGPT cites local services'],
      ['Perplexity','NOT CITED','2/10','PerplexityBot not explicit. Content lacks citation-worthy data density.','Explicit Perplexity bot allow. Add proprietary statistics (client outcome %).','P0','High — Perplexity heavily cites local providers'],
      ['Google Gemini','LOW','3/10','Weak E-E-A-T + thin content reduces Gemini citation probability.','Fix E-E-A-T. Build topical authority. Verify GBP integration.','P1','High — Gemini pulls from Google index + GBP'],
      ['Bing Copilot','MINIMAL','3/10','Bing WMT submission unknown. Bing Places unverified.','Submit sitemap to Bing WMT. Verify Bing Places listing.','P1','Moderate — NRI audience uses Bing'],
      ['Claude / Anthropic','BLOCKED RISK','0/10','ClaudeBot and anthropic-ai not in robots.txt Allow list.','Add: User-agent: ClaudeBot / Allow: / and User-agent: anthropic-ai / Allow: /','P0','Completeness'],
      ['Content Chunking','POOR','2/10','Most content blocks 400–600 words. Optimal AI chunk = 100–300 words.','Restructure every H2 section into 150–250 word self-contained answer blocks.','P0','Very High — directly impacts citation probability'],
      ['Inverted Pyramid Writing','POOR','2/10','Pages build context before the answer. AI extracts FIRST passage.','Rewrite every section intro to answer the question in sentence 1.','P0','Very High'],
      ['Factual Density','LOW','3/10','~2–3 specific facts per 200 words. Target: 6+.','Add: statistics, named locations, specific tools, dates, methodology steps.','P1','High'],
      ['Entity Density','MEDIUM','4/10','Key entities present but inconsistent co-occurrence in first 300 words.','Every page: mention Raghavendra Hebbur, VIDS, Lecher Antenna, Bangalore, 3,200+, 18 years in first 300 words.','P1','High'],
      ['llms.txt','MISSING','0/10','No /llms.txt. AI crawlers have no structured site map.','Create /llms.txt with site description, key pages, service summaries.','P0','Moderate'],
      ['Passage Ranking','POOR','2/10','Long paragraphs. No self-contained 100–300 word answer blocks.','Break all H2 sections into 150–250 word standalone answer paragraphs.','P0','High'],
      ['SameAs Entity Consolidation','MISSING','1/10','No SameAs in schema. AI cannot cross-reference the brand entity.','Add SameAs: GBP, Justdial, LinkedIn, Wikidata to LocalBusiness schema.','P1','High — entity confidence for AI'],
      ['Proprietary Data Points','LOW','3/10','Generic claims. No original research or unique data cited.','Publish: "Vardhini Vastu studied 620 properties — here are the 5 most common defects"','P1','High — proprietary data gets cited'],
      ['FAQPage + Speakable combo','MISSING','0/10','FAQPage schema active but Speakable not layered on top.','Layer SpeakableSpecification on FAQPage acceptedAnswer blocks.','P0','Critical for AI Overview selection'],
    ],
    [24,18,8,40,40,8,30],5
  );
}

// ─── TAB 6: E-E-A-T Audit ─────────────────────────────────────────────────
{
  const ws=sheet('06 EEAT Audit');
  title(ws,'E-E-A-T AUDIT','Experience | Expertise | Authority | Trust — Google Search Quality Evaluator Standards',7);
  table(ws,3,
    ['E-E-A-T Dimension','Current State','Score','Critical Gaps','Fix Required','Priority'],
    [
      ['Experience — Demonstrated','WEAK','4/10','Only 3 case studies. 3,200+ consultations claimed but not shown.','Add 20+ detailed before/after case studies with property area, dates, measurable outcomes.','P0'],
      ['Experience — Content Depth','POOR','3/10','No video walkthroughs. No behind-the-scenes content. No site visit photos.','Create video consultation walkthroughs. Photo essays from actual site visits.','P1'],
      ['Expertise — Credentials','POOR','3/10','"Certified Vastu Consultant" — no institution named. "Lecher Antenna Certified" — no body named.','Name all certifying institutions. Link to their websites. Upload certificate images.','P0'],
      ['Expertise — Methodology','GOOD','7/10','VIDS™ is genuine and proprietary. Strong differentiator.','Continue expanding VIDS content. Publish methodology white paper.','P3'],
      ['Expertise — Author Bio','MODERATE','5/10','Bio exists but "10+" vs "18+" inconsistency. No academic background.','Fix to 18+ years. Add educational background. Add professional timeline.','P0'],
      ['Authority — External Recognition','VERY POOR','1/10','No press coverage. No awards. No speaking engagements. No Wikipedia mention.','Pursue: Times of India, Deccan Herald, Bangalore Mirror coverage. Apply for real estate awards.','P0'],
      ['Authority — Backlinks','POOR','2/10','No high-authority links from real estate, architecture, or wellness publications.','Build links from: MagicBricks, 99acres, CREDAI, architectural blogs.','P1'],
      ['Authority — Industry Presence','POOR','2/10','BNI mentioned without link. No chamber of commerce. No industry body.','Join Bangalore Chamber of Commerce. Add links to all memberships.','P1'],
      ['Trust — NAP Consistency','GOOD','7/10','Phone consistent. Address is city-only — no street address.','Add full street address. Verify identical NAP across GBP, Justdial, Sulekha.','P1'],
      ['Trust — Review Signals','MODERATE','5/10','5.0 star rating is excellent. Count is inconsistent (248 vs 600+).','Standardise to verified count. Embed Google reviews widget on homepage.','P0'],
      ['Trust — Physical Verification','POOR','3/10','No office address visible. No Google Maps embed on most pages.','Add full business address. Embed Maps on About and Contact pages.','P1'],
      ['Trust — Privacy & Legal','GOOD','7/10','Privacy, Terms, Disclaimer all present.','Add Cookie Policy. Add DPDP Act India compliance note. Update copyright year.','P2'],
      ['Trust — Payment Security','POOR','2/10','No payment trust badges. For ₹51,000 industrial services, this matters.','Add Razorpay / UPI security badges on fees and contact pages.','P2'],
    ],
    [28,18,8,48,48,8],5
  );
}

// ─── TAB 7: Content Audit ─────────────────────────────────────────────────
{
  const ws=sheet('07 Content Audit');
  title(ws,'CONTENT AUDIT — PAGE BY PAGE','Search intent | Word count | Semantic gaps | E-E-A-T | AI retrieval',10);
  table(ws,3,
    ['Page','URL','Word Count','Target','Gap','Search Intent','Score','Key Content Gaps','Priority Fix','AI Ready?'],
    [
      ['Homepage','/','~1,100','1,800+','-700','Nav + Informational','62/100','Thin on VIDS explanation. No case studies. No service area grid. Stats inconsistency.','Expand to 1,800 words. Add VIDS section, 3 case snippets, Bangalore area grid.','P1','No — needs passage restructure'],
      ['About','/about/','~2,200','1,500+','OK','Informational','70/100','Years inconsistency (10+ vs 18+). No external credential links. No academic background.','Fix years. Add institution links. Add educational background.','P0','Partial'],
      ['Services','/services/','~1,100','1,800+','-700','Navigational','58/100','Thin. Duplicate stat inconsistency. No competitor comparison. No differentiation depth.','Expand to 2,000 words. Add comparison table vs generic consultants.','P1','No'],
      ['Commercial Vastu','/commercial-vastu/','~950','2,200+','-1,250','Commercial Invest.','52/100','2 H1 tags. Thin. No zone-by-zone semantic detail. No case studies.','Fix H1s. Expand to 2,200 words. Add specific zone analysis examples.','P0','No'],
      ['Industrial Vastu','/industrial-vastu-bangalore/','~1,150','2,500+','-1,350','Commercial Invest.','50/100','5 H1 tags — critical. No per-area content (Peenya, Bommasandra). Thin for high-value service.','Fix all H1s. Expand to 2,500 words. Add industrial area case studies.','P0','No'],
      ['Online Consultation','/online-vastu-consultation/','~1,300','1,800+','-500','Commercial','64/100','Missing NRI-specific content. No sample report description. Process is good.','Add NRI section. Describe what a report looks like. Add FAQ for NRI objections.','P1','Partial'],
      ['Pre-Purchase Vastu','/pre-purchase-vastu/','~1,150','2,000+','-850','Commercial Invest.','60/100','Unique service — thin. No property-buyer checklist. Missing pain points.','Expand with 50-point vastu checklist. Add plot/flat/house sections.','P1','No'],
      ['Best Consultant Bangalore','/best-vastu-consultant-bangalore/','~650','2,500+','-1,850','Commercial','35/100','MONEY PAGE. Critically thin. Only FAQ content at 650 words. Highest commercial value keyword.','URGENT: Expand to 2,500+ words. Add differentiators, case studies, methodology.','P0','No'],
      ['Credentials','/credentials/','~1,150','1,500+','-350','Trust / EEAT','40/100','No institution names. No external links. Certifications unverifiable. EEAT critically weak.','Name all certifying bodies. Add links. Add certificate photos. Add academic background.','P0','No'],
      ['Testimonials','/testimonials/','~650','2,000+','-1,350','Trust','30/100','3 testimonials only. Claims 600+. 650 words. No Review schema. Major trust gap.','Add 20+ full case studies. Implement Review schema. Add Google review embed.','P0','No'],
      ['Koramangala Location','/vastu-consultant-koramangala/','~850','1,500+','-650','Local','55/100','FAQ present. Thin body. No area-specific property type content.','Add Koramangala-specific content: tech startup offices, high-rise apartments.','P2','Partial'],
      ['Location Pages (150+)','/vastu-consultant-*/','~850 avg','1,500+','-650 avg','Local','55/100','Templated content. Low area-specific differentiation. Thin per page.','Add 200-word unique area-specific block to each location page.','P2','No'],
      ['Lecher Antenna','/lecher-antenna-geopathic-stress/','Unknown','2,000+','Unknown','Informational','Unknown','High-value unique topic. Should be deepest scientific content on site.','Expand to 2,500 words. Explain the science. Add case study of geopathic stress correction.','P1','Unknown'],
      ['Fees / Pricing','/vastu-consultation-fees/','Unknown','1,000+','Unknown','Commercial','Unknown','Should have complete pricing breakdown with what each service includes.','Add comparison table. Add what\'s included in each tier. Add OfferCatalog schema.','P1','Unknown'],
    ],
    [22,28,10,8,8,18,8,48,32,16],9
  );
}

// ─── TAB 8: Local SEO Audit ───────────────────────────────────────────────
{
  const ws=sheet('08 Local SEO');
  title(ws,'LOCAL SEO AUDIT','Bangalore Local Pack | GBP | NAP | Citations | Reviews | Hyperlocal',7);
  table(ws,3,
    ['Local SEO Factor','Status','Score','Issue / Finding','Fix Required','Priority'],
    [
      ['Google Business Profile','NEEDS FULL AUDIT','65/100','Category setup, post frequency, Q&A, photo count all unknown.','Verify: Primary cat = "Vastu Consultant". Add 6 service categories. Post weekly. Add 20+ photos.','P0'],
      ['NAP — Website Consistency','MODERATE','70/100','Phone consistent (+91 97391 05574). Address = city only. No street address.','Add full street address on all pages. Standardise: Vardhini Vastu, [Street], Bangalore, Karnataka 560001.','P1'],
      ['NAP — Directory Consistency','NEEDS AUDIT','50/100','Justdial, Sulekha, 99acres, Indiamart presence and accuracy unknown.','Audit all directories. Standardise NAP. Remove duplicate listings.','P1'],
      ['Local Business Schema','PARTIAL','60/100','Active via mu-plugin. Missing streetAddress. SameAs array incomplete.','Add: streetAddress, addressLocality, addressRegion, postalCode, SameAs array.','P1'],
      ['Google Maps Embed','PARTIAL','50/100','Maps only on /contact/. Missing on /about/ and all 150+ location pages.','Add Maps embed to About page and all location pages.','P2'],
      ['Review Count Accuracy','INCONSISTENT','30/100','Website shows 600+ but CLAUDE.md says 248. Choose verified number.','Verify actual Google review count. Update all pages to match exactly.','P0'],
      ['Review Response Rate','UNKNOWN','Unknown','Responding to Google reviews is a local ranking signal.','Respond to 100% of reviews within 48 hours.','P1'],
      ['Location Landing Pages','GOOD','75/100','150+ location pages exist. Strong structural foundation.','Expand each to 1,500 words. Add area-specific property landmarks.','P2'],
      ['Hyperlocal Content','POOR','35/100','No local landmarks, transit stations, or area-specific property context.','Add: "near Metro Station", "serving properties in [landmark area]" to each page.','P2'],
      ['Local Backlinks','POOR','25/100','No Bangalore-specific property, news, or community sites linking.','Build links: Bangalore Mirror, MagicBricks, CREDAI Karnataka, local property blogs.','P1'],
      ['Local Citations','POOR','35/100','Directory presence unverified. Estimated 10–20 citations vs 50+ recommended.','Create/verify 50+ local directory listings (Justdial, Sulekha, 99acres, IndiaMart, etc.)','P1'],
      ['GBP Posts','UNKNOWN','Unknown','Weekly GBP posts improve local pack visibility significantly.','Post vastu tips + case study snippets on GBP every Monday.','P1'],
      ['GBP Q&A Section','UNKNOWN','Unknown','Pre-populated Q&A improves local pack and voice search.','Pre-populate 10 Q&A pairs: consultation process, pricing, service areas.','P2'],
      ['International (NRI) Local','POOR','20/100','UK, USA, UAE, Canada pages exist but thin. GBP not optimised for NRI.','Create NRI-specific landing pages with online-only pricing. Optimise for diaspora search.','P1'],
    ],
    [28,16,8,48,48,8],5
  );
}

// ─── TAB 9: Schema Audit ──────────────────────────────────────────────────
{
  const ws=sheet('09 Schema Audit');
  title(ws,'STRUCTURED DATA / SCHEMA AUDIT','Google Rich Results | Knowledge Panel | AI Extraction | Featured Snippets',8);
  table(ws,3,
    ['Schema Type','Status','Implementation','Issues Found','Exact Fix','Priority','Rich Result Potential'],
    [
      ['LocalBusiness','ACTIVE','mu-plugin v3.0','Missing streetAddress. SameAs incomplete. Review count may be wrong.','Add full address. Add SameAs array. Verify aggregateRating count.','P0','Knowledge Panel + Local Pack'],
      ['Person (Raghavendra)','MISSING','Not implemented','Author not in Knowledge Graph. E-E-A-T critical miss.','JSON-LD: name, jobTitle, worksFor, sameAs, knowsAbout, alumniOf.','P0','Author entity + Knowledge Panel'],
      ['FAQPage','ACTIVE','Auto-detect via itemprop','Verify markup on all pages. Confirm no duplicate FAQPage on same URL.','Test all key URLs in Google Rich Results Test.','P1','FAQ rich results in SERP'],
      ['WebSite + SearchAction','MISSING','Not implemented','No sitelinks searchbox for brand searches.','Add JSON-LD WebSite + potentialAction SearchAction to homepage.','P0','Sitelinks searchbox'],
      ['Speakable','MISSING','Not implemented','Highest-priority missing schema. Primary AI Overviews trigger.','Add SpeakableSpecification to homepage H1 + all .fqa FAQ answer blocks.','P0','Google AI Overviews + Assistant'],
      ['Organization','PARTIAL','In LocalBusiness','Missing: logo, contactPoint, sameAs, legalName.','Add or separate Organization schema with these fields.','P1','Knowledge Panel'],
      ['Breadcrumb','VERIFY','Rank Math may generate','Not confirmed on location/service pages.','Run Screaming Frog. Verify BreadcrumbList schema on all non-homepage pages.','P2','Breadcrumb SERP display'],
      ['Review / AggregateRating','PARTIAL','Only in LocalBusiness','Testimonials page has no Review schema. Count inconsistency.','Add Review schema to /testimonials/ with structured client reviews.','P0','Star ratings in SERP'],
      ['Service','PARTIAL','Partial description in schema','No individual Service schema with price, serviceArea, provider.','Add Service schema for each of 7 service types with nested Offer.','P1','Service rich results'],
      ['HowTo','MISSING','Not implemented','4-step consultation process not marked up. Featured snippet missed.','Add HowTo JSON-LD with 4 named steps on /online-vastu-consultation/.','P1','How-to rich result'],
      ['OfferCatalog / Offer','MISSING','Not implemented','Prices in content not structured as schema.','Add OfferCatalog with 7 service tiers and canonical prices.','P1','Price display in SERP'],
      ['ImageObject','MISSING','Not implemented','Images not discoverable in Google Image search.','Add ImageObject for consultant photo and key service images.','P2','Google Images traffic'],
      ['VideoObject','MISSING','Not implemented','No videos exist yet. Will be needed on YouTube launch.','Implement when videos created. Add VideoObject JSON-LD.','P3','Video rich results'],
      ['Article / BlogPosting','MISSING','Not implemented','No blog exists. Required when blog launches.','Plan Article + Author schema template for all blog posts.','P2','Article rich results'],
      ['ItemList','MISSING','Not implemented','Services listing page needs ItemList for carousel potential.','Add ItemList to /services/ with all service types.','P2','Carousel rich result'],
      ['SpeakableSpecification','MISSING','Not implemented','No passage marked as speakable for voice/AI extraction.','Add SpeakableSpecification cssSelector: ".hero h1, .fqa" to all pages.','P0','Voice search + AI Overviews'],
    ],
    [22,12,20,40,40,8,28],5
  );
}

// ─── TAB 10: Core Web Vitals ──────────────────────────────────────────────
{
  const ws=sheet('10 Core Web Vitals');
  title(ws,'CORE WEB VITALS AUDIT','LCP | INP | CLS | FCP | TTFB | Mobile-First Indexing',8);
  table(ws,3,
    ['Metric','Estimated Value','Target','Status','Root Cause','Fix Required','Priority','Impact'],
    [
      ['LCP','2.8–3.5s','< 2.5s','🔴 NEEDS FIX','Inter font + Google Fonts load blocking render. Hero element likely H1 or background.','Preload Inter font. Use font-display: optional for non-critical weights. Convert hero to CSS.','P1','Rankings'],
      ['INP','150–250ms','< 200ms','⚠ BORDERLINE','WhatsApp sticky button + popup + multiple event listeners.','Debounce scroll handlers. Move popup trigger to 60% scroll depth. Remove unnecessary listeners.','P1','Rankings'],
      ['CLS','0.05–0.15','< 0.1','⚠ BORDERLINE','Google Fonts load causes layout shift. Sticky CTA may shift content.','font-display: optional. Reserve layout space for sticky button. Add explicit img dimensions.','P1','Rankings + UX'],
      ['FCP','1.8–2.5s','< 1.8s','⚠ NEEDS FIX','Font blocking + WordPress plugin scripts.','Enable LiteSpeed page cache. Minify CSS/JS. Defer non-critical scripts.','P1','Rankings'],
      ['TTFB','200–600ms','< 200ms','🔴 NEEDS FIX','Hostinger shared hosting. PHP processing overhead.','Enable LiteSpeed object cache. Use Redis if available. Optimise WP queries.','P1','Rankings'],
      ['Total Page Size','800KB–1.5MB','< 500KB','🔴 NEEDS FIX','WordPress plugins overhead. Images likely not WebP. Multiple font weights loaded.','Convert all images to WebP. Load only Inter weights 400,600,700,800. Audit plugin footprint.','P1','Speed'],
      ['Mobile LCP','Likely 3.5–5s','< 2.5s','🔴 CRITICAL','Mobile slower than desktop. Google uses mobile-first indexing.','Run PageSpeed Insights Mobile. Target 90+ score. Prioritise mobile optimisation.','P0','Rankings'],
      ['Hero Image Loading','⚠ ISSUE','eager','WordPress adds lazy to all images including hero.','Add loading=eager fetchpriority=high to all hero images explicitly.','P1','LCP'],
      ['Font Loading Strategy','⚠ POOR','swap/optional','All 5 Inter weights loaded via Google Fonts = 5 render-blocking requests.','Self-host Inter. Load only needed weights (400, 700, 800). Use font-display: swap.','P1','LCP + FCP'],
      ['JavaScript Execution','NEEDS AUDIT','< 300ms','Unknown third-party scripts.','Use Chrome DevTools Performance tab. Defer all non-critical JS.','P2','INP'],
    ],
    [18,18,10,16,40,40,8,12],5
  );
}

// ─── TAB 11: Internal Linking ─────────────────────────────────────────────
{
  const ws=sheet('11 Internal Linking');
  title(ws,'INTERNAL LINKING AUDIT','PageRank flow | Anchor text | Orphan pages | Hub-and-spoke architecture',7);
  table(ws,3,
    ['Issue','Affected Pages','Description','Fix Required','Priority','Impact'],
    [
      ['No service page cross-linking','/commercial-vastu/ /industrial-vastu-bangalore/','Service pages do not link to each other. Industrial → Commercial and vice versa.','Add "Related Services" section to each service page with 3–4 cross-links.','P1','PageRank flow'],
      ['Homepage → location pages','/ → /vastu-consultant-*/','Homepage links to hub but does not feature major areas in body content.','Add top 10 Bangalore area + top 5 India city internal links in homepage body.','P1','Local SEO signal'],
      ['Location pages → service pages','/vastu-consultant-*/ → services','Location pages likely link to generic /services/ not specific service pages.','Add relevant service links in location page body: apartments → vastu-for-home, offices → commercial-vastu.','P2','Topical relevance'],
      ['Orphan page risk','150+ location pages','Pages linked only from sitemap. May have zero inbound internal links.','Run Screaming Frog. Identify 0-inbound pages. Add links from hub and related pages.','P1','Crawlability + rankings'],
      ['Generic anchor text','All pages','Navigation uses "Home", "Services", "About" — no keyword anchor text in body links.','Use keyword-rich anchors in body: "vastu consultant in Koramangala" not "click here".','P2','Ranking signal'],
      ['Footer utility links rel=nofollow','All pages footer','Privacy/Terms/Disclaimer links pass PageRank unnecessarily.','Add rel=nofollow to privacy, terms, disclaimer footer links.','P3','PageRank conservation'],
      ['Breadcrumb gaps','Service + location pages','Breadcrumbs noted on homepage. Not confirmed on all 491 pages.','Verify Rank Math breadcrumbs active on all pages. Add BreadcrumbList schema.','P1','UX + SERP display'],
      ['No blog-to-service linking','Future (blog not yet live)','When blog launches, every post must link to a relevant service page.','Create internal link template for all blog posts before launch.','P2','Authority flow'],
      ['Hub page verification','/vastu-consultant-locations/','150+ location pages need to be linked from a central hub.','Verify hub exists and links to ALL 150+ pages. Create if missing.','P1','Crawlability'],
      ['Service → credentials/about linking','All service pages','Service pages do not link to /credentials/ or /about/ — E-E-A-T signal missed.','Add "About the Consultant" or "Our Credentials" link in each service page.','P2','E-E-A-T'],
    ],
    [28,28,45,45,8,15],4
  );
}

// ─── TAB 12: Backlink Audit ───────────────────────────────────────────────
{
  const ws=sheet('12 Backlink Audit');
  title(ws,'BACKLINK PROFILE AUDIT','Link quality | Gaps | Opportunities | Toxic links | Local citations',7);
  table(ws,3,
    ['Category','Current Estimate','Gap / Risk','Opportunity','Action Required','Priority'],
    [
      ['Domain Authority (est.)','DA 15–25','Competitors likely DA 30–50. Ranking ceiling is limited.','Raise DA to 35+ within 12 months.','Structured link-building outreach. Target 50 DA 40+ links.','P0'],
      ['Real Estate Portals','LIKELY ABSENT','MagicBricks, 99acres, Housing.com = millions of monthly visits + topical authority.','Get listed with profile links on all major portals.','Create consultant profiles on 99acres, MagicBricks, Housing.com, NoBroker.','P0'],
      ['Local Bangalore News','LIKELY ABSENT','Times of India, Deccan Herald, Bangalore Mirror cover property + lifestyle.','5+ editorial backlinks from DA 60+ news sites.','Pitch expert vastu commentary to property journalists. Offer data/quotes.','P1'],
      ['Architecture / Interior Design Blogs','LIKELY ABSENT','High topical authority for vastu-adjacent content.','10+ guest post links from DA 30+ design blogs.','Guest post on 10 Indian architecture + interior design blogs.','P1'],
      ['Vastu / Spiritual Directories','LIKELY ABSENT','VastuShastraGuru, Sulekha, Justdial — niche topical relevance.','50+ directory citations with do-follow links.','List on all major vastu + spiritual + wellness directories.','P1'],
      ['Client Business Websites','UNTAPPED','Every satisfied client has a website. Low-effort high-value links.','20+ contextual links from client sites.','Client testimonial exchange: clients add 1-line site mention + link.','P1'],
      ['YouTube Channel (backlink)','MISSING','YouTube = powerful entity link from Google-owned property.','1 strong Google-property backlink.','Create YouTube channel. Every video description links to site.','P0'],
      ['Wikipedia','MISSING','Vastu Shastra article could reference real practitioners.','DA 90+ editorial reference.','Research Wikipedia contribution. Add Raghavendra Hebbur to Vastu practitioners.','P2'],
      ['NRI Community Portals','MISSING','Indian diaspora portals in USA, UK, UAE = high DA + ideal audience.','10+ community portal links.','List on NRI community directories. Participate in NRI forums with expert answers.','P2'],
      ['Academic / Research','MISSING','IIT research on traditional architecture = ultimate authority.','1–2 academic citations.','Connect with IIT researchers. Offer anonymised case data for studies.','P3'],
      ['Property Event Sponsorships','MISSING','Bangalore property expos generate event site backlinks.','3–5 event website links.','Sponsor 2–3 Bangalore property events per year.','P2'],
      ['Toxic Link Risk','UNKNOWN','Older sites may have spammy links if any early SEO was done.','Disavow file protects against negative SEO.','Run Ahrefs/Semrush backlink audit. Disavow toxic domains.','P2'],
    ],
    [28,20,40,35,40,8],5
  );
}

// ─── TAB 13: Competitor Gap Analysis ─────────────────────────────────────
{
  const ws=sheet('13 Competitor Gaps');
  title(ws,'COMPETITOR GAP ANALYSIS','Vastu consultant competitors | Bangalore + India | Content | Authority | Schema | Local',8);
  table(ws,3,
    ['Competitor','Est. DA','Ranking Strength','Content Advantage','Schema / Technical','Local SEO','Gap to Close','Strategy'],
    [
      ['Generic Vastu Bloggers','15–25','Long-tail vastu tips','200+ articles. Informational dominance.','Basic schema','Weak local','Blog content gap (0 vs 200+ posts)','Launch 50-post blog immediately to claim informational keywords'],
      ['Delhi / Mumbai Vastu Consultants','20–35','National brand terms','Established content. Author authority.','Better EEAT likely','Multi-city GBP','Authority gap. Credential gap.','Lean into Bangalore-specific dominance. Crush local pack.'],
      ['Vastu + Astrology Hybrids','20–30','Vastu + astrology combined','Combined service = more keyword coverage.','Mixed schema','Moderate local','Topic breadth vs depth','Counter with scientific angle. VIDS™ vs superstition positioning.'],
      ['Online Vastu Platforms (Vedic)','30–45','Online consultation keywords','High volume. Multiple consultants.','Better schema likely','National reach','Authority + scale gap.','Own the scientific / zero-demolition differentiator. Niche > generic.'],
      ['Real Estate Adjacent Content','25–40','Property + vastu combined','Real estate site with vastu section.','Real estate schema','National','Topical authority gap','Partner or compete. Create vastu + property buying content cluster.'],
    ],
    [30,10,28,32,22,18,28,38],null
  );

  // Vardhini Vastu competitive advantages
  const advRow=ws.getRow(10);
  advRow.getCell(1).value='VARDHINI VASTU COMPETITIVE ADVANTAGES (Strengths to double down on)';
  advRow.getCell(1).font={bold:true,size:11,color:{argb:'FF1E3A5F'},name:'Arial'};
  advRow.commit();
  [['VIDS™ Methodology','Proprietary system. No competitor has this. Make it the centre of all content.'],
   ['Lecher Antenna Instrumentation','Scientific tool. Very few claim this. Lean into science vs superstition angle.'],
   ['Zero Demolition Guarantee','Strong value prop. Prominently featured. Needs own pillar page.'],
   ['150+ Bangalore Location Pages','Massive local SEO moat. No competitor has this density.'],
   ['18+ Years + 3,200+ Consultations','Scale of experience. Must be consistent (fix 10+ years inconsistency first).'],
  ].forEach((r,i)=>{
    const row=ws.getRow(11+i);
    row.getCell(1).value=r[0]; row.getCell(1).font={bold:true,name:'Arial',size:9,color:{argb:'FFEA580C'}};
    row.getCell(2).value=r[1]; row.getCell(2).font={name:'Arial',size:9};
    row.height=18; row.commit();
  });
  ws.getColumn(1).width=30; ws.getColumn(2).width=55;
}

// ─── TAB 14: Topical Authority Map ────────────────────────────────────────
{
  const ws=sheet('14 Topical Authority');
  title(ws,'TOPICAL AUTHORITY MAP','Pillar pages | Cluster pages | Coverage gaps | Monthly search volume',8);
  table(ws,3,
    ['Topic Cluster','Pillar Page','Cluster Pages EXISTING','Cluster Pages NEEDED','MSV Est.','Coverage %','Priority'],
    [
      ['Residential Vastu','/vastu-for-home/','Partial (vastu-for-home, pre-purchase)','Bedroom vastu, kitchen vastu, bathroom, living room, study room, pooja room = 6 pages','6,000–12,000/mo total','25%','P0'],
      ['Commercial Vastu','/commercial-vastu/','1 page','Office layout, shop vastu, restaurant vastu, hotel vastu = 4 pages','2,000–4,000/mo','20%','P1'],
      ['Industrial Vastu','/industrial-vastu-bangalore/','1 page','Factory vastu, warehouse, Peenya, Electronic City, Bommasandra = 5 pages','800–1,500/mo','15%','P2'],
      ['Online / NRI Vastu','/online-vastu-consultation/','4–5 country pages','NRI vastu hub, USA, UK, UAE, Canada, Australia, Singapore = 7 pages','3,000–6,000/mo','30%','P1'],
      ['Pre-Purchase Vastu','/pre-purchase-vastu/','1 page','Plot selection guide, flat vastu checklist, vastu defects to avoid = 3 pages','2,000–4,000/mo','20%','P1'],
      ['VIDS™ Methodology','MISSING','0 pages','VIDS explainer, 16-zone analysis, zone-by-zone guide = 3 pages','500–1,500/mo','0%','P0'],
      ['Vastu Without Demolition','MISSING (implied)','0 pages','Remedy types: copper, yantra, colour, crystals, metals = 4 pages','1,500–3,000/mo','0%','P0'],
      ['Bangalore Local Vastu','/vastu-consultant-bangalore/','150+ location pages','Deeper content in existing pages; area-specific posts = ongoing','15,000–30,000/mo total','70%','P2'],
      ['India National Vastu','/in/','5–6 city pages','30–40 more India city pages','5,000–10,000/mo','25%','P2'],
      ['Vastu Knowledge (Blog)','MISSING','0 blog posts','50+ posts across all clusters','30,000–60,000/mo potential','0%','P0'],
    ],
    [25,25,35,45,15,10,8],6
  );
}

// ─── TAB 15: Entity SEO Map ───────────────────────────────────────────────
{
  const ws=sheet('15 Entity SEO Map');
  title(ws,'ENTITY SEO MAP','Knowledge Graph | Named entities | Relationships | Co-occurrence | NLP',7);
  table(ws,3,
    ['Entity','Type','Current Presence','Knowledge Graph Status','Gap','Fix Required','Priority'],
    [
      ['Raghavendra Hebbur','Person','Mentioned throughout site','NOT IN KG — no Wikipedia, no Wikidata','Author entity not established. AI cannot identify who he is.','Person schema + LinkedIn profile + Wikipedia mention + Wikidata entry.','P0'],
      ['Vardhini Vastu','Organization','Website + GBP','PARTIAL — no Wikipedia, Wikidata entry unknown','Brand entity not fully consolidated across AI systems.','Wikidata entity. Consistent brand mentions across 50+ external sources.','P1'],
      ['VIDS™ Methodology','Concept / Brand','Mentioned on all pages','NOT IN ANY KNOWLEDGE BASE','Proprietary concept with zero external validation.','Publish VIDS white paper. Get cited externally. Register trademark.','P1'],
      ['Lecher Antenna','Instrument','Referenced on site','Wikipedia article EXISTS — not linked to it','Site doesn\'t connect to the existing Lecher antenna entity.','Link from /lecher-antenna-geopathic-stress/ to Wikipedia Lecher antenna article.','P1'],
      ['Vastu Shastra','Concept','Referenced on all pages','Strong Wikipedia entity — not linked to it','Missing outbound entity relationship to core topic.','Add contextual link to Wikipedia Vastu Shastra in opening section of /about/.','P1'],
      ['Geopathic Stress','Concept','Referenced','Wikipedia article exists — not linked','Missing entity relationship.','Link to geopathic stress Wikipedia article from Lecher antenna page.','P2'],
      ['Vastu Purusha Mandala','Concept','NOT MENTIONED','Strong entity in Vastu knowledge','Missing co-occurrence with core Vastu terminology. Reduces topical authority.','Add mentions in /about/ and VIDS methodology content.','P1'],
      ['Panchabhuta (Five Elements)','Concept','NOT MENTIONED','Core Vastu theory — Earth Water Fire Air Space','Missing fundamental Vastu entity = weak topical authority signal.','Add content about Five Elements in Vastu context on key pages.','P2'],
      ['Bangalore','Place','Present in all location content','Strong Google entity','GeoCoordinates in schema — verify accuracy (12.9716, 77.5946).','Verify lat/long in LocalBusiness schema is accurate.','P2'],
      ['Geo Master Certification','Credential','Mentioned on /credentials/','Certifying body UNKNOWN','Cannot verify. No entity link. E-E-A-T risk.','Identify and name the Geo Master certifying organisation. Add link.','P0'],
    ],
    [25,15,22,20,40,40,8],6
  );
}

// ─── TAB 16: Action Priority Matrix ──────────────────────────────────────
{
  const ws=sheet('16 Priority Matrix');
  title(ws,'ACTION PRIORITY MATRIX','Sorted by ROI: Impact ÷ Effort | P0 = 48h | P1 = 2 weeks | P2 = 30 days | P3 = ongoing',9);
  table(ws,3,
    ['Action','Category','Priority','Impact\n(1-10)','Effort\n(1-10)','ROI Score','Timeline','Est. Traffic Impact'],
    [
      ['Fix multiple H1 on /commercial-vastu/ and /industrial-vastu-bangalore/','Technical','P0',10,1,'10.0','Day 1','+15% rankings on those pages'],
      ['Update robots.txt: add 7 AI bot Allow rules','Technical','P0',10,1,'10.0','Day 1','+300% AI citation readiness'],
      ['Fix review count inconsistency (248 vs 600+)','Trust','P0',9,1,'9.0','Day 1','Trust + conversion'],
      ['Create /llms.txt with site structure for AI crawlers','AI/Technical','P0',9,1,'9.0','Day 1','ChatGPT/Perplexity discoverability'],
      ['Fix "10+ Years" → "18+ Years" sitewide','Content','P0',9,2,'4.5','Day 1–2','+8% CTR from trust improvement'],
      ['Fix robots.txt sitemap URL','Technical','P0',7,1,'7.0','Day 1','Crawl efficiency'],
      ['Block tag/category/author archives in robots.txt','Technical','P2',5,1,'5.0','Day 1','Crawl budget savings'],
      ['Add Person schema for Raghavendra Hebbur','Schema','P1',9,2,'4.5','Week 1','Author KG entity'],
      ['Add WebSite + SearchAction schema','Schema','P1',8,1,'8.0','Week 1','Brand SERP searchbox'],
      ['Add Speakable schema to homepage + all FAQ pages','Schema','P0',10,3,'3.3','Week 1','AI Overviews eligibility'],
      ['Name all certifying institutions on /credentials/','EEAT','P0',9,2,'4.5','Week 1','+35% E-E-A-T'],
      ['Add external authority links to /about/ and /credentials/','EEAT','P0',8,1,'8.0','Week 1','+35% E-E-A-T'],
      ['Add SameAs to LocalBusiness schema','Schema','P1',8,2,'4.0','Week 1','Entity consolidation'],
      ['Expand /best-vastu-consultant-bangalore/ to 2,500 words','Content','P0',10,4,'2.5','Week 1','+30% rankings on money keyword'],
      ['Add 20+ testimonials with Review schema to /testimonials/','Trust','P1',9,5,'1.8','Week 2','+30% conversion rate'],
      ['Add HowTo schema to /online-vastu-consultation/','Schema','P1',7,2,'3.5','Week 2','Featured snippet'],
      ['Add OfferCatalog schema to /vastu-consultation-fees/','Schema','P1',7,2,'3.5','Week 2','Price rich result'],
      ['Enable image sitemap (Rank Math setting)','Technical','P2',5,1,'5.0','Week 2','+15% image search traffic'],
      ['Fix image alt text on all pages (add keyword-rich alt)','Technical/SEO','P0',8,4,'2.0','Week 2','+15% image search + E-E-A-T'],
      ['Set meta descriptions on all 491 pages via Rank Math','Content','P1',8,6,'1.3','Month 1','+20% average CTR'],
      ['Expand /testimonials/ to 2,000+ words with 20 case studies','Content','P1',8,4,'2.0','Month 1','+30% conversions'],
      ['Launch blog: first 10 articles on high-MSV vastu topics','Content','P0',10,6,'1.7','Month 1','+40% organic — start of 180% trajectory'],
      ['Build 50 local directory citations','Local','P1',7,5,'1.4','Month 1','Local pack improvement'],
      ['Optimise Core Web Vitals (LCP, INP, CLS)','Technical','P1',8,6,'1.3','Month 1','Rankings + UX'],
      ['Create NRI Vastu hub page + 5 country landing pages','Content','P1',7,5,'1.4','Month 2','+25% international traffic'],
      ['Add Google Maps embed to all 150+ location pages','Local','P2',5,5,'1.0','Month 2','Local conversion'],
      ['Create VIDS™ methodology pillar page','Content','P1',8,4,'2.0','Month 2','Branded search + AI citation'],
      ['Build 10 high-authority backlinks (real estate portals)','Links','P0',9,7,'1.3','Month 1–3','+20% DA → unlocks rankings ceiling'],
      ['Create YouTube channel with VIDS explainer video','Video/EEAT','P0',9,6,'1.5','Month 1–2','Brand entity + E-E-A-T + video SERP'],
      ['Complete blog: 50 posts across all topic clusters','Content','P0',10,10,'1.0','Month 3–5','+180% total organic traffic at scale'],
    ],
    [48,20,8,8,8,8,12,30],3
  );
}

// ─── TABS 17–37: Remaining tabs (lean format) ─────────────────────────────
// TAB 17: Quick Wins
{
  const ws=sheet('17 Quick Wins');
  title(ws,'QUICK WINS — UNDER 4 HOURS EACH','High impact. Zero budget. Do these first.',5);
  table(ws,3,
    ['Action','Time Required','Impact Score','How To Do It','Priority'],
    [
      ['Fix 2 H1 tags on /commercial-vastu/','15 min',10,'WordPress editor → change 2nd H1 to H2','P0'],
      ['Fix 5 H1 tags on /industrial-vastu-bangalore/','20 min',10,'WordPress editor → keep first H1, change all others to H2','P0'],
      ['Add 7 AI bot Allow rules to robots.txt','10 min',10,'cPanel File Manager → edit robots.txt → add 7 User-agent blocks','P0'],
      ['Fix sitemap URL in robots.txt','5 min',7,'Change /sitemap.xml to /sitemap_index.xml in robots.txt','P0'],
      ['Update "10+ Years" → "18+ Years" across all pages','45 min',9,'WP plugin Better Search Replace → search "10+ Years" → replace "18+ Years"','P0'],
      ['Verify and fix Google review count (248 vs 600+)','15 min',9,'Check GBP dashboard → update all page mentions to verified count','P0'],
      ['Add WebSite + SearchAction schema to homepage','30 min',8,'Rank Math → Schema → WebSite → enable SearchAction','P0'],
      ['Add Person schema for Raghavendra Hebbur to /about/','45 min',9,'Rank Math → Schema → Person → fill name jobTitle sameAs fields','P1'],
      ['Block tag/category/author archives in robots.txt','10 min',5,'Add 3 Disallow lines to robots.txt','P2'],
      ['Create /llms.txt with site map for AI crawlers','20 min',8,'Create static WordPress page at /llms.txt with site description + key pages','P0'],
      ['Add SameAs to LocalBusiness schema','20 min',8,'Edit mu-plugin → add sameAs array: GBP URL, Justdial, LinkedIn','P1'],
      ['Link to Wikipedia Vastu Shastra from /about/','5 min',6,'Add one contextual outbound link to en.wikipedia.org/wiki/Vastu_shastra','P1'],
      ['Link to Wikipedia Lecher Antenna from /lecher-antenna-/ page','5 min',5,'Add one contextual outbound link to Lecher lines Wikipedia article','P1'],
      ['Set rel=nofollow on footer utility links','10 min',4,'Edit footer template → add rel="nofollow" to Privacy, Terms, Disclaimer links','P3'],
    ],
    [45,12,12,50,8],4
  );
}

// TAB 18: High Impact Fixes
{
  const ws=sheet('18 High Impact Fixes');
  title(ws,'HIGH IMPACT FIXES','Large effort but transformational traffic gains',6);
  table(ws,3,
    ['Fix','Expected Traffic Impact','Effort Level','Timeline','Dependencies','Priority'],
    [
      ['Launch blog: 50 posts targeting PAA questions','+180% organic traffic in 12 months','Very High (8/10)','3–5 months','Keyword research, content writer, internal link plan','P0'],
      ['Expand 5 thin pages to 2,000+ words each','+35% rankings on target keywords','Medium (4/10)','2–3 weeks','Content writer','P0'],
      ['Build 50 high-authority backlinks','+40% domain authority in 12 months','Very High (8/10)','6–12 months','Outreach budget, PR contacts','P0'],
      ['Implement Speakable schema sitewide','+200% AI Overviews eligibility','Low (3/10)','1 week','Developer 2 hours','P0'],
      ['Complete topical authority across all clusters','+120% long-tail traffic','Very High (9/10)','6–9 months','Content strategy, writers','P0'],
      ['Fix all E-E-A-T gaps (credentials, testimonials, external links)','+25% conversion rate','Medium (5/10)','3–4 weeks','Content + credential documentation','P0'],
      ['Optimise Core Web Vitals to all-green','+8–15% rankings across all pages','Medium (5/10)','1–2 months','Developer','P1'],
      ['Create YouTube channel with 20 consultation videos','+50% brand searches, video SERP entries','High (6/10)','3–6 months','Video production','P1'],
      ['Build NAP-consistent citations on 50+ directories','+15% local pack strength','Medium (4/10)','1 month','Data entry work','P1'],
      ['NRI Vastu content cluster (8 country pages)','+25% international organic traffic','Medium (5/10)','2 months','Content writer','P1'],
    ],
    [40,28,12,12,35,8],5
  );
}

// TAB 19: Blog Opportunities
{
  const ws=sheet('19 Blog Opportunities');
  title(ws,'BLOG CONTENT OPPORTUNITIES — 50 TARGET ARTICLES','Zero blog exists today. This is the highest-traffic opportunity on the site.',7);
  table(ws,3,
    ['Article Title','Focus Keyword','MSV Est.','Search Intent','Word Count','Topical Cluster','Priority'],
    [
      ['South-Facing House Vastu: Complete 2026 Guide','south facing house vastu',8000,'Informational',2500,'Residential Vastu','P0'],
      ['Vastu Dosha: 15 Common Defects and Their Remedies','vastu dosha remedies',6000,'Informational',3000,'Remedies','P0'],
      ['Vastu for Apartment: Floor Plan Analysis Guide','vastu for flat',6000,'Informational',2500,'Residential Vastu','P0'],
      ['Vastu Tips for North-Facing House','vastu for north facing house',4500,'Informational',2500,'Residential Vastu','P0'],
      ['Which Direction Should Your Main Door Face?','main door direction vastu',5000,'Informational',2000,'Residential Vastu','P0'],
      ['Vastu for Kitchen: Direction and Placement Rules','vastu for kitchen direction',4000,'Informational',2500,'Residential Vastu','P0'],
      ['Vastu for Master Bedroom: Direction and Layout','vastu for master bedroom',4500,'Informational',2500,'Residential Vastu','P0'],
      ['How to Check Vastu of a Plot Before Buying (10 Steps)','vastu for plot',3000,'Informational',2000,'Pre-Purchase','P0'],
      ['Online Vastu Consultation: How It Works Step by Step','online vastu consultation',3000,'Comm. Invest.',1800,'Online Vastu','P0'],
      ['Vastu for New House Construction: Foundation to Finish','vastu for new house construction',4000,'Informational',3000,'Residential Vastu','P1'],
      ['What is Geopathic Stress? Lecher Antenna Explained','geopathic stress',2000,'Informational',2500,'VIDS Methodology','P1'],
      ['Vastu Shastra vs Feng Shui: 10 Key Differences','vastu vs feng shui',5500,'Informational',2000,'Educational','P1'],
      ['East-Facing House Vastu: Pros, Cons and Remedies','east facing house vastu',3500,'Informational',2000,'Residential Vastu','P1'],
      ['Vastu for Pooja Room: Direction, Idol Placement, Colours','vastu for pooja room',7000,'Informational',2000,'Residential Vastu','P1'],
      ['Commercial Office Vastu: MD Cabin Direction + Cash Zone','office vastu tips',2500,'Commercial',2000,'Commercial Vastu','P1'],
      ['Vastu for Bedroom: Bed Direction for Good Sleep','vastu for bedroom',8000,'Informational',2500,'Residential Vastu','P0'],
      ['Industrial Vastu: Factory Gate Direction and Production Zones','industrial vastu',1500,'Informational',2500,'Industrial Vastu','P2'],
      ['Pre-Purchase Vastu Checklist: 50 Points to Check','pre purchase vastu checklist',2500,'Commercial',2500,'Pre-Purchase','P1'],
      ['Vastu Remedies Without Demolition: 20 Proven Methods','vastu remedies without demolition',3000,'Informational',2500,'Remedies','P0'],
      ['What is VIDS™ Vastu? The 16-Zone Analysis Explained','VIDS vastu methodology',500,'Informational',2000,'VIDS Methodology','P1'],
    ],
    [45,30,10,15,12,22,8],6
  );
}

// TAB 20: AI Overview Opportunities
{
  const ws=sheet('20 AI Overview Opps');
  title(ws,'GOOGLE AI OVERVIEW OPPORTUNITIES','Queries where AI Overviews appear — optimisation to win inclusion',7);
  table(ws,3,
    ['Target Query','AI Overview Likelihood','Current Content','Schema Needed','Word Count Needed','Content Fix','Priority'],
    [
      ['best vastu consultant bangalore','High','Page exists at 650 words — far too thin','LocalBusiness + Review + Speakable','2,500+','Expand page. Add direct answer in first paragraph: "Raghavendra Hebbur is..."','P0'],
      ['vastu tips for home','Very High','No blog post exists','Article + FAQ + Speakable','2,000+','Create comprehensive vastu home tips blog post','P0'],
      ['south facing house vastu good or bad','Very High','No content','Article + FAQ + Speakable','2,000+','Create direct-answer blog post. First sentence: "South-facing houses are not inherently bad..."','P0'],
      ['how to check vastu of a house','Very High','No HowTo content','HowTo + Speakable','1,500+','Create 10-step HowTo guide. Add HowTo schema.','P0'],
      ['vastu consultant near me','High','150+ location pages exist','LocalBusiness + FAQ + Speakable','1,500+ per page','Add direct-answer FAQ: "Raghavendra Hebbur serves [Area], Bangalore, with on-site visits..."','P1'],
      ['online vastu consultation','High','Page exists — needs inverted pyramid','Service + Speakable','1,800+','Rewrite intro: "Online vastu consultation from Vardhini Vastu is available from ₹5,000..."','P1'],
      ['what is geopathic stress','High','Lecher page exists — thin','Article + Speakable','2,500+','Rewrite first paragraph as direct 50-word definition','P1'],
      ['vastu dosha remedies','Very High','No content','Article + FAQ + Speakable','2,500+','Create comprehensive remedies guide. First sentence answers the query directly.','P0'],
      ['industrial vastu consultant bangalore','Moderate','Page exists — thin + multiple H1','Service + Speakable','2,500+','Fix H1s. Expand. Add direct answer block.','P0'],
      ['what is VIDS vastu','Low — low volume','Mentioned throughout — no dedicated page','Article + Speakable','1,500+','Create VIDS methodology pillar page','P1'],
    ],
    [30,15,28,25,14,38,8],6
  );
}

// TAB 21: Featured Snippet Opportunities
{
  const ws=sheet('21 Featured Snippets');
  title(ws,'FEATURED SNIPPET OPPORTUNITIES','Paragraph | List | Table | HowTo snippets',6);
  table(ws,3,
    ['Query','Snippet Type','Content to Create','Format Required','Priority'],
    [
      ['vastu directions for main door','Ordered List','1. North — best for business owners and cash flow. 2. East — excellent for health and new beginnings. 3. North-East — ideal for residential. 4. West — good for professionals.','H2 question + numbered list (4–8 items)','P0'],
      ['vastu consultation fees in bangalore','Table','Service | Price | Includes → Apartment | ₹15,000 | 16-zone audit + report; Villa | ₹25,000 | full audit; Online | ₹5,000 | floor plan analysis','HTML table with thead and tbody','P1'],
      ['is south facing house bad vastu','Paragraph','Direct 55-word answer: "South-facing houses are not inherently bad in Vastu Shastra. The key factor is the position of the main entrance within the south zone..."','40–60 word direct-answer paragraph under H2 question','P0'],
      ['how to calculate vastu zones','Ordered List','1. Get a compass-accurate floor plan. 2. Overlay the 16-zone Vastu grid. 3. Identify the Brahmasthan (centre). 4. Map directional zones...','Numbered steps with brief descriptions','P1'],
      ['vastu colors for bedroom direction','Table','Direction | Recommended Colour | Benefit → South-West | Cream/Yellow | stability; North | Blue/Green | growth','Comparison table','P2'],
      ['vastu consultation charges bangalore','Paragraph / Table','Direct price statement with table','Price table + 50-word context paragraph','P1'],
      ['what is lecher antenna','Paragraph','Direct 50-word definition: "A Lecher antenna is a scientific instrument used to detect geopathic stress zones and earth radiation frequencies..."','Definition paragraph under H1','P1'],
      ['vastu remedies without demolition list','List','1. Copper strip placement at Vastu defect zones. 2. Brass pyramids at energy blockages. 3. Colour therapy on deficient walls. 4. Crystal placement...','Numbered remedy list (8–12 items)','P0'],
    ],
    [30,15,50,30,8],4
  );
}

// TAB 22: Schema Implementation Guide
{
  const ws=sheet('22 Schema Guide');
  title(ws,'SCHEMA IMPLEMENTATION GUIDE','Copy-ready JSON-LD templates for missing schema types',5);

  const guide=[
    ['PERSON SCHEMA — Add to /about/ page via Rank Math Custom Schema',`{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Raghavendra Hebbur",
  "jobTitle": "Vastu Consultant",
  "description": "Certified Vastu Consultant with 18+ years of experience. Creator of VIDS™ methodology. Lecher Antenna practitioner.",
  "worksFor": {"@type": "Organization", "name": "Vardhini Vastu"},
  "knowsAbout": ["Vastu Shastra","Geopathic Stress","Lecher Antenna","VIDS Methodology","Energy Correction"],
  "sameAs": ["https://www.linkedin.com/in/raghavendra-hebbur/", "GBP_URL_HERE"]
}`],
    ['SPEAKABLE SCHEMA — Add to homepage and FAQ pages',`{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".hero h1", ".fqa", ".sub"]
  },
  "url": "https://www.vardhinivastu.in/"
}`],
    ['HOWTO SCHEMA — Add to /online-vastu-consultation/',`{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Book an Online Vastu Consultation with Vardhini Vastu",
  "totalTime": "PT48H",
  "estimatedCost": {"@type": "MonetaryAmount", "currency": "INR", "value": "5000"},
  "step": [
    {"@type": "HowToStep", "name": "Book & Pay", "text": "Visit vardhinivastu.in and pay ₹5,000 via UPI or card."},
    {"@type": "HowToStep", "name": "Share Floor Plan", "text": "Email your scaled floor plan and property photos within 24 hours."},
    {"@type": "HowToStep", "name": "VIDS™ Analysis", "text": "Raghavendra applies the 16-zone VIDS analysis to your floor plan."},
    {"@type": "HowToStep", "name": "Report Delivery", "text": "Receive your written Vastu report with remedies within 48 hours."}
  ]
}`],
    ['WEBSITE + SEARCHACTION — Add to homepage only',`{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Vardhini Vastu",
  "url": "https://www.vardhinivastu.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {"@type": "EntryPoint", "urlTemplate": "https://www.vardhinivastu.in/?s={search_term_string}"},
    "query-input": "required name=search_term_string"
  }
}`],
    ['OFFERCATALOG SCHEMA — Add to /vastu-consultation-fees/',`{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Vardhini Vastu",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Vastu Consultation Services",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Online Vastu Consultation"}, "price": "5000", "priceCurrency": "INR"},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Apartment Vastu Consultation (Bangalore)"}, "price": "15000", "priceCurrency": "INR"},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Villa / Independent House (Bangalore)"}, "price": "25000", "priceCurrency": "INR"},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Commercial / Office Vastu"}, "price": "51000", "priceCurrency": "INR"},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Pre-Purchase Vastu Report"}, "price": "5000", "priceCurrency": "INR"}
    ]
  }
}`],
    ['robots.txt UPDATE — Replace current file with this',`User-agent: *
Allow: /
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /tag/
Disallow: /category/
Disallow: /author/

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

Sitemap: https://www.vardhinivastu.in/sitemap_index.xml`],
    ['/llms.txt — Create at https://www.vardhinivastu.in/llms.txt',`# Vardhini Vastu - Scientific Vastu Consultancy, Bangalore, India
# Consultant: Raghavendra Hebbur | 18+ years | 3,200+ consultations

## About
Vardhini Vastu provides scientific, non-demolition Vastu consultancy using the
proprietary VIDS™ (Vastu Integral Diagnostic System) methodology and Lecher Antenna
geopathic stress detection. Services cover residential, commercial, and industrial
properties across Bangalore and all of India, with online consultations for NRI clients.

## Key Pages
- Homepage: https://www.vardhinivastu.in/
- About Consultant: https://www.vardhinivastu.in/about/
- Services: https://www.vardhinivastu.in/services/
- Fees: https://www.vardhinivastu.in/vastu-consultation-fees/
- Commercial Vastu: https://www.vardhinivastu.in/commercial-vastu/
- Industrial Vastu: https://www.vardhinivastu.in/industrial-vastu-bangalore/
- Online Consultation: https://www.vardhinivastu.in/online-vastu-consultation/
- Pre-Purchase Report: https://www.vardhinivastu.in/pre-purchase-vastu/
- Credentials: https://www.vardhinivastu.in/credentials/
- Testimonials: https://www.vardhinivastu.in/testimonials/

## Pricing
Online consultation: INR 5,000 | Apartment Bangalore: INR 15,000 | Villa: INR 25,000
Commercial/Industrial: from INR 51,000 | Pre-purchase report: INR 5,000

## Contact
Phone: +91 97391 05574 | WhatsApp: https://wa.me/919739105574
Email: Info@vardhinivastu.in | City: Bangalore, Karnataka, India`],
  ];

  let curRow=4;
  guide.forEach(([label,code])=>{
    const lr=ws.getRow(curRow);
    lr.getCell(1).value=label;
    lr.getCell(1).font={bold:true,size:10,color:{argb:'FF1E3A5F'},name:'Arial'};
    lr.getCell(1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFE7E5E0'}};
    lr.height=20;lr.commit();curRow++;
    const cr=ws.getRow(curRow);
    cr.getCell(1).value=code;
    cr.getCell(1).font={name:'Courier New',size:8,color:{argb:'FF0C0A09'}};
    cr.getCell(1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFFFF7ED'}};
    cr.getCell(1).alignment={wrapText:true,vertical:'top'};
    cr.height=Math.max(60,(code.split('\n').length)*12);
    cr.commit();curRow+=2;
  });
  ws.getColumn(1).width=110;
}

// TAB 23: 90-Day SEO Roadmap
{
  const ws=sheet('23 90-Day Roadmap');
  title(ws,'90-DAY SEO ROADMAP','Weeks 1–12 | Prioritised implementation plan',7);
  table(ws,3,
    ['Phase','Week','Action Items','Owner','Expected Outcome','Priority'],
    [
      ['Phase 1: Foundation Fixes','Week 1','Fix all H1 tags (commercial + industrial pages). Update robots.txt with AI bots + correct sitemap URL. Fix "10+ Years" → "18+ Years" sitewide. Fix review count inconsistency. Create /llms.txt.','Developer + Content','Technical health score improves from 67 → 80. AI bots can now crawl site.','P0'],
      ['Phase 1: Foundation Fixes','Week 1','Add Person schema (Raghavendra Hebbur). Add WebSite + SearchAction schema. Add SameAs to LocalBusiness schema. Add Speakable schema to homepage.','Developer (2 hrs)','Author KG entity created. Brand searchbox in SERP. AI Overviews eligibility begins.','P0'],
      ['Phase 1: Foundation Fixes','Week 2','Name all certifying institutions on /credentials/. Add external authority links to /about/. Add photos of certificates if available.','Content','E-E-A-T score improves from 61 → 72.','P0'],
      ['Phase 1: Foundation Fixes','Week 2','Expand /best-vastu-consultant-bangalore/ from 650 → 2,500 words. Fix multiple H1s on remaining pages via Screaming Frog audit.','Content + Developer','Money page now competes. H1 fixes sitewide.','P0'],
      ['Phase 2: Content Depth','Week 3','Expand /testimonials/ to 2,000 words with 20 case studies. Add Review schema. Embed Google reviews widget.','Content','Testimonials page: 650 words → 2,000. Review schema active.','P1'],
      ['Phase 2: Content Depth','Week 3–4','Set meta descriptions on all 491 pages via Rank Math bulk editor. Target: 150–160 chars, keyword + CTA format.','Content (SEO writer)','CTR improvement: estimated +20% sitewide.','P1'],
      ['Phase 2: Content Depth','Week 4','Add HowTo schema to /online-vastu-consultation/. Add OfferCatalog schema to /vastu-consultation-fees/. Enable image sitemap in Rank Math.','Developer (1 hr)','Featured snippet eligibility. Price rich results. Image search coverage.','P1'],
      ['Phase 2: Content Depth','Week 4–5','Add Speakable schema to all FAQ pages. Rewrite all FAQ section intros to inverted pyramid format (answer in sentence 1).','Developer + Content','FAQPage + Speakable combo = maximum AI Overviews signal.','P0'],
      ['Phase 3: Traffic Expansion','Week 5–8','Launch blog. Publish 10 articles: south-facing house, vastu dosha, bedroom vastu, north-facing, main door direction, apartment vastu, vastu remedies, pre-purchase checklist, vastu vs feng shui, online vastu guide.','Content (SEO writer)','First informational traffic: estimated +40% in 60 days from blog alone.','P0'],
      ['Phase 3: Traffic Expansion','Week 6','Create VIDS™ methodology pillar page (2,000 words). Create vastu-without-demolition pillar page (2,500 words).','Content','Branded search capture. AI citation for VIDS queries.','P1'],
      ['Phase 3: Traffic Expansion','Week 7–8','Create NRI Vastu hub page + 5 country landing pages (USA, UK, UAE, Canada, Australia).','Content','International traffic. NRI market entry.','P1'],
      ['Phase 3: Traffic Expansion','Week 8–12','Build 25 backlinks: 5 real estate portals, 5 local news pitches, 5 architecture blogs, 10 directory citations.','Marketing','DA improvement begins. Ranking ceiling rises.','P0'],
      ['Phase 4: Authority Build','Week 9–12','Core Web Vitals optimisation: preload Inter font, self-host fonts, optimize hero images to WebP, enable LiteSpeed object cache.','Developer','LCP < 2.5s. Green CWV = ranking signal.','P1'],
      ['Phase 4: Authority Build','Week 10–12','Create YouTube channel. Record 3 videos: VIDS methodology explainer, consultation walkthrough, client success story.','Video production','Brand entity. Video SERP results. E-E-A-T experience signal.','P1'],
      ['Phase 4: Authority Build','Week 11–12','Add 200-word unique area-specific block to top 50 most-trafficked location pages.','Content','Location pages: 850 words → 1,050+. Improved local rankings.','P2'],
    ],
    [20,12,55,18,30,8],5
  );
}

// TAB 24: 12-Month Authority Roadmap
{
  const ws=sheet('24 12-Month Roadmap');
  title(ws,'12-MONTH AUTHORITY BUILDING ROADMAP','From DA 15-25 → DA 35+ | From 0 blog posts → 50+ | From AI-invisible → AI-cited',7);
  table(ws,3,
    ['Quarter','Month','Strategic Focus','Key Deliverables','KPI Targets','Priority'],
    [
      ['Q1: Fix + Foundation','Month 1','All P0 technical fixes. Schema implementation. Thin page expansion.','8 schema types added. 5 thin pages expanded. robots.txt updated. 10 blog posts live.','Technical score: 67 → 82. Content score: 58 → 70.','P0'],
      ['Q1: Fix + Foundation','Month 2','Blog acceleration. Backlink outreach begins. NRI content cluster.','10 more blog posts. 5 real estate portal backlinks. NRI hub live.','Organic traffic +30% from baseline. First blog rankings.','P0'],
      ['Q1: Fix + Foundation','Month 3','Core Web Vitals. YouTube channel launch. Local citation build.','CWV all-green. YouTube channel with 3 videos. 25 directory citations.','LCP < 2.5s. Video SERP appearances. DA +3 points.','P1'],
      ['Q2: Growth','Month 4–5','Blog continues: 30 total posts. Press outreach. Deeper location pages.','30 blog posts live. 2 press mentions. 50 location pages expanded.','Organic +80% from baseline. Local pack positions improving.','P1'],
      ['Q2: Growth','Month 5–6','Topical authority: all cluster pages live. 10 YouTube videos.','All 10 topic clusters covered. Blog at 40+ posts. 10 videos.','Topical authority: site covers 80%+ of vastu topic space.','P1'],
      ['Q3: Authority','Month 7–8','Link velocity increases. Academic/architecture outreach. Competitor gap closure.','50 total backlinks. 5 architecture blog guest posts. VIDS white paper published.','DA 30+. Ranking for 500+ new keywords.','P1'],
      ['Q3: Authority','Month 8–9','E-E-A-T: Press mentions in Times of India / Deccan Herald. Awards application.','2–3 editorial press citations. Industry award application submitted.','E-E-A-T score: 61 → 78. Press citations live.','P1'],
      ['Q4: Scale','Month 10–11','50-post blog complete. International SEO. Schema knowledge graph complete.','Blog at 50 posts. International pages complete. Full schema graph.','Organic +150% from baseline. AI citations in Perplexity/ChatGPT.','P2'],
      ['Q4: Scale + Consolidate','Month 12','Audit, refine, and compound. Review all 37 audit dimensions.','Full re-audit. Identify new gaps. Plan Year 2 strategy.','Target: organic traffic +340% vs baseline. DA 35+. 500+ ranking keywords.','P2'],
    ],
    [18,10,25,45,35,8],5
  );
}

// TAB 25: Trust Signal Analysis
{
  const ws=sheet('25 Trust Signals');
  title(ws,'TRUST SIGNAL ANALYSIS','Every signal Google and AI engines use to assess site trustworthiness',6);
  table(ws,3,
    ['Trust Factor','Current State','Score','Gap','Fix Required','Priority'],
    [
      ['Google Reviews — Count accuracy','INCONSISTENT: 248 vs 600+','1/10','Site shows different numbers. Destroys trust instantly.','Verify exact count on GBP. Update ALL pages to match verified number. Never inflate.','P0'],
      ['Google Reviews — Star rating','5.0 ⭐ EXCELLENT','9/10','None — maintain this.','Keep soliciting reviews. Respond to 100% within 48h.','P3'],
      ['SSL Certificate','✅ HTTPS ACTIVE','9/10','Verify expiry date.','Check SSL renewal date. Renew 30 days before expiry.','P3'],
      ['Physical Address Visible','🔴 CITY ONLY','3/10','No street address. Cannot verify physical presence.','Add full street address to Contact, About, footer. Needed for LocalBusiness schema.','P1'],
      ['Business Phone — Consistency','✅ CONSISTENT','9/10','+91 97391 05574 across all pages.','Maintain. Verify on GBP and all directories.','P3'],
      ['Privacy Policy','✅ PRESENT','7/10','Needs DPDP Act India compliance update.','Update Privacy Policy for India Data Protection Act. Add cookie consent banner.','P2'],
      ['Terms of Service','✅ PRESENT','7/10','Legal review recommended.','Indian law review of ToS. Add vastu result disclaimer.','P2'],
      ['Credentials — Verifiable','🔴 VERY WEAK','2/10','No institution names. Cannot independently verify any credential.','Name all certifying bodies. Add links. Upload certificate images.','P0'],
      ['Case Studies — Quality','🔴 ONLY 3','2/10','3 generic testimonials vs 3,200+ claimed consultations.','Add 20+ detailed case studies: area, property type, defect found, remedy, outcome.','P0'],
      ['Author Photo — Professional','UNKNOWN','Unknown','No mention of professional consultant photo.','Add professional photo of Raghavendra Hebbur on /about/ with alt text.','P1'],
      ['Press / Media Coverage','🔴 NONE','0/10','Zero press mentions. Major authority gap.','Pitch Bangalore Mirror, Times of India property section. Target 3+ mentions in 6 months.','P0'],
      ['Awards / Recognition','🔴 NONE','0/10','No industry recognition listed.','Apply for: Bangalore Business Awards, Real Estate Excellence Awards, Vastu association.','P1'],
      ['Payment Security Badges','🔴 NONE','0/10','For ₹51,000 transactions: no payment trust signals.','Add Razorpay / UPI verified badge on fees + contact pages.','P2'],
      ['WhatsApp Business Verified','LIKELY PRESENT','6/10','WhatsApp integration present — verify Business verification status.','Ensure WhatsApp Business account is verified and uses business name.','P2'],
      ['BNI Membership Link','MENTIONED, NOT LINKED','4/10','BNI mentioned but no profile link.','Add link to BNI profile page from /about/ and /credentials/.','P2'],
    ],
    [28,18,8,40,40,8],5
  );
}

// TAB 26: Crawl and Index
{
  const ws=sheet('26 Crawl & Index');
  title(ws,'CRAWL & INDEX ISSUES','Robots | Sitemap | Orphans | Crawl budget | Indexation',7);
  table(ws,3,
    ['Issue','Pages Affected','Severity','Root Cause','Fix','Priority'],
    [
      ['robots.txt sitemap URL wrong','All','Critical','References /sitemap.xml — file is /sitemap_index.xml','Update Sitemap: directive immediately','P0'],
      ['AI bots not explicitly allowed','All','Critical','No explicit User-agent rules for 7 AI crawlers','Add 7 User-agent Allow blocks to robots.txt','P0'],
      ['WordPress tag/category archives crawlable','Multiple','Medium','Default WP generates archive pages wasting crawl budget','Add Disallow: /tag/ /category/ /author/ to robots.txt','P2'],
      ['No image sitemap','All images','Medium','Rank Math image sitemap not enabled','Enable in Rank Math → Sitemap settings → Image Sitemap: ON','P2'],
      ['www vs non-www canonical consistency','All','High','Mixed www/non-www in robots.txt vs site serving','Confirm canonical domain. Verify 301 redirect. Update all references.','P0'],
      ['No changefreq in sitemap','491 entries','Low','Default Rank Math omits changefreq','Add: homepage weekly, services monthly, location pages monthly','P3'],
      ['Sitemap has only 1 file (page-sitemap.xml)','491 pages','Medium','No separation of content types','When blog launches: add post-sitemap.xml, image-sitemap.xml','P2'],
      ['Orphan location pages','Est. 20–50 pages','High','Pages not linked from any other page except sitemap','Screaming Frog crawl → identify 0-inbound pages → add to location hub','P1'],
      ['Deep page audit needed','All 491 pages','Medium','Screaming Frog not yet run on full site','Run full Screaming Frog crawl. Export: broken links, redirect chains, duplicate titles.','P1'],
      ['GSC Coverage report','Unknown','High','GSC submission status unknown','Verify GSC ownership. Submit sitemap_index.xml. Check Coverage report weekly.','P1'],
    ],
    [30,18,10,40,40,8],4
  );
}

// TAB 27: UX and Behavioral SEO
{
  const ws=sheet('27 UX & Behavioral');
  title(ws,'UX & BEHAVIORAL SEO','User engagement signals that influence Google rankings',6);
  table(ws,3,
    ['UX Factor','Current State','SEO Impact','Fix Required','Priority'],
    [
      ['Pogo-stick risk (thin pages)','HIGH on 650-word pages','Google interprets quick back-button clicks as dissatisfaction → ranking penalty','Expand all thin pages to 2,000+ words with engaging, useful content','P0'],
      ['Time on page','LIKELY LOW — thin + no video','Low dwell time signals low satisfaction → rankings suppressed','Add videos, step-by-step guides, FAQ accordions, case studies to increase engagement','P1'],
      ['Popup timing','MEDIUM RISK','Full-screen popup on page load = Google mobile interstitial penalty risk','Trigger popup at 60%+ scroll or 30+ seconds. Ensure it is NOT full-screen on mobile.','P1'],
      ['CTA placement','GOOD — WhatsApp prominent','Good conversion signal','A/B test CTA position. Consider inline CTA mid-page on long pages.','P3'],
      ['Mobile UX','ESTIMATED GOOD','vv2 CSS has responsive breakpoints','Test on actual devices: 320px, 375px, 414px, 768px','P1'],
      ['Font readability','GOOD — Inter font','Good readability signal','Ensure body text ≥ 16px on mobile. Check line height ≥ 1.6.','P2'],
      ['Social proof above fold','PARTIAL','Trust strip present but star rating/review count should be larger','Add Google Reviews widget widget above fold on homepage','P1'],
      ['Scroll depth','UNKNOWN','Deep scroll = engagement signal','Add Google Analytics 4 scroll depth tracking. Target 60%+ on key pages.','P2'],
      ['Page navigation clarity','GOOD','Clear primary navigation','Add sticky header on scroll for mobile users','P2'],
      ['Internal search','ABSENT','Users who search site are highly engaged — no search = missed signal','Add WordPress search in header or after hero section','P3'],
    ],
    [25,22,28,38,8],4
  );
}

// TAB 28: Mobile SEO
{
  const ws=sheet('28 Mobile SEO');
  title(ws,'MOBILE SEO AUDIT','Google mobile-first indexing | Touch targets | Speed | Interstitials',7);
  table(ws,3,
    ['Factor','Status','Issue','Fix Required','Priority','Impact'],
    [
      ['Mobile-First Indexing','ACTIVE','Google indexes mobile version first. Site must be fully functional on mobile.','Verify all content visible on mobile. No desktop-only content.','P0','Rankings'],
      ['Mobile Page Speed','🔴 NEEDS AUDIT','Mobile LCP likely 3.5–5s. Desktop is always faster. Gap matters.','Run PageSpeed Insights Mobile. Target 90+ score. Prioritise mobile optimisation.','P0','Rankings'],
      ['Touch Target Size','⚠ VERIFY','vv2 CTA padding: 13px 22px — may not meet 48px minimum touch target.','Add min-height: 48px min-width: 48px to all interactive elements.','P1','UX + Rankings'],
      ['Mobile Popup / Interstitial','🔴 RISK','Free 5-minute assessment popup. If full-screen on mobile → Google penalty.','Verify popup is bottom-sheet style on mobile. NOT full-screen. NOT on page load.','P0','Rankings penalty risk'],
      ['Viewport Meta','LIKELY SET','WordPress sets viewport automatically.','Verify: <meta name="viewport" content="width=device-width, initial-scale=1">','P3','Basic'],
      ['Horizontal Scroll','⚠ VERIFY','Stats grid is 4-column — may overflow on 320px screens.','Test on 320px. Ensure .stats wraps to 2-column at 480px breakpoint.','P1','UX'],
      ['Font Size on Mobile','⚠ VERIFY','Body text must be ≥ 16px on mobile to avoid zoom trigger.','Check computed body font-size on mobile. Adjust if < 16px.','P1','UX + Rankings'],
      ['Lazy Loading — Hero','🔴 FIX','WordPress auto-lazy loads all images including hero images.','Add loading=eager to all hero images. Dramatically improves mobile LCP.','P0','LCP'],
      ['Responsive Images (srcset)','UNKNOWN','Without srcset, mobile loads desktop-sized images.','Add srcset to all content images for responsive serving.','P1','Speed'],
      ['AMP','NOT PRESENT','AMP not required but can help mobile page speed.','Consider AMP for blog posts when blog launches.','P3','Speed'],
    ],
    [25,15,35,38,8,12],4
  );
}

// TAB 29: Image SEO
{
  const ws=sheet('29 Image SEO');
  title(ws,'IMAGE SEO AUDIT','Alt text | Format | Compression | Sitemap | LCP | Schema',6);
  table(ws,3,
    ['Issue','Affected Pages','Fix','Priority','Impact'],
    [
      ['All images missing keyword-rich alt text','Entire site','Add descriptive alt to every image. Format: "vastu consultant raghavendra hebbur bangalore" / "lecher antenna geopathic stress scan". Required for accessibility + ranking.','P0','Image search traffic + WCAG'],
      ['Image format unknown (likely not all WebP)','Entire site','Convert all JPEG/PNG to WebP. Plugin: ShortPixel or Imagify. Target <100KB per image.','P1','Page speed + Core Web Vitals'],
      ['No image sitemap','All images','Enable Rank Math Image Sitemap setting. Submit to GSC. Google Images = 20%+ of search.','P2','Google Images traffic'],
      ['Hero images likely lazy-loaded','All pages','Add loading=eager fetchpriority=high to above-fold hero images. Critical for LCP.','P0','LCP / Rankings'],
      ['No explicit width/height on images','All pages','Add explicit width and height attributes to all img tags. Prevents CLS.','P1','CLS / Rankings'],
      ['No ImageObject schema for consultant photo','/ about/','Add ImageObject JSON-LD for Raghavendra Hebbur\'s professional photo. Helps Google Image Knowledge Panel.','P2','Brand entity'],
      ['Image filenames not keyword-optimised','All images','Rename files: vastu-consultant-bangalore-raghavendra-hebbur.jpg not IMG_001.jpg','P2','Image search rankings'],
      ['No captions on key images','Service pages','Add keyword-rich captions to consultation and methodology images.','P3','NLP context for images'],
      ['Social share image (OG image)','All pages','Verify og:image is 1200×630px, loads fast (<100KB), exists on all pages.','P1','Social CTR + Discover'],
    ],
    [30,22,45,8,18],3
  );
}

// TAB 30: Future SEO Risk Analysis
{
  const ws=sheet('30 Future SEO Risks');
  title(ws,'FUTURE SEO RISK ANALYSIS','Algorithm risks | Competitive threats | Compliance risks | Technical debt',6);
  table(ws,3,
    ['Risk','Probability','Impact','Mitigation Strategy','Priority'],
    [
      ['Google HCU (Helpful Content) penalty — thin pages','HIGH — thin pages exist today','Critical — can deindex entire site','Expand ALL pages to 1,500+ words. Demonstrate real E-E-A-T. Do not publish AI-only content.','P0'],
      ['Competitor blog launch — keyword lock-out','HIGH — competitors growing','High — informational keyword space locked','Launch blog immediately. Own 50+ informational keywords before competitors entrench.','P0'],
      ['AI-generated content detection','MEDIUM — content may read generic','High — quality rater downgrade','Add: proprietary VIDS data, personal voice, specific client outcomes, first-hand experience.','P1'],
      ['Google review count drop / management issue','LOW — 5.0 rating stable','Medium — affects local pack','Respond to all reviews. Encourage satisfied clients. Flag fake negative reviews promptly.','P2'],
      ['Core Web Vitals threshold tightening','MEDIUM — Google raises bar','High — rankings drop','Continuously monitor CWV. Target: LCP < 2.0s, INP < 150ms, CLS < 0.05.','P1'],
      ['Local pack displacement by new entrant','MEDIUM — as more Vastu consultants optimize locally','High — revenue impact','Strengthen local signals: more reviews, more citations, deeper GBP, more location pages.','P1'],
      ['Domain authority stagnation','HIGH — no active link building visible','High — ranking ceiling stuck','Structured link-building program. Target +10 DA points per year.','P0'],
      ['DPDP Act India compliance failure','HIGH — new law in effect','Medium — legal risk + trust','Update Privacy Policy for India Data Protection Act. Add cookie consent. Data audit.','P1'],
      ['Negative SEO attack (toxic link injection)','LOW — Vastu is low-risk niche','Medium','Monitor backlinks monthly via Ahrefs/Semrush. Maintain Disavow file.','P3'],
      ['Topical authority dilution if off-niche content added','LOW if content is disciplined','Medium','Publish ONLY Vastu-topic content. No off-topic lifestyle or astrology content.','P2'],
    ],
    [35,12,12,50,8],3
  );
}

// ─── Save workbook ──────────────────────────────────────────────────────────
const outPath='C:\\Users\\raghu\\VV\\VardhiniVastu_SEO_Master_Audit_2026.xlsx';
wb.xlsx.writeFile(outPath).then(()=>{
  console.log('✅ SUCCESS:', outPath);
  console.log('Sheets:', wb.worksheets.length);
}).catch(e=>{
  console.error('❌ ERROR:', e.message);
  process.exit(1);
});
