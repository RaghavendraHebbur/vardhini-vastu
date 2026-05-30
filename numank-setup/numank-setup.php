<?php
/*
Plugin Name: Numank Website Setup
Description: Premium numerology website — pages, custom header, design & SEO.
Version: 4.0
Author: Raghavendrra Hebbur
*/

if ( ! defined( 'ABSPATH' ) ) exit;

/* ═══════════════════════════════════════════
   ADMIN
═══════════════════════════════════════════ */

add_action( 'admin_notices', 'nmk_show_button' );
function nmk_show_button() {
    $run   = wp_nonce_url( admin_url( '?nmk_run=1' ), 'nmk_run' );
    $reset = wp_nonce_url( admin_url( '?nmk_reset=1' ), 'nmk_reset' );
    if ( ! get_option( 'nmk_done' ) ) {
        echo '<div class="notice notice-warning"><p><strong>Numank:</strong> &mdash; <a href="' . esc_url( $run ) . '" class="button button-primary">&#9733; Create All Website Pages Now</a></p></div>';
    } else {
        echo '<div class="notice notice-success is-dismissible"><p><strong>Numank Setup Complete!</strong> &nbsp;<a href="' . esc_url( home_url() ) . '" target="_blank">View Website &rarr;</a> &nbsp;&nbsp; <a href="' . esc_url( $reset ) . '" class="button">Refresh All Pages</a></p></div>';
    }
}

add_action( 'admin_init', 'nmk_maybe_run' );
function nmk_maybe_run() {
    if ( isset( $_GET['nmk_run'] ) && check_admin_referer( 'nmk_run' ) && current_user_can( 'manage_options' ) ) {
        nmk_run_all();
    }
    if ( isset( $_GET['nmk_reset'] ) && check_admin_referer( 'nmk_reset' ) && current_user_can( 'manage_options' ) ) {
        delete_option( 'nmk_done' );
        wp_redirect( admin_url() );
        exit;
    }
}

function nmk_run_all() {
    $ids = nmk_pages();
    nmk_site_settings( $ids );
    nmk_menu( $ids );
    nmk_blog_posts();
    update_option( 'nmk_done', 1 );
    wp_redirect( admin_url() );
    exit;
}

/* ═══════════════════════════════════════════
   CUSTOM HEADER (full control, no theme dependency)
═══════════════════════════════════════════ */

add_action( 'wp_body_open', 'nmk_header' );
function nmk_header() {
    $home = home_url( '/' );
    $slugs = array(
        'about'        => 'about',
        'consult'      => 'personal-consultation',
        'name'         => 'name-correction',
        'biz'          => 'business-numerology',
        'baby'         => 'baby-name-numerology',
        'mobile'       => 'mobile-number-numerology',
        'vastu'        => 'vastu-consultation',
        'courses'      => 'numerology-courses',
        'testimonials' => 'testimonials',
        'faq'          => 'faq',
        'blog'         => 'blog',
        'contact'      => 'contact',
    );
    $u = array();
    foreach ( $slugs as $k => $slug ) {
        $pg   = get_page_by_path( $slug );
        $u[$k] = $pg ? get_permalink( $pg->ID ) : $home . $slug . '/';
    }
    ?>
<header class="nmk-hdr" id="nmk-hdr">
  <div class="nmk-hdr-in">
    <a href="<?php echo esc_url( $home ); ?>" class="nmk-logo">NUM<em>A</em>NK</a>
    <nav class="nmk-nav" id="nmk-nav" aria-label="Main navigation">
      <ul>
        <li><a href="<?php echo esc_url( $home ); ?>">Home</a></li>
        <li><a href="<?php echo esc_url( $u['about'] ); ?>">About</a></li>
        <li class="nmk-has-drop">
          <a href="#" onclick="return false">Services <span class="nmk-arr">&#9660;</span></a>
          <ul class="nmk-drop">
            <li><a href="<?php echo esc_url( $u['consult'] ); ?>">Personal Consultation</a></li>
            <li><a href="<?php echo esc_url( $u['name'] ); ?>">Name Correction</a></li>
            <li><a href="<?php echo esc_url( $u['biz'] ); ?>">Business Numerology</a></li>
            <li><a href="<?php echo esc_url( $u['baby'] ); ?>">Baby Name Numerology</a></li>
            <li><a href="<?php echo esc_url( $u['mobile'] ); ?>">Mobile Number</a></li>
            <li><a href="<?php echo esc_url( $u['vastu'] ); ?>">Vastu Consultation</a></li>
          </ul>
        </li>
        <li><a href="<?php echo esc_url( $u['courses'] ); ?>">Courses</a></li>
        <li><a href="<?php echo esc_url( $u['testimonials'] ); ?>">Testimonials</a></li>
        <li><a href="<?php echo esc_url( $u['blog'] ); ?>">Blog</a></li>
        <li><a href="<?php echo esc_url( $u['contact'] ); ?>">Contact</a></li>
      </ul>
    </nav>
    <div class="nmk-hdr-right">
      <a href="tel:+919739105574" class="nmk-hdr-cta">&#128222; Book Now</a>
      <button class="nmk-ham" id="nmk-ham" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>
    <?php
}

/* ═══════════════════════════════════════════
   JAVASCRIPT
═══════════════════════════════════════════ */

add_action( 'wp_footer', 'nmk_js' );
function nmk_js() {
    ?>
<script>
(function(){
  var hdr = document.getElementById('nmk-hdr');
  var ham = document.getElementById('nmk-ham');
  var nav = document.getElementById('nmk-nav');
  // Sticky shadow
  window.addEventListener('scroll', function(){
    if(window.scrollY > 40){ hdr.classList.add('scrolled'); }
    else { hdr.classList.remove('scrolled'); }
  });
  // Mobile menu toggle
  if(ham){
    ham.addEventListener('click', function(){
      nav.classList.toggle('open');
      ham.classList.toggle('active');
    });
  }
  // Mobile dropdown toggle
  var drops = document.querySelectorAll('.nmk-has-drop > a');
  drops.forEach(function(a){
    a.addEventListener('click', function(e){
      if(window.innerWidth <= 1024){
        e.preventDefault();
        var li = this.parentNode;
        li.classList.toggle('open');
      }
    });
  });
})();
</script>
    <?php
}

/* ═══════════════════════════════════════════
   STYLES
═══════════════════════════════════════════ */

add_action( 'wp_head', 'nmk_styles' );
function nmk_styles() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
    echo '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">';
    echo '<style id="nmk-css">' . nmk_css() . '</style>';
}

function nmk_css() {
    return '
/* ── TOKENS ── */
:root{
  --d:#160f06; --d2:#1e1509; --d3:#271b0c;
  --cr:#f2ede4; --cr2:#e8e1d5; --cr3:#ddd5c5;
  --gd:#c9a440; --gl:#e0bc5a; --gd2:#9a7b28;
  --tx:#1c1810; --tl:#ede5d8; --mu:#6b5c42; --ml:#9a8870;
  --bd:rgba(201,164,64,.22); --bl:rgba(60,40,10,.12);
  --hh:76px;
}

/* ── RESET ── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  background:var(--cr);color:var(--tx);
  font-family:"Jost",sans-serif;font-size:16px;line-height:1.75;
  padding-top:var(--hh) !important;
}
h1,h2,h3,h4{font-family:"Cormorant Garamond",serif;line-height:1.25;font-weight:600}
p{line-height:1.8}
img{max-width:100%;height:auto;display:block}
a{color:var(--gd);text-decoration:none;transition:color .2s}
a:hover{color:var(--gl)}

/* ── HIDE THEME HEADER & FOOTER TWEAKS ── */
.site-header,#masthead,.ast-primary-header-bar,
.main-header-bar,.ast-above-header-section{display:none !important}
.site-footer,.ast-small-footer,#colophon{
  background:var(--d) !important;border-top:1px solid var(--bd) !important;
  color:var(--ml) !important;font-family:"Jost",sans-serif !important;
  font-size:.8rem !important;letter-spacing:1px !important;
}
.site-footer a{color:var(--gd) !important}
.entry-header{display:none !important}
.entry-content,.ast-article-single,.post-content{padding:0 !important;margin:0 !important}
.page .entry-content>p:empty{display:none}
.ast-container{max-width:100% !important;padding:0 !important}

