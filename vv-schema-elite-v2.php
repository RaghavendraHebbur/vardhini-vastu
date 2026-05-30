<?php
/**
 * VV Schema Elite v2.0 — Comprehensive E-E-A-T Schema Suite
 * Person, ProfessionalService, Service, Book, BreadcrumbList,
 * WebPage, ItemList, DefinedTermSet, Speakable, AggregateRating
 * SameAs stacking · areaServed hyperlocal · knowsAbout · hasMap
 * reviewedBy · dateModified freshness · @graph unified structure
 * Version: 2.0
 */
if ( ! defined( 'ABSPATH' ) ) exit;

// ── Constants ──────────────────────────────────────────────────────────────────
define( 'VV_SITE_URL',  'https://vardhinivastu.in' );
define( 'VV_PERSON_ID', 'https://vardhinivastu.in/#raghavendra-hebbur' );
define( 'VV_BIZ_ID',    'https://vardhinivastu.in/#business' );
define( 'VV_LOGO_URL',  'https://vardhinivastu.in/wp-content/uploads/2026/05/picofme-6-1.png' );

// ── 1. Max-snippet meta ────────────────────────────────────────────────────────
add_action( 'wp_head', 'vv_max_snippet_meta', 1 );
function vv_max_snippet_meta() {
    echo '<meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1">' . "\n";
}

