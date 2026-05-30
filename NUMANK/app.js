const nameValues = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

const numerologyData = {
  1: { friendly: [9, 2, 5, 3, 6, 1], enemy: [8], traits: "Leader, independent, ambitious" },
  2: { friendly: [1, 5, 3, 2], enemy: [4, 8, 9], traits: "Intuitive, cooperative, emotional" },
  3: { friendly: [1, 5, 3], enemy: [6], traits: "Creative, expressive, optimistic" },
  4: { friendly: [7, 1, 5, 6], enemy: [2, 4, 8, 9], traits: "Practical, structured, unusual" },
  5: { friendly: [1, 2, 3, 6, 5], enemy: [], traits: "Versatile, clever, adaptive" },
  6: { friendly: [1, 7, 4, 6, 5], enemy: [3], traits: "Artistic, caring, harmonious" },
  7: { friendly: [4, 6, 1, 5], enemy: [], traits: "Researching, spiritual, deep" },
  8: { friendly: [5, 3, 6], enemy: [1, 2, 4, 8], traits: "Powerful, karmic, disciplined" },
  9: { friendly: [1, 5], enemy: [2, 4], traits: "Action-oriented, bold, idealistic" }
};

const antiNumbers = { 1: 8, 8: 1, 3: 6, 6: 3 };
const favourableCompounds = [3, 5, 6, 10, 12, 14, 15, 19, 23, 24, 32, 33, 37, 41, 42, 46, 50, 51, 55, 59, 60, 64, 66, 68, 69, 73, 86, 91, 95, 96];
const okCompounds = [21, 27, 30, 39, 45, 75, 77, 78, 93];
const unfavourableCompounds = [1, 2, 4, 7, 8, 9, 11, 13, 16, 17, 18, 20, 22, 25, 26, 28, 29, 31, 34, 35, 36, 38, 40, 43, 44, 47, 48, 49, 52, 53, 54, 56, 57, 58, 61, 62, 63, 65, 67, 70, 71, 72, 74, 76, 79, 80, 81, 82, 83, 84, 85, 87, 88, 89, 90, 92, 94, 97, 98, 99, 100];

const compoundsData = {
  1: { favourable: [10, 19, 37, 46, 55, 64, 73, 91], ok: [] },
  3: { favourable: [3, 12, 66], ok: [21, 30, 39, 75, 93] },
  5: { favourable: [5, 14, 23, 32, 41, 50, 59, 68, 86, 95], ok: [77] },
  6: { favourable: [6, 15, 24, 33, 42, 51, 60, 69, 86, 96], ok: [78] },
  9: { favourable: [], ok: [27, 45] }
};

