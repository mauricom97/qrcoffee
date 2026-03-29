"use client";

import { useEffect, useState, useCallback } from "react";
import { Product } from "./interfaces/product.interface";
import { getAuthHeaders } from "contexts/AuthContext";
import { useAuth } from "contexts/AuthContext";
import LoadingSpinner from "components/LoadingSpinner";
import { useRealtimeUpdates } from "hooks/useRealtimeUpdates";
import { useLocaleContext } from "i18n/LocaleContext";

interface Category {
  uuid: string;
  name: string;
}

export default function ProductsPage() {
  const { user } = useAuth();
  const { t, localeTag } = useLocaleContext();
  const formatPrice = useCallback(
    (value: number) =>
      new Intl.NumberFormat(localeTag, {
        style: "currency",
        currency: "BRL",
      }).format(value),
    [localeTag]
  );
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    uuid: "",
    name: "",
    price: 0,
    categoryUuid: "",
    active: true,
    description: "",
    images: [] as string[],
  });
  const [showImages, setShowImages] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  async function createCategory(name: string) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + "/categories",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({ name }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to create category: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Category created successfully:", data);
      return data;
    } catch (error) {
      console.error("Error creating category:", error);
    }
  }

  async function fetchProducts() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + "/products/all",
        { headers: getAuthHeaders() }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  async function fetchCategories() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + "/categories/all",
        { headers: getAuthHeaders() }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }
  const refetch = useCallback(() => {
    setLoading(true);
    Promise.all([fetchCategories(), fetchProducts()]).finally(() =>
      setLoading(false)
    );
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useRealtimeUpdates(user?.companyUuid ?? null, {
    onProductsUpdate: refetch,
    onMenuUpdate: refetch,
  });

  const resetForm = () => {
    setNewProduct({
      uuid: "",
      name: "",
      price: 0,
      categoryUuid: "",
      description: "",
      active: true,
      images: [],
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setEditingProduct(product);
    setNewProduct({
      uuid: product.uuid,
      name: product.name,
      price: product.price,
      categoryUuid: product.categoryUuid,
      description: product.description || "",
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
      updateProduct(editingProduct.uuid, productData);
    } else {
      createProduct(productData);
      setProducts((prev) => [...prev, productData]);
    }

    resetForm();
  };

  const toggleStatus = (uuid: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.uuid === uuid ? { ...p, active: !p.active } : p))
    );
    updateProduct(uuid, {
      active: !products.find((p) => p.uuid === uuid)?.active,
    });
  };

  const createProduct = async (product: {
    name: string;
    price: number;
    active: boolean;
  }) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + "/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(product),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create product: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Product created successfully:", data);
      return data;
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const updateProduct = async (uuid: string, updatedData: Partial<Product>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/products?uuid=${uuid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedProduct = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.uuid === uuid ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const deleteProduct = (uuid: string) => {
    setProducts((prev) => prev.filter((p) => p.uuid !== uuid));
    destroyProduct(uuid);
  };
  const destroyProduct = async (uuid: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + "/products",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({ uuid }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }

      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const selectedProduct = products.find((p) => p.uuid === showImages);

  // Função para agrupar produtos por categoria, filtrando categorias vazias
  const groupedProducts = categories
    .map((category) => ({
      categoryName: category.name,
      products: products.filter(
        (product) => product.categoryUuid === category.uuid
      ),
    }))
    .filter((group) => group.products.length > 0); // Filtra categorias sem produtos

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-semibold text-zinc-800">{t("products.title")}</h1>
          <p className="text-sm text-zinc-500">
            {t("products.subtitle")}
          </p>
        </header>

        {loading ? (
          <LoadingSpinner message={t("products.loading")} />
        ) : (
          <>
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
          {showForm ? t("common.cancel") : t("products.addProduct")}
        </button>

        {showForm && (
          <section className="text-black rounded-2xl bg-white p-4 shadow-sm md:p-6">
            <h2 className="mb-4 text-lg font-medium text-zinc-800">
              {editingProduct ? t("products.editProduct") : t("products.addNew")}
            </h2>

            <div className="grid gap-4 md:grid-cols-4">
              <input
                type="text"
                placeholder={t("products.namePh")}
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
              />

              <input
                type="number"
                min={1}
                placeholder={t("products.pricePh")}
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
                value={newProduct.categoryUuid}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    categoryUuid: e.target.value,
                  })
                }
                className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
              >
                <option value="" disabled>
                  {t("products.selectCategory")}
                </option>
                {categories.map((category) => (
                  <option key={category.uuid} value={category.uuid}>
                    {category.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowCategoryModal(true)}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition"
              >
                {t("products.createCategory")}
              </button>

              {showCategoryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
                    <h2 className="text-xl font-semibold text-zinc-800 mb-4">
                      {t("products.newCategoryTitle")}
                    </h2>
                    <input
                      type="text"
                      placeholder={t("products.categoryNamePh")}
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400 mb-4"
                    />
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setShowCategoryModal(false);
                          setNewCategoryName("");
                        }}
                        className="flex-1 rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-300 transition"
                      >
                        {t("common.cancel")}
                      </button>
                      <button
                        onClick={async () => {
                          if (newCategoryName.trim()) {
                            await createCategory(newCategoryName.trim());
                            setShowCategoryModal(false);
                            setNewCategoryName("");
                            fetchCategories();
                          }
                        }}
                        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition"
                      >
                        {t("products.createCategory")}
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                {t("products.activeLabel")}
              </label>
            </div>

            <div>
              <textarea
                placeholder={t("products.descPh")}
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="mt-4 h-24 rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400 w-full"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-zinc-800 mb-2">
                {t("products.imageUpload")}
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
                        alt={t("products.imageAlt", { n: index + 1 })}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-600 text-white px-2 py-1 text-xs rounded-full hover:bg-red-700 transition"
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
              {editingProduct
                ? t("products.updateProduct")
                : t("products.addProduct")}
            </button>
          </section>
        )}

        <section className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <h2 className="mb-4 text-lg font-medium text-zinc-800">
            {t("products.filters")}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder={t("products.searchName")}
              onChange={async (e) => {
                const searchTerm = e.target.value.trim();
                if (searchTerm === "") {
                  fetchProducts(); // Recarrega todos os produtos se o campo estiver vazio
                } else {
                  try {
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_BASE_API_URL}/products/all?name=${searchTerm}`,
                      { headers: getAuthHeaders() }
                    );

                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const filteredProducts: Product[] = await response.json();
                    setProducts(filteredProducts); // Atualiza a lista de produtos com os resultados da pesquisa
                  } catch (error) {
                    console.error("Failed to fetch products by name:", error);
                  }
                }
              }}
              className="rounded-lg text-zinc-800 border border-zinc-200 px-3 py-2 focus:outline-none focus:border-zinc-400"
            />
            <select
              onChange={async (e) => {
                const selectedCategory = e.target.value;
                if (selectedCategory) {
                  try {
                    const categoryUuid = categories.find(
                      (cat) => cat.name === selectedCategory
                    )?.uuid;
                    const response = await fetch(
                      `${process.env.NEXT_PUBLIC_BASE_API_URL}/products/all?categoryUuid=${categoryUuid}`,
                      { headers: getAuthHeaders() }
                    );

                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const filteredProducts: Product[] = await response.json();
                    setProducts(filteredProducts);
                  } catch (error) {
                    console.error(
                      "Failed to fetch products by category:",
                      error
                    );
                  }
                } else {
                  fetchProducts(); // Recarrega todos os produtos se nenhuma categoria for selecionada
                }
              }}
              className="rounded-lg text-zinc-800 border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
            >
              <option value="">{t("products.allCategories")}</option>
              {categories.map((category) => (
                <option key={category.uuid} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
          {groupedProducts.map((group) => (
            <div key={group.categoryName} className="mb-8">
              <h3 className="text-xl font-semibold text-zinc-800 mb-4">
                {group.categoryName}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.products.map((product) => (
                  <div
                    key={product.uuid}
                    className="rounded-xl border border-zinc-200 p-4 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium text-zinc-800 font-semibold">
                        {product.name}
                      </h3>
                      <p className="text-sm text-zinc-500 font-semibold">
                        {t("products.descLabel")}{" "}
                        <span className="font-normal">
                          {product.description || "—"}
                        </span>
                      </p>
                      <p className="text-lg font-semibold text-zinc-900">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          product.active
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {product.active
                          ? t("common.active")
                          : t("common.inactive")}
                      </span>

                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => toggleStatus(product.uuid)}
                          className="rounded-lg border border-amber-400 px-3 py-1 text-xs text-amber-700 hover:bg-amber-50 transition"
                        >
                          {t("products.changeStatus")}
                        </button>

                        <button
                          onClick={() => {
                            setProductToDelete(product.uuid);
                            setShowDeleteModal(true);
                          }}
                          className="rounded-lg border border-red-200 px-3 py-1 text-xs text-red-600 hover:bg-red-50 transition"
                        >
                          {t("common.delete")}
                        </button>

                        <button
                          onClick={() => setShowImages(product.uuid)}
                          className="rounded-lg border border-blue-200 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 transition"
                        >
                          {t("products.showImages")}
                        </button>

                        <button
                          onClick={() => handleEdit(product)}
                          className="rounded-lg border border-blue-200 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 transition"
                        >
                          {t("common.edit")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {group.products.length === 0 && (
                <p className="text-sm text-zinc-500">
                  {t("products.noneInCategory")}
                </p>
              )}
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-sm text-zinc-500">
              {t("products.noneRegistered")}
            </p>
          )}
        </section>
          </>
        )}
      </div>

      {showImages !== null && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-zinc-800 mb-4">
              {t("products.imagesOf", { name: selectedProduct.name })}
            </h2>

            {selectedProduct.images && selectedProduct.images.length > 0 ? (
              <div className="flex overflow-x-auto gap-4 pb-4">
                {selectedProduct.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={t("products.imageAlt", { n: idx + 1 })}
                    className="h-64 object-contain flex-shrink-0 rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                {t("products.noImages")}
              </p>
            )}

            <button
              onClick={() => setShowImages(null)}
              className="mt-6 w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition"
            >
              {t("common.close")}
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
            <h2 className="text-xl font-semibold text-zinc-800 mb-4">
              {t("products.confirmDeleteTitle")}
            </h2>
            <p className="text-sm text-zinc-600 mb-6">
              {t("products.confirmDeleteMsg", {
                name:
                  products.find((p) => p.uuid === productToDelete)?.name ?? "",
              })}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setProductToDelete(null);
                }}
                className="flex-1 rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-300 transition"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={() => {
                  deleteProduct(productToDelete);
                  setShowDeleteModal(false);
                  setProductToDelete(null);
                }}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
              >
                {t("common.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
