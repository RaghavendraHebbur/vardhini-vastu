import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def extract_locations():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    div = soup.find(id='locations-directory-section')
    if div:
        content = div.prettify()
        with open("locations_content.html", "w", encoding="utf-8") as out:
            out.write(content)
        print(f"Extracted locations section ({len(content)} bytes) and saved to locations_content.html")
    else:
        print("locations-directory-section not found")

if __name__ == '__main__':
    extract_locations()
