'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useLocaleContext } from 'i18n/LocaleContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register: doRegister, user } = useAuth();
  const { t } = useLocaleContext();
  const [companyName, setCompanyName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError(t('auth.passwordsMismatch'));
      return;
    }
    if (password.length < 6) {
      setError(t('auth.passwordTooShort'));
      return;
    }
    setLoading(true);
    try {
      await doRegister(companyName, userName, email, password);
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.registerFailed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md border border-black rounded-sm p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-center text-black mb-2">
          {t('auth.registerTitle')}
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          {t('auth.registerSubtitle')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-black mb-1">
              {t('auth.companyName')}
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={t('auth.companyPlaceholder')}
            />
          </div>
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-black mb-1">
              {t('auth.yourName')}
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={t('auth.namePlaceholder')}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
              {t('auth.email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={t('auth.emailPlaceholder')}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
              {t('auth.password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-black rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={t('auth.passwordMin')}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-1">
              {t('auth.confirmPassword')}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-black rounded-sm focus:outline-none focus:ring-2 focus:ring-black"
              placeholder={t('auth.confirmPasswordPlaceholder')}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white font-medium rounded-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? t('auth.registering') : t('auth.register')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {t('auth.hasAccount')}{' '}
          <Link href="/login" className="font-medium text-black hover:underline">
            {t('auth.signIn')}
          </Link>
        </p>
        <p className="mt-2 text-center text-sm">
          <Link href="/" className="text-gray-500 hover:text-black">
            {t('common.backHome')}
          </Link>
        </p>
      </div>
    </div>
  );
}
