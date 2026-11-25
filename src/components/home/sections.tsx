"use client";

import { Accordion } from "@base-ui/react/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scorecard } from "@/components/contests/scorecard";
import { contests, leaderboard, num, t } from "@/lib/content";
import { useHome } from "@/lib/home-state";
import { LangToggle, Logo } from "./site-header";

/* ---------- The running order: the show's three rounds, each previewing the next ---------- */
export function HowItWorks() {
  const { tr } = useHome();
  return (
    <section aria-labelledby="order-title" className="bg-indigo-wash py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 id="order-title" className="display text-4xl font-bold sm:text-5xl">
          {tr(t.how.title)}
        </h2>
        <p className="mt-2 max-w-xl text-lg text-ink-soft">{tr(t.how.sub)}</p>
        {/* A printed programme: same round names, same order as the stage */}
        <ol className="mt-10 border-t-2 border-night">
          {t.how.order.map((o, i) => (
            <li key={i} className="grid gap-x-8 gap-y-3 border-b border-night/20 py-7 md:grid-cols-[12rem_1fr_18rem]">
              {/* "রাউন্ড ১ · শেখো" breaks before the dot, never after it */}
              <h3 className="display text-night" style={{ fontVariationSettings: '"wdth" 112' }}>
                {tr(t.stage.rounds[i])
                  .split(" · ")
                  .map((part, n) => (
                    <span key={n} className={n === 0 ? "block text-3xl font-bold whitespace-nowrap sm:text-4xl" : "block text-xl font-semibold text-indigo-ink"}>
                      {part}
                    </span>
                  ))}
              </h3>
              <p className="max-w-[55ch] text-lg">{tr(o.d)}</p>
              <p className="text-ink-soft md:border-l md:border-night/20 md:pl-6">
                <span className="block text-sm font-semibold text-indigo-ink">{tr(t.how.next)}</span>
                {tr(o.next)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Judges' table: open, blind, 1–7, a scorecard for all ---------- */
export function JudgesTable() {
  const { tr, lang } = useHome();
  const sample = contests.find((c) => c.id === "c17")!;
  return (
    <section id="judging" aria-labelledby="judges-title" className="bg-night py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h2 id="judges-title" className="display text-4xl font-bold sm:text-5xl">
            {tr(t.judges.title)}
          </h2>
          <p className="mt-3 max-w-lg text-lg text-white/80">{tr(t.judges.sub)}</p>
          <ol className="mt-8 space-y-6">
            {t.judges.points.map((p, i) => (
              <li key={i} className="flex gap-4">
                <span className="display grid size-12 shrink-0 place-items-center rounded-full bg-white text-2xl font-bold text-night">
                  {num(i + 5, lang)}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{tr(p.t)}</h3>
                  <p className="mt-1 max-w-md text-white/75">{tr(p.d)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Scorecard c={sample} compact />
      </div>
    </section>
  );
}

/* ---------- Games: each tile is a tiny render of the game itself ---------- */
function GameArt({ k }: { k: string }) {
  if (k === "2048")
    return (
      <div className="grid grid-cols-3 gap-1.5" aria-hidden>
        {[2, 4, 8, 16, 32, 64, 128, 512, 2048].map((n) => (
          <span
            key={n}
            className="grid aspect-square place-items-center rounded-md text-xs font-bold"
            style={{ background: n >= 512 ? "#24226E" : n >= 64 ? "#6563F1" : "#ECEBFE", color: n >= 64 ? "#fff" : "#1E1E2E" }}
          >
            {n}
          </span>
        ))}
      </div>
    );
  if (k === "gomoku")
    return (
      <div className="grid grid-cols-5 gap-1 rounded-md bg-[#F2D9A6] p-2" aria-hidden>
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="grid aspect-square place-items-center">
            {[6, 12, 18, 24].includes(i) || i === 0 ? (
              <span className="size-full rounded-full bg-ink" />
            ) : [7, 13, 3].includes(i) ? (
              <span className="size-full rounded-full border border-ink/30 bg-white" />
            ) : (
              <span className="size-1 rounded-full bg-ink/25" />
            )}
          </span>
        ))}
      </div>
    );
  if (k === "mancala")
    return (
      <div className="flex items-stretch gap-[4%] rounded-[1.25rem] bg-[#8A5A33] p-[6%]" aria-hidden>
        <span className="w-[12%] shrink-0 rounded-full bg-[#6B4426]" />
        <div className="grid min-w-0 flex-1 grid-cols-3 gap-[6%]">
          {[3, 4, 2, 4, 1, 3].map((s, i) => (
            <span key={i} className="grid aspect-square min-w-0 grid-cols-2 place-content-center gap-[8%] rounded-full bg-[#6B4426] p-[18%]">
              {Array.from({ length: s }).map((_, j) => (
                <span key={j} className="aspect-square w-full rounded-full" style={{ background: ["#FFC329", "#6563F1", "#fff"][(i + j) % 3] }} />
              ))}
            </span>
          ))}
        </div>
        <span className="w-[12%] shrink-0 rounded-full bg-[#6B4426]" />
      </div>
    );
  return (
    <div className="flex items-center justify-center gap-2 text-ink sm:gap-4" aria-hidden>
      {/* rock, paper, scissors: drawn in one stroke weight, like the other boards */}
      <svg viewBox="0 0 32 32" className="w-1/4 -rotate-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M9 14v-2a2 2 0 0 1 4 0v-1a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-1a7 7 0 0 1-7-7v-3a2 2 0 0 1 4 0" fill="#ECEBFE" />
      </svg>
      <svg viewBox="0 0 32 32" className="w-1/4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M10 17V7a2 2 0 0 1 4 0v8V5a2 2 0 0 1 4 0v10V7a2 2 0 0 1 4 0v10-5a2 2 0 0 1 4 0v8a9 9 0 0 1-9 9h-1a8 8 0 0 1-6.5-3.4L6 21a2 2 0 0 1 3-2.6l1 1.1" fill="#DCDBFD" />
      </svg>
      <svg viewBox="0 0 32 32" className="w-1/4 rotate-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M13 16 9 5a2 2 0 0 1 3.8-1.2L16 13l2-10a2 2 0 0 1 4 .6L20 15h2a3 3 0 0 1 3 3v3a8 8 0 0 1-8 8h-1a7 7 0 0 1-7-7v-2a2 2 0 0 1 4-1" fill="#ECEBFE" />
      </svg>
    </div>
  );
}

export function GamesSection() {
  const { tr, lang } = useHome();
  return (
    <section id="games" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="display text-4xl font-bold sm:text-5xl">{tr(t.games.title)}</h2>
          <p className="mt-2 max-w-xl text-ink-soft">{tr(t.games.sub)}</p>
          <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {t.games.list.map((g) => (
              <li key={g.key}>
                <a href={`#play-${g.key}`} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-4 hover:border-indigo">
                  <div className="grid aspect-square place-items-center overflow-hidden rounded-2xl bg-paper p-3">
                    <div className="w-full">
                      <GameArt k={g.key} />
                    </div>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold">{tr(g.name)}</h3>
                  <p className="text-sm text-ink-soft">{tr(g.d)}</p>
                  <span className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-indigo-wash font-semibold text-indigo-ink group-hover:bg-indigo group-hover:text-white">
                    {tr(t.games.play)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <aside aria-labelledby="board-title" className="rounded-3xl bg-ink p-6 text-white">
          <h3 id="board-title" className="font-display text-xl font-semibold">
            {tr(t.games.board)}
          </h3>
          <p className="text-sm text-white/60">{tr(t.games.resets)}</p>
          <ol className="mt-5 space-y-3">
            {leaderboard.map((p, i) => (
              <li key={i} className="flex items-center gap-3">
                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-full font-bold ${
                    i === 0 ? "bg-honey text-ink" : "bg-white/10"
                  }`}
                >
                  {num(i + 1, lang)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{tr(p.name)}</span>
                  <span className="block text-xs text-white/60">{tr(p.cls)}</span>
                </span>
                <span className="font-display font-semibold tabular-nums">{num(p.score, lang)}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}

/* ---------- Showcase ---------- */
const frames = ["#FFF4D6", "#ECEBFE", "#E8F2EC", "#FDE3E9"];
const art = [
  // village
  <svg key="a" viewBox="0 0 120 90" className="h-full w-full" aria-hidden>
    <circle cx="94" cy="20" r="10" fill="#FFC329" />
    <path d="M0 70 Q30 56 60 66 T120 62 V90 H0Z" fill="#7CC59A" />
    <path d="M22 66 V46 L36 34 L50 46 V66Z" fill="#C8133F" />
    <rect x="31" y="52" width="9" height="14" fill="#1E1E2E" />
    <path d="M70 66 V40 M62 48 Q70 30 78 48" stroke="#1F5A3E" strokeWidth="4" fill="none" />
  </svg>,
  // solar pump
  <svg key="b" viewBox="0 0 120 90" className="h-full w-full" aria-hidden>
    <rect x="20" y="20" width="44" height="28" rx="3" fill="#6563F1" transform="rotate(-12 42 34)" />
    <path d="M30 26 L52 22 M28 36 L56 30" stroke="#fff" strokeWidth="2" />
    <path d="M44 50 V74 H80 V56" stroke="#1E1E2E" strokeWidth="5" fill="none" />
    <path d="M80 56 q6 10 0 14 q-6 -4 0 -14" fill="#4DA3FF" />
    <circle cx="98" cy="18" r="9" fill="#FFC329" />
  </svg>,
  // story page
  <svg key="c" viewBox="0 0 120 90" className="h-full w-full" aria-hidden>
    <rect x="24" y="10" width="72" height="72" rx="4" fill="#fff" stroke="#1F5A3E" strokeWidth="3" />
    {[24, 34, 44, 54, 64].map((y) => (
      <path key={y} d={`M34 ${y} H${y === 64 ? 66 : 86}`} stroke="#1F5A3E" strokeWidth="3" strokeLinecap="round" />
    ))}
  </svg>,
  // sunflower
  <svg key="d" viewBox="0 0 120 90" className="h-full w-full" aria-hidden>
    <path d="M60 50 V88" stroke="#1F8A5B" strokeWidth="5" />
    <path d="M60 72 Q44 62 40 72 Q50 80 60 72" fill="#1F8A5B" />
    {Array.from({ length: 12 }).map((_, i) => (
      <ellipse key={i} cx="60" cy="24" rx="6" ry="14" fill="#FFC329" transform={`rotate(${i * 30} 60 38)`} />
    ))}
    <circle cx="60" cy="38" r="11" fill="#6B4D00" />
  </svg>,
];

export function ShowcaseSection() {
  const { tr } = useHome();
  return (
    <section id="showcase" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="display text-4xl font-bold sm:text-5xl">{tr(t.showcase.title)}</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">{tr(t.showcase.sub)}</p>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
          {t.showcase.items.map((s, i) => (
            <li key={i}>
              <figure>
                <div className="rounded-sm border-[10px] border-white p-4 shadow-[0_2px_0_#e3e2f0,0_18px_30px_-18px_rgba(30,30,46,0.5)] outline outline-1 outline-line" style={{ background: frames[i] }}>
                  <div className="aspect-[4/3]">{art[i]}</div>
                </div>
                <figcaption className="mt-4">
                  <span className="inline-block rounded-full bg-honey px-2.5 py-0.5 text-xs font-bold text-ink">{tr(s.place)}</span>
                  <p className="mt-2 font-semibold">{tr(s.who)}</p>
                  <p className="text-sm text-ink-soft">{tr(s.what)}</p>
                  <p className="mt-3 border-t border-line pt-3 text-sm">
                    <span className="block font-semibold text-ink-soft">{tr(t.showcase.noteLabel)}</span>
                    {tr(s.note)}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Parents ---------- */
const parentIcons = [
  "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
  "M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Zm-3 9l2 2 4-4",
  "M6 11V8a6 6 0 1 1 12 0v3M5 11h14v10H5z",
  "M7 3h10v18l-5-3-5 3V3Zm3 6h4",
];

export function ParentsSection() {
  const { tr } = useHome();
  return (
    <section id="parents" className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="display text-4xl font-bold sm:text-5xl">{tr(t.parents.title)}</h2>
          <p className="mt-3 max-w-sm text-lg text-ink-soft">{tr(t.parents.sub)}</p>
        </div>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {t.parents.points.map((p, i) => (
            <li key={i} className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf/10 text-leaf-ink">
                <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
                  <path d={parentIcons[i]} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold">{tr(p.t)}</h3>
                <p className="mt-1 text-ink-soft">{tr(p.d)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- B2B band ---------- */
function Check() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 size-5 shrink-0 text-indigo-wash" aria-hidden>
      <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function B2BBand() {
  const { tr } = useHome();
  return (
    <section id="for-institutions" className="scroll-mt-16 bg-night py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="display max-w-3xl text-4xl font-bold sm:text-5xl">{tr(t.b2b.title)}</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/75">{tr(t.b2b.sub)}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="rounded-3xl bg-white p-7 text-ink sm:p-9">
            <h3 className="font-display text-2xl font-semibold">{tr(t.b2b.inst.t)}</h3>
            <ul className="mt-5 space-y-3">
              {t.b2b.inst.points.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <svg viewBox="0 0 20 20" className="mt-1 size-5 shrink-0 text-indigo" aria-hidden>
                    <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {tr(p)}
                </li>
              ))}
            </ul>
            <a href="#institutions" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-indigo px-6 font-semibold text-white hover:bg-indigo-ink">
              {tr(t.b2b.inst.cta)}
            </a>
          </div>

          <div className="rounded-3xl border border-white/20 p-7 sm:p-9">
            <h3 className="font-display text-2xl font-semibold">{tr(t.b2b.brand.t)}</h3>
            <ul className="mt-5 space-y-3 text-white/85">
              {t.b2b.brand.points.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <Check />
                  {tr(p)}
                </li>
              ))}
            </ul>
            <a href="#partners" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 font-semibold text-night hover:bg-indigo-wash">
              {tr(t.b2b.brand.cta)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function FaqSection() {
  const { tr } = useHome();
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr]">
        <h2 className="display text-4xl font-bold sm:text-5xl">{tr(t.faq.title)}</h2>
        <Accordion.Root className="divide-y divide-line border-y border-line">
          {t.faq.items.map((f, i) => (
            <Accordion.Item key={i}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-5 text-left font-display text-xl font-semibold">
                  {tr(f.q)}
                  <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-indigo-wash text-indigo-ink transition-transform group-data-[panel-open]:rotate-45">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-200 data-[ending-style]:h-0 data-[starting-style]:h-0">
                <p className="max-w-2xl pb-5 text-ink-soft">{tr(f.a)}</p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}

/* ---------- Final CTA + footer ---------- */
export function FinalCta() {
  const { tr } = useHome();
  return (
    <section id="join" aria-labelledby="curtain-title" className="relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden className="curtain absolute inset-0 -z-10" />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 id="curtain-title" className="display text-5xl font-bold text-balance sm:text-7xl" style={{ fontVariationSettings: '"wdth" 118' }}>
          {tr(t.curtain.title)}
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-white/85">{tr(t.curtain.sub)}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#signup" className="inline-flex min-h-14 items-center rounded-full bg-white px-8 text-lg font-semibold text-night hover:bg-indigo-wash">
            {tr(t.nav.join)}
          </a>
          <Link href="/contests" className="inline-flex min-h-14 items-center rounded-full px-6 text-lg font-semibold text-white underline-offset-4 hover:underline">
            {tr(t.curtain.browse)}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const { tr, lang } = useHome();
  return (
    <footer className="border-t border-line bg-white pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo className="h-9" />
          <p className="mt-3 max-w-xs text-ink-soft">{tr(t.footer.tag)}</p>
          <p className="mt-5 text-sm text-ink-soft">{tr(t.footer.call)}</p>
          <a href="tel:+8801737525434" className="font-display text-xl font-semibold hover:text-indigo-ink">
            {num("+880 1737-525434", lang)}
          </a>
        </div>
        {t.footer.cols.map((c, i) => (
          <nav key={i} aria-label={tr(c.t)}>
            <h3 className="font-semibold">{tr(c.t)}</h3>
            <ul className="mt-3 space-y-2">
              {c.links.map((l, j) => (
                <li key={j}>
                  <a href="#" className="text-ink-soft hover:text-ink">
                    {tr(l)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-sm text-ink-soft sm:px-6">
          <span>{tr(t.footer.legal)}</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-ink">{tr(t.footer.terms)}</a>
            <a href="#" className="hover:text-ink">{tr(t.footer.privacy)}</a>
            <LangToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Mobile bottom tab bar ---------- */
export function MobileTabBar() {
  const { tr } = useHome();
  const pathname = usePathname();
  // Contest detail pages have their own sticky join bar; only one bar at the bottom.
  if (pathname.startsWith("/contests/")) return null;
  const items = [
    { href: "/", label: t.nav.home, d: "M4 11l8-7 8 7v9h-5v-6H9v6H4z" },
    { href: "/contests", label: t.nav.contests, d: "M8 4h8v4a4 4 0 0 1-8 0V4Zm-3 1h3v2a3 3 0 0 1-3-2Zm14 0h-3v2a3 3 0 0 0 3-2ZM12 12v5m-4 3h8" },
    { href: "/#games", label: t.nav.games, d: "M6 8h12a3 3 0 0 1 3 3v3a3 3 0 0 1-5 2l-1-1H9l-1 1a3 3 0 0 1-5-2v-3a3 3 0 0 1 3-3Zm2 3v3m-1.5-1.5h3M16 12h.01M18 14h.01" },
    { href: "#login", label: t.nav.profile, d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" },
  ];
  return (
    <nav aria-label="Quick" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <ul className="grid grid-cols-4">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs font-medium text-ink-soft hover:text-indigo-ink">
              <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
                <path d={it.d} stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {tr(it.label)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
