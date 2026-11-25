"use client";

/**
 * What a winner submitted, shown on their card: a photo (art, nature) or a
 * recording (speech). Visitors judge a contest by its winning work, so seeing
 * it is the proof (social proof + recognition over recall).
 *
 * The scenes and playback are placeholders until real entries come from the API.
 */

import { Dialog } from "@base-ui/react/dialog";
import { useEffect, useState } from "react";
import { detail, num, type Contest, type Lang } from "@/lib/content";
import { useHome } from "@/lib/home-state";

const e = detail.entry;

/* ---------- Photo ---------- */

const birdSkies = [
  { top: "#F6C98B", bottom: "#9CC9C4", body: "#1E78B4", belly: "#E8742C", beak: "#C8452B" },
  { top: "#8FA3B3", bottom: "#DCE3E8", body: "#33333D", belly: "#5A5A66", beak: "#F2B705" },
  { top: "#7FB77E", bottom: "#E4F1D6", body: "#7A4B2A", belly: "#E9D7B8", beak: "#2B2B2B" },
];

const drawings = [
  { sun: "#FFC329", roof: "#C8133F", wall: "#F4A259", grass: "#7CC59A" },
  { sun: "#FF8A3D", roof: "#6563F1", wall: "#FFE3A1", grass: "#3FA36B" },
  { sun: "#FFD84D", roof: "#1F8A5B", wall: "#F7B2C4", grass: "#9BD17A" },
];

/** A sample bird photo (nature) or a child's drawing (art). */
export function PhotoScene({ kind, i }: { kind: "bird" | "drawing"; i: number }) {
  if (kind === "drawing") {
    const d = drawings[i % drawings.length];
    return (
      <svg viewBox="0 0 160 120" className="block h-full w-full" aria-hidden>
        <rect width="160" height="120" fill="#FFFDF7" />
        <circle cx={i === 1 ? 30 : 128} cy="28" r="14" fill={d.sun} />
        <path d="M0 92 Q40 80 80 90 T160 86 V120 H0Z" fill={d.grass} />
        <path d={`M${54 + i * 6} 92 V66 L${74 + i * 6} 48 L${94 + i * 6} 66 V92Z`} fill={d.wall} />
        <path d={`M${50 + i * 6} 68 L${74 + i * 6} 44 L${98 + i * 6} 68Z`} fill={d.roof} />
        <rect x={68 + i * 6} y="74" width="12" height="18" fill="#1E1E2E" />
        <path d="M118 94 V74" stroke="#5C3A1E" strokeWidth="4" />
        <circle cx="118" cy="68" r="12" fill={d.grass} />
      </svg>
    );
  }
  const s = birdSkies[i % birdSkies.length];
  const id = `sky-${i}`;
  return (
    <svg viewBox="0 0 160 120" className="block h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.top} />
          <stop offset="1" stopColor={s.bottom} />
        </linearGradient>
      </defs>
      <rect width="160" height="120" fill={`url(#${id})`} />
      {/* rain */}
      {Array.from({ length: 14 }, (_, n) => (
        <path key={n} d={`M${(n * 23 + i * 9) % 160} ${(n * 37) % 70} l-4 12`} stroke="#FFFFFF" strokeWidth="1.5" opacity="0.55" strokeLinecap="round" />
      ))}
      {/* branch */}
      <path d="M-4 92 Q60 78 168 88" stroke="#4A3423" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M118 84 q10 -14 24 -14" stroke="#4A3423" strokeWidth="3" fill="none" />
      <ellipse cx="146" cy="68" rx="8" ry="4" fill="#3F7A3A" transform="rotate(-20 146 68)" />
      {/* bird */}
      <g transform={`translate(${62 + i * 8} 0)`}>
        <path d="M-6 74 L-26 88 L-18 76Z" fill={s.body} />
        <ellipse cx="6" cy="68" rx="18" ry="13" fill={s.body} />
        <ellipse cx="10" cy="73" rx="11" ry="7" fill={s.belly} />
        <circle cx="22" cy="54" r="9" fill={s.body} />
        <circle cx="25" cy="52" r="2" fill="#FFFFFF" />
        <circle cx="25.5" cy="52" r="1" fill="#1E1E2E" />
        <path d="M30 54 L42 57 L30 58Z" fill={s.beak} />
        <path d="M2 80 v6 M10 80 v6" stroke="#4A3423" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function PhotoEntry({ kind, i, name, place }: { kind: "bird" | "drawing"; i: number; name: string; place: string }) {
  const { tr } = useHome();
  const label = `${name}${tr(kind === "bird" ? e.photoOf : e.drawingOf)}`;
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label={`${label}: ${tr(e.enlarge)}`}
        className="group/photo relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden"
      >
        <PhotoScene kind={kind} i={i} />
        <span className="absolute right-2 bottom-2 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover/photo:opacity-100 group-focus-visible/photo:opacity-100">
          {tr(e.enlarge)}
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/80 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,48rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white transition-all data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          <div className="aspect-[4/3] w-full">
            <PhotoScene kind={kind} i={i} />
          </div>
          <div className="flex items-center justify-between gap-4 p-4">
            <Dialog.Title className="font-semibold">
              {place} · {label}
            </Dialog.Title>
            <Dialog.Close className="min-h-11 shrink-0 rounded-full border border-line px-4 font-semibold hover:bg-paper">
              {tr(e.close)}
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ---------- Recordings ---------- */

const clock = (s: number, lang: Lang) => num(`${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`, lang);

/** Simulated playback so the prototype feels real without media files. */
function usePlayback(secs: number) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((x) => {
        if (x + 0.25 >= secs) {
          setPlaying(false);
          return 0;
        }
        return x + 0.25;
      });
    }, 250);
    return () => clearInterval(id);
  }, [playing, secs]);
  return { playing, elapsed, toggle: () => setPlaying((p) => !p) };
}