const compoundMeanings = {
  1: "More failures chances, confusion, troublesome.",
  2: "Imaginative, fearful, low confidence, missed chances.",
  3: "Honest, creative, self-made, spiritual, intelligent. Avoid if Mulank or Bhagyank is 6.",
  4: "Unique thinking, hidden fear, health issues, struggles.",
  5: "Multi-talented, comfort-loving, fame, wealth by luck.",
  6: "Success, support, peace, wealth, art, happy family. Avoid if Mulank or Bhagyank is 3.",
  7: "Great advisor, public support, life changes, unrewarded effort.",
  8: "Risky, spiritual path, Saturn struggle.",
  9: "Action, life lessons, travel, unpredictable.",
  10: "Pleasant, humble, honest, wealthy.",
  11: "Betrayal risk, money handling, water danger, job issues.",
  12: "Empathetic, social cause, tough start, good ending.",
  13: "Material success with struggle; avoid affairs and impulsive choices.",
  14: "Friendly, travel-loving, unstable, trust issues.",
  15: "Multiple income, fame, attraction, talkative.",
  16: "Sudden shock, fall from power, research ability.",
  17: "Hardworking, strong will, revolutionary, lower success ease.",
  18: "Extreme results, delay, empty success, selfish patterns.",
  19: "Rising sun, sure success, good partner, high position.",
  20: "Creative and artistic, but needs control over anger.",
  21: "Growth with age, planning, goals, self-focus.",
  22: "Administrative ability with self-destructive risk.",
  23: "Strong support, respect, success, lucky for politics and business.",
  24: "Business growth, rich and famous, good partner support.",
  25: "Life struggle, money loss, fame and glamorous social life.",
  26: "Investment risk, false promises, loss through friends.",
  27: "Powerful service and healing number if 9 is truly favourable.",
  28: "Restart patterns, court issues, sudden gains and losses.",
  29: "Strong will, creative, opposite-gender and authority issues.",
  30: "Helpful, wise, soft, loyal, social worker vibration.",
  31: "Independent, unconventional, business-oriented, detached.",
  32: "Unexpected success, charm, public appeal, wealth growth.",
  33: "Ashta Lakshmi vibration, multiple income, education and luxury.",
  37: "Charm, love success, wealth growth, favourable public image.",
  41: "Success magnet, leadership, competition, governance power.",
  42: "Charisma, media success, artistic growth, confidence.",
  45: "Happy and wealthy, leadership, health shield, status.",
  46: "Good partner, children, career rise, public love.",
  50: "Imaginative, speaker, sharp thinker, wins through words.",
  51: "Magnetic personality, sudden money, many connections.",
  55: "Wisdom, bright mind, advisor, good solo work.",
  60: "Logical speaker, peaceful home, entertainment and art.",
  64: "Help, government role, rare work, genius mind.",
  66: "Many talents, midlife earnings, happy life.",
  69: "Looks, self-made rise, personal spending, big earning chance.",
  73: "Fame, government support, planning, multi-source income.",
  75: "Creative writing, speech income, music, acting.",
  77: "Justice, foreign travel, spiritual fame.",
  78: "Creative fields, attractive speech, occult and intellect.",
  86: "Government support, wealth accumulation, business support.",
  91: "Very good, willpower, travel, export-import and meditation.",
  93: "Smart mind, problem solver, creative, name and fame.",
  95: "Fame, courage, travel benefits, quick energy.",
  96: "Knowledge, writing, magnetic personality, successful action.",
  108: "Best for NGO, world fame, leadership and respect."
};

const rules = {
  en: [
    "Balance the name only on 1, 3, 5, or 6.",
    "Never balance a first name or full name on 4 or 8.",
    "Use 9 only when you are completely sure it has always been favourable.",
    "First name and full name totals must not be anti to Mulank or Bhagyank.",
    "If Mulank or Bhagyank is 8, avoid name total 1.",
    "If Mulank or Bhagyank is 3, avoid name total 6.",
    "If Mulank or Bhagyank is 6, avoid name total 3.",
    "First priority is first name balance; second priority is full name balance.",
    "Use minimum extra letters, preferably one or two, and keep spelling natural.",
    "Check compound meaning, sound vibration, repeated letters, and negative sequences before finalizing."
  ],
  hi: [
    "नाम को केवल 1, 3, 5 या 6 पर संतुलित करें।",
    "पहले नाम या पूरे नाम को 4 या 8 पर संतुलित न करें।",
    "9 का उपयोग केवल तब करें जब आप पूरी तरह आश्वस्त हों कि यह अनुकूल है।",
    "पहले नाम और पूरे नाम के योग मूलांक या भाग्यांक के विरोधी नहीं होने चाहिए।",
    "यदि मूलांक या भाग्यांक 8 है, तो नाम का योग 1 न रखें।",
    "यदि मूलांक या भाग्यांक 3 है, तो नाम का योग 6 न रखें।",
    "यदि मूलांक या भाग्यांक 6 है, तो नाम का योग 3 न रखें।",
    "पहली प्राथमिकता पहले नाम को संतुलित करना है; दूसरी प्राथमिकता पूरे नाम की है।",
    "कम से कम अतिरिक्त अक्षर जोड़ें और नाम को प्राकृतिक रखें।",
    "अंतिम करने से पहले कंपाउंड अर्थ, ध्वनि, दोहराए अक्षर और नकारात्मक क्रम जांचें।"
  ]
};

