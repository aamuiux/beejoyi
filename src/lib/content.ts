export type Lang = "bn" | "en";
export type L = Record<Lang, string>;

export type AgeKey = "pre" | "p1" | "p6" | "ssc" | "uni";
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
  { key: "uni", label: { bn: "বিশ্ববিদ্যালয়", en: "University" }, hint: { bn: "স্নাতক", en: "Undergrad" } },
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

export type ContestStatus = "open" | "upcoming" | "ended";
export const statusOf = (c: { status?: ContestStatus }): ContestStatus => c.status ?? "open";

export type Contest = {
  id: string;
  title: L;
  org: L;
  orgInitial: string;
  cat: Exclude<CatKey, "all">;
  ages: AgeKey[];
  fee: number; // 0 = free, in BDT
  prize: L;
  joined: number;
  daysLeft: number;
  /** open (default) = taking entries; upcoming = not started yet; ended = results out */
  status?: ContestStatus;
  /** for upcoming contests: days until entries open */
  startsIn?: number;
  beginner?: boolean;
  poster: { bg: string; ink: string; shape: "sun" | "wave" | "leaf" | "atom" | "mic" | "pen" | "ball" };
};

// Sample data for the prototype. Replace with live contests from the API.
export const contests: Contest[] = [
  {
    id: "c1",
    title: { bn: "শিশু চিত্রাঙ্কন: আমার প্রিয় গ্রাম", en: "Kids' drawing: My favourite village" },
    org: { bn: "বিজয়ী আর্ট ক্লাব", en: "Beejoyi Art Club" },
    orgInitial: "বি",
    cat: "art",
    ages: ["pre", "p1"],
    fee: 0,
    prize: { bn: "সার্টিফিকেট + আর্ট কিট", en: "Certificate + art kit" },
    joined: 1284,
    daysLeft: 2,
    beginner: true,
    poster: { bg: "#FFC329", ink: "#1E1E2E", shape: "sun" },
  },
  {
    id: "c2",
    title: { bn: "বিজয় দিবস আবৃত্তি প্রতিযোগিতা", en: "Victory Day recitation contest" },
    org: { bn: "সবুজপাতা স্কুল (নমুনা)", en: "Sabujpata School (sample)" },
    orgInitial: "স",
    cat: "speech",
    ages: ["p1", "p6"],
    fee: 50,
    prize: { bn: "৳৫,০০০ পুরস্কার", en: "৳5,000 in prizes" },
    joined: 642,
    daysLeft: 1,
    poster: { bg: "#C8133F", ink: "#FFFFFF", shape: "mic" },
  },
  {
    id: "c3",
    title: { bn: "জুনিয়র সায়েন্স কুইজ", en: "Junior science quiz" },
    org: { bn: "বিজ্ঞান বন্ধু ক্লাব (নমুনা)", en: "Science Friends Club (sample)" },
    orgInitial: "বি",
    cat: "sci",
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
    title: { bn: "গল্প লেখা: একদিন বৃষ্টিতে", en: "Story writing: One rainy day" },
    org: { bn: "কিশোর কলম (নমুনা)", en: "Kishor Kolom (sample)" },
    orgInitial: "ক",
    cat: "writing",
    ages: ["p6", "ssc"],
    fee: 30,
    prize: { bn: "বই উপহার + প্রকাশের সুযোগ", en: "Book prize + get published" },
    joined: 488,
    daysLeft: 6,
    poster: { bg: "#E8F2EC", ink: "#1F5A3E", shape: "pen" },
  },
  {
    id: "c5",
    title: { bn: "ক্যাম্পাস স্টার্টআপ আইডিয়া চ্যালেঞ্জ", en: "Campus startup idea challenge" },
    org: { bn: "ইউনি ইনোভেশন হাব (নমুনা)", en: "Uni Innovation Hub (sample)" },
    orgInitial: "ই",
    cat: "sci",
    ages: ["uni", "ssc"],
    fee: 200,
    prize: { bn: "৳৫০,০০০ + মেন্টরশিপ", en: "৳50,000 + mentorship" },
    joined: 316,
    daysLeft: 9,
    poster: { bg: "#1E1E2E", ink: "#FFC329", shape: "wave" },
  },
  {
    id: "c6",
    title: { bn: "প্রকৃতির ছবি: পাখি ও ফুল", en: "Nature photo: Birds and flowers" },
    org: { bn: "সবুজ বাংলা ফটো ক্লাব (নমুনা)", en: "Green Bangla Photo Club (sample)" },
    orgInitial: "স",
    cat: "nature",
    ages: ["p6", "ssc", "uni"],
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
    title: { bn: "আন্তঃস্কুল দাবা টুর্নামেন্ট", en: "Inter-school chess tournament" },
    org: { bn: "ঢাকা দাবা একাডেমি (নমুনা)", en: "Dhaka Chess Academy (sample)" },
    orgInitial: "ঢা",
    cat: "sports",
    ages: ["p1", "p6", "ssc"],
    fee: 100,
    prize: { bn: "৳১০,০০০ + ট্রফি", en: "৳10,000 + trophy" },
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
    title: { bn: "প্রথম বিতর্ক: অনলাইন রাউন্ড", en: "First debate: online round" },
    org: { bn: "ইউনি ইনোভেশন হাব (নমুনা)", en: "Uni Innovation Hub (sample)" },
    orgInitial: "ই",
    cat: "speech",
    ages: ["ssc", "uni"],
    fee: 0,
    prize: { bn: "সার্টিফিকেট + মেন্টর সেশন", en: "Certificate + mentor session" },
    joined: 412,
    daysLeft: 14,
    beginner: true,
    poster: { bg: "#FFC329", ink: "#1E1E2E", shape: "mic" },
  },
  {
    id: "c12",
    title: { bn: "শীতের ছবি আঁকো", en: "Paint the winter" },
    org: { bn: "বিজয়ী আর্ট ক্লাব", en: "Beejoyi Art Club" },
    orgInitial: "বি",
    cat: "art",
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
    title: { bn: "রোবোটিক্স চ্যালেঞ্জ: স্মার্ট শহর", en: "Robotics challenge: Smart city" },
    org: { bn: "বিজ্ঞান বন্ধু ক্লাব (নমুনা)", en: "Science Friends Club (sample)" },
    orgInitial: "বি",
    cat: "sci",
    ages: ["p6", "ssc", "uni"],
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
    title: { bn: "মাতৃভাষা দিবস রচনা প্রতিযোগিতা", en: "Mother Language Day essay contest" },
    org: { bn: "কিশোর কলম (নমুনা)", en: "Kishor Kolom (sample)" },
    orgInitial: "ক",
    cat: "writing",
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
    ages: ["ssc", "uni"],
    fee: 50,
    prize: { bn: "৳১৫,০০০ পুরস্কার", en: "৳15,000 in prizes" },
    joined: 1488,
    daysLeft: 0,
    status: "ended",
    poster: { bg: "#D9F0E2", ink: "#1F5A3E", shape: "leaf" },
  },
];

