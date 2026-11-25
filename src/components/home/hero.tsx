"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ages, contests, t, type AgeKey, type Contest } from "@/lib/content";
import { useHome } from "@/lib/home-state";
import { PosterArt } from "./poster-art";

// Four picture-only posters in the outer gutters (desktop). Two strong colours, two soft,
// no text and no motion, so the headline stays the single focal point.
const pins = [
  { id: "c1", cls: "left-[3%] top-[10%] -rotate-6" },
  { id: "c6", cls: "left-[8%] bottom-[12%] rotate-3" },
  { id: "c3", cls: "right-[4%] top-[14%] rotate-6" },
  { id: "c10", cls: "right-[9%] bottom-[8%] -rotate-3" },
];

function Poster({ c }: { c: Contest }) {
  const { tr } = useHome();
  return (
    <Link
      href={`/contests/${c.id}`}
      aria-label={tr(c.title)}
      title={tr(c.title)}
      className="block size-32 rounded-2xl p-5 shadow-[0_14px_30px_-16px_rgba(36,34,110,0.4)] transition-transform hover:scale-105 hover:rotate-0"
      style={{ background: c.poster.bg }}
    >
      <PosterArt shape={c.poster.shape} ink={c.poster.ink} />
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
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 lg:pt-24 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 hidden xl:block">
          {pins.map((p) => (
            <div key={p.id} className={`pointer-events-auto absolute ${p.cls}`}>
              <Poster c={contests.find((c) => c.id === p.id)!} />
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          <h1 className="display text-[clamp(2.75rem,8vw,5.5rem)] font-bold text-ink">
            <RotatingVerb />
            <span className="mt-3 block text-[clamp(1.5rem,3.6vw,2.6rem)] font-semibold" style={{ fontVariationSettings: '"wdth" 100' }}>
              {tr(t.hero.line2)}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft">{tr(t.hero.sub)}</p>

          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(q.trim());
              goToContests();
            }}
            className="mx-auto mt-9 flex max-w-xl items-center gap-2 rounded-full border border-line bg-white p-1.5 shadow-[0_8px_30px_-14px_rgba(36,34,110,0.25)] focus-within:border-indigo"
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
            <button type="submit" className="min-h-12 shrink-0 rounded-full bg-ink px-5 font-semibold text-white hover:bg-night">
              {tr(t.hero.searchBtn)}
            </button>
          </form>

          <div className="mt-6">
            <p id="age-label" className="sr-only">
              {tr(t.hero.iam)}
            </p>
            <ToggleGroup
              aria-labelledby="age-label"
              value={age ? [age] : []}
              onValueChange={(v) => {
                setAge((v[0] as AgeKey) ?? null);
                if (v[0]) goToContests();
              }}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              <span aria-hidden className="mr-1 text-sm text-ink-soft">
                {tr(t.hero.iam)}
              </span>
              {ages.map((a) => (
                <Toggle
                  key={a.key}
                  value={a.key}
                  className="min-h-11 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink hover:border-indigo data-[pressed]:border-indigo data-[pressed]:bg-indigo data-[pressed]:text-white"
                >
                  {a.label[lang]}
                </Toggle>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
