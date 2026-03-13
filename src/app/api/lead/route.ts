import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as { email?: string };

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const supabase = getServiceClient();

    // Upsert as lead — won't overwrite existing active members
    const { data: existing } = await supabase
      .from('members')
      .select('status')
      .eq('email', email)
      .single();

    if (existing && existing.status === 'active') {
      // Already a paying member — don't downgrade to lead
      return NextResponse.json({ ok: true, already_member: true });
    }

    const { error } = await supabase
      .from('members')
      .upsert(
        {
          email,
          plan: 'free',
          status: 'lead',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'email' },
      );

    if (error) {
      console.error('[Lead] Failed to upsert:', error);
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Lead capture error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
