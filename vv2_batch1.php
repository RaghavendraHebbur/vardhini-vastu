<?php
/**
 * vv2_batch1.php — Apply vv2 design to 25 non-vv2 pages
 * Run from WP context via novamira/execute-php include
 */

// ── Shared components ──────────────────────────────────────────────────────

function vv2_css() {
  return '<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--vv-bg:#fafaf9;--vv-sf:#fff;--vv-bd:#e7e5e0;--vv-tx:#0c0a09;--vv-tx2:#57534e;--vv-tx3:#a8a29e;--vv-or:#ea580c;--vv-orl:#fff7ed;--vv-orm:#fed7aa;--vv-r:14px;--vv-sh:0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.04);--vv-shl:0 4px 24px rgba(0,0,0,.08),0 12px 48px rgba(0,0,0,.05);}
.vv2{font-family:\'Inter\',system-ui,sans-serif;background:var(--vv-bg);color:var(--vv-tx);-webkit-font-smoothing:antialiased;margin-left:calc(-50vw + 50%);margin-right:calc(-50vw + 50%);width:100vw;box-sizing:border-box;}
.vv2 *{box-sizing:border-box;}.vv2 a{text-decoration:none;color:inherit;}
.w{max-width:1080px;margin:0 auto;padding:0 32px;}
@media(max-width:640px){.w{padding:0 20px;}}
.sf{padding:80px 0;background:#fff;border-top:1px solid var(--vv-bd);}
.sw{padding:80px 0;background:var(--vv-orl);border-top:1px solid var(--vv-orm);}
.sd{padding:80px 0;background:#0c0a09;}
@media(max-width:640px){.sf,.sw,.sd{padding:56px 0;}}
.hero{padding:96px 32px 72px;max-width:1080px;margin:0 auto;}
@media(max-width:640px){.hero{padding:60px 20px 48px;}}
.badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--vv-bd);border-radius:100px;padding:6px 14px;font-size:.78rem;font-weight:600;color:var(--vv-tx2);margin-bottom:24px;}
.badge i{width:7px;height:7px;background:var(--vv-or);border-radius:50%;display:inline-block;font-style:normal;}
.hero h1{font-size:clamp(2.3rem,5vw,3.8rem);font-weight:800;line-height:1.1;letter-spacing:-.03em;color:var(--vv-tx);margin:0 0 22px;max-width:760px;}
.hero h1 em{font-style:normal;color:var(--vv-or);}
.sub{font-size:1.08rem;color:var(--vv-tx2);line-height:1.7;max-width:600px;margin:0 0 38px;}
.acts{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:52px;}
.bp{display:inline-flex;align-items:center;gap:8px;background:var(--vv-or);color:#fff;padding:13px 22px;border-radius:10px;font-size:.93rem;font-weight:600;}
.bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.07);color:#fff;padding:13px 22px;border-radius:10px;font-size:.93rem;font-weight:600;border:1px solid rgba(255,255,255,.15);}
.trust{background:#fff;border-top:1px solid var(--vv-bd);border-bottom:1px solid var(--vv-bd);padding:18px 0;}
.tr{display:flex;gap:36px;align-items:center;justify-content:center;flex-wrap:wrap;max-width:1080px;margin:0 auto;padding:0 32px;}
.ti{font-size:.78rem;color:var(--vv-tx3);font-weight:600;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;}
.td{width:4px;height:4px;background:var(--vv-bd);border-radius:50%;}
.eye{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--vv-or);margin:0 0 10px;}
.h2{font-size:clamp(1.75rem,3.8vw,2.5rem);font-weight:800;letter-spacing:-.03em;color:var(--vv-tx);margin:0 0 14px;line-height:1.15;}
.h2 em{font-style:normal;color:var(--vv-or);}
.lead{font-size:.97rem;color:var(--vv-tx2);line-height:1.7;max-width:560px;margin:0 0 44px;}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin:48px 0 0;}
@media(max-width:760px){.stats{grid-template-columns:repeat(2,1fr);}}
.stat-n{font-size:2rem;font-weight:800;color:var(--vv-tx);letter-spacing:-.03em;}
.stat-l{font-size:.78rem;color:var(--vv-tx3);margin-top:4px;}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
@media(max-width:900px){.cards{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.cards{grid-template-columns:1fr;}}
.card{background:#fff;border:1px solid var(--vv-bd);border-radius:var(--vv-r);padding:28px;transition:transform .15s,box-shadow .15s;}
.card:hover{transform:translateY(-3px);box-shadow:var(--vv-shl);}
.card-ico{font-size:1.6rem;margin-bottom:14px;}
.card h3{font-size:1rem;font-weight:700;color:var(--vv-tx);margin:0 0 8px;}
.card p{font-size:.85rem;color:var(--vv-tx2);line-height:1.6;margin:0;}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;}
@media(max-width:760px){.two-col{grid-template-columns:1fr;gap:40px;}}
.step-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:20px;}
.step-item{display:flex;gap:16px;align-items:flex-start;}
.step-num{width:32px;height:32px;background:var(--vv-orl);border:1.5px solid var(--vv-orm);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:800;color:var(--vv-or);flex-shrink:0;}
.step-body h4{font-size:.92rem;font-weight:700;color:var(--vv-tx);margin:0 0 4px;}
.step-body p{font-size:.83rem;color:var(--vv-tx2);margin:0;line-height:1.55;}
.faq{max-width:720px;margin:0 auto;}
.fqi{border-bottom:1px solid var(--vv-bd);padding:18px 0;}
.fqi:last-child{border-bottom:none;}
.fqq{font-size:.95rem;font-weight:700;color:var(--vv-tx);margin:0 0 8px;}
.fqa{font-size:.88rem;color:var(--vv-tx2);line-height:1.65;margin:0;}
.ctac{max-width:600px;margin:0 auto;text-align:center;padding:0 20px;}
.ctac h2{font-size:clamp(1.75rem,4vw,2.5rem);font-weight:800;color:#fff;letter-spacing:-.03em;margin:0 0 14px;}
.ctac p{font-size:1rem;color:#a8a29e;margin:0 0 32px;line-height:1.6;}
.ca{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.bwa{display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#fff;padding:13px 26px;border-radius:10px;font-size:.93rem;font-weight:600;}
.bgh{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.1);color:#fff;padding:13px 26px;border-radius:10px;font-size:.93rem;font-weight:600;border:1.5px solid rgba(255,255,255,.2);}
.ig{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
@media(max-width:760px){.ig{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.ig{grid-template-columns:1fr;}}
.icard{background:#fff;border:1px solid var(--vv-bd);border-radius:var(--vv-r);padding:20px;}
.icard-ico{font-size:1.4rem;margin-bottom:10px;}
.icard h4{font-size:.88rem;font-weight:700;color:var(--vv-tx);margin:0 0 6px;}
.icard p{font-size:.81rem;color:var(--vv-tx2);margin:0;line-height:1.55;}
.tcard{background:var(--vv-orl);border:1px solid var(--vv-orm);border-radius:var(--vv-r);padding:28px;}
.tcard-stars{color:var(--vv-or);font-size:1.1rem;margin-bottom:12px;}
.tcard-text{font-size:.9rem;color:var(--vv-tx2);line-height:1.7;margin:0 0 16px;font-style:italic;}
.tcard-name{font-size:.85rem;font-weight:700;color:var(--vv-tx);}
.tcard-loc{font-size:.78rem;color:var(--vv-tx3);}
</style>';
}

function vv2_hero($badge, $h1, $sub, $stats_extra = '') {
  $s = $stats_extra ?: '';
  return '<div style="background:#0c0a09;padding:96px 0 72px;">
<div class="hero" style="padding-top:0;padding-bottom:0;">
<div class="badge"><i></i> ' . $badge . '</div>
<h1>' . $h1 . '</h1>
<p class="sub">' . $sub . '</p>
<div class="acts">
<a href="https://wa.me/919739105574" class="bp">&#128241; WhatsApp Consultation</a>
<a href="tel:+919739105574" class="bs">&#128222; +91 97391 05574</a>
</div>
<div class="stats">
<div><div class="stat-n">3,200+</div><div class="stat-l">Consultations</div></div>
<div><div class="stat-n">10+</div><div class="stat-l">Years Experience</div></div>
<div><div class="stat-n">620+</div><div class="stat-l">Properties</div></div>
<div><div class="stat-n">&#11088; 5.0</div><div class="stat-l">Google Rating</div></div>
</div>
</div>
</div>';
}

function vv2_trust() {
  return '<div class="trust"><div class="tr">
<span class="ti">&#10003; Zero Demolition</span><span class="td"></span>
<span class="ti">&#10003; VIDS&#8482; Methodology</span><span class="td"></span>
<span class="ti">&#10003; Lecher Antenna</span><span class="td"></span>
<span class="ti">&#10003; Written Report</span><span class="td"></span>
<span class="ti">&#10003; 10+ Years</span>
</div></div>';
}

function vv2_cta($headline, $sub) {
  return '<section class="sd"><div class="ctac">
<h2>' . $headline . '</h2>
<p>' . $sub . '</p>
<div class="ca">
<a href="https://wa.me/919739105574" class="bwa">&#128241; WhatsApp Now</a>
<a href="tel:+919739105574" class="bgh">&#128222; +91 97391 05574</a>
</div>
</div></section>';
}

function vv2_faq($topic, $faqs) {
  $html = '<section class="sf"><div class="w">
<p class="eye">FAQ</p>
<h2 class="h2">Common Questions About <em>' . $topic . '</em></h2>
<div class="faq">';
  foreach ($faqs as $q => $a) {
    $html .= '<div class="fqi" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<p class="fqq" itemprop="name">' . $q . '</p>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p class="fqa" itemprop="text">' . $a . '</p>
</div></div>';
  }
  $html .= '</div></div></section>';
  return $html;
}

function vv2_wrap($inner) {
  return '<!-- wp:html --><div class="vv2">' . $inner . '</div><!-- /wp:html -->';
}

function update_page($id, $content, $rm_title, $rm_desc, $rm_kw) {
  global $wpdb;
  $result = wp_update_post(['ID' => $id, 'post_content' => $content]);
  if ($result) {
    // RankMath meta
    foreach (['rank_math_title'=>$rm_title,'rank_math_description'=>$rm_desc,'rank_math_focus_keyword'=>$rm_kw,'site-post-title'=>'disabled'] as $k=>$v) {
      $ex = $wpdb->get_var($wpdb->prepare("SELECT meta_id FROM {$wpdb->postmeta} WHERE post_id=%d AND meta_key=%s",$id,$k));
      if ($ex) $wpdb->update($wpdb->postmeta,['meta_value'=>$v],['post_id'=>$id,'meta_key'=>$k]);
      else $wpdb->insert($wpdb->postmeta,['post_id'=>$id,'meta_key'=>$k,'meta_value'=>$v]);
    }
    echo 'OK:' . $id . PHP_EOL;
  } else {
    echo 'FAIL:' . $id . PHP_EOL;
  }
}

// ── PAGES ──────────────────────────────────────────────────────────────────

$css = vv2_css();
$trust = vv2_trust();

// ── 1: vastu-for-house (1449) ────────────────────────────────────────────
$hero = vv2_hero('VIDS&#8482; Residential Analysis','Scientific Vastu for <em>House</em> — Energy Alignment Without Demolition','Unlock your home\'s hidden potential with a 16-zone VIDS&#8482; analysis. Raghavendra Hebbur maps geopathic stress, cardinal imbalances, and Pancha Bhoota deficiencies — then corrects them without breaking a single wall.');
$body = '<section class="sf"><div class="w">
<p class="eye">WHY IT MATTERS</p>
<h2 class="h2">What <em>Scientific Vastu</em> Does for Your Home</h2>
<p class="lead">Classical Vastu Shastra plus modern Lecher Antenna scanning identifies energy faults invisible to the naked eye — and fixes them with colour, furniture, crystals, and yantras.</p>
<div class="cards">
<div class="card"><div class="card-ico">&#127968;</div><h3>16-Zone Directional Analysis</h3><p>Every zone from North to South-East is mapped for its primary deity, element, and governing function using a compass-accurate survey.</p></div>
<div class="card"><div class="card-ico">&#128268;</div><h3>Geopathic Stress Detection</h3><p>Lecher Antenna scans for Hartmann grids, Curry lines, and underground water veins that cause chronic illness and sleep disorders.</p></div>
<div class="card"><div class="card-ico">&#9881;</div><h3>Zero-Demolition Remedies</h3><p>All corrections use colour therapy, sacred geometry, specific plants, copper and brass items — no structural changes required.</p></div>
<div class="card"><div class="card-ico">&#128203;</div><h3>Written Vastu Report</h3><p>You receive a detailed zone-by-zone report with photographs, findings, and a prioritised action list within 48 hours.</p></div>
<div class="card"><div class="card-ico">&#128205;</div><h3>Onsite or Online</h3><p>Site visit anywhere in Bangalore from &#8377;15,000. Online consultation via video call + floor plan for &#8377;5,000.</p></div>
<div class="card"><div class="card-ico">&#128100;</div><h3>Personal Follow-up</h3><p>30-day WhatsApp support after consultation to answer questions as you implement the remedies.</p></div>
</div></div></section>';
$process = '<section class="sw"><div class="w"><div class="two-col">
<div><p class="eye">HOW IT WORKS</p><h2 class="h2">The <em>VIDS&#8482;</em> House Vastu Process</h2>
<p class="lead">A structured 4-step methodology ensures nothing is missed — from energy mapping to remedy verification.</p></div>
<ul class="step-list">
<li class="step-item"><div class="step-num">1</div><div class="step-body"><h4>Floor Plan Review</h4><p>Submit your floor plan with compass orientation. Raghavendra identifies gross defects before the visit.</p></div></li>
<li class="step-item"><div class="step-num">2</div><div class="step-body"><h4>Onsite Energy Scan</h4><p>Lecher Antenna and compass survey maps all 16 zones, entry energy, and geopathic stress lines.</p></div></li>
<li class="step-item"><div class="step-num">3</div><div class="step-body"><h4>Diagnosis & Report</h4><p>Zone-by-zone findings documented with photographic evidence. Root causes identified, not just symptoms.</p></div></li>
<li class="step-item"><div class="step-num">4</div><div class="step-body"><h4>Remedy Implementation</h4><p>Specific zero-demolition corrections for each defect. Follow-up call after 30 days to verify improvement.</p></div></li>
</ul>
</div></div></section>';
$faq = vv2_faq('House Vastu',[
  'What is the cost of house vastu consultation in Bangalore?' => 'For apartments and row houses in Bangalore, the fee is &#8377;15,000. Independent houses and villas are &#8377;25,000. Online consultation for any location is &#8377;5,000.',
  'Does vastu require demolition or structural changes?' => 'No. The VIDS&#8482; methodology uses only zero-demolition remedies — colour, furniture placement, yantras, crystals, and specific plants. No walls are broken.',
  'How long does a house vastu consultation take?' => 'A typical site visit takes 3–4 hours for a 2BHK flat and 5–6 hours for a villa. The written report is delivered within 48 hours after the visit.',
  'Can vastu be done for a rented house?' => 'Yes. Vastu corrections using removable items like crystals, colours, and furniture work equally well in rented homes without any permanent changes.',
  'Which direction is best for main entrance as per vastu?' => 'North, East, and North-East entrances are traditionally most auspicious. However, the best direction depends on the plot orientation and the resident\'s birth star — a proper site analysis gives an accurate answer.',
]);
$cta = vv2_cta('Book Your House Vastu Consultation','Get a VIDS&#8482; energy scan of your home — zero demolition, written report, WhatsApp follow-up.');
$html = $css . '<div style="background:#0c0a09;">' . $hero . '</div>' . $trust . $body . $process . $faq . $cta;
update_page(1449, vv2_wrap($html), 'Vastu for House in Bangalore: Scientific Analysis from &#8377;15,000', 'Scientific vastu for house in Bangalore. VIDS&#8482; 16-zone analysis, Lecher Antenna geopathic scan, zero-demolition remedies by Raghavendra Hebbur. From &#8377;15,000.', 'vastu for house');

// ── 2: vastu-for-bedroom (1452) ──────────────────────────────────────────
$hero = vv2_hero('VIDS&#8482; Sleep Zone Analysis','Bedroom Vastu — <em>Deep Sleep</em> Through Energy Alignment','The bedroom governs rest, health, and relationships. VIDS&#8482; analysis checks sleeping direction, bed positioning, geopathic stress lines, and south-west zone energy to restore restorative sleep.');
$body = '<section class="sf"><div class="w">
<p class="eye">KEY BEDROOM FACTORS</p>
<h2 class="h2">What <em>Bedroom Vastu</em> Analyses</h2>
<p class="lead">Six critical energy variables in every bedroom — if even one is wrong, sleep quality and health are compromised.</p>
<div class="cards">
<div class="card"><div class="card-ico">&#129654;</div><h3>Sleeping Direction</h3><p>Head towards South is ideal for deep sleep. North-facing head creates magnetic conflict with Earth\'s field, causing insomnia and fatigue.</p></div>
<div class="card"><div class="card-ico">&#128268;</div><h3>Geopathic Stress Lines</h3><p>Hartmann grid crossings under the bed cause 80% of chronic sleep disorders. Lecher Antenna locates and neutralises these in one session.</p></div>
<div class="card"><div class="card-ico">&#127775;</div><h3>South-West Zone Quality</h3><p>The SW zone governs stability and rest. Toilets, staircases, or cuts in this zone destabilise sleep and relationships.</p></div>
<div class="card"><div class="card-ico">&#127775;</div><h3>Mirror Placement</h3><p>Mirrors reflecting the bed create restless sleep and energy disturbance. Specific placements and coverings correct this without renovation.</p></div>
<div class="card"><div class="card-ico">&#127774;</div><h3>Colour Therapy</h3><p>Bedroom walls in earthy tones (cream, pale terracotta, dusty pink) support SW zone energy. Blue and grey are assessed individually.</p></div>
<div class="card"><div class="card-ico">&#9889;</div><h3>EMF Assessment</h3><p>Electronic devices, WiFi routers, and electric meters near the headboard disrupt cellular repair during sleep — mapped and corrected.</p></div>
</div></div></section>';
$faq = vv2_faq('Bedroom Vastu',[
  'Which direction should I sleep as per vastu?' => 'Head towards South is the most universally recommended direction. Head towards East is acceptable. Head towards North creates magnetic conflict and should be avoided.',
  'Can a mirror in the bedroom cause vastu defects?' => 'Yes. A mirror that reflects the sleeping person creates restless energy. The remedy is either relocating the mirror or keeping it covered at night — no demolition needed.',
  'Is it bad to have a toilet attached to the bedroom?' => 'An attached toilet is fine if it is in the North-West or West zone of the bedroom. Toilets in the South-West or South zone of the bedroom are problematic and need correction.',
  'What colours are best for bedroom walls as per vastu?' => 'Earthy tones — cream, light terracotta, pale pink, and warm beige — support South-West zone energy. Avoid deep red, black, or dark grey in master bedrooms.',
  'Can vastu fix insomnia or chronic fatigue?' => 'Geopathic stress lines under the bed are a clinically documented cause of sleep disorders. Lecher Antenna detection and correction typically shows improvement within 2–4 weeks of implementing remedies.',
]);
$cta = vv2_cta('Fix Your Bedroom Energy Today','Book a VIDS&#8482; bedroom vastu analysis — sleeping direction, geopathic stress, mirror placement corrected in one visit.');
$html = $css . '<div style="background:#0c0a09;">' . $hero . '</div>' . $trust . $body . $faq . $cta;
update_page(1452, vv2_wrap($html), 'Bedroom Vastu in Bangalore — Sleeping Direction, Geopathic Stress Fix', 'Scientific bedroom vastu by Raghavendra Hebbur. Fix sleeping direction, geopathic stress lines, mirror placement. Zero demolition. Book from &#8377;15,000.', 'bedroom vastu');

// ── 3: vastu-for-kitchen (1451) ──────────────────────────────────────────
$hero = vv2_hero('VIDS&#8482; Fire Zone Analysis','Kitchen Vastu — <em>Health &amp; Prosperity</em> Through Fire Zone Balance','The kitchen governs the family\'s health, digestive energy, and financial stability. South-East is the fire zone — a wrongly placed kitchen or stove direction undermines everything.');
$body = '<section class="sf"><div class="w">
<p class="eye">KITCHEN VASTU ESSENTIALS</p>
<h2 class="h2">Critical <em>Kitchen Vastu</em> Parameters</h2>
<p class="lead">Six key factors determine whether your kitchen supports health and prosperity or creates chronic illness and financial stress.</p>
<div class="cards">
<div class="card"><div class="card-ico">&#128293;</div><h3>Stove Placement & Direction</h3><p>The stove belongs in the South-East zone. Cooking while facing East maximises digestive energy and food quality.</p></div>
<div class="card"><div class="card-ico">&#128167;</div><h3>Water-Fire Conflict</h3><p>Sink and stove should never be adjacent or in the same North-East-South-East axis — this creates health and financial conflicts.</p></div>
<div class="card"><div class="card-ico">&#9728;</div><h3>Ventilation & Light</h3><p>The South-East kitchen must have proper cross ventilation. Stagnant fire energy in a poorly ventilated kitchen causes respiratory issues.</p></div>
<div class="card"><div class="card-ico">&#128218;</div><h3>Storage Direction</h3><p>Heavy storage like refrigerators and shelves belong in the South or West. North and East should remain light and open.</p></div>
<div class="card"><div class="card-ico">&#127748;</div><h3>Colours & Materials</h3><p>Yellows, oranges, and creams support fire zone energy. Green and blue tiles in SE kitchens weaken the fire element.</p></div>
<div class="card"><div class="card-ico">&#128203;</div><h3>Wrong Zone Kitchen Fix</h3><p>If your kitchen is in the North-East (most problematic placement), specific yantras, colour corrections, and furniture rearrangements provide effective remedies.</p></div>
</div></div></section>';
$faq = vv2_faq('Kitchen Vastu',[
  'Which direction should I face while cooking as per vastu?' => 'Facing East while cooking is most auspicious. Facing South is the second best. Facing North or West while cooking is considered inauspicious as it opposes the natural energy flow.',
  'What if my kitchen is in the North-East?' => 'North-East kitchen is the most problematic placement in vastu as it conflicts with the water element zone. Specific remedies including copper plates, colour corrections, and energy crystals can significantly reduce the negative impact.',
  'Can the sink and stove be next to each other?' => 'No — water and fire elements should not be adjacent. Keep at least 1.5 feet of counter space between them. If they are already adjacent, a green marble or quartz divider provides an effective remedy.',
  'What colour should I paint my kitchen as per vastu?' => 'Orange, yellow, cream, or off-white are ideal for South-East kitchens as they support fire energy. Avoid black, dark brown, or dark green in the kitchen.',
  'Is it bad to have a toilet above or below the kitchen?' => 'Yes — a toilet directly above or below the kitchen is a significant vastu defect that affects food quality and family health. Remedies include specific salt-and-camphor placements and energy corrections at the boundary.',
]);
$cta = vv2_cta('Correct Your Kitchen Vastu','Book a kitchen zone analysis — stove placement, water-fire balance, and colour corrections without renovation.');
$html = $css . '<div style="background:#0c0a09;">' . $hero . '</div>' . $trust . $body . $faq . $cta;
update_page(1451, vv2_wrap($html), 'Kitchen Vastu in Bangalore — Stove Direction, Fire Zone Balance', 'Scientific kitchen vastu analysis. Fix stove placement, water-fire conflict, colour corrections. Zero demolition by Raghavendra Hebbur. Book from &#8377;15,000.', 'kitchen vastu');

// ── 4: vastu-for-office (1456) ──────────────────────────────────────────
$hero = vv2_hero('VIDS&#8482; Workplace Energy Analysis','Office Vastu — <em>Productivity &amp; Growth</em> Through Energy Alignment','A misaligned office suppresses focus, creates conflicts between staff, and blocks client flow. VIDS&#8482; analysis maps every desk, cabin, and zone for maximum output and revenue energy.');
$body = '<section class="sf"><div class="w">
<p class="eye">OFFICE VASTU FACTORS</p>
<h2 class="h2">What <em>Office Vastu</em> Analysis Covers</h2>
<p class="lead">From the entrance direction to the MD\'s chair placement — every spatial decision in your office impacts team performance and business growth.</p>
<div class="cards">
<div class="card"><div class="card-ico">&#127968;</div><h3>Entrance & Reception</h3><p>North or East-facing entrances maximise client flow and opportunity energy. Reception desk placement determines first-impression energy.</p></div>
<div class="card"><div class="card-ico">&#128188;</div><h3>MD/Owner Cabin</h3><p>The decision-maker should sit in the South-West zone facing North or East — commanding position with maximum stability and authority.</p></div>
<div class="card"><div class="card-ico">&#128101;</div><h3>Team Seating Zones</h3><p>Finance teams work best in North zones. Sales teams in East zones. Operations in West zones. HR in South-West. Zone-specific placement boosts departmental output.</p></div>
<div class="card"><div class="card-ico">&#128176;</div><h3>Cash & Accounts Area</h3><p>North zone governs wealth. Accounts, cash drawers, and finance files should face North — never South or South-West.</p></div>
<div class="card"><div class="card-ico">&#128268;</div><h3>Geopathic Stress in Offices</h3><p>Hartmann grid crossings at workstations cause frequent sick leaves, poor concentration, and staff conflicts. Detected and neutralised with Lecher Antenna.</p></div>
<div class="card"><div class="card-ico">&#128203;</div><h3>Office Vastu Report</h3><p>Zone-by-zone findings with photographs, seating chart recommendations, and implementation priority list — delivered within 48 hours.</p></div>
</div></div></section>';
$faq = vv2_faq('Office Vastu',[
  'Which direction should the MD or owner sit in office vastu?' => 'The MD or business owner should sit in the South-West zone of the office, facing North or East. This position provides maximum authority, stability, and decision-making clarity.',
  'What is the best direction for office entrance as per vastu?' => 'North and East-facing office entrances attract maximum opportunity and client energy. North-East is highly auspicious. South-facing entrances can be corrected with specific colour and symbol placements at the entrance.',
  'How does vastu improve office productivity?' => 'By placing different teams in their optimal energy zones (North for finance, East for sales), reducing geopathic stress at workstations, and balancing the five elements, vastu creates an environment that naturally reduces friction and enhances focus.',
  'Can vastu be done for a leased or rented office?' => 'Yes. All VIDS&#8482; office vastu corrections use removable elements — furniture rearrangement, desk accessories, crystals, and colour additions — that work perfectly in leased spaces without permanent modifications.',
  'How much does office vastu cost in Bangalore?' => 'Office vastu consultation in Bangalore starts at &#8377;51,000 for commercial properties. Online consultation is &#8377;5,000 for smaller offices. Contact us for a quote based on your office size.',
]);
$cta = vv2_cta('Energise Your Office with VIDS&#8482;','Get a zone-by-zone office vastu analysis. Seating map, entrance energy, geopathic scan — delivered in 48 hours.');
$html = $css . '<div style="background:#0c0a09;">' . $hero . '</div>' . $trust . $body . $faq . $cta;
update_page(1456, vv2_wrap($html), 'Office Vastu in Bangalore — Seating, Zones & Productivity Analysis', 'Scientific office vastu analysis by Raghavendra Hebbur. Fix seating zones, MD cabin, entrance energy. Zero demolition. Commercial from &#8377;51,000.', 'office vastu');

// ── 5: vastu-for-business (1457) ────────────────────────────────────────
$hero = vv2_hero('VIDS&#8482; Business Energy Analysis','Business Vastu — <em>Revenue Growth</em> Through Scientific Energy Alignment','Struggling sales, staff conflicts, and stagnant cash flow often trace back to vastu defects. VIDS&#8482; analysis identifies and corrects the energy imbalances blocking your business growth.');
$body = '<section class="sf"><div class="w">
<p class="eye">BUSINESS VASTU SCOPE</p>
<h2 class="h2">How <em>Business Vastu</em> Unlocks Growth</h2>
<p class="lead">Business vastu covers the full commercial energy audit — showroom, office, factory, or multi-unit complex — aligned for maximum revenue, staff harmony, and client flow.</p>
<div class="cards">
<div class="card"><div class="card-ico">&#128176;</div><h3>Cash Flow & Revenue Zones</h3><p>The North zone governs financial inflow. Blocked North zones through clutter, toilets, or wrong furniture suppress liquidity directly.</p></div>
<div class="card"><div class="card-ico">&#128101;</div><h3>Staff Harmony Analysis</h3><p>Inter-team conflicts and high attrition often trace to specific seating arrangements that clash elemental energies. Corrected through zone-specific reassignment.</p></div>
<div class="card"><div class="card-ico">&#127968;</div><h3>Client Attraction Energy</h3><p>East and North-East zones govern new opportunities. An obstructed or defective NE in your business space limits client acquisition and deal closures.</p></div>
<div class="card"><div class="card-ico">&#9881;</div><h3>Product & Inventory Zones</h3><p>Heavy inventory in South and West supports stability. Misplaced heavy storage in North or East creates financial instability and delays.</p></div>
<div class="card"><div class="card-ico">&#128203;</div><h3>Logo & Branding Direction</h3><p>Brand signage facing the right direction multiplies the business\'s external energy. The VIDS&#8482; analysis includes signage and logo placement guidance.</p></div>
<div class="card"><div class="card-ico">&#128268;</div><h3>Geopathic Business Stress</h3><p>Underground water veins and Hartmann crossings below business premises are a documented cause of financial instability. Detected and corrected in one session.</p></div>
</div></div></section>';
$faq = vv2_faq('Business Vastu',[
  'Can vastu really improve business revenue?' => 'Vastu corrections align the spatial energy of your business with natural energy flows. Over 620 commercial properties corrected by Raghavendra Hebbur report measurable improvement in cash flow within 60–90 days of implementing remedies.',
  'Which zone of a business should the cash counter be in?' => 'The cash counter should be in the North zone of the business, with the cashier facing North or East. This aligns with Kubera\'s direction — the deity of wealth — and maximises financial inflow energy.',
  'What are common vastu defects in businesses?' => 'The top 5 business vastu defects are: toilet in the North-East, owner sitting with back to the entrance, cash counter in South zone, main entrance blocked by pillars, and clutter in the North zone. Each has specific zero-demolition corrections.',
  'How long does it take to see results from business vastu corrections?' => 'Most clients report visible improvement in team harmony within 2–3 weeks. Revenue improvements typically manifest within 60–90 days as energy alignments take effect. Geopathic stress corrections often show results within 2–4 weeks.',
  'Can online business vastu consultation give accurate results?' => 'Yes. Online consultation using your floor plan, compass directions, and photographs gives 80–85% of the accuracy of an onsite visit. It is ideal for outstation clients and starts at &#8377;5,000.',
]);
$cta = vv2_cta('Transform Your Business Energy','Book a VIDS&#8482; commercial vastu analysis — revenue zones, staff seating, geopathic scan. From &#8377;51,000.');
$html = $css . '<div style="background:#0c0a09;">' . $hero . '</div>' . $trust . $body . $faq . $cta;
update_page(1457, vv2_wrap($html), 'Business Vastu in Bangalore — Revenue, Staff & Growth Analysis', 'Scientific business vastu by Raghavendra Hebbur. Fix revenue zones, staff harmony, cash flow energy. Zero demolition. From &#8377;51,000.', 'business vastu');

// ── 6: vastu-for-pooja-room (1453) ──────────────────────────────────────
$hero = vv2_hero('VIDS&#8482; Sacred Space Analysis','Pooja Room Vastu — <em>Divine Energy</em> Amplified Through Correct Placement','The pooja room is the spiritual heart of your home. North-East placement, idol direction, and altar height — when aligned scientifically — multiply the meditative and protective energy of every prayer.');
$body = '<section class="sf"><div class="w">
<p class="eye">SACRED SPACE ESSENTIALS</p>
<h2 class="h2">Key <em>Pooja Room Vastu</em> Parameters</h2>
<p class="lead">Six critical factors determine whether your pooja room amplifies or dissipates spiritual energy — many are simple corrections requiring no structural work.</p>
<div class="cards">
<div class="card"><div class="card-ico">&#127981;</div><h3>Zone Placement</h3><p>North-East is the water element zone and the most spiritually charged direction — the ideal location for any pooja room or altar.</p></div>
<div class="card"><div class="card-ico">&#127775;</div><h3>Idol Direction</h3><p>Idols should face West or South — meaning the worshipper faces East or North during prayer. Idols facing South-East or South are inauspicious.</p></div>
<div class="card"><div class="card-ico">&#128171;</div><h3>Altar Height</h3><p>The altar platform should be 2–3 feet off the ground — eye-level or slightly below during sitting prayer. Idols on the floor or at toe level weaken the energy connection.</p></div>
<div class="card"><div class="card-ico">&#127748;</div><h3>Colour & Material</h3><p>White, cream, light yellow, and pale marble support North-East sacred energy. Avoid black granite or dark stone in pooja rooms.</p></div>
<div class="card"><div class="card-ico">&#128293;</div><h3>Lamp & Incense Direction</h3><p>The lamp (diya) should be placed South-East of the altar — the fire zone. This creates correct elemental harmony between flame and divinity.</p></div>
<div class="card"><div class="card-ico">&#128683;</div><h3>What Not to Store</h3><p>The pooja room should never store shoes, medicines, chemicals, or broken idols. Broken items deplete the sacred energy field rapidly.</p></div>
</div></div></section>';
$faq = vv2_faq('Pooja Room Vastu',[
  'Which direction should the pooja room face as per vastu?' => 'The pooja room should ideally be in the North-East zone of the house. If not possible, East or North zones are acceptable alternatives. The worshipper should face East or North during prayer.',
  'Can I keep a pooja corner in the bedroom?' => 'A pooja corner in the bedroom is acceptable only if it is in the North or East wall of the bedroom, kept covered when not in use, and separated from the sleeping area by at least 6 feet.',
  'Which idols should not be kept in the pooja room?' => 'Broken or damaged idols should be immersed in flowing water. Multiple forms of the same deity can cause energy conflict. Nataraja (dancing Shiva) and idols depicting anger or war should not be in home pooja rooms.',
  'Is it okay to have a pooja room under a staircase?' => 'No — a pooja room under a staircase is inauspicious as the overhead pressure weakens the sacred energy field. If unavoidable, specific copper plates and crystal corrections can reduce the negative impact.',
  'Can I have a pooja room in the South direction?' => 'South is not recommended for pooja rooms as it is the zone of Lord Yama (deity of death). If the only option is South, specific Vastu corrections involving mirrors and crystal energy can partially neutralise the defect.',
]);
$cta = vv2_cta('Energise Your Sacred Space','Get a VIDS&#8482; pooja room vastu analysis — placement, idol direction, altar height corrected precisely.');
$html = $css . '<div style="background:#0c0a09;">' . $hero . '</div>' . $trust . $body . $faq . $cta;
update_page(1453, vv2_wrap($html), 'Pooja Room Vastu in Bangalore — Idol Direction, Zone & Energy', 'Scientific pooja room vastu by Raghavendra Hebbur. Correct zone, idol direction, altar height. Zero demolition. Book from &#8377;15,000.', 'pooja room vastu');

// ── 7: vastu-for-study-room (1454) ──────────────────────────────────────
$hero = vv2_hero('VIDS&#8482; Knowledge Zone Analysis','Study Room Vastu — <em>Focus, Memory &amp; Academic Success</em>','The study room is the knowledge zone of the home. Facing direction while studying, placement of books, and light sources all impact concentration, memory retention, and exam performance.');
$body = '<section class="sf"><div class="w">
<p class="eye">STUDY VASTU ESSENTIALS</p>
<h2 class="h2">How <em>Study Room Vastu</em> Boosts Learning</h2>
<p class="lead">Specific directional energies govern intellect and memory. Aligning the study space with North-East and East amplifies Saraswati\'s domain — knowledge, creativity, and clarity.</p>
<div class="cards">
<div class="card"><div class="card-ico">&#128218;</div><h3>Sitting Direction</h3><p>Facing East or North while studying maximises memory retention and analytical thinking. Facing South or West while studying reduces concentration significantly.</p></div>
<div class="card"><div class="card-ico">&#127968;</div><h3>Room Zone Placement</h3><p>North-East, East, and North zones are ideal for study rooms. South-West is acceptable only for adults. South-East study rooms increase stress and mental fatigue.</p></div>
<div class="card"><div class="card-ico">&#128214;</div><h3>Bookshelf Placement</h3><p>Heavy bookshelves belong on South or West walls. North and East walls should remain light and clutter-free to maintain knowledge-zone energy flow.</p></div>
<div class="card"><div class="card-ico">&#127774;</div><h3>Natural Light Direction</h3><p>Natural light from East or North is ideal for study spaces. Avoid direct South or West sunlight falling on the study desk — it creates mental agitation.</p></div>
<div class="card"><div class="card-ico">&#127822;</div><h3>Colours for Study Rooms</h3><p>Green (growth and learning), white (clarity), and pale yellow (intellect) are the most supportive colours. Avoid deep red, black, or dark brown in study rooms.</p></div>
<div class="card"><div class="card-ico">&#128011;</div><h3>Saraswati Yantra</h3><p>Placing a Saraswati Yantra on the North-East wall of the study room, at eye level, activates knowledge energy and supports academic performance.</p></div>
</div></div></section>';
$faq = vv2_faq('Study Room Vastu',[
  'Which direction should I face while studying as per vastu?' => 'Facing East while studying is the most auspicious direction — it aligns with the Sun\'s rising energy and supports concentration and memory. Facing North is the second best option.',
  'What is the best location for a study room in the house?' => 'North-East is the best zone for a study room as it is governed by the knowledge element (water and divine wisdom). West zone is good for children\'s study rooms. Avoid South-East (fire zone) for studying.',
  'Can my child study better with vastu corrections?' => 'Yes. Correcting the sitting direction, removing geopathic stress from the study area, and adding knowledge-enhancing elements like green plants and Saraswati Yantra typically shows measurable improvement in focus within 3–4 weeks.',
  'Should bookshelves be in the East or West wall?' => 'Bookshelves should be on South or West walls. The East and North walls of the study room should remain relatively light. Heavy storage on North or East walls blocks the incoming knowledge energy.',
  'What colour should a study room be painted?' => 'Green is the most recommended colour for study rooms as it supports learning energy. Pale yellow and white are excellent alternatives. Avoid dark colours like navy, black, or deep red.',
]);
$cta = vv2_cta('Boost Your Child\'s Academic Energy','Book a VIDS&#8482; study room vastu analysis — sitting direction, zone energy, geopathic stress corrected.');
$html = $css . '<div style="background:#0c0a09;">' . $hero . '</div>' . $trust . $body . $faq . $cta;
update_page(1454, vv2_wrap($html), 'Study Room Vastu in Bangalore — Sitting Direction & Focus Energy', 'Scientific study room vastu. Fix sitting direction, bookshelf placement, zone energy for better focus and academic success. From &#8377;15,000.', 'study room vastu');

// ── 8: vastu-for-toilet-and-bathroom (1455) ─────────────────────────────
$hero = vv2_hero('VIDS&#8482; Waste Zone Analysis','Toilet &amp; Bathroom Vastu — <em>Health Protection</em> Through Correct Placement','Incorrectly placed bathrooms and toilets are the most common cause of chronic health problems, financial drain, and negative energy in a home. VIDS&#8482; identifies and corrects every defect.');
$body = '<section class="sf"><div class="w">
<p class="eye">BATHROOM VASTU ESSENTIALS</p>
<h2 class="h2">Critical <em>Toilet &amp; Bathroom Vastu</em> Rules</h2>
<p class="lead">The placement of bathrooms and toilets directly governs the family\'s health, finances, and relationships. These are correctable without demolition in most cases.</p>
<div class="cards">
<div class="card"><div class="card-ico">&#128683;</div><h3>Never in North-East</h3><p>NE toilet is the most damaging vastu defect — it pollutes the sacred knowledge zone and causes severe health and financial problems. Specific corrections can reduce but not eliminate the defect.</p></div>
<div class="card"><div class="card-ico">&#9989;</div><h3>Best Locations</h3><p>North-West and West are the most accepted zones for toilets. South-West is acceptable for adults only. South and North-West are ideal for bathrooms.</p></div>
<div class="card"><div class="card-ico">&#128683;</div><h3>Seat Direction</h3><p>The toilet seat should face North or South — never East or West. Sitting facing East while using the toilet is highly inauspicious per vastu shastra.</p></div>
<div class="card"><div class="card-ico">&#128167;</div><h3>Water Element Balance</h3><p>Taps and shower heads should ideally be on the North or East walls of the bathroom to support water element energy flow.</p></div>
<div class="card"><div class="card-ico">&#127748;</div><h3>Colours & Ventilation</h3><p>White, light grey, and pale blue are ideal for bathrooms. Adequate ventilation in the North or East wall prevents stagnant negative energy.</p></div>
<div class="card"><div class="card-ico">&#9881;</div><h3>Remedy for Wrong Placement</h3><p>If your toilet is in a defective zone, specific salt bowls, crystal energy corrections, and copper fittings can significantly reduce the negative impact without demolition.</p></div>
</div></div></section>';
$faq = vv2_faq('Toilet & Bathroom Vastu',[
  'Which is the best direction for toilet as per vastu?' => 'North-West is the best direction for a toilet. West is also acceptable. The toilet seat should be oriented so the user faces North or South — never East or West.',
  'What if my toilet is in North-East zone?' => 'North-East toilet is the most problematic vastu defect. While relocation is the ideal solution, specific zero-demolition corrections include: sea salt bowls in the NE corner, yellow fluorite crystals, yellow colour on walls, and keeping the space meticulously clean and ventilated.',
  'Can a bathroom attached to bedroom cause vastu problems?' => 'An attached bathroom is acceptable if it is in the North-West, West, or South-West zone of the bedroom. Bathrooms in South-East or North-East of the bedroom cause health and relationship issues.',
  'Should the toilet door remain open or closed?' => 'The toilet door should always remain closed when not in use. This contains the negative energy within the space and prevents it from spreading to adjacent rooms.',
  'What colour is best for bathroom tiles as per vastu?' => 'White is universally safe for all directions. Light grey works well in West-zone bathrooms. Pale blue supports North-zone bathrooms. Avoid black, dark brown, or deep red tiles.',
]);
$cta = vv2_cta('Fix Your Bathroom Vastu Defects','Get a VIDS&#8482; bathroom and toilet zone analysis — remedies without any structural demolition.');
$html = $css . '<div style="background:#0c0a09;">' . $hero . '</div>' . $trust . $body . $faq . $cta;
update_page(1455, vv2_wrap($html), 'Toilet & Bathroom Vastu in Bangalore — Zone, Direction & Health', 'Scientific toilet and bathroom vastu by Raghavendra Hebbur. Correct zone placement, seat direction, NE toilet remedies. Zero demolition. Book now.', 'toilet bathroom vastu');

// Purge cache
$ls='LiteSpeed'.chr(92).'Purge';
if(class_exists($ls)){$ls::purge_all();}
echo PHP_EOL.'BATCH 1 COMPLETE. Cache purged.';
