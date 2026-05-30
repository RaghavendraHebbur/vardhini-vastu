const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const env = {
  ...process.env,
  WP_API_URL: "https://vardhinivastu.in/wp-json/mcp/novamira",
  WP_API_USERNAME: "raghu.hebbur@gmail.com",
  WP_API_PASSWORD: "AD1vSJeLlP8fMcArlSZqcU2K",
  OAUTH_ENABLED: "false"
};

// Core pages mapping (Only pushing Vastu guides for Component 2 now; main pages commented out)
const corePages = [
  { file: 'index.html', slug: 'home' },
  { file: 'about.html', slug: 'about' },
  { file: 'services.html', slug: 'services' },
  { file: 'contact.html', slug: 'contact' },
  { file: 'success-stories.html', slug: 'testimonials' },
  { file: 'in.html', slug: 'in' },
  { file: 'disclaimer.html', slug: 'disclaimer' },
  { file: 'privacy-policy.html', slug: 'privacy-policy' },
  { file: 'terms.html', slug: 'terms' },
  { file: 'vastu-for-house.html', slug: 'vastu-for-house' },
  { file: 'vastu-for-entrance-and-main-door.html', slug: 'vastu-for-entrance-and-main-door' },
  { file: 'vastu-for-kitchen.html', slug: 'vastu-for-kitchen' },
  { file: 'vastu-for-bedroom.html', slug: 'vastu-for-bedroom' },
  { file: 'vastu-for-pooja-room.html', slug: 'vastu-for-pooja-room' },
  { file: 'vastu-for-study-room.html', slug: 'vastu-for-study-room' },
  { file: 'vastu-for-toilet-and-bathroom.html', slug: 'vastu-for-toilet-and-bathroom' },
  { file: 'vastu-for-office.html', slug: 'vastu-for-office' },
  { file: 'vastu-for-business.html', slug: 'vastu-for-business' },
  { file: 'vastu-for-career.html', slug: 'vastu-for-career' },
  { file: 'vastu-for-wealth.html', slug: 'vastu-for-wealth' },
  { file: 'vastu-for-health.html', slug: 'vastu-for-health' },
  { file: 'vastu-for-marriage.html', slug: 'vastu-for-marriage' },
  { file: 'vastu-for-education.html', slug: 'vastu-for-education' },
  { file: 'vastu-tips.html', slug: 'vastu-tips' },
  { file: 'vastu-for-flats.html', slug: 'vastu-for-flats' },
  { file: 'vastu-for-factories.html', slug: 'vastu-for-factories' },
  { file: 'vastu-for-plots.html', slug: 'vastu-for-plots' },
  { file: 'vastu-purusha-mandala.html', slug: 'vastu-purusha-mandala' },
  { file: 't-point-house-vastu.html', slug: 't-point-house-vastu' },
  { file: 'vastu-myths-and-facts.html', slug: 'vastu-myths-and-facts' },
  { file: 'vastu-for-mirrors.html', slug: 'vastu-for-mirrors' },
  { file: 'vastu-for-conception-and-pregnancy.html', slug: 'vastu-for-conception-and-pregnancy' },
  { file: 'vastu-cut-in-north-east.html', slug: 'vastu-cut-in-north-east' },
  { file: 'geopathic-stress-remedies.html', slug: 'geopathic-stress-remedies' },
  { file: 'vastu-for-staircase.html', slug: 'vastu-for-staircase' },
  { file: 'vastu-for-septic-tank-and-drains.html', slug: 'vastu-for-septic-tank-and-drains' },
  { file: 'vastu-for-water-tank-and-borewell.html', slug: 'vastu-for-water-tank-and-borewell' },
  { file: 'vastu-for-brahmasthan.html', slug: 'vastu-for-brahmasthan' },
  { file: 'vastu-colors-for-home.html', slug: 'vastu-colors-for-home' },
  { file: 'vastu-plants-for-home.html', slug: 'vastu-plants-for-home' },
  { file: 'vastu-for-shops-and-showrooms.html', slug: 'vastu-for-shops-and-showrooms' },
  { file: 'vastu-for-mental-health-and-stress.html', slug: 'vastu-for-mental-health-and-stress' },
  { file: 'vastu-for-slopes-and-elevation.html', slug: 'vastu-for-slopes-and-elevation' },
  { file: 'vastu-cuts-and-extensions.html', slug: 'vastu-cuts-and-extensions' },
  { file: 'vastu-directions-and-compass.html', slug: 'vastu-directions-and-compass' },
  { file: 'emf-radiation-vastu-remedies.html', slug: 'emf-radiation-vastu-remedies' },
  { file: 'scientific-vastu-instruments.html', slug: 'scientific-vastu-instruments' },
  { file: 'telluric-cosmic-energies-vastu.html', slug: 'telluric-cosmic-energies-vastu' },
  { file: 'vastu-for-rented-house.html', slug: 'vastu-for-rented-house' },
  { file: 'south-facing-house-vastu.html', slug: 'south-facing-house-vastu' },
  { file: 'vastu-for-hotels-and-restaurants.html', slug: 'vastu-for-hotels-and-restaurants' },
  { file: 'vastu-for-hospitals-and-clinics.html', slug: 'vastu-for-hospitals-and-clinics' },
  { file: 'vastu-for-schools-and-colleges.html', slug: 'vastu-for-schools-and-colleges' },
  { file: 'sacred-geometry-golden-ratio-vastu.html', slug: 'sacred-geometry-golden-ratio-vastu' },
  { file: 'astro-vastu-home-remedies.html', slug: 'astro-vastu-home-remedies' },
  { file: 'space-clearing-low-frequency-remedies.html', slug: 'space-clearing-low-frequency-remedies' },
  { file: 'what-is-vastu.html', slug: 'what-is-vastu' },
  { file: 'vastu-for-house-construction.html', slug: 'vastu-for-house-construction' },
  { file: 'vastu-for-home-renovation.html', slug: 'vastu-for-home-renovation' },
  { file: 'vastu-for-doors-and-windows.html', slug: 'vastu-for-doors-and-windows' },
  { file: 'vastu-for-wardrobes-and-lockers.html', slug: 'vastu-for-wardrobes-and-lockers' },
  { file: 'vastu-for-guest-room.html', slug: 'vastu-for-guest-room' },
  { file: 'vastu-for-dining-room.html', slug: 'vastu-for-dining-room' },
  { file: 'vastu-for-garage-and-parking.html', slug: 'vastu-for-garage-and-parking' },
  { file: 'vastu-for-pets-and-animals.html', slug: 'vastu-for-pets-and-animals' },
  { file: 'vastu-for-commercial-complex.html', slug: 'vastu-for-commercial-complex' },
  { file: 'vastu-for-multistorey-buildings.html', slug: 'vastu-for-multistorey-buildings' },
  { file: 'vastu-for-banks.html', slug: 'vastu-for-banks' },
  { file: 'psychodynamic-radiesthesia-vastu.html', slug: 'psychodynamic-radiesthesia-vastu' },
  { file: 'vastu-for-interior-design.html', slug: 'vastu-for-interior-design' },
  { file: 'vastu-for-architectural-planning.html', slug: 'vastu-for-architectural-planning' },
  { file: 'vastu-for-it-companies.html', slug: 'vastu-for-it-companies' },
  { file: 'vastu-for-logo-and-brand-design.html', slug: 'vastu-for-logo-and-brand-design' },
  { file: 'vastu-for-warehouses-and-godowns.html', slug: 'vastu-for-warehouses-and-godowns' },
  { file: 'vastu-for-hostels-and-pgs.html', slug: 'vastu-for-hostels-and-pgs' },
  { file: 'vastu-for-jewelry-shops.html', slug: 'vastu-for-jewelry-shops' },
  { file: 'vastu-for-agricultural-land.html', slug: 'vastu-for-agricultural-land' },
  { file: 'vastu-for-gyms-and-fitness-centers.html', slug: 'vastu-for-gyms-and-fitness-centers' },
  { file: 'vastu-for-marriage-halls-and-venues.html', slug: 'vastu-for-marriage-halls-and-venues' },
  { file: 'vastu-for-salons-and-beauty-parlors.html', slug: 'vastu-for-salons-and-beauty-parlors' },
  { file: 'vastu-for-cinemas-and-theatres.html', slug: 'vastu-for-cinemas-and-theatres' },
  { file: 'vastu-for-petrol-pumps.html', slug: 'vastu-for-petrol-pumps' },
  { file: 'vastu-for-automobile-showrooms.html', slug: 'vastu-for-automobile-showrooms' },
  { file: 'vastu-for-supermarkets.html', slug: 'vastu-for-supermarkets' },
  { file: 'vastu-for-coaching-centers.html', slug: 'vastu-for-coaching-centers' },
  { file: 'vastu-for-cold-storages.html', slug: 'vastu-for-cold-storages' },
  { file: 'vastu-for-printing-press.html', slug: 'vastu-for-printing-press' },
  { file: 'vastu-for-dairy-farms.html', slug: 'vastu-for-dairy-farms' },
  { file: 'vastu-for-poultry-farms.html', slug: 'vastu-for-poultry-farms' },
  { file: 'vastu-for-cafes-and-bakeries.html', slug: 'vastu-for-cafes-and-bakeries' },
  { file: 'vastu-for-call-centers.html', slug: 'vastu-for-call-centers' },
  { file: 'vastu-for-breweries-and-distilleries.html', slug: 'vastu-for-breweries-and-distilleries' },
  { file: 'vastu-for-temples.html', slug: 'vastu-for-temples' },
  { file: 'vastu-for-law-firms-and-advocates.html', slug: 'vastu-for-law-firms-and-advocates' },
  { file: 'vastu-for-dental-clinics.html', slug: 'vastu-for-dental-clinics' },
  { file: 'vastu-for-chartered-accountants.html', slug: 'vastu-for-chartered-accountants' },
  { file: 'vastu-for-software-and-it-parks.html', slug: 'vastu-for-software-and-it-parks' },
  { file: 'vastu-for-pharmaceutical-factories.html', slug: 'vastu-for-pharmaceutical-factories' },
  { file: 'vastu-for-research-and-development-labs.html', slug: 'vastu-for-research-and-development-labs' },
  { file: 'vastu-for-solar-power-plants.html', slug: 'vastu-for-solar-power-plants' },
  { file: 'vastu-for-chemical-plants.html', slug: 'vastu-for-chemical-plants' },
  { file: 'vastu-for-textile-mills.html', slug: 'vastu-for-textile-mills' },
  { file: 'vastu-for-foundry-and-metal-factories.html', slug: 'vastu-for-foundry-and-metal-factories' },
  { file: 'vastu-for-electrical-substations.html', slug: 'vastu-for-electrical-substations' },
  { file: 'vastu-for-car-garages-and-workshops.html', slug: 'vastu-for-car-garages-and-workshops' },
  { file: 'vastu-for-sweet-and-savory-shops.html', slug: 'vastu-for-sweet-and-savory-shops' },
  { file: 'vastu-for-clothing-and-textile-shops.html', slug: 'vastu-for-clothing-and-textile-shops' },
  { file: 'vastu-for-electronics-stores.html', slug: 'vastu-for-electronics-stores' },
  { file: 'vastu-for-pharmacies-and-medical-stores.html', slug: 'vastu-for-pharmacies-and-medical-stores' },
  { file: 'vastu-for-ice-cream-parlors.html', slug: 'vastu-for-ice-cream-parlors' },
  { file: 'vastu-for-dry-cleaners-and-laundries.html', slug: 'vastu-for-dry-cleaners-and-laundries' },
  { file: 'vastu-for-photo-and-video-studios.html', slug: 'vastu-for-photo-and-video-studios' },
  { file: 'vastu-for-music-and-recording-studios.html', slug: 'vastu-for-music-and-recording-studios' },
  { file: 'vastu-for-libraries.html', slug: 'vastu-for-libraries' },
  { file: 'vastu-for-exhibition-and-art-galleries.html', slug: 'vastu-for-exhibition-and-art-galleries' },
  { file: 'vastu-for-veterinary-clinics.html', slug: 'vastu-for-veterinary-clinics' },
  { file: 'vastu-for-sports-stadiums.html', slug: 'vastu-for-sports-stadiums' },
  { file: 'vastu-for-bank-vaults.html', slug: 'vastu-for-bank-vaults' },
  { file: 'vastu-for-stock-brokerage-offices.html', slug: 'vastu-for-stock-brokerage-offices' },
  { file: 'vastu-for-hr-and-recruiting-agencies.html', slug: 'vastu-for-hr-and-recruiting-agencies' },
  { file: 'vastu-for-dance-and-music-schools.html', slug: 'vastu-for-dance-and-music-schools' },
  { file: 'vastu-for-living-room.html', slug: 'vastu-for-living-room' },
  { file: 'vastu-for-basement.html', slug: 'vastu-for-basement' },
  { file: 'vastu-for-balcony-and-verandah.html', slug: 'vastu-for-balcony-and-verandah' },
  { file: 'vastu-for-children-room.html', slug: 'vastu-for-children-room' },
  { file: 'vastu-for-store-room.html', slug: 'vastu-for-store-room' },
  { file: 'vastu-for-boundary-wall-and-gate.html', slug: 'vastu-for-boundary-wall-and-gate' },
  { file: 'vastu-for-courtyard-and-gardens.html', slug: 'vastu-for-courtyard-and-gardens' },
  { file: 'vastu-for-servant-quarter.html', slug: 'vastu-for-servant-quarter' },
  { file: 'vastu-for-home-gym-and-yoga-room.html', slug: 'vastu-for-home-gym-and-yoga-room' },
  { file: 'vastu-for-home-theater.html', slug: 'vastu-for-home-theater' },
  { file: 'vastu-for-overhead-water-tank.html', slug: 'vastu-for-overhead-water-tank' },
  { file: 'vastu-for-shopping-malls.html', slug: 'vastu-for-shopping-malls' },
  { file: 'vastu-for-boardrooms-and-conference-halls.html', slug: 'vastu-for-boardrooms-and-conference-halls' },
  { file: 'vastu-for-diagnostic-centers.html', slug: 'vastu-for-diagnostic-centers' },
  { file: 'vastu-for-wellness-spas-and-massage-parlors.html', slug: 'vastu-for-wellness-spas-and-massage-parlors' },
  { file: 'vastu-for-hardware-shops.html', slug: 'vastu-for-hardware-shops' },
  { file: 'vastu-for-furniture-showrooms.html', slug: 'vastu-for-furniture-showrooms' },
  { file: 'vastu-for-travel-agencies.html', slug: 'vastu-for-travel-agencies' },
  { file: 'vastu-for-optical-shops.html', slug: 'vastu-for-optical-shops' },
  { file: 'vastu-for-toy-shops.html', slug: 'vastu-for-toy-shops' },
  { file: 'vastu-for-gift-shops.html', slug: 'vastu-for-gift-shops' },
  { file: 'vastu-for-yoga-and-meditation-centers.html', slug: 'vastu-for-yoga-and-meditation-centers' },
  { file: 'vastu-for-organic-farms.html', slug: 'vastu-for-organic-farms' },
  { file: 'vastu-for-fisheries-and-aquaculture.html', slug: 'vastu-for-fisheries-and-aquaculture' },
  { file: 'vastu-for-gas-agencies-and-lpg-godowns.html', slug: 'vastu-for-gas-agencies-and-lpg-godowns' },
  { file: 'vastu-for-resorts-and-theme-parks.html', slug: 'vastu-for-resorts-and-theme-parks' },
  { file: 'vastu-for-food-courts-and-cloud-kitchens.html', slug: 'vastu-for-food-courts-and-cloud-kitchens' },
  { file: 'vastu-for-daycare-and-play-schools.html', slug: 'vastu-for-daycare-and-play-schools' },
  { file: 'vastu-for-rehabilitation-and-de-addiction-centers.html', slug: 'vastu-for-rehabilitation-and-de-addiction-centers' },
  { file: 'vastu-for-rice-mills-and-agro-processing-plants.html', slug: 'vastu-for-rice-mills-and-agro-processing-plants' },
  { file: 'vastu-for-cement-and-brick-manufacturing-plants.html', slug: 'vastu-for-cement-and-brick-manufacturing-plants' },
  { file: 'vastu-for-paper-and-pulp-mills.html', slug: 'vastu-for-paper-and-pulp-mills' },
  { file: 'vastu-for-leather-tanneries-and-footwear-factories.html', slug: 'vastu-for-leather-tanneries-and-footwear-factories' },
  { file: 'vastu-for-sugar-factories-and-bio-ethanol-plants.html', slug: 'vastu-for-sugar-factories-and-bio-ethanol-plants' },
  { file: 'vastu-for-steel-and-iron-re-rolling-mills.html', slug: 'vastu-for-steel-and-iron-re-rolling-mills' },
  { file: 'vastu-for-gaushalas-and-cow-shelters.html', slug: 'vastu-for-gaushalas-and-cow-shelters' },
  { file: 'vastu-for-brick-kilns-and-tile-factories.html', slug: 'vastu-for-brick-kilns-and-tile-factories' },
  { file: 'vastu-for-co-working-spaces-and-shared-offices.html', slug: 'vastu-for-co-working-spaces-and-shared-offices' },
  { file: 'vastu-for-e-commerce-warehouses-and-fulfillment-centers.html', slug: 'vastu-for-e-commerce-warehouses-and-fulfillment-centers' },
  { file: 'vastu-for-jewelry-manufacturing-and-gold-workshops.html', slug: 'vastu-for-jewelry-manufacturing-and-gold-workshops' },
  { file: 'vastu-for-blood-banks-and-specimen-storage.html', slug: 'vastu-for-blood-banks-and-specimen-storage' },
  { file: 'vastu-for-physiotherapy-and-chiropractic-clinics.html', slug: 'vastu-for-physiotherapy-and-chiropractic-clinics' },
  { file: 'vastu-for-ashrams-and-spiritual-retreats.html', slug: 'vastu-for-ashrams-and-spiritual-retreats' },
  { file: 'vastu-for-museums-and-cultural-centers.html', slug: 'vastu-for-museums-and-cultural-centers' },
  { file: 'vastu-for-film-studios-and-shooting-floors.html', slug: 'vastu-for-film-studios-and-shooting-floors' },
  { file: 'vastu-for-ev-charging-stations-and-battery-hubs.html', slug: 'vastu-for-ev-charging-stations-and-battery-hubs' },
  { file: 'vastu-for-fintech-and-crypto-trading-offices.html', slug: 'vastu-for-fintech-and-crypto-trading-offices' },
  { file: 'vastu-for-sports-arenas-and-indoor-stadiums.html', slug: 'vastu-for-sports-arenas-and-indoor-stadiums' },
  { file: 'vastu-for-florists-and-flower-shops.html', slug: 'vastu-for-florists-and-flower-shops' },
  { file: 'vastu-for-stud-farms-and-horse-stables.html', slug: 'vastu-for-stud-farms-and-horse-stables' }
];

