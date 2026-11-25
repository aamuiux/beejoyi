# Blueprint alignment (26 Nov 2026)

**Source:** `Beejoyi_UX_Blueprint_Personas_Journey_Guidelines.docx`. It is the founder's blueprint: personas, journeys and UI rules. The product truth is captured in [../PRODUCT.md](../PRODUCT.md).

## What the critique found
An Impeccable critique compared the four built pages against the blueprint. A design review and a detector ran independently.

- **Score:** 25/40. Solid, but not differentiated.
- **What works:** the look (hero colour stage, Bangla-first copy) belongs to Beejoyi.
- **What was missing:** the product model was a generic contest site, with one round, scores out of 100 and a certificate. The blueprint's differentiator was absent: an IB-style process at a school-fest price.

| Priority | Finding |
|---|---|
| P0 | **Blank-page fear at submit.** There was no learning step and no prompts. |
| P0 | **Scoring contradicted the product.** Weights were out of 100, and the FAQ allowed public votes. |
| P1 | **No rounds**, and no feedback loop after submitting. |
| P1 | **Non-winners left with nothing.** There was no scorecard and no sponsor or CSR trust signal. |
| P2 | **Bangla headings too tight.** Display line-height was 1.05, so vowel signs could clip. |
| P2 | **Low contrast** on placeholders and small green text. Emoji were used as icons. A heading level was skipped on /contests. |

## Decisions
| Change | Where | Blueprint / UX law |
|---|---|---|
| **3-minute learning card** before making the entry. Text is always there; video (data-saver, 4 MB) and audio (1 MB) are optional extras. The work step stays locked until the card is done. | `/contests/[id]/submit` | Scaffolded inquiry, progressive disclosure, low bandwidth |
| **Three guided prompts** replace the blank box. They are optional, and a parent may type for young children. | submit | No blank-page fear |
| **Reflection log** of 150–300 characters, required in round 2 and the finale. | submit (`c.round.now >= 2`) | Process capture, deters AI copy-paste |
| **Rubric shown next to the work** while the student makes it. | submit | Recognition over recall |
| **Photos shrink on the phone** before upload: long side 2000 px, JPEG 82%. A 21.7 MB photo became 1.6 MB in testing. The upload says it resumes when the connection drops. | submit | Low bandwidth, Postel |
| **Published 1–7 rubric:** the scale and its bands, the weight, and "what earns a 7" for each criterion. Judging is blind. | `/contests/[id]` | Criterion rubrics, transparency |
| **Rounds section** (Inquiry → Feedback and improve → Finale), showing the current round and a note that mentor clinics are recorded. | detail, for multi-round contests | Multi-round journey, power and network cuts |
| **Statement of inquiry** card. | detail, for multi-round contests | Concept-driven inquiry |
| **Skill Scorecard** for every finisher: a 1–7 score per criterion, learner-profile badges, the judge's comment, the sponsor co-brand, a verify link, PDF download and Facebook share. | detail, ended contests | Peak-end, "no one leaves empty-handed" |
| **"The thinking behind it"** note on each winning entry. | winners | Side-by-side work and process |
| **Sponsor co-brand:** "সৌজন্যে X" appears on the card, by the organiser line and in the fee tile. | card, detail | CSR trust, so "free" doesn't read like a catch |
| **Round chip** ("রাউন্ড ১/৩") on the card poster. | card | Visibility of status |
| **How it works** now reads: join and learn → submit and get feedback → scorecard. | homepage | Shows the IB loop on the homepage |
| **FAQ:** no voting; added "What do I get if I don't win?" and "Who pays for free contests?". | homepage | Merit over popularity |
| **Drawn SVG icons** replace emoji. | `src/components/icons.tsx` | Emoji render inconsistently on budget Android |
| **Bangla display line-height** is 1.25, plus `text-wrap: pretty`, a themed text selection and darker green text (`leaf-ink`) for contrast. | `globals.css` | Bilingual layout resilience, WCAG AA |

**Data model:** `Contest` gains three optional fields:
- `sponsor` (CSR sponsor)
- `round: { now, of }`
- `inquiry`

`formatGuides[*]` gains `learn` (three tips) and, on each rubric criterion, `top` (what earns a 7).

## Not done (needs the founder or later pages)
- **Real photos** of Bangladeshi students. They need consent; the drawn placeholders stay until then.
- **Real round state:** per-student scores, actual feedback and mentor clinic video. These need the API.
- **Phone OTP sign-up.** This is roadmap item 6.
- **Learner-profile radar chart.** Bars are used instead because they read better on a 375 px screen. Revisit for the PDF.
- **Judge console** (split screen, blind) and **Organiser Studio** (rubric library, district tracker, impact report). These are roadmap item 11.