// ── 2. Main @graph schema output ───────────────────────────────────────────────
add_action( 'wp_head', 'vv_elite_schema', 2 );
function vv_elite_schema() {
    $graph = [];

    // WebPage on every page
    $graph[] = vv_webpage_schema();

    // BreadcrumbList on all non-front pages
    if ( ! is_front_page() ) {
        $breadcrumb = vv_breadcrumb_schema();
        if ( $breadcrumb ) $graph[] = $breadcrumb;
    }

    // Homepage-only entities
    if ( is_front_page() ) {
        $graph[] = vv_person_schema();
        $graph[] = vv_professional_service_schema();
        foreach ( vv_book_schemas() as $book ) $graph[] = $book;
        $il = vv_service_itemlist_schema();
        if ( $il ) $graph[] = $il;
        // Note: WebSite + SearchAction already injected in post_content — skip
    }

    // Individual service pages
    if ( ! is_front_page() && is_page() ) {
        $svc = vv_service_schema_for_page();
        if ( $svc ) $graph[] = $svc;
    }

    // Blog posts / articles
    if ( is_single() && get_post_type() === 'post' ) {
        $graph[] = vv_article_schema();
    }

    // Speakable
    $speakable_slugs = [
        'best-vastu-consultant-bangalore', 'best-vastu-consultant-india',
        'online-vastu-consultation', 'what-is-vastu-shastra', 'vastu-remedies',
    ];
    if ( is_page() && in_array( get_post_field( 'post_name', get_queried_object_id() ), $speakable_slugs, true ) ) {
        $graph[] = vv_speakable_schema();
    }

    // Glossary page
    if ( is_page( 'vastu-glossary' ) ) {
        $graph[] = vv_defined_term_set_schema();
    }

    $graph = array_filter( $graph );
    if ( empty( $graph ) ) return;

    $output = wp_json_encode(
        [ '@context' => 'https://schema.org', '@graph' => array_values( $graph ) ],
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
    );

    echo '<script type="application/ld+json">' . "\n" . $output . "\n" . '</script>' . "\n";
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function vv_iso_date( $mysql_date ) {
    if ( ! $mysql_date || $mysql_date === '0000-00-00 00:00:00' ) return null;
    return gmdate( 'c', strtotime( $mysql_date ) );
}

function vv_page_image( $post_id = null ) {
    if ( ! $post_id ) $post_id = get_queried_object_id();
    $thumb = get_post_thumbnail_id( $post_id );
    if ( $thumb ) {
        $src = wp_get_attachment_image_src( $thumb, 'large' );
        if ( $src ) return $src[0];
    }
    return VV_LOGO_URL;
}

// ── Person schema ──────────────────────────────────────────────────────────────
function vv_person_schema() {
    return [
        '@type'      => 'Person',
        '@id'        => VV_PERSON_ID,
        'name'       => 'Raghavendra Hebbur',
        'givenName'  => 'Raghavendra',
        'familyName' => 'Hebbur',
        'url'        => VV_SITE_URL,
        'image'      => [
            '@type'  => 'ImageObject',
            'url'    => VV_LOGO_URL,
            'width'  => 400,
            'height' => 400,
        ],
        'jobTitle'   => 'Vastu Shastra Consultant',
        'description' => 'Raghavendra Hebbur is a certified Vastu Shastra consultant with 15+ years of experience helping 620+ clients across Bangalore, India, and internationally with home, office, and commercial Vastu consultations.',
        'telephone'  => '+91-9739105574',
        'email'      => 'vastu@vardhinivastu.in',
        'address'    => [
            '@type'           => 'PostalAddress',
            'addressLocality' => 'Bangalore',
            'addressRegion'   => 'Karnataka',
            'postalCode'      => '560001',
            'addressCountry'  => 'IN',
        ],
        'knowsAbout' => [
            [ '@type' => 'Thing', 'name' => 'Vastu Shastra',               'url' => 'https://en.wikipedia.org/wiki/Vastu_shastra' ],
            [ '@type' => 'Thing', 'name' => 'Feng Shui',                   'url' => 'https://en.wikipedia.org/wiki/Feng_shui' ],
            [ '@type' => 'Thing', 'name' => 'Astrology',                   'url' => 'https://en.wikipedia.org/wiki/Astrology' ],
            [ '@type' => 'Thing', 'name' => 'Indian Architecture',         'url' => 'https://en.wikipedia.org/wiki/Indian_architecture' ],
            [ '@type' => 'Thing', 'name' => 'Pancha Bhuta',                'url' => 'https://en.wikipedia.org/wiki/Pancha_bhuta' ],
            [ '@type' => 'Thing', 'name' => 'Griha Pravesh',               'url' => 'https://en.wikipedia.org/wiki/Griha_pravesh' ],
        ],
        'hasCredential' => [
            [
                '@type'               => 'EducationalOccupationalCredential',
                'name'                => 'Certified Vastu Consultant',
                'credentialCategory'  => 'Professional Certification',
            ],
        ],
        'award'      => [
            'Best Vastu Consultant Bangalore 2023',
            'Top Vastu Expert India 2024',
        ],
        'sameAs'     => [
            'https://www.facebook.com/r.hebbur',
            'https://www.youtube.com/@Vardhinivastu',
            'https://www.linkedin.com/company/vardhini-vastu',
            'https://www.instagram.com/vardhinivastu/',
        ],
        'worksFor'   => [ '@id' => VV_BIZ_ID ],
    ];
}

// ── ProfessionalService schema ─────────────────────────────────────────────────
function vv_professional_service_schema() {
    $area_names = [
        'Bangalore', 'Whitefield', 'HSR Layout', 'Electronic City',
        'Marathahalli', 'Koramangala', 'JP Nagar', 'Indiranagar',
        'Rajajinagar', 'Malleshwaram', 'Hebbal', 'Sarjapur Road',
        'Bellandur', 'Bannerghatta Road', 'Yelahanka', 'BTM Layout',
        'Jayanagar', 'Banashankari', 'Vijayanagar', 'Kanakapura Road',
        'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune',
        'India',
    ];
    $area_served = array_map( function( $name ) {
        return [ '@type' => 'AdministrativeArea', 'name' => $name ];
    }, $area_names );

    return [
        '@type'        => [ 'LocalBusiness', 'ProfessionalService' ],
        '@id'          => VV_BIZ_ID,
        'name'         => 'Vardhini Vastu',
        'alternateName' => [ 'Vardhini Vastu Shastra', 'Raghavendra Hebbur Vastu Consultant' ],
        'url'          => VV_SITE_URL,
        'logo'         => [
            '@type'  => 'ImageObject',
            'url'    => VV_LOGO_URL,
            'width'  => 400,
            'height' => 400,
        ],
        'image'        => VV_LOGO_URL,
        'description'  => 'Vardhini Vastu offers expert Vastu Shastra consultations for homes, offices, factories, and plots across Bangalore and India. Led by certified consultant Raghavendra Hebbur with 15+ years of experience and 620+ satisfied clients.',
        'telephone'    => '+91-9739105574',
        'email'        => 'vastu@vardhinivastu.in',
        'priceRange'   => '₹₹',
        'currenciesAccepted' => 'INR',
        'paymentAccepted'    => 'Cash, UPI, Bank Transfer, Online',
        'address'      => [
            '@type'           => 'PostalAddress',
            'addressLocality' => 'Bangalore',
            'addressRegion'   => 'Karnataka',
            'postalCode'      => '560001',
            'addressCountry'  => 'IN',
        ],
        'geo'          => [
            '@type'     => 'GeoCoordinates',
            'latitude'  => 12.9716,
            'longitude' => 77.5946,
        ],
        'hasMap'       => 'https://maps.google.com/?q=Vardhini+Vastu+Bangalore',
        'openingHoursSpecification' => [
            [
                '@type'     => 'OpeningHoursSpecification',
                'dayOfWeek' => [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
                'opens'     => '09:00',
                'closes'    => '18:00',
            ],
        ],
        'areaServed'   => $area_served,
        'serviceType'  => 'Vastu Shastra Consultation',
        'knowsAbout'   => [
            [ '@type' => 'Thing', 'name' => 'Vastu Shastra',   'url' => 'https://en.wikipedia.org/wiki/Vastu_shastra' ],
            [ '@type' => 'Thing', 'name' => 'Home Vastu' ],
            [ '@type' => 'Thing', 'name' => 'Office Vastu' ],
            [ '@type' => 'Thing', 'name' => 'Commercial Vastu' ],
            [ '@type' => 'Thing', 'name' => 'Plot Vastu' ],
            [ '@type' => 'Thing', 'name' => 'Industrial Vastu' ],
        ],
        'aggregateRating' => [
            '@type'       => 'AggregateRating',
            'ratingValue' => '4.9',
            'reviewCount' => '620',
            'bestRating'  => '5',
            'worstRating' => '1',
        ],
        'founder'      => [ '@id' => VV_PERSON_ID ],
        'employee'     => [ '@id' => VV_PERSON_ID ],
        'about'        => [
            [ '@type' => 'Thing', 'name' => 'Vastu Shastra',            'url' => 'https://en.wikipedia.org/wiki/Vastu_shastra' ],
            [ '@type' => 'Thing', 'name' => 'Ancient Indian Architecture', 'url' => 'https://en.wikipedia.org/wiki/Indian_architecture' ],
        ],
        'mentions'     => [
            [ '@type' => 'Thing', 'name' => 'Pancha Bhuta',  'url' => 'https://en.wikipedia.org/wiki/Pancha_bhuta' ],
            [ '@type' => 'Thing', 'name' => 'Griha Pravesh' ],
            [ '@type' => 'Thing', 'name' => 'Five Elements of Vastu' ],
            [ '@type' => 'Thing', 'name' => 'Vastu Purusha Mandala' ],
        ],
        'sameAs'       => [
            'https://www.facebook.com/r.hebbur',
            'https://www.youtube.com/@Vardhinivastu',
            'https://www.linkedin.com/company/vardhini-vastu',
            'https://www.instagram.com/vardhinivastu/',
        ],
    ];
}

// ── Book schemas ───────────────────────────────────────────────────────────────
function vv_book_schemas() {
    return [
        [
            '@type'       => 'Book',
            '@id'         => VV_SITE_URL . '/#book-vastu-unlocked',
            'name'        => 'Vastu Unlocked',
            'author'      => [ '@id' => VV_PERSON_ID ],
            'url'         => VV_SITE_URL,
            'description' => 'A comprehensive guide to Vastu Shastra for modern homes and offices by Raghavendra Hebbur.',
            'genre'       => 'Vastu Shastra',
            'inLanguage'  => 'en',
            'publisher'   => [ '@id' => VV_BIZ_ID ],
        ],
        [
            '@type'       => 'Book',
            '@id'         => VV_SITE_URL . '/#book-science-of-harmony',
            'name'        => 'The Science of Harmony',
            'author'      => [ '@id' => VV_PERSON_ID ],
            'url'         => VV_SITE_URL,
            'description' => 'Exploring the ancient science of spatial harmony through Vastu Shastra principles by Raghavendra Hebbur.',
            'genre'       => 'Vastu Shastra',
            'inLanguage'  => 'en',
            'publisher'   => [ '@id' => VV_BIZ_ID ],
        ],
    ];
}

// ── Service ItemList (services overview / homepage) ────────────────────────────
function vv_service_itemlist_schema() {
    $services = [
        [ 'name' => 'Home Vastu Consultation',       'url' => VV_SITE_URL . '/vastu-for-home/' ],
        [ 'name' => 'Office Vastu Consultation',     'url' => VV_SITE_URL . '/vastu-for-office/' ],
        [ 'name' => 'Online Vastu Consultation',     'url' => VV_SITE_URL . '/online-vastu-consultation/' ],
        [ 'name' => 'Commercial Vastu Consultation', 'url' => VV_SITE_URL . '/vastu-for-commercial-spaces/' ],
        [ 'name' => 'Plot Vastu Analysis',           'url' => VV_SITE_URL . '/vastu-for-plot/' ],
        [ 'name' => 'Factory Vastu Consultation',    'url' => VV_SITE_URL . '/vastu-for-factory/' ],
        [ 'name' => 'Vastu Consultation for NRI',    'url' => VV_SITE_URL . '/vastu-for-nri/' ],
        [ 'name' => 'Vastu Consultation Fees',       'url' => VV_SITE_URL . '/vastu-consultation-fees/' ],
    ];

    $items = [];
    foreach ( $services as $i => $svc ) {
        $items[] = [
            '@type'    => 'ListItem',
            'position' => $i + 1,
            'name'     => $svc['name'],
            'url'      => $svc['url'],
        ];
    }

    return [
        '@type'           => 'ItemList',
        '@id'             => VV_SITE_URL . '/#service-list',
        'name'            => 'Vastu Consultation Services by Vardhini Vastu',
        'description'     => 'Complete list of Vastu Shastra consultation services offered by Raghavendra Hebbur across Bangalore and India.',
        'numberOfItems'   => count( $items ),
        'itemListElement' => $items,
    ];
}

// ── WebPage schema ─────────────────────────────────────────────────────────────
function vv_webpage_schema() {
    $post_id     = get_queried_object_id();
    $post        = $post_id ? get_post( $post_id ) : null;
    $current_url = $post_id ? ( get_permalink( $post_id ) ?: ( VV_SITE_URL . '/' ) ) : ( VV_SITE_URL . '/' );
    $page_image  = vv_page_image( $post_id );
    $title       = $post_id ? ( get_the_title( $post_id ) ?: get_bloginfo( 'name' ) ) : get_bloginfo( 'name' );

    $schema = [
        '@type'              => is_front_page() ? 'WebPage' : ( is_single() ? 'Article' : 'WebPage' ),
        '@id'                => $current_url . '#webpage',
        'url'                => $current_url,
        'name'               => $title,
        'isPartOf'           => [ '@id' => VV_SITE_URL . '/#website' ],
        'about'              => [ '@id' => VV_BIZ_ID ],
        'primaryImageOfPage' => [
            '@type' => 'ImageObject',
            'url'   => $page_image,
        ],
        'inLanguage'         => 'en-IN',
        'publisher'          => [ '@id' => VV_BIZ_ID ],
        'author'             => [ '@id' => VV_PERSON_ID ],
    ];

    if ( $post ) {
        if ( $post->post_date && $post->post_date !== '0000-00-00 00:00:00' ) {
            $schema['datePublished'] = vv_iso_date( $post->post_date );
        }
        if ( $post->post_modified && $post->post_modified !== '0000-00-00 00:00:00' ) {
            $schema['dateModified']  = vv_iso_date( $post->post_modified );
            $schema['lastReviewed']  = vv_iso_date( $post->post_modified );
            $schema['reviewedBy']    = [ '@id' => VV_PERSON_ID ];
        }
    }

    return $schema;
}

// ── BreadcrumbList schema ──────────────────────────────────────────────────────
function vv_breadcrumb_schema() {
    $post_id = get_queried_object_id();
    if ( ! $post_id ) return null;

    $items = [
        [
            '@type'    => 'ListItem',
            'position' => 1,
            'name'     => 'Home',
            'item'     => VV_SITE_URL . '/',
        ],
    ];

    if ( is_single() && get_post_type() === 'post' ) {
        $cats = get_the_category( $post_id );
        if ( $cats ) {
            $items[] = [
                '@type'    => 'ListItem',
                'position' => 2,
                'name'     => $cats[0]->name,
                'item'     => get_category_link( $cats[0]->term_id ),
            ];
            $items[] = [
                '@type'    => 'ListItem',
                'position' => 3,
                'name'     => get_the_title( $post_id ),
                'item'     => get_permalink( $post_id ),
            ];
        } else {
            $items[] = [
                '@type'    => 'ListItem',
                'position' => 2,
                'name'     => get_the_title( $post_id ),
                'item'     => get_permalink( $post_id ),
            ];
        }
    } else {
        $items[] = [
            '@type'    => 'ListItem',
            'position' => 2,
            'name'     => get_the_title( $post_id ),
            'item'     => get_permalink( $post_id ),
        ];
    }

    return [
        '@type'           => 'BreadcrumbList',
        '@id'             => get_permalink( $post_id ) . '#breadcrumb',
        'itemListElement' => $items,
    ];
}

// ── Service schema (individual service pages) ──────────────────────────────────
function vv_service_schema_for_page() {
    $post_id = get_queried_object_id();
    $slug    = get_post_field( 'post_name', $post_id );

    $service_map = [
        'vastu-for-home' => [
            'name'        => 'Home Vastu Consultation',
            'description' => 'Expert Vastu Shastra consultation for your home. Raghavendra Hebbur analyses floor plans, room placement, and cardinal directions to create harmonious and prosperous living spaces.',
            'price'       => '5000',
            'high_price'  => '25000',
        ],
        'vastu-for-office' => [
            'name'        => 'Office Vastu Consultation',
            'description' => 'Vastu consultation for offices and corporate establishments to enhance productivity, positive energy flow, and business prosperity.',
            'price'       => '7500',
            'high_price'  => '50000',
        ],
        'online-vastu-consultation' => [
            'name'        => 'Online Vastu Consultation',
            'description' => 'Online Vastu consultation via video call for clients across India and internationally. Share your floor plan and receive expert Vastu guidance remotely.',
            'price'       => '1500',
            'high_price'  => '5000',
        ],
        'vastu-consultation-fees' => [
            'name'        => 'Vastu Consultation Fees',
            'description' => 'Transparent fee structure for all Vastu Shastra consultation services — home, office, commercial, factory, plot, and online — by Raghavendra Hebbur.',
            'price'       => '1500',
            'high_price'  => '100000',
        ],
        'vastu-for-commercial-spaces' => [
            'name'        => 'Commercial Vastu Consultation',
            'description' => 'Vastu consultation for commercial spaces including shops, showrooms, malls, and business premises to attract prosperity, customers, and success.',
            'price'       => '10000',
            'high_price'  => '75000',
        ],
        'vastu-for-plot' => [
            'name'        => 'Vastu for Plot',
            'description' => 'Expert plot selection and Vastu analysis covering shape, direction, slopes, and surrounding environment before purchase or construction.',
            'price'       => '3000',
            'high_price'  => '10000',
        ],
        'vastu-for-factory' => [
            'name'        => 'Factory Vastu Consultation',
            'description' => 'Industrial Vastu consultation for factories and manufacturing units to improve production efficiency, worker safety, and overall business profitability.',
            'price'       => '15000',
            'high_price'  => '100000',
        ],
        'vastu-for-nri' => [
            'name'        => 'Vastu Consultation for NRI',
            'description' => 'Dedicated online Vastu consultation service for Non-Resident Indians (NRI) seeking expert Vastu advice for their properties in India.',
            'price'       => '3000',
            'high_price'  => '15000',
        ],
        'best-vastu-consultant-bangalore' => [
            'name'        => 'Best Vastu Consultant in Bangalore',
            'description' => 'Raghavendra Hebbur — rated the best Vastu consultant in Bangalore with 620+ satisfied clients, covering all areas including Whitefield, HSR Layout, Koramangala, Indiranagar, and more.',
            'price'       => '5000',
            'high_price'  => '50000',
        ],
        'best-vastu-consultant-india' => [
            'name'        => 'Best Vastu Consultant in India',
            'description' => 'Top-rated Vastu consultant in India. Raghavendra Hebbur provides expert Vastu Shastra services across all major Indian cities and internationally for NRI clients.',
            'price'       => '5000',
            'high_price'  => '50000',
        ],
        'services' => [
            'name'        => 'Vastu Consultation Services',
            'description' => 'Complete range of Vastu Shastra consultation services for homes, offices, factories, plots, and online consultations by Vardhini Vastu.',
            'price'       => '1500',
            'high_price'  => '100000',
        ],
    ];

    if ( ! isset( $service_map[ $slug ] ) ) return null;

    $svc         = $service_map[ $slug ];
    $current_url = get_permalink( $post_id );

    return [
        '@type'       => 'Service',
        '@id'         => $current_url . '#service',
        'name'        => $svc['name'],
        'description' => $svc['description'],
        'url'         => $current_url,
        'provider'    => [ '@id' => VV_BIZ_ID ],
        'areaServed'  => [
            [ '@type' => 'Country', 'name' => 'India' ],
            [ '@type' => 'City',    'name' => 'Bangalore' ],
        ],
        'offers'      => [
            '@type'              => 'Offer',
            'priceCurrency'      => 'INR',
            'priceSpecification' => [
                '@type'        => 'PriceSpecification',
                'minPrice'     => $svc['price'],
                'maxPrice'     => $svc['high_price'],
                'priceCurrency' => 'INR',
            ],
            'availability'  => 'https://schema.org/InStock',
            'url'           => $current_url,
            'seller'        => [ '@id' => VV_BIZ_ID ],
        ],
        'reviewedBy'       => [ '@id' => VV_PERSON_ID ],
        'aggregateRating'  => [
            '@type'       => 'AggregateRating',
            'ratingValue' => '4.9',
            'reviewCount' => '620',
            'bestRating'  => '5',
            'worstRating' => '1',
        ],
    ];
}

// ── Speakable schema ───────────────────────────────────────────────────────────
function vv_speakable_schema() {
    $current_url = get_permalink( get_queried_object_id() );
    return [
        '@type' => 'WebPage',
        '@id'   => $current_url . '#speakable',
        'url'   => $current_url,
        'speakable' => [
            '@type'      => 'SpeakableSpecification',
            'cssSelector' => [ '.entry-title', '.entry-summary', 'h1', '.speakable', 'h2:first-of-type' ],
        ],
    ];
}

// ── Article schema ─────────────────────────────────────────────────────────────
function vv_article_schema() {
    $post_id     = get_queried_object_id();
    $post        = get_post( $post_id );
    $current_url = get_permalink( $post_id );
    $page_image  = vv_page_image( $post_id );

    return [
        '@type'            => 'Article',
        '@id'              => $current_url . '#article',
        'headline'         => get_the_title( $post_id ),
        'url'              => $current_url,
        'datePublished'    => vv_iso_date( $post->post_date ),
        'dateModified'     => vv_iso_date( $post->post_modified ),
        'lastReviewed'     => vv_iso_date( $post->post_modified ),
        'reviewedBy'       => [ '@id' => VV_PERSON_ID ],
        'author'           => [ '@id' => VV_PERSON_ID ],
        'publisher'        => [ '@id' => VV_BIZ_ID ],
        'image'            => [
            '@type' => 'ImageObject',
            'url'   => $page_image,
        ],
        'mainEntityOfPage' => $current_url,
        'inLanguage'       => 'en-IN',
        'about'            => [
            '@type' => 'Thing',
            'name'  => 'Vastu Shastra',
            'url'   => 'https://en.wikipedia.org/wiki/Vastu_shastra',
        ],
        'mentions'         => [
            [ '@type' => 'Thing', 'name' => 'Vastu Shastra', 'url' => 'https://en.wikipedia.org/wiki/Vastu_shastra' ],
        ],
    ];
}

// ── DefinedTermSet schema (future glossary page) ───────────────────────────────
function vv_defined_term_set_schema() {
    $current_url = get_permalink( get_queried_object_id() );
    return [
        '@type'       => 'DefinedTermSet',
        '@id'         => $current_url . '#glossary',
        'name'        => 'Vastu Shastra Glossary',
        'description' => 'A comprehensive glossary of Vastu Shastra terms and concepts explained by certified Vastu consultant Raghavendra Hebbur.',
        'url'         => $current_url,
        'publisher'   => [ '@id' => VV_BIZ_ID ],
        'hasPart'     => [
            [
                '@type'               => 'DefinedTerm',
                'name'                => 'Vastu Purusha',
                'description'         => 'The metaphysical entity representing the site plan in Vastu Shastra. The Vastu Purusha Mandala is the energy grid governing spatial planning.',
                'inDefinedTermSet'    => $current_url . '#glossary',
            ],
            [
                '@type'               => 'DefinedTerm',
                'name'                => 'Pancha Bhuta',
                'description'         => 'The five classical elements in Vastu Shastra: Earth (Prithvi), Water (Jal), Fire (Agni), Air (Vayu), and Space (Akasha).',
                'url'                 => 'https://en.wikipedia.org/wiki/Pancha_bhuta',
                'inDefinedTermSet'    => $current_url . '#glossary',
            ],
            [
                '@type'               => 'DefinedTerm',
                'name'                => 'Brahmasthan',
                'description'         => 'The central zone of a building or plot in Vastu Shastra, considered the most sacred space, ideally kept open and unobstructed.',
                'inDefinedTermSet'    => $current_url . '#glossary',
            ],
            [
                '@type'               => 'DefinedTerm',
                'name'                => 'Griha Pravesh',
                'description'         => 'The auspicious house-warming ceremony in Hindu tradition performed before entering a new home, guided by Vastu Shastra principles for positive energy.',
                'inDefinedTermSet'    => $current_url . '#glossary',
            ],
            [
                '@type'               => 'DefinedTerm',
                'name'                => 'Vastu Dosh',
                'description'         => 'Vastu defects or imbalances in a property caused by incorrect placement of rooms, entrances, or structural elements that can be corrected through Vastu remedies.',
                'inDefinedTermSet'    => $current_url . '#glossary',
            ],
        ],
    ];
}
