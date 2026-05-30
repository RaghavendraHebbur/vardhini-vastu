<?php
/**
 * Plugin Name: VV GEO Blocks
 * Description: Auto-inject FAQPage+Speakable schema on all vv-raw-html pages
 * Version: 1.0
 */
if (!defined('ABSPATH')) exit;

// Injection is handled directly in vv-blank.php via vv_geo_block() call.
// This file provides the block-generation functions only.

function vv_geo_block($file, $slug) {
    $cats = ['cities-india','house-directions','life-areas','residential-rooms',
             'apartment-vastu','localities-bangalore','commercial-vastu',
             'industrial-vastu','international','educational-hub',
             'corner-defects','vastu-objects'];
    $cat = '';
    foreach ($cats as $c) {
        if (strpos($file, $c) !== false) { $cat = $c; break; }
    }
    if (!$cat) $cat = 'educational-hub'; // fallback for root-level pages
    $data = vv_geo_qa($cat, $slug);
    if (!$data) return '';
    return vv_geo_render($data, $slug);
}

function vv_geo_render($d, $slug) {
    $id = 'vv-' . esc_attr($slug) . '-geo';
    $css = '.vv-geo-section{background:#f9f6f0;padding:48px 20px;border-top:3px solid #C9A84C;font-family:Georgia,serif}'
         . '.vv-geo-section .vv-wrap{max-width:860px;margin:0 auto}'
         . '.vv-geo-label{display:inline-block;background:#1a3c2e;color:#C9A84C;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:2px;margin-bottom:16px}'
         . '.vv-geo-section h2{font-size:1.6rem;color:#1a3c2e;margin:0 0 8px}'
         . '.vv-geo-intro{color:#555;margin-bottom:32px;font-size:1rem}'
         . '.vv-qa-item{border-bottom:1px solid #e0d8cc;padding:20px 0}'
         . '.vv-qa-item:last-child{border-bottom:none}'
         . '.vv-qa-item h3{font-size:1.05rem;color:#1a3c2e;margin:0 0 8px}'
         . '.vv-qa-item p{color:#444;margin:0;line-height:1.7}'
         . '.vv-speakable-box{background:#1a3c2e;color:#f9f6f0;border-left:4px solid #C9A84C;padding:20px 24px;margin-top:32px;border-radius:4px}'
         . '.vv-speakable-box p{margin:0;font-size:.95rem;line-height:1.7}';
    $h  = "<section class=\"vv-geo-section\" id=\"{$id}\" itemscope itemtype=\"https://schema.org/FAQPage\">";
    $h .= "<style>{$css}</style><div class=\"vv-wrap\">";
    $h .= "<div class=\"vv-geo-label\">Direct Answers</div>";
    $h .= "<h2>" . esc_html($d['h2']) . "</h2>";
    $h .= "<p class=\"vv-geo-intro\">" . esc_html($d['intro']) . "</p>";
    $h .= "<div class=\"vv-qa-list\">";
    foreach ($d['qa'] as $qa) {
        $h .= "<div class=\"vv-qa-item\" itemprop=\"mainEntity\" itemscope itemtype=\"https://schema.org/Question\">";
        $h .= "<h3 itemprop=\"name\">" . esc_html($qa[0]) . "</h3>";
        $h .= "<div itemprop=\"acceptedAnswer\" itemscope itemtype=\"https://schema.org/Answer\">";
        $h .= "<p itemprop=\"text\">" . esc_html($qa[1]) . "</p></div></div>";
    }
    $h .= "</div><div class=\"vv-speakable-box\" id=\"{$id}-summary\">";
    $h .= "<p>" . esc_html($d['speakable']) . "</p>";
    $h .= "</div></div></section>";
    return $h;
}

function vv_geo_qa($cat, $slug) {
    switch ($cat) {
        case 'cities-india':       return vv_geo_cities($slug);
        case 'house-directions':   return vv_geo_directions($slug);
        case 'life-areas':         return vv_geo_life_areas($slug);
        case 'residential-rooms':  return vv_geo_rooms($slug);
        case 'apartment-vastu':    return vv_geo_apartments($slug);
        case 'localities-bangalore': return vv_geo_localities($slug);
        case 'commercial-vastu':   return vv_geo_commercial($slug);
        case 'industrial-vastu':   return vv_geo_industrial($slug);
        case 'international':      return vv_geo_international($slug);
        case 'educational-hub':    return vv_geo_educational($slug);
        case 'corner-defects':     return vv_geo_corners($slug);
        case 'vastu-objects':      return vv_geo_objects($slug);
        default: return null;
    }
}

