import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServiceClient } from '@/lib/supabase';
import { sendMetaEvent } from '@/lib/meta-capi';

export const dynamic = 'force-dynamic';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!.trim(), {
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
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!.trim());
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

        if (email) {
          const supabase = getServiceClient();
          const customerId =
            typeof session.customer === 'string'
              ? session.customer
              : session.customer?.id ?? null;

          // Upsert member record (works for both one-time and subscription plans)
          const { error: memberError } = await supabase
            .from('members')
            .upsert(
              {
                email,
                stripe_customer_id: customerId,
                plan: plan ?? 'starter',
                status: 'active',
                updated_at: new Date().toISOString(),
              },
              { onConflict: 'email' },
            );

          if (memberError) {
            console.error('[Checkout] Failed to upsert member:', memberError);
          }

          // Fetch the member id for the purchases FK
          const { data: member } = await supabase
            .from('members')
            .select('id')
            .eq('email', email)
            .single();

          // Record the purchase
          const productName = session.metadata?.product ?? plan ?? 'unknown';
          const amountCents = session.amount_total ?? 0;

          const { error: purchaseError } = await supabase
            .from('purchases')
            .insert({
              member_id: member?.id ?? null,
              email,
              product: productName,
              stripe_session_id: session.id,
              amount_cents: amountCents,
            });

          if (purchaseError) {
            console.error('[Checkout] Failed to insert purchase:', purchaseError);
          }

          if (plan === 'starter') {
            console.log(`[One-Time Purchase] Starter Collection purchased by ${email}`);
          } else if (plan === 'meadow') {
            console.log(`[New Subscription] ${plan} membership started by ${email}`);
          }

          // Fire server-side Purchase event to Meta CAPI
          const purchaseValue = (session.amount_total ?? 0) / 100;
          await sendMetaEvent({
            event_name: 'Purchase',
            email,
            event_source_url: 'https://inkandmeadow.com/welcome',
            event_id: session.id,
            custom_data: {
              currency: 'USD',
              value: purchaseValue,
              content_name: plan,
            },
          });
        }
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Subscription Created] ID: ${subscription.id}, Status: ${subscription.status}`);

        const customerId =
          typeof subscription.customer === 'string'
            ? subscription.customer
            : subscription.customer?.id ?? null;

        if (customerId) {
          const supabase = getServiceClient();
          const { error } = await supabase
            .from('members')
            .update({
              stripe_subscription_id: subscription.id,
              status: subscription.status === 'active' ? 'active' : subscription.status,
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_customer_id', customerId);

          if (error) {
            console.error('[Subscription Created] Failed to update member:', error);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Subscription Cancelled] ID: ${subscription.id}`);

        {
          const supabase = getServiceClient();
          const { error } = await supabase
            .from('members')
            .update({
              status: 'cancelled',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', subscription.id);

          if (error) {
            console.error('[Subscription Deleted] Failed to update member:', error);
          }
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Payment Succeeded] Invoice: ${invoice.id}, Amount: ${invoice.amount_paid}, Customer: ${invoice.customer}`);

        const invoiceCustomerId =
          typeof invoice.customer === 'string'
            ? invoice.customer
            : invoice.customer?.id ?? null;

        if (invoiceCustomerId) {
          const supabase = getServiceClient();
          const { error } = await supabase
            .from('members')
            .update({
              status: 'active',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_customer_id', invoiceCustomerId);

          if (error) {
            console.error('[Invoice Payment] Failed to update member:', error);
          }
        }
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
