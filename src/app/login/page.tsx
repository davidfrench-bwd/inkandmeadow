'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/portal';
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = getSupabaseBrowserClient();
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`,
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      setSent(true);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-block mb-4">
            <span className="font-heading text-2xl font-semibold text-bark tracking-tight">
              Ink &amp; Meadow
            </span>
          </a>
          <h1 className="font-heading text-3xl font-semibold text-bark mb-2">
            Access Your Pages
          </h1>
          <p className="text-bark/60 text-sm">
            Enter the email you used to purchase and we&rsquo;ll send you a login link.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-bark/5 shadow-sm">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-heading text-xl font-semibold text-bark mb-2">
                Check your email
              </h2>
              <p className="text-bark/60 text-sm mb-6">
                We sent a login link to <strong className="text-bark">{email}</strong>.
                Click it to access your coloring pages.
              </p>
              <button
                onClick={() => { setSent(false); setEmail(''); }}
                className="text-sage text-sm hover:text-sage-dark transition-colors underline underline-offset-2"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="block text-sm font-medium text-bark mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-bark/10 bg-cream/50 text-bark placeholder:text-bark/30 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage/50 mb-4"
              />

              {error && (
                <p className="text-red-600 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold bg-sage text-white hover:bg-sage-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-sage/20"
              >
                {loading ? 'Sending...' : 'Send Login Link'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-bark/40 text-xs mt-6">
          Don&rsquo;t have an account yet?{' '}
          <a href="/#pricing" className="text-sage hover:text-sage-dark underline underline-offset-2">
            Get your coloring pages
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-bark/60 text-sm">Loading...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
