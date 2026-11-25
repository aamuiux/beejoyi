---
name: Beejoyi
description: Bangladesh's contest platform for students from preschool to HSC, staged as a show in rounds judged in the open.
colors:
  indigo: "#6563f1"
  indigo-ink: "#4846d2"
  indigo-wash: "#ecebfe"
  night: "#24226e"
  navy: "#181f38"
  honey: "#ffc329"
  honey-wash: "#fff4d6"
  honey-ink: "#6b4d00"
  alert: "#c8133f"
  leaf: "#1f8a5b"
  leaf-ink: "#166b46"
  ink: "#1e1e2e"
  ink-soft: "#55546b"
  paper: "#f6f6fb"
  line: "#e3e2f0"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Anek Bangla, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6.6vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 118"
  headline:
    fontFamily: "Anek Bangla, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 112"
  title:
    fontFamily: "Anek Bangla, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Anek Bangla, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 450
    lineHeight: 1.65
  body-lg:
    fontFamily: "Anek Bangla, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 450
    lineHeight: 1.65
  label:
    fontFamily: "Anek Bangla, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  frame: "2px"
  entry: "12px"
  card: "16px"
  panel: "24px"
  pill: "9999px"
spacing:
  gutter: "16px"
  gutter-sm: "24px"
  card: "16px"
  panel: "28px"
  panel-lg: "36px"
  section: "64px"
  section-lg: "96px"
  container: "80rem"
components:
  button-primary:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.white}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.indigo-ink}"
  button-stage:
    backgroundColor: "{colors.white}"
    textColor: "{colors.night}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.pill}"
    padding: "0 32px"
    height: "56px"
  button-stage-hover:
    backgroundColor: "{colors.indigo-wash}"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.indigo-ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "48px"
  chip-age:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "44px"
  chip-age-selected:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.white}"
  input-search:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "0 16px"
    height: "48px"
  card-contest:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px"
  paddle:
    backgroundColor: "{colors.white}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
    size: "80px"
  seal:
    backgroundColor: "{colors.honey}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "64px"
  podium:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "20px"
---

# Design System: Beejoyi

## Overview

**Creative North Star: "The Debate Stage"**

A contest is a show in rounds, judged in the open. The system is the set of a televised inter-school debate: a pleated indigo curtain, a night-navy stage floor with a lit horizon, one warm spotlight falling on a child's entry, judges raising round white paddles with large digits, a white podium holding the action, and a honey seal that stamps the verdict. Dark stage bands open and close a page; the light sections between them are the auditorium, in paper and white, where the facts sit plainly.

The stage is a recurring material, not a page layout. It returns where the show is happening: the running order of rounds, the judges' table, the scorecard header, the curtain call. Everything else is calm, legible and dense enough to scan on a budget Android phone, in Bangla first. Expression comes from one source in type (Anek Bangla's width axis, widened for display) and one in light (the spotlight). Shapes are soft and pill-round; depth is cast by stage lighting, not by a card stack.

**Key Characteristics:**
- Dark stage bands (curtain over navy floor) bookend the page; light auditorium sections carry the content.
- One spotlight per stage. Honey only where something is earned.
- Anek Bangla for both scripts; display widened on the width axis, Bangla display given extra leading.
- Round forms: pill buttons and chips, round paddles, round seal, softly radiused panels.
- One authored motion sequence on load; static under reduced motion.
- Drawn SVG icons on a single 24px, 2px-stroke grid. Never emoji.

## Colors

A brand-locked palette: indigo acts and teaches, honey rewards, crimson warns, and navy holds the stage.

### Primary
- **Stage Indigo** (`indigo`): every primary action (find, join, sign up), selected chips, filled rubric cells, and the curtain's base colour. The colour of doing and learning.
- **Deep Indigo** (`indigo-ink`): hover state of indigo buttons, indigo text on light grounds (links, small labels), and the curtain's darker folds.
- **Indigo Wash** (`indigo-wash`): soft fills: secondary buttons, hover backgrounds in navigation, the running-order section ground, empty rubric cells, the back of a flipped paddle.

