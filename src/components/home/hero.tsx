"use client";

/**
 * The stage. A contest is a show in rounds, judged in the open: judges raise
 * 1–7 paddles over a student's entry under one spotlight, the rounds sit on the
 * stage floor, and the podium holds the one action (find a contest for your age).
 * Direction contract: .impeccable/surfaces/src-app-page-tsx.md
 */

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { useState } from "react";
import { PhotoScene } from "@/components/contests/winner-entry";
import { CheckIcon } from "@/components/icons";
import { ages, num, t, type AgeKey } from "@/lib/content";
import { useHome } from "@/lib/home-state";

const st = t.stage;

export function Hero() {
  const { tr, lang } = useHome();
  return (
    <section id="top" aria-labelledby="stage-title" className="relative isolate overflow-hidden bg-navy text-white">
      {/* Stage: curtain above, a navy floor with a lit horizon below, one spotlight from above */}
      <div aria-hidden className="curtain absolute inset-x-0 top-0 -z-20 h-[calc(100%-13rem)] lg:h-[calc(100%-11.5rem)]" />
      <div aria-hidden className="stage-floor absolute inset-x-0 bottom-0 -z-20 h-52 lg:h-46" />
      <div aria-hidden className="spotlight absolute top-0 left-1/2 -z-10 h-[calc(100%-6rem)] w-[min(52rem,150vw)] -translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:pt-10">
        {/* Banner */}
        <div className="mx-auto max-w-6xl text-center">
          <h1
            id="stage-title"
            className="display text-[clamp(2.5rem,6.6vw,5.5rem)] font-bold text-balance"
            style={{ fontVariationSettings: '"wdth" 118' }}
          >
            {tr(st.title)}
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-lg text-white/85 sm:text-xl">{tr(st.sub)}</p>
          {/* Phones: the action can't wait for the podium at the bottom of the stage */}
          <a
            href="#contests"
            id="stage-cta"
            className="mt-6 inline-flex min-h-13 items-center rounded-full bg-white px-7 text-lg font-semibold text-night hover:bg-indigo-wash lg:hidden"
          >
            {tr(st.find)}
          </a>
        </div>

        {/* The stage row: rounds | entry under judgement | podium. All three stand on the floor. */}
        <div
          id="stage"
          className="mt-8 flex flex-col items-center gap-8 lg:mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-end lg:gap-10"
        >
          <Rounds />
          <Judged />
          <Podium />
        </div>
      </div>

      {/* Footlights: sample stats, each marked as a sample */}
      <div className="border-t border-white/15 bg-navy">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
            {t.trust.items.map((s) => (
              <div key={s.nEn} className="flex items-baseline gap-2">
                <span aria-hidden className="size-2 shrink-0 bg-white/50 translate-y-[-0.2em] rounded-full" />
                <div>
                  <dt className="sr-only">{tr(s.label)}</dt>
                  <dd className="display text-2xl font-bold">
                    {lang === "bn" ? s.n : s.nEn}{" "}
                    <span className="align-middle text-xs font-medium text-white/60" style={{ fontVariationSettings: "normal" }}>
                      {tr(st.sample)}
                    </span>
                  </dd>
                  <dd className="text-sm text-white/70">{tr(s.label)}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** Centre stage: one entry under the spotlight, three judges' paddles that flip to show the rubric. */
function Judged() {
  const { tr, lang } = useHome();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <figure id="judged" className="order-first flex flex-col items-center lg:order-none">
      <div className="relative">
        <div className="w-56 overflow-hidden rounded-xl border-[10px] border-white bg-white shadow-[0_24px_50px_-20px_rgba(0,0,0,0.65)] sm:w-64 lg:w-64">
          <div className="aspect-[4/3]">
            <PhotoScene kind="drawing" i={0} />
          </div>
        </div>
        {/* The seal lands last: verified, on a published rubric */}
        <span
          aria-hidden
          className="seal-stamp absolute -top-7 -right-9 grid size-16 place-items-center rounded-full border-4 border-white bg-honey text-center text-ink shadow-[0_10px_20px_-10px_rgba(0,0,0,0.6)]"
        >
          <span className="flex flex-col items-center text-[10px] leading-tight font-bold">
            <CheckIcon className="size-5" />
            {tr(st.verified)}
          </span>
        </span>
      </div>
      <figcaption className="mt-2 text-sm text-white/80">{tr(st.entryLabel)}</figcaption>

      {/* Paddles: tap one and it flips to show what earns a 7 (signature interaction) */}
      <div role="group" aria-label={tr(st.paddlesLabel)} className="mt-4 flex items-end gap-4 sm:gap-5">
        {st.paddles.map((p, i) => {
          const flipped = open === i;
          return (
            <button
              key={i}
              type="button"
              aria-pressed={flipped}
              onClick={() => setOpen(flipped ? null : i)}
              className="paddle-rise group flex w-20 flex-col items-center rounded-2xl focus-visible:outline-white sm:w-28"
              style={{ animationDelay: `${200 + i * 160}ms` }}
            >
              <span className="relative block size-20 [perspective:600px] sm:size-28">
                <span
                  className={`relative block size-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] motion-reduce:transition-none ${
                    flipped ? "[transform:rotateY(180deg)]" : "group-hover:-translate-y-1"
                  }`}
                >
                  {/* Front: the score */}
                  <span className="display absolute inset-0 grid place-items-center rounded-full bg-white text-4xl font-bold text-night shadow-[0_12px_20px_-10px_rgba(0,0,0,0.7)] [backface-visibility:hidden] sm:text-6xl">
                    {num(p.score, lang)}
                  </span>
                  {/* Back: what earns a 7 */}
                  <span className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-indigo-wash px-2.5 text-center text-xs leading-snug sm:text-[13px] font-semibold text-night shadow-[0_12px_20px_-10px_rgba(0,0,0,0.7)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="text-xs font-bold text-indigo-ink">{tr(st.sevenShort)}</span>
                    {tr(p.short)}
                  </span>
                </span>
              </span>
              <span aria-hidden className="h-8 w-2.5 rounded-b bg-[#B8895A] sm:h-14" />
              <span className="mt-1.5 text-center text-sm leading-snug font-medium text-white">{tr(p.name)}</span>
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-2 min-h-10 max-w-xs text-center text-sm text-white/85">
        {open === null ? (
          tr(st.paddlesLabel)
        ) : (
          <>
            <span className="font-semibold text-white">{tr(st.sevenMeans)}</span> {tr(st.paddles[open].top)}
          </>
        )}
      </p>
    </figure>
  );
}

/** Stage floor, left: the running order. The next round is visible before it starts. */
function Rounds() {
  const { tr } = useHome();
  return (
    <div className="flex flex-col items-center gap-3 lg:mb-10 lg:items-start">
      <ol aria-label={tr(st.roundsLabel)} className="flex flex-wrap justify-center gap-2 lg:flex-col lg:items-start lg:gap-3">
        {st.rounds.map((r, i) => (
          <li
            key={i}
            aria-current={i === 1 ? "step" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${i === 1 ? "bg-white text-night" : "border border-white/35 text-white/85"}`}
          >
            {tr(r)}
          </li>
        ))}
      </ol>
      <p className="max-w-60 text-center text-sm text-white/80 lg:text-left">{tr(st.roundNow)}</p>
    </div>
  );
}

/** Stage right: the podium holds the one action. */
function Podium() {
  const { tr, lang, age, setAge, setQuery } = useHome();
  const [q, setQ] = useState("");
  const goToContests = () => document.getElementById("contests")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="w-full max-w-md justify-self-end rounded-t-3xl bg-white p-5 text-ink shadow-[0_-12px_40px_-20px_rgba(0,0,0,0.5)]">
      <h2 id="podium-title" className="font-display text-xl font-semibold">
        {tr(st.podium)}
      </h2>
      <ToggleGroup
        aria-labelledby="podium-title"
        value={age ? [age] : []}
        onValueChange={(v) => {
          setAge((v[0] as AgeKey) ?? null);
          if (v[0]) goToContests();
        }}
        className="mt-3 grid grid-cols-2 gap-2"
      >
        {ages.map((a) => (
          <Toggle
            key={a.key}
            value={a.key}
            className="min-h-11 rounded-full border border-line bg-white px-3 text-sm font-medium hover:border-indigo data-[pressed]:border-indigo data-[pressed]:bg-indigo data-[pressed]:text-white"
          >
            {a.label[lang]}
          </Toggle>
        ))}
      </ToggleGroup>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(q.trim());
          goToContests();
        }}
        className="mt-3 flex flex-col gap-2"
      >
        <label htmlFor="hero-search" className="sr-only">
          {tr(t.hero.searchBtn)}
        </label>
        <input
          id="hero-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tr(t.hero.searchPh)}
          className="min-h-12 w-full rounded-2xl border border-line bg-paper px-4 outline-none focus:border-indigo"
        />
        <button type="submit" className="min-h-13 w-full rounded-full bg-indigo text-lg font-semibold text-white hover:bg-indigo-ink">
          {tr(st.find)}
        </button>
      </form>
    </div>
  );
}
