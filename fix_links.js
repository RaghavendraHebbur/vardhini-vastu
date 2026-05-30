const fs = require('fs');
const files = [
  'geopathic-stress-remedies.html',
  'telluric-cosmic-energies-vastu.html',
  'scientific-vastu-instruments.html'
];

files.forEach(f => {
  let text = fs.readFileSync(f, 'utf8');
  
  // The multi-replace messed up and left this weird concatenation
  // `  </div>\n    const btn =` or similar. Let's find exactly what it looks like.
  // Actually, we can just replace the damaged chunk:
  
  let damagedStr = `  </div>
    const btn = document.getElementById("mobile-menu-btn");`;
    
  let fixedStr = `  </div>
  
  <div class="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-900 text-center flex flex-col md:flex-row items-center justify-between gap-4">
    <p class="text-xs text-gray-500">
      &copy; 2026 Vardhini Vastu. All Rights Reserved. | Dedicated to Scientific and Non-Demolition Vastu.
    </p>
    <div class="flex items-center gap-6 text-xs text-gray-500">
      <a href="/privacy-policy.html" class="hover:text-orange-500 transition">Privacy Policy</a>
      <a href="/terms.html" class="hover:text-orange-500 transition">Terms of Service</a>
      <a href="/disclaimer.html" class="hover:text-orange-500 transition">Disclaimer</a>
    </div>
  </div>
</footer>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("mobile-menu-btn");`;

  if(text.includes(damagedStr)) {
    text = text.replace(damagedStr, fixedStr);
    fs.writeFileSync(f, text);
    console.log(f + ' fixed damaged footer');
  } else {
    console.log(f + ' did not match damaged string');
  }
});
