import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',
  });
}

export async function POST(request: NextRequest) {
  let event: Stripe.Event;

  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook signature verification failed';
    console.error('Webhook signature error:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const plan = session.metadata?.plan;
        const email = session.customer_email || session.customer_details?.email;

        console.log(`[Checkout Complete] Plan: ${plan}, Email: ${email}, Session: ${session.id}`);

        if (plan === 'starter') {
          console.log(`[One-Time Purchase] Starter Collection purchased by ${email}`);
          // TODO: Grant access to starter collection downloads
          // TODO: Store purchase in Supabase
        } else if (plan === 'meadow' || plan === 'cottage') {
          console.log(`[New Subscription] ${plan} membership started by ${email}`);
          // TODO: Create member record in Supabase
          // TODO: Grant access to member portal
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Subscription Created] ID: ${subscription.id}, Status: ${subscription.status}`);
        // TODO: Update member status in Supabase
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Subscription Cancelled] ID: ${subscription.id}`);
        // TODO: Revoke member access in Supabase
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Payment Succeeded] Invoice: ${invoice.id}, Amount: ${invoice.amount_paid}, Customer: ${invoice.customer}`);
        // TODO: Log payment in Supabase
        // TODO: Unlock next month's content if recurring
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
