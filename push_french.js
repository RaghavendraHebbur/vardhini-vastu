const https = require('https');
const fs = require('fs');

const WP_BASE   = 'vardhinivastu.in';
const WP_USER   = 'raghu.hebbur@gmail.com';
const WP_PASS   = 'AD1vSJeLlP8fMcArlSZqcU2K';
const AUTH      = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

const slug = 'french-vs-german-radiesthesia';

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

function wpUpdate(pageId, content, title) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ content, title, status: 'publish' });
    const opts = {
      hostname: WP_BASE,
      path: `/wp-json/wp/v2/pages/${pageId}`,
      method: 'POST',
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
          console.log(`✓ Page ${pageId} (${title}) updated — HTTP ${res.statusCode}`);
          resolve(true);
        } else {
          console.error(`✗ Page ${pageId} failed — HTTP ${res.statusCode}: ${data.slice(0,200)}`);
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
  const pageId = await getPageIdBySlug(slug);
  if (!pageId) {
    console.log("Could not find page with slug: " + slug);
    return;
  }
  console.log("Found Page ID: " + pageId);
  const html = fs.readFileSync('french-vs-german-radiesthesia.html', 'utf8');
  const bodyMatch = html.match(new RegExp('<body[^>]*>(.*?)</body>', 'is'));
  const contentToPush = bodyMatch ? bodyMatch[1].trim() : html;
  await wpUpdate(pageId, contentToPush, 'French vs German Schools of Radiesthesia | Complete Scientific Comparison');
  console.log("Done");
}

run().catch(console.error);
