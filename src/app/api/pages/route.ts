import { NextRequest, NextResponse } from 'next/server';
import { getAnonClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = getAnonClient();
    const { searchParams } = request.nextUrl;

    let query = supabase
      .from('coloring_pages')
      .select('*')
      .order('sort_order', { ascending: true });

    // Filter by collection month (e.g. ?month=2026-03)
    const month = searchParams.get('month');
    if (month) {
      query = query.eq('collection_month', month);
    }

    // Filter by premium status (e.g. ?premium=true or ?premium=false)
    const premium = searchParams.get('premium');
    if (premium === 'true') {
      query = query.eq('is_premium', true);
    } else if (premium === 'false') {
      query = query.eq('is_premium', false);
    }

    const { data: pages, error } = await query;

    if (error) {
      console.error('[Pages API] Error fetching coloring pages:', error);
      return NextResponse.json({ error: 'Failed to fetch coloring pages' }, { status: 500 });
    }

    return NextResponse.json({ pages });
  } catch (err) {
    console.error('[Pages API] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
