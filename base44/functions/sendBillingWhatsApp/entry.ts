import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));
const EVOLUTION_URL = Deno.env.get('EVOLUTION_API_URL');
const EVOLUTION_KEY = Deno.env.get('EVOLUTION_API_KEY');
const EVOLUTION_INSTANCE = Deno.env.get('EVOLUTION_INSTANCE');

async function sendWhatsApp(phone, message) {
  const baseUrl = (EVOLUTION_URL || '').replace(/\/$/, '').replace('https://', 'http://');
  const url = `${baseUrl}/message/sendText/${EVOLUTION_INSTANCE}`;
  
  const payload = {
    number: phone,
    text: message,
    options: { delay: 1200 },
  };

  const executeRequest = async (targetPhone) => {
    payload.number = targetPhone;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': EVOLUTION_KEY,
        'Connection': 'close',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(30000),
    });

    const responseText = await res.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { error: responseText };
    }

    return { ok: res.ok, status: res.status, data: responseData };
  };

  // Primeira tentativa
  let attempt = await executeRequest(phone);

  // Lógica de auto-correção para Brasil (DDI 55)
  // Se o número não existe (exists: false ou status 400), tenta ajustar o 9º dígito
  if (!attempt.ok && phone.startsWith('55')) {
    const ddd = phone.substring(2, 4);
    const body = phone.substring(4);
    let alternativePhone = null;

    if (body.length === 9 && body.startsWith('9')) {
      // Remover o 9 (ex: 5521999998888 -> 552199998888)
      alternativePhone = `55${ddd}${body.substring(1)}`;
    } else if (body.length === 8) {
      // Adicionar o 9 (ex: 552199998888 -> 5521999998888)
      alternativePhone = `55${ddd}9${body}`;
    }

    if (alternativePhone) {
      console.log(`[DEBUG] Tentando auto-correção para: ${alternativePhone}`);
      const secondAttempt = await executeRequest(alternativePhone);
      if (secondAttempt.ok) return secondAttempt.data;
    }
  }

  if (!attempt.ok) {
    throw new Error(JSON.stringify(attempt.data));
  }
  
  return attempt.data;
}

// Price IDs reais criados no Stripe (recorrentes mensais em BRL)
const PLAN_PRICE_IDS = {
  simple: 'price_1TNv2kDHf3DkRIVWmTBKSVw5',
  bronze: 'price_1TNv2kDHf3DkRIVWhxqz8x1c',
  prata:  'price_1TNv2lDHf3DkRIVWFJZyWXKE',
  ouro:   'price_1TNv2lDHf3DkRIVWxWQGFmFo',
};

async function createStripePaymentLink(subscription) {
  const priceId = PLAN_PRICE_IDS[subscription.selected_plan];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    subscription_data: {
      metadata: { contractId: subscription.id },
    },
    metadata: { contractId: subscription.id },
    customer_email: subscription.customer_email,
    success_url: 'https://alexismarketing.com.br/pagamento-confirmado',
    cancel_url: 'https://alexismarketing.com.br/pagamento-cancelado',
  });

  return session.url;
}

Deno.serve(async (req) => {
  const alexis = createClientFromRequest(req);
  const user = await alexis.auth.me();

  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const body = await req.json();
  const { subscription_id } = body;

  // Debug: retornar config se solicitado
  if (body.debug) {
    return Response.json({
      evolution_url: EVOLUTION_URL,
      evolution_instance: EVOLUTION_INSTANCE,
      evolution_key_set: !!EVOLUTION_KEY,
      evolution_key_prefix: EVOLUTION_KEY ? EVOLUTION_KEY.substring(0, 6) + '...' : 'NÃO DEFINIDA',
    });
  }

  const allSubscriptions = await alexis.asServiceRole.entities.Subscription.list();
  const subscription = allSubscriptions.find(s => s.id === subscription_id);

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

  // Normalizar WhatsApp: garantir que começa com 55
  const rawPhone = (subscription.customer_whatsapp || '').replace(/\D/g, '');
  const phone = rawPhone.startsWith('55') ? rawPhone : `55${rawPhone}`;

  try {
    await sendWhatsApp(phone, message);
  } catch (err) {
    whatsappStatus = 'falhou';
    details += ` | Erro WhatsApp: ${err.message} | URL: ${EVOLUTION_URL}/message/sendText/${EVOLUTION_INSTANCE} | Phone: ${phone}`;
  }

  // Registrar no log
  await alexis.asServiceRole.entities.PaymentLog.create({
    subscription_id: subscription.id,
    customer_name: subscription.customer_name,
    event_type: 'cobranca_enviada',
    amount: subscription.amount,
    whatsapp_status: whatsappStatus,
    details: details || `Link enviado via WhatsApp para ${subscription.customer_whatsapp}`,
  });

  return Response.json({ success: whatsappStatus === 'enviado', whatsapp_status: whatsappStatus, payment_link: paymentLink, details });
});
