'use client';

import { useState } from 'react';
import { initiateCheckout } from '@/lib/pixel';

export default function LpCtaButton({ fullWidth }: { fullWidth?: boolean }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    initiateCheckout('Ink & Meadow', 7);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'meadow' }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${
        fullWidth ? 'w-full' : 'inline-block'
      } bg-sage text-white px-8 py-4 rounded-full font-medium hover:bg-sage-dark shadow-lg shadow-sage/20 transition-all text-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-3">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Redirecting...
        </span>
      ) : (
        'Join Ink \u0026 Meadow \u2014 $7/mo'
      )}
    </button>
  );
}
