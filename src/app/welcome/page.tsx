'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { purchase } from '@/lib/pixel';

interface SessionData {
  plan: string | null;
  email: string | null;
  customer_id: string | null;
  status: string;
  upsell: boolean;
}

function WelcomeContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const purchaseTracked = useRef(false);

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
      .then((data: SessionData) => {
        setSession(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setLoading(false);
      });
  }, [sessionId]);

  useEffect(() => {
    if (session && session.status === 'complete' && !purchaseTracked.current) {
      purchaseTracked.current = true;
      const priceMap: Record<string, number> = {
        starter: 7,
        meadow: 9,
        cottage: 49,
      };
      const value = session.plan ? priceMap[session.plan] ?? 0 : 0;
      purchase(
        session.plan || 'unknown',
        value,
        sessionId || ''
      );
    }
  }, [session, sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FDF8F0' }}>
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#7B9E6B" strokeWidth="4" />
            <path className="opacity-75" fill="#7B9E6B" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p style={{ color: '#8B7355' }}>Confirming your purchase...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FDF8F0' }}>
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-semibold mb-3" style={{ color: '#5C4033' }}>
            Something went wrong
          </h1>
          <p className="mb-6" style={{ color: '#8B7355' }}>
            {error || 'We could not verify your purchase. Please contact support.'}
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-lg font-medium"
            style={{ backgroundColor: '#7B9E6B', color: '#fff' }}
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  const plan = session.plan;

  return (
    <div className="min-h-screen px-4 py-16" style={{ backgroundColor: '#FDF8F0' }}>
      <div className="max-w-2xl mx-auto text-center">
        {/* Success checkmark */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ backgroundColor: '#EFF5EB' }}
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="#5A7D4A" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Starter Collection */}
        {plan === 'starter' && (
          <>
            <h1 className="text-3xl font-bold mb-3" style={{ color: '#5C4033' }}>
              Your Starter Collection is ready!
            </h1>
            <p className="text-lg mb-8" style={{ color: '#8B7355' }}>
              Thank you for your purchase! Your 27 cottagecore coloring pages are waiting for you.
            </p>

            <a
              href="/downloads/starter"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold transition-colors mb-12"
              style={{ backgroundColor: '#7B9E6B', color: '#fff' }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Your Pages
            </a>

            {/* Upsell */}
            {session.upsell && (
              <div
                className="rounded-2xl p-8 mt-8 border text-left"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E8DFD0',
                  boxShadow: '0 4px 24px rgba(92, 64, 51, 0.06)',
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: '#7B9E6B' }}
                >
                  Love these pages?
                </p>
                <h2 className="text-xl font-semibold mb-2" style={{ color: '#5C4033' }}>
                  Get 10 new pages every month for just $9/mo
                </h2>
                <p className="mb-6" style={{ color: '#8B7355' }}>
                  Join the Meadow Membership and never run out of beautiful pages to color.
                  Plus, get access to our growing library and members-only community.
                </p>
                <a
                  href="/checkout?plan=meadow"
                  className="inline-block px-6 py-3 rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: '#7B9E6B', color: '#fff' }}
                >
                  Join the Meadow — $9/mo
                </a>
              </div>
            )}
          </>
        )}

        {/* Meadow Membership */}
        {plan === 'meadow' && (
          <>
            <h1 className="text-3xl font-bold mb-3" style={{ color: '#5C4033' }}>
              Welcome to the Meadow!
            </h1>
            <p className="text-lg mb-8" style={{ color: '#8B7355' }}>
              Your membership is active. You now have access to our full library of coloring pages,
              and 10 new ones are on their way to you every month.
            </p>

            <div
              className="rounded-2xl p-8 mb-8 border text-left"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E8DFD0',
                boxShadow: '0 4px 24px rgba(92, 64, 51, 0.06)',
              }}
            >
              <h2 className="text-lg font-semibold mb-4" style={{ color: '#5C4033' }}>
                What happens next
              </h2>
              <ul className="space-y-3">
                {[
                  'Explore the full page library in your member portal',
                  'Download and print any pages you like',
                  'Join the members-only community',
                  '10 new pages will arrive on the 1st of each month',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                      style={{ backgroundColor: '#EFF5EB', color: '#5A7D4A' }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ color: '#5C4033' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/portal"
              className="inline-block px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
              style={{ backgroundColor: '#7B9E6B', color: '#fff' }}
            >
              Go to Your Member Portal
            </a>
          </>
        )}

        {/* Cottage Membership */}
        {plan === 'cottage' && (
          <>
            <h1 className="text-3xl font-bold mb-3" style={{ color: '#5C4033' }}>
              Welcome to the Cottage!
            </h1>
            <p className="text-lg mb-8" style={{ color: '#8B7355' }}>
              You have the ultimate Ink &amp; Meadow experience. 50+ pages monthly,
              exclusive collections, and premium perks — all yours.
            </p>

            <div
              className="rounded-2xl p-8 mb-8 border text-left"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E8DFD0',
                boxShadow: '0 4px 24px rgba(92, 64, 51, 0.06)',
              }}
            >
              <h2 className="text-lg font-semibold mb-4" style={{ color: '#5C4033' }}>
                What happens next
              </h2>
              <ul className="space-y-3">
                {[
                  'Explore the full page library in your member portal',
                  'Download exclusive premium collections available only to Cottage members',
                  'Join the members-only community with Cottage-exclusive channels',
                  '50+ new pages arrive on the 1st of every month',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                      style={{ backgroundColor: '#EFF5EB', color: '#5A7D4A' }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ color: '#5C4033' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-xl p-5 mb-8 text-sm text-left"
              style={{ backgroundColor: '#FFF8ED', border: '1px solid #F0DFC0', color: '#8B6914' }}
            >
              <strong>Cottage Tip:</strong> Head to your portal to browse the exclusive premium
              collections and printable wall art. New content drops on the 1st of every month!
            </div>

            <a
              href="/portal"
              className="inline-block px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
              style={{ backgroundColor: '#7B9E6B', color: '#fff' }}
            >
              Go to Your Member Portal
            </a>
          </>
        )}

        {/* Fallback for unknown plan */}
        {!plan && (
          <>
            <h1 className="text-3xl font-bold mb-3" style={{ color: '#5C4033' }}>
              Thank you for your purchase!
            </h1>
            <p className="text-lg mb-8" style={{ color: '#8B7355' }}>
              Your order has been confirmed. Check your email for details.
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
              style={{ backgroundColor: '#7B9E6B', color: '#fff' }}
            >
              Go Home
            </a>
          </>
        )}

        {/* Footer note */}
        <p className="mt-12 text-sm" style={{ color: '#A89B8C' }}>
          A confirmation email has been sent to{' '}
          {session.email ? (
            <strong style={{ color: '#8B7355' }}>{session.email}</strong>
          ) : (
            'your email address'
          )}
          . If you have any questions, reach out to us anytime.
        </p>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FDF8F0' }}>
          <div className="text-center">
            <svg className="animate-spin h-8 w-8 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#7B9E6B" strokeWidth="4" />
              <path className="opacity-75" fill="#7B9E6B" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p style={{ color: '#8B7355' }}>Loading...</p>
          </div>
        </div>
      }
    >
      <WelcomeContent />
    </Suspense>
  );
}
