'use client';

import { useState, useEffect } from 'react';
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
