import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const body = await req.json();

        const {
            client_name,
            client_cpf,
            client_email,
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
        if (!client_name || !client_cpf || !client_email || !client_cep || !client_street || 
            !client_number || !client_neighborhood || !client_city || !client_state || !selected_plan) {
            return Response.json({ 
                success: false, 
                error: 'Todos os campos são obrigatórios' 
            }, { status: 400 });
        }

        // Gerar texto completo do contrato
        const contractFullText = `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CONSULTORIA TÉCNICA E TREINAMENTO EM INFORMÁTICA

CONTRATADO: ISRAEL DE OLIVEIRA PINHEIRO
CNPJ: 65.739.462/0001-70
Endereço: RUA A4, nº 400, Bairro PARADA IDEAL, GUAPIMIRIM/RJ, CEP 25942-716

CONTRATANTE: ${client_name}
CPF: ${client_cpf}
E-mail: ${client_email}
Endereço: ${client_street}, ${client_number} - ${client_neighborhood}, ${client_city}/${client_state}, CEP: ${client_cep}

PLANO CONTRATADO: ${selected_plan.toUpperCase()}
VALOR MENSAL: R$ ${plan_value.toFixed(2)}

O CONTRATANTE declara ter lido e aceito todas as cláusulas deste contrato, incluindo:
- Período de fidelidade de 2 (dois) anos
- Multa de 30% do valor remanescente em caso de rescisão antecipada
- Disponibilização de plataforma digital (site institucional padrão) em regime de comodato
- Gratuidade vinculada à manutenção do contrato por 12 meses
- Indenização de R$ 1.500,00 em caso de rescisão antecipada (implementação técnica)

Data de Aceite: ${new Date().toLocaleString('pt-BR')}
`;

        // Salvar contrato no banco de dados
        const contract = await base44.asServiceRole.entities.Contract.create({
            client_name,
            client_cpf,
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

        // Enviar e-mail para o cliente
        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: "Alexis Marketing & Dev",
            to: client_email,
            subject: "Confirmação de Contrato - Alexis Marketing & Dev",
            body: `
<h2>Contrato Aceito com Sucesso!</h2>
<p>Olá ${client_name},</p>
<p>Seu contrato foi registrado com sucesso. Segue abaixo uma cópia:</p>
<pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; font-size: 12px; white-space: pre-wrap;">
${contractFullText}
</pre>
<p>Obrigado por confiar em nossos serviços!</p>
<p><strong>Alexis Marketing & Dev</strong></p>
            `
        });

        // Enviar e-mail para o administrador
        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: "Sistema de Contratos",
            to: "pastoralexdocavaco@gmail.com",
            subject: `Novo Contrato: ${client_name} - Plano ${selected_plan.toUpperCase()}`,
            body: `
<h2>Novo Contrato Registrado</h2>
<p><strong>Cliente:</strong> ${client_name}</p>
<p><strong>CPF:</strong> ${client_cpf}</p>
<p><strong>E-mail:</strong> ${client_email}</p>
<p><strong>Plano:</strong> ${selected_plan.toUpperCase()}</p>
<p><strong>Valor:</strong> R$ ${plan_value.toFixed(2)}/mês</p>
<p><strong>Endereço:</strong> ${client_street}, ${client_number} - ${client_neighborhood}, ${client_city}/${client_state}, CEP: ${client_cep}</p>
<hr>
<pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; font-size: 12px; white-space: pre-wrap;">
${contractFullText}
</pre>
            `
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