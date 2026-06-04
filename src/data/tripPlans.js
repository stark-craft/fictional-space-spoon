import { switzerlandTripPromos } from "./aiGeneratedContent";

const TRAVEL_URL = "https://www.makemytrip.com/international-flights/";
const STAY_URL = "https://www.makemytrip.com/hotels-international/";
const EXPERIENCE_URL = "https://www.getyourguide.com/";
const GUIDE_URL = "https://www.youtube.com/results?search_query=";

const DESTINATION_PROFILES = {
  switzerland: {
    destination: "Switzerland",
    title: "Switzerland Escape",
    duration: "7 days",
    route: "Zurich → Lucerne → Interlaken",
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lake_Oeschinen_%28Unsplash%29.jpg?width=1600",
    images: switzerlandTripPromos.map((item) => item.poster),
    accent: "#6df4da",
    accentRgb: "109, 244, 218",
    progress: 48,
  },
  japan: {
    destination: "Japan",
    title: "Japan Discovery",
    duration: "9 days",
    route: "Tokyo → Kyoto → Osaka",
    cover:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=84",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=1200&q=82",
    ],
    accent: "#ff9ea8",
    accentRgb: "255, 158, 168",
    progress: 34,
  },
  dubai: {
    destination: "Dubai",
    title: "Dubai City Break",
    duration: "5 days",
    route: "Downtown → Marina → Desert",
    cover:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=84",
    images: [
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=82",
    ],
    accent: "#ffc86c",
    accentRgb: "255, 200, 108",
    progress: 26,
  },
  bali: {
    destination: "Bali",
    title: "Bali Slow Escape",
    duration: "6 days",
    route: "Ubud → Uluwatu → Seminyak",
    cover:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=84",
    images: [
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=82",
    ],
    accent: "#8cf0ae",
    accentRgb: "140, 240, 174",
    progress: 30,
  },
};

const FALLBACK_PROFILES = [
  {
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=84",
    accent: "#80d8ff",
    accentRgb: "128, 216, 255",
  },
  {
    cover:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=84",
    accent: "#a9ef93",
    accentRgb: "169, 239, 147",
  },
  {
    cover:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=84",
    accent: "#d6b4ff",
    accentRgb: "214, 180, 255",
  },
];

function titleCase(value) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function extractDestination(query) {
  const knownDestination = Object.keys(DESTINATION_PROFILES).find((key) =>
    query.toLowerCase().includes(key)
  );

  if (knownDestination) {
    return DESTINATION_PROFILES[knownDestination].destination;
  }

  const match = query.match(
    /(?:trip|travel|holiday|vacation|visit|go)\s+(?:to|in|for)?\s*([a-z][a-z\s-]{1,28})/i
  );

  if (!match?.[1]) return "Your Next Escape";

  const cleaned = match[1]
    .replace(/\b(?:for|with|during|next|this|please|plan|trip)\b.*$/i, "")
    .trim();

  return titleCase(cleaned || "Your Next Escape");
}

function getProfile(query, sequence) {
  const knownKey = Object.keys(DESTINATION_PROFILES).find((key) =>
    query.toLowerCase().includes(key)
  );

  if (knownKey) return DESTINATION_PROFILES[knownKey];

  const destination = extractDestination(query);
  const fallback = FALLBACK_PROFILES[sequence % FALLBACK_PROFILES.length];

  return {
    destination,
    title: `${destination} Journey`,
    duration: "7 days",
    route: "Discover → Explore → Experience",
    cover: fallback.cover,
    images: [fallback.cover],
    accent: fallback.accent,
    accentRgb: fallback.accentRgb,
    progress: 22,
  };
}

