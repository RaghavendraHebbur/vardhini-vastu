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

const blogs = [
  { slug: 'south-facing-house-vastu', title: 'Vastu for South Facing House: Myths vs Reality' },
  { slug: 'vastu-dosha-remedies', title: 'Vastu Dosha: Symptoms and Remedies' },
  { slug: 'bedroom-vastu-sleeping-direction', title: 'Bedroom Vastu: Sleeping Directions for Health' },
  { slug: 'north-facing-house-vastu', title: 'Vastu for North Facing House' },
  { slug: 'main-door-vastu', title: 'Main Door Vastu Direction Guide' },
  { slug: 'apartment-vastu-tips', title: 'Apartment Vastu: Tips for Flats' },
  { slug: 'zero-demolition-vastu-remedies', title: 'Zero Demolition Vastu Remedies' },
  { slug: 'pre-purchase-vastu-checklist', title: 'Pre-Purchase Vastu Checklist for Homebuyers' },
  { slug: 'vastu-shastra-vs-feng-shui', title: 'Vastu Shastra vs Feng Shui' },
  { slug: 'guide-to-online-vastu-consultation', title: 'Guide to Online Vastu Consultations' }
];

const intlPages = [
  { slug: 'vastu-consultation-usa', title: 'Vastu Consultant in USA', currency: '$150 USD' },
  { slug: 'vastu-consultation-uk', title: 'Vastu Consultant in UK', currency: '£120 GBP' },
  { slug: 'vastu-consultation-uae', title: 'Vastu Consultant in UAE', currency: '500 AED' },
  { slug: 'vastu-consultation-canada', title: 'Vastu Consultant in Canada', currency: '$200 CAD' },
  { slug: 'vastu-consultation-australia', title: 'Vastu Consultant in Australia', currency: '$220 AUD' }
];

function genBlog(b) {
  const css = vv2_css();
  const hero = vv2_hero('Vastu Blog', b.title, 'Insights and scientific analysis by Raghavendra Hebbur.');
  const main = `
  <section class="sf"><div class="w">
  <h2>Understanding ${b.title}</h2>
  <p>At Vardhini Vastu, we approach every topic with degree-accurate VIDS™ analysis. Traditional texts provide the foundation, but modern application requires the Lecher Antenna and scientific validation.</p>
  <p>For more detailed personalized advice on this, we recommend booking a <a href="/online-vastu-consultation/">consultation</a>.</p>
  </div></section>`;
  const faqs = vv2_faq(b.title + ' FAQs', [
    {q: 'Is a physical visit required?', a: 'No, our online consultation using Google Earth mapping is 100% accurate.'}
  ]);
  const schema = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${b.title}",
    "author": { "@type": "Person", "name": "Raghavendra Hebbur" }
  }
  </script>`;
  return { slug: b.slug, title: b.title, body: vv2_wrap(css + hero + main + faqs), schema, type: 'posts' };
}

function genPillar(slug, title, desc, h2) {
  const css = vv2_css();
  const hero = vv2_hero('Core Methodology', title, desc);
  const main = `
  <section class="sf"><div class="w">
  <h2>${h2}</h2>
  <p>Vardhini Vastu leverages 10+ years of expertise and 3,200+ consultations to bring scientific accuracy to Vastu. Instead of fear-mongering and structural demolition, we use elemental strips, color therapy, and energetic alignment to balance the 16 directional zones.</p>
  </div></section>`;
  return { slug, title, body: vv2_wrap(css + hero + main), schema: '', type: 'pages' };
}

function genIntl(i) {
  const css = vv2_css();
  const hero = vv2_hero('International Vastu Services', i.title, '100% Online, Zero-Demolition Vastu for NRI and Global Clients.');
  const main = `
  <section class="sf"><div class="w">
  <h2>Scientific Vastu for ${i.title.split('in ')[1]} Homes</h2>
  <p>Whether you have a suburban house, an apartment, or a commercial office, our remote VIDS™ methodology ensures degree-accurate alignment without physical visits. We use Google Earth for precise coordinate mapping.</p>
  <div class="cards">
    <div class="card"><h3>Online Consultation Fee</h3><p>Starting at ${i.currency}</p></div>
  </div>
  </div></section>`;
  const schema = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Vastu Consultation ${i.title.split('in ')[1]}",
    "provider": { "@type": "LocalBusiness", "name": "Vardhini Vastu" },
    "offers": { "@type": "Offer", "price": "${i.currency.split(' ')[0].replace(/[^0-9]/g, '')}", "priceCurrency": "${i.currency.split(' ')[1]}" }
  }
  </script>`;
  return { slug: i.slug, title: i.title, body: vv2_wrap(css + hero + main), schema, type: 'pages' };
}

async function run() {
  const allContent = [];
  
  // 10 Blogs
  blogs.forEach(b => allContent.push(genBlog(b)));
  
  // Pillars
  allContent.push(genPillar('vids-methodology', 'VIDS™ Methodology', 'The 16-Zone Vastu Integrated Diagnosis System.', 'Degree-Accurate Analysis'));
  allContent.push(genPillar('vastu-without-demolition', 'Vastu Without Demolition', 'Scientific remedies without breaking walls.', 'Zero-Demolition Approach'));
  allContent.push(genPillar('nri-vastu-consultation', 'NRI Vastu Consultation', 'Global Vastu services for the Indian diaspora.', 'Serving Overseas Clients'));
  
  // Intl Pages
  intlPages.forEach(i => allContent.push(genIntl(i)));
  
  for (let p of allContent) {
    let content = p.body + '\n\n' + p.schema;
    fs.writeFileSync(`${p.slug}.html`, content);
    
    const pid = await getWPItemBySlug(p.slug, p.type);
    const res = await wpUpdate(pid, content, p.title, p.slug, p.type);
    console.log(`Deployed ${p.type} | ${p.slug}: HTTP ${res.code}`);
  }
}
run();
