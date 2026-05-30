import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def inspect_sections():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    
    # Let's inspect the sections in the entry-content div (where the wordpress content lives)
    content = soup.find(class_='entry-content')
    if not content:
        print("No entry-content found")
        return
        
    print("--- ALL HOMEPAGE SECTIONS ---")
    sections = content.find_all(['section', 'div'], recursive=False)
    
    # If the direct children are not the main sections, let's search for tags that represent sections
    # Often, they are sections inside entry-content. Let's list all elements that have class starting with 'vv-'
    vv_elements = content.find_all(class_=lambda x: x and any(c.startswith('vv-') for c in x.split()))
    
    # Let's list all sections
    sections = content.find_all('section')
    print(f"Total <section> tags: {len(sections)}")
    for i, sec in enumerate(sections):
        id_val = sec.get('id')
        class_val = sec.get('class')
        print(f"\n[{i+1}] SECTION: ID={id_val}, Class={class_val}")
        
        # Check headings inside
        headings = sec.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
        for h in headings:
            print(f"  Heading ({h.name}): {h.text.strip()}")
            
        # Check first paragraph snippet
        p = sec.find('p')
        if p:
            print(f"  P text: {p.text.strip()[:200]}...")
            
        # Check if there is an area pill or lists
        pills = sec.find_all(class_='vv-area-pill')
        if pills:
            print(f"  Found {len(pills)} area pills: {[pill.text.strip() for pill in pills[:5]]}...")
            
        # Check if there is a timeline or steps
        steps = sec.find_all(class_='vv-step')
        if steps:
            print(f"  Found {len(steps)} steps in timeline.")
            
        # Check if there are services
        srv_cards = sec.find_all(class_='vv-service-card')
        if srv_cards:
            print(f"  Found {len(srv_cards)} service cards.")
            
        # Check if there are testimonials
        testimonials = sec.find_all(class_='vv-testi-card')
        if testimonials:
            print(f"  Found {len(testimonials)} testimonial cards.")

if __name__ == '__main__':
    inspect_sections()
