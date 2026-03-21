"use client";

import CardapioThemeForm from "components/CardapioThemeForm";

export default function SettingsPage() {
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

        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <CardapioThemeForm />
        </div>

        <p className="text-xs text-zinc-500">
          As alterações serão refletidas no cardápio online acessado pelos clientes via QR code.
        </p>
      </div>
    </div>
  );
}