### Secondary
- **Honey** (`honey`): rewards only: the verification seal, winner place tags, the leaderboard's first place, the spotlight's warmth, and the scorecard's credential mark.
- **Honey Wash** (`honey-wash`) and **Honey Ink** (`honey-ink`): learner-profile badges on the scorecard and prize lines on contest cards (honey-ink is the legible text form of honey on white).

### Tertiary
- **Deadline Crimson** (`alert`): deadlines and errors only, such as "last day" on a contest card.
- **Leaf** (`leaf`) and **Leaf Ink** (`leaf-ink`): done and safe states: free-contest tags, "results out", reminder set, scorecard verification footer, parent-safety icons. Leaf-ink is the text shade on tints (4.5:1).

### Neutral
- **Stage Navy** (`navy`): the stage floor and every dark stage band; the scorecard header.
- **Night Indigo** (`night`): text on white stage elements (paddle digits, stage buttons), the judges' table and organiser bands, the running-order rules.
- **Ink** (`ink`): body text; the dark leaderboard panel; selected filter chips.
- **Soft Ink** (`ink-soft`): secondary text, captions, placeholders.
- **Auditorium Paper** (`paper`): the page ground and input fields.
- **Hairline** (`line`): borders and dividers on light grounds.

### Named Rules
**The Earned Honey Rule.** Honey marks something earned or verified: a seal, a place, a prize, first on the board. It is never a decorative accent, a button or a highlight.

**The Crimson Clock Rule.** Crimson appears only when time is running out or something failed.

