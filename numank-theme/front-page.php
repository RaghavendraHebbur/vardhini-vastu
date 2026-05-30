<?php get_header(); ?>

<!-- ============================================================
     HERO
     ============================================================ -->
<section class="nm-hero">
  <div class="nm-hero-inner">
    <div class="nm-hero-om">ॐ</div>
    <h1>NUMANK</h1>
    <div class="nm-hero-sa">नुमांक</div>
    <div class="nm-hero-divider">✦ &nbsp; ✦ &nbsp; ✦</div>
    <p class="nm-hero-tagline">Ancient Numbers. Modern Destiny.</p>
    <p class="nm-hero-sub">अंक ज्योतिष का दिव्य ज्ञान</p>
    <div class="nm-hero-btns">
      <a href="#calculator" class="nm-btn nm-btn-gold">🔢 Free Number Reading</a>
      <a href="<?php echo home_url('/services'); ?>" class="nm-btn nm-btn-outline">View Services</a>
    </div>
    <div class="nm-trust">
      <span class="nm-trust-item">✦ 5000+ Readings</span>
      <span class="nm-trust-item">✦ 15+ Years Experience</span>
      <span class="nm-trust-item">✦ Vedic Tradition</span>
      <span class="nm-trust-item">✦ Trusted by 3 Countries</span>
    </div>
  </div>
</section>

<!-- ============================================================
     NUMBERS 1–9
     ============================================================ -->
<section class="nm-section nm-section-deeper">
  <div class="nm-container nm-center">
    <div class="nm-label">अंक ज्योतिष</div>
    <h2>Sacred Numbers 1 – 9</h2>
    <p style="color:var(--dim); max-width:580px; margin:0 auto; font-size:18px;">
      Each number carries a divine planetary vibration. Discover the cosmic energy encoded in yours.
    </p>
    <div class="nm-numbers-grid">
      <?php
      $numbers = array(
        1 => array( 'hindi' => 'एक',  'planet' => 'Sun · सूर्य'    ),
        2 => array( 'hindi' => 'दो',   'planet' => 'Moon · चंद्र'  ),
        3 => array( 'hindi' => 'तीन', 'planet' => 'Jupiter · गुरु' ),
        4 => array( 'hindi' => 'चार', 'planet' => 'Rahu · राहु'    ),
        5 => array( 'hindi' => 'पाँच','planet' => 'Mercury · बुध'  ),
        6 => array( 'hindi' => 'छह',  'planet' => 'Venus · शुक्र'  ),
        7 => array( 'hindi' => 'सात', 'planet' => 'Ketu · केतु'    ),
        8 => array( 'hindi' => 'आठ',  'planet' => 'Saturn · शनि'   ),
        9 => array( 'hindi' => 'नौ',  'planet' => 'Mars · मंगल'    ),
      );
      foreach ( $numbers as $n => $data ) :
      ?>
      <a class="nm-num-card" href="<?php echo home_url('/number-' . $n); ?>">
        <span class="nm-num-digit"><?php echo $n; ?></span>
        <span class="nm-num-hindi"><?php echo $data['hindi']; ?></span>
        <span class="nm-num-planet"><?php echo $data['planet']; ?></span>
      </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- ============================================================
     FREE CALCULATOR
     ============================================================ -->
