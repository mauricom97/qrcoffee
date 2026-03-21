"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaShoppingCart, FaPlus, FaMinus, FaCheckCircle, FaSearch } from "react-icons/fa";
import LoadingSpinner from "components/LoadingSpinner";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

interface Product {
  uuid: string;
  name: string;
  price: number;
  description?: string;
  categoryUuid: string;
  active: boolean;
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
  table: { uuid: string; number: number; description: string };
  categories: Array<{
    uuid: string;
    name: string;
    products: Product[];
  }>;
  theme?: MenuTheme | null;
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

interface CartItem {
  product: Product;
  quantity: number;
}

function CardapioContent() {
  const searchParams = useSearchParams();
  const mesaUuid = searchParams.get("mesa");

  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategoryUuid, setSelectedCategoryUuid] = useState<string>("");
  const [ordering, setOrdering] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMenu = useCallback(async () => {
    if (!mesaUuid) return;
    try {
      setError(null);
      const res = await fetch(`${API_URL}/public/menu/${mesaUuid}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Mesa não encontrada.");
        throw new Error("Erro ao carregar cardápio.");
      }
      const data: MenuResponse = await res.json();
      setMenu(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar cardápio.");
    } finally {
      setLoading(false);
    }
  }, [mesaUuid]);

  useEffect(() => {
    if (mesaUuid) loadMenu();
    else setLoading(false);
  }, [mesaUuid, loadMenu]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.uuid === product.uuid);
      if (existing) {
        return prev.map((i) =>
          i.product.uuid === product.uuid
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productUuid: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.product.uuid === productUuid);
      if (!item) return prev;
      if (item.quantity <= 1) return prev.filter((i) => i.product.uuid !== productUuid);
      return prev.map((i) =>
        i.product.uuid === productUuid
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    });
  };

  const totalCart = cart.reduce(
    (acc, i) => acc + i.product.price * i.quantity,
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
          items: cart.map((i) => ({
            productUuid: i.product.uuid,
            quantity: i.quantity,
            unitPrice: i.product.price,
          })),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Erro ao enviar pedido.");
      }
      setOrderSent(true);
      setCart([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao enviar pedido.");
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
            Cardápio Online
          </h1>
          <p style={{ color: theme.textMuted }}>
            Escaneie o QR code da sua mesa para ver o cardápio e fazer seu pedido.
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
        <LoadingSpinner message="Carregando cardápio…" />
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
          <h1 className="text-xl font-bold text-red-800 mb-2">Ops!</h1>
          <p className="text-zinc-600">{error}</p>
          <p className="text-sm text-zinc-500 mt-4">
            Verifique se o QR code foi escaneado corretamente.
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
            Pedido enviado!
          </h1>
          <p className="text-zinc-600">
            Seu pedido foi recebido e está sendo preparado.
          </p>
          <button
            onClick={() => setOrderSent(false)}
            className="mt-6 w-full text-white rounded-xl py-3 font-medium disabled:opacity-50 hover:opacity-90 transition"
            style={{ backgroundColor: theme.primary }}
          >
            Fazer outro pedido
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
          <h1 className="text-xl font-bold">Cardápio Online</h1>
          <p className="text-sm opacity-90">
            Mesa {menu?.table.number}
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

        <div className="mb-6 space-y-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar produtos..."
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
              Todas
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
              Nenhum produto encontrado com os filtros aplicados.
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
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition"
                        style={{ backgroundColor: theme.primary }}
                      >
                        <FaPlus className="text-xs" /> Adicionar
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

      {cart.length > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20"
          style={{ borderColor: theme.accent }}
        >
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-zinc-800 flex items-center gap-2">
                <FaShoppingCart /> Carrinho ({cart.reduce((a, i) => a + i.quantity, 0)} itens)
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
                  key={item.product.uuid}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-zinc-700">
                    {item.product.name} × {item.quantity}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item.product.uuid)}
                      className="p-1 rounded bg-zinc-100 hover:bg-zinc-200"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item.product)}
                      className="p-1 rounded bg-zinc-100 hover:bg-zinc-200"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handlePlaceOrder}
              disabled={ordering}
              className="w-full text-white rounded-xl py-3 font-semibold disabled:opacity-50 hover:opacity-90 transition"
              style={{ backgroundColor: theme.primary }}
            >
              {ordering ? "Enviando…" : "Enviar pedido"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CardapioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: DEFAULT_THEME.background }}>
          <LoadingSpinner message="Carregando…" />
        </div>
      }
    >
      <CardapioContent />
    </Suspense>
  );
}
