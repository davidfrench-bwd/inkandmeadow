'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        window.location.href = '/free-sample';
        return;
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-6">
        <p className="font-heading text-2xl font-semibold text-sage mb-2">Check your inbox!</p>
        <p className="text-bark/60 text-sm">
          Your 3 free coloring pages are on their way. While you wait, why not grab the full collection?
        </p>
        <a
          href="/checkout"
          className="inline-block mt-4 bg-sage text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-sage-dark transition-colors"
        >
          Get All 100+ Pages &mdash; $7/mo
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-5 py-3.5 rounded-full border border-bark/15 bg-white text-bark text-sm focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 placeholder:text-bark/40"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-sage text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-sage-dark transition-colors disabled:opacity-50 shrink-0"
        >
          {status === 'loading' ? 'Sending...' : 'Send My Pages'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-rose text-xs mt-2 text-center">Something went wrong. Please try again.</p>
      )}
      <p className="text-bark/30 text-xs mt-3 text-center">No spam, ever. Unsubscribe anytime.</p>
    </form>
  );
}