function PlayIcon({ playing, className }: { playing: boolean; className?: string }) {
  return playing ? (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" fill="currentColor" />
    </svg>
  );
}

const stageTints = ["#3B2A6B", "#1F4B5C", "#5C2A3B"];

export function VideoEntry({ i, secs, name }: { i: number; secs: number; name: string }) {
  const { tr, lang } = useHome();
  const { playing, elapsed, toggle } = usePlayback(secs);
  const tint = stageTints[i % stageTints.length];
  return (
    <div className="relative aspect-video w-full overflow-hidden" style={{ background: `radial-gradient(circle at 50% 30%, ${tint}, #12121C 75%)` }}>
      {/* a child reciting at a mic, on stage */}
      <svg viewBox="0 0 160 90" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* figure sits left of centre so the play button doesn't cover the face */}
        <g transform="translate(-34 0)">
        <ellipse cx="80" cy="86" rx="46" ry="6" fill="#FFFFFF" opacity="0.08" />
        <circle cx="80" cy="34" r="10" fill="#E8B48C" />
        <path d="M70 30 Q80 18 90 30 Q88 22 80 22 Q72 22 70 30Z" fill="#1E1E2E" />
        <path d="M64 90 V58 Q64 46 80 46 Q96 46 96 58 V90Z" fill={i === 1 ? "#1F8A5B" : "#FFC329"} />
        <path d="M104 90 V52" stroke="#9A9AB0" strokeWidth="2" />
        <rect x="100" y="42" width="8" height="12" rx="4" fill="#C9C9D6" />
        </g>
      </svg>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={`${name}${tr(e.videoOf)}: ${tr(playing ? e.pause : e.play)}`}
        className={`absolute inset-0 grid place-items-center transition-opacity ${playing ? "opacity-0 hover:opacity-100 focus-visible:opacity-100" : ""}`}
      >
        <span className="grid size-14 place-items-center rounded-full bg-white/90 text-ink shadow-lg">
          <PlayIcon playing={playing} className="size-6" />
        </span>
      </button>
      <span className="pointer-events-none absolute right-2 bottom-3 rounded-md bg-black/60 px-1.5 py-0.5 text-xs font-semibold text-white tabular-nums">
        {playing ? `${clock(elapsed, lang)} / ${clock(secs, lang)}` : clock(secs, lang)}
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-white/20">
        <span className="block h-full bg-indigo transition-[width] duration-200 ease-linear" style={{ width: `${(elapsed / secs) * 100}%` }} />
      </span>
    </div>
  );
}

// Fixed waveform so server and client render the same bars.
const wave = [6, 10, 14, 9, 18, 22, 15, 11, 20, 26, 19, 13, 9, 16, 24, 20, 12, 8, 14, 21, 17, 10, 6, 12, 18, 13, 8, 5];

export function AudioEntry({ secs, name }: { secs: number; name: string }) {
  const { tr, lang } = useHome();
  const { playing, elapsed, toggle } = usePlayback(secs);
  const done = Math.round((elapsed / secs) * wave.length);
  return (
    <div className="flex aspect-video w-full flex-col justify-center gap-3 bg-indigo-wash px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={`${name}${tr(e.audioOf)}: ${tr(playing ? e.pause : e.play)}`}
          className="grid size-12 shrink-0 place-items-center rounded-full bg-indigo text-white hover:bg-indigo-ink"
        >
          <PlayIcon playing={playing} className="size-5" />
        </button>
        <span className="flex h-10 min-w-0 flex-1 items-center gap-[3px]" aria-hidden>
          {wave.map((h, n) => (
            <span key={n} className={`w-full rounded-full ${n < done ? "bg-indigo" : "bg-indigo/30"}`} style={{ height: `${(h / 26) * 100}%` }} />
          ))}
        </span>
      </div>
      <span className="text-right text-xs font-semibold text-indigo-ink tabular-nums">
        {playing ? `${clock(elapsed, lang)} / ${clock(secs, lang)}` : clock(secs, lang)}
      </span>
    </div>
  );
}

