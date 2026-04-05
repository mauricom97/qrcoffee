"use client";

import { useState, useEffect } from "react";
import { getAuthHeaders } from "contexts/AuthContext";
import LoadingSpinner from "components/LoadingSpinner";
import { useLocaleContext } from "i18n/LocaleContext";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

/** Segunda … domingo (0 = domingo, alinhado a JS getDay após conversão no backend) */
const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;

export type KitchenHoursInterval = {
  weekday: number;
  open: string;
  close: string;
};

export type KitchenHoursPayload = {
  timezone?: string;
  intervals: KitchenHoursInterval[];
};

const TIMEZONES = [
  { value: "America/Sao_Paulo", label: "America/São Paulo" },
  { value: "America/Manaus", label: "America/Manaus" },
  { value: "America/Fortaleza", label: "America/Fortaleza" },
  { value: "America/Belem", label: "America/Belém" },
  { value: "America/Cuiaba", label: "America/Cuiabá" },
  { value: "America/Rio_Branco", label: "America/Rio Branco" },
  { value: "America/Noronha", label: "America/Fernando de Noronha" },
  { value: "UTC", label: "UTC" },
];

type DayRow = { enabled: boolean; open: string; close: string };

function emptyRows(): Record<number, DayRow> {
  const base: Record<number, DayRow> = {};
  for (const d of WEEKDAY_ORDER) {
    base[d] = { enabled: false, open: "11:00", close: "22:00" };
  }
  return base;
}

function normHm(t: string): string {
  const s = String(t).trim();
  return s.length >= 5 ? s.slice(0, 5) : s;
}

function payloadFromRows(
  timezone: string,
  rows: Record<number, DayRow>,
): KitchenHoursPayload | null {
  const intervals: KitchenHoursInterval[] = [];
  for (const d of WEEKDAY_ORDER) {
    const r = rows[d];
    if (r?.enabled) {
      intervals.push({
        weekday: d,
        open: normHm(r.open),
        close: normHm(r.close),
      });
    }
  }
  if (intervals.length === 0) return null;
  return { timezone: timezone || "America/Sao_Paulo", intervals };
}

export default function KitchenHoursForm() {
  const { t } = useLocaleContext();
  const [timezone, setTimezone] = useState("America/Sao_Paulo");
  const [rows, setRows] = useState<Record<number, DayRow>>(emptyRows);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<"ok" | "error" | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/company/kitchen-hours`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : { kitchenHours: null }))
      .then((d) => {
        const kh = d.kitchenHours as KitchenHoursPayload | null;
        const next = emptyRows();
        if (kh?.intervals?.length) {
          if (kh.timezone) setTimezone(kh.timezone);
          for (const it of kh.intervals) {
            const wd = Number(it.weekday);
            if (
              Number.isInteger(wd) &&
              wd >= 0 &&
              wd <= 6 &&
              next[wd]
            ) {
              next[wd] = {
                enabled: true,
                open: normHm(String(it.open ?? "11:00")),
                close: normHm(String(it.close ?? "22:00")),
              };
            }
          }
        }
        setRows(next);
      })
      .catch(() => setMessage("error"))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const payload = payloadFromRows(timezone, rows);
    try {
      const res = await fetch(`${API_URL}/company/kitchen-hours`, {
        method: "PATCH",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ kitchenHours: payload }),
      });
      if (res.ok) setMessage("ok");
      else setMessage("error");
    } catch {
      setMessage("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message={t("common.loading")} />;

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600">{t("settings.kitchenDesc")}</p>

      <div>
        <label className="block text-xs font-medium text-zinc-600 mb-1">
          {t("settings.kitchenTimezone")}
        </label>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2 border border-zinc-100 rounded-xl p-3">
        {WEEKDAY_ORDER.map((d) => (
          <div
            key={d}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 py-2 border-b border-zinc-100 last:border-0"
          >
            <label className="flex items-center gap-2 min-w-[140px] text-sm text-zinc-800">
              <input
                type="checkbox"
                checked={rows[d]?.enabled ?? false}
                onChange={(e) =>
                  setRows((prev) => ({
                    ...prev,
                    [d]: { ...prev[d], enabled: e.target.checked },
                  }))
                }
                className="h-4 w-4 rounded border-zinc-300"
              />
              {t(`settings.kitchenWeekday.${d}`)}
            </label>
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <input
                type="time"
                disabled={!rows[d]?.enabled}
                value={rows[d]?.open ?? "11:00"}
                onChange={(e) =>
                  setRows((prev) => ({
                    ...prev,
                    [d]: { ...prev[d], open: e.target.value },
                  }))
                }
                className="rounded-lg border border-zinc-200 px-2 py-1 text-sm disabled:opacity-50"
              />
              <span className="text-zinc-500 text-sm">—</span>
              <input
                type="time"
                disabled={!rows[d]?.enabled}
                value={rows[d]?.close ?? "22:00"}
                onChange={(e) =>
                  setRows((prev) => ({
                    ...prev,
                    [d]: { ...prev[d], close: e.target.value },
                  }))
                }
                className="rounded-lg border border-zinc-200 px-2 py-1 text-sm disabled:opacity-50"
              />
            </div>
          </div>
        ))}
      </div>

      {message === "ok" && (
        <p className="text-xs text-zinc-600">{t("settings.kitchenSaved")}</p>
      )}
      {message === "error" && (
        <p className="text-xs text-red-600">{t("settings.kitchenSaveError")}</p>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="w-full sm:w-auto rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 transition"
      >
        {saving ? t("common.saving") : t("common.save")}
      </button>
    </div>
  );
}
