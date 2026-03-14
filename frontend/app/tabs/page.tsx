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

const API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pendente",
  PREPARING: "Preparando",
  READY: "Pronto",
  DELIVERED: "Entregue",
};

function statusIcon(status: OrderStatus) {
  switch (status) {
    case "DELIVERED":
      return <FaCheckCircle className="inline-block text-emerald-600" />;
    case "READY":
      return <FaBox className="inline-block text-green-600" />;
    case "PREPARING":
      return <FaHourglassHalf className="inline-block text-amber-600" />;
    default:
      return <FaHourglassHalf className="inline-block text-zinc-500" />;
  }
}

function statusBadgeClass(status: OrderStatus): string {
  switch (status) {
    case "DELIVERED":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "READY":
      return "bg-green-100 text-green-800 border-green-200";
    case "PREPARING":
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      return "bg-zinc-100 text-zinc-700 border-zinc-200";
  }
}

export default function TabPage() {
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
      if (!res.ok) throw new Error("Erro ao carregar comandas.");
      const data: OrderDto[] = await res.json();
      setComandas(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("Não foi possível carregar as comandas.");
      setComandas([]);
    }
  }, [statusFilter, tableFilter]);

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

  const handleUpdateStatus = async (comanda: OrderDto, status: OrderStatus) => {
    try {
      const res = await fetch(`${API_URL}/comandas/${comanda.uuid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar status.");
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

  return (
    <div className="min-h-screen bg-[#f5f0ea] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2c2419] flex items-center gap-3">
            <span className="bg-[#2c2419] text-[#f5f0ea] p-2 rounded-xl">
              <FaClipboardList className="text-2xl" />
            </span>
            Lista de Comandas
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                showFilters || statusFilter || tableFilter
                  ? "bg-[#2c2419] text-[#f5f0ea] border-[#2c2419]"
                  : "bg-white/80 text-[#2c2419] border-[#d4c4a8] hover:bg-white"
              }`}
            >
              <FaFilter /> Filtros
            </button>
            <button
              onClick={() => {
                setLoading(true);
                loadComandas().finally(() => setLoading(false));
              }}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 text-[#2c2419] border border-[#d4c4a8] hover:bg-white disabled:opacity-50"
            >
              <FaSyncAlt className={loading ? "animate-spin" : ""} /> Atualizar
            </button>
          </div>
        </header>

        {showFilters && (
          <div className="mb-6 p-4 rounded-2xl bg-white/90 border border-[#d4c4a8] shadow-sm">
            <p className="text-sm font-medium text-[#2c2419] mb-3">Status</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setStatusFilter("")}
                className={`rounded-lg px-3 py-1.5 text-sm border ${
                  !statusFilter
                    ? "bg-[#2c2419] text-[#f5f0ea] border-[#2c2419]"
                    : "bg-white text-[#2c2419] border-[#d4c4a8] hover:bg-[#f5f0ea]"
                }`}
              >
                Todos
              </button>
              {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-lg px-3 py-1.5 text-sm border ${
                    statusFilter === s
                      ? "bg-[#2c2419] text-[#f5f0ea] border-[#2c2419]"
                      : "bg-white text-[#2c2419] border-[#d4c4a8] hover:bg-[#f5f0ea]"
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
            <p className="text-sm font-medium text-[#2c2419] mb-2">Mesa</p>
            <select
              value={tableFilter}
              onChange={(e) => setTableFilter(e.target.value)}
              className="w-full max-w-xs rounded-lg border border-[#d4c4a8] bg-white px-3 py-2 text-[#2c2419]"
            >
              <option value="">Todas as mesas</option>
              {tables.map((t) => (
                <option key={t.uuid} value={t.uuid}>
                  Mesa {t.number}
                  {t.description ? ` — ${t.description}` : ""}
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
          <div className="flex flex-col items-center justify-center py-16 text-[#5c5349]">
            <FaSyncAlt className="text-4xl animate-spin mb-3" />
            <p>Carregando comandas…</p>
          </div>
        ) : comandas.length === 0 ? (
          <div className="rounded-2xl bg-white/90 border border-[#d4c4a8] p-12 text-center">
            <FaClipboardList className="mx-auto text-5xl text-[#d4c4a8] mb-4" />
            <p className="text-[#5c5349] font-medium">Nenhuma comanda encontrada.</p>
            <p className="text-sm text-[#5c5349]/80 mt-1">
              {statusFilter || tableFilter
                ? "Tente alterar os filtros."
                : "Os pedidos aparecerão aqui quando forem criados."}
            </p>
            {(statusFilter || tableFilter) && (
              <button
                onClick={() => {
                  setStatusFilter("");
                  setTableFilter("");
                }}
                className="mt-4 text-[#2c2419] underline font-medium"
              >
                Limpar filtros
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
                    className="bg-white rounded-2xl border border-[#d4c4a8] shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="px-5 py-4 border-b border-[#e8dfd0] flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#2c2419]/10 text-[#2c2419] p-2 rounded-lg">
                          <FaTable />
                        </span>
                        <span className="font-semibold text-[#2c2419]">
                          Mesa {order.tableNumber}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusBadgeClass(
                          order.status as OrderStatus
                        )}`}
                      >
                        {statusIcon(order.status as OrderStatus)}{" "}
                        {STATUS_LABELS[order.status as OrderStatus]}
                      </span>
                    </div>
                    <p className="px-5 py-1 text-xs text-[#5c5349]">
                      {new Date(order.createdAt).toLocaleString("pt-BR")}
                    </p>
                    <ul className="px-5 py-3 space-y-3">
                      {order.items.map((item) => (
                        <li
                          key={item.uuid}
                          className="flex justify-between items-center text-[#2c2419] border-b border-[#e8dfd0] pb-3 last:border-0 last:pb-0"
                        >
                          <span className="font-medium">
                            {item.productName} (x{item.quantity})
                          </span>
                          <span className="text-sm bg-[#f5f0ea] px-2 py-1 rounded-lg text-[#5c5349]">
                            R$ {(item.unitPrice * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="px-5 py-4 bg-[#f5f0ea]/80 border-t border-[#e8dfd0] space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[#2c2419]">
                          Total da comanda
                        </span>
                        <span className="text-lg font-bold text-[#2c2419]">
                          R$ {orderTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {(Object.keys(STATUS_LABELS) as OrderStatus[])
                          .filter((s) => s !== order.status)
                          .map((s) => (
                            <button
                              key={s}
                              onClick={() =>
                                handleUpdateStatus(order, s)
                              }
                              className="text-xs bg-white border border-[#d4c4a8] text-[#2c2419] rounded-lg px-2 py-1 hover:bg-[#e8dfd0]"
                            >
                              → {STATUS_LABELS[s]}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-[#2c2419] text-[#f5f0ea] shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-lg font-semibold">
                  Total geral das comandas
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
