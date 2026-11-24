"use client";

import Link from "next/link";
import { useState } from "react";
import { ages, num, statusOf, t, type Contest } from "@/lib/content";
import { useHome } from "@/lib/home-state";
import { PosterArt } from "./poster-art";

export function ContestCard({ c }: { c: Contest }) {
  const { lang, tr } = useHome();
  const status = statusOf(c);
  const [reminded, setReminded] = useState(false);
  const urgent = status === "open" && c.daysLeft <= 2;
  const ageLabel = c.ages.map((a) => ages.find((x) => x.key === a)!.label[lang]).join(", ");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-indigo">
      <div
        className={`relative aspect-[16/9] p-6 ${status === "ended" ? "saturate-[.35]" : ""}`}
        style={{ background: c.poster.bg }}
      >
        <PosterArt shape={c.poster.shape} ink={c.poster.ink} />
        <span className="absolute top-3 left-3 max-w-[70%] truncate rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-ink">
          {ageLabel}
        </span>
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-bold ${
            c.fee === 0 ? "bg-honey text-ink" : "bg-ink text-white"
          }`}
        >
          {c.fee === 0 ? tr(t.contests.free) : `৳${num(c.fee, lang)}`}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-indigo-wash text-[11px] font-bold text-indigo-ink">
            {c.orgInitial}
          </span>
          <span className="truncate">{tr(c.org)}</span>
        </div>
        <h3 className="line-clamp-2 font-display text-lg leading-snug font-semibold text-ink group-hover:text-indigo-ink">
          {/* Whole card is the click target (Fitts); the stretched link covers it */}
          <Link href={`/contests/${c.id}`} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-3 focus-visible:after:outline-indigo">
            {tr(c.title)}
          </Link>
        </h3>
        <p className="text-sm font-medium text-honey-ink">
          <span aria-hidden>🏆 </span>
          {tr(c.prize)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3 text-sm">
          {status === "open" && (
            <>
              <span className="text-ink-soft">
                {num(c.joined, lang)} {tr(t.contests.joined)}
              </span>
              <span className={urgent ? "font-semibold text-alert" : "text-ink-soft"}>
                {c.daysLeft <= 1 ? tr(t.contests.lastDay) : `${num(c.daysLeft, lang)} ${tr(t.contests.daysLeft)}`}
              </span>
            </>
          )}
          {status === "upcoming" && (
            <>
              <span className="text-ink-soft">
                {num(c.startsIn ?? 0, lang)} {tr(t.list.startsIn)}
              </span>
              <button
                type="button"
                onClick={() => setReminded(true)}
                aria-pressed={reminded}
                className="relative z-10 min-h-9 rounded-full border border-indigo px-3 font-semibold text-indigo-ink hover:bg-indigo-wash aria-pressed:border-leaf aria-pressed:text-leaf"
              >
                {reminded ? `✓ ${tr(t.list.reminded)}` : tr(t.list.remind)}
              </button>
            </>
          )}
          {status === "ended" && (
            <>
              <span className="text-ink-soft">
                {num(c.joined, lang)} {tr(t.list.entries)}
              </span>
              <span className="font-semibold text-leaf">{tr(t.list.seeWinners)}</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
