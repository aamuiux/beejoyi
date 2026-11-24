"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Select } from "@base-ui/react/select";
import { Switch } from "@base-ui/react/switch";
import { Tabs } from "@base-ui/react/tabs";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ContestCard } from "@/components/home/contest-card";
import {
  ages,
  cats,
  contests,
  matchesQuery,
  num,
  statusOf,
  t,
  type AgeKey,
  type CatKey,
  type Contest,
  type ContestStatus,
} from "@/lib/content";
import { useHome } from "@/lib/home-state";

type SortKey = "ending" | "popular" | "newest";
type Filters = {
  status: ContestStatus;
  ages: AgeKey[];
  cat: CatKey;
  free: boolean;
  sort: SortKey;
  q: string;
};

const STATUSES: ContestStatus[] = ["open", "upcoming", "ended"];
const SORTS: SortKey[] = ["ending", "popular", "newest"];

/* ---------- URL <-> filters: shareable on WhatsApp, survives refresh and back ---------- */
function readFilters(sp: URLSearchParams): Filters {
  const status = sp.get("status") as ContestStatus;
  const sort = sp.get("sort") as SortKey;
  const cat = sp.get("cat") as CatKey;
  return {
    status: STATUSES.includes(status) ? status : "open",
    ages: (sp.get("age") ?? "")
      .split(",")
      .filter((a): a is AgeKey => ages.some((x) => x.key === a)),
    cat: cats.some((c) => c.key === cat) ? cat : "all",
    free: sp.get("free") === "1",
    sort: SORTS.includes(sort) ? sort : "ending",
    q: sp.get("q") ?? "",
  };
}

function toQuery(f: Filters) {
  const p = new URLSearchParams();
  if (f.status !== "open") p.set("status", f.status);
  if (f.ages.length) p.set("age", f.ages.join(","));
  if (f.cat !== "all") p.set("cat", f.cat);
  if (f.free) p.set("free", "1");
  if (f.sort !== "ending") p.set("sort", f.sort);
  if (f.q) p.set("q", f.q);
  return p.toString();
}

function apply(list: Contest[], f: Omit<Filters, "sort">) {
  return list.filter(
    (c) =>
      statusOf(c) === f.status &&
      (!f.ages.length || c.ages.some((a) => f.ages.includes(a))) &&
      (f.cat === "all" || c.cat === f.cat) &&
      (!f.free || c.fee === 0) &&
      matchesQuery(c, f.q),
  );
}

function sortList(list: Contest[], sort: SortKey, status: ContestStatus) {
  const out = [...list];
  if (sort === "popular") out.sort((a, b) => b.joined - a.joined);
  else if (sort === "newest")
    out.sort((a, b) => contests.indexOf(b) - contests.indexOf(a));
  else if (status === "upcoming")
    out.sort((a, b) => (a.startsIn ?? 0) - (b.startsIn ?? 0));
  else out.sort((a, b) => a.daysLeft - b.daysLeft);
  return out;
}