/* ── CITIES ─────────────────────────────────────────────────────────── */
function vv_geo_cities($slug) {
    $city = ucwords(str_replace(['-'], [' '], str_replace('vastu-consultant-', '', $slug)));
    return [
        'h2'  => "Vastu Consultant in {$city} — Frequently Asked Questions",
        'intro' => "Quick answers about Vardhini Vastu's online consultation service for {$city} homes and offices.",
        'qa'  => [
            ["Can I get a Vastu consultation for my {$city} property online?",
             "Yes. Vardhini Vastu serves {$city} clients entirely online through the VIDS™ 16-zone remote analysis system. You submit your floor plan and property geo-coordinates; we deliver a complete zone-by-zone vastu report with zero-demolition corrections within 48–72 hours — no site visit required."],
            ["What does a Vastu consultation for a {$city} property cost?",
             "Fees are fixed per property type and quoted after reviewing your floor plan. A 2BHK residential analysis differs from a commercial office audit. Contact Vardhini Vastu on WhatsApp (+91 97391 05574) for a same-day written estimate."],
            ["What are the most common Vastu defects in {$city} apartments?",
             "In high-density {$city} housing, the three most frequent defects are: toilets or kitchens in the North-East zone contaminating the Ishanya energy field, main doors in inauspicious padas due to builder floor plans, and cut or extended corners reducing the effective energy zone. All three are correctable without structural changes."],
            ["Does Vastu work for rented homes in {$city}?",
             "Yes. All vastu corrections for rented properties use zero-demolition remedies — yantra placement, elemental strips, colour corrections, and Virtual Gate Opening techniques. None require structural changes or landlord permission, making them fully applicable to rented flats and offices in {$city}."],
            ["How long does the online Vastu consultation process take for {$city} clients?",
             "The complete VIDS™ online process — from floor plan submission to final correction report — takes 48–72 working hours. An urgent 24-hour turnaround is available. All {$city} clients receive a follow-up video call to walk through corrections and implementation sequence."],
        ],
        'speakable' => "Vardhini Vastu provides online Vastu consultations for {$city} properties using the VIDS™ 16-zone degree-accurate system. Full reports with zero-demolition corrections are delivered within 48 hours of receiving your floor plan. Contact Raghavendra Hebbur: +91 97391 05574.",
    ];
}

/* ── HOUSE DIRECTIONS ───────────────────────────────────────────────── */
function vv_geo_directions($slug) {
    $map = [
        'north-facing-house-vastu'      => ['North-Facing',    'auspicious — ideal for financial growth; ruled by Kuber',      'south-east', '3rd–5th pada from left on the north wall'],
        'south-facing-house-vastu'      => ['South-Facing',    'auspicious when the door is in the 4th pada (Grihakshat)',     'south-east', '4th pada from left — the Grihakshat pada'],
        'east-facing-house-vastu'       => ['East-Facing',     'highly auspicious — excellent for career and health; ruled by Indra', 'south-east', '4th–5th pada from left on the east wall'],
        'west-facing-house-vastu'       => ['West-Facing',     'neutral to good — suitable for business and creative work',    'south-east', '5th–6th pada from left on the west wall'],
        'north-east-facing-house-vastu' => ['North-East-Facing','spiritually powerful — excellent for clarity and learning',   'south-east', 'NNE or ENE sub-zones; avoid the exact NE corner'],
        'north-west-facing-house-vastu' => ['North-West-Facing','acceptable — promotes social activity and networking',        'south-east', '5th–6th pada on the north-west wall'],
        'south-east-facing-house-vastu' => ['South-East-Facing','challenging — requires careful room planning and SE remedies','south-east', '2nd–3rd pada; avoid the exact SE corner'],
        'south-west-facing-house-vastu' => ['South-West-Facing','most challenging — requires strict SW strengthening first',   'south-east', 'SSW sub-zone only, after full SW remedies'],
        'vastu-for-flat-apartment'      => ['Apartment',       'determined by unit placement, floor level, and layout',       'south-east corner of the unit', 'the unit door pada within the apartment floor plan'],
        'vastu-house-plan'              => ['House Plan',      'defined by entrance pada and internal room placements',       'south-east of the plot', 'the main entrance wall pada selection'],
    ];
    $d = isset($map[$slug]) ? $map[$slug] : ['House', 'suitable when room placements follow vastu principles', 'south-east', 'the appropriate pada on the entrance wall'];
    list($label, $verdict, $kitchen, $door) = $d;
    return [
        'h2'   => "{$label} House Vastu — Key Questions Answered",
        'intro' => "Practical answers about Vastu Shastra for {$label} houses, based on the VIDS™ 16-zone degree-accurate analysis system.",
        'qa'   => [
            ["Is a {$label} house good as per Vastu Shastra?",
             "A {$label} house is {$verdict}. Actual auspiciousness depends on the main door pada placement, internal room assignments, and whether key zones (North-East, South-West, South-East) are correctly used — not the facing direction alone."],
            ["Where should the main entrance door be in a {$label} house?",
             "In a {$label} house, the ideal door position is {$door}. The VIDS™ system divides each wall into 22.5-degree sub-zones; placing the door in the correct sub-zone matters far more than the facing direction itself."],
            ["What is the ideal kitchen direction for a {$label} house?",
             "Regardless of house direction, the kitchen should always be in the {$kitchen} zone — the Agni zone governing fire and cooking. The cook should face East. This principle is universal and does not change with the house facing."],
            ["What are the most common Vastu defects in {$label} houses?",
             "The three most common defects are: (1) incorrectly placed main door pada, (2) master bedroom in North-East instead of South-West, and (3) toilet or kitchen in the North-East zone. The VIDS™ 16-zone analysis identifies all active defects and provides a prioritised zero-demolition correction plan."],
            ["Can Vastu defects in a {$label} house be corrected without demolition?",
             "Yes. The VIDS™ zero-demolition system corrects virtually all {$label} house defects using yantra, pyramid grids, elemental strips, Virtual Gate Opening for inauspicious door padas, and colour zone therapy. No structural changes required."],
        ],
        'speakable' => "A {$label} house is {$verdict} as per Vastu Shastra. Key factors: main door pada, kitchen in south-east, master bedroom in south-west. Vardhini Vastu's VIDS™ 16-zone system provides zero-demolition corrections online within 48 hours. Contact: +91 97391 05574.",
    ];
}

