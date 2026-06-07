const MMT_FLIGHTS = "https://www.makemytrip.com/international-flights/";
const MMT_HOTELS = "https://www.makemytrip.com/hotels-international/";
const SBB_PASS = "https://www.sbb.ch/en/offers/swiss-travel-pass";
const SWISS_TOURISM = "https://www.myswitzerland.com/en/";
const GET_YOUR_GUIDE = "https://www.getyourguide.com/";
const THE_FORK_SWITZERLAND = "https://www.thefork.ch/";
const VISIT_BRITAIN = "https://www.visitbritain.com/en";
const NATIONAL_RAIL = "https://www.nationalrail.co.uk/journey-planner/";
const TFL_VISITOR = "https://visitorshop.tfl.gov.uk/en";
const TICKETMASTER_UK = "https://www.ticketmaster.co.uk/";
const VISIT_USA = "https://www.visittheusa.com/";
const AMTRAK = "https://www.amtrak.com/train-routes";
const RECREATION_GOV = "https://www.recreation.gov/";
const OPEN_TABLE = "https://www.opentable.com/";

const PROVIDER_LOGOS = {
  MakeMyTrip:
    "https://companieslogo.com/img/orig/MMYT-ca98a9f1.png?t=1720244492",
  SBB: "https://commons.wikimedia.org/wiki/Special:FilePath/SBB_CFF_FFS_logo.svg?width=512",
  GetYourGuide:
    "https://commons.wikimedia.org/wiki/Special:FilePath/GetYourGuide_logo.svg?width=512",
  TheFork:
    "https://commons.wikimedia.org/wiki/Special:FilePath/TheForkManager_logo.svg?width=512",
  "National Rail":
    "https://upload.wikimedia.org/wikipedia/commons/3/31/National_Rail_logo.svg",
  "Transport for London":
    "https://commons.wikimedia.org/wiki/Special:FilePath/Underground.svg?width=512",
  Ticketmaster:
    "https://commons.wikimedia.org/wiki/Special:FilePath/TicketMaster_wordmark.svg?width=512",
  Amtrak:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Amtrak_logo.svg?width=512",
  OpenTable:
    "https://commons.wikimedia.org/wiki/Special:FilePath/OpenTable_logo.svg?width=512",
};

function createStep({
  id,
  label,
  title,
  description,
  status = "upcoming",
  image,
  provider,
  providerColor,
  actionLabel,
  price,
  meta,
  webUrl,
  overview,
  highlights,
  schedule,
  tip,
}) {
  const providerLogo = PROVIDER_LOGOS[provider] || "";

  return {
    id,
    label,
    title,
    description,
    status,
    image,
    provider,
    providerLogo,
    providerColor,
    actionLabel,
    price,
    meta,
    webUrl,
    overview,
    highlights,
    schedule,
    tip,
    qrData: {
      title,
      subtitle: description,
      price,
      meta,
      platform: provider,
      platformLogo: providerLogo,
      image,
      webUrl,
      qrTargetUrl: webUrl,
      primaryActionLabel: actionLabel,
      qrLabel: `Scan to ${actionLabel}`,
    },
  };
}

