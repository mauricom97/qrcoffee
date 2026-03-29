'use client'

import { useState, useCallback } from 'react'
import { useLocaleContext } from 'i18n/LocaleContext'

const productsMock = [
  { id: 1, name: 'Coca-Cola 2L', category: 'Bebidas', stock: 12, price: 9.5 },
  { id: 2, name: 'Hambúrguer Artesanal', category: 'Alimentos', stock: 4, price: 18 },
  { id: 3, name: 'Batata Frita', category: 'Alimentos', stock: 20, price: 12 },
  { id: 4, name: 'Cerveja Pilsen', category: 'Bebidas', stock: 2, price: 7 },
]

export default function StockManagementPage() {
  const { t, localeTag } = useLocaleContext()
  const [search, setSearch] = useState('')

  const formatPrice = useCallback(
    (value: number) =>
      new Intl.NumberFormat(localeTag, {
        style: 'currency',
        currency: 'BRL',
      }).format(value),
    [localeTag]
  )

  const filteredProducts = productsMock.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  const lowStock = productsMock.filter(p => p.stock <= 5).length

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className='mt-15'>
        <h1 className="text-2xl font-semibold text-gray-800">
          {t('stock.title')}
        </h1>
        <p className="text-sm text-gray-500">
          {t('stock.subtitle')}
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title={t('stock.totalProducts')} value={productsMock.length} />
        <SummaryCard title={t('stock.lowStock')} value={lowStock} danger />
        <SummaryCard title={t('stock.categories')} value={2} />
        <SummaryCard title={t('stock.itemsInStock')} value="38" />
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder={t('stock.searchPh')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-72 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
        />

        <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition">
          {t('stock.newProduct')}
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">{t('stock.colProduct')}</th>
              <th className="px-4 py-3 text-left">{t('stock.colCategory')}</th>
              <th className="px-4 py-3 text-center">{t('stock.colStock')}</th>
              <th className="px-4 py-3 text-right">{t('stock.colPrice')}</th>
              <th className="px-4 py-3 text-center">{t('stock.colStatus')}</th>
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
                  {formatPrice(product.price)}
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
                  {t('stock.noneFound')}
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
        danger ? 'border-zinc-300 bg-zinc-100' : 'border-zinc-200 bg-white'
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p
        className={`mt-2 text-2xl font-semibold ${
          danger ? 'text-zinc-700' : 'text-zinc-800'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function StockStatus({ stock }: { stock: number }) {
  const { t } = useLocaleContext()
  if (stock <= 5) {
    return (
      <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700">
        {t('stock.low')}
      </span>
    )
  }

  return (
    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
      {t('stock.normal')}
    </span>
  )
}