<section class="nm-section nm-section-purple" id="calculator">
  <div class="nm-container nm-center">
    <div class="nm-label">निःशुल्क गणना</div>
    <h2>Free Numerology Calculator</h2>
    <p style="color:var(--dim); max-width:580px; margin:0 auto 40px; font-size:18px;">
      Discover your Mulank (Birth Number) and Bhagyank (Destiny Number) instantly — rooted in Vedic Ank Jyotish.
    </p>
    <div class="nm-calc-box">
      <input class="nm-input" type="text" id="nm-dob" placeholder="Date of Birth  (DD / MM / YYYY)">
      <input class="nm-input" type="text" id="nm-name" placeholder="Your Full Name  (optional)">
      <button class="nm-calc-submit" onclick="nmCalculate()">✦ &nbsp; CALCULATE MY NUMBERS &nbsp; ✦</button>

      <div class="nm-result" id="nm-result">
        <div class="nm-result-grid">
          <div>
            <span class="nm-result-label">मूलांक</span>
            <span class="nm-result-number" id="nm-mulank">–</span>
            <span class="nm-result-sublabel">Mulank · Birth Number</span>
          </div>
          <div>
            <span class="nm-result-label">भाग्यांक</span>
            <span class="nm-result-number" id="nm-bhagyank">–</span>
            <span class="nm-result-sublabel">Bhagyank · Destiny Number</span>
          </div>
        </div>
        <p class="nm-result-message" id="nm-msg"></p>
        <a class="nm-btn nm-btn-outline" href="https://wa.me/919739105574?text=Namaste%20Raghavendrra%20ji%2C%20I%20want%20a%20detailed%20reading%20for%20my%20numbers" target="_blank" rel="noopener">
          Get My Full Detailed Report →
        </a>
      </div>
    </div>
  </div>
</section>

<script>
(function(){
  var msgs = {
    1:  "Born leader. The Sun (सूर्य) rules you — independent, ambitious, and pioneering. You thrive when you lead.",
    2:  "The Moon (चंद्र) guides you — sensitive, intuitive, and a natural peacemaker. You carry deep emotional wisdom.",
    3:  "Jupiter (गुरु) blesses you — creative, joyful, and gifted with expression. Your optimism lights every room.",
    4:  "Rahu (राहु) shapes you — disciplined, unconventional, and hardworking. You build what others cannot imagine.",
    5:  "Mercury (बुध) energises you — adventurous, versatile, and freedom-loving. Change is your greatest strength.",
    6:  "Venus (शुक्र) adorns you — nurturing, artistic, and harmony-seeking. Love and beauty flow through your life.",
    7:  "Ketu (केतु) deepens you — spiritual, introspective, and psychically gifted. You see what others miss.",
    8:  "Saturn (शनि) tests and rewards you — powerful, ambitious, and destined for great material and spiritual success.",
    9:  "Mars (मंगल) fires you — courageous, humanitarian, and spiritually evolved. You are the highest vibration.",
    11: "Master Number 11 — The Intuitive Illuminator. A rare spiritual gift; you are a channel for higher wisdom.",
    22: "Master Number 22 — The Master Builder. Destined to create lasting impact on the world.",
    33: "Master Number 33 — The Master Teacher. The highest vibration of compassion and divine service."
  };
  window.nmCalculate = function() {
    var dob  = document.getElementById('nm-dob').value.trim();
    var parts = dob.split(/[\/\-\.]/);
    if (parts.length !== 3) { alert('Please enter date as DD/MM/YYYY'); return; }
    var d = parseInt(parts[0],10), m = parseInt(parts[1],10), y = parseInt(parts[2],10);
    if (isNaN(d)||isNaN(m)||isNaN(y)) { alert('Please enter a valid date'); return; }

    function reduce(n) {
      while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
        n = String(n).split('').reduce(function(a,b){ return a + parseInt(b,10); }, 0);
      }
      return n;
    }

    var mulank   = reduce(d);
    var fullSum  = String(d)+String(m)+String(y);
    var bhagyank = reduce(fullSum.split('').reduce(function(a,b){ return a+parseInt(b,10); },0));

    document.getElementById('nm-mulank').textContent   = mulank;
    document.getElementById('nm-bhagyank').textContent = bhagyank;
    document.getElementById('nm-msg').textContent      =
      'Birth Number ' + mulank + ': ' + (msgs[mulank]||'') +
      '\n\nDestiny Number ' + bhagyank + ': ' + (msgs[bhagyank]||'');
    document.getElementById('nm-result').style.display = 'block';
    document.getElementById('nm-result').scrollIntoView({ behavior:'smooth', block:'center' });
  };
})();
</script>

