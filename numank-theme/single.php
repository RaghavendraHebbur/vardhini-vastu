<?php get_header(); ?>

<?php while ( have_posts() ) : the_post(); ?>

<div class="nm-page-hero">
  <div class="nm-container nm-center" style="max-width:800px;">
    <div class="nm-label"><?php echo get_the_date('d F Y'); ?> &nbsp;·&nbsp; <?php the_category(', '); ?></div>
    <h1 style="font-size:clamp(24px,5vw,44px);"><?php the_title(); ?></h1>
    <p style="color:var(--dim); font-size:15px; margin-top:10px;">
      By Raghavendrra Hebbur &nbsp;·&nbsp; <?php echo ceil(str_word_count(get_the_content()) / 200); ?> min read
    </p>
  </div>
</div>

<?php if ( has_post_thumbnail() ) : ?>
<div style="max-width:860px; margin:0 auto; padding:0 24px;">
  <?php the_post_thumbnail('large', array('style'=>'width:100%; max-height:480px; object-fit:cover; border-radius:10px; border:1px solid var(--border); margin:-30px 0 0;')); ?>
</div>
<?php endif; ?>

<article class="nm-page-content" style="max-width:760px;">
  <div style="font-size:18px; color:var(--dim); line-height:1.9;">
    <?php the_content(); ?>
  </div>

  <div style="margin-top:50px; padding-top:30px; border-top:1px solid var(--border); display:flex; gap:16px; flex-wrap:wrap;">
    <a class="nm-btn nm-btn-gold" href="https://wa.me/919739105574?text=Namaste%2C%20I%20read%20your%20article%20and%20want%20a%20consultation" target="_blank" rel="noopener">
      Book a Consultation
    </a>
    <a class="nm-btn nm-btn-outline" href="<?php echo home_url('/calculator'); ?>">
      Try Free Calculator
    </a>
  </div>
</article>

<?php endwhile; ?>

<?php get_footer(); ?>
