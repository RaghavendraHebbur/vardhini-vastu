const fs = require('fs');
const files = [
  'geopathic-stress-remedies.html',
  'telluric-cosmic-energies-vastu.html',
  'scientific-vastu-instruments.html'
];

files.forEach(f => {
  let text = fs.readFileSync(f, 'utf8');
  
  // Normalize line endings to make it easier to search
  let normalizedText = text.replace(/\r\n/g, '\n');
  
  let damagedStr = `    </div>\n  </div>\n    const btn = document.getElementById("mobile-menu-btn");`;
    
  let fixedStr = `    </div>
  </div>
  
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

  if(normalizedText.includes(damagedStr)) {
    text = normalizedText.replace(damagedStr, fixedStr);
    fs.writeFileSync(f, text);
    console.log(f + ' fixed damaged footer');
  } else {
    console.log(f + ' did not match damaged string');
  }
});
