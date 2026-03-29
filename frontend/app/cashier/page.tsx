'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAuthHeaders } from 'contexts/AuthContext';
import LoadingSpinner from 'components/LoadingSpinner';
import { useLocaleContext } from 'i18n/LocaleContext';

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3352';

type CashierSession = {
  uuid: string;
  openedAt: string;
  openingBalance: number;
  status: string;
  currentBalance: number;
  movements: { uuid: string; type: string; amount: number; createdAt: string }[];
};

type CashierStatus = {
  hasOpenSession: boolean;
  dailySales: number;
  session?: CashierSession;
};

type CloseResult = {
  success: boolean;
  dailySales: number;
  expectedTotal: number;
  difference: number;
};

const RAPID_VALUES = [0.05, 0.10, 0.25, 0.50, 1, 2, 5, 10, 20, 50, 100, 200];

export default function CashierPage() {
  const { t, localeTag } = useLocaleContext();

  const formatCurrency = useCallback(
    (value: number) =>
      new Intl.NumberFormat(localeTag, {
        style: 'currency',
        currency: 'BRL',
      }).format(value),
    [localeTag]
  );

  const formatDateTime = useCallback(
    (iso: string) =>
      new Date(iso).toLocaleString(localeTag, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    [localeTag]
  );
  const [status, setStatus] = useState<CashierStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showMovementModal, setShowMovementModal] = useState<'REINFORCEMENT' | 'SANGRIA' | null>(null);
  const [openBalance, setOpenBalance] = useState<string>('0');
  const [closeBalance, setCloseBalance] = useState<string>('');
  const [movementAmount, setMovementAmount] = useState<string>('');
  const [movementDescription, setMovementDescription] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState<
    { uuid: string; openedAt: string; closedAt: string | null; openingBalance: number; closingBalance: number | null; status: string }[]
  >([]);
  const [closeResult, setCloseResult] = useState<CloseResult | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/cashier/status`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error(t('cashier.errLoad'));
      const data = await res.json();
      setStatus(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : t('cashier.errUnknown'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/cashier/history?limit=5`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    fetchHistory();
  }, [fetchStatus, fetchHistory]);

  const handleOpen = async () => {
    const val = parseFloat(openBalance.replace(',', '.')) || 0;
    if (val < 0) {
      setError(t('cashier.openValueInvalid'));
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/cashier/open`, {
        method: 'POST',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ openingBalance: val }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || t('cashier.openError'));
      }
      await fetchStatus();
      setShowOpenModal(false);
      setOpenBalance('0');
    } catch (e) {
      setError(e instanceof Error ? e.message : t('cashier.openError'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddQuick = async (amount: number, type: 'REINFORCEMENT' | 'SANGRIA') => {
    const session = status?.session;
    if (!session && type === 'SANGRIA') return;
    if (session && type === 'SANGRIA' && amount > session.currentBalance) {
      setError(
        t('cashier.insufficient', {
          balance: formatCurrency(session.currentBalance),
        })
      );
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/cashier/movement`, {
        method: 'POST',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, amount }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || t('cashier.opError'));
      }
      await fetchStatus();
    } catch (e) {
      setError(e instanceof Error ? e.message : t('cashier.opError'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddMovement = async () => {
    const val = parseFloat(movementAmount.replace(',', '.')) || 0;
    const type = showMovementModal;
    if (!type || val <= 0) {
      setError(t('cashier.valueInvalid'));
      return;
    }
    const session = status?.session;
    if (session && type === 'SANGRIA' && val > session.currentBalance) {
      setError(
        t('cashier.insufficient', {
          balance: formatCurrency(session.currentBalance),
        })
      );
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/cashier/movement`, {
        method: 'POST',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          amount: val,
          description: movementDescription.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || t('cashier.opError'));
      }
      await fetchStatus();
      setShowMovementModal(null);
      setMovementAmount('');
      setMovementDescription('');
    } catch (e) {
      setError(e instanceof Error ? e.message : t('cashier.opError'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = async () => {
    const val = parseFloat(closeBalance.replace(',', '.')) ?? 0;
    if (val < 0) {
      setError(t('cashier.closeValueInvalid'));
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/cashier/close`, {
        method: 'POST',
        headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ closingBalance: val }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || t('cashier.closeError'));
      }
      const data: CloseResult = await res.json();
      setCloseResult(data);
      await fetchStatus();
      await fetchHistory();
      setCloseBalance('');
    } catch (e) {
      setError(e instanceof Error ? e.message : t('cashier.closeError'));
    } finally {
      setSubmitting(false);
    }
  };

  const dismissCloseResult = () => {
    setCloseResult(null);
    setShowCloseModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 p-4 md:p-8 flex items-center justify-center">
        <LoadingSpinner message={t('cashier.loading')} />
      </div>
    );
  }

  const hasOpenSession = status?.hasOpenSession ?? false;
  const session = status?.session;
  const currentBalance = session?.currentBalance ?? 0;
  const dailySales = status?.dailySales ?? 0;
  const expectedOnClose = session
    ? session.openingBalance +
      session.movements
        .reduce(
          (s, m) => s + (m.type === 'REINFORCEMENT' ? m.amount : -m.amount),
          0
        )
    : 0;

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-stone-800">
              {t('cashier.pageTitle')}
            </h1>
            <p className="text-sm text-stone-500">
              {t('cashier.pageSubtitle')}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold w-fit
              ${hasOpenSession ? 'bg-zinc-200 text-zinc-800' : 'bg-zinc-100 text-zinc-600'}`}
          >
            {hasOpenSession ? t('cashier.open') : t('cashier.closed')}
          </span>
        </header>

        {error && (
          <div className="bg-zinc-100 border border-zinc-200 text-zinc-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Cards principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Saldo em Caixa */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
            <p className="text-sm text-stone-500">{t('cashier.balance')}</p>
            <p className="text-3xl font-bold text-stone-800 mt-2">
              {formatCurrency(currentBalance)}
            </p>
            {session && (
              <p className="text-xs text-stone-400 mt-1">
                {t('cashier.openingLine', {
                  openedAt: formatDateTime(session.openedAt),
                  amount: formatCurrency(session.openingBalance),
                })}
              </p>
            )}
          </div>

          {/* Vendas do dia */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
            <p className="text-sm text-stone-500">{t('cashier.dailySales')}</p>
            <p className="text-3xl font-bold text-stone-800 mt-2">
              {formatCurrency(dailySales)}
            </p>
            <p className="text-xs text-stone-400 mt-1">
              {t('cashier.deliveredHint')}
            </p>
          </div>
        </div>

        {/* Operações */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6 space-y-4">
          <p className="text-sm text-stone-500 font-medium">
            {t('cashier.operations')}
          </p>

          {!hasOpenSession ? (
            <div className="space-y-3">
              <button
                onClick={() => setShowOpenModal(true)}
                className="w-full bg-zinc-900 hover:bg-zinc-800 transition text-white py-3 rounded-lg font-semibold"
              >
                {t('cashier.openRegister')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCloseModal(true)}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 transition text-white py-3 rounded-lg font-semibold"
                >
                  {t('cashier.closeRegister')}
                </button>
                <button
                  onClick={() => setShowMovementModal('REINFORCEMENT')}
                  className="flex-1 bg-stone-800 hover:bg-stone-700 transition text-white py-3 rounded-lg font-semibold"
                >
                  {t('cashier.reinforcement')}
                </button>
                <button
                  onClick={() => setShowMovementModal('SANGRIA')}
                  className="flex-1 bg-zinc-600 hover:bg-zinc-500 transition text-white py-3 rounded-lg font-semibold"
                >
                  {t('cashier.withdrawal')}
                </button>
              </div>

              {/* Valores rápidos */}
              <div>
                <p className="text-xs text-stone-400 mb-2">
                  {t('cashier.quickAdd')}
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-3">
                  {RAPID_VALUES.map((value) => (
                    <button
                      key={`add-${value}`}
                      onClick={() => handleAddQuick(value, 'REINFORCEMENT')}
                      disabled={submitting}
                      className="bg-stone-100 hover:bg-stone-200 py-2 rounded-lg text-sm font-medium text-stone-700 disabled:opacity-50"
                    >
                      +{formatCurrency(value)}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-stone-400 mb-2">
                  {t('cashier.quickWithdraw')}
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {RAPID_VALUES.map((value) => (
                    <button
                      key={`sub-${value}`}
                      onClick={() => handleAddQuick(value, 'SANGRIA')}
                      disabled={submitting || value > currentBalance}
                      className="bg-zinc-100 hover:bg-zinc-200 py-2 rounded-lg text-sm font-medium text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −{formatCurrency(value)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Movimentações recentes */}
        {session && session.movements.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
            <p className="text-sm text-stone-500 font-medium mb-3">
              {t('cashier.recentMovements')}
            </p>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {session.movements.map((m) => (
                <li
                  key={m.uuid}
                  className="flex justify-between items-center py-2 border-b border-stone-100 last:border-0"
                >
                  <span className="text-sm text-stone-600">
                    {t('cashier.movementType', {
                      type:
                        m.type === 'REINFORCEMENT'
                          ? t('cashier.reinforcement')
                          : t('cashier.withdrawal'),
                      date: formatDateTime(m.createdAt),
                    })}
                  </span>
                  <span
                    className={
                      m.type === 'REINFORCEMENT'
                        ? 'text-zinc-800 font-semibold'
                        : 'text-zinc-600 font-semibold'
                    }
                  >
                    {m.type === 'REINFORCEMENT' ? '+' : '−'}
                    {formatCurrency(m.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Histórico de sessões */}
        {history.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
            <p className="text-sm text-stone-500 font-medium mb-3">
              {t('cashier.lastSessions')}
            </p>
            <ul className="space-y-2">
              {history.map((h) => (
                <li
                  key={h.uuid}
                  className="flex justify-between items-center py-2 border-b border-stone-100 last:border-0 text-sm"
                >
                  <span className="text-stone-600">
                    {formatDateTime(h.openedAt)}
                    {h.closedAt && ` → ${formatDateTime(h.closedAt)}`}
                  </span>
                  <span className="text-stone-800 font-medium">
                    {formatCurrency(h.openingBalance)}
                    {h.closingBalance != null &&
                      ` → ${formatCurrency(h.closingBalance)}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modal Abrir Caixa */}
      {showOpenModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">
              {t('cashier.openModalTitle')}
            </h3>
            <p className="text-sm text-stone-500 mb-3">
              {t('cashier.openModalHint')}
            </p>
            <input
              type="text"
              inputMode="decimal"
              value={openBalance}
              onChange={(e) => setOpenBalance(e.target.value)}
              placeholder={t('cashier.amountPlaceholder')}
              className="w-full border border-stone-300 rounded-lg px-4 py-3 text-lg"
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowOpenModal(false)}
                className="flex-1 py-2 border border-stone-300 rounded-lg font-medium text-stone-700"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleOpen}
                disabled={submitting}
                className="flex-1 py-2 bg-zinc-900 text-white rounded-lg font-semibold disabled:opacity-50"
              >
                {submitting ? t('cashier.opening') : t('cashier.openAction')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Fechar Caixa */}
      {showCloseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            {!closeResult ? (
              <>
                <h3 className="text-lg font-semibold text-stone-800 mb-4">
                  {t('cashier.closeModalTitle')}
                </h3>
                <p className="text-sm text-stone-500 mb-2">
                  {t('cashier.expectedLine')}
                </p>
                <p className="text-xl font-bold text-stone-800 mb-4">
                  {formatCurrency(expectedOnClose)}
                </p>
                <p className="text-sm text-stone-500 mb-3">
                  {t('cashier.countedHint')}
                </p>
                <input
                  type="text"
                  inputMode="decimal"
                  value={closeBalance}
                  onChange={(e) => setCloseBalance(e.target.value)}
                  placeholder={t('cashier.amountPlaceholder')}
                  className="w-full border border-stone-300 rounded-lg px-4 py-3 text-lg"
                />
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowCloseModal(false)}
                    className="flex-1 py-2 border border-stone-300 rounded-lg font-medium text-stone-700"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    onClick={handleClose}
                    disabled={submitting}
                    className="flex-1 py-2 bg-zinc-700 text-white rounded-lg font-semibold disabled:opacity-50"
                  >
                    {submitting ? t('cashier.closing') : t('cashier.closeAction')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-stone-800 mb-4">
                  {t('cashier.closedTitle')}
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-stone-500">
                      {t('cashier.dailySalesLabel')}
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(closeResult.dailySales)}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-stone-500">
                      {t('cashier.expectedLabel')}
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(closeResult.expectedTotal)}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-stone-500">
                      {t('cashier.differenceLabel')}
                    </span>
                    <span
                      className={
                        closeResult.difference === 0
                          ? 'text-zinc-800 font-semibold'
                          : closeResult.difference > 0
                            ? 'text-zinc-600 font-semibold'
                            : 'text-zinc-600 font-semibold'
                      }
                    >
                      {formatCurrency(closeResult.difference)}
                    </span>
                  </p>
                </div>
                <button
                  onClick={dismissCloseResult}
                  className="w-full mt-6 py-2 bg-stone-800 text-white rounded-lg font-semibold"
                >
                  {t('common.ok')}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal Reforço / Sangria */}
      {showMovementModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">
              {showMovementModal === 'REINFORCEMENT'
                ? t('cashier.reinforcement')
                : t('cashier.withdrawal')}
            </h3>
            <p className="text-sm text-stone-500 mb-3">
              {t('cashier.movementValue')}
            </p>
            <input
              type="text"
              inputMode="decimal"
              value={movementAmount}
              onChange={(e) => setMovementAmount(e.target.value)}
              placeholder={t('cashier.amountPlaceholder')}
              className="w-full border border-stone-300 rounded-lg px-4 py-3 text-lg mb-3"
            />
            <p className="text-sm text-stone-500 mb-2">
              {t('cashier.movementDesc')}
            </p>
            <input
              type="text"
              value={movementDescription}
              onChange={(e) => setMovementDescription(e.target.value)}
              placeholder={t('cashier.movementDescPh')}
              className="w-full border border-stone-300 rounded-lg px-4 py-2 text-sm mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowMovementModal(null);
                  setMovementAmount('');
                  setMovementDescription('');
                }}
                className="flex-1 py-2 border border-stone-300 rounded-lg font-medium text-stone-700"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleAddMovement}
                disabled={submitting}
                className={`flex-1 py-2 text-white rounded-lg font-semibold disabled:opacity-50 ${
                  showMovementModal === 'REINFORCEMENT'
                    ? 'bg-stone-800'
                    : 'bg-zinc-600'
                }`}
              >
                {submitting ? t('cashier.saving') : t('common.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
