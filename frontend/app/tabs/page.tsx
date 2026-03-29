"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaClipboardList,
  FaSyncAlt,
  FaTable,
  FaFilter,
  FaCheckCircle,
  FaHourglassHalf,
  FaBox,
} from "react-icons/fa";
import {
  OrderDto,
  OrderStatus,
} from "../orders/interfaces/order.interface";
import { Mesa } from "../tables/interfaces/table.interface";
import { getAuthHeaders } from "contexts/AuthContext";
import { useAuth } from "contexts/AuthContext";
import LoadingSpinner from "components/LoadingSpinner";
import { useRealtimeUpdates } from "hooks/useRealtimeUpdates";
import { useLocaleContext } from "i18n/LocaleContext";

const API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

function statusIcon(status: OrderStatus) {
  switch (status) {
    case "DELIVERED":
      return <FaCheckCircle className="inline-block text-zinc-800" />;
    case "READY":
      return <FaBox className="inline-block text-zinc-700" />;
    case "PREPARING":
      return <FaHourglassHalf className="inline-block text-zinc-600" />;
    default:
      return <FaHourglassHalf className="inline-block text-zinc-500" />;
  }
}

function statusBadgeClass(status: OrderStatus): string {
  switch (status) {
    case "DELIVERED":
      return "bg-zinc-800 text-white border-zinc-800";
    case "READY":
      return "bg-zinc-600 text-white border-zinc-600";
    case "PREPARING":
      return "bg-zinc-400 text-zinc-900 border-zinc-400";
    default:
      return "bg-zinc-100 text-zinc-700 border-zinc-200";
  }
}

