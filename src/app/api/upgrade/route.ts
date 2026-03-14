import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServiceClient } from '@/lib/supabase';
import { sendMetaEvent } from '@/lib/meta-capi';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!.trim(), {
    apiVersion: '2026-02-25.clover',
  });
}

export async function POST(request: NextRequest) {
  try {
    const { session_id, discount } = (await request.json()) as {
      session_id: string;
      discount?: boolean;
    };

    if (!session_id) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }

    const stripe = getStripe();

    // Retrieve the checkout session to get subscription info
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.status !== 'complete') {
      return NextResponse.json({ error: 'Checkout session is not complete' }, { status: 400 });
    }

    const subscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription?.id;

    if (!subscriptionId) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 400 });
    }

    // Retrieve the subscription to get the current item
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const currentItem = subscription.items.data[0];

    if (!currentItem) {
      return NextResponse.json({ error: 'No subscription item found' }, { status: 400 });
    }

    // Check if already upgraded (price is $29)
    const currentAmount = currentItem.price?.unit_amount;
    if (currentAmount && currentAmount >= 2900) {
      return NextResponse.json({ error: 'Already upgraded to Plus' }, { status: 400 });
    }

    // Determine the Plus price to use
    let plusPriceId = process.env.STRIPE_PRICE_PLUS;

    if (!plusPriceId) {
      // Create an ad-hoc price if no saved price exists
      const price = await stripe.prices.create({
        currency: 'usd',
        unit_amount: 2900,
        recurring: { interval: 'month' },
        product_data: {
          name: 'Ink & Meadow Plus',
        },
      });
      plusPriceId = price.id;
    }

    // If downsell discount requested, create a one-time coupon for $10 off
    let couponId: string | undefined;
    if (discount) {
      const coupon = await stripe.coupons.create({
        amount_off: 1000,
        currency: 'usd',
        duration: 'once',
        name: 'Plus Downsell - $10 Off First Month',
      });
      couponId = coupon.id;
    }

    // Swap the subscription item to Plus
    await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: currentItem.id,
          price: plusPriceId,
        },
      ],
      proration_behavior: 'create_prorations',
      ...(couponId ? { coupon: couponId } : {}),
    });

    // Update member record in Supabase
    const email = session.customer_email || session.customer_details?.email;
    if (email) {
      const supabase = getServiceClient();
      await supabase
        .from('members')
        .update({
          plan: 'plus',
          updated_at: new Date().toISOString(),
        })
        .eq('email', email);

      // Fire Meta CAPI event for the upgrade
      await sendMetaEvent({
        event_name: 'Purchase',
        email,
        event_source_url: 'https://inkandmeadow.com/upsell',
        event_id: `upgrade_${session_id}`,
        custom_data: {
          currency: 'USD',
          value: discount ? 12 : 22, // upgrade value ($19-$7 or $29-$7)
          content_name: discount ? 'plus_downsell_upgrade' : 'plus_upgrade',
        },
      });
    }

    return NextResponse.json({ success: true, plan: 'plus' });
  } catch (err) {
    console.error('Upgrade error:', err);
    const message = err instanceof Error ? err.message : 'Failed to upgrade';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
