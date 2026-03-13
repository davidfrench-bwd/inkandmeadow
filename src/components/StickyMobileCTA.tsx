'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past hero (~500px)
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-sm border-t border-sage/20 px-4 py-3 safe-area-bottom">
      <div className="flex gap-3">
        <Link
          href="/checkout?plan=meadow"
          className="flex-[2] text-center bg-sage text-white py-3 rounded-full text-sm font-medium shadow-md shadow-sage/20"
        >
          Join the Meadow &mdash; $9/mo
        </Link>
        <Link
          href="/checkout?plan=starter"
          className="flex-1 text-center bg-cream-dark text-bark border border-bark/10 py-3 rounded-full text-sm font-medium"
        >
          $7
        </Link>
      </div>
    </div>
  );
}