const soundSecrets = [
  { keys: ["RA", "RI", "RHI", "BA", "BI", "BHI", "KA", "KI", "KHI"], effect: "Attracts fame and recognition.", type: "good" },
  { keys: ["MAN"], effect: "Money-making and home responsibility vibration.", type: "good" },
  { keys: ["AR"], effect: "Less chance of money shortage.", type: "good" },
  { keys: ["OM"], effect: "Helps remove negative energy.", type: "good" },
  { keys: ["LL", "CC", "GG", "SS"], effect: "Wealth attraction vibration.", type: "good" },
  { keys: ["LO", "SU", "SAD", "DI", "DHI", "NO", "WAR", "ILL", "NIL", "END"], effect: "Problem or rejection vibration. Consider correction.", type: "bad" },
  { keys: ["ON", "ANT"], effect: "Mixed effect; may suit companies more than individual names.", type: "warn" }
];

const negativeSequences = ["123", "234", "345", "456", "567", "678"];

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];

function reduceToSingleDigit(num) {
  let value = Math.abs(Number(num) || 0);
  while (value > 9) {
    value = String(value).split("").reduce((sum, digit) => sum + Number(digit), 0);
  }
  return value;
}

function calculateKua(year, gender) {
  const yearDigit = reduceToSingleDigit(year);
  if (gender === "male") return reduceToSingleDigit(11 - yearDigit);
  if (gender === "female") return reduceToSingleDigit(yearDigit + 4);
  return yearDigit;
}

function nameTotal(name) {
  return [...name.toUpperCase()].reduce((sum, char) => sum + (nameValues[char] || 0), 0);
}

function cleanName(value) {
  return value.trim().replace(/[^a-zA-Z]/g, "").toUpperCase();
}

function displayName(parts) {
  return parts.filter(Boolean).join(" ") || "Enter a name to begin";
}

function getLiveValues() {
  const firstName = cleanName(qs("#firstName").value);
  const middleName = cleanName(qs("#middleName").value);
  const lastName = cleanName(qs("#lastName").value);
  const fullName = `${firstName}${middleName}${lastName}`;
  const firstTotal = nameTotal(firstName);
  const fullTotal = nameTotal(fullName);

  return {
    firstName,
    middleName,
    lastName,
    fullName,
    firstTotal,
    fullTotal,
    firstSingle: reduceToSingleDigit(firstTotal),
    fullSingle: reduceToSingleDigit(fullTotal)
  };
}

function findCorrectionSuggestions(currentTotal, targetSingle) {
  const letters = Object.entries(nameValues);
  const singleLetter = letters
    .filter(([, value]) => reduceToSingleDigit(currentTotal + value) === targetSingle)
    .slice(0, 5)
    .map(([letter, value]) => ({ text: letter, value, total: currentTotal + value }));

  if (singleLetter.length >= 3) return singleLetter.slice(0, 3);

  const suggestions = [...singleLetter];
  for (const [letterA, valueA] of letters) {
    for (const [letterB, valueB] of letters) {
      const total = currentTotal + valueA + valueB;
      if (reduceToSingleDigit(total) === targetSingle) {
        suggestions.push({ text: `${letterA}${letterB}`, value: valueA + valueB, total });
      }
      if (suggestions.length >= 3) return suggestions;
    }
  }

  return suggestions;
}

