"use client";

import { useCallback, useEffect, useState } from "react";
import { getAuthHeaders } from "contexts/AuthContext";
import LoadingSpinner from "components/LoadingSpinner";
import { useLocaleContext } from "i18n/LocaleContext";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

type IfoodSettings = {
  enabled: boolean;
  merchantId: string | null;
  clientId: string | null;
  hasClientSecret: boolean;
  hasWebhookSecret: boolean;
  configured: boolean;
};

export default function IfoodSettingsForm() {
  const { t } = useLocaleContext();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [merchantId, setMerchantId] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [hasClientSecret, setHasClientSecret] = useState(false);
  const [hasWebhookSecret, setHasWebhookSecret] = useState(false);
  const [simulateExternalCode, setSimulateExternalCode] = useState("");
  const [simulateQty, setSimulateQty] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/integrations/ifood`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("load");
      const data: IfoodSettings = await res.json();
      setEnabled(Boolean(data.enabled));
      setMerchantId(data.merchantId ?? "");
      setClientId(data.clientId ?? "");
      setHasClientSecret(Boolean(data.hasClientSecret));
      setHasWebhookSecret(Boolean(data.hasWebhookSecret));
    } catch {
      setError(t("settings.ifood.loadError"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const body: Record<string, unknown> = {
        enabled,
        merchantId: merchantId.trim() || null,
        clientId: clientId.trim() || null,
      };
      if (clientSecret.trim()) body.clientSecret = clientSecret.trim();
      if (webhookSecret.trim()) body.webhookSecret = webhookSecret.trim();

      const res = await fetch(`${API_URL}/integrations/ifood`, {
        method: "PUT",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("save");
      const data: IfoodSettings = await res.json();
      setEnabled(Boolean(data.enabled));
      setMerchantId(data.merchantId ?? "");
      setClientId(data.clientId ?? "");
      setHasClientSecret(Boolean(data.hasClientSecret));
      setHasWebhookSecret(Boolean(data.hasWebhookSecret));
      setClientSecret("");
      setWebhookSecret("");
      setMessage(t("settings.ifood.saved"));
    } catch {
      setError(t("settings.ifood.saveError"));
    } finally {
      setSaving(false);
    }
  };

  const handleSimulate = async () => {
    const code = simulateExternalCode.trim();
    if (!code) {
      setError(t("settings.ifood.simulateNeedCode"));
      return;
    }
    setSimulating(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/integrations/ifood/simulate`, {
        method: "POST",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              externalCode: code,
              quantity: Math.max(1, Number(simulateQty) || 1),
            },
          ],
          observacao: "Pedido simulado iFood",
        }),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        const msg =
          typeof errBody?.message === "string"
            ? errBody.message
            : Array.isArray(errBody?.message)
              ? errBody.message.join(", ")
              : t("settings.ifood.simulateError");
        throw new Error(msg);
      }
      setMessage(t("settings.ifood.simulateOk"));
    } catch (e) {
      setError(e instanceof Error ? e.message : t("settings.ifood.simulateError"));
    } finally {
      setSimulating(false);
    }
  };

  if (loading) return <LoadingSpinner message={t("common.loading")} />;

  return (
    <div className="space-y-6">
      <p className="text-sm text-zinc-500">{t("settings.ifood.desc")}</p>

      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm text-zinc-700">{t("settings.ifood.enabled")}</span>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => setEnabled((v) => !v)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 ${
            enabled ? "bg-zinc-900" : "bg-zinc-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
              enabled ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm space-y-1">
          <span className="text-zinc-700">{t("settings.ifood.merchantId")}</span>
          <input
            type="text"
            value={merchantId}
            onChange={(e) => setMerchantId(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
            autoComplete="off"
          />
        </label>
        <label className="block text-sm space-y-1">
          <span className="text-zinc-700">{t("settings.ifood.clientId")}</span>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
            autoComplete="off"
          />
        </label>
        <label className="block text-sm space-y-1">
          <span className="text-zinc-700">
            {t("settings.ifood.clientSecret")}
            {hasClientSecret ? (
              <span className="text-zinc-400 font-normal">
                {" "}
                ({t("settings.ifood.secretConfigured")})
              </span>
            ) : null}
          </span>
          <input
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            placeholder={t("settings.ifood.secretPlaceholder")}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
            autoComplete="new-password"
          />
        </label>
        <label className="block text-sm space-y-1">
          <span className="text-zinc-700">
            {t("settings.ifood.webhookSecret")}
            {hasWebhookSecret ? (
              <span className="text-zinc-400 font-normal">
                {" "}
                ({t("settings.ifood.secretConfigured")})
              </span>
            ) : null}
          </span>
          <input
            type="password"
            value={webhookSecret}
            onChange={(e) => setWebhookSecret(e.target.value)}
            placeholder={t("settings.ifood.secretPlaceholder")}
            className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
            autoComplete="new-password"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
      >
        {saving ? t("common.saving") : t("settings.ifood.save")}
      </button>

      <div className="border-t border-zinc-200 pt-5 space-y-3">
        <h3 className="text-sm font-medium text-zinc-800">
          {t("settings.ifood.simulateTitle")}
        </h3>
        <p className="text-xs text-zinc-500">{t("settings.ifood.simulateDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <label className="block text-sm space-y-1 flex-1">
            <span className="text-zinc-700">{t("settings.ifood.simulateCode")}</span>
            <input
              type="text"
              value={simulateExternalCode}
              onChange={(e) => setSimulateExternalCode(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
            />
          </label>
          <label className="block text-sm space-y-1 w-24">
            <span className="text-zinc-700">{t("settings.ifood.simulateQty")}</span>
            <input
              type="number"
              min={1}
              value={simulateQty}
              onChange={(e) => setSimulateQty(Number(e.target.value) || 1)}
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
            />
          </label>
          <button
            type="button"
            onClick={handleSimulate}
            disabled={simulating}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 disabled:opacity-50"
          >
            {simulating ? t("common.saving") : t("settings.ifood.simulate")}
          </button>
        </div>
      </div>

      {message ? (
        <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      ) : null}
    </div>
  );
}
