# Multi-Site Restaurant & Portfolio Platform - PRD

## Original Problem Statement
Create a multi-tenant application managing multiple restaurant websites and promotional sites, with a super-admin dashboard for visitor analytics and health monitoring. Recently expanded to include a political campaign website for Alberto Pantoja.

## Current Sites (9 Total)
1. Smeralda Vacanze (vacation rental)
2. Cantina
3. Ascoli
4. Theo Beans
5. FWorks Builders (portfolio)
6. Alberto Pantoja (political campaign) - NEW
7-9. Other restaurant sites

## User's Preferred Language
Nederlands (Dutch) - Always respond in Dutch

---

## What's Been Implemented

### December 26, 2025 - Alberto Pantoja Text & UI Update
- Updated text to mention both "7 parroquias urbanas de la ciudad" AND "7 parroquias rurales" across all 3 languages (ES, FR, EN)
- Updated "Áreas de Trabajo" subtitle and "Sobre Alberto" mission text
- Removed bouncing scroll indicator icon from hero section
- Tested via screenshots

### Previous Sessions
- Alberto Pantoja website fully built with:
  - Multi-language support (ES, FR, EN)
  - Video background in hero section
  - 165+ photo gallery with pagination
  - YouTube/Facebook video embeds
  - RC5 political branding with official logo
  - Social links (Facebook, TikTok, Instagram, WhatsApp)
  - Mobile-responsive UI with compact work areas grid
- Image migration to Emergent Object Storage (874 images)
- Backend video serving (MP4 support)
- Cloudflare Worker proxy for image/video requests

---

## Prioritized Backlog

### P0 - Critical
(None currently)

### P1 - High Priority
- **Database Sync Issue**: "Import from Preview" tool returns JSON parse error on production
  - New media files (rc5-correa.jpg, hero-video.mp4) not syncing to production DB
  - Users see broken images on live site after deploy
- **Google Auth 520 Error**: Super admin login fails on production domain
- **Easter Menu for Ascoli**: Component created but not integrated

### P2 - Medium Priority
- Update Admin Gallery View to use Object Storage URLs
- Email notifications for "No Traffic" alerts
- Create missing pages for Smeralda site
- Payment integrations (Stripe, Payconiq, Binance Pay) - waiting for API keys

### P3 - Low Priority
- User guide for adding new websites
- Itemized menu editor for restaurants
- Complete French translations in admin dashboard
- Theo Beans image organization
- Cantina announcements not working

---

## Technical Architecture

```
/app
├── backend/
│   ├── server.py          # FastAPI, Object Storage serving, email alerts
│   └── .env               # MONGO_URL, Resend API key
├── frontend/
│   └── src/
│       ├── App.js         # CustomDomainRouter for multi-site
│       ├── sites/
│       │   ├── albertopantoja/AlbertoPantojaApp.js
│       │   ├── smeralda/SmeraldaApp.js
│       │   └── ...
│       └── utils/trackVisit.js
└── docs/
    └── cloudflare-worker-final.js
```

### Key Technical Details
- **Image Serving**: Backend proxies from Emergent Object Storage via `/api/images/{path}`
- **Cloudflare Worker**: Routes all `/images/*` requests to backend API
- **Database Collections**: `site_visits`, `migrated_images`, `object_storage_map`, `health_alerts`

---

## 3rd Party Integrations
- Cloudflare Workers (domain routing)
- Emergent Object Storage (images/videos)
- Google OAuth 2.0 (admin login)
- Resend (email alerts)
- JotForm (contact forms)
- Tawk.to (live chat)

---

## Known Issues
1. Preview/Production database desync for `migrated_images` collection
2. Google Auth 520 error on production (recurring)
3. Smeralda carousel auto-play doesn't stop after user interaction
