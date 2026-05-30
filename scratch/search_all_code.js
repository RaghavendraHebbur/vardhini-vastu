const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\raghu\\Documents\\Vardhini Vastu Rebuild website';

function searchDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        searchDir(filePath);
      }
    } else {
      if (file.endsWith('.js') || file.endsWith('.py') || file.endsWith('.json') || file.endsWith('.html')) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.toLowerCase().includes('vastu-for-bedroom')) {
          console.log(`Match in: ${filePath}`);
        }
      }
    }
  });
}

searchDir(rootDir);
