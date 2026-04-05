"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaBell } from "react-icons/fa";
import { useAuth, getAuthHeaders } from "contexts/AuthContext";
import { useLocaleContext } from "i18n/LocaleContext";
import { useRealtimeUpdates, type AttendantCallPayload } from "hooks/useRealtimeUpdates";
import { PANEL_PERMISSIONS, userHasPanelPermission } from "lib/panelPermissions";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

const HIDE_ROUTES = ["/", "/login", "/register"];

type PanelNotification = {
  id: string;
  kind: "order_new" | "order_activity" | "attendant";
  title: string;
  detail?: string;
  href: string;
  createdAt: number;
  read: boolean;
};

function tableLabelFromPayload(p: AttendantCallPayload): string {
  const desc = p.tableDescription?.trim();
  return desc ? `${p.tableNumber} — ${desc}` : String(p.tableNumber);
}

export default function PanelNotificationBell() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { t, localeTag } = useLocaleContext();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<PanelNotification[]>([]);
  const [toasts, setToasts] = useState<PanelNotification[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pendingBaselineRef = useRef<number | null>(null);
  const pendingReadyRef = useRef(false);
  const orderActivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const hide =
    !user ||
    !pathname ||
    HIDE_ROUTES.includes(pathname) ||
    pathname.startsWith("/cardapio");

  const canNotifyOrders =
    !!user &&
    (userHasPanelPermission(user.role, user.permissions, PANEL_PERMISSIONS.ORDERS) ||
      userHasPanelPermission(user.role, user.permissions, PANEL_PERMISSIONS.TABS));

  const pushNotification = useCallback(
    (n: Omit<PanelNotification, "id" | "createdAt" | "read">) => {
      const full: PanelNotification = {
        ...n,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        createdAt: Date.now(),
        read: false,
      };
      setItems((prev) => [full, ...prev].slice(0, 40));
      setToasts((prev) => {
        const next = [full, ...prev].slice(0, 3);
        const existing = toastTimersRef.current.get(full.id);
        if (existing) clearTimeout(existing);
        const tid = setTimeout(() => {
          setToasts((p) => p.filter((x) => x.id !== full.id));
          toastTimersRef.current.delete(full.id);
        }, 5200);
        toastTimersRef.current.set(full.id, tid);
        return next;
      });
    },
    []
  );

  const syncPendingOrders = useCallback(
    async (fromSocket: boolean) => {
      if (!canNotifyOrders) return;
      try {
        const res = await fetch(`${API_URL}/orders?status=PENDING`, {
          headers: getAuthHeaders(),
        });
        if (!res.ok) return;
        const data: unknown = await res.json();
        const n = Array.isArray(data) ? data.length : 0;
        const prev = pendingBaselineRef.current;
        pendingBaselineRef.current = n;
        if (!pendingReadyRef.current) {
          pendingReadyRef.current = true;
          return;
        }
        if (fromSocket && prev !== null && n > prev) {
          if (orderActivityTimerRef.current) {
            clearTimeout(orderActivityTimerRef.current);
            orderActivityTimerRef.current = null;
          }
          pushNotification({
            kind: "order_new",
            title: t("notifications.newOrderTitle"),
            detail: t("notifications.newOrderDetail"),
            href: "/orders",
          });
          return;
        }
        if (fromSocket && prev !== null && n === prev) {
          if (orderActivityTimerRef.current) clearTimeout(orderActivityTimerRef.current);
          orderActivityTimerRef.current = setTimeout(() => {
            orderActivityTimerRef.current = null;
            pushNotification({
              kind: "order_activity",
              title: t("notifications.ordersActivityTitle"),
              detail: t("notifications.ordersActivityDetail"),
              href: "/orders",
            });
          }, 600);
        }
      } catch {
        /* ignore */
      }
    },
    [canNotifyOrders, pushNotification, t]
  );

  useEffect(() => {
    if (hide || !user?.companyUuid) return;
    pendingReadyRef.current = false;
    pendingBaselineRef.current = null;
    syncPendingOrders(false);
  }, [hide, user?.companyUuid, syncPendingOrders]);

  useRealtimeUpdates(hide ? null : user?.companyUuid ?? null, {
    onOrdersUpdate: () => {
      syncPendingOrders(true);
    },
    onAttendantCall: (p: AttendantCallPayload) => {
      const table = tableLabelFromPayload(p);
      pushNotification({
        kind: "attendant",
        title: t("notifications.attendantTitle"),
        detail: p.message
          ? t("notifications.attendantDetailWithNote", {
              table,
              message: p.message,
            })
          : t("notifications.attendantDetail", { table }),
        href: "/tables",
      });
    },
  });

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    return () => {
      toastTimersRef.current.forEach((tid) => clearTimeout(tid));
      toastTimersRef.current.clear();
      if (orderActivityTimerRef.current) clearTimeout(orderActivityTimerRef.current);
    };
  }, []);

  const unread = items.filter((i) => !i.read).length;

  const markRead = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, read: true } : i))
    );
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((i) => ({ ...i, read: true })));
  };

  const onItemActivate = (n: PanelNotification) => {
    markRead(n.id);
    setOpen(false);
    router.push(n.href);
  };

  const dismissToast = (id: string) => {
    const tid = toastTimersRef.current.get(id);
    if (tid) clearTimeout(tid);
    toastTimersRef.current.delete(id);
    setToasts((p) => p.filter((x) => x.id !== id));
  };

  if (hide) return null;

  return (
    <>
      <div
        ref={wrapRef}
        className="fixed top-4 right-4 z-[60] flex flex-col items-end gap-2"
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-white text-zinc-800 shadow-lg ring-1 ring-zinc-200 hover:bg-zinc-50 transition"
          aria-label={t("notifications.bellAria")}
          aria-expanded={open}
        >
          <FaBell className="text-lg" />
          {unread > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          ) : null}
        </button>

        {open ? (
          <div
            className="w-[min(100vw-2rem,20rem)] max-h-[min(70vh,24rem)] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl"
            role="dialog"
            aria-label={t("notifications.panelAria")}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-3 py-2">
              <span className="text-sm font-semibold text-zinc-900">
                {t("notifications.panelTitle")}
              </span>
              {unread > 0 ? (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="text-xs font-medium text-zinc-600 hover:text-zinc-900"
                >
                  {t("notifications.markAllRead")}
                </button>
              ) : null}
            </div>
            <ul className="max-h-[min(60vh,20rem)] overflow-y-auto divide-y divide-zinc-100">
              {items.length === 0 ? (
                <li className="px-3 py-8 text-center text-sm text-zinc-500">
                  {t("notifications.empty")}
                </li>
              ) : (
                items.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => onItemActivate(n)}
                      className={`w-full px-3 py-3 text-left text-sm transition hover:bg-zinc-50 ${
                        n.read ? "opacity-70" : "bg-amber-50/40"
                      }`}
                    >
                      <span className="font-medium text-zinc-900 block">
                        {n.title}
                      </span>
                      {n.detail ? (
                        <span className="mt-0.5 block text-xs text-zinc-600 line-clamp-2">
                          {n.detail}
                        </span>
                      ) : null}
                      <span className="mt-1 block text-[10px] text-zinc-400">
                        {new Date(n.createdAt).toLocaleString(localeTag, {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="fixed top-[4.25rem] right-4 z-[59] flex w-[min(100vw-2rem,20rem)] flex-col gap-2 pointer-events-none">
        {toasts.map((n) => (
          <div
            key={n.id}
            className="pointer-events-auto flex gap-2 rounded-lg border border-zinc-200 bg-white p-3 shadow-lg ring-1 ring-black/5"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-zinc-900">{n.title}</p>
              {n.detail ? (
                <p className="mt-0.5 text-xs text-zinc-600 line-clamp-2">
                  {n.detail}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  dismissToast(n.id);
                  onItemActivate(n);
                }}
                className="mt-2 text-xs font-medium text-zinc-700 underline hover:text-zinc-900"
              >
                {t("notifications.open")}
              </button>
            </div>
            <button
              type="button"
              onClick={() => dismissToast(n.id)}
              className="shrink-0 text-zinc-400 hover:text-zinc-700 text-lg leading-none"
              aria-label={t("common.close")}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