const SWITZERLAND_STEPS = [
  createStep({
    id: "swiss-route",
    label: "Route",
    title: "Shape the grand Swiss route",
    description:
      "Connect Zurich, Lucerne, Interlaken, and the Bernese Alps into one relaxed seven-day flow.",
    status: "complete",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Malojapass_B%C3%B6hringer_2018.jpg?width=1400",
    provider: "Switzerland Tourism",
    providerColor: "#e53935",
    actionLabel: "Explore route",
    price: "Route saved",
    meta: "Zurich • Lucerne • Interlaken • Bernese Alps",
    webUrl: SWISS_TOURISM,
    overview:
      "This route keeps the city, lake, and mountain chapters connected without turning every day into a transfer day.",
    highlights: ["Old-town Zurich", "Lake Lucerne", "Interlaken base"],
    schedule: ["Days 1–2 Zurich", "Days 3–4 Lucerne", "Days 5–7 Interlaken"],
    tip: "Keep one flexible mountain day so the clearest forecast wins.",
  }),
  createStep({
    id: "swiss-flights",
    label: "Flights",
    title: "Book flights to Zurich",
    description:
      "Compare arrival windows and flexible fares that preserve the first evening in Zurich.",
    status: "next",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=84",
    provider: "MakeMyTrip",
    providerColor: "#e53935",
    actionLabel: "Check flights",
    price: "Compare fares",
    meta: "International flights • Zurich • Flexible dates",
    webUrl: MMT_FLIGHTS,
    overview:
      "Arriving before late afternoon leaves enough room for an easy lakefront walk and protects the first full sightseeing day.",
    highlights: ["Zurich arrivals", "Flexible fares", "One-stop filters"],
    schedule: ["Compare dates", "Select fare", "Confirm traveller details"],
    tip: "Prefer a daytime arrival to make the rail transfer and hotel check-in effortless.",
  }),
  createStep({
    id: "swiss-stays",
    label: "Stay",
    title: "Choose city and lake stays",
    description:
      "Balance Zurich access, a Lucerne lakefront night, and an Interlaken base close to the station.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lucerne_Pilatus_Lake_panoramic_1180662.jpg?width=1400",
    provider: "MakeMyTrip",
    providerColor: "#e53935",
    actionLabel: "Explore stays",
    price: "Check latest",
    meta: "Zurich • Lucerne • Interlaken • Rail access",
    webUrl: MMT_HOTELS,
    overview:
      "The recommended stay pattern keeps luggage moves low while putting each region’s best morning experience within reach.",
    highlights: ["Central Zurich", "Lake-view Lucerne", "Interlaken rail access"],
    schedule: ["2 nights Zurich", "2 nights Lucerne", "3 nights Interlaken"],
    tip: "A hotel within a ten-minute walk of the station saves more time than a larger room outside town.",
  }),
  createStep({
    id: "swiss-pass",
    label: "Transport",
    title: "Activate the Swiss Travel Pass",
    description:
      "Connect intercity trains, local transport, lake boats, and panoramic journeys with one travel pass.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Glacier_Express_train_east_of_Andermatt_in_Swiss_Alps_en_route_to_Zermatt.jpg?width=1400",
    provider: "SBB",
    providerColor: "#eb0000",
    actionLabel: "Get travel pass",
    price: "Pass options",
    meta: "Train • Bus • Boat • Panorama routes",
    webUrl: SBB_PASS,
    overview:
      "The Swiss Travel Pass keeps movement simple across the route and can be shown from the SBB Mobile app after eligible online purchase.",
    highlights: ["Intercity rail", "Lake boats", "Local transport"],
    schedule: ["Select duration", "Choose class", "Add pass to SBB Mobile"],
    tip: "Compare consecutive-day and Flex versions against the exact travel days in your route.",
  }),
  createStep({
    id: "swiss-alps",
    label: "Experience",
    title: "Reserve the Jungfraujoch day",
    description:
      "Build the Alps chapter around Grindelwald, mountain railways, and the Top of Europe.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Top_of_Europe.jpg?width=1400",
    provider: "GetYourGuide",
    providerColor: "#ff5533",
    actionLabel: "Explore tours",
    price: "Availability varies",
    meta: "Grindelwald • Jungfraujoch • Mountain railway",
    webUrl: "https://www.getyourguide.com/jungfraujoch-l45647/",
    overview:
      "A guided or pre-reserved Jungfraujoch day removes ticket uncertainty and protects the route’s biggest mountain moment.",
    highlights: ["Grindelwald", "Eiger views", "Top of Europe"],
    schedule: ["Early Interlaken departure", "Mountain railway", "Return before dinner"],
    tip: "Choose the clearest forecast day and carry a warm layer even in summer.",
  }),
  createStep({
    id: "swiss-dining",
    label: "Dining",
    title: "Reserve a Swiss fondue evening",
    description:
      "Lock in one memorable local dinner around fondue, regional wine, and an unhurried evening.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Swiss_fondue.jpg?width=1400",
    provider: "TheFork",
    providerColor: "#00ab66",
    actionLabel: "Reserve table",
    price: "Tables available",
    meta: "Fondue • Local dining • Evening reservation",
    webUrl: THE_FORK_SWITZERLAND,
    overview:
      "A reserved table gives the trip a slower local moment after the mountain and rail-heavy days.",
    highlights: ["Traditional fondue", "Local wine", "Lakefront options"],
    schedule: ["Browse restaurants", "Select evening", "Confirm table"],
    tip: "Reserve the fondue dinner after a lighter sightseeing day.",
  }),
  createStep({
    id: "swiss-finale",
    label: "Finale",
    title: "Confirm the connected journey",
    description:
      "Review flights, stays, passes, experiences, and dining before the Switzerland plan becomes trip-ready.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Matterhorn_Riffelsee.jpg?width=1400",
    provider: "MakeMyTrip",
    providerColor: "#e53935",
    actionLabel: "Review bookings",
    price: "Final review",
    meta: "Flights • Hotels • Passes • Experiences",
    webUrl: MMT_HOTELS,
    overview:
      "The final review checks every reservation against the route so arrival times, hotel nights, and booked experiences align.",
    highlights: ["Connected itinerary", "Reservation check", "Trip-ready summary"],
    schedule: ["Review dates", "Check confirmations", "Save final itinerary"],
    tip: "Keep digital and offline copies of every booking confirmation.",
  }),
];

