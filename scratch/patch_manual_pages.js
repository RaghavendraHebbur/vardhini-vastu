const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\raghu\\Documents\\Vardhini Vastu Rebuild website';
const manualPages = [
  { file: 'vastu-for-bedroom.html', title: 'Scientific Vastu for Bedrooms Guide | Vardhini Vastu' },
  { file: 'vastu-for-business.html', title: 'Scientific Vastu for Business Growth | Vardhini Vastu' },
  { file: 'vastu-for-career.html', title: 'Scientific Vastu for Career Growth | Vardhini Vastu' },
  { file: 'vastu-for-education.html', title: 'Scientific Vastu for Student Education | Vardhini Vastu' },
  { file: 'vastu-for-entrance-and-main-door.html', title: 'Vastu for Entrance & Main Door Guide | Vardhini Vastu' },
  { file: 'vastu-for-factories.html', title: 'Industrial Vastu for Factories Guide | Vardhini Vastu' },
  { file: 'vastu-for-flats.html', title: 'Scientific Vastu for Flats & Apartments | Vardhini Vastu' },
  { file: 'vastu-for-health.html', title: 'Scientific Vastu for Health & Healing | Vardhini Vastu' },
  { file: 'vastu-for-house.html', title: 'Scientific Vastu for House and Home | Vardhini Vastu' },
  { file: 'vastu-for-kitchen.html', title: 'Scientific Vastu for Kitchen Layout | Vardhini Vastu' },
  { file: 'vastu-for-marriage.html', title: 'Scientific Vastu for Marriage Harmony | Vardhini Vastu' },
  { file: 'vastu-for-office.html', title: 'Scientific Vastu for Office Layouts | Vardhini Vastu' },
  { file: 'vastu-for-plots.html', title: 'Scientific Vastu for Plot Selection | Vardhini Vastu' },
  { file: 'vastu-for-pooja-room.html', title: 'Scientific Vastu for Pooja Room Design | Vardhini Vastu' },
  { file: 'vastu-for-study-room.html', title: 'Scientific Vastu for Study Room Focus | Vardhini Vastu' },
  { file: 'vastu-for-toilet-and-bathroom.html', title: 'Vastu for Toilet and Bathroom Layout | Vardhini Vastu' },
  { file: 'vastu-for-wealth.html', title: 'Scientific Vastu for Wealth Abundance | Vardhini Vastu' },
  { file: 'vastu-purusha-mandala.html', title: 'Vastu Purusha Mandala Energy Fields | Vardhini Vastu' },
  { file: 'vastu-tips.html', title: 'Scientific Vastu Tips for Home & Office | Vardhini Vastu' }
];

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

const commonFaqs = [
  {
    q: "Can scientific Vastu corrections be done without any physical demolition?",
    a: "Yes, scientific Vastu focuses on energy balancing and element alignment. By using specific metals (like brass, copper, lead), colors, and geopathic stress resonators, we can neutralize defects and balance energy vectors without breaking walls or structural demolition."
  },
  {
    q: "How long does it take to see results after applying Vastu remedies?",
    a: "Most clients observe positive shifts in spatial energy and physical wellbeing within 21 to 90 days after implementing the recommended remedies. This timeline allows the corrected energy patterns to stabilize and integrate with the occupants' biofields."
  }
];

