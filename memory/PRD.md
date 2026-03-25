# F.Works Builders - Multi-Tenant Website Platform

## Project Overzicht
Een multi-tenant applicatie die 8 websites consolideert in één beheerbare platform met super-admin en site-admin dashboards.

## ⚠️ KRITIEKE INFORMATIE - NOOIT VERGETEN ⚠️

### 🔴 IMAGE HOSTING OPLOSSING (Opgelost 25 maart 2025)
**Na 2 weken problemen - NOOIT VERGETEN!**

**Probleem:** Op Emergent productie (.emergent.host) kunnen statische /images/ paden NIET direct worden geserveerd. De React app vangt alle requests af en retourneert HTML.

**Oplossing (3 onderdelen):**
1. **Object Storage:** Alle 874 afbeeldingen staan in Emergent Object Storage
2. **Backend API:** `/api/images/{path}` serveert afbeeldingen uit Object Storage
3. **Frontend Rewriter:** JavaScript in `index.html` herschrijft `/images/` naar `/api/images/` op productie

**Na deployment check:**
- `curl https://[prod-url]/api/admin/migrate/status` → moet `migrated_count: 874` tonen
- Als 0: ga naar `/admin/migrate` en klik "Importeer van Preview"
- Cloudflare cache legen indien nodig

**Volledige documentatie:** `/app/docs/IMAGE-HOSTING-SOLUTION.md`

---

### NAVIGATIE BUG PREVENTIE
**Probleem:** Menu knoppen leiden naar super dashboard in plaats van de juiste pagina.
**Oorzaak:** De `isOnCustomDomain()` functie herkent nieuwe Emergent URLs niet.
**Oplossing:** Gebruik WHITELIST van bekende custom domains, NIET blacklist van Emergent URLs.

**ELKE site moet deze code structuur hebben:**
```javascript
const KNOWN_CUSTOM_DOMAINS = [
  'labottegaherent.com',
  'www.labottegaherent.com',
  // etc.
];
const isOnCustomDomain = () => {
  return KNOWN_CUSTOM_DOMAINS.includes(window.location.hostname.toLowerCase());
};
const getBasePath = () => isOnCustomDomain() ? '' : '/site/[slug]';
```

**NA ELKE DEPLOYMENT:** Test navigatie op productie! Als menu links niet werken, check deze functie.

### BIJ NIEUWE FORK/DEPLOYMENT
1. ✅ Check of Cloudflare Worker URL correct is
2. ✅ Test navigatie op PRODUCTIE (niet alleen preview)
3. ✅ Check of afbeeldingen laden (migrated_count moet > 0 zijn)
4. ✅ De code fixes zijn nu permanent - mogen NIET meer terugkeren

---

## Geconsolideerde Websites
1. **La Cantina Italiana** (lacantinaitaliana.net)
2. **La Bottega Herent** (labottegaherent.com)
3. **L'Ascoli Zaventem** (ascolizaventem.com)
4. **Ristorante Mercato** (ristorantemercato.be)
5. **Tracemaster** (tracemaster-rastreadores.com)
6. **Theo Beans Export** (theobeans-export.com)
7. **fworksbuilders** (fworksbuilders.com)
8. **Smeralda Vacanze** (smeraldavacanze.it)

## Architectuur
- **Frontend:** React met React Router
- **Backend:** FastAPI
- **Database:** MongoDB
- **Image Storage:** Emergent Object Storage (KRITIEK!)
- **Hosting:** Emergent Platform
- **Domain Routing:** Cloudflare Workers (iframe methode)

## Belangrijke URLs
- **Super Admin:** fworksbuilders.com/admin
- **Image Migration:** [prod-url]/admin/migrate
- **Productie:** fworks-consolidate-1.emergent.host

## Features Geïmplementeerd
- ✅ Multi-tenant website rendering
- ✅ Super Admin Dashboard (Google OAuth login)
- ✅ Site Admin Dashboard (per restaurant)
- ✅ Speciale aankondigingen systeem
- ✅ Sluitingsberichten
- ✅ Meertalige ondersteuning (NL/FR/EN/IT/DE/ES)
- ✅ SEO meta tags
- ✅ Responsive design
- ✅ Reservatie formulieren (JotForm integratie)
- ✅ Afhaal formulieren
- ✅ Foto galerijen (via Object Storage)
- ✅ Groepsmenu's
- ✅ Health monitoring met email alerts
- ✅ Image migration systeem

