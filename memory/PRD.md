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
- [x] **Tracemaster** - Originele code uit `tranquille2004/tracemaster` repo geïntegreerd
- [x] Alle sites werken nu met hun originele code, niet herbouwd
- [x] Multi-tenant routing correct geconfigureerd (`/site/cantina`, `/site/bottega`, `/site/ascoli`, `/site/mercato`, `/site/tracemaster`)
- [x] Super Admin dashboard (`/admin`) behouden met fworks logo en Google Login
- [x] Site Admin dashboard (`/site/{naam}/manage`) beschikbaar voor klanten

### Phase 8 - NAVIGATIE FIXES VOOR MULTI-TENANT ✅ (4 maart 2026)
**KRITIEKE BUG OPGELOST**: Navigatie links gingen naar verkeerde URLs (bijv. `/menu` i.p.v. `/site/mercato/menu`)

**Fixes toegepast:**
- [x] **Mercato** - BasePathContext toegevoegd, alle Link components aangepast om `/site/mercato/*` paths te gebruiken
- [x] **Cantina** - CSS import gefixt (`./App.css` i.p.v. `@/App.css`) voor correcte navigatie styling
- [x] **Ascoli** - BasePathContext toegevoegd, alle pagina's (Home, Menu, GroupMenu, Confirmation) aangepast
- [x] **Bottega** - Werkte al correct (had al `/site/bottega/*` paths)
- [x] **Tracemaster** - Werkte al correct

**Technische details:**
- Nieuwe `BasePathContext.jsx` bestanden aangemaakt voor Mercato en Ascoli
- `useBasePath()` hook gebruikt in Navigation, Home, Menu, GroupMenu, Confirmation, Takeaway pagina's
- Alle `<Link to="/path">` vervangen door `<Link to={\`${basePath}/path\`}>`
- Routes veranderd van absolute (`/menu`) naar relatieve (`menu`) paths in App routers

### Phase 9 - ALLE AFBEELDINGEN LOKAAL OPGESLAGEN ✅ (4 maart 2026)
**KRITIEK**: Alle 174 Weebly afbeeldingen zijn gedownload en lokaal opgeslagen zodat sites blijven werken na verwijdering van Weebly accounts.

