import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def list_h2s():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    h2s = soup.find_all('h2')
    print(f"Total H2 tags: {len(h2s)}")
    for i, h2 in enumerate(h2s):
        parent = h2.parent
        parent_info = f"Tag={parent.name}, Class={parent.get('class', [])}"
        print(f"  H2 {i+1}: Text='{h2.text.strip().replace('\n', ' ')}'")
        print(f"       Parent: {parent_info}")

if __name__ == '__main__':
    list_h2s()
