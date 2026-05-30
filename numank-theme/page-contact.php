<?php
/*
Template Name: Contact Page
*/
get_header(); ?>

<div class="nm-page-hero">
  <div class="nm-container nm-center">
    <div class="nm-label">संपर्क करें</div>
    <h1>Book a Consultation</h1>
    <p style="color:var(--dim); font-size:18px; max-width:560px; margin:0 auto;">
      Reach Raghavendrra Hebbur directly. All readings are personal — no automated reports.
    </p>
  </div>
</div>

<section class="nm-section nm-section-dark">
  <div class="nm-container">
    <div style="display:grid; grid-template-columns:1fr 1.4fr; gap:60px; align-items:start;">

      <!-- Contact Info -->
      <div>
        <h3 style="margin-bottom:30px;">Get in Touch</h3>

        <div style="margin-bottom:28px;">
          <div style="font-family:var(--f-head); font-size:10px; letter-spacing:2px; color:var(--gold); text-transform:uppercase; margin-bottom:8px; opacity:0.8;">WhatsApp & Call</div>
          <a href="https://wa.me/919739105574" target="_blank" rel="noopener" style="font-size:22px; color:var(--cream); font-family:var(--f-head); letter-spacing:1px;">+91 97391 05574</a>
          <p style="color:var(--dim); font-size:15px; margin-top:5px;">Available Mon – Sat, 9 AM – 7 PM IST</p>
        </div>

        <div style="margin-bottom:28px;">
          <div style="font-family:var(--f-head); font-size:10px; letter-spacing:2px; color:var(--gold); text-transform:uppercase; margin-bottom:8px; opacity:0.8;">Email</div>
          <a href="mailto:raghu.hebbur@gmail.com" style="font-size:18px; color:var(--cream);">raghu.hebbur@gmail.com</a>
        </div>

        <div style="margin-bottom:36px;">
          <div style="font-family:var(--f-head); font-size:10px; letter-spacing:2px; color:var(--gold); text-transform:uppercase; margin-bottom:8px; opacity:0.8;">Also visit</div>
          <a href="https://vastuone.com" target="_blank" rel="noopener" style="display:block; color:var(--dim); font-size:16px; margin-bottom:6px;">vastuone.com</a>
          <a href="https://vardhinivastu.com" target="_blank" rel="noopener" style="display:block; color:var(--dim); font-size:16px;">vardhinivastu.com</a>
        </div>

        <a class="nm-btn nm-btn-gold" style="display:flex; align-items:center; gap:10px; justify-content:center; font-size:12px;"
           href="https://wa.me/919739105574?text=Namaste%20Raghavendrra%20ji%2C%20I%20want%20a%20Numerology%20consultation" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Chat on WhatsApp
        </a>
      </div>

      <!-- Enquiry Form -->
      <div>
        <h3 style="margin-bottom:30px;">Send an Enquiry</h3>
        <form class="nm-form-wrap" style="margin:0;" onsubmit="nmSendForm(event)">
          <div class="nm-form-row">
            <div class="nm-form-group">
              <label>Your Name *</label>
              <input type="text" id="cf-name" placeholder="Full name" required>
            </div>
            <div class="nm-form-group">
              <label>Date of Birth *</label>
              <input type="text" id="cf-dob" placeholder="DD/MM/YYYY" required>
            </div>
          </div>
          <div class="nm-form-row">
            <div class="nm-form-group">
              <label>Phone / WhatsApp *</label>
              <input type="tel" id="cf-phone" placeholder="+91 XXXXX XXXXX" required>
            </div>
            <div class="nm-form-group">
              <label>Email</label>
              <input type="email" id="cf-email" placeholder="your@email.com">
            </div>
          </div>
          <div class="nm-form-group">
            <label>Service Interested In *</label>
            <select id="cf-service" required>
              <option value="" disabled selected>— Select a service —</option>
              <option>Birth Number Analysis — ₹999</option>
              <option>Yearly Forecast — ₹1,499</option>
              <option>Name Correction — ₹2,499</option>
              <option>Business Numerology — ₹3,499</option>
              <option>Compatibility Reading — ₹1,299</option>
              <option>Baby Name Numerology — ₹1,799</option>
              <option>General Enquiry</option>
            </select>
          </div>
          <div class="nm-form-group">
            <label>Your Question / Message</label>
            <textarea id="cf-message" placeholder="Tell Raghavendrra ji what you would like guidance on..."></textarea>
          </div>
          <button type="submit" class="nm-form-submit">✦ Send Enquiry via WhatsApp</button>
        </form>
        <p style="color:var(--dim); font-size:13px; margin-top:12px; text-align:center; opacity:0.6;">
          This opens WhatsApp with your details pre-filled. No data is stored.
        </p>
      </div>

    </div>
  </div>
</section>

<script>
function nmSendForm(e) {
  e.preventDefault();
  var name    = document.getElementById('cf-name').value;
  var dob     = document.getElementById('cf-dob').value;
  var phone   = document.getElementById('cf-phone').value;
  var service = document.getElementById('cf-service').value;
  var msg     = document.getElementById('cf-message').value;
  var text = 'Namaste Raghavendrra ji,%0A%0A'
    + 'Name: ' + encodeURIComponent(name) + '%0A'
    + 'DOB: '  + encodeURIComponent(dob)  + '%0A'
    + 'Phone: '+ encodeURIComponent(phone)+ '%0A'
    + 'Service: '+ encodeURIComponent(service) + '%0A'
    + (msg ? 'Message: ' + encodeURIComponent(msg) : '');
  window.open('https://wa.me/919739105574?text=' + text, '_blank');
}
</script>

<?php get_footer(); ?>
