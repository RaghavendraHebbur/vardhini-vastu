const fs = require('fs');
const https = require('https');
const path = require('path');

const WP_BASE   = 'vardhinivastu.in';
const WP_USER   = 'raghu.hebbur@gmail.com';
const WP_PASS   = 'AD1vSJeLlP8fMcArlSZqcU2K';
const AUTH      = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

const pagesToDeploy = [
  { slug: 'vastu-for-bedroom', file: 'vastu-for-bedroom.html', title: 'Scientific Vastu for Bedrooms Guide | Vardhini Vastu' },
  { slug: 'vastu-for-kitchen', file: 'vastu-for-kitchen.html', title: 'Scientific Kitchen Vastu Shastra Remedies and Layouts' },
  { slug: 'south-facing-house-vastu', file: 'south-facing-house-vastu.html', title: 'Scientific South-Facing House Vastu | Vardhini Vastu' },
  { slug: 'vastu-for-main-door', file: 'vastu-for-main-door.html', title: 'Scientific Main Door Vastu | Vardhini Vastu' },
  { slug: 'vastu-for-house-plan', file: 'vastu-for-house-plan.html', title: 'Vastu for House Plan | Vardhini Vastu' }
];

function getPageIdBySlug(slug) {
  return new Promise((resolve, reject) => {
    https.get(`https://${WP_BASE}/wp-json/wp/v2/pages?slug=${slug}`, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const pages = JSON.parse(data);
          if (pages && pages.length > 0) {
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
    const reqPath = pageId ? `/wp-json/wp/v2/pages/${pageId}` : `/wp-json/wp/v2/pages`;
    
    const opts = {
      hostname: WP_BASE,
      path: reqPath,
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
          console.log(`[SUCCESS] Page ${slug} deployed.`);
          resolve(true);
        } else {
          console.error(`[ERROR] Page ${slug} failed - HTTP ${res.statusCode}: ${data.slice(0, 200)}`);
          resolve(false);
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function deployAll() {
  for (const page of pagesToDeploy) {
    if (!fs.existsSync(page.file)) {
      console.log(`[SKIP] ${page.file} not found.`);
      continue;
    }
    
    let html = fs.readFileSync(page.file, 'utf8');
    
    // Extract schema
    let schemaStr = '';
    const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (schemaMatch) {
      schemaStr = `<script type="application/ld+json">\n${schemaMatch[1]}\n</script>`;
    }
    
    // Extract main content
    let mainContent = '';
    const mainMatch = html.match(/<main>([\s\S]*?)<\/main>/);
    if (mainMatch) {
      mainContent = mainMatch[1];
    } else {
      mainContent = html; // fallback
    }
    
    // Combine
    const finalContent = mainContent + '\n\n' + schemaStr;
    
    try {
      const pageId = await getPageIdBySlug(page.slug);
      await wpUpdate(pageId, finalContent, page.title, page.slug);
    } catch (err) {
      console.error(`[ERROR] Processing ${page.slug}:`, err.message);
    }
  }
}

deployAll();
