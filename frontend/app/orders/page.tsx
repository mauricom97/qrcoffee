'use client';

import { FaTable, FaClipboardList, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa'; // Instale react-icons se necessário: npm install react-icons

const orders = [
    {
        id: 1,
        mesa: 5,
        comanda: 'A1',
        status: 'Preparando',
        items: [
            { name: 'Café Expresso', quantity: 2 },
            { name: 'Croissant', quantity: 1 },
        ],
    },
    {
        id: 2,
        mesa: 12,
        comanda: 'B3',
        status: 'Pronto',
        items: [
            { name: 'Cappuccino', quantity: 1 },
            { name: 'Pão de Queijo', quantity: 3 },
        ],
    },
    // Adicione mais pedidos aqui se necessário
];

export default function OrdersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">Pedidos do Estabelecimento</h1>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Pedido #{order.id}</h2>
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                                    order.status === 'Pronto'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}
                            >
                                {order.status === 'Pronto' ? <FaCheckCircle /> : <FaHourglassHalf />}
                                {order.status}
                            </span>
                        </div>
                        <div className="mb-4 space-y-2">
                            <div className="flex items-center gap-2 text-gray-700">
                                <FaTable className="text-lg" />
                                <span className="font-medium">Mesa: {order.mesa}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <FaClipboardList className="text-lg" />
                                <span className="font-medium">Comanda: {order.comanda}</span>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {order.items.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center text-gray-700 border-b pb-3 last:border-b-0 last:pb-0"
                                >
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">x{item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}