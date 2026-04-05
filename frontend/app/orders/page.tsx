"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "contexts/AuthContext";
import { useRealtimeUpdates } from "hooks/useRealtimeUpdates";
import {
  FaTable,
  FaCheckCircle,
  FaHourglassHalf,
  FaPlus,
  FaTrash,
  FaClipboardList,
} from "react-icons/fa";
import { OrderDto, OrderStatus } from "./interfaces/order.interface";
import { Mesa } from "../tables/interfaces/table.interface";
import { getAuthHeaders } from "contexts/AuthContext";
import ConfirmModal from "components/ConfirmModal";
import LoadingSpinner from "components/LoadingSpinner";
import { useLocaleContext } from "i18n/LocaleContext";
import { useRequirePanelPermission } from "hooks/useRequirePanelPermission";
import { PANEL_PERMISSIONS, userHasPanelPermission } from "lib/panelPermissions";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";
const SOUND_READY_URL = "/Ding - Sound Effect.mp3";

interface ProductAddon {
  uuid: string;
  name: string;
  extraPrice: number;
}

interface ProductOption {
  uuid: string;
  name: string;
  price: number;
  addons?: ProductAddon[];
}

interface NewOrderItem {
  productUuid: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  addonsSnapshot?: { name: string; extraPrice: number }[];
}

