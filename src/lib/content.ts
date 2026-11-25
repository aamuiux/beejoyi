export type Lang = "bn" | "en";
export type L = Record<Lang, string>;

export type AgeKey = "pre" | "p1" | "p6" | "ssc";
export type CatKey = "all" | "art" | "writing" | "speech" | "sci" | "nature" | "sports";

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export function num(n: number | string, lang: Lang) {
  const s = typeof n === "number" ? n.toLocaleString("en-IN") : n;
  return lang === "bn" ? s.replace(/\d/g, (d) => BN_DIGITS[+d]) : s;
}

export const ages: { key: AgeKey; label: L; hint: L }[] = [
  { key: "pre", label: { bn: "প্রি-স্কুল", en: "Preschool" }, hint: { bn: "৩–৫ বছর", en: "Ages 3–5" } },
  { key: "p1", label: { bn: "১ম–৫ম শ্রেণি", en: "Class 1–5" }, hint: { bn: "প্রাথমিক", en: "Primary" } },
  { key: "p6", label: { bn: "৬ষ্ঠ–১০ম শ্রেণি", en: "Class 6–10" }, hint: { bn: "মাধ্যমিক", en: "Secondary" } },
  { key: "ssc", label: { bn: "এইচএসসি", en: "HSC" }, hint: { bn: "কলেজ", en: "College" } },
];

export const cats: { key: CatKey; label: L }[] = [
  { key: "all", label: { bn: "সব", en: "All" } },
  { key: "art", label: { bn: "আঁকা", en: "Art" } },
  { key: "writing", label: { bn: "লেখা", en: "Writing" } },
  { key: "speech", label: { bn: "বক্তৃতা ও আবৃত্তি", en: "Speech & recitation" } },
  { key: "sci", label: { bn: "বিজ্ঞান ও আইসিটি", en: "Science & ICT" } },
  { key: "nature", label: { bn: "প্রকৃতি", en: "Nature" } },
  { key: "sports", label: { bn: "খেলাধুলা", en: "Sports" } },
];

/** How you take part. Decides the rules, what you upload and how winners are shown. */
export type Format = "quiz" | "photo" | "video" | "audio" | "debate";
export const formats: Record<Format, { label: L }> = {
  quiz: { label: { bn: "কুইজ", en: "Quiz" } },
  photo: { label: { bn: "ছবি", en: "Photo" } },
  video: { label: { bn: "ভিডিও", en: "Video" } },
  audio: { label: { bn: "অডিও", en: "Audio" } },
  debate: { label: { bn: "বিতর্ক · দলগত", en: "Debate · teams" } },
};

export type ContestStatus = "open" | "upcoming" | "ended";
export const statusOf = (c: { status?: ContestStatus }): ContestStatus => c.status ?? "open";

export type Contest = {
  id: string;
  title: L;
  org: L;
  orgInitial: string;
  cat: Exclude<CatKey, "all">;
  format: Format;
  ages: AgeKey[];
  fee: number; // 0 = free, in BDT
  prize: L;
  joined: number;
  daysLeft: number;
  /** open (default) = taking entries; upcoming = not started yet; ended = results out */
  status?: ContestStatus;
  /** quiz contests: when the live online quiz runs */
  quizAt?: L;
  /** for upcoming contests: days until entries open */
  startsIn?: number;
  beginner?: boolean;
  /** CSR sponsor who pays so the contest is free (co-branded "Powered by X × Beejoyi") */
  sponsor?: L;
  /** Multi-round (IB-style) contests: which round is running now, of how many */
  round?: { now: number; of: number };
  /** Multi-round contests: the real-world question the whole contest explores */
  inquiry?: L;
  poster: { bg: string; ink: string; shape: "sun" | "wave" | "leaf" | "atom" | "mic" | "pen" | "ball" | "note" | "play" };
};

// Sample data for the prototype. Replace with live contests from the API.
export const contests: Contest[] = [
  {
    id: "c1",
    sponsor: { bn: "নদী ফুডস (নমুনা)", en: "Nodi Foods (sample)" },
    title: { bn: "শিশু চিত্রাঙ্কন: আমার প্রিয় গ্রাম", en: "Kids' drawing: My favourite village" },
    org: { bn: "বিজয়ী আর্ট ক্লাব", en: "Beejoyi Art Club" },
    orgInitial: "বি",
    cat: "art",
    format: "photo",
    ages: ["pre", "p1"],
    fee: 0,
    prize: { bn: "সার্টিফিকেট + আর্ট কিট", en: "Certificate + art kit" },
    joined: 1284,
    daysLeft: 2,
    beginner: true,
    poster: { bg: "#FFB59E", ink: "#7A2E14", shape: "sun" },
  },
  {
    id: "c2",
    title: { bn: "বিজয় দিবস আবৃত্তি প্রতিযোগিতা", en: "Victory Day recitation contest" },
    org: { bn: "সবুজপাতা স্কুল (নমুনা)", en: "Sabujpata School (sample)" },
    orgInitial: "স",
    cat: "speech",
    format: "video",
    ages: ["p1", "p6"],
    fee: 50,
    prize: { bn: "৳৫,০০০ পুরস্কার", en: "৳5,000 in prizes" },
    joined: 642,
    daysLeft: 1,
    poster: { bg: "#C8133F", ink: "#FFFFFF", shape: "mic" },
  },
  {
    id: "c3",
    sponsor: { bn: "সবুজ টেলিকম (নমুনা)", en: "Sabuj Telecom (sample)" },
    title: { bn: "জুনিয়র সায়েন্স কুইজ", en: "Junior science quiz" },
    org: { bn: "বিজ্ঞান বন্ধু ক্লাব (নমুনা)", en: "Science Friends Club (sample)" },
    orgInitial: "বি",
    cat: "sci",
    format: "quiz",
    quizAt: { bn: "শুক্রবার, ৪ ডিসেম্বর · সন্ধ্যা ৭টা", en: "Friday 4 December · 7 pm" },
    ages: ["p6", "ssc"],
    fee: 0,
    prize: { bn: "সার্টিফিকেট + মেডেল", en: "Certificate + medal" },
    joined: 2310,
    daysLeft: 4,
    beginner: true,
    poster: { bg: "#6563F1", ink: "#FFFFFF", shape: "atom" },
  },
  {
    id: "c4",
    round: { now: 2, of: 3 },
    inquiry: { bn: "একটা গল্প কীভাবে শ্রোতাকে বৃষ্টির দিনে নিয়ে যায়?", en: "How can a story carry a listener into a rainy day?" },
    title: { bn: "গল্প বলো: একদিন বৃষ্টিতে", en: "Tell a story: One rainy day" },
    org: { bn: "কিশোর কলম (নমুনা)", en: "Kishor Kolom (sample)" },
    orgInitial: "ক",
    cat: "speech",
    format: "audio",
    ages: ["p6", "ssc"],
    fee: 30,
    prize: { bn: "বই উপহার + প্রকাশের সুযোগ", en: "Book prize + get published" },
    joined: 488,
    daysLeft: 6,
    poster: { bg: "#E8F2EC", ink: "#1F5A3E", shape: "mic" },
  },
  {
    id: "c5",
    round: { now: 1, of: 3 },
    inquiry: { bn: "তোমার স্কুলের কোন একটা সমস্যা ছোট একটা ব্যবসা সমাধান করতে পারে?", en: "Which problem at your school could a small business solve?" },
    title: { bn: "স্কুল স্টার্টআপ আইডিয়া চ্যালেঞ্জ", en: "School startup idea challenge" },
    org: { bn: "তরুণ উদ্যোক্তা ক্লাব (নমুনা)", en: "Young Founders Club (sample)" },
    orgInitial: "ত",
    cat: "sci",
    format: "video",
    ages: ["p6", "ssc"],
    fee: 200,
    prize: { bn: "৳৫০,০০০ + মেন্টরশিপ", en: "৳50,000 + mentorship" },
    joined: 316,
    daysLeft: 9,
    poster: { bg: "#1E1E2E", ink: "#FFC329", shape: "wave" },
  },
  {
    id: "c6",
    sponsor: { bn: "আলো ব্যাংক (নমুনা)", en: "Alo Bank (sample)" },
    title: { bn: "প্রকৃতির ছবি: পাখি ও ফুল", en: "Nature photo: Birds and flowers" },
    org: { bn: "সবুজ বাংলা ফটো ক্লাব (নমুনা)", en: "Green Bangla Photo Club (sample)" },
    orgInitial: "স",
    cat: "nature",
    format: "photo",
    ages: ["p6", "ssc"],
    fee: 0,
    prize: { bn: "ক্যামেরা ব্যাগ + সার্টিফিকেট", en: "Camera bag + certificate" },
    joined: 905,
    daysLeft: 3,
    beginner: true,
    poster: { bg: "#D9F0E2", ink: "#1F5A3E", shape: "leaf" },
  },
  {
    id: "c7",
    title: { bn: "রঙ চেনো, রঙ করো", en: "Know your colours, colour it in" },
    org: { bn: "বিজয়ী আর্ট ক্লাব", en: "Beejoyi Art Club" },
    orgInitial: "বি",
    cat: "art",
    format: "photo",
    ages: ["pre"],
    fee: 0,
    prize: { bn: "সার্টিফিকেট", en: "Certificate" },
    joined: 1720,
    daysLeft: 12,
    beginner: true,
    poster: { bg: "#ECEBFE", ink: "#4846D2", shape: "sun" },
  },
  {
    id: "c8",
    title: { bn: "খেলাধুলা কুইজ: ক্রিকেট থেকে ফুটবল", en: "Sports quiz: cricket to football" },
    org: { bn: "ঢাকা স্পোর্টস ক্লাব (নমুনা)", en: "Dhaka Sports Club (sample)" },
    orgInitial: "ঢা",
    cat: "sports",
    format: "quiz",
    quizAt: { bn: "শনিবার, ৫ ডিসেম্বর · বিকেল ৪টা", en: "Saturday 5 December · 4 pm" },
    ages: ["p1", "p6", "ssc"],
    fee: 20,
    prize: { bn: "৳১০,০০০ + জার্সি", en: "৳10,000 + jerseys" },
    joined: 254,
    daysLeft: 5,
    poster: { bg: "#FFF4D6", ink: "#6B4D00", shape: "ball" },
  },
  {
    id: "c9",
    title: { bn: "ছড়া বলো: ছোটদের আবৃত্তি", en: "Say a rhyme: little reciters" },
    org: { bn: "বিজয়ী আর্ট ক্লাব", en: "Beejoyi Art Club" },
    orgInitial: "বি",
    cat: "speech",
    format: "audio",
    ages: ["pre", "p1"],
    fee: 0,
    prize: { bn: "সার্টিফিকেট + গল্পের বই", en: "Certificate + storybook" },
    joined: 860,
    daysLeft: 10,
    beginner: true,
    poster: { bg: "#FDE3E9", ink: "#C8133F", shape: "mic" },
  },
  {
    id: "c10",
    title: { bn: "সুন্দর হাতের লেখা", en: "Best handwriting" },
    org: { bn: "সবুজপাতা স্কুল (নমুনা)", en: "Sabujpata School (sample)" },
    orgInitial: "স",
    cat: "writing",
    format: "photo",
    ages: ["p1", "p6"],
    fee: 0,
    prize: { bn: "সার্টিফিকেট + কলম সেট", en: "Certificate + pen set" },
    joined: 1103,
    daysLeft: 8,
    beginner: true,
    poster: { bg: "#ECEBFE", ink: "#4846D2", shape: "pen" },
  },
  {
    id: "c11",
    sponsor: { bn: "সবুজ টেলিকম (নমুনা)", en: "Sabuj Telecom (sample)" },
    title: { bn: "প্রথম বিতর্ক: অনলাইন রাউন্ড", en: "First debate: online round" },
    org: { bn: "যুক্তি বিতর্ক ক্লাব (নমুনা)", en: "Jukti Debate Club (sample)" },
    orgInitial: "যু",
    cat: "speech",
    format: "debate",
    ages: ["p6", "ssc"],
    fee: 0,
    prize: { bn: "সার্টিফিকেট + মেন্টর সেশন", en: "Certificate + mentor session" },
    joined: 412,
    daysLeft: 14,
    beginner: true,
    poster: { bg: "#DCDBFD", ink: "#24226E", shape: "mic" },
  },
  {
    id: "c12",
    title: { bn: "শীতের ছবি আঁকো", en: "Paint the winter" },
    org: { bn: "বিজয়ী আর্ট ক্লাব", en: "Beejoyi Art Club" },
    orgInitial: "বি",
    cat: "art",
    format: "photo",
    ages: ["pre", "p1", "p6"],
    fee: 0,
    prize: { bn: "সার্টিফিকেট + রঙের বাক্স", en: "Certificate + paint box" },
    joined: 0,
    daysLeft: 21,
    status: "upcoming",
    startsIn: 5,
    poster: { bg: "#E6F0FB", ink: "#24226E", shape: "sun" },
  },
  {
    id: "c13",
    round: { now: 1, of: 3 },
    inquiry: { bn: "একটা ছোট রোবট কীভাবে তোমার শহরের একটা সমস্যা কমাতে পারে?", en: "How could a small robot ease one problem in your town?" },
    title: { bn: "রোবোটিক্স চ্যালেঞ্জ: স্মার্ট শহর", en: "Robotics challenge: Smart city" },
    org: { bn: "বিজ্ঞান বন্ধু ক্লাব (নমুনা)", en: "Science Friends Club (sample)" },
    orgInitial: "বি",
    cat: "sci",
    format: "video",
    ages: ["p6", "ssc"],
    fee: 300,
    prize: { bn: "৳৩০,০০০ + রোবট কিট", en: "৳30,000 + robot kit" },
    joined: 0,
    daysLeft: 30,
    status: "upcoming",
    startsIn: 12,
    poster: { bg: "#1E1E2E", ink: "#8E8CFF", shape: "atom" },
  },
  {
    id: "c14",
    sponsor: { bn: "আলো ব্যাংক (নমুনা)", en: "Alo Bank (sample)" },
    title: { bn: "মাতৃভাষা দিবস কুইজ", en: "Mother Language Day quiz" },
    org: { bn: "কিশোর কলম (নমুনা)", en: "Kishor Kolom (sample)" },
    orgInitial: "ক",
    cat: "writing",
    format: "quiz",
    ages: ["p6", "ssc"],
    fee: 0,
    prize: { bn: "বই উপহার + সার্টিফিকেট", en: "Books + certificate" },
    joined: 3120,
    daysLeft: 0,
    status: "ended",
    poster: { bg: "#E8F2EC", ink: "#1F5A3E", shape: "pen" },
  },
  {
    id: "c15",
    title: { bn: "বর্ষার পাখি: ফটো কনটেস্ট", en: "Monsoon birds: photo contest" },
    org: { bn: "সবুজ বাংলা ফটো ক্লাব (নমুনা)", en: "Green Bangla Photo Club (sample)" },
    orgInitial: "স",
    cat: "nature",
    format: "photo",
    ages: ["p6", "ssc"],
    fee: 50,
    prize: { bn: "৳১৫,০০০ পুরস্কার", en: "৳15,000 in prizes" },
    joined: 1488,
    daysLeft: 0,
    status: "ended",
    poster: { bg: "#D9F0E2", ink: "#1F5A3E", shape: "leaf" },
  },
  {
    id: "c16",
    title: { bn: "কবিতা আবৃত্তি: রবীন্দ্র-নজরুল সন্ধ্যা", en: "Poetry recitation: Tagore–Nazrul evening" },
    org: { bn: "সুরের পাখি আবৃত্তি দল (নমুনা)", en: "Surer Pakhi Recitation Group (sample)" },
    orgInitial: "সু",
    cat: "speech",
    format: "video",
    ages: ["p6", "ssc"],
    fee: 0,
    prize: { bn: "সার্টিফিকেট + বই উপহার", en: "Certificate + books" },
    joined: 964,
    daysLeft: 0,
    status: "ended",
    poster: { bg: "#FFD3DD", ink: "#99133A", shape: "mic" },
  },
  {
    id: "c17",
    round: { now: 3, of: 3 },
    inquiry: { bn: "তোমার এলাকার কোন গল্পটা সবার শোনা দরকার?", en: "Which story from your area does everyone need to hear?" },
    sponsor: { bn: "সবুজ টেলিকম (নমুনা)", en: "Sabuj Telecom (sample)" },
    title: { bn: "পডকাস্ট চ্যালেঞ্জ: আমার এলাকার গল্প", en: "Podcast challenge: Stories from my area" },
    org: { bn: "তরুণ কণ্ঠ রেডিও (নমুনা)", en: "Torun Kontho Radio (sample)" },
    orgInitial: "ত",
    cat: "speech",
    format: "audio",
    ages: ["p6", "ssc"],
    fee: 0,
    prize: { bn: "রেডিওতে প্রচার + সার্টিফিকেট", en: "Aired on radio + certificate" },
    joined: 702,
    daysLeft: 0,
    status: "ended",
    poster: { bg: "#C9E8F4", ink: "#0B4F5C", shape: "wave" },
  },
  {
    id: "c18",
    title: { bn: "আন্তঃস্কুল বিতর্ক উৎসব: চূড়ান্ত পর্ব", en: "Inter-school debate festival: finals" },
    org: { bn: "যুক্তি বিতর্ক ক্লাব (নমুনা)", en: "Jukti Debate Club (sample)" },
    orgInitial: "যু",
    cat: "speech",
    format: "debate",
    ages: ["p6", "ssc"],
    fee: 0,
    prize: { bn: "৳২০,০০০ + ট্রফি", en: "৳20,000 + trophy" },
    joined: 96,
    daysLeft: 0,
    status: "ended",
    poster: { bg: "#24226E", ink: "#FFC329", shape: "mic" },
  },
];

