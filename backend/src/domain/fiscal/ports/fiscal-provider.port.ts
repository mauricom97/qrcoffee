/**
 * Interface para provedores de emissão fiscal (NFC-e/NF-e).
 * Implementações: MockFiscalProvider (dev), NuvemFiscalProvider, NFEioProvider.
 */
export interface NfceItemPayload {
  description: string;
  quantity: number;
  unitPrice: number;
  ncm?: string;
  cfop?: string;
}

export interface NfceEmitPayload {
  emitente: {
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
  };
  itens: NfceItemPayload[];
  ncmPadrao: string;
  cfopPadrao: string;
}

export interface NfceEmitResult {
  success: boolean;
  providerId?: string;
  nfceKey?: string;
  xmlUrl?: string;
  pdfUrl?: string;
  errorMessage?: string;
}

export interface FiscalProvider {
  emitirNfce(payload: NfceEmitPayload, apiKey?: string): Promise<NfceEmitResult>;
}
