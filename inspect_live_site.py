import re
from bs4 import BeautifulSoup

def inspect():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    
    print("--- LIVE SITE INSPECTION ---")
    
    # 1. Stylesheets
    stylesheets = [link.get('href') for link in soup.find_all('link', rel='stylesheet')]
    print(f"\nStylesheets ({len(stylesheets)}):")
    for sheet in stylesheets[:10]:
        print(f"- {sheet}")
        
    # 2. Main classes in body or outer elements
    body = soup.find('body')
    if body:
        print(f"\nBody classes: {body.get('class', [])}")
        
    # 3. Main layout sections detected
    sections = soup.find_all(['section', 'div', 'header', 'footer'])
    print(f"\nTotal structural divs/sections: {len(sections)}")
    
    # Find any Elementor, Gutenberg, or Astra container classes
    html_str = str(html)
    frameworks = []
    if "elementor" in html_str: frameworks.append("Elementor")
    if "wp-block" in html_str: frameworks.append("Gutenberg Blocks")
    if "astra" in html_str: frameworks.append("Astra Theme")
    if "divi" in html_str: frameworks.append("Divi")
    if "generatepress" in html_str: frameworks.append("GeneratePress")
    
    print(f"Detected Frameworks/Themes: {', '.join(frameworks)}")
    
    # Let's inspect the text of the first H1 and H2
    h1s = soup.find_all('h1')
    h2s = soup.find_all('h2')
    print("\nLive Headings:")
    print(f"H1 ({len(h1s)}): {[h.text.strip() for h in h1s]}")
    print(f"H2 ({len(h2s)}): {[h.text.strip()[:100] for h in h2s[:5]]}")

if __name__ == '__main__':
    inspect()
