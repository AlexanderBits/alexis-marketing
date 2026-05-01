import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Recebendo dados do formulário
    const body = await req.json();
    const { customer_name, customer_email, customer_whatsapp } = body;

    console.log('Recebendo checkout para:', customer_email);

    if (!customer_email || !customer_whatsapp) {
      return Response.json({ error: 'E-mail e WhatsApp são obrigatórios.' });
    }

    // Buscando o ID do preço via plan_key (padrão do projeto)
    const planKey = 'software_annual';
    let priceId = '';
    
    try {
      const prices = await stripe.prices.search({
        query: `active:'true' AND metadata['plan_key']:'${planKey}'`,
      });

      if (prices.data.length > 0) {
        priceId = prices.data[0].id;
      } else {
        return Response.json({ 
          error: `Produto '${planKey}' não encontrado no Stripe. Execute a função setupStripeProducts para configurar.` 
        });
      }
    } catch (stripeError) {
      console.error('Erro ao buscar no Stripe:', stripeError);
      return Response.json({ error: 'Erro na comunicação com o Stripe: ' + stripeError.message });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      metadata: { 
        customer_name,
        customer_whatsapp,
        product: 'gestao_obras_v2.8',
        license_type: '12_months'
      },
      customer_email: customer_email,
      success_url: `${req.headers.get('origin')}/gestao-obras?payment=success`,
      cancel_url: `${req.headers.get('origin')}/gestao-obras?payment=cancelled`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Erro crítico na função:', error);
    return Response.json({ error: 'Erro interno: ' + error.message });
  }
});