/* ── CUSTOM HEADER ── */
.nmk-hdr{
  position:fixed;top:0;left:0;right:0;z-index:99999;
  height:var(--hh);
  background:rgba(22,15,6,.97);
  border-bottom:1px solid rgba(201,164,64,.18);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  transition:box-shadow .3s;
}
.nmk-hdr.scrolled{box-shadow:0 4px 32px rgba(0,0,0,.5)}
.nmk-hdr-in{
  max-width:1280px;margin:0 auto;padding:0 32px;
  height:100%;display:flex;align-items:center;gap:32px;
}
.nmk-logo{
  font-family:"Cormorant Garamond",serif;font-size:1.55rem;
  font-weight:700;letter-spacing:6px;text-transform:uppercase;
  color:#fff;text-decoration:none;white-space:nowrap;flex-shrink:0;
  transition:color .2s;
}
.nmk-logo em{color:var(--gd);font-style:normal}
.nmk-logo:hover{color:var(--gl)}
.nmk-nav{flex:1;display:flex;justify-content:center}
.nmk-nav ul{display:flex;list-style:none;gap:2px;margin:0;padding:0;align-items:center}
.nmk-nav>ul>li{position:relative}
.nmk-nav>ul>li>a{
  display:flex;align-items:center;gap:4px;padding:8px 13px;
  font-family:"Jost",sans-serif;font-size:10px;font-weight:500;
  letter-spacing:2.5px;text-transform:uppercase;
  color:rgba(237,229,216,.75);text-decoration:none;transition:color .2s;white-space:nowrap;
}
.nmk-nav>ul>li>a:hover{color:var(--gd)}
.nmk-arr{font-size:7px;opacity:.6;transition:transform .2s}
.nmk-has-drop:hover .nmk-arr{transform:rotate(180deg)}
/* Dropdown */
.nmk-drop{
  position:absolute;top:calc(100% + 4px);left:0;
  min-width:220px;background:var(--d2);
  border:1px solid var(--bd);border-top:2px solid var(--gd);
  list-style:none;padding:6px 0;
  opacity:0;visibility:hidden;transform:translateY(-8px);
  transition:all .25s;z-index:100;box-shadow:0 8px 32px rgba(0,0,0,.5);
}
.nmk-has-drop:hover .nmk-drop{opacity:1;visibility:visible;transform:translateY(0)}
.nmk-drop li a{
  display:block;padding:10px 20px;
  font-family:"Jost",sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;
  color:var(--ml);text-decoration:none;border-bottom:1px solid rgba(201,164,64,.07);
  transition:all .2s;
}
.nmk-drop li a:hover{color:var(--gd);background:rgba(201,164,64,.05);padding-left:28px}
/* Header CTA */
.nmk-hdr-right{display:flex;align-items:center;gap:16px;flex-shrink:0}
.nmk-hdr-cta{
  padding:9px 22px;border:1px solid var(--gd);
  color:var(--gd);font-family:"Jost",sans-serif;
  font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;
  text-decoration:none;white-space:nowrap;transition:all .3s;
}
.nmk-hdr-cta:hover{background:var(--gd);color:var(--d)}
/* Hamburger */
.nmk-ham{
  display:none;flex-direction:column;gap:5px;
  background:none;border:none;cursor:pointer;padding:4px;flex-shrink:0;
}
.nmk-ham span{
  display:block;width:24px;height:1.5px;background:var(--gd);
  transition:all .3s;transform-origin:center;
}
.nmk-ham.active span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
.nmk-ham.active span:nth-child(2){opacity:0}
.nmk-ham.active span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}
/* Mobile nav */
@media(max-width:1024px){
  .nmk-nav{display:none}
  .nmk-hdr-cta{display:none}
  .nmk-ham{display:flex}
}
.nmk-nav.open{
  display:flex !important;position:fixed;
  top:var(--hh);left:0;right:0;
  background:var(--d);border-bottom:1px solid var(--bd);
  flex-direction:column;padding:20px 28px 28px;z-index:99998;
  max-height:calc(100vh - var(--hh));overflow-y:auto;
}
.nmk-nav.open ul{flex-direction:column;gap:0;width:100%}
.nmk-nav.open>ul>li>a{
  padding:14px 0;border-bottom:1px solid rgba(201,164,64,.1);
  font-size:11px;justify-content:space-between;
}
.nmk-nav.open .nmk-drop{
  position:static;opacity:0;visibility:hidden;max-height:0;overflow:hidden;
  transform:none;background:transparent;border:none;box-shadow:none;
  transition:all .3s;padding:0;
}
.nmk-nav.open .nmk-has-drop.open .nmk-drop{opacity:1;visibility:visible;max-height:400px;padding:4px 0 4px 16px}
.nmk-nav.open .nmk-drop li a{border-bottom:1px solid rgba(201,164,64,.06);font-size:10px}
.nmk-nav.open .nmk-hdr-cta{display:block;margin-top:20px;text-align:center;padding:14px}

/* ── BUTTONS ── */
.nmk-btn,.nmk-btn-o,.nmk-btn-dk{
  display:inline-flex;align-items:center;gap:8px;padding:14px 36px;
  font-family:"Jost",sans-serif;font-weight:500;font-size:11px;
  letter-spacing:3px;text-transform:uppercase;
  transition:all .3s;cursor:pointer;text-decoration:none;
}
.nmk-btn{background:var(--gd);color:var(--d);border:1px solid var(--gd)}
.nmk-btn:hover{background:var(--gl);color:var(--d);border-color:var(--gl);box-shadow:0 6px 28px rgba(201,164,64,.35);transform:translateY(-2px)}
.nmk-btn-o{background:transparent;color:var(--gd);border:1px solid var(--gd)}
.nmk-btn-o:hover{background:var(--gd);color:var(--d);transform:translateY(-2px)}
.nmk-btn-dk{background:transparent;color:var(--tx);border:1px solid rgba(60,40,10,.3)}
.nmk-btn-dk:hover{background:var(--tx);color:var(--cr)}
.nmk-brow{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}

/* ── HERO ── */
.nmk-hero{
  min-height:100vh;background:var(--d);
  display:flex;align-items:center;justify-content:center;
  text-align:center;padding:80px 32px 80px;position:relative;overflow:hidden;
}
.nmk-hero::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 65% 55% at 50% 50%,rgba(201,164,64,.1) 0%,transparent 70%),
    repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(201,164,64,.035) 60px),
    repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(201,164,64,.035) 60px);
}
/* Sacred geometry circle */
.nmk-hero::after{
  content:"";position:absolute;
  width:600px;height:600px;
  border:1px solid rgba(201,164,64,.07);border-radius:50%;
  top:50%;left:50%;transform:translate(-50%,-50%);
  pointer-events:none;
}
.nmk-hero-in{position:relative;z-index:2;max-width:860px;margin:0 auto}
.nmk-eyebrow{
  display:inline-block;font-family:"Jost",sans-serif;
  font-size:10px;letter-spacing:5px;text-transform:uppercase;
  color:var(--gd);margin-bottom:24px;
}
.nmk-hero h1{
  font-size:clamp(3rem,7vw,6.5rem);font-weight:700;
  color:#fff;letter-spacing:-2px;margin-bottom:10px;
}
.nmk-hero h1 em{color:var(--gd);font-style:normal}
.nmk-hero-tag{
  font-family:"Cormorant Garamond",serif;font-style:italic;
  font-size:clamp(1.1rem,2.5vw,1.55rem);color:var(--ml);margin-bottom:20px;
}
.nmk-rule-g{
  width:80px;height:1px;
  background:linear-gradient(90deg,transparent,var(--gd),transparent);
  margin:20px auto 36px;
}
.nmk-hero-sub{font-size:1rem;color:var(--ml);max-width:580px;margin:0 auto 52px}

/* ── STATS ── */
.nmk-stats{display:flex;justify-content:center;gap:56px;flex-wrap:wrap;margin-bottom:52px}
.nmk-stat strong{
  display:block;font-family:"Cormorant Garamond",serif;
  font-size:3.2rem;font-weight:700;color:var(--gd);line-height:1;
}
.nmk-stat span{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--ml);display:block;margin-top:8px}

/* ── SHORT HERO (inner pages) ── */
.nmk-short{
  background:var(--d);padding:80px 32px 72px;
  text-align:center;position:relative;overflow:hidden;
}
.nmk-short::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 60% 70% at 50% 50%,rgba(201,164,64,.08) 0%,transparent 70%),
    repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(201,164,64,.03) 60px),
    repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(201,164,64,.03) 60px);
}
.nmk-short-in{position:relative;z-index:2;max-width:720px;margin:0 auto}
.nmk-short h1{font-size:clamp(2.2rem,5vw,4rem);color:#fff;margin-bottom:14px}
.nmk-short h1 em{color:var(--gd);font-style:normal}
.nmk-short p{color:var(--ml);font-size:1.05rem}
.nmk-short .nmk-brow{margin-top:32px}

/* ── SECTION ── */
.nmk-s{padding:96px 32px;max-width:1160px;margin:0 auto}
.nmk-sh{margin-bottom:60px}
.nmk-sh.c{text-align:center}
.nmk-sh h2{font-size:clamp(2rem,4vw,3.2rem);color:inherit;margin-bottom:12px}
.nmk-sh h2 em{color:var(--gd);font-style:normal}
.nmk-sh p{font-size:1rem;color:var(--mu);max-width:580px;line-height:1.8}
.nmk-sh.c p{margin:0 auto}
.nmk-rule{width:44px;height:1px;background:var(--gd);margin:16px 0 0}
.nmk-sh.c .nmk-rule{margin:16px auto 0}

/* ── SERVICE GRID ── */
.nmk-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:1px;background:var(--bl);border:1px solid var(--bl);
}
.nmk-card{background:var(--cr);padding:48px 36px;transition:all .3s;position:relative;overflow:hidden}
.nmk-card::before{
  content:"";position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--gd),transparent);
  transform:scaleX(0);transform-origin:left;transition:transform .4s;
}
.nmk-card:hover{background:var(--cr2)}
.nmk-card:hover::before{transform:scaleX(1)}
.nmk-card-n{
  font-family:"Cormorant Garamond",serif;font-size:3.5rem;font-weight:700;
  color:var(--gd);opacity:.3;line-height:1;margin-bottom:20px;display:block;
}
.nmk-card h3{font-size:1.45rem;color:var(--tx);margin-bottom:12px;font-weight:600}
.nmk-card p{color:var(--mu);font-size:.95rem;line-height:1.8}
.nmk-card .nmk-btn-dk{margin-top:28px;font-size:10px;padding:10px 22px}

/* ── DARK FEATURE CARDS ── */
.nmk-dgrid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:1px;background:rgba(201,164,64,.08);border:1px solid var(--bd);
}
.nmk-dc{background:var(--d2);padding:44px 36px;transition:background .3s}
.nmk-dc:hover{background:var(--d3)}
.nmk-dc h3{font-size:1.4rem;color:var(--gd);margin-bottom:12px}
.nmk-dc p{color:var(--ml);font-size:.95rem;line-height:1.8}

