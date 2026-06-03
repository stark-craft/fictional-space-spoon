const STORAGE_KEY = "samsung_ug_personalization_v1";
const UPDATE_EVENT = "ug-personalization-updated";
const MAX_EVENTS = 80;

const TAGS = [
  "cricket",
  "football",
  "sports",
  "movie",
  "drama",
  "comedy",
  "scifi",
  "action",
  "music",
  "shopping",
  "food",
  "travel",
  "truecrime",
  "kids",
  "news",
];

const PLATFORMS = [
  "Netflix",
  "Prime Video",
  "JioHotstar",
  "BookMyShow",
  "Swiggy",
  "Glance",
  "MakeMyTrip",
  "Spotify",
  "Gaana",
  "FIFA",
];

const EVENT_WEIGHTS = {
  focus_dwell: 1,
  detail_open: 4,
  primary_action: 6,
  app_launch: 8,
  qr_open: 5,
  live_preview: 3,
  motion_preview: 3,
  content_open: 2,
  live_open: 8,
  web_open: 6,
};

const PLATFORM_ALIASES = {
  netflix: "Netflix",
  "prime video": "Prime Video",
  primevideo: "Prime Video",
  amazonprimevideo: "Prime Video",
  jiohotstar: "JioHotstar",
  "jio hotstar": "JioHotstar",
  hotstar: "JioHotstar",
  bookmyshow: "BookMyShow",
  "book my show": "BookMyShow",
  swiggy: "Swiggy",
  glance: "Glance",
  makemytrip: "MakeMyTrip",
  "make my trip": "MakeMyTrip",
  spotify: "Spotify",
  gaana: "Gaana",
  fifa: "FIFA",
  "fifa+": "FIFA",
};

const CATEGORY_AFFINITIES = {
  food: {
    food: 1.4,
    commerce: 1.15,
    shopping: 0.85,
    travel: 0.2,
    ticketing: 0.1,
  },
  shopping: {
    shopping: 1.3,
    commerce: 1.1,
    food: 0.75,
    travel: 0.45,
    ticketing: 0.2,
  },
  commerce: {
    commerce: 1.2,
    shopping: 1,
    food: 0.85,
    travel: 0.45,
    ticketing: 0.2,
  },
  travel: {
    travel: 1.35,
    commerce: 0.75,
    shopping: 0.45,
    food: 0.2,
  },
  ticketing: {
    ticketing: 1.15,
    sports: 0.55,
    cricket: 0.5,
    football: 0.5,
    movie: 0.5,
    music: 0.5,
    shopping: 0.25,
  },
  sports: {
    sports: 1.25,
    cricket: 1,
    football: 1,
    ticketing: 0.65,
    action: 0.15,
  },
  cricket: {
    cricket: 1.4,
    sports: 1.05,
    ticketing: 0.7,
  },
  football: {
    football: 1.4,
    sports: 1.05,
    ticketing: 0.7,
  },
  movie: {
    movie: 1.25,
    action: 0.75,
    scifi: 0.75,
    drama: 0.6,
    comedy: 0.6,
    ticketing: 0.55,
    music: 0.25,
  },
  action: {
    action: 1.25,
    scifi: 0.85,
    movie: 0.75,
    ticketing: 0.4,
  },
  scifi: {
    scifi: 1.25,
    action: 0.85,
    movie: 0.75,
    ticketing: 0.4,
  },
  drama: {
    drama: 1.25,
    movie: 0.75,
    comedy: 0.25,
  },
  comedy: {
    comedy: 1.25,
    movie: 0.75,
    drama: 0.25,
  },
  music: {
    music: 1.35,
    ticketing: 0.7,
    movie: 0.35,
    commerce: 0.25,
    shopping: 0.25,
  },
  truecrime: {
    truecrime: 1.35,
    movie: 0.35,
    drama: 0.25,
  },
  kids: {
    kids: 1.35,
    comedy: 0.35,
    movie: 0.25,
  },
  news: {
    news: 1.35,
  },
};

