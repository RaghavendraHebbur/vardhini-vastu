import re

with open('south-facing-house-vastu.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Create vastu-for-main-door.html
main_door_html = html
main_door_html = re.sub(r'<title>.*?</title>', '<title>Scientific Main Door Vastu | Vardhini Vastu</title>', main_door_html, flags=re.DOTALL)
main_door_html = re.sub(r'content="Debunking south-facing house myths.*?"', 'content="Master main door Vastu for flats and homes. Discover the scientific truth behind entrance Vastu, energy grids, and non-demolition remedies."', main_door_html)
main_door_html = re.sub(r'href="https://vardhinivastu.in/south-facing-house-vastu.html"', 'href="https://vardhinivastu.in/vastu-for-main-door.html"', main_door_html)
main_door_html = re.sub(r'content="South facing house Vastu remedies, is south facing house bad vastu, South main gate Vastu corrections, scientific Vastu south facing door"', 'content="vastu for main door, main door vastu for flats, entrance vastu, scientific main door remedies"', main_door_html)
main_door_html = re.sub(r'content="Scientific South-Facing House Vastu \| Vardhini Vastu"', 'content="Scientific Main Door Vastu | Vardhini Vastu"', main_door_html)

# Schema replacement
main_door_html = re.sub(r'"headline": "South-Facing House Vastu.*?"', '"headline": "Main Door Vastu: Scientific Guidelines for Flats & Homes"', main_door_html)
main_door_html = re.sub(r'"description": "Debunking south-facing house myths.*?"', '"description": "Master main door Vastu for flats and homes. Discover the scientific truth behind entrance Vastu."', main_door_html)
main_door_html = re.sub(r'"@id": "https://vardhinivastu.in/south-facing-house-vastu#article"', '"@id": "https://vardhinivastu.in/vastu-for-main-door#article"', main_door_html)
main_door_html = re.sub(r'"@id": "https://vardhinivastu.in/south-facing-house-vastu/"', '"@id": "https://vardhinivastu.in/vastu-for-main-door/"', main_door_html)
main_door_html = re.sub(r'"@id": "https://vardhinivastu.in/south-facing-house-vastu#faq"', '"@id": "https://vardhinivastu.in/vastu-for-main-door#faq"', main_door_html)

# Content replace
main_door_html = re.sub(r'South-Facing House Vastu: <span class="gradient-text">Unlocking Hidden Wealth Fields</span>', 'Main Door Vastu: <span class="gradient-text">The Gateway to Prosperity</span>', main_door_html)
main_door_html = re.sub(r'Separate fear-based myths from scientific reality. A south-facing entrance can bring immense fame and wealth if aligned correctly.', 'The main door (Simhadwara) is the energetic mouth of your home. Learn how to scientifically align your entrance for flats and independent houses.', main_door_html)
main_door_html = re.sub(r'Debunking the South-Facing House Myth', 'Scientific Principles of Entrance Vastu', main_door_html)
main_door_html = re.sub(r'South Entrance Grid Zones & Results', 'Main Door Energy Grid Analysis', main_door_html)
main_door_html = re.sub(r'Critical South-Facing Layout Defects', 'Common Main Door Layout Defects', main_door_html)
main_door_html = re.sub(r'Afraid of Your South-Facing Home\'s Vastu\?', 'Worried About Your Main Door\'s Energy?', main_door_html)

with open('vastu-for-main-door.html', 'w', encoding='utf-8') as f:
    f.write(main_door_html)

# Create vastu-for-house-plan.html
plan_html = html
plan_html = re.sub(r'<title>.*?</title>', '<title>Vastu for House Plan | Vardhini Vastu</title>', plan_html, flags=re.DOTALL)
plan_html = re.sub(r'content="Debunking south-facing house myths.*?"', 'content="Design the perfect Vastu house plan. Learn scientific Vastu architecture guidelines for home layouts, room placements, and spatial energy mapping."', plan_html)
plan_html = re.sub(r'href="https://vardhinivastu.in/south-facing-house-vastu.html"', 'href="https://vardhinivastu.in/vastu-for-house-plan.html"', plan_html)
plan_html = re.sub(r'content="South facing house Vastu remedies, is south facing house bad vastu, South main gate Vastu corrections, scientific Vastu south facing door"', 'content="vastu for house, home vastu plan, vastu architecture, vastu house map, scientific vastu plan"', plan_html)
plan_html = re.sub(r'content="Scientific South-Facing House Vastu \| Vardhini Vastu"', 'content="Vastu for House Plan | Vardhini Vastu"', plan_html)

plan_html = re.sub(r'"headline": "South-Facing House Vastu.*?"', '"headline": "Vastu for House Plan: Scientific Architecture Guidelines"', plan_html)
plan_html = re.sub(r'"description": "Debunking south-facing house myths.*?"', '"description": "Design the perfect Vastu house plan. Learn scientific Vastu architecture guidelines for home layouts."', plan_html)
plan_html = re.sub(r'"@id": "https://vardhinivastu.in/south-facing-house-vastu#article"', '"@id": "https://vardhinivastu.in/vastu-for-house-plan#article"', plan_html)
plan_html = re.sub(r'"@id": "https://vardhinivastu.in/south-facing-house-vastu/"', '"@id": "https://vardhinivastu.in/vastu-for-house-plan/"', plan_html)
plan_html = re.sub(r'"@id": "https://vardhinivastu.in/south-facing-house-vastu#faq"', '"@id": "https://vardhinivastu.in/vastu-for-house-plan#faq"', plan_html)

plan_html = re.sub(r'South-Facing House Vastu: <span class="gradient-text">Unlocking Hidden Wealth Fields</span>', 'Vastu for House Plan: <span class="gradient-text">Scientific Architecture</span>', plan_html)
plan_html = re.sub(r'Separate fear-based myths from scientific reality. A south-facing entrance can bring immense fame and wealth if aligned correctly.', 'Map your spatial energy correctly before construction. Expert Vastu house plans for optimal health, wealth, and relationships.', plan_html)
plan_html = re.sub(r'Debunking the South-Facing House Myth', 'The Science of Vastu Architecture', plan_html)
plan_html = re.sub(r'South Entrance Grid Zones & Results', 'Optimal Room Layout Zones', plan_html)
plan_html = re.sub(r'Critical South-Facing Layout Defects', 'Critical House Plan Defects to Avoid', plan_html)
plan_html = re.sub(r'Afraid of Your South-Facing Home\'s Vastu\?', 'Planning a New Construction?', plan_html)

with open('vastu-for-house-plan.html', 'w', encoding='utf-8') as f:
    f.write(plan_html)
