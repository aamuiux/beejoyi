"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { Select } from "@base-ui/react/select";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  BookIcon,
  CameraIcon,
  ClockIcon,
  DocIcon,
  FilmIcon,
  GalleryIcon,
  HeadphonesIcon,
  LockIcon,
  MicIcon,
  PlayIcon,
} from "@/components/icons";
import {
  ages,
  childProfiles,
  contests,
  num,
  statusOf,
  formatGuides,
  REFLECT,
  submit as s,
  t,
  uploadRules,
  WORDS,
  type Lang,
} from "@/lib/content";
import { useHome } from "@/lib/home-state";

type Item = {
  id: string;
  name: string;
  type: string;
  sizeMB: number;
  url: string;
  progress: number;
  status: "uploading" | "done" | "failed";
  /** size before it was shrunk on the phone, if it was */
  origMB?: number;
};
type Draft = {
  who: string;
  caption: string;
  text: string;
  mode: "write" | "upload";
  own: boolean;
  rules: boolean;
  consent: boolean;
  /** finished the 3-minute learning card (progressive disclosure gate) */
  learned: boolean;
  /** the three guided process prompts */
  notes: [string, string, string];
  /** round 2+ reflection log: which feedback was applied */
  reflect: string;
};
type Entry = {
  receipt: string;
  who: string;
  caption: string;
  files: { name: string; url: string; type: string }[];
  words: number;
};

const fill = (str: string, vars: Record<string, string>) =>
  str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
const countWords = (txt: string) =>
  txt.trim().split(/\s+/).filter(Boolean).length;
const sizeLabel = (mb: number, lang: Lang) =>
  mb < 1
    ? `${num(Math.max(1, Math.round(mb * 1024)), lang)} KB`
    : `${num(mb.toFixed(1), lang)} MB`;

/**
 * Shrink big photos on the phone before upload (blueprint: low-bandwidth).
 * Long side 2000 px, JPEG 82%. Falls back to the original on any failure.
 */
async function shrink(f: File): Promise<File> {
  if (!f.type.startsWith("image/") || f.size < 1.5 * 1024 * 1024) return f;
  try {
    const bmp = await createImageBitmap(f);
    const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")?.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) =>
      canvas.toBlob(r, "image/jpeg", 0.82),
    );
    if (!blob || blob.size >= f.size) return f;
    return new File([blob], f.name.replace(/\.\w+$/, "") + ".jpg", {
      type: "image/jpeg",
    });
  } catch {
    return f;
  }
}

const accepts = (accept: string, type: string) =>
  accept
    .split(",")
    .some((a) =>
      a.endsWith("/*") ? type.startsWith(a.slice(0, -1)) : a === type,
    );

