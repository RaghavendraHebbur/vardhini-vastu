const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const env = {
  ...process.env,
  WP_API_URL: "https://vardhinivastu.in/wp-json/mcp/novamira",
  WP_API_USERNAME: "raghu.hebbur@gmail.com",
  WP_API_PASSWORD: "AD1vSJeLlP8fMcArlSZqcU2K",
  OAUTH_ENABLED: "false"
};

// Core pages mapping to output URLs
const coreUrls = [
  'https://vardhinivastu.in/',
  'https://vardhinivastu.in/about/',
  'https://vardhinivastu.in/services/',
  'https://vardhinivastu.in/contact/',
  'https://vardhinivastu.in/testimonials/',
  'https://vardhinivastu.in/in/',
  'https://vardhinivastu.in/disclaimer/',
  'https://vardhinivastu.in/privacy-policy/',
  'https://vardhinivastu.in/terms/',
  'https://vardhinivastu.in/vastu-for-house/',
  'https://vardhinivastu.in/vastu-for-entrance-and-main-door/',
  'https://vardhinivastu.in/vastu-for-kitchen/',
  'https://vardhinivastu.in/vastu-for-bedroom/',
  'https://vardhinivastu.in/vastu-for-pooja-room/',
  'https://vardhinivastu.in/vastu-for-study-room/',
  'https://vardhinivastu.in/vastu-for-toilet-and-bathroom/',
  'https://vardhinivastu.in/vastu-for-office/',
  'https://vardhinivastu.in/vastu-for-business/',
  'https://vardhinivastu.in/vastu-for-career/',
  'https://vardhinivastu.in/vastu-for-wealth/',
  'https://vardhinivastu.in/vastu-for-health/',
  'https://vardhinivastu.in/vastu-for-marriage/',
  'https://vardhinivastu.in/vastu-for-education/',
  'https://vardhinivastu.in/vastu-tips/',
  'https://vardhinivastu.in/vastu-for-flats/',
  'https://vardhinivastu.in/vastu-for-factories/',
  'https://vardhinivastu.in/vastu-for-plots/',
  'https://vardhinivastu.in/vastu-purusha-mandala/',
  'https://vardhinivastu.in/t-point-house-vastu/',
  'https://vardhinivastu.in/vastu-myths-and-facts/',
  'https://vardhinivastu.in/vastu-for-mirrors/',
  'https://vardhinivastu.in/vastu-for-conception-and-pregnancy/',
  'https://vardhinivastu.in/vastu-cut-in-north-east/',
  'https://vardhinivastu.in/geopathic-stress-remedies/',
  'https://vardhinivastu.in/vastu-for-staircase/',
  'https://vardhinivastu.in/vastu-for-septic-tank-and-drains/',
  'https://vardhinivastu.in/vastu-for-water-tank-and-borewell/',
  'https://vardhinivastu.in/vastu-for-brahmasthan/',
  'https://vardhinivastu.in/vastu-colors-for-home/',
  'https://vardhinivastu.in/vastu-plants-for-home/',
  'https://vardhinivastu.in/vastu-for-shops-and-showrooms/',
  'https://vardhinivastu.in/vastu-for-mental-health-and-stress/',
  'https://vardhinivastu.in/vastu-for-slopes-and-elevation/',
  'https://vardhinivastu.in/vastu-cuts-and-extensions/',
  'https://vardhinivastu.in/vastu-directions-and-compass/',
  'https://vardhinivastu.in/emf-radiation-vastu-remedies/',
  'https://vardhinivastu.in/scientific-vastu-instruments/',
  'https://vardhinivastu.in/telluric-cosmic-energies-vastu/',
  'https://vardhinivastu.in/vastu-for-rented-house/',
  'https://vardhinivastu.in/south-facing-house-vastu/',
  'https://vardhinivastu.in/vastu-for-hotels-and-restaurants/',
  'https://vardhinivastu.in/vastu-for-hospitals-and-clinics/',
  'https://vardhinivastu.in/vastu-for-schools-and-colleges/',
  'https://vardhinivastu.in/sacred-geometry-golden-ratio-vastu/',
  'https://vardhinivastu.in/astro-vastu-home-remedies/',
  'https://vardhinivastu.in/space-clearing-low-frequency-remedies/',
  'https://vardhinivastu.in/what-is-vastu/',
  'https://vardhinivastu.in/vastu-for-house-construction/',
  'https://vardhinivastu.in/vastu-for-home-renovation/',
  'https://vardhinivastu.in/vastu-for-doors-and-windows/',
  'https://vardhinivastu.in/vastu-for-wardrobes-and-lockers/',
  'https://vardhinivastu.in/vastu-for-guest-room/',
  'https://vardhinivastu.in/vastu-for-dining-room/',
  'https://vardhinivastu.in/vastu-for-garage-and-parking/',
  'https://vardhinivastu.in/vastu-for-pets-and-animals/',
  'https://vardhinivastu.in/vastu-for-commercial-complex/',
  'https://vardhinivastu.in/vastu-for-multistorey-buildings/',
  'https://vardhinivastu.in/vastu-for-banks/',
  'https://vardhinivastu.in/psychodynamic-radiesthesia-vastu/',
  'https://vardhinivastu.in/vastu-for-interior-design/',
  'https://vardhinivastu.in/vastu-for-architectural-planning/',
  'https://vardhinivastu.in/vastu-for-it-companies/',
  'https://vardhinivastu.in/vastu-for-logo-and-brand-design/',
  'https://vardhinivastu.in/vastu-for-warehouses-and-godowns/',
  'https://vardhinivastu.in/vastu-for-hostels-and-pgs/',
  'https://vardhinivastu.in/vastu-for-jewelry-shops/',
  'https://vardhinivastu.in/vastu-for-agricultural-land/',
  'https://vardhinivastu.in/vastu-for-gyms-and-fitness-centers/',
  'https://vardhinivastu.in/vastu-for-marriage-halls-and-venues/',
  'https://vardhinivastu.in/vastu-for-salons-and-beauty-parlors/',
  'https://vardhinivastu.in/vastu-for-cinemas-and-theatres/',
  'https://vardhinivastu.in/vastu-for-petrol-pumps/',
  'https://vardhinivastu.in/vastu-for-automobile-showrooms/',
  'https://vardhinivastu.in/vastu-for-supermarkets/',
  'https://vardhinivastu.in/vastu-for-coaching-centers/',
  'https://vardhinivastu.in/vastu-for-cold-storages/',
  'https://vardhinivastu.in/vastu-for-printing-press/',
  'https://vardhinivastu.in/vastu-for-dairy-farms/',
  'https://vardhinivastu.in/vastu-for-poultry-farms/',
  'https://vardhinivastu.in/vastu-for-cafes-and-bakeries/',
  'https://vardhinivastu.in/vastu-for-call-centers/',
  'https://vardhinivastu.in/vastu-for-breweries-and-distilleries/',
  'https://vardhinivastu.in/vastu-for-temples/',
  'https://vardhinivastu.in/vastu-for-law-firms-and-advocates/',
  'https://vardhinivastu.in/vastu-for-dental-clinics/',
  'https://vardhinivastu.in/vastu-for-chartered-accountants/',
  'https://vardhinivastu.in/vastu-for-software-and-it-parks/',
  'https://vardhinivastu.in/vastu-for-pharmaceutical-factories/',
  'https://vardhinivastu.in/vastu-for-research-and-development-labs/',
  'https://vardhinivastu.in/vastu-for-solar-power-plants/',
  'https://vardhinivastu.in/vastu-for-chemical-plants/',
  'https://vardhinivastu.in/vastu-for-textile-mills/',
  'https://vardhinivastu.in/vastu-for-foundry-and-metal-factories/',
  'https://vardhinivastu.in/vastu-for-electrical-substations/',
  'https://vardhinivastu.in/vastu-for-car-garages-and-workshops/',
  'https://vardhinivastu.in/vastu-for-sweet-and-savory-shops/',
  'https://vardhinivastu.in/vastu-for-clothing-and-textile-shops/',
  'https://vardhinivastu.in/vastu-for-electronics-stores/',
  'https://vardhinivastu.in/vastu-for-pharmacies-and-medical-stores/',
  'https://vardhinivastu.in/vastu-for-ice-cream-parlors/',
  'https://vardhinivastu.in/vastu-for-dry-cleaners-and-laundries/',
  'https://vardhinivastu.in/vastu-for-photo-and-video-studios/',
  'https://vardhinivastu.in/vastu-for-music-and-recording-studios/',
  'https://vardhinivastu.in/vastu-for-libraries/',
  'https://vardhinivastu.in/vastu-for-exhibition-and-art-galleries/',
  'https://vardhinivastu.in/vastu-for-veterinary-clinics/',
  'https://vardhinivastu.in/vastu-for-sports-stadiums/',
  'https://vardhinivastu.in/vastu-for-bank-vaults/',
  'https://vardhinivastu.in/vastu-for-stock-brokerage-offices/',
  'https://vardhinivastu.in/vastu-for-hr-and-recruiting-agencies/',
  'https://vardhinivastu.in/vastu-for-dance-and-music-schools/',
  'https://vardhinivastu.in/vastu-for-living-room/',
  'https://vardhinivastu.in/vastu-for-basement/',
  'https://vardhinivastu.in/vastu-for-balcony-and-verandah/',
  'https://vardhinivastu.in/vastu-for-children-room/',
  'https://vardhinivastu.in/vastu-for-store-room/',
  'https://vardhinivastu.in/vastu-for-boundary-wall-and-gate/',
  'https://vardhinivastu.in/vastu-for-courtyard-and-gardens/',
  'https://vardhinivastu.in/vastu-for-servant-quarter/',
  'https://vardhinivastu.in/vastu-for-home-gym-and-yoga-room/',
  'https://vardhinivastu.in/vastu-for-home-theater/',
  'https://vardhinivastu.in/vastu-for-overhead-water-tank/',
  'https://vardhinivastu.in/vastu-for-shopping-malls/',
  'https://vardhinivastu.in/vastu-for-boardrooms-and-conference-halls/',
  'https://vardhinivastu.in/vastu-for-diagnostic-centers/',
  'https://vardhinivastu.in/vastu-for-wellness-spas-and-massage-parlors/',
  'https://vardhinivastu.in/vastu-for-hardware-shops/',
  'https://vardhinivastu.in/vastu-for-furniture-showrooms/',
  'https://vardhinivastu.in/vastu-for-travel-agencies/',
  'https://vardhinivastu.in/vastu-for-optical-shops/',
  'https://vardhinivastu.in/vastu-for-toy-shops/',
  'https://vardhinivastu.in/vastu-for-gift-shops/',
  'https://vardhinivastu.in/vastu-for-yoga-and-meditation-centers/',
  'https://vardhinivastu.in/vastu-for-organic-farms/',
  'https://vardhinivastu.in/vastu-for-fisheries-and-aquaculture/',
  'https://vardhinivastu.in/vastu-for-gas-agencies-and-lpg-godowns/',
  'https://vardhinivastu.in/vastu-for-resorts-and-theme-parks/',
  'https://vardhinivastu.in/vastu-for-food-courts-and-cloud-kitchens/',
  'https://vardhinivastu.in/vastu-for-daycare-and-play-schools/',
  'https://vardhinivastu.in/vastu-for-rehabilitation-and-de-addiction-centers/',
  'https://vardhinivastu.in/vastu-for-rice-mills-and-agro-processing-plants/',
  'https://vardhinivastu.in/vastu-for-cement-and-brick-manufacturing-plants/',
  'https://vardhinivastu.in/vastu-for-paper-and-pulp-mills/',
  'https://vardhinivastu.in/vastu-for-leather-tanneries-and-footwear-factories/',
  'https://vardhinivastu.in/vastu-for-sugar-factories-and-bio-ethanol-plants/',
  'https://vardhinivastu.in/vastu-for-steel-and-iron-re-rolling-mills/',
  'https://vardhinivastu.in/vastu-for-gaushalas-and-cow-shelters/',
  'https://vardhinivastu.in/vastu-for-brick-kilns-and-tile-factories/',
  'https://vardhinivastu.in/vastu-for-co-working-spaces-and-shared-offices/',
  'https://vardhinivastu.in/vastu-for-e-commerce-warehouses-and-fulfillment-centers/',
  'https://vardhinivastu.in/vastu-for-jewelry-manufacturing-and-gold-workshops/',
  'https://vardhinivastu.in/vastu-for-blood-banks-and-specimen-storage/',
  'https://vardhinivastu.in/vastu-for-physiotherapy-and-chiropractic-clinics/',
  'https://vardhinivastu.in/vastu-for-ashrams-and-spiritual-retreats/',
  'https://vardhinivastu.in/vastu-for-museums-and-cultural-centers/',
  'https://vardhinivastu.in/vastu-for-film-studios-and-shooting-floors/',
  'https://vardhinivastu.in/vastu-for-ev-charging-stations-and-battery-hubs/',
  'https://vardhinivastu.in/vastu-for-fintech-and-crypto-trading-offices/',
  'https://vardhinivastu.in/vastu-for-sports-arenas-and-indoor-stadiums/',
  'https://vardhinivastu.in/vastu-for-florists-and-flower-shops/',
  'https://vardhinivastu.in/vastu-for-stud-farms-and-horse-stables/'
];

