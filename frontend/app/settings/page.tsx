"use client";

import { useState, useEffect } from "react";
import { getAuthHeaders } from "contexts/AuthContext";
import type { MenuTheme } from "../cardapio/page";
import LoadingSpinner from "components/LoadingSpinner";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

const PRESETS: { name: string; theme: MenuTheme }[] = [
  {
    name: "Preto e branco",
    theme: {
      primary: "#18181b",
      primaryHover: "#27272a",
      background: "#fafafa",
      accent: "#e4e4e7",
      textPrimary: "#18181b",
      textMuted: "#71717a",
    },
  },
  {
    name: "Âmbar",
    theme: {
      primary: "#d97706",
      primaryHover: "#b45309",
      background: "#fffbeb",
      accent: "#fde68a",
      textPrimary: "#78350f",
      textMuted: "#a16207",
    },
  },
  {
    name: "Verde",
    theme: {
      primary: "#15803d",
      primaryHover: "#166534",
      background: "#f0fdf4",
      accent: "#bbf7d0",
      textPrimary: "#14532d",
      textMuted: "#15803d",
    },
  },
  {
    name: "Azul",
    theme: {
      primary: "#1d4ed8",
      primaryHover: "#1e40af",
      background: "#eff6ff",
      accent: "#bfdbfe",
      textPrimary: "#1e3a8a",
      textMuted: "#2563eb",
    },
  },
  {
    name: "Vermelho",
    theme: {
      primary: "#b91c1c",
      primaryHover: "#991b1b",
      background: "#fef2f2",
      accent: "#fecaca",
      textPrimary: "#7f1d1d",
      textMuted: "#dc2626",
    },
  },
];

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded border border-zinc-200 cursor-pointer"
      />
      <div className="flex-1">
        <label className="block text-xs text-zinc-500 mb-0.5">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded border border-zinc-200 px-2 py-1 text-sm font-mono"
        />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [theme, setTheme] = useState<MenuTheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<"ok" | "error" | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/company/menu-theme`, {
          headers: getAuthHeaders(),
        });
        if (res.ok) {
          const data = await res.json();
          setTheme(data.theme || null);
        }
      } catch {
        setMessage("error");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_URL}/company/menu-theme`, {
        method: "PATCH",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      if (res.ok) {
        setMessage("ok");
      } else {
        setMessage("error");
      }
    } catch {
      setMessage("error");
    } finally {
      setSaving(false);
    }
  };

  const currentTheme: MenuTheme = theme ?? {
    primary: "#18181b",
    primaryHover: "#27272a",
    background: "#fafafa",
    accent: "#e4e4e7",
    textPrimary: "#18181b",
    textMuted: "#71717a",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-100 p-4 md:p-8 flex items-center justify-center">
        <LoadingSpinner message="Carregando configurações…" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-6 mt-15">
        <header>
          <h1 className="text-2xl font-semibold text-zinc-800">
            Aparência do Cardápio
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Personalize as cores do cardápio online conforme a identidade do seu estabelecimento.
          </p>
        </header>

        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-medium text-zinc-700 mb-3">
              Temas prontos
            </h2>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setTheme({ ...preset.theme })}
                  className="px-4 py-2 rounded-lg border border-zinc-200 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-6 space-y-4">
            <h2 className="text-sm font-medium text-zinc-700">
              Cores personalizadas
            </h2>
            <div className="grid gap-4">
              <ColorInput
                label="Cor principal (header, botões)"
                value={currentTheme.primary ?? "#18181b"}
                onChange={(v) =>
                  setTheme((t) => ({ ...(t ?? currentTheme), primary: v }))
                }
              />
              <ColorInput
                label="Fundo"
                value={currentTheme.background ?? "#fafafa"}
                onChange={(v) =>
                  setTheme((t) => ({ ...(t ?? currentTheme), background: v }))
                }
              />
              <ColorInput
                label="Bordas e destaques"
                value={currentTheme.accent ?? "#e4e4e7"}
                onChange={(v) =>
                  setTheme((t) => ({ ...(t ?? currentTheme), accent: v }))
                }
              />
              <ColorInput
                label="Texto principal"
                value={currentTheme.textPrimary ?? "#18181b"}
                onChange={(v) =>
                  setTheme((t) => ({ ...(t ?? currentTheme), textPrimary: v }))
                }
              />
              <ColorInput
                label="Texto secundário"
                value={currentTheme.textMuted ?? "#71717a"}
                onChange={(v) =>
                  setTheme((t) => ({ ...(t ?? currentTheme), textMuted: v }))
                }
              />
            </div>
          </div>

          {message === "ok" && (
            <p className="text-sm text-zinc-600">Salvo com sucesso!</p>
          )}
          {message === "error" && (
            <p className="text-sm text-red-600">Erro ao salvar. Tente novamente.</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setTheme(null)}
              className="flex-1 py-3 border border-zinc-300 text-zinc-700 font-medium rounded-lg hover:bg-zinc-50 transition"
            >
              Redefinir ao padrão
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 bg-zinc-900 text-white font-medium rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition"
            >
              {saving ? "Salvando…" : "Salvar tema"}
            </button>
          </div>
        </div>

        <p className="text-xs text-zinc-500">
          As alterações serão refletidas no cardápio online acessado pelos clientes via QR code.
        </p>
      </div>
    </div>
  );
}
