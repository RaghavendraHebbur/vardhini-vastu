import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def analyze_locations():
    with open("locations_content.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    
    # Let's count link tags
    links = soup.find_all('a')
    print(f"Total links found inside locations section: {len(links)}")
    
    for i, link in enumerate(links[:20]):
        print(f"  Link {i+1}: Text='{link.text.strip()}', Href='{link.get('href')}'")
        
    # Check general markup structure
    # Let's look at the outer container divs and lists
    for child in soup.children:
        if child.name:
            print(f"\nOuter Child tag: {child.name}")
            
    # Print the direct descendants
    container = soup.find('div')
    if container:
        print(f"\nFirst inner div class: {container.get('class', [])}")
        # Print sub divs
        sub_divs = container.find_all('div', recursive=False)
        print(f"Number of direct sub-divs: {len(sub_divs)}")
        for idx, sdiv in enumerate(sub_divs):
            print(f"  Sub-div {idx+1}: Class={sdiv.get('class', [])}, ID={sdiv.get('id')}")
            # Print a snippet of its text
            print(f"    Text snippet: {sdiv.text.strip()[:100].replace('\n', ' ')}...")

if __name__ == '__main__':
    analyze_locations()
