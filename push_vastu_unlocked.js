const https = require('https');
const fs = require('fs');

const WP_BASE   = 'vardhinivastu.in';
const WP_USER   = 'raghu.hebbur@gmail.com';
const WP_PASS   = 'AD1vSJeLlP8fMcArlSZqcU2K';
const AUTH      = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

const pagesToPush = [
  { file: 'vastu-unlocked.html', slug: 'vastu-unlocked', title: 'Vastu Unlocked: The Science of Harmony | Vardhini Vastu' },
  { file: 'telluric-cosmic-energies-vastu.html', slug: 'telluric-cosmic-energies-vastu', title: 'Telluric & Cosmic Energies in Vastu | Vardhini Vastu' },
  { file: 'scientific-vastu-instruments.html', slug: 'scientific-vastu-instruments', title: 'Scientific Vastu Instruments & Scanners | Vardhini Vastu' },
  { file: 'geopathic-stress-remedies.html', slug: 'geopathic-stress-remedies', title: 'Geopathic Stress Remedies in Vastu | Vardhini Vastu' }
];

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
    const method = pageId ? 'POST' : 'POST';
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

async function run() {
  for (const p of pagesToPush) {
    if (!fs.existsSync(p.file)) {
      console.log(`Skip: ${p.file} not found.`);
      continue;
    }
    
    let pageId = await getPageIdBySlug(p.slug);
    
    const html = fs.readFileSync(p.file, 'utf8');
    const bodyMatch = html.match(new RegExp('<body[^>]*>(.*?)</body>', 'is'));
    const inner = bodyMatch ? bodyMatch[1].trim() : html;
    const contentToPush = `<!-- wp:html -->\n<div class="vv">\n${inner}\n</div>\n<!-- /wp:html -->`;
    
    await wpUpdate(pageId, contentToPush, p.title, p.slug);
  }
  console.log("Done");
}

run().catch(console.error);