function updateLiveStudio() {
  const live = getLiveValues();
  const target = Number(qs("#targetNumber").value);
  const hasName = Boolean(live.firstName || live.middleName || live.lastName);

  qs("#liveName").textContent = displayName([live.firstName, live.middleName, live.lastName]);
  qs("#liveMetrics").innerHTML = [
    ["First", live.firstTotal],
    ["Full", live.fullTotal],
    ["Single", live.fullSingle]
  ].map(([label, value]) => `<div><small>${label}</small><strong>${value}</strong></div>`).join("");

  if (!hasName) {
    qs("#suggestionGrid").innerHTML = `<div class="suggestion-card"><small>Waiting</small><strong>-</strong><p class="studio-note">Type a first name to see correction hints.</p></div>`;
    qs("#liveNote").textContent = "Use DDMMYYYY for date of birth. The full report appears after calculation.";
    return;
  }

  const firstStatus = getCompoundStatus(live.firstTotal);
  const fullStatus = getCompoundStatus(live.fullTotal);
  qs("#liveNote").textContent = `First compound is ${firstStatus.label.toLowerCase()}. Full compound is ${fullStatus.label.toLowerCase()}.`;

  const suggestions = findCorrectionSuggestions(live.fullTotal, target);
  qs("#suggestionGrid").innerHTML = suggestions.map((item) => `
    <button class="suggestion-card suggestion-button" type="button" data-suggestion="${item.text}">
      <small>Add letters</small>
      <strong>${item.text}</strong>
      <span class="chip">New total ${item.total} / ${target}</span>
    </button>
  `).join("");

  qsa(".suggestion-button").forEach((button) => {
    button.addEventListener("click", () => {
      const lastName = qs("#lastName");
      lastName.value = `${lastName.value}${button.dataset.suggestion}`;
      updateLiveStudio();
      lastName.focus();
    });
  });
}

function parseDob(value) {
  if (!/^\d{8}$/.test(value)) {
    throw new Error("Enter date of birth in DDMMYYYY format.");
  }

  const day = Number(value.slice(0, 2));
  const month = Number(value.slice(2, 4));
  const year = Number(value.slice(4));
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error("Enter a real calendar date in DDMMYYYY format.");
  }

  return { day, month, year, display: `${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}-${year}` };
}

function getCompoundStatus(num) {
  if (favourableCompounds.includes(num)) return { label: "Favourable", type: "good" };
  if (okCompounds.includes(num)) return { label: "OK to use", type: "warn" };
  if (unfavourableCompounds.includes(num)) return { label: "Unfavourable", type: "bad" };
  return { label: "Review manually", type: "warn" };
}

function singleCompatibility(num, mulank, bhagyank) {
  const allowed = [1, 3, 5, 6].includes(num);
  const anti = antiNumbers[num];
  if (!allowed) return { label: "Not a balancing number", type: "bad" };
  if (anti === mulank || anti === bhagyank) return { label: `Anti to ${anti === mulank ? "Mulank" : "Bhagyank"}`, type: "bad" };
  return { label: "Favourable", type: "good" };
}

function analyzeLoshu(dob, mulank, bhagyank, kua) {
  const counts = {};
  [...dob].map(Number).filter(Boolean).forEach((digit) => counts[digit] = (counts[digit] || 0) + 1);
  [mulank, bhagyank, kua].forEach((digit) => counts[digit] = (counts[digit] || 0) + 1);
  const missing = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((digit) => !counts[digit]);
  return { counts, missing };
}

function determinePriority(loshuCounts, kua, mulank, bhagyank) {
  const priority = [];

  [1, 3, 5, 6].forEach((num) => {
    const count = loshuCounts[num] || 0;
    const anti = antiNumbers[num];
    if (anti === mulank || anti === bhagyank) return;

    let level = 3;
    if (num === 1) {
      level = count <= 1 || (count === 2 && kua === 1) ? 1 : count === 2 ? 2 : 3;
    } else {
      level = count === 0 || (count === 1 && kua === num) ? 1 : count === 1 ? 2 : 3;
    }

    const reason = count === 0
      ? `${num} is missing in the Loshu grid.`
      : `${num} appears ${count} time${count === 1 ? "" : "s"} in the Loshu grid.`;

    priority.push({ num, level, reason });
  });

  return priority.sort((a, b) => a.level - b.level || a.num - b.num);
}

