import { FiscalProvider, NfceEmitPayload, NfceEmitResult } from '@domain/fiscal/ports/fiscal-provider.port';

/**
 * Provedor mock para desenvolvimento e testes.
 * Simula emissão de NFC-e sem chamar SEFAZ.
 * Em produção, substitua por NuvemFiscalProvider ou NFEioProvider.
 */
export class MockFiscalProvider implements FiscalProvider {
  async emitirNfce(payload: NfceEmitPayload, _apiKey?: string): Promise<NfceEmitResult> {
    // Simula delay de rede
    await new Promise((r) => setTimeout(r, 500));

    const total = payload.itens.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
    if (total <= 0) {
      return {
        success: false,
        errorMessage: 'Valor total deve ser maior que zero',
      };
    }

    // Gera chave NFC-e fictícia (44 dígitos)
    const fakeKey = '9' + '99' + payload.emitente.uf + '99' + Date.now().toString().slice(-8).padStart(8, '0') + '99' + Math.random().toString().slice(2, 10).padStart(8, '0') + '99' + '1';
    const key44 = fakeKey.padEnd(44, '0').slice(0, 44);

    return {
      success: true,
      providerId: `MOCK-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      nfceKey: key44,
      xmlUrl: `https://example.com/nfce/mock/${key44}.xml`,
      pdfUrl: `https://example.com/nfce/mock/${key44}.pdf`,
    };
  }
}
