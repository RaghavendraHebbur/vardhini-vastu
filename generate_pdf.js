const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const filePath = `file://${path.join(__dirname, 'profile-template.html').replace(/\\/g, '/')}`;
  console.log(`Navigating to ${filePath}`);
  
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  
  console.log("Generating PDF...");
  await page.pdf({
    path: 'Vardhini_Vastu_Profile.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '30mm', right: '30mm', bottom: '30mm', left: '30mm' }
  });
  
  await browser.close();
  console.log("PDF generated successfully: Vardhini_Vastu_Profile.pdf");
})();
