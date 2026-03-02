# Multi-Tenant Website Platform PRD

## Original Problem Statement
User wants to combine multiple restaurant websites into one platform to save hosting costs (from 150 credits/month to 50 credits/month). Requirements:
- Admin dashboard with Google login
- Combine La Cantina Italiana (Tervuren) and La Bottega Italiana (Herent)
- Domain-based routing - each domain shows the correct restaurant
- Per-site management: opening hours, menu, group menus, photos
- Sites should look exactly as they currently are
- Future: ability to add any type of business (not just restaurants)
- **NEW**: Restaurant owners should have their own login to manage their site
- **NEW**: Super admin can configure what each restaurant owner is allowed to edit

## User Personas
1. **Platform Admin (Super Admin/User)**: Manages ALL websites, creates site admins, configures permissions
2. **Site Admin (Restaurant Owner)**: Can only access and edit their OWN site within allowed permissions
3. **Restaurant Visitor**: Sees only their specific restaurant website based on domain

## Architecture
- **Backend**: FastAPI + MongoDB (multi-tenant)
- **Frontend**: React with dynamic site rendering
- **Auth**: 
  - Super Admin: Google OAuth via Emergent Auth
  - Site Admin: Email/Password with session tokens
- **Database Collections**:
  - `sites` - Site definitions with domains
  - `site_configs` - Per-site settings (colors, contact, hours)
  - `menu_items` - Menu items per site
  - `group_menus` - Group menus per site
  - `gallery_images` - Photos per site
  - `users` - Super admin users (Google OAuth)
  - `user_sessions` - Super admin sessions
  - `site_admins` - Site-level admins with permissions
  - `site_admin_sessions` - Site admin sessions

## What's Been Implemented (March 2026)

### Phase 1 - MVP Complete ✅
- [x] Multi-tenant backend with site/config/menu/gallery APIs
- [x] Google OAuth super admin authentication
- [x] Domain detection and routing
- [x] Landing page with login
- [x] Super admin dashboard (site list, create, delete)
- [x] Site editor (general settings, contact/hours, menu, gallery)
- [x] Dynamic site renderer for restaurants
- [x] La Cantina Italiana seeded (Tervuren)
- [x] La Bottega Italiana seeded (Herent)
- [x] Site-specific features (Cantina: reservations only, Bottega: reservations + takeaway)

### Phase 2 - Site Admin System ✅
- [x] Site admin model with configurable permissions
- [x] Site admin authentication (email/password)
- [x] Restaurant owner login page (/restaurant-login)
- [x] Site admin dashboard (/mijn-site)
- [x] Permission-based UI (only shows allowed tabs)
- [x] Super admin can create/edit/delete site admins
- [x] Super admin can configure permissions per site admin
- [x] Permission enforcement on backend APIs

### Permission Options
| Permission | Description |
|------------|-------------|
| menu_items | Add/edit/delete menu items |
| menu_prices | Change prices |
| opening_hours | Edit opening hours |
| closure_notice | Edit closure message |
| gallery | Add/delete photos |
| contact_info | Edit address/phone/email |
| group_menus | Manage group menus |

### URLs
- **Jouw Admin Login**: `/` → direct naar `/admin` na Google login
- **Jouw Dashboard**: `/admin` 
- **Site Editor**: `/admin/sites/{siteId}` (inclusief Beheerders tab)
- **Site Preview**: `/site/{slug}` (bijv. `/site/bottega`)
- **Klant Login** (per site): `/site/{slug}/beheer` of `/site/{slug}/login`

Voorbeeld:
- La Bottega eigenaar gaat naar: `labottegaherent.com/beheer` (of in preview: `/site/bottega/beheer`)

### Test Accounts
- Site Admin (La Bottega): bottega@test.be / test123

## Prioritized Backlog

### P0 - High Priority
- [ ] Complete menu data import from original sites
- [ ] Group menus data import
- [ ] Full gallery import with all photos

### P1 - Medium Priority  
- [ ] Multi-language support (NL/FR/EN/IT/DE)
- [ ] PDF menu download functionality
- [ ] Password reset for site admins
- [ ] Email notifications when admin is created

### P2 - Nice to Have
- [ ] Generic business template (not restaurant)
- [ ] Billing/subscription management for site admins
- [ ] Analytics per site
- [ ] Activity log per site admin

## Business Model
| Package | What Client Gets | You Charge |
|---------|------------------|------------|
| Basic | Website online, YOU make changes | €20-25/month |
| Premium | Own login, client edits themselves | €35-50/month |

## Cost Savings
- Before: 3 sites × 50 credits = 150 credits/month
- After: 1 platform × 50 credits = 50 credits/month
- **Savings: 100 credits/month**
