# Multi-Tenant Web Platform — PRD

## Original Problem Statement
Finalize multi-tenant React + FastAPI platform with sites: Il Siciliano, Club San Francisco, Bambino Box, Fworks (incl. `/onlinewerken`), Billing/Invoicing dashboard, Smeralda Vacanze (`/reserve` direct booking).

## User Language
Dutch (Nederlands) — always respond in Dutch.

## Production
- Deployed at `https://fworks-consolidate-1.emergent.host` and on tenant domains (e.g., `smeraldavacanze.it`).
- Agent has NO access to production. Code changes happen in preview; user must Deploy + Sync Images.

## Architecture
- `frontend/src/App.js` — Multi-tenant routing hub for 13 domains.
- `backend/server.py` — FastAPI monolith (~3,800 lines, candidate for refactor).
- `frontend/src/sites/smeralda/SmeraldaApp.js` — Smeralda site incl. Reserve page.
- `frontend/src/components/admin/` — Super-admin (Billing v2, ImageMigration, SiteStats).

## Image Migration Workflow (CRITICAL)
1. Add image to `/app/frontend/public/images/...`
2. Run `POST /api/admin/migrate/start` (preview-local → preview Object Storage)
3. User clicks Deploy
4. User clicks "Synchroniseer Alles" (preview → production storage)

## Completed (Latest)
- ✅ 2026-02: Smeralda Reserve page covers for Apt 3, 5, 6 configured + migrated to preview storage.
- ✅ 2026-02: Bug fix — Reserve page menu links used absolute `/` (routed to fworks on preview); now `basePath`-aware via `useLocation`.
- ✅ 2026-02: **Statistics overhaul (trust restoration):**
  - Country breakdown now dedupes by (IP, date) — fixes Ecuador=35 raw-pageviews bug
  - Daily 7-day chart dedupes by (IP, date)
  - `month` redefined as calendar month (1st → today), not rolling 30 days
  - `Total` renamed `Sinds start` / `Since start` with tooltip explaining it's cumulative, not summed
  - New `ignored_ips` collection: site-owner IPs (157.245.70.19, 2a03:b0c0:2:f0::263f:6001) excluded from ALL stats; auto-seeded on startup
  - New endpoint `GET /admin/monthly-stats/{site_id}` — last 13 calendar months unique visitors + top 5 countries per month with date ranges
  - New endpoints `GET/POST/DELETE /admin/ignored-ips` + `GET /admin/my-ip` for managing ignore-list from UI
  - Admin Dashboard modal extended with "Per maand" historical table + date-range labels under each stat card
  - New "Genegeerde IPs" button on admin toolbar with add/remove + "Mijn huidige IP toevoegen"

## Backlog
- P2: Refactor `server.py` monolith into `/app/backend/routes/`, `/app/backend/models/`.
- P2: Add cover photos for Apt 1, 2, 4 and Mobilhome on Reserve page if user provides.

## Credentials
- Admin: `admin@ilsiciliano-santodomingo.com` / `siciliano123` (see `/app/memory/test_credentials.md`)

## Third-Party Integrations
- Cloudflare Workers (reverse proxy)
- Holidu (external booking URLs)
- JotForm (reservation iframe)
