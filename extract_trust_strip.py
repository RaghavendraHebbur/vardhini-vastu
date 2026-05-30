import sys
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

def extract_trust():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, "html.parser")
    trust_div = soup.find(class_='vv-trust')
    if trust_div:
        print("--- TRUST STRIP HTML ---")
        print(trust_div.prettify())
    else:
        print("vv-trust class not found")

if __name__ == '__main__':
    extract_trust()
