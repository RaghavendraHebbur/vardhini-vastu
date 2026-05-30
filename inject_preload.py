files = ['site_full.html', 'local-template.html']
for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        if 'rel="preload" href="https://fonts.googleapis.com' not in content:
            content = content.replace(
                '<link rel="preconnect" href="https://fonts.googleapis.com">', 
                '<link rel="preload" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap" as="style">\n  <link rel="preconnect" href="https://fonts.googleapis.com">'
            )
            with open(f, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f'Updated {f} with font preload.')
    except Exception as e:
        print(e)
