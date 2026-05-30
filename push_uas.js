const https = require('https');
const fs = require('fs');

const WP_BASE   = 'vardhinivastu.in';
const WP_USER   = 'raghu.hebbur@gmail.com';
const WP_PASS   = 'AD1vSJeLlP8fMcArlSZqcU2K';
const AUTH      = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

const slug = 'universal-aura-scanner-vastu';

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

function createOrUpdatePage(slug, content, title) {
  return new Promise(async (resolve, reject) => {
    let method = 'POST';
    let path = `/wp-json/wp/v2/pages`;
    
    const existingId = await getPageIdBySlug(slug);
    if (existingId) {
      path = `/wp-json/wp/v2/pages/${existingId}`;
    }

    const body = JSON.stringify({ slug, content, title, status: 'publish' });
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
          console.log(`✓ Page (${title}) processed — HTTP ${res.statusCode}`);
          resolve(true);
        } else {
          console.error(`✗ Page failed — HTTP ${res.statusCode}: ${data.slice(0,200)}`);
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
  const html = fs.readFileSync('universal-aura-scanner-vastu.html', 'utf8');
  await createOrUpdatePage(slug, html, 'Universal Aura Scanner in Vastu: 5 Scientific Measurements');
  console.log("Done");
}

run().catch(console.error);
