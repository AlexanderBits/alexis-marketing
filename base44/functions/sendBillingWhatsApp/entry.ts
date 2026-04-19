import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
const EVOLUTION_URL = Deno.env.get('EVOLUTION_API_URL');
const EVOLUTION_KEY = Deno.env.get('EVOLUTION_API_KEY');
const EVOLUTION_INSTANCE = Deno.env.get('EVOLUTION_INSTANCE');

async function sendWhatsApp(phone, message) {
  const url = `${EVOLUTION_URL}/message/sendText/${EVOLUTION_INSTANCE}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': EVOLUTION_KEY,
    },
    body: JSON.stringify({
      number: phone,
      text: message,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Evolution API error: ${err}`);
  }
  return await res.json();
}

async function createStripePaymentLink(subscription) {
  const planPriceMap = {
    bronze: 'price_bronze', // Substitua pelos Price IDs reais do Stripe
    prata: 'price_prata',
    ouro: 'price_ouro',
  };

  // Criar uma sessão de checkout única para este cliente
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'brl',
        product_data: {
          name: `Plano ${subscription.selected_plan.charAt(0).toUpperCase() + subscription.selected_plan.slice(1)} - Alexis Marketing`,
        },
        unit_amount: Math.round(subscription.amount * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    metadata: {
      contractId: subscription.id,
    },
    customer_email: subscription.customer_email,
    success_url: `${Deno.env.get('BASE44_APP_ID') ? 'https://app.base44.com' : 'https://localhost'}/pagamento-confirmado`,
    cancel_url: `${Deno.env.get('BASE44_APP_ID') ? 'https://app.base44.com' : 'https://localhost'}/pagamento-cancelado`,
  });

  return session.url;
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();

  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const { subscription_id } = await req.json();

  const subscriptions = await base44.asServiceRole.entities.Subscription.filter({ id: subscription_id });
  const subscription = subscriptions[0];

  if (!subscription) {
    return Response.json({ error: 'Assinatura não encontrada' }, { status: 404 });
  }

  let paymentLink = '';
  let whatsappStatus = 'enviado';
  let details = '';

  try {
    paymentLink = await createStripePaymentLink(subscription);
  } catch (err) {
    details = `Erro ao gerar link Stripe: ${err.message}`;
    paymentLink = '';
  }

  const planLabel = { bronze: 'Bronze', prata: 'Prata', ouro: 'Ouro' }[subscription.selected_plan] || subscription.selected_plan;
  const message = paymentLink
    ? `Olá ${subscription.customer_name}! 👋\n\nSua mensalidade do Plano *${planLabel}* no valor de *R$ ${subscription.amount.toFixed(2)}* está disponível para pagamento.\n\n💳 Pague pelo link abaixo:\n${paymentLink}\n\nQualquer dúvida, estamos à disposição. 🚀\n\n_Alexis Marketing_`
    : `Olá ${subscription.customer_name}! 👋\n\nSua mensalidade do Plano *${planLabel}* no valor de *R$ ${subscription.amount.toFixed(2)}* está vencendo. Entre em contato para efetuar o pagamento.\n\n_Alexis Marketing_`;

  try {
    await sendWhatsApp(subscription.customer_whatsapp, message);
  } catch (err) {
    whatsappStatus = 'falhou';
    details += ` | Erro WhatsApp: ${err.message}`;
  }

  // Registrar no log
  await base44.asServiceRole.entities.PaymentLog.create({
    subscription_id: subscription.id,
    customer_name: subscription.customer_name,
    event_type: 'cobranca_enviada',
    amount: subscription.amount,
    whatsapp_status: whatsappStatus,
    details: details || `Link enviado via WhatsApp para ${subscription.customer_whatsapp}`,
  });

  return Response.json({ success: whatsappStatus === 'enviado', whatsapp_status: whatsappStatus, payment_link: paymentLink });
});