## Database Schema
- **sites**: name, hostnames, site_config_id
- **site_configs**: closure_notice, special_announcement, special_announcement_active
- **site_admins**: email, password_hash, site_id, permissions
- **migrated_images**: original_path, storage_path, content_type, migrated_at (KRITIEK voor afbeeldingen!)

## Cloudflare Worker (site-proxy-new)
Handelt routing af voor alle 8 sites via iframe methode.
**Productie URL:** fworks-consolidate-1.emergent.host

## Bekende Beperkingen
- Preview en productie databases zijn gescheiden (by design)
- **AFBEELDINGEN:** Moeten via Object Storage, NIET lokaal! Zie IMAGE-HOSTING-SOLUTION.md
- Na deployment: altijd checken of `migrated_count > 0`

## Laatste Updates (Maart 2026)
- Cloudflare Worker bijgewerkt naar correcte preview URL: `fworks-promo.preview.emergentagent.com`
- Navigatie links gerepareerd voor custom domains
- /admin routing gefixd voor La Cantina (nu naar eigenaren dashboard)
- fworksbuilders.com landingspagina toegevoegd
- **NIEUW:** Auto-seed functie toegevoegd - database wordt automatisch gevuld bij app startup
- **NIEUW:** Smeralda Vacanze website toegevoegd (8e site)
- **8 maart 2026:** Resend email integratie voltooid voor FWorks en Smeralda contactformulieren
- **8 maart 2026:** Tawk.to live chat toegevoegd aan Smeralda website

## Email Configuratie (Resend API)
- **FWorks contactformulier:** Emails naar fworks@mail.be
- **Smeralda reserveringsformulier:** Emails naar villasmeralda1980@gmail.com
- **Backend endpoint:** POST /api/public/contact
- **API Key:** Geconfigureerd in backend/.env (RESEND_API_KEY)

## 🚨 Alert Email Systeem (NIEUW - 10 maart 2026)
- **Doel:** Automatische email alerts bij site problemen of gebrek aan reservaties
- **Ontvanger:** tranquille2004@gmail.com
- **Alert Types:**
  - 🔴 **HEALTH:** Site is DOWN - email wordt verstuurd wanneer een website niet bereikbaar is
  - 🟣 **RESERVATION:** Geen reservaties voor 2+ uur bij één van de vier restaurants (Cantina, Bottega, Ascoli, Mercato)
- **Onderwerp formaat:** "ALERT - [Restaurant Naam] - [Type]"
- **Test endpoint:** POST /api/test-alert-email (secret: fworks-test-2024)

## 🐰 Paasmenu Ascoli (NIEUW - 10 maart 2026)
- **Locatie:** Ascoli homepage, direct onder hero sectie
- **Prijs:** €65
- **Datums:** 4 + 6 april (middag en avond)
- **Talen:** Nederlands en Frans
- **Features:** Klikbaar - leidt naar reserveringspagina

## Sites Beheerd (8 totaal)
1. La Cantina Italiana - lacantinaitaliana.net
2. La Bottega Herent - labottegaherent.com
3. L'Ascoli Zaventem - ascolizaventem.com
4. Ristorante Mercato - ristorantemercato.be
5. Tracemaster Rastreadores - tracemaster-rastreadores.com
6. Theo Beans Export - theobeans-export.com
7. F.Works Builders - fworksbuilders.com
8. **Résidence Villa Smeralda** - smeraldavacanze.it (NIEUW)

## Smeralda Admin Login
- Email: villasmeralda1980@gmail.com
- Password: smeralda2024
- URL: smeraldavacanze.it/admin

## Volgende Stappen (Prioriteit)
1. ✅ ~~**P1:** Image carousel bug fixen - slideshow stopt niet bij handmatige interactie~~ (logica toegevoegd)
2. ✅ ~~**P2:** Ontbrekende pagina's maken voor Smeralda~~ - Services sectie toegevoegd met Car Rental, Boat Tours, Flights
3. ✅ ~~"Location" renamed to "How to Find Us" / "Bereikbaarheid"~~
4. ✅ ~~**P0:** Paasmenu voor Ascoli toevoegen~~ (10 maart 2026)
5. ✅ ~~**P1:** Email alerts voor site down en geen reservaties~~ (10 maart 2026)
6. 🟡 **P3:** Cantina announcement bug onderzoeken en fixen
7. 🟡 **P3:** Cloudflare Worker updaten voor smeraldavacanze.it domein
8. 🔵 **P4:** Payment Gateway integratie (Stripe, Payconiq, Binance Pay) - wacht op API keys
9. 🔵 **P4:** Image carousel Smeralda stopt niet bij handmatige interactie (P2)
