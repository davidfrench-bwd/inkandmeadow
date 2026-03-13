import { createClient, SupabaseClient } from '@supabase/supabase-js';

let serviceClient: SupabaseClient | null = null;

/**
 * Returns a Supabase client using the service role key (bypasses RLS).
 * Use only in server-side API routes -- never expose to the browser.
 */
export function getServiceClient(): SupabaseClient {
  if (serviceClient) return serviceClient;

  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? '').trim();

  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  serviceClient = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  return serviceClient;
}

/**
 * Returns a Supabase client using the anon key (respects RLS).
 * Safe for public-facing reads where RLS allows SELECT.
 */
export function getAnonClient(): SupabaseClient {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim();
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').trim();

  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
