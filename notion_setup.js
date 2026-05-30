// Vardhini Vastu — Notion SEO Command Centre Builder
// Run: node notion_setup.js

const TOKEN = 'ntn_N42475980561Shfk0GqFsK0xgABsfI2YhDI2SQl0PG03O8';
const ROOT_PAGE = '2250fd2d-33e8-80f3-9031-fdef2d034f46';
const HEADERS = {
  'Authorization': `Bearer ${TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json'
};

async function api(method, path, body) {
  const https = require('https');
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'api.notion.com',
      path: `/v1/${path}`,
      method,
      headers: { ...HEADERS, ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}) }
    };
    const req = https.request(opts, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch(e) { resolve(body); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

const t = (text, bold, color) => ({
  type: 'text',
  text: { content: text },
  ...(bold || color ? { annotations: { ...(bold ? { bold: true } : {}), ...(color ? { color } : {}) } } : {})
});

const h1 = (text) => ({ object:'block', type:'heading_1', heading_1:{ rich_text:[t(text)] } });
const h2 = (text) => ({ object:'block', type:'heading_2', heading_2:{ rich_text:[t(text)] } });
const h3 = (text) => ({ object:'block', type:'heading_3', heading_3:{ rich_text:[t(text)] } });
const para = (text, bold) => ({ object:'block', type:'paragraph', paragraph:{ rich_text:[t(text, bold)] } });
const bullet = (text, bold) => ({ object:'block', type:'bulleted_list_item', bulleted_list_item:{ rich_text:[t(text, bold)] } });
const num = (text) => ({ object:'block', type:'numbered_list_item', numbered_list_item:{ rich_text:[t(text)] } });
const divider = () => ({ object:'block', type:'divider', divider:{} });
const callout = (text, emoji) => ({ object:'block', type:'callout', callout:{ rich_text:[t(text)], icon:{ type:'emoji', emoji } } });
const toggle = (text, children) => ({ object:'block', type:'toggle', toggle:{ rich_text:[t(text, true)], children } });

async function addBlocks(pageId, blocks) {
  // Notion allows max 100 blocks per request
  for (let i = 0; i < blocks.length; i += 90) {
    const chunk = blocks.slice(i, i + 90);
    const res = await api('PATCH', `blocks/${pageId}/children`, { children: chunk });
    if (res.object === 'error') console.error('Block error:', res.message, JSON.stringify(chunk[0]).slice(0,100));
  }
}

async function createSubPage(parentId, title, emoji) {
  const res = await api('POST', 'pages', {
    parent: { type: 'page_id', page_id: parentId },
    properties: { title: { title: [{ text: { content: `${emoji} ${title}` } }] } }
  });
  if (res.object === 'error') { console.error('Page error:', res.message); return null; }
  console.log(`  Created page: ${emoji} ${title} [${res.id}]`);
  return res.id;
}

async function createDatabase(parentId, title, emoji, properties) {
  const res = await api('POST', 'databases', {
    parent: { type: 'page_id', page_id: parentId },
    title: [{ type: 'text', text: { content: `${emoji} ${title}` } }],
    is_inline: true,
    properties
  });
  if (res.object === 'error') { console.error('DB error:', res.message); return null; }
  console.log(`  Created database: ${emoji} ${title} [${res.id}]`);
  return res.id;
}

async function addDbRow(dbId, props) {
  const res = await api('POST', 'pages', { parent: { database_id: dbId }, properties: props });
  if (res.object === 'error') console.error('Row error:', res.message);
  return res;
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🏗  Building Vardhini Vastu SEO Command Centre in Notion...\n');

  // ── 1. Root page overview blocks ──────────────────────────────────────────
  console.log('1. Adding overview to root page...');
  await addBlocks(ROOT_PAGE, [
    callout('Last updated: May 2026  |  vardhinivastu.in is LIVE  |  index.html deployed  |  68 pages live  |  vv-blank.php footer updated', '📡'),
    divider(),
    h2('📊 Site Status Snapshot'),
    bullet('vardhinivastu.in — LIVE (index.html static homepage, 68 standalone pages)'),
    bullet('vardhinivastu.com — LIVE (primary domain, footer helped 24hr ranking)'),
    bullet('Pages live: 68 (20 Bangalore localities + 15 Indian cities + 8 international + 25 residential rooms)'),
    bullet('Pages pending build: 30 extended Bangalore + 24 apartment targeting + 23 industrial = 77 pages'),
    bullet('Footer: New navy/gold footer auto-injected on ALL standalone pages via vv-blank.php'),
    bullet('GitHub repo: Initialized locally — pending remote push'),
    bullet('Cloudflare Pages: Pending setup'),
    bullet('GMB: NOT claimed yet — HIGHEST PRIORITY'),
    divider(),
    h2('🔥 Top 5 Priorities RIGHT NOW'),
    callout('Do these today for maximum 24-hour ranking impact', '⚡'),
    num('GSC: Go to search.google.com/search-console → URL Inspection → paste https://vardhinivastu.in/ → Request Indexing'),
    num('GMB: Go to business.google.com → Claim/Create Vardhini Vastu listing → fill ALL 20 fields'),
    num('LinkedIn post: Share vardhinivastu.in with #vastu #bangalore #vastuexpert'),
    num('Quora: Answer 2 questions about vastu consultant bangalore with link to site'),
    num('Whatsapp: Broadcast the new URL to 20+ contacts for click signals'),
    divider(),
    h2('🗺  Navigation'),
    para('Use the sub-pages below to manage every aspect of the SEO strategy:'),
  ]);

  // ── 2. Master Task List Database ──────────────────────────────────────────
  console.log('2. Creating Master Task List database...');
  const taskDbId = await createDatabase(ROOT_PAGE, 'Master Task List', '✅', {
    'Task': { title: {} },
    'Category': { select: { options: [
      { name: 'GMB', color: 'red' },
      { name: 'Technical SEO', color: 'orange' },
      { name: 'Content Build', color: 'yellow' },
      { name: 'AI Citation', color: 'purple' },
      { name: 'Backlinks', color: 'blue' },
      { name: 'Social Signals', color: 'green' },
      { name: 'Site Parity', color: 'pink' },
      { name: 'Map Rank', color: 'brown' },
      { name: 'Google News', color: 'gray' },
      { name: 'Analytics', color: 'default' },
    ]}},
    'Status': { select: { options: [
      { name: 'Done', color: 'green' },
      { name: 'In Progress', color: 'yellow' },
      { name: 'Pending', color: 'red' },
    ]}},
    'Priority': { select: { options: [
      { name: 'High', color: 'red' },
      { name: 'Medium', color: 'yellow' },
      { name: 'Low', color: 'gray' },
    ]}},
    'Notes': { rich_text: {} },
  });

  if (taskDbId) {
    console.log('  Adding task rows...');
    const tasks = [
      // GMB
      ['Claim / verify Google Business Profile', 'GMB', 'Pending', 'High', 'Go to business.google.com — most impactful action available'],
      ['Set primary category: Vastu Consultant', 'GMB', 'Pending', 'High', 'Add secondary: Feng Shui Consultant, Interior Designer'],
      ['Write 750-char GMB description with VIDS and geopathic keywords', 'GMB', 'Pending', 'High', ''],
      ['Upload 10+ photos: office, tools, Lecher Antenna, audits', 'GMB', 'Pending', 'High', ''],
      ['Add all services with descriptions and prices', 'GMB', 'Pending', 'High', ''],
      ['Set opening hours Mon-Sat 10am-7pm', 'GMB', 'Pending', 'Medium', ''],
      ['Add service area: all 50+ Bangalore localities', 'GMB', 'Pending', 'Medium', ''],
      ['Post first GMB update linking to vardhinivastu.in', 'GMB', 'Pending', 'High', ''],
      ['Enable messaging on GMB', 'GMB', 'Pending', 'Medium', ''],
      ['Request 10 reviews from past clients', 'GMB', 'Pending', 'High', 'Reviews = #1 Local Pack ranking factor'],
      // Technical SEO
      ['GSC: Request indexing for vardhinivastu.in homepage', 'Technical SEO', 'Pending', 'High', 'Do immediately after this'],
      ['Submit XML sitemap to GSC', 'Technical SEO', 'Pending', 'High', 'URL: vardhinivastu.in/sitemap.xml'],
      ['Verify robots.txt not blocking any pages', 'Technical SEO', 'Pending', 'High', ''],
      ['Set Rank Math meta on all 68 live pages', 'Technical SEO', 'Pending', 'High', 'SEO title + meta desc + focus keyword'],
      ['Run Core Web Vitals baseline (PageSpeed Insights)', 'Technical SEO', 'Pending', 'Medium', ''],
      ['Add GA4 tracking code to all standalone HTML pages', 'Technical SEO', 'Pending', 'High', ''],
      ['Create /llms.txt file for AI crawler access', 'Technical SEO', 'Pending', 'High', 'Critical for ChatGPT/Gemini/Perplexity citations'],
      ['Verify canonical tags on all 68 pages', 'Technical SEO', 'Pending', 'Medium', ''],
      ['Check mobile rendering on 5 key pages', 'Technical SEO', 'Pending', 'Medium', ''],
      ['Set up 301 redirect .com → .in or vice versa if needed', 'Technical SEO', 'Pending', 'Low', ''],
      // Content Build - Done
      ['Build 20 Bangalore locality pages', 'Content Build', 'Done', 'High', 'Live on vardhinivastu.in'],
      ['Build 15 Indian city pages', 'Content Build', 'Done', 'High', 'Live on vardhinivastu.in'],
      ['Build 8 international location pages', 'Content Build', 'Done', 'High', 'Live on vardhinivastu.in'],
      ['Build 25 residential room pages', 'Content Build', 'Done', 'High', 'Pushed to WP posts IDs 283-307'],
      ['Deploy production index.html homepage', 'Content Build', 'Done', 'High', 'Static file at vardhinivastu.in root'],
      // Content Build - Pending
      ['Build 30 extended Bangalore locality pages (South/East/North/West corridors)', 'Content Build', 'Pending', 'High', 'Kanakapura, Hoskote, Devanahalli, Tumkur corridors'],
      ['Build 14 apartment targeting pages (Bangalore builders)', 'Content Build', 'Pending', 'High', 'Prestige/Brigade/Sobha etc — no brand mention, category pages'],
      ['Build 10 apartment targeting pages (other Indian cities)', 'Content Build', 'Pending', 'High', ''],
      ['Build 10 Bangalore industrial area pages', 'Content Build', 'Pending', 'Medium', 'Peenya, Bommasandra, Whitefield IT, KIADB etc'],
      ['Build 13 India industrial area pages', 'Content Build', 'Pending', 'Medium', 'Chennai OMR, Pune MIDC, Noida sector etc'],
      ['Rewrite 15 Educational Hub pages (old article format → vv-page-hero)', 'Content Build', 'Pending', 'Medium', ''],
      ['Rewrite 10 House Directions pages', 'Content Build', 'Pending', 'Medium', ''],
      // AI Citation
      ['Create /llms.txt with service summary and key entity facts', 'AI Citation', 'Pending', 'High', 'Enables ChatGPT/Perplexity to cite Vardhini Vastu'],
      ['Build entity/knowledge page (Wikipedia-style about Vardhini Vastu)', 'AI Citation', 'Pending', 'High', ''],
      ['Create Wikidata entity for Raghavendra Hebbur', 'AI Citation', 'Pending', 'Medium', 'wikidata.org/wiki/Special:NewItem'],
      ['Create Clutch.co profile', 'AI Citation', 'Pending', 'Medium', ''],
      ['Create Crunchbase profile', 'AI Citation', 'Pending', 'Medium', ''],
      ['Add sameAs schema on all key profiles', 'AI Citation', 'Pending', 'High', 'LinkedIn, Clutch, Google, Wikipedia'],
      ['Set up SEMrush brand monitoring for Vardhini Vastu', 'AI Citation', 'Pending', 'Medium', ''],
      ['Submit to Justdial, Sulekha, UrbanClap with consistent NAP', 'AI Citation', 'Pending', 'High', 'NAP citations = Local Pack signal'],
      ['Answer 10 Quora questions with branded links', 'AI Citation', 'Pending', 'High', ''],
      ['Post 5 Reddit threads in r/vastu r/bangalore', 'AI Citation', 'Pending', 'Medium', ''],
      // Social Signals
      ['LinkedIn post: vardhinivastu.in launch', 'Social Signals', 'Pending', 'High', 'Do today'],
      ['Twitter/X: 3 posts with URL + hashtags', 'Social Signals', 'Pending', 'High', 'Do today'],
      ['WhatsApp broadcast to 20+ contacts', 'Social Signals', 'Pending', 'High', 'Do today'],
      ['Create YouTube channel for Vastu tips', 'Social Signals', 'Pending', 'Medium', ''],
      ['Post 2 Instagram reels about vastu tips per week', 'Social Signals', 'Pending', 'Medium', ''],
      // Backlinks
      ['Guest post on housing/interior design blogs', 'Backlinks', 'Pending', 'High', ''],
      ['Get listed on 99acres, MagicBricks, Housing.com as expert', 'Backlinks', 'Pending', 'High', 'High DA real estate sites'],
      ['Reach out to 5 Bangalore property developers for co-content', 'Backlinks', 'Pending', 'Medium', ''],
      ['Submit to Vastu/Astrology directories', 'Backlinks', 'Pending', 'Medium', ''],
      ['Build resource page links from architecture colleges', 'Backlinks', 'Pending', 'Low', ''],
      // Map Rank
      ['Set up geo-grid rank tracking for Bangalore (10 terms)', 'Map Rank', 'Pending', 'High', 'vastu consultant bangalore, vastu consultant whitefield etc'],
      ['Baseline map ranking measurement before GMB optimisation', 'Map Rank', 'Pending', 'High', ''],
      ['Embed Google Map on vardhinivastu.in contact page', 'Map Rank', 'Pending', 'Medium', ''],
      // Google News
      ['Verify RSS feed at vardhinivastu.in/feed/', 'Google News', 'Pending', 'Medium', ''],
      ['Submit news sitemap to GSC', 'Google News', 'Pending', 'Medium', ''],
      ['Publish 2 blog posts per week consistently for 30 days', 'Google News', 'Pending', 'High', 'Needed for Google News consideration'],
      // Analytics
      ['Connect GA4 to GSC', 'Analytics', 'Pending', 'Medium', ''],
      ['Set up conversion goals: form submit, WhatsApp click, call click', 'Analytics', 'Pending', 'High', ''],
      ['Create custom GA4 report: organic traffic by page', 'Analytics', 'Pending', 'Medium', ''],
      // GitHub/Cloudflare
      ['Push local git repo to GitHub remote', 'Technical SEO', 'Pending', 'Medium', 'Need GitHub PAT — get at github.com/settings/tokens'],
      ['Deploy to Cloudflare Pages for CDN backup', 'Technical SEO', 'Pending', 'Low', 'wrangler pages deploy — need Cloudflare API token'],
    ];

    for (const [task, cat, status, priority, notes] of tasks) {
      await addDbRow(taskDbId, {
        'Task': { title: [{ text: { content: task } }] },
        'Category': { select: { name: cat } },
        'Status': { select: { name: status } },
        'Priority': { select: { name: priority } },
        'Notes': { rich_text: notes ? [{ text: { content: notes } }] : [] },
      });
    }
    console.log(`  Added ${tasks.length} tasks`);
  }

  // ── 3. Content Calendar Database ──────────────────────────────────────────
  console.log('3. Creating Content Calendar database...');
  const calDbId = await createDatabase(ROOT_PAGE, 'Content Calendar', '📅', {
    'Title': { title: {} },
    'Type': { select: { options: [
      { name: 'Blog Post', color: 'blue' },
      { name: 'GMB Post', color: 'green' },
      { name: 'Quora Answer', color: 'orange' },
      { name: 'Twitter/X', color: 'blue' },
      { name: 'LinkedIn', color: 'blue' },
      { name: 'YouTube', color: 'red' },
      { name: 'Instagram Reel', color: 'pink' },
    ]}},
    'Status': { select: { options: [
      { name: 'Published', color: 'green' },
      { name: 'Draft', color: 'yellow' },
      { name: 'Planned', color: 'gray' },
    ]}},
    'Target Keyword': { rich_text: {} },
    'URL': { url: {} },
  });

  if (calDbId) {
    const calendar = [
      ['Geopathic Stress Detection in Bangalore Apartments — What Lecher Antenna Reveals', 'Blog Post', 'Planned', 'geopathic stress detection bangalore', ''],
      ['Why Your Kitchen Direction Affects Your Family\'s Health — Vastu Explained', 'Blog Post', 'Planned', 'kitchen vastu direction health', ''],
      ['VIDS™ vs Standard 8-Zone Vastu: Why 16 Zones Changes Everything', 'Blog Post', 'Planned', 'scientific vastu bangalore', ''],
      ['South-Facing House Vastu: The Truth Most Consultants Won\'t Tell You', 'Blog Post', 'Planned', 'south facing house vastu', ''],
      ['Vastu for Whitefield Apartments: 2024 Guide for High-Rise Living', 'Blog Post', 'Planned', 'vastu consultant whitefield', ''],
      ['New VIDS™ 16-Zone Analysis Service Now Available for NRI Clients', 'GMB Post', 'Planned', '', ''],
      ['Geopathic Stress Detection using Lecher Antenna — Book a Scan', 'GMB Post', 'Planned', '', ''],
      ['Zero Demolition Vastu Corrections — How It Works', 'GMB Post', 'Planned', '', ''],
      ['Which direction should your kitchen face? (Vastu Shastra answer)', 'Quora Answer', 'Planned', 'kitchen direction vastu', ''],
      ['Best vastu consultant in Bangalore for apartments?', 'Quora Answer', 'Planned', 'vastu consultant bangalore', ''],
      ['Is a South-facing house really bad as per vastu?', 'Quora Answer', 'Planned', 'south facing house vastu', ''],
      ['What is geopathic stress and how does it affect sleep?', 'Quora Answer', 'Planned', 'geopathic stress sleep', ''],
      ['Vardhini Vastu is now live at vardhinivastu.in — Scientific VIDS™ system', 'LinkedIn', 'Planned', '', ''],
      ['The ONE vastu mistake 70% of Bangalore apartments make (thread)', 'Twitter/X', 'Planned', '', ''],
      ['What is the Lecher Antenna and why use it for Vastu? #vastu #bangalore', 'Twitter/X', 'Planned', '', ''],
      ['16-zone VIDS compass explained in 60 seconds', 'YouTube', 'Planned', 'vids vastu system', ''],
      ['Geopathic stress lines in your bedroom — Lecher Antenna demo', 'YouTube', 'Planned', 'geopathic stress detection', ''],
      ['3 vastu tips for Bangalore apartments (no demolition needed)', 'Instagram Reel', 'Planned', '', ''],
      ['Lecher Antenna explained in 30 seconds', 'Instagram Reel', 'Planned', '', ''],
      ['Before/after vastu correction — energy map comparison', 'Instagram Reel', 'Planned', '', ''],
    ];
    for (const [title, type, status, kw, url] of calendar) {
      await addDbRow(calDbId, {
        'Title': { title: [{ text: { content: title } }] },
        'Type': { select: { name: type } },
        'Status': { select: { name: status } },
        'Target Keyword': { rich_text: kw ? [{ text: { content: kw } }] : [] },
        'URL': url ? { url } : { url: null },
      });
    }
    console.log(`  Added ${calendar.length} content items`);
  }

  // ── 4. Locality Pipeline Database ─────────────────────────────────────────
  console.log('4. Creating Locality Pipeline database...');
  const localDbId = await createDatabase(ROOT_PAGE, 'Locality & City Pipeline', '📍', {
    'Locality': { title: {} },
    'Corridor': { select: { options: [
      { name: 'Bangalore Core (Live)', color: 'green' },
      { name: 'South / Kanakapura', color: 'yellow' },
      { name: 'East / Hoskote', color: 'orange' },
      { name: 'North / Devanahalli', color: 'blue' },
      { name: 'West / Tumkur', color: 'purple' },
      { name: 'Indian City', color: 'pink' },
      { name: 'International', color: 'gray' },
    ]}},
    'Status': { select: { options: [
      { name: 'Live', color: 'green' },
      { name: 'Build Pending', color: 'red' },
    ]}},
    'Slug': { rich_text: {} },
  });

  if (localDbId) {
    const localities = [
      // Live
      ['Whitefield', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-whitefield'],
      ['Indiranagar', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-indiranagar'],
      ['Koramangala', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-koramangala'],
      ['HSR Layout', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-hsr-layout'],
      ['Sarjapur Road', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-sarjapur-road'],
      ['Hebbal', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-hebbal'],
      ['JP Nagar', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-jp-nagar'],
      ['Jayanagar', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-jayanagar'],
      ['Electronic City', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-electronic-city'],
      ['Marathahalli', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-marathahalli'],
      ['Yelahanka', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-yelahanka'],
      ['BTM Layout', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-btm-layout'],
      ['Malleswaram', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-malleswaram'],
      ['Bannerghatta Road', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-bannerghatta-road'],
      ['Basavanagudi', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-basavanagudi'],
      ['Rajajinagar', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-rajajinagar'],
      ['Bellandur', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-bellandur'],
      ['Devanahalli', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-devanahalli'],
      ['Kanakapura Road', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-kanakapura-road'],
      ['Yeshwanthpur', 'Bangalore Core (Live)', 'Live', '/vastu-consultant-yeshwanthpur'],
      // South corridor
      ['Kanakapura Town', 'South / Kanakapura', 'Build Pending', '/vastu-consultant-kanakapura'],
      ['Banashankari', 'South / Kanakapura', 'Build Pending', '/vastu-consultant-banashankari'],
      ['Uttarahalli', 'South / Kanakapura', 'Build Pending', '/vastu-consultant-uttarahalli'],
      ['Ramanagara', 'South / Kanakapura', 'Build Pending', '/vastu-consultant-ramanagara'],
      ['Bidadi', 'South / Kanakapura', 'Build Pending', '/vastu-consultant-bidadi'],
      ['Mysuru Road', 'South / Kanakapura', 'Build Pending', '/vastu-consultant-mysuru-road'],
      // East corridor
      ['KR Puram', 'East / Hoskote', 'Build Pending', '/vastu-consultant-kr-puram'],
      ['Mahadevapura', 'East / Hoskote', 'Build Pending', '/vastu-consultant-mahadevapura'],
      ['Varthur', 'East / Hoskote', 'Build Pending', '/vastu-consultant-varthur'],
      ['Hoskote', 'East / Hoskote', 'Build Pending', '/vastu-consultant-hoskote'],
      ['Kadugodi', 'East / Hoskote', 'Build Pending', '/vastu-consultant-kadugodi'],
      // North corridor
      ['Thanisandra', 'North / Devanahalli', 'Build Pending', '/vastu-consultant-thanisandra'],
      ['Hennur Road', 'North / Devanahalli', 'Build Pending', '/vastu-consultant-hennur-road'],
      ['Bagaluru', 'North / Devanahalli', 'Build Pending', '/vastu-consultant-bagaluru'],
      ['Doddaballapur', 'North / Devanahalli', 'Build Pending', '/vastu-consultant-doddaballapur'],
      // West corridor
      ['Rajajinagar Extended', 'West / Tumkur', 'Build Pending', '/vastu-consultant-rajajinagar-ext'],
      ['Peenya', 'West / Tumkur', 'Build Pending', '/vastu-consultant-peenya'],
      ['Tumkur Road', 'West / Tumkur', 'Build Pending', '/vastu-consultant-tumkur-road'],
      ['Nelamangala', 'West / Tumkur', 'Build Pending', '/vastu-consultant-nelamangala'],
      // Cities
      ['Mumbai', 'Indian City', 'Live', '/vastu-consultant-mumbai'],
      ['Delhi', 'Indian City', 'Live', '/vastu-consultant-delhi'],
      ['Hyderabad', 'Indian City', 'Live', '/vastu-consultant-hyderabad'],
      ['Chennai', 'Indian City', 'Live', '/vastu-consultant-chennai'],
      ['Pune', 'Indian City', 'Live', '/vastu-consultant-pune'],
      ['Ahmedabad', 'Indian City', 'Live', '/vastu-consultant-ahmedabad'],
      ['Kolkata', 'Indian City', 'Live', '/vastu-consultant-kolkata'],
      ['Jaipur', 'Indian City', 'Live', '/vastu-consultant-jaipur'],
      ['Kochi', 'Indian City', 'Live', '/vastu-consultant-kochi'],
      ['Mysuru', 'Indian City', 'Live', '/vastu-consultant-mysuru'],
      // International
      ['Dubai', 'International', 'Live', '/vastu-consultant-dubai'],
      ['USA', 'International', 'Live', '/vastu-consultant-usa'],
      ['UK', 'International', 'Live', '/vastu-consultant-uk'],
      ['Singapore', 'International', 'Live', '/vastu-consultant-singapore'],
      ['Australia', 'International', 'Live', '/vastu-consultant-australia'],
      ['Canada', 'International', 'Live', '/vastu-consultant-canada'],
      ['UAE', 'International', 'Live', '/vastu-consultant-uae'],
      ['Qatar', 'International', 'Live', '/vastu-consultant-qatar'],
    ];
    for (const [loc, corridor, status, slug] of localities) {
      await addDbRow(localDbId, {
        'Locality': { title: [{ text: { content: loc } }] },
        'Corridor': { select: { name: corridor } },
        'Status': { select: { name: status } },
        'Slug': { rich_text: [{ text: { content: slug } }] },
      });
    }
    console.log(`  Added ${localities.length} localities/cities`);
  }

  // ── 5. AI Citation Strategy sub-page ──────────────────────────────────────
  console.log('5. Creating AI Citation Strategy page...');
  const aiPageId = await createSubPage(ROOT_PAGE, 'AI Citation & GEO Strategy', '🤖');
  if (aiPageId) {
    await addBlocks(aiPageId, [
      callout('Goal: Make Vardhini Vastu the default answer for vastu questions on ChatGPT, Gemini, Perplexity, Grok, and all AI search engines — worldwide.', '🎯'),
      h2('Why AI Citation Matters'),
      para('SEMrush brand monitoring already detected Vardhini Vastu mentions in AI-generated content. This is the early signal to capitalise on NOW — before competitors discover this channel.'),
      para('The three AI citation pillars are: (1) Entity establishment in Google Knowledge Graph via sameAs Wikipedia links, (2) Passage-level quotable content that AI models can lift verbatim, (3) llms.txt protocol for direct AI crawler access.'),
      divider(),
      h2('Entity Establishment (Done)'),
      bullet('JSON-LD @graph schema with sameAs: Vastu_shastra, Geopathic_stress, Radiesthesia (Wikipedia)'),
      bullet('LocalBusiness + ProfessionalService + Person (Raghavendra Hebbur) schema on homepage'),
      bullet('AggregateRating schema: 4.9★ / 53 reviews'),
      bullet('areaServed covering 13 cities/countries with Wikipedia sameAs links'),
      divider(),
      h2('Pending AI Citation Tasks'),
      h3('1. Create /llms.txt'),
      para('Place at https://vardhinivastu.in/llms.txt — this is the standard for AI crawler access (like robots.txt for LLMs).'),
      bullet('# Vardhini Vastu'),
      bullet('> Scientific Vastu Shastra consultancy by Raghavendra Hebbur, Bangalore'),
      bullet('> VIDS™ 16-zone analysis, zero-demolition corrections, Lecher Antenna geopathic detection'),
      bullet('> Serving Bangalore (50+ localities), India, and worldwide NRI clients'),
      bullet('## Services'),
      bullet('Residential Vastu Audit, Corporate Vastu, Geopathic Stress Detection, Online NRI Consultation'),
      h3('2. Wikidata Entity'),
      para('Create a Wikidata entry for Raghavendra Hebbur as a Vastu Shastra practitioner. This directly feeds Google Knowledge Graph and all AI models trained on Wikidata.'),
      num('Go to wikidata.org/wiki/Special:NewItem'),
      num('Label: Raghavendra Hebbur'),
      num('Add: occupation = vastu shastra consultant'),
      num('Add: employer = Vardhini Vastu'),
      num('Add: website = vardhinivastu.in'),
      h3('3. Citation-Bait Content (Quotable Passages)'),
      para('AI models cite specific factual passages. Create pages with quotable, specific claims:'),
      bullet('"The VIDS™ system divides the compass into 16 sectors of 22.5° each, compared to the traditional 8-zone system of 45° per zone"'),
      bullet('"Underground water veins resonate at 105 Hz on the Lecher Antenna scale"'),
      bullet('"Hartmann grid crossings are detected at 2 Hz frequency using the Lecher Antenna instrument"'),
      bullet('"Vardhini Vastu has conducted 500+ residential Vastu audits across 50+ Bangalore localities"'),
      h3('4. Platform Presence'),
      bullet('Clutch.co — B2B reviews platform, high DA, AI-cited heavily'),
      bullet('Crunchbase — business entity listing'),
      bullet('Justdial, Sulekha, UrbanClap — local citation NAP consistency'),
      bullet('99acres Expert Section — real estate high DA'),
      bullet('MagicBricks Expert Answers'),
      divider(),
      h2('AI Platform Targeting'),
      bullet('ChatGPT: Bing web index + OpenAI crawler (OAI-SearchBot) — ensure robots.txt allows'),
      bullet('Gemini: Google Search index — GSC indexing + structured data'),
      bullet('Perplexity: Multiple sources — Bing + direct crawl — needs citation-density content'),
      bullet('Grok (xAI): Twitter/X content + web — post regularly on X with specific factual claims'),
      bullet('Claude: Training data + web search — Clutch/Crunchbase presence important'),
    ]);
  }

  // ── 6. GMB Quick-Start sub-page ───────────────────────────────────────────
  console.log('6. Creating GMB Quick-Start page...');
  const gmbPageId = await createSubPage(ROOT_PAGE, 'GMB Quick-Start Checklist', '🗺️');
  if (gmbPageId) {
    await addBlocks(gmbPageId, [
      callout('GMB is the single highest-ROI task remaining. A fully optimised Google Business Profile can put Vardhini Vastu in the Local Pack (top 3 map results) for "vastu consultant bangalore" within 30 days.', '🚨'),
      h2('Step 1: Claim / Create (Do Today)'),
      num('Go to: business.google.com'),
      num('Search "Vardhini Vastu" — if listed, click Claim. If not, click Add Business.'),
      num('Category: Vastu Consultant (primary). Add secondary: Consultant, Interior Designer'),
      num('Verify via SMS to +91 97391 05574 or postcard to Bangalore address'),
      divider(),
      h2('Step 2: Complete All 20 Profile Fields'),
      bullet('Business name: Vardhini Vastu (exact match)'),
      bullet('Primary category: Vastu Consultant'),
      bullet('Secondary categories: Consultant, Feng Shui Consultant, Interior Designer'),
      bullet('Description (750 chars): Use keywords — vastu consultant bangalore, VIDS 16-zone, zero demolition, geopathic stress, Lecher Antenna, Raghavendra Hebbur'),
      bullet('Website: https://vardhinivastu.in'),
      bullet('Phone: +91 97391 05574'),
      bullet('Address: Bangalore, Karnataka 560001'),
      bullet('Service area: All 50+ Bangalore localities (list each one)'),
      bullet('Hours: Mon-Sat 10:00-19:00'),
      bullet('Services: Residential Vastu Audit, Corporate Vastu, Geopathic Stress Detection, Online NRI Consultation, Pre-Purchase Assessment'),
      bullet('Products: Add each service as a product with price range'),
      bullet('Attributes: Online consultations available, Online appointments'),
      bullet('Photos: 10+ (office, Lecher Antenna tool, audit process, Raghavendra photo, before/after energy maps)'),
      bullet('Cover photo: Professional VIDS compass diagram or site photo'),
      bullet('Logo: Vardhini Vastu logo (300x300px minimum)'),
      bullet('Q&A: Pre-populate 5 questions and answers (vastu for south facing house, VIDS system, geopathic stress, online consultation, pricing)'),
      bullet('Messaging: Enable — set auto-reply'),
      bullet('Booking link: https://vardhinivastu.in/vastu-consultant-bangalore-contact/'),
      bullet('Opening post: Create a GMB post with photo + link to homepage'),
      divider(),
      h2('Step 3: Review Generation (Week 1)'),
      para('Reviews are the #1 Local Pack ranking factor. Target: 10 reviews in first 30 days.'),
      num('Create a short link: g.page/vardhinivastu/review (via GMB dashboard)'),
      num('Send WhatsApp to 10 past clients: "Could you leave a quick Google review? [link]"'),
      num('Add review request to every consultation follow-up message'),
      num('Reply to every review within 24 hours (GMB engagement signal)'),
      divider(),
      h2('Step 4: Weekly GMB Posts'),
      para('Post 2× per week minimum. GMB posts decay after 7 days — consistent posting = ranking signal.'),
      bullet('Monday: Vastu tip with photo'),
      bullet('Thursday: Service highlight or client outcome (no identifying info)'),
      bullet('Use keywords naturally: vastu consultant bangalore, vastu for apartment, zero demolition vastu'),
      bullet('Always include a CTA button: Book → vardhinivastu.in/vastu-consultant-bangalore-contact/'),
    ]);
  }

  // ── 7. Build Queue sub-page ───────────────────────────────────────────────
  console.log('7. Creating Build Queue page...');
  const buildPageId = await createSubPage(ROOT_PAGE, 'Build Queue — Next 77 Pages', '🏗️');
  if (buildPageId) {
    await addBlocks(buildPageId, [
      callout('77 pages pending build. Priority order: Extended Bangalore Localities → Apartment Targeting → Industrial Areas. Each page follows the vv-page-hero fragment format.', '📋'),
      h2('Corridor 1: South / Kanakapura (12 pages)'),
      bullet('vastu-consultant-kanakapura — Kanakapura Town'),
      bullet('vastu-consultant-ramanagara — Ramanagara'),
      bullet('vastu-consultant-banashankari — Banashankari'),
      bullet('vastu-consultant-uttarahalli — Uttarahalli'),
      bullet('vastu-consultant-mysuru-road — Mysuru Road'),
      bullet('vastu-consultant-bidadi — Bidadi'),
      bullet('vastu-consultant-vijayanagar — Vijayanagar'),
      bullet('vastu-consultant-rr-nagar — RR Nagar'),
      bullet('vastu-consultant-kengeri — Kengeri'),
      bullet('vastu-consultant-gottigere — Gottigere'),
      bullet('vastu-consultant-hulimavu — Hulimavu'),
      bullet('vastu-consultant-begur — Begur'),
      h2('Corridor 2: East / Hoskote (9 pages)'),
      bullet('vastu-consultant-hoskote — Hoskote'),
      bullet('vastu-consultant-kr-puram — KR Puram'),
      bullet('vastu-consultant-mahadevapura — Mahadevapura'),
      bullet('vastu-consultant-varthur — Varthur'),
      bullet('vastu-consultant-kadugodi — Kadugodi'),
      bullet('vastu-consultant-hoodi — Hoodi'),
      bullet('vastu-consultant-krishnarajapuram — Krishnarajapuram'),
      bullet('vastu-consultant-avalahalli — Avalahalli'),
      bullet('vastu-consultant-hope-farm — Hope Farm Junction'),
      h2('Corridor 3: North / Devanahalli (9 pages)'),
      bullet('vastu-consultant-thanisandra — Thanisandra'),
      bullet('vastu-consultant-hennur-road — Hennur Road'),
      bullet('vastu-consultant-bagaluru — Bagaluru'),
      bullet('vastu-consultant-doddaballapur — Doddaballapur Road'),
      bullet('vastu-consultant-jakkur — Jakkur'),
      bullet('vastu-consultant-kogilu — Kogilu'),
      bullet('vastu-consultant-banaswadi — Banaswadi'),
      bullet('vastu-consultant-kalyan-nagar — Kalyan Nagar'),
      bullet('vastu-consultant-ramamurthy-nagar — Ramamurthy Nagar'),
      h2('Corridor 4: West / Tumkur (10 pages)'),
      bullet('vastu-consultant-peenya — Peenya'),
      bullet('vastu-consultant-tumkur-road — Tumkur Road'),
      bullet('vastu-consultant-nelamangala — Nelamangala'),
      bullet('vastu-consultant-nagarbhavi — Nagarbhavi'),
      bullet('vastu-consultant-vijayanagar-west — Vijayanagar West'),
      bullet('vastu-consultant-chikkabanavara — Chikkabanavara'),
      bullet('vastu-consultant-hesaraghatta — Hesaraghatta Road'),
      bullet('vastu-consultant-jalahalli — Jalahalli'),
      bullet('vastu-consultant-mathikere — Mathikere'),
      bullet('vastu-consultant-chord-road — Chord Road'),
      h2('Apartment Targeting — Bangalore (14 pages)'),
      callout('Target: Pages that rank when people search "[Builder name] vastu" — no branding, category-level content only', 'ℹ️'),
      bullet('vastu-for-prestige-apartments'),
      bullet('vastu-for-brigade-apartments'),
      bullet('vastu-for-sobha-apartments'),
      bullet('vastu-for-godrej-apartments'),
      bullet('vastu-for-puravankara-apartments'),
      bullet('vastu-for-salarpuria-apartments'),
      bullet('vastu-for-embassy-apartments'),
      bullet('vastu-for-shriram-apartments'),
      bullet('vastu-for-mantri-apartments'),
      bullet('vastu-for-manyata-apartments'),
      bullet('vastu-for-3bhk-apartment'),
      bullet('vastu-for-2bhk-apartment'),
      bullet('vastu-for-high-rise-apartment'),
      bullet('vastu-for-under-construction-flat'),
      h2('Industrial Areas — Bangalore (10 pages)'),
      bullet('vastu-for-peenya-industrial-area'),
      bullet('vastu-for-bommasandra-industrial-area'),
      bullet('vastu-for-whitefield-it-park'),
      bullet('vastu-for-electronic-city-tech-park'),
      bullet('vastu-for-kiadb-industrial-area'),
      bullet('vastu-for-hebbal-industrial-area'),
      bullet('vastu-for-yelahanka-industrial-area'),
      bullet('vastu-for-jigani-industrial-area'),
      bullet('vastu-for-attibele-industrial-area'),
      bullet('vastu-for-dobbaspet-industrial-area'),
      h2('Industrial Areas — India (13 pages)'),
      bullet('vastu-for-chennai-omr-it-corridor'),
      bullet('vastu-for-pune-midc-industrial'),
      bullet('vastu-for-noida-sector-industrial'),
      bullet('vastu-for-gurgaon-cyber-city'),
      bullet('vastu-for-hyderabad-hitech-city'),
      bullet('vastu-for-mumbai-bkc-commercial'),
      bullet('vastu-for-delhi-okhla-industrial'),
      bullet('vastu-for-surat-industrial-estate'),
      bullet('vastu-for-coimbatore-industrial'),
      bullet('vastu-for-ahmedabad-gift-city'),
      bullet('vastu-for-kolkata-salt-lake-sector-v'),
      bullet('vastu-for-jaipur-sitapura-industrial'),
      bullet('vastu-for-kochi-infopark'),
    ]);
  }

  // ── 8. GitHub Setup sub-page ──────────────────────────────────────────────
  console.log('8. Creating GitHub Setup page...');
  const ghPageId = await createSubPage(ROOT_PAGE, 'GitHub & Deployment Setup', '💻');
  if (ghPageId) {
    await addBlocks(ghPageId, [
      callout('Local git repo initialized with 125+ pages committed. Need GitHub PAT to push remote.', '📌'),
      h2('GitHub Setup — 3 Steps'),
      h3('Step 1: Get a Personal Access Token'),
      num('Go to: github.com/settings/tokens/new'),
      num('Note: "vardhini-vastu repo"'),
      num('Scopes: check "repo" only'),
      num('Click Generate token — COPY IT (shown once only)'),
      num('Paste the token (ghp_...) to Claude'),
      h3('Step 2: Create Remote Repo'),
      para('Claude will use the GitHub API to create "vardhinivastu-pages" repo under your account and push all 125+ files automatically.'),
      h3('Step 3: Connect to Cloudflare Pages'),
      para('After GitHub push, connect the repo to Cloudflare Pages for global CDN delivery:'),
      num('Install wrangler: npm install -g wrangler (already done)'),
      num('Get Cloudflare API token from dash.cloudflare.com/profile/api-tokens'),
      num('Run: wrangler pages deploy . --project-name=vardhini-vastu'),
      divider(),
      h2('Current Git Status'),
      bullet('Repo: C:/Users/raghu/VV/'),
      bullet('Branch: master'),
      bullet('Committed: index.html, 125+ page files, build_tracker_v2.py, Excel trackers, wrangler.toml, .gitignore'),
      bullet('Remote: NOT SET (pending GitHub PAT)'),
    ]);
  }

  console.log('\n✅ Notion SEO Command Centre built successfully!');
  console.log(`\n📎 Open it at: https://www.notion.so/vardhinivastu/Vardhini-Vastu-2250fd2d33e880f39031fdef2d034f46\n`);
}

main().catch(console.error);