export default function OrdersPage() {
  useRequirePanelPermission(PANEL_PERMISSIONS.ORDERS);
  const { user } = useAuth();
  const { t, localeTag } = useLocaleContext();
  const canViewAttendanceFinance =
    !!user &&
    userHasPanelPermission(
      user.role,
      user.permissions,
      PANEL_PERMISSIONS.ATTENDANCE_FINANCE,
    );
  const statusLabel = (s: OrderStatus) => t(`orders.status.${s}`);
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
  const [newObservacao, setNewObservacao] = useState("");
  const [orderToDelete, setOrderToDelete] = useState<OrderDto | null>(null);
  const [soundOnOrderReady, setSoundOnOrderReady] = useState(true);
  const [addonPickerProduct, setAddonPickerProduct] = useState<ProductOption | null>(null);
  const [addonPickerSelected, setAddonPickerSelected] = useState<Set<string>>(
    () => new Set()
  );
  const [addonPickerQuantity, setAddonPickerQuantity] = useState(1);

  const prevOrdersRef = useRef<OrderDto[]>([]);
  const soundOnOrderReadyRef = useRef(true);

  useEffect(() => {
    fetch(`${API_URL}/company/sound-on-order-ready`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : { soundOnOrderReady: true }))
      .then((d) => {
        const v = d.soundOnOrderReady ?? true;
        setSoundOnOrderReady(v);
        soundOnOrderReadyRef.current = v;
      })
      .catch(() => {});
  }, []);

  const loadOrders = useCallback(async () => {
    try {
      const url = statusFilter
        ? `${API_URL}/orders?status=${statusFilter}`
        : `${API_URL}/orders`;
      const res = await fetch(url, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Erro ao carregar pedidos.");
      const data: OrderDto[] = await res.json();
      const newOrders = Array.isArray(data) ? data : [];

      // Detecta pedidos que ficaram prontos e reproduz som (se habilitado)
      const prev = prevOrdersRef.current;
      if (prev.length > 0 && soundOnOrderReadyRef.current) {
        const becameReady = newOrders.filter(
          (o) =>
            o.status === "READY" &&
            (prev.find((p) => p.uuid === o.uuid)?.status ?? "") !== "READY"
        );
        if (becameReady.length > 0) {
          const audio = new Audio(SOUND_READY_URL);
          audio.play().catch(() => {});
        }
      }
      prevOrdersRef.current = newOrders;
      setOrders(newOrders);
    } catch (e) {
      console.error(e);
      setError(t("orders.loadError"));
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

  useRealtimeUpdates(user?.companyUuid ?? null, {
    onOrdersUpdate: loadOrders,
  });

  const resetForm = () => {
    setTableUuid("");
    setNewStatus("PENDING");
    setNewItems([]);
    setSelectedProductUuid("");
    setItemQuantity(1);
    setNewObservacao("");
    setShowForm(false);
    setError(null);
    setAddonPickerProduct(null);
  };

  const addItem = () => {
    const product = products.find((p) => p.uuid === selectedProductUuid);
    if (!product || itemQuantity < 1) return;
    const extras = product.addons ?? [];
    if (extras.length > 0) {
      setAddonPickerProduct(product);
      setAddonPickerSelected(new Set());
      setAddonPickerQuantity(itemQuantity);
      return;
    }
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

  const confirmAddonPicker = () => {
    if (!addonPickerProduct) return;
    const selected = (addonPickerProduct.addons ?? []).filter((a) =>
      addonPickerSelected.has(a.uuid)
    );
    const unitPrice =
      addonPickerProduct.price +
      selected.reduce((s, a) => s + (Number(a.extraPrice) || 0), 0);
    const addonsSnapshot =
      selected.length > 0
        ? selected.map((a) => ({
            name: a.name,
            extraPrice: Number(a.extraPrice) || 0,
          }))
        : undefined;
    setNewItems((prev) => [
      ...prev,
      {
        productUuid: addonPickerProduct.uuid,
        productName: addonPickerProduct.name,
        quantity: addonPickerQuantity,
        unitPrice,
        ...(addonsSnapshot ? { addonsSnapshot } : {}),
      },
    ]);
    setAddonPickerProduct(null);
    setSelectedProductUuid("");
    setItemQuantity(1);
  };

  const removeItem = (index: number) => {
    setNewItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateOrder = async () => {
    if (!tableUuid || newItems.length === 0) {
      setError(t("orders.validationTableItems"));
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
            ...(i.addonsSnapshot?.length
              ? { addonsSnapshot: i.addonsSnapshot }
              : {}),
          })),
          observacao: newObservacao.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || t("orders.createError"));
      }
      resetForm();
      await loadOrders();
    } catch (e) {
      setError(e instanceof Error ? e.message : t("orders.saveError"));
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

  const handleDelete = async (order: OrderDto) => {
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
        return "bg-zinc-800 text-white";
      case "READY":
        return "bg-zinc-600 text-white";
      case "PREPARING":
        return "bg-zinc-400 text-zinc-900";
      default:
        return "bg-zinc-100 text-zinc-800";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <h1 className="text-2xl font-semibold text-zinc-800">{t("orders.title")}</h1>
          <p className="text-sm text-zinc-500">
            {t("orders.subtitle")}
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
              {t("common.all")}
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
                  {statusLabel(s)}
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
            <FaPlus /> {t("orders.newOrder")}
          </button>
        </div>

        {showForm && (
          <div className="bg-white shadow-md rounded-lg p-6 text-black border border-zinc-200">
            <h2 className="text-xl font-semibold mb-4">{t("orders.newOrderTitle")}</h2>
            {error && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  {t("common.table")}
                </label>
                <select
                  value={tableUuid}
                  onChange={(e) => setTableUuid(e.target.value)}
                  className="w-full border border-zinc-300 rounded-lg p-2"
                >
                  <option value="">{t("orders.selectTable")}</option>
                  {tables.map((tbl) => (
                    <option key={tbl.uuid} value={tbl.uuid}>
                      {t("common.table")} {tbl.number}
                      {tbl.description ? ` — ${tbl.description}` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  {t("orders.initialStatus")}
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full border border-zinc-300 rounded-lg p-2"
                >
                  {(["PENDING", "PREPARING", "READY", "DELIVERED"] as OrderStatus[]).map((s) => (
                    <option key={s} value={s}>
                      {statusLabel(s)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  {t("orders.items")}
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <select
                    value={selectedProductUuid}
                    onChange={(e) => setSelectedProductUuid(e.target.value)}
                    className="flex-1 min-w-[180px] border border-zinc-300 rounded-lg p-2"
                  >
                    <option value="">{t("orders.productOption")}</option>
                    {products.map((p) => (
                      <option key={p.uuid} value={p.uuid}>
                        {canViewAttendanceFinance
                          ? `${p.name} — R$ ${p.price.toFixed(2)}`
                          : p.name}
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
                    {t("orders.add")}
                  </button>
                </div>
                {newItems.length > 0 && (
                  <ul className="border border-zinc-200 rounded-lg divide-y divide-zinc-100">
                    {newItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-start gap-2 px-3 py-2 text-sm"
                      >
                        <span className="min-w-0">
                          <span className="block">
                            {item.productName} × {item.quantity}
                            {canViewAttendanceFinance
                              ? ` — R$ ${(item.unitPrice * item.quantity).toFixed(2)}`
                              : null}
                          </span>
                          {item.addonsSnapshot?.length ? (
                            <span className="block text-xs text-zinc-500 mt-0.5">
                              {t("cardapio.lineAddons")}{" "}
                              {item.addonsSnapshot.map((a) => a.name).join(", ")}
                            </span>
                          ) : null}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(i)}
                          className="text-red-600 hover:text-red-700 shrink-0"
                        >
                          {t("orders.remove")}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  {t("orders.observationLabel")}
                </label>
                <textarea
                  value={newObservacao}
                  onChange={(e) =>
                    setNewObservacao(e.target.value.slice(0, 500))
                  }
                  rows={2}
                  maxLength={500}
                  placeholder={t("orders.observationPlaceholder")}
                  className="w-full border border-zinc-300 rounded-lg p-2 text-sm resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleCreateOrder}
                  disabled={saving}
                  className="flex-1 bg-black text-white rounded-lg py-2 hover:bg-zinc-800 disabled:opacity-50"
                >
                  {saving ? t("orders.saving") : t("orders.createOrder")}
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 bg-zinc-200 text-zinc-800 rounded-lg py-2 hover:bg-zinc-300"
                >
                  {t("common.cancel")}
                </button>
              </div>
            </div>
          </div>
        )}

        {addonPickerProduct ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-zinc-900">
                {t("cardapio.customizeTitle")}: {addonPickerProduct.name}
              </h3>
              <p className="text-sm text-zinc-500 mt-1">
                {t("cardapio.customizeHint")}
              </p>
              <p className="text-xs text-zinc-500 mt-2">
                {t("orders.items")}: ×{addonPickerQuantity}
              </p>
              <ul className="mt-4 space-y-2">
                {(addonPickerProduct.addons ?? []).map((a) => (
                  <label
                    key={a.uuid}
                    className="flex items-center justify-between gap-2 border border-zinc-200 rounded-lg p-3 cursor-pointer hover:bg-zinc-50"
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-zinc-300 shrink-0"
                        checked={addonPickerSelected.has(a.uuid)}
                        onChange={() => {
                          setAddonPickerSelected((prev) => {
                            const next = new Set(prev);
                            if (next.has(a.uuid)) next.delete(a.uuid);
                            else next.add(a.uuid);
                            return next;
                          });
                        }}
                      />
                      <span className="text-zinc-800 truncate">{a.name}</span>
                    </span>
                    {canViewAttendanceFinance ? (
                      <span className="text-sm text-zinc-600 shrink-0">
                        +R$ {(Number(a.extraPrice) || 0).toFixed(2)}
                      </span>
                    ) : null}
                  </label>
                ))}
              </ul>
              <div className="flex gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setAddonPickerProduct(null)}
                  className="flex-1 rounded-lg border border-zinc-300 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  {t("cardapio.customizeCancel")}
                </button>
                <button
                  type="button"
                  onClick={confirmAddonPicker}
                  className="flex-1 rounded-lg bg-black py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
                >
                  {t("cardapio.customizeConfirm")}
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {loading ? (
          <LoadingSpinner message={t("orders.loading")} />
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
                    <span className="font-semibold">{t("orders.tablePrefix")} {order.tableNumber}</span>
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
                    {statusLabel(order.status)}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mb-3">
                  {new Date(order.createdAt).toLocaleString(localeTag)}
                </p>
                {order.observacao?.trim() ? (
                  <p className="text-sm text-zinc-700 mb-3 p-2 rounded-lg bg-amber-50 border border-amber-100">
                    <span className="font-medium text-zinc-800">
                      {t("orders.observationLabel")}:{" "}
                    </span>
                    {order.observacao.trim()}
                  </p>
                ) : null}
                <ul className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <li
                      key={item.uuid}
                      className="flex justify-between gap-2 text-sm border-b border-zinc-100 pb-2 last:border-0"
                    >
                      <span className="min-w-0">
                        <span className="block">
                          {item.productName} × {item.quantity}
                        </span>
                        {item.addonsSnapshot?.length ? (
                          <span className="block text-xs text-zinc-500 mt-0.5">
                            {t("cardapio.lineAddons")}{" "}
                            {item.addonsSnapshot.map((a) => a.name).join(", ")}
                          </span>
                        ) : null}
                      </span>
                      {canViewAttendanceFinance ? (
                        <span className="text-zinc-600 shrink-0">
                          R$ {(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      ) : null}
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
                          → {statusLabel(s)}
                        </button>
                      ))}
                  </div>
                  <button
                    onClick={() => setOrderToDelete(order)}
                    className="text-red-600 hover:text-red-700 p-1"
                    title={t("orders.deleteTitle")}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-lg border border-zinc-200 p-8 text-center text-zinc-500">
            <FaClipboardList className="mx-auto text-4xl mb-2 opacity-50" />
            <p>{t("orders.noneFound")}</p>
            {statusFilter && (
              <button
                onClick={() => setStatusFilter("")}
                className="mt-2 text-zinc-700 underline"
              >
                {t("orders.seeAll")}
              </button>
            )}
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!orderToDelete}
        onClose={() => setOrderToDelete(null)}
        onConfirm={() => orderToDelete && handleDelete(orderToDelete)}
        title={t("orders.deleteOrderTitle")}
        message={
          orderToDelete
            ? t("orders.deleteOrderMessage", { table: String(orderToDelete.tableNumber) })
            : ""
        }
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
      />
    </div>
  );
}