/** Search across Bangla and English titles and subject names (Postel's law). */
export function matchesQuery(c: Contest, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const cat = cats.find((x) => x.key === c.cat)!.label;
  const f = formats[c.format].label;
  return [c.title.bn, c.title.en, c.org.bn, c.org.en, cat.bn, cat.en, f.bn, f.en].some((s) => s.toLowerCase().includes(q));
}

export const leaderboard = [
  { name: { bn: "তাসনিম", en: "Tasnim" }, cls: { bn: "৫ম শ্রেণি", en: "Class 5" }, score: 18420 },
  { name: { bn: "আরিয়ান", en: "Ariyan" }, cls: { bn: "৮ম শ্রেণি", en: "Class 8" }, score: 17305 },
  { name: { bn: "নুসরাত", en: "Nusrat" }, cls: { bn: "এইচএসসি", en: "HSC" }, score: 16980 },
  { name: { bn: "রাফি", en: "Rafi" }, cls: { bn: "৩য় শ্রেণি", en: "Class 3" }, score: 15112 },
  { name: { bn: "মাহি", en: "Mahi" }, cls: { bn: "৯ম শ্রেণি", en: "Class 9" }, score: 14870 },
];

export const t = {
  nav: {
    contests: { bn: "কনটেস্ট", en: "Contests" },
    games: { bn: "গেম", en: "Games" },
    showcase: { bn: "শোকেস", en: "Showcase" },
    results: { bn: "ফলাফল", en: "Results" },
    forInst: { bn: "প্রতিষ্ঠানের জন্য", en: "For institutions" },
    login: { bn: "লগ ইন", en: "Log in" },
    // Account sign-up. Kept distinct from "join a contest" so one label = one action.
    join: { bn: "ফ্রি সাইন আপ", en: "Sign up free" },
    menu: { bn: "মেনু", en: "Menu" },
    home: { bn: "হোম", en: "Home" },
    profile: { bn: "প্রোফাইল", en: "Profile" },
  },
  hero: {
    verbs: {
      bn: ["আঁকো", "লেখো", "বলো", "গাও", "খেলো"],
      en: ["Draw", "Write", "Speak", "Sing", "Play"],
    },
    line2: { bn: "জিতে নাও সার্টিফিকেট আর পুরস্কার", en: "and win certificates and prizes" },
    sub: {
      bn: "প্রি-স্কুল থেকে এইচএসসি, সবার জন্য কনটেস্ট আর গেম।",
      en: "Contests and games for every student, preschool to HSC.",
    },
    searchPh: { bn: "আঁকা, কুইজ, আবৃত্তি… খুঁজে দেখো", en: "Search drawing, quiz, recitation…" },
    searchBtn: { bn: "কনটেস্ট খোঁজো", en: "Find contests" },
    iam: { bn: "কার জন্য:", en: "For:" },
  },
  /** The homepage stage: a contest is a show in rounds, judged in the open. */
  stage: {
    title: { bn: "মঞ্চ তোমার। বিচার খোলা।", en: "Your stage. Judged in the open." },
    sub: {
      bn: "প্রতিটি কনটেস্ট রাউন্ডে রাউন্ডে: আগে শেখো, তারপর জমা দাও, প্রতিটি দিকে ১–৭ নম্বর আর মন্তব্য নাও, আরো ভালো করো।",
      en: "Every contest runs in rounds: learn first, submit, get a 1–7 score and comments on each criterion, then improve.",
    },
    entryLabel: { bn: "আয়েশার আঁকা, ২য় শ্রেণি (নমুনা)", en: "Ayesha's drawing, Class 2 (sample)" },
    paddlesLabel: { bn: "বিচারকদের নম্বর। একটা চাপো, দেখো ৭ পেতে কী লাগে।", en: "The judges' scores. Tap one to see what earns a 7." },
    paddles: [
      { name: { bn: "সৃজনশীলতা", en: "Creativity" }, score: 5, short: { bn: "নতুন ভাবনা", en: "a new idea" }, top: { bn: "এমন ভাবনা, যা আর কেউ দেখায়নি।", en: "An idea nobody else showed." } },
      { name: { bn: "বিষয়ের মিল", en: "Fits the theme" }, score: 6, short: { bn: "এক দেখাতেই বোঝা যায়", en: "clear at a glance" }, top: { bn: "বিষয়টা এক দেখাতেই বোঝা যায়।", en: "The theme is clear at a glance." } },
      { name: { bn: "রঙ ও যত্ন", en: "Colour & care" }, score: 7, short: { bn: "প্রতিটি রেখায় যত্ন", en: "care in every line" }, top: { bn: "প্রতিটি রেখা আর রঙ যত্ন করে বসানো।", en: "Every line and colour placed with care." } },
    ],
    sevenMeans: { bn: "৭ পেতে হলে:", en: "What earns a 7:" },
    sevenShort: { bn: "৭ মানে", en: "7 means" },
    sample: { bn: "নমুনা", en: "sample" },
    verified: { bn: "যাচাই করা", en: "Verified" },
    rounds: [
      { bn: "রাউন্ড ১ · শেখো", en: "Round 1 · Learn" },
      { bn: "রাউন্ড ২ · ফিডব্যাক", en: "Round 2 · Feedback" },
      { bn: "চূড়ান্ত", en: "Finale" },
    ],
    roundsLabel: { bn: "কনটেস্টের রাউন্ড", en: "Contest rounds" },
    roundNow: { bn: "এখন রাউন্ড ২: নম্বর আর মন্তব্য দেখে কাজটা আরো ভালো করো। তারপর চূড়ান্ত পর্ব।", en: "Now in round 2: use the scores and comments to improve. Then the finale." },
    podium: { bn: "তোমার বয়সের কনটেস্ট খোঁজো", en: "Find a contest for your age" },
    find: { bn: "কনটেস্ট খোঁজো", en: "Find contests" },
  },
  judges: {
    title: { bn: "বিচারকের টেবিল", en: "The judges' table" },
    sub: { bn: "জেতা-হারার নিয়ম আগে থেকেই সবার সামনে। ভোট বা লাইকে কেউ জেতে না।", en: "The rules for winning are public before you start. Nobody wins on votes or likes." },
    points: [
      { t: { bn: "১–৭ নম্বর, প্রতিটি দিকে", en: "1–7 on every criterion" }, d: { bn: "শুধু একটা মোট নম্বর নয়; কোথায় ভালো, কোথায় আরো চেষ্টা দরকার, সব আলাদা করে।", en: "Not one total: you see where you're strong and where to push, criterion by criterion." } },
      { t: { bn: "নাম না দেখে বিচার", en: "Judged without names" }, d: { bn: "বিচারকরা নাম, স্কুল বা জেলা দেখেন না। ঢাকা আর গ্রামের কাজ একই নিয়মে।", en: "Judges don't see names, schools or districts. Dhaka and village entries meet the same rubric." } },
      { t: { bn: "সবার জন্য স্কোরকার্ড", en: "A scorecard for everyone" }, d: { bn: "যে শেষ করে, সে-ই পায় যাচাইযোগ্য স্কিল স্কোরকার্ড। কেউ খালি হাতে ফেরে না।", en: "Everyone who finishes gets a verified Skill Scorecard. Nobody leaves empty-handed." } },
    ],
  },
  curtain: {
    title: { bn: "পরের মঞ্চটা তোমার", en: "The next stage is yours" },
    sub: { bn: "ফ্রি অ্যাকাউন্ট খোলো, প্রথম রাউন্ডের আগে শিখে নাও, তারপর মঞ্চে ওঠো।", en: "Create a free account, learn before round one, then take the stage." },
    browse: { bn: "আগে কনটেস্ট দেখি", en: "Browse contests first" },
  },
  trust: {
    note: { bn: "সংখ্যাগুলো যাচাইয়ের অপেক্ষায় (নমুনা)", en: "Numbers awaiting verification (sample)" },
    items: [
      { n: "৪২,০০০+", nEn: "42,000+", label: { bn: "শিক্ষার্থী", en: "students" } },
      { n: "৩৮০+", nEn: "380+", label: { bn: "কনটেস্ট হয়েছে", en: "contests run" } },
      { n: "১২০+", nEn: "120+", label: { bn: "স্কুল ও ক্লাব", en: "schools & clubs" } },
      { n: "৳১৮ লাখ", nEn: "৳1.8M", label: { bn: "পুরস্কার দেওয়া হয়েছে", en: "in prizes awarded" } },
    ],
    logos: { bn: "যাদের সাথে কাজ করছি", en: "Trusted by" },
  },
  contests: {
    title: { bn: "এখন চলছে", en: "Open now" },
    sub: { bn: "বয়স আর বিষয় বেছে নাও, তোমার জন্য সঠিক কনটেস্ট পাবে।", en: "Pick an age and a subject to see contests that fit." },
    ending: { bn: "শেষ হচ্ছে শীঘ্রই", en: "Ending soon" },
    beginner: { bn: "প্রথমবার? এখান থেকে শুরু করো", en: "First time? Start here" },
    seeAll: { bn: "সব দেখো", en: "See all" },
    free: { bn: "ফ্রি", en: "Free" },
    joined: { bn: "জন যোগ দিয়েছে", en: "joined" },
    daysLeft: { bn: "দিন বাকি", en: "days left" },
    lastDay: { bn: "আজই শেষ দিন", en: "Last day" },
    emptyTitle: { bn: "এই বয়সের জন্য নতুন কনটেস্ট আসছে", en: "New contests for this age are coming" },
    emptyBody: { bn: "নতুন কনটেস্ট এলেই জানিয়ে দেব।", en: "We'll let you know as soon as one opens." },
    notify: { bn: "আমাকে জানিও", en: "Notify me" },
    clear: { bn: "সব বয়স দেখাও", en: "Show all ages" },
    sample: { bn: "নমুনা কনটেস্ট", en: "Sample contests" },
  },
  list: {
    title: { bn: "সব কনটেস্ট", en: "All contests" },
    sub: {
      bn: "বয়স, বিষয় আর ফি দিয়ে বেছে নাও। ফিল্টার করা লিংক শেয়ার করলে অন্যরাও একই তালিকা দেখবে।",
      en: "Filter by age, subject and fee. Share the link and others see the same list.",
    },
    searchPh: { bn: "কনটেস্টের নাম বা বিষয় লেখো", en: "Search by contest name or subject" },
    status: {
      open: { bn: "চলছে", en: "Open now" },
      upcoming: { bn: "শীঘ্রই আসছে", en: "Coming soon" },
      ended: { bn: "ফলাফল", en: "Results" },
    },
    age: { bn: "বয়স / শ্রেণি", en: "Age / class" },
    subject: { bn: "বিষয়", en: "Subject" },
    freeOnly: { bn: "শুধু ফ্রি", en: "Free only" },
    sort: { bn: "সাজাও", en: "Sort" },
    sorts: {
      ending: { bn: "শীঘ্রই শেষ হচ্ছে", en: "Ending soon" },
      popular: { bn: "সবচেয়ে জনপ্রিয়", en: "Most joined" },
      newest: { bn: "নতুন", en: "Newest" },
    },
    filters: { bn: "ফিল্টার", en: "Filters" },
    count: { bn: "টি কনটেস্ট", en: " contests" },
    countOne: { bn: "টি কনটেস্ট", en: " contest" },
    show: { bn: "দেখাও", en: "Show" },
    clearAll: { bn: "সব ফিল্টার মুছে দাও", en: "Clear all filters" },
    startsIn: { bn: "দিন পরে শুরু", en: "days until it opens" },
    remind: { bn: "মনে করিয়ে দিও", en: "Remind me" },
    reminded: { bn: "মনে করিয়ে দেব", en: "We'll remind you" },
    resultsOut: { bn: "ফলাফল প্রকাশিত", en: "Results are out" },
    seeWinners: { bn: "বিজয়ী দেখো", en: "See winners" },
    entries: { bn: "টি জমা", en: "entries" },
    emptyTitle: { bn: "এই ফিল্টারে কোনো কনটেস্ট নেই", en: "No contests match these filters" },
    emptyHint: { bn: "একটা ফিল্টার সরিয়ে দেখো:", en: "Try removing a filter:" },
    remove: { bn: "সরাও", en: "Remove" },
    tryOther: { bn: "অন্য ট্যাবে আছে", en: "Found in another tab" },
  },
  how: {
    title: { bn: "তিন রাউন্ডের অনুষ্ঠান", en: "A show in three rounds" },
    sub: { bn: "প্রতিটি রাউন্ডের আগে জানো পরেরটায় কী হবে।", en: "Before each round, you know what the next one holds." },
    next: { bn: "এরপর", en: "Next" },
    order: [
      {
        d: { bn: "সমস্যাটা পড়ো, ৩ মিনিটের শেখার কার্ড দেখো, তারপর প্রথম কাজ জমা দাও। ফাঁকা পাতা নয়, তিনটা সহজ প্রশ্ন।", en: "Read the problem, take the 3-minute learning card, then submit a first version. Not a blank page: three easy questions." },
        next: { bn: "৫ দিনে প্রতিটি দিকে ১–৭ নম্বর আর বিচারকের মন্তব্য।", en: "Within 5 days: a 1–7 score and a judge's comment on each criterion." },
      },
      {
        d: { bn: "নম্বর আর মন্তব্য দেখো, রেকর্ড করা মেন্টর ক্লিনিক দেখো, কাজটা ভালো করো আর লেখো কী বদলালে।", en: "Read your scores and comments, watch the recorded mentor clinic, improve your work and note what you changed." },
        next: { bn: "সেরারা চূড়ান্ত পর্বে; কাজ আর ভাবনা পাশাপাশি।", en: "The best go to the finale, work and thinking side by side." },
      },
      {
        d: { bn: "চূড়ান্ত কাজ জমা দাও। প্রয়োজনে অনলাইনে বিচারকদের সামনে উপস্থাপন।", en: "Submit your final work, and present it online to the judges if you're shortlisted." },
        next: { bn: "যে শেষ করে, সে-ই পায় যাচাইযোগ্য স্কিল স্কোরকার্ড।", en: "Everyone who finishes gets a verified Skill Scorecard." },
      },
    ],
    art: {
      uploaded: { bn: "আপলোড হয়েছে", en: "Uploaded" },
      join: { bn: "যোগ দাও", en: "Join" },
      certificate: { bn: "স্কিল স্কোরকার্ড", en: "Skill Scorecard" },
      name: { bn: "আয়েশা", en: "Ayesha" },
    },
    steps: [
      { t: { bn: "যোগ দাও, শিখে নাও", en: "Join and learn" }, d: { bn: "ফোন নম্বর দিয়েই যোগ দাও। শুরুর আগে ৩ মিনিটের একটা শেখার কার্ড, ফাঁকা পাতার ভয় নেই।", en: "Join with just your phone number. A 3-minute learning card comes first, so you never face a blank page." } },
      { t: { bn: "জমা দাও, ফিডব্যাক নাও", en: "Submit, get feedback" }, d: { bn: "ফোন থেকেই আপলোড করো। বিচারকরা প্রতিটি দিকে ১–৭ নম্বর আর মন্তব্য দেবেন, তুমি আরো ভালো করবে।", en: "Upload from your phone. Judges score each criterion 1–7 with comments, so you can improve." } },
      { t: { bn: "স্কোরকার্ড নাও", en: "Earn your scorecard" }, d: { bn: "যে শেষ করে, সে-ই পায় যাচাইযোগ্য স্কিল স্কোরকার্ড। জিতলে পুরস্কারও।", en: "Everyone who finishes gets a verified Skill Scorecard. Winners get prizes too." } },
    ],
  },
  games: {
    title: { bn: "একটু খেলে নাও", en: "Take a game break" },
    sub: { bn: "সাইন-আপ ছাড়াই খেলো। স্কোর সেভ করতে চাইলে তবেই অ্যাকাউন্ট।", en: "Play without signing up. Create an account only if you want to save your score." },
    play: { bn: "খেলো", en: "Play" },
    board: { bn: "এই সপ্তাহের সেরা", en: "This week's top players" },
    resets: { bn: "প্রতি শনিবার নতুন করে শুরু", en: "Resets every Saturday" },
    list: [
      { key: "2048", name: { bn: "২০৪৮", en: "2048" }, d: { bn: "সংখ্যা মিলাও, ২০৪৮ বানাও", en: "Merge numbers to reach 2048" } },
      { key: "gomoku", name: { bn: "গোমোকু", en: "Gomoku" }, d: { bn: "পাঁচটা গুটি এক লাইনে", en: "Get five in a row" } },
      { key: "mancala", name: { bn: "মানকালা", en: "Mancala" }, d: { bn: "বীজ বোনো, বেশি জমাও", en: "Sow seeds, collect the most" } },
      { key: "rps", name: { bn: "রক পেপার সিজার্স", en: "Rock paper scissors" }, d: { bn: "দ্রুত, মজার, এক রাউন্ড", en: "Quick rounds against the clock" } },
    ],
  },
  showcase: {
    title: { bn: "বিজয়ীদের কাজ, আর পেছনের ভাবনা", en: "Winning work, and the thinking behind it" },
    sub: { bn: "প্রতিটি বিজয়ী কাজের পাশে লেখা থাকে কী বদলেছে, কেন। (নমুনা; আসল কাজ অভিভাবকের অনুমতি নিয়ে দেখানো হবে)", en: "Every winning entry sits beside a note on what changed, and why. (Samples; real work shown with parent consent)" },
    noteLabel: { bn: "কাজের পেছনের ভাবনা", en: "The thinking behind it" },
    items: [
      { who: { bn: "আয়েশা, ২য় শ্রেণি", en: "Ayesha, Class 2" }, note: { bn: "প্রথমে আকাশ ফাঁকা ছিল; মেন্টরের কথায় সূর্যটা কোণে সরিয়েছি।", en: "The sky was empty at first; after the mentor's tip I moved the sun to the corner." }, what: { bn: "চিত্রাঙ্কন: আমার প্রিয় গ্রাম", en: "Drawing: My favourite village" }, place: { bn: "প্রথম", en: "1st" } },
      { who: { bn: "সামির, ৭ম শ্রেণি", en: "Samir, Class 7" }, note: { bn: "প্রথম পাম্পটা পানি তুলত না; প্যানেলটা হেলিয়ে আবার বানিয়েছি।", en: "My first pump lifted no water; I tilted the panel and rebuilt it." }, what: { bn: "বিজ্ঞান মেলা: সৌর পাম্প", en: "Science fair: Solar pump" }, place: { bn: "প্রথম", en: "1st" } },
      { who: { bn: "ঋতু, এইচএসসি", en: "Ritu, HSC" }, note: { bn: "রাউন্ড ২-এর ফিডব্যাকে শেষটা নতুন করে লিখেছি।", en: "I rewrote the ending after round 2 feedback." }, what: { bn: "গল্প: নদীর ওপারে", en: "Story: Across the river" }, place: { bn: "দ্বিতীয়", en: "2nd" } },
      { who: { bn: "তাহমিদ, প্রি-স্কুল", en: "Tahmid, Preschool" }, note: { bn: "আম্মু বলেছিল পাপড়ি গুনে দেখতে; বারোটা এঁকেছি।", en: "Mum told me to count the petals; I drew twelve." }, what: { bn: "রঙ করো: সূর্যমুখী", en: "Colouring: Sunflower" }, place: { bn: "বিশেষ পুরস্কার", en: "Special mention" } },
    ],
  },
  parents: {
    title: { bn: "বাবা-মায়ের জন্য", en: "For parents" },
    sub: { bn: "আপনার সন্তান নিরাপদে অংশ নেবে, এটা আমাদের প্রথম দায়িত্ব।", en: "Your child's safety comes first." },
    points: [
      { t: { bn: "প্রোফাইল আপনার হাতে", en: "You control the profile" }, d: { bn: "ছোটদের অ্যাকাউন্ট খোলেন ও চালান বাবা-মা। এক অ্যাকাউন্টে একাধিক সন্তান।", en: "Parents create and manage accounts for younger children, with several children under one login." } },
      { t: { bn: "শুধু যাচাই করা আয়োজক", en: "Only verified organisers" }, d: { bn: "প্রতিটি স্কুল, ক্লাব ও ব্র্যান্ড অনুমোদনের পরেই কনটেস্ট চালাতে পারে।", en: "Every school, club and brand is approved before it can run a contest." } },
      { t: { bn: "যোগাযোগের তথ্য গোপন", en: "Contact details stay private" }, d: { bn: "সন্তানের ফোন, ঠিকানা বা স্কুলের বিস্তারিত কখনো প্রকাশ্যে দেখানো হয় না।", en: "A child's phone, address and school details are never shown publicly." } },
      { t: { bn: "স্বচ্ছ ফি, স্থায়ী সার্টিফিকেট", en: "Clear fees, lasting certificates" }, d: { bn: "বিকাশ, নগদ বা কার্ডে পেমেন্ট, রসিদসহ। সার্টিফিকেট যেকোনো সময় ডাউনলোড করা যায়।", en: "Pay by bKash, Nagad or card with a receipt. Download certificates any time." } },
    ],
  },
  b2b: {
    title: { bn: "কনটেস্ট আয়োজন করুন বিজয়ীতে", en: "Run your contests on Beejoyi" },
    sub: {
      bn: "কাগজের ফর্ম, গুগল ফর্ম আর স্প্রেডশিটের ঝামেলা বাদ। রেজিস্ট্রেশন থেকে সার্টিফিকেট, সব এক ড্যাশবোর্ডে।",
      en: "No more paper forms, Google Forms and spreadsheets. Registration to certificates, all in one dashboard.",
    },
    inst: {
      t: { bn: "স্কুল, ক্লাব ও শিক্ষকদের জন্য", en: "For schools, clubs and teachers" },
      points: [
        { bn: "তৈরি ৩-রাউন্ড টেমপ্লেট আর ১–৭ রুব্রিক লাইব্রেরি", en: "Ready 3-round templates and a 1–7 rubric library" },
        { bn: "জমা, বিচারক আর ফলাফল এক ড্যাশবোর্ডে", en: "Entries, judges and results in one dashboard" },
        { bn: "বিকাশ/নগদে এন্ট্রি ফি সংগ্রহ", en: "Collect entry fees by bKash or Nagad" },
        { bn: "২৪ ঘণ্টার মধ্যে অনুমোদন, শুরু ফ্রিতে", en: "Approved within 24 hours, free to start" },
      ],
      cta: { bn: "প্রতিষ্ঠানের জন্য দেখুন", en: "See plans for institutions" },
    },
    brand: {
      t: { bn: "ব্র্যান্ড ও সিএসআর-এর জন্য", en: "For brands and CSR teams" },
      points: [
        { bn: "সারা দেশের যাচাই করা শিক্ষার্থীদের কাছে পৌঁছান", en: "Reach verified students across Bangladesh" },
        { bn: "আপনার নামে কনটেস্ট স্পন্সর করুন", en: "Sponsor a contest under your name" },
        { bn: "জেলাভিত্তিক অংশগ্রহণ আর স্কিল-বৃদ্ধির সিএসআর রিপোর্ট", en: "District reach and skill growth in a CSR impact report" },
      ],
      cta: { bn: "পার্টনার হোন", en: "Become a partner" },
    },
  },
  faq: {
    title: { bn: "প্রায়ই জিজ্ঞেস করা প্রশ্ন", en: "Common questions" },
    items: [
      { q: { bn: "বিজয়ীতে যোগ দিতে কি টাকা লাগে?", en: "Does it cost anything to join?" }, a: { bn: "অ্যাকাউন্ট খোলা আর গেম খেলা সম্পূর্ণ ফ্রি। বেশিরভাগ কনটেস্ট ফ্রি; কিছু কনটেস্টে ছোট এন্ট্রি ফি থাকে, যা কার্ডেই লেখা থাকে।", en: "Creating an account and playing games is free. Most contests are free; some have a small entry fee, shown on the contest card." } },
      { q: { bn: "কোন বয়সের শিক্ষার্থীরা অংশ নিতে পারে?", en: "What ages can take part?" }, a: { bn: "৩ বছর থেকে এইচএসসি পর্যন্ত। প্রতিটি কনটেস্টে বয়স বা শ্রেণি লেখা থাকে।", en: "From age 3 up to HSC. Every contest shows which ages or classes it is for." } },
      { q: { bn: "আমার সন্তানের তথ্য কি নিরাপদ?", en: "Is my child's information safe?" }, a: { bn: "হ্যাঁ। ছোটদের প্রোফাইল বাবা-মা চালান, আর যোগাযোগের তথ্য কখনো প্রকাশ্যে দেখানো হয় না।", en: "Yes. Parents manage younger children's profiles, and contact details are never shown publicly." } },
      { q: { bn: "বিজয়ী কীভাবে ঠিক হয়?", en: "How are winners chosen?" }, a: { bn: "প্রতিটি কনটেস্টের নম্বর দেওয়ার নিয়ম (রুব্রিক) আগেই প্রকাশ করা থাকে। বিচারকরা প্রতিটি দিকে ১ থেকে ৭ নম্বর দেন, নাম না দেখে। ভোট বা লাইকে কেউ জেতে না।", en: "Each contest publishes its scoring guide (rubric) in advance. Judges score every criterion from 1 to 7 without seeing names. Nobody wins on votes or likes." } },
      { q: { bn: "না জিতলে কী পাব?", en: "What do I get if I don't win?" }, a: { bn: "যে শেষ করে, সে-ই পায় স্কিল স্কোরকার্ড: প্রতিটি দিকে ১–৭ নম্বর, বিচারকের মন্তব্য আর যাচাই লিংক। কেউ খালি হাতে ফেরে না।", en: "Everyone who finishes gets a Skill Scorecard: a 1–7 score on every criterion, judges' comments and a verify link. Nobody leaves empty-handed." } },
      { q: { bn: "ফ্রি কনটেস্টের খরচ কে দেয়?", en: "Who pays for free contests?" }, a: { bn: "ব্র্যান্ড আর প্রতিষ্ঠান, তাদের সিএসআর বাজেট থেকে। তাদের নাম কনটেস্টে লেখা থাকে; তোমার কোনো লুকানো খরচ নেই।", en: "Brands and organisations, from their CSR budgets. Their name is shown on the contest, and there are no hidden costs for you." } },
    ],
  },
  final: {
    title: { bn: "পরের বিজয়ী হতে পারো তুমি", en: "The next winner could be you" },
    sub: { bn: "ফ্রি অ্যাকাউন্ট খোলো, আজই প্রথম কনটেস্টে যোগ দাও।", en: "Create a free account and join your first contest today." },
  },
  footer: {
    tag: { bn: "বাংলাদেশের শিক্ষার্থীদের কনটেস্ট প্ল্যাটফর্ম", en: "The contest platform for students in Bangladesh" },
    cols: [
      { t: { bn: "শিক্ষার্থী", en: "Students" }, links: [{ bn: "কনটেস্ট", en: "Contests" }, { bn: "গেম", en: "Games" }, { bn: "শোকেস", en: "Showcase" }, { bn: "ফলাফল", en: "Results" }] },
      { t: { bn: "প্রতিষ্ঠান", en: "Organisations" }, links: [{ bn: "প্রতিষ্ঠানের জন্য", en: "For institutions" }, { bn: "পার্টনার হোন", en: "Become a partner" }, { bn: "মূল্য", en: "Pricing" }, { bn: "ইমপ্যাক্ট ও বিনিয়োগকারী", en: "Impact & investors" }] },
      { t: { bn: "বিজয়ী", en: "Beejoyi" }, links: [{ bn: "আমাদের সম্পর্কে", en: "About us" }, { bn: "শপ", en: "Shop" }, { bn: "প্রশ্নোত্তর", en: "FAQ" }, { bn: "যোগাযোগ", en: "Contact" }] },
    ],
    legal: { bn: "© ২০২৬ বিজয়ী ফাউন্ডেশন", en: "© 2026 Beejoyi Foundation" },
    terms: { bn: "শর্তাবলি", en: "Terms" },
    privacy: { bn: "গোপনীয়তা", en: "Privacy" },
    call: { bn: "কল বা হোয়াটসঅ্যাপ", en: "Call or WhatsApp" },
  },
} as const;

