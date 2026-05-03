import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const WEBHOOK_SECRET = Deno.env.get('EVOLUTION_WEBHOOK_SECRET');

Deno.serve(async (req) => {
  // Apenas POST
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const alexis = createClientFromRequest(req);
    const body = await req.json();

    // Validar segredo se configurado
    if (WEBHOOK_SECRET && body.secret !== WEBHOOK_SECRET) {
      return Response.json({ error: 'Invalid webhook secret' }, { status: 401 });
    }

    const { subscription_id, action } = body;

    if (!subscription_id) {
      return Response.json({ error: 'subscription_id required' }, { status: 400 });
    }

    // Buscar assinatura
    const allSubscriptions = await alexis.asServiceRole.entities.Subscription.list();
    const subscription = allSubscriptions.find(s => s.id === subscription_id);

    if (!subscription) {
      return Response.json({ error: 'Subscription not found' }, { status: 404 });
    }

    // Registrar disparo no log
    await alexis.asServiceRole.entities.PaymentLog.create({
      subscription_id: subscription.id,
      customer_name: subscription.customer_name,
      event_type: 'cobranca_enviada',
      amount: subscription.amount,
      whatsapp_status: 'enviado',
      details: `Cobrança disparada via webhook reverso da Evolution API | Ação: ${action || 'cobranca'}`,
    });

    return Response.json({
      success: true,
      message: 'Billing notification recorded',
      subscription_id: subscription.id,
      customer: subscription.customer_name,
      phone: subscription.customer_whatsapp,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