/* ── SPLIT LAYOUT ── */
.nmk-split{display:grid;grid-template-columns:1fr 1.5fr;gap:80px;align-items:center}
.nmk-split-img{position:relative;flex-shrink:0}
.nmk-split-img img{width:100%;border:1px solid var(--bl)}
.nmk-split-img::after{
  content:"";position:absolute;top:20px;left:20px;right:-20px;bottom:-20px;
  border:1px solid rgba(201,164,64,.25);pointer-events:none;z-index:-1;
}
.nmk-badges{display:flex;flex-wrap:wrap;gap:8px;margin-top:20px}
.nmk-badge{
  font-size:9px;letter-spacing:2px;text-transform:uppercase;
  color:var(--gd);border:1px solid var(--bd);padding:5px 14px;
}
.nmk-split-text h2{margin-bottom:16px}
.nmk-split-text p{color:var(--mu);margin-bottom:14px}
.nmk-split-text ul{list-style:none;padding:0;margin:20px 0 32px}
.nmk-split-text ul li{
  padding:10px 0;color:var(--tx);
  display:flex;gap:12px;align-items:flex-start;
  border-bottom:1px solid var(--bl);font-size:.95rem;
}
.nmk-split-text ul li::before{content:"✦";color:var(--gd);flex-shrink:0;margin-top:2px;font-size:.7rem}

/* ── QUOTE BAND ── */
.nmk-quote-band{background:var(--d);padding:72px 32px;border-top:1px solid var(--bd);border-bottom:1px solid var(--bd)}
.nmk-quote-band-in{max-width:800px;margin:0 auto;text-align:center}
.nmk-quote-band blockquote{
  font-family:"Cormorant Garamond",serif;font-size:clamp(1.3rem,3vw,2.1rem);
  font-style:italic;color:var(--tl);line-height:1.65;margin:0;border:none;padding:0;
}
.nmk-quote-band blockquote em{color:var(--gd)}
.nmk-quote-band cite{display:block;margin-top:24px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--gd);font-style:normal}

/* ── TESTIMONIALS ── */
.nmk-tgrid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:1px;background:var(--bl);border:1px solid var(--bl);
}
.nmk-tc{background:var(--cr);padding:44px 36px;position:relative}
.nmk-tc::before{content:"\201C";font-family:"Cormorant Garamond",serif;font-size:5rem;color:var(--gd);opacity:.15;position:absolute;top:16px;left:28px;line-height:1}
.nmk-stars{color:var(--gd);font-size:.85rem;letter-spacing:4px;margin-bottom:20px}
.nmk-tc blockquote{
  font-family:"Cormorant Garamond",serif;font-size:1.1rem;
  font-style:italic;color:var(--tx);line-height:1.75;margin:0 0 20px;border:none;padding:0;
}
.nmk-tc-name{font-weight:600;font-size:.85rem;letter-spacing:1px;text-transform:uppercase;color:var(--tx)}
.nmk-tc-loc{font-size:.8rem;color:var(--mu);margin-top:2px}

/* ── STEPS ── */
.nmk-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:40px}
.nmk-step{text-align:center;padding:0 20px}
.nmk-step-n{
  width:60px;height:60px;border:1px solid var(--gd);border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-family:"Cormorant Garamond",serif;font-size:1.5rem;font-weight:700;
  color:var(--gd);margin:0 auto 20px;
}
.nmk-step h3{font-size:1.2rem;margin-bottom:8px;font-weight:600}
.nmk-step p{font-size:.9rem;color:var(--mu)}

/* ── FAQ ── */
.nmk-faqs{max-width:780px;margin:0 auto}
.nmk-faq{border-bottom:1px solid var(--bl);padding:28px 0}
.nmk-fq{
  font-family:"Cormorant Garamond",serif;font-size:1.25rem;font-weight:600;
  color:var(--tx);margin-bottom:12px;
  display:flex;justify-content:space-between;align-items:flex-start;gap:16px;
}
.nmk-fq span{color:var(--gd);font-size:.9rem;flex-shrink:0;margin-top:4px}
.nmk-fa{color:var(--mu);font-size:.95rem;line-height:1.8}

/* ── CONTACT ── */
.nmk-ci{display:flex;align-items:center;gap:20px;margin-bottom:28px}
.nmk-ci-ico{
  width:48px;height:48px;border:1px solid var(--bl);flex-shrink:0;
  display:flex;align-items:center;justify-content:center;font-size:1.3rem;
}
.nmk-ci-text small{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--mu);display:block;margin-bottom:4px}
.nmk-ci-text a,.nmk-ci-text strong{color:var(--tx);font-weight:600;font-size:1.05rem}
.nmk-ci-text a:hover{color:var(--gd)}
.nmk-contact-box{padding:36px;background:var(--cr2);border:1px solid var(--bl);margin-top:36px}

