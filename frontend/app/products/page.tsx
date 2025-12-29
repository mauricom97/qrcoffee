'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  active: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: '',
    active: true,
  });

  useEffect(() => {
    setProducts([
      { id: 1, name: 'Espresso', price: 6.5, category: 'Drinks', active: true },
      { id: 2, name: 'Cappuccino', price: 9.9, category: 'Drinks', active: true },
      { id: 3, name: 'Cheese Bread', price: 5.0, category: 'Food', active: false },
    ]);
  }, []);

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) return;

    setProducts((prev) => [
      ...prev,
      { id: Date.now(), ...newProduct },
    ]);

    setNewProduct({ name: '', price: 0, category: '', active: true });
  };

  const toggleStatus = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, active: !p.active } : p
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-semibold text-zinc-800">
            Produtos
          </h1>
          <p className="text-sm text-zinc-500">
            Gerenciador de produtos a serem vendidos no estabelecimento.
          </p>
        </header>

        {/* Add product */}
        <section className="text-black rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <h2 className="mb-4 text-lg font-medium text-zinc-800">
            Adicionar novos produtos
          </h2>

          <div className="grid gap-4 md:grid-cols-5">
            <input
              type="text"
              placeholder="Nome do produto"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
            />

            <input
              type="number"
              min={1}
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value),
                })
              }
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
            />

            <input
              type="text"
              placeholder="Categoria"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category: e.target.value,
                })
              }
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
            />

            <label className="flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={newProduct.active}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    active: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-zinc-300"
              />
              Ativo
            </label>

            <button
              onClick={handleAddProduct}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition"
            >
              Adicionar produto
            </button>
          </div>
        </section>

        {/* Products list */}
        <section className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <h2 className="mb-4 text-lg font-medium text-zinc-800">
            Lista de produtos
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-zinc-200 p-4 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-zinc-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Category: {product.category || '—'}
                  </p>
                  <p className="text-lg font-semibold text-zinc-900">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      product.active
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-zinc-100 text-zinc-500'
                    }`}
                  >
                    {product.active ? 'Ativo' : 'Inativo'}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStatus(product.id)}
                      className="rounded-lg border border-zinc-200 px-3 py-1 text-xs hover:bg-zinc-100 transition"
                    >
                      Mudar status
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="rounded-lg border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <p className="text-sm text-zinc-500">
              No products registered.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
