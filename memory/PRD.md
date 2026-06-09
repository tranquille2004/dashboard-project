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
- ✅ 2026-02: **Historical geo backfill** — new endpoint `POST /admin/backfill-geo` + manual "Backfill Geo" button. Detects Cloudflare relay IPs (24 known IPv4 prefixes) and flags them as `Proxy (Cloudflare)`. Re-resolves all other IPs via ip-api.com.
- ✅ 2026-02: **Automatic daily geo backfill** — APScheduler cron job `daily_backfill_geo` runs every day at 03:00 UTC. Iterates all distinct visitor_ip values in site_visits, flags Cloudflare proxies, re-runs ip-api.com lookups (rate-limited 40/min). Logs summary on completion.
- ✅ 2026-02: **Alberto Pantoja campaign song** — sticky audio player bottom-right. Autoplays muted (browser policy), pulsing red mute button hints to enable sound. Visitor can play/pause, mute/unmute, or close (preference stored in localStorage as `ap_song_pref`). Audio file `/audio/albertopantoja/alberto-pantoja-song.mp3` (4.4 MB). 4-language labels.
- ✅ 2026-02: **Audio asset migration support** — extended Image Migration system to also scan `/app/frontend/public/audio/` for `mp3, mpeg, wav, ogg, m4a, aac` files. Added `serve_audio` endpoint `GET /api/audio/{path:path}` with HTTP Range support (audio scrubbing). Audio files now flow through the same preview→production storage pipeline as images.
- ✅ 2026-02: **Audio player improvements (Alberto Pantoja)** — default volume 25% (soft), volume slider with % display (toggles open on click), auto-unmute on first user interaction (click/touch/keydown/scroll) if browser blocked unmuted autoplay. Mute/play/close controls preserved. Volume persisted to localStorage.
- ✅ 2026-02: **Hide-broken-videos admin tool (Alberto Pantoja)** — backend `hidden_videos` collection + endpoints `GET /api/public/hidden-videos/{site_slug}`, `POST/DELETE /api/admin/hide-video`. Frontend detects admin via `/auth/me`, shows rose Trash2 button on hover over each video card (only for logged-in admin). Click → confirm → API call → video filtered from public grid. Hidden list shared between all visitors so they don't see dead embeds.
- ✅ 2026-02: **rccbgroup.com domain** added to DOMAIN_MAPPING (App.js), DOMAIN_SLUG_MAP (backend), SITE_SEO_DATA (canonical → rccbgroup.com), Cloudflare Worker SITE_MAPPING + 301 redirect from .be.
- ✅ 2026-02: **SEO host detection fix** — `/api/robots.txt` and `/api/sitemap.xml` now read `?host=` query param + `X-Forwarded-Host` header (in addition to Host header) so the Cloudflare Worker can pass the original hostname through. Worker updated to send both.
- ✅ 2026-02: **RCCB VAT number removed** — `BE 0793.291.833` removed from footer + contact section in `RccbApp.js`.
- ✅ 2026-02: **Image migration supports PDFs** — added `pdf` to scan extensions. Migrates PDFs via same `/api/images/{path}` route so they auto-serve from object storage on production.
- ✅ 2026-02: **Hotel del Pacífico restaurant menu** — Menu PDF added at `/images/hoteldelpacifico/documents/menu.pdf` (43 MB → compressed to 2.3 MB via ghostscript). New section on Restaurant page (/restaurante): embedded PDF viewer (object/iframe fallback) + "View fullscreen" + "Download PDF" buttons. 5-language labels (ES/EN/FR/IT/DE).
- ✅ 2026-02: **PDF view privacy fix** — Replaced `<a target="_blank">` (which opened new tab exposing internal `fworks-consolidate-1.emergent.host/api/images/...` URL) with in-page fullscreen modal. URL stays on `hoteldelpacifico.net/restaurante` at all times. Modal includes embedded PDF viewer + Download button. Added `EXTERNAL_URL` helper to imageHelper.js (uses document.referrer for parent origin) for future iframe-aware external links.

## Backlog
- P2: Refactor `server.py` monolith into `/app/backend/routes/`, `/app/backend/models/`.
- P2: Add cover photos for Apt 1, 2, 4 and Mobilhome on Reserve page if user provides.

## Credentials
- Admin: `admin@ilsiciliano-santodomingo.com` / `siciliano123` (see `/app/memory/test_credentials.md`)

## Third-Party Integrations
- Cloudflare Workers (reverse proxy)
- Holidu (external booking URLs)
- JotForm (reservation iframe)
