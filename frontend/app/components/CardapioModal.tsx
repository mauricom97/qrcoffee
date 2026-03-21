"use client";

import { useState, useEffect } from "react";
import { FaQrcode, FaExternalLinkAlt, FaPalette } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { getAuthHeaders } from "contexts/AuthContext";
import LoadingSpinner from "components/LoadingSpinner";
import CardapioThemeForm from "components/CardapioThemeForm";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_FRONTEND_URL || (typeof window !== "undefined" ? window.location.origin : "");

interface Mesa {
  uuid: string;
  number: number;
  description: string;
}

interface CardapioModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CardapioModal({ open, onClose }: CardapioModalProps) {
  const [activeTab, setActiveTab] = useState<"visualizar" | "aparencia">("visualizar");
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loadingMesas, setLoadingMesas] = useState(true);

  useEffect(() => {
    if (open) {
      setLoadingMesas(true);
      fetch(`${API_URL}/tables`, { headers: getAuthHeaders() })
        .then((r) => (r.ok ? r.json() : []))
        .then((data) => setMesas(Array.isArray(data) ? data : []))
        .catch(() => setMesas([]))
        .finally(() => setLoadingMesas(false));
    }
  }, [open]);

  if (!open) return null;

  const cardapioUrl = (mesaUuid: string) => `${BASE_URL.replace(/\/$/, "")}/cardapio?mesa=${mesaUuid}`;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-zinc-200">
          <h2 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
            <FaQrcode className="text-zinc-600" />
            Cardápio Online
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-600 transition"
            aria-label="Fechar"
          >
            <HiX className="text-xl" />
          </button>
        </div>

        <div className="flex border-b border-zinc-200">
          <button
            onClick={() => setActiveTab("visualizar")}
            className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition ${
              activeTab === "visualizar"
                ? "text-zinc-900 border-b-2 border-zinc-900 bg-zinc-50"
                : "text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            <FaExternalLinkAlt /> Visualizar
          </button>
          <button
            onClick={() => setActiveTab("aparencia")}
            className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition ${
              activeTab === "aparencia"
                ? "text-zinc-900 border-b-2 border-zinc-900 bg-zinc-50"
                : "text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            <FaPalette /> Aparência
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "visualizar" && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-600">
                Abra o cardápio em uma nova aba para visualizar ou compartilhar com os clientes.
              </p>
              {loadingMesas ? (
                <LoadingSpinner message="Carregando mesas…" />
              ) : mesas.length === 0 ? (
                <p className="text-sm text-zinc-500 py-4 text-center">
                  Nenhuma mesa cadastrada. Cadastre mesas em Mesas para gerar links do cardápio.
                </p>
              ) : (
                <ul className="space-y-2">
                  {mesas.map((mesa) => (
                    <li
                      key={mesa.uuid}
                      className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50"
                    >
                      <div>
                        <span className="font-medium text-zinc-800">Mesa {mesa.number}</span>
                        {mesa.description && (
                          <span className="text-sm text-zinc-500 ml-1">— {mesa.description}</span>
                        )}
                      </div>
                      <a
                        href={cardapioUrl(mesa.uuid)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-zinc-900 hover:underline flex items-center gap-1"
                      >
                        Abrir <FaExternalLinkAlt className="text-xs" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "aparencia" && (
            <CardapioThemeForm />
          )}
        </div>
      </div>
    </div>
  );
}