/* ---------- Contest detail page ---------- */

type SubjectGuide = {
  overview: L;
  format: L;
  steps: L[];
  rules: L[];
  rubric: { name: L; weight: number; top: L }[];
  /** The 3-minute learning card shown before you make your entry */
  learn: L[];
};

// Per-format defaults. Organisers will be able to edit these in the Studio.
export const formatGuides: Record<Format, SubjectGuide> = {
  quiz: {
    learn: [
      { bn: "৩০টি প্রশ্ন, ২০ মিনিট। ভুল উত্তরে নম্বর কাটে না, তাই সব প্রশ্নের উত্তর দাও।", en: "30 questions in 20 minutes. Wrong answers cost nothing, so answer every one." },
      { bn: "কঠিন প্রশ্নে আটকে থেকো না; পরে ফিরে আসা যায়।", en: "Don't get stuck on a hard one; you can come back to it." },
      { bn: "শুরুর আগে ফোনের চার্জ আর ইন্টারনেট দেখে নাও।", en: "Check your battery and internet before you start." },
    ],
    overview: {
      bn: "নির্দিষ্ট সময়ে অনলাইনে কুইজ দাও, ফোন বা কম্পিউটার যেকোনোটা দিয়ে। প্রশ্ন তোমার শ্রেণির উপযোগী।",
      en: "Take the quiz online at the set time, on a phone or computer. Questions suit your class.",
    },
    format: { bn: "অনলাইন কুইজ: ৩০টি প্রশ্ন, ২০ মিনিট", en: "Online quiz: 30 questions, 20 minutes" },
    steps: [
      { bn: "যোগ দাও", en: "Join" },
      { bn: "নির্ধারিত সময়ে লগ ইন করো", en: "Log in at the set time" },
      { bn: "২০ মিনিটে উত্তর দাও", en: "Answer within 20 minutes" },
    ],
    rules: [
      { bn: "কুইজ একবারই দেওয়া যাবে", en: "The quiz can be taken once" },
      { bn: "ইন্টারনেট সার্চ বা অন্যের সাহায্য নেওয়া যাবে না", en: "No web search and no help from others" },
      { bn: "নম্বর সমান হলে যে কম সময়ে শেষ করেছে সে এগিয়ে", en: "On a tie, the faster finish ranks higher" },
    ],
    rubric: [
      { name: { bn: "সঠিক উত্তর", en: "Correct answers" }, weight: 90, top: { bn: "প্রায় সব প্রশ্নের সঠিক উত্তর", en: "Almost every answer correct" } },
      { name: { bn: "সময় (টাই হলে)", en: "Time (tie-break)" }, weight: 10, top: { bn: "নির্ধারিত সময়ের অনেক আগে শেষ", en: "Finished well within the time" } },
    ],
  },
  photo: {
    learn: [
      { bn: "জানালার পাশে দিনের আলোয় তোলো; ফ্ল্যাশ বন্ধ রাখো।", en: "Shoot by a window in daylight; keep the flash off." },
      { bn: "আঁকা ছবি হলে ফোন একদম সোজা ওপরে ধরো, যেন কাগজ বাঁকা না দেখায়।", en: "For a drawing, hold the phone straight above so the paper isn't skewed." },
      { bn: "মূল জিনিসটা মাঝখানে নয়, এক পাশে রাখলে ছবি বেশি জীবন্ত লাগে।", en: "Placing the subject off-centre often makes the photo feel more alive." },
    ],
    overview: {
      bn: "ছবি তোলো, বা আঁকা ছবির ছবি তোলো, তারপর আপলোড করো। ফোনের ক্যামেরাই যথেষ্ট।",
      en: "Take a photo, or photograph your artwork, then upload it. A phone camera is enough.",
    },
    format: { bn: "ছবি: JPG বা PNG, সর্বোচ্চ ১৫ MB, ৩টি পর্যন্ত", en: "Photo: JPG or PNG, up to 15 MB, up to 3" },
    steps: [
      { bn: "বিষয় অনুযায়ী ছবি তোলো বা আঁকো", en: "Shoot or draw on the theme" },
      { bn: "ভালো আলোতে, সোজা করে তোলো", en: "Shoot it straight, in good light" },
      { bn: "এক লাইনের ক্যাপশন দিয়ে আপলোড করো", en: "Upload with a one-line caption" },
    ],
    rules: [
      { bn: "কাজটি নিজের হতে হবে", en: "The work must be your own" },
      { bn: "হালকা এডিট (উজ্জ্বলতা, ক্রপ) চলবে; এআই বা জোড়া লাগানো ছবি চলবে না", en: "Light edits (brightness, crop) are fine; no AI or compositing" },
      { bn: "সর্বোচ্চ ৩টি ছবি", en: "Up to 3 photos" },
    ],
    rubric: [
      { name: { bn: "সৃজনশীলতা ও মুহূর্ত", en: "Creativity & moment" }, weight: 40, top: { bn: "এমন মুহূর্ত বা ভাবনা, যা আর কেউ দেখায়নি", en: "A moment or idea nobody else showed" } },
      { name: { bn: "বিষয়ের সাথে মিল", en: "Fits the theme" }, weight: 30, top: { bn: "বিষয়টা এক দেখাতেই বোঝা যায়", en: "The theme is clear at a glance" } },
      { name: { bn: "কম্পোজিশন ও আলো", en: "Composition & light" }, weight: 30, top: { bn: "আলো আর ফ্রেম মিলে চোখ ঠিক জায়গায় যায়", en: "Light and framing lead the eye where it should go" } },
    ],
  },
  video: {
    learn: [
      { bn: "শুরুতেই এক লাইনে বলো, কী নিয়ে বলবে।", en: "Say in one line, right at the start, what you'll talk about." },
      { bn: "ফোন আড়াআড়ি ধরো, মুখের সামনে থেকে আলো রাখো।", en: "Hold the phone sideways and keep the light in front of your face." },
      { bn: "একবার মহড়া দিয়ে সময় মেপে নাও; ৩ মিনিটের মধ্যে থাকো।", en: "Rehearse once and time yourself; stay under 3 minutes." },
    ],
    overview: {
      bn: "ফোনে ভিডিও রেকর্ড করে জমা দাও: আবৃত্তি, বক্তৃতা, পিচ বা প্রজেক্টের ডেমো।",
      en: "Record a video on your phone and submit it: a recitation, speech, pitch or project demo.",
    },
    format: { bn: "ভিডিও: MP4, সর্বোচ্চ ৩ মিনিট, ২০০ MB", en: "Video: MP4, up to 3 minutes, 200 MB" },
    steps: [
      { bn: "কী বলবে বা দেখাবে ঠিক করো", en: "Plan what you'll say or show" },
      { bn: "শান্ত, আলোকিত জায়গায় রেকর্ড করো", en: "Record somewhere quiet and bright" },
      { bn: "প্রোফাইল থেকে আপলোড করো", en: "Upload it from your profile" },
    ],
    rules: [
      { bn: "ভিডিওতে অংশগ্রহণকারীকেই দেখা যেতে হবে", en: "The participant must appear in the video" },
      { bn: "সময়সীমা ৩ মিনিট; বেশি হলে নম্বর কাটা যাবে", en: "3-minute limit; longer entries lose marks" },
      { bn: "এক টানে রেকর্ড; কাটাছেঁড়া চলবে না", en: "One continuous take, no cuts" },
    ],
    rubric: [
      { name: { bn: "বিষয়বস্তু", en: "Content" }, weight: 35, top: { bn: "পরিষ্কার ভাবনা, তথ্য বা উদাহরণ দিয়ে পোক্ত", en: "A clear idea, backed by facts or examples" } },
      { name: { bn: "ভাব ও উপস্থাপনা", en: "Expression & delivery" }, weight: 35, top: { bn: "চোখ, কণ্ঠ আর ভঙ্গি মিলে শ্রোতাকে ধরে রাখে", en: "Eyes, voice and gesture hold the audience" } },
      { name: { bn: "সাবলীলতা", en: "Fluency" }, weight: 20, top: { bn: "কোথাও আটকায় না, স্বাভাবিক গতি", en: "Never stalls; a natural pace" } },
      { name: { bn: "সময় মেনে চলা", en: "Timing" }, weight: 10, top: { bn: "সময়ের মধ্যে, তাড়াহুড়ো ছাড়া", en: "Within time, without rushing" } },
    ],
  },
  audio: {
    learn: [
      { bn: "কাপড়-ভরা ছোট ঘরে রেকর্ড করো; প্রতিধ্বনি কম হয়।", en: "Record in a small room with soft things around; there's less echo." },
      { bn: "ফোন মুখ থেকে এক বিঘত দূরে রাখো।", en: "Keep the phone about a hand-span from your mouth." },
      { bn: "গল্পে একটা শুরু, একটা মোড় আর একটা শেষ রাখো।", en: "Give your story a beginning, a twist and an ending." },
    ],
    overview: {
      bn: "শুধু কণ্ঠ: ছড়া, গল্প বা পডকাস্ট রেকর্ড করে জমা দাও। ক্যামেরার সামনে আসতে হবে না।",
      en: "Voice only: record a rhyme, story or podcast and submit it. No camera needed.",
    },
    format: { bn: "অডিও: MP3 বা M4A, সর্বোচ্চ ৩ মিনিট, ৫০ MB", en: "Audio: MP3 or M4A, up to 3 minutes, 50 MB" },
    steps: [
      { bn: "ছড়া, গল্প বা বিষয় বেছে নাও", en: "Pick your rhyme, story or topic" },
      { bn: "শান্ত জায়গায় ফোনে রেকর্ড করো", en: "Record on a phone somewhere quiet" },
      { bn: "প্রোফাইল থেকে আপলোড করো", en: "Upload it from your profile" },
    ],
    rules: [
      { bn: "কণ্ঠ অংশগ্রহণকারীর নিজের হতে হবে", en: "The voice must be the participant's own" },
      { bn: "ব্যাকগ্রাউন্ড মিউজিক চলবে না", en: "No background music" },
      { bn: "সময়সীমা ৩ মিনিট", en: "3-minute limit" },
    ],
    rubric: [
      { name: { bn: "উচ্চারণ", en: "Pronunciation" }, weight: 35, top: { bn: "প্রতিটি শব্দ শুদ্ধ আর স্পষ্ট", en: "Every word correct and clear" } },
      { name: { bn: "ভাব ও আবেগ", en: "Expression" }, weight: 35, top: { bn: "কণ্ঠেই গল্পের ছবি ফুটে ওঠে", en: "The voice alone paints the story" } },
      { name: { bn: "সাবলীলতা", en: "Fluency" }, weight: 20, top: { bn: "কোথাও আটকায় না, স্বাভাবিক গতি", en: "Never stalls; a natural pace" } },
      { name: { bn: "সময় মেনে চলা", en: "Timing" }, weight: 10, top: { bn: "সময়ের মধ্যে, তাড়াহুড়ো ছাড়া", en: "Within time, without rushing" } },
    ],
  },
  debate: {
    learn: [
      { bn: "প্রতিটি যুক্তি তিন ধাপে: দাবি, প্রমাণ, উদাহরণ।", en: "Build each argument in three parts: claim, evidence, example." },
      { bn: "প্রতিপক্ষের সবচেয়ে শক্ত যুক্তিটার জবাব আগে দাও।", en: "Answer the other side's strongest point first." },
      { bn: "দলে আগেই ঠিক করো কে কোন অংশ বলবে।", en: "Agree in advance who covers which part." },
    ],
    overview: {
      bn: "৩ জনের দল বানাও, তারপর লাইভ অনলাইন রাউন্ডে অন্য দলের সাথে বিতর্ক করো। জিতলে পুরো দল বিজয়ী।",
      en: "Form a team of 3 and debate other teams in live online rounds. Wins go to the whole team.",
    },
    format: { bn: "দলগত: ৩ জন, ভিডিও কলে লাইভ রাউন্ড, নকআউট পদ্ধতি", en: "Teams of 3, live rounds on video call, knockout" },
    steps: [
      { bn: "৩ জনের দল নিয়ে যোগ দাও", en: "Join with a team of 3" },
      { bn: "বিষয় আর সময়সূচি এসএমএসে পাবে", en: "Get the motion and schedule by SMS" },
      { bn: "লাইভ রাউন্ডে বিতর্ক করো", en: "Debate in the live round" },
    ],
    rules: [
      { bn: "দলের সবাই একই প্রতিষ্ঠানের হতে হবে", en: "All team members must be from the same institution" },
      { bn: "প্রত্যেক বক্তা ৪ মিনিট সময় পাবে", en: "Each speaker gets 4 minutes" },
      { bn: "প্রতিপক্ষকে সম্মান করে কথা বলতে হবে", en: "Speak respectfully to the other team" },
    ],
    rubric: [
      { name: { bn: "যুক্তি", en: "Argument" }, weight: 40, top: { bn: "প্রতিটি দাবির পেছনে প্রমাণ আর উদাহরণ", en: "Evidence and an example behind every claim" } },
      { name: { bn: "খণ্ডন", en: "Rebuttal" }, weight: 30, top: { bn: "প্রতিপক্ষের মূল যুক্তির সরাসরি জবাব", en: "Answers the other side's main point head-on" } },
      { name: { bn: "উপস্থাপনা", en: "Delivery" }, weight: 20, top: { bn: "আত্মবিশ্বাসী, স্পষ্ট, সম্মান রেখে", en: "Confident, clear and respectful" } },
      { name: { bn: "দলের সমন্বয়", en: "Teamwork" }, weight: 10, top: { bn: "তিনজনের কথা এক সুতোয় গাঁথা", en: "Three speakers, one connected case" } },
    ],
  },
};

