"use client";

import CardapioThemeForm from "components/CardapioThemeForm";
import SoundOnOrderReadyToggle from "components/SoundOnOrderReadyToggle";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-zinc-100 p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-6 mt-15">
        <header>
          <h1 className="text-2xl font-semibold text-zinc-800">
            Configurações
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Personalize a aparência e o comportamento do sistema.
          </p>
        </header>

        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <h2 className="text-sm font-medium text-zinc-700 mb-3">
            Pedidos
          </h2>
          <SoundOnOrderReadyToggle />
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-800 mb-2">
            Aparência do Cardápio
          </h2>
          <p className="text-sm text-zinc-500 mb-4">
            Personalize as cores do cardápio online conforme a identidade do seu estabelecimento.
          </p>
          <CardapioThemeForm />
        </div>

        <p className="text-xs text-zinc-500">
          As alterações serão refletidas no cardápio online acessado pelos clientes via QR code.
        </p>
      </div>
    </div>
  );
}
