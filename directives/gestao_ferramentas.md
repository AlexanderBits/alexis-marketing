# Directive: Gestão do Negócio e Ferramentas
> Guia do Agente para gestão de assinaturas e escolha de ferramentas produtivas.

Este documento define o conhecimento necessário para o Agente Alexis ajudar na gestão do negócio, especialmente na escolha de ferramentas e automação de cobranças.

## 1. Categorização de Ferramentas (Knowledge Base)

O Agente deve sugerir estas ferramentas baseando-se no problema do usuário:

### Gerenciamento de Projetos e Tarefas
- **Linear**: Ideal para rastreamento de issues e gestão de projetos técnicos/SaaS. Use para desenvolvimento de software.
- **ClickUp / Wrike**: Gestão de projetos completa, boa para equipes de marketing e operações.
- **Google Tasks**: Simples, para to-dos diários e individuais.

### Comunicação e Reuniões
- **Microsoft Teams**: Chat corporativo, canais e reuniões integradas ao Office 365.
- **Slack**: Melhor para comunicação ágil, integrações e comunidades.
- **Google Meet**: Videoconferências simples e integradas ao calendário.
- **Calendly**: Automação de agendamentos. Enviar link para o cliente escolher horário.

### Documentos e Produtividade
- **Microsoft SharePoint / OneDrive**: Armazenamento em nuvem corporativo.
- **Google Drive / Docs / Sheets / Slides**: Colaboração em tempo real. Essencial para rastrear pagamentos em planilhas.
- **Notion**: Base de conhecimento, CRM pessoal e organização de processos.

### Vendas, CRM e Pagamentos
- **Stripe**: Gateway de pagamentos principal. Gestão de assinaturas e recorrência.
- **HubSpot**: CRM completo, marketing automation e rastreio de deals.
- **Salesforce**: CRM robusto para grandes operações.
- **Splitwise**: Divisão de despesas (uso mais informal ou pequenas parcerias).

### Desenvolvimento e Marketing
- **GitHub / GitLab**: Repositórios de código e CI/CD.
- **Supabase**: Backend, banco de dados e autenticação rápida.
- **Contentful**: CMS headless para gerir conteúdo de sites sem mexer no código.
- **Wix**: Criação de sites rápida (No-Code).
- **Hugging Face**: Modelos de IA e inferência.

---

## 2. Sistema de Cobrança e Assinaturas (SOP)

### Fluxo de Pagamento Mensal
1. **Identificação**: O sistema deve monitorar a `created_date` no `Alexis.entities.Contract`.
2. **Ciclo**: O dia do pagamento é o dia do mês equivalente ao aceite do contrato.
3. **Lembrete**:
   - 3 dias antes: Enviar aviso de "Cobrança Próxima".
   - No dia: Enviar o link de fatura/pix.
   - 3 dias depois: Enviar lembrete de atraso.

### Ferramentas para Integração
- Use **Stripe** ou **Mercado Pago** para automatizar o checkout.
- Use **WhatsApp (via Alexis/API)** para enviar os lembretes automáticos.

---

## 3. Comportamento do Agente
Quando perguntado sobre o que usar:
1. Analise o tamanho do problema.
2. Sugira 1 ou 2 ferramentas da lista acima.
3. Explique o *porquê* da escolha.
