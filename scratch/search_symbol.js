const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\raghu\\Documents\\Vardhini Vastu Rebuild website';
const files = fs.readdirSync(rootDir);

files.forEach(f => {
  const filePath = path.join(rootDir, f);
  if (fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('vastu-for-bedroom') || content.includes('vastu-for-kitchen')) {
      console.log(`Found in: ${f}`);
    }
  }
});
