"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaTable,
  FaCheckCircle,
  FaHourglassHalf,
  FaPlus,
  FaTrash,
  FaClipboardList,
  FaFileInvoice,
} from "react-icons/fa";
import { OrderDto, OrderStatus } from "./interfaces/order.interface";
import { Mesa } from "../tables/interfaces/table.interface";
import { getAuthHeaders } from "contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pendente",
  PREPARING: "Preparando",
  READY: "Pronto",
  DELIVERED: "Entregue",
};

interface ProductOption {
  uuid: string;
  name: string;
  price: number;
}

interface NewOrderItem {
  productUuid: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [tables, setTables] = useState<Mesa[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [tableUuid, setTableUuid] = useState("");
  const [newStatus, setNewStatus] = useState<OrderStatus>("PENDING");
  const [newItems, setNewItems] = useState<NewOrderItem[]>([]);
  const [selectedProductUuid, setSelectedProductUuid] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [emittingOrderUuid, setEmittingOrderUuid] = useState<string | null>(null);
  const [invoiceByOrder, setInvoiceByOrder] = useState<Record<string, { status: string; nfceKey?: string; pdfUrl?: string }>>({});

  const loadOrders = useCallback(async () => {
    try {
      const url = statusFilter
        ? `${API_URL}/orders?status=${statusFilter}`
        : `${API_URL}/orders`;
      const res = await fetch(url, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Erro ao carregar pedidos.");
      const data: OrderDto[] = await res.json();
      const list = Array.isArray(data) ? data : [];
      setOrders(list);
      const deliveredOrReady = list.filter((o) => o.status === "READY" || o.status === "DELIVERED");
      for (const o of deliveredOrReady) {
        try {
          const invRes = await fetch(`${API_URL}/invoices/order/${o.uuid}`, { headers: getAuthHeaders() });
          if (invRes.ok) {
            const inv = await invRes.json();
            if (inv) setInvoiceByOrder((prev) => ({ ...prev, [o.uuid]: inv }));
          }
        } catch {
          /* ignora */
        }
      }
    } catch (e) {
      console.error(e);
      setError("Não foi possível carregar os pedidos.");
    }
  }, [statusFilter]);

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

  const loadProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/products/all`, { headers: getAuthHeaders() });
      if (!res.ok) return;
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([loadOrders(), loadTables(), loadProducts()]).finally(() =>
      setLoading(false)
    );
  }, [loadOrders, loadTables, loadProducts]);


  const resetForm = () => {
    setTableUuid("");
    setNewStatus("PENDING");
    setNewItems([]);
    setSelectedProductUuid("");
    setItemQuantity(1);
    setShowForm(false);
    setError(null);
  };

  const addItem = () => {
    const product = products.find((p) => p.uuid === selectedProductUuid);
    if (!product || itemQuantity < 1) return;
    setNewItems((prev) => [
      ...prev,
      {
        productUuid: product.uuid,
        productName: product.name,
        quantity: itemQuantity,
        unitPrice: product.price,
      },
    ]);
    setSelectedProductUuid("");
    setItemQuantity(1);
  };

  const removeItem = (index: number) => {
    setNewItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateOrder = async () => {
    if (!tableUuid || newItems.length === 0) {
      setError("Selecione a mesa e adicione pelo menos um item.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          tableUuid,
          status: newStatus,
          items: newItems.map((i) => ({
            productUuid: i.productUuid,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          })),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Erro ao criar pedido.");
      }
      resetForm();
      await loadOrders();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao salvar pedido.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStatus = async (order: OrderDto, status: OrderStatus) => {
    try {
      const res = await fetch(`${API_URL}/orders/${order.uuid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar status.");
      await loadOrders();
    } catch (e) {
      console.error(e);
    }
  };

  const fetchInvoiceForOrder = async (orderUuid: string) => {
    try {
      const res = await fetch(`${API_URL}/invoices/order/${orderUuid}`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setInvoiceByOrder((prev) => ({ ...prev, [orderUuid]: data }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEmitInvoice = async (order: OrderDto) => {
    setEmittingOrderUuid(order.uuid);
    try {
      const res = await fetch(`${API_URL}/invoices/order/${order.uuid}/emit`, {
        method: "POST",
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.message || "Erro ao emitir NFC-e";
        if (msg.includes("já possui") || msg.includes("já tem")) {
          await fetchInvoiceForOrder(order.uuid);
        }
        throw new Error(msg);
      }
      const data = await res.json();
      setInvoiceByOrder((prev) => ({ ...prev, [order.uuid]: data }));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro ao emitir NFC-e. Configure os dados fiscais em Dados Fiscais.");
    } finally {
      setEmittingOrderUuid(null);
    }
  };

  const handleDelete = async (order: OrderDto) => {
    if (!confirm(`Excluir pedido da mesa ${order.tableNumber}?`)) return;
    try {
      const res = await fetch(`${API_URL}/orders/${order.uuid}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Erro ao excluir.");
      await loadOrders();
    } catch (e) {
      console.error(e);
    }
  };

  const statusColor = (status: OrderStatus) => {
    switch (status) {
      case "DELIVERED":
        return "bg-emerald-100 text-emerald-800";
      case "READY":
        return "bg-green-100 text-green-800";
      case "PREPARING":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-zinc-100 text-zinc-800";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <h1 className="text-2xl font-semibold text-zinc-800">Pedidos</h1>
          <p className="text-sm text-zinc-500">
            Gerencie os pedidos por mesa e status.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter("")}
              className={`rounded-lg px-3 py-1.5 text-sm border ${
                !statusFilter
                  ? "bg-zinc-800 text-white border-zinc-800"
                  : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              Todos
            </button>
            {(["PENDING", "PREPARING", "READY", "DELIVERED"] as OrderStatus[]).map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-lg px-3 py-1.5 text-sm border ${
                    statusFilter === s
                      ? "bg-zinc-800 text-white border-zinc-800"
                      : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  {STATUS_LABELS[s]}
                </button>
              )
            )}
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-white text-black border border-black hover:bg-black hover:text-white rounded-lg px-4 py-2 flex items-center gap-2 shrink-0"
          >
            <FaPlus /> Novo pedido
          </button>
        </div>

        {showForm && (
          <div className="bg-white shadow-md rounded-lg p-6 text-black border border-zinc-200">
            <h2 className="text-xl font-semibold mb-4">Novo pedido</h2>
            {error && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Mesa
                </label>
                <select
                  value={tableUuid}
                  onChange={(e) => setTableUuid(e.target.value)}
                  className="w-full border border-zinc-300 rounded-lg p-2"
                >
                  <option value="">Selecione a mesa</option>
                  {tables.map((t) => (
                    <option key={t.uuid} value={t.uuid}>
                      Mesa {t.number}
                      {t.description ? ` — ${t.description}` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Status inicial
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full border border-zinc-300 rounded-lg p-2"
                >
                  {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Itens
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <select
                    value={selectedProductUuid}
                    onChange={(e) => setSelectedProductUuid(e.target.value)}
                    className="flex-1 min-w-[180px] border border-zinc-300 rounded-lg p-2"
                  >
                    <option value="">Produto</option>
                    {products.map((p) => (
                      <option key={p.uuid} value={p.uuid}>
                        {p.name} — R$ {p.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={itemQuantity}
                    onChange={(e) =>
                      setItemQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-20 border border-zinc-300 rounded-lg p-2"
                  />
                  <button
                    type="button"
                    onClick={addItem}
                    className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg px-4 py-2"
                  >
                    Adicionar
                  </button>
                </div>
                {newItems.length > 0 && (
                  <ul className="border border-zinc-200 rounded-lg divide-y divide-zinc-100">
                    {newItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center px-3 py-2 text-sm"
                      >
                        <span>
                          {item.productName} × {item.quantity} — R${" "}
                          {(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(i)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleCreateOrder}
                  disabled={saving}
                  className="flex-1 bg-black text-white rounded-lg py-2 hover:bg-zinc-800 disabled:opacity-50"
                >
                  {saving ? "Salvando…" : "Criar pedido"}
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 bg-zinc-200 text-zinc-800 rounded-lg py-2 hover:bg-zinc-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-zinc-500">Carregando pedidos…</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div
                key={order.uuid}
                className="bg-white shadow-md rounded-lg p-5 border border-zinc-200 text-black"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <FaTable className="text-zinc-500" />
                    <span className="font-semibold">Mesa {order.tableNumber}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                      order.status
                    )}`}
                  >
                    {order.status === "READY" || order.status === "DELIVERED" ? (
                      <FaCheckCircle className="inline mr-1" />
                    ) : (
                      <FaHourglassHalf className="inline mr-1" />
                    )}
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mb-3">
                  {new Date(order.createdAt).toLocaleString("pt-BR")}
                </p>
                <ul className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <li
                      key={item.uuid}
                      className="flex justify-between text-sm border-b border-zinc-100 pb-2 last:border-0"
                    >
                      <span>
                        {item.productName} × {item.quantity}
                      </span>
                      <span className="text-zinc-600">
                        R$ {(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 items-center justify-between pt-2 border-t border-zinc-100">
                  <div className="flex flex-wrap gap-1">
                    {(["PENDING", "PREPARING", "READY", "DELIVERED"] as OrderStatus[])
                      .filter((s) => s !== order.status)
                      .map((s) => (
                        <button
                          key={s}
                          onClick={() => handleUpdateStatus(order, s)}
                          className="text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded px-2 py-1"
                        >
                          → {STATUS_LABELS[s]}
                        </button>
                      ))}
                  </div>
                  <div className="flex items-center gap-1">
                    {(order.status === "READY" || order.status === "DELIVERED") && (
                      invoiceByOrder[order.uuid]?.status === "AUTHORIZED" ? (
                        invoiceByOrder[order.uuid]?.pdfUrl ? (
                          <a
                            href={invoiceByOrder[order.uuid].pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded px-2 py-1 flex items-center gap-1"
                            title="Ver NFC-e (PDF)"
                          >
                            <FaFileInvoice /> NFC-e emitida
                          </a>
                        ) : (
                          <span className="text-xs bg-emerald-100 text-emerald-800 rounded px-2 py-1 flex items-center gap-1">
                            <FaFileInvoice /> NFC-e emitida
                          </span>
                        )
                      ) : (
                        <button
                          onClick={() => handleEmitInvoice(order)}
                          disabled={emittingOrderUuid === order.uuid}
                          className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded px-2 py-1 flex items-center gap-1 disabled:opacity-50"
                          title="Emitir NFC-e"
                        >
                          <FaFileInvoice />
                          {emittingOrderUuid === order.uuid ? "Emitindo…" : "Emitir NFC-e"}
                        </button>
                      )
                    )}
                    <button
                      onClick={() => handleDelete(order)}
                      className="text-red-600 hover:text-red-700 p-1"
                      title="Excluir pedido"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-lg border border-zinc-200 p-8 text-center text-zinc-500">
            <FaClipboardList className="mx-auto text-4xl mb-2 opacity-50" />
            <p>Nenhum pedido encontrado.</p>
            {statusFilter && (
              <button
                onClick={() => setStatusFilter("")}
                className="mt-2 text-zinc-700 underline"
              >
                Ver todos
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
