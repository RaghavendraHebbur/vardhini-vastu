import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def extract_truncated_copy():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    content = soup.find(class_='entry-content')
    if not content:
        print("No entry-content found")
        return
        
    sections = content.find_all('section')
    for i, sec in enumerate(sections[:3]):
        class_val = sec.get('class')
        print(f"\n==================================================")
        print(f"SECTION {i+1}: Class={class_val}")
        print(f"==================================================")
        
        for child in sec.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'span'], recursive=True):
            if child.name in ['h2', 'h3', 'h4', 'p']:
                text = child.text.strip().replace('\n', ' ')
                print(f"[{child.name.upper()}] {text}")
            elif child.name == 'span' and 'vv-badge' in child.get('class', []):
                print(f"[BADGE] {child.text.strip()}")
            elif child.name == 'li' and child.parent and child.parent.name == 'ul' and 'vv-service-list' in child.parent.get('class', []):
                print(f"[SERVICE-LI] {child.text.strip()}")

if __name__ == '__main__':
    extract_truncated_copy()
