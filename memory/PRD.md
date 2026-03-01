# Multi-Tenant Website Platform PRD

## Original Problem Statement
User wants to combine multiple restaurant websites into one platform to save hosting costs (from 150 credits/month to 50 credits/month). Requirements:
- Admin dashboard with Google login
- Combine La Cantina Italiana (Tervuren) and La Bottega Italiana (Herent)
- Domain-based routing - each domain shows the correct restaurant
- Per-site management: opening hours, menu, group menus, photos
- Sites should look exactly as they currently are
- Future: ability to add any type of business (not just restaurants)

## User Personas
1. **Platform Admin (User)**: Manages multiple client websites from one dashboard
2. **Restaurant Visitor**: Sees only their specific restaurant website based on domain
3. **Future Clients**: New businesses that can be added to the platform

## Architecture
- **Backend**: FastAPI + MongoDB (multi-tenant)
- **Frontend**: React with dynamic site rendering
- **Auth**: Google OAuth via Emergent Auth
- **Database Collections**:
  - `sites` - Site definitions with domains
  - `site_configs` - Per-site settings (colors, contact, hours)
  - `menu_items` - Menu items per site
  - `group_menus` - Group menus per site
  - `gallery_images` - Photos per site
  - `users` - Admin users
  - `user_sessions` - Auth sessions

## What's Been Implemented (March 2026)

### Phase 1 - MVP Complete ✅
- [x] Multi-tenant backend with site/config/menu/gallery APIs
- [x] Google OAuth admin authentication
- [x] Domain detection and routing
- [x] Landing page with login
- [x] Admin dashboard (site list, create, delete)
- [x] Site editor (general settings, contact/hours, menu, gallery)
- [x] Dynamic site renderer for restaurants
- [x] La Cantina Italiana seeded (Tervuren)
- [x] La Bottega Italiana seeded (Herent) 
- [x] Site-specific features (Cantina: reservations only, Bottega: reservations + takeaway)

### URLs
- Platform: `/` (landing page)
- Admin: `/admin` (requires Google login)
- Site Editor: `/admin/sites/{siteId}`
- Site Preview: `/site/{slug}` (e.g., `/site/cantina`, `/site/bottega`)

## Prioritized Backlog

### P0 - High Priority
- [ ] Complete menu data import from original sites
- [ ] Group menus data import
- [ ] Full gallery import with all photos

### P1 - Medium Priority
- [ ] Multi-language support (NL/FR/EN/IT/DE)
- [ ] PDF menu download functionality
- [ ] Custom domain configuration guide

### P2 - Nice to Have
- [ ] Generic business template (not restaurant)
- [ ] Billing/subscription management
- [ ] Analytics per site

## Cost Savings
- Before: 3 sites × 50 credits = 150 credits/month
- After: 1 platform × 50 credits = 50 credits/month
- **Savings: 100 credits/month**

## Next Tasks
1. Import full menu data for both restaurants
2. Add all gallery photos
3. Test domain-based routing with real domains
4. Add more sites via admin dashboard
