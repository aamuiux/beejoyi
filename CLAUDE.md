@AGENTS.md

# Beejoyi redesign: project guide for Claude

Beejoyi (বিজয়ী) is Bangladesh's contest platform for students from preschool to HSC, plus their parents. Schools, clubs and brands host or sponsor contests (B2B). This repo is the **redesign prototype**, built page by page.

**Start every session by reading [docs/ROADMAP.md](docs/ROADMAP.md)**: it says what's done and which page is next.

## Locked decisions (from the founder; don't re-ask)
- **Homepage serves students and parents first**; B2B and investors get one dark band plus their own pages.
- **Bangla by default**, one-tap English toggle. Every string lives in `src/lib/content.ts` as `{ bn, en }`. Bangla numerals in BN mode (`num()`), and Bangla uses "।" not ".".
- **Young children:** a parent account with child profiles. Teens (class 6 to HSC) have their own accounts.
- **Audience stops at HSC:** no university age group or university-only contests (founder decision).
- **Fees:** mixed free and paid; bKash, Nagad or card.
- **Games:** casual, no sign-up, weekly leaderboard.
- **Contest formats:** every contest is one of quiz, photo, video, audio or debate (`Contest.format`). The format drives rules (`formatGuides`), uploads (`uploadRules`) and how winners show; debate winners are teams.
- **Product model (from the founder's UX blueprint, see PRODUCT.md):**
  - Contests can run over several rounds (`Contest.round`): inquiry, then feedback and improvement, then the finale.
  - Judging uses a published 1–7 rubric per criterion, scored blind and never by votes.
  - Every finisher gets a Skill Scorecard.
  - Free contests name their CSR sponsor (`Contest.sponsor`).
  - Submissions start with a 3-minute learning card and guided prompts, never a blank box.
- **Icons:** drawn SVGs from `src/components/icons.tsx`, never emoji.
- **Brand:** keep the logo and colours (indigo `#6563F1`, honey `#FFC329`). Honey is for rewards only, crimson only for deadlines.
- **Stats and contest data are samples**, marked "(নমুনা)" on screen until the founder sends verified numbers.
- One label = one action. "ফ্রি সাইন আপ" = create an account; "যোগ দাও" = join a contest.

## Stack and conventions
- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4 (tokens in `src/app/globals.css` `@theme`), **Base UI** (`@base-ui/react`) for every interactive primitive (Dialog, Tabs, Select, ToggleGroup, Accordion, Checkbox, Switch, RadioGroup).
- Font: **Anek Bangla** everywhere (Google Font, variable weight + width). Headlines use the `.display` class, which widens it via the width axis.
- Shared state: `src/lib/home-state.tsx` (language, remembered age, homepage filters). The header, footer and mobile tab bar live in `src/app/layout.tsx`.
- Routes that read `params` wrap the data access in `<Suspense>` (Next 16 instant navigation).
- Use `next/link` for internal links. After adding a route, run `npx next typegen`.
- Minimum tap target 44–48 px; mobile-first; check 375 px width for horizontal overflow.

## How each page is made (keep this rhythm)
1. Write `docs/<page>-strategy.md`: the page's one job, who arrives with what intent, an ASCII layout, a decisions table naming the UX law behind each choice, and what's out of scope.
2. Add copy (bn + en) to `src/lib/content.ts`.
3. Build with Base UI + Tailwind and reuse existing components (`ContestCard`, `PosterArt`, …).
4. Verify in the browser at desktop and 375 px mobile; test every state (empty, error, offline, success); then `npx tsc --noEmit`, `npm run lint` and `npm run build`.
5. Fix what testing finds, then update `docs/ROADMAP.md`.

Avoid generic template tells: no all-caps eyebrow labels, no "→" on buttons, numbered markers only for real sequences, one bold visual idea per page.
