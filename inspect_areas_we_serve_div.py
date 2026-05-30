import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def inspect_areas_we_serve():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    h2s = soup.find_all('h2')
    
    # We want Heading 11 (index 10)
    if len(h2s) > 10:
        h2 = h2s[10]
        print("--- AREAS WE SERVE H2 ---")
        print(f"H2 text: {h2.text.strip()}")
        print("\n--- Parent structure ---")
        parent = h2.parent
        print(f"Parent tag: {parent.name}, classes: {parent.get('class', [])}, ID: {parent.get('id')}")
        print("\n--- Children of parent ---")
        for child in parent.children:
            if child.name:
                print(f"  Child tag: {child.name}, class: {child.get('class', [])}")
                print(f"  Content preview: {child.text.strip()[:300]}...")
                print("-" * 20)
    else:
        print("Not enough H2 tags found")

if __name__ == '__main__':
    inspect_areas_we_serve()