const ENGLAND_STEPS = [
  createStep({
    id: "england-route",
    label: "Route",
    title: "Build the England story",
    description:
      "Combine London energy, Bath history, Oxford character, and a slower Cotswolds chapter.",
    status: "complete",
    image:
      "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1400&q=84",
    provider: "VisitBritain",
    providerColor: "#e61e50",
    actionLabel: "Explore England",
    price: "Route saved",
    meta: "London • Oxford • Bath • Cotswolds",
    webUrl: VISIT_BRITAIN,
    overview:
      "This route starts with London’s landmarks, then gradually slows through historic cities and countryside.",
    highlights: ["London icons", "Bath architecture", "Cotswolds villages"],
    schedule: ["Days 1–3 London", "Days 4–5 Oxford & Bath", "Days 6–7 Cotswolds"],
    tip: "Travel outward from London instead of returning to the city every night.",
  }),
  createStep({
    id: "england-flights",
    label: "Flights",
    title: "Book flights to London",
    description:
      "Compare Heathrow and Gatwick arrivals with fare choices that fit the first London evening.",
    status: "complete",
    image:
      "https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&w=1400&q=84",
    provider: "MakeMyTrip",
    providerColor: "#e53935",
    actionLabel: "Check flights",
    price: "Compare fares",
    meta: "London • Heathrow • Gatwick • Flexible dates",
    webUrl: MMT_FLIGHTS,
    overview:
      "The best airport choice depends on the arrival time, hotel location, and the first rail connection rather than fare alone.",
    highlights: ["Heathrow arrivals", "Gatwick options", "Flexible fares"],
    schedule: ["Compare airports", "Select fare", "Confirm arrival transfer"],
    tip: "Choose the airport with the simplest direct connection to your first hotel.",
  }),
  createStep({
    id: "england-stays",
    label: "Stay",
    title: "Choose London and Bath stays",
    description:
      "Pair a central London base with a character-rich Bath stay and a quiet countryside finish.",
    status: "next",
    image:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1400&q=84",
    provider: "MakeMyTrip",
    providerColor: "#e53935",
    actionLabel: "Explore stays",
    price: "Check latest",
    meta: "London • Bath • Cotswolds • Central access",
    webUrl: MMT_HOTELS,
    overview:
      "The stay pattern creates three distinct moods while keeping rail stations and evening areas close.",
    highlights: ["Central London", "Georgian Bath", "Countryside inn"],
    schedule: ["3 nights London", "2 nights Bath", "2 nights Cotswolds"],
    tip: "In London, location near a Tube interchange matters more than room size.",
  }),
  createStep({
    id: "england-rail",
    label: "Rail",
    title: "Connect England by rail",
    description:
      "Plan London, Oxford, and Bath train segments with official journey times and ticket options.",
    image:
      "https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=1400&q=84",
    provider: "National Rail",
    providerColor: "#003366",
    actionLabel: "Plan rail journeys",
    price: "Check fares",
    meta: "London • Oxford • Bath • Official journey planner",
    webUrl: NATIONAL_RAIL,
    overview:
      "National Rail’s official planner keeps the intercity chapter connected and exposes the practical transfer times.",
    highlights: ["Official schedules", "Fare options", "Live journey planning"],
    schedule: ["London to Oxford", "Oxford to Bath", "Bath onward journey"],
    tip: "Advance fares can be cheaper, but keep enough flexibility for the countryside days.",
  }),
  createStep({
    id: "england-london-pass",
    label: "City travel",
    title: "Set up London transport",
    description:
      "Choose a Visitor Oyster card or Travelcard for Tube, bus, Overground, and city rail journeys.",
    image:
      "https://images.unsplash.com/photo-1517394834181-95ed159986c7?auto=format&fit=crop&w=1400&q=84",
    provider: "Transport for London",
    providerColor: "#113b92",
    actionLabel: "Choose travel pass",
    price: "Pass options",
    meta: "Tube • Bus • Overground • Elizabeth line",
    webUrl: TFL_VISITOR,
    overview:
      "London’s official Visitor Shop compares flexible Oyster travel with fixed-zone Travelcards.",
    highlights: ["Tube access", "Daily fare caps", "Airport connections"],
    schedule: ["Compare pass types", "Choose coverage", "Prepare airport transfer"],
    tip: "A Visitor Oyster card is usually the more flexible choice for a multi-day London stay.",
  }),
  createStep({
    id: "england-countryside",
    label: "Experience",
    title: "Reserve Stonehenge and Cotswolds",
    description:
      "Add one guided countryside day that connects ancient landmarks and village landscapes.",
    image:
      "https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&w=1400&q=84",
    provider: "GetYourGuide",
    providerColor: "#ff5533",
    actionLabel: "Explore day trips",
    price: "Availability varies",
    meta: "Stonehenge • Cotswolds • Guided day trip",
    webUrl: GET_YOUR_GUIDE,
    overview:
      "A guided countryside day solves the hardest transport connections while keeping time for smaller villages.",
    highlights: ["Stonehenge", "Cotswolds villages", "Countryside guide"],
    schedule: ["Morning departure", "Stonehenge visit", "Village afternoon"],
    tip: "Keep this outside the London stay so the route continues naturally west.",
  }),
  createStep({
    id: "england-theatre",
    label: "Evening",
    title: "Book a West End evening",
    description:
      "Finish the London chapter with a theatre night and a relaxed pre-show dinner nearby.",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1400&q=84",
    provider: "Ticketmaster",
    providerColor: "#026cdf",
    actionLabel: "Browse shows",
    price: "Tickets vary",
    meta: "West End • Theatre • London evening",
    webUrl: TICKETMASTER_UK,
    overview:
      "A planned theatre night gives the London stay a clear evening anchor without making every day feel scheduled.",
    highlights: ["West End shows", "Central theatres", "Evening experience"],
    schedule: ["Browse shows", "Choose seats", "Plan pre-show dinner"],
    tip: "Book the theatre night after a lighter central London sightseeing day.",
  }),
];

