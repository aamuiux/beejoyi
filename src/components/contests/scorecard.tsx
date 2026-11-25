"use client";

/**
 * The Skill Scorecard every finisher gets, not only winners (peak-end; no one
 * leaves empty-handed). A 1–7 score per rubric criterion, learner-profile
 * badges, the judge's comment and a public verify link, co-branded with the
 * sponsor. Sample data until real results come from the API.
 */

import { useState } from "react";
import { CheckIcon, ScorecardIcon } from "@/components/icons";
import { detail, formatGuides, num, type Contest } from "@/lib/content";
import { useHome } from "@/lib/home-state";

const sc = detail.scorecard;

/** compact: the card alone (no intro line or action buttons), for showing it as an example. */
export function Scorecard({ c, compact }: { c: Contest; compact?: boolean }) {
  const { tr, lang } = useHome();
  const [copied, setCopied] = useState(false);
  const rubric = formatGuides[c.format].rubric;
  const code = `BJ-${c.id.toUpperCase()}-4821`;
  const verify = `https://beejoyi.com/v/${code}`;

  return (
    <div>
      {!compact && <p className="max-w-[65ch] text-ink-soft">{tr(sc.sub)}</p>}

      <article className={`${compact ? "" : "mt-5"} max-w-2xl overflow-hidden rounded-3xl border border-line bg-white text-ink shadow-[0_18px_40px_-28px_rgba(24,31,56,0.45)]`}>
        {/* Header: the credential itself */}
        <header className="flex items-start justify-between gap-4 bg-navy px-5 py-4 text-white sm:px-6">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-honey">
              <ScorecardIcon className="size-4" />
              {tr(sc.kind)}
            </p>
            <p className="display mt-1 text-2xl font-bold">{tr(sc.name)}</p>
            <p className="text-sm text-white/75">{tr(sc.cls)}</p>
          </div>
          <p className="max-w-[45%] text-right text-sm text-white/75">{tr(c.title)}</p>
        </header>

        <div className="grid gap-6 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
          {/* One row per criterion: a 7-step scale reads at a glance on a phone */}
          <ul className="space-y-4">
            {rubric.map((r, i) => {
              const score = sc.scores[i % sc.scores.length];
              return (
                <li key={i}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-medium">{tr(r.name)}</span>
                    <span className="font-display text-lg font-semibold tabular-nums">
                      {num(score, lang)}
                      <span className="text-sm font-normal text-ink-soft">{tr(sc.of7)}</span>
                    </span>
                  </div>
                  <div className="mt-1.5 grid grid-cols-7 gap-1" aria-hidden>
                    {Array.from({ length: 7 }, (_, n) => (
                      <span key={n} className={`h-2 rounded-full ${n < score ? "bg-indigo" : "bg-indigo-wash"}`} />
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="sm:w-44">
            <p className="text-sm font-semibold text-ink-soft">{tr(sc.profile)}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {sc.badges.map((b, i) => (
                <li key={i} className="rounded-full bg-honey-wash px-3 py-1 text-sm font-semibold text-honey-ink">
                  {tr(b)}
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="rounded-2xl bg-paper p-4 sm:col-span-2">
            <p className="text-sm font-semibold text-ink-soft">{tr(sc.comment)}</p>
            <p className="mt-1">{tr(sc.commentText)}</p>
          </blockquote>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-line px-5 py-3 text-sm sm:px-6">
          <span className="flex items-center gap-1.5 font-semibold text-leaf-ink">
            <CheckIcon className="size-4" />
            {c.sponsor ? tr(sc.poweredBy).replace("{sponsor}", tr(c.sponsor)) : tr(sc.poweredSolo)}
          </span>
          <span className="font-mono text-xs text-ink-soft">{verify.replace("https://", "")}</span>
        </footer>
      </article>

      {!compact && (
      <div className="mt-4 flex max-w-2xl flex-wrap gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-11 rounded-full bg-indigo px-5 font-semibold text-white hover:bg-indigo-ink"
        >
          {tr(sc.download)}
        </button>
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard?.writeText(verify);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          aria-live="polite"
          className="min-h-11 rounded-full border border-line bg-white px-5 font-semibold hover:border-ink/40"
        >
          {copied ? tr(sc.copied) : tr(sc.copy)}
        </button>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(verify)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-full bg-[#1877F2]/10 px-5 font-semibold text-[#0B5FCC] hover:bg-[#1877F2]/20"
        >
          {tr(sc.share)}
        </a>
      </div>
      )}
    </div>
  );
}