/* ── LIFE AREAS ─────────────────────────────────────────────────────── */
function vv_geo_life_areas($slug) {
    $map = [
        'vastu-for-wealth'       => ['Wealth',      'North and North-East (Kuber zone)',    'South-West', 'financial growth and prosperity'],
        'vastu-for-health'       => ['Health',      'East and North-East',                  'South-West', 'physical wellbeing and vitality'],
        'vastu-for-marriage'     => ['Marriage',    'North-West (Vayavya zone)',             'South-West', 'relationship harmony and marital stability'],
        'vastu-for-career'       => ['Career',      'North (Kuber/opportunity zone)',        'South-West', 'professional success and recognition'],
        'vastu-for-children'     => ['Children',    'West zone (Varuna — children\'s zone)', 'South-West', 'children\'s wellbeing and development'],
        'vastu-for-students'     => ['Students',    'North-East (Ishanya — wisdom zone)',    'South-West', 'academic focus and memory retention'],
        'vastu-for-sleep'        => ['Sleep',       'South-West (stability zone)',           'South-West', 'restful sleep and energy restoration'],
        'vastu-for-pregnancy'    => ['Pregnancy',   'South-West and North-East',             'South-West', 'safe pregnancy and maternal health'],
        'vastu-for-new-home'     => ['New Home',    'East zone (solar energy)',              'South-West', 'auspicious new beginnings'],
        'vastu-for-rented-house' => ['Rented House','North and East zones',                 'South-West', 'positive energy without structural changes'],
    ];
    $d = isset($map[$slug]) ? $map[$slug] : [ucwords(str_replace(['vastu-for-','-'],['',''],$slug)), 'North and East zones', 'South-West', 'overall wellbeing'];
    list($area, $zone, $anchor, $benefit) = $d;
    return [
        'h2'   => "Vastu for {$area} — Direct Answers",
        'intro' => "How Vastu Shastra addresses {$area} through directional zone activation and zero-demolition corrections.",
        'qa'   => [
            ["Which Vastu zone governs {$area}?",
             "The primary zone governing {$area} is {$zone}. Activating this zone — keeping it free of defects and clutter — is the first priority in a vastu audit focused on {$benefit}. The {$anchor} zone anchors long-term stability and retention of gains."],
            ["Can Vastu genuinely improve {$area}?",
             "Vastu aligns built environments with directional energy flows that influence occupants' mental, physical, and material states. Clients who implement the full VIDS™ correction plan for {$area} report measurable changes within 90–180 days, with the most significant shifts in the first 30 days."],
            ["What are the most serious Vastu defects that harm {$area}?",
             "The three most damaging defects for {$area}: (1) toilet or heavy storage in {$zone}, (2) a cut or extended corner in {$anchor} undermining stability, and (3) main door in an inauspicious pada blocking energy flow. The VIDS™ 16-zone analysis identifies all active defects across all compass zones."],
            ["Can Vastu for {$area} be applied in a rented flat without structural changes?",
             "Yes. All VIDS™ corrections are zero-demolition and reversible: yantra placement, elemental energy strips, Virtual Gate Opening, crystal grid activations, and colour zone therapy. Fully applicable to rented properties — no landlord permission needed."],
            ["How quickly does Vastu for {$area} show results?",
             "Initial shifts — improved sleep, clarity, or reduced conflict — are typically noticed within 14–30 days. Concrete improvements in {$benefit} manifest over 90–180 days. A phased implementation plan with clear milestones is provided with every VIDS™ consultation."],
        ],
        'speakable' => "Vastu for {$area} centres on activating {$zone} and anchoring {$anchor}. Vardhini Vastu's VIDS™ online consultation identifies all defects and provides zero-demolition corrections, delivering measurable improvements in {$benefit} within 90–180 days. Contact: +91 97391 05574.",
    ];
}

