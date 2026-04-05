"use client";

import type { AttendantCallPayload } from "hooks/useRealtimeUpdates";
import { useLocaleContext } from "i18n/LocaleContext";

function AttendantCallBanner({
  payload,
  onDismiss,
}: {
  payload: AttendantCallPayload;
  onDismiss: () => void;
}) {
  const { t } = useLocaleContext();
  const tableLabel =
    payload.tableDescription && payload.tableDescription.trim()
      ? `${payload.tableNumber} — ${payload.tableDescription.trim()}`
      : String(payload.tableNumber);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-3 pt-3 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex max-w-lg w-full flex-col gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-950 shadow-lg sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 text-sm">
          <p className="font-semibold">{t("realtime.attendantCallTitle")}</p>
          <p className="mt-0.5 text-amber-900/90">
            {t("realtime.attendantCallBody", { table: tableLabel })}
          </p>
          {payload.message ? (
            <p className="mt-1 text-xs text-amber-900/80 border-t border-amber-200/80 pt-1">
              {t("realtime.attendantCallNote", { message: payload.message })}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-lg bg-amber-200/80 px-3 py-2 text-sm font-medium text-amber-950 hover:bg-amber-200"
        >
          {t("common.close")}
        </button>
      </div>
    </div>
  );
}

export default AttendantCallBanner;
