const https = require('https');
const fs = require('fs');

const WP_BASE   = 'vardhinivastu.in';
const WP_USER   = 'raghu.hebbur@gmail.com';
const WP_PASS   = 'AD1vSJeLlP8fMcArlSZqcU2K';
const AUTH      = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

const slug = 'science-of-vids';

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
          console.log(`✓ Page ${pageId || 'Created'} (${title}) updated — HTTP ${res.statusCode}`);
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
  let pageId = await getPageIdBySlug(slug);
  if (!pageId) {
    console.log(`Could not find page with slug: ${slug}. Will create a new one.`);
  } else {
    console.log("Found Page ID: " + pageId);
  }
  
  const html = fs.readFileSync('science-of-vids.html', 'utf8');
  const bodyMatch = html.match(new RegExp('<body[^>]*>(.*?)</body>', 'is'));
  
  // Wrap in Gutenberg div for consistency
  const inner = bodyMatch ? bodyMatch[1].trim() : html;
  const contentToPush = `<!-- wp:html -->\n<div class="vv">\n${inner}\n</div>\n<!-- /wp:html -->`;
  
  await wpUpdate(pageId, contentToPush, 'The Science of VIDS™: Radiesthesia & Geopathic Stress | Vardhini Vastu');
  console.log("Done");
}

run().catch(console.error);
