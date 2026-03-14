'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { purchase } from '@/lib/pixel';

const STORAGE_BASE =
  'https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-04';

const PREMIUM_PREVIEWS = [
  { file: '06_owl-family-tree.png', alt: 'Owl Family' },
  { file: '10_hen-chicks-cottage.png', alt: 'Hen & Chicks' },
  { file: '13_mice-pumpkin-cottage.png', alt: 'Mice Cottage' },
  { file: '20_fox-lantern-garden.png', alt: 'Fox & Lantern' },
  { file: '22_flower-garden-mandala.png', alt: 'Garden Mandala' },
  { file: '27_hammock-reading-dog.png', alt: 'Hammock & Dog' },
];

const TIMER_MINUTES = 10;

function useCountdown(startOnVerified: boolean) {
  const [secondsLeft, setSecondsLeft] = useState(TIMER_MINUTES * 60);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnVerified || started.current) return;
    started.current = true;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startOnVerified]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const expired = secondsLeft <= 0;

  return { minutes, seconds, expired };
}

function UpsellContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDownsell, setShowDownsell] = useState(false);
  const purchaseTracked = useRef(false);

  const { minutes, seconds, expired } = useCountdown(verified);

  // Verify the checkout session
  useEffect(() => {
    if (!sessionId) {
      setError('No session found.');
      setLoading(false);
      return;
    }

    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not verify your purchase');
        return res.json();
      })
      .then((data) => {
        if (data.status === 'complete') {
          setVerified(true);
          if (!purchaseTracked.current) {
            purchaseTracked.current = true;
            purchase('meadow', 7, sessionId);
          }
        } else {
          setError('Checkout is not complete.');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setLoading(false);
      });
  }, [sessionId]);

  const handleUpgrade = useCallback(async (discount?: boolean) => {
    setUpgrading(true);
    setError(null);

    try {
      const res = await fetch('/api/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          ...(discount ? { discount: true } : {}),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upgrade failed');
      }

      window.location.href = `/welcome?session_id=${sessionId}&upgraded=true`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setUpgrading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#7B9E6B" strokeWidth="4" />
            <path className="opacity-75" fill="#7B9E6B" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-bark/60">Confirming your purchase...</p>
        </div>
      </div>
    );
  }

  if (error && !verified) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-cream">
        <div className="text-center max-w-md">
          <h1 className="font-heading text-2xl font-semibold text-bark mb-3">
            Something went wrong
          </h1>
          <p className="text-bark/60 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-full font-medium bg-sage text-white hover:bg-sage-dark transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  // Downsell view
  if (showDownsell) {
    return (
      <div className="min-h-screen bg-cream px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-bark mb-2">
              Wait &mdash; one more thing
            </h1>
            <p className="text-bark/50 text-sm">
              We don&rsquo;t want you to miss out.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-sage/30 shadow-md mb-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage text-white text-xs font-semibold px-4 py-1 rounded-full">
              Special Offer
            </div>

            <h2 className="font-heading text-2xl font-bold text-bark text-center mb-2 mt-2">
              Try Plus for just $19
            </h2>
            <p className="text-bark/60 text-center mb-6">
              Get your first month of <strong>Ink &amp; Meadow Plus</strong> for
              $19 instead of $29. 300 exclusive pages, premium collections, everything.
            </p>

            {/* Mini preview */}
            <div className="flex justify-center gap-2 mb-6">
              {PREMIUM_PREVIEWS.slice(0, 3).map((img) => (
                <div key={img.file} className="bg-cream rounded-lg border border-sage/10 p-0.5 w-20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${STORAGE_BASE}/${img.file}`}
                    alt={img.alt}
                    className="w-full aspect-square object-cover rounded"
                  />
                </div>
              ))}
            </div>

            <div className="bg-sage/5 border border-sage/15 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-bark">
                <span className="line-through text-bark/40">$29/mo</span>
                {' '}
                <span className="font-bold text-sage text-lg">$19 your first month</span>
              </p>
              <p className="text-bark/50 text-xs mt-1">Then $29/mo. Cancel anytime.</p>
            </div>

            {error && (
              <div className="rounded-lg px-4 py-3 mb-4 text-sm bg-red-50 text-red-800 border border-red-200">
                {error}
              </div>
            )}

            <button
              onClick={() => handleUpgrade(true)}
              disabled={upgrading}
              className="w-full py-4 rounded-xl text-lg font-semibold bg-sage text-white hover:bg-sage-dark transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-sage/20"
            >
              {upgrading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Upgrading...
                </span>
              ) : (
                'Yes! Try Plus for $19 \u2014 Save $10'
              )}
            </button>

            <p className="text-center text-xs text-bark/40 mt-3">
              One click. No re-entering payment. 30-day money-back guarantee.
            </p>
          </div>

          <div className="text-center">
            <a
              href={`/welcome?session_id=${sessionId}`}
              className="text-bark/40 text-sm hover:text-bark/60 transition-colors"
            >
              No thanks, I don&rsquo;t need 300 exclusive pages or premium collections &rarr;
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Main upsell view
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="min-h-screen bg-cream px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Confirmation header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-bark mb-2">
            You&rsquo;re in! Your membership is active.
          </h1>
          <p className="text-bark/50 text-sm">
            100 pages are ready in your portal &mdash; but first...
          </p>
        </div>

        {/* Upsell card */}
        <div className="bg-white rounded-2xl p-8 border-2 border-golden/30 shadow-md mb-6 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-golden text-white text-xs font-semibold px-4 py-1 rounded-full">
            One-Time Offer
          </div>

          {/* Countdown timer */}
          {!expired && (
            <div className="text-center mb-4 mt-2">
              <p className="text-bark/50 text-xs uppercase tracking-wider mb-1">This offer expires in</p>
              <p className="font-mono text-2xl font-bold text-golden">
                {pad(minutes)}:{pad(seconds)}
              </p>
            </div>
          )}

          {expired && (
            <div className="text-center mb-4 mt-2">
              <p className="text-rose text-xs font-semibold uppercase tracking-wider">
                Offer expiring &mdash; last chance!
              </p>
            </div>
          )}

          <h2 className="font-heading text-2xl md:text-3xl font-bold text-bark text-center mb-2">
            Want Premium Collections &amp; Even More Pages?
          </h2>
          <p className="text-bark/60 text-center mb-6">
            Upgrade to <strong>Ink &amp; Meadow Plus</strong> and get 300 exclusive pages every month
            plus premium seasonal collections you won&rsquo;t find in the regular library.
          </p>

          {/* Premium page previews */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
            {PREMIUM_PREVIEWS.map((img) => (
              <div key={img.file} className="bg-cream rounded-lg border border-sage/10 p-0.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${STORAGE_BASE}/${img.file}`}
                  alt={img.alt}
                  className="w-full aspect-square object-cover rounded"
                />
              </div>
            ))}
          </div>

          {/* Value proposition */}
          <div className="bg-golden/5 border border-golden/20 rounded-xl p-5 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-bark/40 text-xs uppercase tracking-wider mb-1">Your plan</p>
                <p className="font-heading text-lg font-bold text-bark">100 pages/mo</p>
                <p className="text-bark/50 text-sm">$7/mo</p>
              </div>
              <div>
                <p className="text-golden text-xs uppercase tracking-wider font-semibold mb-1">Plus</p>
                <p className="font-heading text-lg font-bold text-bark">300 pages/mo</p>
                <p className="text-bark/50 text-sm">$29/mo</p>
              </div>
            </div>
            <div className="text-center mt-4 pt-4 border-t border-golden/15">
              <p className="text-sm text-bark">
                <span className="font-semibold">300 exclusive pages + premium collections for just $22 more</span>
                <span className="text-bark/50"> &mdash; that&rsquo;s less than $0.75/day</span>
              </p>
            </div>
          </div>

          {/* Plus features */}
          <ul className="space-y-2.5 mb-6">
            {[
              'Everything in your current membership',
              '300 exclusive pages delivered every month',
              'Premium seasonal collections',
              'Early access to new pages',
              'Same 30-day money-back guarantee',
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-golden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-bark">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Error */}
          {error && (
            <div className="rounded-lg px-4 py-3 mb-4 text-sm bg-red-50 text-red-800 border border-red-200">
              {error}
            </div>
          )}

          {/* Upgrade button */}
          <button
            onClick={() => handleUpgrade()}
            disabled={upgrading}
            className="w-full py-4 rounded-xl text-lg font-semibold bg-golden text-white hover:bg-golden/90 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-golden/20"
          >
            {upgrading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Upgrading...
              </span>
            ) : (
              'Yes! Upgrade Me to Plus \u2014 $29/mo'
            )}
          </button>

          <p className="text-center text-xs text-bark/40 mt-3">
            One click &mdash; no re-entering payment. Cancel anytime.
          </p>
        </div>

        {/* Decline — triggers downsell */}
        <div className="text-center">
          <button
            onClick={() => setShowDownsell(true)}
            className="text-bark/40 text-sm hover:text-bark/60 transition-colors cursor-pointer"
          >
            No thanks, I don&rsquo;t need premium collections or 300 exclusive pages per month &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UpsellPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="text-center">
            <svg className="animate-spin h-8 w-8 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#7B9E6B" strokeWidth="4" />
              <path className="opacity-75" fill="#7B9E6B" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-bark/60">Loading...</p>
          </div>
        </div>
      }
    >
      <UpsellContent />
    </Suspense>
  );
}
