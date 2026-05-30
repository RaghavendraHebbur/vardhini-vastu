const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let modifiedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Find <a href="/services/" ...>Services</a> and insert Free Book link after it
  if (!content.includes('href="/vastu-unlocked/"')) {
    const regex = /(<a\s+href="\/services\/"[^>]*>Services<\/a>)/gi;
    if (regex.test(content)) {
      content = content.replace(
        regex,
        '$1\n      <a href="/vastu-unlocked/" style="color:#ea580c; font-weight:700;" class="text-sm font-semibold hover:text-orange-600 transition">&#128214; Free Book</a>'
      );
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
}

console.log(`Updated navigation in ${modifiedCount} HTML files.`);
