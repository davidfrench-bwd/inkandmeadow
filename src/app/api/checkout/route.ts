import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!.trim(), {
    apiVersion: '2026-02-25.clover',
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as { plan?: string; email?: string };

    const origin = request.nextUrl.origin;

    const priceConfig = process.env.STRIPE_PRICE_MEADOW
      ? { price: process.env.STRIPE_PRICE_MEADOW }
      : {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Ink & Meadow',
              description: '100 pages instantly + 100 new pages every month + full library',
            },
            unit_amount: 700,
            recurring: { interval: 'month' as const },
          },
        };

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      line_items: [
        {
          ...priceConfig,
          quantity: 1,
        },
      ],
      success_url: `${origin}/upsell?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        plan: 'meadow',
        upsell: 'true',
      },
    };

    if (email) {
      sessionParams.customer_email = email;
    }

    const session = await getStripe().checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
