const FLIGHT_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=82";
const ALPS_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Matterhorn_Riffelsee.jpg?width=1400";
const HOTEL_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Lake_Zurich_from_Baur_au_Lac_Hotel_-_DPLA_-_cf6df4c72b1adfeafb09cc2d0dba29b7.jpg?width=1400";
const GUIDE_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Lake_Lucerne_in_Switzerland.jpg?width=1400";
const TRAIN_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Glacier_Express_train_east_of_Andermatt_in_Swiss_Alps_en_route_to_Zermatt.jpg?width=1400";
const ROAD_TRIP_IMAGE =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Matterhorn_Riffelsee.jpg?width=1400";

const MAKE_MY_TRIP_FLIGHTS_URL =
  "https://www.makemytrip.com/international-flights/";
const MAKE_MY_TRIP_SWISS_PACKAGES_URL =
  "https://www.makemytrip.com/holidays-international/switzerland-vacation-tour-packages.html";
const MAKE_MY_TRIP_HOTELS_URL =
  "https://www.makemytrip.com/hotels-international/";
const YOUTUBE_SWISS_GUIDE_URL =
  "https://www.youtube.com/results?search_query=switzerland+travel+guide";
const SWISS_TRAVEL_PASS_URL =
  "https://www.sbb.ch/en/offers/swiss-travel-pass";
const SPOTIFY_SWISS_ROAD_TRIP_URL =
  "https://open.spotify.com/search/switzerland%20road%20trip%20playlist";

export const switzerlandTripPromos = [
  {
    id: "ai-swiss-1",
    title: "Flights to Switzerland",
    poster: FLIGHT_IMAGE,
    qrData: {
      title: "Flights to Switzerland",
      subtitle:
        "Compare international flights to Zurich and Geneva, choose flexible travel dates, shortlist fares, and continue booking from your phone or web when your Switzerland plan is ready.",
      price: "Search fares and dates",
      meta: "MakeMyTrip • International Flights • Zurich • Geneva • Multi-city planning",
      platform: "MakeMyTrip",
      image: FLIGHT_IMAGE,
      webUrl: MAKE_MY_TRIP_FLIGHTS_URL,
      qrTargetUrl: MAKE_MY_TRIP_FLIGHTS_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Check Flights",
      qrLabel: "Scan to Check Flights",
    },
  },
  {
    id: "ai-swiss-2",
    title: "Swiss Alps Holiday Package",
    poster: ALPS_IMAGE,
    qrData: {
      title: "Swiss Alps Holiday Package",
      subtitle:
        "Explore Switzerland holiday packages with Interlaken, Lucerne, Zermatt, Jungfraujoch, scenic stays, mountain excursions, and guided itinerary planning for an Alps-first trip.",
      price: "Package options vary",
      meta: "MakeMyTrip • Switzerland Packages • Interlaken • Lucerne • Zermatt • Jungfraujoch",
      platform: "MakeMyTrip",
      image: ALPS_IMAGE,
      webUrl: MAKE_MY_TRIP_SWISS_PACKAGES_URL,
      qrTargetUrl: MAKE_MY_TRIP_SWISS_PACKAGES_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "View Package",
      qrLabel: "Scan to View Package",
    },
  },
  {
    id: "ai-swiss-3",
    title: "Zurich & Lucerne Hotels",
    poster: HOTEL_IMAGE,
    qrData: {
      title: "Zurich & Lucerne Hotels",
      subtitle:
        "Look for international hotel stays near city centres, lake views, family-friendly rooms, premium stays, and rail-connected locations around Zurich, Lucerne, and nearby Swiss routes.",
      price: "Explore hotel availability",
      meta: "MakeMyTrip • International Hotels • Zurich • Lucerne • Lake views • Rail connectivity",
      platform: "MakeMyTrip",
      image: HOTEL_IMAGE,
      webUrl: MAKE_MY_TRIP_HOTELS_URL,
      qrTargetUrl: MAKE_MY_TRIP_HOTELS_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Explore Hotels",
      qrLabel: "Scan to Explore Hotels",
    },
  },
  {
    id: "ai-swiss-4",
    title: "Top Things to Do in Switzerland",
    poster: GUIDE_IMAGE,
    qrData: {
      title: "Top Things to Do in Switzerland",
      subtitle:
        "Watch travel guides covering the Swiss Alps, scenic trains, lakes, chocolate tours, mountain viewpoints, Zurich, Lucerne, Interlaken, Zermatt, and itinerary inspiration.",
      price: "Free travel videos",
      meta: "YouTube • Switzerland Travel Guide • Alps • Lakes • Scenic trains • City highlights",
      platform: "YouTube",
      image: GUIDE_IMAGE,
      webUrl: YOUTUBE_SWISS_GUIDE_URL,
      qrTargetUrl: YOUTUBE_SWISS_GUIDE_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Watch Guide",
      qrLabel: "Scan to Watch Guide",
    },
  },
  {
    id: "ai-swiss-5",
    title: "Swiss Travel Pass Planner",
    poster: TRAIN_IMAGE,
    qrData: {
      title: "Swiss Travel Pass Planner",
      subtitle:
        "Plan Switzerland transport with trains, cable cars, intercity routes, lake boats, town travel, and Swiss Travel Pass-style exploration across the public transport network.",
      price: "Pass options by duration",
      meta: "Swiss Travel System • SBB • Trains • Boats • Cable cars • Route planning",
      platform: "Swiss Travel System",
      image: TRAIN_IMAGE,
      webUrl: SWISS_TRAVEL_PASS_URL,
      qrTargetUrl: SWISS_TRAVEL_PASS_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Plan Transport",
      qrLabel: "Scan to Plan Transport",
    },
  },
  {
    id: "ai-swiss-6",
    title: "Swiss Road Trip Playlist",
    poster: ROAD_TRIP_IMAGE,
    qrData: {
      title: "Swiss Road Trip Playlist",
      subtitle:
        "Find music for flights, scenic train rides, mountain drives, lake routes, relaxed planning sessions, and the slower moments between Switzerland stops.",
      price: "Free + premium options",
      meta: "Spotify • Switzerland road trip • Scenic travel • Mountain drives • Planning playlist",
      platform: "Spotify",
      image: ROAD_TRIP_IMAGE,
      webUrl: SPOTIFY_SWISS_ROAD_TRIP_URL,
      qrTargetUrl: SPOTIFY_SWISS_ROAD_TRIP_URL,
      webActionLabel: "Open in Web",
      primaryActionLabel: "Play Playlist",
      qrLabel: "Scan to Play",
    },
  },
];
