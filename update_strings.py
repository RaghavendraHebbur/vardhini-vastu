import glob
import re

files = glob.glob('*.html')
updated_count = 0

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Experience
    # We want everything to be 10+ years
    new_content = re.sub(r'18\+\s+[yY]ears', '10+ years', content)
    new_content = re.sub(r'10\+\s+[Yy]ears', '10+ years', new_content)
    
    # 2. Reviews/Consultations
    # Find anything like "620+ verified 5-star reviews" or "248 reviews" or "620+ homes rectified"
    new_content = re.sub(r'620\+\s+verified\s+5-star\s+reviews', '3,200+ consultations and 620+ houses remedied', new_content, flags=re.IGNORECASE)
    new_content = re.sub(r'620\+\s+homes\s+rectified', '620+ houses remedied', new_content, flags=re.IGNORECASE)
    new_content = re.sub(r'248\s+reviews', '3,200+ consultations and 620+ houses remedied', new_content, flags=re.IGNORECASE)

    # Note: the user said "3200 consultations and 620+ house remedised".
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        updated_count += 1
        print(f"Updated: {f}")

print(f"Total files updated: {updated_count}")
