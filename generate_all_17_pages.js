const fs = require('fs');
const path = require('path');

const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>{meta_title}</title>
  <meta name="description" content="{meta_description}" />
  <link rel="canonical" href="https://vardhinivastu.in/{filename}" />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="Raghavendra Hebbur" />
  <meta name="keywords" content="{meta_keywords}" />

  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://vardhinivastu.in/{slug}#article",
        "isPartOf": {
          "@type": "WebPage",
          "@id": "https://vardhinivastu.in/{slug}/"
        },
        "headline": "{headline}",
        "description": "{meta_description}",
        "author": {
          "@type": "Person",
          "name": "Raghavendra Hebbur",
          "url": "https://vardhinivastu.in/about.html"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Vardhini Vastu",
          "url": "https://vardhinivastu.in/"
        },
        "datePublished": "2026-05-22",
        "inLanguage": "en-US"
      },
      {
        "@type": "FAQPage",
        "@id": "https://vardhinivastu.in/{slug}#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "{faq1_q}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "{faq1_a}"
            }
          },
          {
            "@type": "Question",
            "name": "{faq2_q}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "{faq2_a}"
            }
          },
          {
            "@type": "Question",
            "name": "{faq3_q}",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "{faq3_a}"
            }
          }
        ]
      }
    ]
  }
  </script>

  <style>
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; }
    .hero-bg { background: linear-gradient(135deg, #f8f7f4 0%, #f3f1eb 100%); }
    .section-title-underline { position: relative; padding-bottom: 0.75rem; display: inline-block; }
    .section-title-underline::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80px; height: 4px; background-color: #f97316; border-radius: 2px; }
    .gradient-text { background: linear-gradient(45deg, #f97316, #ea580c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .faq-item .answer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
    .faq-item.open .answer { max-height: 800px; }
    .faq-item .icon { transition: transform 0.3s ease; }
    .faq-item.open .icon { transform: rotate(45deg); }
  </style>
</head>

<body class="bg-white text-gray-800">

<!-- Top Banner -->
<div class="w-full bg-gradient-to-r from-yellow-50 to-orange-50 shadow-sm flex items-center justify-center py-3 px-4 text-center border-b border-yellow-200">
  <span class="text-yellow-400 mr-2 text-xl">★★★★★</span>
  <span class="text-base md:text-lg font-bold text-gray-700">
    Bangalore’s #1 Scientific Vastu Consultant • 5-Star Google Rating • 600+ Properties Transformed
  </span>
</div>

<!-- Header / Navigation Bar -->
<header class="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
  <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2">
      <span class="text-2xl font-extrabold text-gray-800 tracking-tight">
        Vardhini <span class="text-orange-600">Vastu</span>
      </span>
    </a>
    
    <nav class="hidden md:flex items-center gap-8">
      <a href="/" class="text-sm font-semibold text-gray-600 hover:text-orange-600 transition">Home</a>
      <a href="/services/" class="text-sm font-semibold text-gray-600 hover:text-orange-600 transition">Services</a>
      <a href="/about/" class="text-sm font-semibold text-gray-600 hover:text-orange-600 transition">About Us</a>
      <a href="/testimonials/" class="text-sm font-semibold text-gray-600 hover:text-orange-600 transition">Success Stories</a>
      <a href="/contact/" class="text-sm font-semibold text-gray-600 hover:text-orange-600 transition">Contact</a>
    </nav>
    
    <div class="hidden md:block">
      <a href="https://wa.me/919739105574?text=Hello%20Raghu!%20I%20want%20to%20book%20a%20Vastu%20consultation." 
         target="_blank" rel="noopener noreferrer"
         class="bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-orange-700 transition text-sm shadow-md">
        Book Consultation
      </a>
    </div>
    
    <button id="mobile-menu-btn" class="md:hidden p-2 text-gray-600 focus:outline-none" aria-label="Toggle navigation">
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path id="menu-icon-path" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
  
  <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-inner">
    <a href="/" class="text-sm font-semibold text-gray-600">Home</a>
    <a href="/services/" class="text-sm font-semibold text-gray-600 hover:text-orange-600">Services</a>
    <a href="/about/" class="text-sm font-semibold text-gray-600 hover:text-orange-600">About Us</a>
    <a href="/testimonials/" class="text-sm font-semibold text-gray-600 hover:text-orange-600">Success Stories</a>
    <a href="/contact/" class="text-sm font-semibold text-gray-600 hover:text-orange-600">Contact</a>
    <a href="https://wa.me/919739105574?text=Hello%20Raghu!%20I%20want%20to%20book%20a%20Vastu%20consultation." 
       target="_blank" rel="noopener noreferrer"
       class="bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition text-center text-sm w-full block mt-2">
      Book Consultation
    </a>
  </div>
</header>

<main>
  <!-- Hero Section -->
  <section class="hero-bg py-20 border-b border-gray-100">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <span class="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">{category}</span>
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 leading-tight">
        {hero_title}
      </h1>
      <p class="text-lg text-gray-600 mt-4 leading-relaxed max-w-2xl mx-auto">
        {hero_tagline}
      </p>
    </div>
  </section>

  <!-- Author Verification Box -->
  <section class="py-12 bg-white">
    <div class="max-w-4xl mx-auto px-6">
      <div class="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex flex-col md:flex-row items-center gap-6">
        <img src="https://assets.zyrosite.com/mv0DEjQxOGiDlo89/sam_1727-ALpe0v75j3Tjeqpb.JPG" alt="Raghavendra Hebbur" class="w-24 h-24 rounded-full object-cover border-2 border-orange-500 shadow-md" />
        <div class="text-left">
          <h3 class="text-lg font-bold text-gray-900">Verified by Raghavendra Hebbur</h3>
          <p class="text-sm text-gray-500 mb-2">Certified Geo Master & Leading Scientific Vastu Consultant</p>
          <p class="text-sm text-gray-600">
            {author_bio}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Scientific Rationale -->
  <section class="py-16 bg-white border-t border-gray-50">
    <div class="max-w-4xl mx-auto px-6 text-left">
      <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">{rationale_heading}</h2>
      <div class="text-gray-600 leading-relaxed space-y-6 text-base">
        {rationale_content}
      </div>
    </div>
  </section>

  <!-- Zonal Table -->
  <section class="py-16 bg-gray-50">
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">{table_heading}</h2>
      <div class="overflow-x-auto rounded-xl shadow-md bg-white border border-gray-100">
        <table class="w-full text-left border-collapse text-sm">
          <thead>
            <tr class="bg-orange-50 text-orange-900 border-b border-orange-100">
              <th class="p-4 font-bold">{th1}</th>
              <th class="p-4 font-bold">{th2}</th>
              <th class="p-4 font-bold">{th3}</th>
              <th class="p-4 font-bold">{th4}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-gray-700">
            {table_rows}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Defects & Symptoms -->
  <section class="py-16 bg-white">
    <div class="max-w-4xl mx-auto px-6 text-left">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">{defects_heading}</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="border border-red-100 p-6 rounded-xl bg-red-50/50">
          <h3 class="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
            <span>⚠️</span> {defect1_title}
          </h3>
          <p class="text-sm text-gray-700 leading-relaxed">
            {defect1_desc}
          </p>
        </div>
        <div class="border border-red-100 p-6 rounded-xl bg-red-50/50">
          <h3 class="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
            <span>⚠️</span> {defect2_title}
          </h3>
          <p class="text-sm text-gray-700 leading-relaxed">
            {defect2_desc}
          </p>
        </div>
        <div class="border border-red-100 p-6 rounded-xl bg-red-50/50">
          <h3 class="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
            <span>⚠️</span> {defect3_title}
          </h3>
          <p class="text-sm text-gray-700 leading-relaxed">
            {defect3_desc}
          </p>
        </div>
        <div class="border border-red-100 p-6 rounded-xl bg-red-50/50">
          <h3 class="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
            <span>⚠️</span> {defect4_title}
          </h3>
          <p class="text-sm text-gray-700 leading-relaxed">
            {defect4_desc}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Non-Demolition Remedies -->
  <section class="py-16 bg-gradient-to-br from-yellow-50 to-orange-50 border-t border-b border-orange-100">
    <div class="max-w-4xl mx-auto px-6 text-left">
      <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">100% Non-Demolition Energy Balancing</h2>
      <p class="text-gray-700 leading-relaxed mb-8 text-center">
        We neutralize spatial imbalances through scientific energy redirection, avoiding structural changes entirely:
      </p>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="text-orange-500 text-2xl font-bold mb-2">01</div>
          <h4 class="font-bold text-gray-800 mb-2">{rem1_title}</h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            {rem1_desc}
          </p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="text-orange-500 text-2xl font-bold mb-2">02</div>
          <h4 class="font-bold text-gray-800 mb-2">{rem2_title}</h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            {rem2_desc}
          </p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="text-orange-500 text-2xl font-bold mb-2">03</div>
          <h4 class="font-bold text-gray-800 mb-2">{rem3_title}</h4>
          <p class="text-xs text-gray-600 leading-relaxed">
            {rem3_desc}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-20 bg-white" id="faq">
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
      <div id="faq-accordion" class="space-y-4 text-left">
        <div class="faq-item bg-gray-50 p-6 rounded-lg border border-gray-100">
          <button class="question w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none">
            <span>{faq1_q}</span>
            <span class="icon text-orange-500 text-3xl font-light">+</span>
          </button>
          <div class="answer pt-4 text-gray-600 leading-relaxed">
            <p>
              {faq1_a}
            </p>
          </div>
        </div>
        <div class="faq-item bg-gray-50 p-6 rounded-lg border border-gray-100">
          <button class="question w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none">
            <span>{faq2_q}</span>
            <span class="icon text-orange-500 text-3xl font-light">+</span>
          </button>
          <div class="answer pt-4 text-gray-600 leading-relaxed">
            <p>
              {faq2_a}
            </p>
          </div>
        </div>
        <div class="faq-item bg-gray-50 p-6 rounded-lg border border-gray-100">
          <button class="question w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 focus:outline-none">
            <span>{faq3_q}</span>
            <span class="icon text-orange-500 text-3xl font-light">+</span>
          </button>
          <div class="answer pt-4 text-gray-600 leading-relaxed">
            <p>
              {faq3_a}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
    <div class="container mx-auto px-6 text-center max-w-4xl">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">
        {cta_heading}
      </h2>
      <p class="text-lg mb-8 opacity-90 leading-relaxed">
        {cta_desc}
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="https://wa.me/919739105574?text=Hello%20Raghu!%20I%20want%20to%20book%20a%20Vastu%20scan%20for%20my%20property."
           target="_blank" rel="noopener noreferrer"
           class="bg-white text-orange-600 font-bold text-lg px-8 py-4 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-xl w-full sm:w-auto">
          {cta_button}
        </a>
        <a href="/contact/"
           class="bg-transparent border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-white hover:text-orange-600 transition w-full sm:w-auto">
          Contact Us
        </a>
      </div>
    </div>
  </section>

  <!-- Hidden SEO keyword div -->
  <div style="display:none" aria-hidden="true">
    <h2>{seo_keyword_title}</h2>
    <p>
      {seo_keyword_desc}
    </p>
    <ul>
      <li>{seo_kw1}</li>
      <li>{seo_kw2}</li>
      <li>{seo_kw3}</li>
      <li>{seo_kw4}</li>
    </ul>
  </div>
</main>

<!-- Footer -->
<footer class="bg-gray-950 text-gray-400 pt-16 pb-8 border-t border-gray-900">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
    <div class="text-left">
      <h3 class="text-white text-lg font-bold mb-4 font-sans">Vardhini Vastu</h3>
      <p class="text-sm text-gray-400 leading-relaxed mb-6">
        Scientific, non-demolition Vastu consultations for residential, commercial, and industrial spaces. Balancing energies using advanced scientific tools.
      </p>
    </div>
    
    <div class="text-left">
      <h3 class="text-white text-base font-bold mb-4 font-sans">Services</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="/services/" class="hover:text-orange-500 transition">Residential Vastu</a></li>
        <li><a href="/services/" class="hover:text-orange-500 transition">Commercial Vastu</a></li>
        <li><a href="/services/" class="hover:text-orange-500 transition">Industrial Vastu</a></li>
        <li><a href="/services/" class="hover:text-orange-500 transition">Online Vastu Consultation</a></li>
        <li><a href="/services/" class="hover:text-orange-500 transition">Geopathic Stress Detection</a></li>
      </ul>
    </div>
    
    <div class="text-left">
      <h3 class="text-white text-base font-bold mb-4 font-sans">Quick Links</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="/" class="hover:text-orange-500 transition">Home</a></li>
        <li><a href="/services/" class="hover:text-orange-500 transition">Vastu Services</a></li>
        <li><a href="/about/" class="hover:text-orange-500 transition">About Raghavendra Hebbur</a></li>
        <li><a href="/testimonials/" class="hover:text-orange-500 transition">Success Stories</a></li>
        <li><a href="/contact/" class="hover:text-orange-500 transition">Contact Us</a></li>
      </ul>
    </div>
    
    <div class="text-left">
      <h3 class="text-white text-base font-bold mb-4 font-sans">Contact Info</h3>
      <p class="text-sm text-gray-400 mb-2 leading-relaxed">
        <strong>Vardhini Vastu</strong><br>
        3rd Cross, Saraswati Road, Ajit Layout, Virgo Nagar, Bengaluru, Karnataka 560049
      </p>
      <p class="text-sm text-gray-400 mb-2">
        <strong>Phone:</strong> <a href="tel:+919739105574" class="hover:text-orange-500 transition">+91 97391 05574</a>
      </p>
      <p class="text-sm text-gray-400">
        <strong>Email:</strong> <a href="mailto:info@vardhinivastu.in" class="hover:text-orange-500 transition">info@vardhinivastu.in</a>
      </p>
    </div>
  </div>
  
  <div class="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-900 text-center flex flex-col md:flex-row items-center justify-between gap-4">
    <p class="text-xs text-gray-500">
      &copy; 2026 Vardhini Vastu. All Rights Reserved. | Dedicated to Scientific and Non-Demolition Vastu.
    </p>
    <div class="flex items-center gap-6 text-xs text-gray-500">
      <a href="privacy-policy.html" class="hover:text-orange-500 transition">Privacy Policy</a>
      <a href="terms.html" class="hover:text-orange-500 transition">Terms of Service</a>
      <a href="disclaimer.html" class="hover:text-orange-500 transition">Disclaimer</a>
    </div>
  </div>
</footer>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    const path = document.getElementById("menu-icon-path");
    if (btn && menu) {
      btn.addEventListener("click", () => {
        const isHidden = menu.classList.contains("hidden");
        if (isHidden) {
          menu.classList.remove("hidden");
          path.setAttribute("d", "M6 18L18 6M6 6l12 12");
        } else {
          menu.classList.add("hidden");
          path.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
        }
      });
    }
  });

  const handleAccordion = (accordionId) => {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;
    accordion.addEventListener('click', (e) => {
      const questionButton = e.target.closest('.question');
      if (!questionButton) return;
      const faqItem = questionButton.parentElement;
      const allItems = accordion.querySelectorAll('.faq-item');
      allItems.forEach(item => {
        if (item !== faqItem) item.classList.remove('open');
      });
      faqItem.classList.toggle('open');
    });
  };
  handleAccordion('faq-accordion');
</script>

</body>
</html>
`;

// Interpolate function to replace keys {key} with values
function interpolate(template, data) {
  let result = template;
  for (const key of Object.keys(data)) {
    const regex = new RegExp('{' + key + '}', 'g');
    result = result.replace(regex, data[key]);
  }
  return result;
}

function main() {
  const pyFilePath = path.join(__dirname, 'generate_all_17_pages.py');
  if (!fs.existsSync(pyFilePath)) {
    console.error(`Source Python file not found at: ${pyFilePath}`);
    process.exit(1);
  }

  console.log('Reading generate_all_17_pages.py...');
  const pyContent = fs.readFileSync(pyFilePath, 'utf8');

  // Extract PAGE_DATA = [...]
  const startIndex = pyContent.indexOf('PAGE_DATA = [');
  if (startIndex === -1) {
    console.error('Could not find PAGE_DATA start in Python file');
    process.exit(1);
  }

  const endIndex = pyContent.indexOf('\n]', startIndex);
  if (endIndex === -1) {
    console.error('Could not find PAGE_DATA end in Python file');
    process.exit(1);
  }

  let pageDataStr = pyContent.substring(startIndex + 'PAGE_DATA = '.length, endIndex + 2);
  
  // Convert python triple quotes and values to JS
  pageDataStr = pageDataStr.replace(/"""/g, '`');

  // Temporarily write and load the module
  const tempPath = path.join(__dirname, 'temp_page_data.js');
  fs.writeFileSync(tempPath, 'module.exports = ' + pageDataStr + ';');

  let pageData;
  try {
    pageData = require(tempPath);
  } catch (err) {
    console.error('Failed to parse page data:', err);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    process.exit(1);
  }

  // Cleanup temp file
  if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);

  console.log(`Starting generation of ${pageData.length} Vastu pages...`);

  pageData.forEach(data => {
    const content = interpolate(HTML_TEMPLATE, data);
    const targetPath = path.join(__dirname, data.filename);
    fs.writeFileSync(targetPath, content, 'utf8');
    console.log(`Generated [OK]: ${data.filename}`);
  });

  console.log('All 17 pages successfully generated!');
}

main();
