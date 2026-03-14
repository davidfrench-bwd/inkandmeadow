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
  const upgraded = searchParams.get('upgraded') === 'true';

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
      // Only track here if they came via upgrade (the initial purchase is tracked on the upsell page)
      if (upgraded) {
        purchase('plus', 29, sessionId || '');
      }
    }
  }, [session, sessionId, upgraded]);

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

  // Determine effective plan: if upgraded, show Plus experience
  const effectivePlan = upgraded ? 'plus' : session.plan;

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

          {effectivePlan === 'plus' && (
            <>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-bark mb-3">
                Welcome to Ink &amp; Meadow Plus!
              </h1>
              <p className="text-bark/60 text-lg max-w-md mx-auto">
                {upgraded
                  ? 'You upgraded successfully! 100 exclusive pages are ready for you, with 100 more arriving every month.'
                  : 'Your Plus membership is active. 100 exclusive pages are ready for you, with 100 more arriving every month.'}
              </p>
            </>
          )}

          {effectivePlan === 'meadow' && (
            <>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-bark mb-3">
                Welcome to Ink &amp; Meadow!
              </h1>
              <p className="text-bark/60 text-lg max-w-md mx-auto">
                Your membership is active. 100+ pages are ready for you right now, and 30 more arrive every month.
              </p>
            </>
          )}

          {!effectivePlan && (
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

        {/* Next steps */}
        <div className="bg-white rounded-2xl p-8 border border-bark/5 shadow-sm mb-8">
          <h2 className="font-heading text-xl font-semibold text-bark mb-5 text-center">
            Here&rsquo;s what happens next
          </h2>
          <ul className="space-y-4 mb-8">
            {(effectivePlan === 'plus'
              ? [
                  { num: '1', text: 'Your 100 exclusive coloring pages are ready to download now' },
                  { num: '2', text: 'Explore the full library including premium collections' },
                  { num: '3', text: '100 fresh exclusive pages arrive on the 1st of each month' },
                ]
              : [
                  { num: '1', text: 'Your 100+ coloring pages are ready to download now' },
                  { num: '2', text: 'Explore the full growing library in your member portal' },
                  { num: '3', text: '30 brand-new pages arrive on the 1st of each month' },
                ]
            ).map((item) => (
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

        {/* Fallback */}
        {!effectivePlan && (
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