/* ── RESIDENTIAL ROOMS ──────────────────────────────────────────────── */
function vv_geo_rooms($slug) {
    $map = [
        'vastu-for-bedroom'     => ['Bedroom',      'South-West',           'sleeping direction (head towards South or East)'],
        'vastu-for-kitchen'     => ['Kitchen',      'South-East',           'stove placement; cook facing East'],
        'vastu-for-bathroom'    => ['Bathroom',     'East or North-West',   'toilet pot facing North–South axis'],
        'vastu-for-living-room' => ['Living Room',  'North or East',        'sofa against South or West wall; TV on South-East'],
        'vastu-for-study-room'  => ['Study Room',   'North-East or East',   'study desk facing North or East'],
        'vastu-for-puja-room'   => ['Puja Room',    'North-East',           'deity facing East or West; worshipper facing East'],
        'vastu-for-basement'    => ['Basement',     'North or East',        'basement in North or East only — never South or West'],
        'vastu-for-balcony'     => ['Balcony',      'North or East',        'open extension in North or East — never South-West'],
        'vastu-for-car-parking' => ['Car Parking',  'South-East or North-West', 'parking in SE or NW — never NE or SW'],
        'vastu-for-staircase'   => ['Staircase',    'South or West',        'stairs in South or South-West; clockwise ascent'],
        'vastu-for-dining-room' => ['Dining Room',  'West or East',         'table in West zone; head of family facing East'],
        'vastu-for-pooja-room'  => ['Puja Room',    'North-East',           'deity facing East or West; worshipper facing East'],
        'vastu-for-garage'      => ['Garage',       'South-East or North-West', 'never blocking North-East'],
    ];
    $d = isset($map[$slug]) ? $map[$slug] : [ucwords(str_replace(['vastu-for-','-'],['',''],$slug)), 'the appropriate directional zone', 'correct placement and orientation'];
    list($label, $zone, $key) = $d;
    return [
        'h2'   => "Vastu for {$label} — Questions Answered",
        'intro' => "Directional placement, orientation rules, and zero-demolition corrections for the {$label} as per Vastu Shastra.",
        'qa'   => [
            ["What is the ideal Vastu direction for the {$label}?",
             "The {$label} is ideally placed in the {$zone} of the home. The most important factor within the space is {$key} — this single element determines 60–70% of the vastu outcome for this room."],
            ["What happens if the {$label} is in the wrong Vastu direction?",
             "A {$label} in an incompatible zone creates imbalances affecting health, sleep, productivity, or finances — depending on which zone is occupied. The VIDS™ 16-zone analysis identifies the specific defect and its effect with precision."],
            ["Can a wrongly placed {$label} be corrected without demolition?",
             "In most cases, yes. VIDS™ zero-demolition corrections for {$label} defects include yantra placement, Virtual Gate Opening, elemental energy strips, and colour zone therapy. Structural relocation is recommended in fewer than 10% of cases."],
            ["What colours are best for the {$label} as per Vastu?",
             "Colour selection for the {$label} is governed by the directional zone it occupies and its five-element balance. Vardhini Vastu provides an exact colour prescription — wall, ceiling, and accent — as part of every VIDS™ consultation report."],
            ["Does {$label} Vastu apply to apartments and flats?",
             "Yes. {$label} Vastu principles apply identically to apartments — directional zones within a flat unit function independently of the larger building. The VIDS™ analysis maps your specific unit layout to give unit-level, not building-level, recommendations."],
        ],
        'speakable' => "The {$label} should be placed in the {$zone} for optimal Vastu alignment. The critical factor is {$key}. Vardhini Vastu's VIDS™ system provides precise {$label} Vastu analysis for houses and apartments with zero-demolition corrections delivered within 48 hours. Contact: +91 97391 05574.",
    ];
}

/* ── APARTMENTS ─────────────────────────────────────────────────────── */
function vv_geo_apartments($slug) {
    $label = ucwords(str_replace('-', ' ', str_replace('vastu-', '', $slug)));
    return [
        'h2'   => "Vastu for {$label} — Key Questions",
        'intro' => "Vastu analysis for apartment projects: common defects, correction methods, and what to check before buying or moving in.",
        'qa'   => [
            ["Can Vastu be assessed for a specific apartment project like {$label}?",
             "Yes. Vardhini Vastu analyses individual flat units within any apartment project. The VIDS™ 16-zone system maps your specific unit's floor plan, entrance pada, and internal room placements — not just the building orientation — for unit-level accuracy."],
            ["What are the most common Vastu defects in high-rise apartments?",
             "The three most frequent defects in apartment units: (1) toilets or kitchens in the North-East zone, (2) main unit door in an inauspicious pada due to builder corridor design, and (3) balcony in South-West creating an open SW corner. All three are correctable without structural changes."],
            ["Should I check Vastu before buying a flat in {$label}?",
             "Yes — a pre-purchase Vastu assessment prevents inheriting costly defects. Vardhini Vastu offers a pre-purchase analysis using the developer's floor plan within 24 hours. We identify both correctable and non-correctable defects before you commit."],
            ["Can Vastu corrections be done in a rented flat?",
             "All VIDS™ corrections are zero-demolition and reversible — yantra placements, elemental strips, colour corrections, and Virtual Gate Opening. No structural changes or landlord permission required."],
            ["How is apartment Vastu different from independent house Vastu?",
             "Apartment analysis factors in: individual unit directional zones, floor level energy, unit position within the floor (corner, centre, end), and the building's overall orientation. The VIDS™ system accounts for all these in a single integrated analysis."],
        ],
        'speakable' => "Vardhini Vastu provides unit-level Vastu analysis for apartments including pre-purchase assessments and post-possession corrections. VIDS™ 16-zone reports with zero-demolition corrections delivered within 48 hours. Contact: +91 97391 05574.",
    ];
}

