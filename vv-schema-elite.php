<?php
/**
 * VV Schema Elite — Advanced Competitive Schema Suite
 * Deploys: AggregateRating, ProfessionalService, Speakable,
 *          BreadcrumbList, Person+Credentials, Service+Offer, max-snippet
 * Version: 1.0
 */
if (!defined('ABSPATH')) exit;

add_action('wp_head', 'vv_elite_schema', 2);
function vv_elite_schema() {
    if (!is_singular()) return;

    global $post;
    $slug  = get_post_field('post_name', get_the_ID());
    $url   = get_permalink();
    $title = get_the_title();
    $phone = '+919739105574';

    // ── 1. max-snippet + large image preview (every page) ──────────────
    echo '<meta name="robots" content="max-snippet:-1,max-image-preview:large,max-video-preview:-1">' . "\n";

    // ── 2. BreadcrumbList (every page) ─────────────────────────────────
    $bc = array(
        array('@type' => 'ListItem', 'position' => 1, 'name' => 'Home', 'item' => 'https://vardhinivastu.in/'),
    );
    if (!is_front_page()) {
        $parent_id = $post->post_parent;
        if ($parent_id) {
            $bc[] = array('@type' => 'ListItem', 'position' => 2, 'name' => get_the_title($parent_id), 'item' => get_permalink($parent_id));
            $bc[] = array('@type' => 'ListItem', 'position' => 3, 'name' => $title, 'item' => $url);
        } else {
            $bc[] = array('@type' => 'ListItem', 'position' => 2, 'name' => $title, 'item' => $url);
        }
    }
    $breadcrumb = array('@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => $bc);
    echo '<script type="application/ld+json">' . json_encode($breadcrumb, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";

    // ── 3. Person schema — Raghavendra Hebbur (E-E-A-T sitewide) ───────
    $person = array(
        '@context'   => 'https://schema.org',
        '@type'      => 'Person',
        '@id'        => 'https://vardhinivastu.in/#raghavendra-hebbur',
        'name'       => 'Raghavendra Hebbur',
        'jobTitle'   => 'Vastu Shastra Consultant',
        'description'=> 'Degree-qualified Vastu Shastra consultant with 15+ years experience. Founder of Vardhini Vastu and creator of the VIDS system — 16-zone proprietary framework. 620+ successful consultations across India.',
        'url'        => 'https://vardhinivastu.in',
        'telephone'  => $phone,
        'address'    => array('@type' => 'PostalAddress', 'addressLocality' => 'Bangalore', 'addressRegion' => 'Karnataka', 'postalCode' => '560049', 'addressCountry' => 'IN'),
        'worksFor'   => array('@id' => 'https://vardhinivastu.in/#business'),
        'knowsAbout' => array('Vastu Shastra', 'VIDS System', 'Lecher Antenna', 'Zero Demolition Vastu', '16-Zone Analysis', 'Vastu for Homes', 'Vastu for Offices', 'Vastu Remedies'),
        'hasCredential' => array(
            array('@type' => 'EducationalOccupationalCredential', 'name' => 'Degree in Vastu Shastra', 'credentialCategory' => 'degree'),
            array('@type' => 'EducationalOccupationalCredential', 'name' => '15+ Years Vastu Consultation Practice', 'credentialCategory' => 'experience'),
        ),
        'hasOccupation' => array(
            '@type'              => 'Occupation',
            'name'               => 'Vastu Shastra Consultant',
            'occupationLocation' => array('@type' => 'City', 'name' => 'Bangalore'),
            'skills'             => 'Vastu Shastra, VIDS 16-Zone Analysis, Lecher Antenna, Zero Demolition Corrections',
        ),
    );
    echo '<script type="application/ld+json">' . json_encode($person, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";

    // ── 4. ProfessionalService + AggregateRating (money pages) ─────────
    $rating_slugs = array('services', 'best-vastu-consultant-bangalore', 'best-vastu-consultant-india',
        'online-vastu-consultation', 'vastu-consultation-fees', 'vastu-for-home');
    if (is_front_page() || in_array($slug, $rating_slugs)) {
        $agg = array(
            '@context'    => 'https://schema.org',
            '@type'       => 'ProfessionalService',
            '@id'         => 'https://vardhinivastu.in/#business',
            'name'        => 'Vardhini Vastu',
            'url'         => 'https://vardhinivastu.in',
            'telephone'   => $phone,
            'priceRange'  => 'Rs.5,000 - Rs.25,000',
            'address'     => array('@type' => 'PostalAddress', 'streetAddress' => 'Ajit Layout, Virgo Nagar', 'addressLocality' => 'Bangalore', 'addressRegion' => 'Karnataka', 'postalCode' => '560049', 'addressCountry' => 'IN'),
            'geo'         => array('@type' => 'GeoCoordinates', 'latitude' => 12.9716, 'longitude' => 77.5946),
            'areaServed'  => array(
                array('@type' => 'City',    'name' => 'Bangalore'),
                array('@type' => 'State',   'name' => 'Karnataka'),
                array('@type' => 'Country', 'name' => 'India'),
            ),
            'openingHoursSpecification' => array(array(
                '@type'      => 'OpeningHoursSpecification',
                'dayOfWeek'  => array('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'),
                'opens'      => '09:00',
                'closes'     => '19:00',
            )),
            'aggregateRating' => array(
                '@type'       => 'AggregateRating',
                'ratingValue' => '4.9',
                'reviewCount' => '620',
                'bestRating'  => '5',
                'worstRating' => '1',
            ),
            'founder'    => array('@id' => 'https://vardhinivastu.in/#raghavendra-hebbur'),
            'employee'   => array('@id' => 'https://vardhinivastu.in/#raghavendra-hebbur'),
            'serviceType'=> 'Vastu Shastra Consultation',
            'slogan'     => 'Zero Demolition Vastu. Measurable Results.',
            'hasOfferCatalog' => array(
                '@type' => 'OfferCatalog',
                'name'  => 'Vastu Consultation Services',
                'itemListElement' => array(
                    array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Residential Vastu Consultation'), 'price' => '5000', 'priceCurrency' => 'INR', 'availability' => 'https://schema.org/InStock'),
                    array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Commercial Vastu Consultation'), 'price' => '8000', 'priceCurrency' => 'INR', 'availability' => 'https://schema.org/InStock'),
                    array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Online Vastu Consultation'),    'price' => '5000', 'priceCurrency' => 'INR', 'availability' => 'https://schema.org/InStock'),
                    array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Factory Vastu Consultation'),   'price' => '15000','priceCurrency' => 'INR', 'availability' => 'https://schema.org/InStock'),
                ),
            ),
        );
        echo '<script type="application/ld+json">' . json_encode($agg, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
    }

    // ── 5. Speakable schema (voice search — almost no competitor uses) ──
    $speakable_slugs = array('best-vastu-consultant-bangalore', 'best-vastu-consultant-india',
        'online-vastu-consultation', 'what-is-vastu-shastra', 'vastu-remedies');
    if (is_front_page() || in_array($slug, $speakable_slugs)) {
        $speakable = array(
            '@context'  => 'https://schema.org',
            '@type'     => 'WebPage',
            '@id'       => $url . '#webpage',
            'name'      => $title,
            'url'       => $url,
            'speakable' => array(
                '@type'       => 'SpeakableSpecification',
                'cssSelector' => array('h1', 'h2:first-of-type', '.entry-title', '.page-title'),
            ),
            'author'       => array('@id' => 'https://vardhinivastu.in/#raghavendra-hebbur'),
            'publisher'    => array('@id' => 'https://vardhinivastu.in/#business'),
            'inLanguage'   => 'en-IN',
            'dateModified' => date('Y-m-d'),
        );
        echo '<script type="application/ld+json">' . json_encode($speakable, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
    }

    // ── 6. Service + Offer schema on individual service pages ───────────
    $service_map = array(
        'vastu-for-home'                  => array('Residential Vastu Consultation',  'Vastu analysis for homes, flats and villas using VIDS 16-zone framework.',    '5000'),
        'vastu-for-office'                => array('Office Vastu Consultation',        'Vastu energy mapping for offices and commercial spaces.',                      '8000'),
        'vastu-for-factory'               => array('Factory Vastu Consultation',       'Industrial and factory Vastu analysis and corrections.',                       '15000'),
        'online-vastu-consultation'       => array('Online Vastu Consultation',        'Video call floor plan Vastu analysis for any location in India and abroad.',   '5000'),
        'vastu-consultation-fees'         => array('Vastu Consultation',               'Professional Vastu Shastra consultation by Raghavendra Hebbur, Bangalore.',    '5000'),
        'vastu-for-bedroom'               => array('Bedroom Vastu Consultation',       'Bedroom zone analysis, sleep direction and master bedroom corrections.',        '5000'),
        'vastu-for-kitchen'               => array('Kitchen Vastu Consultation',       'Kitchen direction, stove placement and cooking zone Vastu analysis.',           '5000'),
        'best-vastu-consultant-bangalore' => array('Vastu Consultation Bangalore',     'On-site and online Vastu consultation across all areas of Bangalore.',         '5000'),
    );
    if (isset($service_map[$slug])) {
        $svc = $service_map[$slug];
        $service_schema = array(
            '@context'    => 'https://schema.org',
            '@type'       => 'Service',
            'name'        => $svc[0],
            'description' => $svc[1],
            'provider'    => array('@id' => 'https://vardhinivastu.in/#business'),
            'areaServed'  => array('@type' => 'Country', 'name' => 'India'),
            'serviceType' => 'Vastu Shastra Consultation',
            'hasOfferCatalog' => array(
                '@type' => 'OfferCatalog',
                'name'  => $svc[0],
                'itemListElement' => array(array(
                    '@type'         => 'Offer',
                    'price'         => $svc[2],
                    'priceCurrency' => 'INR',
                    'availability'  => 'https://schema.org/InStock',
                    'url'           => $url,
                )),
            ),
        );
        echo '<script type="application/ld+json">' . json_encode($service_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
    }
}
