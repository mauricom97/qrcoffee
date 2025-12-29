'use client'

import { useState } from 'react'

const productsMock = [
  { id: 1, name: 'Coca-Cola 2L', category: 'Bebidas', stock: 12, price: 9.5 },
  { id: 2, name: 'Hambúrguer Artesanal', category: 'Alimentos', stock: 4, price: 18 },
  { id: 3, name: 'Batata Frita', category: 'Alimentos', stock: 20, price: 12 },
  { id: 4, name: 'Cerveja Pilsen', category: 'Bebidas', stock: 2, price: 7 },
]

export default function StockManagementPage() {
  const [search, setSearch] = useState('')

  const filteredProducts = productsMock.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  const lowStock = productsMock.filter(p => p.stock <= 5).length

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className='mt-15'>
        <h1 className="text-2xl font-semibold text-gray-800">
          Gerenciamento de Estoque
        </h1>
        <p className="text-sm text-gray-500">
          Controle e acompanhe os produtos do seu estabelecimento
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total de Produtos" value={productsMock.length} />
        <SummaryCard title="Baixo Estoque" value={lowStock} danger />
        <SummaryCard title="Categorias" value={2} />
        <SummaryCard title="Itens em Estoque" value="38" />
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-72 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
          + Novo Produto
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Produto</th>
              <th className="px-4 py-3 text-left">Categoria</th>
              <th className="px-4 py-3 text-center">Estoque</th>
              <th className="px-4 py-3 text-right">Preço</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredProducts.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {product.name}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {product.category}
                </td>
                <td className="px-4 py-3 text-gray-600 text-center">
                  {product.stock}
                </td>
                <td className="px-4 py-3 text-gray-600 text-right">
                  R$ {product.price.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center">
                  <StockStatus stock={product.stock} />
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  Nenhum produto encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ===== Components ===== */

function SummaryCard({
  title,
  value,
  danger,
}: {
  title: string
  value: string | number
  danger?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        danger ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p
        className={`mt-2 text-2xl font-semibold ${
          danger ? 'text-red-600' : 'text-gray-800'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function StockStatus({ stock }: { stock: number }) {
  if (stock <= 5) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
        Baixo
      </span>
    )
  }

  return (
    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
      Normal
    </span>
  )
}
