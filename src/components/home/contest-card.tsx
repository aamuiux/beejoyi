"use client";

import Link from "next/link";
import { useState } from "react";
import { JoinDialog, joinLabel } from "@/components/contests/join-dialog";
import { FormatIcon, HandshakeIcon, TrophyIcon } from "@/components/icons";
import { ages, detail, formats, num, statusOf, t, type Contest } from "@/lib/content";
import { useHome } from "@/lib/home-state";
import { PosterArt } from "./poster-art";

export function ContestCard({ c }: { c: Contest }) {
  const { lang, tr } = useHome();
  const status = statusOf(c);
  const [reminded, setReminded] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
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
            c.fee === 0 ? "bg-leaf-ink text-white" : "bg-ink text-white"
          }`}
        >
          {c.fee === 0 ? tr(t.contests.free) : `৳${num(c.fee, lang)}`}
        </span>
        {/* How you take part, so nobody joins a video contest expecting a quiz */}
        <span className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-ink">
            <FormatIcon format={c.format} className="size-3.5" />
            {tr(formats[c.format].label)}
          </span>
          {/* Multi-round contests say so up front: it's a journey, not a one-off upload */}
          {c.round && (
            <span className="rounded-full bg-indigo px-2.5 py-0.5 text-xs font-semibold text-white ring-2 ring-white/90">
              {tr(detail.roundOf).replace("{now}", num(c.round.now, lang)).replace("{of}", num(c.round.of, lang))}
            </span>
          )}
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
        <p className="flex items-start gap-1.5 text-sm font-medium text-honey-ink">
          <TrophyIcon className="mt-0.5 size-4 shrink-0" />
          {tr(c.prize)}
        </p>
        {/* Free because a sponsor pays: say who, so "free" doesn't read like a catch */}
        {c.sponsor && (
          <p className="-mt-1 flex items-start gap-1.5 text-sm text-ink-soft">
            <HandshakeIcon className="mt-0.5 size-4 shrink-0 text-indigo-ink" />
            <span>
              {tr(detail.sponsor.by)} <span className="font-medium text-ink">{tr(c.sponsor)}</span>
            </span>
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 border-t border-line pt-3 text-sm">
          {/* Status line: the facts that decide "should I act now?" */}
          <div className="flex items-center justify-between gap-2">
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
              <span className="text-ink-soft">
                {num(c.startsIn ?? 0, lang)} {tr(t.list.startsIn)}
              </span>
            )}
            {status === "ended" && (
              <>
                <span className="text-ink-soft">
                  {num(c.joined, lang)} {tr(t.list.entries)}
                </span>
                <span className="font-semibold text-leaf-ink">{tr(t.list.resultsOut)}</span>
              </>
            )}
          </div>

          {/* One action per card, always in the same spot (Jakob, Fitts). The label says what happens. */}
          {status === "open" && (
            <button
              type="button"
              onClick={() => setJoinOpen(true)}
              className="relative z-10 min-h-12 w-full rounded-full bg-indigo px-4 text-base font-semibold text-white hover:bg-indigo-ink"
            >
              {joinLabel(c, tr, lang)}
            </button>
          )}
          {status === "upcoming" && (
            <button
              type="button"
              onClick={() => setReminded(true)}
              aria-pressed={reminded}
              className="relative z-10 min-h-12 w-full rounded-full border-2 border-indigo px-4 text-base font-semibold text-indigo-ink hover:bg-indigo-wash aria-pressed:border-leaf aria-pressed:text-leaf-ink"
            >
              {reminded ? `✓ ${tr(t.list.reminded)}` : tr(t.list.remind)}
            </button>
          )}
          {status === "ended" && (
            <Link
              href={`/contests/${c.id}#winners`}
              className="relative z-10 flex min-h-12 w-full items-center justify-center rounded-full bg-leaf-ink px-4 text-base font-semibold text-white hover:bg-[#10543a]"
            >
              {tr(t.list.seeWinners)}
            </Link>
          )}
        </div>
      </div>
      {status === "open" && <JoinDialog c={c} open={joinOpen} onOpenChange={setJoinOpen} />}
    </article>
  );
}