/* ── LOCALITIES BANGALORE ───────────────────────────────────────────── */
function vv_geo_localities($slug) {
    $locality = ucwords(str_replace('-', ' ', str_replace('vastu-consultant-', '', $slug)));
    return [
        'h2'   => "Vastu Consultant in {$locality}, Bangalore — Questions Answered",
        'intro' => "Online Vastu consultation services for homes and offices in {$locality}, Bangalore.",
        'qa'   => [
            ["Is there a Vastu consultant in {$locality}, Bangalore?",
             "Vardhini Vastu serves {$locality} clients through a fully online VIDS™ consultation system. You submit your floor plan and geo-coordinates; Raghavendra Hebbur delivers a complete 16-zone vastu report with zero-demolition corrections within 48–72 hours — no in-person visit required."],
            ["What types of properties in {$locality} does Vardhini Vastu analyse?",
             "All property types in {$locality}: independent houses, apartment flats, builder floors, commercial offices, retail shops, restaurants, and industrial units. Both new and occupied properties can be assessed — pre-possession and post-possession consultations are available."],
            ["How much does a Vastu consultation cost in {$locality}?",
             "Fees are fixed per property type and quoted in writing after reviewing your floor plan. No hidden charges. Contact Vardhini Vastu on WhatsApp (+91 97391 05574) for a same-day quote for your {$locality} property."],
            ["What are the most common Vastu issues in {$locality} homes?",
             "The most frequent vastu defects in Bangalore residential properties — including {$locality} — are: toilets or kitchens in the North-East zone, main door in an inauspicious pada, and master bedroom in the North-East instead of South-West. All correctable using VIDS™ zero-demolition remedies."],
            ["Can the {$locality} Vastu consultation be done without a home visit?",
             "Yes. You share a floor plan (hand-drawn or digital) and GPS coordinates of the main entrance. The full VIDS™ 16-zone analysis — all defects and corrections — is delivered as a written report with diagram within 48–72 hours. No site visit needed."],
        ],
        'speakable' => "Vardhini Vastu provides online Vastu consultations for {$locality}, Bangalore using the VIDS™ 16-zone system. Full reports with zero-demolition corrections are delivered within 48–72 hours. Services cover homes, offices, and commercial spaces. Contact: +91 97391 05574.",
    ];
}

/* ── COMMERCIAL ─────────────────────────────────────────────────────── */
function vv_geo_commercial($slug) {
    $label = ucwords(str_replace(['-','vastu-for-','vastu-'],[' ','',''],$slug)) ?: 'Commercial Space';
    return [
        'h2'   => "Commercial Vastu — Direct Answers",
        'intro' => "Vastu Shastra for offices, shops, showrooms, and business premises — maximising productivity and profitability.",
        'qa'   => [
            ["Is Vastu important for commercial and office spaces?",
             "Yes. Commercial vastu directly affects employee productivity, client flow, and business decisions. The most critical factors are: the main entrance pada (controls incoming opportunities), the owner's seating direction (North or East for decision-makers), and cash/safe placement in the North and South-West zones."],
            ["Which direction should a business owner face while working?",
             "The owner or senior decision-maker should face North or East at their desk. North aligns with Kuber energy supporting financial decisions. East aligns with solar energy promoting clarity and authority. South-facing seating creates confrontational energy and is consistently avoided in commercial vastu."],
            ["Where should the cash counter or billing desk be placed?",
             "The cash counter should be in the North zone with the cashier facing North or East. The safe should be in South or South-West with the door opening North — Kuber's direction. This creates directional flow where money arrives from the North and is retained in the SW."],
            ["What are the most critical Vastu defects in an office or commercial space?",
             "Three most damaging commercial defects: (1) main entrance in an inauspicious pada blocking opportunity flow, (2) owner facing South or West, (3) toilet or pantry in the North-East — directly contaminating the prosperity channel. All three have zero-demolition corrections."],
            ["Can commercial Vastu be corrected without renovation?",
             "Yes. VIDS™ commercial corrections use yantra placement, energy grids, desk/seating repositioning, and colour zone therapy — none requiring civil work. A complete correction plan is delivered within 48 hours of receiving your office floor plan."],
        ],
        'speakable' => "Commercial Vastu from Vardhini Vastu covers offices, shops, and showrooms. Key factors: main entrance pada, owner facing North or East, cash in North, safe in South-West. VIDS™ online consultation delivers zero-demolition corrections within 48 hours. Contact: +91 97391 05574.",
    ];
}

