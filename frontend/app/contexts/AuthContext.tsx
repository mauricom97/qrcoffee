'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3352';

export type AuthUser = {
  uuid: string;
  email: string;
  name: string;
  companyUuid: string;
  companyName: string;
};

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (companyName: string, userName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
};

export const STORAGE_TOKEN = 'qrcoffee_token';
const STORAGE_USER = 'qrcoffee_user';

/** Headers com token para usar nas requisições à API (tables, products, orders, dashboard, etc.) */
export function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {};
  const token = window.localStorage.getItem(STORAGE_TOKEN);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const persistAuth = useCallback((newToken: string, newUser: AuthUser) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_TOKEN, newToken);
    window.localStorage.setItem(STORAGE_USER, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_TOKEN);
    window.localStorage.removeItem(STORAGE_USER);
    setToken(null);
    setUser(null);
  }, []);

  const fetchUser = useCallback(async () => {
    const t = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_TOKEN) : null;
    if (!t) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setToken(t);
      } else {
        logout();
      }
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_TOKEN) : null;
    const u = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_USER) : null;
    if (t && u) {
      try {
        setToken(t);
        setUser(JSON.parse(u) as AuthUser);
      } catch {
        logout();
      }
    }
    fetchUser();
  }, [fetchUser, logout]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Falha no login');
      persistAuth(data.accessToken, data.user);
    },
    [persistAuth]
  );

  const register = useCallback(
    async (companyName: string, userName: string, email: string, password: string) => {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, userName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Falha no cadastro');
      persistAuth(data.accessToken, data.user);
    },
    [persistAuth]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
