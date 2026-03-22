# Diretiva: Gestão de Leads - Redes Sociais e GMN

## 🎯 Objetivo
Capturar informações de contato (Email e WhatsApp) de prospectos interessados nos serviços de Gestão de Redes Sociais e Google Meu Negócio, salvando-os em um banco de dados centralizado e facilitando o atendimento administrativo.

## ⚙️ Arquitetura
O sistema opera com um fluxo de 3 camadas para garantir a captura do lead antes do contato comercial:
1.  **Captura Front-end:** Modal interceptador (`LeadModal.jsx`) acionado por botões de CTA.
2.  **Persistência (Banco):** Envio dos dados para a entidade `SocialMediaLead` no Base44.
3.  **Conversão:** Redirecionamento automático para o WhatsApp após o sucesso da captura.

## 🛠️ Ferramentas e Scripts (Layer 3: Execution)
- `base44Client.js`: Cliente de conexão com o banco.
- `AdminSocialLeads.jsx`: Dashboard administrativo de visualização e controle.

## 📋 Regras de Operação e Casos de Borda
- **Falha no Banco:** Caso a conexão com o Base44 falhe, o lead DEVE ser redirecionado para o WhatsApp de qualquer forma para não perder a venda.
- **Origem do Lead:** O campo `origin` deve registrar de qual página o lead veio (`/gestao-de-redes-sociais` ou `/google-meu-negocio`).
- **Acesso Admin:** Protegido por senha (não expor em código aberto, usar variáveis de ambiente quando possível).

## 🚀 Como Expandir
Para adicionar um novo serviço ao sistema de leads:
1. Atualize o componente de Hero ou Cards para aceitar o prop `onCTA`.
2. Inclua o `LeadModal` na página correspondente.
3. Garanta que o botão de saída e links home estejam presentes.

---
*Última atualização: 2026-03-22*
