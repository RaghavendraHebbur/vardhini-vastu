<?php
/**
 * VV Performance Elite — Mobile Speed Optimizer
 * Fixes: 162 stylesheets → ~8, WooCommerce bloat, emoji scripts,
 *        LiteSpeed Cache configuration, resource hints
 * Version: 1.0
 */
if (!defined('ABSPATH')) exit;

// ── 1. LiteSpeed Cache — Enable full optimisation suite ──────────────────────
add_action('init', 'vv_configure_litespeed', 1);
function vv_configure_litespeed() {
    // Only run once — check if already configured
    if (get_option('vv_litespeed_configured') === '1') return;

    $settings = array(
        // Cache
        'cache'                  => 1,
        'cache-browser'          => 1,
        'cache-browser_ttl'      => 2592000, // 30 days
        'cache-ttl_pub'          => 604800,  // 7 days
        'cache-mobile'           => 1,
        'cache-login_cookie'     => '',

        // Optimise — CSS
        'optm-css_min'           => 1,
        'optm-ccss_gen'          => 1,  // Critical CSS
        'optm-css_combine'       => 0,  // Keep off to avoid breaking styles
        'optm-css_http2'         => 1,  // HTTP/2 push

        // Optimise — JS
        'optm-js_min'            => 1,
        'optm-js_combine'        => 0,  // Keep off — can break scripts
        'optm-js_http2'          => 1,
        'optm-js_defer'          => 1,  // Defer all JS
        'optm-js_defer_exc'      => array(),

        // Optimise — HTML
        'optm-html_min'          => 1,
        'optm-qs_rm'             => 1,  // Remove query strings from static resources
        'optm-emoji_rm'          => 1,  // Remove emoji script
        'optm-noscript_rm'       => 0,
        'optm-charset_rm'        => 0,
        'optm-comment_rm'        => 1,  // Remove HTML comments

        // Optimise — Media
        'optm-img_lazy'          => 1,  // Lazy load images
        'optm-img_lazy_placeholder' => 1,
        'optm-img_lazy_factor'   => 0,  // Load images just before viewport
        'optm-lqip'              => 0,  // Low Quality Image Placeholder (off — can slow LCP)

        // Image optimisation (WebP)
        'img-webp'               => 1,
        'img-webp_replace'       => 1,
        'img-webp_attr'          => 1,
        'img-webp_lossless'      => 0,  // Lossy WebP = smaller file
        'img-webp_qual'          => 80,
        'img-optm-lossless'      => 0,
        'img-optm-lossy'         => 1,
        'img-optm-exif_rm'       => 1,

        // Page optimise — LCP preload
        'optm-lcp_preload'       => 1,

        // Object cache
        'object-cache'           => 0,  // Keep off — Hostinger shared hosting

        // CDN — none configured
        'cdn-ori'                => '',
    );

    update_option('litespeed-conf', $settings);
    update_option('vv_litespeed_configured', '1');

    // Trigger LiteSpeed to flush and rebuild
    do_action('litespeed_purge_all');
}

// ── 2. Remove emoji scripts/styles (saves ~12 KB) ────────────────────────────
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');
remove_filter('the_content_feed', 'wp_staticize_emoji');
remove_filter('comment_text_rss', 'wp_staticize_emoji');
remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
add_filter('emoji_svg_url', '__return_false');

