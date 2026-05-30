const https = require('https');
const { vv2_css, vv2_hero, vv2_trust, vv2_cta, vv2_faq, vv2_wrap } = require('./vv2_generator');

const WP_BASE   = 'vardhinivastu.in';
const WP_USER   = 'raghu.hebbur@gmail.com';
const WP_PASS   = 'AD1vSJeLlP8fMcArlSZqcU2K';
const AUTH      = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

function wpUpdate(pageId, content, title) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ content, title, status: 'publish' });
    const opts = {
      hostname: WP_BASE,
      path: `/wp-json/wp/v2/pages/${pageId}`,
      method: 'POST',
      headers: {
        'Authorization': `Basic ${AUTH}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log(`✓ Page ${pageId} (${title}) updated — HTTP ${res.statusCode}`);
          resolve(true);
        } else {
          console.error(`✗ Page ${pageId} failed — HTTP ${res.statusCode}: ${data.slice(0,200)}`);
          resolve(false);
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const css = vv2_css();
const trust = vv2_trust();

// ── PAGE BUILDERS ────────────────────────────────────────────────────────────

function buildHome() {
  const hero = vv2_hero(
    'Bangalore\'s #1 Scientific Vastu Consultant',
    'Best <em>Vastu Consultant</em> in Bangalore &amp; India',
    'Meet Raghavendra Hebbur — Certified Geo Master and Universal Aura Scanner expert based in Bengaluru. Scientific, non-demolition Vastu for homes, offices and industries across Bangalore and all of India.'
  );
  const body = `<section class="sf"><div class="w">
<p class="eye">WHY CHOOSE VARDHINI VASTU</p>
<h2 class="h2">Scientific Vastu That Delivers <em>Measurable Results</em></h2>
<p class="lead">From compact apartments to large factories, the same scientific process is applied to identify and correct Vastu imbalances — without unnecessary fear or demolition.</p>
<div class="cards">
<div class="card"><div class="card-ico">🔬</div><h3>VIDS™ 16-Zone Analysis</h3><p>Proprietary Vardhini Integrated Diagnostic System maps every zone with compass-accurate precision across all 16 directions.</p></div>
<div class="card"><div class="card-ico">📡</div><h3><a href="/french-vs-german-radiesthesia/">Lecher Antenna &amp; Geopathic Scan</a></h3><p>Scientific tools detect Hartmann grids, underground water veins and EMF fields that conventional consultants miss entirely.</p></div>
<div class="card"><div class="card-ico">💎</div><h3>Zero Demolition Remedies</h3><p>All corrections use colour, metals, crystals, yantras, and furniture placement. No walls are broken — ever.</p></div>
<div class="card"><div class="card-ico">📋</div><h3>Written Vastu Report</h3><p>Detailed zone-by-zone findings with photographs, root causes, and a prioritised action list delivered within 48 hours.</p></div>
<div class="card"><div class="card-ico">📈</div><h3>620+ Properties Transformed</h3><p>Homes, offices, factories, and shops across Bangalore, India and for NRIs worldwide — with documented improvement rates.</p></div>
<div class="card"><div class="card-ico">🌍</div><h3>Online &amp; On-Site Consultations</h3><p>Full onsite visit in Bangalore or comprehensive online consultation via video call and floor plan for any city or country.</p></div>
</div></div></section>`;

  const services = `<section class="sw"><div class="w">
<p class="eye">OUR SERVICES</p>
<h2 class="h2">How We <em>Serve You</em></h2>
<p class="lead">Whether you are in Bangalore, anywhere in India, or an NRI abroad — we offer the same scientific, non-demolition Vastu methodology.</p>
<div class="two-col">
<ul class="step-list">
<li class="step-item"><div class="step-num">1</div><div class="step-body"><h4>Residential Vastu</h4><p>Apartments, villas, independent houses, plots. From ₹15,000 in Bangalore.</p></div></li>
<li class="step-item"><div class="step-num">2</div><div class="step-body"><h4><a href="/commercial-vastu/">Commercial Vastu</a></h4><p>Offices, showrooms, retail shops, co-working spaces. From ₹51,000.</p></div></li>
<li class="step-item"><div class="step-num">3</div><div class="step-body"><h4><a href="/industrial-vastu-bangalore/">Industrial Vastu</a></h4><p>Factories, warehouses, manufacturing plants. Custom quote based on site size.</p></div></li>
<li class="step-item"><div class="step-num">4</div><div class="step-body"><h4><a href="/online-vastu-consultation/">Online Consultation</a></h4><p>Full analysis via floor plan + video call for India and NRIs. From ₹5,000.</p></div></li>
</ul>
<div>
<div class="tcard"><div class="tcard-stars">★★★★★</div><p class="tcard-text">"Raghavendra's scientific approach was refreshing. He didn't just give us superstitions — he showed us exactly what was wrong and how to fix it without breaking a single wall."</p><div class="tcard-name">Ananya S.</div><div class="tcard-loc">Koramangala, Bangalore</div></div>
</div>
</div>
</div></section>`;

  const faq = vv2_faq('Vardhini Vastu', {
    'Who is the best Vastu consultant in Bangalore?': 'Raghavendra Hebbur of Vardhini Vastu is widely recognised as one of Bangalore\'s leading scientific Vastu consultants — using the proprietary VIDS™ 16-zone methodology, Lecher Antenna scanning, and zero-demolition remedies.',
    'Can Vastu be corrected without demolition?': 'Yes. At Vardhini Vastu, almost all defects are corrected with non-demolition remedies using energy balancing, colours, metals, shapes, and geopathic stress corrections. No structural breaking is required in the vast majority of cases.',
    'Do online Vastu consultations work for NRIs?': 'Absolutely. Online consultations via floor plan and video call deliver 80–85% of the accuracy of an onsite visit. Hundreds of NRI clients in the USA, UK, UAE, Singapore, Australia and Canada have seen clear improvements.',
    'What problems can Vastu Shastra help with?': 'Financial blocks, job instability, health issues, disturbed sleep, delays in marriage, family conflicts, and mental stress. Vastu balances spatial energies to remove the subtle resistance keeping these problems in place.',
    'What is the VIDS™ methodology?': 'VIDS™ (Vardhini Integrated Diagnostic System) is a proprietary 16-zone, degree-accurate analysis method combined with Lecher Antenna scanning for geopathic stress, underground water veins, Hartmann/Curry grid crossings, and EMF fields.'
  });
  const cta = vv2_cta('Ready to Transform Your Space?', 'Join 620+ families and businesses from Bangalore and across India who have experienced calm, clarity and growth after aligning their spaces the right way.');
  return css + '<div>' + hero + '</div>' + trust + body + services + faq + cta;
}

function buildAbout() {
  const hero = vv2_hero(
    'About Vardhini Vastu',
    'Meet <em>Raghavendra Hebbur</em> — Certified Geo Master',
    'A decade of scientific Vastu practice, 620+ properties transformed, and a commitment to zero-demolition remedies that actually work for modern Indian families and businesses.'
  );
  const body = `<section class="sf"><div class="w">
<p class="eye">CREDENTIALS &amp; EXPERTISE</p>
<h2 class="h2">A Scientist's <em>Approach to Vastu</em></h2>
<p class="lead">Raghavendra Hebbur founded Vardhini Vastu on one principle: Vastu Shastra should be measurable, explainable, and free of fear-mongering. Every remedy must have a scientific rationale.</p>
<div class="cards">
<div class="card"><div class="card-ico">🎓</div><h3>Certified Geo Master</h3><p>Formally trained in Geo Engineering and advanced Vastu Shastra, with certifications in geopathic stress detection and Universal Aura Scanning.</p></div>
<div class="card"><div class="card-ico">📡</div><h3>Universal Aura Scanner Expert</h3><p>One of the few consultants in India trained in Universal Aura Scanner (UAS) usage for measuring subtle energy fields in residential and commercial spaces.</p></div>
<div class="card"><div class="card-ico">🔬</div><h3><a href="/french-vs-german-radiesthesia/">Lecher Antenna Practitioner</a></h3><p>Uses Lecher Antenna to detect Hartmann grids, Curry lines, underground water veins, and EMF anomalies with measurable frequency accuracy.</p></div>
<div class="card"><div class="card-ico">🏗️</div><h3>VIDS™ Methodology Creator</h3><p>Developed the proprietary Vardhini Integrated Diagnostic System — a 16-zone, compass-accurate analysis framework used in every consultation.</p></div>
<div class="card"><div class="card-ico">🌍</div><h3>10+ Years Experience</h3><p>Over a decade of practice with clients spanning Bangalore, all of India, and NRIs in USA, UK, UAE, Singapore, Canada, and Australia.</p></div>
<div class="card"><div class="card-ico">📋</div><h3>BNI Community Member</h3><p>Active member of the BNI Business Community, referred by real estate agents, interior designers, and wellness professionals across Bengaluru.</p></div>
</div></div></section>`;

  const values = `<section class="sw"><div class="w"><div class="two-col">
<div>
<p class="eye">OUR PHILOSOPHY</p>
<h2 class="h2">Vastu Without <em>Fear or Fiction</em></h2>
<p class="lead">Traditional Vastu knowledge is profound — but it should never be used to frighten clients into expensive demolitions or vague superstitions. Every recommendation we make can be explained.</p>
<ul class="step-list">
<li class="step-item"><div class="step-num">✓</div><div class="step-body"><h4>Science-Backed</h4><p>Every diagnosis uses measurable instruments — not just intuition or tradition alone.</p></div></li>
<li class="step-item"><div class="step-num">✓</div><div class="step-body"><h4>Zero Demolition</h4><p>We correct 95%+ of all defects without breaking walls. Structures are preserved.</p></div></li>
<li class="step-item"><div class="step-num">✓</div><div class="step-body"><h4>Documented Results</h4><p>Written reports with photographs and tracked follow-ups so you see what changed.</p></div></li>
<li class="step-item"><div class="step-num">✓</div><div class="step-body"><h4>Transparent Pricing</h4><p>Clear fee structures with no hidden charges. Consultation quotes given upfront.</p></div></li>
</ul>
</div>
<div>
<div class="tcard" style="margin-bottom:16px;"><div class="tcard-stars">★★★★★</div><p class="tcard-text">"After 3 consultants who gave us confusing and expensive advice, Raghavendra explained everything simply and fixed our home without breaking a single wall."</p><div class="tcard-name">Priya K.</div><div class="tcard-loc">HSR Layout, Bangalore</div></div>
<div class="tcard"><div class="tcard-stars">★★★★★</div><p class="tcard-text">"Our factory's productivity improved measurably after the vastu correction. The approach is completely scientific — no rituals, just practical fixes."</p><div class="tcard-name">Ravi M.</div><div class="tcard-loc">Electronic City, Bangalore</div></div>
</div>
</div></div></section>`;

  const faq = vv2_faq('Vardhini Vastu &amp; Raghavendra Hebbur', {
    'What is Raghavendra Hebbur\'s qualification in Vastu?': 'Raghavendra Hebbur is a Certified Geo Master with formal training in Geo Engineering, advanced Vastu Shastra, Universal Aura Scanning, and Lecher Antenna geopathic stress detection. He is also the creator of the proprietary VIDS™ methodology.',
    'How many properties has Vardhini Vastu corrected?': 'Over 620 residential, commercial, and industrial properties across Bangalore, all major Indian cities, and for NRI clients worldwide — spanning 10+ years of active practice.',
    'Is Vardhini Vastu\'s approach scientific or purely traditional?': 'Both. The classical principles of Vastu Shastra form the analytical framework, while modern scientific instruments (Lecher Antenna, UAS) provide measurable data. This combination produces accurate, explainable, and effective diagnoses.',
    'Where is Vardhini Vastu based?': 'The office is in Virgo Nagar, Bengaluru, Karnataka. Onsite visits are available across Bangalore and India. Online consultations serve clients globally.',
    'Can I trust online Vastu reviews and testimonials?': 'Our Google reviews are from verified clients — all 5-star rated by 600+ reviewers. We also receive referrals from BNI members, real estate agents, and interior designers who have seen direct results.'
  });
  const cta = vv2_cta('Book Your Consultation with Raghavendra', 'Experience scientific, zero-demolition Vastu from a Certified Geo Master with 10+ years of documented results.');
  return css + '<div>' + hero + '</div>' + trust + body + values + faq + cta;
}

function buildServices() {
  const hero = vv2_hero(
    'Vastu Consultation Services',
    'Scientific <em>Vastu Services</em> for Every Property Type',
    'From 1BHK apartments to multi-acre industrial estates — the same VIDS™ 16-zone methodology, Lecher Antenna scanning, and zero-demolition remedy approach is applied to every consultation.'
  );
  const body = `<section class="sf"><div class="w">
<p class="eye">RESIDENTIAL VASTU</p>
<h2 class="h2"><em>Home &amp; Apartment</em> Vastu Consultation</h2>
<p class="lead">Scientific Vastu analysis for independent houses, flats, villas, and plots. Covers all 16 zones, geopathic stress detection, and room-by-room remedy planning.</p>
<div class="cards">
<div class="card"><div class="card-ico">🏠</div><h3>House &amp; Villa Vastu</h3><p>Complete 16-zone VIDS™ analysis for independent houses. Covers all rooms, zones, entrances, and energy fields. From ₹25,000.</p></div>
<div class="card"><div class="card-ico">🏢</div><h3>Apartment &amp; Flat Vastu</h3><p>Precision analysis for high-rise and row apartments. Includes geopathic stress and floor-level energy mapping. From ₹15,000.</p></div>
<div class="card"><div class="card-ico">🌱</div><h3>Plot &amp; Land Vastu</h3><p>Pre-purchase and pre-construction analysis. Identify slope energy, corner cuts, road-facing defects before you invest. From ₹15,000.</p></div>
<div class="card"><div class="card-ico">💻</div><h3><a href="/online-vastu-consultation/">Online Consultation</a></h3><p>Full analysis via floor plan + video call. Suitable for all Indian cities and NRIs worldwide. From ₹5,000.</p></div>
<div class="card"><div class="card-ico">🔑</div><h3><a href="/pre-purchase-vastu/">Pre-Purchase Report</a></h3><p>Detailed Vastu assessment before buying a property — avoid costly mistakes before signing any agreement. From ₹5,000.</p></div>
<div class="card"><div class="card-ico">🔄</div><h3>Follow-Up Consultations</h3><p>30-day WhatsApp support included with every consultation. Re-assessment visits available at reduced rates.</p></div>
</div></div></section>`;

  const commercial = `<section class="sw"><div class="w">
<p class="eye">COMMERCIAL &amp; INDUSTRIAL VASTU</p>
<h2 class="h2"><em>Business, Office &amp; Factory</em> Vastu</h2>
<p class="lead">Commercial and industrial Vastu directly impacts revenue, staff performance, and operational efficiency. The VIDS™ methodology identifies and corrects every energy block.</p>
<div class="cards">
<div class="card"><div class="card-ico">🏛️</div><h3>Office Vastu</h3><p>Seating zones, MD cabin placement, cash counter direction, entrance energy analysis. From ₹51,000.</p></div>
<div class="card"><div class="card-ico">🏪</div><h3>Retail &amp; Showroom</h3><h3></h3><p>Display zone optimisation, billing counter placement, entrance energy for maximum footfall. From ₹51,000.</p></div>
<div class="card"><div class="card-ico">🏭</div><h3>Factory &amp; Warehouse</h3><p>Production zone mapping, heavy machinery placement, staff area energy correction. Custom quote.</p></div>
<div class="card"><div class="card-ico">🏨</div><h3>Hotels &amp; Restaurants</h3><p>Kitchen fire zone, dining energy, reception placement, guest room analysis. From ₹51,000.</p></div>
<div class="card"><div class="card-ico">🏥</div><h3>Clinics &amp; Hospitals</h3><p>Waiting area energy, treatment zone placement, pharmacy direction analysis. From ₹51,000.</p></div>
<div class="card"><div class="card-ico">🏗️</div><h3>Pre-Construction</h3><p>Architectural Vastu integration from blueprints. Avoid building defects before construction starts. From ₹51,000.</p></div>
</div></div></section>`;

  const faq = vv2_faq('Vastu Services', {
    'What is included in a Vardhini Vastu consultation?': 'Every consultation includes: VIDS™ 16-zone directional analysis, Lecher Antenna geopathic stress scan, zone-by-zone written report with photographs, prioritised remedy plan, and 30-day WhatsApp follow-up support.',
    'How long does a consultation take?': 'A typical site visit takes 3–4 hours for a 2BHK flat, 5–6 hours for a villa, and half a day for a commercial space. The written report is delivered within 48 hours after the visit.',
    'Can you do online consultations for NRIs?': 'Yes. Online consultations via floor plan + compass orientation photographs + video call are available for all cities and for NRIs worldwide. Start from ₹5,000.',
    'Do you serve cities outside Bangalore?': 'Yes — onsite visits are available anywhere in India (travel charges apply). Online consultations serve any city worldwide without additional charges.',
    'Is there a follow-up after the consultation?': 'Yes. Every consultation includes 30-day WhatsApp support. We check in after implementation to answer questions and verify that remedies are being applied correctly.'
  });
  const cta = vv2_cta('Get a Quote for Your Property', 'Tell us your property type and location — we\'ll give you a transparent fee quote with no hidden charges.');
  return css + '<div>' + hero + '</div>' + trust + body + commercial + faq + cta;
}

function buildFees() {
  const hero = vv2_hero(
    'Vastu Consultation Fees &amp; Packages',
    'Transparent <em>Vastu Consultation</em> Charges &amp; What\'s Included',
    'No hidden fees. No unnecessary upselling. Every package includes VIDS™ analysis, written report, and 30-day follow-up support. Pricing is based on property type and consultation mode.'
  );
  const body = `<section class="sf"><div class="w">
<p class="eye">FEE STRUCTURE</p>
<h2 class="h2">What You <em>Pay &amp; What You Get</em></h2>
<p class="lead">All fees are per property. Contact us for a precise quote based on your property size, type, and location. Travel charges apply for onsite visits outside Bangalore.</p>
<div class="cards">
<div class="card"><div class="card-ico">💻</div><h3><a href="/online-vastu-consultation/">Online Consultation</a></h3><p><strong style="color:var(--vv-or);font-size:1.3rem;">From ₹5,000</strong><br>Per property. Floor plan + video call analysis for any city or country. Includes written report and 30-day support.</p></div>
<div class="card"><div class="card-ico">🏠</div><h3>Residential — Apartment / Flat</h3><p><strong style="color:var(--vv-or);font-size:1.3rem;">From ₹15,000</strong><br>Onsite visit in Bangalore. Full VIDS™ 16-zone scan, geopathic stress mapping, written report, follow-up.</p></div>
<div class="card"><div class="card-ico">🏡</div><h3>Residential — Villa / Independent House</h3><p><strong style="color:var(--vv-or);font-size:1.3rem;">From ₹25,000</strong><br>Onsite visit in Bangalore. Larger property with extended scan time. Same comprehensive report and follow-up.</p></div>
<div class="card"><div class="card-ico">🏛️</div><h3>Commercial — Office / Retail / Restaurant</h3><p><strong style="color:var(--vv-or);font-size:1.3rem;">From ₹51,000</strong><br>Onsite commercial consultation. Seating map, zone analysis, geopathic scan. Written report within 48 hours.</p></div>
<div class="card"><div class="card-ico">🏭</div><h3><a href="/industrial-vastu-bangalore/">Industrial — Factory / Warehouse</a></h3><p><strong style="color:var(--vv-or);font-size:1.3rem;">Custom Quote</strong><br>Large-area industrial assessment. Contact us with site area and type for a transparent custom quote.</p></div>
<div class="card"><div class="card-ico">🔑</div><h3><a href="/pre-purchase-vastu/">Pre-Purchase Report</a></h3><p><strong style="color:var(--vv-or);font-size:1.3rem;">From ₹5,000</strong><br>Vastu assessment before buying. Avoid expensive mistakes. Online format using floor plan and location details.</p></div>
</div></div></section>`;

  const included = `<section class="sw"><div class="w">
<p class="eye">WHAT'S INCLUDED IN EVERY PACKAGE</p>
<h2 class="h2">No Hidden Extras — <em>Everything Included</em></h2>
<p class="lead">Unlike many consultants who charge separately for reports, follow-ups, and tools — we include everything in a single transparent fee.</p>
<ul class="step-list">
<li class="step-item"><div class="step-num">1</div><div class="step-body"><h4>VIDS™ 16-Zone Directional Analysis</h4><p>Compass-accurate mapping of all 16 directions and their elemental, functional, and energetic properties.</p></div></li>
<li class="step-item"><div class="step-num">2</div><div class="step-body"><h4>Lecher Antenna Geopathic Stress Scan</h4><p>Detection of Hartmann grids, Curry lines, underground water veins, and EMF anomalies beneath and within the property.</p></div></li>
<li class="step-item"><div class="step-num">3</div><div class="step-body"><h4>Written Zone-by-Zone Vastu Report</h4><p>Detailed documentation with photographs, zone findings, root cause identification, and a prioritised remedy action list.</p></div></li>
<li class="step-item"><div class="step-num">4</div><div class="step-body"><h4>Zero-Demolition Remedy Plan</h4><p>Specific, actionable corrections using colour, metals, crystals, yantras, and furniture repositioning. No structural breaking.</p></div></li>
<li class="step-item"><div class="step-num">5</div><div class="step-body"><h4>30-Day WhatsApp Follow-Up Support</h4><p>Direct access to Raghavendra for questions and clarifications as you implement the remedies at your own pace.</p></div></li>
</ul>
</div></section>`;

  const faq = vv2_faq('Vastu Consultation Fees', {
    'How much does a Vastu consultation cost in Bangalore?': 'Residential consultations start at ₹15,000 for apartments and ₹25,000 for villas in Bangalore. Commercial properties start at ₹51,000. Online consultations for any city or NRIs start at ₹5,000.',
    'Are there any hidden charges after the consultation?': 'No. The fee covers everything: VIDS™ analysis, Lecher Antenna scan, written report with photographs, zero-demolition remedy plan, and 30-day WhatsApp follow-up. No surprise charges.',
    'Do I pay for travel if I am outside Bangalore?': 'For onsite visits outside Bangalore city limits, travel and accommodation charges are additional. These are communicated transparently before confirming the booking. Online consultations have no travel charges.',
    'Can I get a refund if I am not satisfied?': 'We do not offer refunds once a consultation is completed and the report is delivered, as the work has been fully executed. However, we do offer a follow-up clarification session if you have questions about the report.',
    'Is GST included in the fees?': 'The fees quoted are exclusive of applicable GST. Final billing will include GST as per current regulations. We provide a proper invoice for all consultations.'
  });
  const cta = vv2_cta('Get Your Exact Fee Quote Today', 'Tell us your property type, size, and location — we\'ll give you a precise quote with no surprises.');
  return css + '<div>' + hero + '</div>' + trust + body + included + faq + cta;
}

function buildContact() {
  const hero = vv2_hero(
    'Contact Vardhini Vastu',
    'Book Your <em>Vastu Consultation</em> Today',
    'Reach out via WhatsApp, call, or email. We respond to all inquiries within 2 hours during business hours (9 AM – 7 PM IST, Monday to Saturday).'
  );
  const body = `<section class="sf"><div class="w">
<p class="eye">HOW TO REACH US</p>
<h2 class="h2">Multiple Ways to <em>Get in Touch</em></h2>
<p class="lead">Choose the most convenient contact method. WhatsApp is the fastest for quick queries. For detailed consultations, we schedule a call at your convenience.</p>
<div class="cards">
<div class="card"><div class="card-ico">💬</div><h3>WhatsApp (Fastest)</h3><p>Message us directly on WhatsApp for the quickest response. Include your property type and city for a faster quote.<br><br><a href="https://wa.me/919739105574" style="color:var(--vv-or);font-weight:700;">+91 97391 05574 →</a></p></div>
<div class="card"><div class="card-ico">📞</div><h3>Phone Call</h3><p>Call us directly for a quick conversation about your property and consultation requirements.<br><br><a href="tel:+919739105574" style="color:var(--vv-or);font-weight:700;">+91 97391 05574 →</a></p></div>
<div class="card"><div class="card-ico">📧</div><h3>Email</h3><p>For detailed inquiries, send us your floor plan, property details, and specific concerns to our email.<br><br><a href="mailto:info@vardhinivastu.in" style="color:var(--vv-or);font-weight:700;">info@vardhinivastu.in →</a></p></div>
<div class="card"><div class="card-ico">📍</div><h3>Office Address</h3><p>3rd Cross, Saraswati Road, Ajit Layout, Virgo Nagar, Bengaluru — 560049, Karnataka, India.<br><br>Onsite visits by appointment only.</p></div>
<div class="card"><div class="card-ico">🕐</div><h3>Business Hours</h3><p>Monday to Saturday: 9:00 AM – 7:00 PM IST.<br>Sunday: Available for pre-scheduled consultations only.<br><br>We respond within 2 hours on business days.</p></div>
<div class="card"><div class="card-ico">🌍</div><h3>NRI &amp; International Clients</h3><p>We schedule video consultations to suit your time zone. Mention your city and preferred time window when reaching out.</p></div>
</div></div></section>`;

  const process = `<section class="sw"><div class="w"><div class="two-col">
<div>
<p class="eye">HOW TO BOOK</p>
<h2 class="h2">The <em>Booking Process</em> in 4 Simple Steps</h2>
<p class="lead">From first contact to your detailed Vastu report — here is what to expect when you work with Vardhini Vastu.</p>
</div>
<ul class="step-list">
<li class="step-item"><div class="step-num">1</div><div class="step-body"><h4>Send Your Details</h4><p>WhatsApp us your property type (apartment/villa/office), city, and the main concerns you want addressed.</p></div></li>
<li class="step-item"><div class="step-num">2</div><div class="step-body"><h4>Receive Quote &amp; Confirm</h4><p>We provide a transparent fee quote. Once confirmed, we schedule the consultation date at your convenience.</p></div></li>
<li class="step-item"><div class="step-num">3</div><div class="step-body"><h4>Consultation Conducted</h4><p>Onsite visit or online video call — full VIDS™ analysis and Lecher Antenna scan is conducted thoroughly.</p></div></li>
<li class="step-item"><div class="step-num">4</div><div class="step-body"><h4>Report Delivered in 48 Hours</h4><p>Written zone-by-zone report with photographs, findings, and a prioritised zero-demolition remedy action list.</p></div></li>
</ul>
</div></div></section>`;

  const faq = vv2_faq('Contacting Vardhini Vastu', {
    'What is the fastest way to reach Vardhini Vastu?': 'WhatsApp is the fastest. Send a message to +91 97391 05574 with your property type and city. We typically respond within 1–2 hours during business hours (9 AM – 7 PM IST, Monday to Saturday).',
    'Do you visit properties outside Bangalore?': 'Yes — onsite visits are available anywhere in India. Travel and accommodation charges apply and are communicated transparently before booking. Online consultations are available for any city worldwide with no travel charges.',
    'How do I prepare for an online consultation?': 'Share a clear floor plan (hand-drawn or architectural), compass direction of the main entrance, photographs of each room, and a list of your main concerns. We guide you through the process after booking confirmation.',
    'Can I get a consultation for a property I haven\'t purchased yet?': 'Yes. Our pre-purchase Vastu report is specifically designed for this. Share the floor plan and location, and we assess it before you sign the agreement — saving you from potential costly mistakes.',
    'Do you offer emergency or urgent consultations?': 'Yes, subject to availability. WhatsApp us with "URGENT" and your property details. We do our best to accommodate within 24–48 hours for urgent situations.'
  });
  const cta = vv2_cta('Start Your Vastu Consultation Now', 'WhatsApp us your property details and get a fee quote within 2 hours. Scientific, zero-demolition Vastu awaits.');
  return css + '<div>' + hero + '</div>' + trust + body + process + faq + cta;
}

// ── MAIN EXECUTOR ─────────────────────────────────────────────────────────────
const pages = [
  { id: 1052, title: 'Home',                       fn: buildHome     },
  { id: 1054, title: 'About',                      fn: buildAbout    },
  { id: 1056, title: 'Services',                   fn: buildServices },
  { id: 1057, title: 'Vastu Consultation Fees',    fn: buildFees     },
  { id: 1055, title: 'Contact',                    fn: buildContact  },
];

(async () => {
  console.log('🚀 Pushing VV2 design to core pages...\n');
  for (const p of pages) {
    try {
      const html = p.fn();
      await wpUpdate(p.id, vv2_wrap(html), p.title);
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error(`✗ Error on page ${p.id}: ${e.message}`);
    }
  }
  console.log('\n✅ All core pages updated!');
})();