manualPages.forEach(p => {
  const filePath = path.join(rootDir, p.file);
  if (!fs.existsSync(filePath)) {
    console.log(`Error: File missing ${p.file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Title replacement
  html = html.replace(/<title>[\s\S]*?<\/title>/gi, `<title>${p.title}</title>`);

  // 2. Description replacement
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  let finalDesc = '';
  if (descMatch) {
    finalDesc = cleanDescription(descMatch[1]);
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']/gi, `<meta name="description" content="${finalDesc}"`);
  }

  // 3. Open Graph Tags injection
  // If og:title is missing, we inject OG and Twitter tags before </head>
  if (!/property=["']og:title["']/i.test(html)) {
    const ogBlock = `
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${p.title}" />
  <meta property="og:description" content="${finalDesc}" />
  <meta property="og:image" content="https://vardhinivastu.in/wp-content/uploads/2026/05/picofme-6-1.png" />
  <meta property="og:url" content="https://vardhinivastu.in/${p.file.replace('.html', '/')}" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${p.title}" />
  <meta name="twitter:description" content="${finalDesc}" />
  <meta name="twitter:image" content="https://vardhinivastu.in/wp-content/uploads/2026/05/picofme-6-1.png" />
`;
    html = html.replace('</head>', `${ogBlock}</head>`);
  } else {
    // If they exist, let's update their contents to match optimized title and description
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']/gi, `<meta property="og:title" content="${p.title}"`);
    html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']/gi, `<meta property="og:description" content="${finalDesc}"`);
    html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']/gi, `<meta name="twitter:title" content="${p.title}"`);
    html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']/gi, `<meta name="twitter:description" content="${finalDesc}"`);
  }

  // 4. JSON-LD Schema patch
  const ldJsonMatch = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
  if (ldJsonMatch) {
    try {
      const originalJsonText = ldJsonMatch[1].trim();
      let schemaObj = JSON.parse(originalJsonText);
      
      // Update Article & FAQ
      let graph = schemaObj;
      if (schemaObj["@graph"]) {
        graph = schemaObj["@graph"];
      }

      const graphArray = Array.isArray(graph) ? graph : [graph];

      // Update Article
      const article = graphArray.find(item => item["@type"] === "Article");
      if (article) {
        article.headline = p.title.replace(' | Vardhini Vastu', '');
        article.description = finalDesc;
      }

      // Update FAQPage
      const faqPage = graphArray.find(item => item["@type"] === "FAQPage");
      if (faqPage) {
        if (!faqPage.mainEntity) {
          faqPage.mainEntity = [];
        }
        
        // Check if common FAQs are already present, if not add them
        commonFaqs.forEach(cf => {
          const exists = faqPage.mainEntity.some(q => q.name.toLowerCase().trim() === cf.q.toLowerCase().trim());
          if (!exists) {
            faqPage.mainEntity.push({
              "@type": "Question",
              "name": cf.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": cf.a
              }
            });
          }
        });
      }

      const updatedJsonText = JSON.stringify(schemaObj, null, 2);
      html = html.replace(ldJsonMatch[1], `\n  ${updatedJsonText.replace(/\$/g, '$$$$')}\n  `);

    } catch (e) {
      console.log(`JSON-LD parsing error in ${p.file}:`, e.message);
    }
  }

  // 5. Accordion FAQs patch
  // Find the closing tag of the accordion, e.g., the last FAQ item before </div>
  const accordionIdx = html.indexOf('id="faq-accordion"');
  if (accordionIdx !== -1) {
    // Find the next </div> that matches the accordion container
    // We can insert the two new FAQs right before the closing </div> of the accordion
    // Let's locate the last faq-item div inside the accordion
    const lastFaqItemIdx = html.lastIndexOf('class="faq-item', html.indexOf('</section>', accordionIdx));
    if (lastFaqItemIdx !== -1) {
      // Find the closing </div> of that last faq-item
      const closingDivIdx = html.indexOf('</div>', html.indexOf('</div>', lastFaqItemIdx) + 1); // skip inner div
      if (closingDivIdx !== -1) {
        // Let's find the closing </div> of the accordion itself or check if common FAQs are already in the HTML
        const hasFaq1 = html.substring(accordionIdx).includes('Can scientific Vastu corrections be done without any physical demolition?');
        if (!hasFaq1) {
          const newFaqHtml = `
        <div class="faq-item bg-gray-50 p-6 rounded-lg border border-gray-100">
          <button class="question w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none">
            <span>Can scientific Vastu corrections be done without any physical demolition?</span>
            <span class="icon text-orange-500 text-3xl font-light">+</span>
          </button>
          <div class="answer pt-4 text-gray-600 leading-relaxed">
            <p>
              Yes, scientific Vastu focuses on energy balancing and element alignment. By using specific metals (like brass, copper, lead), colors, and geopathic stress resonators, we can neutralize defects and balance energy vectors without breaking walls or structural demolition.
            </p>
          </div>
        </div>
        <div class="faq-item bg-gray-50 p-6 rounded-lg border border-gray-100">
          <button class="question w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none">
            <span>How long does it take to see results after applying Vastu remedies?</span>
            <span class="icon text-orange-500 text-3xl font-light">+</span>
          </button>
          <div class="answer pt-4 text-gray-600 leading-relaxed">
            <p>
              Most clients observe positive shifts in spatial energy and physical wellbeing within 21 to 90 days after implementing the recommended remedies. This timeline allows the corrected energy patterns to stabilize and integrate with the occupants' biofields.
            </p>
          </div>
        </div>`;
          
          // Insert after the closing div of the last faq-item
          const insertionPoint = html.indexOf('</div>', closingDivIdx) + 6;
          html = html.substring(0, insertionPoint) + newFaqHtml + html.substring(insertionPoint);
        }
      }
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Patched manual page: ${p.file}`);
});