const USA_STEPS = [
  createStep({
    id: "usa-route",
    label: "Route",
    title: "Shape the American highlights route",
    description:
      "Connect New York, a national-park chapter, and San Francisco without rushing the distances.",
    status: "complete",
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1400&q=84",
    provider: "Visit The USA",
    providerColor: "#2563eb",
    actionLabel: "Explore route",
    price: "Route saved",
    meta: "New York • National parks • San Francisco",
    webUrl: VISIT_USA,
    overview:
      "The route treats the United States as three strong chapters rather than trying to compress the whole country.",
    highlights: ["New York energy", "National-park scale", "West Coast finish"],
    schedule: ["Days 1–3 New York", "Days 4–6 park chapter", "Days 7–9 San Francisco"],
    tip: "Protect the travel days between chapters instead of hiding them inside sightseeing days.",
  }),
  createStep({
    id: "usa-flights",
    label: "Flights",
    title: "Book the open-jaw flights",
    description:
      "Fly into New York and home from San Francisco to avoid repeating the coast-to-coast journey.",
    status: "complete",
    image:
      "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1400&q=84",
    provider: "MakeMyTrip",
    providerColor: "#e53935",
    actionLabel: "Check flights",
    price: "Compare fares",
    meta: "New York arrival • San Francisco departure • Multi-city",
    webUrl: MMT_FLIGHTS,
    overview:
      "An open-jaw booking protects a full day and makes the route move naturally from east to west.",
    highlights: ["Multi-city fare", "NYC arrival", "SFO departure"],
    schedule: ["Compare multi-city", "Select fare", "Confirm baggage rules"],
    tip: "Compare the multi-city fare against two one-way tickets before booking.",
  }),
  createStep({
    id: "usa-stays",
    label: "Stay",
    title: "Choose three distinct bases",
    description:
      "Pair a walkable New York neighbourhood with a park gateway and a central San Francisco stay.",
    status: "complete",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=84",
    provider: "MakeMyTrip",
    providerColor: "#e53935",
    actionLabel: "Explore stays",
    price: "Check latest",
    meta: "New York • Park gateway • San Francisco",
    webUrl: MMT_HOTELS,
    overview:
      "Each base is selected for the chapter around it: walkability in New York, access near the park, and transit in San Francisco.",
    highlights: ["Walkable NYC", "Park gateway", "Central San Francisco"],
    schedule: ["3 nights New York", "3 nights park gateway", "3 nights San Francisco"],
    tip: "For the park chapter, proximity to the entrance can save hours across several days.",
  }),
  createStep({
    id: "usa-amtrak",
    label: "Rail",
    title: "Add one classic Amtrak segment",
    description:
      "Choose a scenic rail segment that becomes part of the experience instead of only a transfer.",
    status: "next",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1400&q=84",
    provider: "Amtrak",
    providerColor: "#005983",
    actionLabel: "Explore train routes",
    price: "Route options",
    meta: "Scenic rail • Official routes • Seat options",
    webUrl: AMTRAK,
    overview:
      "A single well-chosen Amtrak segment adds a slower American travel experience without forcing the entire trip onto rail.",
    highlights: ["Scenic route", "City-centre stations", "Flexible seating"],
    schedule: ["Choose segment", "Review timetable", "Reserve seats"],
    tip: "Use rail for the segment where the scenery and station locations create real value.",
  }),
  createStep({
    id: "usa-parks",
    label: "Parks",
    title: "Secure national-park access",
    description:
      "Check passes, timed entry, permits, and official reservation requirements before the park chapter.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=84",
    provider: "Recreation.gov",
    providerColor: "#2f6b3b",
    actionLabel: "Check park access",
    price: "Passes and permits",
    meta: "National parks • Timed entry • Digital passes",
    webUrl: RECREATION_GOV,
    overview:
      "Recreation.gov centralises many federal passes, permits, timed-entry reservations, and bookable outdoor experiences.",
    highlights: ["Digital passes", "Timed entry", "Official reservations"],
    schedule: ["Select park", "Check entry rules", "Save digital pass"],
    tip: "Entry requirements vary by park and season, so check again shortly before travel.",
  }),
  createStep({
    id: "usa-dining",
    label: "Dining",
    title: "Reserve signature city dinners",
    description:
      "Save one memorable table in New York and another in San Francisco while keeping other meals spontaneous.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=84",
    provider: "OpenTable",
    providerColor: "#da3743",
    actionLabel: "Reserve tables",
    price: "Tables available",
    meta: "New York • San Francisco • Restaurant reservations",
    webUrl: OPEN_TABLE,
    overview:
      "Two anchor reservations create memorable evenings while leaving space for diners, markets, and discoveries.",
    highlights: ["New York table", "San Francisco dinner", "Live availability"],
    schedule: ["Save restaurants", "Choose evenings", "Confirm tables"],
    tip: "Reserve only the hardest tables and keep the rest of the food journey open.",
  }),
  createStep({
    id: "usa-experiences",
    label: "Experience",
    title: "Complete the coast-to-coast moments",
    description:
      "Add a New York skyline experience and a San Francisco bay moment to complete the route.",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1400&q=84",
    provider: "GetYourGuide",
    providerColor: "#ff5533",
    actionLabel: "Explore experiences",
    price: "Availability varies",
    meta: "New York • San Francisco • City experiences",
    webUrl: GET_YOUR_GUIDE,
    overview:
      "A small number of pre-booked city experiences gives each coast a standout moment without over-planning.",
    highlights: ["New York skyline", "San Francisco bay", "Flexible activities"],
    schedule: ["Choose NYC moment", "Choose SF moment", "Review timings"],
    tip: "Book timed experiences around the neighbourhood plan, not the other way around.",
  }),
];

