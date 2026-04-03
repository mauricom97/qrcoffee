"use client";

import { useEffect } from "react";
import CardapioThemeForm from "components/CardapioThemeForm";
import SoundOnOrderReadyToggle from "components/SoundOnOrderReadyToggle";
import LanguageSwitcher from "components/LanguageSwitcher";
import TeamSettingsSection from "components/TeamSettingsSection";
import { useLocaleContext } from "i18n/LocaleContext";
import { useRequirePanelPermission } from "hooks/useRequirePanelPermission";
import { PANEL_PERMISSIONS } from "lib/panelPermissions";

export default function SettingsPage() {
  useRequirePanelPermission(PANEL_PERMISSIONS.SETTINGS);
  const { t } = useLocaleContext();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#team") return;
    const el = document.getElementById("team-settings");
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6 mt-15">
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

        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-800 mb-2">
            {t("settings.languageTitle")}
          </h2>
          <p className="text-sm text-zinc-500 mb-4">
            {t("settings.languageDesc")}
          </p>
          <LanguageSwitcher
            hideLabel
            className="flex flex-col sm:flex-row sm:items-center gap-2 w-full max-w-xs"
          />
        </div>

        <TeamSettingsSection />

        <p className="text-xs text-zinc-500">{t("settings.footerNote")}</p>
      </div>
    </div>
  );
}
