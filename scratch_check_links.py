import os, glob, re
from collections import defaultdict

html_files = glob.glob('**/*.html', recursive=True)
all_html_basenames = [os.path.basename(f) for f in html_files]

broken_links = defaultdict(list)

# Common valid paths that might not be HTML files
valid_paths = ['/', '/feed/', '/comments/feed/', '/contact', '/services', '/vastu-unlocked', '/about']

for filepath in html_files:
    if 'node_modules' in filepath: continue
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Extract all hrefs
    hrefs = re.findall(r'href=[\'\"]?([^\'\" >]+)', content)
    for href in hrefs:
        # Ignore external links, mailto, tel, hashes
        if href.startswith('http') and 'vardhinivastu.in' not in href: continue
        if href.startswith('mailto:') or href.startswith('tel:') or href.startswith('#'): continue
        if href.startswith('//'): continue
        
        # Normalize internal links
        link = href.replace('https://vardhinivastu.in', '')
        if not link: link = '/'
        
        # Strip query params and fragments
        link = link.split('?')[0].split('#')[0]
        
        if not link: continue
        if link.startswith('wp-content/'): continue
        if link.startswith('/wp-content/'): continue
        if link.endswith('.css') or link.endswith('.js') or link.endswith('.png') or link.endswith('.jpg') or link.endswith('.pdf'): continue
        
        # Determine expected local file
        expected_file = ''
        if link == '/': 
            expected_file = 'index.html'
        elif link.endswith('.html'):
            expected_file = link.split('/')[-1]
        else:
            name = link.strip('/')
            if name:
                expected_file = f'{name}.html'
            else:
                expected_file = 'index.html'
                
        if expected_file not in all_html_basenames and expected_file != '':
            broken_links[filepath].append(href)

if broken_links:
    for f, links in broken_links.items():
        print(f'Broken links in {f}:')
        for l in set(links):
            print(f'  - {l}')
else:
    print('No broken internal links found!')