/** Search across Bangla and English titles and subject names (Postel's law). */
export function matchesQuery(c: Contest, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const cat = cats.find((x) => x.key === c.cat)!.label;
  return [c.title.bn, c.title.en, c.org.bn, c.org.en, cat.bn, cat.en].some((s) => s.toLowerCase().includes(q));
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
      bn: ["আঁকো", "লেখো", "বলো", "কোড করো", "খেলো"],
      en: ["Draw", "Write", "Speak", "Code", "Play"],
    },
    line2: { bn: "জিতে নাও সার্টিফিকেট আর পুরস্কার", en: "and win certificates and prizes" },
    sub: {
      bn: "প্রি-স্কুল থেকে বিশ্ববিদ্যালয়: বাংলাদেশের শিক্ষার্থীদের জন্য কনটেস্ট আর গেম, এক জায়গায়।",
      en: "From preschool to university: contests and games for every student in Bangladesh, in one place.",
    },
    searchPh: { bn: "আঁকা, কুইজ, আবৃত্তি… খুঁজে দেখো", en: "Search drawing, quiz, recitation…" },
    searchBtn: { bn: "কনটেস্ট খোঁজো", en: "Find contests" },
    play: { bn: "এখনই খেলো, সাইন-আপ লাগবে না", en: "Play now, no sign-up needed" },
    iam: { bn: "কার জন্য খুঁজছেন?", en: "Who is it for?" },
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
    title: { bn: "কীভাবে কাজ করে", en: "How it works" },
    steps: [
      { t: { bn: "যোগ দাও", en: "Join" }, d: { bn: "ফ্রি অ্যাকাউন্ট খোলো। ছোটদের প্রোফাইল চালাবেন বাবা-মা।", en: "Create a free account. Parents manage profiles for younger children." } },
      { t: { bn: "জমা দাও", en: "Submit" }, d: { bn: "ছবি, লেখা, ভিডিও বা অডিও, ফোন থেকেই আপলোড করো।", en: "Upload a drawing, essay, video or audio straight from your phone." } },
      { t: { bn: "সার্টিফিকেট নাও", en: "Get your certificate" }, d: { bn: "বিচারকরা নম্বর দেবেন। সার্টিফিকেট আর পুরস্কার থাকবে তোমার প্রোফাইলে, সবসময়।", en: "Judges score your entry. Certificates and prizes stay on your profile for good." } },
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
    title: { bn: "বিজয়ীদের কাজ", en: "Winning entries" },
    sub: { bn: "আগের কনটেস্টের সেরা কাজগুলো। (নমুনা; আসল কাজ অভিভাবকের অনুমতি নিয়ে দেখানো হবে)", en: "Top entries from past contests. (Samples; real work shown with parent consent)" },
    items: [
      { who: { bn: "আয়েশা, ২য় শ্রেণি", en: "Ayesha, Class 2" }, what: { bn: "চিত্রাঙ্কন: আমার প্রিয় গ্রাম", en: "Drawing: My favourite village" }, place: { bn: "প্রথম", en: "1st" } },
      { who: { bn: "সামির, ৭ম শ্রেণি", en: "Samir, Class 7" }, what: { bn: "বিজ্ঞান মেলা: সৌর পাম্প", en: "Science fair: Solar pump" }, place: { bn: "প্রথম", en: "1st" } },
      { who: { bn: "ঋতু, এইচএসসি", en: "Ritu, HSC" }, what: { bn: "গল্প: নদীর ওপারে", en: "Story: Across the river" }, place: { bn: "দ্বিতীয়", en: "2nd" } },
      { who: { bn: "তাহমিদ, প্রি-স্কুল", en: "Tahmid, Preschool" }, what: { bn: "রঙ করো: সূর্যমুখী", en: "Colouring: Sunflower" }, place: { bn: "বিশেষ পুরস্কার", en: "Special mention" } },
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
        { bn: "নিয়ম, বিচার ও সার্টিফিকেটের তৈরি টেমপ্লেট", en: "Ready templates for rules, judging and certificates" },
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
        { bn: "অংশগ্রহণের আসল সংখ্যা ও সিএসআর রিপোর্ট", en: "Real participation numbers and a CSR impact report" },
      ],
      cta: { bn: "পার্টনার হোন", en: "Become a partner" },
    },
  },
  faq: {
    title: { bn: "প্রায়ই জিজ্ঞেস করা প্রশ্ন", en: "Common questions" },
    items: [
      { q: { bn: "বিজয়ীতে যোগ দিতে কি টাকা লাগে?", en: "Does it cost anything to join?" }, a: { bn: "অ্যাকাউন্ট খোলা আর গেম খেলা সম্পূর্ণ ফ্রি। বেশিরভাগ কনটেস্ট ফ্রি; কিছু কনটেস্টে ছোট এন্ট্রি ফি থাকে, যা কার্ডেই লেখা থাকে।", en: "Creating an account and playing games is free. Most contests are free; some have a small entry fee, shown on the contest card." } },
      { q: { bn: "কোন বয়সের শিক্ষার্থীরা অংশ নিতে পারে?", en: "What ages can take part?" }, a: { bn: "৩ বছর থেকে বিশ্ববিদ্যালয় পর্যন্ত। প্রতিটি কনটেস্টে বয়স বা শ্রেণি লেখা থাকে।", en: "From age 3 up to university. Every contest shows which ages or classes it is for." } },
      { q: { bn: "আমার সন্তানের তথ্য কি নিরাপদ?", en: "Is my child's information safe?" }, a: { bn: "হ্যাঁ। ছোটদের প্রোফাইল বাবা-মা চালান, আর যোগাযোগের তথ্য কখনো প্রকাশ্যে দেখানো হয় না।", en: "Yes. Parents manage younger children's profiles, and contact details are never shown publicly." } },
      { q: { bn: "বিজয়ী কীভাবে ঠিক হয়?", en: "How are winners chosen?" }, a: { bn: "প্রতিটি কনটেস্টের নিজস্ব নম্বর দেওয়ার নিয়ম (রুব্রিক) থাকে। বিচারকরা সেই অনুযায়ী নম্বর দেন, কিছু কনটেস্টে ভোটও যোগ হয়।", en: "Each contest has its own scoring guide (rubric). Judges score against it, and some contests add public votes." } },
      { q: { bn: "সার্টিফিকেট কোথায় পাব?", en: "Where do I get my certificate?" }, a: { bn: "ফলাফল প্রকাশের পর প্রোফাইল থেকে ডাউনলোড করুন। লিংক দিয়ে যে কেউ সার্টিফিকেট যাচাই করতে পারবে।", en: "Download it from your profile once results are out. Anyone can verify it with its link." } },
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
  rubric: { name: L; weight: number }[];
};

// Per-subject defaults. Organisers will be able to edit these in the Studio.
export const subjectGuides: Record<Exclude<CatKey, "all">, SubjectGuide> = {
  art: {
    overview: {
      bn: "নিজের হাতে আঁকো, রঙ করো, তারপর ছবি তুলে জমা দাও। কাগজ, রঙ, পেনসিল, যা খুশি ব্যবহার করতে পারো।",
      en: "Draw and colour by hand, then take a photo and submit it. Use any paper, paint or pencils you like.",
    },
    format: { bn: "আঁকার ছবি: JPG বা PNG, সর্বোচ্চ ১০ MB", en: "Photo of the artwork: JPG or PNG, up to 10 MB" },
    steps: [
      { bn: "বিষয় অনুযায়ী ছবি আঁকো", en: "Draw on the given theme" },
      { bn: "ভালো আলোতে সোজা করে ছবি তোলো", en: "Photograph it straight, in good light" },
      { bn: "প্রোফাইল থেকে আপলোড করো", en: "Upload it from your profile" },
    ],
    rules: [
      { bn: "ছবি নিজের আঁকা হতে হবে; বড়রা আঁকায় সাহায্য করতে পারবে না", en: "The artwork must be the child's own; adults may not help draw" },
      { bn: "একজন একটি ছবিই জমা দিতে পারবে", en: "One entry per participant" },
      { bn: "ডিজিটাল আঁকা বা এআই দিয়ে বানানো ছবি গ্রহণযোগ্য নয়", en: "Digital or AI-generated images are not accepted" },
    ],
    rubric: [
      { name: { bn: "সৃজনশীলতা", en: "Creativity" }, weight: 40 },
      { name: { bn: "বিষয়ের সাথে মিল", en: "Fits the theme" }, weight: 30 },
      { name: { bn: "রঙের ব্যবহার", en: "Use of colour" }, weight: 20 },
      { name: { bn: "পরিচ্ছন্নতা", en: "Neatness" }, weight: 10 },
    ],
  },
  speech: {
    overview: {
      bn: "আবৃত্তি বা বক্তৃতার ভিডিও বা অডিও রেকর্ড করে জমা দাও। ফোনে রেকর্ড করলেই হবে।",
      en: "Record a video or audio of your recitation or speech and submit it. A phone recording is fine.",
    },
    format: { bn: "ভিডিও (MP4) বা অডিও (MP3), সর্বোচ্চ ৩ মিনিট", en: "Video (MP4) or audio (MP3), up to 3 minutes" },
    steps: [
      { bn: "কবিতা বা বিষয় বেছে নাও", en: "Choose your poem or topic" },
      { bn: "শান্ত জায়গায় রেকর্ড করো", en: "Record somewhere quiet" },
      { bn: "প্রোফাইল থেকে আপলোড করো", en: "Upload it from your profile" },
    ],
    rules: [
      { bn: "রেকর্ডিং এডিট করা যাবে না, এক টানে হতে হবে", en: "One continuous take, no editing" },
      { bn: "সময়সীমা ৩ মিনিট; বেশি হলে নম্বর কাটা যাবে", en: "3-minute limit; longer entries lose marks" },
      { bn: "ব্যাকগ্রাউন্ড মিউজিক ব্যবহার করা যাবে না", en: "No background music" },
    ],
    rubric: [
      { name: { bn: "উচ্চারণ", en: "Pronunciation" }, weight: 35 },
      { name: { bn: "ভাব ও আবেগ", en: "Expression" }, weight: 35 },
      { name: { bn: "সাবলীলতা", en: "Fluency" }, weight: 20 },
      { name: { bn: "সময় মেনে চলা", en: "Timing" }, weight: 10 },
    ],
  },
  writing: {
    overview: {
      bn: "দেওয়া বিষয়ে নিজের ভাষায় লেখো। হাতে লিখে ছবি তুলতে পারো, বা টাইপ করে জমা দিতে পারো।",
      en: "Write on the given theme in your own words. Handwrite and photograph it, or type it.",
    },
    format: { bn: "টাইপ করা লেখা বা PDF, অথবা হাতের লেখার ছবি; ৩০০–৮০০ শব্দ", en: "Typed text or PDF, or a photo of handwriting; 300–800 words" },
    steps: [
      { bn: "বিষয়টা ভালো করে পড়ো", en: "Read the theme carefully" },
      { bn: "লেখো, তারপর একবার পড়ে ঠিক করো", en: "Write, then read it through once to fix it" },
      { bn: "প্রোফাইল থেকে জমা দাও", en: "Submit from your profile" },
    ],
    rules: [
      { bn: "লেখা মৌলিক হতে হবে; কপি বা এআই দিয়ে লেখা বাতিল হবে", en: "Original work only; copied or AI-written entries are disqualified" },
      { bn: "বাংলা বা ইংরেজি, যেকোনো একটিতে লেখা যাবে", en: "Write in Bangla or English" },
      { bn: "শব্দসীমা মানতে হবে", en: "Stay within the word limit" },
    ],
    rubric: [
      { name: { bn: "ভাবনা ও মৌলিকতা", en: "Ideas & originality" }, weight: 40 },
      { name: { bn: "ভাষা ও বানান", en: "Language & spelling" }, weight: 30 },
      { name: { bn: "গঠন", en: "Structure" }, weight: 20 },
      { name: { bn: "বিষয়ের সাথে মিল", en: "Fits the theme" }, weight: 10 },
    ],
  },
  sci: {
    overview: {
      bn: "অনলাইনে নির্দিষ্ট সময়ে কুইজ দাও বা প্রজেক্ট জমা দাও। প্রশ্ন তোমার শ্রেণির পাঠ্যক্রম থেকেই।",
      en: "Take the timed online round or submit your project. Questions follow your class syllabus.",
    },
    format: { bn: "অনলাইন কুইজ (৩০ মিনিট) বা প্রজেক্ট PDF + ২ মিনিটের ভিডিও", en: "Online quiz (30 minutes) or project PDF + 2-minute video" },
    steps: [
      { bn: "রেজিস্ট্রেশন করো", en: "Register" },
      { bn: "নির্ধারিত সময়ে লগ ইন করো", en: "Log in at the scheduled time" },
      { bn: "উত্তর দাও বা প্রজেক্ট আপলোড করো", en: "Answer the quiz or upload your project" },
    ],
    rules: [
      { bn: "কুইজ একবারই দেওয়া যাবে", en: "The quiz can be taken once" },
      { bn: "ক্যালকুলেটর চলবে, ইন্টারনেট সার্চ নয়", en: "Calculators allowed, web search is not" },
      { bn: "দলগত প্রজেক্টে সর্বোচ্চ ৩ জন", en: "Team projects: up to 3 members" },
    ],
    rubric: [
      { name: { bn: "সঠিক উত্তর ও ধারণা", en: "Accuracy & concepts" }, weight: 50 },
      { name: { bn: "সমস্যা সমাধান", en: "Problem solving" }, weight: 30 },
      { name: { bn: "উপস্থাপনা", en: "Presentation" }, weight: 20 },
    ],
  },
  nature: {
    overview: {
      bn: "প্রকৃতির ছবি তোলো, ফোন বা ক্যামেরা যা আছে তা দিয়েই। ছবির সাথে এক লাইনে লেখো কোথায় তুলেছ।",
      en: "Photograph nature with whatever you have, phone or camera. Add one line saying where you took it.",
    },
    format: { bn: "ছবি: JPG, সর্বোচ্চ ১৫ MB, সাথে এক লাইনের ক্যাপশন", en: "Photo: JPG up to 15 MB, with a one-line caption" },
    steps: [
      { bn: "ছবি তোলো", en: "Take your photo" },
      { bn: "ক্যাপশন লেখো", en: "Write a caption" },
      { bn: "প্রোফাইল থেকে আপলোড করো", en: "Upload it from your profile" },
    ],
    rules: [
      { bn: "হালকা এডিট (উজ্জ্বলতা, ক্রপ) চলবে; ছবি জোড়া লাগানো চলবে না", en: "Light edits (brightness, crop) are fine; no compositing" },
      { bn: "পাখি বা প্রাণীকে বিরক্ত করা যাবে না", en: "Do not disturb birds or animals" },
      { bn: "সর্বোচ্চ ৩টি ছবি", en: "Up to 3 photos" },
    ],
    rubric: [
      { name: { bn: "গল্প ও মুহূর্ত", en: "Story & moment" }, weight: 40 },
      { name: { bn: "কম্পোজিশন", en: "Composition" }, weight: 30 },
      { name: { bn: "আলো ও স্পষ্টতা", en: "Light & clarity" }, weight: 30 },
    ],
  },
  sports: {
    overview: {
      bn: "অনলাইনে রেজিস্ট্রেশন, খেলা হবে সরাসরি ভেন্যুতে। সময়সূচি রেজিস্ট্রেশনের পরে এসএমএসে জানানো হবে।",
      en: "Register online; matches are played in person. The schedule is sent by SMS after you register.",
    },
    format: { bn: "সরাসরি অংশগ্রহণ (ভেন্যু: ঢাকা), নকআউট পদ্ধতি", en: "In person (venue: Dhaka), knockout format" },
    steps: [
      { bn: "রেজিস্ট্রেশন করো", en: "Register" },
      { bn: "এসএমএসে সময়সূচি পাবে", en: "Get your schedule by SMS" },
      { bn: "স্কুল আইডি নিয়ে ভেন্যুতে এসো", en: "Bring your school ID to the venue" },
    ],
    rules: [
      { bn: "স্কুল আইডি কার্ড সাথে আনতে হবে", en: "Bring your school ID card" },
      { bn: "১৫ মিনিট দেরি হলে ম্যাচ বাতিল", en: "15 minutes late forfeits the match" },
      { bn: "ছোটদের সাথে একজন অভিভাবক থাকতে হবে", en: "Younger players must come with a guardian" },
    ],
    rubric: [
      { name: { bn: "ম্যাচ জয়", en: "Match wins" }, weight: 80 },
      { name: { bn: "খেলোয়াড়সুলভ আচরণ", en: "Sportsmanship" }, weight: 20 },
    ],
  },
};

export const childProfiles = [
  { id: "k1", name: { bn: "আয়েশা", en: "Ayesha" }, age: "p1" as AgeKey, cls: { bn: "২য় শ্রেণি", en: "Class 2" } },
  { id: "k2", name: { bn: "রাফি", en: "Rafi" }, age: "pre" as AgeKey, cls: { bn: "প্রি-স্কুল", en: "Preschool" } },
  { id: "me", name: { bn: "আমি নিজে", en: "Myself" }, age: "uni" as AgeKey, cls: { bn: "বিশ্ববিদ্যালয়", en: "University" } },
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
    faq: { bn: "প্রশ্ন", en: "Questions" },
  },
  everyone: { bn: "সব অংশগ্রহণকারী পাবে ডিজিটাল সার্টিফিকেট, যা লিংক দিয়ে যাচাই করা যায়।", en: "Every participant gets a digital certificate that can be verified by link." },
  format: { bn: "জমার ধরন", en: "What to submit" },
  rubricNote: { bn: "বিচারকরা এই নিয়মে ১০০-তে নম্বর দেবেন", en: "Judges score out of 100 using this guide" },
  timeline: [
    { bn: "রেজিস্ট্রেশন ও জমা শুরু", en: "Registration and entries open" },
    { bn: "জমার শেষ দিন", en: "Last day for entries" },
    { bn: "বিচার", en: "Judging" },
    { bn: "ফলাফল প্রকাশ", en: "Results announced" },
    { bn: "সার্টিফিকেট ও পুরস্কার", en: "Certificates and prizes" },
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
    step: { bn: "ধাপ", en: "Step" },
    of: { bn: "এর", en: "of" },
  },
  winnersList: [
    { place: { bn: "প্রথম", en: "1st" }, name: { bn: "সাদিয়া রহমান", en: "Sadia Rahman" }, cls: { bn: "৯ম শ্রেণি", en: "Class 9" }, score: 94 },
    { place: { bn: "দ্বিতীয়", en: "2nd" }, name: { bn: "তানভীর হাসান", en: "Tanvir Hasan" }, cls: { bn: "এইচএসসি", en: "HSC" }, score: 91 },
    { place: { bn: "তৃতীয়", en: "3rd" }, name: { bn: "মিথিলা দাস", en: "Mithila Das" }, cls: { bn: "৮ম শ্রেণি", en: "Class 8" }, score: 89 },
  ],
  winnersNote: { bn: "নমুনা ফলাফল", en: "Sample results" },
  similar: { bn: "এরকম আরো কনটেস্ট", en: "Similar contests" },
} as const;

