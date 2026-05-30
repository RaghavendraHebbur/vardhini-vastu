const fs = require('fs');

const locations = [
  { slug: 'vastu-consultant-jakkur', name: 'Jakkur' },
  { slug: 'vastu-consultant-sanjay-nagar', name: 'Sanjay Nagar' },
  { slug: 'vastu-consultant-seegehalli', name: 'Seegehalli' },
  { slug: 'vastu-consultant-budigere', name: 'Budigere' }
];

async function run() {
  const template = fs.readFileSync('local-template.html', 'utf8');
  let mcpPayload = [];

  for (let loc of locations) {
    let page = template;
    const { slug, name } = loc;
    
    page = page.replace(/href="index.css"/g, 'href="../../index.css"');
    page = page.replace(/src="index.js"/g, 'src="../../index.js"');
    page = page.replace(/href="index.html"/g, 'href="../../index.html"');
    
    page = page.replace(/{Locality_Slug}/g, slug);
    
    const title = `Best Vastu Consultant in ${name}, Bangalore | Vardhini Vastu`;
    const desc = `Looking for the best Vastu consultant in ${name}, Bangalore? Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu analysis with zero demolition.`;
    
    page = page.replace(/<title>Best Vastu Consultant in {Locality} \| Vardhini Vastu<\/title>/g, `<title>${title}</title>`);
    page = page.replace(/<meta name="description" content="Looking for the best Vastu consultant in {Locality}\? Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu analysis with zero demolition.">/g, `<meta name="description" content="${desc}">`);
    page = page.replace(/<meta property="og:title" content="Best Vastu Consultant in {Locality} \| Vardhini Vastu">/g, `<meta property="og:title" content="${title}">`);
    page = page.replace(/<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in {Locality}. Book your consultation today.">/g, `<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in ${name}, Bangalore. Book your consultation today.">`);

    page = page.replace(/Vardhini Vastu - {Locality} Office/g, `Vardhini Vastu - ${name} Office`);
    page = page.replace(/Vastu Shastra consultations in {Locality}, Bangalore by Raghavendra Hebbur/g, `Vastu Shastra consultations in ${name} by Certified Geo Master Raghavendra Hebbur`);
    page = page.replace(/"name": "{Locality}"/g, `"name": "${name}"`);
    
    page = page.replace(/consultation%20in%20{Locality}\./g, `consultation%20in%20${name}.`);
    page = page.replace(/visit%20in%20{Locality}\./g, `visit%20in%20${name}.`);
    page = page.replace(/consultation%20for%20{Locality}\./g, `consultation%20for%20${name}.`);
    
    page = page.replace(/Scientific Vastu in {Locality}/g, `Scientific Vastu in ${name}`);
    page = page.replace(/Expert Vastu Consultant in <span>{Locality}<\/span>/g, `Expert Vastu Consultant in <span>${name}</span>`);
    
    page = page.replace(/Serving homes, apartments, corporate offices, and tech startups across {Locality} and surrounding areas\. Get degree-accurate 16-zone energy correction with zero demolition\./g, `Serving homes, apartments, corporate offices, and tech startups across ${name} and surrounding areas. Get degree-accurate 16-zone energy correction with zero demolition.`);
    page = page.replace(/Why Choose Vardhini Vastu for Your Property in {Locality}\?/g, `Why Choose Vardhini Vastu for Your Property in ${name}?`);
    page = page.replace(/{Locality} is one of Bangalore's key growth centers, characterized by modern high-rise apartments, startup offices, and residential villas\. Properties here often face structural constraints that make traditional demolition-based Vastu corrections impossible\./g, `${name} is one of Bangalore's key growth centers, characterized by modern high-rise apartments, startup offices, and residential villas. Properties here often face structural constraints that make traditional demolition-based Vastu corrections impossible.`);
    page = page.replace(/On-Site Audits in {Locality} & Online Consultations/g, `On-Site Audits in ${name} & Online Consultations`);

    page = page.replace(/Frequently Asked Questions in {Locality}/g, `Frequently Asked Questions in ${name}`);
    page = page.replace(/Do you offer site visits in {Locality}\?/g, `Do you offer site visits in ${name}?`);
    page = page.replace(/Yes\. We regularly conduct physical, on-site energy audits for apartments, villas, and commercial properties in {Locality}\. Simply call us or message on WhatsApp to schedule an appointment\./g, `Yes. We regularly conduct physical, on-site energy audits for apartments, villas, and commercial properties in ${name}. Simply call us or message on WhatsApp to schedule an appointment.`);
    
    page = page.replace(/Can you do Vastu corrections for rented apartments in {Locality}\?/g, `Can you do Vastu corrections for rented apartments in ${name}?`);
    page = page.replace(/Absolutely\. Since rented properties cannot undergo structural changes, our zero-demolition remedies \(metal strips, colors, frames\) are ideal\. They can be installed non-invasively and easily removed if you relocate\./g, `Absolutely. Since rented properties cannot undergo structural changes, our zero-demolition remedies (metal strips, colors, frames) are ideal. They can be installed non-invasively and easily removed if you relocate.`);

    page = page.replace(/What are the consultation charges for {Locality}\?/g, `What are the consultation charges for ${name}?`);
    page = page.replace(/Consultation fees vary depending on the type \(Residential vs\. Commercial\) and square footage of the property\. Contact us with your floor plan dimensions to get a precise quote instantly\./g, `Consultation fees vary depending on the type (Residential vs. Commercial) and square footage of the property. Contact us with your floor plan dimensions to get a precise quote instantly.`);
    
    page = page.replace(/Harmonizing spaces for career growth, wealth, and wellness in {Locality}\./g, `Harmonizing spaces for career growth, wealth, and wellness in ${name}.`);
    page = page.replace(/{Locality}/g, name);
    
    // Save locally
    const dir = 'locations/' + slug;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dir + '/index.html', page);
    console.log('Generated ' + dir + '/index.html');

    // Parse for WP
    const mainMatch = page.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    const content = mainMatch ? "<!-- wp:html -->\n<div class=\"vv\">\n" + mainMatch[1].trim() + "\n</div>\n<!-- /wp:html -->" : page;
    
    mcpPayload.push({
      slug, title, description: desc, content
    });
  }

  fs.writeFileSync('batch_4_payload.json', JSON.stringify(mcpPayload, null, 2));
  console.log("Wrote batch_4_payload.json.");
}

run().catch(console.error);
