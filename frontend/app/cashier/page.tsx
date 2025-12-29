'use client';

import { useState } from 'react';

const CashierManagementPage = () => {
    const [cashierStatus, setCashierStatus] = useState<'open' | 'closed'>('closed');
    const [cashAmount, setCashAmount] = useState<number>(0);

    const handleOpenCashier = () => {
        setCashierStatus('open');
        setCashAmount(0);
    };

    const handleCloseCashier = () => {
        setCashierStatus('closed');
    };

    const handleAddCash = (amount: number) => {
        setCashAmount((prev) => prev + amount);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Caixa do Estabelecimento
                        </h1>
                        <p className="text-sm text-gray-500">
                            Controle diário de abertura e fechamento
                        </p>
                    </div>

                    <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold w-fit
              ${cashierStatus === 'open'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {cashierStatus === 'open' ? 'Caixa Aberto' : 'Caixa Fechado'}
                    </span>
                </header>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Montante */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <p className="text-sm text-gray-500">Saldo em Caixa</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">
                            R$ {cashAmount.toFixed(2)}
                        </p>
                    </div>

                    {/* Operação */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <p className="text-sm text-gray-500">Operações</p>

                        {cashierStatus === 'closed' ? (
                            <button
                                onClick={handleOpenCashier}
                                className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-lg font-semibold"
                            >
                                Abrir Caixa
                            </button>
                        ) : (
                            <div className="space-y-3">
                                <button
                                    onClick={handleCloseCashier}
                                    className="w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-lg font-semibold"
                                >
                                    Fechar Caixa
                                </button>

                                <div className="grid grid-cols-2 gap-3">
                                    {[0.05, 0.10, 0.25, 0.50, 1, 2, 5, 10, 20, 50, 100, 200].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleAddCash(value)}
                                            className="bg-black hover:bg-white transition text-white hover:text-black hover:border hover:border-black py-2 rounded-lg font-semibold"
                                        >
                                            R$ {value.toFixed(2)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Extra: Informações úteis */}
                <div className="bg-white rounded-xl shadow p-6">
                    <p className="text-sm text-gray-500 mb-2">Informações</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Ideal para controle diário do caixa</li>
                        <li>• Use valores rápidos para sangrias e reforços</li>
                        <li>• Pronto para integrar com vendas e relatórios</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CashierManagementPage;
