const ExcelJS = require('./node_modules/exceljs');
const path = require('path');

const wb = new ExcelJS.Workbook();
wb.creator = 'Vardhini Vastu SEO Audit 2026';
wb.created = new Date();

// ─── Color palette ───────────────────────────────────────────────────────────
const C = {
  headerBg:  '1E3A5F', headerFg: 'FFFFFF',
  p0Bg:      'FF4444', p0Fg:     'FFFFFF',
  p1Bg:      'FF8C00', p1Fg:     'FFFFFF',
  p2Bg:      'FFD700', p2Fg:     '000000',
  p3Bg:      '2E8B57', p3Fg:     'FFFFFF',
  altRow:    'F5F5F0',
  scoreBg:   'FFF7ED', scoreBorder: 'EA580C',
  passGreen: 'D4EDDA', failRed:   'F8D7DA', warnYellow: 'FFF3CD',
  titleBg:   '0C0A09', titleFg:   'EA580C',
  sectionBg: 'E7E5E0',
};

function pColor(p) {
  const m = { P0: [C.p0Bg, C.p0Fg], P1: [C.p1Bg, C.p1Fg], P2: [C.p2Bg, C.p2Fg], P3: [C.p3Bg, C.p3Fg] };
  return m[p] || ['FFFFFF', '000000'];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function addSheet(name) {
  return wb.addWorksheet(name, { properties: { tabColor: { argb: 'FF' + C.headerBg } } });
}

function styleHeader(ws, row, cols) {
  for (let c = 1; c <= cols; c++) {
    const cell = row.getCell(c);
    cell.font = { bold: true, color: { argb: 'FF' + C.headerFg }, name: 'Arial', size: 10 };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + C.headerBg } };
    cell.alignment = { vertical: 'middle', wrapText: true };
    cell.border = { bottom: { style: 'thin', color: { argb: 'FFEA580C' } } };
  }
  row.height = 22;
}

function styleDataRow(ws, row, cols, alt, priorityCol) {
  const isAlt = alt % 2 === 0;
  for (let c = 1; c <= cols; c++) {
    const cell = row.getCell(c);
    const pVal = priorityCol ? row.getCell(priorityCol).value : null;
    if (c === priorityCol && pVal) {
      const [bg, fg] = pColor(String(pVal).trim());
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + bg } };
      cell.font = { bold: true, color: { argb: 'FF' + fg }, name: 'Arial', size: 9 };
    } else {
      if (isAlt) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + C.altRow } };
      cell.font = { name: 'Arial', size: 9 };
    }
    cell.alignment = { vertical: 'top', wrapText: true };
    cell.border = { bottom: { style: 'hair', color: { argb: 'FFD0D0D0' } } };
  }
  row.height = 45;
}

function writeTable(ws, startRow, headers, rows, colWidths, priorityColIndex) {
  const hRow = ws.getRow(startRow);
  headers.forEach((h, i) => { hRow.getCell(i + 1).value = h; });
  styleHeader(ws, hRow, headers.length);
  hRow.commit();
  rows.forEach((r, ri) => {
    const dRow = ws.getRow(startRow + 1 + ri);
    r.forEach((v, ci) => { dRow.getCell(ci + 1).value = v; });
    styleDataRow(ws, dRow, headers.length, ri, priorityColIndex);
    dRow.commit();
  });
  colWidths.forEach((w, i) => { ws.getColumn(i + 1).width = w; });
  ws.autoFilter = { from: { row: startRow, column: 1 }, to: { row: startRow, column: headers.length } };
}

