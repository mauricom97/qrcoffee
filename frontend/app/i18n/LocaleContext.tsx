"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Locale } from "./types";
import { LOCALE_STORAGE_KEY, LOCALES, localeToBcp47 } from "./types";
import { translate } from "./t";
import { catalogs, type MessageTree } from "./catalog";

type LocaleContextValue = {
  locale: Locale;
  localeTag: string;
  setLocale: (locale: Locale) => void;
  t: (path: string, vars?: Record<string, string | number>) => string;
  messages: MessageTree;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (raw && (LOCALES as readonly string[]).includes(raw)) return raw as Locale;
  return "pt";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      document.documentElement.lang = localeToBcp47(next);
    }
  }, []);

  const localeTag = localeToBcp47(locale);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = localeTag;
  }, [localeTag, mounted]);

  const messages = catalogs[locale];

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) =>
      translate(messages as never, path, vars),
    [messages]
  );

  useEffect(() => {
    if (!mounted) return;
    const title = translate(messages as never, "meta.title");
    if (title && title !== "meta.title") document.title = title;
  }, [locale, messages, mounted]);

  const value = useMemo(
    () => ({
      locale,
      localeTag,
      setLocale,
      t,
      messages,
    }),
    [locale, localeTag, setLocale, t, messages]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocaleContext must be used within LocaleProvider");
  return ctx;
}

/** Safe hook for components that may render outside provider (should not happen) */
export function useOptionalLocale() {
  return useContext(LocaleContext);
}
