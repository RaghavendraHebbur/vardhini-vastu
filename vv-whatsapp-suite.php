<?php
/**
 * VV WhatsApp Suite — Complete Automation
 * Version: 2.0
 */
if (!defined('ABSPATH')) exit;

// === Stealth CSS for AI citation blocks ===
add_action('wp_head', 'vv_stealth_ai_css', 1);
function vv_stealth_ai_css() {
    echo '<style id="vv-stealth">.ai-answer-block,.expert-insight,.quick-answer,.key-takeaways{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;pointer-events:none!important}</style>' . "\n";
}

// === WhatsApp Suite ===
add_action('wp_footer', 'vv_whatsapp_suite', 100);
function vv_whatsapp_suite() {
    $phone       = '919739105574';
    $page_slug   = get_post_field('post_name', get_the_ID());
    $context_messages = array(
        'vastu-consultation-fees'         => 'Hi Raghavendra, I checked your fees page and would like to know more about the consultation package.',
        'online-vastu-consultation'       => 'Hi Raghavendra, I am interested in your online Vastu consultation. Can you share more details?',
        'vastu-for-home'                  => 'Hi Raghavendra, I need Vastu guidance for my home. Can we schedule a consultation?',
        'vastu-for-office'                => 'Hi Raghavendra, I am looking for Vastu consultation for my office or commercial space.',
        'best-vastu-consultant-bangalore' => 'Hi Raghavendra, I am in Bangalore and looking for a Vastu consultation. Can we connect?',
        'best-vastu-consultant-india'     => 'Hi Raghavendra, I found your profile while searching for the best Vastu consultant. Can we talk?',
        'vastu-for-bedroom'               => 'Hi Raghavendra, I need Vastu advice for my bedroom. Can we schedule a consultation?',
        'vastu-for-kitchen'               => 'Hi Raghavendra, I need Vastu guidance for my kitchen layout.',
        'vastu-for-pooja-room'            => 'Hi Raghavendra, I would like guidance on the ideal Vastu for my Pooja room.',
        'vastu-for-main-door'             => 'Hi Raghavendra, I have questions about the main door Vastu for my home.',
        'vastu-for-wealth'                => 'Hi Raghavendra, I am looking for Vastu remedies to improve wealth and prosperity.',
        'vastu-for-health'                => 'Hi Raghavendra, I would like Vastu consultation to improve health in my home.',
        'vastu-for-marriage'              => 'Hi Raghavendra, I am seeking Vastu advice related to marriage and relationships.',
        'vastu-for-career'                => 'Hi Raghavendra, I would like to understand how Vastu can help improve my career.',
        'vastu-for-children'              => 'Hi Raghavendra, I need Vastu consultation for my children education and growth.',
        'vastu-for-factory'               => 'Hi Raghavendra, I need Vastu consultation for my factory or industrial unit.',
        'vastu-remedies'                  => 'Hi Raghavendra, I am looking for Vastu remedies for my property. Can you help?',
        'vastu-complete-guide'            => 'Hi Raghavendra, I read your Vastu guide and have some specific questions.',
        'contact'                         => 'Hi Raghavendra, I would like to book a Vastu consultation.',
        'vastu-for-plot-selection'        => 'Hi Raghavendra, I need help selecting a Vastu-compliant plot.',
    );
    $raw_msg = isset($context_messages[$page_slug])
        ? $context_messages[$page_slug]
        : 'Hi Raghavendra, I visited vardhinivastu.in and would like to discuss Vastu for my property.';
    $msg     = urlencode($raw_msg);
    $wa_href = 'https://wa.me/' . $phone . '?text=' . $msg;
    ?>
    <style>
    #vv-wa-fab{position:fixed;bottom:28px;right:24px;width:60px;height:60px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:99999;box-shadow:0 4px 18px rgba(37,211,102,.55);cursor:pointer;text-decoration:none;transform:scale(0) translateY(20px);opacity:0;transition:transform .45s cubic-bezier(.34,1.56,.64,1),opacity .35s ease}
    #vv-wa-fab.vv-show{transform:scale(1) translateY(0);opacity:1}
    #vv-wa-fab::after{content:'';position:absolute;width:100%;height:100%;border-radius:50%;background:rgba(37,211,102,.4);animation:vvPulse 2s infinite}
    @keyframes vvPulse{0%{transform:scale(1);opacity:.7}70%{transform:scale(1.55);opacity:0}100%{transform:scale(1.55);opacity:0}}
    #vv-wa-fab svg{position:relative;z-index:1}
    #vv-wa-tooltip{position:fixed;bottom:98px;right:24px;background:#fff;color:#1a1a1a;padding:10px 16px;border-radius:20px 20px 4px 20px;font-family:system-ui,sans-serif;font-size:.88rem;box-shadow:0 4px 18px rgba(0,0,0,.18);z-index:99998;white-space:nowrap;opacity:0;transform:translateY(8px);transition:opacity .4s ease,transform .4s ease;pointer-events:none}
    #vv-wa-tooltip.vv-show{opacity:1;transform:translateY(0);pointer-events:auto}
    #vv-wa-tooltip span.vv-close-tip{margin-left:10px;cursor:pointer;font-size:.9rem;color:#999;pointer-events:auto}
    #vv-wa-mobile{display:none;position:fixed;bottom:0;left:0;width:100%;background:#25D366;color:#fff;text-align:center;padding:14px;font-family:system-ui,sans-serif;font-size:1rem;font-weight:700;z-index:99997;text-decoration:none;box-shadow:0 -2px 12px rgba(0,0,0,.2)}
    @media(max-width:640px){#vv-wa-mobile{display:block}#vv-wa-fab,#vv-wa-tooltip{display:none!important}}
    #vv-wa-exit{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:999999;align-items:center;justify-content:center;font-family:system-ui,sans-serif}
    #vv-wa-exit.show{display:flex}
    .vv-exit-box{background:#fff;border-radius:16px;padding:36px 32px 28px;max-width:420px;width:90%;text-align:center;position:relative;box-shadow:0 12px 40px rgba(0,0,0,.25)}
    .vv-exit-box h3{margin:0 0 10px;font-size:1.35rem;color:#1B4332}
    .vv-exit-box p{margin:0 0 22px;color:#555;font-size:.93rem;line-height:1.5}
    .vv-exit-cta{display:inline-block;background:#25D366;color:#fff;padding:14px 32px;border-radius:50px;font-size:1rem;font-weight:700;text-decoration:none;box-shadow:0 4px 14px rgba(37,211,102,.4)}
    #vv-wa-exit-close{position:absolute;top:12px;right:16px;font-size:1.4rem;cursor:pointer;color:#aaa;line-height:1;background:none;border:none}
    .vv-inline-wa{display:flex;align-items:center;gap:12px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:14px 20px;margin:28px 0;font-family:system-ui,sans-serif;font-size:.92rem;color:#166534}
    .vv-inline-wa a{white-space:nowrap;background:#25D366;color:#fff;padding:9px 20px;border-radius:50px;font-weight:700;text-decoration:none;font-size:.88rem}
    </style>

    <a id="vv-wa-fab" href="<?php echo esc_url($wa_href); ?>" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.882l6.179-1.448A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 0 1-4.997-1.371l-.358-.213-3.67.86.92-3.569-.234-.368A9.78 9.78 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
        </svg>
    </a>
    <div id="vv-wa-tooltip">
        <span id="vv-tip-text">Need Vastu advice? Chat now</span>
        <span class="vv-close-tip" onclick="this.parentElement.classList.remove('vv-show')" aria-label="Close">&times;</span>
    </div>
    <a id="vv-wa-mobile" href="<?php echo esc_url($wa_href); ?>" target="_blank" rel="noopener noreferrer">
        &#128242; WhatsApp Raghavendra Now
    </a>
    <div id="vv-wa-exit" role="dialog" aria-modal="true">
        <div class="vv-exit-box">
            <button id="vv-wa-exit-close" aria-label="Close">&times;</button>
            <h3>Before you leave&hellip;</h3>
            <p>Get a <strong>free 5-minute Vastu assessment</strong> for your property &mdash; just send us a message!</p>
            <a class="vv-exit-cta" href="<?php echo esc_url($wa_href); ?>" target="_blank" rel="noopener">Chat on WhatsApp</a>
        </div>
    </div>
    <script>
    (function(){
        var fab=document.getElementById('vv-wa-fab');
        var tip=document.getElementById('vv-wa-tooltip');
        var tipText=document.getElementById('vv-tip-text');
        var exitEl=document.getElementById('vv-wa-exit');
        var shown=false, tipDismissed=false;
        var hr=new Date().getHours();
        var greet=hr<12?'Good morning!':hr<17?'Good afternoon!':'Good evening!';
        if(tipText) tipText.textContent=greet+' Need Vastu guidance?';
        function showFab(){
            if(shown)return; shown=true;
            if(fab) fab.classList.add('vv-show');
            if(!tipDismissed){
                setTimeout(function(){
                    if(tip&&!tipDismissed) tip.classList.add('vv-show');
                    setTimeout(function(){if(tip)tip.classList.remove('vv-show');},6000);
                },2000);
            }
        }
        var docH=document.documentElement.scrollHeight-window.innerHeight;
        if(docH<400){setTimeout(showFab,3000);}
        else{
            window.addEventListener('scroll',function(){if(window.scrollY/docH>=0.25)showFab();},{passive:true});
            setTimeout(showFab,6000);
        }
        var closeTip=document.querySelector('.vv-close-tip');
        if(closeTip) closeTip.addEventListener('click',function(){tipDismissed=true;});

        // Exit intent — smart triggers
        var VV_COOLDOWN_DAYS=3;
        var lastShown=localStorage.getItem('vv_exit_ts');
        var cooldownOk=!lastShown||(Date.now()-parseInt(lastShown))>VV_COOLDOWN_DAYS*86400000;
        var pageStartTime=Date.now();
        var minTimeOnPage=20000;
        function vvShowExit(){
            if(!exitEl||exitEl.classList.contains('show'))return;
            if(!cooldownOk)return;
            if((Date.now()-pageStartTime)<minTimeOnPage)return;
            exitEl.classList.add('show');
            localStorage.setItem('vv_exit_ts',Date.now().toString());
            cooldownOk=false;
        }
        if(window.innerWidth>=641){
            var exitTimer=null;
            document.addEventListener('mouseleave',function(e){if(e.clientY<10){exitTimer=setTimeout(vvShowExit,300);}});
            document.addEventListener('mouseenter',function(){if(exitTimer){clearTimeout(exitTimer);exitTimer=null;}});
        }
        if(window.innerWidth<641){
            var mobileScrolled=false,mobileScrollTop=false;
            window.addEventListener('scroll',function(){
                if(window.scrollY>300)mobileScrolled=true;
                if(mobileScrolled&&window.scrollY<100)mobileScrollTop=true;
                if(mobileScrollTop)vvShowExit();
            },{passive:true});
            setTimeout(vvShowExit,90000);
        }
        var closeBtn=document.getElementById('vv-wa-exit-close');
        if(closeBtn) closeBtn.addEventListener('click',function(){if(exitEl)exitEl.classList.remove('show');});
        if(exitEl) exitEl.addEventListener('click',function(e){if(e.target===exitEl)exitEl.classList.remove('show');});
        if(fab) fab.addEventListener('click',function(){
            if(typeof gtag==='function') gtag('event','whatsapp_click',{event_category:'WhatsApp',event_label:'floating_fab'});
            if(typeof fbq==='function') fbq('track','Contact');
        });
        var exitCta=document.querySelector('.vv-exit-cta');
        if(exitCta) exitCta.addEventListener('click',function(){
            if(typeof gtag==='function') gtag('event','whatsapp_click',{event_category:'WhatsApp',event_label:'exit_intent'});
        });
        var mobileBar=document.getElementById('vv-wa-mobile');
        if(mobileBar) mobileBar.addEventListener('click',function(){
            if(typeof gtag==='function') gtag('event','whatsapp_click',{event_category:'WhatsApp',event_label:'mobile_sticky_bar'});
        });
    })();
    </script>
    <?php
}

// === Inline WhatsApp CTA in service page content ===
add_filter('the_content', 'vv_inline_wa_cta', 20);
function vv_inline_wa_cta($content) {
    if (!is_singular('page')) return $content;
    $slug = get_post_field('post_name', get_the_ID());
    $service_slugs = array(
        'vastu-consultation-fees','online-vastu-consultation','vastu-for-home',
        'vastu-for-office','vastu-for-bedroom','vastu-for-kitchen','vastu-for-living-room',
        'vastu-for-pooja-room','vastu-for-main-door','vastu-for-wealth','vastu-for-health',
        'vastu-for-marriage','vastu-for-career','vastu-for-children','vastu-for-factory',
        'vastu-remedies','best-vastu-consultant-bangalore','best-vastu-consultant-india',
        'vastu-for-home-office','vastu-for-conference-room','vastu-for-reception-desk'
    );
    if (!in_array($slug, $service_slugs)) return $content;
    $phone   = '919739105574';
    $raw     = 'Hi Raghavendra, I read your page on ' . get_the_title() . ' and would like a Vastu consultation.';
    $href    = 'https://wa.me/' . $phone . '?text=' . urlencode($raw);
    $cta_html = '<div class="vv-inline-wa" role="complementary">'
        . '<span><strong>Have a Vastu question?</strong> Get a quick answer from Raghavendra Hebbur directly.</span>'
        . '<a href="' . esc_url($href) . '" target="_blank" rel="noopener noreferrer">WhatsApp Now</a>'
        . '</div>';
    $pos = 0;
    for ($i = 0; $i < 2; $i++) {
        $next = strpos($content, '</p>', $pos);
        if ($next === false) break;
        $pos = $next + 4;
    }
    if ($pos > 0) {
        $content = substr($content, 0, $pos) . $cta_html . substr($content, $pos);
    }
    return $content;
}
