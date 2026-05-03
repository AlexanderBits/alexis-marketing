# SEO Management Directive

## Architecture
The system follows a 3-layer architecture for SEO:
1.  **Global Layer**: `GlobalSEO.jsx` (Organization/WebSite schema).
2.  **Page Layer**: `SEO_Head.jsx` (Page-specific meta & JSON-LD).
3.  **Data Layer**: `useSEO` hook (Hydrates metadata from Alexis DB).

## Admin Operations
Manage all SEO assets via `/admin-seo`:
- Route selection: Sidebar.
- Target Fields: Title, Rich Description (stripped to text), Canonical.
- Sync: Manual commit initiates Alexis entity update.

## Conventions
- Paths: Always relative to root.
- Images: OG images served from `/og-image/` or absolute URLs.
- Canonical: Auto-generated from route path if undefined.
