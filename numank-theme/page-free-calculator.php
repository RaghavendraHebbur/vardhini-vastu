<?php
/*
Template Name: Calculator Page
*/
get_header(); ?>

<div class="nm-page-hero">
  <div class="nm-container nm-center">
    <div class="nm-label">निःशुल्क गणना</div>
    <h1>Free Numerology Calculator</h1>
    <p style="color:var(--dim); font-size:18px; max-width:560px; margin:0 auto;">
      Find your Mulank (Birth Number) and Bhagyank (Destiny Number) — free, instant, Vedic.
    </p>
  </div>
</div>

<section class="nm-section nm-section-dark">
  <div class="nm-container nm-center">

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
        <a class="nm-btn nm-btn-gold" href="https://wa.me/919739105574?text=Namaste%2C%20I%20used%20the%20free%20calculator%20and%20want%20a%20detailed%20reading" target="_blank" rel="noopener">
          Get My Full Report from Raghavendrra →
        </a>
      </div>
    </div>

    <div style="margin-top:70px; max-width:780px; margin-left:auto; margin-right:auto; text-align:left;">
      <h2 style="text-align:center; margin-bottom:40px;">What Do Your Numbers Mean?</h2>
      <?php
      $defs = array(
        1 => array('planet'=>'Sun · सूर्य',     'text'=>'You are a born leader. Independent, creative, and pioneering, Number 1 people are driven by a need to achieve and express their individuality. Ruled by the Sun, you shine brightest when you are in charge of your own path.'),
        2 => array('planet'=>'Moon · चंद्र',   'text'=>'You are intuitive and diplomatic. Number 2 people are deeply sensitive, cooperative, and gifted with emotional intelligence. Ruled by the Moon, you are a natural mediator who brings harmony to every environment.'),
        3 => array('planet'=>'Jupiter · गुरु', 'text'=>'You are joyful and expressive. Number 3 people are creative, optimistic, and gifted communicators. Ruled by Jupiter, you attract abundance and inspire others through your enthusiasm and warmth.'),
        4 => array('planet'=>'Rahu · राहु',    'text'=>'You are disciplined and unconventional. Number 4 people are hardworking, systematic, and often ahead of their time. Ruled by Rahu, you build foundations that last — even when the world does not yet understand your vision.'),
        5 => array('planet'=>'Mercury · बुध',  'text'=>'You are adventurous and versatile. Number 5 people are freedom-loving, quick-witted, and endlessly curious. Ruled by Mercury, you thrive on variety and are gifted at communication, travel, and business.'),
        6 => array('planet'=>'Venus · शुक्र',  'text'=>'You are nurturing and artistic. Number 6 people are responsible, loving, and drawn to beauty and harmony. Ruled by Venus, you are a natural healer and home-maker whose life purpose is to care and create.'),
        7 => array('planet'=>'Ketu · केतु',    'text'=>'You are spiritual and introspective. Number 7 people are seekers of truth — philosophical, perceptive, and deeply intuitive. Ruled by Ketu, you are a natural mystic who sees beyond the surface of things.'),
        8 => array('planet'=>'Saturn · शनि',   'text'=>'You are powerful and destined for success. Number 8 people are ambitious, resilient, and built for great material and spiritual achievement. Ruled by Saturn, your life is a journey of mastery through discipline.'),
        9 => array('planet'=>'Mars · मंगल',    'text'=>'You are the highest vibration. Number 9 people are courageous, compassionate, and universally minded. Ruled by Mars, you are a humanitarian who completes cycles and inspires others through your example.'),
      );
      foreach ($defs as $n => $d) :
      ?>
      <div style="display:flex; gap:24px; align-items:flex-start; margin-bottom:36px; padding-bottom:36px; border-bottom:1px solid var(--border);">
        <div style="font-family:var(--f-head); font-size:52px; font-weight:900; color:var(--gold); text-shadow:0 0 15px rgba(212,175,55,0.4); flex-shrink:0; min-width:60px; text-align:center; line-height:1;">
          <?php echo $n; ?>
        </div>
        <div>
          <div style="font-family:var(--f-head); font-size:11px; color:var(--gold); letter-spacing:2px; text-transform:uppercase; margin-bottom:6px; opacity:0.8;"><?php echo $d['planet']; ?></div>
          <p style="color:var(--dim); font-size:17px; line-height:1.75; margin:0;"><?php echo $d['text']; ?></p>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

  </div>
</section>

<script>
(function(){
  var msgs = {
    1:"Born leader. The Sun (सूर्य) rules you — independent, ambitious, pioneering.",
    2:"The Moon (चंद्र) guides you — sensitive, intuitive, natural peacemaker.",
    3:"Jupiter (गुरु) blesses you — creative, joyful, gifted communicator.",
    4:"Rahu (राहु) shapes you — disciplined, unconventional, hardworking.",
    5:"Mercury (बुध) energises you — adventurous, versatile, freedom-loving.",
    6:"Venus (शुक्र) adorns you — nurturing, artistic, harmony-seeking.",
    7:"Ketu (केतु) deepens you — spiritual, introspective, psychically gifted.",
    8:"Saturn (शनि) tests and rewards you — powerful, ambitious, destined for success.",
    9:"Mars (मंगल) fires you — courageous, humanitarian, highest vibration.",
    11:"Master Number 11 — The Intuitive Illuminator. Rare spiritual gift.",
    22:"Master Number 22 — The Master Builder. Destined to create lasting impact.",
    33:"Master Number 33 — The Master Teacher. Highest vibration of compassion."
  };
  window.nmCalculate = function(){
    var dob=document.getElementById('nm-dob').value.trim();
    var parts=dob.split(/[\/\-\.]/);
    if(parts.length!==3){alert('Please enter date as DD/MM/YYYY');return;}
    var d=parseInt(parts[0],10),m=parseInt(parts[1],10),y=parseInt(parts[2],10);
    if(isNaN(d)||isNaN(m)||isNaN(y)){alert('Please enter a valid date');return;}
    function reduce(n){while(n>9&&n!==11&&n!==22&&n!==33){n=String(n).split('').reduce(function(a,b){return a+parseInt(b,10);},0);}return n;}
    var mulank=reduce(d);
    var sum=String(d)+String(m)+String(y);
    var bhagyank=reduce(sum.split('').reduce(function(a,b){return a+parseInt(b,10);},0));
    document.getElementById('nm-mulank').textContent=mulank;
    document.getElementById('nm-bhagyank').textContent=bhagyank;
    document.getElementById('nm-msg').textContent='Birth Number '+mulank+': '+(msgs[mulank]||'')+'\n\nDestiny Number '+bhagyank+': '+(msgs[bhagyank]||'');
    document.getElementById('nm-result').style.display='block';
    document.getElementById('nm-result').scrollIntoView({behavior:'smooth',block:'center'});
  };
})();
</script>

<?php get_footer(); ?>