/* ── INDUSTRIAL ─────────────────────────────────────────────────────── */
function vv_geo_industrial($slug) {
    $label = ucwords(str_replace(['-','vastu-for-','vastu-'],[' ','',''],$slug)) ?: 'Industrial Unit';
    return [
        'h2'   => "Industrial Vastu — Frequently Asked Questions",
        'intro' => "Vastu Shastra for factories, warehouses, and manufacturing units — optimising production flow, worker safety, and business growth.",
        'qa'   => [
            ["Does Vastu apply to factories and industrial units?",
             "Yes. Industrial vastu governs production efficiency, worker wellbeing, machine performance, and management decision quality. Key zones: North-East for planning and clarity, South-East for production and fire processes, North-West for despatch and logistics, South-West for the owner's cabin and heavy machinery."],
            ["Where should heavy machinery be placed in a factory?",
             "Heavy machinery, boilers, and generators belong in South, South-West, or West zones. The South-West is the Earth zone bearing maximum weight. The North-East must always remain light and open — placing heavy machines there suppresses business growth and causes machinery breakdowns."],
            ["Which direction should the factory entrance face?",
             "North, East, or North-East are most auspicious for industrial premises. The specific pada within the chosen wall determines quality of incoming business. East or North entrances activate the prosperity and opportunity channels most effectively for manufacturing units."],
            ["What are the most common Vastu defects in industrial units?",
             "Frequent industrial defects: heavy machinery in North-East, owner's cabin in North-East or East (instead of South-West), production zone in North blocking the Kuber channel, and main gate in inauspicious padas. Each creates specific, identifiable business problems the VIDS™ analysis maps precisely."],
            ["Can industrial Vastu be corrected without shutting down production?",
             "Yes. VIDS™ industrial corrections are phased to minimise operational disruption — yantra and energy grid placements, machine repositioning during scheduled maintenance windows, and zone restructuring using elemental strips. A correction sequence that avoids production downtime is provided."],
        ],
        'speakable' => "Industrial Vastu from Vardhini Vastu: heavy machinery in South-West, management cabin in South-West, North-East light and open, production in South-East. VIDS™ online consultation with zero-demolition corrections within 48 hours. Contact: +91 97391 05574.",
    ];
}

/* ── INTERNATIONAL ──────────────────────────────────────────────────── */
function vv_geo_international($slug) {
    $map = [
        'vastu-consultant-usa'       => ['USA',           'North America'],
        'vastu-consultant-uk'        => ['United Kingdom','Europe'],
        'vastu-consultant-dubai'     => ['Dubai, UAE',    'the Middle East'],
        'vastu-consultant-singapore' => ['Singapore',     'South-East Asia'],
        'vastu-consultant-canada'    => ['Canada',        'North America'],
        'vastu-consultant-australia' => ['Australia',     'the Southern Hemisphere'],
        'vastu-consultant-germany'   => ['Germany',       'Central Europe'],
        'vastu-consultant-new-zealand'=> ['New Zealand',  'the Southern Hemisphere'],
    ];
    $d = isset($map[$slug]) ? $map[$slug] : [ucwords(str_replace(['-','vastu-consultant-'],[' ',''],$slug)), 'the region'];
    list($country, $region) = $d;
    return [
        'h2'   => "Vastu Consultant for {$country} — Questions Answered",
        'intro' => "Online Vastu consultations for Indian diaspora and international clients in {$country}, delivered using the VIDS™ 16-zone system.",
        'qa'   => [
            ["Can Vastu be applied to properties in {$country}?",
             "Yes. Vastu Shastra is a compass-based system that applies universally regardless of geography. Properties in {$country} are analysed using the same VIDS™ 16-zone degree-accurate system as India-based properties — with geo-coordinate calibration for {$region} to ensure accurate magnetic North alignment."],
            ["How does Vardhini Vastu serve clients in {$country}?",
             "All consultations for {$country} clients are fully online. You submit your floor plan and GPS coordinates; the VIDS™ analysis and zero-demolition correction report is delivered within 48–72 hours via email, with a follow-up video call across any time zone."],
            ["Are Vastu principles different for {$country} properties?",
             "Core directional principles are universal. For {$country}, geo-coordinate calibration accounts for magnetic declination and local energy patterns. Correction remedies (yantra, elemental strips, Virtual Gate Opening) are identical to those prescribed for India-based properties."],
            ["What are common Vastu concerns for Indian families living in {$country}?",
             "Common concerns from {$country} diaspora: energy imbalance in open-plan Western layouts, incorrect kitchen placement in modular kitchens fixed by the builder, and cultural adaptation of puja spaces. The VIDS™ system addresses all of these within the local floor plan context."],
            ["What is the cost of a Vastu consultation for a property in {$country}?",
             "International consultation fees are fixed and quoted in INR or USD. The full VIDS™ consultation — report, correction plan, and follow-up call — is available for all property types in {$country}. Contact via WhatsApp (+91 97391 05574) for a written quote."],
        ],
        'speakable' => "Vardhini Vastu provides online Vastu consultations for properties in {$country} using the VIDS™ geo-calibrated 16-zone system. Reports with zero-demolition corrections delivered within 48–72 hours anywhere in {$region}. Contact: +91 97391 05574.",
    ];
}

