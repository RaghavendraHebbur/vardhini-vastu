<?php get_header(); ?>

<div class="nm-page-hero">
  <div class="nm-container nm-center">
    <div class="nm-label">अंक ज्योतिष ज्ञान</div>
    <h1>Numerology Blog</h1>
    <p style="color:var(--dim); font-size:18px; max-width:540px; margin:0 auto;">
      Deep insights into Vedic Numerology, Ank Jyotish, lucky numbers, and ancient number wisdom.
    </p>
  </div>
</div>

<section class="nm-section nm-section-dark">
  <div class="nm-container">

    <?php if ( have_posts() ) : ?>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:28px;">
      <?php while ( have_posts() ) : the_post(); ?>
      <article style="background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:10px; overflow:hidden; transition:all 0.3s;"
               onmouseover="this.style.borderColor='var(--gold)'; this.style.transform='translateY(-4px)'"
               onmouseout="this.style.borderColor='var(--border)'; this.style.transform='none'">
        <?php if ( has_post_thumbnail() ) : ?>
        <a href="<?php the_permalink(); ?>">
          <?php the_post_thumbnail('medium', array('style'=>'width:100%; height:220px; object-fit:cover;')); ?>
        </a>
        <?php endif; ?>
        <div style="padding:28px;">
          <div style="font-family:var(--f-head); font-size:10px; color:var(--gold); letter-spacing:2px; margin-bottom:10px; text-transform:uppercase; opacity:0.7;">
            <?php echo get_the_date('d M Y'); ?>
          </div>
          <h2 style="font-size:18px; margin-bottom:12px;">
            <a href="<?php the_permalink(); ?>" style="color:var(--gold); text-decoration:none;"><?php the_title(); ?></a>
          </h2>
          <p style="color:var(--dim); font-size:16px; line-height:1.7; margin-bottom:20px;"><?php the_excerpt(); ?></p>
          <a href="<?php the_permalink(); ?>" style="font-family:var(--f-head); font-size:10px; letter-spacing:2px; color:var(--gold); text-transform:uppercase; text-decoration:none;">
            Read More →
          </a>
        </div>
      </article>
      <?php endwhile; ?>
    </div>

    <div style="margin-top:50px; text-align:center;">
      <?php the_posts_pagination( array(
        'prev_text' => '← Older',
        'next_text' => 'Newer →',
      ) ); ?>
    </div>

    <?php else : ?>
    <div style="text-align:center; padding:60px 0;">
      <div style="font-size:48px; margin-bottom:20px; opacity:0.3;">📖</div>
      <h3 style="color:var(--dim);">Blog posts coming soon</h3>
      <p style="color:var(--dim); opacity:0.6; margin-bottom:30px;">Deep numerology wisdom will be published here.</p>
      <a class="nm-btn nm-btn-outline" href="<?php echo home_url('/'); ?>">← Back to Home</a>
    </div>
    <?php endif; ?>

  </div>
</section>

<?php get_footer(); ?>
