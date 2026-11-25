"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { useEffect, useState } from "react";
import { ages, t, type AgeKey, type Contest } from "@/lib/content";
import { useHome } from "@/lib/home-state";
import { PosterArt } from "./poster-art";

/**
 * Colour stage: each verb arrives with its own colour block, matching art and a soft
 * wash over the whole hero. Order matches t.hero.verbs (draw, write, speak, code, play).
 * Crimson is reserved for deadlines, so "speak" uses pink.
 */
const stages: { bg: string; ink: string; wash: string; shape: Contest["poster"]["shape"] }[] = [
  { bg: "#FFE3A1", ink: "#5C4200", wash: "#FFF8E6", shape: "sun" },
  { bg: "#CDEBDA", ink: "#1F5A3E", wash: "#EEF8F2", shape: "pen" },
  { bg: "#FFD3DD", ink: "#99133A", wash: "#FFF2F5", shape: "mic" },
  { bg: "#6563F1", ink: "#FFFFFF", wash: "#F0EFFE", shape: "code" },
  { bg: "#C9E8F4", ink: "#0B4F5C", wash: "#EDF8FB", shape: "play" },
];
const INTERVAL = 2500;

function useStage() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % stages.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused]);
  return { i, next: () => setI((n) => (n + 1) % stages.length), setPaused };
}

export function Hero() {
  const { tr, lang, age, setAge, setQuery } = useHome();
  const [q, setQ] = useState("");
  const { i, next, setPaused } = useStage();
  const stage = stages[i];
  const verbs = t.hero.verbs[lang];

  const goToContests = () => document.getElementById("contests")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="relative overflow-hidden transition-colors duration-700" style={{ backgroundColor: stage.wash }}>
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-16 text-center sm:px-6 lg:pt-20 lg:pb-24">
        <h1>
          <span className="sr-only">
            {verbs.join(", ")}: {tr(t.hero.line2)}
          </span>

          {/* The stage: decorative, so hidden from screen readers (the sentence above says it all) */}
          <span
            aria-hidden
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onClick={next}
            className="flex cursor-pointer items-center justify-center gap-3 select-none sm:gap-5"
          >
            {/* Colour block: as wide as the longest word, so the layout never jumps */}
            <span
              className="display inline-grid -rotate-2 rounded-[1.75rem] px-6 pt-1 pb-2 text-[clamp(2.9rem,10vw,6.75rem)] font-bold transition-colors duration-500 sm:rounded-[2.25rem] sm:px-10"
              style={{ backgroundColor: stage.bg, color: stage.ink }}
            >
              {verbs.map((v, n) => (
                <span
                  key={v}
                  className={`col-start-1 row-start-1 transition-all duration-500 ${
                    n === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                >
                  {v}
                </span>
              ))}
            </span>

            {/* Matching art tile */}
            <span
              className="relative grid size-20 shrink-0 rotate-3 place-items-center rounded-[1.5rem] transition-colors duration-500 sm:size-28 lg:size-36 lg:rounded-[2rem]"
              style={{ backgroundColor: stage.bg }}
            >
              {stages.map((st, n) => (
                <span
                  key={st.shape}
                  className={`absolute inset-3 transition-all duration-500 sm:inset-5 ${n === i ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
                >
                  <PosterArt shape={st.shape} ink={stage.ink} />
                </span>
              ))}
            </span>
          </span>

          <span
            aria-hidden
            className="display mt-5 block text-[clamp(1.6rem,4vw,2.9rem)] font-semibold text-balance text-ink"
            style={{ fontVariationSettings: '"wdth" 100' }}
          >
            {tr(t.hero.line2)}
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">{tr(t.hero.sub)}</p>

        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(q.trim());
            goToContests();
          }}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="mx-auto mt-9 flex max-w-xl items-center gap-2 rounded-full border border-line bg-white p-1.5 shadow-[0_10px_30px_-14px_rgba(36,34,110,0.3)] focus-within:border-indigo"
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
    </section>
  );
}
