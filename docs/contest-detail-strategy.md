# Contest detail page (`/contests/[id]`): strategy

Builds on [homepage-strategy.md](homepage-strategy.md) and [contests-page-strategy.md](contests-page-strategy.md).

## The one job
> **Answer a parent's four questions above the fold: *Can my child join? What does it cost? By when? What do they win?* Then make joining take under 30 seconds.**

This is the conversion page. Everything else on the site exists to get people here.

## Layout

```
Desktop                                              Mobile
┌──────────────────────────────────────────────┐    ┌──────────────────┐
│ ← সব কনটেস্ট                                  │    │ poster            │
│ ┌────────┐  Organiser ✓ verified             │    │ org ✓ / title     │
│ │ poster │  Title                            │    │ 4 key facts (2×2) │
│ │        │  [Age] [Fee] [Deadline] [Prize]   │    │ section links ⟷   │
│ └────────┘                                   │    │ …content…         │
├──────────────────────────────────┬───────────┤    │                  │
│ Sections: বিস্তারিত · কীভাবে জমা দেবে ·      │ STICKY    │    ├──────────────────┤
│ নিয়ম · বিচার · সময়সূচি · প্রশ্ন              │ JOIN CARD │    │ ৳50 · ২ দিন  [যোগ দাও] │ ← sticky bar
│                                  │ fee, time │    └──────────────────┘
│ Similar contests (4 cards)       │ [Join]    │
└──────────────────────────────────┴───────────┘
```

## The three states change the page, not just the button

| | Open | Upcoming | Ended |
|---|---|---|---|
| Primary action | **যোগ দাও** (free) / **৳৫০ দিয়ে যোগ দাও** | **মনে করিয়ে দিও** | **বিজয়ী দেখো** (scrolls to winners) |
| Top of content | Overview | Overview + "opens in N days" | **Winners** first, then overview |
| Countdown | Days left (red under 48 h) | Days until it opens | Hidden |

## Join flow (the peak moment): a dialog, 3 short steps

1. **Who is joining?** A parent picks a child profile, or "Myself". Profiles that don't fit the age band are **disabled with the reason** ("এই কনটেস্ট ৬ষ্ঠ–১০ম শ্রেণির জন্য"). That's error prevention, not error messages.
2. **Pay** (paid contests only): bKash, Nagad or card. The amount is repeated on the button ("বিকাশে ৳৫০ দাও"). Free contests skip this step entirely (**Tesler's law**: we absorb the complexity).
3. **Done 🎉**: a celebration, then *exactly one* next step: "জমা দাও" (submit entry) with the deadline. Secondary: share with friends on WhatsApp. (**Peak-end rule**: the last moment is the one remembered.)

## Decisions and UX laws

| Decision | Why |
|---|---|
| Four key-fact tiles (Age, Fee, Deadline, Prize) right under the title | These are the decision criteria. Answer them before anything else (**Miller**: 4 chunks). |
| A "verified organiser" badge next to the organiser name | Parent trust. Links to the organiser's profile. |
| Sticky join card (desktop) / sticky bottom bar (mobile) | The action is always in reach, whatever the scroll position (**Fitts**). The mobile tab bar is hidden on this page so only one bar takes the bottom of the screen. |
| Section links instead of tabs | On mobile a single scroll is easier than tabs. The links are shortcuts, not a gate (**Jakob**: most event pages scroll). |
| Submission format per subject ("ছবি তুলে JPG/PNG, সর্বোচ্চ ১০ MB") | Removes the #1 support question ahead of time. |
| The judging rubric shows weights as bars | It's visible and fair. Parents and students know what judges look for. |
| The timeline is a real sequence, so it is numbered | Registration, submission, judging, results, certificates. |
| Share via WhatsApp, the main channel in Bangladesh | Word of mouth is the growth loop. |
| "Similar contests" at the end | Not a dead end even if this one doesn't fit (**Zeigarnik**: keeps intent alive). |

## Out of scope for this prototype
Real auth and payments, the entry submission page, the organiser profile page, and comments/Q&A threads.
