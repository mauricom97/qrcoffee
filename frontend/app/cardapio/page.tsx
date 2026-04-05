"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaShoppingCart, FaPlus, FaMinus, FaCheckCircle, FaSearch } from "react-icons/fa";
import LoadingSpinner from "components/LoadingSpinner";
import { useRealtimeUpdates } from "hooks/useRealtimeUpdates";
import { useLocaleContext } from "i18n/LocaleContext";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

interface ProductAddon {
  uuid: string;
  name: string;
  extraPrice: number;
}

interface Product {
  uuid: string;
  name: string;
  price: number;
  description?: string;
  categoryUuid: string;
  active: boolean;
  addons?: ProductAddon[];
  category?: { uuid: string; name: string };
}

export interface MenuTheme {
  primary?: string;
  primaryHover?: string;
  background?: string;
  accent?: string;
  textPrimary?: string;
  textMuted?: string;
}

interface MenuResponse {
  table: { uuid: string; number: number; description: string; companyUuid?: string };
  categories: Array<{
    uuid: string;
    name: string;
    products: Product[];
  }>;
  theme?: MenuTheme | null;
  /** Indica se há horário da cozinha salvo (intervalos). */
  kitchenHoursConfigured?: boolean;
  /** Cozinha aberta agora, segundo o fuso configurado. */
  kitchenOpen?: boolean;
}

const DEFAULT_THEME: MenuTheme = {
  primary: "#18181b",
  primaryHover: "#27272a",
  background: "#fafafa",
  accent: "#e4e4e7",
  textPrimary: "#18181b",
  textMuted: "#71717a",
};

function mergeTheme(theme?: MenuTheme | null): MenuTheme {
  if (!theme) return DEFAULT_THEME;
  return { ...DEFAULT_THEME, ...theme };
}

function lineKey(productUuid: string, addons: ProductAddon[]) {
  const u = addons
    .map((a) => a.uuid)
    .sort()
    .join("|");
  return `${productUuid}::${u}`;
}

function unitLinePrice(product: Product, addons: ProductAddon[]) {
  return (
    product.price +
    addons.reduce((s, a) => s + (Number(a.extraPrice) || 0), 0)
  );
}

interface CartLine {
  key: string;
  product: Product;
  selectedAddons: ProductAddon[];
  quantity: number;
}

