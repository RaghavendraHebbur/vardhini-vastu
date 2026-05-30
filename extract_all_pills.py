import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def extract_pills():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    pills = soup.find_all(class_='vv-area-pill')
    print(f"Total area pills found: {len(pills)}")
    for i, pill in enumerate(pills):
        href = pill.get('href', '#')
        print(f"  Pill {i+1}: Text='{pill.text.strip()}', Href='{href}'")

if __name__ == '__main__':
    extract_pills()