<!-- ============================================================
     SERVICES
     ============================================================ -->
<section class="nm-section nm-section-dark" id="services">
  <div class="nm-container nm-center">
    <div class="nm-label">हमारी सेवाएँ</div>
    <h2>Our Services</h2>
    <p style="color:var(--dim); max-width:560px; margin:0 auto; font-size:18px;">
      Every reading is personalised — no automated reports. Analysed by hand, in the authentic tradition of Vedic Ank Jyotish.
    </p>
    <div class="nm-services-grid">

      <div class="nm-service-card">
        <div class="nm-service-icon">🔢</div>
        <h3>Birth Number Analysis</h3>
        <span class="nm-service-deva">मूलांक विश्लेषण</span>
        <p>Complete analysis of your Mulank — personality traits, strengths, challenges, lucky colours, days, and life path guidance.</p>
        <a class="nm-btn nm-btn-gold" href="https://wa.me/919739105574?text=Namaste%2C%20I%20want%20Birth%20Number%20Analysis" target="_blank" rel="noopener">Book Now</a>
      </div>

      <div class="nm-service-card">
        <div class="nm-service-icon">📅</div>
        <h3>Yearly Forecast</h3>
        <span class="nm-service-deva">वार्षिक भविष्यफल</span>
        <p>Month-by-month numerological forecast — lucky dates, business decisions, relationship windows, and health cycles for the year.</p>
        <a class="nm-btn nm-btn-gold" href="https://wa.me/919739105574?text=Namaste%2C%20I%20want%20the%20Yearly%20Forecast" target="_blank" rel="noopener">Book Now</a>
      </div>

      <div class="nm-service-card featured">
        <div class="nm-service-badge">Most Popular</div>
        <div class="nm-service-icon">✍️</div>
        <h3>Name Correction</h3>
        <span class="nm-service-deva">नाम सुधार</span>
        <p>Align your name's vibration with your birth number. Unlock prosperity, health, and success through the science of Ank Jyotish.</p>
        <a class="nm-btn nm-btn-gold" href="https://wa.me/919739105574?text=Namaste%2C%20I%20want%20Name%20Correction" target="_blank" rel="noopener">Book Now</a>
      </div>

      <div class="nm-service-card">
        <div class="nm-service-icon">💼</div>
        <h3>Business Numerology</h3>
        <span class="nm-service-deva">व्यापार अंक विश्लेषण</span>
        <p>Lucky business name, logo colour, launch dates, and partner compatibility — everything to set your venture on the right vibration.</p>
        <a class="nm-btn nm-btn-gold" href="https://wa.me/919739105574?text=Namaste%2C%20I%20want%20Business%20Numerology" target="_blank" rel="noopener">Book Now</a>
      </div>

      <div class="nm-service-card">
        <div class="nm-service-icon">💑</div>
        <h3>Compatibility Reading</h3>
        <span class="nm-service-deva">संगतता विश्लेषण</span>
        <p>Numerological compatibility for couples, business partners, or friends — understand your combined vibration and potential friction points.</p>
        <a class="nm-btn nm-btn-gold" href="https://wa.me/919739105574?text=Namaste%2C%20I%20want%20Compatibility%20Reading" target="_blank" rel="noopener">Book Now</a>
      </div>

      <div class="nm-service-card">
        <div class="nm-service-icon">👶</div>
        <h3>Baby Name Numerology</h3>
        <span class="nm-service-deva">शिशु नाम अंक</span>
        <p>Give your child the best start — a name whose number harmonises with the birth number and the family's combined energy.</p>
        <a class="nm-btn nm-btn-gold" href="https://wa.me/919739105574?text=Namaste%2C%20I%20want%20Baby%20Name%20Numerology" target="_blank" rel="noopener">Book Now</a>
      </div>

    </div>
  </div>
</section>

<!-- ============================================================
     ABOUT — BOTH EXPERTS
     ============================================================ -->
