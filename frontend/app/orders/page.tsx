'use client';

import { useState } from 'react';
import { FaTable, FaClipboardList, FaCheckCircle, FaHourglassHalf, FaPlus, FaEdit } from 'react-icons/fa'; // Adicione FaEdit para o botão de editar

const initialOrders = [
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
    const [orders, setOrders] = useState(initialOrders);
    const [showForm, setShowForm] = useState(false);
    const [editingOrder, setEditingOrder] = useState<{
        id: number;
        mesa: number;
        comanda: string;
        status: string;
        items: { name: string; quantity: number }[];
    } | null>(null);
    const [newMesa, setNewMesa] = useState('');
    const [newComanda, setNewComanda] = useState('');
    const [newStatus, setNewStatus] = useState('Preparando');
    const [newItems, setNewItems] = useState<{ name: string; quantity: number }[]>([]);
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState(1);

    const resetForm = () => {
        setNewMesa('');
        setNewComanda('');
        setNewStatus('Preparando');
        setNewItems([]);
        setItemName('');
        setItemQuantity(1);
        setEditingOrder(null);
        setShowForm(false);
    };

    interface OrderItem {
        name: string;
        quantity: number;
    }

    interface Order {
        id: number;
        mesa: number;
        comanda: string;
        status: string;
        items: OrderItem[];
    }

    const handleEdit = (order: Order): void => {
        setEditingOrder(order);
        setNewMesa(order.mesa.toString());
        setNewComanda(order.comanda);
        setNewStatus(order.status);
        setNewItems(order.items);
        setShowForm(true);
    };

    const addItem = () => {
        if (itemName.trim() && itemQuantity > 0) {
            setNewItems([...newItems, { name: itemName.trim(), quantity: itemQuantity }]);
            setItemName('');
            setItemQuantity(1);
        }
    };

    const removeItem = (index: number): void => {
        const updatedItems = newItems.filter((_, i) => i !== index);
        setNewItems(updatedItems);
    };

    const handleSaveOrder = () => {
        if (!newMesa || !newComanda || newItems.length === 0) {
            alert('Preencha todos os campos obrigatórios: Mesa, Comanda e pelo menos um item.');
            return;
        }

        const orderData = {
            id: editingOrder ? editingOrder.id : orders.length + 1,
            mesa: parseInt(newMesa),
            comanda: newComanda,
            status: newStatus,
            items: newItems,
        };

        if (editingOrder) {
            const updatedOrders = orders.map((order) =>
                order.id === editingOrder.id ? orderData : order
            );
            setOrders(updatedOrders);
        } else {
            setOrders([...orders, orderData]);
        }

        resetForm();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">Pedidos do Estabelecimento</h1>
            
            <div className="max-w-5xl mx-auto mb-8">
                <button
                    onClick={() => {
                        if (showForm && editingOrder) {
                            resetForm();
                        } else {
                            resetForm();
                            setShowForm(true);
                        }
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
                >
                    <FaPlus /> {showForm && !editingOrder ? 'Cancelar' : 'Adicionar Pedido'}
                </button>
                
                {showForm && (
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 mt-4">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            {editingOrder ? `Editar Pedido #${editingOrder.id}` : 'Novo Pedido'}
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Mesa</label>
                                <input
                                    type="number"
                                    value={newMesa}
                                    onChange={(e) => setNewMesa(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Número da mesa"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Comanda</label>
                                <input
                                    type="text"
                                    value={newComanda}
                                    onChange={(e) => setNewComanda(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Código da comanda"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Status</label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Preparando">Preparando</option>
                                    <option value="Pronto">Pronto</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Adicionar Item</label>
                                <div className="flex gap-4 mb-2">
                                    <input
                                        type="text"
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nome do produto"
                                    />
                                    <input
                                        type="number"
                                        value={itemQuantity}
                                        onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
                                        className="w-20 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="1"
                                    />
                                    <button
                                        onClick={addItem}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                                
                                {newItems.length > 0 && (
                                    <ul className="space-y-2 mt-2">
                                        {newItems.map((item, index) => (
                                            <li key={index} className="flex justify-between items-center text-gray-700">
                                                <span>{item.name} x{item.quantity}</span>
                                                <button
                                                    onClick={() => removeItem(index)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Remover
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            
                            <button
                                onClick={handleSaveOrder}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors"
                            >
                                {editingOrder ? 'Atualizar Pedido' : 'Salvar Pedido'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Pedido #{order.id}</h2>
                            <div className="flex items-center gap-4">
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
                                <button
                                    onClick={() => handleEdit(order)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FaEdit />
                                </button>
                            </div>
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