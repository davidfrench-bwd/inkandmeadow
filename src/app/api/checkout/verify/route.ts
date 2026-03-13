import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',
  });
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id parameter' }, { status: 400 });
    }

    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    if (session.status !== 'complete') {
      return NextResponse.json(
        { error: 'Checkout session is not complete' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      plan: session.metadata?.plan || null,
      email: session.customer_email || session.customer_details?.email || null,
      customer_id: session.customer || null,
      status: session.status,
      upsell: session.metadata?.upsell === 'true',
    });
  } catch (err) {
    console.error('Verify session error:', err);
    const message = err instanceof Error ? err.message : 'Failed to verify session';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
