# Entry submission page (`/contests/[id]/submit`): strategy

Builds on [contest-detail-strategy.md](contest-detail-strategy.md).

## The one job
> **Let a parent (or student) upload the entry from their phone, on a patchy connection, in one sitting, and be certain it arrived.**

Most submissions will come from a mid-range Android phone, often a parent photographing a child's drawing. The design assumes a small screen, a slow or dropping connection, and someone who is not confident with file formats.

## Layout: one page, three numbered parts (a real sequence)

```
‹ back to contest          Contest title · ⏳ ২ দিন বাকি
──────────────────────────────────────────────
① কার জমা?          [Ayesha ▾]  (pre-filled from join)
② তোমার কাজ         subject-specific:
     art / nature  →  [📷 ছবি তোলো] [🖼 গ্যালারি থেকে]  → preview + replace/remove
     speech        →  [🎥 ভিডিও] [🎙 অডিও]             → player preview
     writing       →  (লিখে দাও | ছবি/PDF দাও)  textarea with live word count
     science       →  PDF + optional video
     sports        →  no upload: "venue" notice instead
     + title / caption field
③ শেষবার দেখে নাও   ☐ এটা আমার নিজের কাজ   ☐ নিয়ম পড়েছি
                    ☐ (child) অভিভাবক হিসেবে শোকেসে দেখানোর অনুমতি দিচ্ছি (optional)
──────────────────────────────────────────────
sticky:  [ জমা দাও ]   (disabled with the reason until ready)
```

## Decisions and UX laws

| Decision | Why |
|---|---|
| Camera and gallery buttons, not a generic "Choose file" | People recognise the action they want (**recognition over recall**). On a phone, "ছবি তোলো" opens the camera directly. |
| File type and size are checked **before** upload, with a plain-language fix | "ফাইলটা ২৪ MB, সর্বোচ্চ ১০ MB। ফোনের ক্যামেরা সেটিং-এ ছবির সাইজ কমিয়ে আবার তোলো।" **Error prevention** beats error messages (Nielsen #5, #9). |
| An instant preview with Replace / Remove | Shows the system state; easy undo (Nielsen #1, #3). |
| A progress bar with percent; on failure, **Try again** keeps everything else | Slow networks are normal. Nobody should have to retype. |
| Offline banner + **auto-saved draft** (text, caption, checkboxes) | The connection drops mid-way; the draft survives a reload (**Tesler**: the system absorbs the complexity). Files can't be kept offline; the page says so honestly. |
| Live word counter (৩০০–৮০০) that turns green inside the range | Immediate feedback (**Doherty threshold**), with the goal visible (**goal-gradient**). |
| The submit button says *why* it's disabled ("আগে ছবি দাও") | A disabled button with no reason is a dead end. |
| The originality checkbox is required; showcase consent is **optional** and separate | Honest, informed consent from parents; it's never bundled. |
| Success screen: a preview of what was received + "শেষ সময়ের আগে বদলাতে পারবে" | Certainty that it arrived, and reassurance about mistakes (**peak-end**). One next step: back to contests. |
| Re-visiting after submitting shows the submitted entry first, with "Replace" | The last submission counts. The user sees what judges will see. |

## Out of scope for this prototype
Real uploads and storage, in-browser audio recording, image compression on the device, and quiz-taking (science quizzes need their own timed page).
