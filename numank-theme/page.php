<?php get_header(); ?>

<div class="nm-page-hero">
  <div class="nm-container">
    <div class="nm-label">Numank — नुमांक</div>
    <h1><?php the_title(); ?></h1>
  </div>
</div>

<div class="nm-page-content">
  <?php
  while ( have_posts() ) :
    the_post();
    the_content();
  endwhile;
  ?>
</div>

<?php get_footer(); ?>