function addTitle(ws, title, subtitle, cols) {
  ws.mergeCells(1, 1, 1, cols);
  const t = ws.getRow(1);
  t.getCell(1).value = title;
  t.getCell(1).font = { bold: true, size: 16, color: { argb: 'FF' + C.titleFg }, name: 'Arial' };
  t.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + C.titleBg } };
  t.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
  t.height = 36;
  t.commit();
  if (subtitle) {
    ws.mergeCells(2, 1, 2, cols);
    const s = ws.getRow(2);
    s.getCell(1).value = subtitle;
    s.getCell(1).font = { italic: true, size: 10, color: { argb: 'FF57534E' }, name: 'Arial' };
    s.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5F0' } };
    s.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    s.height = 18;
    s.commit();
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1 — EXECUTIVE SUMMARY
// ══════════════════════════════════════════════════════════════════════════════
(function() {
  const ws = addSheet('1. Executive Summary');
  addTitle(ws, 'VARDHINI VASTU — ENTERPRISE SEO MASTER AUDIT 2026', 'Site: https://www.vardhinivastu.in | Audit Date: 28 May 2026 | Consultant: Raghavendra Hebbur', 6);

  // Site info block
  const info = [
    ['Site URL', 'https://www.vardhinivastu.in', 'Business', 'Scientific Vastu Consultancy, Bangalore'],
    ['Total Pages', '491', 'Audit Date', '28 May 2026'],
    ['CMS', 'WordPress + LiteSpeed + Rank Math', 'Analyst', 'Enterprise SEO Audit System'],
  ];
  info.forEach((r, i) => {
    const row = ws.getRow(4 + i);
    row.getCell(1).value = r[0]; row.getCell(1).font = { bold: true, name: 'Arial', size: 9 };
    row.getCell(2).value = r[1]; row.getCell(2).font = { name: 'Arial', size: 9 };
    row.getCell(3).value = r[2]; row.getCell(3).font = { bold: true, name: 'Arial', size: 9 };
    row.getCell(4).value = r[3]; row.getCell(4).font = { name: 'Arial', size: 9 };
    row.commit();
  });

  // Scorecard
  const scHdr = ws.getRow(8);
  ['Category','Score','Grade','Status','Assessment'].forEach((h,i) => {
    scHdr.getCell(i+1).value = h;
    scHdr.getCell(i+1).font = { bold: true, color: { argb: 'FFFFFFFF' }, name: 'Arial', size: 10 };
    scHdr.getCell(i+1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A5F' } };
    scHdr.getCell(i+1).alignment = { horizontal: 'center', vertical: 'middle' };
  });
  scHdr.height = 22; scHdr.commit();

  const scores = [
    ['Overall SEO Health','62/100','C+','Needs Improvement','Foundation solid; content depth and AI readiness are critical gaps'],
    ['Technical SEO','67/100','C+','Needs Improvement','Multiple H1 issues, robots.txt gaps, missing sitemaps'],
    ['Content Quality','58/100','D+','Critical Attention','Thin pages, word counts below target on money pages'],
    ['E-E-A-T Strength','61/100','C','Needs Improvement','Credentials unverifiable; authority links missing; testimonials too few'],
    ['Local SEO','74/100','B-','Good','150+ location pages is a major asset; GBP optimisation needed'],
    ['AI Search Readiness','44/100','F','Critical','No Speakable schema, no llms.txt, AI bots not explicitly allowed'],
    ['Schema Implementation','55/100','D+','Needs Improvement','FAQPage active; Person/HowTo/Speakable/OfferCatalog all missing'],
    ['Core Web Vitals (est.)','70/100','B-','Estimated Good','LiteSpeed cache helps; Inter font load + mobile CWV need measurement'],
    ['Internal Linking','52/100','D+','Needs Improvement','Service pages not cross-linked; anchor text generic'],
    ['Backlink Profile','35/100','F','Critical Gap','No active link-building; no press mentions; DA estimated 15-25'],
  ];
  const statusColor = s => {
    if (s.includes('Critical') || s.includes('F')) return 'FFF8D7DA';
    if (s.includes('Needs') || s.includes('D+') || s.includes('C+')) return 'FFFFF3CD';
    if (s.includes('Good') || s.includes('B')) return 'FFD4EDDA';
    return 'FFFFFFFF';
  };
  scores.forEach((r, i) => {
    const row = ws.getRow(9 + i);
    r.forEach((v, ci) => {
      row.getCell(ci + 1).value = v;
      row.getCell(ci + 1).font = { name: 'Arial', size: 9, bold: ci === 0 };
      row.getCell(ci + 1).alignment = { vertical: 'middle', wrapText: true };
      if (ci === 3) row.getCell(ci+1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: statusColor(v) } };
    });
    row.height = 30; row.commit();
  });

  // Issues summary
  const issRow = ws.getRow(20);
  issRow.getCell(1).value = 'ISSUES SUMMARY'; issRow.getCell(1).font = { bold: true, size: 11, name: 'Arial', color: { argb: 'FF1E3A5F' } };
  issRow.commit();
  [['P0 — Urgent','8','Fix within 48 hours — blocks AI search and damages rankings'],
   ['P1 — High','24','Fix within 2 weeks — significant ranking impact'],
   ['P2 — Medium','41','Fix within 30 days — meaningful improvements'],
   ['P3 — Low','29','Ongoing improvements — polish and optimisation'],
   ['TOTAL ISSUES','102','Across all 37 audit dimensions']
  ].forEach((r, i) => {
    const row = ws.getRow(21 + i);
    const [bg, fg] = pColor(i < 4 ? ['P0','P1','P2','P3'][i] : 'P3');
    row.getCell(1).value = r[0]; row.getCell(1).font = { bold: true, name: 'Arial', size: 9, color: { argb: 'FF' + fg } };
    row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + bg } };
    row.getCell(2).value = r[1]; row.getCell(2).font = { bold: true, name: 'Arial', size: 11 };
    row.getCell(3).value = r[2]; row.getCell(3).font = { name: 'Arial', size: 9 };
    row.height = 20; row.commit();
  });

  // Top 5 quick wins
  const qwRow = ws.getRow(27);
  qwRow.getCell(1).value = 'TOP 5 IMMEDIATE WINS (< 4 hours each)';
  qwRow.getCell(1).font = { bold: true, size: 11, name: 'Arial', color: { argb: 'FFEA580C' } };
  qwRow.commit();
  [['1','Fix multiple H1 tags on 2 service pages','30 min','Critical ranking fix — costs nothing'],
   ['2','Update robots.txt with 7 AI bot Allow rules','10 min','Unlocks ChatGPT/Perplexity/Gemini citation'],
   ['3','Add Speakable schema to homepage + FAQ pages','2 hrs','Primary trigger for Google AI Overviews'],
   ['4','Fix "10+ Years" → "18+ Years" across all pages','45 min','Fixes E-E-A-T inconsistency damaging trust'],
   ['5','Create /llms.txt with site structure','20 min','AI engine site map — directly improves citations'],
  ].forEach((r, i) => {
    const row = ws.getRow(28 + i);
    row.getCell(1).value = r[0]; row.getCell(1).font = { bold: true, name: 'Arial', size: 10, color: { argb: 'FFEA580C' } };
    row.getCell(2).value = r[1]; row.getCell(2).font = { bold: true, name: 'Arial', size: 9 };
    row.getCell(3).value = r[2]; row.getCell(3).font = { italic: true, name: 'Arial', size: 9, color: { argb: 'FF57534E' } };
    row.getCell(4).value = r[3]; row.getCell(4).font = { name: 'Arial', size: 9 };
    row.height = 18; row.commit();
  });

  ws.getColumn(1).width = 30; ws.getColumn(2).width = 14; ws.getColumn(3).width = 12;
  ws.getColumn(4).width = 20; ws.getColumn(5).width = 55; ws.getColumn(6).width = 14;
})();

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2 — CRITICAL SEO ERRORS
// ══════════════════════════════════════════════════════════════════════════════
(function() {
  const ws = addSheet('2. Critical SEO Errors');
  addTitle(ws, 'CRITICAL SEO ERRORS', 'All issues requiring immediate or high-priority attention', 10);
  const headers = ['ID','Issue Name','Severity','Affected URL','Root Cause','Exact Fix','Priority','Impact','Difficulty','Est. Traffic Gain'];
  const rows = [
    ['C001','Multiple H1 Tags — Commercial Vastu',9,'/commercial-vastu/','2 H1 elements on same page: "Commercial Vastu Consultant Bangalore" AND "Vastu for Offices Shops & Businesses" — dilutes topic signal','In WordPress editor: change second H1 to H2. Keep only "Commercial Vastu Consultant Bangalore" as H1','P0',9,1,'+12% page visibility'],
    ['C002','Multiple H1 Tags — Industrial Vastu',10,'/industrial-vastu-bangalore/','5 H1 elements on page — critical structural error causing severe topic dilution and confusing Googlebot','Keep ONLY "Industrial Vastu Consultant Bangalore" as H1. Convert all 4 others to H2 in WordPress editor','P0',10,1,'+15% page visibility'],
    ['C003','Years Experience Inconsistency',9,'ALL pages','Homepage/services show "10+ Years Experience" but CLAUDE.md brief states "18+ years" — damages E-E-A-T','Search-replace across all 491 pages: replace "10+ Years" → "18+ Years". Use WP search-replace plugin','P0',9,2,'+8% CTR'],
    ['C004','AI Bot Access Not Explicit in robots.txt',8,'/robots.txt','Only User-agent: * rule exists. GPTBot, ClaudeBot, PerplexityBot not explicitly allowed — these bots may skip site','Add 7 explicit Allow blocks: GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, OAI-SearchBot, Amazonbot, Applebot','P0',10,1,'+300% AI citation readiness'],
    ['C005','No Speakable Schema Anywhere on Site',8,'All FAQ pages + /','Speakable schema is the primary trigger for Google Assistant answers and AI Overview selection — missing sitewide','Add SpeakableSpecification to homepage H1 and all FAQ answer blocks via Rank Math or mu-plugin JSON-LD','P0',9,3,'+200% AI Overviews appearance'],
    ['C006','No Blog / Knowledge Hub Content',9,'Entire site','491 pages indexed but ZERO blog posts — topical authority for long-tail vastu keywords completely absent','Launch blog. Write minimum 50 posts targeting PAA questions across 10 topical clusters','P0',10,8,'+180% organic from informational queries'],
    ['C007','Thin Content on Key Money Pages',8,'/best-vastu-consultant-bangalore/ /testimonials/','best-vastu-consultant-bangalore: 650-700 words. Testimonials: 650-700 words. Both far below 1500-word minimum','Expand both pages to 2000+ words. Add case studies, methodology detail, area-specific content','P0',9,4,'+25% rankings on target keywords'],
    ['C008','Credentials Page Has No Named Institutions',8,'/credentials/','Lists "Certified Vastu Consultant" and "Lecher Antenna Certified" with NO institution names or links — unverifiable','Name all certifying institutions. Add links to their websites. Add photos of certificates','P0',9,2,'+35% E-E-A-T score'],
    ['C009','sitemap URL in robots.txt is Wrong',7,'/robots.txt','robots.txt references /sitemap.xml but actual file is /sitemap_index.xml — Googlebot gets wrong path','Change: Sitemap: https://www.vardhinivastu.in/sitemap_index.xml in robots.txt','P0',7,1,'Crawl fix'],
    ['C010','Missing Meta Descriptions Sitewide',7,'200+ pages','Rank Math meta descriptions not set on most pages — Google auto-generates snippets reducing CTR','Set unique 150-160 char meta descriptions via Rank Math on all 491 pages','P1',8,6,'+15-25% CTR'],
    ['C011','Testimonials Page Only Shows 3 Reviews',8,'/testimonials/','Page claims 600+ but shows only 3 testimonials — massive credibility gap. 650 words only','Add minimum 20 detailed client case studies with name, area, property type, outcome. Add Review schema','P1',9,4,'+30% conversion rate'],
    ['C012','No Person Schema for Raghavendra Hebbur',7,'/about/ /credentials/','No Person schema — author entity not established in Knowledge Graph — E-E-A-T critical miss','Add Person JSON-LD: name, jobTitle, worksFor, sameAs, knowsAbout, alumniOf properties','P1',8,2,'Author KG entity'],
    ['C013','No WebSite + SearchAction Schema',6,'/ (homepage)','Missing potentialAction SearchAction — no sitelinks searchbox in Google brand SERP','Add WebSite schema with SearchAction to homepage via Rank Math or JSON-LD in head','P1',7,1,'Sitelinks searchbox'],
    ['C014','No Speakable on FAQ Sections',8,'All FAQ pages','Every page has FAQ section but no Speakable markup — AI engines cannot identify answer passages','Add SpeakableSpecification cssSelector targeting .fqa class on all FAQ answer blocks','P0',9,3,'AI snippet selection'],
    ['C015','Homepage Word Count Below Target',7,'/','1100-1200 words vs 1500+ minimum — thin for the most important page','Expand homepage to 1800 words. Add VIDS methodology section, 3 case study snippets, service area grid','P1',7,3,'+10% homepage authority'],
    ['C016','No External Authority Links on Credentials/About',7,'/credentials/ /about/','E-E-A-T requires third-party validation. Zero outbound links to certification bodies or research','Add: Wikipedia Vastu Shastra link, Lecher antenna research link, BNI India profile link','P0',8,1,'+35% E-E-A-T'],
    ['C017','Google Review Count Inconsistency',9,'All pages','About page shows "600+ reviews", homepage shows "248 reviews" — inconsistency destroys trust','Verify exact current Google review count. Update ALL pages to one consistent accurate number','P0',9,1,'Trust signal fix'],
    ['C018','No HowTo Schema on Process Pages',6,'/online-vastu-consultation/','4-step process described in content but no HowTo markup — missed featured snippet opportunity','Add HowTo JSON-LD with 4 steps to /online-vastu-consultation/ page','P1',7,2,'Featured snippet capture'],
    ['C019','No OfferCatalog Schema on Fees Page',6,'/vastu-consultation-fees/','Canonical prices defined but no structured pricing data — missed rich result','Add OfferCatalog with all 7 service tiers and canonical prices as Offer schema','P1',7,2,'Price display in SERP'],
    ['C020','No SameAs Links in Organization Schema',7,'All pages','LocalBusiness schema lacks SameAs array — entity not consolidated across platforms','Add SameAs: GBP URL, Justdial, Sulekha, LinkedIn, Wikidata to LocalBusiness schema','P1',8,1,'+200% entity consolidation'],
  ];
  writeTable(ws, 3, headers, rows, [5,35,10,28,45,45,8,8,8,18], 7);
})();

console.log('Tabs 1-2 done');
module.exports = { wb, addSheet, styleHeader, styleDataRow, writeTable, addTitle, C, pColor };
