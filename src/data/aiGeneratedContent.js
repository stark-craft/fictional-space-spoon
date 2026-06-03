const FLIGHTS_POSTER =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=82";
const FLIGHTS_DETAIL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Zurich_airport_img_3324.jpg?width=1400";
const GRINDELWALD_POSTER =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Grindelwald_-_First_-_Cliff_Walk.jpg?width=1400";
const GRINDELWALD_DETAIL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Top_of_Europe.jpg?width=1400";
const CITY_STAY_POSTER =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Lake_Lucerne-Luzern.jpg?width=1400";
const CITY_STAY_DETAIL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Lucerne_Pilatus_Lake_panoramic_1180662.jpg?width=1400";
const TRAVEL_PASS_POSTER =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Glacier_Express_train_east_of_Andermatt_in_Swiss_Alps_en_route_to_Zermatt.jpg?width=1400";
const TRAVEL_PASS_DETAIL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/The_boat_across_Lake_Lucerne_stopped_in_Weggis_%2832280036972%29.jpg?width=1400";
const DINING_POSTER =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Swiss_fondue.jpg?width=1400";
const DINING_DETAIL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Chocoladefondue.JPG?width=1400";
const EVENTS_POSTER =
  "https://commons.wikimedia.org/wiki/Special:FilePath/La_grande_sc%C3%A8ne_du_festival_en_2014.jpg?width=1400";
const EVENTS_DETAIL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Tsprod_concert%2C_2_june_2012%2C_in_bern_switzerland.jpg?width=1400";
const EXPERIENCES_POSTER =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Matterhorn_Riffelsee.jpg?width=1400";
const EXPERIENCES_DETAIL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Jungfrau%28Interlaken%291.jpg?width=1400";
const TRAVEL_MOOD_POSTER =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Lake_Oeschinen_%28Unsplash%29.jpg?width=1400";
const TRAVEL_MOOD_DETAIL =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Malojapass_B%C3%B6hringer_2018.jpg?width=1400";

const MAKE_MY_TRIP_FLIGHTS_URL =
  "https://www.makemytrip.com/international-flights/";
const MAKE_MY_TRIP_SWISS_PACKAGES_URL =
  "https://www.makemytrip.com/holidays-international/switzerland-vacation-tour-packages.html";
const MAKE_MY_TRIP_HOTELS_URL =
  "https://www.makemytrip.com/hotels-international/";
const SWISS_TRAVEL_PASS_URL =
  "https://www.sbb.ch/en/offers/swiss-travel-pass";
const THE_FORK_SWITZERLAND_URL = "https://www.thefork.ch/";
const TICKETCORNER_URL = "https://www.ticketcorner.ch/en/";
const GET_YOUR_GUIDE_JUNGFRAUJOCH_URL =
  "https://www.getyourguide.com/jungfraujoch-l45647/";
const YOUTUBE_SWISS_GUIDE_URL =
  "https://www.youtube.com/results?search_query=switzerland+travel+guide";