function CardapioContent() {
  const { t } = useLocaleContext();
  const searchParams = useSearchParams();
  const mesaUuid = searchParams.get("mesa");

  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [pickerProduct, setPickerProduct] = useState<Product | null>(null);
  const [pickerSelectedUuids, setPickerSelectedUuids] = useState<Set<string>>(
    () => new Set()
  );
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategoryUuid, setSelectedCategoryUuid] = useState<string>("");
  const [ordering, setOrdering] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderObservacao, setOrderObservacao] = useState("");

  const loadMenu = useCallback(async () => {
    if (!mesaUuid) return;
    try {
      setError(null);
      const res = await fetch(`${API_URL}/public/menu/${mesaUuid}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error(t("cardapio.errNotFound"));
        throw new Error(t("cardapio.errLoad"));
      }
      const data: MenuResponse = await res.json();
      setMenu(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("cardapio.errLoad"));
    } finally {
      setLoading(false);
    }
  }, [mesaUuid]);

  useEffect(() => {
    if (mesaUuid) loadMenu();
    else setLoading(false);
  }, [mesaUuid, loadMenu]);

  useRealtimeUpdates(menu?.table?.companyUuid ?? null, {
    onProductsUpdate: loadMenu,
    onMenuUpdate: loadMenu,
  });

  const addOrIncrementLine = (product: Product, selectedAddons: ProductAddon[]) => {
    const key = lineKey(product.uuid, selectedAddons);
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { key, product, selectedAddons, quantity: 1 }];
    });
  };

  const requestAddProduct = (product: Product) => {
    const list = product.addons ?? [];
    if (list.length === 0) {
      addOrIncrementLine(product, []);
      return;
    }
    setPickerProduct(product);
    setPickerSelectedUuids(new Set());
  };

  const confirmPicker = () => {
    if (!pickerProduct) return;
    const list = pickerProduct.addons ?? [];
    const selected = list.filter((a) => pickerSelectedUuids.has(a.uuid));
    addOrIncrementLine(pickerProduct, selected);
    setPickerProduct(null);
  };

  const removeFromCart = (key: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.key === key);
      if (!item) return prev;
      if (item.quantity <= 1) return prev.filter((i) => i.key !== key);
      return prev.map((i) =>
        i.key === key ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const incrementLine = (key: string) => {
    setCart((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const totalCart = cart.reduce(
    (acc, i) => acc + unitLinePrice(i.product, i.selectedAddons) * i.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!menu || cart.length === 0) return;
    setOrdering(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/public/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableUuid: menu.table.uuid,
          items: cart.map((i) => {
            const unit = unitLinePrice(i.product, i.selectedAddons);
            const addonsSnapshot =
              i.selectedAddons.length > 0
                ? i.selectedAddons.map((a) => ({
                    name: a.name,
                    extraPrice: Number(a.extraPrice) || 0,
                  }))
                : undefined;
            return {
              productUuid: i.product.uuid,
              quantity: i.quantity,
              unitPrice: unit,
              ...(addonsSnapshot ? { addonsSnapshot } : {}),
            };
          }),
          observacao: orderObservacao.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || t("cardapio.sendError"));
      }
      setOrderSent(true);
      setCart([]);
      setOrderObservacao("");
    } catch (e) {
      setError(e instanceof Error ? e.message : t("cardapio.sendError"));
    } finally {
      setOrdering(false);
    }
  };

  const theme = mergeTheme(menu?.theme);

  const filteredCategories = menu
    ? menu.categories
        .map((category) => ({
          ...category,
          products: category.products.filter((product) => {
            const matchesCategory =
              !selectedCategoryUuid || category.uuid === selectedCategoryUuid;
            const search = searchText.trim().toLowerCase();
            const matchesSearch =
              !search ||
              product.name.toLowerCase().includes(search) ||
              (product.description ?? "").toLowerCase().includes(search);
            return matchesCategory && matchesSearch;
          }),
        }))
        .filter((cat) => cat.products.length > 0)
    : [];

  const themeVars = {
    "--menu-primary": theme.primary,
    "--menu-primary-hover": theme.primaryHover,
    "--menu-background": theme.background,
    "--menu-accent": theme.accent,
    "--menu-text-primary": theme.textPrimary,
    "--menu-text-muted": theme.textMuted,
  } as React.CSSProperties;

  if (!mesaUuid) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ ...themeVars, backgroundColor: theme.background }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: theme.textPrimary }}>
            {t("cardapio.title")}
          </h1>
          <p style={{ color: theme.textMuted }}>
            {t("cardapio.scanPrompt")}
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <LoadingSpinner message={t("cardapio.loading")} />
      </div>
    );
  }

  if (error && !menu) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: theme.background }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <h1 className="text-xl font-bold text-red-800 mb-2">{t("cardapio.oops")}</h1>
          <p className="text-zinc-600">{error}</p>
          <p className="text-sm text-zinc-500 mt-4">
            {t("cardapio.checkQr")}
          </p>
        </div>
      </div>
    );
  }

  if (orderSent) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ backgroundColor: theme.background }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <FaCheckCircle className="mx-auto text-5xl text-zinc-600 mb-4" />
          <h1 className="text-2xl font-bold text-zinc-800 mb-2">
            {t("cardapio.orderSent")}
          </h1>
          <p className="text-zinc-600">
            {t("cardapio.orderSentDesc")}
          </p>
          <button
            onClick={() => setOrderSent(false)}
            className="mt-6 w-full text-white rounded-xl py-3 font-medium disabled:opacity-50 hover:opacity-90 transition"
            style={{ backgroundColor: theme.primary }}
          >
            {t("cardapio.anotherOrder")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-24"
      style={{ ...themeVars, backgroundColor: theme.background }}
    >
      <header
        className="sticky top-0 z-10 text-white shadow-md"
        style={{ backgroundColor: theme.primary }}
      >
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">{t("cardapio.title")}</h1>
          <p className="text-sm opacity-90">
            {t("cardapio.table")} {menu?.table.number}
            {menu?.table.description ? ` — ${menu.table.description}` : ""}
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        {menu?.kitchenHoursConfigured && menu.kitchenOpen === false && (
          <div
            className="mb-4 p-3 rounded-xl text-sm border bg-amber-50 text-amber-950 border-amber-200"
            role="status"
          >
            {t("cardapio.kitchenClosedBanner")}
          </div>
        )}

        <div className="mb-6 space-y-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t("cardapio.searchPh")}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              style={{ borderColor: theme.accent }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategoryUuid("")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                !selectedCategoryUuid
                  ? "text-white"
                  : "bg-white border text-zinc-700 hover:bg-zinc-50"
              }`}
              style={
                !selectedCategoryUuid
                  ? { backgroundColor: theme.primary }
                  : { borderColor: theme.accent }
              }
            >
              {t("cardapio.allCategories")}
            </button>
            {menu?.categories.map((category) => (
              <button
                key={category.uuid}
                onClick={() => setSelectedCategoryUuid(category.uuid)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedCategoryUuid === category.uuid
                    ? "text-white"
                    : "bg-white border text-zinc-700 hover:bg-zinc-50"
                }`}
                style={
                  selectedCategoryUuid === category.uuid
                    ? { backgroundColor: theme.primary }
                    : { borderColor: theme.accent }
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {filteredCategories.length === 0 ? (
            <p className="text-center text-zinc-500 py-8">
              {t("cardapio.noneFiltered")}
            </p>
          ) : (
          filteredCategories.map((category) => (
            <section key={category.uuid}>
              <h2
                className="text-lg font-bold mb-4 pb-2 border-b-2"
                style={{ color: theme.textPrimary, borderColor: theme.accent }}
              >
                {category.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {category.products.map((product) => (
                  <div
                    key={product.uuid}
                    className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition"
                    style={{ borderColor: theme.accent }}
                  >
                    <h3 className="font-semibold text-zinc-800">{product.name}</h3>
                    {product.description && (
                      <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className="text-lg font-bold"
                        style={{ color: theme.textPrimary }}
                      >
                        R$ {product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => requestAddProduct(product)}
                        className="flex items-center gap-2 text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition"
                        style={{ backgroundColor: theme.primary }}
                      >
                        <FaPlus className="text-xs" /> {t("cardapio.add")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
          )}
        </div>
      </main>

      {pickerProduct ? (
        <div
          className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-4 bg-black/45"
          role="dialog"
          aria-modal="true"
          aria-labelledby="addon-picker-title"
        >
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-5 shadow-xl max-h-[85vh] overflow-y-auto">
            <h3
              id="addon-picker-title"
              className="text-lg font-semibold text-zinc-900"
            >
              {t("cardapio.customizeTitle")}: {pickerProduct.name}
            </h3>
            <p className="text-sm text-zinc-500 mt-1">{t("cardapio.customizeHint")}</p>
            <ul className="mt-4 space-y-2">
              {(pickerProduct.addons ?? []).map((a) => (
                <label
                  key={a.uuid}
                  className="flex items-center justify-between gap-2 border border-zinc-200 rounded-xl p-3 cursor-pointer hover:bg-zinc-50"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-zinc-300 shrink-0"
                      checked={pickerSelectedUuids.has(a.uuid)}
                      onChange={() => {
                        setPickerSelectedUuids((prev) => {
                          const next = new Set(prev);
                          if (next.has(a.uuid)) next.delete(a.uuid);
                          else next.add(a.uuid);
                          return next;
                        });
                      }}
                    />
                    <span className="text-zinc-800 truncate">{a.name}</span>
                  </span>
                  <span className="text-sm text-zinc-600 shrink-0">
                    +R$ {(Number(a.extraPrice) || 0).toFixed(2)}
                  </span>
                </label>
              ))}
            </ul>
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={() => setPickerProduct(null)}
                className="flex-1 rounded-xl border border-zinc-300 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                {t("cardapio.customizeCancel")}
              </button>
              <button
                type="button"
                onClick={confirmPicker}
                className="flex-1 rounded-xl py-3 text-sm font-medium text-white hover:opacity-90"
                style={{ backgroundColor: theme.primary }}
              >
                {t("cardapio.customizeConfirm")}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {cart.length > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20"
          style={{ borderColor: theme.accent }}
        >
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-zinc-800 flex items-center gap-2">
                <FaShoppingCart /> {t("cardapio.cart")} ({t("cardapio.cartItems", { count: cart.reduce((a, i) => a + i.quantity, 0) })})
              </span>
              <span
                className="text-lg font-bold"
                style={{ color: theme.textPrimary }}
              >
                R$ {totalCart.toFixed(2)}
              </span>
            </div>
            <div className="max-h-24 overflow-y-auto mb-3 space-y-1">
              {cart.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between text-sm gap-2"
                >
                  <span className="text-zinc-700 min-w-0">
                    <span className="block truncate">
                      {item.product.name} × {item.quantity}
                    </span>
                    {item.selectedAddons.length > 0 ? (
                      <span className="block text-xs text-zinc-500 truncate">
                        {t("cardapio.lineAddons")}{" "}
                        {item.selectedAddons.map((a) => a.name).join(", ")}
                      </span>
                    ) : null}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.key)}
                      className="p-1 rounded bg-zinc-100 hover:bg-zinc-200"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => incrementLine(item.key)}
                      className="p-1 rounded bg-zinc-100 hover:bg-zinc-200"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <label className="block mb-2">
              <span className="text-xs font-medium text-zinc-600">
                {t("cardapio.observationLabel")}
              </span>
              <textarea
                value={orderObservacao}
                onChange={(e) =>
                  setOrderObservacao(e.target.value.slice(0, 500))
                }
                rows={2}
                maxLength={500}
                placeholder={t("cardapio.observationPlaceholder")}
                className="mt-1 w-full rounded-xl border bg-white text-zinc-800 placeholder-zinc-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 resize-none"
                style={{ borderColor: theme.accent }}
              />
            </label>
            <button
              onClick={handlePlaceOrder}
              disabled={ordering}
              className="w-full text-white rounded-xl py-3 font-semibold disabled:opacity-50 hover:opacity-90 transition"
              style={{ backgroundColor: theme.primary }}
            >
              {ordering ? t("cardapio.sending") : t("cardapio.placeOrder")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CardapioSuspenseFallback() {
  const { t } = useLocaleContext();
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: DEFAULT_THEME.background }}>
      <LoadingSpinner message={t("cardapio.fallbackLoading")} />
    </div>
  );
}

export default function CardapioPage() {
  return (
    <Suspense fallback={<CardapioSuspenseFallback />}>
      <CardapioContent />
    </Suspense>
  );
}
