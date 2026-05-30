<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Noto+Serif+Devanagari:wght@300;400;600;700&display=swap" rel="stylesheet">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<!-- NAVIGATION -->
<nav class="nm-nav" role="navigation">
  <div class="nm-nav-inner">

    <a href="<?php echo home_url('/'); ?>" class="nm-brand">
      <span class="nm-brand-en">NUMANK</span>
      <span class="nm-brand-sa">नुमांक • Ank Jyotish</span>
    </a>

    <button class="nm-nav-toggle" onclick="document.getElementById('nm-menu').classList.toggle('open')" aria-label="Menu">☰</button>

    <ul class="nm-nav-links" id="nm-menu">
      <li><a href="<?php echo home_url('/'); ?>">Home</a></li>
      <li><a href="<?php echo home_url('/calculator'); ?>">Free Calculator</a></li>
      <li><a href="<?php echo home_url('/services'); ?>">Services</a></li>
      <li><a href="<?php echo home_url('/about'); ?>">About</a></li>
      <li><a href="<?php echo home_url('/blog'); ?>">Blog</a></li>
      <li><a href="<?php echo home_url('/contact'); ?>">Contact</a></li>
    </ul>

    <a href="https://wa.me/919739105574?text=Namaste%20Raghavendrra%20ji%2C%20I%20want%20a%20Numerology%20consultation" class="nm-nav-cta" target="_blank" rel="noopener">
      ✦ Book Consultation
    </a>

  </div>
</nav>
<!-- END NAVIGATION -->