<section class="nm-section nm-section-purple" id="about">
  <div class="nm-container nm-center">
    <div class="nm-label">हमारे विशेषज्ञ</div>
    <h2>Meet Our Experts</h2>
    <p style="color:var(--dim); max-width:580px; margin:0 auto 60px; font-size:18px;">
      30+ years of combined mastery in Vedic Numerology, Ank Jyotish, and Vastu Shastra.
    </p>

    <!-- Two expert cards side by side -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px;">

      <!-- Raghavendrra -->
      <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:14px; padding:40px 32px; text-align:center; transition:all 0.3s;"
           onmouseover="this.style.borderColor='var(--gold)'"
           onmouseout="this.style.borderColor='var(--border)'">
        <div style="position:relative; display:inline-block; margin-bottom:20px;">
          <img src="https://numank.vastuone.com/wp-content/uploads/2026/04/ChatGPT-Image-Apr-22-2026-06_58_26-AM.png"
               alt="Raghavendrra Hebbur"
               style="width:150px; height:150px; border-radius:50%; object-fit:cover; border:3px solid var(--gold); box-shadow:0 0 25px rgba(212,175,55,0.25);"
               loading="lazy">
          <div style="position:absolute; bottom:4px; right:4px; background:linear-gradient(135deg,#D4AF37,#B8960C); border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:13px;">✦</div>
        </div>
        <div style="font-family:var(--f-head); font-size:20px; font-weight:700; color:var(--gold); letter-spacing:1px; margin-bottom:4px;">Raghavendrra Hebbur</div>
        <div style="font-family:var(--f-deva); font-size:13px; color:var(--gold2); margin-bottom:6px;">Founder · Numank</div>
        <div style="font-family:var(--f-head); font-size:9px; letter-spacing:2px; color:var(--dim); text-transform:uppercase; margin-bottom:18px;">Numerologist · Vastu Expert · Bengaluru</div>
        <p style="font-size:16px; color:var(--dim); line-height:1.7; margin-bottom:22px;">
          15+ years in Vedic Numerology and Vastu Shastra. Founder of VastuOne.com and VardhiniVastu.com. Specialist in name correction, business numerology, and life-path guidance.
        </p>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <a class="nm-btn nm-btn-gold" href="https://wa.me/919739105574?text=Namaste%20Raghavendrra%20ji%2C%20I%20want%20a%20Numerology%20consultation" target="_blank" rel="noopener">
            Book with Raghavendrra
          </a>
          <a class="nm-btn nm-btn-outline" href="tel:+919739105574" style="font-size:11px;">
            📞 +91 97391 05574
          </a>
        </div>
      </div>

      <!-- AS Bagga -->
      <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:14px; padding:40px 32px; text-align:center; transition:all 0.3s;"
           onmouseover="this.style.borderColor='var(--gold)'"
           onmouseout="this.style.borderColor='var(--border)'">
        <div style="position:relative; display:inline-block; margin-bottom:20px;">
          <img src="https://numank.vastuone.com/wp-content/uploads/2026/04/AS_Bagga.jpg"
               alt="Apar Singh Bagga — Senior Numerologist"
               style="width:150px; height:150px; border-radius:50%; object-fit:cover; border:3px solid var(--gold); box-shadow:0 0 25px rgba(212,175,55,0.25);"
               loading="lazy">
          <div style="position:absolute; bottom:4px; right:4px; background:linear-gradient(135deg,#D4AF37,#B8960C); border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; font-size:13px;">✦</div>
        </div>
        <div style="font-family:var(--f-head); font-size:20px; font-weight:700; color:var(--gold); letter-spacing:1px; margin-bottom:4px;">Apar Singh Bagga</div>
        <div style="font-family:var(--f-deva); font-size:13px; color:var(--gold2); margin-bottom:6px;">Senior Numerologist · A.S. Bagga</div>
        <div style="font-family:var(--f-head); font-size:9px; letter-spacing:2px; color:var(--dim); text-transform:uppercase; margin-bottom:18px;">Numerologist · Vastu Expert · Roorkee</div>
        <p style="font-size:16px; color:var(--dim); line-height:1.7; margin-bottom:22px;">
          15+ years across all disciplines of numerology — name correction, business, compatibility, mobile &amp; vehicle numbers, baby naming, and Vastu consultancy.
        </p>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <a class="nm-btn nm-btn-gold" href="https://wa.me/919119704509?text=Namaste%20AS%20Bagga%20ji%2C%20I%20want%20a%20Numerology%20consultation" target="_blank" rel="noopener">
            Book with A.S. Bagga
          </a>
          <a class="nm-btn nm-btn-outline" href="tel:+919119704509" style="font-size:11px;">
            📞 +91 91197 04509
          </a>
        </div>
      </div>

    </div>

    <!-- Read More link -->
    <div style="margin-top:40px;">
      <a class="nm-btn nm-btn-outline" href="<?php echo home_url('/about'); ?>">
        Read Full Profiles →
      </a>
    </div>

  </div>
