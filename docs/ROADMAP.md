# Beejoyi redesign roadmap

Last updated: 26 Nov 2026

## Done ✅

| # | Page | Route | Strategy doc |
|---|---|---|---|
| 1 | Homepage | `/` | [homepage-strategy.md](homepage-strategy.md) |
| 2 | Contest listing | `/contests` | [contests-page-strategy.md](contests-page-strategy.md) |
| 3 | Contest detail + join flow | `/contests/[id]` | [contest-detail-strategy.md](contest-detail-strategy.md) |
| 4 | Entry submission | `/contests/[id]/submit` | [submission-strategy.md](submission-strategy.md) |

The student journey works end to end: **discover → filter → read → join (pay) → submit → receipt.**

Since then (26 Nov 2026):
- **Audience is preschool to HSC.** The university age group was removed.
- **Five contest formats:** quiz, photo, video, audio and debate. Each format has its own rules, uploads, join flow and winner cards. Debate teams of three register together and win as a team.
- **Contest cards:** every card has a full-width action button.
- **Winners:** they sit side by side and show the winning photo, video or audio.
- **Homepage:** set in Anek Bangla, with a picture for each step of "কীভাবে কাজ করে".

## Next, in this order ⏭️

Each step closes a loop the previous pages already point to. Placeholder buttons in the prototype mark where they connect.

### 5. Parent dashboard / "My Beejoyi": `/me` ← **start here**
Why next: "নতুন প্রোফাইল যোগ করো", "পরে জমা দেব" and the mobile tab bar's **Profile** all lead here, and it's where a parent sees value after joining.
- Child profiles: switch, add, edit (name, class, school).
- Per child: **joined contests**, each with a status (needs submission ⏳ / submitted ✓ / results out 🏆) and the deadline.
- Certificates wallet (download / share / verify link).
- Payments and receipts (bKash/Nagad), reminders set.
- Empty state for a brand-new parent: "প্রথম কনটেস্ট খুঁজুন".

### 6. Sign up / log in: `/signup`, `/login`
- Phone number + OTP first (most parents don't use email), Google as an option.
- Ask "who is this account for?" → **parent** (then add the first child) or **student (13+)**.
- Ask for as little as possible; everything else is collected later (**Tesler's law**).

### 7. Results and certificate: `/contests/[id]/results` + `/certificates/[code]`
- Winners, scores, the child's own score and rubric feedback.
- A public certificate verification page (schools and parents verify by link or QR).

### 8. Games: `/games` + one playable game screen
- Game tiles, weekly leaderboard, the "save your score → sign up" moment, and the end screen that leads to a real contest.

### 9. For institutions (B2B landing) + pricing: `/for-institutions`, `/pricing`
**Move this up to #5 if an investor or brand pitch is soon.**
- Built from the brochure: the problem (Google Forms + spreadsheets chaos), how it works in 4 steps, benefits, pricing tiers, a "Try free, approved in 24 h" call to action, and a demo request.
- Proof: verified numbers, school logos, a case study.

### 10. Brands and sponsors: `/partners`
- Sponsorship packages, reach numbers, CSR impact report sample, contact form.

### 11. Organiser Studio (B2B app): `/studio`
- Create-contest wizard (template → rules → judging rubric → fee → publish).
- Dashboard: entries, judges, scoring, results, certificates in bulk.

### 12. Supporting pages
Showcase gallery, About, Impact & investors, FAQ, Contact, 404.

## Open items for the founder
- [ ] Verified numbers for the homepage stats strip
- [ ] 6–10 real winning entries (with parent consent)
- [ ] Partner school and brand logos we may show
- [ ] Final contest categories
- [ ] Copy the real logo into `/public` (it currently loads from preview.beejoyi.com)

## How to resume on a new computer
1. Install Node.js 20+ and Git.
2. `git clone https://github.com/aamuiux/beejoyi.git`, then `cd beejoyi`, then `npm install`.
3. `npm run dev` → http://localhost:3000
4. Open the folder in Claude Code and say: **"Read docs/ROADMAP.md and design the next page."**
