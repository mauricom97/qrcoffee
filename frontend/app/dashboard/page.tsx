'use client';

import { useState } from 'react';
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
} from 'recharts';

/* =======================
   MOCK DE PERMISSÕES
======================= */
const userPermission = {
  canViewAttendance: true,
  canViewFinancial: true, // altere para testar
};

/* =======================
   DADOS
======================= */
const attendanceData = [
  { month: 'Jan', attendances: 300, avgTime: 15 },
  { month: 'Feb', attendances: 320, avgTime: 14 },
  { month: 'Mar', attendances: 290, avgTime: 16 },
  { month: 'Apr', attendances: 340, avgTime: 13 },
  { month: 'May', attendances: 310, avgTime: 15 },
  { month: 'Jun', attendances: 360, avgTime: 12 },
];

const financialData = [
  { month: 'Jan', revenue: 12000, expenses: 8000 },
  { month: 'Feb', revenue: 13500, expenses: 8500 },
  { month: 'Mar', revenue: 11000, expenses: 7800 },
  { month: 'Apr', revenue: 15000, expenses: 9000 },
  { month: 'May', revenue: 14500, expenses: 8800 },
  { month: 'Jun', revenue: 16000, expenses: 9500 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'attendance' | 'financial'>(
    userPermission.canViewAttendance ? 'attendance' : 'financial'
  );

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6 mt-15">
        {/* Header */}
        <header>
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-800">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-500">
            Acompanhamento de métricas do sistema
          </p>
        </header>

        {/* Tabs */}
        <div className="flex gap-2">
          {userPermission.canViewAttendance && (
            <button
              onClick={() => setActiveTab('attendance')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === 'attendance'
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Atendimento
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
              Financeiro
            </button>
          )}
        </div>

        {/* =======================
           ATENDIMENTO
        ======================= */}
        {activeTab === 'attendance' && userPermission.canViewAttendance && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Atendimentos */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-medium text-zinc-800">
                Atendimentos Mensais
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <Line
                    type="monotone"
                    dataKey="attendances"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                  <CartesianGrid stroke="#e5e7eb" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Tempo médio */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-medium text-zinc-800">
                Tempo Médio de Atendimento
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <Bar dataKey="avgTime" fill="#22c55e" />
                  <CartesianGrid stroke="#e5e7eb" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {/* =======================
           FINANCEIRO
        ======================= */}
        {activeTab === 'financial' && userPermission.canViewFinancial && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Receita */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-medium text-zinc-800">
                Receita Mensal
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={financialData}>
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                  />
                  <CartesianGrid stroke="#e5e7eb" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Despesas */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-lg font-medium text-zinc-800">
                Despesas Mensais
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialData}>
                  <Bar dataKey="expenses" fill="#ef4444" />
                  <CartesianGrid stroke="#e5e7eb" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {/* Sem permissão */}
        {!userPermission.canViewAttendance &&
          !userPermission.canViewFinancial && (
            <div className="rounded-xl bg-yellow-50 p-4 text-yellow-700">
              Você não possui permissão para visualizar métricas.
            </div>
          )}
      </div>
    </div>
  );
}
