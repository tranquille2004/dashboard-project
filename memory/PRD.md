# PRD — Multi-tenant Fworks Platform

## Original problem statement
React + FastAPI multi-tenant app routing 13+ domains via a Cloudflare Worker reverse-proxy. Includes super-admin & client-admin dashboards, JotForm integrations, dynamic Fworks portfolio, and tenant-specific pages (booking, menus, Bambino Box).

## User preferences
- **Language**: Dutch (Nederlands) — ALWAYS reply in Dutch.
- **Production**: User deploys via Cloudflare Worker. Never share raw preview URLs publicly.

## Architecture
- `frontend/src/App.js`: hostname → tenant component routing
- `backend/server.py`: FastAPI monolith (DB, analytics, PDF, cron, media)
- `docs/cloudflare-worker-final.js`: production proxy script
- `frontend/src/sites/<tenant>/`: per-tenant components

## Tenants in super dashboard (sites collection)
cantina, bottega, ascoli, mercato, tracemaster, theobeans, fworks, smeralda,
albertopantoja, hoteldelpacifico, ilsiciliano, sanfrancisco, **rccb** (added 2026-02)

## Recent changes
- 2026-02: Added RCCB Group to super-admin sites seed (`site_rccb`)
- 2026-02: Fixed Menu page middle photo cropping (Emanuele now visible via `object-[75%_25%]`)
- Bambino Box "Grazie" page + JotForm iframe
- Site-aware Site Admin Dashboard (themes/logos by slug)
- Il Siciliano admin: opening hours pickers, contact editor, 26 gallery photos seed
- Fworksbuilders: pricing 100, Step 1 text update, RCCB added to portfolio
- Il Siciliano UI: Reviews page (Maps embed), Hero 4-photo grid, 3D mobile buttons, WhatsApp footer
- Cloudflare Worker: ilsiciliano-santodomingo.com + rccbgroup.com live + .be→.com 301

## Backlog
- **P2** Refactor `server.py` (4400+ lines) into `/app/backend/routes/` modules
- **P2** Split `App.js` routing
- **User action**: deploy updated `cloudflare-worker-final.js` to Cloudflare

## Credentials
See `/app/memory/test_credentials.md`