/* ── CTA BAND ── */
.nmk-cta{
  background:var(--d);padding:96px 48px;text-align:center;
  border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);
}
.nmk-cta h2{font-size:clamp(2rem,4vw,3.5rem);color:#fff;margin-bottom:16px}
.nmk-cta h2 em{color:var(--gd);font-style:normal}
.nmk-cta p{color:var(--ml);font-size:1rem;margin-bottom:40px;max-width:520px;margin-left:auto;margin-right:auto}

/* ── FLOATING WA ── */
.nmk-wa{
  position:fixed;bottom:28px;right:28px;width:58px;height:58px;
  background:#25d366;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 20px rgba(37,211,102,.45);z-index:9999;
  transition:all .3s;text-decoration:none;
}
.nmk-wa:hover{transform:scale(1.12);background:#1fb659}
.nmk-wa svg{width:30px;height:30px;fill:#fff}

/* ── RESPONSIVE ── */
@media(max-width:900px){
  .nmk-split{grid-template-columns:1fr;gap:48px}
  .nmk-split-img::after{display:none}
}
@media(max-width:640px){
  .nmk-s{padding:64px 24px}
  .nmk-hero{padding:60px 24px 60px}
  .nmk-short{padding:60px 24px 56px}
  .nmk-cta{padding:64px 24px}
  .nmk-stats{gap:28px}
  .nmk-btn,.nmk-btn-o,.nmk-btn-dk{padding:12px 28px;font-size:10px}
  .nmk-quote-band{padding:56px 24px}
  .nmk-tgrid{grid-template-columns:1fr}
}
    ';
}

/* ═══════════════════════════════════════════
   SEO META TAGS + SCHEMA
═══════════════════════════════════════════ */

add_action( 'wp_head', 'nmk_seo', 2 );
function nmk_seo() {
    if ( defined( 'RANK_MATH_VERSION' ) || defined( 'WPSEO_VERSION' ) ) return;

    $site = 'https://numank.com';
    $img  = 'https://numank.com/wp-content/uploads/2026/04/unnamed-1.png';
    $phone = '+919739105574';

    $meta = array(
        'home'         => array( 'Numank — Expert Numerology Consultations | Raghavendrra Hebbur', 'Expert numerology consultations by Raghavendrra Hebbur. 5+ years, 1,200+ clients. Name correction, business numerology, baby names & Vastu in India. Call +91 97391 05574.' ),
        'about'        => array( 'About Raghavendrra Hebbur — Certified Numerologist & Vastu Expert | Numank', 'Raghavendrra Hebbur is a certified numerologist and Vastu consultant with 5+ years of practice and 1,200+ successful consultations across India.' ),
        'personal-consultation' => array( 'Personal Numerology Consultation | Life Path, Destiny & Soul Urge Numbers — Numank', 'Decode your Life Path, Destiny and Soul Urge numbers with expert numerologist Raghavendrra Hebbur. Online and offline personal numerology consultations.' ),
        'name-correction' => array( 'Numerology Name Correction Service | Align Your Name for Success — Numank', 'Numerology name correction by Raghavendrra Hebbur. Align your name vibration with your birth date for career success, financial harmony and better relationships.' ),
        'business-numerology' => array( 'Business Numerology Consultation | Lucky Business Name & Launch Date — Numank', 'Choose the right business name, registration date and lucky numbers for maximum success. Expert business numerology consultation by Raghavendrra Hebbur.' ),
        'baby-name-numerology' => array( 'Baby Name Numerology | Harmonious Names by Birth Star & Date — Numank', 'Get 5-10 harmonious baby names aligned with your child\'s birth star and birth date. Expert Vedic numerology baby name consultation by Raghavendrra Hebbur.' ),
        'mobile-number-numerology' => array( 'Mobile Number Numerology | Is Your Number Lucky? — Numank', 'Find out if your mobile number is attracting or blocking success. Expert mobile number numerology analysis by Raghavendrra Hebbur.' ),
        'vastu-consultation' => array( 'Vastu Consultation | Home & Office Vastu Shastra Expert — Numank', 'Expert Vastu Shastra consultation by Raghavendrra Hebbur — featured on vardhinivastu.com and vastuone.com. Home, office and business Vastu with numerology integration.' ),
        'numerology-courses' => array( 'Numerology Courses | Learn Chaldean & Pythagorean Numerology — Numank', 'Learn numerology with Raghavendrra Hebbur. Beginner to professional numerology courses. Get certified as a numerology practitioner — online and offline options.' ),
        'testimonials' => array( 'Client Testimonials | 1,200+ Success Stories — Numank', 'Read 1,200+ real client success stories. People whose careers, businesses and lives transformed through numerology consultations by Raghavendrra Hebbur.' ),
        'faq' => array( 'Numerology FAQ | Frequently Asked Questions — Numank', 'Frequently asked questions about numerology, name correction, baby names and Vastu consultation. Expert answers by numerologist Raghavendrra Hebbur.' ),
        'contact' => array( 'Contact Numank | Book Numerology Consultation — Raghavendrra Hebbur', 'Contact numerologist Raghavendrra Hebbur. Call or WhatsApp +91 97391 05574. Book personal consultation, name correction or business numerology session.' ),
    );

    $title = 'Numank — Where Numbers Reveal Destiny';
    $desc  = 'Expert numerology consultations by Raghavendrra Hebbur. 5+ years, 1,200+ clients across India.';
    $url   = ( is_ssl() ? 'https' : 'http' ) . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    if ( is_front_page() && isset( $meta['home'] ) ) {
        $title = $meta['home'][0];
        $desc  = $meta['home'][1];
    } elseif ( is_page() ) {
        global $post;
        $slug = $post->post_name;
        if ( isset( $meta[ $slug ] ) ) {
            $title = $meta[ $slug ][0];
            $desc  = $meta[ $slug ][1];
        }
    }

    echo '<meta name="description" content="' . esc_attr( $desc ) . '">' . "\n";
    echo '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">' . "\n";
    echo '<link rel="canonical" href="' . esc_url( $url ) . '">' . "\n";
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr( $title ) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr( $desc ) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url( $url ) . '">' . "\n";
    echo '<meta property="og:image" content="' . esc_url( $img ) . '">' . "\n";
    echo '<meta property="og:site_name" content="Numank">' . "\n";
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr( $title ) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr( $desc ) . '">' . "\n";
    echo '<meta name="twitter:image" content="' . esc_url( $img ) . '">' . "\n";

    // Schema.org — homepage only
    if ( is_front_page() ) {
        $schema = array(
            '@context'    => 'https://schema.org',
            '@graph'      => array(
                array(
                    '@type'       => 'LocalBusiness',
                    '@id'         => $site . '/#business',
                    'name'        => 'Numank',
                    'url'         => $site,
                    'telephone'   => $phone,
                    'image'       => $img,
                    'description' => 'Expert numerology consultations, name correction, business numerology, baby names and Vastu consultation by Raghavendrra Hebbur.',
                    'founder'     => array( '@type' => 'Person', 'name' => 'Raghavendrra Hebbur' ),
                    'areaServed'  => 'India',
                    'priceRange'  => '$$',
                    'sameAs'      => array( 'https://vardhinivastu.com', 'https://vastuone.com' ),
                    'hasOfferCatalog' => array(
                        '@type' => 'OfferCatalog',
                        'name'  => 'Numerology Services',
                        'itemListElement' => array(
                            array( '@type' => 'Offer', 'itemOffered' => array( '@type' => 'Service', 'name' => 'Personal Numerology Consultation' ) ),
                            array( '@type' => 'Offer', 'itemOffered' => array( '@type' => 'Service', 'name' => 'Name Correction' ) ),
                            array( '@type' => 'Offer', 'itemOffered' => array( '@type' => 'Service', 'name' => 'Business Numerology' ) ),
                            array( '@type' => 'Offer', 'itemOffered' => array( '@type' => 'Service', 'name' => 'Baby Name Numerology' ) ),
                            array( '@type' => 'Offer', 'itemOffered' => array( '@type' => 'Service', 'name' => 'Mobile Number Numerology' ) ),
                            array( '@type' => 'Offer', 'itemOffered' => array( '@type' => 'Service', 'name' => 'Vastu Consultation' ) ),
                        ),
                    ),
                ),
                array(
                    '@type'       => 'Person',
                    '@id'         => $site . '/#raghavendrra',
                    'name'        => 'Raghavendrra Hebbur',
                    'jobTitle'    => 'Numerologist and Vastu Consultant',
                    'url'         => $site,
                    'image'       => $img,
                    'sameAs'      => array( 'https://vardhinivastu.com', 'https://vastuone.com' ),
                    'knowsAbout'  => array( 'Chaldean Numerology', 'Pythagorean Numerology', 'Vastu Shastra', 'Name Correction', 'Baby Name Numerology' ),
                ),
            ),
        );
        echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
    }
}

// Title filter
add_filter( 'document_title_parts', 'nmk_title' );
function nmk_title( $parts ) {
    if ( defined( 'RANK_MATH_VERSION' ) || defined( 'WPSEO_VERSION' ) ) return $parts;
    if ( is_front_page() ) {
        $parts['title']   = 'Numank';
        $parts['tagline'] = 'Where Numbers Reveal Destiny';
    }
    return $parts;
}

/* ═══════════════════════════════════════════
   FLOATING WHATSAPP
═══════════════════════════════════════════ */

add_action( 'wp_footer', 'nmk_wa_btn' );
function nmk_wa_btn() {
    echo '<a href="https://wa.me/919739105574" class="nmk-wa" target="_blank" rel="noopener" aria-label="WhatsApp">';
    echo '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
    echo '</a>';
}

/* ═══════════════════════════════════════════
   SITE SETTINGS
═══════════════════════════════════════════ */

function nmk_site_settings( $ids ) {
    if ( isset( $ids['home'] ) ) {
        update_option( 'show_on_front', 'page' );
        update_option( 'page_on_front', $ids['home'] );
    }
    if ( isset( $ids['blog'] ) ) {
        update_option( 'page_for_posts', $ids['blog'] );
    }
    update_option( 'blogname', 'Numank' );
    update_option( 'blogdescription', 'Where Numbers Reveal Destiny' );
    update_option( 'permalink_structure', '/%postname%/' );
}

/* ═══════════════════════════════════════════
   PAGES
═══════════════════════════════════════════ */

function nmk_pages() {
    $pages = array(
        'home'         => array( 'Home',                    'nmk_pg_home' ),
        'about'        => array( 'About',                   'nmk_pg_about' ),
        'consult'      => array( 'Personal Consultation',   'nmk_pg_consult' ),
        'name'         => array( 'Name Correction',         'nmk_pg_name' ),
        'biz'          => array( 'Business Numerology',     'nmk_pg_biz' ),
        'baby'         => array( 'Baby Name Numerology',    'nmk_pg_baby' ),
        'mobile'       => array( 'Mobile Number Numerology','nmk_pg_mobile' ),
        'vastu'        => array( 'Vastu Consultation',      'nmk_pg_vastu' ),
        'courses'      => array( 'Numerology Courses',      'nmk_pg_courses' ),
        'testimonials' => array( 'Testimonials',            'nmk_pg_testimonials' ),
        'faq'          => array( 'FAQ',                     'nmk_pg_faq' ),
        'contact'      => array( 'Contact',                 'nmk_pg_contact' ),
        'blog'         => array( 'Blog',                    'nmk_pg_blog' ),
    );
    $ids = array();
    foreach ( $pages as $key => $data ) {
        $content  = call_user_func( $data[1] );
        $existing = get_page_by_path( sanitize_title( $data[0] ) );
        if ( $existing ) {
            wp_update_post( array( 'ID' => $existing->ID, 'post_content' => $content, 'post_status' => 'publish' ) );
            $ids[ $key ] = $existing->ID;
        } else {
            $id = wp_insert_post( array(
                'post_title'   => $data[0],
                'post_content' => $content,
                'post_status'  => 'publish',
                'post_type'    => 'page',
                'post_name'    => sanitize_title( $data[0] ),
            ) );
            if ( ! is_wp_error( $id ) ) { $ids[ $key ] = $id; }
        }
    }
    return $ids;
}

/* ═══════════════════════════════════════════
   MENU — Services dropdown
═══════════════════════════════════════════ */

function nmk_menu( $ids ) {
    $name = 'Main Menu';
    $mid  = wp_create_nav_menu( $name );
    if ( is_wp_error( $mid ) ) {
        $obj = get_term_by( 'name', $name, 'nav_menu' );
        if ( $obj ) { $mid = $obj->term_id; } else { return; }
    }

    if ( isset( $ids['home'] ) ) {
        wp_update_nav_menu_item( $mid, 0, array( 'menu-item-title' => 'Home', 'menu-item-object' => 'page', 'menu-item-object-id' => $ids['home'], 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish' ) );
    }
    if ( isset( $ids['about'] ) ) {
        wp_update_nav_menu_item( $mid, 0, array( 'menu-item-title' => 'About', 'menu-item-object' => 'page', 'menu-item-object-id' => $ids['about'], 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish' ) );
    }
    $svc = wp_update_nav_menu_item( $mid, 0, array( 'menu-item-title' => 'Services', 'menu-item-url' => '#', 'menu-item-type' => 'custom', 'menu-item-status' => 'publish' ) );
    $children = array( 'consult' => 'Personal Consultation', 'name' => 'Name Correction', 'biz' => 'Business Numerology', 'baby' => 'Baby Name Numerology', 'mobile' => 'Mobile Number', 'vastu' => 'Vastu Consultation' );
    foreach ( $children as $key => $label ) {
        if ( isset( $ids[ $key ] ) ) {
            wp_update_nav_menu_item( $mid, 0, array( 'menu-item-title' => $label, 'menu-item-object' => 'page', 'menu-item-object-id' => $ids[ $key ], 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish', 'menu-item-parent-id' => $svc ) );
        }
    }
    $top = array( 'courses' => 'Courses', 'testimonials' => 'Testimonials', 'blog' => 'Blog', 'contact' => 'Contact' );
    foreach ( $top as $key => $label ) {
        if ( isset( $ids[ $key ] ) ) {
            wp_update_nav_menu_item( $mid, 0, array( 'menu-item-title' => $label, 'menu-item-object' => 'page', 'menu-item-object-id' => $ids[ $key ], 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish' ) );
        }
    }
    $locs = get_theme_mod( 'nav_menu_locations' );
    if ( ! is_array( $locs ) ) { $locs = array(); }
    $locs['primary'] = $mid; $locs['menu-1'] = $mid;
    set_theme_mod( 'nav_menu_locations', $locs );
}

/* ═══════════════════════════════════════════
   BLOG POSTS
═══════════════════════════════════════════ */

function nmk_blog_posts() {
    $posts = array(
        array( 'What Is Numerology? A Complete Guide to the Power of Numbers', '<p>Numerology is the ancient metaphysical science of numbers — the study of how numbers influence your personality, destiny, relationships, and life path. Rooted in Chaldean and Pythagorean traditions, numerology reveals the hidden vibration behind your name and birth date. Book a personal numerology consultation with Raghavendrra Hebbur — Call or WhatsApp: +91 97391 05574.</p>' ),
        array( 'How Name Correction in Numerology Can Transform Your Life', '<p>Your name carries a specific numerical vibration that interacts with your birth date every single day. When these vibrations are misaligned, you may experience repeated setbacks in career, relationships, or finances. Name correction numerology by Raghavendrra Hebbur recommends subtle spelling adjustments that harmonize with your birth chart. Call +91 97391 05574 to book today.</p>' ),
        array( 'Business Numerology: Choose the Right Name and Launch Date for Success', '<p>In business, timing and naming are everything. Numerology helps entrepreneurs choose business names, registration dates, and brand identities that resonate with success frequencies. Raghavendrra Hebbur has helped 1,200+ clients align their business decisions with numerological principles. Contact Numank at +91 97391 05574.</p>' ),
        array( 'Baby Name Numerology: Give Your Child the Gift of a Harmonious Name', '<p>A baby name is the most important gift parents can give. In Vedic and Chaldean numerology traditions, a name aligned with the child birth date and birth star creates a life of harmony, success, and positive energy. WhatsApp +91 97391 05574 to schedule your consultation.</p>' ),
        array( 'Is Your Mobile Number Attracting or Blocking Success?', '<p>Your mobile number is more than just digits — it is a constant energetic frequency you carry everywhere. Numbers out of harmony with your personal numerology can create subtle blocks in communication, deals, and relationships. Get your number analyzed — WhatsApp +91 97391 05574.</p>' ),
    );
    foreach ( $posts as $p ) {
        $existing = get_page_by_title( $p[0], OBJECT, 'post' );
        if ( ! $existing ) {
            wp_insert_post( array( 'post_title' => $p[0], 'post_content' => $p[1], 'post_status' => 'publish', 'post_type' => 'post' ) );
        }
    }
}

/* ═══════════════════════════════════════════
   PAGE CONTENT FUNCTIONS
═══════════════════════════════════════════ */

function nmk_cta_block( $title, $sub ) {
    return '<div class="nmk-cta"><span class="nmk-eyebrow" style="color:var(--gd)">Get Started</span><h2>' . $title . '</h2><p>' . $sub . '</p><div class="nmk-brow"><a href="tel:+919739105574" class="nmk-btn">&#128222; Call +91 97391 05574</a><a href="https://wa.me/919739105574" class="nmk-btn-o" target="_blank">&#128172; WhatsApp</a></div></div>';
}

function nmk_pg_home() {
    return '
<div class="nmk-hero">
<div class="nmk-hero-in">
  <span class="nmk-eyebrow">&#10022; Chaldean &amp; Pythagorean Numerology &#10022;</span>
  <h1>Where Numbers<br><em>Reveal Destiny</em></h1>
  <p class="nmk-hero-tag">"Ancient wisdom. Precise guidance. Life-changing results."</p>
  <div class="nmk-rule-g"></div>
  <p class="nmk-hero-sub">Expert numerology consultations by <strong style="color:#fff;font-weight:600">Raghavendrra Hebbur</strong> — trusted by 1,200+ clients across India to decode their life path, correct their name, and align their destiny.</p>
  <div class="nmk-stats">
    <div class="nmk-stat"><strong>5+</strong><span>Years of Practice</span></div>
    <div class="nmk-stat"><strong>1,200+</strong><span>Happy Clients</span></div>
    <div class="nmk-stat"><strong>6</strong><span>Core Services</span></div>
    <div class="nmk-stat"><strong>98%</strong><span>Satisfaction Rate</span></div>
  </div>
  <div class="nmk-brow">
    <a href="/contact" class="nmk-btn">Book Consultation</a>
    <a href="https://wa.me/919739105574" class="nmk-btn-o" target="_blank">WhatsApp Now</a>
  </div>
</div>
</div>

<div class="nmk-s" style="padding-bottom:80px">
  <div class="nmk-sh c">
    <span class="nmk-eyebrow">What We Offer</span>
    <h2>Our <em>Numerology Services</em></h2>
    <div class="nmk-rule"></div>
    <p style="margin-top:16px">Every number in your life carries a divine message. We decode it for you.</p>
  </div>
  <div class="nmk-grid">
    <div class="nmk-card"><span class="nmk-card-n">01</span><h3>Personal Consultation</h3><p>Decode your Life Path, Destiny &amp; Soul Urge numbers for complete clarity in love, career &amp; life decisions.</p><a href="/personal-consultation" class="nmk-btn-dk">Learn More</a></div>
    <div class="nmk-card"><span class="nmk-card-n">02</span><h3>Name Correction</h3><p>Align your name vibration with your birth date energy for unstoppable harmony and success in all areas.</p><a href="/name-correction" class="nmk-btn-dk">Learn More</a></div>
    <div class="nmk-card"><span class="nmk-card-n">03</span><h3>Business Numerology</h3><p>Choose the right business name, registration date &amp; lucky numbers for maximum growth and prosperity.</p><a href="/business-numerology" class="nmk-btn-dk">Learn More</a></div>
    <div class="nmk-card"><span class="nmk-card-n">04</span><h3>Baby Name Numerology</h3><p>Give your newborn a harmonious name perfectly aligned with their birth star and life path destiny.</p><a href="/baby-name-numerology" class="nmk-btn-dk">Learn More</a></div>
    <div class="nmk-card"><span class="nmk-card-n">05</span><h3>Mobile Number Analysis</h3><p>Discover if your mobile number is attracting or blocking the opportunities and relationships you deserve.</p><a href="/mobile-number-numerology" class="nmk-btn-dk">Learn More</a></div>
    <div class="nmk-card"><span class="nmk-card-n">06</span><h3>Vastu Consultation</h3><p>Harmonize your living and workspace energies using ancient Vastu Shastra principles for health and wealth.</p><a href="/vastu-consultation" class="nmk-btn-dk">Learn More</a></div>
  </div>
</div>

<div style="background:var(--cr2)">
<div class="nmk-s">
  <div class="nmk-split">
    <div class="nmk-split-img">
      <img src="https://numank.com/wp-content/uploads/2026/04/unnamed-1.png" alt="Raghavendrra Hebbur — Expert Numerologist and Vastu Consultant" loading="lazy" />
      <div class="nmk-badges">
        <span class="nmk-badge">Chaldean Numerology</span>
        <span class="nmk-badge">Pythagorean</span>
        <span class="nmk-badge">Vastu Shastra</span>
        <span class="nmk-badge">Name Correction</span>
        <span class="nmk-badge">5+ Years</span>
      </div>
    </div>
    <div class="nmk-split-text">
      <span class="nmk-eyebrow">Your Numerologist</span>
      <h2>Meet <em>Raghavendrra Hebbur</em></h2>
      <div class="nmk-rule"></div>
      <p>With over 5 years of dedicated practice in Chaldean and Pythagorean numerology, Raghavendrra has transformed the lives of 1,200+ clients across India and internationally.</p>
      <p>Also a recognized Vastu expert featured on <strong>vardhinivastu.com</strong> and <strong>vastuone.com</strong>, he brings a uniquely holistic approach combining numerology with spatial energy alignment.</p>
      <ul>
        <li>Certified in Chaldean &amp; Pythagorean Numerology</li>
        <li>1,200+ successful consultations delivered</li>
        <li>Expert in name correction for individuals &amp; businesses</li>
        <li>Recognized Vastu Shastra practitioner</li>
        <li>Baby name specialist with Vedic knowledge</li>
      </ul>
      <a href="/about" class="nmk-btn-dk">Know More About Me</a>
    </div>
  </div>
</div>
</div>

<div class="nmk-quote-band">
  <div class="nmk-quote-band-in">
    <blockquote>"Every number that surrounds you — your birth date, your name, your address — is a <em>conversation the universe is having with you.</em> Numank teaches you to listen."</blockquote>
    <cite>— Raghavendrra Hebbur, Numank</cite>
  </div>
</div>

<div class="nmk-s">
  <div class="nmk-sh c">
    <span class="nmk-eyebrow">The Process</span>
    <h2>How Your <em>Journey Works</em></h2>
    <div class="nmk-rule"></div>
  </div>
  <div class="nmk-steps" style="margin-top:56px">
    <div class="nmk-step"><div class="nmk-step-n">1</div><h3>Book Your Session</h3><p>Call or WhatsApp +91 97391 05574 to schedule your personal consultation at a convenient time.</p></div>
    <div class="nmk-step"><div class="nmk-step-n">2</div><h3>Share Your Details</h3><p>Provide your full birth name and date of birth for an accurate and complete chart calculation.</p></div>
    <div class="nmk-step"><div class="nmk-step-n">3</div><h3>Receive Your Report</h3><p>Get a detailed written numerology report with actionable insights and personalized recommendations.</p></div>
    <div class="nmk-step"><div class="nmk-step-n">4</div><h3>Transform Your Life</h3><p>Implement the guidance and experience measurable positive changes within 21 to 40 days.</p></div>
  </div>
</div>

<div style="background:var(--cr2)">
<div class="nmk-s">
  <div class="nmk-sh c">
    <span class="nmk-eyebrow">Client Stories</span>
    <h2>What Our <em>Clients Say</em></h2>
    <div class="nmk-rule"></div>
  </div>
  <div class="nmk-tgrid" style="margin-top:52px">
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"After name correction by Raghavendrra, I got a promotion within 3 months. The change was almost magical. I now recommend him to everyone."</blockquote><div class="nmk-tc-name">Priya Sharma</div><div class="nmk-tc-loc">Bangalore, Karnataka</div></div>
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"My business was struggling for 2 years. After business name correction and an auspicious launch date, revenue doubled in just 6 months."</blockquote><div class="nmk-tc-name">Vikram Nair</div><div class="nmk-tc-loc">Chennai, Tamil Nadu</div></div>
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"Raghavendrra gave us 5 beautifully analyzed baby name options. The process was so thorough and reassuring. We are deeply grateful."</blockquote><div class="nmk-tc-name">Meena &amp; Suresh Patel</div><div class="nmk-tc-loc">Ahmedabad, Gujarat</div></div>
  </div>
  <div style="text-align:center;margin-top:40px"><a href="/testimonials" class="nmk-btn-dk">Read All 1,200+ Stories</a></div>
</div>
</div>

' . nmk_cta_block( 'Unlock Your <em>True Potential</em>', 'Book a personal numerology consultation today and start your journey toward clarity, success, and lasting harmony.' );
}

function nmk_pg_about() {
    return '
<div class="nmk-short"><div class="nmk-short-in">
  <span class="nmk-eyebrow">Your Numerologist</span>
  <h1>About <em>Raghavendrra Hebbur</em></h1>
  <p>5+ Years Experience &nbsp;|&nbsp; 1,200+ Clients &nbsp;|&nbsp; Chaldean &amp; Pythagorean Expert</p>
</div></div>

<div class="nmk-s">
  <div class="nmk-split">
    <div class="nmk-split-img">
      <img src="https://numank.com/wp-content/uploads/2026/04/unnamed-1.png" alt="Raghavendrra Hebbur — Certified Numerologist and Vastu Consultant" loading="lazy" />
      <div class="nmk-badges" style="margin-top:20px">
        <span class="nmk-badge">Chaldean Numerology</span>
        <span class="nmk-badge">Pythagorean</span>
        <span class="nmk-badge">Vastu Shastra</span>
        <span class="nmk-badge">Name Correction</span>
        <span class="nmk-badge">Baby Names</span>
      </div>
    </div>
    <div class="nmk-split-text">
      <span class="nmk-eyebrow">My Story</span>
      <h2>From Seeker to <em>Guide</em></h2>
      <div class="nmk-rule"></div>
      <p>Raghavendrra Hebbur is a certified numerologist and Vastu consultant based in India, with over 5 years of dedicated practice helping individuals and businesses align with their highest potential through the science of numbers.</p>
      <p>His journey into numerology began as a personal quest for answers — and what he discovered transformed not just his own life but the lives of over 1,200 clients. His approach combines both Chaldean and Pythagorean systems, providing a reading that goes far beyond surface-level interpretation.</p>
      <p>As a recognized Vastu expert featured on <strong>vardhinivastu.com</strong> and <strong>vastuone.com</strong>, Raghavendrra uniquely integrates spatial energy alignment with numerological insights for complete life transformation.</p>
      <ul>
        <li>5+ years of active numerology and Vastu practice</li>
        <li>1,200+ successful consultations delivered</li>
        <li>Expert in Chaldean and Pythagorean numerology</li>
        <li>Recognized Vastu Shastra practitioner</li>
        <li>Specializes in name correction, business numerology, baby names</li>
      </ul>
      <div class="nmk-brow" style="justify-content:flex-start">
        <a href="tel:+919739105574" class="nmk-btn">Call +91 97391 05574</a>
        <a href="https://wa.me/919739105574" class="nmk-btn-dk" target="_blank">WhatsApp</a>
      </div>
    </div>
  </div>
</div>

<div style="background:var(--cr2)"><div class="nmk-s">
  <div class="nmk-sh c"><span class="nmk-eyebrow">Expertise</span><h2>Areas of <em>Specialisation</em></h2><div class="nmk-rule"></div></div>
  <div class="nmk-grid">
    <div class="nmk-card"><span class="nmk-card-n">01</span><h3>Life Path Analysis</h3><p>Deep decode of your Life Path, Destiny, and Soul Urge numbers for complete self-understanding.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">02</span><h3>Name Correction</h3><p>Spelling corrections that align your name vibration with your birth chart for maximum harmony.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">03</span><h3>Business Numerology</h3><p>Name selection, launch dates, and number analysis for measurable business success.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">04</span><h3>Baby Names</h3><p>Harmonious names aligned with the child birth star and family numerology compatibility.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">05</span><h3>Mobile Number</h3><p>Analysis of whether your phone number is supporting or blocking your goals in life.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">06</span><h3>Vastu Consultation</h3><p>Balance the energies of your home and office for health, wealth, and lasting happiness.</p></div>
  </div>
</div></div>

' . nmk_cta_block( 'Start Your <em>Transformation</em>', 'Every great journey begins with one step. Reach out to Raghavendrra Hebbur today.' );
}

function nmk_pg_consult() {
    return '
<div class="nmk-short"><div class="nmk-short-in">
  <span class="nmk-eyebrow">Core Service</span>
  <h1>Personal <em>Numerology Consultation</em></h1>
  <p>Unlock the hidden blueprint of your life through your name and birth date</p>
  <div class="nmk-brow">
    <a href="tel:+919739105574" class="nmk-btn">Book Now &mdash; +91 97391 05574</a>
    <a href="https://wa.me/919739105574" class="nmk-btn-o" target="_blank">WhatsApp</a>
  </div>
</div></div>

<div class="nmk-s">
  <div class="nmk-sh c"><span class="nmk-eyebrow">What You Receive</span><h2>Numbers That <em>Define You</em></h2><div class="nmk-rule"></div><p style="margin-top:16px">A complete numerological portrait of your life — past patterns, present strengths, and future possibilities.</p></div>
  <div class="nmk-grid">
    <div class="nmk-card"><span class="nmk-card-n">01</span><h3>Life Path Number</h3><p>Your most important number — reveals your core purpose, natural talents, and the main theme of your entire lifetime.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">02</span><h3>Destiny Number</h3><p>Derived from your full name, this shows the skills and attributes you must develop to fulfill your life mission.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">03</span><h3>Soul Urge Number</h3><p>The deepest desire of your heart — what truly motivates you beneath the surface of everyday life.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">04</span><h3>Personality Number</h3><p>How others perceive you — your outer personality and how you naturally present yourself to the world.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">05</span><h3>Personal Year Forecast</h3><p>What this year holds — career moves, relationship shifts, opportunities, and challenges to prepare for.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">06</span><h3>Compatibility Analysis</h3><p>Numerological compatibility with partners, business associates, and family members for harmony.</p></div>
  </div>
</div>

<div style="background:var(--cr2)"><div class="nmk-s">
  <div class="nmk-sh c"><span class="nmk-eyebrow">The Process</span><h2>How It <em>Works</em></h2><div class="nmk-rule"></div></div>
  <div class="nmk-steps" style="margin-top:52px">
    <div class="nmk-step"><div class="nmk-step-n">1</div><h3>Book</h3><p>WhatsApp or call +91 97391 05574 to schedule your session at a convenient time.</p></div>
    <div class="nmk-step"><div class="nmk-step-n">2</div><h3>Share</h3><p>Provide your full birth name and complete date of birth for accurate chart calculation.</p></div>
    <div class="nmk-step"><div class="nmk-step-n">3</div><h3>Receive</h3><p>Get your detailed written numerology report within 24 to 48 hours of consultation.</p></div>
    <div class="nmk-step"><div class="nmk-step-n">4</div><h3>Transform</h3><p>One-on-one session to walk through findings, answer questions, and plan next steps.</p></div>
  </div>
</div></div>

' . nmk_cta_block( 'Book Your <em>Consultation</em>', 'Same-day appointments available. Call or WhatsApp Raghavendrra Hebbur directly.' );
}

function nmk_pg_name() {
    return '
<div class="nmk-short"><div class="nmk-short-in">
  <span class="nmk-eyebrow">Name Correction Science</span>
  <h1>Numerology <em>Name Correction</em></h1>
  <p>A single letter change in your name can shift your entire life trajectory</p>
  <div class="nmk-brow">
    <a href="tel:+919739105574" class="nmk-btn">Get Name Corrected</a>
    <a href="https://wa.me/919739105574" class="nmk-btn-o" target="_blank">WhatsApp</a>
  </div>
</div></div>

<div class="nmk-s">
  <div class="nmk-sh c"><span class="nmk-eyebrow">Why Name Correction</span><h2>Your Name Is Your <em>Vibration</em></h2><div class="nmk-rule"></div><p style="margin-top:16px">Every letter carries a numerical value. When your name total is incompatible with your birth date, you experience invisible friction — repeated setbacks, missed opportunities, unexplained struggles.</p></div>
  <div class="nmk-grid">
    <div class="nmk-card"><span class="nmk-card-n">01</span><h3>Career Acceleration</h3><p>Clients report faster promotions, new opportunities, and professional recognition after name correction.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">02</span><h3>Financial Harmony</h3><p>Aligning your name number with your birth number removes energetic blocks around money and abundance.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">03</span><h3>Better Relationships</h3><p>Corrected name vibrations improve harmony in marriage, family, and professional relationships.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">04</span><h3>Health &amp; Wellbeing</h3><p>Numbers affect your energy field. A harmonious name supports better physical and mental health.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">05</span><h3>Luck &amp; Timing</h3><p>When your numbers align, you naturally find yourself in the right place at the right time.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">06</span><h3>No Legal Change Needed</h3><p>Start using the corrected spelling in your signature, cards, and social media — results begin immediately.</p></div>
  </div>
</div>

' . nmk_cta_block( 'Get Your Name <em>Corrected Today</em>', 'Join 1,200+ clients who transformed their lives through numerology name correction.' );
}

function nmk_pg_biz() {
    return '
<div class="nmk-short"><div class="nmk-short-in">
  <span class="nmk-eyebrow">For Entrepreneurs &amp; Companies</span>
  <h1>Business <em>Numerology</em></h1>
  <p>Name your business for success. Launch on the right date. Build on powerful numbers.</p>
  <div class="nmk-brow">
    <a href="tel:+919739105574" class="nmk-btn">Consult for Business</a>
    <a href="https://wa.me/919739105574" class="nmk-btn-o" target="_blank">WhatsApp</a>
  </div>
</div></div>

<div class="nmk-s">
  <div class="nmk-grid">
    <div class="nmk-card"><span class="nmk-card-n">01</span><h3>Business Name Selection</h3><p>Choose a business name whose numerological value aligns with your personal numbers and business goals for maximum success.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">02</span><h3>Auspicious Launch Dates</h3><p>Select the most powerful dates for registration, launch events, product releases, and major business decisions.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">03</span><h3>Lucky Number Strategy</h3><p>Incorporate power numbers into your pricing, addresses, phone numbers, and complete brand identity.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">04</span><h3>Partner Compatibility</h3><p>Analyze numerological compatibility of business partners and key team members for harmonious partnerships.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">05</span><h3>Brand Rebranding Audit</h3><p>Is your existing business name blocking growth? Get a complete numerological audit and rebranding recommendation.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">06</span><h3>Domain &amp; Digital Brand</h3><p>Ensure your website domain, brand colors, and logo number align with your business numerology for online success.</p></div>
  </div>
</div>

' . nmk_cta_block( 'Build a <em>Numerologically Aligned</em> Business', 'Do not leave business success to chance. Raghavendrra Hebbur has helped 1,200+ clients thrive.' );
}

function nmk_pg_baby() {
    return '
<div class="nmk-short"><div class="nmk-short-in">
  <span class="nmk-eyebrow">A Lifelong Gift</span>
  <h1>Baby Name <em>Numerology</em></h1>
  <p>Give your child a name that vibrates with harmony, health, and lasting success</p>
  <div class="nmk-brow">
    <a href="tel:+919739105574" class="nmk-btn">Get Baby Names</a>
    <a href="https://wa.me/919739105574" class="nmk-btn-o" target="_blank">WhatsApp</a>
  </div>
</div></div>

<div class="nmk-s">
  <div class="nmk-sh c"><span class="nmk-eyebrow">Why It Matters</span><h2>A Name That <em>Blesses for Life</em></h2><div class="nmk-rule"></div><p style="margin-top:16px">In Vedic and numerological traditions, a name aligned with the child birth date and birth star creates a foundation of health, intelligence, success, and happiness throughout their entire life.</p></div>
  <div class="nmk-grid">
    <div class="nmk-card"><span class="nmk-card-n">01</span><h3>Birth Star Alignment</h3><p>Names selected in harmony with the child Nakshatra (birth star) for complete Vedic compatibility.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">02</span><h3>Birth Date Harmony</h3><p>The name total value aligns with the child birth date number for lifelong positive energy vibration.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">03</span><h3>Family Compatibility</h3><p>Names checked for compatibility with parents and siblings numbers for complete family harmony.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">04</span><h3>Multiple Options</h3><p>Receive 5 to 10 carefully analyzed name options across different Chaldean number values and meanings.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">05</span><h3>Life Theme Analysis</h3><p>Each suggested name is analyzed for the life themes it attracts — success, health, wisdom, and joy.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">06</span><h3>Detailed Written Report</h3><p>Every name comes with a full numerological explanation so you can make an informed, confident choice.</p></div>
  </div>
</div>

' . nmk_cta_block( 'Give Your Baby the <em>Perfect Name</em>', 'WhatsApp preferred. Share the birth date and birth star to get started immediately.' );
}

function nmk_pg_mobile() {
    return '
<div class="nmk-short"><div class="nmk-short-in">
  <span class="nmk-eyebrow">Mobile Number Science</span>
  <h1>Mobile Number <em>Numerology</em></h1>
  <p>Your phone number broadcasts a frequency 24/7 — is it working for or against you?</p>
  <div class="nmk-brow">
    <a href="tel:+919739105574" class="nmk-btn">Analyze My Number</a>
    <a href="https://wa.me/919739105574" class="nmk-btn-o" target="_blank">WhatsApp</a>
  </div>
</div></div>

<div class="nmk-s">
  <div class="nmk-grid">
    <div class="nmk-card"><span class="nmk-card-n">01</span><h3>Compatibility Check</h3><p>We calculate your mobile number root value and check its compatibility with your complete personal numerology chart.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">02</span><h3>Sequence Analysis</h3><p>Each digit carries individual weight. We analyze the full number sequence for collective and individual impact.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">03</span><h3>Career &amp; Business Impact</h3><p>Certain number combinations can silently block deals, communication, and professional relationships.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">04</span><h3>Personal Life Influence</h3><p>Your mobile number affects social connections and relationship energies far more than most people realize.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">05</span><h3>Recommended Combinations</h3><p>If your current number is unfavorable, we provide specific combinations to seek when switching numbers.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">06</span><h3>Written Report</h3><p>Receive a clear written analysis of your mobile number numerological impact with practical, actionable recommendations.</p></div>
  </div>
</div>

' . nmk_cta_block( 'Is Your Mobile Number <em>Lucky for You?</em>', 'WhatsApp your mobile number to Raghavendrra Hebbur for a quick compatibility check.' );
}

function nmk_pg_vastu() {
    return '
<div class="nmk-short"><div class="nmk-short-in">
  <span class="nmk-eyebrow">Ancient Spatial Science</span>
  <h1>Vastu <em>Consultation</em></h1>
  <p>Align your home and workspace with cosmic energies for health, wealth, and lasting peace</p>
  <div class="nmk-brow">
    <a href="tel:+919739105574" class="nmk-btn">Book Vastu Consult</a>
    <a href="https://wa.me/919739105574" class="nmk-btn-o" target="_blank">WhatsApp</a>
  </div>
</div></div>

<div class="nmk-s">
  <div class="nmk-grid">
    <div class="nmk-card"><span class="nmk-card-n">01</span><h3>Home Vastu</h3><p>Complete analysis of directional energies, room placements, and energy flow for maximum family harmony and health.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">02</span><h3>Office &amp; Business Vastu</h3><p>Optimize your workspace layout for productivity, financial prosperity, and positive team dynamics.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">03</span><h3>New Property Guidance</h3><p>Before buying or building — get a comprehensive numerology and Vastu analysis of the property and plot number.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">04</span><h3>Remedies Without Demolition</h3><p>Practical corrections using colors, elements, and positioning — no structural changes needed in most cases.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">05</span><h3>Five Elements Balance</h3><p>Ensure Earth, Water, Fire, Air, and Space are properly balanced in your environment for optimal living energy.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">06</span><h3>Numerology + Vastu Combo</h3><p>Unique integrated service combining personal numerology with Vastu analysis for total life alignment and transformation.</p></div>
  </div>
</div>

' . nmk_cta_block( 'Transform Your Space, <em>Transform Your Life</em>', 'Featured expert on vardhinivastu.com and vastuone.com. Book your Vastu consultation today.' );
}

function nmk_pg_courses() {
    return '
<div class="nmk-short"><div class="nmk-short-in">
  <span class="nmk-eyebrow">Learn the Science</span>
  <h1>Numerology <em>Courses</em></h1>
  <p>Master the ancient science of numbers and transform your life — and others too</p>
  <div class="nmk-brow">
    <a href="tel:+919739105574" class="nmk-btn">Enquire About Courses</a>
    <a href="https://wa.me/919739105574" class="nmk-btn-o" target="_blank">WhatsApp</a>
  </div>
</div></div>

<div class="nmk-s">
  <div class="nmk-grid">
    <div class="nmk-card"><span class="nmk-card-n">01</span><h3>Beginner Numerology</h3><p>Learn the fundamentals — Life Path, Destiny, and Soul Urge numbers. Calculate and interpret your own complete chart.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">02</span><h3>Advanced Numerology</h3><p>Deep dive into Chaldean numerology, Personal Year cycles, Karmic numbers, and advanced chart reading techniques.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">03</span><h3>Professional Practitioner</h3><p>Become a certified numerology practitioner. Learn to conduct full client consultations with confidence and accuracy.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">04</span><h3>Business Numerology Course</h3><p>Specialized training in business name analysis, launch date selection, and complete entrepreneurial numerology.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">05</span><h3>Online &amp; Offline</h3><p>Flexible learning options — attend in person or learn from anywhere in the world via online live sessions.</p></div>
    <div class="nmk-card"><span class="nmk-card-n">06</span><h3>Certification</h3><p>Receive a recognized certificate upon completion to establish your credentials as a practicing numerologist.</p></div>
  </div>
</div>

' . nmk_cta_block( 'Start Your Journey as a <em>Numerology Expert</em>', 'Contact Raghavendrra Hebbur for the next course batch schedule and enrollment details.' );
}

function nmk_pg_testimonials() {
    return '
<div class="nmk-short"><div class="nmk-short-in">
  <span class="nmk-eyebrow">1,200+ Happy Clients</span>
  <h1>Client <em>Testimonials</em></h1>
  <p>Real stories from real people whose lives transformed through the power of numerology</p>
</div></div>

<div class="nmk-s">
  <div class="nmk-tgrid">
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"After name correction by Raghavendrra, I received a promotion within 3 months. The shift was remarkable and I remain forever grateful."</blockquote><div class="nmk-tc-name">Priya Sharma</div><div class="nmk-tc-loc">Bangalore, Karnataka</div></div>
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"My business struggled for 2 years. After name correction and an auspicious date selection, revenue doubled within 6 months. Truly remarkable."</blockquote><div class="nmk-tc-name">Vikram Nair</div><div class="nmk-tc-loc">Chennai, Tamil Nadu</div></div>
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"The baby name consultation was so detailed and reassuring. Raghavendrra gave us 5 beautiful options with complete analysis. We are so grateful."</blockquote><div class="nmk-tc-name">Meena &amp; Suresh Patel</div><div class="nmk-tc-loc">Ahmedabad, Gujarat</div></div>
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"I changed my mobile number as recommended. Within weeks I started receiving better business inquiries and deals closed faster. Simply amazing!"</blockquote><div class="nmk-tc-name">Rajan Krishnamurthy</div><div class="nmk-tc-loc">Hyderabad, Telangana</div></div>
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"The combined Vastu and Numerology consultation transformed our home atmosphere completely. We feel more peaceful and finances have clearly improved."</blockquote><div class="nmk-tc-name">Sunita &amp; Mohan Gupta</div><div class="nmk-tc-loc">Delhi, NCR</div></div>
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"I was skeptical initially but Raghavendrra accuracy in reading my chart was stunning. He revealed things about me he had absolutely no way of knowing."</blockquote><div class="nmk-tc-name">Anil Bhat</div><div class="nmk-tc-loc">Mumbai, Maharashtra</div></div>
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"His personal year forecast was completely accurate. Everything predicted for 2025 came true. I now plan all major decisions with his guidance."</blockquote><div class="nmk-tc-name">Kavitha Reddy</div><div class="nmk-tc-loc">Pune, Maharashtra</div></div>
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"My career was stuck for years. After name correction and numerology guidance, I received two excellent job offers in the very same month!"</blockquote><div class="nmk-tc-name">Suresh Kumar</div><div class="nmk-tc-loc">Coimbatore, Tamil Nadu</div></div>
    <div class="nmk-tc"><div class="nmk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote>"Registered my company on the lucky date Raghavendrra suggested. The best business decision I ever made. We are thriving beyond all expectations!"</blockquote><div class="nmk-tc-name">Deepak Joshi</div><div class="nmk-tc-loc">Jaipur, Rajasthan</div></div>
  </div>
</div>

' . nmk_cta_block( 'Your Success Story <em>Starts Here</em>', 'Join 1,200+ happy clients. Book your consultation with Raghavendrra Hebbur today.' );
}

function nmk_pg_faq() {
    return '
<div class="nmk-short"><div class="nmk-short-in">
  <span class="nmk-eyebrow">Got Questions?</span>
  <h1>Frequently Asked <em>Questions</em></h1>
  <p>Clear answers to the most common questions about numerology and our services</p>
</div></div>

<div class="nmk-s">
  <div class="nmk-faqs">
    <div class="nmk-faq"><div class="nmk-fq">What is numerology and how does it actually work? <span>&#10022;</span></div><div class="nmk-fa">Numerology is the study of numbers and their cosmic vibration. Every number from 1 to 9 carries a unique energy frequency. Your name and birth date create a unique numerical blueprint that influences your personality, career, relationships, health, and major life events throughout your lifetime.</div></div>
    <div class="nmk-faq"><div class="nmk-fq">Which numerology system do you use — Chaldean or Pythagorean? <span>&#10022;</span></div><div class="nmk-fa">Raghavendrra Hebbur uses both systems together. Chaldean numerology — the older Babylonian system — is used for name analysis as it is considered more accurate for vibrational energy. Pythagorean numerology is used for life path and destiny calculations. Together they provide the most complete and accurate picture.</div></div>
    <div class="nmk-faq"><div class="nmk-fq">How quickly will I see results after name correction? <span>&#10022;</span></div><div class="nmk-fa">Most clients begin noticing subtle positive shifts within 21 to 40 days of consistently using the corrected name. Major life changes such as career breakthroughs, relationship improvements, and financial shifts are typically reported within 3 to 6 months of consistent use.</div></div>
    <div class="nmk-faq"><div class="nmk-fq">Do I need to legally change my name for name correction? <span>&#10022;</span></div><div class="nmk-fa">Not necessarily. The correction primarily involves how you sign your name and introduce yourself. Starting with your signature, business cards, social media, and email is enough — the energy shift begins immediately even without a legal name change. Legal change is optional and recommended only for significant corrections.</div></div>
    <div class="nmk-faq"><div class="nmk-fq">Can consultations be done online or by phone? <span>&#10022;</span></div><div class="nmk-fa">Absolutely. All services are delivered fully online via phone call or WhatsApp. You share your birth details, Raghavendrra prepares your detailed written report, then conducts a live one-on-one discussion session to walk through every finding and recommendation.</div></div>
    <div class="nmk-faq"><div class="nmk-fq">Is numerology compatible with my religion or spiritual beliefs? <span>&#10022;</span></div><div class="nmk-fa">Numerology is a universal science not aligned with any particular religion or faith. People of all religious backgrounds — Hindu, Muslim, Christian, Jain, Sikh — benefit equally from numerological insights. It is simply a tool for self-understanding and practical life guidance, not a religious practice.</div></div>
    <div class="nmk-faq"><div class="nmk-fq">How is baby name numerology consultation done? <span>&#10022;</span></div><div class="nmk-fa">You share the baby date of birth and birth star (Nakshatra) if known, along with both parents full names and birth dates. Raghavendrra then prepares 5 to 10 compatible name options with complete numerological analysis for each one, so you can make a fully informed, confident choice for your child.</div></div>
    <div class="nmk-faq"><div class="nmk-fq">What are the consultation fees? <span>&#10022;</span></div><div class="nmk-fa">Fees vary by service type and depth of analysis required. Please WhatsApp or call +91 97391 05574 for current pricing and package details. Custom packages are available for families and businesses requiring multiple services at a combined rate.</div></div>
  </div>
</div>

' . nmk_cta_block( 'Still Have <em>Questions?</em>', 'WhatsApp or call Raghavendrra Hebbur directly — he personally responds to every inquiry.' );
}

function nmk_pg_contact() {
    return '
<div class="nmk-short"><div class="nmk-short-in">
  <span class="nmk-eyebrow">Get in Touch</span>
  <h1>Contact <em>Raghavendrra</em></h1>
  <p>Ready to transform your life? Reach out today &mdash; same-day responses guaranteed</p>
</div></div>

<div class="nmk-s">
  <div class="nmk-split">
    <div>
      <span class="nmk-eyebrow">Direct Contact</span>
      <h2 style="margin-bottom:36px">Let Us <em>Connect</em></h2>
      <div class="nmk-ci"><div class="nmk-ci-ico">&#128222;</div><div class="nmk-ci-text"><small>Call Directly</small><a href="tel:+919739105574">+91 97391 05574</a></div></div>
      <div class="nmk-ci"><div class="nmk-ci-ico">&#128172;</div><div class="nmk-ci-text"><small>WhatsApp (Fastest)</small><a href="https://wa.me/919739105574" target="_blank">+91 97391 05574</a></div></div>
      <div class="nmk-ci"><div class="nmk-ci-ico">&#127758;</div><div class="nmk-ci-text"><small>Website</small><strong>numank.com</strong></div></div>
      <div class="nmk-ci"><div class="nmk-ci-ico">&#128336;</div><div class="nmk-ci-text"><small>Consultation Hours</small><strong>Mon &ndash; Sat &nbsp; 9 AM &ndash; 7 PM IST</strong></div></div>
      <div class="nmk-contact-box">
        <p style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--mu);margin-bottom:10px">Fastest Way to Reach Us</p>
        <p style="color:var(--mu);font-size:.95rem;margin-bottom:20px">Share your name and date of birth on WhatsApp to get started immediately. Raghavendrra personally reads and responds to every message.</p>
        <a href="https://wa.me/919739105574?text=Hello%20Raghavendrra%2C%20I%20want%20to%20book%20a%20numerology%20consultation.%20My%20name%20is%20" class="nmk-btn" target="_blank">&#128172; Start WhatsApp Chat</a>
      </div>
    </div>
    <div>
      <span class="nmk-eyebrow">All Services</span>
      <h2 style="margin-bottom:36px">What We <em>Offer</em></h2>
      <div class="nmk-grid">
        <div class="nmk-card" style="padding:28px 24px"><span class="nmk-card-n" style="font-size:2rem;margin-bottom:12px">01</span><h3 style="font-size:1.1rem">Personal Consultation</h3></div>
        <div class="nmk-card" style="padding:28px 24px"><span class="nmk-card-n" style="font-size:2rem;margin-bottom:12px">02</span><h3 style="font-size:1.1rem">Name Correction</h3></div>
        <div class="nmk-card" style="padding:28px 24px"><span class="nmk-card-n" style="font-size:2rem;margin-bottom:12px">03</span><h3 style="font-size:1.1rem">Business Numerology</h3></div>
        <div class="nmk-card" style="padding:28px 24px"><span class="nmk-card-n" style="font-size:2rem;margin-bottom:12px">04</span><h3 style="font-size:1.1rem">Baby Names</h3></div>
        <div class="nmk-card" style="padding:28px 24px"><span class="nmk-card-n" style="font-size:2rem;margin-bottom:12px">05</span><h3 style="font-size:1.1rem">Mobile Number</h3></div>
        <div class="nmk-card" style="padding:28px 24px"><span class="nmk-card-n" style="font-size:2rem;margin-bottom:12px">06</span><h3 style="font-size:1.1rem">Vastu Consultation</h3></div>
      </div>
    </div>
  </div>
</div>
    ';
}

function nmk_pg_blog() {
    return '<p style="padding:48px 32px;color:#6b5c42;font-family:Jost,sans-serif">Read our latest articles on numerology, Vastu, name correction, and more below.</p>';
}
