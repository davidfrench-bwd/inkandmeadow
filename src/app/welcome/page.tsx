'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { purchase } from '@/lib/pixel';

const STORAGE_BASE = 'https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-04';

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

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-cream">
        <div className="text-center max-w-md">
          <h1 className="font-heading text-2xl font-semibold text-bark mb-3">
            Something went wrong
          </h1>
          <p className="text-bark/60 mb-6">
            {error || 'We could not verify your purchase. Please contact support.'}
          </p>
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

  const plan = session.plan;

  return (
    <div className="min-h-screen px-4 py-16 bg-cream">
      <div className="max-w-2xl mx-auto">
        {/* Success animation */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {plan === 'starter' && (
            <>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-bark mb-3">
                Your Starter Collection is ready!
              </h1>
              <p className="text-bark/60 text-lg max-w-md mx-auto">
                30 beautiful coloring pages are waiting for you. Time to pick up your pencils.
              </p>
            </>
          )}

          {plan === 'meadow' && (
            <>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-bark mb-3">
                Welcome to the Meadow!
              </h1>
              <p className="text-bark/60 text-lg max-w-md mx-auto">
                Your membership is active. 60 pages are ready for you right now, and 30 more arrive every month.
              </p>
            </>
          )}

          {!plan && (
            <>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-bark mb-3">
                Thank you for your purchase!
              </h1>
              <p className="text-bark/60 text-lg">
                Your order has been confirmed. Check your email for details.
              </p>
            </>
          )}
        </div>

        {/* Preview of what they got */}
        <div className="flex justify-center gap-2 md:gap-3 mb-10">
          {[
            { file: '01_kitten-on-books.png', rotate: '-rotate-3' },
            { file: '02_fox-under-roses.png', rotate: '-rotate-1' },
            { file: '05_fawn-in-meadow.png', rotate: 'rotate-1' },
            { file: '14_corgi-flower-basket.png', rotate: 'rotate-3' },
            { file: '25_cat-kitten-mandala.png', rotate: 'rotate-2' },
          ].map((img) => (
            <div
              key={img.file}
              className={`bg-white rounded-xl shadow-lg border border-sage/10 p-1 w-16 md:w-24 ${img.rotate}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${STORAGE_BASE}/${img.file}`}
                alt="Your coloring page"
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Starter: download + upsell */}
        {plan === 'starter' && (
          <>
            <div className="bg-white rounded-2xl p-8 border border-bark/5 shadow-sm text-center mb-8">
              <h2 className="font-heading text-xl font-semibold text-bark mb-2">
                Download Your Pages
              </h2>
              <p className="text-bark/60 text-sm mb-6">
                Your 30 pages are ready in both PDF (for printing) and PNG (for iPad).
              </p>
              <a
                href="/portal"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold bg-sage text-white hover:bg-sage-dark transition-colors shadow-md shadow-sage/20"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Go to Your Pages
              </a>
            </div>

            {/* Upsell to Meadow */}
            {session.upsell && (
              <div className="bg-white rounded-2xl p-8 border-2 border-sage/20 shadow-sm mb-8 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage text-white text-xs font-medium px-4 py-1 rounded-full">
                  Upgrade & Save
                </div>

                <div className="flex gap-2 justify-center mb-5 mt-2">
                  {[
                    '06_owl-family-tree.png',
                    '13_mice-pumpkin-cottage.png',
                    '20_fox-lantern-garden.png',
                  ].map((file) => (
                    <div key={file} className="bg-cream rounded-lg border border-sage/10 p-0.5 w-16 md:w-20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${STORAGE_BASE}/${file}`}
                        alt="New monthly page"
                        className="w-full aspect-square object-cover rounded"
                      />
                    </div>
                  ))}
                </div>

                <h3 className="font-heading text-xl font-semibold text-bark text-center mb-2">
                  Want 30 fresh pages every month?
                </h3>
                <p className="text-bark/60 text-sm text-center mb-5">
                  Join the Meadow and get 30 brand-new pages delivered monthly, plus access to
                  the full growing library. Your Starter Collection stays yours.
                </p>
                <div className="text-center">
                  <a
                    href="/checkout?plan=meadow"
                    className="inline-block px-8 py-3.5 rounded-full font-semibold bg-sage text-white hover:bg-sage-dark transition-colors shadow-md shadow-sage/20"
                  >
                    Join the Meadow &mdash; $9/mo
                  </a>
                  <p className="text-bark/40 text-xs mt-3">Cancel anytime. 30-day money-back guarantee.</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Meadow: next steps */}
        {plan === 'meadow' && (
          <div className="bg-white rounded-2xl p-8 border border-bark/5 shadow-sm mb-8">
            <h2 className="font-heading text-xl font-semibold text-bark mb-5 text-center">
              Here&rsquo;s what happens next
            </h2>
            <ul className="space-y-4 mb-8">
              {[
                { num: '1', text: 'Your Starter Collection (30 pages) is ready to download now' },
                { num: '2', text: 'Explore the full growing library in your member portal' },
                { num: '3', text: 'Join the private members-only community' },
                { num: '4', text: '30 brand-new pages arrive on the 1st of each month' },
              ].map((item) => (
                <li key={item.num} className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-sage-dark mt-0.5">
                    {item.num}
                  </span>
                  <span className="text-bark">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <a
                href="/portal"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold bg-sage text-white hover:bg-sage-dark transition-colors shadow-md shadow-sage/20"
              >
                Go to Your Member Portal
              </a>
            </div>
          </div>
        )}

        {/* Fallback */}
        {!plan && (
          <div className="text-center">
            <a
              href="/"
              className="inline-block px-8 py-4 rounded-xl text-lg font-semibold bg-sage text-white hover:bg-sage-dark transition-colors"
            >
              Go Home
            </a>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-bark/40 mt-8">
          A confirmation email has been sent to{' '}
          {session.email ? (
            <strong className="text-bark/60">{session.email}</strong>
          ) : (
            'your email address'
          )}
          . If you have any questions, just reply to that email.
        </p>
      </div>
    </div>
  );
}

export default function WelcomePage() {
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
      <WelcomeContent />
    </Suspense>
  );
}
