'use client';

import { useEffect, useState } from 'react';
import { initiateCheckout } from '@/lib/pixel';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-sm border-t border-sage/20 px-4 py-3 safe-area-bottom">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full text-center bg-sage text-white py-3 rounded-full text-sm font-medium shadow-md shadow-sage/20 cursor-pointer disabled:opacity-60"
      >
        {loading ? 'Redirecting...' : 'Join Ink \u0026 Meadow \u2014 $7/mo'}
      </button>
    </div>
  );
}
