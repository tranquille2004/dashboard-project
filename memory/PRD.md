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
- ✅ 2026-02: **Statistics overhaul (trust restoration)** — country/daily dedup, calendar month, ignored_ips collection (owner IPs auto-seeded), monthly-history endpoint + UI table with date ranges, "Genegeerde IPs" management modal.
- ✅ 2026-02: **PDF export** — new endpoint `GET /admin/monthly-stats/{site_id}/pdf` using reportlab. Downloads "<slug>_visitor_report_<YYYYMMDD>.pdf" with site name + monthly table (month, period, unique visitors, top 5 countries) + cumulative total. Red "PDF exporteren" button in Monthly History section.
- ✅ 2026-02: **Smeralda Reserve page mobile menu** — added hamburger menu (visible <md), drawer with full nav items, blue "Book Now" CTA button (anchor `#book` scrolls to reservation form). Desktop nav also gets the blue "Book Now" CTA button.
- ✅ 2026-02: **IP detection fix for Cloudflare proxy** — `/track-visit`, `/analytics/track`, `/my-ip` now read `cf-connecting-ip` first, then `x-real-ip`, then `x-forwarded-for`. Fixes bug where visitors behind Cloudflare were geo-located to Cloudflare datacenter IPs instead of their real country. Validated with simulated Brazil IP → correctly tagged "Brazil".
- ✅ 2026-02: **Track Debug tools** — new admin endpoints `GET /admin/track-debug/{site_slug}` (raw last 30 visits) + `GET /admin/track-debug-headers` (echo request headers + chosen IP + geo lookup). Frontend "Track Debug" button in admin toolbar prompts for site slug and shows raw visit log.
- ✅ 2026-02: **Historical geo backfill** — new endpoint `POST /admin/backfill-geo` (body: `{ site_slug?, only_unknown? }`). For each distinct visitor_ip in site_visits: (1) if IP falls in known Cloudflare IPv4 prefix ranges → flag country='Proxy (Cloudflare)', code='PX'; (2) otherwise re-run ip-api.com lookup (rate-limited 40/min). Updates all matching records + ip_countries cache. Returns summary with sample changes. "Backfill Geo" emerald button in admin toolbar with site-slug prompt.

## Backlog
- P2: Refactor `server.py` monolith into `/app/backend/routes/`, `/app/backend/models/`.
- P2: Add cover photos for Apt 1, 2, 4 and Mobilhome on Reserve page if user provides.

## Credentials
- Admin: `admin@ilsiciliano-santodomingo.com` / `siciliano123` (see `/app/memory/test_credentials.md`)

## Third-Party Integrations
- Cloudflare Workers (reverse proxy)
- Holidu (external booking URLs)
- JotForm (reservation iframe)
