"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import CardapioThemeForm from "components/CardapioThemeForm";
import KitchenHoursForm from "components/KitchenHoursForm";
import SoundOnOrderReadyToggle from "components/SoundOnOrderReadyToggle";
import LanguageSwitcher from "components/LanguageSwitcher";
import TeamSettingsSection from "components/TeamSettingsSection";
import { useAuth } from "contexts/AuthContext";
import { useLocaleContext } from "i18n/LocaleContext";
import { useRequirePanelPermission } from "hooks/useRequirePanelPermission";
import { PANEL_PERMISSIONS } from "lib/panelPermissions";

type SettingsTab = "orders" | "kitchen" | "appearance" | "language" | "team";

export default function SettingsPage() {
  useRequirePanelPermission(PANEL_PERMISSIONS.SETTINGS);
  const { t } = useLocaleContext();
  const { user, isLoading: authLoading } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [activeTab, setActiveTab] = useState<SettingsTab>("orders");

  const tabs = useMemo(() => {
    const list: { id: SettingsTab; label: string }[] = [
      { id: "orders", label: t("settings.tab.orders") },
      { id: "kitchen", label: t("settings.tab.kitchen") },
      { id: "appearance", label: t("settings.tab.appearance") },
      { id: "language", label: t("settings.tab.language") },
    ];
    if (isAdmin) list.push({ id: "team", label: t("settings.tab.team") });
    return list;
  }, [t, isAdmin]);

  const scrollTeamIntoView = useCallback(() => {
    const el = document.getElementById("team-settings");
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#team") return;
    if (!isAdmin) return;
    setActiveTab("team");
  }, [authLoading, isAdmin]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#team") return;
    if (!isAdmin || activeTab !== "team") return;
    scrollTeamIntoView();
  }, [activeTab, isAdmin, scrollTeamIntoView]);

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

        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
          <div
            role="tablist"
            aria-label={t("settings.title")}
            className="flex gap-1 overflow-x-auto p-2 border-b border-zinc-200 bg-zinc-50/80"
          >
            {tabs.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`settings-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`settings-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "shrink-0 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    selected
                      ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6 space-y-0">
            <section
              role="tabpanel"
              id="settings-panel-orders"
              aria-labelledby="settings-tab-orders"
              hidden={activeTab !== "orders"}
              className={activeTab === "orders" ? "space-y-3" : undefined}
            >
              <h2 className="text-sm font-medium text-zinc-700">
                {t("settings.ordersSection")}
              </h2>
              <SoundOnOrderReadyToggle />
            </section>

            <section
              role="tabpanel"
              id="settings-panel-kitchen"
              aria-labelledby="settings-tab-kitchen"
              hidden={activeTab !== "kitchen"}
              className={activeTab === "kitchen" ? "space-y-3" : undefined}
            >
              <h2 className="text-lg font-semibold text-zinc-800">
                {t("settings.kitchenTitle")}
              </h2>
              <KitchenHoursForm />
            </section>

            <section
              role="tabpanel"
              id="settings-panel-appearance"
              aria-labelledby="settings-tab-appearance"
              hidden={activeTab !== "appearance"}
              className={activeTab === "appearance" ? "space-y-3" : undefined}
            >
              <h2 className="text-lg font-semibold text-zinc-800">
                {t("settings.appearanceTitle")}
              </h2>
              <p className="text-sm text-zinc-500">
                {t("settings.appearanceDesc")}
              </p>
              <CardapioThemeForm />
            </section>

            <section
              role="tabpanel"
              id="settings-panel-language"
              aria-labelledby="settings-tab-language"
              hidden={activeTab !== "language"}
              className={activeTab === "language" ? "space-y-3" : undefined}
            >
              <h2 className="text-lg font-semibold text-zinc-800">
                {t("settings.languageTitle")}
              </h2>
              <p className="text-sm text-zinc-500">
                {t("settings.languageDesc")}
              </p>
              <LanguageSwitcher
                hideLabel
                className="flex flex-col sm:flex-row sm:items-center gap-2 w-full max-w-xs"
              />
            </section>

            {isAdmin ? (
              <section
                role="tabpanel"
                id="settings-panel-team"
                aria-labelledby="settings-tab-team"
                hidden={activeTab !== "team"}
                className={activeTab === "team" ? "space-y-0" : undefined}
              >
                <TeamSettingsSection />
              </section>
            ) : null}
          </div>
        </div>

        <p className="text-xs text-zinc-500">{t("settings.footerNote")}</p>
      </div>
    </div>
  );
}
