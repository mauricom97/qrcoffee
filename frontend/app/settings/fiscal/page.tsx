"use client";

import { useState, useEffect } from "react";
import { getAuthHeaders } from "contexts/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

interface FiscalConfig {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia?: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  inscricaoEstadual?: string;
  regimeTributario: string;
  provider: string;
  ncmPadrao: string;
  cfopPadrao: string;
}

const emptyConfig: FiscalConfig = {
  cnpj: "",
  razaoSocial: "",
  nomeFantasia: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  cep: "",
  inscricaoEstadual: "",
  regimeTributario: "1",
  provider: "mock",
  ncmPadrao: "2203.00.00",
  cfopPadrao: "5102",
};

export default function FiscalSettingsPage() {
  const [config, setConfig] = useState<FiscalConfig>(emptyConfig);
  const [providerApiKey, setProviderApiKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/fiscal/config`, { headers: getAuthHeaders() })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setConfig({ ...emptyConfig, ...data });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_URL}/fiscal/config`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          ...config,
          ...(providerApiKey ? { providerApiKey } : {}),
        }),
      });
      if (!res.ok) throw new Error("Erro ao salvar");
      setMessage({ type: "success", text: "Dados fiscais salvos com sucesso." });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Erro ao salvar." });
    } finally {
      setSaving(false);
    }
  };

  const formatCnpj = (v: string) => {
    const n = v.replace(/\D/g, "");
    return n.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  };

  const formatCep = (v: string) => {
    const n = v.replace(/\D/g, "");
    return n.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
        <p className="text-zinc-500">Carregando…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-800">Dados Fiscais</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Configure os dados da empresa para emissão de NFC-e. Necessário para converter pedidos em documentos fiscais válidos.
          </p>
        </header>

        {message && (
          <div
            className={`mb-6 rounded-lg p-4 ${
              message.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">CNPJ *</label>
              <input
                type="text"
                value={formatCnpj(config.cnpj) || config.cnpj}
                onChange={(e) => setConfig({ ...config, cnpj: e.target.value.replace(/\D/g, "") })}
                placeholder="00.000.000/0001-00"
                maxLength={18}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Razão Social *</label>
              <input
                type="text"
                value={config.razaoSocial}
                onChange={(e) => setConfig({ ...config, razaoSocial: e.target.value })}
                placeholder="Empresa Ltda"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Nome Fantasia</label>
            <input
              type="text"
              value={config.nomeFantasia || ""}
              onChange={(e) => setConfig({ ...config, nomeFantasia: e.target.value })}
              placeholder="Bar do João"
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
            />
          </div>

          <div className="border-t border-zinc-100 pt-4">
            <h3 className="text-sm font-medium text-zinc-800 mb-3">Endereço</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700 mb-1">Logradouro *</label>
                <input
                  type="text"
                  value={config.logradouro}
                  onChange={(e) => setConfig({ ...config, logradouro: e.target.value })}
                  placeholder="Rua das Flores"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Número *</label>
                <input
                  type="text"
                  value={config.numero}
                  onChange={(e) => setConfig({ ...config, numero: e.target.value })}
                  placeholder="123"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Complemento</label>
                <input
                  type="text"
                  value={config.complemento || ""}
                  onChange={(e) => setConfig({ ...config, complemento: e.target.value })}
                  placeholder="Sala 1"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Bairro *</label>
                <input
                  type="text"
                  value={config.bairro}
                  onChange={(e) => setConfig({ ...config, bairro: e.target.value })}
                  placeholder="Centro"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3 mt-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Cidade *</label>
                <input
                  type="text"
                  value={config.cidade}
                  onChange={(e) => setConfig({ ...config, cidade: e.target.value })}
                  placeholder="São Paulo"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">UF *</label>
                <input
                  type="text"
                  value={config.uf}
                  onChange={(e) => setConfig({ ...config, uf: e.target.value.toUpperCase().slice(0, 2) })}
                  placeholder="SP"
                  maxLength={2}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">CEP *</label>
                <input
                  type="text"
                  value={formatCep(config.cep) || config.cep}
                  onChange={(e) => setConfig({ ...config, cep: e.target.value.replace(/\D/g, "") })}
                  placeholder="01310-100"
                  maxLength={9}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Inscrição Estadual</label>
              <input
                type="text"
                value={config.inscricaoEstadual || ""}
                onChange={(e) => setConfig({ ...config, inscricaoEstadual: e.target.value })}
                placeholder="Opcional"
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Regime Tributário</label>
              <select
                value={config.regimeTributario}
                onChange={(e) => setConfig({ ...config, regimeTributario: e.target.value })}
                className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
              >
                <option value="1">Simples Nacional</option>
                <option value="2">Simples Nacional - Excesso de Sublimite</option>
                <option value="3">Regime Normal</option>
              </select>
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-4">
            <h3 className="text-sm font-medium text-zinc-800 mb-3">Provedor Fiscal</h3>
            <p className="text-xs text-zinc-500 mb-2">
              Use &quot;mock&quot; para testes. Em produção, configure Nuvem Fiscal ou NFE.io e informe a API Key.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Provedor</label>
                <select
                  value={config.provider}
                  onChange={(e) => setConfig({ ...config, provider: e.target.value })}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                >
                  <option value="mock">Mock (desenvolvimento)</option>
                  <option value="nuvemfiscal">Nuvem Fiscal</option>
                  <option value="nfeio">NFE.io</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">API Key (opcional)</label>
                <input
                  type="password"
                  value={providerApiKey}
                  onChange={(e) => setProviderApiKey(e.target.value)}
                  placeholder="Deixe em branco para manter a atual"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-zinc-400"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
            >
              {saving ? "Salvando…" : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
