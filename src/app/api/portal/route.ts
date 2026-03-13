import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServiceClient } from '@/lib/supabase';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as { email?: string };

    if (!email) {
      return NextResponse.json(
        { error: 'Missing required field: email' },
        { status: 400 },
      );
    }

    const supabase = getServiceClient();

    // Look up the member's Stripe customer ID
    const { data: member, error: memberError } = await supabase
      .from('members')
      .select('stripe_customer_id')
      .eq('email', email)
      .single();

    if (memberError || !member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 },
      );
    }

    if (!member.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No Stripe customer associated with this account' },
        { status: 400 },
      );
    }

    const origin = request.nextUrl.origin;

    const session = await getStripe().billingPortal.sessions.create({
      customer: member.stripe_customer_id,
      return_url: `${origin}/portal/account`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Portal session error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
