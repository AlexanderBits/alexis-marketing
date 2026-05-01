import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Recebendo dados do formulário
    const { customer_name, customer_email, customer_whatsapp } = await req.json();

    if (!customer_email || !customer_whatsapp) {
      return Response.json({ error: 'E-mail e WhatsApp são obrigatórios.' }, { status: 400 });
    }

    // Buscando o produto de software no Stripe
    const prices = await stripe.prices.search({
      query: "active:'true' AND metadata['product_type']:'software_license'",
    });

    if (prices.data.length === 0) {
      return Response.json({ error: 'Produto de software não configurado no Stripe. Adicione metadata product_type=software_license.' }, { status: 400 });
    }

    const priceId = prices.data[0].id;

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
    return Response.json({ error: error.message }, { status: 500 });
  }
});