function createScoreMap(keys) {
  return keys.reduce((scores, key) => {
    scores[key] = 0;
    return scores;
  }, {});
}

function createDefaultState() {
  return {
    tagScores: createScoreMap(TAGS),
    platformScores: createScoreMap(PLATFORMS),
    events: [],
  };
}

function getStorage() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return window.localStorage;
}

function normalizeState(value) {
  const state = createDefaultState();

  if (!value || typeof value !== "object") return state;

  TAGS.forEach((tag) => {
    const score = Number(value.tagScores?.[tag]);
    state.tagScores[tag] = Number.isFinite(score) ? score : 0;
  });

  PLATFORMS.forEach((platform) => {
    const score = Number(value.platformScores?.[platform]);
    state.platformScores[platform] = Number.isFinite(score) ? score : 0;
  });

  state.events = Array.isArray(value.events)
    ? value.events.filter(Boolean).slice(-MAX_EVENTS)
    : [];

  return state;
}

function readState() {
  const storage = getStorage();
  if (!storage) return createDefaultState();

  try {
    return normalizeState(JSON.parse(storage.getItem(STORAGE_KEY)));
  } catch (error) {
    console.log("[AI PERSONALIZATION] state read failed", error?.message || error);
    return createDefaultState();
  }
}

function writeState(state) {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(normalizeState(state)));
  } catch (error) {
    console.log("[AI PERSONALIZATION] state write failed", error?.message || error);
  }
}

function flattenText(value, depth = 0) {
  if (value === null || value === undefined || depth > 2) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) {
    return value.map((entry) => flattenText(entry, depth + 1)).join(" ");
  }
  if (typeof value === "object") {
    return Object.values(value)
      .map((entry) => flattenText(entry, depth + 1))
      .join(" ");
  }

  return "";
}

function buildText(item, context) {
  return `${flattenText(item)} ${flattenText(context)}`.toLowerCase();
}

function hasAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function addTags(tags, values) {
  values.forEach((tag) => tags.add(tag));
}

function normalizePlatform(value) {
  if (!value) return null;

  const normalized = String(value).trim();
  const compact = normalized.toLowerCase().replace(/\s+/g, " ");
  const alias = PLATFORM_ALIASES[compact] || PLATFORM_ALIASES[compact.replace(/\s+/g, "")];

  if (alias) return alias;

  return PLATFORMS.find((platform) => platform.toLowerCase() === compact) || null;
}

function inferPlatform(item, context) {
  const directPlatform =
    item?.qrData?.platform ||
    item?.platform ||
    item?.provider ||
    item?.channel ||
    context?.platform;

  const directMatch = normalizePlatform(directPlatform);
  if (directMatch) return directMatch;

  const text = buildText(item, context);

  return (
    PLATFORMS.find((platform) => text.includes(platform.toLowerCase())) ||
    Object.entries(PLATFORM_ALIASES).find(([alias]) => text.includes(alias))?.[1] ||
    null
  );
}

function getItemTitle(item) {
  return (
    item?.title ||
    item?.qrData?.title ||
    item?.matchTitle ||
    item?.program ||
    item?.channel ||
    item?.name ||
    "Untitled"
  );
}

function getItemId(item) {
  return item?.id || item?.qrData?.id || getItemTitle(item);
}

