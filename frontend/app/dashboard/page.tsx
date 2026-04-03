'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { getAuthHeaders } from 'contexts/AuthContext';
import LoadingSpinner from 'components/LoadingSpinner';
import { useLocaleContext } from 'i18n/LocaleContext';
import { useRequirePanelPermission } from 'hooks/useRequirePanelPermission';
import { PANEL_PERMISSIONS } from 'lib/panelPermissions';

const API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3352';

const HISTORY_PAGE_SIZE = 20;

const HISTORY_STATUSES = [
  'PENDING',
  'PREPARING',
  'READY',
  'DELIVERED',
] as const;

function getDefaultHistoryRange() {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 30);
  const ymd = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  return { from: ymd(from), to: ymd(to) };
}

/* =======================
   PERMISSÕES
======================= */
const userPermission = {
  canViewAttendance: true,
  canViewFinancial: true,
};

/* =======================
   TIPOS
======================= */
type AttendancePoint = {
  label: string;
  period: string;
  total: number;
  delivered: number;
  pending: number;
};

type FinancialPoint = {
  label: string;
  period: string;
  revenue: number;
  orderCount: number;
};

type AttendanceSummary = {
  totalOrders: number;
  deliveredOrders: number;
  pendingOrders: number;
  lastPeriodLabel: string;
};

type FinancialSummary = {
  totalRevenue: number;
  orderCount: number;
  lastPeriodLabel: string;
};

type AttendanceHistoryRow = {
  uuid: string;
  createdAt: string;
  status: string;
  tableUuid: string;
  tableNumber: number;
  itemsCount: number;
  totalValue: number;
};

type TableOption = { uuid: string; number: number };

