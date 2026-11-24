"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ages, contests, num, t, type AgeKey, type Contest } from "@/lib/content";
import { useHome } from "@/lib/home-state";
import { PosterArt } from "./poster-art";

// Desktop layout for the pinned posters around the headline.
const pins = [
  { id: "c1", cls: "left-[2%] top-6 -rotate-6 w-44" },
  { id: "c3", cls: "left-[9%] top-[46%] rotate-3 w-40" },
  { id: "c6", cls: "left-[1%] bottom-2 -rotate-2 w-36" },
  { id: "c2", cls: "right-[3%] top-4 rotate-6 w-44" },
  { id: "c5", cls: "right-[10%] top-[44%] -rotate-3 w-40" },
  { id: "c8", cls: "right-[1%] bottom-0 rotate-2 w-36" },
];

function Poster({ c, className = "" }: { c: Contest; className?: string }) {
  const { lang, tr } = useHome();
  return (
    <Link
      href={`/contests/${c.id}`}
      className={`block rounded-md p-3 shadow-[0_12px_28px_-12px_rgba(36,34,110,0.45)] transition-transform hover:scale-105 hover:rotate-0 ${className}`}
      style={{ background: c.poster.bg, color: c.poster.ink }}
    >
      {/* the pin */}
      <span aria-hidden className="mx-auto -mt-5 mb-1 block size-3.5 rounded-full border-2 border-white bg-alert shadow" />
      <div className="h-16">
        <PosterArt shape={c.poster.shape} ink={c.poster.ink} />
      </div>
      <p className="mt-2 line-clamp-2 font-display text-[15px] leading-tight font-semibold">{tr(c.title)}</p>
      <p className="mt-1 text-xs opacity-80">
        {c.fee === 0 ? tr(t.contests.free) : `৳${num(c.fee, lang)}`}
        {" / "}
        {c.daysLeft <= 1 ? tr(t.contests.lastDay) : `${num(c.daysLeft, lang)} ${tr(t.contests.daysLeft)}`}
      </p>
    </Link>
  );
}

function RotatingVerb() {
  const { lang } = useHome();
  const verbs = t.hero.verbs[lang];
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % verbs.length), 2400);
    return () => clearInterval(id);
  }, [verbs.length]);

  return (
    <>
      <span className="sr-only">{verbs.join(", ")}</span>
      <span aria-hidden className="relative inline-block">
        <span key={`${lang}-${i}`} className="verb-in inline-block">
          {verbs[i % verbs.length]}
        </span>
        {/* crayon underline */}
        <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-4 w-full" aria-hidden>
          <path d="M4 14 C 70 4, 150 4, 296 10" stroke="#FFC329" strokeWidth="9" strokeLinecap="round" fill="none" />
        </svg>
      </span>
    </>
  );
}

export function Hero() {
  const { tr, lang, age, setAge, setQuery } = useHome();
  const [q, setQ] = useState("");

  const goToContests = () => document.getElementById("contests")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-6 lg:pt-20 lg:pb-16">
        {/* Pinned posters (desktop) */}
        <div className="pointer-events-none absolute inset-0 hidden xl:block">
          {pins.map((p, idx) => (
            <div key={p.id} className={`pointer-events-auto absolute ${p.cls}`}>
              <div className="drift" style={{ animationDelay: `${idx * -1.1}s` }}>
                <Poster c={contests.find((c) => c.id === p.id)!} />
              </div>
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="display text-[clamp(3rem,9vw,6.5rem)] font-bold text-ink">
            <RotatingVerb />
            <span className="mt-3 block text-[clamp(1.6rem,4.2vw,3rem)] font-semibold text-ink" style={{ fontVariationSettings: '"wdth" 100' }}>
              {tr(t.hero.line2)}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">{tr(t.hero.sub)}</p>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(q.trim());
              goToContests();
            }}
            className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full border border-line bg-white p-1.5 shadow-[0_8px_30px_-12px_rgba(36,34,110,0.25)] focus-within:border-indigo"
          >
            <label htmlFor="hero-search" className="sr-only">
              {tr(t.hero.searchBtn)}
            </label>
            <svg viewBox="0 0 24 24" className="ml-3 size-5 shrink-0 text-ink-soft" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              id="hero-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tr(t.hero.searchPh)}
              className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-ink-soft/70"
            />
            <button
              type="submit"
              className="min-h-12 shrink-0 rounded-full bg-ink px-5 font-semibold text-white hover:bg-night"
            >
              {tr(t.hero.searchBtn)}
            </button>
          </form>

          <a href="#games" className="mt-4 inline-block font-medium text-indigo-ink underline decoration-indigo/30 underline-offset-4 hover:decoration-indigo">
            {tr(t.hero.play)}
          </a>

          <div className="mt-10">
            <p id="age-label" className="text-sm font-medium text-ink-soft">
              {tr(t.hero.iam)}
            </p>
            <ToggleGroup
              aria-labelledby="age-label"
              value={age ? [age] : []}
              onValueChange={(v) => {
                setAge((v[0] as AgeKey) ?? null);
                if (v[0]) goToContests();
              }}
              className="mt-3 flex flex-wrap justify-center gap-2"
            >
              {ages.map((a) => (
                <Toggle
                  key={a.key}
                  value={a.key}
                  className="flex min-h-12 flex-col items-center justify-center rounded-2xl border border-line bg-white px-4 py-1.5 leading-tight hover:border-indigo data-[pressed]:border-indigo data-[pressed]:bg-indigo data-[pressed]:text-white"
                >
                  <span className="font-semibold">{a.label[lang]}</span>
                  <span className="text-xs opacity-70">{a.hint[lang]}</span>
                </Toggle>
              ))}
            </ToggleGroup>
          </div>
        </div>

        {/* Posters strip (mobile / tablet) */}
        <div className="no-scrollbar -mx-4 mt-10 flex gap-4 overflow-x-auto px-4 pt-4 pb-4 xl:hidden">
          {pins.map((p, idx) => (
            <Poster
              key={p.id}
              c={contests.find((c) => c.id === p.id)!}
              className={`w-40 shrink-0 ${idx % 2 ? "rotate-2" : "-rotate-2"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