function generateSitemap() {
  const dateStr = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Add core URLs
  coreUrls.forEach(url => {
    const priority = url === 'https://vardhinivastu.in/' ? '1.0' : '0.8';
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${dateStr}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // 2. Add Location URLs from directories
  const locationsDir = 'locations';
  if (fs.existsSync(locationsDir)) {
    const items = fs.readdirSync(locationsDir);
    items.forEach(item => {
      const itemPath = path.join(locationsDir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const indexFile = path.join(itemPath, 'index.html');
        if (fs.existsSync(indexFile)) {
          xml += `  <url>\n`;
          xml += `    <loc>https://vardhinivastu.in/${item}/</loc>\n`;
          xml += `    <lastmod>${dateStr}</lastmod>\n`;
          xml += `    <changefreq>monthly</changefreq>\n`;
          xml += `    <priority>0.6</priority>\n`;
          xml += `  </url>\n`;
        }
      }
    });
  }

  xml += `</urlset>\n`;
  fs.writeFileSync('sitemap.xml', xml, 'utf8');
  console.log("Successfully generated sitemap.xml locally.");
  return xml;
}

function generateRobots() {
  const robots = `User-agent: *\nAllow: /\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\n\nSitemap: https://vardhinivastu.in/sitemap.xml\n`;
  fs.writeFileSync('robots.txt', robots, 'utf8');
  console.log("Successfully generated robots.txt locally.");
  return robots;
}

// Spawns MCP client and handles JSON-RPC
function runWPMCP() {
  const child = spawn('npx.cmd', ['-y', '@automattic/mcp-wordpress-remote'], { 
    env,
    shell: true
  });

  let buffer = '';
  child.stdout.on('data', (data) => {
    buffer += data.toString();
    processBuffer();
  });

  let idCounter = 1;
  const callbacks = {};

  function sendRequest(method, params = {}) {
    const id = idCounter++;
    const request = {
      jsonrpc: '2.0',
      id,
      method,
      params
    };
    return new Promise((resolve, reject) => {
      callbacks[id] = { resolve, reject };
      child.stdin.write(JSON.stringify(request) + '\n');
    });
  }

  function processBuffer() {
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const msg = JSON.parse(line);
        if (msg.id && callbacks[msg.id]) {
          callbacks[msg.id].resolve(msg);
          delete callbacks[msg.id];
        }
      } catch (e) {
        // Ignored
      }
    }
  }

  return { sendRequest, kill: () => child.kill() };
}

