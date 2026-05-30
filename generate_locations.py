import os
import re

def main():
    template_path = "local-template.html"
    content_path = "locations_content.html"
    
    if not os.path.exists(template_path):
        print(f"Error: {template_path} not found.")
        return
    if not os.path.exists(content_path):
        print(f"Error: {content_path} not found.")
        return
        
    with open(template_path, "r", encoding="utf-8") as f:
        template = f.read()
        
    with open(content_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Find all links in the directory
    # Format: <a href="https://vardhinivastu.in/slug/">Name</a>
    links = re.findall(r'<a\s+href="https://vardhinivastu\.in/([^"/]+)/"[^>]*>([\s\S]*?)<\/a>', content)
    print(f"Found {len(links)} locations to generate.")
    
    international_slugs = ['usa', 'uk', 'canada', 'australia', 'singapore', 'dubai', 'abu-dhabi', 'qatar']
    india_cities_slugs = ['ahmedabad', 'chandigarh', 'chennai', 'coimbatore', 'delhi', 'gurugram', 'hyderabad', 'jaipur', 'kochi', 'kolkata', 'mangaluru', 'mumbai', 'mysuru', 'noida', 'pune', 'bhopal', 'bhubaneswar', 'dehradun', 'faridabad', 'ghaziabad', 'guwahati', 'indore', 'jamshedpur', 'kanpur', 'lucknow', 'madurai', 'nagpur', 'nashik', 'navi-mumbai', 'patna', 'raipur', 'ranchi', 'surat', 'thane', 'trivandrum', 'vadodara', 'vijayawada', 'visakhapatnam', 'guntur', 'ludhiana', 'hubli', 'dharwad', 'belgaum', 'davangere', 'bellary', 'shimoga', 'tumkur', 'gulbarga', 'bidar', 'hassan', 'udupi', 'chikmagalur', 'tirupati', 'nellore', 'kurnool', 'rajahmundry', 'kakinada', 'kadapa', 'anantapur', 'eluru', 'ongole', 'vizianagaram', 'srikakulam', 'tenali', 'chittoor', 'varanasi', 'agra', 'prayagraj', 'meerut', 'gwalior', 'jabalpur', 'rajkot', 'jodhpur', 'udaipur', 'kota', 'amritsar', 'jalandhar', 'trichy', 'salem', 'tiruppur', 'kozhikode', 'thrissur', 'aurangabad', 'solapur', 'kolhapur', 'panaji', 'srinagar', 'jammu', 'shimla', 'haridwar']
    
    os.makedirs("locations", exist_ok=True)
    
    generated_count = 0
    for slug, raw_name in links:
        name = re.sub(r'<[^>]+>', '', raw_name).strip()
        name = " ".join(name.split())
        
        # Determine category and locality details
        if slug == "best-vastu-consultant-bangalore":
            category = "bangalore_whole"
            locality = "Bangalore"
        elif slug == "best-vastu-consultant-india":
            category = "india_whole"
            locality = "India"
        else:
            # Suffix after vastu-consultant-
            suffix = slug.replace("vastu-consultant-", "")
            if suffix in international_slugs:
                category = "international"
                locality = name
            elif suffix in india_cities_slugs:
                category = "india_city"
                locality = name
            else:
                category = "bangalore_hood"
                locality = name
        
        # Prepare replacements
        # We start with the base template
        page = template
        
        # 1. Update stylesheet, script, logo and navigation links to point to root (../..)
        page = page.replace('href="index.css"', 'href="../../index.css"')
        page = page.replace('src="index.js"', 'src="../../index.js"')
        page = page.replace('href="index.html"', 'href="../../index.html"')
        
        # 2. Setup URL paths
        page = page.replace('{Locality_Slug}', slug)
        
        # 3. Titles and Meta Description
        if category == "bangalore_hood":
            page = page.replace('<title>Best Vastu Consultant in {Locality} | Vardhini Vastu</title>',
                                f'<title>Best Vastu Consultant in {locality}, Bangalore | Vardhini Vastu</title>')
            page = page.replace('<meta name="description" content="Looking for the best Vastu consultant in {Locality}? Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu analysis with zero demolition.">',
                                f'<meta name="description" content="Looking for the best Vastu consultant in {locality}, Bangalore? Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu analysis with zero demolition.">')
            page = page.replace('<meta property="og:title" content="Best Vastu Consultant in {Locality} | Vardhini Vastu">',
                                f'<meta property="og:title" content="Best Vastu Consultant in {locality}, Bangalore | Vardhini Vastu">')
            page = page.replace('<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in {Locality}. Book your consultation today.">',
                                f'<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in {locality}, Bangalore. Book your consultation today.">')
        elif category == "bangalore_whole":
            page = page.replace('<title>Best Vastu Consultant in {Locality} | Vardhini Vastu</title>',
                                '<title>Best Vastu Consultant in Bangalore | Scientific Non-Demolition Vastu</title>')
            page = page.replace('<meta name="description" content="Looking for the best Vastu consultant in {Locality}? Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu analysis with zero demolition.">',
                                '<meta name="description" content="Looking for the best Vastu consultant in Bangalore? Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu analysis with zero demolition.">')
            page = page.replace('<meta property="og:title" content="Best Vastu Consultant in {Locality} | Vardhini Vastu">',
                                '<meta property="og:title" content="Best Vastu Consultant in Bangalore | Scientific Non-Demolition Vastu">')
            page = page.replace('<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in {Locality}. Book your consultation today.">',
                                '<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in Bangalore. Book your consultation today.">')
        elif category == "india_whole":
            page = page.replace('<title>Best Vastu Consultant in {Locality} | Vardhini Vastu</title>',
                                '<title>Best Vastu Consultant in India | Scientific Non-Demolition Vastu</title>')
            page = page.replace('<meta name="description" content="Looking for the best Vastu consultant in {Locality}? Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu analysis with zero demolition.">',
                                '<meta name="description" content="Looking for the best Vastu consultant in India? Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu analysis with zero structural demolition.">')
            page = page.replace('<meta property="og:title" content="Best Vastu Consultant in {Locality} | Vardhini Vastu">',
                                '<meta property="og:title" content="Best Vastu Consultant in India | Scientific Non-Demolition Vastu">')
            page = page.replace('<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in {Locality}. Book your consultation today.">',
                                '<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in India. Book your consultation today.">')
        elif category == "india_city":
            page = page.replace('<title>Best Vastu Consultant in {Locality} | Vardhini Vastu</title>',
                                f'<title>Best Vastu Consultant in {locality} | Scientific Vastu Shastra</title>')
            page = page.replace('<meta name="description" content="Looking for the best Vastu consultant in {Locality}? Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu analysis with zero demolition.">',
                                f'<meta name="description" content="Looking for the best Vastu consultant in {locality}? Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu analysis with 100% zero structural demolition.">')
            page = page.replace('<meta property="og:title" content="Best Vastu Consultant in {Locality} | Vardhini Vastu">',
                                f'<meta property="og:title" content="Best Vastu Consultant in {locality} | Scientific Vastu Shastra">')
            page = page.replace('<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in {Locality}. Book your consultation today.">',
                                f'<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in {locality}. Book your consultation today.">')
        elif category == "international":
            page = page.replace('<title>Best Vastu Consultant in {Locality} | Vardhini Vastu</title>',
                                f'<title>Best Vastu Consultant in {locality} | Online Scientific Vastu</title>')
            page = page.replace('<meta name="description" content="Looking for the best Vastu consultant in {Locality}? Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu analysis with zero demolition.">',
                                f'<meta name="description" content="Looking for the best Vastu consultant in {locality}? Certified Geo Master Raghavendra Hebbur offers scientific 16-zone VIDS™ Vastu consultations with zero demolition.">')
            page = page.replace('<meta property="og:title" content="Best Vastu Consultant in {Locality} | Vardhini Vastu">',
                                f'<meta property="og:title" content="Best Vastu Consultant in {locality} | Online Scientific Vastu">')
            page = page.replace('<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in {Locality}. Book your consultation today.">',
                                f'<meta property="og:description" content="Proprietary VIDS™ 16-zone analysis with zero demolition in {locality}. Book your consultation today.">')

        # 4. Schema markup replacement
        page = page.replace('Vardhini Vastu - {Locality} Office', f'Vardhini Vastu - {locality} Office')
        page = page.replace('Vastu Shastra consultations in {Locality}, Bangalore by Raghavendra Hebbur', 
                            f'Vastu Shastra consultations in {locality} by Certified Geo Master Raghavendra Hebbur')
        page = page.replace('"name": "{Locality}"', f'"name": "{locality}"')
        
        # 5. WhatsApp / CTA link replacements
        page = page.replace('consultation%20in%20{Locality}.', f'consultation%20in%20{locality}.')
        page = page.replace('visit%20in%20{Locality}.', f'visit%20in%20{locality}.')
        page = page.replace('consultation%20for%20{Locality}.', f'consultation%20for%20{locality}.')
        
        # 6. Hero and Inner body replacements
        page = page.replace('Scientific Vastu in {Locality}', f'Scientific Vastu in {locality}')
        page = page.replace('Expert Vastu Consultant in <span>{Locality}</span>', f'Expert Vastu Consultant in <span>{locality}</span>')
        
        if category == "bangalore_hood":
            page = page.replace('Serving homes, apartments, corporate offices, and tech startups across {Locality} and surrounding areas. Get degree-accurate 16-zone energy correction with zero demolition.',
                                f'Serving homes, apartments, corporate offices, and tech startups across {locality} and surrounding areas. Get degree-accurate 16-zone energy correction with zero demolition.')
            page = page.replace('Why Choose Vardhini Vastu for Your Property in {Locality}?',
                                f'Why Choose Vardhini Vastu for Your Property in {locality}?')
            page = page.replace('{Locality} is one of Bangalore\'s key growth centers, characterized by modern high-rise apartments, startup offices, and residential villas. Properties here often face structural constraints that make traditional demolition-based Vastu corrections impossible.',
                                f'{locality} is one of Bangalore\'s key growth centers, characterized by modern high-rise apartments, startup offices, and residential villas. Properties here often face structural constraints that make traditional demolition-based Vastu corrections impossible.')
            page = page.replace('On-Site Audits in {Locality} & Online Consultations',
                                f'On-Site Audits in {locality} & Online Consultations')
        elif category == "bangalore_whole":
            page = page.replace('Serving homes, apartments, corporate offices, and tech startups across {Locality} and surrounding areas. Get degree-accurate 16-zone energy correction with zero demolition.',
                                'Providing scientific, non-demolition Vastu consultations for apartments, villas, and offices across Bangalore. Get degree-accurate 16-zone energy correction.')
            page = page.replace('Why Choose Vardhini Vastu for Your Property in {Locality}?',
                                'Why Choose Vardhini Vastu for Your Property in Bangalore?')
            page = page.replace('{Locality} is one of Bangalore\'s key growth centers, characterized by modern high-rise apartments, startup offices, and residential villas. Properties here often face structural constraints that make traditional demolition-based Vastu corrections impossible.',
                                'Bangalore, as India\'s Silicon Valley, has modern apartments, tech parks, and residential layouts. Properties here often face structural constraints where demolition is not allowed or practical.')
            page = page.replace('On-Site Audits in {Locality} & Online Consultations',
                                'On-Site Audits across Bangalore & Online Consultations')
        elif category == "india_whole":
            page = page.replace('Serving homes, apartments, corporate offices, and tech startups across {Locality} and surrounding areas. Get degree-accurate 16-zone energy correction with zero demolition.',
                                'Providing scientific, non-demolition Vastu consultations for residential and commercial properties across India. Get degree-accurate 16-zone energy correction.')
            page = page.replace('Why Choose Vardhini Vastu for Your Property in {Locality}?',
                                'Why Choose Vardhini Vastu in India?')
            page = page.replace('{Locality} is one of Bangalore\'s key growth centers, characterized by modern high-rise apartments, startup offices, and residential villas. Properties here often face structural constraints that make traditional demolition-based Vastu corrections impossible.',
                                'With properties across India ranging from traditional homes to modern high-rises and large industrial factories, structural demolition is often impractical or costly.')
            page = page.replace('On-Site Audits in {Locality} & Online Consultations',
                                'On-Site Audits in Select Cities & Online Consultations')
        elif category == "india_city":
            page = page.replace('Serving homes, apartments, corporate offices, and tech startups across {Locality} and surrounding areas. Get degree-accurate 16-zone energy correction with zero demolition.',
                                f'Providing scientific, non-demolition Vastu consultations for apartments, villas, and businesses across {locality}. Get degree-accurate 16-zone energy correction online and on-site.')
            page = page.replace('Why Choose Vardhini Vastu for Your Property in {Locality}?',
                                f'Why Choose Vardhini Vastu for Your Property in {locality}?')
            page = page.replace('{Locality} is one of Bangalore\'s key growth centers, characterized by modern high-rise apartments, startup offices, and residential villas. Properties here often face structural constraints that make traditional demolition-based Vastu corrections impossible.',
                                f'{locality} is a major urban hub with high-rise apartments, commercial spaces, and residential complexes. Due to structural restrictions in modern {locality} buildings, traditional demolition-based Vastu is impossible.')
            page = page.replace('On-Site Audits in {Locality} & Online Consultations',
                                f'On-Site Audits in {locality} & Online Consultations')
        elif category == "international":
            page = page.replace('Serving homes, apartments, corporate offices, and tech startups across {Locality} and surrounding areas. Get degree-accurate 16-zone energy correction with zero demolition.',
                                f'Providing scientific, non-demolition Vastu consultations for homes and businesses in {locality}. Get degree-accurate 16-zone energy correction via detailed online sessions.')
            page = page.replace('Why Choose Vardhini Vastu for Your Property in {Locality}?',
                                f'Why Choose Vardhini Vastu for Your Property in {locality}?')
            page = page.replace('{Locality} is one of Bangalore\'s key growth centers, characterized by modern high-rise apartments, startup offices, and residential villas. Properties here often face structural constraints that make traditional demolition-based Vastu corrections impossible.',
                                f'{locality} properties, ranging from luxury villas to modern high-rise apartments, are built with strict structural codes. Demolition is never an option.')
            page = page.replace('On-Site Audits in {Locality} & Online Consultations',
                                'Comprehensive Remote Online Consultations')

        # Body Paragraph 2 replacement (common target)
        if category == "india_whole":
            page = page.replace('Our proprietary <strong>VIDS™ Method</strong> bypasses these constraints completely. By leveraging copper and brass element modulators, colored tapes, and geopathic scanners, we align the 16 energetic zones of your floor plan without knocking down a single brick.',
                                'Our zero-demolition VIDS™ method balances the 16 energy zones of your space using non-invasive tools like copper/brass modulators and geopathic stress correctors.')
        elif category == "india_city":
            page = page.replace('Our proprietary <strong>VIDS™ Method</strong> bypasses these constraints completely. By leveraging copper and brass element modulators, colored tapes, and geopathic scanners, we align the 16 energetic zones of your floor plan without knocking down a single brick.',
                                'Our zero-demolition VIDS™ method uses element modulators to balance energies without demolition, ensuring full compliance without structural damage.')
        elif category == "international":
            page = page.replace('Our proprietary <strong>VIDS™ Method</strong> bypasses these constraints completely. By leveraging copper and brass element modulators, colored tapes, and geopathic scanners, we align the 16 energetic zones of your floor plan without knocking down a single brick.',
                                'Our zero-demolition VIDS™ method uses scientific tools like geopathic scanners and element modulators to balance the 16 energy zones of your space.')

        # 7. FAQs
        page = page.replace('Frequently Asked Questions in {Locality}', f'Frequently Asked Questions in {locality}')
        page = page.replace('Do you offer site visits in {Locality}?', 
                            'Do you offer consultations across India?' if category == "india_whole" else
                            f'Do you offer consultations in {locality}?' if category == "international" else
                            f'Do you offer site visits in {locality}?')
        
        if category == "bangalore_hood":
            page = page.replace('Yes. We regularly conduct physical, on-site energy audits for apartments, villas, and commercial properties in {Locality}. Simply call us or message on WhatsApp to schedule an appointment.',
                                f'Yes. We regularly conduct physical, on-site energy audits for apartments, villas, and commercial properties in {locality}. Simply call us or message on WhatsApp to schedule an appointment.')
        elif category == "bangalore_whole":
            page = page.replace('Yes. We regularly conduct physical, on-site energy audits for apartments, villas, and commercial properties in {Locality}. Simply call us or message on WhatsApp to schedule an appointment.',
                                'Yes. We regularly conduct physical, on-site energy audits for properties across Bangalore. Simply call us or message on WhatsApp to schedule.')
        elif category == "india_whole":
            page = page.replace('Yes. We regularly conduct physical, on-site energy audits for apartments, villas, and commercial properties in {Locality}. Simply call us or message on WhatsApp to schedule an appointment.',
                                'Yes. We offer on-site audits for select commercial and residential properties across India, and comprehensive online consultations via scaled layouts for all locations.')
        elif category == "india_city":
            page = page.replace('Yes. We regularly conduct physical, on-site energy audits for apartments, villas, and commercial properties in {Locality}. Simply call us or message on WhatsApp to schedule an appointment.',
                                f'Yes, we offer on-site audits for homes and commercial spaces in {locality} by appointment, as well as highly detailed remote online consultations using scaled floor plans.')
        elif category == "international":
            page = page.replace('Yes. We regularly conduct physical, on-site energy audits for apartments, villas, and commercial properties in {Locality}. Simply call us or message on WhatsApp to schedule an appointment.',
                                f'Yes. We provide comprehensive online Vastu consultations for clients in {locality} using high-resolution scaled floor plans, video walk-throughs, and remote aura scanning.')

        # Q2
        page = page.replace('Can you do Vastu corrections for rented apartments in {Locality}?',
                            'Can you do Vastu corrections for rented flats in India?' if category == "india_whole" else
                            f'How do online Vastu consultations work for {locality} properties?' if category == "international" else
                            f'Can you do Vastu corrections for rented apartments in {locality}?')
        
        if category == "bangalore_hood":
            page = page.replace('Absolutely. Since rented properties cannot undergo structural changes, our zero-demolition remedies (metal strips, colors, frames) are ideal. They can be installed non-invasively and easily removed if you relocate.',
                                f'Absolutely. Since rented properties cannot undergo structural changes, our zero-demolition remedies (metal strips, colors, frames) are ideal. They can be installed non-invasively and easily removed if you relocate.')
        elif category == "bangalore_whole":
            page = page.replace('Absolutely. Since rented properties cannot undergo structural changes, our zero-demolition remedies (metal strips, colors, frames) are ideal. They can be installed non-invasively and easily removed if you relocate.',
                                'Absolutely. Since rented properties cannot undergo structural changes, our zero-demolition remedies are ideal and can be removed if you relocate.')
        elif category == "india_whole":
            page = page.replace('Absolutely. Since rented properties cannot undergo structural changes, our zero-demolition remedies (metal strips, colors, frames) are ideal. They can be installed non-invasively and easily removed if you relocate.',
                                'Yes. Our remedies are completely non-demolition and removable, making them perfect for rented flats, corporate offices, and leased spaces anywhere in India.')
        elif category == "india_city":
            page = page.replace('Absolutely. Since rented properties cannot undergo structural changes, our zero-demolition remedies (metal strips, colors, frames) are ideal. They can be installed non-invasively and easily removed if you relocate.',
                                f'Absolutely. Our zero-demolition remedies (like metal balancing and color therapies) are perfect for rented flats in {locality} as they do not require structural changes and can be removed.')
        elif category == "international":
            page = page.replace('Absolutely. Since rented properties cannot undergo structural changes, our zero-demolition remedies (metal strips, colors, frames) are ideal. They can be installed non-invasively and easily removed if you relocate.',
                                'You send us your scaled property layout. We perform a digital 16-zone grid mapping, identify geopathic stress zones, and send you a detailed report with easy-to-install, zero-demolition remedies (like specific metal/color modulators).')

        # Q3
        page = page.replace('What are the consultation charges for {Locality}?',
                            'How can I book a consultation in India?' if category == "india_whole" else
                            f'What are the consultation charges for {locality}?')
        
        if category == "bangalore_hood":
            page = page.replace('Consultation fees vary depending on the type (Residential vs. Commercial) and square footage of the property. Contact us with your floor plan dimensions to get a precise quote instantly.',
                                f'Consultation fees vary depending on the type (Residential vs. Commercial) and square footage of the property. Contact us with your floor plan dimensions to get a precise quote instantly.')
        elif category == "bangalore_whole":
            page = page.replace('Consultation fees vary depending on the type (Residential vs. Commercial) and square footage of the property. Contact us with your floor plan dimensions to get a precise quote instantly.',
                                'Fees vary depending on the type and size of the property. Contact us with your floor plan dimensions to get a quote.')
        elif category == "india_whole":
            page = page.replace('Consultation fees vary depending on the type (Residential vs. Commercial) and square footage of the property. Contact us with your floor plan dimensions to get a precise quote instantly.',
                                'You can reach out on WhatsApp or call us to share your floor plan and schedule an online or on-site consultation.')
        elif category == "india_city":
            page = page.replace('Consultation fees vary depending on the type (Residential vs. Commercial) and square footage of the property. Contact us with your floor plan dimensions to get a precise quote instantly.',
                                f'Charges depend on property type and size. Contact us with your floor plan for a customized quote.')
        elif category == "international":
            page = page.replace('Consultation fees vary depending on the type (Residential vs. Commercial) and square footage of the property. Contact us with your floor plan dimensions to get a precise quote instantly.',
                                f'Charges depend on the property type (residential/commercial) and layout size. Reach out on WhatsApp or email for details.')

        # 8. Footer
        page = page.replace('Harmonizing spaces for career growth, wealth, and wellness in {Locality}.',
                            f'Harmonizing spaces for career growth, wealth, and wellness across {locality}.' if category in ["india_whole", "international"] else
                            f'Harmonizing spaces for career growth, wealth, and wellness in {locality}.')
        
        # Clean any stray tags that might remain (safety check)
        page = page.replace('{Locality}', locality)
        
        # Create output directory
        dest_dir = os.path.join("locations", slug)
        os.makedirs(dest_dir, exist_ok=True)
        
        # Write file
        dest_file = os.path.join(dest_dir, "index.html")
        with open(dest_file, "w", encoding="utf-8") as f:
            f.write(page)
            
        generated_count += 1
        
    print(f"Successfully generated {generated_count} location pages inside 'locations/' folder.")

if __name__ == "__main__":
    main()
