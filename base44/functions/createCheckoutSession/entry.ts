import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

const PLAN_PRICE_IDS = {
  simple: 'price_1TNv2kDHf3DkRIVWmTBKSVw5',
  bronze: 'price_1TNv2kDHf3DkRIVWhxqz8x1c',
  prata:  'price_1TNv2lDHf3DkRIVWFJZyWXKE',
  ouro:   'price_1TNv2lDHf3DkRIVWxWQGFmFo',
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { selected_plan, customer_email, contract_id } = await req.json();

    const priceId = PLAN_PRICE_IDS[selected_plan];
    if (!priceId) {
      return Response.json({ error: 'Plano inválido' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      subscription_data: {
        metadata: { contractId: contract_id },
      },
      metadata: { contractId: contract_id },
      customer_email: customer_email,
      success_url: `${new URL(req.url).origin}/briefing?payment=success`,
      cancel_url: `${new URL(req.url).origin}/contrato?payment=cancelled`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});