/* ---------- Entry submission ---------- */

export type UploadKind = "image" | "media" | "text" | "project" | "none";

export const uploadRules: Record<Exclude<CatKey, "all">, { kind: UploadKind; accept: string; maxMB: number; maxFiles: number }> = {
  art: { kind: "image", accept: "image/jpeg,image/png", maxMB: 10, maxFiles: 1 },
  nature: { kind: "image", accept: "image/jpeg", maxMB: 15, maxFiles: 3 },
  speech: { kind: "media", accept: "video/mp4,video/*,audio/mpeg,audio/*", maxMB: 200, maxFiles: 1 },
  writing: { kind: "text", accept: "application/pdf,image/jpeg,image/png", maxMB: 10, maxFiles: 1 },
  sci: { kind: "project", accept: "application/pdf,video/mp4,video/*", maxMB: 100, maxFiles: 2 },
  sports: { kind: "none", accept: "", maxMB: 0, maxFiles: 0 },
};

export const WORDS = { min: 300, max: 800 };

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
  sportsTitle: { bn: "এই কনটেস্টে অনলাইনে কিছু জমা দিতে হবে না", en: "Nothing to upload for this contest" },
  sportsBody: { bn: "খেলা হবে সরাসরি ভেন্যুতে। সময়সূচি এসএমএসে পাবে; স্কুল আইডি নিয়ে এসো।", en: "Matches are played in person. You'll get the schedule by SMS; bring your school ID." },
} as const;
