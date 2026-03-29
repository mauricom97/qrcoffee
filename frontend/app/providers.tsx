'use client';

import { AuthProvider } from './contexts/AuthContext';
import { LocaleProvider } from './i18n/LocaleContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <AuthProvider>{children}</AuthProvider>
    </LocaleProvider>
  );
}