export function inferInterestTags(item, context = {}) {
  const text = buildText(item, context);
  const tags = new Set();

  if (
    hasAny(text, [
      /\bipl\b/,
      /cricket/,
      /tata ipl/,
      /\bkkr\b/,
      /\bmi\b/,
      /\bcsk\b/,
      /\bgt\b/,
      /gujarat titans/,
      /chennai super kings/,
      /kolkata knight riders/,
      /mumbai indians/,
      /lucknow super giants/,
      /\blsg\b/,
      /\bt20\b/,
    ])
  ) {
    addTags(tags, ["cricket", "sports"]);
  }

  if (
    hasAny(text, [
      /\bfifa\b/,
      /football/,
      /world cup/,
      /brazil/,
      /france/,
      /argentina/,
      /portugal/,
      /soccer/,
    ])
  ) {
    addTags(tags, ["football", "sports"]);
  }

  if (
    hasAny(text, [
      /sports/,
      /stadium/,
      /\bmatch\b/,
      /grand prix/,
      /formula one/,
      /\bf1\b/,
      /hockey/,
      /premier league/,
      /tour de france/,
    ])
  ) {
    tags.add("sports");
  }

  if (hasAny(text, [/swiggy/, /food/, /restaurant/, /dineout/, /dine out/, /book table/, /order/])) {
    addTags(tags, ["food", "shopping"]);
  }

  if (hasAny(text, [/glance/, /shop/, /shopping/, /buy/, /bookmyshow/, /ticket/, /event/])) {
    tags.add("shopping");
  }

  if (
    hasAny(text, [
      /makemytrip/,
      /make my trip/,
      /dubai/,
      /holiday/,
      /\btour\b/,
      /travel/,
      /flight/,
      /hotel/,
      /vacation/,
    ])
  ) {
    tags.add("travel");
  }

  if (
    hasAny(text, [
      /taylor swift/,
      /gaana/,
      /spotify/,
      /music/,
      /concert/,
      /eras tour/,
      /k-pop/,
      /playlist/,
      /\bsong/,
      /artist/,
      /michael jackson/,
    ])
  ) {
    tags.add("music");
  }

  if (
    hasAny(text, [
      /discovery\+/,
      /curious case/,
      /true crime/,
      /\bcrime\b/,
      /investigation/,
      /documentary/,
      /scandal/,
    ])
  ) {
    tags.add("truecrime");
  }

  if (hasAny(text, [/spider[- ]?man/, /avengers/, /marvel/, /superhero/, /action/])) {
    addTags(tags, ["action", "scifi", "movie"]);
  }

  if (hasAny(text, [/sci[- ]?fi/, /science fiction/, /interstellar/])) {
    addTags(tags, ["scifi", "movie"]);
  }

  if (
    hasAny(text, [
      /movie/,
      /\bfilm\b/,
      /cinema/,
      /imdb/,
      /prime video/,
      /netflix/,
      /jiohotstar/,
      /sonyliv/,
      /sony liv/,
      /rent/,
      /stream/,
      /watch/,
      /theatre/,
      /releasing/,
      /4k uhd/,
    ])
  ) {
    tags.add("movie");
  }

  if (hasAny(text, [/drama/, /romance/, /social drama/])) {
    addTags(tags, ["drama", "movie"]);
  }

  if (hasAny(text, [/comedy/, /funny/, /south park/, /sitcom/])) {
    addTags(tags, ["comedy", "movie"]);
  }

  if (hasAny(text, [/\bkids\b/, /cartoon/, /nickelodeon/, /spongebob/, /ben 10/, /adventure time/])) {
    tags.add("kids");
  }

  if (
    hasAny(text, [
      /\bnews\b/,
      /\bcnn\b/,
      /\bbbc\b/,
      /sky news/,
      /fox news/,
      /\bcnbc\b/,
      /bloomberg/,
      /reuters/,
      /al jazeera/,
      /dw news/,
      /france 24/,
    ])
  ) {
    tags.add("news");
  }

  return TAGS.filter((tag) => tags.has(tag));
}

