"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

const HIDE_SIDEBAR_ROUTES = ["/", "/login", "/register"];

export default function SidebarWrapper() {
  const pathname = usePathname();

  if (HIDE_SIDEBAR_ROUTES.includes(pathname) || pathname?.startsWith("/cardapio")) {
    return null;
  }

  return <Sidebar />;
}
