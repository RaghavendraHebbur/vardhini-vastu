import os
import glob
import re
import urllib.request
import base64
import json

WP_BASE = 'vardhinivastu.in'
WP_USER = 'raghu.hebbur@gmail.com'
WP_PASS = 'AD1vSJeLlP8fMcArlSZqcU2K'
AUTH = base64.b64encode(f"{WP_USER}:{WP_PASS}".encode()).decode()

def get_page_id(slug):
    url = f"https://{WP_BASE}/wp-json/wp/v2/pages?slug={slug}"
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            if data and len(data) > 0:
                return data[0]['id']
    except Exception as e:
        print(f"Error fetching {slug}: {e}")
    return None

def update_page(page_id, content):
    url = f"https://{WP_BASE}/wp-json/wp/v2/pages/{page_id}"
    data = json.dumps({'content': content}).encode()
    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Authorization', f'Basic {AUTH}')
    req.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(req) as res:
            return res.getcode()
    except Exception as e:
        return str(e)

# Get 50 files
files = glob.glob('vastu-for-*.html')[:50]

for f in files:
    topic = f.replace('vastu-for-', '').replace('.html', '').replace('-', ' ').title()
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Check if we already injected the authority block
    if 'Local Authority & VIDS™ Context' in content:
        continue

    # Create the 200-word authority block
    block = f"""
    <section class="vv-local-authority" style="margin-top: 40px; padding: 30px; background: #f9f9f9; border-left: 4px solid var(--vv-gold, #C9A84C);">
        <h3>Local Authority & VIDS™ Context for {topic}</h3>
        <p>When applying Vastu principles to <strong>{topic}</strong>, traditional texts must be adapted to modern architectural constraints. At Vardhini Vastu, our Vastu Integrated Diagnosis System (VIDS™) approaches this by dividing the layout into 16 hyper-specific directional zones. Rather than relying on generic, one-size-fits-all advice, we use the Lecher Antenna to detect subtle geopathic stress lines and telluric energies that specifically impact the structural integrity and energetic flow of {topic}.</p>
        <p>One of the most critical aspects of our methodology is the 100% Zero-Demolition guarantee. For {topic}, structural changes are often prohibited or financially unviable. We neutralize elemental imbalances using targeted color therapy, precise placement of metal helixes, and the activation of the Brahma Sthan (the energetic center). By aligning the macro-environment with micro-remedies, we ensure that the space resonates with positive frequencies, enhancing overall well-being, financial stability, and peace of mind without breaking a single wall.</p>
    </section>
    """
    
    # Inject before the closing </main> or at the end of the body if <main> doesn't exist
    if '</main>' in content:
        content = content.replace('</main>', block + '\n</main>')
    elif '<div class="vv-faq-section">' in content:
        content = content.replace('<div class="vv-faq-section">', block + '\n<div class="vv-faq-section">')
    else:
        # Just append before final closing div if we can find it
        content += block
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
        
    slug = f.replace('.html', '')
    pid = get_page_id(slug)
    if pid:
        status = update_page(pid, content)
        print(f"Updated {slug}: {status}")
    else:
        print(f"Slug {slug} not found on WP.")
