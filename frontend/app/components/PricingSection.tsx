'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useLocaleContext } from 'i18n/LocaleContext';

const CONTAINER = 'max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10';
const SECTION_PY = 'py-12 sm:py-16 md:py-20';

const PLAN_ORDER = ['essencial', 'profissional', 'pro'] as const;

type PlanId = (typeof PLAN_ORDER)[number];

type PlanDef = {
  id: PlanId;
  monthlyPrice: number;
  highlighted?: boolean;
};

const PLAN_META: PlanDef[] = [
  { id: 'essencial', monthlyPrice: 79 },
  { id: 'profissional', monthlyPrice: 99, highlighted: true },
  { id: 'pro', monthlyPrice: 149 },
];

/** Preço anual: 10x o mensal (equivalente a 2 meses grátis). */
function annualTotal(monthly: number) {
  return monthly * 10;
}

function monthlyFromAnnual(monthly: number) {
  return annualTotal(monthly) / 12;
}

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const { t, localeTag, messages } = useLocaleContext();
  const pricing = messages.pricing as {
    plans: Record<
      string,
      { name: string; description: string; features: string[] }
    >;
  };

  const planKey = (id: PlanId) => {
    const map: Record<PlanId, string> = {
      essencial: 'essential',
      profissional: 'professional',
      pro: 'pro',
    };
    return map[id];
  };

  const formatMoney = (n: number) =>
    new Intl.NumberFormat(localeTag, {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <section id="planos" className={`${SECTION_PY} bg-white border-y border-gray-200`}>
      <div className={CONTAINER}>
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-tight">
            {t('pricing.title')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          <span
            className={`text-sm font-medium ${!annual ? 'text-black' : 'text-gray-500'}`}
            id="pricing-period-label"
          >
            {t('pricing.monthly')}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-labelledby="pricing-period-label"
            onClick={() => setAnnual(!annual)}
            className="relative inline-flex h-9 w-16 shrink-0 cursor-pointer rounded-full border-2 border-gray-300 bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <span
              className={`pointer-events-none inline-block h-8 w-8 translate-y-0 rounded-full bg-black shadow transition-transform duration-200 ease-out ${
                annual ? 'translate-x-7' : 'translate-x-0.5'
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${annual ? 'text-black' : 'text-gray-500'}`}>
              {t('pricing.annual')}
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-600/20">
              {t('pricing.twoMonthsFree')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 xl:gap-6 items-stretch max-w-6xl mx-auto">
          {PLAN_META.map((plan) => {
            const p = pricing.plans[planKey(plan.id)];
            const isFeatured = plan.highlighted;
            const displayMonthly = annual ? monthlyFromAnnual(plan.monthlyPrice) : plan.monthlyPrice;
            const priceLabel = formatMoney(displayMonthly);

            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${
                  isFeatured
                    ? 'border-black bg-gray-50 shadow-lg ring-2 ring-black/90 lg:scale-[1.02] z-10'
                    : 'border-gray-200 bg-white shadow-sm hover:border-gray-300'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
                      {t('pricing.popular')}
                    </span>
                  </div>
                )}

                <div className={isFeatured ? 'pt-2' : ''}>
                  <h3 className="text-lg font-bold text-black">
                    {t('pricing.planPrefix')} {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed min-h-[2.75rem]">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 mb-6">
                  <div className="flex items-baseline gap-1 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
                      {priceLabel}
                    </span>
                    <span className="text-gray-600 text-sm font-medium">{t('common.month')}</span>
                  </div>
                  {annual ? (
                    <p className="mt-2 text-sm text-emerald-700 font-medium">
                      {t('pricing.billingAnnual', {
                        amount: formatMoney(annualTotal(plan.monthlyPrice)),
                      })}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-gray-500">{t('pricing.billingMonthly')}</p>
                  )}
                </div>

                <Link
                  href="/register"
                  className={`mb-8 inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors duration-200 ${
                    isFeatured
                      ? 'bg-black text-white hover:bg-gray-900 shadow-md'
                      : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
                  }`}
                >
                  {t('pricing.cta')}
                </Link>

                <ul className="space-y-3 flex-1 border-t border-gray-200 pt-6">
                  {p.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                      <FaCheck
                        className={`mt-0.5 h-4 w-4 flex-shrink-0 ${isFeatured ? 'text-black' : 'text-zinc-600'}`}
                        aria-hidden
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto">
          {t('common.currencyBrlNote')}
        </p>
      </div>
    </section>
  );
}
