import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
const EVOLUTION_URL = Deno.env.get('EVOLUTION_API_URL');
const EVOLUTION_KEY = Deno.env.get('EVOLUTION_API_KEY');
const EVOLUTION_INSTANCE = Deno.env.get('EVOLUTION_INSTANCE');

const PLAN_PRICE_IDS = {
  bronze: 'price_1TNv2kDHf3DkRIVWhxqz8x1c',
  prata:  'price_1TNv2lDHf3DkRIVWFJZyWXKE',
  ouro:   'price_1TNv2lDHf3DkRIVWxWQGFmFo',
};

async function sendWhatsApp(phone, message) {
  const url = `${EVOLUTION_URL}/message/sendText/${EVOLUTION_INSTANCE}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': EVOLUTION_KEY },
    body: JSON.stringify({ number: phone, text: message }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Evolution API error: ${err}`);
  }
  return await res.json();
}

async function createStripePaymentLink(subscription) {
  const priceId = PLAN_PRICE_IDS[subscription.selected_plan];
  if (!priceId) return null;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'boleto'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    subscription_data: { metadata: { subscriptionId: subscription.id } },
    metadata: { subscriptionId: subscription.id },
    customer_email: subscription.customer_email,
    success_url: 'https://alexismarketing.com.br/briefing?payment=success',
    cancel_url: 'https://alexismarketing.com.br/',
  });

  return session.url;
}

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  // Aceitar tanto chamada agendada (sem user) quanto manual (admin)
  let isScheduled = false;
  try {
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Acesso negado' }, { status: 403 });
    }
  } catch {
    // Chamada agendada não tem user — aceita via service role
    isScheduled = true;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];

  // Buscar assinaturas ativas ou pendentes com vencimento até hoje
  const allSubs = await base44.asServiceRole.entities.Subscription.list('-due_date', 500);

  const dueSubs = allSubs.filter(s => {
    if (s.status === 'cancelado') return false;
    if (!s.due_date) return false;
    const due = new Date(s.due_date);
    due.setHours(0, 0, 0, 0);
    return due <= today;
  });

  const results = [];

  for (const sub of dueSubs) {
    let paymentLink = '';
    let whatsappStatus = 'enviado';
    let details = '';

    try {
      paymentLink = await createStripePaymentLink(sub);
    } catch (err) {
      details = `Erro Stripe: ${err.message}`;
    }

    const planLabel = { bronze: 'Bronze', prata: 'Prata', ouro: 'Ouro' }[sub.selected_plan] || sub.selected_plan;
    const dueDateFormatted = new Date(sub.due_date).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const message = paymentLink
      ? `Olá ${sub.customer_name}! 👋\n\nSua mensalidade do Plano *${planLabel}* no valor de *R$ ${sub.amount.toFixed(2)}* vence hoje (${dueDateFormatted}).\n\n💳 Pague agora pelo link abaixo:\n${paymentLink}\n\nAceitamos cartão, boleto e Pix. ✅\n\n_Alexis Marketing_`
      : `Olá ${sub.customer_name}! 👋\n\nSua mensalidade do Plano *${planLabel}* no valor de *R$ ${sub.amount.toFixed(2)}* vence hoje (${dueDateFormatted}). Entre em contato para efetuar o pagamento.\n\n_Alexis Marketing_`;

    try {
      await sendWhatsApp(sub.customer_whatsapp, message);
    } catch (err) {
      whatsappStatus = 'falhou';
      details += ` | Erro WhatsApp: ${err.message}`;
    }

    // Marcar como atrasado se já passou do vencimento
    const dueDate = new Date(sub.due_date);
    dueDate.setHours(0, 0, 0, 0);
    if (dueDate < today && sub.status !== 'atrasado') {
      await base44.asServiceRole.entities.Subscription.update(sub.id, { status: 'atrasado' });
    }

    // Registrar log
    await base44.asServiceRole.entities.PaymentLog.create({
      subscription_id: sub.id,
      customer_name: sub.customer_name,
      event_type: 'cobranca_enviada',
      amount: sub.amount,
      whatsapp_status: whatsappStatus,
      details: details || `Cobrança automática enviada para ${sub.customer_whatsapp} — vencimento ${dueDateFormatted}`,
    });

    results.push({ id: sub.id, name: sub.customer_name, whatsapp_status: whatsappStatus, payment_link: paymentLink });
  }

  return Response.json({
    success: true,
    processed: results.length,
    date: todayStr,
    results,
  });
});