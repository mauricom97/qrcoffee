/** Espelha os códigos do backend (`PANEL_PERMISSION_CODES`). */
export const PANEL_PERMISSIONS = {
  DASHBOARD: "DASHBOARD",
  PRODUCTS: "PRODUCTS",
  TABLES: "TABLES",
  TABS: "TABS",
  ORDERS: "ORDERS",
  MENU: "MENU",
  CASHIER: "CASHIER",
  STOCK: "STOCK",
  SETTINGS: "SETTINGS",
} as const;

export type PanelPermissionCode =
  (typeof PANEL_PERMISSIONS)[keyof typeof PANEL_PERMISSIONS];

export const PANEL_PERMISSION_LIST: PanelPermissionCode[] = [
  PANEL_PERMISSIONS.DASHBOARD,
  PANEL_PERMISSIONS.PRODUCTS,
  PANEL_PERMISSIONS.TABLES,
  PANEL_PERMISSIONS.TABS,
  PANEL_PERMISSIONS.ORDERS,
  PANEL_PERMISSIONS.MENU,
  PANEL_PERMISSIONS.CASHIER,
  PANEL_PERMISSIONS.STOCK,
  PANEL_PERMISSIONS.SETTINGS,
];

export function userHasPanelPermission(
  role: "ADMIN" | "STAFF",
  permissions: string[] | undefined,
  code: PanelPermissionCode,
): boolean {
  if (role === "ADMIN") return true;
  return (permissions ?? []).includes(code);
}
