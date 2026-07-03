/* ============================================================
   All titles, taglines, and descriptions below are fictional
   placeholder content created for this UI-clone demo only.
   No real show/movie names, logos, or artwork are used.
   ============================================================ */

const HERO_SLIDES = [
  {
    eyebrow: "Included with your membership",
    title: "The Last Signal",
    meta: "2026 · Sci-Fi Thriller · Season 1",
    desc: "When a decades-old deep-space transmission finally reaches Earth, a skeleton research crew must decide whether to answer it — before something else does.",
    gradient: "linear-gradient(120deg,#1a2c3d,#0b1520 60%)",
    accent: "#3fb6e8"
  },
  {
    eyebrow: "New season now streaming",
    title: "Harbor Lights",
    meta: "2026 · Crime Drama · Season 3",
    desc: "A detective returns to her hometown fishing port to investigate a case that unravels three generations of buried family secrets.",
    gradient: "linear-gradient(120deg,#2b1e14,#150d08 60%)",
    accent: "#e0a45c"
  },
  {
    eyebrow: "Streamly Original Movie",
    title: "Paper Cranes",
    meta: "2025 · Drama · 2h 11m",
    desc: "Two estranged siblings reunite for one final road trip to scatter their father's ashes, and rediscover why they stopped speaking.",
    gradient: "linear-gradient(120deg,#1c1430,#0c0918 60%)",
    accent: "#a684e8"
  },
  {
    eyebrow: "Award-winning series",
    title: "Ironvale",
    meta: "2026 · Fantasy Epic · Season 2",
    desc: "As the fractured kingdom of Ironvale teeters on civil war, a blacksmith's daughter discovers a forge-forged power that could end it — or ignite it.",
    gradient: "linear-gradient(120deg,#1f0f0f,#170808 60%)",
    accent: "#e85c5c"
  }
];

/* Simple inline-SVG "poster" generator so every card has a unique,
   colorful placeholder without needing external/copyrighted images. */
function posterSVG(label, c1, c2, tall = true) {
  const w = tall ? 220 : 320;
  const h = tall ? 320 : 180;
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='${c1}'/>
          <stop offset='100%' stop-color='${c2}'/>
        </linearGradient>
      </defs>
      <rect width='${w}' height='${h}' fill='url(#g)'/>
      <text x='50%' y='50%' font-family='Arial, sans-serif' font-size='${tall ? 20 : 24}'
        fill='rgba(255,255,255,0.9)' text-anchor='middle' dominant-baseline='middle'
        font-weight='700'>${label}</text>
    </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const PALETTE = [
  ["#3fb6e8", "#0b1520"], ["#e0a45c", "#2b1e14"], ["#a684e8", "#1c1430"],
  ["#e85c5c", "#1f0f0f"], ["#5ce8a0", "#0d1f16"], ["#e8d15c", "#201c08"],
  ["#5c7ce8", "#0b1030"], ["#e85ca0", "#200814"], ["#5ce8d1", "#08201c"],
  ["#c8e85c", "#151f08"]
];

function makeTitles(prefix, count, tall = true) {
  const items = [];
  for (let i = 1; i <= count; i++) {
    const [c1, c2] = PALETTE[i % PALETTE.length];
    items.push({
      title: `${prefix} ${i}`,
      img: posterSVG(`${prefix} ${i}`, c1, c2, tall)
    });
  }
  return items;
}

const ROWS = [
  { heading: "Continue Watching", items: makeTitles("Episode", 8, false), progress: true },
  { heading: "Top Picks for You", items: makeTitles("Feature", 10, true) },
  { heading: "New & Trending", items: makeTitles("Trending", 10, true) },
  { heading: "Streamly Originals", items: makeTitles("Original", 10, true) },
  { heading: "Action & Adventure", items: makeTitles("Action", 10, true) },
  { heading: "Award-Winning Dramas", items: makeTitles("Drama", 10, true) },
  { heading: "Comedies to Watch Tonight", items: makeTitles("Comedy", 10, true) },
  { heading: "Documentaries", items: makeTitles("Doc", 10, true) }
];