</section>

<style>
@media (max-width: 680px) {
  #about .nm-container > div[style*="grid-template-columns:1fr 1fr"] {
    grid-template-columns: 1fr !important;
  }
}
</style>

<!-- ============================================================
     TESTIMONIALS
     ============================================================ -->
<section class="nm-section nm-section-deeper">
  <div class="nm-container nm-center">
    <div class="nm-label">क्या कहते हैं लोग</div>
    <h2>What Clients Say</h2>
    <div class="nm-testi-grid">

      <div class="nm-testi-card">
        <div class="nm-testi-stars">★★★★★</div>
        <p class="nm-testi-text">"Raghavendrra ji's name correction changed the energy around my business within weeks. The revenue doubled in 3 months. Pure Vedic wisdom."</p>
        <div class="nm-testi-author">Priya Sharma</div>
        <div class="nm-testi-city">Entrepreneur · Bengaluru</div>
      </div>

      <div class="nm-testi-card">
        <div class="nm-testi-stars">★★★★★</div>
        <p class="nm-testi-text">"The yearly forecast was remarkably accurate. He told me the exact months to make big decisions and which ones to stay quiet. I followed it — best year of my life."</p>
        <div class="nm-testi-author">Arjun Mehta</div>
        <div class="nm-testi-city">IT Professional · Pune</div>
      </div>

      <div class="nm-testi-card">
        <div class="nm-testi-stars">★★★★★</div>
        <p class="nm-testi-text">"We named our baby daughter using Numank's guidance. Now at 2 years old she is bright, healthy, and brings joy to everyone. Thank you Raghavendrra ji."</p>
        <div class="nm-testi-author">Sunita &amp; Ravi Kulkarni</div>
        <div class="nm-testi-city">Dubai, UAE</div>
      </div>

    </div>
  </div>
</section>

<!-- ============================================================
     CTA BANNER
     ============================================================ -->
<div class="nm-cta-banner">
  <div class="nm-container nm-center">
    <div class="nm-label">अभी शुरू करें</div>
    <h2>Ready to Know Your Numbers?</h2>
    <p>Book a personal consultation with Raghavendrra Hebbur or A.S. Bagga and discover the cosmic blueprint hidden in your birth date and name.</p>
    <a class="nm-btn nm-btn-gold" style="font-size:13px; padding:16px 44px;" href="https://wa.me/919739105574?text=Namaste%20Raghavendrra%20ji%2C%20I%20want%20a%20Numerology%20consultation" target="_blank" rel="noopener">
      ✦ &nbsp; Book on WhatsApp &nbsp; ✦
    </a>
    &nbsp;&nbsp;
    <a class="nm-btn nm-btn-outline" href="tel:+919739105574">
      📞 &nbsp; Call Now
    </a>
  </div>
</div>

<?php get_footer(); ?>
