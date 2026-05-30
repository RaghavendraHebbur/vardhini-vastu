const https = require('https');
const { vv2_css, vv2_hero, vv2_trust, vv2_cta, vv2_faq, vv2_wrap } = require('./vv2_generator');

const WP_BASE   = 'vardhinivastu.in';
const WP_USER   = 'raghu.hebbur@gmail.com';
const WP_PASS   = 'AD1vSJeLlP8fMcArlSZqcU2K';
const AUTH      = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

function getPageIdBySlug(slug) {
  return new Promise((resolve, reject) => {
    https.get(`https://${WP_BASE}/wp-json/wp/v2/pages?slug=${slug}`, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const pages = JSON.parse(data);
          if (pages.length > 0) {
            resolve(pages[0].id);
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function wpUpdate(pageId, content, title, slug) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ content, title, status: 'publish', slug });
    const method = 'POST';
    const path = pageId ? `/wp-json/wp/v2/pages/${pageId}` : `/wp-json/wp/v2/pages`;
    
    const opts = {
      hostname: WP_BASE,
      path: path,
      method: method,
      headers: {
        'Authorization': `Basic ${AUTH}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log(`✓ Page ${pageId || 'Created'} (${slug}) updated — HTTP ${res.statusCode}`);
          resolve(true);
        } else {
          console.error(`✗ Page failed (${slug}) — HTTP ${res.statusCode}: ${data.slice(0,200)}`);
          resolve(false);
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function buildSWCutPage() {
  const css = vv2_css();
  
  const hero = vv2_hero(
    'Vastu Defect Remedies',
    'South West Cut in Vastu:<br><em>Impacts &amp; Zero-Demolition Remedies.</em>',
    'The South West (Nairutya) corner governs stability, wealth retention, and relationships. Discover the symptoms of a South West cut and how to correct it scientifically without breaking any walls.'
  );

  const trust = vv2_trust();

  const body = `<section class="sf"><div class="w">
<div class="two-col">
<div>
<p class="eye">THE FOUNDATION ZONE</p>
<h2 class="h2">Understanding the <em>South West (Nairutya)</em> Cut</h2>
<p class="lead">In Vastu Shastra, the South West direction represents the Earth element (Prithvi Tattva). It is the zone that provides stability in career, firmness in decision-making, grounding in relationships, and the retention of wealth.</p>
<p class="lead">When a property has a physical "cut" or missing corner in the South West, the foundational stability of the house or business is severely compromised. At Vardhini Vastu, we use degree-accurate mapping and Lecher Antenna scanning to measure exactly how much of this vital zone is missing and prescribe <strong>100% zero-demolition</strong> corrections.</p>
</div>
<div>
<img src="https://vardhinivastu.in/wp-content/uploads/2026/05/cut-in-vastu-shastra.png" loading="lazy" id="sw-cut-image" style="width:100%;border-radius:var(--vv-r);box-shadow:var(--vv-shl);margin-bottom:20px;" alt="Missing Corner and Cut in Vastu Shastra">
<div class="tcard">
  <div class="tcard-stars">★★★★★</div>
  <p class="tcard-text">"A South West cut removes the anchoring energy of a property. Without proper grounding, financial and emotional resources tend to drain rapidly."</p>
  <div class="tcard-name">Scientific Insight</div>
</div>
</div>
</div>
</div></section>`;

  const symptoms = `<section class="sw"><div class="w">
<p class="eye">WARNING SIGNS</p>
<h2 class="h2">Symptoms of a <em>South West Cut</em></h2>
<p class="lead">If your home or office is missing its South West quadrant, you may experience these chronic issues:</p>
<div class="cards">
<div class="card"><div class="card-ico">📉</div><h3>Financial Instability</h3><p>Inability to save money. Even with high income, unexpected expenses constantly drain your resources.</p></div>
<div class="card"><div class="card-ico">🏥</div><h3>Health of the Family Head</h3><p>Chronic health issues, severe fatigue, or depression specifically affecting the breadwinner or eldest male.</p></div>
<div class="card"><div class="card-ico">💔</div><h3>Relationship Friction</h3><p>Lack of harmony among family members, frequent arguments, or instability in marriages.</p></div>
<div class="card"><div class="card-ico">⚠️</div><h3>Career Stagnation</h3><p>Loss of confidence, constant anxiety at work, and inability to maintain a steady job or business growth.</p></div>
</div>
</div></section>`;

  const remedies = `<section class="sf"><div class="w">
<p class="eye">SCIENTIFIC CORRECTIONS</p>
<h2 class="h2">Zero-Demolition Remedies for a <em>South West Cut</em></h2>
<p class="lead">You do not need to abandon your property or break walls. We balance the missing Earth element using physical and energetic correctors.</p>
<ul class="step-list">
<li class="step-item"><div class="step-num">1</div><div class="step-body"><h4>Lead Metal Enhancers (Lead Helix)</h4><p>Lead is the elemental metal associated with the South West. Placing lead helices or blocks on the affected wall artificially extends the energetic boundary, grounding the missing space.</p></div></li>
<li class="step-item"><div class="step-num">2</div><div class="step-body"><h4>Earth Element Activation</h4><p>Using yellow or earthy colors (like beige or mustard) on the walls of the adjacent zones to compensate for the missing Earth element.</p></div></li>
<li class="step-item"><div class="step-num">3</div><div class="step-body"><h4>Weight Placement</h4><p>Adding heavy objects, solid wooden furniture, or natural rocks near the cut area to recreate the heaviness and stability of the South West.</p></div></li>
<li class="step-item"><div class="step-num">4</div><div class="step-body"><h4>Geopathic Stress Correction</h4><p>A missing corner often causes intersecting negative energy lines. We use a Lecher Antenna to locate these lines and neutralize them using specific energy rods.</p></div></li>
</ul>
<div style="margin-top:40px;">
<a href="https://wa.me/919739105574" id="sw-cut-whatsapp-remedy" class="bp">📲 Get Customized Remedies via WhatsApp</a>
</div>
</div></section>`;

  const faq = vv2_faq('South West Vastu Cuts', {
    'Is a South West cut considered a major Vastu dosha?': 'Yes, it is considered one of the major Vastu defects (Maha Dosha) because it directly impacts the foundation, stability, and wealth-retention capabilities of the occupants.',
    'Can I use mirrors to correct a South West cut?': 'No. Mirrors represent the Water element and expand space. Using a mirror in the Earth zone (South West) creates an elemental clash and worsens the instability. Lead metal and Earth colors should be used instead.',
    'How do I know if my property has a South West cut?': 'A property has a cut if the South West corner is missing from a perfect square or rectangular layout. A degree-accurate floor plan analysis by a certified consultant is required to confirm the exact missing percentage.',
    'Do the zero-demolition remedies actually work for major cuts?': 'Yes. By strategically introducing the correct elemental metals (Lead), colors (Yellow), and neutralizing geopathic stress, we can effectively seal and balance the biofield of the property without structural changes.'
  });

  const cta = vv2_cta('Stabilize Your Home or Business', 'Do not let a missing South West corner drain your wealth and peace. WhatsApp us your floor plan for a scientific, zero-demolition remedy plan.');

  return css + '<div>' + hero + '</div>' + trust + body + symptoms + remedies + faq + cta;
}

async function run() {
  const slug = 'vastu-south-west-cut';
  const title = 'South West Cut in Vastu: Impacts & Remedies | Vardhini Vastu';
  
  let pageId = await getPageIdBySlug(slug);
  
  const contentToPush = vv2_wrap(buildSWCutPage());
  
  await wpUpdate(pageId, contentToPush, title, slug);
  console.log("Done");
}

run().catch(console.error);
