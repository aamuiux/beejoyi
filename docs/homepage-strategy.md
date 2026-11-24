# Beejoyi homepage redesign: strategy

**Scope:** Homepage only. **Status:** Ideation v1, with a prototype at `src/app/page.tsx`.
**Decisions locked with the founder:**

| Topic | Decision |
|---|---|
| Who the homepage serves first | Students and their parents. Institutions, brands and investors get a clear path, plus their own pages. |
| Language | Bangla by default with a one-tap English toggle. B2B and investor pages are English-first. |
| Accounts for young children | A parent account with child profiles. Teens and university students have their own accounts. |
| Entry fees | A mix of free and paid. Paid entries use bKash, Nagad or card. |
| Games | Casual, instant play with no sign-up, plus weekly leaderboards. |
| Brand | Keep the logo and colours (indigo `#6563F1`, yellow `#FFC329`). Refresh the type, layout and illustration. |
| Stats | Clearly marked placeholders until the founder sends verified numbers. |

---

## 1. The one job of this homepage

> **Within 5 seconds, a parent or student in Bangladesh should know:**
> *"This is where my child (or I) can join contests, show their talent and get a certificate or prize. Here are the ones open for my age right now."*

Everything else is secondary. B2B (schools, clubs, brands) and investors are served by **one strong band** on the homepage and their own dedicated pages, not by mixing their language into the student flow.

### Who arrives, and what they want

| Visitor | Arrives via | Wants | Fastest path on the new page |
|---|---|---|---|
| Parent of a 4–10 year old | Facebook post, school notice, WhatsApp | "Is there something for my child? Is it safe? What does it cost?" | Age chip **"Preschool"** or **"Class 1–5"** → filtered contests → Free/৳ badge → safety block |
| Student, Class 6–12 | Friend's share, school | "What can I join? What do I win?" | Hero search or age chip → contest cards with prize and deadline |
| University student | Club page, LinkedIn | Competitions with prizes and CV value, brand challenges | "University" chip → contests; "Certificate" proof |
| Kid with nothing to do | Returning visitor | Fun | **"Play now"** in the hero → games, with no sign-up |
| Teacher / club / school admin | Brochure, sales call | "Can I run our contest here?" | Nav link **"For institutions"** → B2B band → `/for-institutions` |
| Brand / CSR team | Pitch deck, referral | Reach, safety, measurable results | B2B band → **"Partner with us"** |
| Investor | Pitch | Traction, market, clarity | The page itself proves clarity. Stats strip, B2B band, footer **"Impact & investors"** |

---

## 2. What's wrong with the current homepage (audit)

1. **The hero doesn't say what Beejoyi is.** *"সঠিক পরিচর্যা, জমজমাট লড়াই, উজ্জ্বল ভবিষ্যৎ"* is poetic but abstract. The only CTA, **"Launch a Campaign"**, is a B2B action shown to students.
2. **Four audiences get equal weight** (students, educators, parents, brands), and two sections repeat that split. Under Hick's law, every visitor has to work out which part is theirs.
3. **The copy is jargon and imported**: sprints, quests, micro-grants, proof-of-work, "Youth Passport", COPPA (a US law), $1,500 prize pools, "Maya Lin (Age 17)". None of it speaks to a parent in Dhaka or Sylhet.
4. **The stats undermine trust.** "Total activities: 10, +42%" next to "1,200+ mentors" looks invented, which is risky in an investor pitch.
5. **The live contest section is empty** ("All (0)… No arenas here right now"). The most important content on the page is a dead end.
6. **`/competitions` shows loading skeletons that never resolve.** That breaks the Doherty threshold and makes the site look broken.
7. **The language is mixed**: a Bangla headline over English everything else.
8. **Buzzword marquee**: moving text that carries no information.
9. **Games**, the best hook for young kids, aren't on the homepage at all.

---

## 3. Information architecture (top to bottom)

Order follows the **serial position effect**: the most important action comes first (find/join a contest) and is repeated last (join free). Proof and B2B sit in the middle.