**Wat is gedaan:**
- [x] 174 unieke Weebly URLs geïdentificeerd en gedownload
- [x] Alle afbeeldingen opgeslagen in `/app/frontend/public/images/`
  - `/images/ascoli/gallery/` - 156 bestanden (galerij, hero, about foto's)
  - `/images/ascoli/logo/` - Logo bestanden
  - `/images/mercato/gallery/` - 10 bestanden
  - `/images/tracemaster/` - 11 bestanden
  - `/images/bottega/gallery/` - 9 bestanden
- [x] Alle Weebly URLs in code vervangen door lokale paden
- [x] Webpack cache gewist voor schone rebuild
- [x] Alle 5 sites getest en werkend met lokale afbeeldingen

**Verificatie:**
```bash
grep -rn "weebly" /app/frontend/src/ --include="*.js" --include="*.jsx" | wc -l
# Resultaat: 0 (geen Weebly URLs meer)
```

**Totale lokale opslag:** 33 MB aan afbeeldingen

### Phase 10 - BUG FIXES ALLE SITES ✅ (4 maart 2026)
**Gebruiker feedback verwerkt:**

- [x] **Tracemaster navigatie** - Navigatie paden gefixed naar `/site/tracemaster/*`, nu correct 5 menu items
- [x] **Mercato About foto** - CSS animatie probleem opgelost, Lorenzo foto nu zichtbaar
- [x] **Mercato scroll reset** - ScrollToTop component toegevoegd, nieuwe pagina's beginnen nu bovenaan
- [x] **Cantina kaart** - Image paden gecorrigeerd naar `/images/cantina/*`, kaart foto's nu zichtbaar
- [x] **Ascoli Groepmenus** - Download knop styling verbeterd, groepmenus-ascoli.html gekopieerd
- [x] **Alle image paden** - Afbeeldingen van originele GitHub repos gekopieerd naar lokale mappen

**Originele repos gecloned:**
- `/app/cantina_original/` - La Cantina broncode en afbeeldingen
- `/app/mercato_original/` - Ristorante Mercato broncode en afbeeldingen  
- `/app/ascoli_original/` - L'Ascoli broncode en afbeeldingen
- `/app/bottega_original/` - La Bottega broncode en afbeeldingen
- `/app/tracemaster_original/` - Tracemaster broncode en afbeeldingen

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

### Phase 11 - SPECIALE AANKONDIGING FEATURE ✅ (5 maart 2026)
**Nieuwe feature**: Restaurant eigenaren kunnen nu speciale mededelingen plaatsen (bijv. vakantiesluitingen, speciale menu's).

**Wat is geïmplementeerd:**
- [x] **AnnouncementBanner component** - Herbruikbaar component met 3 stijlen (info=blauw, warning=oranje, success=groen)
- [x] **Fixed positionering** - Banner altijd zichtbaar bovenaan met z-index 1100
- [x] **Site Admin Dashboard** - Sectie voor beheer van aankondiging (actief/inactief toggle, type selectie, tekst input)
- [x] **Super Admin SiteEditor** - Zelfde aankondiging beheer functionaliteit
- [x] **Integratie in 4 restaurant sites** - Cantina, Bottega, Ascoli en Mercato tonen de banner indien actief
- [x] **Automatische test suite** - 16 backend tests + 21 frontend E2E tests (100% passed)

**Technische details:**
- Backend model velden: `special_announcement`, `special_announcement_active`, `special_announcement_type`
- Frontend component: `/app/frontend/src/components/AnnouncementBanner.js`
- Test specs: `/app/tests/e2e/announcement-feature.spec.ts`, `/app/backend/tests/test_announcement_api.py`

**Gebruik:**
1. Ga naar `/restaurant-login` en log in als restaurant eigenaar
2. Scroll naar "Speciale Aankondiging" sectie
3. Vink "Actief op website" aan
4. Kies type (Info/Waarschuwing/Succes)
5. Voer de tekst in en klik "Aankondiging Opslaan"

### P0 - High Priority (COMPLETED)
- [x] **Navigatie bugs gefixt** ✅ (4 maart 2026) - Alle 5 sites navigeren nu correct binnen hun eigen `/site/{slug}/*` context
- [x] **L'Ascoli website EXACT REPLICA** ✅ (4 december 2026) - Pixel-perfect replica voltooid met alle correcties
- [x] **Mercato website EXACT REPLICA** ✅ (4 maart 2026) - Correct geïntegreerd met navigatie fixes
- [x] **Mercato Kaart download knop** ✅ (4 maart 2026) - Styling aangepast naar origineel, download attribuut toegevoegd
- [x] **Cantina vertalingen** ✅ (4 maart 2026) - "Praktische Info" vertaling werkt correct in alle 5 talen
- [x] **Mercato Groepmenus PDF knop** ✅ (4 maart 2026) - Grote gouden knop met juiste PDF pad, PDF gekopieerd van originele repo
- [x] **Mercato Kaart met embedded PDF** ✅ (4 maart 2026) - Menu PDF direct zichtbaar via Google Docs viewer (zoals La Cantina)
- [x] **Site Admin Dashboards** ✅ (4 maart 2026) - Restaurant eigenaren kunnen nu inloggen en hun site beheren
- [x] **Speciale Aankondiging Feature** ✅ (5 maart 2026) - Restaurant eigenaren kunnen nu speciale mededelingen plaatsen die zichtbaar zijn op hun website

### Site Admin Accounts (4 restaurants)
| Restaurant | Email | Wachtwoord | Rechten |
|------------|-------|------------|---------|
| La Cantina Italiana | cantina@test.be | test123 | Openingstijden, Sluitingsbericht, Foto's, Menu |
| La Bottega Italiana | bottega@test.be | test123 | Openingstijden, Sluitingsbericht, Foto's, Menu |
| L'Ascoli Zaventem | ascoli@test.be | test123 | Openingstijden, Sluitingsbericht, Foto's, Menu |
| Ristorante Mercato | mercato@test.be | test123 | Openingstijden, Sluitingsbericht, Foto's, Menu |

*Tracemaster heeft GEEN site admin (eigendom van platform eigenaar)*

### P1 - Medium Priority (NEXT)
- [ ] **USER VERIFICATIE** - Vraag gebruiker om alle 5 sites te controleren:
  - `/site/cantina` - La Cantina Italiana
  - `/site/bottega` - La Bottega Italiana  
  - `/site/ascoli` - L'Ascoli Zaventem
  - `/site/mercato` - Ristorante Mercato
  - `/site/tracemaster` - Tracemaster Rastreadores
- [ ] **DEPLOYMENT BEGELEIDING** - Help gebruiker met:
  - Eigen domeinen koppelen aan het platform
  - Oude Emergent apps uitschakelen (hostingkosten besparen)
- [ ] Menu beheer voor Bottega aanpassen (PDF upload i.p.v. itemized editor)
- [ ] Password reset for site admins
- [ ] Email notifications when admin is created

### P2 - Nice to Have
- [ ] Generic business template (not restaurant)
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
