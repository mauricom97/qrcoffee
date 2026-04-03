/** Areas do painel que podem ser concedidas por grupo (usuarios STAFF). ADMIN ignora e tem acesso total. */
export const PANEL_PERMISSION_CODES = {
  DASHBOARD: 'DASHBOARD',
  PRODUCTS: 'PRODUCTS',
  TABLES: 'TABLES',
  TABS: 'TABS',
  ORDERS: 'ORDERS',
  MENU: 'MENU',
  CASHIER: 'CASHIER',
  STOCK: 'STOCK',
  SETTINGS: 'SETTINGS',
} as const;

export type PanelPermissionCode = (typeof PANEL_PERMISSION_CODES)[keyof typeof PANEL_PERMISSION_CODES];

export const ALL_PANEL_PERMISSION_CODES: PanelPermissionCode[] = Object.values(PANEL_PERMISSION_CODES);

const VALID = new Set<string>(ALL_PANEL_PERMISSION_CODES);

export function normalizePanelPermissions(input: string[] | undefined | null): PanelPermissionCode[] {
  if (!input?.length) return [];
  const out = new Set<PanelPermissionCode>();
  for (const raw of input) {
    const p = typeof raw === 'string' ? raw.trim() : '';
    if (VALID.has(p)) out.add(p as PanelPermissionCode);
  }
  return Array.from(out);
}

export function isPanelPermissionCode(value: string): value is PanelPermissionCode {
  return VALID.has(value);
}
