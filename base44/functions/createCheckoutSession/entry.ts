import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

// Função para buscar o ID do preço dinamicamente via Stripe Search
async function getPriceIdByPlanKey(planKey: string) {
  const prices = await stripe.prices.search({
    query: `active:'true' AND metadata['plan_key']:'${planKey}'`,
  });
  return prices.data.length > 0 ? prices.data[0].id : null;
}


Deno.serve(async (req) => {
  try {
    const alexis = createClientFromRequest(req);
    const user = await alexis.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { selected_plan, customer_email, contract_id } = await req.json();
    const priceId = await getPriceIdByPlanKey(selected_plan);

    if (!priceId) {
      return Response.json({ error: 'Plano inválido ou não configurado no Stripe' }, { status: 400 });
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
      success_url: `https://desenvolvimentodesites.dev.br/briefing?payment=success`,
      cancel_url: `https://desenvolvimentodesites.dev.br/contrato?payment=cancelled`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
