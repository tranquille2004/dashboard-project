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

### April 4, 2026
- ✅ Added `hoteldelpacifico.net` and `www.hoteldelpacifico.net` to domain mapping
- ✅ Implemented Under Construction page with:
  - Video background with green overlay
  - Hotel logo prominently displayed
  - "Próximamente" badge
  - Contact info (phone, email, address)
  - Social media links (Facebook, Instagram, WhatsApp)
  - Language selector (5 languages)
  - No navigation menu (hidden)
  - fworksbuilders webmaster footer

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
