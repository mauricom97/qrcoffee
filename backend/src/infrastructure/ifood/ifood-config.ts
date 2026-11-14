/** Número reservado da mesa sintética usada por pedidos iFood. */
export const IFOOD_SYNTHETIC_TABLE_NUMBER = 0;

export function getIfoodConfig() {
  return {
    apiBaseUrl: (process.env.IFOOD_API_BASE_URL || 'https://merchant-api.ifood.com.br').replace(
      /\/$/,
      '',
    ),
    clientId: process.env.IFOOD_CLIENT_ID || '',
    clientSecret: process.env.IFOOD_CLIENT_SECRET || '',
    webhookSecret: process.env.IFOOD_WEBHOOK_SECRET || '',
  };
}
