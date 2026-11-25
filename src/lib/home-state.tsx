"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ages, type AgeKey, type CatKey, type L, type Lang } from "./content";

type HomeState = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (s: L) => string;
  age: AgeKey | null;
  setAge: (a: AgeKey | null) => void;
  cat: CatKey;
  setCat: (c: CatKey) => void;
  query: string;
  setQuery: (q: string) => void;
};

const Ctx = createContext<HomeState | null>(null);

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("bn");
  const [age, setAgeState] = useState<AgeKey | null>(null);
  const [cat, setCat] = useState<CatKey>("all");
  const [query, setQuery] = useState("");

  // Remember language and age choice between visits.
  useEffect(() => {
    const l = localStorage.getItem("bj-lang");
    const a = localStorage.getItem("bj-age");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring persisted prefs after hydration
    if (l === "en" || l === "bn") setLangState(l);
    // Only restore ages that still exist (e.g. "uni" was removed).
    if (a && ages.some((x) => x.key === a)) setAgeState(a as AgeKey);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("bj-lang", l);
  };
  const setAge = (a: AgeKey | null) => {
    setAgeState(a);
    if (a) localStorage.setItem("bj-age", a);
    else localStorage.removeItem("bj-age");
  };

  return (
    <Ctx.Provider
      value={{ lang, setLang, tr: (s) => s[lang], age, setAge, cat, setCat, query, setQuery }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useHome() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useHome must be used inside HomeProvider");
  return v;
}
