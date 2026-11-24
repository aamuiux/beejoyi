"use client";

import { Tabs } from "@base-ui/react/tabs";
import { ages, cats, contests, matchesQuery, statusOf, t, type CatKey, type Contest } from "@/lib/content";
import { useHome } from "@/lib/home-state";
import { ContestCard } from "./contest-card";

function useFiltered() {
  const { age, cat, query } = useHome();
  return contests.filter(
    (c) =>
      statusOf(c) === "open" &&
      (!age || c.ages.includes(age)) &&
      (cat === "all" || c.cat === cat) &&
      matchesQuery(c, query),
  );
}

/** "See all" carries the homepage filters over to /contests. */
function useSeeAllHref(sort?: string) {
  const { age, cat, query } = useHome();
  const p = new URLSearchParams();
  if (age) p.set("age", age);
  if (cat !== "all") p.set("cat", cat);
  if (query) p.set("q", query);
  if (sort) p.set("sort", sort);
  const s = p.toString();
  return `/contests${s ? `?${s}` : ""}`;
}

function Shelf({ title, items, sort }: { title: string; items: Contest[]; sort?: string }) {
  const { tr } = useHome();
  const href = useSeeAllHref(sort);
  if (!items.length) return null;
  return (
    <div className="mt-10 first:mt-8">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold">{title}</h3>
        <a href={href} className="shrink-0 font-semibold text-indigo-ink hover:underline">
          {tr(t.contests.seeAll)}
        </a>
      </div>
      <ul className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        {items.map((c) => (
          <li key={c.id} className="w-[78%] shrink-0 snap-start sm:w-auto">
            <ContestCard c={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Results() {
  const { tr, setAge, setQuery, query } = useHome();
  const list = useFiltered();

  if (!list.length) {
    return (
      <div className="mt-8 rounded-3xl border-2 border-dashed border-line bg-white px-6 py-12 text-center">
        <h3 className="font-display text-2xl font-semibold">{tr(t.contests.emptyTitle)}</h3>
        <p className="mt-2 text-ink-soft">{tr(t.contests.emptyBody)}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="min-h-12 rounded-full bg-indigo px-6 font-semibold text-white hover:bg-indigo-ink">
            {tr(t.contests.notify)}
          </button>
          <button
            onClick={() => {
              setAge(null);
              if (query) setQuery("");
            }}
            className="min-h-12 rounded-full border border-ink/15 px-6 font-semibold hover:border-ink"
          >
            {tr(t.contests.clear)}
          </button>
        </div>
      </div>
    );
  }

  const ending = [...list].sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 4);
  const beginner = list.filter((c) => c.beginner && !ending.includes(c)).slice(0, 4);
  return (
    <>
      <Shelf title={tr(t.contests.ending)} items={ending} sort="ending" />
      <Shelf title={tr(t.contests.beginner)} items={beginner} />
    </>
  );
}

export function ContestsSection() {
  const { tr, lang, age, setAge, cat, setCat, query, setQuery } = useHome();
  const ageLabel = age ? ages.find((a) => a.key === age)!.label[lang] : null;

  return (
    <section id="contests" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display text-4xl font-bold sm:text-5xl">{tr(t.contests.title)}</h2>
            <p className="mt-2 max-w-xl text-ink-soft">{tr(t.contests.sub)}</p>
          </div>
          {(ageLabel || query) && (
            <div className="flex flex-wrap gap-2">
              {ageLabel && (
                <button
                  onClick={() => setAge(null)}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-indigo px-4 text-sm font-semibold text-white"
                  aria-label={`${ageLabel}: ${tr(t.contests.clear)}`}
                >
                  {ageLabel}
                  <span aria-hidden>✕</span>
                </button>
              )}
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white"
                >
                  “{query}”<span aria-hidden>✕</span>
                </button>
              )}
            </div>
          )}
        </div>

        <Tabs.Root value={cat} onValueChange={(v) => setCat(v as CatKey)} className="mt-8">
          <Tabs.List className="no-scrollbar relative -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {cats.map((c) => (
              <Tabs.Tab
                key={c.key}
                value={c.key}
                className="min-h-11 shrink-0 rounded-full border border-line bg-white px-4 font-medium text-ink hover:border-ink/40 data-[active]:border-ink data-[active]:bg-ink data-[active]:text-white"
              >
                {c.label[lang]}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {cats.map((c) => (
            <Tabs.Panel key={c.key} value={c.key}>
              <Results />
            </Tabs.Panel>
          ))}
        </Tabs.Root>

        <p className="mt-6 text-xs text-ink-soft">{tr(t.contests.sample)}</p>
      </div>
    </section>
  );
}