function renderChart() {
  const chart = qs("#chaldeanChart");
  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    ["A I J Q Y", "B K R", "C G L S", "D M T", "E H N X", "U V W", "O Z", "F P"]
  ];

  chart.innerHTML = rows.flatMap((row, index) => row.map((cell) => `<div class="chart-cell ${index === 0 ? "header" : ""}">${cell}</div>`)).join("");
}

function renderLoshu(dob, mulank, bhagyank, kua) {
  const { counts, missing } = analyzeLoshu(dob, mulank, bhagyank, kua);
  const sequence = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  qs("#loshuGrid").innerHTML = sequence.map((num) => {
    const tags = [];
    if (num === mulank) tags.push("M");
    if (num === bhagyank) tags.push("B");
    if (num === kua) tags.push("K");
    const count = counts[num] || 0;
    return `<div class="loshu-cell cell-${num}"><strong>${count ? num : ""}</strong><small>${tags.join(" ")} ${count ? `x${count}` : "missing"}</small></div>`;
  }).join("");

  qs("#missingNumbers").innerHTML = missing.length
    ? missing.map((num) => `<span class="chip">Missing ${num}</span>`).join("")
    : `<span class="chip">No missing numbers</span>`;

  return { counts, missing };
}

function renderNameBreakdown(parts) {
  qs("#nameBreakdown").innerHTML = parts.filter((part) => part.value).map((part) => {
    const tiles = [...part.value].map((char) => `<span class="letter-tile">${char}<small>${nameValues[char] || 0}</small></span>`).join("");
    return `<div><strong>${part.label}: ${part.value}</strong><div class="letters-row">${tiles}</div></div>`;
  }).join("");
}

function renderSoundScan(fullName) {
  const values = [...fullName].map((char) => nameValues[char] || 0).join("");
  const foundSecrets = soundSecrets
    .map((secret) => ({ ...secret, found: secret.keys.filter((key) => fullName.includes(key)) }))
    .filter((secret) => secret.found.length);

  const foundSequences = negativeSequences.filter((sequence) => values.includes(sequence));
  const cards = [];

  if (foundSecrets.length) {
    foundSecrets.forEach((secret) => cards.push(`<div class="scan-card"><strong>${secret.found.join(", ")} <span class="status ${secret.type}">${secret.type}</span></strong><p>${secret.effect}</p></div>`));
  } else {
    cards.push(`<div class="scan-card"><strong>No major sound pattern found</strong><p>The current sound scan did not detect the saved favourable or caution combinations.</p></div>`);
  }

  if (foundSequences.length) {
    cards.push(`<div class="scan-card"><strong>Negative sequence found <span class="status bad">${foundSequences.join(", ")}</span></strong><p>These number runs can attract relationship or life friction in the original rules.</p></div>`);
  } else {
    cards.push(`<div class="scan-card"><strong>No negative numerical sequence</strong><p>No 123, 234, 345, 456, 567, or 678 run was found.</p></div>`);
  }

  qs("#soundScan").innerHTML = cards.join("");
}

