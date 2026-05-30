import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def inspect_styles():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    
    # 1. Look for style tags
    style_tags = soup.find_all('style')
    print(f"Number of <style> tags: {len(style_tags)}")
    for i, tag in enumerate(style_tags):
        content_preview = tag.text.strip()[:150]
        print(f"  Style Tag {i+1} (Length: {len(tag.text)}): {content_preview}...")
        
    # 2. Look for links with "css" in href
    css_links = soup.find_all('link', href=True)
    print(f"\nLinks with href ({len(css_links)}):")
    for link in css_links:
        href = link.get('href')
        rel = link.get('rel')
        if 'css' in href or 'font' in href:
            print(f"  Link: rel={rel}, href={href}")

if __name__ == '__main__':
    inspect_styles()
