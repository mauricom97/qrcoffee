'use client';

import { useEffect, useState } from 'react';

interface Product {
  uuid: string;
  name: string;
  price: number;
  category: string;
  active: boolean;
  images?: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    uuid: '',
    name: '',
    price: 0,
    category: '',
    active: true,
    images: [] as string[],
  });
  const [showImages, setShowImages] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:3352/products/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    fetchProducts();
  }, []);

  const resetForm = () => {
    setNewProduct({ uuid: '', name: '', price: 0, category: '', active: true, images: [] });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      uuid: '',
      name: product.name,
      price: product.price,
      category: product.category,
      active: product.active,
      images: product.images || [],
    });
    setShowForm(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const readers = Array.from(files).map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((newImages) => {
        setNewProduct((prev) => ({
          ...prev,
          images: [...prev.images, ...newImages],
        }));
      });
    }
  };

  const removeImage = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSaveProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) return;

    const productData = {
      id: editingProduct ? editingProduct.uuid : Date.now(),
      ...newProduct,
    };

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.uuid === editingProduct.uuid ? productData : p))
      );
    } else {
      createProduct(productData);
      setProducts((prev) => [...prev, productData]);
    }

    resetForm();
  };

  const toggleStatus = (uuid: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.uuid === uuid ? { ...p, active: !p.active } : p
      )
    );
  };

  const createProduct = async (product: { name: string; price: number; active: boolean }) => {
    try {
      const response = await fetch('http://localhost:3352/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Product created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const deleteProduct = (uuid: string) => {
    setProducts((prev) => prev.filter((p) => p.uuid !== uuid));
    destroyProduct(uuid);
  };
  const destroyProduct = async (uuid: string) => {
    try {
      const response = await fetch(`http://localhost:3352/products`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uuid })
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }

      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const selectedProduct = products.find((p) => p.uuid === showImages);

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

        {/* Add/Edit product button */}
        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              resetForm();
              setShowForm(true);
            }
          }}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition"
        >
          {showForm ? 'Cancelar' : 'Adicionar Produto'}
        </button>

        {showForm && (
          <section className="text-black rounded-2xl bg-white p-4 shadow-sm md:p-6">
            <h2 className="mb-4 text-lg font-medium text-zinc-800">
              {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
            </h2>

            <div className="grid gap-4 md:grid-cols-4">
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
              placeholder="Preço"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                ...newProduct,
                price: parseFloat(e.target.value),
                })
              }
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
              />

              <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({
                ...newProduct,
                category: e.target.value,
                })
              }
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
              >
              <option value="" disabled>
                Selecione uma categoria
              </option>
              <option value="Bebidas">Bebidas</option>
              <option value="Comidas">Comidas</option>
              <option value="Sobremesas">Sobremesas</option>
              <option value="Lanches">Lanches</option>
              </select>

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
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-zinc-800 mb-2">
                Upload de Imagens
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm w-full"
              />
              {newProduct.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {newProduct.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Imagem ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleSaveProduct}
              className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition w-full md:w-auto"
            >
              {editingProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
            </button>
          </section>
        )}

        {/* Products list */}
        <section className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <h2 className="mb-4 text-lg font-medium text-zinc-800">
            Lista de produtos
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.uuid}
                className="rounded-xl border border-zinc-200 p-4 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-zinc-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Categoria: {product.category || '—'}
                  </p>
                  <p className="text-lg font-semibold text-zinc-900">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${product.active
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-zinc-100 text-zinc-500'
                      }`}
                  >
                    {product.active ? 'Ativo' : 'Inativo'}
                  </span>

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => toggleStatus(product.uuid)}
                      className="rounded-lg border border-zinc-200 px-3 py-1 text-xs hover:bg-zinc-100 transition"
                    >
                      Mudar status
                    </button>

                    <button
                      onClick={() => {
                        setProductToDelete(product.uuid);
                        setShowDeleteModal(true);
                      }}
                      className="rounded-lg border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => setShowImages(product.uuid)}
                      className="rounded-lg border border-blue-200 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 transition"
                    >
                      Mostrar imagens
                    </button>

                    <button
                      onClick={() => handleEdit(product)}
                      className="rounded-lg border border-green-200 px-3 py-1 text-xs text-green-600 hover:bg-green-50 transition"
                    >
                      Editar
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

      {showImages !== null && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-zinc-800 mb-4">
              Imagens de {selectedProduct.name}
            </h2>

            {selectedProduct.images && selectedProduct.images.length > 0 ? (
              <div className="flex overflow-x-auto gap-4 pb-4">
                {selectedProduct.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Imagem ${idx + 1} de ${selectedProduct.name}`}
                    className="h-64 object-contain flex-shrink-0 rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                Nenhuma imagem disponível para este produto.
              </p>
            )}

            <button
              onClick={() => setShowImages(null)}
              className="mt-6 w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
            <h2 className="text-xl font-semibold text-zinc-800 mb-4">
              Confirmar Exclusão
            </h2>
            <p className="text-sm text-zinc-600 mb-6">
              Tem certeza que deseja excluir o produto {products.find(p => p.uuid === productToDelete)?.name}?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setProductToDelete(null);
                }}
                className="flex-1 rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteProduct(productToDelete);
                  setShowDeleteModal(false);
                  setProductToDelete(null);
                }}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}