const FEATURED_TRIP_PLANS = [
  {
    id: "trip-plan-switzerland",
    query: "Plan a trip to Switzerland",
    destination: "Switzerland",
    title: "Switzerland Escape",
    duration: "7 days",
    route: "Zurich → Lucerne → Interlaken",
    cover:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lake_Oeschinen_%28Unsplash%29.jpg?width=1600",
    accent: "#6df4da",
    accentRgb: "109, 244, 218",
    status: "Planning",
    nextStep: "Book flights to Zurich",
    progress: 14,
    steps: SWITZERLAND_STEPS,
  },
  {
    id: "trip-plan-england",
    query: "Plan a trip to England",
    destination: "England",
    title: "England Story",
    duration: "7 days",
    route: "London → Oxford → Bath → Cotswolds",
    cover:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=84",
    accent: "#ff9eae",
    accentRgb: "255, 158, 174",
    status: "Planning",
    nextStep: "Choose London and Bath stays",
    progress: 29,
    steps: ENGLAND_STEPS,
  },
  {
    id: "trip-plan-usa",
    query: "Plan a trip to the United States of America",
    destination: "United States",
    title: "American Highlights",
    duration: "9 days",
    route: "New York → National Parks → San Francisco",
    cover:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=84",
    accent: "#80c8ff",
    accentRgb: "128, 200, 255",
    status: "Planning",
    nextStep: "Add one classic Amtrak segment",
    progress: 43,
    steps: USA_STEPS,
  },
];

