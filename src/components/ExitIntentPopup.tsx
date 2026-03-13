'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  const dismiss = useCallback(() => {
    setShow(false);
    sessionStorage.setItem('im_exit_dismissed', '1');
  }, []);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('im_exit_dismissed')) return;

    // Desktop: detect mouse leaving viewport (toward tabs/URL bar)
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShow(true);
      }
    };

    // Mobile: detect back button via popstate
    // Push a fake history state so we can intercept "back"
    const onPopState = () => {
      setShow(true);
      // Re-push so they don't actually leave
      window.history.pushState({ exitIntent: true }, '');
    };

    // Small delay before arming — don't trigger immediately
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', onMouseLeave);
      window.history.pushState({ exitIntent: true }, '');
      window.addEventListener('popstate', onPopState);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={dismiss}
    >
      <div
        className="bg-cream rounded-2xl max-w-lg w-full p-8 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-bark/40 hover:text-bark transition-colors"
          onClick={dismiss}
          aria-label="Close"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="text-center">
          <p className="text-sage font-medium tracking-[0.2em] uppercase text-xs mb-3">
            Wait &mdash; before you go
          </p>
          <h3 className="font-heading text-3xl font-semibold text-bark mb-3">
            30 New Pages<br />Every Month
          </h3>

          {/* Mini image preview */}
          <div className="flex justify-center gap-2 my-6">
            {[
              '01_kitten-on-books.png',
              '05_fawn-in-meadow.png',
              '14_corgi-flower-basket.png',
            ].map((file) => (
              <div key={file} className="bg-white rounded-lg shadow-md border border-sage/10 p-1 w-24">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://aepxjohumvfzieltyrvq.supabase.co/storage/v1/object/public/coloring-pages/2026-04/${file}`}
                  alt="Free coloring page"
                  className="w-full aspect-square object-cover rounded"
                />
              </div>
            ))}
          </div>

          <p className="text-bark/60 text-sm mb-6">
            Join the Meadow and get the Starter Collection + 30 fresh pages every month. Cancel anytime.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/checkout?plan=meadow"
              className="bg-sage text-white py-3.5 rounded-full font-medium hover:bg-sage-dark transition-colors shadow-md shadow-sage/20"
              onClick={dismiss}
            >
              Join the Meadow &mdash; $9/mo
            </Link>
            <Link
              href="/checkout?plan=starter"
              className="block text-bark/70 text-sm font-medium hover:text-bark transition-colors py-2"
              onClick={dismiss}
            >
              Or just get 30 pages for $7
            </Link>
            <a
              href="#free-sample"
              className="block text-sage text-sm font-medium hover:text-sage-dark transition-colors py-1 underline underline-offset-2"
              onClick={dismiss}
            >
              Try 3 free pages first
            </a>
            <button
              onClick={dismiss}
              className="text-bark/40 text-xs hover:text-bark transition-colors py-1"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
