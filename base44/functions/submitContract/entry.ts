import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        // Verificar autenticação do usuário
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ success: false, error: 'Não autorizado' }, { status: 401 });
        }

        const body = await req.json();

        const {
            client_type,
            client_name,
            client_cpf,
            client_cnpj,
            client_email,
            client_whatsapp,
            client_cep,
            client_street,
            client_number,
            client_neighborhood,
            client_city,
            client_state,
            selected_plan,
            plan_value
        } = body;

        // Validação básica
        if (!client_type || !client_name || !client_email || !client_cep || !client_street || 
            !client_number || !client_neighborhood || !client_city || !client_state || !selected_plan) {
            return Response.json({ 
                success: false, 
                error: 'Todos os campos são obrigatórios' 
            }, { status: 400 });
        }

        // Validar CPF ou CNPJ conforme tipo
        if (client_type === 'cpf' && !client_cpf) {
            return Response.json({ 
                success: false, 
                error: 'CPF é obrigatório para pessoa física' 
            }, { status: 400 });
        }

        if (client_type === 'cnpj' && !client_cnpj) {
            return Response.json({ 
                success: false, 
                error: 'CNPJ é obrigatório para pessoa jurídica' 
            }, { status: 400 });
        }

        // Gerar texto completo do contrato
        const clientIdentifier = client_type === 'cpf' ? `CPF: ${client_cpf}` : `CNPJ: ${client_cnpj}`;
        const contractFullText = `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CONSULTORIA TÉCNICA E TREINAMENTO EM INFORMÁTICA

CONTRATADO: ISRAEL DE OLIVEIRA PINHEIRO
CNPJ: 65.739.462/0001-70
Endereço: RUA A4, nº 400, Bairro PARADA IDEAL, GUAPIMIRIM/RJ, CEP 25942-716

CONTRATANTE: ${client_name}
${clientIdentifier}
E-mail: ${client_email}
Endereço: ${client_street}, ${client_number} - ${client_neighborhood}, ${client_city}/${client_state}, CEP: ${client_cep}

PLANO CONTRATADO: ${selected_plan.toUpperCase()}
VALOR MENSAL: R$ ${plan_value.toFixed(2)}
NOTA: O Plano Essencial possui escopo extremamente restrito e não se aplica a 98% dos modelos de negócio tradicionais.

O CONTRATANTE declara ter lido e aceito todas as cláusulas deste contrato, incluindo:
- Período de fidelidade de 1 (um) ano (ou conforme acertado na proposta por e-mail)
- Fidelidade dispensada caso a proposta mencione "sem complicações" ou "sem fidelidade contratual"
- Multa de 30% do valor remanescente em caso de rescisão antecipada (quando aplicável)
- Disponibilização de plataforma digital (site institucional padrão) em regime de comodato
- Gratuidade vinculada à manutenção do contrato por 12 meses
- Indenização de R$ 1.500,00 em caso de rescisão antecipada (implementação técnica)

Data de Aceite: ${new Date().toLocaleString('pt-BR')}
`;

        // Normalizar WhatsApp: garantir que começa com 55
        const rawWhatsapp = (client_whatsapp || '').replace(/\D/g, '');
        const normalizedWhatsapp = rawWhatsapp
            ? (rawWhatsapp.startsWith('55') ? rawWhatsapp : `55${rawWhatsapp}`)
            : '55';

        // Salvar contrato no banco de dados
        const contract = await base44.asServiceRole.entities.Contract.create({
            client_type,
            client_name,
            client_cpf,
            client_cnpj,
            client_email,
            client_cep,
            client_street,
            client_number,
            client_neighborhood,
            client_city,
            client_state,
            selected_plan,
            plan_value,
            accepted_at: new Date().toISOString(),
            contract_full_text: contractFullText
        });

        // Calcular vencimento (30 dias a partir de hoje)
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        const dueDateStr = dueDate.toISOString().split('T')[0];

        // Criar Subscription automaticamente
        await base44.asServiceRole.entities.Subscription.create({
            customer_name: client_name,
            customer_email: client_email,
            customer_whatsapp: normalizedWhatsapp,
            selected_plan,
            amount: plan_value,
            status: 'pendente',
            due_date: dueDateStr,
            origin: 'contrato_digital',
            notes: `Contrato ID: ${contract.id}`,
        });

        return Response.json({ 
            success: true, 
            contract_id: contract.id 
        });

    } catch (error) {
        console.error('Error in submitContract:', error);
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
});