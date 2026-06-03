const TMDB_BASE = "https://image.tmdb.org/t/p";

export const liveGenres = ["All", "News", "Sports", "Entertainment", "Movies", "Music", "Kids"];

// ─── IPL Live Sports (JioHotstar exclusive) ──────────────────
export const liveSports = [
  {
    id: "ipl-1",
    type: "cricket",
    matchTitle: "CSK vs GT",
    subtitle: "Match 14 • TATA IPL 2026",
    teamA: "Chennai Super Kings",
    teamB: "Gujarat Titans",
    venue: "Arun Jaitley Stadium, Delhi",
    date: "8 Apr 2026",
    time: "7:30 PM IST",
    platform: "JioHotstar",
    rating: "U",
    year: "2026",
    resolution: "UHD",
    backdrop: "https://images.mykhel.com/img/2026/04/cskvsgt-fi-1777113368.jpg",
    featuredBackdrop: `${TMDB_BASE}/original/5H3iEEJsdcO7XIblxccSutcQ5LO.jpg`,
    isLive: true,
    timeLeft: "2 hr 15 min left",
    innings: "GT 164/4",
    overs: "16.2 ov",
    target: "CSK need 42 from 22 balls",
    runRate: "RR 10.04 • Req 11.45",
    striker: "Subhman Gill 73* (23)",
    nonStriker: " R. Kishan B. 0* (31)",
    bowler: "B. Kumar 0/89 (3.2)",
    partnership: "58-run stand from 34 balls",
    matchState: "Live chase • Strategic timeout completed",
    scorePhases: [
      {
        innings: "GT 164/4",
        overs: "16.2 ov",
        runRate: "RR 10.04 • Req 11.45",
        target: "CSK need 42 from 22 balls",
        matchState: "Live chase • Strategic timeout completed",
      },
      {
        innings: "GT 169/4",
        overs: "17.0 ov",
        runRate: "RR 9.94 • Req 12.00",
        target: "GT need 37 from 18 balls",
        matchState: "Death overs loading",
      },
      {
        innings: "GT 176/5",
        overs: "18.0 ov",
        runRate: "RR 9.77 • Req 13.50",
        target: "CSK need 27 from 12 balls",
        matchState: "Equation tightening",
      },
    ],
    scoreTicker: [
      "CSK need 42 from 22 balls",
      "Required rate 11.45 • Current RR 10.04",
    ],
    pointsTable: [
      {
        pos: 2,
        team: "GT",
        played: 5,
        won: 4,
        lost: 1,
        nr: 0,
        nrr: "+0.812",
        pts: 8,
      },
      {
        pos: 4,
        team: "CSK",
        played: 5,
        won: 3,
        lost: 2,
        nr: 0,
        nrr: "+0.318",
        pts: 6,
      },
    ],
    nextMatch: {
      primary: "GT vs RR · 11 Apr · 7:30 PM",
      secondary: "Narendra Modi Stadium, Ahmedabad",
    },
    formGuide: [
      {
        team: "GT",
        form: "W  W  L  W  W",
      },
      {
        team: "DC",
        form: "L  W  W  L  W",
      },
    ],
    keyInsight: "GT are defending a top-two position; CSK need points to stay in playoff reach",
  },
  {
    id: "ipl-2",
    type: "cricket",
    matchTitle: "KKR vs LSG",
    subtitle: "Match 15 • TATA IPL 2026",
    teamA: "Kolkata Knight Riders",
    teamB: "Lucknow Super Giants",
    venue: "Eden Gardens, Kolkata",
    date: "9 Apr 2026",
    time: "7:30 PM IST",
    platform: "JioHotstar",
    rating: "U",
    year: "2026",
    resolution: "UHD",
    backdrop: "https://images.ai11.in/insecure/rs:fill:2560:0/g:no/q:75/aHR0cHM6Ly9tZWRpYS5haTExLmluL21lZGlhL2ZpbGVyX3B1YmxpYy9iOS9kMi9iOWQyNTVlMy1lOWQ0LTQzNDMtYmZiYi0zZjljNzY0NjFmNWYva29sa2F0YS1rbmlnaHQtcmlkZXJzLXZzLWx1Y2tub3ctc3VwZXItZ2lhbnRzLTE1dGgtbWF0Y2gtMjAyNi0zMzMxOC1iYW5uZXIucG5n.webp",
    featuredBackdrop: `${TMDB_BASE}/original/5H3iEEJsdcO7XIblxccSutcQ5LO.jpg`,
    isLive: true,
    timeLeft: "1 hr 48 min left",
    innings: "KKR 92/2",
    overs: "10.4 ov",
    target: "LSG won toss • KKR batting first",
    runRate: "RR 8.62 • Projected 178",
    striker: "Venkatesh Iyer 41* (26)",
    nonStriker: "Rinku Singh 19* (11)",
    bowler: "Ravi Bishnoi 1/18 (2.4)",
    partnership: "36-run stand from 23 balls",
    matchState: "Live first innings • Spin in operation",
    scorePhases: [
      {
        innings: "KKR 92/2",
        overs: "10.4 ov",
        runRate: "RR 8.62 • Projected 178",
        target: "LSG won toss • KKR batting first",
        matchState: "Live first innings • Spin in operation",
      },
      {
        innings: "KKR 101/2",
        overs: "12.0 ov",
        runRate: "RR 8.41 • Projected 170",
        target: "Middle overs • platform being built",
        matchState: "Spin holding the run rate",
      },
      {
        innings: "KKR 118/3",
        overs: "14.0 ov",
        runRate: "RR 8.42 • Projected 169",
        target: "LSG searching for one more wicket",
        matchState: "Momentum balanced",
      },
    ],
    scoreTicker: [
      "KKR 92/2 after 10.4 overs",
      "Projected score 178 • Middle overs in progress",
      "Rinku Singh accelerating against spin",
      "LSG looking for a breakthrough before the 15th over",
    ],
    pointsTable: [
      {
        pos: 5,
        team: "KKR",
        played: 5,
        won: 3,
        lost: 2,
        nr: 0,
        nrr: "+0.244",
        pts: 6,
      },
      {
        pos: 7,
        team: "LSG",
        played: 5,
        won: 2,
        lost: 3,
        nr: 0,
        nrr: "-0.126",
        pts: 4,
      },
    ],
    nextMatch: {
      primary: "KKR vs MI · 12 Apr · 7:30 PM",
      secondary: "Eden Gardens, Kolkata",
    },
    formGuide: [
      {
        team: "KKR",
        form: "W  L  W  W  L",
      },
      {
        team: "LSG",
        form: "L  W  L  L  W",
      },
    ],
    keyInsight: "KKR can move into the top four with a strong net run-rate boost",
  },
];

