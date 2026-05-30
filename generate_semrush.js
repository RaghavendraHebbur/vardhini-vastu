const fs = require('fs');
const https = require('https');
const { vv2_css, vv2_hero, vv2_trust, vv2_cta, vv2_faq, vv2_wrap } = require('./vv2_generator');

const WP_BASE   = 'vardhinivastu.in';
const WP_USER   = 'raghu.hebbur@gmail.com';
const WP_PASS   = 'AD1vSJeLlP8fMcArlSZqcU2K';
const AUTH      = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

function getWPItemBySlug(slug, type) {
  return new Promise((resolve, reject) => {
    https.get(`https://${WP_BASE}/wp-json/wp/v2/${type}?slug=${slug}`, (res) => {
      let data = ''; res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const items = JSON.parse(data);
          if (items && items.length > 0) resolve(items[0].id);
          else resolve(null);
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function wpUpdate(itemId, content, title, slug, type) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ content, title, status: 'publish', slug });
    const method = 'POST';
    const reqPath = itemId ? `/wp-json/wp/v2/${type}/${itemId}` : `/wp-json/wp/v2/${type}`;
    
    const opts = {
      hostname: WP_BASE, path: reqPath, method: method,
      headers: {
        'Authorization': `Basic ${AUTH}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(opts, res => {
      let data = ''; res.on('data', d => data += d);
      res.on('end', () => resolve({code: res.statusCode, data}));
    });
    req.on('error', reject); req.write(body); req.end();
  });
}

// Page 1: vastu-for-master-bedroom
function genMasterBedroom() {
  const title = 'SE Bedroom Vastu Guide for Positive Energy'; // Title contains "se bedroom vastu"
  const h1 = 'SE Bedroom Vastu: Master Bedroom Solutions';
  const slug = 'vastu-for-master-bedroom';
  
  const css = vv2_css();
  const hero = vv2_hero('Bedroom Vastu Guide', h1, 'Comprehensive guide to mastering se bedroom vastu and aligning your sleep space for optimal health and wealth.');
  
  const main = `
  <section class="sf"><div class="w">
  <h2>Understanding SE Bedroom Vastu</h2>
  <p>If you have a master bedroom in the southeast corner of your home, you might be concerned about negative energy and vastu doshas. The southeast corner is governed by the fire element (Agni). When you sleep with your head in this direction, it can sometimes cause restlessness. However, with the right vastu tips for bedroom, you can make the space completely vastu compliant without any structural demolition.</p>
  
  <h3>Remedies for Good Health and Positive Vibes</h3>
  <p>To ensure good health and maintain positive vibes, it is crucial to keep the bedroom clutter free. Our Lecher Antenna analysis helps detect invisible stress lines. If you are struggling with poor sleep, we strongly recommend booking an <a href="/online-vastu-consultation/">online consultation</a> to get personalized remedies for your se bedroom vastu setup.</p>
  
  <p>With our VIDS™ methodology, we provide solutions like color therapy and metal strips to balance the fire element, ensuring your master bedroom supports your wellbeing rather than detracting from it.</p>
  </div></section>`;
  
  const schema = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${title}",
    "headline": "${h1}",
    "url": "https://vardhinivastu.in/vastu-for-master-bedroom/"
  }
  </script>`;
  
  return { slug, title, body: vv2_wrap(css + hero + main), schema, type: 'pages' };
}

// Page 2: south-east-facing-house-vastu
function genSouthEastHouse() {
  const title = 'Vastu Shastra for Home Facing South East - Guide';
  const h1 = 'Vastu Shastra for Home Facing South East';
  const slug = 'south-east-facing-house-vastu';
  
  const css = vv2_css();
  const hero = vv2_hero('Home Facing Vastu', h1, 'Mastering the energy flow of a south-east facing property for maximum success.');
  
  const main = `
  <section class="sf"><div class="w">
  <h2>Balancing Vastu Principles for a Southeast Facing Home</h2>
  <p>Applying <strong>vastu shastra for home facing south east</strong> requires a deep understanding of elemental balancing. The southeast direction is ruled by Fire (Agni). If not balanced properly, it can lead to vastu defects and negative energy. However, when made vastu compliant, a southeast facing property can bring immense wealth and positive energy.</p>
  
  <h3>Key Strategies for Positive Energy Flow</h3>
  <ul>
    <li><strong>Entrance Optimization:</strong> When dealing with facing home vastu, we use Lecher Antenna to find the exact positive energy gates.</li>
    <li><strong>Room Vastu for South:</strong> The placement of rooms is crucial. Kitchen vastu for south facing house dictates that the kitchen should ideally be in the SE or NW to support the fire element.</li>
    <li><strong>Energy Flow:</strong> Ensure the center of the house (Brahmasthan) is clear to allow uninterrupted energy flow.</li>
  </ul>
  
  <p>Our VIDS™ system provides non-demolition remedies using copper and brass helixes to correct any vastu defects, ensuring your <em>vastu shastra for home facing south east</em> setup is perfectly aligned for prosperity.</p>
  </div></section>`;
  
  const schema = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${title}",
    "headline": "${h1}",
    "url": "https://vardhinivastu.in/south-east-facing-house-vastu/"
  }
  </script>`;
  
  return { slug, title, body: vv2_wrap(css + hero + main), schema, type: 'pages' };
}

// Page 3: vastu-for-children
function genChildrenVastu() {
  const title = 'VardhiniVastu.in: Guide to Vastu for Children';
  const h1 = 'VardhiniVastu.in Guide: Vastu for Children';
  const slug = 'vastu-for-children';
  
  const css = vv2_css();
  const hero = vv2_hero("Children's Room Vastu", h1, "Ensure your child's growth and academic success with scientific Vastu.");
  
  const main = `
  <section class="sf"><div class="w">
  <h2>Scientific Vastu for Academic Excellence</h2>
  <p>Welcome to <strong>vardhinivastu.in</strong>, your trusted source for non-destructive Vastu solutions. When designing a child's room, it's essential to consult a professional vastu consultant in bangalore. We offer 16-zone degree accurate analysis to ensure your child's study desk and bed are perfectly aligned with positive cosmic frequencies.</p>
  
  <h3>Why Choose VardhiniVastu.in?</h3>
  <p>Our methodology is deeply rooted in the traditional 12th-century sanskrit treatise, modernized through scientific vastu principles using Lecher Antenna frequency scanning. Whether you need an online consultation or an on-site visit in our primary service areas, we guarantee a 100% demolition remedy approach (meaning zero structural changes).</p>
  
  <p>With over 620 verified house corrections and a verified review rating from thousands of clients, we handle everything from residential to commercial vastu.</p>
  </div></section>`;
  
  const schema = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Vardhini Vastu",
    "url": "https://vardhinivastu.in",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "3200"
    }
  }
  </script>`;
  
  return { slug, title, body: vv2_wrap(css + hero + main), schema, type: 'pages' };
}

async function run() {
  const allContent = [genMasterBedroom(), genSouthEastHouse(), genChildrenVastu()];
  
  for (let p of allContent) {
    let content = p.body + '\n\n' + p.schema;
    fs.writeFileSync(`${p.slug}.html`, content);
    
    const pid = await getWPItemBySlug(p.slug, p.type);
    const res = await wpUpdate(pid, content, p.title, p.slug, p.type);
    console.log(`Deployed ${p.type} | ${p.slug}: HTTP ${res.code}`);
  }
}
run();
