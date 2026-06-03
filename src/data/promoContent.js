const TMDB_BASE = "https://image.tmdb.org/t/p";

// ─── For You tab promos ──────────────────────────────────────
export const forYouPromos = [
  {
    id: "promo-1",
    title: "IPL 2026: KKR vs MI — Book Tickets",
    poster:
      "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-tata-ipl-2026-0-2026-3-15-t-5-51-7.jpg",
    qrData: {
      title: "IPL 2026: KKR vs MI — Book Tickets",
      subtitle:
        "KKR vs MI clash at Arun Jaitley Stadium, Delhi on 19 May 2026. One of the most anticipated fixtures of the season, this match promises fireworks as DC's top-order faces GT's formidable pace attack. Book your stadium tickets via BookMyShow and witness live cricket at its finest. Scan the QR code with your phone to proceed to the booking page.",
      price: "₹1,500 - ₹25,000",
      meta: "Match 14 • TATA IPL 2026 • 8 Apr 2026 • 7:30 PM IST • Arun Jaitley Stadium, Delhi • Live on JioHotstar",
      platform: "BookMyShow",
      image:
        "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-kolkata-knight-riders-vs-mumbai-indians-tata-ipl-0-2026-4-18-t-8-38-22.jpg",
      webUrl:
        "https://in.bookmyshow.com/sports/kolkata-knight-riders-vs-mumbai-indians-tata-ipl-2026/ET00495897?data=groupPage",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Buy Tickets on BookMyShow",
      qrLabel: "Scan to Book",
    },
  },
  {
    id: "promo-5",
    title: "Michael",
    poster:
      "https://michael.movie/assets/img/film/michael/v2/Michael-new-poster-homepage-desktop.jpg",
    qrData: {
      title: "Michael",
      subtitle:
        "The early life of musician Michael Jackson, from the discovery of his talent as the lead of the Jackson Five to the artist whose creative ambition fueled a pursuit to become the biggest entertainer in the world.",
      price: "₹3,000 - ₹50,000",
      meta: "24 April 2026 • Releasing Worldwide • IMAX • World's Biggest Superstar • Presented by BookMyShow",
      platform: "BookMyShow",
      image:
        "https://www.movieposters.com/cdn/shop/files/michael_305fci7h_4bf0d621-998f-44b0-908f-05b753c4b593.jpg?v=1764091574&width=1680",
      webUrl: "https://in.bookmyshow.com/movies/ahmedabad/michael/ET00470110",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Buy Tickets on BookMyShow",
      qrLabel: "Scan to Book",
    },
  },
  {
    id: "promo-8",
    title: "Tadka on Jiohotstar",
    poster: "/assets/promos/tadka.png",
    qrData: {
      title: "Tadka on Jiohotstar",
      subtitle:
        "The quality of the series of JioHotstar's new microcontent platform, Tadka, is deplorable,When so much superior content is being created with the help of AI, Tadka shows are taking the content back to the tacky early days of television, both in the plots and subpar production values",
      price: "Streaming free with Subscription",
      meta: "The quality of the series of JioHotstar's new microcontent platform, Tadka, is deplorable.",
      platform: "JioHotstar",
      image: "/assets/promos/tadka.png",
      webUrl: "https://www.hotstar.com/in",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Stream Now",
      qrLabel: "Scan to Rent",
    },
  },
  {
    id: "promo-9",
    title: "Glance+ - Shop Now",
    poster:
      "https://img-cdn.publive.online/fit-in/1280x960/filters:format(webp)/entrackr/media/media_files/2025/05/22/Mh302hDQdCaBF62NELcQ.png",
    qrData: {
      title: "Glance+ - Shop Now",
      subtitle:
        "Inspiration shaped for you by a crew of AI agents that collaborate and curate a shopping feed that feels like you.",
      price: "Start shopping",
      meta: "Find your vibe For your lifestyle ",
      platform: "Glance",
      image:
        "https://img-cdn.publive.online/fit-in/1280x960/filters:format(webp)/entrackr/media/media_files/2025/05/22/Mh302hDQdCaBF62NELcQ.png",
      webUrl: "https://glance.com/",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Shop Now",
      qrLabel: "Scan to Shop",
    },
  },
  {
    id: "promo-7",
    title: "Swiggy - Today's Offer",
    poster: "/assets/promos/swiggy.png",
    qrData: {
      title: "Swiggy",
      subtitle:
        "Swiggy Limited is an Indian online food ordering and delivery company, headquartered in Bengaluru. As of 2025, it operates food delivery services in more than 700 Indian cities, and quick-commerce services under the name Instamart in 100 cities. The company was incorporated in 2013.",
      price: "Book table near you Starting at 4999",
      meta: "Swiggy End Month Offer • DineOut • Resturants near me • Book a table",
      platform: "Swiggy",
      image: "/assets/promos/swiggy.png",
      webUrl: "https://www.swiggy.com/offers-near-me",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Open app to Order",
      qrLabel: "Scan to Order",
    },
  },
  {
    id: "promo-3",
    title: "F1 ETIHAD AIRWAYS GRAND PRIZ 2026",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFI86Ttjd05HIAAwIkq-33QN9hG-49aWvg0A&s",
    qrData: {
      title: "F1 ETIHAD AIRWAYS GRAND PRIZ 2026",
      subtitle:
        "Witness the Formula One is the highest class of worldwide racing for open-wheel, single-seater formula racing cars run by Formula One Group and sanctioned by the Fédération Internationale de l'Automobile.",
      price: "₹649/mo",
      meta: "Fancode Stream • Rush • 2026 • 2h 14m • 4K UHD • Dolby Vision • Dolby Atmos • English",
      platform: "Fancode",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFI86Ttjd05HIAAwIkq-33QN9hG-49aWvg0A&s",
      webUrl:
        "https://www.fancode.com/formula1/tour/f1-ethihad-airways-abu-dhabi-grand-prix-2026-19295057/matches/practice-1-139527/live-match-info",
      webActionLabel: "Open In Web",
      primaryActionLabel: "Watch on FanCode",
      qrLabel: "Scan to Watch",
    },
  },
  {
    id: "promo-4",
    title: "SpiderMan - Brand New Day (4K UHD)",
    poster: `${TMDB_BASE}/original/riY64HjYQwDnFOVnESlnmwagfi8.jpg`,
    qrData: {
      title: "SpiderMan - Brand New Day",
      subtitle:
        "Four years have passed since the events of No Way Home, and Peter Parker is now a true adult living entirely alone — his identity erased from the world, forgotten even by those he loves most. He has no MJ. No Ned. No Aunt May. Just the mask. But when Peter's DNA begins to mutate in terrifying and unexplained ways, transforming him into something more — and something less — than human, he must confront the one thing he has been running from: himself. Brand New Day is the most personal, most brutal, and most spectacular Spider-Man story ever told.",
      price: "₹1,299/month",
      meta: "Sony Pictures • Marvel • Action / Sci-Fi • 2026 • 2h 38m • 4K UHD • HDR10+ • IMAX Enhanced • English / Hindi",
      platform: "BookMyShow",
      image: `${TMDB_BASE}/original/vjMvFSmGUxEtqVdaZgvFee9XkZl.jpg`,
      webUrl: "https://in.bookmyshow.com/movies/spiderman-brand-new-day/ET00447840",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Buy Tickets on BookMyShow",
      qrLabel: "Scan to Book",
    },
  },
  {
    id: "promo-2",
    title: "IPL 2026: GT vs CSK — Book Tickets",
    poster:
      "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-tata-ipl-2026-0-2026-3-15-t-5-51-7.jpg",
    qrData: {
      title: "IPL 2026: GT vs CSK — Book Tickets",
      subtitle:
        "The iconic Eden Gardens roars again as Kolkata Knight Riders host CSK in what promises to be a blockbuster evening of T20 cricket. KKR's explosive batting lineup goes up against LSG's disciplined bowling attack in front of a packed 66,000-seat stadium. This is the IPL at its electric best — lights, noise, and cricket like nowhere else on earth. Book your tickets now via BookMyShow before they sell out.",
      price: "₹800 - ₹18,000",
      meta: "Match 15 • TATA IPL 2026 • 9 Apr 2026 • 7:30 PM IST • Eden Gardens, Kolkata • Live on JioHotstar",
      platform: "BookMyShow",
      image:
        "https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-gujarat-titans-vs-chennai-super-kings-tata-ipl-2026-0-2026-5-11-t-11-30-26.jpg",
      webUrl:
        "https://in.bookmyshow.com/sports/gujarat-titans-vs-chennai-super-kings-tata-ipl-2026/ET00491080?data=groupPage",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Buy Tickets on BookMyShow",
      qrLabel: "Scan to Book",
    },
  },
  {
    id: "promo-6",
    title: "Taylor Swift - Eras Tour",
    poster: `${TMDB_BASE}/original/4Wvvkkz3S4hZSrLTqYWRFjPoug9.jpg`,
    qrData: {
      title: "Taylor Swift - The Eras Tour",
      featureDescription:
        "A fast featured look at the concert-event card: pricing, booking context and big-screen artwork stay visible here, while the full details page carries the longer tour story and QR purchase flow.",
      subtitle:
        "Taylor Swift | The Eras Tour — The concert of a generation. A breathtaking, career-spanning spectacle that takes you on a journey through every era of Taylor's iconic discography. From the country twang of Fearless to the synth-pop anthems of 1989, from the intimate folklore storytelling to the explosive Midnights bangers, The Eras Tour is a 3.5-hour musical odyssey through the life and art of the most influential artist of our time. Each era is its own world. Taylor performs over 40 songs across 10 distinct acts, each one a fully realized production with its own choreography, staging, and atmosphere.Book your tickets now via BookMyShow.Scan the QR code with your phone — this is the tour of a lifetime!",
      price: "₹1,500 - ₹15,000",
      meta: "Mar–Apr 2026 • Dallas, Seattle, Calabases, Housten, Nashville, Malibu, New York + more • BookMyShow Live",
      platform: "BookMyShow",
      image: `${TMDB_BASE}/original/86nuaviWDKoGVouoss01AP920jj.jpg`,
      webUrl: "https://in.bookmyshow.com/events/swiftie-event/ET00481242",
      webActionLabel: "Open BookMyShow",
      primaryActionLabel: "Buy Tickets Now",
      qrLabel: "Scan to Book",
    },
  },
];

// ─── Apps tab promos ─────────────────────────────────────────
export const appsPromos = [
  {
    id: "apromo-4",
    title: "Gaana - Taylow Swift Reputation Tour",
    poster: `${TMDB_BASE}/original/86nuaviWDKoGVouoss01AP920jj.jpg`,
    qrData: {
      title: "Global Top 50",
      subtitle:
        "Global Top 50 brings together the biggest English tracks currently trending on Gaana. It is built for quick music discovery, party listening and big-screen browsing, with chart-style songs from popular albums, artists and new releases.",
      price: "Free + premium options",
      meta: "Gaana • Bollywood Top 50 • Hindi Songs • Music Charts • Playlists • New Songs • Podcasts",
      platform: "Gaana",
      image: `${TMDB_BASE}/original/4Wvvkkz3S4hZSrLTqYWRFjPoug9.jpg`,
      webUrl: "https://gaana.com/artist/taylor-swift",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Listen on Gaana",
      qrLabel: "Scan to Listen",
    },
  },
  {
    id: "apromo-1",
    title: "Heated Rivalry",
    poster: "https://image.tmdb.org/t/p/original/3YCKbtAkYWCMDLHvkUjGhG7eWoS.jpg",
    qrData: {
      title: "Heated Rivalry",
      subtitle:
        "Heated Rivalry follows hockey stars Shane Hollander and Ilya Rozanov, two elite rivals whose public competition hides a secret, years-long romance. As their careers, teams and identities collide, the series turns a sports rivalry into an emotional story about desire, pressure, secrecy and the cost of staying hidden.",
      price: "Subscription required",
      meta: "Lionsgate Play • English Series • Sports Romance • Drama • 1 Season • Streaming in India",
      platform: "Lionsgate Play",
      image: "https://image.tmdb.org/t/p/original/8qYhmaKpD737eb5cvCLSwSAhdxs.jpg",
      webUrl:
        "https://www.primevideo.com/region/eu/dp/amzn1.dv.gti.ddac5679-637f-4be8-b0a0-aa1f3ece7f3c?autoplay=0&ref_=atv_cf_strg_wb",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Watch on Lionsgate Play",
      qrLabel: "Scan to Watch",
    },
  },
  {
    id: "apromo-6",
    title: "Simply Dubai - Indian Group Tour",
    poster:
      "https://www.applydubaivisa.com/wp-content/uploads/2025/09/Dubai-visa-Make-My-Trip.png",
    qrData: {
      title: "Simply Dubai - Indian Group Tour",
      subtitle:
        "A 4 nights / 5 days Dubai group holiday package with round-trip flights, a 4-star hotel stay, airport transfers, visa, selected meals and multiple activities. Highlights include Dubai city experiences such as Burj Khalifa, Marina Dhow Cruise and iFly Dubai.",
      price: "Package pricing varies",
      meta: "MakeMyTrip • Dubai • 4N/5D • Round Trip Flights • 4 Star Hotel • Airport Transfers • Visa • Selected Meals • 14 Activities",
      platform: "MakeMyTrip",
      image:
        "https://www.applydubaivisa.com/wp-content/uploads/2025/09/Dubai-visa-Make-My-Trip.png",
      qrTargetUrl:
        "https://www.makemytrip.com/holidays-international/dubai-vacation-tour-packages.html",
      webUrl:
        "https://www.makemytrip.com/holidays-international/dubai-vacation-tour-packages.html",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Book Ticket in BookMyShow",
      qrLabel: "Scan to Book",
    },
  },
  {
    id: "apromo-3",
    title: "The Curious Case Of...",
    poster: "https://image.tmdb.org/t/p/original/nYFqOPCZiLMQ21HE9rV5cfLGkUg.jpg",
    qrData: {
      title: "The Curious Case Of...",
      subtitle:
        "Led by legal analyst Beth Karas, The Curious Case Of... investigates real-life scandals, strange secrets, shattered lives and twisted motives. Each episode digs into a different case, exposing the hidden layers behind crimes, deception and disturbing human behaviour.",
      price: "Subscription required",
      meta: "discovery+ • True Crime • Investigation • Documentary Series • Real-Life Scandals • Beth Karas",
      platform: "Discovery+",
      image: "https://image.tmdb.org/t/p/original/hcaR5QJRW11R7rtUySBHMY2qi0h.jpg",
      webUrl: "https://www.discoveryplus.in/show/the-curious-case-of-in",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Watch on discovery+",
      qrLabel: "Scan to Watch",
    },
  },
  {
    id: "apromo-5",
    title: "Adalat: Insaaf Ki Jung",
    poster:
      "https://jiotvimages.cdn.jio.com/imagespublic/metadata/75b3cae5fc805d9b45871df484af0c62.jpg",
    qrData: {
      title: "Adalat: Insaaf Ki Jung",
      subtitle:
        "Corporate professional Joyeeta files assault charges against her boss DK despite objections from her family. Haunted by incomplete memories, she fights for justice with advocate Sebanti, while the defence weaponises her memory gaps until Joyeeta recalls a crucial truth no one expected.",
      price: "Subscription required",
      meta: "Hoichoi • Hindi • 2026 • A 18+ • Social Drama • 1 Season",
      platform: "Hoichoi",
      image:
        "https://jiotvimages.cdn.jio.com/imagespublic/metadata/75b3cae5fc805d9b45871df484af0c62.jpg",
      webUrl: "https://hoichoi.tv/",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Watch on Hoichoi",
      qrLabel: "Scan to Watch",
    },
  },
  {
    id: "apromo-7",
    title: "K-Pop ON! (온)",
    poster: "https://image.tmdb.org/t/p/original/xxto3Lp0U7IAtNj0WtCsMwBSKOm.jpg",
    qrData: {
      title: "K-Pop ON! (온)",
      subtitle:
        "K-Pop ON! is Spotify’s flagship K-pop playlist, focused on the newest and hottest K-pop releases. The playlist is built as a global K-pop destination for fans, artists and fandom culture, with current tracks and editor-selected Korean pop music.",
      price: "Free + premium options",
      meta: "Spotify • K-Pop ON! • Playlist • 51 Items • 6.1M Saves • New & Hottest K-Pop",
      platform: "Spotify",
      image: "https://image.tmdb.org/t/p/original/xxto3Lp0U7IAtNj0WtCsMwBSKOm.jpg",
      webUrl: "https://open.spotify.com/playlist/37i9dQZF1DX9tPFwDMOaN1",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Play Now on Spotify",
      qrLabel: "Scan to Listen",
    },
  },
  {
    id: "apromo-11",
    title: "Avengers: Doomsday",
    poster: `${TMDB_BASE}/original/3DSrNTHvf7Kiaz6yCqx1665pm9T.jpg`,
    qrData: {
      title: "Avengers: Doomsday",
      subtitle:
        "Marvel Studios’ Avengers: Doomsday brings groups of heroes from different universes together to face Doctor Doom. Directed by Joe Russo and Anthony Russo, the film features Robert Downey Jr. as Doctor Doom and is scheduled for release on December 18, 2026.",
      price: "Tickets and updates soon",
      meta: "BookMyShow • Marvel Studios • English • Superhero • Event Film • Directors: Joe Russo, Anthony Russo • Cast: Robert Downey Jr. • Release Date: December 18, 2026",
      platform: "BookMyShow",
      image: `${TMDB_BASE}/original/iA4mbnxs58l97r5yu44PzAsMi83.jpg`,
      webUrl: "https://in.bookmyshow.com/movies/avengers-doomsday/ET00439706",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Book ticket Now",
      qrLabel: "Scan to Book",
    },
  },
  {
    id: "apromo-8",
    title: "Hotspot-2",
    poster: "https://image.tmdb.org/t/p/original/ledvPszOS7MZW32cHxm07myqH7l.jpg",
    qrData: {
      title: "Hotspot-2",
      subtitle:
        "Hotspot-2 follows an aspiring director who presents three different stories that satirically reflect on society. The film uses romance, comedy and social commentary to explore pressing ideological and social issues through multiple narratives.",
      price: "Subscription required",
      meta: "aha • Telugu • 2026 • 1h 58m • U/A 16+ • Romance • Comedy",
      platform: "Aha",
      image: "https://image.tmdb.org/t/p/original/ledvPszOS7MZW32cHxm07myqH7l.jpg",
      webUrl: "https://www.aha.video/",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Watch on Aha",
      qrLabel: "Scan to Watch",
    },
  },
  {
    id: "apromo-2",
    title: "Sitaare Zameen Par",
    poster: "https://image.tmdb.org/t/p/original/z0mgMK0U31C0SbjTktjhBZJcyq4.jpg",
    qrData: {
      title: "Sitaare Zameen Par",
      subtitle:
        "After a DUI, an arrogant basketball coach is ordered to train neurodivergent adults for community service. What begins as punishment slowly turns into a journey of empathy, humour and self-discovery as his players change the way he sees life.",
      price: "Subscription required",
      meta: "SonyLIV • Hindi +4 • 2025 • U/A 13+ • Drama • Comedy • 2h 36m • UHD • Dolby Atmos • Dolby Vision",
      platform: "SonyLIV",
      image:
        "https://media.themoviedb.org/t/p/w1000_and_h563_face/wHAAMQUuXvq3Ju6Kl23FGmcyqyS.jpg",
      webUrl:
        "https://www.sonyliv.com/movies/sitaare-zameen-par-1090509676?utm_source=Google&utm_medium=WatchNow&utm_campaign=1090509676",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Watch Now on SonyLiv",
      qrLabel: "Scan to Watch",
    },
  },
  {
    id: "apromo-9",
    title: "Spider-Man: Brand New Day",
    poster: `${TMDB_BASE}/original/riY64HjYQwDnFOVnESlnmwagfi8.jpg`,
    qrData: {
      title: "Spider-Man: Brand New Day",
      subtitle:
        "A forgotten Peter Parker lives alone as a full-time Spider-Man after the world no longer remembers him. As he protects New York City anonymously, mounting pressure triggers a dangerous change and a powerful new enemy emerges.",
      price: "Coming to theatres July 31, 2026",
      meta: "JioHotstar • Marvel / Sony • English • Superhero • Action • Tom Holland • Release Date: July 31, 2026",
      platform: "JioHotstar",
      image: `${TMDB_BASE}/original/vjMvFSmGUxEtqVdaZgvFee9XkZl.jpg`,
      webUrl: "https://in.bookmyshow.com/movies/spiderman-brand-new-day/ET00447840",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Watch Trailer",
      qrLabel: "Scan to Watch",
    },
  },
  {
    id: "apromo-10",
    title: "Taylor Swift: The Eras Tour",
    poster: `${TMDB_BASE}/original/86nuaviWDKoGVouoss01AP920jj.jpg`,
    qrData: {
      title: "Taylor Swift: The Eras Tour",
      subtitle:
        "The cultural phenomenon continues on the big screen. Taylor Swift: The Eras Tour gives audiences a once-in-a-lifetime concert film experience with a breathtaking cinematic view of the history-making tour.",
      price: "Tickets / event availability varies",
      meta: "BookMyShow • English • Musical • UA • 2h 49m • 2D • IMAX 2D • Concert Film",
      platform: "BookMyShow",
      image: `${TMDB_BASE}/original/4Wvvkkz3S4hZSrLTqYWRFjPoug9.jpg`,
      webUrl: "https://in.bookmyshow.com/events/swiftie-event/ET00481242",
      webActionLabel: "Open in Web",
      primaryActionLabel: "Book Now on BookMyShow",
      qrLabel: "Scan to Book",
    },
  },
];
