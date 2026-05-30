import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def extract_styles():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    style_tags = soup.find_all('style')
    
    # Save tag 8, 9, 10
    indices = [7, 8, 9] # 0-indexed: tag 8 is index 7, tag 9 is index 8, tag 10 is index 9
    for idx in indices:
        if idx < len(style_tags):
            tag = style_tags[idx]
            filename = f"live_style_tag_{idx+1}.css"
            with open(filename, "w", encoding="utf-8") as out:
                out.write(tag.text)
            print(f"Saved Style Tag {idx+1} ({len(tag.text)} bytes) to {filename}")

if __name__ == '__main__':
    extract_styles()