export function SubmitEntry({ id }: { id: string }) {
  const { tr, lang } = useHome();
  const c = contests.find((x) => x.id === id)!;
  const rule = uploadRules[c.format];
  const guide = formatGuides[c.format];
  const eligible = childProfiles.filter((p) => c.ages.includes(p.age));
  // Round 2 and the finale ask what feedback you used (process capture; deters AI copy-paste)
  const needsReflect = !!c.round && c.round.now >= 2;
  const forKids = c.ages.some((a) => a === "pre" || a === "p1");
  const workRef = useRef<HTMLDivElement>(null);

  const [draft, setDraft] = useState<Draft>({
    who: eligible[0]?.id ?? "",
    caption: "",
    text: "",
    mode: "write",
    own: false,
    rules: false,
    consent: false,
    learned: false,
    notes: ["", "", ""],
    reflect: "",
  });
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState(0);
  const [online, setOnline] = useState(true);
  const [sending, setSending] = useState(false);
  const [entry, setEntry] = useState<Entry | null>(null);
  const loaded = useRef(false);

  /* ---------- Restore draft and previous submission ---------- */
  useEffect(() => {
    const d = localStorage.getItem(`bj-draft-${id}`);
    const e = localStorage.getItem(`bj-entry-${id}`);
    /* eslint-disable react-hooks/set-state-in-effect -- restoring browser-only state after hydration */
    if (d) setDraft((prev) => ({ ...prev, ...JSON.parse(d) }));
    if (e) setEntry(JSON.parse(e));
    setOnline(navigator.onLine);
    /* eslint-enable react-hooks/set-state-in-effect */
    loaded.current = true;
    const on = () => setOnline(true);
    const off = () => {
      setOnline(false);
      setItems((list) =>
        list.map((it) =>
          it.status === "uploading" ? { ...it, status: "failed" } : it,
        ),
      );
    };
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, [id]);

  /* ---------- Auto-save draft (debounced) ---------- */
  useEffect(() => {
    if (!loaded.current) return;
    const tm = setTimeout(() => {
      localStorage.setItem(`bj-draft-${id}`, JSON.stringify(draft));
      setSavedAt(Date.now());
    }, 600);
    return () => clearTimeout(tm);
  }, [draft, id]);

  /* ---------- Simulated upload: progress, fails when offline ---------- */
  const startUpload = (itemId: string) => {
    const tick = setInterval(() => {
      setItems((list) =>
        list.map((it) => {
          if (it.id !== itemId || it.status !== "uploading") return it;
          if (!navigator.onLine) return { ...it, status: "failed" };
          const progress = Math.min(100, it.progress + 8 + Math.random() * 14);
          return {
            ...it,
            progress,
            status: progress >= 100 ? "done" : "uploading",
          };
        }),
      );
    }, 180);
    setTimeout(() => clearInterval(tick), 6000);
  };

  const addFiles = async (files: FileList | null, replaceId?: string) => {
    if (!files?.length) return;
    setError("");
    const existing = replaceId
      ? items.filter((i) => i.id !== replaceId)
      : items;
    const room = rule.maxFiles - existing.length;
    if (files.length > room) {
      setError(fill(tr(s.tooMany), { max: num(rule.maxFiles, lang) }));
      return;
    }
    const added: Item[] = [];
    for (const raw of Array.from(files)) {
      // Checked before upload: error prevention, with the fix in plain words.
      if (!accepts(rule.accept, raw.type)) {
        setError(fill(tr(s.wrongType), { types: tr(guide.format) }));
        return;
      }
      // Big photos shrink first, so a 20 MB phone photo still fits (Postel) and saves data.
      const f = await shrink(raw);
      const sizeMB = f.size / 1024 / 1024;
      if (sizeMB > rule.maxMB) {
        setError(
          fill(tr(s.tooBig), {
            size: num(sizeMB.toFixed(1), lang),
            max: num(rule.maxMB, lang),
          }),
        );
        return;
      }
      added.push({
        id: Math.random().toString(36).slice(2),
        name: f.name,
        type: f.type,
        sizeMB,
        url: URL.createObjectURL(f),
        origMB: f === raw ? undefined : raw.size / 1024 / 1024,
        progress: 0,
        status: navigator.onLine ? "uploading" : "failed",
      });
    }
    setItems(
      replaceId
        ? items.map((i) => (i.id === replaceId ? added[0] : i))
        : [...items, ...added],
    );
    added.forEach((a) => a.status === "uploading" && startUpload(a.id));
  };

  const retry = (itemId: string) => {
    setItems((list) =>
      list.map((it) =>
        it.id === itemId
          ? {
              ...it,
              status: "uploading",
              progress: Math.max(0, it.progress - 10),
            }
          : it,
      ),
    );
    startUpload(itemId);
  };

  /* ---------- Readiness: the button explains what's missing ---------- */
  const usesText = rule.kind === "text" && draft.mode === "write";
  const words = countWords(draft.text);
  const wordsOk = words >= WORDS.min && words <= WORDS.max;
  const anyUploading = items.some((i) => i.status !== "done");
  const missing = usesText
    ? !wordsOk
      ? tr(s.needs.words)
      : null
    : items.length === 0
      ? tr(s.needs.file)
      : anyUploading
        ? tr(s.needs.wait)
        : null;
  const noProfile = eligible.length === 0;
  const reflectLen = draft.reflect.trim().length;
  const reflectOk = !needsReflect || (reflectLen >= REFLECT.min && reflectLen <= REFLECT.max);
  const blocker = noProfile
    ? tr(s.needs.profile)
    : !draft.learned
      ? tr(s.needs.learn)
      : (missing ??
        (!reflectOk
          ? tr(s.needs.reflect)
          : !draft.own || !draft.rules
            ? tr(s.needs.checks)
            : null));

  const person = childProfiles.find((p) => p.id === draft.who);
  const isChild = draft.who !== "me";
  const set = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const doSubmit = () => {
    setSending(true);
    setTimeout(() => {
      const e: Entry = {
        receipt: `BJ-${id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        who: draft.who,
        caption: draft.caption,
        files: items.map(({ name, url, type }) => ({ name, url, type })),
        words: usesText ? words : 0,
      };
      localStorage.setItem(
        `bj-entry-${id}`,
        JSON.stringify({
          ...e,
          files: e.files.map((f) => ({ ...f, url: "" })),
        }),
      );
      setEntry(e);
      setSending(false);
      window.scrollTo({ top: 0 });
    }, 900);
  };

  /* ---------- Guards ---------- */
  if (statusOf(c) !== "open") {
    return (
      <Shell c={c}>
        <Notice title={tr(s.notOpenTitle)} />
      </Shell>
    );
  }
  if (c.format === "quiz" || c.format === "debate") {
    const n = s.noUpload[c.format];
    return (
      <Shell c={c}>
        <Notice title={tr(n.title)} body={tr(n.body)} />
      </Shell>
    );
  }

  /* ---------- Success ---------- */
  if (entry) {
    const who = childProfiles.find((p) => p.id === entry.who);
    const img = entry.files.find((f) => f.type.startsWith("image/") && f.url);
    return (
      <Shell c={c}>
        <div className="rounded-3xl border border-line bg-white p-6 text-center sm:p-10">
          <div
            aria-hidden
            className="mx-auto grid size-20 place-items-center rounded-full bg-leaf-ink text-4xl text-white"
          >
            ✓
          </div>
          <h2 className="display mt-5 text-4xl font-bold">{tr(s.doneTitle)}</h2>
          <p className="mx-auto mt-3 max-w-md text-ink-soft">
            {tr(s.doneBody)}
          </p>
          <p className="mx-auto mt-4 max-w-md rounded-2xl bg-indigo-wash p-4 text-indigo-ink">
            {c.round
              ? fill(tr(s.nextRound), { now: num(c.round.now, lang) })
              : tr(s.feedbackSoon)}
          </p>

          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-line bg-paper p-4 text-left">
            {img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img.url}
                alt=""
                className="mb-3 aspect-[4/3] w-full rounded-xl object-cover"
              />
            )}
            <p className="font-semibold">
              {entry.caption ||
                entry.files[0]?.name ||
                `${num(entry.words, lang)} ${tr(s.words)}`}
            </p>
            <p className="text-sm text-ink-soft">{who && tr(who.name)}</p>
            <p className="mt-3 border-t border-line pt-3 text-sm">
              {tr(s.receipt)}:{" "}
              <span className="font-mono font-semibold">{entry.receipt}</span>
            </p>
            <p className="text-xs text-ink-soft">{tr(s.sms)}</p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contests"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-indigo px-6 font-semibold text-white hover:bg-indigo-ink"
            >
              {tr(s.more)}
            </Link>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem(`bj-entry-${id}`);
                setEntry(null);
                setItems([]);
              }}
              className="min-h-12 rounded-full border border-ink/15 px-6 font-semibold hover:border-ink"
            >
              {tr(s.replaceEntry)}
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  /* ---------- Form ---------- */
  return (
    <Shell c={c}>
      {!online && (
        <p
          role="status"
          className="mb-6 rounded-2xl bg-alert/10 p-4 font-medium text-alert"
        >
          {tr(s.offline)}
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!blocker) doSubmit();
        }}
        className="space-y-6"
      >
        {/* 1. Who */}
        <Step n={1} title={tr(s.steps.who)}>
          {noProfile ? (
            <div className="rounded-2xl bg-honey-wash p-4">
              <p className="text-honey-ink">
                {fill(tr(s.noProfile), {
                  ages: c.ages
                    .map((a) => ages.find((x) => x.key === a)!.label[lang])
                    .join(", "),
                })}
              </p>
              <button
                type="button"
                className="mt-3 min-h-11 rounded-full bg-ink px-5 font-semibold text-white hover:bg-night"
              >
                + {tr(s.addProfile)}
              </button>
            </div>
          ) : (
            <>
              <Select.Root
                items={eligible.map((p) => ({
                  value: p.id,
                  label: `${tr(p.name)} (${tr(p.cls)})`,
                }))}
                value={draft.who}
                onValueChange={(v) => v && set({ who: v as string })}
              >
                <Select.Trigger className="flex min-h-13 w-full max-w-sm items-center justify-between gap-3 rounded-2xl border border-line bg-white px-4 font-semibold hover:border-indigo">
                  <Select.Value />
                  <Select.Icon className="text-ink-soft">▾</Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner
                    sideOffset={6}
                    alignItemWithTrigger={false}
                    className="z-50"
                  >
                    <Select.Popup className="min-w-[var(--anchor-width)] rounded-2xl border border-line bg-white p-1.5 shadow-[0_16px_40px_-16px_rgba(30,30,46,0.35)]">
                      <Select.List>
                        {eligible.map((p) => (
                          <Select.Item
                            key={p.id}
                            value={p.id}
                            className="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-xl px-3 outline-none data-[highlighted]:bg-indigo-wash"
                          >
                            <Select.ItemText>{`${tr(p.name)} (${tr(p.cls)})`}</Select.ItemText>
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
              <p className="mt-2 text-sm text-ink-soft">{tr(s.whoNote)}</p>
            </>
          )}
        </Step>

        {/* 2. Learn first: a 3-minute card before creating (progressive disclosure) */}
        <Step n={2} title={tr(s.learn.title)} done={draft.learned}>
          <LearnCard
            points={guide.learn.map((l) => tr(l))}
            learned={draft.learned}
            onDone={() => {
              set({ learned: true });
              setTimeout(() => workRef.current?.scrollIntoView({ block: "start" }), 50);
            }}
          />
        </Step>

        {/* 3. Work */}
        <div ref={workRef} className="scroll-mt-24">
        <Step n={3} title={tr(s.steps.work)} locked={!draft.learned}>
          {!draft.learned ? (
            <p className="flex items-center gap-3 rounded-2xl bg-paper p-4 text-ink-soft">
              <LockIcon className="size-5 shrink-0" />
              {tr(s.learn.locked)}
            </p>
          ) : (
          <>
          {rule.kind === "text" && (
            <ToggleGroup
              value={[draft.mode]}
              onValueChange={(v) =>
                v[0] && set({ mode: v[0] as Draft["mode"] })
              }
              className="mb-4 inline-flex rounded-full bg-indigo-wash p-1"
            >
              {(["write", "upload"] as const).map((m) => (
                <Toggle
                  key={m}
                  value={m}
                  className="min-h-10 rounded-full px-4 font-semibold text-ink-soft data-[pressed]:bg-white data-[pressed]:text-indigo-ink data-[pressed]:shadow-sm"
                >
                  {tr(m === "write" ? s.writeMode : s.uploadMode)}
                </Toggle>
              ))}
            </ToggleGroup>
          )}

          {usesText ? (
            <div>
              <label htmlFor="entry-text" className="sr-only">
                {tr(s.writeMode)}
              </label>
              <textarea
                id="entry-text"
                value={draft.text}
                onChange={(e) => set({ text: e.target.value })}
                placeholder={tr(s.writePh)}
                rows={12}
                className="w-full rounded-2xl border border-line bg-white p-4 text-lg leading-relaxed outline-none focus:border-indigo"
              />
              <WordMeter words={words} lang={lang} />
            </div>
          ) : (
            <Uploader
              kind={rule.kind}
              accept={rule.accept}
              items={items}
              maxFiles={rule.maxFiles}
              onAdd={addFiles}
              onRemove={(rid) => setItems((l) => l.filter((i) => i.id !== rid))}
              onRetry={retry}
            />
          )}

          {error && (
            <p
              role="alert"
              className="mt-3 rounded-xl bg-alert/10 p-3 text-sm font-medium text-alert"
            >
              {error}
            </p>
          )}
          <p className="mt-3 text-sm text-ink-soft">
            <span className="font-semibold text-ink">{tr(s.allowed)}</span>{" "}
            {tr(guide.format)}
          </p>

          {/* Keep the criteria in view while making (recognition over recall) */}
          <div className="mt-5 rounded-2xl border border-line p-4">
            <p className="font-semibold">{tr(s.rubricPeek)}</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {guide.rubric.map((r, i) => (
                <li key={i}>
                  <span className="font-semibold">{tr(r.name)}:</span>{" "}
                  <span className="text-ink-soft">{tr(r.top)}</span>
                </li>
              ))}
            </ul>
          </div>

          <label className="mt-6 block">
            <span className="font-semibold">
              {tr(s.caption)}{" "}
              <span className="font-normal text-ink-soft">
                ({tr(s.optional)})
              </span>
            </span>
            <input
              value={draft.caption}
              onChange={(e) => set({ caption: e.target.value })}
              placeholder={tr(s.captionPh)}
              maxLength={80}
              className="mt-2 block min-h-12 w-full max-w-lg rounded-2xl border border-line bg-white px-4 outline-none focus:border-indigo"
            />
          </label>

          {/* No blank page: three guided prompts instead of one empty box */}
          <fieldset className="mt-8">
            <legend className="font-display text-xl font-semibold">
              {tr(s.process.title)}
            </legend>
            <p className="mt-1 text-sm text-ink-soft">
              {tr(s.process.sub)} {forKids && tr(s.process.kidNote)}
            </p>

            {needsReflect && (
              <div className="mt-4 rounded-2xl border-2 border-indigo/30 bg-indigo-wash/40 p-4">
                <label htmlFor="reflect" className="font-semibold">
                  {fill(tr(s.process.reflectLabel), {
                    prev: num(c.round!.now - 1, lang),
                  })}
                </label>
                <p id="reflect-note" className="text-sm text-ink-soft">
                  {tr(s.process.reflectNote)}
                </p>
                <textarea
                  id="reflect"
                  value={draft.reflect}
                  onChange={(e) => set({ reflect: e.target.value })}
                  placeholder={tr(s.process.reflectPh)}
                  maxLength={REFLECT.max + 40}
                  rows={4}
                  aria-describedby="reflect-note reflect-count"
                  className="mt-2 w-full rounded-xl border border-line bg-white p-3 leading-relaxed outline-none focus:border-indigo"
                />
                <p
                  id="reflect-count"
                  className={`text-sm tabular-nums ${
                    reflectLen > REFLECT.max
                      ? "font-semibold text-alert"
                      : reflectOk
                        ? "font-semibold text-leaf-ink"
                        : "text-ink-soft"
                  }`}
                >
                  {num(reflectLen, lang)} / {num(REFLECT.min, lang)}–{num(REFLECT.max, lang)} {tr(s.process.chars)}
                </p>
              </div>
            )}

            <ol className="mt-4 space-y-4">
              {s.process.prompts.map((pr, i) => (
                <li key={i}>
                  <label htmlFor={`note-${i}`} className="flex gap-2 font-semibold">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-indigo-wash text-sm text-indigo-ink">
                      {num(i + 1, lang)}
                    </span>
                    <span>
                      {tr(pr.q)}{" "}
                      <span className="font-normal text-ink-soft">({tr(s.optional)})</span>
                    </span>
                  </label>
                  <textarea
                    id={`note-${i}`}
                    value={draft.notes[i]}
                    onChange={(e) => {
                      const notes = [...draft.notes] as Draft["notes"];
                      notes[i] = e.target.value;
                      set({ notes });
                    }}
                    placeholder={tr(pr.ph)}
                    rows={2}
                    maxLength={400}
                    className="mt-1.5 w-full rounded-xl border border-line bg-white p-3 leading-relaxed outline-none focus:border-indigo"
                  />
                </li>
              ))}
            </ol>
          </fieldset>
          </>
          )}
        </Step>
        </div>

        {/* 4. Checks */}
        <Step n={4} title={tr(s.steps.check)}>
          <div className="space-y-4">
            <Check
              checked={draft.own}
              onChange={(own) => set({ own })}
              required
            >
              {fill(tr(s.checks.own), { name: person ? tr(person.name) : "" })}
            </Check>
            <Check
              checked={draft.rules}
              onChange={(rules) => set({ rules })}
              required
            >
              {tr(s.checks.rules)}{" "}
              <Link
                href={`/contests/${id}#rules`}
                className="font-semibold text-indigo-ink underline underline-offset-2"
              >
                {tr(s.readRules)}
              </Link>
            </Check>
            {isChild && (
              <Check
                checked={draft.consent}
                onChange={(consent) => set({ consent })}
              >
                {tr(s.checks.consent)}
                <span className="mt-0.5 block text-sm text-ink-soft">
                  ({tr(s.optional)}) {tr(s.checks.consentNote)}
                </span>
              </Check>
            )}
          </div>
        </Step>

        {/* Sticky submit bar: always says what's missing */}
        <div className="sticky bottom-0 z-20 -mx-4 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="min-w-0 flex-1 text-sm" aria-live="polite">
              {blocker ? (
                <span className="text-ink-soft">{blocker}</span>
              ) : (
                <span className="font-semibold text-leaf-ink">✓ {tr(s.ready)}</span>
              )}
              {savedAt > 0 && (
                <span className="block text-xs text-ink-soft">
                  ✓ {tr(s.draftSaved)}
                </span>
              )}
            </p>
            <button
              type="submit"
              disabled={!!blocker || sending}
              className="min-h-13 rounded-full bg-indigo px-8 text-lg font-semibold text-white hover:bg-indigo-ink disabled:cursor-not-allowed disabled:bg-ink/20 disabled:text-ink/50"
            >
              {sending ? tr(s.sending) : tr(s.submitBtn)}
            </button>
          </div>
        </div>
        {items.length > 0 && (
          <p className="text-xs text-ink-soft">{tr(s.draftFilesNote)}</p>
        )}
      </form>
    </Shell>
  );
}

/* ---------- Pieces ---------- */

function Shell({
  c,
  children,
}: {
  c: (typeof contests)[number];
  children: React.ReactNode;
}) {
  const { tr, lang } = useHome();
  const urgent = c.daysLeft <= 2;
  return (
    <main className="mx-auto max-w-3xl px-4 pt-6 pb-16 sm:px-6">
      <Link
        href={`/contests/${c.id}`}
        className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink-soft hover:text-ink"
      >
        <span aria-hidden>‹</span> {tr(s.back)}
      </Link>
      <h1 className="display mt-3 text-4xl font-bold sm:text-5xl">
        {tr(s.title)}
      </h1>
      <p className="mt-2 text-lg">
        {tr(c.title)}
        {statusOf(c) === "open" && (
          <span
            className={`ml-2 whitespace-nowrap text-base ${urgent ? "font-semibold text-alert" : "text-ink-soft"}`}
          >
            <ClockIcon className="mr-1 inline size-4 align-[-2px]" />
            {c.daysLeft <= 1
              ? tr(t.contests.lastDay)
              : `${num(c.daysLeft, lang)} ${tr(t.contests.daysLeft)}`}
          </span>
        )}
      </p>
      <div className="mt-8">{children}</div>
    </main>
  );
}

function Notice({ title, body }: { title: string; body?: string }) {
  const { tr } = useHome();
  return (
    <div className="rounded-3xl border-2 border-dashed border-line bg-white p-8 text-center">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      {body && <p className="mx-auto mt-2 max-w-md text-ink-soft">{body}</p>}
      <Link
        href="/contests"
        className="mt-6 inline-flex min-h-12 items-center rounded-full bg-indigo px-6 font-semibold text-white"
      >
        {tr(s.more)}
      </Link>
    </div>
  );
}

function Step({
  n,
  title,
  done,
  locked,
  children,
}: {
  n: number;
  title: string;
  done?: boolean;
  locked?: boolean;
  children: React.ReactNode;
}) {
  const { lang } = useHome();
  return (
    <section
      className={`rounded-3xl border p-5 sm:p-7 ${locked ? "border-dashed border-line bg-white/60" : "border-line bg-white"}`}
    >
      <h2
        className={`mb-4 flex items-center gap-3 font-display text-2xl font-semibold ${locked ? "text-ink-soft" : ""}`}
      >
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-full text-lg ${
            done ? "bg-leaf-ink text-white" : locked ? "border-2 border-line" : "bg-indigo text-white"
          }`}
        >
          {done ? "✓" : num(n, lang)}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Check({
  checked,
  onChange,
  required,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer gap-3">
      <Checkbox.Root
        checked={checked}
        onCheckedChange={onChange}
        aria-required={required}
        className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border-2 border-ink/25 bg-white data-[checked]:border-indigo data-[checked]:bg-indigo"
      >
        <Checkbox.Indicator className="text-white">
          <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
            <path
              d="M4 10l4 4 8-8"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span className="leading-relaxed">{children}</span>
    </label>
  );
}

function WordMeter({ words, lang }: { words: number; lang: Lang }) {
  const { tr } = useHome();
  const pct = Math.min(100, (words / WORDS.max) * 100);
  const ok = words >= WORDS.min && words <= WORDS.max;
  const over = words > WORDS.max;
  return (
    <div className="mt-3">
      <div className="relative h-2 rounded-full bg-line">
        {/* the target band */}
        <div
          className="absolute inset-y-0 rounded-full bg-leaf/20"
          style={{ left: `${(WORDS.min / WORDS.max) * 100}%`, right: 0 }}
        />
        <div
          className={`relative h-full rounded-full transition-all ${over ? "bg-alert" : ok ? "bg-leaf-ink" : "bg-indigo"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p
        className={`mt-1.5 text-sm ${over ? "font-semibold text-alert" : ok ? "font-semibold text-leaf-ink" : "text-ink-soft"}`}
      >
        {num(words, lang)} {tr(s.words)}{lang === "bn" ? "।" : "."} {tr(s.wordRange)}
      </p>
    </div>
  );
}

function Uploader({
  kind,
  accept,
  items,
  maxFiles,
  onAdd,
  onRemove,
  onRetry,
}: {
  kind: "image" | "media" | "text" | "project" | "none";
  accept: string;
  items: Item[];
  maxFiles: number;
  onAdd: (f: FileList | null, replaceId?: string) => void | Promise<void>;
  onRemove: (id: string) => void;
  onRetry: (id: string) => void;
}) {
  const { tr, lang } = useHome();
  const camera = useRef<HTMLInputElement>(null);
  const picker = useRef<HTMLInputElement>(null);
  const replacer = useRef<HTMLInputElement>(null);
  const [replaceId, setReplaceId] = useState<string>();
  const canAdd = items.length < maxFiles;

  const buttons =
    kind === "image"
      ? [
          { label: tr(s.camera), icon: <CameraIcon className="size-8" />, input: "camera" as const },
          { label: tr(s.gallery), icon: <GalleryIcon className="size-8" />, input: "picker" as const },
        ]
      : kind === "media"
        ? [
            {
              // Name the one thing this contest takes (video or audio).
              label: accept.startsWith("audio") ? tr(s.audio) : tr(s.video),
              icon: accept.startsWith("audio") ? <MicIcon className="size-8" /> : <FilmIcon className="size-8" />,
              input: "picker" as const,
            },
          ]
        : kind === "project"
          ? [
              {
                label: `${tr(s.pdf)} / ${tr(s.video)}`,
                icon: <DocIcon className="size-8" />,
                input: "picker" as const,
              },
            ]
          : [{ label: tr(s.uploadMode), icon: <DocIcon className="size-8" />, input: "picker" as const }];

  return (
    <div>
      {/* hidden inputs: camera opens the phone camera directly */}
      <input
        ref={camera}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => (onAdd(e.target.files), (e.target.value = ""))}
      />
      <input
        ref={picker}
        type="file"
        accept={accept}
        multiple={maxFiles > 1}
        className="sr-only"
        tabIndex={-1}
        data-testid="file-input"
        onChange={(e) => (onAdd(e.target.files), (e.target.value = ""))}
      />
      <input
        ref={replacer}
        type="file"
        accept={accept}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => (
          onAdd(e.target.files, replaceId),
          (e.target.value = "")
        )}
      />

      {items.length > 0 && (
        <ul className="mb-4 space-y-3">
          {items.map((it) => (
            <li
              key={it.id}
              className="overflow-hidden rounded-2xl border border-line"
            >
              {it.type.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={it.url}
                  alt=""
                  className="max-h-80 w-full bg-paper object-contain"
                />
              ) : it.type.startsWith("video/") ? (
                <video
                  src={it.url}
                  controls
                  className="max-h-80 w-full bg-ink"
                />
              ) : it.type.startsWith("audio/") ? (
                <audio src={it.url} controls className="w-full p-3" />
              ) : null}
              <div className="flex flex-wrap items-center gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{it.name}</p>
                  {it.status === "uploading" && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <div
                        className="h-1.5 flex-1 rounded-full bg-line"
                        role="progressbar"
                        aria-valuenow={Math.round(it.progress)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={tr(s.uploading)}
                      >
                        <div
                          className="h-full rounded-full bg-indigo transition-all"
                          style={{ width: `${it.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-ink-soft tabular-nums">
                        {num(Math.round(it.progress), lang)}%
                      </span>
                    </div>
                  )}
                  {it.status === "done" && (
                    <p className="text-sm font-semibold text-leaf-ink">
                      ✓ {tr(s.uploaded)}, {sizeLabel(it.sizeMB, lang)}
                    </p>
                  )}
                  {it.origMB && (
                    <p className="text-xs text-ink-soft">
                      {fill(tr(s.compressed), {
                        from: sizeLabel(it.origMB, lang),
                        to: sizeLabel(it.sizeMB, lang),
                      })}
                    </p>
                  )}
                  {it.status === "failed" && (
                    <p className="text-sm text-alert">{tr(s.failed)}</p>
                  )}
                  {it.status === "uploading" && (
                    <p className="mt-1 text-xs text-ink-soft">{tr(s.resumable)}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  {it.status === "failed" && (
                    <button
                      type="button"
                      onClick={() => onRetry(it.id)}
                      className="min-h-10 rounded-full bg-indigo px-4 text-sm font-semibold text-white"
                    >
                      {tr(s.retry)}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setReplaceId(it.id);
                      replacer.current?.click();
                    }}
                    className="min-h-10 rounded-full border border-line px-4 text-sm font-semibold hover:border-ink/40"
                  >
                    {tr(s.replace)}
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(it.id)}
                    className="min-h-10 rounded-full px-3 text-sm font-semibold text-ink-soft hover:text-alert"
                  >
                    {tr(s.remove)}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {canAdd && (
        <div
          className={`grid gap-3 ${buttons.length > 1 ? "sm:grid-cols-2" : ""}`}
        >
          {buttons.map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={() =>
                (b.input === "camera" ? camera : picker).current?.click()
              }
              className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-indigo/40 bg-indigo-wash/50 p-4 font-semibold text-indigo-ink hover:border-indigo hover:bg-indigo-wash"
            >
              {b.icon}
              {items.length > 0 ? tr(s.addMore) : b.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** The 3-minute learning card. Text is always there; video and audio are light, optional extras. */
function LearnCard({
  points,
  learned,
  onDone,
}: {
  points: string[];
  learned: boolean;
  onDone: () => void;
}) {
  const { tr, lang } = useHome();
  const [mode, setMode] = useState<"read" | "watch" | "listen">("read");
  const [open, setOpen] = useState(false);

  if (learned && !open) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-semibold text-leaf-ink">✓ {tr(s.learn.doneState)}</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-11 rounded-full border border-line px-4 font-semibold hover:border-ink/40"
        >
          {tr(s.learn.again)}
        </button>
      </div>
    );
  }

  const modes = [
    { k: "read" as const, label: tr(s.learn.read), icon: <BookIcon className="size-4" /> },
    { k: "watch" as const, label: tr(s.learn.watch), size: tr(s.learn.watchSize), icon: <PlayIcon className="size-4" /> },
    { k: "listen" as const, label: tr(s.learn.listen), size: tr(s.learn.listenSize), icon: <HeadphonesIcon className="size-4" /> },
  ];

  return (
    <div>
      <p className="text-ink-soft">{tr(s.learn.sub)}</p>
      <ToggleGroup
        value={[mode]}
        onValueChange={(v) => v[0] && setMode(v[0] as typeof mode)}
        className="mt-4 flex flex-wrap gap-2"
      >
        {modes.map((m) => (
          <Toggle
            key={m.k}
            value={m.k}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 font-semibold text-ink-soft data-[pressed]:border-indigo data-[pressed]:bg-indigo-wash data-[pressed]:text-indigo-ink"
          >
            {m.icon}
            {m.label}
            {m.size && <span className="text-xs font-normal">· {m.size}</span>}
          </Toggle>
        ))}
      </ToggleGroup>

      {mode === "watch" && (
        <div className="mt-4 grid aspect-video max-w-lg place-items-center rounded-2xl bg-navy text-white">
          <span className="grid size-14 place-items-center rounded-full bg-white/15">
            <PlayIcon className="size-6" />
          </span>
        </div>
      )}
      {mode === "listen" && (
        <div className="mt-4 flex max-w-lg items-center gap-3 rounded-2xl bg-indigo-wash p-3 text-indigo-ink">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-indigo text-white">
            <PlayIcon className="size-4" />
          </span>
          <span aria-hidden className="flex h-8 flex-1 items-center gap-0.5">
            {[3, 6, 9, 5, 8, 4, 7, 10, 6, 3, 8, 5, 9, 4, 6, 3, 7, 5].map((h, i) => (
              <span key={i} className="w-1 flex-1 rounded-full bg-indigo/50" style={{ height: `${h * 10}%` }} />
            ))}
          </span>
          <span className="text-sm tabular-nums">{num("3:00", lang)}</span>
        </div>
      )}
      {mode !== "read" && <p className="mt-2 text-xs text-ink-soft">{tr(s.learn.mediaNote)}</p>}

      <ol className="mt-5 space-y-3">
        {points.map((pt, i) => (
          <li key={i} className="flex gap-3">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-honey-wash font-semibold text-honey-ink">
              {num(i + 1, lang)}
            </span>
            <span className="pt-0.5">{pt}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            onDone();
          }}
          className="min-h-12 rounded-full bg-indigo px-6 font-semibold text-white hover:bg-indigo-ink"
        >
          {tr(s.learn.done)}
        </button>
        <Link
          href="/contests?status=ended"
          className="min-h-11 content-center font-semibold text-indigo-ink underline underline-offset-4"
        >
          {tr(s.learn.examples)}
        </Link>
      </div>
    </div>
  );
}