function renderAnalysis(data) {
  qs("#results").hidden = false;

  qs("#summaryStrip").innerHTML = [
    ["First name", data.firstName || "-"],
    ["Full name", data.fullName || "-"],
    ["DOB", data.dob.display],
    ["Gender", data.gender]
  ].map(([label, value]) => `<div class="preview-card"><small>${label}</small><strong>${value}</strong></div>`).join("");

  qs("#coreNumbers").innerHTML = [
    ["Mulank", data.mulank, numerologyData[data.mulank].traits],
    ["Bhagyank", data.bhagyank, numerologyData[data.bhagyank].traits],
    ["Kua", data.kua, "Feng Shui personal direction and energy reference."]
  ].map(([label, value, desc]) => `<div class="metric"><small>${label}</small><strong>${value}</strong><p>${desc}</p></div>`).join("");

  const loshu = renderLoshu(data.dob.raw, data.mulank, data.bhagyank, data.kua);

  renderNameBreakdown([
    { label: "First name", value: data.firstName },
    { label: "Middle name", value: data.middleName },
    { label: "Last name", value: data.lastName }
  ]);

  qs("#nameTotals").innerHTML = [
    ["First compound", data.firstTotal],
    ["First single", data.firstSingle],
    ["Full compound", data.fullTotal],
    ["Full single", data.fullSingle]
  ].map(([label, value]) => `<div class="total-card"><small>${label}</small><strong>${value}</strong></div>`).join("");

  const firstCompound = getCompoundStatus(data.firstTotal);
  const fullCompound = getCompoundStatus(data.fullTotal);
  const firstSingle = singleCompatibility(data.firstSingle, data.mulank, data.bhagyank);
  const fullSingle = singleCompatibility(data.fullSingle, data.mulank, data.bhagyank);

  qs("#compatibilityGrid").innerHTML = [
    ["First compound", data.firstTotal, firstCompound],
    ["First single", data.firstSingle, firstSingle],
    ["Full compound", data.fullTotal, fullCompound],
    ["Full single", data.fullSingle, fullSingle]
  ].map(([label, value, status]) => `<div class="status-card"><strong>${label}: ${value}</strong><span class="status ${status.type}">${status.label}</span></div>`).join("");

  const priorities = determinePriority(loshu.counts, data.kua, data.mulank, data.bhagyank);
  const priorityCards = priorities.map(({ num, level, reason }) => {
    const compounds = compoundsData[num];
    const fav = compounds.favourable.length ? `Favourable compounds: ${compounds.favourable.join(", ")}.` : "";
    const ok = compounds.ok.length ? `OK compounds: ${compounds.ok.join(", ")}.` : "";
    return `<div class="advice-card"><strong>Priority ${level}: balance on ${num}</strong><p>${reason} ${fav} ${ok}</p></div>`;
  });

  priorityCards.push(`<div class="advice-card"><strong>Number 9 note</strong><p>Use 9 only when it has clearly been favourable. Compounds 27 and 45 are acceptable only with that confidence.</p></div>`);
  if ((data.firstSingle === 3 && data.fullSingle === 6) || (data.firstSingle === 6 && data.fullSingle === 3)) {
    priorityCards.unshift(`<div class="advice-card"><strong>3-6 warning</strong><p>First name and full name are anti to each other. Correct one of these totals before finalizing.</p></div>`);
  }
  qs("#adviceList").innerHTML = priorityCards.join("");

  qs("#compoundMeanings").innerHTML = [
    ["First name", data.firstTotal],
    ["Full name", data.fullTotal]
  ].map(([label, value]) => {
    const status = getCompoundStatus(value);
    return `<div class="compound-card"><strong>${label}: ${value} <span class="status ${status.type}">${status.label}</span></strong><p>${compoundMeanings[value] || "Meaning not yet added to Numank. Review manually before finalizing."}</p></div>`;
  }).join("");

  renderSoundScan(data.fullName);
  qs("#results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleSubmit(event) {
  event.preventDefault();

  try {
    const firstName = cleanName(qs("#firstName").value);
    const middleName = cleanName(qs("#middleName").value);
    const lastName = cleanName(qs("#lastName").value);
    const gender = qs("#gender").value;
    const dob = parseDob(qs("#dob").value.trim());

    if (!firstName || !gender) throw new Error("First name and gender are required.");

    const fullName = `${firstName}${middleName}${lastName}`;
    const firstTotal = nameTotal(firstName);
    const fullTotal = nameTotal(fullName);
    const mulank = reduceToSingleDigit(dob.day);
    const bhagyank = reduceToSingleDigit(qs("#dob").value.trim());
    const kua = calculateKua(dob.year, gender);

    renderAnalysis({
      firstName,
      middleName,
      lastName,
      fullName,
      gender,
      dob: { ...dob, raw: qs("#dob").value.trim() },
      firstTotal,
      firstSingle: reduceToSingleDigit(firstTotal),
      fullTotal,
      fullSingle: reduceToSingleDigit(fullTotal),
      mulank,
      bhagyank,
      kua
    });
  } catch (error) {
    alert(error.message);
  }
}

function fillSample() {
  qs("#firstName").value = "Rahul";
  qs("#middleName").value = "K";
  qs("#lastName").value = "Sharma";
  qs("#dob").value = "05031986";
  qs("#gender").value = "male";
  updateLiveStudio();
}

function clearForm() {
  qs("#analysisForm").reset();
  qs("#results").hidden = true;
  updateLiveStudio();
  qs("#firstName").focus();
}

function toggleTheme() {
  document.body.classList.toggle("theme-night");
  localStorage.setItem("numank-theme", document.body.classList.contains("theme-night") ? "night" : "day");
}

function restoreTheme() {
  if (localStorage.getItem("numank-theme") === "night") {
    document.body.classList.add("theme-night");
  }
}

let ruleIndex = 0;
let activeUtterance = null;

function stopRules(reset = true) {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  if (reset) ruleIndex = 0;
  qs("#ruleProgressFill").style.width = reset ? "0%" : qs("#ruleProgressFill").style.width;
  qs("#ruleProgressText").textContent = reset ? "Ready" : qs("#ruleProgressText").textContent;
}

function speakNextRule() {
  if (!("speechSynthesis" in window)) {
    qs("#currentRule").textContent = "Text to speech is not supported in this browser.";
    return;
  }

  const language = qs("#ruleLanguage").value;
  const list = rules[language];
  const percent = Math.round((ruleIndex / list.length) * 100);
  qs("#ruleProgressFill").style.width = `${percent}%`;
  qs("#ruleProgressText").textContent = `${percent}%`;

  if (ruleIndex >= list.length) {
    qs("#ruleProgressFill").style.width = "100%";
    qs("#ruleProgressText").textContent = "Complete";
    qs("#currentRule").textContent = "All Numank balancing rules completed.";
    ruleIndex = 0;
    return;
  }

  const text = list[ruleIndex];
  qs("#currentRule").textContent = text;
  activeUtterance = new SpeechSynthesisUtterance(text);
  activeUtterance.lang = language === "hi" ? "hi-IN" : "en-US";
  activeUtterance.rate = Number(qs("#ruleRate").value);
  activeUtterance.onend = () => {
    ruleIndex += 1;
    speakNextRule();
  };
  window.speechSynthesis.speak(activeUtterance);
}

function startRules() {
  stopRules(false);
  ruleIndex = 0;
  speakNextRule();
}

qs("#analysisForm").addEventListener("submit", handleSubmit);
["#firstName", "#middleName", "#lastName", "#dob", "#gender", "#targetNumber"].forEach((selector) => {
  qs(selector).addEventListener("input", updateLiveStudio);
  qs(selector).addEventListener("change", updateLiveStudio);
});
qs("#dob").addEventListener("input", (event) => {
  event.target.value = event.target.value.replace(/\D/g, "").slice(0, 8);
});
qs("#sampleButton").addEventListener("click", fillSample);
qs("#clearButton").addEventListener("click", clearForm);
qs("#themeToggle").addEventListener("click", toggleTheme);
qs("#playRules").addEventListener("click", startRules);
qs("#stopRules").addEventListener("click", () => {
  stopRules(true);
  qs("#currentRule").textContent = "Playback stopped.";
});
qs("#ruleLanguage").addEventListener("change", () => {
  stopRules(true);
  qs("#currentRule").textContent = "Ready to play the Numank balancing rules.";
});

restoreTheme();
renderChart();
updateLiveStudio();