/* ── EDUCATIONAL HUB ────────────────────────────────────────────────── */
function vv_geo_educational($slug) {
    $label = ucwords(str_replace(['-','vastu-for-','vastu-'],[' ','',''],$slug)) ?: 'Educational Institution';
    return [
        'h2'   => "Vastu for Educational Institutions — Key Questions",
        'intro' => "Vastu Shastra for schools, colleges, libraries, and coaching centres — creating environments that support learning and academic achievement.",
        'qa'   => [
            ["Is Vastu important for schools and educational institutions?",
             "Yes. Educational vastu focuses on three primary zones: North-East (Ishanya — wisdom and learning), East (solar energy — mental clarity and retention), and North (Kuber — opportunities and recognition). When correctly activated in a school or college, students experience improved focus, better memory retention, and higher exam performance."],
            ["Which direction should classrooms face in a school?",
             "Classrooms should ideally be in the East or North zone of the building, with students facing East or North. The teacher should face East — aligned with solar energy promoting authority and clarity of instruction. North-East classrooms are ideal for higher learning and research."],
            ["Where should the principal's office be in a school?",
             "The principal or institution director should have their office in the South-West zone — the Nairitya zone governing authority, stability, and decision-making. The director should face North or East from their desk. This placement strengthens institutional authority."],
            ["What Vastu zones affect student performance and exam results?",
             "North-East (wisdom and clarity), East (memory retention and solar vitality), and West (analytical skill and structured thinking) are the three zones most directly linked to academic performance. The VIDS™ educational vastu analysis maps all three zones and provides a prioritised correction plan."],
            ["Can Vastu for an educational building be corrected without renovation?",
             "Yes. VIDS™ corrections for educational institutions use yantra placements, elemental energy grids, Virtual Gate Opening, and furniture repositioning — none requiring civil work. Corrections are phased to avoid disrupting academic schedules."],
        ],
        'speakable' => "Educational Vastu from Vardhini Vastu: North-East for wisdom, East for clarity, principal's office in South-West, classrooms facing East or North. VIDS™ online consultations available for schools, colleges, and coaching centres. Contact: +91 97391 05574.",
    ];
}

/* ── CORNER DEFECTS ─────────────────────────────────────────────────── */
function vv_geo_corners($slug) {
    $map = [
        'south-west-cut'       => ['South-West Cut',       'the Nairitya stability zone',  'instability, financial losses, health issues for the breadwinner'],
        'north-east-cut'       => ['North-East Cut',       'the Ishanya wisdom zone',       'blocked opportunities, mental confusion, learning difficulties'],
        'north-west-cut'       => ['North-West Cut',       'the Vayavya social zone',       'relationship issues, lack of support, social difficulties'],
        'south-east-cut'       => ['South-East Cut',       'the Agni production zone',      'financial instability, digestive issues, conflicts at home'],
        'south-west-extension' => ['South-West Extension', 'the Nairitya zone',             'dominance issues, over-possessiveness, aggression'],
        'north-east-extension' => ['North-East Extension', 'the Ishanya zone',              'generally auspicious — amplifies wisdom and spiritual energy'],
        'irregular-plot'       => ['Irregular Plot',       'multiple directional zones',    'complex energy imbalances requiring full VIDS™ mapping'],
        'l-shaped-house'       => ['L-Shaped House',       'the missing corner zone',       'defects specific to whichever corner is missing'],
        't-shaped-plot'        => ['T-Shaped Plot',        'multiple directional zones',    'road-facing energy imbalances requiring specific remedies'],
    ];
    $d = isset($map[$slug]) ? $map[$slug] : [ucwords(str_replace('-',' ',$slug)), 'the affected directional zone', 'energy imbalances affecting occupants'];
    list($label, $zone, $effect) = $d;
    return [
        'h2'   => "{$label} Vastu — Questions Answered",
        'intro' => "How Vastu Shastra addresses {$label} defects, their effects on occupants, and zero-demolition correction methods.",
        'qa'   => [
            ["What does a {$label} mean in Vastu Shastra?",
             "A {$label} refers to an irregular or missing portion in {$zone}. Vastu requires complete rectangular or square plots. Any deviation creates an energy imbalance that affects occupants by causing {$effect}."],
            ["How serious is a {$label} defect?",
             "A {$label} is among the more significant vastu defects because it directly affects {$zone}. Severity depends on the proportion of the cut and the specific 22.5-degree sub-zone affected — both identified precisely in the VIDS™ analysis."],
            ["Can a {$label} be corrected without demolition or reconstruction?",
             "Yes. VIDS™ zero-demolition corrections use Virtual Zone Completion — energetically filling the missing zone using yantra, pyramid grids, mirror placements, and elemental energy strips. Physical reconstruction is recommended in fewer than 5% of {$label} cases."],
            ["What are the symptoms of a {$label} defect?",
             "Occupants of properties with a {$label} typically report {$effect}. These symptoms often intensify when other defects compound the corner issue. The VIDS™ analysis distinguishes corner defect symptoms from other active vastu issues — providing a precise, prioritised correction sequence."],
            ["How long does it take to see results after correcting a {$label}?",
             "Initial positive shifts are noticed within 30–45 days of implementing VIDS™ corrections. More concrete improvements in the affected life areas manifest over 90–180 days as the energetic field stabilises. A phased plan with milestones is included in every consultation."],
        ],
        'speakable' => "A {$label} affects {$zone} and can cause {$effect}. Vardhini Vastu's VIDS™ system identifies the precise sub-zone affected and provides zero-demolition Virtual Zone Completion corrections. Online consultation reports within 48 hours. Contact: +91 97391 05574.",
    ];
}