export const switzerlandTripPromos = [
  {
    id: "ai-swiss-flights",
    title: "Flights to Zurich & Geneva",
    poster: FLIGHTS_POSTER,
    qrData: {
      title: "Flights to Zurich & Geneva",
      subtitle:
        "Start with Zurich or Geneva, compare flight options around your travel dates, review fare choices, and continue booking on phone or web when the route feels right.",
      price: "Compare fares",
      meta: "MakeMyTrip | International flights | Zurich | Geneva | Flexible dates",
      platform: "MakeMyTrip",
      image: FLIGHTS_DETAIL,
      webUrl: MAKE_MY_TRIP_FLIGHTS_URL,
      qrTargetUrl: MAKE_MY_TRIP_FLIGHTS_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Check Flights",
      qrLabel: "Scan to Check Flights",
    },
  },
  {
    id: "ai-swiss-grindelwald",
    title: "Grindelwald & Jungfraujoch Escape",
    poster: GRINDELWALD_POSTER,
    qrData: {
      title: "Grindelwald & Jungfraujoch Escape",
      subtitle:
        "Shape the Alps chapter around Grindelwald, Jungfraujoch, Interlaken, cable cars, mountain viewpoints, and a guided Swiss itinerary that keeps the big moments connected.",
      price: "Packages vary",
      meta: "MakeMyTrip | Switzerland packages | Grindelwald | Jungfraujoch | Interlaken",
      platform: "MakeMyTrip",
      image: GRINDELWALD_DETAIL,
      webUrl: MAKE_MY_TRIP_SWISS_PACKAGES_URL,
      qrTargetUrl: MAKE_MY_TRIP_SWISS_PACKAGES_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "View Package",
      qrLabel: "Scan to View Package",
    },
  },
  {
    id: "ai-swiss-city-stay",
    title: "Zurich & Lucerne City Stay",
    poster: CITY_STAY_POSTER,
    qrData: {
      title: "Zurich & Lucerne City Stay",
      subtitle:
        "Balance Zurich old town, Lucerne lakefront, premium stays, city-centre access, day trips, and rail connectivity so the city base supports the whole route.",
      price: "Check latest",
      meta: "MakeMyTrip | Hotels | Zurich | Lucerne | Lakefront stays | Rail access",
      platform: "MakeMyTrip",
      image: CITY_STAY_DETAIL,
      webUrl: MAKE_MY_TRIP_HOTELS_URL,
      qrTargetUrl: MAKE_MY_TRIP_HOTELS_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Explore Stays",
      qrLabel: "Scan to Explore Stays",
    },
  },
  {
    id: "ai-swiss-travel-pass",
    title: "Swiss Travel Pass Planner",
    poster: TRAVEL_PASS_POSTER,
    qrData: {
      title: "Swiss Travel Pass Planner",
      subtitle:
        "Plan trains, lake boats, intercity routes, scenic rail, cable cars, and movement between Zurich, Lucerne, Interlaken, and Zermatt before locking the day-by-day flow.",
      price: "Plan route",
      meta: "Swiss Travel System | SBB | Scenic rail | Lake boats | Intercity routes",
      platform: "Swiss Travel System",
      image: TRAVEL_PASS_DETAIL,
      webUrl: SWISS_TRAVEL_PASS_URL,
      qrTargetUrl: SWISS_TRAVEL_PASS_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Plan Transport",
      qrLabel: "Scan to Plan Transport",
    },
  },
  {
    id: "ai-swiss-dining",
    title: "Swiss Dining & Table Booking",
    poster: DINING_POSTER,
    qrData: {
      title: "Swiss Dining & Table Booking",
      subtitle:
        "Reserve restaurants in Zurich, Geneva, Lucerne, or lakefront areas, then build dinner plans around fondue, chocolate desserts, local cafes, and post-sightseeing evenings.",
      price: "Reserve table",
      meta: "TheFork | Switzerland dining | Fondue | Cafes | Lakefront restaurants",
      platform: "TheFork",
      image: DINING_DETAIL,
      webUrl: THE_FORK_SWITZERLAND_URL,
      qrTargetUrl: THE_FORK_SWITZERLAND_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Reserve a Table",
      qrLabel: "Scan to Reserve",
    },
  },
  {
    id: "ai-swiss-events",
    title: "Zurich Concerts & Live Events",
    poster: EVENTS_POSTER,
    qrData: {
      title: "Zurich Concerts & Live Events",
      subtitle:
        "Browse concerts, live shows, festivals, sports, theatre, and date-based discoveries around Zurich and Switzerland to give the trip a premium after-dark plan.",
      price: "Availability varies",
      meta: "Ticketcorner | Zurich events | Concerts | Theatre | Festivals | Sports",
      platform: "Ticketcorner",
      image: EVENTS_DETAIL,
      webUrl: TICKETCORNER_URL,
      qrTargetUrl: TICKETCORNER_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Browse Events",
      qrLabel: "Scan to Browse Events",
    },
  },
  {
    id: "ai-swiss-experiences",
    title: "Swiss Alps Experiences",
    poster: EXPERIENCES_POSTER,
    qrData: {
      title: "Swiss Alps Experiences",
      subtitle:
        "Explore Jungfraujoch, Interlaken, Grindelwald, scenic cable cars, guided day trips, lake cruises, and mountain viewpoints that make the Alps feel cinematic.",
      price: "Availability varies",
      meta: "GetYourGuide | Jungfraujoch | Grindelwald | Day trips | Lake cruises",
      platform: "GetYourGuide",
      image: EXPERIENCES_DETAIL,
      webUrl: GET_YOUR_GUIDE_JUNGFRAUJOCH_URL,
      qrTargetUrl: GET_YOUR_GUIDE_JUNGFRAUJOCH_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Explore Tours",
      qrLabel: "Scan to Explore Tours",
    },
  },
  {
    id: "ai-swiss-travel-mood",
    title: "Switzerland Travel Guide",
    poster: TRAVEL_MOOD_POSTER,
    qrData: {
      title: "Switzerland Travel Guide",
      subtitle:
        "Watch itinerary ideas for scenic trains, the Swiss Alps, Zurich, Lucerne, Interlaken, Zermatt, chocolate tours, and lake routes before choosing what deserves a full day.",
      price: "Free guide",
      meta: "YouTube | Travel guide | Scenic trains | Swiss Alps | Lakes | Chocolate tours",
      platform: "YouTube",
      image: TRAVEL_MOOD_DETAIL,
      webUrl: YOUTUBE_SWISS_GUIDE_URL,
      qrTargetUrl: YOUTUBE_SWISS_GUIDE_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Watch Guide",
      qrLabel: "Scan to Watch Guide",
    },
  },
];