async function main() {
  const sitemapXml = generateSitemap();
  const robotsTxt = generateRobots();

  const mcp = runWPMCP();

  try {
    console.log("Initializing connection to WordPress MCP server...");
    await mcp.sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'antigravity', version: '1.0.0' }
    });

    // Upload robots.txt to WordPress root
    console.log("Uploading robots.txt to remote WordPress root...");
    const resRobots = await mcp.sendRequest('tools/call', {
      name: 'mcp-adapter-execute-ability',
      arguments: {
        ability_name: "novamira/write-file",
        parameters: {
          path: "robots.txt",
          content: robotsTxt
        }
      }
    });
    console.log("Robots.txt write status:", JSON.stringify(resRobots.result, null, 2));

    // Upload sitemap.xml to WordPress root
    console.log("Uploading sitemap.xml to remote WordPress root...");
    const resSitemap = await mcp.sendRequest('tools/call', {
      name: 'mcp-adapter-execute-ability',
      arguments: {
        ability_name: "novamira/write-file",
        parameters: {
          path: "sitemap.xml",
          content: sitemapXml
        }
      }
    });
    console.log("Sitemap.xml write status:", JSON.stringify(resSitemap.result, null, 2));

    mcp.kill();
    console.log("All tasks completed!");

  } catch (err) {
    console.error("Fatal Error:", err);
    mcp.kill();
  }
}

setTimeout(main, 2000);
