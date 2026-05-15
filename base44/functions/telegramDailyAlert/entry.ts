import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const TELEGRAM_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

async function sendTelegram(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram error: ${err}`);
  }
  return await res.json();
}

Deno.serve(async (req) => {
  const alexis = createClientFromRequest(req);

  // Proteção contra chamadas não autorizadas
  const authHeader = req.headers.get('Authorization');
  const cronSecret = Deno.env.get('CRON_SECRET');
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];

  // Buscar assinaturas com vencimento hoje
  const allSubs = await alexis.asServiceRole.entities.Subscription.list('-due_date', 500);

  const dueTodaySubs = allSubs.filter(s => {
    if (s.status === 'cancelado') return false;
    if (!s.due_date) return false;
    return s.due_date.split('T')[0] === todayStr;
  });

  if (dueTodaySubs.length === 0) {
    return Response.json({ success: true, message: 'Nenhuma fatura vencendo hoje.' });
  }

  const planLabel = { bronze: 'Bronze', prata: 'Prata', ouro: 'Ouro' };

  let msg = `📅 *Faturas vencendo HOJE (${today.toLocaleDateString('pt-BR')})*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━\n\n`;

  for (const sub of dueTodaySubs) {
    const plano = planLabel[sub.selected_plan] || sub.selected_plan;
    msg += `👤 *${sub.customer_name}*\n`;
    msg += `📧 ${sub.customer_email}\n`;
    msg += `📱 ${sub.customer_whatsapp}\n`;
    msg += `💰 Plano ${plano} — R$ ${sub.amount.toFixed(2)}\n`;
    msg += `\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━\n`;
  msg += `Total: *${dueTodaySubs.length} fatura(s)* vencendo hoje.`;

  await sendTelegram(msg);

  return Response.json({
    success: true,
    count: dueTodaySubs.length,
    date: todayStr,
  });
});