export default function TabPage() {
  const { user } = useAuth();
  const { t, localeTag } = useLocaleContext();
  const statusLabel = (s: OrderStatus) => t(`tabs.status.${s}`);

  const [comandas, setComandas] = useState<OrderDto[]>([]);
  const [tables, setTables] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [tableFilter, setTableFilter] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const loadComandas = useCallback(async () => {
    try {
      setError(null);
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (tableFilter) params.set("tableUuid", tableFilter);
      const url = `${API_URL}/comandas${params.toString() ? `?${params}` : ""}`;
      const res = await fetch(url, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error(t("tabs.loadError"));
      const data: OrderDto[] = await res.json();
      setComandas(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError(t("tabs.loadError"));
      setComandas([]);
    }
  }, [statusFilter, tableFilter, t]);

  const loadTables = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/tables`, { headers: getAuthHeaders() });
      if (!res.ok) return;
      const data: Mesa[] = await res.json();
      setTables(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([loadComandas(), loadTables()]).finally(() =>
      setLoading(false)
    );
  }, [loadComandas, loadTables]);

  useRealtimeUpdates(user?.companyUuid ?? null, {
    onOrdersUpdate: loadComandas,
  });

  const handleUpdateStatus = async (comanda: OrderDto, status: OrderStatus) => {
    try {
      const res = await fetch(`${API_URL}/comandas/${comanda.uuid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(t("tabs.updateError"));
      await loadComandas();
    } catch (e) {
      console.error(e);
    }
  };

  const grandTotal = comandas.reduce((acc, order) => {
    const orderTotal = order.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    return acc + orderTotal;
  }, 0);

  const statusKeys = ["PENDING", "PREPARING", "READY", "DELIVERED"] as OrderStatus[];

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 flex items-center gap-3">
            <span className="bg-zinc-900 text-white p-2 rounded-xl">
              <FaClipboardList className="text-2xl" />
            </span>
            {t("tabs.title")}
          </h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                showFilters || statusFilter || tableFilter
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white/80 text-zinc-900 border-zinc-200 hover:bg-white"
              }`}
            >
              <FaFilter /> {t("common.filters")}
            </button>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                loadComandas().finally(() => setLoading(false));
              }}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 text-zinc-900 border border-zinc-200 hover:bg-white disabled:opacity-50"
            >
              <FaSyncAlt className={loading ? "animate-spin" : ""} /> {t("common.refresh")}
            </button>
          </div>
        </header>

        {showFilters && (
          <div className="mb-6 p-4 rounded-2xl bg-white/90 border border-zinc-200 shadow-sm">
            <p className="text-sm font-medium text-zinc-900 mb-3">{t("common.status")}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                onClick={() => setStatusFilter("")}
                className={`rounded-lg px-3 py-1.5 text-sm border ${
                  !statusFilter
                    ? "bg-zinc-900 text-white border-zinc-900"
                    : "bg-white text-zinc-900 border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                {t("common.all")}
              </button>
              {statusKeys.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-lg px-3 py-1.5 text-sm border ${
                    statusFilter === s
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-900 border-zinc-200 hover:bg-zinc-50"
                  }`}
                >
                  {statusLabel(s)}
                </button>
              ))}
            </div>
            <p className="text-sm font-medium text-zinc-900 mb-2">{t("tabs.tableFilter")}</p>
            <select
              value={tableFilter}
              onChange={(e) => setTableFilter(e.target.value)}
              className="w-full max-w-xs rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-900"
            >
              <option value="">{t("tabs.allTables")}</option>
              {tables.map((tbl) => (
                <option key={tbl.uuid} value={tbl.uuid}>
                  {t("common.table")} {tbl.number}
                  {tbl.description ? ` — ${tbl.description}` : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner message={t("tabs.loading")} />
        ) : comandas.length === 0 ? (
          <div className="rounded-2xl bg-white/90 border border-zinc-200 p-12 text-center">
            <FaClipboardList className="mx-auto text-5xl text-zinc-400 mb-4" />
            <p className="text-zinc-600 font-medium">{t("tabs.none")}</p>
            <p className="text-sm text-zinc-600/80 mt-1">
              {statusFilter || tableFilter
                ? t("tabs.hintFilters")
                : t("tabs.hintEmpty")}
            </p>
            {(statusFilter || tableFilter) && (
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("");
                  setTableFilter("");
                }}
                className="mt-4 text-zinc-900 underline font-medium"
              >
                {t("tabs.clearFilters")}
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comandas.map((order) => {
                const orderTotal = order.items.reduce(
                  (sum, item) => sum + item.unitPrice * item.quantity,
                  0
                );
                return (
                  <div
                    key={order.uuid}
                    className="bg-white rounded-2xl border border-zinc-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-zinc-900/10 text-zinc-900 p-2 rounded-lg">
                          <FaTable />
                        </span>
                        <span className="font-semibold text-zinc-900">
                          {t("common.table")} {order.tableNumber}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusBadgeClass(
                          order.status as OrderStatus
                        )}`}
                      >
                        {statusIcon(order.status as OrderStatus)}{" "}
                        {statusLabel(order.status as OrderStatus)}
                      </span>
                    </div>
                    <p className="px-5 py-1 text-xs text-zinc-600">
                      {new Date(order.createdAt).toLocaleString(localeTag)}
                    </p>
                    <ul className="px-5 py-3 space-y-3">
                      {order.items.map((item) => (
                        <li
                          key={item.uuid}
                          className="flex justify-between items-center text-zinc-900 border-b border-zinc-200 pb-3 last:border-0 last:pb-0"
                        >
                          <span className="font-medium">
                            {item.productName} (x{item.quantity})
                          </span>
                          <span className="text-sm bg-zinc-100 px-2 py-1 rounded-lg text-zinc-600">
                            R$ {(item.unitPrice * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="px-5 py-4 bg-zinc-50/80 border-t border-zinc-200 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-zinc-900">
                          {t("tabs.orderTotal")}
                        </span>
                        <span className="text-lg font-bold text-zinc-900">
                          R$ {orderTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {statusKeys
                          .filter((s) => s !== order.status)
                          .map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() =>
                                handleUpdateStatus(order, s)
                              }
                              className="text-xs bg-white border border-zinc-200 text-zinc-900 rounded-lg px-2 py-1 hover:bg-zinc-100"
                            >
                              → {statusLabel(s)}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-zinc-900 text-white shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-lg font-semibold">
                  {t("tabs.grandTotal")}
                </span>
                <span className="text-2xl font-bold">
                  R$ {grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
