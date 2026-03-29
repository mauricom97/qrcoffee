"use client";

import { useLocaleContext } from "i18n/LocaleContext";
import type { Locale } from "i18n/types";
import { LOCALES } from "i18n/types";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocaleContext();

  return (
    <label className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span className="text-zinc-500 sr-only sm:not-sr-only">{t("language.label")}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
        aria-label={t("language.label")}
      >
        {LOCALES.map((loc) => (
          <option key={loc} value={loc}>
            {t(`language.${loc}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
