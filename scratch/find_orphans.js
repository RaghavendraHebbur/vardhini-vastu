const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\raghu\\Documents\\Vardhini Vastu Rebuild website';
const files = fs.readdirSync(rootDir);
const htmlFiles = files.filter(f => f.endsWith('.html'));

const generators = [
  'generate_all_26_pages.js',
  'generate_all_25_pages.js',
  'generate_batch_3_pages.js',
  'generate_batch_4_pages.js',
  'generate_batch_5_pages.js',
  'generate_all_17_pages.py'
];

const generatedPages = new Set();

generators.forEach(gen => {
  const content = fs.readFileSync(path.join(rootDir, gen), 'utf8');
  // Look for generated files
  // In JS generators: fs.writeFileSync(path.join(__dirname, p.filename) or fs.writeFileSync(p.filename
  // Let's regex search for filenames in the generator script
  const regex = /filename:\s*['"]([^'"]+\.html)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    generatedPages.add(match[1]);
  }
  // For python generator:
  // f"{page['filename']}" or similar
  const pyRegex = /"filename":\s*["']([^"']+\.html)["']/g;
  while ((match = pyRegex.exec(content)) !== null) {
    generatedPages.add(match[1]);
  }
});

console.log(`Generated pages count: ${generatedPages.size}`);

const excluded = ['index.html', 'services.html', 'about.html', 'contact.html', 'fees.html', 'clean_locations.html', 'local-template.html', 'disclaimer.html', 'terms.html', 'privacy-policy.html', 'extracted_sections.html', 'locations_content.html', 'site_full.html', 'success-stories.html'];

const orphanFiles = htmlFiles.filter(f => !generatedPages.has(f) && !excluded.includes(f));
console.log('Orphan HTML files (not generated, not excluded):');
console.log(orphanFiles);
