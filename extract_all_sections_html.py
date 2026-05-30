import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def extract_all():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    content = soup.find(class_='entry-content')
    if not content:
        print("No entry-content found")
        return
        
    sections = content.find_all('section')
    print(f"Found {len(sections)} sections.")
    
    with open("extracted_sections.html", "w", encoding="utf-8") as out:
        for i, sec in enumerate(sections):
            class_val = sec.get('class')
            id_val = sec.get('id')
            out.write(f"\n<!-- ==================== SECTION {i+1}: ID={id_val} CLASS={class_val} ==================== -->\n")
            out.write(sec.prettify())
            out.write("\n")
            print(f"Extracted Section {i+1}: ID={id_val}, Class={class_val}")

if __name__ == '__main__':
    extract_all()
