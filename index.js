// --- VARDHINI VASTU - INTERACTIVE HANDLER ---

// 16 Vastu Zones Data Dictionary
const vastuZones = {
  n: {
    name: "North (Uttara)",
    element: "water",
    attributes: "New opportunities, Career growth, Abundance, Wealth flow",
    balanced: "Attracts high-paying job offers, client deals, and a steady stream of career advancement opportunities.",
    unbalanced: "Stagnant business growth, blockages in new projects, lack of career prospects.",
    remedy: "Place a blue vase with fresh water, avoid red or yellow colors, install a green plant in this zone."
  },
  nne: {
    name: "North-North-East",
    element: "water",
    attributes: "Health, Immunity, Healing, Physical wellness",
    balanced: "Strengthens immunity, supports faster recovery from illnesses, maintains active energy levels.",
    unbalanced: "Frequent illness in the family, low physical energy, slow recovery post-treatment.",
    remedy: "Store medicines here for maximum efficacy. Avoid placing garbage or heavy metal storage in this zone."
  },
  ne: {
    name: "North-East (Ishanya)",
    element: "water",
    attributes: "Mental clarity, Wisdom, Spiritual connection, Meditation",
    balanced: "Provides sharp focus, breakthrough business ideas, spiritual alignment, and peaceful sleep.",
    unbalanced: "Confusion, indecisiveness, mental stress, lack of direction, and circular arguments.",
    remedy: "Keep this zone 100% clean and clutter-free. Ideal place for a meditation altar. Strictly avoid toilets."
  },
  ene: {
    name: "East-North-East",
    element: "air",
    attributes: "Recreation, Joy, Refreshment, Inner happiness",
    balanced: "Enhances mental rejuvenation, happiness, and creative relaxation. Promotes family bonding.",
    unbalanced: "Life feels boring, inability to relax, constantly feeling burnt out and stressed.",
    remedy: "Hang artwork representing happy moments, green forests, or open spaces. Avoid placing heavy machinery."
  },
  e: {
    name: "East (Purva)",
    element: "air",
    attributes: "Social associations, Networking, Public relations",
    balanced: "Attracts influential connections, positive networking opportunities, and strong social reputation.",
    unbalanced: "Isolation, feeling disconnected from society, bad reputation, and lack of support from peers.",
    remedy: "Hang a painting of a rising sun or green plants. Keep this area bright with natural light."
  },
  ese: {
    name: "East-South-East",
    element: "air",
    attributes: "Analytical thinking, Churning, Anxiety control",
    balanced: "Supports deep intellectual analysis, balanced decision-making, and stress release.",
    unbalanced: "Overthinking, severe anxiety, marital discord, and constant mental unrest.",
    remedy: "Use light pastel green/cream colors. Avoid placing a bed or meditation altar in this specific zone."
  },
  se: {
    name: "South-East (Agneya)",
    element: "fire",
    attributes: "Liquidity, Cash flow, Energy, Vitality",
    balanced: "Ensures smooth cash flow, timely payments from clients, and abundant physical stamina.",
    unbalanced: "Blocked funds, sudden financial losses, accidents, low confidence, and lethargy.",
    remedy: "Keep a red bulb lit. Use copper elements or green/red accents. Strictly avoid water bodies or blue colors."
  },
  sse: {
    name: "South-South-East",
    element: "fire",
    attributes: "Confidence, Power, Security, Mental strength",
    balanced: "Imparts fearlessness, physical strength, protection from negative energies, and inner power.",
    unbalanced: "Fear, insecurity, lack of confidence, stage fright, and physical weakness.",
    remedy: "Place a brass statue of a roaring lion. Ensure there is no mirror or blue color in this zone."
  },
  s: {
    name: "South (Dakshina)",
    element: "fire",
    attributes: "Fame, Recognition, Relaxation, Peace of mind",
    balanced: "Brings brand recognition, respect in your profession, deep sleep, and overall inner peace.",
    unbalanced: "Lack of recognition, restless sleep, defamed reputation, and constant running without output.",
    remedy: "Use warm red/pink/orange hues. Place certificates/awards here. Sleep with head pointing to the South."
  },
  ssw: {
    name: "South-South-West",
    element: "earth",
    attributes: "Disposal, Waste removal, Expenditure control",
    balanced: "Safely drains away negative energy, keeps unwanted expenses in check, and eliminates toxins.",
    unbalanced: "Drains wealth, constant medical expenses, wastage of effort, and feeling depleted.",
    remedy: "Ideal zone for a toilet, wastebin, or drainage system. Paint a yellow strip around drains."
  },
  sw: {
    name: "South-West (Nairutya)",
    element: "earth",
    attributes: "Relationships, Skills, Stability, Ancestral support",
    balanced: "Promotes strong family bonds, stable business partnerships, master craftsmanship, and longevity.",
    unbalanced: "Relationship breakups, regular family conflicts, unstable career, and inability to upgrade skills.",
    remedy: "Place a golden framed family photograph. Keep heavy brass elements. Avoid toilets or fire sources."
  },
  wsw: {
    name: "West-South-West",
    element: "space",
    attributes: "Education, Savings, Knowledge retention",
    balanced: "Helps children score higher in exams, promotes continuous learning, and ensures financial savings.",
    unbalanced: "Children fail to study, high expenditure, no savings despite earning well, poor memory.",
    remedy: "Ideal place for a study table, bookshelf, or a safe locker. Keep books and gold jewelry here."
  },
  w: {
    name: "West (Paschima)",
    element: "space",
    attributes: "Gains, Profits, Wishes fulfillment",
    balanced: "Brings commercial profits, material rewards, expansion of assets, and fulfillment of desires.",
    unbalanced: "No profit in business, zero return on investments, feeling of unfulfillment, and failed wishes.",
    remedy: "Place a round white vase, brass elements, or a white metal frame. Avoid red colors."
  },
  wnw: {
    name: "West-North-West",
    element: "space",
    attributes: "Detoxification, Depression relief, Letting go",
    balanced: "Allows you to release past emotional pain, detoxifies mind and body, and brings clarity.",
    unbalanced: "Chronic depression, holding onto grudges, continuous sadness, and physical toxicity.",
    remedy: "Use white or light grey colors. Ideal for storage of waste, but avoid placing cash lockers or temples."
  },
  nw: {
    name: "North-West (Vayavya)",
    element: "space",
    attributes: "Support system, Banking, Partners, Legal help",
    balanced: "Secures loans easily, attracts helpful friends/mentors, and keeps partners supportive in business.",
    unbalanced: "Lack of support in crisis, legal hassles, bank loans rejected, feeling abandoned.",
    remedy: "Place a white metal wind chime. Hang a painting of flying white birds. Avoid toilet setups."
  },
  nnw: {
    name: "North-North-West",
    element: "water",
    attributes: "Attraction, Customer pull, Relationships",
    balanced: "Attracts potential buyers, boosts marital bliss, increases client query flow for businesses.",
    unbalanced: "Zero customer footfall, cold relationships with spouse, lack of charm or appeal in life.",
    remedy: "Place green plants or blue elements. Maintain neat lighting to keep energy flowing."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // --- NAVBAR SCROLL EFFECT ---
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // --- MOBILE NAV MENU ---
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when a link is clicked
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      mobileToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      // Toggle current item
      const isActive = item.classList.contains("active");
      
      // Close all open FAQs
      faqItems.forEach(faq => {
        faq.classList.remove("active");
        faq.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        const answer = item.querySelector(".faq-answer");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // --- 16-ZONE WHEEL INTERACTION ---
  const slices = document.querySelectorAll(".zone-slice");
  const cardTitle = document.getElementById("zone-title");
  const cardElement = document.getElementById("zone-element");
  const cardAttributes = document.getElementById("zone-attributes");
  const cardBalanced = document.getElementById("zone-balanced");
  const cardUnbalanced = document.getElementById("zone-unbalanced");
  const cardRemedy = document.getElementById("zone-remedy");

  function updateZoneDetails(zoneKey) {
    const data = vastuZones[zoneKey];
    if (!data) return;

    // Update Text Content
    cardTitle.textContent = data.name;
    cardElement.textContent = `Element: ${data.element}`;
    cardAttributes.textContent = data.attributes;
    cardBalanced.textContent = data.balanced;
    cardUnbalanced.textContent = data.unbalanced;
    cardRemedy.textContent = data.remedy;

    // Update Element Tag Styling
    cardElement.className = "element-tag"; // Reset classes
    cardElement.classList.add(`element-${data.element}`);

    // Update SVG active selection
    slices.forEach(slice => {
      if (slice.getAttribute("data-zone") === zoneKey) {
        slice.classList.add("active");
      } else {
        slice.classList.remove("active");
      }
    });
  }

  // Attach click listeners to SVG slices
  slices.forEach(slice => {
    slice.addEventListener("click", (e) => {
      const zoneKey = e.currentTarget.getAttribute("data-zone");
      updateZoneDetails(zoneKey);
    });
  });

  // Initialize with North Zone details on load
  updateZoneDetails("n");
});
