---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/home"]
---

# Homepage

Scope: `/` (src/app/page.tsx and src/components/home/*). Visitor mode: Persuade.

Audience: students (preschool to HSC; Tanvir on a budget Android from a Facebook link) and parents deciding whether to trust Beejoyi. Job in the first 10 seconds: understand and trust the contest loop (learn, submit, 1–7 feedback, improve, scorecard). Action: find a contest for your age (age chips plus search, working in the hero). Proof: the open 1–7 rubric, blind judging, a scorecard for every finisher, CSR-sponsored free contests; all numbers are samples, marked (নমুনা). Constraints: logo, indigo #6563F1, honey #FFC329 (rewards only), crimson (deadlines only), Anek Bangla; Bangla first; 375 px; light pages.

## Direction contract

THESIS: A contest is a show in rounds, judged in the open. The homepage is the stage of a TV inter-school debate, where judges raise 1–7 paddles over a student's entry. It refuses the category default: a headline, search and a row of feature cards on white.

OWN-WORLD:
- **Stage:** night navy #181F38 floor, with an indigo #6563F1 / #4846D2 pleated curtain as the backdrop.
- **Spotlight:** one honey spotlight cone, the only glow on the page, which falls on the entry being judged.
- **Paddles:** round white paddles on wooden handles, with large Anek digits.
- **Podium:** a white podium plaque holding the action.
- **Seal:** a honey verification seal.
- **Elsewhere:** light sections are the auditorium in paper and white. The world returns in the rounds running order, the judges' table and the curtain call.

STORY:
- **Understand:** every contest runs in rounds, with learning first, feedback in the middle and a scorecard at the end.
- **Believe:** judging is open, blind and on a published 1–7 rubric, nobody leaves empty-handed, and sponsors make it free.
- **Act:** pick your age or search, and join a contest.

FIRST VIEWPORT: The full-width stage under the site header, about 640 px high on desktop.
- **Banner headline:** centred at the top of the curtain. Display 5–6 rem, wdth 118.
- **Sub line:** one line below the headline, explaining the loop.
- **Entry:** a student's drawing in a white frame at centre-stage, in the spotlight cone.
- **Paddles:** three judges' paddles below it read ৫, ৬ and ৭ with criterion names. They are buttons; tapping one shows what earns a 7.
- **Rounds strip:** on the stage floor at the left, reading রাউন্ড ১ শেখো, then রাউন্ড ২ ফিডব্যাক (lit), then চূড়ান্ত.
- **Podium plaque:** at the right, holding the age chips, search and an indigo "কনটেস্ট খোঁজো" button. This is the primary action.
- **Footlights:** a strip of sample stats below.
- **On mobile:** headline, sub, entry with paddles, rounds, then the podium.
- **Signature interaction:** flip a paddle to read the rubric.
- **Motion grammar:** one sequence on load. The paddles rise in turn, then the seal stamps the entry. With reduced motion, everything is static.

FORM: Direction 3 of the ordered list (the debate stage). seed:7bd4e4caaed9853d

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Raises kept from declined challengers:
- **Algorave:** the next round is shown before it starts.
- **Understory:** one spotlight only.
- **Glaze shelf:** winners appear in one row with their process notes.
- **Dossier:** the seal lands last, as the one hard motion.
- **Gridsmith:** the 7-cell score unit never stretches.

Memorable moment: judges raising paddles over a child's drawing, and you can flip each one.
