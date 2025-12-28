'use client';

import { FaClipboardList } from 'react-icons/fa'; // Instale react-icons se necessário: npm install react-icons

const orders = [
    {
        id: 1,
        name: 'Comanda 1',
        items: [
            { name: 'Café Expresso', price: 5.00, quantity: 1 },
            { name: 'Pão de Queijo', price: 3.50, quantity: 2 },
            { name: 'Água', price: 2.00, quantity: 1 },
        ],
    },
    {
        id: 2,
        name: 'Comanda 2',
        items: [
            { name: 'Cappuccino', price: 7.00, quantity: 1 },
            { name: 'Croissant', price: 4.50, quantity: 1 },
        ],
    },
    {
        id: 3,
        name: 'Comanda 3',
        items: [
            { name: 'Latte', price: 6.50, quantity: 1 },
            { name: 'Bolo de Cenoura', price: 5.00, quantity: 1 },
            { name: 'Suco de Laranja', price: 4.00, quantity: 2 },
        ],
    },
];

export default function TabPage() {
    // Calcular total geral de todas as comandas
    const grandTotal = orders.reduce((total, order) => {
        const orderTotal = order.items.reduce((subtotal, item) => subtotal + (item.price * item.quantity), 0);
        return total + orderTotal;
    }, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 flex items-center justify-center gap-2">
                <FaClipboardList className="text-2xl md:text-3xl" />
                Lista de Comandas
            </h1>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => {
                    // Calcular total por comanda
                    const orderTotal = order.items.reduce((total, item) => total + (item.price * item.quantity), 0);

                    return (
                        <div
                            key={order.id}
                            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                        >
                            <h2 className="text-xl font-semibold mb-4 text-gray-900">{order.name}</h2>
                            <ul className="space-y-3 mb-4">
                                {order.items.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center text-gray-700 border-b pb-3 last:border-b-0 last:pb-0"
                                    >
                                        <span className="font-medium">
                                            {item.name} (x{item.quantity})
                                        </span>
                                        <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                                            R$ { (item.price * item.quantity).toFixed(2) }
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                <span className="font-semibold text-gray-800">Total da Comanda:</span>
                                <span className="text-lg font-bold text-green-600">R$ {orderTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-800">Total Geral de Todas as Comandas:</span>
                    <span className="text-2xl font-bold text-blue-600">R$ {grandTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}