export const childProfiles = [
  { id: "k1", name: { bn: "আয়েশা", en: "Ayesha" }, age: "p1" as AgeKey, cls: { bn: "২য় শ্রেণি", en: "Class 2" } },
  { id: "k2", name: { bn: "রাফি", en: "Rafi" }, age: "pre" as AgeKey, cls: { bn: "প্রি-স্কুল", en: "Preschool" } },
  { id: "me", name: { bn: "আমি নিজে", en: "Myself" }, age: "ssc" as AgeKey, cls: { bn: "এইচএসসি", en: "HSC" } },
];

export const detail = {
  back: { bn: "সব কনটেস্ট", en: "All contests" },
  verified: { bn: "যাচাই করা আয়োজক", en: "Verified organiser" },
  facts: {
    age: { bn: "কারা পারবে", en: "Who can join" },
    fee: { bn: "এন্ট্রি ফি", en: "Entry fee" },
    deadline: { bn: "শেষ সময়", en: "Deadline" },
    prize: { bn: "পুরস্কার", en: "Prize" },
    opens: { bn: "শুরু হবে", en: "Opens" },
    ended: { bn: "শেষ হয়েছে", en: "Closed" },
  },
  inDays: { bn: "দিন পরে", en: "days from now" },
  sections: {
    winners: { bn: "বিজয়ী", en: "Winners" },
    overview: { bn: "বিস্তারিত", en: "Overview" },
    how: { bn: "কীভাবে জমা দেবে", en: "How to submit" },
    rules: { bn: "নিয়ম", en: "Rules" },
    judging: { bn: "বিচার", en: "Judging" },
    timeline: { bn: "সময়সূচি", en: "Timeline" },
    rounds: { bn: "রাউন্ড", en: "Rounds" },
    scorecard: { bn: "স্কোরকার্ড", en: "Scorecard" },
    faq: { bn: "প্রশ্ন", en: "Questions" },
  },
  everyone: { bn: "যে শেষ করে, সে-ই পাবে স্কিল স্কোরকার্ড: প্রতিটি দিকে ১–৭ নম্বর, বিচারকের মন্তব্য আর যাচাই লিংক। কেউ খালি হাতে ফেরে না।", en: "Everyone who finishes gets a Skill Scorecard: a 1–7 score on each criterion, judges' comments and a verify link. Nobody leaves empty-handed." },
  sponsor: {
    by: { bn: "সৌজন্যে", en: "Sponsored by" },
    free: { bn: "ফ্রি, সিএসআর স্পন্সরড", en: "Free, CSR sponsored" },
    note: { bn: "খরচ দিচ্ছে স্পন্সর; তোমার কোনো লুকানো খরচ নেই।", en: "The sponsor pays; there are no hidden costs for you." },
  },
  inquiry: { bn: "যে প্রশ্নের উত্তর খুঁজবে", en: "The question you'll explore" },
  roundOf: { bn: "রাউন্ড {now}/{of}", en: "Round {now} of {of}" },
  rounds: [
    {
      t: { bn: "অনুসন্ধান", en: "Inquiry" },
      d: { bn: "সমস্যাটা পড়ো, ৩ মিনিটের শেখার কার্ড দেখো, তারপর প্রথম ভাবনা বা স্কেচ জমা দাও।", en: "Read the problem, take the 3-minute learning card, then submit a first idea or sketch." },
    },
    {
      t: { bn: "ফিডব্যাক ও উন্নতি", en: "Feedback and improve" },
      d: { bn: "১–৭ নম্বর আর মন্তব্য দেখো, রেকর্ড করা মেন্টর ক্লিনিক যখন খুশি দেখো, কাজ ভালো করো আর লেখো কী বদলালে।", en: "See your 1–7 scores and comments, watch the recorded mentor clinic any time, improve your work and note what you changed." },
    },
    {
      t: { bn: "চূড়ান্ত পর্ব", en: "Finale" },
      d: { bn: "চূড়ান্ত কাজ জমা দাও। ফাইনালিস্টদের কাজ আর কাজের পেছনের ভাবনা পাশাপাশি দেখানো হবে।", en: "Submit your final work. Finalists' work is shown side by side with their thinking." },
    },
  ],
  roundState: {
    done: { bn: "শেষ", en: "Done" },
    now: { bn: "এখন চলছে", en: "Running now" },
    next: { bn: "সামনে", en: "Coming up" },
  },
  clinic: { bn: "মেন্টর ক্লিনিক রেকর্ড করা থাকে: কারেন্ট বা নেট চলে গেলেও পরে দেখা যাবে, লেখা সারাংশও থাকবে।", en: "Mentor clinics are recorded, so you can watch later if the power or internet goes. A text summary comes with each." },
  format: { bn: "জমার ধরন", en: "What to submit" },
  rubricNote: {
    bn: "বিচারকরা প্রতিটি দিকে ১ থেকে ৭ নম্বর দেবেন, নাম-স্কুল না দেখে। ওজন অনুযায়ী মিলিয়ে মোট নম্বর ১০০-তে।",
    en: "Judges score each criterion from 1 to 7 without seeing names or schools. Weighted together, the total is out of 100.",
  },
  weight: { bn: "ওজন", en: "Weight" },
  bands: [
    { bn: "১–২ শুরু", en: "1–2 starting" },
    { bn: "৩–৪ এগোচ্ছে", en: "3–4 developing" },
    { bn: "৫–৬ দক্ষ", en: "5–6 skilled" },
    { bn: "৭ অসাধারণ", en: "7 excellent" },
  ],
  topLabel: { bn: "৭ পেতে হলে:", en: "What earns a 7:" },
  scorecard: {
    title: { bn: "সবার জন্য স্কিল স্কোরকার্ড", en: "A Skill Scorecard for everyone" },
    sub: { bn: "জিতুক বা না জিতুক, যে শেষ করেছে সে এমন একটা স্কোরকার্ড পায়। (নমুনা)", en: "Win or not, everyone who finished gets a scorecard like this. (Sample)" },
    name: { bn: "তানভীর হাসান", en: "Tanvir Hasan" },
    cls: { bn: "৯ম শ্রেণি · বগুড়া", en: "Class 9 · Bogura" },
    kind: { bn: "স্কিল স্কোরকার্ড", en: "Skill Scorecard" },
    of7: { bn: "/৭", en: "/7" },
    profile: { bn: "লার্নার প্রোফাইল", en: "Learner profile" },
    badges: [
      { bn: "অনুসন্ধানী", en: "Inquirer" },
      { bn: "চিন্তাশীল", en: "Thinker" },
      { bn: "নিজের কাজ ফিরে দেখে", en: "Reflective" },
    ],
    comment: { bn: "বিচারকের মন্তব্য", en: "Judge's comment" },
    commentText: { bn: "শুরুটা দারুণ। দ্বিতীয় রাউন্ডে যে বদল এনেছ, তা স্পষ্ট বোঝা যায়। শেষটা আরেকটু ধীরে বলো।", en: "A great opening. The change you made in round 2 is clear. Slow down a little at the end." },
    poweredBy: { bn: "সৌজন্যে {sponsor} × বিজয়ী", en: "Powered by {sponsor} × Beejoyi" },
    poweredSolo: { bn: "বিজয়ী যাচাই করা", en: "Verified by Beejoyi" },
    download: { bn: "PDF নামাও", en: "Download PDF" },
    copy: { bn: "যাচাই লিংক কপি করো", en: "Copy verify link" },
    copied: { bn: "লিংক কপি হয়েছে", en: "Link copied" },
    share: { bn: "ফেসবুকে শেয়ার করো", en: "Share on Facebook" },
    scores: [5, 6, 4, 6],
  },
  processOf: { bn: "কাজের পেছনের ভাবনা", en: "The thinking behind it" },
  processNotes: [
    { bn: "প্রথমে আকাশ ফাঁকা ছিল। মেন্টরের কথায় আলো ডান দিকে সরিয়েছি, এখন চোখ মূল জিনিসে যায়।", en: "The sky was empty at first. After the mentor's tip I moved the light right, so the eye goes to the subject." },
    { bn: "প্রথম চেষ্টায় খুব দ্রুত বলছিলাম। ফিডব্যাক পেয়ে প্রতিটি লাইনের পরে থেমেছি।", en: "I spoke too fast at first. After the feedback I paused after every line." },
    { bn: "তিনবার নতুন করে করেছি। শেষবার রঙ কমিয়ে শুধু গল্পটা রেখেছি।", en: "I redid it three times. The last time I used fewer colours and kept just the story." },
  ],
  timeline: [
    { bn: "রেজিস্ট্রেশন ও জমা শুরু", en: "Registration and entries open" },
    { bn: "জমার শেষ দিন", en: "Last day for entries" },
    { bn: "বিচার", en: "Judging" },
    { bn: "ফলাফল প্রকাশ", en: "Results announced" },
    { bn: "স্কোরকার্ড ও পুরস্কার", en: "Scorecards and prizes" },
  ],
  when: {
    done: { bn: "হয়ে গেছে", en: "Done" },
    now: { bn: "এখন চলছে", en: "Happening now" },
    days: { bn: "দিন পরে", en: "days from now" },
  },
  faq: [
    { q: { bn: "জমা দেওয়ার পরে কি বদলানো যাবে?", en: "Can I change my entry after submitting?" }, a: { bn: "হ্যাঁ, শেষ দিনের আগে পর্যন্ত যতবার খুশি নতুন করে জমা দেওয়া যাবে। শেষেরটাই গণ্য হবে।", en: "Yes, resubmit as often as you like before the deadline. The last one counts." } },
    { q: { bn: "ফি দেওয়ার পরে অংশ না নিলে টাকা ফেরত পাব?", en: "Can I get a refund if I don't take part?" }, a: { bn: "শেষ দিনের ৪৮ ঘণ্টা আগে পর্যন্ত বাতিল করলে পুরো টাকা বিকাশ বা নগদে ফেরত দেওয়া হয়।", en: "Cancel up to 48 hours before the deadline for a full refund to bKash or Nagad." } },
    { q: { bn: "ফলাফল কীভাবে জানব?", en: "How will I hear about results?" }, a: { bn: "এসএমএস আর ইমেইলে জানানো হবে, প্রোফাইলেও দেখা যাবে।", en: "By SMS and email, and on your profile." } },
  ],
  sidebar: {
    joined: { bn: "জন যোগ দিয়েছে", en: "have joined" },
    left: { bn: "বাকি", en: "left" },
    whatsapp: { bn: "হোয়াটসঅ্যাপে পাঠাও", en: "Send on WhatsApp" },
    facebook: { bn: "ফেসবুকে শেয়ার করো", en: "Share on Facebook" },
    copy: { bn: "লিংক কপি করো", en: "Copy link" },
    copied: { bn: "লিংক কপি হয়েছে", en: "Link copied" },
  },
  cta: {
    joinFree: { bn: "ফ্রিতে যোগ দাও", en: "Join for free" },
    joinPaid: { bn: "দিয়ে যোগ দাও", en: "to join" },
    remind: { bn: "শুরু হলে মনে করিয়ে দিও", en: "Remind me when it opens" },
    reminded: { bn: "মনে করিয়ে দেব", en: "We'll remind you" },
    winners: { bn: "বিজয়ী দেখো", en: "See winners" },
  },
  join: {
    title: { bn: "কে যোগ দিচ্ছে?", en: "Who is joining?" },
    sample: { bn: "নমুনা প্রোফাইল", en: "Sample profiles" },
    onlyFor: { bn: "শুধু এদের জন্য:", en: "Only for:" },
    addChild: { bn: "নতুন সন্তান যোগ করো", en: "Add a child" },
    next: { bn: "পরের ধাপ", en: "Continue" },
    confirm: { bn: "যোগ দেওয়া নিশ্চিত করো", en: "Confirm and join" },
    payTitle: { bn: "পেমেন্ট", en: "Payment" },
    payFor: { bn: "এন্ট্রি ফি", en: "Entry fee for" },
    pay: { bn: "দাও", en: "Pay" },
    methods: { bkash: { bn: "বিকাশ", en: "bKash" }, nagad: { bn: "নগদ", en: "Nagad" }, card: { bn: "কার্ড", en: "Card" } },
    mock: { bn: "এটা প্রোটোটাইপ; কোনো টাকা কাটা হবে না।", en: "Prototype only; no money is charged." },
    back: { bn: "পেছনে", en: "Back" },
    doneTitle: { bn: "যোগ দেওয়া হয়েছে!", en: "You're in!" },
    doneBody: { bn: "এখন জমা দেওয়ার পালা। শেষ সময়:", en: "Next, submit your entry. Deadline:" },
    submit: { bn: "জমা দাও", en: "Submit entry" },
    later: { bn: "পরে জমা দেব", en: "I'll submit later" },
    ok: { bn: "ঠিক আছে", en: "Got it" },
    quizBody: { bn: "কুইজ হবে অনলাইনে, এই সময়ে:", en: "The quiz runs online at:" },
    quizSoon: { bn: "সময় এসএমএসে জানিয়ে দেব", en: "We'll text you the time" },
    quizRemind: {
      bn: "১৫ মিনিট আগে এসএমএসে মনে করিয়ে দেব। সময় হলে এই কনটেস্টের পেজ থেকেই শুরু করবে।",
      en: "We'll text you 15 minutes before. Start it from this contest's page.",
    },
    team: {
      cta: { bn: "দল নিয়ে যোগ দাও", en: "Join with your team" },
      title: { bn: "তোমার দল", en: "Your team" },
      name: { bn: "দলের নাম", en: "Team name" },
      school: { bn: "শিক্ষাপ্রতিষ্ঠান", en: "School or college" },
      schoolHint: { bn: "দলের তিনজনই এই প্রতিষ্ঠানের হতে হবে।", en: "All three members must be from here." },
      members: { bn: "সদস্য (৩ জন)", en: "Members (3)" },
      captain: { bn: "দলনেতা (তুমি)", en: "Captain (you)" },
      member: { bn: "সদস্য", en: "Member" },
      memberName: { bn: "নাম", en: "Name" },
      phone: { bn: "মোবাইল নম্বর", en: "Mobile number" },
      captainPhone: { bn: "তোমার অ্যাকাউন্টের নম্বরে এসএমএস যাবে।", en: "We'll text the number on your account." },
      errName: { bn: "দলের নাম লেখো", en: "Add a team name" },
      errSchool: { bn: "প্রতিষ্ঠানের নাম লেখো", en: "Add the school or college" },
      errMember: { bn: "নাম লেখো", en: "Add a name" },
      errPhone: { bn: "০১ দিয়ে শুরু ১১ সংখ্যার নম্বর দাও", en: "Use an 11-digit number starting with 01" },
      register: { bn: "দল নিবন্ধন করো", en: "Register team" },
      doneBody: {
        bn: "বিষয় আর সময়সূচি দলের তিনজনের ফোনেই এসএমএসে যাবে।",
        en: "The motion and schedule will be texted to all three members.",
      },
    },
    step: { bn: "ধাপ", en: "Step" },
    of: { bn: "এর", en: "of" },
  },
  winnersList: [
    { place: { bn: "প্রথম", en: "1st" }, name: { bn: "সাদিয়া রহমান", en: "Sadia Rahman" }, cls: { bn: "৯ম শ্রেণি", en: "Class 9" }, score: 94 },
    { place: { bn: "দ্বিতীয়", en: "2nd" }, name: { bn: "আবদুল্লাহ আল মাহমুদ", en: "Abdullah Al Mahmud" }, cls: { bn: "এইচএসসি", en: "HSC" }, score: 91 },
    { place: { bn: "তৃতীয়", en: "3rd" }, name: { bn: "মিথিলা দাস", en: "Mithila Das" }, cls: { bn: "৮ম শ্রেণি", en: "Class 8" }, score: 89 },
  ],
  winnersNote: { bn: "নমুনা ফলাফল", en: "Sample results" },
  /** Length of each winner's recording, in seconds (video and audio contests). */
  recordingSecs: [134, 108, 122],
  /** Quiz: time each winner took; it breaks ties. */
  quizSecs: [742, 815, 798],
  quizTime: { bn: "সময়", en: "Time" },
  /** Debate: the whole team wins. */
  winnerTeams: [
    {
      place: { bn: "প্রথম", en: "1st" },
      team: { bn: "দল সূর্যোদয়", en: "Team Surjodoy" },
      school: { bn: "নবীনগর হাই স্কুল (নমুনা)", en: "Nabinagar High School (sample)" },
      members: [
        { bn: "সাদিয়া", en: "Sadia" },
        { bn: "রাকিব", en: "Rakib" },
        { bn: "নুসরাত", en: "Nusrat" },
      ],
      score: 92,
    },
    {
      place: { bn: "দ্বিতীয়", en: "2nd" },
      team: { bn: "দল নদী", en: "Team Nodi" },
      school: { bn: "রূপনগর মডেল কলেজ (নমুনা)", en: "Rupnagar Model College (sample)" },
      members: [
        { bn: "তানভীর", en: "Tanvir" },
        { bn: "মিম", en: "Mim" },
        { bn: "আরিফ", en: "Arif" },
      ],
      score: 88,
    },
    {
      place: { bn: "তৃতীয়", en: "3rd" },
      team: { bn: "দল আলো", en: "Team Alo" },
      school: { bn: "চরপাড়া বালিকা বিদ্যালয় (নমুনা)", en: "Charpara Girls' School (sample)" },
      members: [
        { bn: "মিথিলা", en: "Mithila" },
        { bn: "রিয়া", en: "Riya" },
        { bn: "জারা", en: "Zara" },
      ],
      score: 85,
    },
  ],
  teamOf: { bn: "দলের সদস্য", en: "Team members" },
  entry: {
    mediaNote: {
      bn: "নমুনা ফলাফল। ছবি, অডিও আর ভিডিও উদাহরণ মাত্র।",
      en: "Sample results. Photos, audio and video are placeholders.",
    },
    play: { bn: "চালাও", en: "Play" },
    pause: { bn: "থামাও", en: "Pause" },
    enlarge: { bn: "বড় করে দেখো", en: "View larger" },
    close: { bn: "বন্ধ করো", en: "Close" },
    photoOf: { bn: "-এর ছবি", en: "'s photo" },
    drawingOf: { bn: "-এর আঁকা", en: "'s drawing" },
    videoOf: { bn: "-এর ভিডিও", en: "'s video" },
    audioOf: { bn: "-এর অডিও", en: "'s audio" },
  },
  similar: { bn: "এরকম আরো কনটেস্ট", en: "Similar contests" },
} as const;

