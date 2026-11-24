"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, type Lang } from "@/lib/content";
import { useHome } from "@/lib/home-state";

export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    // Prototype: logo served from the live site. Copy it into /public before launch.
    // eslint-disable-next-line @next/next/no-img-element
    <img src="https://preview.beejoyi.com/images/shared/logo.png" alt="Beejoyi" className={`${className} w-auto`} />
  );
}

export function LangToggle({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useHome();
  return (
    <ToggleGroup
      value={[lang]}
      onValueChange={(v) => v[0] && setLang(v[0] as Lang)}
      aria-label="Language / ভাষা"
      className={`flex rounded-full p-0.5 text-sm ${dark ? "bg-white/10" : "bg-indigo-wash"}`}
    >
      {(["bn", "en"] as const).map((l) => (
        <Toggle
          key={l}
          value={l}
          className={`min-h-9 rounded-full px-3 font-semibold ${
            dark
              ? "text-white/70 data-[pressed]:bg-white data-[pressed]:text-night"
              : "text-ink-soft data-[pressed]:bg-white data-[pressed]:text-indigo-ink data-[pressed]:shadow-sm"
          }`}
        >
          {l === "bn" ? "বাংলা" : "EN"}
        </Toggle>
      ))}
    </ToggleGroup>
  );
}

const navItems = [
  { href: "/contests", label: t.nav.contests },
  { href: "/#games", label: t.nav.games },
  { href: "/#showcase", label: t.nav.showcase },
  { href: "/contests?status=ended", label: t.nav.results },
];

export function SiteHeader() {
  const { tr } = useHome();
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="Beejoyi home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? "page" : undefined}
              className="rounded-full px-3.5 py-2 font-medium text-ink hover:bg-indigo-wash aria-[current=page]:bg-indigo-wash aria-[current=page]:text-indigo-ink"
            >
              {tr(n.label)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/#for-institutions"
            className="hidden rounded-full border border-ink/15 px-3.5 py-2 text-sm font-semibold text-night hover:border-night md:inline-flex"
          >
            {tr(t.nav.forInst)}
          </Link>
          <div className="hidden sm:block">
            <LangToggle />
          </div>
          <a href="#login" className="hidden px-2 py-2 font-medium text-ink hover:text-indigo-ink sm:inline">
            {tr(t.nav.login)}
          </a>
          <a
            href="#join"
            className="inline-flex min-h-11 items-center rounded-full bg-indigo px-5 font-semibold text-white hover:bg-indigo-ink"
          >
            {tr(t.nav.join)}
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const { tr } = useHome();
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label={tr(t.nav.menu)}
        className="grid size-11 place-items-center rounded-full hover:bg-indigo-wash lg:hidden"
      >
        <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
          <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/40 transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col gap-2 bg-white p-6 transition-transform data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="font-display text-xl font-semibold">{tr(t.nav.menu)}</Dialog.Title>
            <Dialog.Close aria-label="Close" className="grid size-11 place-items-center rounded-full hover:bg-indigo-wash">
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </div>
          {navItems.map((n) => (
            <Dialog.Close key={n.href} render={<Link href={n.href} />} className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-indigo-wash">
              {tr(n.label)}
            </Dialog.Close>
          ))}
          <Dialog.Close render={<Link href="/#for-institutions" />} className="rounded-xl px-3 py-3 text-lg font-semibold text-night hover:bg-indigo-wash">
            {tr(t.nav.forInst)}
          </Dialog.Close>
          <Dialog.Close render={<a href="#login" />} className="rounded-xl px-3 py-3 text-lg font-medium hover:bg-indigo-wash">
            {tr(t.nav.login)}
          </Dialog.Close>
          <div className="mt-auto">
            <LangToggle />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