function createGenericSteps(profile) {
  const destination = profile.destination;
  const encodedDestination = encodeURIComponent(`${destination} travel guide`);
  const imageAt = (index) =>
    profile.images[index % profile.images.length] || profile.cover;

  return [
    {
      id: "discover",
      label: "Discover",
      title: `Find your ${destination} rhythm`,
      description:
        "Save the places, neighbourhoods, and moments that make the trip feel like yours.",
      status: "complete",
      image: imageAt(0),
      actionLabel: "Open inspiration",
      qrData: {
        title: `${destination} inspiration`,
        subtitle:
          "Explore destination guides and visual ideas before shaping the route.",
        platform: "YouTube",
        price: "Free guide",
        image: imageAt(0),
        webUrl: `${GUIDE_URL}${encodedDestination}`,
        qrTargetUrl: `${GUIDE_URL}${encodedDestination}`,
      },
    },
    {
      id: "route",
      label: "Route",
      title: "Shape the route",
      description:
        "Turn saved ideas into a comfortable sequence with room for slower days.",
      status: "complete",
      image: imageAt(1),
      actionLabel: "Review route",
      qrData: {
        title: `${destination} route`,
        subtitle:
          "Review the route and continue planning transport between each stop.",
        platform: "Universal Guide",
        price: "Route ready",
        image: imageAt(1),
        webUrl: `${GUIDE_URL}${encodedDestination}`,
        qrTargetUrl: `${GUIDE_URL}${encodedDestination}`,
      },
    },
    {
      id: "travel",
      label: "Travel",
      title: `Compare flights to ${destination}`,
      description:
        "Check flexible dates and the arrival options that best support your route.",
      status: "next",
      image: imageAt(2),
      actionLabel: "Compare flights",
      qrData: {
        title: `Flights to ${destination}`,
        subtitle:
          "Compare flight options, flexible dates, and fare choices for this journey.",
        platform: "MakeMyTrip",
        price: "Compare fares",
        image: imageAt(2),
        webUrl: TRAVEL_URL,
        qrTargetUrl: TRAVEL_URL,
      },
    },
    {
      id: "stay",
      label: "Stay",
      title: "Choose the right stays",
      description:
        "Shortlist stays that fit the route instead of planning each booking alone.",
      status: "upcoming",
      image: imageAt(3),
      actionLabel: "Explore stays",
      qrData: {
        title: `${destination} stays`,
        subtitle:
          "Explore hotels and stays that fit the shape of your planned route.",
        platform: "MakeMyTrip",
        price: "Check latest",
        image: imageAt(3),
        webUrl: STAY_URL,
        qrTargetUrl: STAY_URL,
      },
    },
    {
      id: "experience",
      label: "Experience",
      title: "Build memorable days",
      description:
        "Balance landmarks, local experiences, food, and free time across the trip.",
      status: "upcoming",
      image: imageAt(4),
      actionLabel: "Browse experiences",
      qrData: {
        title: `${destination} experiences`,
        subtitle:
          "Browse local activities and experiences to complete the day-by-day journey.",
        platform: "GetYourGuide",
        price: "Availability varies",
        image: imageAt(4),
        webUrl: EXPERIENCE_URL,
        qrTargetUrl: EXPERIENCE_URL,
      },
    },
    {
      id: "book",
      label: "Book",
      title: "Review and book",
      description:
        "Bring the chosen pieces together and confirm them when the journey feels right.",
      status: "upcoming",
      image: imageAt(5),
      actionLabel: "Review plan",
      qrData: {
        title: `${destination} trip review`,
        subtitle:
          "Review the connected journey before continuing with reservations.",
        platform: "Universal Guide",
        price: "Not started",
        image: imageAt(5),
        webUrl: STAY_URL,
        qrTargetUrl: STAY_URL,
      },
    },
  ];
}

function createSwitzerlandSteps(profile) {
  const stepMeta = [
    ["Discover", "Find your Switzerland rhythm", "complete"],
    ["Route", "Connect the scenic route", "complete"],
    ["Travel", "Compare flights to Zurich", "next"],
    ["Stay", "Choose city and lake stays", "upcoming"],
    ["Experience", "Build the Alps chapter", "upcoming"],
    ["Book", "Review and confirm the journey", "upcoming"],
  ];
  const sourceItems = [
    switzerlandTripPromos[7],
    switzerlandTripPromos[3],
    switzerlandTripPromos[0],
    switzerlandTripPromos[2],
    switzerlandTripPromos[6],
    switzerlandTripPromos[1],
  ];

  return sourceItems.map((item, index) => ({
    id: item.id,
    label: stepMeta[index][0],
    title: stepMeta[index][1],
    status: stepMeta[index][2],
    description: item.qrData.subtitle,
    image: item.poster || profile.cover,
    actionLabel: item.qrData.primaryActionLabel || "Continue",
    qrData: item.qrData,
  }));
}

export function createTripPlan(query, sequence = 0) {
  const profile = getProfile(query, sequence);
  const isSwitzerland = profile.destination === "Switzerland";
  const id = `trip-plan-${Date.now()}-${sequence}`;

  return {
    ...profile,
    id,
    query,
    status: "Planning",
    nextStep: isSwitzerland
      ? "Compare flights to Zurich"
      : `Compare flights to ${profile.destination}`,
    steps: isSwitzerland
      ? createSwitzerlandSteps(profile)
      : createGenericSteps(profile),
  };
}

