"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaShoppingCart, FaPlus, FaMinus, FaCheckCircle } from "react-icons/fa";

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

interface MenuResponse {
  table: { uuid: string; number: number; description: string };
  categories: Array<{
    uuid: string;
    name: string;
    products: Product[];
  }>;
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

  if (!mesaUuid) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-amber-900 mb-2">
            Cardápio Online
          </h1>
          <p className="text-amber-700">
            Escaneie o QR code da sua mesa para ver o cardápio e fazer seu pedido.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-amber-800 font-medium">Carregando cardápio…</div>
      </div>
    );
  }

  if (error && !menu) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
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
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <FaCheckCircle className="mx-auto text-5xl text-emerald-500 mb-4" />
          <h1 className="text-2xl font-bold text-emerald-800 mb-2">
            Pedido enviado!
          </h1>
          <p className="text-zinc-600">
            Seu pedido foi recebido e está sendo preparado.
          </p>
          <button
            onClick={() => setOrderSent(false)}
            className="mt-6 w-full bg-amber-600 text-white rounded-xl py-3 font-medium hover:bg-amber-700"
          >
            Fazer outro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 pb-24">
      <header className="sticky top-0 z-10 bg-amber-600 text-white shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Cardápio Online</h1>
          <p className="text-amber-100 text-sm">
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

        <div className="space-y-10">
          {menu?.categories.map((category) => (
            <section key={category.uuid}>
              <h2 className="text-lg font-bold text-amber-900 mb-4 pb-2 border-b-2 border-amber-200">
                {category.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {category.products.map((product) => (
                  <div
                    key={product.uuid}
                    className="bg-white rounded-xl p-4 shadow-sm border border-amber-100 hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-zinc-800">{product.name}</h3>
                    {product.description && (
                      <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-amber-700">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-2 bg-amber-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-amber-700"
                      >
                        <FaPlus className="text-xs" /> Adicionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-200 shadow-lg z-20">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-zinc-800 flex items-center gap-2">
                <FaShoppingCart /> Carrinho ({cart.reduce((a, i) => a + i.quantity, 0)} itens)
              </span>
              <span className="text-lg font-bold text-amber-700">
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
              className="w-full bg-amber-600 text-white rounded-xl py-3 font-semibold hover:bg-amber-700 disabled:opacity-50"
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
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
          <div className="text-amber-800 font-medium">Carregando…</div>
        </div>
      }
    >
      <CardapioContent />
    </Suspense>
  );
}
