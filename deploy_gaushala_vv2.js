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

function buildGaushalaPage() {
  const css = vv2_css();
  
  const hero = vv2_hero(
    'Agricultural Vastu',
    'Vastu for Gaushalas &amp; Cow Shelters:<br><em>Cattle Health &amp; Milk Abundance.</em>',
    'Improve milk yields, prevent viral diseases in cattle, and align cow shed slopes using scientific energy coordinates. Neutralize spatial imbalances with zero-demolition correctors.'
  );

  const trust = vv2_trust();

  const body = `<section class="sf"><div class="w">
<div class="two-col">
<div>
<p class="eye">ANIMAL BIOFIELDS</p>
<h2 class="h2">Equilibrium and <em>Animal Biofields</em> in Gaushalas</h2>
<p class="lead">Cows and domestic cattle are highly receptive to the Earth's natural magnetic fields and geobiological networks. If a cow shed is built directly over geopathic stress lines or has negative water slopes, it leads to chronic cattle illness, low milk yields, reproduction issues, and high feed waste.</p>
<p class="lead">Scientific Vastu design for gaushalas structures sheds so that cattle face East or North while feeding. The floor slopes are designed to drain towards the North or East to ensure sanitation and hygiene, while keeping sick animal wards isolated in the Northwest corner.</p>
</div>
<div>
<img src="https://vardhinivastu.in/wp-content/uploads/2026/05/images-1.jpeg" style="width:100%;border-radius:var(--vv-r);box-shadow:var(--vv-shl);margin-bottom:20px;" alt="Vastu for Gaushala and Cow Shelter">
<div class="tcard">
  <div class="tcard-stars">★★★★★</div>
  <p class="tcard-text">"Balancing the drainage slope dynamics and spatial energy of commercial gaushalas directly improves the vitality index of the cattle and dairy output."</p>
  <div class="tcard-name">Scientific Insight</div>
</div>
</div>
</div>
</div></section>`;

  const zones = `<section class="sw"><div class="w">
<p class="eye">ZONAL DESIGN</p>
<h2 class="h2">Gaushala <em>Design Rules</em></h2>
<div class="cards" style="grid-template-columns: repeat(2, 1fr);">
<div class="card"><div class="card-ico">🐄</div><h3>Main Cow Shed (Stalls)</h3><p><strong>Ideal Sector:</strong> Northwest or Southeast<br><strong>Impact of Defect:</strong> Frequent cattle disease, low milk yields.<br><strong>Zero-Demolition Remedy:</strong> Install copper boundary loops; ensure cattle face East.</p></div>
<div class="card"><div class="card-ico">🌾</div><h3>Dry Feed Storage</h3><p><strong>Ideal Sector:</strong> Southwest<br><strong>Impact of Defect:</strong> Feed rot, high cost, loss of supply.<br><strong>Zero-Demolition Remedy:</strong> Place a lead helix plate near the storage door.</p></div>
<div class="card"><div class="card-ico">🚰</div><h3>Water Drinking Troughs</h3><p><strong>Ideal Sector:</strong> Northeast or North<br><strong>Impact of Defect:</strong> Cattle respiratory illness, sluggish vitality.<br><strong>Zero-Demolition Remedy:</strong> Use zinc plates under troughs; keep drinking water clean.</p></div>
<div class="card"><div class="card-ico">🏥</div><h3>Sick/Quarantine Wards</h3><p><strong>Ideal Sector:</strong> Northwest<br><strong>Impact of Defect:</strong> Spreading diseases, slow recovery.<br><strong>Zero-Demolition Remedy:</strong> Use light grey paint; place brass energy plates.</p></div>
</div>
</div></section>`;

  const defects = `<section class="sf"><div class="w">
<p class="eye">WARNING SIGNS</p>
<h2 class="h2">Common Gaushala <em>Layout Defects</em></h2>
<div class="cards">
<div class="card"><div class="card-ico">⚠️</div><h3>Water Drainage Sloping Southwest</h3><p><strong>Symptom:</strong> Sudden death of high-yielding cows, constant financial debts, and staff issues.</p></div>
<div class="card"><div class="card-ico">⚠️</div><h3>Heavy Feed Storage in Northeast</h3><p><strong>Symptom:</strong> Dampness in feed, block in dairy profits, and reproduction issues in cows.</p></div>
<div class="card"><div class="card-ico">⚠️</div><h3>Sick Animal Wards in Southeast</h3><p><strong>Symptom:</strong> High fever in cattle, aggression, and slower injury healing.</p></div>
<div class="card"><div class="card-ico">⚠️</div><h3>Geopathic Stress Lines</h3><p><strong>Symptom:</strong> Frequent mastitis in cows, cattle showing restlessness and fear of entering stalls.</p></div>
</div>
</div></section>`;

  const remedies = `<section class="sw"><div class="w">
<p class="eye">REMEDIES</p>
<h2 class="h2">100% Non-Demolition <em>Energy Balancing</em></h2>
<p class="lead">We neutralize spatial imbalances through scientific energy redirection, avoiding structural changes entirely:</p>
<ul class="step-list">
<li class="step-item"><div class="step-num">1</div><div class="step-body"><h4>Copper Biofield Loops</h4><p>Installing copper boundary wires around cow sheds to ground electromagnetic disturbances.</p></div></li>
<li class="step-item"><div class="step-num">2</div><div class="step-body"><h4>Lead Floor Grounders</h4><p>Placing lead helix plates near Southwest storage to stabilize heavy earth vectors.</p></div></li>
<li class="step-item"><div class="step-num">3</div><div class="step-body"><h4>Zinc Water Cleaners</h4><p>Applying zinc correctors near drinking troughs to clean chemical water frequencies.</p></div></li>
</ul>
</div></section>`;

  const faq = vv2_faq('Vastu for Gaushalas', {
    'Which direction should cows face while standing in a gaushala?': 'Cows should ideally face East or North while feeding. This supports calm digestion and raises their vitality index.',
    'Where should the milk collection room be located?': 'The milk collection and billing room should be located in the Northwest or East sectors of the gaushala layout.',
    'How can we correct cattle sickness issues without rebuilding the shed?': 'We use Lecher Antennas to locate telluric lines, apply copper energy coils under cow beds, and install zinc correctors in the Northeast.',
    'Can scientific Vastu corrections be done without any physical demolition?': 'Yes, scientific Vastu focuses on energy balancing and element alignment. By using specific metals (like brass, copper, lead), colors, and geopathic stress resonators, we can neutralize defects and balance energy vectors without breaking walls or structural demolition.',
    'How long does it take to see results after applying Vastu remedies?': 'Most clients observe positive shifts in spatial energy and physical wellbeing within 21 to 90 days after implementing the recommended remedies. This timeline allows the corrected energy patterns to stabilize and integrate with the occupants\' biofields.'
  });

  const cta = vv2_cta('Improve Your Dairy Profits Today', 'Schedule a professional scientific Vastu and geobiological scan for your gaushala today.');

  return css + '<div>' + hero + '</div>' + trust + body + zones + defects + remedies + faq + cta;
}

async function run() {
  const slug = 'vastu-for-gaushalas-and-cow-shelters';
  const title = 'Vastu for Gaushalas And Cow Shelters | Vardhini Vastu';
  
  let pageId = await getPageIdBySlug(slug);
  
  const contentToPush = vv2_wrap(buildGaushalaPage());
  
  await wpUpdate(pageId, contentToPush, title, slug);
  console.log("Done");
}

run().catch(console.error);
