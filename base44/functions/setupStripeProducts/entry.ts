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
  // Software License
  { key: 'software_annual', name: 'Software Controle e Custos - Licença Anual', amount: 49700 }, // R$ 497,00
];


Deno.serve(async (req) => {
  const alexis = createClientFromRequest(req);
  const user = await alexis.auth.me();

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

    // Verificar se já existe um Price ativo para este produto
    const isSoftware = plan.key.includes('software');
    const existingPrices = await stripe.prices.list({
      product: product.id,
      active: true,
      // Se for software, procuramos por um preço 'one_time', senão 'recurring'
      type: isSoftware ? 'one_time' : 'recurring',
    });
    
    let price;
    if (existingPrices.data.length > 0) {
      price = existingPrices.data[0];
    } else {
      const priceData: any = {
        product: product.id,
        unit_amount: plan.amount,
        currency: 'brl',
        metadata: { plan_key: plan.key },
      };

      if (!isSoftware) {
        priceData.recurring = { interval: 'month' };
      }

      price = await stripe.prices.create(priceData);
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
