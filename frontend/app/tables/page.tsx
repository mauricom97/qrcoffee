"use client";

import React, { useState, useEffect, useCallback } from "react";
import QRCode from "react-qr-code";
import * as QRCodeLib from "qrcode";
import { Mesa } from "./interfaces/table.interface";
import { getAuthHeaders } from "contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

const TableManager: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);
  const numeroMesa = mesas.length + 1;
  const [descricao, setDescricao] = useState<string>(
    "Nenhuma descrição informada."
  );
  const [editingMesa, setEditingMesa] = useState<Mesa | null>(null);
  const [editNumber, setEditNumber] = useState<number>(1);
  const [editDescricao, setEditDescricao] = useState<string>("");

  const loadMesas = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/tables`, { headers: getAuthHeaders() });
      if (!response.ok) throw new Error("Erro ao buscar mesas do servidor.");
      const data: Mesa[] = await response.json();
      setMesas(data.map((m) => ({ ...m, comandas: m.comandas ?? [] })));
    } catch (error) {
      console.error("Erro ao buscar mesas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMesas();
  }, [loadMesas]);

  const addMesa = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_FRONTEND_URL || (typeof window !== "undefined" ? window.location.origin : "");
    try {
      const response = await fetch(`${API_URL}/tables`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          number: numeroMesa,
          description: descricao,
          baseUrl,
        }),
      });
      if (!response.ok) throw new Error("Erro ao criar mesa no servidor.");
      setDescricao("Nenhuma descrição informada.");
      await loadMesas();
    } catch (error) {
      console.error("Erro ao adicionar mesa:", error);
    }
  };

  const openEdit = (mesa: Mesa) => {
    setEditingMesa(mesa);
    setEditNumber(mesa.number);
    setEditDescricao(mesa.description ?? "");
  };

  const closeEdit = () => {
    setEditingMesa(null);
    setEditNumber(1);
    setEditDescricao("");
  };

  const updateMesa = async () => {
    if (!editingMesa) return;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_FRONTEND_URL || (typeof window !== "undefined" ? window.location.origin : "");
    const qrCode = `${baseUrl.replace(/\/$/, "")}/cardapio?mesa=${editingMesa.uuid}`;
    try {
      const response = await fetch(`${API_URL}/tables/${editingMesa.uuid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          number: editNumber,
          description: editDescricao,
          qrCode,
        }),
      });
      if (!response.ok) throw new Error("Erro ao atualizar mesa.");
      closeEdit();
      await loadMesas();
    } catch (error) {
      console.error("Erro ao atualizar mesa:", error);
    }
  };

  const deleteMesa = async (mesa: Mesa) => {
    if (!confirm(`Excluir a mesa ${mesa.number}?`)) return;
    try {
      const response = await fetch(`${API_URL}/tables/${mesa.uuid}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Erro ao excluir mesa.");
      await loadMesas();
    } catch (error) {
      console.error("Erro ao excluir mesa:", error);
    }
  };

  const printQRCode = async (value: string, numero: number) => {
    try {
      const svg = await QRCodeLib.toString(value, {
        type: "svg",
        width: 256,
        margin: 1,
      });
      const printWindow = window.open("", "", "height=400,width=400");
      if (printWindow) {
        printWindow.document.write(
          `<html><head><title>QR Code Mesa ${numero}</title></head><body>`
        );
        printWindow.document.write(svg);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
      }
    } catch (err) {
      console.error("Erro ao gerar QR Code para impressão:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header>
          <h1 className="text-2xl font-semibold text-zinc-800">Mesas</h1>
          <p className="text-sm text-zinc-500">
            Gerenciador de mesas do estabelecimento.
          </p>
        </header>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-black">
          <h2 className="text-xl font-semibold mb-4">Adicionar Mesa</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="number"
              placeholder="Número da Mesa"
              value={numeroMesa}
              min={1}
              readOnly
              className="border rounded-lg p-2 flex-1 bg-zinc-100"
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
              className="bg-white text-black border border-black hover:bg-black hover:text-white rounded-lg px-4 py-2"
            >
              Adicionar Mesa
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-zinc-500">Carregando mesas...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
            {mesas.map((mesa) => (
              <div
                key={mesa.uuid}
                className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">N°: {mesa.number}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(mesa)}
                      className="bg-white text-black border border-black rounded-lg px-3 py-1.5 text-sm hover:bg-zinc-100"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMesa(mesa)}
                      className="bg-white text-red-600 border border-red-600 rounded-lg px-3 py-1.5 text-sm hover:bg-red-50"
                    >
                      Excluir
                    </button>
                    <button
                      type="button"
                      onClick={() => printQRCode(mesa.qrCode, mesa.number)}
                      className="bg-white text-black border border-black rounded-lg px-2 py-2"
                    >
                      <QRCode value={mesa.qrCode} size={64} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 flex-1">{mesa.description}</p>
              </div>
            ))}
          </div>
        )}

        {editingMesa && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeEdit}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl text-black"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Editar Mesa</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Número
                  </label>
                  <input
                    type="number"
                    value={editNumber}
                    min={1}
                    onChange={(e) => setEditNumber(Number(e.target.value))}
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Descrição
                  </label>
                  <input
                    type="text"
                    value={editDescricao}
                    onChange={(e) => setEditDescricao(e.target.value)}
                    className="border rounded-lg p-2 w-full"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="button"
                  onClick={updateMesa}
                  className="flex-1 bg-black text-white rounded-lg py-2 hover:bg-zinc-800"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={closeEdit}
                  className="flex-1 bg-zinc-200 text-zinc-800 rounded-lg py-2 hover:bg-zinc-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableManager;