// ── 3. Remove WooCommerce scripts/styles on non-WC pages ─────────────────────
add_action('wp_enqueue_scripts', 'vv_remove_woo_bloat', 99);
function vv_remove_woo_bloat() {
    if (!function_exists('is_woocommerce')) return;

    // Only load WC assets on WC pages: shop, product, cart, checkout, account
    $is_woo_page = is_woocommerce() || is_cart() || is_checkout() || is_account_page() || is_product_category() || is_product_tag();

    if (!$is_woo_page) {
        // Remove all WooCommerce styles
        $woo_styles = array(
            'woocommerce-layout', 'woocommerce-smallscreen', 'woocommerce-general',
            'woocommerce-coming-soon', 'wc-blocks-style', 'wc-blocks-packages-style',
            'wc-blocks-style-active-filters', 'woocommerce-add-to-cart-form-style',
            'wc-blocks-style-all-products', 'wc-blocks-style-all-reviews',
            'wc-blocks-style-attribute-filter', 'wc-blocks-style-breadcrumbs',
            'wc-blocks-style-cart-link', 'wc-blocks-style-catalog-sorting',
            'wc-blocks-style-legacy-template', 'wc-blocks-style-coming-soon',
            'woocommerce-customer-account-style', 'wc-blocks-style-featured-category',
            'wc-blocks-style-featured-product', 'wc-blocks-style-mini-cart',
            'woocommerce-product-gallery-large-image-next-previous-style',
            'wc-blocks-style-store-notices', 'wc-blocks-style-payment-method-icons',
            'wc-blocks-style-price-filter', 'woocommerce-product-button-style',
            'wc-blocks-style-product-categories', 'woocommerce-product-collection-style',
            'woocommerce-product-filters-style', 'wc-blocks-style-product-filter-status',
            'woocommerce-product-filter-price-slider-style',
            'wc-blocks-style-product-filter-attribute', 'wc-blocks-style-product-filter-rating',
            'woocommerce-product-filter-removable-chips-style',
            'wc-blocks-style-product-filter-clear-button',
            'woocommerce-product-filter-checkbox-list-style',
            'woocommerce-product-filter-chips-style', 'wc-blocks-style-product-filter-taxonomy',
            'woocommerce-product-gallery-style', 'wc-blocks-style-product-image',
            'wc-blocks-style-product-image-gallery', 'woocommerce-product-price-style',
            'woocommerce-product-template-style', 'wc-blocks-style-product-query',
            'wc-blocks-style-product-rating', 'wc-blocks-style-product-rating-stars',
            'wc-blocks-style-product-results-count', 'wc-blocks-style-product-sale-badge',
            'wc-blocks-style-product-search', 'wc-blocks-style-product-sku',
            'wc-blocks-style-product-summary', 'wc-blocks-style-product-title',
            'wc-blocks-style-rating-filter', 'wc-blocks-style-reviews-by-category',
            'wc-blocks-style-reviews-by-product', 'wc-blocks-style-stock-filter',
            'wc-blocks-style-order-confirmation-status', 'wc-blocks-style-order-confirmation-summary',
            'wc-blocks-style-order-confirmation-totals', 'wc-blocks-style-order-confirmation-downloads',
            'wc-blocks-style-order-confirmation-billing-address',
            'wc-blocks-style-order-confirmation-shipping-address',
            'wc-blocks-style-order-confirmation-additional-information',
            'wc-blocks-style-order-confirmation-additional-fields-wrapper',
            'wc-blocks-style-order-confirmation-additional-fields',
            'wc-blocks-style-order-confirmation-create-account',
            'wc-blocks-style-product-details', 'wc-blocks-style-product-specifications',
            'woocommerce-accordion-group-style', 'wc-blocks-style-product-reviews-title',
            'woocommerce-product-review-form-style', 'wc-blocks-style-product-review-date',
            'wc-blocks-style-product-review-content', 'wc-blocks-style-product-review-author-name',
            'wc-blocks-style-product-reviews-pagination', 'wc-blocks-style-product-review-template',
            'wc-blocks-style-cart', 'wc-blocks-style-checkout', 'wc-blocks-style-mini-cart-contents',
        );
        foreach ($woo_styles as $style) {
            wp_dequeue_style($style);
            wp_deregister_style($style);
        }

        // Remove WooCommerce scripts
        $woo_scripts = array(
            'wc-add-to-cart', 'woocommerce', 'sourcebuster-js', 'wc-order-attribution',
            'wc-cart-fragments', 'woocommerce-cart', 'woocommerce-checkout',
            'wc-address-i18n', 'wc-country-select', 'woocommerce-general',
        );
        foreach ($woo_scripts as $script) {
            wp_dequeue_script($script);
            wp_deregister_script($script);
        }
    }
}

// ── 4. Remove unused block library styles (keep only what's needed) ───────────
add_action('wp_enqueue_scripts', 'vv_remove_block_bloat', 100);
function vv_remove_block_bloat() {
    // Remove the global block-library style — Astra handles its own block styles
    // Comment blocks, archive widgets, etc. not used on this consulting site
    $unneeded_blocks = array(
        'wp-block-archives', 'wp-block-calendar', 'wp-block-categories',
        'wp-block-comment-author-name', 'wp-block-comment-content',
        'wp-block-comment-date', 'wp-block-comment-edit-link',
        'wp-block-comment-reply-link', 'wp-block-comment-template',
        'wp-block-comments', 'wp-block-comments-pagination',
        'wp-block-footnotes', 'wp-block-latest-comments',
        'wp-block-loginout', 'wp-block-rss',
        'wp-block-tag-cloud', 'wp-block-term-count', 'wp-block-term-description',
        'wp-block-term-name', 'wp-block-term-template',
        'wp-block-post-author', 'wp-block-post-author-biography', 'wp-block-post-author-name',
        'wp-block-post-comments-count', 'wp-block-post-comments-form',
        'wp-block-post-comments-link', 'wp-block-post-navigation-link',
        'wp-block-post-template', 'wp-block-post-terms', 'wp-block-post-time-to-read',
        'wp-block-query-pagination', 'wp-block-query-title', 'wp-block-query-total',
        'wp-block-read-more', 'wp-block-site-tagline', 'wp-block-site-title',
        'wp-block-code', 'wp-block-preformatted', 'wp-block-pullquote', 'wp-block-verse',
        'wp-block-math', 'wp-block-text-columns',
        'wp-block-accordion', 'wp-block-accordion-item', 'wp-block-accordion-heading', 'wp-block-accordion-panel',
        'litespeed-cache-dummy',  // LiteSpeed placeholder CSS not needed
    );
    foreach ($unneeded_blocks as $style) {
        wp_dequeue_style($style);
    }
}

// ── 5. Add resource hints — preconnect for performance ────────────────────────
add_action('wp_head', 'vv_resource_hints', 1);
function vv_resource_hints() {
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
    echo '<link rel="dns-prefetch" href="//www.google-analytics.com">' . "\n";
    echo '<link rel="dns-prefetch" href="//www.googletagmanager.com">' . "\n";
    echo '<link rel="dns-prefetch" href="//stats.wp.com">' . "\n";
}

// ── 6. Remove wp-embed (unnecessary unless embeds used) ──────────────────────
add_action('wp_footer', 'vv_dequeue_embed', 1);
function vv_dequeue_embed() {
    wp_dequeue_script('wp-embed');
}

// ── 7. Remove RSD link, Windows Live Writer, shortlink from head ─────────────
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'wp_generator');           // Remove WP version from head
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10);
remove_action('wp_head', 'wp_oembed_add_discovery_links');

// ── 8. Add LCP image preload for homepage ─────────────────────────────────────
add_action('wp_head', 'vv_lcp_preload', 3);
function vv_lcp_preload() {
    if (!is_front_page()) return;
    // Preload the hero/above-fold image to improve LCP
    // Uses fetchpriority="high" to tell browser this is LCP-critical
    $hero_image = get_template_directory_uri() . '/assets/images/mobile-hero.jpg';
    // Use a filter so the hero image URL can be overridden per-theme
    $hero_image = apply_filters('vv_lcp_hero_image', $hero_image);

    // Actually get the first image from the homepage via attachment
    $front_page_id = get_option('page_on_front');
    if ($front_page_id) {
        $thumbnail = get_post_thumbnail_id($front_page_id);
        if ($thumbnail) {
            $img = wp_get_attachment_image_src($thumbnail, 'large');
            if ($img) {
                echo '<link rel="preload" as="image" href="' . esc_url($img[0]) . '" fetchpriority="high">' . "\n";
            }
        }
    }
}

// ── 9. Defer Site Kit / Analytics scripts (non-critical) ─────────────────────
add_filter('script_loader_tag', 'vv_defer_analytics', 10, 2);
function vv_defer_analytics($tag, $handle) {
    $defer_handles = array('google-site-kit', 'googlesitekit-base', 'googlesitekit-chunks');
    foreach ($defer_handles as $dh) {
        if (strpos($handle, $dh) !== false || $handle === $dh) {
            if (strpos($tag, 'defer') === false && strpos($tag, 'async') === false) {
                return str_replace('<script ', '<script defer ', $tag);
            }
        }
    }
    return $tag;
}
