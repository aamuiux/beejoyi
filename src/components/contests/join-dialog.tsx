"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import Link from "next/link";
import { useState } from "react";
import { ages, childProfiles, detail, num, t, type Contest } from "@/lib/content";
import { useHome } from "@/lib/home-state";

type Step = "who" | "team" | "pay" | "done";
type Member = { name: string; phone: string };

const BN = "০১২৩৪৫৬৭৮৯";
/** Accept Bangla digits, spaces, dashes and +880 (Postel), then check it's a BD mobile number. */
const normalPhone = (v: string) => {
  const d = v.replace(/[০-৯]/g, (x) => String(BN.indexOf(x))).replace(/\D/g, "");
  return d.startsWith("880") ? `0${d.slice(3)}` : d;
};
const phoneOk = (v: string) => /^01[3-9]\d{8}$/.test(normalPhone(v));

/** The join button's label, shared by the card and the detail page. */
export function joinLabel(c: Contest, tr: (l: { bn: string; en: string }) => string, lang: "bn" | "en") {
  const fee = `৳${num(c.fee, lang)}`;
  if (c.format === "debate" && c.fee === 0) return tr(detail.join.team.cta);
  if (c.fee === 0) return tr(detail.cta.joinFree);
  return lang === "bn" ? `${fee} ${tr(detail.cta.joinPaid)}` : `Pay ${fee} ${tr(detail.cta.joinPaid)}`;
}
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

  const debate = c.format === "debate";
  const first: Step = debate ? "team" : "who";
  const tm = detail.join.team;

  const [step, setStep] = useState<Step>(first);
  const [team, setTeam] = useState({ name: "", school: "" });
  const [members, setMembers] = useState<Member[]>([
    { name: "", phone: "" },
    { name: "", phone: "" },
    { name: "", phone: "" },
  ]);
  const [tried, setTried] = useState(false);
  const [who, setWho] = useState<string>(firstFit);
  const [method, setMethod] = useState<Method>("bkash");

  const total = paid ? 3 : 2;
  const index = step === "who" || step === "team" ? 1 : step === "pay" ? 2 : total;

  // Team form: errors appear only after the first attempt, next to the field that needs fixing.
  const errs = {
    name: !team.name.trim(),
    school: !team.school.trim(),
    members: members.map((m, i) => ({ name: !m.name.trim(), phone: i > 0 && !phoneOk(m.phone) })),
  };
  const teamOk = !errs.name && !errs.school && errs.members.every((m) => !m.name && !m.phone);
  const setMember = (i: number, patch: Partial<Member>) =>
    setMembers((l) => l.map((m, n) => (n === i ? { ...m, ...patch } : m)));
  const fee = `৳${num(c.fee, lang)}`;
  const person = childProfiles.find((p) => p.id === who);
  const payer = debate ? team.name : person ? tr(person.name) : "";
  const allowed = c.ages.map((a) => ages.find((x) => x.key === a)!.label[lang]).join(", ");

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setTimeout(() => (setStep(first), setTried(false)), 200); // reset after the close animation
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
                {step === "who" ? tr(detail.join.title) : step === "team" ? tr(tm.title) : step === "pay" ? tr(detail.join.payTitle) : `🎉 ${tr(detail.join.doneTitle)}`}
              </Dialog.Title>
            </div>
            <Dialog.Close aria-label="Close" className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-indigo-wash">
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </div>

          {/* Step 1 (debate): register a team of three. Wins go to the whole team. */}
          {step === "team" && (
            <form
              noValidate
              onSubmit={(ev) => {
                ev.preventDefault();
                setTried(true);
                if (teamOk) setStep(paid ? "pay" : "done");
                else {
                  // Move focus to the first field that needs fixing (errors render on the next paint).
                  const bad = [
                    errs.name && "team-name",
                    errs.school && "team-school",
                    ...errs.members.flatMap((m, i) => [m.name && `m${i}-name`, m.phone && `m${i}-phone`]),
                  ].find(Boolean);
                  if (bad) document.getElementById(bad)?.focus();
                }
              }}
              className="mt-5 space-y-4"
            >
              <Field
                id="team-name"
                label={tr(tm.name)}
                value={team.name}
                onChange={(v) => setTeam({ ...team, name: v })}
                error={tried && errs.name ? tr(tm.errName) : undefined}
              />
              <Field
                id="team-school"
                label={tr(tm.school)}
                hint={tr(tm.schoolHint)}
                value={team.school}
                onChange={(v) => setTeam({ ...team, school: v })}
                error={tried && errs.school ? tr(tm.errSchool) : undefined}
              />
              <fieldset>
                <legend className="font-semibold">{tr(tm.members)}</legend>
                <ol className="mt-2 space-y-3">
                  {members.map((m, i) => (
                    <li key={i} className="rounded-2xl border border-line p-3">
                      <p className="mb-2 text-sm font-semibold text-indigo-ink">
                        {i === 0 ? tr(tm.captain) : `${tr(tm.member)} ${num(i + 1, lang)}`}
                      </p>
                      <div className="space-y-2">
                        <Field
                          id={`m${i}-name`}
                          label={tr(tm.memberName)}
                          value={m.name}
                          onChange={(v) => setMember(i, { name: v })}
                          error={tried && errs.members[i].name ? tr(tm.errMember) : undefined}
                          compact
                        />
                        {i === 0 ? (
                          <p className="text-xs text-ink-soft">{tr(tm.captainPhone)}</p>
                        ) : (
                          <Field
                            id={`m${i}-phone`}
                            label={tr(tm.phone)}
                            value={m.phone}
                            onChange={(v) => setMember(i, { phone: v })}
                            error={tried && errs.members[i].phone ? tr(tm.errPhone) : undefined}
                            type="tel"
                            placeholder="01XXXXXXXXX"
                            compact
                          />
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </fieldset>
              <button type="submit" className="min-h-13 w-full rounded-full bg-indigo text-lg font-semibold text-white hover:bg-indigo-ink">
                {paid ? tr(detail.join.next) : tr(tm.register)}
              </button>
            </form>
          )}

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
                    ? `${tr(detail.join.payFor)} (${payer})`
                    : `${tr(detail.join.payFor)} ${payer}`}
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
                <button type="button" onClick={() => setStep(first)} className="min-h-13 rounded-full px-5 font-semibold text-ink-soft hover:text-ink">
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
                <strong>{debate ? team.name : person && tr(person.name)}</strong>, {tr(c.title)}
              </p>
              {c.format === "quiz" ? (
                <>
                  {/* Quiz: nothing to submit; the one thing to remember is when it starts */}
                  <p className="mt-3 text-ink-soft">{tr(detail.join.quizBody)}</p>
                  <p className="display mt-2 rounded-2xl bg-indigo-wash p-4 text-xl font-bold text-indigo-ink">
                    {c.quizAt ? tr(c.quizAt) : tr(detail.join.quizSoon)}
                  </p>
                  <p className="mt-3 text-sm text-ink-soft">{tr(detail.join.quizRemind)}</p>
                  <Dialog.Close className="mt-6 min-h-13 w-full rounded-full bg-indigo text-lg font-semibold text-white hover:bg-indigo-ink">
                    {tr(detail.join.ok)}
                  </Dialog.Close>
                </>
              ) : debate ? (
                <>
                  <ul className="mt-4 flex flex-wrap justify-center gap-2">
                    {members.map((m, i) => (
                      <li key={i} className="rounded-full bg-paper px-3 py-1 text-sm font-semibold">
                        {m.name}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-ink-soft">{tr(tm.doneBody)}</p>
                  <Dialog.Close className="mt-6 min-h-13 w-full rounded-full bg-indigo text-lg font-semibold text-white hover:bg-indigo-ink">
                    {tr(detail.join.ok)}
                  </Dialog.Close>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  placeholder,
  compact,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  placeholder?: string;
  compact?: boolean;
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className={compact ? "text-sm text-ink-soft" : "font-semibold"}>
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-ink-soft">
          {hint}
        </p>
      )}
      <input
        id={id}
        type={type}
        inputMode={type === "tel" ? "tel" : undefined}
        autoComplete={type === "tel" ? "tel" : "off"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="mt-1 min-h-12 w-full rounded-xl border border-line bg-white px-3 text-base outline-none focus:border-indigo aria-[invalid=true]:border-alert"
      />
      {error && (
        <p id={`${id}-err`} className="mt-1 text-sm font-semibold text-alert">
          {error}
        </p>
      )}
    </div>
  );
}