**The Pigment Exception.** Inside drawn illustrations (children's entries, game boards) the palette is pigment, not signal; a honey sun is not a reward.

## Typography

**Display Font:** Anek Bangla (with system-ui, sans-serif)
**Body Font:** Anek Bangla (with system-ui, sans-serif)

**Character:** One variable family for Bangla and Latin. Its width axis is the expressive element: headlines widen into a broadcast-banner voice while body text stays at normal width and a slightly heavier regular weight for crisp Bangla on low-DPI screens.

### Hierarchy
- **Display** (700, clamp(2.5rem, 6.6vw, 5.5rem), 1.05; width 118): the stage banner and the curtain-call headline, centred and balanced.
- **Headline** (700, 2.25rem rising to 3rem at sm, 1.05; width 112): every section title.
- **Title** (600, 1.25rem to 1.5rem): card, panel, FAQ and podium headings.
- **Body** (450, 1rem, 1.65): running text; long text capped at 55 to 65ch, with `text-wrap: pretty`.
- **Body Large** (450, 1.125rem, 1.65): section sub lines and lead paragraphs.
- **Label** (600, 0.875rem): round names, criterion names, status lines, chip text. Sentence case; no tracking.
- **Score digits** (display, 700, 2.25rem on phone paddles to 3.75rem from sm; 1.5rem to 2.25rem elsewhere): numbers are display type, with tabular figures in tables and scores.

### Named Rules
**The Banner Width Rule.** Display type is widened on Anek's width axis (112 for headlines, 118 for the banner and the curtain call). Body text never is.

**The Kar and Fola Rule.** Bangla display text gets line-height 1.25 instead of 1.05, and no text sits in a fixed height that could clip vowel signs above or below the line.

**The Bangla Numeral Rule.** In Bangla mode every number, including scores and paddle digits, renders in Bangla numerals.

## Layout

Mobile-first, single column at 375px, widening to a centred container (max 80rem) with a 16px gutter on phones and 24px from sm. Sections breathe on a 64px vertical rhythm, rising to 80 to 96px at sm. Breakpoints are Tailwind's defaults (sm 640, md 768, lg 1024).

The stage is a three-part row at lg: rounds on the left, the judged entry centre, the podium at the right, all standing on the floor (aligned to the bottom). On phones the entry and paddles come first, then rounds, then the podium, and a white stage button under the sub line gives the action without scrolling. Light sections use asymmetric two-column grids at lg (1fr / 2fr, or content beside a panel). Contest rows scroll horizontally on phones with snap points, one card at about 78% width, and become 2 to 4 column grids from sm. The running order is a printed programme in the full container: three rows divided by navy rules (a 2px night rule on top, hairline night rules between), each a 12rem / 1fr / 18rem grid at md holding the round name, its description and a "what comes next" column behind a hairline divider. A round name splits before its " · ": the round number as a display line, the round's verb beneath it as a 1.25rem indigo-ink line, so the break never strands the dot.

## Elevation & Depth

Depth is stage lighting, not a card stack. The auditorium is flat: cards and panels sit on hairline borders and turn indigo-bordered on hover. On the stage, objects stand in the light and cast long, soft, downward shadows on the navy, and the curtain carries depth in its pleats (a repeating fold gradient of indigo, `#3d3bb0` shadow folds and `#7c7af5` highlight folds, darkening to navy at the floor). The spotlight is a clipped trapezoid cone of warm white blended with `screen`, so it lights what it falls on and never tints it. The floor carries a 2px lit horizon and faint vertical board seams every 7rem; the stats band below it is solid navy, its stat markers plain white dots at 50%.

### Shadow Vocabulary
- **Entry in the light** (`box-shadow: 0 24px 50px -20px rgba(0,0,0,0.65)`): the framed entry at centre stage.
- **Paddle** (`box-shadow: 0 12px 20px -10px rgba(0,0,0,0.7)`): both faces of a judge's paddle.
- **Seal** (`box-shadow: 0 10px 20px -10px rgba(0,0,0,0.6)`): the honey verification seal.
- **Podium** (`box-shadow: 0 -12px 40px -20px rgba(0,0,0,0.5)`): the podium plaque, lit from below the floor line.
- **Credential** (`box-shadow: 0 18px 40px -28px rgba(24,31,56,0.45)`): the scorecard on light or dark grounds.
- **Hung frame** (`box-shadow: 0 2px 0 #e3e2f0, 0 18px 30px -18px rgba(30,30,46,0.5)`): winners' work in the showcase, hung like framed pictures.

### Named Rules
**The One Spotlight Rule.** The spotlight is the only glow in the system. A stage has exactly one, falling on the entry being judged; nothing else on the page emits light or carries a glow shadow.

**The Flat Auditorium Rule.** Light sections are flat. Shadows belong to objects on the stage and to framed or credential objects that are being presented.

## Shapes

Round and soft. Every button, chip, tag, toggle and round marker is a full pill or circle. Paddles and the seal are circles; paddles hang on a 10px wooden handle (`#b8895a`, 32px tall on phones, 56px from sm) with a rounded foot. Panels and sections that hold content use generous corners (24px); contest cards and inputs use 16px; the stage entry has a 12px corner inside a 10px white mat. Showcase frames are the one near-square form (2px corner, 10px white mat, a hairline outline), because they are picture frames. The podium is rounded only on top (24px), so it stands on the floor. The 7-step rubric unit is always seven equal rounded cells in a fixed grid; it never stretches into a bar.

## Components

### Buttons
Confident pills, sized for a thumb.
- **Shape:** full pill (`pill`), minimum height 44px, primary actions 48 to 56px.
- **Primary:** indigo with white semibold text; hover goes to deep indigo. Used for find, join and sign-up on light grounds and on the podium.
- **Stage button:** white with night text on the stage and curtain; hover goes to indigo wash.
- **Outline:** 2px indigo border, indigo-ink text, for "remind me" on upcoming contests; turns leaf when set.
- **Quiet:** hairline border on white for secondary actions; text links on the curtain underline on hover.
- **Focus:** a 3px indigo outline offset 3px; white on the stage.

### Chips
- **Age chips** (podium): white pills with a hairline border, 44px tall, in a 2-column grid; hover borders indigo; selected fills indigo with white text.
- **Filter chips** (contest lists): white pills; selected fills ink with white text.
- **Card tags:** small pills on the poster: white at 90% for age and format, leaf-ink for free, ink for paid fee, indigo with a white ring for "round x of y".

### Cards / Containers
- **Contest card:** 16px corners, white, hairline border turning indigo on hover; a 16:9 poster on top, then organiser, title (whole card is the link), prize in honey ink, sponsor, and a status line with one full-width action pinned to the bottom. Ended contests desaturate the poster.
- **Panels:** 24px corners; white panels on night bands, or hairline-bordered transparent panels for the secondary offer.
- **Internal padding:** 16px in cards, 20px on the podium, 28 to 36px in panels.

### Inputs / Fields
- **Style:** paper fill, hairline border, 16px corners, 48px tall, indigo caret, soft-ink placeholder.
- **Focus:** border turns indigo.

### Navigation
- **Header:** sticky, paper at 85% with backdrop blur and a hairline bottom border; pill nav links with indigo-wash hover and current state.
- **Mobile tab bar:** fixed white bar with four drawn icons over labels, 64px tall, respecting the safe area; hidden where a page has its own sticky action bar.

### Judge's Paddle (signature)
A round white paddle (80px on phones, 112px from sm) on a wooden handle with a large night-indigo score digit (2.25rem, 3.75rem from sm) and the criterion name beneath. Each paddle is a toggle button; pressing it flips the paddle on the Y axis (500ms, `cubic-bezier(0.16,1,0.3,1)`) to an indigo-wash back that says what earns a 7 in small semibold text (0.75rem, 13px from sm), announced in a polite live region. Hover lifts the paddle 4px.

### Verification Seal (signature)
A 64px honey circle with a 4px white rim, a check and a two-word verdict, tilted -12deg and overlapping the entry's top-right corner. It stamps in last.

### Skill Scorecard (signature)
A credential card: navy header with the student's name in display type, one row per rubric criterion with its 1 to 7 score and a 7-cell unit (filled indigo, empty indigo wash), honey-wash learner-profile badges, the judge's comment on paper, and a leaf verification footer with the verify link in mono.

### Motion
One authored sequence per stage on load: the paddles rise in turn (560ms, `cubic-bezier(0.16,1,0.3,1)`, staggered 160ms from 200ms), then the seal stamps (460ms, same curve, at 0.9s). Only transform moves; every frame is complete, so a still frame is never missing anything. Under reduced motion all of it is off and the paddle flip is instant.

## Do's and Don'ts

### Do:
- **Do** open and close a stage page with the curtain over the navy floor, and keep the sections between them light (paper and white).
- **Do** keep one spotlight per stage, on the entry being judged, blended with `screen`; it is the only glow.
- **Do** use indigo for every action and honey only for what is earned or verified.
- **Do** widen display type on Anek's width axis (112 for headlines, 118 for banners) and give Bangla display line-height 1.25.
- **Do** draw icons as SVG on the 24px grid with a 2px round stroke.
- **Do** keep tap targets at 44px minimum and primary actions at 48 to 56px.
- **Do** show the 1 to 7 rubric as seven equal cells, never a stretched bar.
- **Do** mark every sample number "(নমুনা)" on screen until verified numbers arrive.

### Don't:
- **Don't** use honey for buttons, hovers, decorative accents or highlights.
- **Don't** use crimson for anything but deadlines and errors.
- **Don't** add a second spotlight, a glow shadow, a lit lamp or a gradient wash anywhere.
- **Don't** use emoji or text glyphs as icons.
- **Don't** add all-caps eyebrow labels or kickers above headings.
- **Don't** put arrows on buttons; the label says what happens.
- **Don't** animate opacity in on load; motion moves transforms only, and stops under reduced motion.
- **Don't** set Bangla text in fixed heights that clip kar and fola.
