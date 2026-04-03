"use client";

import { useState, useEffect } from "react";
import { FaQrcode, FaExternalLinkAlt, FaPalette } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { getAuthHeaders, useAuth } from "contexts/AuthContext";
import { PANEL_PERMISSIONS, userHasPanelPermission } from "lib/panelPermissions";
import LoadingSpinner from "components/LoadingSpinner";
import CardapioThemeForm from "components/CardapioThemeForm";
import { useLocaleContext } from "i18n/LocaleContext";

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
  const { t } = useLocaleContext();
  const { user } = useAuth();
  const canListTables = userHasPanelPermission(
    user?.role ?? "STAFF",
    user?.permissions,
    PANEL_PERMISSIONS.TABLES,
  );
  const canEditAppearance = userHasPanelPermission(
    user?.role ?? "STAFF",
    user?.permissions,
    PANEL_PERMISSIONS.SETTINGS,
  );
  const [activeTab, setActiveTab] = useState<"visualizar" | "aparencia">("visualizar");
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loadingMesas, setLoadingMesas] = useState(true);

  useEffect(() => {
    if (!canEditAppearance && activeTab === "aparencia") {
      setActiveTab("visualizar");
    }
  }, [canEditAppearance, activeTab]);

  useEffect(() => {
    if (open) {
      if (!canListTables) {
        setMesas([]);
        setLoadingMesas(false);
        return;
      }
      setLoadingMesas(true);
      fetch(`${API_URL}/tables`, { headers: getAuthHeaders() })
        .then((r) => (r.ok ? r.json() : []))
        .then((data) => setMesas(Array.isArray(data) ? data : []))
        .catch(() => setMesas([]))
        .finally(() => setLoadingMesas(false));
    }
  }, [open, canListTables]);

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
            {t("cardapioModal.title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-600 transition"
            aria-label={t("cardapioModal.close")}
          >
            <HiX className="text-xl" />
          </button>
        </div>

        <div className="flex border-b border-zinc-200">
          <button
            type="button"
            onClick={() => setActiveTab("visualizar")}
            className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition ${
              activeTab === "visualizar"
                ? "text-zinc-900 border-b-2 border-zinc-900 bg-zinc-50"
                : "text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            <FaExternalLinkAlt /> {t("cardapioModal.tabView")}
          </button>
          {canEditAppearance ? (
            <button
              type="button"
              onClick={() => setActiveTab("aparencia")}
              className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 transition ${
                activeTab === "aparencia"
                  ? "text-zinc-900 border-b-2 border-zinc-900 bg-zinc-50"
                  : "text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <FaPalette /> {t("cardapioModal.tabLook")}
            </button>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "visualizar" && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-600">
                {t("cardapioModal.intro")}
              </p>
              {loadingMesas ? (
                <LoadingSpinner message={t("cardapioModal.loadingTables")} />
              ) : !canListTables ? (
                <p className="text-sm text-zinc-500 py-4 text-center">
                  {t("cardapioModal.noTableAccess")}
                </p>
              ) : mesas.length === 0 ? (
                <p className="text-sm text-zinc-500 py-4 text-center">
                  {t("cardapioModal.noTables")}
                </p>
              ) : (
                <ul className="space-y-2">
                  {mesas.map((mesa) => (
                    <li
                      key={mesa.uuid}
                      className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50"
                    >
                      <div>
                        <span className="font-medium text-zinc-800">{t("common.table")} {mesa.number}</span>
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
                        {t("cardapioModal.open")} <FaExternalLinkAlt className="text-xs" />
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
