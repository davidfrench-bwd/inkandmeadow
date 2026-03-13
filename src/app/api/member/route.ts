import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')?.trim().toLowerCase();

  if (!email) {
    return NextResponse.json(
      { error: 'Missing required query parameter: email' },
      { status: 400 },
    );
  }

  try {
    const supabase = getServiceClient();

    // Fetch the member record
    const { data: member, error: memberError } = await supabase
      .from('members')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (memberError) {
      console.error('[Member API] Error fetching member:', memberError);
      return NextResponse.json({ error: 'Failed to fetch member' }, { status: 500 });
    }

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Fetch purchases for the member
    const { data: purchases, error: purchasesError } = await supabase
      .from('purchases')
      .select('*')
      .eq('member_id', member.id)
      .order('created_at', { ascending: false });

    if (purchasesError) {
      console.error('[Member API] Error fetching purchases:', purchasesError);
      return NextResponse.json({ error: 'Failed to fetch purchases' }, { status: 500 });
    }

    return NextResponse.json({ member, purchases });
  } catch (err) {
    console.error('[Member API] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
