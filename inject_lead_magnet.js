const fs = require('fs');

const targetPages = [
  'telluric-cosmic-energies-vastu.html',
  'scientific-vastu-instruments.html',
  'geopathic-stress-remedies.html'
];

const leadMagnetHTML = `
<!-- LEAD MAGNET -->
<section style="background:var(--vv-orl); border-top:1px solid var(--vv-orm); border-bottom:1px solid var(--vv-orm); padding:64px 20px; text-align:center; margin-top:40px;">
    <div style="max-width:700px; margin:0 auto;">
        <span style="color:var(--vv-or); font-weight:700; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.1em; display:block; margin-bottom:12px;">Exclusive Offer</span>
        <h2 style="font-size:clamp(1.75rem,3vw,2.5rem); font-weight:800; color:var(--vv-tx); letter-spacing:-0.03em; margin:0 0 16px; line-height:1.2;">
            Free Download: Chapter 1 of <em style="font-style:normal; color:var(--vv-or);">Vastu Unlocked</em>
        </h2>
        <p style="font-size:1.05rem; color:var(--vv-tx2); line-height:1.6; margin:0 0 32px;">
            Start transforming your space immediately. Enter your email below to instantly receive the first chapter of Raghavendra Hebbur's definitive guide to Scientific Vastu in PDF format.
        </p>
        <form action="mailto:info@vardhinivastu.in" method="GET" style="display:flex; gap:12px; max-width:500px; margin:0 auto; flex-wrap:wrap;">
            <input type="email" placeholder="Enter your best email address" required style="flex:1; padding:14px 20px; border:1px solid var(--vv-bd); border-radius:10px; font-size:1rem; font-family:inherit; outline:none;" />
            <button type="submit" style="background:var(--vv-tx); color:#fff; padding:14px 28px; border:none; border-radius:10px; font-weight:700; font-size:1rem; cursor:pointer; font-family:inherit; white-space:nowrap;">
                Send My PDF
            </button>
        </form>
        <p style="font-size:0.8rem; color:var(--vv-tx3); margin-top:16px;">We respect your privacy. No spam, ever.</p>
    </div>
</section>
`;

for (const file of targetPages) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if it already has the lead magnet
    if (!content.includes('Free Download: Chapter 1')) {
      // Find a good place to insert it. Before the CTA section (<section class="sd">)
      if (content.includes('<section class="sd">')) {
        content = content.replace('<section class="sd">', leadMagnetHTML + '\n<section class="sd">');
      } else if (content.includes('</main>')) {
        content = content.replace('</main>', leadMagnetHTML + '\n</main>');
      } else {
        content += leadMagnetHTML;
      }
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Injected lead magnet into ${file}`);
    } else {
      console.log(`Lead magnet already exists in ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
}
