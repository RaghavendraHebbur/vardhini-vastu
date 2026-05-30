from bs4 import BeautifulSoup

def inspect():
    with open("site_full.html", "r", encoding="utf-8") as f:
        html = f.read()
    soup = BeautifulSoup(html, "html.parser")
    
    header = soup.find("header")
    footer = soup.find("footer")
    
    print("--- HEADER ---")
    if header:
        print(str(header)[:2000])
        print("... TRUNCATED HEADER ...")
    else:
        print("No header found")
        
    print("\n--- FOOTER ---")
    if footer:
        print(str(footer)[:2000])
        print("... TRUNCATED FOOTER ...")
    else:
        print("No footer found")

if __name__ == "__main__":
    inspect()