function inferInterestCategories(item, context, tags, platform) {
  const text = buildText(item, context);
  const categories = new Set(tags);

  if (/swiggy|food|restaurant|dineout|dine out|book table|order/.test(text)) {
    addTags(categories, ["food", "commerce"]);
  }

  if (/glance|shop now|shopping feed|shopping|find your vibe/.test(text)) {
    addTags(categories, ["shopping", "commerce"]);
  }

  if (/makemytrip|make my trip|dubai|holiday|vacation|flight|hotel|travel/.test(text)) {
    addTags(categories, ["travel", "commerce"]);
  }

  if (/bookmyshow|book my show|ticket|tickets|stadium|event|concert|theatre/.test(text)) {
    categories.add("ticketing");
  }

  if (platform === "Swiggy") addTags(categories, ["food", "commerce"]);
  if (platform === "Glance") addTags(categories, ["shopping", "commerce"]);
  if (platform === "MakeMyTrip") addTags(categories, ["travel", "commerce"]);
  if (platform === "BookMyShow") categories.add("ticketing");
  if (platform === "Spotify" || platform === "Gaana") categories.add("music");
  if (platform === "FIFA") addTags(categories, ["football", "sports"]);

  return Array.from(categories).filter((category) => category);
}

function getPrimaryCategory(tags, categories, platform) {
  if (tags.includes("food") || platform === "Swiggy") return "food";
  if (tags.includes("travel") || platform === "MakeMyTrip") return "travel";
  if (tags.includes("cricket")) return "cricket";
  if (tags.includes("football") || platform === "FIFA") return "football";
  if (tags.includes("music") || platform === "Spotify" || platform === "Gaana") return "music";
  if (tags.includes("truecrime")) return "truecrime";
  if (tags.includes("action")) return "action";
  if (tags.includes("scifi")) return "scifi";
  if (tags.includes("drama")) return "drama";
  if (tags.includes("comedy")) return "comedy";
  if (tags.includes("kids")) return "kids";
  if (tags.includes("news")) return "news";
  if (tags.includes("movie")) return "movie";
  if (tags.includes("sports")) return "sports";
  if (tags.includes("shopping") || platform === "Glance") return "shopping";
  if (categories.includes("ticketing")) return "ticketing";

  return categories[0] || null;
}

function getInterestProfile(item, context = {}) {
  const tags = inferInterestTags(item, context);
  const platform = inferPlatform(item, context);
  const categories = inferInterestCategories(item, context, tags, platform);
  const primaryCategory = getPrimaryCategory(tags, categories, platform);

  return {
    tags,
    platform,
    categories,
    primaryCategory,
  };
}

function getCategoryAffinity(sourceCategory, targetCategories) {
  if (!sourceCategory || !targetCategories?.length) return 0;

  const affinityMap = CATEGORY_AFFINITIES[sourceCategory] || {};

  return targetCategories.reduce((bestScore, targetCategory) => {
    const score =
      sourceCategory === targetCategory ? 1 : affinityMap[targetCategory] || 0;

    return Math.max(bestScore, score);
  }, 0);
}

function getCategoryEventScore(profile, events) {
  if (!profile.categories.length) return 0;

  return events.reduce((score, event, index) => {
    const eventWeight = Number(event.weight) || EVENT_WEIGHTS[event.type] || 1;
    const eventCategories =
      event.categories?.length ||
      event.primaryCategory
        ? [...(event.categories || []), event.primaryCategory].filter(Boolean)
        : event.tags || [];
    const eventPrimary =
      event.primaryCategory ||
      getPrimaryCategory(event.tags || [], eventCategories, event.platform);
    const recency = 0.45 + ((index + 1) / Math.max(events.length, 1)) * 0.55;
    const categoryAffinity = eventCategories.reduce((bestScore, category) => {
      return Math.max(bestScore, getCategoryAffinity(category, profile.categories));
    }, 0);
    const primaryAffinity = getCategoryAffinity(eventPrimary, profile.categories);
    const affinity = Math.max(categoryAffinity, primaryAffinity);

    return score + eventWeight * affinity * recency * 0.85;
  }, 0);
}

function getRecentMatchBoost(tags, platform, events) {
  return events
    .slice(-12)
    .reverse()
    .reduce((boost, event, index) => {
      const recency = Math.max(0.1, (12 - index) / 12);
      const eventTags = Array.isArray(event.tags) ? event.tags : [];
      const tagMatches = tags.filter((tag) => eventTags.includes(tag)).length;
      const platformMatch = platform && event.platform === platform;

      if (!tagMatches && !platformMatch) return boost;

      return boost + recency * (tagMatches * 0.15 + (platformMatch ? 0.25 : 0));
    }, 0);
}

