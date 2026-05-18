# Multi-Tenant Website Platform - PRD

## Original Problem Statement
Build a multi-tenant platform managing multiple restaurant and business websites through a unified super-admin dashboard. The platform evolved to include:
- 6 restaurant websites (Cantina, Bottega, Ascoli, Mercato, etc.)
- Promotional website (fworksbuilders.com)
- Vacation rental site (Smeralda Vacanze)
- Political/personal site (Alberto Pantoja)
- Hotel website (Hotel del Pacífico)

## User Personas
- **RCCB - Retail Cleaning Care Belgium** (NEW — Feb 2026) — professioneel schoonmaakbedrijf in België

## Changelog
### Feb 2026 — RCCB Website MVP
- Built complete new modern multilingual cleaning company website
- Files: `/app/frontend/src/sites/rccb/RccbApp.js`, `VideoHero.js`, `translations.js`
- Pages: Home (Notre histoire), Services (12 diensten, B2B + Specialist filters), Gallery (113 foto's + lightbox), Contact (form + WhatsApp)
- Multi-language: NL / FR / EN with localStorage persistence + browser language detection
- Hero video compilation: 3 videos cycling with emerald overlay filter (like Hotel del Pacifico)
- Floating WhatsApp button → `+32472700402`
- Modern animations (fade-in-up, hover states, backdrop blur nav, emerald gradient sections)
- Fixed global `main { padding-top: 90px }` leak from cantina/App.css via inline style override
- Backend: added 'rccb' entry to SITE_EMAIL_CONFIG (info@rccbgroup.be), added company/service optional fields to ContactFormRequest
- Routing: `/site/rccb` (preview) + domain mapping `rccbgroup.be` / `www.rccbgroup.be` ready
- Testing: 100% frontend pass (13/13 features) — iteration_7.json
- Assets: 113 unique photos + 3 unique videos stored in `/app/frontend/public/images/rccb/`
- Webmaster credit: fworksbuilders (footer link)
- Address: Excelsiorlaan 36-38, 1930 Zaventem | VAT BE 0793.291.833

- **Super Admin**: Manages all sites via `/admin` dashboard
- **Site Admins**: Restaurant/business owners managing their own content via `/restaurant-login`
- **End Users**: Website visitors

## Core Requirements

### Platform Features
- Multi-domain routing via Cloudflare Workers
- Emergent Object Storage for all images/videos
- Site-specific admin dashboards
- Visitor analytics and health monitoring
- Email alerts for downtime/no reservations

### Hotel del Pacífico (Latest Focus)
- 7-page luxury hotel website
- Languages: ES, EN, FR, IT, DE
- Colors: Light yellow/cream, green, black
- Domain: `www.hoteldelpacifico.net` (NEW)
- **CURRENT STATE**: Under Construction mode enabled

## What's Been Implemented

### April 12-14, 2026
- ✅ Habitaciones & Tarifas: background photos replaced with video screenshots (hotel entrance & social scene)
- ✅ Kamerprijzen-editor: hotel admin can edit room prices, names, descriptions, features via dashboard
- ✅ Preview button: live preview panel showing how prices look on the website
- ✅ Dynamic prices: Habitaciones and Tarifas pages load prices from database
- ✅ Hotel del Pacífico added to fworksbuilders portfolio page
- ✅ /admin route enabled for hotel domain (client login via /admin)
- ✅ Stock photos removed, replaced with actual hotel video screenshots
- ✅ Restaurant gallery: 50 photos (20 patisserie + 30 new restaurant), optimized from 1.3GB to 8.9MB
- ✅ Hotel gallery (Galería): 35 room photos with grid layout, lightbox and navigation
- ✅ Room type cards: real room photos, Suite Ejecutiva removed (2 types now)
- ✅ Events page: Eventos Especiales with flyer, WhatsApp booking, admin dashboard management
- ✅ Image upload API: Direct to Object Storage, no deploy/migrate needed for client
- ✅ Simplified Events editor: title, description, date, time, location, price, info, photo upload
- ✅ "Caja de seguridad" removed from all languages
- ✅ Portfolio feature keywords translated for all 5 languages (NL/FR/EN/ES/IT)

### April 4-11, 2026
- ✅ Under Construction page for production domain
- ✅ SEO: Meta tags, OpenGraph, Twitter Cards, JSON-LD Schema
- ✅ Patisserie Gallery: 54 photos, interactive slider, lightbox, multi-language
- ✅ Attractions (Descubrir): 8 real photos, new locations added
- ✅ Navigation fix: absolute routes
- ✅ Green-filtered background images on all major pages
- ✅ Image Migration fix: dynamic origin in ImageMigration.js
- ✅ Cloudflare Worker updated for new domain + static routing

### Previous Sessions
- ✅ Complete Hotel del Pacífico website with all 7 pages
- ✅ Custom video background (edited with ffmpeg)
- ✅ Hotel and La Orquídea logos integrated
- ✅ Site admin setup in MongoDB
- ✅ WhatsApp webmaster contact in footer

## Technical Architecture
```
/app
├── backend/
│   └── server.py          # FastAPI + MongoDB + Object Storage
├── frontend/src/
│   ├── App.js             # Domain routing (DOMAIN_MAPPING)
│   └── sites/
│       └── hoteldelpacifico/
│           └── HotelDelPacificoApp.js  # UNDER_CONSTRUCTION_MODE = true
```

## Domain Mapping
| Domain | Site Slug |
|--------|-----------|
| hoteldelpacifico.net | hoteldelpacifico |
| www.hoteldelpacifico.net | hoteldelpacifico |
| hoteldelpacifico.com | hoteldelpacifico |
| www.hoteldelpacifico.com | hoteldelpacifico |

## Prioritized Backlog

### P0 (Critical)
- [x] Kamerprijzen-editor for hotel dashboard
- [x] Dynamic room prices on hotel website
- [x] Hotel del Pacifico in fworksbuilders portfolio
- [ ] Cloudflare DNS propagation for hoteldelpacifico.net
- [ ] Test production deployment after DNS setup

### P1 (High)
- [ ] Alberto Pantoja interview videos (waiting for links)
- [ ] Ascoli Easter menu completion
- [ ] "Import from Preview" production fix (HTML/JSON error)

### P2 (Medium)
- [ ] Hotel photos and pricing (when provided)
- [ ] Admin Gallery Object Storage refactor
- [ ] Super Admin Google Auth 520 error fix

### P3 (Low)
- [ ] Smeralda carousel auto-play fix
- [ ] Payment integrations (Stripe, Payconiq, Binance)
- [ ] French translations completion

## Credentials
- **Hotel Admin**: `hotel@hoteldelpacifico.com` / `hotel123`
- **Site Admin Route**: `/restaurant-login?site=hoteldelpacifico`

## Notes
- User language: Dutch (respond in Dutch)
- To disable Under Construction: Set `UNDER_CONSTRUCTION_MODE = false` in HotelDelPacificoApp.js

## Changelog — May 2026
### Traffic-alert thresholds aangepast: 24h→12h (algemeen), 6h→4h (restaurants) — May 18
- `check_visitor_activity()` drempels gewijzigd in `server.py`.
- 12 oude actieve traffic alerts gemarkeerd als opgelost (`resolved_reason: thresholds_changed_to_12h_4h`).
- Cron blijft elke 30 minuten draaien.

### Tracking-fix voor `/onlinewerken` (P0 — DONE — May 18)
- `OnlineWerken.jsx` wordt **direct in App.js** gerendered (niet binnen FWorksApp), dus de tracking-fix in FWorksApp bereikte deze pagina nooit.
- `trackVisit('fworks', location.pathname)` toegevoegd in `OnlineWerken.jsx` mount-`useEffect`.
- Pagina verschijnt nu als `/site/fworks/onlinewerken` (preview) of `/onlinewerken` (custom domain) onder de fworks "Bekijk per pagina" breakdown.

### Per-pagina statistieken (sub-page breakdown) — DONE — May 18
**Use case**: gebruiker wilde fworks homepage apart zien van `/onlinewerken` (recruitment-pagina).

**Backend** (`server.py`):
- `_count_unique_visitors()` uitgebreid met `path_eq` en `path_prefix` parameters.
- Nieuwe endpoint `GET /api/admin/path-stats/{site_slug}` — retourneert top 20 paden gesorteerd op month visits, met today/week/month/total per pagina.

**Frontend** (`AdminDashboard.js`):
- Nieuwe "Bekijk per pagina ▾" toggle op elke site card.
- Lazy-load on expand (geen extra requests bij dashboard-load).
- Tabel toont: Pagina-label (🏠 Homepage voor root) | 7d | 30d | Tot.
- Werkt voor alle 13 sites — niet alleen fworks.

### CRITICAL FIX: 4 sites hadden geen tracking-code (P0 — DONE — May 18)
**Probleem gemeld door gebruiker**: fworksbuilders en albertopantoja toonden 0 bezoekers ondanks dat gebruiker zelf herhaaldelijk bezocht.

**Forensische audit (`grep -r "trackVisit"`)**:
- **fworks**: GEEN tracking-call in code ❌
- **albertopantoja**: GEEN tracking-call ❌
- **theobeans**: GEEN tracking-call ❌
- **tracemaster**: GEEN tracking-call ❌

De andere 9 sites hadden wel correcte tracking. Deze 4 sites schreven NOOIT pageviews naar de database — niet door bot-filter, gewoon ontbrekende code.

**Fix**:
- `fworks/FWorksApp.js`: `trackVisit('fworks', window.location.pathname)` toegevoegd in mount-`useEffect`.
- `albertopantoja/AlbertoPantojaApp.js`: idem.
- `tracemaster/TracemasterApp.js`: `usePageTracking`-pattern met `useLocation` (multi-route SPA).
- `theobeans/TheobeansApp.js`: idem.

### Live status indicator op website cards (DONE — May 18)
- **Groen pulserend bolletje** (animate-ping) = site online (geen actieve `health` alert).
- **Rood pulserend bolletje** = site offline / unreachable (heeft actieve `health` alert).
- Hover toont tooltip met laatste foutmelding bij offline.
- Gebruikt de bestaande `alerts` state — geen extra API call.

### Billing v2: USD/EUR keuze + dagelijkse koers + lock op factuurdatum (P0 — DONE — May 18)

**Datamodel**:
- `source_amount` (float) + `source_currency` ("USD"|"EUR") — origineel bedrag, **verandert nooit**.
- `locked_rate` (optional float) + `locked_at` — alleen ingevuld zodra `today >= invoice_date`. Hierna is de koers bevroren.

**Backend logica (`_enrich_invoice`)**:
- `today < invoice_date`: omrekening met **live dagkoers** (`get_usd_to_eur_rate`, 6u cache).
- `today >= invoice_date`: gebruikt `locked_rate`. Bij eerste read na factuurdatum wordt `locked_rate` = huidige koers gezet en gepersisteerd (write-on-read).
- Response bevat: `source_amount`, `source_currency`, `amount_usd`, `amount_eur`, `effective_rate`, `is_locked`.
- Backwards-compat: oude records met `amount_usd`/`amount` worden in `_enrich_invoice` automatisch geïnterpreteerd als `source_currency=USD`.

**Frontend (`Billing.js`)**:
- USD/EUR toggle in nieuwe-factuur modal — gebruiker kiest expliciet welke munteenheid hij invoert.
- Live preview toont de andere munteenheid: `≈ €X.XXX,XX EUR (live koers — wordt dagelijks bijgewerkt tot de factuurdatum)` of omgekeerd.
- InvoiceRow toont nu: origineel bedrag (bold, met "orig." label) + omrekening (≈) + koers + lock-icoon (🔒) als vergrendeld of refresh-icoon (🔄) als nog live.
- Totaal-cards en per-site tabel tonen zowel EUR als USD totalen.

**Email facturatie-alert** gebruikt nu ook `_enrich_invoice` met source-currency-gevoelige formatting.

### Bezoekersstatistieken — bot-filter + correcte unieke teller + race-condition fix (P0 — DONE — May 18)
**Probleem gemeld door gebruiker**: Il Siciliano toonde 75 bezoekers/maand terwijl de URL alleen bij eigenaar + assistent + super-admin bekend is.

**Analyse**:
- 41 van 61 hits in laatste 30 dagen kwamen van **HeadlessChrome** uit Google Cloud datacenters (USA): mijn eigen testing/screenshot agent + SEO crawlers.
- Bestaande dedup-logica gebruikte `IP + datum + pagina` als uniek-sleutel → 1 echte bezoeker die 5 pagina's bekeek telde als 5 "unieke" bezoekers.

**Fixes in `backend/server.py`**:
- Nieuwe helper `_is_bot_ua()` met patronenlijst (headlesschrome, googlebot, crawler, spider, curl, python-requests, etc.) + lege UA = bot.
- `POST /api/analytics/track` en `POST /api/public/track-visit` weigeren bots stilletjes (geen DB-write).
- Nieuwe helper `_count_unique_visitors(site_slug, since, date_eq)` telt distinct `(visitor_ip, date)` paren via aggregation pipeline → 1 per IP per dag.
- `GET /admin/sites/{site_id}/stats` en `GET /admin/all-stats` gebruiken nu deze helper i.p.v. `count_documents`.
- Nieuwe `POST /admin/analytics/cleanup-bots`: retroactief alle bot-records verwijderen uit `site_visits` (134 records verwijderd bij eerste run, 41 voor Il Siciliano).

**Frontend (`AdminDashboard.js`)**:
- Nieuwe "Bots opruimen" knop in Tools-balk (rose, Bug-icoon) voor handmatige cleanup.

**Resultaat na fix**:
- Il Siciliano deze maand: **2 echte unieke bezoekers** (was 75).
- Andere sites totaal verminderd: Bottega 74→36, Ascoli 65→29, Mercato 183→80, Cantina 32→12.

### Billing alerts + USD→EUR currency conversion (P0 — DONE)
- Added `get_usd_to_eur_rate()` helper using free **frankfurter.dev** (with fallback chain to frankfurter.app + open.er-api.com). 6h in-memory cache.
- `POST /api/admin/billing/invoices` now accepts `amount_usd` (not `amount`). Backend converts to EUR at current rate and stores `amount`, `amount_usd`, `exchange_rate`.
- `PUT /api/admin/billing/invoices/{id}` re-converts when `amount_usd` is updated.
- New endpoint `GET /api/admin/billing/exchange-rate` for live FX in the UI.
- New endpoint `POST /api/admin/billing/alerts/run` to manually trigger the 1-week-out billing alert (also runs daily via APScheduler cron at 09:00 UTC).
- New cron `check_upcoming_invoices()` sends a dedicated **billing-type** email (blue 💶 styling) for unpaid invoices whose `invoice_date` is exactly 7 days away. Uses `billing_alerts` collection for dedup.
- `send_alert_email()` extended to render `billing` alert subject/colour cleanly (separate from health/traffic/reservation).
- Traffic alerts (24h general / 6h restaurants) now ALSO send the email (previously silent in DB only).
- Frontend `Billing.js`: USD input with $ prefix + live EUR preview, FX rate banner at top, "Test facturatie-alert" button.
- Tested via curl: live rate 0.85999, $500 USD → €430 EUR, alert sent (Resend ID confirmed), dedup verified, PUT re-converts correctly.

## Backlog / Pending (May 2026)
### P1
- [ ] Run `testing_agent_v3_fork` full regression on admin dashboard (Billing + Image Migration tools)

### P2
- [ ] User to provide JotForm embed codes for `/bambino-box-subscribe` (Il Siciliano) and `/onlinewerken` (Fworks)
- [ ] Refactor `server.py` (≈3400 lines) into `routes/` modules (Billing, Admin, Auth, Migration)
- [ ] React.lazy() route splitting in `App.js`

