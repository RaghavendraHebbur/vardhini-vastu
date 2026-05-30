const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\raghu\\Documents\\Vardhini Vastu Rebuild website';
const jsFiles = [
  'generate_all_26_pages.js',
  'generate_all_25_pages.js',
  'generate_batch_3_pages.js',
  'generate_batch_4_pages.js',
  'generate_batch_5_pages.js'
];
const pyFile = 'generate_all_17_pages.py';

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

function cleanDescription(desc) {
  if (!desc) return '';
  let cleaned = desc.trim();
  if (cleaned.length >= 120 && cleaned.length <= 165) {
    return cleaned;
  }
  if (cleaned.length > 165) {
    cleaned = cleaned.substring(0, 160).trim();
    const lastSpace = cleaned.lastIndexOf(' ');
    if (lastSpace > 100) {
      cleaned = cleaned.substring(0, lastSpace);
    }
    cleaned = cleaned.replace(/[.,;!]$/, '') + '.';
  }
  if (cleaned.length < 120) {
    cleaned = `${cleaned} Contact Bangalore's top scientific Vastu consultant Raghavendra Hebbur today for zero-demolition remedies.`;
    if (cleaned.length > 165) {
      cleaned = cleaned.substring(0, 160).trim();
      const lastSpace = cleaned.lastIndexOf(' ');
      cleaned = cleaned.substring(0, lastSpace).replace(/[.,;!]$/, '') + '.';
    }
  }
  return cleaned;
}

// 1. Process JS Generator files
jsFiles.forEach(fileName => {
  const filePath = path.join(rootDir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const pageDataStart = content.indexOf('const PAGE_DATA = [');
  if (pageDataStart === -1) {
    console.log(`Could not find PAGE_DATA start in ${fileName}`);
    return;
  }
  const pageDataEnd = content.indexOf('];', pageDataStart);
  if (pageDataEnd === -1) {
    console.log(`Could not find PAGE_DATA end in ${fileName}`);
    return;
  }
  
  const pageDataStr = content.substring(pageDataStart + 'const PAGE_DATA = '.length, pageDataEnd + 2);
  let pageData;
  try {
    pageData = new Function(`return ${pageDataStr}`)();
  } catch (e) {
    console.log(`Failed to parse PAGE_DATA in ${fileName}:`, e.message);
    return;
  }
  
  pageData.forEach(page => {
    page.meta_title = getTitleFromFilename(page.filename);
    page.meta_description = cleanDescription(page.meta_description);
  });
  
  // Format pageData back to JS string
  let formattedData = '[\n';
  pageData.forEach((page, i) => {
    formattedData += '  {\n';
    Object.keys(page).forEach((key, j, arr) => {
      const val = page[key];
      let formattedVal = '';
      if (typeof val === 'string') {
        if (val.includes('\n') || val.includes('<p>') || key === 'rationale_content') {
          formattedVal = '`' + val.replace(/`/g, '\\`').replace(/\$/g, '\\$') + '`';
        } else {
          formattedVal = JSON.stringify(val);
        }
      } else {
        formattedVal = JSON.stringify(val);
      }
      formattedData += `    "${key}": ${formattedVal}${j === arr.length - 1 ? '' : ','}\n`;
    });
    formattedData += `  }${i === pageData.length - 1 ? '' : ','}\n`;
  });
  formattedData += ']';
  
  content = content.substring(0, pageDataStart + 'const PAGE_DATA = '.length) + 
            formattedData + 
            content.substring(pageDataEnd + 1);
            
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed titles/descriptions in ${fileName}`);
});

// 2. Process Python Generator file
function processPythonFile() {
  const filePath = path.join(rootDir, pyFile);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const pageDataStart = content.indexOf('PAGE_DATA = [');
  if (pageDataStart === -1) {
    console.log(`Could not find PAGE_DATA start in ${pyFile}`);
    return;
  }
  const pageDataEnd = content.indexOf('\n]', pageDataStart);
  if (pageDataEnd === -1) {
    console.log(`Could not find PAGE_DATA end in ${pyFile}`);
    return;
  }
  
  let pageDataStr = content.substring(pageDataStart + 'PAGE_DATA = '.length, pageDataEnd + 2);
  pageDataStr = pageDataStr.replace(/"""/g, '`');
  
  let pageData;
  try {
    pageData = new Function(`return ${pageDataStr}`)();
  } catch (e) {
    console.log(`Failed to parse PAGE_DATA in ${pyFile}:`, e.message);
    return;
  }
  
  pageData.forEach(page => {
    page.meta_title = getTitleFromFilename(page.filename);
    page.meta_description = cleanDescription(page.meta_description);
  });
  
  let formattedData = '[\n';
  pageData.forEach((page, i) => {
    formattedData += '  {\n';
    Object.keys(page).forEach((key, j, arr) => {
      const val = page[key];
      let formattedVal = '';
      if (typeof val === 'string') {
        if (val.includes('\n') || val.includes('<p>') || key === 'rationale_content') {
          formattedVal = '"""' + val + '"""';
        } else {
          formattedVal = JSON.stringify(val);
        }
      } else {
        formattedVal = JSON.stringify(val);
      }
      formattedData += `    "${key}": ${formattedVal}${j === arr.length - 1 ? '' : ','}\n`;
    });
    formattedData += `  }${i === pageData.length - 1 ? '' : ','}\n`;
  });
  formattedData += ']';
  
  content = content.substring(0, pageDataStart + 'PAGE_DATA = '.length) + 
            formattedData + 
            content.substring(pageDataEnd + 1);
            
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed titles/descriptions in ${pyFile}`);
}

processPythonFile();