function getScoreTotal(scores) {
  return Object.values(scores).reduce((total, score) => total + score, 0);
}

export function getPersonalizationState() {
  return readState();
}

export function resetPersonalizationState() {
  const storage = getStorage();

  if (storage) {
    try {
      storage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.log("[AI PERSONALIZATION] reset failed", error?.message || error);
      writeState(createDefaultState());
    }
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
  }
}

export function recordPersonalizationEvent(event) {
  const type = event?.type || event?.eventType;
  const weight = EVENT_WEIGHTS[type];

  if (!type || !weight) return;

  const item = event.item || event.card || {};
  const context = event.context || {};
  const profile = getInterestProfile(item, context);
  const tags = event.tags || profile.tags;
  const platform = normalizePlatform(event.platform) || profile.platform;
  const categories = event.categories || profile.categories;
  const primaryCategory = event.primaryCategory || profile.primaryCategory;
  const state = readState();
  const eventRecord = {
    type,
    weight,
    itemId: getItemId(item),
    title: getItemTitle(item),
    platform,
    tags,
    categories,
    primaryCategory,
    context: {
      page: context.page || context.sourcePage || null,
      row: context.row || null,
      rowKey: context.rowKey || null,
    },
    timestamp: Date.now(),
  };

  tags.forEach((tag) => {
    if (Object.prototype.hasOwnProperty.call(state.tagScores, tag)) {
      state.tagScores[tag] += weight;
    }
  });

  if (platform && Object.prototype.hasOwnProperty.call(state.platformScores, platform)) {
    state.platformScores[platform] += weight;
  }

  state.events = [...state.events, eventRecord].slice(-MAX_EVENTS);
  writeState(state);

  if (import.meta.env.DEV) {
    console.log("[AI PERSONALIZATION] event recorded", {
      type,
      title: eventRecord.title,
      tags,
      primaryCategory,
      platform,
      weight,
    });
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: eventRecord }));
  }
}

export function getPersonalizedItems(items, context = {}) {
  if (!Array.isArray(items)) return [];

  const state = readState();
  const hasPersonalization =
    getScoreTotal(state.tagScores) > 0 ||
    getScoreTotal(state.platformScores) > 0 ||
    state.events.length > 0;

  if (!hasPersonalization) return [...items];

  const scoredItems = items.map((item, index) => {
    const profile = getInterestProfile(item, context);
    const tagScore =
      profile.tags.reduce((score, tag) => score + (state.tagScores[tag] || 0), 0) *
      0.55;
    const platformScore = profile.platform ? state.platformScores[profile.platform] || 0 : 0;
    const categoryScore = getCategoryEventScore(profile, state.events);
    const recencyBoost = getRecentMatchBoost(
      profile.tags,
      profile.platform,
      state.events
    );
    const baseOrderScore = (items.length - index) / 100000;

    return {
      item,
      index,
      score: baseOrderScore + tagScore + categoryScore + platformScore + recencyBoost,
      tags: profile.tags,
      platform: profile.platform,
      categories: profile.categories,
      primaryCategory: profile.primaryCategory,
    };
  });

  scoredItems.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.index - b.index;
  });

  const personalizedItems = scoredItems.map(({ item }) => item);
  const reordered = personalizedItems.some((item, index) => item !== items[index]);

  if (reordered && import.meta.env.DEV) {
    console.log("[AI PERSONALIZATION] reordered", {
      row: context.row || context.rowKey || "row",
      top: scoredItems.slice(0, 3).map(({ item, score, tags, platform, primaryCategory }) => ({
        title: getItemTitle(item),
        score: Number(score.toFixed(2)),
        tags,
        platform,
        primaryCategory,
      })),
    });
  }

  return personalizedItems;
}
