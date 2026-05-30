const https = require('https');
const { vv2_css, vv2_hero, vv2_trust, vv2_cta, vv2_faq, vv2_wrap } = require('./vv2_generator');

const WP_BASE   = 'vardhinivastu.in';
const WP_USER   = 'raghu.hebbur@gmail.com';
const WP_PASS   = 'AD1vSJeLlP8fMcArlSZqcU2K';
const AUTH      = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

function getPageIdBySlug(slug) {
  return new Promise((resolve, reject) => {
    https.get(`https://${WP_BASE}/wp-json/wp/v2/pages?slug=${slug}`, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const pages = JSON.parse(data);
          if (pages.length > 0) {
            resolve(pages[0].id);
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function wpUpdate(pageId, content, title, slug) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ content, title, status: 'publish', slug });
    const method = pageId ? 'POST' : 'POST';
    const path = pageId ? `/wp-json/wp/v2/pages/${pageId}` : `/wp-json/wp/v2/pages`;
    
    const opts = {
      hostname: WP_BASE,
      path: path,
      method: method,
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
          console.log(`✓ Page ${pageId || 'Created'} (${slug}) updated — HTTP ${res.statusCode}`);
          resolve(true);
        } else {
          console.error(`✗ Page failed (${slug}) — HTTP ${res.statusCode}: ${data.slice(0,200)}`);
          resolve(false);
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function buildDentalClinicPage() {
  const css = vv2_css();
  
  const hero = vv2_hero(
    'Precision Energy Alignment',
    'Vastu for Dental Clinic:<br><em>Maximize Practice Growth.</em>',
    'Running a successful dental practice requires more than clinical expertise. Transform your clinic into a thriving, harmonious healing space with scientific, 100% zero-demolition Vastu by Raghavendrra Hebbur.'
  );

  const trust = vv2_trust();

  const body = `<section class="sf"><div class="w">
<p class="eye">PRECISION ENERGY ALIGNMENT</p>
<h2 class="h2">Elevate Your Dental Practice with <em>Precision Energy Alignment</em></h2>
<p class="lead">If you are experiencing unexpected appointment cancellations, frequent breakdowns of expensive dental chairs or RVG machines, or a highly stressed staff, the spatial energy of your clinic may be out of balance. Dentistry is a high-stress profession, and the environment absorbs the anxiety of patients and the intense focus of the doctors.</p>
<p class="lead" style="margin-bottom: 40px;">At Vardhini Vastu, led by principal consultant Raghavendrra Hebbur, we specialize in high-precision, <strong>100% zero-demolition</strong> Vastu solutions. Using advanced radiesthesia tools like the Lecher Antenna and a comprehensive 16-zone Vastu Integrated Diagnosis System (VIDS™), we align your clinic’s energy to attract success.</p>

<h2 class="h2">The Hidden Risks of <em>Ignoring Clinic Vastu</em></h2>
<div class="cards">
<div class="card"><div class="card-ico">💸</div><h3>Stagnant Cash Flow</h3><p>Despite high footfall, collections are delayed or treatments are disputed.</p></div>
<div class="card"><div class="card-ico">😟</div><h3>Patient Anxiety</h3><p>A waiting room in an anxiety-inducing zone makes patients restless, leading to canceled procedures.</p></div>
<div class="card"><div class="card-ico">⚙️</div><h3>Equipment Failures</h3><p>X-ray machines or compressors placed in the water element zones frequently malfunction.</p></div>
<div class="card"><div class="card-ico">👥</div><h3>Staff Attrition</h3><p>Constant friction between associate dentists, hygienists, and reception staff.</p></div>
</div>
</div></section>`;

  const steps = `<section class="sw"><div class="w">
<div class="two-col">
<div>
<p class="eye">METHODOLOGY</p>
<h2 class="h2">Our 7-Step <em>Scientific Vastu Process</em></h2>
<p class="lead">Our methodology relies on precision diagnostics, not guesswork.</p>
<ul class="step-list">
<li class="step-item"><div class="step-num">1</div><div class="step-body"><h4>Scaled Floor Plan Integration</h4><p>We require an exact, to-scale architectural layout of your clinic.</p></div></li>
<li class="step-item"><div class="step-num">2</div><div class="step-body"><h4>Degree-Accurate Center Finding</h4><p>We determine the exact "Brahmasthan" (center) of the clinic using mathematical precision.</p></div></li>
<li class="step-item"><div class="step-num">3</div><div class="step-body"><h4>16-Zone Energy Mapping</h4><p>The clinic is divided into 16 specific Vastu zones to identify elemental imbalances.</p></div></li>
<li class="step-item"><div class="step-num">4</div><div class="step-body"><h4>Lecher Antenna Scanning</h4><p>We measure vibrational frequencies to detect geopathic stress lines intersecting with dental chairs.</p></div></li>
<li class="step-item"><div class="step-num">5</div><div class="step-body"><h4>Defect Identification</h4><p>Pinpointing misplaced entrances, incorrect toilet locations, or conflicting color schemes.</p></div></li>
<li class="step-item"><div class="step-num">6</div><div class="step-body"><h4>Elemental Balancing</h4><p>Applying zero-demolition remedies like metal strips and colored tapes to restore equilibrium.</p></div></li>
<li class="step-item"><div class="step-num">7</div><div class="step-body"><h4>Energetic Programming</h4><p>Strategic placement of customized yantras to activate specific goals.</p></div></li>
</ul>
</div>
<div>
<img src="https://vardhinivastu.in/wp-content/uploads/2026/05/dental-cabinet-with-various-medical-equipment_140725-7678.avif" style="width:100%;border-radius:var(--vv-r);box-shadow:var(--vv-shl);margin-bottom:20px;" alt="Dental Clinic Vastu">
<div class="tcard">
  <div class="tcard-stars">★★★★★</div>
  <p class="tcard-text">"Vastu for a dental clinic is the scientific alignment of the clinic's physical environment—including the reception, dental chairs, X-ray machines, and water points—with the 16 cardinal and intercardinal energy zones."</p>
  <div class="tcard-name">Quick Answer</div>
</div>
</div>
</div>
</div></section>`;

  const mistakes = `<section class="sf"><div class="w">
<p class="eye">COMMON ERRORS</p>
<h2 class="h2">15 Common <em>Vastu Mistakes</em> in Dental Clinics</h2>
<div class="cards" style="grid-template-columns: repeat(3, 1fr);">
<div class="card"><div class="card-ico">🪞</div><h3>Mirror in front of the Dental Chair</h3><p>Reflects the patient’s pain and anxiety back into the room.</p></div>
<div class="card"><div class="card-ico">🚽</div><h3>Toilets in the North-East</h3><p>Blocks growth and clarity. Use proper Vastu tapes to block the negative energy.</p></div>
<div class="card"><div class="card-ico">🔴</div><h3>Red Colors in the North</h3><p>Burns up opportunities for new patients.</p></div>
<div class="card"><div class="card-ico">🔵</div><h3>Blue Colors in the South-East</h3><p>Douses the "fire" of cash flow, causing delayed payments.</p></div>
<div class="card"><div class="card-ico">🏗️</div><h3>Dental Chair under an Exposed Beam</h3><p>Creates energetic pressure and stress for the patient.</p></div>
<div class="card"><div class="card-ico">🧑‍⚕️</div><h3>Doctor Facing South</h3><p>Can lead to arguments with patients over treatment plans.</p></div>
<div class="card"><div class="card-ico">💨</div><h3>Compressor in the North-East</h3><p>Causes heavy mental stress for the clinic owner.</p></div>
<div class="card"><div class="card-ico">📦</div><h3>Cluttered Center</h3><p>The center (Brahmasthan) of the clinic must be empty to allow energy circulation.</p></div>
<div class="card"><div class="card-ico">🚰</div><h3>Water Dispenser in the South-East</h3><p>Clashes with the fire element, harming wealth.</p></div>
<div class="card"><div class="card-ico">⚡</div><h3>Ignoring Geopathic Stress</h3><p>Placing a treatment chair over an earth-stress line prolongs patient healing time.</p></div>
</div>
</div></section>`;

  const consultationOptions = `<section class="sw"><div class="w">
<p class="eye">TAILORED SOLUTIONS</p>
<h2 class="h2">Consultation Options for <em>Doctors</em></h2>
<div class="cards">
<div class="card"><div class="card-ico">🏥</div><h3>Clinic Layout Audit</h3><p>Experiencing stalled growth or equipment issues? Get a degree-accurate, 16-zone analysis of your existing clinic to identify and neutralize defects without breaking walls.</p>
<a href="https://wa.me/919739105574" class="bp" style="margin-top:16px;">📲 Enquire about Audit</a></div>
<div class="card"><div class="card-ico">📐</div><h3>Pre-Purchase / New Layout</h3><p>Pre-purchase vastu analysis before you invest or build. Ensure your reception, X-ray room, and dental chairs are perfectly aligned on the blueprint stage.</p>
<a href="https://wa.me/919739105574" class="bp" style="margin-top:16px;">📲 Enquire about New Layout</a></div>
<div class="card"><div class="card-ico">⚡</div><h3>Geopathic Stress Scan</h3><p>Are your patients highly anxious or taking longer to heal? We use the Lecher Antenna to scan your treatment rooms for harmful intersecting earth radiation lines.</p>
<a href="https://wa.me/919739105574" class="bp" style="margin-top:16px;">📲 Enquire about Stress Scan</a></div>
<div class="card"><div class="card-ico">💻</div><h3>Online Consultation</h3><p>Full VIDS™ consultation delivered entirely via video call. Available for doctors anywhere in India or globally. Requires submission of an accurate scaled floor plan.</p>
<a href="https://wa.me/919739105574" class="bp" style="margin-top:16px;">📲 Enquire about Online</a></div>
</div>
</div></section>`;


  const faq = vv2_faq('Vastu for Dental Clinics', {
    'Which direction should the dental chair face according to Vastu?': 'The dental chair should ideally be placed so that the patient faces East or North while being treated. Consequently, the doctor should sit facing East or North for maximum focus, steady hands, and reduced physical and mental fatigue.',
    'Where should the X-ray machine and sterilization room be located?': 'Radiation equipment (like OPG/X-ray machines) and sterilization units (autoclaves) represent the Fire element. The ideal zones for these are South-East, South-South-East, or South to ensure machine longevity and accurate diagnostics.',
    'Can Vastu help increase patient footfall in my clinic?': 'Yes. By activating the North (zone of Opportunities) and East (zone of Social Connections), and clearing specific energetic blockages, a clinic naturally attracts more patients and improves local reputation.',
    'I cannot move my dental chairs or break walls. Can Vastu still help?': 'Absolutely. Vardhini Vastu specializes in 100% zero-demolition techniques. If a chair or room is in a negative zone, we treat the zone itself using specific metal strips, color therapy, and energetic yantras to neutralize the defect without structural changes.',
    'What is Geopathic Stress and why does it matter for doctors?': 'Geopathic stress lines are harmful earth radiations. If a dental chair is positioned over a stress node, the doctor will experience severe, unexplained fatigue, and the patient may experience heightened anxiety and slower healing post-surgery. We detect these using a Lecher Antenna.'
  });

  const cta = vv2_cta('Let\'s Discuss Your Layout', 'No commitment. Send a quick WhatsApp message, describe your clinic\'s challenges, and Raghavendrra will take it from there.');

  return css + '<div>' + hero + '</div>' + trust + body + steps + mistakes + consultationOptions + faq + cta;
}

async function run() {
  const slug = 'vastu-for-dental-clinic';
  const title = 'Vastu for Dental Clinic: Scientific Layouts & Remedies | Vardhini Vastu';
  
  let pageId = await getPageIdBySlug(slug);
  
  const contentToPush = vv2_wrap(buildDentalClinicPage());
  
  await wpUpdate(pageId, contentToPush, title, slug);
  console.log("Done");
}

run().catch(console.error);
