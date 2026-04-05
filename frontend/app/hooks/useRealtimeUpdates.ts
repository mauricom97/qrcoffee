"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

export const SOCKET_EVENTS = {
  PRODUCTS_UPDATE: "products:update",
  ORDERS_UPDATE: "orders:update",
  TABLES_UPDATE: "tables:update",
  MENU_UPDATE: "menu:update",
  ATTENDANT_CALL: "attendant:call",
} as const;

export type AttendantCallPayload = {
  tableUuid: string;
  tableNumber: number;
  tableDescription: string | null;
  message: string | null;
  at: string;
};

interface RealtimeCallbacks {
  onProductsUpdate?: () => void;
  onOrdersUpdate?: () => void;
  onTablesUpdate?: () => void;
  onMenuUpdate?: () => void;
  onAttendantCall?: (payload: AttendantCallPayload) => void;
}

export function useRealtimeUpdates(
  companyUuid: string | null,
  callbacks: RealtimeCallbacks
) {
  const socketRef = useRef<Socket | null>(null);
  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  useEffect(() => {
    if (!companyUuid) return;

    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem("qrcoffee_token")
        : null;

    const socket = io(API_URL, {
      auth: {
        token: token || undefined,
        companyUuid,
      },
      path: "/socket.io",
    });

    socketRef.current = socket;

    socket.on(SOCKET_EVENTS.PRODUCTS_UPDATE, () => {
      callbacksRef.current.onProductsUpdate?.();
    });
    socket.on(SOCKET_EVENTS.ORDERS_UPDATE, () => {
      callbacksRef.current.onOrdersUpdate?.();
    });
    socket.on(SOCKET_EVENTS.TABLES_UPDATE, () => {
      callbacksRef.current.onTablesUpdate?.();
    });
    socket.on(SOCKET_EVENTS.MENU_UPDATE, () => {
      callbacksRef.current.onMenuUpdate?.();
    });
    socket.on(SOCKET_EVENTS.ATTENDANT_CALL, (payload: AttendantCallPayload) => {
      callbacksRef.current.onAttendantCall?.(payload);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [companyUuid]);
}