/* ---------- The winners block, shaped by the contest format ---------- */

function PlaceBadge({ i, label, big }: { i: number; label: string; big?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-display text-sm font-bold ${big ? "size-12 sm:size-14" : "size-12"} ${
        i === 0 ? "bg-honey text-ink" : "bg-paper text-ink-soft"
      }`}
    >
      {label}
    </span>
  );
}

const cardTone = (i: number) => (i === 0 ? "border-honey bg-honey-wash" : "border-line bg-white");

/** Top three, side by side from tablet up so they compare at a glance; stacked on phones. */
export function Winners({ c }: { c: Contest }) {
  const { tr, lang } = useHome();
  const f = c.format;

  /* Debate: the team is the winner */
  if (f === "debate") {
    return (
      <>
        <ol className="grid gap-4 sm:grid-cols-3">
          {detail.winnerTeams.map((w, i) => (
            <li key={i} className={`flex flex-col gap-4 rounded-2xl border p-5 ${cardTone(i)}`}>
              <div className="flex items-start justify-between gap-3">
                <PlaceBadge i={i} label={tr(w.place)} />
                <span className="font-display text-3xl font-semibold">{num(w.score, lang)}</span>
              </div>
              <div>
                <p className="display text-xl font-bold">{tr(w.team)}</p>
                <p className="text-sm text-ink-soft">{tr(w.school)}</p>
              </div>
              <div className="mt-auto border-t border-ink/10 pt-3">
                <ul className="flex items-center" aria-hidden>
                  {w.members.map((m, n) => (
                    <li
                      key={n}
                      title={tr(m)}
                      className={`grid size-9 place-items-center rounded-full border-2 border-white text-sm font-bold ${
                        ["bg-indigo text-white", "bg-leaf-ink text-white", "bg-honey text-ink"][n]
                      } ${n ? "-ml-2" : ""}`}
                    >
                      {tr(m).slice(0, lang === "bn" ? 2 : 1)}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-ink-soft"><span className="sr-only">{tr(detail.teamOf)}: </span>{w.members.map((m) => tr(m)).join(", ")}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-ink-soft">{tr(detail.winnersNote)}</p>
      </>
    );
  }

  /* Quiz: score, with time as the tie-breaker */
  if (f === "quiz") {
    return (
      <>
        <ol className="grid gap-3 sm:grid-cols-3">
          {detail.winnersList.map((w, i) => (
            <li key={i} className={`flex items-center gap-4 rounded-2xl border p-4 sm:flex-col sm:gap-2 sm:p-5 sm:text-center ${cardTone(i)}`}>
              <PlaceBadge i={i} label={tr(w.place)} big />
              <span className="min-w-0 flex-1 sm:mt-1">
                <span className="block font-semibold leading-snug text-pretty break-words">{tr(w.name)}</span>
                <span className="block text-sm text-ink-soft">{tr(w.cls)}</span>
              </span>
              <span className="text-right sm:mt-auto sm:pt-2 sm:text-center">
                <span className="block font-display text-xl font-semibold sm:text-3xl">{num(w.score, lang)}</span>
                <span className="block text-xs text-ink-soft tabular-nums">
                  {tr(detail.quizTime)} {clock(detail.quizSecs[i], lang)}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-ink-soft">{tr(detail.winnersNote)}</p>
      </>
    );
  }

  /* Photo, video, audio: the entry itself leads the card */
  const scene = c.cat === "nature" ? "bird" : "drawing";
  return (
    <>
      <ol className="grid gap-4 sm:grid-cols-3">
        {detail.winnersList.map((w, i) => (
          <li key={i} className={`flex flex-col overflow-hidden rounded-2xl border ${cardTone(i)}`}>
            {f === "photo" ? (
              <PhotoEntry kind={scene} i={i} name={tr(w.name)} place={tr(w.place)} />
            ) : f === "video" ? (
              <VideoEntry i={i} secs={detail.recordingSecs[i]} name={tr(w.name)} />
            ) : (
              <AudioEntry secs={detail.recordingSecs[i]} name={tr(w.name)} />
            )}
            <div className="flex items-center gap-3 p-4">
              <PlaceBadge i={i} label={tr(w.place)} />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold leading-snug text-pretty break-words">{tr(w.name)}</span>
                <span className="block text-sm text-ink-soft">{tr(w.cls)}</span>
              </span>
              <span className="font-display text-2xl font-semibold">{num(w.score, lang)}</span>
            </div>
            {/* The work and the thinking behind it, side by side (finalist gallery card) */}
            <div className="mt-auto border-t border-ink/10 px-4 pt-3 pb-4 text-sm">
              <p className="font-semibold text-ink-soft">{tr(detail.processOf)}</p>
              <p className="mt-1">{tr(detail.processNotes[i])}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-ink-soft">{tr(e.mediaNote)}</p>
    </>
  );
}