function getPagesPayload() {
  const payload = [];

  // 1. Process Core Pages
  corePages.forEach(p => {
    if (!fs.existsSync(p.file)) {
      console.log(`Core file missing: ${p.file}`);
      return;
    }
    const html = fs.readFileSync(p.file, 'utf8');
    const parsed = parseHtml(html, p.file);
    payload.push({
      slug: p.slug,
      title: parsed.title,
      description: parsed.description,
      content: parsed.content
    });
  });

  // 2. Process Location Pages
  const locationsDir = 'locations';
  if (fs.existsSync(locationsDir)) {
    const items = fs.readdirSync(locationsDir);
    items.forEach(item => {
      const itemPath = path.join(locationsDir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const indexFile = path.join(itemPath, 'index.html');
        if (fs.existsSync(indexFile)) {
          const html = fs.readFileSync(indexFile, 'utf8');
          const parsed = parseHtml(html, indexFile);
          payload.push({
            slug: item,
            title: parsed.title,
            description: parsed.description,
            content: parsed.content
          });
        }
      }
    });
  }

  return payload;
}

function parseHtml(html, filePath) {
  // Title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].trim() : "";
  title = title.replace(/&amp;/g, '&');

  // Description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i) || 
                    html.match(/<meta\s+content="([\s\S]*?)"\s+name="description"/i);
  let description = descMatch ? descMatch[1].trim() : "";
  description = description.replace(/&amp;/g, '&');

  // Main content (Gutenberg wrapped)
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let mainContent = mainMatch ? mainMatch[1].trim() : "";
  
  // Wrap in Gutenberg HTML block with .vv class
  const content = `<!-- wp:html -->\n<div class="vv">\n${mainContent}\n</div>\n<!-- /wp:html -->`;

  return { title, description, content };
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

  child.stderr.on('data', (data) => {
    // console.error(data.toString());
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
  const pages = getPagesPayload();
  console.log(`Prepared ${pages.length} pages to push.`);

  const mcp = runWPMCP();

  try {
    // 1. Initialize
    console.log("Initializing connection to WordPress MCP server...");
    await mcp.sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'antigravity', version: '1.0.0' }
    });

    child_stdin_write = (notification) => {
      // We manually construct notifications if needed
    };

    // 2. Batch and Send pages
    const batchSize = 3;
    const totalBatches = Math.ceil(pages.length / batchSize);

    for (let i = 0; i < pages.length; i += batchSize) {
      const batch = pages.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      console.log(`\n--- Pushing Batch ${batchNum}/${totalBatches} (${batch.length} pages) ---`);

      const payloadBase64 = Buffer.from(JSON.stringify(batch)).toString('base64');
      const phpCode = `
        $payload_b64 = '${payloadBase64}';
        $payload = json_decode(base64_decode($payload_b64), true);
        $results = [];
        
        foreach ($payload as $item) {
            $slug = $item['slug'];
            $title = $item['title'];
            $content = $item['content'];
            $desc = $item['description'];
            
            // Find post by slug
            $posts = get_posts([
                'name' => $slug,
                'post_type' => 'page',
                'post_status' => 'any',
                'posts_per_page' => 1
            ]);
            
            $post_id = 0;
            if (!empty($posts)) {
                $post_id = $posts[0]->ID;
            }
            
            $post_arr = [
                'post_type' => 'page',
                'post_status' => 'publish',
                'post_title' => $title,
                'post_content' => $content
            ];
            
            if ($post_id > 0) {
                $post_arr['ID'] = $post_id;
                $res = wp_update_post($post_arr, true);
                $action = 'update';
            } else {
                $post_arr['post_name'] = $slug;
                $res = wp_insert_post($post_arr, true);
                $post_id = is_wp_error($res) ? 0 : $res;
                $action = 'insert';
            }
            
            if (is_wp_error($res)) {
                $results[] = [
                    'slug' => $slug,
                    'status' => 'error',
                    'message' => $res->get_error_message()
                ];
            } else {
                // Update Rank Math SEO metadata
                update_post_meta($post_id, 'rank_math_title', $title);
                update_post_meta($post_id, 'rank_math_description', $desc);
                
                // Construct a focus keyword from locality or generic
                $kw = str_replace(' | Vardhini Vastu', '', $title);
                $kw = str_replace('Best Vastu Consultant in ', '', $kw);
                $kw = str_replace('Expert Vastu Consultant in ', '', $kw);
                $kw = trim(str_replace(' | Online Scientific Vastu', '', $kw));
                $kw = trim(str_replace(' | Scientific Vastu Shastra', '', $kw));
                update_post_meta($post_id, 'rank_math_focus_keyword', "Vastu Consultant " . $kw);
                
                $results[] = [
                    'slug' => $slug,
                    'status' => 'success',
                    'action' => $action,
                    'id' => $post_id
                ];
            }
        }
        echo json_encode($results);
      `;

      const response = await mcp.sendRequest('tools/call', {
        name: 'mcp-adapter-execute-ability',
        arguments: {
          ability_name: "novamira/execute-php",
          parameters: {
            code: phpCode
          }
        }
      });

      if (response.result && response.result.content) {
        const text = response.result.content[0].text;
        try {
          const resultObj = JSON.parse(text);
          if (resultObj.success && resultObj.data) {
            const batchResults = JSON.parse(resultObj.data.output);
            batchResults.forEach(r => {
              if (r.status === 'success') {
                console.log(`  [OK] Slug: "${r.slug}" -> ${r.action.toUpperCase()} (ID: ${r.id})`);
              } else {
                console.log(`  [FAIL] Slug: "${r.slug}" -> Error: ${r.message}`);
              }
            });
          } else {
            console.log("  [ERROR] Execution failed:", text);
          }
        } catch (err) {
          console.log("  [ERROR] Failed to parse response:", text);
        }
      } else {
        console.log("  [ERROR] Empty or invalid response:", JSON.stringify(response, null, 2));
      }
    }

    console.log("\nAll batches completed!");
    mcp.kill();

  } catch (err) {
    console.error("Fatal Error:", err);
    mcp.kill();
  }
}

// Small delay to let the npx.cmd command resolve/spin up
setTimeout(main, 2000);
