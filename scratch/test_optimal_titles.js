const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\raghu\\Documents\\Vardhini Vastu Rebuild website';
const generators = [
  'generate_all_26_pages.js',
  'generate_all_25_pages.js',
  'generate_batch_3_pages.js',
  'generate_batch_4_pages.js',
  'generate_batch_5_pages.js',
  'generate_all_17_pages.py'
];

const specialMap = {
  'vastu-for-co-working-spaces-and-shared-offices.html': 'Scientific Vastu for Co-Working Spaces',
  'vastu-for-e-commerce-warehouses-and-fulfillment-centers.html': 'Vastu for E-Commerce Warehouses Guide',
  'vastu-for-steel-and-iron-re-rolling-mills.html': 'Industrial Vastu for Re-Rolling Mills',
  'vastu-for-ev-charging-stations-and-battery-hubs.html': 'Vastu for EV Charging Stations Guide',
  'vastu-for-cement-and-brick-manufacturing-plants.html': 'Industrial Vastu for Cement Plants',
  'vastu-for-brick-kilns-and-tile-factories.html': 'Industrial Vastu for Brick Kilns Guide',
  'vastu-for-jewelry-manufacturing-and-gold-workshops.html': 'Vastu for Jewelry Manufacturing Guide',
  'vastu-for-blood-banks-and-specimen-storage.html': 'Vastu for Blood Banks & Storage Guide',
  'vastu-for-physiotherapy-and-chiropractic-clinics.html': 'Vastu for Physiotherapy Clinics Guide',
  'vastu-for-ashrams-and-spiritual-retreats.html': 'Scientific Vastu for Ashrams & Retreats',
  'vastu-for-museums-and-cultural-centers.html': 'Vastu for Museums & Cultural Centers',
  'vastu-for-film-studios-and-shooting-floors.html': 'Vastu for Film Studios & Shooting Floors',
  'vastu-for-fintech-and-crypto-trading-offices.html': 'Vastu for Fintech & Crypto Offices',
  'vastu-for-sports-arenas-and-indoor-stadiums.html': 'Vastu for Sports Arenas & Stadiums Guide',
  'vastu-for-florists-and-flower-shops.html': 'Scientific Vastu for Flower Shops',
  'vastu-for-stud-farms-and-horse-stables.html': 'Vastu for Stud Farms & Horse Stables',
  'vastu-for-rehabilitation-and-de-addiction-centers.html': 'Vastu for Rehab & De-Addiction Centers',
  'vastu-for-rice-mills-and-agro-processing-plants.html': 'Industrial Vastu for Rice Mills Guide',
  'vastu-for-paper-and-pulp-mills.html': 'Industrial Vastu for Paper & Pulp Mills',
  'vastu-for-leather-tanneries-and-footwear-factories.html': 'Industrial Vastu for Leather Tanneries',
  'vastu-for-sugar-factories-and-bio-ethanol-plants.html': 'Industrial Vastu for Sugar Factories',
  't-point-house-vastu.html': 'Scientific Vastu for T-Point Houses',
  'vastu-cut-in-north-east.html': 'Vastu Cut in North-East corner cures',
  'astro-vastu-home-remedies.html': 'Scientific Astro-Vastu Home Remedies',
  'south-facing-house-vastu.html': 'Scientific South-Facing House Vastu'
};

function getTitleFromFilename(filename) {
  const brand = ' | Vardhini Vastu'; // 17 chars
  
  if (specialMap[filename]) {
    return specialMap[filename] + brand;
  }
  
  let topic = filename.replace('.html', '').replace(/^vastu-for-/, '').replace(/-/g, ' ');
  
  // Title capitalization
  topic = topic.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  let kw = `Scientific Vastu for ${topic}`;
  if (filename.startsWith('industrial-vastu') || topic.toLowerCase().includes('industrial') || ['breweries', 'distilleries', 'foundry', 'cement', 'chemical', 'paper', 'leather', 'sugar', 'steel', 'brick'].some(x => topic.toLowerCase().includes(x))) {
    kw = `Industrial Vastu for ${topic}`;
  } else if (filename.includes('remedies') || filename.includes('stress') || filename.includes('radiation')) {
    kw = topic;
  }
  
  if (kw.length < 33) {
    kw = `${kw} Guide`;
  }
  if (kw.length < 33) {
    kw = `${kw} Rules`;
  }
  if (kw.length < 33) {
    kw = `${kw} Remedies`;
  }
  
  if (kw.length > 43) {
    kw = kw.replace('Scientific Vastu for ', 'Vastu for ');
    kw = kw.replace('Industrial Vastu for ', 'Vastu for ');
  }
  
  if (kw.length > 43) {
    kw = kw.substring(0, 40).trim();
  }
  
  return kw + brand;
}

const filenames = new Set();

generators.forEach(gen => {
  const content = fs.readFileSync(path.join(rootDir, gen), 'utf8');
  const regex = /filename:\s*['"]([^'"]+\.html)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    filenames.add(match[1]);
  }
  const pyRegex = /"filename":\s*["']([^"']+\.html)["']/g;
  while ((match = pyRegex.exec(content)) !== null) {
    filenames.add(match[1]);
  }
});

let failedCount = 0;
filenames.forEach(f => {
  const title = getTitleFromFilename(f);
  const len = title.length;
  const ok = len >= 50 && len <= 60;
  if (!ok) {
    console.log(`FAIL: ${f} -> Title: "${title}" (length: ${len})`);
    failedCount++;
  }
});

console.log(`Total checked: ${filenames.size}, Failed: ${failedCount}`);
