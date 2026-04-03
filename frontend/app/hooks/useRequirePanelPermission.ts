"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "contexts/AuthContext";
import {
  type PanelPermissionCode,
  PANEL_PERMISSIONS,
} from "lib/panelPermissions";

const PATH_FALLBACK_ORDER: { path: string; code: PanelPermissionCode }[] = [
  { path: "/dashboard", code: PANEL_PERMISSIONS.DASHBOARD },
  { path: "/settings", code: PANEL_PERMISSIONS.SETTINGS },
  { path: "/products", code: PANEL_PERMISSIONS.PRODUCTS },
  { path: "/tables", code: PANEL_PERMISSIONS.TABLES },
  { path: "/tabs", code: PANEL_PERMISSIONS.TABS },
  { path: "/orders", code: PANEL_PERMISSIONS.ORDERS },
  { path: "/cashier", code: PANEL_PERMISSIONS.CASHIER },
  { path: "/stock", code: PANEL_PERMISSIONS.STOCK },
];

export function firstAllowedPanelPath(permissions: string[]): string {
  for (const { path, code } of PATH_FALLBACK_ORDER) {
    if (permissions.includes(code)) return path;
  }
  return "/";
}

/** Redireciona STAFF sem a permissão para a primeira área permitida (ou `/`). */
export function useRequirePanelPermission(code: PanelPermissionCode) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role === "ADMIN") return;
    if (!user.permissions.includes(code)) {
      router.replace(firstAllowedPanelPath(user.permissions));
    }
  }, [isLoading, user, code, router]);
}
