import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def extract_hero():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    
    # Let's inspect the body and search for the main page header and the first section or container
    body = soup.find('body')
    if not body:
        print("No body found")
        return
        
    # Let's search for header elements
    header = soup.find('header')
    if header:
        print("--- HEADER ELEMENT ---")
        print(header.prettify()[:1500])
        print("--- END HEADER ---")
        
    # Let's print out the first 10,000 characters of the body content inside main content area
    # Astra often uses a container with class ast-container or similar, let's search for divs with interesting classes
    print("\n--- FIRST 3 SECTIONS IN BODY ---")
    sections = soup.find_all(['section', 'article'])
    if sections:
        for i, s in enumerate(sections[:3]):
            print(f"\n[Section {i+1}] Tag={s.name}, ID={s.get('id')}, Class={s.get('class')}")
            print(s.prettify()[:1200])
            print(f"--- END Section {i+1} ---")
    else:
        # If no sections, find major divs in main content
        content = soup.find(class_='entry-content')
        if content:
            print("--- entry-content ---")
            print(content.prettify()[:2500])
        else:
            print("--- First 3000 chars of body ---")
            print(body.prettify()[:3000])

if __name__ == '__main__':
    extract_hero()
