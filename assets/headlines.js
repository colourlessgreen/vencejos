// headlines.js

const headlineSets = [
  {
    main: "For the terminally over it.",
    sub: "For people who looked around, sighed deeply, and chose to bounce."
  },
  {
    main: "We help the disillusioned.",
    sub: "A landing service for people who lost the plot at home."
  },
  {
    main: "Because some exits are self-respect.",
    sub: "For anyone who needs a softer landing and a harder exit."
  },
  {
    main: "The grass is greener, kinda.",
    sub: "For the ones who looked around and said, 'yeah, pass'."
  },
  {
    main: "America was getting to be a bit much.",
    sub: "For people who finally said enough."
  },
  {
    main: "Not a midlife crisis.",
    sub: "A strategic disappearance for people choosing dignity over rhetoric."
  },
  {
    main: "For people too self-aware to pretend this is fine.",
    sub: "For adults who are done pretending that their neighbours are the enemy."
  },
  {
    main: "Because there were never any bootstraps.",
    sub: "Because staying put started feeling like the less rational option."
  },
  {
    main: "Leaving is easier when the alternative is unbearable.",
    sub: "For people who know when the vibe is dead and want a better one."
  },
  {
    main: "We help you leave with your dignity intact.",
    sub: "You've said enough to mass deportations, concentration camps, and demonising neighbours."
  },
  {
    main: "For people with exquisite taste in disappointment.",
    sub: "For those who are now too old to be fine with the post-Bowie world."
  },
  {
    main: "For people who finally admitted it.",
    sub: "For people who finally admitted America is exhausting and started planning an exit."
  },
  {
    main: "For the mildly disillusioned.",
    sub: "For the mildly disillusioned, severely over it, and still have enough left  in them to make a change."
  },
  {
    main: "Because staying put stopped making sense.",
    sub: "Because staying put started feeling like the less rational option."
  },
  {
    main: "For people who know when to fold.",
    sub: "Double down on your dignity and fold on the rest. We help you leave with your dignity intact."
  },
  {
    main: "A strategic disappearance.",
    sub: "Not a midlife crisis. A strategic disappearance to a place with better light and slower news."
  }
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

(function initHeadlines() {
  const mainEl = document.getElementById("headline-main");
  const subEl  = document.getElementById("headline-sub");

  if (!mainEl) return;

  const chosen = pickRandom(headlineSets);
  mainEl.textContent = chosen.main;
  if (subEl) subEl.textContent = chosen.sub;
})();