# Lead Management Directive: Social Media & GMN

## Objective
Capture contact info (Email/WhatsApp) for Social Media and GMN prospects, persisting data to the centralized Base44 database before sales redirection.

## Architecture
1.  **Capture Layer**: Interceptor modal (`LeadModal.jsx`).
2.  **Persistence Layer**: Entity `SocialMediaLead` (Base44).
3.  **Conversion Layer**: Post-capture redirect to WhatsApp API.

## Core Assets
- `base44Client.js`: Data persistence client.
- `AdminSocialLeads.jsx`: Admin dashboard for lead auditing.

## Operational Rules
- **Fallback**: Redirect to WhatsApp MUST trigger even if DB persistence fails (fail-soft).
- **Origin Tracking**: The `origin` field must reflect the source path.

## Expansion
- New services must implement `onCTA` props in Hero/Cards to trigger the lead capture flow.
- Ensure `LeadModal` is mounted and configured with correct origin tags.
