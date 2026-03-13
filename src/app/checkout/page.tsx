'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { initiateCheckout } from '@/lib/pixel';

const plans = {
  starter: {
    name: 'Starter Collection',
    price: '$7',
    interval: 'one-time',
    description: '27 hand-curated cottagecore coloring pages',
    features: [
      '27 unique cottagecore illustrations',
      'Instant digital download',
      'Print as many times as you like',
      'Personal use license',
    ],
  },
  meadow: {
    name: 'Meadow Membership',
    price: '$9',
    interval: '/mo',
    description: '10 new pages monthly + growing library + community',
    features: [
      '10 brand-new pages every month',
      'Access to the full growing library',
      'Members-only community',
      'Early access to new collections',
    ],
  },
} as const;

type PlanKey = keyof typeof plans;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') as PlanKey | null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = planParam && plans[planParam] ? planParam : null;

  useEffect(() => {
    if (plan) {
      const priceMap: Record<PlanKey, number> = {
        starter: 7,
        meadow: 9,
      };
      initiateCheckout(plans[plan].name, priceMap[plan]);
    }
  }, [plan]);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FDF8F0' }}>
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-2xl font-semibold mb-3" style={{ color: '#5C4033' }}>
            No plan selected
          </h1>
          <p className="mb-6" style={{ color: '#8B7355' }}>
            Please choose a plan to continue.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: '#7B9E6B', color: '#fff' }}
          >
            View Plans
          </a>
        </div>
      </div>
    );
  }

  const selectedPlan = plans[plan];

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#FDF8F0' }}>
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block mb-4">
            <span className="text-2xl font-semibold tracking-tight" style={{ color: '#5C4033' }}>
              Ink &amp; Meadow
            </span>
          </a>
          <h1 className="text-xl" style={{ color: '#8B7355' }}>
            Complete your order
          </h1>
        </div>

        {/* Order Summary Card */}
        <div
          className="rounded-2xl p-8 mb-6 border"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E8DFD0',
            boxShadow: '0 4px 24px rgba(92, 64, 51, 0.06)',
          }}
        >
          {/* Plan badge */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ backgroundColor: '#EFF5EB', color: '#5A7D4A' }}
            >
              {plan === 'starter' ? 'One-Time Purchase' : 'Monthly Membership'}
            </span>
          </div>

          {/* Plan name and price */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-1" style={{ color: '#5C4033' }}>
              {selectedPlan.name}
            </h2>
            <p className="text-sm mb-4" style={{ color: '#8B7355' }}>
              {selectedPlan.description}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold" style={{ color: '#5C4033' }}>
                {selectedPlan.price}
              </span>
              <span className="text-lg" style={{ color: '#8B7355' }}>
                {selectedPlan.interval}
              </span>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6" style={{ borderColor: '#E8DFD0' }} />

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {selectedPlan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#7B9E6B"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm" style={{ color: '#5C4033' }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Error message */}
          {error && (
            <div
              className="rounded-lg px-4 py-3 mb-4 text-sm"
              style={{ backgroundColor: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' }}
            >
              {error}
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 rounded-xl text-lg font-semibold transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              backgroundColor: loading ? '#9DB894' : '#7B9E6B',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.target as HTMLButtonElement).style.backgroundColor = '#6A8E5A';
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.target as HTMLButtonElement).style.backgroundColor = '#7B9E6B';
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Redirecting to checkout...
              </span>
            ) : (
              `Complete Purchase — ${selectedPlan.price}${selectedPlan.interval !== 'one-time' ? selectedPlan.interval : ''}`
            )}
          </button>

          {/* Security note */}
          <p className="text-center text-xs mt-4" style={{ color: '#A89B8C' }}>
            <svg
              className="inline w-3.5 h-3.5 mr-1 -mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Secure checkout powered by Stripe
          </p>
        </div>

        {/* Cancel link */}
        <p className="text-center text-sm" style={{ color: '#A89B8C' }}>
          Changed your mind?{' '}
          <a href="/" className="underline transition-colors" style={{ color: '#7B9E6B' }}>
            Go back
          </a>
        </p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FDF8F0' }}>
          <div className="animate-pulse text-center">
            <p style={{ color: '#8B7355' }}>Loading checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
