import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase-server';
import { getServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Get the authenticated user from the session cookie
    const supabase = await getSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const email = user.email;
    const serviceClient = getServiceClient();

    // Fetch the member record
    const { data: member, error: memberError } = await serviceClient
      .from('members')
      .select('id, email, plan, status, stripe_customer_id, stripe_subscription_id, created_at')
      .eq('email', email)
      .single();

    if (memberError || !member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Fetch all coloring pages
    const { data: pages, error: pagesError } = await serviceClient
      .from('coloring_pages')
      .select('id, title, theme, collection_month, collection_name, is_premium, file_url, sort_order')
      .order('collection_month', { ascending: false })
      .order('sort_order', { ascending: true });

    if (pagesError) {
      console.error('[Portal Data] Failed to fetch pages:', pagesError);
      return NextResponse.json({ error: 'Failed to load pages' }, { status: 500 });
    }

    return NextResponse.json({ member, pages: pages ?? [] });
  } catch (err) {
    console.error('[Portal Data] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
