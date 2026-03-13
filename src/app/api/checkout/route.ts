import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!.trim(), {
    apiVersion: '2026-02-25.clover',
  });
}

const planConfig = {
  starter: {
    name: 'Starter Collection',
    description: '30 hand-curated cottagecore coloring pages',
    amount: 700, // $7.00
    mode: 'payment' as const,
  },
  meadow: {
    name: 'Meadow Membership',
    description: '10 new pages monthly + growing library + community',
    amount: 900, // $9.00
    mode: 'subscription' as const,
  },
  cottage: {
    name: 'Cottage Membership',
    description: 'Everything in Meadow + physical booklet + supplies',
    amount: 4900, // $49.00
    mode: 'subscription' as const,
  },
} as const;

type PlanKey = keyof typeof planConfig;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, email } = body as { plan: string; email?: string };

    if (!plan || !planConfig[plan as PlanKey]) {
      return NextResponse.json(
        { error: 'Invalid plan. Must be one of: starter, meadow, cottage' },
        { status: 400 }
      );
    }

    const config = planConfig[plan as PlanKey];
    const origin = request.nextUrl.origin;

    const isRecurring = config.mode === 'subscription';

    const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
      currency: 'usd',
      product_data: {
        name: config.name,
        description: config.description,
      },
      unit_amount: config.amount,
      ...(isRecurring && {
        recurring: {
          interval: 'month',
        },
      }),
    };

    const metadata: Record<string, string> = { plan };
    if (plan === 'starter') {
      metadata.upsell = 'true';
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: config.mode,
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      success_url: `${origin}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?plan=${plan}`,
      metadata,
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
