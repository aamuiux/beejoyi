"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import Link from "next/link";
import { useState } from "react";
import { ages, childProfiles, detail, num, t, type Contest } from "@/lib/content";
import { useHome } from "@/lib/home-state";

type Step = "who" | "pay" | "done";
type Method = "bkash" | "nagad" | "card";

const methodStyle: Record<Method, string> = {
  bkash: "bg-[#E2136E] text-white",
  nagad: "bg-[#F6921E] text-white",
  card: "bg-ink text-white",
};

export function JoinDialog({
  c,
  open,
  onOpenChange,
}: {
  c: Contest;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { tr, lang } = useHome();
  const paid = c.fee > 0;
  const fits = (p: (typeof childProfiles)[number]) => c.ages.includes(p.age);
  const firstFit = childProfiles.find(fits)?.id ?? "";

  const [step, setStep] = useState<Step>("who");
  const [who, setWho] = useState<string>(firstFit);
  const [method, setMethod] = useState<Method>("bkash");

  const total = paid ? 3 : 2;
  const index = step === "who" ? 1 : step === "pay" ? 2 : total;
  const fee = `৳${num(c.fee, lang)}`;
  const person = childProfiles.find((p) => p.id === who);
  const allowed = c.ages.map((a) => ages.find((x) => x.key === a)!.label[lang]).join(", ");

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setTimeout(() => setStep("who"), 200); // reset after the close animation
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/50 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 max-h-[90dvh] overflow-y-auto rounded-t-3xl bg-white p-6 transition-all data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-[28rem] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:data-[ending-style]:translate-y-[-45%] sm:data-[ending-style]:opacity-0 sm:data-[starting-style]:translate-y-[-45%] sm:data-[starting-style]:opacity-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              {step !== "done" && (
                <p className="text-sm text-ink-soft">
                  {lang === "bn"
                    ? `${tr(detail.join.step)} ${num(index, lang)} / ${num(total, lang)}`
                    : `${tr(detail.join.step)} ${index} ${tr(detail.join.of)} ${total}`}
                </p>
              )}
              <Dialog.Title className="font-display text-2xl font-semibold">
                {step === "who" ? tr(detail.join.title) : step === "pay" ? tr(detail.join.payTitle) : `🎉 ${tr(detail.join.doneTitle)}`}
              </Dialog.Title>
            </div>
            <Dialog.Close aria-label="Close" className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-indigo-wash">
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </div>

          {/* Step 1: who is joining. Ineligible profiles are disabled with the reason. */}
          {step === "who" && (
            <>
              <RadioGroup value={who} onValueChange={(v) => setWho(v as string)} aria-label={tr(detail.join.title)} className="mt-5 space-y-2.5">
                {childProfiles.map((p) => {
                  const ok = fits(p);
                  return (
                    <label
                      key={p.id}
                      className={`flex min-h-16 items-center gap-3 rounded-2xl border p-3 ${
                        ok ? "cursor-pointer border-line has-[[data-checked]]:border-indigo has-[[data-checked]]:bg-indigo-wash" : "cursor-not-allowed border-line bg-paper opacity-60"
                      }`}
                    >
                      <Radio.Root
                        value={p.id}
                        disabled={!ok}
                        className="grid size-6 shrink-0 place-items-center rounded-full border-2 border-ink/25 data-[checked]:border-indigo"
                      >
                        <Radio.Indicator className="size-3 rounded-full bg-indigo" />
                      </Radio.Root>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-honey-wash font-display font-semibold text-honey-ink">
                        {p.name[lang].slice(0, 1)}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold">{tr(p.name)}</span>
                        <span className="block text-sm text-ink-soft">
                          {ok ? tr(p.cls) : `${tr(p.cls)}: ${tr(detail.join.onlyFor)} ${allowed}`}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </RadioGroup>
              <button type="button" className="mt-3 min-h-11 px-1 font-semibold text-indigo-ink hover:underline">
                + {tr(detail.join.addChild)}
              </button>
              <p className="mt-1 text-xs text-ink-soft">{tr(detail.join.sample)}</p>
              <button
                type="button"
                disabled={!who}
                onClick={() => setStep(paid ? "pay" : "done")}
                className="mt-6 min-h-13 w-full rounded-full bg-indigo text-lg font-semibold text-white hover:bg-indigo-ink disabled:opacity-40"
              >
                {paid ? tr(detail.join.next) : tr(detail.join.confirm)}
              </button>
            </>
          )}

          {/* Step 2: payment (paid contests only) */}
          {step === "pay" && (
            <>
              <div className="mt-5 flex items-baseline justify-between rounded-2xl bg-paper p-4">
                <span className="text-ink-soft">
                  {lang === "bn"
                    ? `${tr(detail.join.payFor)} (${person ? tr(person.name) : ""})`
                    : `${tr(detail.join.payFor)} ${person ? tr(person.name) : ""}`}
                </span>
                <span className="font-display text-2xl font-semibold">{fee}</span>
              </div>
              <RadioGroup value={method} onValueChange={(v) => setMethod(v as Method)} className="mt-4 grid grid-cols-3 gap-2.5">
                {(["bkash", "nagad", "card"] as const).map((m) => (
                  <label
                    key={m}
                    className="flex min-h-20 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-line p-2 has-[[data-checked]]:border-indigo"
                  >
                    <Radio.Root value={m} className="sr-only">
                      <Radio.Indicator />
                    </Radio.Root>
                    <span className={`grid h-8 min-w-14 place-items-center rounded-lg px-2 text-sm font-bold ${methodStyle[m]}`}>
                      {tr(detail.join.methods[m])}
                    </span>
                  </label>
                ))}
              </RadioGroup>
              <p className="mt-3 text-xs text-ink-soft">{tr(detail.join.mock)}</p>
              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep("who")} className="min-h-13 rounded-full px-5 font-semibold text-ink-soft hover:text-ink">
                  {tr(detail.join.back)}
                </button>
                {/* The amount and method are repeated on the button */}
                <button
                  type="button"
                  onClick={() => setStep("done")}
                  className="min-h-13 flex-1 rounded-full bg-indigo text-lg font-semibold text-white hover:bg-indigo-ink"
                >
                  {lang === "bn"
                    ? `${tr(detail.join.methods[method])}ে ${fee} ${tr(detail.join.pay)}`
                    : `${tr(detail.join.pay)} ${fee} with ${tr(detail.join.methods[method])}`}
                </button>
              </div>
            </>
          )}

          {/* Step 3: celebrate, then exactly one next step (peak-end) */}
          {step === "done" && (
            <div className="mt-2 text-center">
              <div aria-hidden className="mx-auto my-4 grid size-24 place-items-center rounded-full bg-honey text-5xl">
                🏆
              </div>
              <p className="text-lg">
                <strong>{person && tr(person.name)}</strong>, {tr(c.title)}
              </p>
              <p className="mt-3 text-ink-soft">
                {tr(detail.join.doneBody)}{" "}
                <strong className="text-alert">
                  {c.daysLeft <= 1 ? tr(t.contests.lastDay) : `${num(c.daysLeft, lang)} ${tr(t.contests.daysLeft)}`}
                </strong>
              </p>
              <Link
                href={`/contests/${c.id}/submit`}
                className="mt-6 flex min-h-13 w-full items-center justify-center rounded-full bg-indigo text-lg font-semibold text-white hover:bg-indigo-ink"
              >
                {tr(detail.join.submit)}
              </Link>
              <Dialog.Close className="mt-2 min-h-11 w-full font-semibold text-ink-soft hover:text-ink">{tr(detail.join.later)}</Dialog.Close>
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
