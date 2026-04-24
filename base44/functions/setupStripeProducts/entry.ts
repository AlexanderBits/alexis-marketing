import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

// Planos do contrato Alexis Marketing
const PLANS = [
  { key: 'simple',  name: 'Plano Essencial',  amount: 2990  }, // R$ 29,90
  { key: 'bronze',  name: 'Plano Bronze',      amount: 4990  }, // R$ 49,90
  { key: 'prata',   name: 'Plano Prata',       amount: 9990  }, // R$ 99,90
  { key: 'ouro',    name: 'Plano Ouro',        amount: 19999 }, // R$ 199,99
  // Novos Níveis de Escala (Performance)
  { key: 'entry',   name: 'Plano Entry (Performance)',   amount: 40000  }, // R$ 400,00
  { key: 'starter', name: 'Plano Starter (Performance)', amount: 100000 }, // R$ 1.000,00
  { key: 'growth',  name: 'Plano Growth (Performance)',  amount: 250000 }, // R$ 2.500,00
  { key: 'scale',   name: 'Plano Scale (Performance)',   amount: 500000 }, // R$ 5.000,00
];


Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();

  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const results = {};

  for (const plan of PLANS) {
    // Verificar se já existe um produto com esse metadata
    const existingProducts = await stripe.products.search({
      query: `metadata['plan_key']:'${plan.key}'`,
    });

    let product;
    if (existingProducts.data.length > 0) {
      product = existingProducts.data[0];
    } else {
      product = await stripe.products.create({
        name: `${plan.name} - Alexis Marketing`,
        description: `Assinatura mensal do ${plan.name} - Consultoria e Gestão Digital`,
        metadata: { plan_key: plan.key },
      });
    }

    // Verificar se já existe um Price recorrente ativo para este produto
    const existingPrices = await stripe.prices.list({
      product: product.id,
      active: true,
      type: 'recurring',
    });

    let price;
    if (existingPrices.data.length > 0) {
      price = existingPrices.data[0];
    } else {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: plan.amount,
        currency: 'brl',
        recurring: { interval: 'month' },
        metadata: { plan_key: plan.key },
      });
    }

    results[plan.key] = {
      product_id: product.id,
      price_id: price.id,
      amount: plan.amount / 100,
      name: plan.name,
    };
  }

  return Response.json({ success: true, plans: results });
});