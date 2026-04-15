# Multi-Tenant Website Platform - PRD

## Original Problem Statement
Build a multi-tenant platform managing multiple restaurant and business websites through a unified super-admin dashboard. The platform evolved to include:
- 6 restaurant websites (Cantina, Bottega, Ascoli, Mercato, etc.)
- Promotional website (fworksbuilders.com)
- Vacation rental site (Smeralda Vacanze)
- Political/personal site (Alberto Pantoja)
- Hotel website (Hotel del Pacífico)

## User Personas
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
