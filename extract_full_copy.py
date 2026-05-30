import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def extract_full_copy():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    content = soup.find(class_='entry-content')
    if not content:
        print("No entry-content found")
        return
        
    sections = content.find_all('section')
    for i, sec in enumerate(sections):
        class_val = sec.get('class')
        print(f"\n==================================================")
        print(f"SECTION {i+1}: Class={class_val}")
        print(f"==================================================")
        
        # We want to print all headings and paragraphs in order
        for child in sec.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'span'], recursive=True):
            # Check if this child has parents that are also inside the section that we already printed?
            # To avoid printing duplicates, let's just print elements of interest
            if child.name in ['h2', 'h3', 'h4', 'p']:
                # Print tag and text
                text = child.text.strip().replace('\n', ' ')
                print(f"[{child.name.upper()}] {text}")
            elif child.name == 'span' and 'vv-area-pill' in child.get('class', []):
                print(f"[PILL] {child.text.strip()}")
            elif child.name == 'li' and child.parent and child.parent.name == 'ul' and 'vv-service-list' in child.parent.get('class', []):
                print(f"[SERVICE-LI] {child.text.strip()}")

if __name__ == '__main__':
    extract_full_copy()
