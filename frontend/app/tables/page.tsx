'use client';

import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import * as QRCodeLib from 'qrcode'; // Instale com: npm install qrcode

interface Comanda {
    id: number;
    description: string;
}

interface Mesa {
    id: number;
    numero: number;
    descricao: string;
    comandas: Comanda[];
    qrCode: string;
}

const TableManager: React.FC = () => {
    
    const [mesas, setMesas] = useState<Mesa[]>([]);
    const [numero, setNumero] = useState<number>(0);
    const [descricao, setDescricao] = useState<string>('');
    const [comandaDescription, setComandaDescription] = useState<string>('');

    const addMesa = () => {
        const newMesa: Mesa = {
            id: Date.now(),
            numero,
            descricao,
            comandas: [],
            qrCode: `mesa-${numero}`,
        };
        setMesas([...mesas, newMesa]);
        setNumero(0);
        setDescricao('');
    };

    const addComandaToMesa = (mesaId: number) => {
        if (!comandaDescription) return;
        setMesas((prevMesas) =>
            prevMesas.map((mesa) =>
                mesa.id === mesaId
                    ? {
                        ...mesa,
                        comandas: [
                            ...mesa.comandas,
                            { id: Date.now(), description: comandaDescription },
                        ],
                    }
                    : mesa
            )
        );
        setComandaDescription('');
    };

    const printQRCode = async (value: string, numero: number) => {
        try {
            const svg = await QRCodeLib.toString(value, {
                type: 'svg',
                width: 256, // Tamanho maior para impressão
                margin: 1,
            });

            const printWindow = window.open('', '', 'height=400,width=400');
            if (printWindow) {
                printWindow.document.write(`<html><head><title>QR Code Mesa ${numero}</title></head><body>`);
                printWindow.document.write(svg);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
            }
        } catch (err) {
            console.error('Erro ao gerar QR Code para impressão:', err);
        }
    };

    return (
        <div className="p-4 mx-auto min-h-screen min-w-screen bg-gray-200 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Gerenciador de mesas</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-black">
                <h2 className="text-xl font-semibold mb-4">Adicionar Mesa</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="number"
                        placeholder="Número da Mesa"
                        value={numero}
                        onChange={(e) => setNumero(Number(e.target.value))}
                        className="border rounded-lg p-2 flex-1"
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="border rounded-lg p-2 flex-1"
                    />
                    <button
                        onClick={addMesa}
                        className="bg-white text-black border border-black hover:bg-black hover:text-white hover:border-green rounded-lg px-4 py-2"
                    >
                        Adicionar Mesa
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                {mesas.map((mesa) => (
                    <div key={mesa.id} className="bg-gray-100 shadow-md rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Mesa {mesa.numero}</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => printQRCode(mesa.qrCode, mesa.numero)}
                                    className='bg-white text-black border border-black rounded-lg px-2 py-2'
                                >
                                    <QRCode value={mesa.qrCode} size={64} />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">{mesa.descricao}</p>
                        <div>
                            <h4 className="font-semibold mb-2">Comandas:</h4>
                            <ul className="list-disc list-inside mb-4">
                                {mesa.comandas.map((comanda) => (
                                    <li key={comanda.id}>{comanda.description}</li>
                                ))}
                            </ul>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Descrição da Comanda"
                                    value={comandaDescription}
                                    onChange={(e) => setComandaDescription(e.target.value)}
                                    className="border rounded-lg p-2 flex-1"
                                />
                                <button
                                    onClick={() => addComandaToMesa(mesa.id)}
                                    className="bg-white text-black border border-black hover:bg-black hover:text-white hover:border-green rounded-lg px-4 py-2"
                                >
                                    Adicionar Comanda
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableManager;