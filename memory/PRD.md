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

### Phase 1-6 - Origineel (voorheen)
Zie eerdere documentatie.

### Phase 7 - CORRECTE INTEGRATIE VAN ORIGINELE SITES ✅ (4 maart 2026)
**BELANGRIJKE WIJZIGING**: In plaats van sites opnieuw te bouwen, zijn de ORIGINELE Emergent-gebouwde websites nu correct geïntegreerd:

- [x] **La Cantina Italiana** - Originele code uit `tranquille2004/Cantina` repo geïntegreerd
- [x] **La Bottega Italiana** - Originele code uit `tranquille2004/Bottega` repo geïntegreerd
- [x] **L'Ascoli Zaventem** - Originele code uit `tranquille2004/Ascoli` repo geïntegreerd
- [x] **Ristorante Mercato** - Originele code uit `tranquille2004/Mercato` repo geïntegreerd
- [x] Alle sites werken nu met hun originele code, niet herbouwd
- [x] Multi-tenant routing correct geconfigureerd (`/site/cantina`, `/site/bottega`, `/site/ascoli`, `/site/mercato`)
- [x] Super Admin dashboard (`/admin`) behouden met fworks logo en Google Login
- [x] Site Admin dashboard (`/site/{naam}/manage`) beschikbaar voor klanten
- [x] Navigatie fixes toegepast (Ascoli spacing)
- [x] L'Ascoli website toegevoegd (/site/ascoli)
- [x] 36 menu items geïmporteerd (voorgerechten, soepen, pasta, vis, vlees)
- [x] 4 groepmenus geïmporteerd (Torino, Puglia, Amalfi, Ascoli)
- [x] 145 galerij foto's toegevoegd (uit GitHub repo)
- [x] Site configuratie met adres, telefoon, openingstijden
- [x] Site Admin login aangemaakt voor L'Ascoli
- [x] Site Admin login aangemaakt voor La Cantina

### Phase 4 - Ristorante Mercato Integration ✅ (3 december 2026)
- [x] Mercato website toegevoegd (/site/mercato)
- [x] 3 groepmenus geïmporteerd (Menu 1 €45, Menu 2 €55, Menu 3 €65)
- [x] PDF menu link geconfigureerd (Mercato gebruikt PDF menu)
- [x] 10 galerij foto's toegevoegd
- [x] Site configuratie met adres, telefoon, openingstijden
- [x] Site Admin login aangemaakt: mercato@test.be / test123

### Phase 5 - Tracemaster Rastreadores Integration ✅ (3 december 2026)
- [x] Tracemaster website toegevoegd (/site/tracemaster) - **PRODUCT SITE (geen restaurant!)**
- [x] ProductSiteRenderer component gemaakt voor product-type websites
- [x] 2 producten geïmporteerd:
  - Tracemaster 100 PRO - $199 (was $259)
  - Adaptador Incorporado para Vehículo - $25
- [x] Site type "product" ondersteund naast "restaurant"
- [x] WhatsApp integratie voor bestellingen
- [x] Spaanse taal als standaard
- [x] Site Admin login aangemaakt: tracemaster@test.be / test123

### Phase 6 - La Cantina Italiana EXACT REPLICA ✅ (3 december 2026)
- [x] La Cantina helemaal opnieuw gebouwd als exacte replica van originele site
- [x] Self-contained CantinaApp.js component in /app/frontend/src/sites/cantina/
- [x] Scoped CSS om conflicten te voorkomen
- [x] Alle afbeeldingen van GitHub raw URLs
- [x] Groepmenus exact overgenomen met correcte scheidingslijnen

### Phase 7 - La Bottega Italiana EXACT REPLICA ✅ (3 december 2026)
- [x] La Bottega helemaal opnieuw gebouwd als exacte replica van originele site
- [x] Self-contained BottegaApp.js component in /app/frontend/src/sites/bottega/
- [x] Navigatie met taalwisseling (NL, FR, EN, DE)
- [x] Homepage met hero, about section, features, menu sectie
- [x] Galerij pagina met alle 26 foto's en lightbox functionaliteit
- [x] Groepmenus pagina met 3 menu-opties (€45, €55, €65)
- [x] Kaart pagina met online menu viewer (Weebly iframe)
- [x] Reserveren pagina met correct Jotform formulier (222292165889366)
- [x] Afhalen pagina met correct Jotform formulier (222305012976349)
- [x] Kerstsluitingsmelding wordt getoond
- [x] Footer met webmaster info (fworksbuilders)

### Phase 8 - L'Ascoli Zaventem EXACT REPLICA ✅ (4 maart 2026)
- [x] L'Ascoli volledig herschreven als exacte replica van originele site (ascolizaventem.com)
- [x] Alle afbeeldingen correct geladen van Weebly servers
- [x] Logo correct weergegeven (rode L'Ascoli tekst op witte achtergrond)
- [x] Homepage met hero sectie (Antonio met citroenbomen)
- [x] Drie feature kaarten met hover effecten
- [x] "Onze Gerechten" sectie met 4 foto's en hover effecten
- [x] About pagina ("Wie zijn wij?") met correcte hero en "Ons Verhaal" content
- [x] Menu pagina met crème gradient achtergrond en meertalige items (NL/FR/EN)
- [x] Soepen sectie met 3 items
- [x] Visgerechten en Vleesgerechten secties met allergeeninformatie
- [x] Groepmenus pagina met 4 volledige menu's (TORINO €47,50, PUGLIA €52,50, AMALFI €57,50, ASCOLI €67,50)
- [x] Alle menu gerechten in 3 talen (NL/FR/EN)
- [x] Reservaties pagina met correct JotForm formulier (ID: 81428826238362)
- [x] Sluitingsmelding voor kerst/nieuwjaar
- [x] Info pagina met openingstijden en locatie
- [x] Footer met correcte webmaster info (fworksbuilders, GEEN "bv.")
- [x] Taalwisseling (NL/FR/EN) werkt correct

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

### P0 - High Priority (NEXT)
- [x] **L'Ascoli website EXACT REPLICA** ✅ (4 december 2026) - Pixel-perfect replica voltooid met alle correcties
- [ ] **Mercato website EXACT REPLICA** - Repliceer met originele code van `tranquille2004/Mercato` repo
- [ ] **Tracemaster evalueren** - Vraag gebruiker of deze ook exact gerepliceerd moet worden

### P1 - Medium Priority  
- [ ] Site Admin voor La Cantina aanmaken (ontbreekt nog!)
- [ ] Menu beheer voor Bottega aanpassen (PDF upload i.p.v. itemized editor)
- [ ] Password reset for site admins
- [ ] Email notifications when admin is created

### P2 - Nice to Have
- [ ] Generic business template (not restaurant)
- [ ] Billing/subscription management for site admins (Stripe)
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
