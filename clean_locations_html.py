import re

def clean_locations():
    with open("locations_content.html", "r", encoding="utf-8") as f:
        html = f.read()

    # Replace parent div styling
    html = re.sub(
        r'<div id="locations-directory-section"[^>]*>',
        '<div id="locations-directory-section" class="vv-locations-dir">',
        html
    )

    # Replace title styling
    html = re.sub(
        r'<h2 style="font-size: 1\.75rem;[^>]*>',
        '<h2 class="vv-h2">',
        html
    )

    # Replace subtitle styling
    html = re.sub(
        r'<p style="color: #6b7280;[^>]*>',
        '<p class="vv-lead-sm">',
        html
    )

    # Replace sub-header styling
    html = re.sub(
        r'<h3 style="font-size: 1\.35rem;[^>]*>',
        '<h3 class="vv-h3" style="margin-top: 40px; margin-bottom: 12px;">',
        html
    )

    # Replace grid styling
    html = re.sub(
        r'<div style="display: grid;[^>]*>',
        '<div class="vv-locations-grid">',
        html
    )

    # Replace anchor styles and onmouseover/onmouseout inline attributes
    # e.g., <a href="..." onmouseout="..." onmouseover="..." style="...">Text</a>
    # Let's replace the style and event attributes with a clean class
    pattern = r'<a\s+href="([^"]+)"\s+onmouseout="[^"]*"\s+onmouseover="[^"]*"\s+style="[^"]*">'
    html = re.sub(pattern, r'<a href="\1" class="vv-loc-link">', html)

    # Replace the remaining spans in the grids (like "All India — Online")
    html = re.sub(
        r'<span class="vv-area-pill">',
        '<span class="vv-loc-link-span">',
        html
    )
    
    # Just in case there are spans styled in the first grid
    html = re.sub(
        r'<span style="color: #4b5563;[^>]*>',
        '<span class="vv-loc-link-span">',
        html
    )

    with open("clean_locations.html", "w", encoding="utf-8") as f:
        f.write(html)
        
    print("Locations HTML cleaned successfully!")

if __name__ == '__main__':
    clean_locations()
