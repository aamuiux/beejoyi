# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Sources: `docs/Beejoyi_UX_Blueprint_Personas_Journey_Guidelines.docx` and the founder's locked decisions in `CLAUDE.md`.

- **Tanvir, 15, Class IX, Bangla medium, Bogra.** He is the primary learner. He uses a shared budget Android phone, Chrome, on patchy 4G data. He arrives from a Facebook link or a school notice board. English forms, hidden fees and the blank page intimidate him. He wants a national stage, mentors from DU, BUET and Fine Arts, and a certificate to show his parents and headmaster. He enters free or CSR-sponsored challenges.
- **Zara, 16, Class XI, English version, Dhaka.** She is building a portfolio for university applications. She uses a phone and a laptop on fast internet, and pays ৳300–1,000 through bKash or Nagad for mentor-led contests. She wants transparent rubric judging and a skill profile she can share.
- **Parents of young children (preschool to class 5).** They hold the account and add child profiles. They want safety, clear fees and proof of progress.
- **Farhana, 32, CSR or youth lead at a telecom, FMCG company or bank, or a club president.** She is the B2B organiser and sponsor. She wants a contest live in 24–48 hours across 64 districts, without Google Forms chaos, and auditable proof of skill growth.
- **Audience age:** preschool to HSC. There is no university age group, though university students do take part as mentors.

## Product Purpose
Beejoyi (বিজয়ী) is Bangladesh's contest platform. It turns five pillars from the International Baccalaureate (IB) into multi-round contests:
- the Learner Profile
- Approaches to Learning (ATL)
- concept-driven inquiry
- capstone reflection
- 1–7 criterion rubrics

The contests run as Contest-as-a-Service (CaaS), where schools, clubs and brands host contests on the platform.

- **Students** discover contests, join for free or for a fee, learn a little before each round, and submit. They get rubric feedback, improve, and finish with a verified skill scorecard.
- **Organisers and sponsors** run contests from templates and get impact reports.

Success means:
- every finisher leaves with a scorecard, not only the winners;
- rural students take part as easily as Dhaka students;
- sponsors can prove the skill growth they paid for.

## Positioning
The positioning is a cross-subsidy model. Brands' CSR budgets fund free, mentor-led, rubric-judged contests for district and village students. The same engine sells a self-serve contest studio and ESG/skill-lift analytics to sponsors and schools. What competitors can't copy: IB-style process (inquiry, then feedback, then reflection) at the price of a school fest, judged on a published 1–7 rubric instead of popularity votes.

## Operating Context
- **The contest journey:** discovery from a shared link → one-tap phone OTP → Round 1, inquiry (brief, a 3-minute learning card, a guided submission) → Round 2, iteration (1–7 feedback, recorded mentor clinic, reflection) → finale, a capstone with the work and its process shown side by side → credential (scorecard PDF and verify link) → next contest.
- **Formats:** quiz, photo, video, audio and debate. Debate is team-based, with teams of three.
- **Payments:** bKash, Nagad or card. Many contests are free and CSR-sponsored.
- **Organiser side:** Studio templates, a rubric library (Critical Thinking, Creativity, Research, Execution), QR poster kit, district tracker, blind split-screen judging, bulk certificates and an impact report.

## Capabilities and Constraints
- This repo is a redesign prototype in Next.js. The data is sample data, marked "(নমুনা)".
- Bangla is the default, with a one-tap English toggle. Bangla numerals are used in Bangla mode.
- **Low bandwidth:** keep landing and round pages under 500 KB. Compress images on the device before upload, make uploads resumable, and offer text or audio summaries next to mentor video.
- Bangla needs about 15–20% more line-height and padding than English. Never use fixed heights that clip vowel signs (kar and fola).
- **Not built yet:** OTP sign-up, real multi-round state, judge console, Studio, scorecard PDF.

## Brand Commitments
- **Logo and colours:** keep the logo and the brand colours, indigo `#6563F1` for actions and learning states and honey `#FFC329` for achievements and rewards only. Crimson is only for deadlines and errors. Deep navy `#181F38` is allowed for dark bands. This was the founder's decision, which overrides the blueprint's #6967FB and #EAB131.
- **Font:** Anek Bangla for both scripts. This was the founder's decision, which overrides the blueprint's Hind Siliguri with Inter.
- **Tone:** "Coursera meets Figma Community". It is clean, structured and credible, with the energy of a young audience.
- **Labels:** one label means one action. "ফ্রি সাইন আপ" creates an account; "যোগ দাও" joins a contest.

## Evidence on Hand
- All stats, contests, winners and organisations are samples. There are no verified numbers, partner logos or real winning entries yet.
- **Photography:** the blueprint asks for real photos of Bangladeshi youth. None have been supplied, so the drawn placeholder art stays until consented photos arrive. Do not fabricate photos or testimonials.

## Product Principles
1. **No one leaves empty-handed.** Every finisher gets feedback and a scorecard.
2. **No blank-page fear.** Guide every submission with prompts and a short learning step.
3. **Bangla first, and works on a budget phone.** Keep things light, legible and forgiving on 4G.
4. **Judge on a published rubric, not on popularity.** Show the criteria before, during and after.
5. **Show the process as well as the result.** Reflection is part of the work and deters copying from AI.

## Accessibility & Inclusion
- Tap targets of at least 44–48 px. Check every page at a 375 px width.
- Bangla and English must both read well, with no clipped diacritics.
- Assume low-RAM Android phones and patchy data.