```
┌ Header: logo · Contests · Games · Showcase · Results  |  For institutions · বাংলা/EN · Log in · [Join free]
│
├ 1  HERO (Luma-style): what it is + who it's for + 2 actions
│     "আঁকো · লেখো · বলো · কোড করো · খেলো, জিতে নাও সার্টিফিকেট আর পুরস্কার"  (rotating verb)
│     Search  [কনটেস্ট খুঁজুন]   secondary: [এখনই খেলো: সাইন-আপ লাগবে না]
│     "I'm…" age chips: Preschool · Class 1–5 · Class 6–10 · SSC/HSC · University
│     Floating cards on desktop = real live contests (clickable), like Luma's floating posters
│
├ 2  TRUST STRIP: students · contests run · schools · ৳ prizes given (verified numbers) + partner logos
│
├ 3  CONTESTS (Kaggle-style shelves). Filtered by the age chip from the hero
│     Category tabs: সব · আঁকা · লেখা · বক্তৃতা/আবৃত্তি · বিজ্ঞান ও ICT · প্রকৃতি · খেলাধুলা
│     Shelf A "শেষ হচ্ছে শীঘ্রই" (Ending soon)   Shelf B "প্রথমবার? এখান থেকে শুরু" (Beginner-friendly)
│     Card: cover · organiser · title · age band · FREE/৳50 · prize · joined count · "৩ দিন বাকি"
│
├ 4  HOW IT WORKS (students & parents): 3 steps, Join → Submit → Certificate/Prize
│
├ 5  GAMES: Play instantly, no sign-up. 4 game tiles + this week's leaderboard
│
├ 6  SHOWCASE: real winning entries + names + schools (social proof and inspiration)
│
├ 7  FOR PARENTS: safety. Parent-managed child profiles, verified organisers, no public contact info,
│     bKash/Nagad receipts, certificates stored forever
│
├ 8  B2B BAND (dark, high contrast): "Run your contest on Beejoyi" / "Sponsor a contest"
│     Schools & clubs → templates, judging, certificates, one dashboard, approved in 24h, free to start
│     Brands → reach verified students nationwide, CSR reporting
│     [For institutions] [Partner with us]
│
├ 9  FAQ (parents' top 5): cost, age, safety, certificates, how judging works
│
└ 10 FINAL CTA + FOOTER: Join free · Bangla/EN · WhatsApp/phone · Impact & investors · Shop
```

### Navigation rules
- At most **4 primary links**, plus one B2B link that is visually distinct. Fewer choices means faster decisions (Hick).
- On mobile: a **sticky bottom bar** with Home · Contests · Games · Profile. Thumbs reach it easily (Fitts), and it matches apps users already know (Jakob).
- On mobile, search is the first thing in the hero, not hidden behind an icon.

---

## 4. Section details and the UX laws behind them

### 1. Hero (inspired by Luma)
What we take from Luma: a short, **huge headline with one coloured, rotating word**; lots of white space; **one dark primary button with a quiet secondary link**; and **floating cards that show real content**, so the page *demonstrates* what it is instead of describing it.

- **Headline (BN):** *আঁকো, লেখো, বলো, খেলো, জিতে নাও* (the verb rotates every 2.5 s). Under `prefers-reduced-motion` it stays static.
- **Sub-line:** *প্রি-স্কুল থেকে বিশ্ববিদ্যালয়: বাংলাদেশের শিক্ষার্থীদের জন্য কনটেস্ট, গেম আর সার্টিফিকেট, এক জায়গায়।*
- **Primary:** search field + **কনটেস্ট খুঁজুন** button. **Secondary:** *এখনই খেলো →* (games, no sign-up).
- **Age chips** ("আমি…") filter section 3 in place and remember the choice, so a parent clicks once and every card fits.
- The floating cards on desktop are live contests. On mobile they collapse to one horizontal strip under the chips.

| Law | How it's applied |
|---|---|
| Jakob's law | A search-plus-category hero, like the event and marketplace sites users already know |
| Hick's law | One primary action and one secondary; the age chips cut the catalogue to what's relevant |
| Aesthetic-usability effect | A clean, confident hero builds trust with parents and investors |
| Recognition over recall | Floating cards *show* contests instead of asking users to imagine them |