export default function Dashboard() {
  useRequirePanelPermission(PANEL_PERMISSIONS.DASHBOARD);
  const { t, localeTag } = useLocaleContext();

  function formatCurrency(value: number) {
    return new Intl.NumberFormat(localeTag, {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }
  const [activeTab, setActiveTab] = useState<'attendance' | 'financial'>(
    userPermission.canViewAttendance ? 'attendance' : 'financial'
  );
  const [period, setPeriod] = useState<'day' | 'month'>('month');

  const [attendanceData, setAttendanceData] = useState<AttendancePoint[]>([]);
  const [attendanceSummary, setAttendanceSummary] =
    useState<AttendanceSummary | null>(null);
  const [financialData, setFinancialData] = useState<FinancialPoint[]>([]);
  const [financialSummary, setFinancialSummary] =
    useState<FinancialSummary | null>(null);

  const [loadingAttendance, setLoadingAttendance] = useState(true);
  const [loadingFinancial, setLoadingFinancial] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const historyDefaults = useMemo(() => getDefaultHistoryRange(), []);
  const [histFilterFrom, setHistFilterFrom] = useState(historyDefaults.from);
  const [histFilterTo, setHistFilterTo] = useState(historyDefaults.to);
  const [histFilterStatus, setHistFilterStatus] = useState('');
  const [histFilterTable, setHistFilterTable] = useState('');
  const [histAppliedFrom, setHistAppliedFrom] = useState(historyDefaults.from);
  const [histAppliedTo, setHistAppliedTo] = useState(historyDefaults.to);
  const [histAppliedStatus, setHistAppliedStatus] = useState('');
  const [histAppliedTable, setHistAppliedTable] = useState('');
  const [historyPage, setHistoryPage] = useState(1);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);
  const [historyRows, setHistoryRows] = useState<AttendanceHistoryRow[]>([]);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [tableOptions, setTableOptions] = useState<TableOption[]>([]);

  const totalHistoryPages = Math.max(
    1,
    Math.ceil(historyTotal / HISTORY_PAGE_SIZE)
  );

  const fetchAttendanceHistory = useCallback(async () => {
    if (!userPermission.canViewAttendance) return;
    setHistoryLoading(true);
    setHistoryError(null);
    const params = new URLSearchParams();
    params.set('from', histAppliedFrom);
    params.set('to', histAppliedTo);
    if (histAppliedStatus) params.set('status', histAppliedStatus);
    if (histAppliedTable) params.set('tableUuid', histAppliedTable);
    params.set('page', String(historyPage));
    params.set('limit', String(HISTORY_PAGE_SIZE));
    try {
      const r = await fetch(
        `${API_URL}/dashboard/attendance/history?${params}`,
        { headers: getAuthHeaders() }
      );
      if (!r.ok) throw new Error(t('dashboard.errHistory'));
      const data = await r.json();
      setHistoryRows(data.items ?? []);
      setHistoryTotal(data.total ?? 0);
    } catch (e) {
      setHistoryError((e as Error).message);
      setHistoryRows([]);
      setHistoryTotal(0);
    } finally {
      setHistoryLoading(false);
    }
  }, [
    histAppliedFrom,
    histAppliedTo,
    histAppliedStatus,
    histAppliedTable,
    historyPage,
    historyRefreshKey,
    t,
  ]);

  useEffect(() => {
    if (!userPermission.canViewAttendance || activeTab !== 'attendance') return;
    void fetchAttendanceHistory();
  }, [activeTab, fetchAttendanceHistory]);

  useEffect(() => {
    if (!userPermission.canViewAttendance || activeTab !== 'attendance') return;
    fetch(`${API_URL}/dashboard/attendance/table-options`, {
      headers: getAuthHeaders(),
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: TableOption[]) =>
        setTableOptions(Array.isArray(data) ? data : [])
      )
      .catch(() => setTableOptions([]));
  }, [activeTab]);

  function applyHistoryFilters() {
    setHistAppliedFrom(histFilterFrom);
    setHistAppliedTo(histFilterTo);
    setHistAppliedStatus(histFilterStatus);
    setHistAppliedTable(histFilterTable);
    setHistoryPage(1);
    setHistoryRefreshKey((k) => k + 1);
  }

  const dateTimeFmt = useMemo(
    () =>
      new Intl.DateTimeFormat(localeTag, {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    [localeTag]
  );

  function statusLabel(status: string) {
    const key = `orders.status.${status}`;
    const label = t(key);
    return label === key ? status : label;
  }

  useEffect(() => {
    if (!userPermission.canViewAttendance) return;
    setLoadingAttendance(true);
    setError(null);
    Promise.all([
      fetch(
        `${API_URL}/dashboard/attendance?period=${period}`,
        { headers: getAuthHeaders() }
      ).then((r) => (r.ok ? r.json() : Promise.reject(new Error(t('dashboard.errAttendance'))))),
      fetch(
        `${API_URL}/dashboard/attendance/summary`,
        { headers: getAuthHeaders() }
      ).then((r) => (r.ok ? r.json() : Promise.reject(new Error(t('dashboard.errSummary'))))),
    ])
      .then(([stats, summary]) => {
        setAttendanceData(stats);
        setAttendanceSummary(summary);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoadingAttendance(false));
  }, [period, activeTab === 'attendance']);

  useEffect(() => {
    if (!userPermission.canViewFinancial) return;
    setLoadingFinancial(true);
    setError(null);
    Promise.all([
      fetch(
        `${API_URL}/dashboard/financial?period=${period}`,
        { headers: getAuthHeaders() }
      ).then((r) => (r.ok ? r.json() : Promise.reject(new Error(t('dashboard.errFinancial'))))),
      fetch(
        `${API_URL}/dashboard/financial/summary`,
        { headers: getAuthHeaders() }
      ).then((r) => (r.ok ? r.json() : Promise.reject(new Error(t('dashboard.errSummary'))))),
    ])
      .then(([stats, summary]) => {
        setFinancialData(stats);
        setFinancialSummary(summary);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoadingFinancial(false));
  }, [period, activeTab === 'financial']);

  const loading =
    (activeTab === 'attendance' && loadingAttendance) ||
    (activeTab === 'financial' && loadingFinancial);

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6 mt-15">
        <header>
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-800">
            {t('dashboard.title')}
          </h1>
          <p className="text-sm text-zinc-500">
            {t('dashboard.subtitle')}
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-2">
          {userPermission.canViewAttendance && (
            <button
              onClick={() => setActiveTab('attendance')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === 'attendance'
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {t('dashboard.tabAttendance')}
            </button>
          )}
          {userPermission.canViewFinancial && (
            <button
              onClick={() => setActiveTab('financial')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === 'financial'
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {t('dashboard.tabFinancial')}
            </button>
          )}
          <div className="ml-auto flex gap-1">
            <button
              onClick={() => setPeriod('day')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                period === 'day'
                  ? 'bg-zinc-800 text-white'
                  : 'bg-white text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {t('dashboard.period7')}
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                period === 'month'
                  ? 'bg-zinc-800 text-white'
                  : 'bg-white text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {t('dashboard.period6m')}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* =======================
           ATENDIMENTO
        ======================= */}
        {activeTab === 'attendance' && userPermission.canViewAttendance && (
          <section className="space-y-6">
            {attendanceSummary && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl bg-white p-4 shadow-sm border border-zinc-200">
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    {t('dashboard.totalOrders')}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-zinc-800">
                    {attendanceSummary.totalOrders}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {attendanceSummary.lastPeriodLabel}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm border border-zinc-200">
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    {t('dashboard.delivered')}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-zinc-800">
                    {attendanceSummary.deliveredOrders}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm border border-zinc-200">
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    {t('dashboard.pending')}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-zinc-600">
                    {attendanceSummary.pendingOrders}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white p-4 shadow-sm border border-zinc-200">
                <h2 className="mb-4 text-lg font-medium text-zinc-800">
                  {t('dashboard.ordersByPeriod')}
                </h2>
                {loading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <LoadingSpinner message={t('common.loading')} />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" name={t('dashboard.chartTotal')} fill="#6366f1" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="delivered" name={t('dashboard.chartDelivered')} fill="#22c55e" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pending" name={t('dashboard.chartPending')} fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm border border-zinc-200">
                <h2 className="mb-4 text-lg font-medium text-zinc-800">
                  {t('dashboard.attendanceTrend')}
                </h2>
                {loading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <LoadingSpinner message={t('common.loading')} />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={attendanceData}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="total"
                        name={t('dashboard.chartTotal')}
                        stroke="#6366f1"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                      />
                      <Area
                        type="monotone"
                        dataKey="delivered"
                        name={t('dashboard.chartDelivered')}
                        stroke="#22c55e"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorDelivered)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 md:p-6 shadow-sm border border-zinc-200 space-y-4">
              <div>
                <h2 className="text-lg font-medium text-zinc-800">
                  {t('dashboard.attendanceHistory')}
                </h2>
                <p className="text-sm text-zinc-500 mt-1">
                  {t('dashboard.historyHint')}
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
                <label className="flex flex-col gap-1 text-sm min-w-[140px]">
                  <span className="text-zinc-600">{t('dashboard.filterFrom')}</span>
                  <input
                    type="date"
                    value={histFilterFrom}
                    onChange={(e) => setHistFilterFrom(e.target.value)}
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-zinc-800 bg-white"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm min-w-[140px]">
                  <span className="text-zinc-600">{t('dashboard.filterTo')}</span>
                  <input
                    type="date"
                    value={histFilterTo}
                    onChange={(e) => setHistFilterTo(e.target.value)}
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-zinc-800 bg-white"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm min-w-[160px]">
                  <span className="text-zinc-600">{t('dashboard.filterStatus')}</span>
                  <select
                    value={histFilterStatus}
                    onChange={(e) => setHistFilterStatus(e.target.value)}
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-zinc-800 bg-white"
                  >
                    <option value="">{t('dashboard.allStatuses')}</option>
                    {HISTORY_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {statusLabel(s)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm min-w-[160px]">
                  <span className="text-zinc-600">{t('dashboard.filterTable')}</span>
                  <select
                    value={histFilterTable}
                    onChange={(e) => setHistFilterTable(e.target.value)}
                    className="rounded-lg border border-zinc-200 px-3 py-2 text-zinc-800 bg-white"
                  >
                    <option value="">{t('dashboard.allTables')}</option>
                    {tableOptions.map((tb) => (
                      <option key={tb.uuid} value={tb.uuid}>
                        {t('orders.tablePrefix')} {tb.number}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={applyHistoryFilters}
                  className="rounded-lg bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800 transition lg:mb-0.5"
                >
                  {t('dashboard.applyFilters')}
                </button>
              </div>

              {historyError && (
                <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {historyError}
                </div>
              )}

              <div className="overflow-x-auto rounded-xl border border-zinc-200">
                {historyLoading ? (
                  <div className="py-16 flex justify-center">
                    <LoadingSpinner message={t('common.loading')} />
                  </div>
                ) : historyRows.length === 0 ? (
                  <p className="py-12 text-center text-sm text-zinc-500 px-4">
                    {t('dashboard.historyEmpty')}
                  </p>
                ) : (
                  <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-50 text-zinc-600 border-b border-zinc-200">
                      <tr>
                        <th className="px-4 py-3 font-medium">
                          {t('dashboard.colDateTime')}
                        </th>
                        <th className="px-4 py-3 font-medium">
                          {t('dashboard.colTable')}
                        </th>
                        <th className="px-4 py-3 font-medium">
                          {t('dashboard.colStatus')}
                        </th>
                        <th className="px-4 py-3 font-medium text-right">
                          {t('dashboard.colItems')}
                        </th>
                        <th className="px-4 py-3 font-medium text-right">
                          {t('dashboard.colTotal')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {historyRows.map((row) => (
                        <tr key={row.uuid} className="hover:bg-zinc-50/80">
                          <td className="px-4 py-3 text-zinc-800 whitespace-nowrap">
                            {dateTimeFmt.format(new Date(row.createdAt))}
                          </td>
                          <td className="px-4 py-3 text-zinc-800">
                            {t('orders.tablePrefix')} {row.tableNumber}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                row.status === 'DELIVERED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : row.status === 'READY'
                                    ? 'bg-sky-100 text-sky-800'
                                    : row.status === 'PREPARING'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-zinc-100 text-zinc-700'
                              }`}
                            >
                              {statusLabel(row.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-zinc-700">
                            {row.itemsCount}
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-zinc-800">
                            {formatCurrency(row.totalValue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {!historyLoading && historyRows.length > 0 && (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-zinc-600">
                  <p>
                    {t('dashboard.pageInfo', {
                      page: historyPage,
                      totalPages: totalHistoryPages,
                      total: historyTotal,
                    })}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={historyPage <= 1}
                      onClick={() => setHistoryPage((p) => Math.max(1, p - 1))}
                      className="rounded-lg border border-zinc-200 px-3 py-1.5 font-medium text-zinc-700 disabled:opacity-40 disabled:pointer-events-none hover:bg-zinc-50"
                    >
                      {t('dashboard.pagePrev')}
                    </button>
                    <button
                      type="button"
                      disabled={historyPage >= totalHistoryPages}
                      onClick={() =>
                        setHistoryPage((p) =>
                          Math.min(totalHistoryPages, p + 1)
                        )
                      }
                      className="rounded-lg border border-zinc-200 px-3 py-1.5 font-medium text-zinc-700 disabled:opacity-40 disabled:pointer-events-none hover:bg-zinc-50"
                    >
                      {t('dashboard.pageNext')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* =======================
           FINANCEIRO
        ======================= */}
        {activeTab === 'financial' && userPermission.canViewFinancial && (
          <section className="space-y-6">
            {financialSummary && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-white p-4 shadow-sm border border-zinc-200">
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    {t('dashboard.totalRevenue')}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-zinc-800">
                    {formatCurrency(financialSummary.totalRevenue)}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {financialSummary.lastPeriodLabel}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm border border-zinc-200">
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    {t('dashboard.deliveredOrders')}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-zinc-800">
                    {financialSummary.orderCount}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm border border-zinc-200">
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    {t('dashboard.avgTicket')}
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-zinc-800">
                    {financialSummary.orderCount
                      ? formatCurrency(
                          financialSummary.totalRevenue / financialSummary.orderCount
                        )
                      : formatCurrency(0)}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-white p-4 shadow-sm border border-zinc-200">
                <h2 className="mb-4 text-lg font-medium text-zinc-800">
                  {t('dashboard.revenueByPeriod')}
                </h2>
                {loading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <LoadingSpinner message={t('common.loading')} />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="label" />
                      <YAxis tickFormatter={(v) => `R$ ${v}`} />
                      <Tooltip
                        formatter={(value: number | undefined) =>
                          value != null ? [formatCurrency(value), t('dashboard.revenue')] : []
                        }
                        labelFormatter={(label) => `${t('dashboard.period')}: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        name={t('dashboard.revenue')}
                        stroke="#0ea5e9"
                        strokeWidth={2}
                        dot={{ fill: '#0ea5e9', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm border border-zinc-200">
                <h2 className="mb-4 text-lg font-medium text-zinc-800">
                  {t('dashboard.ordersDeliveredByPeriod')}
                </h2>
                {loading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <LoadingSpinner message={t('common.loading')} />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={financialData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="orderCount"
                        name={t('dashboard.ordersLabel')}
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </section>
        )}

        {!userPermission.canViewAttendance &&
          !userPermission.canViewFinancial && (
            <div className="rounded-xl bg-zinc-100 p-4 text-zinc-700">
              {t('dashboard.noPermission')}
            </div>
          )}
      </div>
    </div>
  );
}
