import sys
import re
from bs4 import BeautifulSoup

# Reconfigure stdout for UTF-8
sys.stdout.reconfigure(encoding='utf-8')

def inspect_content():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    
    print("--- LIVE SITE SECTIONS AND COPY ---")
    
    for h2 in soup.find_all('h2'):
        print(f"\n[SECTION] {h2.text.strip()}")
        # Find next siblings
        sibling = h2.next_sibling
        count = 0
        while sibling and count < 3:
            if sibling.name == 'p':
                print(f"  P: {sibling.text.strip()[:150]}...")
                count += 1
            elif sibling.name == 'div':
                sub_ps = sibling.find_all('p')
                for p in sub_ps[:2]:
                    print(f"  Div->P: {p.text.strip()[:150]}...")
                count += 1
            sibling = sibling.next_sibling

if __name__ == '__main__':
    inspect_content()