/* ---------- Main ---------- */
export function ContestsBrowser() {
  const { tr, lang, age: rememberedAge, setAge } = useHome();
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const f = useMemo(
    () => readFilters(new URLSearchParams(sp.toString())),
    [sp],
  );

  // Always build on the latest filters, so two quick changes don't overwrite each other.
  const latest = useRef(f);
  useEffect(() => {
    latest.current = f;
  }, [f]);
  const set = (patch: Partial<Filters>) => {
    latest.current = { ...latest.current, ...patch };
    const qs = toQuery(latest.current);
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  // Returning parent: restore their last age choice once, if the URL doesn't specify one.
  const restored = useRef(false);
  useEffect(() => {
    if (restored.current || !rememberedAge) return;
    restored.current = true;
    if (!sp.has("age")) set({ ages: [rememberedAge] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rememberedAge]);

  // Search: type freely, URL updates after a short pause.
  const [q, setQ] = useState(f.q);
  useEffect(() => {
    const id = setTimeout(() => q !== f.q && set({ q }), 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const setAges = (next: AgeKey[]) => {
    setAge(next[0] ?? null); // remember for the homepage too
    set({ ages: next });
  };

  const results = sortList(apply(contests, f), f.sort, f.status);
  const countFor = (s: ContestStatus) =>
    apply(contests, { ...f, status: s }).length;
  const activeCount =
    f.ages.length +
    (f.cat !== "all" ? 1 : 0) +
    (f.free ? 1 : 0) +
    (f.q ? 1 : 0);
  const countLabel = `${num(results.length, lang)}${tr(results.length === 1 ? t.list.countOne : t.list.count)}`;

  return (
    <main className="pb-16">
      {/* Title + search */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
        <h1 className="display text-5xl font-bold sm:text-6xl">
          {tr(t.list.title)}
        </h1>
        <p className="mt-3 max-w-2xl text-ink-soft">{tr(t.list.sub)}</p>
        <div
          role="search"
          className="mt-6 flex max-w-2xl items-center gap-2 rounded-full border border-line bg-white px-4 focus-within:border-indigo"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5 shrink-0 text-ink-soft"
            aria-hidden
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M20 20l-4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <label htmlFor="list-search" className="sr-only">
            {tr(t.list.searchPh)}
          </label>
          <input
            id="list-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tr(t.list.searchPh)}
            className="min-h-13 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-soft/70"
          />
        </div>
      </div>

      <Tabs.Root
        value={f.status}
        onValueChange={(v) => set({ status: v as ContestStatus })}
      >
        {/* Sticky filter bar */}
        <div className="sticky top-16 z-30 mt-8 border-b border-line bg-paper/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex items-center gap-6">
              <Tabs.List className="relative flex min-w-0 gap-6 overflow-x-auto no-scrollbar">
                {STATUSES.map((s) => (
                  <Tabs.Tab
                    key={s}
                    value={s}
                    className="flex min-h-12 shrink-0 items-center gap-2 font-semibold text-ink-soft hover:text-ink data-[active]:text-ink"
                  >
                    {tr(t.list.status[s])}
                    <span className="rounded-full bg-line px-2 text-xs font-bold text-ink-soft in-data-[active]:bg-ink in-data-[active]:text-white">
                      {num(countFor(s), lang)}
                    </span>
                  </Tabs.Tab>
                ))}
                <Tabs.Indicator className="absolute bottom-0 left-[var(--active-tab-left)] h-[3px] w-[var(--active-tab-width)] rounded-full bg-indigo transition-all" />
              </Tabs.List>
              <div className="ml-auto hidden shrink-0 items-center gap-5 lg:flex">
                <FreeSwitch
                  checked={f.free}
                  onChange={(free) => set({ free })}
                />
                <SortSelect value={f.sort} onChange={(sort) => set({ sort })} />
              </div>
            </div>

            {/* Desktop filters */}
            <div className="hidden flex-wrap items-center gap-x-5 gap-y-3 border-t border-line py-3 lg:flex">
              <AgeChips value={f.ages} onChange={setAges} />
              <span className="h-6 w-px bg-line" aria-hidden />
              <SubjectChips value={f.cat} onChange={(cat) => set({ cat })} />
            </div>

            {/* Mobile filters */}
            <div className="flex items-center gap-3 border-t border-line py-2.5 lg:hidden">
              <FilterSheet
                f={f}
                set={set}
                setAges={setAges}
                activeCount={activeCount}
                countLabel={countLabel}
              />
              <div className="ml-auto">
                <SortSelect value={f.sort} onChange={(sort) => set({ sort })} />
              </div>
            </div>
          </div>
        </div>

        {STATUSES.map((s) => (
          <Tabs.Panel
            key={s}
            value={s}
            className="mx-auto max-w-7xl px-4 sm:px-6"
          >
            {s === f.status && (
              <>
                {/* Result count + active filters */}
                <div
                  className="flex flex-wrap items-center gap-2 py-5"
                  aria-live="polite"
                >
                  <p className="mr-2 font-display text-xl font-semibold">
                    {countLabel}
                  </p>
                  <ActivePills
                    f={f}
                    set={set}
                    setAges={setAges}
                    clearQ={() => setQ("")}
                  />
                </div>

                {results.length ? (
                  <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {results.map((c) => (
                      <li key={c.id} id={c.id}>
                        <ContestCard c={c} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState
                    f={f}
                    set={set}
                    setAges={setAges}
                    clearQ={() => setQ("")}
                  />
                )}
              </>
            )}
          </Tabs.Panel>
        ))}
      </Tabs.Root>

      <p className="mx-auto mt-8 max-w-7xl px-4 text-xs text-ink-soft sm:px-6">
        {tr(t.contests.sample)}
      </p>
    </main>
  );
}

/* ---------- Filter controls ---------- */
function AgeChips({
  value,
  onChange,
}: {
  value: AgeKey[];
  onChange: (v: AgeKey[]) => void;
}) {
  const { tr, lang } = useHome();
  return (
    <ToggleGroup
      multiple
      value={value}
      onValueChange={(v) => onChange(v as AgeKey[])}
      aria-label={tr(t.list.age)}
      className="flex flex-wrap gap-2"
    >
      {ages.map((a) => (
        <Toggle
          key={a.key}
          value={a.key}
          className="min-h-10 rounded-full border border-line bg-white px-3.5 text-sm font-medium hover:border-indigo data-[pressed]:border-indigo data-[pressed]:bg-indigo data-[pressed]:text-white"
        >
          {a.label[lang]}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

function SubjectChips({
  value,
  onChange,
}: {
  value: CatKey;
  onChange: (v: CatKey) => void;
}) {
  const { tr, lang } = useHome();
  return (
    <ToggleGroup
      value={[value]}
      onValueChange={(v) => onChange((v[0] as CatKey) ?? "all")}
      aria-label={tr(t.list.subject)}
      className="flex flex-wrap gap-2"
    >
      {cats.map((c) => (
        <Toggle
          key={c.key}
          value={c.key}
          className="min-h-10 rounded-full border border-line bg-white px-3.5 text-sm font-medium hover:border-ink/40 data-[pressed]:border-ink data-[pressed]:bg-ink data-[pressed]:text-white"
        >
          {c.label[lang]}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

function FreeSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const { tr } = useHome();
  return (
    <label className="flex min-h-10 cursor-pointer items-center gap-2.5 font-medium">
      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        className="relative flex h-7 w-12 rounded-full bg-line p-0.5 transition-colors data-[checked]:bg-honey"
      >
        <Switch.Thumb className="size-6 rounded-full bg-white shadow transition-transform data-[checked]:translate-x-5" />
      </Switch.Root>
      {tr(t.list.freeOnly)}
    </label>
  );
}

function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  const { tr } = useHome();
  const items = SORTS.map((s) => ({ value: s, label: tr(t.list.sorts[s]) }));
  return (
    <Select.Root
      items={items}
      value={value}
      onValueChange={(v) => v && onChange(v as SortKey)}
    >
      <Select.Trigger
        aria-label={tr(t.list.sort)}
        className="flex min-h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium hover:border-ink/40"
      >
        <span className="hidden text-ink-soft sm:inline">
          {tr(t.list.sort)}:
        </span>
        <Select.Value />
        <Select.Icon className="text-ink-soft">
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
            <path
              d="M3 4.5l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          sideOffset={6}
          alignItemWithTrigger={false}
          align="end"
          className="z-50"
        >
          <Select.Popup className="min-w-48 rounded-2xl border border-line bg-white p-1.5 shadow-[0_16px_40px_-16px_rgba(30,30,46,0.35)] transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
            <Select.List>
              {items.map((it) => (
                <Select.Item
                  key={it.value}
                  value={it.value}
                  className="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-xl px-3 outline-none data-[highlighted]:bg-indigo-wash"
                >
                  <Select.ItemText>{it.label}</Select.ItemText>
                  <Select.ItemIndicator className="text-indigo">
                    ✓
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

type SetFn = (p: Partial<Filters>) => void;

function FilterSheet({
  f,
  set,
  setAges,
  activeCount,
  countLabel,
}: {
  f: Filters;
  set: SetFn;
  setAges: (a: AgeKey[]) => void;
  activeCount: number;
  countLabel: string;
}) {
  const { tr, lang } = useHome();
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex min-h-10 items-center gap-2 rounded-full border border-ink/20 bg-white px-4 text-sm font-semibold">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
          <path
            d="M4 6h16M7 12h10M10 18h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {tr(t.list.filters)}
        {activeCount > 0 && (
          <span className="grid size-5 place-items-center rounded-full bg-indigo text-xs text-white">
            {num(activeCount, lang)}
          </span>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/40 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-3xl bg-white transition-transform data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full">
          <div className="flex items-center justify-between px-5 pt-5">
            <Dialog.Title className="font-display text-2xl font-semibold">
              {tr(t.list.filters)}
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close"
              className="grid size-11 place-items-center rounded-full hover:bg-indigo-wash"
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Dialog.Close>
          </div>
          <div className="flex-1 space-y-7 overflow-y-auto px-5 py-5">
            <fieldset>
              <legend className="mb-3 font-semibold">{tr(t.list.age)}</legend>
              <AgeChips value={f.ages} onChange={setAges} />
            </fieldset>
            <fieldset>
              <legend className="mb-3 font-semibold">
                {tr(t.list.subject)}
              </legend>
              <SubjectChips value={f.cat} onChange={(cat) => set({ cat })} />
            </fieldset>
            <FreeSwitch checked={f.free} onChange={(free) => set({ free })} />
          </div>
          <div className="flex gap-3 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={() => {
                setAges([]);
                set({ ages: [], cat: "all", free: false });
              }}
              className="min-h-12 rounded-full px-4 font-semibold text-ink-soft hover:text-ink"
            >
              {tr(t.list.clearAll)}
            </button>
            {/* Says the outcome, not "Apply" */}
            <Dialog.Close className="min-h-12 flex-1 rounded-full bg-indigo font-semibold text-white hover:bg-indigo-ink">
              {countLabel} {tr(t.list.show)}
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ---------- Active filter pills ---------- */
function usePills(
  f: Filters,
  set: SetFn,
  setAges: (a: AgeKey[]) => void,
  clearQ: () => void,
) {
  const { tr, lang } = useHome();
  const pills: {
    key: string;
    label: string;
    remove: () => void;
    without: Partial<Filters>;
  }[] = [];
  for (const a of f.ages) {
    const without = { ages: f.ages.filter((x) => x !== a) };
    pills.push({
      key: a,
      label: ages.find((x) => x.key === a)!.label[lang],
      remove: () => setAges(without.ages),
      without,
    });
  }
  if (f.cat !== "all")
    pills.push({
      key: "cat",
      label: cats.find((c) => c.key === f.cat)!.label[lang],
      remove: () => set({ cat: "all" }),
      without: { cat: "all" },
    });
  if (f.free)
    pills.push({
      key: "free",
      label: tr(t.list.freeOnly),
      remove: () => set({ free: false }),
      without: { free: false },
    });
  if (f.q)
    pills.push({
      key: "q",
      label: `“${f.q}”`,
      remove: () => {
        clearQ();
        set({ q: "" });
      },
      without: { q: "" },
    });
  return pills;
}

function ActivePills({
  f,
  set,
  setAges,
  clearQ,
}: {
  f: Filters;
  set: SetFn;
  setAges: (a: AgeKey[]) => void;
  clearQ: () => void;
}) {
  const { tr } = useHome();
  const pills = usePills(f, set, setAges, clearQ);
  if (!pills.length) return null;
  return (
    <>
      {pills.map((p) => (
        <button
          key={p.key}
          type="button"
          onClick={p.remove}
          aria-label={`${p.label}: ${tr(t.list.remove)}`}
          className="inline-flex min-h-9 items-center gap-2 rounded-full bg-indigo-wash px-3.5 text-sm font-semibold text-indigo-ink hover:bg-indigo hover:text-white"
        >
          {p.label}
          <span aria-hidden>✕</span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => {
          clearQ();
          setAges([]);
          set({ ages: [], cat: "all", free: false, q: "" });
        }}
        className="min-h-9 px-2 text-sm font-semibold text-ink-soft underline underline-offset-4 hover:text-ink"
      >
        {tr(t.list.clearAll)}
      </button>
    </>
  );
}

/* ---------- Empty state: name the filter that emptied it, offer one-tap fixes ---------- */
function EmptyState({
  f,
  set,
  setAges,
  clearQ,
}: {
  f: Filters;
  set: SetFn;
  setAges: (a: AgeKey[]) => void;
  clearQ: () => void;
}) {
  const { tr, lang } = useHome();
  const pills = usePills(f, set, setAges, clearQ)
    .map((p) => ({ ...p, n: apply(contests, { ...f, ...p.without }).length }))
    .filter((p) => p.n > 0);
  const otherTabs = STATUSES.filter((s) => s !== f.status)
    .map((s) => ({ s, n: apply(contests, { ...f, status: s }).length }))
    .filter((x) => x.n > 0);

  return (
    <div className="rounded-3xl border-2 border-dashed border-line bg-white px-6 py-12 text-center">
      <h2 className="font-display text-2xl font-semibold">
        {tr(t.list.emptyTitle)}
      </h2>
      {pills.length > 0 && (
        <>
          <p className="mt-2 text-ink-soft">{tr(t.list.emptyHint)}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {pills.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={p.remove}
                className="min-h-12 rounded-full border border-ink/15 px-5 font-semibold hover:border-ink"
              >
                {p.label} {tr(t.list.remove)}{" "}
                <span className="text-ink-soft">({num(p.n, lang)})</span>
              </button>
            ))}
          </div>
        </>
      )}
      {otherTabs.length > 0 && (
        <div className="mt-6">
          <p className="text-ink-soft">{tr(t.list.tryOther)}:</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            {otherTabs.map(({ s, n }) => (
              <button
                key={s}
                type="button"
                onClick={() => set({ status: s })}
                className="min-h-12 rounded-full bg-indigo px-5 font-semibold text-white hover:bg-indigo-ink"
              >
                {tr(t.list.status[s])} ({num(n, lang)})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
