"use client";

import CardapioThemeForm from "components/CardapioThemeForm";
import SoundOnOrderReadyToggle from "components/SoundOnOrderReadyToggle";
import { useLocaleContext } from "i18n/LocaleContext";

export default function SettingsPage() {
  const { t } = useLocaleContext();
  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-6 mt-15">
        <header>
          <h1 className="text-2xl font-semibold text-zinc-800">
            {t("settings.title")}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {t("settings.subtitle")}
          </p>
        </header>

        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <h2 className="text-sm font-medium text-zinc-700 mb-3">
            {t("settings.ordersSection")}
          </h2>
          <SoundOnOrderReadyToggle />
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-800 mb-2">
            {t("settings.appearanceTitle")}
          </h2>
          <p className="text-sm text-zinc-500 mb-4">
            {t("settings.appearanceDesc")}
          </p>
          <CardapioThemeForm />
        </div>

        <p className="text-xs text-zinc-500">
          {t("settings.footerNote")}
        </p>
      </div>
    </div>
  );
}