/* ---------- Entry submission ---------- */

export type UploadKind = "image" | "media" | "text" | "project" | "none";

export const uploadRules: Record<Format, { kind: UploadKind; accept: string; maxMB: number; maxFiles: number }> = {
  quiz: { kind: "none", accept: "", maxMB: 0, maxFiles: 0 },
  photo: { kind: "image", accept: "image/jpeg,image/png", maxMB: 15, maxFiles: 3 },
  video: { kind: "media", accept: "video/mp4,video/*", maxMB: 200, maxFiles: 1 },
  audio: { kind: "media", accept: "audio/mpeg,audio/mp4,audio/*", maxMB: 50, maxFiles: 1 },
  debate: { kind: "none", accept: "", maxMB: 0, maxFiles: 0 },
};

export const WORDS = { min: 300, max: 800 };
/** Round 2 and finale reflection log, in characters (blueprint: deters AI copy-paste). */
export const REFLECT = { min: 150, max: 300 };

export const submit = {
  title: { bn: "জমা দাও", en: "Submit your entry" },
  back: { bn: "কনটেস্টে ফিরে যাও", en: "Back to contest" },
  notOpenTitle: { bn: "এই কনটেস্টে এখন জমা নেওয়া হচ্ছে না", en: "This contest isn't taking entries right now" },
  steps: {
    who: { bn: "কার জমা?", en: "Whose entry?" },
    work: { bn: "তোমার কাজ", en: "Your work" },
    check: { bn: "শেষবার দেখে নাও", en: "Final check" },
  },
  whoNote: { bn: "যোগ দেওয়ার সময় যাকে বেছেছিলে (নমুনা)", en: "Chosen when you joined (sample)" },
  camera: { bn: "ছবি তোলো", en: "Take a photo" },
  gallery: { bn: "গ্যালারি থেকে দাও", en: "Choose from gallery" },
  video: { bn: "ভিডিও দাও", en: "Add a video" },
  audio: { bn: "অডিও দাও", en: "Add an audio" },
  pdf: { bn: "PDF দাও", en: "Add a PDF" },
  addMore: { bn: "আরো একটা যোগ করো", en: "Add another" },
  allowed: { bn: "যা দেওয়া যাবে:", en: "Allowed:" },
  replace: { bn: "বদলাও", en: "Replace" },
  remove: { bn: "সরাও", en: "Remove" },
  uploading: { bn: "আপলোড হচ্ছে", en: "Uploading" },
  uploaded: { bn: "আপলোড হয়েছে", en: "Uploaded" },
  retry: { bn: "আবার চেষ্টা করো", en: "Try again" },
  failed: { bn: "আপলোড থেমে গেছে। ইন্টারনেট ঠিক হলে আবার চেষ্টা করো; বাকি সব সেভ আছে।", en: "The upload stopped. Try again when you're back online; everything else is saved." },
  tooBig: { bn: "ফাইলটা {size} MB, সর্বোচ্চ {max} MB দেওয়া যাবে। ফোনের ক্যামেরায় ছবির সাইজ ছোট করে আবার তোলো।", en: "This file is {size} MB; the limit is {max} MB. Lower the photo size in your camera settings and try again." },
  wrongType: { bn: "এই ধরনের ফাইল চলবে না। দিতে পারো: {types}", en: "That file type isn't accepted. You can use: {types}" },
  tooMany: { bn: "সর্বোচ্চ {max}টি ফাইল দেওয়া যাবে।", en: "You can add up to {max} files." },
  writeMode: { bn: "এখানে লেখো", en: "Type it here" },
  uploadMode: { bn: "ছবি বা PDF দাও", en: "Upload a photo or PDF" },
  writePh: { bn: "তোমার লেখা এখানে শুরু করো…", en: "Start writing here…" },
  words: { bn: "শব্দ", en: "words" },
  wordRange: { bn: "৩০০–৮০০ শব্দের মধ্যে রাখো", en: "Keep it between 300 and 800 words" },
  learn: {
    title: { bn: "৩ মিনিটে শিখে নাও", en: "Learn it in 3 minutes" },
    sub: { bn: "শুরুর আগে ছোট্ট কিছু টিপস। যেভাবে সুবিধা, সেভাবে নাও।", en: "A few quick tips before you start. Take them however suits you." },
    read: { bn: "পড়ে নাও", en: "Read" },
    watch: { bn: "ভিডিও দেখো", en: "Watch" },
    watchSize: { bn: "ডেটা সেভার · ৪ MB", en: "Data saver · 4 MB" },
    listen: { bn: "শোনো", en: "Listen" },
    listenSize: { bn: "১ MB", en: "1 MB" },
    mediaNote: { bn: "নমুনা: মেন্টরের আসল ভিডিও আর অডিও পরে যোগ হবে। লেখা টিপস সবসময় নিচে থাকবে।", en: "Sample: the mentor's real video and audio come later. The written tips are always below." },
    done: { bn: "বুঝেছি, শুরু করি", en: "Got it, let's start" },
    doneState: { bn: "শেখা হয়ে গেছে", en: "Learning done" },
    again: { bn: "আবার দেখো", en: "See again" },
    examples: { bn: "আগের বিজয়ীদের কাজ দেখো", en: "See past winning entries" },
    locked: { bn: "শেখার কার্ড শেষ হলে এখানে কাজ দিতে পারবে।", en: "You can add your work here after the learning card." },
  },
  rubricPeek: { bn: "বিচারকরা যা দেখবেন (প্রতিটি ১–৭)", en: "What the judges look for (each 1–7)" },
  compressed: { bn: "ফোনেই ছোট করা হয়েছে: {from} থেকে {to}। ডেটা বাঁচল।", en: "Shrunk on your phone from {from} to {to}. Data saved." },
  resumable: { bn: "নেট কেটে গেলে যেখানে থেমেছিল, সেখান থেকেই আবার চলবে।", en: "If the internet drops, the upload carries on from where it stopped." },
  process: {
    title: { bn: "কাজের পেছনের গল্প", en: "The story behind your work" },
    sub: { bn: "তিনটা ছোট প্রশ্ন। বিচারকরা ভাবনাটাও দেখেন, শুধু ফলাফল নয়।", en: "Three short questions. Judges look at your thinking, not just the result." },
    kidNote: { bn: "ছোটরা মুখে বলুক, বাবা-মা লিখে দিন।", en: "Little ones can say it out loud while a parent types." },
    prompts: [
      { q: { bn: "কী দেখে বা ভেবে শুরু করলে?", en: "What did you notice or think of first?" }, ph: { bn: "যেমন: আমাদের গ্রামের নদীটা খুব সুন্দর…", en: "e.g. The river in our village is beautiful…" } },
      { q: { bn: "কী চেষ্টা করলে বা খুঁজে দেখলে?", en: "What did you try or find out?" }, ph: { bn: "যেমন: দুইজন শিক্ষক আর পাঁচজন বন্ধুকে জিজ্ঞেস করেছি…", en: "e.g. I asked two teachers and five friends…" } },
      { q: { bn: "কী বদলালে, আর কেন?", en: "What did you change, and why?" }, ph: { bn: "যেমন: প্রথম ছবিটা অন্ধকার ছিল, তাই জানালার পাশে আবার তুলেছি…", en: "e.g. The first photo was dark, so I reshot it by the window…" } },
    ],
    reflectLabel: { bn: "রাউন্ড {prev}-এর কোন ফিডব্যাক কাজে লাগালে?", en: "Which round {prev} feedback did you use?" },
    reflectPh: { bn: "যেমন: বিচারক বলেছিলেন শেষটা তাড়াহুড়ো; এবার প্রতিটি লাইনের পরে থেমেছি…", en: "e.g. The judge said my ending was rushed, so I paused after every line…" },
    reflectNote: { bn: "১৫০–৩০০ অক্ষর। নিজের ভাষায় লেখো; এটা কপি-পেস্টের জায়গা নয়।", en: "150–300 characters. Use your own words; this isn't for copy-paste." },
    chars: { bn: "অক্ষর", en: "characters" },
  },
  nextRound: { bn: "রাউন্ড {now}-এর ১–৭ নম্বর আর মন্তব্য পাবে জমার শেষ দিনের ৫ দিন পরে। তারপর পরের রাউন্ডে আরো ভালো করার সুযোগ।", en: "Your round {now} scores (1–7) and comments arrive 5 days after the deadline. Then you get to improve in the next round." },
  feedbackSoon: { bn: "ফলাফলের সাথে পাবে স্কিল স্কোরকার্ড: প্রতিটি দিকে ১–৭ নম্বর আর বিচারকের মন্তব্য।", en: "With the results you'll get a Skill Scorecard: a 1–7 score on each criterion and the judges' comments." },
  caption: { bn: "শিরোনাম বা ক্যাপশন", en: "Title or caption" },
  captionPh: { bn: "যেমন: আমাদের গ্রামের নদী", en: "e.g. The river in our village" },
  optional: { bn: "ঐচ্ছিক", en: "optional" },
  checks: {
    own: { bn: "এটা {name}-র নিজের কাজ; কপি বা এআই দিয়ে বানানো নয়", en: "This is {name}'s own work, not copied or made with AI" },
    rules: { bn: "কনটেস্টের নিয়ম পড়েছি", en: "I've read the contest rules" },
    consent: { bn: "অভিভাবক হিসেবে অনুমতি দিচ্ছি: ভালো হলে কাজটি বিজয়ীর শোকেসে নাম ও শ্রেণিসহ দেখানো যাবে", en: "As a parent, I allow this work to appear in the Beejoyi showcase with first name and class if selected" },
    consentNote: { bn: "না দিলেও বিচারে কোনো প্রভাব পড়বে না।", en: "Saying no does not affect judging." },
  },
  readRules: { bn: "নিয়ম দেখো", en: "View rules" },
  noProfile: { bn: "এই কনটেস্টের বয়সের ({ages}) কোনো প্রোফাইল তোমার অ্যাকাউন্টে নেই।", en: "Your account has no profile in this contest's age group ({ages})." },
  addProfile: { bn: "নতুন প্রোফাইল যোগ করো", en: "Add a profile" },
  needs: {
    profile: { bn: "আগে একটা প্রোফাইল যোগ করো", en: "Add a profile first" },
    file: { bn: "আগে ফাইল দাও", en: "Add your file first" },
    words: { bn: "লেখা ৩০০–৮০০ শব্দের মধ্যে রাখো", en: "Keep your writing to 300–800 words" },
    wait: { bn: "আপলোড শেষ হওয়া পর্যন্ত অপেক্ষা করো", en: "Wait for the upload to finish" },
    checks: { bn: "নিচের দুটো ঘরে টিক দাও", en: "Tick the two required boxes" },
    learn: { bn: "আগে ৩ মিনিটের শেখার কার্ডটা শেষ করো", en: "Finish the 3-minute learning card first" },
    reflect: { bn: "ফিডব্যাক নিয়ে ১৫০–৩০০ অক্ষর লেখো", en: "Write 150–300 characters about the feedback you used" },
  },
  ready: { bn: "সব ঠিক আছে, জমা দিতে পারো", en: "All set, ready to submit" },
  submitBtn: { bn: "জমা দাও", en: "Submit entry" },
  sending: { bn: "জমা হচ্ছে…", en: "Submitting…" },
  draftSaved: { bn: "খসড়া সেভ হয়েছে", en: "Draft saved" },
  offline: { bn: "ইন্টারনেট নেই। লেখা ও টিক সেভ থাকছে; ফাইল আপলোড হবে নেট ফিরলে।", en: "You're offline. Text and ticks are saved; files upload when you're back online." },
  draftFilesNote: { bn: "পেজ বন্ধ করলে ফাইল আবার দিতে হবে; লেখা থেকে যাবে।", en: "If you close the page you'll need to add the file again; your text stays." },
  doneTitle: { bn: "জমা হয়েছে!", en: "Entry received!" },
  doneBody: { bn: "বিচারকরা ফলাফলের আগে এটাই দেখবেন। শেষ সময়ের আগে যতবার খুশি বদলাতে পারবে।", en: "This is what the judges will see. You can replace it as often as you like before the deadline." },
  receipt: { bn: "রসিদ নম্বর", en: "Receipt no." },
  sms: { bn: "নিশ্চিতকরণ এসএমএসে পাঠানো হয়েছে (নমুনা)", en: "Confirmation sent by SMS (sample)" },
  replaceEntry: { bn: "জমা বদলাও", en: "Replace entry" },
  more: { bn: "আরো কনটেস্ট দেখো", en: "Find more contests" },
  noUpload: {
    quiz: {
      title: { bn: "এই কনটেস্টে কিছু আপলোড করতে হবে না", en: "Nothing to upload for this contest" },
      body: { bn: "কুইজ হবে অনলাইনে, নির্ধারিত সময়ে। সময়টা এসএমএসে জানিয়ে দেব; তখন এখান থেকেই শুরু করবে।", en: "The quiz runs online at a set time. We'll text you the time, and you'll start it from here." },
    },
    debate: {
      title: { bn: "এই কনটেস্টে কিছু আপলোড করতে হবে না", en: "Nothing to upload for this contest" },
      body: { bn: "বিতর্ক হবে লাইভ অনলাইন রাউন্ডে। বিষয় আর সময়সূচি দলের সবার ফোনে এসএমএসে যাবে।", en: "Debates happen in live online rounds. The motion and schedule go to every team member by SMS." },
    },
  },
} as const;
