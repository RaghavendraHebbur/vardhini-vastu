import os, glob, re

directories = [
    'c:/Users/raghu/VV/vv-locality-pages',
    'c:/Users/raghu/VV/vv-locality-pages-batch2',
    'c:/Users/raghu/VV/vv-locality-pages-batch3',
    'c:/Users/raghu/VV/vv-locality-pages-batch4'
]

templates = [
    "Located in the vibrant area of {location}, local architecture presents unique energetic challenges. Commercial layouts and residential structures in {location} often suffer from hidden Vastu defects like irregular plots and blocked cosmic zones. Our degree-accurate VIDS analysis helps balance the Pancha Bhootas (five elements) specifically for {location} properties, ensuring maximum positive energy without structural demolition.",
    "For properties situated in {location}, applying scientific Vastu is critical for harmony and growth. Many apartments and villas in the {location} neighborhood have inherent directional imbalances due to modern grid planning. By using advanced Lecher antenna scanning in {location}, we identify geopathic stress and apply 100% zero-demolition remedies like copper strips and energy helixes to restore equilibrium.",
    "Residents and business owners in {location} frequently seek our VIDS methodology to correct spatial energies. The unique urban density in {location} requires a highly analytical, 16-zone Vastu approach rather than generic 8-direction myths. We specialize in mapping the exact energetic footprint of {location} buildings to eliminate Vastu doshas related to wealth, health, and relationships seamlessly.",
    "Building or buying a home in {location}? Securing the energetic foundation is essential. Properties across {location} benefit immensely from our scientific Vastu interventions. Rather than breaking walls, our expert consultation in {location} uses exact angular measurements and color therapy to align your space with natural cosmic flows, unlocking peace and prosperity."
]

count = 0
for d in directories:
    if not os.path.exists(d):
        continue
    files = glob.glob(f"{d}/*.html")
    for filepath in files:
        filename = os.path.basename(filepath)
        match = re.match(r"vastu-consultant-(.*)\.html", filename)
        if match:
            raw_loc = match.group(1)
            loc_name = " ".join([word.capitalize() for word in raw_loc.split('-')])
            template = templates[count % len(templates)]
            unique_paragraph = f'\n  <div class="sf w"><div class="local-seo-block" style="background:#f8f9fa; padding:20px; border-left:4px solid var(--vv-green); margin-bottom:30px;"><p><strong>Vastu Dynamics in {loc_name}:</strong> {template.format(location=loc_name)}</p></div></div>\n'
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'Vastu Dynamics in' not in content:
                content = content.replace('</section>', '</section>' + unique_paragraph, 1)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
print(f"Successfully injected unique local SEO blocks into {count} neighborhood pages in VV repo.")
