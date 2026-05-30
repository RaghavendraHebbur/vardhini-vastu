const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\raghu\\Documents\\Vardhini Vastu Rebuild website';
const filePath = path.join(rootDir, 'generate_all_26_pages.js');
const content = fs.readFileSync(filePath, 'utf8');

const startIdx = content.indexOf('"filename": "astro-vastu-home-remedies.html"');
if (startIdx !== -1) {
  console.log(content.substring(startIdx - 100, startIdx + 800));
} else {
  console.log('Not found in generate_all_26_pages.js');
}

const startIdx2 = content.indexOf('"filename": "south-facing-house-vastu.html"');
if (startIdx2 !== -1) {
  console.log(content.substring(startIdx2 - 100, startIdx2 + 800));
} else {
  console.log('Not found in generate_all_26_pages.js');
}
