const fs = require('fs');
const path = require('path');

const pyFilePath = path.join(__dirname, 'generate_all_17_pages.py');
const pyContent = fs.readFileSync(pyFilePath, 'utf8');

// Find the PAGE_DATA block
const startIndex = pyContent.indexOf('PAGE_DATA = [');
if (startIndex === -1) {
  console.error('Could not find PAGE_DATA in Python file');
  process.exit(1);
}

// Find the end of PAGE_DATA
const endIndex = pyContent.indexOf('\n]', startIndex);
if (endIndex === -1) {
  console.error('Could not find end of PAGE_DATA in Python file');
  process.exit(1);
}

let pageDataStr = pyContent.substring(startIndex + 'PAGE_DATA = '.length, endIndex + 2);

// Clean up Pythonisms to make it valid JS
// Replace Python triple double quotes with JS backticks
pageDataStr = pageDataStr.replace(/"""/g, '`');

// Save the converted JS file to verify
fs.writeFileSync(path.join(__dirname, 'page_data_raw.js'), 'module.exports = ' + pageDataStr + ';');

try {
  const pageData = require('./page_data_raw.js');
  console.log(`Successfully parsed ${pageData.length} pages!`);
  pageData.forEach((page, i) => {
    console.log(`${i + 1}. ${page.filename} - ${page.category}`);
  });
} catch (e) {
  console.error('Failed to parse converted page data:', e);
}
