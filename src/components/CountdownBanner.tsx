'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function getEndDate(): Date {
  // End date is always 3 days from first visit, stored in localStorage
  if (typeof window === 'undefined') return new Date();

  const stored = localStorage.getItem('im_launch_end');
  if (stored) {
    return new Date(stored);
  }

  // First visit — set end date 3 days from now
  const end = new Date();
  end.setDate(end.getDate() + 3);
  localStorage.setItem('im_launch_end', end.toISOString());
  return end;
}

function getTimeLeft(end: Date): { days: number; hours: number; minutes: number; seconds: number } | null {
  const diff = end.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const end = getEndDate();
    setTimeLeft(getTimeLeft(end));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(end));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    // SSR / first render — show static banner without timer
    return (
      <div className="fixed top-[65px] left-0 right-0 z-40 bg-bark text-white text-center py-2 px-4 text-sm">
        <span className="font-medium">Launch Special:</span> 30 coloring pages for just $7
        <span className="text-white/60 ml-1">(regular $12)</span>
        <span className="mx-2 text-white/30">|</span>
        <Link href="/checkout?plan=starter" className="underline font-medium hover:text-golden transition-colors">
          Grab it now
        </Link>
      </div>
    );
  }

  if (!timeLeft) {
    // Timer expired — show "last chance" instead
    return (
      <div className="fixed top-[65px] left-0 right-0 z-40 bg-rose text-white text-center py-2 px-4 text-sm">
        <span className="font-medium">Final Hours!</span> Launch pricing ends soon &mdash;
        <Link href="/checkout?plan=starter" className="underline font-medium hover:text-white/80 ml-1 transition-colors">
          Get 30 pages for $7
        </Link>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="fixed top-[65px] left-0 right-0 z-40 bg-bark text-white text-center py-2 px-4 text-sm">
      <span className="font-medium">Launch Special:</span> 30 pages for $7
      <span className="text-white/60 ml-1">(regular $12)</span>
      <span className="mx-2 text-white/30">|</span>
      <span className="font-mono text-golden font-medium">
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
      <span className="mx-2 text-white/30 hidden sm:inline">|</span>
      <Link href="/checkout?plan=starter" className="underline font-medium hover:text-golden transition-colors hidden sm:inline">
        Grab it now
      </Link>
    </div>
  );
}
