import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Esta função é chamada pelo cron diário
// Verifica contratos vencidos/vencendo hoje e marca como atrasado
Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();

  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Acesso negado' }, { status: 403 });
  }

  const today = new Date().toISOString().split('T')[0];

  // Buscar assinaturas ativas com vencimento anterior a hoje
  const allActive = await base44.asServiceRole.entities.Subscription.filter({ status: 'ativo' });
  const overdue = allActive.filter(s => s.due_date && s.due_date < today);

  const updated = [];
  for (const sub of overdue) {
    await base44.asServiceRole.entities.Subscription.update(sub.id, { status: 'atrasado' });
    await base44.asServiceRole.entities.PaymentLog.create({
      subscription_id: sub.id,
      customer_name: sub.customer_name,
      event_type: 'pagamento_falhou',
      amount: sub.amount,
      whatsapp_status: 'nao_aplicavel',
      details: `Marcado como atrasado automaticamente. Vencimento: ${sub.due_date}`,
    });
    updated.push(sub.id);
  }

  return Response.json({ success: true, overdue_updated: updated.length, ids: updated });
});