'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { initiateCheckout } from '@/lib/pixel';

const STORAGE_BASE = 'https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-04';

const PREVIEW_IMAGES = [
  { file: '01_kitten-on-books.png', alt: 'Kitten on Books' },
  { file: '03_baby-rabbits-wildflowers.png', alt: 'Baby Rabbits' },
  { file: '14_corgi-flower-basket.png', alt: 'Corgi in Flowers' },
  { file: '17_bunny-teacup-daisies.png', alt: 'Bunny & Teacup' },
];

const plans = {
  starter: {
    name: 'Starter Collection',
    price: '$7',
    interval: 'one-time',
    description: '30 hand-curated cottagecore coloring pages',
    valueNote: "That's just 23\u00a2 per page",
    features: [
      '30 curated cottagecore illustrations',
      'Instant digital download',
      'Print-ready PDF + iPad-compatible PNG',
      'Yours to keep forever',
    ],
  },
  meadow: {
    name: 'Meadow Membership',
    price: '$9',
    interval: '/mo',
    description: 'Starter Collection + 30 new pages every month',
    valueNote: "60 pages month one \u2014 just 15\u00a2 per page",
    features: [
      'Starter Collection included (30 pages)',
      '30 brand-new pages every month',
      'Full access to growing library',
      'PDF + PNG formats (print & iPad)',
      'Private community access',
      'Cancel anytime',
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
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="font-heading text-2xl font-semibold text-bark mb-3">
            No plan selected
          </h1>
          <p className="text-bark/60 mb-6">
            Please choose a plan to continue.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-full font-medium bg-sage text-white hover:bg-sage-dark transition-colors"
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
    <div className="min-h-screen bg-cream px-4 py-12">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-block mb-2">
            <span className="font-heading text-2xl font-semibold text-bark tracking-tight">
              Ink &amp; Meadow
            </span>
          </a>
          <p className="text-bark/50 text-sm">Complete your order</p>
        </div>

        {/* Image Preview Strip */}
        <div className="flex justify-center gap-2 md:gap-3 mb-2">
          {PREVIEW_IMAGES.map((img, i) => (
            <div
              key={img.file}
              className={`bg-white rounded-xl shadow-md border border-sage/10 p-1 w-20 md:w-28 ${
                i === 0 ? '-rotate-2' : i === 1 ? '-rotate-1' : i === 2 ? 'rotate-1' : 'rotate-2'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${STORAGE_BASE}/${img.file}`}
                alt={img.alt}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        <p className="text-bark/40 text-xs text-center mb-8 italic">
          A peek at what&rsquo;s inside your collection
        </p>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl p-8 border border-bark/5 shadow-sm mb-6">
          {/* Plan badge */}
          <div className="mb-5">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-sage/10 text-sage-dark">
              {plan === 'starter' ? 'One-Time Purchase' : 'Monthly Membership'}
            </span>
          </div>

          {/* Plan name and price */}
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-semibold text-bark mb-1">
              {selectedPlan.name}
            </h2>
            <p className="text-bark/60 text-sm mb-4">
              {selectedPlan.description}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-4xl font-bold text-bark">
                {selectedPlan.price}
              </span>
              <span className="text-bark/50 text-lg">
                {selectedPlan.interval}
              </span>
            </div>
            <p className="text-sage text-xs font-medium mt-1">
              {selectedPlan.valueNote}
            </p>
          </div>

          <hr className="border-bark/10 my-6" />

          {/* Features */}
          <ul className="space-y-3 mb-6">
            {selectedPlan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5 text-sage"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-bark">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Meadow bonus: price anchoring */}
          {plan === 'meadow' && (
            <div className="bg-golden/5 border border-golden/20 rounded-lg px-4 py-3 mb-6 flex items-start gap-2.5">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-golden" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-sm text-bark">
                <span className="font-semibold">Starter Collection ($7 value) included free</span>{' '}
                <span className="text-bark/60">with your membership</span>
              </p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="rounded-lg px-4 py-3 mb-4 text-sm bg-red-50 text-red-800 border border-red-200">
              {error}
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 rounded-xl text-lg font-semibold bg-sage text-white hover:bg-sage-dark transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-sage/20"
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
              `Continue to Payment \u2014 ${selectedPlan.price}${selectedPlan.interval !== 'one-time' ? selectedPlan.interval : ''}`
            )}
          </button>

          {/* Security note */}
          <p className="text-center text-xs text-bark/40 mt-4 flex items-center justify-center gap-1">
            <svg
              className="w-3.5 h-3.5"
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

        {/* Guarantee */}
        <div className="bg-sage/5 rounded-xl border border-sage/15 p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold text-bark mb-1">
                30-Day Money-Back Guarantee
              </h3>
              <p className="text-bark/60 text-sm">
                Not in love with your pages? Email us within 30 days for a full refund. No questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex items-center gap-1.5 text-bark/40 text-xs">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Checkout
          </div>
          <div className="flex items-center gap-1.5 text-bark/40 text-xs">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Instant Access
          </div>
          <div className="flex items-center gap-1.5 text-bark/40 text-xs">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {plan === 'meadow' ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              )}
            </svg>
            {plan === 'meadow' ? 'Cancel Anytime' : 'Yours to Keep'}
          </div>
        </div>

        {/* Back link */}
        <p className="text-center text-sm text-bark/40">
          Changed your mind?{' '}
          <a href="/" className="underline text-sage hover:text-sage-dark transition-colors">
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
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="animate-pulse text-center">
            <p className="text-bark/60">Loading checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