/* ── VASTU OBJECTS ──────────────────────────────────────────────────── */
function vv_geo_objects($slug) {
    $map = [
        'vastu-pyramids'  => ['Vastu Pyramids',  'energy grid amplifiers',    'placed in deficient zones to restore directional balance'],
        'vastu-yantras'   => ['Vastu Yantras',   'geometric energy instruments', 'installed at precise locations to correct energy flow'],
        'vastu-crystals'  => ['Vastu Crystals',  'elemental energy balancers','used in specific zones to enhance or suppress elemental energies'],
        'wind-chimes'     => ['Wind Chimes',     'Vayavya zone activators',   'hung in North-West or West to activate air element and social energy'],
        'vastu-plants'    => ['Vastu Plants',    'living energy modulators',  'placed in North, East, and North-East to enhance prosperity and clarity'],
        'vastu-mirrors'   => ['Vastu Mirrors',   'energy reflectors',         'used carefully — mirrors in wrong positions create detrimental energy loops'],
        'vastu-salt'      => ['Vastu Salt',      'negative energy absorbers', 'placed in corners and deficient zones to neutralise stagnant energy'],
        'vastu-colours'   => ['Vastu Colours',   'zone-specific elemental resonators', 'each directional zone has an element-aligned colour that activates or soothes it'],
    ];
    $d = isset($map[$slug]) ? $map[$slug] : [ucwords(str_replace(['-','vastu-'],[' ',''],$slug)), 'vastu remedial tools', 'used in specific zones to restore directional energy balance'];
    list($label, $func, $use) = $d;
    return [
        'h2'   => "{$label} in Vastu Shastra — Questions Answered",
        'intro' => "How {$label} function as {$func} in the VIDS™ zero-demolition correction system.",
        'qa'   => [
            ["What are {$label} used for in Vastu Shastra?",
             "{$label} are {$func} that are {$use}. In the VIDS™ system, {$label} are prescribed as part of a precision correction plan — installed at exact locations and orientations determined by 16-zone directional analysis, not as generic decorative objects."],
            ["Do {$label} actually work for Vastu corrections?",
             "When used correctly — right zone, right placement, correct specifications — {$label} produce measurable energetic changes. The key is precision: a yantra or crystal placed in the wrong zone or facing the wrong direction provides no benefit and can worsen the defect. VIDS™ prescriptions are exact."],
            ["Can {$label} replace structural Vastu corrections?",
             "For 85–90% of defects, VIDS™ non-structural remedies including {$label} are fully sufficient. Structural corrections are recommended only when the defect is severe and non-structural remedies cannot achieve the required energetic threshold. Every consultation specifies which corrections are essential."],
            ["Where can I buy Vastu-grade {$label}?",
             "Vardhini Vastu sources and supplies consultation-grade {$label} as part of the VIDS™ correction implementation. All items are specification-matched to the consultation report — not generic market products. Contact us on WhatsApp (+91 97391 05574) to enquire about sourcing."],
            ["How do I know if {$label} are working?",
             "Observable indicators appear within 14–30 days: improved sleep, reduced household conflict, better focus, or tangible progress in the specific life area being corrected. Vardhini Vastu provides a milestone checklist with each consultation to track improvement against objective markers."],
        ],
        'speakable' => "{$label} are {$func} — {$use}. Vardhini Vastu prescribes {$label} as part of precision VIDS™ correction plans with exact location, orientation, and specification. Observable improvements typically noted within 14–30 days. Contact: +91 97391 05574.",
    ];
}
