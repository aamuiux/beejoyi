# Contest listing page (`/contests`): strategy

Builds on [homepage-strategy.md](homepage-strategy.md). Same audience, language and brand decisions.

## The one job
> **Help a parent or student go from "show me everything" to "this one, for my child, I can join today" in under 3 taps.**

Most visitors arrive with one of three intents:

| Arrives from | Intent | What the page does |
|---|---|---|
| Homepage "See all" / age chip | Browse for a specific age | Opens with that age already filtered (URL `?age=p1`) |
| A shared WhatsApp/Facebook link | "My friend sent this filter" | Filters live in the URL, so a shared link opens the same view |
| Returning parent | "What's new for my child?" | Their last age choice is restored, and shown as a removable pill |

## Layout

```
Header (shared)
┌ Title "সব কনটেস্ট" + one-line explainer
│ [ search ………………………………………… ]
│
├ Status tabs:  চলছে (12) · শীঘ্রই আসছে (2) · ফলাফল (2)        ← the biggest split first
├ Filter row (desktop, sticky):
│   Age chips (multi-select) | Subject chips | [ ] ফ্রি only | Sort ▾
│ Filter row (mobile): [ফিল্টার (2)] button → bottom sheet  | Sort ▾
│
├ "১২টি কনটেস্ট"   [প্রি-স্কুল ✕] [ফ্রি ✕]  সব মুছে দাও
├ Card grid (4 / 2 / 1 columns)
│    Open card:      days left (red under 48 h) + joined count
│    Upcoming card:  "শুরু হবে ৫ দিন পরে" + "মনে করিয়ে দিও" (remind me)
│    Results card:   "ফলাফল প্রকাশিত" + "বিজয়ী দেখো" (see winners)
├ Empty state: says which filter emptied it, with one-tap fixes
└ Footer (shared)
```

## Decisions and the UX laws behind them

| Decision | Why |
|---|---|
| Status tabs (Open / Upcoming / Results) come before the other filters | They're the most common split, and **Hick's law** says to settle the big choice first. Each tab shows its count, so users never open an empty tab. |
| Age is **multi-select** | A parent with a Class 2 and a Class 7 child picks both. Subject is single-select, so it reads like the homepage tabs (**consistency / Jakob**). |
| "Free only" is a switch, not a dropdown | It's a yes/no choice that parents care about a lot, so it gets one tap (**Fitts**). |
| Filters live in the URL | Shareable on WhatsApp, survive refresh and the back button (**Postel's law**: be liberal in how people return). |
| Results update instantly; no "Apply" button on desktop | Instant feedback is under 400 ms (**Doherty threshold**). |
| The mobile bottom sheet ends with "**১২টি কনটেস্ট দেখাও**" | The button tells you the outcome before you commit, rather than a vague "Apply". |
| Active filters appear as removable pills + "Clear all" | Shows the system state and gives an easy undo (**Nielsen #1 and #3**). |
| The empty state names the culprit filter | e.g. *"প্রি-স্কুলের জন্য এখন কোনো পেইড কনটেস্ট নেই"*, with buttons to drop that filter. No dead ends. |
| Upcoming cards show a "Remind me" button | Captures intent now and brings the user back later (**Zeigarnik effect**). |
| Same card anatomy as the homepage | Users learn the card once (**Jakob's law**, internal consistency). |
| The sort defaults to "Ending soon" | Most actionable first (**serial position, goal-gradient**). Other options: Most joined, Newest. |

## Out of scope for this prototype
- Pagination / infinite scroll (needed with real data: load 24, then "আরো দেখাও")
- The contest detail page (`/contests/[id]`)
- Organiser filter and the "Featured organisations" row (add once there are 10+ verified organisers)
