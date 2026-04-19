import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

Deno.serve(async (req) => {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);
  } catch (err) {
    return Response.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const base44 = createClientFromRequest(req);

  // Idempotência: checar se já processamos este evento
  const existingLogs = await base44.asServiceRole.entities.PaymentLog.filter({ stripe_event_id: event.id });
  if (existingLogs.length > 0) {
    return Response.json({ received: true, duplicate: true });
  }

  if (event.type === 'checkout.session.completed' || event.type === 'invoice.payment_succeeded') {
    const session = event.data.object;
    const contractId = session.metadata?.contractId || session.subscription_details?.metadata?.contractId;
    const stripeSubscriptionId = session.subscription || session.id;
    const stripeCustomerId = session.customer;
    const amountPaid = (session.amount_total || session.amount_paid || 0) / 100;

    let subscription = null;

    // 1) Tentar pelo stripe_subscription_id
    if (stripeSubscriptionId) {
      const results = await base44.asServiceRole.entities.Subscription.filter({ stripe_subscription_id: stripeSubscriptionId });
      subscription = results[0];
    }

    // 2) Fallback: buscar pelo email do cliente no Stripe
    if (!subscription && stripeCustomerId) {
      const stripeCustomer = await stripe.customers.retrieve(stripeCustomerId);
      const email = stripeCustomer?.email || session.customer_email;
      if (email) {
        const results = await base44.asServiceRole.entities.Subscription.filter({ customer_email: email });
        // pegar a mais recente pendente
        subscription = results.find(s => s.status === 'pendente') || results[0];
      }
    }

    // 3) Se encontrou, atualizar o stripe_subscription_id para buscas futuras
    if (subscription && stripeSubscriptionId && !subscription.stripe_subscription_id) {
      await base44.asServiceRole.entities.Subscription.update(subscription.id, {
        stripe_subscription_id: stripeSubscriptionId,
        stripe_customer_id: stripeCustomerId,
      });
    }

    if (subscription) {
      const nextDue = new Date();
      nextDue.setDate(nextDue.getDate() + 30);
      const nextDueStr = nextDue.toISOString().split('T')[0];

      await base44.asServiceRole.entities.Subscription.update(subscription.id, {
        status: 'ativo',
        last_payment_date: new Date().toISOString().split('T')[0],
        due_date: nextDueStr,
        stripe_subscription_id: stripeSubscriptionId || subscription.stripe_subscription_id,
        stripe_customer_id: stripeCustomerId || subscription.stripe_customer_id,
      });

      await base44.asServiceRole.entities.PaymentLog.create({
        subscription_id: subscription.id,
        customer_name: subscription.customer_name,
        event_type: 'pagamento_confirmado',
        amount: amountPaid,
        stripe_event_id: event.id,
        whatsapp_status: 'nao_aplicavel',
        details: `Evento: ${event.type}`,
      });
    }
  }

  if (event.type === 'customer.subscription.deleted' || event.type === 'invoice.payment_failed') {
    const obj = event.data.object;
    const stripeSubscriptionId = obj.subscription || obj.id;

    const results = await base44.asServiceRole.entities.Subscription.filter({ stripe_subscription_id: stripeSubscriptionId });
    const subscription = results[0];

    if (subscription) {
      const newStatus = event.type === 'customer.subscription.deleted' ? 'cancelado' : 'atrasado';
      await base44.asServiceRole.entities.Subscription.update(subscription.id, { status: newStatus });

      await base44.asServiceRole.entities.PaymentLog.create({
        subscription_id: subscription.id,
        customer_name: subscription.customer_name,
        event_type: event.type === 'customer.subscription.deleted' ? 'cancelamento' : 'pagamento_falhou',
        stripe_event_id: event.id,
        whatsapp_status: 'nao_aplicavel',
        details: `Evento: ${event.type}`,
      });
    }
  }

  return Response.json({ received: true });
});