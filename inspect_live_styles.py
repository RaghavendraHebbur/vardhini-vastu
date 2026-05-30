import re
from bs4 import BeautifulSoup

def inspect_styles():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    # Find all hex colors
    hex_colors = set(re.findall(r'#[a-fA-F0-9]{3,8}\b', html))
    
    # Find font-families
    fonts = set(re.findall(r'font-family:\s*([^;\}]+)', html))
    
    # Find all images
    soup = BeautifulSoup(html, "html.parser")
    images = [img.get('src') for img in soup.find_all('img') if img.get('src')]
    
    print("--- LIVE SITE STYLES AUDIT ---")
    print(f"\nUnique Colors Found ({len(hex_colors)}):")
    # Clean up and print some notable hex colors
    clean_colors = sorted([c for c in hex_colors if len(c) in [4, 7]])
    for c in clean_colors[:25]:
        print(f"- {c}")
        
    print(f"\nFont Families Found ({len(fonts)}):")
    for font in list(fonts)[:10]:
        print(f"- {font.strip()}")
        
    print(f"\nImages Found ({len(images)}):")
    for img in images[:10]:
        print(f"- {img}")

if __name__ == '__main__':
    inspect_styles()