### 2. Trust strip
Four numbers at most (Miller's law: chunking), each **verified**, plus a row of partner school and brand logos. The current page labels numbers with "+42%" growth deltas; drop those, because they read as fake.
*Placeholders are marked `[verify]` in the prototype until the real figures arrive.*

### 3. Contests (inspired by Kaggle)
What we take from Kaggle: **category tiles/tabs**, **named shelves** ("Getting Started", "Featured") with *See all*, and **dense, scannable cards** that show organiser, participants, reward and time left.

**Contest card anatomy** (fixed order, so the eye learns it once):
1. Cover image with **age-band pill** (top-left) and **FREE / ৳50** badge (top-right)
2. Organiser logo + name (trust)
3. Title, at most 2 lines
4. Meta row: 🏆 prize · 👥 joined · ⏳ *৩ দিন বাকি* (red when under 48 h)

| Law | How it's applied |
|---|---|
| Goal-gradient / Zeigarnik | Countdown and "৳ entry" create urgency; "you've started, submit before…" for returning users |
| Law of common region | Every card is one bordered region; the whole card is clickable (Fitts) |
| Serial position | "Ending soon" shelf first |
| Doherty threshold (<400 ms) | Server-render the first 8 cards; never ship empty skeletons; if a shelf is empty, show the next one, not "0 results" |
| Postel's law | Search accepts Bangla, English and Banglish ("akao", "art") |

**Empty state rule:** the homepage never shows "No arenas (0)". If nothing is live for the chosen age, show *"এই বয়সের জন্য নতুন কনটেস্ট আসছে, নোটিফাই করুন"* (notify me) plus the nearest age group's contests.

### 4. How it works
Three steps only (Miller): **যোগ দাও → জমা দাও → সার্টিফিকেট/পুরস্কার নাও**. One sentence each. For parents: *"বাচ্চার প্রোফাইল আপনি চালাবেন।"*

### 5. Games (Kaggle Game Arena energy, made kid-sized)
Big colourful tiles: 2048, Gomoku, Mancala, Rock-Paper-Scissors, each with **"Play: no sign-up"**. A side panel shows **this week's leaderboard** (top 5 + "your rank" after login).
- **Why on the homepage:** It hooks preschool and primary kids, gives a daily reason to return, and makes the platform feel alive even between contests.
- **Laws:** Fitts (huge tap targets for small hands), peak-end (celebratory end screen with "Join a real contest" CTA), variable reward (weekly leaderboard reset).
- Sign-up is asked for **only** to save a score. That's the conversion moment.

### 6. Showcase
Real winning drawings, essays and videos with child's first name, class and school. This is inspiration for kids, proof for parents and evidence for brands. It replaces the fictional "Maya Lin".

### 7. For parents: safety
Four promises with simple icons:
1. A parent controls the child's profile
2. Only verified schools and organisers host contests
3. A child's contact details are never public
4. Fee receipts via bKash/Nagad, and certificates saved permanently

(Do **not** cite COPPA. Use plain-language promises, and link to the privacy policy.)

### 8. B2B band (schools, clubs, brands → investors also read this)
A dark indigo full-width band (**Von Restorff**: it looks different so it reads as "a different audience") with two cards:

- **Schools, clubs, teachers: "আপনার প্রতিষ্ঠানের কনটেস্ট চালান বিজয়ীতে"**
  Ready templates for rules, judging and certificates · one dashboard for entries, judges and results · paid entries collected via bKash · approved in 24 hours · **free to start**. (Condensed from the brochure's 8 benefits to the 4 strongest; Miller.)
  CTA: **প্রতিষ্ঠানের জন্য** → `/for-institutions`
- **Brands and CSR: "Reach students across Bangladesh, safely"**
  Sponsor a contest, get verified engagement numbers and a CSR impact report.
  CTA: **Partner with us** → `/partners`

The investor story lives on `/for-institutions` and an **Impact & investors** footer link (traction, model: SaaS + entry fees + sponsorship). The homepage's job for investors is to show product clarity and real activity.

### 9. FAQ
Parents' five questions in Base UI Accordion: Is it free? What ages? Is it safe? How are winners judged? How do I get the certificate?

### 10. Final CTA + footer
Repeat the primary action (**serial position**): *বিনামূল্যে যোগ দাও*. The footer adds the WhatsApp/phone number (`8801737525434` from the brochure), Bangla/EN, Shop, About, FAQ, Terms, Privacy, and Impact & investors.

---

## 5. Visual direction

- **Colour:** Indigo `#6563F1` is the primary (actions, links). Yellow `#FFC329` is for **reward signals only** (prizes, "Free", winners), so it keeps its meaning. A crimson-red accent appears **only** for "ending soon". Near-white background, deep ink text `#1E1E2E`.
- **Type:** **Anek Bangla** for headlines (friendly, rounded, strong in Bangla) and **Hind Siliguri** for body. Both render Bangla and Latin well. Bangla body text needs ~1.7 line-height.
- **Shape:** Soft 16–24 px radii, chunky buttons (min 48 px tall), playful but not childish, so a university student doesn't feel it's "for kids".
- **Motion:** The rotating hero word and gentle floating cards only. Respect `prefers-reduced-motion`. No marquees.
- **Imagery:** Real Bangladeshi kids, real submissions and real school logos. No Western stock photography.

## 6. Performance and access (Bangladesh-specific)
- Mobile-first, tested on a ~360 px Android over 3G. LCP under 2.5 s, homepage JS under 150 kB.
- Contest shelves server-rendered and cached, so they're never stuck on skeletons.
- WCAG AA contrast. Yellow is never used for text on white.
- Bangla numerals in BN mode (৩ দিন বাকি), Western numerals in EN.

## 7. What to measure
- % of homepage visitors who click a contest card or age chip (target: >35%)
- Time to first contest click
- Game plays → sign-ups conversion
- "For institutions" click-through → demo requests
- Bounce rate on mobile

## 8. Open items for the founder
- [ ] Verified numbers for the trust strip
- [ ] 6–10 real past winning entries (with parent consent) for the Showcase
- [ ] Partner school and brand logos we're allowed to show
- [ ] Final contest categories (current: Art, Creative, ICT, Nature & Wildlife, Portraits & People, Sports)
- [ ] Is `/for-institutions` built next, or the contest listing page?
