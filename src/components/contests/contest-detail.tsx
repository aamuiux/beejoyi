"use client";

import { Accordion } from "@base-ui/react/accordion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ContestCard } from "@/components/home/contest-card";
import { PosterArt } from "@/components/home/poster-art";
import { ages, contests, detail, num, statusOf, formatGuides, t, type Contest } from "@/lib/content";
import { useHome } from "@/lib/home-state";
import { HandshakeIcon, HeadphonesIcon, ScorecardIcon } from "@/components/icons";
import { JoinDialog, joinLabel } from "./join-dialog";
import { Scorecard } from "./scorecard";
import { Winners } from "./winner-entry";

export function ContestDetail({ id }: { id: string }) {
  const { tr, lang } = useHome();
  const c = contests.find((x) => x.id === id)!;
  const status = statusOf(c);
  const guide = formatGuides[c.format];
  const [joinOpen, setJoinOpen] = useState(false);
  const [reminded, setReminded] = useState(false);

  const ageLabel = c.ages.map((a) => ages.find((x) => x.key === a)!.label[lang]).join(", ");
  const fee = c.fee === 0 ? tr(t.contests.free) : `৳${num(c.fee, lang)}`;
  const urgent = status === "open" && c.daysLeft <= 2;
  const daysText = (d: number) => (d <= 1 && status === "open" ? tr(t.contests.lastDay) : `${num(d, lang)} ${tr(t.contests.daysLeft)}`);

  const deadline =
    status === "open"
      ? { label: tr(detail.facts.deadline), value: daysText(c.daysLeft) }
      : status === "upcoming"
        ? { label: tr(detail.facts.opens), value: `${num(c.startsIn ?? 0, lang)} ${tr(detail.inDays)}` }
        : { label: tr(detail.facts.deadline), value: tr(detail.facts.ended) };

  const facts: { label: string; value: string; tone?: string; sub?: string }[] = [
    { label: tr(detail.facts.age), value: ageLabel },
    {
      label: tr(detail.facts.fee),
      value: fee,
      tone: c.fee === 0 ? "free" : undefined,
      // Free because a sponsor pays; say who (trust: "free" shouldn't read like a catch)
      sub: c.sponsor ? `${tr(detail.sponsor.by)} ${tr(c.sponsor)}` : undefined,
    },
    { ...deadline, tone: urgent ? "urgent" : undefined },
    { label: tr(detail.facts.prize), value: tr(c.prize) },
  ];

  const sections: (keyof typeof detail.sections)[] = [
    ...(status === "ended" ? (["winners", "scorecard"] as const) : []),
    "overview",
    // Multi-round contests show their rounds instead of a one-off timeline
    c.round ? ("rounds" as const) : ("timeline" as const),
    "how",
    "rules",
    "judging",
    "faq",
  ];

  const primary =
    status === "open" ? (
      <button
        type="button"
        onClick={() => setJoinOpen(true)}
        className="min-h-13 w-full rounded-full bg-indigo px-6 text-lg font-semibold text-white hover:bg-indigo-ink"
      >
        {joinLabel(c, tr, lang)}
      </button>
    ) : status === "upcoming" ? (
      <button
        type="button"
        onClick={() => setReminded(true)}
        aria-pressed={reminded}
        className="min-h-13 w-full rounded-full border-2 border-indigo px-6 text-lg font-semibold text-indigo-ink hover:bg-indigo-wash aria-pressed:border-leaf aria-pressed:text-leaf-ink"
      >
        {reminded ? `✓ ${tr(detail.cta.reminded)}` : tr(detail.cta.remind)}
      </button>
    ) : (
      <a href="#winners" className="flex min-h-13 w-full items-center justify-center rounded-full bg-leaf-ink px-6 text-lg font-semibold text-white">
        {tr(detail.cta.winners)}
      </a>
    );

  const similar = contests
    .filter((x) => x.id !== c.id && statusOf(x) === "open" && (x.cat === c.cat || x.ages.some((a) => c.ages.includes(a))))
    .sort((a, b) => Number(b.cat === c.cat) - Number(a.cat === c.cat))
    .slice(0, 4);

  return (
    <main className="pb-28 lg:pb-16">
      {/* ---------- Top: poster + the four answers ---------- */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <Link href="/contests" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink-soft hover:text-ink">
          <span aria-hidden>‹</span> {tr(detail.back)}
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-center">
          <div
            className={`relative aspect-[4/3] rounded-3xl p-10 ${status === "ended" ? "saturate-[.35]" : ""}`}
            style={{ background: c.poster.bg }}
          >
            <PosterArt shape={c.poster.shape} ink={c.poster.ink} />
          </div>

          <div>
            <p className="flex flex-wrap items-center gap-2 text-ink-soft">
              <span className="grid size-8 place-items-center rounded-full bg-indigo-wash text-sm font-bold text-indigo-ink">{c.orgInitial}</span>
              <span className="font-medium text-ink">{tr(c.org)}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-leaf/10 px-2.5 py-0.5 text-xs font-semibold text-leaf-ink">
                <svg viewBox="0 0 20 20" className="size-3.5" aria-hidden>
                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {tr(detail.verified)}
              </span>
            </p>
            {c.sponsor && (
              <p className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
                <HandshakeIcon className="mt-0.5 size-4 shrink-0 text-indigo-ink" />
                <span>
                  {tr(detail.sponsor.by)} <span className="font-semibold text-ink">{tr(c.sponsor)}</span>
                  {lang === "bn" ? "। " : ". "}
                  {tr(detail.sponsor.note)}
                </span>
              </p>
            )}
            <h1 className="display mt-3 text-4xl font-bold sm:text-5xl">{tr(c.title)}</h1>

            <dl className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className={`rounded-2xl border p-4 ${
                    f.tone === "free" ? "border-honey bg-honey-wash" : f.tone === "urgent" ? "border-alert/30 bg-alert/5" : "border-line bg-white"
                  }`}
                >
                  <dt className="text-sm text-ink-soft">{f.label}</dt>
                  <dd className={`mt-1 font-display text-lg leading-snug font-semibold ${f.tone === "urgent" ? "text-alert" : ""}`}>{f.value}</dd>
                  {f.sub && <dd className="mt-0.5 text-xs text-honey-ink">{f.sub}</dd>}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ---------- Section shortcuts ---------- */}
      <nav aria-label={tr(detail.sections.overview)} className="sticky top-16 z-30 mt-10 border-y border-line bg-paper/95 backdrop-blur">
        <ul className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
          {sections.map((s) => (
            <li key={s}>
              <a href={`#${s}`} className="flex min-h-12 shrink-0 items-center px-3 font-medium whitespace-nowrap text-ink-soft hover:text-ink">
                {tr(detail.sections[s])}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0 space-y-14">
          {status === "ended" && (
            <Section id="winners" title={tr(detail.sections.winners)}>
              <Winners c={c} />
            </Section>
          )}
          {status === "ended" && (
            <Section id="scorecard" title={tr(detail.scorecard.title)}>
              <Scorecard c={c} />
            </Section>
          )}

          <Section id="overview" title={tr(detail.sections.overview)}>
            {/* Statement of inquiry: the real-world question the whole contest explores */}
            {c.inquiry && (
              <div className="mb-6 max-w-[65ch] rounded-3xl bg-night p-6 text-white">
                <p className="text-sm font-semibold text-honey">{tr(detail.inquiry)}</p>
                <p className="display mt-2 text-2xl font-bold sm:text-3xl">{tr(c.inquiry)}</p>
              </div>
            )}
            <p className="max-w-[65ch] text-lg">{tr(guide.overview)}</p>
            <p className="mt-4 flex max-w-[65ch] gap-3 rounded-2xl bg-honey-wash p-4 text-honey-ink">
              <ScorecardIcon className="mt-1 size-5 shrink-0" />
              {tr(detail.everyone)}
            </p>
          </Section>

          {c.round ? (
            <Section id="rounds" title={tr(detail.sections.rounds)}>
              <Rounds c={c} />
            </Section>
          ) : (
            <Section id="timeline" title={tr(detail.sections.timeline)}>
              <Timeline c={c} />
            </Section>
          )}

          <Section id="how" title={tr(detail.sections.how)}>
            <ol className="grid gap-4 sm:grid-cols-3">
              {guide.steps.map((s, i) => (
                <li key={i} className="flex gap-3 sm:flex-col">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo font-display font-bold text-white">{num(i + 1, lang)}</span>
                  <span className="font-medium">{tr(s)}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-2xl border border-line bg-white p-4">
              <span className="font-semibold">{tr(detail.format)}: </span>
              {tr(guide.format)}
            </p>
          </Section>

          <Section id="rules" title={tr(detail.sections.rules)}>
            <ul className="max-w-[65ch] space-y-3">
              {guide.rules.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-indigo" />
                  {tr(r)}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="judging" title={tr(detail.sections.judging)}>
            <p className="max-w-[65ch] text-ink-soft">{tr(detail.rubricNote)}</p>
            <Rubric guide={guide} />
          </Section>

          <Section id="faq" title={tr(detail.sections.faq)}>
            <Accordion.Root className="divide-y divide-line border-y border-line">
              {detail.faq.map((f, i) => (
                <Accordion.Item key={i}>
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left font-semibold">
                      {tr(f.q)}
                      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-indigo-wash text-indigo-ink transition-transform group-data-[panel-open]:rotate-45">
                        +
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-200 data-[ending-style]:h-0 data-[starting-style]:h-0">
                    <p className="pb-4 text-ink-soft">{tr(f.a)}</p>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </Section>
        </div>

        {/* ---------- Sticky action card (desktop) ---------- */}
        <aside className="hidden lg:block">
          <div className="sticky top-36 rounded-3xl border border-line bg-white p-6">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-bold">{fee}</span>
              {status === "open" && (
                <span className={urgent ? "font-semibold text-alert" : "text-ink-soft"}>{daysText(c.daysLeft)}</span>
              )}
            </div>
            {c.joined > 0 && (
              <p className="mt-1 text-sm text-ink-soft">
                {num(c.joined, lang)} {tr(detail.sidebar.joined)}
              </p>
            )}
            <div className="mt-5">{primary}</div>
            <ShareRow title={tr(c.title)} />
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">{tr(detail.similar)}</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((s) => (
              <li key={s.id}>
                <ContestCard c={s} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- Sticky action bar (mobile) ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <p className="font-display text-xl leading-none font-bold">{fee}</p>
            {status === "open" && <p className={`mt-1 text-sm ${urgent ? "font-semibold text-alert" : "text-ink-soft"}`}>{daysText(c.daysLeft)}</p>}
          </div>
          <div className="flex-1">{primary}</div>
        </div>
      </div>

      {status === "open" && <JoinDialog c={c} open={joinOpen} onOpenChange={setJoinOpen} />}
    </main>
  );
}

/** The published 1–7 rubric: the scale once, then what a 7 means for each criterion. */
function Rubric({ guide }: { guide: (typeof formatGuides)[keyof typeof formatGuides] }) {
  const { tr, lang } = useHome();
  return (
    <div className="mt-5 max-w-2xl">
      <div aria-hidden className="grid grid-cols-7 gap-1 text-center text-sm font-semibold">
        {Array.from({ length: 7 }, (_, n) => (
          <span
            key={n}
            className={`rounded-lg py-1.5 ${n === 6 ? "bg-indigo-ink text-white" : n >= 4 ? "bg-indigo text-white" : n >= 2 ? "bg-indigo/25 text-indigo-ink" : "bg-indigo-wash text-indigo-ink"}`}
          >
            {num(n + 1, lang)}
          </span>
        ))}
      </div>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
        {detail.bands.map((b, i) => (
          <span key={i}>{tr(b)}</span>
        ))}
      </p>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {guide.rubric.map((r, i) => (
          <li key={i} className="py-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-semibold">{tr(r.name)}</span>
              <span className="shrink-0 text-sm text-ink-soft tabular-nums">
                {tr(detail.weight)} {num(r.weight, lang)}%
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-line" aria-hidden>
              <div className="h-full rounded-full bg-indigo" style={{ width: `${r.weight}%` }} />
            </div>
            <p className="mt-2 text-sm">
              <span className="font-semibold text-indigo-ink">{tr(detail.topLabel)}</span> {tr(r.top)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Multi-round journey: inquiry, then feedback and improvement, then the finale. */
function Rounds({ c }: { c: Contest }) {
  const { tr, lang } = useHome();
  const status = statusOf(c);
  const now = c.round!.now;
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {detail.rounds.map((r, i) => {
        const n = i + 1;
        const state = status === "ended" || n < now ? "done" : n === now && status === "open" ? "now" : "next";
        return (
          <li
            key={i}
            className={`flex flex-col rounded-2xl border p-5 ${
              state === "now" ? "border-indigo bg-white ring-4 ring-indigo/10" : state === "done" ? "border-line bg-white" : "border-dashed border-line bg-paper"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`grid size-10 place-items-center rounded-full font-display font-bold ${
                  state === "next" ? "border-2 border-line text-ink-soft" : "bg-indigo text-white"
                }`}
              >
                {num(n, lang)}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  state === "now" ? "bg-honey text-ink" : state === "done" ? "bg-leaf/10 text-leaf-ink" : "bg-line text-ink-soft"
                }`}
              >
                {tr(detail.roundState[state])}
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold">{tr(r.t)}</h3>
            <p className="mt-1 text-ink-soft">{tr(r.d)}</p>
            {i === 1 && (
              <p className="mt-3 flex gap-2 rounded-xl bg-indigo-wash p-3 text-sm text-indigo-ink">
                <HeadphonesIcon className="mt-0.5 size-4 shrink-0" />
                {tr(detail.clinic)}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="mb-5 font-display text-3xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

/** A real sequence, so it is numbered. Offsets are relative to today. */
function Timeline({ c }: { c: Contest }) {
  const { tr, lang } = useHome();
  const status = statusOf(c);
  const start = status === "upcoming" ? (c.startsIn ?? 0) : 0;
  const end = status === "upcoming" ? start + c.daysLeft : c.daysLeft;
  const offsets = [start, end, end + 1, end + 7, end + 10];
  const current = status === "ended" ? 5 : status === "upcoming" ? 0 : 1;

  return (
    <ol className="relative max-w-xl">
      {detail.timeline.map((label, i) => {
        const done = i < current;
        const now = i === current && status === "open";
        const when =
          status === "ended" || done
            ? tr(detail.when.done)
            : now
              ? `${tr(detail.when.now)}: ${c.daysLeft <= 1 ? tr(t.contests.lastDay) : `${num(c.daysLeft, lang)} ${tr(t.contests.daysLeft)}`}`
              : `${num(offsets[i], lang)} ${tr(detail.when.days)}`;
        return (
          <li key={i} className="relative flex gap-4 pb-7 last:pb-0">
            {i < detail.timeline.length - 1 && <span aria-hidden className={`absolute top-10 left-5 h-[calc(100%-2.5rem)] w-0.5 ${done ? "bg-indigo" : "bg-line"}`} />}
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-full font-display font-bold ${
                done ? "bg-indigo text-white" : now ? "bg-honey text-ink ring-4 ring-honey/30" : "border-2 border-line bg-white text-ink-soft"
              }`}
            >
              {done ? "✓" : num(i + 1, lang)}
            </span>
            <div className="pt-1.5">
              <p className={`font-semibold ${!done && !now ? "text-ink-soft" : ""}`}>{tr(label)}</p>
              <p className={`text-sm ${now ? "font-semibold text-alert" : "text-ink-soft"}`}>{when}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ShareRow({ title }: { title: string }) {
  const { tr } = useHome();
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is only known in the browser
  useEffect(() => setUrl(window.location.href), []);

  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-2 flex min-h-11 items-center justify-center rounded-full bg-[#1877F2]/10 text-sm font-semibold text-[#0B5FCC] hover:bg-[#1877F2]/20"
      >
        {tr(detail.sidebar.facebook)}
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-[#25D366]/10 text-sm font-semibold text-[#128C4A] hover:bg-[#25D366]/20"
      >
        {tr(detail.sidebar.whatsapp)}
      </a>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard?.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="min-h-11 rounded-full border border-line text-sm font-semibold hover:border-ink/40"
        aria-live="polite"
      >
        {copied ? `✓ ${tr(detail.sidebar.copied)}` : tr(detail.sidebar.copy)}
      </button>
    </div>
  );
}
