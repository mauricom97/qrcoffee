"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "contexts/AuthContext";
import { useRealtimeUpdates } from "hooks/useRealtimeUpdates";
import QRCode from "react-qr-code";
import * as QRCodeLib from "qrcode";
import { LuTableOfContents } from "react-icons/lu";
import { Mesa } from "./interfaces/table.interface";
import { getAuthHeaders } from "contexts/AuthContext";
import ConfirmModal from "components/ConfirmModal";
import LoadingSpinner from "components/LoadingSpinner";
import { useLocaleContext } from "i18n/LocaleContext";
import { useRequirePanelPermission } from "hooks/useRequirePanelPermission";
import { PANEL_PERMISSIONS } from "lib/panelPermissions";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

const TableManager: React.FC = () => {
  useRequirePanelPermission(PANEL_PERMISSIONS.TABLES);
  const { user } = useAuth();
  const { t } = useLocaleContext();
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(true);
  const numeroMesa = mesas.length + 1;
  const [descricao, setDescricao] = useState<string>("");
  const [editingMesa, setEditingMesa] = useState<Mesa | null>(null);
  const [editNumber, setEditNumber] = useState<number>(1);
  const [editDescricao, setEditDescricao] = useState<string>("");
  const [mesaToDelete, setMesaToDelete] = useState<Mesa | null>(null);

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

  useRealtimeUpdates(user?.companyUuid ?? null, {
    onTablesUpdate: loadMesas,
  });

  const addMesa = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_FRONTEND_URL || (typeof window !== "undefined" ? window.location.origin : "");
    try {
      const response = await fetch(`${API_URL}/tables`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          number: numeroMesa,
          description: descricao.trim() || t("tables.noDesc"),
          baseUrl,
        }),
      });
      if (!response.ok) throw new Error("Erro ao criar mesa no servidor.");
      setDescricao(t("tables.noDesc"));
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
          <h1 className="text-2xl font-semibold text-zinc-800">{t("tables.title")}</h1>
          <p className="text-sm text-zinc-500">
            {t("tables.subtitle")}
          </p>
        </header>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-black">
          <h2 className="text-xl font-semibold mb-4">{t("tables.addTitle")}</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="number"
              placeholder={t("tables.numberPh")}
              value={numeroMesa}
              min={1}
              readOnly
              className="border rounded-lg p-2 flex-1 bg-zinc-100"
            />
            <input
              type="text"
              placeholder={t("tables.descPh")}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="border rounded-lg p-2 flex-1"
            />
            <button
              onClick={addMesa}
              className="bg-white text-black border border-black hover:bg-black hover:text-white rounded-lg px-4 py-2"
            >
              {t("tables.addBtn")}
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message={t("tables.loading")} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
            {mesas.map((mesa) => (
              <div
                key={mesa.uuid}
                className="bg-gray-100 shadow-md rounded-lg p-5 flex flex-col"
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-zinc-800">
                      {t("common.table")} {mesa.number}
                    </h3>
                    <p className="text-zinc-600 text-sm mt-1 line-clamp-2">
                      {mesa.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => printQRCode(mesa.qrCode, mesa.number)}
                    className="shrink-0 p-1.5 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 transition"
                    title={t("tables.printQr")}
                  >
                    <QRCode value={mesa.qrCode} size={56} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-200">
                  <Link
                    href={`/cardapio?mesa=${mesa.uuid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-900 transition"
                  >
                    <LuTableOfContents className="text-base" />
                    {t("tables.menuLink")}
                  </Link>
                  <button
                    type="button"
                    onClick={() => openEdit(mesa)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 transition"
                  >
                    {t("common.edit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMesaToDelete(mesa)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-red-300 bg-white text-red-600 hover:bg-red-50 transition"
                  >
                    {t("common.delete")}
                  </button>
                </div>
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
              <h2 className="text-xl font-semibold mb-4">{t("tables.editTitle")}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    {t("tables.number")}
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
                    {t("common.description")}
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
                  {t("common.save")}
                </button>
                <button
                  type="button"
                  onClick={closeEdit}
                  className="flex-1 bg-zinc-200 text-zinc-800 rounded-lg py-2 hover:bg-zinc-300"
                >
                  {t("common.cancel")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!mesaToDelete}
        onClose={() => setMesaToDelete(null)}
        onConfirm={() => mesaToDelete && deleteMesa(mesaToDelete)}
        title={t("tables.deleteTitle")}
        message={
          mesaToDelete
            ? t("tables.deleteMsg", { n: String(mesaToDelete.number) })
            : ""
        }
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
      />
    </div>
  );
};

export default TableManager;