// ─── On Now ──────────────────────────────────────────────────
export const onNowChannels = [
  { id: "live-1", channel: "CNN", channelNo: "1110", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg", program: "Anderson Cooper 360°", time: "9:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/nFnzqHuiKF7mLjGb9GFKZ7SeuoB.jpg`, genre: "News", timeLeft: "43 min left", progress: 28 },
  { id: "live-2", channel: "BBC World News", channelNo: "1112", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/BBC_World_News.svg", program: "BBC World Service", time: "9:00 PM - 9:30 PM", backdrop: `${TMDB_BASE}/original/aE8LrypJQs2EJvyVgmV2Ta6Hovz.jpg`, genre: "News", timeLeft: "12 min left", progress: 60 },
  { id: "live-3", channel: "ESPN", channelNo: "2010", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/ESPN_wordmark.svg", program: "SportsCenter", time: "8:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/rHY3LhSLvwQ3tMO8UFTPdHRX1bG.jpg`, genre: "Sports", timeLeft: "1 hr 22 min left", progress: 32 },
  { id: "live-4", channel: "Sky News", channelNo: "1115", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Sky_News_2026.svg", program: "Sky News Tonight", time: "9:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/bPPWMcop5IWb15Usx70d76jejg0.jpg`, genre: "News", timeLeft: "38 min left", progress: 37 },
  { id: "live-5", channel: "MTV", channelNo: "3510", logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/MTV_2021_%28brand_version%29.svg", program: "MTV Unplugged", time: "9:00 PM - 10:30 PM", backdrop: `${TMDB_BASE}/original/9BAWhvzY7mkmfczGdrEfOxfxWpJ.jpg`, genre: "Music", timeLeft: "1 hr 8 min left", progress: 24 },
  { id: "live-6", channel: "Discovery", channelNo: "1310", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2019_Discovery_logo.svg", program: "Gold Rush", time: "8:00 PM - 9:00 PM", backdrop: `${TMDB_BASE}/original/3fsVHbjkfPe5SBlSxPpDN9PIpYC.jpg`, genre: "Entertainment", timeLeft: "18 min left", progress: 70 },
  { id: "live-7", channel: "Fox News", channelNo: "1118", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Fox_News_Channel_logo.svg", program: "Hannity", time: "9:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/naRIorwlpifWYPhbJNBf7gpNbYU.jpg`, genre: "News", timeLeft: "45 min left", progress: 25 },
  { id: "live-8", channel: "Nickelodeon", channelNo: "3010", logo: "https://upload.wikimedia.org/wikipedia/commons/7/71/Nickelodeon_2023_logo.svg", program: "SpongeBob SquarePants", time: "8:30 PM - 9:00 PM", backdrop: `${TMDB_BASE}/original/maFEWU41jdUOzDfRVkojq7fluIm.jpg`, genre: "Kids", timeLeft: "5 min left", progress: 83 },
  { id: "live-9", channel: "CNBC", channelNo: "1122", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/CNBC_logo.svg", program: "Mad Money", time: "8:00 PM - 9:00 PM", backdrop: `${TMDB_BASE}/original/mGG8qqSBK7EKN2cOVBlVef1Y3N4.jpg`, genre: "News", timeLeft: "22 min left", progress: 63 },
  { id: "live-10", channel: "Comedy Central", channelNo: "1320", logo: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Comedy_Central_2018.svg", program: "The Daily Show", time: "9:00 PM - 9:45 PM", backdrop: `${TMDB_BASE}/original/qLMfcvdCcCGD2BNLH8b6ZCBuO7D.jpg`, genre: "Entertainment", timeLeft: "28 min left", progress: 38 },
  { id: "live-11", channel: "Cartoon Network", channelNo: "3020", logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Cartoon_Network_2010_logo.svg", program: "Adventure Time", time: "8:00 PM - 8:30 PM", backdrop: `${TMDB_BASE}/original/4m7aRp229i4IAzAwxu1xRxtX4sI.jpg`, genre: "Kids", timeLeft: "8 min left", progress: 73 },
  { id: "live-12", channel: "Bloomberg", channelNo: "1120", logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Bloomberg_logo.svg", program: "Bloomberg Surveillance", time: "7:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/lCsWUF82yjQN2ergYOAEwtex1Zi.jpg`, genre: "News", timeLeft: "1 hr 55 min left", progress: 35 },
];

// ─── Trending Channels ───────────────────────────────────────
export const trendingChannels = [
  { id: "trend-1", channel: "Bloomberg", channelNo: "1120", logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Bloomberg_logo.svg", program: "Bloomberg Markets", time: "9:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/nRbCaFECePTQjlNTS3rbyyszYzK.jpg`, genre: "News", timeLeft: "35 min left", progress: 42 },
  { id: "trend-2", channel: "NBC Sports", channelNo: "2020", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/NBC_Sports_2023.svg", program: "Premier League Live", time: "8:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/bPOM004np00ZxC11Xo2yb1oMLih.jpg`, genre: "Sports", timeLeft: "1 hr 40 min left", progress: 17 },
  { id: "trend-3", channel: "HBO", channelNo: "1210", logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/HBO_logo.svg", program: "Last Week Tonight", time: "10:00 PM - 11:00 PM", backdrop: `${TMDB_BASE}/original/p6keWehWmlM94nPqbvwgJlKtENU.jpg`, genre: "Entertainment", timeLeft: "55 min left", progress: 8 },
  { id: "trend-4", channel: "Eurosport", channelNo: "2030", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Eurosport_logo_%282001-2011%29.svg", program: "Tour de France Highlights", time: "9:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/b39z3QrGaIDzL5SNXSMtrHQWOcB.jpg`, genre: "Sports", timeLeft: "40 min left", progress: 33 },
  { id: "trend-5", channel: "Comedy Central", channelNo: "1320", logo: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Comedy_Central_2018.svg", program: "South Park", time: "10:30 PM - 11:00 PM", backdrop: `${TMDB_BASE}/original/3UviYOlhn8EgXMBuiT6MnUuo1w9.jpg`, genre: "Entertainment", timeLeft: "1 hr 10 min left", progress: 0 },
  { id: "trend-6", channel: "Cartoon Network", channelNo: "3020", logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Cartoon_Network_2010_logo.svg", program: "Ben 10", time: "7:30 PM - 8:00 PM", backdrop: `${TMDB_BASE}/original/eIRe2cNOhvwPPtGDjFVEXGaMkVg.jpg`, genre: "Kids", timeLeft: "10 min left", progress: 67 },
  { id: "trend-7", channel: "Al Jazeera", channelNo: "1125", logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Aljazeera.svg", program: "The Bottom Line", time: "9:30 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/ybZB1LXSg6mGYSpFrvoXSkZ7tCM.jpg`, genre: "News", timeLeft: "18 min left", progress: 40 },
  { id: "trend-8", channel: "National Geographic", channelNo: "1315", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Natgeologo.svg", program: "Planet Earth III", time: "8:00 PM - 9:00 PM", backdrop: `${TMDB_BASE}/original/3TOUvY2NZx8r31UHA3CQdRAY271.jpg`, genre: "Entertainment", timeLeft: "15 min left", progress: 75 },
];

// ─── News ────────────────────────────────────────────────────
export const newsChannels = [
  { id: "news-1", channel: "CNN", channelNo: "1110", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg", program: "The Situation Room", time: "6:00 PM - 7:00 PM", backdrop: `${TMDB_BASE}/original/znXKIU8DK7vyEy3Ry9ugnrBIWPf.jpg`, genre: "News", timeLeft: "20 min left", progress: 67 },
  { id: "news-2", channel: "BBC World", channelNo: "1112", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1f/BBC_News_2022.svg", program: "BBC News Hour", time: "7:00 PM - 8:00 PM", backdrop: `${TMDB_BASE}/original/zaeDxlLKLqG6eOab6HC3MlxPuKv.jpg`, genre: "News", timeLeft: "35 min left", progress: 42 },
  { id: "news-3", channel: "Al Jazeera", channelNo: "1125", logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Aljazeera.svg", program: "Inside Story", time: "8:00 PM - 9:00 PM", backdrop: `${TMDB_BASE}/original/eYNYwbFRKi9G1Fq5FjOH37t7FRD.jpg`, genre: "News", timeLeft: "50 min left", progress: 17 },
  { id: "news-4", channel: "CNBC", channelNo: "1122", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/CNBC_logo.svg", program: "Squawk Box", time: "6:00 AM - 9:00 AM", backdrop: `${TMDB_BASE}/original/nA8xiZBjMm9GZcjXhCkIsliVtY1.jpg`, genre: "News", timeLeft: "1 hr 30 min left", progress: 50 },
  { id: "news-5", channel: "Sky News", channelNo: "1115", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Sky_News_2026.svg", program: "Kay Burley", time: "9:00 AM - 12:00 PM", backdrop: `${TMDB_BASE}/original/nM7WjQmNeT8wCYzsTzlAfOatLaV.jpg`, genre: "News", timeLeft: "2 hr left", progress: 33 },
  { id: "news-6", channel: "Reuters", channelNo: "1130", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Reuters_Logo.svg", program: "Reuters World News", time: "All Day", backdrop: `${TMDB_BASE}/original/1z1HKOgK0InJLxftT9rLLmEUsTQ.jpg`, genre: "News", timeLeft: "Live 24/7", progress: 50 },
  { id: "news-7", channel: "Fox News", channelNo: "1118", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Fox_News_Channel_logo.svg", program: "The Ingraham Angle", time: "10:00 PM - 11:00 PM", backdrop: `${TMDB_BASE}/original/33e8jrdx3ns2yKkOH3HJX4FkieG.jpg`, genre: "News", timeLeft: "55 min left", progress: 8 },
  { id: "news-8", channel: "ABC News", channelNo: "1114", logo: null, program: "World News Tonight", time: "6:30 PM - 7:00 PM", backdrop: `${TMDB_BASE}/original/58h091Sr7BFDF2f0X22tEkrt3gf.jpg`, genre: "News", timeLeft: "10 min left", progress: 67 },
  { id: "news-9", channel: "France 24", channelNo: "1135", logo: null, program: "The Debate", time: "8:00 PM - 9:00 PM", backdrop: `${TMDB_BASE}/original/b0y7dRiIE3UhZa9dbBbuFgu9nkR.jpg`, genre: "News", timeLeft: "40 min left", progress: 33 },
  { id: "news-10", channel: "DW News", channelNo: "1140", logo: null, program: "The Day", time: "9:00 PM - 9:30 PM", backdrop: `${TMDB_BASE}/original/3EGjqKhVHGsvNHvBIbxmqS17Aal.jpg`, genre: "News", timeLeft: "15 min left", progress: 50 },
];

// ─── Entertainment ───────────────────────────────────────────
export const entertainmentChannels = [
  { id: "ent-1", channel: "HBO", channelNo: "1210", logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/HBO_logo.svg", program: "Modern Family", time: "7:00 PM - 12:00 AM", backdrop: `${TMDB_BASE}/original/baz06JeHeGjq45auOFEiw1K7zVj.jpg`, genre: "Entertainment", timeLeft: "3 hr 20 min left", progress: 34 },
  { id: "ent-2", channel: "Comedy Central", channelNo: "1320", logo: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Comedy_Central_2018.svg", program: "South Park", time: "10:00 PM - 10:30 PM", backdrop: `${TMDB_BASE}/original/1CGwZCFX2qerXaXQJJUB3qUvxq7.jpg`, genre: "Entertainment", timeLeft: "1 hr 10 min left", progress: 0 },
  { id: "ent-3", channel: "Discovery", channelNo: "1310", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2019_Discovery_logo.svg", program: "MythBusters", time: "8:00 PM - 9:00 PM", backdrop: `${TMDB_BASE}/original/9MxhqYvwx8FSb5cRWUWEDfpWSfo.jpg`, genre: "Entertainment", timeLeft: "25 min left", progress: 58 },
  { id: "ent-4", channel: "National Geographic", channelNo: "1315", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Natgeologo.svg", program: "Cosmos", time: "9:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/mGXf40nGJDNnNwLIo48nhtaRNs2.jpg`, genre: "Entertainment", timeLeft: "42 min left", progress: 30 },
  { id: "ent-5", channel: "History", channelNo: "1330", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/The_History_Channel-Logo.svg", program: "Ancient Aliens", time: "10:00 PM - 11:00 PM", backdrop: `${TMDB_BASE}/original/7MUuP1tZMfLGL9WSsoJOOHdDbHi.jpg`, genre: "Entertainment", timeLeft: "1 hr 5 min left", progress: 0 },
  { id: "ent-6", channel: "E!", channelNo: "1340", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Estimated_sign.svg", program: "Taylor Swift - Miss Americana", time: "8:00 PM - 9:00 PM", backdrop: `${TMDB_BASE}/original/A7AjlQTR1UlaNSYwwPRQ5gQTHyf.jpg`, genre: "Entertainment", timeLeft: "18 min left", progress: 70 },
  { id: "ent-7", channel: "TLC", channelNo: "1345", logo: null, program: "90 Day Fiancé", time: "9:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/owA5WWCOvRXpx57K6gocSDHlqdD.jpg`, genre: "Entertainment", timeLeft: "48 min left", progress: 20 },
  { id: "ent-8", channel: "Bravo", channelNo: "1350", logo: null, program: "Below Deck", time: "8:00 PM - 9:00 PM", backdrop: `${TMDB_BASE}/original/hpNkpoCiMOSU8IS9x07PtNdZX5o.jpg`, genre: "Entertainment", timeLeft: "30 min left", progress: 50 },
  { id: "ent-9", channel: "Food Network", channelNo: "1355", logo: null, program: "Chopped", time: "9:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/alOycJywgcLuZ5uLzTjxjzLQqNh.jpg`, genre: "Entertainment", timeLeft: "38 min left", progress: 37 },
  { id: "ent-10", channel: "Animal Planet", channelNo: "1360", logo: null, program: "River Monsters", time: "10:00 PM - 11:00 PM", backdrop: `${TMDB_BASE}/original/qbqet8mdugwjt5ptFvZvynIyvLP.jpg`, genre: "Entertainment", timeLeft: "1 hr left", progress: 0 },
];

// ─── TV Plus Movie Channels ──────────────────────────────────
export const movieChannels = [
  { id: "mov-1", channel: "MovieSphere", channelNo: "1220", logo: null, program: "The Dark Knight", time: "9:00 PM - 11:30 PM", backdrop: `${TMDB_BASE}/original/dqK9Hag1054tghRQSqLSfrkvQnA.jpg`, genre: "Movies", timeLeft: "1 hr 52 min left", progress: 25 },
  { id: "mov-2", channel: "Film4", channelNo: "1225", logo: null, program: "Parasite", time: "10:00 PM - 12:15 AM", backdrop: `${TMDB_BASE}/original/cI1RBfqXbWaITTjcKGYLhd9F083.jpg`, genre: "Movies", timeLeft: "2 hr 5 min left", progress: 8 },
  { id: "mov-3", channel: "TCM", channelNo: "1230", logo: null, program: "Casablanca", time: "8:00 PM - 10:00 PM", backdrop: `${TMDB_BASE}/original/87wqeMeUeMRLjsE1IWNKJcPlpuC.jpg`, genre: "Movies", timeLeft: "1 hr 10 min left", progress: 42 },
  { id: "mov-4", channel: "Action Movies", channelNo: "1240", logo: null, program: "Die Hard", time: "9:30 PM - 12:00 AM", backdrop: `${TMDB_BASE}/original/vFgNpZITxW7Y7ruQxGkRLEJcs8Z.jpg`, genre: "Movies", timeLeft: "2 hr 20 min left", progress: 7 },
  { id: "mov-5", channel: "Hallmark", channelNo: "1250", logo: null, program: "A Walk to Remember", time: "7:00 PM - 9:00 PM", backdrop: `${TMDB_BASE}/original/oJsz39JGZXnStH2ccolK7lAtqJH.jpg`, genre: "Movies", timeLeft: "30 min left", progress: 75 },
  { id: "mov-6", channel: "Sci-Fi Movies", channelNo: "1260", logo: null, program: "Interstellar", time: "8:00 PM - 11:00 PM", backdrop: `${TMDB_BASE}/original/l33oR0mnvf20avWyIMxW02EtQxn.jpg`, genre: "Movies", timeLeft: "2 hr 10 min left", progress: 28 },
  { id: "mov-7", channel: "Thriller Hub", channelNo: "1270", logo: null, program: "Gilmore Girl", time: "9:00 PM - 11:30 PM", backdrop: `${TMDB_BASE}/original/gwtzCwU2wdLLf8oejQu2TINiWfQ.jpg`, genre: "Movies", timeLeft: "1 hr 45 min left", progress: 30 },
  { id: "mov-8", channel: "Classic Cinema", channelNo: "1280", logo: null, program: "The Godfather", time: "8:30 PM - 11:30 PM", backdrop: `${TMDB_BASE}/original/tSPT36ZKlP2WVHJLM4cQPLSzv3b.jpg`, genre: "Movies", timeLeft: "2 hr 40 min left", progress: 11 },
  { id: "mov-9", channel: "Comedy Films", channelNo: "1290", logo: null, program: "The Hangover", time: "10:00 PM - 12:00 AM", backdrop: `${TMDB_BASE}/original/sV49hOlUky6AhVYl4K0d3rergTA.jpg`, genre: "Movies", timeLeft: "1 hr 50 min left", progress: 8 },
  { id: "mov-10", channel: "Indie Films", channelNo: "1295", logo: null, program: "Whiplash", time: "9:30 PM - 11:15 PM", backdrop: `${TMDB_BASE}/original/7fn624j5lj3xTme2SgiLCeuedmO.jpg`, genre: "Movies", timeLeft: "1 hr 30 min left", progress: 14 },
];