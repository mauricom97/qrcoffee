"use client";

import { useState, useEffect } from "react";
import { getAuthHeaders } from "contexts/AuthContext";
import LoadingSpinner from "components/LoadingSpinner";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

export default function SoundOnOrderReadyToggle() {
  const [soundOnOrderReady, setSoundOnOrderReady] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/company/sound-on-order-ready`, { headers: getAuthHeaders() })
      .then((r) => (r.ok ? r.json() : { soundOnOrderReady: true }))
      .then((d) => setSoundOnOrderReady(d.soundOnOrderReady ?? true))
      .catch(() => setSoundOnOrderReady(true))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async () => {
    const next = !soundOnOrderReady;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/company/sound-on-order-ready`, {
        method: "PATCH",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ soundOnOrderReady: next }),
      });
      if (res.ok) setSoundOnOrderReady(next);
    } catch {
      // mantém valor anterior
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Carregando…" />;

  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-zinc-700">
        Reproduzir som quando pedido ficar pronto
      </span>
      <button
        role="switch"
        aria-checked={soundOnOrderReady}
        onClick={handleToggle}
        disabled={saving}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-50 ${
          soundOnOrderReady ? "bg-zinc-900" : "bg-zinc-200"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
            soundOnOrderReady ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </label>
  );
}