function clonePlan(plan, id = plan.id) {
  return {
    ...plan,
    id,
    steps: plan.steps.map((step) => ({
      ...step,
      highlights: [...step.highlights],
      schedule: [...step.schedule],
      qrData: { ...step.qrData },
    })),
  };
}

export function getFeaturedTripPlans() {
  return FEATURED_TRIP_PLANS.map((plan) => clonePlan(plan));
}

export function createTripPlan(query, sequence = 0) {
  const normalizedQuery = query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  let selectedPlan = null;

  if (
    /\b(england|london|britain|british|united kingdom|great britain|uk|u k|oxford|bath|cotswolds|stonehenge|westminster|buckingham|royal|tube|oyster|premier league)\b/.test(
      normalizedQuery
    )
  ) {
    selectedPlan = FEATURED_TRIP_PLANS[1];
  } else if (
    /\b(america|american|united states|united state|states|usa|u s a|us|u s|new york|nyc|san francisco|california|broadway|amtrak|national park|national parks|yellowstone|yosemite|grand canyon|coast to coast)\b/.test(
      normalizedQuery
    )
  ) {
    selectedPlan = FEATURED_TRIP_PLANS[2];
  } else if (
    /\b(switzerland|swiss|zurich|lucerne|interlaken|alps|alpine|jungfrau|jungfraujoch|zermatt|matterhorn|glacier express|scenic train)\b/.test(
      normalizedQuery
    )
  ) {
    selectedPlan = FEATURED_TRIP_PLANS[0];
  }

  if (!selectedPlan) {
    const fallbackIndex =
      ((Math.max(1, sequence) - 1) % FEATURED_TRIP_PLANS.length);
    selectedPlan = FEATURED_TRIP_PLANS[fallbackIndex];
  }

  return clonePlan(selectedPlan, `${selectedPlan.id}-${Date.now()}-${sequence}`);
}
