const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\raghu\\Documents\\Vardhini Vastu Rebuild website';
const manualPages = [
  'vastu-for-bedroom.html',
  'vastu-for-business.html',
  'vastu-for-career.html',
  'vastu-for-education.html',
  'vastu-for-entrance-and-main-door.html',
  'vastu-for-factories.html',
  'vastu-for-flats.html',
  'vastu-for-health.html',
  'vastu-for-house.html',
  'vastu-for-kitchen.html',
  'vastu-for-marriage.html',
  'vastu-for-office.html',
  'vastu-for-plots.html',
  'vastu-for-pooja-room.html',
  'vastu-for-study-room.html',
  'vastu-for-toilet-and-bathroom.html',
  'vastu-for-wealth.html',
  'vastu-purusha-mandala.html',
  'vastu-tips.html'
];

manualPages.forEach(p => {
  const filePath = path.join(rootDir, p);
  if (!fs.existsSync(filePath)) {
    console.log(`Missing: ${p}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "NONE";
  
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const desc = descMatch ? descMatch[1].trim() : "NONE";
  
  const faqItems = content.match(/class=["']faq-item\b/gi) || [];
  
  console.log(`\nFile: ${p}`);
  console.log(`Title (${title.length} chars): "${title}"`);
  console.log(`Desc (${desc.length} chars): "${desc}"`);
  console.log(`FAQs: ${faqItems.length}`);
});
